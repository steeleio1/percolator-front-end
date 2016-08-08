function WealthService ($http, WEALTHSERVER, headers) {
	this.getProfileByEmail = getProfileByEmail;

	function getProfileByEmail (registrant){
		console.log(registrant)
			var req = {
				 method: 'POST',
				 url: WEALTHSERVER.URL + "profile/find_one/by_email/full",
				 headers: headers,
				 data: {email: registrant.email},
				 json: true
				}
		return $http(req);
	}
}

WealthService.$inject = ['$http', 'WEALTHSERVER', 'headers'];
export { WealthService };