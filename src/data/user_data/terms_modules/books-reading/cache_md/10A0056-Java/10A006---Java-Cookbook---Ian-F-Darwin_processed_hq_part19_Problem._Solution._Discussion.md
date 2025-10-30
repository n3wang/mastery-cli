# High-Quality Flashcards: 10A006---Java-Cookbook---Ian-F-Darwin_processed (Part 19)

**Rating threshold:** >= 8/10

**Starting Chapter:** Problem. Solution. Discussion

---

**Rating: 8/10**

---

#### Streams and Collectors Introduction
Streams are a powerful feature in Java for processing sequences of elements. They provide a more functional approach to handling collections by breaking down operations into smaller, reusable pieces.

:p What is the purpose of using streams in Java?
??x
The purpose of using streams in Java is to simplify and enhance the way you process data in collections such as lists or arrays. Streams allow for operations like filtering, mapping, reducing, and more, providing a functional programming style that can make your code cleaner and easier to reason about.

:p How does collecting with collectors simplify stream processing?
??x
Collecting with collectors simplifies stream processing by allowing you to efficiently summarize the content of a stream into a single result. Collectors are like folds in functional programming languages, combining elements in streams into a final result using a series of operations. This makes it easier to perform complex operations on collections without writing verbose code.

:p What is the difference between supplier(), accumulator(), and combiner() functions?
??x
The `supplier()` function creates an empty mutable container that will hold the results of your stream operations. The `accumulator()` function adds elements into this container, while the `combiner()` function merges multiple containers (from parallel streams) into a single container.

:p What is the optional final transform in the collector?
??x
The optional final transform in the collector, known as the `finisher()`, allows for an additional transformation on the result container after all elements have been accumulated. This can be used to perform operations like converting the container to a specific format or performing a custom operation.

---

#### Example of Using Streams and Collectors

:p How do you sum up years of experience from adult heroes using streams?
??x
You can use Java Streams along with collectors to filter, map, and reduce elements. Here's how:

```java
long adultYearsExperience = Arrays.stream(heroes)
                                 .filter(b -> b.age >= 18) 
                                 .mapToInt(Hero::getAge)
                                 .sum();
```

In this example:
- `Arrays.stream(heroes)` creates a stream from the array.
- `.filter(b -> b.age >= 18)` filters heroes who are adults.
- `.mapToInt(Hero::getAge)` maps each hero to their age as an integer.
- `.sum()` reduces the stream by summing up all ages.

:x?

---

#### Sorting Heroes by Name

:p How do you sort a list of heroes by name using streams?
??x
Sorting elements in Java Streams can be achieved using `sorted()`. Here's how:

```java
List<Object> sorted = Arrays.stream(heroes)
                            .sorted((h1, h2) -> h1.name.compareTo(h2.name))
                            .map(Hero::getName)
                            .collect(Collectors.toList());
```

In this example:
- `.sorted()` sorts the stream based on a custom comparator.
- `.map(Hero::getName)` maps each hero to their name as an object in the list.

:x?

---

#### Implementing Word Frequency Count

:p How do you implement word frequency count using Java Streams and Collectors?
??x
Implementing word frequency count involves breaking lines into words, counting occurrences of each word, and sorting them by frequency. Here's a simplified version:

```java
Map<String, Long> map = Files.lines(Path.of(args[0]))
                             .flatMap(s -> Stream.of(s.split("\\s+")))
                             .collect(Collectors.groupingBy(String::toLowerCase, Collectors.counting()));
```

In this example:
- `Files.lines(Path.of(args[0]))` reads lines from a file.
- `.flatMap(s -> Stream.of(s.split("\\s+")))` splits each line into words and flattens the stream.
- `.collect(Collectors.groupingBy(String::toLowerCase, Collectors.counting()))` groups words by their lowercase form and counts occurrences.

:p How do you print the 20 most frequent words sorted in descending order?
??x
To print the top 20 most frequent words:

```java
map.entrySet()
   .stream()
   .sorted(Map.Entry.<String, Long>comparingByValue().reversed())
   .limit(20)
   .map(entry -> String.format("%-15d %s", entry.getValue(), entry.getKey()))
   .forEach(System.out::println);
```

In this example:
- `.entrySet()` gets a stream of entries.
- `.sorted(Map.Entry.<String, Long>comparingByValue().reversed())` sorts by the value (frequency) in reverse order.
- `.limit(20)` limits to the top 20 entries.
- `map(...)` formats and prints each entry.

:x?

---

---

**Rating: 8/10**

#### Method References Overview
Method references in Java 8 allow you to reference an instance or static method directly, making your code more concise and readable. They are particularly useful when dealing with functional interfaces (interfaces with a single abstract method).
:p What is a method reference in Java 8?
??x
A method reference allows you to refer to a method by its name without having to explicitly write the function body. This can be used for instance methods or static methods.
```java
// Example of an instance method reference
MyClass::myFunc

// Example of a static method reference
SomeClass::staticMethod
```
x??

---
#### Using Instance Method References
Instance method references allow you to refer to the methods that belong to specific instances of classes. This is particularly useful when working with functional interfaces.
:p How can you use an instance method reference in Java 8?
??x
You can use the :: operator to create a reference to an instance method. The first part (before ::) is the object or class name, and the second part (after ::) is the method name.
```java
Runnable r = this::walk;
new Thread(r).start();
```
This code creates a `Runnable` that will invoke the `walk()` method when executed in a new thread. The `this::walk` reference uses the current instance's `walk()` method.
x??

---
#### Using Static Method References
Static method references allow you to refer to static methods directly, without needing an instance of the class.
:p How can you use a static method reference?
??x
You use the :: operator with the class name followed by the method name. The referenced method must be static.
```java
try (AutoCloseable autoCloseable = rd2::cloz) {
    System.out.println("Some action happening here.");
}
```
This code creates an `AutoCloseable` object that will call the `cloz()` method when it is closed, as demonstrated in a try-with-resources statement.
x??

---
#### Creating Lambda References to Methods with Different Names
Sometimes existing methods do not match the functional interface names. You can still use them by creating a lambda reference.
:p How can you create a lambda reference to an instance method that has a different name?
??x
You can directly use the :: operator to refer to the desired method, even if its name does not match the functional interface's method signature.
```java
FunInterface sample = ReferencesDemo3::work;
System.out.println("My process method is " + sample);
```
This code creates a lambda reference to `ReferencesDemo3.work()` and prints out that it implements `FunInterface.process()`.
x??

---
#### Using Instance Method of an Arbitrary Object Reference
An instance method reference can refer to any instance's method, as long as the class type matches.
:p How do you use an "Instance Method of an Arbitrary Object" reference?
??x
You use the :: operator with the class name before the method name. This is useful when dealing with polymorphism or when you don't have a specific object instance in mind.
```java
Arrays.sort(names, String::compareToIgnoreCase);
```
This code sorts an array of `String` objects using the `compareToIgnoreCase()` method from any `String` instance, demonstrating how to use this reference type effectively.
x??

---
#### Example of Method References with AutoCloseable Interface
Method references can be used in try-with-resources statements where you need to close resources automatically.
:p How can a method reference be used with an AutoCloseable interface?
??x
You create the `AutoCloseable` reference within the try statement, and it will call the close-like method when the block is exited.
```java
try (AutoCloseable autoCloseable = rd2::cloz) {
    System.out.println("Some action happening here.");
}
```
This example shows how a method reference can be used to create an `AutoCloseable` object that will invoke the `cloz()` method at the end of the try block.
x??

---
#### Creating Lambda References with Different Method Names
You can use method references even if your methods have different names than the functional interface's required name.
:p How can you create a lambda reference to a static method with a different name?
??x
You directly use the :: operator to refer to the desired static method, as long as it matches the functional interface signature in terms of parameters and return type.
```java
FunInterface sample = ReferencesDemo3::work;
System.out.println("My process method is " + sample);
```
This example demonstrates creating a lambda reference to `ReferencesDemo3.work()` even though its name does not match the interface's required name.
x??

