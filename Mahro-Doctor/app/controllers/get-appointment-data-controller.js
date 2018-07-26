var User = require('../models/user.js');
var Doctor = require('../models/doctor.js');
var Appointment = require('../models/appointment.js');

var lock = require('../helpers/encrypt.js')

module.exports.controller = function(app) {
	app.get('/api/get_appointment_data', function(req, res) {
		console.log(req.query)
		var id = req.query.id;
		if(req.query.euid === undefined || req.query.euid === "") {
			res.json({ status: 'invalid', message: 'euid not provided' })
		}
		else {
			var uid = lock.decrypt(req.query.euid)
			Appointment.get_data(id, uid, function(success, data) {
				if(success) {
					res.json({ status: 'ok', data })
				}
				else {
					res.json({ status: 'invalid', message: 'no such appointment or not authorized' })
				}
			})
		}
	})
}