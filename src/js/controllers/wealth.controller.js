function WealthController ($scope, WealthService){

	let vm = this;
	vm.profileCallByEmail = profileCallByEmail;
	vm.profiles = [];
	vm.registrant = {
		email: "frank@gmail.com"
	};

	function profileCallByEmail(registrant){
		WealthService.getProfileByEmail(registrant).then((res)=>{
			console.log(res.data);
			vm.profiles.push(res.data);
			console.log(vm.profiles);
		});
	};

}

WealthController.$inject = ['$scope', 'WealthService'];
export { WealthController };