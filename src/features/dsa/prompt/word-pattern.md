---
title: Word Pattern
description: Given a pattern and a string s, find if s follows the same pattern. Here follow means a full match, such that there is a bijection between a letter in pattern and a non-empty word in s.
tags: [hashmap, easy, leetcode]
link: https://leetcode.com/problems/word-pattern/
images: []
---

### Description

Given a pattern and a string s, find if s follows the same pattern.

Here follow means a full match, such that there is a bijection between a letter in pattern and a non-empty word in s.

### Example 1

```bash
Input: pattern = "abba", s = "dog cat cat dog"
Output: true
```

### Example 2

```bash
Input: pattern = "abba", s = "dog cat cat fish"
Output: false
```

### Constraints:

- 1 <= pattern.length <= 300
- pattern contains only lower-case English letters.
- 1 <= s.length <= 3000
- s contains only lowercase English letters and spaces ' '.
- s does not contain any leading or trailing spaces.
- All the words in s are separated by a single space.