# High-Quality Flashcards: 1B001---Proofs---Jay-Cumming_processed (Part 10)


**Starting Chapter:** Bonus Examples

---


#### Proof by Contradiction - Validity and Power
Proofs by contradiction are a valid method of proving mathematical statements. They help us understand why something is true, not just that it is. However, they can sometimes hinder understanding because we focus on what isn't rather than what is.

:p Why do some mathematicians consider proof by contradiction to be powerful?
??x
Proof by contradiction is powerful because it allows you to prove the truth of a statement by assuming its negation and showing that this assumption leads to a logical contradiction. This method can simplify complex problems by focusing on the impossible rather than the possible.

```python
def example_proof_by_contradiction():
    # Assume N > 1, and we have an infinite loop
    def loop(n):
        while n > 1:
            if n % 2 == 0:  # If n is even
                n = (n + 2)  # Increment by 2
            else:           # If n is odd
                n = (n - 2)  # Decrement by 2
        return "Program halts"
    print(loop(6))  # This should lead to an infinite loop, but the function never returns.
```
x??

---

#### Proofs by Contradiction - Understanding Through Darkness
Clarke's second law suggests that understanding the limits of possibility involves exploring the impossible. By examining contradictions, we can gain deeper insights into why something is true.

:p Why does Arthur C. Clarke advocate for exploring the "impossible" to understand truths and falsehoods?
??x
Arthur C. Clarke advocates for exploring the "impossible" because it helps us push the boundaries of our understanding and distinguish between what is possible and impossible. This exploration can provide insights that are not available through conventional means.

```python
def explore_impossibility(n):
    # Simulate a scenario where we explore an infinite loop
    while True:  # This is a representation of an infinite loop
        if n % 2 == 0:
            n = (n + 2)  # Increment by 2
        else:
            n = (n - 2)  # Decrement by 2
```
x??

---

#### The Halting Problem in Computer Science
The halting problem is a fundamental concept in computer science where determining whether a program will eventually halt or run forever from a given input is undecidable. This problem highlights the limitations of algorithms and computational theory.

:p What does the halting problem explore?
??x
The halting problem explores whether there exists an algorithm that can determine, for any arbitrary program and input, whether the program will eventually halt or continue to run indefinitely. This problem demonstrates a fundamental limit in what can be computed by algorithms.

```python
def simulate_halt(n):
    while n > 1:
        if n % 2 == 0:  # If n is even
            n += 2       # Increment by 2
        else:           # If n is odd
            n -= 2       # Decrement by 2
    return "Program halts"
print(simulate_halt(6))  # This should lead to an infinite loop, but the function may terminate.
```
x??

---

#### Infinite Loops and Halting Problem
Infinite loops can be a significant issue in programming, especially in complex programs. The halting problem helps identify potential bugs where the program might enter into an endless cycle.

:p How does the halting problem relate to infinite loops?
??x
The halting problem is closely related to identifying infinite loops because it addresses the challenge of determining whether any given program will halt or run indefinitely. In practice, this means that for complex programs, we may need methods other than formal proof to detect and prevent infinite loops.

```python
def find_infinite_loop(n):
    # Simulate a potential infinite loop scenario
    while True:
        if n % 2 == 0:  # If n is even
            n += 2       # Increment by 2 (infinite loop)
        else:           # If n is odd
            n -= 1      # Decrement by 1 (terminates eventually)
```
x??

---

#### Power of the Dark Side - Proof by Contradiction
Darth Vader’s quote can be interpreted as a reminder that sometimes exploring seemingly impossible or contradictory ideas can lead to powerful insights.

:p How does Darth Vader's quote relate to proof by contradiction?
??x
Darth Vader's quote relates to proof by contradiction because it suggests that just like the dark side, which is powerful but dangerous, contradictions are powerful tools in mathematics and logic. They allow us to uncover truths by exploring their negations, even if such exploration leads to temporary confusion or discomfort.

