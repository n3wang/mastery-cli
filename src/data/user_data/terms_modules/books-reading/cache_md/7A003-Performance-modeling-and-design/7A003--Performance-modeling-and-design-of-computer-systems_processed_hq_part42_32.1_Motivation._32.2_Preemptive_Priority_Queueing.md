# High-Quality Flashcards: 7A003--Performance-modeling-and-design-of-computer-systems_processed (Part 42)

**Rating threshold:** >= 8/10

**Starting Chapter:** 32.1 Motivation. 32.2 Preemptive Priority Queueing

---

**Rating: 8/10**

#### Non-Preemptive vs. Preemptive Policies
Background context: The chapter discusses differences between non-preemptive and preemptive scheduling policies, focusing on how they handle job sizes and variability. Non-preemptive policies do not interrupt jobs once started, whereas preemptive policies can pause a job to start another with higher priority or smaller size.
:p What is the key difference between non-preemptive and preemptive scheduling policies?
??x
Non-preemptive policies cannot be interrupted, while preemptive policies can suspend an in-progress job to handle a more urgent or smaller task. This makes preemptive policies potentially more efficient under highly variable job sizes but less straightforward.
x??

---

#### Motivation for Preemptive Policies
Background context: The text highlights that non-preemptive policies suffer from E[S2] factors due to waiting for the excess of jobs in service, which is problematic with high variability in job sizes. In contrast, preemptive policies like PS and PLCFS are generally better but have limitations.
:p What discourages us about non-preemptive scheduling policies under highly variable job size distributions?
??x
Non-preemptive policies suffer from an E[S2] term in their mean response time calculations, which arises because they wait for the excess of jobs currently being serviced. This issue is more pronounced with high variability in job sizes.
x??

---

#### Preemptive Priority Queueing Overview
Background context: The chapter introduces preemptive priority queueing where higher-priority jobs can interrupt lower-priority ones. It uses a network analogy to explain how different packet streams compete for resources based on their priorities.
:p How does preemptive priority queueing differ from non-preemptive queueing?
??x
In preemptive priority queueing, if a job of higher priority arrives, the current job is paused and the higher-priority job starts service. This differs from non-preemptive policies where jobs must complete without interruption.
x??

---

#### Preemption in Network Streams
Background context: The text describes an application scenario involving multiple packet streams with different priorities sharing a communication link. Only one stream can be active at any time, and higher-priority streams preempt the current stream's service.
:p Can you explain the network scenario described?
??x
In this scenario, various packet streams compete for a shared communication link. When a new high-priority stream starts, it preempts the ongoing lower-priority stream until completion. Only one stream can use the link at any moment.
x??

---

#### Mean Time in System (E[T(k)]) Calculation
Background context: The chapter outlines how to calculate E[T(k)]P-Priority for jobs of priority k in a preemptive system, considering the three components: current job service, waiting time before arrival, and total work required from all classes.
:p How is E[T(k)] calculated in a preemptive priority queueing system?
??x
E[T(k)]P-Priority is computed by summing up the expected service time of the current job, the expected waiting time until the next job arrives, and the total remaining work from other classes. This approach accounts for all work required before a job leaves.
x??

---

#### Components of E[T(k)]
Background context: The calculation involves three key components: the remaining service time of the current job, the expected wait time until another job of higher priority arrives, and the sum of the moments E[Sk] from all classes. This breakdown helps in understanding the overall system behavior.
:p What are the three main components of E[T(k)]?
??x
The three main components are:
1. Remaining service time of the current job.
2. Expected wait time until a higher-priority job arrives.
3. Sum of the moments \(E[S_k]\) for all classes.
These components help in accurately estimating the mean time in system for a given priority class.
x??

**Rating: 8/10**

#### Component (2) of E[T(k)] Calculation
Background context: In a preemptive priority queue, we need to determine the expected time required to complete service on all jobs of priority 1 through k already in the system when our arrival walks in. This is component (2) of \(E[T(k)]\). The key difference from non-preemptive systems is that jobs may have been partially worked on.

