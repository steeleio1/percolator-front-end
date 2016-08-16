function WealthService ($http, SERVER) {
	this.getProfileByAddress = getProfileByAddress;

	function getProfileByAddress (registrantData){
		return $http.post(SERVER.URL + 'runwe', registrantData).then((res)=>{
			console.log(res);
		});
	}
}

WealthService.$inject = ['$http', 'SERVER'];
export { WealthService };