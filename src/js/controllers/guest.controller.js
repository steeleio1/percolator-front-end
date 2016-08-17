function GuestController (MailService, WealthService){

	let vm = this;

	vm.profile = {};
	vm.getWEReport = getWEReport;


	init();

	function init (){
		vm.getWEReport();
	}

	function getWEReport(){
		let registrantDummyData = {
				last_name: 'surname',
				first_name: 'name',
				address_line1:	'Address 1',
				address_line2:	'Address 2 (optional)',
				city: 'The City',
				state:	'SC',
				zip: '99999'
		}

		WealthService.getProfileByAddress(registrantDummyData).then((res)=>{
			let coname2value;
			if (res.data.jobs[1].org_name !==undefined) {
				coname2value= res.data.jobs[1].org_name;
			} else {
				coname2value= '';
			}

			let title2value;
			if (res.data.jobs[1].title !==undefined) {
				title2value= res.data.jobs[1].title;
			} else {
				title2value= '';
			}


			vm.profile = {
				fullname: res.data.identity.full_name,
				email: res.data.identity.emails[0].email,
				kids: res.data.demographics.has_children,
				age: res.data.identity.age,
				city: res.data.locations[0].address.city,
				coname1: res.data.jobs[0].org_name,
				title1: res.data.jobs[0].title,
				coname2: coname2value,
				title2: title2value,				
			};
			console.log(vm.profile);
		});
	}

}

GuestController.$inject = ['MailService', 'WealthService'];
export { GuestController };