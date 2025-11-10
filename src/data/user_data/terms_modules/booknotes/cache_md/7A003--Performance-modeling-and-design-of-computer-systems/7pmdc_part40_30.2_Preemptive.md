# High-Quality Flashcards: 7A003--Performance-modeling-and-design-of-computer-systems_processed (Part 40)


**Starting Chapter:** 30.2 Preemptive-LCFS

---


#### Expressing (30.3) as a Summation
Background context: The expression (30.3) is being converted into a summation form to simplify its analysis, particularly for the M/G/1/FCFS queue.

:p How can we express (30.3) as a sum?
??x
We can express (30.3) as:
\[
/tildewiderTQFCFS(s)=( 1−ρ)∞/\sum_{k=0}/parenleftBig \frac{ρ}{/tildewiderSe(s)}/parenrightBig^k =∞/\sum_{k=0}(1−ρ)\left(\frac{ρ}{/tildewiderSe(s)}\right)^k.
\]
This transformation helps in understanding the delay transform more clearly and facilitates further analysis.

---
#### Meaning of /parenleftBig /tildewiderSe(s)/parenrightBigk
Background context: The term \(\left(\frac{\tilde{S}_e(s)}{ρ}\right)^k\) represents the Laplace transform of the sum of \(k\) i.i.d. instances of \(\tilde{S}_e\), where \(\tilde{S}_e(s)\) is the Laplace transform of the service time.

:p What does /parenleftBig /tildewiderSe(s)/parenrightBigk represent?
??x
The term \(\left(\frac{\tilde{S}_e(s)}{ρ}\right)^k\) represents the Laplace transform of the sum of \(k\) i.i.d. instances of \(\tilde{S}_e\). Here, \(\tilde{S}_e(s)\) is the Laplace transform of a single service time in an M/G/1 queue.

---
#### Deriving /tildewiderTQFCFS(s)
Background context: The delay transform for the M/G/1/FCFS system can be derived using the concept of stationary work and Poisson arrivals. This involves understanding that the expected work content is equal to the expected delay experienced by a Poisson arrival.

:p How do we derive /tildewiderTQFCFS(s)?
??x
The derivation starts by noting that \(W_{\text{FCFS}}\) (the stationary work in an M/G/1/FCFS system) equals the expected delay of a Poisson arrival under FCFS. This is equivalent to the expected work content \(\tilde{W}_{\text{PS}}(s)\) in an M/G/1/PS system, since both are work-conserving.

Thus:
\[
\tildewider{TQFCFS(s)} = \tildewider{W_{\text{FCFS}}(s)} = \tildewider{W_{\text{PS}}(s)} = \sum_{k=0}^{\infty} \tildewider{W_{\text{PS}}(s|\text{arrival sees } k \text{ jobs})} \cdot P(\text{arrival sees } k \text{ jobs})
\]
\[
= \sum_{k=0}^{\infty} \left(\frac{\tilde{S}_e(s)}{\rho}\right)^k \cdot (\rho (1-\rho))^k
\]

---
#### Preemptive-LCFS Policy Description
Background context: The Preemptive-LCFS policy is a scheduling algorithm where an arriving job immediately preempts the currently running job, resuming its service only after all subsequent jobs are completed.

:p What is the Preemptive-LCFS (PLCFS) policy?
??x
The Preemptive-LCFS policy works as follows: whenever a new arrival enters the system, it preemptively interrupts the currently running job. The preempted job resumes service only when all jobs arriving after its interruption are completed.

---
#### Performance of LCFS Policy Recap
Background context: The non-preemptive LCFS (Last-Come-First-Served) policy was discussed earlier and found to have poor performance, especially with highly variable job sizes, performing identically to FCFS in many scenarios.

:p What is the performance of the (non-preemptive) LCFS policy?
??x
The non-preemptive LCFS policy had identical performance to FCFS, making it unsuitable for systems where job size variability is high. This poor performance stems from its tendency to delay smaller jobs behind larger ones, leading to suboptimal use of resources.

---
#### Theorem 30.6 - Preemptive-LCFS Performance
Background context: A theorem is presented that describes the expected completion time and slowdown for jobs in a Preemptive-LCFS (PLCFS) system. This theorem states that both measures are equal to \(\frac{x}{1-\rho}\), where \(x\) is the job size and \(\rho\) is the utilization factor.

:p What does Theorem 30.6 state about PLCFS performance?
??x
Theorem 30.6 asserts that for a Preemptive-LCFS system, the expected completion time \(E[T(x)]_{\text{PLCFS}} = \frac{x}{1-\rho}\) and the expected slowdown \(E[\text{Slowdown}(x)]_{\text{PLCFS}} = \frac{1}{1-\rho}\).

