# High-Quality Flashcards: 10A005---C-Software-Design---Klaus-Iglberger_processed (Part 11)


**Starting Chapter:** Guideline 13 Design Patterns Are Everywhere

---


---

#### Design Patterns Not Outdated

Design patterns are not limited to object-oriented programming, dynamic polymorphism, or specific languages. They are still relevant and widely used today.

:p Why might someone think design patterns are outdated?
??x
It's a misconception that design patterns are only applicable in certain contexts, such as object-oriented programming. Over time, these ideas have been applied across different paradigms and languages, making them valuable tools for solving common software engineering problems.
x??

---

#### C++ Standard Library Allocators

The C++ Standard Library includes modern allocators like the polymorphic memory resource (PMR) namespace to manage memory more efficiently.

:p How can you use std::pmr::monotonic_buffer_resource in a practical example?
??x
You can use `std::pmr::monotonic_buffer_resource` to direct all memory allocations into a predefined byte buffer. This is useful for scenarios where you want to limit the amount of dynamic memory used.

Example code:
```cpp
#include <array>
#include <cstddef>
#include <cstdlib>
#include <memory_resource>
#include <string>
#include <vector>

int main() {
    std::array<std::byte, 1000> raw; // Note: not initialized.
    std::pmr::monotonic_buffer_resource buffer{raw.data(), raw.size(), std::pmr::null_memory_resource()};

    std::pmr::vector<std::pmr::string> strings{&buffer};
    strings.emplace_back("String longer than what SSO can handle");
    strings.emplace_back("Another long string that goes beyond SSO");
    strings.emplace_back("A third long string that cannot be handled by SSO");

    // The std::pmr::null_memory_resource ensures that any allocation request will fail and throw an exception.
}
```
x??

---

#### Polymorphic Memory Resource (PMR)

The `std::pmr` namespace provides modern memory management facilities, such as the `monotonic_buffer_resource`, which can be used to manage static or stack-based memory.

:p How does `std::pmr::null_memory_resource()` function?
??x
`std::pmr::null_memory_resource()` returns an allocator that always fails when trying to allocate memory. This is useful for testing or scenarios where you want to ensure all allocations fail, such as debugging memory usage.

Example code:
```cpp
std::pmr::null_memory_resource() // Returns a null memory resource
```
x??

---

#### Monotonic Buffer Resource

The `std::pmr::monotonic_buffer_resource` can be used to allocate memory from a predefined buffer. This is useful for scenarios where you want to limit the amount of dynamic memory used.

:p How do you initialize `std::pmr::monotonic_buffer_resource`?
??x
You initialize `std::pmr::monotonic_buffer_resource` by providing it with a pointer to the beginning of your buffer and its size, along with an optional backup allocator. If no backup is needed, you can use `std::pmr::null_memory_resource()`.

Example code:
```cpp
std::array<std::byte, 1000> raw; // Note: not initialized.
std::pmr::monotonic_buffer_resource buffer{raw.data(), raw.size(), std::pmr::null_memory_resource()};
```
x??

---

#### Allocator Flexibility

Allocators in C++ can be customized to meet specific needs, such as limiting memory usage or testing.

:p How does using a custom allocator help in limiting dynamic memory usage?
??x
Using a custom allocator like `std::pmr::monotonic_buffer_resource` helps limit the amount of dynamic memory used by directing all allocations into a predefined buffer. This can be useful for optimizing performance, reducing peak memory usage, or testing scenarios where you want to simulate memory constraints.

Example code:
```cpp
std::array<std::byte, 1000> raw; // Note: not initialized.
std::pmr::monotonic_buffer_resource buffer{raw.data(), raw.size(), std::pmr::null_memory_resource()};
```
x??

---


#### Decorator Design Pattern
Background context explaining how combining and reusing functionality through decorators can be a powerful technique. The example uses `std::pmr::vector` and `std::pmr::string`, which are type aliases for regular C++ containers but employ a different allocator mechanism.

