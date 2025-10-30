# High-Quality Flashcards: 10A006---Java-Cookbook---Ian-F-Darwin_processed (Part 6)

**Rating threshold:** >= 8/10

**Starting Chapter:** 4.2 Using Regexes in Java Test for a Pattern. Problem. Solution. Discussion

---

**Rating: 8/10**

#### Creating a Pattern Object in Java
Background context: To use regular expressions effectively in Java, you first need to create a `Pattern` object. This object encapsulates the pattern that will be used for matching strings.

Java provides a method called `compile()` within the `Pattern` class to create this object from a regex string. The compiled pattern can then be reused multiple times with different input strings.

:p How do you create a `Pattern` object in Java?
??x
To create a `Pattern` object, you use the `Pattern.compile(String pattern)` method. This method takes a regular expression pattern as a parameter and compiles it into a `Pattern` object which can be used for matching against different input strings.

```java
public class RESimple {
    public static void main(String[] argv) {
        String pattern = "^Q[^u]\\d+\\."; // The regex pattern we want to use.
        Pattern p = Pattern.compile(pattern); // Compiling the pattern into a Pattern object.
    }
}
```
x??

---

#### Matching Strings with Compiled Patterns
Background context: Once you have a `Pattern` object, you can create a `Matcher` for that pattern and then check if it matches specific strings.

The `matches()` method of the `String` class is a convenient way to test whether a string matches a given regex. However, when you need to use the same pattern multiple times, creating a `Pattern` and using its `matcher()` method provides better performance.

:p How can you check if a string matches a compiled regular expression in Java?
??x
You can check if a string matches a compiled regular expression by calling the `matches()` method of the `Matcher`. This method returns `true` if the entire input sequence matches the pattern. Here's an example:

```java
public class RESimple {
    public static void main(String[] argv) {
        String pattern = "^Q[^u]\\d+\\."; // The regex pattern we want to use.
        String[] input = { 
            "QA777. is the next flight. It is on time.", 
            "Quack, Quack, Quack." 
        };
        
        Pattern p = Pattern.compile(pattern); // Compiling the pattern into a Pattern object.

        for (String in : input) {
            boolean found = p.matcher(in).matches(); // Using matcher to check if it matches.
            System.out.println("'" + pattern + "' " +
                               (found ? "matches '" : "doesn't match '") + 
                               in + "'");
        }
    }
}
```
x??

---

#### Using `Matcher` for String Matching
Background context: The `Matcher` class provides more control over the matching process. It allows you to find multiple matches within a string and retrieve information about each match.

The `lookingAt()` method of `Matcher` checks if the regex matches from the beginning of the input sequence but does not advance the matcher's position. Other methods like `find()` and `matches()` can be used to search for patterns anywhere in the input.

:p What is the difference between `matches()` and `lookingAt()` in `Matcher`?
??x
The main difference between `matches()` and `lookingAt()` lies in their behavior:

- **`matches()`**: This method checks if the entire input sequence matches the pattern. It returns `true` only if the pattern matches from start to end of the string.
  
  ```java
  boolean found = p.matcher(in).matches();
  ```

- **`lookingAt()`**: This method checks if the regex matches at the beginning of the input sequence but does not advance the matcher's position. It returns `true` as long as there is a match starting from the current position, and it doesn't move past that point.
  
  ```java
  boolean found = p.matcher(in).lookingAt();
  ```

To use these methods effectively in your Java program, you can loop through multiple strings and check for matches using either `matches()` or `lookingAt()`.

x??

---

#### Splitting Strings with Regular Expressions
Background context: The `split()` method of the `String` class allows you to split a string based on a regular expression. This is useful when you want to extract substrings that are separated by certain patterns within the input string.

The `split()` method can take an optional limit parameter to control the number of splits performed. If the limit is not specified, it defaults to -1, meaning all possible splits will be made.

:p How do you split a string using a regular expression in Java?
??x
You can use the `split()` method from the `String` class to split a string based on a regular expression pattern. The method takes a regex pattern as an argument and returns an array of strings that result from splitting the input string.

Here is an example:

