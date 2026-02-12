# High-Quality Flashcards: 10A008---Computational-Physics---Rubin-H_-Landau_processed (Part 16)


**Starting Chapter:** 8.6 Extensions Nonlinear Resonances Beats Friction

---


#### Fourth-Order Runge-Kutta Method (rk4)
Background context explaining the concept. The fourth-order Runge-Kutta method is an algorithm used to solve ordinary differential equations with high precision by approximating the function $y $ as a Taylor series up to order$h^2$. This method provides good balance between power, precision, and programming simplicity.
If applicable, add code examples with explanations. The rk4 method involves multiple intermediate slopes and uses the Euler algorithm for approximation.

:p What is the formula used in the fourth-order Runge-Kutta method?
??x
The formula used in the fourth-order Runge-Kutta method (rk4) to approximate $y$ at the next step is given by:
$$y_{n+1} = y_n + \frac{1}{6}(k_1 + 2k_2 + 2k_3 + k_4),$$where$$k_1 = h f(t_n, y_n),$$
$$k_2 = h f\left(t_n + \frac{h}{2}, y_n + \frac{k_1}{2}\right),$$
$$k_3 = h f\left(t_n + \frac{h}{2}, y_n + \frac{k_2}{2}\right),$$
$$k_4 = h f(t_n + h, y_n + k_3).$$

This formula provides an improved approximation to $f(t,y)$ near the midpoint of the interval.
??x
```java
// Pseudocode for rk4 method
public void rungeKutta4(double[] y, double t, double h, Function<double[], Double> f) {
    // k1 = h * f(t, y)
    double[] k1 = new double[y.length];
    for (int i = 0; i < y.length; i++) {
        k1[i] = h * f.evaluate(y);
    }
    
    // k2 = h * f(t + h/2, y + k1/2)
    double[] k2 = new double[y.length];
    for (int i = 0; i < y.length; i++) {
        k2[i] = h * f.evaluate(applyScalarAddition(y, k1, 0.5));
    }
    
    // k3 = h * f(t + h/2, y + k2/2)
    double[] k3 = new double[y.length];
    for (int i = 0; i < y.length; i++) {
        k3[i] = h * f.evaluate(applyScalarAddition(y, k2, 0.5));
    }
    
    // k4 = h * f(t + h, y + k3)
    double[] k4 = new double[y.length];
    for (int i = 0; i < y.length; i++) {
        k4[i] = h * f.evaluate(applyScalarAddition(y, k3, 1));
    }
    
    // Calculate the next value of y
    for (int i = 0; i < y.length; i++) {
        y[i] += (k1[i] + 2 * k2[i] + 2 * k3[i] + k4[i]) / 6;
    }
}
```
x??

---


#### Runge-Kutta-Fehling Method (rk45)
Background context explaining the concept. The Runge-Kutta-Fehling method, a variation of rk4, adjusts the step size during integration to potentially improve precision and speed by using an estimate of the error from the current computation.
If applicable, add code examples with explanations.

:p What is the main feature of the Runge-Kutta-Fehling (rk45) method?
??x
The main feature of the Runge-Kutta-Fehling (rk45) method is its ability to automatically adjust the step size during integration based on an estimate of the error. This allows for better precision and potentially faster computation, especially when larger step sizes can be used while maintaining acceptable accuracy.
??x
```java
// Pseudocode for rk45 method
public void rungeKuttaFehling(double[] y, double t, double h, Function<double[], Double> f) {
    // Perform initial RK4 calculation with current step size
    performRK4(y, t, h, f);
    
    // Double the step size and estimate new solution
    double[] yDoubleStep = new double[y.length];
    for (int i = 0; i < y.length; i++) {
        yDoubleStep[i] = y[i] + 2 * h * k3[i]; // Assuming k3 from initial RK4 calculation
    }
    
    // Perform second RK4 calculation with doubled step size
    performRK4(yDoubleStep, t, 2 * h, f);
    
    // Estimate error and adjust step size accordingly
    double[] errorEstimate = new double[y.length];
    for (int i = 0; i < y.length; i++) {
        errorEstimate[i] = Math.abs((yDoubleStep[i] - (y[i] + h * k4[i])) / 7);
    }
    
    // Adjust step size based on the error estimate
    if (errorEstimate.max() <= acceptableError) {
        h *= 2; // If error is within bounds, double the step size
    } else {
        h /= 2; // If error is too large, halve the step size
    }
}
```
x??

