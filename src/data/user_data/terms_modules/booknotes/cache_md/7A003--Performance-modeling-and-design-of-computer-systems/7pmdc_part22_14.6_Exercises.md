# High-Quality Flashcards: 7A003--Performance-modeling-and-design-of-computer-systems_processed (Part 22)


**Starting Chapter:** 14.6 Exercises

---


#### Utilization and Mean Number of Jobs in the System

Background context: The utilization, ρ, is defined as \(\rho = \frac{\lambda}{\mu_1 + \mu_2}\). For a closed system with two servers where jobs are sent to either server 1 or server 2 based on probabilities \(p\) and \(1-p\), the mean number of jobs in the system can be calculated using specific formulas. The mean response time also needs consideration.

Relevant formula: 
\[ E[N] = \frac{A(1-\rho)^2}{14.14} \]
where
\[ A = \frac{\mu_1\mu_2 (1 + 2\rho)}{\lambda (\lambda + \mu_2) + 1} (1 - \rho) \]

:p Define the utilization, ρ, for a system with two servers.
??x
The utilization, \(\rho\), is defined as the ratio of the arrival rate \(\lambda\) to the sum of service rates of the two servers:
\[ \rho = \frac{\lambda}{\mu_1 + \mu_2} \]

This represents how busy the system is on average. If \(\rho > 1\), the system is overloaded, meaning more jobs are arriving than can be served.

x??

#### Load Balancing in Server Farms

Background context: The problem discusses load balancing strategies for server farms where jobs can be dispatched to different servers with varying service rates based on probabilities \(p\) and \(1-p\). It asks about minimizing the mean response time, considering both equal and unequal service rates among hosts.

:p Prove or disprove that E[TQ] and E[T] are always minimized when p is chosen to balance the load in a system where \(\mu_1 = \mu_2\).
??x
To determine if \(p\) should be balanced for \(\mu_1 = \mu_2\), we consider the mean response time (E[T]) and queue length (E[TQ]). When service rates are equal, balancing the load means distributing jobs equally between servers. Since both servers have the same processing capacity, any imbalance would lead to increased waiting times in one server due to backlogging.

Given that \(\mu_1 = \mu_2\), if \(p\) is set such that it balances the load (i.e., sends equal numbers of jobs to each server), this ensures that both servers are equally busy. This minimizes the overall response time and queue length because neither server will experience a backlog.

Thus, for \(\mu_1 = \mu_2\), E[TQ] and E[T] are minimized when \(p\) is chosen such that it balances the load.

x??

#### Load Balancing with Unequal Service Rates

Background context: In this scenario, the service rates at different servers are not equal (\(\mu_1 \neq \mu_2\)). The question asks if balancing the load minimizes E[TQ] and E[T].

:p Prove or disprove that E[TQ] and E[T] are always minimized when p is chosen to balance the load in a system where \(\mu_1 \neq \mu_2\).
??x
When service rates are unequal, balancing the load does not necessarily minimize \(E[T]\) and \(E[TQ]\). The optimal distribution depends on the specific values of \(\mu_1\) and \(\mu_2\).

To find the optimal \(p\), we need to calculate the mean response time for different values of \(p\). For example, if \(\mu_1 = 4\) and \(\mu_2 = 1\), sending more jobs to Host 2 (which has a faster service rate) would generally reduce overall response times.

Thus, balancing the load does not always minimize E[TQ] and E[T] when \(\mu_1 \neq \mu_2\). The optimal distribution depends on the specific values of \(\mu_1\) and \(\mu_2\).

x??

#### Closed Systems with Heterogeneous Servers

Background context: In a closed system, jobs are generated internally, and there is no external arrival process. The problem asks about minimizing response time in a heterogeneous M/M/2 system.

:p Prove or disprove that E[TQ] and E[T] are always minimized when p is chosen to balance the load in a closed system with \(\mu_1 \neq \mu_2\).
??x
In a closed system, balancing the load does not necessarily minimize \(E[T]\) and \(E[TQ]\). The optimal distribution depends on the specific values of \(\mu_1\) and \(\mu_2\).

For instance, if \(\mu_1 = 4\) and \(\mu_2 = 1\), and \(\lambda\) is such that it results in high utilization, sending more jobs to Host 2 (which has a faster service rate) would generally reduce overall response times.

