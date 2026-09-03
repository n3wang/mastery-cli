---
title: Letter Combinations of a Phone Number
description: Given a string containing digits from 2-9 inclusive, return all possible letter combinations that the number could represent. Return the answer in any order.
tags: [ neetcode, hard, backtracking]
link: https://leetcode.com/problems/letter-combinations-of-a-phone-number/
images: []
---

### Description

Given a string containing digits from 2-9 inclusive, return all possible letter combinations that the number could represent. Return the answer in **any order**.
A mapping of digits to letters (just like on the telephone buttons) is given below. Note that 1 does not map to any letters.

### Example 1

![Example 1](https://assets.leetcode.com/uploads/2022/03/15/1200px-telephone-keypad2svg.png)


```bash
Input: digits = "23"
Output: ["ad","ae","af","bd","be","bf","cd","ce","cf"]
```

### Example 2

```bash
Input: digits = ""
Output: []
```

### Example 3

```bash
Input: digits = "2"
Output: ["a","b","c"]
```


### Constraints:

- 0 <= digits.length <= 4
- digits[i] is a digit in the range ['2', '9']