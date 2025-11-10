# High-Quality Flashcards: 10A008---Computational-Physics---Rubin-H_-Landau_processed (Part 28)


**Starting Chapter:** Chapter 13 ODE Applications Eigenvalues Scattering Trajectories. 13.2.1 Not Recommended Matchless Searching

---


#### Numerical Solution of the Schrödinger Equation
To solve the Schrödinger equation numerically, we use an ODE solver. For a particle in a finite square well potential \(V(x)\), the wave function \(\psi(x)\) is determined by:
\[
-\frac{\hbar^2}{2m} \frac{d^2\psi(x)}{dx^2} + V(x) \psi(x) = E \psi(x),
\]
where the potential \(V(x)\) is defined as:
\[
V(x) = 
\begin{cases} 
-V_0, & |x| \leq a, \\
0, & |x| > a.
\end{cases}
\]

:p How does the Schrödinger equation change for the finite square well potential?
??x
The Schrödinger equation changes to:
\[
-\frac{\hbar^2}{2m} \frac{d^2\psi(x)}{dx^2} + V(x) \psi(x) = E \psi(x),
\]
where \(V(x)\) is the finite square well potential defined as:
\[
V(x) = 
\begin{cases} 
-V_0, & |x| \leq a, \\
0, & |x| > a.
\end{cases}
\]
For \(|x| \leq a\), it becomes:
\[
-\frac{\hbar^2}{2m} \frac{d^2\psi(x)}{dx^2} - V_0 \psi(x) = E \psi(x),
\]
and for \(|x| > a\):
\[
-\frac{\hbar^2}{2m} \frac{d^2\psi(x)}{dx^2} = E \psi(x).
\]

x??

---


#### Numerical Integration Method
The numerical method involves integrating the wave function step-by-step. We start by assuming a wave function that satisfies the boundary condition at \(x \to -\infty\) and integrate towards the origin. Similarly, we assume another wave function satisfying the boundary condition at \(x \to +\infty\) and integrate backwards to the matching radius.

:p How is the wave function integrated for bound states?
??x
The wave function is integrated step-by-step using an ODE solver. We start by assuming a wave function that satisfies:
\[
\psi(x) = e^{\kappa x} \quad \text{for } x \to -\infty.
\]
We then integrate this towards the origin, matching it with another solution at \(x_m\) where:
\[
\psi(x) = 
\begin{cases} 
e^{-\kappa (x-x_m)}, & \text{for } x > x_m, \\
\psi_{R}(x), & \text{for } x < x_m.
\end{cases}
\]
Similarly, for the right side:
\[
\psi(x) = e^{-\kappa x} \quad \text{for } x \to +\infty,
\]
and integrate backwards to \(x_m\) matching it with a solution on the left.

x??

---


#### Search Algorithm for Bound States
The search algorithm involves integrating the wave function from both sides and finding the point where they match. This is done iteratively by checking various energies until the boundary conditions are satisfied.

:p What is the role of the search algorithm in solving the eigenvalue problem?
??x
The search algorithm integrates the wave function from both sides towards a matching radius \(x_m\). By varying the energy, we find values where the wave functions match at \(x_m\), indicating an eigenvalue. This process involves:
1) Starting with a large negative \(x\) and integrating to the left.
2) Starting with a large positive \(x\) and integrating to the right.
3) Matching these solutions at some point \(x_m\) between \(-a\) and \(+a\).

This iterative approach helps in finding energy levels where the wave function is normalizable, thus solving the eigenvalue problem.

x??

---


#### Iteration Scheme for Solving ODEs

Background context: The problem involves solving an ordinary differential equation (ODE) to find the wave function and potential. The goal is to determine if the solution is a ground state or excited state, and whether it's even or odd about the origin.

:p What is the iteration scheme in this context used for?
??x
The iteration scheme is used to solve the ODE numerically using methods like Numerov or Runge-Kutta (rk4). The scheme iterates until a certain number of iterations are reached, with a warning if it fails. This helps ensure that we find accurate solutions.
```java
// Pseudocode for Iteration Scheme
void iterateOdeSolver(double initialEnergyGuess) {
    int maxIterations = 1000; // Example value
    double tolerance = 1e-6; // Tolerance to check convergence

    for (int i = 0; i < maxIterations; i++) {
        // Solve ODE with current energy guess
        solveOde(initialEnergyGuess);
        
        // Check if solution meets convergence criteria
        if (checkConvergence()) break;

        // If not converged, adjust initial energy and continue
        initialEnergyGuess += 0.1; // Example adjustment

        // Print warning if maximum iterations reached without convergence
        if (i == maxIterations - 1) {
            System.out.println("Iteration scheme failed to converge.");
        }
    }
}
```
x??

