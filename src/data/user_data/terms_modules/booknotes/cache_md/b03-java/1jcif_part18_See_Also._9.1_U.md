# High-Quality Flashcards: 10A006---Java-Cookbook---Ian-F-Darwin_processed (Part 18)


**Starting Chapter:** See Also. 9.1 Using LambdasClosures Instead of Inner Classes. Problem. Solution. Discussion

---


#### Lambda Expressions in Java

Lambda expressions are a powerful feature introduced in Java 8 that allow you to write compact functional code. They provide a concise way to represent methods as objects, enabling more readable and efficient code.

Background context: Prior to Java 8, implementing functional interfaces often required the use of anonymous inner classes or separate named classes. This can be cumbersome for simple function implementations. Lambda expressions simplify this process by allowing you to write these functions inline.

:p What are lambda expressions in Java used for?
??x
Lambda expressions are used to implement functional interfaces—interfaces with a single abstract method—in a concise and readable manner. They enable writing small, self-contained pieces of code that can be passed around just like any other object.
```java
// Example of implementing a functional interface using a lambda expression
public class LambdaExample {
    public static void main(String[] args) {
        MyAction action = (String s) -> System.out.println(s);
        action.perform("Hello, World!");
    }

    @FunctionalInterface
    interface MyAction {
        void perform(String message);
    }
}
```
x??

---

#### Functional Interface in Java

A functional interface is an interface that has exactly one abstract method. In Java 8 and later, such interfaces can be used with lambda expressions to represent a single-method function.

Background context: The introduction of functional interfaces allows for more flexible and concise code when working with functional programming concepts like streams, parallel processing, and higher-order functions.

:p What is a functional interface in Java?
??x
A functional interface in Java is an interface that contains exactly one abstract method. This type of interface can be used to represent single-method functions using lambda expressions. Annotating such interfaces with `@FunctionalInterface` makes them suitable for this purpose.
```java
// Example of a functional interface
@FunctionalInterface
interface MyPredicate<T> {
    boolean test(T t);
}
```
x??

---

#### Spliterator in Java Streams

A spliterator is a component that can split an underlying collection into smaller parts to be processed. It's used internally by the Stream API for parallel processing.

Background context: Spliterators are derived from iterators but designed specifically for use with parallel collections and streams. They help partition data structures efficiently, making them suitable for distributed or parallel execution of operations on large datasets.

:p What is a spliterator in Java?
??x
A spliterator in Java is a component that can split an underlying collection into smaller parts to be processed. It's used internally by the Stream API for parallel processing. Spliterators are designed to support partitioning of data structures, which helps in efficient and parallel execution.
```java
// Example of using a spliterator with streams
long count = Files.lines(Path.of("lines.txt"))
                  .spliterator()
                  .trySplit() // split the stream into two parts
                  .mapToLong(line -> line.length())
                  .sum();
```
x??

---

#### Inner Classes vs. Lambda Expressions

Lambda expressions provide a more concise way to represent functional interfaces compared to traditional inner classes.

Background context: Traditional inner classes can be verbose, especially for simple functions with one method. Lambdas reduce the amount of boilerplate code required and make the implementation more readable.

:p How do lambda expressions simplify coding in Java?
??x
Lambda expressions simplify coding in Java by allowing you to write concise implementations for functional interfaces without needing to define a separate class or anonymous inner class. They reduce the amount of boilerplate code, making your code more readable and maintainable.
```java
// Traditional inner class example
ActionListener myButtonListener = new ActionListener() {
    public void actionPerformed(ActionEvent e) {
        System.out.println("Button clicked!");
    }
};

// Lambda expression example
ActionListener lambdaListener = (e) -> System.out.println("Button clicked!");

// Using the listener in a GUI application
myButton.addActionListener(lambdaListener);
```
x??

---

#### Action Listener Interface

The `ActionListener` interface is commonly used in Java Swing to handle user actions on buttons, menus, and other components.

Background context: The `ActionListener` interface has one method `actionPerformed(ActionEvent e)`, which is called when an action occurs. This interface is widely used in GUI applications for event handling.

:p What does the ActionListener interface do?
??x
The `ActionListener` interface is used to handle user actions, such as button clicks or menu selections, in Java Swing applications. It has one method `actionPerformed(ActionEvent e)` that is called when an action occurs.
```java
// Example of using ActionListener with a button
myButton.addActionListener(e -> System.out.println("Button clicked!"));
```
x??

---


#### Using Lambda Predefined Interfaces Instead of Your Own
In Java 8, predefined interfaces from `java.util.function` package can be used for lambda expressions instead of defining your own. These interfaces provide common functional methods that are widely applicable.

The `Predicate<T>` interface is one such example, which has only one method: `boolean test(T t)`.

:p What is the `Predicate<T>` interface used for in Java 8?
??x
`Predicate<T>` is an interface that represents a predicate (a boolean-valued function) of one argument. It checks whether some condition is met for a given input.
```java
// Example usage:
public class CameraSearch {
    public List<Camera> search(Predicate<Camera> tester) {
        // Implementation details here
    }
}
```
x??

---
#### Custom Functional Interface in Java 8
A functional interface is an interface that has exactly one abstract method. It can be used with lambda expressions to provide a concise way of passing behavior as a parameter.