---


#### Adams-Bashful-Moulton Predictor-Corrector Rule (ABM)
Background context explaining the concept. The Adams-Bashful-Moulton predictor-corrector rule uses solutions from two previous steps to predict the next value of $y$, and then corrects this prediction using a higher-order method such as Runge-Kutta.
If applicable, add code examples with explanations.

:p What is the advantage of the Adams-Bashful-Moulton (ABM) predictor-corrector rule?
??x
The main advantage of the Adams-Bashful-Moulton (ABM) predictor-corrector rule is that it uses solutions from two previous steps to make a prediction for the next value of $y$, and then corrects this prediction using a higher-order method like Runge-Kutta. This approach can provide high precision by leveraging information from multiple previous steps, making the overall computation more efficient.
??x
```java
// Pseudocode for ABM predictor-corrector rule
public void abmPredictCorrect(double[] yPredict, double t, double h, Function<double[], Double> f) {
    // Predict using previous two steps and current step information
    yPredict[0] = y[n-2] + h * (3 * k1 - 2 * k2 + k3) / 6;
    
    // Correct the prediction using Runge-Kutta method for high accuracy
    performRK4(yCorrect, t, h, f);
    
    // Update current solution with corrected value
    y[n] = yCorrect[0];
}
```
x??

---


#### Comparison of rk2, rk4, and rk45
Background context explaining the concept. The comparison between different Runge-Kutta methods highlights their trade-offs in terms of precision, computational cost, and step size flexibility.
If applicable, add code examples with explanations.

:p What are the key differences between rk2, rk4, and rk45?
??x
The key differences between rk2 (second-order Runge-Kutta), rk4 (fourth-order Runge-Kutta), and rk45 (Runge-Kutta-Fehling) are as follows:

- **rk2**: This method is a second-order Runge-Kutta method that uses two intermediate slopes. While it provides better precision than Euler's method, it is less precise compared to higher-order methods like rk4.
- **rk4**: This method is a fourth-order Runge-Kutta method that uses four intermediate slopes and provides high precision with good balance between power, precision, and programming simplicity.
- **rk45**: This method adjusts the step size based on an estimated error from the current computation. It can achieve higher precision by using larger steps when the error remains within acceptable bounds.

Each method has its own advantages and disadvantages:
- rk2 is less precise but computationally simpler.
- rk4 provides high precision with balanced power and simplicity.
- rk45 combines accuracy and efficiency through adaptive step size control, potentially allowing for faster computation under certain conditions.
??x
```java
// Pseudocode comparison of methods
public void solveODE(double[] yInitial) {
    // Initialize variables
    
    // Use rk2 method
    double h = 0.1; // Step size
    while (condition) { // Define condition based on desired precision or time interval
        performRK2(y, t, h, f);
        t += h;
    }
    
    // Use rk4 method
    h = 0.1; // Step size
    while (condition) {
        performRK4(y, t, h, f);
        t += h;
    }
    
    // Use rk45 method
    double hInitial = 0.1; // Initial step size
    while (condition) {
        performRK45(y, t, hInitial, f); // Adjust h based on error estimation
        t += h;
    }
}
```
x??

---

---


#### Step-by-Step Numerical Solution for Harmonic Oscillators
Background context: This section describes how to numerically solve the equations of motion for a harmonic oscillator using various Runge-Kutta methods. The goal is to ensure that the numerical solution matches the analytical one, and to study how different initial conditions affect the solution.

:p What are the steps involved in solving an ODE for a harmonic oscillator numerically?
??x
The steps involve selecting appropriate $k $ and$m $ values so that the period$ T = 2\pi/\omega $ is a nice number to work with. Starting with a step size $ h \approx T/5 $, make $ h$smaller until the solution looks smooth, has a constant period over many cycles, and agrees with the analytic result. Always start with a large $ h$ so that you can see how the bad solution turns good.

