function HostController($state, $scope, $stateParams, $http, SERVER) {

    let vm = this;
    vm.active1 = true;
    vm.active2 = false;

    init();

    function init() {
        $http.get(SERVER.URL + $stateParams.id).then((res) => {
            $state.go('root.host.myEvents');
        });

    }
}

HostController.$inject = ['$state', '$scope', '$stateParams', '$http', 'SERVER'];
export { HostController };
