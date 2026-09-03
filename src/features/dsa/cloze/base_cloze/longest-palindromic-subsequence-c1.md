

## Cloze Problem

Complete the Cpp Solution for the following problem:

Illustration:

![search-tree-oncept](https://leetcode.com/problems/longest-palindromic-subsequence/Figures/516/516-1.png)


```python
class Solution:
    def longestPalindromeSubseq(self, s: str) -> int:
        """
        The question here is: Is there a way to make some advantage of previous max

        - Does compression help?
        - Requires to compress together where =s
                - does trie help?
        att2: Using a trie? that markes nested 
        """
        memo = {}

        def palin(l, r):
            if (l, r) in memo:
                return memo[(l, r)]
            if l == r:
                return 1
            if l > r:
                return 0
            
            
            if s[l] == s[r]:
                memo[(l, r)] = palin(l+1, r-1) + 2
            else:
                memo[(l, r)] =  max(palin(l+1, r), palin(l, r-1))
            return memo[(l, r)]
        return palin(0, len(s)-1)

        
```

### Other Languages


### TODO
```cpp


```


```java
class Solution {
    public int longestPalindromeSubseq(String s) {
        int n = s.length();
        int[][] memo = new int[n][n];
        return lps(s, 0, n - 1, memo);
    }

    private int lps(String s, int i, int j, int[][] memo) {
        if (memo[i][j] != 0) {
            return memo[i][j];
        }
        if (i > j) {
            return 0;
        }
        if (i == j) {
            return 1;
        }

        if (s.charAt(i) == s.charAt(j)) {
            memo[i][j] = lps(s, i + 1, j - 1, memo) + 2;
        } else {
            memo[i][j] = Math.max(lps(s, i + 1, j, memo), lps(s, i, j - 1, memo));
        }
        return memo[i][j];
    }
}
```



### Solution using Iterative apporach

```python
class Solution:
    def longestPalindromeSubseq(self, s: str) -> int:
        n = len(s)
        dp, dpPrev = [0] * n, [0] * n

        for i in range(n - 1, -1, -1):
            dp[i] = 1
            for j in range(i + 1, n):
                if s[i] == s[j]:
                    dp[j] = dpPrev[j - 1] + 2
                else:
                    dp[j] = max(dpPrev[j], dp[j - 1])
            dpPrev = dp[:]

        return dp[n - 1]
```






