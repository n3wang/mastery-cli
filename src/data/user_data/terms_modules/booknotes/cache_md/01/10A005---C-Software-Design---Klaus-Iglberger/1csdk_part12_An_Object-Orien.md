# High-Quality Flashcards: 10A005---C-Software-Design---Klaus-Iglberger_processed (Part 12)


**Starting Chapter:** An Object-Oriented Solution

---


#### Copy-and-Paste Code Pattern
Background context explaining the concern about explicit type handling and potential maintenance issues. Highlight that this pattern often arises due to convenience but can lead to significant problems in larger codebases.

:p What is a major flaw with using switch statements or if-else cascades for drawing different shapes?
??x
This approach leads to duplicated code, making it hard to maintain and update. For example, adding a new shape requires updating every switch statement or if-else cascade, increasing the risk of introducing bugs. Additionally, this explicit type handling makes the code unmaintainable as the codebase grows.

```cpp
switch (shape->type()) {
    case square:              draw( static_cast<Square const&>( *shape ) );              break;
    case triangle:                 draw( static_cast<Triangle const&>( *shape ) );              break;
}
```
x??

---

#### Object-Oriented Approach to Drawing Shapes
Background context explaining the benefits of using an object-oriented approach, such as easier addition of new types and cleaner code structure. Highlight the use of a base class with virtual functions for polymorphism.

:p What is the advantage of implementing drawing logic in derived classes instead of switch statements?
??x
Using derived classes allows for more flexible and maintainable code. By defining a `draw()` function in the base class, each shape can implement its own drawing logic without needing to update existing switch cases or if-else cascades.

```cpp
class Shape {
public:
    virtual ~Shape() = default;
    virtual void draw() const = 0; // Pure virtual function for polymorphism
};

class Circle : public Shape {
public:
    explicit Circle(double radius) : radius_(radius) {}
    double radius() const { return radius_; }
    Point center() const { return center_; }
    void draw() const override;
private:
    double radius_;
    Point center_{}; // Default constructor for a point
};

class Square : public Shape {
public:
    explicit Square(double side) : side_(side) {}
    double side() const { return side_; }
    Point center() const { return center_; }
    void draw() const override;
private:
    double side_;
    Point center_{}; // Default constructor for a point
};
```
x??

---

#### Violation of Open-Closed Principle (OCP)
Background context explaining the importance of the OCP in software design, particularly regarding adding new operations without changing existing code. Highlight that while it eases addition of types, it can violate the OCP when adding functions.

:p How does an object-oriented approach affect the ability to add new operations?
??x
While the object-oriented approach simplifies adding new types, it can make it difficult to add new operations (like `serialize()`) without modifying existing code. The base class must be changed to introduce a new virtual function, and all derived classes need to implement this function even if they don't use it.

```cpp
void drawAllShapes(std::vector<std::unique_ptr<Shape>> const& shapes) {
    for (auto const& shape : shapes) {
        shape->draw(); // Polymorphic call to the appropriate draw method
    }
}
```
x??

---

#### Adding Operations in Object-Oriented Design
Background context explaining how adding operations can violate the Open-Closed Principle and the steps required to make a class open for extension but closed for modification.

:p Why is it challenging to add a `serialize()` function using the object-oriented approach?
??x
Introducing a new virtual function like `serialize()` in the base class requires modifying that class, which breaks the Open-Closed Principle. Additionally, all derived classes (like `Circle`, `Square`) must implement this new function even if they don't use it, leading to potential code bloat and maintenance issues.

```cpp
class Shape {
public:
    virtual ~Shape() = default;
    virtual void draw() const = 0; // Draw implementation in derived classes
    virtual void serialize() const = 0; // New pure virtual function for serialization
};
```
x??

---


#### Object-Oriented vs. Procedural Solutions

Background context explaining the concept of object-oriented and procedural programming, including their strengths and weaknesses.

:p How does an object-oriented solution fare with respect to adding types versus operations?

??x
An object-oriented solution adheres well to the Open-Closed Principle (OCP) when it comes to adding new types. However, it struggles with extending operations once the class structure is defined. This means that while adding new shapes or derived classes can be done without altering existing code, adding a new operation would typically require modifying multiple classes.

