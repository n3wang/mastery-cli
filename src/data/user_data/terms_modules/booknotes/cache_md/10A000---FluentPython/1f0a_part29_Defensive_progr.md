# High-Quality Flashcards: 10A000---FluentPython_processed (Part 29)


**Starting Chapter:** Defensive programming and fail fast

---


#### Duck Typing and Defensive Programming
Duck typing is a concept in dynamically typed languages where an object's suitability for a particular purpose is determined by its methods and properties, rather than its type. This approach can make code more flexible but also requires careful handling to avoid runtime errors.

In this context, "fail fast" means raising exceptions immediately when invalid arguments are passed, which helps in debugging and maintaining the program. This contrasts with "safe slow," where you might spend time validating inputs before proceeding.
:p What is the primary principle of duck typing?
??x
Duck typing is a programming concept where an object's suitability for a role is determined by its behavior (methods and properties) rather than its type.
x??

---
#### Defensive Programming Techniques
Defensive programming involves writing code that anticipates errors, ensuring that your application can handle unexpected conditions gracefully. A key aspect of this is "fail fast," which means identifying issues early in the program's execution.

For example, when processing a list or sequence, converting the input to a list immediately and handling potential `TypeError` exceptions helps catch problems at initialization.
:p How does duck typing contribute to fail-fast programming?
??x
Duck typing allows for flexible code that can handle various types of inputs as long as they have the necessary methods. By converting arguments directly to the required type (like using `list()`), you ensure that invalid inputs result in clear errors early in the program's execution, facilitating easier debugging.
x??

---
#### Handling Iterables with Duck Typing
When dealing with iterables in dynamically typed languages, it’s important to handle different types of input gracefully. For instance, when processing a sequence internally as a list, you can use `list()` directly on the input argument.

However, if the data shouldn't be copied or needs to be modified in place (e.g., using `random.shuffle`), you should perform runtime checks.
:p When is it appropriate to use `list()` directly on an iterable?
??x
It is appropriate to use `list()` directly on an iterable when the input can be safely converted into a list and you want to ensure that invalid iterables raise clear errors. This approach helps in fail-fast programming by immediately catching issues during initialization.
x??

---
#### Flexible Argument Handling with Duck Typing
Handling arguments flexibly, especially strings or sequences of identifiers, requires careful consideration. For instance, the `collections.namedtuple` constructor accepts either a string or an iterable of strings for its `field_names`.

Using duck typing, you can handle both cases efficiently by assuming it's a string and converting commas to spaces before splitting.
:p How does the provided code handle the `field_names` argument in `namedtuple`?
??x
The provided code handles the `field_names` argument by first assuming it’s a string (EAFP - "it is easier to ask for forgiveness than permission") and then converting commas to spaces, followed by splitting. If an `AttributeError` occurs during `.replace()` or `.split()`, it means that `field_names` was already iterable, avoiding unnecessary checks.
```python
try:
    field_names = field_names.replace(',', ' ').split()
except AttributeError:
    pass
field_names = tuple(field_names)
if not all(s.isidentifier() for s in field_names):
    raise ValueError('field_names must all be valid identifiers')
```
x??

---
#### Using `iter()` to Ensure Iterability
In some cases, you might need to ensure that an object is iterable before proceeding. Calling `len()` on the argument can help handle sequences while rejecting iterators, but if any iterable is acceptable, using `iter(x)` as soon as possible ensures early detection of non-iterable inputs.
:p What are the benefits of using `iter(x)` over `list(iterable)` for handling iterables?
??x
Using `iter(x)` provides a safer and more flexible way to ensure an object is iterable. It avoids unnecessary copying (like with `list()`) and can immediately raise a clear error if the input is not iterable, making debugging easier. This approach supports both sequences and other iterable types like generators.
x??

---


#### Goose Typing and Python ABCs
Background context: The text discusses how Python uses Abstract Base Classes (ABCs) to implement an interface-like mechanism, which complements duck typing. It highlights that while Python doesn't have explicit `interface` keywords as in some other languages, it provides a way to define interfaces using abstract base classes.
:p What is goose typing and how does it relate to Python's ABCs?
??x
Goose typing is a runtime type checking approach that leverages Abstract Base Classes (ABCs) in Python. It allows defining explicit interfaces for objects without needing to use `isinstance` or similar checks, providing a way to ensure that certain methods are implemented.