```java
public class StringSplitter {
    public static void main(String[] argv) {
        String line = "Order QT300. Now.";
        String regex = "\\."; // The regular expression to split on.
        
        String[] parts = line.split(regex);
        
        for (String part : parts) {
            System.out.println(part);
        }
    }
}
```

In this example, the string `"Order QT300. Now."` is split based on the period `.` character.

x??

---

#### Replacement with Regular Expressions in Java
Background context: The `replaceAll()` and `replaceFirst()` methods of the `String` class allow you to replace all or the first occurrence of a regular expression pattern within a string, respectively. These methods are useful for transforming strings based on specific patterns.

:p How can you replace parts of a string using a regular expression in Java?
??x
You can use the `replaceAll()` and `replaceFirst()` methods from the `String` class to replace all or the first occurrence of a pattern within a string, respectively. Here are examples for both:

- **`replaceAll()`**: Replaces all matches of the specified pattern with another text.
  
  ```java
  public class StringReplacer {
      public static void main(String[] argv) {
          String line = "Order QT300. Now.";
          String regex = "\\."; // The regular expression to replace on.
          
          String replacedLine = line.replaceAll(regex, "");
          
          System.out.println(replacedLine); // Output: Order QT300  Now.
      }
  }
  ```

- **`replaceFirst()`**: Replaces only the first match of the specified pattern with another text.

  ```java
  public class StringReplacer {
      public static void main(String[] argv) {
          String line = "Order QT300. Now.";
          String regex = "\\."; // The regular expression to replace on.
          
          String replacedLine = line.replaceFirst(regex, "");
          
          System.out.println(replacedLine); // Output: Order QT300  Now.
      }
  }
  ```

These methods provide a powerful way to transform strings based on specific patterns.

x??

---

**Rating: 8/10**

#### Matching Patterns Using Regex
Background context: This concept explains how to use regular expressions (regex) for pattern matching in strings. It covers basic usage of `Pattern` and `Matcher` classes in Java, emphasizing efficiency considerations like compiling patterns.

:p How do you match a regex pattern against a string using the convenience routine in Java?
??x
You can use the `matches()` method from `String`, which checks if the entire string matches the given regular expression. However, this is less efficient for multiple uses of the same pattern.
```java
String line = "Order QT300. Now.";
String patt = "Q[^u]\\d+\\.";
if (line.matches(patt)) {
    System.out.println("Pattern matched!");
} else {
    System.out.println("NO MATCH");
}
```
x??

---

#### Compiling Regex Patterns for Efficiency
Background context: For more complex or frequently used regex patterns, compiling the `Pattern` and using a `Matcher` is recommended due to performance benefits. The compiled pattern can be reused without recompilation.

:p Why should you compile a regex pattern when it's going to be used multiple times?
??x
Compiling a regex pattern with `Pattern.compile()` allows for faster matching because the underlying engine precomputes and optimizes the pattern before each use. This is particularly beneficial if the same pattern will be matched against many strings.
```java
String line = "Order QT300. Now.";
String patt = "Q[^u]\\d+\\.";
Pattern r = Pattern.compile(patt);
Matcher m = r.matcher(line);
if (m.find()) {
    System.out.println("Pattern matched!");
} else {
    System.out.println("NO MATCH");
}
```
x??

---

#### Using Matcher Methods
Background context: `Matcher` provides various methods for pattern matching, such as `find()`, `lookingAt()`, and `match()` with different purposes. Understanding these can help in fine-tuning your regex matches.

:p What does the `find()` method do in a `Matcher`?
??x
The `find()` method searches the input string to see if there is at least one match of the pattern anywhere within it, starting from the beginning or where the last match left off. It returns true if a match was found.
```java
String line = "Order QT300. Now.";
Pattern r = Pattern.compile("Q[^u]\\d+\\.");
Matcher m = r.matcher(line);
if (m.find()) {
    System.out.println("Match found!");
} else {
    System.out.println("NO MATCH");
}
```
x??

---

#### Extracting Matched Text
Background context: After a successful match, you may need to extract the text that was matched. The `Matcher` class provides several methods like `group()` and `start()`, `end()` to get information about what part of the string matched.

