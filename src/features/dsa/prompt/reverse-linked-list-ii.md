---
title: Reverse Linked List II
description: Given the head of a singly linked list and two integers left and right where left <= right, reverse the nodes of the list from position left to position right, and return the reversed list.
tags: [ medium, linked-list ]
link: https://leetcode.com/problems/reverse-linked-list-ii/
images: [https://assets.leetcode.com/uploads/2021/02/19/rev1ex1.jpg, https://assets.leetcode.com/uploads/2021/02/19/rev1ex2.jpg]
hints: ['Once you find the left node, you can just run the reverse linked list algorithm until you reach the right node.',
'Remember that the tracked prev can be null', 
'https://leetcode.com/problems/reverse-linked-list-ii/Figures/92/tail_and_con.png']
---

### Description

Given the `head` of a singly linked list and two integers left and right where left <= right, reverse the nodes of the list from position `left` to position `right`, and return the reversed list.

### Example 1

![](https://assets.leetcode.com/uploads/2021/02/19/rev2ex2.jpg)

```bash
Input: head = [1,2,3,4,5], left = 2, right = 4
Output: [1,4,3,2,5]
```

### Example 2

```bash
Input: head = [5], left = 1, right = 1
Output: [5]
```


### Constraints:

- The number of nodes in the list is n.
- 1 <= n <= 500
- -500 <= Node.val <= 500
1 <= left <= right <= n