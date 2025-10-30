# High-Quality Flashcards: 10A000---FluentPython_processed (Part 21)

**Rating threshold:** >= 8/10

**Starting Chapter:** Using lru_cache

---

**Rating: 8/10**

#### lru_cache Decorator Overview
Background context: The `functools.lru_cache` decorator is a powerful tool for caching function results to improve performance. It uses a least recently used (LRU) algorithm to manage memory usage efficiently by storing only the most recent calls.

:p What does the `functools.lru_cache` decorator do?
??x
The `functools.lru_cache` decorator caches the results of expensive function calls, making subsequent calls with the same arguments much faster. It works by storing the results of a function in memory and retrieving them instead of recomputing if the inputs haven't changed.

```python
from functools import lru_cache

@lru_cache()
def fibonacci(n):
    if n < 2:
        return n
    else:
        return fibonacci(n-1) + fibonacci(n-2)
```

x??

---

#### Caching in Recursive Functions
Background context: The `functools.lru_cache` is particularly useful for recursive functions, which can become very slow without caching. By storing previously computed results, it avoids redundant computations.

:p How does the `lru_cache` improve performance in a recursive function like Fibonacci?
??x
The `lru_cache` improves performance by caching intermediate results of the recursive calls. This prevents the exponential growth of function calls seen in uncached implementations, making the algorithm much more efficient.

```python
from functools import lru_cache

@lru_cache()
def fibonacci(n):
    if n < 2:
        return n
    else:
        return fibonacci(n-1) + fibonacci(n-2)
```

x??

---

#### Memory Management with `functools.lru_cache`
Background context: The `maxsize` parameter in `lru_cache` controls the number of entries that can be stored. If not specified, it defaults to 128. Setting a higher value allows more caching but increases memory usage.

:p What is the role of `maxsize` in `lru_cache`?
??x
The `maxsize` parameter determines how many function calls results will be cached. A lower `maxsize` can help prevent excessive memory consumption, while a higher `maxsize` can improve performance by caching more results. Setting `maxsize=None` disables the LRU logic entirely.

```python
from functools import lru_cache

@lru_cache(maxsize=10)
def costly_function(a, b):
    # Function implementation here
```

x??

---

#### Difference Between `cache` and `lru_cache`
Background context: Starting from Python 3.9, the `functools.cache` decorator was introduced as a simpler wrapper around `lru_cache`. However, `lru_cache` offers more flexibility and compatibility with earlier versions.

:p What is the main difference between `functools.cache` and `lru_cache`?
??x
The main difference is that `functools.cache` always uses an LRU policy and has a default maxsize of 128, which can lead to excessive memory usage for very large numbers of cache entries. On the other hand, `lru_cache` allows you to set a custom `maxsize`, providing better control over memory usage.

```python
from functools import lru_cache

@lru_cache(maxsize=10)
def costly_function(a, b):
    # Function implementation here
```

x??

---

#### Handling Different Argument Types with `typed`
Background context: The `typed` parameter in `lru_cache` determines whether to treat different types of arguments as distinct. By default, it considers float and integer arguments equal if their values are the same.

:p How does the `typed` parameter affect caching behavior?
??x
The `typed` parameter controls whether different argument types produce separate cache entries. If set to `False`, similar float and integer arguments will share a single entry in the cache. Setting `typed=True` ensures that each unique type is stored separately, even if their values are equal.

```python
from functools import lru_cache

@lru_cache(typed=False)
def costly_function(a, b):
    # Function implementation here

@lru_cache(typed=True)
def costly_function(a, b):
    # Function implementation here
```

x??

**Rating: 8/10**

#### Parameterized Decorator Implementation as Class

Background context: The provided text discusses an alternative approach to implementing parameterized decorators using a class. This method is considered more suitable for non-trivial decorators, but this example illustrates the basic idea.

Explanation of the concept:
- A decorator can be implemented as a class instead of a function.
- This makes it easier to handle complex scenarios and retain state across multiple calls or other advanced features.

:p How does implementing a parameterized clock decorator as a class differ from its function-based implementation?

??x
Implementing a parameterized clock decorator as a class involves creating a `clock` class that has an `__init__` method for setting up the decorator's parameters and a `__call__` method to make instances of this class callable. This allows for more flexibility, especially when dealing with stateful decorators.

