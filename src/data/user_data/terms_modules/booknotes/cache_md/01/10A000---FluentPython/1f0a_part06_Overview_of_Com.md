# High-Quality Flashcards: 10A000---FluentPython_processed (Part 6)


**Starting Chapter:** Overview of Common Mapping Methods

---


#### Hashable Objects in Python

Hashability is a fundamental property of objects in Python, crucial for understanding how they can be used as keys in dictionaries or elements in sets. A hashable object must have a hash code that never changes during its lifetime and can be compared to other objects.

Relevant context:
- A hashable object has two methods: `__hash__()` and `__eq__()`.
- Objects are considered hashable if they return the same hash code for equivalent states.
- Hash codes may vary between Python versions, machine architectures, and due to security salts added during computation.

:p What is a hashable object in Python?
??x
A hashable object in Python is one that can be used as a key in a dictionary or an element in a set. It must have a consistent `__hash__()` method that returns the same value for equivalent states and a `__eq__()` method to compare objects.

It’s important because:
- The hash code of a hashable object should remain constant throughout its lifetime.
- Equivalent objects (those that return true from `__eq__()`) must have the same hash code.
??x
The answer with detailed explanations. Include code examples if relevant:

```python
class ExampleClass:
    def __init__(self, value):
        self.value = value

    def __hash__(self):
        # This method should ensure that equivalent objects return the same hash code
        return hash(self.value)

    def __eq__(self, other):
        # Ensure that comparing equal objects returns True
        if isinstance(other, ExampleClass):
            return self.value == other.value
        return False

# Example usage:
obj1 = ExampleClass(10)
obj2 = ExampleClass(10)

print(hash(obj1) == hash(obj2))  # Should print True
print(obj1 == obj2)  # Should print True
```
x??

---

#### Custom Mapping Classes in Python

Custom mapping classes allow you to create custom data structures that mimic the behavior of dictionaries. These can be useful for implementing complex data handling logic.

Relevant context:
- `collections.UserDict` is a good base class for creating custom mappings.
- Wrapping a dictionary using composition can also achieve similar results without subclassing built-in types directly.
- All concrete mapping classes in Python (like `dict`, `defaultdict`, and `OrderedDict`) are based on dictionaries, making them hashable if their keys are.

:p What is the difference between extending `collections.UserDict` and subclassing a concrete dictionary class?
??x
Extending `collections.UserDict` or wrapping a dictionary by composition can be preferred over directly subclassing a concrete dictionary class. This approach allows for more flexibility in implementing custom behavior while still benefiting from the underlying hash table implementation of dictionaries.

The key difference is:
- **UserDict**: Allows you to customize the internal logic without modifying the core `dict` structure, which remains immutable and highly optimized.
- **Subclassing Concrete Dicts**: Directly subclassing a concrete dictionary might lead to unexpected behavior due to the strict contract required by these classes (e.g., ensuring keys are hashable).

Code example:
```python
from collections import UserDict

class MyCustomMapping(UserDict):
    def __missing__(self, key):
        # Custom logic when accessing a non-existent key
        return f"Key {key} not found in mapping"
```
x??

---

#### Common Mapping Methods in Python

The common methods available for mappings like `dict`, `defaultdict`, and `OrderedDict` provide a rich API for handling keys, values, and items.

Relevant context:
- These methods include operations such as adding, removing, retrieving, updating, and iterating over items.
- The `collections` module offers variations of these basic mapping types to handle specific use cases (e.g., ensuring order with `OrderedDict`, providing default values with `defaultdict`).

:p List the common methods for mappings like `dict`, `defaultdict`, and `OrderedDict`.
??x
Common methods for mappings include:

- **Adding/Removing Items**: `clear()`, `pop(k, [default])`, `popitem()` (last item if not specified).
- **Retrieving Values**: `get(k, [default])`, `__getitem__(k)`.
- **Setting Values**: `__setitem__(k, v)`.
- **Updating Items**: `update(m, [**kwargs])`.
- **Viewing Items**: `items()`, `keys()`, `values()`.

Code example:
```python
from collections import defaultdict, OrderedDict

# Example with a default dictionary
d = defaultdict(int)
d['a'] += 10
print(d)  # defaultdict(<class 'int'>, {'a': 10})

# Example with an ordered dictionary
od = OrderedDict()
od['apple'] = 5
od['banana'] = 3
print(od)  # OrderedDict([('apple', 5), ('banana', 3)])
```
x??

---

#### Hash Code Computation in Python

Hash codes are used to provide a unique integer representation for objects that can be used as dictionary keys. Understanding how hash codes are computed is crucial for ensuring consistent behavior across operations.

