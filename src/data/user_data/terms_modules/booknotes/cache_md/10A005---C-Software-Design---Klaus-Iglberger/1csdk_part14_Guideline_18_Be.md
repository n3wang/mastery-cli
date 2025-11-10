# High-Quality Flashcards: 10A005---C-Software-Design---Klaus-Iglberger_processed (Part 14)


**Starting Chapter:** Guideline 18 Beware the Performance of Acyclic Visitor

---


#### std::variant for Visitor Pattern

This guideline discusses using `std::variant` to implement a Visitor pattern, emphasizing its non-intrusive nature and advantages over traditional object-oriented Visitor solutions.

:p How does `std::variant` help in implementing the Visitor design pattern?

??x
`std::variant` allows creating abstractions on the fly without modifying existing classes. It's used to represent values that can be one of a set of types, which is beneficial for the Visitor design pattern where we want to perform operations on different types dynamically.

Here’s how you might use `std::variant` in C++:
```cpp
#include <variant>

// Example shape and visitor structures using std::variant

struct Circle {};
struct Square {};

using Shape = std::variant<Circle, Square>;

class Visitor {
public:
    virtual void visit(Circle const&) {}
    virtual void visit(Square const&) {}

    // You can use `std::visit` to apply the appropriate function based on the shape type.
};

// Usage example
void processShape(Shape shape, Visitor& visitor) {
    std::visit(visitor, shape);
}
```

x??

---

#### Acyclic Visitor Pattern

The Acyclic Visitor pattern addresses the cyclic dependency issue in the traditional Visitor design pattern by breaking it. It uses abstract base classes for visitors and specific operation classes to avoid circular dependencies.

:p What is the key difference between the traditional GoF Visitor and the Acyclic Visitor?

??x
In the Acyclic Visitor, the `Visitor` class is split into an `AbstractVisitor` and visitor-specific classes (e.g., `CircleVisitor`, `SquareVisitor`). These specific visitors inherit from both the abstract base visitor class and a shape-specific visitor class. This structure breaks the cyclic dependency problem.

Here’s how it might be structured:
```cpp
//---- <AbstractVisitor.h> ----------------
class AbstractVisitor {
public:
    virtual ~AbstractVisitor() = default;
};

//---- <CircleVisitor.h> ----------------
#include "AbstractVisitor.h"

class CircleVisitor : public AbstractVisitor {
public:
    void visit(Circle const&) {}
};

//---- <SquareVisitor.h> ----------------
#include "AbstractVisitor.h"

class SquareVisitor : public AbstractVisitor {
public:
    void visit(Square const&) {}
};
```

x??

---

#### Performance Considerations in Acyclic Visitor

The Acyclic Visitor pattern helps with cyclic dependencies but might have performance implications due to the overhead of multiple base classes and virtual functions.

:p What are some key differences between the traditional Visitor and the Acyclic Visitor design patterns?

??x
Key differences include:
- **Dependencies**: Traditional Visitor has a cyclic dependency (Visitor depends on Shapes, Shapes depend on Visitor). The Acyclic Visitor breaks this cycle by using abstract visitor classes.
- **Flexibility**: In the Acyclic Visitor, visitors can opt-in or out of specific operations based on their inheritance from shape-specific visitor classes.

Example of an operation that supports circles but not squares:
```cpp
class Operation {
public:
    void execute(CircleVisitor& circleVisitor) {
        std::visit(circleVisitor, shape); // Only CircleVisitor will be called.
    }

    void execute(SquareVisitor& squareVisitor) {} // Optional: Not implemented here.
};
```

x??

---


#### Team Dynamics and Office Politics

Background context: This excerpt discusses the potential impact of a proposed design decision on team dynamics. The author suggests that while an individual might not get angry about the change, it could lead to exclusion from social events like barbecues. 

:p How might a team member react to a design decision that they are neutral or ambivalent about?
??x
A team member who is neutral or ambivalent about a design decision might experience some unhappiness but likely would not get angry. However, there is a risk of being excluded from social events such as the next team barbecue.

??x
The potential impact on team cohesion and individual relationships due to minor changes in project dynamics.
```java
// Example code for a hypothetical scenario where a new design decision might affect team interactions
public class TeamDecision {
    public void updateBarbecueList(boolean includePerson) {
        // Logic to add or remove a person from the barbecue list based on their reaction to a decision
        if (!includePerson) {
            System.out.println("Sorry, you're not invited to this barbecue!");
        } else {
            System.out.println("You're all set for the team barbecue!");
        }
    }
}
```
x??

---

