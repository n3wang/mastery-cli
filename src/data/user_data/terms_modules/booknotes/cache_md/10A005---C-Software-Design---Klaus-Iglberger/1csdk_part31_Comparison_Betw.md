# High-Quality Flashcards: 10A005---C-Software-Design---Klaus-Iglberger_processed (Part 31)


**Starting Chapter:** Comparison Between Decorator Adapter and Strategy

---


#### CustomAllocator Overview
Background context explaining how CustomAllocators can be used to extend standard library behavior without modifying existing code. This involves understanding memory management and allocation strategies.

:p How is a `CustomAllocator` utilized in extending allocator behavior?
??x
A `CustomAllocator` allows you to customize the way memory is allocated and deallocated, providing an extensible interface for handling allocations. By constructing it with an existing allocator like `std::pmr::new_delete_resource()`, you can plug it into a custom resource manager like `std::pmr::monotonic_buffer_resource`. This non-intrusive approach enables you to extend the behavior of memory management without altering any other parts of your program.

```cpp
#include <CustomAllocator.h>

int main() {
    CustomAllocator custom_allocator{ std::pmr::new_delete_resource() };
    
    std::pmr::monotonic_buffer_resource buffer{ &custom_allocator };
}
```
x??

---

#### Difference Between Decorator and Adapter
Background context explaining the purpose and use cases of both design patterns, highlighting how they differ in their approach to modifying interfaces.

:p How do the Decorator and Adapter design patterns differ?
??x
The Decorator pattern allows for adding responsibilities or functionality to objects dynamically by wrapping them with additional objects. It preserves the original interface, focusing on extending capabilities without altering the existing interface structure. The Adapter pattern, on the other hand, changes an interface so it conforms to another expected interface but does not add any new functionality; its primary goal is to make two interfaces compatible.

For example:
```cpp
// Decorator Example
class Text {
public:
    virtual ~Text() = default;
    virtual void show() const = 0;
};

class Bold : public Text {
private:
    std::shared_ptr<Text> wrapped_text_;
public:
    Bold(std::shared_ptr<Text> text) : wrapped_text_(text) {}
    void show() const override { 
        // Add bold formatting
        std::cout << "<b>";
        wrapped_text_->show();
        std::cout << "</b>";
    }
};

// Adapter Example
class NewFormat {
public:
    void newShow() { /* ... */ }
};
class OldFormatAdapter : public Text {
private:
    std::unique_ptr<NewFormat> new_format_;
public:
    OldFormatAdapter(std::unique_ptr<NewFormat> format) : new_format_(std::move(format)) {}
    void show() const override {
        // Convert to old format
        std::cout << "<old>";
        new_format_->newShow();
        std::cout << "</old>";
    }
};
```
x??

---

#### Strategy Design Pattern
Background context explaining the purpose and use cases of the Strategy design pattern, emphasizing its ability to encapsulate algorithmic behavior.

:p How does the Strategy design pattern help in managing algorithms?
??x
The Strategy design pattern decouples an algorithm from the entity that uses it. It enables you to define a family of algorithms, encapsulate each one, and make them interchangeable within the same context. This allows for flexible and extensible code where different strategies can be easily swapped out based on requirements.

For example:
```cpp
class PriceStrategy {
public:
    virtual ~PriceStrategy() = default;
    virtual Money update(Money price) const = 0;
};

class DiscountedPriceStrategy : public PriceStrategy {
public:
    void update(Money price) const override {
        // Apply discount logic
        return (price - (price * 15 / 100));
    }
};
```
x??

---

#### Combining Decorator and Strategy Patterns
Background context explaining how combining the Decorator and Strategy patterns can leverage their strengths to enhance functionality.

:p How can you combine the Decorator and Strategy patterns?
??x
You can use the Decorator pattern to wrap a `PriceStrategy` object, allowing for fine-grained configuration of pricing logic. The `DecoratedPriceStrategy` class can add additional responsibilities or modify existing ones dynamically, while the `DiscountedPriceStrategy` provides specific implementation details encapsulated within its strategy.

