var User = require('../models/user.js');
var Doctor = require('../models/doctor.js');
var Appointment = require('../models/appointment.js');
var lock = require('../helpers/encrypt.js');

module.exports.controller = function(app) {
	app.get('/api/request_response', function(req, res) {
		console.log(req.query)
		var euid = req.query.euid;
		var req_id = req.query.req_id;
		var response = req.query.response;
		var remarks = req.query.remarks;
		var uid = lock.decrypt(euid);

		if(response == '0') {
			Appointment.reject_request(req_id, uid, remarks, function(success) {
				if(success) {
					res.json({ status: 'ok' })
				}
				else {
					res.json({ status: 'error' })
				}
			})
		}
		else {
			Appointment.accept_request(req_id, uid, remarks, function(success) {
				if(success) {
					res.json({ status: 'ok' })
				}
				else {
					res.json({ status: 'error' })
				}
			})
		}
	})
}