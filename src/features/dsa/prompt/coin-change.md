---
title: Coin Change
description: You may assume that you have an infinite number of each kind of coin.
tags: [medium, dp, neetcode]
link: https://leetcode.com/problems/coin-change/
images: []
hints: ["https://wngnelson.com/assets/img_src/dsa/coin_change.gif"]
---



### Description

You are given an integer array `coins` representing coins of different denominations and an integer amount representing a total `amount` of money.

Return the fewest number of coins that you need to make up that amount. If that amount of money cannot be made up by any combination of the coins, return `-1`.

You may assume that you have an infinite number of each kind of coin.

### Example 1

```bash
Input: coins = [1,2,5], amount = 11
Output: 3
Explanation: 11 = 5 + 5 + 1
```

### Example 2

```bash
Input: coins = [2], amount = 3
Output: -1
```

### Example 3

```bash
Input: coins = [1], amount = 0
Output: 0
```

### Constraints:

- 1 <= coins.length <= 12
- 1 <= coins[i] <= 231 - 1
- 0 <= amount <= 104
