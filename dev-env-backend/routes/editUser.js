var express = require('express');
var router = express.Router();

router.use(function (req, res, next) {
	console.log ('Time', Date.now())
	next()
})

router.get('/editUserInfo', function(req, res, next) {
	console.log('Editing user with ID: ' + ''+req.body.uKey+'');
	res.locals.connection.connect();
	var sqlupdate = "UPDATE User SET firstName = " + ''+req.body.firstName+'' + ", lastName = " + ''+req.body.lastName+'' + ", username = " + ''+req.body.username+'' + ", password = " + ''+req.body.password+'' + ", email = " + ''+req.body.email+'' + ", lastModified = " + ''+Date.now()+'' + " WHERE uKey = " + ''+req.body.uKey+'';
 	res.locals.connection.query(sqlupdate, function (error, results, fields) {
		if (error) throw error;
		res.send(JSON.stringify(results));
		console.log(results);
	});
	res.locals.connection.end();
});

router.get('/editUserLastAccessed', function(req, res, next) {
	console.log('Editing user with ID: ' + ''+req.body.uKey+'');
	res.locals.connection.connect();
	var sqlupdate = "UPDATE User SET lastAccessed = " + ''+Date.now()+ '' + " WHERE uKey = " + ''+req.body.uKey+'';
 	res.locals.connection.query(sqlupdate, function (error, results, fields) {
		if (error) throw error;
		res.send(JSON.stringify(results));
		console.log(results);
	});
	res.locals.connection.end();
});

module.exports = router;