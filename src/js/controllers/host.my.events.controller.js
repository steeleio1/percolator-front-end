function HostMyEventsController ($state, $scope, $http, SERVER, $cookies) {

  let vm = this;
  vm.events = [];

  init();

	function init() {
			let token = $cookies.get('access_token');
			let config = {
				headers: { 'Authorization': `Bearer ${token}` }
			};
			$http.get(SERVER.URL + 'events', config).then((res) => {
				vm.events = res.data;
        console.log(vm.events);
			});
	}

}

HostMyEventsController.$inject = ['$state', '$scope', '$http', 'SERVER', '$cookies'];
export { HostMyEventsController };
