# High-Quality Flashcards: 10A005---C-Software-Design---Klaus-Iglberger_processed (Part 6)


**Starting Chapter:** Guideline 6 Adhere to the Expected Behavior of Abstractions

---


#### Abstractions and Managing Complexity
Background context: This section discusses how abstractions are crucial for managing complexity in software design and architecture. Good abstractions help maintain a clear separation of concerns, making it easier to manage complex systems.

:p What is the importance of good abstractions in software design?
??x
Good abstractions simplify complex systems by providing higher-level interfaces that hide unnecessary details, allowing developers to focus on the core functionality without getting bogged down by low-level implementation complexities. This leads to cleaner, more maintainable code and easier-to-understand designs.

---
#### Adhering to Expected Behavior of Abstractions
Background context: The Liskov Substitution Principle (LSP) is introduced here, which states that objects of a superclass shall be replaceable with objects of its subclasses without breaking the application. This principle ensures that abstractions are used consistently and correctly throughout the code.

:p What does the Liskov Substitution Principle ensure in software design?
??x
The Liskov Substitution Principle ensures that objects of a subclass can replace objects of their superclass without affecting the correctness or behavior of the program. It helps maintain consistency and predictability across different parts of the application by ensuring that subclasses correctly implement the expected behaviors.

---
#### Comparing Base Classes and Concepts
Background context: This section compares base classes and concepts, highlighting their similarities in expressing expected behavior. Both are used to define abstractions but serve slightly different purposes depending on the programming language and design requirements.

:p How do base classes and concepts compare from a semantic perspective?
??x
Base classes and concepts both aim to express expected behaviors through abstraction. From a semantic point of view, they are very similar because both can be used to specify what an object should do or how it should behave. However, their implementation and usage differ based on the programming paradigm and language constraints.

---
#### Semantic Requirements of Overload Sets
Background context: Function overloading is introduced as another form of abstraction where multiple functions with the same name but different parameters are defined. Each overload in an overload set must adhere to the Liskov Substitution Principle, meaning each function's behavior should be consistent with its expected behavior.

:p Why do all functions in an overload set need to adhere to the LSP?
??x
All functions in an overload set need to adhere to the LSP because they are part of a single interface or abstraction. The principle ensures that any function can replace another without changing the program's correctness, maintaining consistency and predictability across different parts of the code.

---
#### Ownership of Abstractions in Architecture
Background context: This section focuses on how abstractions influence architectural decisions and ownership within a system. It emphasizes understanding who is responsible for maintaining or using specific abstractions to ensure they are used correctly and consistently throughout the application.

:p What does the concept of "ownership of abstractions" mean in software architecture?
??x
The concept of "ownership of abstractions" refers to determining which parts of the system are responsible for creating, managing, and maintaining specific abstractions. This understanding helps in ensuring that each abstraction is used correctly according to its intended purpose and behavior, contributing to a well-structured and maintainable application.

---


#### Dependency Inversion Principle (DIP)
In software design, the Dependency Inversion Principle (DIP) is a fundamental guideline that aims to reduce tight coupling between high-level modules and low-level modules. According to DIP, high-level modules should not depend on low-level modules but should both depend on abstractions. Abstractions should not depend upon details; details should depend upon abstractions.

This principle promotes the creation of flexible, maintainable, and modular architectures where changes in one layer do not affect other layers as long as they adhere to agreed-upon interfaces or contracts.
:p What is the Dependency Inversion Principle (DIP) about?
??x
The Dependency Inversion Principle states that high-level modules should not depend on low-level modules but both should depend on abstractions. This ensures that changes in one layer do not affect other layers as long as they follow agreed-upon interfaces or contracts.
x??

---

#### Violation of the Liskov Substitution Principle (LSP)
The Liskov Substitution Principle (LSP) is a fundamental principle in object-oriented programming that states objects in a program should be replaceable with instances of their subtypes without affecting the correctness of the program. In other words, if S is a subtype of T, then objects of type T in any program shall be replaceable by objects of type S.
:p What does the Liskov Substitution Principle (LSP) state?
??x
The Liskov Substitution Principle states that objects in a program should be replaceable with instances of their subtypes without affecting the correctness of the program. This means if S is a subtype of T, then any object of type T can be replaced by an instance of S without altering the validity of the program.
x??

---

#### Example of Violating Expectations
In the provided example, there are two classes: `Rectangle` and `Square`. The `Rectangle` class represents a generic rectangle with independent width and height. However, the `Square` class inherits from `Rectangle` but enforces that both dimensions must be equal.