Thus, balancing the load does not always minimize E[TQ] and E[T] when \(\mu_1 \neq \mu_2\) in a closed system. The optimal distribution depends on the specific values of \(\mu_1\), \(\mu_2\), and \(\lambda\).

x??

#### Throwing Away Servers

Background context: In this scenario, we have an M/M/2 system with heterogeneous servers (one faster server) where users perceive intolerable response times. A consultant suggests disconnecting the slower server to improve performance.

:p Derive a formula for E[T], the mean response time of the M/M/2 system with heterogeneous servers.
??x
The mean response time \(E[T]\) in an M/M/2 system can be derived using the given formulas. For \(\alpha > 1\) and the service rates \(\mu_1 = \alpha \mu_2\), we have:
\[ E[T] = \frac{A(1 - \rho)^2}{14.14} \]
where
\[ A = \frac{\mu_1 \mu_2 (1 + 2\rho)}{\lambda (\lambda + \mu_2) + 1} (1 - \rho) \]

For the M/M/2 system, this formula simplifies to:
\[ E[T] = \frac{\left(\frac{\alpha \mu_2 \cdot \mu_2 (1 + 2\rho)}{\lambda (\lambda + \mu_2) + 1}\right)(1 - \rho)^2}{14.14} \]

x??

#### Comparing Multi-server Architectures

Background context: This problem asks to compare different server architectures, including M/M/2 systems and load balancing strategies.

:p Fill in the table with a ranking of the four server configurations from greatest mean response time to least mean response time.
??x
To fill in the table, we need to evaluate each configuration based on the given parameters:

1. **M/M/2 heterogeneous server system:**
   - \(\rho = 0.25\): \(\mu_1 = \mu_2 = 1\), \(\lambda = 0.5\) or \(\lambda = 1.5\)
   - \(\rho = 0.75\): \(\mu_1 = 4\), \(\mu_2 = 1\), \(\lambda = 1.25\) or \(\lambda = 3.75\)

2. **Balanced load, equal servers:**
   - \(\rho = 0.25\): \(\mu_1 = \mu_2 = 1\), \(\lambda = 0.5\) or \(\lambda = 1.5\)
   - \(\rho = 0.75\): \(\mu_1 = 4\), \(\mu_2 = 1\), \(\lambda = 1.25\) or \(\lambda = 3.75\)

3. **Minimize mean response time, unequal servers:**
   - \(\rho = 0.25\): \(\mu_1 = 4\), \(\mu_2 = 1\), \(\lambda = 1.25\) or \(\lambda = 3.75\)
   - \(\rho = 0.75\): \(\mu_1 = 4\), \(\mu_2 = 1\), \(\lambda = 1.25\) or \(\lambda = 3.75\)

4. **Send all jobs to the faster server:**
   - \(\rho = 0.25\): \(\mu_1 = 4\), \(\mu_2 = 1\), \(\lambda = 1.25\) or \(\lambda = 3.75\)
   - \(\rho = 0.75\): \(\mu_1 = 4\), \(\mu_2 = 1\), \(\lambda = 1.25\) or \(\lambda = 3.75\)

Ranking:
- For \(\rho = 0.25\):
  - Tconfig4 > Tconfig1 = Tconfig2 > Tconfig3
- For \(\rho = 0.75\):
  - Tconfig4 > Tconfig1 = Tconfig2 > Tconfig3

x??

---


#### Understanding Load in M/M/k Systems
Background context explaining the concept. In a single-server M/M/1 system, it is common to keep the utilization, ρ, below 0.8. If ρ gets higher (e.g., ρ=0.95), delays can explode. For an M/M/k system, we explore whether this rule of thumb still applies.
:p What does the term "load" mean in an M/M/k context?
??x
Load in an M/M/k context refers to the average server utilization, represented by \(\rho = \frac{\lambda}{k\mu}\), where \(k\) is the number of servers. It measures how busy the servers are on average.
x??

---
#### Expected Waiting Time for Delayed Customers
Background context: We derive a metric that simplifies the understanding of expected waiting times in an M/M/k system by removing the probability of queueing (PQ) factor. The key formula is \( \frac{E[T_Q]}{PQ} = E[T_Q | delayed] \).
:p What does \( \frac{E[T_Q]}{PQ} \) represent?
??x
\( \frac{E[T_Q]}{PQ} \) represents the expected waiting time of those customers who are actually delayed. It simplifies the analysis by focusing on the delays that occur.
x??

