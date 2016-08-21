function EventGuestController(WealthService, $state, $http, SERVER, $stateParams) {

    // Sets up this as vm.
    let vm = this;
    // Sets up variables

    // Adds the function to the vm object
    vm.submitRSVP = submitRSVP;
    vm.getWEReport = getWEReport;

    init();

    function init() {

			// *********************************************
			// Need to fetch the event to populate the event info
			// *********************************************


      //   var egID = $stateParams.uuid;
			// 	console.log(egID);
      //   $http.get(SERVER.URL + '/event-guest/rsvp/' + egID).then((res) => {
      //  // 	vm.event = res.data;
      //   console.log(res);
      //   });
    }

    function submitRSVP(egInfo, guestInfo) {
        let uuid = $stateParams.uuid
        let payload = {
            egInfo: egInfo,
            guestInfo: guestInfo
        }

        $http.post(SERVER.URL + 'event-guest/rsvp/' + uuid, payload).then(function(res) {
                if (res.status == 200) {
                    alert("200 OK");
                    // Guest needs to go somewhere after submitting RSVP. "Thanks for RSVPing!"
                } else if (res.status == 201) {
                    alert("201 OK");
                    // Guest needs to go somewhere after submitting RSVP. "Thanks for RSVPing!"
                } else {
                    console.log(res);
                }
            },
            function(res) {
                if (res.status == 401) {
                    alert("401 ERROR!!!!!");
                } else if (res.status == 403) {
                    alert("403 Forbidden");
                } else {
                    console.log(res);
                }
            });
        if (egInfo.rsvp === "Yes") {
            vm.getWEReport();
        };
    }

    function getWEReport() {
        let registrantDummyData = {
            last_name: 'Ricardo',
            first_name: 'Ricky',
            address_line1: 'Address 1',
            address_line2: 'Address 2 (optional)',
            city: 'The City',
            state: 'SC',
            zip: '99999'
        }

        WealthService.getProfileByAddress(registrantDummyData).then((res) => {
            let weInfo = res.data;
            //**************************************************************************
            // Would prefer to handle the save purely on the backend without front end handling the response at all.
            $http.post(SERVER.URL + 'guests/we-report', weInfo).then(function(res) {
                //**************************************************************************
                if (res.status == 200) {
                    alert("200 OK - Successful WealthService Write");
                    // Guest needs to go somewhere after submitting RSVP. "Thanks for RSVPing!"
                } else if (res.status == 201) {
                    alert("201 OK - Successful WealthService Write");
                    // Guest needs to go somewhere after submitting RSVP. "Thanks for RSVPing!"
                } else {
                    console.log(res);
                }
            });
        });
    }

}

EventGuestController.$inject = ['WealthService', '$state', '$http', 'SERVER', '$stateParams'];
export { EventGuestController };
