---
title: Character Replacement
description:  Longest Repeating Character Replacement
tags: [ neetcode, medium, sliding-window]
hint: ["To solve this problem, you need to first find the longest contiguous substring of s that contains the same letter. Then, you need to check if you can make this substring longer by changing some of the characters to the same letter. You can do this by counting the frequency of each character in the substring and checking if the number of characters you need to change to the most frequent character is less than or equal to k.  If it is, you can change those characters to the most frequent character and obtain a longer substring with the same letter. If it is not, you cannot change enough characters to make the substring longer and you should move on to the next contiguous substring in s.  Repeat this process for all contiguous substrings of s to find the longest substring containing the same letter that can be obtained after performing at most k operations."]
---

### Description

You are given a string `s` and an integer `k`. You can choose any character of the string and change it to any other uppercase English character. You can perform this operation at most `k` times.

Return the length of the longest substring containing the same letter you can get after performing the above operations.

### Re-explained:

You have a sentence (string) and a number (k). You can change any letter in the sentence to another letter of the alphabet, but you can only change up to k letters. You want to find the longest part of the sentence where all the letters are the same, but you can change some letters to make it longer


### Example 1
```bash
Input: s = "ABAB", k = 2
Output: 4
Explanation: Replace the two 'A's with two 'B's or vice versa.
```

### Example 2
```bash
Input: s = "AABABBA", k = 1
Output: 4
Explanation: Replace the one 'A' in the middle with 'B' and form "AABBBBA".
The substring "BBBB" has the longest repeating letters, which is 4.
```


### Example 3

```bash
Input: s = "abcdeffggg", k = 2
Output: 6
Explanation: The longest substring containing the same letter is "ggg", which is 3 letters long. You can change the 'e' to a 'g' and the 'f' to a 'g' to make the substring "gggggg", which is 6 letters long.
```

### Example 4

```bash
Input: s = "AAAAAA", k = 2
Output: 6
Explanation: You don't need to change any letters because the entire string is already made up of the same letter 'A', which is 6 letters long.
```

### Example 5

```bash
Input: s = "abccbaaaabbccaa", k = 3
Output: 7
Explanation: The longest substring containing the same letter is "aaa", which is 3 letters long. You can change the 'b' to an 'a', the first 'c' to an 'a', and the second 'c' to an 'a' to make the substring "aaaaaaa", which is 7 letters long.
```


### Constraints:

- 1 <= s.length <= 105
- s consists of only uppercase English letters.
- 0 <= k <= s.length
