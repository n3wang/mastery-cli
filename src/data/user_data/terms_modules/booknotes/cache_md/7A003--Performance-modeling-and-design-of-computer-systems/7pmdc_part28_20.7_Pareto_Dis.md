# High-Quality Flashcards: 7A003--Performance-modeling-and-design-of-computer-systems_processed (Part 28)


**Starting Chapter:** 20.7 Pareto Distributions Are Everywhere

---


#### Decreasing Failure Rate (DFR) Property of Pareto Distribution
Background context: The decreasing failure rate (DFR) property of the Pareto distribution states that as more CPU has been used, the remaining lifetime of a job increases. This implies older jobs have higher expected remaining lifetimes.

:p What does the DFR property of the Pareto distribution tell us about migrating older jobs?
??x
The DFR property suggests that older jobs might still need significant computing resources in the future. Thus, migrating these old jobs can be beneficial as their long remaining lifetime can help distribute the load more evenly across the system.

```java
public class JobMigration {
    public void migrateOldJobs() {
        for (Job job : getOldestJobs()) {
            if (job.isDFRConditionMet()) { // Check based on usage and age
                migrate(job);
            }
        }
    }

    private boolean isDFRConditionMet(Job job) {
        return job.getUsageTime() > threshold && job.ageInSystem >= oldJobAgeThreshold;
    }

    private void migrate(Job job) {
        targetMachine.run(job);
        sourceMachine.removeJob(job);
    }
}
```
x??

---

#### Heavy-Tail Property of Pareto Distribution
Background context: The heavy-tail property indicates that a small fraction of very large jobs contribute significantly to the total system load. Specifically, for a Pareto distribution with α=1.1, the largest 1 percent of jobs contain about 12% of the total load.

:p What does the heavy-tail property tell us?
??x
The heavy-tail property suggests that it might be sufficient to focus on migrating or managing only the top 1 percent of very large jobs, as they contribute most of the system load. However, determining which jobs are "old enough" for migration based on their size and cost is complex due to infinite moments.

```java
public class JobManager {
    public void manageHeavyJobs() {
        List<Job> heavyJobs = getTopPercentOfLargestJobs(1);
        for (Job job : heavyJobs) {
            if (isMigrationWorthy(job)) { // Determine based on size and cost
                migrate(job);
            }
        }
    }

    private boolean isMigrationWorthy(Job job) {
        return job.getSize() > threshold && job.getCostToMigrate() < maxMigrationCost;
    }

    private void migrate(Job job) {
        targetMachine.run(job);
        sourceMachine.removeJob(job);
    }
}
```
x??

---

#### Bounded Pareto Distribution
Background context: While the standard Pareto distribution can have infinite variance, the bounded Pareto distribution has an upper limit on job size. Despite this bound, it still exhibits the heavy-tail property but with some differences in its parameters.

:p How does the bounded Pareto distribution differ from the standard Pareto distribution?
??x
The bounded Pareto distribution differs from the standard one by having a finite maximum value for job size, which affects its variance and heaviness of tails. While it still has decreasing failure rate (DFR) property, the heavy-tail is more constrained compared to an unbounded Pareto.

```java
public class BoundedParetoJobSize {
    public double getProbAboveThreshold(double threshold) {
        return 1 - Math.pow(threshold / maxLimit, alpha);
    }

    public double expectedLoad() {
        if (alpha > 2) return Double.POSITIVE_INFINITY; // Infinite variance
        else return (maxLimit * (alpha - 1)) / alpha;
    }
}
```
x??

---

#### Active Process Migration for CPU Load Balancing
Background context: Active process migration involves moving running processes to better utilize available resources. For Pareto-distributed workloads, migrating the largest jobs can significantly reduce overall system slowdown.

:p How does active process migration benefit from the heavy-tail property of Pareto distributions?
??x
Active process migration benefits by targeting only the 1 percent largest jobs for migration, as they carry most of the load. This approach minimizes the number of migrations required while effectively balancing the workload across machines.

```java
public class LoadBalancer {
    public void balanceLoad() {
        List<Job> largestJobs = getTopPercentOfLargestJobs(1);
        for (Job job : largestJobs) {
            if (shouldMigrate(job)) { // Determine based on cost and size
                migrate(job);
            }
        }
    }

    private boolean shouldMigrate(Job job) {
        return job.getSize() > threshold && job.getCostToMigrate() < maxMigrationCost;
    }

    private void migrate(Job job) {
        targetMachine.run(job);
        sourceMachine.removeJob(job);
    }
}
```
x??