:p How do we compute component (2) for a preemptive priority queue?
??x
We cannot use the same approach as in non-preemptive queues, where you add up the expected number of jobs in each class weighted by the mean job size. Instead, we need to consider the remaining work due to only jobs of priority 1 through k.

The computation involves considering the total expected remaining work if the system had only arrivals of classes 1 through k and using a work-conserving scheduling order such as FCFS (First-Come-First-Served).

Formula:
\[
(2) = \frac{\lambda}{\sum_{i=1}^k p_i E[S_i]} \left(\frac{1 - \sum_{i=1}^k \rho_i}{\sum_{i=1}^k \rho_i}\right)
\]

Simplified:
\[
(2) = \sum_{i=1}^k \rho_i \frac{E[S_i^2]}{2 E[S_i] (1 - \sum_{i=1}^k \rho_i)} = \frac{\lambda}{1 - \sum_{i=1}^{k-1} \rho_i} + \sum_{i=1}^k \rho_i \frac{E[S_i^2]}{2 E[S_i] (1 - \sum_{i=1}^k \rho_i)}
\]

x??

---

#### Component (3) of E[T(k)] Calculation
Background context: Component (3) of \(E[T(k)]\) is the expected total service time required for all jobs of priority 1 through k-1 that arrive before our arrival. This can be simplified as follows:
\[
(3) = \frac{\sum_{i=1}^{k-1} E[T(i)] \cdot \lambda_i \cdot E[S_i]}{E[T(k)] \sum_{i=1}^{k-1} \rho_i} = \frac{E[T(k)]}{\sum_{i=1}^{k-1} \rho_i}
\]

:p How is component (3) computed?
??x
Component (3) is simplified to:
\[
(3) = \frac{\sum_{i=1}^{k-1} E[T(i)] \cdot \lambda_i \cdot E[S_i]}{E[T(k)] \sum_{i=1}^{k-1} \rho_i}
\]

This formula represents the expected total service time for all jobs of priority 1 through k-1, given by the weighted sum of expected times and considering the mean service times.

x??

---

#### Total Expected Time in System (E[T(k)]P-Priority)
Background context: The total expected time in system \(E[T(k)]_{\text{P-Priority}}\) for a job of class k in a preemptive priority queue is the sum of three components:
1. \(E[S_k]\): Mean service time for a job of priority class k.
2. Component (2) as described above, representing the expected remaining work due to jobs of priorities 1 through k.
3. Component (3), representing the expected total service time required for all jobs of priority 1 through k-1.

Formula:
\[
E[T(k)]_{\text{P-Priority}} = E[S_k] + \sum_{i=1}^k \rho_i \frac{E[S_i^2]}{2 E[S_i] (1 - \sum_{i=1}^k \rho_i)} + \frac{E[T(k)]}{\sum_{i=1}^{k-1} \rho_i}
\]

Simplified:
\[
E[T(k)]_{\text{P-Priority}} = E[S_k] + \frac{\lambda}{1 - \sum_{i=1}^{k-1} \rho_i} + \sum_{i=1}^k \rho_i \frac{E[S_i^2]}{(1 - \sum_{i=1}^k \rho_i) E[S_i]}
\]

:p What is the formula for \(E[T(k)]P-Priority\)?
??x
The total expected time in system for a job of class k under preemptive priority can be computed using the following expression:
\[
E[T(k)]_{\text{P-Priority}} = E[S_k] + \frac{\lambda}{1 - \sum_{i=1}^{k-1} \rho_i} + \sum_{i=1}^k \rho_i \frac{E[S_i^2]}{(1 - \sum_{i=1}^k \rho_i) E[S_i]}
\]

This expression accounts for the mean service time, the remaining work due to jobs of priorities 1 through k, and the total service time required for jobs of priority 1 through k-1.

x??

