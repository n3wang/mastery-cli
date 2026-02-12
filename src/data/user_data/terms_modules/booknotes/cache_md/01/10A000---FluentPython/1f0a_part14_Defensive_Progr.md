# High-Quality Flashcards: 10A000---FluentPython_processed (Part 14)


**Starting Chapter:** Defensive Programming with Mutable Parameters

---


#### Mutable Default Arguments
Background context explaining that mutable default arguments can lead to unexpected behavior because they are evaluated only once when the function is defined. This means any changes made to the argument will affect all instances where it was used, leading to shared state issues.

:p Explain why mutable defaults like lists or dictionaries should be avoided as parameters in functions.
??x
Mutable defaults such as lists or dictionaries should be avoided as parameters because they are evaluated only once when the function is defined. Any changes made to these arguments persist across multiple function calls, causing unintended side effects and sharing state between different parts of a program.

For example, using `[]` as a default value for a list parameter will make all functions that use this parameter share the same list. If one function modifies the list, it affects other instances where the list was used.
??x

:p Provide an example in Python demonstrating why mutable defaults can cause issues.
??x
```python
def modify_list(lst=[]):
    lst.append('new item')
    return lst

# Using the function multiple times will share the same default list
print(modify_list())  # Output: ['new item']
print(modify_list())  # Output: ['new item', 'new item']
```
Here, `modify_list` uses an empty list as a mutable default argument. Each call to `modify_list()` modifies the same shared list, leading to unexpected behavior.

To avoid this issue, always use immutable types like `None` and create new lists inside the function:
```python
def modify_list(lst=None):
    if lst is None:
        lst = []
    lst.append('new item')
    return lst

# Each call uses a fresh copy of the list
print(modify_list())  # Output: ['new item']
print(modify_list())  # Output: ['new item']
```
x??

---

#### Defensive Programming with Mutable Parameters
Background context explaining how defensive programming practices can prevent shared state issues in mutable parameters. It’s important to consider whether a function should modify the input parameter or work with a copy.

:p Why is it necessary to make copies of mutable arguments when they are passed into functions?
??x
When passing mutable arguments like lists or dictionaries, making copies ensures that each call to the function works with its own independent data. If no copy is made and the function modifies the argument directly, this change will affect all other calls that received the same original argument.

For example:
```python
def modify_dict(d={}):
    d['key'] = 'value'
    return d

print(modify_dict())  # Output: {'key': 'value'}
print(modify_dict())  # Output: {'key': 'value', 'key': 'value'}
```
Here, the function `modify_dict` uses an empty dictionary as a mutable default argument. Each call modifies the same shared dictionary.

To prevent this issue, always create a new copy of the mutable object:
```python
def modify_dict(d=None):
    if d is None:
        d = {}
    d['key'] = 'value'
    return d

print(modify_dict())  # Output: {'key': 'value'}
print(modify_dict())  # Output: {'key': 'value'}
```
x??

---

#### Aliasing and Twisted Bus Example
Background context explaining how the `TwilightBus` class inverts expectations by sharing its passenger list with clients, violating the principle of least astonishment.

:p How does the `TwilightBus` violate the "Principle of Least Astonishment"?
??x
The `TwilightBus` violates the "Principle of Least Astonishment" because it shares its passenger list with clients. When a client passes a list to the bus and then calls methods like `drop`, the elements are removed from both the bus's internal state and the original list.

For example:
```python
basketball_team = ['Sue', 'Tina', 'Maya', 'Diana', 'Pat']
bus = TwilightBus(basketball_team)
print(bus.drop('Tina'))  # Output: None (or similar)
print(basketball_team)  # Output: ['Sue', 'Maya', 'Diana']
```
Here, `basketball_team` and the bus share the same list. When a passenger is dropped from the bus, they are also removed from `basketball_team`.

To avoid this issue, create a copy of the list:
```python
def __init__(self, passengers=None):
    if passengers is None:
        self.passengers = []
    else:
        self.passengers = list(passengers)
```
This ensures that any modifications to the bus's passenger list do not affect the original list passed in.

x??

---


#### Mutable Objects as Default Parameters
Background context: In Python, mutable objects (like lists or dictionaries) used as default parameters can lead to unexpected behavior. When a function is called with a default parameter, that parameter is only evaluated once when the function is defined, not each time the function is called. This means any changes made to the object in place will affect all future calls using that default.
If an object is changed and it forms part of a cyclic reference, it might be garbage collected prematurely.

:p What are the potential issues with mutable objects as default parameters?
??x
The answer: The primary issue is that when you use a mutable object (like a list) as a default parameter in Python, the same object is used across all function calls. If this object is changed within the function, those changes persist for every future call.

