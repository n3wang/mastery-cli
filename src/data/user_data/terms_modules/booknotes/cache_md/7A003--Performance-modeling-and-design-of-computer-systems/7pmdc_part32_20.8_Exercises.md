# High-Quality Flashcards: 7A003--Performance-modeling-and-design-of-computer-systems_processed (Part 32)


**Starting Chapter:** 20.8 Exercises

---


#### Simulation of M/BP/1 System
Background context: This section describes a simulation exercise to model an FCFS (First-Come-First-Served) server with job arrivals following a Poisson process and job sizes distributed according to a Bounded Pareto distribution. The goal is to measure the mean time in the queue \(E[TQ]\).

For this exercise, we will simulate two cases of Bounded Pareto distributions with different values of \(\alpha\):
- Case 1: \(\alpha = 1.5\) (high variability and heavier tail)
- Case 2: \(\alpha = 2.9\) (low variability and light tail)

The mean job size is fixed at 3,000 for both cases.

:p What are the two values of \(\alpha\) used in this simulation?
??x
\(\alpha = 1.5\) and \(\alpha = 2.9\).
x??

#### Calculation of Sample Mean and Variance
Background context: After running the simulator multiple times, we need to calculate the sample mean \(SM\) and sample variance \(SV\). The formulas for these are:
\[ SM = \frac{X_1 + X_2 + \cdots + X_n}{n} \]
\[ SV = \frac{1}{n-1} \sum_{i=1}^{n} (X_i - SM)^2 \]

:p How do you calculate the sample mean \(SM\)?
??x
The sample mean \(SM\) is calculated by summing up all the samples and dividing by the number of samples:
\[ SM = \frac{X_1 + X_2 + \cdots + X_n}{n} \]
x??

#### Calculation of True Mean and Variance Using M/G/1 Formulas
Background context: For the M/G/1 queue, we can use specific formulas to calculate \(E[TQ]\) and \(Var(TQ)\):
\[ E[TQ] = \frac{\rho}{1 - \rho} \cdot \frac{E[S^2]}{2E[S]} \]
\[ Var(TQ) = (E[TQ])^2 + \lambda E[S^3] \]

:p What are the formulas for \(E[TQ]\) and \(Var(TQ)\)?
??x
The formulas for \(E[TQ]\) and \(Var(TQ)\) are:
\[ E[TQ] = \frac{\rho}{1 - \rho} \cdot \frac{E[S^2]}{2E[S]} \]
\[ Var(TQ) = (E[TQ])^2 + \lambda E[S^3] \]
x??

#### Comparison of Analytical and Simulated Results
Background context: In the case where \(\alpha = 1.5\), the analytical values for \(E[TQ]\) and \(Var(TQ)\) will likely be higher than the simulated results due to the heavier tail in the Bounded Pareto distribution, making the system more variable.

:p Why are the analytically derived values of \(E[TQ]\) and \(Var(TQ)\) much higher for \(\alpha = 1.5\)?
??x
The analytically derived values are much higher because the heavier tail in the Bounded Pareto distribution (\(\alpha = 1.5\)) makes the system more variable, leading to longer queues than expected under lighter-tailed distributions.
x??

#### Long Simulation Run for Accurate Sampling
Background context: Each run of the simulator involves simulating a large number (e.g., 50,000) arrivals before taking a sample point. This is done to ensure that the system reaches a steady state.

:p Why does each run start with 50,000 arrivals before sampling?
??x
Starting each run with 50,000 arrivals ensures that the system has reached its steady state before recording the time in queue for the next arrival. This improves the accuracy of the sample.
x??

#### Calculation of Top 1 Percent Load for Different Distributions
Background context: For job size distributions:
- Exponential distribution with mean 3,000
- Bounded Pareto distribution \(BP(k=0.0009, p=10^{10}, \alpha = 0.5)\) with mean 3,000
- Bounded Pareto distribution \(BP(k=332.067, p=10^{10}, \alpha = 1.1)\) with mean 3,000

We need to compute the fraction of load made up by just the top 1 percent of all jobs and report the size cutoff \(x\) defining the top 1 percent.