For example:
```java
// Example of adding a new type in an object-oriented approach
abstract class Shape {
    public void draw() { /* base implementation */ }
}

class Circle extends Shape {
    @Override
    public void draw() { /* circle-specific drawing logic */ }
}
```

In contrast, operations can be added as separate functions or classes without modifying the existing hierarchy.

x??

---

#### Procedural vs. Object-Oriented Solutions

Background context explaining the procedural approach and its strengths compared to object-oriented programming, especially in terms of adding operations.

:p How does a procedural solution handle adding operations?

??x
A procedural solution is more flexible when it comes to adding new operations. New functions or classes can be created independently of any class hierarchy, making it easier to extend the functionality without modifying existing code structures.

For example:
```java
// Example of adding an operation in a procedural approach
void drawShape(Shape shape) {
    // generic drawing logic
}

// Adding a new operation (function)
void printArea(Shape shape) {
    if (shape instanceof Circle) {
        double area = Math.PI * ((Circle) shape).getRadius() * ((Circle) shape).getRadius();
        System.out.println("Area: " + area);
    }
}
```

This approach allows for easy addition of new operations without altering the existing class hierarchy.

x??

---

#### Open-Closed Principle (OCP)

Background context explaining the OCP and its importance in software design. Include how it applies to adding types versus operations.

:p What is the OCP, and how does it apply to both adding types and operations?

??x
The Open-Closed Principle states that "software entities (classes, modules, functions, etc.) should be open for extension but closed for modification." This means that classes should be designed in such a way that new functionality can be added without altering the existing code.

When considering OCP:
- **Adding Types**: You want to be able to add new types (e.g., new shapes) by extending or modifying the base class or introducing new derived classes.
- **Adding Operations**: You want to be able to add new operations (e.g., new drawing methods) without changing existing types.

For example, in an object-oriented solution:
```java
// Open for extension but closed for modification
abstract class Shape {
    public void draw() { /* base implementation */ }
}

class Circle extends Shape {
    @Override
    public void draw() { /* circle-specific drawing logic */ }
}
```

While in a procedural solution, adding new operations is easier:
```java
// Adding an operation without modifying existing classes
void printArea(Shape shape) {
    if (shape instanceof Circle) {
        double area = Math.PI * ((Circle) shape).getRadius() * ((Circle) shape).getRadius();
        System.out.println("Area: " + area);
    }
}
```

x??

---

#### Design Choice in Dynamic Polymorphism

Background context explaining the choice between fixing types and operations for dynamic polymorphism. Discuss the trade-offs involved.

:p What is the design choice when using dynamic polymorphism, and what are its implications?

??x
When designing software with dynamic polymorphism (like object-oriented programming), you have to choose whether to fix the number of operations or the number of types:

- **Fixing Operations**: This makes it easy to add new types but harder to add new operations. You can extend the class hierarchy without changing existing code, but adding methods requires modifying multiple classes.
  
  Example:
  ```java
  // Extending with new types
  abstract class Shape {
      public void draw() { /* base implementation */ }
  }

  class Square extends Shape {
      @Override
      public void draw() { /* square-specific drawing logic */ }
  }
  ```

- **Fixing Types**: This makes it easy to add operations but harder to add new types. You can introduce new methods without modifying existing classes, but adding new shapes requires restructuring the hierarchy.

  Example:
  ```java
  // Extending with new operations
  void drawShape(Shape shape) {
      // generic drawing logic
  }

  // Adding a new operation (function)
  void printArea(Shape shape) {
      if (shape instanceof Circle) {
          double area = Math.PI * ((Circle) shape).getRadius() * ((Circle) shape).getRadius();
          System.out.println("Area: " + area);
      }
  }
  ```

The choice depends on your project's requirements and how you expect the codebase to evolve.

x??

---


#### Design for Addition of Types or Operations
Background context: The guideline discusses choosing between adding types or operations based on the strengths and weaknesses of programming paradigms. It emphasizes using object-oriented solutions when primarily adding types, while preferring procedural/functional solutions when mainly adding operations.

:p What is the guideline about?
??x
The guideline advises designers to be aware of the strengths and weaknesses of different programming paradigms and suggests choosing between adding types or operations based on these considerations.
x??

