# High-Quality Flashcards: 10A005---C-Software-Design---Klaus-Iglberger_processed (Part 33)

**Rating threshold:** >= 8/10

**Starting Chapter:** Singletons Impede Changeability and Testability

---

**Rating: 8/10**

---
#### Singleton Pattern Overview
Singleton patterns are used when you want to ensure that a particular class has only one instance and provide a global point of access to it. This is often necessary for managing global resources or states within an application.

:p Why might developers use the Singleton pattern?
??x
The Singleton pattern is useful in scenarios where there needs to be exactly one instance of a class, such as when managing system-wide resources like databases, loggers, clocks, or configurations. The primary goal is to ensure that all parts of the codebase can access this single instance uniformly and consistently.

```java
// Example Singleton implementation in Java
public class Logger {
    private static final Logger INSTANCE = new Logger();

    // Private constructor to prevent instantiation from outside
    private Logger() {}

    public static Logger getInstance() {
        return INSTANCE;
    }

    // Methods for logging can be added here
}
```
x??

---
#### Challenges with Singleton
Singletons are often criticized because they create tight coupling between classes, making the code harder to test and maintain. Additionally, singletons can make it difficult to implement changes without affecting other parts of the system.

:p Why might developers dislike using Singleton?
??x
Developers dislike Singleton because it tends to introduce artificial dependencies and makes testing more challenging. It violates guidelines for design that emphasize flexibility and testability. The main issues stem from its nature as a global variable, which can lead to hidden side effects and difficulty in managing state changes.

```java
// Example of a potential issue with Singleton
public class DatabaseSingleton {
    private static final DatabaseSingleton instance = new DatabaseSingleton();
    private Connection connection;

    private DatabaseSingleton() {}

    public static DatabaseSingleton getInstance() {
        return instance;
    }

    // Other methods to manage the database can be added here

    public void connect() throws SQLException {
        if (connection == null) {
            connection = DriverManager.getConnection("jdbc:mysql://localhost:3306/mydb", "user", "password");
        }
    }
}
```
x??

---
#### Singleton and Change
Singletons are sometimes necessary to represent global aspects of a program. However, it is crucial to design them in a way that they can be modified without impacting the rest of the system.

:p In what situations might developers use Singleton?
??x
Developers may use Singleton when there is a need for something to exist only once and should be accessible from multiple parts of the application. This includes scenarios like managing global state, resources, or services such as logging, configuration, or database connections.

```java
// Example of using Singleton for a global service in Java
public class ConfigurationService {
    private static final ConfigurationService INSTANCE = new ConfigurationService();
    private Properties properties;

    private ConfigurationService() {}

    public static ConfigurationService getInstance() {
        return INSTANCE;
    }

    // Methods to load and retrieve configuration values can be added here

    public String getProperty(String key) {
        if (properties == null) {
            properties = new Properties();
            try (InputStream input = new FileInputStream("config.properties")) {
                properties.load(input);
            } catch (IOException ex) {
                throw new RuntimeException(ex);
            }
        }
        return properties.getProperty(key);
    }
}
```
x??

---
#### Singleton and Testability
Singletons can make testing more difficult because they can hold state across different test cases, leading to potential side effects. To address this, it is important to design singletons in a way that allows for mocking or stubbing during tests.

:p How can developers ensure Singleton is testable?
??x
To ensure that a Singleton is testable, developers should encapsulate the Singleton's dependencies and use interfaces or abstract classes. This allows testers to provide mock implementations of these dependencies when needed. Additionally, Singletons should be designed with an awareness of their global nature; they should not rely on side effects that could affect other parts of the application.

```java
// Example of making a Singleton testable in Java
public class Logger {
    private static final Logger instance = new Logger();
    private final ILogWriter logWriter;

    public Logger(ILogWriter logWriter) {
        this.logWriter = logWriter;
    }

    // Method to get the singleton instance with an injected dependency
    public static Logger getInstance(ILogWriter logWriter) {
        if (instance == null) {
            instance = new Logger(logWriter);
        }
        return instance;
    }

    // Methods for logging can be added here

    public void writeLog(String message) {
        logWriter.write(message);
    }
}

// Interface for the logger writer
public interface ILogWriter {
    void write(String message);
}
```
x??

---

**Rating: 8/10**