In Python, you can define an ABC with abstract methods using the `abc` module and then create classes that implement these methods. This approach helps in ensuring that different classes have common behaviors, making them interchangeable in certain contexts.
```python
from abc import ABC, abstractmethod

class DrawABC(ABC):
    @abstractmethod
    def draw(self):
        pass
```
x??

---

#### Abstract Base Classes (ABCs)
Background context: The text explains how Python uses ABCs to define explicit interfaces. It mentions that while duck typing is useful in many contexts, sometimes it's necessary or more appropriate to use ABCs to ensure certain methods are implemented.
:p What is an Abstract Base Class and why would you want to use one?
??x
An Abstract Base Class (ABC) in Python is a way of defining interfaces for other classes. It allows specifying that certain methods must be implemented by any class that inherits from the ABC.

Using ABCs ensures that all subclasses implement specific methods, making your code more robust and easier to maintain.
```python
from abc import ABC, abstractmethod

class DrawABC(ABC):
    @abstractmethod
    def draw(self):
        pass
```
x??

---

#### Waterfowl and ABCs Analogy
Background context: The text draws an analogy between waterfowl taxonomy and the concept of duck typing. It explains that while duck typing is useful, sometimes it's necessary to enforce certain behaviors or methods through explicit interfaces like ABCs.
:p What does the "waterfowl and ABCs" analogy illustrate?
??x
The "waterfowl and ABCs" analogy illustrates how Python's use of abstract base classes can complement the more flexible approach of duck typing. Just as waterfowl share observable traits but may not necessarily be closely related genetically, classes in Python that implement certain methods (like `draw` in the example) are considered equivalent in behavior even if they don't inherit from a common class.

This analogy emphasizes the importance of explicitly defining interfaces when duck typing alone might lead to ambiguous or incorrect code.
x??

---

#### Duck Typing and Interface Enforcement
Background context: The text contrasts the approach of duck typing with the need for explicit interface enforcement using ABCs. It highlights that while duck typing is useful, there are situations where ensuring certain methods are implemented can make the code more robust.
:p How does duck typing differ from enforcing interfaces through ABCs?
??x
Duck typing in Python focuses on the behavior of objects rather than their type. You call a method (like `draw`) without checking if it's part of any specific class hierarchy; you only check that the object can be called with certain methods.

Enforcing interfaces through ABCs, however, requires explicitly defining which methods must be implemented by classes. This approach makes sure that any class implementing these methods will behave consistently in certain contexts.
```python
from abc import ABC, abstractmethod

class DrawABC(ABC):
    @abstractmethod
    def draw(self):
        pass
```
x??

---

#### Virtual Subclasses and `isinstance`
Background context: The text mentions how virtual subclasses are recognized by `isinstance` without inheriting from a class. This is an important feature of Python's ABCs.
:p What are virtual subclasses in the context of ABCs?
??x
Virtual subclasses in the context of ABCs refer to classes that don't explicitly inherit from the ABC but still satisfy its abstract methods and are recognized by `isinstance` and `issubclass`.

This allows for a more flexible type checking mechanism, as these virtual subclasses can be treated as if they were direct subclasses.
```python
from abc import ABC, abstractmethod

class DrawABC(ABC):
    @abstractmethod
    def draw(self):
        pass

class DrawingTool:
    def draw(self):
        print("Drawing with tool")

isinstance(DrawingTool(), DrawABC)  # True
```
x??

---

#### Inheritance and Interface Enforcement
Background context: The text provides an example of how two unrelated classes (`Gunslinger` and `Lottery`) might have a method named `draw` that makes them seem interchangeable, but without proper interface enforcement, their actual behaviors may differ.
:p How can you ensure that unrelated classes with similar methods are truly interchangeable?
??x
To ensure that unrelated classes like `Gunslinger` and `Lottery`, which both implement the `draw` method, are truly interchangeable in certain contexts, you can use ABCs to define an interface. By requiring all relevant classes to inherit from or implement a common abstract base class (ABC), you enforce consistency in behavior.

