# High-Quality Flashcards: 10A005---C-Software-Design---Klaus-Iglberger_processed (Part 24)


**Starting Chapter:** A Motivating Example

---


#### Bridge Design Pattern
Background context: The term "bridge" suggests connecting two things to bring them closer together. However, in software design, bridges are used to reduce physical dependencies and decouple pieces of functionality that need to work together but shouldn't know too many details about each other.

The given example shows an `ElectricCar` class that is tightly coupled with the `ElectricEngine` implementation, leading to several problems:
- Physical coupling: Including headers results in transitive dependencies.
- Visibility issues: All implementation details are visible to anyone who sees the ElectricCar class definition.

To solve these issues, a better approach would be to use an abstract class as an abstraction layer.
:p What is the main issue with the original implementation of `ElectricCar`?
??x
The main issue is that the `ElectricCar` class has direct knowledge and dependency on the concrete `ElectricEngine` implementation. This leads to physical coupling, where any change in the `ElectricEngine` header would affect the `ElectricCar` and potentially many more classes.
```cpp
// ElectricCar.h with ElectricEngine as a data member
class ElectricCar {
public:
    ElectricCar(/*maybe some engine arguments*/);
    void drive();
private:
    ElectricEngine engine_;  // Direct dependency on ElectricEngine
    // ... more car-specific data members (wheels, drivetrain, ...)
};
```
x??

---

#### Forward Declaration for Decoupling
Background context: The original implementation of `ElectricCar` was tightly coupled with the `ElectricEngine`. A better approach is to use a forward declaration and store a pointer to the engine. This reduces physical dependencies but still reveals implementation details.
:p How can you reduce physical coupling in `ElectricCar` without revealing the implementation details?
??x
You can reduce physical coupling by storing a pointer to `ElectricEngine` instead of using it as a data member directly. While this moves the header inclusion into the source file, it doesn't address the visibility issue where anyone still sees that `ElectricCar` depends on `ElectricEngine`.
```cpp
// ElectricCar.h with forward declaration and unique_ptr
#include <memory>
struct ElectricEngine;  // Forward declaration

class ElectricCar {
public:
    ElectricCar(/*maybe some engine arguments*/);
    void drive();
private:
    std::unique_ptr<ElectricEngine> engine_;  // Pointer to the engine
    // ... more car-specific data members (wheels, drivetrain, ...)
};
```
x??

---

#### Introducing an Abstract Class for Decoupling and Encapsulation
Background context: The forward declaration approach reduces physical dependencies but still reveals implementation details. To fully decouple and hide these details, introduce an abstract class `Engine`.
:p How can you further reduce the visibility of implementation details in `ElectricCar`?
??x
To further reduce the visibility of implementation details, introduce an abstract base class `Engine`. This allows `ElectricCar` to depend on a more general interface rather than concrete implementations. Changes to the engine will affect only classes that use this abstract interface.
```cpp
// Engine.h with abstract class definition
class Engine {
public:
    virtual ~Engine() = default;
    virtual void start() = 0;
    virtual void stop() = 0;  // More engine-specific functions can be added here
private:
    // ... (not visible to ElectricCar)
};
```
```cpp
// ElectricCar.h with Engine as a data member
#include <Engine.h>
#include <memory>

class ElectricCar {
public:
    void drive();
private:
    std::unique_ptr<Engine> engine_;  // Dependency on the abstract Engine interface
    // ... more car-specific data members (wheels, drivetrain, ...)
};
```
```cpp
// ElectricEngine.h with derived class definition
#include <Engine.h>

class ElectricEngine : public Engine {
public:
    void start() override;
    void stop() override;
private:
    // ... implementation details hidden from ElectricCar
};
```
x??

---


#### Bridge Design Pattern Overview
The Bridge design pattern is a classic GoF (Gang of Four) design pattern introduced in 1994. Its primary goal is to minimize physical dependencies by encapsulating implementation details behind an abstraction, enabling easy change and separation of concerns.

