# High-Quality Flashcards: 10A008---Computational-Physics---Rubin-H_-Landau_processed (Part 3)


**Starting Chapter:** 2.6 Plotting Exercises

---


#### Fourier Reconstruction
Background context: The program `FourierMatplot.py` performs a Fourier reconstruction of a sawtooth wave using Matplotlib. Users can control the number of waves included via a slider, allowing real-time visualization.

:p How does the `Slider` widget work in the `FourierMatplot.py` program?
??x
The `Slider` widget works by allowing users to adjust the number of waves included in the Fourier reconstruction through an interactive bar. The code snippet provided uses Matplotlib's `Slider` class, which updates the plot based on the current value set by the user.

Example code:
```python
from matplotlib.widgets import Slider

# Assuming airwaves is a previously defined axes object
shortwaves = Slider(ax=airwaves, label='# Waves', valmin=1, valmax=20, valinit=5)

def update(val):
    # Update function to be called when the slider value changes
    new_val = shortwaves.val
    # Perform Fourier reconstruction with `new_val` waves

snumwaves.on_changed(update)
```
x??

---


#### Three-Support Beam Analysis
Background context: The problem is extended to include a third support under the right edge of the beam.

:p How would you extend the two-support problem to include a third support?
??x
To extend the two-support problem to include a third support, we need to consider additional equilibrium conditions for the system. Specifically:
1. Define positions and forces at all three supports.
2. Use moment balance equations around each support point.

Example pseudocode:
```pseudocode
function calculateThreeSupportForces(L, d1, d2, W, Wb, v):
    # L: Length of the beam
    # d1: Distance from left end to first support
    # d2: Distance between supports (from second to third)
    # W: Weight of the box initially above left support
    # Wb: Total weight of the box
    # v: Velocity of the box

    x = 0  # Initial position of the box
    while x <= L - d1:
        force_left, force_middle, force_right = calculateForces(L, d1, d2, W, Wb, v, x)
        print("Position: ", x, "Force Left: ", force_left, "Force Middle: ", force_middle, "Force Right: ", force_right)
        x += 0.1  # Increment position by small step
```
x??

---


#### PondMatPlot.py - Monte Carlo Integration via von Neumann Rejection
Background context: This script demonstrates how to perform Monte Carlo integration using the von Neumann rejection method in Python. It uses matplotlib for plotting and numpy for numerical operations.

```python
import numpy as np, matplotlib.pyplot as plt

N = 100; Npts = 3000; analyt = np.pi ** 2
x1 = np.arange(0, 2 * np.pi + 2 * np.pi / N, 2 * np.pi / N)
xi = []; yi = []; xo = []; yo = []

fig, ax = plt.subplots()
y1 = x1 * np.sin(x1) ** 2  # Define the integrand function

# Plot the curve of the integrand.
ax.plot(x1, y1, 'c', linewidth=4)
ax.set_xlim((0, 2 * np.pi))
ax.set_ylim((0, 5))
ax.set_xticks([0, np.pi, 2 * np.pi])
ax.set_xticklabels(['0', '\(\pi\)', '2\(\pi\)'])
ax.set_ylabel(r'\(f(x) = x \,\sin^2 x \)', fontsize=20)
ax.set_xlabel('x', fontsize=20)
fig.patch.set_visible(False)

# Define the integrand function as a Python function.
def fx(x): return x * np.sin(x) ** 2

j = 0  # Counter for points inside the curve
```

:p What is the role of `fx(x)` in this script?
??x
The `fx(x)` function defines the integrand \( f(x) = x \cdot \sin^2(x) \), which represents the mathematical function to be integrated. This function is used later in the integration process, specifically when using the von Neumann rejection method for Monte Carlo simulation.
x??

--- 

Each flashcard covers a different aspect of the provided scripts, ensuring comprehensive understanding and familiarity with the concepts involved.

---


