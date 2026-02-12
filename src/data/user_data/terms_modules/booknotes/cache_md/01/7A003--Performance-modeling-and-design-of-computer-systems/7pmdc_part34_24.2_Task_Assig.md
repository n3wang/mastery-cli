# High-Quality Flashcards: 7A003--Performance-modeling-and-design-of-computer-systems_processed (Part 34)


**Starting Chapter:** 24.2 Task Assignment for PS Server Farms

---


#### ROUND-ROBIN Optimal for Deterministic Job Sizes
When job sizes are deterministic (e.g., all jobs have size 1), the ROUND-ROBIN policy is optimal because it maximally spaces out arrivals to a server, ensuring no delays if both job sizes and interarrival times are deterministic.
:p In what scenario does the ROUND-ROBIN policy perform optimally?
??x
The ROUND-ROBIN policy performs optimally when job sizes and interarrival times are deterministic. This is because in such scenarios, the load can be evenly distributed among servers without any delays, as each server handles jobs at regular intervals.
```java
// Example of a simple ROUND-ROBIN scheduling logic
public class RoundRobinScheduler {
    private List<Server> servers;
    
    public void dispatchJob(Job job) {
        // Find the next available server to handle the job
        Server nextServer = findNextAvailableServer();
        nextServer.handleJob(job);
    }
    
    private Server findNextAvailableServer() {
        for (int i = 0; i < servers.size(); i++) {
            if (!servers.get(i).isBusy()) {
                return servers.get(i);
            }
        }
        // If all servers are busy, wait for one to become available
        synchronized (this) {
            while (!servers.stream().anyMatch(Server::isFree)) {
                try {
                    wait();
                } catch (InterruptedException e) {
                    Thread.currentThread().interrupt();
                }
            }
            return findNextAvailableServer(); // Retry finding an available server
        }
    }
}
```
x??

---

#### JSQ and ROUND-ROBIN Equivalence with Deterministic Jobs
Under the condition of deterministic job sizes, the JSQ (Join the Shortest Queue) policy behaves similarly to the ROUND-ROBIN policy. This is because the shortest queue will be the one that has not received a new job in the longest time.
:p How do JSQ and ROUND-ROBIN policies compare when job sizes are deterministic?
??x
When job sizes are deterministic, both the JSQ and ROUND-ROBIN policies essentially perform the same task. This is due to the fact that under these conditions, the shortest queue will be the one that has not received a new job in the longest time, which aligns with how ROUND-ROBIN distributes jobs evenly.
```java
// Example of JSQ logic
public class JsqScheduler {
    private List<Server> servers;
    
    public void dispatchJob(Job job) {
        // Find the server with the shortest queue length
        Server targetServer = findShortestQueue();
        targetServer.handleJob(job);
    }
    
    private Server findShortestQueue() {
        return servers.stream().min(Comparator.comparingInt(server -> server.queueLength())).orElse(null);
    }
}
```
x??

---

#### LWL (Last-Was-Least) Policy with Deterministic Jobs
The Last-Was-Least (LWL) policy also behaves like ROUND-ROBIN when job sizes are deterministic. This is because the shortest queue will be the one that has not received a new job in the longest time.
:p How does the LWL policy behave under deterministic job conditions?
??x
Under deterministic job conditions, the LWL policy behaves similarly to the ROUND-ROBIN policy. The reason is that the shortest queue will be the one that has not received a new job in the longest time, which mirrors how ROUND-ROBIN distributes jobs.
```java
// Example of LWL logic
public class LwlScheduler {
    private List<Server> servers;
    
    public void dispatchJob(Job job) {
        // Find the server with the shortest queue length (same as LWL)
        Server targetServer = findShortestQueue();
        targetServer.handleJob(job);
    }
    
    private Server findShortestQueue() {
        return servers.stream().min(Comparator.comparingInt(server -> server.queueLength())).orElse(null);
    }
}
```
x??

---

#### RANDOM Policy with Deterministic Jobs
The RANDOM policy, when job sizes are deterministic, can still provide low mean response times despite occasional mistakes of sending two consecutive jobs to the same queue. This is because in such scenarios, the delay incurred by these mistakes is minimal.
:p How does the RANDOM policy perform under conditions of deterministic job sizes?
??x
Under deterministic job sizes, the RANDOM policy performs well even with occasional mistakes of sending two consecutive jobs to the same queue. These mistakes do not significantly impact mean response times because the overall system remains balanced and efficient. Poisson splitting shows that in a Deterministic/Markov/1 (M/D/1) system, delays are halved compared to an M/M/1 system.
```java
// Example of RANDOM logic with deterministic jobs
public class RandomScheduler {
    private List<Server> servers;
    
    public void dispatchJob(Job job) {
        // Randomly select a server from the list
        int randomIndex = (int) (Math.random() * servers.size());
        servers.get(randomIndex).handleJob(job);
    }
}
```
x??

