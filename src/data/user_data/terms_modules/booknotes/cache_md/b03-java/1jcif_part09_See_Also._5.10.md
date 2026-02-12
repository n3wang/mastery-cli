# High-Quality Flashcards: 10A006---Java-Cookbook---Ian-F-Darwin_processed (Part 9)


**Starting Chapter:** See Also. 5.10 Multiplying Matrices. Problem. Solution. Discussion

---


#### Random Number Generation and Distributions
Background context explaining how pseudo-random number generators (PRNGs) work, with a focus on `java.util.Random` for generating flat distributions and its limitations. The importance of cryptographic uses is highlighted via `java.security.SecureRandom`.

:p What are the key differences between `java.util.Random` and `java.security.SecureRandom`?
??x
The key difference lies in their use cases and security requirements. `java.util.Random` is intended for general-purpose, non-cryptographic applications where speed is more critical than cryptographic strength. It generates pseudo-random numbers using a linear congruential generator (LCG) algorithm.

On the other hand, `java.security.SecureRandom` provides cryptographically strong random numbers suitable for cryptographic purposes such as key generation and secure communication. It uses hardware entropy sources to enhance randomness quality, making it more secure against certain attacks compared to `java.util.Random`.

```java
// Example of using java.util.Random
Random rand = new Random();
int randomNumber = rand.nextInt(100);

// Example of using java.security.SecureRandom for cryptography
SecureRandom secureRand = new SecureRandom();
byte[] randomBytes = secureRand.generateSeed(32);
```
x??

---

#### Matrix Multiplication in Java
Background context explaining the need to multiply two-dimensional arrays, which is common in mathematical and engineering applications. Mention that while real-world solutions might use specialized libraries like EJML or ND4J for efficiency and accuracy, a simple implementation can help understand the underlying concepts.

:p How do you implement matrix multiplication in Java?
??x
To implement matrix multiplication in Java, we need to follow these steps:

1. Ensure both matrices are rectangular.
2. Validate that the number of columns in the first matrix matches the number of rows in the second matrix.
3. Create a result matrix with dimensions equal to the number of rows in the first matrix and the number of columns in the second matrix.
4. Use nested loops to perform the multiplication by iterating over each element of the resulting matrix.

Here is the implementation:

```java
public class Matrix {
    public static int[][] multiply(int[][] m1, int[][] m2) {
        int m1rows = m1.length;
        int m1cols = m1[0].length;
        int m2rows = m2.length;
        int m2cols = m2[0].length;

        if (m1cols != m2rows)
            throw new IllegalArgumentException("matrices don't match: " + m1cols + " != " + m2rows);

        int[][] result = new int[m1rows][m2cols];

        // Multiply
        for (int i = 0; i < m1rows; i++) {
            for (int j = 0; j < m2cols; j++) {
                for (int k = 0; k < m1cols; k++) {
                    result[i][j] += m1[i][k] * m2[k][j];
                }
            }
        }

        return result;
    }

    public static void mprint(int[][] a) {
        int rows = a.length;
        int cols = a[0].length;

        System.out.println("array[" + rows + "][" + cols + "] = {");
        for (int i = 0; i < rows; i++) {
            System.out.print("{");
            for (int j = 0; j < cols; j++)
                System.out.print(" " + a[i][j] + ",");
            System.out.println("},");
        }
        System.out.println("};");
    }
}
```

The `multiply` method takes two matrices (`m1` and `m2`) as input, checks if their dimensions are compatible for multiplication, creates the result matrix, and performs the necessary calculations. The `mprint` method is a utility to print out the matrix in a readable format.
x??

---

#### Example Matrix Multiplication
Background context explaining that while specialized libraries like EJML or ND4J can be used in real-world applications, understanding basic concepts through simple implementations helps build foundational knowledge.

:p What are the steps involved in multiplying two matrices?
??x
To multiply two matrices, follow these steps:

1. **Check Dimensions**: Ensure both matrices have compatible dimensions for multiplication.
2. **Create Result Matrix**: Initialize a new matrix with appropriate dimensions to store the result.
3. **Nested Loops**: Use nested loops to calculate each element of the result matrix by performing dot products.

Here's how it works in detail:

1. **Dimensions Check**: Verify that the number of columns in the first matrix matches the number of rows in the second matrix.
2. **Result Matrix Initialization**: Create a new matrix with dimensions equal to `rows` (of the first matrix) and `columns` (of the second matrix).
3. **Multiplication Calculation**: Use three nested loops:
   - Outer loop iterates over each row of the first matrix.
   - Middle loop iterates over each column of the second matrix.
   - Inner loop calculates the dot product for each element.

Example implementation:

```java
public class Matrix {
    public static int[][] multiply(int[][] m1, int[][] m2) {
        int m1rows = m1.length;
        int m1cols = m1[0].length;
        int m2rows = m2.length;
        int m2cols = m2[0].length;

        if (m1cols != m2rows)
            throw new IllegalArgumentException("matrices don't match: " + m1cols + " != " + m2rows);

        int[][] result = new int[m1rows][m2cols];

        // Multiply
        for (int i = 0; i < m1rows; i++) {
            for (int j = 0; j < m2cols; j++) {
                for (int k = 0; k < m1cols; k++) {
                    result[i][j] += m1[i][k] * m2[k][j];
                }
            }
        }

        return result;
    }

    public static void mprint(int[][] a) {
        int rows = a.length;
        int cols = a[0].length;

        System.out.println("array[" + rows + "][" + cols + "] = {");
        for (int i = 0; i < rows; i++) {
            System.out.print("{");
            for (int j = 0; j < cols; j++)
                System.out.print(" " + a[i][j] + ",");
            System.out.println("},");
        }
        System.out.println("};");
    }
}
```

This code demonstrates how to multiply two matrices and print the result.
x??

---


#### Converting Between Dates/Times and Epoch Seconds
When working with dates and times, it's often necessary to convert between different representations such as local date/time, epoch seconds, or other numeric values. This conversion is essential for operations that require time measurements to be consistent across systems.

The Unix epoch represents the beginning of time in modern operating systems, which is typically 1970-01-01T00:00:00Z. Java's `Instant` class can represent this as a point in time using epoch seconds (or nanoseconds), while `ZonedDateTime` allows representation with a specific time zone.

:p How do you convert an instant to `ZonedDateTime`?
??x
You can use the `ofInstant()` factory method provided by the `ZonedDateTime` class. This method takes an `Instant` and a `ZoneId` as parameters, converting the epoch timestamp into a local date/time representation based on the given time zone.

```java
// Example code to convert Instant to ZonedDateTime
Instant epochSec = Instant.ofEpochSecond(1000000000L);
ZoneId zId = ZoneId.systemDefault();
ZonedDateTime then = ZonedDateTime.ofInstant(epochSec, zId);
System.out.println("The epoch was a billion seconds old on " + then);
```
x??

---

#### Converting Epoch Seconds to Local Date/Time
Java provides the `Instant` class for working with instant points in time. The `ofEpochSecond()` method of `Instant` allows you to create an `Instant` object from epoch seconds, which can later be converted into a local date/time using `ZonedDateTime`.

:p How do you convert epoch seconds to a `ZonedDateTime`?
??x
First, use the `ofEpochSecond()` method of the `Instant` class to get an `Instant` object. Then, you can use the `ofInstant()` factory method of `ZonedDateTime` along with your desired time zone (`ZoneId`) to convert this epoch timestamp into a local date/time representation.

```java
// Example code to convert epoch seconds to ZonedDateTime
long epochSeconds = 1000000000L;
Instant instant = Instant.ofEpochSecond(epochSeconds);
ZoneId zId = ZoneId.systemDefault();
ZonedDateTime then = ZonedDateTime.ofInstant(instant, zId);
System.out.println("The epoch was a billion seconds old on " + then);
```
x??

---

#### Converting Local Date/Time to Epoch Seconds
To convert from `ZonedDateTime` or any local date/time representation back to an epoch timestamp, you can use the `toEpochSecond()` method of the `Instant` class. This method returns the number of seconds since the Unix epoch.

:p How do you convert a `ZonedDateTime` to epoch seconds?
??x
You can obtain an `Instant` object from your `ZonedDateTime` using its `toInstant()` method. Then, use the `toEpochSecond()` method of `Instant` to get the timestamp in epoch seconds.

```java
// Example code to convert ZonedDateTime to epoch seconds
ZonedDateTime then = ZonedDateTime.now(); // Get current date/time
Instant instant = then.toInstant();
long epochSeconds = instant.toEpochSecond();
System.out.println("Current time as epoch seconds: " + epochSeconds);
```
x??

---

