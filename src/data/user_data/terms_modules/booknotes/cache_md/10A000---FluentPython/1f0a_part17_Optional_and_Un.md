# High-Quality Flashcards: 10A000---FluentPython_processed (Part 17)


**Starting Chapter:** Optional and Union types

---


#### Type Annotations and Inference in Python

Background context: The provided text discusses various aspects of type annotations, including explicit type hints, inferred types from type checkers, and the `Any` wildcard type. It also covers simple types, classes, abstract base classes (ABCs), and union types.

:p What are the implications of using `Any` in function arguments or return values?
??x
The use of `Any` allows a function to accept any type of argument or return any type without explicit annotation. This is useful for situations where the exact type cannot be determined, but it can make the code less readable and type checking less effective.

```python
def f3(p: Any) -> None:
    ...
o0 = object()
o1 = T1()
o2 = T2()
f3(o0)  # All OK: rule #2
f3(o2)  # Also OK: rule #2
```
x??

---

#### Subtype Consistency in Python

Background context: The text explains that `int` is considered consistent with `float`, and `float` is consistent with `complex`. This means an object of type `int` can be used where a `float` or `complex` is expected, even though they are not nominal subtypes.

:p How does the practicality beats purity principle apply to subtype consistency?
??x
The principle "practicality beats purity" implies that while `int`, `float`, and `complex` are direct subclasses of `object`, the operations defined on them allow `int` to be treated as a consistent type with both `float` and `complex`. This practical approach ensures smooth operation without enforcing strict subtype relationships.

```python
3.real  # 3.0
3.imag  # 0.0
```
x??

---

#### Optional and Union Types

Background context: The text describes how `Optional[T]` is a shorthand for `Union[T, None]`, meaning that an optional parameter can accept either the type `T` or `None`. It also mentions that union types like `Union[str, bytes]` allow multiple types to be accepted.

:p What does the function `ord(c: Union[str, bytes]) -> int:` illustrate about union types?
??x
The function `ord(c: Union[str, bytes]) -> int:` illustrates that a single parameter can accept either a string or bytes object and return an integer. This example demonstrates how union types can be used to define flexible function signatures.

```python
from typing import Union

def ord(c: Union[str, bytes]) -> int:
    ...
```
x??

---

#### Practical Use of Union Types

Background context: The text provides examples of functions that may return multiple types using `Union`, such as `parse_token(token: str) -> Union[str, float]`. However, it advises against creating too many union type functions since they can complicate the usage of returned values.

:p Why should one avoid returning `Union` types in function signatures unless necessary?
??x
Avoiding return `Union` types in favor of specific types when possible simplifies the code and makes it easier for users to handle the results. If a function returns a union type, the user needs to check the actual returned type at runtime to determine how to use it, which can be error-prone.

```python
from typing import Union

def parse_token(token: str) -> Union[str, float]:
    try:
        return float(token)
    except ValueError:
        return token
```
x??

---

#### Example of Type Inference

Background context: The text discusses how modern type checkers infer types from function calls and variable assignments. It provides an example where `len(s) * 10` results in a type inference for `x`.

:p How does the type checker infer the return type of `x = len(s) * 10`?
??x
The type checker infers that `x` will be an integer (`int`) because `len(s)` returns an integer, and multiplying it by `10` also results in an integer.

```python
x = len(s) * 10  # Type inferred as int
```
x??

---

#### Abstract Base Classes (ABCs)

Background context: The text mentions that ABCs are useful for type hints. It explains how a subclass is consistent with its superclasses but notes the practicality of treating `int` as consistent with `complex`.

:p How does being consistent-with affect type hints for subclasses?
??x
Being consistent-with means that if a class `C` is a subclass of another class `B`, it can be used wherever an instance of `B` would be expected. This principle allows more flexible type hinting and easier function signatures.

```python
class T1:
    pass

class T2(T1):
    pass

def f3(p: Any) -> None:
    o0 = object()
    o1 = T1()
    o2 = T2()
    
    f3(o0)  # All OK: rule #2
    f3(o1)  # Also OK: rule #2
    f3(o2)  # Still OK: rule #2
```
x??

---

#### Function Return Type Inference

Background context: The text covers the implicit return type `Any` for functions without explicit annotations and how this can be used in various scenarios.

:p How does the function `f4()` with an implicit return type `Any` work?
??x
The function `f4()` has a return type of `Any`, meaning it can return any type. This is often useful when the exact type is not known or determined at the time of writing the code.