Code for setting initial conditions:
```java
double[] y0 = new double[2]; // [position, velocity]
y0[0] = 0; // zero displacement
y0[1] = non_zero_velocity; // nonzero velocity
```

x??

---


#### Step Size Selection for Numerical Solutions
Background context: The step size $h $ is critical in ensuring that the numerical solution converges to the analytic one. Starting with a large$h $ allows you to see how the initial bad solution improves as$h$ decreases, leading to a smooth and accurate periodic solution.

:p How do you determine an appropriate initial step size for the harmonic oscillator?
??x
Start with a step size $h \approx T/5 $, where $ T = 2\pi/\omega $. Gradually decrease$ h $ until the solution appears smooth, has a constant period over multiple cycles, and matches the analytic result. Always begin with a large $ h$ to observe the transition from an inaccurate to an accurate solution.

x??

---


#### Comparison of Different Runge-Kutta Methods
Background context: Comparing different Runge-Kutta methods (rk2, rk4, and rk45) helps in understanding their relative accuracy and efficiency. This comparison is crucial for choosing the most suitable method based on computational resources.

:p How do you compare the solutions obtained with rk2, rk4, and rk45 solvers?
??x
Run each solver with the same initial conditions and step size. Compare the results to ensure consistency and accuracy. Note that different methods may have varying levels of precision and computational efficiency.

Example code for running solvers:
```java
// Using RK4
double[] yRK4 = rk4(initial_conditions, h, N);

// Using RK45
double[] yRK45 = rk45(initial_conditions, h, N);
```

x??

---


#### Table of Comparison for Nonlinear Oscillations
Background context: The table compares the performance of different Runge-Kutta methods (rk4 and rk45) on two nonlinear equations. This comparison helps in understanding which method provides better accuracy with fewer operations.

:p What is the objective of comparing RK4 and RK45 solvers using Table 8.1?
??x
The objective is to compare the accuracy, number of floating-point operations (FLOPs), execution time, and relative error of rk4 and rk45 methods for solving two nonlinear equations: $2yy'' + y^2 - y'^2 = 0 $ and$y'' + 6y^5 = 0$.

Example table data:
```
Eqn. no.   Method    Initial h     No. of FLOPs       Time (ms)   Relative error
(8.46)     rk4      0.01           1000              5.2         2.2 × 10^-8
            rk45     1.00             72               1.5         1.8 × 10^-8
(8.47)     rk4      0.01            227               8.9         1.8 × 10^-8
            rk45     0.1              3143             36.7        5.7 × 10^-11
```

x??

---


#### Nonlinear Oscillations with Different Powers and Forces
Background context: The harmonic oscillator's potential can be modified by changing the power in $V(x) = k x^p $. This section explores how different powers affect the system, particularly focusing on the range from $ p=2 $ to $12$.

:p How do you study nonlinear oscillations for anharmonic potentials?
??x
Study nonlinear oscillations by varying the power $p $ in the potential function$V(x) = k x^p $. For example, start with$ p = 2 $(linear) and increase it to$ p = 12 $, observing how the system's behavior changes. Note that for large values of$ p$, forces and accelerations grow near turning points, requiring smaller step sizes.

Example code to set different powers:
```java
for (int p = 2; p <= 12; p++) {
    // Solve ODE with potential V(x) = k * Math.pow(x, p)
}
```

x??

---


#### Checking Periodicity and Energy Conservation
Background context: For a harmonic oscillator or anharmonic potentials, the solution should remain periodic with constant amplitude. Additionally, the maximum speed occurs at $x=0 $, while zero velocity is observed at the maximum absolute values of $ x$. These properties are consequences of energy conservation.

:p What checks should be performed to verify the periodicity and energy conservation in an oscillatory system?
??x
Check that the solution remains periodic with constant amplitude for all initial conditions. Verify that the maximum speed occurs at $x=0 $ and zero velocity at the maximum absolute values of$x$. These properties ensure that energy is conserved throughout the motion.

Example code to check these properties:
```java
// Solve ODE and plot position vs time
// Check for periodicity by observing if T remains constant
// Verify max speed occurs at x=0 and zero velocity at maximum |x|
```