For example:
```cpp
class DecoratedPriceStrategy : public PriceStrategy {
private:
    std::unique_ptr<PriceStrategy> priceModifier_;
public:
    DecoratedPriceStrategy(std::unique_ptr<PriceStrategy> modifier) : priceModifier_(std::move(modifier)) {}
    Money update(Money price) const override {
        // Apply base strategy
        Money modified_price = priceModifier_->update(price);
        // Add additional logic if needed
        return (modified_price - (modified_price * 10 / 100));
    }
};

class DiscountedPriceStrategy : public DecoratedPriceStrategy {
public:
    DiscountedPriceStrategy() : DecoratedPriceStrategy(std::make_unique<DiscountedPriceStrategy>()) {}
};
```
x??

---


#### Decorator Design Pattern Overview
Background context explaining the decorator pattern. The decorator pattern allows for flexible and dynamic feature enhancement by wrapping objects with additional behaviors without modifying their structure or interface.

The core idea is to introduce a new class hierarchy that wraps around existing classes, allowing for the addition of responsibilities in a non-intrusive manner.
:p What is the decorator pattern used for?
??x
The decorator pattern is used for adding functionalities dynamically to an object without altering its structure. This allows for flexibility and ease of maintenance by avoiding changes to the original class hierarchy.

For example:
```cpp
class Item {
public:
    virtual Money price() const = 0;
};

class DecoratedPriceStrategy : public Item {
private:
    std::unique_ptr<Item> item_;
public:
    explicit DecoratedPriceStrategy(std::unique_ptr<Item> item) : item_(std::move(item)) {}

    Money price() const override { return item_->price(); }
};
```
x??

---

#### Performance Considerations of Decorator
Explanation of the performance implications when using decorators extensively. Each level in a decorator hierarchy adds an extra virtual function call, which can lead to performance overhead.

:p What is the potential downside related to performance with decorators?
??x
The potential downside related to performance with decorators is that each additional layer (or decorator) introduces one more virtual function call. This can lead to a significant performance penalty in scenarios where many decorators are applied hierarchically, as it results in multiple levels of indirection.

For example:
```cpp
class DecoratorA : public Item {
private:
    std::unique_ptr<Item> item_;
public:
    explicit DecoratorA(std::unique_ptr<Item> item) : item_(std::move(item)) {}

    Money price() const override { return item_->price(); }
};

class DecoratorB : public DecoratorA {
public:
    Money price() const override { return DecoratorA::price() * 1.05; } // 5% increase
};
```
In this case, there are two virtual function calls: one for `DecoratorA` and another for the original `Item`.
x??

---

#### Combining Decorators Rationale
Explanation of why combining decorators in a nonsensical way can be problematic. The example given is wrapping a tax decorator around an already taxed item.

:p Why should you avoid combining certain decorators?
??x
You should avoid combining certain decorators because it can lead to logical inconsistencies or incorrect behavior. For instance, applying a `Taxed` decorator around another `Taxed` decorator would result in double taxation, which is not typically the intended outcome and could be dangerous depending on the scenario.

For example:
```cpp
class TaxDecorator : public DecoratorA {
public:
    Money price() const override { return DecoratorA::price() * 1.05; } // 5% tax
};
```
If you apply `TaxDecorator` to an item that is already taxed, it will apply the tax twice, leading to incorrect pricing.

To avoid such issues, separate concerns like taxes and discounts into different strategies.
x??

---

#### Strategy Pattern for Taxes
Explanation of using a strategy pattern for handling taxes instead of decorators. This approach can make interfaces easier to use correctly and harder to use incorrectly by enforcing proper usage.

:p Why might you prefer the strategy pattern over decorators for taxes?
??x
You might prefer the strategy pattern over decorators for taxes because it enforces correct usage through well-defined interfaces and strategies, making it more difficult to apply taxes inappropriately. By using a `TaxStrategy` class, you can clearly define how taxes should be applied without accidentally stacking them incorrectly.

For example:
```cpp
class TaxStrategy {
public:
    virtual ~TaxStrategy() = default;
    virtual Money applyTax(Money price) const = 0;
};

class SalesTaxStrategy : public TaxStrategy {
public:
    Money applyTax(Money price) const override { return price * 1.05; } // 5% sales tax
};
```
Using a `SalesTaxStrategy` ensures that only one type of tax is applied, and the logic for applying it is encapsulated in its implementation.
x??

---

