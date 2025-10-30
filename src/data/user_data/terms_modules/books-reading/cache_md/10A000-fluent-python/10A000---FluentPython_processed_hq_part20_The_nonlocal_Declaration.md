# High-Quality Flashcards: 10A000---FluentPython_processed (Part 20)

**Rating threshold:** >= 8/10

**Starting Chapter:** The nonlocal Declaration

---

**Rating: 8/10**

#### Closures and Free Variables
Background context: In Python, a closure is a function object that has access to variables from its lexical scope even when the function is executed outside that scope. This allows for the preservation of state across multiple calls. The `__code__.co_freevars` attribute contains names of free variables used in the function, and `__closure__` holds their values.
:p What are closures and how do they work in Python?
??x
Closures in Python allow a function to retain access to variables from its lexical scope even when that function is called outside that scope. When a nested function accesses a variable from an enclosing function, it forms a closure if the inner function retains references to these free variables.

Here's how it works with code:
```python
def outer_function(series):
    def avg(new_value):
        # series is a free variable here
        return new_value + series[0]  # This creates a closure
    return avg

avg = outer_function([1, 2, 3])
print(avg(4))  # Outputs: 5
```
x??

---
#### Nonlocal Keyword in Python
Background context: In Python, the `nonlocal` keyword is used to declare that a variable inside a nested function refers to a variable defined in the enclosing scope. This allows the inner function to modify variables from its outer function without creating a local copy.
:p What does the `nonlocal` keyword do in Python?
??x
The `nonlocal` keyword in Python allows you to modify variables in an outer (but non-global) scope, effectively making these variables free variables within the nested function. This is useful when you want to maintain state across multiple function calls without using global variables.
Example:
```python
def make_averager():
    count = 0
    total = 0

    def averager(new_value):
        nonlocal count, total
        count += 1
        total += new_value
        return total / count
    return averager

avg = make_averager()
print(avg(10))  # Outputs: 10.0
```
x??

---
#### Efficient Running Average Calculation
Background context: When implementing a running average function, it is inefficient to store all historical values. A more efficient approach is to maintain only the total and count of items seen so far.
:p Why is maintaining a list of all historical values inefficient for calculating a running average?
??x
Maintaining a list of all historical values in each call to calculate the running average is inefficient because it requires storing and updating a potentially large list. This increases memory usage and slows down the function as the number of calls grows.

By contrast, maintaining only the total sum and count of items allows for constant-time updates and calculations.
```python
def make_averager():
    count = 0
    total = 0

    def averager(new_value):
        nonlocal count, total
        count += 1
        total += new_value
        return total / count
    return averager

avg = make_averager()
print(avg(10))  # Outputs: 10.0
```
x??

---
#### UnboundLocalError in Nested Functions
Background context: In Python, if a variable is assigned within a nested function and not declared as `nonlocal`, it will be treated as a local variable, leading to an `UnboundLocalError` when referenced before assignment.
:p Why does the following code raise an `UnboundLocalError`?
??x
The following code raises an `UnboundLocalError` because the variables `count` and `total` are assigned within the nested function `averager`, making them local to that scope. This means they cannot be referenced before being assigned, leading to an error.

```python
def make_averager():
    count = 0
    total = 0

    def averager(new_value):
        count += 1
        total += new_value
        return total / count
    return averager

avg = make_averager()
print(avg(10))  # Raises UnboundLocalError: local variable 'count' referenced before assignment
```
x??

---
#### Correct Implementation with `nonlocal` Keyword
Background context: Using the `nonlocal` keyword, you can declare a variable as a free variable within a nested function even if it is assigned inside that function. This allows maintaining state across multiple function calls.
:p How does using `nonlocal` fix the issue in Example 9-12?
??x
Using the `nonlocal` keyword fixes the issue by declaring `count` and `total` as free variables within the nested `averager` function. This means they are still accessible from the outer scope, allowing them to be updated without being treated as local variables.

Here’s the corrected implementation:
```python
def make_averager():
    count = 0
    total = 0

    def averager(new_value):
        nonlocal count, total
        count += 1
        total += new_value
        return total / count
    return averager

avg = make_averager()
print(avg(10))  # Outputs: 10.0
```
x??

---

**Rating: 8/10**

