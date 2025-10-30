# High-Quality Flashcards: 10A000---FluentPython_processed (Part 16)

**Rating threshold:** >= 8/10

**Starting Chapter:** Packages for Functional Programming

---

**Rating: 8/10**

#### Variable Positional Arguments (*args)
Background context: In Python, `*args` allows a function to accept a variable number of positional arguments. This is useful when you're not sure how many arguments will be passed to your function or if you want to pass multiple values as a single argument.

:p How do you define and use `*args` in a Python function?
??x
In Python, `*args` allows a function to accept a variable number of positional arguments. These are stored as a tuple within the function. Here is an example:
```python
def my_function(*args):
    for arg in args:
        print(arg)

# Calling the function with different numbers of arguments
my_function(1, 2, 3) # Output: 1, 2, 3
```
x??

---

#### Keyword-Only Arguments
Background context: Python allows defining functions where some or all parameters must be specified by keyword. This is useful for making sure that certain arguments are always provided with their intended names, preventing confusion.

:p How do you define a function in Python to accept keyword-only arguments?
??x
To define a function that accepts only keyword arguments after the `*` parameter, place a single `*` before the first parameter. Here is an example:
```python
def my_function(a, *, b):
    print(f"a: {a}, b: {b}")

# Valid call
my_function(1, b=2)

# Invalid calls
my_function(1, 2) # Raises TypeError
my_function(b=2) # Missing positional argument 'a'
```
x??

---

#### Positional-Only Parameters (/)
Background context: Starting from Python 3.8, user-defined functions can have positional-only parameters using the `/` syntax in the parameter list. This means that certain arguments must be passed positionally and not by keyword.

:p How do you define a function with positional-only parameters?
??x
Starting from Python 3.8, you can define a function with positional-only parameters using the `/` token. Here is an example of how to emulate the `divmod` built-in function:
```python
def divmod(a, b, /):
    return (a // b, a % b)

# Valid call
result = divmod(10, 4)
print(result) # Output: (2, 2)

# Invalid calls
divmod(a=10, b=4) # Raises TypeError
```
x??

---

**Rating: 8/10**

#### Default Values and Type Annotations
Background context: The text discusses the use of default values, particularly `None`, for mutable types and how to annotate these defaults using Python's `typing` module. It emphasizes the importance of explicitly providing a default value when using optional parameters.

:p How does one handle mutable types as default arguments in Python functions?
??x
In Python, it is considered a bad practice to use mutable types like lists or dictionaries as default arguments because they can retain their state across multiple function calls, leading to unexpected behavior. Instead, `None` should be used as the default value for such parameters.

```python
from typing import Optional

def show_count(count: int, singular: str, plural: Optional[str] = None) -> str:
    # If no plural is provided, it defaults to None.
    return f"{count} {singular if count == 1 else plural or singular}"
```

In the example above, `plural` can either be a string or `None`. The function checks if `plural` is not provided (i.e., `None`) and uses the singular form if the count is one. If both are `None`, it defaults to using the singular form.

x??

---

#### Type Annotations with `Optional`
Background context: The text explains how to use Python's `typing.Optional` for optional parameters, differentiating between `str` and `None`. It also mentions the importance of explicitly providing a default value when annotating such types.

:p How can you define an optional parameter in a function using type hints?
??x
To define an optional parameter with type hints, you use `Optional` from the `typing` module. For example, if you have a function that takes a string but allows it to be omitted, you would annotate it as follows:

```python
from typing import Optional

def show_count(count: int, singular: str, plural: Optional[str] = None) -> str:
    # The 'plural' parameter can be either a string or None.
    return f"{count} {singular if count == 1 else plural or singular}"
```

Here, `Optional[str]` means that the `plural` parameter can take on any value of type `str` or `None`. If no argument is provided for `plural`, it defaults to `None`.

x??

---

#### Single Quotes vs. Double Quotes in Python
Background context: The text discusses the preference for single quotes over double quotes in Python, as dictated by PEP 8 and supported by default in tools like Blue. It mentions that this preference is embedded in the language itself.

:p Why are single quotes preferred over double quotes in Python?
??x
Single quotes are preferred over double quotes in Python primarily because of historical conventions set by Guido van Rossum, the creator of Python. This preference aligns with PEP 8 and is enforced by tools like Blue and Black when using specific options.

