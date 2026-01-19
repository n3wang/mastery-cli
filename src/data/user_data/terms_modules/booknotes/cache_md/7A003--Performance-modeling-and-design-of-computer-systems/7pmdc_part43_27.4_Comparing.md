# High-Quality Flashcards: 7A003--Performance-modeling-and-design-of-computer-systems_processed (Part 43)


**Starting Chapter:** 27.4 Comparing ONIDLE versus ONOFF

---


#### π0 and Delay Formulas
Background context: The document introduces $\pi_0 $, which represents the probability that the server is idle. It provides the formula for $\pi_0$ as derived from the equations (27.9) to (27.14). This concept is crucial for understanding delay and power consumption in queueing systems with setup costs.

:p What is $\pi_0$, and how is it calculated?
??x
$\pi_0$ represents the probability that the server is idle. It is given by:
$$\pi_0 = 1 - \rho_{setup} = 1 - \frac{\lambda E[S]}{1 + \lambda E[I]}$$where $\rho_{setup}$ is the utilization factor considering setup time,$\lambda $ is the arrival rate,$ E[S]$ is the expected service time, and $E[I]$ is the expected idle time.

To derive this:
- Start from (27.9), which gives $\pi_0$.
- Substitute $\pi_0$ into (27.11) to get an expression for queue delay.
- This leads to (27.13) and further simplifies to (27.14).

This formula is essential in calculating the expected setup delay.
x??

---


#### Setup Cost with Exponential Distribution
Background context: When the setup time $I $ follows an exponential distribution, the formulas for$\pi_0$ and the delay change due to the properties of the exponential distribution.

:p How does the setup cost behave when $I$ is exponentially distributed?
??x
When $I \sim \text{Exp}(\alpha)$, we have:
$$E[I^2] = 2(E[I])^2$$

This simplifies the expression for $\pi_0$:
$$\pi_0 = 1 - \frac{\lambda E[S]}{1 + \lambda E[I]}$$

For delay, using (27.13) and substituting $E[I^2]$:
$$E[T_{\text{setup}}] = \lambda E[S^2] \left(\frac{1}{2(1 - \rho)} + 2(E[I])^2 + \frac{\lambda E[I^2]}{2(1 + \lambda E[I])}\right)$$

Since $E[I^2] = 2(E[I])^2$:
$$E[T_{\text{setup}}] = E[T_{\text{setup}}] + E[I] = E[T_{\text{no setup}}] + E[I]$$

This means the setup cost is additive, making it simpler to handle.

:p How does this simplify the calculation of delay?
??x
With $I$ exponentially distributed, the delay simplifies because the square term in the expected value cancels out. The delay can be broken down into two components: one from an M/G/1 without setup and another from just the setup time.
```java
// Pseudocode for calculating delay with exponential setup time
public double calculateDelay(double lambda, double E_S, double alpha) {
    double rho = lambda * E_S;
    double E_I = 1 / alpha; // Expected value of exponential distribution
    double E_I2 = (2 * Math.pow(E_I, 2)); // Using the property of exponential dist.
    
    // Calculate setup delay
    double setupDelay = lambda * E_S * E_S / (2 * (1 - rho) + 2 * E_I2 + lambda * E_I2 / (1 + lambda * E_I));
    
    return setupDelay;
}
```
x??

---


#### ON/IDLE vs. ON/OFF Policies
Background context: The document compares two power management policies for systems with setup costs, specifically the ON/IDLE and ON/OFF policies. It provides formulas for both policies' performance metrics.

:p What are the mean power consumption and response time formulas for ON/IDLE policy?
??x
For the ON/IDLE policy:
- Power:
$$E[\text{Power}]_{\text{ON/IDLE}} = \rho P_{\text{on}} + (1 - \rho) P_{\text{idle}}$$- Response time:
$$

E[T]_{\text{ON/IDLE}} = \frac{\lambda E[S^2]}{2(1 - \rho)} + E[S]$$

