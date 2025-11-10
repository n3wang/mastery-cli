# High-Quality Flashcards: 10A005---C-Software-Design---Klaus-Iglberger_processed (Part 20)


**Starting Chapter:** Analyzing the Shortcomings of the Adapter Design Pattern

---


#### Adapter Design Pattern Overview
Background context explaining how the Adapter design pattern allows different objects to collaborate despite incompatible interfaces. This is often done by providing a wrapper object that adapts one interface into another expected interface.

The example provided uses an abstract `Duck` class with pure virtual functions `quack()` and `fly()`, which are implemented in derived classes like `MallardDuck`. Similarly, there's an abstract `Turkey` class with different interfaces (`gobble()` and `fly()`) that need to be adapted for use with the Duck interface.

:p What is the main issue highlighted by this example regarding the Adapter design pattern?
??x
The main issue highlighted is the potential violation of Liskov Substitution Principle (LSP) when adapting objects from one class hierarchy into another. Specifically, while a turkey can fly and make a similar sound to a duck, it does not fully implement the expected `quack()` behavior, leading to potential misuse in contexts where ducks are expected.

In the example:
- A `TurkeyAdapter` is created to adapt a `WildTurkey` object to act as if it were a `Duck`.
- The `give_concert` function attempts to call `quack()` on each duck, including the turkey adapter. This results in the turkey making a gobble sound instead of quacking, causing the concert to be a "musical disaster."

The example demonstrates that while adapters can help integrate different interfaces, they must be used judiciously to avoid violating expected behaviors and principles.
x??

---
#### Duck and Turkey Interfaces
Explanation of how the Duck and Turkey classes are structured with their respective virtual functions.

:p What are the key differences between the Duck and Turkey interfaces in terms of methods?
??x
The key differences between the Duck and Turkey interfaces lie in the specific methods they define:

- **Duck Interface**:
  - `quack()`: Expected to make a duck-like sound.
  - `fly()`: Expected to enable flight.

- **Turkey Interface**:
  - `gobble()`: Represents the typical turkey sound.
  - `fly()`: Indicates the ability to fly, albeit not as well as ducks.

These differences highlight that while both interfaces include a `fly()` method, their implementations and expected behaviors differ significantly. A turkey can fly but cannot quack, which violates expectations for duck behavior.
x??

---
#### TurkeyAdapter Class
Explanation of how the `TurkeyAdapter` class is implemented to adapt a `WildTurkey` object to behave like a `Duck`.

:p What does the `TurkeyAdapter` class do?
??x
The `TurkeyAdapter` class adapts a `WildTurkey` object to conform to the expected interface of a `Duck`. It overrides the `quack()` and `fly()` methods from the `Duck` class, mapping them to corresponding `gobble()` and `fly()` methods in the `WildTurkey` class.

```cpp
#include <memory>

class TurkeyAdapter : public Duck {
public:
    explicit TurkeyAdapter(std::unique_ptr<Turkey> turkey)
        : turkey_{std::move(turkey)} {}

    void quack() override { turkey_->gobble(); }
    void fly() override { turkey_->fly(); }

private:
    std::unique_ptr<Turkey> turkey_;
};
```

- `quack()` in the adapter calls `turkey_->gobble()` to simulate a duck-like sound.
- `fly()` remains unchanged as both ducks and turkeys can fly, though with different capabilities.

This class demonstrates how an existing object (turkey) is adapted to fit into another interface (duck).
x??

---
#### DuckChoir Function
Explanation of the `DuckChoir` function that iterates over a collection of ducks and calls their `quack()` method.

:p What does the `give_concert` function do in the provided code?
??x
The `give_concert` function is designed to call the `quack()` method on each element within a `DuckChoir`, which is a container holding pointers or unique pointers to ducks. This function exemplifies how duck typing can be applied, but also highlights potential issues when mixing incompatible types.

```cpp
#include <vector>
using DuckChoir = std::vector<std::unique_ptr<Duck>>;

void give_concert(DuckChoir const& duck_choir) {
    for (auto const& duck : duck_choir) {
        duck->quack();
    }
}
```

