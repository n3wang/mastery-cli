# High-Quality Flashcards: 10A008---Computational-Physics---Rubin-H_-Landau_processed (Part 44)


**Starting Chapter:** 22.4 The CrankNicolson Algorithm

---


#### Heat Equation and Stability Condition
Background context: We are dealing with solving the heat equation for a bar of aluminum, where the goal is to find the temperature distribution over time. The stability condition ensures that our numerical solution remains accurate.

The difference equation used is:
$$\xi_{j+1} e^{ikm\Delta x} = \xi_j e^{ikm\Delta x} + \eta [\xi_j e^{ik(m+1)\Delta x} + \xi_j e^{ik(m-1)\Delta x} - 2\xi_j e^{ikm\Delta x}]$$

After canceling common factors, we derive:
$$\xi(k) = 1 + 2\eta [cos(k\Delta x) - 1]$$

For stability, the condition is:
$$\eta = \frac{K\Delta t}{C\rho \Delta x^2} < \frac{1}{2}$$

:p What does the stability condition tell us about the time and space steps in solving the heat equation?
??x
The stability condition tells us that reducing the time step ($\Delta t $) will always improve stability, as expected. However, making the spatial step ($\Delta x $) smaller without a corresponding quadratic increase in $\Delta t$ will worsen the stability.

Code example:
```java
// Pseudocode to check if the solution is stable
if (eta > 0.5) {
    System.out.println("The solution may diverge due to instability.");
} else {
    System.out.println("The solution appears stable with given parameters.");
}
```
x??

---


#### Implementation of Heat Equation Solver
Background context: We need to implement a numerical solver for the heat equation in an aluminum bar, ensuring that boundary and initial conditions are met. The implementation involves setting up a 2D array to store temperature data over time.

We initialize temperatures as follows:
- All points except the ends at $100^\circ C $- Ends set to $0^\circ C $ at$t = 0$:p How do you set initial and boundary conditions for an aluminum bar of length 1 meter?
??x
To set the initial and boundary conditions, we initialize a 2D array `T[101,2]` where:
- The first index represents spatial division (100 points in space).
- The second index represents time steps.

Initialization code:
```java
// Initialize temperature distribution
for (int i = 1; i < 100; i++) {
    T[i][0] = 100.0; // Initial temperature for interior points
}
T[0][0] = 0.0; // Temperature at x=0, t=0
T[100][0] = 0.0; // Temperature at x=L (L=1m), t=0

// Apply Eq. (22.15) to obtain temperatures for next time step
```
x??

---


#### Stability Test with Newton’s Cooling Law
Background context: The stability condition can be tested by verifying that the temperature distribution does not diverge if $\eta > \frac{1}{4}$. This ensures that the numerical solution remains stable under different conditions.

:p How do you verify the stability condition for a heat equation solver?
??x
To verify the stability condition, observe how the temperature distribution behaves when $\eta > \frac{1}{4}$:
```java
// Pseudocode to test stability
if (eta > 0.25) {
    System.out.println("The solution may diverge due to instability.");
} else {
    System.out.println("The solution appears stable with given parameters.");
}
```
x??

---


#### Crank-Nicolson Method for Heat Equation
Background context: The Crank-Nicolson method is an implicit scheme that uses both current and future time step values. This ensures better stability compared to explicit methods.

The heat difference equation in the Crank-Nicolson form:
$$T_{i,j+1} - T_{i,j} = \frac{\eta}{2} [T_{i-1,j+1} - 2T_{i,j+1} + T_{i+1,j+1} + T_{i-1,j} - 2T_{i,j} + T_{i+1,j}]$$

Rearranging to form a linear system:
$$(2\eta + 2)T_{i,j+1} - T_{i-1,j+1} - T_{i+1,j+1} = T_{i-1,j} + (2\eta - 2)T_{i,j} + T_{i+1,j}$$:p How do you set up the matrix equation for solving temperatures in the Crank-Nicolson method?
??x
To set up the matrix equation, we rearrange terms to form a system of linear equations:
```java
// Pseudocode for setting up matrix equation
for (int i = 1; i < n-1; i++) {
    int[] coefficients = {2*eta + 2, -1, -1};
    double[] constants = {T[i][j] + (2*eta - 2)*T[i+1][j] + T[i+2][j], 
                          T[i-1][j] + (2*eta - 2)*T[i][j] + T[i+1][j]};
    
    // Solve the system using matrix operations
}
```
x??

