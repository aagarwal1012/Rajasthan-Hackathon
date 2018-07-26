var crypto = require('crypto')
var Encrypt = {};
key = "supersecretkenaampedhabba";

Encrypt.encrypt = function (data) {
	var cipher = crypto.createCipher('aes-256-cbc', key);
	var crypted = cipher.update(data, 'utf-8', 'hex');
	crypted += cipher.final('hex');
	return crypted;
}

Encrypt.decrypt = function (data) {
	var decipher = crypto.createDecipher('aes-256-cbc', key);
	var decrypted = decipher.update(data, 'hex', 'utf-8');
	decrypted += decipher.final('utf-8');
	return decrypted;
}

module.exports = Encrypt;
