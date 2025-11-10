# High-Quality Flashcards: 10A005---C-Software-Design---Klaus-Iglberger_processed (Part 3)


**Starting Chapter:** Dont Repeat Yourself

---


#### Separation of Concerns in Design Patterns
This chapter introduces the concept of separation of concerns through design patterns, specifically focusing on how to manage dependencies and changeability in software systems. The goal is to ensure that different aspects of a system can be developed, modified, or tested independently from each other.
:p What is the main purpose of separating concerns using design patterns?
??x
The primary purpose is to enhance the modularity and maintainability of software by allowing specific functionalities (concerns) to be encapsulated within well-defined abstractions. This separation helps in managing dependencies and facilitates easier changes without affecting unrelated parts of the system.
??x
---

#### Introduction to Design Patterns: Visitor Pattern
Design patterns are reusable solutions to common problems that arise during software design. One such pattern is the Visitor, which allows adding new operations to a family of objects without modifying their classes.
:p How does the Visitor pattern work?
??x
The Visitor pattern decouples an algorithm from an object structure by defining a separate visitor class with methods for each operation (algorithm) on elements in the structure. This allows algorithms to be added later, and existing structures can handle these new operations without modification.
??x

```cpp
// Example of using the Visitor pattern
class Element {
public:
    virtual void accept(Visitor& v) = 0;
};

class ConcreteElementA : public Element {
public:
    void accept(Visitor& v) override { v.visit(*this); }
    // Other methods...
};

class Visitor {
public:
    virtual void visit(ConcreteElementA& element) = 0;
    // Other methods for different elements
};
```
x??

---

#### Introduction to Design Patterns: Strategy Pattern
The Strategy pattern lets an object define a family of algorithms, encapsulate each one, and make them interchangeable. The strategy lets the algorithm vary independently from clients that use it.
:p How does the Strategy pattern facilitate changeability?
??x
By encapsulating different ways of performing operations into separate classes (strategies), the Strategy pattern allows runtime selection of which operation to use based on context or conditions. This decouples algorithms from client code, making it easier to add new strategies without changing existing clients.
??x

```cpp
// Example using the Strategy pattern
class Context {
public:
    void setStrategy(Strategy* strategy) { strategy_ = strategy; }
    void request() { strategy_->execute(); }
private:
    Strategy* strategy_;
};

class Strategy {
public:
    virtual void execute() = 0;
};

class ConcreteStrategyA : public Strategy {
public:
    void execute() override { // Implementation for A strategy }
};
```
x??

---

#### Introduction to Design Patterns: External Polymorphism
External Polymorphism is a design technique that allows polymorphic behavior without changing the underlying object structure. It uses functions and delegates (callbacks) to achieve runtime flexibility.
:p How does External Polymorphism differ from traditional inheritance-based polymorphism?
??x
Unlike traditional polymorphism, which relies on subclassing and virtual method overriding, External Polymorphism introduces a layer of indirection using function pointers or delegate objects. This allows for dynamic dispatch based on runtime conditions without altering the class hierarchy.
??x

```cpp
// Example of External Polymorphism in C++
class Item {
public:
    virtual Money price() const = 0;
};

struct PriceCalculator {
    void calculatePrice(Item& item) {
        // Dynamic calculation logic using callbacks
    }
};
```
x??

---

#### Code Example: Item Class Hierarchy and Tax Rate
The provided code demonstrates how the Item class hierarchy handles varying tax rates across different items. The `price()` method in both `CppBook` and `ConferenceTicket` classes includes a static 15% tax rate.
:p What issue does this design raise when considering future changes?
??x
The design raises an issue of hardcoded tax rates, which makes it difficult to modify the tax percentage without changing the source code. If the tax rate needs to be adjusted in the future, all `price()` methods would need to be updated, potentially leading to bugs or maintenance issues.
??x
---

#### Code Example: Tax Rate Change Scenario
The example shows how the current design can handle varying tax rates through overriding methods in derived classes (`CppBook` and `ConferenceTicket`). However, it highlights that changes like lowering the tax rate from 15% to 12% would require modifying multiple files.
:p How does this scenario illustrate the problem of changeability?
??x
This scenario illustrates that changing the tax rate requires altering multiple files (e.g., `CppBook.cpp` and `ConferenceTicket.cpp`). This tight coupling makes it difficult to maintain the codebase, as any change in the tax rate necessitates updates across multiple locations.
??x


#### Single Responsibility Principle (SRP)
Background context: The SRP advises that a class, function, or module should have only one reason to change. This means each responsibility should exist only once within the system, making changes easier and more efficient.

:p What is the SRP in software design?
??x
The Single Responsibility Principle states that every class, function, or module should have only one reason to change. This implies that a class should focus on a single aspect of functionality, ensuring that modifications are localized to a minimal number of places within the system.
x??

---

#### Don’t Repeat Yourself (DRY) Principle
Background context: The DRY principle advises against duplicating information throughout the codebase. It encourages designing systems in such a way that changes can be made in one place and affect all relevant parts.

:p What is the DRY principle?
??x
The Don’t Repeat Yourself (DRY) principle suggests avoiding duplication of key information across multiple places within the system. The goal is to ensure that every piece of knowledge has a single, unambiguous representation within the system.
x??

---

#### SRP and DRY Together
Background context: Adhering to SRP often leads to adherence to the DRY principle as well, and vice versa. Both principles work together to make changes easier by minimizing redundancy and ensuring each responsibility is localized.

:p How do SRP and DRY principles interact?
??x
The SRP and DRY principles complement each other effectively. Adhering to SRP often results in fewer duplicated responsibilities, which naturally leads to the DRY principle being followed. Conversely, when designing for a single responsibility per unit, it’s easier to avoid duplicating that logic elsewhere.
x??

