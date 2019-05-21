package src.framework;

import java.util.Iterator;
import java.util.List;
import java.util.concurrent.TimeUnit;

import org.openqa.selenium.By;
import org.openqa.selenium.JavascriptExecutor;
import org.openqa.selenium.NoSuchElementException;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;

public class GroupSevenTests {

  WebDriver driver;

  public void invokeBrowser(){
    try {
      // BEFORE RUNNING THIS PROGRAM, READ readme.txt IN selenium-tests
      
      String projectDirectory = System.getProperty("user.dir");
      String exePathWin = projectDirectory + "\\ChromeDriver\\chromedriver.exe";
      String exePathMac = projectDirectory + "/ChromeDriver/chromedriver";
      String os = System.getProperty("os.name").toLowerCase();
      if (os.contains("mac")) {
        System.setProperty("webdriver.chrome.driver", exePathMac);
      } else {
        System.setProperty("webdriver.chrome.driver", exePathWin);
      }
      driver = new ChromeDriver();
      driver.manage().deleteAllCookies();
      driver.manage().timeouts().implicitlyWait(30, TimeUnit.SECONDS);
      driver.manage().timeouts().pageLoadTimeout(30, TimeUnit.SECONDS);

      driver.get("http://localhost:3000/");
      // Print a Log In message to the screen
      Thread.sleep(500);
      System.out.println("Successfully opened the website");
      // Run the tests
      buttonLinks();
      submitQuestion();
      checkQuestion();
      editQuestion();
      checkEditedQuestion();
      deleteQuestion();
      driver.close();
    } catch (Exception e) {
      e.printStackTrace();
    }

  }

  public void buttonLinks() {
    System.out.println("Checking button links:");
    driver.findElement(By.partialLinkText("Instructor")).click();
    String currentURL = driver.getCurrentUrl();
    boolean isCorrectURL = "http://localhost:3000/instructor".equals(currentURL);
    System.out.println(isCorrectURL + ", Instructor leads to: " + currentURL);
    driver.findElement(By.partialLinkText("generate")).click();
    currentURL = driver.getCurrentUrl();
    isCorrectURL = "http://localhost:3000/instructor/generateApp".equals(currentURL);
    System.out.println(isCorrectURL + ", generate leads to: " + currentURL);
    driver.findElement(By.partialLinkText("short answer")).click();
    currentURL = driver.getCurrentUrl();
    isCorrectURL = "http://localhost:3000/generateApp/createShortAnswer".equals(currentURL);
    System.out.println(isCorrectURL + ", short answer leads to: " + currentURL);
    driver.findElement(By.partialLinkText("view")).click();
    currentURL = driver.getCurrentUrl();
    isCorrectURL = "http://localhost:3000/instructor/viewApp".equals(currentURL);
    System.out.println(isCorrectURL + ", view//edit leads to: " + currentURL);
    driver.findElement(By.partialLinkText("questions")).click();
    currentURL = driver.getCurrentUrl();
    isCorrectURL = "http://localhost:3000/viewApp/questions".equals(currentURL);
    System.out.println(isCorrectURL + ", questions leads to: " + currentURL);
    driver.findElement(By.partialLinkText("Student")).click();
    currentURL = driver.getCurrentUrl();
    isCorrectURL = "http://localhost:3000/student".equals(currentURL);
    System.out.println(isCorrectURL + ", Student leads to: " + currentURL);
  }

  public void submitQuestion() throws InterruptedException {
    System.out.println("");
    driver.findElement(By.partialLinkText("Instructor")).click();
    Thread.sleep(20);
    driver.findElement(By.partialLinkText("generate")).click();
    Thread.sleep(20);
    driver.findElement(By.partialLinkText("short answer")).click();
    Thread.sleep(20);
    List<WebElement> textBoxes = driver.findElements(By.xpath("//textarea"));
    Iterator<WebElement> itr = textBoxes.iterator();
    WebElement valueBox = itr.next();
    String question = "What is the answer?";
    valueBox.sendKeys(question);
    WebElement answerBox = itr.next();
    String answer = "This is the answer.";
    answerBox.sendKeys(answer);
    driver.findElement(By.xpath("//button[contains(.,'submit')]")).click();
    System.out.println("Submitted Short Answer Question, info below:");
    System.out.println("Question: " + question);
    System.out.println("Answer: " + answer);
  }

  public void checkQuestion() throws InterruptedException {
    System.out.println("");
    driver.findElement(By.partialLinkText("Instructor")).click();
    Thread.sleep(20);
    driver.findElement(By.partialLinkText("view")).click();
    Thread.sleep(20);
    driver.findElement(By.partialLinkText("questions")).click();
    Thread.sleep(500);
    // Loop through all the indices displayed
    List<WebElement> ids = driver.findElements(By.xpath("//*[text()[contains(.,'index')]]"));
    Iterator<WebElement> itr = ids.iterator();
    WebElement lastElement = null;
    while(itr.hasNext()) {
      lastElement = itr.next();
    }
    // Get the parent of the last index and print it
    WebElement parent = (WebElement) ((JavascriptExecutor) driver).executeScript(
        "return arguments[0].parentNode;", lastElement);
    System.out.println("Submitted Question:");
    System.out.println(parent.getText());
  }

