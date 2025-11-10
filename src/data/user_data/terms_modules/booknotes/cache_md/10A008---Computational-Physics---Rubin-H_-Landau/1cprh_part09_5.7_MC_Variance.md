# High-Quality Flashcards: 10A008---Computational-Physics---Rubin-H_-Landau_processed (Part 9)


**Starting Chapter:** 5.7 MC Variance Reduction

---


#### Monte Carlo Integration for N-Dimensional Integrals
Background context: When performing multidimensional integrations, especially with a large number of dimensions (N), traditional numerical integration methods can become computationally expensive or impractical. The Monte Carlo method offers an alternative that is more efficient as the dimensionality increases.

Relevant formulas and explanations:
- Standard deviation of the integral value after N samples: \(\sigma_I \approx \frac{\sigma_f}{\sqrt{N}}\) for normal distributions.
- For a 36-dimensional integration with \(64^2\) points in each dimension, the total number of evaluations would be approximately \(10^{65}\).

:p What is the error reduction rate for Monte Carlo integration as N increases?
??x
The error in Monte Carlo integration decreases at a rate of \(1/\sqrt{N}\). This means that doubling the number of samples reduces the relative error by about 41%.

```java
// Pseudocode to simulate Monte Carlo Integration
public class MonteCarloIntegration {
    public static double integrate(double[] limits, int dimensions, int N) {
        double volume = 1.0; // Volume of integration space
        for (double limit : limits) {
            volume *= (limit - 0); // Assuming the lower limit is 0 for simplicity
        }

        double sum = 0;
        Random random = new Random();
        for (int i = 0; i < N; i++) {
            double[] samplePoint = new double[dimensions];
            for (int j = 0; j < dimensions; j++) {
                samplePoint[j] = random.nextDouble() * limits[j]; // Generate a random point
            }
            sum += f(samplePoint); // Function value at the sampled point
        }

        return volume * (sum / N); // Estimate of integral
    }

    private static double f(double[] x) {
        double sum = 0;
        for (double xi : x) {
            sum += xi;
        }
        return sum * sum; // Example function: sum of coordinates squared
    }
}
```
x??

---


#### Error Analysis in High-Dimensional Integration
Background context: The relative error in Monte Carlo integration decreases as \(1/\sqrt{N}\), which means that the method is more advantageous for higher dimensions compared to traditional methods like Simpson's rule, where the number of points per dimension would decrease with increasing dimensionality.

Relevant formulas and explanations:
- For a 3-dimensional integral using Monte Carlo, the error could be comparable to other integration schemes when \(D \approx 3 - 4\).
- For higher dimensions (larger D), Monte Carlo becomes more accurate due to its statistical nature.

:p How does the number of points per dimension change in high-dimensional integrals for both Monte Carlo and traditional methods?
??x
In Monte Carlo, the number of points remains relatively constant as \(N\) increases, leading to a decrease in error rate \(1/\sqrt{N}\). In contrast, for traditional methods like Simpson's rule, the number of points per dimension decreases with increasing dimensionality (D), making them less effective.

```java
// Pseudocode comparing Monte Carlo and Simpson's Rule
public class IntegrationComparision {
    public static double monteCarloIntegration(double[] limits, int dimensions, int N) {
        // As explained in the previous card.
    }

    public static double simpsonsRule1D(double a, double b, int points) {
        double h = (b - a) / (points - 1);
        double sum = f(a) + f(b);
        for (int i = 1; i < points - 1; i++) {
            if ((i % 2) == 0) { // Even terms
                sum += 2 * f(a + i * h);
            } else { // Odd terms
                sum += 4 * f(a + i * h);
            }
        }
        return (h / 3.0) * sum;
    }

    public static double simpsonsRuleND(double[] limits, int dimensions, int pointsPerDim) {
        double volume = 1.0; // Volume of integration space
        for (double limit : limits) {
            volume *= (limit - 0);
        }
        return volume * simpsonsRule1D(0, 1, pointsPerDim); // Simplified 1D example
    }
}
```
x??

---


#### 10-Dimensional Monte Carlo Integration Implementation
Background context: To evaluate a high-dimensional integral using Monte Carlo, we need to generate random samples in the multidimensional space and compute their function values. This process is particularly useful for large dimensions where traditional methods become computationally expensive.