:p How do you calculate the fraction of load made up by the top 1 percent?
??x
The fraction of load can be calculated by integrating the distribution from the size cutoff to infinity. For the Bounded Pareto, this involves solving:
\[ \int_{x}^{\infty} f(x) dx = 0.01 \]
where \(f(x)\) is the probability density function.
x??

#### Generating Instances of Bounded Pareto Distribution
Background context: The inverse-transform method for generating instances of a Bounded Pareto distribution involves using:
\[ x = k \left( \frac{1 + u/\left(k p / (1 - 1/\alpha)\right)^{-1}}{u} \right)^{1/\alpha} \]
where \(x\) is an instance of the Bounded Pareto, and \(u\) is a uniform random variable between 0 and 1.

However, due to the nature of the UNIX random number generator function `rand()`, which returns integers between 0 and \(2^{31}-1\), \(u\) is actually in \([0, 1 - 2^{-31})\).

:p Why does using the UNIX `rand()` function affect the Bounded Pareto distribution?
??x
Using the UNIX `rand()` function affects the Bounded Pareto distribution because it returns integers between 0 and \(2^{31}-1\), making \(u\) actually range from \([0, 1 - 2^{-31})\) instead of \([0, 1)\). This can lead to discrepancies in the actual distribution compared to the theoretical one.
x??

#### Calculation of Cutoff for Bounded Pareto Distributions
Background context: Fill in the blank entries for Table 20.1 by computing \(C_2\), the second moment of the distribution.

:p How do you calculate \(p_{Actual}\) and \(C_2_{Actual}\)?
??x
To calculate \(p_{Actual}\):
\[ p_{Actual} = 1 - 2^{-31} \]

Then, using \(p_{Actual}\), compute \(C_2_{Actual}\) as:
\[ C_2_{Actual} = E[X^2] \]
where \(E[X^2]\) is calculated based on the distribution parameters.
x??

---


#### Concept Title: Phase-Type Distributions and Markov Chains

Background context explaining the concept. Many systems are modeled using Markov chains, but this requires workloads to have the memoryless property (Markovian). If job sizes or interarrival times are not exponentially distributed (memoryless), a different approach is needed.

Matrix-analytic methods allow us to model more complex distributions and solve such problems numerically. Phase-type distributions represent any distribution as a mixture of exponential distributions, making it possible to use Markov chains for modeling these systems.

:p What is the significance of phase-type distributions in system modeling?
??x
Phase-type distributions are significant because they enable the representation of non-Markovian workloads (distributions that do not have the memoryless property) using a combination of exponential distributions. This allows us to model complex systems, such as those with non-exponentially distributed job sizes or interarrival times, and analyze them via Markov chains.
x??

---


#### Concept Title: Mixing Exponential Distributions for Deterministic or Near-Deterministic Distributions

Explanation of how to use series connection of Exponential distributions to create a Deterministic or near-Deterministic distribution.

:p How can we model a service time with low variability using Exponential distributions?
??x
We can model the service time \( T \) as passing through \( k \) stages, where each stage follows an Exponential distribution. The total time \( T = T_1 + T_2 + \ldots + T_k \), and each \( T_i \sim \text{Exp}(k\mu) \). This results in a distribution known as the Erlang-k distribution.

```java
public class Erlang {
    private int k; // number of stages
    private double lambda; // rate parameter

    public Erlang(int k, double lambda) {
        this.k = k;
        this.lambda = lambda;
    }

    public double pdf(double x) {
        if (x < 0) return 0.0;
        double term1 = Math.pow(lambda * k, k);
        double term2 = Math.factorial(k - 1);
        double expPart = Math.exp(-lambda * x * k);
        return (term1 / term2) * Math.pow(x, k - 1) * expPart;
    }

    private static class Helper {
        public static long factorial(long n) {
            if (n <= 1) return 1;
            return n * factorial(n - 1);
        }
    }
}
```

This code defines a simple Erlang distribution where the total service time is the sum of \( k \) independent Exponential distributions, each with rate \( k\mu \).
x??

---

---


#### Erlang-k Distribution and Hypoexponential (Generalized Erlang) Distribution

