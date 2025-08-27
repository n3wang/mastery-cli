
Problem 1 - Committees
A group of 10 people is forming a committee of 4 people.
Alicia, Leandro
:p Question: How many different committees are there?
??x
Strategy:
$$
\binom{10}{4}
$$This represents all possible combinations.
$$
\binom{8}{2}
$$
This represents the committees that include Alicia and Leandro (choose 2 more from the remaining 8 people).
x??


Problem 2 - Word permutations
Word: MISSISSIPPI
:p Question: How many permutations are there?
??x
Formula:

$$
\frac{n!}{n_{1}!n_{2}!n_{3}!\ldots n_{k}!}
$$


In this case:
- $n=11$ (total letters)
- $n_1=4$ (I's)
- $n_2=4$ (S's)
- $n_3=2$ (P's)

Calculation:

$$
\frac{11!}{4!\cdot 4!\cdot 2!}
$$


x??

#### Permutations:
A permutation is an ordered sequence of the elements of a set.
$$
A=\{1,2,3\}
$$Permutations of 2 elements:

$$
(1,2),(2,1),(1,3),(3,1)
$$
Of 3 elements:

$$
(1,2,3),(1,3,2),(3,1,2)
$$


Of 1 element:

$$
(1),(2),(3)
$$


#### Factorial

For $n \in \mathbb{N}$, defined as:

$$
n!=n(n-1)(n-2) \ldots 2 \cdot 1
$$


Example: $4!=4 \cdot 3 \cdot 2 \cdot 1=24$

Convention: $0!=1$

Sequence:

$$
\begin{array}{lllll}
1 & 2 & 3 & \ldots & n
\end{array}
$$


#### Counting Techniques

Additive Principle:

If for a task there are $m$ ways and also $n$ ways, the total number of ways is:

$$
m+n
$$

#### Multiplication Principle:

If there are $n$ ways to start a task, and for each of these there are $m$ ways to finish, the total number of ways is:

$$
n \cdot m
$$



#### Permutations
The number of ways to arrange $k$ distinct elements from a total of $n$ is:
?x
$$
P(n, k)=\frac{n!}{(n-k)!}
$$


#### Combinations
A combination is a selection of elements from a set where order does not matter.
Example:
$$
\{1,2\}=\{2,1\} \quad / / \text { same combination }
$$The number of ways to choose $k$ elements from $n$ is:
?x
$$
C(n, k)=\binom{n}{k}=\frac{n!}{(n-k)!k!}
$$
Relation between permutations and combinations:
$$
k!\cdot C(n, k)=P(n, k)
$$


#### Permutations with Repetition
If we have $n$ elements where:
- $n_1$ are of type 1
- $n_2$ are of type 2
- ...
- $n_k$ are of type $k$
The number of distinct permutations is:
?x
$$
\frac{n!}{n_{1}!n_{2}!\ldots n_{k}!}
$$


#### Example 1:
How many 5-card hands can be formed from a 52-card deck?
(Order does not matter)
?x
$$
\binom{52}{5}=\frac{52!}{(52-5)!\cdot 5!}
$$

#### Example 2:
How many straights ( 5 consecutive cards of the same suit) are there in a 52 -card deck?
?x
There are 10 possible sequences of consecutive ranks:
$$
(A, 2,3,4,5),(2,3,4,5,6), \ldots,(10, J, Q, K, A)
$$
Each sequence can be in any of the 4 suits:
$$
10 \times 4
$$


#### Example 3:
How many full houses are there, considering suits do not matter?
(Statement given, but calculation not shown here.)