Code example:
```python
import time

DEFAULT_FMT = '[{elapsed:0.8f}s] {name}({args}) -> {result} '

class clock:
    def __init__(self, fmt=DEFAULT_FMT):
        self.fmt = fmt
    
    def __call__(self, func):
        def clocked(*_args):
            t0 = time.perf_counter()
            _result = func(*_args)
            elapsed = time.perf_counter() - t0
            name = func.__name__
            args = ', '.join(repr(arg) for arg in _args)
            result = repr(_result)
            print(self.fmt.format(**locals()))
            return _result
        return clocked

@clock('{name}({args}) dt={elapsed:0.3f}s')
def snooze(seconds):
    time.sleep(seconds)

for i in range(3):
    snooze(.123)
```

This class-based decorator can be instantiated with different formats, making it more flexible for various use cases.

x??

---
#### Drop-In Replacement

Background context: The text mentions that the class-based implementation of a parameterized clock decorator is intended as a drop-in replacement for the function-based version presented earlier. This implies both implementations serve the same purpose but are structured differently.

:p What does "drop-in replacement" mean in this context?

??x
A drop-in replacement means that the new implementation (in this case, the class-based `clock` decorator) can be substituted directly for the old one without requiring any changes to the calling code. This implies both versions of the decorator should behave identically when applied to functions.

For example:
```python
# Function-based clock decorator from earlier examples
@clock('{name}({args}) dt={elapsed:0.3f} s')
def snooze(seconds):
    time.sleep(seconds)

# Class-based drop-in replacement for the same purpose
@clock.DEFAULT_FMT(clock)  # Assuming DEFAULT_FMT is set to match the format used in function version
def snooze(seconds):
    time.sleep(seconds)
```

In this context, `clock.DEFAULT_FMT` likely refers to a default formatting string that can be passed to the class-based clock decorator.

x??

---
#### Comparison of Function-Based and Class-Based Decorators

Background context: The text compares two different ways to implement a parameterized clock decorator—a function-based approach used in earlier examples and a class-based approach described later. This comparison highlights the trade-offs between simplicity and flexibility.

:p What are some advantages of implementing a parameterized clock decorator as a class?

??x
Advantages of implementing a parameterized clock decorator as a class include:

1. **Flexibility**: The class can handle more complex stateful operations, such as maintaining state across multiple calls or logging.
2. **Readability and Maintainability**: Code using classes might be easier to read and maintain due to the clear separation of concerns.
3. **State Retention**: Classes allow for retaining state between function calls, which is useful for decorators that need to remember information from previous invocations.

For instance:
```python
class clock:
    def __init__(self, fmt=DEFAULT_FMT):
        self.fmt = fmt
    
    def __call__(self, func):
        # Implementation details...
```

This class-based approach provides more room for future enhancements and makes the code easier to extend or modify.

x??

---
#### Strategy Design Pattern Application

Background context: The text mentions that the idea of registration decorators will be applied in an implementation of the Strategy design pattern in Chapter 10. This suggests a connection between decorator concepts and broader software design patterns.

:p How does the concept of registration decorators relate to the Strategy design pattern?

??x
Registration decorators are relevant to the Strategy design pattern because they allow for registering different strategies or behaviors dynamically. In Python, this can be achieved by using decorators that register functions as strategy implementations.

For example:
```python
# Simple registration decorator (simplified version)
def register_strategy(strategy):
    if not hasattr(registry, 'strategies'):
        registry.strategies = []
    registry.strategies.append(strategy)
    return strategy

@register_strategy
def strategy_a():
    pass

@register_strategy
def strategy_b():
    pass

registry = ModuleRegistry()
```

In the context of the Strategy pattern, registration decorators enable the dynamic addition and removal of strategies. This flexibility is crucial for implementing different algorithms or behaviors in a flexible way.

x??

---

**Rating: 8/10**

#### Import Time vs Runtime
Import time refers to when a module is loaded and its contents are evaluated, while runtime means when the code within that module is executed. Understanding this difference helps in grasping how decorators behave at various stages of program execution.

:p What distinguishes import time from runtime?
??x
Import time occurs during the loading of a module where the code inside it is parsed but not yet executed. Runtime refers to when the actual execution of the imported code happens, which can be later after the initial import.

