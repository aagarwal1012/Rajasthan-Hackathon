var db = require('../database/init.js');
var lock = require('../helpers/encrypt.js')

var Appointment = {};

Appointment.make = function (puid, duid, otp, callback) {
	var sql = `INSERT INTO sitings (patient, doctor, otp) VALUES (${puid}, ${duid}, ${otp})`;
	db.query(sql, function(err, result) {
		if (err) {
			callback(false, -1);
		}
		else {
			callback(true, result.insertId);
		}
	});
}

Appointment.check_otp = function (id, otp, callback) {
	var sql = `SELECT idsitings FROM sitings WHERE idsitings = ${id} AND otp = ${otp}`;
	db.query(sql, function(err, result) {
		if (err) throw err;
		if(result[0] == null || result[0] == undefined) {
			callback(false);
		}
		else {
			callback(true);
		}
	})
}

Appointment.verify = function (id, token, callback) {
	var sql = `UPDATE sitings SET verified = 1, token = '${token}' WHERE idsitings = ${id}`;
	db.query(sql, function(err, result) {
		if(err) {
			callback(false);
		}
		else {
			callback(true);
		}
	})
}

Appointment.check_token = function (id, token, callback) {
	var sql = `SELECT idsitings FROM sitings WHERE idsitings = ${id} AND token = '${token}' AND verified = 1`;
	db.query(sql, function(err, result) {
		if (err) throw err;
		if(result[0] == null || result[0] == undefined) {
			callback(false);
		}
		else {
			callback(true);
		}
	})
}

Appointment.complete = function (id, prescription, callback) {
	sql = `UPDATE sitings SET completed = 1, info = '${JSON.stringify(prescription)}', time = '${Date().substr(0,24)}' WHERE idsitings = ${id}`;
	db.query(sql, function(err, result) {
		if (err) {
			console.log("Error:" + err);
			callback(false);
		}
		else {
			callback(true);
		}
	})
}

Appointment.get_data = function(id, uid, callback) {
	var sql = `SELECT doctors.name, sitings.patient, sitings.doctor, sitings.info, sitings.verified, sitings.time, sitings.completed FROM sitings, doctors WHERE idsitings = ${id} AND sitings.doctor = doctors.uid`;
	db.query(sql, function(err, result) {
		if(result[0] == null) {
			callback(false, {})
		}
		else {
			if(uid == result[0].doctor || uid == result[0].patient) {
				if(result[0].info != null)
					callback(true, { info: JSON.parse(result[0].info), name: result[0].name, verified: result[0].verified, completed: result[0].completed, time: result[0].time, patient: result[0].patient, doctor: result[0].doctor })
				else
					callback(true, { info: {}, verified: result[0].verified, name: result[0].name, completed: result[0].completed, time: result[0].time, patient: result[0].patient, doctor: result[0].doctor  })
			}
			else {
				callback(false, {});
			}
		}
	})
}

Appointment.get_all_user_appointments = function (uid, callback) {
	// var sql = `SELECT idsitings, doctor, info, verified, completed, time FROM sitings WHERE patient = '${uid}'`;
	var sql = `SELECT doctors.name, sitings.idsitings, sitings.doctor, sitings.info, sitings.verified, sitings.completed, sitings.time FROM sitings, doctors WHERE patient = '${uid}' AND doctors.uid = sitings.doctor`;
	db.query(sql, function(err, result) {
		if (err) {
			callback(false, {});
		}
		else
			callback(true, result);
	})
}

Appointment.get_all_doctor_appointments = function (uid, callback) {
	var sql = `SELECT users.name, sitings.idsitings, sitings.patient, sitings.info, sitings.verified, sitings.completed, sitings.time FROM sitings, users WHERE doctor = '${uid}' AND sitings.patient = users.uid`;
	db.query(sql, function(err, result) {
		if (err) {
			console.log(err);
			callback(false, {});
		}
		else
			callback(true, result);
	})
}

Appointment.request = function (patient, doctor, date, callback) {
	var sql = `INSERT INTO requests(patient, doctor, date) VALUES ('${patient}', '${doctor}', '${date}')`;
	db.query(sql, function(err, result) {
		if (err) {
			callback(false, -1);
		}
		else {
			callback(true, result.insertId);
		}
	})
}

Appointment.get_user_pending_requests = function(uid, callback) {
	var sql = `SELECT * FROM requests WHERE patient = '${uid}'`;
	db.query(sql, function(err, result) {
		if(err) {
			callback(false, {});
		}
		else {
			callback(true, result);
		}
	})
}

Appointment.get_doctor_pending_requests = function(uid, callback) {
	var sql = `SELECT users.name, requests.* FROM requests, users WHERE doctor = '${uid}' AND requests.patient = users.uid`;
	db.query(sql, function(err, result) {
		if(err) {
			callback(false, {});
		}
		else {
			callback(true, result);
		}
	})
}

Appointment.accept_request = function (req_id, duid, remarks, callback) {
	// var sql = `INSERT INTO sitings (patient, doctor, otp) VALUES (${puid}, ${duid}, ${otp})`
	var sql = `SELECT patient FROM requests WHERE idrequests = ${req_id} and doctor = '${duid}'`;
	db.query(sql, function(err, result) {
		if (err) throw err;
		if(result[0] == undefined) {
			callback(false);
			return;
		}
		puid = result[0].patient;
		sql = `INSERT INTO sitings (patient, doctor, otp, verified) VALUES (${puid}, ${duid}, 0, 1)`
		db.query(sql, function(er2, res2) {
			if(er2) throw er2;
			sql = `UPDATE requests SET status = 1, remarks = '${remarks}' WHERE idrequests = ${req_id} AND doctor = '${duid}'`
			db.query(sql, function(er3, res3) {
				if(er3) throw er3;
				callback(true);
			})
		})
	})
}

Appointment.reject_request = function (req_id, uid, remarks, callback) {
	var sql = `UPDATE requests SET status = 0, remarks = '${remarks}' WHERE idrequests = ${req_id} AND doctor = '${uid}'`
	db.query(sql, function(err, result) {
		if(err) {
			callback(false)
		}
		else {
			callback(true);
		}
	})
}

module.exports = Appointment;