---

#### SITA Policy with Deterministic Jobs
The Successive-Interval-Type Allocation (SITA) policy reduces to RANDOM when job sizes are deterministic, as all jobs have the same size. This means that the choice of server does not matter in terms of reducing response time.
:p What happens to the SITA policy when job sizes are deterministic?
??x
When job sizes are deterministic, the SITA policy effectively becomes similar to the RANDOM policy because the size of each job is the same. In such cases, choosing a server randomly has the same outcome as using more sophisticated allocation strategies, leading to minimal differences in response times.
```java
// Example of SITA logic with deterministic jobs
public class SitAScheduler {
    private List<Server> servers;
    
    public void dispatchJob(Job job) {
        // Randomly select a server from the list (same as RANDOM)
        int randomIndex = (int) (Math.random() * servers.size());
        servers.get(randomIndex).handleJob(job);
    }
}
```
x??


#### Job Size Distributions and Their Characteristics
Background context explaining that the text discusses various job size distributions, each with a mean of 2 but increasing variance. The distributions range from deterministic to bimodal, with specific examples provided.

:p What are the different types of job size distributions mentioned in Table 24.3?
??x
The answer includes the names and characteristics of the distributions:
- Deterministic: Point mass at 2 (Variance = 0)
- Erlang-2: Sum of two Exp(1) random variables (Mean = 2, Variance = 2)
- Exponential: Exp(0.5) random variable (Mean = 2, Variance = 4)
- Bimodal-1: 1 with probability 0.9 and 11 with probability 0.1 (Mean = 2, Variance ≈ 2.96)
- Weibull-1: Shape parameter 0.5, scale parameter 1 (Mean = 2, Variance ≈ 2)
- Weibull-2: Shape parameter 1/3, scale parameter 1/3 (Mean = 2, Variance ≈ 7.96)
- Bimodal-2: 1 with probability 0.99 and 101 with probability 0.01 (Mean = 2, Variance ≈ 98.01)

The distributions increase in variance from top to bottom.

??x
---

#### Server Farm Load and Job Assignment Policies
Background context explaining that the server farm load is ρ=0.9, and various task assignment policies are discussed under different job size distributions.

:p What is the performance of different task assignment policies as the job size variability increases?
??x
The answer describes how ROUND-ROBIN and LWL (Least Work Left) policies perform worse with higher variance, while SITA, RANDOM, and JSQ policies show less sensitivity to job size variability. JSQ is noted as being particularly effective.

?: How does JSQ compare to OPT-0 policy in terms of performance?
??x
JSQ performs within about 5 percent of OPT-0 for all job size distributions considered. OPT-0 minimizes the mean response time by considering all current jobs, whereas JSQ assigns jobs based on the number of jobs per server.

?: What is the significance of the JSQ policy in server farms with PS servers?
??x
JSQ is highlighted as an excellent policy for server farms with PS servers due to its effectiveness in mitigating delays caused by high job size variability. In contrast, it is noted that JSQ performs poorly on server farms with FCFS servers.

??x
---

#### Optimal Task Assignment Policies and Their Performance
Background context explaining the performance of various task assignment policies (JSQ, SITA, RANDOM) under different job distributions. The text also mentions comparing JSQ against OPT-0 policy.

:p What is the OPT-0 policy?
??x
OPT-0 assigns each incoming job to minimize the mean response time for all jobs currently in the system, assuming zero future arrivals. It is not greedy from an incoming job's perspective but aims to optimize across all current jobs.

?: How does JSQ compare to OPT-0 in terms of performance?
??x
JSQ outperforms other policies and performs within 5 percent of OPT-0 for all considered job size distributions, indicating its near-optimality.

??x
---

#### Preemptive Server Farms vs. FCFS Servers
Background context explaining that the text focuses on preemptive server farms (PS) with high job size variability, contrasting this with previous sections dealing with FCFS servers.

:p How does task assignment differ for preemptive versus FCFS servers?
??x
Task assignment policies like JSQ perform well in preemptive server farms due to their effectiveness against high job size variability. In contrast, JSQ performs poorly on FCFS server farms because it is ineffective at mitigating delays caused by high job size variability.

??x
---


#### SRPT Policy for Single Queue
Background context explaining that the Shortest Remaining Processing Time (SRPT) policy is optimal with respect to mean response time when there's a single queue and fully preemptible jobs, regardless of the arrival sequence.

:p What is the best scheduling policy on every arrival sequence for a single queue with fully preemptible jobs?
??x
The SRPT policy, which always runs the job with the shortest remaining processing time preemptively, is optimal in terms of mean response time. This result holds under any arrival sequence of job sizes and arrival times.
??x

