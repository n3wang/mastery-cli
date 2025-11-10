# High-Quality Flashcards: 7A003--Performance-modeling-and-design-of-computer-systems_processed (Part 48)


**Starting Chapter:** 32.1 Motivation. 32.2 Preemptive Priority Queueing

---


#### Preemptive Priority Queueing
Background context: In preemptive priority queueing, jobs of higher priority are interrupted and given service before lower-priority jobs that have been waiting longer. The system models different job classes with varying arrival rates and service requirements.

:p What is the main difference between preemptive priority queueing and non-preemptive queueing?
??x
In preemptive priority queueing, if a job of higher priority arrives while another job is being serviced, the currently servicing job is interrupted to start serving the new, higher-priority job. In contrast, in non-preemptive queueing, once a job starts, it continues until completion.

```java
// Example: Job class representation with preemptive priority
public class JobPriority {
    private int priority;
    private double arrivalTime;
    private double serviceRequired;

    public JobPriority(int priority, double arrivalTime, double serviceRequired) {
        this.priority = priority;
        this.arrivalTime = arrivalTime;
        this.serviceRequired = serviceRequired;
    }

    public int getPriority() { return priority; }
}
```
x??

---


#### Mean Time in System for Preemptive Priority Queueing
Background context: The objective is to compute the mean time in system (E[T(k)]) for a job of priority k using preemptive priority queueing. This involves considering all work that must be completed before a job can leave the system.

:p How do we break down the computation of E[T(k)]P-Priority?
??x
To compute E[T(k)]P-Priority, we consider three components: 1) The time the job spends in the queue (waiting for its turn to be serviced), 2) The service time itself, and 3) Any interruptions caused by higher-priority jobs. Each component contributes differently based on the priority levels and arrival rates.

```java
// Example pseudocode for computing E[T(k)]P-Priority
public class PPriorityQueueing {
    public double calculateMeanTimeInSystem(int k) {
        // Time in queue: sum of waiting times for all jobs with lower or equal priority
        double timeInQueue = computeQueueTime(k);
        
        // Service time: average service requirement
        double serviceTime = jobServiceRequirements[k].getExpectedValue();
        
        // Interruptions: sum of interruptions from higher-priority jobs
        double interruptions = 0;
        for (int i = k + 1; i <= n; i++) {
            interruptions += computeInterruptTime(i, k);
        }
        
        return timeInQueue + serviceTime + interruptions;
    }
}
```
x??

---

---


#### Component (2) of Expected Time in System

Background context: In a preemptive priority queue, component (2) represents the expected time required to complete service on all jobs of priority 1 through k that are already in the system when our arrival walks in. Unlike non-preemptive systems where each job waits until completion, in preemptive systems, jobs can be interrupted and resumed.

Formula: 
\[ E[T(2)] = \frac{\sum_{i=1}^{k} \rho_i \cdot \frac{E[S^2_i]}{2E[S_i]}}{1 - \sum_{i=1}^{k} \rho_i} \]

Explanation:
- \( \rho_i = \lambda_i \cdot E[T(i)] \) is the traffic intensity for each priority class.
- The formula accounts for the expected remaining work in the system due to jobs of priorities 1 through k.

:p How do we compute component (2) in a preemptive priority queue?
??x
To compute component (2), you need to consider the total expected remaining work in the system due to only jobs of priorities 1 through k. This is because jobs can be interrupted and resumed, making their remaining service time non-trivial.

The formula simplifies to:
\[ E[T(2)] = \frac{\sum_{i=1}^{k} \rho_i \cdot \frac{E[S^2_i]}{2E[S_i]}}{1 - \sum_{i=1}^{k} \rho_i} \]

Where \( \rho_i = \lambda_i \cdot E[T(i)] \) is the traffic intensity for each priority class, and \( E[S_i] \) is the mean service time for a job of priority class i.

:p Can we use a similar approach as in non-preemptive systems to compute this?
??x
No, we cannot. In preemptive systems, jobs can be interrupted and resumed, so their remaining work is not just their total service time minus what has already been served. We need to account for the expected remaining work considering interruptions.

