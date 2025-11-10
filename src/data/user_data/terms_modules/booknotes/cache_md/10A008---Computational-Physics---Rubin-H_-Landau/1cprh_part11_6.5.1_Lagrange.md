# High-Quality Flashcards: 10A008---Computational-Physics---Rubin-H_-Landau_processed (Part 11)


**Starting Chapter:** 6.5.1 Lagrange Fitting. 6.5.2 Cubic Spline Interpolation

---


#### Lagrange Interpolation Concept
Background context: The task involves performing an n-point Lagrange interpolation on experimental neutron scattering data. The goal is to fit nine data points with an 8th-degree polynomial and then use this fit to plot the cross section at intervals of 5 MeV. This process helps in deducing resonance energy \( E_r \) and full width at half-maximum \( \Gamma \).

:p What is Lagrange interpolation, and why is it used for fitting data?
??x
Lagrange interpolation is a method used to construct a polynomial that passes through a given set of points. It's particularly useful when you have discrete data points and want to estimate the function value between these points. The formula for the n-point Lagrange interpolating polynomial \( P_n(x) \) is given by:
\[ P_n(x) = \sum_{j=0}^{n} y_j \ell_j(x), \]
where
\[ \ell_j(x) = \prod_{\substack{0 \leq m \leq n \\ m \neq j}} \frac{x - x_m}{x_j - x_m}. \]

This method ensures that the polynomial passes through all the given data points \( (x_i, y_i) \). The 8th-degree polynomial is used because it has 9 coefficients and fits nine data points exactly.

```java
public class LagrangeInterpolation {
    public double lagrangePolynomial(double[] xValues, double[] yValues, double x) {
        int n = xValues.length;
        double result = 0.0;

        for (int i = 0; i < n; i++) {
            double term = yValues[i];
            for (int j = 0; j < n; j++) {
                if (i != j) {
                    term *= (x - xValues[j]) / (xValues[i] - xValues[j]);
                }
            }
            result += term;
        }

        return result;
    }
}
```

The code calculates the Lagrange polynomial for a given set of \( x \)-values and interpolates at point \( x \). 
x??

---


#### Fitting Experimental Data with Lagrange Interpolation
Background context: The objective is to fit an 8th-degree polynomial through nine data points from Table 6.1, using the provided experimental neutron scattering data. This involves writing a subroutine that performs this interpolation and plotting the results in steps of 5 MeV.

:p How do you perform Lagrange interpolation for fitting all nine data points with an 8th-degree polynomial?
??x
To fit all nine data points with an 8th-degree polynomial using Lagrange interpolation, follow these steps:
1. Define the \( x \) and \( y \) values from Table 6.1.
2. Use the Lagrange interpolation formula to construct a polynomial that passes through each of the nine points.
3. Evaluate this polynomial at intervals of 5 MeV to plot the cross section.

Here's an example in Java:
```java
public class DataFitting {
    public double[] lagrangeInterpolate(double[] xValues, double[] yValues) {
        int n = xValues.length;
        double[] coefficients = new double[n];
        
        for (int i = 0; i < n; i++) {
            double term = 1.0;
            for (int j = 0; j < n; j++) {
                if (i != j) {
                    term *= (xValues[i] - xValues[j]) / (yValues[j] - yValues[j]);
                }
            }
            coefficients[i] = term * yValues[i];
        }

        return coefficients;
    }
}
```

The function `lagrangeInterpolate` returns the coefficients of the Lagrange polynomial that fits the data points.
x??

---


#### Determining Resonance Parameters
Background context: After fitting the cross section with an 8th-degree polynomial, determine the resonance energy \( E_r \) and full width at half-maximum \( \Gamma \). Compare these values with theoretical predictions.

:p How do you use Lagrange interpolation to deduce the resonance parameters?
??x
To deduce the resonance parameters using Lagrange interpolation:

1. Fit the 8th-degree polynomial through all nine data points.
2. Evaluate this polynomial at intervals of 5 MeV.
3. Find the position of the peak, which corresponds to \( E_r \).
4. Determine the full width at half-maximum (FWHM) by finding where the polynomial value is half its maximum.

The resonance energy \( E_r \) can be found by locating the maximum value in the interpolated data:
```java
public class PeakFinding {
    public double findPeak(double[] xValues, double[] yValues) {
        int n = xValues.length;
        double maxIndex = 0.0;
        for (int i = 1; i < n - 1; i++) {
            if (yValues[i] > yValues[maxIndex]) {
                maxIndex = i;
            }
        }
        return xValues[maxIndex];
    }
}
```

