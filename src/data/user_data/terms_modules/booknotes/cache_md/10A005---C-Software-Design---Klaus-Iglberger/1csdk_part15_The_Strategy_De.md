# High-Quality Flashcards: 10A005---C-Software-Design---Klaus-Iglberger_processed (Part 15)


**Starting Chapter:** The Strategy Design Pattern Explained

---


#### Strategy Design Pattern Intent
Background context explaining the intent of the Strategy design pattern. The pattern aims to define a family of algorithms, encapsulate each one, and make them interchangeable. This allows for changing how different shapes are drawn without modifying existing code.

:p What is the main goal of the Strategy design pattern?
??x
The main goal of the Strategy design pattern is to enable the algorithm to vary independently from its clients by encapsulating each algorithm as a separate class that can be swapped out at runtime. This promotes flexibility and adheres to the Single Responsibility Principle (SRP) and Open-Closed Principle (OCP).

```cpp
// Example pseudo-code for implementing part of the Strategy pattern in C++
class DrawStrategy {
public:
    virtual ~DrawStrategy() = default;
    virtual void draw(const Circle& circle, /*some arguments*/) const = 0;
    virtual void draw(const Square& square, /*some arguments*/) const = 0;
};
```
x??

---

#### UML Representation of Strategy Design Pattern
Explanation about the UML diagram for the Strategy design pattern. It shows a base class `DrawStrategy` with pure virtual functions for drawing different shapes.

:p What does the UML diagram typically show for the Strategy design pattern?
??x
The UML diagram for the Strategy design pattern typically illustrates a base class named `DrawStrategy` that defines pure virtual functions for drawing specific types of shapes, such as circles and squares. This separation allows for interchangeable strategies without changing the shape classes.

```uml
Class "DrawStrategy" {
    + draw(circle: Circle, /*some arguments*/) const = 0;
    + draw(square: Square, /*some arguments*/) const = 0;
}

Class "Circle"
Class "Square"

Interface "DrawStrategy" <<base>>
```
x??

---

#### DrawStrategy Base Class Implementation
Explanation about the implementation of the `DrawStrategy` base class. It includes a virtual destructor and pure virtual functions for drawing shapes.

:p What is included in the `DrawStrategy` base class?
??x
The `DrawStrategy` base class includes a virtual destructor to ensure proper cleanup when derived classes are destroyed, and two pure virtual functions: `draw(const Circle&, /*some arguments*/) const` and `draw(const Square&, /*some arguments*/) const`. These functions are meant to be implemented by derived classes to provide specific drawing logic.

```cpp
// Example implementation of the DrawStrategy base class in C++
class DrawStrategy {
public:
    virtual ~DrawStrategy() = default; // Virtual destructor for proper cleanup

    virtual void draw(const Circle& circle, /*some arguments*/) const = 0;
    virtual void draw(const Square& square, /*some arguments*/) const = 0;
};
```
x??

---

#### Shape Class and DrawStrategy Usage
Explanation about how the `Shape` class and `DrawStrategy` are used in practice. The `Shape` class remains unchanged but uses a pointer to `DrawStrategy` for drawing.

:p How does the `Shape` class utilize the `DrawStrategy`?
??x
The `Shape` class utilizes the `DrawStrategy` by storing a `std::unique_ptr<DrawStrategy>` member variable that points to an instance of a derived `DrawStrategy` class. This allows each shape (e.g., Circle, Square) to use its own drawing strategy without altering the `Shape` base class.

```cpp
// Example usage in the Shape and Circle classes in C++
class Shape {
public:
    virtual ~Shape() = default;
    virtual void draw(/*some arguments*/) const = 0; // Pure virtual function
};

class Circle : public Shape {
public:
    explicit Circle(double radius, std::unique_ptr<DrawStrategy> drawer)
        : radius_(radius), drawer_(std::move(drawer)) {}

    void draw(const std::string& /*some arguments*/) const override {
        drawer_->draw(*this, /*some arguments*/);
    }

private:
    double radius_;
    std::unique_ptr<DrawStrategy> drawer_;
};
```
x??

---

#### Benefits of the Strategy Design Pattern
Explanation about the benefits of using the Strategy design pattern. It allows for changing drawing algorithms without modifying existing classes and enables new drawing strategies to be easily added.

:p What are the main advantages of the Strategy design pattern?
??x
The main advantages of the Strategy design pattern include:
1. **Encapsulation**: The drawing logic is encapsulated within separate `DrawStrategy` classes.
2. **Flexibility**: Drawing algorithms can be changed independently without modifying existing code.
3. **Open-Closed Principle (OCP)**: New strategies can be introduced without altering existing code.
4. **SRP Compliance**: Each class has a single responsibility, making the system more maintainable.

```cpp
// Example of adding a new drawing strategy in C++
class CustomDrawStrategy : public DrawStrategy {
public:
    void draw(const Circle& circle, /*some arguments*/) const override {
        // Custom drawing logic for circles
    }

    void draw(const Square& square, /*some arguments*/) const override {
        // Custom drawing logic for squares
    }
};
```
x??

