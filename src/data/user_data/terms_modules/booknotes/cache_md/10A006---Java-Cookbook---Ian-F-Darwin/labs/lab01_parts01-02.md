# Lab 01: Building a Simple File Downloader with Apache Maven

**Book:** Java-Cookbook - Ian-F-Darwin
**Chapters Covered:** Parts 01-02
**Estimated Time:** 2-3 hours

---

## 📋 Objectives

- Understand the basics of Java programming using Java-Cookbook chapter content.
- Learn how to automate dependencies compilation testing and deployment with Apache Maven.
- Build a simple file downloader application that utilizes Maven for project management.

## 🔑 Key Concepts

- **Maven Build Lifecycle**
- **Dependency Management with Maven**
- **Apache Ant Scripting**

## ✅ Prerequisites

- Basic understanding of Java programming using Java-Cookbook chapter content.
- Apache Maven installed on the students' machines.

---

## 🧪 Exercises

### Exercise 1: Create a new Maven project

Using the command line, create a new directory for your project and navigate to it. Initialize a new Maven project using the `mvn archetype:generate` command.

#### 💡 Hints

- Use the correct archtype (e.g., 'maven-archetype-quickstart')
- Specify the desired project name

#### ✓ Validation Criteria

Verify that the directory contains a pom.xml file.

---

### Exercise 2: Add dependencies to the project

Open the pom.xml file and add the necessary dependencies for your application. For example, you may want to include the `junit` library for testing.

#### Starter Code

```python
['<dependencies>', '    <dependency>', '        <groupId>junit</groupId>', '        <artifactId>junit</artifactId>', '        <version>4.12</version>', '    </dependency>', '</dependencies>']
```

#### 💡 Hints

- Use the correct groupId, artifactId, and version numbers
- Include any other dependencies required by your project

#### ✓ Validation Criteria

Verify that the pom.xml file includes all necessary dependencies.

---

### Exercise 3: Create a Java class for downloading files

Create a new Java class (e.g., `FileDownloader.java`) and use the `ProcessBuilder` class to download files from a specified URL.

#### Starter Code

```python
['import java.io.BufferedReader;', 'import java.io.File;', 'import java.io.InputStreamReader;', 'import java.net.URL;', 'import java.nio.file.Files;', 'import java.nio.file.Paths;', '', 'public class FileDownloader {', '    public static void main(String[] args) {', '        // Specify the URL of the file to download', '        String url = "https://example.com/file.txt";', '        ', '        try {', '            ProcessBuilder pb = new ProcessBuilder(url);', '            pb.start();', '            BufferedReader br = new BufferedReader(new InputStreamReader(pb.getInputStream()));', '            String line;', '            while ((line = br.readLine()) != null) {', '                System.out.println(line);', '            }', '        } catch (Exception e) {', '            System.err.println("Error downloading file: " + e.getMessage());', '        }', '    }', '}']
```

#### 💡 Hints

- Use the correct URL and port numbers for your application
- Handle any exceptions that may occur during the download process

#### ✓ Validation Criteria

Verify that the FileDownloader.java file successfully downloads a file from the specified URL.

---

### Exercise 4: Integrate Maven with the Java class

Modify the `pom.xml` file to include the necessary configuration for building and running your application using Maven.

#### Starter Code

```python
['<build>', '    <plugins>', '        <plugin>', '            <groupId>org.apache.maven.plugins</groupId>', '            <artifactId>maven-compiler-plugin</artifactId>', '            <version>3.8.1</version>', '            <configuration>', '                <source>1.8</source>', '                <target>1.8</target>', '            </configuration>', '        </plugin>', '</plugins>', '</build>']
```

#### 💡 Hints

- Use the correct plugin and configuration settings
- Include any additional plugins required by your project

#### ✓ Validation Criteria

Verify that the pom.xml file includes all necessary configuration for building and running the application.

---

### Exercise 5: Run the application using Maven

Use the `mvn clean package` command to build your project, followed by the `mvn exec:java` command to run the `FileDownloader` class.

#### 💡 Hints

- Use the correct command and options for your project
- Verify that the output matches the expected result

#### ✓ Validation Criteria

Verify that the application successfully downloads a file from the specified URL.

---

### Exercise 6: Bonus Challenge: Add error handling to the `FileDownloader` class

Modify the `FileDownloader.java` file to include additional error handling for situations such as network failures or file corruption.

#### Starter Code

```python
['try {', '    // Download file logic here', '} catch (Exception e) {', '    System.err.println("Error downloading file: " + e.getMessage());', '}']
```

#### 💡 Hints

- Use a more robust error handling approach, such as catching specific exceptions or using a retry mechanism

#### ✓ Validation Criteria

Verify that the modified `FileDownloader` class handles errors correctly.

---

## 🎯 Bonus Challenges

1. {'title': 'Optimize the download speed of the `FileDownloader` application', 'description': 'Modify the `FileDownloader.java` file to use a more efficient method for downloading files, such as using multiple threads or chunking the file transfer.'}

## 🎓 Expected Outcomes

After completing this lab, you should have:

- A completed Maven project with a `FileDownloader` Java class that downloads files from a specified URL.
- A `pom.xml` file that includes all necessary configuration for building and running the application using Maven.

---

## 📝 Submission Checklist

- [ ] All exercises completed
- [ ] Code runs without errors
- [ ] Validation criteria met
- [ ] Code is documented
- [ ] (Optional) Bonus challenges attempted

---

*Generated from Parts 01-02 - Java-Cookbook - Ian-F-Darwin*
