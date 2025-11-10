# High-Quality Flashcards: 7A003--Performance-modeling-and-design-of-computer-systems_processed (Part 33)


**Starting Chapter:** 23.7 Exercises

---


#### M/H 2/1 Queue - Excess and Expected Time in Queue

Background context: In an \(M/H_{2/1}\) queue, jobs arrive according to a Poisson process with rate \(\lambda\), and the job sizes are specified as follows:
- With probability \(p\), a job has size 0.
- With probability \(q = 1 - p\), a job has an exponentially distributed service time with mean \(\frac{1}{2}\).

The key performance measures of interest are the expected excess time in the system (Excess) and the expected time spent in the queue (\(E[TQ]\)).

:p What is \(E[Excess]\) for an \(M/H_{2/1}\) queue?
??x
To derive \(E[Excess]\), we need to consider both the service times of jobs with size 0 and those that require actual processing. The excess time in the system for a job can be thought of as its waiting time plus any additional time spent beyond being processed.

For a job of size 0, the excess is simply the waiting time in the queue because it does not consume any service time. For a job with size \(\frac{1}{2}\), the excess includes both the waiting time and the service time minus its actual processing time (which is zero).

The key equation for \(E[Excess]\) involves integrating over the probability distribution of job sizes and their corresponding times:
\[ E[Excess] = p \cdot E[W_0] + q \cdot \left( E[W] + \frac{1}{2} - 0 \right) \]
Where \(W\) is the waiting time in the queue for a job with non-zero service time.

Given that the arrival rate and mean service time are such that \(\rho = \lambda \cdot E[S] < 1\), we can use Little's Law to express \(E[W]\):
\[ E[W] = \frac{\rho}{\mu} \]

Thus, the final expression for \(E[Excess]\) becomes:
\[ E[Excess] = p \cdot E[W_0] + q \cdot \left( \frac{\rho}{2} + \frac{1}{4} \right) \]

:p What is \(E[TQ]\) for an \(M/H_{2/1}\) queue?
??x
The expected time a job spends in the queue (\(E[TQ]\)) can be derived using Little's Law, which states that:
\[ E[TQ] = \frac{\rho}{\mu} \]
Where \(\rho\) is the traffic intensity and \(\mu\) is the service rate.

For an \(M/H_{2/1}\) queue with job sizes specified as above:
- Jobs of size 0 do not contribute to the average waiting time.
- Jobs of size \(\frac{1}{2}\) have a mean service time of \(\frac{1}{4}\).

The overall traffic intensity \(\rho\) is given by the arrival rate and mean service time:
\[ \rho = \lambda \cdot E[S] \]

Given that \(E[S]\) can be calculated as follows:
\[ E[S] = p \cdot 0 + q \cdot \frac{1}{2} = \frac{q}{2} = \frac{1 - p}{2} \]

Thus, the traffic intensity is:
\[ \rho = \lambda \cdot \frac{1 - p}{2} \]

Therefore, the expected time in queue \(E[TQ]\) for an \(M/H_{2/1}\) queue can be expressed as:
\[ E[TQ] = \frac{\rho}{\mu} = \frac{\lambda (1 - p)}{2 \mu} \]

??x
The derived expression for the expected time in the queue (\(E[TQ]\)) is:
\[ E[TQ] = \frac{\lambda (1 - p)}{2 \mu} \]
Where \(\lambda\) is the arrival rate, \(p\) is the probability of a job having size 0, and \(\mu\) is the service rate.

:p What are the steps to derive \(E[Excess]\) in an \(M/H_{2/1}\) queue?
??x
To derive \(E[Excess]\) in an \(M/H_{2/1}\) queue:

1. **Identify Job Sizes and Their Probabilities:**
   - Jobs have size 0 with probability \(p\).
   - Jobs have a service time of \(\frac{1}{2}\) (exponentially distributed) with probability \(q = 1 - p\).

