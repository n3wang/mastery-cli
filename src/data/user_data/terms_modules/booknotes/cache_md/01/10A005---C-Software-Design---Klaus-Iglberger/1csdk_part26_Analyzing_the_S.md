# High-Quality Flashcards: 10A005---C-Software-Design---Klaus-Iglberger_processed (Part 26)


**Starting Chapter:** Analyzing the Shortcomings of the External Polymorphism Design Pattern

---


#### External Polymorphism Design Pattern
Background context: The External Polymorphism design pattern is a technique for introducing polymorphic behavior to non-polymorphic types without modifying their source code. This allows us to treat different types uniformly through a common interface, promoting loose coupling and abstraction.

:p What does the External Polymorphism design pattern allow?
??x
It allows adding polymorphic capabilities to existing, non-polymorphic types by creating an adapter or proxy that conforms to a common interface. This is achieved without modifying the original type's source code.
x??

---

#### Comparison Between External Polymorphism and Adapter Pattern
Background context: Both the External Polymorphism design pattern and the Adapter design pattern aim to make different types work together, but they do so in slightly different ways.

:p How are the External Polymorphism and Adapter design patterns similar?
??x
Both patterns enable treating non-polymorphic objects as if they were polymorphic by creating an adapter or wrapper that conforms to a common interface.
x??

---

#### Comparison Between External Polymorphism and Adapter Pattern (continued)
Background context: While both patterns standardize interfaces, the External Polymorphism design pattern specifically creates a new hierarchy for abstraction purposes, whereas the Adapter pattern adapts existing types to fit into pre-existing interfaces.

:p How do the External Polymorphism and Adapter design patterns differ?
??x
The External Polymorphism design pattern creates a new external hierarchy to abstract from non-polymorphic types. The Adapter design pattern focuses on adapting an object or function to match an existing interface.
x??

---

#### Example of Using `ShapeModel` with External Polymorphism
Background context: In the provided code snippet, we see how an `int` can be equipped with polymorphic behavior using a `ShapeModel<int>`.

:p How does the example code demonstrate external polymorphism?
??x
The example demonstrates that an `int` can be treated polymorphically by creating a `ShapeModel<int>` and calling its `draw()` method. This shows how to add polymorphism without modifying the `int` type directly, adhering to the External Polymorphism design pattern.

Code Example:
```cpp
#include <memory>

class Shape {
public:
    virtual void draw() = 0;
};

template<typename T>
class ShapeModel : public Shape {
private:
    T value;

public:
    ShapeModel(T val) : value(val) {}

    void draw() override {
        // Implementation of drawing the value, e.g., printing it
        std::cout << "Drawing: " << value << std::endl;
    }
};

int main() {
    auto shape = std::make_unique<ShapeModel<int>>(42);
    shape->draw();  // Polymorphic behavior through ShapeModel
    return EXIT_SUCCESS;
}
```
x??

---

#### Shortcomings of External Polymorphism Design Pattern
Background context: While the External Polymorphism design pattern is powerful, it comes with certain limitations that developers should be aware of.

:p What are some shortcomings of the External Polymorphism design pattern?
??x
One major shortcoming is that it does not fulfill the expectations of a clean and simple solution. It doesn't help to reduce pointers, minimize manual allocations, simplify inheritance hierarchies, or ease user code. This makes it less desirable in scenarios where these factors are critical.
x??

---

#### Summary: Adapting Non-Polymorphic Types
Background context: The External Polymorphism design pattern is useful for adding polymorphic capabilities to non-polymorphic types by creating an external hierarchy.

:p When should the External Polymorphism design pattern be considered?
??x
Consider using the External Polymorphism design pattern when you want to introduce polymorphism without modifying existing code, particularly when dealing with a set of related, non-polymorphic types.
x??

---


---

#### External Polymorphism and Its Limitations

External Polymorphism can introduce complexity when dealing with specific interfaces, as it may require explicit instantiation. This can make user code more cumbersome.

