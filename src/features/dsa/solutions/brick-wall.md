
My solution using a hashmap to store the distances of the bricks and then return the minimum count of bricks that cross the same distance.


```python
from typing import List

class Solution:
    def leastBricks(self, wall: List[List[int]]) -> int:
        count = {}
        for row in wall:
            dist = 0
            # We don't need to consider the last brick in the row.
            for brick in row[:-1]:
                dist += brick
                if dist not in count:
                    count[dist] = len(wall)
                count[dist] -= 1


        # Return the hash where count is max.
        mincount = len(wall)
        for distance in count:
            mincount = min(count[distance], mincount)

        # o(row * sum(rowvalues))
        return mincount


```