2. **Determine Waiting Time for Each Job Type:**
   - For jobs of size 0, the waiting time is simply the queue length divided by the arrival rate.
   - For jobs of size \(\frac{1}{2}\), the waiting time plus service time minus actual processing time (which is zero) needs to be considered.

3. **Use Little's Law:**
   - The expected excess for a job with non-zero service time involves both the waiting time and the service time.
   - For jobs of size 0, the excess is just their waiting time \(E[W_0]\).
   - For jobs of size \(\frac{1}{2}\), the excess is:
     \[ E[W] + \frac{1}{4} = \frac{\rho}{\mu} + \frac{1}{4} \]

4. **Combine Probabilities:**
   \[ E[Excess] = p \cdot E[W_0] + q \cdot \left( \frac{\rho}{2} + \frac{1}{4} \right) \]
   Where \(E[W]\) is the expected waiting time, which can be expressed as:
   \[ E[W] = \frac{\lambda (1 - p)}{2\mu} \]

5. **Substitute and Simplify:**
   \[ E[Excess] = p \cdot E[W_0] + q \cdot \left( \frac{\rho}{2} + \frac{1}{4} \right) \]
   Given that \(E[W_0]\) is typically 0 for jobs of size 0, the expression simplifies to:
   \[ E[Excess] = (1 - p) \cdot \left( \frac{\rho}{2} + \frac{1}{4} \right) \]

??x
The steps to derive \(E[Excess]\) are as follows:

1. Identify the probability and size of jobs.
2. Use Little's Law for waiting time.
3. Combine probabilities to get the final expression.

:p What is \(E[TQ]\) in an \(M/H_{2/1}\) queue?
??x
The expected time a job spends in the queue (\(E[TQ]\)) in an \(M/H_{2/1}\) queue can be derived using Little's Law, which states:
\[ E[TQ] = \frac{\rho}{\mu} \]
Where \(\rho\) is the traffic intensity and \(\mu\) is the service rate.

For an \(M/H_{2/1}\) queue with job sizes specified as follows:
- Jobs have size 0 with probability \(p\).
- Jobs have a service time of \(\frac{1}{4}\) (exponentially distributed) with probability \(q = 1 - p\).

The traffic intensity \(\rho\) is given by the arrival rate and mean service time:
\[ \rho = \lambda \cdot E[S] = \lambda \cdot \frac{1 - p}{2} \]

Given that \(\mu\) (the service rate) can be derived from the service times, we have:
\[ \mu = 2 \times \text{(mean of exponential distribution)} = 2 \times \frac{1}{4} = \frac{1}{2} \]

Thus, the expected time in queue \(E[TQ]\) is:
\[ E[TQ] = \frac{\lambda (1 - p)}{2 \cdot \mu} = \frac{\lambda (1 - p)}{2 \cdot \frac{1}{2}} = \lambda (1 - p) \]

