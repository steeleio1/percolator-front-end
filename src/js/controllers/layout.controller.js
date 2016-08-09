function LayoutController () {

// Sets up this as vm.
	let vm = this;
// Sets up a variable to toggle between true and false.
	vm.login = false;
// Adds the function to the vm object.
	vm.showLogin = showLogin;
	vm.cancelLogin = cancelLogin;

// Defines the function and hoists to top of file.
	function showLogin(){
			// If vm.login is false, showLogin() toggles vm.login to true, resuling in
			// ngShow showing the dropdown.
			vm.login = true;
	}

	function cancelLogin(){
		vm.login = false;
	}
}

LayoutController.$inject = [];
export { LayoutController };