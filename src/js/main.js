import angular from 'angular';
import 'angular-ui-router';
import 'angular-cookies';
import './app.parallax';


//import SERVER
import { WEALTHSERVER } from './servers/wealth.server';

//import config
import { config } from './utilities/config';

//import constants
// import { headers } from './credentials/wealth.credentials';
import { serverConstant } from './constants/server.constant';

//import services
import { WealthService } from './services/wealth.service';

//import Controllers
import { WealthController } from './controllers/wealth.controller';
import { LayoutController } from './controllers/layout.controller';
import { HomeController } from './controllers/home.controller';
import { CreateAccountController } from './controllers/create.account.controller';
import { HostController } from './controllers/host.controller';
import { HostMyEventsController } from './controllers/host.my.events.controller';
import { HostMyContactsController } from './controllers/host.my.contacts.controller';
import { GuestController } from './controllers/guest.controller';
import { EventHostController } from './controllers/event.host.controller';
import { EventGuestController } from './controllers/event.guest.controller';
import { EventCreateController } from './controllers/event.create.controller';


angular
	.module('app', ['angular-parallax', 'ui.router', 'ngCookies'])
	.constant('WEALTHSERVER', WEALTHSERVER)
	.config(config)
	// .constant('headers', headers)
	.service('WealthService', WealthService)
	.constant('SERVER', serverConstant)
	.controller('WealthController', WealthController)
	.controller('LayoutController', LayoutController)
	.controller('HomeController', HomeController)
	.controller('CreateAccountController', CreateAccountController)
	.controller('HostController', HostController)
	.controller('HostMyEventsController', HostMyEventsController)
	.controller('HostMyContactsController', HostMyContactsController)
	.controller('GuestController', GuestController)
	.controller('EventHostController', EventHostController)
	.controller('EventGuestController', EventGuestController)
	.controller('EventCreateController', EventCreateController)
	;
