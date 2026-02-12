# High-Quality Flashcards: 10A008---Computational-Physics---Rubin-H_-Landau_processed (Part 12)


**Starting Chapter:** 6.7.2.1 Linear Quadratic Fit Assessment. 6.8 Nonlinear Fit to a Resonance

---


#### Linear Quadratic Fit Assessment

Background context: The task involves fitting a quadratic function to given datasets and assessing the fit by calculating $\chi^2 $. A quadratic function is of the form $ y = ax^2 + bx + c$.

:p What are the steps for fitting a quadratic function to a dataset?
??x
The steps include:
1. Define the general form of the quadratic function: $y = ax^2 + bx + c$.
2. Use the given datasets $(x_i, y_i)$ to create equations based on this function.
3. Solve these equations for the coefficients $a $, $ b $, and$ c$ using methods like least squares or trial-and-error searching.
4. Calculate the degrees of freedom (DOF).
5. Compute the $\chi^2$ value as follows:
$$\chi^2 = \sum_i \left( \frac{y_i - g(x_i)}{\sigma_i} \right)^2$$where $ g(x_i)$is the quadratic function evaluated at $ x_i$.

Example code to compute $\chi^2$ in Java:
```java
public class QuadraticFit {
    public static double chiSquare(double[] x, double[] y, double a, double b, double c, double[] sigma) {
        int n = x.length;
        double sumOfSquares = 0.0;
        for (int i = 0; i < n; i++) {
            double predY = a * Math.pow(x[i], 2) + b * x[i] + c;
            sumOfSquares += Math.pow((y[i] - predY) / sigma[i], 2);
        }
        return sumOfSquares;
    }
}
```
x??

---


#### Data Fitting with Nonlinear Functions

Background context: The goal is to fit a nonlinear function, specifically the Breit-Wigner resonance formula $f(E) = \frac{fr}{(E - Er)^2 + \Gamma^2/4}$, to experimental data using trial-and-error searching and matrix algebra. This involves finding the best-fit values for parameters $ Er$,$ fr $, and$\Gamma $ that minimize$\chi^2$.

:p What is the Breit-Wigner resonance formula, and how do you fit it to data?
??x
The Breit-Wigner resonance formula describes a resonance peak in experimental data:
$$f(E) = \frac{fr}{(E - Er)^2 + (\Gamma/2)^2}$$

To fit this to the data, we need to minimize the $\chi^2$ value:
$$\chi^2 = \sum_i \left( \frac{y_i - g(x_i)}{\sigma_i} \right)^2$$where $ g(x)$ is the Breit-Wigner function evaluated at each data point.

We can use the Newton-Raphson algorithm to solve for the parameters. The key steps are:
1. Write down the theoretical form of the function and its derivatives.
2. Formulate the $\chi^2$ equations for nonlinearity:
$$f_1(a_1, a_2, a_3) = 9\sum_i \left( y_i - g(x_i, a) \frac{(x_i - a_2)^2 + a_3}{a_3} \right) = 0$$$$f_2(a_1, a_2, a_3) = 9\sum_i \left( y_i - g(x_i, a) \frac{(x_i - a_2)^2 + a_3}{a_3} \right) (x_i - a_2) = 0$$$$f_3(a_1, a_2, a_3) = 9\sum_i \left( y_i - g(x_i, a) \frac{(x_i - a_2)^2 + a_3}{a_3} \right) (x_i - a_2)^2 / a_3 = 0$$

Example code to set up the Newton-Raphson algorithm in Java:
```java
public class NonlinearFit {
    public static void newtonRaphson(double[] x, double[] y, double[] sigma, int iterations) {
        double[][] f = new double[3][];
        for (int i = 0; i < iterations; i++) {
            // Calculate the function values and their derivatives
            f[0] = computeF1(x, y, sigma);
            f[1] = computeF2(x, y, sigma);
            f[2] = computeF3(x, y, sigma);

            // Solve for the next guess using matrix algebra
        }
    }

    private static double[] computeF1(double[] x, double[] y, double[] sigma) {
        // Implementation of F1 based on the Breit-Wigner function and its derivative
    }

    private static double[] computeF2(double[] x, double[] y, double[] sigma) {
        // Implementation of F2 based on the Breit-Wigner function and its derivative
    }

    private static double[] computeF3(double[] x, double[] y, double[] sigma) {
        // Implementation of F3 based on the Breit-Wigner function and its derivative
    }
}
```
x??

---


#### Nonlinear Fit to a Resonance

Background context: The objective is to determine the best-fit values for parameters $Er $, $ fr $, and$\Gamma$ in the Breit-Wigner resonance formula using trial-and-error searching and matrix algebra. This involves solving nonlinear equations.

:p What are the steps involved in fitting the Breit-Wigner function to data?
??x
The steps involve:
1. Define the Breit-Wigner function $f(E) = \frac{fr}{(E - Er)^2 + (\Gamma/2)^2}$.
2. Formulate the $\chi^2$ equations for nonlinearity.
3. Use the Newton-Raphson algorithm to solve these nonlinear equations:
$$f_1(a_1, a_2, a_3) = 9\sum_i \left( y_i - g(x_i, a) \frac{(x_i - a_2)^2 + a_3}{a_3} \right) = 0$$$$f_2(a_1, a_2, a_3) = 9\sum_i \left( y_i - g(x_i, a) \frac{(x_i - a_2)^2 + a_3}{a_3} \right) (x_i - a_2) = 0$$$$f_3(a_1, a_2, a_3) = 9\sum_i \left( y_i - g(x_i, a) \frac{(x_i - a_2)^2 + a_3}{a_3} \right) (x_i - a_2)^2 / a_3 = 0$$4. Implement the Newton-Raphson algorithm to solve these equations iteratively.

