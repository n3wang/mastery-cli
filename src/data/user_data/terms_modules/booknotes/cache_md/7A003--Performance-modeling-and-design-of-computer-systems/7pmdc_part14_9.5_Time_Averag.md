# High-Quality Flashcards: 7A003--Performance-modeling-and-design-of-computer-systems_processed (Part 14)


**Starting Chapter:** 9.5 Time Averages

---


#### Ergodicity and Stationary Distributions

Background context: The summary theorem states that for a Discrete-Time Markov Chain (DTMC) to have a limiting probability distribution, it needs to be irreducible and aperiodic. If these conditions are met, solving the stationary equations gives both the stationary and limiting distributions.

:p What does the theorem tell us about determining whether our DTMC has a positive recurrent distribution?
??x
The theorem indicates that we do not need to determine if the chain is positive recurrent explicitly. Instead, it suffices to check for irreducibility and aperiodicity, then solve the stationary equations. If solutions exist, they represent both the stationary and limiting distributions.
x??

---

#### Time Averages vs Ensemble Averages

Background context: The text introduces the concept of time averages as opposed to ensemble averages (πj). Time averages are defined using the number of visits to state j over time.

:p How do we define \(p_j\), the time-average fraction of time spent in state j?
??x
The time-average fraction of time spent in state j is given by:
\[ p_j = \lim_{t \to \infty} \frac{N_j(t)}{t} \]
where \( N_j(t) \) is the number of times the Markov chain enters state j up to time t.

Code example: 
```java
public class TimeAverages {
    private int Nj; // Number of visits to state j

    public double calculateTimeAverage(int totalSteps, int stepsToStateJ) {
        return (double) stepsToStateJ / totalSteps;
    }
}
```
x??

---

#### Positive Recurrent and Irreducible Chains

Background context: Theorem 9.28 states that for a positive recurrent and irreducible Markov chain, time averages converge to the stationary distribution with probability 1.

:p What does Theorem 9.28 tell us about positive recurrent and irreducible Markov chains?
??x
The theorem states that for a positive recurrent and irreducible Markov chain, as \( t \to \infty \), the time-average fraction of time spent in state j is equal to the stationary probability of being in state j:
\[ p_j = \lim_{t \to \infty} \frac{N_j(t)}{t} = \pi_j = \frac{1}{m_{jj}} \]
where \( m_{jj} \) is the mean number of time steps between visits to state j.

Code example: 
```java
public class PositiveRecurrentChain {
    private double[] stationaryProbs; // Stationary probabilities

    public double calculateStationaryProb(int totalSteps, int[] transitionCounts) {
        int Nj = 0;
        for (int i : transitionCounts) {
            Nj += i;
        }
        return (double) Nj / totalSteps;
    }
}
```
x??

---

#### Corollaries of Theorem 9.28

Background context: Corollary 9.29 and 9.30 provide additional insights into the properties of ergodic DTMCs.

:p What does Corollary 9.29 state about an ergodic DTMC?
??x
Corollary 9.29 states that for an ergodic (positive recurrent and irreducible) Markov chain, the time-average fraction of time spent in state j is equal to its stationary probability:
\[ p_j = \pi_j = \frac{1}{m_{jj}} \]
where \( m_{jj} \) is the mean number of time steps between visits to state j.

Code example: 
```java
public class ErgodicCorollary {
    private double[] stationaryProbs; // Stationary probabilities

    public void checkErgodicProperties(int totalSteps, int[] transitionCounts) {
        for (int i = 0; i < transitionCounts.length; i++) {
            double Nj = 0;
            for (int j : transitionCounts[i]) {
                Nj += j;
            }
            System.out.println("Stationary probability of state " + i + ": " +
                    (double) Nj / totalSteps);
        }
    }
}
```
x??

---

#### Summation of Limiting Probabilities

Background context: Theorem 9.28 implies that the sum of all limiting probabilities must equal 1.

:p What does Corollary 9.30 state about the ergodic DTMC?
??x
Corollary 9.30 states that for an ergodic (positive recurrent and irreducible) Markov chain, the sum of all stationary probabilities equals 1:
\[ \sum_{j=0}^{\infty} \pi_j = 1 \]

