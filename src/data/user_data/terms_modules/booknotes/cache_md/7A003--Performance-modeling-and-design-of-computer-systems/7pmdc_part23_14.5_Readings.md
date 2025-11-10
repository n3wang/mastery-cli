# High-Quality Flashcards: 7A003--Performance-modeling-and-design-of-computer-systems_processed (Part 23)


**Starting Chapter:** 14.5 Readings

---


#### M/M/1 vs M/M/k Comparison
Background context: This concept compares the \(M/M/1\) and \(M/M/k\) systems in terms of their mean response time. The objective is to understand how the load \(\rho = \frac{\lambda}{k\mu}\) affects the performance in both configurations.

Relevant formulas:
\[ E[T]_{M/M/k} = \frac{1}{\lambda \cdot PQ \cdot \rho(1 - \rho)} + \frac{1}{\mu} \]
where \(PQ\) is the probability an arrival is forced to queue, and \(\rho = \frac{\lambda}{k\mu}\).

Explanation: In the M/M/k system, traffic is lumped together but service capacity is split. The mean response time in this configuration depends on the load factor \(\rho\) and the probability \(PQ\) that an arrival has to wait due to queueing.

:p How does the M/M/1 system compare with the M/M/k system?
??x
The M/M/1 system generally outperforms the M/M/k system in terms of mean response time because it does not require queuing and the service capacity is not split, leading to a lower mean response time. The exact performance difference depends on the load factor \(\rho\) and the probability \(PQ\).

```java
// Pseudocode for calculating the mean response times in M/M/k system
public class ServerPerformance {
    public static double calculateE_T_MMXK(double lambda, double mu, double k) {
        double rho = lambda / (k * mu);
        // Assuming PQ is a function of rho and other factors
        double PQ = someQueueingProbabilityFunction(rho);
        return 1 / (lambda * PQ * rho * (1 - rho)) + 1 / mu;
    }
}
```
x??

---

---


#### M/M/k vs. M/M/1 Server Farms

Background context: The comparison between M/M/k and M/M/1 server farms is to understand how adding more servers affects job processing time under different load conditions (light and high).

Relevant formulas:
- \( E[T]_{M/M/1} = \frac{1}{\lambda (\mu - \lambda)} \)
- \( E[T]_{M/M/k} = \frac{P_0 Q + \frac{\lambda}{\mu}}{k(1 - \rho)} \)

Where:
- \( P_0 \) is the probability that no jobs are in the system.
- \( Q \) is the expected number of jobs in the system.
- \( \rho = \frac{\lambda}{k\mu} \), the traffic intensity.

Explanation: Under light load, most servers in an M/M/k farm remain idle. When a job arrives, it can be served by any available server with rate μ. In contrast, under the same light load, each job in an M/M/1 farm gets processed at \( k\mu \) (the combined service rate of all k servers). Therefore, jobs complete faster in M/M/1.

:p How does the response time compare between M/M/k and M/M/1 under light load?
??x
Under light load, most servers in an M/M/k farm remain idle. When a job arrives, it can be served by any available server with rate μ. In contrast, each job in an M/M/1 farm gets processed at \( k\mu \) (the combined service rate of all k servers). Therefore, jobs complete faster in M/M/1, making the M/M/1 approximately k times faster than M/M/k.

```java
// Pseudo-code to simulate response time under light load
public double calculateResponseTime(int k, double lambda, double mu) {
    double rho = lambda / (k * mu);
    // Assuming light load where most servers are idle in M/M/k
    return 1.0; // Simplified for comparison purposes
}
```
x??

---


#### M/M/k vs. M/M/1 Server Farms - High Load

Background context: The comparison between M/M/k and M/M/1 server farms under high load conditions, where the servers are typically busy.

Relevant formulas:
- \( E[T]_{M/M/k} \approx 1 + \frac{k}{k(1 - \rho)} = \frac{1}{1 - \rho} \)
- For M/M/1: \( E[T]_{M/M/1} = \frac{1}{\lambda (\mu - \lambda)} \)

Explanation: Under high load, the probability that all k servers are busy is close to 1. Therefore, the response time in both systems is approximately the same.

