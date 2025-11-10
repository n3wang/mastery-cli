# High-Quality Flashcards: 7A003--Performance-modeling-and-design-of-computer-systems_processed (Part 39)


**Starting Chapter:** Chapter 29 Scheduling Non-Preemptive Non-Size-Based Policies

---


#### Work in System and Device Utilization
Background context: When analyzing a single queue, two important metrics are work in system (remaining tasks to complete) and device utilization (fraction of time that the device is busy). These metrics can help understand how different scheduling policies affect system performance.

:p If two scheduling policies result in the same work in system and server utilization over all time, do they necessarily have the same mean response time? Explain with an example.
??x
No. The answer here involves understanding that while "work in system" and "device utilization" are consistent across different policies, these metrics alone do not dictate the mean response time.

Consider two work-conserving policies A and B:
- Policy A serves the shortest available job first, resulting in a few large jobs being left.
- Policy B serves the longest available job first, leaving many more small jobs behind.

By Little's Law, which states \( E[N] = \lambda E[T] \) where \( N \) is the number of items in system and \( T \) is the average time spent per item, we can see that:

- For policy B, since there are many more small jobs, \( E[N] \) would be higher.
- Therefore, by Little's Law, \( E[T] \) for B would also be higher.

The key point is:
```java
// Example logic in pseudocode to illustrate the concept
public class SchedulingPolicies {
    public double calculateMeanResponseTime(double lambda, double arrivalRate, double workInSystem) {
        // Using Little's Law: E[N] = λ * E[T]
        // Where E[N] is higher for policy B due to more small jobs.
        return workInSystem / (arrivalRate - lambda);
    }
}
```
x??

---

#### Slowdown of a Job
Background context: The slowdown of a job is defined as its response time divided by the size of the job. This metric helps in understanding how well jobs are being handled relative to their sizes.

:p Why is mean slowdown preferable to mean response time?
??x
Mean slowdown is preferable because it directly correlates with the desired outcome—smaller jobs should have smaller response times, and larger jobs should have proportionally larger response times. A low mean slowdown ensures that no job has a significantly higher ratio of response time to its size.

The objective here is to maintain fair treatment of different-sized jobs:
```java
// Example logic in pseudocode to calculate mean slowdown
public class JobSlowdown {
    public double calculateMeanSlowdown(double totalResponseTime, int totalJobSize) {
        // Mean slowdown is the average ratio of response time to job size.
        return (totalResponseTime / totalJobSize);
    }
}
```
x??

---

#### Tail Behavior of Response Time
Background context: Understanding the tail behavior of response times is crucial for setting Service Level Agreements (SLAs), as it helps in ensuring that extreme delays are kept under control. The probability that a response time exceeds some level \( x \) is denoted as \( P{T > x} \).

:p Why does knowing mean slowdown being low tell us anything about the maximum slowdown?
??x
Knowing the mean slowdown gives insight into how many jobs can have significantly higher than average slowdowns (and thus, high response times). If the mean slowdown is 2:
- Fewer than half of the jobs can have a slowdown greater than or equal to 3.
- Fewer than one-fourth of the jobs can have a slowdown at least 5.

This means that by keeping the mean slowdown low, we limit the number of jobs with very high response times relative to their size:
```java
// Example logic in pseudocode to estimate job counts based on mean slowdown
public class SlowdownAnalysis {
    public double calculateFractionHighSlowdown(double meanSlowdown) {
        // Fewer than 1/(n-1) fraction of jobs can have a slowdown of at least n.
        return 1 / (meanSlowdown - 1);
    }
}
```
x??

---

#### Starvation/Fairness Metrics
Background context: As mean slowdown becomes popular, researchers are concerned about potential policies that might achieve low mean slowdown by starving large jobs. The Shortest-Remaining-Processing-Time (SRPT) policy is an example where small jobs get treated well at the expense of delaying larger ones.

:p What performance metric can tell us if jobs are being starved?
??x
To determine if jobs are being starved, one should look at mean slowdown as a function of job size. For instance:
- "What is the expected slowdown of jobs of size \( x \)? "
- "What is the expected slowdown for the maximum job size? "
- "What is the expected slowdown for jobs in the 99th percentile of the job size distribution?"

