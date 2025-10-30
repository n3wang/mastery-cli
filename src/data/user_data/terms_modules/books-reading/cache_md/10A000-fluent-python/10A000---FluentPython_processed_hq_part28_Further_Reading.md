# High-Quality Flashcards: 10A000---FluentPython_processed (Part 28)

**Rating threshold:** >= 8/10

**Starting Chapter:** Further Reading

---

**Rating: 8/10**

#### Generators and Custom Formats
Background context explaining how generators support custom formats. Emphasize that this is to fulfill the promise of a Vector class that can do everything a Vector2d did, and more. This involves understanding standard Python objects' behaviors.

:p What are generators used for in the context of creating a Vector class?
??x
Generators are used to implement custom formatting methods (like `__format__`) in a Vector class to support a custom format beyond what Vector2d can do.
??x

---

#### Infix Operators and OO Design
Background context explaining that infix operators will be implemented on the Vector class, making it behave more like standard Python objects. This is part of achieving a "Pythonic" look-and-feel.

:p What does implementing infix operators mean for the Vector class?
??x
Implementing infix operators means adding methods to make operations (like addition or multiplication) between two Vectors readable and intuitive using operator syntax, e.g., `vec1 + vec2` instead of `operator.add(vec1, vec2)`.

```python
class Vector:
    def __add__(self, other):
        # Implementation details for vector addition
```
??x

---

#### Interfaces and Inheritance
Background context explaining that before diving into operator overloading, the text will revisit organizing multiple classes with interfaces and inheritance. Reference Chapters 13 and 14.

:p What does revisiting interfaces and inheritance imply in this context?
??x
Revisiting interfaces and inheritance suggests exploring how different classes can interact or inherit from one another to build a more complex system, such as the Vector class.
??x

---

#### Further Reading on Special Methods
Background context explaining that special methods (like `__format__` and `__getitem__`) will be referenced in further reading. Note the relevance of these methods in the Vector example.

:p What are some additional resources for understanding the special methods used in the Vector class?
??x
Additional resources include "Further Reading" which references the Vector2d example from Chapter 11, as well as information on `__index__` and its use with `__getitem__` methods.
??x

---

#### New Features in Python 2.5
Background context explaining that new features like `__index__` are introduced to support `__getitem__` methods. Reference "What's New in Python 2.5" for more details.

:p What is the significance of the `__index__` method?
??x
The `__index__` method allows objects to be used in contexts where an integer index is expected, such as slicing operations.
??x

---

#### Protocols and Informal Interfaces
Background context explaining that protocols are informal interfaces, similar to those found in Smalltalk. Discuss the use of "a file-like object" as a protocol example.

:p How do protocols (informal interfaces) work in Python?
??x
Protocols in Python allow objects to behave like other types by implementing relevant methods, without being strictly enforced by the language.
??x

---

#### Evolving Protocols with Dynamic Typing
Background context explaining that established protocols can naturally evolve in languages using dynamic typing due to runtime type checking. Discuss how this applies to Ruby and Python.

:p Why are protocols particularly useful in dynamically typed languages like Python?
??x
Protocols are useful in dynamically typed languages because they allow objects to be flexible and adaptable, implementing only relevant parts of a protocol as needed.
??x

---

**Rating: 8/10**

#### Duck Typing
Duck typing is Python's default approach to typing, which has been present since its early days. It is based on the idea that "if it looks like a duck and quacks like a duck, then it probably is a duck." In programming terms, if an object implements all the necessary methods of another type, it can be treated as that type.

:p What does duck typing entail in Python?
??x
Duck typing involves treating objects based on their attributes and methods rather than their class inheritance. If an object has the required methods or properties, it can be used as if it were of a certain type.
```python
class Duck:
    def quack(self):
        print("Quack!")

def perform_quack(d: Duck) -> None:
    d.quack()

duck = Duck()
perform_quack(duck)
```
x??

---

#### Goose Typing
Goose typing is an approach supported by Abstract Base Classes (ABCs) since Python 2.6, which relies on runtime checks of objects against ABCs. This means that the methods defined in the ABC are used to define what it means for a class to be considered a "duck" or "goose." This can help ensure compatibility and provide more explicit type checking at runtime.

:p What is goose typing?
??x
Goose typing involves using Abstract Base Classes (ABCs) with predefined methods. These methods act as contracts that subclasses must implement. At runtime, the ABC checks whether a class has implemented these methods, ensuring it behaves correctly.
```python
from abc import ABC, abstractmethod

class Goose(ABC):
    @abstractmethod
    def honk(self) -> None:
        pass

def perform_honk(g: Goose) -> None:
    g.honk()

goose = Goose()
perform_honk(goose)
```
x??

---

#### Static Typing
Static typing is a traditional approach found in statically-typed languages like C and Java, where types are checked at compile time. In Python 3.5 and later, static typing was introduced through the `typing` module, which supports type hints but does not enforce them during runtime. External tools can check these types.