---

#### Pareto Distributions in Real-World Workloads
Background context: Various real-world workloads, such as web file sizes and network flows, often follow a Pareto distribution. This property helps in understanding and optimizing system performance.

:p What are some examples of distributions following the heavy-tail property?
??x
Examples include file sizes at websites (α≈1.1), IP flow packet sizes, wireless session times, phone call durations, human wealth, forest fire damage, and earthquake occurrences. These follow a Pareto distribution with varying α values.

```java
public class ParetoExample {
    public void analyzeWorkload() {
        // Analyze file size distribution at websites
        double alpha = 1.1;
        double[] sizes = analyzeFileSizeDistribution(alpha);

        // Use DFR and other properties to optimize system performance
        for (double size : sizes) {
            if (size > threshold && isMigrationWorthy(size)) {
                migrateJob(size);
            }
        }
    }

    private boolean isMigrationWorthy(double size) {
        return size > threshold && getMigrationCost(size) < maxMigrationCost;
    }

    private void migrateJob(double size) {
        // Migrate job to better balance load
    }
}
```
x??

---


#### Simulation of M/BP/1

Background context: The problem involves simulating a single FCFS server where jobs arrive according to a Poisson process and have sizes distributed as a Bounded Pareto distribution. We will use two values of α (1.5 and 2.9) with p fixed at \(10^{10}\). The mean job size is set to be 3,000. For each value of α, we need to adjust the parameter k so that the mean remains steady.

:p What are the steps involved in setting up a simulation for M/BP/1?
??x
The steps involve:
1. Fixing \(p = 10^{10}\).
2. Setting \(k\) such that the mean job size is approximately 3,000.
3. Choosing \(\lambda\) to achieve server utilization \(\rho = 0.8\).
4. Running the simulator from an empty state for 50,000 arrivals and recording the time in queue (TQ) for arrival number 50,001.
5. Repeating this process \(n = 5,000\) times to get \(n\) samples of TQ.

```java
public class Simulation {
    private int k;
    private double lambda;
    private double rho;

    public void setupSimulation(double alpha) {
        if (alpha == 1.5) {
            k = 1000; // Adjust based on the mean requirement
        } else if (alpha == 2.9) {
            k = 1970; // Adjust based on the mean requirement
        }
        rho = 0.8;
        lambda = ...; // Calculate based on required utilization
    }

    public void runSimulation() {
        for (int i = 0; i < n; i++) {
            // Run the system from an empty state for 50,000 arrivals
            long timeInQueue = ...; // Record TQ for arrival number 50,001
            // Store or process this value as needed
        }
    }
}
```
x??

---

#### Mean Time in Queue (E[TQ])

Background context: The objective is to measure the mean time in the queue using simulations and compare it with theoretical values. For an M/G/1 queue, the formulas for \(E[TQ]\) and \(\text{Var}(TQ)\) are provided.

:p How do you compute the sample mean and variance of E[TQ]?
??x
The sample mean is computed as:
\[ SM = \frac{\sum_{i=1}^{n} X_i}{n} \]

The sample variance is calculated using the formula:
\[ SV = \frac{1}{n-1} \sum_{i=1}^{n} (X_i - SM)^2 \]

```java
public class Statistics {
    public double computeSampleMean(double[] samples) {
        double sum = 0;
        for (double sample : samples) {
            sum += sample;
        }
        return sum / samples.length;
    }

    public double computeSampleVariance(double[] samples, double mean) {
        double sumOfSquares = 0;
        for (double sample : samples) {
            sumOfSquares += Math.pow(sample - mean, 2);
        }
        return sumOfSquares / (samples.length - 1);
    }
}
```
x??

---

#### True E[TQ] and Var(TQ)

Background context: The true values of \(E[TQ]\) and \(\text{Var}(TQ)\) are computed using the provided formulas for an M/G/1 queue.

:p What is the formula to compute \(E[TQ]\)?
??x
The formula to compute \(E[TQ]\) is:
\[ E[TQ] = \frac{\rho}{1 - \rho} \cdot \frac{E[S^2]}{2E[S]} \]