For example:
```python
import math

# Import time: The 'math' module is loaded and its contents are evaluated.
print(math.sqrt(4))  # Runtime: This line executes during runtime.
```
x??

---

#### Variable Scoping
Variable scoping in Python refers to how variables are accessed within the program. It involves lexical scoping, where each variable's scope is determined by where it is declared.

:p What does variable scoping refer to?
??x
Variable scoping determines which parts of a program can access a particular variable based on its declaration location. In Python, this typically follows lexical scoping rules, meaning the scope of variables is defined by their position in the code.

For example:
```python
def outer_function():
    x = 10  # This 'x' has local scope within the function.
    def inner_function():
        y = 20  # 'y' has a different scope within this nested function.
    print(x)  # Accessing 'x' is allowed here because it's in its scope.

outer_function()
```
x??

---

#### Closures
Closures allow functions to remember and access variables from their lexical scope even when they are executed outside that scope. They consist of a function object, free variables used by the function, and an environment recording where those variables were bound at closure creation time.

:p What is a closure in Python?
??x
A closure is a function object that remembers values in enclosing scopes even if they are not present in memory. It consists of three main components: 
1. A nested function.
2. Free variables used by the nested function from its enclosing scope.
3. An environment record of where those free variables were bound at closure creation time.

For example:
```python
def outer_function(x):
    def inner_function(y):
        return x + y  # 'x' is a free variable in this context.
    return inner_function

add_five = outer_function(5)
print(add_five(10))  # Output: 15
```
x??

---

#### Nonlocal Keyword
The `nonlocal` keyword allows for modifying variables from an enclosing scope without using the global declaration. This is particularly useful in nested functions where you need to modify a variable that exists outside their local scope but not at the module level.

:p What does the `nonlocal` keyword do?
??x
The `nonlocal` keyword indicates that a function should refer to an existing variable from its enclosing scope rather than creating a new one. It is used in nested functions where you need to modify a non-global variable defined outside the innermost scope of those functions.

For example:
```python
def outer():
    x = 10

    def inner():
        nonlocal x  # This allows 'x' to be modified.
        x = 20
    inner()
    print(x)  # Output: 20 (modified)

outer()
```
x??

---

#### Parameterized Decorators
Parameterized decorators are those that take arguments. They typically involve at least two nested functions and often use `functools.wraps` to preserve the metadata of the original function being decorated.

:p What is a parameterized decorator?
??x
A parameterized decorator is one that accepts additional parameters, allowing it to customize its behavior for different functions or scenarios. These decorators usually involve at least two nested functions: an outer wrapper and an inner wrapper. They often use `functools.wraps` to maintain the metadata of the original function being decorated.

For example:
```python
from functools import wraps

def decorator_factory(arg):
    def real_decorator(func):
        @wraps(func)
        def wrapped(*args, **kwargs):
            print(f"Arg: {arg}")
            return func(*args, **kwargs)
        return wrapped
    return real_decorator

@decorator_factory("Hello")
def say_hello():
    return "Hello, world!"

print(say_hello())  # Output: Arg: Hello; Hello, world!
```
x??

---

#### Stacked Decorators
Stacked decorators refer to applying multiple decorators to a single function. The order of application is important because the first decorator applied is the last one that gets executed.

:p What are stacked decorators?
??x
Stacked decorators involve applying more than one decorator to the same function. The order in which they are written (from left to right) determines their execution order. Typically, the innermost decorator is the first one to be called and the outermost decorator is the last one that gets executed.

For example:
```python
def decorator1(func):
    def wrapper():
        print("Decorator 1")
        return func()
    return wrapper

def decorator2(func):
    def wrapper():
        print("Decorator 2")
        return func()
    return wrapper

@decorator1
@decorator2
def say_hello():
    return "Hello, world!"

say_hello()  # Output: Decorator 2; Decorator 1; Hello, world!
```
x??

---

#### Class-Based Decorators
Class-based decorators provide a way to create more readable and maintainable decorator implementations. They are especially useful for complex or sophisticated decorators.

:p What is a class-based decorator?
??x
A class-based decorator implements the `__call__` method in a class, allowing instances of that class to behave like functions when applied as decorators. This approach can make the code more readable and maintainable, particularly for complex or sophisticated decorators.

