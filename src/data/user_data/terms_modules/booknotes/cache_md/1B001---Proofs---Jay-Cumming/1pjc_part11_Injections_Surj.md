# High-Quality Flashcards: 1B001---Proofs---Jay-Cumming_processed (Part 11)


**Starting Chapter:** Injections Surjections and Bijections

---


#### Set Notation and Function Representation
Background context explaining set notation, functions, and how they are represented. Mention that sets can be defined with curly braces and functions can map elements from one set to another using function notation.

:p What is the example given for a set and its cardinality?
??x The example provided shows the set \( \{1, 5, 12\} \) and states that \( |f\{1, 5, 12\}| = 3 \). This means the set has three elements.
x??

---
#### Function Representation with Braces
Background context explaining how functions are represented using braces around the input. Mention this is different from the typical f(x) or g(t) notation.

:p How does a function like \( G:S.\{A, B, C, D, F\} \) represent student grades in an Intro to Proofs class?
??x The function \( G:S.\{A, B, C, D, F\} \) represents the letter grade that each student received on their last homework assignment. Here, S is the set of all students in the class.
x??

---
#### Injections (One-to-One Functions)
Background context explaining injections and how they ensure no two different elements in the domain map to the same element in the codomain.

:p What does it mean for a function to be injective or one-to-one?
??x A function is injective if \( f(a_1) = f(a_2) \) implies that \( a_1 = a_2 \). In simpler terms, different elements in the domain map to different elements in the codomain. This means there are no two arrows pointing at the same point.
x??

---
#### Example of an Injection
Background context providing examples of functions and explaining why certain mappings are or are not injective.

:p Why is the function from \{x, y, z\} to \{1, 2, 3, 4\} injective?
??x The function is injective because no two different elements in the domain map to the same element in the codomain. For example, if \( f(x) = 2 \), \( f(y) = 3 \), and \( f(z) = 1 \), then each element in the domain maps uniquely to an element in the codomain.
x??

---
#### Non-Example of an Injection
Background context explaining why a function is not injective.

:p Why is the function from \{x, y, z\} to \{1, 2, 3, 4\} not injective?
??x The function is not injective because \( f(x) = 2 \) and \( f(y) = 2 \), meaning two different elements in the domain map to the same element in the codomain. This violates the condition for an injection.
x??

---
#### Contrapositive of Injection Definition
Background context explaining how the contrapositive can provide another way to understand injections.

:p How does the contrapositive help us understand injective functions?
??x The contrapositive turns the implication " \( f(a_1) = f(a_2) \) implies that \( a_1 = a_2 \)" into " \( a_1 \neq a_2 \) implies \( f(a_1) \neq f(a_2) \)". This means if two different points in the domain map to the same point, then it cannot be injective.
x??

---
#### Surjective (Onto Functions)
Background context explaining surjective functions and how they ensure every element in the codomain has a preimage.

:p What does it mean for a function to be surjective or onto?
??x A function is surjective if for every \( b \in B \), there exists some \( a \in A \) such that \( f(a) = b \). In simpler terms, every element in the codomain has at least one preimage in the domain.
x??

---
#### Example of a Surjection
Background context providing examples of functions and explaining why certain mappings are or are not surjective.

:p Why is the function from \{w, x, y, z\} to \{1, 2, 3\} a surjection?
??x The function is a surjection because every element in the codomain has at least one preimage. For example, if \( f(w) = 1 \), \( f(x) = 2 \), and \( f(y) = 3 \), then each element in the codomain is mapped to by some element in the domain.
x??

---
#### Non-Example of a Surjection
Background context explaining why a function is not surjective.

:p Why is the function from \{w, x, y, z\} to \{1, 2, 3\} not a surjection?
??x The function is not a surjection because there exists an element in the codomain that does not have a preimage. Specifically, \( b = 3 \) does not have any corresponding \( a \in \{w, x, y, z\} \) such that \( f(a) = 3 \).
x??

---
#### Contrapositive of Surjective Definition
Background context explaining how the contrapositive can provide another way to understand surjective functions.

:p How does the contrapositive help us understand surjective functions?
??x The contrapositive turns the definition "for every \( b \in B \), there exists some \( a \in A \) such that \( f(a) = b \)" into "there does not exist any \( b \in B \) for which \( f(a) \neq b \) for all \( a \in A \)". This means if every element in the codomain has at least one preimage, then it is surjective.
x??

---
#### Recurring Theme in Function Definitions
Background context explaining how existence and uniqueness criteria shift between domain and codomain when defining injections and surjections.