---

#### Residence Time in Preemptive Priority Queues
Background context: In preemptive queues, the residence time is different from the service time. The residence time includes interruptions where the job may be interrupted by higher-priority jobs and then resumed later. The residence time can be divided into two components:
1. Waiting time (Wait): Time until the job starts serving.
2. Residence time (Res): Time from when the job first receives some service until it leaves the system.

:p What is the difference between residence time and service time in preemptive priority queues?
??x
In preemptive priority queues, the residence time is longer than the service time because it includes all interruptions where the job may be interrupted by higher-priority jobs and then resumed later. The service time only accounts for the actual processing time of the job.

:p How can we interpret \(E[T(k)]P-Priority\)?
??x
The expression \(E[T(k)]_{\text{P-Priority}} = E[S_k] + \frac{\lambda}{1 - \sum_{i=1}^{k-1} \rho_i} + \sum_{i=1}^k \rho_i \frac{E[S_i^2]}{(1 - \sum_{i=1}^k \rho_i) E[S_i]}\) can be interpreted as the total expected time in the system for a job of class k under preemptive priority. It breaks down into:
- The mean service time \(E[S_k]\),
- An adjustment term accounting for the remaining work due to jobs of priorities 1 through k,
- And an additional term representing the total service time required for lower-priority jobs.

x??

---

**Rating: 8/10**

#### First Term Explanation
Background context: The first term \( E[S_k] \left(1 - \sum_{i=1}^{k-1} \rho_i\right) \) represents the mean residence time of a job of class \( k \), denoted as \( E[\text{Res}(k)] \). It calculates the expected length of a busy period started by a job of size \( E[S_k] \), where only jobs of classes 1 through \( k-1 \) are allowed in this busy period.

Formula: 
\[ E[\text{Res}(k)] = E[S_k] \left(1 - \sum_{i=1}^{k-1} \rho_i\right) \]

:p What does the first term \( E[S_k] \left(1 - \sum_{i=1}^{k-1} \rho_i\right) \) represent in a preemptive priority queueing system?
??x
The first term represents the mean residence time of the job of class \( k \), which is equivalent to the expected length of a busy period initiated by a job of size \( E[S_k] \). This busy period only includes interruptions from jobs of classes 1 through \( k-1 \).

```java
// Pseudocode for calculating the mean residence time
public double calculateMeanResidenceTime(double Sk, List<Double> rho) {
    int k = rho.size() + 1; // Class index starts from 1 in the given context
    double sumRho = 0;
    for (int i = 1; i < k - 1; i++) {
        sumRho += rho.get(i);
    }
    return Sk * (1 - sumRho);
}
```
x??

---

#### Second Term Explanation
Background context: The second term in equation \(32.1\) is defined as:
\[ E[\text{Wait}(k)] = \frac{\sum_{i=1}^{k} \rho_i E[S_i^2]} {2E[S_k] (1 - \sum_{i=1}^{k-1} \rho_i)} \left( \frac{1}{1 - \sum_{i=1}^{k} \rho_i} \right) \]

This term represents the mean time until a job of priority \( k \) first receives service. It is almost identical to \( E[\text{TQ}(k)] \) for non-preemptive priority, but accounts only for jobs of class 1 through \( k \).

Formula: 
\[ E[\text{Wait}(k)] = \frac{\sum_{i=1}^{k} \rho_i E[S_i^2]} {2E[S_k] (1 - \sum_{i=1}^{k-1} \rho_i)} \left( \frac{1}{1 - \sum_{i=1}^{k} \rho_i} \right) \]

:p What does the second term in equation \(32.1\) represent?
??x
The second term represents the mean time until a job of priority \( k \) first receives service. It accounts only for jobs of class 1 through \( k \), unlike the non-preemptive case, which considers all classes.

