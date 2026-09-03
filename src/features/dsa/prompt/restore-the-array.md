---
title: Restore the Array
description: The program forgot to print whitespaces and the array is printed as a string of digits s and all we know is that all integers in the array were in the range [1, k] and there are no leading zeros in the array
tags: [hard, dp, general-1d]
link: https://leetcode.com/problems/restore-the-array/
images: []
---

### Description

A program was supposed to print an array of integers. The program forgot to print whitespaces and the array is printed as a string of digits s and all we know is that all integers in the array were in the range [1, k] and there are no leading zeros in the array.

Given the string s and the integer k, return the number of the possible arrays that can be printed as s using the mentioned program. Since the answer may be very large, return it modulo 109 + 7.

### Example 1

```bash
Input: s = "1000", k = 10000
Output: 1
Explanation: The only possible array is [1000]
```

### Example 2

```bash
Input: s = "1000", k = 10
Output: 0
Explanation: There cannot be an array that was printed this way and has all integer >= 1 and <= 10.
```

### Constraints:

- 1 <= s.length <= 105
- s consists of only digits and does not contain leading zeros.
- 1 <= k <= 109