:p How do the definitions of injective and surjective functions shift focus from existence to uniqueness?
??x When defining a function \( f:A.B \), we focus on existence for every \( x \in A \) that \( f(x) \) exists and is unique. To be injective, the attention shifts to B with an existence criterion (for every \( b \in B \), there exists some \( a \in A \) such that \( f(a) = b \)). And to be surjective, it focuses on a uniqueness-type criterion (for every \( b \in B \), there is at most one \( a \in A \) such that \( f(a) = b \)).
x??


#### Definition of a Bijection
Background context: A bijection is defined as a function that is both injective and surjective. This means every element in set \(A\) is paired with exactly one element in set \(B\), and every element in \(B\) has exactly one element from \(A\) mapping to it.
:p What is the definition of a bijective function?
??x
A function \(f: A \to B\) is bijective if it is both injective (one-to-one) and surjective (onto). This means:
- Every element in set \(A\) is paired with exactly one element in set \(B\).
- Every element in set \(B\) has exactly one element from set \(A\) mapping to it.
In formal terms, for every \(a_1, a_2 \in A\), if \(f(a_1) = f(a_2)\), then \(a_1 = a_2\) (injective). And for every \(b \in B\), there exists an \(a \in A\) such that \(f(a) = b\) (surjective).
x??

---

#### Examples of Injective, Surjective, and Bijective Functions
Background context: The text provides visual aids using Venn diagrams to illustrate the different types of functions. It explains how a function can be injective, surjective, or bijective by examining the relationships between elements in sets \(A\) and \(B\).
:p What are some examples provided for each type of function?
??x
- **Injective Function Example**: A function that is not bijective but only injective. For example:
  ```
    X = {1, 2, 3}
    Y = {4, 5, 6, 7}
    f: X → Y where f(1) = 4, f(2) = 5, f(3) = 6
  ```

- **Surjective Function Example**: A function that is not bijective but only surjective. For example:
  ```
    X = {1, 2, 3}
    Y = {4, 5, 6, 7, 8}
    f: X → Y where f(1) = 4, f(2) = 5, f(3) = 6
  ```

- **Bijective Function Example**: A function that is both injective and surjective. For example:
  ```
    X = {1, 2, 3}
    Y = {4, 5, 6}
    f: X → Y where f(1) = 4, f(2) = 5, f(3) = 6
  ```

In these examples, the function is defined from set \(X\) to set \(Y\), and each type of function is characterized by its unique properties.
x??

---

#### Injective Functions Explained
Background context: The text explains that an injective function means all elements in \(A\) are paired with exactly one element in \(B\). This can be likened to monogamous relationships, where no two elements from \(A\) map to the same element in \(B\).
:p What is the key property of an injective function?
??x
The key property of an injective function (one-to-one) is that each element in set \(A\) maps to a unique element in set \(B\). Formally, for all \(a_1, a_2 \in A\), if \(f(a_1) = f(a_2)\), then it must be true that \(a_1 = a_2\).

Example pseudocode:
```java
public boolean isInjective(HashMap<Integer, Integer> mapping) {
    Set<Integer> values = new HashSet<>();
    for (Map.Entry<Integer, Integer> entry : mapping.entrySet()) {
        if (!values.add(entry.getValue())) { // If value already exists, not injective
            return false;
        }
    }
    return true; // All values are unique, function is injective
}
```
x??

---

#### Surjective Functions Explained
Background context: The text explains that a surjective function means every element in \(B\) has at least one element from \(A\) mapping to it. This can be likened to the idea of everyone finding love.
:p What is the key property of a surjective function?
??x
The key property of a surjective function (onto) is that for every element \(b \in B\), there exists an element \(a \in A\) such that \(f(a) = b\). This means every element in set \(B\) has at least one corresponding element in set \(A\) mapping to it.

Example pseudocode:
```java
public boolean isSurjective(HashMap<Integer, Integer> mapping, Set<Integer> Y) {
    for (Integer y : Y) { // Check if each y in B has a pre-image in A
        if (!mapping.values().contains(y)) {
            return false;
        }
    }
    return true; // All elements of Y have pre-images, function is surjective
}
```
x??

---

#### Bijective Functions Explained
Background context: The text explains that a bijective function has both the properties of an injective and surjective function. This means every element in \(A\) maps to exactly one unique element in \(B\), and every element in \(B\) is mapped from exactly one unique element in \(A\).
:p What are the key properties of a bijective function?
??x
The key properties of a bijective function (one-to-one correspondence) include:
1. **Injective Property**: For all \(a_1, a_2 \in A\), if \(f(a_1) = f(a_2)\), then \(a_1 = a_2\).
2. **Surjective Property**: For every \(b \in B\), there exists an element \(a \in A\) such that \(f(a) = b\).

