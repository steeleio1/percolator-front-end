function MailService ($http, SERVER) {

	this.sendEmail = sendEmail;

	function sendEmail(data) {
		$http.post(SERVER.URL, data).then((res)=>{
			console.log(res);
		});
	}

}

MailService.$inject = ['$http', 'SERVER'];
export { MailService };