```python
# Single quotes are default:
print('I prefer single quotes')

# Double quotes can be used as an alternative:
print("This works too")
```

In practice, the choice between single and double quotes is largely a matter of personal or project preference. However, for consistency with PEP 8 guidelines and to ensure compatibility with tools that follow these conventions (like Blue), using single quotes (`'`) is recommended.

x??

---

#### Type as Defined by Supported Operations
Background context: The text introduces the concept of types being defined by the operations they support, diverging from traditional set-based definitions. It provides an example function and explains how different types can be valid based on their supported operations.

:p How does one determine the type of a variable in Python based on its supported operations?
??x
In Python, determining the type of a variable is more about understanding which operations are supported by that variable rather than just categorizing it into predefined sets. For example, consider the `double` function:

```python
def double(x):
    return x * 2
```

The parameter `x` could be an integer (`int`), a floating-point number (`float`), or even a complex number, as long as the multiplication operation is supported by the type. It could also be any sequence (like strings, tuples, lists) that supports the `*` operator.

```python
# Examples of valid x types:
print(double(2))    # int
print(double(2.5))  # float
print(double([1, 2, 3]))  # list

# Any type with a __mul__ method supporting an int argument is valid.
```

This approach to defining types is more flexible and closely tied to the actual behavior of objects in Python.

x??

---

**Rating: 8/10**

#### Duck Typing
Background context explaining duck typing. Duck typing is a programming concept derived from Smalltalk and adopted by Python, JavaScript, and Ruby. In this paradigm, an object's methods and attributes determine the type, not its inheritance or implementation of a specific interface.
If applicable, add code examples with explanations:
```python
def alert(birdie):
    birdie.quack()
```
:p What is duck typing?
??x
Duck typing refers to the concept where objects are checked for the presence and type of methods they support rather than their class inheritance. The term "duck" comes from the phrase, "If it walks like a duck and quacks like a duck, then it must be a duck."
```python
def alert(birdie):
    birdie.quack()
```
In this example, `alert` function expects an object that has a method `quack()`. The exact class of the object is irrelevant as long as it supports the expected operations.
x??

---

#### Nominal Typing
Background context explaining nominal typing. Nominal typing checks if an object belongs to a certain type based on its actual inheritance from classes or interfaces, rather than the methods and attributes that it implements.
If applicable, add code examples with explanations:
```python
class Bird: pass
class Duck(Bird): 
    def quack(self):
        print('Quack.')
```
:p What is nominal typing?
??x
Nominal typing enforces type checking based on explicit inheritance or implementation of interfaces. It ensures that an object's type declaration in the source code accurately reflects its true nature at runtime.
```python
def alert_duck(birdie: Duck) -> None:
    birdie.quack()
```
In this example, `alert_duck` function expects a `Duck` instance or any subclass of `Duck`. The type checker will ensure that the passed object supports the `quack()` method, even though it might be an instance of a different class at runtime.
x??

---

#### Static vs. Dynamic Type Checking
Background context explaining the difference between static and dynamic type checking. Static type checkers analyze your code before execution to catch errors. Dynamic type checkers or duck typing systems only enforce types during runtime, allowing more flexibility but potentially leading to bugs that aren't caught until runtime.
If applicable, add code examples with explanations:
```python
def double(x: abc.Sequence):
    return x * 2
```
:p What is the difference between static and dynamic type checking?
??x
Static type checking analyzes your code before execution to catch errors. In contrast, dynamic type checkers or duck typing systems only enforce types during runtime, allowing more flexibility but potentially leading to bugs that aren't caught until runtime.
```python
def double(x: abc.Sequence):
    return x * 2
```
In this example, Mypy (a static checker) will flag the operation `x * 2` as an error because the `Sequence` abstract base class does not implement or inherit the `__mul__` method. At runtime, Python's dynamic nature allows `x * 2` to work with concrete sequences such as `str`, `tuple`, `list`, etc.
x??

---

