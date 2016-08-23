function HostController($state, $scope, $http, SERVER, $cookies, $rootScope) {

    let vm = this;
    vm.active1 = true;
    vm.active2 = false;
    vm.hideHost = false;

    init();

    function init() {
			  let token = $cookies.get('access_token');
				let config = {
					headers: { 'Authorization': `Bearer ${token}` }
				};
			  $http.get(SERVER.URL + 'profile', config).then((res) => {
					vm.user = res.data;
          $state.go('root.host.myEvents');
        });
    }

    $rootScope.$on('hideHost', (event)=>{
        vm.hideHost = true;
    });

    $rootScope.$on('showHost',(event)=>{
        vm.hideHost = false;
    })

}

HostController.$inject = ['$state', '$scope', '$http', 'SERVER', '$cookies', '$rootScope'];
export { HostController };
