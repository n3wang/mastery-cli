# High-Quality Flashcards: 7A003--Performance-modeling-and-design-of-computer-systems_processed (Part 12)


**Starting Chapter:** 8.6 The Stationary Distribution Equals the Limiting Distribution

---


#### Concept of Stationary Distribution and Limiting Probability
The concept revolves around understanding how, as $n \to \infty $, the probabilities of being in any state stabilize to a certain distribution. This is denoted by $\pi_j = \lim_{n \to \infty} P^n_{ij}$, where $ P$is the transition probability matrix and $ i, j$ are states.

The stationary distribution $\vec{\pi} = (\pi_0, \pi_1, ..., \pi_{M-1})$ satisfies the equation $\vec{\pi} \cdot P = \vec{\pi}$ where $\sum_{i=0}^{M-1} \pi_i = 1$.

:p What does the stationary distribution represent in a Markov Chain?
??x
The stationary distribution represents the limiting probabilities of being in each state as $n \to \infty$ and is independent of the initial state. This means that if we start with any distribution, after many transitions, the system's state probability will stabilize to this stationary distribution.
x??

---


#### Concept of Stationary Equations for Markov Chains
The stationary equations for a finite-state discrete-time Markov chain (DTMC) involve finding a probability distribution $\vec{\pi}$ such that $\vec{\pi} \cdot P = \vec{\pi}$, where $ P$ is the transition matrix. This means that if the system starts in this distribution, it will remain in the same distribution after any number of transitions.

:p How do we determine $\pi_j = \lim_{n \to \infty} P^n_{ij}$?
??x
To determine the stationary probability $\pi_j $, we can solve the stationary equations. Specifically, for a finite-state DTMC with $ M $states, find a vector$\vec{\pi} = (\pi_0, \pi_1, ..., \pi_{M-1})$ such that $\sum_{i=0}^{M-1} \pi_i = 1$ and $\pi_j = \sum_{k=0}^{M-1} \pi_k P_{kj}$ for all $j$.

Here's the logic in pseudocode:
```pseudocode
function findStationaryDistribution(P):
    // Initialize pi vector with equal probabilities (for simplicity)
    let pi = [1/M, 1/M, ..., 1/M]
    
    // Iterate until convergence or max iterations reached
    for each iteration do:
        newPi = []
        for j from 0 to M-1 do:
            sum = 0
            for k from 0 to M-1 do:
                sum += pi[k] * P[k][j]
            newPi.append(sum)
        
        // Check convergence or update pi
        if closeEnough(newPi, pi):
            return newPi
        else:
            pi = newPi
    
    return pi
```
x??

---


#### Concept of Theorem for Stationary and Limiting Distribution Equivalence
For a finite-state DTMC, the theorem states that the stationary distribution obtained by solving the stationary equations is unique and represents the limiting probabilities if these exist.

:p How does the theorem relate the limiting distribution to the stationary distribution?
??x
The theorem says that for a finite-state DTMC with $M $ states, if$\pi_j = \lim_{n \to \infty} P^n_{ij}$ exists, then this $\vec{\pi}$ is also a stationary distribution and no other stationary distribution can exist. This means the limiting probabilities are exactly the same as the unique stationary distribution.

The proof involves showing that:
1. The limiting distribution satisfies the stationary equations.
2. Any stationary distribution must be equal to the limiting distribution.

This equivalence helps in determining the long-term behavior of the Markov chain without having to compute many transition steps.
x??

---


#### Concept of Steady State for Markov Chains
A Markov Chain is said to be stationary or in steady state if it has a unique stationary distribution $\vec{\pi}$ and the initial state is chosen according to these stationary probabilities.

:p What does "stationary" mean for a Markov chain?
??x
For a Markov chain, being "stationary" means that once the system reaches this state (where probabilities of being in any state are given by $\vec{\pi}$), it remains there indefinitely. This is achieved if the initial distribution matches $\vec{\pi}$, ensuring no matter the starting point, after many transitions, the probability distribution stabilizes to $\vec{\pi}$.
x??

---

---


#### Repair Facility Problem with Cost
Background context: The repair facility problem involves a Markov chain representing whether a machine is working (W) or broken (B). Given transition probabilities and costs, we need to find the annual repair bill. 
The relevant equations from the problem are:
- πW = 0.95 * πW + 0.4 * πB
- πB = 0.05 * πW + 0.6 * πB
- πW + πB = 1

:p What do you notice about the first two equations?
??x
These equations are linearly dependent, as shown by their identical structure and coefficients. The second equation can be derived from the first one by rearranging terms.
```java
// Example code to solve for πW and πB
public class RepairFacility {
    public static void main(String[] args) {
        double piW = 8 / 9; // Calculated value of πW
        double piB = 1 / 9; // Calculated value of πB
        
        System.out.println("πW: " + piW);
        System.out.println("πB: " + piB);
    }
}
```
x??

---


#### Umbrella Problem with General Probability p
Background context: The umbrella problem involves determining the probability that a professor gets soaked given the daily probability of rain, p. We need to derive the limiting probabilities for general p using stationary equations.
The relevant stationary equations are:
- π0 = π2 * (1 - p)
- π1 = π1 * (1 - p) + π2 * p
- π2 = π0 * 1 + π1 * p
- π0 + π1 + π2 = 1

