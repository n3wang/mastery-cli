---
title: Surrounded Regions
description: Given an m x n matrix board containing 'X' and 'O', capture all regions that are 4-directionally surrounded by 'X'.
tags: [ neetcode, medium, graphs]
link: https://leetcode.com/problems/surrounded-regions/
images: [https://assets.leetcode.com/uploads/2021/02/19/xogrid.jpg]
hints: ["https://wngnelson.com/assets/img_src/dsa/surrounded.gif"]
---

### Description

Given an `m x n` matrix board containing 'X' and 'O', capture all regions that are 4-directionally surrounded by 'X'.

A region is **captured** by flipping all 'O's into 'X's in that surrounded region.

### Example 1

![](https://assets.leetcode.com/uploads/2021/02/19/xogrid.jpg)

```bash
Input: board = [["X","X","X","X"],["X","O","O","X"],["X","X","O","X"],["X","O","X","X"]]
Output: [["X","X","X","X"],["X","X","X","X"],["X","X","X","X"],["X","O","X","X"]]
Explanation: Notice that an 'O' should not be flipped if:
- It is on the border, or
- It is adjacent to an 'O' that should not be flipped.
The bottom 'O' is on the border, so it is not flipped.
The other three 'O' form a surrounded region, so they are flipped.
```

### Example 2

```bash
Input: board = [["X"]]
Output: [["X"]]
```

### Constraints:

- m == board.length
- n == board[i].length
- 1 <= m, n <= 200
- board[i][j] is 'X' or 'O'