For example:
```python
class Logger:
    def __init__(self, func):
        self.func = func

    def __call__(self, *args, **kwargs):
        print(f"Calling {self.func.__name__}")
        return self.func(*args, **kwargs)

@Logger
def say_hello():
    return "Hello, world!"

say_hello()  # Output: Calling say_hello; Hello, world!
```
x??

---

#### functools.cached_property
The `cached_property` decorator from the `functools` module allows for caching the result of a property method. This is useful when the value returned by the method doesn't change during the object's lifetime and can be cached to avoid redundant calculations.

:p What does `functools.cached_property` do?
??x
The `cached_property` decorator from the `functools` module caches the result of a property method so that it only needs to be computed once. This is particularly useful for methods whose return values don't change during the object's lifetime, thereby avoiding redundant calculations.

For example:
```python
from functools import cached_property

class MyClass:
    @cached_property
    def expensive_computation(self):
        print("Computing...")
        return 42

obj = MyClass()
print(obj.expensive_computation)  # Output: Computing...; 42
print(obj.expensive_computation)  # No "Computing..." because it's cached.
```
x??

---

#### functools.singledispatch
The `singledispatch` decorator from the `functools` module allows creating a single-dispatch generic function, where different methods can be defined for different argument types.

:p What is `functools.singledispatch`?
??x
The `singledispatch` decorator from the `functools` module enables creating a single-dispatch generic function. A single-dispatch generic function has multiple methods corresponding to different argument types, and it dynamically dispatches to the appropriate method based on the type of the first positional argument.

For example:
```python
from functools import singledispatch

@singledispatch
def print_value(x):
    raise NotImplementedError("No implementation for this type")

@print_value.register(int)
def _(x):
    print(f"Printing integer: {x}")

@print_value.register(str)
def _(x):
    print(f"Printing string: {x}")

print_value(42)  # Output: Printing integer: 42
print_value("Hello")  # Output: Printing string: Hello
```
x??

---

#### Metaprogramming and Decorators
Metaprogramming involves writing programs that can read, generate, or transform other programs. Decorators are a powerful metaprogramming technique in Python, allowing for dynamic behavior modification of functions.

:p What is the relationship between decorators and metaprogramming?
??x
Decorators are a key aspect of metaprogramming in Python because they enable dynamically modifying function behavior at runtime. By wrapping functions, decorators can add functionality or change how functions behave without altering their original code.

For example:
```python
def my_decorator(func):
    def wrapper():
        print("Something is happening before the function is called.")
        func()
        print("Something is happening after the function is called.")
    return wrapper

@my_decorator
def say_hello():
    print("Hello, world!")

say_hello()  # Output: Something is happening before the function is called.; Hello, world!; Something is happening after the function is called.
```
x??

---

#### Python Decorator Library Wiki Page
The Python Decorator Library wiki page contains numerous examples of decorators and their usage. Although some techniques may be outdated, it remains a valuable resource for inspiration.

:p What does the Python Decorator Library wiki page contain?
??x
The Python Decorator Library wiki page houses many examples of decorators and their various uses. While some of the shown techniques might have been superseded by newer approaches, the page still offers excellent inspiration and guidance on decorator usage in different scenarios.

For example:
```python
from functools import wraps

def log_function_data(func):
    @wraps(func)
    def wrapper(*args, **kwargs):
        print(f"Calling {func.__name__}")
        return func(*args, **kwargs)
    return wrapper

@log_function_data
def say_goodbye():
    print("Goodbye, world!")

say_goodbye()  # Output: Calling say_goodbye; Goodbye, world!
```
x??

---

#### Michele Simionato's decorator Package
Michele Simionato’s `decorator` package aims to simplify the usage of decorators for average programmers and showcase various non-trivial examples.

:p What is Michele Simionato's decorator package?
??x
Michele Simionato’s `decorator` package simplifies working with decorators, providing a more user-friendly approach. It includes utilities that make it easier to create and apply decorators, especially when dealing with complex or sophisticated use cases.