:p What is the fraction of days the professor gets soaked if the probability of rain is p=0.6?
??x
The professor gets wet when she has zero umbrellas and it is raining, which corresponds to π0 * p. Given p = 0.6, we calculate:
π0·p = (1 - p) / (3 - p) * p = (1 - 0.6) / (3 - 0.6) * 0.6 = 0.4 / 2.4 * 0.6 = 0.1
Thus, the professor gets soaked 10% of the days.
```java
// Example code to calculate π0 for p=0.6
public class UmbrellaProblem {
    public static void main(String[] args) {
        double p = 0.6;
        double pi0 = (1 - p) / (3 - p);
        double soakedProbability = pi0 * p; // Probability of getting soaked
        
        System.out.println("Soaked probability: " + soakedProbability);
    }
}
```
x??

---


#### Proof of Uniqueness of Stationary Distribution in Infinite-State DTMCs
Background context: The second part of the proof involves proving that any stationary distribution must be equal to the limiting distribution.
:p What does the second part of the proof prove?
??x
The second part proves that any stationary distribution π′ must equal the limiting distribution πj. This is done by showing that for any j, π′j = πj.

```java
// Example code to verify uniqueness (pseudocode)
public class UniquenessProof {
    public static void main(String[] args) {
        double p = 0.6; // Probability of rain
        
        // Calculate πj for infinite-state DTMC
        double pi0 = (1 - p) / (3 - p);
        
        System.out.println("π0: " + pi0); // Verify that it satisfies the stationary condition and uniqueness
    }
}
```
x??

---

---


#### Stationary Equations and Limiting Probability Distribution for DTMCs

Background context: In discrete-time Markov chains (DTMCs), the stationary equations are used to find the limiting probability distribution vector $\pi $. This is done by solving an infinite number of equations, each representing a state's long-term probability. The key idea is that as $ n $approaches infinity, the probability of being in state$ j $converges to$\pi_j$.

Formulas and explanations:
- $\pi_j = \sum_{i=0}^{\infty} P_{ij} \pi_i $- To prove that $\pi_j$ is bounded above and below by itself, we use the sandwich theorem: 
  -$\sum_{i=0}^{M} P_{ij} \pi_i \leq \pi_j \leq \sum_{i=0}^{M} P_{ij} \pi_i + \sum_{i=M+1}^{\infty} \pi_i $- As $ M $ approaches infinity, the bounds become tighter and converge to $\pi_j$.

:p What is the main theorem or concept being discussed in this section?
??x
The main theorem discusses how to find the limiting probability distribution vector $\pi$ for a DTMC by solving an infinite number of stationary equations. It uses the sandwich theorem to prove that the solution converges to the actual probabilities.
x??

---


#### Unbounded Queue Example

Background context: The example provided deals with an unbounded queue system where jobs can arrive and depart at each time step according to certain probabilities. The goal is to determine the average number of jobs in the system using a DTMC model.

Formulas and explanations:
- Transition probability matrix $P$ for the infinite states (0, 1, 2, ...):
  -$ P = \begin{pmatrix} 
    1-r & r & 0 & 0 & \cdots \\
    s(1-r-s) & 1-r-s & s & 0 & \cdots \\
    0 & sr & 1-r-s & s & \cdots \\
    \vdots & \vdots & \vdots & \vdots & \ddots 
    \end{pmatrix} $- Stationary equations:
  -$\pi_0 = \pi_0(1-r) + \pi_1s $-$\pi_1 = \pi_0r + \pi_1(1-r-s) + \pi_2s $-$\pi_i = r/s \cdot \pi_{i-1}$:p What is the structure of the transition probability matrix for this unbounded queue example?
??x
The transition probability matrix $P $ has a specific structure where each row transitions to itself with probability$1-r $ and to neighboring states with probabilities dependent on$r $, $ s$. The matrix extends infinitely, making it difficult to handle using traditional methods.
x??

---


#### Solving Stationary Equations

Background context: When dealing with an infinite number of stationary equations in a DTMC, the approach is to express $\pi_i $ in terms of$\pi_0$. This involves repeatedly substituting expressions and observing patterns.

Formulas and explanations:
- Expressing $\pi_1 $ from$\pi_0$:
  - $\pi_1 = r/s \cdot \pi_0 $- Substituting $\pi_1 $ into the second equation to get$\pi_2$:
  - $\pi_2 = (r/s)^2 \cdot \pi_0$- Generalizing this for all states:
  -$\pi_i = (r/s)^i \cdot \pi_0 $:p How do you express $\pi_1 $ in terms of$\pi_0$?
??x
We express $\pi_1 $ as$\pi_1 = r/s \cdot \pi_0$.
x??

---


#### Determining $\pi_0 $ Background context: Once we have the general form for$\pi_i $, the next step is to determine $\pi_0 $ by using the normalization condition$\sum_{i=0}^{\infty} \pi_i = 1$.

Formulas and explanations:
- Sum of probabilities:
  - $\pi_0(1 + r/s + (r/s)^2 + (r/s)^3 + \cdots) = 1$
  - This is a geometric series with sum: 
    - $\pi_0 \cdot \frac{1}{1 - r/s} = 1 $:p How do you determine the value of$\pi_0$?
??x
To determine $\pi_0$, we use the normalization condition:
- $\pi_0 \cdot (1 + r/s + (r/s)^2 + (r/s)^3 + \cdots) = 1$- This is a geometric series with sum: 
  -$\pi_0 \cdot \frac{1}{1 - r/s} = 1 $- Therefore,$\pi_0 = 1 / (1 - r/s)$.
x??

---

---