Where $\rho = \lambda E[S]$,$ P_{\text{on}}$is the power when the server is busy, and $ P_{\text{idle}}$ is the power when idle.

:p What are the mean power consumption and response time formulas for ON/OFF policy?
??x
For the ON/OFF policy:
- Power:
$$E[\text{Power}]_{\text{ON/OFF}} = \rho P_{\text{setup}} = \frac{\lambda E[I]}{\lambda E[I] + 1} P_{\text{on}}$$- Response time:
$$

E[T]_{\text{ON/OFF}} = \frac{\lambda E[S^2]}{2(1 - \rho)} + 2E[I] + \frac{\lambda E[I^2]}{2(1 + \lambda E[I])} + E[S]$$

Where $P_{\text{setup}}$ is the power when in setup, and the fraction of time the server is busy is given by $\rho = \lambda E[S]$.

:p How do we compare the two policies using Performance-per-Watt (Perf/W)?
??x
The Perf/W metric can be compared as follows:
$$\text{Performance-per-Watt} = \frac{1}{E[\text{Power}]_{\text{ON/IDLE}} \cdot E[T]_{\text{ON/IDLE}}} / \left(\frac{1}{E[\text{Power}]_{\text{ON/OFF}} \cdot E[T]_{\text{ON/OFF}}}\right)$$

This ratio helps determine which policy is better based on the given values of $\rho $ and$E[I]$.

:p What does Table 27.1 show regarding ON/IDLE vs. ON/OFF policies?
??x
Table 27.1 compares the Performance-per-Watt (Perf/W) for both policies across different values of $\rho = 0.1, 0.3, 0.5, 0.7, 0.9 $ and$E[I] = 1/8, 1/4, 1/2, 1, 2, 4, 8$. It shows that under low load and high setup time, the ON/IDLE policy is more efficient (ratio < 1), while under low load and low setup time, the ON/OFF policy is better. The intuition suggests that as the setup cost increases, turning off the server becomes less favorable.

:p How does the ratio change with increasing load?
??x
Increasing the load generally makes the ON/OFF policy less favorable compared to ON/IDLE, especially when setup costs are high. This is because under high load, the delay from setup can be significant, making the ON/IDLE strategy more efficient as it avoids unnecessary setups.

:p What effect does a high setup cost have on the policies?
??x
High setup costs favor the ON/IDLE policy over the ON/OFF policy as the increasing delay associated with turning off and on the server outweighs the benefits of reduced power consumption during idle periods. This can be seen in Table 27.1 where higher values of $E[I]$(setup time) result in a more favorable Perf/W ratio for ON/IDLE.

x??

---

---


#### Response Time Decomposition in M/G/1/Vac

Background context: In this problem, you are dealing with an M/G/1 queue where a server takes breaks (vacations) when there are no customers. The vacation time is denoted by $V $, and the response time in such a system is denoted as $\tilde{T}_{M/G/1/Vac}$.

The key idea here is to decompose the response time into two components: the time spent on service, and the excess of vacation time when there are no customers.

Relevant formulas:
- The decomposition result given in the problem states that:
  $$\tilde{T}_{M/G/1/Vac}(s) = \tilde{T}_{M/G/1}(s) \cdot \tilde{V}_e(s)$$where $\tilde{V}_e(s)$ is the Laplace transform of the excess vacation time.

:p How would you prove the given decomposition result for response times in an M/G/1 with vacations?
??x
To prove the decomposition, follow a similar approach as used in deriving the results for the M/G/1 with setup times. The key steps are:

1. **Laplace Transform of $\tilde{T}_{M/G/1/Vac}(s)$**: Consider the arrival and service process along with the vacation time.
2. **Conditional Probability**: Use conditional probability to separate the service time from the vacation time.
3. **Decomposition**: The response time can be broken down into two parts - the service time and the excess vacation time when there are no customers.

