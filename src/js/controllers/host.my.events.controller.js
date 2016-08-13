function HostMyEventsController ($state, $scope, $http, SERVER, $cookies) {

  // Sets up this as vm.
  let vm = this;
  // Sets up variables
  vm.events = [];
  // Adds the function to the vm object
  vm.deleteEvent = deleteEvent;

  init();

	function init() {
			let token = $cookies.get('access_token');
			let config = {
				headers: { 'Authorization': `Bearer ${token}` }
			};
			$http.get(SERVER.URL + 'events', config).then((res) => {
				vm.events = res.data;
        console.log(vm.events);
			});
	}

  function deleteEvent(eventID) {
    var result = confirm("Confirm delete of this event?");
      if (result) {
        console.log(eventID);
        let token = $cookies.get('access_token');
  			let config = {
  				headers: { 'Authorization': `Bearer ${token}` }
  			};
  			$http.delete(SERVER.URL + 'events/' + eventID, config).then((res) => {
          console.log('done');
  			});
      }
  }

}

HostMyEventsController.$inject = ['$state', '$scope', '$http', 'SERVER', '$cookies'];
export { HostMyEventsController };