In the example:
- A `DuckChoir` contains multiple ducks, including a `WildTurkey` wrapped in a `TurkeyAdapter`.
- When `give_concert` is called with this mixed collection, it will call `duck->quack()` on each element. For turkeys adapted as ducks, this results in calling the `gobble()` method instead of `quack()`, leading to unexpected behavior.
x??

---
#### Liskov Substitution Principle (LSP) Violation
Explanation of how the Adapter design pattern can lead to violations of the Liskov Substitution Principle if not used carefully.

:p How does the example illustrate a potential violation of the Liskov Substitution Principle?
??x
The example illustrates a potential violation of the Liskov Substitution Principle (LSP) by showing that when adapting a `WildTurkey` using a `TurkeyAdapter`, it does not fully adhere to the expected behavior of a duck. Specifically:

- The `quack()` method in a duck is supposed to produce a characteristic quacking sound, but the adapter makes the turkey "quack" with its gobble sound.
- The `fly()` method in both ducks and turkeys can be similar in functionality, but the context expects different behaviors. For example, the adapted turkey might fly short distances, which is not the primary expectation for a duck.

These discrepancies indicate that while the adapter allows integration of the turkey into the duck hierarchy, it does so at the cost of violating expected interface behavior, thus potentially breaking LSP.
x??

---


#### Adapter Design Pattern: Object Adapters

Background context explaining the concept. The Adapter design pattern is used to adapt an existing interface of a class into another one that is required by the client. It allows objects with incompatible interfaces to collaborate. This pattern is useful for both dynamic and static polymorphism.

:p What is an object adapter in the Adapter design pattern?
??x
An object adapter is a structure that implements the target interface, which is what the client needs. The adapter contains a reference to an object of the adaptee class (the original class with the incompatible interface), and it forwards requests from the target interface to the adaptee's interface.

For example, consider you have a `LegacyPrinter` class with an `printText()` method and you want to adapt it so that it can be used as if it were implementing `Printable` interface:

```java
// Adaptee class (Legacy Printer)
class LegacyPrinter {
    void printText(String text) { 
        // Print logic here
    }
}

// Target Interface (Printable)
interface Printable {
    void printDocument(Document doc);
}
```

The adapter might look like this:
```java
// Object Adapter
class PrinterAdapter implements Printable {
    private LegacyPrinter legacyPrinter;

    public PrinterAdapter(LegacyPrinter legacyPrinter) {
        this.legacyPrinter = legacyPrinter;
    }

    @Override
    public void printDocument(Document doc) {
        // Convert Document to Text for printing
        String text = doc.getText();
        legacyPrinter.printText(text);
    }
}
```
x??

---

#### Adapter Design Pattern: Class Adapters

:p What is a class adapter in the Adapter design pattern?
??x
A class adapter is another form of adapting an interface by inheriting from both the adaptee and the target classes. This approach allows you to implement the target interface directly within the derived class, using the methods provided by the adaptee.

For example, if `LegacyPrinter` is a class that provides a method `printText()`, and we want to use it with an adapter that implements the `Printable` interface:

```java
// Adaptee class (Legacy Printer)
class LegacyPrinter {
    void printText(String text) { 
        // Print logic here
    }
}

// Target Interface (Printable)
interface Printable {
    void printDocument(Document doc);
}
```

A class adapter might look like this:
```java
// Class Adapter
class PrinterAdapter extends LegacyPrinter implements Printable {
    
    @Override
    public void printDocument(Document doc) {
        // Convert Document to Text for printing
        String text = doc.getText();
        super.printText(text); // Use the printText method from the LegacyPrinter class
    }
}
```

x??

---

#### Adapter vs Strategy Design Pattern

:p How do the Adapter and Strategy design patterns differ?
??x
The Adapter pattern is used when you want to make existing classes work with a new system. It adapts an interface by wrapping it in another interface that clients expect, allowing incompatible interfaces to collaborate.

On the other hand, the Strategy pattern provides a way to define a family of algorithms, encapsulate each one, and make them interchangeable. Strategies are used when you want different behaviors to be interchangeable, without modifying the client code.

