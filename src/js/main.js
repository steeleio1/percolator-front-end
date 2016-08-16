import angular from 'angular';
import 'angular-ui-router';
import 'angular-cookies';
import './app.parallax';
import Chart from 'chart.js';
import 'angular-chart.js';

//import SERVER
import { WEALTHSERVER } from './servers/wealth.server';

//import config
import { config } from './utilities/config';

//import constants
import { headers } from './credentials/wealth.credentials';
// import { mailCreds } from './credentials/mail.credentials';
import { serverConstant } from './constants/server.constant';
import { MAILSERVER } from './servers/mailgun.server';

//import services
import { WealthService } from './services/wealth.service';
import { MailService } from './services/mailgun.service';

//import Controllers
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
import { ChartController } from './controllers/charts.controller';

angular
	.module('app', ['angular-parallax', 'ui.router', 'ngCookies', 'chart.js'])
	.config(config)
	.service('WealthService', WealthService)
	.service('MailService', MailService)
	.constant('headers', headers)
	.constant('WEALTHSERVER', WEALTHSERVER)
	.constant('SERVER', serverConstant)
	.constant('MAILSERVER', MAILSERVER)
	// .constant('mailCreds', mailCreds)
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
	.controller('ChartController', ChartController)
	;