#### Dependency Inversion Principle (DIP)
Background context: The Dependency Inversion Principle states that high-level modules should not depend on low-level modules, but both should depend on abstractions. This principle helps ensure that the architecture is flexible and maintainable by decoupling concrete implementations from their clients.
:p What does the Dependency Inversion Principle recommend in terms of dependencies?
??x
The Dependency Inversion Principle recommends that high-level modules (e.g., application logic) should not depend on low-level modules (e.g., database access). Instead, both should depend on abstractions. This ensures that changes in the implementation details do not affect the higher levels.
```java
// Example of a violation of DIP using Singleton pattern for database access
public class DatabaseSingleton {
    private static final DatabaseSingleton INSTANCE = new DatabaseSingleton();
    
    public static DatabaseSingleton getInstance() {
        return INSTANCE;
    }
    
    // Database methods
}

public class Widget {
    public void doSomething() {
        DatabaseSingleton.getInstance().executeQuery();  // Direct dependency on concrete implementation
    }
}
```
x??

---

#### Inverted Dependency Structure with Singleton Pattern
Background context: The text discusses the illusion of a proper dependency structure when using Singletons. Although it appears that dependencies should run from lower to higher levels, in reality, there is an inverted dependency where all dependencies point towards the concrete implementation.
:p What issue does the text highlight regarding the use of Singleton pattern for database access?
??x
The text highlights that even though the database seems to be a high-level abstraction (Singleton), it actually has strong and invisible dependencies from various parts of the code, making the system rigid. This violates the Dependency Inversion Principle because all dependencies point towards the lower level, indicating a lack of proper abstraction.
```java
// Example showing inverted dependency with Singleton pattern for database access
public class Widget {
    public void doSomething() {
        DatabaseSingleton.getInstance().executeQuery();  // Direct dependency on concrete implementation
    }
}
```
x??

---

#### Testability Issues with Singleton Pattern
Background context: The use of Singleton patterns for critical components like databases can severely impact testability. Tests become tightly coupled with the specific implementation, making it difficult to substitute or mock the dependencies.
:p How does using a Singleton pattern affect testing in software development?
??x
Using a Singleton pattern for database access makes tests less flexible and harder to write because all functions that depend on the Singleton are also dependent on the same instance. This means you cannot easily replace the Singleton with mocks, stubs, or fakes during testing.
```java
// Example of a test issue due to Singleton dependency
public class WidgetTest {
    public void testDoSomething() {
        DatabaseSingleton.getInstance().executeQuery();  // Test is tightly coupled with the Singleton instance
    }
}
```
x??

---

#### Replacing Concrete Implementation with Abstractions
Background context: The text emphasizes the importance of making database access a true implementation detail on the low level, allowing for easier replacement and testing. This involves creating abstractions that can be easily substituted.
:p Why is it important to replace concrete implementations like databases with abstractions in software architecture?
??x
It is crucial to replace concrete implementations like databases with abstractions because this allows for more flexible and maintainable code. Abstractions enable you to change the database implementation without affecting higher-level logic, making the system easier to test and modify.
```java
// Example of replacing Singleton with an interface abstraction
public interface Database {
    void executeQuery();
}

public class Widget {
    private final Database db;

    public Widget(Database db) {
        this.db = db;
    }

    public void doSomething() {
        db.executeQuery();  // Dependency on abstraction, not concrete implementation
    }
}
```
x??

---

#### Realizing Proper Architecture with Abstractions
Background context: The text suggests that for a proper architecture, dependencies should run from lower to higher levels. Implementing database access through abstractions can achieve this and improve the overall structure of the system.
:p How can we ensure that our software architecture adheres to the Dependency Inversion Principle?
??x
To ensure that your software architecture adheres to the Dependency Inversion Principle, you need to implement dependencies from lower to higher levels. This means using interfaces or abstract classes for database access and injecting them into dependent components rather than directly using concrete implementations like Singletons.
```java
// Example of realizing proper architecture with abstractions
public interface Database {
    void executeQuery();
}

public class Widget {
    private final Database db;

    public Widget(Database db) {
        this.db = db;
    }

    public void doSomething() {
        db.executeQuery();  // Dependency on abstraction, not concrete implementation
    }
}
```
x??

**Rating: 8/10**