:p What is external polymorphism, and why might it increase the complexity of user code?
??x
External Polymorphism refers to a technique where different types are treated uniformly by their common interface or behavior. In the context provided, this means using templates and class hierarchies to handle various shapes or documents with uniform methods. However, the explicit instantiation required can make the user code more complex because it forces specific types to be known at compile time.

For example:
```cpp
template <typename ShapeT>
class ShapeModel {
public:
    void draw(ShapeT& shape) const;
private:
    ShapeT model_;
};

// Usage requires explicit instantiation
ShapeModel<Circle> circleModel;
circleModel.draw(circle);
```
x??

---

#### Polymorphism and Abstraction

Just as any other base class, a base class used in external polymorphism is still subject to the Interface Segregation Principle (ISP). This means that classes should not be forced to implement methods they do not use.

:p How does the Interface Segregation Principle (ISP) apply to external polymorphism?
??x
The Interface Segregation Principle (ISP) states that no client should be forced to depend on methods it does not use. In the provided example, `DocumentConcept` combines two interfaces (`JSONExportable` and `Serializable`) into one class hierarchy.

If only JSON export functionality is needed, forcing serialization might violate ISP because the exporting function may not need or know about `ByteStream`.

For instance:
```cpp
void exportDocument(DocumentConcept const& doc) {
    // This forces an artificial dependency on ByteStream
    doc.exportToJSON(/* pass necessary arguments */);
}
```
To adhere to ISP, these interfaces should be segregated into orthogonal aspects.

x??

---

#### Segregating Interfaces

Segregating interfaces can help in reducing the coupling and making the design more flexible. By separating concerns like JSON export and serialization, we can provide better abstraction and avoid artificial dependencies.

:p Why is it important to segregate interfaces when using external polymorphism?
??x
Segregating interfaces helps to reduce unnecessary complexity and coupling between classes. When you have a large class hierarchy with many methods, some of which are not relevant for certain use cases, it violates the Interface Segregation Principle (ISP). By separating these concerns into smaller, more focused interfaces, you can provide better abstraction and avoid forcing clients to depend on functionalities they do not need.

For example:
```cpp
class JSONExportable {
public:
    virtual ~JSONExportable() = default;
    virtual void exportToJSON(/*...*/) const = 0;
};

class Serializable {
public:
    virtual ~Serializable() = default;
    virtual void serialize(ByteStream& bs, /*...*/) const = 0;
};

template <typename DocumentT>
class DocumentModel : public JSONExportable, public Serializable {
public:
    // ...
    void exportToJSON(/*...*/) const override;
    void serialize(ByteStream& bs, /*...*/) const override;
private:
    DocumentT document_;
};
```
Now, functions that only need JSON export functionality can accept `JSONExportable` interfaces without being dependent on serialization.

x??

---

#### Example of Segregated Interfaces

In the example provided, separating concerns into `JSONExportable` and `Serializable` interfaces allows for better abstraction. Functions interested in specific functionalities (like just exporting to JSON) can now depend only on those interfaces, reducing unnecessary dependencies.

:p How does separating `DocumentConcept` into `JSONExportable` and `Serializable` help reduce coupling?
??x
Separating the `DocumentConcept` into two orthogonal interfaces (`JSONExportable` and `Serializable`) helps in reducing coupling by allowing clients to depend only on the functionalities they need. This approach adheres to the Interface Segregation Principle (ISP), which suggests that a client should not be forced to depend on methods it does not use.

For example, a function that only needs to export documents as JSON can now accept `JSONExportable` objects without being dependent on serialization:
```cpp
void exportDocument(JSONExportable const& exportable) {
    // This function only depends on the JSON export functionality.
    exportable.exportToJSON(/* pass necessary arguments */);
}
```
This separation makes the design more modular and easier to maintain, as it avoids forcing unnecessary dependencies.

x??

---

#### Duck Typing with External Polymorphism

Similar to duck typing in Python where an object is considered a duck if it quacks like one, external polymorphism allows treating types based on their behavior. This can sometimes lead to misuse or unexpected behaviors, similar to how pretending that an `int` is a `Shape` might not be semantically correct.

