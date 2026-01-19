# High-Quality Flashcards: 10A008---Computational-Physics---Rubin-H_-Landau_processed (Part 7)


**Starting Chapter:** 4.4 Testing and Generating Random Distributions

---


#### Testing Random Number Generators: Scatter Plot

Background context explaining the concept. An effective test for randomness involves making a scatter plot of `(xi = r2i, yi = r2i+1)` for many values of `i`. If points show noticeable regularity, the sequence is not random. Random points should uniformly fill a square with no discernible pattern.

If applicable, add code examples with explanations.
:p How do you create an effective test for randomness using a scatter plot?
??x
Create a scatter plot where each point is `(xi = r2i, yi = r2i+1)` for many values of `i`. If the points are randomly distributed and form a uniform cloud without any discernible pattern, the sequence is considered random.
x??

---


#### Testing Random Number Generators: kth Moment

Background context explaining the concept. A simple test of uniformity involves evaluating the `k`-th moment of a distribution using the formula:

$$\langle x^k \rangle = \frac{1}{N} \sum_{i=1}^{N} x_i^k$$

If the numbers are distributed uniformly, then the `k`-th moment is approximately given by:
$$\langle x^k \rangle \approx \int_0^1 dx \, x^k P(x) \approx \frac{1}{k+1} + O\left(\frac{1}{\sqrt{N}}\right)$$

If the deviation from this formula varies as $1/\sqrt{N}$, then you know that the distribution is random because this result derives from assuming randomness.

:p How do you test uniformity using the k-th moment?
??x
Evaluate the `k`-th moment of a distribution with:

$$\langle x^k \rangle = \frac{1}{N} \sum_{i=1}^{N} x_i^k$$

If the numbers are uniformly distributed, then:
$$\langle x^k \rangle \approx \frac{1}{k+1} + O\left(\frac{1}{\sqrt{N}}\right)$$

If the deviation from this formula varies as $1/\sqrt{N}$, it indicates randomness in the distribution.
x??

---


#### Testing Random Number Generators: Near-Neighbor Correlation

Background context explaining the concept. Another simple test determines the near-neighbor correlation in your random sequence by taking sums of products for small `k`:

$$C(k) = \frac{1}{N} \sum_{i=1}^{N} x_i x_{i+k}, \quad (k=1,2,\ldots)$$

If points are not correlated, the correlation function should be close to zero.

:p How do you determine near-neighbor correlations in a random sequence?
??x
Calculate the near-neighbor correlation by taking sums of products for small `k`:
$$

C(k) = \frac{1}{N} \sum_{i=1}^{N} x_i x_{i+k}, \quad (k=1,2,\ldots)$$

If points are not correlated, the correlation function should be close to zero. This test helps identify any regularity in the sequence.
x??

---


#### Radioactive Decay Simulation: Slopes and Proportional Relationships

Background context explaining the concept. Create plots to show that the slopes of `N(t)` versus time are independent of `N(0)`, and another showing that the slopes are proportional to the value for λ.

:p How do you create a plot showing the independence of slopes from N(0)?
??x
To show that the slopes of `N(t)` versus time are independent of `N(0)`, plot the logarithm of `N(t)` (i.e., `ln(N(t))`) against time. The slope should be constant, reflecting a linear relationship indicative of exponential decay.

Example code in Python:
```python
import numpy as np

# Example data: N_t = [N0 * exp(-lambda*t) for t in range(T+1)]
t = [i for i in range(10)]  # Time steps
N0, lambda_val = 100, 0.3  # Initial number and decay rate
N_t = [N0 * (np.exp(-lambda_val * i)) for i in t]

plt.plot(t, np.log(N_t), label='ln N(t)')
plt.xlabel('Time')
plt.ylabel('Logarithmic Values')
plt.legend()
plt.show()
```
x??

---


#### Radioactive Decay Simulation: Proportional Relationship

Background context explaining the concept. Create a plot showing that within expected statistical variations, `ln(N(t))` and `ln(ΔN(t)/Δt)` are proportional.

:p How do you create a plot showing the proportional relationship between ln(N(t)) and ln(ΔN(t)/Δt)?
??x
To show the proportional relationship between `ln(N(t))` and `ln(ΔN(t)/Δt)`, plot both quantities against each other. The slope should be constant, reflecting the proportionality.

