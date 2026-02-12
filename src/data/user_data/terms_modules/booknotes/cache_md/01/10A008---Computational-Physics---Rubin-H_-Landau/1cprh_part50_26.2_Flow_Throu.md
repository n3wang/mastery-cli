# High-Quality Flashcards: 10A008---Computational-Physics---Rubin-H_-Landau_processed (Part 50)


**Starting Chapter:** 26.2 Flow Through Parallel Plates

---


#### Fluid Hydrodynamics Overview
Background context explaining the Navier-Stokes equations and their application. The pressure gradient term ($\nabla P $) describes velocity changes due to pressure variations, while the $\nu \nabla^2 v$ term describes velocity changes caused by viscous forces that tend to impede flow.
:p What are the two primary terms in the Navier-Stokes equation and what do they represent?
??x
The two primary terms in the Navier-Stokes equation are:
- The pressure gradient term $\nabla P$, which describes velocity changes due to pressure variations.
- The viscous force term $\nu \nabla^2 v$, which describes velocity changes caused by viscous forces that tend to impede flow.

These terms capture the essential dynamics of fluid motion, with pressure influencing flow direction and viscosity affecting the rate at which momentum is dissipated. 
x??

---


#### Partial Differential Equations for Flow
Explanation of the reduced PDEs and their significance.
:p What are the simplified PDEs for velocity components $v_x $ and$v_y$ in steady state, incompressible flow?
??x
The simplified PDEs for velocity components in steady state, incompressible flow are:

1. Continuity equation (incompressibility condition):
$$\frac{\partial v_x}{\partial x} + \frac{\partial v_y}{\partial y} = 0 \quad \text{(26.7)}$$2. Navier-Stokes equations in the $ x $ and $ y$ directions:
$$\nu \left( \frac{\partial^2 v_x}{\partial x^2} + \frac{\partial^2 v_x}{\partial y^2} \right) = v_x \frac{\partial v_x}{\partial x} + v_y \frac{\partial v_x}{\partial y} + \frac{1}{\rho} \frac{\partial P}{\partial x} \quad \text{(26.8)}$$$$\nu \left( \frac{\partial^2 v_y}{\partial x^2} + \frac{\partial^2 v_y}{\partial y^2} \right) = v_x \frac{\partial v_y}{\partial x} + v_y \frac{\partial v_y}{\partial y} + \frac{1}{\rho} \frac{\partial P}{\partial y} \quad \text{(26.9)}$$

These equations describe the flow dynamics under steady state and incompressible conditions.
x??

---


#### Parabolic Velocity Profile
Explanation and formula for the parabolic velocity profile in parallel plate flow.
:p What is the velocity profile between two parallel plates, and how is it derived?
??x
The velocity profile $v_x(y)$ between two parallel plates with a separation distance $H$ and an applied pressure gradient $\frac{\partial P}{\partial x}$ is given by:
$$v_x(y) = \frac{1}{2\nu} \left( \frac{\partial P}{\partial x} (y^2 - y H) \right) \quad \text{(26.10)}$$

This parabolic profile arises from the balance of forces in steady state, incompressible flow between parallel plates.
x??

---

---


#### Navier–Stokes Difference Equation for $v(x)$ Background context: The text describes developing difference equations from the Navier–Stokes and continuity PDEs, focusing on the central-difference approximation. This is to solve these equations with successive overrelaxation.

:p What does the equation for $v(x)$ represent in this scenario?
??x
The equation represents a finite difference approximation of the velocity component $v(x)$ in the x-direction using the central-difference method. It balances the contributions from neighboring grid points and boundary conditions, considering viscosity effects.

```java
// Pseudocode for calculating v(x)
for (int i = 1; i < Nx-1; i++) {
    for (int j = 0; j <= Ny; j++) {
        if (j != 0 && j != Ny) { // Avoid boundary conditions
            double v_x_i_j = (v_x[i+1][j] + v_x[i-1][j] + v_y[i][j+1] + v_y[i][j-1]) / 
                             (4 - h*h * (Math.abs(v_x[i+1][j]-v_x[i-1][j]) + Math.abs(v_y[i][j+1]-v_y[i][j-1])) -
                              2 * (P[i+1][j] - P[i-1][j]));
        }
    }
}
```
x??

---


#### Navier–Stokes Difference Equation for $v(y)$ Background context: The text further develops the difference equation for the velocity component in the y-direction. Given that $v_y = 0$, this simplifies the calculation.

:p How does the equation for $v(y)$ simplify due to $v_y = 0$?
??x
Since $v_y = 0 $, the equation for $ v(x)$can be directly solved. The term involving $ v_y$ vanishes, simplifying the expression.

