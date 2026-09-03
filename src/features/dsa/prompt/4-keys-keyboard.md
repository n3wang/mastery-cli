---
title: 4 Keys Keyboard
description: Given an integer n, return the maximum number of 'A' you can print on the screen with at most n presses on the keys.
tags: [medium, dp, general-1d]
link: https://leetcode.com/problems/4-keys-keyboard
images: []
---

### Description

Imagine you have a special keyboard with the following keys:

- A: Print one 'A' on the screen.
- Ctrl-A: Select the whole screen.
- Ctrl-C: Copy selection to buffer.
- Ctrl-V: Print buffer on screen appending it after what has already been printed.

Given an integer n, return the maximum number of 'A' you can print on the screen with at most n presses on the keys.



### Example 1

```bash
Input: n = 3
Output: 3
Explanation: We can at most get 3 A's on screen by pressing the following key sequence:
A, A, A
```

### Example 2

```bash
Input: n = 7
Output: 9
Explanation: We can at most get 9 A's on screen by pressing following key sequence:
A, A, A, Ctrl A, Ctrl C, Ctrl V, Ctrl V
```

### Constraints:

- 1 <= n <= 50