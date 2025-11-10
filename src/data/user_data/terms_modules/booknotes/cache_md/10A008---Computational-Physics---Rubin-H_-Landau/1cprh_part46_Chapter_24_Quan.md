# High-Quality Flashcards: 10A008---Computational-Physics---Rubin-H_-Landau_processed (Part 46)


**Starting Chapter:** Chapter 24 Quantum Wave Packets and EM Waves. 24.1 TimeDependent Schrodinger Equation

---


#### Time-Dependent Schrödinger Equation
Background context: In this problem, we are dealing with an electron confined to a 1D region of atomic size. The electron starts with both defined momentum and position, making it necessary to solve the time-dependent Schrödinger equation rather than the time-independent eigenvalue problem.

The initial wave function is given as a Gaussian multiplied by a plane wave:
\[
\psi(x,t=0) = \exp\left[-\frac{1}{2} \left(\frac{x-5}{\sigma_0}\right)^2 + ik_x x \right]
\]
where \(\hbar = 1\) and \(k_x\) is the wave vector corresponding to a defined momentum.

The time-dependent Schrödinger equation for this problem is:
\[
i \frac{\partial \psi(x,t)}{\partial t} = -\frac{1}{2m} \frac{\partial^2 \psi(x,t)}{\partial x^2} + V(x) \psi(x,t)
\]
Since the initial wave function is complex, we must separate it into real and imaginary parts to solve for both components:
\[
\psi(x,t) = R(x,t) + i I(x,t)
\]

The equations governing \(R\) and \(I\) are:
\[
\frac{\partial R(x,t)}{\partial t} = - \frac{\partial^2 I(x,t)}{\partial x^2} + V(x) I(x,t)
\]
\[
\frac{\partial I(x,t)}{\partial t} = + \frac{\partial^2 R(x,t)}{\partial x^2} - V(x) R(x,t)
\]

The potential \(V(x)\) confines the electron to an atomic size region.

:p What is the initial wave function of the electron, and what does it represent?
??x
The initial wave function \(\psi(x, t=0) = \exp\left[-\frac{1}{2} \left(\frac{x-5}{\sigma_0}\right)^2 + ik_x x \right]\) is a Gaussian localized around \(x=5\) with some defined momentum given by the plane wave. This function combines spatial localization and a definite momentum, making it a wave packet.

```python
import numpy as np

def initial_wave_function(x, sigma_0, k_x):
    return np.exp(-0.5 * ((x - 5) / sigma_0)**2 + 1j * k_x * x)
```
x??

---


#### Time-Dependent Schrödinger Equation Solution
Background context: The time-dependent Schrödinger equation is used to describe the evolution of a quantum system over time, especially when both position and momentum are defined. Unlike the time-independent eigenvalue problem, we need to solve for the wave function in terms of both space and time.

The key equations are:
\[
i \frac{\partial \psi(x,t)}{\partial t} = -\frac{1}{2m} \frac{\partial^2 \psi(x,t)}{\partial x^2} + V(x) \psi(x,t)
\]
and the separated real and imaginary parts:
\[
\frac{\partial R(x,t)}{\partial t} = - \frac{\partial^2 I(x,t)}{\partial x^2} + V(x) I(x,t)
\]
\[
\frac{\partial I(x,t)}{\partial t} = + \frac{\partial^2 R(x,t)}{\partial x^2} - V(x) R(x,t)
\]

:p What are the equations governing the real and imaginary parts of the wave function?
??x
The equations governing the real and imaginary parts \(R\) and \(I\) of the wave function \(\psi(x,t)\) are:
\[
\frac{\partial R(x,t)}{\partial t} = - \frac{\partial^2 I(x,t)}{\partial x^2} + V(x) I(x,t)
\]
and
\[
\frac{\partial I(x,t)}{\partial t} = + \frac{\partial^2 R(x,t)}{\partial x^2} - V(x) R(x,t)
\]

These equations describe how the real and imaginary parts of the wave function evolve over time in response to the potential \(V(x)\).

