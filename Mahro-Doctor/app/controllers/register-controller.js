var User = require('../models/user.js');
var Doctor = require('../models/doctor.js');
var Appointment = require('../models/appointment.js');

module.exports.controller = function(app) {
	app.get('/api/register', function(req, res) {
		var uid = req.query.uid;
		var password = req.query.password;
		var is_doctor = req.query.is_doctor;
		var mobile = req.query.mobile;
		var email = req.query.email;
		var name = req.query.name;
		var district = req.query.district;
		var aadhar = req.query.aadhar;

		Doctor.exists(uid, function(s1) {
			if(s1) {
				res.json({ status: 'invalid', message: 'uid already taken' })
			}
			else {
				User.exists(uid, function(s2) {
					if(s2) {
						res.json({ status: 'invalid', message: 'uid already taken' })
					}
					else {
						User.mobile_exists(mobile, function(s3) {
							if(s3) {
								res.json({ status: 'invalid', message: 'mobile already linked to another account' })
							}
							else {
								Doctor.mobile_exists(mobile, function(s4) {
									if(s4) {
										res.json({ status: 'invalid', message: 'mobile already linked to another account' });
									}
									else {
										if(is_doctor === '0') {
											User.register(uid, name, password, mobile, email, district, aadhar, function(s3) {
												if (s3) {
													res.json({ status: 'ok', message: 'verification code sent to mobile' })
												}
												else {
													res.json({ status: 'error', message: 'internal error please try later' })
												}
											})
										}
										else {
											Doctor.register(uid, name, password, mobile, email, district, aadhar, function(s3) {
												if (s3) {
													res.json({ status: 'ok', message: 'verification code sent to mobile' })
												}
												else {
													res.json({ status: 'error', message: 'internal error please try later' })
												}
											})
										}
									}
								})
							}
						})
					}
				})
			}
		})
	})
}