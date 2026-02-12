# High-Quality Flashcards: 10A005---C-Software-Design---Klaus-Iglberger_processed (Part 8)


**Starting Chapter:** Guideline 9 Pay Attention to the Ownership of Abstractions. The Dependency Inversion Principle

---


#### Function Overloading and Semantic Requirements

Function overloading allows defining multiple functions with the same name but different parameters, which is a powerful compile-time abstraction mechanism. However, it comes with semantic requirements that must be adhered to, similar to base classes and concepts.

:p What are the key points about function overloading mentioned in the text?
??x
The key points include understanding that function overloading should not be underestimated due to its power in generic programming but also recognizing that it is subject to the Liskov Substitution Principle (LSP). Overload sets represent semantic requirements and must adhere to expected behaviors, or issues may arise. Additionally, attention should be paid to existing names and conventions.

```java
public class Example {
    // Overloaded methods
    public void show(int a) { System.out.println("Integer: " + a); }
    public void show(double b) { System.out.println("Double: " + b); }
}
```
x??

---

#### Semantic Requirements of Overload Sets

The text emphasizes the importance of understanding the semantic requirements of overload sets. These expectations ensure that functions within an overload set behave as intended, adhering to expected behaviors.

:p What does the text advise regarding function overloading?
??x
The text advises developers to be aware of the compile-time abstraction mechanism provided by function overloading and the semantic requirements associated with it. It emphasizes that these expectations must be met to ensure proper functionality. Failure to adhere to these expectations can lead to issues in the application.

```java
public class Example {
    // Overloaded method examples
    public void process(int value) { System.out.println("Processing integer: " + value); }
    public void process(double value) { System.out.println("Processing double: " + value); }
}
```
x??

---

#### Introduction of Abstractions

The text discusses the importance of introducing abstractions to deal with change in software development, aiming to reduce dependencies and make changes easier.

:p What does the Dependency Inversion Principle (DIP) state?
??x
The Dependency Inversion Principle advises that for dependencies, you should depend on abstractions instead of concrete types or implementation details. This means that source code dependencies should refer only to abstractions rather than concrete implementations.

```java
public class Example {
    // Abstraction example
    interface Transaction {
        void execute();
        void rollback();
    }

    // Concrete implementations inheriting from the abstraction
    class Deposit implements Transaction {
        @Override
        public void execute() { System.out.println("Executing deposit transaction."); }
        @Override
        public void rollback() { System.out.println("Rolling back deposit transaction."); }
    }

    class Withdrawal implements Transaction {
        // Similar implementation for withdrawal
    }

    class Transfer implements Transaction {
        // Similar implementation for transfer
    }
}
```
x??

---

#### Transactions and UI Dependency

The text provides an example of a transaction-based system, highlighting the issues arising from direct dependencies on concrete implementations.

:p What problem does the text illustrate with transactions and user interface (UI) classes?
??x
The text illustrates how directly depending on a concrete UI class can lead to architectural problems. Adding new transactions may require modifying the UI class, which in turn affects all other transactions due to their direct dependency. This introduces maintenance issues as changes propagate through multiple components.

```java
public class Example {
    // Simplified transaction and UI classes
    interface TransactionUI {
        int requestAmount();
        void informUser(String message);
    }

    class ATM {
        private TransactionUI ui;

        public ATM(TransactionUI ui) { this.ui = ui; }

        public void deposit() {
            int amount = ui.requestAmount();
            // Process deposit
            ui.informUser("Deposit successful.");
        }
    }
}
```
x??

---

#### Dependency Inversion in Action

The text explains the need to introduce multiple abstractions and their benefits, especially when dealing with change.

:p How does the introduction of abstraction solve dependency issues?
??x
By introducing separate abstractions for each transaction (e.g., DepositUI, WithdrawalUI), the dependencies between transactions are broken. Each transaction now depends on a lightweight abstraction that represents only the necessary operations. This local inversion of dependencies ensures that adding new transactions or modifying UI functionalities does not affect existing transactions.

```java
public class Example {
    // Abstractions for different transactions
    interface DepositUI { int requestAmount(); }
    interface WithdrawalUI { int requestAmount(); }
    interface TransferUI { int requestAmount(); }

    // Concrete implementations of the abstractions
    class ATM {
        private DepositUI depositUI;
        private WithdrawalUI withdrawalUI;
        private TransferUI transferUI;

        public ATM(DepositUI ui) { this.depositUI = ui; }
        public ATM(WithdrawalUI ui) { this.withdrawalUI = ui; }
        public ATM(TransferUI ui) { this.transferUI = ui; }

        public void deposit() {
            int amount = depositUI.requestAmount();
            // Process deposit
        }

        public void withdraw() {
            int amount = withdrawalUI.requestAmount();
            // Process withdrawal
        }

        public void transfer() {
            int amount = transferUI.requestAmount();
            // Process transfer
        }
    }
}
```
x??

