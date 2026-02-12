# High-Quality Flashcards: 7A003--Performance-modeling-and-design-of-computer-systems_processed (Part 8)


**Starting Chapter:** 6.4 Proof of Littles Law for Open Systems

---


#### Little's Law Intuition
Background context explaining the intuitive understanding of Little’s Law. Consider a fast-food restaurant where E[T] (average time spent by a customer) and E[N] (average number of customers waiting for service) are inversely proportional. A faster service means lower E[T], while fewer seats result in lower E[N].
:p What is an intuitive way to remember the relationship between E[T] and E[N]?
??x
E[T] should be directly proportional to E[N]. This can be understood by imagining a single FCFS queue where a customer sees E[N] jobs upon arrival, and each job takes approximately 1/λ time to complete on average.
x??

---


#### Little's Law for Open Systems - Statement via Time Averages
Background context explaining the statement of Little’s Law for open systems in terms of time averages. This involves defining λ as the limit of the number of arrivals by time t divided by t, and X as the limit of the number of system completions (departures) by time t divided by t.
:p What is the formal statement of Little's Law for open systems using time averages?
??x
For any system where NTime Avg, TTime Avg, λ, and X exist and where λ = X, then NTime Avg = λ · TTime Avg. This equality relates the time-average number in the system to the product of the arrival rate (λ) and the time-average time in the system.
x??

---


#### Little's Law Proof for Open Systems
Background context explaining the proof of Little’s Law for open systems by considering the area under a graph representing arrivals and departures. The proof involves summing up times spent in the system and comparing it with the number of jobs in the system at any moment.
:p How is Little's Law proved for an open system?
??x
The proof uses the area A formed by rectangles representing time spent in the system. By summing horizontally, we get ∑ Ti ≤ ∫ N(s) ds ≤ ∑ Ti where Ti are times in the system and N(s) represents jobs in the system at any moment s. Dividing by t throughout and taking limits as t → ∞, we get TTime Avg · X = NTime Avg.
x??

---


#### Utilization Law
Background context explaining the concept of device utilization or load. Given a single device with arrival rate λ and service rate μ where λ < μ, the long-run fraction (ρ) that the device is busy can be derived using Little’s Law.
:p How does Little's Law help prove the Utilization Law?
??x
By defining the system as just the service facility without the queue, we find that the number of jobs in this "system" is always 0 or 1. The long-run fraction ρi = λi / μi represents both the busy time and the limiting probability that the device is busy.
x??

---


#### Corollary for Time in Queue
Background context explaining Little's Law application to the time spent in queues. This involves defining NQ as the number of jobs in queue and TQ as the time jobs spend in queues, similar to the main theorem but focusing on queuing times.
:p How can we prove the corollary related to time in queue?
??x
The proof is similar to Theorem 6.3, where Ti are replaced by TQ(i), representing the time the ith arrival spends in queues. The logic involves summing up wasted time and comparing it with the number of jobs in the system at any moment.
x??

---


#### Difference Between Time Averages and Ensemble Averages
Background context explaining the distinction between time averages and ensemble averages, particularly under ergodicity assumptions. This helps in applying Little’s Law to systems where the long-term behavior is consistent across all paths.
:p What does it mean for a system to be ergodic?
??x
Ergodicity means that the time average converges to the ensemble average with probability 1. In simpler terms, on almost every sample path, the observed averages will match the theoretical (ensemble) averages over all possible paths in the system.
x??

---


#### Application of Little's Law to Systems with Service Orders and Multiple Servers
Background context explaining how Little’s Law applies regardless of service order or number of servers. This involves understanding that the law holds for any system configuration, be it FCFS or other scheduling policies.
:p Does Little's Law depend on the specific service order or number of servers?
??x
No, Little’s Law does not depend on the specific service order (e.g., FCFS) or the number of servers. The proof shows that the relationship between average time in system and average number in system holds regardless of these factors.
x??

---

---


#### Little's Law for Closed Systems - General Overview
Little’s Law applies to closed systems where there are no exogenous arrivals, and jobs generate themselves within the system. It states that the number of jobs (N) in a system over time is equal to the throughput (X) times the mean time each job spends in the system (TTime Avg). The formula can be expressed as $N = X \cdot T_{\text{TimeAvg}}$.

:p Can you explain Little's Law for closed systems?
??x
Little’s Law for closed systems states that the number of jobs in a system over time is equal to the throughput (X) times the mean time each job spends in the system ($T_{\text{TimeAvg}}$). This can be expressed as $ N = X \cdot T_{\text{TimeAvg}}$. In simpler terms, it means that the average number of jobs in a closed system is equal to the rate at which jobs leave (throughput) multiplied by the time each job spends in the system.
x??

---


#### Throughput Law for Closed Systems
The Throughput Law (also known as Response Time Law) states that the throughput ($X $) of a closed system can be calculated using $ X = \frac{N}{E[R] - E[Z]}$, where $ N$is the number of users,$ E[R]$is the expected response time, and $ E[Z]$ is the expected think time.

:p What is the Throughput Law for closed systems?
??x
The Throughput Law (or Response Time Law) for a closed system states that the throughput ($X $) can be calculated as $ X = \frac{N}{E[R] - E[Z]}$. This formula relates the number of users, the expected response time, and the expected think time to determine the overall throughput.
x??

---


#### Example 1: Interactive System with N=10 Users
An interactive system has 10 users. The expected think time is $E[Z] = 5 $ seconds, and the expected response time is$E[R] = 15$ seconds.

:p What is the throughput of this system?
??x
Using Little's Law for closed systems, we can calculate the throughput ($X$) as follows:
$$N = X \cdot E[T] = X(E[Z] + E[R])$$