Here's an example:
```python
from abc import ABC, abstractmethod

class DrawABC(ABC):
    @abstractmethod
    def draw(self):
        pass

class Gunslinger(DrawABC):
    def draw(self):
        print("Drawing a weapon")

class Lottery(DrawABC):
    def draw(self):
        print("Drawing lottery numbers")

guns = Gunslinger()
lottery = Lottery()

isinstance(guns, DrawABC)  # True
isinstance(lottery, DrawABC)  # True
```
x??


#### Virtual Subclassing and ABCs
Virtual subclassing allows you to define a relationship between an abstract base class (ABC) and your custom classes, even if they do not directly inherit from it. This is useful for runtime checks using `isinstance` or `issubclass`.

:p What is virtual subclassing in the context of Python’s Abstract Base Classes (ABCs)?
??x
Virtual subclassing is a mechanism that allows you to declare a relationship between an abstract base class and your custom classes without direct inheritance. This can be done through the `register` method provided by ABCs, which marks a class as a virtual subclass.

Example:
```python
from collections.abc import Sequence

class FrenchDeck:
    # Class definition here

Sequence.register(FrenchDeck)  # Marking FrenchDeck as a virtual subclass of Sequence
```
x??

---

#### Implementing Special Methods for ABC Recognition
Implementing specific special methods (like `__len__` or `__iter__`) in your class allows it to be recognized by certain ABCs, such as `abc.Sized` and `collections.abc.Iterable`.

:p How can a custom class like `Struggle` be recognized as an instance of an ABC without direct inheritance?
??x
By implementing the required special methods (like `__len__` for `Sized` or `__iter__` for `Iterable`). Implementing these methods with appropriate syntax and semantics ensures that your class can be recognized by certain ABCs.

Example:
```python
class Struggle:
    def __len__(self):
        return 23

from collections import abc

isinstance(Struggle(), abc.Sized)  # Returns True because it implements __len__
```
x??

---

#### Using `isinstance` with ABCs for Type Checking
Using `isinstance` to check if an object is an instance of a specific abstract base class allows for more flexible and polymorphic type checks.

:p Why should you use `isinstance` with ABCs instead of concrete classes?
??x
Using `isinstance` with ABCs provides flexibility because it can recognize virtual subclasses that do not directly inherit from the ABC but implement the required methods. This approach supports polymorphism better than checking against concrete classes, as type checks against specific classes can limit polymorphic behavior.

Example:
```python
from collections import abc

class FrenchDeck:
    pass  # Class definition here

Sequence.register(FrenchDeck)  # Marking FrenchDeck as a virtual subclass of Sequence

isinstance(FrenchDeck(), abc.Sequence)  # Returns True due to virtual subclass relationship
```
x??

---

#### Avoiding Excessive `isinstance` Checks
Excessive use of `isinstance` checks can be seen as a code smell and may indicate bad object-oriented design, as it can break polymorphism.

:p What are the potential downsides of using `isinstance` with concrete classes?
??x
Using `isinstance` checks against specific concrete classes limits polymorphism. Polymorphism is a key feature in OOP that allows you to treat objects of different types uniformly through their common interface. Excessive type checks can override this behavior, leading to rigid code that may be harder to maintain and extend.

Example:
```python
if isinstance(obj, ConcreteClassA):
    # Do something
elif isinstance(obj, ConcreteClassB):
    # Do something else
```
Such a pattern can be problematic as it ties the logic to specific types, making the code less flexible.

x??

---

#### Polymorphism vs. Type Checking with ABCs
Instead of using `isinstance` checks against concrete classes, you should prefer polymorphism by designing your classes such that the interpreter dispatches calls to appropriate methods based on their interface, not their exact type.

:p How can you use polymorphism instead of `isinstance` checks?
??x
You can design your classes so that method calls are dispatched according to the object's interface rather than its specific type. This means defining methods in abstract base classes (ABCs) and then implementing them in concrete subclasses, allowing the interpreter to choose the correct implementation based on the method signature.

Example:
```python
from abc import ABC, abstractmethod

class MyInterface(ABC):
    @abstractmethod
    def do_something(self):
        pass

class ImplementationA(MyInterface):
    def do_something(self):
        print("Doing something in A")

class ImplementationB(MyInterface):
    def do_something(self):
        print("Doing something in B")
```
Here, `do_something` is defined in the interface and implemented differently in each subclass. The correct implementation will be called based on the type of the object at runtime.

