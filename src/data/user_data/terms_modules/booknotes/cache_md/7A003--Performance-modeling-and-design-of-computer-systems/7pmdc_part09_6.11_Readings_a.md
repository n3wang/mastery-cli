# High-Quality Flashcards: 7A003--Performance-modeling-and-design-of-computer-systems_processed (Part 9)


**Starting Chapter:** 6.11 Readings and Further Topics Related to Littles Law

---


#### Total Service Demand per Job Visit (D)
Background context: The total service demand on device \(i\) for all visits of a single job is denoted as \(D_i\). This can be defined as the ratio of the virtual visit time \(V_i\) to the sum of the service times \(S(j)_i\) required by each visit \(j\) of the job to server \(i\).
Formula: 
\[ D_i = \frac{V_i}{\sum_{j=1}^{S(i)} S(j)_i} \]
:p How would you determine \(E[D_i]\) in practice?
??x
To determine \(E[D_i]\), observe the total busy time at device \(i\) during an observation period, denoted as \(B_i\). Also, count the number of system completions during this observation period, denoted as \(C\). The expected value \(E[D_i]\) can be estimated using these measurements:
\[ E[D_i] = \frac{B_i}{C} \]
:p
The formula to determine \(E[D_i]\) involves measuring the busy time and the number of system completions. Explain why this method is practical.
??x
This method is practical because it avoids tracking individual job visits, which can be complex if devices are shared among multiple jobs. By observing the overall busy time and counting completions, we can estimate \(E[D_i]\) without needing to follow each job's interactions with the device.

---


#### Bottleneck Law (ρi)
Background context: The Bottleneck Law is a key principle for understanding the utilization of devices in a system. It relates the arrival rate \(X\) of jobs per second to the expected total service demand per visit \(E[D_i]\).
Formula:
\[ \rho_i = X \cdot E[Di] \]
:p
What does the equation \(\rho_i = X \cdot E[Di]\) represent in terms of device utilization?
??x
The equation represents the utilization (\(\rho_i\)) of a device \(i\) as the product of the arrival rate of jobs per second (\(X\)) and the expected total service demand per visit to that device (\(E[D_i]\)). Intuitively, \(\rho_i\) indicates how much time the device is busy handling work from arriving jobs.
:p
Explain the intuition behind the Bottleneck Law: why does \(X \cdot E[Di]\) represent the utilization of a device?
??x
The law suggests that each job arrival into the system contributes an amount of work \(E[D_i]\) to device \(i\). Since the arrival rate is \(X\) jobs per second, the total busy time for device \(i\) out of every second is given by:
\[ X \cdot E[Di] \]
This formula effectively measures how much of each second the device spends handling work from incoming jobs.

---


#### Proof of Bottleneck Law
Background context: The proof involves using Little’s law and assuming that the number of visits a job makes to a device is independent of its service demand.
Formula:
\[ \rho_i = X \cdot E[Si] = X \cdot E[V_i] \cdot E[S_i] = X \cdot E[D_i] \]
:p
How does the proof show that \(X \cdot E[Di]\) represents the utilization of device \(i\)?
??x
The proof starts with the understanding that the arrival rate \(X\) multiplied by the expected service time \(E[S_i]\) gives the expected total service demand per job (\(E[V_i] \cdot E[S_i]\)). Since \(D_i = V_i / S(i)\), we can rewrite this as:
\[ X \cdot E[Si] = X \cdot (E[V_i] \cdot E[S_i]) = X \cdot E[D_i] \]
Thus, the utilization (\(\rho_i\)) of device \(i\) is given by the product of the arrival rate and the expected total service demand per visit.

---


#### Practical Determination of Utilization
Background context: The practical determination of utilization involves measuring the busy time at a device during an observation period and counting system completions.
Formula:
\[ \rho_i = X \cdot E[D_i] = X \cdot Bi / C \]
:p
How would you practically determine the utilization (\(\rho_i\)) using observations?
??x
Practically, to determine the utilization (\(\rho_i\)), measure the busy time at device \(i\) over a long observation period (denoted as \(B_i\)). Also, count the number of system completions during this same period (denoted as \(C\)). The utilization can then be calculated as:
\[ \rho_i = X \cdot Bi / C \]
where \(X\) is the arrival rate of jobs per second.

---


#### Little's Law Introduction

