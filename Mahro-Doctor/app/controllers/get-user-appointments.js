var User = require('../models/user.js');
var Doctor = require('../models/doctor.js');
var Appointment = require('../models/appointment.js');
var lock = require('../helpers/encrypt.js');

module.exports.controller = function(app) {
	app.get('/api/get_user_appointments', function(req, res) {
		if(req.query.euid === undefined || req.query.euid === "") {
			res.json({ status: 'invalid', message: 'not logged in' })
		}
		else {
			var uid = lock.decrypt(req.query.euid);
			Appointment.get_all_user_appointments(uid, function(success, data) {
				if(success) {
					res.json({status: 'ok', data});
				}
				else {
					res.json({ status: 'invalid', message: 'no valid user, stop playing with this service' })
				}
			})
		}
	})
}