:p How does the response time compare between M/M/k and M/M/1 under high load?
??x
Under high load, the number of jobs in the queue approaches k (since most servers are busy). Thus, the system behaves like an M/M/1 with the same arrival rate λ and service rate \( k\mu \), leading to similar response times for both systems.

```java
// Pseudo-code to simulate response time under high load
public double calculateResponseTime(int k, double lambda, double mu) {
    double rho = lambda / (k * mu);
    return 1.0; // Simplified for comparison purposes as both are nearly the same
}
```
x??

---


#### Insensitivity Property in M/M/k Loss System

Background context: The insensitivity property of the M/M/k loss system, which states that the distribution of jobs in the system depends only on the mean job size.

Relevant proofs or references: Refer to [178], pp. 202–09 for a detailed proof.

Explanation: This property means that under certain conditions (like exponential service times), the performance metrics such as queue length and response time do not depend heavily on the actual service time distribution, but rather its mean value.

:p Explain the insensitivity property in M/M/k loss systems.
??x
The insensitivity property in M/M/k loss systems indicates that the number of jobs in the system depends only on the average job size, not on the specific distribution. This means that under heavy load, the behavior of an M/M/k system can be approximated by a simpler M/M/1 system with adjusted parameters.

```java
// Pseudo-code to simulate insensitivity property
public int simulateJobCount(int k, double meanJobSize) {
    // Simulate job arrival and service times based on mean value
    return 0; // Simplified simulation result
}
```
x??

---


#### Scherr’s CTSS Model (Problem)
Background context: Scherr’s model involves a computing system where jobs arrive according to an exponential distribution, and service times are also exponentially distributed. The objective is to find the expected response time \(E[R]\) using both time-reversibility equations and operational analysis.

:p Solve Scherr's problem as he did, by making Exponential assumptions and setting up a CTMC. Determine the limiting probabilities (can you apply the time-reversibility equations?). Write out an expression for \(E[R]\).
??x
First, set up the Continuous-Time Markov Chain (CTMC) with states representing the number of jobs in the system.

Using the Exponential distribution assumptions:
- Arrival rate: \(\lambda\)
- Service rate per CPU: \(\mu\)

For time-reversibility equations, we can use the balance equations for the steady-state probabilities \(P_i\), where:
\[ P_i = P(0) \cdot \frac{\left(\frac{\lambda}{\mu}\right)^i}{i!} e^{-\frac{\lambda}{\mu}} \]

The limiting probability distribution should satisfy detailed balance conditions. The expression for the expected response time \(E[R]\) can be derived using the traffic intensity \(\rho = \frac{\lambda}{2\mu}\):

\[ E[R] = -\frac{1}{\mu} + \sum_{i=0}^{\infty} i P_i (t_i - t_{i-1}) \]

Where \(t_i\) and \(t_{i-1}\) are the times spent in states with \(i\) and \(i-1\) jobs, respectively.

:p Now use operational analysis to obtain asymptotic bounds for \(E[R]\).
??x
Operational Analysis (OA) provides distribution-independent methods to find asymptotic behavior. For Scherr’s problem:
\[ E[R] \approx \frac{1}{\mu} + O(\rho^2) \]

Here, \(N^*\) is the critical number of jobs in the system where the expected response time starts increasing significantly.

Using small programs or simulations to sum up the series and get exact values can be useful:
```java
public class ScherrModel {
    public static void main(String[] args) {
        double lambda = 35; // example value for arrival rate
        double mu = 0.8;    // example value for service rate

        double rho = lambda / (2 * mu);
        double E_R = 1.0 / mu + Math.pow(rho, 2); // Simplified formula for approximation

        System.out.println("Expected Response Time: " + E_R);
    }
}
```
x??

---


#### M/M/2/3 Queueing Model
Background context: This model describes a system with two servers and a maximum of three jobs in the waiting room. Jobs arrive according to a Poisson process, and service times are exponentially distributed.

:p Draw a CTMC where the state represents the total number of jobs in the system.
??x
The states can be represented as:
- 0: No jobs in the system (both servers idle)
- 1: One job being served by one server
- 2: Two jobs, either both being served or one job and another waiting
- 3: Three jobs; two are being served, and one is waiting

