function run ($rootScope, HostService, $state) {

  $rootScope.$on('$stateChangeStart', (event, toState) => {
    if (!HostService.isLoggedIn() && toState.name !== 'root.eventGuest' && toState.name !== 'root.createAccount' && toState.name !== 'root.home'){
      event.preventDefault();
      $state.go('root.home');
    }; 
    if (HostService.isLoggedIn() && toState.name == 'root.home') {
    	event.preventDefault();
    	$state.go('root.host.myEvents');
    }
  });

  $rootScope.$on('$stateChangeSuccess', (event, toState) => {
    $rootScope.$broadcast('loginChange', HostService.isLoggedIn());
  });

}

run.$inject = ['$rootScope', 'HostService', '$state'];
export { run };