var User = require('../models/user.js');
var Doctor = require('../models/doctor.js');
var Appointment = require('../models/appointment.js');

module.exports.controller = function(app) {
	app.get('/api/finalise_appointment', function(req, res) {
		var id = req.query.id;
		var token = req.query.token;
		console.log(id);
		console.log(token)
		// Send prescription and bill as Base64 encoded JSON string
		var prescription = JSON.parse(Buffer.from(req.query.prescription, 'base64'));

		if(prescription.remarks == undefined || prescription.medicines == undefined)
			res.json({ status: 'invalid', message: 'invalid json format' })
		else {
			Appointment.check_token(id, token, function (success) {
				if(success) {
					Appointment.complete(id, prescription, function (completed) {
						if(completed) {
							res.json({ status: 'ok', appointment_id: id });
						}
						else {
							res.json({status: 'error', message: 'internal error, try again later'});
						}
					})
				}
				else {
					res.json({ status: 'invalid', message: 'Invalid token or id'});
				}
			})
		}
	})
}