# High-Quality Flashcards: 10A005---C-Software-Design---Klaus-Iglberger_processed (Part 16)


**Starting Chapter:** Policy-Based Design

---


#### Strategy Design Pattern Overview
Explanation: The Strategy design pattern is a behavioral design pattern that allows an algorithm’s behavior to be selected at runtime. It decouples an algorithm from the client that uses it, allowing different algorithms to be used interchangeably.

:p What is the primary purpose of the Strategy design pattern?
??x
The Strategy design pattern enables you to define a family of algorithms, encapsulate each one, and make them interchangeable. This allows clients to use algorithms without being dependent on their implementation details.
x??

---

#### Multiple Strategy Instances per Class
Explanation: The example provided shows how using multiple strategy instances in a class can lead to larger instance sizes due to the overhead of pointers.

:p How does using multiple `std::unique_ptr` strategies affect the Circle class's performance and size?
??x
Using multiple `std::unique_ptr` strategies increases the size of the Circle class due to additional pointer indirection. It also incurs a runtime overhead since calls through these pointers are slower than direct function calls.

For example, if you have two different drawing strategies for the Circle:
```cpp
class DrawCircleStrategy1 {};
class DrawCircleStrategy2 {};

class Circle {
public:
    explicit Circle(double radius, std::unique_ptr<DrawCircleStrategy> drawer) : radius_(radius), drawer_(std::move(drawer)) {}

private:
    double radius_;
    std::unique_ptr<DrawCircleStrategy> drawer_;
};
```
The overhead comes from the extra memory and runtime cost due to pointer indirection.

To improve performance, you can use template parameters as shown in the example:
```cpp
template <typename DrawCircleStrategy>
class Circle : public Shape {
public:
    explicit Circle(double radius, DrawCircleStrategy drawer) : radius_(radius), drawer_(drawer) {}

private:
    double radius_;
    DrawCircleStrategy drawer_; // Could possibly be omitted if stateless.
};
```
x??

---

#### Policy-Based Design
Explanation: The policy-based design is a form of static polymorphism using templates. It allows you to inject behavior into class templates, making the code more flexible and easier to extend.

:p How does policy-based design differ from runtime Strategy pattern?
??x
Policy-based design uses templates for injecting behavior at compile time, whereas the runtime Strategy pattern uses pointers or references to dynamically change behaviors during execution.

For example:
```cpp
namespace std {
template <typename T, typename Deleter = std::default_delete<T>>
class unique_ptr;
}

// Using a template parameter instead of a pointer
template <typename DrawCircleStrategy>
class Circle : public Shape {
public:
    explicit Circle(double radius, DrawCircleStrategy drawer) : radius_(radius), drawer_(drawer) {}

private:
    double radius_;
    DrawCircleStrategy drawer_; // Could possibly be omitted if stateless.
};
```
x??

---

#### Standard Library Algorithms and Strategy Pattern
Explanation: The `std::partition` and `std::sort` algorithms in the C++ standard library use the Strategy pattern to allow external behavior injection.

:p How do `std::partition` and `std::sort` utilize the Strategy design pattern?
??x
Both `std::partition` and `std::sort` take a predicate function or comparator as an argument, which allows injecting specific behaviors at runtime. For example:
```cpp
namespace std {
template <typename ForwardIt, typename UnaryPredicate>
constexpr ForwardIt partition(ForwardIt first, ForwardIt last, UnaryPredicate p);

template <typename RandomIt, typename Compare>
constexpr void sort(RandomIt first, RandomIt last, Compare comp);
}
```
The `UnaryPredicate` for `std::partition` and the `Compare` for `std::sort` allow you to specify how elements should be ordered or partitioned without modifying the algorithms themselves.

This separation of concerns makes these functions more versatile and allows them to work with different data types and orderings.
x??

---

#### Flexibility in Cleanup
Explanation: The `std::unique_ptr` class template uses a template parameter for its deleter, allowing flexible resource management behavior.

:p How does the `std::unique_ptr` example demonstrate policy-based design?
??x
The `std::unique_ptr` demonstrates policy-based design by using a template parameter to inject cleanup behavior. You can specify how memory should be deallocated when the pointer is destroyed.

Example:
```cpp
namespace std {
template <typename T, typename Deleter = std::default_delete<T>>
class unique_ptr;

// Specialization for array types
template <typename T, typename Deleter>
class unique_ptr<T[], Deleter>;
}
```
Here, you can specify a custom deleter to perform cleanup in different ways:
```cpp
std::unique_ptr<int[]> ptr(new int[10], [](int* p) {
    delete[] p; // Custom array deleter
});
```
This flexibility shows how policy-based design can be applied to manage resources differently.
x??

---

#### Limitations of Strategy Pattern
Explanation: The example discusses the limitations and trade-offs of using multiple strategy instances per class.

:p What are some potential disadvantages of using multiple `std::unique_ptr` strategies in a class?
??x
Using multiple `std::unique_ptr` strategies can lead to larger object sizes due to pointer indirection, which can affect performance. Additionally, you lose the flexibility to change strategies at runtime and might end up with many different classes instead of a single one.

