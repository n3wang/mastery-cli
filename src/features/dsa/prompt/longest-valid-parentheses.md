---
title: Longest Valid Parentheses
description: Given a string containing just the characters '(' and ')', return the length of the longest valid (well-formed) parentheses substring.
tags: [hard, dp, general-1d]
link: https://leetcode.com/problems/longest-valid-parentheses
images: []
---

### Description

Given a string containing just the characters '(' and ')', return the length of the longest valid (well-formed) parentheses substring.

### Example 1

```bash
Input: s = "(()"
Output: 2
Explanation: The longest valid parentheses substring is "()".
```

### Example 2

```bash
Input: s = ")()())"
Output: 4
Explanation: The longest valid parentheses substring is "()()".
```


### Example 3

```bash
Input: s = ""
Output: 0
```

### Constraints:

- 0 <= s.length <= 3 * 104
- s[i] is '(', or ')'.