---

#### Central-Queue-SRPT Policy for Server Farms
Background context explaining that the Central-Queue-SRPT policy extends the SRPT idea to server farms where k servers handle jobs with the shortest remaining processing time, maintaining a single queue.

:p What is the Central-Queue-SRPT policy in the context of server farm design?
??x
The Central-Queue-SRPT policy involves having k servers always serving those k jobs with the currently shortest remaining processing times. If a job arrives with shorter remaining time than the current job on any server, that arrival is immediately put into service at the appropriate server, and the prior job being served is returned to the queue.
??x

---

#### Limitations of Central-Queue-SRPT Policy
Background context explaining the limitations of the Central-Queue-SRPT policy by providing an example where it does not produce minimal mean response time.

:p Is the Central-Queue-SRPT policy optimal in the worst-case sense? Provide an example to illustrate.
??x
The Central-Queue-SRPT policy is not always optimal in the worst-case sense. An example with a 2-server system shows that at certain times, the optimal algorithm can pack jobs differently to achieve better performance than SRPT.

For instance:
- At time 0: 2 jobs of size 29 arrive, and 1 job of size 210.
- At time 210: 2 jobs of size 28 arrive, and 1 job of size 29.
- At time 210 + 29: 2 jobs of size 27 arrive, and 1 job of size 28.
- And so forth.

The optimal algorithm would pack the jobs differently to ensure both servers are fully utilized at all times, resulting in better mean response time than SRPT.
??x

---

#### Example of Optimal Algorithm
Background context explaining how an optimal algorithm can achieve better performance by packing jobs efficiently.

:p How does the optimal algorithm handle job arrivals and server utilization?
??x
The optimal algorithm packs jobs in such a way that both servers are fully utilized at all times. For example, consider a 2-server system:
- At time 0: Assign 2 jobs of size 29 to Server A and 1 job of size 210 to Server B.
- At time 210: Reassign the remaining work from Server A (jobs of size 28) to Server A and assign new jobs of size 29 to Server B, ensuring both servers are continuously utilized.

This packing strategy ensures minimal mean response time by keeping servers busy without idle periods.
??x

---

Each flashcard should cover a specific aspect of the provided text, helping with understanding and recall.


#### Server Farm with Size-Interval-Task-Assignment (SITA)
Background context: In a server farm, jobs are assigned to servers based on their size. Here, small jobs (<10 units) go to Host 1 and large jobs (≥10 units) go to Host 2. Jobs arrive according to a Poisson process with rate λ, and job sizes follow a power-law distribution.
:p What is the mean response time E[T] for this system?
??x
To derive the mean response time E[T], we need to consider the service times at each server and their respective probabilities of being small or large. The response time can be calculated as follows:
- For small jobs (S < 10), the service time is T1 = S / μ1, where μ1 is the service rate for Host 1.
- For large jobs (S ≥ 10), the service time is T2 = S / μ2, where μ2 is the service rate for Host 2.

The mean response time E[T] can be computed using the law of total expectation:
$$E[T] = \lambda \left( \int_{0}^{10} \frac{t}{\mu_1} f_S(t) dt + \int_{10}^{\infty} \frac{t}{\mu_2} f_S(t) dt \right)$$where $ f_S(t)$ is the probability density function of job sizes.

For a different power-law distribution, we can adjust the exponents accordingly. For instance, with P{S>x}=x−1.5, the mean response time would be:
$$E[T] = \lambda \left( \int_{0}^{10} \frac{t}{\mu_1} t^{-1.5} dt + \int_{10}^{\infty} \frac{t}{\mu_2} t^{-1.5} dt \right)$$??x
---

#### PS Server Farm with SITA Task Assignment
Background context: A server farm has two identical PS ( Processor Sharing ) hosts and uses a SITA task assignment policy to distribute jobs based on their size intervals.
:p Prove that the SITA cutoff which minimizes mean response time is that which balances load between the two hosts.
??x
To minimize the mean response time, we need to balance the load on both servers. The key idea is to find a job size threshold such that the fraction of jobs sent to each host is equal.

Let $x $ be the cutoff value. If small jobs (size <$x $) are routed to Host 1 and large jobs (size ≥$ x$) are routed to Host 2, we need to balance their expected arrival rates:
$$\text{Fraction of small jobs} = P(S < x)$$
$$\text{Fraction of large jobs} = P(S \geq x)$$

For a balanced load, these fractions should be equal. Therefore, the optimal $x$ is where:
$$P(S < x) = 0.5$$

This ensures that half the jobs are sent to each host, balancing the load and minimizing the mean response time.
??x
---

