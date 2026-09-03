---
title: Contains Duplicate II
description: Given an integer array nums and an integer k, return true if there are two distinct indices i and j in the array such that nums[i] == nums[j] and abs(i - j) <= k.
tags: [hashmap, leetcode]
link: https://leetcode.com/problems/contains-duplicate-ii/?envType=study-plan-v2&envId=top-interview-150
images: []
---

### Description

Given an integer array `nums` and an integer `k`, return `true` if there are two distinct indices `i` and `j` in the array such that `nums[i] == nums[j]` and `abs(i - j) <= k`.


### Example 1

```bash
Input: nums = [1,2,3,1], k = 3
Output: true
```

### Example 2

```bash
Input: nums = [1,0,1,1], k = 1
Output: true
```

### Example 3

```bash
Input: nums = [1,2,3,1,2,3], k = 2
Output: false
```

### Constraints:

- 1 <= nums.length <= 105
- -109 <= nums[i] <= 109
- 0 <= k <= 105