---
#### Key Observation for PLCFS
Background context: An important observation in analyzing Preemptive-LCFS is that once a job is interrupted, it will not resume service until all jobs arriving after its interruption are completed. This behavior affects the total time a job spends waiting or executing.

:p What key observation supports the analysis of PLCFS?
??x
A critical observation for PLCFS is that an interrupted job will only get back the processor when all subsequent jobs complete, which implies that the delay until resumption is equivalent to the length of a busy period in an M/G/1 queue. Thus, the expected time until the job gets back the processor is given by:
\[
E[\text{Time until job gets back processor}] = E[\text{Length of busy period}] = \frac{E[S]}{1-\rho},
\]
where \(S\) represents the service time.

---
#### Deriving Expected Time in PLCFS
Background context: To derive the expected completion time for a tagged job under Preemptive-LCFS, we leverage the fact that once interrupted, the job waits until all subsequent jobs are completed. This is analogous to the busy period length in an M/G/1 queue.

:p How do we calculate the expected time a job spends waiting or executing under PLCFS?
??x
The expected completion time for a tagged job \(E[T(x)]_{\text{PLCFS}}\) can be derived as follows:

Since the job will not resume until all subsequent jobs are completed, this is equivalent to the length of a busy period in an M/G/1 queue. The mean length of such a busy period is given by:
\[
E[\text{Time until job gets back processor}] = E[\text{Length of busy period}] = \frac{E[S]}{1-\rho}.
\]

This result holds because the service order does not affect the mean length of the busy period in an M/G/1 system, as long as it is work-conserving.


#### PLCFS vs PS
Background context explaining the difference between PLCFS and PS. The key point is that both policies have the same expected performance but PLCFS has fewer preemptions, leading to less wasted time.
:p What is E[Slowdown (x)] for both PLCFS and PS?
??x
For both PLCFS and PS, the mean slowdown \( E[\text{Slowdown}(x)] = \frac{1}{1 - \rho} \). This means that regardless of the job size, the average time a job spends in the system is the same under these two policies. The performance metrics are identical despite the different mechanisms for handling preemptions.
x??

---

#### PLCFS Preemption Count
Background context explaining how many preemptions occur per job under PLCFS and PS. PLCFS has fewer preemptions compared to PS due to its simpler mechanism of preemption on arrival and departure only.
:p How many preemptions does each job experience in PLCFS?
??x
Each job experiences exactly 2 preemptions in PLCFS: one when it arrives and another when it departs. This is significantly fewer than the multiple preemptions that can occur per job under PS, especially with small quantum sizes.
x??

---

#### FB Scheduling Overview
Background context explaining the need for a scheduling policy that gives preference to smaller jobs based on age. The goal is to achieve lower slowdowns for smaller jobs and potentially reduce the mean slowdown overall.
:p Why is it nice if we could somehow get lower slowdowns for the smaller jobs?
??x
It would allow us to drop our mean slowdown while maintaining good performance for smaller jobs, which are often more critical or time-sensitive. By giving preference to younger jobs (those with less remaining CPU demand), we can ensure that shorter jobs complete faster and do not have to wait as long for service.
x??

---

#### FB Scheduling Algorithm
Background context explaining the Generalized Foreground-Background (FB) scheduling algorithm, which uses job age to prioritize smaller jobs. The key idea is that younger jobs (those with less remaining CPU demand) are given more attention.
:p What is the rule for allocating CPU under FB?
??x
The CPU is allocated to the job with the lowest CPU age. If multiple jobs have the same lowest CPU age, they share the CPU using PS. This ensures that smaller jobs, which tend to be younger and thus have less remaining demand, are prioritized.
x??

---

#### Example of FB Scheduling
Background context explaining how the state of the system changes over time under FB scheduling with a given arrival sequence.
:p What is the completion time for each job in the given example?
??x
- The size 1 job leaves at time 3.
- The size 2 job leaves at time 5.
- The size 3 job leaves at time 6.

This can be visualized as follows:

```plaintext
time:   0  1  2  3  4  5  6
size:    3  2  1

Completion times:
Size 1: 3 (leaves)
Size 2: 5 (leaves)
Size 3: 6 (leaves)
```
x??

---

#### Mathematical Exercise for FB Scheduling
Background context explaining the transformation of job sizes in the derivation of \( E[T(x)] \) under FB scheduling. The goal is to compute the expected remaining work by transforming job sizes.
:p What is the formula for \( E[S_x] \)?
??x
The expected size \( E[S_x] \) under the transformed distribution is given by:
\[ E[S_x] = \int_0^x y f(y) dy + x (1 - F(x)) \]
where \( F(x) \) is the cumulative distribution function of job sizes, and \( f(y) \) is the probability density function.
x??

---

