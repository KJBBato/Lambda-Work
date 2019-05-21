var express = require('express');
var router = express.Router();

router.use(function (req, res, next) {
  console.log ('Time', Date.now())
  next()
})

router.post('/createShortAnswer', function(req, res, next) {
  console.log('Inserting new SA to DB');
  var sqladd = "INSERT INTO Question (qType, qValue, answer) VALUES ?";
    var values = [
      [''+req.body.qType+'', ''+req.body.qValue+'', ''+req.body.answer+''],
    ];
    res.locals.connection.connect();
    res.locals.connection.query(sqladd, [values], function (err, results, fields) {
      if (err) throw err;
        res.send(JSON.stringify(results));
    });
    res.locals.connection.end();
});

router.post('/createMultipleChoice', function(req, res, next) {
  console.log('Inserting new MC to DB');
	var sqladd = "INSERT INTO Question (qType, qValue, answer, candidate1, candidate2, candidate3, candidate4) VALUES ?";
  	var values = [
    	[''+req.body.qType+'', ''+req.body.qValue+'', ''+req.body.answer+'', ''+req.body.candidate1+'', ''+req.body.candidate2+'', ''+req.body.candidate3+'', ''+req.body.candidate4+''],
  	];
  	res.locals.connection.connect();
  	res.locals.connection.query(sqladd, [values], function (err, results, fields) {
    	if (err) throw err;
        res.send(JSON.stringify(results));
  	});
  	res.locals.connection.end();
});

module.exports = router;