# High-Quality Flashcards: 10A000---FluentPython_processed (Part 12)


**Starting Chapter:** Data class as scaffolding. Pattern Matching Class Instances

---


#### Data Class as Scaffolding
Background context: In software development, a data class often serves as a temporary placeholder or initial implementation to quickly get started with a new project. This is especially useful during rapid prototyping or when you need a simple structure for experimentation without fully defining all the behaviors and methods right away.

:p What is a data class used for in its "scaffolding" role?
??x
A data class used as scaffolding is typically an initial, simplistic implementation intended to jumpstart a new project. It serves as a temporary framework until more detailed classes are developed with their own specific behaviors.
??? 

---

#### Data Class as Intermediate Representation
Background context: A data class can also be useful for intermediate representation purposes, such as when dealing with data that needs to be converted to or from different formats like JSON. This helps in managing the flow of data across system boundaries without tightly coupling it to other parts of the application.

:p How can a data class function as an intermediate representation?
??x
A data class acts as an intermediate representation by holding data temporarily, often during import/export operations. It allows you to easily convert instances to dictionaries or JSON objects and vice versa.
??? 

---

#### Why Bringing Responsibilities Back into Data Classes Matters
Background context: If a widely used data class has no significant behavior of its own but methods for its manipulation are scattered throughout the codebase, this can lead to maintenance issues. Refactoring such classes by bringing responsibilities back into them is crucial to maintain clean and organized code.

:p What problem does refactoring data classes help solve?
??x
Refactoring data classes helps address the issue where widely used data classes have no significant behavior of their own, causing methods related to these classes to be scattered across different parts of the system. This can lead to maintenance headaches.
??? 

---

#### Scaffolding is Temporary
Background context: During the early stages of development, a data class may act as scaffolding—initially simple but designed to evolve into more complex and functional classes over time. However, once the project matures or requirements change, these temporary implementations should be refined and eventually replaced.

:p Why is it important for scaffolding to transition into fully independent custom classes?
??x
It's important because initially simplistic scaffolding classes can become too intertwined with other parts of the system if their responsibilities aren't refactored back. This leads to tightly coupled code that is harder to maintain, test, and extend.
??? 

---

#### Handling Data Class Instances as Immutable Objects
Background context: In scenarios where data needs to be exported or imported between different systems, treating instances of a data class as immutable objects ensures consistency and predictability. This is particularly useful when converting these instances to dictionaries for JSON serialization.

:p How should you handle data class instances in their "intermediate representation" form?
??x
You should treat the instances of a data class as immutable while they are in an intermediate state, such as during import/export operations. Even if fields within the instance allow mutation, it is best practice not to modify them once the object enters this intermediate form.
??? 

---

#### Examples with Code

```python
# Example of a simple data class in Python for scaffolding
class Person:
    def __init__(self, name):
        self.name = name  # :p How can you initialize a `Person` object?
??x
To initialize a `Person` object, you would call the constructor with the `name` parameter.
??? 

```python
# Example of converting a data class to JSON-like representation in Python
from dataclasses import asdict

class Person:
    def __init__(self, name):
        self.name = name

person = Person("Alice")
json_like_dict = asdict(person)  # :p What does `asdict` do here?
??x
The `asdict` function from the `dataclasses` module converts a data class instance into a dictionary that can be easily serialized to JSON.
???


#### Simple Class Patterns
Background context: Simple class patterns are used to match class instances by type. These patterns can be used as subpatterns within more complex pattern matching cases, such as those involving sequences and mappings. The syntax for these patterns resembles a constructor invocation.

Example of usage:
```python
match x:
    case float():
        do_something_with(x)
```
This pattern matches `x` if it is an instance of the `float` class. However, using just `case float:` without parentheses can lead to bugs because Python will interpret `float` as a variable.

:p Can you explain why `case float:` without parentheses might be problematic in pattern matching?
??x
Using `case float:` without parentheses matches any subject because Python sees `float` as a variable. This means it can match anything, which is not the intended behavior for class patterns. To correctly match instances of `float`, use `case float():`.

```python
match x:
    case float():
        do_something_with(x)
```
This ensures that only `x` instances of type `float` are matched.
x??

---

#### Keyword Class Patterns
Background context: Keyword class patterns allow you to match specific attributes of a class instance. They can be used in combination with simple class patterns and other types of patterns.

Example usage:
```python
import typing

class City(typing.NamedTuple):
    continent: str
    name: str
    country: str

cities = [
    City('Asia', 'Tokyo', 'JP'),
    City('Asia', 'Delhi', 'IN'),
    City('North America', 'Mexico City', 'MX'),
    City('North America', 'New York', 'US'),
    City('South America', 'São Paulo', 'BR'),
]

def match_asian_cities():
    results = []
    for city in cities:
        match city:
            case City(continent='Asia'):
                results.append(city)
    return results
```
This code matches and collects all Asian cities from the `cities` list.

:p How would you modify the pattern to collect the country names of Asian cities?
??x
To collect the country names, you can use a keyword class pattern with an additional variable for the country attribute:

```python
def match_asian_countries():
    results = []
    for city in cities:
        match city:
            case City(continent='Asia', country=cc):
                results.append(cc)
    return results
```
This will bind `cc` to the `country` attribute of each matched Asian city and collect these values into the `results` list.
x??

---


#### Keyword Class Patterns
Keyword class patterns allow for readable matching of classes based on their attributes. They work with any class that has public instance attributes and are very flexible, but can be verbose.