#### Design Patterns: Elements of Reusable Object-Oriented Software

Background context: This excerpt mentions a book by Erich Gamma et al. on design patterns, which is a key reference in software development. The book covers various patterns used to solve common problems in object-oriented programming.

:p What does the Design Patterns: Elements of Reusable Object-Oriented Software book cover?
??x
The Design Patterns: Elements of Reusable Object-Oriented Software by Erich Gamma et al. is a seminal work that provides solutions and patterns for solving common design issues in software development, specifically focusing on object-oriented approaches.

??x
It covers various design patterns such as the Visitor pattern, which is discussed further in this context.
```java
// Example of using the Visitor pattern (pseudocode)
public class Element {
    public void accept(Visitor v) { 
        v.visit(this); // Delegate to the visitor's visit method with the element object
    }
}

class ConcreteElement extends Element {
    // Concrete implementation details
}
```
x??

---

#### Naming Conventions in Design Patterns

Background context: This excerpt discusses naming conventions, specifically mentioning the `accept()` method from the Visitor pattern. It advises against renaming unless absolutely necessary to avoid confusion.

:p What is the significance of using a design pattern's name for methods?
??x
Using the exact names from established design patterns, such as `accept()`, helps maintain consistency and readability in code. This practice makes it easier for other developers familiar with these patterns to understand the intent behind your implementation without needing extensive documentation.

??x
Renaming can lead to confusion if the new name does not clearly convey the same purpose.
```java
// Example of using accept() method from Visitor pattern (pseudocode)
public class ConcreteElement {
    public void accept(Visitor v) {
        // Implementation of the visitor's operation on this element
        v.visit(this);
    }
}
```
x??

---

#### Design for Change

Background context: The excerpt emphasizes the importance of designing code to be easily changeable. This principle, known as "Don't Repeat Yourself" (DRY), suggests that repeated logic should be extracted into a single function or class.

:p Why is it important to design with change in mind?
??x
Designing for change ensures that when modifications are needed, the changes can be made more efficiently and reliably. By encapsulating common code in reusable functions or classes, you minimize the risk of introducing bugs through multiple updates across different parts of the codebase.

??x
It promotes maintainability by centralizing logic.
```java
// Example of DRY principle (pseudocode)
public class Calculator {
    public int add(int a, int b) {
        return a + b;
    }

    // Reusing add() instead of duplicating its implementation
    public int multiplyByThree(int num) {
        return this.add(this.add(num, num), num);
    }
}
```
x??

---

#### Random Number Generation and Performance

Background context: The excerpt mentions the use of random number generation in performance tests. It notes that while creating random numbers is not particularly expensive on certain machines, it can still impact performance under certain conditions.

:p Why might std::make_unique() be preferable to special-purpose allocation schemes?
??x
std::make_unique() encapsulates a call to `new`, making memory management safer and more consistent across different parts of the program. While it may introduce some overhead compared to specialized allocators, the added safety features often outweigh this cost.

??x
Memory fragmentation can be reduced with std::make_unique(), but special allocators might offer performance benefits in specific scenarios.
```cpp
// Example using std::make_unique (C++)
#include <memory>

std::unique_ptr<int> ptr = std::make_unique<int>(10);
```
x??

---

#### Open Source Implementations of Variant

Background context: The excerpt discusses alternative open-source implementations of the `variant` type, such as those provided by Boost and Abseil. These alternatives can offer additional insights into how to implement similar types.

:p What are some alternative implementations of variant?
??x
Some alternative implementations of variant include those provided by libraries like Boost (which offers two variants), Abseil, and the implementation by Michael Park. Exploring these can provide valuable insights into different design approaches.

??x
Understanding multiple implementations can help choose the best fit for a specific project.
```cpp
// Example using Boost's variant (C++)
#include <boost/variant.hpp>

using MyVariant = boost::variant<int, std::string>;
```
x??

---

#### Design Patterns: Bridge and Acyclic Visitor

Background context: This excerpt introduces two more design patterns—Bridge and Acyclic Visitor. It mentions that the author will cover the Bridge pattern in detail but not the Acyclic Visitor due to limited space.

:p What is another design pattern mentioned besides Proxy?
??x
Another design pattern mentioned, besides Proxy, is the Bridge pattern. The Acyclic Visitor pattern from Robert C. Martin’s book Agile Software Development: Principles, Patterns, and Practices is also referenced, though it will not be covered in this text due to space constraints.