Relevant context:
- The `hash()` function computes the hash code of an object.
- For user-defined types, the default implementation uses the object’s ID.
- Custom types need to implement both `__hash__()` and `__eq__()` methods correctly.

:p What is a hash code in Python?
??x
A hash code in Python is a unique integer representation of an object. It is used by dictionaries and sets to quickly find or retrieve values based on their keys. The hash code must remain consistent for equivalent objects throughout their lifetime, as it affects how they are stored and accessed.

:p How does the `hash()` function work with built-in types?
??x
The `hash()` function works differently depending on the type of object:

- For immutable types like numbers (`int`, `float`), strings (`str`), bytes, and tuples where all elements are hashable: The `hash()` function directly computes a unique integer.
- For mutable collections like lists or sets: These cannot be hashed because their state can change.

Example:
```python
print(hash(123))  # Hashes an integer
# print(hash([1, 2, 3]))  # Raises TypeError as list is not hashable
```
x??

---

These flashcards provide a structured way to familiarize yourself with the concepts of hashability and common mapping methods in Python.


#### Default Factory in `defaultdict`
Background context explaining that a default factory is used to instantiate the default value for a missing key. It's not a method but a callable attribute set by the user when creating a `defaultdict`.

:p What is a default factory in `defaultdict`?
??x
A default factory in `defaultdict` is a callable object (like a function or lambda) that determines what to return when a non-existent key is accessed. When the key does not exist, Python calls this callable and uses its return value as the default value for that key.
```python
from collections import defaultdict

def create_list():
    return []

d = defaultdict(create_list)
print(d['missing_key'])  # Output: []
```
x??

---

#### OrderedDict Popitem Behavior
Background context explaining how `OrderedDict.popitem` works and its behavior with the `last` keyword. Mention that this method removes either the first or last item based on the argument.

:p What does `OrderedDict.popitem(last=False)` do?
??x
`OrderedDict.popitem(last=False)` removes the first item inserted into the dictionary (FIFO). If `last=True`, it would remove the last item, but as of Python 3.10b3, this keyword is not supported in `OrderedDict` or its parent class `dict`.

```python
from collections import OrderedDict

od = OrderedDict()
od['a'] = 1
od['b'] = 2
od['c'] = 3

# Removes the first item ('a', 1)
print(od.popitem(last=False))  # Output: ('a', 1)

# Removing the last item would not work as of Python 3.10b3
# print(od.popitem(last=True))
```
x??

---

#### `update` Method Behavior with Mapping
Background context explaining how the `update` method in dictionaries works and its use of duck typing to handle different types of input.

:p How does the `update` method work with its first argument?
??x
The `update` method checks if the first argument (`m`) has a `keys` method. If it does, `update()` assumes that `m` is a mapping and uses those keys and values to update or add new entries. Otherwise, it iterates over `m`, treating each item as a (key, value) pair.

This behavior is an example of duck typing in Python, where the method checks if the object behaves like a dictionary by having a `keys` method.
```python
d = {'a': 1}
m = {'b': 2, 'c': 3}

# Assuming m has keys()
d.update(m)
print(d)  # Output: {'a': 1, 'b': 2, 'c': 3}

# Non-mapping object treated as (key, value) pairs
l = [(4, 5), (6, 7)]
d.update(l)
print(d)  # Output: {'a': 1, 'b': 2, 'c': 3, 4: 5, 6: 7}
```
x??

---

#### `setdefault` Method in Dictionaries
Background context explaining the use of `setdefault` to avoid redundant key lookups when updating a value in place.

:p What is the purpose of `dict.setdefault`?
??x
The purpose of `dict.setdefault` is to return the value for the specified key if it exists. If not, it inserts the key with a value returned by the callable provided (or default value) and returns that value. This method avoids redundant key lookups when updating values in place.

```python
d = {}
word = 'apple'
location = (1, 2)

# Using setdefault to handle missing keys
locations = d.setdefault(word, []).append(location)
print(d[word])  # Output: [Location(1, 2)]
```
x??

---

#### Example of `dict.get` vs. `setdefault`
Background context explaining the differences between using `get` and `setdefault` for dictionary operations.

:p How does `index0.py` use `dict.get` to handle missing keys?
??x
In `index0.py`, a script is shown that uses `dict.get` to fetch and update a list of word occurrences. However, it results in redundant key lookups because the value has to be fetched again when updating.

