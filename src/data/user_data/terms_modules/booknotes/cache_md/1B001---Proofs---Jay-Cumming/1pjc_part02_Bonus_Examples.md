# High-Quality Flashcards: 1B001---Proofs---Jay-Cumming_processed (Part 2)


**Starting Chapter:** Bonus Examples

---


#### Proof by Pigeonhole Principle: Divisibility of Integers
Background context explaining the concept. We are given a set of integers from 1 to 200, and we need to prove that among any 101 chosen numbers, at least one number divides another.
:p What is the main idea behind this proof?
??x
The proof uses the pigeonhole principle to show that in a specific distribution of numbers into "boxes," there must be at least two numbers where one divides the other. The key steps are:
1. Factor each integer from 1 to 200 as \( n = 2^k \cdot m \), where \( m \) is an odd number.
2. Place each integer in a box corresponding to its largest odd factor.
3. By the pigeonhole principle, since there are 100 boxes and 101 integers, at least one box must contain two numbers.

We can then use these two numbers to show that one divides the other.
x??

#### Graph Theory: Degree of Vertices
Background context explaining the concept. In graph theory, a vertex's degree is defined as the number of edges connected to it. We need to prove that in any graph with at least two vertices, there must be at least two vertices with the same degree.
:p What does the pigeonhole principle imply for the degrees of vertices in a graph?
??x
The pigeonhole principle implies that if we have \( n \) vertices and their possible degrees range from 0 to \( n-1 \), then since there are \( n \) vertices but only \( n \) possible degrees, at least two vertices must share the same degree.

For example, in a graph with 4 vertices, the degrees can be 0, 1, 2, or 3. Since we have 4 vertices and 4 possible degrees, by the pigeonhole principle, at least one of these degrees must appear twice.
x??

#### Pigeonhole Principle Application: Divisibility Example
Background context explaining the concept. We use a specific example to illustrate how the pigeonhole principle can be applied to prove that among any 101 integers chosen from 1 to 200, at least one integer divides another.
:p How do we place numbers into boxes based on their odd factors?
??x
We factor each number \( n \) as \( n = 2^k \cdot m \), where \( m \) is the largest odd factor. We then place each number in a box corresponding to its value of \( m \). Since there are only 100 possible values for \( m \) (from 1 to 99, and including 1 and 201 as special cases), by the pigeonhole principle, at least one box will contain two numbers.

For example:
- For 72 = 2^3 * 9, it goes into Box 9.
- For 56 = 2^3 * 7, it goes into Box 7.
x??

#### Graph Theory: Graph Example
Background context explaining the concept. We explore a simple graph to understand the structure and properties of vertices and edges in a graph.
:p How do you determine the degree of a vertex in a graph?
??x
The degree of a vertex is determined by counting the number of edges connected to it. For example, consider the following graph:
```
  1---2---3
  |   |   |
  4---5---6
```
- Vertex 1 has a degree of 2 (edges: 1-2, 1-4).
- Vertex 2 has a degree of 3 (edges: 1-2, 2-3, 2-5).
x??

---
These flashcards cover the key concepts and examples provided in the text. Each card is designed to help with understanding the logic behind the proofs and examples given.


#### Proving Statements about Integers

Background context: In this section, we are dealing with proving statements involving integers and their properties. We will use algebraic manipulation and definitions to prove several propositions. Definitions used include even and odd integers:
- An integer \(n\) is **even** if there exists an integer \(a\) such that \(n = 2a\).
- An integer \(n\) is **odd** if there exists an integer \(a\) such that \(n = 2a + 1\).

:p What does the definition of even and odd integers state?
??x
The definition states:
- A number \(n\) is even if it can be expressed as \(n = 2a\) for some integer \(a\).
- A number \(n\) is odd if it can be expressed as \(n = 2a + 1\) for some integer \(a\).

x??

---

#### Proof that the Sum of Two Even Integers is Even

Background context: We will prove that if \(n\) and \(m\) are even integers, then their sum \(n + m\) is also an even integer. This involves expressing \(n\) and \(m\) as multiples of 2.

:p If \(n\) and \(m\) are even integers, what form do they take according to the definition?
??x
According to the definition, if \(n\) and \(m\) are even integers, then:
- \(n = 2a\)
- \(m = 2b\), where \(a\) and \(b\) are integers.

x??

---

#### Proof that the Sum of Two Odd Integers is Even

