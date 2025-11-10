# High-Quality Flashcards: 7A003--Performance-modeling-and-design-of-computer-systems_processed (Part 45)


**Starting Chapter:** 29.2 Readings. Chapter 30 Preemptive Non-Size-Based Policies

---


#### LCFS Mean Queueing Time Derivation

**Background Context:** The provided text discusses the Little's Law-based derivation of the mean queueing time under Last-Come-First-Served (LCFS) scheduling. This is relevant for understanding how different scheduling policies affect queue behavior in queuing systems.

To derive \( E[T_Q] \) under LCFS, we condition on whether an arrival finds the system idle or busy:

1. If the system is idle: The waiting time of a job is 0.
2. If the system is busy: The waiting time includes both the service time and the total waiting time before the current job.

**Relevant Formulas:**

\[ E[T_Q] = (1 - \rho) + \frac{\rho}{\lambda} \cdot E[S] \]

Where:
- \( 1 - \rho \): Probability that the system is idle.
- \( \rho \): Utilization factor, i.e., traffic intensity.
- \( \lambda \): Arrival rate.
- \( E[S] \): Expected service time.

:p How do we derive the mean queueing time under LCFS without using transforms?
??x
To derive the mean queueing time under LCFS, we consider two scenarios based on whether an arrival finds the system idle or busy:

1. If the system is idle (\( (1 - \rho) \)): The waiting time for a job is 0.
2. If the system is busy (\( \rho \)): The waiting time includes both the service time of the current job and the average waiting time before it, which can be expressed as \( E[S] + \frac{\lambda}{\mu} \cdot E[T_Q] \).

Combining these gives:
\[ E[T_Q] = (1 - \rho) + \rho \left( E[S] + \frac{1}{\mu} \cdot E[T_Q] \right) \]

Simplifying this, we get:
\[ E[T_Q] = (1 - \rho) + \frac{\rho}{\lambda} \cdot E[S] \]
x??

#### Comparison of Mean Waiting Times between LCFS and FCFS

**Background Context:** The text compares the mean waiting times for Last-Come-First-Served (LCFS) and First-Come-First-Served (FCFS) scheduling policies under different conditions. It highlights that while both policies have the same mean waiting time, their variances differ based on system utilization.

For LCFS:
\[ E[T_Q^2] = \frac{\lambda E[S^3]}{3(1 - \rho)^2} + \left(\frac{\lambda E[S^2]}{2(1 - \rho)}\right)^2 \]

For FCFS:
\[ E[T_Q^2]_{FCFS} = \frac{\lambda E[S^3]}{3(1 - \rho)} + \left(\frac{\lambda E[S^2]}{2(1 - \rho)^2}\right) \]

It's noted that the second moment of waiting time for LCFS is higher than FCFS under high loads.

:p How do mean waiting times compare between LCFS and FCFS?
??x
The mean waiting times for both LCFS and FCFS are the same, but their variances differ significantly. Specifically:
- For LCFS: 
  \[ E[T_Q^2] = \frac{\lambda E[S^3]}{3(1 - \rho)^2} + \left(\frac{\lambda E[S^2]}{2(1 - \rho)}\right)^2 \]

- For FCFS:
  \[ E[T_Q^2]_{FCFS} = \frac{\lambda E[S^3]}{3(1 - \rho)} + \left(\frac{\lambda E[S^2]}{2(1 - \rho)^2}\right) \]

Under high loads (high \( \rho \)), the second moment of waiting time for LCFS is much higher than that of FCFS.
x??

#### M/G/1 Queue Scheduling Policies

**Background Context:** The text discusses scheduling policies in an M/G/1 queue setting. It mentions that FCFS, LCFS, and RANDOM policies have the same distribution of the number of jobs in the system.

**Relevant Formulas:**

For any policy \( P \) in an M/G/1 queue:
\[ E[N_P] = \frac{\lambda}{\mu - \lambda} + 1 \]

Where:
- \( N_P \): Number of jobs in the system under scheduling policy \( P \).
- \( \lambda \): Arrival rate.
- \( \mu \): Service rate.

:p How do FCFS, LCFS, and RANDOM policies compare with respect to mean slowdown for an M/G/1 queue?
??x
FCFS, LCFS, and RANDOM policies all have the same distribution of the number of jobs in the system for an M/G/1 queue. However, their mean slowdown (which is a measure of performance) can differ:

- Mean slowdown \( S \) is defined as the ratio of total service time to the number of jobs.