Given $N = 10 $,$ E[Z] = 5 $seconds, and$ E[R] = 15$seconds, we get:
$$10 = X(5 + 15)$$
$$

X = \frac{10}{20} = 0.5 \text{ jobs/sec}$$

The throughput of the system is 0.5 jobs per second.
x??

---


#### Example 2: Disk System with Throughput and Service Time
In a more complex interactive system, disk 3 has a throughput ($X_{\text{disk3}} = 40 $ requests/sec) and an average service time ($E[S_{\text{disk3}}] = 0.0225 $ sec). The average number of jobs in the system consisting of disk 3 and its queue is 4 ($ E[N_{\text{disk3}}] = 4$).

:p What is the utilization of disk 3?
??x
The utilization ($\rho_{\text{disk3}}$) can be calculated using:
$$\rho_{\text{disk3}} = X_{\text{disk3}} \cdot E[S_{\text{disk3}}]$$

Substituting the given values:
$$\rho_{\text{disk3}} = 40 \cdot 0.0225 = 0.9 \text{ or } 90\%$$

The utilization of disk 3 is 90 percent.
x??

---


#### Example 2: System Throughput Calculation
Given the throughput ($X $) and average think time ($ E[Z]$), and knowing that $ E[R] = N / X - E[Z]$, we can calculate the system throughput.

:p How to find the system throughput using only one equation?
??x
To find the system throughput, we can apply Little's Law to the thinking region of the system. The throughput ($X $) is still $ X $, and the mean time spent in the thinking region is$ E[Z]$.

$$E[N_{\text{thinking}}] = X \cdot E[Z] = 0.5 \cdot 5 = 2.5$$

This equation shows that the number of ready users (not thinking) is 7.5, and we can solve for $X $ and$E[R]$:
$$E[R] = N / X - E[Z] = 10 / X - 5$$

Given $N = 10$, solving gives:
$$2.5 = 10 / X - 5$$
$$7.5 = 10 / X$$
$$

X = 10 / 7.5 = 0.5 \text{ jobs/sec}$$

The system throughput is 0.5 jobs per second.
x??

--- 

Each flashcard covers a specific aspect of the provided text, ensuring that all key concepts are explained and understood in detail.

---


#### Little's Law and Operational Laws
Background context: Little’s Law states that the average number of jobs in a system (E[N]) is equal to the arrival rate (λ) multiplied by the average time a job spends in the system (E[T]):$E[N] = \lambda \cdot E[T]$. Other operational laws, such as the Forced Flow Law, are also discussed.

:p What does Little's Law state?
??x
Little's Law states that the average number of jobs in a system ($E[N]$) is equal to the arrival rate (λ) multiplied by the average time a job spends in the system (E[T]):$ E[N] = \lambda \cdot E[T]$. This law helps in understanding the relationship between the number of items in a queue, the rate at which they arrive, and their average waiting time.
x??

---


#### Forced Flow Law
Background context: The Forced Flow Law relates system throughput to the throughput of an individual device. It states that the system throughput (X) is equal to the sum of the product of the number of visits to a device per job (V_i) and the throughput at that device (X_i): $X = \sum_{i} V_i \cdot X_i$.

:p What does the Forced Flow Law state?
??x
The Forced Flow Law states that for every system completion, there are on average $E[Vi]$ completions at device i. Hence, the rate of completions at device i is $E[Vi]$ times the rate of system completions.

Formally: If we observe the system for a large period t, then:
$$X = \lim_{t \to \infty} \frac{C(t)}{t} = \sum_{i} E[V_i] \cdot X_i$$where $ C(t)$ is the number of system completions during time t.

This law can be explained using a single device within a larger system. The visit ratio (Vi) represents the average number of times a job visits device i.
x??

---


#### Combining Operational Laws: Simple Example
Background context: The example uses operational laws to calculate the mean response time in an interactive system with multiple devices.

:p What is the mean response time,$E[R]$, for a system with given characteristics?
??x
Given:
- Number of terminals (N) = 25
- Average think time (E[Z]) = 18 seconds
- Average visits to disk per interaction (E[Vdisk]) = 20
- Disk utilization ($\rho_{disk}$) = 30%
- Average service time per visit (E[Sdisk]) = 0.025 seconds

To find the mean response time $E[R]$:
1. Calculate system throughput:
$$X = \frac{X_{disk}}{E[V_{disk}]} = \frac{\rho_{disk} \cdot E[S_{disk}]}{E[V_{disk}]} = \frac{0.3 \cdot 0.025}{20/181} = 0.6 \text{ interactions/sec}$$2. Calculate mean response time:
$$

E[R] = N \cdot X - E[Z] = 25 \cdot 0.6 - 18 = 23.7 \text{ sec}$$x??

---


#### Combining Operational Laws: Harder Example
Background context: The harder example involves a more complex system with a memory queue and multiple devices.

:p What is the average amount of time that elapses between getting a memory partition and completing the interaction?
??x
The average amount of time spent in the central subsystem can be calculated as:
$$

E[\text{Time in central subsystem}] = E[\text{Response Time}] - E[\text{Time to get memory}]$$

First, calculate the response time using Little's Law:
$$

E[Response Time] = N \cdot X - E[Z] = 23 \cdot 0.45 - 21 = 30.11 \text{ sec}$$

Next, calculate the expected time to get memory:
$$

E[\text{Time to get memory}] = \frac{E[N_{getting memory}]}{X} = \frac{11.65}{0.45} = 25.88 \text{ sec}$$

Finally, the average amount of time spent in the central subsystem is:
$$

E[\text{Time in central subsystem}] = 30.11 - 25.88 = 4.23 \text{ sec}$$
x??

---