---


#### Dependency Injection through DrawStrategy

Background context: The current design allows for changing drawing behavior by providing a unique_ptr to a DrawStrategy. This is done via dependency injection, where objects are not created within a class but are passed as arguments.

:p How does the DrawStrategy allow for flexible drawing behaviors?
??x
The DrawStrategy pattern enables flexible drawing behaviors by allowing different strategies to be injected at runtime. This means you can easily switch between different drawing methods without changing the Shape classes directly. Each shape (Circle, Square) holds a unique_ptr to its specific DrawStrategy implementation.

```cpp
class Circle : public Shape {
public:
    explicit Circle(double radius, std::unique_ptr<DrawCircleStrategy> drawer)
        : radius_(radius), drawer_(std::move(drawer)) {}

    void draw(/*some arguments*/) const override {
        drawer_->draw(*this, /*some arguments*/);
    }

private:
    double radius_;
    std::unique_ptr<DrawCircleStrategy> drawer_;
};
```

x??

---

#### DrawStrategy for New Shapes

Background context: The current design introduces new DrawStrategies for each shape type to avoid coupling and allow easy addition of new shapes. However, this approach leads to cyclic dependencies between shapes and their strategies.

:p Why is it problematic to add a new shape like Triangle in the current implementation?
??x
Adding a new shape such as Triangle would require modifying the existing base class DrawStrategy, which affects all other shapes. This violates the Interface Segregation Principle (ISP), making the system less modular and harder to extend. Each time a new shape is added, every shape’s implementation needs recompilation due to their interdependencies.

```cpp
// Example of adding Triangle
class DrawTriangleStrategy {
public:
    virtual ~DrawTriangleStrategy() = default;
    virtual void draw(Triangle const& triangle, /*some arguments*/) const = 0;
};

class Triangle : public Shape {
public:
    explicit Triangle(double side, std::unique_ptr<DrawTriangleStrategy> drawer)
        : side_(side), drawer_(std::move(drawer)) {}

    void draw(/*some arguments*/) const override {
        drawer_->draw(*this, /*some arguments*/);
    }

private:
    double side_;
    std::unique_ptr<DrawTriangleStrategy> drawer_;
};
```

x??

---

#### Visitor Pattern Consideration

Background context: The current implementation of DrawStrategies resembles the Visitor pattern but falls short because it cannot easily add other operations or types. It also does not fulfill the Strategy design pattern's requirement to separate concerns.

:p Why is the current DrawStrategy implementation not a true Strategy pattern?
??x
The current DrawStrategy implementation is not a proper Strategy pattern because it tightly couples different shapes with their drawing strategies, requiring modifications to all shape classes whenever a new strategy is introduced. The Strategy pattern requires each concrete strategy class (DrawCircleStrategy, DrawSquareStrategy) to be separate and independent of the implementing class (Circle, Square).

```cpp
class DrawCircleStrategy {
public:
    virtual ~DrawCircleStrategy() = default;
    virtual void draw(Circle const& circle, /*some arguments*/) const = 0;
};

class Circle : public Shape {
public:
    explicit Circle(double radius, std::unique_ptr<DrawCircleStrategy> drawer)
        : radius_(radius), drawer_(std::move(drawer)) {}

    void draw(/*some arguments*/) const override {
        drawer_->draw(*this, /*some arguments*/);
    }

private:
    double radius_;
    std::unique_ptr<DrawCircleStrategy> drawer_;
};
```

x??

---

#### Template Strategy Class

Background context: To address the issues with cyclic dependencies and improve code reuse, using a template DrawStrategy class can be considered. This approach avoids the need for separate classes for each shape.

:p How does a template-based DrawStrategy help in this scenario?
??x
Using a template-based DrawStrategy helps by lifting the Strategy implementation into a higher level of abstraction. This reduces redundancy and allows easy extension without altering existing shape classes. Each concrete strategy can be specialized, adhering to the DRY (Don’t Repeat Yourself) principle.

```cpp
template<typename T>
class DrawStrategy {
public:
    virtual ~DrawStrategy() = default;
    virtual void draw(T const&) const = 0;
};

class OpenGLCircleStrategy : public DrawStrategy<Circle> {
public:
    explicit OpenGLCircleStrategy(/* Drawing related arguments */);
    void draw(Circle const& circle, /*...*/) const override;

private:
    // Drawing related data members
};
```

x??

---


#### Strategy Design Pattern: Overview
The Strategy design pattern is a behavioral design pattern that enables you to define a family of algorithms, encapsulate each one, and make them interchangeable. This pattern lets the algorithm vary independently from clients that use it.

Background context explaining the concept:
- The Strategy pattern allows for different behaviors to be swapped out at runtime.
- It is useful when you have multiple ways to implement an operation or function, and these need to be chosen at runtime based on certain conditions.

