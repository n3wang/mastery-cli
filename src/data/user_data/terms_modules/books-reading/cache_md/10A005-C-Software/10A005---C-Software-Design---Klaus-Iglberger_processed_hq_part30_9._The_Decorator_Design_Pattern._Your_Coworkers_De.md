# High-Quality Flashcards: 10A005---C-Software-Design---Klaus-Iglberger_processed (Part 30)

**Rating threshold:** >= 8/10

**Starting Chapter:** 9. The Decorator Design Pattern. Your Coworkers Design Issue

---

**Rating: 8/10**

#### Introduction to Decorator Design Pattern
Background context: The chapter introduces the Decorator design pattern, explaining its importance and versatility in software development. It highlights the utility of this pattern for combining and reusing different implementations without altering existing code.

:p What is the Decorator design pattern?
??x
The Decorator design pattern allows adding new functionalities to objects at runtime by wrapping them with additional behaviors. This approach provides an alternative to subclassing, enabling more flexible and reusable code.

```cpp
class Component {
public:
    virtual ~Component() = default;
    virtual void operation() const = 0;
};

class ConcreteComponent : public Component {
public:
    void operation() const override {
        // implementation for the base component
    }
};

class Decorator : public Component {
protected:
    Component* component_;
public:
    Decorator(Component* component) : component_(component) {}
    
    void operation() const override {
        // call to the wrapped object's method and add additional behavior if needed
    }
};
```
x??

---

#### Problem Scenario in Item Inheritance Hierarchy
Background context: The developers of a merchandise management system are facing difficulties when adding new price modifiers due to their current design. This leads them to explore different solutions, eventually settling on the Strategy pattern but recognizing its limitations.

:p What problem do the developers face with the initial Item inheritance hierarchy?
??x
The developers encounter issues when they need to add new types of price modifiers (like discounts) because all derived classes directly access and modify protected data members. This approach requires significant refactoring each time a new modifier is added, making it inflexible and error-prone.

```cpp
class Item {
public:
    virtual ~Item() = default;
    virtual Money price() const = 0; // pure virtual function for dynamic pricing

protected:
    double taxRate_; // protected data member to store the tax rate
};
```
x??

---

#### Strategy Pattern Applied to Price Modifiers
Background context: To address the issues with direct inheritance, the developers initially try to solve the problem using the Strategy pattern. However, they realize it introduces its own challenges such as code duplication and a complex hierarchy.

:p How did the developers attempt to solve their problem using the Strategy pattern?
??x
The developers attempted to separate price modifiers into a strategy hierarchy where each Item could be configured with different strategies for calculating prices. For example:

```cpp
class PriceStrategy {
public:
    virtual ~PriceStrategy() = default;
    virtual Money update(Money price) const = 0;
};

class NullPriceStrategy : public PriceStrategy {
public:
    Money update(Money price) const override { return price; }
};
```

However, this approach led to problems like needing a strategy for every Item instance and potential code duplication when combining different modifiers.

```cpp
class DiscountStrategy : public PriceStrategy {
public:
    Money update(Money price) const override {
        // logic to apply discount
        return price * 0.9;
    }
};

class TaxStrategy : public PriceStrategy {
public:
    Money update(Money price) const override {
        // logic to calculate tax
        return price + (price * 0.1);
    }
};
```
x??

---

#### Issues with the Strategy-Based Solution
Background context: The developers recognize that while the Strategy pattern addresses some issues, it introduces new challenges such as unnecessary null objects and potential code duplication when combining multiple strategies.

:p What are the two main problems identified by the developers regarding their Strategy-based solution?
??x
The two main problems identified are:
1. Every Item instance needs a PriceStrategy, even if no modifier applies (solved by using a NullPriceStrategy).
2. Code duplication occurs in the current implementation when combining different types of modifiers (e.g., both Tax and DiscountAndTax contain tax-related computations).

```cpp
class DiscountAndTaxStrategy : public PriceStrategy {
public:
    Money update(Money price) const override {
        // logic to apply discount then calculate tax
        return (price * 0.9) + ((price * 0.9) * 0.1);
    }
};
```
x??

---