---
#### Visitor Design Pattern Overview
Background context: The text introduces the Visitor design pattern as a solution for frequently adding operations instead of types, particularly within object-oriented programming.

:p What is the Visitor design pattern?
??x
The Visitor design pattern allows adding new operations to a system without changing existing classes. It separates an algorithm from its data structures by introducing a new visitor class that can traverse elements of a structure and perform actions on them.
x??

---
#### Example: Drawing Shapes with Visitor Pattern
Background context: The text uses the example of drawing shapes (Circle, Square) to explain how adding operations like rotation or serialization becomes problematic using pure virtual functions in OOP.

:p How does the Visitor pattern help in extending operations for shapes?
??x
The Visitor pattern helps by allowing new operations to be added without modifying existing classes. Instead of adding a new function to each shape class (e.g., `rotate()`, `serialize()`), you introduce a visitor object that can visit and perform actions on elements of the shape hierarchy.
```java
interface Shape {
    void accept(Visitor v);
}

class Circle implements Shape {
    public void rotate() { /* logic */ }
    // Other methods...
}

class Square implements Shape {
    public void serialize() { /* logic */ }
    // Other methods...
}

interface Visitor {
    void visit(Circle c);
    void visit(Square s);
}

// Example visitor
class DrawingVisitor implements Visitor {
    public void visit(Circle c) { 
        // Logic for drawing a circle
    }

    public void visit(Square s) {
        // Logic for drawing a square
    }
}
```
x??

---
#### Understanding Open Closed Principle in OOP
Background context: The text discusses the open-closed principle, where classes should be open for extension but closed for modification. This is relevant when considering how to add new functionalities without changing existing code.

:p What does the open-closed principle state?
??x
The open-closed principle states that software entities (classes, modules, functions, etc.) should be open for extension but closed for modification. This means you can extend a class’s behavior by adding new subclasses instead of modifying the existing class.
x??

---
#### Adding Operations vs Types in OOP
Background context: The text highlights how object-oriented programming excels at adding types but struggles with adding operations through virtual functions.

:p Why is it preferable to add operations using the Visitor pattern?
??x
It is preferable to use the Visitor pattern when you need to frequently add new operations because it allows extending existing classes without modifying their source code. This aligns with the open-closed principle, making the system more maintainable and less prone to bugs caused by unintended modifications.
x??

---
#### Managing Closed Set of Shapes vs Open Set of Operations
Background context: The text describes scenarios where a set of shapes is considered closed but operations are expected to be open for extension.

:p What does it mean when we talk about a closed set in the context of shapes?
??x
A closed set in this context means that you consider the collection of existing shape types (e.g., Circle, Square) as fixed and not likely to change. There is no intention to introduce new shapes into this system.
x??

---
#### Example of Adding Operations Without Modifying Shapes Class
Background context: The text explains how adding operations like rotation or serialization can be problematic when using pure virtual functions in the base class.

:p How does introducing a visitor help manage adding operations?
??x
Introducing a visitor helps by decoupling the new operation from the existing classes. Instead of modifying the `Shape` base class, you create a visitor that can perform actions on any shape object without altering its structure.
```java
// Visitor interface
interface ShapeVisitor {
    void visitCircle(Circle c);
    void visitSquare(Square s);
}

// Implementing the visitors
class DrawingVisitor implements ShapeVisitor {
    public void visitCircle(Circle c) { 
        // Logic for drawing a circle
    }

    public void visitSquare(Square s) {
        // Logic for drawing a square
    }
}

// Using the visitor with shapes
public class Example {
    public static void main(String[] args) {
        Circle circle = new Circle();
        Square square = new Square();

        ShapeVisitor visitor = new DrawingVisitor();
        circle.accept(visitor);
        square.accept(visitor);
    }
}
```
x??

---


#### Visitor Design Pattern Overview
Background context: The Visitor design pattern is used to add new operations without changing existing classes. It aims to enable dynamic addition of functionality to objects by separating the behavior from the object structure.

:p What is the purpose of the Visitor design pattern?
??x
The purpose of the Visitor design pattern is to decouple algorithms from the data structures on which they operate, allowing for adding new behaviors dynamically without modifying existing classes. This promotes an open/closed principle (OCP) compliant approach by making it easy to extend functionality.