For example:
```cpp
class DrawCircleStrategy1 {};
class DrawCircleStrategy2 {};

class Circle {
public:
    explicit Circle(double radius, std::unique_ptr<DrawCircleStrategy> drawer) : radius_(radius), drawer_(std::move(drawer)) {}

private:
    double radius_;
    std::unique_ptr<DrawCircleStrategy> drawer_;
};
```
This approach is less flexible and might result in more complex code if you need to change the strategy at runtime.

To address these issues, policy-based design using template parameters can provide a better balance between flexibility and performance.
x??

---


#### Inheritance vs. Composition
Inheritance is often overvalued and misunderstood, especially when it comes to reusability and decoupling. While inheritance can simplify certain aspects of software design, it has significant limitations that make it less preferable compared to composition.

:p What are some key limitations of using inheritance?
??x
- Inheritance does not inherently promote code reuse in the way it is often perceived.
- It can create tight coupling between classes.
- It forces specific implementation details and constraints on derived classes, which may be suboptimal for certain applications.
- Overuse of inheritance leads to deep class hierarchies that are hard to manage.

Code examples:
```cpp
class Shape {
public:
    virtual ~Shape() = default;
    virtual void translate(/* some arguments */) = 0;
    virtual void rotate(/* some arguments */) = 0;
    virtual void draw(const /*some arguments*/) const = 0;
    virtual void serialize(const /*some arguments*/) const = 0;
};

void rotateAroundPoint(Shape& shape);
void mergeShapes(Shape& s1, Shape& s2);
void writeToFile(const Shape& shape);
void sendViaRPC(const Shape& shape);

// All these functions use the Shape abstraction
```
x??

---

#### Reusability Through Polymorphism
Inheritance is often thought to promote code reuse by allowing derived classes to inherit from a base class. However, true reusability comes from polymorphic usage of abstractions.

:p How does real reusability differ from perceived reusability in inheritance?
??x
Real reusability arises when a class can be used polymorphically, meaning that different concrete implementations share the same interface and can be treated interchangeably. This allows for reuse of functionality without tight coupling.

Code example:
```cpp
// A Shape base class with pure virtual functions
class Shape {
public:
    virtual ~Shape() = default;
    virtual void translate(/* some arguments */) = 0;
    virtual void rotate(/* some arguments */) = 0;
    virtual void draw(const /*some arguments*/) const = 0;
    virtual void serialize(const /*some arguments*/) const = 0;
};

// Functions that operate on Shapes
void rotateAroundPoint(Shape& shape);
void mergeShapes(Shape& s1, Shape& s2);
void writeToFile(const Shape& shape);
void sendViaRPC(const Shape& shape);

// These functions can be reused for all kinds of shapes because they work with the common interface.
```
x??

---

#### Coupling and Inheritance
Inheritance is often touted as a way to decouple software entities, but it actually creates coupling due to the implementation details that must be inherited.

:p What are some negative aspects of inheritance in terms of coupling?
??x
- Inheritance forces certain implementation details on derived classes, which can lead to suboptimal designs.
- It fixes function arguments and return types, limiting flexibility.
- Deep inheritance hierarchies can make the codebase harder to manage.
- Classes can become too closely tied to each other due to shared base class implementations.

Code example:
```cpp
// A classic Visitor pattern implementation where inheritance is used but can be problematic
class ShapeVisitor {
public:
    virtual void visitCircle(Circle& c) = 0;
    virtual void visitRectangle(Rectangle& r) = 0;
};

class Circle : public Shape, public ShapeVisitor {
public:
    // Must implement pure virtual functions from both base classes
    void translate(/* some arguments */);
    void rotate(/* some arguments */);
    void draw(const /*some arguments*/) const override;
    void serialize(const /*some arguments*/) const override;

    void visitCircle(Circle& c) override { /* implementation */ }
    void visitRectangle(Rectangle& r) {} // Not implemented, causing a compile error
};
```
x??

---

#### Composition Over Inheritance
Composition is often the better choice over inheritance because it promotes loose coupling and reusability through aggregation.

:p Why is composition considered superior to inheritance in many cases?
??x
- Composition allows for more flexible and decoupled designs.
- It enables extension by means of composition, allowing parts of an object to be replaced or extended independently.
- Compositional patterns like the Strategy pattern are often simpler and more maintainable than their inherited counterparts.

Code example:
```cpp
// Using a strategy pattern with composition
class Context {
public:
    void setStrategy(std::shared_ptr<IShapeStrategy> strategy) { _strategy = strategy; }
    void operation() { _strategy->execute(); }

private:
    std::shared_ptr<IShapeStrategy> _strategy;
};

interface IShapeStrategy {
    virtual void execute() = 0;
};

class CircleStrategy : public IShapeStrategy {
public:
    void execute() override { /* Circle-specific logic */ }
};

class RectangleStrategy : public IShapeStrategy {
public:
    void execute() override { /* Rectangle-specific logic */ }
};
```
x??

