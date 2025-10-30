# High-Quality Flashcards: 7A003--Performance-modeling-and-design-of-computer-systems_processed (Part 41)

**Rating threshold:** >= 8/10

**Starting Chapter:** Chapter 31 Scheduling Non-Preemptive Size-Based Policies. 31.1 Priority Queueing

---

**Rating: 8/10**

#### Non-Preemptive Priority Queueing
Background context: In non-preemptive priority queueing, once a job starts running, it cannot be interrupted even if a higher-priority job arrives. This is common in scenarios where jobs are time-sensitive or resource-intensive and should not be interrupted.
:p What is non-preemptive priority queueing?
??x
In non-preemptive priority queueing, a job that has started execution runs until completion without being interrupted by a higher-priority job. This model is suitable for tasks that must run to completion and cannot be paused or restarted once they begin.
x??

---

#### Preemptive Priority Queueing
Background context: In preemptive priority queueing, the current job in service can be interrupted if a higher-priority job arrives, allowing the higher-priority job to take over. This is useful for interactive jobs that require immediate attention and can be paused or resumed without loss of data.
:p What is preemptive priority queueing?
??x
In preemptive priority queueing, the server preempts the current job in service if a higher-priority job arrives, allowing the new job to start execution immediately. This ensures that high-priority jobs receive immediate attention and do not wait for lower-priority jobs to complete.
x??

---

#### M/G/1 Priority Queue Model
Background context: The M/G/1 priority queue model is used to analyze systems with multiple priority classes. Each class has its own Poisson arrival process and service time distribution, allowing the system to handle different types of jobs efficiently.
:p What is an M/G/1 priority queue?
??x
The M/G/1 priority queue is a queuing model where:
- 'M' stands for Markovian (Poisson) job arrivals
- 'G' represents general service time distribution
- '1' indicates there is one server

This model divides arriving jobs into n priority classes, with class 1 being the highest and class n the lowest. Each class has a Poisson arrival rate λk = λ·pk, where pk is the proportion of jobs in that class.
x??

---

#### Priority Classes in M/G/1 Model
Background context: In the M/G/1 priority queue model, jobs are divided into multiple classes based on their priority levels. The server always serves from the highest non-empty priority class to ensure efficient use of resources and prioritize critical tasks.
:p How are jobs prioritized in an M/G/1 priority queue?
??x
In an M/G/1 priority queue with n priority classes, jobs are divided into separate queues based on their priority levels. The server always serves from the highest non-empty queue, ensuring that higher-priority jobs are attended to first.
Example: If there are 3 priority classes (class 1, class 2, and class 3), the server will:
- First serve from class 1 if it is not empty
- Then move on to class 2 if class 1 is empty but class 2 is not
- Finally, consider class 3 as a last resort
x??

---

#### Average Number of Jobs in Queue (E[NQ(k)])
Background context: The average number of jobs in the queue for each priority class can be calculated using queuing theory formulas. This metric helps understand the congestion and performance of the system.
:p What is E[NQ(k)]?
??x
The expected number of jobs in the queue for a job of priority k, denoted as \(E[NQ(k)]\), can be determined using queuing theory. It represents the average number of jobs of that priority level waiting to be served.

Formula: 
\[E[NQ(k)] = \frac{\lambda_k E[S^2]}{\mu - \lambda_k}\]
where:
- \(\lambda_k\) is the arrival rate for class k
- \(E[S]\) and \(E[S^2]\) are the first and second moments of the service time distribution, respectively
- \(\mu\) is the service rate

Example: If \(\lambda_1 = 0.5\), \(E[S] = 2\), \(E[S^2] = 4\), and \(\mu = 3\):
\[E[NQ(1)] = \frac{0.5 \times 4}{3 - 0.5} = \frac{2}{2.5} = 0.8\]
x??

---

#### Average Time in Queue (E[TQ(k)])
Background context: The average time a job spends waiting in the queue before being served, denoted as \(E[TQ(k)]\), is an important metric for understanding the performance and efficiency of the system.
:p What is E[TQ(k)]?
??x
The expected time a job spends in the queue before being served, denoted as \(E[TQ(k)]\), can be calculated using queuing theory. This metric provides insight into the average waiting time for jobs of each priority level.

Formula:
\[E[TQ(k)] = \frac{1}{\mu - \lambda_k}\]
where:
- \(\lambda_k\) is the arrival rate for class k
- \(\mu\) is the service rate

Example: If \(\lambda_2 = 0.3\) and \(\mu = 4\):
\[E[TQ(2)] = \frac{1}{4 - 0.3} = \frac{1}{3.7} \approx 0.27\]
x??

---

**Rating: 8/10**

#### Non-Preemptive Priority M/G/1 Queue Overview
This section discusses the performance of a non-preemptive priority queueing system where jobs are classified into different priorities. The server's utilization (\(\rho\)) is required to be less than 1, and the average time in the system for each job class \(k\) (E[T(k)]) is derived.
:p What does this section focus on?
??x
This section focuses on analyzing the performance of a non-preemptive priority queueing system where jobs are classified into different priorities. It derives formulas for the average time in the system (\(E[T(k)]\)) for each job class \(k\) and compares these with an FCFS (First-Come, First-Served) system.
x??

