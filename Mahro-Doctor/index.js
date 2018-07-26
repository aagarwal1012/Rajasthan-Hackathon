var express = require('express');
var fs = require('fs');
var app = express();
var cookieParser = require('cookie-parser');
app.use(cookieParser());
app.use(function(req, res, next) {
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
	next();
});

fs.readdirSync('./app/controllers').forEach(function (file) {
	if(file.substr(-3) == '.js') {
		route = require('./app/controllers/' + file);
		route.controller(app);
	}
});

app.listen(1807, function() {
	console.log('Server is running at port 1807');
});