For example:
- **Adapter**: If you have an old class `LegacyPrinter` that prints text and you need to use it as if it were part of a new system `Printable`, you would use an Adapter.
- **Strategy**: If you have multiple ways of printing (like different printer brands), each with its own behavior, you could encapsulate these behaviors using the Strategy pattern.

```java
// Example of Strategy Pattern
interface Printer {
    void print(String text);
}

class FastPrinter implements Printer {
    @Override
    public void print(String text) {
        // Fast printing logic here
    }
}

class SlowPrinter implements Printer {
    @Override
    public void print(String text) {
        // Slow printing logic here
    }
}
```
x??

---

#### LSP Violations in Adapter Pattern

:p What is the Liskov Substitution Principle (LSP) and how can it be violated when using the Adapter pattern?
??x
The Liskov Substitution Principle states that objects of a superclass shall be replaceable with objects of its subclasses without breaking the application.

A violation occurs if the adapter introduces behavior or state in the target interface that is not present in the adaptee's original interface. This can lead to unexpected outcomes when the adapter is used as part of an inheritance hierarchy where it is supposed to behave like a subclass but does more than what it should.

For example, consider the following scenario:
- `LegacyPrinter` prints text only.
- An `EnhancedAdapter` that wraps `LegacyPrinter` and extends its functionality to print images.

```java
// Adaptee class (Legacy Printer)
class LegacyPrinter {
    void printText(String text) { 
        // Print logic here
    }
}

// Target Interface (Printable)
interface Printable {
    void printDocument(Document doc);
}
```

The adapter might have a method for printing images, which violates LSP:
```java
// Violating LSP in Adapter
class EnhancedAdapter extends LegacyPrinter implements Printable {
    
    @Override
    public void printDocument(Document doc) {
        // Convert Document to Text and Image
        String text = doc.getText();
        if (doc.hasImage()) {
            // Print image logic here, which is not part of the original interface
        }
        super.printText(text);
    }
}
```

To avoid this violation, ensure that the adapter only provides what is necessary to adapt the existing behavior.

x??

---

#### Observer Design Pattern

Background context explaining the concept. The Observer design pattern defines a one-to-many dependency between objects so that when one object changes state, all its dependents are notified and updated automatically. This decouples software entities from each other, making it easier to extend and change them independently.

:p What is the intent of the Observer design pattern?
??x
The intent of the Observer design pattern is "Define a one-to-many dependency between objects so that when one object changes state, all its dependents are notified and updated automatically."

In this pattern, a subject maintains a list of observers and notifies them whenever it changes. Observers can be added or removed dynamically without affecting the subject.

For example:
- A `MessageQueue` is the subject.
- Users who want to know when new messages arrive are attached as observers to the queue.

```java
// Observer interface
interface Observer {
    void update(String message);
}

// Subject interface (Abstract)
interface Subject {
    void addObserver(Observer o);
    void removeObserver(Observer o);
    void notifyObservers();
}
```

A concrete implementation might look like:
```java
class MessageQueue implements Subject {
    private List<Observer> observers = new ArrayList<>();

    public void addObserver(Observer observer) {
        observers.add(observer);
    }

    public void removeObserver(Observer observer) {
        observers.remove(observer);
    }

    public void notifyObservers(String message) {
        for (Observer o : observers) {
            o.update(message);
        }
    }

    // Add a new message to the queue
    public void addMessage(String message) {
        // Add logic to handle messages
        notifyObservers(message); // Notify all observers
    }
}
```

x??

---


#### Observer Pattern - Introduction and Design Principles

Background context: The Observer pattern is a behavioral design pattern that addresses the problem of defining a dependency between objects. It allows subjects to notify observers about state changes without tightly coupling them, thus promoting loose coupling.

The Observer pattern adheres to several principles:
- Single Responsibility Principle (SRP): The introduction of an `Observer` base class separates concerns.
- Open-Closed Principle (OCP): New types of observers can be added without modifying existing code.
- Dependency Inversion Principle (DIP): Observers should not depend on subjects, but both should depend on abstractions.

:p What is the SRP and how does introducing the Observer class exemplify it?
??x
The Single Responsibility Principle states that a class or module should have only one reason to change. By separating the `Observer` class from the subject, we ensure each component has a single responsibility: observers update themselves based on state changes, while subjects notify their observers.

