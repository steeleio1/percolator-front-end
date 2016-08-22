function LayoutController($http, SERVER, $cookies, $state, HostService, $location, $rootScope) {

    // Sets up this as vm.
    let vm = this;
    // Sets up a variable to toggle between true and false.
    vm.login = false;
    // Adds the function to the vm object.
    vm.showLogin = showLogin;
    vm.cancelLogin = cancelLogin;
    vm.loginUser = loginUser;
    vm.loggedIn = loggedIn;
    vm.logOut = logOut;
    vm.dashboard = dashboard;
    vm.showHost = showHost;


    // Defines the function and hoists to top of file.
    function showLogin() {
        // If vm.login is false, showLogin() toggles vm.login to true, resuling in
        // ngShow showing the dropdown.
        vm.login = true;
    }

    function cancelLogin() {
        vm.login = false;
    }

    function loginUser(user) {
        $http.post(SERVER.URL + 'login', user).then(function successCallback(res) {
                if (res.status == 200) {
                    alert("200 OK");
                    $cookies.put('access_token', res.data.access_token);
                    $state.go('root.host');
                }
            },
            function errorCallback(res) {
                if (res.status == 401) {
                    alert("401 ERROR!!!!!");
                } else if (res.status == 403) {
                    alert("403 Forbidden");
                }

            });
    };

    function loggedIn (){
        return HostService.isLoggedIn();
    }

    function logOut(){
         HostService.logOut();
    }

    function showHost(){
        $rootScope.$broadcast('showHost');
    }

    function dashboard(){
        $state.go('root.host.myEvents');
        vm.showHost();
    }

}

LayoutController.$inject = ['$http', 'SERVER', '$cookies', '$state', "HostService", '$location', '$rootScope'];
export {LayoutController};