The full width at half-maximum \( \Gamma \) can be calculated as the distance between two points where the polynomial value is half its maximum:
```java
public class FWHMFinding {
    public double findFWHM(double[] xValues, double peakValue, double[] yValues) {
        int n = xValues.length;
        double leftIndex = 0.0, rightIndex = 0.0;
        
        for (int i = 1; i < n - 1; i++) {
            if (yValues[i] > 0.5 * peakValue) {
                if (leftIndex == 0.0) leftIndex = xValues[i];
                else rightIndex = xValues[i];
            }
        }
        
        return rightIndex - leftIndex;
    }
}
```

These methods help in identifying \( E_r \) and \( \Gamma \).
x??

---


#### Three-Point Lagrange Interpolation
Background context: For a more localized interpolation, use three-point Lagrange interpolation to fit the data at intervals of 5 MeV. This is useful for handling end cases differently.

:p How do you perform three-point Lagrange interpolation?
??x
Three-point Lagrange interpolation involves fitting cubic polynomials between each pair of points with an additional point in between. For a set of points \( (x_0, y_0) \), \( (x_1, y_1) \), and \( (x_2, y_2) \), the polynomial is given by:
\[ P(x) = \frac{(x - x_1)(x - x_2)}{(x_0 - x_1)(x_0 - x_2)}y_0 + \frac{(x - x_0)(x - x_2)}{(x_1 - x_0)(x_1 - x_2)}y_1 + \frac{(x - x_0)(x - x_1)}{(x_2 - x_0)(x_2 - x_1)}y_2. \]

Here is an example in Java:
```java
public class ThreePointInterpolation {
    public double threePointLagrange(double x, double[] points) {
        int n = points.length / 3;
        double result = 0.0;

        for (int i = 0; i < n; i++) {
            double term = 1.0;
            for (int j = 0; j < n * 2; j++) {
                if (i * 3 + j != x) {
                    term *= (x - points[i * 3 + j]) / (points[x] - points[i * 3 + j]);
                }
            }
            result += term * yValues[i];
        }

        return result;
    }
}
```

This function evaluates the three-point Lagrange polynomial at a given \( x \).
x??

---


#### Extrapolation with Polynomial Fits
Background context: Extrapolating data using high-degree polynomials can lead to serious systematic errors. Instead, use lower-order interpolation or spline fits for more reliable results.

:p What are the potential issues with extrapolating data using high-degree polynomial fits?
??x
Extrapolating data using high-degree polynomial fits can be problematic because:
1. High-degree polynomials tend to oscillate wildly between the given points, leading to unrealistic representations.
2. The fit may not accurately represent the underlying function outside the interpolation interval.

Using a lower-order polynomial or spline fitting methods can mitigate these issues by providing smoother and more reliable extrapolations.

To illustrate, consider using cubic splines which ensure smoothness in both value and derivatives across intervals:
```java
public class CubicSplineInterpolation {
    public double[] calculateCubicSplines(double[] xValues, double[] yValues) {
        // Implementation of cubic spline interpolation
    }
}
```

This function calculates the coefficients for a set of cubic splines that fit the data points.
x??

---


#### Cubic Spline Interpolation Concept
Background context: Cubic spline interpolation fits piecewise cubic polynomials between each pair of points, ensuring continuity in first and second derivatives. This method produces smoother and more visually pleasing curves compared to high-degree polynomial fitting.

:p What is cubic spline interpolation?
??x
Cubic spline interpolation involves constructing a piecewise function where each segment is a cubic polynomial that passes through the given data points. The key advantage of this method is ensuring continuity in both the first and second derivatives across the intervals, leading to a smooth overall curve.

The general form for the cubic polynomial between \( x_i \) and \( x_{i+1} \) is:
\[ g(x) ≃ g_i(x) = g_i + g'_i (x - x_i) + \frac{1}{2}g''_i (x - x_i)^2 + \frac{1}{6}g'''_i (x - x_i)^3. \]

The coefficients \( g_i, g'_i, g''_i, g'''_i \) are determined to ensure the spline fits through the points and is continuous in its derivatives.

```java
public class CubicSpline {
    public double[] calculateCubicSplines(double[] xValues, double[] yValues) {
        // Implementation of cubic spline interpolation
    }
}
```

This function calculates the coefficients for a set of cubic splines that fit the data points.
x??

---

---