```cpp
// Example Observer Interface in C++
class Observer {
public:
    virtual ~Observer() = default;
    virtual void update(double value) = 0; // Simplified version of the interface
};
```
x??

---

#### Observer Pattern - Base Class Implementation

Background context: The `Observer` class serves as an abstract base class that defines the contract for all observers. It includes a pure virtual function, `update()`, which must be implemented by derived classes.

:p What is the role of the `Observer` base class in the pattern?
??x
The `Observer` base class acts as a template or interface for all concrete observers. By defining an abstract `update()` method, it ensures that any observer must provide its own implementation to handle state changes.

```cpp
// Example Observer Base Class in C++
class Observer {
public:
    virtual ~Observer() = default;
    virtual void update(double value) = 0; // Pure virtual function
};
```
x??

---

#### Push Observer Implementation

Background context: A push observer is a type of observer that receives updates from the subject by pushing data into it. This reduces coupling between the subject and observers, as the observer does not need to pull information.

:p How does the `Observer` class support multiple update methods in the context of push observers?
??x
The `Observer` class can define multiple pure virtual functions to handle different types of updates. Each derived class must implement these methods according to its specific needs.

```cpp
// Example Observer with Multiple Update Methods
class Observer {
public:
    virtual ~Observer() = default;
    
    // Virtual function for handling one type of update
    virtual void update1(double value) = 0;

    // Virtual function for handling another type of update
    virtual void update2(double value) = 0;
};
```
x??

---

#### Observer - Limitations and Variants

Background context: The example provided is a classic implementation but does not address all possible complexities, such as managing the order of notifications, attaching or detaching observers multiple times, or handling concurrent environments.

:p What are some limitations of the basic `Observer` class implementation?
??x
Some limitations include:
- Order of notification: Observers might need to be notified in a specific order.
- Multiple attachments: An observer might be attached multiple times.
- Concurrent environments: The pattern must handle race conditions and ensure thread safety.

These complexities can significantly complicate the implementation but are beyond the scope of this basic example.

```cpp
// Example Observer with Potential Issues Not Addressed Here
class Observer {
public:
    virtual ~Observer() = default;
    
    // Virtual function for handling one type of update
    virtual void update1(double value) = 0;

    // Virtual function for handling another type of update
    virtual void update2(double value) = 0;
};
```
x??

---

#### Observer - Design Flexibility

Background context: The basic `Observer` class design offers flexibility in how observers handle updates. For instance, multiple update methods can be defined to provide different types of state changes.

:p What benefits does having multiple update methods in the `Observer` class offer?
??x
Having multiple update methods allows for more granular and flexible handling of state changes. Each observer can react differently based on the type of change it receives, promoting reuse and modularity.

```cpp
// Example with Multiple Update Methods
class Observer {
public:
    virtual ~Observer() = default;
    
    // Virtual function for handling one type of update
    virtual void update1(double value) = 0;

    // Virtual function for handling another type of update
    virtual void update2(double value) = 0;
};
```
x??

---

#### Observer - Abstract Base Class vs. Interface

Background context: The `Observer` class is defined as an abstract base class with pure virtual functions, which means derived classes must implement these methods. This approach ensures that observers always provide a specific implementation.

:p How does defining the `Observer` class as an abstract base class promote code design?
??x
Defining the `Observer` class as an abstract base class ensures that all concrete observer implementations will provide necessary functionality (update methods). This promotes code design by enforcing a contract and ensuring consistent behavior across different observers.

```cpp
// Example Observer Base Class in C++
class Observer {
public:
    virtual ~Observer() = default;
    
    // Pure virtual function for handling one type of update
    virtual void update1(double value) = 0;

    // Pure virtual function for handling another type of update
    virtual void update2(double value) = 0;
};
```
x??

---


#### State Change Handling Through Overloads

In scenarios where a subject needs to notify observers about state changes, different observers might be interested in different types of state changes. To handle this, you can have multiple `update()` functions, each for a specific type of state change.

Background context: This approach is useful when the subject has several distinct states and certain observers are only interested in some of those states.
:p How does handling state changes through overloads work?
??x
Handling state changes through overloads allows you to define different `update()` functions, each responsible for a specific type of state change. When an update occurs, only the relevant observer needs to be notified, which can improve efficiency.

