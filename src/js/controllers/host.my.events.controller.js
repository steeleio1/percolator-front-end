function HostMyEventsController ($state, $http, SERVER, $cookies, $location) {

  // Sets up this as vm.
  let vm = this;
  // Sets up variables
  vm.events = [];
  // Adds the function to the vm object
  vm.deleteEvent = deleteEvent;
  vm.eventDetails = eventDetails;
  vm.formatDate = formatDate;

  init();

	function init() {
			let token = $cookies.get('access_token');
			let config = {
				headers: { 'Authorization': `Bearer ${token}` }
			};
			$http.get(SERVER.URL + 'my-events', config).then((res) => {
				let events = res.data;
        console.log(events);
        events.map((javahuddle)=>{
          console.log(javahuddle);
          javahuddle.date = formatDate(javahuddle.date);
          vm.events.push(javahuddle);
        });
			});
	}

  function formatDate(d){
    // let aa;
    // let hours;
    // let minutes;
    let date = new Date(d)
    var dd = date.getDate(); 
    var mm = date.getMonth()+1;
    var yyyy = date.getFullYear();
    // let UTCHoursVal = date.getUTCHours();
    // console.log(UTCHoursVal);
    // if (UTCHoursVal-4 === 0) {
    //     hours = 12;
    //     aa = "A.M.";
    // } else if ((UTCHoursVal-4>0) && (UTCHoursVal-4<12)){
    //   hours = UTCHoursVal-4;
    //   aa = "A.M.";
    // } else if (UTCHoursVal-4>=12){
    //   hours = hours-4;
    //   aa= "P.M.";
    // };
    //   } else if (hours<10){
    //     hours = "0"+hours;
    //     aa = "A.M.";
    //   } else if (10<=hours<12){
    //     hours = hours;
    //     aa = "A.M.";
    //   } else if (hours>=12){
    //     hours = hours;
    //     aa="P.M.";
    //   }
    // } else {
    //   hours =  date.getUTCHours()-4+24;
    //   if (hours = 0) {
    //     hours = 12;
    //     aa = "A.M.";
    //   } else if (hours<10){
    //     hours = "0"+hours;
    //     aa = "A.M.";
    //   } else if (10<=hours<12){
    //     hours = hours;
    //     aa = "A.M.";
    //   } else if (hours>=12){
    //     hours = hours;
    //     aa="P.M.";
    //   }      
    // };
    // var hr = hours;
    // if(date.getUTCMinutes()<10){
    //   minutes = "0"+date.getUTCMinutes();
    // } else {
    //   minutes = date.getUTCMinutes();
    // };
    // var min = minutes;
    if(dd<10){dd='0'+dd} 
    if(mm<10){mm='0'+mm};
    return d = mm+'/'+dd+'/'+yyyy;
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
  }

}

HostMyEventsController.$inject = ['$state', '$http', 'SERVER', '$cookies', '$location'];
export { HostMyEventsController };
