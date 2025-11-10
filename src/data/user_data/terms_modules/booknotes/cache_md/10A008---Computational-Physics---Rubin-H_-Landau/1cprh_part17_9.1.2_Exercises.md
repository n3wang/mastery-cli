# High-Quality Flashcards: 10A008---Computational-Physics---Rubin-H_-Landau_processed (Part 17)


**Starting Chapter:** 9.1.2 Exercises Fourier Series Summations

---


#### Integration Range Simplification
Background context: For odd functions like the sawtooth, only half the integration range is needed to determine the Fourier coefficients because the function is symmetric about the origin. Similarly, for even functions, only half the range is required due to symmetry.
:p Why do we need to integrate over only half the period in some cases?
??x
We only need to integrate over half the period when dealing with odd or even functions due to their symmetry:
- For an odd function \(y(t) = -y(-t)\), the integral from \(-T/2\) to \(0\) is the negative of the integral from \(0\) to \(T/2\). Thus, we only need to integrate over half the period.
- For an even function \(y(t) = y(-t)\), the integrals from \(-T/2\) to \(0\) and from \(0\) to \(T/2\) are identical. Therefore, integrating over half the period is sufficient.

This simplification reduces computational complexity while maintaining the accuracy of the Fourier series.
x??

---

---


#### Sawtooth Function Fourier Series Summation

Background context: The text discusses summing the Fourier series for a sawtooth function up to different orders and observing its behavior over two periods. The sawtooth function has discontinuities, which can lead to overshooting as described by Gibbs phenomenon.

:p What is the Fourier series summation for the sawtooth function up to order N=20?

??x
The Fourier series summation for the sawtooth function up to order \(N = 20\) involves summing the coefficients \(a_n\) and \(b_n\). For a sawtooth function, these coefficients are:

\[a_n = -\frac{4}{n^2 \pi^2} \quad \text{for } n \neq 0, \text{ even or odd}\]
\[b_n = 0 \]

For \(N=20\), the summation involves terms from \(n=1\) to \(20\).

The series is:

\[ y(t) = \sum_{n=1}^{20} b_n \sin(n \omega t) + a_1 \sin(\omega t) - \sum_{n=3,5,...,19} \frac{4}{n^2 \pi^2} \cos((n-1) \omega t) \]

Since \(b_n = 0\) for all \(n\), the series simplifies to:

\[ y(t) = -\sum_{n=3,5,...,19} \frac{4}{(n-1)^2 \pi^2} \cos((n-1) \omega t) + a_1 \sin(\omega t) \]

Where \(a_1\) is the first coefficient.

For \(N = 20\):

\[ y(t) = -\frac{4}{9 \pi^2} \cos(2 \omega t) - \frac{4}{25 \pi^2} \cos(4 \omega t) - \cdots - \frac{4}{361 \pi^2} \cos(18 \omega t) + a_1 \sin(\omega t) \]

:p How does the series at \(N=20\) behave around discontinuities?

??x
At \(N=20\), the Fourier series of the sawtooth function overshoots by about 9% on either side of the discontinuity, a phenomenon known as Gibbs phenomenon. This occurs because the series tries to approximate the sharp corners of the discontinuous function with a finite number of terms.

:p How can you verify that the series gives the mean value at points of discontinuity?

??x
To verify that the series gives the mean value at points of discontinuity, we need to check if the average value of the series equals the midpoint of the jump in the sawtooth function. For a sawtooth function that goes from 0 to \(2\pi\) over one period:

- At \(t = T/4\), the function jumps from 0 to \(\pi\).
- The mean value should be \((0 + \pi) / 2 = \pi / 2\).

For the Fourier series, we sum up the series and evaluate it at the discontinuity points. The average value is:

\[ y(t) = -\sum_{n=3,5,...,19} \frac{4}{(n-1)^2 \pi^2} + a_1 \sin(\omega t) \]

At \(t = T/4\), since the sine terms average to zero over one period:

\[ y(T/4) = -\sum_{n=3,5,...,19} \frac{4}{(n-1)^2 \pi^2} \]

The series converges to a value that is close to the mean of the discontinuity.

:p How can you plot the results over two periods?

??x
To plot the results over two periods using Python and `FourierMatplot.py`:

```python
# Import necessary libraries
import numpy as np
from FourierMatplot import *  # Assuming FourierMatplot is a custom library

# Define the function to be plotted
def sawtooth(t):
    T = 1  # Period of the function
    return t % (2 * T) - T if 0 < t % T <= T else 0

# Sum the Fourier series up to N=20
N = 20
a_n = [-4 / (n**2 * np.pi**2) for n in range(1, N+1, 2)]  # Only odd terms
b_n = [0] * N  # No sine terms

# Generate time points
t = np.linspace(-T, 3*T, 1000)

# Compute the Fourier series approximation
y_approx = sum(a * np.sin(n * omega * t) for n, a in enumerate(a_n))

# Plot the original and approximate functions over two periods
plot_sawtooth_and_approx(t, sawtooth, y_approx)
```

:p What is the Gibbs phenomenon?