:p What is the Decorator design pattern used for in this context?
??x
The Decorator design pattern allows for flexible object customization by adding responsibilities to objects dynamically without modifying their structure. In the example, `std::pmr::vector` and `std::pmr::string` use a polymorphic allocator (`std::pmr::polymorphic_allocator`) to provide memory resource management that can be customized.
??x
---

#### Polymorphic Allocator as Adapter
Explanation of how the `std::pmr::polymorphic_allocator` acts as an adapter, bridging the gap between static interfaces expected by standard containers and dynamic allocator requirements.

:p How does the `std::pmr::polymorphic_allocator` work?
??x
The `std::pmr::polymorphic_allocator` serves as an adapter that translates between the traditional C++ memory allocation interface and the new, polymorphic memory resource (PMR) interface required by modern C++ containers. This allows for dynamic memory management strategies to be applied to standard library types without altering their fundamental interfaces.
??x
---

#### Strategy Design Pattern in Containers
Explanation of how the strategy design pattern is used in customizing memory allocation in containers like `std::vector` and `std::string`.

:p How does the Strategy design pattern manifest in C++ containers?
??x
The Strategy design pattern is applied to C++ containers by allowing them to accept a template parameter for an allocator. This enables external customization of how memory is allocated, providing flexibility without changing the core functionality of the container.
??x
---

#### Design Patterns Everywhere
Explanation of the ubiquity and importance of recognizing and applying design patterns in software development.

:p Why are design patterns important in modern software development?
??x
Design patterns are crucial because they provide a common vocabulary for solving problems, making code more readable and maintainable. They help to decouple components, enhance flexibility, and promote extensibility. Understanding design patterns aids developers in recognizing recurring structures and applying proven solutions.
??x
---


#### Design Patterns Everywhere
Background context: Every kind of abstraction and any attempt to decouple likely represents a known design pattern. Understanding these patterns can greatly enhance your ability to solve complex problems by leveraging existing solutions.

:p Explain why design patterns are important for programming?
??x
Design patterns are essential because they provide proven, reusable solutions to common software design problems. By recognizing and applying design patterns, developers can improve code quality, maintainability, and scalability. They help in making the code more modular, reducing coupling between components, and facilitating easier changes or extensions.

---
#### Using Design Pattern Names for Clarity
Background context: Naming parameters with the intent of a design pattern can significantly enhance the clarity of your code. The name of a design pattern expresses its intent clearly, making it easier to understand what the parameter does and how it will be used in future modifications.

:p How does naming a template parameter as `BinaryReductionStrategy` help in understanding the function?
??x
Naming the template parameter as `BinaryReductionStrategy` helps clarify that the passed callable is responsible for performing a binary operation during reduction. This name indicates that the operation can vary, allowing for flexibility and customization. For instance:

```cpp
template< class InputIt, class T, class BinaryReductionStrategy >
constexpr T accumulate( InputIt first, InputIt last, T init,
                       BinaryReductionStrategy op );
```

Here, `BinaryReductionStrategy` implies that the operation is expected to take two arguments and reduce them in some way. This makes it clear that different strategies can be injected at runtime, providing flexibility.

---
#### Strategy Design Pattern
Background context: The Strategy design pattern enables a method for changing an object’s behavior when the object is initialized. It allows you to provide a family of algorithms, encapsulate each one, and make them interchangeable.

:p What does the `BinaryReductionStrategy` in the `accumulate` function suggest about its implementation?
??x
The `BinaryReductionStrategy` suggests that it is an interface or callable that defines how two values are combined. It implies that different reduction strategies can be injected into the `accumulate` function, allowing for customization of the reduction operation without changing the core logic.

For example:

```cpp
#include <iostream>
#include <vector>

struct Sum {
    template<typename T>
    auto operator()(T a, T b) const -> decltype(a + b) {
        return a + b;
    }
};

int main() {
    std::vector<int> numbers = {1, 2, 3, 4};
    int result = 0;

    // Using the Strategy pattern to accumulate with different strategies
    auto strategy1 = Sum();
    result = std::accumulate(numbers.begin(), numbers.end(), 0, strategy1);

    return 0;
}
```

