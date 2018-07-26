var User = require('../models/user.js');

module.exports.controller = function(app) {
	app.get('/api/get_user_name', function(req, res) {
		var uid = req.query.uid;
		User.name(uid, function(success, name) {
			if(success) {
				res.json({ status: 'ok', name })
			}
			else {
				res.json({ status: 'invalid', message: 'no such user' })
			}
		})
	})
}