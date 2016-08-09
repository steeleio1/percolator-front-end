function config ($stateProvider, $urlRouterProvider) {

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
    .state('root.host', {
      url: '/host',
      templateUrl: 'templates/host.tpl.html',
      controller: 'HostController as vm'
    })
    .state('root.host.myEvents', {
      url: '/host/my-events',
      templateUrl: 'templates/host.my-events.tpl.html',
      controller: 'HostMyEventsController as vm'
    })    
    .state('root.host.myContacts', {
      url: '/host/my-contacts',
      templateUrl: 'templates/host.my-contacts.tpl.html',
      controller: 'HostMyContactsController as vm'
    })  
    .state('root.guest', {
    	url: '/guest',
    	templateUrl: 'templates/guest.tpl.html',
    	controller: "GuestController as vm"
    })
    .state('root.eventHost', {
      url: '/event-host',
      templateUrl: 'templates/event-host.tpl.html',
      controller: 'EventHostController as vm'
    })
    .state('root.eventGuest', {
      url: '/event-guest',
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

config.$inject = ['$stateProvider', '$urlRouterProvider'];
export { config };