#### Motivation for Decorator Pattern
Background context: Given the limitations of both direct inheritance and the Strategy pattern, the developers are looking for a more flexible solution that can handle dynamic modifications without introducing excessive complexity.

:p Why is the developer seeking an alternative to the current approaches?
??x
The developers are seeking an alternative because:
- Direct inheritance leads to complex hierarchies and inflexibility.
- The Strategy pattern introduces unnecessary null objects and code duplication, especially when combining multiple modifiers.

They need a solution that can dynamically apply various price modifiers without modifying existing classes or introducing complex inheritance structures.

```cpp
class DecoratedItem : public Item {
protected:
    Component* wrapped_;
public:
    DecoratedItem(Component* wrapped) : wrapped_(wrapped) {}

    void operation() const override {
        // call to the wrapped object's method and add additional behavior if needed
    }
};
```
x??

---

#### Benefits of the Decorator Pattern
Background context: The decorator pattern allows for flexible addition of functionalities by wrapping objects with behaviors, providing a more dynamic approach compared to inheritance or direct composition.

:p What benefits does the Decorator pattern offer over other design patterns?
??x
The Decorator pattern offers several key benefits:
- Flexibility: It enables adding new functionalities without altering existing code.
- Reusability: Components can be decorated in multiple ways, promoting code reuse.
- Hierarchical Structure: Supports hierarchical decoration with multiple decorators.

```cpp
// Example of a simple decorator
class TaxDecorator : public Decorator {
public:
    Money update(Money price) const override {
        // logic to calculate tax and apply it
        return wrapped_->update(price) + (wrapped_->update(price) * 0.1);
    }
};
```
x??

---

#### Conclusion on Decorator Pattern
Background context: The decorator pattern is introduced as a solution for the developers' problem, offering a more flexible approach compared to direct inheritance or the Strategy pattern.

:p Why does the author suggest using the Decorator design pattern?
??x
The author suggests using the Decorator design pattern because it allows for dynamic and hierarchical addition of functionalities without altering existing code. This provides greater flexibility and reusability compared to other approaches like direct inheritance or the Strategy pattern, which can introduce inflexibility and code duplication.

```cpp
// Example usage of decorators
Item* item = new CppBook();
item = new TaxDecorator(item);
item = new DiscountDecorator(item);
Money price = item->price(); // dynamically applies tax and discount
```
x??

---

**Rating: 9/10**

#### Concept: Separation of Concerns
Background context explaining the concept. The separation of concerns is a design principle where a complex system is broken down into distinct parts that have separate responsibilities.
If applicable, add code examples with explanations.
:p What is the purpose of applying the separation of concerns in designing price modifiers?
??x
The purpose of applying the separation of concerns is to make the system more modular and easier to maintain. By separating different functionalities (such as discounts and taxes) into distinct classes or objects, changes can be made without affecting other parts of the codebase.
For example:
```java
// Incorrect approach: DiscountAndTax class that combines both functionalities
class DiscountAndTax {
    public double apply(double price) {
        // Apply discount and tax logic here
        return discountedPrice + taxAmount;
    }
}
```
This approach can be inflexible because changes to the discount or tax logic would require modifying this single class. In contrast, using a decorator pattern allows for flexible combinations of different modifiers.
x??

---

#### Concept: Decorator Design Pattern Intent
Background context explaining the concept. The intent of the Decorator design pattern is to attach additional responsibilities to an object dynamically without affecting other objects of the same class.
If applicable, add code examples with explanations.
:p What is the primary goal of using the Decorator design pattern for price modifiers?
??x
The primary goal of using the Decorator design pattern for price modifiers is to enable flexible and dynamic addition of functionalities such as discounts and taxes without modifying the core Item implementation. This approach promotes modularity, ease of extension, and adherence to the Open-Closed Principle (OCP).
For example:
```java
// Base class representing an item
abstract class Item {
    public abstract double price();
}

// Concrete implementation of an item
class CppBook extends Item {
    // Implementation details...
}

// Decorator classes for additional functionalities
class Discounted implements Item {
    private final Item wrappedItem;

    public Discounted(Item wrappedItem) {
        this.wrappedItem = wrappedItem;
    }

    @Override
    public double price() {
        return wrappedItem.price() * 0.9; // Apply a discount of 10%
    }
}

class Taxed implements Item {
    private final Item wrappedItem;

    public Taxed(Item wrappedItem) {
        this.wrappedItem = wrappedItem;
    }

    @Override
    public double price() {
        return wrappedItem.price() * 1.08; // Apply an 8% tax
    }
}
```
x??