:p What is the main intent of the Bridge design pattern?
??x
The main intent of the Bridge design pattern is "Decouple an abstraction from its implementation so that the two can vary independently."
x??

---
#### Abstraction vs Implementation in ElectricCar and Engine Classes
In our example, `ElectricCar` represents the abstraction while `Engine` serves as the implementation. The purpose here is to ensure both components can change independently without affecting each other.

:p How do we illustrate the separation between abstraction and implementation using the Bridge pattern?
??x
We use a class hierarchy where `ElectricCar` (the abstraction) depends on an interface or base class `Engine` (the implementation). This way, changes in `ElectricCar` will not affect `Engine`, and vice versa.
x??

---
#### Car Base Class Implementation
The `Car` base class acts as the core of our Bridge design. It encapsulates the Bridge to associated engines via a pointer-to-implementation (`pimpl_`).

:p What is the role of the `Car` class in the Bridge pattern?
??x
The `Car` class serves as the abstraction layer that decouples the car's functionality from its engine implementation, allowing both to vary independently.
x??

---
#### Protected Constructor and pimpl Technique
In the `Car` class, a protected constructor is used to initialize with an engine. This technique ensures derived classes can specify the engine type.

:p Why is the `Car` constructor marked as protected?
??x
The `Car` constructor is marked as protected because it should only be called by derived classes (e.g., `ElectricCar`). This restricts how engines are set, maintaining encapsulation.
x??

---
#### ElectricCar Implementation Details
The `ElectricCar` class inherits from the `Car` base class and uses a unique pointer to initialize its engine.

:p How does the `ElectricCar` constructor relate to the `Car` base class?
??x
The `ElectricCar` constructor initializes the `Car` base class with an engine using `std::make_unique`, demonstrating how derived classes can specify engine types.
x??

---
#### Pimpl Idiom and Pointer-to-Implementation (pimpl)
The `pimpl_` pointer in the `Car` class is a common technique to hide implementation details, making the code more maintainable.

:p What does the term "pimpl" stand for?
??x
"Pimpl" stands for "pointer to implementation," which is used to encapsulate implementation details within a derived class, hiding them from the public interface.
x??

---
#### Bridge Pattern in Multiple Car Types
To reduce duplication and adhere to the DRY principle, we can generalize the Bridge pattern by introducing a `Car` base class.

:p How does generalizing the Bridge pattern with a `Car` class help?
??x
Generalizing the Bridge pattern with a `Car` base class allows us to apply similar decoupling strategies across multiple car types (e.g., electric, combustion), reducing code duplication and improving maintainability.
x??

---
#### Getters for Engine Access
The `getEngine()` member functions in the `Car` class provide controlled access to the engine implementation.

:p Why are the `getEngine()` methods declared as protected?
??x
The `getEngine()` methods are protected because they allow derived classes to access the engine, but not expose this functionality publicly. This maintains encapsulation and control over how engines are accessed.
x??

---


#### Pimpl Idiom Explanation
Background context: The Pimpl idiom is a technique used to hide implementation details and ensure binary stability (ABI) by separating the interface from the implementation. This separation allows the class's internal structure to change without affecting its users, provided that the public interface remains unchanged.
:p What is the Pimpl idiom and why is it useful?
??x
The Pimpl idiom involves encapsulating the private members of a class into an internal class (called Impl), while keeping only a pointer or smart pointer (usually std::unique_ptr) to this implementation in the original class. This approach ensures that any changes in the implementation do not affect the binary compatibility and ease of maintenance.
```cpp
// Example of Pimpl idiom in C++
class Person {
public:
    // Public interface methods
private:
    struct Impl;  // The internal implementation details are hidden here
    std::unique_ptr<Impl> pimpl_;  // Pointer to the implementation
};
```
x??

---

