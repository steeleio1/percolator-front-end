function DateService(){
	this.formatDate = formatDate;
	this.getTime = getTime;

	  function formatDate(d){
    //Formats UTC Date into mm/dd/yyyy format
    let date = new Date(d)
    var dd = date.getDate();
    var mm = date.getMonth()+1;
    var yyyy = date.getFullYear();
    if(dd<10){dd='0'+dd}
    if(mm<10){mm='0'+mm};
    return d = mm+'/'+dd+'/'+yyyy;
  }

  function getTime(timeInfo){
    //Formats UTCTime into hh:mm A.M./P.M. format
    let time = new Date(timeInfo);
    let UTCHoursVal = time.getUTCHours() - 1;
    var hours = UTCHoursVal;
    let UTCMinutesVal = time.getUTCMinutes();
    var minutes;
    var aa;
    if (UTCHoursVal === 4) {
        hours = 12;
        aa = "A.M.";
    } else if (UTCHoursVal < 4 && UTCHoursVal>= 0){
      hours = UTCHoursVal-4+12;
      aa = "P.M.";
    } else if (UTCHoursVal<16 && UTCHoursVal>=4){
      hours = UTCHoursVal-4;
      aa= "A.M.";
    } else if (UTCHoursVal===16){
      hours = 12;
      aa= "P.M.";
    } else if (UTCHoursVal<24 && UTCHoursVal >= 16) {
      hours = UTCHoursVal-4-12;
      aa="P.M.";
    };


    if(UTCMinutesVal < 10){
      minutes = "0" + UTCMinutesVal;
    } else {
      minutes = UTCMinutesVal;
    }
    return hours + ":"+minutes + " " + aa;
  }
}

DateService.$inject = [];
export { DateService };