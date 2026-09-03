---
title: 01 Matrix
description: Given an m x n binary matrix mat, return the distance of the nearest 0 for each cell. The distance between two adjacent cells is 1.
tags: [medium, graph, bfs]
link: https://leetcode.com/problems/01-matrix/
images: []
---

### Description

Given an m x n binary matrix mat, return the distance of the nearest 0 for each cell.

The distance between two adjacent cells is 1.

### Example 1

![](https://assets.leetcode.com/uploads/2021/04/24/01-1-grid.jpg)

```bash
Input: mat = [[0,0,0],[0,1,0],[0,0,0]]
Output: [[0,0,0],[0,1,0],[0,0,0]]
```

### Example 2

![](https://assets.leetcode.com/uploads/2021/04/24/01-2-grid.jpg)

```bash
Input: mat = [[0,0,0],[0,1,0],[1,1,1]]
Output: [[0,0,0],[0,1,0],[1,2,1]]
```

### Constraints:

- m == mat.length
- n == mat[i].length
- 1 <= m, n <= 104
- 1 <= m * n <= 104
- mat[i][j] is either 0 or 1.
- There is at least one 0 in mat.