#### Hybrid Server Farm with SITA Task Assignment
Background context: A server farm has two identical hosts, one handling small jobs (S < 10) using FCFS scheduling and the other handling large jobs (S ≥ 10) using PS scheduling. The job size distribution is given, and the load balancing condition is that ρ = λE[S] / 2.
:p Derive an expression for E[T], the mean response time experienced by an arriving job, as a function of ρ, λ, fS(t), and FS(t).
??x
The mean response time $E[T]$ can be derived using the properties of FCFS and PS queues.

For small jobs (S < 10):
- The arrival rate is $\lambda P(S < 10)$- Service time is $ T_1 = S / μ_1$, where $μ_1$ is the service rate for Host 1

The mean response time for FCFS:
$$E[T_{\text{small}}] = \frac{\lambda P(S < 10)}{\mu_1} + \frac{\int_{0}^{10} \frac{t}{\mu_1^2} f_S(t) dt}{\mu_1 - \lambda P(S < 10)}$$

For large jobs (S ≥ 10):
- The arrival rate is $\lambda P(S \geq 10)$- Service time is $ T_2 = S / μ_2$, where $μ_2$ is the service rate for Host 2

The mean response time for PS:
$$E[T_{\text{large}}] = \frac{\lambda P(S \geq 10)}{\mu_2} + \frac{\int_{10}^{\infty} \frac{t}{\mu_2^2} f_S(t) dt}{\mu_2 - \lambda P(S \geq 10)}$$

Combining these, the total mean response time is:
$$

E[T] = E[T_{\text{small}}] + E[T_{\text{large}}]$$??x
---

#### Equivalence of LWL and M/G/k
Background context: The Local Wait List (LWL) and M/G/k systems are compared when fed the same arrival sequence under identical conditions.
:p Prove by induction that each job is served by the same server in both systems.
??x
To prove this, we use mathematical induction.

**Base Case:** For one job, it is trivially true since only one server will be used in both LWL and M/G/k.

**Inductive Step:**
Assume that for $n $ jobs, each job is served by the same server in both systems. We need to show that adding a new job (job$n+1$) maintains this property.

- In LWL, when a new job arrives, it will be added to the wait list of the same server as the previous job if possible.
- In M/G/k, each job follows its service sequence independently. However, under identical conditions and tied resolution, both systems treat jobs identically.

By induction, this holds for all $n$ jobs, ensuring that each job is served by the same server in both LWL and M/G/k.
??x
---

#### One Fast Machine vs Two Slow Ones (Heavy-Tailed Job Sizes)
Background context: Comparing the performance of one fast machine versus two slow machines with heavy-tailed job sizes. The processing time on a fast machine is halved for large jobs, while small jobs have linear service times.
:p Compute E[TQ] as a function of λ in both cases and determine which case results in lower mean waiting time.
??x
For the single "fast" machine (M/G/1):
- Service rate $\mu = 2s $ for large jobs,$ s$ for small jobs
- Arrival rate $\lambda$

Mean waiting time:
$$E[T_{Q,1}] = \frac{\rho^2}{2(1-\rho)} + \frac{1}{\mu_1}$$where $\rho = \lambda / (3s)$.

For two slow machines (each with rate 0.5s):
- Each machine handles half the jobs
- Mean waiting time for each machine:
$$E[T_{Q,2}] = \frac{\left(\frac{\lambda}{2}\right)^2}{1 - \frac{\lambda}{2}} + \frac{1}{0.5s}$$

Combining both machines' waiting times:
$$

E[T_{Q,2}] = 2 \times \left( \frac{\left(\frac{\lambda}{2}\right)^2}{1 - \frac{\lambda}{2}} + \frac{1}{0.5s} \right)$$

By comparing $E[T_{Q,1}]$ and $E[T_{Q,2}]$, we find that the single fast machine results in lower mean waiting time due to better utilization of resources.
??x
---

#### Load Balancing or Not (Bounded Pareto Job Size Distribution)
Background context: Evaluating whether load balancing between two identical FCFS hosts is always beneficial or if unbalancing can improve performance.
:p Determine the cutoff x under SITA-E and its impact on E[TQ].
??x
Under SITA-E, the cutoff $x$ balances the load at the two hosts. Given:
$$\rho = 0.5$$and a Bounded Pareto distribution with mean 3,000.

The cutoff $x $ can be determined by solving for the median of the distribution to ensure equal expected loads on both servers. Once found, calculate$E[TQ]$.

To find the optimal $x$:
$$P(S < x) = 0.5$$

Using this value, compute the mean response time for each server and sum them up.

Unbalancing can be done by slightly adjusting $x$ to see if it improves performance.
??x
--- 

---
These flashcards cover key concepts from the provided text, focusing on server farm task assignment policies, load balancing, and system comparison. Each card is designed to test understanding of specific aspects of the described scenarios. 
??x
---