#### TaxedItem Class Implementation
Explanation of how the `TaxedItem` class combines an item with a tax strategy. This approach avoids the pitfalls of decorators while still providing flexible taxation behavior.

:p How does the `TaxedItem` class manage taxes?
??x
The `TaxedItem` class manages taxes by combining an `Item` with a `TaxStrategy`. It provides methods to calculate both the net and gross prices, ensuring that taxes are applied correctly without stacking them incorrectly. This approach uses smart pointers for managing the lifetimes of its components.

For example:
```cpp
class TaxedItem {
public:
    explicit TaxedItem(std::unique_ptr<Item> item, std::unique_ptr<TaxStrategy> taxer)
        : item_(std::move(item)), taxer_(std::move(taxer)) {}

    Money netPrice() const { return item_->price(); }
    Money grossPrice() const { return taxer_->applyTax(item_->price()); }

private:
    std::unique_ptr<Item> item_;
    std::unique_ptr<TaxStrategy> taxer_;
};
```
The `netPrice()` method returns the original price without taxes, while `grossPrice()` calculates the price including the applied tax.
x??

---


#### Decorator Design Pattern Overview
Background context: The Decorator design pattern is a structural design pattern that allows behavior to be added to an individual object, either statically or dynamically, without affecting the behavior of other objects from the same class. It promotes loose coupling by allowing decorator classes to wrap around any object with a compatible interface.
:p What is the main purpose of using the Decorator design pattern?
??x
The primary purpose of using the Decorator design pattern is to add new functionality to existing objects dynamically and hierarchically, without modifying the original class. This is achieved by wrapping the original object with one or more decorator classes that provide additional behavior.
??x

---

#### Inheritance vs. Decorators
Background context: Inheritance can be used to extend a class's behavior, but it can also lead to tightly coupled code and may violate the Single Responsibility Principle (SRP). The Decorator design pattern offers a way to achieve similar results with less coupling by wrapping objects.
:p Why is inheritance rarely the answer when extending object behavior?
??x
Inheritance is rarely the answer because it can lead to class hierarchies that are difficult to manage, especially as more behaviors need to be added. Inheritance tightly couples derived classes to their base classes, making it harder to change or extend functionality without affecting other parts of the codebase. Additionally, it may violate the Single Responsibility Principle if a class is trying to handle too many responsibilities.
??x

---

#### Value-Based Compile-Time Decorator
Background context: The provided example demonstrates how to implement a compile-time decorator using C++ templates and concepts. This approach leverages static polymorphism to enable early type checking and optimization during compilation.
:p How does the provided code snippet illustrate a value-based compile-time decorator?
??x
The code snippet illustrates a value-based compile-time decorator by defining the `ConferenceTicket` class as a simple, non-inheritable value object. It uses templates and concepts to create decorators that wrap around instances of `ConferenceTicket`, allowing for hierarchical customization without modifying the original class.
```cpp
#include <Money.h>
#include <string>
#include <utility>

class ConferenceTicket {
public:
    ConferenceTicket(std::string name, Money price)
        : name_{ std::move(name) }
        , price_{ price } {}
    
    std::string const& name() const { return name_; }
    Money price() const { return price_; }

private:
    std::string name_;
    Money price_;
};
```
??x

---

#### Static Polymorphism vs. Dynamic Polymorphism
Background context: The text mentions that one approach to implementing a decorator is through static polymorphism, which uses templates and concepts for compile-time type safety, while the other uses dynamic polymorphism, leveraging runtime dispatch.
:p What are the key differences between static and dynamic polymorphism in the context of decorators?
??x
Static polymorphism (used in C++ with templates) allows for type-safe and optimized code at compile time. It enables early detection of type errors and can be more efficient because it avoids virtual function call overhead. Dynamic polymorphism, on the other hand, uses virtual functions to provide runtime dispatching, which is flexible but incurs some performance overhead due to dynamic lookup.
??x

---

