const mysql = require('mysql')

var connection = mysql.createConnection({
  host     : 'weebwork.c4juqjnoarlo.us-east-2.rds.amazonaws.com',
  user     : 'challenger',
  password : 'onewsheyelai',
  database : 'challengerDb1',
  port: '3306'
})

connection.connect()
  console.log('Connected!')
  // DESCRIPTION OF ALL TABLES
  // Question:
   connection.query('describe Question', function (error, results, fields) {
    if (error) throw error;
    console.log("Question:")
    console.log(results)
  });

  connection.query('describe User', function (error, results, fields) {
   if (error) throw error;
     console.log("\nUser:")
   console.log(results)
  });

  connection.query('describe Quiz', function (error, results, fields) {
   if (error) throw error;
     console.log("\nQuiz:")
   console.log(results)
  });


  connection.query('describe QuizContents', function (error, results, fields) {
   if (error) throw error;
     console.log("\nQuizContents:")
   console.log(results)
  });

  connection.query('describe Attempt', function (error, results, fields) {
   if (error) throw error;
     console.log("\nAttempt:")
   console.log(results)
  });

  connection.query('describe AttemptContents', function (error, results, fields) {
   if (error) throw error;
     console.log("\nAttemptContents:")
   console.log(results)
  });

  var sqldelete = "DELETE FROM Question WHERE qKey = '1'";
  var sqlclear = "truncate Question";

  connection.query('SELECT Attempt.attemptKey, Attempt.studentUsername, Attempt.grade, AttemptContents.answer AS studentAnswer, Question.qKey, Question.qValue, Question.qType, Question.answer, Question.candidate1, Question.candidate2, Question.candidate3, Question.candidate4 ' +
	'FROM Attempt JOIN AttemptContents ' +
	'ON Attempt.attemptKey = AttemptContents.attemptId ' +
	'JOIN Question ON AttemptContents.questionId = Question.qKey', function (err, result) {
    if (err) throw err;
    console.log(result);
  });

connection.end()