x??

---


#### Shape Changes in Oscillations
The shapes of the oscillations change based on parameters $p $ or$\alpha$. This is due to the nature of anharmonic oscillators where the potential energy depends on higher powers of displacement, leading to different restoring forces and thus different oscillation patterns.
:p Explain why the shapes of the oscillations change for different $p $ or$\alpha$.
??x
The changes in shape are due to the nonlinearity introduced by higher powers in the potential function. For example, if $V(x) = k x^p $, then the restoring force is given by $ F = -k p x^{p-1}$. As $ p$ varies, the strength and direction of the force change with displacement, leading to different oscillation patterns.
```java
// Pseudocode for shape analysis
for (each value of p or alpha) {
    simulate oscillations;
    plot position vs. time;
}
```
x??

---


#### Energy Conservation in Nonlinear Oscillators
The conservation of total energy $E = KE + PE $ is a stringent test for numerical solutions. For large-$ p$ oscillators, the kinetic and potential energies will fluctuate but should remain constant over time.
:p Plot the potential energy $PE(t)$, the kinetic energy $ KE(t)$, and the total energy $ E(t)$ for 50 periods and comment on their correlation.
??x
Plotting these functions will help verify that the numerical solution respects energy conservation. The potential energy, kinetic energy, and total energy should be constant over time.

Pseudocode:
```java
public class EnergyConservation {
    public static void plotEnergyFunctions(double[] positions, double m) {
        List<Double> PE = new ArrayList<>();
        List<Double> KE = new ArrayList<>();
        List<Double> E = new ArrayList<>();

        for (int i = 0; i < positions.length; ++i) {
            double x = positions[i];
            double v = velocities[i]; // assume velocities are known
            double PE_i = 0.5 * m * Math.pow(v, 2); // potential energy
            double KE_i = 0.5 * m * Math.pow(v, 2); // kinetic energy
            double E_i = PE_i + KE_i; // total energy

            PE.add(PE_i);
            KE.add(KE_i);
            E.add(E_i);
        }

        plotGraphs(PE, "Potential Energy");
        plotGraphs(KE, "Kinetic Energy");
        plotGraphs(E, "Total Energy");
    }
}
```
x??

---


#### Precision Assessment
Use the conservation of energy to assess the precision of numerical solutions. The relative error in total energy should be small over time.
:p Plot $-\log_{10} \left( \frac{|E(t) - E(t=0)|}{|E(t=0)|} \right)$ for a large number of periods and check long-term stability.
??x
This plot will help verify that the numerical solution is stable over time. The relative error should remain within acceptable limits.

Pseudocode:
```java
public class PrecisionAssessment {
    public static void assessPrecision(double[] energies, double E0) {
        List<Double> errors = new ArrayList<>();
        
        for (int i = 1; i < energies.length; ++i) {
            double error = Math.abs(energies[i] - E0);
            double relativeError = error / Math.abs(E0);
            double logError = -Math.log10(relativeError);
            
            errors.add(logError);
        }
        
        plotGraph(errors, "Relative Precision");
    }

    private static void plotGraph(List<Double> data, String title) {
        // Plot the graph using a plotting library
    }
}
```
x??

---


#### Lowering F0 to Match Natural Restoring Force

Background context: In this step, you need to lower the driving force $F_0$ until it closely matches the magnitude of the natural restoring force of the system. This adjustment is crucial for generating beating oscillations.

:p What should be done with $F_0$ in relation to the natural restoring force?
??x
You should reduce $F_0 $ gradually and monitor the system's response until the driving force closely matches the magnitude of the natural restoring force, which allows for the occurrence of beating. This involves tuning$F_0$ such that it is nearly equal to the natural force in absolute value.
x??

---


#### System Frequency Sweep

Background context: After finding an appropriate $F_0 $, perform a series of runs to progressively increase the driving frequency for a range from $\frac{\omega_0}{10}$ to $10\omega_0$. This will help understand how the system's behavior changes over different frequencies.