A scheduling policy P can be deemed "unfair" if:
```java
// Example logic in pseudocode to compare expected slowdowns
public class FairnessAnalysis {
    public boolean checkFairness(double meanSlowdownPS, double meanSlowdownP) {
        // Compare E[Slowdown(x)] under policy P with PS.
        return (meanSlowdownP > meanSlowdownPS);
    }
}
```
x??

---

#### Deriving Performance Metrics
Background context: For various scheduling policies in the M/G/1 queue, we typically derive \( E[T] \) (mean time in system) and \( E[T(x)] \) (mean time in system for a job of size x). To find mean slowdown given these metrics:
- First, derive \( E[Slowdown(x)] = \frac{E[T(x)]}{x} \).
- Then, use this to get the overall mean slowdown: \( E[Slowdown] = \int \frac{E[Slowdown(x)] f_S(x)}{dx} \).

:p How can we derive mean slowdown given \( E[T] \) and \( E[T(x)] \)?
??x
To derive mean slowdown, follow these steps:
1. Derive the mean slowdown for a job of size \( x \):
   - \( E[Slowdown(x)] = \frac{E[T(x)]}{x} \)
2. Use this to get overall mean slowdown:
   - \( E[Slowdown] = \int \frac{E[Slowdown(x)] f_S(x)}{dx} \)

Where \( f_S(x) \) is the job size distribution.

```java
// Example logic in pseudocode for deriving mean slowdown
public class SlowdownDerivation {
    public double calculateMeanSlowdown(double[] E_Tx, int[] sizes, double[] fS_x) {
        // Derive E[Slowdown(x)] and then overall E[Slowdown]
        double total = 0;
        for (int i = 0; i < E_Tx.length; i++) {
            total += (E_Tx[i] / sizes[i]) * fS_x[i];
        }
        return total;
    }
}
```
x??


#### FCFS vs LCFS Scheduling Policies
FCFS (First-Come, First-Served) and LCFS (Last-Come, First-Served) are non-preemptive policies that do not use job size information. In an M/G/1 queue setting, they serve jobs based on their arrival order or the reverse of it.
:p When would one use LCFS?
??x
LCFS is used when arriving jobs can be easily accessed from a stack (e.g., last job to arrive). It ensures that new arrivals are served immediately once space becomes available.
x??

---

#### FCFS Service Order Analysis
The M/G/1 queue with FCFS service order has a specific embedded DTMC formulation. This helps in understanding the behavior of jobs over time, particularly at departure points.
:p What is the embedded DTMC formulation for an M/G/1/FCFS queue?
??x
For the M/G/1/FCFS queue, we consider the number of jobs in the system at the time of each departure. Let \( \{X_i, i \geq 0\} \) be a sequence representing these states. The transition probability is given by:
\[ P_{ij} = \text{Probability that when leaving state } i, \text{ we next go to state } j = \frac{\lambda^{j-i+1} e^{-\lambda x}}{(j-i+1)!} f_S(x) dx \]
where \( f_S(x) \) is the service time distribution. The limiting probability \( \pi_i \) specifies the fraction of jobs that leave behind \( i \) jobs.
x??

---

#### LCFS Service Order Analysis
LCFS also follows a similar embedded DTMC formulation as FCFS, making it equivalent in terms of the number of jobs in the system and mean response time. This is due to PASTA (Poisson Arrivals See Time Averages).
:p How does the argument for M/G/1/LCFS differ from M/G/1/FCFS?
??x
The argument for M/G/1/LCFS remains identical because any non-preemptive service order that doesn't use job size information results in the same behavior. This is due to the fact that both policies effectively treat jobs symmetrically over time.
x??

---

#### Non-Preemptive Policies and Job Size Ignorance
Non-preemptive policies like FCFS, LCFS, and RANDOM do not use any job size information. They are work-conserving but handle jobs based on their arrival or random selection.
:p Why is job size ignored in non-preemptive scheduling?
??x
Ignoring job size prevents the policy from affecting the distribution of the number of arrivals during a service time. If sizes were used, it would change how arrivals occur, influencing the system dynamics.
x??

---