:p How do you retrieve the entire matched text using `Matcher`?
??x
You can use the `group(0)` method on a `Matcher` instance, which returns the entire portion of the input that matched. Alternatively, `group(int i)` allows you to get specific capture groups if they were defined in the pattern.
```java
String line = "Order QT300. Now.";
Pattern r = Pattern.compile("Q[^u]\\d+\\.");
Matcher m = r.matcher(line);
if (m.find()) {
    System.out.println("Matched text: " + m.group(0));
} else {
    System.out.println("NO MATCH");
}
```
x??

---

#### Using `group()` with Capture Groups
Background context: Parenthesized capture groups in a regex pattern can be accessed using the `group(int i)` method. If no capture groups are used, group 0 represents the entire match.

:p How do you use `group(int i)` to extract a specific part of the matched text?
??x
The `group(int i)` method returns the characters that matched a given capture group. Group 0 corresponds to the whole match. Here’s an example:
```java
String line = "Order QT300. Now.";
Pattern r = Pattern.compile("(Q[^u]\\d+)\\.");
Matcher m = r.matcher(line);
if (m.find()) {
    System.out.println("Matched text: " + m.group(1));
} else {
    System.out.println("NO MATCH");
}
```
x??

---

#### Accessing Match Start and End Positions
Background context: After a successful match, you can use `start()` and `end()` methods to get the starting and ending positions of the matched text in the original string. This is useful for further processing or substring extraction.

:p How do you find the start and end position of a match using `Matcher`?
??x
You can use `m.start(0)` and `m.end(0)` to get the indices where the entire match starts and ends in the input string.
```java
String line = "Order QT300. Now.";
Pattern r = Pattern.compile("Q[^u]\\d+\\.");
Matcher m = r.matcher(line);
if (m.find()) {
    System.out.println(
        "Start: " + m.start(0) +
        ", End: " + m.end(0));
} else {
    System.out.println("NO MATCH");
}
```
x??

---

#### Extracting Substrings Based on Match
Background context: Combining `start()`, `end()`, and `substring()` methods can help in extracting specific parts of the matched text for further processing.

:p How do you extract a substring based on the match using `Matcher`?
??x
You can use `m.start(0)`, `m.end(0)` with `line.substring(start, end)` to get the portion of the string that matches.
```java
String line = "Order QT300. Now.";
Pattern r = Pattern.compile("Q[^u]\\d+\\.");
Matcher m = r.matcher(line);
if (m.find()) {
    System.out.println(
        "Matched text: " + 
        line.substring(m.start(0), m.end(0))
    );
} else {
    System.out.println("NO MATCH");
}
```
x??

---

#### Matching Multiple Items in a String
Background context: When dealing with complex strings, you may need to extract multiple items. This can be done by carefully defining the regex pattern and using `group()` methods to get different parts.

:p How do you extract multiple items from a string like "Smith, John Adams, John Quincy"?
??x
You would define a regex that matches the names correctly, then use `group()` to extract each name. For example:
```java
String input = "Smith, John Adams, John Quincy";
Pattern r = Pattern.compile("((\\w+),\\s+(\\w+)\\s*(Adams?))");
Matcher m = r.matcher(input);
if (m.find()) {
    String firstName = m.group(3); // middle name or first
    String lastName = m.group(2);  // last name
    System.out.println("First Name: " + firstName);
    System.out.println("Last Name: " + lastName);
} else {
    System.out.println("NO MATCH");
}
```
x??

**Rating: 8/10**

#### Replacing Matched Text Concept
Background context: In regular expression operations, once a match is found using patterns, it’s often useful to replace parts of the string that matched. Java provides several methods within the `Matcher` class for performing such replacements without affecting other parts of the string.

If you need to find all occurrences and replace them with new text:
- `replaceAll(newString)`: Replaces all occurrences that matched with the new string.
- `replaceFirst(newString)`: Replaces only the first occurrence, similar to the `replaceAll` method but stopping after just one replacement.

For more granular control over replacements across a string, you can use the `appendReplacement(StringBuffer, newString)` and `appendTail(StringBuffer)` methods. The former appends text up to (and including) the match with the specified replacement text, while the latter adds any remaining text from the end of the input.

If you need to replace each occurrence individually:
- Use a loop in combination with `replaceFirst()` method.
- Remember to call `reset()` on the matcher after each replacement operation.