Example code in Python:
```python
import numpy as np

# Example data: N_t = [N0 * exp(-lambda*t) for t in range(T+1)]
t = [i for i in range(10)]  # Time steps
N0, lambda_val = 100, 0.3  # Initial number and decay rate
N_t = [N0 * (np.exp(-lambda_val * i)) for i in t]

# Calculate dN/dt and ln(dN/dt)
dNdtdNdt = [(N_t[i+1] - N_t[i]) / dt for i in range(len(N_t)-1)]
ln_dNdt = [np.log(abs(x)) for x in dNdtdNdt]

plt.plot(np.log(N_t[:-1]), ln_dNdt, label='Proportional Relationship')
plt.xlabel('ln N(t)')
plt.ylabel('ln(ΔN(t)/Δt)')
plt.legend()
plt.show()
```
x??

---


#### Radioactive Decay Simulation: Explanation of Proportionality

Background context explaining the concept. The proportional relationship between `ln(N(t))` and `ln(ΔN(t)/Δt)` is a fundamental aspect of radioactive decay, reflecting the exponential nature of the process.

:p Explain the significance of the proportional relationship in radioactive decay.
??x
The proportional relationship between `ln(N(t))` and `ln(ΔN(t)/Δt)` indicates that the logarithm of the number of atoms left at time `t` (`ln(N(t))`) is directly proportional to the logarithm of the rate of change of this number (i.e., `ln(ΔN(t)/Δt)`). This relationship arises because radioactive decay follows an exponential law, where the rate of decay is proportional to the current number of atoms. Thus, a constant slope in such plots confirms the validity and consistency of the exponential decay model.
x??

--- 

These flashcards cover key concepts from the provided text, focusing on testing random number generators and simulating radioactive decay with relevant explanations and code examples where applicable.

---


#### Forward Difference Algorithm
Background context explaining the concept. The forward difference algorithm is a method for approximating derivatives of numerical data using finite differences, derived from Taylor series expansions. It uses two points to approximate the derivative by fitting a straight line between them.

The exact formula is given by:
$$\frac{dy(t)}{dt} ||| fd \approx \frac{y(t+h) - y(t)}{h}$$

If we ignore higher-order terms, this approximation has an error proportional to $h$. The error can be estimated as follows:

If $y(t) = a + bt^2$, the exact derivative is:
$$y' = 2bt$$

The computed derivative using forward difference is:
$$\frac{dy(t)}{dt} ||| fd \approx \frac{y(t+h) - y(t)}{h} = 2bt + bh$$

This becomes a good approximation only for small $h \ll 1/b$.

:p What is the formula used in the forward difference algorithm?
??x
The formula used in the forward difference algorithm to approximate the derivative of a function $y(t)$ at time $t$:
$$\frac{dy(t)}{dt} ||| fd = \frac{y(t+h) - y(t)}{h}$$x??

---


#### Central Difference Algorithm
Background context explaining the concept. The central difference algorithm provides a more accurate approximation to the derivative compared to the forward difference by stepping both forward and backward half a step, effectively using three points (two on each side of $t$).

The formula is:
$$\frac{dy(t)}{dt} ||| cd = \frac{y(t+h/2) - y(t-h/2)}{h}$$

The error in this approximation can be estimated by substituting the Taylor series expansions for $y(t+h/2)$ and $y(t-h/2)$:
$$\frac{dy(t)}{dt} ||| cd \approx y'(t) + \frac{1}{24} h^2 y'''(t) + O(h^4)$$

This error is of the order $O(h^2)$, making it more accurate than the forward difference, which is only of the order $ O(h)$.

:p What is the formula for the central difference algorithm?
??x
The formula used in the central difference algorithm to approximate the derivative of a function $y(t)$:
$$\frac{dy(t)}{dt} ||| cd = \frac{y(t+h/2) - y(t-h/2)}{h}$$x??

---


#### Extrapolated Difference Algorithm
Background context explaining the concept. The extrapolated difference algorithm improves upon existing algorithms by combining them in a way that reduces errors. One such combination is using both half-step and quarter-step central differences.

For instance, the extended difference algorithm uses:
$$\frac{dy(t)}{dt} ||| ed = \frac{4 D_{cd}(y(t, h/2)) - D_{cd}(y(t, h))}{3}$$

Where $D_{cd}$ represents the central-difference algorithm. This eliminates lower-order terms and provides a more accurate derivative.

