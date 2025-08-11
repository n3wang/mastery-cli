# Python

Python programming language fundamentals and data structures.

## set | add, remove, check if contains

The time complexity of set is O(1) for add, remove and check if contains.
The speciality of set is that it does not allow duplicates. or more like it will not add duplicates.

:p How to create a set of integers? and add, remove, check if contains?

**Example:** ??set = set()
set.add(1)
set.remove(1)
1 in set??

## List | append, pop, check if contains

The time complexity of a list is O(1) for append, pop, and O(n) for checking if it contains an element (in the worst case, where n is the number of elements).
Lists are ordered and allow duplicates.

:p How to create a list of integers? and append, pop, check if contains?

**Example:** ??my_list = []
my_list.append(1)
my_list.pop()
1 in my_list??

## Dictionary | add, remove, check if key exists

The time complexity of a dictionary is O(1) for adding, removing, and checking if a key exists.
Dictionaries store key-value pairs, are unordered, and keys are unique.

:p How to create a dictionary of names and ages? and add, remove, check if a key exists?

**Example:** ??my_dict = {}
my_dict['Alice'] = 30
del my_dict['Alice']
'Alice' in my_dict??

## Tuple | create, access elements

Tuples are immutable, ordered collections of elements. Once created, you cannot change their content. They are typically used to group related data.
The time complexity for accessing elements is O(1).

:p How to create a tuple of integers and access its elements?

**Example:** ??my_tuple = (1, 2, 3)
element = my_tuple[0]??

## Counter | count elements in iterable

The `Counter` class from the `collections` module is used to count the occurrences of elements in an iterable, such as a list, tuple, or string.
It returns a dictionary-like object with elements as keys and their counts as values. Accessing the count of an element is done with O(1) time complexity.

:p How to count the occurrences of elements in a list?

**Example:** ??from collections import Counter
my_list = [1, 2, 2, 3, 3, 3]
counter = Counter(my_list)
count = counter[2]??

## deque | double-ended queue

A `deque` (double-ended queue) is a versatile data structure that allows efficient append and pop operations from both ends. It is useful for implementing queues and stacks.
Append and pop operations from either end have O(1) time complexity.

:p How to create a double-ended queue and perform operations?

**Example:** ??from collections import deque
my_deque = deque([1, 2, 3])
my_deque.append(4)
my_deque.appendleft(0)
my_deque.pop()
my_deque.popleft()??

## defaultdict | dictionary with default value

A `defaultdict` is a subclass of the standard dictionary (`dict`) that provides default values for missing keys. In the example, it initializes missing keys with an integer value of 0.
Accessing and modifying keys have O(1) time complexity.

:p How to create a dictionary with default values for missing keys?

**Example:** ??from collections import defaultdict
my_dict = defaultdict(int)
my_dict['Alice'] += 1??

## OrderedDict | ordered dictionary

An `OrderedDict` is a dictionary subclass in Python's `collections` module that remembers the order in which items were inserted. This order is maintained when iterating or performing operations on the dictionary.
Accessing and iterating over items in an `OrderedDict` is done in the order of insertion, making it useful when order matters. Common dictionary operations like key access, insertion, and deletion have O(1) time complexity.

:p How to create an `OrderedDict` and perform ordered operations?

**Example:** ??from collections import OrderedDict
my_ordered_dict = OrderedDict()
my_ordered_dict['b'] = 2
my_ordered_dict['a'] = 1
keys_in_order = list(my_ordered_dict.keys())??

## Heap (heapq module)

A heap is a binary tree-based data structure often used to implement priority queues.
The `heapq` module provides functions to create and manipulate heaps in Python. Operations like insertion 
and removal of the smallest element have O(log n) time complexity.

:p Create a heap of 3,1, 2 and pop the smallest element

**Example:** ??import heapq
heap = [3, 1, 2]
heapq.heapify(heap)
min_element = heapq.heappop(heap)??

## Heap Q In Practice

Complete Import

class Solution:
    def nthUglyNumber(self, n: int) -> int:
        heap = [1]
        visited = {1}

        for t in range(n):
            ## [Get the smallest Pop]
            for i in [2, 3, 5]:
                computed = smallestuggly * i
                if computed not in visited:
                    visited.add(computed)
                    ## [Psuh into the heap the smallest]
        return smallestuggly

