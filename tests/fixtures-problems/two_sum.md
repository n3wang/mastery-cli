
Here a few tests

# Two Sum

**Tags:** array, hashmap  
**Difficulty:** Easy  

## Description
Given an array of integers `nums` and an integer `target`, return indices of the two numbers such that they add up to `target`.

## Theory
Use a hash map to store previously seen numbers and their indices.

## Pseudocode
```

function twoSum(nums, target):
map = {}
for i in range(len(nums)):
complement = target - nums\[i]
if complement in map:
return \[map\[complement], i]
map\[nums\[i]] = i

```

## Solution

### Python

```python
def twoSum(nums, target):
    lookup = {}
    for i, num in enumerate(nums):
        if target - num in lookup:
            return [lookup[target - num], i]
        lookup[num] = i
```

### JavaScript

```javascript
function twoSum(nums, target) {
    const map = {};
    for (let i = 0; i < nums.length; i++) {
        let diff = target - nums[i];
        if (diff in map) return [map[diff], i];
        map[nums[i]] = i;
    }
}
```

---

# Reverse String

**Tags:** string, two pointers  
**Difficulty:** Easy  

## Description
Write a function that reverses a string. The input string is given as an array of characters `s`.

## Theory
Use two pointers moving inward from both ends.

## Pseudocode

```
function reverseString(s):
left = 0
right = len(s) - 1
while left < right:
swap(s\[left], s\[right])
left += 1
right -= 1

```

## Solution

### Python

```python
def reverseString(s):
    left, right = 0, len(s) - 1
    while left < right:
        s[left], s[right] = s[right], s[left]
        left += 1
        right -= 1
```

### JavaScript

```javascript
function reverseString(s) {
    let left = 0, right = s.length - 1;
    while (left < right) {
        [s[left], s[right]] = [s[right], s[left]];
        left++;
        right--;
    }
}
```
