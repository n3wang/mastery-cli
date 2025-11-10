# High-Quality Flashcards: 10A006---Java-Cookbook---Ian-F-Darwin_processed (Part 33)


**Starting Chapter:** 17.7 Performance Timing. Problem. Solution. Discussion

---


#### Profiling Tools and Performance Measurement
Background context explaining the importance of profiling tools and performance measurement. Discuss the evolution from Oracle JDK to VisualVM and Java Flight Recorder, highlighting their respective roles in performance analysis.

:p What are profilers, and why are they important for programmers?
??x
Profiler tools, also known as performance analyzers, help find bottlenecks in your program by showing both the number of times each method was called and the amount of time spent in each. They provide valuable insights into application performance and can be crucial for optimizing code.

Examples of profiling tools include VisualVM (open-sourced from Oracle JDK to VisualVM project) and Java Flight Recorder, which is part of the JDK and designed to collect detailed runtime data that can be analyzed by Java Mission Control.
x??

---

#### Measuring a Single Method Using Time
Background context explaining how measuring a single method's execution time can help in optimizing code. Discuss using `System.currentTimeMillis()` for simple timing.

:p How can you measure the efficiency of a specific operation in Java?
??x
You can measure the efficiency of a specific operation by saving the JVM’s accumulated time before and after dynamically loading a main program, then calculating the difference between those times. This method provides an approximate total time taken by the operation under test.

Here is a simple example:
```java
long startTime = System.currentTimeMillis();
// code to be timed
long endTime = System.currentTimeMillis();

System.out.println("Time taken: " + (endTime - startTime) + " milliseconds");
```
This approach helps in understanding how long a particular piece of code takes to execute, allowing for optimization.
x??

---

#### Theory A vs. Theory B: String Concatenation and println()
Background context discussing the theory that string concatenation might be inefficient compared to `println()`.

:p How do you test whether string concatenation or `println()` is more efficient?
??x
To test which operation (string concatenation or using `println()`) is more efficient, you can write a simple timing program. Here’s an example for testing string concatenation with `System.out.println`:

```java
public class StringPrintA {
    public static void main(String[] argv) {
        Object o = "Hello World";
        for (int i = 0; i < 100000; i++) {
            System.out.println("<p><b>" + o.toString() + "</b></p>");
        }
    }
}
```

To test `println()` without string concatenation:
```java
public class StringPrintB {
    public static void main(String[] argv) {
        Object o = "Hello World";
        for (int i = 0; i < 100000; i++) {
            System.out.print("<p><b>");
            System.out.print(o.toString());
            System.out.print("</b></p>");
            System.out.println();
        }
    }
}
```

By running these tests and measuring the time taken, you can determine which approach is more efficient.
x??

---

#### Garbage Collection (GC) in Java
Background context explaining garbage collection behavior in Java and its significance. Discuss key presentations from Sun/Oracle at JavaOne.

:p What is garbage collection, and why is it important for Java applications?
??x
Garbage collection (GC) is a process that automatically manages the memory allocation and deallocation of objects within an application. It helps to reduce memory leaks and ensures efficient use of system resources by reclaiming unused memory. In Java, GC is managed by the JVM.

The importance of understanding GC behavior is highlighted in presentations such as "Garbage Collection in the Java HotSpot Virtual Machine" from 2003 and "Garbage Collection-Friendly Programming" from 2007, both presented at JavaOne.

GC can significantly impact application performance. For example:
```java
// Example of a method that could cause memory leaks if not properly managed
public void keepReference(Object obj) {
    while (true) {
        ref = obj;
    }
}
```
Understanding how to write GC-friendly code can improve application efficiency.
x??

---

#### Building a Simple Time Command in Java
Background context explaining the use of `System.currentTimeMillis()` for timing. Discuss creating a simple time command in Java.

:p How can you build a simplified version of a 'time' command in Java?
??x
You can build a simplified version of a 'time' command in Java by using `System.currentTimeMillis()`. This method allows you to measure the execution time of any given class by dynamically loading it and measuring the start and end times.

Here’s an example:
```java
public class Time {
    public static void main(String[] argv) throws Exception {
        // Instantiate target class, from argv[0]
        Class<?> c = Class.forName(argv[0]);
        
        // Find its static main method (use our own argv as the signature)
        Class<?>[] classes = { argv.getClass() };
        Method main = c.getMethod("main", classes);
        
        // Make new argv array, dropping class name from front
        String nargv[] = new String[argv.length - 1];
        System.arraycopy(argv, 1, nargv, 0, nargv.length);

        long startTime = System.currentTimeMillis();
        main.invoke(null, (Object) nargv);
        long endTime = System.currentTimeMillis();

        System.out.println("Time taken: " + (endTime - startTime) + " milliseconds");
    }
}
```

