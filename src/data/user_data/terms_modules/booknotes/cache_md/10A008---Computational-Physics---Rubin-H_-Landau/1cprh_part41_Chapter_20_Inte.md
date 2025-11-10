# High-Quality Flashcards: 10A008---Computational-Physics---Rubin-H_-Landau_processed (Part 41)


**Starting Chapter:** Chapter 20 Integral Equations. 20.1 Nonlocal Potential Binding. 20.2.1 Integral to Matrix Equations

---


#### Nonlocal Potential Binding
Background context: In quantum mechanics, particles can interact through a many-body medium. To simplify this problem, an effective one-particle potential is often used. This potential depends on both the position of the particle and the wave function at other positions due to interactions with other particles, making it nonlocal.
Relevant formulas:
\[ V(r) \psi(r) \rightarrow \int dr' V(r,r') \psi(r') \]
The Schrödinger equation then becomes:
\[ -\frac{\hbar^2}{2m} \frac{d^2\psi(r)}{dr^2} + \int dr' V(r,r') \psi(r') = E \psi(r) \]

:p What is the concept of nonlocal potential binding?
??x
This concept deals with simplifying a complex many-body interaction problem by using an effective one-particle potential. The effective potential depends on both the position and wave function at other positions due to interactions, hence it's called nonlocal.
x??

---


#### Momentum-Space Schrödinger Equation
Background context: To solve integro-differential equations more directly, the momentum-space version of the Schrödinger equation is used. This equation allows for a more straightforward numerical approach.

Relevant formulas:
\[ k^2 \frac{\psi_n(k)}{2m} + 2\pi \int_0^\infty dp p^2 V(k,p) \psi_n(p) = E_n \psi_n(k) \]
Where \( V(k,p) \) is the momentum-space representation of the coordinate-space potential.

:p What is the momentum-space Schrödinger equation?
??x
The momentum-space Schrödinger equation for bound states, which simplifies solving integro-differential equations. It transforms the problem into a more manageable form by using Fourier transforms and integrals over momenta.
x??

---


#### Integral to Matrix Equations
Background context: The integral equation can be transformed into a matrix equation using numerical techniques like Gaussian quadrature. This allows for solving the problem with standard matrix methods.

Relevant formulas:
\[ \int_0^\infty dp p^2 V(k,p) \psi_n(p) \approx \sum_{j=1}^{N} w_j k_j^2 V(k,k_j) \psi_n(k_j) \]
This approximation converts the integral equation into a set of coupled linear equations.

:p How is the integral transformed into a matrix equation?
??x
The integral in the Schrödinger equation is approximated using Gaussian quadrature, turning it into a sum over discrete points. This results in a system of coupled linear equations that can be solved as a matrix problem.
x??

---


#### Solving Coupled Linear Equations
Background context: The resulting set of coupled linear equations from the integral transformation is written in matrix form to solve for the wave function values and energy eigenvalues.

Relevant formulas:
\[ [H][\psi_n] = E_n [\psi_n] \]
Where \( H \) is a matrix containing coefficients from the transformed equation, and \( \psi_n \) are the unknown wave functions at grid points.

:p What form do the coupled equations take?
??x
The coupled linear equations are written in matrix form as:
\[ [H][\psi_n] = E_n [\psi_n] \]
Where \( H \) is a matrix with coefficients from the transformed integral equation, and \( \psi_n \) represents the wave function values at specific grid points.
x??

---


#### Eigenvalue Problem
Background context: The matrix form of the equations can be viewed as an eigenvalue problem. For a nontrivial solution to exist, the determinant of \( [H - E_n I] \) must vanish.

Relevant formulas:
\[ \det[H - E_n I] = 0 \]
This is the condition that needs to be satisfied for a unique bound-state solution, where \( E_n \) are the eigenvalues.

:p What is the matrix equation's relationship to an eigenvalue problem?
??x
The matrix equation represents an eigenvalue problem. For nontrivial solutions to exist, the determinant of the matrix \( [H - E_n I] \) must be zero, indicating that \( E_n \) are the eigenvalues.
x??

---


#### Determinant and Eigenvalues
Background context: Solving for the energy eigenvalues involves finding the roots of the determinant equation. Only certain values of \( E_n \) will satisfy this condition.

:p What role does the determinant play in solving for bound-state energies?
??x
The determinant plays a crucial role by determining which values of \( E_n \) are valid solutions to the matrix equation, i.e., eigenvalues corresponding to bound states.
x??

---


#### Grid Points and Solving
Background context: The wave function is solved at specific grid points. For \( N \) grid points, there are \( N+1 \) unknowns (wave functions and energy), which must be solved together.

:p How many equations are needed for the system to have a solution?
??x
To solve the system, we need an additional equation beyond the number of wave function values. This is because the determinant condition provides one such equation, giving \( N+1 \) unknowns (wave functions at grid points and energy).
x??

---

---


#### Bound State Equation
The provided text mentions a transcendental equation that determines the bound state energy for the delta-shell potential: \( e^{-2\varphi b} - 1 = 2 \frac{\lambda}{\sqrt{2mE}} \), where \(\varphi\) is related to the wave vector by \(\varphi^2 = -\frac{2E}{m}\).

:p What is the equation that determines the energy for a bound state in the delta-shell potential?
??x
The transcendental equation for finding the bound state energy \(E_n\) in the delta-shell potential is given by:

\[ e^{-2\varphi b} - 1 = 2 \frac{\lambda}{\sqrt{2mE}}. \]

Here, \(\varphi\) is related to the wave vector \(\varphi\) through \(\varphi^2 = -\frac{2E}{m}\). To find the bound state energy, one must solve this equation numerically for \(E\), with the constraint that \(\lambda < 0\) for attractive potentials.
x??

---


#### Numerical Computation and Eigenvalue Solver
The text suggests setting up a numerical computation to find eigenvalues. This involves evaluating the determinant of the Hamiltonian matrix or directly solving the eigenvalue problem.

:p How can one numerically compute the eigenvalues and eigenvectors for the delta-shell potential?
??x
To numerically compute the eigenvalues and eigenvectors for the delta-shell potential, follow these steps:

1. **Set the Scale**: Set \(2m = 1\) and \(b = 10\).
2. **Setup Potential and Hamiltonian Matrices**: Use Gaussian quadrature with at least \(N=16\) grid points to approximate the integral.
3. **Adjust \(\lambda\) for Bound States**: Start with a large negative value for \(\lambda\) and make it progressively less negative. As you adjust \(\lambda\), observe how the eigenvalues move in energy.
4. **Solve Eigenvalue Problem**: Use an eigenvalue solver to find both the energies (eigenvalues) and wave functions (eigenvectors). The true bound state will appear at a negative energy and should change little as the number of grid points changes.

Here is a simplified pseudocode example for setting up the Hamiltonian matrix using Gaussian quadrature:

```python
import numpy as np

def V(k_prime, k):
    b = 10  # Given distance
    lambda_val = -2  # Example value for \lambda (make it progressively less negative)
    
    return (lambda_val / (k * k_prime)) * np.sin(k_prime * b) * np.sin(k * b)

N = 16  # Number of grid points
x, w = np.polynomial.legendre.leggauss(N)  # Gaussian quadrature points and weights

# Initialize Hamiltonian matrix
H = np.zeros((N, N))

for i in range(N):
    for j in range(N):
        k_prime = x[i]
        k = x[j]
        H[i, j] = V(k_prime, k)

```

This code sets up the potential \(V(k', k)\) using Gaussian quadrature and initializes a Hamiltonian matrix. The actual eigenvalue problem would then be solved using a numerical solver.
x??

---


#### Grid Point Adjustment
The text suggests adjusting the number of grid points to observe how the energy changes.

:p How does changing the number of grid points affect the computed energy for the delta-shell potential?
??x
Changing the number of grid points in the Gaussian quadrature can significantly impact the accuracy and stability of the numerical solution. Initially, starting with a smaller number of grid points (e.g., \(N=16\)) provides an initial estimate. Increasing the number of grid points (e.g., to 24, 32, 64) helps improve the precision of the energy eigenvalues.

Here is a pseudocode example for increasing the number of grid points and observing the effect on the energy:

```python
def solve_for_energy(N):
    b = 10  # Given distance
    lambda_val = -2  # Example value for \lambda (make it progressively less negative)
    
    x, w = np.polynomial.legendre.leggauss(N)  # Gaussian quadrature points and weights

    H = np.zeros((N, N))

    for i in range(N):
        for j in range(N):
            k_prime = x[i]
            k = x[j]
            H[i, j] = V(k_prime, k)

    eigenvalues = np.linalg.eigvals(H)
    
    return eigenvalues

# Example: Solving for energy with increasing grid points
energies_16 = solve_for_energy(16)
energies_24 = solve_for_energy(24)
energies_32 = solve_for_energy(32)
energies_64 = solve_for_energy(64)

print("Energy at N=16:", energies_16)
print("Energy at N=24:", energies_24)
print("Energy at N=32:", energies_32)
print("Energy at N=64:", energies_64)
```

By increasing the number of grid points, you can observe how the energy values stabilize and become more accurate. The true bound state energy should change little as \(N\) increases.
x??

---

---


#### Extracting Bound-State Energy
Background context: The task involves finding the best value for the bound-state energy and estimating its precision. This is done by observing how the energy changes with different numbers of grid points.

:p How do you determine the best value for the bound-state energy?
??x
To find the best value for the bound-state energy, you need to iteratively solve the eigenvalue problem using a sufficiently fine grid of points in momentum space. By comparing the energies obtained at different grid resolutions, you can identify the point where further refinement no longer significantly changes the energy. This indicates that you have reached a converged solution for the ground state energy.

To estimate the precision of this energy value, observe how it converges as you increase the number of grid points. If the energy values stabilize or change very little with additional grid points, then you can conclude that your value is precise and reliable.
??x

---


#### Verifying Eigenvalue Problem Solution
Background context: The eigenvalue problem [H][ψn] = E_n[ψn] needs to be solved, and its solution should be verified by comparing the left-hand side (LHS) with the right-hand side (RHS) of the equation.

:p How do you verify your solution for the eigenvalue problem?
??x
To verify the solution for the eigenvalue problem [H][ψn] = E_n[ψn], compute both sides of the equation separately and compare them. The Hamiltonian operator H should be applied to the wave function ψn, resulting in a vector on the LHS. On the RHS, multiply the scalar energy En by the same wave function ψn.

For each eigenstate n, perform this comparison:
```c
// Pseudocode for verification
for (each n) {
    // Compute LHS: H * ψn
    lhs = applyHamiltonianOperatorToWaveFunction(ψn);
    
    // Compute RHS: E_n * ψn
    rhs = energyEigenvalue[n] * ψn;
    
    // Verify if both sides are equal within a certain tolerance
    if (areEqual(lhs, rhs)) {
        printf("Solution verified for eigenstate %d\n", n);
    } else {
        printf("Verification failed for eigenstate %d\n", n);
    }
}
```
Here, `applyHamiltonianOperatorToWaveFunction` is a function that applies the Hamiltonian operator to the wave function ψn, and `areEqual` checks if two vectors are equal within some small tolerance. This process ensures that your solution satisfies the eigenvalue problem.
??x

---


#### Single Bound-State and Depth Increase
Background context: The task involves verifying the existence of a single bound state and its behavior as the potential's strength increases. Comparing with the theoretical prediction (20.17) is also necessary.

:p Verify the number and depth of the bound states as potential’s strength increases.
??x
To verify that there is only one bound state, solve the eigenvalue problem for different values of the potential's strength λ. Plot the lowest energy eigenvalue E_0(λ) against λ. Typically, you will observe a single point where the energy becomes negative (indicating a bound state). Check if this behavior matches the theoretical prediction given by Eq.(20.17).

To ensure the depth increases as |λ| increases:
- Solve for various values of λ.
- Plot E_0(λ) against λ.
- Verify that as |λ| increases, the magnitude of E_0 decreases (meaning deeper bound states).

This approach confirms the uniqueness and behavior of the single bound state with respect to changes in potential strength.
??x

---


#### Determining Momentum-Space Wave Function
Background context: The momentum-space wave function ψn(k) is determined using an eigenproblem solver. Analysis includes checking its behavior at k→∞, oscillations, and origin.

:p Determine the momentum-space wave function ψn(k).
??x
To determine the momentum-space wave function ψn(k), use your eigenvalue problem solver to find the eigenvectors (ψn) corresponding to the lowest energy eigenvalues. Analyze these solutions for specific properties:

- Check how ψn(k) behaves as k→∞.
  ```c
  // Pseudocode for behavior analysis at large k
  if (ψn(k) -> 0 as k increases) {
      printf("Wave function falls off as k increases.\n");
  } else {
      printf("Wave function does not fall off as expected.\n");
  }
  ```

- Check if ψn(k) oscillates.
  ```c
  // Pseudocode for checking oscillatory behavior
  bool isOscillatory = checkForOscillations(ψn);
  if (isOscillatory) {
      printf("Wave function shows oscillatory behavior.\n");
  } else {
      printf("Wave function does not show oscillatory behavior.\n");
  }
  ```

- Check the wave function's behavior at the origin.
  ```c
  // Pseudocode for checking behavior at k=0
  if (ψn(k) is well-behaved at k=0) {
      printf("Wave function is well-behaved at the origin.\n");
  } else {
      printf("Wave function is not well-behaved at the origin.\n");
  }
  ```

These checks ensure that your wave functions are physically meaningful.
??x

---


#### Coordinate-Space Wave Function via Bessel Transforms
Background context: The coordinate-space wave function ψn(r) is determined using Bessel transforms from the momentum-space solution. It involves verifying the r-dependence of this wave function and comparing it with theoretical expectations.

:p Determine the coordinate-space wave function ψn(r).
??x
To determine the coordinate-space wave function ψn(r), use the Bessel transform:
\[ \psi_n(r) = \int_0^\infty dk \, \psi_n(k) \frac{\sin(kr)}{kr} \sqrt{k}. \]

This integral can be evaluated using the same points and weights used for evaluating the integral in the original problem. For instance:

```c
// Pseudocode for Bessel transform
double kValues[], wValues[];
for (each r) {
    double psi_r = 0;
    for (each k, w) {
        psi_r += w * ψn(k) * sin(k*r) / (k*r) * sqrt(k);
    }
}
```

After obtaining ψn(r), analyze its behavior:
- Check how ψn(r) falls off as r increases.
  ```c
  // Pseudocode for checking fall-off
  if (ψn(r) -> 0 as r increases) {
      printf("Wave function falls off with increasing r.\n");
  } else {
      printf("Wave function does not fall off as expected.\n");
  }
  ```

- Check if ψn(r) oscillates.
  ```c
  // Pseudocode for checking oscillatory behavior
  bool isOscillatory = checkForOscillations(ψn);
  if (isOscillatory) {
      printf("Wave function shows oscillatory behavior.\n");
  } else {
      printf("Wave function does not show oscillatory behavior.\n");
  }
  ```

- Check the wave function's behavior at r=0.
  ```c
  // Pseudocode for checking behavior at r=0
  if (ψn(r) is well-behaved at r=0) {
      printf("Wave function is well-behaved at the origin.\n");
  } else {
      printf("Wave function is not well-behaved at the origin.\n");
  }
  ```

These checks ensure that your coordinate-space wave functions are physically meaningful and consistent with theoretical expectations.
??x

---


#### Analytical Comparison of Wave Function
Background context: The determined ψn(r) should be compared to the analytical form given by Eq.(20.19).

:p Compare the r-dependence of the calculated ψn(r) with the analytical wave function.
??x
To compare the r-dependence of your numerically obtained ψn(r) with the analytical wave function, plot both against r and visually inspect the similarity.

The analytical form is:
\[ \psi_n(r) \propto \begin{cases} e^{-\alpha r} - e^{\alpha r}, & \text{for } r < b, \\ e^{-\alpha r}, & \text{for } r > b. \end{cases} \]

You can implement the analytical function as:
```c
// Pseudocode for analytical wave function
double alpha = someValue; // Define α and b appropriately
if (r < b) {
    psi_analytical = exp(-alpha * r) - exp(alpha * r);
} else if (r > b) {
    psi_analytical = exp(-alpha * r);
}
```

Plot both ψn(r) and ψ_analytical for the same range of r values and observe how well they match. If they are consistent, it confirms that your numerical solution is accurate.
??x

---


#### Scattering Phase Shift Calculation
Background context: The scattering phase shift δ needs to be determined using the Lippmann–Schwinger equation.

:p Calculate the scattering phase shift δ for this scattering problem.
??x
To calculate the scattering phase shift δ, solve the Lippmann–Schwinger equation:
\[ R(k', k) = V(k', k) + \frac{2\pi}{i} \mathcal{P} \int_0^\infty dp \frac{p^2 V(k', p) R(p, k)}{(k_0^2 - p^2)/2m}. \]

Here, \(R\) is the reaction matrix related to the scattering amplitude and can be found by solving this equation. The initial and final COM momenta \(k\) and \(k'\) are momentum-space variables.

The scattering phase shift δ is obtained from:
\[ R(k_0, k_0) = -\tan \delta_0, \quad \rho = 2mk_0. \]

To find δ, you need to solve the integral equation numerically for various \(k'\) and then use the diagonal elements (when \(k' = k_0\)) to extract the phase shift.

This process involves evaluating singular integrals carefully using principal value prescriptions as indicated in the text.
??x

---


#### Conversion of Integral Equations to Linear Equations
Background context explaining the concept. The integral equation can be converted into a set of linear equations by approximating integrals with sums over Gaussian quadrature points.

The integral equation:
\[ R(k',k) = V(k',k) + 2\pi \int_0^\infty dp \frac{p^2 V(k',p)}{p^2 - k_0^2} R(p,k), \]

is converted to a linear system using Gaussian quadrature.

:p How is the integral equation \( R(k',k) = V(k',k) + 2\pi \int_0^\infty dp \frac{p^2 V(k',p)}{p^2 - k_0^2} R(p,k) \) converted to a set of linear equations?
??x
The integral equation is converted by approximating the integral with sums over Gaussian quadrature points. This process results in a set of linear equations that can be solved for the unknown values.

```java
// Pseudocode illustrating the conversion from integral to linear system
public class IntegralToLinear {
    public double[] solveLinearSystem(double k0, Function<Double, Double> f) {
        // Initialize R and V vectors with appropriate lengths
        double[] R = new double[N+1];
        double[] V = new double[N+1];

        for (int i = 0; i <= N; i++) {
            R[i] = f.apply(ki[i]);
            for (int j = 0; j <= N; j++) {
                // Compute Vij and Rj terms
                V[i] += 2 * Math.PI * k[j] * f.apply(ki[j]) * R[j] * D[i][j];
            }
        }

        return R;
    }

    private double[] ki(double k0, int N) {
        // Function to generate quadrature points and weights
    }
}
```
x??

---


#### Matrix Form of Linear Equations
Background context explaining the concept. The linear system is expressed in matrix form for easier manipulation.

The linear equation:
\[ R - D V R = [1 - D V] R = V, \]

is represented in matrix form where \( D \) combines denominators and weights.

:p How does the integral equation result in a matrix form?
??x
The integral equation results in a matrix form by combining all terms into vectors and matrices. The matrix form is:
\[ (R - D V R) = [1 - D V] R = V, \]
where \( R \) and \( V \) are vectors of length \( N+1 \), and \( D \) is a vector that combines denominators and weights.

```java
// Pseudocode illustrating the matrix form in linear system
public class MatrixForm {
    public void solveMatrixForm(double k0, Function<Double, Double> f) {
        double[] R = new double[N+1];
        double[] V = new double[N+1];
        double[] D = new double[N+1];

        for (int i = 0; i <= N; i++) {
            // Compute Di terms
            D[i] = i == 0 ? -2 * Math.PI * sum(ki, f) : 2 * Math.PI * ki[i] * f.apply(ki[i]) / (ki[i] * ki[i] - k0 * k0);
        }

        for (int i = 0; i <= N; i++) {
            R[i] = f.apply(ki[i]);
            for (int j = 0; j <= N; j++) {
                // Compute Vij and Rj terms
                V[i] += 2 * Math.PI * ki[j] * f.apply(ki[j]) * R[j] * D[i][j];
            }
        }

        // Solve the matrix equation to find R
    }

    private double sum(double[] ki, Function<Double, Double> f) {
        // Sum of terms for D vector initialization
    }
}
```
x??

---


#### Wave Matrix and Reduction to Standard Form
Background context: The integral equation is reduced to a matrix form \([F][R] = [V]\) where \(F_{ij} = \delta_{ij} - D_j V_{ij}\). This transformation allows us to use standard linear algebra routines for solving the problem.
:p What is the wave matrix and how does it transform the integral equation into a matrix equation?
??x
The wave matrix, denoted as \(F\), is derived from the integral equation by transforming it into a discrete form. Each element of the matrix \(F_{ij}\) represents the interaction between basis functions in the discretized space. Specifically, \(F_{ij} = \delta_{ij} - D_j V_{ij}\), where \(\delta_{ij}\) is the Kronecker delta indicating no interaction when \(i = j\), and \(D_j\) accounts for some constant or coefficient that modifies the interaction.
```python
# Pseudocode to illustrate matrix construction
def construct_F_matrix(D, Vij):
    F = np.zeros_like(Vij)
    for i in range(len(F)):
        for j in range(len(F[i])):
            F[i][j] = delta_ij(i, j) - D[j] * Vij[i][j]
    return F

# Function to calculate Kronecker Delta
def delta_ij(i, j):
    if i == j:
        return 1
    else:
        return 0
```
x??

---


#### Gaussian Elimination Method
Background context: While a direct matrix inversion is possible, using Gaussian elimination or other linear algebra methods can be more efficient. This method is also supported by standard libraries.
:p What is the more efficient approach to solve for \(R\) compared to matrix inversion?
??x
A more efficient approach involves solving the system of equations through Gaussian elimination instead of directly inverting the matrix. Libraries such as NumPy provide functions that perform these operations, making it a preferred method over direct inversion when efficiency matters.
```python
# Pseudocode to illustrate Gaussian elimination for solving R
def solve_R_by_elimination(A, b):
    # Using numpy's linear algebra solver which internally uses LU decomposition (a form of Gaussian elimination)
    R = np.linalg.solve(A, b)
    return R
```
x??

---


#### Exercises for Scattering Problems
Background context: The exercises involve programming a solution to the scattering problem using matrix methods and comparing numerical results with an analytic solution.
:p What is the first exercise in solving the scattering problem numerically?
??x
The first exercise involves writing programs to create matrices \(V\), \(D\), and \(F\) based on the given potential function. You should use at least 16 Gaussian quadrature points for your grid to ensure accuracy.
```python
# Pseudocode for creating F matrix with N=16 points
def construct_F_matrix(N):
    # Initialize matrices
    V = np.zeros((N, N))
    D = np.ones((N,)) * D_value  # Assuming D is a constant or derived from the potential
    F = np.identity(N) - np.outer(D, V)
    return F
```
x??

---

---