#### Sequence Abstract Base Class
Background context explaining the Sequence ABC and its methods. The `Sequence` abstract base class in Python provides a common interface for sequence-like objects, but it does not include an implementation of the multiplication (`__mul__`) method, leading to errors in static type checking tools.
If applicable, add code examples with explanations:
```python
from collections import abc

def double(x: abc.Sequence):
    return x * 2
```
:p What is the `Sequence` abstract base class and why does it cause issues?
??x
The `Sequence` abstract base class in Python provides a common interface for sequence-like objects, ensuring they support certain methods such as indexing (`__getitem__`) and slicing. However, it does not include an implementation of the multiplication (`__mul__`) method, leading to errors in static type checkers like Mypy.
```python
from collections import abc

def double(x: abc.Sequence):
    return x * 2
```
In this example, even though `x` is annotated as a `Sequence`, Mypy flags `x * 2` as an error because the `Sequence` ABC does not implement or inherit the `__mul__` method. At runtime, Python's dynamic nature allows `x * 2` to work with concrete sequences such as `str`, `tuple`, `list`, etc.
x??

---

**Rating: 8/10**

#### Duck Typing vs Static Typing
Background context explaining the concept of duck typing and static typing. Duck typing allows objects to be used based on their attribute and method presence, not their type or class. In contrast, static typing checks types at compile-time, enforcing specific types for functions and variables.
:p What is the main difference between duck typing and static typing in Python?
??x
The main difference between duck typing and static typing in Python is that **duck typing** relies on objects having the required methods or attributes, whereas **static typing** enforces type checking at compile-time. For example, `alert_bird` expects a `Bird` object but doesn't require it to have the `quack()` method because `Duck` inherits from `Bird`. However, Mypy (a static type checker) will raise an error for `alert_bird(birdie)` if no type hints are provided in `birds.py`.

```python
class Bird:
    pass

class Duck(Bird):
    def quack(self):
        print("Quack.")

def alert_bird(bird: Bird):
    bird.quack()

daffy = Duck()
```
x??

---

#### Type Checking with Mypy
Background context explaining how `mypy` checks type annotations in Python code. `Mypy` is a static type checker for Python that can help catch errors before runtime by checking the types of function parameters and return values.
:p What does the command `mypy birds.py` do, and what issue does it raise?
??x
The command `mypy birds.py` checks the type annotations in `birds.py`. It raises an error because `alert_bird` expects a `Bird` object but calls `quack()`, which is not defined on the `Bird` class.

```python
# birds.py:16
def alert_bird(bird: Bird):
    bird.quack()
```
x??

---

#### Static Typing and Compatibility Issues
Background context explaining why static typing can detect issues that might only cause errors at runtime in dynamic languages. In Example 8-5, `alert_bird` is declared to take a `Bird`, but it calls `quack()`. Mypy flags this as an error because the `Bird` class does not have the `quack()` method.
:p Why does `mypy daffy.py` not raise any errors?
??x
`mypy daffy.py` does not raise any errors because all function calls in `daffy.py` are valid according to their type hints. However, at runtime, calling `alert_bird(daffy)` will result in an error since the `Bird` class does not have a `quack()` method.

```python
# daffy.py
from birds import *

daffy = Duck()
alert(daffy)  # Valid call
alert_duck(daffy)  # Valid call, as Duck is a subclass of Bird
alert_bird(daffy)  # Valid call at runtime but flagged by Mypy due to type hints
```
x??

---

#### Inheritance and Type Checking
Background context explaining inheritance in Python classes. `Duck` inherits from `Bird`, meaning every instance of `Duck` is also an instance of `Bird`. However, not every `Bird` can be a `Duck`.
:p Why does Mypy raise an error for `alert_bird(woody)` in Example 8-6?
??x
Mypy raises an error because `alert_bird` expects a parameter of type `Bird`, but the code passes `woody`, which is an instance of `Bird`. The error occurs at the call site, as Mypy enforces strict type checking.

```python
# woody.py
from birds import *

woody = Bird()
alert(woody)  # Valid call
alert_duck(woody)  # Invalid call, expected a Duck but got a Bird
alert_bird(woody)  # Invalid call, same reason as above
```
x??

---