#### Data Fitting Equations
Background context: The provided text discusses equations for fitting data using splines, specifically focusing on ensuring continuity of derivatives at interval boundaries. This is important for creating smooth interpolations between points.

:p What are the equations used to match first and second derivatives at each interval's boundaries?
??x
The equations to match the first and second derivatives at each interval’s boundaries are given by:

\[ g_i(x_{i+1}) = g_{i+1}(x_{i+1}), \quad i=1, N-1. \]

This ensures that the function values are continuous across intervals.

For matching the first derivative:
\[ g'_i(x_i) = g'_{i+1}(x_i), \]
which ensures continuity of the first derivatives at each interval’s boundary.

And for the second derivative:
\[ g''_i(x_i) = g''_{i+1}(x_i). \]

These equations ensure that the second derivatives are also continuous across intervals.
x??

---


#### Natural Spline Boundary Conditions
Background context: The text discusses different methods for determining boundary conditions, specifically focusing on natural splines and numerical approximations.

:p What are the characteristics of a natural spline?
??x
A natural spline is defined by setting the second derivatives at the endpoints to zero:

\[ g''(a) = 0 \quad \text{and} \quad g''(b) = 0. \]

This means that the function has no curvature at the endpoints, allowing it to have a slope but not additional bending.

In this sense, a natural spline is "natural" because the derivative vanishes for flexible drafting tools where the ends are unconstrained.
x??

---


#### Cubic Spline Quadrature
Background context: The text explains how to integrate an integrand using cubic splines and provides formulas for doing so analytically.

:p What formula is used to approximate the integral of \(g(x)\) over a single interval?
??x
The integral of \(g(x)\) over a single interval \([x_i, x_{i+1}]\) can be approximated using the cubic polynomial fit:

\[ \int_{x_i}^{x_{i+1}} g(x) \, dx \approx g_i + \frac{1}{2} g'_i (x - x_i) + \frac{1}{6} g''_i (x - x_i)^2 + \frac{1}{24} g'''_i (x - x_i)^3. \]

For a single interval, this simplifies to:

\[ \int_{x_i}^{x_{i+1}} g(x) \, dx = \left( g_i x + \frac{1}{2} g'_i x^2 + \frac{1}{6} g''_i x^3 + \frac{1}{24} g'''_i x^4 \right) \bigg|_{x=x_i}^{x=x_{i+1}}. \]

This formula is then summed over all intervals to obtain the total integral.
x??

---


#### Spline Fit of Cross Section (Implementation)
Background context: The text suggests using a library routine for fitting splines, and provides an example implementation.

:p What are the steps involved in implementing cubic spline interpolation?
??x
The steps involved in implementing cubic spline interpolation include:

1. **Fitting Cubics to Data:** Use an existing library function or implement one that fits cubics to data points.
2. **Continuity Conditions:** Ensure continuity of derivatives at each interval’s boundary by solving the system of equations derived from matching first and second derivatives.

Here is a simplified pseudocode for implementing cubic spline interpolation:

```python
def fit_cubics(x, y):
    # x: array of x-values
    # y: array of corresponding y-values

    N = len(x)
    h = np.diff(x)  # Step sizes between points
    alpha = (3.0 / h[1:]) * (y[2:] - y[:-2]) - (3.0 / h[:-1]) * (y[1:-1] - y[:-2])
    
    c = [0, 0]
    d = [0, 0]
    b = np.zeros(N)
    
    for i in range(1, N-1):
        A[i] = 2.0 * (h[i-1] + h[i])  # Coefficient matrix
        B[i] = -h[i-1]  # Lower diagonal
        C[i] = -h[i]  # Upper diagonal

    for i in range(1, N-1):
        A[i] /= A[i-1]
        B[i] /= A[i-1]
        C[i] /= A[i-1]

    for i in range(N-2, 0, -1):
        alpha[i] = (alpha[i] - B[i] * alpha[i+1]) / A[i]
    
    d[1] = alpha[N-2] / A[N-2]
    c[-2] = d[1]

    for i in range(N-3, 0, -1):
        c[i] = alpha[i] - h[i] * (d[i+1] + 2.0 * d[i]) / 6.0
        b[i] = (y[i+1] - y[i]) / h[i] - h[i] * (c[i+1] + 2.0 * c[i]) / 3.0

    # Now fit the cubic polynomials and integrate over intervals
```

This code snippet outlines the process of fitting cubics to data points, ensuring continuity conditions are met.
x??

