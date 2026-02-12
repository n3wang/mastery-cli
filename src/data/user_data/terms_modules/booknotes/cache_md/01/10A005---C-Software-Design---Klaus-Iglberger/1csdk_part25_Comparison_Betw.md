# High-Quality Flashcards: 10A005---C-Software-Design---Klaus-Iglberger_processed (Part 25)


**Starting Chapter:** Comparison Between Bridge and Strategy

---


#### Handling Incomplete Types and std::unique_ptr
Background context explaining how `std::unique_ptr` interacts with incomplete types, specifically when using PIMPL (Pointer-to-implementation) idiom. The issue arises because `std::unique_ptr` requires a fully defined type to be able to call its member functions or operators.
:p How does the implementation of the Person class handle the use of `std::unique_ptr` and incomplete types?
??x
The solution involves declaring the destructor in the header file and defining it in the source file using `=default`. Additionally, implementing copy constructor and assignment operator. The move constructor uses `std::make_unique()` to ensure proper memory allocation.
```cpp
class Person {
public:
    ~Person() = default; // Declaration in header

private:
    std::unique_ptr<Impl> pimpl_; // Incomplete type used here
};

// Definition in source file
Person::~Person() {} // Default definition

// Copy constructor and assignment operator implementation
Person(const Person& other) : pimpl_(other.pimpl_->clone()) {}
Person& operator=(const Person& other) {
    if (this != &other) {
        pimpl_.reset(other.pimpl_->clone());
    }
    return *this;
}

// Move constructor implementation
Person(Person&& other) noexcept(false) : pimpl_{std::make_unique<Impl>(std::move(other.pimpl_))} {}
```
x??

---

#### Bridge Design Pattern vs. Strategy Design Pattern
Background context explaining the key difference between these two design patterns, focusing on how data members are initialized.
:p How can you differentiate between the Bridge and Strategy design patterns based on their implementation details?
??x
The primary difference lies in how behavior is configured: Strategy requires setting up behavior via a constructor or setter function from outside, while Bridge initializes it internally. For example:
```cpp
// Strategy Design Pattern
class DatabaseEngine {
public:
    virtual ~DatabaseEngine() = default;
};

class Database : public StrategyInterface { // Assuming StrategyInterface has `std::unique_ptr<DatabaseEngine>`
public:
    explicit Database(std::unique_ptr<DatabaseEngine> engine);
private:
    std::unique_ptr<DatabaseEngine> engine_;
};

// Bridge Design Pattern
class Database {
public:
    explicit Database();
private:
    std::unique_ptr<DatabaseEngine> pimpl_; // Implementation detail set internally
};

Database::Database() : pimpl_{std::make_unique<ConcreteDatabaseEngine>(/*some arguments*/)} {}
```
x??

---

#### PIMPL Idiom with std::unique_ptr
Background context explaining the use of `std::unique_ptr` in conjunction with PIMPL to hide implementation details. The key challenge is handling incomplete types when implementing functions that require them.
:p How does the PIMPL idiom work with `std::unique_ptr` and what are some considerations?
??x
PIMPL (Pointer-to-implementation) hides the implementation of a class by using a pointer to another class as a member. With `std::unique_ptr`, you must ensure that the type pointed to is fully defined at the point where it's used. This can be challenging in header files if the definition is not available.
```cpp
class Person {
public:
    ~Person(); // Declaration only

private:
    std::unique_ptr<Impl> pimpl_; // Implementation details hidden
};

// Definition in source file
Person::~Person() {}
```
x??

---