Here is a detailed outline of the proof:

1. Start by considering the Laplace transform:
   $$\tilde{T}_{M/G/1/Vac}(s) = E[e^{-sT}]$$2. Use the fact that $ T$(the response time) can be decomposed into two parts: the service time and the vacation time when there are no customers.
3. Apply the law of total expectation to separate the terms:
$$\tilde{T}_{M/G/1/Vac}(s) = E[e^{-sT} | \text{no customers}] \cdot P(\text{no customers})$$4. Recognize that $ E[e^{-sT} | \text{no customers}]$is the Laplace transform of the service time (without vacation), and $ P(\text{no customers})$ is related to the vacation process.
5. The final step is to recognize that:
$$\tilde{T}_{M/G/1/Vac}(s) = \tilde{T}_{M/G/1}(s) \cdot \tilde{V}_e(s)$$

This proof follows a similar structure as the one used for M/G/1 with setup times, just substituting vacation time for setup time.
x??

---


#### Shorts-Only Busy Period

Background context: In this problem, you are dealing with an M/G/1 queue where job sizes have different distributions. Short jobs (size <$t $) have preemptive priority over long jobs (size ≥ $ t$). The goal is to derive the mean and Laplace transform of a short busy period.

Relevant formulas:
- Define $f(·)$ as the probability density function (pdf) of job sizes.
- Define $F(·)$ as the cumulative distribution function (cdf) of job sizes.
- A "short busy period" is defined as a busy period started by a short job, containing only short jobs.

:p What are the mean and Laplace transform of a short busy period in an M/G/1 queue?
??x
To derive the mean and Laplace transform of a short busy period:

1. **Mean of Short Busy Period**:
   - Since short jobs have preemptive priority over long ones, only short jobs will be served during a short busy period.
   - Let $\mu_s$ be the service rate for short jobs.
   - The mean duration of a short busy period can be derived using the properties of the M/G/1 queue with preemptive priority.

2. **Laplace Transform**:
   - For the Laplace transform, consider the inter-arrival and service times of short jobs.
   - Use the renewal reward theorem or directly compute the Laplace transform based on the job size distribution $f(·)$.

Here is a simplified outline:

1. Define the mean response time for short jobs as:
   $$E[T_{short}] = \frac{1}{\mu_s}$$2. For the Laplace transform, consider the inter-arrival and service times of short jobs.
3. Use the renewal reward theorem or directly compute using:
$$\hat{N}_{short}(z) = \int_0^\infty e^{-sz} f(x) dx$$4. The mean is then derived from this transform.

This process involves detailed probability calculations and might require specific distributions of job sizes.
x??

---


#### ON/OFF for M/M/∞ with Setup Time

Background context: In this problem, you are dealing with a large data center approximated as an M/M/∞ system where servers can be turned off when idle. There is setup time $I \sim Exp(\alpha)$ required to turn on a server if an arrival finds it off.

Relevant formulas:
- The number of busy servers follows a Poisson distribution with mean $R = \frac{\lambda}{\mu}$.
- Setup times affect the state transitions in the Markov chain.
- Key result for M/M/∞ with setup time:
  $$P(\text{I servers are busy & J servers are in setup}) = P(\text{I servers are busy}) \cdot P(\text{J servers are in setup})$$where $ P(\text{I servers are busy}) = e^{-R} \frac{R^i}{i!}$ and$$P(\text{J servers are in setup}) = C_j \prod_{l=1}^{j} \left( \frac{\lambda}{\lambda + l\alpha} \right)$$:p Derive the z-transform for the number of jobs served during a busy period in an M/M/∞ system with setup times.
??x
To derive the z-transform for the number of jobs served during a busy period in an M/M/∞ system with setup times:

1. **Define the Z-Transform**:
   - Let $\hat{N}_{setup}(z)$ be the z-transform of the number of jobs served during a busy period.