#### Implementation Details Hiding
Background context: By using the Pimpl idiom, all the private members and functions of a class are moved into an internal struct (Impl), while only keeping a smart pointer to this struct in the original class. This allows changes to the implementation details without affecting external users.
:p How does hiding implementation details work in the Pimpl idiom?
??x
In the Pimpl idiom, the private members and functions that are part of the internal implementation are moved into a nested struct (Impl). The original class then holds only a smart pointer to this Impl instance. Any changes made to the Impl struct will not affect the external interface as long as the public methods remain consistent.
```cpp
// Example of hiding implementation details in Person class
struct Person::Impl {
    std::string forename;
    std::string surname;
    // ... other data members and functions
};

class Person {
public:
    // Public methods and constructors
private:
    struct Impl;  // Hidden implementation detail
    std::unique_ptr<Impl> pimpl_;  // Pointer to the implementation details
};
```
x??

---

#### Constructor Implementation
Background context: In the Pimpl idiom, the constructor of the main class initializes a smart pointer (std::unique_ptr) with an instance of the internal struct. This involves dynamic memory allocation.
:p How does the constructor in the Pimpl idiom initialize the smart pointer?
??x
The constructor of the main class creates and initializes the smart pointer to an instance of the nested Impl struct using `std::make_unique()`. This function allocates memory for the Impl object on the heap and returns a std::unique_ptr managing that memory.
```cpp
// Constructor in Person class with Pimpl idiom
Person::Person()
    : pimpl_{ std::make_unique<Impl>() }  // Initialize the smart pointer
{}
```
x??

---

#### Destructor Implementation
Background context: Although `std::unique_ptr` handles most of the cleanup, it is still necessary to manually define the destructor for the main class. This is because if no custom destructor is provided, the compiler-generated destructor will include the destruction of the `std::unique_ptr`, which can cause issues when included in headers.
:p Why must we manually implement the destructor in the Pimpl idiom?
??x
Even though `std::unique_ptr` manages the memory and handles its cleanup, it is necessary to define a custom destructor for the main class. This is because if no custom destructor is provided, the compiler-generated destructor will include the destruction of the `std::unique_ptr`. Including this in headers can cause issues due to unnecessary header re-instantiations.
```cpp
// Custom destructor in Person class with Pimpl idiom
Person::~Person() = default;  // Define a custom destructor explicitly
```
x??

---

#### Copy Constructor and Assignment Operator
Background context: In the Pimpl idiom, it is essential to correctly handle copy and move semantics to ensure that the smart pointer to the Impl struct is properly copied or moved.
:p How are the copy constructor and assignment operator implemented in the Pimpl idiom?
??x
The copy constructor and assignment operator for the main class need to be implemented to correctly copy or move the `std::unique_ptr` to the Impl struct. This involves using `std::make_unique()` and `operator=` on `std::unique_ptr`.
```cpp
// Copy constructor in Person class with Pimpl idiom
Person::Person(Person const& other)
    : pimpl_{ std::make_unique<Impl>(*other.pimpl_) }  // Copy construction of smart pointer
{}

// Assignment operator in Person class with Pimpl idiom
Person& Person::operator=(Person const& other) {
    *pimpl_ = *other.pimpl_;  // Use assignment operator on the unique_ptr
    return *this;
}
```
x??

---

#### Access Function Implementation
Background context: Access functions (public methods) in the Pimpl idiom typically involve accessing members of the smart pointer to the Impl struct.
:p How are access functions implemented in the Pimpl idiom?
??x
Access functions in the Pimpl idiom simply dereference the `std::unique_ptr` and access the corresponding data members or functions from the Impl struct. This ensures that the implementation details remain hidden while providing a clean interface to the users of the class.
```cpp
// Access function in Person class with Pimpl idiom
int Person::year_of_birth() const {
    return pimpl_->year_of_birth;  // Access year_of_birth from Impl through pimpl_
}
```
x??

---