#### Database Example - Strategy Design Pattern
Background context explaining the difference between Strategy and Bridge patterns through a database example. The Strategy pattern is demonstrated where behavior can be configured from outside.
:p In the provided code snippet, which design pattern does the `Database` class implement?
??x
The `Database` class implements the Strategy design pattern because it takes a `std::unique_ptr<DatabaseEngine>` as an argument in its constructor and passes behavior configuration to this pointer. This allows for flexible behavior setup from outside.
```cpp
class DatabaseEngine {
public:
    virtual ~DatabaseEngine() = default;
};

class Database : public StrategyInterface { // Assuming StrategyInterface has `std::unique_ptr<DatabaseEngine>`
public:
    explicit Database(std::unique_ptr<DatabaseEngine> engine);
private:
    std::unique_ptr<DatabaseEngine> engine_;
};

// Example of the constructor
Database::Database(std::unique_ptr<DatabaseEngine> engine) : engine_{std::move(engine)} {}
```
x??

---

#### Database Example - Bridge Design Pattern
Background context explaining how the Bridge pattern differs from the Strategy pattern in terms of behavior setup and physical dependencies.
:p In another example, which design pattern does the `Database` class implement?
??x
The `Database` class implements the Bridge design pattern because it initializes its internal pointer to a concrete implementation (`ConcreteDatabaseEngine`) internally. This shows that the class is logically coupled with a specific implementation but physically decoupled via an abstraction.
```cpp
class Database {
public:
    explicit Database();
private:
    std::unique_ptr<DatabaseEngine> pimpl_;
};

// Example of the constructor
Database::Database() : pimpl_{std::make_unique<ConcreteDatabaseEngine>(/*some arguments*/)} {}
```
x??

---


#### Bridge Implementation Performance Impact

Background context: The passage discusses the performance implications of different implementation techniques, specifically focusing on a "Bridge" (Pimpl) idiom and its effect on performance. It highlights that while a complete Pimpl can introduce overhead, it may be possible to optimize performance by strategically placing data members.

:p What does the passage reveal about the impact of Bridge implementations on performance?
??x
The passage indicates that a full Bridge implementation incurs significant performance penalties (10-13% depending on the compiler). However, it also suggests that optimizing the placement of frequently used and infrequently used data members can improve performance by reducing memory overhead. This optimization involves using a "partial Pimpl" approach.

```cpp
// Example of Person3 with partial Pimpl
class Person3 {
public:
    explicit Person3(/*... various person arguments...*/);
    ~Person3();
    // ... other methods ...

private:
    std::string forename_;
    std::string surname_;
    int year_of_birth_;

    struct Impl;  // Forward declaration of the impl struct
    std::unique_ptr<Impl> pimpl_;  // Pointer to implementation details
};

struct Person3::Impl {
    std::string address;
    std::string city;
    std::string country;
    std::string zip;
};
```
x??

---

#### Optimizing Performance with Partial Pimpl

Background context: The passage demonstrates how optimizing the placement of data members can lead to improved performance. It specifically mentions that by separating frequently used and infrequently used data, the size of the class instance can be reduced, which can improve memory efficiency.

:p How does the partial Pimpl approach help in optimizing Person3's implementation?
??x
The partial Pimpl approach helps optimize Person3's implementation by separating frequently used data members from infrequently used ones. This reduces the overall size of the `Person3` class instance, leading to better memory utilization and potentially faster performance.

```cpp
// Example of Person3 with optimized placement of data members
class Person3 {
public:
    explicit Person3(/*... various person arguments...*/);
    ~Person3();
    // ... other methods ...

private:
    std::string forename_;  // Frequently used
    std::string surname_;   // Frequently used
    int year_of_birth_;     // Frequently used

    struct Impl {           // Struct for infrequently used data
        std::string address;
        std::string city;
        std::string country;
        std::string zip;
    };

    std::unique_ptr<Impl> pimpl_;
};

// Constructor and destructor implementation remains the same as before.
```
x??

---

#### Performance Measurement of Different Implementations

Background context: The passage provides performance metrics for various implementations, including a no Pimpl approach (Person1), complete Pimpl idiom (Person2), and partial Pimpl idiom (Person3). These measurements are normalized to Person1's performance to highlight the relative impact on speed.