#### Handling Time Zone Conversion
When working with different time zones, it's important to understand how to convert between them. The `ZonedDateTime` class provides methods like `withZoneSameInstant()` or `atZone()` for converting a date/time instance from one time zone to another.

:p How do you convert `ZonedDateTime` from one time zone to another?
??x
You can use the `withZoneSameInstant()` method of `ZonedDateTime` to change the time zone while preserving the instant. Alternatively, you can create a new `ZonedDateTime` object in the target time zone using the `atZone()` method.

```java
// Example code to convert ZonedDateTime from one time zone to another
ZonedDateTime then = ZonedDateTime.now(); // Get current date/time
ZoneId sourceTimezone = ZoneId.of("America/New_York");
ZoneId targetTimezone = ZoneId.of("Europe/London");

// Convert to the target time zone
ZonedDateTime convertedDateTime = then.withZoneSameInstant(targetTimezone);
System.out.println("Converted datetime: " + convertedDateTime);
```
x??

---

#### Epoch Time and 32-Bit Integer Limitations
The 32-bit signed integer used for epoch seconds in some operating systems will overflow around the year 2038, leading to potential issues with date/time calculations. Java's `System.currentTimeMillis()` method already handles this by providing millisecond accuracy, but newer APIs use nanoseconds.

:p What is the issue with using a 32-bit integer for epoch time?
??x
The primary issue with using a 32-bit integer for epoch time is that it can overflow in the year 2038. This limitation means that any system or application using this format will face issues after 2038, leading to potential data corruption or incorrect date/time calculations.

To mitigate this risk, modern systems use larger representations such as nanoseconds. In Java, you can use `System.nanoTime()` for obtaining current time in nanoseconds and `Instant.ofEpochSecond(long)` for converting epoch seconds into an `Instant`.

```java
// Example code to demonstrate handling of epoch time overflow
long currentTimeInNanos = System.nanoTime();
System.out.println("Current time (nanoseconds): " + currentTimeInNanos);
```
x??

---


#### Getting Current Time and Date
Background context: This section covers how to retrieve the current date and time using Java's `ZonedDateTime` and `LocalDateTime`. It also shows how to convert these times into different time zones.

:p How can you get the current epoch seconds?
??x
You can obtain the current epoch seconds by converting the current `ZonedDateTime` to an `Instant`, which then provides the epoch seconds.
```java
long epochSecond = ZonedDateTime.now().toInstant().getEpochSecond();
System.out.println("Current epoch seconds = " + epochSecond);
```
x??

---
#### Time Zone Conversion
Background context: This section illustrates how to convert a local date-time (`LocalDateTime`) into a specific time zone using `atZone()`.

:p How do you convert the current local date and time to Vancouver's time zone?
??x
You can convert the current local date and time to Canada/Pacific (Vancouver) time zone by calling `atZone(ZoneId.of("Canada/Pacific"))` on a `LocalDateTime`.
```java
LocalDateTime now = LocalDateTime.now();
ZonedDateTime there = now.atZone(ZoneId.of("Canada/Pacific"));
System.out.printf("When it's percents here, it's percents in Vancouver %n", now, there);
```
x??

---
#### Parsing Strings into Date/Time Objects
Background context: This section explains how to convert a string representation of date and time into Java's `LocalDate` or `LocalDateTime` objects using the `parse()` method. It also covers custom format parsing.

:p How do you parse a string representing a date in ISO8601 format?
??x
You can parse a string representing a date in ISO8601 format (e.g., "1914-11-11") into a `LocalDate` object using the `parse()` method.
```java
String armisticeDate = "1914-11-11";
LocalDate aLD = LocalDate.parse(armisticeDate);
System.out.println("Date: " + aLD);
```
x??

---
#### Custom Date Format Parsing
Background context: This section discusses how to parse strings that do not follow the ISO8601 format by specifying a custom date-time formatter.

:p How can you parse a string in the format "27 Jan 2011" into a `LocalDate` object?
??x
To parse a string in the format "27 Jan 2011", you first create a `DateTimeFormatter` with the pattern "dd MMM uuuu". Then, use this formatter to parse the string.
```java
String anotherDate = "27 Jan 2011";
DateTimeFormatter df = DateTimeFormatter.ofPattern("dd MMM uuuu");
LocalDate random = LocalDate.parse(anotherDate, df);
System.out.println(anotherDate + " parses as " + random);
```
x??

---

