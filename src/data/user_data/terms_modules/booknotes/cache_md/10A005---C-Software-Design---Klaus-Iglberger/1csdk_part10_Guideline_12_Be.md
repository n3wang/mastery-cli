# High-Quality Flashcards: 10A005---C-Software-Design---Klaus-Iglberger_processed (Part 10)


**Starting Chapter:** Guideline 12 Beware of Design Pattern Misconceptions

---


---
#### Design Pattern vs Implementation Pattern
Background context: The text emphasizes that design patterns are proven, named solutions with a specific intent to decouple software entities. In contrast, implementation patterns like `std::make_unique()` are more specific and less widely applicable.
:p What is the difference between a design pattern and an implementation pattern?
??x
Design patterns are broader, reusable solutions for common problems in software design that help manage dependencies and interactions between different parts of the codebase. Implementation patterns like `std::make_unique()` are specific techniques used to implement those patterns but do not capture the full intent or abstraction introduced by a design pattern.
```cpp
// Example of std::make_unique()
std::unique_ptr<int> ptr = std::make_unique<int>(42);
```
x??

---
#### Proven and Named Solution
Background context: The text stresses that for a solution to be considered a design pattern, it must have demonstrated its value multiple times in different contexts before being recognized as such. This means the solution is well-established and widely accepted.
:p What does it mean when a solution is referred to as a "proven" design pattern?
??x
A proven design pattern signifies that the solution has been tested and validated in various scenarios over time, showing consistent reliability and effectiveness. It implies the pattern has been successfully applied multiple times across different projects or codebases.
x??

---
#### Abstraction through Design Patterns
Background context: Design patterns introduce abstractions to help manage dependencies between software entities, making it easier to maintain and modify the codebase without affecting other parts of the system.
:p How do design patterns achieve decoupling in software development?
??x
Design patterns achieve decoupling by introducing abstractions that encapsulate complex behaviors or interactions. This means that specific components of a system can be designed to depend on these abstractions rather than concrete implementations, allowing changes in one part of the system to not affect others.
```cpp
// Example: Using an interface for dependency injection
class Service {
public:
    virtual void performAction() = 0;
};

class ConcreteService : public Service {
public:
    void performAction() override {
        // Perform specific action
    }
};
```
x??

---
#### Managing Software Design
Background context: The text suggests that "Design" should be understood as the art of managing dependencies and decoupling. This emphasizes the importance of considering how different parts of a system interact and how to make those interactions more modular.
:p How does understanding design in software development contribute to maintaining a codebase?
??x
Understanding design in software development helps maintain a clean, modular, and scalable architecture by focusing on how components interact with each other. By managing dependencies effectively, developers can create systems that are easier to test, debug, and modify over time.
x??

---
#### Purpose of Design Patterns
Background context: The purpose of design patterns is to provide proven solutions that help manage dependencies and interactions between software entities. These patterns aim to make the codebase more flexible and maintainable by introducing abstractions.
:p What is the primary goal of using design patterns in software development?
??x
The primary goal of using design patterns is to enhance the flexibility, readability, and maintainability of the codebase by providing proven solutions that abstract common problems. This helps manage dependencies between different parts of a system more effectively.
x??

---


#### Design Patterns Are Not a Goal
Background context: The text emphasizes that design patterns should not be treated as an end goal but rather as a means to achieve better software design. Overuse of design patterns can increase code complexity and reduce comprehensibility, leading to potential problems for other developers.

:p Why are design patterns not considered a goal?
??x
Design patterns are tools to solve specific problems in software design. They should be used judiciously based on the problem at hand. Using too many or unnecessary design patterns can complicate the code and reduce its readability. The correct approach is to use design patterns only when they effectively help in resolving dependencies and creating a better structure.
x??

---
#### Design Patterns Are Not About Implementation Details
Background context: The text explains that design patterns are not limited to specific language implementations but are more about providing a high-level abstraction for solving recurring problems.

:p How do design patterns relate to implementation details?
??x
Design patterns focus on the structural properties and intent of solutions rather than the specific implementation. For example, the Strategy pattern can be implemented in various ways without being tied to any particular programming language or library.
```cpp
// Example of a simple strategy interface
class DrawStrategy {
public:
    virtual void draw() = 0;
};

// Concrete strategy: OpenGL-based drawing
class OpenGLStrategy : public DrawStrategy {
public:
    void draw() override {
        // OpenGL-specific code
    }
};
```
x??

---
#### Strategy Design Pattern Application to Drawing Circles
Background context: The text illustrates the use of the Strategy design pattern in a scenario where different ways of drawing circles need to be implemented without tightly coupling the Circle class with specific graphics libraries.