Little’s Law was invented by J.D.C. Little in 1961 and is a fundamental operational law used to describe relationships between queueing systems.

:p What does Little’s Law state?
??x
Little’s Law states that the long-term average number of customers \( N \) in a stable system is equal to the average customer arrival rate \( \lambda \) multiplied by the average time a customer spends in the system \( W \). Formally, it can be expressed as:

\[ N = \lambda W \]

This law holds true for any queueing system that is in steady state and does not require jobs to leave in the order they arrive.

??x

---


#### Professor and Students

The professor takes on new Ph.D. students based on a strategy: 2 students in even-numbered years, 1 student in odd-numbered years. The average time to graduate is 6 years.

:p How many students will the professor have on average?
??x
To determine the average number of students, we can use Little’s Law:

\[ N = \lambda W \]

where \( \lambda \) is the arrival rate and \( W \) is the average time a student spends in the system. Here, each new student represents an arrival event, so the arrival rate \( \lambda \) is 1 student every 2 years (since there's one or two students arriving per year on average).

The average time \( W \) for a student to complete their Ph.D. is 6 years.

Thus:

\[ N = \frac{1 \text{ student/year}}{2} \times 6 \text{ years} = 3 \]

So, the professor will have an average of 3 students at any given time.
??x

---


#### Measurements Gone Wrong

David's advisor asked David the number of jobs at the database, but David answered "5."

:p What went wrong?
??x
The issue lies in applying Little’s Law incorrectly. According to Little’s Law:

\[ N = \lambda W \]

Where \( N \) is the average number of jobs at the system (database), \( \lambda \) is the arrival rate, and \( W \) is the average time a job spends in the database.

If 90% of jobs find their data in cache with an expected response time of 1 second:

\[ N_{cache} = \lambda \times 1 \text{ second} = 0.9 \lambda \]

For 10% of jobs, it takes 10 seconds to get the data from the database:

\[ N_{database} = 0.1 \lambda \times 10 \text{ seconds} = \lambda \]

So, the total number of jobs in the system is:

\[ N = N_{cache} + N_{database} = 0.9 \lambda + \lambda = 1.9 \lambda \]

David incorrectly assumed \( N = 5 \), which means his advisor asked for \( \lambda \):

\[ 5 = 1.9 \lambda \implies \lambda = \frac{5}{1.9} \approx 2.63 \text{ jobs per second} \]

Thus, David's answer of "5" is not consistent with the actual number of jobs in the system.
??x

---


#### More Practice Manipulating Operational Laws

For an interactive system with given data:

- Mean user think time = 5 seconds
- Expected service time at device \( i \) = 0.01 seconds
- Utilization of device \( i \) = 0.3
- Utilization of CPU = 0.5
- Expected number of visits to device \( i \) per visit to CPU = 10
- Expected number of jobs in the central subsystem (cloud shape) = 20
- Expected total time in system per job = 50 seconds

:p Calculate the average number of jobs in the queue portion of the CPU on average, \( E\left[\frac{N_{cpu}}{Q}\right] \).
??x
To find the average number of jobs in the queue portion of the CPU (\( N_{cpu} \)):

1. **CPU Utilization and Number of Jobs**:
   - Given utilization \( U = 0.5 \), this means each CPU processes half a job per unit time.
   
2. **Expected Number of Visits to Device \( i \)**:
   - Expected number of visits to device \( i \) per visit to CPU is 10, and the expected service time at device \( i \) is 0.01 seconds.

3. **Total Time in System**:
   - The total time in system per job = 50 seconds.
   
4. **Expected Number of Jobs in the Central Subsystem (Cloud Shape)**:
   - Expected number of jobs in the central subsystem \( N_{cloud} = 20 \).

Using Little’s Law for the cloud shape:

\[ E[N_{cloud}] = \lambda E[W] \]

Where \( E[W] \) is the average time a job spends in the system. Given \( E[W] = 50 \text{ seconds} \), we can find \( \lambda \):

\[ 20 = \lambda \times 50 \implies \lambda = \frac{20}{50} = 0.4 \]

For CPU:

- Utilization \( U = 0.5 \) implies that on average, there are 0.5 jobs being processed per unit time.

The number of jobs in the queue portion of the CPU can be found using the relationship between utilization and the number of jobs in the system:

\[ N_{cpu} = \frac{\lambda}{1 - U} = \frac{0.4}{1 - 0.5} = \frac{0.4}{0.5} = 0.8 \]

Thus, \( E\left[\frac{N_{cpu}}{Q}\right] = 0.8 \).

??x

---


#### Response Time Law for Closed Systems

The Response Time Law for a closed interactive system states:

\[ E[R] = N - E[Z] \]

Where:
- \( E[R] \) is the expected response time.
- \( N \) is the number of jobs in the system.
- \( E[Z] \) is the average job size.

:p Prove that \( E[R] \) can never be negative.
??x
To prove that \( E[R] \) cannot be negative, we need to consider the components of Response Time Law:

\[ E[R] = N - E[Z] \]

Where:
- \( E[R] \): Expected response time per job.
- \( N \): Number of jobs in the system.
- \( E[Z] \): Average size of a job.

Since \( N \) represents the number of jobs and it must be non-negative, and \( E[Z] \) is the average size of each job which is also non-negative:

\[ N - E[Z] \geq 0 \]

Therefore, the expected response time per job cannot be negative. If all jobs were to have zero size or if there were no jobs in the system, \( E[R] \) would still be zero.

Thus, we can conclude that:

\[ E[R] \geq 0 \]

??x

---


#### Mean Slowdown

Little’s Law relates mean response time to number of jobs. The question asks whether a similar law can relate mean slowdown to the number of jobs in the system. 

:p Derive an upper bound for the mean slowdown.
??x
Mean slowdown \( S \) is defined as:

\[ S = \frac{E[R]}{\lambda} \]

Where:
- \( E[R] \): Expected response time.
- \( \lambda \): Arrival rate.

We want to find a relationship between \( S \), \( N \) (number of jobs in the system), and \( \lambda \). For an M/G/1 FCFS queue, we can use the following bound:

\[ E[Slowdown] \leq \frac{E[N]}{\lambda} \cdot E\left[\frac{1}{S}\right] \]

Where:
- \( E[S] \): Expected service time.
- \( E\left[\frac{1}{S}\right] \): The expected reciprocal of the service time.

This bound shows that mean slowdown is upper bounded by the product of the average number of jobs and the reciprocal of the expected service time, normalized by the arrival rate.

Thus:

\[ E[Slowdown] \leq \frac{E[N]}{\lambda} \cdot E\left[\frac{1}{S}\right] \]

??x

---


#### Asymptotic Bounds for Closed Systems
Background context: In this section, we explore how to use operational laws to estimate performance metrics such as system throughput (X) and expected response time (E[R]) for closed systems. We derive asymptotic bounds that provide estimates of these metrics based on the multiprogramming level \(N\).

:p What are asymptotic bounds in the context of closed systems, and why are they important?
??x
Asymptotic bounds give us estimates of system throughput \(X\) and expected response time \(E[R]\) as a function of the multiprogramming level \(N\). They are particularly useful because they provide upper and lower limits that closely approximate the actual performance metrics for both small and large values of \(N\).

These bounds help in understanding the behavior of closed systems under different conditions without needing detailed simulations or complex calculations.

??x
The asymptotic bounds are derived using operational laws such as Little's Law, Response Time Law, Utilization Law, etc. For a closed system with \(m\) devices and multiprogramming level \(N\), we define:
- \(D = \frac{1}{\sum_{i=1}^{m} E[Di]}\)
- \(D_{max} = \max_i \{E[Di]\}\)

The bounds are given by:
- For large \(N\): 
  - \(X \leq \min\left(\frac{N}{D + E[Z]}, \frac{1}{D_{max}}\right)\)
  - \(E[R] \geq \max(D, N \cdot D_{max} - E[Z])\)

For small \(N\):
- \(X = \frac{N}{E[R] + E[Z]} \leq \min\left(\frac{N}{D}, \frac{1}{D_{max}}\right)\)
- \(E[R](N) \geq D_1\), where \(D_1\) is the time spent on the bottleneck device for a single job.

??x
The power of these bounds lies in their simplicity and accuracy, especially when applied to large or small values of \(N\).

??x
```java
public class AsymptoticBounds {
    public double throughput(double N, double D, double EZ) {
        return Math.min(N / (D + EZ), 1 / D);
    }
    
    public double responseTime(double N, double D, double DMX, double EZ) {
        return Math.max(D, N * DMX - EZ);
    }
}
```
x??

---


#### Bottleneck Law
Background context: The bottleneck law states that the system throughput \(X\) is related to the service demand on the device with the highest utilization. Over a long observation period \(T\), the total service demand \(D_i\) for device \(i\) is given by:
\[ D_i = \frac{B_i}{C} \]
where \(B_i\) is the total time during \(T\) that device \(i\) is busy and \(C\) is the total number of system completions during \(T\).

The Bottleneck Law states that:
\[ X = \rho_i E[D_i] \]

:p What does the bottleneck law state, and how does it help in understanding closed systems?
??x
The bottleneck law states that the system throughput \(X\) can be determined by the utilization \(\rho_i\) of the device with the highest service demand. Specifically:
\[ X = \rho_i E[D_i] \]
where \(E[D_i]\) is the expected total time a job spends on device \(i\).

This law helps in identifying the critical devices or bottlenecks that limit the overall system performance.

??x
The bottleneck law indicates that to increase the throughput of a closed system, focusing on reducing the service demand times for the bottleneck device can be more effective than improving other less utilized devices. This is because the system's throughput is limited by the slowest part (bottleneck).

??x
```java
public class BottleneckLaw {
    public double throughput(double rhoI, double EDi) {
        return rhoI * EDi;
    }
}
```
x??

---


#### Response Time Law for Closed Interactive Systems
Background context: For an ergodic closed interactive system with \(N\) terminals (users), the expected response time \(E[R]\) can be calculated using:
\[ E[R] = N/X - E[Z] \]
where \(X\) is the throughput and \(E[Z]\) is the mean think time per job.

:p What is the Response Time Law for closed interactive systems, and how is it used?
??x
The Response Time Law for closed interactive systems states that:
\[ E[R] = N/X - E[Z] \]
where \(N\) is the number of users (multiprogramming level), \(X\) is the throughput, and \(E[Z]\) is the mean think time per job.

This law helps in understanding how response times are influenced by both the number of users and the system's throughput. By knowing \(E[R]\), one can estimate either the throughput or the think time based on other known parameters.

??x
For example, if we know the expected response time \(E[R]\) and the mean think time \(E[Z]\), we can calculate the system throughput \(X\) using:
\[ X = \frac{N - E[Z]}{E[R]} \]

Similarly, if the throughput \(X\) is known, we can find the expected response time by rearranging the formula:
\[ E[R] = N/X - E[Z] \]

??x
```java
public class ResponseTimeLaw {
    public double responseTime(double N, double X, double EZ) {
        return N / X - EZ;
    }
    
    public double throughput(double N, double ER, double EZ) {
        return (N - EZ) / ER;
    }
}
```
x??

---


#### Utilization Law
Background context: The utilization law provides a way to determine the utilization \(\rho_i\) of a server \(i\). For a single server:
\[ \rho_i = \frac{\lambda_i}{\mu_i} = \frac{\lambda_i}{1/E[Si]} \]
where \(\lambda_i\) is the average arrival rate into the server, and \(\mu_i = 1/E[Si]\) is the mean service rate at the server.

:p What does the utilization law state, and how is it used in analyzing servers within a closed system?
??x
The Utilization Law states that the utilization \(\rho_i\) of a server \(i\) can be calculated as:
\[ \rho_i = \frac{\lambda_i}{\mu_i} = \frac{\lambda_i E[Si]}{1} \]
where \(\lambda_i\) is the average arrival rate into the server, and \(E[Si]\) is the expected service time at the server.

This law helps in understanding the load on individual servers by balancing the arrival rates with the service capacities. High utilization (\(\rho_i > 1\)) indicates that the server might be a bottleneck for the system.

??x
For example, if we know the average arrival rate \(\lambda_i\) and the expected service time \(E[Si]\) of a server, we can calculate its utilization as:
\[ \rho_i = \frac{\lambda_i}{1/E[Si]} \]

If \(\rho_i > 1\), it means that the server is overloaded. If \(\rho_i < 1\), it indicates that there might be idle time.

??x
```java
public class UtilizationLaw {
    public double utilization(double lambdaI, double EServiceTime) {
        return lambdaI / (1 / EServiceTime);
    }
}
```
x??

---

---