2. **Consider the State Transitions**:
   - The state transitions involve both busy servers and servers in setup.
3. **Use the Poisson Distribution for Busy Servers**:
   - The number of busy servers follows a Poisson distribution with mean $R = \frac{\lambda}{\mu}$.
4. **Setup Time Impact**:
   - Each server in setup consumes power at rate 240 Watts during its setup time.

The z-transform can be derived using the following steps:

1. Start by defining the state transition probabilities.
2. Use the properties of the Poisson distribution for busy servers.
3. Account for the setup times and their impact on the system state transitions.

Here is a simplified outline:
$$\hat{N}_{setup}(z) = \sum_{i=0}^{\infty} \sum_{j=0}^{\infty} P(\text{I servers are busy & J servers are in setup}) z^{-n}$$where $ n$ is the number of jobs served.

Using the given formulas:
$$P(\text{I servers are busy}) = e^{-R} \frac{R^i}{i!}$$and$$

P(\text{J servers are in setup}) = C_j \prod_{l=1}^{j} \left( \frac{\lambda}{\lambda + l\alpha} \right)$$

Combine these to get the z-transform:
$$\hat{N}_{setup}(z) = \sum_{i=0}^{\infty} e^{-R} \frac{R^i}{i!} \sum_{j=0}^{\infty} C_j \prod_{l=1}^{j} \left( \frac{\lambda}{\lambda + l\alpha} \right) z^{-n}$$

This process involves detailed probability calculations and might require specific values of $\lambda, \mu, \alpha$.
x??

---


#### Response Time Decomposition in M/G/1 with Vacations

Background context: In this problem, you are dealing with an M/G/1 queue where a server takes breaks (vacations) when there are no customers. The vacation time is denoted by $V $, and the response time in such a system is denoted as $\tilde{T}_{M/G/1/Vac}$.

Relevant formulas:
- The decomposition result given in the problem states that:
  $$\tilde{T}_{M/G/1/Vac}(s) = \tilde{T}_{M/G/1}(s) \cdot \tilde{V}_e(s)$$where $\tilde{V}_e(s)$ is the Laplace transform of the excess vacation time.

:p How would you prove the given decomposition result for response times in an M/G/1 with vacations?
??x
To prove the given decomposition, follow a similar approach as used in deriving the results for the M/G/1 with setup times. The key steps are:

1. **Laplace Transform of $\tilde{T}_{M/G/1/Vac}(s)$**: Consider the arrival and service process along with the vacation time.
2. **Conditional Probability**: Use conditional probability to separate the service time from the vacation time.
3. **Decomposition**: The response time can be broken down into two parts - the service time and the excess vacation time when there are no customers.

Here is a detailed outline of the proof:

1. Start by considering the Laplace transform:
   $$\tilde{T}_{M/G/1/Vac}(s) = E[e^{-sT}]$$2. Use the fact that $ T$(the response time) can be decomposed into two parts: the service time and the vacation time when there are no customers.
3. Apply the law of total expectation to separate the terms:
$$\tilde{T}_{M/G/1/Vac}(s) = E[e^{-sT} | \text{no customers}] \cdot P(\text{no customers})$$4. Recognize that $ E[e^{-sT} | \text{no customers}]$is the Laplace transform of the service time (without vacation), and $ P(\text{no customers})$ is related to the vacation process.
5. The final step is to recognize that:
$$\tilde{T}_{M/G/1/Vac}(s) = \tilde{T}_{M/G/1}(s) \cdot \tilde{V}_e(s)$$

This proof follows a similar structure as the one used for M/G/1 with setup times, just substituting vacation time for setup time.
x??

---


#### ON/OFF Policy Analysis in M/M/1

Background context: In this problem, you are revisiting the ON/OFF policy but now for an M/M/1 queue. The goal is to analyze the policy and derive key performance metrics such as limiting probabilities, mean response time, etc.

