# High-Quality Flashcards: 10A000---FluentPython_processed (Part 22)

**Rating threshold:** >= 8/10

**Starting Chapter:** Classic Strategy

---

**Rating: 8/10**

#### Strategy Pattern Overview
Background context: The Strategy pattern is a behavioral design pattern that allows an object to alter its behavior when its internal state changes. It provides a way to define a family of algorithms, encapsulate each one, and make them interchangeable. This is particularly useful in scenarios where you need different ways to compute something based on certain conditions.

If applicable, add code examples with explanations.
:p What is the Strategy pattern?
??x
The Strategy pattern defines a family of algorithms, encapsulates each one, and makes them interchangeable. It allows the algorithm to vary independently from clients that use it.

Example class diagram (UML):
```
Context ----> Strategy
      |          |
Promotion  <---- FidelityPromo, BulkItemPromo, LargeOrderPromo
```

Code example:
```python
class Promotion(ABC):  # the Strategy: an abstract base class
    @abstractmethod
    def discount(self, order: Order) -> Decimal:
        pass

class FidelityPromo(Promotion):  # first Concrete Strategy
    "5 percent discount for customers with 1000 or more fidelity points"
    
    def discount(self, order: Order) -> Decimal:
        rate = Decimal('0.05')
        if order.customer.fidelity >= 1000:
            return order.total() * rate
        return Decimal(0)
```
x??

---
#### Context Class - Order
Background context: The `Order` class acts as the context in the Strategy pattern. It delegates its responsibilities to a pluggable strategy (a promotional discount algorithm) that can be switched at runtime based on the customer's criteria.

:p How does the `Order` class work?
??x
The `Order` class encapsulates an order and provides a service by delegating some computations to interchangeable components that implement alternative algorithms. It uses a `promotion` strategy, which is either selected or passed in during instantiation.

Code example:
```python
class Order(NamedTuple):  # the Context
    customer: Customer
    cart: Sequence[LineItem]
    promotion: Optional['Promotion'] = None

    def total(self) -> Decimal:
        totals = (item.total() for item in self.cart)
        return sum(totals, start=Decimal(0))

    def due(self) -> Decimal:
        if self.promotion is None:
            discount = Decimal(0)
        else:
            discount = self.promotion.discount(self)
        return self.total() - discount
```
x??

---
#### Concrete Strategy - FidelityPromo
Background context: The `FidelityPromo` class implements the `Promotion` interface and provides a specific promotional strategy based on customer's fidelity points.

:p What does the `FidelityPromo` class do?
??x
The `FidelityPromo` class provides a 5% discount for customers with 1000 or more fidelity points. If the customer has fewer than 1000 points, no discount is applied.

Code example:
```python
class FidelityPromo(Promotion):  # first Concrete Strategy
    "5 percent discount for customers with 1000 or more fidelity points"
    
    def discount(self, order: Order) -> Decimal:
        rate = Decimal('0.05')
        if order.customer.fidelity >= 1000:
            return order.total() * rate
        return Decimal(0)
```
x??

---
#### Concrete Strategy - BulkItemPromo
Background context: The `BulkItemPromo` class implements the `Promotion` interface and provides a specific promotional strategy based on the quantity of line items.

:p What does the `BulkItemPromo` class do?
??x
The `BulkItemPromo` class applies a 10% discount to each line item with 20 or more units in the same order. The total discount is calculated by summing up the discounted amounts for all such items.

Code example:
```python
class BulkItemPromo(Promotion):  # second Concrete Strategy
    "10 percent discount for each LineItem with 20 or more units"
    
    def discount(self, order: Order) -> Decimal:
        discount = Decimal(0)
        for item in order.cart:
            if item.quantity >= 20:
                discount += item.total() * Decimal('0.1')
        return discount
```
x??

---
#### Concrete Strategy - LargeOrderPromo
Background context: The `LargeOrderPromo` class implements the `Promotion` interface and provides a specific promotional strategy based on the number of distinct items in an order.

:p What does the `LargeOrderPromo` class do?
??x
The `LargeOrderPromo` class applies a 7% discount to orders with at least 10 distinct items. The total discount is calculated as a percentage of the order's total amount based on this criterion.

Code example:
```python
class LargeOrderPromo(Promotion):  # third Concrete Strategy
    "7 percent discount for orders with 10 or more distinct items"
    
    def discount(self, order: Order) -> Decimal:
        distinct_items = {item.product for item in order.cart}
        if len(distinct_items) >= 10:
            return order.total() * Decimal('0.07')
        return Decimal(0)
```
x??