```python
def explore_contradiction(n):
    # Simulate a scenario where we explore a contradiction
    while n > 1:
        if n % 2 == 0:  # If n is even
            n = (n + 2)  # Increment by 2, leading to an infinite loop
        else:           # If n is odd
            n = (n - 2)  # Decrement by 2, potentially leading to a contradiction
    return "Program halts"
print(explore_contradiction(6))  # This should lead to an infinite loop, but the function may terminate.
```
x??

---


#### The Halting Problem

Background context: The halting problem is a decision problem in computability theory. It asks whether, given a computer program and its input, it's possible to determine whether the program will eventually halt or run forever. Alan Turing proved that there does not exist a general algorithm that can solve this problem for all possible program-input pairs.

:p What is the halting problem about?
??x
The halting problem is undecidable; meaning no single program can always correctly predict if any given program with an input will halt or run indefinitely. This was proven by Alan Turing through a proof by contradiction, which involves constructing a specific program that leads to a logical inconsistency.
```java
// Pseudocode for the Halting Program T
public class HaltingProblem {
    public static void main(String[] args) {
        // Assume H is a halting detector function
        boolean halt = H("HaltingProblem.main", args);
        if (halt) { // If H says it will halt
            while (true) {} // Start an infinite loop instead
        } else {      // Otherwise, if H says it won't halt
            System.exit(0); // The program should actually halt here
        }
    }
}
```
x??

---

#### Contradiction in Halting Problem Proof

Background context: Turing's proof involves assuming the existence of a halting detector function `H` and then constructing a counterexample that leads to a logical contradiction, thereby proving the non-existence of such a function.

:p How does Turing prove the impossibility of a halting detector?
??x
Turing proves the impossibility by assuming there exists a program `H` that can determine whether any given program with an input will halt. He then creates another program `T` which uses `H` to run counter to itself, leading to a contradiction in both cases: if `T(T)` halts, it should run forever, and if `T(T)` runs forever, it should halt.
```java
// Pseudocode for the Halting Program T
public class HaltingProblem {
    public static void main(String[] args) {
        boolean halt = H("HaltingProblem.main", args); // Assume this returns true or false
        if (halt) { // If H says it will halt
            while (true) {} // Start an infinite loop instead
        } else {      // Otherwise, if H says it won't halt
            System.exit(0); // The program should actually halt here
        }
    }
}
```
x??

---

#### Infinite Loops and Halting

Background context: Turing's proof revolves around the idea that any attempt to create a halting detector `H` for all programs will lead to an infinite loop in some cases, specifically when the input program is exactly the same as the detector itself.

:p How does the constructed program `T` work?
??x
The constructed program `T` takes another program `x` and its input. It uses a hypothetical halting detector `H(x)` to decide whether `x` will halt:
- If `H(x)` says `x` will halt, then `T` enters an infinite loop.
- If `H(x)` says `x` won't halt, then `T` halts.

Since `T` is a program, we can pass `T` itself as input. The result leads to a contradiction:
1. If `T(T)` halts, it should enter an infinite loop.
2. If `T(T)` enters an infinite loop, it should halt.

This logical inconsistency proves the non-existence of a universal halting detector.
```java
// Pseudocode for the Halting Program T with input x
public class HaltingProblem {
    public static void main(String[] args) {
        boolean result = H("HaltingProblem.main", args); // Assume this returns true or false
        if (result) { // If H says it will halt
            while (true) {} // Start an infinite loop instead
        } else {      // Otherwise, if H says it won't halt
            System.exit(0); // The program should actually halt here
        }
    }
}
```
x??

---

#### Implications of the Halting Problem

Background context: The halting problem has profound implications for computer science and programming. It means that certain problems are inherently undecidable by any algorithm, setting limits on what can be automated.

:p What are the broader implications of the halting problem?
??x
The broader implications of the halting problem include:
- Certain computational problems cannot be solved by a general algorithm.
- Programmers must be aware of potential infinite loops and other unresolvable issues in their code.
- The proof highlights the limitations of computation, indicating that some questions about program behavior are inherently undecidable.

