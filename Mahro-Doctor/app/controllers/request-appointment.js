var User = require('../models/user.js');
var Doctor = require('../models/doctor.js');
var Appointment = require('../models/appointment.js');
var lock = require('../helpers/encrypt.js')

module.exports.controller = function(app) {
	app.get('/api/request', function(req, res) {
		var euid = req.query.euid;
		var doctor = req.query.doctor;
		var date = req.query.date;
		var uid = lock.decrypt(euid);
		Appointment.request(uid, doctor, date, function(success, request_id) {
			if(success) {
				res.json({status: 'ok', request_id})
			}
			else {
				res.json({status: 'error'})
			}
		})
	})
}