For FCFS and LCFS:
\[ E[S] = E[N] \cdot E[S_j] \]

Where:
- \( E[N] \): Expected number of jobs in the system.
- \( E[S_j] \): Expected service time for a job.

Since the distribution of \( N \) is the same, their mean slowdowns are also the same. However, LCFS can have higher variance in waiting times under high load conditions compared to FCFS as noted earlier.

RANDOM policy:
For RANDOM scheduling, the number of jobs and their service times follow a different pattern but still have the same expected value for \( N \).

Thus, while all policies have the same mean number of jobs, their performance metrics like variance can differ.
x??

---

---


---
#### Motivation Behind Processor-Sharing (PS)
Background context explaining why PS is introduced. It addresses the issue of high job size variability, which can lead to long delays and high mean slowdown for short jobs under non-preemptive policies.

:p Why are short jobs not affected by long ones under PS?
??x
Under PS, when a short job arrives, it immediately time-shares with all the jobs in the system. It does not have to wait for long jobs to finish because of its immediate access to CPU resources. This ensures that short jobs can complete quickly, regardless of the size or presence of longer jobs.
x??

---


#### Processor-Sharing (PS) - Quantum Size
Explanation on how a quantum size approaching zero leads to the PS abstraction in CPU scheduling.

:p Why is PS achieved when the quantum size goes to zero?
??x
When the quantum size approaches zero, each job gets an infinitesimally small slice of CPU time. This results in continuous sharing of the CPU among all jobs, leading to the Processor-Sharing (PS) model. In this model, short jobs can get immediate service and complete quickly without waiting for long jobs.
x??

---


#### Comparison Between PS and FCFS
Explanation on when PS might perform worse than FCFS.

:p Can you provide an example where PS is worse than FCFS in terms of both \( E[T] \) and \( E[Slowdown] \)?
??x
Consider two jobs, both arriving at time 0, and both having size 1:
- For FCFS: 
  - \( E[T_{FCFS}] = 1.5 \)
  - \( E[Slowdown_{FCFS}] = 1.5 \)

- For PS: 
  - \( E[T_{PS}] = 2 \)
  - \( E[Slowdown_{PS}] = 2 \)

In this case, both the expected response time and slowdown are higher for PS compared to FCFS.
x??

---


#### M/G/1/PS vs. M/G/1/FCFS
Explanation on whether M/G/1/PS outperforms M/G/1/FCFS in a stochastic setting.

:p Can we say that M/G/1/PS always outperforms M/G/1/FCFS with respect to expected response time in a stochastic setting?
??x
No, PS does not always outperform FCFS. While it can be more efficient for certain job arrival sequences and job sizes, there are scenarios where the performance of M/G/1/PS is worse than that of M/G/1/FCFS. The effectiveness depends on the specific characteristics of the job arrivals and system dynamics.
x??

---

---


#### Distribution of Jobs' Ages in M/G/1/PS System
Background context: The age of a job is defined as the total service it has received so far. In an M/G/1/PS system, jobs are worked on simultaneously under preemptive sharing policy (PS). This means that when a new job arrives, all jobs currently being served are "interrupted" and receive some additional service time before returning to their original PS mode.

The age distribution of jobs in the M/G/1/PS system is different from an M/M/1/FCFS system. In FCFS, the jobs' ages are straightforward: new arrivals see all jobs with age 0 (jobs that have just arrived) and the job currently being served has an age distributed according to the equilibrium distribution.

:p What can be inferred about the ages of jobs in the M/G/1/PS system upon arrival?
??x
In the M/G/1/PS system, upon arrival, a new job sees all jobs with i.i.d. (independent and identically distributed) ages that are distributed according to the equilibrium distribution. This is due to the preemptive sharing nature of PS where every job gets some service time regardless of its original size.

```java
// Pseudocode for simulating an arrival in M/G/1/PS system
public void simulateArrival() {
    // Get all jobs' current ages from the system state
    List<Double> currentAges = getSystemState().getJobsCurrentAges();
    
    // All new arrivals see these i.i.d. ages
    System.out.println("New arrival sees: " + currentAges);
}
```
x??

---


#### Mean Response Time in M/G/1/PS and M/M/1/FCFS Systems
Background context: The mean response time (MRT) for both the M/G/1/PS and M/M/1/FCFS systems can be compared. For an M/M/1/FCFS system, the mean response time is given by \( \frac{1}{\lambda(1-\rho)} \), where \( \lambda \) is the arrival rate and \( \rho = \frac{\lambda}{\mu} \) (utilization factor). In an M/G/1/PS system, the mean response time can be derived similarly but with a different formula.

