var Doctor = require('../models/doctor.js');
var lock = require('../helpers/encrypt.js');
var User = require('../models/user.js');

module.exports.controller = function(app) {
	app.get('/api/get_nearby_doctors', function(req, res) {
		var euid = req.query.euid;
		var uid = lock.decrypt(euid);
		User.district(uid, function(success, district) {
			if(success) {
				Doctor.get_by_location(district, function(list) {
					res.json({ status: 'ok', list })
				})
			}
			else {
				res.json({ status: 'invalid', message: 'invalid euid' })
			}
		})
	})
}