:p What is the objective of running the system with varying driver frequencies?
??x
The objective is to observe and record how the system's behavior changes as the driving frequency $\omega $ increases from$\frac{\omega_0}{10}$ to $10\omega_0$. This will provide insights into resonance phenomena, natural frequencies, and potentially nonlinear behaviors.
x??

---


#### Plotting Maximum Amplitude vs. Driver Frequency

Background context: Generate a plot showing the maximum amplitude of oscillation as a function of the driver's frequency $\omega$.

:p What should be done to create this plot?
??x
To create this plot, run the system for various frequencies within the specified range and record the maximum amplitude at each step. Use these data points to construct a graph where the x-axis represents the driving frequency $\omega$ and the y-axis represents the maximum amplitude of oscillation.
x??

---


#### Nonlinear System Resonance

Background context: Investigate how nonlinear systems behave differently from linear ones when driven near resonance. In nonlinear systems, beating may occur instead of the expected blowup in amplitude.

:p What phenomena should you expect to observe in a nonlinear system?
??x
In a nonlinear system, if it is close to being harmonic, you will observe beating rather than a sudden increase (blowup) in amplitude when driven near resonance. This occurs because the natural frequency changes as the amplitude increases, causing the natural and forced oscillations to fall out of phase. Once they are out of phase, the external force stops feeding energy into the system, leading to a decrease in amplitude and thus returning the natural frequency back to its original value.
x??

---


#### Inclusion of Viscous Friction

Background context: Analyze how including viscous friction affects the curve of maximum amplitude versus driver frequency. The inclusion of friction is expected to broaden this curve.

:p How does viscous friction modify the resonance behavior?
??x
Viscous friction broadens the peak in the curve of maximum amplitude versus driving frequency. This means that instead of a sharp peak at the resonant frequency, there will be a wider range of frequencies where significant amplitudes can occur due to energy dissipation and damping effects.
x??

---


#### Effect of Nonlinearity on Resonance

Background context: Explore how increasing the exponent $p $ in the potential$V(x) = k|x|^{p/p}$ affects the character of resonance. For large $p$, the mass effectively "hits" the wall, leading to a phase mismatch between the driver and the oscillator.

:p How does changing the exponent $p$ affect the resonance behavior?
??x
As the exponent $p $ increases, the character of the resonance changes significantly. When$p$ is large, the potential becomes more nonlinear, causing the mass to "hit" a wall or barrier, effectively detuning it from the driving force. This results in the driver being less effective at pumping energy into the system, leading to a broader and less pronounced resonance peak.
x??

---


#### Code for RK4 Method

Background context: The provided code uses the 4th-order Runge-Kutta method (RK4) to solve ordinary differential equations with an external driving force.

:p What does this code do?
??x
This code implements the 4th-order Runge-Kutta (RK4) method to numerically solve ordinary differential equations. It sets up initial conditions, defines a function `f()` for the right-hand side of the ODE, and integrates over a specified time range using RK4. The code also plots the solutions.

```python
#### Code Example

# Import necessary modules
from visual.graph import *

# Initialize parameters
a = 0.
b = 10.
n = 100

ydumb = zeros((2), float)
y = zeros((2), float)
fReturn = zeros((2), float)
k1 = zeros((2), float)
k2 = zeros((2), float)
k3 = zeros((2), float)
k4 = zeros((2), float)

# Set initial conditions
y[0] = 3.
y[1] = -5.

t = a
h = (b - a) / n

def f(t, y):
    # Define the right-hand side of the ODE
    fReturn[0] = y[1]
    fReturn[1] = -100. * y[0] - 2. * y[1] + 10. * sin(3. * t)
    return fReturn

# Create plots
graph1 = gdisplay(x=0, y=0, width=400, height=400, title='RK4', xtitle='t', ytitle='Y[0]', xmin=0, xmax=10, ymin=-2, ymax=3)
funct1 = gcurve(color=color.yellow)

graph2 = gdisplay(x=400, y=0, width=400, height=400, title='RK4', xtitle='t', ytitle='Y[1]', xmin=0, xmax=10, ymin=-25, ymax=18)
funct2 = gcurve(color=color.red)

def rk4(t, h, n):
    k1 = [0] * (n)
    k2 = [0] * (n)
    k3 = [0] * (n)
    k4 = [0] * (n)
    fR = [0] * (n)
    ydumb = [0] * (n)

    # Calculate the RHS
    fR = f(t, y)

    for i in range(0, n):
        k1[i] = h * fR[i]

        # Update y values for second pass
        ydumb[i] = y[i] + k1[i] / 2.
        k2[i] = h * f(t + h / 2., ydumb)

        ydumb[i] = y[i] + k2[i] / 2.
        k3[i] = h * f(t + h / 2., ydumb)

        ydumb[i] = y[i] + k3[i]
        k4[i] = h * f(t + h, ydumb)

    for i in range(0, 2):
        y[i] = y[i] + (k1[i] + 2. * (k2[i] + k3[i]) + k4[i]) / 6.

    return y

while t < b:
    if (t + h) > b:
        h = b - t
        # Last step
        y = rk4(t, h, 2)
    else:
        y = rk4(t, h, n)

    t += h
    rate(30)

    funct1.plot(pos=(t, y[0]))
    funct2.plot(pos=(t, y[1]))
```
x??

