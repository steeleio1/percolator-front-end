function EventGuestController ($state, $http, SERVER, $stateParams) {

  // Sets up this as vm.
	let vm = this;
	// Sets up variables

	// Adds the function to the vm object


  init();

	function init() {
    let payload = {
      guestInfo: "Hello there",
      eventGuestID: $stateParams.id
    }


	    $http.get(SERVER.URL + '/event-guest/rsvp/:id' + payload).then((res) => {
	        vm.eventGuest = res.data;
	        console.log(vm.eventGuest);

	    });
	}



}

EventGuestController.$inject = ['MailService', '$state', '$scope', '$http', 'SERVER', '$cookies', '$stateParams'];
export { EventGuestController };
