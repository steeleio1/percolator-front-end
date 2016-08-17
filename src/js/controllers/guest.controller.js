function GuestController ($scope, WealthService){

	let vm = this;
	vm.profileCallByEmail = profileCallByEmail;
	vm.profiles = [];
	vm.registrant = {
		email: "frank@gmail.com"
	};
	 $scope.data = [12, 19, 3, 5, 2, 3];


	init();

	function init (){
		profileCallByEmail(vm.registrant)
	};

	function profileCallByEmail(registrant){
		WealthService.getProfileByEmail(registrant).then((res)=>{
			console.log(res.data);
			let profile = {
				fullname: res.data.identity.full_name,
				email: res.data.identity.emails[0].email,
				kids: res.data.demographics.has_children,
				age: res.data.identity.age,
				city: res.data.locations[0].address.city,
				coname1: res.data.jobs[0].org_name,
				title1: res.data.jobs[0].title,
				coname2: res.data.jobs[1].org_name,
				title2: res.data.jobs[1].title,
				// spousename: res.data.relationship.spouse.full_name,
				// cashonhandHigh: res.data.wealth.cash_on_hand.text_high,
				// cashonhandLow: res.data.wealth.cash_on_hand.text_low
			}


			vm.profiles.push(profile);
			console.log(vm.profiles);
		});
	};



}



GuestController.$inject = ['$scope', 'WealthService'];
export { GuestController };