---
title: Reverse Integer
description: Given a signed 32-bit integer x, return x with its digits reversed. If reversing x causes the value to go outside the signed 32-bit integer range [-231, 231 - 1], then return 0.
tags: [medium, bit-manipulation]
link: https://leetcode.com/problems/reverse-integer/
images: []
---

### Description

Given a signed 32-bit integer `x`, return `x` with its digits reversed. If reversing x causes the value to go outside the signed 32-bit integer range `[-2^31, 2^31 - 1]`, then return `0`.

**Assume the environment does not allow you to store 64-bit integers (signed or unsigned).**

### Example 1

```bash
Input: x = 123
Output: 321
```

### Example 2

```bash
Input: x = -123
Output: -321
```

### Example 3

```bash
Input: x = 120
Output: 21
```


### Constraints:

- -2^31 <= x <= 2^31 - 1