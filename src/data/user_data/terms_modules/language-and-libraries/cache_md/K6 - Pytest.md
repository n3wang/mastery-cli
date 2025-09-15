---
tags:
  - software-engineer
---



## Best Practices

### Delving into the Limitations:

- **Confusion with Undefined Markers** : One of the more common issues users encounter is the `UnknownMarkWarning`. If you accidentally mistype a marker or use one that hasn’t been registered, pytest will throw this warning. It’s a reminder to either register the marker in your pytest configuration or fix a potential typo.
    
- **Overhead with Too Many Custom Markers** : The flexibility of creating custom markers is a double-edged sword. While it allows categorization of tests, overuse can lead to a cluttered test suite, making it hard for developers to understand or maintain the code.
    
- **Potential for Misuse** : Since markers can control test behavior, there’s room for misuse. For example, over-relying on markers like `skip` or `xfail` without proper justification can lead to important tests being overlooked.
    
- **Interoperability with Other Tools** : Not all tools and plugins that integrate with pytest might fully support or understand all custom markers. This could lead to unexpected behavior when integrating your tests with other systems.


## Markers


https://pytest-with-eric.com/pytest-best-practices/pytest-markers/


 Kidney heist. Movie popcorn. Sticky = understandable, memorable, and ef-fective in changing thought or behavior. Halloween candy. Six principles: 
SUCCESs. The villain: Curse of Knowledge. It’s hard to be a tapper. Creativity starts with templates.
Using that guide for 


```python

import pytest

@pytest.mark.smoke
def test_homepage_loads():
    # Test to check if the homepage loads quickly
    assert ...

@pytest.mark.regression
def test_login_successful():
    # Test to check if the login process works as expected
    assert ...

@pytest.mark.regression
def test_user_profile_update():
    # Test to check if user profile updates are saved correctly
    assert ...


```


```
pytest -m smoke    # Run only smoke tests
pytest -m regression    # Run only regression tests
```


Pytet smoke


### Skip If


What if you want to skip specific versions of os from testings?
?x
```
```

```python
import pytest
import sys


# A test that will always be skipped.
@pytest.mark.skip(reason="This test is temporarily disabled.")
def test_example_skip():
    assert 2 + 2 == 4


# A test that will be skipped if it's run on a Python version earlier than 3.8.
@pytest.mark.skipif(sys.version_info < (3, 8), reason="Requires Python 3.8 or later.")
def test_example_skipif():
    assert 3 * 3 == 9


```


```
pytest tests/test_skip_skipif.py -v -s

```




To show specific 

![[Pasted image 20250407153853.png]]
> Without having the -v -s ten t wouldn't be appropriate comments explaining


### Test with multiple paramaters attempts


```python
import pytest


# Test function demonstrating the parametrize feature.
# It will run 3 times with different inputs.
@pytest.mark.parametrize("test_input,expected", [(1, 3), (3, 5), (5, 7)])
def test_addition(test_input, expected):
    assert test_input + 2 == expected

```


```
pytest tests/test_parametrize.py -v -s
```

![[Pasted image 20250407154410.png]]


### Timeouts

```python

import pytest
import time


# A Slow Running Test that's expected to timeout.
@pytest.mark.timeout(10)
def test_timeout():
    time.sleep(15)
    assert 2 * 3 == 6

```


![[Pasted image 20250407155401.png]]
> Throws error if it gets timed out

### Combining Multiple Markers


```python
import pytest

@pytest.mark.marker1
@pytest.mark.marker2
def test_combined_markers():
    assert 1 + 1 == 2


@pytest.mark.marker1
def test_no_markers():
    assert 1 + 1 == 2


```

You can also create a and condition it seems
```python
pytest -m marker1 -m marker2 tests/test_combined.py -v -s
```



## Pytest Fixtures


```python
@pytest.mark.usefixtures("fixture1", "fixture2", ...)

```


```python
import pytest


# A fixture returning a sample database entry.
@pytest.fixture
def database_data():
    return {"username": "Alice", "password": "password123"}


# Test function using the database_data fixture.
def test_database_entry(database_data):
    assert database_data["username"] == "Alice"
    assert database_data["password"] == "password123"


```


```
pytest tests/test_fixtures.py -v -s
```



























