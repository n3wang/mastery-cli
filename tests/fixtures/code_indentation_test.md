# Code Indentation Test

#### Python Function Example

Write a function that implements binary search

:p Implement binary search in Python

??x
```python
def binary_search(arr, target):
    left = 0
    right = len(arr) - 1

    while left <= right:
        mid = (left + right) // 2

        if arr[mid] == target:
            return mid
        elif arr[mid] < target:
            left = mid + 1
        else:
            right = mid - 1

    return -1
```
x??

#### Nested Object Example

Create a nested JavaScript object with proper indentation

??x
```javascript
const config = {
    server: {
        host: 'localhost',
        port: 3000,
        routes: {
            api: '/api/v1',
            static: '/public'
        }
    },
    database: {
        connection: {
            host: 'db.example.com',
            port: 5432
        }
    }
};
```
x??

#### Indented List Example

How to structure a markdown list?

??x
Markdown lists should maintain proper indentation:

- First level item
    - Second level item
        - Third level item
    - Back to second level
- Back to first level

Code blocks can also be indented:

    def indented_code():
        return "This is indented with spaces"

Regular text continues here.
x??
