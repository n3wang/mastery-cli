# High-Quality Flashcards: 10A005---C-Software-Design---Klaus-Iglberger_processed (Part 34)


**Starting Chapter:** 11. The Last Guideline. Guideline 39 Continue to Learn About Design Patterns

---


#### Minimize Dependencies
Dependencies are a critical aspect of software design. Reducing dependencies is essential for maintaining and evolving your software over time.

Minimizing dependencies can be achieved through various design patterns that help separate concerns, manage abstraction, and encapsulate functionality.

:p How does minimizing dependencies impact the maintainability of software?
??x
Minimizing dependencies improves the maintainability of software by making it easier to understand, change, and test. When components are less dependent on each other, changes in one part of the system are less likely to affect other parts, reducing the risk of introducing bugs or breaking existing functionality.

For example, consider a `PaymentProcessor` class that directly depends on a `DatabaseConnection` class:
```cpp
class PaymentProcessor {
public:
    void processPayment() {
        DatabaseConnection db;
        // Process payment using database connection
    }
};
```
By introducing a dependency injection mechanism or using an interface for the database, we can decouple these classes and make them more modular.

```cpp
class PaymentProcessor {
private:
    IDatabaseConnection* _db;

public:
    void setDatabase(IDatabaseConnection* db) { _db = db; }
    void processPayment() {
        // Process payment using injected database connection
    }
};
```
x??

---

#### Separate Concerns
Separating concerns is a fundamental principle in software design. It involves breaking down complex systems into smaller, more manageable parts that handle specific responsibilities.

By separating concerns, you can enhance the readability and maintainability of your code. Each part of the system focuses on one aspect or responsibility, making it easier to understand and modify without affecting unrelated components.

:p How does separating concerns improve software design?
??x
Separating concerns improves software design by allowing different parts of the application to be developed, tested, and maintained independently. For example, in a game development project, you might separate concerns into modules such as UI, physics, networking, and AI. Each module handles its specific responsibilities, making it easier to isolate issues and update functionalities without disrupting other components.

Here’s an example using the Strategy design pattern, which separates concerns by allowing different behaviors (strategies) to be plugged in:

```cpp
class GameCharacter {
private:
    std::unique_ptr<Behavior> _behavior;

public:
    void setBehavior(std::unique_ptr<Behavior> behavior) { _behavior = std::move(behavior); }
    void performAction() { _behavior->execute(); }
};
```

In this case, the `GameCharacter` class delegates its specific actions (e.g., attacking or moving) to a strategy object (`_behavior`). This separation allows different behaviors to be easily swapped out without modifying the core character class.

x??

---

#### Prefer Composition Over Inheritance
Composition is often preferred over inheritance because it provides greater flexibility and modularity in software design. By using composition, you can achieve similar functionality with less coupling between classes.

Composing objects together can lead to more modular code that is easier to extend and test compared to deep class hierarchies created through inheritance.

:p Why should we prefer composition over inheritance?
??x
We should prefer composition over inheritance because it reduces tight coupling between classes, making the system more flexible and easier to maintain. Inheritance creates a rigid hierarchy where changes in one class can have cascading effects on derived classes. Composition allows us to build complex objects by combining simpler ones without imposing a fixed structure.

For example, consider a `Vehicle` class that could be extended using inheritance:
```cpp
class Vehicle {
public:
    virtual void drive() = 0;
};

class Car : public Vehicle {
public:
    void drive() override {
        // Specific car driving logic
    }
};
```

In this case, any change to the base `Vehicle` class would require modifications in all derived classes. Using composition, we can achieve similar functionality with more flexibility:

```cpp
class Engine;
class Car {
private:
    std::unique_ptr<Engine> _engine;

public:
    void setEngine(std::unique_ptr<Engine> engine) { _engine = std::move(engine); }
    void drive() {
        // Use the engine to drive the car
    }
};
```

By using composition, we can easily swap out different engines for our car without modifying the `Car` class or its hierarchy.

x??

---

#### Prefer Non-Intrusive Design
Non-intrusive designs allow you to add new functionality by adding code rather than modifying existing code. This approach enhances flexibility and maintainability because it avoids introducing side effects in other parts of the system.

Non-intrusive patterns like `Decorator`, `Adapter`, and others promote loose coupling, making your design more modular and easier to extend.

:p What is a non-intrusive design?
??x
A non-intrusive design allows you to add new functionality by adding code without modifying existing code. This approach enhances flexibility and maintainability because it avoids introducing side effects in other parts of the system. Non-intrusive designs promote loose coupling, making your design more modular and easier to extend.

For example, consider a `Logger` class that logs messages:

```cpp
class Logger {
public:
    void log(const std::string& message) { /* Log the message */ }
};
```

Instead of modifying this class every time we need new functionality, we can use composition (decorator pattern) to add additional behavior non-intrusively:

```cpp
class ExtendedLogger : public Logger {
private:
    std::unique_ptr<Logger> _innerLogger;

public:
    void setLogger(std::unique_ptr<Logger> logger) { _innerLogger = std::move(logger); }
    void log(const std::string& message) override {
        // Perform some additional logic
        _innerLogger->log(message);
    }
};
```

In this example, `ExtendedLogger` adds new functionality (additional logging logic) without modifying the original `Logger` class.

x??

---

#### Prefer Value Semantics Over Reference Semantics
Value semantics allow you to use values instead of pointers and references. This approach can simplify code and avoid common issues like null pointer exceptions, dangling pointers, and lifetime dependencies.

C++ is well-suited for value semantics due to its support for move semantics and value types.

:p Why should we prefer value semantics?
??x
We should prefer value semantics because they can simplify code and avoid common issues such as null pointer exceptions, dangling pointers, and lifetime dependencies. Value semantics allow you to work directly with values rather than references or pointers, which can make your code more straightforward and easier to reason about.

For example, consider a `Point` class that uses reference semantics:

```cpp
class Point {
public:
    int x, y;
};
```

If you pass around instances of this class by value, you might encounter issues like null pointer exceptions or dangling references. Using values instead can help mitigate these problems:

```cpp
struct Point { // Use C++17's std::variant for mixed types
    int x, y;
};

// Example function using value semantics
void drawPoint(const Point& p) {
    // Directly use the point without worrying about null or dangling references
}
```

In this example, `drawPoint` directly uses a `const` reference to the `Point`, avoiding potential issues related to null pointers or dangling references.

x??

---

