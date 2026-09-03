
```python
# The knows API is already defined for you.
# return a bool, whether a knows b
# def knows(a: int, b: int) -> bool:

class Solution:
    def findCelebrity(self, n: int) -> int:
        # b 
        # b: a no, b: c no, b... no
        # a: b yes, c: b yes, ...:b yes

        # 1. Literante at todso y contamos {a: 2, b: 0, c: 23, d:1}
        # 1. {a: { c, d, b,}, b: {}, c: {a, d, b}, d: {b}}


        # 2. a. b -> b: {}
        # a, c, d, b, e, f, g, h , i
        # personas que ya aparecieron (n)
        # 2 a. c -> c: d -> d: b-> {}


        candidates = set()
        cand_count = 0
        current = 0

        askAbout = 1
        candidate = 0
        while askAbout < n:
            if (knows(candidate, askAbout)):
                candidate = askAbout
            askAbout += 1
        
        # [a, c, d, e] candidate = b 
        for i in range(n):
            if i == candidate:
                continue
            if knows(candidate, i):
                return -1

            if not knows(i, candidate):
                return -1

        return candidate

        
```


