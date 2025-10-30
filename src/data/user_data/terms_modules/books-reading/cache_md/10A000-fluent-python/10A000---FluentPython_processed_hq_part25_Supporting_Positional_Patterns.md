# High-Quality Flashcards: 10A000---FluentPython_processed (Part 25)

**Rating threshold:** >= 8/10

**Starting Chapter:** Supporting Positional Patterns

---

**Rating: 8/10**

#### Hashable Vectors
Background context: In Python, to make an object hashable (i.e., suitable for use as a dictionary key or set element), you need to define both `__hash__` and `__eq__` methods. The `__hash__` method returns the hash value of an instance, which is used by dictionaries and sets. It should be consistent across all instances that are considered equal.
:p What would be the expected behavior when using a hashable vector in a set?
??x
When you use a hashable vector in a set, Python will check for equality based on `__eq__` before adding or looking up elements. If two vectors are considered equal by their `__eq__` method, they will occupy the same slot in the set.
```python
v1 = Vector2d(3, 4)
v2 = Vector2d(3.0, 4.0)
print(set([v1, v2]))  # {Vector2d(x=3.0, y=4.0)}
```
x??

---

#### Read-Only Properties
Background context: Implementing read-only properties ensures that the value of an instance attribute cannot be changed once it is set. This is useful for creating immutable objects or ensuring data integrity.
:p How does implementing `__hash__` and `__eq__` correctly contribute to making a vector hashable?
??x
Implementing `__hash__` and `__eq__` methods allows vectors to be used as keys in dictionaries or elements in sets. The `__hash__` method provides the hash value, which is consistent for instances considered equal by `__eq__`. This ensures that if two vectors are considered equivalent, they will have the same hash value.
```python
class Vector2d:
    def __init__(self, x, y):
        self._x = x
        self._y = y
    
    @property
    def x(self):
        return self._x

    @property
    def y(self):
        return self._y
    
    def __hash__(self):
        # Combining hash values to make it consistent and unique
        return hash((self.x, self.y))
    
    def __eq__(self, other):
        if isinstance(other, Vector2d):
            return (self.x == other.x) and (self.y == other.y)
```
x??

---

#### Positional Patterns in `match` Expression
Background context: Python 3.10 introduced the `match` statement for pattern matching. By default, positional patterns require exact matches with the constructor arguments. However, you can enable positional matching by defining a class attribute named `__match_args__`.
:p How do you make a Vector2d compatible with positional match patterns?
??x
To support positional patterns in the `match` expression, you need to define the `__match_args__` class attribute listing the instance attributes used for pattern matching.
```python
class Vector2d:
    __match_args__ = ('x', 'y')
    
    def __init__(self, x, y):
        self._x = x
        self._y = y

    # Other methods...

# Example usage with match statement
def positional_pattern_demo(v: Vector2d) -> None:
    match v:
        case Vector2d(0, 0):  # Match when both coordinates are zero
            print(f'{v.r} is null')
        case Vector2d(0):     # Match when only the x-coordinate is zero
            print(f'{v.r} is vertical')
        case Vector2d(_, 0):  # Match when only the y-coordinate is zero
            print(f'{v.r} is horizontal')
```
x??

---

**Rating: 8/10**

#### Vector2d Class Overview
Background context explaining the Vector2d class, its purpose, and how it was developed. The class is a two-dimensional vector with several special methods implemented to support various operations such as arithmetic, comparison, formatting, and hashing.

:p What is the Vector2d class in this context?
??x
The Vector2d class represents a two-dimensional vector with properties for `x` and `y` coordinates. It implements multiple special methods like `__init__`, `__iter__`, `__repr__`, `__str__`, etc., to support operations such as arithmetic, comparison, formatting, and hashing.
```python
class Vector2d:
    __match_args__  = ('x', 'y')
    
    typecode = 'd'
    
    def __init__(self, x, y):
        self.__x = float(x)
        self.__y = float(y)

    @property
    def x(self):
        return self.__x

    @property
    def y(self):
        return self.__y
    
    # Other methods like __iter__, __repr__, etc.
```
x??

---