#### Dependency Inversion via `std::pmr::memory_resource` Abstraction
Background context: The example illustrates how to use the `std::pmr::memory_resource` abstraction from C++17 to achieve dependency inversion, which helps manage global state and initialization order issues. This pattern is applied in a database scenario where the `Database` class acts as a Singleton but becomes an implementation detail.
:p How does the text explain using `std::pmr::memory_resource` for dependency inversion?
??x
The text explains that by creating abstractions like `PersistenceInterface`, one can decouple higher-level logic from specific implementations, making it easier to swap out different database systems. The `get_persistence_interface()` function and `set_persistence_interface()` provide a way to set the global state without hardcoding dependencies on concrete implementations.
```cpp
class PersistenceInterface {
public:
    virtual ~PersistenceInterface() = default;
    bool read(/*some arguments*/) const { return do_read(/*...*/); }
    bool write(/*some arguments*/) { return do_write(/*...*/); }
private:
    virtual bool do_read(/*some arguments*/) const = 0;
    virtual bool do_write(/*some arguments*/) = 0;
};
PersistenceInterface* get_persistence_interface();
void set_persistence_interface(PersistenceInterface* persistence);
```
x??

---

#### Singleton Database Implementation with Lazy Initialization
Background context: The example shows how to implement the `Database` class as a Singleton that lazily initializes itself only if no other database is specified. This approach uses lazy initialization and local static variables for thread safety.
:p How does the text describe implementing a Singleton `Database` class?
??x
The `Database` class is implemented as a Singleton with lazy initialization. It checks if another persistence interface has been set using `set_persistence_interface()`. If not, it creates an instance of `Database` only once and uses local static variables to ensure thread safety.
```cpp
PersistenceInterface* get_persistence_interface() {
    // Local object, initialized by an 'Immediately Invoked Lambda Expression (IILE)'
    static bool init = [](){
        if(instance) {
            static Database db;
            instance = &db;
        }
        return true;  // or false, as the actual value does not matter.
    }();
    return instance;
}
```
x??

---

#### Strategy Design Pattern for Flexibility and Extension
Background context: The text introduces the `Strategy` design pattern to allow flexible database implementations. By introducing an abstract interface (`PersistenceInterface`) with a global access point, one can easily replace or extend the database implementation without affecting other parts of the code.
:p How does the example use the `Strategy` design pattern in this scenario?
??x
The `Strategy` design pattern is used by creating an abstract base class `PersistenceInterface` that defines common operations for different database implementations. This allows clients to switch between concrete implementations or test stubs easily, adhering to the Open-Closed Principle.
```cpp
class PersistenceInterface {
public:
    virtual ~PersistenceInterface() = default;
    bool read(/*some arguments*/) const { return do_read(/*...*/); }
    bool write(/*some arguments*/) { return do_write(/*...*/); }
private:
    virtual bool do_read(/*some arguments*/) const = 0;
    virtual bool do_write(/*some arguments*/) = 0;
};
```
x??

---

#### Thread Safety Concerns in Singleton Implementation
Background context: The example highlights potential thread safety issues with the current implementation of `get_persistence_interface()`. Even though it uses local static variables, there could be scenarios where setting a persistence interface before the first call to `get_persistence_interface()` leads to unexpected behavior.
:p What is the main thread safety issue in the provided Singleton implementation?
??x
The primary thread safety issue is that if `set_persistence_interface()` is called before the first call to `get_persistence_interface()`, the static local variable might not initialize correctly, leading either to an unused database instance or lost initialization.
```cpp
PersistenceInterface* get_persistence_interface() {
    // Local object, initialized by an 'Immediately Invoked Lambda Expression (IILE)'
    static bool init = [](){
        if(instance) {
            static Database db;
            instance = &db;
        }
        return true;  // or false, as the actual value does not matter.
    }();
    return instance;
}
```
x??

---

