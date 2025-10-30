# High-Quality Flashcards: 10A000---FluentPython_processed (Part 19)

**Rating threshold:** >= 8/10

**Starting Chapter:** Decorators 101

---

**Rating: 8/10**

#### Introduction to Decorators and Closures

Background context explaining decorators: In Python, a decorator is a function that takes another function and extends its behavior without explicitly modifying it. This concept allows for a more modular and cleaner code structure.

Relevant formulas or data: Not applicable as this is a conceptual explanation.

:p What are decorators in Python?
??x
Decorators in Python are functions that take another function as an argument, modify its behavior, and return the modified function. They allow us to wrap a function with another to add functionality without changing the original function's source code.
x??

---

#### Syntax of Decorators

Background context explaining decorator syntax: The `@` symbol is used to apply a decorator to a function definition. This syntax allows for clean and concise way to enhance functions.

:p How do you use decorators in Python?
??x
You use decorators by placing the `@decorator_name` above the function definition, followed by the function body.
```python
def deco(func):
    # decorator logic here

@deco
def target():
    print('running target()')
```
x??

---

#### Decorators vs. Functions

Background context explaining how to call decorators: A decorator is a callable that takes another function as an argument and returns it or replaces it with another function.

:p What is the difference between calling a decorator directly and using it as a syntax?
??x
Calling a decorator directly involves simply invoking the decorator function and passing the target function, whereas using the `@` syntax combines these steps in a single line.
```python
# Direct call
def deco(func):
    # decorator logic here

decorated_function = deco(target)

# Syntax with @
@deco
def target():
    print('running target()')
```
x??

---

#### Closures and Decorators

Background context explaining closures: A closure is a function that remembers the environment in which it was created. It captures variables from its enclosing scope, even if those scopes are no longer active.

:p What is a closure?
??x
A closure is a function object that has access to variables from its own scope, as well as the outer (enclosing) scopes, even when the function is called outside of those scopes.
x??

---

#### Nonlocal Keyword

Background context explaining `nonlocal`: The `nonlocal` keyword in Python allows for modifying variables in non-local enclosing scopes. It's used to indicate that a variable inside a nested function needs to refer to a non-global variable from an enclosing scope.

:p What is the purpose of the `nonlocal` keyword?
??x
The `nonlocal` keyword is used when you want to modify a variable that exists in an outer (but not global) scope within a nested function. This allows for creating closures where inner functions can access and modify variables from their enclosing scopes.
x??

---

#### Decorator Examples

Background context explaining decorator examples: We will explore simple and complex decorators, including parameterized ones.

:p How do you create a simple decorator?
??x
Creating a simple decorator involves defining a function that takes another function as an argument. This function (the decorator) can modify the behavior of the original function.
```python
def deco(func):
    def inner():
        print("Running inner() before target()")
        func()
        print("Running inner() after target()")
    return inner

@deco
def target():
    print('running target()')
```
x??

---

#### Caching Decorators

Background context explaining caching decorators: The `functools.cache` decorator is a simpler alternative to the traditional `lru_cache`. It automatically caches results of the decorated function.

:p What is `functools.cache`?
??x
`functools.cache` is a Python decorator that simplifies caching. It caches the return values of the functions it decorates, making repeated calls with the same arguments much faster.
```python
from functools import cache

@cache
def expensive_function(x):
    # Computationally intensive work here
    pass
```
x??

---

#### Parameterized Decorators

Background context explaining parameterized decorators: A decorator can be made more flexible by allowing it to accept parameters.

:p How do you implement a parameterized decorator?
??x
A parameterized decorator is implemented by adding arguments to the outer function (decorator) and storing those arguments in nonlocal variables. These variables are then used inside the inner functions.
```python
def param_deco(arg1, arg2):
    def deco(func):
        def inner():
            print(f"arg1: {arg1}, arg2: {arg2}")
            func()
        return inner
    return deco

@param_deco('value1', 'value2')
def target():
    print('running target()')
```
x??

---

#### Standard Library Decorators

Background context explaining standard library decorators: Python’s standard library includes several useful decorators like `@cache` and `@lru_cache`.