This theorem has significant practical implications for debugging, testing, and designing algorithms.
```java
// Example of a real-world problem where halting can be an issue
public class DebuggingExample {
    public static void main(String[] args) {
        // Simulate a potential infinite loop in a function
        while (true) { System.out.println("This is an infinite loop!"); }
    }
}
```
x??


#### Proof by Minimal Counterexample
Background context explaining the concept. The proof by minimal counterexample is a variant of reductio ad absurdum where, assuming the negation of a theorem for every natural number, one assumes there exists at least one counterexample and then considers the smallest such counterexample to derive a contradiction.
:p What is the main idea behind proof by minimal counterexample?
??x
The main idea is to assume that not all numbers satisfy the theorem, which means there must exist a smallest number (counterexample) that does not. By analyzing this smallest counterexample, one can often find a contradiction, thus proving the original statement.
x??

---
#### Fundamental Theorem of Arithmetic - Proof by Minimal Counterexample
The fundamental theorem of arithmetic states that every integer $n \geq 2$ is either prime or a product of primes. This proof uses a minimal counterexample to show this assertion.
:p What is the theorem we are proving using minimal counterexample?
??x
We are proving the Fundamental Theorem of Arithmetic, which asserts that every integer $n \geq 2$ is either prime or a product of primes.
x??

---
#### Proof Steps for Fundamental Theorem of Arithmetic - Minimal Counterexample
In the proof, we first assume there exists a minimal counterexample $N $, an integer at least 2 which is neither prime nor a product of primes. Then, since $ N $ is composite, it can be expressed as $ ab $. Given that$ a $ and $ b $ are smaller than $ N$, they must satisfy the theorem by minimality.
:p What does the proof assume about the minimal counterexample $N$?
??x
The proof assumes that there exists a minimal counterexample $N \geq 2 $ which is neither prime nor a product of primes. This means both$a $ and$ b $, where $ N = ab$, must satisfy the theorem because they are smaller than $ N$.
x??

---
#### Contradiction in Fundamental Theorem Proof
Given that $a $ and$b $ are composite, their factors also factorize$ N $. This leads to a contradiction since $ N$ was assumed to be a counterexample.
:p What is the contradiction derived from assuming $N$ as a minimal counterexample?
??x
The contradiction arises because if both $a $ and$b $ are composite, then they can each be factored further into primes. This means their product$ N = ab $ would also be a product of primes, contradicting the assumption that $N$ is not a product of primes.
x??

---
#### Well-Ordering Principle
The well-ordering principle states that every non-empty set of natural numbers must contain a smallest element. This principle is used to justify the existence of minimal counterexamples in proofs by contradiction.
:p What does the well-ordering principle state?
??x
The well-ordering principle states that any non-empty set of natural numbers contains a smallest element.
x??

---
#### Reductio Ad Absurdum in Proof
Reductio ad absurdum, or proof by contradiction, is used here to assume the negation of the theorem and derive a logical inconsistency. In this case, assuming there exists a minimal counterexample leads to a contradiction when analyzing its factors.
:p What technique does the proof use to prove the Fundamental Theorem of Arithmetic?
??x
The proof uses reductio ad absurdum (proof by contradiction) by assuming that not every integer $n \geq 2$ is either prime or a product of primes, leading to a minimal counterexample. This assumption ultimately results in a contradiction.
x??

---
#### Minimal Counterexample Logic
In the proof, if we assume there exists a smallest counterexample $N $, then both factors $ a $ and $ b $ (where $ N = ab $) must be smaller than$ N$. Since they are smaller, by minimality, they must satisfy the theorem. This leads to a contradiction.
:p How do you handle the minimal counterexample in this proof?
??x
You handle the minimal counterexample by assuming it exists and then showing that its factors (which are smaller) also must satisfy the theorem. However, their product $N$ cannot be a counterexample if both factors are prime or products of primes, leading to a contradiction.
x??

