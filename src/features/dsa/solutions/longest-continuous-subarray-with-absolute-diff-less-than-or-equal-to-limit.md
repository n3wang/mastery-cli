
Solution:

```python
class Solution:
    def longestSubarray(self, nums: List[int], limit: int) -> int:
        """   

        """
        max_heap = []
        min_heap = []

        left = 0
        max_length = 0

        for right in range(len(nums)):
            heapq.heappush(max_heap, (-nums[right], right))
            heapq.heappush(min_heap, (nums[right], right))

            # Check if the absolute difference between the maximum and minimum values in the current window exceeds the limit
            print('extracted', max_heap[0][0], min_heap[0][0])
            while -max_heap[0][0] - min_heap[0][0] > limit:
                # Move the left pointer to the right until the condition is satisfied.
                # This ensures we remove the element causing the violation
                left = min(max_heap[0][1], min_heap[0][1]) + 1

                # Remove elements from the heaps that are outside the current window
                while max_heap[0][1] < left:
                    heapq.heappop(max_heap)
                while min_heap[0][1] < left:
                    heapq.heappop(min_heap)

            # Update max_length with the length of the current valid window
            max_length = max(max_length, right - left + 1)

        return max_length
```

### Python Smallest Min Heap

 Python's heapq module implements a min-heap by default. This means that the smallest element is always at the root of the heap, which is the first element in the list representation of the heap.

nums = [8, 2, 4, 7]
limit = 4

Initial State:
max_heap = []
min_heap = []
left = 0
max_length = 0

Step-by-Step:

1. right = 0, nums[right] = 8
   max_heap = [(-8, 0)]
   min_heap = [(8, 0)]
   max_length = 1 (subarray: [8])

2. right = 1, nums[right] = 2
   max_heap = [(-8, 0), (-2, 1)]
   min_heap = [(2, 1), (8, 0)]
   Condition: |-8 - 2| > 4 (True) 
   In the code shows as -max_heap[0][0] - min_heap[0][0] > limit
   so is: -(-8) - 2 > 4
   
   left = 1
   max_heap = [(-2, 1)]
   min_heap = [(2, 1)]
   max_length = 1 (subarray: [2])

3. right = 2, nums[right] = 4
   max_heap = [(-4, 2), (-2, 1)]
   min_heap = [(2, 1), (4, 2)]
   Condition: |-4 - 2| <= 4 (True)
   max_length = 2 (subarray: [2, 4])

4. right = 3, nums[right] = 7
   max_heap = [(-7, 3), (-2, 1), (-4, 2)]
   min_heap = [(2, 1), (4, 2), (7, 3)]
   Condition: |-7 - 2| > 4 (True)
   left = 2
   max_heap = [(-7, 3), (-4, 2)]
   min_heap = [(4, 2), (7, 3)]
   max_length = 2 (subarray: [4, 7])

Final max_length = 2