```python
def real_part_equation(R, I, x, V):
    return -np.gradient(np.gradient(I, x), x) + V * I

def imag_part_equation(R, I, x, V):
    return np.gradient(np.gradient(R, x), x) - V * R
```
x??

---


#### Wave Packet in Quantum Mechanics
Background context: A wave packet is a quantum state that combines the properties of multiple plane waves. It can be represented as a superposition of Gaussian and plane wave components. In this problem, the electron starts with both defined momentum and position, making it a wave packet.

The initial wave function \(\psi(x,t=0)\) has been set to:
\[
\psi(x,t=0) = \exp\left[-\frac{1}{2} \left(\frac{x-5}{\sigma_0}\right)^2 + ik_x x \right]
\]

:p What is a wave packet in quantum mechanics?
??x
A wave packet in quantum mechanics is a localized wave function that represents a particle with both defined position and momentum. It is constructed as a superposition of plane waves, each with its own wave vector \(k\) and amplitude.

In this context, the initial wave function \(\psi(x,t=0)\) combines a Gaussian spatial distribution centered at \(x=5\) with a plane wave component to define both the position and momentum of the electron.

```python
import numpy as np

def gaussian_wave_packet(x, sigma_0, k_x):
    return np.exp(-0.5 * ((x - 5) / sigma_0)**2 + 1j * k_x * x)
```
x??

---


#### Confinement Potential in the Problem
Background context: The problem involves an electron confined to a small region, similar in size to an atom. This confinement is achieved using a potential \(V(x)\), which needs to be known or defined for solving the Schrödinger equation.

The initial wave function \(\psi(x,t=0)\) must satisfy this potential at all points \(x\).

:p What is the role of the potential \(V(x)\) in the problem?
??x
The potential \(V(x)\) plays a crucial role as it confines the electron to a region, typically an atomic size. It influences the evolution of the wave function \(\psi(x,t)\) by determining the energy and spatial distribution of the electron.

In this specific problem, the potential must be known or defined to solve the time-dependent Schrödinger equation accurately.

```python
def confinement_potential(x):
    # Define a simple harmonic oscillator potential for example
    return 0.5 * x**2
```
x??

---


#### Time Evolution of Wave Function
Background context: The wave function \(\psi(x,t)\) must be evolved over time according to the time-dependent Schrödinger equation, which includes both spatial and temporal derivatives.

The initial condition is given by a Gaussian multiplied by a plane wave:
\[
\psi(x,t=0) = \exp\left[-\frac{1}{2} \left(\frac{x-5}{\sigma_0}\right)^2 + ik_x x \right]
\]

:p How does the wave function evolve over time according to the Schrödinger equation?
??x
The wave function \(\psi(x,t)\) evolves over time according to the time-dependent Schrödinger equation:
\[
i \frac{\partial \psi(x,t)}{\partial t} = -\frac{1}{2m} \frac{\partial^2 \psi(x,t)}{\partial x^2} + V(x) \psi(x,t)
\]

This equation describes the time evolution of a quantum state, considering both the spatial and temporal dependencies. The initial condition is:
\[
\psi(x,t=0) = \exp\left[-\frac{1}{2} \left(\frac{x-5}{\sigma_0}\right)^2 + ik_x x \right]
\]

```python
import numpy as np

def time_evolution_step(R, I, x, V, dt):
    # Forward Euler method for simplicity
    R_new = R - dt * real_part_equation(R, I, x, V)
    I_new = I + dt * imag_part_equation(R, I, x, V)
    return R_new, I_new

def real_part_equation(R, I, x, V):
    return -np.gradient(np.gradient(I, x), x) + V * I

def imag_part_equation(R, I, x, V):
    return np.gradient(np.gradient(R, x), x) - V * R
```
x??

---

---