---


#### Existence of Division Algorithm Proof
Background context: The proof for the division algorithm, as mentioned, asserts that for any integers $a $ and$m > 0 $, there exist unique integers$ q $and$ r $such that$ a = mq + r $where$0 \leq r < m$. This is a fundamental concept in number theory.

:p What does the proof aim to demonstrate about the existence of integers $q $ and$r$?
??x
The proof aims to show that for any integer $a $ and positive integer$m $, there exist integers$ q $and$ r $such that$ a = mq + r $with the constraint$0 \leq r < m $. This is demonstrated by considering different cases for$ a$.

Include relevant code or pseudocode:
```java
public boolean checkDivisionAlgorithm(int a, int m) {
    if (m <= 0) {
        throw new IllegalArgumentException("m must be greater than 0");
    }
    // Implementation of the division algorithm proof logic goes here.
}
```
x??

---

#### Uniqueness of Division Algorithm Proof
Background context: The uniqueness part of the proof involves showing that there is only one pair $(q, r)$ for a given $a$ and $m$. This is crucial because it ensures the theorem's assertion about the integers $ q$and $ r$ is unique.

:p How does the proof ensure the uniqueness of $q $ and$r$?
??x
The proof ensures the uniqueness of $q $ and$r $ by assuming that there are two different representations for$ a $:$ a = mq + r $and$ a = m q_0 + r_0 $. By manipulating these equations, it shows that this assumption leads to a contradiction, thus proving that only one pair$(q, r)$ can satisfy the condition.

Include relevant code or pseudocode:
```java
public boolean checkUniqueness(int a, int m, int q1, int r1, int q2, int r2) {
    if (m <= 0 || a < 0) {
        throw new IllegalArgumentException("Invalid input for division algorithm");
    }
    // Check the uniqueness of q and r
    return q1 == q2 && r1 == r2;
}
```
x??

---

#### Proof by Minimal Counterexample
Background context: The proof employs a method called proof by minimal counterexample, where it assumes there is a smallest counterexample to disprove. This approach leverages the well-ordering principle of natural numbers.

:p How does the proof use the concept of a minimal counterexample?
??x
The proof uses the concept of a minimal counterexample to show that if any positive integer $a $ can be expressed as$a = mq + r $ with$0 \leq r < m $, then no smaller positive integer could fail this condition. By contradiction, it demonstrates that assuming there is a smallest such $ a$ leads to a logical inconsistency.

Include relevant code or pseudocode:
```java
public boolean minimalCounterexampleProof(int a, int m) {
    if (m <= 0 || a < 0) {
        throw new IllegalArgumentException("Invalid input for division algorithm");
    }
    // Implement the logic of proof by minimal counterexample here.
}
```
x??

---

#### Case Analysis in Proof
Background context: The proof analyzes different cases to handle all possible values of $a $ relative to$m $. This ensures that every scenario is considered, from $ a < m $to$ a > m $, and$ a = m$.

:p What are the main cases considered in the proof?
??x
The main cases considered in the proof are:
1. $a < m $2.$ a = m $3.$ a > m $Each case is handled separately to ensure that for any integer$ a $and positive integer$ m $, there exists a pair$(q, r)$ such that $a = mq + r$ with $0 \leq r < m$.

Include relevant code or pseudocode:
```java
public void handleCases(int a, int m) {
    if (m <= 0 || a < 0) {
        throw new IllegalArgumentException("Invalid input for division algorithm");
    }
    // Handle the different cases based on a and m.
}
```
x??

---

#### Example of Division Algorithm Application
Background context: The text provides an example to illustrate how the theorem works. It shows that if $a = 13 $ and$m = 3 $, then both$13 = 4 \times 3 + 1 $ and$-13 = -5 \times 3 + 2$.

