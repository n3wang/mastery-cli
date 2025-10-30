# High-Quality Flashcards: 10A006---Java-Cookbook---Ian-F-Darwin_processed (Part 17)

**Rating threshold:** >= 8/10

**Starting Chapter:** 8.9 Using Dependency Injection

---

**Rating: 8/10**

---

#### Subclassing Throwable Directly

Background context: In theory, you could subclass `Throwable` directly. However, it is generally considered poor practice to do so.

:p What are the reasons why subclassing `Throwable` directly is discouraged?
??x
Subclassing `Throwable` directly is discouraged because `Throwable` is not intended for direct subclassing. Instead, it is more conventional and appropriate to subclass either `Exception` or `RuntimeException`. Subclasses of `Exception` (checked exceptions) require applications to handle them explicitly by catching the exception or throwing it upward via a method's `throws` clause.
x??

---

#### Extending Exception

Background context: Typically, you would extend `Exception` for checked exceptions. Checked exceptions are those that an application developer is required to catch or throw upward.

:p What constructors should be provided when extending `Exception`?
??x
When extending `Exception`, it is customary to provide at least the following constructors:

1. A no-argument constructor.
2. A one-string argument constructor.
3. A two-argument constructor—a string message and a `Throwable cause`.

Example code:
```java
public class ChessMoveException extends Exception {
    private static final long serialVersionUID = 802911736988179079L;

    public ChessMoveException() {
        super();
    }

    public ChessMoveException(String msg) {
        super(msg);
    }

    public ChessMoveException(String msg, Exception cause) {
        super(msg, cause);
    }
}
```
x??

---

#### Extending RuntimeException

Background context: `RuntimeException` is used for unchecked exceptions. These do not need to be declared in the method signature of methods that throw them.

:p What constructors should be provided when extending `RuntimeException`?
??x
When extending `RuntimeException`, you typically provide at least the following constructors:

1. A no-argument constructor.
2. A one-string argument constructor.

Example code:
```java
public class IllegalMoveException extends RuntimeException {
    public IllegalMoveException() {
        super();
    }

    public IllegalMoveException(String msg) {
        super(msg);
    }
}
```
x??

---

#### Stack Trace and Cause

Background context: If the code receiving an exception performs a stack trace operation on it, the cause will appear with a prefix such as "Root Cause is".

:p What happens when you perform a stack trace on a `ChessMoveException`?
??x
When you perform a stack trace on a `ChessMoveException`, if it has been created with a two-argument constructor that includes a `cause`, the `cause` will be displayed in the stack trace with a prefix such as "Root Cause is". This helps to understand the underlying reason for the exception.

Example code:
```java
public class Main {
    public static void main(String[] args) {
        try {
            throw new ChessMoveException("Illegal move detected", new RuntimeException("Internal error"));
        } catch (ChessMoveException e) {
            e.printStackTrace();
        }
    }
}
```
Output:
```
Root Cause is: java.lang.RuntimeException: Internal error
java.lang.RuntimeException: Internal error
    at oo.ChessMoveException.<init>(ChessMoveException.java:10)
    at oo.Main.main(Main.java:7)
```

x??

---

#### Using Predefined Exception Subclasses

Background context: The `javadoc` documentation lists many subclasses of `Exception`. You should check there first to see if a predefined exception subclass fits your needs.

:p How can you check for available predefined exception subclasses?
??x
You can use the Javadoc documentation or online resources like the official Java API documentation to explore and identify appropriate predefined exception subclasses. For example, in the case of `ChessMoveException`, you might find that there is a similar predefined subclass such as `IllegalArgumentException` or another suitable exception type.

Example:
```java
public class Main {
    public static void main(String[] args) {
        try {
            throw new IllegalArgumentException("Invalid move");
        } catch (IllegalArgumentException e) {
            e.printStackTrace();
        }
    }
}
```
Output:
```
java.lang.IllegalArgumentException: Invalid move
    at Main.main(Main.java:7)
```

x??

---

**Rating: 8/10**

#### Dependency Injection Frameworks
Background context: Dependency injection (DI) is a design pattern that helps to manage object dependencies. It allows you to avoid hard-coding dependencies into classes, making them more testable and easier to maintain. DI frameworks like Spring or CDI provide mechanisms to inject these dependencies at runtime.

:p What are the main benefits of using dependency injection?
??x
The main benefits include decoupling components, improving testability, and enhancing reusability. By not hard-coding dependencies, you can easily switch implementations without altering the class logic.
x??

---

#### Spring Framework Example
Background context: The Spring framework is a popular Java-based DI container that simplifies object creation and management in applications. It uses annotations to manage dependencies.

:p How does the `ControllerTightlyCoupled` class demonstrate tight coupling?
??x
The `ControllerTightlyCoupled` class demonstrates tight coupling because it creates instances of `Model` and `View` directly within its method, which makes it dependent on specific implementations. This reduces flexibility and testability.
```java
public class ControllerTightlyCoupled {
    public static void main(String[] args) {
        Model m = new SimpleModel();
        ConsoleViewer v = new ConsoleViewer();
        v.setModel(m);
        v.displayMessage();
    }
}
```
x??

---

#### Spring Context Example with Annotations
Background context: Using a Spring context allows you to configure dependencies declaratively using annotations. This approach reduces the amount of boilerplate code required for dependency injection.

:p How does the `MainAndController` class use Spring annotations for dependency injection?
??x
The `MainAndController` class uses a Spring `ApplicationContext` to manage beans and their dependencies. It sets up a context, retrieves a `View` bean with an injected `Model`, and then calls its method.
```java
public class MainAndController {
    public static void main(String[] args) {
        ApplicationContext ctx = new AnnotationConfigApplicationContext("di.spring");
        View v = ctx.getBean("myView", View.class);
        v.displayMessage();
        ((AbstractApplicationContext) ctx).close();
    }
}
```
x??