For example:
```python
from decorator import decorator

@decorator
def debug(func, *args, **kwargs):
    print(f"Calling {func.__name__}({', '.join(map(str, args))})")
    return func(*args, **kwargs)

@debug
def multiply(a, b):
    return a * b

multiply(3, 4)  # Output: Calling multiply(3, 4); 12
```
x??

---

#### wrapt Module
The `wrapt` module simplifies the implementation of decorators and dynamic function wrappers. It supports introspection and behaves correctly when further decorated or used as attribute descriptors.

:p What is the `wrapt` module?
??x
The `wrapt` module provides a simplified way to implement decorators, particularly useful for handling complex scenarios like introspection and proper behavior under various decorator combinations. It helps in creating robust decorators that work seamlessly with other decorators and maintain correct function metadata.

For example:
```python
from wrapt import decorator

@decorator
def debug(wrapped, instance, args, kwargs):
    print(f"Calling {wrapped.__name__}")
    return wrapped(*args, **kwargs)

class MyClass:
    @debug
    def method(self, x):
        return x * 2

mc = MyClass()
print(mc.method(10))  # Output: Calling method; 20
```
x??

**Rating: 8/10**

#### Dynamic Scope vs Lexical Scope
In 1960, McCarthy was not fully aware of the implications of dynamic scope. Dynamic scope remained in Lisp implementations for a surprisingly long time—until Sussman and Steele developed Scheme in 1975. Lexical scope does not complicate the definition of `eval` very much, but it may make compilers harder to write.
:p What is the difference between dynamic scope and lexical scope?
??x
Dynamic scope binds variables to the execution stack at runtime, making them accessible based on where they are called from in the call stack. Lexical scope, on the other hand, binds variables based on their location in the code, meaning that a variable's value is determined by the nearest enclosing scope where it was defined.
??x
```lisp
;; Example of dynamic scope (Common Lisp)
(defun foo ()
  (let ((x 10))
    (lambda () x)))

;; Example of lexical scope (Scheme)
(let ((x 20))
  (lambda () x))
```
x??

---

#### Python Decorators and Closures
Python decorators are a way to modify the behavior of functions or classes without permanently modifying them. Lexical scope complicates the implementation of languages with first-class functions, because it requires the support of closures. However, lexical scope makes source code easier to read.
:p What is a decorator in Python?
??x
A decorator in Python is a design pattern that allows a user to add new functionality to an existing object without modifying its structure. Decorators are a very powerful and useful tool in Python since they allow the modification of functions, methods, or classes without any permanent change to the source code.
??x
```python
def my_decorator(func):
    def wrapper():
        print("Something is happening before the function is called.")
        func()
        print("Something is happening after the function is called.")
    return wrapper

@my_decorator
def say_hello():
    print("Hello!")

say_hello()
```
x??

---

#### Closures and Python Lambdas
Python lambdas did not provide closures until Python 2.2, which contributed to a bad name among functional-programming geeks in the blogosphere.
:p What is a closure in programming?
??x
A closure is a function object that has access to variables from its own scope, even when that function is called outside that scope. In other words, closures allow you to return functions that remember their lexical environment, which can be useful for creating private data or maintaining state.
??x
```python
def outer_function(x):
    def inner_function(y):
        return x + y
    return inner_function

closure = outer_function(10)
print(closure(5))  # Output: 15
```
x??

---

#### Python Class Decorators
Class decorators are a way to modify the behavior of classes or objects without modifying their structure permanently. They can be used to add functionality or change how classes work.
:p What is a class decorator in Python?
??x
A class decorator in Python is a function that takes a class as its input and returns a modified version of the class, which can include adding new methods, changing existing ones, or modifying attributes.
??x
```python
def my_class_decorator(cls):
    cls.new_attribute = "Hello!"
    return cls

@my_class_decorator
class MyClass:
    pass

print(MyClass.new_attribute)  # Output: Hello!
```
x??

---

#### Static Checking Tools and Python
Static checking tools, like Mypy, can sometimes discourage the use of dynamic features in Python by complaining about unused variables or multiple functions with the same name.
:p How do static checking tools handle dynamic features in Python?
??x
Static checking tools can be restrictive when dealing with Python's dynamic nature. For instance, Mypy may complain if you have multiple functions with the same name, as it enforces strict typing and cannot infer function overloading like some other languages.
??x
```python
# Example of a static checking complaint in Mypy
def func(x: int):
    return x + 10

def func(y: str):
    return y.upper()

# This will raise an error in Mypy because it sees multiple functions with the same name
```
x??