:p How does duck typing apply to the context of external polymorphism?
??x
Duck typing in Python and its application to external polymorphism both revolve around the idea that the type of an object matters only by its behavior. In C++, this means that if a type can provide the necessary methods, it can be used interchangeably with another type that provides the same or compatible methods.

However, just as duck typing in Python might lead to unexpected behaviors when types are not truly interchangeable (like pretending an `int` is a `Shape`), external polymorphism also risks introducing issues if interfaces are not well-defined or if types are incorrectly assumed to be compatible.

For example:
```cpp
class FakeDocument {
public:
    void exportToJSON(/*...*/) const;
};

void exportDocument(DocumentConcept const& doc) {
    // This forces an artificial dependency on ByteStream.
    doc.exportToJSON(/* pass necessary arguments */);
}

// Now, a `FakeDocument` can be mistakenly used in the same way as `DocumentModel`.
exportDocument(FakeDocument());
```
This misuse could lead to runtime errors or unexpected behaviors if the `FakeDocument` does not implement all required methods.

x??

---


#### Liskov Substitution Principle (LSP) and Shape Concept

Background context: The Liskov Substitution Principle states that objects of a superclass shall be replaceable with objects of its subclasses without breaking the application. In the provided text, this principle is applied to ensure that any shape class instantiated through `ShapeModel` behaves as expected.

:p What does the LSP require in terms of object substitution?
??x
The LSP requires that objects of a subclass can be substituted for their superclass without affecting the correctness of the program. This means that if Circle and Square are subclasses of Shape, then any operation that works with a Shape should also work correctly when the operation is performed on a Circle or Square.

In the context provided:
```cpp
class Shape {
public:
    virtual void draw() const = 0;
};

class Circle : public Shape {
public:
    void draw() const override { /* Draw circle */ }
};

class Square : public Shape {
public:
    void draw() const override { /* Draw square */ }
};
```
x??

---

#### Guideline 31: Use External Polymorphism for Nonintrusive Runtime Polymorphism

Background context: External Polymorphism allows you to add polymorphic behavior to non-polymorphic types without modifying their source code, thus achieving loose coupling. This is particularly useful when dealing with value types or types that cannot be modified due to external factors.

:p What does the guideline suggest regarding the use of External Polymorphism?
??x
The guideline suggests applying the External Polymorphism design pattern to enable polymorphic treatment of non-polymorphic types in a non-intrusive manner. This means adding virtual functions or interfaces to types that were originally not designed with polymorphism in mind, ensuring that such types can participate in polymorphic behavior without altering their original implementation.

For example:
```cpp
class ShapeModel {
public:
    void draw() const { model->draw(); }
private:
    std::unique_ptr<Shape> model;
};

// Usage
Circle circle;
Square square;

ShapeModel model1(circle);
ShapeModel model2(square);

model1.draw();
model2.draw();
```
x??

---

#### ABI Stability and `std::unique_ptr`

Background context: Application Binary Interface (ABI) stability is crucial in C++ to ensure that changes in the library do not break existing binaries. The use of `std::unique_ptr` affects copyability, as it does not support copying due to its move-only semantics.

:p What issues arise when using `std::unique_ptr` for an ElectricEngine class?
??x
Using `std::unique_ptr` for a class like `ElectricEngine` can render the class noncopyable because `std::unique_ptr` is designed to be movable but not copyable. This means that any class containing a `std::unique_ptr` will also be noncopyable unless it is explicitly handled through custom copy constructors and assignment operators.

For example, if you have:
```cpp
class ElectricEngine {
public:
    void start() { /* Engine starts */ }
};

// Using std::unique_ptr
std::unique_ptr<ElectricEngine> engine = std::make_unique<ElectricEngine>();
```
Switching to `std::unique_ptr` will make the class noncopyable, which might affect its usage in certain contexts.

x??

---

#### Adapter vs. External Polymorphism

Background context: Both the Adapter pattern and External Polymorphism involve adapting interfaces but serve different purposes. The Adapter pattern is used to make incompatible interfaces compatible by providing a wrapper interface that clients do not need to understand, whereas External Polymorphism aims to add polymorphic behavior to types without modifying their source code.