Where \(S\) represents job sizes, which in this case are two instances of a Bounded Pareto distribution.

```java
public class MGMT {
    public double computeETQ(double rho, double ESSquared, double ES) {
        return (rho / (1 - rho)) * (ESSquared / (2 * ES));
    }
}
```
x??

---

#### Why Analytical Values are Higher

Background context: For the lower α case, the analytically derived values for \(E[TQ]\) and \(\text{Var}(TQ)\) might be higher than the simulated values due to differences in the tail behavior of the distributions.

:p Why are the analytical values often much higher than the simulated ones?
??x
The discrepancy arises because the actual distribution used in simulations (due to the limitations of the random number generator) may have a different tail behavior compared to the theoretical Bounded Pareto. For high \(\alpha\), the actual tail is lighter, leading to lower expected values for \(E[TQ]\).

```java
// This example does not provide specific code but explains the concept.
```
x??

---

#### Heavy-Tailed Property

Background context: We need to compute the fraction of load made up by just the top 1% of all jobs and the size cutoff defining this top 1%.

:p What are the steps for computing the fraction of load from the top 1%?
??x
The steps involve:
1. Generating a large number of job sizes according to the Bounded Pareto distribution.
2. Sorting these job sizes in descending order.
3. Summing the top 1% and dividing by the total sum of all jobs to get the fraction.

```java
public class LoadDistribution {
    public double computeTop1PercentLoad(double[] jobSizes) {
        Arrays.sort(jobSizes, Collections.reverseOrder());
        int n = (int)(jobSizes.length * 0.99);
        double top1PercentSum = 0;
        for (int i = 0; i < n; i++) {
            top1PercentSum += jobSizes[i];
        }
        return top1PercentSum / Arrays.stream(jobSizes).sum();
    }
}
```
x??

---

#### Simulating Bounded Pareto

Background context: The Bounded Pareto distribution is simulated using the Inverse-Transform method, but due to the limitations of random number generators (like rand() returning integers), the actual distribution deviates from the theoretical one.

:p Why can't we use 1,000 arrivals instead of 50,000 in each run?
??x
Using fewer arrivals would lead to significant variability and less accurate estimates of E[TQ]. The queue behavior is more sensitive with smaller job sizes, so a larger number of arrivals (e.g., 50,000) helps stabilize the results.

```java
// This example does not provide specific code but explains the concept.
```
x??

---

#### Bounded Pareto Parameters

Background context: We need to fill in the blank entries for Table 20.1 by computing \(p_{\text{Actual}}\) and using it to find \(C_2^{\text{Actual}}\) and compare it with \(C_2^{\text{Theory}}\).

:p What is the formula to compute \(p_{\text{Actual}}\)?
??x
The actual maximum value of \(u\) is \(1 - 2^{-31}\), so:
\[ p_{\text{Actual}} = \frac{(1 - 2^{-31})}{(1 / k)^{\alpha} - (1 / k)} \]

Using this, we can compute \(C_2^{\text{Actual}}\) and compare it with \(C_2^{\text{Theory}}\).

```java
public class ParetoParameters {
    public double computePActual(double pTheoretical, double alpha) {
        return (1 - Math.pow(1 / 3000.0, alpha)) / (1 - 2.0e-31);
    }
}
```
x??

---


#### Phase-Type Distributions and CTMC Modeling
Background context: In systems modeling, especially Markov chains (CTMCs), it is crucial that workloads have the memoryless property (Exponential distribution). However, many real-world scenarios do not fit this requirement. The method of phases introduces phase-type distributions as a way to approximate non-memoryless distributions using Exponentials.
:p What are phase-type distributions and why are they important?
??x
Phase-type distributions represent a wide range of distributions by mixing exponential distributions. They allow us to model systems where the workload does not have a memoryless property, such as when job sizes or interarrival times follow non-exponential distributions like Uniform.

To model these systems using CTMCs, we can use phase-type distributions to approximate the non-memoryless behavior.
x??

---

#### Squared Coefficient of Variation (SCV)
Background context: The squared coefficient of variation (SCV) is a normalized measure of variance that helps in determining how well an exponential distribution can represent a given distribution. It measures the deviation from the mean, normalized by squaring it.
:p What is SCV and why does it matter?
??x
The squared coefficient of variation (SCV) for a random variable X is given by \( C^2_X = \frac{\text{Var}(X)}{E[X]^2} \). It normalizes the variance by the square of the mean. A lower SCV indicates that the distribution is closer to an exponential, whereas a higher SCV suggests more variability.
x??