---

---


#### Adaptive Step Size Control
Background context: The provided Python script implements an adaptive step size control mechanism for solving ordinary differential equations (ODEs) using a Runge-Kutta 45 method. This involves adjusting the step size based on the error tolerance to balance accuracy and computational efficiency.

:p What is the purpose of adaptive step size control in numerical ODE solvers?
??x
The purpose of adaptive step size control is to dynamically adjust the step size during the integration process to ensure that the solution meets a specified level of accuracy while minimizing computation time. By increasing or decreasing the step size based on local error estimates, the solver can achieve this balance efficiently.
x??

---


#### Runge-Kutta 45 Method
Background context: The script uses a modified version of the Runge-Kutta 45 (RK45) method to solve the given ODE. This involves multiple stages of estimating the function values at different points and using weighted averages to improve accuracy.

:p What are the steps involved in the RK45 method used in the script?
??x
The steps involved in the RK45 method used in the script include:
1. **Estimating k1**: $k1 = h \cdot f(t, y)$2. **Estimating intermediate values** using $ y_{\text{dumb}}$to compute $ k2, k3,$and $ k4$.
3. **Computing weighted sums** of the k-values to estimate the function at different points.
4. **Error estimation**: Calculating the error based on the differences between the k-values.

The method uses a predictor-corrector approach with adaptive step size control.

Code Example:
```python
# Pseudocode for RK45 method
def rk45(t, y, h):
    k1 = h * f(t, y)
    y_dumb = y + k1 / 4
    
    k2 = h * f(t + h / 4, y_dumb)
    y_dumb = y + 3 * k1 / 32 + 9 * k2 / 32
    
    # Continue for k3, k4, etc.
    
    err = abs(k1 / 360 - 128 * k3 / 4275 - 2197 * k4 / 75240 + k5 / 50. + 2 * k6 / 55)
    if err[0] < Tol and err[1] < Tol and h <= 2 * h_min:
        # Accept step
```
x??

---


#### Adams-Bashforth-Moulton Method (ABM)
Background context: The script also implements the Adams-Bashforth-Moulton (ABM) method, a predictor-corrector approach for solving ODEs. This method uses previous function evaluations to predict and correct future values.

:p What is the purpose of the ABM method in the provided script?
??x
The purpose of the ABM method in the provided script is to integrate ordinary differential equations using an implicit Adams-Bashforth predictor and an explicit Adams-Moulton corrector, which improves accuracy by leveraging past function evaluations. This method involves a sequence of steps where initial values are computed using a Runge-Kutta method, followed by predicting future values with the Adams-Bashforth formula and correcting them with the Adams-Moulton formula.