---

#### Model Interface
Background context: The `Model` interface defines a contract for any class that provides data. Implementing this interface allows for flexibility in choosing different data providers.

:p What is the purpose of the `Model` interface?
??x
The `Model` interface serves as a contract for classes that provide data. By implementing it, you can create different versions of models, making your application more modular and testable.
```java
public interface Model {
    String getMessage();
}
```
x??

---

#### ConsoleViewer with Spring Annotations
Background context: The `ConsoleViewer` class demonstrates how to use Spring annotations for dependency injection. It injects a model instance into the view.

:p How does the `@Resource` annotation work in this example?
??x
The `@Resource` annotation is used to inject a bean by name. In this case, it sets up the relationship between the `ConsoleViewer` and the `Model`. The class also uses `@Named` to specify the name of the bean.
```java
@Named("myView")
public class ConsoleViewer implements View {
    Model messageProvider;

    @Override
    public void displayMessage() {
        System.out.println(messageProvider.getMessage());
    }

    @Resource(name="myModel")
    public void setModel(Model messageProvider) {
        this.messageProvider = messageProvider;
    }
}
```
x??

---

#### CDI Example with Weld
Background context: The Java EE Contexts and Dependency Injection (CDI) framework provides a more powerful way of managing dependencies compared to Spring. It uses annotations like `@Inject` to inject resources.

:p How does the `MainAndController` class use CDI with Weld?
??x
The `MainAndController` class uses Weld, an open-source implementation of CDI, to create and manage beans. It selects a `ConsoleViewer` instance based on its type and then calls the `displayMessage()` method.
```java
public class MainAndController {
    public static void main(String[] args) {
        final Instance<Object> weldInstance = new Weld().initialize().instance();
        weldInstance.select(ConsoleViewer.class).get().displayMessage();
    }
}
```
x??

---

#### CDI ConsoleViewer with @Inject
Background context: The `ConsoleViewer` class demonstrates how to use CDI annotations for dependency injection. It injects a string directly without needing an interface.

:p How does the `@Inject` annotation work in this example?
??x
The `@Inject` annotation is used to automatically inject dependencies into fields or methods based on their type and qualifiers. In this case, it injects a string value marked with the `@MyModel` qualifier.
```java
public class ConsoleViewer implements View {
    @Inject @MyModel private String message;
}
```
x??

---

**Rating: 8/10**

#### Dependency Injection Overview
Background context: The provided text discusses dependency injection (DI) and its implementation using various frameworks such as Spring, Java EE CDI, and Guice. DI allows classes to be loosely coupled by managing their dependencies through an external container or mechanism.

:p What are the key frameworks mentioned for implementing dependency injection?
??x
The key frameworks mentioned for implementing dependency injection include Spring, Java EE CDI, and Guice. Spring is noted as more widely used but all three can provide similar functionality in standalone applications or web apps with minor variations.
x??

---

#### CDI Implementation Example
Background context: The text provides an example of using the Java EE CDI framework to produce a `String` message through the `@Produces` annotation.

:p How does the `ModelImpl` class use dependency injection?
??x
The `ModelImpl` class uses the `@Produces` annotation with the `@MyModel` qualifier to generate a `String` message. This string is produced based on the member name and declaring class of the method, as retrieved from a resource bundle.

```java
public class ModelImpl {
    public @Produces @MyModel String getMessage(InjectionPoint ip)
            throws IOException {
        ResourceBundle props = ResourceBundle.getBundle("messages");
        return props.getString(
                ip.getMember().getDeclaringClass().getSimpleName() + "." +
                ip.getMember().getName());
    }
}
```

x??

---

#### Plotter Abstract Class
Background context: The text describes an abstract class `Plotter` that represents a series of pen plotters. It includes methods for controlling the plotter's state and drawing operations.

:p What is the purpose of the `Plotter` abstract class?
??x
The `Plotter` abstract class serves as a high-level interface to represent various pen plotters made by different vendors. Its purpose is to provide an abstraction that allows clients to use any specific plotter without worrying about the underlying implementation details.

:x??

---

#### PlotDriver Class
Background context: The text introduces a simple driver program `PlotDriver` that demonstrates how to instantiate and use instances of subclasses of the `Plotter` abstract class.

:p What does the `PlotDriver` class do?
??x
The `PlotDriver` class acts as a demonstration for creating an instance of a specific plotter subclass, using reflection. It allows drawing basic shapes like boxes and strings on the plotter, showcasing the capabilities provided by different implementations of the `Plotter` abstract class.

```java
public class PlotDriver {
    public static void main(String[] argv) {
        if (argv.length != 1) {
            System.err.println("Usage: PlotDriver driverclass");
            return;
        }
        try {
            Class<?> c = Class.forName(argv[0]);
            Object o = c.newInstance();
            if (!(o instanceof Plotter))
                throw new ClassNotFoundException("Not instanceof Plotter");
            Plotter r = (Plotter) o;

            // Perform drawing operations
            r.penDown();
            r.penColor(1);
            r.moveTo(200, 200);
            r.penColor(2);
            r.drawBox(123, 200);
            r.rmoveTo(10, 20);
            r.penColor(3);
            r.drawBox(123, 200);
            r.penUp();
            r.moveTo(300, 100);
            r.penDown();
            r.setFont("Helvetica", 14);
            r.drawString("Hello World");
            r.penColor(4);
            r.drawBox(10, 10);
        } catch (ClassNotFoundException e) {
            System.err.println("Sorry, class " + argv[0] + " not a plotter class");
            return;
        } catch (Exception e) {
            e.printStackTrace();
            return;
        }
    }
}
```

x??

---