```python
def f4():
    ...

o4 = f4()  # inferred type: Any
```
x??

---


#### Tokenize Function
Background context: The `tokenize` function is part of a larger program that processes Unicode characters and their names, creating an inverted index. It uses regular expressions to identify words within character names and returns these as uppercased tokens.

:p What does the `tokenize` function do?
??x
The `tokenize` function takes a string `text`, finds all word-like substrings using a regular expression, and yields each match in uppercase.
```python
import re

RE_WORD = re.compile(r'\w+')

def tokenize(text: str) -> Iterator[str]:
    """return iterable of uppercased words"""
    for match in RE_WORD.finditer(text):
        yield match.group().upper()
```
x??

---

#### Name Index Function
Background context: The `name_index` function creates an inverted index mapping Unicode character names to sets of characters. It uses the `tokenize` function to split these names into words and maps each word back to its corresponding character.

:p What does the `name_index` function do?
??x
The `name_index` function generates an inverted index where keys are word tokens derived from Unicode character names, and values are sets of characters that have those words in their names. It uses a generator expression to efficiently process and map each character within a given range.
```python
from collections.abc import Iterator

def name_index(start: int = 32, end: int = sys.maxunicode + 1) -> dict[str, set[str]]:
    index: dict[str, set[str]] = {}
    for char in (chr(i) for i in range(start, end)):
        if name := unicodedata.name(char, ''):
            for word in tokenize(name):
                index.setdefault(word, set()).add(char)
    return index
```
x??

---

#### Generic Mappings and ABCs
Background context: The text discusses the use of generic mappings (like `dict`) and abstract base classes (ABCs) to improve code flexibility. It also mentions how to handle different versions of Python for type annotations.

:p What is the difference between using `abc.Mapping` versus `dict` in function signatures?
??x
Using `abc.Mapping` instead of `dict` in a function signature makes the function more flexible by allowing it to accept any object that implements the Mapping interface, such as `defaultdict`, `ChainMap`, or even custom mapping types. This approach aligns with Postel's law ("be liberal in what you accept"), ensuring broader compatibility while maintaining type safety.
x??

---

#### Type Hints and Generics
Background context: The text explains how to use generic types from the collections module and typing module for better type annotations, especially when working across different Python versions.

:p How can you handle generic collections like lists or dictionaries in function signatures?
??x
For generic collections like lists (`list`), dictionaries (`dict`), and sets (`set`), it's preferable to use abstract collection types from `collections.abc`, such as `Sequence`, `Mapping`, or `Set`. This approach is more flexible, allowing the caller to pass objects that implement the relevant interface, even if they are not concrete collections like `list` or `dict`.
```python
from typing import List, Mapping

def process_list(data: List[str]) -> str:
    return ', '.join(data)

def use_mapping(color_map: Mapping[str, int]) -> int:
    # Process color_map
    pass
```
x??

---

#### Postel's Law and Type Hints
Background context: The text discusses the importance of using `abc.Mapping` for flexibility in function signatures and how it relates to Postel's law.

:p How does Postel's law influence type hints?
??x
Postel's law advises being conservative in what you send and liberal in what you accept. In terms of Python type hints, this means providing more flexible types like `abc.Mapping` or `collections.abc.Sequence` instead of concrete types like `dict` or `list`. This approach allows the caller to pass compatible objects while maintaining robustness in your function.
x??

---

#### Num_columns Calculation
Background context: The text provides a method for calculating the number of rows and columns needed to arrange elements in a grid-like structure.

:p How is the num_columns variable calculated?
??x
The `num_columns` variable is calculated as the square root of the sequence length, rounded to the nearest integer. This helps determine the dimensions of a grid that can contain all items from the sequence.
```python
num_columns = round(len(sequence) ** 0.5)
```
x??

---

#### Divmod and Bool for Rows Calculation
Background context: The text describes how `divmod` and `bool` are used to calculate the number of rows in a grid.

:p How is the num_rows variable calculated?
??x
The `num_rows` and `reminder` variables are calculated using `divmod`, which returns both the quotient and remainder. If there's any reminder, one additional row is added by checking with `bool(reminder)`.
```python
num_rows, reminder = divmod(len(sequence), num_columns)
num_rows += bool(reminder)
```
x??

---

#### Generic Mappings Example
Background context: The text provides an example of using a generic mapping to create an inverted index for Unicode character names.

