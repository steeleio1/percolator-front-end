function GuestController (MailService, WealthService){

	let vm = this;

	vm.profile = {};
	vm.getWEReport = getWEReport;
	// vm.givingStats = {};
	vm.labels = ['Charitable Donations', 
				'Estimated Annual Donations', 
				'Gift Capacity', 
				'Total Donations', 
				'Total Political Donations', '2011', '2012'];
	vm.colors = ['rgba(255, 99, 132, 0.2)'];	

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
			//Sets property values within vm.profile to more manageable property names
			let coname2value;
			console.log(res);
			if (res.data.jobs[1]) {
				coname2value= res.data.jobs[1].org_name;
			} else {
				coname2value= '';
			}

			let title2value;
			if (res.data.jobs[1]) {
				title2value= res.data.jobs[1].title;
			} else {
				title2value= '';
			}

			let spouseName;
			if (res.data.identity.marital_status.value === "M"){
				spouseName= res.data.relationship.spouse.full_name;
			} else {
				spouseName = '';
			}

			vm.profile = {
				fullname: res.data.identity.full_name,
				email: res.data.identity.emails[0].email,
				spouseName: spouseName,
				kids: res.data.demographics.has_children,
				age: res.data.identity.age,
				city: res.data.locations[0].address.city,
				coname1: res.data.jobs[0].org_name,
				title1: res.data.jobs[0].title,
				coname2: coname2value,
				title2: title2value,
				netWorth: res.data.wealth.networth.text,
				income: res.data.wealth.total_income.text,
				realEstateTotalVal: res.data.realestate.total_realestate_value.text,
				accreditedInvestor: res.data.wealth.accredited_investor,
				numberRealEstateProperties: res.data.realestate.total_num_properties,
				estimatedAnnualDonations: res.data.giving.estimated_annual_donations.text,
				p2G: res.data.giving.p2g_score.text,
				giftCapacity: res.data.giving.gift_capacity.text
			};
			console.log(vm.profile);
			let data = res.data;
			let charMax = data.giving.charitable_donations.max;
			let charMin = data.giving.charitable_donations.min;

			vm.data = [
		      [charMax, 10, 20, 50, 100, 500],
		      [charMin, 7, 7, 23, 86, 380]
		    ];
		});
	}


function parseData(stuff){
	return {
		charitable_donations_max: stuff.giving.charitable_donations.max
}

// vm.givingStats.charitable_donations = 1250

// console.log(vm.givingStats.charitable_donations_max);
}
	 
}

GuestController.$inject = ['MailService', 'WealthService'];
export { GuestController };