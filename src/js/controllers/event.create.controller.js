function EventCreateController ($state, $scope, $http, SERVER, $cookies) {

  // Sets up this as vm.
  let vm = this;

  // Adds the function to the vm object.
  vm.createEvent = createEvent;
  vm.uploadImage = uploadImage;

  let image = "";

  function createEvent(eventInfo) {
      eventInfo.photo_url = image;
      let token = $cookies.get('access_token');
      let config = {
        headers: { 'Authorization': `Bearer ${token}` }
      };
      $http.post(SERVER.URL + 'event-create', eventInfo, config).then(function successCallback(res) {
              if (res.status == 200) {
                  alert("200 OK");
                  $state.go('root.host.myEvents');
              } else if (res.status == 201) {
                  alert("201 OK");
                  $state.go('root.host.myEvents');
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

  function uploadImage() {  
      filepicker.pick(function(Blob) {
          image = Blob.url;  
      }); 
  }

}

EventCreateController.$inject = ['$state', '$scope', '$http', 'SERVER', '$cookies'];
export { EventCreateController };