---

---


#### Stochastic Nature of Spontaneous Decay
The text describes spontaneous decay as a stochastic process, where each decay event is influenced by an element of chance and does not follow a deterministic path. The rate equation for the number of decays \(\Delta N\) in a small time interval \(\Delta t\) can be expressed as:
\[ \frac{\Delta N(t)}{\Delta t} = -\lambda N(t) \]

Where \(\lambda\) is the decay rate and \(1/\tau\) (with \(\tau\) being the lifetime of the particle).

:p What is the relationship between the decay constant \(\lambda\) and the lifetime \(\tau\)?
??x
The decay constant \(\lambda\) and the lifetime \(\tau\) are inversely related, meaning that a higher \(\lambda\) corresponds to a shorter \(\tau\), and vice versa. This relationship can be expressed as:
\[ \tau = \frac{1}{\lambda} \]

:p How do you represent the differential equation for spontaneous decay?
??x
The differential equation representing the rate of change in the number of particles \(N(t)\) over time due to spontaneous decay is given by:
\[ \frac{dN(t)}{dt} = -\lambda N(t) \]

This equation describes how the number of particles decreases exponentially over time.

```java
// Pseudocode for representing the differential equation
public class DecayRateEquation {
    public void calculateDecayRate(double lambda, double currentTime, int currentParticles) {
        // Calculate the rate of change in particle count
        double decayRate = -lambda * currentParticles;
        System.out.println("Decay Rate at t=" + currentTime + "s: " + decayRate);
    }
}
```
x??

---


#### Least-Squares Fitting Methodology
The text discusses fitting experimental data to a theoretical model using least-squares methods. This approach is used when the experimental data contains errors and we want to find the best parameters for the theoretical function that minimize the sum of squared differences between the observed and predicted values.

The key points are:
1) The "best fit" should not necessarily pass through all data points.
2) If the theory does not match the data well, this indicates an inappropriate model.
3) For linear least-squares fits, a closed-form solution exists. However, for more complex models, trial-and-error search procedures may be necessary.

:p What is the objective of least-squares fitting?
??x
The objective of least-squares fitting is to determine how well a mathematical function \(y = g(x; \{a_1, a_2, ..., a_{MP}\})\) can describe experimental data. Additionally, if the theory contains parameters or constants, we also aim to find the best values for these parameters.

In the context of exponential decay:
- \(x\) represents time.
- \(y\) is the number of decays as a function of time.
- \(\{a_1, a_2, ..., a_{MP}\}\) are the parameters of the theoretical model (e.g., lifetime \(\tau\)).

```java
// Pseudocode for least-squares fitting in exponential decay context
public class LeastSquaresFitting {
    private double[] times; // Array of time intervals in seconds
    private int[] decays;   // Array of measured decays at corresponding times

    public void fitExponentialDecay(double[] times, int[] decays) {
        // Implement least-squares fitting algorithm here using linear regression on log(N(t))
        double lifetime = 2.6e-8; // Example hardcoded value for demonstration purposes
        System.out.println("Best-fit Lifetime: " + lifetime);
    }
}
```
x??

---

---


#### Chi-Square Measure of Fit
Background context: The chi-square (χ²) measure is used to assess how well a theoretical function reproduces data. It quantifies the discrepancy between experimental and theoretical values by summing the weighted squared deviations.

The formula for χ² is:
\[
\chi^2 = \sum_{i=1}^{ND} \left( \frac{y_i - g(x_i; \{a_m\})}{\sigma_i} \right)^2
\]
where \( ND \) is the number of experimental points, \( y_i \) and \( x_i \) are the data values, \( g(x_i; \{a_m\}) \) represents the theoretical function with parameters \( a_m \), and \( \sigma_i \) is the error associated with each measurement.

A smaller χ² value indicates a better fit. If χ² = 0, it means that the theoretical curve passes through every data point exactly.
:p What does the chi-square measure indicate about the fit between theory and experimental data?
??x
The chi-square (χ²) measure quantifies the discrepancy between the experimental data points \( y_i \) and the values predicted by the theoretical function \( g(x_i; \{a_m\}) \). It provides a way to assess how well the theoretical model fits the observed data. A smaller χ² value suggests that the theoretical model is a good fit, while a larger χ² value indicates a poorer fit.
x??

---