#### Decorator Implementation
Background context: In Python, decorators are a powerful feature that allow for function modification without changing the underlying function's code. They can be implemented using nested functions and closures to maintain state between calls.

:p What is a decorator and how is it implemented in Example 9-14?
??x
A decorator is a design pattern in Python that allows you to modify or extend the behavior of a function or class without changing its source code. In Example 9-14, `clock` is defined as a decorator that measures the execution time of any given function.

Here's how it works:
```python
import time

def clock(func):
    def clocked(*args):
        t0 = time.perf_counter()
        result = func(*args)
        elapsed = time.perf_counter() - t0
        name = func.__name__
        arg_str = ', '.join(repr(arg) for arg in args)
        print(f'[{elapsed:0.8f} s] {name}({arg_str}) -> {result}')
        return result
    return clocked
```

The `clock` function takes a function (`func`) as an argument and returns the `clocked` inner function, which is a closure that maintains access to `t0`, `name`, and `arg_str`.

:p How does the `snooze` function use the decorator in Example 9-15?
??x
The `snooze` function uses the `@clock` decorator to measure its execution time. Here's how it looks:

```python
from clockdeco0 import clock

@clock
def snooze(seconds):
    time.sleep(seconds)
```

When you call `snooze(0.123)`, the decorated version of the function (which is actually the inner `clocked` function) will be executed, and it will print out the time taken for execution.

:p How does the factorial function use the decorator in Example 9-15?
??x
The `factorial` function also uses the `@clock` decorator to measure its execution time. Here's how it looks:

```python
from clockdeco0 import clock

@clock
def factorial(n):
    return 1 if n < 2 else n * factorial(n - 1)
```

When you call `factorial(6)`, the decorated version of the function will be executed, and it will print out the time taken for each recursive call along with the result.

:p What is the output format when using the decorator in Example 9-15?
??x
The output format includes the execution time (in seconds), the name of the function, the arguments passed to it, and the result of the function. Here's an example:

```
[0.12363791s] snooze(0.123) -> None
```

For the factorial function, it will provide a breakdown for each recursive call:

```
[0.00000095s] factorial (1) -> 1
[0.00002408s] factorial (2) -> 2
[0.00003934s] factorial (3) -> 6
[0.00005221s] factorial (4) -> 24
[0.00006390s] factorial (5) -> 120
[0.00008297s] factorial (6) -> 720
```

:p How does the `clock` decorator work in detail?
??x
The `clock` decorator works by defining an inner function (`clocked`) that measures the execution time of the original function it decorates. Here’s a detailed explanation:

1. **Initial Time Measurement**: The inner function `clocked` records the initial time `t0` using `time.perf_counter()`.
2. **Function Execution**: It then calls the original function (`func(*args)`) and stores its result.
3. **Elapsed Time Calculation**: After the function execution, it calculates the elapsed time by subtracting `t0` from the current time.
4. **Output Formatting**: It formats and prints the collected data, including the name of the function, arguments passed, and the result.
5. **Return Value**: Finally, it returns the result obtained from the original function.

Here is the inner function logic in detail:

```python
def clocked(*args):
    t0 = time.perf_counter()
    result = func(*args)
    elapsed = time.perf_counter() - t0
    name = func.__name__
    arg_str = ', '.join(repr(arg) for arg in args)
    print(f'[{elapsed:0.8f} s] {name}({arg_str}) -> {result}')
    return result
```

:p How does the `factorial` function get modified by the `clock` decorator?
??x
The `factorial` function is decorated with `@clock`, which means its behavior changes to include performance monitoring. This transformation is achieved through the closure mechanism, where the `clocked` inner function retains access to the original `factorial` function even after it has been decorated.

When you call `factorial(6)`, what actually gets executed is a modified version of `factorial` that includes time measurement and logging capabilities:

```python
def factorial(n):
    return 1 if n < 2 else n * factorial(n - 1)
# After decoration:
factorial = clock(factorial)
```

This means every call to `factorial` will be wrapped by the `clocked` function, which records and displays performance details.

:p What is the significance of using a closure in this decorator implementation?
??x
Using a closure in this decorator implementation allows the inner function (`clocked`) to maintain access to variables from the outer scope (such as `t0`, `name`, and `arg_str`), even after the outer function has finished executing. This is crucial because it enables the `clocked` function to keep track of timing details for each call, which would otherwise be lost.

