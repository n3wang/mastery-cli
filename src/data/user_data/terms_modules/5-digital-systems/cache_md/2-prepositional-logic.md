


#### Negations


1. $\neg \forall x P(x, y) \equiv \exists x \neg P(x, y)$
(It becomes "there exists" and negates the statement)

2. $\neg \exists x P(x) \equiv \forall x \neg P(x)$
3. $\exists!x P(x)$ means "there exists a unique $x$ such that $P(x)$ holds".


#### Equivalences
1. $\forall x[P(x) \wedge Q(x)] \equiv(\forall x P(x)) \wedge(\forall x Q(x))$ (Distribution of $\forall$ over $\wedge$ )
2. $\exists x[P(x) \vee Q(x)] \equiv(\exists x P(x)) \vee(\exists x Q(x))$ (Distribution of $\exists$ over $\vee$ )
3. $\forall x[P(x) \vee Q(x)] \equiv(\forall x P(x)) \vee(\forall x Q(x)) \rightarrow$ False (Not always valid)


Order of quantifiers
1. $\forall x \forall y P(x, y) \equiv \forall y \forall x P(x, y)$ (Only changes the order of $\forall$ )
2. $\exists x \exists y P(x, y) \equiv \exists y \exists x P(x, y)$
3. $\forall x \exists y P(x, y) \not \equiv \exists y \forall x P(x, y)$

Example translation
"For every non-zero real number, there exists a multiplicative inverse."

$$
\forall x(x \neq 0 \rightarrow \exists y(x \cdot y=1))
$$





---
#### Negations Problems
Given the following 
1. $\neg \forall x P(x, y) \equiv \exists x \neg P(x, y)$
2. $\neg \exists x P(x) \equiv \forall x \neg P(x)$
3. $\exists!x P(x)$ 
:p translate the equations above into human words of what they mean
?x
4. If not all x accomplish function then exists one x where not returns functions
5. If not exists one that accomplishes P(x) then all x doesnt accomplish F(x)
6. Means there is a unique x such that p(x) holds



#### Equivalences Problems

1. $\forall x[P(x) \wedge Q(x)] \equiv(\forall x P(x)) \wedge(\forall x Q(x))$ (Distribution of $\forall$ over $\wedge$ )
2. $\exists x[P(x) \vee Q(x)] \equiv(\exists x P(x)) \vee(\exists x Q(x))$ (Distribution of $\exists$ over $\vee$ )
3. $\forall x[P(x) \vee Q(x)] \equiv(\forall x P(x)) \vee(\forall x Q(x)) \rightarrow$ False (Not always valid)
:p given the equivalences above explain in human terms what they mean
?x
- **$\forall x [P(x) \wedge Q(x)] \equiv (\forall x P(x)) \wedge (\forall x Q(x))$**  
    → If **everything** has both property P and property Q, then everything has property P **and** everything has property Q separately.
- **$\exists x [P(x) \vee Q(x)] \equiv (\exists x P(x)) \vee (\exists x Q(x))$**  
    → If there is **something** that has property P or property Q, then either there is something with property P, or there is something with property Q (or both).
- **$\forall x [P(x) \vee Q(x)] \equiv (\forall x P(x)) \vee (\forall x Q(x))$ → False**  
    → Just because **everything** has property P or property Q doesn’t mean that **all** have P or **all** have Q — they could be mixed.

#### Order of quantifiers
1. $\forall x \forall y P(x, y) \equiv \forall y \forall x P(x, y)$ (Only changes the order of $\forall$ )
2. $\exists x \exists y P(x, y) \equiv \exists y \exists x P(x, y)$
3. $\forall x \exists y P(x, y) \not \equiv \exists y \forall x P(x, y)$
?x
Order of Quantifiers – Human Meaning
- $\forall x \forall y P(x, y) \equiv \forall y \forall x P(x, y)$
	- → If something is true for all x and all y, the order doesn’t matter — “for every x and every y” is the same as “for every y and every x.”
- $\exists x \exists y P(x, y) \equiv \exists y \exists x P(x, y)$
	- → If there exists some x and some y that make the statement true, it doesn’t matter which one you mention first.
- $\forall x \exists y P(x, y) \not\equiv \exists y \forall x P(x, y)$
	- → Saying “for every x, there is a y” is not the same as “there is one y that works for every x.” The first allows a different y for each x; the second demands the same y for all x.


$$
\forall x(x \neq 0 \rightarrow \exists y(x \cdot y=1))
$$
:p Translate in human terms
?x
Example translation
"For every non-zero real number, there exists a multiplicative inverse."


$$
\neg[\forall x(P(x) \rightarrow Q(x))] \equiv \exists x[P(x) \wedge \neg Q(x)]
$$
(using laws M1 and De Morgan's distribution)

Functions and Propositions
- A proposition involving one variable: $P(x)$
- Example: $P(x)$ : " $x$ divides 5 "
- Domain: possible values of $x$
- Truth set: $\{x \in \mathbb{Z} \mid P(x)$ is true $\}=\{ \pm 1, \pm 5\}$

Quantifiers
- Universal: $\forall x P(x)$ - "For all $x, P(x)$ "
- Existential: $\exists x P(x)-$ "There exists $x$ such that $P(x)$ "

Example:
Domain $=\{1,2,3,4,5\}$
$P(x)$ : " $x$ is in the Fibonacci sequence"
Question: Is $\forall x P(x)$ true?

Here’s the plain-language breakdown like in your other examples:

---

#### **Negation of a universal conditional**
$\neg[\forall x(P(x) \rightarrow Q(x))] \equiv \exists x[P(x) \wedge \neg Q(x)]$
:p **Meaning in words:**  
?x
If it is **not true** that “for every x, P(x) implies Q(x),” then there must be **at least one x** for which P(x) is true **and** Q(x) is false.  
_(One counterexample breaks a “for all” statement.)_

---

#### **Functions and Propositions**

- **Proposition involving one variable** $P(x)$: A statement about x that can be true or false.  
    Example: $P(x)$ = “x divides 5”
- **Domain**: All possible values of x you consider.
- **Truth set**: All domain values where $P(x)$ is true.  
    For the example,
    
    {x∈Z∣x divides 5}={±1,±5}\{x \in \mathbb{Z} \mid x \text{ divides } 5\} = \{\pm 1, \pm 5\}

---

### **Quantifiers**

- **Universal**: $\forall x P(x)$ → “For all x, P(x) is true.”
- **Existential**: $\exists x P(x)$ → “There is at least one x such that P(x) is true.”
    

---

### **Example with Domain**

- Domain: ${1,2,3,4,5}$    
- $P(x)$: “x is in the Fibonacci sequence”
- Fibonacci numbers in this domain: ${1, 2, 3, 5}$
- **Question:** Is $\forall x P(x)$ true?  
?x
    → No, because $4$ is **not** in the Fibonacci sequence.  
    So, $\neg [\forall x P(x)]$ is true, and in fact $\exists x \neg P(x)$ with $x=4$.
    

#### Logical Inference
- Example of tautology: A statement always true.
- Example of contradiction: Always false.
Exercise:
$$
(p \vee q) \wedge(\neg p \vee q) \equiv q
$$?x
Truth table confirms tautology.

#### Predicate Logic Proof Example
Given:
$$
[(\forall x P(x)) \equiv(\forall x Q(x))] \Rightarrow[(\forall x P(x)) \Leftrightarrow Q(x)]
$$
and similar transformations using quantifier rules.








