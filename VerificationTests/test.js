var assert = require('assert');
var mysql = require('mysql');
var should = require('chai').should(),
expect = require('chai'),
supertest = require('supertest'),
api = supertest('http://localhost:3000');

var connection = mysql.createConnection({
  host     : 'weebwork.c4juqjnoarlo.us-east-2.rds.amazonaws.com',
  user     : 'challenger',
  password : 'onewsheyelai',
  database : 'challengerDb1',
  port: '3306'
});

  after(function() {
    connection.end();
    console.log('Done!')
  });

describe('QuestionAPI', function() {
    beforeEach(function() {
      connection = mysql.createConnection({
        host     : 'weebwork.c4juqjnoarlo.us-east-2.rds.amazonaws.com',
        user     : 'challenger',
        password : 'onewsheyelai',
        database : 'challengerDb1',
        port: '3306'
      });
      connection.query('truncate TestQuestion', function (error, results, fields) {
       if (error) throw error;
         result = results;
      });
    });

    it('SELECT * should return empty list when nothing in question table', function() {
      var result = [];
      connection.query('SELECT * FROM TestQuestion', function (error, results, fields) {
       if (error) throw error;
         result = results;
         assert.deepEqual([], result);
      });
    });

    it('SELECT * should return one RowDataPacket when Question is added', function() {
      var result = [];
      var sqlAdd = "INSERT INTO TestQuestion (qType, qValue, answer) VALUES ?";
      var values = [
        ['type','value','answer'],
      ];
      connection.query(sqlAdd, [values], function (err, result) {
        if (err) throw err;
        // console.log("Number of records deleted: " + result.affectedRows);
      });
      connection.query('SELECT * FROM TestQuestion', function (error, results, fields) {
       if (error) throw error;
         result = results;
         var expectedType = 'type';
         assert.equal('type', results[0].qType);
         assert.equal('value', results[0].qValue);
         assert.equal('answer', results[0].answer);
      });
    });

    it('SELECT * should return three RowDataPacket when three questions are added', function() {
      var result = [];
      var sqlAdd = "INSERT INTO TestQuestion (qType, qValue, answer) VALUES ?";
      var values = [
        ['type1','value1','answer1'],
      ];
      connection.query(sqlAdd, [values], function (err, result) {
        if (err) throw err;
        // console.log("Number of records deleted: " + result.affectedRows);
      });
      var sqlAdd = "INSERT INTO TestQuestion (qType, qValue, answer) VALUES ?";
      var values = [
        ['type2','value2','answer2'],
      ];
      connection.query(sqlAdd, [values], function (err, result) {
        if (err) throw err;
        // console.log("Number of records deleted: " + result.affectedRows);
      });
      var sqlAdd = "INSERT INTO TestQuestion (qType, qValue, answer) VALUES ?";
      var values = [
        ['type3','value3','answer3'],
      ];
      connection.query(sqlAdd, [values], function (err, result) {
        if (err) throw err;
        // console.log("Number of records deleted: " + result.affectedRows);
      });
      connection.query('SELECT * FROM TestQuestion', function (error, results, fields) {
       if (error) throw error;
         result = results;
         assert.equal('type1', results[0].qType);
         assert.equal('value1', results[0].qValue);
         assert.equal('answer1', results[0].answer);
         assert.equal('type2', results[1].qType);
         assert.equal('value2', results[1].qValue);
         assert.equal('answer2', results[1].answer);
         assert.equal('type3', results[2].qType);
         assert.equal('value3', results[2].qValue);
         assert.equal('answer3', results[2].answer);
      });
    });

    it('SELECT from sa only shows sa', function() {
      var result = [];
      var sqlAdd = "INSERT INTO TestQuestion (qType, qValue, answer) VALUES ?";
      var values = [
        ['MC','value1','answer1'],
      ];
      connection.query(sqlAdd, [values], function (err, result) {
        if (err) throw err;
        // console.log("Number of records deleted: " + result.affectedRows);
      });
      var sqlAdd = "INSERT INTO TestQuestion (qType, qValue, answer) VALUES ?";
      var values = [
        ['SA','value2','answer2'],
      ];
      connection.query(sqlAdd, [values], function (err, result) {
        if (err) throw err;
        // console.log("Number of records deleted: " + result.affectedRows);
      });
      connection.query('SELECT * FROM TestQuestion WHERE qType="SA"', function (error, results, fields) {
       if (error) throw error;
         result = results;
         assert.equal('SA', results[0].qType);
      });
    });

    it('SELECT from mc only shows mc', function() {
      var result = [];
      var sqlAdd = "INSERT INTO TestQuestion (qType, qValue, answer) VALUES ?";
      var values = [
        ['SA','value2','answer2'],
      ];
      connection.query(sqlAdd, [values], function (err, result) {
        if (err) throw err;
        // console.log("Number of records deleted: " + result.affectedRows);
      });
      var sqlAdd = "INSERT INTO TestQuestion (qType, qValue, answer) VALUES ?";
      var values = [
        ['MC','value1','answer1'],
      ];
      connection.query(sqlAdd, [values], function (err, result) {
        if (err) throw err;
        // console.log("Number of records deleted: " + result.affectedRows);
      });
      connection.query('SELECT * FROM TestQuestion WHERE qType="MC"', function (error, results, fields) {
       if (error) throw error;
         result = results;
         assert.equal('MC', results[0].qType);
      });
    });

    it('UPDATE changes each value', function() {
      var result = [];
      var sqlAdd = "INSERT INTO TestQuestion (qType, qValue, answer) VALUES ?";
      var values = [
        ['type','value','answer'],
      ];
      connection.query(sqlAdd, [values], function (err, result) {
        if (err) throw err;
        // console.log("Number of records deleted: " + result.affectedRows);
      });
      var sqlAdd = 'UPDATE TestQuestion SET qValue = "newValue", answer = "newAnswer", WHERE qKey = 1';
      connection.query(sqlAdd, function (err, result) {
        if (err) throw err;
        // console.log("Number of records deleted: " + result.affectedRows);
      });
      connection.query('SELECT * FROM TestQuestion', function (error, results, fields) {
       if (error) throw error;
         result = results;
         assert.equal('newValue', results[0].qValue);
         assert.equal('newAnswer', results[0].answer);
      });
    });

    it('DELETE removes the question inserted', function() {
      var result = [];
      var sqlAdd = "INSERT INTO TestQuestion (qType, qValue, answer) VALUES ?";
      var values = [
        ['type','value','answer'],
      ];
      connection.query(sqlAdd, [values], function (err, result) {
        if (err) throw err;
        // console.log("Number of records deleted: " + result.affectedRows);
      });
      var sqlAdd = 'DELETE FROM TestQuestion WHERE qKey = 1';
      connection.query(sqlAdd, function (err, result) {
        if (err) throw err;
        // console.log("Number of records deleted: " + result.affectedRows);
      });
      connection.query('SELECT * FROM TestQuestion', function (error, results, fields) {
       if (error) throw error;
         result = results;
         assert.deepEqual([], result);
      });
    });

    it('INSERT SA should create a short answer', function() {
      var result = [];
      var sqlAdd = 'INSERT INTO TestQuestion (qType, qValue, answer) VALUES ?';
      var values = [
        ['SA','value','answer'],
      ];
      connection.query(sqlAdd, [values], function (err, result) {
        if (err) throw err;
        // console.log("Number of records deleted: " + result.affectedRows);
      });
      connection.query('SELECT * FROM TestQuestion', function (error, results, fields) {
       if (error) throw error;
         result = results;
         assert.equal('SA', results[0].qType);
         assert.equal('value', results[0].qValue);
         assert.equal('answer', results[0].answer);
      });
    });

    it('INSERT MC should create a multiple choice question', function() {
      var result = [];
      var sqlAdd = 'INSERT INTO TestQuestion (qType, qValue, answer, candidate1, candidate2, candidate3, candidate4) VALUES ?';
      var values = [
        ['MC','value','answer', 'a', 'b', 'c', 'd'],
      ];
      connection.query(sqlAdd, [values], function (err, result) {
        if (err) throw err;
        // console.log("Number of records deleted: " + result.affectedRows);
      });
      connection.query('SELECT * FROM TestQuestion', function (error, results, fields) {
       if (error) throw error;
         result = results;
         assert.equal('MC', results[0].qType);
         assert.equal('value', results[0].qValue);
         assert.equal('answer', results[0].answer);
         assert.equal('a', results[0].candidate1);
         assert.equal('b', results[0].candidate2);
         assert.equal('c', results[0].candidate3);
         assert.equal('d', results[0].candidate4);
      });
    });
});