Code Example:
```python
# Pseudocode for ABM method
def rk4(t, y, h):
    # RK4 implementation

def ABA(a, b, N):
    h = (b - a) / N
    t[0] = a; y[0] = 1.0
    F0 = f(t[0], y[0])
    
    for k in range(1, 4):
        t[k] = a + k * h
        y[k] = rk4(t[k], y, h)
        F1 = f(t[1], y[1])
        F2 = f(t[2], y[2])
        F3 = f(t[3], y[3])

    for k in range(3, N):
        p = y[k] + h / 2 * (-9. * F0 + 37. * F1 - 59. * F2 + 55. * F3)
        t[k+1] = a + k * h
        F4 = f(t[k+1], p)
        y[k+1] = y[k] + h / 2 * (F1 - 5. * F2 + 19. * F3 + 9. * F4)
```
x??

---


#### Numerical and Exact Solutions Visualization
Background context: The script visualizes the numerical solution of the ODE using VPython, comparing it with the exact solution for verification.

:p What is the purpose of plotting both numerical and exact solutions in the script?
??x
The purpose of plotting both numerical and exact solutions in the script is to visually compare the accuracy of the numerical method against the known analytical solution. This helps in understanding how well the numerical integration methods approximate the true behavior of the ODE.

Code Example:
```python
# Plotting code
numsol = gcurve(color=color.red)
exsol = gcurve(color=color.cyan)

for k in range(0, n+1):
    numsol.plot(t[k], y[k])
    exsol.plot(t[k], 3 * exp(-t[k]/2) - 2 + t[k])
```
x??

---


#### Error Estimation and Tolerance
Background context: The script includes mechanisms for estimating errors and adjusting step sizes based on the error tolerance to ensure that the numerical solution is accurate.

:p How does the script adjust the step size during integration?
??x
The script adjusts the step size by comparing the estimated error with a specified tolerance (Tol). If the estimated error is within the allowed tolerance, the step is accepted. Otherwise, the step size is adjusted to either increase or decrease based on the error estimate.

Code Example:
```python
# Step size adjustment code
if err[0] < Tol and err[1] < Tol and h <= 2 * h_min:
    # Accept step
else:
    s = 0.84 * pow(Tol * h / err[0], 0.25)
    if s < 0.75 and h > 2 * h_min:
        h /= 2.
    elif s > 1.5 and 2 * h < h_max:
        h *= 2.

# Flops count
flops = flops + 1
```
x??

---

---


#### Fourier Series Introduction
Background context explaining the concept. The text discusses expanding solutions of nonlinear oscillators into a series of sinusoidal functions (Fourier series). A periodic function can be expressed as a sum of sine and cosine terms with frequencies that are integer multiples of the fundamental frequency.

:p What is the purpose of using Fourier series in analyzing nonlinear oscillators?
??x
The purpose of using Fourier series in analyzing nonlinear oscillators is to decompose the complex periodic motion into simpler harmonic components. This allows for easier analysis and understanding of the system's behavior, especially when the initial transient states have died out.

---


#### Fourier Series Representation
Relevant formulas include expressing a periodic function $y(t)$:
$$y(t) = a_0 + \sum_{n=1}^{\infty}(a_n \cos n\omega t + b_n \sin n\omega t).$$

This equation represents the signal as a sum of pure tones with frequencies that are multiples of the fundamental frequency.

:p What is the general form of a Fourier series for a periodic function?
??x
The general form of a Fourier series for a periodic function $y(t)$ is:
$$y(t) = a_0 + \sum_{n=1}^{\infty}(a_n \cos n\omega t + b_n \sin n\omega t).$$

This representation decomposes the signal into its harmonic components, where each term represents a sine or cosine wave with frequency $n\omega$.

---


#### Fourier Series Coefficients
The coefficients $a_n $ and$b_n $ are determined by multiplying both sides of the series equation by$\cos(n\omega t)$ or $\sin(n\omega t)$, integrating over one period, and then projecting to find each coefficient.

Relevant formulas:
$$(a_n bn) = \frac{2}{T} \int_{0}^{T} y(t) (\cos n\omega t \text{ or } \sin n\omega t) dt.$$:p How are the coefficients $ a_n $ and $ b_n$ calculated in a Fourier series?
??x
The coefficients $a_n $ and$b_n $ in a Fourier series are calculated by integrating the product of the function$y(t)$ and either $\cos(n\omega t)$ or $\sin(n\omega t)$ over one period. The formulas for determining these coefficients are:
$$(a_n bn) = \frac{2}{T} \int_{0}^{T} y(t) (\cos n\omega t \text{ or } \sin n\omega t) dt,$$where $\omega = \frac{2\pi}{T}$.

