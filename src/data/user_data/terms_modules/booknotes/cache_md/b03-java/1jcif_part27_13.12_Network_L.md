# High-Quality Flashcards: 10A006---Java-Cookbook---Ian-F-Darwin_processed (Part 27)


**Starting Chapter:** 13.12 Network Logging with java.util.logging. Problem. Discussion

---


---
#### Expensive String Operations in Loggers
Background context: In logging, especially when using expensive operations like `toString()` or string concatenations within a log message, it is important to avoid performing these operations unless necessary. This can lead to performance issues if the resultant string is not used.

The preferred method nowadays is to create the string inside a lambda expression so that the string operations are only performed when the logging level allows it.

:p How does creating a string inside a lambda expression help with logging performance?
??x
Creating a string inside a lambda expression ensures that the string concatenation and other expensive operations are only executed if the logger is set to a level that requires logging. This means that if, for example, `Log.info()` is called but the log level is not info or higher, the string concatenation will not occur.

Example in code:
```java
myLogger.info(() -> String.format("Value %d from Customer %s", customer.value, customer));
```
In this case, only if the logger's level allows `info` logs, the lambda expression inside `Log.info()` will be evaluated. Otherwise, no string operations are performed.

x?
---
#### Logging with Java Util Logging
Background context: The Java logging mechanism (package java.util.logging) is an alternative to Log4j and has similar capabilities for logging messages and exceptions.

:p How do you acquire a Logger object in the Java logging framework?
??x
You acquire a `Logger` object by calling `Logger.getLogger()` with a descriptive string. This string can be any unique identifier, such as your package or class name.

Example in code:
```java
Logger myLogger = Logger.getLogger("com.darwinsys");
```
This method returns an instance of the `Logger` class, which you can use to log messages and handle exceptions.

x?
---
#### Using Log Records with Java Util Logging
Background context: The Java logging framework provides various methods for logging different levels of severity. Each logger has a level set to determine what kind of logs it will allow.

:p How does the `log` method with a `Supplier` argument help in avoiding unnecessary computations?
??x
The `log` method that accepts a `Supplier` argument allows you to delay the creation and computation of log messages until they are actually needed. This is beneficial because it avoids performing expensive operations unless the logging level requires those logs.

Example in code:
```java
myLogger.log(Level.INFO, () -> String.format("Value %d from Customer %s", customer.value, customer));
```
Here, the `Supplier` inside `log` ensures that `String.format` is only called if the logger's current log level allows logging at the `INFO` level.

x?
---
#### Logging Exceptions with Java Util Logging
Background context: Exception handling in logging often involves catching exceptions and logging them for debugging purposes. The Java logging framework provides methods to log caught exceptions, allowing you to capture detailed information about errors that occur during program execution.

:p How can you log a caught exception using the `log` method in java.util.logging?
??x
You can use the `log` method with a specific level and pass an `Exception` object directly. This will create a log record with the appropriate severity level and attach the thrown exception to it.

Example in code:
```java
logger.log(Level.SEVERE, "Caught Exception", t);
```
Here, `t` is the `Throwable` instance representing the caught exception. The message and the exception are logged at the `SEVERE` level.

x?
---


#### JSON Parsing and Writing with Jackson
Jackson is a full-featured API for working with JSON, widely used in Java applications. It simplifies the process of reading from and writing to JSON by providing an `ObjectMapper` that can automatically convert between JSON strings and POJOs (Plain Old Java Objects).
:p What is Jackson primarily used for?
??x
Jackson is a powerful library that facilitates the conversion between JSON data and Java objects, making it easier to handle JSON in Java applications. It provides tools like `ObjectMapper`, which can read JSON into objects and write objects as JSON.
x??

---

#### Using ObjectMapper for Reading JSON
The `ObjectMapper` class from Jackson allows you to easily convert a JSON string into a Java object by using the `readValue()` method. This is particularly useful when dealing with complex JSON structures that map directly to your data models (POJOs).
:p How do you use `readValue()` in Jackson to parse a JSON string?
??x
You can use `ObjectMapper.readValue(String jsonInput, Class<?> valueType)` to convert a JSON string into an instance of the specified class. Here's how it works:
```java
String jsonInput = "{\"id\":0,\"firstName\":\"Robin\",\"lastName\":\"Wilson\"}";
Person q = mapper.readValue(jsonInput, Person.class);
```
The `readValue()` method takes two arguments: the JSON input as a string and the target Java class. It returns an instance of that class with properties populated according to the JSON data.
x??

---

