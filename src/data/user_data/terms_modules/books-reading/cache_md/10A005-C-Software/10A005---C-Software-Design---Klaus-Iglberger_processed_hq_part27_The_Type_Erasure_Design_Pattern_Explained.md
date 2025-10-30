# High-Quality Flashcards: 10A005---C-Software-Design---Klaus-Iglberger_processed (Part 27)

**Rating threshold:** >= 8/10

**Starting Chapter:** The Type Erasure Design Pattern Explained

---

**Rating: 8/10**

#### Type Erasure: Overview and Intent
Background context explaining the concept. Type Erasure is a compound design pattern that combines External Polymorphism, Bridge, and optionally Prototype to create value-based abstractions for unrelated types with similar behavior.

:p What is the intent of Type Erasure?
??x
The intent of Type Erasure is to provide a value-based, non-intrusive abstraction for an extendable set of unrelated, potentially non-polymorphic types that exhibit the same semantic behavior. This means creating wrapper types that can represent multiple underlying types without requiring modifications to those types.
```cpp
// Example of Type Erasure with a simple interface and concrete implementation
class Shape {
public:
    virtual void draw() = 0;
};

class Circle : public Shape {
public:
    void draw() override { /* Draw circle */ }
};

class Square : public Shape {
public:
    void draw() override { /* Draw square */ }
};
```
x??

---

#### External Polymorphism
Background context explaining the concept. External Polymorphism is a key component of Type Erasure, enabling decoupling and non-intrusive runtime polymorphism.

:p What is the role of External Polymorphism in Type Erasure?
??x
External Polymorphism plays a crucial role in Type Erasure by providing a way to achieve decoupling and non-intrusiveness. It allows for an external, non-intrusive abstraction that supports various unrelated types with similar behavior without requiring modifications to those types.
```cpp
// Example of External Polymorphism using a Shape hierarchy
class Shape {
public:
    virtual void draw() = 0;
};

void processShape(const std::shared_ptr<Shape>& shape) {
    // Process the shape without knowing its exact type
}
```
x??

---

#### Bridge Design Pattern
Background context explaining the concept. The Bridge pattern is another key component in Type Erasure, enabling value semantics-based implementations.

:p How does the Bridge design pattern contribute to Type Erasure?
??x
The Bridge design pattern contributes to Type Erasure by separating an object's interface from its implementation. This separation allows for a value semantics-based implementation where the abstraction (e.g., `Shape`) is separated from the behavior it provides, enabling non-intrusive and value-based abstractions.
```cpp
// Example of using Bridge with Shape and Color in Type Erasure
class Shape {
public:
    virtual void draw() = 0;
};

class Color {
public:
    virtual void applyColor(Shape& shape) = 0;
};

class RedColor : public Color {
public:
    void applyColor(Shape& shape) override { /* Apply red color to the shape */ }
};
```
x??

---

#### Prototype Design Pattern
Background context explaining the concept. The Prototype pattern, if used, is optional and helps manage copy semantics in value-based abstractions.

:p When would you use the Prototype design pattern in Type Erasure?
??x
The Prototype design pattern can be used in Type Erasure when dealing with the copy semantics of value-based abstractions. It allows for creating copies of objects without requiring knowledge of their internal structure, making it easier to handle complex or non-trivial object copying.
```cpp
// Example using Prototype with Shape and Color in Type Erasure
class Shape {
public:
    virtual void draw() = 0;
};

class Color : public Prototype<Color> {
public:
    virtual void applyColor(Shape& shape) = 0;
};
```
x??

---

#### OwningShapeModel Class Template
Background context explaining the concept. The OwningShapeModel class template is a wrapper that encapsulates Type Erasure, providing value semantics and non-intrusive behavior.

:p What is the purpose of the OwningShapeModel class template?
??x
The OwningShapeModel class template serves as a wrapper around external hierarchies introduced by External Polymorphism. It provides value semantics and non-intrusive behavior by encapsulating types that may have different internal structures while maintaining consistent semantic behavior.
```cpp
// Example of OwningShapeModel in Type Erasure
template <typename T>
class OwningShapeModel : public Shape {
private:
    std::unique_ptr<T> ptr;

public:
    void draw() override {
        // Delegate drawing to the wrapped type
        if (ptr) {
            ptr->draw();
        }
    }

    // Other methods for managing the internal pointer
};
```
x??

---

**Rating: 8/10**

#### Bridge Design Pattern Application

This pattern is used to separate an object’s interface from its implementation so that the two can vary independently. The `Shape` class uses this approach by storing a polymorphic pointer to its concrete implementation details, allowing the types of shapes and drawing strategies to be decoupled.

:p What does the `Shape` class do in terms of type management?
??x
The `Shape` class manages the storage of a polymorphic object (using `std::unique_ptr`) that represents the actual shape. This separation ensures that the interface remains stable while different implementations can vary independently.
x??

---

#### Type Erasure

Type erasure occurs when a concrete implementation is stored behind an abstract base class pointer, effectively hiding the type from the user of the class.

:p How does the `Shape` class achieve type erasure?
??x
The `Shape` class uses a `std::unique_ptr<detail::ShapeConcept>` to store the actual shape. The `detail::OwningShapeModel` is instantiated with types `ShapeT` and `DrawStrategy`, but it is stored as an instance of `detail::ShapeConcept`. This means that outside the class, no concrete type information about `shapeT` or `drawStrategy` is visible.
x??

---