---


#### Initial Conditions and Boundary Values for Crank-Nicolson Method
Background context: For the initial conditions and boundary values, we use known values from previous time steps. The Crank-Nicolson method requires solving a set of simultaneous equations to find future temperature values.

:p How do you handle initial and boundary conditions in the Crank-Nicolson method?
??x
Handling initial and boundary conditions involves using known values from previous time steps:
```java
// Pseudocode for handling initial and boundary conditions
T[0][0] = 0.0; // Boundary condition at x=0
T[n-1][0] = 0.0; // Boundary condition at x=L

for (int j = 0; j < n; j++) {
    T[j][0] = initial_temperature(j * delta_x); // Initial temperature distribution
}
```
x??

--- 

#### Matrix Equation Setup for Crank-Nicolson Method
Background context: We need to set up a matrix equation that represents the system of linear equations derived from the Crank-Nicolson method. This allows us to solve for future temperatures simultaneously.

:p How do you represent and solve the matrix equation in the Crank-Nicolson method?
??x
To represent and solve the matrix equation, we set up the following:
```java
// Pseudocode for setting up and solving matrix equation
double[][] A = new double[n-1][n-1];
double[] b = new double[n-1];

for (int i = 0; i < n-2; i++) {
    A[i][i] = 2*eta + 2;
    A[i][i+1] = -1;
    A[i+1][i] = -1;

    b[i] = T[i][j] + (2*eta - 2)*T[i+1][j] + T[i+2][j];
}

// Solve the matrix equation using a linear solver
double[] solution = solveLinearSystem(A, b);
```
x??

--- 

#### Time Stepping in Crank-Nicolson Method
Background context: The Crank-Nicolson method solves for all spatial points at each time step simultaneously by solving a set of simultaneous equations. This allows us to update the temperature distribution efficiently.

:p How do you perform time stepping in the Crank-Nicolson method?
??x
Performing time stepping involves solving the matrix equation at each time step:
```java
// Pseudocode for time-stepping in Crank-Nicolson
for (int j = 0; j < n-1; j++) {
    A[j][j] = 2*eta + 2;
    A[j][j+1] = -1;
    A[j+1][j] = -1;

    b[j] = T[j][j] + (2*eta - 2)*T[j+1][j] + T[j+2][j];

    // Solve the system
    double[] solution = solveLinearSystem(A, b);
    
    // Update temperatures
    for (int i = 0; i < n-1; i++) {
        T[i][j+1] = solution[i];
    }
}
```
x?? 

--- 

These flashcards cover the key concepts of solving the heat equation numerically using Crank-Nicolson and related methods. Each card provides context, relevant formulas, explanations, and examples where applicable.

---


#### Crank-Nicolson Method for Heat Equation
The Crank-Nicolson method is a finite difference technique used to solve partial differential equations, particularly the heat equation. It combines the stability of implicit methods with the efficiency of explicit methods by using an average of forward and backward Euler methods.

:p What is the Crank-Nicolson method?
??x
The Crank-Nicolson method is a time-stepping method that uses an average of the forward (explicit) and backward (implicit) Euler methods to approximate solutions to differential equations. It achieves higher accuracy than both explicit and implicit methods by incorporating information from future and past time steps.

Relevant formula:
$$

T^{n+1}_i = \frac{1}{2} \left( T^n_i + T^{n+1}_i \right) - \frac{\Delta t \cdot k}{2 \cdot (h^2)} \left( T^n_{i-1} - 2T^n_i + T^n_{i+1} \right)$$

In this formula,$T_i $ represents the temperature at position$i $,$ n $ is the time step index, and $ k = \frac{\Delta t \cdot C \cdot \rho}{h^2}$.

:p How does the Crank-Nicolson method work?
??x
The Crank-Nicolson method works by taking an average of the forward and backward Euler methods. At each time step, it uses information from both future and past states to calculate the temperature at a given point in space.

