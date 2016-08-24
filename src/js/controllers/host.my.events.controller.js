function HostMyEventsController ($state, $http, SERVER, $cookies, $location, $rootScope, DateService) {

  // Sets up this as vm.
  let vm = this;
  // Sets up variables
  vm.events = [];
  // Adds the function to the vm object
  vm.deleteEvent = deleteEvent;
  vm.eventDetails = eventDetails;
  vm.formatDate = DateService.formatDate;
  vm.getTime = DateService.getTime;
  vm.hideHost = hideHost;
  vm.rsvp = [];

  init();

	function init() {
			let token = $cookies.get('access_token');
			let config = {
				headers: { 'Authorization': `Bearer ${token}` }
			};
			$http.get(SERVER.URL + 'my-events', config).then((res) => {
        eventRSVPCount(res.data);
				vm.events = res.data;
			});
	}

    function eventRSVPCount(rsvpInfo) {
        // forEaches through the EventGuest info and counts the
        // RSVP status of each EventGuest and a total invite count.
        rsvpInfo.forEach(function(outerData, i) {
          if (outerData.event_guest != null){
            outerData.rsvp = {
             yes: 0,
             no: 0,
             maybe: 0,
             not_responded: 0,
             invites: 0
            };
            outerData.event_guest.forEach(function(innerData, j){
                if (innerData.rsvp === "Yes") {
                    outerData.rsvp.yes++;
                    outerData.rsvp.invites++;
                } else if (innerData.rsvp === "No") {
                    outerData.rsvp.no++;
                    outerData.rsvp.invites++;
                } else if (innerData.rsvp === "Maybe") {
                    outerData.rsvp.maybe++;
                    outerData.rsvp.invites++;
                } else if (innerData.rsvp === "Not responded") {
                    outerData.rsvp.not_responded++;
                    outerData.rsvp.invites++;
                }
              });
            } else {
              outerData.rsvp = {
               yes: 0,
               no: 0,
               maybe: 0,
               not_responded: 0,
               invites: 0
              };
            }
            return outerData;
        });
    }

  function deleteEvent(eventID) {
    var result = confirm("Confirm delete of this event?");
      if (result) {
        let token = $cookies.get('access_token');
  			let config = {
  				headers: { 'Authorization': `Bearer ${token}` }
  			};
  			$http.delete(SERVER.URL + 'host/my-events/' + eventID, config).then((res) => {
          $state.reload('root.host.myEvents');
  			});
      }
  }

  function eventDetails(eventID) {
    $location.url('host/my-events/' + eventID);
    vm.hideHost();
  }

  function hideHost(){
    console.log('hello')
    $rootScope.$broadcast('hideHost');
  }

}

HostMyEventsController.$inject = ['$state', '$http', 'SERVER', '$cookies', '$location', '$rootScope', 'DateService'];
export { HostMyEventsController };