#### Expression for Expected Remaining Work
Background context explaining how to compute the expected remaining work under FB scheduling by considering both initial state and new arrivals during processing.
:p How do you derive \( E[T(x)] \) in FB scheduling?
??x
The derivation of \( E[T(x)] \) involves summing up:
1. The size of job \( x \).
2. The expected remaining work when job \( x \) arrives, considering jobs as having a service requirement no more than \( x \).
3. The expected work due to new arrivals while job \( x \) is in the system.

The formula for \( E[T(x)] \) under FB scheduling is:
\[ E[T(x)]_{\text{FB}} = x + \frac{\lambda E[S^2_x]}{2(1 - \rho_x)} + \lambda E[T(x)]_{\text{FB}} E[S_x] \]

Simplifying, we get:
\[ E[T(x)]_{\text{FB}} (1 - \rho_x) = x + \frac{\lambda E[S^2_x]}{2(1 - \rho_x)} \]
x??

---


#### FB Scheduling and Exponential Workloads
Background context explaining the concept. The problem states that for an M/G/1 server with an Exponential job size distribution, both Foreground-Background (FB) and Processor-Sharing (PS) have equal mean response times under certain conditions.

:p Why would the slowdown under FB be strictly smaller than under PS, even though their mean response times are equal?
??x
The answer is that FB scheduling gives a slight preference to shorter jobs. Even with an Exponential job size distribution, which means age and remaining time are independent, biasing towards younger (smaller age) jobs still provides some advantage in expected original size. This subtle preference for short jobs under FB improves the E[Slowdown] compared to PS.

```java
// Pseudocode example to illustrate the idea:
public class JobScheduler {
    public double calculateExpectedResponseTime(double load, DistributionType jobSizeDistribution) {
        if (jobSizeDistribution == Exponential) {
            return (load / 1 - load); // Mean response time for both FB and PS with Exponential distribution
        } else {
            // Other calculations for different distributions
        }
    }

    public double calculateExpectedSlowdown(double load, DistributionType jobSizeDistribution) {
        if (jobSizeDistribution == Exponential) {
            return (load / 1 - load); // Slowdown is the same as response time in this scenario
        } else {
            // Other calculations for different distributions
        }
    }
}
```
x??

---

#### FB vs. PS under Exponential Workloads
The problem suggests that for an M/G/1 server with an Exponential job size distribution, both Foreground-Background (FB) and Processor-Sharing (PS) have the same mean response time.

:p How can we prove formally that the mean response times under FB and PS are equal when the job size distribution is Exponential?
??x
To prove this, consider the properties of the Exponential distribution. For an Exponential distribution, the remaining service time is independent of age (i.e., jobs of all ages have the same expected remaining service time). Therefore, biasing towards younger jobs does not provide a significant advantage in terms of reducing the mean response time.

The key insight is that both FB and PS will essentially handle jobs in a way that their expected remaining service times are equal due to the independence property of Exponential distribution. This leads to the equality of mean response times under both policies when the job size distribution is Exponential.

```java
// Pseudocode for proving the equality:
public class ResponseTimeAnalysis {
    public double getMeanResponseTimeExponential(double lambda, double mu) {
        return 1 / (mu - lambda); // Mean response time for M/M/1 queue with Exponential distribution
    }

    public void proveEquality() {
        double load = 0.8;
        double serviceRate = 3; // Example values, assume these are the same for FB and PS

        // Calculate mean response times:
        double meanResponseTimeFB = getMeanResponseTimeExponential(load * serviceRate, serviceRate);
        double meanResponseTimePS = getMeanResponseTimeExponential(load * serviceRate, serviceRate);

        System.out.println("E[T]FB: " + meanResponseTimeFB);
        System.out.println("E[T]PS: " + meanResponseTimePS);
    }
}
```
x??

---

#### Starvation under FB Scheduling
The problem considers an M/G/1 server with load ρ=0.8 and different job size distributions, comparing the mean slowdown of large jobs between Foreground-Background (FB) and Processor-Sharing (PS).

:p What is the first percentile where a job does worse under FB than under PS?
??x
The answer involves analyzing the relative performance of small and large jobs under both policies. Since FB favors smaller jobs, it can lead to larger jobs experiencing higher slowdowns compared to PS. The specific percentile can be determined by comparing the expected slowdown for jobs in different percentiles.

```java
// Pseudocode example:
public class JobPerformanceAnalysis {
    public double calculateExpectedSlowdown(double load, DistributionType jobSizeDistribution, int percentile) {
        // Implementation based on the given distributions and policies
        if (load == 0.8 && jobSizeDistribution == Exponential) {
            return (load / 1 - load); // Example calculation for mean slowdown
        }
        return -1; // Placeholder value
    }

    public int findPercentileWhereFBWorseThanPS() {
        double[] percentiles = {90, 95, 99};
        for (int p : percentiles) {
            double slowdownFB = calculateExpectedSlowdown(0.8, Exponential, p);
            double slowdownPS = calculateExpectedSlowdown(0.8, Exponential, p);

            if (slowdownFB > slowdownPS) {
                return p;
            }
        }
        return -1; // No such percentile found
    }
}
```
x??