#### Clone Function for Copy Constructor

To implement the copy constructor in a way that works with polymorphic types, the `clone()` function must be available to create an exact copy of the object.

:p How does the `Shape` class handle the copy constructor?
??x
The `Shape` class uses the `clone()` method provided by the abstract base class (`detail::ShapeConcept`) to make a deep copy of the shape. This allows it to create a new `Shape` instance with an identical internal state without knowing the concrete type.

```cpp
Shape(const Shape& other) : pimpl_(other.pimpl_->clone()) {}
```

This line creates a new `pimpl_` using the `clone()` method from the current object's implementation.
x??

---

#### Copy and Swap Idiom

The copy and swap idiom is used to implement the assignment operator by swapping the state of the current object with that of a temporary copy.

:p How does the assignment operator in `Shape` work?
??x
The `Shape` class implements the assignment operator using the copy and swap idiom. It first creates a temporary copy, then swaps its internal pointer with that of the copied object. This ensures safe copying and swapping without undefined behavior.

```cpp
Shape& operator=(const Shape& other) {
    Shape copy(other);
    pimpl_.swap(copy.pimpl_);
    return *this;
}
```

This implementation first creates a `copy` of the current state, then swaps its internal pointer with that of the copied object. Finally, it returns itself to allow chained assignments.
x??

---

#### Destructor and Move Operations

The destructor is defaulted by `Shape`, while move operations are default because they can reuse the copy constructor and assignment operator.

:p What special handling does `Shape` need for its destructor and move operations?
??x
The destructor of `Shape` is declared as `default`. This means that it will use the default destructor implementation provided by the compiler. Similarly, both the move constructor and move assignment operator are defaulted. These are useful because they can rely on the copy constructor and assignment operator to handle the actual work.

```cpp
~Shape() = default;
Shape(Shape&&) = default;
Shape& operator=(Shape&&) = default;
```

These declarations ensure that default implementations are used, which in this case will delegate the work to the copy constructor and assignment operator.
x??

---

**Rating: 8/10**

#### Type Erasure Design Pattern: Implementation Complexity

Background context explaining the concept. Implementing type erasure involves creating a base interface or abstract class and wrapper classes that dynamically handle different types without knowing their specific types at compile time.

If applicable, add code examples with explanations.
:p What are some potential challenges in implementing type erasure?
??x
The implementation complexity of type erasure can be high, especially when considering advanced features like performance, exception safety, etc. A basic implementation might be manageable within 30 lines of code, but more complex scenarios require careful handling.

For example:
```cpp
class Shape {
private:
    std::unique_ptr<detail::ShapeConcept> pimpl_;
public:
    // Constructor and other methods...
};
```
x??

---

#### Type Erasure Design Pattern: Equality Comparison

Background context explaining the concept. The issue with equality comparison arises because type erasure abstracts away concrete types, making direct value comparisons challenging.

If applicable, add code examples with explanations.
:p How can you compare two shapes for equality using type erasure?
??x
To perform an equality comparison on type-erased objects, a virtual method `isEqual` is needed. This method checks if the internal objects are equivalent based on their actual types and properties.

Example:
```cpp
class Shape {
    friend bool operator==(Shape const& lhs, Shape const& rhs) {
        return lhs.pimpl_->isEqual(rhs.pimpl_.get());
    }
private:
    std::unique_ptr<detail::ShapeConcept> pimpl_;
};

namespace detail {
    class ShapeConcept {
    public:
        virtual bool isEqual(ShapeConcept const* c) const = 0;
    };

    template<typename ShapeT, typename DrawStrategy>
    class OwningShapeModel : public ShapeConcept {
    public:
        bool isEqual(ShapeConcept const* c) const override {
            auto const* model = dynamic_cast<OwningShapeModel<ShapeT, DrawStrategy>*>(c);
            return (model && shape_ == model->shape_);
        }
    private:
        // Internal implementation details
    };
}
```
x??

---

#### Type Erasure Design Pattern: Semantics of Equality

Background context explaining the concept. The semantics of equality in type-erased objects can vary based on the intended use case, making it a complex issue.

If applicable, add code examples with explanations.
:p When comparing two shapes for equality, what factors might determine their equivalence?
??x
The determination of whether two shapes are equal depends heavily on the specific properties and semantics defined by the design. For example:
- Circle {3.14} vs Square {2.71}: Are they considered equal if their areas are the same or only if both are instances of the same type?

Example scenarios to consider:
```cpp
Shape shape1(Circle{3.14});
Shape shape2(Square{2.71});

// Depending on the semantics, these might be considered different even if their areas are the same.
if (shape1 == shape2) {
    // Logic here
}
```
x??

---

#### Type Erasure Design Pattern: Dynamic Casts

Background context explaining the concept. Using dynamic casts to implement equality checks incurs significant runtime overhead and restricts comparability based on strategy types.

If applicable, add code examples with explanations.
:p What are the drawbacks of using `dynamic_cast` for equality comparison in type-erased objects?
??x
Using `dynamic_cast` for equality checks has two major drawbacks:
1. Performance: Dynamic casts involve significant runtime overhead due to virtual function dispatch and type checking.
2. Dependency on DrawStrategy: Equality can only be checked if both shapes use the same draw strategy, which might not always be desirable.

Example of performance impact:
```cpp
bool operator==(Shape const& lhs, Shape const& rhs) {
    return lhs.pimpl_->isEqual(rhs.pimpl_.get());
}
```
x??

---