In this example, `Sum` is a strategy that defines how two integers are combined using addition. The `accumulate` function can use any such strategy to perform the reduction operation.

---
#### Command Design Pattern
Background context: The Command pattern encapsulates a request as an object, thereby allowing for parameterization of clients with different requests, queuing or logging of requests, and support for undoable operations.

:p How does renaming a template parameter from `BinaryReductionStrategy` to `UnaryCommand` in the `std::for_each` algorithm clarify its purpose?
??x
Renaming the template parameter from `BinaryReductionStrategy` to `UnaryCommand` clarifies that this callable will operate on single elements, not pairs. It suggests that there are minimal or no expectations for the operation other than it should be a unary function.

For example:

```cpp
#include <iostream>
#include <vector>

// Unary command example
struct Print {
    void operator()(int i) const { std::cout << "int: " << i << ' '; }
    void operator()(double d) const { std::cout << "double: " << d << ' '; }
    void operator()(std::string const& s) const { std::cout << "string: " << s << ' '; }
};

int main() {
    std::vector<int> numbers = {1, 2, 3, 4};
    
    // Using UnaryCommand to print each element
    std::for_each(numbers.begin(), numbers.end(), Print());
    
    return 0;
}
```

In this example, the `Print` class is a unary command that prints different types of elements. The function object can be applied to each element in the range without any assumptions about how it will interact with multiple values.

---
#### std::visit() Function
Background context: The `std::variant` and `std::visit` functions are part of C++'s Standard Library, which allow for dynamic polymorphism through variant types. The `std::visit` function visits a value stored in a `std::variant`, calling the appropriate callable for the contained type.

:p How does the name `Print` suggest what the `std::visit` function is doing?
??x
The name `Print` suggests that this function object is responsible for printing the contents of a `std::variant`. The use of `Print` indicates that there are specific implementations for handling different types stored in the variant, making it clear that the visitor will perform type-specific actions.

For example:

```cpp
#include <iostream>
#include <cstdlib>
#include <variant>

struct Print {
    void operator()(int i) const { std::cout << "int: " << i << ' '; }
    void operator()(double d) const { std::cout << "double: " << d << ' '; }
    void operator()(std::string const& s) const { std::cout << "string: " << s << ' '; }
};

int main() {
    std::variant<int, double, std::string> v;
    
    // Assigning a string to the variant
    v = "C++ Variant example";
    
    // Visiting the variant with Print and printing its contents
    std::visit(Print{}, v);
    
    return 0;
}
```

In this code, `Print` is used as a visitor function object that will call its appropriate operator based on the type stored in the `std::variant`, effectively printing out the value.


#### Strategy Design Pattern
The Strategy design pattern is a behavioral pattern that allows an algorithm's behavior to be selected at runtime. It encapsulates a family of algorithms, makes them interchangeable, and lets clients choose which one to use without changing the client code.

This pattern is particularly useful when you have multiple ways of doing something but don't want to hard-code these choices into your program. By using the Strategy pattern, you can easily switch between different strategies during execution.

:p What is the main purpose of the Strategy design pattern?
??x
The main purpose of the Strategy design pattern is to enable clients to choose from a family of algorithms dynamically at runtime and change their behavior without altering the client code.
x??

---

#### std::accumulate() with Custom Accumulation Function
The `std::accumulate()` function in C++ is part of the Standard Template Library (STL) and allows for flexible accumulation operations. By default, it uses the addition operator (`+`), but you can provide a custom accumulation function as its fourth argument to perform more complex accumulations.

:p How does std::accumulate() use a custom accumulation function?
??x
You can provide a custom accumulation function as the fourth argument to `std::accumulate()`. This allows for flexible and complex accumulation operations beyond simple addition. For example, you might want to accumulate elements using multiplication or another operation defined by your specific needs.

```cpp
#include <numeric>
#include <vector>

int main() {
    std::vector<int> numbers = {1, 2, 3, 4};
    
    int product = std::accumulate(numbers.begin(), numbers.end(), 1,
                                  [](int a, int b) { return a * b; });

    // The variable 'product' now contains the result of multiplying all elements.
}
```
x??