#### Using ObjectMapper for Writing JSON
To write a Java object as JSON, you can use the `ObjectMapper.writeValue()` or `writeValue(OutputStream)` method from Jackson's `ObjectMapper`. This is useful when you need to output JSON directly to a stream or string.
:p How do you convert a Java object into JSON using Jackson?
??x
You can use `mapper.writeValue(System.out, p);` to write the contents of an object as JSON. Here’s how it works:
```java
Person p = new Person("Roger", "Rabbit");
System.out.print("Person object " + p + " as JSON = ");
mapper.writeValue(System.out, p);
```
This method takes an `OutputStream` (like `System.out`) and the Java object to be converted. It outputs a string representation of the object in JSON format.
x??

---

#### Person Class Example
To illustrate how Jackson maps between JSON and Java objects, consider this simple `Person` class with corresponding JSON fields:
```java
class Person {
    private int id;
    private String firstName;
    private String lastName;

    // Getters and setters

    @Override
    public String toString() {
        return "Person{" +
                "id=" + id +
                ", firstName='" + firstName + '\'' +
                ", lastName='" + lastName + '\'' +
                '}';
    }
}
```
:p What is the `Person` class used for in this example?
??x
The `Person` class is a simple data model that Jackson will map to and from JSON. It includes fields like `id`, `firstName`, and `lastName`, which correspond directly to JSON keys. The class also has appropriate getters and setters, as well as a `toString()` method for easy debugging.
x??

---
These flashcards cover the core concepts of using Jackson's `ObjectMapper` for reading and writing JSON in Java applications.


#### Jackson ObjectMapper for JSON Parsing and Writing
Background context: The `ObjectMapper` class from the Jackson library is a powerful tool for reading and writing JSON data. It simplifies the process of converting between Java objects and JSON strings, making it easy to parse JSON input into Java objects and serialize Java objects back into JSON.

If applicable, add code examples with explanations:
```java
// Example of using ObjectMapper to convert Person object to JSON
import com.fasterxml.jackson.databind.ObjectMapper;

public class JacksonExample {
    public static void main(String[] args) throws Exception {
        Person p = new Person(0, "Roger", "Rabbit", "Roger Rabbit");
        ObjectMapper mapper = new ObjectMapper();
        
        // Convert the Person object into a JSON string with one call to writeValue()
        String jsonString = mapper.writeValueAsString(p);
        System.out.println("Person object Roger Rabbit as JSON: " + jsonString);
    }
}

class Person {
    private int id;
    private String firstName, lastName, name;

    public Person(int id, String firstName, String lastName, String name) {
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.name = name;
    }

    // Getters and setters
}
```
:p How does the `ObjectMapper` class from Jackson help in JSON operations?
??x
The `ObjectMapper` class simplifies JSON parsing and writing by converting between Java objects and JSON data. It can read JSON strings into Java objects (`readValue`) and write Java objects to JSON strings (`writeValueAsString`). This makes it easier for developers to handle JSON data without manually managing the conversion logic.
```java
// Code example for using ObjectMapper
ObjectMapper mapper = new ObjectMapper();
Person p = new Person(0, "Roger", "Rabbit", "Roger Rabbit");
String jsonString = mapper.writeValueAsString(p);
System.out.println(jsonString); // Output: {"id":0,"firstName":"Roger","lastName":"Rabbit","name":"Roger Rabbit"}
```
x??

---

#### Jackson for Parsing JSON with ObjectMapper
Background context: The `ObjectMapper` class can also be used to parse JSON data from an input stream into a Java object. This example demonstrates reading JSON data stored in a file and converting it into a `SoftwareInfo` object.

If applicable, add code examples with explanations:
```java
// Example of using ObjectMapper to read software information from a JSON file
import com.fasterxml.jackson.databind.ObjectMapper;

public class SoftwareParseJackson {
    final static String FILE_NAME = "/json/softwareinfo.json";

    public static void main(String[] args) throws Exception {
        ObjectMapper mapper = new ObjectMapper();

        InputStream jsonInput = SoftwareParseJackson.class.getResourceAsStream(FILE_NAME);
        if (jsonInput == null) {
            throw new NullPointerException("can't find " + FILE_NAME);
        }

        // Parse JSON from the input stream into a SoftwareInfo object
        SoftwareInfo software = mapper.readValue(jsonInput, SoftwareInfo.class);
        System.out.println(software);  // Output: Software: robinparse (1.2.3) by [Robin Smythe, Jon Jenz, Jan Ardann]
    }
}

class SoftwareInfo {
    private String name;
    private String version;
    private List<String> contributors;

    public SoftwareInfo(String name, String version, List<String> contributors) {
        this.name = name;
        this.version = version;
        this.contributors = contributors;
    }

    // Getters and setters
}
```
:p How does the `readValue` method in `ObjectMapper` work?
??x
The `readValue` method in `ObjectMapper` takes an input stream containing JSON data and converts it into a specified Java object. It uses reflection to map fields from the JSON data to corresponding properties in the target class.