---

#### Premature Separation of Concerns
Background context: While SRP and DRY are valuable tools for maintainability, separating concerns too early without a clear understanding of future changes can lead to overcomplication. It is important to balance simplicity with the potential for change.

:p Why should we avoid premature separation of concerns?
??x
We should avoid prematurely separating concerns because it can lead to unnecessary complexity and potentially make other types of changes harder. Separation should be done only when there is a clear understanding of what kind of future changes are expected.
x??

---

#### YAGNI Principle
Background context: The You Aren’t Gonna Need It (YAGNI) principle warns against overengineering by building features that might not be needed in the near future, thus avoiding unnecessary complexity.

:p What is the YAGNI principle?
??x
The YAGNI (You Aren’t Gonna Need It) principle advises against implementing functionality that you don’t currently need. The idea is to focus on the minimum viable solution and add more features only when they are actually required.
x??

---

#### Unit Tests for Change Management
Background context: Unit tests provide a way to ensure that changes do not break existing functionality, thereby maintaining the integrity of the system during refactoring or modification.

:p Why are unit tests important in managing changes?
??x
Unit tests are crucial because they help verify that modifications do not break existing functionalities. They serve as a safety net, allowing developers to make changes with confidence, knowing they can quickly detect and address any issues.
x??

---

#### Design for Change
Background context: Designing systems with change in mind involves separating concerns and minimizing duplication, but doing so only when necessary based on anticipated future changes.

:p How should we approach designing for change?
??x
Design for change by first understanding the expected kinds of changes. Separate concerns and minimize redundancy where applicable, but avoid overengineering by implementing features only when they are truly needed.
x??

---


#### Segregation of Interfaces to Avoid Artificial Coupling
Background context: In the provided document, we see that a `Document` class is responsible for both exporting documents as JSON and serializing them. This combination creates coupling between orthogonal aspects (JSON export and serialization), which can lead to unnecessary dependencies in functions like `exportDocument()`. The Interface Segregation Principle (ISP) suggests that interfaces should be fine-grained, and no client should be forced to depend on methods it does not use.

:p What is the issue with the current implementation of the Document class?
??x
The issue lies in combining orthogonal aspects into a single interface. In this case, `Document` needs to handle both JSON export and serialization, which forces other functions (like `exportDocument()`) to depend on methods they do not use. This can lead to unnecessary recompilation and redeployment if any part of the Document class changes.

```cpp
class Document {
public:
    virtual ~Document() = default;
    virtual void exportToJSON(/*...*/) const = 0;
    virtual void serialize(ByteStream& bs, /*...*/) const = 0;
};
```
x??

---

#### Interface Segregation Principle (ISP)
Background context: The ISP states that no client should be forced to depend on methods it does not use. This principle helps in decoupling orthogonal functionalities and making software more adaptable.

:p How can the ISP be applied to solve the problem mentioned in the text?
??x
To apply ISP, we need to separate the Document interface into two distinct interfaces: one for JSON export and another for serialization. This way, clients only depend on what they need.

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
```

Then, the Document class can inherit from these interfaces:

```cpp
class Document : public JSONExportable, public Serializable {
public:
    // ...
};
```
x??

---

#### Separation of Concerns in Classes
Background context: By separating concerns into smaller, focused classes or interfaces, we reduce coupling and improve adaptability. This principle is part of the SOLID acronym and helps maintain a clean design.

:p Why should Document inherit from JSONExportable and Serializable?
??x
By inheriting from `JSONExportable` and `Serializable`, we ensure that only those parts of the Document class related to JSON export or serialization are exposed. This separation allows clients like `exportDocument()` to depend on fewer methods, making changes less likely to ripple through unrelated functionalities.

```cpp
class Document : public JSONExportable, public Serializable {
public:
    // ...
};
```
x??

---

#### Example of Interface Segregation in Practice
Background context: The provided example shows how the Document class can be refactored to separate concerns using inheritance. This approach ensures that only necessary methods are coupled together, reducing artificial dependencies.

:p How does separating JSON export and serialization into different classes help?
??x
Separating JSON export and serialization into their own interfaces (`JSONExportable` and `Serializable`) reduces coupling by making each client depend on fewer methods. For example, the `exportDocument()` function only depends on the JSON export functionality, which is more manageable and less likely to break due to unrelated changes.

```cpp
class Document : public JSONExportable, public Serializable {
public:
    // ...
};
```
x??

---

#### Client's Dependence on Unnecessary Methods
Background context: The provided example highlights how a function like `exportDocument()` might depend on methods it does not need (like serialization). This can lead to unnecessary recompilation and testing when changes are made.

:p How does the refactoring of Document into separate interfaces reduce this issue?
??x
By separating JSON export and serialization, each client (like `exportDocument()`) only depends on what it needs. In this case, `exportDocument()` would depend solely on the `JSONExportable` interface. If there are changes in `Serializable`, these will not affect functions that do not use it.

```cpp
class Document : public JSONExportable, public Serializable {
public:
    // ...
};
```
x??

---

#### Summary of Interface Segregation Principle (ISP)
Background context: ISP helps to keep interfaces focused and prevents clients from being forced to depend on methods they do not need. This principle is crucial for maintaining a clean design and reducing coupling.

:p What are the key benefits of applying ISP in class design?
??x
The key benefits include:
1. **Reduced Coupling**: Clients only depend on what they need.
2. **Improved Modularity**: Classes or interfaces become more focused, making them easier to maintain and extend.
3. **Enhanced Testability**: Smaller, more focused interfaces are easier to test.

```cpp
class Document : public JSONExportable, public Serializable {
public:
    // ...
};
```
x??