In summary, a bijective function pairs each element of set \(A\) with exactly one unique element in set \(B\), and vice versa.

Example pseudocode:
```java
public boolean isBijective(HashMap<Integer, Integer> mapping, Set<Integer> A, Set<Integer> B) {
    if (!isInjective(mapping)) return false; // Check injectivity first
    if (!isSurjective(mapping, B)) return false; // Then check surjectivity

    // If both properties are satisfied, it is bijective
    return true;
}
```
x??

---


#### Definition of Bijection and Injectivity

Background context: A function is a bijection if it is both injective (one-to-one) and surjective (onto). To prove that a function is a bijection, one must show that it is both an injection and a surjection. The domain \(A\) and codomain \(B\) are crucial as they define the behavior of the function.

:p What does it mean for a function to be injective?
??x
A function \(f: A \to B\) is injective if every element in the codomain \(B\) has at most one preimage in the domain \(A\). This means that for any two distinct elements \(a_1, a_2 \in A\), if \(f(a_1) = f(a_2)\), then it must be true that \(a_1 = a_2\).

For example, consider the function \(g: \mathbb{R}^+ \to \mathbb{R}\) defined by \(g(x) = x^2\). To show that \(g\) is not injective, we can find two distinct elements in the domain that map to the same element in the codomain. For instance, both 1 and -1 square to 1, so \(g(1) = g(-1) = 1\), showing that \(g\) is not injective.

```java
public class InjectivityExample {
    public static boolean isInjective(double x, double y) {
        return Math.pow(x, 2) != Math.pow(y, 2);
    }
}
```
x??

---

#### Surjectivity and Bijection

Background context: A function \(f: A \to B\) is surjective if every element in the codomain \(B\) has at least one preimage in the domain \(A\). A bijection is a function that is both injective and surjective.

:p What does it mean for a function to be surjective?
??x
A function \(f: A \to B\) is surjective if for every element \(b \in B\), there exists at least one element \(a \in A\) such that \(f(a) = b\). In other words, the function covers all elements of the codomain.

For example, consider the function \(h: \mathbb{R} \to \mathbb{R}^+\) defined by \(h(x) = x^2\). To show that \(h\) is not surjective, note that there is no real number \(x\) such that \(x^2 = -1\), which means the codomain includes elements (like -1) that are not in the image of \(h\).

```java
public class SurjectivityExample {
    public static boolean isSurjective(double y) {
        return y >= 0;
    }
}
```
x??

---

#### Proving a Function is Not Injective, Surjective or Bijective

Background context: The given example involves proving the properties of different functions defined over specific domains and codomains. To show that \(f(x) = x^2\) on \(\mathbb{R}\), we need to prove it is not injective, surjective, or bijective.

:p Prove that \(f(x) = x^2\) for \(x \in \mathbb{R}\) is not injective.
??x
To show that \(f(x) = x^2\) on \(\mathbb{R}\) is not injective, we need to find two distinct elements in the domain that map to the same element in the codomain. Consider the points 1 and -1:
\[ f(1) = 1^2 = 1 \]
\[ f(-1) = (-1)^2 = 1 \]
Since \(f(1) = f(-1)\) but \(1 \neq -1\), the function is not injective.

```java
public class NotInjectiveExample {
    public static boolean isNotInjective(double x, double y) {
        return Math.pow(x, 2) == Math.pow(y, 2) && !Double.compare(x, y);
    }
}
```
x??

---

#### Proving a Function is Injective

Background context: The example shows how to prove that \(g(x) = x^2\) on \(\mathbb{R}^+\) is injective by assuming \(g(x) = g(y)\) and showing that this implies \(x = y\).

:p Prove that \(g(x) = x^2\) for \(x \in \mathbb{R}^+\) is injective.
??x
To prove that \(g(x) = x^2\) on \(\mathbb{R}^+\) is injective, assume that \(g(x) = g(y)\). Then:
\[ x^2 = y^2 \]
Taking the square root of both sides gives:
\[ \sqrt{x^2} = \sqrt{y^2} \]
Since we are working in \(\mathbb{R}^+\), the domain excludes negative numbers, so:
\[ |x| = |y| \implies x = y \]
Thus, \(g(x) = g(y)\) implies \(x = y\), which proves that \(g\) is injective.

```java
public class InjectiveProofExample {
    public static boolean isInjective(double x, double y) {
        return Math.pow(x, 2) == Math.pow(y, 2) && Double.compare(Math.abs(x), Math.abs(y)) == 0;
    }
}
```
x??

