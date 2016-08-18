function GuestController (MailService, WealthService, $scope){

	let vm = this;

	vm.profile = {};
	vm.getWEReport = getWEReport;
	// vm.givingStats = {};

	// We cannot use vm. notation for the charts to update with Asynchronous data correctly.
	// This is because we have to call $scope.$applyAsync() below in order to populate our
	// charts correctly.
	$scope.labels = ['Net Worth Tier', 
				'Placeholder'];
	$scope.data =[netWorthVal, netWorthDifference];
	let netWorthVal;
	let netWorthDifference;
	let netWorthMax;

	init();

	function init (){
		vm.getWEReport();
	}

	function getWEReport(){
		let registrantDummyData = {
				last_name: 'Ricardo',
				first_name: 'Ricky',
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

			let netWorthTier;
			let netWorthRange = res.data.wealth.networth.text;
			if (netWorthRange === "Unable to Rate"){
				netWorthTier = 0;
			} else if (netWorthRange === "< $25K"){
				netWorthTier = 1;
			} else if (netWorthRange === "$25K-$50K"){
				netWorthTier = 2;
			} else if (netWorthRange === "$50K-$100K"){
				netWorthTier = 3;
			} else if (netWorthRange === "$100K-$500K"){
				netWorthTier = 4;
			} else if (netWorthRange === "$500K-$1MM"){
				netWorthTier = 5;
			} else if (netWorthRange === "$1MM-$5MM"){
				netWorthTier = 6;
			} else if (netWorthRange === "$5MM-$10MM"){
				netWorthTier = 7;
			} else if (netWorthRange === "$10MM-$25MM"){
				netWorthTier = 8;
			} else if (netWorthRange === "$25MM-$50MM"){
				netWorthTier = 9;
			} else if (netWorthRange === "$50MM-$100MM"){
				netWorthTier = 10;
			} else if (netWorthRange === "$100MM-$500MM"){
				netWorthTier = 11;
			} else if (netWorthRange === "$500MM+"){
				netWorthTier = 12;
			}


			vm.profile = {
				fullname: res.data.identity.full_name,
				email: res.data.identity.emails[0].email,
				spouseName: spouseName,
				kids: res.data.demographics.has_children,
				age: res.data.identity.age,
				city: res.data.locations[0].address.city,
				state: res.data.locations[0].address.state.value,
				coname1: res.data.jobs[0].org_name,
				title1: res.data.jobs[0].title,
				coname2: coname2value,
				title2: title2value,
				netWorthTier: 3,
				netWorthRange: netWorthRange,
				income: res.data.wealth.total_income.text,
				realEstateTotalVal: res.data.realestate.total_realestate_value.text,
				accreditedInvestor: res.data.wealth.accredited_investor,
				numberRealEstateProperties: res.data.realestate.total_num_properties,
				estimatedAnnualDonations: res.data.giving.estimated_annual_donations.text,
				p2G: res.data.giving.p2g_score.text,
				giftCapacity: res.data.giving.gift_capacity.text
			};
			console.log(vm.profile);
			netWorthVal = vm.profile.netWorthTier;
			netWorthMax = 12;
			netWorthDifference = netWorthMax - netWorthVal;

            $scope.$applyAsync($scope.data = [netWorthVal, netWorthDifference]);
		});
	}
}

GuestController.$inject = ['MailService', 'WealthService', '$scope'];
export { GuestController };