The `@FunctionalInterface` annotation can be used to declare that an interface should be treated as a functional interface by the compiler, even if it's not annotated as such.

:p What is a custom functional interface in Java 8?
??x
A custom functional interface is an interface with exactly one abstract method that can be implemented using lambda expressions. It allows for flexible and concise code when dealing with functional programming concepts.
```java
// Example of a custom functional interface:
interface MyFunctionalInterface {
    int compute(int x);
}
```
x??

---
#### Implementing Custom Functional Interface Using Lambda
You can implement the abstract method of a custom functional interface using lambda expressions.

For example, `MyFunctionalInterface` has an abstract method `int compute(int x)`. This method can be implemented by a lambda expression that provides the desired behavior.

:p How would you use a lambda to implement a custom functional interface?
??x
You can use a lambda expression to provide the implementation for the abstract method of a custom functional interface. For example, if `MyFunctionalInterface` has an abstract method `int compute(int x)`, it can be implemented as follows:
```java
public class CustomImplementation {
    public static void main(String[] args) {
        MyFunctionalInterface myFunc = (x) -> x * x + 1;
        int result = myFunc.compute(5); // result will be 26
    }
}
```
x??

---
#### Default Methods in Functional Interfaces
Default methods allow you to add implementation to an interface, which can be overridden by implementing classes. This is useful for creating "mixins" or providing a base behavior that can be extended.

A default method has a method body and it can exist alongside other abstract methods in the same interface. Only one non-default method per functional interface may have a method body.

:p What are default methods in interfaces?
??x
Default methods in interfaces provide a way to add implementation to an interface without breaking existing implementations of that interface. This allows for a flexible way to extend or modify behavior while maintaining compatibility with older code.
```java
// Example of an interface with a default method:
public interface ThisIsStillFunctional {
    default int compute(int ix) { return ix * ix + 1; }
    int anotherMethod(int y);
}
```
x??

---


#### Introduction to Streams in Java 8
Streams are a new mechanism introduced with Java 8 that allow for processing data through a pipeline-like mechanism. This approach simplifies complex data transformations and aggregations using a fluent programming style.

:p What is the main feature of Streams in Java 8?
??x
Streams enable processing data via a pipeline where each step can perform operations like filtering, mapping, or reducing, with varying levels of parallelism. This makes complex data manipulations more concise and readable.
x??

---

#### Stream Producing Methods
These methods create a stream from a collection or array. They are the starting point for any stream processing.

:p What is an example of a stream producing method?
??x
The `Arrays.stream()` method is used to generate a stream from an array, as seen in Example 9-2.
```java
static Hero[] heroes = {
    new Hero("Grelber", 21),
    new Hero("Roderick", 12),
    new Hero("Francisco", 35),
    new Hero("Superman", 65),
    new Hero("Jumbletron", 22)
};

// Using Arrays.stream() to generate a stream from an array
Arrays.stream(heroes);
```
x??

---

#### Stream Passing Methods
These methods operate on a stream and return the reference to it, allowing for chaining of operations.

:p What are some examples of stream passing methods?
??x
Examples include `distinct()` (removes duplicate elements), `filter()` (filters elements based on a predicate), `limit()` (limits the number of elements processed), `map()` (maps each element using a provided operation), `peek()` (performs an action with each element and returns a reference to the stream for further processing), `sorted()` (sorts the elements in the stream), and `unordered()` (marks the stream as unordered).

```java
// Chaining operations like filter, map, and sorted
Arrays.stream(heroes)
    .filter(hero -> hero.age >= 21) // Filter adult heroes
    .map(Hero::name)                // Map to names
    .sorted()                       // Sort alphabetically
```
x??

---

#### Stream Terminating Methods
These methods conclude a streaming operation, producing the result of the processing.

:p What is an example of a stream terminating method?
??x
An example of a stream terminating method is `collect()`, which gathers elements into a collection. Another example could be `count()`, which returns the number of elements in the stream.
```java
// Terminating with collect to sum ages of adult heroes
long totalAge = Arrays.stream(heroes)
    .filter(hero -> hero.age >= 21) // Filter adult heroes
    .mapToInt(Hero::age)             // Convert age to int stream
    .sum();                          // Sum the ages

// Terminating with count to get the number of elements
long numAdultHeroes = Arrays.stream(heroes)
    .filter(hero -> hero.age >= 21) // Filter adult heroes
    .count();                        // Count the filtered heroes
```
x??

---

#### Lambda Expressions in Streams
Lambdas are used almost invariably for controlling stream operations like filtering, mapping, or sorting.

:p What is a lambda expression and how is it used with streams?
??x
A lambda expression is an anonymous function that can be passed as an argument to methods. In the context of streams, lambdas are often used to define conditions or transformations during operations such as `filter()`, `map()`, and `sorted()`.

Example:
```java
// Using a lambda with filter to find heroes older than 21
List<Hero> adultHeroes = Arrays.stream(heroes)
    .filter(hero -> hero.age >= 21) // Lambda expression filtering heroes
    .collect(Collectors.toList());   // Collecting the filtered heroes into a list

// Sorting names alphabetically using lambda
Arrays.stream(heroes)
    .sorted((hero1, hero2) -> hero1.name.compareTo(hero2.name)) // Lambda for sorting
    .forEach(System.out::println);                             // Printing sorted names
```
x??

---