:p What does \( E[S^2_i] \) represent in this context?
??x
\( E[S^2_i] \) represents the second moment of the service time distribution for jobs of priority class i, which is used to compute the variance and helps in understanding how much variability there is in the remaining service time.

:p How does the formula incorporate the concept of work-conserving policies?
??x
The formula incorporates the idea that all work-conserving policies (like FCFS) have the same remaining work because they ensure no work is lost. This is why we consider a hypothetical system with only arrivals from classes 1 through k, and any work-conserving scheduling order.

:p What does \( \rho_i \) represent in this context?
??x
\( \rho_i = \lambda_i \cdot E[T(i)] \) represents the traffic intensity for each priority class i, where \( \lambda_i \) is the arrival rate of jobs of priority class i and \( E[T(i)] \) is the expected total service time required for all jobs of priority 1 through (i-1).

:p How does this formula simplify when only considering FCFS scheduling?
??x
When using FCFS, the formula simplifies as:
\[ E[T(k)] = E[S_k] + \sum_{i=1}^{k} \rho_i \cdot \frac{E[S^2_i]}{2E[S_i]} (1 - \sum_{i=1}^{k-1} \rho_i) \]

This simplification uses the fact that in FCFS, the order of service is deterministic.

---


#### Concept of Residence Time

Background context: In preemptive priority queues, residence time refers to the total time a job spends from when it first receives some service until it leaves the system. This includes all interruptions and waiting times before starting service.

:p Is residence time the same as service time?
??x
No, the residence time is not the same as the service time. The residence time is much longer because it includes all interruptions and the waiting time for a job to start receiving service.

:p How does this concept differ from non-preemptive systems?
??x
In non-preemptive systems, once a job starts, it completes its service without interruption. However, in preemptive systems, jobs can be interrupted multiple times, and their residence time includes these interruptions as well as the waiting time before they start being served.

:p How does this affect the computation of expected time in system?
??x
In preemptive priority queues, the expected time in system is divided into two components: waiting time (until a job starts serving) and residence time (from when service starts until completion). This requires accounting for interruptions, which affects the calculation significantly.

:p What are the key differences between waiting time and residence time?
??x
Waiting time refers to the time before a job begins receiving service. Residence time includes both the waiting time and the actual service time plus any interruptions that occur during service.

---

---


#### First Term of (32.1)
Background context explaining the concept. The first term \(E[S_k] \frac{1}{\sum_{i=1}^{k-1} \rho_i}\) represents the mean residence time, or expected length of a busy period started by a job of size \(E[S_k]\). Only jobs of classes 1 through \(k-1\) are allowed in this busy period. This formula is crucial for understanding the behavior of preemptive priority queueing systems.

:p What does the first term \(E[S_k] \frac{1}{\sum_{i=1}^{k-1} \rho_i}\) represent in (32.1)?
??x
This term represents the mean residence time, or expected length of a busy period started by a job of class \(k\). It is calculated as the size of the job of class \(k\) divided by the sum of the arrival rates of all lower-priority classes that can interrupt it during service. This calculation helps in understanding how long a high-priority job might have to wait due to interruptions from lower-priority jobs.

```java
// Pseudocode for calculating mean residence time
double calculateResidenceTime(double Sk, double[] rho) {
    int k = ...; // Priority of the current job
    double sumRhoLowerPriorities = 0;
    for (int i = 1; i < k; i++) {
        sumRhoLowerPriorities += rho[i];
    }
    return Sk / sumRhoLowerPriorities;
}
```
x??

---


#### Equation (32.3)
Background context explaining the concept. The equation \(E[T(k)]_{\text{P-Priority}} = E[S_k] \frac{1}{\sum_{i=1}^{k-1}\rho_i} + \lambda \sum_{i=1}^k p_i E[S^2_i] (1-\sum_{i=1}^{k-1}\rho_i)(1-\sum_{i=1}^k\rho_i)\) is a reformulated version of the previous terms, making it clearer that the mean time \(E[T(k)]\) for a job of priority \(k\) to receive service depends only on the first \(k\) classes in a preemptive priority queue.

