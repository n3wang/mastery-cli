---
title: Toss Strange Coins
description: Return the probability that the number of coins facing heads equals target if you toss every coin exactly once.
tags: [medium, grand-dp, probability]
link: https://leetcode.com/problems/toss-strange-coins
images: []
---

### Description

You have some coins.  The i-th coin has a probability prob[i] of facing heads when tossed.

Return the probability that the number of coins facing heads equals target if you toss every coin exactly once.

### Example 1

```bash
Input: prob = [0.4], target = 1
Output: 0.40000
```

### Example 2

```bash
Input: prob = [0.5,0.5,0.5,0.5,0.5], target = 0
Output: 0.03125
```

### Constraints:

- 1 <= prob.length <= 1000
- 0 <= prob[i] <= 1
- 0 <= target <= prob.length
- Answers will be accepted as correct if they are within 10^-5 of the correct answer.