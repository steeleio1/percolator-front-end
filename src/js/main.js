import angular from 'angular';
import 'angular-ui-router';


//import SERVER
import { WEALTHSERVER } from './servers/wealth.server';

//import constants
// import { headers } from './credentials/wealth.credentials';

//import services
import { WealthService } from './services/wealth.service';

//import Controllers
import { EventController } from './controllers/event.controller';


angular
	.module('app', ['ui.router'])
	.constant('WEALTHSERVER', WEALTHSERVER)
	// .constant('headers', headers)
	.service('WealthService', WealthService)
	.controller('EventController', EventController)
	;