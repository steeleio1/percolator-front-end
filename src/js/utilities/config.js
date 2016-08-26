function config ($stateProvider, $urlRouterProvider, $ChartJsProvider) {

  $stateProvider
    .state('root', {
      abstract: true,
      templateUrl: 'templates/layout.tpl.html',
      controller: 'LayoutController as vm'
    })
    .state('root.home', {
      url: '/',
      templateUrl: 'templates/home.tpl.html',
      controller: 'HomeController as vm'
    })
    .state('root.createAccount', {
      url: '/create-account',
      templateUrl: 'templates/create-account.tpl.html',
      controller: 'CreateAccountController as vm'
    })
    // Root - host states
    // Basic host state
    .state('root.host', {
      url: '/host',
      templateUrl: 'templates/host.tpl.html',
      controller: 'HostController as vm'
    })
    // Host state - view all events for authorized user
    .state('root.host.myEvents', {
      url: '/my-events',
      templateUrl: 'templates/host.my-events.tpl.html',
      controller: 'HostMyEventsController as vm'
    })
    // Host state - view single event for authorized user
    .state('root.host.eventHost', {
      url: '/my-events/:id',
      templateUrl: 'templates/host.event.tpl.html',
      controller: 'EventHostController as vm'
    })
    .state('root.guest', {
    	url: '/host/guests/:id',
    	templateUrl: 'templates/guest.tpl.html',
    	controller: "GuestController as vm"
    })
    .state('root.eventGuest', {
      url: '/event-guest/rsvp/:uuid',
      templateUrl: 'templates/event-guest.tpl.html',
      controller: 'EventGuestController as vm'
    })
    .state('root.eventCreate', {
      url: '/event-create',
      templateUrl: 'templates/event-create.tpl.html',
      controller: 'EventCreateController as vm'
    })
  $urlRouterProvider.otherwise('/');
}

config.$inject = ['$stateProvider', '$urlRouterProvider', 'ChartJsProvider'];
export { config };