:p How does the proof handle negative integers in the context of the division algorithm?
??x
The proof handles negative integers by noting that if a positive integer $a $ can be expressed as$a = mq + r $ with$0 \leq r < m $, then$-a $ can also be expressed similarly. By considering the expression for$-a$ and manipulating it, the proof shows that the theorem still holds for negative integers.

Include relevant code or pseudocode:
```java
public void handleNegativeIntegers(int a, int m) {
    if (m <= 0 || a < 0) {
        throw new IllegalArgumentException("Invalid input for division algorithm");
    }
    // Handle the case where a is negative.
}
```
x??

---

#### Proof by Contradiction in Division Algorithm
Background context: The proof uses contradiction to show that there cannot be a smallest counterexample. This approach assumes the contrary and derives a logical inconsistency.

:p How does the proof use contradiction to prove the existence part of the division algorithm?
??x
The proof uses contradiction by assuming there is a smallest positive integer $a $ for which the theorem fails, i.e., it cannot be expressed as$a = mq + r $ with$0 \leq r < m $. By considering the number $ a - m $, which is both positive and smaller than$ a$, it derives that this assumption leads to a contradiction, proving that such a smallest counterexample cannot exist.

Include relevant code or pseudocode:
```java
public void proofByContradiction(int a, int m) {
    if (m <= 0 || a < 0) {
        throw new IllegalArgumentException("Invalid input for division algorithm");
    }
    // Implement the logic of proof by contradiction here.
}
```
x??

---


#### Direct Proof vs. Proof by Contradiction
Direct proof is a straightforward method where you start from the given premise and logically deduce the conclusion, whereas a proof by contradiction involves assuming the negation of what you want to prove and showing that this leads to an absurdity or contradiction.

:p In which scenario would it be more difficult to identify if a mistake has been made?
??x
In a proof by contradiction, it is more difficult to identify if a mistake has been made because there are multiple potential contradictions. If you make a mistake early in the process, finding out that your conclusion contradicts something else might not clearly indicate where the error occurred.

```java
public class ProofExample {
    public boolean directProof(int n) {
        // Direct proof logic
        for (int i = 2; i <= Math.sqrt(n); i++) {
            if (n % i == 0) return false;
        }
        return true;
    }

    public boolean contradictionProof(int n) {
        // Proof by contradiction: assume not prime and derive a contradiction
        return !directProof(n);
    }
}
```
x??

---

#### Induction Proof
Induction proofs are particularly useful when dealing with statements about all natural numbers or integers. The method involves proving a base case and then showing that if the statement holds for some number $k $, it also holds for $ k+1$.

:p What is the primary challenge in identifying mistakes during an induction proof?
??x
In an induction proof, making a mistake within the induction step can make it difficult to identify because the error might not be immediately apparent until you try to apply the inductive hypothesis. If the proof does not hold for $k+1$, it could indicate that there was an error earlier in the base case or the inductive step.

```java
public class InductionExample {
    public boolean inductionStep(int n) {
        if (n == 0) return true; // Base case

        // Inductive step: assume true for k and prove for k+1
        return inductionStep(n - 1);
    }
}
```
x??

---

#### Proof by Contradiction
Proof by contradiction involves assuming the negation of what you want to prove (i.e., $\neg Q $ given$P$) and deriving a contradiction. This method is particularly useful when dealing with "for every" or "for all" statements.

:p Why is proof by contradiction more prone to errors than direct proofs?
??x
Proof by contradiction is more prone to errors because it involves working backwards from the assumption of the negation, which can mask mistakes until a contradiction is found. If a mistake occurs early in the process, it might be hard to trace back to where the error originated since multiple assumptions and deductions are made.

```java
public class ContradictionExample {
    public boolean proveStatement(int n) {
        assumeNotQ(n); // Assume not Q for contradiction

        // Some logic that may contain errors
        if (n < 0) return true;
        
        return false; // Contradiction found
    }

    private void assumeNotQ(int n) {
        // Logic to show a contradiction
        System.out.println("Assuming " + n + " is not Q.");
    }
}
```
x??