#### Vector2d Special Methods - `__init__` and Properties
Background context explaining the initialization of a vector with `x` and `y` coordinates, and how properties are used to provide controlled access to these values.

:p What does the `__init__` method in Vector2d do?
??x
The `__init__` method initializes a new instance of the Vector2d class by setting the `x` and `y` attributes. It ensures that the coordinates are converted to float type for consistency.
```python
def __init__(self, x, y):
    self.__x = float(x)
    self.__y = float(y)
```
x??

---

#### Vector2d Special Methods - `__iter__`
Background context explaining how iteration over a vector works and the role of the `__iter__` method in providing an iterator.

:p How does the `__iter__` method work in Vector2d?
??x
The `__iter__` method is implemented to allow iteration over the vector's coordinates. It returns a generator that yields the x and y values one by one.
```python
def __iter__(self):
    return (i for i in (self.x, self.y))
```
x??

---

#### Vector2d Special Methods - `__repr__` and `__str__`
Background context explaining how objects are represented as strings using the `__repr__` and `__str__` methods.

:p What do the `__repr__` and `__str__` methods in Vector2d return?
??x
The `__repr__` method returns a string representation of the vector that can be used to recreate the object. The `__str__` method returns a readable string representation of the vector's coordinates.
```python
def __repr__(self):
    class_name = type(self).__name__
    return '{}({:.r}, {:.r})'.format(class_name, *self)

def __str__(self):
    return str(tuple(self))
```
x??

---

#### Vector2d Special Methods - `__bytes__`
Background context explaining how to serialize a vector object into bytes and the role of the `__bytes__` method.

:p What does the `__bytes__` method in Vector2d do?
??x
The `__bytes__` method returns a byte representation of the vector. It first converts the typecode (in this case, 'd' for double precision float) to bytes and then appends the serialized coordinates.
```python
def __bytes__(self):
    return (bytes([ord(self.typecode)]) + 
            bytes(array(self.typecode, self)))
```
x??

---

#### Vector2d Special Methods - `__eq__` and `__hash__`
Background context explaining how to compare vector objects for equality and generate unique hash values.

:p How does the `__eq__` method in Vector2d compare vectors?
??x
The `__eq__` method compares two vectors by comparing their coordinates as tuples. It returns `True` if both coordinates are equal, otherwise `False`.
```python
def __eq__(self, other):
    return tuple(self) == tuple(other)
```
x??

---

#### Vector2d Special Methods - `__hash__`
Background context explaining the role of hashing in equality checks and set operations.

:p What does the `__hash__` method in Vector2d do?
??x
The `__hash__` method returns a hash value for the vector. It combines the hashes of the x and y coordinates using the XOR operation to ensure unique identification.
```python
def __hash__(self):
    return hash(self.x) ^ hash(self.y)
```
x??

---

#### Vector2d Special Methods - `__abs__` and `__bool__`
Background context explaining how to get the magnitude of a vector and its truthiness.

:p What does the `__abs__` method in Vector2d do?
??x
The `__abs__` method returns the magnitude (or length) of the vector using the Euclidean distance formula.
```python
def __abs__(self):
    return math.hypot(self.x, self.y)
```
x??

---

#### Vector2d Special Methods - `__bool__`
Background context explaining how to determine if a vector is "truthy" based on its magnitude.

:p What does the `__bool__` method in Vector2d do?
??x
The `__bool__` method returns `True` if the vector has a non-zero length (i.e., not equal to zero), otherwise it returns `False`.
```python
def __bool__(self):
    return bool(abs(self))
```
x??

---

#### Vector2d Special Methods - `angle`
Background context explaining how to calculate the angle of a vector with respect to the x-axis.

:p What does the `angle` method in Vector2d do?
??x
The `angle` method calculates and returns the angle (in radians) that the vector makes with the positive x-axis using the `math.atan2` function.
```python
def angle(self):
    return math.atan2(self.y, self.x)
```
x??

---

#### Vector2d Special Methods - `__format__`
Background context explaining how to format a vector in various ways (Cartesian and polar coordinates).