:p What is a keyword class pattern?
??x
A keyword class pattern allows you to match instances of a class based on specific attribute values using `match` statements in Python 3.10 or later. These patterns are more readable and flexible compared to positional patterns because they explicitly name the attributes involved.
```python
def match_asian_countries_pos():
    results = []
    for city in cities:
        match city:
            case City('Asia', _, country):
                results.append(country)
    return results
```
x??

---

#### Positional Class Patterns
Positional class patterns are a type of pattern matching that uses the `__match_args__` attribute to match instances based on their positional attributes. They require explicit support by the class, but can be more convenient in some cases.

:p What is a positional class pattern?
??x
A positional class pattern matches instances of a class based on the order and values of their public instance attributes defined in `__match_args__`. The `__match_args__` attribute lists the names of the attributes in the order they should be matched.
```python
def match_asian_cities_pos():
    results = []
    for city in cities:
        match city:
            case City('Asia'):
                results.append(city)
    return results
```
x??

---

#### `__match_args__` Attribute
The `__match_args__` attribute is a special class attribute that the `@dataclass`, `namedtuple`, and other class builders automatically create. It lists the names of the instance attributes in the order they will be used in positional patterns.

:p What does the `__match_args__` attribute do?
??x
The `__match_args__` attribute is a special class-level attribute that stores a tuple of strings representing the names of the public instance attributes of a dataclass. This attribute enables pattern matching based on the order and values of these attributes.
```python
>>> City.__match_args__
('continent', 'name', 'country')
```
x??

---

#### Combining Keyword and Positional Arguments in Patterns
You can use both keyword and positional arguments in patterns, even though not all instance attributes may be listed in `__match_args__`. This allows for more flexibility in matching instances.

:p Can you combine keyword and positional arguments in a pattern?
??x
Yes, you can combine keyword and positional arguments in a single pattern. This is useful when the class has many attributes but you only want to match based on some of them.
```python
def match_asian_countries_pos():
    results = []
    for city in cities:
        match city:
            case City('Asia', _, country):
                results.append(country)
    return results
```
x??

---

#### Data Class Builders Overview
Data class builders like `collections.namedtuple`, `typing.NamedTuple`, and `dataclasses.dataclass` generate data classes from descriptions provided as arguments to factory functions or from class statements with type hints.

:p What are data class builders?
??x
Data class builders are tools that help you create lightweight, simple data classes. They automatically add special methods like `__init__`, `__repr__`, and others based on the fields specified in the class definition.
```python
from dataclasses import dataclass

@dataclass
class City:
    continent: str
    name: str
    country: str
```
x??

---

#### Type Hints and Runtime Effects
Type hints, introduced with Python 3.6 via PEP 526, are used to annotate attributes in class statements. However, they have no effect at runtime; Python remains a dynamic language.

:p What is the role of type hints?
??x
Type hints provide static typing information that can be used by external tools like Mypy for static analysis and error detection. At runtime, Python treats these as comments and does not enforce any type checks.
```python
def add_numbers(a: int, b: int) -> int:
    return a + b  # Type hints are ignored at runtime
```
x??

---

#### Syntax for Variable Annotations
Variable annotations introduced in PEP 526 allow you to specify types directly in the class definition.

:p What is variable annotation?
??x
Variable annotations let you specify the expected type of attributes or parameters directly in the class definition. This helps with static analysis and documentation.
```python
from typing import List

class Person:
    name: str
    age: int
    friends: List[str]
```
x??

---

#### `default_factory` Option in Dataclasses
The `dataclasses.field()` function's `default_factory` option allows you to specify a callable that will be called when an instance of the class is created without providing a value for that attribute.

:p What does the `default_factory` option do?
??x
The `default_factory` option in `dataclasses.field()` provides a way to set default values dynamically. The function specified as `default_factory` is only called if no other value is provided during object initialization.
```python
from dataclasses import dataclass, field

@dataclass
class Person:
    name: str
    age: int = 0
    friends: List[str] = field(default_factory=list)
```
x??

---

#### `typing.ClassVar` and `dataclasses.InitVar`
These are special pseudo-type hints that are useful in the context of data classes. `ClassVar` is used to annotate class-level variables, while `InitVar` is used for values passed during initialization.

:p What are `ClassVar` and `InitVar`?
??x
- `ClassVar`: Used to declare a variable that is intended to be used as a class attribute rather than an instance attribute.
- `InitVar`: Used in the constructor of data classes to accept arguments that should not be stored on the instance but can be used for initialization purposes.

```python
from dataclasses import InitVar, dataclass

@dataclass
class Config:
    config: ClassVar[str] = "default"
    param1: InitVar[int]
```
x??

---

#### Dublin Core Schema Example
The Dublin Core Metadata Initiative provides a metadata schema that can be used to describe resources. Using `dataclasses.fields`, you can iterate over the attributes of a resource instance in a custom `__repr__`.

:p How can you use dataclasses fields with the Dublin Core Schema?
??x
You can use `dataclasses.fields` to inspect and manipulate the fields of a class representing a Dublin Core metadata object. This can be useful for generating dynamic representations or performing validations.
```python
from dataclasses import asdict, field, fields

class DublinCoreResource:
    title: str = ""
    creator: List[str] = field(default_factory=list)
    date: str = ""

resource = DublinCoreResource()
for field in fields(resource):
    print(f"{field.name}: {getattr(resource, field.name)}")
```
x??