:p What do the performance results in Table 7-2 indicate about different implementation techniques?
??x
The performance results in Table 7-2 show that while a complete Pimpl implementation incurs significant overhead, reducing the size of the `Person3` instance by separating frequently used data from infrequently used data can improve performance. Specifically, Person3 outperforms Person1 by approximately 6.5% for Clang and 14.0% for GCC.

```cpp
// Example of Table 7-2: Performance results
#include <iostream>

struct PerformanceResult {
    float gcc;
    float clang;
};

PerformanceResult getPerformanceResults() {
    PerformanceResult results = {0.8597, 0.9353};
    return results;
}

int main() {
    PerformanceResult results = getPerformanceResults();
    std::cout << "GCC Performance: " << results.gcc * 100 << "%" << std::endl;
    std::cout << "Clang Performance: " << results.clang * 100 << "%" << std::endl;
    return 0;
}
```
x??

---

#### Importance of Representative Benchmarks

Background context: The passage emphasizes the importance of using representative benchmarks to verify performance improvements or bottlenecks. It stresses that theoretical improvements might not always translate into practical benefits and should be validated through actual code testing.

:p Why is it important to use a representative benchmark for verifying performance gains?
??x
Using a representative benchmark is crucial because it ensures that any observed performance improvements are relevant to the actual usage scenario. Theoretical optimizations may not show significant results in real-world applications, so empirical validation through benchmarks based on actual data and code is essential.

```cpp
// Example of using a simple benchmark to measure performance
#include <chrono>
#include <iostream>

void benchmark(const char* name) {
    auto start = std::chrono::high_resolution_clock::now();
    // Code block representing the operation being benchmarked
    auto end = std::chrono::high_resolution_clock::now();
    std::chrono::duration<double> duration = end - start;
    std::cout << name << " took: " << duration.count() * 1000 << "ms" << std::endl;
}

int main() {
    benchmark("Person3");
    return 0;
}
```
x??

---

#### Guidelines for Implementing Bridges

Background context: The passage concludes with guidelines for using bridges, emphasizing the need to be aware of performance gains and losses. It suggests that partial Pimpl can be beneficial in certain scenarios but should always be validated through benchmarks.

:p What are some key considerations when implementing a bridge according to the guidelines?
??x
When implementing a bridge (Pimpl), it is essential to consider several factors:

1. **Performance Impact**: Bridges generally introduce overhead, so their use must be justified by measurable performance benefits.
2. **Partial Pimpl**: Separating frequently used data from infrequently used data can reduce memory footprint and improve performance.
3. **Benchmarking**: Always validate the impact of changes using representative benchmarks based on actual code and data.

```cpp
// Example guideline for implementing a bridge
GUIDELINE 29: BE AWARE OF BRIDGE PERFORMANCE GAINS AND LOSSES

- Keep in mind that bridges can have a negative performance impact.
- Be aware that partial Pimpl can have a positive impact by separating frequently used from infrequently used data.
- Always confirm performance bottlenecks or improvements through representative benchmarks; do not rely solely on intuition.

```
x??

---


#### External Polymorphism Design Pattern
External Polymorphism is a technique where an external hierarchy manages and delegates virtual function calls to the desired implementation. This approach separates concerns by extracting polymorphic behavior into a dedicated class or template, enhancing flexibility and maintainability.

This pattern can be particularly useful when dealing with complex systems that require multiple behaviors from similar objects, such as different shapes in a drawing application.
:p What is external polymorphism?
??x
External Polymorphism is a design pattern where an external hierarchy manages and delegates virtual function calls to the desired implementation. This approach separates concerns by extracting polymorphic behavior into a dedicated class or template.
??x

---

#### Separation of Concerns (SoC)
Separation of Concerns is a design principle that advocates for dividing software functionality into distinct, independent components, each responsible for a specific aspect.