:p How does External Polymorphism differ from the Adapter pattern?
??x
External Polymorphism and the Adapter pattern both aim to adapt interfaces but serve different purposes. The key difference is:

- **Adapter**: It is used to make incompatible interfaces compatible by providing a wrapper interface that clients do not need to understand.
  
- **External Polymorphism**: It allows adding polymorphic behavior to non-polymorphic types without modifying their source code, achieving loose coupling.

For example:
```cpp
// Adapter Example
class OldInterface {
public:
    void oldMethod() { /* old implementation */ }
};

class NewAdapter : public NewInterface {
public:
    OldInterface* oldObj;
    NewAdapter(OldInterface& obj) : oldObj(&obj) {}
    void newMethod() override { oldObj->oldMethod(); }
};
```
Versus
```cpp
// External Polymorphism Example
class Shape {
public:
    virtual void draw() const = 0;
};

class OldType {};
std::unique_ptr<Shape> adapter(const OldType& obj) {
    return std::make_unique<OldTypeAdapter>(obj);
}

class OldTypeAdapter : public Shape {
public:
    OldType* oldObj;
    OldTypeAdapter(OldType& obj) : oldObj(&obj) {}
    void draw() const override { /* Draw the old type polymorphically */ }
};
```
x??

---

#### Summary of Key Concepts

Background context: The text emphasizes the importance of adhering to design principles like LSP and External Polymorphism for building robust, maintainable software. It also highlights the benefits of decoupling through non-intrusive solutions.

:p What key insights does the provided text convey?
??x
The text conveys several key insights:
- **LSP**: Objects should be replaceable with objects of their subclasses without breaking the application.
- **External Polymorphism**: Allows adding polymorphic behavior to types without modifying them, achieving loose coupling and reducing dependencies.
- **ABI Stability**: Important considerations when dealing with binary compatibility in C++.

These principles are essential for building flexible and maintainable software designs. The examples provided illustrate how these concepts can be applied in practice to achieve better code quality and flexibility.

x??


#### Rule of 5 and Copy Semantics
When implementing copy operations, you must manually define them to preserve semantics. The Rule of 5 states that if a class needs to manage resources like memory, it should explicitly implement move constructors and move assignment operators (to avoid unnecessary copying) and may need to delete or define the copy constructor, copy assignment operator, and destructor.
:p What is the Rule of 5?
??x
The Rule of 5 ensures that classes properly handle resource management by either deleting or defining custom implementations for the five special member functions: move constructor, move assignment operator, copy constructor, copy assignment operator, and destructor. If any of these are deleted, the other ones should also be defined to ensure consistent behavior.
```cpp
class Person {
public:
    // Constructor
    Person() = default;
    
    // Copy constructor
    Person(const Person& other) { /* ... */ }
    
    // Move constructor
    Person(Person&& other) noexcept { /* ... */ }
    
    // Copy assignment operator
    Person& operator=(const Person& other) { /* ... */ return *this; }
    
    // Move assignment operator
    Person& operator=(Person&& other) noexcept { /* ... */ return *this; }
    
    // Destructor
    ~Person() = default;
};
```
x??

---

#### Prefer Sticking to the Rule of 5
To avoid potential issues, prefer sticking to the Rule of 5. The move operations are typically expected to be `noexcept` due to Core Guideline C.66, but this might not always be possible.
:p Why is it recommended to stick with the Rule of 5?
??x
Sticking to the Rule of 5 helps ensure that your class behaves correctly and efficiently when dealing with resource management. By properly defining move constructors and move assignment operators, you can avoid unnecessary copies and potential issues like exception safety problems. The `noexcept` qualifier for move operations is recommended as it indicates that these operations are very unlikely to throw exceptions.
```cpp
class Person {
public:
    // Move constructor
    Person(Person&& other) noexcept { /* ... */ }

    // Move assignment operator
    Person& operator=(Person&& other) noexcept { /* ... */ return *this; }
};
```
x??

---