---

#### Visitor Design Pattern
The Visitor design pattern is used when you want to add new operations to existing classes without changing their structure. It separates an algorithm from an object structure by making the algorithm a visitor that traverses the object structure.

:p What problem does the Visitor design pattern solve?
??x
The Visitor design pattern solves the problem of adding new operations to existing classes without altering their structure or violating the open/closed principle. Instead, it introduces a separate class (the visitor) that can traverse and operate on elements of an object hierarchy.

```cpp
class Element {
public:
    virtual void accept(Visitor& v) = 0;
};

class ConcreteElementA : public Element {
public:
    void accept(Visitor& v) override { v.visit(*this); }
};

class Visitor {
public:
    virtual void visit(const ConcreteElementA&) = 0;
};

class ConcreteVisitor : public Visitor {
public:
    void visit(const ConcreteElementA& elem) override {
        // Perform operations on 'elem'
    }
};
```
x??

---

#### CRTP (Curiously Recurring Template Pattern)
The Curiously Recurring Template Pattern (CRTP) is a C++ programming technique where a derived class template is parameterized with its own base class. It’s often used to enable compile-time polymorphism.

:p What is the Curiously Recurring Template Pattern (CRTP)?
??x
The CRTP is a C++ design pattern that allows you to use templates to create a type-safe way of deriving from a base class, providing additional flexibility and power at compile time. It can be used for compile-time polymorphism or any scenario where static information needs to be available during compile-time.

```cpp
template <typename Derived>
class Base {
public:
    // Member function that takes the derived class as a parameter.
    void callMemberFunction(Derived& obj) {
        obj.memberFunction();
    }
};

// A derived class template that inherits from `Base`.
template <typename T>
class Derived : public Base<Derived<T>> {
public:
    void memberFunction() { /* Implementation */ }
};
```
x??

---

#### Singleton as an Implementation Detail
The Singleton pattern is often considered a design pattern, but in reality, it's more of an implementation detail. It ensures that only one instance of a class exists and provides a global point of access to it.

:p Why should we treat Singleton as an implementation detail?
??x
We should treat Singleton as an implementation detail because its usage can introduce tight coupling, making the code harder to test and maintain. The Singleton pattern is often overused for simple problems that don't require such complexity.

```cpp
class Singleton {
private:
    static Singleton* instance;
    Singleton() {}

public:
    static Singleton& getInstance() {
        if (instance == nullptr) {
            instance = new Singleton();
        }
        return *instance;
    }

    // Other methods and members...
};

// In a real implementation, you would make the constructor private
// and provide a static method to access the single instance.
```
x??

---

#### Decorator Design Pattern
The Decorator design pattern is used for adding new behaviors or responsibilities dynamically to objects at runtime. It allows you to wrap another object with additional functionality without modifying the wrapped object.

:p What problem does the Decorator design pattern solve?
??x
The Decorator design pattern solves the problem of extending the behavior of an object by attaching new functionalities in a flexible and dynamic way, typically by wrapping existing objects with decorator objects.

```cpp
class Component {
public:
    virtual void operation() = 0;
};

class ConcreteComponent : public Component {
public:
    void operation() override { std::cout << "Concrete Component Operation"; }
};

class Decorator : public Component {
protected:
    Component* component;

public:
    Decorator(Component* c) : component(c) {}

    void operation() override { component->operation(); }
};

class ConcreteDecoratorA : public Decorator {
public:
    void operation() override {
        std::cout << "Before A";
        Decorator::operation();
        std::cout << " After A";
    }
};
```
x??

---

#### Command Design Pattern
The Command design pattern encapsulates a request as an object, thereby allowing you to parameterize methods with different requests, delay or queue the execution of requests, and support undoable operations.

:p What is the main purpose of the Command design pattern?
??x
The main purpose of the Command design pattern is to encapsulate a request as an object, thereby allowing for flexible and dynamic command handling. It supports executing commands at any time, queuing them, or even undoing them.

