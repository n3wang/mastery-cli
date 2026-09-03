# Data Structures

#### Array
A contiguous block of memory holding elements of the same type, addressed by index.
Because the address of element `i` is computable, access is constant time.
?p: What is the time complexity of indexing into an array, and why?
?x
O(1). The element's address is `base + i * elementSize`, so the machine computes
it directly rather than searching.

#### Linked List
A chain of nodes, each holding a value and a reference to the next node.
Nodes need not be adjacent in memory.
?p: Why is indexing a linked list O(n) when indexing an array is O(1)?
?x
There is no address arithmetic to exploit — reaching element `i` means following
`i` references from the head.

#### Hash Map
Stores key-value pairs in buckets chosen by hashing the key.
?p: What turns an average-case O(1) hash map lookup into O(n)?
??x
Collisions. If every key hashes to the same bucket, the map degenerates into a
single list and lookup walks all n entries.

Real implementations mitigate this by resizing when the load factor rises, and
by using a balanced tree instead of a list for oversized buckets.
x??

#### Stack
Last in, first out. Push adds to the top, pop removes from the top.
?p: Name one place a stack appears in a running program whether you asked for it or not.
?x
The call stack — each function call pushes a frame holding its locals and return
address, and returning pops it.

#### Queue
First in, first out. Enqueue adds at the back, dequeue removes from the front.
?p: Which traversal uses a queue, and which uses a stack?
?x
Breadth-first traversal uses a queue; depth-first uses a stack (often the call
stack, via recursion).

#### Binary Search Tree
Every node's left subtree holds smaller keys and its right subtree larger ones.
?p: What property must hold for a binary search tree to give O(log n) lookup?
?x
It has to stay balanced. An unbalanced tree — for example one built by inserting
already-sorted keys — degrades into a linked list and lookup becomes O(n).
