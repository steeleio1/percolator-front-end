function LayoutController () {

// Sets up this as vm.
	let vm = this;
// Sets up a variable to toggle between true and false.
	vm.login = false;
// Adds the function to the vm object.
	vm.showLogin = showLogin;

// Defines the function and hoists to top of file.
	function showLogin(){
		// If vm.login is true, showLogin() toggles vm.login to false.
		if (vm.login){
			vm.login = false;
		} else {
			// If vm.login is false, showLogin() toggles vm.login to true, resuling in
			// ngShow showing the dropdown.
			vm.login = true;
		}
	}



}

LayoutController.$inject = [];
export { LayoutController };