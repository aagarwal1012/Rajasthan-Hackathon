var User = require('../models/user.js');
var Doctor = require('../models/doctor.js');
var Appointment = require('../models/appointment.js');

var sha256 = require('sha256');
var lock = require('../helpers/encrypt.js');

module.exports.controller = function(app) {
	app.get('/api/login', function(req, res) {
		var uid = req.query.uid;
		var password = req.query.password;
		var pass_hash = sha256(password);
		User.check_credentials(uid, pass_hash, function(success) {
			if(success) {
				res.json({ status: 'ok', message: 'login ok', is_doctor: false, euid: lock.encrypt(uid) });
			}
			else {
				Doctor.check_credentials(uid, pass_hash, function(suc) {
					if(suc) {
						res.json({ status: 'ok', message: 'login ok', is_doctor: true, euid: lock.encrypt(uid) });
					}
					else {
						res.json({ status: 'invalid', message: 'wrong credentials' });
					}
				})
			}
		})
	})
}