```python
index = {}
with open('zen.txt', encoding='utf-8') as fp:
    for line_no, line in enumerate(fp, 1):
        for match in re.finditer(r'\w+', line):
            word = match.group()
            column_no = match.start() + 1
            location = (line_no, column_no)
            
            # This is ugly; coded like this to make a point
            occurrences = index.get(word, [])
            occurrences.append(location)
            index[word] = occurrences

for word in sorted(index, key=str.upper):
    print(word, index[word])
```
x??

---

#### Example of Using `setdefault` for Better Performance
Background context explaining the improvement provided by using `setdefault` to avoid redundant key lookups.

:p How does `index.py` use `dict.setdefault` more efficiently?
??x
In `index.py`, a script is shown that uses `dict.setdefault` to fetch and update a list of word occurrences in a single line. This avoids the redundant key lookup, making the code more efficient.

```python
import re

WORD_RE = re.compile(r'\w+')
index = {}

with open('zen.txt', encoding='utf-8') as fp:
    for line_no, line in enumerate(fp, 1):
        for match in WORD_RE.finditer(line):
            word = match.group()
            column_no = match.start() + 1
            location = (line_no, column_no)
            
            # Using setdefault to handle missing keys and update in one go
            index.setdefault(word, []).append(location)

for word in sorted(index, key=str.upper):
    print(f'{word}: {index[word]}')
```
x??


#### StrKeyDict and __missing__
Background context: The provided text discusses a custom dictionary subclass, `StrKeyDict`, that handles string conversion for keys. This is useful to ensure consistent behavior when dealing with mixed-type keys.

:p What does the `__missing__` method do in `StrKeyDict`?
??x
The `__missing__` method is overridden to handle missing keys by converting the key to a string and then calling `__getitem__` on the dictionary. This ensures that any non-string key can be converted and searched as if it were a string.

```python
class StrKeyDict(dict):
    def __missing__(self, key):
        # Convert the key to a string and try to get its value
        return self[str(key)]
```
x??

---

#### Consistency with __contains__
Background context: The `__contains__` method is necessary for consistent behavior in checking membership. The text explains why a direct `k in d` check needs to be handled differently.

:p Why does the implementation of `__contains__` use `key in self.keys()` instead of `str(key) in self`?
??x
Using `key in self.keys()` avoids recursive calls because directly using `str(key) in self` would invoke `__contains__`, causing a potential infinite recursion. By explicitly checking keys, we bypass the attribute lookup for `.keys()`, ensuring efficient and non-recursive behavior.

```python
class StrKeyDict(dict):
    def __contains__(self, key):
        # Check if the key is in the dictionary's keys, avoiding recursive calls
        return str(key) in self.keys()
```
x??

---

#### OrderedDict Overview
Background context: The `OrderedDict` class was designed to maintain the order of items inserted. While Python 3.6+ built-in `dict` also maintains insertion order, `OrderedDict` is still useful for backward compatibility and specific functionalities.

:p What are some key differences between `OrderedDict` and regular `dict` as mentioned in the text?
??x
Key differences include:
- The equality operation for `OrderedDict` checks matching order.
- The `popitem()` method of `OrderedDict` has a different signature, allowing specification of which item is popped.
- `OrderedDict` includes an efficient `move_to_end()` method to reposition elements.

These features make `OrderedDict` suitable for scenarios requiring frequent reordering operations or maintaining the insertion order strictly.

x??

---

#### ChainMap Overview
Background context: A `ChainMap` instance combines multiple mappings, allowing a unified view of them. The lookup process searches through each mapping in the order provided until it finds the key.

:p What does `ChainMap` do and how is it used?
??x
A `ChainMap` combines multiple dictionaries or other mappings into a single unit. It allows for efficient lookups by searching each input mapping in the specified order until the key is found. This can be particularly useful in scenarios where you need to simulate nested scope access, such as variable lookup in programming languages.

```python
from collections import ChainMap

d1 = dict(a=1, b=3)
d2 = dict(a=2, b=4, c=6)

chain = ChainMap(d1, d2)
print(chain['a'])  # Output: 1
print(chain['c'])  # Output: 6
```
x??

---

#### Counter Overview
Background context: A `Counter` is a dictionary subclass for counting hashable objects. It stores elements as dictionary keys and their counts as dictionary values.

:p What does the `Counter` class do?
??x
The `Counter` class is used to count the occurrences of hashable objects in an iterable. It returns a dictionary-like object where each key is an element from the input, and its value is the number of times it appears.

```python
from collections import Counter

c = Counter('abcdaab')
print(c)  # Output: Counter({'a': 3, 'b': 2, 'c': 1, 'd': 1})
```
x??

