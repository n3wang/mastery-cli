# Complexity

#### Big-O Notation
Describes how a cost grows as the input grows, ignoring constants and lower-order terms.
?p: What does O(n) actually promise, and what does it deliberately ignore?
?x
It promises the cost grows at most proportionally to n for large n. It ignores
constant factors and setup cost, so an O(n) routine can lose to an O(n log n)
one on small inputs.

#### Amortised Analysis
Averages the cost of an operation over a sequence rather than looking at the worst single call.
?p: A dynamic array doubles its capacity when full. Why is append still O(1) amortised?
??x
Doubling is O(n), but it happens only after n cheap appends. Spreading that cost
across the appends that caused it gives a constant average.

Concretely: growing to size n costs 1 + 2 + 4 + ... + n < 2n copies total, so
each of the n appends carries less than 2 copies of amortised cost.
x??

#### Space Complexity
The extra memory an algorithm needs beyond its input.
?p: An in-place sort and a merge sort both sort n items. How do they differ in space?
?x
An in-place sort uses O(1) or O(log n) extra space. Merge sort allocates O(n)
scratch space to merge into.

#### Recursion vs Iteration
Two ways to express repetition, with different costs.
?p: What hidden cost does a recursive solution carry that its iterative twin does not?
?x
Stack frames. Each recursive call consumes stack space, so a deep recursion can
overflow where a loop would run fine.
