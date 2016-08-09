function HostController ($state) {

	let vm = this;

	init()

  function init () {
      $state.go('root.host.myEvents');
  }

}

HostController.$inject = ['$state'];
export { HostController };