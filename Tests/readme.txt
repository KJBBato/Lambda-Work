Steps for running Selenium Tests
1. Open Tests as a project in Eclipse
2. Open file Tests/src/framework/GroupSevenTests.java
3. Add the client-combined jar files in selenium-java-3.7.1 as external jars to the project
4. Add all files in Tests/selenium-java-3.7.1/libs as external jars to the project
5. Run the app (instructions are in l02-07/setup.txt)
5. Run GroupSevenTests.java

---

Other Validation Tests
New features that were added that aren't included in the current automated testing:

Create Quiz - To create a quiz, go to Instructor -> generate -> quiz. Then add in the name of the creator,
the name of the quiz being made, and then use the boxes to the right of each question available to select
which ones should be included in the quiz. After the information is selected, press submit at the bottom of
the page.

View Quiz - To view quizzes, go to Instructor -> view/edit -> quizzes. Then you will see all quiz names with spoiler
tags next to each of them. To view more information about a specific quiz, click its corresponding spoiler tag.

Complete a quiz - To do a quiz, go to Student -> Select Quiz. Then you will see all quiz names with spoiler
tags next to each of them. Click the spoiler tag of the quiz to be completed. Then, for each question presented,
enter your answer in the corresponding text boxes and click submit.

View quiz attempts - To view student quiz attempts, go to Instructor -> quiz attempt. Then you will see all quiz 
attempts with spoiler tags next to each of them. To view more information about a specific quiz attempt, click its
corresponding spoiler tag.