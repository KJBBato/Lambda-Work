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

  connection.query('SELECT * FROM Quiz', function (error, results, fields) {
   if (error) throw error;
     console.log("\nQuiz:")
   console.log(results)
  });


  connection.query('SELECT * FROM QuizContents', function (error, results, fields) {
   if (error) throw error;
     console.log("\nQuizContents:")
   console.log(results)
  });

  connection.query('SELECT * FROM Attempt', function (error, results, fields) {
   if (error) throw error;
     console.log("\nAttempt:")
   console.log(results)
  });

  connection.query('SELECT * FROM AttemptContents', function (error, results, fields) {
   if (error) throw error;
     console.log("\nAttemptContents:")
   console.log(results)
  });

connection.end()