#### Least-Squares Fitting
Background context: The least-squares fitting method aims to find the set of parameters \( \{a_m\} \) in the theoretical function \( g(x; \{a_m\}) \) that minimizes the χ² value, thereby providing the best fit possible to the data. This is often done by solving a system of equations derived from setting the partial derivatives of χ² with respect to each parameter to zero.

The general equation for finding the parameters \( a_m \) that make χ² an extremum (minimum or maximum) is:
\[
\frac{\partial \chi^2}{\partial a_m} = 0 \Rightarrow \sum_{i=1}^{ND} \left[ y_i - g(x_i) \right] \frac{g(x_i)}{\sigma_i^2} \frac{\partial g(x_i)}{\partial a_m} = 0
\]
:p What is the goal of least-squares fitting?
??x
The goal of least-squares fitting is to adjust the parameters in the theoretical function \( g(x; \{a_m\}) \) such that the sum of the squares of the deviations between the experimental data and the theoretical predictions is minimized. This process yields the best fit possible by finding a set of parameter values that produce the smallest χ².
x??

---


#### Linear Regression
Background context: In cases where the function \( g(x; \{a_m\}) \) depends linearly on the parameters, simplifying the system of equations can make the problem more tractable. For example, in a straight-line fit (\( y = a_1 + a_2 x \)), there are only two parameters: the slope \( a_2 \) and the intercept \( a_1 \).

The simplified χ² minimization equations for linear regression are:
\[
a_1 = \frac{S_{xx} S_y - S_x S_{xy}}{\Delta}, \quad a_2 = \frac{S_{xy} - S_x S_y}{\Delta}
\]
where
\[
S = \sum_{i=1}^{ND} \frac{1}{\sigma_i^2}, \quad S_x = \sum_{i=1}^{ND} x_i \frac{1}{\sigma_i^2}, \quad S_y = \sum_{i=1}^{ND} y_i \frac{1}{\sigma_i^2}
\]
\[
S_{xx} = \sum_{i=1}^{ND} x_i^2 \frac{1}{\sigma_i^2}, \quad S_{xy} = \sum_{i=1}^{ND} x_i y_i \frac{1}{\sigma_i^2}, \quad \Delta = S S_{xx} - S_x^2
\]
:p How can linear regression be simplified for a straight-line fit?
??x
Linear regression can be simplified for a straight-line fit by using the formulas derived from minimizing the χ². For a line \( y = a_1 + a_2 x \), the parameters are the slope \( a_2 \) and the intercept \( a_1 \). The simplified equations to find these parameters are:
\[
a_1 = \frac{S_{xx} S_y - S_x S_{xy}}{\Delta}, \quad a_2 = \frac{S_{xy} - S_x S_y}{\Delta}
\]
where the sums \( S, S_x, S_y, S_{xx}, \) and \( S_{xy} \) are calculated as:
\[
S = \sum_{i=1}^{ND} \frac{1}{\sigma_i^2}, \quad S_x = \sum_{i=1}^{ND} x_i \frac{1}{\sigma_i^2}, \quad S_y = \sum_{i=1}^{ND} y_i \frac{1}{\sigma_i^2}
\]
\[
S_{xx} = \sum_{i=1}^{ND} x_i^2 \frac{1}{\sigma_i^2}, \quad S_{xy} = \sum_{i=1}^{ND} x_i y_i \frac{1}{\sigma_i^2}, \quad \Delta = S S_{xx} - S_x^2
\]
These equations provide a straightforward way to determine the best-fit line parameters.
x??

---


#### Trial-and-Error Searching and Data Fitting Statistics

Background context: This section discusses statistical measures for analyzing uncertainties and dependencies in fitted parameters. The provided equations help quantify these uncertainties.

:p What are the expressions for measuring the variance or uncertainty in deduced parameters, and how do they relate to the measured \( y \) values?
??x
The expressions for measuring the variance or uncertainty in deduced parameters are given by:
\[ \sigma^2_{a1} = S_{xx} \Delta, \quad \sigma^2_{a2} = S \Delta. \]
Here, these measures indicate the uncertainties arising from the uncertainties \( \sigma_i \) in measured \( y \) values.
??x
The answer with detailed explanations.

```python
# Example calculation of variances using Python (pseudo-code)
def calculate_variances(Sxx, S):
    sigma_a1 = Sxx * delta  # Variance for a1
    sigma_a2 = S * delta    # Variance for a2
    return sigma_a1, sigma_a2

# Where `delta` represents the uncertainty in measured y values.
```
x??

---


#### Reorganized Equations for Numerical Calculations

