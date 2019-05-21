var express = require('express');
var router = express.Router();

router.use(function (req, res, next) {
	console.log ('Time', Date.now());
	next();
})

router.get('/shortAnswerDisplay', function(req, res, next) {
	console.log('Viewing SA Questions');
	res.locals.connection.connect();
 	res.locals.connection.query('SELECT * FROM Question WHERE qType="SA"', function (error, results, fields) {
		if (error) throw error;
		res.send(JSON.stringify(results));
	});
	res.locals.connection.end();
});

router.get('/multipleAnswerDisplay', function(req, res, next) {
	console.log('Viewing MC Questions');
	res.locals.connection.connect();
 	res.locals.connection.query('SELECT * FROM Question WHERE qType="MC"', function (error, results, fields) {
		if (error) throw error;
		res.send(JSON.stringify(results));
	});
	res.locals.connection.end();
});

router.get('/', function(req, res, next) {
	console.log('Viewing all questions')
	res.locals.connection.connect()
	res.locals.connection.query('SELECT * FROM Question', function (error, results, fields) {
		if (error) throw error;
		res.send(JSON.stringify(results));
	});
	res.locals.connection.end()
})

router.get('/editQuestion/:qKey', function(req, res, next) {
	console.log('Editing question with ID: ' + req.param.qKey);
	res.locals.connection.connect();
	var sqlupdate = "UPDATE Question SET qValue = " + ''+req.body.qValue+'' + ", answer = " + ''+req.body.answer+'' + ", candidate1 = " + ''+req.body.candidate1+'' + ", candidate2 = " + ''+req.body.candidate2+'' + ", candidate3 = " + ''+req.body.candidate3+'' + ", candidate4 = " + ''+req.body.candidate4+'' + " WHERE qKey = " + req.param.qKey;
 	res.locals.connection.query(sqlupdate, function (error, results, fields) {
		if (error) throw error;
		res.send(JSON.stringify(results));
		console.log(results);
	});
	res.locals.connection.end();
});

router.get('/deleteQuestion/:qKey', function(req, res, next) {
	console.log('Deleting question with ID: ' + req.param.qKey);
	res.locals.connection.connect();
 	res.locals.connection.query('DELETE FROM Question WHERE qKey = ' + req.param.qKey, function (error, results, fields) {
		if (error) throw error;
		res.send(JSON.stringify(results));
	});
	res.locals.connection.end();
});

module.exports = router;