---
#### Impact of Server Count on Delayed Customers' Waiting Time
Background context: We use the derived formula \( \frac{E[T_Q]}{PQ} = \frac{1}{k\mu(1-\rho)} \) to understand how increasing the number of servers affects the waiting time for delayed customers. Here, \( k \) is the number of servers and \(\rho\) is the utilization.
:p How does increasing the number of servers affect the expected waiting time for delayed customers?
??x
Increasing the number of servers reduces the expected waiting time for delayed customers directly proportionally to \(k\). This is because a higher \(k\) decreases the likelihood that all servers are busy simultaneously, leading to shorter delays on average.
x??

---
#### Example Calculation
Background context: We provide an example calculation to illustrate how increasing server count can significantly reduce the waiting time for delayed customers. For instance, with \(\rho = 0.95\), a system of 5 servers versus 100 servers yields different expected delays.
:p What is the difference in average wait time for delayed customers between a system of 5 servers and 100 servers if \(\rho = 0.95\)?
??x
For a system with 5 servers, the average wait for delayed customers would be \( \frac{1}{5\mu(0.05)} = \frac{4}{\mu} \) (4 times a job size). For a system with 100 servers, it would be \( \frac{1}{100\mu(0.05)} = \frac{20}{\mu} \) (a fifth of a job size).
x??

---
#### Intuition Behind Load and Delay in M/M/k Systems
Background context: We explain why high load does not necessarily imply high delay in an M/M/k system, provided there are enough servers. The key is that with more servers, the likelihood of all being busy at the same time decreases.
:p Why does having more servers help in reducing delays even if \(\rho\) remains constant?
??x
Even though each server still has utilization \(\rho\), with more servers, it becomes less likely that all servers are simultaneously busy. This increases the probability that an arriving job finds a free server and reduces overall delay.
x??

---


#### M/M/∞ Queueing System Overview

Background context: The M/M/∞ queueing system models a scenario where an infinite number of servers are available, ensuring that no customer has to wait due to server unavailability. This model helps us understand basic principles before applying them to systems with finite numbers of servers.

:p What is the M/M/∞ queueing system used for?
??x
The M/M/∞ queueing system is used to analyze a scenario where an infinite number of servers are available, ensuring that no customer has to wait due to server unavailability. This model helps us derive fundamental principles before applying them to real-world systems with finite numbers of servers.
x??

---
#### State Diagram and Limiting Probabilities

Background context: The state diagram for the M/M/∞ queueing system consists of states representing the number of jobs in the system, with transitions based on arrival and service rates. We can derive limiting probabilities using time-reversibility equations.

:p What does the state diagram look like for the M/M/∞?
??x
The state diagram for the M/M/∞ has states 0, 1, 2, ... representing the number of jobs in the system. Each state i transitions to state j with rates λ and μ as follows:

- From state i to state i+1: rate λ (arrival)
- From state i to state i-1: rate μi (service)

The diagram is represented by a continuous-time Markov chain (CTMC) shown in Figure 15.1.

```java
// Pseudocode for the CTMC representation
class MmInfiniteQueue {
    private double lambda;
    private double mu;

    public MmInfiniteQueue(double lambda, double mu) {
        this.lambda = lambda;
        this.mu = mu;
    }

    // Transition rates
    public void transitionRates(int i) {
        System.out.println("From state " + i + " to state " + (i+1) + ": rate " + lambda);
        if (i > 0) {
            System.out.println("From state " + i + " to state " + (i-1) + ": rate " + mu * Math.pow(lambda, i));
        }
    }
}
```
x??

---
#### Expected Number of Jobs in M/M/∞

Background context: The expected number of jobs in the system for an M/M/∞ is derived from its Poisson distribution. Using the limiting probabilities, we can find the mean number of jobs.

:p Derive a closed-form expression for the expected number of jobs in the M/M/∞.
??x
The expected number of jobs in the M/M/∞ queueing system is given by the Poisson distribution with mean λ/μ:

\[ E[N] = \lambda / \mu \]

This can be derived from the limiting probabilities where πi = (λ/μ)^i * e^(-λ/μ) / i!.

```java
// Pseudocode to calculate expected number of jobs
public class ExpectedJobs {
    private double lambda;
    private double mu;

    public ExpectedJobs(double lambda, double mu) {
        this.lambda = lambda;
        this.mu = mu;
    }

    // Calculate expected number of jobs
    public double calculateExpectedJobs() {
        return lambda / mu;
    }
}
```
x??