---

#### Use of Proof by Contradiction for Universal Statements
Proofs by contradiction are especially useful when the theorem asserts that something is true "for every" or "for all" such-and-such. By assuming the negation, you can focus on a specific element that does not satisfy the theorem.

:p Why is proof by contradiction particularly useful in proving universal statements?
??x
Proof by contradiction is particularly useful for proving universal statements because it allows focusing on a specific counterexample or element that contradicts the statement. This makes it easier to derive a contradiction and pinpoint where the initial assumption led to an error.

```java
public class UniversalExample {
    public boolean proveForAll(int n) {
        assumeNotInteresting(n); // Assume not interesting for contradiction

        // Some logic leading to a contradiction
        if (n % 2 == 0 && n > 10) return true; // Contradiction found

        return false;
    }

    private void assumeNotInteresting(int n) {
        System.out.println("Assuming " + n + " is not interesting.");
    }
}
```
x??

---


#### Contrapositive, Contra-diction, Converse, and Counterexample

Background context: In mathematical proofs, these terms are often used to construct or understand arguments. Understanding their distinctions is crucial for writing clear and rigorous proofs.

- **Contrapositive**: The contrapositive of a statement "If P, then Q" is "If not Q, then not P". It is logically equivalent to the original statement.
  
- **Contra-diction**: Proof by contradiction involves assuming the negation of what you want to prove and showing that this leads to a logical inconsistency.

- **Converse**: The converse of a statement "If P, then Q" is "If Q, then P". It is not necessarily true if the original statement is true.

- **Counterexample**: A counterexample disproves a universal claim by providing an instance where the claim does not hold. 

:p What are the differences between contrapositive, contradiction, converse, and counterexample in mathematical proofs?
??x
The contrapositive is logically equivalent to its original conditional statement; it swaps and negates both parts of "If P, then Q" (resulting in "If not Q, then not P"). Proof by contradiction assumes the opposite of what you want to prove and shows that this assumption leads to a contradiction. The converse reverses the order of implication ("If Q, then P") but is not necessarily true if the original statement is true. A counterexample disproves a universal claim by providing a specific instance where it fails.

```java
// Example in Java for understanding contrapositive
public class ContrapositiveExample {
    public static boolean contrapositiveExample(int x) {
        // Assume "If x > 5, then x < 10" is the original statement
        return !(x <= 5); // This corresponds to "if not Q (not x < 10), then not P (not x > 5)"
    }
}
```

The contrapositive in this example effectively means checking if $x \leq 5$.

```java
// Example of proof by contradiction
public class ProofByContradiction {
    public static boolean proofByContradiction(int a, int b) {
        // Assume "If a is rational and ab is irrational, then b is irrational"
        return !((a != 0 && b == 0) || (a == 0 && b != 0)); // This shows contradiction if not true
    }
}
```

In the proof by contradiction example, we check for conditions that would lead to a logical inconsistency.

```java
// Example of converse in Java
public class ConverseExample {
    public static boolean converseExample(int x) {
        // Assume "If P (x > 5), then Q (x < 10)"
        return !(x <= 5); // This is the converse: "if Q, then P"
    }
}
```

This example inverts the conditions but does not guarantee truth.

```java
// Example of counterexample in Java
public class CounterexampleExample {
    public static boolean checkCounterexample(int n) {
        return !(15 * 2 + 35 * 1 == 1); // This is a counterexample to "There exist m, n such that 15m + 35n = 1"
    }
}
```

The function checks if the equation holds for given values, serving as a counterexample.

x??

---
#### Proving Rational and Irrational Multiplication

Background context: This exercise involves proving properties of rational and irrational numbers. Specifically, it examines the product of a rational number with an irrational number.

