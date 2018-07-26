$(document).ready(function(){
	var location_rajasthan = {"Rajasthan":["Ajmer","Alwar","Bikaner","Bharatpur","Bhilwara","Jaipur*","Jodhpur","Lachhmangarh","Ladnu","Lakheri","Lalsot","Losal","Makrana","Malpura","Mandalgarh","Mandawa","Mangrol","Merta City","Mount Abu","Nadbai","Nagar","Nagaur","Nasirabad","Nathdwara","Neem-Ka-Thana","Nimbahera","Nohar","Nokha","Pali","Phalodi","Phulera","Pilani","Pilibanga","Pindwara","Pipar City","Prantij","Pratapgarh","Raisinghnagar","Rajakhera","Rajaldesar","Rajgarh (Alwar)","Rajgarh (Churu)","Rajsamand","Ramganj Mandi","Ramngarh","Ratangarh","Rawatbhata","Rawatsar","Reengus","Sadri","Sadulshahar","Sadulpur","Sagwara","Sambhar","Sanchore","Sangaria","Sardarshahar","Sawai Madhopur","Shahpura","Shahpura","Sheoganj","Sikar","Sirohi","Sojat","Sri Madhopur","Sujangarh","Sumerpur","Suratgarh","Taranagar","Todabhim","Todaraisingh","Tonk","Udaipur","Udaipurwati","Vijainagar, Ajmer"]};

	location_rajasthan = JSON.stringify(location_rajasthan);
	location_rajasthan = JSON.parse(location_rajasthan);

	var i = 1;

	location_rajasthan.Rajasthan.forEach(function(item){
		$ ("#locations").append(`
			<option value="${i}">${item}</option>
		`);
		i += 1;
	});
});