:p Use heapq in practice for capturing the next Smallest uggly number to compute the next ugly numbers

**Example:** ??import heapq

class Solution:
    def nthUglyNumber(self, n: int) -> int:
        heap = [1]
        visited = {1}

        for t in range(n):
            smallestuggly= heapq.heappop(heap)
            for i in [2, 3, 5]:
                computed = smallestuggly * i
                if computed not in visited:
                    visited.add(computed)
                    heapq.heappush(heap, computed)
        return smallestuggly??

## Linked List

A linked list is a linear data structure made up of nodes, where each node stores a value and a reference to the next node. Linked lists are used for dynamic data storage and often implemented using classes in Python.

**Example:** ??class Node:
def __init__(self, data):
  self.data = data
  self.next = None

# Create and manipulate linked lists with Node instances.??

## Queue (list or deque-based)

A queue is a linear data structure that follows the First-In-First-Out (FIFO) principle. Like stacks, queues can be implemented using lists or the `deque` data structure. Queues are used for tasks like managing tasks in a print queue.

:p How to create a queue using a list or a deque? (Python)

**Example:** ??from collections import deque
queue = deque()
queue.append(1)
front_element = queue.popleft()??

## Trie

A trie is a tree-like data structure used for storing a dynamic set of strings. It's particularly useful for string manipulation and searching, such as autocomplete and spell-checking.

:p How to create a trie using Python?

**Example:** ??class TrieNode:
def __init__(self):
  self.children = {}
  self.is_end_of_word = False

# Create and manipulate tries with TrieNode instances.??

## Range basic

:p Create a range from 1 to 10

**Example:** ??my_range = range(1, 11)??

## Range | Iterate on three

The range function can be used to iterate on a range of numbers. The first argument is the start, the second argument is the end and the third argument is the step.

:p Print left right left being always 3 less than right starting from 0 to 10

**Example:** ??left = 0
for right in range(3, 10, 3):
    print(left, right)
    left = right??

## Create 2D list

:p Create a 2D list of 3 rows and 4 columns where elements are not linked

**Example:** ??[[0] * len(matrix[0]) for x in range(height)]??

## Math FLoor and Ceil

:p How to get the floor and ceil of a number?

**Example:** ??import math
math.floor(1.5)
math.ceil(1.5)??

## Floor vs Truncate

:p What is the difference between floor e.g. (a//b) and truncate? int(a/b)

**Example:** ??floor(-1.5) = -2
truncate(-1.5) = -1??

## Infinite

:p How to create an infinite number (very large number)?

**Example:** ??float('inf')??

## Non local variable

For example you want to use a variable thats on the parent function

:p How to create a non local variable?

**Example:** ??nonlocal a??

## Using Bit mask to figure out if it was either even or only one repetition

```py
class Solution:
    def pseudoPalindromicPaths(self, root: Optional[TreeNode]) -> int:
        
        def dfs(node, pathmask=0):
            # Base case
            count = 0
            ### TODO 
            if not node.left and not node.right:
                if ### TODO:
                    return 1
                return 0
                        
            if node.left:
                count += dfs(node.left, pathmask)
            if node.right:
                count += dfs(node.right, pathmask)
            return count
        
        if not root:
            return 0
        return dfs(root)
```

:p Knowing that python supports up to 32 bit integers complete teh following, using bitmask strategy so that in the base case returns 1 if numbers on the sequence were repeated odd times or is there is only one digit repeated once

**Example:** ??pathmask ^= (1 << node.val)
pathmask == 0 or (pathmask & (pathmask - 1)) == 0
Example run 
1000 & 0111 = 0000
1100 & 1011 = 1000??

## Character to int and int to char

:p How to convert in python int to char and char to int?

**Example:** ??ord('a')
chr(97)??

## heapq

:p Use heapq to create a list, add and pop the smallest element

**Example:** ??import heapq
heap = [3, 1, 2]
heapq.heapify(heap)
heapq.heappush(heap, 4)
min_element = heapq.heappop(heap)??