This leads to a violation of the Liskov Substitution Principle (LSP) because a `Square` is not substitutable for its base class `Rectangle`. Specifically, the assertion in the `transform` function fails when passing a `Square` object.
:p What problem does this example illustrate?
??x
This example illustrates a violation of the Liskov Substitution Principle (LSP). The issue arises because a `Square`, which is supposed to be a subtype of `Rectangle`, cannot substitute for it in all contexts without affecting the correctness of the program. In particular, the assertion fails when setting independent width and height on a `Square`.
x??

---

#### Code Example: Rectangle and Square Classes
Here are the code examples from the provided text:

```cpp
class Rectangle {
public:
    virtual ~Rectangle() = default;

    int getWidth() const;
    int getHeight() const;
    virtual void setWidth(int);
    virtual void setHeight(int);
    virtual int getArea() const;

private:
    int width;
    int height;
};

class Square : public Rectangle {
public:
    void setWidth(int) override;
    void setHeight(int) override;
    int getArea() const override;
};
```

:p How does the `Square` class violate the Liskov Substitution Principle (LSP)?
??x
The `Square` class violates the Liskov Substitution Principle because it enforces that both width and height must be equal, which is not a property of a generic `Rectangle`. In a context where an object of type `Rectangle` is expected, passing an instance of `Square` would lead to incorrect behavior, as demonstrated by the failing assertion.
x??

---

#### Code Example: Transform Function
Here's how the `transform` function works:

```cpp
void transform(Rectangle& rectangle) {
    rectangle.setWidth(7);
    rectangle.setHeight(4);

    assert(rectangle.getArea() == 28); // This assertion will fail for a Square

    // ...
}
```

:p What is the purpose of the `transform` function in this example?
??x
The `transform` function sets the width and height of a `Rectangle` to values that would result in an area of 28. However, when applied to a `Square`, it fails because setting the width and height independently violates the invariant of a square having equal side lengths.
x??

---

#### Code Example: Main Function
Here's how the `main` function works:

```cpp
int main() {
    Square s{};
    s.setWidth(6);
    transform(s);

    return EXIT_SUCCESS;
}
```

:p What happens when the `transform` function is called with a `Square` object?
??x
When the `transform` function is called with a `Square` object, it sets the width and height to 7 and 4, respectively. However, since a square's sides must be equal, this operation violates the invariant of the `Square`. The assertion that checks if the area is 28 will fail because the square cannot have different width and height values.
x??

---


#### Precondition Strengthening Violation
Background context: The Liskov Substitution Principle (LSP) ensures that subtypes do not strengthen preconditions. This means a subtype cannot expect more from its methods than what is expected by the supertype's method.

:p Can you provide an example where precondition strengthening violates the LSP?
??x
In the given example, `X` expects the function `f` to accept any integer greater than 0 as its argument (`assert(i > 0)`). However, in subtype `Y`, this precondition is strengthened to require the argument to be greater than 10. This means that integers between 1 and 9 are no longer valid inputs for `Y::f`. This violates the LSP because it makes more stringent requirements on the input parameter.

```cpp
struct X {
    virtual ~X() = default; // Virtual destructor

    // Precondition: i > 0
    virtual void f(int i) const {
        assert(i > 0); // The function accepts any integer greater than 0.
        // ...
    }
};

struct Y : public X {
    // Precondition: i > 10
    // This strengthens the precondition; numbers between 1 and 9 are no longer allowed.
    void f(int i) const override {
        assert(i > 10); // The function accepts any integer greater than 10.
        // ...
    }
};
```
x??

---

#### Postcondition Weakening Violation
Background context: According to the LSP, subtypes should not weaken postconditions. A subtype cannot promise less when leaving a function compared to what is promised by its supertype.

:p Can you provide an example where postcondition weakening violates the LSP?
??x
In this case, `X` promises that the `f` function will return values greater than 0. However, in the subtype `Y`, it allows any integer value as a possible return value (not necessarily greater than 0). This weakens the postcondition and is therefore a violation of the LSP.

```cpp
struct X {
    virtual ~X() = default; // Virtual destructor

    // Postcondition: returns an int > 0.
    virtual int f() const {
        int i;
        // ... some calculations ...
        assert(i > 0); // The function asserts that it will return a value greater than 0.
        return i;     // Returns a value > 0
    }
};

struct Y : public X {
    // Postcondition: returns any integer (not necessarily > 0).
    int f() const override {
        int i;
        // ... some calculations ...
        return i;         // The function may return any value.
    } 
};
```
x??

