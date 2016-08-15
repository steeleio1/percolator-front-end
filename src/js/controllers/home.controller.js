function HomeController ($http, SERVER) {
	let vm = this;

	vm.sendEmail = sendEmail;

	function sendEmail() {
		var data = {
		  from: 'Excited User <me@mg.javahuddle.com>',
		  to: 'Will <williamterryjohnsonjr@gmail.com>',
		  subject: 'OH YEAH!',
		  text: 'This is a MailGun Test!'
		};

		$http.post(SERVER.URL, data).then((res)=>{
			console.log(res);
		});
	}

}

HomeController.$inject = ['$http', 'SERVER'];
export { HomeController };