Transition rates can be defined as:
- Arrival rate: \(\lambda\)
- Service rate per server: \(\mu\)

For example, from state 0 to state 1 (one arriving when both servers are idle):
\[ \lambda P_0 = \mu P_1 \]

:p Suppose that there are exactly 2 jobs in the system. What is the probability that a job arrives before a job completes?
??x
Given two jobs:
- Probability of an arrival: \(\lambda\)
- Probability of a service completion (one server becoming idle): \(2\mu\)

The probability that a job arrives first can be calculated as:
\[ P(\text{Arrival first}) = \frac{\lambda}{2\mu + \lambda} \]

:p Use your CTMC to determine the probability that the system is idle.
??x
To find the steady-state probability \(P_0\) (system idle):
\[ P_0(1 - 2\rho) = 1 - \rho \]
Where \(\rho = \frac{\lambda}{2\mu}\).

Solving for \(P_0\):
\[ P_0 = \frac{1 - \rho}{1 - 2\rho} \]

:p What is the throughput of the system?
??x
The throughput, or utilization factor, can be calculated as:
\[ \text{Throughput} = (1 - P_0) \times 2\mu = \lambda \]

:p What is \(E[N]\), the expected number of jobs in the system?
??x
Using Little's Law and the steady-state probabilities:
\[ E[N] = \sum_{i=0}^{3} i P_i \]
Where \(P_1\) and \(P_2\) can be calculated from detailed balance equations.

:p What is \(E[T]\), the expected response time (for those jobs not dropped)?
??x
Using Little's Law:
\[ E[T] = \frac{E[N]}{\lambda} = 3 - 2\rho + \rho^2 \]

:p Consider the process of arrivals to the system that are not dropped. Is this a Poisson process? Why or why not?
??x
Yes, the process of non-dropped arrivals is still a Poisson process because:
- The original arrival process is Poisson.
- Dropped jobs do not affect the interarrival times of the remaining jobs.

:x??

---


#### Inﬁnite Help Desk (M/M/∞)
Background context: This model represents an infinite number of servers, where interarrival times are Exponential with rate \(\lambda\) and service times are Exponential with rate \(\mu\).

:p Draw a state diagram for the continuous-time Markov chain of this system.
??x
The states can be represented as \(N(t)\), the number of jobs in the system at time \(t\). The state transitions are:
- From \(i\) to \(i+1\) with rate \(\lambda\)
- From \(i+1\) to \(i\) with rate \((i+1) \mu\)

:p Derive the limiting probabilities.
??x
Using balance equations, the steady-state probability \(P_i\) can be derived as:
\[ P_0 = 1 - \rho \]
\[ P_i = (1-\rho)\frac{\rho^i}{i!} e^{-\rho} \]

Where \(\rho = \frac{\lambda}{\mu}\).

:p From the limiting probabilities, derive a closed-form expression for \(E[N]\).
??x
Using Little's Law:
\[ E[N] = \sum_{i=0}^{\infty} i P_i = \rho (1 - \rho) \]

:p Does \(E[T]\) make sense? Explain.
??x
Yes, because in an infinite-server system, the expected response time is:
\[ E[T] = \frac{E[N]}{\lambda} = \frac{\rho}{\mu} \]
Which makes sense as it represents the average service time.

:x??

---


#### M/M/2 with Heterogeneous Servers
Background context: This model considers two servers with different service rates, where the faster server is scheduled first when both are idle. The objective is to analyze system behavior and performance metrics.

:p What is the throughput of the system?
??x
The throughput can be calculated using:
\[ \text{Throughput} = \min(\mu_1, \mu_2) + \mu_2 (P_{\text{idle}} - P_{\text{busy}}) \]

Where \(P_{\text{idle}}\) and \(P_{\text{busy}}\) are the probabilities of both servers being idle or one busy.

:p What is \(E[N]\), the expected number of jobs in the system?
??x
Using Little's Law:
\[ E[N] = \lambda / (\min(\mu_1, \mu_2) + \mu_2 (P_{\text{idle}} - P_{\text{busy}})) \]