Relevant code:
```python
def Tridiag(a, d, c, b, Ta, Td, Tc, Tb, x, n):
    Max = 51
    h = zeros((Max), float)
    p = zeros((Max), float)

    for i in range(1, n + 1):
        a[i] = Ta[i]
        b[i] = Tb[i]
        c[i] = Tc[i]
        d[i] = Td[i]

        h[1] = c[1]/d[1]
        p[1] = b[1]/d[1]

        for i in range(2, n + 1):
            h[i] = c[i] / (d[i] - a[i] * h[i-1])
            p[i] = (b[i] - a[i] * p[i-1]) / (d[i] - a[i] * h[i-1])

        x[n] = p[n]

        for i in range(n - 1, 1, -1):
            x[i] = p[i] - h[i] * x[i + 1]
```

x??

---


#### Implementation of Crank-Nicolson Method
The implementation involves setting up a tridiagonal matrix system to solve the heat equation using the Crank-Nicolson method. This involves defining arrays for coefficients and temperatures at different points.

:p How do you set up the temperature array in the code?
??x
In the code, the temperature array `T` is initialized with zeros. It then sets the initial condition (IC) and boundary conditions (BCs).

Relevant code:
```python
T = zeros((N x , 2), float)
for i in range(1, N x -1):
    T[i, 0] = 100.0

T[0, 0] = 0.0; 
T[Nx-1,0] = 0.
```

x??

---


#### Tridiagonal Matrix Algorithm
The tridiagonal matrix algorithm is used to solve the linear system of equations that arise from discretizing the heat equation using the Crank-Nicolson method.

:p What does the `Tridiag` function do?
??x
The `Tridiag` function solves a tridiagonal system of equations. It takes in arrays for coefficients (`a`, `b`, `c`) and temperatures (`Ta`, `Tb`, `Td`), and returns an array of solutions `x`.

Relevant code:
```python
def Tridiag(a, d, c, b, Ta, Td, Tc, Tb, x, n):
    Max = 51
    h = zeros((Max), float)
    p = zeros((Max), float)

    for i in range(1, n + 1):
        a[i] = Ta[i]
        b[i] = Tb[i]
        c[i] = Tc[i]
        d[i] = Td[i]

        h[1] = c[1]/d[1]
        p[1] = b[1]/d[1]

        for i in range(2, n + 1):
            h[i] = c[i] / (d[i] - a[i] * h[i-1])
            p[i] = (b[i] - a[i] * p[i-1]) / (d[i] - a[i] * h[i-1])

        x[n] = p[n]

        for i in range(n - 1, 1, -1):
            x[i] = p[i] - h[i] * x[i + 1]
```

x??

---


#### Boundary Conditions
Boundary conditions are essential to ensure the accuracy of the numerical solution. Dirichlet boundary conditions were used here where temperatures at specific points are fixed.

:p What are Dirichlet boundary conditions?
??x
Dirichlet boundary conditions specify the values that a solution must take on along the boundaries of the domain. In this case, it means setting the temperature to known values at the edges (boundary) of the computational domain.

Relevant code:
```python
for i in range(1, n+1):
    Td[i] = 2. + 2./r
    Td[1] = 1.; 
    Td[n] = 1.
```

x??

---


#### Time and Space Step Stability Check
Stability of the solution is crucial when solving partial differential equations numerically. The choice of time step `Dt` and space step `Dx` can significantly affect the accuracy and stability of the solution.

:p How does one check the stability of the Crank-Nicolson method?
??x
To check the stability, one must ensure that the Courant-Friedrichs-Lewy (CFL) condition is satisfied. For the heat equation using the Crank-Nicolson method, this means ensuring that the time step `Dt` and space step `Dx` are chosen such that they do not violate the stability criterion.

Relevant formula:
$$\Delta t \leq \frac{h^2}{2k}$$

Where $k = \frac{\Delta t \cdot C \cdot \rho}{h^2}$.

:p What is the significance of the time step `Dt` and space step `Dx` in stability?
??x
The time step `Dt` and space step `Dx` are crucial for ensuring the numerical stability of the Crank-Nicolson method. If these steps are too large, the solution can become unstable, leading to erroneous results or divergence.

Relevant code:
```python
cons = kappa/(C * rho) * Dt / (Dx * Dx)
```