#### Non-Intrusive Solutions for Singleton Classes
Background context: If one cannot modify a given Singleton class, alternative non-intrusive design patterns like `Adapter` and `External Polymorphism` can be used to wrap or extend its functionality without changing the original class.
:p What are the two non-intrusive solutions mentioned for handling Singleton classes?
??x
The two non-intrusive solutions for handling Singleton classes are:
1. **Adapter**: Use it if an inheritance hierarchy is already in place, allowing wrapping of the Singleton to adapt its interface.
2. **External Polymorphism**: Use it when no inheritance hierarchy exists, enabling non-intrusive runtime polymorphism by using dynamic dispatch mechanisms.
```cpp
// Example of Adapter Pattern
class Adapter : public TargetInterface {
public:
    void doSomething() override { target->doOriginal(); }
private:
    std::unique_ptr<Source> target;
};
```
x??

---

**Rating: 8/10**

#### Global State Management
Background context: The text discusses managing global state, specifically through a `set_persistence_interface()` function. This function is used to set up persistence for various operations but poses limitations when called arbitrarily throughout testing.

:p Should the `set_persistence_interface()` function be allowed multiple calls?
??x
No, allowing it to be called multiple times would limit its use in testing scenarios where resetting the persistence system at the beginning of each test is necessary. This flexibility ensures that tests are isolated and do not rely on previous states.
x??

---

#### Local Dependency Injection via Constructor
Background context: To avoid global state issues, the text suggests using local dependency injection through constructors to pass dependencies directly to objects.

:p How does passing a persistence interface during Widget construction help?
??x
Passing a `PersistenceInterface` during Widget's construction ensures that each instance of `Widget` is properly initialized with its required dependencies. This makes the class more robust and easier to test, as dependencies are clearly defined.

```cpp
//---- <Widget.h> ----------------    
#include <PersistenceInterface.h>
class Widget {
public:
    Widget(PersistenceInterface* persistence)  // Dependency injection
        : persistence_(persistence)
    {}
    void doSomething(/*some arguments*/) {
        // ... persistence_->read(/*some arguments*/); 
        // ...
    }
private: 
    PersistenceInterface* persistence_{};
};
```
x??

---

#### Direct vs. Indirect Dependency Injection
Background context: The text explores whether to pass dependencies directly through member functions or as function arguments, weighing the pros and cons of each approach.

:p How does passing a `PersistenceInterface` via a member function's argument compare to using it in the constructor?
??x
Passing a `PersistenceInterface` via an argument in a member function (e.g., `doSomething(PersistenceInterface* persistence, /*some arguments*/)`) can make functions more flexible. However, this approach may become cumbersome when dealing with multiple dependencies and large call stacks.

```cpp
//---- <Widget.h> ----------------    
#include <PersistenceInterface.h>
class Widget {
public:
    void doSomething(/*some arguments*/) {
        // ... persistence_->read(/*some arguments*/); 
        // ...
    }
    void doSomething(PersistenceInterface* persistence, /*some arguments*/) {
        // ... persistence->read(/*some arguments*/);
        // ...
    }
private: 
    PersistenceInterface* persistence_{};
};
```
x??

---

#### Wrapper Function for Dependency Injection
Background context: The text proposes a compromise by introducing a wrapper function that simplifies dependency injection without requiring deep layering of dependencies.

:p What is the advantage of using a wrapper function to manage dependencies?
??x
Using a wrapper function allows local decision-making regarding dependencies while avoiding the complexity and unwieldiness of passing multiple dependencies through numerous function calls. The wrapper function acts as an intermediary, setting up the necessary context before invoking the actual logic that requires those dependencies.

```cpp
//---- <Widget.h> ----------------    
#include <PersistenceInterface.h>
class Widget {
public:
    void doSomething(/*some arguments*/) { 
        doSomething(get_persistence_interface(), /*some arguments*/); 
    }
    void doSomething(PersistenceInterface* persistence, /*some arguments*/) { 
        // ... persistence->read(/*some arguments*/);
        // ...
    }
private: 
    PersistenceInterface* get_persistence_interface() {
        // Code to return the current persistence interface
    }
};
```
x??

---

**Rating: 8/10**

---
#### Singleton Pattern Overview
Background context: The Singleton pattern is a design pattern that ensures a class has only one instance and provides a global point of access to it. This makes it suitable for managing critical resources such as database connections or loggers.

The Singleton pattern is crucial for scenarios where you need controlled access to an object, often referred to as the "global state" in codebases. However, despite its benefits, it comes with several drawbacks, especially related to global state management and testability.