#### Variance of Response Time
While FCFS, LCFS, and RANDOM have the same mean response time, their variances differ significantly. LCFS can lead to very high response times due to potential long waits for the system to clear before servicing a new job.
:p Why do different policies like FCFS, LCFS, and RANDOM have different Var(T)?
??x
The variance of response times varies because LCFS may result in long waiting periods if it has to wait for the system to become empty. In contrast, FCFS serves jobs closer to their arrival time, leading to lower variability.
x??

---

#### Laplace Transform of Waiting Time for LCFS
For M/G/1/LCFS, we can use the Laplace transform of waiting times to derive its variance. This involves understanding the busy periods started by job sizes and using these to compute the expected waiting time.
:p How do you determine Var(T)LCFS?
??x
To find \( \tilde{T}_{\text{LCFS}}(s) \), we use the Laplace transform of the excess service time, denoted as \( \tilde{S}_e(s) \). The waiting time is given by:
\[ \tilde{T}_{\text{LCFS}}(s|busy) = \frac{\tilde{S}_e(s)}{s + \lambda - \frac{\lambda}{\tilde{B}(s)}} \]
where \( \tilde{S}_e(s) \) and \( \tilde{B}(s) \) are the Laplace transforms of the excess service time and busy period, respectively.
x??

---


#### Processor-Sharing (PS) Concept
Background context: In Chapter 30, we explore three preemptive scheduling policies that do not rely on job size or priority class. One of these policies is Processor-Sharing (PS). PS allows short jobs to time-share with all other jobs in the system immediately upon arrival, which can reduce their waiting times compared to non-preemptive policies.

:p Why are short jobs not affected by long ones under PS?
??x
Short jobs benefit from immediate time-sharing with all jobs in the system. They do not have to wait for long jobs to finish before starting execution. This is because each job gets a small quantum of CPU time, and new arrivals can start sharing the CPU immediately.
The processor shares its resources among all currently executing jobs, ensuring that short jobs can complete their service faster.

```java
public class ProcessorSharing {
    private double quantum; // Small time slice for scheduling

    public void scheduleJobs(double[] jobSizes) {
        // Simulate time-sharing with a small quantum
        for (double size : jobSizes) {
            // Each job gets a quantum of CPU time to run
            while (size > 0 && !allJobsFinished()) {
                size -= getQuantum();
            }
        }
    }

    private double getQuantum() {
        return 0.1; // Example small quantum value
    }

    private boolean allJobsFinished() {
        // Logic to check if all jobs are finished
        return true;
    }
}
```
x??

---

#### Motivation Behind PS
Background context: The motivation for Processor-Sharing is to address the issue of high mean response times in non-preemptive policies due to variability in job sizes. Non-preemptive policies like FCFS can lead to short jobs being delayed significantly behind long jobs.

:p Why does PS not suffer from high mean response times caused by variable job sizes?
??x
PS mitigates this issue by allowing short jobs to immediately share the CPU with other jobs upon arrival, regardless of their size. This means that short jobs do not have to wait for long jobs to complete, reducing their average waiting time and overall delay.

In contrast, in non-preemptive policies like FCFS, a short job must wait until all longer jobs before it are completed, which can lead to very high mean response times when there is significant variability in job sizes.

```java
public class NonPreemptiveFCFS {
    public double calculateMeanResponseTime(double[] jobSizes) {
        // Calculate the mean response time assuming FCFS scheduling
        return (jobSizes.length * 1.5); // Example calculation, actual formula depends on E[S2]
    }
}
```
x??

---

#### Comparison with FCFS in PS
Background context: While Processor-Sharing can be beneficial for short jobs by allowing immediate access to the CPU, it is not universally better than First-Come-First-Served (FCFS) scheduling. There are specific arrival sequences where FCFS outperforms PS.

:p Provide an example of an arrival sequence where PS performs worse than FCFS in terms of mean response time and mean slowdown.
??x
Consider two jobs both arriving at time 0, with each job having a size of 1:
- For FCFS: 
  - \(E[T]_{FCFS} = 1.5\)
  - \(E[\text{Slowdown}]_{FCFS} = 1.5\)

- For PS:
  - \(E[T]_{PS} = 2\)
  - \(E[\text{Slowdown}]_{PS} = 2\)

