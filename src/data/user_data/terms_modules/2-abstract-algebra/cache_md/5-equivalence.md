#### Equivalence Relation

A relation $R$ is an equivalence relation if it is:
- Reflexive
- Symmetric
- Transitive

Equivalence Classes
- An equivalence class of $a$, denoted $[a]$, is the set of elements related to $a$ :

$$
[a]_R=\{b \in A \mid b R a\}
$$


Example (modulo 3):

$$
[2]_3=\{2,5,8,11, \ldots\}
$$

$\checkmark$ Correction: The logic is consistent. The example is correct because all numbers in $[2]_3$ are congruent to $2(\bmod 3)$.




Equivalence Relation

A relation $R$ is an equivalence relation if it satisfies:
- Reflexivity: $\forall a \in A, a R a$.
- Symmetry: $\forall a, b \in A, a R b \Longrightarrow b R a$.
- Transitivity: $\forall a, b, c \in A, a R b \wedge b R c \Longrightarrow a R c$.

Equivalence Classes
- The equivalence class of an element $a$, denoted $[a]$, is:

$$
[a]_R=\{b \in A \mid b R a\}
$$


Example (modulo 3):

$$
[2]_3=\{2,5,8,11, \ldots\}
$$


---
Partitions

We say that $\mathcal{C} \subseteq \mathcal{P}(A)$ is a partition of $A$ if the following conditions hold:
1. $\forall C \in \mathcal{C}, C \neq \varnothing$
(no subset in the partition is empty).
2. The elements of $\mathcal{C}$ are pairwise disjoint:

$$
C_i \cap C_j=\varnothing \quad \text { if } i \neq j
$$

3. $\mathcal{C}$ covers $A$ :

$$
\bigcup_{C \in \mathcal{C}} C=A
$$


Example:
If $A=\mathbb{Z}$ (the integers), we can partition into:

$$
\text { \{pares, impares\} (even, odd numbers) }
$$

or

$$
\text { \{positivos, negativos, }\{0\}\}
$$

$\checkmark$ The diagram below illustrates $A$ split into disjoint subsets covering the whole set.


---

**Relation between equivalence relations and partitions**
If $R$ is an equivalence relation on a set $A$, then the equivalence classes of $R$ form a partition of $A$.

That means:
- Every element of $A$ belongs to exactly one equivalence class.
- The set of equivalence classes covers $A$.
- Equivalence classes are pairwise disjoint.

---

**Properties of equivalence classes**
For $x, y \in A$, the following are equivalent:
1. $[x]=[y]$
2. $[x] \cap[y] \neq \varnothing$
3. $x R y$

This means:
- Two classes are equal if and only if they intersect.
- If $x$ and $y$ are related, they generate the same equivalence class.


---


**The quotient set**
The set of equivalence classes is denoted:

$$
A / R=\{[a] \mid a \in A\}
$$


This new set is called the quotient set (or quotient of $A$ by $R$ ).

---

**Example: Congruence modulo 2**
Take $R=$ "congruence modulo 2 " on $\mathbb{Z}$.
Then:

$$
\mathbb{Z} / \equiv_2=\{[0],[1]\}
$$

- Class $[0]$ :

$$
[0]=\{2 k \mid k \in \mathbb{Z}\} \quad \text { (even numbers) }
$$

- Class [1]:

$$
[1]=\{2 k+1 \mid k \in \mathbb{Z}\} \quad \text { (odd numbers) }
$$


So the integers are partitioned into two disjoint sets: evens and odds.

---

**Transcription (English)**
- $H$ is the set of men.
- $M$ is the set of women.
- $E \subseteq H \times M$ (Cartesian product).
- $E=\{(h, m) \in H \times M \mid h$ is the partner of $m\}$.
- Question: Is $E$ an equivalence relation?

**Correction / Why**
No. $E$ is a relation from $H$ to $M$, not on a single set $A$. An equivalence relation must be a subset of $A \times A$ and be reflexive, symmetric, and transitive on $A$. Here:
- Reflexivity fails: pairs ( $x, x$ ) aren't even in $H \times M$.
- Symmetry fails: from $(h, m) \in E$ symmetry would require $(m, h) \in E$, but $(m, h) \notin H \times M$.

---

Transcription (English)
- $H$ is the set of men.
- $M$ is the set of women.
- $E \subseteq H \times M$ (Cartesian product).
- $E=\{(h, m) \in H \times M \mid h$ is the partner of $m\}$.
- Question: Is $E$ an equivalence relation?

Correction / Why
No. $E$ is a relation from $H$ to $M$, not on a single set $A$. An equivalence relation must be a subset of $A \times A$ and be reflexive, symmetric, and transitive on $A$. Here:
- Reflexivity fails: pairs ( $x, x$ ) aren't even in $H \times M$.
- Symmetry fails: from $(h, m) \in E$ symmetry would require $(m, h) \in E$, but $(m, h) \notin H \times M$.