```java
// Example of using readValue to parse JSON into a Java object
InputStream jsonInput = SoftwareParseJackson.class.getResourceAsStream(FILE_NAME);
SoftwareInfo software = mapper.readValue(jsonInput, SoftwareInfo.class);
System.out.println(software); // Output: Software: robinparse (1.2.3) by [Robin Smythe, Jon Jenz, Jan Ardann]
```
x??

---

#### Jackson for Reading and Parsing JSON
Background context: The `ObjectMapper` class is a versatile tool that can be used to read and parse JSON data from various sources such as files or network streams. This example demonstrates how to use `ObjectMapper` to read software information stored in a JSON file.

If applicable, add code examples with explanations:
```java
// Example of using ObjectMapper to read JSON from a file into a Java object
import com.fasterxml.jackson.databind.ObjectMapper;

public class JacksonParsingExample {
    final static String FILE_NAME = "/json/softwareinfo.json";

    public static void main(String[] args) throws Exception {
        ObjectMapper mapper = new ObjectMapper();

        InputStream jsonInput = JacksonParsingExample.class.getResourceAsStream(FILE_NAME);
        if (jsonInput == null) {
            throw new NullPointerException("can't find " + FILE_NAME);
        }

        // Parse JSON from the input stream into a SoftwareInfo object
        SoftwareInfo software = mapper.readValue(jsonInput, SoftwareInfo.class);
        System.out.println(software);  // Output: Software: robinparse (1.2.3) by [Robin Smythe, Jon Jenz, Jan Ardann]
    }
}

class SoftwareInfo {
    private String name;
    private String version;
    private List<String> contributors;

    public SoftwareInfo(String name, String version, List<String> contributors) {
        this.name = name;
        this.version = version;
        this.contributors = contributors;
    }

    // Getters and setters
}
```
:p How can `ObjectMapper` be used to read JSON from a file into a Java object?
??x
The `ObjectMapper` class can be used with the `readValue` method to read JSON data from a file and parse it into a specified Java object. The `readValue` method takes two parameters: the input stream containing the JSON data and the type of the target Java object.

```java
// Example of reading JSON from a file using ObjectMapper
InputStream jsonInput = JacksonParsingExample.class.getResourceAsStream(FILE_NAME);
SoftwareInfo software = mapper.readValue(jsonInput, SoftwareInfo.class);
System.out.println(software); // Output: Software: robinparse (1.2.3) by [Robin Smythe, Jon Jenz, Jan Ardann]
```
x??

---
#### Jackson for Writing JSON
Background context: The `ObjectMapper` class can also be used to write Java objects into JSON format using the `writeValueAsString` method.

If applicable, add code examples with explanations:
```java
// Example of writing a Person object as JSON string using ObjectMapper
import com.fasterxml.jackson.databind.ObjectMapper;

public class JacksonWritingExample {
    public static void main(String[] args) throws Exception {
        Person p = new Person(0, "Roger", "Rabbit", "Roger Rabbit");
        ObjectMapper mapper = new ObjectMapper();

        // Convert the Person object into a JSON string with one call to writeValueAsString
        String jsonString = mapper.writeValueAsString(p);
        System.out.println("Person object Roger Rabbit as JSON: " + jsonString);  // Output: {"id":0,"firstName":"Roger","lastName":"Rabbit","name":"Roger Rabbit"}
    }
}

class Person {
    private int id;
    private String firstName, lastName, name;

    public Person(int id, String firstName, String lastName, String name) {
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.name = name;
    }

    // Getters and setters
}
```
:p How can `ObjectMapper` be used to write a Java object as a JSON string?
??x
The `writeValueAsString` method in `ObjectMapper` is used to convert a Java object into a JSON string. It takes the target Java object and returns a JSON string representation of that object.

```java
// Example of writing a Person object as a JSON string using ObjectMapper
Person p = new Person(0, "Roger", "Rabbit", "Roger Rabbit");
String jsonString = mapper.writeValueAsString(p);
System.out.println("Person object Roger Rabbit as JSON: " + jsonString);  // Output: {"id":0,"firstName":"Roger","lastName":"Rabbit","name":"Roger Rabbit"}
```
x??

