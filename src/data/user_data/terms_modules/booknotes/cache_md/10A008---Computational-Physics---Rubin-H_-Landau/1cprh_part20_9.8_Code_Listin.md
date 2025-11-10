# High-Quality Flashcards: 10A008---Computational-Physics---Rubin-H_-Landau_processed (Part 20)


**Starting Chapter:** 9.8 Code Listings

---


#### Discrete Fourier Transform (DFT) Using Complex Numbers

Background context: The DFT is a fundamental tool used to analyze signals by transforming them from the time domain to the frequency domain. When using complex numbers, each input signal can be represented as a combination of sine and cosine functions. The formula for DFT is given by:

\[
X[k] = \sum_{n=0}^{N-1} x[n]e^{-j2\pi kn/N}
\]

where \(x[n]\) is the time-domain signal, \(X[k]\) is the frequency-domain representation, and \(k\) ranges from 0 to \(N-1\).

The provided code demonstrates how to compute the DFT using complex numbers. The `DFT` function iterates over each point in the input signal and calculates the corresponding frequency domain values by summing the product of the time-domain values with complex exponentials.

:p What is the purpose of the `f` method in the given code?

??x
The `f` method generates a time-domain signal based on predefined mathematical expressions. In this case, it creates a signal that consists of three sinusoidal components: a cosine term and two sine terms with different frequencies.

```python
def Signal(y):
    h = twopi / N
    x = 0.
    for i in range(0, N+1):
        y[i] = 30 * cos(x) + 60 * sin(2 * x) + 120 * sin(3 * x)
        SignalCurve.plot(pos=(x, y[i]))
        x += h
```
x??

---


#### Discrete Fourier Transform (DFT) Using Real Numbers

Background context: Similar to the previous DFT implementation using complex numbers, this code computes the DFT for a real-valued signal. However, it only uses real arithmetic by leveraging the properties of sine and cosine functions.

The formula for computing the imaginary part of the DFT is:

\[
X[k]_{\text{imag}} = - \sum_{n=0}^{N-1} x[n]\sin(2\pi kn/N)
\]

This method avoids complex arithmetic by separating real and imaginary parts, making it more efficient for certain hardware implementations.

:p What is the purpose of the `fourier` method in this code?

??x
The `fourier` method computes the DFT's imaginary part for a given signal using only real arithmetic. It iterates over each frequency bin and calculates the sum of products between the time-domain signal values and sine functions, which are scaled by the appropriate frequency factors.

```python
def fourier(dftimag):
    for n in range(0, Np):
        imag = 0.
        for k in range(0, N):
            imag += signal[k] * sin((twopi * k * n) / N)
        dftimag[n] = -imag * sq2pi
```
x??

---


#### Fast Fourier Transform (FFT)

Background context: The FFT is an efficient algorithm to compute the DFT of a sequence. It reduces the complexity from \(O(N^2)\) to \(O(N \log N)\) by exploiting the symmetry and periodicity properties of complex exponentials.

The provided `fft` function implements the Cooley-Tukey algorithm, which recursively splits the DFT into smaller DFTs. The function reorders input data in a bit-reversed manner and performs butterfly operations to combine results from lower frequency bins.

:p What is the primary purpose of the FFT algorithm?

??x
The primary purpose of the FFT algorithm is to efficiently compute the Discrete Fourier Transform (DFT) of a sequence by reducing computational complexity. It achieves this by leveraging the symmetry and periodicity properties of complex exponentials, allowing for recursive decomposition of larger DFTs into smaller ones.

```python
def fft(N, Switch):
    y = zeros(2 * (N + 4), float)
    Y = zeros((N + 3, 2), float)

    # Bit-reversal permutation
    for i in range(1, n + 1, 2):
        j = i - m
        if j < 0:
            break
        y[j], y[j + 1] = y[i], y[i + 1]
    
    # FFT butterfly operations
    istep = 2 * mmax
    theta = 6.2831853 / (Switch * mmax)
    sinth = math.sin(theta / 2.0)
    wstpr = -2.0 * sinth ** 2
    wstpi = math.sin(theta)
    wr = 1.0
    wi = 0.0

    for min range(1, mmax + 1, 2):
        for i in range(m, n + 1, istep):
            j = i + mmax
            tempr = wr * y[j] - wi * y[j + 1]
            tempi = wr * y[j + 1] + wi * y[j]
            y[j], y[j + 1] = y[i] - tempr, y[i + 1] - tempi
            y[i], y[i + 1] = y[i] + tempr, y[i + 1] + tempi

            wr = wr * wstpr - wi * wstpi + wr
            wi = wi * wstpr + tempr * wstpi + wi
        mmax //= 2
```
x??

---

---


#### Wavelet Analysis Introduction
Wavelet analysis is a technique used to analyze signals that change over time. Unlike Fourier analysis, which provides frequency information but lacks temporal resolution, wavelets offer both frequency and time localization, making them suitable for non-stationary signals like those with varying frequencies over time.
:p What does wavelet analysis provide in terms of signal analysis?
??x
Wavelet analysis provides both frequency and time localization. Unlike Fourier analysis, which gives a frequency spectrum but lacks temporal resolution, wavelets can pinpoint when specific frequencies occur within the signal.
x??