Code example: 
```java
public class SumOfProbabilities {
    private double[] stationaryProbs; // Stationary probabilities

    public boolean checkSumOfStationaryProbabilities() {
        double sum = 0.0;
        for (double prob : stationaryProbs) {
            sum += prob;
        }
        return Math.abs(sum - 1.0) < 1e-6; // Check if the sum is close to 1
    }
}
```
x??

---


#### Renewal Theorem for Ergodic Markov Chains

Background context: The Renewal Theorem is a fundamental result in renewal theory, which states that for an ergodic (or recurrent and irreducible) Markov chain, the long-run average number of events per time unit converges to the reciprocal of the mean recurrence time. This theorem provides insight into the behavior of such processes over infinite time.

Relevant formulas: 

1. For a renewal process with mean time between renewals \(E[X]\), we have:
   \[
   \lim_{t \to \infty} \frac{N(t)}{t} = \frac{1}{E[X]} \quad \text{with probability 1}
   \]

2. For an ergodic Markov chain, the limiting probability \(p_j\) of being in state \(j\) is given by:
   \[
   p_j = \lim_{t \to \infty} \frac{N_j(t)}{t} = \frac{1}{m_{jj}} \quad \text{with probability 1}
   \]
   where \(m_{jj}\) is the mean number of steps between visits to state \(j\).

:p What does the Renewal Theorem state for an ergodic Markov chain?
??x
The Renewal Theorem states that as time goes to infinity, the long-run average number of renewals per unit time approaches the reciprocal of the expected inter-renewal period. Specifically, for a renewal process with mean time between events \(E[X]\), we have:
\[
\lim_{t \to \infty} \frac{N(t)}{t} = \frac{1}{E[X]} \quad \text{with probability 1}
\]
This implies that the average number of renewals per unit time converges to the expected value of the inter-renewal time.

x??

---
#### Limiting Probabilities as Rates

Background context: In an ergodic Markov chain, the limiting probabilities can be interpreted not just as long-run proportions but also as rates of transitions. This interpretation helps in understanding how often transitions occur between different states over a large number of steps.

Relevant formulas:

1. For state \(i\) in an ergodic Markov chain:
   \[
   \pi_i = \lim_{t \to \infty} \frac{N_i(t)}{t}
   \]
   where \(\pi_i\) is the stationary probability of being in state \(i\).

2. The rate of transitions from state \(i\) to state \(j\) can be expressed as:
   \[
   \pi_i P_{ij}
   \]

:p What does \(\sum_j \pi_i P_{ij}\) represent?
??x
This expression represents the total rate of transitions out of state \(i\), including any self-loops (transitions that return to state \(i\) immediately).

x??

---
#### Stationary Equations as Rate Balance

Background context: The stationary equations for a Markov chain can be interpreted in terms of rates. This interpretation helps in understanding the balance between the total rate of transitions out of and into each state.

Relevant formulas:

1. For a stationary probability \(\pi_i\) of being in state \(i\):
   \[
   \pi_i = \sum_j \pi_j P_{ji}
   \]
2. Using the fact that \(\pi_i = \frac{\pi_i}{\sum_j P_{ij}} = \frac{1}{m_{ii}} \sum_j \pi_i P_{ij}\), where \(m_{ii}\) is the mean number of steps before returning to state \(i\).

:p What does \(\sum_j \pi_j P_{ji}\) represent?
??x
This expression represents the total rate of transitions into state \(i\) from any other state, including possibly self-loops.

x??

---
#### Equilibrium Condition as Rate Balance

Background context: The stationary equations can be simplified to a condition where the rates of transitions out and in for each state are equal. This provides insight into the long-term behavior of the Markov chain by ensuring that there is no net flow of probability between states.

Relevant formulas:

1. For an ergodic Markov chain, the stationary equation \(\pi_i = \sum_j \pi_j P_{ji}\) can be rewritten as:
   \[
   \sum_{j \neq i} \pi_i P_{ij} = \sum_{j \neq i} \pi_j P_{ji}
   \]

:p Why does it make sense that the total rate of transitions leaving state \(i\) should equal the total rate of transitions entering state \(i\)?
??x
This makes sense because every time a transition leaves state \(i\), another transition must enter state \(i\) to maintain the balance over long periods. If there were no transitions entering, the probability of being in state \(i\) would decrease until eventually it becomes zero; if more left than entered, the process would not be ergodic.

