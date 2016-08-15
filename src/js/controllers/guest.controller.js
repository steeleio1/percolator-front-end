function GuestController ($scope, WealthService){

	let vm = this;
	vm.profileCallByEmail = profileCallByEmail;
	vm.profiles = [];
	vm.registrant = {
		email: "frank@gmail.com"
	};

	init();

	function init (){
		profileCallByEmail(vm.registrant)
	};

	function profileCallByEmail(registrant){
		WealthService.getProfileByEmail(registrant).then((res)=>{
			console.log(res.data);
			let profile = {
				age: res.data.identity.age,
				city: res.data.locations[0].address.city,
				relationship: res.data.relationship.spouse.full_name,
				cashonhandHigh: res.data.wealth.cash_on_hand.text_high,
				cashonhandLow: res.data.wealth.cash_on_hand.text_low
			}


			vm.profiles.push(profile);
			console.log(vm.profiles);
		});
	};



}

GuestController.$inject = ['$scope', 'WealthService'];
export { GuestController };