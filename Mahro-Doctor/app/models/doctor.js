var db = require('../database/init.js');
var http = require('https');
var sha256 = require('sha256')
var Doctor = {};

Doctor.exists = function (uid, callback) {
	db.query(`SELECT name FROM doctors WHERE uid = '${uid}'`, function(err, result) {
		if (err) throw err;
		if(result[0] == undefined)
			callback(false);
		else
			callback(true);
	});
}

Doctor.check_credentials = function(uid, password, callback) {
	var sql = `SELECT name FROM doctors WHERE uid = '${uid}' AND password = '${password}'`;
	db.query(sql, function(err, result) {
		if (err) throw err;
		if(result[0] == undefined)
			callback(false);
		else
			callback(true);
	})
}

Doctor.mobile_exists = function (mobile, callback) {
	db.query(`SELECT name FROM doctors WHERE mobile = '${mobile}'`, function(err, result) {
		if (err) throw err;
		if(result[0] == undefined)
			callback(false);
		else
			callback(true);
	});
}

Doctor.send_otp_reg = function (mobile) {
	otp = Math.floor(10000 * Math.random());
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
			conversation_iden: "+91" + mobile,
			message: "Your otp for Mharo Doctor Registration is " + otp,
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
	return otp;
}

Doctor.register = function (uid, name, password, mobile, email, district, aadhar, callback) {
	var otp = `${this.send_otp_reg(mobile)}`;
	db.query(`INSERT INTO doctors(uid, name, password, mobile, code, email, district, aadhar, verified) VALUES ('${uid}', '${name}', '${sha256(password)}', '${mobile}', '${otp}', '${email}', '${district}', '${aadhar}', 0)`, function(err, result) {
		if(err) {
			console.log(err)
			callback(false);
		}
		else {
			callback(true);
		}
	})
}

Doctor.verify = function (uid, otp, callback) {
	var sql = `SELECT * FROM doctors WHERE uid = '${uid}' AND code = '${otp}'`;
	db.query(sql, function(err, result) {
		if (err) throw err;
		if(result[0] == undefined)
			callback(false);
		else {
			sql = `UPDATE users SET verified = 1 WHERE uid = '${uid}'`;
			db.query(sql, function(err, result) {
				if (err) return err;
				callback(true);
			})
		}
	})
}

Doctor.name = function (uid, callback) {
	sql = `SELECT name FROM doctors WHERE uid = '${uid}'`;
	db.query(sql, function(err, result) {
		if(result[0] === undefined || result[0] === null) {
			callback(false, "");
		}
		else {
			callback(true, result[0].name);
		}
	})
}

Doctor.get_by_location = function(district, callback) {
	var sql = `SELECT uid, name, mobile, email FROM doctors WHERE district = '${district}'`;
	db.query(sql, function(err, result) {
		if (err) throw err;
		callback(result);
	})
}

module.exports = Doctor;