:p How do the mean response times of M/G/1/PS and M/M/1/FCFS systems compare?
??x
The mean response times for both M/G/1/PS and M/M/1/FCFS are equivalent when considering steady-state conditions. Specifically, in an M/G/1/PS system, the mean response time is given by \( \frac{x}{1-\rho} \), where \( x \) is the job size and \( \rho = \frac{\lambda}{\mu} \). For both systems, this simplifies to a common expression under steady-state conditions.

```java
// Pseudocode for calculating mean response time in M/G/1/PS system
public double calculateMeanResponseTime(double x, double rho) {
    return x / (1 - rho);
}
```
x??

---


#### Definition of Job Size and Arrival Process
Background context: In queueing theory, the size of a job is a critical parameter. For an M/G/1/PS system, jobs arrive according to a Poisson process with rate \( \lambda \). The sizes of these jobs are assumed to be independent and identically distributed (i.i.d.) random variables with probability density function (pdf) \( f(s) \).

The arrival process can be mathematically described as:
\[ P(\text{arrival in } [t, t+dt]) = \lambda dt + o(dt) \]
where \( o(dt) \) represents higher-order terms that are negligible for small \( dt \). The job sizes follow a distribution with cumulative density function (CDF) \( F(s) \).

:p What is the mathematical description of the arrival process in an M/G/1/PS system?
??x
The arrival process in an M/G/1/PS system follows a Poisson distribution. Specifically, the probability of an arrival in any small interval \([t, t+dt]\) can be described by:
\[ P(\text{arrival in } [t, t+dt]) = \lambda dt + o(dt) \]
where \( \lambda \) is the rate parameter and \( o(dt) \) represents higher-order terms that are negligible for small \( dt \). This implies that the inter-arrival times follow an exponential distribution with mean \( \frac{1}{\lambda} \).

```java
// Pseudocode for simulating a Poisson arrival process
public void simulatePoissonArrival(double lambda, double timeStep) {
    // Generate random numbers from an exponential distribution to model inter-arrival times
    Random rand = new Random();
    double nextArrivalTime = -Math.log(1.0 - rand.nextDouble()) / lambda;
    
    while (nextArrivalTime <= timeStep) {
        System.out.println("Next arrival at: " + nextArrivalTime);
        nextArrivalTime += -Math.log(1.0 - rand.nextDouble()) / lambda;
    }
}
```
x??

---


#### Inspection Paradox and Job Ages in M/G/1/PS
Background context: In the M/G/1/PS system, due to preemptive sharing, an arriving job observes all jobs with i.i.d. ages that follow the equilibrium distribution. This is a consequence of the inspection paradox, which states that when observing a random sample from a population, it appears more common for larger elements to be observed.

The age distribution can be described by:
\[ f_e(x) = F(x) \frac{E[S]}{1 - \rho} \]
where \( F(x) \) is the CDF of job sizes and \( E[S] \) is the expected job size.

:p What does the inspection paradox imply for an arriving job in M/G/1/PS?
??x
The inspection paradox implies that an arriving job in a preemptive sharing (PS) system will see all jobs with i.i.d. ages distributed according to the equilibrium distribution, regardless of their actual ages at the time of arrival. This is because each job gets some service time simultaneously, and thus, upon arrival, every job has been through this "inspection" process.

```java
// Pseudocode for simulating the inspection paradox in M/G/1/PS
public void simulateInspectionParadox(double rho) {
    // Generate a random age from the equilibrium distribution
    double equilibriumAge = getEquilibriumAgeDistribution().generateRandomSample();
    
    System.out.println("An arriving job sees all jobs with i.i.d. ages: " + equilibriumAge);
}
```
x??

---


#### Response Time in M/G/1/PS System
Background context: The response time \( T(x) \) for a job of size \( x \) in an M/G/1/PS system is defined as the total time from arrival to completion. It has been shown that every job in this system experiences the same expected slowdown, which can be calculated using Little's Law.

The mean response time for a job of size \( x \) is given by:
\[ E[T(x)] = \frac{x}{1 - \rho} \]
where \( \rho = \frac{\lambda}{\mu} \).