Background context: We will prove that if \(n\) and \(m\) are odd integers, then their sum \(n + m\) is an even integer. This involves expressing \(n\) and \(m\) in terms of 2 plus another integer.

:p If \(n\) and \(m\) are odd integers, what form do they take according to the definition?
??x
According to the definition, if \(n\) and \(m\) are odd integers, then:
- \(n = 2a + 1\)
- \(m = 2b + 1\), where \(a\) and \(b\) are integers.

x??

---

#### Proof that the Square of an Odd Integer is Odd

Background context: We will prove that if \(n\) is an odd integer, then its square \(n^2\) is also an odd integer. This involves expressing \(n\) as \(2a + 1\) and manipulating this expression to show that \(n^2 = 2k + 1\).

:p If \(n\) is an odd integer, what form does it take according to the definition?
??x
According to the definition, if \(n\) is an odd integer, then:
- \(n = 2a + 1\), where \(a\) is an integer.

x??

---
Each flashcard provides a detailed explanation and prompts for understanding key concepts in the provided text.


#### Implication and Symbolization
Background context explaining implication, its symbol, and how it is used to express conditional statements. The text introduces the concept of using "implies" (=>) as a special symbol for expressing implications between mathematical statements.

:p What does the "implies" (=>) symbol represent in mathematics?
??x
The "implies" (=>) symbol represents a logical relationship where one statement (P) leads to another statement (Q). If P is true, then Q must also be true. For example, if P = "mandnbeing even" and Q = "m+nis even," the implication can be written as: "mandnbeing even => m+nis even."

Code examples could include:
```java
public class ImplicationExample {
    public static boolean isEven(int number) {
        return (number % 2 == 0);
    }

    public static boolean sumIsEven(int m, int n) {
        // Check if both numbers are even and their sum is also even
        return isEven(m) && isEven(n) && isEven(m + n);
    }
}
```
x??

---

#### General Statement Form
Explanation of the general form "P => Q" in mathematical statements. This form represents an implication where P (a condition or hypothesis) implies that Q (a conclusion) follows.

:p What is the structure of a statement in the form "P => Q"?
??x
A statement in the form "P => Q" consists of two parts:
- \( P \): A condition or hypothesis.
- \( Q \): A conclusion that follows from the condition if it holds true. For example, "mandnbeing even => m+nis even."

The structure can be broken down as: "mandnbeing even" (P) implies "m+nis even" (Q).

---
#### Working Your Way to Q
Explanation of how direct proofs work by starting with the condition and working towards the conclusion. The process often involves applying definitions, previous results, algebra, logic, and techniques.

:p How is a direct proof structured?
??x
A direct proof starts with assuming \( P \) (the given condition or hypothesis). Then, it works step-by-step to show that \( Q \) (the desired conclusion) must follow. This involves applying definitions, previous results, algebra, logic, and techniques.

Example steps in a direct proof:
1. Assume \( P \): "mandnbeing even."
2. Explain what \( P \) means: Each of m and n is an even number.
3. Apply relevant definitions or results to deduce intermediate steps.
4. Conclude with \( Q \): "m+nis even."

Example code might not directly apply, but the logic can be understood through structured reasoning:
```java
public class DirectProofExample {
    public static boolean proveSumEven(int m, int n) {
        // Assume P: mandn are both even numbers
        if (isEven(m) && isEven(n)) {  // Step 2: Check if both m and n are even
            return isEven(m + n);      // Step 4: Deduce that their sum must also be even
        } else {
            return false;              // If either m or n is not even, the sum cannot be even
        }
    }

    public static boolean isEven(int number) {
        return (number % 2 == 0);
    }
}
```
x??

---

#### Proposition and Proof Structure
Explanation of how to structure a proof for a "P => Q" statement. This involves defining what \( P \) means, applying relevant definitions or results, and ultimately showing that \( Q \) follows from \( P \).

:p What is the general structure of a direct proof?
??x
The general structure of a direct proof for a "P => Q" statement includes:
1. **Assume** \( P \): Start by assuming the condition or hypothesis.
2. **Explanation**: Clearly state what \( P \) means in context.
3. **Application**: Use relevant definitions, previous results, algebra, logic, and techniques to derive intermediate steps.
4. **Conclusion**: Show that these steps lead logically to \( Q \).

