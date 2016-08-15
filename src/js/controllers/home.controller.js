function HomeController (MailService, WealthService) {
	let vm = this;

	vm.sendEmail = sendEmail;
	vm.getWEReport = getWEReport;

	function sendEmail() {
		var data = {
		  from: 'Excited User <me@mg.javahuddle.com>',
		  to: 'Will <williamterryjohnsonjr@gmail.com>',
		  subject: 'OH YEAH!',
		  text: 'This is a MailGun Test!'
		};
		MailService.sendEmail(data);

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

HomeController.$inject = ['MailService', 'WealthService'];
export { HomeController };