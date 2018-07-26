var User = require('../models/user.js');
var Doctor = require('../models/doctor.js');
var Appointment = require('../models/appointment.js');

function random_token () {
	var string_array = ['0','1','2','3','4','5','6','7','8','9','a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z','A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z','!','?'];
	var rnd_string = "";
	for (var i = 1; i < 32; i++) { 
		var rnd_num = Math.ceil(Math.random() * string_array.length) - 1;
		rnd_string = rnd_string + string_array[rnd_num];
	};
	return rnd_string;
}

module.exports.controller = function(app) {
	app.get('/api/verify_appointment', function(req, res) {
		var id = req.query.id;
		var otp = req.query.otp;
		Appointment.check_otp(id, otp, function(success) {
			if(success) {
				var token = random_token();
				Appointment.verify(id, token, function(success) {
					if(success)
						res.json({ status: 'ok', token, siting_id: id });
					else
						res.json({ status: 'error', message: 'internal error, try later'});
				});
			}
			else {
				res.json({ status: 'invalid', message: 'wrong otp or id' });
			}
		})
	})
}