Relevant formulas and explanations:
- For a 10D integral \(I = \int_0^1 dx_1 \cdots dx_{10} (x_1 + x_2 + \cdots + x_{10})^2\), the goal is to estimate its value using Monte Carlo.

:p What is the objective of this implementation?
??x
The objective is to evaluate the 10-dimensional integral \(I = \int_0^1 dx_1 \cdots dx_{10} (x_1 + x_2 + \cdots + x_{10})^2\) using Monte Carlo integration, which involves generating random points in a 10D space and computing the function value at each point.

```java
// Pseudocode for 10-Dimensional Monte Carlo Integration
public class TenDimensionalIntegration {
    public static double tenDimensionalMonteCarloIntegration(int N) {
        double volume = Math.pow(1.0, 10); // Volume of the unit hypercube in 10D

        Random random = new Random();
        double sum = 0;
        for (int i = 0; i < N; i++) {
            double[] samplePoint = new double[10];
            for (int j = 0; j < 10; j++) {
                samplePoint[j] = random.nextDouble(); // Generate a point in the unit hypercube
            }
            sum += f(samplePoint); // Function value at the sampled point
        }

        return volume * (sum / N); // Estimate of integral
    }

    private static double f(double[] x) {
        double sum = 0;
        for (double xi : x) {
            sum += xi;
        }
        return Math.pow(sum, 2); // Example function: sum of coordinates squared
    }
}
```
x??

---


#### Comparison with Analytic Solution
Background context: After performing the Monte Carlo integration, it is important to check if the numerical result matches the known analytic solution. This ensures the correctness and accuracy of the method.

Relevant formulas and explanations:
- The expected value for a 10-dimensional integral \(I = \int_0^1 dx_1 \cdots dx_{10} (x_1 + x_2 + \cdots + x_{10})^2\) is known to be 155/6.

:p How do you verify the correctness of your Monte Carlo integration result?
??x
To verify the correctness, compare the numerical result obtained from Monte Carlo integration with the known analytic solution \(I = \frac{155}{6}\).

```java
// Pseudocode for verifying the result
public class Verification {
    public static void main(String[] args) {
        int N = 100000; // Number of samples
        double monteCarloResult = tenDimensionalMonteCarloIntegration(N);
        System.out.println("Monte Carlo Result: " + monteCarloResult);

        double analyticSolution = 155.0 / 6;
        System.out.println("Analytic Solution: " + analyticSolution);

        // Check the difference between Monte Carlo result and analytic solution
        double error = Math.abs(monteCarloResult - analyticSolution);
        System.out.println("Error: " + error);
    }
}
```
x??

---

---


#### Monte Carlo Integration Overview
Background context: Monte Carlo integration is a numerical method for estimating definite integrals using random sampling. It's particularly useful when traditional methods like Simpson's rule or Gaussian quadrature are difficult to apply due to high dimensions or complex functions.

:p What is Monte Carlo integration?
??x
Monte Carlo integration uses random sampling to estimate the value of an integral. The process involves generating points within the domain of integration and using these points to approximate the area under a curve.
x??

---


#### 10D Monte Carlo Integration with Random Sampling
Background context: Performing Monte Carlo integration in higher dimensions (such as 10D) requires careful sampling techniques due to the curse of dimensionality. The goal is to estimate the integral by averaging over many trials.

:p How can you perform a 10D Monte Carlo integration using random numbers?
??x
To perform a 10D Monte Carlo integration, generate points randomly within the 10-dimensional space and evaluate the function at these points. Repeat this process for multiple trials (e.g., 16) and take the average as the final result.

```python
import numpy as np

def monte_carlo_integration(f, dim, N, trials):
    error_sum = 0
    for _ in range(trials):
        points = np.random.rand(N, dim)
        integral = np.mean([f(point) for point in points])
        error_sum += (integral - f(np.ones(dim)))**2
    
    average_error = error_sum / trials
    return average_error

# Example usage:
def integrand(x): 
    return x[0]**2 + 2*x[1]**3

result = monte_carlo_integration(integrand, 10, 8192, 16)
print(result)
```
x??

---