:p What does equation (32.3) represent?
??x
Equation (32.3) represents the mean time \(E[T(k)]_{\text{P-Priority}}\) for a job of priority \(k\) to receive service in a preemptive priority queue. It combines two key components: the mean residence time due to interruptions from lower-priority jobs and the expected excess service time due to variability in job sizes.

The formula is:
\[ E[T(k)]_{\text{P-Priority}} = E[S_k] \frac{1}{\sum_{i=1}^{k-1}\rho_i} + \lambda \sum_{i=1}^k p_i E[S_i^2] (1-\sum_{i=1}^{k-1}\rho_i)(1-\sum_{i=1}^k\rho_i) \]

Where:
- \(E[S_k]\) is the expected size of a job of class \(k\).
- \(\rho_i\) is the arrival rate of jobs of class \(i\).
- \(p_i\) is the probability that a job belongs to class \(i\).

```java
// Pseudocode for calculating mean service time using equation (32.3)
double calculateServiceTime(double Sk, double[] rho, double[] pSi) {
    int k = ...; // Priority of the current job
    double residenceTime = Sk / calculateSum(rho, k-1);
    double waitingTime = 0;
    for (int i = 1; i <= k; i++) {
        waitingTime += pSi[i] * ESi[i] * (2 * ESi[i]) * (1 - calculateSum(rho, k-1)) * (1 - calculateSum(rho, k));
    }
    return residenceTime + waitingTime;
}

double calculateSum(double[] rho, int limit) {
    double sum = 0;
    for (int i = 1; i <= limit; i++) {
        sum += rho[i];
    }
    return sum;
}
```
x??

---


#### First Approach for Analyzing PSJF
We use results from preemptive priority classes where each job’s class is its size and take the limit as the number of classes goes to infinity. Starting with the formula:
\[ E[T(k)]_{P-Priority} = \frac{E[S_k]}{1 - \sum_{i=1}^{k-1} \rho_i + \lambda^2 / \sum_{i=1}^k p_i E[S_i^2] (1 - \sum_{i=1}^{k-1} \rho_i)(1 - \sum_{i=1}^k \rho_i)} \]

Taking the limit as \( k \to \infty \) gives:
\[ E[T(x)]_{PSJF} = x \frac{1 - \rho_x + \lambda / 2 \int_0^x f(t) t^2 dt}{(1 - \rho_x)^2} \]
Where \( f(t) \) is the probability density function of job size, and \( \rho_x = \lambda \int_0^x t f(t) dt \).

:p What is the mean response time for PSJF using this approach?
??x
The mean response time for PSJF can be calculated as:
\[ E[T(x)]_{PSJF} = x \frac{1 - \rho_x + \lambda / 2 \int_0^x f(t) t^2 dt}{(1 - \rho_x)^2} \]
Where \( f(t) \) is the probability density function of job size, and \( \rho_x = \lambda \int_0^x t f(t) dt \).
??x

---


#### Second Approach for Analyzing PSJF
We break down the response time into waiting time and residence time. The waiting time \( E[Wait(x)]_{PSJF} \) can be seen as a busy period duration starting with a job of size \( x \), where only jobs of size \( \leq x \) are considered.

:p What is \( E[Res(x)]_{PSJF} \)?
??x
The residence time \( E[Res(x)]_{PSJF} \) is the length of a busy period started by a job of size \( x \), where only jobs of size \( \leq x \) are considered. Therefore:
\[ E[Res(x)]_{PSJF} = x (1 - \rho_x) \]
Where \( \rho_x = \lambda \int_0^x t f(t) dt \).

:p Can we also think of \( E[Wait(x)]_{PSJF} \) as a busy period duration?
??x
Yes, when a job of size \( x \) arrives, it sees some work. However, not all the work is relevant to it. The only relevant work is that made up by jobs of (original) size \( \leq x \). Let’s call that work \( W_x \).

Now, \( Wait(x) \) can be viewed as the length of a busy period started by a phantom job of size \( W_x \), where the only jobs that make up this busy period are jobs of size \( \leq x \).
??x

---


#### Calculation of \( E[W_x]_{PSJF} \)
\( E[W_x]_{PSJF} \) is the work in the system as seen when job \( x \) puts on transformer glasses that make anyone whose (original) size is greater than \( x \) invisible.

