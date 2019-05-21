var express = require('express');
var router = express.Router();

router.use(function (req, res, next) {
	console.log ('Time', Date.now());
	next();
})

router.get('/attempt/max', function(req, res, next) {
	console.log('Getting max attempt value')
	var sqlview =
	'SELECT MAX(attemptKey) from Attempt';
	res.locals.connection.connect()
	res.locals.connection.query(sqlview, function (error, results, fields) {
		if (error) throw error;
		res.send(JSON.stringify(results));
	});
	res.locals.connection.end()
})

router.get('/attempt/get/all', function(req, res, next) {
	console.log('Viewing all attempts info:')
	var sqlview =
	'SELECT Attempt.attemptKey, Attempt.studentUsername, Attempt.grade, AttemptContents.answer AS studentAnswer, Question.qKey, Question.qValue, Question.qType, Question.answer, Question.candidate1, Question.candidate2, Question.candidate3, Question.candidate4 ' +
	'FROM Attempt JOIN AttemptContents ' +
	'ON Attempt.attemptKey = AttemptContents.attemptId ' +
	'JOIN Question ON AttemptContents.questionId = Question.qKey';
	res.locals.connection.connect()
	res.locals.connection.query(sqlview, function (error, results, fields) {
		if (error) throw error;
		res.send(JSON.stringify(results));
	});
	res.locals.connection.end()
});

router.get('/attempt/get/allIds', function(req, res, next) {
	console.log('Viewing all attempt Ids:')
	res.locals.connection.connect()
	res.locals.connection.query('SELECT * FROM Attempt', function (error, results, fields) {
		if (error) throw error;
		res.send(JSON.stringify(results));
	});
	res.locals.connection.end()
});

router.get('/attempt/get/:id', function(req, res, next) {
	console.log('Viewing all information about attempt with id: ' + req.params.id)
	var sqlview =
	'SELECT Attempt.attemptKey, Attempt.studentUsername, Attempt.grade, AttemptContents.answer AS studentAnswer, Question.qKey, Question.qValue, Question.qType, Question.answer, Question.candidate1, Question.candidate2, Question.candidate3, Question.candidate4 ' +
	'FROM Attempt JOIN AttemptContents ' +
	'ON Attempt.attemptKey = AttemptContents.attemptId ' +
	'JOIN Question ON AttemptContents.questionId = Question.qKey ' +
	'WHERE Attempt.attemptKey = ' + req.params.id;
	res.locals.connection.connect()
	res.locals.connection.query(sqlview, function (error, results, fields) {
		if (error) throw error;
		res.send(JSON.stringify(results));
	});
	res.locals.connection.end()
});

router.get('/attemptContents/get/:id', function(req, res, next) {
	console.log('Viewing question ids from attempt with id: ' + req.params.id)
	res.locals.connection.connect()
	res.locals.connection.query('SELECT * FROM AttemptContents WHERE attemptKey = ' + req.params.id, function (error, results, fields) {
		if (error) throw error;
		res.send(JSON.stringify(results));
	});
	res.locals.connection.end()
});

router.post('/attempt/insert', function(req, res, next) {
	console.log('Creating a new Attempt:')
	var sqladd = 'INSERT INTO Attempt (studentUsername, grade) VALUES ?';
	var values = [
		[req.body.studentUsername, req.body.grade],
	];
	res.locals.connection.connect()
	res.locals.connection.query(sqladd, [values], function (error, results, fields) {
		if (error) throw error;
		res.send(JSON.stringify(results));
	});
	res.locals.connection.end()
});

router.post('/attempt/update/:id', function(req, res, next) {
	console.log('Updating Attempt with id:' + req.params.id)
	var sqlupdate = 'UPDATE Attempt SET studentUsername = "' + req.body.studentUsername + '", grade = "' + req.body.grade + '" WHERE quizKey = ' + req.params.id;
	res.locals.connection.connect()
	res.locals.connection.query(sqlupdate, function (error, results, fields) {
		if (error) throw error;
		res.send(JSON.stringify(results));
	});
	res.locals.connection.end()
});

router.post('/attempt/delete/:id', function(req, res, next) {
	console.log('Deleting attempt with id :' + req.params.id)
	res.locals.connection.connect()
	res.locals.connection.query('DELETE FROM Attempt WHERE attemptKey = ' + req.params.id, function (error, results, fields) {
		if (error) throw error;
		res.send(JSON.stringify(results));
	});
	res.locals.connection.query('DELETE FROM AttemptContents WHERE attemptId = ' + req.params.id, function (error, results, fields) {
		if (error) throw error;
		res.send(JSON.stringify(results));
	});
	res.locals.connection.end()
});

router.post('/attemptContents/insert/:id', function(req, res, next) {
	console.log('Adding answer from student into Attempt with id: ' + req.params.id)
	var sqladd = 'INSERT INTO AttemptContents (attemptId, questionId, answer) VALUES ?';
	var values = [
		[req.body.id, req.body.questionId, req.body.answer],
	];
	res.locals.connection.connect()
	res.locals.connection.query(sqladd, [values], function (error, results, fields) {
		if (error) throw error;
		res.send(JSON.stringify(results));
	});

	router.post('/attemptContents/delete/:id', function(req, res, next) {
		console.log('Deleting answer with id ' + req.params.questionId + ' from attempt with id: ' + req.params.id)
		res.locals.connection.connect()
		res.locals.connection.query('DELETE FROM QuizContents WHERE attemptId = ' + req.params.id + ' AND questionId = ' + req.params.questionId, function (error, results, fields) {
			if (error) throw error;
			res.send(JSON.stringify(results));
		});
		res.locals.connection.end()
	});

	res.locals.connection.end()
});

module.exports = router;