This helps in creating modular and maintainable code where changes to one component do not necessarily affect others. It's particularly beneficial when managing complex behaviors like drawing, rotating, or serializing different types of shapes.
:p What is separation of concerns?
??x
Separation of Concerns (SoC) is a design principle that advocates for dividing software functionality into distinct, independent components, each responsible for a specific aspect. This helps in creating modular and maintainable code where changes to one component do not necessarily affect others.
??x

---

#### Single Responsibility Principle (SRP)
The Single Responsibility Principle states that every class should have only one reason to change.

In the context of the provided example, SRP acts as an enabler for the Open-Closed Principle (OCP). It ensures that classes are responsible for a single part of the functionality, making it easier to add new types without modifying existing code.
:p How does SRP enable OCP?
??x
The Single Responsibility Principle (SRP) states that every class should have only one reason to change. In the context of the provided example, SRP enables the Open-Closed Principle (OCP) by ensuring that classes are responsible for a single part of the functionality. This means you can easily add new types into the ShapeConcept hierarchy without modifying existing code.
??x

---

#### Open-Closed Principle (OCP)
The Open-Closed Principle states that software entities should be open for extension but closed for modification.

In the example, the `ShapeModel` class template allows adding new nonpolymorphic shape types easily as long as they fulfill all required operations. This adheres to OCP by preventing changes in existing code when adding new functionality.
:p What is the Open-Closed Principle?
??x
The Open-Closed Principle (OCP) states that software entities should be open for extension but closed for modification. In the example, the `ShapeModel` class template allows adding new nonpolymorphic shape types easily as long as they fulfill all required operations. This adheres to OCP by preventing changes in existing code when adding new functionality.
??x

---

#### ShapeConcept and ShapeModel Classes
The `ShapeConcept` class introduces a pure virtual function, `draw()`, representing the entire set of requirements for shapes. The `ShapeModel` class template implements this interface and allows for flexible polymorphic behavior by delegating drawing operations to an external hierarchy.

This separation ensures that shape classes (`Circle` and `Square`) remain simple and unaware of specific behaviors like drawing.
:p What is the purpose of the ShapeConcept and ShapeModel classes?
??x
The `ShapeConcept` class introduces a pure virtual function, `draw()`, representing the entire set of requirements for shapes. The `ShapeModel` class template implements this interface and allows for flexible polymorphic behavior by delegating drawing operations to an external hierarchy. This separation ensures that shape classes (`Circle` and `Square`) remain simple and unaware of specific behaviors like drawing.
??x

---

#### Circle and Square Classes
The reduced versions of the `Circle` and `Square` classes are basic geometric entities with no base class or virtual functions. They are completely nonpolymorphic, making them independent of any additional operations such as drawing.

This design allows for easy addition of new shape types that fulfill all required operations without modifying existing code.
:p What is the role of Circle and Square classes in this example?
??x
The reduced versions of the `Circle` and `Square` classes are basic geometric entities with no base class or virtual functions. They are completely nonpolymorphic, making them independent of any additional operations such as drawing. This design allows for easy addition of new shape types that fulfill all required operations without modifying existing code.
??x

---

#### DrawStrategy in ShapeModel
The `DrawStrategy` type alias in the `ShapeModel` class template is a function object (`std::function`) that represents the drawing logic for shapes.

It abstracts away the specific implementation details, allowing for flexible and extensible behavior.
:p What is the role of the DrawStrategy in the ShapeModel?
??x
The `DrawStrategy` type alias in the `ShapeModel` class template is a function object (`std::function`) that represents the drawing logic for shapes. It abstracts away the specific implementation details, allowing for flexible and extensible behavior.
??x

---
These flashcards cover key concepts from the provided text, ensuring familiarity with external polymorphism, separation of concerns, single responsibility principle, open-closed principle, and design patterns in class templates.


#### ShapeConcept Abstraction and LSP Compliance
Background context explaining that the `ShapeConcept` represents a classic abstraction adhering to the Liskov Substitution Principle (LSP), ensuring that objects of derived classes can be used interchangeably with their base class without breaking the expected behavior. This is crucial for maintaining the integrity and reliability of software designs.