---

#### Representing Deterministic Distributions with Exponentials
Background context: For distributions with very low variability (SCV close to 0), we can approximate them using a series of Exponential phases. This technique allows us to model such deterministic or near-deterministic distributions as the sum of multiple exponential phases.
:p How can we use phase-type distributions to represent Deterministic distributions?
??x
We can represent a deterministic distribution by modeling it as the time to pass through k stages, where each stage follows an Exponential distribution with rate \(k\mu\). The total time T is then the sum of these k independent and identically distributed (i.i.d.) exponential phases.

For example, if we want to model packet transmission times in a wire, which have very little variability, we can use multiple Exp(kμ) stages to approximate this behavior. This results in an Erlang-k distribution.
x??

---

#### Method of Phases: Series of Exponential Phases
Background context: The method of phases involves breaking down a complex non-memoryless process into simpler exponential phases. Each phase is modeled as an exponential random variable, and the overall process is the sum of these phases.
:p How can we model a service time T using multiple exponential phases?
??x
We model \(T\) by passing through k stages, each requiring an Exponential distribution with rate \(k\mu\). The total time \(T = T_1 + T_2 + \ldots + T_k\) where \(T_i \sim \text{Exp}(k\mu)\).

For instance, if we denote the transmission time of a packet by \(T\), and it is close to deterministic, we can approximate \(T\) as the sum of k stages each with an Exponential distribution. This gives us an Erlang-k distribution for \(T\).
x??

---

#### Matrix-Analytic Methods
Background context: Many systems problems result in Markov chains that are too complex to solve analytically. The matrix-analytic method provides a numerical approach to solving these CTMCs, allowing us to handle more complex models.
:p Why is the matrix-analytic method important?
??x
The matrix-analytic method is crucial because it allows us to solve complex Markov chains that arise when using phase-type distributions. These chains are often too intricate for closed-form solutions but can be handled numerically.

This technique enables the modeling and analysis of systems where workloads do not follow simple exponential distributions, providing a powerful tool for practical applications.
x??

---

#### Summary
Background context: The method of phases uses phase-type distributions to approximate non-memoryless distributions. These approximations enable us to model complex systems as CTMCs, which can then be analyzed using matrix-analytic methods when exact solutions are not feasible.
:p What is the overall approach for modeling complex systems with phase-type distributions?
??x
The overall approach involves breaking down a system's workload into multiple exponential phases. Each phase represents an exponential random variable, and their sum approximates the original non-memoryless distribution. This allows us to model such systems using CTMCs, which can then be solved numerically via matrix-analytic methods.
x??

---


#### Erlang-k Distribution and Generalized Erlang (Hypoexponential) Distribution

**Background Context:**
The Erlang-k distribution is a special case of the generalized Erlang or Hypoexponential distribution. An Erlang-k random variable, \(T\), can be seen as the sum of \(k\) independent Exponential random variables each with rate \(\mu\). The generalized Hypoexponential distribution allows for different rates among the Exponential components.

**Relevant Formulas:**
- Expected value (E\[T]\): 
  \[
  E[T] = k \cdot \frac{1}{\mu}
  \]
  
- Variance (\(\text{Var}(T)\)):
  \[
  \text{Var}(T) = k \cdot \left( \frac{1}{\mu} \right)^2
  \]

- Coefficient of variation squared \(C_2^T\):
  \[
  C_2^T = \frac{\text{Var}(T)}{(E[T])^2} = \frac{k \cdot \left( \frac{1}{\mu} \right)^2}{\left(k \cdot \frac{1}{\mu}\right)^2} = \frac{1}{k}
  \]

:p What is the expected value \(E[T]\) of an Erlang-k distribution?
??x
The expected value (mean) of an Erlang-k distribution with rate \(\mu\) and shape parameter \(k\) is:
\[
E[T] = k \cdot \frac{1}{\mu}
\]

This formula reflects that the sum of \(k\) Exponential random variables, each with mean \(\frac{1}{\mu}\), will have an overall mean equal to \(k\) times this value.