Background context explaining the concept. An **Exponential random variable** is a continuous probability distribution that often models the time between events in a Poisson point process. When \( T \) is the sum of \( k \) independent Exponential random variables with rate \( \mu \), then \( T \) has an Erlang-k distribution.

The key properties for an Erlang-k distribution are:
- **Expected Value (E[T])**: 
  \[
  E[T] = k \cdot \frac{1}{\mu}
  \]
- **Variance (Var(T))**:
  \[
  Var(T) = k \cdot \left(\frac{1}{\mu}\right)^2
  \]
- **Coefficient of Variation Squared (\( C_2^T \))**:
  \[
  C_2^T = \frac{Var(T)}{(E[T])^2} = \frac{k \cdot \left(\frac{1}{\mu}\right)^2}{k \cdot \left(\frac{1}{\mu}\right)^2} = \frac{1}{k}
  \]

If the phases are in series and not identical, the distribution is called a **Generalized Erlang (Hypoexponential) distribution**.

:p What are \( E[T] \), \( Var(T) \), and \( C_2^T \) for an Erlang-k distribution?
??x
The expected value, variance, and coefficient of variation squared for an Erlang-k distribution with rate \( \mu \):
- Expected Value: 
  \[
  E[T] = k \cdot \frac{1}{\mu}
  \]
- Variance:
  \[
  Var(T) = k \cdot \left(\frac{1}{\mu}\right)^2
  \]
- Coefficient of Variation Squared:
  \[
  C_2^T = \frac{Var(T)}{(E[T])^2} = \frac{k \cdot \left(\frac{1}{\mu}\right)^2}{k \cdot \left(\frac{1}{\mu}\right)^2} = \frac{1}{k}
  \]
x??

---


#### Convergence to Deterministic Distribution

Background context explaining the concept. As \( k \) approaches infinity in an Erlang-k distribution, the variance and coefficient of variation squared decrease.

:p What happens as \( k \to \infty \)?
??x
As \( k \to \infty \):
- The coefficient of variation squared (\( C_2^T \)) converges to 0.
- The random variable \( T \) converges in distribution to a deterministic value \( \frac{1}{\mu} \).

This means that for an infinite number of stages, the distribution approaches a fixed deterministic time with mean \( \frac{1}{\mu} \).
x??

---


#### Constructing Erlang-k Distribution

Background context explaining the concept. Given any mean \( E[T] = \frac{1}{\mu} \) and a coefficient of variation squared \( C_2^T = \frac{1}{k} \), one can construct an Erlang-k distribution that matches these properties.

:p How do we create a distribution with \( C_2 > 1 \) using Exponential stages?
??x
To create a distribution with \( C_2 > 1 \) using exponential stages, the phases are not in series but "in parallel" instead. This is called a **Hyperexponential distribution**.

A two-phase Hyperexponential distribution (H2) can be defined as:
- With probability \( p \), \( T \sim Exp(\mu_1) \)
- With probability \( 1 - p \), \( T \sim Exp(\mu_2) \)

This is extended to a k-phase Hyperexponential distribution, where each phase has its own rate and probability.

:p What are the key parameters of a Hyperexponential distribution?
??x
The key parameters for a Hyperexponential distribution are:
- Two (or more) exponential rates: \( \mu_1, \mu_2, ..., \mu_k \)
- Probabilities associated with each phase: \( p, 1 - p, ... \)

Given any mean and coefficient of variation squared, one can find appropriate settings for these parameters to match them.

:p What is the expected value \( E[T] \) in a Degenerate Hyperexponential distribution?
??x
In a degenerate hyperexponential distribution where one phase is identically zero:
\[
T \sim 
\begin{cases} 
Exp(p\mu) & \text{with probability } p \\
0 & \text{with probability } 1 - p 
\end{cases}
\]

The expected value \( E[T] \) is:
\[
E[T] = p \cdot \frac{1}{p\mu} + (1 - p) \cdot 0 = \frac{1}{\mu}
\]
x??

---

---


#### Phase-Type Distribution (PH)

**Background context explaining the concept. Include any relevant formulas or data here:**
The phase-type distribution (PH) is a generalization of mixing Exponential distributions in series and parallel, used to represent almost any non-negative distribution function.

