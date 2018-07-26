var db = require('../database/init.js');
var http = require('https');
var sha256 = require('sha256')
var User = {};

User.exists = function (uid, callback) {
	db.query(`SELECT name FROM users WHERE uid = '${uid}'`, function(err, result) {
		if (err) throw err;
		if(result[0] == undefined)
			callback(false);
		else
			callback(true);
	});
}

User.send_otp = function (uid) {
	otp = Math.floor(10000 * Math.random());
	this.get_mobile(uid, function(mobile) {
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
				message: "Your otp for Mharo Doctor is " + otp,
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
	return otp;
}

User.send_otp_reg = function (mobile) {
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

User.get_mobile = function (uid, callback) {
	var sql = `SELECT mobile FROM users WHERE uid = '${uid}'`;
	db.query(sql, function(err, result) {
		callback(result[0].mobile);
	})
}

User.check_credentials = function(uid, password, callback) {
	var sql = `SELECT name FROM users WHERE uid = '${uid}' AND password = '${password}'`;
	db.query(sql, function(err, result) {
		if (err) throw err;
		if(result[0] == undefined)
			callback(false);
		else
			callback(true);
	})
}

User.mobile_exists = function (mobile, callback) {
	db.query(`SELECT name FROM users WHERE mobile = '${mobile}'`, function(err, result) {
		if (err) throw err;
		if(result[0] == undefined)
			callback(false);
		else
			callback(true);
	});
}

User.register = function (uid, name, password, mobile, email, district, aadhar, callback) {
	var otp = `${this.send_otp_reg(mobile)}`;
	db.query(`INSERT INTO users(uid, name, password, mobile, code, email, district, aadhar, verified) VALUES ('${uid}', '${name}', '${sha256(password)}', '${mobile}', '${otp}', '${email}', '${district}', '${aadhar}', 0)`, function(err, result) {
		if(err) {
			console.log(err);
			callback(false);
		}
		else {
			callback(true);
		}
	})
}

User.verify = function (uid, otp, callback) {
	var sql = `SELECT * FROM users WHERE uid = '${uid}' AND code = '${otp}'`;
	db.query(sql, function(err, result) {
		if (err) {
			console.log(err)
			throw err;
		} 
		if(result[0] == undefined)
			callback(false);
		else {
			sql = `UPDATE users SET verified = 1 WHERE uid = '${uid}'`;
			db.query(sql, function(err, result) {
				if (err) {
					console.log(err)
					throw err;
				} 
				callback(true);
			})
		}
	})
}

User.name = function (uid, callback) {
	sql = `SELECT name FROM users WHERE uid = '${uid}'`;
	db.query(sql, function(err, result) {
		if(result[0] === undefined || result[0] === null) {
			callback(false, "");
		}
		else {
			callback(true, result[0].name);
		}
	})
}

User.district = function (uid, callback) {
	sql = `SELECT district FROM users WHERE uid = '${uid}'`;
	db.query(sql, function(err, result) {
		if(result[0] === undefined || result[0] === null) {
			callback(false, "");
		}
		else {
			callback(true, result[0].district);
		}
	})
}

User.contact = function(uid, callback) {
	var sql = `SELECT name, mobile, email, district, aadhar FROM users WHERE uid = '${uid}'`;

	db.query(sql, function(err, result) {
		if(result[0] === undefined || result[0] === null) {
			callback(false, {});
		}
		else {
			callback(true, result[0]);
		}
	})
}

module.exports = User;