:p What does the `__format__` method in Vector2d do?
??x
The `__format__` method formats the vector according to the specified format specification. It supports both Cartesian (`(x, y)`) and polar (`<r, theta>`) coordinate representations.
```python
def __format__(self, fmt_spec=''):
    if fmt_spec.endswith('p'):
        fmt_spec = fmt_spec[:-1]
        coords = (abs(self), self.angle())
        outer_fmt = '<{}, {}>'
    else:
        coords = self
        outer_fmt = '({}, {})'
    components = (format(c, fmt_spec) for c in coords)
    return outer_fmt.format(*components)
```
x??

---

#### Vector2d Special Methods - `frombytes`
Background context explaining how to create a vector from byte data.

:p What does the `frombytes` class method in Vector2d do?
??x
The `frombytes` class method creates a new instance of Vector2d from its byte representation. It first extracts the typecode and then deserializes the coordinates.
```python
@classmethod
def frombytes(cls, octets):
    typecode = chr(octets[0])
    memv = memoryview(octets[1:]).cast(typecode)
    return cls(*memv)
```
x??

**Rating: 8/10**

#### Memory Efficiency and NumPy Arrays
Background context explaining the concept. NumPy arrays are designed to handle large datasets efficiently, offering memory efficiency and optimized functions for numeric processing.

NumPy arrays are generally faster than Python lists because they are densely packed arrays of homogeneous type. This allows efficient use of memory space and fast access and manipulation operations.

:p What is the primary advantage of using NumPy arrays over regular Python lists?
??x
The primary advantages of using NumPy arrays include:
- Memory efficiency due to the fixed-size, homogeneous nature of data.
- Faster processing times for numerical computations because they are densely packed in memory.

For example, consider an array with 10 million elements:

```python
import numpy as np

# Creating a NumPy array
arr = np.arange(10_000_000)
```

This operation is much faster and more efficient compared to creating a list using Python's built-in data structures.

x??

---

#### Issues with `__slots__`
Background context explaining the concept. The `__slots__` class attribute can provide significant memory savings by restricting the instance attributes that an object can have, but it has several caveats.

:p What is the purpose of using `__slots__` in a Python class?
??x
The purpose of using `__slots__` is to save memory by limiting the number of possible instance attributes and preventing the creation of a `__dict__` for each instance. This can be particularly useful when dealing with large numbers of objects, as it reduces memory overhead.

For example:
```python
class MyClass:
    __slots__ = ['a', 'b']

# This class will only allow instances to have the attributes 'a' and 'b'.
```

x??

---

#### Overriding Class Attributes in Instances and Subclasses
Background context explaining the concept. In Python, class attributes can be used as default values for instance attributes, but if an instance writes to a non-existent attribute, it creates a new instance attribute.

:p How does overriding a class attribute in an instance affect other instances?
??x
When an instance of a class overrides a class attribute by setting it directly, the overridden value is only effective for that specific instance. The class attribute remains unchanged and continues to be used as the default value for all other instances unless they also override it.

For example:
```python
class Vector2d:
    typecode = 'd'

v1 = Vector2d()
v1.typecode  # Returns 'd'
Vector2d.typecode  # Still returns 'd'

v1.typecode = 'f'
v1.typecode  # Now returns 'f'
Vector2d.typecode  # Remains 'd'
```

This behavior allows for customization of individual instances while maintaining the class-level default.

x??

---

#### Subclassing to Customize Class Attributes
Background context explaining the concept. Python classes can be subclassed to modify or extend their attributes and methods, including class attributes.

:p How can you customize a class attribute in a subclass?
??x
You can customize a class attribute in a subclass by defining it within the subclass itself. This change will only affect instances of that specific subclass, while the original class retains its default value.

For example:
```python
class Vector2d:
    typecode = 'd'

class ShortVector2d(Vector2d):
    typecode = 'f'

sv = ShortVector2d()
sv.typecode  # Returns 'f'
Vector2d.typecode  # Still returns 'd'
```

In this example, `ShortVector2d` is a subclass of `Vector2d`, and it overrides the `typecode` attribute to use `'f'`. This customization does not affect instances of the original `Vector2d` class.

x??

---

