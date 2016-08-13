function EventHostController (MailService, $state, $scope, $http, SERVER, $cookies, $location) {

	// Sets up this as vm.
	let vm = this;
	// Sets up variables
	vm.inviteNew = false;
	vm.inviteMyContacts- false;

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

	function sendInvite(){
		MailService.sendMsg();
	}

}


EventHostController.$inject = ['MailService', '$state', '$scope', '$http', 'SERVER', '$cookies', '$location'];
export { EventHostController };