---
#### Monte Carlo Simulation for Area Calculation
Background context: This concept involves using a Monte Carlo method to estimate the area under a curve. The Monte Carlo method relies on random sampling and probability, making it suitable for problems where traditional integration methods might be difficult or impractical.

:p What is the purpose of this code snippet?
??x
The purpose of this code snippet is to approximate the area under a curve using the Monte Carlo method. By generating random points within a known area (in this case, a box) and determining how many fall below the curve, we can estimate the area under the curve.

```python
import numpy as np

Npts = 1000  # Number of random points to generate
fx = lambda x: np.sin(x / np.pi) * np.sqrt(2 - x ** 2)

# Generate random points
xx = np.pi * np.random.rand(Npts)
yy = 5 * np.random.rand(Npts)

j = 0
for i in range(1, Npts):
    if (yy[i] <= fx(xx[i])):  # Below curve
        if (i <= 100): xi.append(xx[i])
        if (i <= 100): yi.append(yy[i])
        j += 1
    else:
        if (i <= 100): yo.append(yy[i])
        if (i <= 100): xo.append(xx[i])

boxarea = 2 * np.pi * 5  # Box area is 2π × 5
area = boxarea * j / (Npts - 1)  # Area under the curve

ax.plot(xo, yo, 'bo', markersize=3)
ax.plot(xi, yi, 'ro', markersize=3)

plt.title('Answers: Analytic = {0:.5f}, MC = {1:.5f}'.format(analytic_value, area))
```
x??

---


#### Machine Precision Determination
The script illustrates how to determine the machine precision by halving an initial value repeatedly until the addition of this value to 1.0 no longer affects the result.

:p How does the script determine the approximate machine precision?
??x
The script initializes `eps` to 1.0 and repeatedly halves it while adding the current value of `eps` to 1.0. It continues this process until the addition no longer changes the value, indicating that further halving would result in a loss of significance.

```python
N = 10
eps = 1.0
for i in range(N):
    eps = eps / 2
    one_Plus_eps = 1.0 + eps
print('eps = ', eps, ', one + eps = ', one_Plus_eps)
```
x??

---

---


#### Random Errors
Background context: These errors arise from unpredictable events, such as fluctuations in electronics, cosmic rays, or power interruptions. They are inherent and cannot be controlled but can be managed through reproducibility checks.

:p How do random errors affect computational results?
??x
Random errors can make a result unreliable over time because they increase the likelihood of incorrect outcomes as the computation runs longer.
x??

---


#### Approximation Errors
Background context: These errors occur when simplifying mathematical models to make them computable. Examples include replacing infinite series with finite sums, approximating infinitesimals with small values, and using constant approximations for variable functions.

:p What is an example of an approximation error?
??x
An example is the Taylor series expansion of \(\sin(x)\), where:
\[ \sin(x) = \sum_{n=1}^{\infty} \frac{(-1)^{n-1}}{(2n-1)!} x^{2n-1} \]
This infinite series can be approximated by a finite sum, say \(N\):
\[ \sin(x) \approx \sum_{n=1}^{N} \frac{(-1)^{n-1}}{(2n-1)!} x^{2n-1} + O(x^{N+1}) \]
The approximation error is the difference between the actual series and the finite sum.
x??

---


#### Round-off Errors
Background context: These errors arise from using a finite number of digits to store floating-point numbers. They are analogous to measurement uncertainties in experiments.

:p What is an example illustrating round-off errors?
??x
An example is storing \(\frac{1}{3}\) and \(\frac{2}{3}\) with four decimal places:
\[ 1/3 = 0.3333 \]
\[ 2/3 = 0.6667 \]
When performing a simple calculation like \(2(1/3) - 2/3\):
```python
# Python code example
result = 2 * (1/3) - 2/3
print(result)
```
The result is:
\[ 2(1/3) - 2/3 = 0.6666 - 0.6667 = -0.0001 \neq 0 \]
x??

---

---