#### Split-Time Algorithm for Solving Schrödinger's Equation
The time-dependent Schrödinger equation can be solved using both implicit (large-matrix) and explicit (leapfrog) methods. A significant challenge is to conserve probability, \(\int_{-\infty}^{+\infty} dx \psi^*(x,t)\psi(x,t)\), at a high level of precision throughout the computation.

The split-time algorithm uses an explicit method that provides high-level probability conservation by solving for the real and imaginary parts of the wave function at staggered times. Specifically, the real part \(R\) is determined at times 0, \(\Delta t\), ..., while the imaginary part \(I\) is determined at times \(\frac{1}{2}\Delta t\), \(\frac{3}{2}\Delta t\), ...

The algorithm is based on Taylor expansions of \(R\) and \(I\):
\[ R(x,t+\frac{1}{2}\Delta t) = R(x,t-\frac{1}{2}\Delta t) + [4\alpha+V(x)\Delta t] I(x,t) - 2\alpha[I(x+\Delta x, t) + I(x-\Delta x, t)], \]
where \(\alpha = \frac{\Delta t}{2(\Delta x)^2}\).

In discrete form:
\[ R^{n+1}_i = R^n_i - 2 (\alpha [I^{n}_{i+1} + I^{n}_{i-1}] - 2 [\alpha + V^i \Delta t] I^n_i), \]
\[ I^{n+1}_i = I^n_i + 2 (\alpha [R^{n}_{i+1} + R^{n}_{i-1}] - 2 [\alpha + V^i \Delta t] R^n_i). \]

The probability density \(\rho\) is defined in terms of the wave function evaluated at three different times:
\[ \rho(t) = \begin{cases} 
R^2(t) + I^{t+\frac{1}{2}\Delta t}I^{t-\frac{1}{2}\Delta t}, & \text{for integer } t, \\
I^2(t) + R^{t+\frac{1}{2}\Delta t}R^{t-\frac{1}{2}\Delta t}, & \text{for half-integer } t.
\end{cases} \]

Although probability is not exactly conserved by the algorithm, the error in the wave function's probability conservation is two orders higher than that of the wave function itself.

:p What is the split-time algorithm and why is it used?
??x
The split-time algorithm is an explicit method for solving the time-dependent Schrödinger equation. It ensures high-level probability conservation by solving for real and imaginary parts at staggered times, using Taylor expansions to maintain accuracy.
```python
# Example Pseudocode for Split-Time Algorithm
def update_real_part(R, I, V, dt, dx):
    alpha = dt / (2 * dx**2)
    for i in range(1, 750):  # Loop through spatial points excluding boundaries
        R[i] = R[i] - 2 * (alpha * (I[i+1] + I[i-1]) - 
                           2 * (alpha + V[i] * dt) * I[i])

def update_imaginary_part(I, R, V, dt, dx):
    alpha = dt / (2 * dx**2)
    for i in range(1, 750):  # Loop through spatial points excluding boundaries
        I[i] = I[i] + 2 * (alpha * (R[i+1] + R[i-1]) - 
                           2 * (alpha + V[i] * dt) * R[i])
```
x??

---


#### Implementation of Split-Time Algorithm
The program `HarmosAnimate.py` solves the motion of a wave packet inside a harmonic oscillator potential. Another program, `Slit.py`, is used to solve for the motion of a Gaussian wave packet passing through a slit.

For an electron confined in an infinite square well:
\[ V(x) = \begin{cases} 
\infty, & x < 0 \text{ or } x > 15, \\
0, & 0 \leq x \leq 15.
\end{cases} \]

Using the values: \(\sigma_0=0.5\), \(\Delta x = 0.02\), \(k_o = 17\pi\), and \(\Delta t = \frac{1}{2}\Delta x^2\).

The initial wave packet is defined using equation (24.1) at time \(t=0\) and \(t=\frac{1}{2}\Delta t\). The boundary conditions are set such that the wave function vanishes at the walls of the well.

:p How do you implement the split-time algorithm for a wave packet in an infinite square well?
??x
To implement the split-time algorithm, we define arrays `psr` and `psi` to store real and imaginary parts of \(\psi\), and `Rho` for probability. We use Taylor expansions to update these values at staggered times.

