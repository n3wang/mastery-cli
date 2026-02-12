# High-Quality Flashcards: 10A006---Java-Cookbook---Ian-F-Darwin_processed (Part 15)


**Starting Chapter:** 8.3 Providing Callbacks via Interfaces. Problem. Solution. Discussion

---


#### Default Methods in Interfaces
Default methods allow adding functionality to interfaces without breaking existing implementations. They provide backward compatibility while enhancing interface capabilities.
:p What is a default method?
??x
A default method is a method with a body defined within an interface that can be called by any class implementing the interface. This feature allows the addition of new behavior to an interface without requiring changes in the implementation classes, thus maintaining compatibility.
```java
interface MyList<T> {
    // Default method example
    default void forEach(Consumer<? super T> action) {
        // Implementation logic
    }
}
```
x??

---

#### Static Methods in Interfaces
Static methods in interfaces allow adding utility functions that operate on the interface type. These methods can be called without creating an instance of a class implementing the interface.
:p What is a static method in an interface?
??x
A static method within an interface behaves like any other static method but is part of the interface's public API. It provides functionality that can be used to create instances or perform operations on types implementing the interface.
```java
interface List<T> {
    // Static method example
    static <T> List<T> of(T... elements) {
        return Arrays.asList(elements);
    }
}
```
x??

---

#### Using Interfaces for Callbacks
Interfaces can be used to define callback mechanisms where unrelated classes need to call back into your code. This is useful in event-driven programming and other scenarios.
:p What is the purpose of using interfaces for callbacks?
??x
The purpose of using interfaces for callbacks is to allow external components or classes to interact with a specific method defined in an interface, enabling a flexible and decoupled design. Interfaces provide a contract that implementing classes must follow, ensuring that any class can be replaced by another as long as it adheres to the same interface.
```java
interface Callback {
    void onCallback();
}
class MyClass implements Callback {
    @Override
    public void onCallback() {
        System.out.println("Callback received!");
    }
}
```
x??

---

#### Subclassing, Abstract Classes, or Interfaces
Choosing between a subclass, an abstract class, and an interface depends on the specific requirements of your design. Each has its own use cases.
:p When should you choose to use an interface?
??x
Use an interface when you want to define a contract for unrelated classes without any common parent class. It allows multiple inheritance of functionality and can be used as a marker interface or to specify certain behavior that unrelated classes need to implement.
```java
interface MyInterface {
    // Interface methods
}
class MyClass implements MyInterface {
    @Override
    public void method() {
        System.out.println("Method implemented.");
    }
}
```
x??

---

#### Marker Interfaces
Marker interfaces are used to indicate something about a class without adding any functionality. They often have no abstract methods and are primarily used for serialization or other runtime checks.
:p What is the purpose of marker interfaces?
??x
The primary purpose of marker interfaces is to provide metadata information about classes, such as indicating that an object can be serialized. Marker interfaces do not add any behavior but serve as a flag or indicator within the Java Virtual Machine (JVM).
```java
interface Serializable {
    // No methods implemented
}
class MyClass implements Serializable {
    // Class implementation
}
```
x??

---

#### Abstract Classes vs Interfaces
Abstract classes and interfaces are used to achieve different goals. Abstract classes can provide partial implementations, while interfaces are more focused on defining contracts.
:p When should you use an abstract class?
??x
Use an abstract class when you want to provide a base class that can contain both implementation details and methods that subclasses must override. Abstract classes allow for shared code among multiple subclasses, making the design more cohesive.
```java
abstract class Shapes {
    public abstract void computeArea();
}
class Circle extends Shapes {
    @Override
    public void computeArea() {
        // Area calculation logic
    }
}
```
x??

---

#### Designing Unrelated Classes with Interfaces
Interfaces can be used to define functionality in unrelated classes, ensuring that certain operations are performed consistently across different class hierarchies.
:p How do you use interfaces to ensure consistent behavior in unrelated classes?
??x
Use interfaces to define a common contract among unrelated classes. This ensures that all implementing classes adhere to the same set of methods and behaviors, making it easier to manage and extend the functionality without affecting existing implementations.
```java
interface PowerSwitchable {
    void powerDown();
}
class ComputerMonitor implements PowerSwitchable {
    @Override
    public void powerDown() {
        System.out.println("Computer monitor powered down.");
    }
}
```
x??

---


#### Adding Items to a Building Management System
Background context: The provided Java program demonstrates adding various items like lights and computer components to a building management system. This showcases polymorphism and abstract methods usage in Java.

:p How does the `BuildingManagement` class add items, and what is printed when you run this code?
??x
The `BuildingManagement` class uses an `things.add(thing)` method to add various objects like `RoomLights`, `EmergencyLight`, and `ComputerCPU`. When you run the program, it prints each item being added as follows:

```java
public void add(Light thing) {
    System.out.println("Adding " + thing);
    things.add(thing);
}
```

The output reflects that all items are being added to the management system.

x??

---
#### Polymorphism in Java
Background context: The text explains how polymorphism works with abstract methods and subclasses. It demonstrates using a `Shape` class as a parent, which has an abstract method `computeArea()`, allowing different subclasses like `Rectangle` and `Circle` to implement their own versions.

:p What is the purpose of making a method abstract in Java?
??x
The purpose of making a method abstract in Java is to ensure that any subclass implementing this class must provide its specific implementation. This is useful for ensuring that certain methods are implemented, but leaving the exact logic to be defined by each subclass.

Example:
```java
public abstract class Shape {
    protected int x, y;
    public abstract double computeArea();
}

public class Rectangle extends Shape {
    double width, height;
    public double computeArea() {
        return width * height;
    }
}
```

x??