---


#### Periodic Functions and Fourier Series
Background context: A periodic function can be expanded into a series of harmonic functions with frequencies that are multiples of the fundamental frequency. This is possible due to Fourier's theorem, which states that any single-valued periodic function with only a finite number of discontinuities can be represented by such a series.

:p What does Fourier’s theorem state?
??x
Fourier’s theorem states that any single-valued periodic function with only a finite number of discontinuities can be represented as a sum of sine and cosine functions, i.e., it can be expanded into a Fourier series. This means that the behavior of such functions over time can be approximated by adding together waves of different frequencies.

---


#### Application to Nonlinear Oscillators
Background context: The text discusses applying Fourier series to analyze periodic but non-sinusoidal motions resulting from nonlinear oscillators like those in highly anharmonic potentials or perturbed harmonic oscillators. The analysis helps in understanding the behavior of such systems by breaking down complex motion into simpler, more manageable components.

:p How can Fourier series be used to analyze highly anharmonic oscillators?
??x
Fourier series can be used to analyze highly anharmonic oscillators by decomposing their periodic but non-sinusoidal motions into a sum of sinusoidal functions. This approach allows for the study and analysis of complex behaviors such as sawtooth-like motion, which would otherwise be difficult to understand using simple linear methods.

---


#### Fourier Series in Nonlinear Systems
Background context: In nonlinear systems, the "steady-state" behavior may jump among multiple configurations. Fourier series can help analyze this by providing a spectral representation that shows how much of each frequency is present in the system's response over time.

:p Why might one use Fourier series to analyze nonlinear systems?
??x
One uses Fourier series to analyze nonlinear systems because it helps identify and quantify the presence of various frequencies in the system’s response. This is particularly useful when the steady-state behavior jumps among multiple configurations, as Fourier analysis can reveal how much each frequency contributes to the overall motion.

---


#### Summary of Concepts
This summary consolidates the key points discussed about Fourier series, including their application to nonlinear oscillators and the process of decomposing periodic functions into simpler harmonic components. It emphasizes the importance of understanding both the theoretical underpinnings and practical applications of Fourier analysis in computational physics.

:p What are the main topics covered in this section?
??x
The main topics covered in this section include:
- Introduction to Fourier series and their application to nonlinear oscillators.
- The general form of a Fourier series for periodic functions.
- Calculation of Fourier coefficients using integration techniques.
- Fourier’s theorem and its applicability to single-valued periodic functions with finite discontinuities.
- Use of Fourier analysis in understanding the behavior of complex, non-sinusoidal motions.

---


#### Example Code for Calculating Fourier Coefficients
Background context: Implementing the calculation of Fourier coefficients involves integrating the function over one period. This can be done using numerical integration methods or analytical methods if possible.

:p Provide an example of calculating Fourier coefficients in code.
??x
Here is a simple example of how to calculate Fourier coefficients $a_n $ and$b_n $ for a given periodic function$y(t)$:

```java
public class FourierCoefficients {
    public static double[] calculateFourierCoefficients(double[] y, int N, double T) {
        // N is the number of samples in one period
        // T is the period length

        double[] coefficients = new double[2 * N + 1]; // Array to store an and bn

        for (int n = 0; n <= N; n++) {
            // Calculate a_n
            double an = (2.0 / T) * sumOverOnePeriod(y, n, Math.PI * 2 * n / T);
            coefficients[n] = an;

            // Calculate b_n
            double bn = (2.0 / T) * sumOverOnePeriod(y, n, -Math.PI * 2 * n / T);
            coefficients[N + n + 1] = bn;
        }

        return coefficients;
    }

    private static double sumOverOnePeriod(double[] y, int n, double omega) {
        // Sum the function over one period
        double sum = 0.0;
        for (int i = 0; i < y.length; i++) {
            sum += y[i] * Math.cos(omega * i);
        }
        return sum;
    }
}
```

This code calculates the Fourier coefficients by integrating the function over one period using a simple summation method.

x??

---