---

**Rating: 8/10**

#### Refactoring Strategies to Functions

Background context: The original implementation of strategies (promotions) as classes with a single `discount` method is replaced with plain functions. This refactoring aims to reduce code complexity and maintainability while keeping the same functionality.

:p How does Example 10-3 simplify the implementation of promotional strategies compared to Example 10-1?
??x
Example 10-3 simplifies the implementation by converting each strategy from a class with a single `discount` method into a simple function. This eliminates the need for an abstract class and reduces code duplication, making the Order class shorter and easier to maintain.

The promotion attribute in the Order class is now an optional Callable that takes an Order argument and returns a Decimal discount. This allows for applying different strategies directly as functions without creating new instances each time.

```python
class Order:
    def total(self) -> Decimal:
        totals = (item.total() for item in self.cart)
        return sum(totals, start=Decimal(0))

    def due(self) -> Decimal:
        if self.promotion is None:
            discount = Decimal(0)
        else:
            discount = self.promotion(self)
        return self.total() - discount

def fidelity_promo(order: Order) -> Decimal:
    "5 percent discount for customers with 1000 or more fidelity points"
    if order.customer.fidelity >= 1000:
        return order.total() * Decimal('0.05')
    return Decimal(0)
```
x??

---
#### Understanding `self.promotion(self)`

Background context: In the refactored Order class, the promotion attribute is an instance attribute that can be a callable function. The `due` method of the Order class checks if the promotion is None and either applies the discount or returns zero.

:p Why does self.promotion need to be called with `self.promotion(self)`?
??x
The `promotion` attribute in the Order class is an instance attribute that can be a callable function. When applying the promotion, we must call this function as it would be called on an instance of Order (i.e., `self`). The double use of `self` ensures that the function receives its context correctly.

```python
def due(self) -> Decimal:
    if self.promotion is None:
        discount = Decimal(0)
    else:
        discount = self.promotion(self)  # Pass 'self' as argument to apply promotion
    return self.total() - discount
```
x??

---
#### Applying Promotions in the Order Class

Background context: The `Order` class now supports applying different promotional functions without needing separate instances of each strategy. This is achieved by passing the desired promotion function directly when creating an order.

:p How do you apply a specific promotion to an Order instance?
??x
You can apply a specific promotion to an Order instance by passing it as an argument when creating or modifying the `promotion` attribute of an Order instance.

Example:
```python
Order(joe, long_cart, large_order_promo)
```
Here, `large_order_promo` is passed directly as the `promotion` function. This way, you avoid creating new objects and simply use the existing functions.

x??

---
#### Comparison with Strategy Pattern

Background context: The original implementation of strategies (promotions) used classes to encapsulate each strategy, while the refactored version uses simple functions. The text mentions that this approach can be more efficient in terms of memory and execution speed due to reduced overhead from class instantiation.

:p Why might using plain functions as promotions be better than using Strategy objects?
??x
Using plain functions as promotions can be better because:

1. **Reduced Overhead**: Creating new instances for each promotion is avoided, which saves memory.
2. **Simplified Code**: Functions are easier to read and understand compared to full-fledged class implementations with a single method.
3. **Efficiency**: Fewer objects mean less garbage collection overhead.

Example:
```python
def large_order_promo(order: Order) -> Decimal:
    distinct_items = {item.product for item in order.cart}
    if len(distinct_items) >= 10:
        return order.total() * Decimal('0.07')
    return Decimal(0)
```
This function-based approach is more lightweight and directly applicable without the need for class instantiation.

x??

---

**Rating: 8/10**

#### Choosing the Best Strategy: Simple Approach
Background context explaining how to select the best available discount for a given order. The implementation leverages functions as objects and iterates over them to find the maximum discount.

:p How does the `best_promo` function work?
??x
The `best_promo` function computes the best available discount by iterating over a list of promotion functions (`promos`). It applies each function to an order and returns the maximum discount among them. The basic logic is as follows:

```python
def best_promo(order: Order) -> Decimal:
    """
    Compute the best discount available.
    """
    promos = [fidelity_promo, bulk_item_promo, large_order_promo]
    return max(promo(order) for promo in promos)
```

Here, `promos` is a list of functions that calculate discounts. The function uses a generator expression to apply each promotion function to the given order and returns the maximum discount.