In essence, the number of transitions out of state \(i\) is within 1 of the number entering because any discrepancy would cause a deviation from stationarity over time. When averaged over long periods (as \(t \to \infty\)), this discrepancy vanishes, ensuring that the rates are equal.

x??

---


#### Balance Equations and Ergodicity Theory
Background context explaining the concept. Balance equations are used to equate the rate of leaving a state \(i\) with the rate of entering state \(i\). This is mathematically equivalent to stationary equations, allowing us to write balance equations by ignoring self-loops. These equations can be applied to both single states and sets of states.
:p What do balance equations help us understand in ergodicity theory?
??x
Balance equations are useful because they allow us to equate the rate at which we leave a state \(i\) with the rate at which we enter that same state, ignoring self-loops. This is mathematically equivalent to stationary equations and can be applied both to individual states and sets of states.
x??

---

#### Time-Reversibility Theorem
The theorem helps simplify balance or stationary equations by identifying conditions under which a Markov chain is time-reversible. If such \(x_i\) exist, they are the limiting probabilities.
:p What does the Time-Reversibility Theorem state?
??x
Given an aperiodic and irreducible Markov chain, if there exist constants \(x_1, x_2, \ldots\), such that for all states \(i, j\):
\[ \sum_i x_i = 1 \]
and
\[ x_i P_{ij} = x_j P_{ji}, \]
then:
1. The limiting probabilities are given by \( \pi_i = x_i \).
2. We say the Markov chain is time-reversible.
x??

---

#### Determining πj's Using Time-Reversibility
A simplified algorithm for determining the limiting probabilities involves first attempting to use time-reversibility equations, then falling back on regular stationary or balance equations if necessary.
:p How can we determine the limiting probabilities \(\pi_j\) in a Markov chain?
??x
To determine the limiting probabilities \(\pi_j\), follow these steps:
1. Use time-reversibility equations: \( x_i P_{ij} = x_j P_{ji}, \forall i, j \) and \(\sum_i x_i = 1 \).
2. If solutions for \(x_i\) are found, set \(\pi_i = x_i\).
3. Otherwise, return to regular stationary or balance equations.
x??

---

#### Example: Three Types of Equations
For the Markov chain in Figure 9.5, different types of equations (regular stationary, balance, and time-reversibility) are provided for solving \(\pi_j\). Time-reversibility equations simplify the solution process significantly.
:p What are the three types of equations mentioned for a given Markov chain?
??x
The three types of equations for determining \(\pi_j\) in the Markov chain are:
1. Regular stationary equations: \( \pi_i = \pi_{i-1} p + \pi_r i + \pi_{i+1} q \) and \(\sum_i \pi_i = 1\).
2. Balance equations: \( \pi_i (1 - r) = \pi_{i-1} p + \pi_{i+1} q \) and \(\sum_i \pi_i = 1\).
3. Time-reversibility equations: \( \pi_i p = \pi_{i+1} q \) and \(\sum_i \pi_i = 1\).
x??

---

#### Periodic or Irreducible Chains
Theorems state that for irreducible, aperiodic chains with unique solutions to stationary equations, these solutions are the limiting probabilities. However, if a chain is not irreducible or aperiodic, additional considerations apply.
:p What can be said about a Markov chain that is both irreducible and aperiodic?
??x
For an irreducible and aperiodic Markov chain, if we find a solution to the stationary equations, it is unique and represents the limiting distribution of the Markov chain. This means the solution \(\pi_i\) is the probability of being in state \(i\) as time approaches infinity.
x??

---

#### Summary
These flashcards cover balance equations, time-reversibility theorem, determining πj's using different types of equations, and handling periodic or non-irreducible chains. Understanding these concepts helps simplify the analysis of Markov chains.
:p What are the key concepts covered in this set of flashcards?
??x
The key concepts include:
1. Balance equations and their relation to stationary equations.
2. The Time-Reversibility Theorem for simplifying the solution process.
3. Different methods (regular stationary, balance, time-reversibility) to determine \(\pi_j\) in a Markov chain.
4. Handling periodic or non-irreducible chains using relevant theorems and conditions.
x??

---