describe('QuizAPI', function() {
    beforeEach(function() {
      connection = mysql.createConnection({
        host     : 'weebwork.c4juqjnoarlo.us-east-2.rds.amazonaws.com',
        user     : 'challenger',
        password : 'onewsheyelai',
        database : 'challengerDb1',
        port: '3306'
      });
      connection.query('truncate TestQuiz', function (error, results, fields) {
       if (error) throw error;
         result = results;
      });
    });

    it('MAX quizKey should return 3 when 3 quizzes are added', function() {
      var result = [];
      var sqlAdd = "INSERT INTO TestQuiz (quizName, quizCreator) VALUES ?";
      var values = [
        ['name1','creator1'],
      ];
      connection.query(sqlAdd, [values], function (err, result) {
        if (err) throw err;
        // console.log("Number of records deleted: " + result.affectedRows);
      });
      var sqlAdd = "INSERT INTO TestQuiz (quizName, quizCreator) VALUES ?";
      var values = [
        ['name2','creator2'],
      ];
      connection.query(sqlAdd, [values], function (err, result) {
        if (err) throw err;
        // console.log("Number of records deleted: " + result.affectedRows);
      });
      var sqlAdd = "INSERT INTO TestQuiz (quizName, quizCreator) VALUES ?";
      var values = [
        ['name3','creator3'],
      ];
      connection.query(sqlAdd, [values], function (err, result) {
        if (err) throw err;
        // console.log("Number of records deleted: " + result.affectedRows);
      });
      connection.query('SELECT MAX(quizKey) from TestQuiz', function (error, results, fields) {
       if (error) throw error;
         assert.equal(3, results[0].MAX(quizKey));
      });
    });

    it('SELECT * should return one RowDataPacket when one Quiz is added', function() {
      var result = [];
      var sqlAdd = "INSERT INTO TestQuiz (quizName, quizCreator) VALUES ?";
      var values = [
        ['name','creator'],
      ];
      connection.query(sqlAdd, [values], function (err, result) {
        if (err) throw err;
        // console.log("Number of records deleted: " + result.affectedRows);
      });
      connection.query('SELECT * FROM TestQuiz', function (error, results, fields) {
       if (error) throw error;
         assert.equal('name', results[0].quizName);
         assert.equal('creator', results[0].quizCreator);
      });
    });

    it('SELECT * should return three RowDataPacket when three questions are added', function() {
      var sqlAdd = "INSERT INTO TestQuiz (quizName, quizCreator) VALUES ?";
      var values = [
        ['name1','creator1'],
      ];
      connection.query(sqlAdd, [values], function (err, result) {
        if (err) throw err;
        // console.log("Number of records deleted: " + result.affectedRows);
      });
      var sqlAdd = "INSERT INTO TestQuiz (quizName, quizCreator) VALUES ?";
      var values = [
        ['name2','creator2'],
      ];
      connection.query(sqlAdd, [values], function (err, result) {
        if (err) throw err;
        // console.log("Number of records deleted: " + result.affectedRows);
      });
      var sqlAdd = "INSERT INTO TestQuiz (quizName, quizCreator) VALUES ?";
      var values = [
        ['name3','creator3'],
      ];
      connection.query(sqlAdd, [values], function (err, result) {
        if (err) throw err;
        // console.log("Number of records deleted: " + result.affectedRows);
      });
      connection.query('SELECT * FROM TestQuiz', function (error, results, fields) {
       if (error) throw error;
         result = results;
         assert.equal('name1', results[0].quizName);
         assert.equal('creator1', results[0].quizCreator);
         assert.equal('name2', results[1].quizName);
         assert.equal('creator2', results[1].quizCreator);
         assert.equal('name3', results[2].quizName);
         assert.equal('creator3', results[2].quizCreator);
      });
    });

    it('UPDATE changes each value', function() {
      var sqlAdd = "INSERT INTO TestQuiz (quizName, quizCreator) VALUES ?";
      var values = [
        ['name','creator'],
      ];
      connection.query(sqlAdd, [values], function (err, result) {
        if (err) throw err;
        // console.log("Number of records deleted: " + result.affectedRows);
      });
      var sqlAdd = 'UPDATE TestQuiz SET quizName = "newName", quizCreator = "newAnswer", WHERE quizKey = 1';
      connection.query(sqlAdd, function (err, result) {
        if (err) throw err;
        // console.log("Number of records deleted: " + result.affectedRows);
      });
      connection.query('SELECT * FROM TestQuiz', function (error, results, fields) {
       if (error) throw error;
         result = results;
         assert.equal('newValue', results[0].quizName);
         assert.equal('newAnswer', results[0].quizCreator);
      });
    });

    it('DELETE removes the quiz inserted', function() {
      var sqlAdd = "INSERT INTO TestQuiz (quizName, quizCreator) VALUES ?";
      var values = [
        ['name','creator'],
      ];
      connection.query(sqlAdd, [values], function (err, result) {
        if (err) throw err;
        // console.log("Number of records deleted: " + result.affectedRows);
      });
      var sqlAdd = 'DELETE FROM TestQuiz WHERE quizKey = 1';
      connection.query(sqlAdd, function (err, result) {
        if (err) throw err;
        // console.log("Number of records deleted: " + result.affectedRows);
      });
      connection.query('SELECT * FROM TestQuiz', function (error, results, fields) {
       if (error) throw error;
         result = results;
         assert.deepEqual([], result);
      });
    });
});