---

#### PLCFS Analysis
The problem develops a clearer understanding of Preemptive-Less-Attained-Service (PLCFS) by determining the Laplace transform for time in system and then using it to determine the first 2 moments of response time.

:p What is the Laplace transform for time in system under PLCFS?
??x
The Laplace transform for time in system under PLCFS, \(\tilde{T}(s)\), can be determined by considering the response time of a job and how many times it gets interrupted. This involves breaking down the problem into simpler components: first finding the response time \(T(x)\) for jobs of size \(x\), then determining the number of interruptions and their contribution.

```java
// Pseudocode example:
public class PLCFSAnalysis {
    public double getLaplaceTransformPLCFS(double s, double arrivalRate, double serviceRate) {
        // Example calculation based on the given parameters
        return 1 / (s * (1 - (arrivalRate / serviceRate))); // Simplified Laplace transform for M/M/1 queue
    }

    public void calculateFirstTwoMoments() {
        double s = 0.5; // Example value
        double arrivalRate = 2;
        double serviceRate = 3;

        double laplaceTransform = getLaplaceTransformPLCFS(s, arrivalRate, serviceRate);
        System.out.println("Laplace Transform: " + laplaceTransform);

        // Using the transform to find first two moments (mean and variance)
    }
}
```
x??

---

#### M/G/1/FB Response Time
The chapter derived the mean response time for FB. The problem asks to derive the transform of response time using similar arguments.

:p How can we derive the transform of response time under M/G/1/FB?
??x
To derive the transform of response time under M/G/1/FB, follow a similar approach as used in deriving the mean response time for FCFS and PS. The key is to consider the time a job spends in the system and how this is affected by the service interruptions and arrivals.

```java
// Pseudocode example:
public class FBResponseTime {
    public double getTransformFB(double s, double arrivalRate, DistributionType jobSizeDistribution) {
        // Implementation based on the given distributions and policies
        if (jobSizeDistribution == Exponential) {
            return 1 / (s * (1 - (arrivalRate / (3000)))); // Example calculation for M/G/1/FB with Exponential distribution
        }
        return -1; // Placeholder value
    }

    public void deriveTransform() {
        double s = 0.5; // Example value
        double arrivalRate = 2;
        DistributionType jobSizeDistribution = Exponential;

        double transformFB = getTransformFB(s, arrivalRate, jobSizeDistribution);
        System.out.println("Transform: " + transformFB);
    }
}
```
x??

---

#### M/M/1/PS with Load-Dependent Service Rate
The problem models a database system as an M/M/1/PS queue with load-dependent service rate and asks for the intuition behind increasing the MPL.

:p What is the intuition behind Varun's suggestion to increase the MPL?
??x
Varun suggests increasing the MPL when the job size distribution is highly variable because this can help balance the system. Even though a higher MPL reduces the overall service rate, it allows the system to better handle jobs of varying sizes. This can reduce the variability in response times and improve overall performance.

```java
// Pseudocode example:
public class DatabaseSystem {
    public void analyzeMPLImpact(double jobSizeVariability) {
        if (jobSizeVariability > 10) { // Example threshold for high variability
            System.out.println("Increase MPL to more than 4");
        } else {
            System.out.println("Keep current MPL settings");
        }
    }

    public void simulateSystem() {
        double jobSizeVariability = 20; // Example value indicating high variability

        analyzeMPLImpact(jobSizeVariability);
    }
}
```
x??

---

#### Limited Processor-Sharing System
The problem provides references for analyzing the limited Processor-Sharing system in Figure 3.6.

:p What is the intuition behind Bianca's FCFS/PS architecture?
??x
Bianca’s FCFS/PS architecture combines elements of both First-Come-First-Served (FCFS) and Processor-Sharing (PS). It helps balance between fairness and efficiency by using FCFS for initial job handling and PS to manage service rates. This hybrid approach can provide better performance in systems with highly variable job sizes.

```java
// Pseudocode example:
public class HybridSystem {
    public void analyzeHybridPerformance(double jobSizeVariability) {
        if (jobSizeVariability > 10) { // Example threshold for high variability
            System.out.println("Use FCFS/PS hybrid approach");
        } else {
            System.out.println("Use pure PS or FCFS depending on the scenario")
        }
    }

    public void simulateSystem() {
        double jobSizeVariability = 20; // Example value indicating high variability

        analyzeHybridPerformance(jobSizeVariability);
    }
}
```
x??