#### Implementing a Value-Based Compile-Time Decorator
Background context: The implementation of the value-based compile-time decorator focuses on using templates and concepts for type safety. This approach allows for easy addition of new decorators without modifying existing classes.
:p How can we add a simple wrapper (decorator) to the `ConferenceTicket` class using C++20 concepts?
??x
To add a simple wrapper to the `ConferenceTicket` class, you can create a template decorator that accepts a `ConferenceTicket` and adds additional behavior. Here’s an example:
```cpp
template<typename T>
class Decorator {
public:
    explicit Decorator(T& obj) : obj_(obj) {}

    // Forwarding function calls
    Money price() const { return obj_.price(); }

private:
    T& obj_;
};

// Usage
ConferenceTicket ticket("Tech Conference", Money{100});
Decorator<ConferenceTicket> wrappedTicket(ticket);
```
??x

---

#### Summary of Design Patterns
Background context: The text highlights the differences between Decorator, Adapter, and Strategy patterns. Each pattern addresses different needs in software design, such as adding responsibilities (Decorator), adapting interfaces (Adapter), or selecting algorithms at runtime (Strategy).
:p What are some key differences between the Decorator, Adapter, and Strategy patterns?
??x
- **Decorator**: Used to add new functionality to an object dynamically without modifying its structure. It's hierarchical and allows for multiple layers of behavior.
- **Adapter**: Used to make existing interfaces compatible with other interfaces that are already in use by a client. It changes the interface of a class but doesn't modify the underlying implementation.
- **Strategy**: Used when you need to choose an algorithm or behavior at runtime from a family of algorithms without changing the calling code. Each strategy is encapsulated as a separate object and can be switched during execution.
??x

---


#### Introduction to Decorator Pattern Implementation

This section explains how the Decorator pattern is implemented using template classes and constraints. The implementation avoids direct inheritance by composition or non-public inheritance, making it more flexible and adhering to design principles.

:p What is a key characteristic of the new Decorator implementation described?
??x
A key characteristic of this implementation is that it uses templates with constraints (PricedItem) instead of traditional inheritance. This allows for greater flexibility in adding decorators without modifying existing classes.
??x

---

#### PricedItem Constraint

The PricedItem constraint ensures types used as Item parameters must have a `price()` method, enforcing semantic requirements.

:p What is the role of the PricedItem concept?
??x
The PricedItem concept acts as a template constraint that enforces certain behavior on the decorated item. Specifically, it requires any type passed to the Discounted or Taxed classes to define a `price()` member function. If not defined, compilation will fail.
??x

---

#### Implementation of Discounted Class Template

This class uses composition to wrap an Item and apply a discount.

:p How does the Discounted class template implement its functionality?
??x
The Discounted class template implements its functionality by storing an instance of the decorated item as a data member and applying a discount when `price()` is called. It is implemented using composition rather than inheritance, adhering to the guideline to "favor composition over inheritance."

```cpp
template< double discount, PricedItem Item >
class Discounted {
public:
    template< typename... Args >
    explicit Discounted(Args&&... args)
        : item_{ std::forward<Args>(args)... } {}

    Money price() const {
        return item_.price() * (1.0 - discount);
    }

private:
    Item item_;
};
```
??x

---

#### Implementation of Taxed Class Template

This class uses private inheritance to inherit from the decorated item and apply a tax.

:p How does the Taxed class template implement its functionality?
??x
The Taxed class template implements its functionality by privately inheriting from the decorated item and applying a tax when `price()` is called. This approach allows it to directly access the `price()` method of the base class.

```cpp
template< double taxRate, PricedItem Item >
class Taxed : private Item {
public:
    template< typename... Args >
    explicit Taxed(Args&&... args)
        : Item{ std::forward<Args>(args)... } {}

    Money price() const {
        return Item::price() * (1.0 + taxRate);
    }
};
```
??x

---

#### Benefits of the Implementation

This implementation provides flexibility, separation of concerns, and adherence to design principles like the Open-Closed Principle.

:p What benefits does this implementation provide?
??x
The implementation offers several benefits:
- **Flexibility**: New items can be easily added without modifying existing code.
- **Separation of Concerns**: The `PricedItem` constraint ensures that only types with a `price()` method can be decorated, promoting clean separation of concerns based on the Single-Responsibility Principle (SRP).
- **Adherence to Principles**:
  - **Open-Closed Principle (OCP)**: New decorators and items can be added without modifying existing code.
  - **Dependency Inversion Principle (DIP)**: High-level modules depend on abstractions, not concrete implementations.

These features make the implementation more maintainable and scalable.
??x

---


