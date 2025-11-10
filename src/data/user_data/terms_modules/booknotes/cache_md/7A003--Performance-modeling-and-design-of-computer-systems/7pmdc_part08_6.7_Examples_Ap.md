# High-Quality Flashcards: 7A003--Performance-modeling-and-design-of-computer-systems_processed (Part 8)


**Starting Chapter:** 6.7 Examples Applying Littles Law

---


#### Little's Law for Closed Systems - Red Jobs
Little’s Law can be applied to subsets of jobs, such as "red" jobs. The proof is analogous to the general case but focuses only on the red jobs.
:p Can we apply Little's Law to just "red" jobs?
??x
Yes, we can apply Little's Law to just "red" jobs by focusing solely on their system times and arrival rates.

The formula for the expected number of red jobs in the system is:
\[ E[\text{Number of red jobs in system}] = \lambda_{\text{red}} \cdot E[\text{Time spent in system by red jobs}] \]

This holds because the law remains valid even when considering a subset of jobs as long as they follow the same principles.
x??

---

#### Little's Law for Closed Systems - Time Averages
Little’s Law for closed systems is restated using time averages. It states that the number of jobs in a system (N) equals the throughput (X) multiplied by the average time each job spends in the system (TTime Avg).
:p What does Little’s Law state for a closed system?
??x
For a closed system, Little's Law states:
\[ N = X \cdot T\text{Time Avg} \]

Where:
- \(N\) is the number of jobs in the system.
- \(X\) is the throughput (jobs per unit time).
- \(T\text{Time Avg}\) is the average time each job spends in the system.

The proof involves analyzing the total time in system and the number of completions, showing that these quantities are related through the throughput and average time.
x??

---

#### Generalized Little’s Law
Little's Law can be generalized to relate higher moments (such as \(E[T^2]\) and \(E[N^2]\)) under certain conditions. However, deriving such relationships is typically complex for multi-queue systems.
:p Can we generalize Little's Law to include higher moments?
??x
Yes, in some cases, Little’s Law can be generalized to relate higher moments like \(E[T^2]\) and \(E[N^2]\). This generalization often requires restrictive conditions such as jobs leaving in the order they arrive, like in a single FCFS queue.

However, for multi-queue systems, deriving these relationships is usually very difficult.
x??

---

#### Applying Little's Law to Interactive Systems - Throughput
In an interactive system with \(N\) users, we can use Little’s Law to find the throughput (X) of the system by considering the average think time (\(E[Z]\)) and response time (\(E[R]\)).
:p How do you calculate the throughput using Little's Law for an interactive system?
??x
To calculate the throughput \(X\) in an interactive system, use Little’s Law:
\[ N = X \cdot (E[Z] + E[R]) \]

Rearranging to solve for \(X\):
\[ X = \frac{N}{E[R] + E[Z]} \]

Given \(N=10\), \(E[Z]=5\) seconds, and \(E[R]=15\) seconds:
\[ X = \frac{10}{5+15} = 0.5 \text{ jobs/sec} \]
x??

---

#### Applying Little's Law to Disk Systems - Utilization
For a disk system with known throughput (\(X\)), service time (\(E[S]\)), and number of jobs in the system (\(E[N]\)), we can calculate the utilization.
:p How do you find the utilization of a disk using Little’s Law?
??x
To find the utilization (\(\rho\)) of a disk, use the formula:
\[ \rho = X \cdot E[S] \]

Given \(X_{\text{disk3}}=40\) requests/sec and \(E[S_{\text{disk3}}]=0.0225\) sec:
\[ \rho_{\text{disk3}} = 40 \cdot 0.0225 = 0.9 \]
or 90 percent.

This shows the disk is operating at full capacity.
x??

---

#### Applying Little's Law - System Throughput
In a complex system, we can apply Little’s Law to different subsystems and solve for throughput by considering the number of jobs in each region.
:p How do you determine the system throughput using Little’s Law?
??x
To determine the system throughput \(X\), use the relationship:
\[ X = \frac{N}{E[R] + E[Z]} \]

Given \(N=10\), \(E[Z]=5\) seconds, and knowing \(E[R]\) indirectly through non-thinking users (\(E[N_{\text{not-thinking}}]/X\)):
\[ E[R] = \frac{7.5}{X} \]
Solving simultaneously:
\[ X = 0.5 \text{ requests/sec}, \quad E[R] = 15 \text{ sec} \]