---

#### Peter Parker Principle
Inheritance can be a powerful feature, but it requires careful management to avoid misuse and overuse.

:p How does the "Peter Parker Principle" apply to inheritance?
??x
The "Peter Parker Principle" emphasizes that with great power comes great responsibility. Inheritance provides significant capabilities, but improper use or overuse can lead to complex, hard-to-maintain codebases. Developers must be cautious when using inheritance to ensure they are leveraging its benefits without causing unnecessary complications.

Code example:
```cpp
// Misusing inheritance by creating a deep class hierarchy
class Base {
public:
    virtual void method() = 0;
};

class Derived1 : public Base {
public:
    void method() override { /* implementation */ }
};

class Derived2 : public Derived1 {
public:
    void method() override { /* different implementation */ }
};
```
x??

---


#### Favor Composition Over Inheritance
Background context explaining the preference for composition over inheritance, focusing on tight coupling issues with inheritance and how composition can enable design patterns like Command. The Pragmatic Programmer advocates using "Has-A" relationships instead of "Is-A" when possible to improve code flexibility and maintainability.
:p What does the guideline suggest about the use of inheritance?
??x
The guideline suggests that inheritance is often overused and sometimes misused, leading to tight coupling between classes. Instead, it recommends favoring composition (using "Has-A" relationships) because it can provide more flexible and decoupled designs, which is beneficial for implementing design patterns like Command.
x??

---
#### Command Design Pattern Intent
Explanation of the Command pattern's intent, focusing on encapsulating a request as an object to support various operations such as queuing or logging requests, and enabling undoable operations. The goal is to abstract away the details of how work packages are executed and reversed.
:p What does the Command design pattern intend to achieve?
??x
The Command design pattern intends to encapsulate a request as an object so that you can parameterize clients with different requests, queue or log these requests, and support undoable operations. This abstraction allows for easier implementation of new kinds of work packages by recognizing variations in work package types.
x??

---
#### CalculatorCommand Base Class
Explanation of the `CalculatorCommand` base class provided in the text, detailing its purpose and how it enforces the implementation of `execute()` and `undo()` methods to define mathematical operations. The example code snippet shows a basic structure for this command pattern implementation.
:p What is the role of the `CalculatorCommand` base class?
??x
The role of the `CalculatorCommand` base class is to provide an abstract interface for implementing concrete commands that perform specific mathematical operations on integers. It enforces that derived classes implement both the `execute()` and `undo()` methods, allowing these commands to be executed and reversed as needed.
x??

---
#### Implementing Execute and Undo Methods
Explanation of how the `execute()` and `undo()` methods should function in a `CalculatorCommand` subclass, detailing their responsibilities. The example code snippet shows how these methods might be implemented for addition and subtraction operations.
:p How should the `execute()` and `undo()` methods work in a `CalculatorCommand` subclass?
??x
The `execute()` method should perform the actual mathematical operation (e.g., adding or subtracting from an integer), while the `undo()` method should reverse that operation. For example, if `execute()` adds 5 to an integer, `undo()` would subtract 5.
```cpp
class AddCommand : public CalculatorCommand {
public:
    int execute(int i) const override { return i + 5; }
    int undo(int i) const override { return i - 5; }
};

class SubtractCommand : public CalculatorCommand {
public:
    int execute(int i) const override { return i - 3; }
    int undo(int i) const override { return i + 3; }
};
```
x??

---
#### Invoker and Receiver
Explanation of the `Invoker` and `Receiver` classes in the Command pattern, detailing their roles and how they interact with commands. The example code snippet shows a possible implementation for an invoker that uses a command to perform a calculation.
:p What are the roles of the `Invoker` and `Receiver` in the Command pattern?
??x
The `Invoker` is responsible for invoking the appropriate `Command` object, while the `Receiver` carries out the actual work when the command is executed. The invoker receives the command from somewhere (e.g., user input) and then executes it by calling its `execute()` method on the receiver.
```cpp
class Invoker {
public:
    void setCommand(CalculatorCommand* cmd) { command = cmd; }
    void execute() { command->execute(currentValue); }

private:
    CalculatorCommand* command;
    int currentValue = 0;
};
```
x??

---
#### Concrete Command Implementation
Explanation of how a concrete `CalculatorCommand` subclass would be implemented to perform specific calculations, including the use of a receiver. The example code snippet demonstrates implementing a `SubtractCommand` that uses an integer receiver.
:p How would you implement a concrete `CalculatorCommand` for subtraction?
??x
To implement a `CalculatorCommand` for subtraction, you would create a subclass like `SubtractCommand`, which uses an integer as the receiver. This class overrides the `execute()` and `undo()` methods to perform the necessary calculations.
```cpp
class SubtractCommand : public CalculatorCommand {
private:
    int value;

public:
    SubtractCommand(int v) : value(v) {}

    int execute(int i) const override { return i - value; }
    int undo(int i) const override { return i + value; }
};
```
x??

---

