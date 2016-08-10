function HostController ($state) {

	let vm = this;
	vm.active1 = true;
	vm.active2 = false;

	init ();

  function init () {
      $state.go('root.host.myEvents');
  }

}

HostController.$inject = ['$state'];
export { HostController };