:p What is \(E[T]\), the expected response time?
??x
Using Little's Law:
\[ E[T] = E[N] / \lambda \]

:x??

---

---


#### Utilization and Mean Number of Jobs in a System

**Background Context:** The utilization, \(\rho\), for this system is defined as \(\rho = \frac{\lambda}{\mu_1 + \mu_2}\). This represents the proportion of time that at least one server is busy. To determine the mean number of jobs in the system and the mean response time, we use a Continuous-Time Markov Chain (CTMC).

**Relevant Formulas:**
- Mean number of jobs in the system, \(E[N]\), can be calculated as:
  \[
  E[N] = A(1-\rho)^2 \left(\frac{14.14}{14.6}\right)
  \]
  where 
  \[
  A = \frac{\mu_1\mu_2(1 + 2\rho)}{\lambda(\lambda+\mu_2)+1} (1-\rho).
  \]

:p What is the utilization and formula for the mean number of jobs in the system?
??x
The utilization, \(\rho\), is given by:
\[
\rho = \frac{\lambda}{\mu_1 + \mu_2}.
\]
To find the mean number of jobs in the system \(E[N]\), we use the formula:
\[
E[N] = A(1-\rho)^2 \left(\frac{14.14}{14.6}\right),
\]
where 
\[
A = \frac{\mu_1\mu_2(1 + 2\rho)}{\lambda(\lambda+\mu_2)+1} (1-\rho).
\]

x??

---


#### Load Balancing in Server Farms

**Background Context:** Consider a server farm with two hosts, each having its own queue. Jobs arrive according to a Poisson process with rate \(\lambda\) and are processed by the servers at rates \(\mu_1\) and \(\mu_2\). The probability \(p\) that a job is sent to Host 1 can vary.

**Relevant Formulas:**
- Load balancing load condition when \(\mu_1 = \mu_2\):
  - \(E[TQ]\) and \(E[T]\) are minimized when the load is balanced, i.e., \(p = 0.5\).

- For \(\mu_1 \neq \mu_2\), it's not always optimal to balance the load.

**Objective:** To determine if load balancing minimizes mean response time and queue length in different scenarios.

:p Is load balancing always good for minimizing mean response time and queue length when \(\mu_1 = \mu_2\)?
??x
When \(\mu_1 = \mu_2\), the optimal strategy is to balance the load, meaning \(p = 0.5\). This ensures that both hosts are utilized equally, which typically minimizes the mean response time and queue length.

x??

---


#### Throwing Away Servers

**Background Context:** In a single-server M/M/1 system with utilization \(\rho\), adding a faster server (M/M/2) can reduce the mean response time. However, in some cases, disconnecting the original slower server might be beneficial due to improved performance.

**Relevant Formulas:**
- The formula for the mean response time \(E[T]\) of an M/M/2 system with heterogeneous servers is derived from Exercise 14.5.
  
- Disconnected faster server can provide better performance in certain scenarios, but this depends on specific values of \(\lambda\), \(\mu_1\), and \(\mu_2\).

**Objective:** To determine if disconnecting the original slower server can always improve mean response time.

:p In what scenario might a consultant be right to claim that disconnecting the faster server is beneficial for reducing mean response time?
??x
A consultant might be right when:
- The arrival rate \(\lambda\) and service rates \(\mu_1\) and \(\mu_2\) are such that the original slower server significantly increases the overall system's mean response time. Specifically, if \(\rho = 0.75\), \(\mu_1 = 4\), and \(\mu_2 = 1\), with \(\lambda = 3.75\), the faster server might provide better performance.

Intuitively, this happens because the faster server can handle a higher fraction of jobs more efficiently, reducing overall wait times.

x??

---


#### Comparison of Multi-Server Architectures

**Background Context:** Compare four different server configurations with heterogeneous servers, each having an exponential service time and Poisson arrival process. The goal is to rank these configurations based on their mean response time.

**Relevant Formulas:**
- \(E[T]\) for M/M/2 system:
  \[
  E[T] = \frac{1}{\mu_1 + \mu_2 - \lambda} + \frac{\rho^2(1+\rho)}{(1-\rho)(\mu_1 + \mu_2)}
  \]

