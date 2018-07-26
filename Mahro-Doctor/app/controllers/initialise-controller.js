var User = require('../models/user.js');
var Doctor = require('../models/doctor.js');
var Appointment = require('../models/appointment.js');

module.exports.controller = function(app) {
	app.get('/api/initialise', function(req, res) {
		var doctor_id = req.query.doctor;
		var patient_id = req.query.patient;

		Doctor.exists(doctor_id, function(x) {
			if(!x) {
				res.json({ status: 'invalid', message: 'doctor not registered' });
			}
			else {
				User.exists(patient_id, function(y) {
					if (!y) {
						res.json({ status: 'invalid', message: 'user not registered' });
					}
					else {
						var otp = User.send_otp(patient_id);
						Appointment.make(patient_id, doctor_id, otp, function(success, id) {
							if(success) {
								res.json({ status: 'ok', appointment_id: id });
							}
							else {
								res.json({status: 'error', message: 'internal error'});
							}
						});
					}
				})
			}
		});
	})
}