# High-Quality Flashcards: 7A003--Performance-modeling-and-design-of-computer-systems_processed (Part 47)


**Starting Chapter:** 31.2 Non-Preemptive Priority

---


#### Time in Queue for Jobs of Priority 1
Background context: The derivation starts by considering a priority 1 arrival, which must wait for both (i) the job currently being served, if any, and (ii) all jobs of the same or higher priority already in the queue. This leads to a formula for \(E[TQ(1)]\), the expected time in queue for jobs of priority 1.
:p What is the formula for \(E[TQ(1)]\)?
??x
The formula for \(E[TQ(1)]\) is given by:
\[ E[TQ(1)] = \rho \cdot E[Se] + E[TQ(1)] \cdot \lambda_1 \cdot E[S_1] \]
This can be simplified to:
\[ E[TQ(1)] = \frac{\rho \cdot E[Se]}{1 - \rho_1} \]
where \(E[Se]\) is the expected service time, and \(\rho_1\) is the contribution of jobs of priority 1 to the overall load.
x??

---


#### Time in Queue for Jobs of Priority 2
Background context: The derivation extends to a priority 2 arrival, which must wait not only for the job currently being served but also for all jobs of higher or equal priority already in the queue and any new jobs of lower priority that arrive while it waits.
:p What is the formula for \(E[TQ(2)]\)?
??x
The formula for \(E[TQ(2)]\) can be derived as:
\[ E[TQ(2)] = \rho \cdot E[Se] + E[TQ(1)] \cdot \lambda_1 \cdot E[S_1] + E[TQ(2)] \cdot (\lambda_1 + \lambda_2) \]
After simplification, we get:
\[ E[TQ(2)] = \frac{\rho \cdot E[Se]}{(1 - \rho_1)(1 - \rho_1 - \rho_2)} \]
where \(E[S]\) is the expected service time and \(\rho_i\) represents the contribution of jobs of priority i to the overall load.
x??

---


#### General Time in Queue for Jobs of Priority k
Background context: The general formula for \(E[TQ(k)]\) can be derived through induction, considering that a job of priority k must wait for all lower-priority jobs already in the queue and any new arrivals during its waiting period.
:p What is the general formula for \(E[TQ(k)]\)?
??x
The general formula for \(E[TQ(k)]\) under non-preemptive priority scheduling is:
\[ E[TQ(k)] = \frac{\rho E[Se]}{(1 - \sum_{i=1}^{k} \rho_i)(1 - \sum_{i=1}^{k-1} \rho_i)} \]
Using the formula for \(E[Se]\) from (23.9), we get:
\[ E[TQ(k)] = \frac{\rho E[S^2]}{2E[S](1 - \sum_{i=1}^{k} \rho_i)(1 - \sum_{i=1}^{k-1} \rho_i)} \]
x??

---


#### SJF Performance Analysis

Background context: The performance of SJF can be analyzed using the results for non-preemptive priority queueing. By dividing jobs into an infinite number of classes based on their size, we can use the NP-Priority formulas to calculate expected waiting times.

:p How can we analyze the performance of SJF?
??x
We model SJF by having an infinite number of priority classes where smaller jobs have higher priority. The expected waiting time \(E[TQ(k)]_{NP-Priority}\) for a job in class \(k\) is given by:

\[ E[TQ(k)]_{NP-Priority} = \frac{\rho E[S^2]}{2E[S] \cdot \left(1 - \sum_{i=1}^{k-1} \rho_i\right) / \left(1 - \sum_{i=1}^{k} \rho_i\right)} \]

Where:
- \(\rho_k = \frac{\lambda}{\int_0^x t f(t) dt}\)
- \(E[S]\) is the expected size of a job.
- \(f(x)\) is the distribution function for job sizes.

The total expected waiting time \(E[TQ]_{SJF}\) can be derived by summing over all classes:

\[ E[TQ]_{SJF} = \int_0^{x_n} E[TQ(x)] f(x) dx = \frac{\rho E[S^2]}{2E[S]} \cdot \left(\frac{\int_0^{x_n} f(x) dx}{\left(1 - \frac{\lambda}{\int_0^{x_n} t f(t) dt}\right)^2}\right) \]