**Objective:** To rank the server configurations based on their mean response time.

:p Rank the four server architectures in order of greatest to least mean response time.
??x
The rankings, from greatest to least mean response time, are as follows:
- For low \(\rho = 0.25\):
  - Configurations: (4) > (1) = (2) > (3)
- For high \(\rho = 0.75\):
  - Configurations: (4) > (2) = (1) > (3)

For the case where \(\mu_1 = 4\), \(\mu_2 = 1\), and \(\lambda = 1.25\) for low load:
- \(E[T]_{(1)} > E[T]_{(2)} = E[T]_{(3)}\)
For the case where \(\lambda = 3.75\) for high load:
- \(E[T]_{(4)} > E[T]_{(2)} = E[T]_{(1)} > E[T]_{(3)}\)

x??

---

---


#### Load and Utilization in M/M/k Systems
Background context explaining how load is understood differently in single-server (M/M/1) versus multi-server (M/M/k) systems. The common rule of thumb for a single server system suggests that utilization, ρ, should be kept below 0.8 to avoid delays.

:p What does the term "load" mean in an M/M/k system?
??x
In an M/M/k system, load or system utilization is represented by \(\rho = \frac{\lambda k}{\mu}\). Unlike a single-server system where high utilization directly correlates with increased delay, in a multi-server system, the presence of multiple servers can mitigate delays even if each server has a high individual utilization.
x??

---


#### Expected Waiting Time and PQ Factor
Explanation on how to understand expected waiting time (E[TQ]) without considering the queueing probability factor (PQ). The formula \( \frac{E[TQ]}{PQ} = E[TQ|delayed] \) is used to derive a simplified metric.

:p What does \( \frac{E[TQ]}{PQ} \) represent?
??x
\( \frac{E[TQ]}{PQ} \) represents the expected waiting time of those customers who are delayed. This simplification helps in understanding how system utilization impacts delay without considering the queueing probability.
x??

---


#### Relationship Between Utilization and Delay in M/M/k Systems
Explanation on how increasing the number of servers \( k \) can reduce the expected waiting time for delayed customers, even if each server has a high average utilization.

:p How does increasing the number of servers affect the expected delay for customers?
??x
Increasing the number of servers \( k \) reduces the likelihood that all servers are busy simultaneously. This means that more arrivals will find an available server, thereby reducing the expected waiting time for delayed customers. Even if each server still has a high utilization (ρ), the overall system can handle more traffic without incurring significant delays.
x??

---


#### Square-Root Staffing Rule
Explanation on why the square-root staffing rule is effective and provides a good approximation for determining the number of servers needed to achieve a certain QoS goal.

:p Why does the "square-root staffing" rule work?
??x
The "square-root staffing" rule works because increasing the number of servers \( k \) in proportion to the square root of the desired reduction in delay can effectively mitigate delays. This is based on the observation that the expected waiting time for delayed customers drops in direct proportion to the number of servers, making it easier to handle higher utilization without severe delays.
x??

---


#### Single-Server vs Multi-Server Systems
Comparison between single-server (M/M/1) and multi-server (M/M/k) systems regarding delay. Explanation on why high utilization does not necessarily mean high delay in a multi-server system.

:p How does the rule of thumb for single servers (\( \rho < 0.8 \)) compare to M/M/k systems?
??x
In a single-server (M/M/1) system, keeping \( \rho \) below 0.8 is crucial to avoid delays. However, in an M/M/k system, having high utilization (ρ) does not necessarily imply high delay because the presence of multiple servers can distribute the load and reduce the likelihood that all servers are busy at once.

For example:
- With ρ = 0.95 and k = 5 servers: \( E[TQ]_{PQ} \approx \frac{1}{5\mu(0.05)} = 4\mu \)
- With ρ = 0.95 and k = 100 servers: \( E[TQ]_{PQ} \approx \frac{1}{100\mu(0.05)} = 0.2\mu \)

This shows that increasing the number of servers can significantly reduce delays even with high utilization.
x??

---

---