:p How can the Strategy pattern improve the flexibility of drawing functionality?
??x
The Strategy pattern allows for interchangeable behavior by abstracting away specific implementations. In this case, the `Circle` class does not directly implement the `draw()` method but uses an instance of a `DrawStrategy`. This approach decouples the Circle from any specific graphics library and makes it easier to switch between different drawing strategies.
```cpp
// Strategy pattern example
class DrawStrategy {
public:
    virtual void draw() = 0;
};

class OpenGLStrategy : public DrawStrategy {
public:
    void draw() override {
        // OpenGL-specific code
    }
};

class Circle {
private:
    double radius_;
    std::unique_ptr<DrawStrategy> strategy_;

public:
    Circle(double radius, std::unique_ptr<DrawStrategy> strategy) 
        : radius_(radius), strategy_(std::move(strategy)) {}

    void draw() {
        strategy_->draw();
    }
};

// Example usage
int main() {
    auto strategy = std::make_unique<OpenGLStrategy>();
    Circle circle(4.2, std::move(strategy));
    circle.draw();
    return 0;
}
```
x??

---


#### Strategy Design Pattern Implementation Using Templates

Background context: The Strategy design pattern allows for defining a family of algorithms, encapsulating each one as an object and making them interchangeable. In this implementation, the template parameter is used to inject the specific algorithm (draw strategy) at compile time rather than runtime.

:p How does the template-based Strategy design pattern work in the Circle class?
??x
The template-based Strategy design pattern works by having a `Circle` class that accepts a type of `DrawStrategy` as a template argument. At compile-time, this type determines how the circle is drawn. This means the Circle class itself remains decoupled from any specific implementation details but must be recompiled if the DrawStrategy changes.

```cpp
template<typename DrawStrategy>
class Circle {
public:
    void draw(/*...*/);
};
```

x??

---

#### std::accumulate Function Template

Background context: The `std::accumulate` function template in the Standard Library allows for performing reduction operations on a range of elements. By default, it sums up all the elements, but this behavior can be customized by providing an additional argument that specifies how to combine the elements.

:p How does `std::accumulate` support customization?
??x
`std::accumulate` supports customization through its fourth template parameter, which is a callable object (function pointer or function object) used for combining two values. This parameter allows users to specify any reduction operation, making it flexible and powerful.

```cpp
#include <numeric>
#include <vector>

std::vector<int> v{1, 2, 3, 4, 5};

// Default summing up:
auto const sum = std::accumulate(begin(v), end(v), int{0});

// Using std::plus for addition:
auto const sum_plus = std::accumulate(begin(v), end(v), int{0}, std::plus<>{});

// Using std::multiplies for multiplication:
auto const product = std::accumulate(begin(v), end(v), int{1}, std::multiplies<>{}); 
```

x??

---

#### Custom Allocators in STL Containers

Background context: STL containers like `std::vector` and `std::set` provide the opportunity to specify a custom allocator via template arguments. This allows users to control how memory is allocated for elements, making it possible to optimize performance or handle special requirements.

:p How does specifying an allocator with STL containers work?
??x
Specifying an allocator with STL containers works by providing the allocator as one of the template parameters. The container uses this allocator to manage memory requests. This allows users to define their own algorithms for memory allocation and deallocation, making it flexible and powerful.

```cpp
#include <vector>
#include <memory>

// Default std::allocator:
std::vector<int> v1{1, 2, 3, 4, 5};

// Custom allocator example (using `std::pmr::polymorphic_allocator`):
struct MyAlloc {
    // Define custom allocation and deallocation logic here
};

std::vector<int, MyAlloc> v2{1, 2, 3, 4, 5};
```

x??

--- 

#### Design Patterns Not Limited to Object-Oriented Programming or Dynamic Polymorphism

Background context: The example of `std::accumulate` demonstrates that design patterns like the Strategy pattern can be implemented using static polymorphism (templates) rather than dynamic polymorphism. This shows that design patterns are not tied to a specific paradigm and can be applied in various contexts.

:p Why is the Strategy design pattern not limited to object-oriented programming or dynamic polymorphism?
??x
The Strategy design pattern, as demonstrated with `std::accumulate`, shows that it can work using static polymorphism (templates) rather than dynamic polymorphism. The template-based approach allows for different strategies to be injected at compile time without requiring virtual functions or a base class hierarchy.

```cpp
template<typename DrawStrategy>
class Circle {
public:
    void draw(/*...*/);
};

// Example usage:
Circle<SomeDrawStrategy> c;
c.draw();
```

x??

--- 

#### Design Pattern Misconceptions

Background context: This section emphasizes that design patterns are tools to solve specific problems and should not be considered a goal in themselves. They can be used in various programming paradigms and languages, not just object-oriented or dynamic polymorphism.

:p Why is it important to recognize that design patterns are not limited to certain implementations?
??x
It is important to recognize that design patterns such as the Strategy pattern can be implemented using different mechanisms (templates vs. virtual functions) and are not tied to specific paradigms like OOP or language features like dynamic polymorphism. Understanding this helps in applying them effectively across various contexts.

```cpp
// Example of a template-based strategy implementation:
template<typename DrawStrategy>
class Circle {
public:
    void draw(/*...*/);
};
```

x??