Here's an example of a closure in action:

```python
def clock(func):
    def clocked(*args):
        t0 = time.perf_counter()  # t0 is from the outer scope
        result = func(*args)
        elapsed = time.perf_counter() - t0
        name = func.__name__
        arg_str = ', '.join(repr(arg) for arg in args)
        print(f'[{elapsed:0.8f} s] {name}({arg_str}) -> {result}')
        return result
    return clocked

# After decoration:
factorial = clock(factorial)

# Now, every call to factorial is actually a call to the inner clocked function.
```

:p How does the `__name__` attribute of the decorated function change?
??x
The `__name__` attribute of the decorated function changes because the closure mechanism replaces the original function with the inner `clocked` function. Here’s an example:

```python
>>> import clockdeco_demo
>>> print(clockdeco_demo.factorial.__name__)
'clocked'
```

This shows that after decoration, calling `clocked` directly behaves as if it were `factorial`, but it includes additional timing and logging functionality.

:p How does the `clock` decorator modify the behavior of functions?
??x
The `clock` decorator modifies the behavior of functions by wrapping them in a new function (`clocked`) that measures the time taken to execute the original function. This modification allows for performance monitoring without altering the original function's code. Here’s how it works step-by-step:

1. **Initial Time Measurement**: The inner function records the start time `t0`.
2. **Function Execution**: It calls the original function and stores its result.
3. **Elapsed Time Calculation**: After the original function execution, it calculates the elapsed time by subtracting `t0` from the current time.
4. **Output Formatting**: It formats and prints the collected data, including the name of the function, arguments passed, and the result.
5. **Return Value**: Finally, it returns the result obtained from the original function.

Here is a detailed explanation:

```python
import time

def clock(func):
    def clocked(*args):
        t0 = time.perf_counter()
        result = func(*args)
        elapsed = time.perf_counter() - t0
        name = func.__name__
        arg_str = ', '.join(repr(arg) for arg in args)
        print(f'[{elapsed:0.8f} s] {name}({arg_str}) -> {result}')
        return result
    return clocked

# Example usage:
@clock
def factorial(n):
    return 1 if n < 2 else n * factorial(n - 1)

factorial(6)
```

:p How does the `snooze` function behave after being decorated with `@clock`?
??x
The `snooze` function behaves differently after being decorated with `@clock`. It now includes performance monitoring for its execution. Here’s how it works:

1. **Initial Time Measurement**: The inner function records the start time `t0`.
2. **Function Execution**: It calls the original `snooze` function and stores its result.
3. **Elapsed Time Calculation**: After the original function execution, it calculates the elapsed time by subtracting `t0` from the current time.
4. **Output Formatting**: It formats and prints the collected data, including the name of the function, arguments passed, and the result.
5. **Return Value**: Finally, it returns the result obtained from the original function.

Here is a detailed explanation:

```python
import time

def clock(func):
    def clocked(*args):
        t0 = time.perf_counter()
        result = func(*args)
        elapsed = time.perf_counter() - t0
        name = func.__name__
        arg_str = ', '.join(repr(arg) for arg in args)
        print(f'[{elapsed:0.8f} s] {name}({arg_str}) -> {result}')
        return result
    return clocked

@clock
def snooze(seconds):
    time.sleep(seconds)

snooze(0.123)
```

:p What is the overall purpose of using decorators in Python?
??x
The overall purpose of using decorators in Python is to extend or modify the behavior of functions, methods, or classes without changing their source code. Decorators provide a flexible way to add functionality dynamically and are widely used for tasks such as logging, performance measurement, authentication checks, and more.

For example, in Example 9-14, the `clock` decorator is used to measure the execution time of functions, providing insights into their performance without altering the original function’s implementation. This allows developers to monitor and optimize code without cluttering it with timing logic directly within the function definitions.

**Rating: 8/10**

#### Decorator Pattern Overview
Background context: The Decorator pattern is a design pattern that allows for adding responsibilities to an object dynamically. Unlike using subclassing, it provides a flexible alternative without altering the object structure.