:p What is the main purpose of the Strategy design pattern?
??x
The main purpose of the Strategy design pattern is to decouple algorithmic behaviors from the entities that use them. This enables users to select the behavior dynamically without changing the object's structure.
x??

---

#### Strategy Design Pattern: Code Example
Background context explaining the concept:
- The provided code shows how to implement a strategy for drawing shapes using OpenGL.

:p How can you integrate multiple drawing strategies in your application?
??x
You can integrate multiple drawing strategies by creating unique pointers for each strategy and associating them with their respective shape objects. This allows you to change the drawing behavior of any shape at runtime without modifying its core functionality.
```cpp
#include <Circle.h>
#include <Square.h>
#include <OpenGLCircleStrategy.h>
#include <OpenGLSquareStrategy.h>
#include <memory>
#include <vector>

int main() {
    using Shapes = std::vector<std::unique_ptr<Shape>>;

    Shapes shapes{};

    // Creating some shapes, each one equipped with the corresponding OpenGL drawing strategy
    shapes.emplace_back(
        std::make_unique<Circle>(2.3, std::make_unique<OpenGLCircleStrategy>(/*...red...*/))
    );
    shapes.emplace_back(
        std::make_unique<Square>(1.2, std::make_unique<OpenGLSquareStrategy>(/*...green...*/))
    );
    shapes.emplace_back(
        std::make_unique<Circle>(4.1, std::make_unique<OpenGLCircleStrategy>(/*...blue...*/))
    );

    // Drawing all shapes
    for (auto const& shape : shapes) {
        shape->draw(/*some arguments*/);
    }

    return EXIT_SUCCESS;
}
```
x??

---

#### Strategy Design Pattern: Comparison with Visitor Pattern
Background context explaining the concept:
- The text compares and contrasts the Strategy pattern with the Visitor pattern.

:p What is the main difference between the Strategy and Visitor design patterns?
??x
The main difference between the Strategy and Visitor design patterns lies in their focus:

- **Strategy**: Allows adding new operations easily but makes it difficult to add new shape types.
- **Visitor**: Enables easy addition of new shapes while making it challenging to add new operations.

In the context provided, the Strategy pattern is used for drawing operations, while the Visitor pattern would be more suitable if you needed to perform different operations on multiple objects without changing their structure.
x??

---

#### Strategy Design Pattern: Strengths and Weaknesses
Background context explaining the concept:
- The text discusses both the advantages and disadvantages of using the Strategy design pattern.

:p What are some potential downsides to using the Strategy design pattern?
??x
Some potential downsides include:

1. **Operation Implementation Still Part of Concrete Type**: Operations remain part of specific types, which limits adding new operations.
2. **Large Refactoring Required if Not Identified Early**: Identifying variation points early can prevent large refactors later on, but implementing everything with Strategy upfront could lead to overengineering.
3. **Performance Impact Using Base Classes**: Performance might be affected due to additional runtime indirection and manual memory management.
4. **Single Strategy for Single Operation**: A single strategy should handle one operation or a small group of cohesive functions; otherwise, it violates the SRP (Single Responsibility Principle).

These issues highlight the importance of carefully considering when and how to apply the Strategy pattern based on your specific use case.
x??

---

#### Strategy Design Pattern: Multiple Strategies
Background context explaining the concept:
- The text discusses scenarios where multiple strategies are needed for different operations.

:p How can you implement multiple strategies for different operations in the same class?
??x
You can implement multiple strategies by creating separate strategy classes for each operation and then using dependency injection or template-based approaches to switch between them. For example, adding a `serialize` function:

```cpp
class Circle : public Shape {
public:
    explicit Circle(
        double radius,
        std::unique_ptr<DrawCircleStrategy> drawer,
        std::unique_ptr<SerializeCircleStrategy> serializer
        // potentially more strategy-related arguments
    )
        : radius_(radius),
          drawer_(std::move(drawer)),
          serializer_(std::move(serializer))
    {
        // Checking that the given radius is valid and that the given std::unique_ptrs are not nullptrs
    }

    void draw(/*some arguments*/) const override;
};
```

Here, `Circle` can use different strategies for drawing and serializing.
x??

---

#### Strategy Design Pattern: Performance Considerations
Background context explaining the concept:
- The text mentions performance impacts of using Strategy with base classes.

:p What are potential performance issues when implementing Strategy patterns with base classes?
??x
Potential performance issues include:

1. **Runtime Indirection**: Additional virtual function calls introduce runtime overhead.
2. **Memory Fragmentation and Manual Allocations**: Frequent allocations can lead to memory fragmentation, especially if `std::make_unique()` is used extensively.
3. **Indirection Due to Pointers**: Multiple pointers increase the number of indirections in your code.

These issues can be mitigated by using templates instead of base classes, which eliminate some of these overheads but require careful consideration based on specific use cases.
x??

---