In this example, both the mean response time and mean slowdown are higher for PS compared to FCFS.

```java
public class ExampleArrivalSequence {
    public void compareSchedulingPolicies() {
        double fcfsMeanResponseTime = 1.5; // Example value
        double psMeanResponseTime = 2;      // Example value

        if (psMeanResponseTime > fcfsMeanResponseTime) {
            System.out.println("PS performs worse than FCFS.");
        } else {
            System.out.println("PS performs better than or equal to FCFS.");
        }
    }
}
```
x??

---

#### Stochastic Setting Outperformance
Background context: Even though PS does not outperform FCFS on every arrival sequence, we need to determine if M/G/1/PS can still provide an advantage over M/G/1/FCFS in a stochastic setting.

:p Can we claim that M/G/1/PS outperforms M/G/1/FCFS with respect to expected response time in a stochastic setting?
??x
In a stochastic setting, it is not accurate to definitively state that M/G/1/PS will always outperform M/G/1/FCFS. The performance of PS versus FCFS can vary depending on the characteristics of job sizes and arrival patterns.

However, PS tends to perform better for systems with highly variable job sizes because short jobs can immediately start using the CPU without waiting behind long jobs. In contrast, FCFS might result in significant delays for short jobs if many longer jobs are already in the queue.

```java
public class StochasticSetting {
    public boolean isMg1PsBetterThanFcfs(double[] jobSizes) {
        double psResponseTime = calculatePSResponseTime(jobSizes);
        double fcfsResponseTime = calculateFCFSResponseTime(jobSizes);

        return (psResponseTime < fcfsResponseTime);
    }

    private double calculatePSResponseTime(double[] jobSizes) {
        // PS response time calculation logic
        return 2; // Example value
    }

    private double calculateFCFSResponseTime(double[] jobSizes) {
        // FCFS response time calculation logic
        return 1.5; // Example value
    }
}
```
x??


#### Expected Number of Jobs in System with Size x to x+h

Background context: The question asks about expressing the expected number of jobs in a system with original sizes between \(x\) and \(x + h\). It highlights that the original job size distribution is given by \(f(\cdot)\), but the job sizes in the system have a different probability density function (pdf) due to preemptive service.

:p Can we express the expected number of jobs in the system with size between \(x\) and \(x + h\) as \(E[N] f(x) h + o(h)\)?
??x
No, because the job sizes in the system are processed differently compared to their original arrival sizes. The pdf of job sizes in the system (\(fsys(\cdot)\)) is not necessarily the same as \(f(\cdot)\), especially considering that small jobs are finished more quickly.

To find \(fsys(w)\), we condition on the job’s age:
\[
fsys(w) = \int_0^w fsys(w | \text{job has age } x) \cdot P\{\text{job has age } x\} dx
= \int_0^w fsys(w | \text{job has age } x) \cdot f_e(x) dx,
\]
where \(f_e(x)\) is the exponential distribution for job arrival times. This simplifies to:
\[
fsys(w) = f(w) \cdot \frac{w}{E[S]},
\]
where \(E[S]\) is the mean service time.

Using this, we can find the expected number of jobs in the system with sizes between \(x\) and \(x + h\):
\[
E[\text{Number of jobs in system with size } (x, x + h)] = E[N] \cdot fsys(x) \cdot h + o(h),
= \frac{\rho}{1 - \rho} \cdot \frac{x \cdot f(x)}{E[S]} \cdot h + o(h).
\]
The rate of arrivals of jobs into the system with size between \(x\) and \(x + h\) is:
\[
E[\text{Rate of arrivals of jobs with size } (x, x + h)] = \lambda \cdot f(x) \cdot h + o(h).
\]

Applying Little’s Law, we find the expected time in the system for jobs with original sizes between \(x\) and \(x + h\):
\[
E[T(x)] = \frac{\rho}{1 - \rho} \cdot x \cdot f(x),
\]
which completes the proof of Theorem 30.4.

x??

#### Intuition Behind (30.2)

Background context: Equation (30.2) shows how \(fsys(w)\), the pdf for job sizes in the system, relates to the original job size distribution \(f(w)\).