---

#### Proving a Function is Not Surjective

Background context: The example shows how to prove that \(h(x) = x^2\) on \(\mathbb{R}\) is not surjective by demonstrating there are elements in the codomain \(\mathbb{R}^+\) with no preimage in the domain.

:p Prove that \(h(x) = x^2\) for \(x \in \mathbb{R}\) is not surjective.
??x
To prove that \(h(x) = x^2\) on \(\mathbb{R}\) is not surjective, we need to find an element in the codomain \(\mathbb{R}^+\) (the set of non-negative real numbers) that does not have a preimage in the domain \(\mathbb{R}\). Consider -1:
\[ h(x) = x^2 = -1 \]
There is no real number \(x\) such that \(x^2 = -1\), so -1 (and any negative number) is an element of the codomain that has no preimage in the domain. Therefore, \(h(x)\) is not surjective.

```java
public class NotSurjectiveExample {
    public static boolean isNotSurjective(double y) {
        return y < 0;
    }
}
```
x??

---

#### Proving a Function is Surjective

Background context: The example shows how to prove that \(k(x) = x^2\) on \(\mathbb{R}^+\) is surjective by showing every element in the codomain \(\mathbb{R}^+\) has at least one preimage in the domain.

:p Prove that \(k(x) = x^2\) for \(x \in \mathbb{R}^+\) is surjective.
??x
To prove that \(k(x) = x^2\) on \(\mathbb{R}^+\) is surjective, we need to show that every element in the codomain \(\mathbb{R}^+\) has at least one preimage in the domain. For any \(y \in \mathbb{R}^+\), there exists a unique positive real number \(x = \sqrt{y}\) such that:
\[ k(x) = x^2 = (\sqrt{y})^2 = y \]
Thus, for every element in the codomain \(\mathbb{R}^+\), there is at least one preimage in the domain, proving that \(k(x)\) is surjective.

```java
public class SurjectiveProofExample {
    public static double findPreimage(double y) {
        return Math.sqrt(y);
    }
}
```
x??

---

#### Proving a Function is Bijective

Background context: The example shows how to prove that \(k(x) = x^2\) on \(\mathbb{R}^+\) is bijective by proving it is both injective and surjective.

:p Prove that \(k(x) = x^2\) for \(x \in \mathbb{R}^+\) is bijective.
??x
To prove that \(k(x) = x^2\) on \(\mathbb{R}^+\) is bijective, we need to show that it is both injective and surjective. We have already proven in previous flashcards that:
1. **Injectivity**: If \(k(x) = k(y)\), then \(x = y\).
2. **Surjectivity**: For any \(y \in \mathbb{R}^+\), there exists a unique \(x = \sqrt{y}\) such that \(k(x) = y\).

Since \(k\) is both injective and surjective, it is bijective.

```java
public class BijectiveProofExample {
    public static boolean isInjective(double x, double y) {
        return Math.pow(x, 2) == Math.pow(y, 2) && Double.compare(Math.abs(x), Math.abs(y)) == 0;
    }

    public static double findPreimage(double y) {
        return Math.sqrt(y);
    }
}
```
x??


#### Function Surjectiveness

Background context explaining the concept. In this section, we discuss surjectiveness of functions and how to prove or disprove it. A function \( f: A \to B \) is **surjective** if for every element \( y \) in the codomain \( B \), there exists at least one element \( x \) in the domain \( A \) such that \( f(x) = y \).

:p How do you show a function is not surjective?
??x
To show a function is not surjective, find an element in the codomain that has no pre-image (i.e., there is no \( x \) in the domain such that \( f(x) = y \)).

Example:
For the function \( f: \mathbb{R} \to \mathbb{R} \) where \( f(x) = x^2 \), we can show it's not surjective by noting there is no real number \( x \) such that \( x^2 = -4 \). Hence, \( -4 \) has no pre-image.

```java
public class NotSurjectiveExample {
    public static boolean checkSurjectiveness(double y) {
        // Check if a negative number exists in the codomain
        return y >= 0;
    }
}
```
x??

---

#### Function Injectiveness

Background context explaining the concept. In this section, we discuss injectiveness of functions and how to prove or disprove it. A function \( f: A \to B \) is **injective** if for every pair of distinct elements \( x_1 \neq x_2 \) in the domain \( A \), their images are different, i.e., \( f(x_1) \neq f(x_2) \).

:p How do you show a function is injective?
??x
To show a function is injective, assume two elements from the domain map to the same element in the codomain and derive a contradiction or prove that no such pair exists.

