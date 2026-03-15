# Two Sum Custom

**Tags:** array, hashmap  
**Difficulty:** Easy  

## Description
Given an array of integers `nums` and an integer `target`, return indices of the two numbers such that they add up to `target`.

You may assume that each input would have exactly one solution, and you may not use the same element twice.

## Theory
Use a hash map to store previously seen numbers and their indices. For each number, check if its complement (target - current number) exists in the hash map.

## Pseudocode
```
function twoSum(nums, target):
    map = {}
    for i in range(len(nums)):
        complement = target - nums[i]
        if complement in map:
            return [map[complement], i]
        map[nums[i]] = i
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

# Valid Parentheses

**Tags:** string, stack  
**Difficulty:** Easy  

## Description
Given a string `s` containing just the characters '(', ')', '{', '}', '[' and ']', determine if the input string is valid.

An input string is valid if:
- Open brackets must be closed by the same type of brackets.
- Open brackets must be closed in the correct order.

## Theory
Use a stack data structure. Push opening brackets onto the stack, and for closing brackets, check if they match the most recent opening bracket.

## Pseudocode
```
function isValid(s):
    stack = []
    mapping = {')': '(', '}': '{', ']': '['}
    
    for char in s:
        if char in mapping:
            if not stack or stack.pop() != mapping[char]:
                return false
        else:
            stack.push(char)
    
    return len(stack) == 0
```

## Solution

### Python
```python
def isValid(s):
    stack = []
    mapping = {')': '(', '}': '{', ']': '['}
    
    for char in s:
        if char in mapping:
            if not stack or stack.pop() != mapping[char]:
                return False
        else:
            stack.append(char)
    
    return len(stack) == 0
```

### JavaScript
```javascript
function isValid(s) {
    const stack = [];
    const mapping = {')': '(', '}': '{', ']': '['};
    
    for (let char of s) {
        if (char in mapping) {
            if (!stack.length || stack.pop() !== mapping[char]) {
                return false;
            }
        } else {
            stack.push(char);
        }
    }
    
    return stack.length === 0;
}
```

---

# Maximum Subarray

**Tags:** array, dynamic programming  
**Difficulty:** Medium  

## Description
Given an integer array `nums`, find the contiguous subarray (containing at least one number) which has the largest sum and return its sum.

## Theory
Use Kadane's algorithm - keep track of the maximum sum ending at each position. At each step, decide whether to start a new subarray or extend the existing one.

## Pseudocode
```
function maxSubArray(nums):
    maxSum = nums[0]
    currentSum = nums[0]
    
    for i in range(1, len(nums)):
        currentSum = max(nums[i], currentSum + nums[i])
        maxSum = max(maxSum, currentSum)
    
    return maxSum
```

## Solution

### Python
```python
def maxSubArray(nums):
    max_sum = nums[0]
    current_sum = nums[0]
    
    for i in range(1, len(nums)):
        current_sum = max(nums[i], current_sum + nums[i])
        max_sum = max(max_sum, current_sum)
    
    return max_sum
```

### JavaScript
```javascript
function maxSubArray(nums) {
    let maxSum = nums[0];
    let currentSum = nums[0];
    
    for (let i = 1; i < nums.length; i++) {
        currentSum = Math.max(nums[i], currentSum + nums[i]);
        maxSum = Math.max(maxSum, currentSum);
    }
    
    return maxSum;
}
```