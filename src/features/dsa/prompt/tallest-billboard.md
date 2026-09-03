---
title: Tallest Billboard
description: Return the largest possible height of your billboard installation. If you cannot support the billboard, return 0.
tags: [hard, grand-dp, probability]
link: https://leetcode.com/problems/tallest-billboard
images: []
---

### Description

You are installing a billboard and want it to have the largest height. The billboard will have two steel supports, one on each side. Each steel support must be an equal height.

You are given a collection of rods that can be welded together. For example, if you have rods of lengths 1, 2, and 3, you can weld them together to make a support of length 6.

Return the largest possible height of your billboard installation. If you cannot support the billboard, return 0.

### Example 1

```bash
Input: rods = [1,2,3,6]
Output: 6
Explanation: We have two disjoint subsets {1,2,3} and {6}, which have the same sum = 6.
```

### Example 2

```bash
Input: rods = [1,2,3,4,5,6]
Output: 10
Explanation: We have two disjoint subsets {2,3,5} and {4,6}, which have the same sum = 10.
```

### Constraints:

- 1 <= rods.length <= 20
- 1 <= rods[i] <= 1000
- sum(rods[i]) <= 5000