:p What are the key points about the Singleton pattern discussed in the text?
??x
The Singleton pattern is a design pattern that restricts the instantiation of a class to one "single" instance, thus controlling access to critical resources such as database connections or loggers. It aims to provide a single point of access while avoiding issues associated with global state.

Key points include:
1. **Single Instance Guarantee**: Ensures only one instance exists.
2. **Global Access Point**: Provides a way to access the singleton object from anywhere in the application.
3. **Disadvantages**:
   - **Global State Flaws**: Risks introducing tightly coupled code and making the system harder to test.
   - **Testability Issues**: Difficult to mock or replace with alternatives for testing purposes.

??x
The answer with detailed explanations.
```java
public class Singleton {
    private static Singleton instance;

    // Private constructor to prevent instantiation from outside
    private Singleton() {}

    // Public method to get the single instance of the class
    public static Singleton getInstance() {
        if (instance == null) {
            synchronized(Singleton.class) {
                if (instance == null) {
                    instance = new Singleton();
                }
            }
        }
        return instance;
    }

    // Example method in singleton class
    public void doSomething() {
        System.out.println("Singleton doing something");
    }
}
```
This code snippet demonstrates the classic implementation of a Singleton with synchronization to ensure thread safety and avoid multiple instances. The `getInstance()` method is used as a global access point.

```java
public class Client {
    public static void main(String[] args) {
        Singleton singleton = Singleton.getInstance();
        singleton.doSomething();
    }
}
```
The client code uses the Singleton instance to call methods, ensuring controlled access and leveraging its single instance nature.
x??

---
#### Singletons with Unidirectional Data Flow
Background context: The text suggests that when using Singleton patterns, it is better to use them in scenarios where there are few global aspects needed. Additionally, it recommends designing Singletons for change and testability by using unidirectional data flow.

Unidirectional data flow means ensuring that the Singleton object does not directly depend on other objects but rather depends on interfaces or abstractions, thus making the design more modular and easier to test.

:p How can you improve a Singleton's design for better modularity and testability?
??x
By designing Singletons with unidirectional data flow, you ensure that they do not tightly couple themselves with other classes. Instead, dependencies are passed through interfaces or abstractions, making the code more flexible and easier to test.

This approach involves:
1. **Dependency Injection**: Pass necessary dependencies as arguments rather than having them hardcoded in the Singleton.
2. **Strategy Pattern**: Use the Strategy pattern to define a family of algorithms, encapsulate each one, and make them interchangeable. This allows for different behaviors without modifying the client code.

Example using Dependency Injection:
```java
public interface Logger {
    void log(String message);
}

public class DatabaseLogger implements Logger {
    @Override
    public void log(String message) {
        // Log implementation
    }
}

public class SingletonWithStrategyPattern {
    private final Logger logger;

    public SingletonWithStrategyPattern(Logger logger) {
        this.logger = logger;
    }

    public void doSomething() {
        logger.log("Doing something");
    }
}
```
In this example, `SingletonWithStrategyPattern` depends on an injected `Logger`, allowing for different logging strategies without changing the Singleton's implementation.

x??

---
#### Strategy Design Pattern for Dependency Inversion
Background context: The text suggests using the Strategy design pattern to invert dependencies and enable dependency injection in Singletons. This helps manage changes and improve testability by making it easier to switch implementations at runtime.

The Strategy pattern defines a family of algorithms, encapsulates each one, and makes them interchangeable. By applying this pattern, you can decouple the Singleton from concrete implementations, allowing for more flexible behavior.

:p How does the Strategy design pattern help in managing dependencies in Singletons?
??x
The Strategy design pattern helps manage dependencies in Singletons by allowing different behaviors to be implemented as separate classes (strategies) and then injected into the Singleton. This inversion of control makes the code more modular, testable, and flexible.

Steps for applying the Strategy pattern:
1. **Define Strategies**: Create interface or abstract class that defines the behavior.
2. **Implement Strategies**: Provide concrete implementations for each strategy.
3. **Inject Strategies**: Pass the chosen strategy to the Singleton via its constructor or setter method.

