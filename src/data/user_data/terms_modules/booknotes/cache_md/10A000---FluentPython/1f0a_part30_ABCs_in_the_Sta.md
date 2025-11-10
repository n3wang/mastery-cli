# High-Quality Flashcards: 10A000---FluentPython_processed (Part 30)


**Starting Chapter:** ABCs in the Standard Library

---


#### Iterable Interface
Iterable supports iteration with the `__iter__` method. This interface is crucial for creating classes that can be iterated over, such as lists or custom sequence types.

:p What does the `Iterable` interface support?
??x
The `Iterable` interface supports iteration through a class by defining the `__iter__` method. This allows instances of your class to be used in loops and other constructs where an iterable is required.
```python
class MyIterable:
    def __iter__(self):
        # Logic to return an iterator over the elements
        pass
```
x??

---

#### Container Interface
The `Container` interface supports the membership test with the `__contains__` method. This allows checking if a value exists within a container, similar to using the `in` operator.

:p What does the `Container` interface support?
??x
The `Container` interface supports the `in` operator by defining the `__contains__` method. This is useful for implementing membership tests in custom classes.
```python
class MyContainer:
    def __contains__(self, item):
        # Logic to check if 'item' exists within the container
        pass
```
x??

---

#### Sized Interface
The `Sized` interface supports the determination of the size or length with the `__len__` method. This is essential for classes that need to report their size, like lists or dictionaries.

:p What does the `Sized` interface support?
??x
The `Sized` interface supports getting the size of a collection by defining the `__len__` method. This allows you to use functions or methods that require knowing the length of your class instance.
```python
class MySized:
    def __len__(self):
        # Logic to return the number of elements in the object
        pass
```
x??

---

#### Collection ABC
The `Collection` abstract base class (ABC) is a helper for subclasses that need to implement all three interfaces: `Iterable`, `Container`, and `Sized`. It was added in Python 3.6.

:p What does the `Collection` ABC do?
??x
The `Collection` ABC simplifies subclassing by requiring the implementation of the `__iter__`, `__contains__`, and `__len__` methods, making it easier to create custom collection classes.
```python
from collections.abc import Collection

class MyCustomCollection(Collection):
    def __iter__(self):
        # Logic for iteration
        pass
    
    def __contains__(self, item):
        # Logic for membership test
        pass
    
    def __len__(self):
        # Logic to return the number of elements
        pass
```
x??

---

#### Sequence ABC
The `Sequence` ABC is a concrete subclass that supports indexing and slicing in addition to the methods required by `Collection`. It has a mutable subclass called `MutableSequence`.

:p What does the `Sequence` ABC include?
??x
The `Sequence` ABC includes all the methods from the `Collection` ABC plus additional support for indexing and slicing. This makes it easier to create sequence types that can be indexed and sliced.
```python
from collections.abc import Sequence

class MyCustomSequence(Sequence):
    def __getitem__(self, index):
        # Logic to get an item at a specific index
        pass
    
    def __len__(self):
        # Logic to return the number of elements
        pass
```
x??

---

#### Mapping ABC
The `Mapping` ABC supports key-value pairs and has a mutable subclass called `MutableMapping`. It includes methods like `__getitem__`, `__setitem__`, `__delitem__`, and `__contains__`.

:p What does the `Mapping` ABC include?
??x
The `Mapping` ABC supports storing key-value pairs by defining methods such as `__getitem__`, `__setitem__`, `__delitem__`, and `__contains__`. It also has a mutable subclass called `MutableMapping`.
```python
from collections.abc import Mapping

class MyCustomMapping(Mapping):
    def __getitem__(self, key):
        # Logic to get the value for the given key
        pass
    
    def __setitem__(self, key, value):
        # Logic to set the value for the given key
        pass
    
    def __delitem__(self, key):
        # Logic to delete the item with the given key
        pass
```
x??

---

#### Set ABC
The `Set` ABC supports unique elements and has a mutable subclass called `MutableSet`. It includes methods like `__contains__`, `__iter__`, and `__len__`.

