function HostController($state, $scope, $stateParams, $http, SERVER, $cookies) {

    let vm = this;
    vm.active1 = true;
    vm.active2 = false;

    init();

    function init() {
			  let token = $cookies.get('access_token');
				let config = {
					headers: { 'Authorization': `Bearer ${token}` }
				};
			  $http.get(SERVER.URL + 'profile', config).then((res) => {
					console.log(res);
					vm.user = res.data;
          $state.go('root.host.myEvents');
        });
    }

}

HostController.$inject = ['$state', '$scope', '$stateParams', '$http', 'SERVER', '$cookies'];
export { HostController };
