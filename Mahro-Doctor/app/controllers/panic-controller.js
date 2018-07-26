var User = require('../models/user.js');
var Doctor = require('../models/doctor.js');
var Appointment = require('../models/appointment.js');
var lock = require('../helpers/encrypt.js');
var http = require('https');

module.exports.controller = function(app) {
	app.get('/api/panic', function(req, res) {
		var euid = req.query.euid;
		var uid = lock.decrypt(euid);
		User.contact(uid, function (success, details) {
			if(!success) {
				res.json({ status: 'invalid', message: 'sorry...just sorry' })
			}
			else {
				Doctor.get_by_location(details.district, function(list) {
					list.forEach(function(data) {
						var options = {
							hostname: 'api.pushbullet.com',
							path: '/v2/ephemerals',
							method: 'POST',
							headers: {
								'Content-Type': 'application/json',
								'Access-Token': 'o.ZST8zYs3HKaRLVAQPELdQwZKV8TG6d9N',
							}
						}
						var data = JSON.stringify({
						 	push: {
								conversation_iden: "+91" + data.mobile,
								message: `Alert! ${details.name} needs immediate help! Contact her/him at number ${details.mobile}. Thank you.`,
								package_name: "com.pushbullet.android",
								source_user_iden: "ujAWrDS1Ro4",
								target_device_iden: "ujAWrDS1Ro4sjAiVsKnSTs",
								type: "messaging_extension_reply"
							},
							type: "push"
						});
						var req = http.request(options);
						req.write(data);
						req.end();
					})
				})
				res.json({ status: 'ok' })
			}
		})
	})
}