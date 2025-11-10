# High-Quality Flashcards: 10A008---Computational-Physics---Rubin-H_-Landau_processed (Part 29)


**Starting Chapter:** 13.6 Code Listings

---


#### Newton's Law of Gravitation and Planetary Orbits
Background context explaining how Newton used his laws to explain planetary motion. The formula for gravitational force between a planet \(m\) and the sun \(M\) is given by:
\[ F_g = -\frac{G m M}{r^2} \]
where \( r \) is the distance from the planet to the sun, and \( G \) is the universal gravitational constant. The equations of motion are derived from Newton's second law:
\[ F_x = F_{gx} r = F_g \cos\theta \sqrt{x^2 + y^2}, \]
\[ F_y = F_{gy} r = -F_g \sin\theta \sqrt{x^2 + y^2}. \]

:p What are the equations of motion for a planet under the influence of gravity from the sun?
??x
The equations of motion are:
\[ d^2x/dt^2 = -\frac{GM x}{(x^2+y^2)^{3/2}}, \]
\[ d^2y/dt^2 = -\frac{GM y}{(x^2+y^2)^{3/2}}. \]

These equations are derived from Newton's second law and the gravitational force formula.

```java
// Pseudocode for solving ODEs using a simple Euler method (or a more advanced one like RK4)
public class PlanetOrbitSolver {
    public void solveODE(double G, double M) {
        // Initialize x, y, vx, vy with initial conditions
        double[] initialState = {0.5, 0, 0.0, 1.63};
        
        // Time step and number of steps
        double dt = 0.01; // Small time step for precision
        int numSteps = 10000;
        
        // Update positions and velocities using the ODE solver (e.g., RK4)
        for (int i = 0; i < numSteps; i++) {
            // Calculate acceleration components
            double x = initialState[0];
            double y = initialState[2];
            double r = Math.sqrt(x * x + y * y);
            
            double ax = -G * M * x / (r * r * r);
            double ay = -G * M * y / (r * r * r);
            
            // Update velocities
            initialState[1] += ax * dt;
            initialState[3] += ay * dt;
            
            // Update positions
            initialState[0] += initialState[1] * dt;
            initialState[2] += initialState[3] * dt;
        }
    }
}
```
x??

---


#### Numerical Solution of Planetary Orbit Equations
Background context on solving the differential equations numerically. The position and velocity are updated iteratively using a numerical integration method like Runge-Kutta 4th order (RK4).

:p How can you modify an ODE solver to solve the planetary orbit equations?
??x
To modify your ODE solver program, follow these steps:

1. Initialize the state vector with initial conditions.
2. Define the acceleration components based on the gravitational force formula.
3. Implement a numerical integration method like RK4 to update positions and velocities.

```java
// Pseudocode for solving ODEs using Runge-Kutta 4th order (RK4)
public class PlanetOrbitSolver {
    public void solveODE(double G, double M) {
        // Initialize x, y, vx, vy with initial conditions
        double[] initialState = {0.5, 0, 0.0, 1.63};
        
        // Time step and number of steps
        double dt = 0.01; // Small time step for precision
        int numSteps = 10000;
        
        // Runge-Kutta 4th order method
        for (int i = 0; i < numSteps; i++) {
            double[] kx1, ky1, kx2, ky2, kx3, ky3, kx4, ky4;
            
            // Calculate k values for x and y components of velocity
            kx1 = getKx(initialState[0], initialState[1]);
            ky1 = getKy(initialState[2], initialState[3]);
            
            kx2 = getKx(initialState[0] + 0.5 * kx1 * dt, initialState[1] + 0.5 * ky1 * dt);
            ky2 = getKy(initialState[2] + 0.5 * ky1 * dt, initialState[3] + 0.5 * kx1 * dt);
            
            kx3 = getKx(initialState[0] + 0.5 * kx2 * dt, initialState[1] + 0.5 * ky2 * dt);
            ky3 = getKy(initialState[2] + 0.5 * ky2 * dt, initialState[3] + 0.5 * kx2 * dt);
            
            kx4 = getKx(initialState[0] + kx3 * dt, initialState[1] + ky3 * dt);
            ky4 = getKy(initialState[2] + ky3 * dt, initialState[3] + kx3 * dt);
            
            // Update x and y positions
            initialState[0] += (kx1 + 2.0 * kx2 + 2.0 * kx3 + kx4) * dt / 6.0;
            initialState[2] += (ky1 + 2.0 * ky2 + 2.0 * ky3 + ky4) * dt / 6.0;
            
            // Update vx and vy velocities
            initialState[1] += (ky1 + 2.0 * ky2 + 2.0 * ky3 + ky4) * dt / 6.0;
            initialState[3] += (kx1 + 2.0 * kx2 + 2.0 * kx3 + kx4) * dt / 6.0;
        }
    }

    // Function to calculate k values for x
    private double getKx(double x, double vx) {
        return -G * M * x / Math.pow(Math.sqrt(x * x + vx * vx), 3);
    }

    // Function to calculate k values for y
    private double getKy(double y, double vy) {
        return -G * M * y / Math.pow(Math.sqrt(y * y + vy * vy), 3);
    }
}
```
x??