:p What is the purpose of using `replaceAll(newString)` and `replaceFirst(newString)` methods?
??x
These methods are used for replacing all or the first occurrence, respectively, that matches a pattern in a given string with new text. They create a new String object containing the replacements but do not modify the original string referred to by the Matcher object.

Example usage:
```java
String input = "Do me a favor? Fetch my favorite.";
Pattern r = Pattern.compile("\\bfavor\\b");
Matcher m = r.matcher(input);
System.out.println("ReplaceAll: " + m.replaceAll("favour"));
```
This will replace every occurrence of 'favor' in the string with 'favour'.

x??

---
#### Using `appendReplacement` and `appendTail` Methods
Background context: When you need to perform complex replacements that involve multiple parts of a string, using `appendReplacement(StringBuffer, newString)` and `appendTail(StringBuffer)` can be more efficient. These methods allow for manual control over the replacement process.

The `appendReplacement(StringBuffer, newString)` method appends text up to (and including) the match with the specified replacement text, while the `appendTail(StringBuffer)` method adds any remaining text from the end of the input.

:p How do you use `appendReplacement` and `appendTail` methods to perform string replacements?
??x
To use these methods, first create a `Matcher`, then call `find()` on it to locate matches. For each match found, use `appendReplacement` to add the replacement text up to (and including) that match. After processing all matches with `appendReplacement`, finally use `appendTail` to append any remaining text.

Example usage:
```java
String input = "Do me a favor? Fetch my favorite.";
Pattern r = Pattern.compile("\\bfavor\\b");
Matcher m = r.matcher(input);
StringBuffer sb = new StringBuffer();
System.out.print("Append methods: ");
while (m.find()) {
    // Append up to the match, plus the replacement text
    m.appendReplacement(sb, "favour");
}
// Append any remaining text after all matches
m.appendTail(sb);
System.out.println(sb.toString());
```
This will result in `Do me a favour? Fetch my favourite`.

x??

---
#### Replacing Multiple Distinct Substrings
Background context: When you need to perform multiple distinct replacements within the same string, especially when each replacement might be different from others based on the matched content, you can use a loop and `replaceFirst` method.

:p How do you replace multiple distinct substrings in Java using regular expressions?
??x
To achieve this, you first compile a pattern that matches all desired substrings. Then, within a loop, find each match with `matcher.find()`, extract the matched substring using `matcher.group(0)`, compute the replacement string based on the content of the match, and use `replaceFirst` to replace only the first occurrence of the match.

Example usage:
```java
Pattern patt = Pattern.compile("cat|dog");
String line = "The cat and the dog never got along well.";
Matcher matcher = patt.matcher(line);
while (matcher.find()) {
    String found = matcher.group(0);
    String replacement = computeReplacement(found);
    line = matcher.replaceFirst(replacement);
    matcher.reset(line); // Reset for next iteration
}
System.out.println("Final: " + line);
```

Here, `computeReplacement` is a method that returns different replacements based on the matched substring:
```java
static String computeReplacement(String in) {
    switch(in) {
        case "cat": return "feline";
        case "dog": return "canine";
        default: return "animal";
    }
}
```

x??

---
#### Using Parentheses for Replacement Patterns
Background context: To make replacements based on specific parts of the matched content, you can use parentheses in your regular expression pattern to capture those parts. You can then refer to these captured groups using `$1`, `$2`, etc., in the replacement string.

:p How do you use parentheses in a regular expression for capturing and replacing text?
??x
You can use parentheses `()` within your regular expression to capture specific parts of the matched content. These captured groups can be referenced later in the replacement string by using `$1` for the first group, `$2` for the second, etc.

For example, if you have a name in the form "Firstname Lastname" and want to interchange them into "Lastname, Firstname", your pattern might look like `(.*), (.*)`. The captured groups can then be referenced as `$1` (for the last name) and `$2` (for the first name).

Example usage:
```java
String inputLine = "Adams, John Quincy";
Pattern r = Pattern.compile("(.*), (.*)");
Matcher m = r.matcher(inputLine);
if (!m.matches()) throw new IllegalArgumentException("Bad input");

// Using $1 and $2 for replacement
System.out.println(m.group(2) + ' ' + m.group(1));
```

This will output `John Quincy Adams`.

x??

