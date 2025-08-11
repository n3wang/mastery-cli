# Data Structures and Algorithms

Data structures and algorithms fundamentals for technical interviews and software development.

## Heap

Re explain one of the advantages of using Heaps

:p Re explain one of the advantages of using Heaps

??Heaps are a specialized tree-based data structure that are used for various purposes such as priority queues, sorting, graph algorithms, and memory management. Here are some advantages and disadvantages of using heaps:

Advantages:
Fast Insertion and Extraction: Heaps have a fast time complexity for insertion and extraction operations, making them suitable for use in situations where elements are frequently added or removed.
Efficient Priority Queue: Heaps can be used to implement priority queues, which are used in many algorithms to efficiently extract the element with the highest or lowest priority.
Sorting: Heapsort is a comparison-based sorting algorithm that has a time complexity of O(n log n) which is efficient for sorting large datasets.
Memory Management: Heaps are used in memory management to allocate memory dynamically to a program at runtime.

Disadvantages:
Slow Random Access: Heaps are not well suited for random access, as the time complexity for searching for a specific element is O(n)
Not Cache-Friendly: Heaps are not cache-friendly, as the elements are not stored contiguously in memory, which can lead to cache misses and slow down the performance of the application.
Complexity: Heaps can be complex to implement, especially when compared to simpler data structures such as arrays or linked lists.

In summary, heaps have advantages such as fast insertion and extraction, efficient priority queue, sorting, and memory management. However, they also have some disadvantages such as slow random access, not being cache-friendly and complexity to implement. It's worth noting that using Heaps is not always the best option, it depends on the problem and the use case, for instance, if you require random access or cache-friendliness, then you might want to consider other data structures like balanced trees.??

## Iteration Generalizations

How could you use iteration generalizations to solve your most current problem or in previous dsa/projects?

:p How could you use iteration generalizations to solve your most current problem or in previous dsa/projects?

??- If you ran an operation after certain separator, check if at the end of the loop you need to run the operation again because the sep is not htere??

**Example:** On calculator iteration, there was no + - in the end(likely) but you still had to add the number generated into the stack. As well as solving all the non-inside parenthesis operations

## Stack Problems Generalizations

Think about how you could use stack generalizations to solve your most current problem or in previous dsa/projects?

:p Think about how you could use stack generalizations to solve your most current problem or in previous dsa/projects?

??- Check if by reordering we can find a better solution (Reverse, Special?)
- Check what would happen to the logic if things are reordered
- Does having multiple stack help???

**Example:** On Calculator problem, having the reorderring of the stack made sense because you wouldnt have the issue with minus simbols, when collapsing the parenthesis
It was also important to consider the effects of multiple stacks.

## Intervals Problems Generalizations

Think about how you could use intervals generalizations to solve your most current problem or in previous dsa/projects?

:p Think about how you could use intervals generalizations to solve your most current problem or in previous dsa/projects?

??- Check if by sorting either end or start of the range can help
- If we iterate over the sorted intervals is there a rule we can squeeze to modify a counting value???

## Linked List Problems Generalizations

Think about how you could use linked list generalizations to solve your most current problem or in previous dsa/projects?

:p Think about how you could use linked list generalizations to solve your most current problem or in previous dsa/projects?

??- Check EDGE CASES - null input? Larger linkedList than the other? Carryover?
- Reversing just mean, flipping the pointers direction
- Consider having two points, and the distance between them
- Consider having a double linked list so that you can retrieve the first and last as well as adding them in both ways (Combines well with hashmap)??

## Binary Problems Generalizations

Think about how you could use binary generalizations to solve your most current problem or in previous dsa/projects?

:p Think about how you could use binary generalizations to solve your most current problem or in previous dsa/projects?

??- There is heavy logic in checking if both are null or some is Null when checking similitudes
- When building up a binary tree, consider having left right points and an hashmap if we using the windows.??

## Graph Problems Generalizations

Think about how you could use graph generalizations to solve your most current problem or in previous dsa/projects?

:p Think about how you could use graph generalizations to solve your most current problem or in previous dsa/projects?

??- Recoloring the graph for previus steps, and remembering inside of them by coloring??

## Graph Theory

What are the advantages of using Graph Theory?

:p What are the advantages of using Graph Theory?

??- If the graph to be done on is a array, it might make sense to have another arrays to keep track of other values, such as distance, neighbors, etc, and using index as identifiers.
- If the permutation of a node is limited by its contstraints, e.g. a gene with 8 characters or combinations rom a specific set, then we can craft it's neighbors.
- If the nodes have dependencies, then making a dependicies list, and starting form the ones with non, is a smart strategy.
- Usueful variables are: to keep track |??