---


#### Discovery of Neptune Using Orbital Mechanics
Background context on how Neptune was discovered by observing perturbations in Uranus's orbit. The masses and distances of the planets are given, along with their initial angular positions.

:p How can you use orbital mechanics to predict Neptune's influence on Uranus?
??x
To predict Neptune's influence on Uranus using orbital mechanics:

1. Define the constants for gravitational constant \( G \), mass of the sun \( M_s \), and masses and distances of both planets.
2. Calculate their angular velocities based on their periods.
3. Initialize their initial positions and velocities.
4. Use a numerical integration method like RK4 to update the positions and velocities over time.

```java
// Pseudocode for predicting Neptune's influence on Uranus using RK4
public class UranusNeptune {
    public void predictInfluence() {
        // Constants in AU, Msun=1
        double G = 4 * Math.PI * Math.PI;
        
        // Masses and distances in units of mass of the sun and astronomical units (AU)
        double mu = 4.366244e-5; // Uranus mass
        double mn = 5.151389e-5; // Neptune mass
        double du = 19.1914;     // Uranus Sun distance (AU)
        double dn = 30.0611;     // Neptune Sun distance (AU)
        
        // Periods in years
        double Tur = 84.0110;    // Uranus period
        double Tnp = 164.7901;   // Neptune period
        
        // Angular velocities
        double omeur = 2 * Math.PI / Tur;
        double omennp = 2 * Math.PI / Tnp;
        
        // Initial positions in radians and Cartesian coordinates
        double radur = (205.64) * Math.PI / 180.0; // Uranus initial position in radians
        double urx = du * Math.cos(radur);         // Initial x for Uranus
        double ury = du * Math.sin(radur);         // Initial y for Uranus
        
        // Use RK4 to integrate the equations of motion over one Neptune period
    }
}
```
x??

---


#### Numerov Method for Solving Schrödinger Equation
Background context: The Numerov method is a numerical algorithm used to solve the time-independent Schrödinger equation for bound states. It is particularly useful for problems where an analytical solution is not feasible, such as the harmonic oscillator potential.

The basic idea behind the Numerov method involves solving second-order ordinary differential equations (ODEs) with high accuracy and efficiency. The method uses a predictor-corrector approach to iteratively improve the wave function at each step.

:p What does the Numerov method solve in this context?
??x
The Numerov method solves the time-independent Schrödinger equation for bound states of a system, such as a harmonic oscillator. It achieves this by numerically integrating the ODE that describes the wave function.
x??

---


#### Bisection Algorithm to Find Bound State Energies
Background context: The bisection algorithm is used in conjunction with the Numerov method to find the energies for which the wave functions satisfy boundary conditions at the edges of the computational domain. This is done by iteratively narrowing down the energy range until a solution is found.

The key idea here is that within certain ranges, there will be values of `e` (energy) where the wave function satisfies specific boundary conditions. The bisection method systematically halves these intervals to converge on the correct value.

:p What algorithm is used in this code to find the energies for which the Schrödinger equation has solutions?
??x
The bisection algorithm is used to find the energies for which the Schrödinger equation has solutions. This involves iteratively narrowing down the range of possible energy values until a solution is found that satisfies the boundary conditions.
x??

---


#### Setting Up the Numerov Wave Function Solvers
Background context: The code sets up solvers for the left and right sides of the computational domain using the Numerov method. These solvers are essential for ensuring that the wave functions match at the boundaries.

The `Numerov` function computes the wave function values given a set of parameters, including energy levels (`e`) and potential wells (`V(x)`).