#### Unique_ptr and Noexcept Considerations
When using `std::unique_ptr` as a data member, the move operations are expected to be `noexcept`. However, this might not always be possible if you assume that some `std::unique_ptr` data member is never `nullptr`.
:p Why do move operations for classes containing `std::unique_ptr` need to be `noexcept`?
??x
Move operations for classes containing `std::unique_ptr` are expected to be `noexcept` because it indicates that the operation will not throw exceptions. This is important for performance and exception safety, as it allows the compiler to optimize certain operations. However, if you have a scenario where a `std::unique_ptr` can never be `nullptr`, this might lead to non-`noexcept` move operations, which could result in less efficient code.
```cpp
class Person {
public:
    // Move constructor
    Person(Person&& other) noexcept { /* ... */ }

    // Move assignment operator
    Person& operator=(Person&& other) noexcept { /* ... */ return *this; }
};
```
x??

---

#### Dynamic Allocation and Class Size
Dynamic allocation can significantly affect class size. The size of a `std::string` depends on the compiler implementation, which can vary widely.
:p How does dynamic allocation impact class size?
??x
Dynamic allocation can lead to significant increases in class size due to padding and alignment requirements imposed by the compiler. For example, a `std::string`'s size varies between different compilers and versions, affecting the overall size of classes that use it as a member.
```cpp
class Person1 {
public:
    std::string name;
    int year_of_birth;
};

// Example sizes with different compilers
int main() {
    // With Clang 11.1: total size = 6 * 24 (std::string) + 4 (int) + padding = 152 bytes
    // With GCC 11.1: total size = 6 * 32 (std::string) + 4 (int) + padding = 200 bytes
}
```
x??

---

#### Data-Oriented Design and Performance
To improve performance, consider arranging data based on usage patterns. For example, storing all `year_of_birth` values in a single static vector can optimize memory access.
:p How does data-oriented design help with performance?
??x
Data-oriented design focuses on organizing data to facilitate efficient memory access and reduce cache misses. By grouping related data together, you can improve locality of reference, which leads to better cache utilization and faster execution. For instance, storing all `year_of_birth` values in a single static vector reduces the number of memory accesses required to access these values.
```cpp
class Person2 {
public:
    int year_of_birth;
};

// Example data-oriented design optimization
std::vector<int> years_of_birth;

void processPersons(const std::vector<Person2>& persons) {
    for (const auto& person : persons) {
        const auto index = &person - &persons[0];
        years_of_birth[index] = person.year_of_birth;
    }
}
```
x??

---

#### Understanding the Rule of 5
The Rule of 5 ensures that classes properly handle resource management by either deleting or defining custom implementations for move constructors, move assignment operators, copy constructor, copy assignment operator, and destructor.
:p What is the Rule of 5?
??x
The Rule of 5 is a set of guidelines for managing resources in C++ classes. It states that if you manage resources like memory with smart pointers, you should define or delete the following special member functions: move constructor, move assignment operator, copy constructor, copy assignment operator, and destructor. This ensures proper resource management and avoids common pitfalls.
```cpp
class Person {
public:
    // Constructor
    Person() = default;
    
    // Copy constructor
    Person(const Person& other) { /* ... */ }
    
    // Move constructor
    Person(Person&& other) noexcept { /* ... */ }
    
    // Copy assignment operator
    Person& operator=(const Person& other) { /* ... */ return *this; }
    
    // Move assignment operator
    Person& operator=(Person&& other) noexcept { /* ... */ return *this; }
    
    // Destructor
    ~Person() = default;
};
```
x??

---

#### Raw Pointers and Non-Ownership
Raw pointers are nonowning, meaning they do not manage the lifetime of the pointed-to object. This can make it difficult to use language features like covariant return types.
:p What is a raw pointer and why might it be problematic?
??x
A raw pointer is a simple pointer that does not own or manage the memory it points to. This means you must ensure that the lifetime of the pointed-to object is properly managed elsewhere in your code. Using raw pointers can lead to issues like dangling pointers, double deletion, and memory leaks.

Using raw pointers with covariant return types might be problematic because the language feature requires ownership semantics, which are not provided by nonowning raw pointers.
```cpp
class Base {};
class Derived : public Base {};

// Incorrect usage of covariant return type with raw pointer
Base* clone() const { return new Derived(); }
```
x??

