function EventCreateController () {

  // Sets up this as vm.
  let vm = this;

  // Adds the function to the vm object.
  vm.createEvent = createEvent;
  vm.uploadImage = uploadImage;

  let image = "";

  function createEvent(eventInfo) {
      eventInfo.photo_url = image;

      $http.post(SERVER.URL + 'register', user).then(function successCallback(res) {
              if (res.status == 200) {
                  alert("200 OK");
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

  function uploadImage() {  
      filepicker.pick(function(Blob) {
          image = Blob.url;  
      }); 
  }

}

EventCreateController.$inject = [];
export { EventCreateController };
