---
title: Class Photo
description: The function is going to arrange the students and return true if we can take a photo that follows these constraints; otherwise return false.
tags: [easy, algoexpert]
link: https://github.com/pinglu85/algoExpert/blob/main/Easy/class-photos.md
images: []
---

### Description

### Understanding the problem

We are given two non-empty arrays of positive integers: the first is going to represent the heights of students wearing red shirts and the second is going to represent the heights of students wearing blue shirts. The two arrays will always have the same length. We are asked to write a function that is going to find out if we can take a photo of these students that satisfies the following constraints:

1. All the students that are wearing red shirts must be in the same row;
2. All of the students that are wearing blue shirts must be in the same row;
3. The photo must have exactly two rows and the two rows must have the same number of students in them.
4. Every student in the front row must be shorter than the student directly behind them in the back row.

The function is going to arrange the students and return `true` if we can take a photo that follows these constraints; otherwise return `false`.


### Example 1

```bash
([5, 8, 1, 3, 4], [6, 9, 2, 4, 5]) => true
```

### Example 2

```bash
([5, 8, 1, 3, 4], [6, 9, 2, 4, 4]) => false
```

```bash
([5, 8, 1, 3, 4], [6, 9, 2, 4, 5]) => true
```

```bash
([5, 8, 1, 3, 4, 9], [6, 9, 2, 4, 5, 1]) => false
```

```bash
([6], [6]) => true
```

```bash
([2, 3, 4, 5, 6], [1, 2, 3, 4, 5]) => true
```




