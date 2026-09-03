---
title: Course Schedule
description: Return true if you can finish all courses. Otherwise, return false.
tags: [ neetcode, medium, graphs, topological-sort, standard-traversal]
link: https://leetcode.com/problems/course-schedule/
images: []
hints: ["https://wngnelson.com/assets/img_src/dsa/course_schedule.gif"]
---

### Description

There are a total of `numCourses` courses you have to take, labeled from 0 to numCourses - 1. You are given an array prerequisites where `prerequisites[i] = [ai, bi]` indicates that you **must** take course bi first if you want to take course ai.

For example, the pair `[0, 1]`, indicates that to take course 0 you have to first take course 1.
Return true if you can finish all courses. Otherwise, return `false`.

### Example 1

```bash
Input: numCourses = 2, prerequisites = [[1,0]]
Output: true
Explanation: There are a total of 2 courses to take. 
To take course 1 you should have finished course 0. So it is possible.
```

### Example 2

```bash
Input: numCourses = 2, prerequisites = [[1,0],[0,1]]
Output: false
Explanation: There are a total of 2 courses to take. 
To take course 1 you should have finished course 0, and to take course 0 you should also have finished course 1. So it is impossible.
```

### Constraints:

- 1 <= numCourses <= 2000 
- 0 <= prerequisites.length <= 5000 
- prerequisites[i].length == 2 
- 0 <= ai, bi < numCourses 
- All the pairs prerequisites[i] are unique.


### Sample Markdown Solution

| Step | numCourses | prerequisites | indegree | adj | queue | traversed | node | Return |
|------|------------|---------------|----------|-----|-------|-----------|------|--------|
| 0    | 8          | [[1, 0], [2, 6], [1, 7], [6, 4], [7, 0], [0, 5]] | [0, 0, 0, 0, 0, 0, 0, 0] | [[], [], [], [], [], [], [], []] | [] | 0 | |
| 1    | 8          | [[1, 0], [2, 6], [1, 7], [6, 4], [7, 0], [0, 5]] | [0, 1, 0, 0, 0, 0, 0, 0] | [[1], [], [], [], [], [], [], []] | [] | 0 | |
| 2    | 8          | [[1, 0], [2, 6], [1, 7], [6, 4], [7, 0], [0, 5]] | [0, 1, 1, 0, 0, 0, 0, 0] | [[1], [], [], [], [], [], [2], []] | [] | 0 | |
| 3    | 8          | [[1, 0], [2, 6], [1, 7], [6, 4], [7, 0], [0, 5]] | [0, 2, 1, 0, 0, 0, 0, 0] | [[1], [], [], [], [], [], [2], [1]] | [] | 0 | |
| 4    | 8          | [[1, 0], [2, 6], [1, 7], [6, 4], [7, 0], [0, 5]] | [0, 2, 1, 0, 0, 0, 1, 0] | [[1], [], [], [], [6], [], [2], [1]] | [] | 0 | |
| 5    | 8          | [[1, 0], [2, 6], [1, 7], [6, 4], [7, 0], [0, 5]] | [0, 2, 1, 0, 0, 0, 1, 1] | [[1], [], [], [], [6], [0], [2], [1]] | [] | 0 | |
| 6    | 8          | [[1, 0], [2, 6], [1, 7], [6, 4], [7, 0], [0, 5]] | [1, 2, 1, 0, 0, 0, 1, 1] | [[1, 7], [], [], [], [6], [0], [2], [1]] | [] | 0 | |
| 7    | 8          | [[1, 0], [2, 6], [1, 7], [6, 4], [7, 0], [0, 5]] | [1, 2, 1, 0, 0, 0, 1, 1] | [[1, 7], [], [], [], [6], [0], [2], [1]] | [3, 4] | 1 | 5 |
| 8    | 8          | [[1, 0], [2, 6], [1, 7], [6, 4], [7, 0], [0, 5]] | [0, 2, 1, 0, 0, 0, 1, 1] | [[1, 7], [], [], [], [6], [0], [2], [1]] | [3, 4] | 2 | 0 |
| 9    | 8          | [[1, 0], [2, 6], [1, 7], [6, 4], [7, 0], [0, 5]] | [0, 1, 1, 0, 0, 0, 1, 0] | [[1, 7], [], [], [], [6], [0], [2], [1]] | [3, 4] | 3 | 7 |
| 10   | 8          | [[1, 0], [2, 6], [1, 7], [6, 4], [7, 0], [0, 5]] | [0, 0, 1, 0, 0, 0, 1, 0] | [[1, 7], [], [], [], [6], [0], [2], [1]] | [3, 4] | 4 | 1 |
| 11   | 8          | [[1, 0], [2, 6], [1, 7], [6, 4], [7, 0], [0, 5]] | [0, 0, 1, 0, 0, 0, 1, 0] | [[1, 7], [], [], [], [6], [0], [2], [1]] | [3] | 5 | 4 |
| 12   | 8          | [[1, 0], [2, 6], [1, 7], [6, 4], [7, 0], [0, 5]] | [0, 0, 1, 0, 0, 0, 0, 0] | [[1, 7], [], [], [], [6], [0], [2], [1]] | [3] | 6 | 6 |
| 13   | 8          | [[1, 0], [2, 6], [1, 7], [6, 4], [7, 0], [0, 5]] | [0, 0, 0, 0, 0, 0, 0, 0] | [[1, 7], [], [], [], [6], [0], [2], [1]] | [3] | 7 | 2 |
| 14   | 8          | [[1, 0], [2, 6], [1, 7], [6, 4], [7, 0], [0, 5]] | [0, 0, 0, 0, 0, 0, 0, 0] | [[1, 7], [], [], [], [6], [0], [2], [1]] | [] | 8 |