describe('QuizContentsAPI', function() {
    beforeEach(function() {
      connection = mysql.createConnection({
        host     : 'weebwork.c4juqjnoarlo.us-east-2.rds.amazonaws.com',
        user     : 'challenger',
        password : 'onewsheyelai',
        database : 'challengerDb1',
        port: '3306'
      });
      connection.query('truncate TestQuizContents', function (error, results, fields) {
       if (error) throw error;
         result = results;
      });
    });

    it('SELECT * should return one RowDataPacket when one quiz question is added', function() {
      var sqlAdd = 'INSERT INTO TestQuizContents (quizId, questionId) VALUES ?';
      var values = [
        [1,1],
      ];
      connection.query(sqlAdd, [values], function (err, result) {
        if (err) throw err;
        // console.log("Number of records deleted: " + result.affectedRows);
      });
      connection.query('SELECT * FROM TestQuizContents', function (error, results, fields) {
       if (error) throw error;
         assert.equal(1, results[0].quizId);
         assert.equal(1, results[0].questionId);
      });
    });

    it('SELECT * should return three RowDataPacket when three questions are added to a quiz', function() {
      var sqlAdd = 'INSERT INTO TestQuizContents (quizId, questionId) VALUES ?';
      var values = [
        [1,1],
      ];
      connection.query(sqlAdd, [values], function (err, result) {
        if (err) throw err;
        // console.log("Number of records deleted: " + result.affectedRows);
      });
      var sqlAdd = 'INSERT INTO TestQuizContents (quizId, questionId) VALUES ?';
      var values = [
        [1,2],
      ];
      connection.query(sqlAdd, [values], function (err, result) {
        if (err) throw err;
        // console.log("Number of records deleted: " + result.affectedRows);
      });
      var sqlAdd = 'INSERT INTO TestQuizContents (quizId, questionId) VALUES ?';
      var values = [
        [1,3],
      ];
      connection.query(sqlAdd, [values], function (err, result) {
        if (err) throw err;
        // console.log("Number of records deleted: " + result.affectedRows);
      });
      connection.query('SELECT * FROM TestQuizContents', function (error, results, fields) {
       if (error) throw error;
         assert.equal(1, results[0].quizId);
         assert.equal(1, results[0].questionId);
         assert.equal(1, results[1].quizId);
         assert.equal(2, results[1].questionId);
         assert.equal(1, results[2].quizId);
         assert.equal(3, results[2].questionId);
      });
    });

    it('DELETE removes a question assigned to a quiz', function() {
      var sqlAdd = 'INSERT INTO TestQuizContents (quizId, questionId) VALUES ?';
      var values = [
        [1,1],
      ];
      connection.query(sqlAdd, [values], function (err, result) {
        if (err) throw err;
        // console.log("Number of records deleted: " + result.affectedRows);
      });
      var sqlAdd = 'DELETE FROM TestQuizContents WHERE quizId = 1 AND questionId = 1';
      connection.query(sqlAdd, function (err, result) {
        if (err) throw err;
        // console.log("Number of records deleted: " + result.affectedRows);
      });
      connection.query('SELECT * FROM TestQuizContents', function (error, results, fields) {
       if (error) throw error;
         result = results;
         assert.deepEqual([], result);
      });
    });
});

