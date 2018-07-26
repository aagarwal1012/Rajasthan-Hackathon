var User = require('../models/user.js');
var lock = require('../helpers/encrypt.js')
module.exports.controller = function(app) {
	app.get('/api/get_user_contact', function(req, res) {
		var euid = req.query.euid;
		var uid = lock.decrypt(euid)
		User.contact(uid, function(success, contact) {
			if(success) {
				res.json({ status: 'ok', contact })
			}
			else {
				res.json({ status: 'invalid', message: 'no such user' })
			}
		})
	})
}