---

#### Concept: Decorator Design Pattern UML Representation
Background context explaining the concept. The UML diagram of the Decorator design pattern shows the relationships between the base class and its decorators.
If applicable, add code examples with explanations.
:p What does Figure 9-5 illustrate in the provided text?
??x
Figure 9-5 illustrates the UML representation of the Decorator design pattern applied to an Item problem. It includes a base class `Item`, derived classes like `CppBook`, and decorator classes such as `Discounted` and `Taxed`. The diagram shows how decorators can wrap around items, allowing for hierarchical application of modifiers.
For example:
```java
// Base class representing an item
abstract class Item {
    public abstract double price();
}

// Concrete implementation of an item
class CppBook extends Item {
    // Implementation details...
}

// Decorator classes for additional functionalities
class Discounted implements Item {
    private final Item wrappedItem;

    public Discounted(Item wrappedItem) {
        this.wrappedItem = wrappedItem;
    }

    @Override
    public double price() {
        return wrappedItem.price() * 0.9; // Apply a discount of 10%
    }
}

class Taxed implements Item {
    private final Item wrappedItem;

    public Taxed(Item wrappedItem) {
        this.wrappedItem = wrappedItem;
    }

    @Override
    public double price() {
        return wrappedItem.price() * 1.08; // Apply an 8% tax
    }
}
```
x??

---

#### Concept: Benefits of the Decorator Design Pattern
Background context explaining the concept. The benefits of the Decorator design pattern include adherence to separation of concerns, Open-Closed Principle (OCP), Don’t Repeat Yourself (DRY) principle, and no need for default behavior in the form of a null object.
If applicable, add code examples with explanations.
:p What are some key advantages of using the Decorator design pattern as described in the text?
??x
Some key advantages of using the Decorator design pattern include:

1. **Adherence to Separation of Concerns (SRP):** By separating concerns into distinct classes, changes can be made without affecting other parts of the codebase.
2. **Open-Closed Principle (OCP) Compliance:** New functionalities can be added by creating new decorators without modifying existing classes.
3. **Don’t Repeat Yourself (DRY) Principle Adherence:** Common functionality is reused through composition, reducing redundancy.
4. **No Need for Null Objects:** Decorators provide natural default behavior because items that do not require modifiers can use their base implementation directly.

For example:
```java
// Base class representing an item
abstract class Item {
    public abstract double price();
}

// Concrete implementation of an item
class CppBook extends Item {
    // Implementation details...
}

// Decorator classes for additional functionalities
class Discounted implements Item {
    private final Item wrappedItem;

    public Discounted(Item wrappedItem) {
        this.wrappedItem = wrappedItem;
    }

    @Override
    public double price() {
        return wrappedItem.price() * 0.9; // Apply a discount of 10%
    }
}

class Taxed implements Item {
    private final Item wrappedItem;

    public Taxed(Item wrappedItem) {
        this.wrappedItem = wrappedItem;
    }

    @Override
    public double price() {
        return wrappedItem.price() * 1.08; // Apply an 8% tax
    }
}
```
x??

---

**Rating: 8/10**

#### Item Base Class and DecoratedItem
Background context: The `Item` base class is an abstraction for all possible items, defining a pure virtual function `price()` to query the price. The `DecoratedItem` class is a concrete implementation that stores another `Item` and provides protected methods to access it.

:p What is the purpose of the `DecoratedItem` class?
??x
The `DecoratedItem` class serves as a wrapper around another item, allowing for additional functionality such as applying discounts or taxes without modifying the original item's code. It implements the Decorator pattern by providing a flexible mechanism to add responsibilities dynamically.
```cpp
class DecoratedItem : public Item {
public:
    explicit DecoratedItem(std::unique_ptr<Item> item)
        : item_(std::move(item)) {
        if (!item_) { throw std::invalid_argument("Invalid item"); }
    }

protected:
    Item&       item() { return *item_; }
    Item const& item() const { return *item_; }

private:
    std::unique_ptr<Item> item_;
};
```
x??

