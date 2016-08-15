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
			method : 'POST',
		    url: MAILSERVER.URL + "messages",
			headers: {
				"Authorization": "Basic "+btoa("api:"+mailCreds.key)
				},
		    dataType: 'json',
		    data: email
		}).then ((res)=>{
			console.log(res.data);
		})
	}

}

MailService.$inject = ['$http', 'MAILSERVER', 'mailCreds'];
export { MailService };