---


#### Plotting Wave Function and Potential

Background context: To visualize the solution, we need to plot both the wave function and potential on the same graph. Since they have different scales, one axis will be scaled appropriately.

:p How do you plot the wave function and potential together?
??x
To plot the wave function and potential together, first normalize them such that their ranges are comparable or scale one of them. Use a common x-axis for both functions and set up separate y-axes if necessary.
```java
// Pseudocode for Plotting
void plotWaveFunctionAndPotential(double[] xPoints, double[] waveFunctionValues, double[] potentialValues) {
    // Normalize values if needed
    normalizeValues(waveFunctionValues);
    
    // Set up graph with two y-axes or scale one axis appropriately
    setupGraphWithTwoYAxes();
    
    // Plot the wave function and potential on the same x-axis
    plot(xPoints, waveFunctionValues, "Wave Function", Color.BLUE);
    plot(xPoints, potentialValues, "Potential Energy", Color.RED);
}

void normalizeValues(double[] values) {
    double min = Arrays.stream(values).min().getAsDouble();
    for (int i = 0; i < values.length; i++) {
        values[i] -= min;
    }
}
```
x??

---


#### Identifying Ground State and Excited States

Background context: By counting the nodes in the wave function, we can determine if the solution is a ground state or excited state. The ground state must be even about the origin.

:p How do you identify if the solution is a ground state or an excited state?
??x
To identify whether the solution is a ground state or an excited state, count the number of nodes in the wave function:
- If there are no nodes, it is a ground state.
- If there are one or more nodes, it is an excited state.

Additionally, check if the wave function is even about the origin. The ground state must be even (symmetric).

```java
// Pseudocode for Identifying States
boolean isEvenWaveFunction(double[] xPoints, double[] waveFunctionValues) {
    int size = xPoints.length;
    boolean symmetric = true;

    for (int i = 0; i < size / 2; i++) {
        if (waveFunctionValues[i] != waveFunctionValues[size - 1 - i]) {
            symmetric = false;
            break;
        }
    }

    return symmetric;
}

int countNodes(double[] xPoints, double[] waveFunctionValues) {
    int nodeCount = 0;

    for (int i = 1; i < xPoints.length - 1; i++) {
        if ((waveFunctionValues[i] * waveFunctionValues[i + 1]) < 0) { // Change in sign indicates a node
            nodeCount++;
        }
    }

    return nodeCount;
}

void identifyState(double[] xPoints, double[] waveFunctionValues) {
    int nodes = countNodes(xPoints, waveFunctionValues);
    
    if (nodes == 0) {
        System.out.println("Ground state: Even function");
    } else {
        System.out.println("Excited state with " + nodes + " nodes");
    }
}
```
x??

---


#### Finding Excited States

Background context: By increasing the initial energy guess and searching for excited states, we ensure that the wave function is continuous and count nodes to identify each state.

:p How do you search for excited states?
??x
To find excited states:

```java
// Pseudocode for Searching for Excited States
void searchForExcitedStates(double[] xPoints) {
    double initialEnergyGuess = -1; // Start with an arbitrary negative energy value

    while (true) {
        solveOde(initialEnergyGuess);
        
        if (!checkWaveFunctionContinuity()) {
            System.out.println("Wave function not continuous at this energy.");
            break;
        }

        int nodes = countNodes(xPoints, waveFunctionValues);

        if (nodes == 0) { // Ground state
            break; // No more excited states to find
        } else if (nodes > 0) {
            addExcitedStateEnergyBar(xPoints, initialEnergyGuess);
            System.out.println("Excited state with " + nodes + " nodes at energy: " + initialEnergyGuess);
        }

        initialEnergyGuess += 0.1; // Increase the energy guess
    }
}

void addExcitedStateEnergyBar(double[] xPoints, double groundStateEnergy) {
    double minPotential = Arrays.stream(potentialValues).min().getAsDouble();
    double energyLineY = groundStateEnergy - minPotential;

    drawHorizontalLine(xPoints, 0, xPoints.length - 1, energyLineY);
}
```
x??

---


#### Comparing Numerov and RK4 Methods

Background context: To compare the results obtained using both the Numerov and RK4 methods, we need to solve the ODEs with these different numerical schemes.