#### Derivation of Time in Queue for Priority 1 Jobs
The formula to derive the time in queue (\(E[TQ(1)]\)) for jobs of priority 1 is given. It involves considering both the job currently being served and all jobs already in the queue of higher or equal priorities.
:p What is \(E[TQ(1)]\)?
??x
\(E[TQ(1)]\) is derived by considering two components: (i) the time spent waiting for the current job if one is present, and (ii) the expected service times of all jobs already in the queue of higher or equal priorities.
The formula given is:
\[ E[TQ(1)] = \rho \cdot E[Se] + E[NQ(1)] \cdot E[S1] \]
where \(E[Se]\) is the average service time, and \(E[NQ(1)]\) is the expected number of jobs in queue.
x??

#### Derivation of Time in Queue for Priority 2 Jobs
The formula to derive the time in queue (\(E[TQ(2)]\)) for jobs of priority 2 involves additional terms compared to priority 1, including waiting for all jobs of priorities 1 and 2 already in the queue and those that arrive while the new job is waiting.
:p What does \(E[TQ(2)]\) account for?
??x
\(E[TQ(2)]\) accounts for the time spent by a priority 2 job queuing, which includes:
(i) Waiting for the current job if one is being served,
(ii) All jobs of priorities 1 and 2 already in queue,
(iii) All jobs of priorities 1 that arrive while this new job is waiting (not in service).
The formula given is:
\[ E[TQ(2)] = \rho \cdot E[Se] + E[NQ(1)] \cdot E[S1] + E[NQ(2)] \cdot E[S2] + E[TQ(2)] \cdot \lambda_1 E[S1] \]
This can be simplified and iteratively solved to find the expression for \(E[TQ(2)]\).
x??

#### General Derivation of Time in Queue for Priority k Jobs
The general formula for time in queue (\(E[TQ(k)]\)) for jobs of priority \(k\) is derived using induction. It includes contributions from waiting behind jobs of higher or equal priorities and those arriving after the tagged job.
:p What is the general formula for \(E[TQ(k)]\)?
??x
The general formula for \(E[TQ(k)]\) in a non-preemptive M/G/1 priority queue is:
\[ E[TQ(k)] = \frac{\rho E[Se]}{(1 - \sum_{i=1}^{k} \rho_i)(1 - \sum_{i=1}^{k-1} \rho_i)} \]
where \(E[Se]\) represents the average service time, and \(\rho_i\) is the utilization due to jobs of priority \(i\).
This formula accounts for both waiting behind higher or equal priority jobs and those arriving after.
x??

#### Comparison Between NP-Priority and FCFS Queues
The formulas for \(E[TQ(k)]\) in a non-preemptive priority queue (NP-Priority) and a First-Come, First-Served (FCFS) queue are compared. The key difference lies in the denominator, which accounts for different waiting components.
:p How does the NP-Priority formula differ from the FCFS formula?
??x
The main difference is that in the non-preemptive priority queue:
\[ E[TQ(k)] = \frac{\rho E[Se]}{(1 - \sum_{i=1}^{k} \rho_i)(1 - \sum_{i=1}^{k-1} \rho_i)} \]
The squared denominator accounts for the additional waiting due to jobs of higher or equal priorities and those arriving after. This differs from FCFS, where:
\[ E[TQ] = \frac{\rho E[Se]}{1 - \rho} \]
Here, the single term in the denominator only accounts for waiting behind jobs already in queue.
x??

#### Analysis of High-Priority Job Performance
For high-priority jobs (low \(k\)), the non-preemptive priority system (\(E[TQ(k)]_{NP-Priority}\)) is compared to FCFS. The squared denominator in NP-Priority leads to lower expected waiting times for high-priority jobs.
:p How does NP-Priority handle high-priority jobs better than FCFS?
??x
For low \(k\) (high priority), the term \(\sum_{i=1}^{k} \rho_i\) is much smaller than \(\rho\). Thus, the squared denominator in \(E[TQ(k)]_{NP-Priority}\) leads to a lower expected waiting time compared to FCFS. This advantage holds even if some jobs of higher priority classes arrive after the tagged job.
\[ E[TQ(k)]_{NP-Priority} < E[TQ]_{FCFS} \]
This is because the squared term in the denominator for NP-Priority accounts for both current and future arrivals more effectively.
x??

---

**Rating: 8/10**

#### SJF vs. FCFS Scheduling
Background context explaining the comparison between Shortest Job First (SJF) and First Come First Serve (FCFS) scheduling policies, particularly in non-preemptive scenarios with size-based policies.

The expected time in queue \(E[TQ(x)]\) for both policies can be expressed as:
- For SJF: \(E[TQ(x)]SJF = \rho E[S^2] / 2E[S] \cdot (1 - \rho_x)^2\)
- For FCFS: \(E[TQ(x)]FCFS = \rho E[S^2] / 2E[S] \cdot (1 - \rho)\)