#### Periodic Chains Overview
In this section, we discuss periodic chains within a Discrete-Time Markov Chain (DTMC) context. The focus is on understanding how the states behave and interact within such a chain, particularly when the chain is irreducible and positive-recurrent but has a finite period \(d < \infty\). The key concept here is that for any state in an irreducible periodic chain, the long-run time-average proportion of time spent in each state can be represented by a stationary distribution. However, it does not represent the limiting distribution; instead, it represents the long-term average.
:p What does the stationary distribution \(\pi\) represent for periodic chains?
??x
The stationary distribution \(\pi\) for periodic chains represents the long-run time-average proportion of time spent in each state. It is a measure of how often the chain visits each state over an extended period, but it does not necessarily represent the limiting distribution as \(n\) approaches infinity.
x??

#### Lemma 9.35: Periods of Communicating States
We prove that in an irreducible DTMC, all states have the same period through a mathematical argument involving paths and loops.

:p What is the key result of Lemma 9.35?
??x
The key result of Lemma 9.35 is that in an irreducible DTMC, all communicating states share the same period. This means if two states communicate, they have the same periodicity.
x??

#### Theorem 9.36: Stationary Distribution for Periodic Chains
This theorem asserts the existence and uniqueness of a stationary distribution \(\pi\) for an irreducible positive-recurrent DTMC with a finite period \(d < \infty\). It also states that this stationary distribution represents the time-average proportion of time spent in each state.

:p What does Theorem 9.36 claim about periodic chains?
??x
Theorem 9.36 claims that for an irreducible, positive-recurrent DTMC with a finite period \(d < \infty\), there exists a unique stationary distribution \(\pi\) which represents the time-average proportion of time spent in each state.
x??

#### Residue Classes and State Labeling
To handle periodic chains more effectively, we label states using residue classes. This approach simplifies analyzing the behavior of states over their periods.

:p How do we use residue classes to label states in a periodic chain?
??x
We use residue classes to label states by considering the remainder when the state index is divided by the period \(d\). For instance, if a state has period 2, it can be labeled based on its parity (even or odd) which represents its "residue class."
x??

#### Proving Stationary Distribution as Time-Average
This involves proving that any stationary distribution equals the time-average distribution for an irreducible periodic chain.

:p What does Theorem 9.37 state about irreducible periodic chains?
??x
Theorem 9.37 states that for an irreducible, periodic chain with a finite period \(d < \infty\), if a stationary distribution \(\pi\) exists, then the chain must be positive recurrent; hence, by Theorem 9.36, it follows that \(\pi\) is also the time-average distribution.
x??

#### Example of Periodic State
Consider a state \(i\) with period 2 in an irreducible periodic chain.

:p Can we say that every state gets visited once every \(d\) steps if its period is 2?
??x
No, for a state \(i\) with a period of 2, it does not necessarily get visited exactly once every 2 steps. There can be states where the visitation pattern does not align in this simple manner.
x??

---
These flashcards are designed to help you understand and internalize the key concepts discussed in the provided text about periodic chains and their properties.


#### Understanding the Time-Average Distribution
Background context: The time-average distribution, denoted as \(\vec{p}\), represents the long-run proportion of time spent in each state. It is derived from observing the chain every \(d\) steps when it hits states within a specific set \(\vec{i}\).

:p What do we know about \(\sum_j p_{ij}\)?
??x
Since \(\vec{i}\) is only visited once every \(d\) steps, \(\sum_j p_{ij} = \frac{1}{d}\).
The answer explains that the sum of probabilities for states within a single period equals \( \frac{1}{d} \), reflecting the periodic nature of the chain.
```java
// This is just an example and does not directly apply to the concept.
public class PeriodicChainExample {
    public double calculateSumOfPij(double d) {
        return 1.0 / d; // Sum of p_{ij} for a single period
    }
}
```
x??

---

#### Defining \( \vec{q} \)
Background context: The vector \( \vec{q}_i = d \cdot \vec{p}_i \) is introduced to represent the time-average proportion of time spent in each state during observations every \(d\) steps.

:p What does \( \vec{q}_i \) represent?
??x
\( \vec{q}_i \) represents the time-average proportion of time spent in each state within residue class \( i \) when observing the chain every \( d \) steps. It is a scaled version of \( \vec{p}_i \), where each element is multiplied by \( d \).
The answer explains that \( \vec{q}_i \) scales the original vector \( \vec{p}_i \) to reflect longer observation intervals, maintaining the sum as 1.
```java
// This example code demonstrates how q_i can be derived from p_i.
public class QVectorExample {
    public Vector q(Vector p, int d) {
        Vector q = new Vector(p.size());
        for (int i = 0; i < p.size(); i++) {
            q.set(i, p.get(i) * d);
        }
        return q;
    }
}
```
x??