??x
The Bridge pattern focuses on separating an object's interface from its implementation.
```java
// Example of the Bridge pattern (pseudocode)
public abstract class Implementor {
    public void operation() { }
}

public class ConcreteImplementorA extends Implementor {
    @Override
    public void operation() {
        // Concrete implementation A
    }
}
```
x??

---

#### Ownership and Abstractions

Background context: This excerpt discusses the importance of understanding ownership in abstractions, differentiating between high-level and low-level abstractions.

:p What does the term "high level" mean in relation to abstraction?
??x
In this context, "high level" refers to abstractions that are more abstract and less focused on specific details. They provide a broader view or higher-level perspective of the system or problem domain.

??x
High-level abstractions typically offer simpler interfaces but might hide implementation details.
```java
// Example of high-level abstraction (pseudocode)
public interface DataProcessor {
    void process();
}
```
x??

---


#### Strategy Design Pattern Overview
The Strategy design pattern is a behavioral design pattern that enables selecting and using a family of algorithms dynamically. The pattern allows you to encapsulate each algorithm behind an interface or abstract class, making it easy to change the behavior at runtime without modifying client code.

:p What is the purpose of the Strategy design pattern?
??x
The Strategy design pattern provides a flexible way to define a set of behaviors that can be used interchangeably. It helps in isolating how things are done by encapsulating algorithms behind an interface, making it easier to switch between different strategies at runtime without altering the client code.

For example, consider implementing drawing behavior for shapes where you might want to change the rendering engine (e.g., from OpenGL to DirectX) without changing existing code.
??x
---

#### Inheritance vs. Composition in C++
Inheritance is a powerful mechanism that allows classes to inherit properties and behaviors from parent classes, but it can lead to tight coupling between classes and may not always be flexible.

Composition, on the other hand, involves creating objects out of smaller parts. This approach promotes loose coupling and reusability.

:p Why might you prefer composition over inheritance?
??x
You might prefer composition over inheritance when you want more flexibility in changing how objects are constructed or when you need to avoid tight coupling between classes. Composition allows for easier maintenance and extension of the codebase since components can be replaced or extended without affecting other parts of the system.

For example, instead of inheriting from a base class that has many responsibilities, you might prefer to have a composition relationship where each object holds references to objects that perform specific tasks.
??x
---

#### Command Design Pattern Overview
The Command design pattern is another behavioral pattern used to encapsulate a request as an object. This allows you to parameterize methods with different requests, queue or log requests, and support undoable operations.

:p What does the Command design pattern enable?
??x
The Command design pattern enables you to parameterize methods with different requests by encapsulating them into objects (commands). It supports various actions like queuing commands for later execution, logging, undo/redo capabilities, and more.

For example, you can create a `DrawCommand` that contains the instructions needed to draw a shape. This command can be executed immediately or stored in a history stack for future use.
??x
---

#### Guideline 21: Use Command to Isolate What Things Are Done
The Command pattern helps in isolating what things are done by encapsulating actions into objects. Each command object represents an operation that can be performed and can be parameterized with data.

:p How does the Command design pattern help isolate actions?
??x
By using the Command pattern, you can encapsulate operations (actions) as separate objects, which makes it easier to manage and manipulate these actions independently of other parts of your application. This allows for better decoupling between the sender of a command and the receiver.

For example, in our 2D graphics tool, each shape's drawing operation could be represented by a `DrawCommand` object that encapsulates the necessary parameters and logic.
??x
---

#### Value Semantics vs. Reference Semantics
Value semantics refers to objects whose values are immutable or can be copied without affecting the original value. Reference semantics involves objects where changing one reference also changes the original.

:p Why might you prefer value semantics over reference semantics?
??x
You might prefer value semantics when you want to ensure that an object's state cannot be accidentally modified by other parts of your program, which can lead to more predictable and safer code. Value semantics are particularly useful in situations where immutability is desired or necessary.

For example, in C++, using `std::string` instead of `char*` often leads to better safety because string operations do not modify the original object but return new objects with updated values.
??x
---

#### Applying Value Semantics to Strategy and Command Patterns
By applying value semantics, you can implement the Strategy and Command patterns more effectively. For instance, using `std::function` in C++ allows for flexible and safe handling of functions as first-class citizens.

:p How can you apply value semantics to the Strategy pattern?
??x
You can apply value semantics to the Strategy pattern by implementing strategies as `std::function<void()>`, which are essentially function objects that encapsulate a piece of behavior. This approach provides flexibility and safety, as changes to one strategy do not affect others.