:p Prove that if $a $ is rational and$ab $ is irrational, then$b$ must be irrational.
??x
To prove this statement, we can use proof by contradiction. Assume that both $a $ and$b $ are rational numbers. Since$a $ is rational, it can be expressed as$\frac{p}{q}$ where $p$ and $q$ are integers and $q \neq 0$. If $ ab$is irrational but we assume $ b$to also be rational, then $ b$can be expressed as $\frac{r}{s}$, where $ r$and $ s$are integers and $ s \neq 0$.

The product $ab = a \cdot b = \left(\frac{p}{q}\right) \cdot \left(\frac{r}{s}\right) = \frac{pr}{qs}$. Since both $ p, q, r,$and $ s$are integers with no common factors (assuming they are in simplest form), the product $\frac{pr}{qs}$ would be a rational number. This contradicts our assumption that $ab$ is irrational.

Therefore, if $a $ is rational and$ab $ is irrational,$ b$ cannot be rational; it must be irrational.

```java
// Pseudocode for proof by contradiction
public class RationalMultiplicationProof {
    public static void proveRationalMultiplication() {
        // Assume a = p/q and b = r/s where p, q, r, s are integers.
        // If ab is irrational but we assume b is rational (b = r/s), then:
        
        // Check if the product is still irrational
        boolean isIrrational = !(isRational(pr * s) && isRational(q * r)); // pr and qs would be integers, check this
        
        System.out.println("Is the product irrational? " + isIrrational);
    }
    
    public static boolean isRational(int num) {
        // Check if a number can be represented as p/q where q != 0
        return true; // This function should return true for all integers, but used here to demonstrate logic
    }
}
```

In the pseudocode, we check that the product of two rational numbers would result in a rational number. The contradiction arises when this does not hold, thus proving $b$ must be irrational.

x??

---
#### Direct Proof vs. Proof by Contradiction

Background context: This exercise compares direct proofs and proof by contradiction to prove a statement about positive rational numbers and their properties.

:p Prove that if $x \in Q^+$, then there exists some $ y \in Q^+$such that $ y < x$. Provide two proofs: one using a direct proof, and one using proof by contradiction.
??x
**Direct Proof**: To prove the statement directly, we need to construct a rational number $y $ that is strictly less than any given positive rational number$x \in Q^+$.

1. Let $x = \frac{p}{q}$ where $p$ and $q$ are integers with $q > 0$.
2. Choose $y = \frac{p}{q + 1}$. Since $ q + 1 > q$, we have that $\frac{p}{q + 1} < \frac{p}{q} = x$.

Thus, $y = \frac{p}{q + 1}$ is a positive rational number and $y < x$.

**Proof by Contradiction**: Assume the statement is false. That is, suppose for every $y \in Q^+$, we have $ y \geq x$. Let’s consider the value of $ x = \frac{p}{q}$ again.

1. Suppose there exists no positive rational number $y $ such that$y < x$.
2. Then any candidate $y = \frac{r}{s}$(where $ r, s > 0$) must satisfy $ y \geq x$, which means $\frac{r}{s} \geq \frac{p}{q}$.

By choosing $s < q + 1 $ and$r = p - 1 $, we get a new rational number$ y' = \frac{p-1}{q+1}$. Notice that:

$$y' = \frac{p - 1}{q + 1} = \frac{p - 1}{q + 1} < \frac{p}{q} = x.$$

This contradicts the assumption that $y \geq x $ for all positive rational numbers$y $. Therefore, there must exist some$ y \in Q^+$such that $ y < x$.

```java
// Direct Proof Example in Java
public class DirectProof {
    public static boolean directProof(double x) {
        // Given x is a positive rational number (x > 0)
        double y = x / (1 + 1); // Choose y as half of x
        return y < x; // Check if y is less than x
    }
}
```

The function checks that $y $ is indeed less than the given positive rational number$x$.

```java
// Proof by Contradiction Example in Java
public class ProofByContradiction {
    public static boolean proofByContradiction(double x) {
        // Assume there does not exist y such that y < x for all positive rationals
        double epsilon = 0.1; // Small value to check closeness
        for (int i = 1; i <= 10000; i++) { // Check a range of positive rational numbers
            double y = i / (i + 1); // Construct y as a positive rational number
            if (y < x - epsilon) {
                return true; // Found a valid y, contradiction!
            }
        }
        return false; // No such y found, no contradiction
    }
}
```

