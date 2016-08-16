function HostService (SERVER, $http, $cookies, $state) {

  this.signup       = signup;
  this.login        = login;
  this.headers      = headers;
  this.getHost      = getHost;
  this.logOut       = logOut;
  this.isLoggedIn   = isLoggedIn;
  
  function signup (user) {
    return $http.post(SERVER.URL + 'signup', user);
  }

  function login (user) {
    return $http.post(SERVER.URL + 'login', user);
  }

  function headers () {
    let authToken = $cookies.get('access_token');
    return { headers: { 'Access-Token': authToken }};
  }

  function getHost () {
    return $cookies.get('access_token');
  }

  function logOut () {
    $cookies.remove('access_token');
    $cookies.remove('username');
    console.log('Logged out!');
  }

  function isLoggedIn () {
    return (this.getHost()) ? true : false;
  }

}

HostService.$inject = ['SERVER', '$http', '$cookies', '$state'];
export { HostService };