Example:
For the function \( g: \mathbb{R}^+ \to \mathbb{R} \) where \( g(x) = x^2 \), we can show it is injective by assuming \( g(x_1) = g(x_2) \). This implies \( x_1^2 = x_2^2 \), which means \( x_1 = x_2 \) or \( x_1 = -x_2 \). Since both \( x_1, x_2 \in \mathbb{R}^+ \), the only possibility is \( x_1 = x_2 \).

```java
public class InjectivenessExample {
    public static boolean checkInjectiveness(double x1, double x2) {
        return (x1 * x1 == x2 * x2) && (x1 > 0);
    }
}
```
x??

---

#### Surjectiveness of h and k

Background context explaining the concept. In this section, we discuss how to prove a function is surjective by finding an \( x \) for every \( y \) in the codomain.

:p How do you show that \( h: \mathbb{R} \to \mathbb{R}_+ \) and \( k: \mathbb{R}^+ \to \mathbb{R} \) are surjective?
??x
To show a function is surjective, for any given \( y \) in the codomain, find an appropriate \( x \) such that \( h(x) = y \) or \( k(x) = y \).

Example:
For the function \( h: \mathbb{R} \to \mathbb{R}_+ \) where \( h(x) = |x| \), for any \( b \in \mathbb{R}_+ \), we can find \( x = \sqrt{b} \). Since \( (\sqrt{b})^2 = b \), it follows that \( h(\sqrt{b}) = b \).

```java
public class SurjectiveExample {
    public static double findXForB(double b) {
        return Math.sqrt(b);
    }
}
```
x??

---

#### Bijection of Functions

Background context explaining the concept. In this section, we discuss how to prove a function is bijective by combining injectiveness and surjectiveness.

:p How do you show that \( h: \mathbb{R} \to \mathbb{R}_+ \) is a bijection?
??x
To show a function is bijective, it must be both injective and surjective. For \( h(x) = |x| \):

1. **Injectiveness**: As shown previously, if \( h(x_1) = h(x_2) \), then \( x_1 = x_2 \).
2. **Surjectiveness**: For any \( b \in \mathbb{R}_+ \), we can find \( x = \sqrt{b} \) such that \( h(\sqrt{b}) = b \).

Thus, since both conditions are satisfied, \( h(x) = |x| \) is a bijection.

```java
public class BijectionExample {
    public static boolean checkInjectiveness(double x1, double x2) {
        return (Math.abs(x1) == Math.abs(x2));
    }

    public static double findXForB(double b) {
        return Math.sqrt(b);
    }
}
```
x??

---


#### Ordered Pairs and Equality
Background context explaining the concept of ordered pairs and their equality. In this case, we are dealing with a function that maps an ordered pair to another ordered pair.

:p What does it mean for two ordered pairs \((x_1, y_1)\) and \((x_2, y_2)\) to be equal?
??x
Two ordered pairs \((x_1, y_1)\) and \((x_2, y_2)\) are equal if both their first coordinates \(x_1\) and \(x_2\) are the same and their second coordinates \(y_1\) and \(y_2\) are also the same. Mathematically, this can be written as:
\[ (x_1, y_1) = (x_2, y_2) \iff x_1 = x_2 \text{ and } y_1 = y_2 \]
??x
---

#### Linear Equations and System of Equations
Background context on linear equations and how to solve systems of linear equations. This is relevant when dealing with functions that map ordered pairs in a linear manner.

:p How do you solve the system of linear equations \( x + 2y = a \) and \( 2x + 3y = b \)?
??x
To solve the system of linear equations:
\[ x + 2y = a \]
\[ 2x + 3y = b \]

1. Start by multiplying the first equation by 2 to align it with the second equation:
   \[ 2(x + 2y) = 2a \Rightarrow 2x + 4y = 2a \]

2. Subtract the second original equation from this new equation to eliminate \( x \):
   \[ (2x + 4y) - (2x + 3y) = 2a - b \]
   \[ y = 2a - b \]

3. Substitute \( y = 2a - b \) back into the first original equation:
   \[ x + 2(2a - b) = a \]
   \[ x + 4a - 2b = a \]
   \[ x = a - 4a + 2b \]
   \[ x = -3a + 2b \]

Thus, the solution is:
\[ (x, y) = (-3a + 2b, 2a - b) \]
??x
---

#### Injectivity Proof for Function \( f(x; y) \)
Background context on proving a function is injective by showing that if \( f(x_1; y_1) = f(x_2; y_2) \), then \( (x_1, y_1) = (x_2, y_2) \).