Example code snippet for setting up the function values and derivatives:
```java
public class BreitWignerFit {
    public static double[] computeDerivatives(double E, double fr, double Er, double Gamma) {
        double a1 = fr;
        double a2 = Er;
        double a3 = (Gamma / 2.0) * (Gamma / 2.0);
        return new double[]{
            1.0 / (a3 + Math.pow(E - a2, 2)), // df/da1
            -2.0 * fr * (E - a2) / (Math.pow(a3 + Math.pow(E - a2, 2), 2)), // df/da2
            -fr * (E - a2) * (E - a2) / (Math.pow(a3 + Math.pow(E - a2, 2), 2)) // df/da3
        };
    }
}
```
x??

---


#### Bisection Method Implementation
Background context: The bisection method is a root-finding algorithm that repeatedly bisects an interval and then selects a subinterval in which a root must lie for further processing. It is particularly useful when you have a continuous function over a closed interval $[a, b]$ where the function changes sign.

:p What does the Bisection Method do?
??x
The Bisection method repeatedly divides an interval into two halves and selects one half that contains the root based on the sign of the function at the endpoints. If $f(a) \cdot f(b) < 0 $, then there is a root in $[a, b]$.

Code example:
```python
# Bisection.py code
from math import cos

eps = 1e-3; Nmax = 100; a = 0.0; b = 7.0
def f(x): return 2 * cos(x) - x
def Bisection(Xminus, Xplus, Nmax, eps):
    for it in range(0, Nmax):
        x = (Xplus + Xminus) / 2
        print(f"i t= {it}, x= {x}, f(x) = {f(x)}")
        
        if f(Xplus) * f(x) > 0.:
            Xplus = x  # Change x+ to x
        else:
            Xminus = x  # Change x- to x
        
        if abs(f(x)) <= eps:  # Converged?
            print(" Root found with precision eps = ", eps)
            break

    if it == Nmax - 1:
        print(" No root after N iterations ")
    
    return x
root = Bisection(a, b, Nmax, eps)
print(" Root =", root)
```
x??

---


#### Newton-Raphson Method Implementation
Background context: The Newton-Raphson method is an iterative method for finding the roots of a real-valued function. It uses the derivative to approximate the function near a root and converges quickly if the initial guess is close enough.

:p What does the Newton-Raphson method do?
??x
The Newton-Raphson method finds roots by using the tangent line at each iteration to approximate the function, which generally leads to rapid convergence. It requires the derivative of the function.

Code example:
```python
# NewtonCD.py code
from math import cos

x = 1111.; dx = 3.e-4; eps = 0.002; Nmax = 100
def f(x): return 2 * cos(x) - x

for it in range(0, Nmax + 1):
    F = f(x)
    
    if abs(F) <= eps:  # Converged?
        print(" Root found, f(root) =", F, ", eps=", eps)
        break
    
    df = (f(x + dx / 2) - f(x - dx / 2)) / dx  # Central difference
    dx = -F / df
    x += dx

print("Iteration # =", it, "x =", x, "f(x) =", F)
```
x??

---


#### Vector Formulation of Equations
The nine unknowns (angles and tensions) are treated as a vector $y$:
$$y= \begin{bmatrix}
\sin(\theta_1) & \sin(\theta_2) & \sin(\theta_3) \\
\cos(\theta_1) & \cos(\theta_2) & \cos(\theta_3) \\
T_1 & T_2 & T_3
\end{bmatrix}$$

These variables are used to formulate the system of equations as a vector $f(y)$:
$$f(y)= \begin{bmatrix}
f_1(y) & f_2(y) & ... & f_9(y)
\end{bmatrix} = 0.$$:p How are the unknowns represented in this problem?
??x
The unknowns (angles and tensions) in this problem are represented as a vector $y$ containing:
$$y= \begin{bmatrix}
\sin(\theta_1) & \sin(\theta_2) & \sin(\theta_3) \\
\cos(\theta_1) & \cos(\theta_2) & \cos(\theta_3) \\
T_1 & T_2 & T_3
\end{bmatrix}.$$

These variables are used to formulate the system of equations as a vector $f(y)$:
$$f(y)= \begin{bmatrix}
f_1(y) & f_2(y) & ... & f_9(y)
\end{bmatrix} = 0.$$x??

---


#### Newton-Raphson Method for Solving Nonlinear Equations
The problem is solved using the Newton-Raphson method, which involves guessing a solution and then linearizing the nonlinear equations around that guess. The Jacobian matrix $J $ of the system is used to solve for corrections$\Delta y$:
$$J = \begin{bmatrix}
\frac{\partial f_1}{\partial y_1} & ... & \frac{\partial f_9}{\partial y_9} \\
\vdots & \ddots & \vdots \\
\frac{\partial f_9}{\partial y_1} & ... & \frac{\partial f_9}{\partial y_9}
\end{bmatrix}, \quad
J \Delta y = -f(y).$$

This process is repeated iteratively until the solution converges.
:p How does the Newton-Raphson method solve nonlinear equations in this problem?
??x
The Newton-Raphson method solves nonlinear equations by:
1. Guessing an initial solution $y$.
2. Linearizing the system of equations around this guess to form a Jacobian matrix $J$:
$$J = \begin{bmatrix}
\frac{\partial f_1}{\partial y_1} & ... & \frac{\partial f_9}{\partial y_9} \\
\vdots & \ddots & \vdots \\
\frac{\partial f_9}{\partial y_1} & ... & \frac{\partial f_9}{\partial y_9}
\end{bmatrix}.$$3. Solving for corrections $\Delta y$ using the equation:
$$J \Delta y = -f(y).$$4. Updating the guess with the correction:$ y_{new} = y + \Delta y$.
5. Repeating until convergence.

This process is iterated until the solution converges.
x??

---

---

