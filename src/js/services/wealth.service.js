function WealthService ($http, SERVER) {
	this.getProfileByAddress = getProfileByAddress;

	function getProfileByAddress (registrantData){
		return $http.post(SERVER.URL + 'runwe', registrantData).then((res)=>{
			console.log(res.data);
		});
	}
}

WealthService.$inject = ['$http', 'SERVER'];
export { WealthService };