This shows the system throughput and average response time.
x??

---

#### Finite Buffer System - Little’s Law
For a single FCFS queue with capacity limitations, Little’s Law can be applied to find relationships between arrival rate (\(\lambda\)), service rate (\(\mu\)), and buffer size.
:p How does Little's Law apply in a finite buffer system?
??x
In a finite buffer system, such as the one shown in Figure 6.10 with a capacity of 7 jobs (1 serving + 6 waiting), arrivals that find a full buffer are dropped.

Little’s Law can be applied to understand:
\[ \lambda = X \cdot (\mu - \lambda/n) \]

Given \(\mu=4\) and \(\lambda=3\):
The system throughput \(X\) is effectively lower due to the finite buffer. The actual arrival rate must be less than what would normally be allowed by the service rate.
x??

---


#### Little's Law and Operational Laws Overview
Little's Law provides a fundamental relationship between the average number of items in a system (N), the average rate at which items arrive (λ), and the average time an item spends in the system (T): E[N] = λ·E[T].
Additional operational laws like the Forced Flow Law relate system throughput to individual device performance.
:p What is Little's Law?
??x
Little's Law states that the long-term average number of entities (N) in a stationary system is equal to the average rate at which entities arrive (λ) multiplied by the average time an entity spends in the system (T): E[N] = λ·E[T].
x??

---
#### Forced Flow Law Explanation
The Forced Flow Law relates system throughput (X) to individual device throughput (Xi) and visit ratio (Vi). It states that for every system completion, there are on average E[Vi] completions at device i: X = E[Vi]·X.
:p What is the Forc...
??x
The Forced Flow Law relates system throughput \(X\) to the individual device throughput \(X_i\) and visit ratio \(V_i\). It states that for every system completion, there are on average \(\mathbb{E}[V_i]\) completions at device \(i\): 
\[ X = E[V_i]·X. \]
x??

---
#### Calculating Visit Ratios
Given the network in Figure 6.12 with various disk and CPU interactions, visit ratios (Vi) can be calculated by considering the number of visits a job makes to each component.
:p What are the visit ratios for the given system?
??x
The visit ratios \(E[V_a]\), \(E[V_b]\), and \(E[V_{cpu}]\) can be determined as follows:
- For Disk \(a\): 
  \[ E[V_a] = E[V_{cpu}]·\frac{80}{181}. \]
- For Disk \(b\):
  \[ E[V_b] = E[V_{cpu}]·\frac{100}{181}. \]
- For CPU:
  \[ 1 = E[V_{cpu}]·\frac{1}{181}. \]

Solving these equations yields:
\[ E[V_{cpu}] = 181, \quad E[V_a] = 80, \quad E[V_b] = 100. \]
x??

---
#### Response Time Calculation
In an interactive system with given parameters (N=25 terminals, E[Z]=18 seconds average think time, E[Vdisk]=20 visits to a specific disk per interaction), the mean response time \(E[R]\) can be calculated using Little's Law and the Forced Flow Law.
:p What is the mean response time for the system?
??x
The mean response time \(E[R]\) can be calculated as follows:
1. Calculate the system throughput \(X\):
   \[ X = E[V_{cpu}]·X_{disk} = 30 · 0.6 = 18 \text{ interactions/second}. \]

2. Using Little's Law to find the mean response time \(E[R]\):
   \[ E[R] = N / X - E[Z] = 25 / 18 - 18 = 3.4444 - 18 = 0.7667 \text{ seconds}. \]

So, the mean response time is approximately:
\[ E[R] = 3.7 \text{ seconds}.\]
x??

---
#### Combined Operational Laws Application
In a complex system with multiple components (e.g., CPU and disks), various operational laws can be combined to solve for unknowns like response time or visit ratios.
:p How does one calculate the average amount of time that elapses between getting a memory partition and completing an interaction?
??x
To find the average amount of time that elapses between getting a memory partition and completing an interaction, use:
\[ \text{E[Time in central subsystem]} = \text{E[Response Time]} - \text{E[Time to get memory]}. \]