:p What does the `setk2` function do in this context?
??x
The `setk2` function calculates the value of \( k^2 \) (where \( k = \sqrt{2m(E - V(x))} / \hbar c \)) at each point `i` in the computational domain. This value is used by the Numerov method to solve for the wave functions.

```python
def setk2(e):
    fact = 0.04829  # (2 * m * c^2) / (\hbar c)^2
    for i in range(0, n):
        xLeft = Xleft0 + i * h
        xr = Xright0 - i * h
        k2L[i] = fact * (e - V(xLeft))
        k2R[i] = fact * (e - V(xr))
```
x??

---


#### Right and Left Wave Functions for Numerov Method
Background context: The code initializes the left (`uL`) and right (`uR`) wave functions. These are essential components of the Numerov method, which iteratively computes these wave functions to find a solution that matches at the boundaries.

:p What is the purpose of `uL` and `uR` in this code?
??x
The purpose of `uL` and `uR` is to store the computed values of the left and right wave functions, respectively. These wave functions are used by the Numerov method to solve the time-independent Schrödinger equation iteratively.

These arrays are initialized with specific boundary conditions, such as \( u(0) = 0 \), and then updated using the Numerov algorithm at each step.
x??

---


#### Root-Finding Using Runge-Kutta 4th Order (RK4)
Background context: The Runge-Kutta 4th order method is a powerful technique for solving differential equations numerically. In this code, it is used to find eigenvalues and wave functions by integrating the Schrödinger equation.

The bisection algorithm narrows down the range of possible energies until an energy value is found that satisfies the boundary conditions.

:p What numerical method is used in `QuantumEigen.py` to solve the time-independent Schrödinger equation?
??x
The Runge-Kutta 4th order (RK4) method is used in `QuantumEigen.py` to numerically integrate the differential equations derived from the Schrödinger equation. This method, combined with a bisection algorithm, helps find the eigenvalues and corresponding wave functions for bound states.

The RK4 method involves multiple stages of calculating derivatives at different points to approximate the solution accurately.
x??

---


#### Visualizing Wave Functions
Background context: The code visualizes the left (`uL`) and right (`uR`) wave functions on either side of a computational domain. This helps in understanding how well the boundary conditions are met by the computed wave functions.

:p How does the `diff` function help in finding the correct energy value?
??x
The `diff` function computes the difference between the wave functions at the boundaries to determine if they match correctly. If the differences indicate a mismatch, it adjusts the energy range using the bisection method until the wave functions align properly.

By evaluating the wave functions at both ends and comparing them, the code ensures that the boundary conditions are satisfied, which is crucial for finding accurate eigenvalues.
x??

---


#### Adjusting Energy Range with Bisection
Background context: The bisection algorithm continuously narrows down the energy range by checking if the current midpoint value of `e` satisfies the boundary conditions. This process repeats until the correct energy level is found within a specified precision (`eps`).

:p What does the while loop in this code do?
??x
The while loop in this code implements the bisection method to iteratively narrow down the range of possible energies (`e`). It checks if the current midpoint value satisfies the boundary conditions. If it doesn't, the loop adjusts the energy range by updating `amin` or `amax` based on whether the product of `diff(e)` and `amax` is positive.

This process continues until the difference in wave functions at the boundaries is within the specified precision (`eps`).
x??

---

---


#### Bisection Algorithm for Finding Eigenvalues
Background context: The provided Python script uses a bisection algorithm to find an eigenvalue \(E\) that satisfies a specific condition. This is done by repeatedly dividing the interval between two guesses, \(E_{max}\) and \(E_{min}\), until the difference in the derivative of the wave function at the boundaries falls below a specified tolerance \(\epsilon\). The script also uses a function `diff(E, h)` to evaluate the condition.
:p What is the primary method used in this script to find an eigenvalue?
??x
The bisection algorithm. This method repeatedly narrows down the interval between \(E_{max}\) and \(E_{min}\) by evaluating the derivative difference at the boundaries of the current interval, halving it each time until the desired tolerance is met.

Code Example:
```python
def diff(E, h):
    y = zeros((2), float)
    i_match = n_steps // 3  # Matching radius
    nL = i_match + 1
    y[0] = 1. E-15;  # Initial left wave function value
    y[1] = y[0] * sqrt(-E * 0.4829)  # Initial right wave function value
    for ix in range(0, nL + 1):
        x = h * (ix - n_steps / 2)
        rk4(x, y, h, 2, E)  # Integrate the wave function
    left = y[1] / y[0]  # Log derivative at left boundary

    for ix in range(n_steps, nL + 1, -1):
        x = h * (ix + 1 - n_steps / 2)
        rk4(x, y, -h, 2, E)  # Integrate the wave function
    right = y[1] / y[0]  # Log derivative at right boundary

    return ((left - right) / (left + right))
```
x??