??x
The expected time a job spends in the queue (\(E[TQ]\)) for an \(M/H_{2/1\) queue is:
\[ E[TQ] = \lambda (1 - p) \]
Where \(\lambda\) is the arrival rate, and \(p\) is the probability of a job having size 0.

---
---


#### Task Assignment Policies for Server Farms

In this chapter, we explore server farms where job sizes are highly variable. Unlike previous studies focusing on exponential job sizes, we now consider scenarios with high variability, which is typical of modern workloads.

The server farm architecture involves multiple slow, inexpensive servers working together to handle incoming requests. This setup offers flexibility in scaling up or down based on the load. Jobs are typically dispatched immediately upon arrival rather than being queued centrally (as seen in M/M/k systems). The choice of task assignment policy significantly impacts performance metrics such as mean response time.

:p What is the server farm model described in this chapter, and how do jobs get assigned to servers?
??x
In this model, incoming jobs are assigned to servers by a front-end router using a specific task assignment policy. There is no central queue; instead, each job goes directly to an available server.
```java
// Pseudocode for simple round-robin task assignment policy
function assignJobToServer(router) {
    // Assume router maintains a list of servers and their current workload
    int index = (router.lastAssignedIndex + 1) % router.numServers;
    Server server = router.servers[index];
    router.assignJob(server, incomingJob);
    router.lastAssignedIndex = index;
}
```
x??

---

#### High Variability Job Sizes

The chapter focuses on scenarios where job sizes are highly variable. This is common in modern workloads but differs from earlier studies that considered exponential job sizes.

This variability complicates the task assignment policy as it can greatly affect performance metrics like response time. The goal is to find a good task assignment policy that minimizes mean response time, especially when jobs have high variability in size.

:p How does variable job size impact the choice of task assignment policy in server farms?
??x
Variable job sizes increase the complexity of choosing an effective task assignment policy because they can dramatically affect the performance metrics such as mean response time. For instance, a policy that works well for small jobs may not perform optimally for large ones.

To address this, different policies are evaluated based on how well they handle variable job sizes and minimize response times.
```java
// Pseudocode for shortest queue task assignment policy
function assignJobToServer(router) {
    int minQueueLength = router.numServers + 1;
    Server bestServer = null;
    for (int i = 0; i < router.numServers; i++) {
        if (router.queueLength[i] < minQueueLength) {
            minQueueLength = router.queueLength[i];
            bestServer = router.servers[i];
        }
    }
    router.assignJob(bestServer, incomingJob);
}
```
x??

---

#### Non-Preemptible Jobs with FCFS Scheduling

This section considers server farms where jobs are non-preemptible and each server serves its queue in First-Come, First-Served (FCFS) order. The goal is to find a task assignment policy that minimizes the mean response time.

:p In this setting, what is the scheduling policy at individual servers?
??x
In this setting, the scheduling policy at individual servers is FCFS. This means each server processes jobs in the order they arrive and does not interrupt a job once it has started processing.
```java
// Pseudocode for FCFS scheduling
function processJob(Server server) {
    while (!server.jobQueue.isEmpty()) {
        Job currentJob = server.jobQueue.poll();
        // Process the current job until completion
        server.process(currentJob);
    }
}
```
x??

---

#### Preemptible Jobs with PS Scheduling

In this scenario, jobs are preemptible and can be interrupted and resumed. Each server serves its queue in Processor Sharing (PS) order, where each job gets a small fraction of the processing power per time unit.

:p What is the key difference between FCFS and PS scheduling?
??x
The key difference between FCFS and PS scheduling is that with FCFS, jobs are processed sequentially from first to last until completion. In contrast, PS allows for simultaneous sharing of processing resources among multiple jobs, where each job gets a portion of the server's capacity.

This can lead to different response times depending on how the task assignment policy allocates incoming jobs.
```java
// Pseudocode for PS scheduling
function processJob(Server server) {
    double fraction = 1.0 / server.numJobsInQueue; // Fraction per job
    while (server.jobQueue.size() > 0) {
        Job currentJob = server.jobQueue.peek();
        // Process the current job with a small fraction of processing power
        server.process(currentJob, fraction);
    }
}
```
x??

---

#### Designing Optimal Server Farms

This section explores how to design optimal server farms where jobs are preemptible and all design decisions (task assignment policy and scheduling) are open. The objective is to minimize mean response time.

:p What are the key design elements considered in this chapter?
??x
The key design elements considered include:
- Task Assignment Policy: How incoming jobs are assigned to servers.
- Scheduling Policy at Servers: How each server manages its job queue (e.g., FCFS, PS).
- Job Preemptibility: Whether jobs can be interrupted and resumed.

These elements interact in complex ways, making it challenging to find the optimal combination for minimizing mean response time.
```java
// Pseudocode for designing an optimal server farm
function optimizeServerFarm(Lambda, mu, jobSizeDistribution) {
    // Lambda - arrival rate of jobs
    // mu - service rate at each server
    // jobSizeDistribution - distribution of job sizes

    TaskAssignmentPolicy bestPolicy = null;
    double minResponseTime = Double.MAX_VALUE;

    for (TaskAssignmentPolicy policy : allPolicies) {
        ServerFarm farm = new ServerFarm(policy, Lambda, mu, jobSizeDistribution);
        double responseTime = farm.meanResponseTime();
        if (responseTime < minResponseTime) {
            bestPolicy = policy;
            minResponseTime = responseTime;
        }
    }

    return bestPolicy;
}
```
x??

---


---
#### Random Policy
Background context explaining the random policy. Each job is assigned to one of k hosts with equal probability. The aim is to equalize the expected number of jobs at each host.

:p What does the Random policy do?
??x
The Random policy assigns each incoming job to one of k hosts with an equal probability (1/k). This ensures that over time, on average, each host will have the same number of jobs. The logic behind this is simple: since we don't know the size or characteristics of each job, distributing them randomly helps in balancing the load.

```java
public class RandomPolicy {
    private int k; // Number of servers

    public void assignJob() {
        Random rand = new Random();
        int serverIndex = rand.nextInt(k); // Assigns a random host index between 0 and k-1
        // Code to run the job on the selected host
    }
}
```
x??

---
#### Round-Robin Policy
Background context explaining the round-robin policy. Jobs are assigned in a cyclical fashion, with the ith job being assigned to host number (i % k) + 1.

:p How does the Round-Robin policy work?
??x
The Round-Robin policy assigns jobs cyclically to hosts. For example, if there are 4 servers, the first job goes to server 0, the second to server 1, and so on. When it reaches the last server (k-1), it wraps around back to the first one.

```java
public class RoundRobinPolicy {
    private int k; // Number of servers
    private int currentIndex = 0; // Tracks which host should receive the next job

    public void assignJob() {
        int serverIndex = currentIndex % k; // Cyclically assigns a host index
        // Code to run the job on the selected host
        currentIndex++;
    }
}
```
x??

---
#### JSQ Policy (Join-the-Shortest-Queue)
Background context explaining the Join-the-Shortest-Queue policy. Each incoming job is assigned to the host with the shortest queue, and if several hosts have the same fewest number of jobs, one is chosen at random.

:p What does the JSQ policy do?
??x
The JSQ (Join-the-Shortest-Queue) policy assigns each incoming job to the host that has the fewest number of jobs in its queue. If there are multiple such hosts, it randomly selects one among them. The goal is to balance the load by keeping the instantaneous number of jobs at each host as similar as possible.

```java
public class JSQPolicy {
    private int k; // Number of servers

    public void assignJob() {
        List<Host> shortestQueueHosts = new ArrayList<>();
        for (int i = 0; i < k; i++) {
            Host host = hosts[i]; // Assume 'hosts' is an array of k Host objects
            if (host.queueSize() == smallestQueueSize) { // Find the smallest queue size
                shortestQueueHosts.add(host);
            }
        }
        int randomIndex = new Random().nextInt(shortestQueueHosts.size()); // Choose a host randomly from those with the smallest queue
        Host selectedHost = shortestQueueHosts.get(randomIndex); // Assign job to this host
    }
}
```
x??

---


---
#### Random vs. Round-Robin Policy Comparison

Background context explaining the difference between the two policies and their performance metrics.

In a **Random** policy, jobs are assigned to servers randomly, while in a **Round-Robin** (RR) policy, jobs are assigned in a cyclic manner among the servers. The performance of these policies can be analyzed using queueing theory concepts like M/G/k for Random and Ek/G/1 for Round-Robin.

:p Which policy – Random or Round-Robin – has lower mean response time?
??x
Round-Robin has a slight edge over Random in terms of mean response time. This is because, under Round-Robin, the arrival process into each queue follows an Erlang-k distribution, which has less variability compared to the Poisson process (M/G/1) seen in the Random policy.

Explanation:
- In the Random policy, each server receives jobs according to a Poisson process with rate λ/k. This means that the interarrival times are exponentially distributed.
- In the Round-Robin policy, the arrival process into each queue is an Erlang-k distribution (sum of k independent exponential random variables), which has less variability than the exponential distribution.

The lower variability in Round-Robin leads to a more predictable workload and thus lower mean response time. 
```java
// Pseudocode for simulating job assignment under both policies
public void simulatePolicy() {
    // Random policy logic
    if (random.nextDouble() < 1 / k) {
        assignToServer(random.nextInt(k));
    }

    // Round-Robin policy logic
    currentServer = (currentServer + 1) % k;
    assignToServer(currentServer);
}
```
x??
---

#### JSQ vs. Round-Robin Policy Comparison

Background context explaining the differences and complexities between these two policies, particularly in handling job size variability.

Just-In-Time Queueing (JSQ) is a policy that balances the number of jobs across all servers dynamically based on their current state. In contrast, Round-Robin assigns jobs cyclically without considering the current state of each server. Analyzing JSQ requires dealing with complex multi-dimensional Markov chains, which are difficult to model and analyze.

:p Which policy – JSQ or Round-Robbin – is more superior under higher job size variability?
??x
JSQ outperforms Round-Robin under higher job size variability due to its ability to dynamically adjust the workload distribution among servers based on their current state. JSQ can quickly redistribute jobs when a queue empties, minimizing idle time and load imbalance.

Explanation:
- In Round-Robin, the assignment of jobs is cyclic and does not adapt to the current state of the system.
- In JSQ, each job is assigned to the server with the fewest current jobs. This dynamic adjustment leads to more efficient use of resources when there are sudden changes in workload due to varying job sizes.

For high variability in job sizes, JSQ can reduce mean response time by an order of magnitude compared to Round-Robin.
```java
// Pseudocode for simulating JSQ policy
public void simulateJSQ() {
    int minJobs = Integer.MAX_VALUE;
    int bestServer = -1;
    
    // Find the server with minimum current jobs
    for (int i = 0; i < k; ++i) {
        if (numJobs[i] < minJobs) {
            minJobs = numJobs[i];
            bestServer = i;
        }
    }
    
    assignToServer(bestServer);
}
```
x??
---


#### JSQ vs. ROUND-ROBIN
Background context: In this section, we compare two dynamic policies for task assignment—JSQ (Join-the-Shortest-Queue) and Round-Robin. Both are designed to keep servers busy but differ in how they handle job assignments.

:p How does JSQ compare with the Round-Robbins policy under high job size variability?
??x
Under high job size variability, JSQ can suffer from underutilization issues where a server is left idle even when other servers have work. This is because JSQ routes jobs to the shortest queue, which might not always be the most efficient in terms of total work load. In contrast, Round-Robin (RR) assigns jobs cyclically and tends to distribute jobs more evenly across servers.

In the context of high job size variability, RR can ensure that no server is left idle as long as there are ≥k jobs available for processing. However, JSQ might have an unutilized server when one queue empties while others still have 5 jobs.
x??

---

#### M/G/k Policy
Background context: The M/G/k policy is a dynamic task assignment strategy that holds off on assigning jobs to servers as long as possible until the total number of jobs reaches k. This helps in keeping all servers busy.

:p How does the M/G/k policy ensure server utilization under high job size variability?
??x
The M/G/k policy ensures that all servers are utilized by waiting for a sufficient number of jobs (≥k) before assigning any of them to servers. This strategy prevents situations where one or more servers remain idle, as in JSQ. The key advantage is that whenever there are ≥k jobs available, every host is busy, leading to better overall utilization and performance.

The logic behind this can be summarized as follows:
- M/G/k waits until the total number of jobs in the system reaches k before starting job dispatch.
- This ensures that no server remains idle when there are enough jobs.

Example pseudocode:
```java
while (totalJobs < k) {
    // Wait for more jobs to arrive
}

// Dispatch all jobs to servers
for (int i = 0; i < numServers; i++) {
    assignJob(i);
}
```
x??

---

#### Least-Work-Left (LWL) Policy
Background context: The LWL policy assigns each job to the queue where it will achieve the lowest possible response time. It aims to equalize the total work at each server, not just the number of jobs.

:p How does the LWL policy ensure server utilization and what is its approach?
??x
The LWL (Least-Work-Left) policy ensures server utilization by assigning each job to the queue where it will achieve the lowest possible response time. This is done by considering the total work in front of each queue when a new job arrives, not just the number of jobs.

Example pseudocode:
```java
for (Queue q : queues) {
    if (q.getTotalWork() == minTotalWork) {
        assignJobTo(q);
    }
}
```

Here, `getTotalWork()` returns the total work left in front of each queue, and `assignJobTo(q)` assigns the job to that queue.

The key difference from JSQ is that LWL focuses on minimizing the waiting time for each job by choosing the queue with the least amount of work. This can be more effective under high job size variability because it better balances the load based on actual remaining work rather than just the number of jobs.
x??

---

#### Equivalence of LWL and M/G/k
Background context: It is stated that both LWL and M/G/k policies are equivalent when fed the same arrival sequence of jobs, with ties resolved in the same way. This means that under identical conditions, these two policies will route jobs to the same servers at the same time.

:p How do we prove that LWL and M/G/k are equivalent?
??x
We can prove the equivalence between LWL and M/G/k by showing that both policies reach the same state over a sequence of job arrivals. Specifically:

1. **Job Arrival**: Consider an arrival sequence of jobs.
2. **Tie Resolution**: Both policies must resolve ties in the same way to ensure consistency.

The key insight is that under the M/G/k policy, a job will be assigned to the server with the least work left after waiting for k or more jobs. This mirrors the LWL policy, which chooses the queue with the minimum total work at the moment of arrival.

Formally, if both policies are fed the same sequence and ties are resolved identically:
```java
public void processJobSequence(Job[] sequence) {
    Queue[] queues = new Queue[numServers];
    
    for (Job job : sequence) {
        int minIndex = findMinWorkQueue(queues);
        assignJobToQueue(minIndex, job);
    }
}

int findMinWorkQueue(Queue[] queues) {
    // Find the queue with minimum total work
    return Arrays.stream(queues).boxed()
                 .min(Comparator.comparingInt(q -> q.getTotalWork()))
                 .get().getIndex();
}
```

This demonstrates that both policies will reach the same state and assign jobs to the same servers at the same times, proving their equivalence.
x??

---

#### Complexity of Analyzing M/G/k
Background context: The analysis of the M/G/k policy is challenging due to its complexity. Even though the simpler M/M/k model is well-understood, extending this understanding to the more complex M/G/k model remains an open problem.

:p Why is analyzing the M/G/k system so difficult?
??x
Analyzing the M/G/k system is difficult because it involves a mixture of arrival and service time distributions that are generally non-Markovian. The key challenges include:

1. **Non-Markovian Arrival and Service Times**: Unlike the simpler M/M/k model, which has exponential inter-arrival times and service times, M/G/k involves general (not necessarily exponential) job sizes and arrival patterns.
2. **Complex State Space**: The state space grows exponentially with the number of servers k, making it computationally intensive to solve analytically or numerically.

To handle this complexity:
- **Phase-Type Distributions**: One approach is to replace the non-exponential distribution G with a phase-type (PH) distribution and use matrix-analytic methods. However, even this yields numerical solutions that lack insight into the system's behavior.
- **Stability Issues**: When using matrix-analytic methods, high skewness in job size distributions can lead to numerical instability due to near-singularity of matrices.

Despite these challenges, M/G/k remains a crucial model for practical applications where job sizes vary significantly.
x??

---