Relevant formulas:
- Average arrival rate $\lambda $- Service rate $\mu $- Setup time distributed as $ Exp(\alpha)$:p Derive the limiting probabilities for all states in an M/M/1 with ON/OFF policy.
??x
To derive the limiting probabilities for all states in an M/M/1 queue with an ON/OFF policy, follow these steps:

1. **Define States**:
   - Let $P_n $ be the probability that there are$n$ jobs in the system.
2. **Recurrence Relations**:
   - Use balance equations to derive recurrence relations for the probabilities.

For an M/M/1 queue with ON/OFF policy, the key steps involve setting up balance equations and solving them iteratively.

The balance equations can be derived using the following:
$$P_0 = \frac{r}{s + r}$$where $ r = \frac{\lambda}{\mu}$is the traffic intensity and $ s = \alpha$.

For $n > 0$:
$$P_n = (1 - P_0) \frac{(\lambda / \mu)^n}{(1 - (\lambda / \mu))}$$

Solving these equations will give the limiting probabilities for all states.

Here is a simplified outline:

1. Start by defining $P_0$:
   $$P_0 = \frac{\alpha + \lambda}{\alpha + \mu}$$2. Use balance equations to derive $ P_n $ for $ n > 0$.

This process involves detailed probability calculations and might require specific values of $\lambda, \mu, \alpha$.
x??

---


#### ON/OFF Policy Analysis in M/M/1

Background context: In this problem, you are revisiting the ON/OFF policy but now for an M/M/1 queue. The goal is to analyze the policy and derive key performance metrics such as limiting probabilities, mean response time, etc.

Relevant formulas:
- Average arrival rate $\lambda $- Service rate$\mu $- Setup time distributed as$ Exp(\alpha)$:p Derive the limiting probability that the number of jobs in the system exceeds $ k$.
??x
To derive the limiting probability that the number of jobs in the system exceeds $k$, follow these steps:

1. **Define States**:
   - Let $P_n $ be the probability that there are$n$ jobs in the system.
2. **Recurrence Relations**:
   - Use balance equations to derive recurrence relations for the probabilities.

For an M/M/1 queue with ON/OFF policy, the key steps involve setting up balance equations and solving them iteratively.

The balance equations can be derived using the following:

$$P_0 = \frac{r}{s + r}$$where $ r = \frac{\lambda}{\mu}$is the traffic intensity and $ s = \alpha$.

For $n > 0$:
$$P_n = (1 - P_0) \frac{(\lambda / \mu)^n}{(1 - (\lambda / \mu))}$$

To find the limiting probability that the number of jobs in the system exceeds $k$:

$$P(X > k) = \sum_{n=k+1}^{\infty} P_n$$

Here is a simplified outline:

1. Start by defining $P_0$:
   $$P_0 = \frac{\alpha + \lambda}{\alpha + \mu}$$2. Use balance equations to derive $ P_n $ for $ n > 0$.
3. Sum the probabilities from $k+1$ to infinity.

This process involves detailed probability calculations and might require specific values of $\lambda, \mu, \alpha$.
x??

---


#### ON/OFF Policy Analysis in M/M/1

Background context: In this problem, you are revisiting the ON/OFF policy but now for an M/M/1 queue. The goal is to analyze the policy and derive key performance metrics such as limiting probabilities, mean response time, etc.

Relevant formulas:
- Average arrival rate $\lambda $- Service rate$\mu $- Setup time distributed as$ Exp(\alpha)$

:p Derive the mean response time for an M/M/1 with ON/OFF policy.
??x
To derive the mean response time for an M/M/1 queue with an ON/OFF policy, follow these steps:

1. **Define States**:
   - Let $P_n $ be the probability that there are$n$ jobs in the system.
2. **Recurrence Relations**:
   - Use balance equations to derive recurrence relations for the probabilities.

For an M/M/1 queue with ON/OFF policy, the key steps involve setting up balance equations and solving them iteratively.