x??

---


#### Vibrating String's Hyperbolic Wave Equation
In this section, we explore how waves propagate on a string tied down at both ends. We start by deriving the wave equation for such a system and then solve it using initial and boundary conditions.

The basic assumptions are:
- The string has a constant density $\rho$ per unit length.
- No frictional forces act on the string.
- The tension $T$ is high enough to neglect any sagging due to gravity.
- Displacement from its equilibrium position,$y(x,t)$, is only in the vertical direction.

The wave equation for small displacements can be derived by considering an infinitesimal section of the string and applying Newton's second law. This leads us to:

$$\sum F_y = \rho \Delta x \frac{\partial^2 y}{\partial t^2}$$

Considering the difference in tension forces at either end of this differential element, we get:
$$

T \sin \theta(x + \Delta x) - T \sin \theta(x) \approx T \frac{\partial y}{\partial x} \bigg|_{x+\Delta x} - T \frac{\partial y}{\partial x} \bigg|_x$$

For small angles, we can approximate:
$$

T \left( \frac{\partial^2 y}{\partial x^2} \right)$$

Thus, the wave equation simplifies to:
$$\frac{\partial^2 y(x,t)}{\partial x^2} = \frac{1}{c^2} \frac{\partial^2 y(x,t)}{\partial t^2}, \quad c = \sqrt{\frac{T}{\rho}}$$:p What is the wave equation for a vibrating string, and what does $ c$ represent?
??x
The wave equation for a vibrating string is:
$$\frac{\partial^2 y(x,t)}{\partial x^2} = \frac{1}{c^2} \frac{\partial^2 y(x,t)}{\partial t^2}, \quad c = \sqrt{\frac{T}{\rho}}$$

Here,$c $ is the wave velocity along the string, which depends on the tension$T $ and density$\rho$. It represents how fast a disturbance travels along the string. The initial conditions for this problem are that the string is plucked gently at one point and released, forming a triangular shape:

$$y(x,t=0) = 
\begin{cases} 
1.25 \frac{x}{L}, & x \leq 0.8L \\ 
(5 - 5 \frac{x}{L}), & x > 0.8L
\end{cases}$$

And the velocity is zero at $t=0$:

$$\frac{\partial y(x,t)}{\partial t} (x, t = 0) = 0.$$

The boundary conditions are that both ends of the string are tied down:
$$y(0,t) \equiv 0, \quad y(L,t) \equiv 0.$$

The solution to this PDE can be found using normal-mode expansion.

x??

---


#### Solution via Normal-Mode Expansion
To solve the wave equation for a vibrating string with fixed ends, we use separation of variables. We assume:
$$y(x,t) = X(x)T(t).$$

Substituting into the wave equation and separating the variables leads to two ordinary differential equations (ODEs):
$$\frac{d^2 T}{dt^2} + \omega^2 T = 0, \quad \frac{d^2 X}{dx^2} + k^2 X = 0,$$with $ k = \omega c$.

The boundary conditions are:

$$X(0,t) = X(L,t) = 0.$$

This results in the eigenfunctions and eigenvalues:
$$

X_n(x) = A_n \sin(k_n x), \quad k_n = \frac{n\pi}{L}, \quad n=1,2,\ldots$$

The time part is given by:
$$

T_n(t) = C_n \cos(\omega_n t) + D_n \sin(\omega_n t),$$with$$\omega_n = c k_n = \frac{n \pi c}{L}, \quad n=1,2,\ldots$$

The initial condition of zero velocity suggests $C_n = 0$. Thus, the normal mode solution is:

$$y_n(x,t) = A_n \sin(k_n x) \cos(\omega_n t).$$

Using the initial displacement and applying orthogonality, we can determine the Fourier coefficients.

:p What are the normal modes for a vibrating string with fixed ends?
??x
The normal modes for a vibrating string with fixed ends are:
$$y_n(x,t) = A_n \sin(k_n x) \cos(\omega_n t),$$where$$k_n = \frac{n\pi}{L}, \quad \omega_n = \frac{n\pi c}{L}.$$

Here,$n=1,2,\ldots $ represents the mode number. The coefficients$ A_n$ can be determined by considering the initial displacement condition.

x??

---

