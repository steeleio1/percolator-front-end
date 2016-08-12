function EventHostController (MailService) {

	let vm = this;

	vm.showInviteNew = showInviteNew;
	vm.showInviteMyContacts = showInviteMyContacts;
	vm.hideInviteNew = hideInviteNew;
	vm.hideInviteMyContacts = hideInviteMyContacts;
	vm.inviteNew = false;
	vm.inviteMyContacts- false;
	vm.sendInvite = sendInvite;

	function showInviteNew() {
		vm.inviteNew = true;
	}

	function showInviteMyContacts (){
		vm.inviteMyContacts=true;
	}

	function hideInviteNew(){
		vm.inviteNew = false;
	}

	function hideInviteMyContacts(){
		vm.inviteMyContacts=false;
	}

	function sendInvite(){
		MailService.sendMsg();
	}

}

EventHostController.$inject = ['MailService'];
export { EventHostController };