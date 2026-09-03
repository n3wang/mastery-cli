---
title: Partition Equal Subset Sum
description: Given an integer array nums, return true if you can partition the array into two subsets such that the sum of the elements in both subsets is equal or false otherwise.
tags: [medium, dp, neetcode]
link: https://leetcode.com/problems/partition-equal-subset-sum/1
images: []
---

### Description

Given an integer array `nums`, return `true` if you can partition the array into two subsets such that the sum of the elements in both subsets is equal or `false` otherwise.

### Example 1

```bash
Input: nums = [1,5,11,5]
Output: true
Explanation: The array can be partitioned as [1, 5, 5] and [11].
```

### Example 2

```bash
Input: nums = [1,2,3,5]
Output: false
Explanation: The array cannot be partitioned into equal sum subsets.
```

### Constraints:

- 1 <= nums.length <= 200
- 1 <= nums[i] <= 100