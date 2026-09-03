---
title: Substrings That Begin and End With the Same Letter (Language Practice)
description: Rewrite the provided code for this algorithm in diffrent languages.
tags: [language-practice]
link: https://leetcode.com/problems/substrings-that-begin-and-end-with-the-same-letter
images: []
---

### Description

You are given a 0-indexed string s consisting of only lowercase English letters. Return the number of substrings in s that begin and end with the same character.

A substring is a contiguous non-empty sequence of characters within a string.

### Example 1

```bash
Input: s = "abcba"
Output: 7
Explanation:
The substrings of length 1 that start and end with the same letter are: "a", "b", "c", "b", and "a".
The substring of length 3 that starts and ends with the same letter is: "bcb".
The substring of length 5 that starts and ends with the same letter is: "abcba".
```

### Example 2

```bash
Input: s = "abacad"
Output: 9
Explanation:
The substrings of length 1 that start and end with the same letter are: "a", "b", "a", "c", "a", and "d".
The substrings of length 3 that start and end with the same letter are: "aba" and "aca".
The substring of length 5 that starts and ends with the same letter is: "abaca".
```

### Python Solution


```python
class Solution:
    def numberOfSubstrings(self, s: str) -> int:
        """
        Ap1:
        1. Add all single letters to resutls
        2. Where count >= add the combinatorics of the count of the letter choose 2
        """
        countLetters = {}
        for letter in s:
            if letter not in countLetters:
                countLetters[letter] = 0
            countLetters[letter] += 1
        results = len(s) 
        for letter in countLetters:
            count = countLetters[letter]
            if count < 2:
                continue
            results += math.comb(count, 2)
        return results

```