```java
// Pseudocode for calculating the waiting time
public double calculateWaitingTime(List<Double> rho, List<Double> E_Squared, double Sk) {
    int k = rho.size() + 1; // Class index starts from 1 in the given context
    double sumRho = 0;
    for (int i = 1; i < k - 1; i++) {
        sumRho += rho.get(i);
    }
    double numerator = 0;
    for (int i = 1; i <= k; i++) {
        numerator += rho.get(i-1) * E_Squared.get(i-1);
    }
    return numerator / (2 * Sk * (1 - sumRho)) * (1.0 / (1 - sumRho));
}
```
x??

---

#### Preemptive vs Non-preemptive Comparison
Background context: In the case of non-preemptive priority and Shortest Job First (SJF), a high-priority job does not necessarily perform well due to the variability in job sizes. However, in preemptive priority, this is different because a high-priority job only sees variability from lower-priority jobs.

:p Is a high-priority job in a preemptive priority queue guaranteed to have better performance than in non-preemptive priority, even with high variability in job sizes?
??x
Yes, a high-priority job in a preemptive priority queue is more likely to have better performance. This is because the mean residence time and waiting time depend only on the first \( k \) classes of jobs (where \( k \) is the priority level). Thus, higher-priority jobs see less variability compared to non-preemptive systems where all job sizes contribute.

```java
// Pseudocode for comparing preemptive vs. non-preemptive priority
public double calculatePerformancePreemptive(double Sk, List<Double> rho, List<Double> E_Squared) {
    int k = rho.size() + 1;
    double sumRhoNonPreemptive = 0;
    for (int i = 1; i <= k; i++) {
        sumRhoNonPreemptive += rho.get(i-1);
    }
    
    // Preemptive performance
    double preemptiveMeanResidenceTime = Sk * (1 - sumRhoNonPreemptive + rho.get(k-1));
    double preemptiveWaitingTime = calculateWaitingTime(rho, E_Squared, Sk);
    
    // Non-preemptive performance for comparison
    double nonPreemptiveWaitingTime = calculateNonPreemptiveWaitingTime(rho, E_Squared);
    
    return preemptiveMeanResidenceTime + preemptiveWaitingTime < nonPreemptiveWaitingTime;
}

public double calculateNonPreemptiveWaitingTime(List<Double> rho, List<Double> E_Squared) {
    // Similar to the waiting time calculation but without truncation
}
```
x??

---

#### Non-preemptive Priority Comparison
Background context: In a non-preemptive priority system, the excess due to job size variability is contributed by all classes. This means that high-priority jobs see more of this variability than in preemptive systems.

:p How does the non-preemptive priority system differ from the preemptive system in terms of job size variability?
??x
In a non-preemptive priority system, the excess due to job size variability is contributed by all classes. This means that high-priority jobs see more variability compared to preemptive systems, where only lower-priority jobs affect their service times.

```java
// Pseudocode for calculating non-preemptive performance
public double calculateNonPreemptivePerformance(double E_Squared_k) {
    int k = rho.size() + 1;
    double sumRho = 0;
    for (int i = 1; i <= k; i++) {
        sumRho += rho.get(i-1);
    }
    
    return (rho.get(k-1) * E_Squared_k) / (2 * E_Sk * (1 - sumRho)) * (1.0 / (1 - sumRho));
}
```
x??

---

**Rating: 8/10**

#### SRPT Overview
SRPT stands for Shortest-Remaining-Processing-Time scheduling. Under this policy, at all times the server is working on that job with the shortest remaining processing time. This policy is preemptive, meaning a new arrival will preempt the current job serving if the new arrival has a shorter remaining processing time.
:p Can you explain SRPT in your own words?
??x
SRPT selects the job to be served based on its remaining processing time. When a new job arrives, it can interrupt an ongoing job if the new job's remaining processing time is less than that of the current job. This makes sure shorter jobs are given priority as they age.
x??