#### Variance Reduction in Monte Carlo Integration
Background context: Variance reduction techniques aim to improve the accuracy of Monte Carlo integration by reducing the variance of the random samples. This is crucial for functions with rapid variations.

:p What are variance reduction techniques in Monte Carlo integration?
??x
Variance reduction techniques involve transforming the integrand into a function that has a smaller variance, making it easier to integrate accurately. This can be achieved by constructing a simpler function close to the original one or by using importance sampling.

```python
def variance_reduction(f, g, w):
    integral = 0
    for _ in range(1000):  # Number of trials
        x = np.random.rand()
        integral += (f(x) - g(x)) * w(x)
    
    return integral

# Example usage:
def f(x): 
    return x**2 + np.sin(5*x)

def g(x):
    return x**3

def w(x):
    return 1 / (g(x) - f(x))

result = variance_reduction(f, g, w)
print(result)
```
x??

---


#### Importance Sampling in Monte Carlo Integration
Background context: Importance sampling is a method to improve the efficiency of Monte Carlo integration by focusing on regions where the integrand has higher values. This technique involves sampling from a distribution that matches the shape of the integrand.

:p What is importance sampling?
??x
Importance sampling is a variance reduction technique in Monte Carlo integration where samples are drawn from a probability distribution that gives more weight to important regions, thus reducing variance and improving accuracy.

```python
def importance_sampling(f, q, w, N):
    sample = np.random.normal(size=N)
    weights = [w(x) for x in sample]
    integral = sum([f(x) * w(x) / q.pdf(x) for x in sample]) / N
    
    return integral

# Example usage:
from scipy.stats import norm
import numpy as np

def f(x):
    return x**2 + 2*np.sin(3*x)

q = norm(loc=0, scale=1)
w = lambda x: q.pdf(x) * (x**2 + 2*np.sin(3*x))

result = importance_sampling(f, q, w, 10000)
print(result)
```
x??

---


#### Graphical Representation of Monte Carlo Integration
Background context: The provided code demonstrates a graphical approach to Monte Carlo integration using the von Neumann rejection method. This method involves plotting the function and randomly generating points within a bounding box.

:p How does the graphically represented Monte Carlo integration work?
??x
The method generates random points within a predefined area (usually a rectangle) and counts how many fall under the curve of the integrand. The ratio of accepted points to total points gives an estimate of the integral's value.

```python
import numpy as np

def monte_carlo_integration_graphically(f, min_val, max_val, N):
    count = 0
    for _ in range(N):
        x = np.random.uniform(min_val, max_val)
        y = f(x) + np.random.uniform(0, f(x))
        
        if y <= f(x):
            count += 1
    
    area = (max_val - min_val) * f(max_val)
    estimated_integral = area * count / N
    return estimated_integral

# Example usage:
def f(x): 
    return x**2 + np.sin(5*x)

result = monte_carlo_integration_graphically(f, 0, 10, 10000)
print(result)
```
x??

---


#### Gaussian Quadrature vs. Monte Carlo Integration
Background context: Gaussian quadrature is a deterministic method for numerical integration that uses weighted sums of function values at specific points. In contrast, Monte Carlo methods rely on random sampling.

:p How does Gaussian quadrature differ from Monte Carlo integration?
??x
Gaussian quadrature approximates the integral by evaluating the integrand at specific points (nodes) and multiplying these evaluations by weights. These nodes are chosen to maximize the accuracy of the approximation for polynomials up to a certain degree. In contrast, Monte Carlo integration uses random sampling across the entire domain.

```python
from scipy.integrate import quad

def gaussian_quadrature(f, a, b):
    result, error = quad(f, a, b)
    return result

# Example usage:
def f(x): 
    return x**2 + 2*np.sin(3*x)

result = gaussian_quadrature(f, 0, 10)
print(result)
```
x??

---


#### Summary of Concepts

---


#### Key Points Recap
- **Monte Carlo Integration**: Uses random sampling to estimate integrals.
- **Variance Reduction Techniques**: Reduce variance by transforming the function or using importance sampling.
- **Importance Sampling**: Focuses on regions where the integrand has higher values.
- **Graphical Monte Carlo**: Visually represents the process of estimating an integral.