:p What is the Decorator pattern used for?
??x
The Decorator pattern is used to add new functionality to objects at runtime by wrapping them with additional objects called decorators. This approach allows for more flexibility compared to inheritance as it does not alter the original class hierarchy and supports adding responsibilities dynamically.
x??

---
#### Python Decorators
Background context: Python decorators allow developers to modify or enhance functions without changing their source code. They are a higher-order function that takes another function as an argument, adds some functionality, and returns another function.

:p What is a decorator in Python?
??x
A decorator in Python is a design pattern where you can add new functionalities to existing functions without modifying the original function’s structure or code.
x??

---
#### Improving the Clock Decorator
Background context: The initial clock decorator had some limitations, such as not supporting keyword arguments and masking `__name__` and `__doc__`. `functools.wraps` is used to address these issues by copying relevant attributes from the original function.

:p How does `functools.wraps` help in improving decorators?
??x
`functools.wraps` helps in preserving the metadata of the decorated function. It copies important attributes like `__name__`, `__doc__`, and others from the original function to the wrapper, ensuring that the decorated function retains its identity.

:p How does the improved clock decorator handle arguments correctly?
??x
The improved clock decorator handles both positional and keyword arguments correctly by using `*args` for positional arguments and `**kwargs` for keyword arguments. This allows the function being timed to accept any number of positional or keyword arguments.
```python
def clock(func):
    @functools.wraps(func)
    def clocked(*args, **kwargs):
        t0 = time.perf_counter()
        result = func(*args, **kwargs)
        elapsed = time.perf_counter() - t0
        name = func.__name__
        arg_lst = [repr(arg) for arg in args]
        arg_lst.extend(f'{k}={v}' for k, v in kwargs.items())
        arg_str = ', '.join(arg_lst)
        print(f'[{elapsed:0.8f} s] {name}({arg_str}) -> {result}')
        return result
    return clocked
```
x??

---
#### Using `functools.wraps` Decorator
Background context: `functools.wraps` is a built-in decorator that ensures the metadata of the decorated function is copied to the wrapper. This includes preserving the original function's name, docstring, and other attributes.

:p What is the purpose of using `functools.wraps` in decorators?
??x
The purpose of using `functools.wraps` is to preserve the identity of the wrapped function. It copies important attributes like `__name__`, `__doc__`, and others from the original function to the wrapper, making it easier to debug and understand the code.
x??

---
#### Cache Decorator in Python
Background context: The `functools.cache` decorator is used for memoization, an optimization technique that saves results of previous invocations of an expensive function to avoid repeat computations on previously used arguments.

:p What does the `functools.cache` decorator do?
??x
The `functools.cache` decorator optimizes functions by caching their results. This means if a function is called with the same arguments multiple times, its result is retrieved from the cache instead of recomputing it, thus significantly improving performance.
x??

---
#### Example of Using Cache Decorator
Background context: The example demonstrates using `functools.cache` to memoize a recursive Fibonacci function. This reduces redundant computations and speeds up the execution.

:p How does applying `functools.cache` improve the Fibonacci sequence calculation?
??x
Applying `functools.cache` improves the Fibonacci sequence calculation by caching previously computed values. When the same value of `n` is called multiple times, it retrieves the result from the cache instead of recalculating it, thereby reducing redundant computations and significantly improving performance.
```python
@clock
def fibonacci(n):
    if n < 2:
        return n
    return fibonacci(n - 2) + fibonacci(n - 1)

# With functools.cache
@functools.cache
@clock
def fibonacci(n):
    if n < 2:
        return n
    return fibonacci(n - 2) + fibonacci(n - 1)
```
x??

---
#### Stacked Decorators in Python
Background context: In Python, multiple decorators can be stacked. The order of application is from the bottom to the top, with each decorator receiving the function returned by the one above it.

:p How does stacking decorators work in Python?
??x
Stacking decorators works such that the decorators are applied from the bottom to the top. Each decorator receives the function returned by the one above it as its argument. This allows for a chain of decorators, where each can modify or enhance the behavior of the original function.

:p How would you apply multiple decorators in Python?
??x
To apply multiple decorators in Python, you stack them like this:
```python
@decorator3
@decorator2
@decorator1
def my_function():
    # function body
```
The order is from bottom to top. `decorator1` is applied first, then its result (the function) is passed to `decorator2`, and so on.
x??

---

