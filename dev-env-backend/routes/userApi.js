var express = require('express');
var router = express.Router();

router.use(function (req, res, next) {
	console.log ('Time', Date.now());
	next();
})

router.get('/insert/instructor', function(req, res, next) {
	console.log('Creating instructor');
	res.locals.connection.connect();
	var usersSqlAdd = "INSERT INTO User (firstName, lastName, uType, username, password, lastModified, lastAccessed) VALUES ?";
	var values = [
		[''+req.body.firstName+'',''+req.body.lastName+'',''+req.body.uType+'', ''+req.body.username+'', ''+req.body.password+'', ''+Date.now()+'',''+Date.now()+''],
	];
	res.locals.connection.connect();
	res.locals.connection.query(usersSqlAdd, [values], function (err, results, fields) {
		if (err) throw err;
			res.send(JSON.stringify(results));
		console.log(results);
	});
	res.locals.connection.end();
});

router.get('/insert/student', function(req, res, next) {
	console.log('Creating student');
	res.locals.connection.connect();
	var usersSqlAdd = 'INSERT INTO User (firstName, lastName, uType, username, password, lastModified, lastAccessed) VALUES ?';
	var values = [
		[''+req.body.firstName+'',''+req.body.lastName+'',''+req.body.uType+'', ''+req.body.username+'', ''+req.body.password+'', ''+Date.now()+'',''+Date.now()+''],
	];
	res.locals.connection.connect();
	res.locals.connection.query(usersSqlAdd, [values], function (err, results, fields) {
		if (err) throw err;
			res.send(JSON.stringify(results));
		console.log(results);
	});
	res.locals.connection.end();
});

router.get('/get/all', function(req, res, next) {
	console.log('Viewing all users')
	res.locals.connection.connect()
	res.locals.connection.query('SELECT * FROM User', function (error, results, fields) {
		if (error) throw error;
		res.send(JSON.stringify(results));
	});
	res.locals.connection.end()
})

router.get('/get/instructor', function(req, res, next) {
	console.log('Viewing all instructors')
	res.locals.connection.connect()
	res.locals.connection.query('SELECT * FROM User WHERE uType="INSTRUCTOR"', function (error, results, fields) {
		if (error) throw error;
		res.send(JSON.stringify(results));
	});
	res.locals.connection.end()
})

router.get('/get/student', function(req, res, next) {
	console.log('Viewing all students')
	res.locals.connection.connect()
	res.locals.connection.query('SELECT * FROM User WHERE uType="STUDENT"', function (error, results, fields) {
		if (error) throw error;
		res.send(JSON.stringify(results));
	});
	res.locals.connection.end()
})

router.get('/update/:id', function(req, res, next) {
	console.log('Editing user with ID: ' + req.param.id);
	res.locals.connection.connect();
	var sqlupdate = "UPDATE User SET firstName = " + ''+req.body.firstName+'' + ", lastName = " + ''+req.body.lastName+'' + ", username = " + ''+req.body.username+'' + ", password = " + ''+req.body.password+'' + ", email = " + ''+req.body.email+'' + ", lastModified = " + ''+Date.now()+'' + " WHERE uKey = " + req.param.id;
 	res.locals.connection.query(sqlupdate, function (error, results, fields) {
		if (error) throw error;
		res.send(JSON.stringify(results));
		console.log(results);
	});
	res.locals.connection.end();
});

router.get('/update/time/:id', function(req, res, next) {
	console.log('Editing user with ID: ' + req.param.id);
	res.locals.connection.connect();
	var sqlupdate = "UPDATE User SET lastAccessed = " + ''+Date.now()+ '' + " WHERE uKey = " + req.param.id;
 	res.locals.connection.query(sqlupdate, function (error, results, fields) {
		if (error) throw error;
		res.send(JSON.stringify(results));
		console.log(results);
	});
	res.locals.connection.end();
});

router.get('/delete/:id', function(req, res, next) {
	console.log('Deleting user with ID: ' + req.param.id);
	res.locals.connection.connect();
 	res.locals.connection.query('DELETE FROM User WHERE uKey = ' + req.param.id, function (error, results, fields) {
		if (error) throw error;
		res.send(JSON.stringify(results));
	});
	res.locals.connection.end();
});

module.exports = router