For example:
```python
def append_to_list(value, mylist=[]):
    if mylist is None:
        mylist = []
    mylist.append(value)
    return mylist

print(append_to_list(1))  # [1]
print(append_to_list(2))  # [1, 2] - This is unexpected because a new call should not append to the previous list
```

In this case, `mylist` retains its state between function calls due to how default arguments are handled. To avoid this issue, you can use `None` as the default and initialize it inside the function:
```python
def append_to_list(value, mylist=None):
    if mylist is None:
        mylist = []
    mylist.append(value)
    return mylist

print(append_to_list(1))  # [1]
print(append_to_list(2))  # [2] - Now this works as expected
```
x??

---
#### Weak References
Background context: Weak references are a feature in Python that allows you to hold a reference to an object without preventing the garbage collector from collecting it if no other references exist. This is useful for scenarios like tracking instances of a class, where you want to avoid memory leaks but still keep track of active objects.

:p What is a weak reference and when is it useful?
??x
The answer: A weak reference in Python allows you to hold a reference to an object without preventing the garbage collector from collecting that object if no other references exist. This is particularly useful for scenarios where tracking instances of a class could otherwise lead to memory leaks.

For example, using `weakref.ref` to keep track of all current instances:
```python
import weakref

class MyClass:
    _instances = []

    def __init__(self):
        self._instances.append(weakref.ref(self))

    @classmethod
    def get_all_instances(cls):
        return [inst() for inst in cls._instances if inst()]

my_instance = MyClass()
# my_instance is tracked by the weak reference

del my_instance  # This instance can now be garbage collected, even though it's still referenced

MyClass.get_all_instances()  # Returns an empty list since no instances are alive
```
x??

---
#### CPython Garbage Collector and Object Lifecycle
Background context: In Python, especially with CPython (the standard implementation), objects are managed by a generational garbage collector. Objects are discarded when their reference count reaches zero or if they form part of a cycle but have no outside references.

:p What is the behavior of object lifecycle in CPython?
??x
The answer: In CPython, objects are retained in memory as long as there are active references to them. Once an object’s reference count drops to zero (or it forms a cycle with other unreferenced objects), it can be garbage collected.

However, the actual collection is not immediate but happens during periodic sweeps of different generations based on object age and type. The `gc` module provides access to this functionality:
```python
import gc

# Example: Force a sweep in generation 2 (long-lived objects)
gc.collect(2)

# Or manually track garbage collection events
def on_gc_event(event):
    print(f"Garbage collected {event.object} of type {type(event.object)}")

gc.callbacks.append(on_gc_event)  # Register a callback for tracking garbage collection events
```
x??

---


#### First-Class Objects Concept
Functions and other program entities that can be created at runtime, assigned to variables or elements in data structures, passed as arguments to functions, and returned as results of functions are referred to as first-class objects. Examples include integers, strings, dictionaries, and functions.
:p What is a first-class object?
??x
A first-class object is an entity that can be created at runtime, assigned to variables or elements in data structures, passed as arguments to functions, and returned as the result of a function. In Python, both functions and other entities like integers, strings, and dictionaries are considered first-class objects.
x??

---

#### Functions as First-Class Objects
Functions in Python are treated as first-class objects, allowing them to be manipulated similarly to other data types such as integers and strings. This means they can be assigned to variables, passed as arguments to functions, and returned from functions.
:p How do you treat functions as first-class objects in Python?
??x
In Python, you can treat functions as first-class objects by assigning them to variables, passing them as arguments to other functions, or returning them from functions. For example:
```python
def greet(name):
    return f"Hello, {name}!"

greeting = greet  # Assigning the function to a variable

def apply_greet(func, name):
    print(func(name))  # Passing the function as an argument

apply_greet(greet, "Alice")  # Returning the function from another function
```
x??

---

#### New Callables in Python 3.5 and 3.6
New callables introduced in Python 3.5 include native coroutines, while asynchronous generators were added in Python 3.6. Both are covered in Chapter 22.
:p What new callables were introduced in Python 3.5 and 3.6?
??x
In Python 3.5, native coroutines were introduced as a callable object type. In Python 3.6, asynchronous generators were added. These are mentioned here for completeness and will be covered in detail in Chapter 22.
x??

---

#### Positional-Only Parameters in Python 3.8
Positional-only parameters allow certain function arguments to only be specified by position, not name. This feature was introduced in Python 3.8.
:p What is a positional-only parameter?
??x
A positional-only parameter is an argument of a function that can only be specified by its position and not by name. This feature was introduced in Python 3.8 to provide more control over how arguments are passed to functions.
x??