describe('AttemptAPI', function() {
    beforeEach(function() {
      connection = mysql.createConnection({
        host     : 'weebwork.c4juqjnoarlo.us-east-2.rds.amazonaws.com',
        user     : 'challenger',
        password : 'onewsheyelai',
        database : 'challengerDb1',
        port: '3306'
      });
      connection.query('truncate TestAttempt', function (error, results, fields) {
       if (error) throw error;
         result = results;
      });
    });

    it('MAX attemptKey should return 3 when 3 attempts are added', function() {
      var sqlAdd = "INSERT INTO TestAttempt (studentUsername, grade) VALUES ?";
      var values = [
        ['student1',75],
      ];
      connection.query(sqlAdd, [values], function (err, result) {
        if (err) throw err;
        // console.log("Number of records deleted: " + result.affectedRows);
      });
      var sqlAdd = "INSERT INTO TestAttempt (studentUsername, grade) VALUES ?";
      var values = [
        ['student2',80],
      ];
      connection.query(sqlAdd, [values], function (err, result) {
        if (err) throw err;
        // console.log("Number of records deleted: " + result.affectedRows);
      });
      var sqlAdd = "INSERT INTO TestAttempt (studentUsername, grade) VALUES ?";
      var values = [
        ['student3',100],
      ];
      connection.query(sqlAdd, [values], function (err, result) {
        if (err) throw err;
        // console.log("Number of records deleted: " + result.affectedRows);
      });
      connection.query('SELECT MAX(attemptKey) from TestAttempt', function (error, results, fields) {
       if (error) throw error;
         assert.equal(3, results[0].MAX(quizKey));
      });
    });

    it('SELECT * should return one RowDataPacket when one Attempt is added', function() {
      var sqlAdd = "INSERT INTO TestAttempt (studentUsername, grade) VALUES ?";
      var values = [
        ['student',75],
      ];
      connection.query(sqlAdd, [values], function (err, result) {
        if (err) throw err;
        // console.log("Number of records deleted: " + result.affectedRows);
      });
      connection.query('SELECT * FROM TestAttempt', function (error, results, fields) {
       if (error) throw error;
         assert.equal('student', results[0].studentUsername);
         assert.equal(75, results[0].grade);
      });
    });

    it('SELECT * should return three RowDataPackets when three questions are added', function() {
      var sqlAdd = "INSERT INTO TestAttempt (studentUsername, grade) VALUES ?";
      var values = [
        ['student1',75],
      ];
      connection.query(sqlAdd, [values], function (err, result) {
        if (err) throw err;
        // console.log("Number of records deleted: " + result.affectedRows);
      });
      var sqlAdd = "INSERT INTO TestAttempt (studentUsername, grade) VALUES ?";
      var values = [
        ['student2',80],
      ];
      connection.query(sqlAdd, [values], function (err, result) {
        if (err) throw err;
        // console.log("Number of records deleted: " + result.affectedRows);
      });
      var sqlAdd = "INSERT INTO TestAttempt (studentUsername, grade) VALUES ?";
      var values = [
        ['student3',100],
      ];
      connection.query(sqlAdd, [values], function (err, result) {
        if (err) throw err;
        // console.log("Number of records deleted: " + result.affectedRows);
      });
      connection.query('SELECT * FROM TestAttempt', function (error, results, fields) {
       if (error) throw error;
         assert.equal('student1', results[0].studentUsername);
         assert.equal(75, results[0].grade);
         assert.equal('student2', results[1].studentUsername);
         assert.equal(80, results[1].grade);
         assert.equal('student3', results[2].studentUsername);
         assert.equal(100, results[2].grade);
      });
    });

    it('UPDATE changes the values of attempt username and grade', function() {
      var sqlAdd = "INSERT INTO TestAttempt (studentUsername, grade) VALUES ?";
      var values = [
        ['student',75],
      ];
      connection.query(sqlAdd, [values], function (err, result) {
        if (err) throw err;
        // console.log("Number of records deleted: " + result.affectedRows);
      });
      var sqlAdd = 'UPDATE TestAttempt SET studentUsername = "student", grade = 50, WHERE attemptKey = 1';
      connection.query(sqlAdd, function (err, result) {
        if (err) throw err;
        // console.log("Number of records deleted: " + result.affectedRows);
      });
      connection.query('SELECT * FROM TestAttempt', function (error, results, fields) {
       if (error) throw error;
         assert.equal('student', results[0].studentUsername);
         assert.equal(50, results[0].grade);
      });
    });

    it('DELETE removes the attempt inserted', function() {
      var sqlAdd = "INSERT INTO TestAttempt (studentUsername, grade) VALUES ?";
      var values = [
        ['student',75],
      ];
      connection.query(sqlAdd, [values], function (err, result) {
        if (err) throw err;
        // console.log("Number of records deleted: " + result.affectedRows);
      });
      var sqlAdd = 'DELETE FROM TestAttempt WHERE attemptKey = 1';
      connection.query(sqlAdd, function (err, result) {
        if (err) throw err;
        // console.log("Number of records deleted: " + result.affectedRows);
      });
      connection.query('SELECT * FROM TestAttempt', function (error, results, fields) {
       if (error) throw error;
         assert.deepEqual([], result);
      });
    });
});