:p What does the `Set` ABC include?
??x
The `Set` ABC supports storing unique elements by defining methods such as `__contains__`, `__iter__`, and `__len__`. It also has a mutable subclass called `MutableSet`.
```python
from collections.abc import Set

class MyCustomSet(Set):
    def __contains__(self, element):
        # Logic to check if the element is in the set
        pass
    
    def __iter__(self):
        # Logic for iteration over elements
        pass
    
    def __len__(self):
        # Logic to return the number of unique elements
        pass
```
x??

---


#### Misleading isinstance and issubclass Checks

Background context: The `isinstance` and `issubclass` functions can sometimes be misleading when checking for specific behaviors like hashability or iterability. They only check if a class directly implements certain methods, not the actual behavior of an instance.

For example:
- A tuple containing unhashable elements is considered hashable based on `isinstance`, but it's not actually hashable.
- An object might be iterable according to `isinstance` even though its internal implementation doesn't support iteration via `__iter__`.

:p Can you explain why `isinstance(obj, Hashable)` can be misleading?
??x
`isinstance(obj, Hashable)` checks if the class of `obj` implements or inherits the `__hash__` method. However, this does not guarantee that `obj` itself is hashable in all scenarios. For instance, a tuple containing unhashable elements (like other tuples) can pass this check but still be unhashable due to its composition.

```python
# Example
tup = (1, 2, (3, 4))  # This tuple contains an unhashable element
print(isinstance(tup, Hashable))  # Output: True

# Trying to hash tup will raise TypeError
try:
    hash(tup)
except TypeError as e:
    print(e)  # Output: 'tuple' object is not hashable
```
x??

---
#### Duck Typing for Hashability

Background context: To accurately determine if an instance is hashable, calling `hash(obj)` directly is more reliable. If the instance isn't hashable, this will raise a `TypeError`.

:p How can you reliably check if an object is hashable?
??x
By calling `hash(obj)`, you can reliably check if an object is hashable. This method will raise a `TypeError` if the object cannot be hashed.

```python
# Example of checking hashability
obj = (1, 2, [3, 4])  # A tuple containing a list, which is not hashable

try:
    hash(obj)
except TypeError as e:
    print(e)  # Output: 'tuple' object is not hashable
```
x??

---
#### Iterability and __getitem__

Background context: Even if `isinstance(obj, Iterable)` returns False, an object might still be iterable using the `__getitem__` method with 0-based indices. The documentation for `collections.abc.Iterable` states that the only reliable way to determine iterability is by calling `iter(obj)`.

:p How can you check if an object supports iteration?
??x
The most reliable way to check if an object supports iteration is by calling `iter(obj)`. This will return an iterator, confirming that the object is iterable. Simply checking with `isinstance` might not be sufficient as it only checks direct class inheritance.

```python
# Example of checking iterability
class MyObject:
    def __getitem__(self, index):
        if 0 <= index < 5:
            return f"Item {index}"
        else:
            raise IndexError

obj = MyObject()
try:
    iter(obj)  # This will not raise an error and confirm iterability
except TypeError as e:
    print(e)
```
x??

---
#### Abstract Base Classes (ABCs)

Background context: ABCs are powerful tools for building frameworks, providing a way to define interfaces that classes must implement. In Python, you can create ABCs by subclassing `abc.ABC` and using the `@abstractmethod` decorator.

:p How do you define an abstract base class in Python?
??x
To define an abstract base class (ABC) in Python, you need to import from the `abc` module and subclass `abc.ABC`. Abstract methods are marked with the `@abstractmethod` decorator. Here's a basic example:

```python
import abc

class Tombola(abc.ABC):
    @abc.abstractmethod
    def load(self, iterable):
        """Add items from an iterable."""

    @abc.abstractmethod
    def pick(self):
        """Remove item at random, returning it.
        
        This method should raise `LookupError` when the instance is empty.
        """

    def loaded(self):  # A concrete method
        """Return True if there's at least one item, False otherwise."""
        return bool(self.inspect())

    def inspect(self):
        """Return a sorted tuple with the items currently inside."""
        items = []
        while True:
            try:
                items.append(self.pick())
            except LookupError:
                break
        self.load(items)
        return tuple(sorted(items))
```
x??