:p What are some built-in decorators in the standard library?
??x
The standard library provides several useful decorators, including:
- `functools.cache`: Caches return values.
- `functools.lru_cache`: Caches return values with a limit on the size of cache to prevent memory leaks.

```python
from functools import lru_cache

@lru_cache(maxsize=10)
def expensive_function(x):
    # Computationally intensive work here
    pass
```
x??

---

#### Nonlocal Keyword in Decorators

Background context explaining `nonlocal` keyword usage: The `nonlocal` keyword is used when the decorator needs to modify variables from an enclosing scope.

:p Why do we use the `nonlocal` keyword in decorators?
??x
The `nonlocal` keyword is used in decorators to allow modification of non-global variables that are defined in an outer (enclosing) scope. This enables creating closures where inner functions can access and modify these variables.
```python
def outer():
    x = 'initial'
    
    def inner():
        nonlocal x  # Allows modifying x from the enclosing scope
        x = 'modified'
        print(x)
    
    return inner

outer()()
```
x??

---

**Rating: 8/10**

#### Function Decorators and Registration Decorators

Background context: In Python, decorators are a powerful feature that allows modifying or enhancing the behavior of functions. A decorator is essentially a function that takes another function as an argument and returns a new function with enhanced functionality.

:p What does Example 9-2 illustrate about how decorators work in Python?
??x
Example 9-2 illustrates that function decorators are executed as soon as the module containing them is imported, but the decorated functions only run when they are explicitly invoked. This highlights the difference between "import time" and runtime execution.

The example demonstrates a `register` decorator applied to two functions (`f1` and `f2`). The decorator adds the decorated function to a list called `.registry`, which happens at import time, whereas the actual functionality of these functions is only executed when they are called.
x??

---

#### Registration Decorators in Practice

Background context: In Python frameworks, registration decorators are often used to add functions to some central registry. These registries can map URLs to HTTP response generators or other types of mappings.

:p How do real-world decorators differ from the one described in Example 9-2?
??x
Real-world decorators typically define an inner function and return it, as opposed to returning the decorated function unchanged. The `register` decorator in Example 9-2 returns the same function passed as an argument without any modifications, which is unusual for real decorators.

However, this technique can be useful when adding functions to a registry that does not need to modify their behavior.
x??

---

#### Variable Scopes in Python

Background context: In Python, variable scopes determine where variables are accessible within code. Understanding these scopes is crucial for debugging and writing modular code.

:p What errors might you encounter due to incorrect understanding of variable scopes?
??x
You might encounter `NameError` when a global variable has not been defined or `UnboundLocalError` when a local variable is referenced before it is assigned in the function body. 

For example, if you have:
```python
def f1(a):
    print(a)
    print(b)

b = 6
f1(3) # This will raise NameError: global name 'b' is not defined

def f2(a):
    print(a)
    print(b)
    b = 9

f2(3) # This will raise UnboundLocalError: local variable 'b' referenced before assignment
```

In `f1`, the interpreter treats `b` as a global because it's not assigned within the function. In `f2`, the interpreter assumes that `b` is a local variable, leading to an error when trying to print it before it has been assigned.
x??

---

#### Closures in Python

Background context: Closures are functions that remember and have access to variables from their lexical scope even when they are executed outside that scope. Understanding closures helps in writing more flexible and reusable code.

:p What is a closure, and why do we need them?
??x
A closure is a function object that remembers values in enclosing scopes even if those values go out of scope. Closures are needed for creating functions that can maintain state or interact with variables outside their own local scope, providing functionality similar to private members of classes in other languages.

For example:
```python
def outer_function(x):
    def inner_function(y):
        return x + y
    return inner_function

closure_example = outer_function(10)
print(closure_example(5)) # Outputs 15
```

Here, `inner_function` is a closure because it retains the value of `x` from its parent function even after the parent function has finished execution.
x??

---

#### Bytecode Differences in Python

Background context: The dis module allows us to examine the bytecode generated by Python for functions. This can provide insights into how functions are executed and optimized.

:p What does Example 9-5 and Example 9-6 demonstrate about the `print` function calls?
??x
Example 9-5 demonstrates that in the `f1` function, both `a` and `b` are loaded from the global scope when they are referenced. On the other hand, Example 9-6 shows that in the `f2` function, only `a` is loaded from a local scope; the attempt to load `b` as a local fails because it hasn't been assigned yet.