---
#### Example of Using Method References with Arrays.sort()
Method references can be used as sort criteria in array sorting operations, making code more concise.
:p How can you use method references for sorting arrays?
??x
You can directly pass a method reference to `Arrays.sort()` that matches the signature expected by the `Comparator` interface.
```java
String[] names = Arrays.stream(unsortedNames).toArray(String[]::new);
Arrays.sort(names, String::compareToIgnoreCase);
```
This example sorts an array of strings using the `compareToIgnoreCase()` method from any `String` instance, showcasing how to use method references for sorting.
x??

---

**Rating: 8/10**

#### Concept: Importance of Using Readers and Writers for Textual Data
Background context explaining the concept. Java provides two sets of classes for reading and writing: `InputStreams/OutputStreams` for bytes, and `Readers/Writers` for textual data. Older languages often assumed that a byte was equivalent to a character (a letter, digit, or other linguistic element), but modern international requirements necessitate handling Unicode.

Both Java and XML use Unicode as their character sets, allowing text from various human languages to be read and written. However, many files were encoded using different representations before the advent of Unicode. Therefore, conversions are necessary between internal `String` objects in Java and external file representations.
:p Why should you prefer Readers and Writers over InputStreams and OutputStreams for textual data?
??x
To handle text data in a way that supports international character sets like Unicode, and to correctly convert between different character encodings used in existing files. Using `Readers` and `Writers` ensures compatibility with a wide range of languages and text representations.
The conversion logic involves understanding the encoding schemes (like UTF-8, ISO-8859-1) and using appropriate `InputStreamReader` and `OutputStreamWriter` classes to handle these conversions.
```java
// Example: Reading a file with a specific encoding
try {
    Reader reader = new InputStreamReader(new FileInputStream("file.txt"), "UTF-8");
    int character;
    while ((character = reader.read()) != -1) {
        System.out.print((char) character);
    }
} catch (IOException e) {
    // Handle exception
}
```
x??

---

#### Concept: Handling Unicode in Java
Background context explaining the concept. Modern programming languages like Java support internationalization by using Unicode to represent characters from different languages and scripts.

However, many legacy systems used byte-based representations that are not compatible with Unicode. Therefore, when reading or writing text files, you need to handle character encoding conversions.
:p What is the primary reason for using `Readers` and `Writers` over `InputStreams` and `OutputStreams`?
??x
The primary reason is to ensure compatibility with international characters and proper handling of legacy file encodings. Using `Readers` and `Writers` allows you to work with text data in a Unicode-friendly manner, while automatically converting between the internal Java representation and external file representations.
```java
// Example: Writing a string with UTF-8 encoding using a Writer
try {
    Writer writer = new OutputStreamWriter(new FileOutputStream("file.txt"), "UTF-8");
    writer.write("Hello, world!");
    writer.close();
} catch (IOException e) {
    // Handle exception
}
```
x??

---

#### Concept: Conversion Between Internal Java Strings and External Representations
Background context explaining the concept. When dealing with text data in files or streams, you need to convert between internal `String` objects and external file representations that may use different encodings.

Java provides classes like `InputStreamReader`, `OutputStreamWriter`, `FileReader`, and `FileWriter` for handling these conversions.
:p How do Java's `Readers` and `Writers` handle the conversion between internal strings and external file encodings?
??x
Java's `Readers` and `Writers` use encoding schemes to convert between internal Unicode `String` objects and byte-based representations used in files. When writing, you specify an encoding like "UTF-8" or "ISO-8859-1", ensuring the correct byte sequence is written to the file.

