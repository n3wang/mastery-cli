# High-Quality Flashcards: 10A008---Computational-Physics---Rubin-H_-Landau_processed (Part 40)


**Starting Chapter:** 19.3.1 Newtons Potential Corrected. 19.3.2 Orbit Computation via Energy Conservation

---


#### Effect of Energy on Orbits
Background context explaining how the effective potential affects orbits and the significance of energy in determining orbit characteristics.

:p Describe how the orbits within this potential change with different energies.
??x
The orbits are influenced by the total energy $E $, which is a sum of kinetic and potential terms. The effective potential determines the stable, unstable, and circular orbits based on the value of $ E$.

- For low $E$: Orbits can be highly elliptical or even spiral in.
- For moderate $E$: Stable orbits (elliptical) are possible.
- For high $E$: Orbits tend to be hyperbolic or parabolic.

The specific details depend on the balance between the kinetic and potential energies. The effective potential has maxima and minima, which indicate different types of orbits:
- Maxima: Unstable orbits (small perturbations lead to rapid divergence).
- Minima: Stable orbits (perturbations lead to oscillatory motion around the equilibrium).

The circular orbit exists at a specific radius where $dV_{\text{eff}}/dr = 0 $ and$d^2 V_{\text{eff}}/dr^2 > 0$.
x??

---


#### Finding Maximum and Minimum of Effective Potential
Background context explaining how to find the critical points of the effective potential.