---


#### Dependency Inversion Principle (DIP)
Background context: The Dependency Inversion Principle states that high-level modules should not depend on low-level modules, but both should depend on abstractions. Abstractions should not depend upon details; details should depend upon abstractions.

This concept is important in ensuring a flexible and maintainable design by decoupling components of an application.
:p What does the Dependency Inversion Principle (DIP) state?
??x
The DIP states that high-level modules should not depend on low-level modules, but both should depend on abstractions. This ensures that dependencies are inverted such that abstractions do not depend upon details; details should depend upon abstractions.
x??

---
#### Abstraction Ownership and Grouping
Background context: Proper architecture requires that the abstraction be owned by the high level of the system. This helps in adhering to Single Responsibility Principle (SRP) as well, since it groups the transaction classes with dependent UI abstractions.

The goal is to ensure that dependencies flow from low-level modules to high-level modules.
:p How does assigning ownership of abstractions to the high level impact SRP and DIP?
??x
Assigning ownership of abstractions to the high level ensures that the high level owns the interfaces, making it easier to adhere to the Single Responsibility Principle (SRP) because transaction classes and dependent UI abstractions are grouped together. This also properly inverts dependencies, ensuring they flow from low-level modules to high-level modules.
x??

---
#### Plug-in Architecture Misalignment
Background context: In a plug-in architecture, the Editor class should not directly depend on concrete plug-ins like VimModePlugin. Instead, it should depend on an abstract Plugin class.

This misalignment can cause issues where every new plug-in requires changes in the Editor class, violating DIP and SRP.
:p Why is having the high-level Editor depend on low-level VimModePlugin problematic?
??x
Having the high-level Editor depend on low-level VimModePlugin directly creates a tight coupling between the core system (Editor) and the community-developed plug-ins. This violates DIP because dependencies should flow from the low level to the high level, not vice versa. Additionally, it violates SRP as changes in the VimModePlugin would require changes in the Editor, making maintenance difficult.
x??

---
#### Correcting the Plug-in Architecture
Background context: To correct the misalignment, an abstract Plugin class is introduced at the high level, which defines the common interface for all plugins.

This ensures that the high-level Editor depends on abstractions provided by the low-level plug-ins, aligning with DIP and SRP.
:p How does introducing a Plugin base class as an abstraction resolve issues in the plug-in architecture?
??x
Introducing a Plugin base class at the high level provides a common interface for all plugins. This allows the Editor to depend on this abstract class rather than concrete implementations like VimModePlugin, properly inverting dependencies and adhering to SRP by grouping related functionalities together.
x??

---
#### Code Example of Corrected Plug-in Architecture
Background context: The code example illustrates how to correctly implement a plug-in architecture where the high-level classes depend on abstractions defined at the low level.

This ensures that changes in plug-ins do not affect the core system, promoting modularity and ease of maintenance.
:p Provide an example of how the corrected plug-in architecture should look in code?
??x
Here is an example of a correctly implemented plug-in architecture:
```cpp
//---- <yourcode/Plugin.h> ----------------
class Plugin {
    // Abstract interface for all plugins
};

//---- <thirdparty/VimModePlugin.h> ----------------
#include "yourcode/Plugin.h"
class VimModePlugin : public Plugin {
    // Concrete implementation of a plugin
};

//---- <yourcode/Editor.h> ----------------
#include "yourcode/Plugin.h"  // Correct direction of dependencies.
class Editor {
    std::vector<Plugin*> plugins;
public:
    void addPlugin(Plugin* p) { plugins.push_back(p); }
};
```
In this example, the high-level `Editor` class depends on the abstract `Plugin` interface defined at the low level. This ensures that the editor can be extended with new plug-ins without changing its core logic.
x??


#### Dependency Inversion via Templates
Background context: The Dependency Inversion Principle (DIP) is a principle of software design that suggests high-level modules should not depend on low-level modules, but both should depend on abstractions. This can be achieved through templates where the abstraction is owned by the higher level.

The `std::copy_if()` algorithm from the C++ Standard Library adheres to DIP via its template parameters: `InputIt`, `OutputIt`, and `UnaryPredicate`. These templates represent the requirements that need to be fulfilled by the caller. By specifying these requirements, the algorithm makes other code depend on itself rather than depending on the specifics of the types used.