describe('AttemptContentsAPI', function() {
    beforeEach(function() {
      connection = mysql.createConnection({
        host     : 'weebwork.c4juqjnoarlo.us-east-2.rds.amazonaws.com',
        user     : 'challenger',
        password : 'onewsheyelai',
        database : 'challengerDb1',
        port: '3306'
      });
      connection.query('truncate TestAttemptContents', function (error, results, fields) {
       if (error) throw error;
         result = results;
      });
    });

    it('SELECT * should return one RowDataPacket when one attempt answer is added', function() {
      var sqlAdd = 'INSERT INTO AttemptContents (attemptId, questionId, answer) VALUES ?';
      var values = [
        [1,1,'answer'],
      ];
      connection.query(sqlAdd, [values], function (err, result) {
        if (err) throw err;
        // console.log("Number of records deleted: " + result.affectedRows);
      });
      connection.query('SELECT * FROM TestAttemptContents', function (error, results, fields) {
       if (error) throw error;
         assert.equal(1, results[0].attemptId);
         assert.equal(1, results[0].questionId);
         assert.equal('answer', results[0].answer);
      });
    });

    it('SELECT * should return three RowDataPackets when three attempt answer are added to an attempt', function() {
      var sqlAdd = 'INSERT INTO AttemptContents (attemptId, questionId, answer) VALUES ?';
      var values = [
        [1,1,'answer1'],
      ];
      connection.query(sqlAdd, [values], function (err, result) {
        if (err) throw err;
        // console.log("Number of records deleted: " + result.affectedRows);
      });
      var sqlAdd = 'INSERT INTO AttemptContents (attemptId, questionId, answer) VALUES ?';
      var values = [
        [1,2,'answer2'],
      ];
      connection.query(sqlAdd, [values], function (err, result) {
        if (err) throw err;
        // console.log("Number of records deleted: " + result.affectedRows);
      });
      var sqlAdd = 'INSERT INTO AttemptContents (attemptId, questionId, answer) VALUES ?';
      var values = [
        [1,3,'answer3'],
      ];
      connection.query(sqlAdd, [values], function (err, result) {
        if (err) throw err;
        // console.log("Number of records deleted: " + result.affectedRows);
      });
      connection.query('SELECT * FROM TestAttemptContents', function (error, results, fields) {
       if (error) throw error;
         assert.equal(1, results[0].attemptId);
         assert.equal(1, results[0].questionId);
         assert.equal('answer1', results[0].answer);
         assert.equal(1, results[1].attemptId);
         assert.equal(2, results[1].questionId);
         assert.equal('answer2', results[1].answer);
         assert.equal(1, results[2].attemptId);
         assert.equal(3, results[2].questionId);
         assert.equal('answer3', results[2].answer);
      });
    });

    it('DELETE removes a question assigned to a quiz', function() {
      var sqlAdd = 'INSERT INTO AttemptContents (attemptId, questionId, answer) VALUES ?';
      var values = [
        [1,1,'answer'],
      ];
      connection.query(sqlAdd, [values], function (err, result) {
        if (err) throw err;
        // console.log("Number of records deleted: " + result.affectedRows);
      });
      var sqlAdd = 'DELETE FROM TestAttemptContents WHERE attemptId = 1 AND questionId = 1';
      connection.query(sqlAdd, function (err, result) {
        if (err) throw err;
        // console.log("Number of records deleted: " + result.affectedRows);
      });
      connection.query('SELECT * FROM TestAttemptContents', function (error, results, fields) {
       if (error) throw error;
         result = results;
         assert.deepEqual([], result);
      });
    });
  });