If $h=0.4 $ and$y^{(5)} \approx 1$, then there will be only one significant term left in the error expansion, making it very precise for higher derivatives of low order polynomials.

:p What is the formula for the extended difference algorithm?
??x
The formula used in the extended difference algorithm to approximate the derivative of a function $y(t)$:
$$\frac{dy(t)}{dt} ||| ed = \frac{4 D_{cd}(y(t, h/2)) - D_{cd}(y(t, h))}{3}$$x??

---

---


#### Central Difference for Second Derivatives
Background context: The central difference method is used to approximate the second derivative of a function $y(t)$. It involves calculating the first derivative at points $ t + h/2$and $ t - h/2$, and then using these values to find the second derivative. This method is more accurate than forward differences, but it can suffer from additional subtractive cancellations.

:p What is the central difference formula for the second derivative?
??x
The central difference formula for the second derivative of a function $y(t)$ at point $ t $ using step size $h$ is:

$$\frac{d^2y}{dt^2} \bigg|_{t} \approx \frac{y(t + h/2) - y(t - h/2)}{h}$$

This can be further simplified to:
$$\frac{d^2y}{dt^2} \bigg|_{t} \approx \frac{y(t + h) + y(t - h) - 2y(t)}{h^2}$$

The latter form is more compact and requires fewer steps, but it might increase subtractive cancellation by first storing the "large" number $y(t + h/2) + y(t - h/2)$ and then subtracting another large number $2y(t)$.

??x
```java
public class SecondDerivative {
    public double centralDifferenceSecondDerivative(double[] y, int tIndex, double h) {
        int tPlusHalf = tIndex + (int)(h / 2);
        int tMinusHalf = tIndex - (int)(h / 2);
        
        // Central difference formula
        return (y[tPlusHalf] - y[tMinusHalf]) / h;
    }
}
```
x??

---


#### Extrapolated Difference for Second Derivative
Background context: To improve accuracy, the central difference method can be extended to include more points. This involves using a combination of forward and backward differences at smaller step sizes to extrapolate the second derivative.

:p What is the formula for the extrapolated difference approximation of the second derivative?
??x
The formula for the extrapolated difference approximation of the second derivative of a function $y(t)$ at point $ t $ using step size $ h/4 $ and $h/2$ is:

$$\frac{d^2y}{dt^2} \bigg|_{t} \approx \frac{8(y(t + h/4) - y(t - h/4)) - (y(t + h/2) - y(t - h/2))}{3h}$$

This method is more accurate but requires evaluating the function at multiple points.

??x
```java
public class SecondDerivative {
    public double extrapolatedDifferenceSecondDerivative(double[] y, int tIndex, double h) {
        int hQuarter = tIndex + (int)(h / 4);
        int hHalf = tIndex + (int)(h / 2);

        // Extrapolated difference formula
        return (8 * (y[hQuarter] - y[tIndex - hQuarter]) - (y[hHalf] - y[tIndex - hHalf])) / (3 * h);
    }
}
```
x??

---


#### Error Analysis for Numerical Differentiation
Background context: The accuracy of numerical differentiation methods depends on the step size $h$. The approximation error decreases with a smaller step size, but round-off errors increase. A balance must be found where the sum of application and round-off errors is minimized.

:p What are the formulas for the approximation and round-off errors in numerical differentiation?
??x
The formulas for the approximation and round-off errors in numerical differentiation are as follows:

- For forward difference:
  $$\epsilon_{fd, app} \approx \frac{y''(h^2)}{2}$$- For central difference:
$$\epsilon_{cd, app} \approx \frac{y'''(h^2)}{24}$$

The round-off error is estimated as:
$$\epsilon_{ro} \approx \frac{\epsilon_m}{h}$$

Where $\epsilon_m$ is the machine precision.

To find the optimal step size, we equate the approximation and round-off errors:
$$\epsilon_{ro} = \epsilon_{fd, app} \Rightarrow \frac{\epsilon_m}{h} = \frac{y''(h^2)}{2}$$
$$h_{fd} \approx 4 \times 10^{-8}$$

And for central difference:
$$\epsilon_{ro} = \epsilon_{cd, app} \Rightarrow \frac{\epsilon_m}{h} = \frac{y'''(h^2)}{24}$$
$$h_{cd} \approx 3 \times 10^{-5}$$