This program dynamically loads a specified class and measures the time it takes to execute its `main` method.
x??

---


---
#### Timing Program Execution
Background context: The provided Java program measures the runtime of a given class's main method by calculating the difference between start and end times using `System.currentTimeMillis()`. This method is useful for benchmarking but has limitations, such as excluding certain initialization overheads.

:p How does this Java program measure the execution time of a main method?
??x
The program uses `System.currentTimeMillis()` to record the current time before and after running the main method. The difference between these times gives the runtime in milliseconds.
```java
long t0 = System.currentTimeMillis(); // Record start time
main.invoke(null, nargs);             // Run the main program
long t1 = System.currentTimeMillis(); // Record end time

// Calculate runtime
long runTime = t1 - t0;
System.err.println("runTime=" + Double.toString(runTime / 1000D));
```
x??
---

#### Excluding Initialization Overhead
Background context: Directly comparing operating system timing with the above program's timing can lead to discrepancies because the latter excludes certain initialization overheads that are present in OS-level timing.

:p Why might results from the operating system time command differ when compared to this Java program’s results?
??x
The operating system time includes all processes and their associated overhead, such as JVM startup time. In contrast, the provided program measures only the runtime of the main method after the JVM has started.
x??
---

#### Printing Class Information
Background context: The text discusses using reflection in Java to print class information, similar to how `javap` works. This involves getting a `Class` object and using its methods like `getFields()` and `getMethods()`.

:p How can you use reflection to print all the fields and methods of a given class?
??x
By obtaining a `Class` object and calling `getDeclaredFields()`, you can retrieve an array of `Field` objects representing the declared fields in that class. Similarly, using `getDeclaredMethods()` returns an array of `Method` objects.

Here is how you might implement it:
```java
protected void doClass(String className) {
    try {
        Class<?> c = Class.forName(className);
        
        // Print annotations if any
        final Annotation[] annotations = c.getAnnotations();
        for (Annotation a : annotations) {
            System.out.println(a);
        }

        // Print class name and opening brace
        System.out.println(c + " {");

        // Get declared fields
        Field fields[] = c.getDeclaredFields();
        for (Field f : fields) {
            System.out.println(f);
        }
    } catch (ClassNotFoundException e) {
        e.printStackTrace();
    }
}
```
x??
---


#### Annotations Overview
Annotations provide additional information beyond what source code conveys. They can be used both at compile-time and runtime.
:p What is an annotation, and what are its primary uses?
??x
An annotation is a type of metadata that can be added to your Java code using the `@` symbol followed by the annotation name. Annotations help in providing additional information about classes, methods, fields, etc., which can be used at compile-time or runtime. For example, they can be used for overriding checks, persistence mapping, and more.

Annotations can be applied to various elements such as:
- Classes
- Methods
- Fields
- Parameters
- Local variables (since Java 8)

Here's an example of how you might apply an annotation:

```java
@MyAnnotation
public class MyClass {
    // class body
}
```

?: Explain the syntax and usage of annotations in detail.
??x
Annotations are defined using the `@interface` keyword. Here is a simple example of defining your own annotation:

```java
import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

@Retention(RetentionPolicy.RUNTIME)
@Target(ElementType.METHOD)
@interface MyAnnotation {
    String value();
}
```

This defines a custom `MyAnnotation` that can be applied to methods. The `@Retention` and `@Target` meta-annotations specify where the annotation can be used.

For applying an existing annotation, such as `@Override`, you simply place it before the element you want to annotate:

```java
public class MyClass {
    @Override
    public boolean equals(Object obj) { // Correct version with @Override
        // implementation
    }
}
```

?: How does the `@Override` annotation work in practice?
??x
The `@Override` annotation is used to indicate that a method or constructor is intended to override a method or constructor declared in a superclass. If the overridden method does not exist, the compiler will generate an error.

Here’s how it works:

```java
public class MyClass {
    @Override // This annotation tells the compiler this method should override a method from a superclass.
    public boolean equals(Object obj) {
        // implementation
    }
}
```

If you try to override a method incorrectly, such as in Example 17-14:

```java
public class MyClass {
    public boolean equals(MyClass object2) { // Incorrect: should be 'Object'
        // implementation
    }
}
```

The `@Override` annotation would catch this error at compile-time.

?: What is a common benefit of using the `@Override` annotation?
??x
A key benefit of using the `@Override` annotation is that it ensures methods are correctly overridden from superclasses or interfaces. If you accidentally try to override a method with an incorrect signature, the compiler will catch this error and prevent runtime issues.

For example:

```java
public class MyClass {
    @Override // This helps in catching potential errors at compile-time.
    public boolean equals(Object obj) { // Correct version with @Override
        // implementation
    }
}
```