---

#### Template Method Pattern for Cloning
If you need to use a covariant return type in the `clone()` function, consider splitting it into a private virtual function returning a raw pointer and a public non-virtual function returning `std::unique_ptr`.
:p How can you use the Template Method pattern for cloning?
??x
You can use the Template Method pattern to split the `clone()` function into two parts: a private virtual function that returns a raw pointer, and a public non-virtual function that calls this private function and returns a `std::unique_ptr`. This allows you to maintain covariant return types while ensuring proper resource management.
```cpp
class Base {
protected:
    virtual void* doClone() const = 0;

public:
    std::unique_ptr<Base> clone() const {
        return std::unique_ptr<Base>(static_cast<Base*>(doClone()));
    }
};

class Derived : public Base {
private:
    void* doClone() const override { return new Derived(*this); }

public:
    // No need to define the public non-virtual function here
};
```
x??

---

#### External Polymorphism and Design Patterns
External Polymorphism is a design pattern that allows you to transparently extend concrete data types. It is often used in conjunction with Type Erasure patterns.
:p What is External Polymorphism?
??x
External Polymorphism is an object structural pattern that enables you to transparently extend the behavior of existing concrete data types without modifying their implementation. This is particularly useful when you want to add functionality or customize operations on a type without changing its source code.

External Polymorphism plays a major role in Type Erasure patterns, where it helps achieve dynamic dispatch and polymorphic behavior.
```cpp
template <typename T>
class Wrapper {
public:
    virtual void doSomething() const = 0;
};

// Example usage of External Polymorphism
void useWrapper(Wrapper<int>* wrapper) {
    // The function can work with any type that implements the Wrapper interface
    wrapper->doSomething();
}
```
x??

---

#### Data-Oriented Design and Paradigm
Data-oriented design focuses on organizing data to facilitate efficient memory access and reduce cache misses. It is particularly useful when performance is critical.
:p What is Data-Oriented Design?
??x
Data-Oriented Design (DOD) is a software engineering paradigm that emphasizes the organization of data in a way that optimizes memory access patterns and improves cache utilization. By grouping related data together, DOD can reduce cache misses, improve locality of reference, and generally enhance performance.

For example, storing all `year_of_birth` values from multiple `Person` objects in a single static vector can optimize memory access.
```cpp
class Person {
public:
    int year_of_birth;
};

// Example Data-Oriented Design optimization
std::vector<int> years_of_birth;

void processPersons(const std::vector<Person>& persons) {
    for (const auto& person : persons) {
        const auto index = &person - &persons[0];
        years_of_birth[index] = person.year_of_birth;
    }
}
```
x??

---


---
#### Type Erasure: Introduction and Core Concepts
This chapter introduces one of the most exciting modern C++ design patterns, type erasure. It combines two essential principles from the book—separation of concerns and value semantics—to provide a robust solution for dynamic polymorphism without the drawbacks of traditional inheritance hierarchies.

:p What is type erasure in C++, and how does it combine separation of concerns and value semantics?
??x
Type erasure allows you to treat different types as if they were the same type, enabling polymorphic behavior while maintaining clean code structures. It combines separation of concerns by separating the interface from the implementation details, ensuring that each part of the program focuses on its specific responsibilities. Value semantics ensure that instances can be copied and moved efficiently without worrying about ownership or state.

For example:
```cpp
// Example class hierarchy
class Base {
public:
    virtual void func() = 0;
};

class Derived1 : public Base {
public:
    void func() override { /* implementation */ }
};

class Derived2 : public Base {
public:
    void func() override { /* different implementation */ }
};
```

With type erasure, you can create a wrapper that hides the derived class type while still allowing polymorphic behavior.
??x
---

---
#### Basic Owning Type Erasure Implementation
This section will walk through implementing a basic owning type erasure pattern in C++. The idea is to encapsulate the dynamic dispatch mechanism within an opaque wrapper, making it easy to manage and ensuring that the wrapped object can be treated as if it were of a single base class.