Here's a detailed comparison:
Example 9-5 (bytecode for f1):
```python
def dis(f1):
    dis(f1)
```
Example 9-6 (bytecode for f2):
```python
def dis(f2):
    dis(f2)
```

The key difference is in the handling of `b`:
- In `f1`, it's a global variable.
- In `f2`, it's treated as a local before being assigned, leading to an error if referenced before assignment.

Understanding these differences helps in writing correct and efficient Python code.
x??

---

**Rating: 8/10**

#### Bytecode and Local Variables
Background context explaining how Python's bytecode operates, specifically focusing on local variables. The example provided demonstrates that a variable's nature as local cannot change within the function body despite later assignments.

:p What does the given Python bytecode indicate about the nature of variables in functions?
??x
The given Python bytecode shows that the compiler considers `b` as a local variable even after it gets reassigned later. This is because the scope and type of a variable—whether it’s local or not—are determined at the time the function is compiled, not when executed.

```python
# Example code snippet to illustrate
def example_function():
    13 LOAD_FAST                 1 (b)
    16 CALL_FUNCTION             1 (1 positional , 0 keyword pair)
    19 POP_TOP
    20 LOAD_CONST                1 (9)
    23 STORE_FAST                1 (b)
```
x??

---

#### Closures in Python
Background context explaining the concept of closures and how they differ from anonymous functions. The text provides an example of a functional implementation using higher-order functions to create a running average calculator.

:p What is a closure in Python?
??x
A closure in Python is a function that has extended scope, meaning it can access variables that are not global or local to itself but come from the local scope of an outer function. This allows the inner function to maintain state across multiple calls, effectively remembering values from its parent's execution context.

```python
# Example code snippet for make_averager function
def make_averager():
    series = []  # Local variable in make_averager but free in averager
    def averager(new_value):
        series.append(new_value)
        total = sum(series)
        return total / len(series)
    return averager
```
x??

---

#### Class-Based Running Average Calculator
Background context explaining how a running average can be implemented using a class. This approach uses an instance method to store and update the history of values.

:p How is the `Averager` class used for calculating a running average?
??x
The `Averager` class creates instances that are callable, allowing you to keep track of a series of numbers and calculate their mean at any point. Each instance maintains its own list (`self.series`) which stores all values seen so far.

```python
class Averager:
    def __init__(self):
        self.series = []
    
    def __call__(self, new_value):
        self.series.append(new_value)
        total = sum(self.series)
        return total / len(self.series)

# Example usage
avg = Averager()
print(avg(10))  # Output: 10.0
print(avg(11))  # Output: 10.5
print(avg(12))  # Output: 11.0
```
x??

---

#### Functional Implementation of Running Average Calculator
Background context explaining how a running average can be implemented using a higher-order function. This approach uses an inner function to store and update the history of values.

:p How does the `make_averager` function create a running average calculator?
??x
The `make_averager` function is a higher-order function that returns another function (`averager`) with access to its own local variable `series`. This inner function can be called repeatedly, updating and using this shared state to compute new averages.

```python
def make_averager():
    series = []  # Local variable in make_averager but free in averager
    def averager(new_value):
        series.append(new_value)
        total = sum(series)
        return total / len(series)
    return averager

# Example usage
avg = make_averager()
print(avg(10))  # Output: 10.0
print(avg(11))  # Output: 10.5
print(avg(12))  # Output: 11.0
```
x??

---

#### Free Variables in Closures
Background context explaining the concept of free variables and how they are used in closures to maintain state across function calls.

:p What role do free variables play in closures?
??x
Free variables in a closure are variables that are referenced within an inner function but not defined in its own local scope. They come from the outer function's local scope, allowing the inner function to access and modify them even after the outer function has returned. This is crucial for maintaining state across multiple calls of the inner function.

```python
def make_averager():
    series = []  # Local variable in make_averager but free in averager
    def averager(new_value):
        series.append(new_value)
        total = sum(series)
        return total / len(series)
    return averager

# Example usage
avg = make_averager()
print(avg(10))  # Output: 10.0
print(avg(11))  # Output: 10.5
print(avg(12))  # Output: 11.0
```
x??

---