Example structure:
```java
public class PropositionProof {
    public static void proveSumEven(int m, int n) {
        // Step 1: Assume P (condition): mandn are both even numbers
        if (isEven(m) && isEven(n)) {  // Explain what P means
            // Step 3: Apply relevant definitions or results
            boolean sumIsEven = isEven(m + n);   // Intermediate step
            // Step 4: Conclude Q: m+nis even must be true
            System.out.println("m+n is even.");
        }
    }

    public static boolean isEven(int number) {
        return (number % 2 == 0);
    }
}
```
x??

---


#### Proof by Cases
Background context: A proof strategy where a problem is broken down into two or more cases to be proven individually. Direct proofs are often used within each case.

:p What is a proof by cases?
??x
A proof strategy that divides a larger problem into smaller, manageable parts (cases). Each part is then proven separately using direct methods. The overall proposition is true if all the individual cases are true.
```java
public class ProofByCases {
    public void proveEvenOrOdd(int n) {
        // Case 1: n is even
        if (n % 2 == 0) {
            System.out.println("Case 1: n = " + n + " is even");
        }
        
        // Case 2: n is odd
        else {
            System.out.println("Case 2: n = " + n + " is odd");
        }
    }
}
```
x??

---

#### Direct Proofs Involving Definitions
Background context: When proving a statement directly, it often involves using definitions provided. For example, to prove that \(n^2 + n + 6\) is even if \(n\) is an integer, you might use the definition of even numbers and algebraic manipulation.

:p How do you approach a direct proof involving definitions?
??x
You start by understanding and applying the given definitions directly in your proof. For instance, to prove that if \(n^2 + n + 6\) is even for any integer \(n\), you would use the definition of an even number: a number \(k\) is even if it can be written as \(2m\) where \(m\) is an integer.

For example, when proving that if \(n\) is odd (\(n = 2a + 1\)), then \(n^2 + n + 6\) is even:
```java
public class DirectProofExample {
    public boolean proveEvenForOdd(int n) {
        // Assume n is odd: n = 2a + 1
        int a = (n - 1) / 2;
        
        // Calculate the expression
        int result = Math.pow(n, 2) + n + 6;
        
        // Check if it's even by checking remainder when divided by 2
        return result % 2 == 0;
    }
}
```
x??

---

#### Proof of Proposition 2.7: \(n^2 + n + 6\) is Even for Any Integer \(n\)
Background context: To prove that \(n^2 + n + 6\) is even for any integer \(n\), you consider the cases where \(n\) is either even or odd.

:p How do you break down the proof of Proposition 2.7?
??x
You need to show that the expression \(n^2 + n + 6\) results in an even number regardless of whether \(n\) is even or odd.
- **Case 1:** If \(n\) is even, then \(n = 2a\). Substitute this into the expression and simplify it.
- **Case 2:** If \(n\) is odd, then \(n = 2a + 1\). Substitute this into the expression and simplify it.

In both cases, you should end up with an expression that can be written as \(2k\), where \(k\) is an integer.

```java
public class EvenNumberProof {
    public boolean proveEven(int n) {
        // Case 1: n is even (n = 2a)
        if (n % 2 == 0) {
            int a = n / 2;
            return ((2 * a * a + 2 * a + 6) % 2 == 0);
        }
        
        // Case 2: n is odd (n = 2a + 1)
        else {
            int a = (n - 1) / 2;
            return (((4 * a * a + 6 * a + 8) % 2 == 0));
        }
    }
}
```
x??

---

#### Proof by Exhaustion
Background context: A special case of proof by cases where the problem is broken down into all possible elements, and each element is checked individually. This can be seen as a brute force approach.

:p What is an example of a proof by exhaustion?
??x
A proof by exhaustion involves checking every single possibility to ensure that a statement holds true. For instance, proving a theorem about divisibility might require verifying the condition for all possible cases (e.g., prime and composite numbers).

Here’s an example: To prove that a function \(f(x)\) is continuous everywhere, you would check both when it is continuous and not continuous, ensuring no gaps are missed.
```java
public class ProofByExhaustion {
    public boolean isContinuous(int n) {
        // Case 1: f is continuous at n (e.g., polynomial)
        if (/* check continuity */) return true;
        
        // Case 2: f is not continuous at n (e.g., piecewise function with a discontinuity)
        else return false;
    }
}
```
x??

---

#### Divisibility
Background context: In mathematics, divisibility refers to the property that one integer divides another. The goal here is to use direct proofs to establish properties of divisibility.