---
#### Applying Little’s Law

Background context: Little's Law states that the average number of items in a system (N) is equal to the arrival rate (λ) times the average time an item spends in the system (T): N = λT. For the M/M/∞, since jobs do not queue up, T equals 1/μ.

:p Does E[T] make sense for the M/M/∞?
??x
By Little's Law, \( E[T] = \frac{E[N]}{\lambda} = \frac{\lambda / \mu}{\lambda} = \frac{1}{\mu} \). This makes sense because jobs do not ever have to queue up, so the mean response time is just the mean service time (1/μ).

```java
// Pseudocode for Little's Law calculation
public class LittleLaw {
    private double lambda;
    private double mu;

    public LittleLaw(double lambda, double mu) {
        this.lambda = lambda;
        this.mu = mu;
    }

    // Calculate expected response time using Little's Law
    public double calculateExpectedResponseTime() {
        return 1 / mu;
    }
}
```
x??

---
#### M/M/∞ in Closed Interactive Systems

Background context: The think station in a closed interactive system can be modeled as an M/M/∞, where the mean "service time" is the mean time spent thinking. This model shows that even if the think time is not necessarily Exponentially distributed, it does not matter because the M/M/∞ is insensitive to the distribution of service time.

:p Where was the M/M/∞ seen in closed systems?
??x
The M/M/∞ queueing system was seen when discussing closed interactive systems. In a closed interactive system, think times are used as the mean "service time" for the M/M/∞ model, indicating that even if the think time is not necessarily Exponentially distributed, it does not affect the model's behavior because the M/M/∞ is insensitive to the distribution of service time.

```java
// Pseudocode to simulate a closed interactive system with M/M/∞
public class ClosedInteractiveSystem {
    private double lambda;
    private double mu;

    public ClosedInteractiveSystem(double lambda, double mu) {
        this.lambda = lambda;
        this.mu = mu;
    }

    // Simulate the system using M/M/∞ model
    public void simulate() {
        System.out.println("Simulating a closed interactive system with M/M/∞");
    }
}
```
x??

---
#### Capacity Provisioning for M/M/k

Background context: For an M/M/k queue, we need to determine the minimum number of servers (k) required to keep the probability of queueing (PQ) below a certain level. Using the M/M/∞ as a basis, we can derive a simple rule for capacity provisioning.

:p How many servers are needed to keep the system stable in an M/M/k?
??x
To keep the system stable, we need \( \rho < 1 \Rightarrow \frac{\lambda}{k\mu} < 1 \Rightarrow k > \frac{\lambda}{\mu} \). Observe that \( \frac{\lambda}{\mu} \) can be a fraction, in which case we would actually have to round up to the next integer. This expression for R (the resource requirement) is repeated from Definition 14.4.

```java
// Pseudocode to calculate minimum number of servers
public class CapacityProvisioning {
    private double lambda;
    private double mu;

    public CapacityProvisioning(double lambda, double mu) {
        this.lambda = lambda;
        this.mu = mu;
    }

    // Calculate the minimum number of servers needed
    public int calculateMinServers() {
        return (int) Math.ceil(lambda / mu);
    }
}
```
x??

---
#### Approximation for M/M/k Using M/M/∞

Background context: For a large R, we can use relatively few servers more than R to get the probability of queueing (PQ) below 20%. This approach is based on the M/M/∞ result and provides a practical rule for capacity provisioning in an M/M/k system.

:p Derive PQ for having more than R+√R jobs in the M/M/∞.
??x
For a large \( R \), the number of jobs in the M/M/∞ follows a Poisson distribution with mean \( R \). The Poisson (R) distribution is well approximated by a Normal (R, R) distribution. Hence, we are asking for the probability that the Normal (R, R) distribution exceeds one standard deviation above its mean, which is approximately 16%.

```java
// Pseudocode to calculate PQ using normal approximation
public class QueueProbability {
    private double lambda;
    private double mu;

    public QueueProbability(double lambda, double mu) {
        this.lambda = lambda;
        this.mu = mu;
    }

    // Calculate the probability of queueing (PQ)
    public double calculateQueueProbability() {
        return 1 - F.distribution(1); // where F is the cumulative distribution function of standard normal
    }
}
```
x??

---