  public void editQuestion() throws InterruptedException {
    System.out.println("");
    driver.findElement(By.partialLinkText("Instructor")).click();
    Thread.sleep(20);
    driver.findElement(By.partialLinkText("view")).click();
    Thread.sleep(20);
    driver.findElement(By.partialLinkText("questions")).click();
    Thread.sleep(500);
    // Loop through all the indices displayed
    List<WebElement> ids = driver.findElements(By.xpath("//button[contains(.,'edit')]"));
    Iterator<WebElement> itr = ids.iterator();
    WebElement lastElement = null;
    while(itr.hasNext()) {
      lastElement = itr.next();
    }
    // Press the last edit button
    lastElement.click();
    // Edit the values of the textboxes
    String question = "What is the actual answer?";
    String answer = "This is the actual answer.";
    List<WebElement> textBoxes = driver.findElements(By.xpath("//textarea"));
    itr = textBoxes.iterator();
    WebElement valueBox = itr.next();
    valueBox.clear();
    valueBox.sendKeys();
    WebElement answerBox = itr.next();
    answerBox.clear();
    answerBox.sendKeys(answer);
    driver.findElement(By.xpath("//button[contains(.,'submit')]")).click();
    System.out.println("Edited Short Answer Question, info below:");
    System.out.println("Question: " + question);
    System.out.println("Answer: " + answer);
  }

  public void checkEditedQuestion() throws InterruptedException {
    System.out.println("");
    Thread.sleep(1000);
    driver.navigate().refresh();
    driver.findElement(By.partialLinkText("Instructor")).click();
    Thread.sleep(20);
    driver.findElement(By.partialLinkText("view")).click();
    Thread.sleep(20);
    driver.findElement(By.partialLinkText("questions")).click();
    Thread.sleep(500);
    // Loop through all the indices displayed
    List<WebElement> ids = driver.findElements(By.xpath("//*[text()[contains(.,'index')]]"));
    Iterator<WebElement> itr = ids.iterator();
    WebElement lastElement = null;
    while(itr.hasNext()) {
      lastElement = itr.next();
    }
    // Get the parent of the last index and print it
    WebElement parent = (WebElement) ((JavascriptExecutor) driver).executeScript(
        "return arguments[0].parentNode;", lastElement);
    System.out.println("Edited Question:");
    System.out.println(parent.getText());
  }

  public void deleteQuestion() throws InterruptedException {
    System.out.println("");
    driver.findElement(By.partialLinkText("Instructor")).click();
    Thread.sleep(20);
    driver.findElement(By.partialLinkText("view")).click();
    Thread.sleep(20);
    driver.findElement(By.partialLinkText("questions")).click();
    
    driver.findElement(By.xpath("//button[contains(.,'view')]")).click();
    Thread.sleep(500);

    // Get the last index item
    List<WebElement> ids = driver.findElements(By.xpath("//*[text()[contains(.,'index')]]"));
    Iterator<WebElement> itr = ids.iterator();
    WebElement lastElement = null;
    while(itr.hasNext()) {
      lastElement = itr.next();
    }
    String lastIndex = lastElement.getText().replaceAll("[^0-9]", "");
    
    // Loop through all the questions displayed
    List<WebElement> deleteButtons = driver.findElements(By.xpath("//button[contains(.,'delete')]"));
    itr = deleteButtons.iterator();
    WebElement lastDelete = null;
    while(itr.hasNext()) {
      lastDelete = itr.next();
    }
    // Press the last delete button
    System.out.println("Deleting question with index: " + lastIndex);
    
    lastDelete.click();
    
    // Go through final delete
    driver.findElement(By.xpath("//button[contains(.,'delete')]")).click();
    Thread.sleep(100);
    
    // Refresh
    driver.navigate().refresh();
    driver.findElement(By.partialLinkText("Instructor")).click();
    driver.findElement(By.partialLinkText("view")).click();
    driver.findElement(By.partialLinkText("questions")).click();

    // Check for last element
    try {
      WebElement fan = driver.findElement(By.xpath("//*[text()[contains(.,'" + lastIndex + "')]]"));
      System.out.println("If empty, question with index is gone: " + fan.getText());
    } catch(Exception e) {
      System.out.println("Question #" + lastIndex + " no longer exists.");
    }
  }

  public static void main(String[] args) throws InterruptedException {
    GroupSevenTests test = new GroupSevenTests();
    test.invokeBrowser();



    //    //Wait for 5 Sec
    //    Thread.sleep(5000);
    //
    //    WebElement click = driver.findElement(By.xpath("//button[contains(.,'generate')]"));
    //
    //    click.click();
    //
    //    //Wait for 5 Sec
    //    Thread.sleep(5000);
    //    // Close the driver
  }

}