---
#### Abstract Method in `Shape`
Background context: The `Shape` class has an abstract method `computeArea()` which must be implemented by any subclass. This is used to calculate the area of different shapes like a rectangle or circle.

:p How does Java ensure that subclasses implement the `computeArea()` method?
??x
Java ensures that subclasses implement the `computeArea()` method by declaring it as `abstract` in the parent class (`Shape`). When you attempt to create an instance of any subclass, the compiler enforces that the abstract method is implemented.

Example:
```java
public abstract class Shape {
    protected int x, y;
    public abstract double computeArea();
}

public class Rectangle extends Shape {
    double width, height;
    @Override
    public double computeArea() {
        return width * height;
    }
}
```

x??

---
#### Polymorphism in `ShapeDriver`
Background context: The `ShapeDriver` class iterates over a collection of `Shape` objects and calls the `computeArea()` method on each, demonstrating polymorphism. This allows for a flexible design where specific implementations are handled within subclasses.

:p How does the `totalAreas()` method work to calculate areas using polymorphism?
??x
The `totalAreas()` method works by iterating over all `Shape` objects in the collection and calling their `computeArea()` methods, which are overridden in respective subclasses. This leverages polymorphism to call the correct implementation based on the object's actual class.

Example:
```java
public double totalAreas() {
    double total = 0.0;
    for (Shape s : allShapes) {
        total += s.computeArea();
    }
    return total;
}
```

x??

---


#### Typesafe Enumerations in Java
Background context explaining that Java introduced a more type-safe and flexible way to handle enums compared to C. Java enums are implemented as classes, subclassed from `java.lang.Enum`. They offer better readability and safety than using `final int` constants or custom enum classes.
If applicable, add code examples with explanations:
```java
// Incorrect usage in C
enum { BLACK, RED, ORANGE } color;
enum { READ, UNREAD } state; /*ARGSUSED*/
int main(int argc, char *argv[]) {
    color = RED;
    color = READ; // This will compile but give bad results in C

    return 0;
}

// Correct usage in Java
public enum Color {
    BLACK, RED, ORANGE
}

public enum State {
    READ, UNREAD
}
```
:p What is a key difference between Java enums and C enums when handling values?
??x
Java enums are type-safe; you cannot accidentally use values other than those defined for the given enumeration. In contrast, C enums can be used in any integer context, leading to potential bugs.
In Java, using `enum` ensures that only valid enum constants can be assigned, making the code more reliable and maintainable.
```java
public enum Media {
    BOOK, MUSIC_CD, MUSIC_VINYL, MOVIE_VHS, MOVIE_DVD;
}
```
x??

---
#### Using Enums in Java for Polymorphism
Background context explaining that enums in Java can implement interfaces, have constructors, fields, and methods. They are classes that extend `java.lang.Enum`. This allows for polymorphic behavior.
:p How can you use enums to achieve polymorphism?
??x
Enums in Java can be used to achieve polymorphism by implementing interfaces or adding methods. For example:
```java
public enum Media {
    BOOK, MUSIC_CD, MUSIC_VINYL, MOVIE_VHS, MOVIE_DVD;

    // Method overriding
    public String toString() {
        return "Default: " + name();
    }
}

// Overriding in specific enums
public enum MediaFancy {
    BOOK {
        @Override
        public String toString() {
            return "Book";
        }
    },
    MUSIC_CD,
    MUSIC_VINYL,
    MOVIE_VHS,
    MOVIE_DVD;

    // Additional methods can be added to each enum constant
}
```
x??

---
#### Iterating Over Enums in Java
Background context explaining that enums are iterable, which means you can iterate over them using a for-each loop. This is useful for performing actions on all possible values of an enum.
:p How can you iterate over the elements of an enum in Java?
??x
You can iterate over the elements of an enum by calling the `values()` method, which returns an array of all enum constants. You can then use a for-each loop to iterate through them:
```java
public class Product {
    public static void main(String[] args) {
        Media[] data = {Media.BOOK, Media.MOVIE_DVD, Media.MUSIC_VINYL};
        for (Media mf : data) {
            System.out.println(mf);
        }
    }
}
```
x??

---
#### Enum Constants and Namespaces
Background context explaining that each enum type in Java has its own separate namespace. This means you don't have to prefix constants with a name, making the code cleaner.
:p Why is it beneficial to use namespaces for enums in Java?
??x
Using namespaces for enums in Java prevents naming conflicts. Each enum type lives in its own namespace, so you don't need to prefix each constant with some sort of class name. This makes the code more readable and maintainable.
For example:
```java
public enum Media {
    BOOK, MUSIC_CD, MUSIC_VINYL, MOVIE_VHS, MOVIE_DVD;
}
```
You can directly use `Media.BOOK` instead of a longer qualified name like `MusicBook.BOOK`.
x??

---
#### Enums and Switch Statements in Java
Background context explaining that enums in Java support the use of switch statements. This makes it easy to handle different cases based on an enum value.
:p How can you use switch statements with enums in Java?
??x
Enums in Java are compatible with switch statements, allowing for clean and readable code when handling different cases:
```java
public class Product {
    String title;
    String artist;
    Media media;

    public Product(String artist, String title, Media media) {
        this.title = title;
        this.artist = artist;
        this.media = media;
    }

    @Override
    public String toString() {
        switch (media) {
            case BOOK:
                return title + " is a book";
            case MUSIC_CD:
                return title + " is a CD";
            case MUSIC_VINYL:
                return title + " is a relic of the age of vinyl";
            case MOVIE_VHS:
                return title + " is on old video tape";
            case MOVIE_DVD:
                return title + " is on DVD";
            default:
                return title + ": Unknown media " + media;
        }
    }
}
```
x??

---