These step sizes show that the central difference method can use a larger step size while maintaining accuracy.

??x
```java
public class ErrorAnalysis {
    public double optimalStepSize(double yDoublePrime, double yTriplePrime) {
        final double epsilonM = 1e-15;
        
        // Forward difference
        double hFd = Math.sqrt(2 * epsilonM / yDoublePrime);
        
        // Central difference
        double hCd = Math.cbrt(24 * epsilonM / yTriplePrime);
        
        return new double[]{hFd, hCd};
    }
}
```
x??

---


#### Programming Numerical Differentiation
Background context: Implementing numerical differentiation involves evaluating the function at specific points and using difference formulas to approximate derivatives. The accuracy of these approximations depends on the step size $h$, which needs to be chosen carefully.

:p How would you implement forward, central, and extrapolated difference methods in a program?
??x
The implementation of forward, central, and extrapolated difference methods involves evaluating the function at specific points and applying the respective formulas. Here’s how it can be done:

- **Forward Difference**:
  $$d^2y/dt^2(t) \approx \frac{y(t + h) - y(t)}{h}$$- **Central Difference**:
$$d^2y/dt^2(t) \approx \frac{y(t + h/2) - y(t - h/2)}{h}$$- **Extrapolated Difference**:
$$d^2y/dt^2(t) \approx \frac{8(y(t + h/4) - y(t - h/4)) - (y(t + h/2) - y(t - h/2))}{3h}$$:p What is the code for implementing these methods in Java?
??x
```java
public class NumericalDifferentiation {
    public double forwardDifferenceSecondDerivative(double[] y, int tIndex, double h) {
        int hHalf = tIndex + (int)(h / 2);
        return (y[hHalf] - y[tIndex]) / h;
    }

    public double centralDifferenceSecondDerivative(double[] y, int tIndex, double h) {
        int hHalf = tIndex + (int)(h / 2);
        int hMinus = tIndex - (int)(h);
        return (y[hHalf] - y[hMinus]) / h;
    }

    public double extrapolatedDifferenceSecondDerivative(double[] y, int tIndex, double h) {
        int hQuarter = tIndex + (int)(h / 4);
        int hHalf = tIndex + (int)(h / 2);

        return (8 * (y[hQuarter] - y[tIndex - hQuarter]) - (y[hHalf] - y[tIndex - hHalf])) / (3 * h);
    }
}
```
x??

---


#### Testing Numerical Differentiation
Background context: To test the numerical differentiation methods, we need to evaluate their accuracy for different step sizes $h$. The goal is to find the smallest step size where the error equals machine precision.

:p How would you test the forward, central, and extrapolated difference methods in practice?
??x
To test the forward, central, and extrapolated difference methods, follow these steps:

1. **Define the function**: Use a known function like $\cos(t)$.
2. **Evaluate derivatives**: Compute the exact derivative of the function at specific points.
3. **Calculate approximations**: Use the numerical differentiation methods to approximate the second derivative.
4. **Compare errors**: Print out the derivative and its relative error as functions of $h $. Reduce the step size $ h$ until the error equals machine precision.

:p What is an example of how to test these methods in a program?
??x
```java
public class TestNumericalDifferentiation {
    public void testDerivatives() {
        double[] y = new double[1024];
        for (int i = 0; i < y.length; i++) {
            y[i] = Math.cos(i * Math.PI / 512); // Evaluate cos(t) at discrete points
        }

        NumericalDifferentiation nd = new NumericalDifferentiation();
        double tIndex = 512; // Index corresponding to t = π/2

        for (double h = Math.PI / 10; ; h /= 10) {
            double fd = nd.forwardDifferenceSecondDerivative(y, tIndex, h);
            double cd = nd.centralDifferenceSecondDerivative(y, tIndex, h);
            double ed = nd.extrapolatedDifferenceSecondDerivative(y, tIndex, h);

            System.out.println("h: " + h);
            System.out.println("Forward Difference: " + fd);
            System.out.println("Central Difference: " + cd);
            System.out.println("Extrapolated Difference: " + ed);

            // Check if the error is close to machine precision
            if (Math.abs(fd - (-y[tIndex])) < 1e-6 && Math.abs(cd - (-y[tIndex])) < 1e-6 && Math.abs(ed - (-y[tIndex])) < 1e-6) {
                break;
            }
        }
    }
}
```
x??

---

