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
			vm.profiles.push(res.data);
			console.log(vm.profiles);
		});
	};



}

GuestController.$inject = ['$scope', 'WealthService'];
export { GuestController };