For example:
```cpp
class Observer {
public:
    virtual void update1(/* arguments */) = 0; // For one type of state change
    virtual void update2(/* arguments */) = 0; // For another type of state change
};
```
In this case, if only `update1` is relevant for a particular observer, it won't need to handle unnecessary notifications.

The subject can notify the observers like so:
```cpp
class Subject {
public:
    void notifyObservers() {
        // Determine which states have changed and call appropriate update functions
        Observer* obs = getObserver(); // Assume this function returns an observer
        if (state1Changed) {
            obs->update1(args1);
        }
        if (state2Changed) {
            obs->update2(args2);
        }
    }
};
```
x??

---
#### Potential Violation of ISP

In the context of the Observer design pattern, sometimes it is necessary to have a single `update()` function that handles multiple state changes. This can raise concerns about the Interface Segregation Principle (ISP).

Background context: ISP states that no client should be forced to depend on methods it does not use. In this case, an observer might receive unnecessary notifications.
:p Can having a single update() function for multiple state changes violate ISP?
??x
Having a single `update()` function for multiple state changes can indeed raise concerns about the Interface Segregation Principle (ISP). ISP suggests that a class should not be forced to implement methods it does not use. In this case, an observer might receive unnecessary notifications if its implementation is not tailored to specific types of updates.

To address this, you could split the `update()` function into multiple specialized functions like `update1()` and `update2()`, each handling a different type of state change.
```cpp
class Observer {
public:
    virtual void update1(/* arguments */) = 0; // Handle one type of state change
    virtual void update2(/* arguments */) = 0; // Handle another type of state change
};
```
This approach ensures that observers only receive relevant notifications, reducing unnecessary work.

However, the subject (the class being observed) still expects all possible updates. Therefore, it might not be practical to implement multiple `update()` functions in the subject.
x??

---
#### Push Observer vs Pull Observer

When implementing the Observer pattern, you have two main approaches: push and pull observers. A push observer is notified by the subject regardless of whether it needs the information or not.

Background context: Push observers can lead to unnecessary notifications if they are not designed carefully. This can waste processing power.
:p What is a push observer?
??x
A push observer is an observer that receives updates from the subject, regardless of whether the observer actually needs that update at the moment. The subject pushes all necessary information to the observer without considering whether the observer will use it.

For example:
```cpp
class Observer {
public:
    virtual void update(/* arguments */) = 0; // Pushes data to observers without checking if needed
};
```
The subject can notify observers like so:
```cpp
class Subject {
public:
    void pushUpdate() {
        for (auto& observer : observers) { // Assume this is a list of observers
            observer->update(args); // All observers get the update, whether they need it or not
        }
    }
};
```
This approach can lead to unnecessary notifications and increased processing overhead.
x??

---
#### Pull Observer

In contrast to push observers, pull observers request updates from the subject only when needed.

Background context: Pull observers are more efficient as they only request information that is relevant at that moment. However, implementing this pattern requires careful design.
:p What is a pull observer?
??x
A pull observer requests updates from the subject explicitly when it needs them. This approach ensures that unnecessary notifications are minimized, leading to improved efficiency.

For example:
```cpp
class Observer {
public:
    virtual void requestUpdate() = 0; // Request an update only when needed
};
```
The subject can be designed as follows:
```cpp
class Subject {
public:
    void provideUpdate(Observer* observer) {
        if (observer->requestUpdate()) { // Observer requests the update
            // Provide relevant state data to the observer
        }
    }
};
```
In this design, observers only receive updates when they explicitly request them.
x??

---


#### Notify Function Implementation Complexity
Background context explaining why `notify()` function is implemented as it is. The implementation ensures that detach operations can be detected during iteration, allowing observers to remove themselves from the list while being notified.

:p Why is the notify() function's implementation more complex than a simple range-based for loop?
??x
The notify() function uses an iterator approach with explicit increment and condition checks to allow for dynamic modification of the observer list during notifications. This complexity ensures that if an observer decides to detach itself, it can do so without causing issues in the notification process.