- The distribution represents time until absorption in a \(k+1\) state continuous-time Markov chain (CTMC).
- The initial state probabilities are given by vector \(\vec{a} = (a_0, a_1, ..., a_k)\), where each \(a_i\) denotes the probability of starting in state \(i\), and \(\sum_{i=0}^{k} a_i = 1\).
- The rate transition matrix \(T\) is a \(k \times (k+1)\) matrix where \(T_{ij} = \mu_{ij}\) is the rate of moving from state \(i\) to state \(j\), with no transitions out of absorbing state 0 or back into itself.

**Example:**
Consider a 3-phase PH distribution illustrated in Figure 21.3, where states 1 through 3 are transient and state 0 is absorbing. The initial state probabilities vector \(\vec{a} = (a_0, a_1, a_2, a_3)\) determines the starting point.

:p What does a phase-type distribution represent?
??x
A phase-type distribution represents time until absorption in a continuous-time Markov chain with \(k+1\) states. Specifically:
- State 0 is an absorbing state.
- States 1 through k are transient states.
- The initial state probabilities are given by vector \(\vec{a} = (a_0, a_1, ..., a_k)\), where each \(a_i\) denotes the probability of starting in state \(i\).
- The rate transition matrix \(T\) describes the rates at which transitions occur between states.

For example, in a 3-phase PH distribution with states \(\{0, 1, 2, 3\}\), state 0 is absorbing, and states \(\{1, 2, 3\}\) are transient. The initial state probabilities vector could be \(\vec{a} = (a_0, a_1, a_2, a_3)\).

```java
public class PhaseTypeDistribution {
    private double[] initialStateProbabilities;
    private double[][] transitionRates;

    public PhaseTypeDistribution(double[] initialStateProbabilities, double[][] transitionRates) {
        this.initialStateProbabilities = initialStateProbabilities;
        this.transitionRates = transitionRates;
    }

    // Method to calculate the distribution properties
    public void analyze() {
        // Analysis code here
    }
}
```
x??

---

---


#### M/E 2/1 Markov Chain
Background context: This example involves a single FCFS queue where arrivals follow a Poisson process with rate λ, and service times are Erlang-2 distributed. The mean job size is μ, split into two phases Exp(μ1) and Exp(μ2), where μ1 = μ2 = 2μ.
The state space consists of (i,j) where:
- i: Number of jobs in the queue (not serving)
- j: Phase of the job in service (1 or 2)

:p What does the state space consist of for M/E 2/1?
??x
The state space consists of pairs \((i, j)\), where \(i\) is the number of jobs queuing and \(j\) indicates which phase of service the currently serving job is in (either 1 or 2). The logic behind this structure ensures that only one job can be in service at a time, and its state depends on the phases it has to complete.
x??

---


#### M/H 2/1 Markov Chain
Background context: This example involves a single FCFS queue where arrivals follow a Poisson process with rate λ, and service times are Hyperexponentially distributed. The probability of a job having an Exp(μ1) service time is \(p\) and an Exp(μ2) service time is \(1 - p\).
The state space consists of (i,j) where:
- i: Number of jobs in the queue (not serving)
- j: Phase of the currently serving job's size (Exp(μj))

:p What should the state space look like for M/H 2/1?
??x
The state space should be \((i, j)\), where \(i\) represents the number of jobs queuing and \(j\) indicates whether the currently serving job has an Exp(μ1) or Exp(μ2) service time. This structure avoids tracking the size at arrival since it can only be determined just before service starts.
x??

---


#### E 2/M/1 Markov Chain
Background context: In this example, interarrival times are Erlang-2 distributed with a mean of \(\frac{1}{\lambda}\), and the service rate is μ. The state space should track:
- i: Total number of jobs in the system (including the one being served)
- j: Phase of the arrival process currently in progress

:p What does the state space look like for E 2/M/1?
??x
The state space consists of pairs \((i, j)\), where \(i\) is the total number of jobs including the one being served and \(j\) denotes which phase (1 or 2) of the Erlang-2 interarrival process is currently ongoing. The logic here ensures that multiple arrivals cannot be in progress simultaneously.
x??

---

---