---

#### Python Decorator Design Pattern Implementation
Python decorators are implemented differently from the classic Decorator design pattern, but they can still be seen as analogous. The decorator function acts like a concrete Decorator subclass, and the inner function returns wraps the original function.
:p How do Python decorators relate to the classic Decorator design pattern?
??x
Python decorators can be seen as an implementation of the Decorator design pattern where the decorator function acts as a concrete Decorator subclass. The returned function (which is analogous to a component in the pattern) wraps the function to be decorated and conforms to its interface by accepting the same arguments.
??x
```python
def decorator_function(original_func):
    def wrapper(*args, **kwargs):
        print(f"Before {original_func.__name__} is called")
        result = original_func(*args, **kwargs)
        print(f"After {original_func.__name__} is called")
        return result
    return wrapper

@decorator_function
def my_function():
    print("Inside my_function")

my_function()
```
x??

---

**Rating: 8/10**

#### Design Patterns and First-Class Functions

Background context: This section discusses how design patterns, traditionally implemented using classes, can be refactored to use functions as objects (first-class functions) in languages like Python. The primary goal is to reduce boilerplate code while maintaining readability and functionality.

:p What are the benefits of using first-class functions over traditional class-based approaches for implementing design patterns?
??x
The benefits include shorter and easier-to-read code, reduced boilerplate, and better alignment with functional programming paradigms. Using first-class functions can make the implementation more concise and flexible.
```python
def strategy(context):
    if context.condition:
        return lambda: action1()
    else:
        return lambda: action2()

context = {"condition": True}
action = strategy(context)
print(action())  # Calls action1()
```
x??

---

#### Strategy Pattern with Functions

Background context: The Strategy pattern allows selecting an algorithm at runtime. Traditionally, it involves creating multiple classes implementing a common interface or inheriting from a base class. In this section, we refactor the implementation using functions as objects.

:p How can you implement the Strategy pattern in Python using first-class functions?
??x
You define strategies as functions that encapsulate specific behavior and return a function to execute based on conditions.
```python
def strategy_a():
    print("Executing Strategy A")

def strategy_b():
    print("Executing Strategy B")

# Context chooses which strategy to use
context = "A"
if context == "A":
    action = strategy_a
else:
    action = strategy_b

action()  # Calls the chosen strategy
```
x??

---

#### Command Pattern Simplification

Background context: The Command pattern encapsulates a request as an object, thereby allowing parameterization of clients with queues, requests, and operations. Traditionally, it involves classes for commands and invokers. Here, we simplify by using functions directly.

:p How can the Command pattern be simplified in Python?
??x
In Python, you can use functions to encapsulate actions, which can then be passed around like any other object.
```python
def execute_command(command):
    command()

# Define concrete commands as functions
class Command:
    def __init__(self, function):
        self.function = function

    def execute(self):
        self.function()

execute_command(lambda: print("Executing a command"))
```
x??

---

#### Template Method Pattern

Background context: The Template Method pattern defines the skeleton of an algorithm in a method, allowing subclasses to redefine certain steps without changing the algorithm's structure. In Python, this can be achieved with functions and closures.

:p How does the Template Method pattern work in Python?
??x
In Python, you define a template function that includes a series of hooks where specific behavior can be implemented by subclasses or other objects.
```python
def template_method(step1, step2):
    print("Executing Step 1")
    step1()
    print("Executing Step 2")
    step2()

# Define steps as functions
def step1():
    print("Customized Step 1")

def step2():
    print("Default Step 2")

template_method(step1, step2)
```
x??

---

#### Visitor Pattern

Background context: The Visitor pattern allows adding new operations to existing class hierarchies without altering the classes. In dynamic languages like Python, this can be achieved more simply by using functions.

:p How is the Visitor pattern implemented in Python?
??x
In Python, you can directly pass a function as an argument to another function or method, allowing it to define custom behavior.
```python
class Element:
    def accept(self, visitor):
        visitor.visit(self)

def visit(element):
    print(f"Visited: {element}")

e = Element()
e.accept(visit)
```
x??

---

