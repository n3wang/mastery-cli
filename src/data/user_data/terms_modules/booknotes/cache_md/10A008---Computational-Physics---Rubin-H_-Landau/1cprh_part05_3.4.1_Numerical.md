# High-Quality Flashcards: 10A008---Computational-Physics---Rubin-H_-Landau_processed (Part 5)


**Starting Chapter:** 3.4.1 Numerical Recursion Method

---


#### Spherical Bessel Functions

Background context: Spherical Bessel functions \( j_l(x) \) are solutions to the differential equation given by:

\[ x^2 f''(x) + 2x f'(x) + [x^2 - l(l+1)] f(x) = 0. \]

These functions are related to the more general Bessel function of the first kind \( J_n(x) \). The spherical Bessel functions have applications in various physical problems, such as expanding plane waves into spherical partial waves.

:p Explain the relationship between spherical Bessel functions and Bessel functions.
??x
The spherical Bessel functions \( j_l(x) \) are related to the Bessel function of the first kind \( J_n(x) \) by:

\[ j_l(x) = \sqrt{\frac{\pi}{2 x}} J_{l+\frac{1}{2}}(x). \]

This relationship allows us to use properties and values of Bessel functions in calculations involving spherical Bessel functions. For instance, the explicit forms for \( l=0 \) and \( l=1 \) are:

\[ j_0(x) = \frac{\sin x}{x}, \]
\[ j_1(x) = \frac{\sin x}{x^2} - \frac{\cos x}{x}. \]

These functions can be used in physical problems, such as expanding a plane wave into spherical partial waves.

x??

---


#### Numerical Recursion for Spherical Bessel Functions

Background context: The problem describes using recursion relations to compute the values of spherical Bessel functions efficiently. These recursive formulas are given by:

\[ j_{l+1}(x) = \frac{2l+1}{x} j_l(x) - j_{l-1}(x), \]
\[ j_{l-1}(x) = \frac{2l+1}{x} j_l(x) - j_{l+1}(x). \]

These relations permit rapid computation of the spherical Bessel functions for a fixed \( x \) and all \( l \).

:p Explain the upward recursion relation for computing spherical Bessel functions.
??x
The upward recursion relation is used to compute higher-order spherical Bessel functions from lower ones. Starting with known values (e.g., \( j_0(x) \) and \( j_1(x) \)), we can use the formula:

\[ j_{l+1}(x) = \frac{2l+1}{x} j_l(x) - j_{l-1}(x). \]

This relation allows us to compute \( j_{l+1}(x) \) from \( j_l(x) \) and \( j_{l-1}(x) \), making it an efficient method for calculating the entire set of spherical Bessel functions.

For example, if we know \( j_0(x) = \frac{\sin x}{x} \) and \( j_1(x) = \frac{\sin x}{x^2} - \frac{\cos x}{x} \), we can use:

\[ j_2(x) = \frac{3}{x} j_1(x) - j_0(x). \]

This process is repeated to compute higher-order functions.

x??

---

---


#### Numerical Errors in Bessel Functions
Background context: When computing Bessel functions numerically, even though we start with a pure \( j_l(x) \), the computer's lack of precision can introduce errors due to the admixture of \( n_l(x) \). This is because both \( j_l \) and \( n_l \) satisfy the same differential equation, leading to similar recurrence relations. When the numerical value of \( n_l(x) \) becomes much larger than that of \( j_l(x) \), even a small admixture can lead to significant errors.

:p What is Miller's device for reducing numerical errors in Bessel functions?
??x
Miller's device involves using downward recursion starting at a large value \( l = L \). This avoids subtractive cancellation by taking the small values of \( j_{l+1}(x) \) and \( j_l(x) \), producing a larger \( j_{l-1}(x) \) through addition. While the error may still behave like a Neumann function, the actual magnitude of the error decreases quickly as we move downward to smaller \( l \) values.

The relative value will be accurate, but the absolute value needs normalization based on the known value:
\[ j_N^l(x) = \frac{j_c^l(x)}{j_{c0}(x)/j_0^{\text{anal}}(x)} \]
Where \( j_0^{\text{anal}}(x) = \sin x / x \).

:x??

---


#### Downward Recursion in Bessel Functions
Background context: The downward recursion method for computing Bessel functions starts at a large value of \( l \) and moves downwards, avoiding subtractive cancellation. This method normalizes the computed values to ensure accurate relative values.

:p What is the formula used for normalization during downward recursion?
??x
The normalization formula ensures that while the absolute value might not be exact due to initial arbitrary values, the relative values are correct:
\[ j_N^l(x) = \frac{j_c^l(x)}{j_{c0}(x)/j_0^{\text{anal}}(x)} \]

Where \( j_0^{\text{anal}}(x) = \sin x / x \).

This normalization is crucial for maintaining the accuracy of relative values, especially when starting with arbitrary initial values.

:x??

---


#### Stability and Convergence
Background context: The stability and convergence of Bessel function calculations are crucial for accurate results. Using downward recursion starting from a large \( l = L \) can help reduce numerical errors, but both methods need to be tested for different values of \( x \).

:p What is the reason that certain values of \( x \) might give similar answers using both upward and downward recursions?
??x
For certain values of \( x \), both upward and downward recursions may give similar answers because the admixture of small errors in numerical computations can be minimized when the functions are well-behaved. Additionally, for some specific ranges of \( x \), the relative differences between the functions might not be significant.

:x??

---


#### Implementation: Bessel.py
Background context: The provided code snippet is a Python implementation using Visual Python (VP) to determine spherical Bessel functions via downward recursion. Modifying this code to include upward recursion can help in comparing both methods.

:p What does the `down` function do in the Bessel.py code?
??x
The `down` function calculates the spherical Bessel function \( j_l(x) \) using downward recursion, starting from a large value \( l = L \). It initializes the array and uses recurrence relations to compute the values step by step.

```python
def down(x, n, m):
    # Method down, recurs downward
    j = zeros((start + 2), float)
    j[m+1] = j[m] = 1.0  # Start with anything
    for k in range(m, 0, -1):
        j[k-1] = ((2 * k + 1) / x) * j[k] - j[k+1]
    scale = (sin(x)/x) / j[0]  # Scale solution to known j[0]
    return j[n] * scale
```

:x??

---


#### Scaling Pseudorandom Numbers
To generate pseudorandom numbers in a specific range [A, B], you can scale the generated random numbers \( r_i \) by dividing them by \( M \) and then multiplying by the desired range:
\[ x_i = A + (B - A) \cdot r_i, 0 \leq r_i \leq 1. \]

:p How do you generate pseudorandom numbers in a specific range [A, B]?
??x
To generate pseudorandom numbers in a specific range [A, B], you scale the generated random numbers \( r_i \) by dividing them by \( M \) and then multiplying by the desired range:
\[ x_i = A + (B - A) \cdot r_i, 0 \leq r_i \leq 1. \]

For example, if you want to generate pseudorandom numbers in the range [0, 1] from a sequence of integers generated using \( M = 9 \):
\[ x_1 = 3/9 = 0.333, \]
\[ x_2 = 4/9 = 0.444, \]
\[ x_3 = 8/9 = 0.889, \]
and so on.

To generate a number in the range [5, 10]:
```python
A = 5
B = 10
r_sequence = [0.333, 0.444, 0.889, 0.667, 0.778, 0.222, 0.000, 0.111, 0.555, 0.333]
x_sequence = [A + (B - A) * r for r in r_sequence]

print(x_sequence)  # Output: [5.333, 6.444, 9.889, 7.667, 8.778, 5.222, 5.000, 5.111, 7.555, 5.333]
```
x??

---

