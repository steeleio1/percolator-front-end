function EventGuestController(WealthService, $state, $http, SERVER, $stateParams, DateService) {

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

        var egID = $stateParams.uuid;
        $http.get(SERVER.URL + 'event-guest/rsvp/' + egID).then((res) => {
            console.log(res.data);
       	let event = res.data;
        console.log(event);
        event.date= DateService.formatDate(event.date);
        event.start_time = DateService.getTime(event.start_time);
        event.end_time = DateService.getTime(event.end_time);
        console.log(event);
        vm.event = event;
        });
    }

    function submitRSVP(egInfo, guestInfo) {
        let uuid = $stateParams.uuid;
				let guestName = {};
        let payload = {
            egInfo: egInfo,
            guestInfo: guestInfo
        };

        $http.post(SERVER.URL + 'event-guest/rsvp/' + uuid, payload).then(function(res) {
                if (res.status == 200) {
                    console.log("200 OK");
										if (egInfo.rsvp === "Yes") {
												vm.getWEReport(res.data);
                // Guest needs to be directed somewhere after submitting RSVP. "Thanks for RSVPing!"
										};
                } else {
                    console.log(res);
                }
            },
            function(res) {
                if (res.status == 401) {
                    console.log("401 ERROR!!!!!");
                } else if (res.status == 403) {
                    console.log("403 Forbidden");
                } else {
                    console.log(res);
                }
            });

    }

    function getWEReport(guest) {
        let registrantData = {
            last_name: guest.last_name,
            first_name: guest.first_name,
						// If we need it, guest.email is available here.
						// email: guest.email,
            address_line1: guest.street,
            address_line2: guest.street_2,
            city: guest.city,
            state: guest.state,
            zip: guest.post_code
        }

        WealthService.getProfileByAddress(registrantData).then((res) => {
            let weInfo = res.data;
						let payload = {
							weInfo: weInfo,
							guestInfo: guest
						};
						//**************************************************************************
						// Get with Brit about this part...
            //**************************************************************************
            // Would prefer to handle the save purely on the backend without front end handling the response at all.
						//**************************************************************************
            $http.post(SERVER.URL + 'guests/we-report', payload).then(function(res) {
                //**************************************************************************
                if (res.status == 200) {
                    console.log("200 OK - Successful WealthService Write");
                    // Guest needs to go somewhere after submitting RSVP. "Thanks for RSVPing!"
                } else if (res.status == 201) {
                    console.log("201 OK - Successful WealthService Write");
                    // Guest needs to go somewhere after submitting RSVP. "Thanks for RSVPing!"
                } else {
                    console.log(res);
                }
            });
        });
    }

}

EventGuestController.$inject = ['WealthService', '$state', '$http', 'SERVER', '$stateParams', 'DateService'];
export { EventGuestController };
