var Doctor = require('../models/doctor.js');

module.exports.controller = function(app) {
	app.get('/api/get_doctor_name', function(req, res) {
		var uid = req.query.uid;
		Doctor.name(uid, function(success, name) {
			if(success) {
				res.json({ status: 'ok', name })
			}
			else {
				res.json({ status: 'invalid', message: 'no such doctor' })
			}
		})
	})
}