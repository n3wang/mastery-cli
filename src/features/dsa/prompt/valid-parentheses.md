---
title: Valid Parentheses
description: Given a string s containing just the characters '(', ')', '{', '}', '[' and ']', determine if the input string is valid.
tags: [ neetcode, easy, stack]
link: https://leetcode.com/problems/valid-parentheses/
hints: ["https://wngnelson.com/assets/img_src/dsa/validparentheses.gif"]
---

### Description

Given a string s containing just the characters '(', ')', '{', '}', '[' and ']', determine if the input string is valid.

An input string is valid if:

Open brackets must be closed by the same type of brackets.
Open brackets must be closed in the correct order.
Every close bracket has a corresponding open bracket of the same type.


### Example 1
```bash
Input: s = "()"
Output: true
```

### Example 2
```bash
Input: s = "()[]{}"
Output: true
```

### Example 3
```bash
Input: s = "(]"
Output: false
```

### Constraints:

-      1 <= s.length <= 104     
-      s consists of parentheses only '()[]{}'. 