```java
public class SJFPerformanceAnalysis {
    private double calculateExpectedWaitingTime(int n, double E_S, double[] rho_k, double[] E_TQ_k) {
        double numerator = 0;
        for (int k = 1; k <= n; k++) {
            numerator += rho_k[k-1] * E_TQ_k[k-1];
        }
        
        return n / numerator;
    }
}
```
x??

---


#### Load and Job Sizes

Background context: The load \(\rho_x\) composed of jobs of size 0 to \(x\) is defined as the ratio of the arrival rate of such jobs to their expected size. This concept helps in analyzing the performance of SJF by considering an infinite number of classes.

:p What does \(\rho_x\) represent?
??x
\(\rho_x\) represents the load composed of jobs of sizes less than or equal to \(x\). It is calculated as:

\[ \rho_x = \frac{\lambda}{\int_0^x t f(t) dt} \]

Where:
- \(\lambda\) is the arrival rate of jobs.
- \(f(x)\) is the distribution function for job sizes.

This load helps in understanding how much "pressure" smaller jobs are putting on the system and can be used to derive expected waiting times under SJF.

```java
public class LoadCalculation {
    private double calculateLoad(double lambda, double x, Function<Double, Double> f) {
        return lambda / integrate(0, x, t -> f.apply(t));
    }
    
    private double integrate(double a, double b, UnaryOperator<Double> func) {
        // Simple integration method for demonstration
        return (b - a) * 1.0; // Placeholder implementation
    }
}
```
x??

---

---


#### Impact on Small Jobs
Background context: Even small jobs can be negatively affected by the variability in job sizes. This is because a high variance in job size means that a system with a load \( \rho \) might appear as if it has low load from the perspective of a small job, but the large variance can dominate and affect performance.

:p How does the variance in job size distribution impact small jobs?
??x
The variance in job size distribution can significantly impact even small jobs. Even though a system may seem lightly loaded for larger jobs, the variability means that there is a high probability of encountering large jobs, which can delay small jobs considerably. This results in poor performance for small jobs under SJF.
x??

---


#### Non-Preemptive Policies and Mean Time in Queue
Background context: Non-preemptive policies like SJF can perform poorly due to the squared term \( E[S^2] \) in their mean time in queue formula. In systems with heavy-tailed job sizes, this term becomes significant.

:p Why is SJF a poor choice for minimizing mean time in queue under non-preemptive policies?
??x
SJF is a poor choice because it amplifies the impact of large jobs due to the squared term \( E[S^2] \) in its formula. In systems with heavy-tailed job sizes, this can lead to disproportionately high waiting times for small jobs. Other policies like PS (Priority Scheduling), PLCFS (Preemptive Least-Critical First-Served), or FB (Fair-Band) may be better as they do not have the same \( E[S^2] \) term.
x??

---


#### Tagging Policy for High Variance
Background context: In scenarios where preemption is unavailable and checkpointing is difficult, a tagging policy like TAGS can help. This policy involves killing long-running jobs after some time to allow shorter jobs to run.

:p Why might it be beneficial to kill running jobs in systems with high job size variability?
??x
Killing long-running jobs allows other short jobs to run, reducing the overall mean response time. Even though this creates extra work by restarting the killed job, the improved throughput for short jobs can lead to better performance.
x??

---


#### Priority Scheduling for M/G/1 Systems
Background context: In an M/G/1 system with non-preemptive priority scheduling, to minimize the mean waiting time over all jobs, class S (small) jobs should be given higher priority than class L (large) jobs.

:p How can you prove that small jobs should get priority in an M/G/1 system?
??x
To prove this, we derive \( E[TQ]_{NP-Priority} \) for both cases: when S has priority and when L has priority. For S with priority:
\[ E[TQ(S)]_{NP-S} = \lambda_S \cdot T(S) + \lambda_L \cdot T(L|S) \]
For L with priority:
\[ E[TQ(L)]_{NP-L} = \lambda_L \cdot T(L) + \lambda_S \cdot T(S|L) \]

Given that \( E[SS] < E[SL] \), it can be shown that the mean waiting time is minimized when S jobs have higher priority. This ensures shorter jobs are served first, reducing their waiting times and overall system delay.
x??

---

---

