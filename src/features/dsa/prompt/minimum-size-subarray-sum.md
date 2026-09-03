---
title: Minimum Size Subarray Sum
description: Given an array of positive integers nums and a positive integer target, return the minimal length of a subarray whose sum is greater than or equal to target. If there is no such subarray, return 0 instead.
tags: [medium, binary-search]
link: https://leetcode.com/problems/minimum-size-subarray-sum/
images: []
---

### Description

Given an array of positive integers nums and a positive integer target, return the minimal length of a subarray whose sum is greater than or equal to target. If there is no such subarray, return 0 instead.

### Example 1

```bash
Input: target = 7, nums = [2,3,1,2,4,3]
Output: 2
Explanation: The subarray [4,3] has the minimal length under the problem constraint.
```

### Example 2

```bash
Input: target = 4, nums = [1,4,4]
Output: 1
```

### Constraints:

- 1 <= target <= 109
- 1 <= nums.length <= 105
- 1 <= nums[i] <= 104