When reading, you provide the same or similar encoding to properly interpret the bytes as characters.
```java
// Example: Reading and Writing with specified encodings
try {
    Writer writer = new OutputStreamWriter(new FileOutputStream("file.txt"), "UTF-8");
    reader = new InputStreamReader(new FileInputStream("file.txt"), "UTF-8");
    
    // Writing example
    writer.write("Hello, world!");
    writer.close();
    
    // Reading example
    int character;
    while ((character = reader.read()) != -1) {
        System.out.print((char) character);
    }
} catch (IOException e) {
    // Handle exception
}
```
x??

**Rating: 8/10**

#### Reading Characters One at a Time
Background context explaining the concept. The `read()` method of the `Reader` class is defined to return an `int` so that it can use `-1` (EOF) to indicate the end of the file. This allows handling of characters as integers, even when casting them back to `char`.
If applicable, add code examples with explanations.
:p How do you read a file one character at a time in Java?
??x
You can read a file one character at a time using the `read()` method of the `Reader` class. The method returns an `int`, which allows handling the end-of-file condition (`-1`) and characters as integers.
```java
public class ReadCharsOneAtATime {
    void doFile(Reader is) throws IOException {
        int c;
        while ((c = is.read()) != -1) { // Use '!=' for comparison, not '.='
            System.out.print((char) c);  // Cast to char and print it
        }
    }
}
```
x??

---

#### Using StringTokenizer for File Scanning
Background context explaining the concept. The `StringTokenizer` class is used to split lines of text into tokens based on a specified delimiter, making it useful for parsing fixed formats or structured data.
If applicable, add code examples with explanations.
:p How can you use `StringTokenizer` to parse user@host.domain format from each line in a file?
??x
You can use `StringTokenizer` along with `BufferedReader.readLine()` to process lines of text. For the `user@host.domain` format, you tokenize the line using the `@` character as the delimiter and extract the username and host parts.
```java
public class ScanStringTok {
    static void process(String fileName) throws IOException {
        String s = null;
        try (BufferedReader is = new BufferedReader(new FileReader(fileName))) {
            while ((s = is.readLine()) != null) {
                StringTokenizer st = new StringTokenizer(s, "@", true);
                String user = (String) st.nextElement();  // Get the first token
                st.nextElement();                         // Consume the '@' token
                String host = (String) st.nextElement();  // Get the second token
                System.out.println("User name: " + user + "; host part: " + host);
            }
        } catch (NoSuchElementException ix) {
            System.err.println("Malformed input " + s);
        } catch (IOException e) {
            System.err.println(e);
        }
    }
}
```
x??

---

#### Using StreamTokenizer for File Scanning
Background context explaining the concept. The `StreamTokenizer` class provides a more flexible way to read and categorize tokens from an input stream, suitable for more complex parsing scenarios.
If applicable, add code examples with explanations.
:p How can you use `StreamTokenizer` to implement a simple calculator?
??x
You can use `StreamTokenizer` to tokenize input for a simple immediate-mode stack-based calculator. Tokens are read and processed based on their type (number, operator, etc.). Here's an example of how it works:
```java
public class SimpleCalcStreamTok {
    protected StreamTokenizer tf;
    // Other fields...

    public static void main(String[] av) throws IOException {
        if (av.length == 0)
            new SimpleCalcStreamTok(new InputStreamReader(System.in)).doCalc();
        else
            for (int i = 0; i < av.length; i++)
                new SimpleCalcStreamTok(av[i]).doCalc();
    }

    public void setOutput(PrintWriter out) {
        this.out = out;
    }

    protected void doCalc() throws IOException {
        int iType;
        double tmp;
        while ((iType = tf.nextToken()) != StreamTokenizer.TT_EOF) {
            switch (iType) {
                case StreamTokenizer.TT_NUMBER:
                    push(tf.nval);
                    break;
                // Other cases for operators, etc.
                default:
                    out.println("What's this? iType = " + iType);
            }
        }
    }

    void push(double val) {
        s.push(Double.valueOf(val));
    }
}
```
x??

---

Each of the flashcards covers a key concept from the provided text, explaining its context and providing relevant code examples.