```cpp
class ShapeVisitor {
public:
    virtual ~ShapeVisitor() = default;
    
    virtual void visit(Circle const&) const = 0;
    virtual void visit(Square const&) const = 0;
};
```
x??

---

#### Implementation of Visitor Pattern in C++
Background context: In the provided text, a simplified implementation of the Visitor pattern is demonstrated for geometric shapes. The `ShapeVisitor` class contains pure virtual functions that each concrete shape class must implement.

:p How would you implement the `visit` methods for a specific shape?
??x
To implement the `visit` methods for a specific shape, let's consider implementing these methods in the `Draw` visitor class for circles and squares. Here is an example implementation:

```cpp
class Draw : public ShapeVisitor {
public:
    void visit(Circle const& c) const override {
        // Code to draw the circle using some graphics library
        std::cout << "Drawing a Circle with radius: " << c.radius() << std::endl;
    }

    void visit(Square const& s) const override {
        // Code to draw the square using some graphics library
        std::cout << "Drawing a Square with side length: " << s.sideLength() << std::endl;
    }
};
```
x??

---

#### Visitor Pattern for Multiple Operations
Background context: The text explains how adding multiple visitors can support different operations on objects, such as drawing and rotating shapes. Each visitor class implements the `visit` methods for all concrete shape classes.

:p How would you add a new operation like rotation to existing geometric shapes?
??x
To add a new operation like rotation to existing geometric shapes using the Visitor pattern, you can introduce a `Rotate` class that implements the necessary `visit` functions:

```cpp
class Rotate : public ShapeVisitor {
public:
    void visit(Circle const& c) const override {
        // Code for rotating the circle
        std::cout << "Rotating Circle with angle: 45 degrees" << std::endl;
    }

    void visit(Square const& s) const override {
        // Code for rotating the square
        std::cout << "Rotating Square with angle: 90 degrees" << std::endl;
    }
};
```
x??

---

#### Applying Design Pattern Names
Background context: The text suggests using design pattern names to communicate intent, such as `ShapeVisitor` instead of a generic name like `ShapeOperation`.

:p Why is the class named `ShapeVisitor` in this example?
??x
The class is named `ShapeVisitor` because it represents an abstraction of shape operations. Using this name helps others understand that the purpose of the class is to define operations on shapes, making the code more self-explanatory and adhering to "Guideline 14: Use a Design Pattern's Name to Communicate Intent."

```cpp
class ShapeVisitor {
public:
    virtual ~ShapeVisitor() = default;
    
    virtual void visit(Circle const&) const = 0;
    virtual void visit(Square const&) const = 0;
};
```
x??

---

#### Visitor Pattern Benefits and Drawbacks
Background context: The visitor pattern allows adding new operations easily by extending the `ShapeVisitor` class with derived classes. However, it can introduce additional complexity to the system.

:p What are some advantages of using the Visitor design pattern?
??x
Some advantages of using the Visitor design pattern include:

- **Open/Closed Principle Compliance:** New operations can be added without modifying existing classes.
- **Flexibility:** Easy to add new behaviors or operations dynamically.
- **Decoupling:** Behaviors (visitors) are separated from data structures (shapes).

However, it also introduces some complexity:
- **Increased Complexity:** The system becomes more complex with additional classes and interfaces.
- **Implementation Overhead:** Each concrete shape must implement multiple `visit` methods.

```cpp
class Circle {};
class Square {};

class Draw : public ShapeVisitor {
public:
    void visit(Circle const& c) const override;
    void visit(Square const& s) const override;
};
```
x??

---


#### Introduction to ShapeVisitor Design Pattern
The initial problem was that every new operation required a change to the `Shape` base class. The goal is to fulfill the Open/Closed Principle (OCP) by allowing the addition of operations without modifying existing code. This involves extending the `ShapeVisitor` hierarchy.
:p What principle does the ShapeVisitor design pattern help to implement?
??x
The ShapeVisitor design pattern helps to implement the **Open/Closed Principle (OCP)**, ensuring that software entities are open for extension but closed for modification.
x??