:p What are the key concepts covered in this flashcard set?
??x
The key concepts covered include:
- The basics of Monte Carlo integration and its application.
- Variance reduction techniques such as importance sampling.
- Graphical representation of Monte Carlo methods through rejection sampling.
- Comparison with deterministic methods like Gaussian quadrature.

These concepts help in understanding different ways to approach numerical integration, especially in complex or high-dimensional scenarios.
x??

---


#### Quantum Bound States I
Background context: The problem involves finding the energies of a particle bound within a 1D square well. The potential \( V(x) \) is defined as:
\[ V(x) = \begin{cases} 
-10, & \text{for } |x| \leq a \\
0, & \text{for } |x| > a
\end{cases} \]

The energies of the bound states \( E_B < 0 \) are solutions to transcendental equations given by:
\[ \sqrt{10 - E_B} \tan(\sqrt{10 - E_B}) = \sqrt{E_B} \quad (\text{even}), \]
\[ \sqrt{10 - E_B} \cot(\sqrt{10 - E_B}) = \sqrt{E_B} \quad (\text{odd}). \]

:p What are the transcendental equations used to find the bound states energies in a 1D square well?
??x
The transcendental equations used to find the bound state energies in a 1D square well are:
\[ \sqrt{10 - E_B} \tan(\sqrt{10 - E_B}) = \sqrt{E_B} \quad (\text{even}), \]
\[ \sqrt{10 - E_B} \cot(\sqrt{10 - E_B}) = \sqrt{E_B} \quad (\text{odd}). \]
x??

---


#### Bisection Search Algorithm
Background context: The bisection search algorithm is a reliable but slow trial-and-error method that finds roots of functions by repeatedly dividing intervals in half and selecting subintervals where the function changes sign.

:p What is the basis of the bisection algorithm?
??x
The basis of the bisection algorithm involves starting with an interval \([x_-, x_+]\) where \(f(x_-)\) and \(f(x_+)\) have opposite signs. The algorithm repeatedly divides this interval in half, choosing the subinterval where the function changes sign until a root is found within a desired precision.

```python
def bisection(f, a, b, tol):
    if f(a) * f(b) > 0:
        print("f(a) and f(b) do not have opposite signs")
        return None
    
    c = a
    while (b - a) / 2.0 > tol:
        c = (a + b) / 2.0
        if f(c) == 0:
            break
        if f(a) * f(c) < 0:
            b = c
        else:
            a = c
    
    return c
```
x??

---


#### Bisection Search in Practice: Finding Bound States Energies
Background context: Given the function \( \sqrt{10 - E_B} \tan(\sqrt{10 - E_B}) - \sqrt{E_B} = 0 \) for even wave functions, and \( \sqrt{10 - E_B} \cot(\sqrt{10 - E_B}) - \sqrt{E_B} = 0 \) for odd wave functions. The algorithm starts with an interval where the function changes sign.

:p How do you apply the bisection search to find bound state energies?
??x
To apply the bisection search, start by finding an initial interval \([a, b]\) where \( f(a) < 0 \) and \( f(b) > 0 \). For example:
1. Evaluate \(f(0)\) and \(f(10)\):
   - If \(f(0) = 3\) (positive) and \(f(10) = -2\) (negative), then choose the interval \([0, 10]\).
   
2. Compute the midpoint \(c = (a + b) / 2\). Check if \(f(c)\) is close to zero or changes sign.

3. Repeat this process:
   - If \(f(a) * f(c) < 0\), then the root lies between \(a\) and \(c\).
   - Otherwise, it lies between \(c\) and \(b\).

4. Continue until \(|b - a|\) is less than the desired tolerance.

Example in Python:
```python
def bisection(f, a, b, tol):
    if f(a) * f(b) > 0:
        print("f(a) and f(b) do not have opposite signs")
        return None
    
    c = a
    while (b - a) / 2.0 > tol:
        c = (a + b) / 2.0
        if abs(f(c)) < tol:
            break
        if f(a) * f(c) < 0:
            b = c
        else:
            a = c
    
    return c

# Example function for even wave functions
def f_even(x):
    return (10 - x) ** 0.5 * tan((10 - x) ** 0.5) - (x ** 0.5)

bound_state_energy_even = bisection(f_even, 0, 10, 1e-6)
```
x??

---

---