```cpp
class Command {
public:
    virtual void execute() = 0;
};

class ConcreteCommand : public Command {
private:
    std::unique_ptr<Receiver> receiver;

public:
    explicit ConcreteCommand(std::unique_ptr<Receiver> r) : receiver(std::move(r)) {}

    void execute() override { receiver->execute(); }
};

class Receiver {
public:
    void doSomething() { /* Implementation */ }
    void undoSomething() { /* Implementation */ }

    void execute() { doSomething(); }
};
```
x??

---

#### Small String Optimization (SSO)
Small String Optimization (SSO) is an optimization technique used in C++ to store small strings within the object itself instead of dynamically allocating memory. This reduces overhead and improves performance.

:p What is Small String Optimization (SSO)?
??x
Small String Optimization (SSO) is a common optimization for handling short strings by storing them directly inside the `std::string` object rather than on the heap. It avoids the need for dynamic allocation when dealing with small strings, which can improve performance and reduce memory fragmentation.

```cpp
#include <iostream>
#include <string>

int main() {
    std::string str1 = "short";
    // 'str1' is stored in a fixed-size buffer (usually 24-32 bytes)
    
    std::string str2 = new std::string("much longer string");
    // 'str2' uses dynamic memory allocation
}
```
x??

---


---
#### Dynamic Polymorphism Overview
Dynamic polymorphism allows objects of derived classes to replace base class objects. This concept is often realized through virtual functions and inheritance.

In C++, this can be achieved using function overriding, where a derived class provides a specific implementation for a method defined in its base class.

:p What is dynamic polymorphism?
??x
Dynamic polymorphism in C++ refers to the ability of an object created from a derived class to replace an object created from a base class. It enables virtual functions that allow overridden methods in derived classes to be called through pointers or references to base classes. This provides flexibility and reusability by allowing different objects (derived types) to respond to the same method call in different ways.

```cpp
// Example of dynamic polymorphism using inheritance and virtual functions

class Shape {
public:
    virtual void draw() = 0; // Pure virtual function
};

class Circle : public Shape {
public:
    void draw() override { /* Draw a circle */ }
};

Shape* shapePtr;
shapePtr = new Circle(); // Polymorphic behavior
shapePtr->draw();
```

x??
---
#### Enumerated Types in C++
Enumerations are used to define a set of named integer constants. In the provided code, `ShapeType` is an enumeration that defines types for shapes.

:p What is the purpose of using enums (enumerations) in this context?
??x
Enums are used to define named constants within a specified range. Here, `ShapeType` enumerates different shape types like circle and square. This helps maintain type safety by ensuring only valid shape types can be assigned or checked against.

```cpp
enum ShapeType {
    circle,
    square
};
```

x??
---
#### Virtual Destructor in C++
A virtual destructor is a special member function declared as `virtual` that ensures the correct destruction order when deleting an object through a base class pointer. This is crucial for polymorphic behavior to ensure all derived classes are properly destroyed.

:p What is the role of a virtual destructor in dynamic polymorphism?
??x
The role of a virtual destructor in dynamic polymorphism is to ensure proper cleanup of objects, especially when dealing with derived class objects that have been created through base class pointers. If a virtual destructor is not defined, only the destructor of the immediate base class will be called during deletion, potentially leading to memory leaks or resource management issues.

```cpp
class Shape {
public:
    virtual ~Shape() = default; // Virtual default destructor
};
```

x??
---
#### Constructor Initialization in C++
In the provided code, constructors are used for initializing members. The constructor of `Circle` initializes its base class and member variables.

:p How does the constructor initialize a derived class like `Circle`?
??x
The constructor of a derived class, such as `Circle`, can call the base class constructor using the colon (:) followed by the base class name and parameters. Additionally, it initializes its own data members.

```cpp
class Circle : public Shape {
public:
    explicit Circle(double radius) 
        : Shape(circle),  // Base class initialization
          radius_(radius),
          center_{}       // Default initialized point
    {}
};
```

