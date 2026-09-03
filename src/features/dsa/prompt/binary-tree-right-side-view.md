---
title: Binary Tree Right Side View
description: Given the root of a binary tree, imagine yourself standing on the right side of it, return the values of the nodes you can see ordered from top to bottom.
tags: [ neetcode, medium, binary-tree]
link: https://leetcode.com/problems/binary-tree-right-side-view/
images: [ https://assets.leetcode.com/uploads/2021/02/14/tree.jpg]
hints: ["https://wngnelson.com/assets/img_src/dsa/rightsideview.gif"]
---

### Description

Given the `root` of a binary tree, imagine yourself standing on the **right side** of it, return the values of the nodes you can see ordered from top to bottom.

### Example 1

![](https://assets.leetcode.com/uploads/2021/02/14/tree.jpg)


```bash
Input: root = [1,2,3,null,5,null,4]
Output: [1,3,4]
```

### Example 2

```bash
Input: root = [1,null,3]
Output: [1,3]
```

### Constraints:

- The number of nodes in the tree is in the range [0, 100]. 
- -100 <= Node.val <= 100