---
#### Adding Operations Without Modifying Existing Code
Adding a new operation now requires extending the `ShapeVisitor` hierarchy rather than modifying the existing `Shape` base class. This approach extracts the addition of operations as a variation point, making it easier to add new functionality without changing the original classes.
:p How does the ShapeVisitor pattern achieve the OCP?
??x
The ShapeVisitor pattern achieves the **Open/Closed Principle (OCP)** by allowing you to add new operations through extending the `ShapeVisitor` hierarchy. This means that existing `Shape` classes do not need to be modified when adding a new operation, making it easier to maintain and extend the system.
x??

---
#### Introducing the Accept() Function
To enable visitors to operate on shapes, an `accept()` function is introduced in the `Shape` base class as a pure virtual function. This function calls the appropriate visit method based on the type of shape.
:p What does the accept() function do?
??x
The `accept()` function is introduced in the `Shape` base class to enable visitors to operate on shapes. It calls the corresponding `visit()` function within the visitor, passing the current object (`this`) as an argument. The implementation of this function is consistent across derived classes but triggers different overloads based on the type of shape.
```cpp
class Shape {
public:
    virtual ~Shape() = default;
    virtual void accept(ShapeVisitor const& v) = 0; // Pure virtual function in base class
};
```
x??

---
#### Implementing Accept() for Concrete Shapes
For concrete shapes like `Circle` and `Square`, the `accept()` function is overridden to call the visitor's `visit()` method. This ensures that each derived shape can be visited appropriately.
:p How do you implement accept() in a concrete Shape class?
??x
To implement the `accept()` function in a concrete shape, such as `Circle` or `Square`, you override it and call the visitor's `visit()` method with the current object (`this`). This allows each derived shape to be visited correctly.
```cpp
class Circle : public Shape {
public:
    explicit Circle(double radius)
        : radius_(radius) {
        /* Checking that the given radius is valid */
    }

    void accept(ShapeVisitor const& v) override {
        v.visit(*this); // Delegate to visitor's visit() method
    }

    double radius() const { return radius_; }
private:
    double radius_;
};
```
x??

---
#### Using Accept() in drawAllShapes()
The `drawAllShapes()` function demonstrates how the `accept()` method can be used to apply an operation, such as drawing, to all shapes. It iterates through a vector of unique pointers to `Shape` and calls their `accept()` method with a specific visitor.
:p How does the drawAllShapes() function use accept()?
??x
The `drawAllShapes()` function uses the `accept()` method to apply an operation, such as drawing, to all shapes. It iterates through a vector of unique pointers to `Shape` and calls their `accept()` method with a specific visitor (e.g., `Draw{}`).
```cpp
void drawAllShapes(std::vector<std::unique_ptr<Shape>> const& shapes) {
    for (auto const& shape : shapes) {
        shape->accept(Draw{}); // Draw each shape using the accept() method
    }
}
```
x??

---
#### Visitor Class and visit() Method
The `ShapeVisitor` class defines a virtual `visit()` method that will be called based on the type of shape. This method is responsible for performing specific operations on the shapes.
:p What is the role of the ShapeVisitor in the pattern?
??x
The `ShapeVisitor` class plays a crucial role by defining a virtual `visit()` method. This method is polymorphic and will be called with an instance of the concrete shape, allowing it to perform specific operations based on the type of shape.
```cpp
class ShapeVisitor {
public:
    // Virtual visit() methods for different shapes
    virtual ~ShapeVisitor() = default;
    virtual void visit(Circle const& c) = 0;
    virtual void visit(Square const& s) = 0;
};
```
x??

---
#### Applying the Single-Responsibility Principle (SRP)
By separating the addition of operations into a separate `ShapeVisitor` class, the `Shape` base class can remain unchanged. This adherence to SRP enables easier maintenance and extension.
:p How does applying the ShapeVisitor pattern adhere to the SRP?
??x
Applying the ShapeVisitor pattern adheres to the **Single-Responsibility Principle (SRP)** by separating the addition of operations into a separate `ShapeVisitor` class. This means that the `Shape` base class remains focused on its primary responsibility—being a shape—and does not need to change when new operations are added, promoting easier maintenance and extension.
x??