---

#### Covariant Return Types
Background context: In a subtype, the member functions can return a type that is itself a subtype of the return type of the corresponding supertype's method. This property has direct language support in C++.

:p Can you provide an example where covariant return types are used correctly?
??x
In this scenario, `Base` and `Derived` are defined as follows:

```cpp
struct Base {
    virtual ~Base() = default; // Virtual destructor for polymorphism.
};

struct Derived : public Base {}; // Derived is a subtype of Base.

// In X, the function f returns a pointer to Base.
struct X {
    virtual ~X() = default;
    virtual Base* f(); // Covariant return type: returns a pointer to a base class.
};

// In Y, the function f returns a pointer to a derived class, which is a subtype of Base.
struct Y : public X {
    Derived* f() override; // Correct covariant return type. It returns a pointer to Derived.
};
```
x??

---

#### Contravariant Function Parameters
Background context: The LSP requires that function parameters in subtypes must be contravariant, meaning the subtype can accept a supertype of the corresponding parameter in the supertype's method.

:p Can you provide an example where function parameters are not contravariant and explain why it violates the LSP?
??x
In this case, `X` defines a virtual function that accepts a pointer to a derived class. However, in subtype `Y`, the overridden function only accepts a pointer to the base class.

```cpp
struct Base {
    virtual ~Base() = default; // Virtual destructor for polymorphism.
};

struct Derived : public Base {}; // Derived is a subtype of Base.

// In X, the function f expects a parameter that is a pointer to a derived class.
struct X {
    virtual ~X() = default;
    virtual void f(Derived*);  // Contravariant: accepts a pointer to a derived class.
};

// In Y, the overridden function incorrectly accepts a pointer to the base class.
struct Y : public X {
    void f(Base*) override;  // Incorrect contravariance. It should accept a pointer to Derived.
};
```
This violates the LSP because `Y` cannot handle all possible parameters that `X::f` can handle, specifically pointers to derived objects.

x??

---

#### Preserving Invariants
Background context: The LSP requires that invariants of the supertype must be preserved in the subtype. This means any expectation about the state of a supertype before and after function calls must hold true for its subtypes as well.

:p Can you provide an example where invariants are not properly preserved?
??x
In this case, `X` has an invariant that the value stored in member variable `value_` must always be within the range [1..10]. However, `Y`, a subtype of `X`, violates this invariant by setting `value_` to 11 after construction.

```cpp
struct X {
    explicit X(int v = 1) : value_(v) { // Constructor with default value 1.
        if (v < 1 || v > 10) throw std::invalid_argument("Invalid argument.");
    }
    
    virtual ~X() = default;
    int get() const { return value_; } // Accessor for the value.

protected:
    int value_; // Invariant: must be within [1..10].
};

struct Y : public X {
    Y() : X() { // Constructor of Y
        value_ = 11; // Violates the invariant, setting it out of range.
    }
};
```
This violates the LSP because `Y` fails to uphold the state requirements set by its supertype `X`. Thus, a `Y` object cannot be used in all places where an `X` is expected.

x??

---

#### Geometric Relation vs. IS-A Relationship
Background context: While squares are geometrically rectangles, in software design, inheritance relationships must align with behavioral expectations and not just mathematical relations.

:p Can you explain the difference between a square being a rectangle from a geometrical standpoint versus the LSP's IS-A relationship?
??x
From a geometrical perspective, a square is always a type of rectangle because it has four equal sides and right angles. However, when designing classes in software engineering using inheritance, this geometric relation must be considered carefully.

The LSP's IS-A relationship implies that subtypes should adhere to the same behavioral expectations as their supertypes. In other words, if `Rectangle` defines a set of behaviors and invariants, any subtype like `Square` should not introduce new constraints or violate existing ones. If `Square` breaks these rules, it fails to maintain the IS-A relationship.

For example, while geometrically all squares are rectangles, in terms of software design, a `Square` class must respect the invariants and behaviors defined by the `Rectangle` interface. Introducing an invariant like "all sides must be equal" can break the LSP if not aligned with the expectations set by `Rectangle`.

Therefore, even though geometrically correct, the `Square` class violates the LSP because it does not adhere to the behavioral expectations established in the `Rectangle` supertype.

x??