Without `@Override`, such an error might go unnoticed until the code is run and issues occur due to incorrect method signatures.

?: How do annotations assist during runtime?
??x
Annotations can be used for metadata that is processed at runtime. For instance, in Java Persistence API (JPA), you use annotations like `@Entity` and `@Id` to mark entity classes for database persistence.

Here’s an example of a JPA entity class:

```java
import javax.persistence.Entity;
import javax.persistence.Id;

@Entity // Marks this as a JPA entity
public class MyEntity {
    @Id // Marks the field as the primary key
    private Long id;

    // other fields and methods
}
```

At runtime, these annotations can be used by frameworks like Hibernate to manage object persistence.

?: What is an example of using `@Override` in a real-world scenario?
??x
An example of using `@Override` in a real-world scenario would be ensuring that the overridden method correctly matches the signature from the superclass or interface. For instance, if you override the `equals()` and `hashCode()` methods as part of the `Object` class's contract:

```java
public class MyClass {
    @Override // Ensures this method overrides Object.equals()
    public boolean equals(Object obj) {
        // implementation
    }

    @Override // Ensures this method overrides Object.hashCode()
    public int hashCode() {
        // implementation
    }
}
```

?: How can annotations help in maintaining code?
??x
Annotations can help in maintaining code by ensuring that changes to superclass methods or interfaces are propagated correctly. For example, if a method is removed from a superclass and subclasses still try to override it with the `@Override` annotation, the compiler will generate an error.

This helps in identifying dead code and ensuring consistency across your codebase:

```java
public class SubClass extends SuperClass {
    @Override // If this method no longer exists in SuperClass, this would cause a compile-time error.
    public void oldMethod() {
        // implementation
    }
}
```

By using `@Override`, you can avoid potential runtime issues and keep your codebase clean.


---
#### Annotation Interface Overview
Annotations are represented as interfaces that extend `java.lang.annotation.Annotation`. These annotations can have attributes and methods defined within them. The `@interface` keyword is used to define an annotation type.

:p What does an annotation interface look like in Java?
??x
An annotation interface typically extends the `java.lang.annotation.Annotation` class and may include method declarations representing attribute values.

```java
public @interface MyAnnotation {
    String value() default "";
}
```
x??

---
#### @Target Annotation
The `@Target` annotation is used to specify where an annotation type can be applied. It takes a single parameter that specifies the element types on which the annotation is valid.

:p What does the `@Target` annotation do?
??x
The `@Target` annotation defines the target elements for an annotation, such as methods, fields, classes, interfaces, etc. This helps the compiler to enforce where annotations can be applied.

```java
@Target(ElementType.TYPE)
public @interface MyAnnotation {
}
```
x??

---
#### Retention Policy
The `@Retention` annotation is used to define how long an annotation should remain valid throughout the life cycle of a program. It can have different values such as `SOURCE`, `CLASS`, or `RUNTIME`.

:p What does the `@Retention` annotation do?
??x
The `@Retention` annotation specifies the retention policy for an annotation, indicating when and where the annotation information is available during the compilation and runtime phases.

```java
@Retention(RetentionPolicy.RUNTIME)
public @interface MyAnnotation {
}
```
x??

---
#### Annotation with Attributes
Annotations can have attributes that are defined as methods. These attributes can be used within the annotated code to provide specific values or behaviors.

:p How do you define attributes in an annotation?
??x
Attributes in an annotation are defined as method declarations inside the annotation interface. The attribute values can be specified when the annotation is applied to a target element.

```java
public @interface AnnotationDemo {
    boolean fancy() default false;
    int order() default 42;
}
```
x??

---
#### Applying Annotations to Classes
Annotations can be used on various elements such as classes, interfaces, and methods. The `@Target` annotation specifies the applicable target element types.

:p How do you apply an annotation to a class?
??x
You apply an annotation to a class by prefixing it with the `@` symbol before the class definition. You can also specify attribute values if needed.

```java
@AnnotationDemo(fancy = true)
class FancyClassJustToShowAnnotation {
    // Class body
}
```
x??

---
#### Reflection API for Annotations
The Java Reflection API allows you to inspect annotations at runtime, providing detailed information about the classes, methods, and fields of your program.

:p How do you use reflection to get annotations?
??x
You can use the `getAnnotations()` method of a class or interface to retrieve all its annotations. Then, you can check if an annotation instance matches specific types and cast it accordingly.

```java
Class<?> c = FancyClassJustToShowAnnotation.class;
for (Annotation a : c.getAnnotations()) {
    if (a instanceof AnnotationDemo) {
        AnnotationDemo ad = (AnnotationDemo)a;
        System.out.println("\t" + a);
    }
}
```
x??

---

