---
title: Word Search
description: Given an m x n grid of characters board and a string word, return true if word exists in the grid.
tags: [ neetcode, trie, medium ]
link: https://leetcode.com/problems/word-search/
images: [ https://assets.leetcode.com/uploads/2020/11/04/word2.jpg, https://assets.leetcode.com/uploads/2020/11/04/word-1.jpg, https://assets.leetcode.com/uploads/2020/10/15/word3.jpg ]
hints: ["https://wngnelson.com/assets/img_src/dsa/word-search.gif"]
---

### Description

Given an `m x n` grid of characters `board` and a string `word`, return `true` if word exists in the grid.
The word can be constructed from letters of sequentially adjacent cells, where adjacent cells are horizontally or vertically neighboring. The same letter cell may not be used more than once.

### Example 1

![](https://assets.leetcode.com/uploads/2020/11/04/word2.jpg)

```bash
Input: board = [["A","B","C","E"],["S","F","C","S"],["A","D","E","E"]], word = "ABCCED"
Output: true
```

### Example 2

![](https://assets.leetcode.com/uploads/2020/11/04/word-1.jpg)

```bash
Input: board = [["A","B","C","E"],["S","F","C","S"],["A","D","E","E"]], word = "SEE"
Output: true
```

### Example 3

![](https://assets.leetcode.com/uploads/2020/10/15/word3.jpg)

```bash
Input: board = [["A","B","C","E"],["S","F","C","S"],["A","D","E","E"]], word = "ABCB"
Output: false
```

### Constraints:

- m == board.length 
- n = board[i].length 
- 1 <= m, n <= 6 
- 1 <= word.length <= 15 
- board and word consists of only lowercase and uppercase English letters.