:p At what values of $r'$ does the effective potential have a maximum and minimum?
??x
To find the maxima and minima, we take the first derivative of $V_{\text{eff}}(r')$ with respect to $r'$ and set it to zero:
$$\frac{d V_{\text{eff}}}{d r'} = -\frac{G M}{r'^2} + \frac{\ell'^4}{r'^3} + 3 G M \ell'^2 / r'^4 = 0$$

Solving this equation numerically for specific values of $G $,$ M $, and$\ell'$ gives the critical points.

For example, using Python to solve it:

```python
from scipy.optimize import fsolve

# Define Veff and its derivative
def V_eff_derivative(r_prime):
    return -G * M / r_prime**2 + (l_prime**4) / r_prime**3 + 3 * G * M * l_prime**2 / r_prime**4

# Initial guess for the root
initial_guess = [1, 50]

# Find roots
roots = fsolve(V_eff_derivative, initial_guess)

print(f"Critical points: {roots}")
```
x??

---


#### Circular Orbit Existence
Background context explaining how to determine if a circular orbit exists and its stability.

:p At what value of $r'$ does a circular orbit exist?
??x
To find the radius for a circular orbit, we set the effective potential's first derivative to zero:
$$\frac{d V_{\text{eff}}}{d r'} = -\frac{G M}{r'^2} + \frac{\ell'^4}{r'^3} + 3 G M \ell'^2 / r'^4 = 0$$

And the second derivative should be positive to ensure stability:
$$\frac{d^2 V_{\text{eff}}}{d r'^2} > 0$$

For $\ell' = 4.3$, solving these equations numerically will give us the radius of a circular orbit.

```python
from scipy.optimize import fsolve

def V_eff_derivative(r_prime):
    return -G * M / r_prime**2 + (l_prime**4) / r_prime**3 + 3 * G * M * l_prime**2 / r_prime**4

# Initial guess for the root
initial_guess = [1]

# Find roots
roots = fsolve(V_eff_derivative, initial_guess)

print(f"Radius for circular orbit: {roots[0]}")
```
x??

---


#### Numerical Exploration of Orbits
Background context explaining how to use energy conservation and the ODE derived from it to numerically explore orbits.

:p Use your ODE solver to explore various orbits corresponding to different initial conditions and energies.
??x
To explore orbits, we use the equation for angular momentum $u' = M / r'$ and solve the second-order differential equation:
$$\frac{d^2 u'}{d \phi^2} = -u' + \frac{G M}{\ell'^2} (1 + 3 G M u')$$

The initial conditions are derived from the energy integral. We use a numerical solver to plot orbits.

```python
def orbit_equation(phi, y, G, M, l_prime):
    u_prime = y[0]
    d2u_dphi2 = -u_prime + (G * M) / (l_prime**2) * (1 + 3 * G * M * u_prime)
    return [d2u_dphi2]

# Initial conditions
E = ...  # energy value, e.g., from Figure 19.4

# Convert to initial condition for y0
y0 = [l_prime**2 / (2 * E)]

# Solve ODE
from scipy.integrate import solve_ivp
sol = solve_ivp(orbit_equation, [phi_min, phi_max], y0, args=(G, M, l_prime), t_eval=np.linspace(phi_min, phi_max, 1000))

# Plotting the orbit
plt.figure()
plt.plot(sol.y[0] * l_prime / (2 * E), sol.t)
plt.title('Orbit for given energy')
plt.xlabel('$u\'$')
plt.ylabel('$\phi$')
plt.grid(True)
plt.show()
```
x??

---


#### Minimum Effective Potential and Orbits
Background context explaining how to find orbits corresponding to the minimum of the effective potential.

:p Choose an energy that corresponds to the minimum in the effective potential and plot nearby orbits. Examine the sensitivity of these orbits to the choice of initial conditions.
??x
To find orbits near the minimum of the effective potential, we first identify the radius where $V_{\text{eff}}$ has a minimum. This is typically done by solving:
$$\frac{d V_{\text{eff}}}{d r'} = 0$$

For a specific $\ell'$, this gives us a critical point. The minimum of the effective potential can be numerically found and used to determine stable orbits.

```python
def find_minimal_energy(G, M, l_prime):
    # Solve for the radius where V_eff has a minimum
    def V_eff_derivative(r_prime):
        return -G * M / r_prime**2 + (l_prime**4) / r_prime**3 + 3 * G * M * l_prime**2 / r_prime**4

    initial_guess = [10]
    minimal_radius = fsolve(V_eff_derivative, initial_guess)[0]

    # Calculate the energy corresponding to this radius
    V_min = -G * M / minimal_radius + (l_prime**2) / (2 * minimal_radius**2) - G * M * l_prime**2 / minimal_radius**3

    return minimal_radius, V_min

minimal_radius, E_min = find_minimal_energy(G, M, l_prime)

# Plot nearby orbits
def plot_nearby_orbits(E, r0, l_prime):
    y0 = [l_prime**2 / (2 * E)]
    sol = solve_ivp(orbit_equation, [phi_min, phi_max], y0, args=(G, M, l_prime), t_eval=np.linspace(phi_min, phi_max, 1000))
    plt.plot(sol.y[0] * l_prime / (2 * E), sol.t)
plot_nearby_orbits(E_min, minimal_radius, l_prime)

plt.title('Nearby orbits for minimal energy')
plt.xlabel('$u\'$')
plt.ylabel('$\phi$')
plt.grid(True)
plt.show()
```
x??

---


#### Differential Equation for Planetary Orbits

Background context: The text provides a differential equation derived from the geodesic equation to describe the motion of particles in GR. This equation helps understand how orbits are affected by the curvature of spacetime.

:p What is the final differential equation that relates distance $r $ and angle$\phi$ for a planetary orbit?
??x
The final differential equation relating distance $r $ and angle$\phi$ for a planetary orbit in GR is:
$$\left( \frac{dr}{d\phi} \right)^2 = r^4 L^2 \left[ \left(1 - \frac{r_s}{R}\right)\left(1 + \frac{L^2}{R^2}\right) - \left(1 - \frac{r_s}{r}\right)\left(1 + \frac{L^2}{r^2}\right) \right]$$---


#### Precession of Mercury

Background context: The text explains that the precession of Mercury's orbit is a significant test case for general relativity. It calculates this effect using first principles and shows how GR provides a better explanation than Newtonian mechanics.

:p What does the text mention about the precession of Mercury?
??x
The text mentions that the precession of Mercury's perihelion is 9.55 minutes of arc per century, with all but about 0.01 degrees explained by perturbations due to other planets in Newtonian mechanics. The remaining small mystery was one of the early successes of general relativity in explaining this phenomenon.

---


#### Differential Equation Derivation

Background context: The text derives a differential equation to describe the motion in terms of distance and angle, starting from the geodesic equation.

:p How does the text derive the differential equation for the rate of change of distance with respect to angle $\phi$?
??x
The derivation starts with the time-like geodesic equation:
$$\left( \frac{d\tau}{dt} \right)^2 = (1 - \frac{r_s}{r}) - \frac{\dot{r}^2}{1 - r_s/r} - r^2 \dot{\phi}^2$$

Using the definitions for $d\tau/dt $ and$d\phi/dt $, the equation is transformed into a differential equation relating distance$ r $and angle$\phi$:
$$\left( \frac{dr}{d\phi} \right)^2 = r^4 L^2 \left[ \left(1 - \frac{r_s}{R}\right)\left(1 + \frac{L^2}{R^2}\right) - \left(1 - \frac{r_s}{r}\right)\left(1 + \frac{L^2}{r^2}\right) \right]$$---

---


#### Perihelion Precession Calculation

Background context: The problem involves solving for the perihelion precession using general relativity. The solution involves transforming the given equation to a more manageable form and then integrating it to find the precession angle.

Relevant formulas:

1.$(\frac{du}{d\phi})^2 = \frac{r_s}{R} (u-1)(u-u_+)(u-u_-)$2.$ u_{\pm} = -\frac{b \pm \sqrt{b^2-4ac}}{2a}, a=\frac{r_s}{R}, b=a-1, c=b+\frac{r_s L^2}{R}$ Where:
- $u$ is the inverse distance
- $r_s $ and$R$ are constants related to gravitational parameters

The perihelion precession angle $\Delta\phi$ can be written as:
$$\Delta\phi = 2\pi - 2\int_{1}^{u^-} \frac{du}{\sqrt{(u-u_+)(u-u_-)(u-1)}}$$:p How is the perihelion precession angle expressed in terms of the integral?
??x
The expression for the perihelion precession angle $\Delta\phi $ uses an integral form to account for the gravitational effects described by general relativity. The integral is over the range from 1 (the starting point, often related to a specific coordinate system origin) to$u^-$, which represents one of the roots in the transformed equation.

The integral itself:

$$\Delta\phi = 2\pi - 2\int_{1}^{u^-} \frac{du}{\sqrt{(u-u_+)(u-u_-)(u-1)}}$$

This form arises because the integrand involves the square root of a product that encapsulates the relativistic effects on the trajectory, leading to a precession in the perihelion.

The factor $2\pi$ is subtracted because it represents the full circle without considering the relativistic correction. The integral captures the deviation from this full circle due to gravitational influences.
x??

---


#### Perihelion Precession Calculation - Numerical Value

Background context: Given specific numerical values for the perihelion parameters, we need to calculate $\Delta\phi$ and compare it with a reference value provided by Landau and Lifshitz.

Relevant data:
- $r_s = 2950m $-$ r_a = 69.82 \times 10^9 m$(apoapsis radius)
- $r_p = 46.00 \times 10^9 m$(perihelion radius)

:p How can we compute the perihelion precession angle $\Delta\phi$ using given parameters?
??x
Using the provided parameters, we need to calculate the perihelion precession angle $\Delta\phi$ by solving the integral:
$$\Delta\phi = 2\pi - 2\int_{1}^{u^-} \frac{du}{\sqrt{(u-u_+)(u-u_-)(u-1)}}$$

Where:
- $u^-, u_+, u_-$ are roots of the quadratic equation derived from the transformed general relativity equation.
- These roots can be found using the quadratic formula:
$$u_{\pm} = -\frac{b \pm \sqrt{b^2-4ac}}{2a}, a=\frac{r_s}{R}, b=a-1, c=b+\frac{r_s L^2}{R}$$

Given:
- $r_s = 2950m $-$ R = \text{(a reference value related to the problem context)}$To compute this numerically, we would use a numerical integration method (such as Simpson's rule or trapezoidal rule) on the interval from 1 to $ u^-$. The result should be compared with Landau and Lifshitz's value of $5.02 \times 10^{-7}$.

Example Python code snippet for numerical integration could look like this:

```python
from scipy.integrate import quad

def integrand(u):
    return 1 / np.sqrt((u - u_plus) * (u - u_minus) * (u - 1))

result, error = quad(integrand, 1, u_minus)
phi_precession = 2 * np.pi - 2 * result
```

In this code:
- `integrand` is the function to integrate.
- `quad` performs the numerical integration from 1 to $u^-$.
- The final precession angle $\Delta\phi $ is computed by subtracting twice the integral value from$2\pi$.

Note: Ensure that the values for $u_plus, u_minus$ are correctly calculated based on the quadratic roots.
x??

---