x??
---
#### Member Function Overriding
In C++, a derived class can override the implementation of a member function defined in its base class by declaring it with the `override` keyword. This ensures that the overridden method is correctly implemented.

:p What is overriding and how does it work in the context of dynamic polymorphism?
??x
Overriding allows a derived class to provide a specific implementation for a member function that has been declared in one or more base classes. In the given example, `Circle` overrides the pure virtual function `draw()` from the `Shape` class.

```cpp
class Circle : public Shape {
public:
    void draw() override { /* Draw a circle */ }
};
```

x??
---


#### Direct Dependency on Enumeration
Background context: The problem described is about a design issue where an enumeration directly influences multiple parts of the system, leading to recompilation issues when changes are made. This violates the Open-Closed Principle (OCP), which states that software entities should be open for extension but closed for modification.

:p What is the main issue highlighted in this scenario?
??x
The main issue is that any change to the `ShapeType` enumeration necessitates recompiling all dependent source files, including classes like `Circle`, `Square`, and functions such as `drawAllShapes()`. This violates the OCP because extending functionality (e.g., adding a new shape type) should not require modifying existing code.

```cpp
enum ShapeType {
    circle,
    square,
};
```
x??

#### Violation of Open-Closed Principle
Background context: The example demonstrates how extending an `ShapeType` enumeration leads to recompilation issues across multiple files, violating the OCP. This issue arises because the design is tightly coupled with the enumeration.

:p How does adding a new shape type violate the Open-Closed Principle (OCP)?
??x
Adding a new shape type (`triangle`) requires modifying the `ShapeType` enumeration and updating the `drawAllShapes()` function, which in turn necessitates recompiling all dependent source files. This violates the OCP because classes like `Circle` and `Square` should remain unchanged when extending functionality.

```cpp
enum ShapeType {
    circle,
    square,
    triangle, // New shape type added
};
```
x??

#### Impact of Enumerations on Classes
Background context: The problem illustrates how direct dependencies on enumerations affect class design. Any change to the enumeration impacts multiple classes and functions, leading to recompilation issues.

:p How does a change in `ShapeType` impact derived classes?
??x
A change in the `ShapeType` enumeration impacts derived classes such as `Circle` and `Square`, which depend on the base class `Shape`. Specifically, adding or modifying enumerators requires updating not only the switch statement but also the classes that use these enumerators directly. This leads to recompilation of all dependent files.

```cpp
class Circle : public Shape {
public:
    static constexpr ShapeType getType() { return circle; }
};
```
x??

#### Refactoring for Better Design
Background context: The solution involves refactoring to decouple the classes from the `ShapeType` enumeration, ensuring that extending functionality does not require recompiling dependent files.

:p What is a recommended approach to avoid recompilation issues when adding new shape types?
??x
A recommended approach is to use factory methods or polymorphism instead of direct dependency on enumerations. For example, using a factory method can create shapes based on their type without modifying existing classes. This ensures that extending the system with new shape types does not require recompiling dependent files.

```cpp
class ShapeFactory {
public:
    static std::unique_ptr<Shape> createShape(ShapeType type) {
        switch (type) {
            case circle: return std::make_unique<Circle>();
            case square: return std::make_unique<Square>();
            // Add more cases for new shapes
            default: throw std::invalid_argument("Invalid shape type");
        }
    }
};
```
x??

#### Open-Closed Principle and Extension
Background context: The OCP emphasizes that software entities should be open for extension but closed for modification. This means adding functionality to existing classes should not require changing their source code.

:p How does the original design violate the OCP?
??x
The original design violates the OCP because extending the system (e.g., adding a new shape type) requires modifying the `ShapeType` enumeration and the switch statement in the `drawAllShapes()` function. This means that existing classes like `Circle` and `Square` must be altered, leading to recompilation issues.

```cpp
void drawAllShapes(std::vector<std::unique_ptr<Shape>> const& shapes) {
    for (auto const& shape : shapes) {
        switch (shape->getType()) {
            case circle: 
                draw(static_cast<Circle const&>(*shape));
                break;
```
x??

---

