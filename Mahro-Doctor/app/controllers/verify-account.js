var User = require('../models/user.js');
var Doctor = require('../models/doctor.js');
var Appointment = require('../models/appointment.js');

module.exports.controller = function(app) {
	app.get('/api/verify_account', function(req, res) {
		var uid = req.query.uid;
		var otp = req.query.otp;
		User.verify(uid, otp, function(s1) {
			if(s1) {
				res.json({ status: 'ok', message: 'verified successfully login to continue'})
			}
			else {
				Doctor.verify(uid, otp, function(s2) {
					if(s2) {
						res.json({ status: 'ok', message: 'verified successfully login to continue'})
					}
					else {
						res.json({ status: 'invalid', message: 'invalid uid or otp' })
					}
				})
			}
		})
	})
}