:p How do you prove the function \( f(x; y) = (a; b) \) is injective?
??x
To prove that \( f(x; y) = (x + 2y, 2x + 3y) \) is injective, we assume:
\[ f(x_1; y_1) = f(x_2; y_2) \]
This means:
\[ (x_1 + 2y_1, 2x_1 + 3y_1) = (x_2 + 2y_2, 2x_2 + 3y_2) \]

Therefore, we have the following system of equations:
\[ x_1 + 2y_1 = x_2 + 2y_2 \]
\[ 2x_1 + 3y_1 = 2x_2 + 3y_2 \]

From the first equation:
\[ x_1 + 2y_1 - x_2 - 2y_2 = 0 \]
\[ (x_1 - x_2) + 2(y_1 - y_2) = 0 \]

Multiply the first equation by 2 and subtract it from the second:
\[ 2(x_1 + 2y_1) - (2x_2 + 3y_2) = 2a - b \]
\[ 2x_1 + 4y_1 - 2x_2 - 3y_2 = 0 \]

Subtracting the first modified equation from the second:
\[ (2x_1 + 3y_1) - (2x_1 + 4y_1) = b - a \]
\[ -y_1 = b - a \]
\[ y_1 = a - b \]

Now, substitute \( y_1 = a - b \) into the first equation:
\[ x_1 + 2(a - b) = x_2 + 2y_2 \]
\[ x_1 + 2a - 2b = x_2 + 2y_2 \]

Since \( y_2 = a - b \):
\[ x_1 + 2a - 2b = x_2 + 2(a - b) \]
\[ x_1 = x_2 \]

Thus, we have shown that if \( f(x_1; y_1) = f(x_2; y_2) \), then \( (x_1, y_1) = (x_2, y_2) \). Therefore, the function is injective.
??x
---

#### Surjectivity Proof for Function \( f(x; y) \)
Background context on proving a function is surjective by showing that for any element in the codomain, there exists an element in the domain that maps to it.

:p How do you prove the function \( f(x; y) = (a; b) \) is surjective?
??x
To prove that \( f(x; y) = (x + 2y, 2x + 3y) \) is surjective, we need to show that for any \( (a, b) \in \mathbb{Z}^2 \), there exist integers \( x \) and \( y \) such that:
\[ f(x; y) = (a; b) \]

From our scratch work, we have:
\[ x + 2y = a \]
\[ 2x + 3y = b \]

We can solve these equations for \( x \) and \( y \). From the first equation:
\[ x = a - 2y \]

Substitute into the second equation:
\[ 2(a - 2y) + 3y = b \]
\[ 2a - 4y + 3y = b \]
\[ 2a - y = b \]
\[ y = 2a - b \]

Now substitute \( y = 2a - b \) back into the first equation:
\[ x + 2(2a - b) = a \]
\[ x + 4a - 2b = a \]
\[ x = a - 4a + 2b \]
\[ x = -3a + 2b \]

Thus, for any \( (a, b) \in \mathbb{Z}^2 \), we can find \( x = -3a + 2b \) and \( y = 2a - b \). Therefore, the function is surjective.
??x
---

#### Pigeonhole Principle Application in Functions
Background context on the pigeonhole principle, which states that if more pigeons than pigeonholes are placed into pigeonholes, then at least one pigeonhole must contain more than one pigeon. In functions, it can be used to determine injectivity and surjectivity.

:p How does the pigeonhole principle apply to proving a function is not injective or surjective?
??x
The pigeonhole principle states that if \( |A| > |B| \), then any function \( f: A \to B \) cannot be injective because there are more elements in \( A \) than in \( B \). Similarly, if \( |A| < |B| \), the function cannot be surjective since not all elements of \( B \) can be mapped to by elements of \( A \).

In summary:
- If the domain has more elements than the codomain (\( |A| > |B| \)), then \( f: A \to B \) is **not injective**.
- If the domain has fewer elements than the codomain (\( |A| < |B| \)), then \( f: A \to B \) is **not surjective**.

The contrapositive of these statements also holds:
- If a function is injective, then \( |A| \leq |B| \).
- If a function is surjective, then \( |A| \geq |B| \).

For bijection (both injective and surjective), we need \( |A| = |B| \).
??x
---


#### Composition of Functions
Composition of functions is a fundamental concept where the output of one function serves as the input to another. Given two functions \(g: A \to B\) and \(f: B \to C\), their composition, denoted by \(f \circ g\), is defined such that:
\[ (f \circ g)(a) = f(g(a)) \]
This means we first apply the function \(g\) to an element in set \(A\) and then use the result as input for the function \(f\).