Where \(\rho\) is the load factor, and \(\rho_x\) is typically much less than \(\rho\).

:p How does SJF compare to FCFS in terms of expected time in queue for small jobs?
??x
SJF generally performs better for small jobs because it considers the size of the job. When there are many short jobs, SJF can complete them quickly by always starting with the smallest remaining job. In contrast, FCFS might have a larger \(E[S^2]\) term due to occasional large jobs that can delay smaller ones.

For small jobs (small x), \(E[TQ(x)]SJF\) should be lower than \(E[TQ(x)]FCFS\). However, for very large jobs, SJF's performance may degrade because of the squared factor in the denominator. If the service time distribution is heavy-tailed, SJF might only perform worse on extremely large jobs.

```java
public class JobQueue {
    double rhoX; // Load factor for small jobs
    double rho;  // Overall load factor
    
    public double expectedTimeInQueueSJF() {
        return rho * Math.pow(expectedServiceTime(), 2) / (2 * expectedServiceTime()) * Math.pow(1 - rhoX, 2);
    }
    
    public double expectedTimeInQueueFCFS() {
        return rho * Math.pow(expectedServiceTime(), 2) / (2 * expectedServiceTime()) * (1 - rho);
    }
}
```
x??

---

#### SJF Performance with Heavy-Tailed Distributions
Background context explaining the impact of heavy-tailed job size distributions on the performance of Shortest Job First (SJF).

In a system where job sizes follow a heavy-tailed distribution, the variance \(E[S^2]\) is significantly large. This means that even small jobs can get stuck behind much larger ones, leading to longer waiting times.

:p How does heavy-tailed job size distribution affect SJF's performance for small jobs?
??x
Even with heavy tails, small jobs are still likely to be impacted because they may get delayed by large jobs. The variance in job sizes means that the system can experience significant delays even when processing smaller tasks.

The presence of a few very large jobs can cause significant backlogs and increase the overall waiting time for all jobs, including small ones. This is why SJF might not be optimal in such environments.
x??

---

#### Preemption and Checkpointing
Background context explaining the importance of preemption in scheduling policies, especially when it's not naturally available.

Preemption allows a scheduler to interrupt running tasks to prioritize smaller or more urgent jobs. When preemption isn't available, checkpointing can be used as an alternative method where a job is saved at regular intervals and restarted from the last saved state if interrupted.

:p Why might preemptive policies be better than SJF in systems with heavy-tailed distributions?
??x
Preemptive policies are more effective because they allow the scheduler to interrupt longer-running jobs to make way for smaller, higher-priority jobs. This is crucial when job sizes follow a heavy-tailed distribution, as it helps ensure that short jobs can still get processed promptly.

Without preemption or checkpointing, SJF might not perform well due to the delay caused by large jobs.
x??

---

#### TAGS Policy
Background context explaining the Time-Activated Guarded Scheduling (TAGS) policy, which involves killing and restarting long-running jobs when a queue of short jobs is waiting.

The idea behind TAGS is that killing a running job can prevent it from blocking shorter jobs, thereby improving overall system responsiveness. This policy is particularly useful in environments where job sizes are highly variable and unpredictable.

:p Why might the TAGS policy be beneficial in systems with high job size variability?
??x
TAGS is beneficial because it ensures that short jobs don't get delayed by long-running ones. By periodically killing and restarting longer jobs, the system can ensure that short jobs get a chance to run more frequently, improving overall response times.

This approach is especially useful when the distribution of job sizes is heavy-tailed, as it helps mitigate the impact of large jobs on the system's performance.
x??

---

#### Priority Scheduling for Small Jobs
Background context explaining the optimal scheduling policy for an M/G/1 system with non-preemptive priority scheduling and two job classes (S: small; L: large).

The goal is to minimize the mean waiting time over all jobs by prioritizing smaller jobs, which have a shorter expected service time.

:p How can we prove that class S jobs should get priority in an M/G/1 system?
??x
To prove that class S jobs should get priority, we compare the expected waiting times for both policies (S has priority and L has priority).

For non-preemptive priority scheduling:
- \(E[TQ]NP-Priority(S has priority)\)
  \[
  = \frac{\lambda_S E[S^2]}{2} + \rho_L \frac{\lambda_L E[L^2]}{2}
  \]
- \(E[TQ]NP-Priority(L has priority)\)
  \[
  = \frac{\lambda_L E[L^2]}{2} + \rho_S \frac{\lambda_S E[S^2]}{2}
  \]

Since \(E[SS] < E[SL]\), it follows that:
- If S has priority: \(\frac{\lambda_S E[S^2]}{2} < \frac{\lambda_L E[L^2]}{2}\)
- If L has priority: \(\frac{\lambda_L E[L^2]}{2} > \frac{\lambda_S E[S^2]}{2}\)

Thus, giving S jobs priority minimizes the mean waiting time over all jobs.
x??

---

