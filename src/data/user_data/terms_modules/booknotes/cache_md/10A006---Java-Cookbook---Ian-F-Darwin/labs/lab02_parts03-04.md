# Lab 02: Building a RESTful Web Service with Java

**Book:** Java-Cookbook - Ian-F-Darwin
**Chapters Covered:** Parts 03-04
**Estimated Time:** 2 hours

---

## 📋 Objectives

- Understand how to use StringBuilder to concatenate strings in a Java program.
- Learn how to debug and handle exceptions in a Java application using print stack traces.
- Build a simple RESTful web service that returns a list of names concatenated using StringBuilder.

## 🔑 Key Concepts

- **StringBuilder**
- **Exception handling in Java**
- **RESTful web services with Java**
- **Jenkins job console output**

## ✅ Prerequisites

- Familiarity with Java basics, including variables, data types, control structures, and methods.
- Understanding of how to access Jenkins job console output and modify project settings.

---

## 🧪 Exercises

### Exercise 1: Create a String of Names Using StringBuilder

Write a program that uses StringBuilder to concatenate a list of names into a single string.

#### Starter Code

```python
{
public class NameConcatenator {
	public static void main(String[] args) {
	String[] names = {'John', 'Mary', 'David'};
	StringBuilder sb = new StringBuilder();
	for (String name : names) {
		sb.append(name).append(' ');
	}
	System.out.println(sb.toString());
	}}}
```

#### 💡 Hints

- Use the append() method to concatenate strings.
- Don't forget to initialize StringBuilder with a new instance

#### ✓ Validation Criteria

Compare the output of your program with the expected output.

---

### Exercise 2: Debugging and Exception Handling

Modify your program to catch and handle exceptions that may occur when concatenating strings.

#### Starter Code

```python
{
public class NameConcatenator {
	public static void main(String[] args) {
	try {
	String[] names = {'John', 'Mary', 'David'};
	StringBuilder sb = new StringBuilder();
	for (String name : names) {
		sb.append(name).append(' ');
	}
	System.out.println(sb.toString());
	} catch (Exception e) {
	System.out.println("Error: " + e.getMessage());
	}}}
```

#### 💡 Hints

- Use a try-catch block to handle exceptions.
- Print the error message when an exception occurs

#### ✓ Validation Criteria

Check that your program handles exceptions correctly and prints the error message.

---

### Exercise 3: Building the RESTful Web Service

Create a RESTful web service that returns a list of names concatenated using StringBuilder.

#### Starter Code

```python
{
import java.net.URLDecoder;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import java.util.ArrayList;
import java.util.List;
public class NameService {
	@GET
	@Path("/names")
	@Produces(MediaType.APPLICATION_JSON)
	public String getNames() {
	String[] names = {'John', 'Mary', 'David'};
	StringBuilder sb = new StringBuilder();
	for (String name : names) {
		sb.append(name).append(' ');
	}
	return sb.toString();
	}}
```

#### 💡 Hints

- Use the @Path and @GET annotations to define the RESTful endpoint.
- Return a JSON response using MediaType.APPLICATION_JSON

#### ✓ Validation Criteria

Check that your program returns a valid JSON response with the concatenated names.

---

### Exercise 4: Testing Your Program

Test your RESTful web service by accessing it through Jenkins.

#### Starter Code

```python
{
// Accessing Jenkins job console output
java -jar target/NameService.jar
}

```

#### 💡 Hints

- Use the 'Access Jenkins Job Console Output' tool to access your program's console output.
- Check that the concatenated names are returned correctly

#### ✓ Validation Criteria

Verify that your program returns the expected output.

---

## 🎯 Bonus Challenges

1. {'number': 5, 'title': 'Adding More Functionality', 'description': 'Modify your program to include additional functionality, such as sorting or filtering names.', 'code_template': '{\nimport java.util.Arrays;\npublic class NameService {\n\t@GET\n\t@Path("/names")\n\t@Produces(MediaType.APPLICATION_JSON)\n\tpublic String getNames() {\n\tString[] names = {\'John\', \'Mary\', \'David\'};\n\tArrays.sort(names);\n\tStringBuilder sb = new StringBuilder();\n\tfor (String name : names) {\n\t\tsb.append(name).append(\' \');\n\t}\n\treturn sb.toString();\n\t}}', 'hints': ['Use the Arrays.sort() method to sort the names.', 'Experiment with different sorting algorithms if needed'], 'validation': 'Check that your program returns sorted names.'}

## 🎓 Expected Outcomes

After completing this lab, you should have:

- A Java program that uses StringBuilder to concatenate a list of names into a single string.
- A Java program that handles exceptions when concatenating strings and prints the error message.
- A RESTful web service that returns a list of names concatenated using StringBuilder.
- A valid JSON response with the concatenated names returned by the RESTful web service.

---

## 📝 Submission Checklist

- [ ] All exercises completed
- [ ] Code runs without errors
- [ ] Validation criteria met
- [ ] Code is documented
- [ ] (Optional) Bonus challenges attempted

---

*Generated from Parts 03-04 - Java-Cookbook - Ian-F-Darwin*