If we have a practical example, imagine you are dealing with a process in which one step transforms data using function \(g\), and the next step uses that transformed data through another transformation defined by \(f\). The overall effect is the same as applying the combined function \(f \circ g\).
:p How does composition of functions work?
??x
Composition of functions combines two functions where the output of one serves as input to the other. For example, if you have a function \(g\) that maps from set \(A\) to set \(B\), and another function \(f\) that maps from set \(B\) to set \(C\), their composition is defined as:
\[ (f \circ g)(a) = f(g(a)) \]
This process can be visualized in a diagram where the output of \(g\) flows into the input of \(f\).
x??

---

#### Example with Functions
Consider the following functions:
- \(g: \mathbb{R} \to \mathbb{R}\) defined by \(g(x) = x + 1\)
- \(f: \mathbb{R} \to \mathbb{R}_+\) defined by \(f(x) = x^2\)

The composition of these functions is:
\[ (f \circ g)(x) = f(g(x)) = f(x+1) = (x+1)^2 \]
:p What are the definitions and compositions for given functions \(g\) and \(f\)?
??x
For the provided functions, we have:
- \(g: \mathbb{R} \to \mathbb{R}\), where \(g(x) = x + 1\)
- \(f: \mathbb{R} \to \mathbb{R}_+\), where \(f(x) = x^2\)

The composition of these functions is:
\[ (f \circ g)(x) = f(g(x)) = f(x+1) = (x+1)^2 \]
This means we first apply \(g\) to any real number, resulting in that number plus one. Then, we take the result and square it using function \(f\).
x??

---

#### Injectivity of Composition
If both functions are injective, their composition is also injective. This can be proven by showing that if the output of the composed function for two inputs is equal, then those inputs must have been the same initially.
:p How does injectivity work in the context of function composition?
??x
Injectivity means that each element in the domain maps to a unique element in the codomain. For functions \(g: A \to B\) and \(f: B \to C\), if both are injective, then:
- If \(g(a_1) = g(a_2)\) implies \(a_1 = a_2\)
- If \(f(b_1) = f(b_2)\) implies \(b_1 = b_2\)

Thus, for the composition \(f \circ g: A \to C\), if:
\[ (f \circ g)(a_1) = (f \circ g)(a_2) \]
Then:
\[ f(g(a_1)) = f(g(a_2)) \]
Since \(f\) is injective, this implies:
\[ g(a_1) = g(a_2) \]
And since \(g\) is also injective, we conclude:
\[ a_1 = a_2 \]

Therefore, the composition \(f \circ g\) is injective.
x??

---

#### Surjectivity of Composition
If both functions are surjective, their composition is also surjective. This can be proven by showing that for any element in the codomain \(C\), there exists an element in the domain \(A\) such that the composed function maps to it.
:p How does surjectivity work in the context of function composition?
??x
Surjectivity means every element in the codomain is mapped to by at least one element in the domain. For functions \(g: A \to B\) and \(f: B \to C\), if both are surjective, then:
- For any \(b \in B\), there exists some \(a \in A\) such that \(g(a) = b\)
- For any \(c \in C\), there exists some \(b \in B\) such that \(f(b) = c\)

Thus, for the composition \(f \circ g: A \to C\), if:
\[ c \in C \]
Then we can find \(b \in B\) such that \(f(b) = c\) and subsequently find \(a \in A\) such that \(g(a) = b\). This shows that for any \(c \in C\):
\[ (f \circ g)(a) = f(g(a)) = c \]

Therefore, the composition \(f \circ g\) is surjective.
x??

---

#### Corollary of Composition
From the previous two theorems, we can conclude:
- If both functions are injective, their composition is injective.
- If both functions are surjective, their composition is surjective.

These results follow directly from the definitions and properties of injectivity and surjectivity.
:p What corollary can be derived from the previous two theorems?
??x
From the previous theorems:
- If \(g: A \to B\) and \(f: B \to C\) are both injective, then their composition \(f \circ g: A \to C\) is also injective.
- If \(g: A \to B\) and \(f: B \to C\) are both surjective, then their composition \(f \circ g: A \to C\) is also surjective.

These results can be combined into a corollary:
If \(g\) and \(f\) are either both injective or both surjective, the resulting composition function will retain that property.
x??

---


#### Function Composition and Bijectivity

Background context: The text discusses how function composition works, specifically when functions \( g:A \to B \) and \( f:B \to C \) are involved. It explains that if both functions are bijective (both one-to-one and onto), then their composition \( f \circ g \) is also bijective.

:p What does the text say about function composition involving bijections?
??x
The text states that if \( g:A \to B \) and \( f:B \to C \) are both bijective functions, then their composition \( f \circ g: A \to C \) is also a bijection. This conclusion follows from the fact that:

1. The composition of two injective (one-to-one) functions results in an injective function.
2. The composition of two surjective (onto) functions results in a surjective function.

This can be seen by using Theorem 8.13 for injectivity and Theorem 8.14 for surjectivity, which together imply the bijectivity of \( f \circ g \).

??x
```java
// Pseudocode to demonstrate composition of functions in Java
public class FunctionComposition {
    public static int composeFunctions(int a) {
        // Suppose g(x) = x + 1 and f(y) = y * 2
        int b = g(a);
        int c = f(b);
        return c;
    }

    private static int g(int a) { return a + 1; } // Example function g: Z -> Z
    private static int f(int b) { return b * 2; } // Example function f: Z -> Z

    public static void main(String[] args) {
        System.out.println(composeFunctions(5)); // Expected output: 12 (since 5 + 1 = 6, then 6 * 2 = 12)
    }
}
```
x??

---

#### Identity Function and Invertibility

Background context: The text introduces the identity function \( i_A:A \to A \) where \( i_A(x) = x \) for every \( x \in A \). It then discusses how a function \( f:A \to B \) can have an inverse \( f^{-1}:B \to A \), provided that both functions are bijective (one-to-one and onto).

:p What is the definition of an inverse function according to the text?
??x
According to Definition 8.16, a function \( f:A \to B \) has an inverse if it exists such that:

- The composition \( f^{-1} \circ f = i_A \), where \( i_A \) is the identity function on set A.
- The composition \( f \circ f^{-1} = i_B \), where \( i_B \) is the identity function on set B.

In simpler terms, applying a function followed by its inverse (or vice versa) should result in the original input value.

??x
```java
// Pseudocode to demonstrate finding an inverse of a function in Java
public class InverseFunction {
    public static double findInverse(double x) {
        if (x < 0 || x > 1) {
            throw new IllegalArgumentException("Input must be between 0 and 1");
        }
        return 2 * x; // Example: f(x) = 2x -> f^(-1)(x) = x/2
    }

    public static double checkInverse(double x) {
        return findInverse(findInverse(x)); // Check if applying the function twice returns the original value
    }

    public static void main(String[] args) {
        System.out.println(checkInverse(0.5)); // Expected output: 0.5 (since f(f^(-1)(0.5)) = 2 * 0.25 = 0.5)
    }
}
```
x??

---

#### Invertibility and Bijection

Background context: The text explains that for a function \( f:A \to B \) to be invertible, it must be both injective (one-to-one) and surjective (onto). This means every element in the domain A maps uniquely to an element in the codomain B, and every element in B is mapped from at least one element in A.

:p Why does a function need to be bijective to have an inverse?
??x
A function needs to be both injective and surjective (bijective) to ensure it has an inverse for several reasons:

1. **Injectivity**: Ensures that each input maps to a unique output, meaning \( f(x_1) = f(x_2) \implies x_1 = x_2 \). This property is necessary because if the same output could be produced by different inputs, then there would be ambiguity when trying to determine which input corresponds to a given output.
   
2. **Surjectivity**: Ensures that every element in the codomain B is mapped from at least one element in the domain A, meaning for any \( b \in B \), there exists an \( a \in A \) such that \( f(a) = b \). This property ensures that no output is "left out," so each output can be traced back to its corresponding input.

These conditions together ensure that the function pairs every element in A with exactly one unique element in B, allowing for a well-defined inverse function. If either condition fails, the inverse cannot be defined unambiguously or might not exist at all.

??x
```java
// Pseudocode to check if a function is bijective and thus invertible
public class BijectivityCheck {
    public static boolean isInjective(int[] domain, int[] codomain) {
        Set<Integer> seen = new HashSet<>();
        for (int x : domain) {
            int y = f(x); // Assume f is the function mapping from domain to codomain
            if (!seen.add(y)) return false; // If we see the same y twice, it's not injective
        }
        return true;
    }

    public static boolean isSurjective(int[] domain, int[] codomain) {
        Set<Integer> seen = new HashSet<>();
        for (int x : domain) {
            seen.add(f(x)); // Map from domain to codomain and check coverage of codomain
        }
        return seen.size() == codomain.length; // Check if every element in codomain is covered
    }

    public static boolean isBijective(int[] domain, int[] codomain) {
        return isInjective(domain, codomain) && isSurjective(domain, codomain);
    }

    public static void main(String[] args) {
        int[] domain = {1, 2, 3, 4};
        int[] codomain = {5, 6, 7, 8};

        System.out.println(isBijective(domain, codomain)); // Expected output: true
    }
}
```
x??

---