:p What does it mean for an integer \(a\) to divide an integer \(b\)?
??x
Integer \(a\) divides integer \(b\) if there exists an integer \(k\) such that \(b = ak\). This means that when you divide \(b\) by \(a\), the result is an integer.

For example, 3 divides 6 because \(6 = 2 \cdot 3\).

```java
public class DivisibilityProof {
    public boolean checkDivisibility(int a, int b) {
        return (b % a == 0);
    }
}
```
x??

---


#### Direct Proof Structure and Divisibility
Background context: The text outlines a direct proof for a divisibility proposition. It explains that \(a \mid b\) means \(b = as\) for some integer \(s\), and \(b \mid c\) means \(c = bt\) for some integer \(t\). The goal is to show that \(a \mid c\).

:p What is the structure of a direct proof, and how does it apply to this divisibility problem?
??x
The structure of a direct proof involves assuming the hypothesis (P) and using logical steps to arrive at the conclusion (Q). In this case:
- Hypothesis (P): \(a \mid b\) and \(b \mid c\)
- Conclusion (Q): \(a \mid c\)

We start by expressing the given conditions in terms of their definitions, then use algebraic manipulations to derive the desired result.
```java
// Pseudocode for the proof structure
Proof(P) {
    // Assume a | b and b | c
    int s = some_integer;  // such that b = as
    int t = some_integer;  // such that c = bt
    
    // Derive c in terms of a and integers
    int k = st;           // k is an integer since both s and t are
    c = a * (s * t);      // Therefore, c = ak for some integer k

    // Conclusion: a | c
}
```
x??

---

#### Divisibility Proof with Algebra
Background context: The proof involves using the definitions of divisibility to show that if \(a \mid b\) and \(b \mid c\), then \(a \mid c\). This is done through algebraic substitution.

:p How do you prove \(a \mid c\) given \(a \mid b\) and \(b \mid c\)?
??x
Given:
- \(a \mid b\) implies \(b = as\) for some integer \(s\)
- \(b \mid c\) implies \(c = bt\) for some integer \(t\)

Substitute the expression for \(b\) into the equation for \(c\):
\[ c = (as)t = a(st) \]
Since both \(s\) and \(t\) are integers, their product \(st\) is also an integer. Let \(k = st\). Thus:
\[ c = ak \]

Therefore, \(a \mid c\).

```java
// Code to illustrate the proof steps
public class DivisibilityProof {
    public static void main(String[] args) {
        int a = 3; // Example value for 'a'
        int b = 12; // Example value for 'b', such that a | b (b = a * s)
        int c = 48; // Example value for 'c', such that b | c (c = b * t)
        
        int s = b / a; // Calculate s
        int t = c / b; // Calculate t
        
        int k = s * t; // Calculate k as the product of s and t
        
        System.out.println("Is " + a + " divides " + c + "? " + (c % a == 0)); // Should print true
    }
}
```
x??

---

#### The Division Algorithm
Background context: The division algorithm states that for any two integers \(a\) and \(b\), there exist unique integers \(q\) (quotient) and \(r\) (remainder) such that \(a = bq + r\) and \(0 \leq r < |b|\).

:p What is the division algorithm, and how does it work?
??x
The division algorithm states that for any two integers \(a\) and \(b\), where \(b > 0\), there exist unique integers \(q\) (quotient) and \(r\) (remainder) such that:
\[ a = bq + r \]
and \(0 \leq r < |b|\).

For example, when dividing 7 by 3:
- Quotient: \(2\)
- Remainder: \(1\)

So:
\[ 7 = 3 \cdot 2 + 1 \]

This can be generalized to any pair of integers.
x??

---

#### Theorem as an Algorithm
Background context: The division algorithm is often referred to as a theorem, and it's important because it provides a method for dividing one integer by another with the remainder. It’s not actually called an algorithm in the strict sense but is named so due to its related computational process.

:p Why is the division algorithm sometimes incorrectly called an algorithm?
??x
The term "algorithm" for the division theorem might be confusing as it's not a true algorithm (a sequence of well-defined instructions) but rather a statement about the existence and uniqueness of certain integers. It got this name because there’s a related computational process that uses this theorem to perform division.

For example, in pseudocode:
```java
public class DivisionAlgorithm {
    public static int[] divide(int a, int b) {
        if (b == 0) throw new ArithmeticException("Division by zero");
        
        int q = a / b; // Quotient
        int r = a % b; // Remainder
        
        return new int[]{q, r};
    }
}
```
x??

---

