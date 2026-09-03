---
title: Kth Smallest Element in a BST
description: Given the root of a binary search tree, and an integer k, return the kth smallest value (1-indexed) of all the values of the nodes in the tree.
tags: [ neetcode, medium, binary-tree]
link: https://leetcode.com/problems/kth-smallest-element-in-a-bst/
images: [ https://assets.leetcode.com/uploads/2021/01/28/kthtree1.jpg, https://assets.leetcode.com/uploads/2021/01/28/kthtree2.jpg ]
hints: ["https://wngnelson.com/assets/img_src/dsa/kthsmallest.gif"]
---

### Description

Given the `root` of a binary search tree, and an integer k, return the kth smallest value (**1-indexed**) of all the values of the nodes in the tree.

### Example 1

![](https://assets.leetcode.com/uploads/2021/01/28/kthtree1.jpg)

```bash
Input: root = [3,1,4,null,2], k = 1
Output: 1
```

### Example 2

![](https://assets.leetcode.com/uploads/2021/01/28/kthtree2.jpg)

```bash
Input: root = [5,3,6,2,4,null,null,1], k = 3
Output: 3
```

### Constraints:

- The number of nodes in the tree is n.
- 1 <= k <= n <= 104
- 0 <= Node.val <= 104