Example using the Strategy pattern:
```java
public interface Logger {
    void log(String message);
}

public class ConsoleLogger implements Logger {
    @Override
    public void log(String message) {
        System.out.println(message);
    }
}

public class DatabaseLogger implements Logger {
    @Override
    public void log(String message) {
        // Database logging implementation
    }
}

public class SingletonWithStrategyPattern {
    private final Logger logger;

    public SingletonWithStrategyPattern(Logger logger) {
        this.logger = logger;
    }

    public void doSomething() {
        logger.log("Doing something");
    }
}
```
In this example, the `SingletonWithStrategyPattern` uses a `Logger` interface to handle logging. Different strategies like `ConsoleLogger` or `DatabaseLogger` can be injected into the Singleton, providing flexible behavior.

x??

---

**Rating: 8/10**

#### RAII in C++
RAII stands for Resource Acquisition Is Initialization, which is a programming pattern used to manage resources like memory. The intent of RAII is not to reduce dependencies but to automate cleanup and encapsulate responsibility by ensuring that resources are acquired as soon as an object is created and released when the object is destroyed.
:p What is the primary purpose of RAII in C++?
??x
RAII's primary purpose in C++ is to ensure that resources are properly managed, meaning they are automatically released when objects go out of scope. This reduces the risk of memory leaks and other resource management issues by tying resource acquisition with object construction and release with object destruction.
```cpp
class File {
public:
    File(const std::string& path) : file_(fopen(path.c_str(), "r")) {
        if (file_ == NULL) {
            throw std::runtime_error("Failed to open file");
        }
    }

    ~File() {
        if (file_) {
            fclose(file_);
        }
    }

private:
    FILE* file_;
};
```
x??

---

#### Singleton Pattern
The singleton pattern is a design pattern that restricts the instantiation of a class to one "single" instance. The primary intent of using a singleton in C++ codebases can often lead to misuse and tight coupling, which are generally considered bad practices.
:p Why should you be suspicious if a Singleton is used for anything other than its intended purpose?
??x
Singletons can lead to tight coupling and make code harder to test and maintain. If a Singleton is used beyond simple global state management (like logging or configuration), it often indicates that the design is not adhering to principles such as dependency injection and SOLID.
```cpp
class Logger {
public:
    static Logger& getInstance() {
        static Logger instance;
        return instance;
    }

    void log(const std::string& message) const {
        // Log message implementation
    }
private:
    Logger() {}  // Private constructor to prevent instantiation from outside the class
};
```
x??

---

#### Monostate Pattern
The monostate pattern allows any number of instances of a type but ensures that there is only one state for all instances. This differs from the Singleton pattern, where only one instance can exist.
:p What distinguishes the Monostate pattern from the Singleton pattern?
??x
The key difference between the Monostate and Singleton patterns is that the monostate allows multiple instances, whereas the Singleton restricts instantiation to a single object. Both ensure there's only one state shared among all instances, but Monostate achieves this by sharing a common data structure.
```cpp
class Logger {
public:
    void log(const std::string& message) const {
        // Log message implementation
    }

private:
    static std::map<std::string, int> states;
};
```
x??

---

#### Test Doubles in C++
Test doubles (mocks, stubs, spies) are objects that stand in for real components during testing. They allow you to control and verify interactions between different parts of your code.
:p What is the purpose of test doubles like mocks and stubs in software development?
??x
The primary purpose of test doubles such as mocks and stubs is to isolate units of code during testing, allowing developers to focus on specific pieces without dependencies interfering. This makes unit tests more reliable and easier to write and maintain.
```cpp
class MockLogger : public Logger {
public:
    MOCK_METHOD(void, log, (const std::string&));
};
```
x??

---

#### Template Method Design Pattern
The template method design pattern defines the skeleton of an algorithm in a method, deferring some steps to subclasses. This allows for flexible implementations where concrete methods can be overridden.
:p What is the purpose of the Template Method design pattern?
??x
The Template Method pattern provides a flexible structure by defining the basic algorithm's skeleton and allowing subclasses to define certain steps of that algorithm without changing its structure. This promotes code reuse and makes it easier to extend functionality.
```cpp
class AbstractClass {
protected:
    virtual void step1() = 0;
    virtual void step2() = 0;

public:
    void templateMethod() {
        // Define the basic skeleton of an algorithm
        step1();
        step2();
    }
};

class ConcreteClass : public AbstractClass {
private:
    void step1() override { /* Implementation */ }
    void step2() override { /* Implementation */ }
};
```
x??

---