??x
The Gibbs phenomenon refers to the overshoot that occurs at points of discontinuity when approximating a discontinuous function using a finite number of terms from its Fourier series. Despite the approximation converging to the true value in an average sense, it will overshoot near the discontinuities by about 9% for large \(N\).

:p Half-Wave Function Fourier Series Summation

??x
The half-wave function is periodic but nonharmonic and continuous with discontinuous derivatives. The Fourier series summation up to order \(N=20\) can be computed using:

\[ y(t) = \frac{1}{2} \sin(\omega t) - \frac{2}{3\pi} \cos(2\omega t) - \frac{2}{15\pi} \cos(4\omega t) + \cdots \]

:p How does the Fourier series of the half-wave function converge?

??x
The Fourier series for the half-wave function converges well due to its continuous nature and absence of sharp corners. This allows it to be accurately represented by a finite number of terms, unlike the sawtooth function which exhibits overshooting.

---


#### Discrete Fourier Transform (DFT) Definition and Context
Background context: The DFT is an approximation of the continuous Fourier transform when a signal \( y(t) \) is known at discrete time points. This occurs because signals are often measured over finite intervals rather than being defined for all time.

The formula for the DFT involves summing the product of the signal values and complex exponentials over a period \( T \):
\[ Y(\omega_n) = N \sum_{k=1}^{N} y_k e^{-2\pi i k n / N} \sqrt{\frac{2}{\pi}}. \]

:p What is the DFT formula for calculating \( Y(\omega_n) \)?
??x
The DFT formula for calculating \( Y(\omega_n) \) involves summing the product of the signal values and complex exponentials over a period:
\[ Y(\omega_n) = N \sum_{k=1}^{N} y_k e^{-2\pi i k n / N} \sqrt{\frac{2}{\pi}}. \]
This formula represents how the DFT is computed from discrete data points.

x??

---


#### Periodicity Assumption in DFT
Background context: The signal \( y(t) \) is assumed to be periodic with period \( T \), meaning that the measured values are repeated over this interval. This assumption ensures that only \( N \) independent measurements are used in the transform, maintaining its independence.

The periodicity is enforced by defining the first and last samples to be equal:
\[ y_0 = y_N. \]

:p How does the DFT ensure that there are \( N \) independent measurements?
??x
By enforcing the periodicity assumption, the DFT ensures that only \( N \) independent measurements are used in the transform. This is achieved by defining the first and last samples to be equal:
\[ y_0 = y_N. \]
This approach maintains the independence of the data points.

x??

---


#### DFT Algorithm and Inverse
Background context: The DFT algorithm follows from two approximations: evaluating the integral over a finite interval instead of \(-\infty\) to \(+\infty\), and using the trapezoid rule for integration. The inverse transform is derived by inverting these steps.

The forward DFT is:
\[ Y(\omega_n) = N \sum_{k=1}^{N} y_k e^{-2\pi i k n / N} \sqrt{\frac{2}{\pi}}. \]

The inverse DFT is:
\[ y(t) \approx \sum_{n=1}^{N} 2\pi N h e^{i \omega_n t} Y(\omega_n). \]

:p What are the key steps in the DFT algorithm?
??x
The key steps in the DFT algorithm involve two main approximations:
1. Evaluating the integral over a finite interval from \(0\) to \(T\):
\[ Y(\omega_n) = N \sum_{k=1}^{N} y_k e^{-2\pi i k n / N} \sqrt{\frac{2}{\pi}}. \]
2. Using the trapezoid rule for integration.

The inverse DFT is derived by inverting these steps:
\[ y(t) \approx \sum_{n=1}^{N} 2\pi N h e^{i \omega_n t} Y(\omega_n). \]

These steps ensure that the transform can be computed and inverted to reconstruct the original signal.

x??

---


#### Periodicity in DFT Output
Background context: The periodicity of the signal \( y(t) \) with period \( T \) means that the output of the DFT is also periodic. This implies that extending the signal by padding with zeros does not introduce new information but assumes the signal has no existence beyond the last measurement.

The periodicity is observed in:
\[ Y(\omega_n + N\omega_1) = Y(\omega_n). \]

:p How does the DFT output exhibit periodicity?
??x
The DFT output exhibits periodicity due to the assumed periodicity of the input signal \( y(t) \). This means that the values at the end and beginning of the period are repeated:
\[ Y(\omega_n + N\omega_1) = Y(\omega_n), \]
where \( \omega_1 = \frac{2\pi}{T} \).

Padding with zeros does not add new information but assumes that the signal has no existence beyond the last measurement, leading to periodic extension.

x??

---


#### Aliasing and DFT
Background context: When analyzing non-periodic functions using the DFT, the inherent period becomes longer due to the sampling interval. If the repeat period \( T \) is very long, it may not significantly affect the spectrum for times within the sampling window. However, padding the signal with zeros can introduce spurious conclusions.

:p What is the relationship between aliasing and DFT?
??x
Aliasing in DFT occurs when non-periodic functions are analyzed using the DFT over a finite period \( T \). The inherent period becomes longer due to the sampling interval, which means that if the repeat period \( T \) is very long, it may not significantly affect the spectrum for times within the sampling window. Padding the signal with zeros can introduce spurious conclusions by assuming the signal has no existence beyond the last measurement.

x??

---

---