In the proof by contradiction example, we try to find a $y $ that is less than$x$, but since it exists, this approach would theoretically always find one.

x??

---


#### Functions: Definition and Basic Properties
Functions are a fundamental concept in mathematics, often introduced early on but deeply explored throughout one's mathematical education. A function $f $ from set$A $ to set$ B $, denoted as $ f : A \to B$, assigns each element $ x \in A$exactly one value $ y = f(x) \in B$. The domain of the function is the set $ A$, the codomain is $ B$, and the range (or image) is the subset of $ B$that includes all values attained by $ f$.

:p Define a function from set $A $ to set$B$.
??x
A function $f : A \to B $ assigns each element in the domain$A $ exactly one value in the codomain$ B $. The notation is such that for every $ x \in A$, there exists a unique $ y \in B$where $ y = f(x)$.
x??

---
#### Domain, Codomain, and Range
The terms domain, codomain, and range are crucial in understanding functions. The domain consists of all possible inputs (elements from set $A $), the codomain is the entire potential output space (set $ B$), and the range is the actual subset of the codomain that is achieved by the function.

:p Explain the difference between the codomain and the range.
??x
The codomain $B $ is the complete set of possible outputs for a function, whereas the range is the specific subset of the codomain that includes all actual output values produced by the function. For example, if$f(x) = x^2 $ with domain$\mathbb{R}$, the codomain might be $\mathbb{R}$(all real numbers), but the range is only non-negative reals $[0, +\infty)$.
x??

---
#### Vertical Line Test
The vertical line test is a graphical method to determine if a curve represents a function. If any vertical line intersects the graph at most once, then the graph represents a function. This test ensures both existence (a unique output for each input) and uniqueness.

:p Describe how the vertical line test works.
??x
To use the vertical line test, draw several vertical lines across the graph of a relation. If every vertical line intersects the graph in at most one point, then the graph represents a function. Otherwise, it does not represent a function because there is at least one input with multiple outputs.

```java
public class VerticalLineTest {
    public boolean isFunction(double[] xValues, double[] yValues) {
        for (int i = 0; i < yValues.length - 1; ++i) {
            if ((yValues[i] == yValues[i + 1]) && (xValues[i] != xValues[i + 1])) {
                return false;
            }
        }
        return true;
    }
}
```
x??

---
#### Examples of Functions
Various examples illustrate the concept of functions. For instance, $f(x) = \lfloor x \rfloor$, known as the floor function, rounds down to the nearest integer. Another example is a function mapping integers to their squares with restrictions.

:p Provide an example of a floor function.
??x
The floor function $f(x) = \lfloor x \rfloor $ maps any real number$x $ to the greatest integer less than or equal to$ x $. For instance,$\lfloor 3.2 \rfloor = 3 $ and$\lfloor -4.7 \rfloor = -5$.

```java
public class FloorFunction {
    public int floor(int number) {
        return (int)Math.floor(number);
    }
}
```
x??

---
#### Cartesian Product in Functions
Functions can also involve more complex domains or codomains, such as the Cartesian product of sets. The function $f(x) = (5 \cos(x), 5 \sin(x))$ maps real numbers to points on a circle centered at the origin with radius 5.

:p Describe the function mapping real numbers to a circle.
??x
The function $f(x) = (5 \cos(x), 5 \sin(x))$ maps each real number $ x $ to a point on a circle of radius 5 centered at the origin. This is because for any angle $ x $,$\cos(x)$ and $\sin(x)$ describe coordinates on the unit circle, scaled by 5.

```java
public class CircleMapping {
    public double[] mapToCircle(double x) {
        return new double[]{5 * Math.cos(x), 5 * Math.sin(x)};
    }
}
```
x??

---