```python
# Example Pseudocode for Infinite Square Well
def initialize_wave_packet(psxr, psi, Rho, x):
    # Initialize wave packet using initial conditions
    pass

def update_wave_packet(psr, psi, V, dt, dx):
    alpha = dt / (2 * dx**2)
    
    for i in range(1, 750):  # Loop through spatial points excluding boundaries
        psr[i][2] = psr[i][1] - 2 * (alpha * (psi[i+1][1] + psi[i-1][1]) - 
                                     2 * (alpha + V[i] * dt) * psi[i][1])
        
    for i in range(1, 750):  # Loop through spatial points excluding boundaries
        psi[i][2] = psi[i][1] + 2 * (alpha * (psr[i+1][1] + psr[i-1][1]) - 
                                     2 * (alpha + V[i] * dt) * psr[i][1])

def compute_probability(Rho, psr, psi):
    # Compute probability density using the split-time algorithm
    pass

# Set boundary conditions and initial wave packet
psr[0:751, 0] = initialize_wave_packet(psxr, psi, Rho, x)
Rho[1] = 0.0
Rho[751] = 0.0

# Update the wave packet for 200 steps and compute probability density
for step in range(200):
    update_wave_packet(psr, psi, V, dt/2, dx)
    Rho = compute_probability(Rho, psr, psi)

```
x??

---


#### Probability Conservation Check
After running the program for about 5000 steps, we output the probability density after every 200 steps. We then make a surface plot of probability versus position versus time.

:p How do you check if probability is conserved in the split-time algorithm?
??x
To check if probability is conserved, we compute the integral of the probability over all space at different times and observe how it changes with time. This helps us understand any deviations from exact conservation due to numerical errors.

```python
# Example Pseudocode for Checking Probability Conservation
def integrate_probability(Rho, dx):
    # Integrate probability density Rho over all spatial points
    total_prob = 0.0
    for i in range(751):  # Loop through all spatial points
        total_prob += Rho[i] * dx
    return total_prob

# Compute the integral of probability at initial and final times
initial_prob = integrate_probability(Rho, dx)
final_prob = integrate_probability(Rho, dx)

# Compare the two probabilities to check for conservation
delta_prob = abs(initial_prob - final_prob)
```
x??

---


#### Special Schrödinger Algorithm for 2D Systems

Background context: This section introduces a special algorithm to solve the time-dependent Schrödinger equation in 2D. The key idea is to use the formal solution \(U(t) = e^{-i\tilde{H}t}\), where \(\tilde{H} = -\left(\frac{\partial^2}{\partial x^2} + \frac{\partial^2}{\partial y^2}\right) + V(x, y)\).

The algorithm uses a finite difference approach to approximate the second derivative and incorporates the Hamiltonian evolution through time steps.

:p How is the 2D Schrödinger equation integrated using this special algorithm?
??x
The 2D Schrödinger equation is integrated by approximating the second derivatives with Taylor expansions:
\[
\frac{\partial^2 \Psi}{\partial x^2} \approx -\frac{1}{2}\left(\Psi_{i+1,j} + \Psi_{i-1,j} - 2\Psi_{i,j}\right)
\]

The time evolution equation is then split into real and imaginary parts for numerical stability:
\[
\Psi_{n+1}^{i,j} = \Psi_{n-1}^{i,j} - 2i\left[\frac{4\alpha + 1}{2\Delta t V_{i,j}} I_n^{i,j} - \alpha (I_n^{i+1,j} + I_n^{i-1,j} + I_n^{i,j+1} + I_n^{i,j-1})\right]
\]

Where:
- \(V_{i,j}\) is the potential at position \((i \Delta x, j \Delta y)\)
- \(\alpha = \frac{\Delta t}{2 (\Delta x)^2}\)
- \(I_n\) represents the imaginary part of the wave function.

This approach ensures that the wave function evolves correctly with time.
x??

---

