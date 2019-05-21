var express = require('express');
var router = express.Router();

router.use(function (req, res, next) {
	console.log ('Time', Date.now())
	next()
})

router.get('/deleteUser', function(req, res, next) {
	console.log('Deleting user with ID: ' + ''+req.body.uKey+'');
	res.locals.connection.connect();
 	res.locals.connection.query('DELETE FROM User WHERE uKey = ' + ''+req.body.uKey+'', function (error, results, fields) {
		if (error) throw error;
		res.send(JSON.stringify(results));
	});
	res.locals.connection.end();
});

router.get('/deleteAllUsers', function(req, res, next) {
	console.log('Deleting all users');
	res.locals.connection.connect();
 	res.locals.connection.query('truncate User', function (error, results, fields) {
		if (error) throw error;
		res.send(JSON.stringify(results));
	});
	res.locals.connection.end();
});

module.exports = router;