---


#### Iterative Process for Eigenvalue Calculation
Background context: The script iteratively calculates an eigenvalue \(E\) using a bisection algorithm. It starts with initial guesses for \(E_{max}\) and \(E_{min}\), then repeatedly narrows the interval by evaluating the function `diff(E, h)` until the difference in derivatives at both ends of the interval falls below a specified tolerance \(\epsilon\).
:p What happens during each iteration of the main loop?
??x
During each iteration, the script calculates the midpoint \(E = (E_{max} + E_{min}) / 2\) and evaluates the function `diff(E, h)` to determine if the current interval should be adjusted. If the product of `Diff` and the derivative at the upper boundary is positive, it updates \(E_{max}\) to the midpoint; otherwise, it updates \(E_{min}\). The loop continues until the absolute value of `Diff` falls below \(\epsilon\) or a maximum number of iterations (`count_max`) is reached.

Code Example:
```python
for count in range(0, count_max + 1):
    rate(1)  # Slow rate to show changes
    E = (Emax + Emin) / 2.  # Calculate midpoint
    Diff = diff(E, h)
    if(Diff * diff(Emax, h) > 0):  # Check the condition for updating interval
        Emax = E
    else:
        Emin = E
    if(abs(Diff) < eps):
        break
```
x??

---


#### Wave Function Renormalization and Plotting
Background context: After integrating the wave function to both sides, the script renormalizes the left and right wave functions by dividing their values at each point by a normalization factor. This ensures that the overall amplitude of the wave functions is consistent.
:p What is the purpose of the code snippet for renormalizing the wave functions?
??x
The purpose of this code is to ensure that both the left (`Lwf`) and right (`Rwf`) wave functions are properly scaled so their amplitudes match after integration. The script divides the values of `y[0]` and `y[1]` by a normalization factor `normL`, which is calculated as the ratio of the initial left wave function value to its final value.

Code Example:
```python
normL = y[0] / yL[0][nL]
j = 0
for ix in range(0, nL + 1):
    x = h * (ix - n_steps / 2 + 1)
    y[0] = yL[0][ix] * normL
    y[1] = yL[1][ix] * normL
    Lwf.x[j] = 2. * (ix - n_steps / 2 + 1) - 500.0
    Lwf.y[j] = y[0] * 35e-9 + 200
    j += 1
```
x??

---


#### RK4 Integration Method
Background context: The script uses the Runge-Kutta (RK4) method to numerically integrate the wave function. This is a fourth-order method that provides a good balance between accuracy and computational efficiency.
:p What does the `rk4` function do in this script?
??x
The `rk4` function performs a single step of the fourth-order Runge-Kutta (RK4) integration method. It calculates the intermediate values \(k1\), \(k2\), \(k3\), and \(k4\) to estimate the slope at different points, then uses these slopes to determine the next value of the wave function.

Code Example:
```python
def rk4(x, y, h, Neqs, E):
    k1 = [0. for i in range(Neqs)]
    k2 = [0. for i in range(Neqs)]
    k3 = [0. for i in range(Neqs)]
    k4 = [0. for i in range(Neqs)]

    f(x + h / 2., y, F, E)  # First function evaluation
    for i in range(0, Neqs):
        k2[i] = h * F[i]

    f(x + h / 2., y + [k2[i] / 2. for i in range(Neqs)], F, E)  # Second function evaluation
    for i in range(0, Neqs):
        k3[i] = h * F[i]

    f(x + h, y + [k3[i] for i in range(Neqs)], F, E)  # Third function evaluation
    for i in range(0, Neqs):
        k4[i] = h * F[i]

    for i in range(0, Neqs):
        y[i] += (k1[i] + 2. * (k2[i] + k3[i]) + k4[i]) / 6.
```
x??

---


#### Projectile Motion with Air Resistance
Background context: The script models the trajectory of a projectile in two scenarios: one without air resistance and another with air resistance using a drag coefficient \(kf\). It calculates the time to reach maximum height, total flight time, and range for both cases. Then it uses numerical integration (RK4) to plot the trajectory with and without air resistance.
:p What are the main differences between the trajectories calculated in this script?
??x
The main difference is that the trajectory with air resistance follows a different path compared to the one without air resistance due to the drag force. The projectile with air resistance will reach its maximum height more quickly, have a shorter range, and follow a parabolic path that is less symmetrical than the frictionless case.

