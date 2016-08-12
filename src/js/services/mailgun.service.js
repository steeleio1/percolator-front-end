function MailService ($http, MAILSERVER, mailCreds) {

	this.sendMsg = sendMsg;
	this.email = email;

	let email = {
		from: 'Billy <billy@mg.javahuddle.com>',
		to: 'Will <williamterryjohnsonjr@gmail.com>',
		subject: 'OH YEAH!',
		text: 'This is a MailGun Test!'
	}

	function sendMsg() {
		$http({
		    url: MAILSERVER.URL + "messages",
		    type: "POST",
		    dataType: 'json',
		    username:'api',
		    password: mailCreds.key,
		    from: 'Billy <billy@mg.javahuddle.com>',
			to: 'Will <williamterryjohnsonjr@gmail.com>',
			subject: 'OH YEAH!',
			text: 'This is a MailGun Test!'
		}).then ((res)=>{
			console.log(res.data);
		})
	}

}

MailService.$inject = ['$http', 'MAILSERVER', 'mailCreds'];
export { MailService };