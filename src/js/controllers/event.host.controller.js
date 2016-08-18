function EventHostController (MailService, $state, $scope, $http, SERVER, $cookies, $stateParams) {

	// Sets up this as vm.
	let vm = this;
	// Sets up variables
	vm.inviteNew = false;
	vm.inviteMyContacts- false;
	vm.guest = {};

	// Adds the function to the vm object
	vm.showInviteNew = showInviteNew;
	vm.showInviteMyContacts = showInviteMyContacts;
	vm.hideInviteNew = hideInviteNew;
	vm.hideInviteMyContacts = hideInviteMyContacts;
	vm.deleteEvent = deleteEvent;
	vm.sendInvite = sendInvite;

	init();

	function init() {
	    var eventID = $stateParams.id;
	    let token = $cookies.get('access_token');
	    let config = {headers: {'Authorization': `Bearer ${token}`}};

	    $http.get(SERVER.URL + 'host/my-events/' + eventID, config).then((res) => {
	        vm.event = res.data;
	        console.log(vm.event);


	 //Dummy data inserted for development
				// vm.event =
				//  {
			  //   photo_url: 'http://placecage.com/300/300',
			  //   title: 'A Night with Vision City',
			  //   street: '123 Infinite Loop',
			  //   street_2: '',
			  //   city: 'Cupertino',
			  //   state: 'CA',
			  //   post_code: 99999,
			  //   date: 'August 5th',
			  //   start_time: '7pm',
			  //   end_time: '9pm',
			  //   message: 'Come join us for an exciting evening of vision'
			  // };

	    });
	}

	function deleteEvent() {
		var result = confirm("Confirm delete of this event?");
			if (result) {
				var eventID = $stateParams.id
				console.log(eventID);
				let token = $cookies.get('access_token');
				let config = {
					headers: { 'Authorization': `Bearer ${token}` }
				};
				$http.delete(SERVER.URL + 'host/my-events/' + eventID, config).then((res) => {
					$state.go('root.host.myEvents');
				});
			}
	}

	function showInviteNew() {
		vm.inviteNew = true;
	}

	function showInviteMyContacts (){
		vm.inviteMyContacts=true;
	}

	function hideInviteNew(){
		vm.inviteNew = false;
	}

	function hideInviteMyContacts(){
		vm.inviteMyContacts=false;
	}

function createGuest(guestInfo){
				let guestInstance = guestInfo;
				let token = $cookies.get('access_token');
				let config = {
					headers: { 'Authorization': `Bearer ${token}` }
							};
				$http.post(SERVER.URL + 'guests', guestInfo, config).then(function (res) {
								if (res.status == 200) {
										alert("200 OK - Guest Created");
										createEventGuest(res.data, guestInstance);
								} else if (res.status == 201) {
										alert("201 OK - Guest Created");
										createEventGuest(res.data, guestInstance);
								}
						},
						function (res) {
								if (res.status == 401) {
										alert("401 ERROR!!!!!");
								} else if (res.status == 403) {
										alert("403 Forbidden");
								}
						});
}

function createEventGuest(guestInfo, guestInstance){
      let token = $cookies.get('access_token');
      let config = {
        headers: { 'Authorization': `Bearer ${token}` }
			      };
			let payload = {
				guestInfo: guestInfo,
				eventID: $stateParams.id
			}
      $http.post(SERVER.URL + 'createEventGuest', payload, config).then(function (res) {
				if (res.status == 200) {
						alert("200 OK - EventGuest Created");
						emailGuest(res.data, guestInstance);
				} else if (res.status == 201) {
						alert("201 OK - EventGuest Created");
						emailGuest(res.data, guestInstance);
				}
		});
  };

function emailGuest(egInfo, guestInstance){
	let guestInfo = guestInstance.first_name + " " + guestInstance.last_name + " " + '<' + guestInstance.email + '>';
	let eventURL = "http://localhost:8081/#/event-guest/rsvp/" + egInfo.uuid;
	let emailMessage = vm.event.message + " Please use this link to RSVP.  We look forward to seeing you there! " + eventURL;
		var data = {
			from: 'Excited User <me@mg.javahuddle.com>',
			to: guestInfo,
			subject: 'You are invited to join us at ' + vm.event.title,
			text: guestInstance.privateMessage + " " + emailMessage
		};
		MailService.sendEmail(data);
}

	function sendInvite(guest){
		//check validation of email against eventguest table
		createGuest(guest);
		$state.reload('root.host.eventHost');
	}

}

EventHostController.$inject = ['MailService', '$state', '$scope', '$http', 'SERVER', '$cookies', '$stateParams'];
export { EventHostController };