```cpp
void Person::notify(StateChange property) {
    for (auto iter = begin(observers_); iter != end(observers_); ) {
        auto const pos = iter++;
        (*pos)->update(*this, property);
    }
}
```
The function iterates over the observers list while checking each observer's update method. If an observer detaches itself within its `update` method, it will be skipped in subsequent iterations.

x??

---

#### Multiple Setters for Property Changes
Explanation of why different setter functions use a specific tag to indicate which property has changed. This tagging allows derived classes to handle changes more effectively.

:p Why do the setter functions (forename(), surname(), address()) pass a different tag to indicate which property has changed?
??x
The setter functions pass a different `StateChange` tag to notify observers about the specific type of change in properties. This mechanism enables derived observer classes to distinguish between different changes and react accordingly.

```cpp
void Person::forename(std::string newForename) {
    forename_ = std::move(newForename);
    notify(forenameChanged);
}

void Person::surname(std::string newSurname) {
    surname_ = std::move(newSurname);
    notify(surnameChanged);
}

void Person::address(std::string newAddress) {
    address_ = std::move(newAddress);
    notify(addressChanged);
}
```
For example, in the `forename()` and `surname()` setters, `forenameChanged` or `surnameChanged` tags are passed to indicate changes. This allows observers like `NameObserver` to only react to name-related changes.

x??

---

#### Observer Derivation with Specialization
Explanation of how derived observer classes can specialize their behavior based on the specific state changes they handle.

:p How do derived observer classes like NameObserver and AddressObserver work in this example?
??x
Derived observer classes like `NameObserver` and `AddressObserver` inherit from a base class that specifies which type of `Person` and what state change tags it should respond to. They override the `update()` method to handle specific changes:

```cpp
class NameObserver : public Observer<Person, Person::StateChange> {
public:
    void update(Person const& person, Person::StateChange property) override;
};

void NameObserver::update(Person const& person, Person::StateChange property) {
    if (property == Person::forenameChanged || property == Person::surnameChanged) {
        // ... Respond to changed name
    }
}
```
In this example, `NameObserver` responds only when the `forename` or `surname` of a `Person` changes. Similarly, an `AddressObserver` would handle address-related state changes.

x??

---

#### Example Observer Usage
Explanation of how observers are attached and used in practice to react to property changes.

:p How do NameObserver and AddressObserver work together with Person objects?
??x
Observers like `NameObserver` and `AddressObserver` can be attached to specific `Person` instances to respond to particular state changes. For example:

```cpp
#include <iostream>
#include "NameObserver.h"
#include "AddressObserver.h"
#include "Person.h"

int main() {
    NameObserver nameObserver;
    AddressObserver addressObserver;

    Person homer("Homer", "Simpson");
    Person marge("Marge", "Simpson");
    Person monty("Montgomery", "Burns");

    // Attaching observers
    homer.attach(&nameObserver);
    marge.attach(&addressObserver);
    monty.attach(&addressObserver);

    // Updating information on Homer Simpson
    homer.forename("Homer Jay");  // Adding his middle name

    // Updating information on Marge Simpson
    marge.address("712 Red Bark Lane, Henderson, Clark County, Nevada 89011");

    // Updating information on Montgomery Burns
    monty.address("Springfield Nuclear Power Plant");

    // Detaching observers
    homer.detach(&nameObserver);

    return EXIT_SUCCESS;
}
```
In this example, `homer`'s name change and `marge` and `monty`'s address changes trigger specific responses in their respective observers.

x??

---

#### Dependency Graph of Observer Example
Explanation of the dependency graph that visualizes how different parts of the observer pattern interact.

:p What does Figure 6-3 show, and why is it important?
??x
Figure 6-3 shows the dependency graph for the observer example. It illustrates the relationships between `Person` objects and their observers (`NameObserver` and `AddressObserver`). This visualization helps in understanding how state changes propagate through the system and which components are affected.

The graph would typically depict:
- Nodes representing `Person` instances.
- Directed edges showing how state changes from one node (e.g., a person's name or address) trigger updates on observer nodes.

This dependency graph is important for visualizing the flow of notifications and understanding the impact of changes in the system.

x??

---