For example:
```cpp
#include <functional>
#include <iostream>

class Context {
public:
    void executeStrategy(std::function<void()> strategy) {
        // Execute the strategy passed in
        strategy();
    }
};

// A simple strategy
void drawCircle() { std::cout << "Drawing a circle." << std::endl; }

int main() {
    Context context;
    context.executeStrategy(drawCircle);
    return 0;
}
```
??x
---


#### Single-Responsibility Principle (SRP) Violation
Background context: The current implementation of drawing shapes violates the SRP because it tightly couples shape classes with specific drawing implementations, making future changes difficult and intrusive. This is problematic if the tool needs to support multiple graphic libraries in the future.
:p What problem does the SRP violation cause in the current implementation?
??x
The SRP violation causes two main issues: 1) It's not easy to change how shapes are drawn because drawing logic is embedded directly into `Circle` and `Square`. Any changes require modifying these classes, which can be intrusive. 2) If you want to support multiple graphic libraries (e.g., OpenGL, Metal, Vulkan), you would need to modify the behavior in multiple unrelated places.
??x
---

#### Inheritance Hierarchy for Drawing with OpenGL
Background context: To address the SRP violation and make drawing flexible across different libraries, a new approach was proposed where `OpenGLCircle` and `OpenGLSquare` inherit from their respective base classes (`Circle` and `Square`). This allows implementing drawing logic in specific derived classes without affecting the base class.
:p How does the proposed solution with inheritance hierarchy address the SRP violation?
??x
The proposed solution addresses the SRP violation by moving the drawing implementation to derived classes, making it easier to support different graphic libraries. For example:
```cpp
//---- <Circle.h> ----------------
#include <Shape.h>
class Circle : public Shape {
public:
    // ... No implementation of the draw() member function anymore
};

//---- <OpenGLCircle.h> ----------------
#include <Circle.h>
class OpenGLCircle : public Circle {
public:
    explicit OpenGLCircle(double radius) : Circle(radius) {}
    void draw(/*some arguments*/) const override;
};
```
This way, `Circle` and `Square` can focus on being simple geometric primitives without knowing how they are drawn. The drawing logic is encapsulated in derived classes like `OpenGLCircle`.
??x
---

#### Drawbacks of Extending Inheritance Hierarchy for Different Libraries
Background context: While the new solution with inheritance hierarchy works for drawing, it introduces challenges when adding new functionality such as serialization. Adding a `serialize()` function similarly needs to be implemented differently for each library, leading to complex and artificial class names like `OpenGLProtobufCircle` or `MetalBoostSerialSquare`.
:p What are the main drawbacks of extending the inheritance hierarchy with different libraries?
??x
The main drawbacks include:
1. **Complex Class Names**: New classes with names like `OpenGLProtobufCircle`, `MetalBoostSerialSquare`, etc., become cumbersome and less readable.
2. **Complex Hierarchy**: Adding more functionality requires deepening the hierarchy, leading to a complex structure that can be hard to maintain.
3. **Reuse Issues**: Reusing implementation details across different derived classes becomes difficult because each class needs to implement similar logic independently.

For example, it's challenging to reuse OpenGL code between `OpenGLProtobufCircle` and `OpenGLBoostSerialCircle`.
??x
---

#### Alternative Design Solution: Strategy Pattern
Background context: The proposed inheritance hierarchy approach is not scalable for multiple functionalities. A better solution might involve using the Strategy pattern where a strategy object handles the drawing or serialization logic, making it easier to switch between different implementations without changing class hierarchies.
:p How can the Strategy pattern be applied to address the issues with the current design?
??x
The Strategy pattern can address these issues by defining an interface for operations and allowing subclasses to provide specific implementations. Here’s a simplified example:
```cpp
//---- <DrawingStrategy.h> ----------------
class DrawingStrategy {
public:
    virtual ~DrawingStrategy() = default;
    virtual void draw(const Shape& shape) const = 0;
};

//---- <OpenGLDrawingStrategy.h> ----------------
#include "DrawingStrategy.h"
class OpenGLDrawingStrategy : public DrawingStrategy {
public:
    void draw(const Circle& circle) const override {
        // OpenGL code to draw a circle
    }
    void draw(const Square& square) const override {
        // OpenGL code to draw a square
    }
};

//---- <Shape.h> ----------------
#include "DrawingStrategy.h"
class Shape {
private:
    DrawingStrategy* strategy_;
public:
    void setDrawingStrategy(DrawingStrategy* strategy) { strategy_ = strategy; }
    void draw() const {
        if (strategy_) {
            strategy_->draw(*this);
        }
    }
};
```
With this pattern, you can easily switch between different drawing strategies without changing the `Shape` class or creating numerous subclasses.
??x
---

