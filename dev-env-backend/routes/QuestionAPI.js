var express = require('express');
var router = express.Router();

router.use(function (req, res, next) {
	console.log ('Time', Date.now());
	next();
})

router.get('/get/sa', function(req, res, next) {
	console.log('Viewing SA Questions');
	res.locals.connection.connect();
 	res.locals.connection.query('SELECT * FROM Question WHERE qType="SA"', function (error, results, fields) {
		if (error) throw error;
		res.send(JSON.stringify(results));
	});
	res.locals.connection.end();
});

router.get('/get/mc', function(req, res, next) {
	console.log('Viewing MC Questions');
	res.locals.connection.connect();
 	res.locals.connection.query('SELECT * FROM Question WHERE qType="MC"', function (error, results, fields) {
		if (error) throw error;
		res.send(JSON.stringify(results));
	});
	res.locals.connection.end();
});

router.get('/get/all', function(req, res, next) {
	console.log('Viewing all questions')
	res.locals.connection.connect()
	res.locals.connection.query('SELECT * FROM Question', function (error, results, fields) {
		if (error) throw error;
		res.send(JSON.stringify(results));
	});
	res.locals.connection.end()
})

router.post('/update/:id', function(req, res, next) {
	console.log('Editing question with ID: ' + req.params.id);
	res.locals.connection.connect();
	var sqlupdate = 'UPDATE Question SET qValue = "' + req.body.qValue + '", answer = "' + req.body.answer + '", candidate1 = "' + req.body.candidate1 + '", candidate2 = "' + req.body.candidate2 + '", candidate3 = "' + req.body.candidate3 + '", candidate4 = "' + req.body.candidate4 + '" WHERE qKey = ' + req.params.id;
 	res.locals.connection.query(sqlupdate, function (error, results, fields) {
		if (error) throw error;
		res.send(JSON.stringify(results));
	});
	res.locals.connection.end();
});

router.get('/delete/:id', function(req, res, next) {
	console.log('Deleting question with ID: ' + req.params.id);
	res.locals.connection.connect();
 	res.locals.connection.query('DELETE FROM Question WHERE qKey = ' + req.params.id, function (error, results, fields) {
		if (error) throw error;
		res.send(JSON.stringify(results));
	});
	res.locals.connection.end();
});

router.post('/insert/sa', function(req, res, next) {
  console.log('Inserting new SA to DB');
  var sqladd = 'INSERT INTO Question (qType, qValue, answer) VALUES ?';
    var values = [
      [req.body.qType, req.body.qValue, req.body.answer],
    ];
    res.locals.connection.connect();
    res.locals.connection.query(sqladd, [values], function (err, results, fields) {
      if (err) throw err;
        res.send(JSON.stringify(results));
    });
    res.locals.connection.end();
});

router.post('/insert/mc', function(req, res, next) {
  console.log('Inserting new MC to DB');
	var sqladd = 'INSERT INTO Question (qType, qValue, answer, candidate1, candidate2, candidate3, candidate4) VALUES ?';
  	var values = [
    	[req.body.qType, req.body.qValue, req.body.answer, req.body.candidate1, req.body.candidate2, req.body.candidate3, req.body.candidate4],
  	];
  	res.locals.connection.connect();
  	res.locals.connection.query(sqladd, [values], function (err, results, fields) {
    	if (err) throw err;
        res.send(JSON.stringify(results));
  	});
  	res.locals.connection.end();
});

module.exports = router;
