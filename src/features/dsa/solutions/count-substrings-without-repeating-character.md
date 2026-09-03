Approach: Sliding Window
Intuition
Let's start by simplifying the language of the problem: We are given a string sss that consists of NNN lowercase English letters. We need to return the number of substrings that have no repeated character (special substring).

The naive way to solve this problem is to find all the possible substrings of sss and then count the ones that have no repeated characters. This approach however is not efficient as there are N2N^2N 
2
  number of substrings in a string with NNN number of characters.

Let's solve this problem by examining the substrings of the given string from left to right. The first character is always a special substring since it can't have repeats. We then add each subsequent character, counting special substrings. If we add a repeating character, we remove characters from the left until the repeat is gone. Then, we resume adding characters from the right. We continue this process until all characters are examined.

This pattern is known as the sliding window pattern and is useful for problems involving subarrays or substrings where individual elements can't be chosen independently. It maintains a window that expands from the right to meet a condition. If the condition fails, the window shrinks from the left until it's met again (in our case, no repetition of characters).

So we define a window with two pointers: start and end. end will expand the window, while start will help us shrink it when needed. To efficiently check for unique characters, we will use a frequency array. This array will tell us the occurrence of each character in our current window.

When we encounter a character that's already in our window, we need to adjust the window by moving the start pointer forward, removing characters until we've eliminated the duplicate. After ensuring our window contains only unique characters, every character from start to end can end a valid substring.

The count of these substrings is simply end - start + 1. By adding this count at each step, we avoid having to recalculate for overlapping substrings, making our algorithm more efficient.

The sliding window approach is visualized below:


![](https://leetcode.com/problems/count-substrings-without-repeating-character/Figures/2743/2743A.png)


Algorithm
- Initialize the variable substringCount to 0. This is the number of special substrings.
- Initialize the variable start to 0. This is the left end point of the current sliding window.
- Initialize an empty frequency array freq of size 26.
- Iterate over the characters in the string s and for each character at the index end do the following:
- Increment the frequency for character s[end].
- If adding the current character introduced a repeated character, shrink the window from the left until the frequency of s[end] becomes 1.
- Add end - start + 1 to the variable substringCount.


Return substringCount.

```python
class Solution:
    def numberOfSpecialSubstrings(self, s: str) -> int:
        substring_count = 0

        start = 0
        freq = [0] * 26
        for end in range(len(s)):
            freq[ord(s[end]) - ord("a")] += 1

            while freq[ord(s[end]) - ord("a")] > 1:
                freq[ord(s[start]) - ord("a")] -= 1
                start += 1

            substring_count += end - start + 1

        return substring_count
```

```java
class Solution {

    public int numberOfSpecialSubstrings(String s) {
        int substringCount = 0;

        int start = 0;
        int[] freq = new int[26];
        for (int end = 0; end < s.length(); end++) {
            freq[s.charAt(end) - 'a']++;

            while (freq[s.charAt(end) - 'a'] > 1) {
                freq[s.charAt(start) - 'a']--;
                start++;
            }

            substringCount += (end - start + 1);
        }

        return substringCount;
    }
}
```


```cpp
class Solution {
public:
    int numberOfSpecialSubstrings(string s) {
        int substringCount = 0;

        int start = 0;
        int freq[26] = {0};
        for (int end = 0; end < s.size(); end++) {
            freq[s[end] - 'a']++;

            while (freq[s[end] - 'a'] > 1) {
                freq[s[start] - 'a']--;
                start++;
            }

            substringCount += (end - start + 1);
        }

        return substringCount;
    }
};
```