:p What is the formula for the expected slowdown in an M/G/1/PS system?
??x
The expected slowdown (response time) for a job of size \( x \) in an M/G/1/PS system is given by:
\[ E[T(x)] = \frac{x}{1 - \rho} \]
where \( \rho \) is the utilization factor, defined as \( \rho = \frac{\lambda}{\mu} \).

```java
// Pseudocode for calculating expected response time in M/G/1/PS system
public double calculateExpectedResponseTime(double x, double rho) {
    return x / (1 - rho);
}
```
x??

---

---


#### Expected Number of Jobs in System with Size Between x and x+h

Background context: The question is about expressing the expected number of jobs in the system with original size between \(x\) and \(x + h\). It mentions that we are dealing with "original size" \(x\), not "remaining service requirement" \(x\). We need to use a probability density function (pdf) for job sizes arriving at the system, which may differ from the pdf of job sizes in the system due to preemptive scheduling.

:p Can we express the expected number of jobs in the system with size between \(x\) and \(x + h\) as \(E[N] f(x) h + o(h)\)?
??x
No. Although original job sizes are drawn from a distribution density \(f(·)\), the sizes of those jobs in the system have a different pdf, possibly not equal to \(f(·)\), because preemptive scheduling (PS) finishes off small jobs more quickly.

---


#### Using Job's Age for Probability Calculation

Background context: We can use the probability that a job in the system has age \(w\) instead of its size. This is due to Theorem 30.3, which relates the pdf of job sizes to their ages.

:p Can we use the probability that a job in the system has age \(w\) to find the expected number of jobs with original size between \(x\) and \(x + h\)?
??x
Yes. We can condition on the job's age:
\[
f_{sys}(w) = \int_0^w f_{sys}(w|job \, has \, age \, x) \cdot P\{job \, has \, age \, x\} \, dx
= \int_0^w f_{sys}(w|job \, has \, age \, x) \cdot f_e(x) \, dx,
\]
where \(f_{sys}(·)\) is the pdf of job sizes in the system and \(f_e(·)\) is the arrival pdf. Further simplifying:
\[
f_{sys}(w) = \int_0^w f(w|job \, has \, size \geq x) \cdot f_e(x) \, dx
= \int_0^w f(w) F(x) \cdot f_e(x) \, dx,
\]
where \(F(x)\) is the cumulative distribution function (CDF). By (30.1), we have:
\[
f_{sys}(w) = f(w) \frac{w}{E[S]},
\]
where \(E[S]\) is the expected service time.

---


#### Intuition Behind Theorem 30.4

Background context: The theorem states that the expected slowdown for a job of size \(x\) under M/G/1/PS is a constant, independent of the job size \(x\). This means all jobs have the same slowdown, making it "fair" scheduling.

:p What is the intuition behind Theorem 30.4?
??x
The intuition is that an arrival sees \(\frac{\rho}{1 - \rho}\) jobs in the system on average. Thus, any job of size \(x\) will be slowed down by a factor of \(\frac{E[N] + 1}{1} = \frac{\frac{\rho}{1 - \rho} + 1}{1} = \frac{1}{1 - \rho}\). Therefore, the expected time for a job of size \(x\) to leave the system is \(x \cdot \frac{1}{1 - \rho}\).

---


#### M/G/1/PS Queue and Response Time

Background context: The response time under M/G/1/PS is equal to the mean length of a busy period started by a job of size \(x\). This is given by \(E[B(x)] = x \frac{1}{1 - \rho}\).

:p What else that we have studied recently has the form \(\frac{x}{1 - \rho}\)?
??x
The expected length of a busy period started by a job of size \(x\) for the M/G/1/PS queue is also given by \(E[B(x)] = x \frac{1}{1 - \rho}\). Therefore, the mean response time for a job of size \(x\) in the M/G/1/PS queue is equal to the mean length of a busy period started by a job of size \(x\).

---


#### Variances and Higher Moments

Background context: While the expected response time under M/G/1/PS is simple, the variance of the response time cannot be expressed in a closed form. Higher moment analysis shows that this is not true for the variance.

:p What can we say about the variance of the response time under M/G/1/PS?
??x
The variance of the response time under M/G/1/PS cannot be easily expressed in a closed form and higher moment analysis reveals that it is not simply a busy period duration. This complexity persists even for deterministic or exponential service times, making the problem more challenging.

---


#### Implications for Fairness