---
#### Response Time Analysis in M/G/1 Setting
The response time for SRPT in the M/G/1 setting includes both waiting time and residence time. The formula for the expected response time \( E[T(x)] \) is:
\[ E[T(x)] = E[Wait(x)] + E[Res(x)] \]
where
\[ E[Wait(x)] = \frac{\lambda^2}{\int_0^x t^2 f(t) dt} + \frac{\lambda^2 x^2 (1 - F(x))}{(1 - \rho_x)^2} \]
and 
\[ E[Res(x)] = \int_0^x \frac{dt}{1 - \rho_t}, \quad \text{with } \rho_x = \frac{\lambda}{\int_0^x t f(t) dt}. \]

:p What is the formula for \( E[T(x)] \)?
??x
The expected response time \( E[T(x)] \) in SRPT is given by:
\[ E[T(x)] = E[Wait(x)] + E[Res(x)], \]
where \( E[Wait(x)] \) and \( E[Res(x)] \) are the waiting time and residence time, respectively.
x??

---
#### Residence Time Understanding
The term representing mean residence time for a job of size \( x \) under SRPT is:
\[ E[Res(x)] = \int_0^x \frac{dt}{1 - \rho_t}. \]

:p Why does the residence time in SRPT increase as the job ages?
??x
In SRPT, a job’s "priority" increases over time. Therefore, once a job has started service, its effective slowdown factor should depend on its remaining service requirement \( t \) and be related to the load of all jobs with smaller sizes. As a job ages, it encounters more and smaller jobs in the system, causing it to take longer to complete.
x??

---
#### Waiting Time Analysis
The waiting time for SRPT is given by:
\[ E[Wait(x)] = \frac{\lambda^2}{\int_0^x t^2 f(t) dt} + \frac{\lambda^2 x^2 (1 - F(x))}{(1 - \rho_x)^2}. \]

:p What does the second term in \( E[Wait(x)] \) represent?
??x
The second term, \( \frac{\lambda^2 x^2 (1 - F(x))}{(1 - \rho_x)^2} \), represents the contribution of jobs with sizes greater than \( x \) to the waiting time. It suggests that larger jobs contribute more significantly as they are still in the system and have a higher remaining processing time.
x??

---
#### SRPT vs PSJF
The response time for SRPT can be compared to PSJF (Shortest Job First). The waiting time expression for SRPT, when ignoring the second term:
\[ E[Wait(x)] = \frac{\lambda^2}{\int_0^x t^2 f(t) dt} + \frac{\lambda^2 x^2 (1 - F(x))}{(1 - \rho_x)^2}, \]
resembles that of PSJF, where only jobs with size \( \leq x \) contribute to the waiting time.
:p How does SRPT's waiting time compare to PSJF?
??x
SRPT’s waiting time expression is similar to PSJF but includes an additional term representing the contribution from larger jobs. This means that in SRPT, all job sizes contribute to the waiting time of a job, not just those smaller than or equal to \( x \).
x??

---
#### FB Scheduling Comparison
The numerator of \( E[Wait(x)]_{SRPT} \) is similar to \( E[S^2_x] \), used in FB (Fairness-Based) scheduling. The formula for the numerator in SRPT waiting time:
\[ \lambda^2 E[S^2_x], \]
is analogous to FB's approach.
:p How does SRPT’s waiting time expression compare to FB?
??x
SRPT’s waiting time expression has a similar numerator structure to FB, where \( \lambda^2 E[S^2_x] \) represents the expected contribution from all job sizes. However, the denominator involves \( \rho_x \), as in PSJF, because only jobs of size \( \leq x \) are allowed to enter the busy period.
x??

---

**Rating: 8/10**

#### SRPT Waiting Time Derivation Overview
Background context: The text discusses the precise derivation of the SRPT (Shortest Remaining Processing Time) waiting time, focusing on how work found by an arrival affects its waiting time. This involves understanding the work seen by an arrival before it starts running and the busy periods associated with this work.
:p What is \( W_{SRPT}^x \) in the context of SRPT?
??x
\( W_{SRPT}^x \) represents the work found in the system that is "relevant" to an arriving job of size \( x \), meaning the work that runs before the arrival of size \( x \) starts running.
x??