:p What is the coefficient of variation squared \(C_2^T\) for an Erlang-k distribution?
??x
The coefficient of variation squared (\(C_2^T\)) for an Erlang-k distribution with rate \(\mu\) and shape parameter \(k\) is:
\[
C_2^T = \frac{1}{k}
\]

This value decreases as \(k\) increases, indicating that the distribution becomes less variable.

---
#### Task Convergence to Deterministic Distribution

**Background Context:**
As the number of Exponential phases (stages) approaches infinity in an Erlang-k distribution, the behavior of the random variable \(T\) converges to a deterministic value. This is because the sum of more and more Exponential random variables with small variances will tend towards a constant.

:p What happens as \(k \to \infty\) for the coefficient of variation squared \(C_2^T\), and what does this imply?
??x
As \(k \to \infty\), the coefficient of variation squared (\(C_2^T\)) approaches 0, implying that:
\[
C_2^T \to 0
\]

This means that with an infinite number of Exponential phases (or stages) in series, the distribution converges to a Deterministic distribution. The random variable \(T\) will essentially become a constant equal to \(\frac{1}{\mu}\), where \(\mu\) is the rate parameter.

:p How can we construct a distribution with \(C_2 > 1\) using Exponential stages?
??x
By putting Exponential stages in parallel, instead of series, we can construct a Hyperexponential distribution that has higher variability. Specifically:
\[
T \sim \begin{cases}
\text{Exp}(\mu_1) & \text{with probability } p \\
\text{Exp}(\mu_2) & \text{with probability } 1-p
\end{cases}
\]

This allows for two different Exponential phases, each with its own rate. The key idea is that the parallel structure introduces more variability compared to a series structure.

:p What is \(E[T]\) in the case of a Degenerate Hyperexponential distribution?
??x
In the degenerate case where one phase is identically zero:
\[
T \sim \begin{cases}
\text{Exp}(p \mu) & \text{with probability } p \\
0 & \text{with probability } 1-p
\end{cases}
\]

The expected value \(E[T]\) can be calculated as follows:
\[
E[T] = (1 - p) \cdot E[0] + p \cdot E[\text{Exp}(p \mu)]
\]
Since \(E[0] = 0\) and \(E[\text{Exp}(p \mu)] = \frac{1}{p \mu}\), we get:
\[
E[T] = p \cdot \frac{1}{p \mu} = \frac{1}{\mu}
\]

Thus, the expected value of the degenerate Hyperexponential distribution is \(E[T] = \frac{1}{\mu}\).

---
#### Hyperexponential Distribution

**Background Context:**
The Hyperexponential distribution models a random variable that can take on different Exponential distributions with certain probabilities. This distribution is useful for approximating high variability in data, especially when the coefficient of variation squared \(C_2 > 1\).

:p What is the definition of a two-phase Hyperexponential distribution (H2)?
??x
A two-phase Hyperexponential distribution (H2) is defined as:
\[
T \sim \begin{cases}
\text{Exp}(\mu_1) & \text{with probability } p \\
\text{Exp}(\mu_2) & \text{with probability } 1-p
\end{cases}
\]

Here, \(T\) can either follow an Exponential distribution with rate \(\mu_1\) or another one with rate \(\mu_2\), each with their respective probabilities.

:p How does the Hyperexponential distribution handle high variability?
??x
The Hyperexponential distribution handles high variability by using a parallel structure rather than series. This allows for multiple paths, each following an Exponential distribution with different rates. The overall variability increases as more phases are added in parallel, making it suitable for approximating distributions where the coefficient of variation squared \(C_2 > 1\).

:p What is the relationship between Hyperexponential and Erlang-k distributions when \(k \to \infty\)?
??x
As \(k \to \infty\) (meaning an infinite number of Exponential phases in parallel), the Hyperexponential distribution can approach a more deterministic behavior. However, this does not mean that all variability is eliminated; instead, it becomes a mixture of many small variabilities, leading to a high coefficient of variation squared (\(C_2 > 1\)).

:p What are the three parameters of the Hyperexponential distribution?
??x
The Hyperexponential distribution has three key parameters:
- \(\mu_1\) and \(\mu_2\): The rates of the two Exponential distributions.
- \(p\): The probability with which the first phase (rate \(\mu_1\)) occurs.

These parameters allow for flexibility in matching different mean and coefficient of variation squared values.

