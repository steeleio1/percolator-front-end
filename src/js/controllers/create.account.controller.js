function CreateAccountController ($http, SERVER, $state) {

  // Sets up this as vm.
  let vm = this;

  // Adds the function to the vm object.
  vm.createAccount = createAccount;

  function createAccount(user, address) {
      console.log(user);
      console.log(address);

      // This line is for development code on localhost
      // $http.post('http://localhost:3333/register', user).then( res => {
      //   console.log(res);
      //   if (res.status == 200) {
      //           alert("200 OK");
      //       }
      // },
      //     function errorCallback(res){
      // 			if (res.status == 401) {
      //         alert("401 ERROR!!!!!");
      // 			} else if (res.status == 403) {
      //         alert("403 Forbidden");
      // 			}
      //
      //     });

      // This line is for production code
      // $http.post(SERVER.URL + 'register', user).then(function successCallback(res) {
      //     console.log(res);
      //     if (res.status == 200) {
      //         alert("200 OK");
      //         $cookies.put('access_token', res.data.access_token);
      //         $state.go('root.host');
			// 			}
			// 	},
      //     function errorCallback(res){
			// 			if (res.status == 401) {
      //         alert("401 ERROR!!!!!");
			// 			} else if (res.status == 403) {
      //         alert("403 Forbidden");
			// 			}
      //
      //     });
  };

}

CreateAccountController.$inject = ['$http', 'SERVER', '$state'];
export { CreateAccountController };