```python
>>> Order(joe, long_cart, best_promo)  # Joe got a bulk item discount for ordering lots of bananas.
<Order total: 10.00 due: 9.30>

>>> Order(joe, banana_cart, best_promo)  # Joe's simple cart got the fidelity promotion
<Order total: 30.00 due: 28.50>

>>> Order(ann, cart, best_promo)  # Ann, a loyal customer, received the fidelity promotion.
<Order total: 42.00 due: 39.90>
```

x??

---
#### Automating Strategy Selection Using `globals()`
Background context explaining how to use `globals()` to find and apply all available promotions automatically without manual list updates.

:p How does using `globals()` in the `best_promo` function help?
??x
Using `globals()` helps automate the process of finding and applying all available promotion functions. By introspecting the global namespace, we can dynamically discover which functions are defined with a `_promo` suffix (excluding `best_promo`). This way, adding or removing promotions is as simple as defining new functions in the same module.

```python
from decimal import Decimal
from strategy import Order

promos = [promo for name, promo in globals().items() if name.endswith('_promo') and name != 'best_promo']

def best_promo(order: Order) -> Decimal:
    """
    Compute the best discount available.
    """
    return max(promo(order) for promo in promos)
```

This approach ensures that `best_promo` always considers all defined promotion functions, making maintenance easier. If a new promotion is added, it must be named correctly to follow the `_promo` pattern.

```python
>>> Order(joe, long_cart, best_promo)  # Joe still gets the bulk item discount.
<Order total: 10.00 due: 9.30>

>>> Order(joe, banana_cart, best_promo)  # The same as before.
<Order total: 30.00 due: 28.50>

>>> Order(ann, cart, best_promo)  # Ann gets the fidelity promotion.
<Order total: 42.00 due: 39.90>
```

x??

---
#### Module Introspection for Strategy Collection
Background context explaining how to use introspection to gather all available promotions from a dedicated module.

:p How does using `inspect` in `best_promo` function help?
??x
Using the `inspect` module allows us to dynamically collect all functions defined in a separate module, ensuring that new promotions can be easily added without modifying `best_promo`. The code introspects the `promotions` module and filters out only those functions that are discount calculation functions.

```python
from decimal import Decimal
import inspect

from strategy import Order
import promotions

promos = [func for _, func in inspect.getmembers(promotions, inspect.isfunction)]

def best_promo(order: Order) -> Decimal:
    """
    Compute the best discount available.
    """
    return max(promo(order) for promo in promos)
```

This approach ensures that `best_promo` always considers all defined promotion functions from the `promotions` module. New promotions can be added simply by defining new functions in this module.

```python
>>> Order(joe, long_cart, best_promo)  # Joe still gets the bulk item discount.
<Order total: 10.00 due: 9.30>

>>> Order(joe, banana_cart, best_promo)  # The same as before.
<Order total: 30.00 due: 28.50>

>>> Order(ann, cart, best_promo)  # Ann gets the fidelity promotion.
<Order total: 42.00 due: 39.90>
```

x??

---
#### Differentiating Module Introspection Methods
Background context explaining how both `globals()` and `inspect` can be used to gather promotions but differ in implementation.

:p How does using `inspect.getmembers` with a module name differ from using `globals()`?
??x
Using `inspect.getmembers` with the `promotions` module name allows us to introspect a specific module's contents, filtering for functions. This method is more explicit and can be extended if additional modules need to be managed.

```python
from decimal import Decimal
import inspect

from strategy import Order
import promotions

promos = [func for _, func in inspect.getmembers(promotions, inspect.isfunction)]

def best_promo(order: Order) -> Decimal:
    """
    Compute the best discount available.
    """
    return max(promo(order) for promo in promos)
```

In contrast, using `globals()` provides a more dynamic approach but relies on the current module's global namespace. This can be simpler to manage when all relevant functions are defined within the same file.

```python
from decimal import Decimal
from strategy import Order

promos = [promo for name, promo in globals().items() if name.endswith('_promo') and name != 'best_promo']

def best_promo(order: Order) -> Decimal:
    """
    Compute the best discount available.
    """
    return max(promo(order) for promo in promos)
```

Both methods achieve the same goal but have different implications on code structure and maintainability. `inspect.getmembers` is more flexible, while `globals()` is simpler and easier to use when all functions are defined in one file.

x??

---