---


#### Time Localization
Wavelets are localized in time, meaning they exist for only short periods. This property allows them to capture both the frequency content and when it occurs within the signal.
:p Why is time localization important in wavelet analysis?
??x
Time localization is important in wavelet analysis because it allows capturing both the frequency content of a signal and when specific frequencies occur. Unlike Fourier analysis, which provides only frequency information but lacks temporal resolution, wavelets can pinpoint the time instances at which certain frequencies appear.
x??

---


#### Wave Packet Widths and Fourier Transform
Background context: This section discusses wave packets and their relationship to time-frequency localization, specifically focusing on the widths \(\Delta t\) and \(\Delta \omega\). The Heisenberg uncertainty principle is introduced as a fundamental relation between these two quantities.

:p What is the width of a wave packet in terms of time (\(\Delta t\))?

??x
The width of a wave packet in time, \(\Delta t\), can be estimated using the number of cycles \(N\) and the angular frequency \(\omega_0\). For the specific example given:
\[ \Delta t = N T = \frac{N}{2\pi/\omega_0} = N / (2\pi) \cdot \omega_0. \]
Given that \(T = 2\pi/\omega_0\), this is derived from the periodicity of the wave packet.

The code to calculate this might look like:
```java
public class WavePacket {
    private double omega0;
    private int N;

    public double timeWidth() {
        return N / (2 * Math.PI) * omega0;
    }
}
```
x??

---


#### Fourier Transform of a Simple Wave Packet

Background context: The Fourier transform of the wave packet \(y(t)\) is derived and shown to have non-zero values only around \(\omega_0\). The width in frequency, \(\Delta \omega\), can be estimated from the zeros of the transform.

:p What does the Fourier transform of a simple sine wave look like?

??x
The Fourier transform of a simple sine wave \(y(t) = \sin(\omega_0 t)\) for \(|t| < N \pi/\omega_0\) is:
\[ Y(\omega) = -i \frac{\sqrt{2\pi}}{(\omega^2 - \omega_0^2)} \left[ (\omega_0 + \omega) \sin\left( \frac{N \pi (\omega_0 - \omega)}{\omega_0} \right) - (\omega_0 - \omega) \sin\left( \frac{N \pi (\omega_0 + \omega)}{\omega_0} \right) \right]. \]
This function has significant values only around \(\omega = \omega_0\) and drops off sharply away from this frequency.

The code to evaluate the transform might be:
```java
public class FourierTransform {
    private double omega0;
    private int N;

    public Complex fourierTransform(double omega) {
        if (Math.abs(omega - omega0) < 1e-6) return new Complex(Double.POSITIVE_INFINITY, 0); // Simplified for illustration
        
        double numerator = (omega0 + omega) * Math.sin(N * Math.PI * (omega0 - omega) / omega0)
                          - (omega0 - omega) * Math.sin(N * Math.PI * (omega0 + omega) / omega0);
        
        return new Complex(-1.0 / Math.sqrt(2 * Math.PI), 0) * numerator / ((omega - omega0) * (omega - omega0));
    }
}
```
x??

---


#### Wave Packet Exercises

Background context: This section presents a series of exercises to analyze wave packets in both the time and frequency domains. The focus is on understanding how different wave packets behave and how their Fourier transforms are related.

:p What is the first step in analyzing a wave packet?

??x
The first step in analyzing a wave packet is to estimate its width \(\Delta t\) using methods such as full-width at half-maxima (FWHM) of \(|y(t)|\). This helps understand how long the signal persists over time.

```java
public class WavePacketAnalysis {
    private double[] y;
    
    public double estimateTimeWidth() {
        // Implement FWHM calculation based on y values
        return /* calculated width */;
    }
}
```
x??

---


#### Short-Time Fourier Transforms

Background context: Short-time Fourier transforms (STFT) are introduced as a method to analyze signals that change over time. Unlike the standard Fourier transform, which assumes periodicity and constant amplitude, STFT segments the signal into smaller parts and applies the Fourier transform locally.

:p What is the main advantage of using short-time Fourier transforms?

??x
The main advantage of using short-time Fourier transforms (STFT) is their ability to analyze signals that change over time without assuming they are stationary. By chopping up the signal into small segments and applying the Fourier transform to each segment, STFT provides a localized frequency analysis.

```java
public class ShortTimeFourierTransform {
    private double[] y;
    
    public Complex[] stft(double windowLength) {
        List<Complex> result = new ArrayList<>();
        int stepSize = (int)(0.5 * windowLength); // Define how the windows slide over time
        
        for (int i = 0; i < y.length - windowLength + 1; i += stepSize) {
            double[] segment = Arrays.copyOfRange(y, i, i + windowLength);
            result.add(fourierTransform(segment));
        }
        
        return result.stream().toArray(Complex[]::new);
    }

    private Complex fourierTransform(double[] segment) {
        // Perform Fourier transform on the segment
        return /* calculated transform */;
    }
}
```
x??

---