#### Runtime Errors vs Static Typing
Background context explaining the difference between runtime errors and static type checking. `Mypy` can catch some issues that might only become apparent at runtime.
:p How do runtime and static typing differ in error detection?
??x
Runtime and static typing differ in how they detect errors:
- **Static Typing (e.g., Mypy)**: Checks types before execution to ensure functions receive the correct arguments. For instance, `alert_bird` is flagged because it calls `quack()` on a `Bird`, which does not have this method.
- **Runtime**: Executes code and catches errors as they occur. While `Mypy` can help prevent some issues, runtime will eventually catch any unsupported operations.

```python
# Example showing Mypy vs Runtime behavior
class Bird:
    pass

class Duck(Bird):
    def quack(self):
        print("Quack.")

def alert_bird(bird: Bird):
    bird.quack()

woody = Bird()
alert_bird(woody)  # Raises an error at runtime in Python, but is flagged by Mypy
```
x??

---

**Rating: 8/10**

#### The Any Type
Background context explaining the concept of `Any` type. It is a crucial part of gradual type systems, acting as both the most general and specialized type.

:p What is the significance of the `Any` type in Python's type hints?
??x
The `Any` type serves as a wildcard that can represent any type, thus allowing for flexibility in function definitions without specifying concrete types. It is useful when you want to indicate that a function or variable can accept values of any type.

```python
def double(x: Any) -> Any:
    return x * 2
```
In the above example, `x` and the returned value can be of any type, including different types.
x??

---

#### Type Hierarchy and Operations Support
Explanation on how Python's dynamic nature affects type hierarchy and operations support. Different classes like `object`, `Sequence`, etc., have varying levels of supported operations.

:p How does the `object` class differ from the `Any` type in terms of operations support?
??x
The `object` class is a built-in base class in Python, which means every object in Python inherits from it. However, not all operations are defined for objects as they are for more specific types like `int`, `list`, etc.

```python
def double(x: object) -> object:
    return x * 2
```
This function signature is invalid because the `*` operation is not supported by the `object` type. In contrast, using `Any` allows any type of operation to be performed.
x??

---

#### Subtype-of vs Consistent-with
Explanation on nominal typing and behavioral subtyping principles, highlighting how they differ in Python's gradual type system.

:p What is the difference between subtype-of (`isinstance`) and consistent-with relationships in Python’s type hints?
??x
In traditional object-oriented design (nominal typing), `T2` being a subclass of `T1` means `T2` is a subtype of `T1`. This relationship strictly follows inheritance rules. However, in gradual typing systems like Python's, the concept of "consistent-with" extends this idea by allowing any type to be used where an `Any` type is specified.

For example:
```python
class T1: ...
class T2(T1): ...

def f1(p: T1) -> None: ...
o2 = T2()
f1(o2)  # This call works due to LSP

def f2(p: T2) -> None: ...
o1 = T1()
f2(o1)  # This would be a type error in strict nominal typing
```
The `consistent-with` relationship allows for more flexible usage, but maintains the core principle that any operation supported by `T1` should also be supported by `T2`.

In contrast, using `Any` ensures that no specific operations are required beyond what is defined at runtime.
x??

---

#### Type Any in Practice
Detailed explanation on how to use `Any` in function definitions and its implications.

:p How can you effectively use the `Any` type in a function definition?
??x
Using `Any` is particularly useful when the exact types of arguments or return values are not known, or you want to ensure flexibility. It allows any type of operation without enforcing specific types, which can be very helpful during development and refactoring.

Example:
```python
def double(x: Any) -> Any:
    return x * 2

# This function works for all types
double(10)   # int
double('a')  # str
```
Here, `Any` allows the function to handle any type of input and output without specifying a concrete type.
x??

---

#### Type Object in Contrast
Explanation on how `object` differs from `Any` when it comes to operations.

:p How does the `object` class differ from the `Any` type in terms of operation support?
??x
The `object` class is Python's base class for all objects, and every object inherits from it. However, not all types of operations are defined on `object`, making functions that rely solely on `object` invalid.

Example:
```python
def double(x: object) -> object:
    return x * 2

# This will cause a type error because object does not support the '*' operation
```
In contrast, using `Any` allows any kind of operation to be performed, making it more flexible but potentially less precise in terms of type safety.

Using `object` requires you to specify that all operations supported by the derived class must also be supported by the base class.
x??

---