---

We are given the relation:

$$
R=\{(x, y) \in \mathbb{R} \times \mathbb{R} \mid x y \geq 0\}
$$


**Step 1: Interpret the relation**
- $x R y \Longleftrightarrow x y \geq 0$.
- This means $x$ and $y$ have the same sign (both non-negative or both non-positive).

**Step 2: Equivalence classes**
- If $x>0$, then its class is all positive reals: $(0, \infty)$.
- If $x<0$, then its class is all negative reals: $(-\infty, 0)$.
- If $x=0$, then its class is $\{0\}$.

So the classes are:

$$
(-\infty, 0), \quad\{0\}, \quad(0, \infty)
$$


**Step 3: Check properties**
- Reflexive: For all $x \in \mathbb{R}, x \cdot x=x^2 \geq 0 \Longrightarrow x R x . \checkmark$
- Symmetric: If $x y \geq 0$, then also $y x \geq 0 \Longrightarrow y R x . \sqrt{ }$
- Transitive:

If $x R y$ and $y R z$, then $x y \geq 0$ and $y z \geq 0$.
This implies $x$ and $y$ have the same sign, and $y$ and $z$ have the same sign $\Rightarrow x$ and $z$ have the same sign $\Longrightarrow x z \geq 0 \Longrightarrow x R z . \vee$


---

We are given:

$$
R=\left\{(x, y) \in \mathbb{R}^2 \mid x+y \geq 0\right\}
$$

and the question: Is $R$ an equivalence relation? If yes, find the classes.

Step 1: Reflexivity
For reflexivity we need $(x, x) \in R$ for all $x$.
That means:

$$
x+x=2 x \geq 0 \quad \forall x \in \mathbb{R} .
$$


But this is false for negative $x$.
$\approx$ Reflexivity fails.

Step 2: Symmetry
If $x+y \geq 0$, then $y+x \geq 0$.
Yes, this holds.
Symmetry is satisfied.

Step 3: Transitivity
Suppose $x+y \geq 0$ and $y+z \geq 0$.
This does not imply $x+z \geq 0$.
Counterexample:
- Take $x=-5, y=6, z=-5$.
- Then $x+y=1 \geq 0, y+z=1 \geq 0$.
- But $x+z=-10<0$.

Transitivity fails.

Since reflexivity fails and transitivity fails,

$$
R=\{(x, y) \mid x+y \geq 0\}
$$

is not an equivalence relation.

Therefore, equivalence classes do not exist.


---

1. Equality on $\mathbb{R}$

- Define $x R y \Longleftrightarrow x=y$.
- Reflexive: $x=x$.
- Symmetric: if $x=y$, then $y=x$.
- Transitive: if $x=y$ and $y=z$, then $x=z$.

Classes:

$$
[a]=\{a\} .
$$
Every class has just one element.

2. Congruence modulo $n$ (classic!)

On $\mathbb{Z}$ :

$$
x R y \Longleftrightarrow x-y \text { is divisible by } n .
$$

- Reflexive: $x-x=0$ divisible by $n$.
- Symmetric: if $x-y$ divisible by $n$, then $y-x$ is too.
- Transitive: if $x-y$ and $y-z$ divisible by $n$, then $x-z$ divisible by $n$.

Example $n=3$ :
- $[0]=\{\ldots,-6,-3,0,3,6, \ldots\}$
- $[1]=\{\ldots,-5,-2,1,4,7, \ldots\}$
- $[2]=\{\ldots,-4,-1,2,5,8, \ldots\}$

Integers are split into 3 groups.

3. Same parity (even/odd)

On $\mathbb{Z}$ :

$$
x R y \Longleftrightarrow x \text { and } y \text { are both even or both odd. }
$$

- Reflexive: every number has same parity as itself.
- Symmetric: if $x$ has same parity as $y$, then $y$ same as $x$.
- Transitive: if $x$ same parity as $y$, and $y$ same parity as $z$, then $x$ same parity as $z$.

Classes:
- $[0]=\{$ even integers $\}$.
- $[1]=\{$ odd integers $\}$.

Integers split into 2 groups.


4. Same absolute value

On $\mathbb{R}$ :

$$
x R y \Longleftrightarrow|x|=|y| .
$$

- Reflexive: $|x|=|x|$.
- Symmetric: if $|x|=|y|$, then $|y|=|x|$.
- Transitive: if $|x|=|y|$ and $|y|=|z|$, then $|x|=|z|$.

Classes:
- $[3]=\{3,-3\}$.
- $[0]=\{0\}$.
- $[5]=\{5,-5\}$, etc.

Real numbers split into pairs of opposites.


---
