:p What does the ShapeConcept represent in terms of design patterns?
??x
The `ShapeConcept` represents a classic abstraction designed to ensure adherence to the Liskov Substitution Principle (LSP). It provides a blueprint that derived classes, such as `Circle`, `Square`, etc., must follow. This ensures that objects of these derived classes can be used interchangeably with their base class `ShapeConcept` without causing any issues in behavior.
x??

---

#### ShapeModel Class Template and Instantiation
Background context explaining how the `ShapeModel` class template is instantiated for various shape types, such as Circle or Square, to provide polymorphic behavior. The template parameter `ShapeT` acts as a placeholder for these specific shapes.

:p How does the `ShapeModel` instantiate different shape objects?
??x
The `ShapeModel` class template instantiates different shape objects based on the template parameter `ShapeT`. For example, if `ShapeT` is `Circle`, an instance of the `Circle` class will be created. The `ShapeModel` acts as a wrapper that augments these specific shapes with required polymorphic behavior like the `draw()` function.
x??

---

#### Composition Over Inheritance
Background context explaining why composition is preferred over inheritance to avoid complex and tightly coupled class hierarchies.

:p Why is composition used in this design?
??x
Composition is used in this design because it allows for more flexible and decoupled code. Instead of inheriting from `ShapeConcept`, the `ShapeModel` contains an instance of a specific shape type, such as `Circle`. This approach adheres to "Guideline 20: Favor Composition over Inheritance," making the system easier to maintain and extend.
x??

---

#### Drawing Strategy Implementation
Background context explaining how `ShapeModel` implements drawing behavior through strategies stored in `std::function`.

:p How does `ShapeModel` handle drawing operations?
??x
`ShapeModel` handles drawing operations by storing an instance of a `DrawStrategy` within its composition. When the `draw()` function is triggered, it uses this strategy to perform the actual drawing operation. This approach decouples the implementation details of drawing from the `ShapeModel`, allowing for greater flexibility and easier maintenance.
x??

---

#### Flexibility in Drawing Implementation
Background context explaining that while `std::function` is used here, other approaches are also possible.

:p What alternative methods can be used to implement drawing within `ShapeModel`?
??x
While using `std::function` with a `DrawStrategy` is one approach, there are other flexible methods. For example, you could forward the drawing request to a member function of the shape type or to a free function. The key is ensuring that any type used to instantiate `ShapeModel` meets the necessary requirements for the specific drawing implementation.
x??

---

#### Inversion of Control with Free Functions
Background context explaining how using free functions can invert dependencies, similar to the Strategy pattern.

:p How does using a free function in `ShapeModel::draw()` achieve inversion of control?
??x
Using a free function in `ShapeModel::draw()` achieves inversion of control by decoupling the drawing logic from both the `ShapeModel` and the specific shape type. This allows for more flexible and loosely coupled code, similar to how the Strategy pattern works. The exact function can be chosen based on its name or signature, providing a powerful way to manage dependencies.
x??

---


#### Template-Based ShapeModel Implementation