#### Compile-Time vs Runtime Decorator Implementation
Background context: This section discusses the performance comparison between a runtime decorator implementation and a compile-time template-based decorator implementation. The focus is on showing how the compile-time approach can provide significant performance improvements due to the lack of pointer indirections and potential for inlining.

:p What are the key differences between the classic object-oriented decorator implementation and the compile-time template-based decorator implementation discussed?
??x
The classic object-oriented decorator uses dynamic dispatch, involving virtual functions and pointers, which introduces overhead such as vtable lookups. In contrast, the compile-time approach leverages templates to create specialized classes at compile time, avoiding runtime overhead.

Code example to illustrate the classic runtime decorator:
```cpp
class ConferenceTicket {};
class Discounted : public ConferenceTicket {
    double discount;
public:
    Discounted(double d) : discount(d) {}
    virtual Money price() const override { return basePrice * (1 - discount); }
};

class Taxed : public Discounted {
    double taxRate;
public:
    Taxed(double t, ConferenceTicket& ticket) : Discounted(ticket), taxRate(t) {}
    virtual Money price() const override { return discountedPrice * (1 + taxRate); }
};
```
x??

---
#### Performance Comparison Results
Background context: The author presents performance results comparing the classic runtime decorator implementation with a compile-time template-based implementation. The results are normalized to show how much faster the compile-time solution is compared to the runtime solution.

:p What does Table 9-1 in the text indicate about the performance of the compile-time Decorator implementation?
??x
Table 9-1 shows that the compile-time Decorator implementation is significantly faster, taking only about 8% of the time required by the classic runtime implementation for both GCC and Clang. This indicates a performance improvement of more than one order of magnitude.

Example table from the text:
| Compiler       | Classic Decorator | Compile-time Decorator |
|----------------|-------------------|-----------------------|
| GCC            | 1.0               | 0.078067              |
| Clang          | 1.0               | 0.080313              |

x??

---
#### Template Parameters and Class Specialization
Background context: The compile-time approach uses template parameters to define different discount and tax rates, leading to the creation of specialized class instances at compile time.

:p How do templates allow for the implementation of varying discount and tax rates in the compile-time Decorator solution?
??x
Templates enable the specialization of classes based on template arguments. In the given example, `Discounted<0.2,ConferenceTicket>` and `Taxed<0.19,Discounted<0.2,ConferenceTicket>>` are specific instantiations that correspond to different discount and tax rates.

Example code:
```cpp
template <double Discount>
class Discounted {
    // implementation with Discount as a template parameter
};

template <double TaxRate, class Item>
class Taxed {
    // implementation with TaxRate as a template parameter
};
```

x??

---
#### Compilation Time Considerations
Background context: The compile-time solution comes with significant advantages in terms of performance but also presents challenges such as increased compile times and larger executables due to the creation of multiple specialized classes.

:p What are the potential limitations of using templates for implementing decorators at compile time?
??x
The primary limitations include:
- Increased compilation time because all template instantiations must be processed.
- Larger executable size since more code is generated, potentially leading to bloated binaries.
- Reduced runtime flexibility as the decorator combinations need to be defined at compile time.

Example of increased compilation time and binary size:
```cpp
// Many template instantiations result in additional compiled files and larger executables
using DiscountedConferenceTicket = Discounted<0.2, ConferenceTicket>;
using TaxedConferenceTicket = Taxed<0.19, ConferenceTicket>;
using TaxedDiscountedConferenceTicket = Taxed<0.19, Discounted<0.2, ConferenceTicket>>;
```

x??

---
#### Virtual Base Classes and Inheritance
Background context: The text mentions that there are only a few valid reasons to prefer non-public inheritance over composition, with one of them being the use of virtual base classes.

:p Why is it mentioned that virtual base classes can be used as a reason for preferring non-public inheritance in some scenarios?
??x
Virtual base classes allow sharing common base class functionality among derived classes. This is particularly useful when a base class needs to be shared by multiple derived classes, and you want to avoid duplicating code.

Example of using virtual base classes:
```cpp
class VirtualBase {
    // Common functionality
public:
    virtual void commonFunction() {}
};

class DerivedA : public virtual VirtualBase {};
class DerivedB : public virtual VirtualBase {};

// A class can derive from multiple virtual bases to share common functionality
```

x??

---

