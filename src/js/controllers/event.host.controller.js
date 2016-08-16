function EventHostController (MailService, $state, $scope, $http, SERVER, $cookies, $location) {

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
	    // Parses the location URL, splits all path sections into items in array,
			// and returns the last item in that array. This will return the event ID from the URL
	    var eventID = $location.path().split(/[\s/]+/).pop();
	    let token = $cookies.get('access_token');
	    let config = {headers: {'Authorization': `Bearer ${token}`}};

	    $http.get(SERVER.URL + 'host/my-events/' + eventID, config).then((res) => {
	        vm.event = res.data;
	        console.log(vm.event);

	 //Dummy data inserted for development
	 		vm.event =
				 {
			    photo_url: 'http://placecage.com/300/300',
			    title: 'A Night with Vision City',
			    street: '123 Infinite Loop',
			    street_2: '',
			    city: 'Cupertino',
			    state: 'CA',
			    post_code: 99999,
			    date: 'August 5th',
			    start_time: '7pm',
			    end_time: '9pm',
			    message: 'Come join us for an exciting evening of vision'
			  };

	    });
	}

	function deleteEvent() {
		var result = confirm("Confirm delete of this event?");
			if (result) {
				var eventID = $location.path().split(/[\s/]+/).pop();
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
				console.log(guestInfo);

				let token = $cookies.get('access_token');
				let config = {
					headers: { 'Authorization': `Bearer ${token}` }
							};
				$http.post(SERVER.URL + 'guests', guestInfo, config).then(function successCallback(res) {
								if (res.status == 200) {
										alert("200 OK - Guest Created");
										// $state.go('root.host.myEvents');
								} else if (res.status == 201) {
										alert("201 OK - Guest Created");
										// $state.go('root.host.myEvents');
								}
						},
						function errorCallback(res) {
								if (res.status == 401) {
										alert("401 ERROR!!!!!");
								} else if (res.status == 403) {
										alert("403 Forbidden");
								}

						});


}

function createEventGuest(guestInfo, eventID){
// 			console.log('Hi from createEventGuest');
      let token = $cookies.get('access_token');
      let config = {
        headers: { 'Authorization': `Bearer ${token}` }
			      };
			var eventID = $location.path().split(/[\s/]+/).pop();
			let payload = {
				guestInfo: guestInfo,
				eventID: eventID
			}

      $http.post(SERVER.URL + 'createEventGuest', guestInfo, config).then(function successCallback(res) {
              if (res.status == 200) {
                  alert("200 OK - EventGuest Created");
                  // $state.go('root.host.myEvents');
              } else if (res.status == 201) {
                  alert("201 OK - EventGuest Created");
                  // $state.go('root.host.myEvents');
              }
          },
          function errorCallback(res) {
              if (res.status == 401) {
                  alert("401 ERROR!!!!!");
              } else if (res.status == 403) {
                  alert("403 Forbidden");
              }

          });
  };



	function sendInvite(guest){
		//check validation of email against eventguest table
		createGuest(guest);
		// console.log("Before createEventGuest");
		createEventGuest(guest);
		// console.log("After createEventGuest");
		let guestInfo = guest.first_name + " " + guest.last_name + " " + '<' + guest.email + '>';
		let eventURL = "http://placecage.com/250/250"; //eventguest.id
		let emailMessage = vm.event.message + " Please use this link to RSVP.  We look forward to seeing you there! " + eventURL;
			var data = {
			  from: 'Excited User <me@mg.javahuddle.com>',
			  to: guestInfo,
			  subject: 'You are invited to join us at ' + vm.event.title,
			  text: guest.privateMessage + " " + emailMessage
			};
			// console.log(data);
			// MailService.sendEmail(data);


		// MailService.sendMsg();
	}

}

EventHostController.$inject = ['MailService', '$state', '$scope', '$http', 'SERVER', '$cookies', '$location'];
export { EventHostController };