:p How is the `name2hex` function used?
??x
The `name2hex` function takes a string name and a mapping (like a dictionary) from names to hexadecimal values. It returns the hexadecimal value corresponding to the given name.
```python
from collections.abc import Mapping

def name2hex(name: str, color_map: Mapping[str, int]) -> str:
    # Example implementation
    return color_map.get(name, '0x0')
```
x??


#### Sorted and Duck Typing
Background context: The `sorted` function in Python can work on any iterable as long as its elements support a `<` comparison. This means that if an object supports the less-than operation, it can be sorted even without explicitly implementing an ordering mechanism.

:p What does the `sorted` function require from its input to function correctly?
??x
The `sorted` function only requires that the elements of the iterable support the `<` operator for comparison. This allows objects that implement their own comparison logic (duck typing) to be sorted.
x??

---

#### Typing.Protocol and Static Duck Typing
Background context: The `typing.Protocol` from Python's `typing` module enables static duck typing, which means you can declare a protocol with specific methods required by the interface. This allows for more robust type checking without needing to subclass or implement interfaces explicitly.

:p How does `typing.Protocol` enable static duck typing?
??x
`typing.Protocol` enables static duck typing by allowing you to define an abstract base class that only declares method signatures and no concrete implementations. An object can be checked against this protocol at runtime if it has the required methods, thus providing a way to enforce interface compliance in a statically typed manner.

:p How would you use `typing.Protocol` to create a `Double` function?
??x
You can define a `Double` function that works with any type of objects as long as they support multiplication. Here’s an example:

```python
from typing import Protocol, TypeVar

class SupportsMul(Protocol):
    def __mul__(self, other: int) -> 'SupportsMul':
        ...

def double(obj: SupportsMul) -> SupportsMul:
    return obj * 2

```
In this case, `double` function will work as long as the object passed to it supports multiplication with an integer.

x??

---

#### Callable Type
Background context: The `Callable` type from Python's `typing` module is used for annotating functions that are expected to be called or passed around. It can specify a function signature, including parameters and return types.

:p How do you annotate a function that accepts a callback with the `Callable` type?
??x
You can use the `Callable` type hint to indicate that a parameter should be callable. Here is an example of annotating the `repl` function:

```python
from typing import Callable

def repl(input_fn: Callable[[Any], str] = input) -> None:
    # Function implementation here
```

In this case, `input_fn` is expected to accept any type and return a string.

:p How do you use `Callable` in the context of an automated testing function?
??x
You can define a function that accepts different implementations of a callable interface. For example:

```python
from typing import Callable

def test_repl(input_fn: Callable[[Any], str] = input) -> None:
    # Function implementation here
```

Here, `test_repl` uses the built-in `input()` function by default but can accept any other function that takes an `Any` parameter and returns a string.

x??

---

#### Overloaded Signatures with @typing.overload
Background context: The `@typing.overload` decorator allows you to declare multiple signatures for the same function. This is useful when a function has different types of parameters or return values under certain conditions.

:p How do you use `@typing.overload` to declare overloaded signatures?
??x
You can use the `@typing.overload` decorator to define multiple signatures for a function, which helps in making type hints more accurate and precise. Here is an example:

```python
from typing import overload

@overload
def process_data(data: int) -> str:
    ...

@overload
def process_data(data: str) -> list[str]:
    ...

def process_data(data):
    if isinstance(data, int):
        return f"Integer data: {data}"
    elif isinstance(data, str):
        return data.split()
```

In this example, `process_data` can accept either an integer or a string and return the appropriate type.

x??

---

#### Order Class Example
Background context: The `Order` class in the provided text uses optional parameters with specific types to allow flexibility. This is useful for creating flexible classes that can handle different input scenarios.

:p How does the `promotion` parameter in the `Order.__init__` method work?
??x
The `promotion` parameter in the `Order.__init__` method allows the class to accept a function that takes an `Order` object and returns a float. This parameter is optional, meaning it can be set to `None`, or it can be any callable of type `Callable[['Order'], float]`. 

Here’s how you might define it in code:

```python
from typing import Optional, Callable

class Order:
    def __init__(
        self,
        customer: Customer,
        cart: Sequence[LineItem],
        promotion: Optional[Callable[['Order'], float]] = None,
    ) -> None:
        self.customer = customer
        self.cart = cart
        self.promotion = promotion
```

In this example, `promotion` can be set to a function that calculates a discount for the order. If no promotion is provided, it defaults to `None`.

x??