Background context: The preemptive scheduling policy (PS) ensures equal slowdown for all jobs, making it "fair." Non-preemptive non-size-based policies can lead to different mean slowdowns for small and large jobs. PS is considered fair because it provides the same service rate regardless of job size.

:p Why is M/G/1/PS considered a fair scheduling policy?
??x
M/G/1/PS is considered a fair scheduling policy because all jobs experience the same slowdown, independent of their sizes. This ensures that no job receives preferential treatment based on its size, promoting fairness in the system.

---


#### Expressing (30.3) as a Summation
To derive the formula for the average queue length of an FCFS system, we start with equation (30.3). The goal is to express it as a summation form.

:p How can we express (30.3) as a sum?
??x
We rewrite equation (30.3) in terms of a geometric series:
\[
\tildewider{T}_{QFCFS}(s) = (1-\rho)\sum_{k=0}^{\infty}\left(\frac{\rho}{\tilde{S}_e(s)}\right)^k
\]
This is equivalent to:
\[
\tildewider{T}_{QFCFS}(s) = \sum_{k=0}^{\infty}(1-\rho)\rho^k\left(\frac{\tilde{S}_e(s)}{\rho}\right)^k.
\]

:p What does $\left(\frac{\tilde{S}_e(s)}{\rho}\right)^k$ represent?
??x
$\left(\frac{\tilde{S}_e(s)}{\rho}\right)^k$ is the Laplace transform of the sum $\sum_{i=1}^k S(i)_e$, where $S(i)_e, \; 1 \leq i \leq k$, are independent and identically distributed (i.i.d.) instances of $S_e$. Kleinrock [110] notes that this formulation is peculiar within the context of M/G/1/FCFS queue analysis.
x??

#### Understanding $\tildewider{T}_{QFCFS}(s)$
We derive an expression for the mean delay in an FCFS system using the concept of work-in-system.

:p How can we use PS to express $\tildewider{T}_{QFCFS}(s)=\sum_{k=0}^{\infty}(1-\rho)\rho^k\left(\frac{\tilde{S}_e(s)}{\rho}\right)^k$?
??x
We start by defining $W_{FCFS}$ as the stationary work in an M/G/1/FCFS system. This is equivalent to the delay experienced by a Poisson arrival under FCFS, which equals the work-in-system witnessed by a Poisson arrival. Let $W_{PS}$ denote the stationary work in an M/G/1/PS system. Then:

\[
\tildewider{T}_{QFCFS}(s) = \tildewider{W}_{FCFS}(s) = \tildewider{W}_{PS}(s)
\]

Since both FCFS and PS systems are work-conserving, we have:
\[
\tildewider{W}_{PS}(s) = \sum_{k=0}^{\infty} \tildewider{W}_{PS}(s | \text{arrival sees } k \text{ jobs}) \cdot P(\text{arrival sees } k \text{ jobs})
\]

This simplifies to:
\[
\tildewider{T}_{QFCFS}(s) = \sum_{k=0}^{\infty} \left( \frac{\tilde{S}_e(s)}{\rho} \right)^k \cdot \rho^k (1-\rho)
\]

This completes the derivation for the M/G/1/FCFS delay transform.
x??

#### Preemptive-LCFS Policy
The Preemptive-LCFS policy works by interrupting a job whenever a new arrival enters and preempts that job until it is completed.

:p What can you recall about the performance of non-preemptive LCFS?
??x
Non-preemptive LCFS has identical performance to FCFS, making it not very effective for highly variable job size distributions.
x??

#### Performance Analysis of Preemptive-LCFS
The performance of PLCFS is analyzed in terms of mean and slowdown.

:p What is the theorem stating about PLCFS?
??x
Theorem 30.6 states that for a tagged job of size $x$:
\[
E[T(x)]_{PLCFS} = \frac{x}{1-\rho}
\]
and
\[
E[\text{Slowdown}(x)]_{PLCFS} = \frac{1}{1-\rho}
\]

This theorem will be proven in the remainder of this section.
x??

#### Key Observation and Busy Periods
A key observation is that a job gets interrupted only when all jobs arriving after it are completed.

:p How long, on average, does it take for a job to get back the processor?
??x
When a job is interrupted, it won't resume until all work that arrives during its busy period completes. Therefore:
\[
E[\text{Time until job gets back processor}] = E[\text{Length of busy period}] = \frac{E[S]}{1-\rho}
\]

This mean length of the busy period is consistent regardless of the service order in an M/G/1 queue, as long as it is work-conserving.
x??

---

---