:p Explain the intuition behind equation (30.2).
??x
In equation (30.2):
\[
fsys(w) = f(w) \cdot \frac{w}{E[S]}.
\]
The factor that multiplies \(f(w)\) is \(\frac{w}{E[S]}\), which is greater than 1 for large jobs and less than 1 for small jobs. This indicates that the probability of finding a job with size \(w\) in the system increases as \(w\) gets larger, compared to what it would be under the original distribution.

For small values of \(w\), \(\frac{w}{E[S]}\) is small, reducing the likelihood of having such jobs. Conversely, for large values of \(w\), this factor becomes significant, making larger jobs more likely in the system.

x??

#### Response Time and Busy Period Length under M/G/1/PS

Background context: The text discusses how the expected response time for a job of size \(x\) in an M/G/1/PS queue is equal to the mean length of a busy period started by a job of size \(x\), both of which are given by \(\frac{x}{1 - \rho}\).

:p What is the intuition behind the expression \(\frac{x}{1 - \rho}\) for response time under M/G/1/PS?
??x
The expression \(\frac{x}{1 - \rho}\) represents the expected time a job of size \(x\) spends in the system. The factor \(1 - \rho\) is the utilization factor, which captures how busy the server is on average.

When an arrival sees \(\frac{\rho}{1 - \rho}\) jobs in the system (which is the steady-state number of jobs in the system), each job contributes to slowing down new arrivals. The total slowdown for a job of size \(x\) is proportional to the number of jobs in the system plus one, i.e., \(\frac{\rho}{1 - \rho} + 1 = \frac{1}{1 - \rho}\).

Thus, any arrival should take:
\[
E[T(x)] = x \cdot \frac{1}{1 - \rho}
\]
time to leave the system.

x??

#### Fairness of Processor-Sharing Scheduling

Background context: The text explains that under processor-sharing (PS) scheduling, all jobs experience the same slowdown regardless of their size. This is in contrast to non-preemptive and non-size-based policies where smaller jobs might have higher mean slowdown compared to larger jobs.

:p Why is processor-sharing referred to as fair scheduling?
??x
Processor-sharing (PS) is called fair scheduling because it ensures that all jobs experience the same relative slowdown, independent of their size. This is in contrast to other policies like Shortest Remaining Time First (SRPT), where smaller jobs might be starved and thus have higher mean slowdown compared to larger jobs.

By ensuring equal slowdown for all jobs, PS promotes fairness among different job sizes. The metric used to evaluate this fairness involves comparing the mean slowdown of large jobs under SRPT with that under PS, which is always lower or equal due to the fair distribution of service.

x??

#### M/G/1/PS Queue Analysis

Background context: The text discusses the analysis of an M/G/1/PS queue, highlighting its simplicity and beauty in terms of expected slowdown for jobs of size \(x\).

:p What are some other expressions that also have the form \(\frac{x}{1 - \rho}\)?
??x
The expression \(\frac{x}{1 - \rho}\) appears in multiple contexts related to the M/G/1/PS queue. Specifically, it represents both the expected response time for a job of size \(x\) and the mean length of a busy period started by a job of size \(x\).

For instance:
- The expected response time for a job of size \(x\) is \(\frac{x}{1 - \rho}\).
- The expected length of a busy period initiated by a job of size \(x\) is also \(\frac{x}{1 - \rho}\).

These two concepts are related but not identical, as the busy period can be longer than the response time due to additional factors like job arrivals during the busy period.

x??

#### Transform Equation for M/G/1/FCFS

Background context: The text mentions a transform equation for waiting time in the M/G/1/FCFS queue, which is given by:
\[
\widetilde{T}_{Q, \text{FCFS}}(s) = \frac{1 - \rho}{1 - \rho/s} \cdot \widetilde{S}(s),
\]
where \(\widetilde{S}(s)\) is the Laplace transform of the service time.

:p What is the form of the waiting time (delay) in the M/G/1/FCFS queue?
??x
The waiting time (delay) in the M/G/1/FCFS queue, when transformed using the Laplace domain, is given by:
\[
\widetilde{T}_{Q, \text{FCFS}}(s) = \frac{1 - \rho}{1 - \rho/s} \cdot \widetilde{S}(s).
\]
This equation captures how the waiting time varies with the service time and the utilization factor \(\rho\).

x??

---