---
#### Tombola ABC Example

Background context: The `Tombola` ABC defines a framework for managing non-repeating random-picking classes. It includes abstract methods like `.load()` and `.pick()`, as well as concrete methods like `.loaded()` and `.inspect()`.

:p What is the purpose of the `Tombola` ABC in the given context?
??x
The purpose of the `Tombola` ABC is to provide a clear interface for classes that need to manage items without repeating them. It ensures that any class implementing this interface can be used interchangeably, allowing for flexibility and extensibility within an ad management framework called ADAM.

```python
# Example of Tombola ABC implementation
import abc

class Tombola(abc.ABC):
    @abc.abstractmethod
    def load(self, iterable):
        """Add items from an iterable."""

    @abc.abstractmethod
    def pick(self):
        """Remove item at random, returning it.
        
        This method should raise `LookupError` when the instance is empty.
        """

    def loaded(self):  # A concrete method
        """Return True if there's at least one item, False otherwise."""
        return bool(self.inspect())

    def inspect(self):
        """Return a sorted tuple with the items currently inside."""
        items = []
        while True:
            try:
                items.append(self.pick())
            except LookupError:
                break
        self.load(items)
        return tuple(sorted(items))
```
x??

---
#### Implementing Abstract Methods

Background context: In ABCs, abstract methods must be implemented by subclasses. While these methods may have an implementation in the ABC itself, they are still required to be overridden.

:p Can you provide an example of an `@abstractmethod` with a simple implementation?
??x
Sure! Here's an example where an abstract method has a simple implementation:

```python
import abc

class Tombola(abc.ABC):
    @abc.abstractmethod
    def load(self, iterable):
        """Add items from an iterable."""

    @abc.abstractmethod
    def pick(self):
        """Remove item at random, returning it.
        
        This method should raise `LookupError` when the instance is empty.
        """

    def loaded(self):  # A concrete method
        """Return True if there's at least one item, False otherwise."""
        return bool(self.inspect())

    def inspect(self):
        """Return a sorted tuple with the items currently inside."""
        items = []
        while True:
            try:
                items.append(self.pick())
            except LookupError:
                break
        self.load(items)
        return tuple(sorted(items))
```
In this example, `inspect` is a concrete method that relies on other methods to function correctly. It demonstrates how abstract and concrete methods can coexist in an ABC.

x??

---
#### Handling Abstract Methods with `super()`

Background context: Abstract methods can have implementations in the ABC itself, but subclasses must still override them using `@abstractmethod`. Subclasses can use `super()` to extend or modify the behavior of these methods.

:p How does `super()` work when implementing an abstract method in a subclass?
??x
When implementing an abstract method in a subclass and you want to leverage the implementation from the ABC, you can use `super()`. This allows you to add functionality without rewriting the entire method. Here’s how:

```python
import abc

class Tombola(abc.ABC):
    @abc.abstractmethod
    def load(self, iterable):
        """Add items from an iterable."""

    @abc.abstractmethod
    def pick(self):
        """Remove item at random, returning it.
        
        This method should raise `LookupError` when the instance is empty.
        """

    def loaded(self):  # A concrete method
        """Return True if there's at least one item, False otherwise."""
        return bool(self.inspect())

    def inspect(self):
        """Return a sorted tuple with the items currently inside."""
        items = []
        while True:
            try:
                items.append(self.pick())
            except LookupError:
                break
        self.load(items)
        return tuple(sorted(items))

class MyTombola(Tombola):
    def load(self, iterable):
        super().load(iterable)

    # Implementing other methods...
```
In this example, `MyTombola` extends the behavior of `Tombola`'s `load` method by calling its implementation with `super()`. This ensures that any additional logic in the ABC is preserved.

x??

---