---

#### Stationary Distribution for \( D \)
Background context: Given the transition matrix \( D = P^d \), we need to show that the time-average distribution \( \vec{p} \) is also a stationary distribution for \( D \).

:p What does it mean if \( \vec{q}_i \cdot A_{i,i+1} = \vec{q}_{i+1} \)?
??x
If \( \vec{q}_i \cdot A_{i,i+1} = \vec{q}_{i+1} \), then the vector \( \vec{q}_i \) represents a stationary distribution for \( D_i \). This means that the long-run proportion of time spent in states after transitioning from residue class \( i \) to \( i+1 \) is given by \( \vec{q}_{i+1} \).
The answer explains the relationship between vectors and matrices, demonstrating how the transition dynamics are preserved over multiple steps.
```java
// Pseudocode for matrix multiplication and vector comparison.
public boolean isStationary(Vector q_i, Matrix A_ii1, Vector q_i1) {
    Vector result = multiply(q_i, A_ii1);
    return result.equals(q_i1); // Assuming a method to compare vectors
}
```
x??

---

#### Uniqueness of the Solution for Stationary Distribution
Background context: To show that the time-average distribution \( \vec{p} \) is a stationary distribution for the original transition matrix \( P \), we need to relate it back to the original chain.

:p What does this imply about \( \sum_j q_{ij} \)?
??x
Since \( \sum_j p_{ij} = \frac{1}{d} \), and \( q_{ij} = d \cdot p_{ij} \), it follows that \( \sum_j q_{ij} = 1 \). This means that the sum of elements in vector \( \vec{q}_i \) is 1, making \( \vec{q}_i \) a valid probability distribution.
The answer explains the relationship between \( p_{ij} \) and \( q_{ij} \), ensuring that the resulting vector maintains the properties of a probability distribution.
```java
// This example shows how to calculate the sum of elements in q_ij.
public class SumOfElementsExample {
    public double calculateSumOfQij(Vector q_i) {
        return q_i.sum(); // Assuming a method to calculate the sum of elements in a vector
    }
}
```
x??

---

#### Proof of Stationary Distribution for Periodic Chains
Background context: The proof involves showing that the time-average distribution \( \vec{p} \) is indeed a stationary distribution by leveraging the unique properties of periodic chains.

:p What does it mean if \( \vec{\pi} \cdot P = \vec{\pi} \)?
??x
If \( \vec{\pi} \cdot P = \vec{\pi} \), then \( \vec{\pi} \) is a stationary distribution for the original transition matrix \( P \). This means that the vector \( \vec{\pi} \) represents the long-run behavior of the chain, where the probability of being in each state remains constant over time.
The answer explains the condition required for a stationary distribution and its implications on the long-term behavior of the Markov Chain.
```java
// Pseudocode to check if a vector is a stationary distribution.
public boolean isStationaryDistribution(Vector pi, Matrix P) {
    Vector result = multiply(pi, P);
    return result.equals(pi); // Assuming a method to compare vectors
}
```
x??

---

#### Summary Theorem for Periodic Chains
Background context: Given an irreducible discrete-time Markov chain (DTMC) with period \( d < \infty \), if a stationary distribution exists, the chain must be positive recurrent.

:p What does it mean if \( \vec{\pi} \cdot P^d = \vec{\pi} \)?
??x
If \( \vec{\pi} \cdot P^d = \vec{\pi} \), then \( \vec{\pi} \) is a stationary distribution for the transition matrix \( P^d \). This indicates that after \( d \) steps, the distribution remains unchanged, aligning with the periodic nature of the chain.
The answer explains how the periodicity affects the stationary distribution and its implications on the long-term behavior of the Markov Chain.
```java
// Example code to verify if a vector is stationary for P^d.
public class PeriodicChainVerification {
    public boolean isStationaryForPd(Vector pi, Matrix P, int d) {
        Matrix pd = power(P, d);
        Vector result = multiply(pi, pd);
        return result.equals(pi); // Assuming methods to calculate powers and matrix-vector multiplication
    }
}
```
x??

---