```java
// Simplified pseudocode for calculating v(x)
for (int i = 1; i < Nx-1; i++) {
    double v_x_i_j = (v_x[i+1][j] + v_x[i-1][j] + v_y[i][j+1] + v_y[i][j-1]) / 
                     (4 - h*h * Math.abs(v_x[i+1][j]-v_x[i-1][j]) - 2 * (P[i+1][j] - P[i-1][j]));
}
```
x??

---


#### Relaxation Method for Solving Navier-Stokes Equation

Background context: The relaxation method is a numerical technique used to solve partial differential equations, specifically applied here to the Navier-Stokes equation. It involves iteratively updating the velocity field until it converges to a solution.

Relevant formulas and explanations:
- The algorithm updates the velocity $v(x)$ at each grid point using its old value plus a correction (residual).
$$v(x)_{i,j} = v(x)_{i,j} + r_{i,j}$$- The residual $ r$ is calculated as:
$$r=1 4\left\{ \frac{v(x)_{i+1,j} + v(x)_{i-1,j} + v(x)_{i,j+1} + v(x)_{i,j-1}}{h^2} - \frac{P_{i+1,j} - P_{i-1,j}}{h^2} - \frac{v(y)_{i,j+1} - v(y)_{i,j-1}}{h^2}\right\} - v(x)_{i,j}$$:p What is the relaxation method used for in solving the Navier-Stokes equation?
??x
The relaxation method iteratively updates the velocity field by adding a correction term to the old value, aiming to converge towards a solution. This method helps in reducing the error at each iteration.
x??

---


#### Successive Overrelaxation (SOR) Method

Background context: The SOR method is an acceleration technique used with the relaxation method to speed up convergence by including an amplifying factor $\omega$.

Relevant formulas and explanations:
- The updated velocity field using SOR is given by:
$$v(x)_{i,j} = v(x)_{i,j} + \omega r_{i,j}$$- For standard relaxation,$\omega = 1 $. Overrelaxation occurs with $\omega > 1 $, and underrelaxation for $\omega < 1$.

:p What is the purpose of using successive overrelaxation (SOR) in solving partial differential equations?
??x
The purpose of SOR is to accelerate the convergence rate by including an amplifying factor $\omega$. This helps in reducing the number of iterations needed to reach a solution, making the computational process more efficient.
x??

---


#### Numerical Solution for 2D Fluid Flow

Background context: The problem involves numerically solving the Navier-Stokes equations for a 2D fluid flow using a relaxation method. Specific parameters and boundary conditions are provided.

Relevant formulas and explanations:
- Given parameters: $\nu = 1 \, m^2/s $, $\rho = 103 \, kg/m^3 $, $ N_x = 400 $,$ N_y = 40 $,$ h = 1$.
- The equations for the pressure gradient are:
$$\frac{\partial P}{\partial x} = -12, \quad \frac{\partial P}{\partial y} = 0$$- Initial velocity components are:
$$v(x) = \frac{3j}{20}(1 - j/40), \quad v(y) = 0$$:p What parameters and boundary conditions should be used for the numerical solution of the 2D fluid flow?
??x
The parameters to use are $\nu = 1 \, m^2/s $, $\rho = 103 \, kg/m^3 $, with grid size $ N_x = 400 $ and $ N_y = 40$. The boundary conditions include a pressure gradient in the x-direction of -12, no pressure gradient in the y-direction, and specific velocity components.
x??

---


#### Vorticity Form of Navier-Stokes Equation

Background context: The vorticity form of the Navier-Stokes equation simplifies the solution process by converting it into simpler equations involving stream function $u(x)$ and vorticity field $w(x)$.

Relevant formulas and explanations:
- Stream function $u(x)$:
$$\mathbf{v} = \nabla \times u(x) = \hat{\epsilon}_x\left( \frac{\partial u_z}{\partial y} - \frac{\partial u_y}{\partial z}\right) + \hat{\epsilon}_y\left(\frac{\partial u_x}{\partial z} - \frac{\partial u_z}{\partial x}\right)$$- Vorticity field $ w(x)$:
$$w = \nabla \times v(x) = \frac{\partial v_y}{\partial x} - \frac{\partial v_x}{\partial y}$$:p What are the key concepts in the vorticity form of the Navier-Stokes equation?
??x
The key concepts in the vorticity form include using a stream function $u(x)$ to represent velocity components and a vorticity field $w(x)$ to measure the fluid's rotational behavior. This approach simplifies solving the hydrodynamic equations by reducing them to simpler scalar equations.
x??

---