Code Example:
```python
def plotNumeric(kf):
    vx = v0 * cos(angle * pi / 180.)
    vy = v0 * sin(angle * pi / 180.)
    x = 0.0
    y = 0.0
    dt = vy / g / N / 2.
    print(" With Friction ")
    print("x y ")
    for i in range(N):
        rate(30)
        vx = vx - kf * vx * dt
        vy = vy - g * dt - kf * vy * dt
        x = x + vx * dt
        y = y + vy * dt
        funct.plot(pos=(x, y))
        print(" %13.10f  %13.10f " % (x, y))

def plotAnalytic():
    v0x = v0 * cos(angle * pi / 180.)
    v0y = v0 * sin(angle * pi / 180.)
    dt = 2. * v0y / g / N
    print(" No Friction ")
    print("x y ")
    for i in range(N):
        rate(30)
        t = i * dt
        x = v0x * t
        y = v0y * t - g * t * t / 2.
        funct.plot(pos=(x, y))
```
x??

---


#### Self-Similarity and Fractals
Background context: The Sierpiński gasket is self-similar, meaning that any small region of the figure is similar to the whole structure at different scales. This property is fundamental to fractal geometry.

:p What does it mean for a figure to be self-similar?
??x
Self-similarity in a figure means that any part of the figure can be scaled up and will look similar to the entire figure. In other words, if you zoom into any small region of a self-similar object, you will see the same pattern repeated at different scales.

For example, in the Sierpiński gasket:
- Any small triangle within the structure is similar to the larger triangles that make up the whole.
- As the gasket grows larger and more mass is added, it still retains the same self-similar pattern at all levels of detail.

x??

---


#### Measuring Fractal Dimension Empirically
Background context: The fractal dimension can be empirically determined by analyzing how the total mass \( M \) of an object scales with its size \( L \). For a Sierpiński gasket, each dot has a mass of 1, and the density is defined as the mass per unit area.

:p How can you determine the fractal dimension empirically for a Sierpiński gasket?
??x
To determine the fractal dimension empirically, you need to analyze how the total mass \( M \) scales with the size \( L \). For a Sierpiński gasket:

1. **Mass and Length Relationship**: Assume each dot has a mass of 1.
2. **Density Calculation**: The density \( \rho \) is given by:
   \[ \rho = \frac{M}{\text{Area}}. \]
3. **Scaling Relationship**: For successive iterations, the density changes according to:
   - For \( L = r \): 
     \[ \rho(L=r) \propto M r^2 = m r^2 \text{def}=\rho_0. \]
   - For \( L = 2r \):
     \[ \rho(L=2r) \propto (M = 3m)(2r)^2 = 3/4 \cdot \rho_0. \]
   - For \( L = 4r \):
     \[ \rho(L=4r) \propto (M = 9m)(4r)^2 = (3/4)^2 \cdot \rho_0. \]

Using these relationships, you can plot \( \log(\rho) \) versus \( \log(L) \) and find the slope of the line, which corresponds to \( d_f - 2 \).

The fractal dimension is then:
\[ d_f = 2 + \Delta \log(\rho(L)) / \Delta \log(L). \]

x??

---

---


#### Code for Generating 3D Fractal Fern

Background context: The provided code `Fern3D.py` (Listing 14.1) generates a 3D version of Barnsley’s fern.

:p What is the purpose of `Fern3D.py`?
??x
The purpose of `Fern3D.py` is to generate a 3D representation of Barnsley’s fern, extending the 2D algorithm used for generating the 2D fractal into three dimensions.
x??

---


#### Summary of Key Concepts

Background context: This summary aims to consolidate the understanding of self-similarity, affine transformations, and how they are applied in generating complex natural structures like Barnsley's fern.

:p What key concepts were covered?
??x
The key concepts covered include:
- Self-similarity and fractals.
- Affine transformations (scaling, rotation, translation).
- The algorithm used to generate Barnsley’s fern.
- The self-affine nature of the generated structures.
- A practical implementation in 3D using `Fern3D.py`.

These concepts are fundamental for understanding how complex natural patterns can be modeled and generated through simple mathematical rules.
x??

---

---

