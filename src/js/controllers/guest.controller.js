function GuestController (MailService, WealthService){

	let vm = this;

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

		WealthService.getProfileByAddress(registrantDummyData);
	}

}

GuestController.$inject = ['MailService', 'WealthService'];
export { GuestController };