:p How does the `std::copy_if()` algorithm adhere to DIP?
??x
The `std::copy_if()` function template adheres to DIP because it abstracts over the iterator and predicate types. The caller must provide iterators (`InputIt`, `OutputIt`) and a unary predicate, ensuring that any type used for these parameters meets certain requirements (e.g., supporting the required operations).

```cpp
template< typename InputIt, typename OutputIt, typename UnaryPredicate >
OutputIt copy_if( InputIt first, InputIt last, OutputIt d_first, UnaryPredicate pred );
```
x??

---

#### Dependency Inversion via Overload Sets
Background context: Overload sets can also be used to implement the DIP. An overload set represents a set of functions that share the same name but differ in their parameter types or return types. The calling code must choose which function from the set to call based on its parameters.

In the example provided, `Widget<T>` is a template class that holds a value of type `T`. The `swap()` function for `Widget` leverages the semantic expectations of the standard library's `swap()` function.

:p How does the `Widget` class demonstrate dependency inversion via overload sets?
??x
The `Widget` class demonstrates DIP by owning the requirements for its swap operation. Despite not knowing the type `T`, it provides a default implementation that relies on the `swap()` function of `T` following certain expectations and adhering to the Liskov Substitution Principle (LSP).

```cpp
// Widget.h
#include <utility>

template< typename T >
struct Widget {
    T value;
};

// swap function for Widget
template< typename T >
void swap(Widget<T>& lhs, Widget<T>& rhs) {
    using std::swap;
    swap(lhs.value, rhs.value);
}
```
x??

---

#### Dependency Inversion in Templates
Background context: When designing classes or functions with templates, the ownership of abstractions is crucial. By specifying template parameters, you define requirements that must be met by any type used in these templates.

In the `std::copy_if()` algorithm, the template parameters (`InputIt`, `OutputIt`, and `UnaryPredicate`) are the high-level requirements that need to be satisfied by the caller's code.

:p How do template parameters contribute to dependency inversion?
??x
Template parameters allow the template class or function to define a set of constraints on types used within it. By specifying these constraints, the template class or function can make other code depend on itself rather than depending on specific implementations.

For example, in `std::copy_if()`:
```cpp
template< typename InputIt, typename OutputIt, typename UnaryPredicate >
OutputIt copy_if( InputIt first, InputIt last, OutputIt d_first, UnaryPredicate pred );
```
The caller must provide types that satisfy the requirements of iterators and predicates. The algorithm itself does not depend on specific implementations but rather ensures that the provided types meet its semantic expectations.

x??

---

#### Widget Class Template
Background context: The `Widget` class template demonstrates how a high-level abstraction can define semantic requirements through an overload set, ensuring other code depends on these requirements instead of specific implementations.

In the example, the `Widget` class has a data member of type `T`, and it provides a `swap()` function that relies on the `std::swap()` function for its semantics.

:p How does the `Widget` template ensure dependency inversion?
??x
The `Widget` template ensures dependency inversion by providing an implementation for the `swap()` function that leverages the semantic expectations of the `std::swap()` function. This means that any type used in a `Widget` must provide a suitable swap operation.

```cpp
// Widget.h
#include <utility>

template< typename T >
struct Widget {
    T value;
};

// std::swap implementation (assumed from std library)
void swap(int& x, int& y) { /* ... */ }

int main() {
    Widget<std::string> w1{ "Hello" };
    Widget<std::string> w2{ "World" };

    swap(w1, w2);

    assert(w1.value == "World");
    assert(w2.value == "Hello");

    return EXIT_SUCCESS;
}
```
x??

---

#### High-Level vs Low-Level
Background context: In software architecture, the high-level modules define and own the requirements (abstractions) that lower-level modules must satisfy. This is a key aspect of dependency inversion.

In the case of `std::copy_if()`, the algorithm owns the concepts `InputIt`, `OutputIt`, and `UnaryPredicate`. Containers and predicates depend on these concepts, not vice versa.

:p How does high-level ownership contribute to dependency inversion?
??x
High-level ownership contributes to dependency inversion by ensuring that lower-level modules (like containers and predicates) depend on abstractions defined at the high level. This means that if a higher-level module defines an interface or concept, any lower-level code must adhere to this definition, rather than depending on specific implementations.

In the context of `std::copy_if()`, it owns the concepts `InputIt`, `OutputIt`, and `UnaryPredicate`. Containers and predicates (like vectors, lists, and lambda functions) depend on these concepts, ensuring that they meet certain requirements.

x??

---

#### Summary
These flashcards cover various aspects of dependency inversion using templates and overload sets. By defining high-level abstractions and making lower-level code dependent on them, you can ensure a cleaner and more maintainable architecture.

---