:p How would you implement a basic owning type erasure using `std::unique_ptr`?
??x
To implement a basic owning type erasure, you could create a template class that wraps a `std::unique_ptr` to a base class and uses virtual functions for polymorphic behavior. Here's an example:

```cpp
#include <memory>

template<typename Base>
class TypeEraser {
private:
    std::unique_ptr<Base> p;

public:
    template<typename Derived>
    TypeEraser(std::unique_ptr<Derived>&& ptr) : p(std::move(ptr)) {}

    void callFunc() {
        p->func();
    }
};

// Usage
int main() {
    auto derived1 = std::make_unique<Derived1>();
    auto eraser1 = TypeEraser<Base>(std::move(derived1));

    auto derived2 = std::make_unique<Derived2>();
    auto eraser2 = TypeEraser<Base>(std::move(derived2));

    eraser1.callFunc(); // Calls Derived1's func
    eraser2.callFunc(); // Calls Derived2's func

    return 0;
}
```

In this example, `TypeEraser` is a template class that takes the base type as a parameter. It uses a `std::unique_ptr` to manage ownership of the derived object and provides a virtual function call mechanism.
??x
---

---
#### Optimization Potential with Type Erasure
This guideline explores how to optimize type erasure implementations, particularly by applying techniques like Small Buffer Optimization (SBO) and manual virtual dispatch. The goal is to reduce overhead while maintaining flexibility.

:p What is the Small Buffer Optimization (SBO), and why might you want to use it in a type-erased context?
??x
The Small Buffer Optimization (SBO) is an optimization technique where small amounts of data are stored directly within a class instead of being managed through pointers or dynamic memory allocation. This reduces overhead, such as the cost of heap allocations and pointer dereferencing.

In a type-erased context, you might want to use SBO if the derived objects have small enough buffers that can be stored inline with minimal performance penalty. For instance:

```cpp
class SmallBufferBase {
    char buffer[1024]; // Fixed-size buffer

public:
    virtual void func() { /* implementation */ }
};

// Usage in TypeEraser
template<typename Base>
class TypeErasedWithSBO : public Base {
private:
    using Base::func; // Inherit base class methods

public:
    // Use SBO to store small buffers inline
};
```

Here, `SmallBufferBase` includes a fixed-size buffer. The `TypeErasedWithSBO` class inherits from it and uses the SBO to store data efficiently.
??x
---

---
#### Setup Costs of Owning Type Erasure Wrappers
This section investigates the setup costs associated with owning type-erasure wrappers, including the trade-offs between value semantics and performance. It highlights that there is a cost in maintaining value semantics, which might be acceptable for some cases but not others.

:p What are the setup costs involved in using an owning type-erased wrapper?
??x
Using an owning type-erased wrapper involves several setup costs:
1. **Memory Allocation**: Each time you create an `std::unique_ptr`, there is a small overhead associated with memory allocation.
2. **Virtual Function Calls**: Virtual dispatch incurs additional overhead compared to direct function calls.
3. **Copy Construction and Assignment**: When copying or assigning type-erased objects, the underlying pointer must be managed.

For example:
```cpp
// Example setup cost in TypeEraser
TypeEraser<Base> eraser1(std::make_unique<Derived1>());
TypeEraser<Base> eraser2 = std::move(eraser1);

// Virtual function call overhead
eraser1.callFunc(); // This involves a virtual dispatch, which has some runtime cost.
```

These setup costs can be significant in performance-critical applications. However, they are usually acceptable in most general-purpose code where maintainability and ease of use outweigh minor performance penalties.
??x
---


#### Type Erasure History and Importance
This concept highlights the historical context of type erasure, emphasizing its importance in modern C++ programming. The technique was first discussed by Kevlin Henney in 2000 but gained popularity through Sean Parent's presentation at GoingNative 2013.
:p What is the history and significance of Type Erasure as described in the text?
??x
Type Erasure was initially discussed by Kevlin Henney in a C++ Report article published in July-August 2000. It gained broader recognition through Sean Parent's presentation at GoingNative 2013, where he introduced it as a solution to inheritance problems. The technique is significant because it allows for value semantics while handling polymorphism, aligning with the principle of preferring non-intrusive solutions and minimizing dependencies.
x??