:p What is \( E[W_x]_{PSJF} \)?
??x
The expected work \( E[W_x]_{PSJF} \) can be calculated as the amount of work under PSJF where only jobs of size \( \leq x \) are allowed into the system. Since PSJF is work-conserving, this is equivalent to the time in queue in an FCFS system with only jobs of size \( \leq x \).

\[ E[W_x]_{PSJF} = \lambda F(x) E[S_x^2] / 2 (1 - \rho_x) \]
Where:
- \( S_x \) is the job size of jobs \( \leq x \).
- \( f(t) \) is the density function of job sizes.
- \( F(x) = P(S \leq x) \), the cumulative distribution function.

Therefore, the waiting time can be derived as:
\[ E[Wait(x)]_{PSJF} = E[W_x] / (1 - \rho_x) = E[TQ | where job sizes are S_x] / (1 - \rho_x) \]
??x

---


#### Laplace Transform of Response Time
Background context: The text derives the Laplace transform for the response time in an M/G/1/PSJF queue. This is useful for analyzing performance under different conditions and job sizes.

Relevant formulas:
\[ \tilde{T}(s) = \int_0^\infty \tilde{T}(x)(s)f(x) dx, \]
where \( \tilde{T}(x)(s) \) represents the Laplace transform of the response time for a job of size \( x \).

:p How is the Laplace transform of the response time derived?
??x
The Laplace transform of the response time is derived by conditioning on the job size. The key step involves multiplying the Laplace transform of the waiting and residence times.

x??

---


#### Determining \(\tilde{\text{Wait}}(x)(s)\)
Background context: \(\tilde{\text{Wait}}(x)(s)\) represents the waiting time for a job of size \( x \). This is part of deriving the Laplace transform for response times in M/G/1/PSJF queues.

Relevant formulas:
\[ \tilde{\text{Wait}}(x)(s) = \frac{\tilde{\text{Wait}}(x) (s)}{s + \lambda_x - \lambda_x / \tilde{\text{B}}_x(s)}. \]

:p What is the formula for \(\tilde{\text{Wait}}(x)(s)\)?
??x
The Laplace transform of the waiting time for a job of size \( x \) involves conditioning on the arrival rate and using the busy period duration. The formula accounts for the impact of preemption by other jobs.

x??

---


#### Determining \(\tilde{\text{Res}}(x)(s)\)
Background context: \(\tilde{\text{Res}}(x)(s)\) represents the residence time (busy period) for a job of size \( x \). This is crucial in understanding how long a job stays active under PSJF scheduling.

Relevant formulas:
\[ \tilde{\text{Res}}(x)(s) = e^{-sx} \cdot \hat{\text{A}}_x / (\tilde{\text{B}}_x(s)). \]

:p What is the formula for \(\tilde{\text{Res}}(x)(s)\)?
??x
The Laplace transform of the residence time involves exponential decay due to the job size and busy period duration. The term \( e^{-sx} \) accounts for the starting condition, while the fraction involving \(\tilde{\text{B}}_x(s)\) captures the busy period dynamics.

x??

---


#### Determining \(\tilde{\text{W}}_x(s)\)
Background context: \(\tilde{\text{W}}_x(s)\) is the Laplace transform of the work in system (Wx) for jobs of size \( x \). This helps in understanding the total workload handled by a busy period.

Relevant formulas:
\[ \tilde{\text{W}}_x(s) = \frac{(1 - \rho_x)s}{\lambda_x / \tilde{\text{S}}_x(s) - \lambda_x + s}. \]

:p What is the formula for \(\tilde{\text{W}}_x(s)\)?
??x
The Laplace transform of the work in system for jobs of size \( x \) involves the arrival rate, load factor (ρx), and busy period duration. The formula accounts for the overall workload considering only jobs of size \( x \).

x??

---


#### Summary of Concepts
Background context: This section summarizes the key concepts derived for PSJF scheduling in an M/G/1 queue setting.

:p What are the main equations discussed?
??x
The main equations discuss the expected response time, Laplace transforms of waiting and residence times, and the work in system. These formulas help in analyzing performance under preemptive shortest job first scheduling.

x??

---

