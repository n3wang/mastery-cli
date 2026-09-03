---
title: Number of Longest Increasing Subsequence
description: Given an integer array nums, return the number of longest increasing subsequences. Notice that the sequence has to be strictly increasing.
tags: [dp, medium, longest-increasing-subsequence]
link: https://leetcode.com/problems/number-of-longest-increasing-subsequenc
images: []
---

### Description

Given an integer array nums, return the number of longest increasing subsequences.

Notice that the sequence has to be strictly increasing.

### Example 1

```bash
Input: nums = [1,3,5,4,7]
Output: 2
Explanation: The two longest increasing subsequences are 

[1, 3, 4, 7] and [1, 3, 5, 7].
```

### Example 2

```bash
Input: nums = [2,2,2,2,2]
Output: 5
Explanation: The length of the longest increasing subsequence is 1, and there are 5 increasing subsequences of length 1, so output 5.
```

### Constraints:

- 1 <= nums.length <= 2000
- -106 <= nums[i] <= 106