---
#### Type Erasure in Boost Libraries
Type Erasure has been used in various libraries like Boost, where it was implemented by Douglas Gregor to enhance functionality. It's particularly notable as an example of type erasure in practice.
:p How does Type Erasure manifest in the Boost libraries?
??x
In the Boost libraries, especially with `boost::function`, type erasure is employed to allow functions and function objects to be treated polymorphically without reference semantics. This means that different types can be stored in a single container, abstracting away their specific types.
```cpp
#include <functional>
#include <vector>

int main() {
    std::vector<std::function<int(int)>> vec;
    vec.push_back([](int x) { return x + 1; }); // Lambda function
    vec.push_back(&std::cout <<);                // Function pointer

    for (const auto& func : vec) {
        std::cout << func(5) << "\n"; // Polymorphic usage
    }
}
```
x??

---
#### Type Erasure in C++17 and Beyond
`std::any`, `std::shared_ptr`, and other standard library components utilize type erasure to provide value semantics for various applications, enhancing flexibility without losing the benefits of polymorphism.
:p Which modern C++ types use Type Erasure?
??x
Types like `std::any` from C++17 and `std::shared_ptr` use type erasure. For instance, `std::any` allows storing values of any type in a single variable:
```cpp
#include <any>
#include <cstdlib>

int main() {
    std::any a;
    a = 42; // Stores an int
    a = "hello"; // Replaces the int with a string

    if (std::holds_alternative<std::string>(a)) {
        const auto& str = std::get<std::string>(a);
        std::cout << str << "\n";
    }
}
```
`std::shared_ptr`, on the other hand, uses type erasure to store a deleter that is not part of its type:
```cpp
#include <memory>

int main() {
    std::shared_ptr<int> ptr = std::make_shared<int>(42);
    // Custom deleter can be used with std::shared_ptr as well.
}
```
x??

---
#### Benefits and Implementation of Type Erasure
Type erasure offers benefits such as value semantics, loose coupling, and non-intrusive solutions. It involves encapsulating polymorphic behavior in a way that avoids the pitfalls of traditional inheritance hierarchies.
:p What are some key benefits of using Type Erasure?
??x
Key benefits include:
- **Value Semantics**: Allows for more flexible and robust data handling without the need for complex reference semantics.
- **Loose Coupling**: Enhances modularity by separating interface from implementation details.
- **Non-Intrusive Solutions**: Avoids forced modifications to existing code, promoting cleaner design.

Type erasure typically involves creating a wrapper class that encapsulates an object of any type and provides a common interface for interaction. This approach minimizes dependencies between components, making the system more maintainable.
x??

---
#### Practical Example: std::any
`std::any` is used to store values of various types dynamically without knowing their exact type at compile time, providing a flexible yet safe polymorphic solution.
:p Provide an example using `std::any`.
??x
Example:
```cpp
#include <any>
#include <cstdlib>

int main() {
    std::any value;
    value = 42; // Store an integer
    value = "Hello"; // Store a string

    if (std::holds_alternative<std::string>(value)) { // Check and cast to string
        const auto& str = std::get<std::string>(value);
        std::cout << str;
    }
}
```
In this example, `std::any` can hold different types of values. The `std::holds_alternative` function is used to check the type of value stored, and `std::get` retrieves it.
x??

---
#### Practical Example: std::shared_ptr
`std::shared_ptr` uses type erasure internally by storing a deleter that manages the lifetime of the object pointed to. This allows for flexible memory management without embedding the deleter in the type system.
:p Provide an example using `std::shared_ptr`.
??x
Example:
```cpp
#include <memory>

int main() {
    // Custom deleter
    auto ptr = std::make_shared<int>(42, [](int* p) { delete p; });

    // Default deleters (uses default_delete<T>)
    auto default_ptr = std::shared_ptr<int>(new int(10));

    // The deleter is stored internally and not part of the type
}
```
In this example, `std::shared_ptr` can be customized with a custom deleter or use the default one. The deleter is stored separately from the managed pointer, demonstrating the power of type erasure in managing resources.
x??

---