The balance equations can be derived using the following:

$$P_0 = \frac{r}{s + r}$$where $ r = \frac{\lambda}{\mu}$is the traffic intensity and $ s = \alpha$.

For $n > 0$:
$$P_n = (1 - P_0) \frac{(\lambda / \mu)^n}{(1 - (\lambda / \mu))}$$

The mean response time can be derived using Little's Law:
$$

E[T] = E[N] + E[B]$$where $ E[N]$is the average number of jobs in the system and $ E[B]$ is the average time a job spends in the buffer.

Here is a simplified outline:

1. Start by defining $P_0$:
   $$P_0 = \frac{\alpha + \lambda}{\alpha + \mu}$$2. Use balance equations to derive $ P_n $ for $ n > 0$.
3. Calculate the average number of jobs in the system:
   $$E[N] = \sum_{n=0}^{\infty} n P_n$$4. The mean response time is given by Little's Law.

This process involves detailed probability calculations and might require specific values of $\lambda, \mu, \alpha$.
x??

---


#### Performance Metrics in Scheduling
Scheduling policies are crucial for optimizing performance metrics such as mean response time, fairness, and others. Different policies can impact these metrics significantly.

:p What are some common performance metrics used in evaluating scheduling policies?
??x
Common performance metrics include mean response time, which is the average time a job spends from submission to completion; the transform of response time (often related to tail behavior); slowdown, which measures how much a job's execution time is increased due to scheduling overhead; and fairness, ensuring that no single user or type of job receives disproportionately poor service. Other metrics might include the variability of response times across different jobs.
x??

---


#### Preemptive Scheduling Policies with Job Size Information
Preemptive policies that use information about job sizes can prioritize shorter jobs to reduce mean response time and ensure more flexible scheduling.

:p What are some examples of preemptive scheduling policies that make use of job size?
??x
Examples include Preemptive-Shortest-Job-First (PSJF) and Shortest-Remaining-Processing-Time (SRPT). PSJF preempts the current job if a shorter one arrives, while SRPT serves jobs based on their remaining processing time.

```java
public class PreemptivePriorityScheduler {
    private List<Job> waitingJobs = new ArrayList<>();
    private Job currentJob;

    public void addJob(Job job) {
        waitingJobs.add(job);
    }

    public void runNext() {
        if (currentJob == null && !waitingJobs.isEmpty()) {
            currentJob = waitingJobs.remove(waitingJobs.indexOf(waitingJobs.stream().min(Comparator.comparingInt(Job::getSize)).orElse(null))); // PSJF - shortest job first
        }
        if (currentJob != null) {
            execute(currentJob);
        }
    }

    private void execute(Job job) {
        // Execute the job and manage preemption based on policy
    }
}
```
x??

---


#### Preemptive Priority Queues
Preemptive priority queues prioritize jobs based on a predefined set of priorities, often with additional rules for tie-breaking.

:p What are some examples of preemptive priority queues?
??x
Examples include Preemptive-Shortest-Job-First (PSJF) and Shortest-Remaining-Processing-Time (SRPT). PSJF preempts the current job if a shorter one arrives, while SRPT serves jobs based on their remaining processing time. Both prioritize smaller jobs to minimize mean response times.
```java
public class PreemptivePriorityQueue {
    private List<Job> waitingJobs = new ArrayList<>();
    private Job currentJob;

    public void addJob(Job job) {
        waitingJobs.add(job);
    }

    public void runNext() {
        if (currentJob == null && !waitingJobs.isEmpty()) {
            // Select the next job based on priority and remaining time
            currentJob = waitingJobs.remove(waitingJobs.indexOf(waitingJobs.stream().min(Comparator.comparingInt(Job::getPriority)).orElse(null)));
        }
        if (currentJob != null) {
            execute(currentJob);
        }
    }

    private void execute(Job job) {
        // Execute the job and manage preemption based on policy
    }
}
```
x??

---

---