This section discusses how `ShapeModel` acts as a templated version of initial shape classes, offering several benefits over traditional implementations. It helps to reduce boilerplate code and improves implementation by adhering to the DRY (Don't Repeat Yourself) principle.

:p What is the key advantage of using `ShapeModel` over initial shape classes?
??x
The key advantages include reducing boilerplate code and improving adherence to the DRY principle, as `ShapeModel` can be used across different shapes with minimal additional setup. Additionally, it allows for easy switching between runtime and compile-time Strategy implementations.

```cpp
template< typename ShapeT, typename DrawStrategy >
class ShapeModel : public ShapeConcept {
public:
    explicit ShapeModel(ShapeT shape, DrawStrategy drawer)
        : shape_{ std::move(shape) }, drawer_{ std::move(drawer) }
    {}

    void draw() const override { drawer_(shape_); }

private:
    ShapeT shape_;
    DrawStrategy drawer_;
};
```
x??

---

#### Default Drawer Implementation

A `DefaultDrawer` is provided as a default strategy that can be used when no specific drawing Strategy is defined. This simplifies the usage of `ShapeModel`.

:p How does the `DefaultDrawer` template work?
??x
The `DefaultDrawer` template provides a default implementation for the drawing behavior, allowing it to accept any type and call its `draw` method.

```cpp
struct DefaultDrawer {
    template< typename T >
    void operator()(T const& obj) const {
        draw(obj);
    }
};
```
x??

---

#### Compile-Time Strategy Implementation

The example illustrates how a compile-time Strategy can be passed to the `ShapeModel` class, which can replace the use of `std::function`.

:p What are the benefits of using compile-time Strategy over runtime?
??x
Using a compile-time Strategy with `ShapeModel` offers several benefits: reduced runtime indirections (improving performance), avoiding template arguments in all shape classes, and keeping the code DRY by limiting the modification to one place.

```cpp
template< typename ShapeT, typename DrawStrategy = DefaultDrawer >
class ShapeModel : public ShapeConcept {
public:
    explicit ShapeModel(ShapeT shape, DrawStrategy drawer = DefaultDrawer{})
        // ... as before

private:
    ShapeT shape_;
    DrawStrategy drawer_;
};
```
x??

---

#### Dependency Reduction and Polymorphism

The text highlights the reduction of dependencies through this design pattern and mentions that the approach combines runtime and compile-time polymorphism effectively.

:p How does combining runtime and compile-time Strategy benefit the implementation?
??x
Combining runtime and compile-time Strategy benefits the implementation by reducing dependencies, improving performance due to fewer runtime indirections, and adhering to the DRY principle without cluttering all shape classes with template arguments.

```cpp
// Example of how this could be visualized in a dependency graph (not shown)
// Shows a simplified view where ShapeModel is the central class that handles drawing strategies.
```
x??

---

#### Summary

This section provides an overview of `ShapeModel` and its benefits, including how it reduces boilerplate code, supports compile-time Strategy implementations, and minimizes dependencies.

:p What are the main objectives of using the `ShapeModel` design?
??x
The main objectives include reducing boilerplate code, supporting compile-time Strategy implementations to improve performance, maintaining adherence to the DRY principle by centralizing configuration in one place, and minimizing dependencies through a well-structured class hierarchy.

```cpp
// Code examples are provided above for illustration.
```
x??

---


#### External Polymorphism Design Pattern
This pattern allows for polymorphic behavior without requiring inheritance or composition between shape classes. Instead, it uses a template approach to integrate drawing strategies with specific shape implementations.

:p What is the external polymorphism design pattern used for?
??x
The external polymorphism design pattern is used to achieve polymorphism by using templates and separate draw strategy classes, rather than relying on inheritance or composition. This decouples the shape types from the drawing logic, allowing for easier addition of new shapes and drawing strategies without modifying existing code.

```cpp
// Example of how a Circle class might be implemented
class Circle {
public:
    explicit Circle(double radius) : m_radius(radius) {}
    
    // Other methods related to circle implementation
private:
    double m_radius;
};

// OpenGLDrawStrategy example
class OpenGLDrawStrategy {
public:
    explicit OpenGLDrawStrategy(/* Drawing related arguments */);
    void operator()(Circle const& circle) const;
    void operator()(Square const& square) const;

private:
    /* Drawing related data members, e.g. colors, textures, ... */
};
```
x??

---

#### ShapeModel and DrawStrategy Integration
The `ShapeModel` class template is used to integrate specific shapes with their corresponding drawing strategies. This integration happens at the lowest level of the architecture.

:p How does `ShapeModel` integrate shapes with drawing strategies?
??x
`ShapeModel` integrates specific shapes with their corresponding drawing strategies by being instantiated for a particular shape and draw strategy combination. The instantiation is done at runtime, allowing dynamic selection of both the shape type and its drawing behavior.

```cpp
// Example of ShapeModel template
template <typename TShape, typename TDrawStrategy>
class ShapeModel {
public:
    explicit ShapeModel(TShape& shape, const TDrawStrategy& drawStrategy) : m_shape(shape), m_drawStrategy(drawStrategy) {}

    void draw() const { m_drawStrategy(m_shape); }

private:
    TShape& m_shape;
    const TDrawStrategy& m_drawStrategy;
};
```
x??

---

#### Instantiation of Shapes with Draw Strategies
In the main function, specific instances of `ShapeModel` are created for each shape type and drawing strategy.

:p How are shapes instantiated in the main function?
??x
Shapes are instantiated using `std::make_unique` to encapsulate the instantiation within a smart pointer. This approach ensures resource management is handled automatically by the smart pointers.

```cpp
// Example of main function
int main() {
    using Shapes = std::vector<std::unique_ptr<ShapeConcept>>;

    using CircleModel = ShapeModel<Circle, OpenGLDrawStrategy>;
    using SquareModel = ShapeModel<Square, OpenGLDrawStrategy>;

    Shapes shapes{};

    // Creating some shapes with OpenGL drawing strategy
    shapes.emplace_back(std::make_unique<CircleModel>(Circle{2.3}, OpenGLDrawStrategy{/*...red...*/}));
    shapes.emplace_back(std::make_unique<SquareModel>(Square{1.2}, OpenGLDrawStrategy{/*...green...*/}));
    shapes.emplace_back(std::make_unique<CircleModel>(Circle{4.1}, OpenGLDrawStrategy{/*...blue...*/}));

    // Drawing all shapes
    for (auto const& shape : shapes) {
        shape->draw();
    }

    return EXIT_SUCCESS;
}
```
x??

---

#### Benefits of External Polymorphism
The approach using `ShapeModel` and separate draw strategies offers several benefits, including loose coupling, easier addition of new shapes, and adherence to SOLID principles.

:p What are the main advantages of using external polymorphism?
??x
The main advantages include:

1. **Loose Coupling:** Shapes and drawing behaviors are decoupled, making it easier to modify one without affecting the other.
2. **Simplicity in Shape Types:** Shape classes become simpler and nonpolymorphic.
3. **Easier Addition of New Shapes:** Adding new shapes or drawing strategies is straightforward since no changes are needed in existing code.
4. **No Inheritance Overhead:** No need for inheritance, reducing boilerplate code and adhering to the Open/Closed Principle (OCP).
5. **DRY Principle Adherence:** Drawing logic is implemented only once within `OpenGLDrawStrategy`.
6. **Adheres to DIP:** The `ShapeConcept` and `ShapeModel` work together to form a stable abstraction.
7. **Performance Improvement:** Fewer indirections due to template usage.

x??

---

#### Non-Intrusive Polymorphism
Even simple types like integers can be equipped with polymorphic behavior using this pattern, making it highly versatile.

:p How does external polymorphism allow non-intrusive addition of polymorphic behavior?
??x
External polymorphism allows adding polymorphic behavior to any type without modifying the original type. This is achieved by creating a `ShapeModel` for that type and providing the necessary drawing strategy.

```cpp
// Example of adding polymorphic behavior to an int
class IntModel : public ShapeConcept {
public:
    explicit IntModel(int value) : m_value(value) {}

    void draw() const override { 
        // Draw logic for integer, e.g., text rendering
    }

private:
    int m_value;
};

int main() {
    using Shapes = std::vector<std::unique_ptr<ShapeConcept>>;

    using IntModel = ShapeModel<IntModel, OpenGLDrawStrategy>;

    Shapes shapes{};

    shapes.emplace_back(std::make_unique<IntModel>(42));

    for (auto const& shape : shapes) {
        shape->draw();
    }

    return EXIT_SUCCESS;
}
```
x??

---

