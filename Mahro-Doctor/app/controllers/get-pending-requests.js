var User = require('../models/user.js');
var Doctor = require('../models/doctor.js');
var Appointment = require('../models/appointment.js');
var lock = require('../helpers/encrypt.js')

module.exports.controller = function(app) {
	app.get('/api/get_user_pending_requests', function(req, res) {
		var euid = req.query.euid;
		var uid = lock.decrypt(euid);
		Appointment.get_user_pending_requests(uid, function(success, result) {
			if(success) {
				res.json({ status: 'ok', requests: result });
			}
			else {
				res.json({ status: 'error' })
			}
		})
	})
	app.get('/api/get_doctor_pending_requests', function(req, res) {
		var euid = req.query.euid;
		var uid = lock.decrypt(euid);
		Appointment.get_doctor_pending_requests(uid, function(success, result) {
			if(success) {
				res.json({ status: 'ok', requests: result });
			}
			else {
				res.json({ status: 'error' })
			}
		})
	})
}