Background context: The text suggests reorganizing equations to avoid subtractive cancellation, which can decrease accuracy.

:p What are the rearranged expressions for fitting a parabola \( g(x) \) to data points?
??x
The rearranged expressions for fitting a parabola \( g(x) = a_1 + a_2 x + a_3 x^2 \) to data points are:
\[ a_1 = y - a_2 x, \]
\[ a_2 = \frac{S_{xy}}{S_{xx}}, \]
\[ x = \frac{1}{N} \sum_{i=1}^{N} x_i, \quad y = \frac{1}{N} \sum_{i=1}^{N} y_i, \]
\[ S_{xy} = \sum_{i=1}^{N} (x_i - x)(y_i - y), \]
\[ S_{xx} = \sum_{i=1}^{N} (x_i - x)^2. \]
??x
The answer with detailed explanations.

```python
# Example calculation of coefficients using Python (pseudo-code)
def fit_parabola(x, y):
    N = len(x)
    x_mean = sum(x) / N
    y_mean = sum(y) / N
    
    Sxx = sum((xi - x_mean) ** 2 for xi in x)
    Sxy = sum((xi - x_mean) * (yi - y_mean) for xi, yi in zip(x, y))
    
    a1 = y_mean - a2 * x_mean
    a2 = Sxy / Sxx
    
    return a1, a2

# Where `x` and `y` are lists of data points.
```
x??

---


#### Linear Quadratic Fit

Background context: This section discusses fitting a quadratic polynomial to experimental measurements. The best fit is obtained by applying the minimum \(\chi^2\) condition.

:p How do you derive the three simultaneous equations for the parameters \(a_1\), \(a_2\), and \(a_3\) when fitting the quadratic polynomial \( g(x) = a_1 + a_2 x + a_3 x^2 \)?
??x
To derive the three simultaneous equations for the parameters \(a_1\), \(a_2\), and \(a_3\) when fitting the quadratic polynomial \( g(x) = a_1 + a_2 x + a_3 x^2 \):
\[ \sum_{i=1}^{N} \left[ y_i - (a_1 + a_2 x_i + a_3 x_i^2) \right] \frac{\partial g(x_i)}{\partial a_1} = 0, \quad \text{where} \quad \frac{\partial g}{\partial a_1} = 1, \]
\[ \sum_{i=1}^{N} \left[ y_i - (a_1 + a_2 x_i + a_3 x_i^2) \right] \frac{\partial g(x_i)}{\partial a_2} = 0, \quad \text{where} \quad \frac{\partial g}{\partial a_2} = x_i, \]
\[ \sum_{i=1}^{N} \left[ y_i - (a_1 + a_2 x_i + a_3 x_i^2) \right] \frac{\partial g(x_i)}{\partial a_3} = 0, \quad \text{where} \quad \frac{\partial g}{\partial a_3} = x_i^2. \]
These equations are linear in the parameters \(a_1\), \(a_2\), and \(a_3\) because the derivatives do not depend on the parameters.

The matrix form of these equations is:
\[ S_{a1} + S_x a_2 + S_{xx} a_3 = S_y, \]
\[ S_x a_1 + S_{xx} a_2 + S_{xxx} a_3 = S_{xy}, \]
\[ S_{xx} a_1 + S_{xxx} a_2 + S_{xxxx} a_3 = S_{xxy}. \]

Here, the definitions of \(S's\) are simple extensions of those used in (6.46)–(6.48).

??x
The answer with detailed explanations.

```python
# Example calculation of matrix form equations using Python (pseudo-code)
def fit_quadratic(x, y):
    N = len(x)
    
    Sxx = sum((xi - x_mean) ** 2 for xi in x)
    Sxxx = sum((xi - x_mean) ** 3 for xi in x)
    Sxxxx = sum((xi - x_mean) ** 4 for xi in x)
    Sxy = sum((xi - x_mean) * (yi - y_mean) for xi, yi in zip(x, y))
    Syx = sum((yi - y_mean) * (xi - x_mean) for xi, yi in zip(x, y))
    Sxxxy = sum((xi - x_mean) ** 2 * (yi - y_mean) for xi, yi in zip(x, y))
    
    A = [[Sxx, Sx, Sxxx], [Sx, Sxx, Sxxxx], [Sxxx, Sxxxx, Sxxxx]]
    b = [Syx, Sxy, Sxxxy]
    
    x = np.linalg.solve(A, b)
    
    return x

# Where `x` and `y` are lists of data points.
```
x??

---

---