---
#### Work Found by Arrival of Size x (WSRP Tx)
Background context: The SRPT algorithm considers two types of jobs when determining the work found by an arrival of size \( x \): type a and type b. Type a includes jobs that are in the system with original size \( \leq x \), while type b includes jobs originally larger than \( x \) but now reduced to size \( \leq x \).
:p How many type b jobs can there be?
??x
There can be at most one job of type b. Furthermore, no more type b jobs will enter the system until the arrival of size \( x \) has left the system entirely.
x??

---
#### Work Type a and b Analysis
Background context: The analysis for work made up of both type a and type b jobs involves breaking down the queueing system into two parts: the queue part (type a jobs only) and the server part (type a and type b jobs). This allows treating type b jobs as having priority over type a jobs.
:p Why does the analysis consider the queue and server parts separately?
??x
The queue and server parts are considered separately to simplify the analysis. By treating type b jobs as arriving directly into the server, we ensure they never enter the queue part, allowing us to use FCFS principles for type a jobs in the queue.
x??

---
#### Tagged Job Argument for Type a Arrivals
Background context: To determine the mean delay \( E[T_Q] \) for a type a arrival, a tagged job argument is used. This involves calculating the expected number of type a jobs in the queue and their service time.
:p How is the mean delay \( E[T_Q] \) calculated?
??x
The mean delay \( E[T_Q] \) for a type a arrival is calculated by considering the number of type a jobs in the queue, denoted as \( N_Q \), and their expected remaining service times. The formula uses the probability that an arriving job finds a busy server, which is \( \rho_x \), and the expected excess service time.
x??

---
#### Detailed Calculation for Mean Delay
Background context: Using a tagged-job argument, we can calculate the mean delay \( E[T_Q] \) by considering the number of type a jobs in the queue and their expected remaining service times. This involves integrating job size distributions to find the fraction of time the server is busy.
:p What formula represents the mean delay for a type a arrival?
??x
The mean delay \( E[T_Q] \) can be calculated using the formula:
\[ E[T_Q] = \frac{\lambda E[S_x]}{1 - \rho_x} \cdot \frac{E[S^2_x]}{2E[S_x]} \]
Where \( \lambda \) is the arrival rate, \( E[S_x] \) is the expected job size, and \( \rho_x = \lambda E[S_x] \).
x??

---
#### Example Code for Calculation
Background context: The calculation involves integrating over the job size distribution to find the fraction of time the server is busy.
:p Provide an example code snippet in Java to calculate \( E[T_Q] \)?
??x
```java
public class SRPTWaitingTime {
    public static double calculateE_TQ(double lambda, double[] sDistribution) {
        double rho = lambda * expectedJobSize(sDistribution);
        double E_S2_x = 0;
        
        for (int i = 0; i < sDistribution.length; i++) {
            E_S2_x += sDistribution[i] * Math.pow(i, 2);
        }
        
        return (lambda * expectedJobSize(sDistribution) / (1 - rho)) * (E_S2_x / (2 * expectedJobSize(sDistribution)));
    }

    private static double expectedJobSize(double[] sDistribution) {
        // Calculate the expected job size from the distribution
        return 0;
    }
}
```
x??

---
#### Conclusion on SRPT Waiting Time
Background context: The derivation of the SRPT waiting time involves understanding how work found by an arrival affects its waiting time, broken down into type a and b jobs. By treating type b jobs as having priority over type a jobs, we can use FCFS principles for simpler analysis.
:p What is the key takeaway from this section?
??x
The key takeaway is that the SRPT waiting time involves analyzing both types of jobs (a and b) found by an arrival, where type b jobs are treated with high priority to ensure they never enter the queue part. This allows using FCFS principles for simpler analysis while accurately calculating the waiting time.
x??

---