Given data:
- Number of users \(N = 23\)
- Average think time \(E[Z] = 21\) seconds
- System throughput \(X = 0.45\) interactions/second
- Average number of requests trying to get memory \(E[N_{getting memory}] = 11.65\)

First, calculate the response time:
\[ \text{E[Response Time]} = N / X - E[Z] = 23 / 0.45 - 21 = 51.1111 - 21 = 30.1111 \text{ seconds}. \]

Next, calculate the time to get memory:
\[ \text{E[Time to get memory]} = E[N_{getting memory}] / X = 11.65 / 0.45 = 25.8889 \text{ seconds}. \]

Thus, the average amount of time in the central subsystem is:
\[ \text{E[Time in central subsystem]} = 30.1111 - 25.8889 = 4.2222 \text{ seconds}.\]
x??

---
#### CPU Utilization Calculation
CPU utilization (\(\rho_{cpu}\)) can be calculated using the system throughput \(X\) and the average service demand per visit to the CPU \(E[S_{cpu}]\).
:p What is the CPU utilization for the given system?
??x
The CPU utilization \(\rho_{cpu}\) is calculated as:
\[ \rho_{cpu} = X_{cpu}·E[S_{cpu}] = X·E[V_{cpu}]·E[S_{cpu}]. \]

Given data:
- System throughput \(X = 0.45\) interactions/second
- Average visits to the CPU per interaction \(E[V_{cpu}] = 3\)
- Average service demand per visit to the CPU \(E[S_{cpu}] = 0.21\) seconds

Thus, the CPU utilization is:
\[ \rho_{cpu} = 0.45·3·0.21 = 0.28.\]
x??


#### Total Service Demand (D)
Background context: The total service demand \( D_i \) on device \( i \) for all visits of a single job is defined as the average service time required by all visits to server \( i \), given by:
\[ D_i = V_i / \sum_{j=1}^S(j)_i, \]
where \( S(j)_i \) is the service time required by the \( j \)-th visit of the job to device \( i \). By (3.3), we know that:
\[ E[D_i] = E[V_i] \cdot E[S_i], \]
provided \( V_i \) and the \( S(j)_i \)'s are independent.
:p What is the definition of total service demand (\( D_i \))?
??x
Total service demand \( D_i \) on device \( i \) for a single job visit is the average service time required by all visits to server \( i \).
x??

#### Bottleneck Law
Background context: The Bottleneck Law states that:
\[ \rho_i = X \cdot E[D_i], \]
where \( X \) is the jobs/sec arriving into the whole system, and \( E[D_i] \) is the expected total service demand on device \( i \). This law helps in determining the utilization of a device.
:p What does the Bottleneck Law represent?
??x
The Bottleneck Law represents the utilization (\( \rho_i \)) of device \( i \), which is the fraction of time that device \( i \) is busy. It is calculated as the product of the arrival rate of jobs into the system and the expected total service demand per job on device \( i \).
x??

#### Determining Expected Total Service Demand (\( E[D_i] \))
Background context: To determine \( E[D_i] \), we can use a long observation period. The formula for \( E[D_i] \) is:
\[ E[D_i] = B_i / C, \]
where \( B_i \) is the busy time at device \( i \) during the observation period and \( C \) is the number of system completions.
:p How can you determine \( E[D_i] \) in practice?
??x
In practice, to determine \( E[D_i] \), observe a long period where:
\[ E[D_i] = B_i / C, \]
where \( B_i \) is the busy time at device \( i \) and \( C \) is the number of system completions during this observation. These are easy measurements.
x??

#### Utilization (\( \rho_i \))
Background context: The utilization of a device \( i \) is given by:
\[ \rho_i = X \cdot E[D_i], \]
where \( X \) is the jobs/sec arriving into the whole system and \( E[D_i] \) is the expected total service demand on device \( i \).
:p How is the utilization (\( \rho_i \)) of a device calculated?
??x
The utilization (\( \rho_i \)) of a device \( i \) is calculated as:
\[ \rho_i = X \cdot E[D_i], \]
where \( X \) represents the arrival rate of jobs into the system and \( E[D_i] \) is the expected total service demand on device \( i \).
x??

---

These flashcards cover the key concepts from the provided text, focusing on understanding the definitions, formulas, and practical methods for determining these values.