:p How do you compare the results of Numerov and RK4 methods?
??x
To compare the results:

1. Implement both Numerov and RK4 methods.
2. Solve the same set of differential equations using both methods.
3. Compare the wave functions, energy levels, and computational time taken by each method.

```java
// Pseudocode for Comparing Methods
void compareNumerovRk4(double[] xPoints) {
    // Numerov Method
    double[] numerovWaveFunction = solveOdeUsingNumerov(xPoints);
    
    // RK4 Method
    double[] rk4WaveFunction = solveOdeUsingRK4(xPoints);

    // Plot both wave functions on the same graph to visually compare them
    plot(xPoints, numerovWaveFunction, "Numerov Wave Function", Color.BLUE);
    plot(xPoints, rk4WaveFunction, "RK4 Wave Function", Color.RED);

    // Compare computational time (pseudo-code)
    long startNum = System.currentTimeMillis();
    solveOdeUsingNumerov(xPoints);
    long endNum = System.currentTimeMillis();
    
    long startRk4 = System.currentTimeMillis();
    solveOdeUsingRK4(xPoints);
    long endRk4 = System.currentTimeMillis();

    double numerovTime = (endNum - startNum) / 1000.0;
    double rk4Time = (endRk4 - startRk4) / 1000.0;

    System.out.println("Numerov Time: " + numerovTime + " seconds");
    System.out.println("RK4 Time: " + rk4Time + " seconds");
}
```
x??

---


#### Determining Wave Function Continuity

Background context: Ensuring that the wave function is continuous helps in identifying valid solutions for excited states.

:p How do you check if the wave function is continuous?
??x
To check if the wave function is continuous:

```java
// Pseudocode for Checking Wave Function Continuity
boolean checkWaveFunctionContinuity(double[] xPoints, double[] waveFunctionValues) {
    int size = waveFunctionValues.length;

    // Check continuity by ensuring no sudden jumps in value
    for (int i = 0; i < size - 1; i++) {
        if (Math.abs(waveFunctionValues[i] - waveFunctionValues[i + 1]) > 1e-6) {
            return false;
        }
    }

    return true;
}
```
x??

---


#### Atan2 Function for Angle Calculation

Background context: The `atan2` function is used to calculate the angle of a vector in the correct quadrant.

:p How do you use atan2 to find the angle?
??x
To use `atan2` to find the angle:

```java
// Pseudocode for Using Atan2 Function
double calculateAngle(double y, double x) {
    return Math.atan2(y, x);
}

void plotTheta(double[] xPoints, double[] yPoints) {
    // Calculate angles at each point
    double[] thetaValues = new double[yPoints.length];
    for (int i = 0; i < yPoints.length; i++) {
        thetaValues[i] = calculateAngle(yPoints[i], xPoints[i]);
    }

    // Plot the angles on a graph
    plot(xPoints, thetaValues, "Theta Values", Color.GREEN);
}
```
x??

---


#### Solving ODE for Numerov Method

Background context: The Numerov method is used to solve second-order linear differential equations with high accuracy.

:p How do you implement the Numerov method to solve an ODE?
??x
To implement the Numerov method, follow these steps:

1. Define the initial conditions and step size.
2. Use the recurrence relation specific to the Numerov method for solving the ODE.

```java
// Pseudocode for Solving Ode Using Numerov Method
double[] solveOdeUsingNumerov(double[] xPoints) {
    int numPoints = xPoints.length;
    double h = (xPoints[numPoints - 1] - xPoints[0]) / (numPoints - 1);
    
    // Initial conditions and initial wave function value
    double[] waveFunctionValues = new double[numPoints];
    waveFunctionValues[0] = 1.0; // Example initial condition
    
    for (int i = 1; i < numPoints - 1; i++) {
        double y_i_minus_1 = waveFunctionValues[i - 1];
        double y_i_plus_1 = waveFunctionValues[i + 1];
        
        double k1 = ...; // Calculate k1 from the ODE
        double k2 = ...; // Calculate k2 from the ODE
        
        waveFunctionValues[i] += h * (3 / 10.0 * k1 - 7 / 5.0 * y_i_minus_1 + 19 / 10.0 * y_i_plus_1);
    }
    
    return waveFunctionValues;
}
```
x??

---


#### Solving ODE for RK4 Method

Background context: The Runge-Kutta (RK4) method is a widely used numerical method to solve ordinary differential equations.

:p How do you implement the RK4 method to solve an ODE?
??x
To implement the RK4 method, follow these steps:

1. Define the initial conditions and step size.
2. Use the fourth-order Runge-Kutta formula for solving the ODE.

```java
// Pseudocode for Solving Ode Using RK4 Method
double[] solveOdeUsingRK4(double[] xPoints) {
    int numPoints = xPoints.length;
    double h = (xPoints[numPoints - 1] - xPoints[0]) / (numPoints - 1);
    
    // Initial conditions and initial wave function value
    double[] waveFunctionValues = new double[numPoints];
    waveFunctionValues[0] = 1.0; // Example initial condition
    
    for (int i = 1; i < numPoints - 1; i++) {
        double k1 = ...; // Calculate k1 from the ODE
        double k2 = ...; // Calculate k2 from the ODE
        double k3 = ...; // Calculate k3 from the ODE
        double k4 = ...; // Calculate k4 from the ODE
        
        waveFunctionValues[i] += h * (k1 + 2.0 * k2 + 2.0 * k3 + k4) / 6.0;
    }
    
    return waveFunctionValues;
}
```
x??

---


#### RK4 Method for Simultaneous ODEs
Background context explaining the concept. The Runge-Kutta method of order 4 (RK4) is a numerical technique to solve ordinary differential equations (ODEs). For projectile motion with drag, we need to simultaneously solve two coupled first-order ODEs: one for the horizontal position \(x(t)\), and another for the vertical position \(y(t)\).
:p What is the primary method used to solve simultaneous ODEs in this context?
??x
The Runge-Kutta method of order 4 (RK4) is applied. The ODEs are:
\[
\frac{dx}{dt} = v_x, \quad \frac{dy}{dt} = v_y
\]
Where \(v_x\) and \(v_y\) are the velocity components in the x and y directions respectively.
```java
public void rk4(double[] dydt, double t, double h, double[] y) {
    double k1[], k2[], k3[], k4[];
    // Calculate k1 to k4 values using the derivative function f(t,y)
    for (int i = 0; i < dydt.length; i++) {
        k1[i] = h * dydt[i];
        // Similarly, calculate k2, k3, and k4
        y[i] += (k1[i] + 2.0 * (k2[i] + k3[i]) + k4[i]) / 6.0;
    }
}
```
x??

---


#### Phase Space Trajectories
Background context explaining the concept. Phase space trajectories are plotted to analyze the dynamics of projectile motion with drag by examining both position and velocity components over time.
:p What is a phase space plot for projectile motion?
??x
A phase space plot shows \([ x(t), ̇x(t) ]\) and \([ y(t), ̇y(t) ]\). These differ from bound state trajectories as they capture the full dynamics, including velocity components over time.
```java
for (double b = -1; b <= 1; b += 0.05) {
    double[] x, y;
    
    // Use RK4 method to solve ODEs for each initial condition b
    // Plot phase space trajectories using the velocity components dx/dt and dy/dt
}
```
x??

---


#### Identifying Discontinuities in d𝜃/db
Background context explaining the concept. Discontinuities in \( \frac{d\theta}{db} \) and thus \( \sigma(\theta) \) can be identified by analyzing characteristic features of trajectories.
:p What characteristics lead to discontinuities in the scattering angle?
??x
Discontinuities in \( \frac{d\theta}{db} \) are caused by specific trajectory characteristics, such as sharp turns or sudden changes due to multiple scatterings. These discontinuities affect the differential cross-section \( \sigma(\theta) \).
```java
for (double b = -1; b <= 1; b += 0.05) {
    double[] x = new double[numPoints];
    double[] y = new double[numPoints];
    
    // Use RK4 method to solve ODEs for each initial condition b
    // Analyze trajectory characteristics to identify discontinuities in dθ/db
}
```
x??

---


#### Modifying RK4 Program for Friction
Background context explaining the concept. The Runge-Kutta method is modified to solve ODEs with friction, using \( n \) values of 1, 3/2, and 2 to model different velocities.
:p How do you modify the RK4 program for projectile motion with drag?
??x
The RK4 program is adapted to solve the coupled ODEs:
\[
\frac{dx}{dt} = v_x, \quad \frac{dy}{dt} = v_y
\]
Where \( n \) represents different models of air resistance. For low velocities (\( n=1 \)), medium (\( n=3/2 \)), and high (\( n=2 \)) velocities, appropriate values of \( k \) are adjusted to ensure the initial friction force is consistent.
```java
public void rk4Friction(double[] dydt, double t, double h, double[] y) {
    // Adjust equations for friction based on n value
}
```
x??

---