x??

---


#### Duck Typing and ABCs in Python
Background context: The passage discusses the use of duck typing and abstract base classes (ABCs) in Python, particularly within a plug-in architecture. It emphasizes that duck typing is simpler and more flexible than explicit type checks, and advises restraint in using ABCs to avoid unnecessary ceremony.

:p What is the advantage of using duck typing over explicit type checking?
??x
Duck typing allows objects to be used based on their behavior rather than their inheritance or explicitly declared types. This makes the code more flexible because it relies on whether an object has certain methods or attributes, rather than enforcing strict type hierarchies.

For example:
```python
def do_something(obj):
    if hasattr(obj, 'do'):
        obj.do()
```
Here, `do_something` works with any object that has a `do` method.
x??

---

#### Python's collections.MutableSequence Abstract Base Class (ABC)
Background context: The passage introduces the use of `MutableSequence` as an abstract base class from the `collections.abc` module in Python. It explains how subclassing this ABC forces the implementation of certain methods, even if they are not used.

:p What is the purpose of `MutableSequence` and why might one subclass it?
??x
`MutableSequence` is a predefined ABC that encapsulates behaviors expected from mutable sequence types like lists or deques. Subclassing `MutableSequence` requires implementing methods such as `__delitem__` and `insert`, even if these methods are not used in the specific implementation.

For example, to subclass `MutableSequence`:
```python
from collections.abc import MutableSequence

class FrenchDeck2(MutableSequence):
    # ... (implementation details)
```
This ensures that the class behaves correctly with operations expected from mutable sequences.
x??

---

#### Implementing Abstract Methods in Subclasses
Background context: The passage highlights that when subclassing an ABC, one must implement all abstract methods defined by that ABC, even if these methods are not used in the specific implementation. Failure to do so will result in a `TypeError`.

:p What happens if a subclass of `MutableSequence` does not implement all required methods?
??x
If a subclass of `MutableSequence` does not implement all required methods (e.g., `__delitem__` and `insert`), attempting to instantiate the class will raise a `TypeError`. This is because these methods are abstract, meaning they must be implemented for the class to be considered fully defined.

Example:
```python
class FrenchDeck2(MutableSequence):
    # ... (implementation details)
```
If `FrenchDeck2` does not implement `__delitem__` and `insert`, instantiating it will result in:
```
TypeError: Can't instantiate abstract class FrenchDeck2 with abstract methods __delitem__, insert
```

This enforces that the subclass conforms to the contract defined by its ABC.
x??

---

#### Benefits of Using Existing Abstract Base Classes (ABCs)
Background context: The passage emphasizes the benefits of using existing ABCs like `MutableSequence` rather than creating new ones. It suggests that writing custom ABCs can introduce unnecessary complexity.

:p Why should one prefer using existing ABCs over creating their own in Python?
??x
Using existing ABCs, such as `MutableSequence`, leverages well-established and tested behaviors defined by the community. This approach is simpler and reduces the risk of misdesign because it adheres to established patterns without requiring developers to reinvent the wheel.

For example, using `MutableSequence`:
```python
from collections.abc import MutableSequence

class FrenchDeck2(MutableSequence):
    # ... (implementation details)
```
This allows `FrenchDeck2` to inherit useful behaviors and methods like `__contains__`, `__iter__`, `__reversed__`, `index`, and `count` without needing to reimplement them.
x??

---

#### Inheritance Diagram for MutableSequence
Background context: The passage includes a UML class diagram showing the relationships between `MutableSequence` and its superclasses. This diagram helps understand which methods are abstract and must be implemented.

:p What can you infer about the methods in the `MutableSequence` ABC based on the provided UML diagram?
??x
From the UML diagram, we can infer that not all methods of `MutableSequence` are abstract. The diagram shows that some methods like `__contains__`, `__iter__`, `__reversed__`, `index`, and `count` are concrete (non-abstract), while others like `__delitem__` and `insert` are abstract.

For example, the following methods must be implemented:
```python
def __delitem__(self, position):
    del self._cards[position]

def insert(self, position, value):
    self._cards.insert(position, value)
```
These methods are required to satisfy the contract defined by `MutableSequence`.
x??

---

