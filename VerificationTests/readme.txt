How to Run Verification Tests
1. cd VerificationTests
2. npm install mocha #installs the module mocha used for the testing
3. npm install mysql #installs mysql for the queries used
4. mocha #runs the test file, shows all the test case information

-----

Method of Unit Testing

The mocha tests included have tests making sure the queries in the API work for the app. These tests work with mock tables
representing the actual tables used in the app. These tables are TestQuestion, TestQuiz, TestQuizContents, TestAttempt,
and TestAttemptContents. The tests mostly include the basic queries used to create, delete, and display information in
the app. Each test involves truncating a table, inserting/deleting/updating information, then receiving information using
the SELECT query to confirm the information was sent correctly.
These tests passing ensure that the data manipulation (the backbone of the app) works as described in our product backlog.