---

#### Reading Type Hints at Runtime
Since Python 3.5, function annotations should conform to PEP 484 for type hints. Coverage of this topic has been moved from the previous section to here due to changes in annotation usage and PEP 484 compliance.
:p What is covered in "Reading Type Hints at Runtime"?
??x
In "Reading Type Hints at Runtime," coverage includes how function annotations, which should conform to PEP 484 since Python 3.5, can be read and used at runtime for type hinting. This section explains the best practices for using type hints in functions.
x??

---


#### Python Functions as Full-Fledged Objects
In Python, functions are considered first-class objects. This means that functions can be treated like any other object, such as being assigned to a variable, passed as an argument to another function, and returned from functions as results.

:p What does it mean when we say functions in Python are full-fledged objects?
??x
Functions in Python are full-fledged objects because they possess attributes similar to those of other objects. They can be assigned to variables, passed around as arguments, and even returned by other functions. This flexibility allows for a wide range of programming styles, including functional programming.

Example:
```python
def factorial(n):
    """returns n."""
    return 1 if n < 2 else n * factorial(n - 1)

# Assigning the function to a variable
fact = factorial
print(fact(5))  # Output: 120
```
x??

---

#### The `__doc__` Attribute of Functions
The `__doc__` attribute in Python functions can be used to store and retrieve documentation strings. These docstrings are often used by tools like the built-in `help()` function.

:p What is the purpose of the `__doc__` attribute in a function?
??x
The `__doc__` attribute in a function stores the docstring, which is a string literal that provides documentation for the function. This can be retrieved and used to provide help information about the function.

Example:
```python
def factorial(n):
    """returns n."""
    return 1 if n < 2 else n * factorial(n - 1)

print(factorial.__doc__)  # Output: 'returns n.'
```
x??

---

#### `type()` Function for Identifying Object Types
The `type()` function in Python can be used to determine the type of an object. This is useful when you want to check if a variable or expression evaluates to a certain class.

:p How does the `type()` function help in understanding the nature of objects?
??x
The `type()` function returns the type of an object, which can be very helpful for debugging and ensuring that operations are being performed on appropriate data types. In the context of functions, it confirms that they are instances of the `function` class.

Example:
```python
def factorial(n):
    """returns n."""
    return 1 if n < 2 else n * factorial(n - 1)

print(type(factorial))  # Output: <class 'function'>
```
x??

---

#### First-Class Functions and Functional Programming
In programming, a language is said to support first-class functions when functions can be treated just like any other variable. This means they can be passed as arguments, returned from functions, and assigned to variables.

:p What does it mean for a function to be "first-class" in Python?
??x
A function is considered first-class if it can be used freely like any other data type—passed as an argument, returned by another function, or assigned to a variable. This allows you to manipulate functions as values and use them in various ways.

Example:
```python
def factorial(n):
    """returns n."""
    return 1 if n < 2 else n * factorial(n - 1)

def map(function, iterable):
    result = []
    for item in iterable:
        result.append(function(item))
    return result

print(map(factorial, range(10)))  # Output: [1, 1, 2, 6, 24, 120, 720, 5040, 40320, 362880]
```
x??

---

#### Higher-Order Functions
Higher-order functions are functions that take one or more functions as arguments and/or return a function as a result. They enable you to abstract common patterns of behavior in your code.

:p What is a higher-order function?
??x
A higher-order function is a function that can accept other functions as parameters, or return them as results. This allows for powerful abstraction and flexible coding styles, particularly useful in functional programming.

Example:
```python
def factorial(n):
    """returns n."""
    return 1 if n < 2 else n * factorial(n - 1)

# Using `map` to apply `factorial` function to a range of numbers
print(list(map(factorial, range(10))))  # Output: [1, 1, 2, 6, 24, 120, 720, 5040, 40320, 362880]
```
x??

---

#### Using `sorted()` with a Key Function
The built-in `sorted()` function in Python can take an optional key parameter to specify how the items should be compared. This is often used to sort objects based on custom criteria.

:p How does the `key` argument work in the `sorted()` function?
??x
The `key` argument in the `sorted()` function provides a way to customize the sorting behavior by applying a function to each item before comparing them. The key function is called once per item, and its return value is used for comparison.

Example:
```python
fruits = ['strawberry', 'fig', 'apple', 'cherry', 'raspberry', 'banana']

# Sorting fruits by their length using the `len` function as the key
print(sorted(fruits, key=len))  # Output: ['fig', 'apple', 'cherry', 'banana', 'raspberry', 'strawberry']
```
x??

---