:p What is static typing?
??x
Static typing in programming means that the type of a variable or object must be declared before it is used, and this type cannot change over its lifetime. This approach enforces type checking at compile time rather than runtime.
```python
from typing import Protocol

class CanFly(Protocol):
    def fly(self) -> None:
        ...

def perform_flight(f: CanFly) -> None:
    f.fly()

class Bird:
    def fly(self) -> None:
        print("Flying...")

bird = Bird()
perform_flight(bird)
```
x??

---

#### Static Duck Typing
Static duck typing, introduced in Python 3.8 with `typing.Protocol`, is an approach inspired by Go's type system. It allows for defining protocols that specify a set of methods that must be implemented, and these can be checked statically.

:p What is static duck typing?
??x
Static duck typing involves using the `typing.Protocol` class to define interfaces or contracts. These protocols do not inherit from `ABC`, but they still enforce that classes implement certain methods. This allows for more precise type checking at both runtime and compile time.
```python
from typing import Protocol

class CanFly(Protocol):
    def fly(self) -> None:
        ...

def perform_flight(f: CanFly) -> None:
    f.fly()

class Bird:
    def fly(self) -> None:
        print("Flying...")

bird = Bird()
perform_flight(bird)
```
x??

---

**Rating: 8/10**

#### Sequence Protocol in Python
Python has a robust data model that cooperates with essential dynamic protocols, such as sequences. The sequence protocol is formalized via Abstract Base Classes (ABCs) to ensure proper behavior when dealing with iterable objects.

:p What is a Sequence ABC in Python?
??x
The `Sequence` abstract base class from the `collections.abc` module defines a set of methods that classes can implement to behave like sequences. These include operations like indexing (`__getitem__`) and determining length (`__len__`). Classes implementing these methods can be treated as sequences by Python's built-in functions.
```python
from collections.abc import Sequence

class CustomSequence(Sequence):
    def __getitem__(self, index):  # Required method for indexing
        pass
    
    def __len__(self):  # Required method for determining length
        pass
```
x??

---

#### Iterability and `__getitem__` Method
Python's dynamic nature allows objects to be iterable even if they do not explicitly implement the `Iterable` protocol. Instead, Python checks if an object has a `__getitem__` method that can be used to iterate over it.

:p How does Python handle iteration on objects without implementing `__iter__`?
??x
Python uses the `__getitem__` method as a fallback for iteration. If an object provides this method and is subscriptable, Python will attempt to iterate over it by calling `__getitem__` with integer indexes starting from 0.

For example:
```python
class Vowels:
    vowels = 'aeiou'

    def __getitem__(self, index):
        return self.vowels[index]

vowels = Vowels()
for vowel in vowels:  # Python will call __getitem__ internally to iterate over vowels
    print(vowel)
```
x??

---

#### `in` Operator and Sequence Protocols
The `in` operator works with objects that implement the sequence protocol, even if they do not explicitly provide a `__contains__` method. This is because Python uses `__getitem__` in conjunction with a sequential scan to check for containment.

:p How does the `in` operator work on an object without `__contains__`?
??x
The `in` operator works by sequentially scanning the object using `__getitem__`. If the sequence protocol (which includes `__len__` and `__getitem__`) is implemented, Python can use these methods to check for the presence of items.

Example:
```python
class Vowels:
    vowels = 'aeiou'

    def __getitem__(self, index):
        return self.vowels[index]

vowels = Vowels()
print('a' in vowels)  # True, because 'a' is found using __getitem__
```
x??

---

#### `FrenchDeck` as a Sequence Example
The `FrenchDeck` class from the text provides an implementation of the sequence protocol. It implements both `__len__` and `__getitem__`, making it iterable.

:p How does `FrenchDeck` make use of the sequence protocol?
??x
`FrenchDeck` defines a deck of cards as a sequence by implementing the required methods of the sequence protocol:
- `__len__`: Returns the length of the deck.
- `__getitem__`: Allows indexing, enabling iteration over the deck.

Here is an example of how it works:
```python
class FrenchDeck:
    ranks = [str(n) for n in range(2, 11)] + list('JQKA')
    suits = 'spades diamonds clubs hearts'.split()
    
    def __init__(self):
        self._cards = [Card(rank, suit) for suit in self.suits
                       for rank in self.ranks]
        
    def __len__(self):
        return len(self._cards)
    
    def __getitem__(self, position):
        return self._cards[position]

deck = FrenchDeck()
for card in deck:
    print(card)  # Iterates over the cards using __getitem__
```
x??

---

#### Inheritance and Protocol Implementation
The `Sequence` ABC provides a blueprint for implementing sequence behavior. However, not all classes need to inherit from it directly; they can implement the required methods (`__len__` and `__getitem__`) independently.

:p Can a class be considered as a sequence without inheriting from `abc.Sequence`?
??x
Yes, a class can be treated as a sequence by implementing `__len__` and `__getitem__`. These methods allow Python to treat the class as if it were a sequence. The `Sequence` ABC is just one way of ensuring proper behavior but not mandatory.

Example:
```python
from collections import abc

class Vowels(abc.Sequence):
    vowels = 'aeiou'

    def __getitem__(self, index):
        return self.vowels[index]
    
    def __len__(self):
        return len(self.vowels)

vowels = Vowels()
print(len(vowels))  # 5
print('a' in vowels)  # True
```
x??

---