---

#### CppBook and ConferenceTicket Implementations
Background context: `CppBook` and `ConferenceTicket` are specific implementations of the `Item` class. They provide a concrete implementation for the price() function, representing different types of items.

:p What do `CppBook` and `ConferenceTicket` represent?
??x
`CppBook` represents a C++ book with a title and a specified price. `ConferenceTicket` represents a conference ticket with a name and a specified price.
```cpp
class CppBook : public Item {
public:
    CppBook(std::string title, Money price)
        : title_{std::move(title)}, price_{price} {}
    std::string const& title() const { return title_; }
    Money price() const override { return price_; }

private:
    std::string title_;
    Money price_{};
};

class ConferenceTicket : public Item {
public:
    ConferenceTicket(std::string name, Money price)
        : name_{std::move(name)}, price_{price} {}
    std::string const& name() const { return name_; }
    Money price() const override { return price_; }

private:
    std::string name_;
    Money price_{};
};
```
x??

---

#### Discounted Class Implementation
Background context: The `Discounted` class is a decorator that applies a discount to the wrapped item. It computes the discounted price by multiplying the original item's price with a factor derived from the discount value.

:p How does the `Discounted` class apply a discount?
??x
The `Discounted` class applies a discount by computing a factor (1 - discount) and then using this factor to modify the wrapped item's price. If the constructor receives an invalid discount, it throws an exception.
```cpp
class Discounted : public DecoratedItem {
public:
    Discounted(double discount, std::unique_ptr<Item> item)
        : DecoratedItem(std::move(item)), factor_(1.0 - discount) {
        if (!std::isfinite(discount) || discount < 0.0 || discount > 1.0) {
            throw std::invalid_argument("Invalid discount");
        }
    }

    Money price() const override {
        return item().price() * factor_;
    }

private:
    double factor_{};
};
```
x??

---

#### Taxed Class Implementation
Background context: The `Taxed` class is similar to the `Discounted` class but applies a tax instead of a discount. It uses a similar approach to modify the price by applying a tax rate.

:p How does the `Taxed` class apply a tax?
??x
The `Taxed` class applies a tax by computing a factor (1 + taxRate) and then using this factor to modify the wrapped item's price. If the constructor receives an invalid tax rate, it throws an exception.
```cpp
class Taxed : public DecoratedItem {
public:
    Taxed(double taxRate, std::unique_ptr<Item> item)
        : DecoratedItem(std::move(item)), factor_(1.0 + taxRate) {
        if (!std::isfinite(taxRate) || taxRate < 0.0) {
            throw std::invalid_argument("Invalid tax");
        }
    }

    Money price() const override {
        return item().price() * factor_;
    }

private:
    double factor_{};
};
```
x??

---

#### Main Function Example
Background context: The `main` function demonstrates how to combine different decorators (Discounted and Taxed) with specific items (CppClass, ConferenceTicket). It shows the application of multiple decorators in a hierarchical manner.

:p How are multiple decorators applied in the main function?
??x
In the `main` function, multiple decorators are applied hierarchically. First, a `Taxed` decorator is used to apply a 7% tax to a `CppClass`. Then, another `Discounted` decorator is added with an 80% discount and a 19% tax on top of that for a `ConferenceTicket`.

```cpp
int main() {
    // 7 percent tax: 19*1.07 = 20.33
    std::unique_ptr<Item> item1(std::make_unique<Taxed>(0.07, 
        std::make_unique<CppBook>("Effective C++", 19.0)));

    // 20 percent discount, 19 percent tax: (999*0.8)*1.19 = 951.05
    std::unique_ptr<Item> item2(std::make_unique<Taxed>(0.19,
        std::make_unique<Discounted>(0.2, 
            std::make_unique<ConferenceTicket>("CppCon", 999.0))));

    Money const totalPrice1 = item1->price(); // Results in 20.33
    Money const totalPrice2 = item2->price(); // Results in 951.05

    return EXIT_SUCCESS;
}
```
x??

---

