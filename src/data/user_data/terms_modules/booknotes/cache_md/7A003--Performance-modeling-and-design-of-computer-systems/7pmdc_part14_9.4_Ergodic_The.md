# High-Quality Flashcards: 7A003--Performance-modeling-and-design-of-computer-systems_processed (Part 14)


**Starting Chapter:** 9.4 Ergodic Theorem of Markov Chains

---


---
#### Ergodicity and Limiting Probabilities of DTMCs
Background context: The text discusses ergodic theory for Markov chains, focusing on the properties required for a chain to be ergodic (aperiodicity, irreducibility, positive recurrence) and the implications of these properties. It explains that for finite-state chains, positive recurrence is implied by irreducibility.

:p What does it mean for a Discrete-Time Markov Chain (DTMC) to be ergodic?
??x
An ergodic DTMC is one that has all three desirable properties: aperiodicity, irreducibility, and positive recurrence. This means the chain will exhibit certain regular behaviors over time, allowing us to define limiting probabilities.

For finite-state chains, since positive recurrence follows from irreducibility, only aperiodicity and irreducibility are needed for ergodicity.
x??

---


#### Ergodic Theorem of Markov Chains
Background context: The Ergodic Theorem states that under certain conditions (ergodic), the limiting probabilities exist and can be computed. Specifically, for an ergodic DTMC, these limits are positive and equal to 1 over the mean time between visits to a state.

:p According to Theorem 9.25, what does it mean for an ergodic DTMC?
??x
For a recurrent, aperiodic, irreducible DTMC, the limiting probabilities \(\pi_j\) exist and are given by:
\[
\pi_j = \lim_{n \to \infty} P^n_{ij} = \frac{1}{m_{jj}}
\]
where \(m_{jj}\) is the mean time between visits to state \(j\). For a positive recurrent DTMC, all \(\pi_j > 0\).

The theorem extends Theorems 9.4 and 9.6 to include infinite-state chains.
x??

---


#### Summary of Limiting Distributions and Stationary Distributions
Background context: The text summarizes the possible states (transient, null-recurrent, or positive recurrent) for irreducible DTMCs and their implications on limiting distributions and stationary distributions.

:p According to Theorem 9.27, what are the two main classes of an irreducible, aperiodic DTMC?
??x
There are two main classes:

1. **All states are transient:** In this case, \(\pi_j = \lim_{n \to \infty} P^n_{ij} = 0\) for all \(j\), and no stationary distribution exists.
2. **All states are positive recurrent:** Here, the limiting probabilities \(\pi_j > 0\) and equal to \(\frac{1}{m_{jj}}\), where \(m_{jj}\) is finite. The limiting distribution exists and is also a unique stationary distribution.

The key here is that for positive recurrence, the sum of all \(\pi_j\) equals 1.
x??

---


#### Corollary on Summing Limiting Probabilities
Background context: This corollary confirms that the limiting probabilities for positive recurrent states indeed sum up to 1.

:p Why do the limiting probabilities in a positive recurrent DTMC add up to 1?
??x
The limiting probabilities \(\pi_j\) are defined as:
\[
\pi_j = \lim_{n \to \infty} P^n_{ij} = \frac{1}{m_{jj}}
\]
and since \(m_{jj}\) is finite, \(\pi_j > 0\). According to the theory, these probabilities must sum up to 1 because they represent a valid probability distribution.

Formally:
\[
\sum_{j=0}^\infty \pi_j = \sum_{j=0}^\infty \frac{1}{m_{jj}} = 1
\]
This ensures that the limiting distribution is a proper probability distribution.
x??

---


#### Transience, Null Recurrence, and Positive Recurrence in Irreducible Chains
Background context: The text explains how transience, null recurrence, and positive recurrence are class properties, meaning all states share the same property.

:p What does it mean for an irreducible Markov chain to have a certain state type (transient, null-recurrent, or positive recurrent)?
??x
In an irreducible Markov chain, all states must be of the same type: either all transient, all null recurrent, or all positive recurrent. This is because transience, null recurrence, and positive recurrence are class properties.

For example:
- If one state in an irreducible chain is transient, then all states are transient.
- Similarly, if one state is null-recurrent or positive recurrent, all states share this property.
x??

---

---


#### Ergodicity and Irreducibility
Background context explaining the concept. In a Discrete-Time Markov Chain (DTMC), ergodicity is a desirable property that simplifies analysis. Specifically, if a DTMC is both irreducible and aperiodic, it can be shown that it has a unique stationary distribution which also serves as its limiting probability distribution.
:p What does the summary theorem tell us about determining whether our DTMC's limiting probability distribution?
??x
The summary theorem states that we do not need to determine positive recurrence; instead, checking for irreducibility and aperiodicity suffices. Once these conditions are met, solving the stationary equations yields both the stationary distribution and the limiting probability distribution.
x??

---


#### Periodic Chains and Their Solutions
Background context explaining the concept. When dealing with DTMCs that are not irreducible or periodic, the stationary equations may still have solutions, but their interpretation differs from when the chain is positive recurrent and irreducible.
:p What happens to the solution of the stationary equations in a periodic chain?
??x
In a periodic chain, if the stationary equations do yield a solution, it does not represent the limiting probability distribution. Instead, it represents the long-run time-average fraction of time spent in each state. This is different from the limiting probability distribution.
x??

---


#### Time Averages and Long-Run Behavior
Background context explaining the concept. The time average fraction \(p_j\) of time spent in state \(j\) can be defined as the limit of the ratio of the number of times the Markov chain enters state \(j\) by time \(t\), to \(t\). This is an important measure for understanding long-run behavior.
:p How is \(p_j\) defined?
??x
\(p_j\) is defined as the time-average fraction of time that the Markov chain spends in state \(j\) and can be expressed as:
\[ p_j = \lim_{t \to \infty} \frac{N_j(t)}{t} \]
where \(N_j(t)\) is the number of times the Markov chain enters state \(j\) by time \(t\).
x??

---


#### Positive Recurrence and Irreducibility
Background context explaining the concept. For a positive recurrent, irreducible DTMC, Theorem 9.28 provides strong guarantees about the convergence of the time averages to the limiting probabilities.
:p What does Theorem 9.28 tell us for a positive recurrent and irreducible Markov chain?
??x
Theorem 9.28 states that for a positive recurrent and irreducible Markov chain, with probability 1:
\[ p_j = \lim_{t \to \infty} \frac{N_j(t)}{t} = \frac{1}{m_{jj}} \]
where \(m_{jj}\) is the mean number of time steps between visits to state \(j\). This theorem ensures that the time averages converge to the limiting probability \(π_j\) and also provides a way to compute it.
x??

---


#### Corollary 9.29 - Ergodic DTMC
Background context explaining the concept. A corollary to Theorem 9.28, specifically for ergodic (irreducible and aperiodic) Markov chains, relates time averages to limiting probabilities in a straightforward manner.
:p What does Corollary 9.29 state about an ergodic DTMC?
??x
For an ergodic DTMC:
\[ p_j = \pi_j = \frac{1}{m_{jj}} \]
where \(p_j\) is the time-average fraction of time spent in state \(j\), and \(π_j\) is the limiting probability. This corollary essentially connects the long-run behavior described by time averages to the stationary distribution.
x??

---


#### Summation of Limiting Probabilities
Background context explaining the concept. The fact that the sum of all limiting probabilities must equal 1 for a Markov chain is derived from the properties of ergodic chains and their convergence.
:p What does Corollary 9.30 state about the limiting probabilities in an ergodic DTMC?
??x
Corollary 9.30 states that for an ergodic DTMC, the sum of all limiting probabilities must equal 1:
\[ \sum_{j=0}^{\infty} π_j = 1 \]
This is derived from the fact that \(p_j = π_j\) and the time averages \(p_j\) are defined such that they sum to 1 over all states.
x??

---


#### Strong Law of Large Numbers (SLLN)
Background context explaining the concept. The SLLN provides a foundational result for understanding the convergence of time averages in sequences of independent, identically distributed random variables.
:p What does Theorem 9.31 state about the sequence of random variables \(X_1, X_2, \ldots\)?
??x
Theorem 9.31 (SLLN) states that for a sequence of independent and identically distributed (i.i.d.) random variables \(X_1, X_2, \ldots\) each with mean \(E[X]\), the average:
\[ S_n = \frac{1}{n} \sum_{i=1}^n X_i \]
converges to \(E[X]\) with probability 1 as \(n\) approaches infinity.
x??

---


#### Renewal Process
Background context explaining the concept. A renewal process is a stochastic process where the inter-event times are i.i.d. random variables, each drawn from a distribution \(F\). This concept is fundamental in understanding the long-term behavior of certain systems.
:p What is a renewal process?
??x
A renewal process is any process for which the times between events (inter-arrival times) are independent and identically distributed (i.i.d.) random variables with some common distribution \(F\). For example, if we consider a sequence of arrivals where each inter-event time follows the same distribution, this forms a renewal process.
x??

---

---


#### Renewal Theorem
The Renewal Theorem states that for a renewal process, the long-run average number of events per unit time converges to 1/E[X] almost surely as t approaches infinity. Here, E[X] is the expected value of the inter-renewal times.
:p What does the Renewal Theorem state about the long-run behavior of a renewal process?
??x
The Renewal Theorem states that for a renewal process with mean inter-renewal time \( E[X] \), the ratio of the number of renewals to time converges almost surely to \( 1/E[X] \) as time \( t \) approaches infinity. Mathematically, this is expressed as:
\[ \lim_{t \to \infty} \frac{N(t)}{t} = \frac{1}{E[X]} \text{ with probability 1.} \]
This means that over a long period of time, the average number of renewals per unit time approaches \( \frac{1}{E[X]} \).
x??

---


#### Proof of Renewal Theorem
The proof involves applying the Strong Law of Large Numbers (SLLN) to show that both upper and lower bounds on the renewal process converge almost surely to \( E[X] \). Specifically, it shows:
\[ S_{N(t)} / N(t) \to E[X] \text{ as } t \to \infty \]
and
\[ (S_{N(t)} + 1) / (N(t) + 1) \to E[X] \text{ as } t \to \infty. \]
:p How does the proof of the Renewal Theorem use SLLN?
??x
The proof uses the Strong Law of Large Numbers (SLLN), which states that for a sequence of independent and identically distributed random variables \( X_1, X_2, \ldots \) with mean \( E[X] \):
\[ \frac{\sum_{i=1}^n X_i}{n} \to E[X] \text{ almost surely as } n \to \infty. \]
In the context of the Renewal Theorem:
- Let \( S_n = \sum_{i=1}^n X_i \) be the sum of inter-renewal times up to the nth renewal.
- By SLLN, for large \( t \):
\[ \frac{S_{N(t)}}{N(t)} \to E[X] \text{ almost surely.} \]
- Similarly,
\[ \frac{S_{N(t)} + 1}{N(t) + 1} \to E[X] \text{ almost surely.} \]
These two expressions sandwich the ratio \( N(t)/t \), leading to:
\[ \frac{N(t)}{t} \to \frac{1}{E[X]} \text{ almost surely.} \]
x??

---


#### Ergodic Markov Chain and Limiting Probabilities
For an ergodic (irreducible and positive recurrent) Markov chain, the limiting probability \( \pi_i \) of being in state i is the long-run proportion of time that the process spends in state i.
:p What does the limiting probability \( \pi_i \) represent for an ergodic Markov chain?
??x
The limiting probability \( \pi_i \) represents the long-run proportion of time that a stationary and ergodic (irreducible and positive recurrent) Markov chain spends in state i. This is formally defined as:
\[ \pi_i = \lim_{t \to \infty} P(X_t = i) \]
where \( X_t \) is the state at time t.
x??

---


#### Transition Rates
For a Markov chain, the rate of transitions out of state i can be calculated as \( \sum_j \pi_i P_{ij} \), and the rate of transitions into state i from any other state j is given by \( \sum_j \pi_j P_{ji} \). The stationary equations then relate these rates.
:p What does \( \sum_j \pi_i P_{ij} \) represent in a Markov chain?
??x
The expression \( \sum_j \pi_i P_{ij} \) represents the total rate of transitions out of state i. This includes both direct exits from state i and any self-loops (transitions that return to state i).
x??

---


#### Stationary Equations and Transition Rates
For an ergodic Markov chain, the stationary probabilities \( \pi_i \) satisfy the equation:
\[ \pi_i = \sum_{j \neq i} \pi_j P_{ji} + \pi_i P_{ii}. \]
Simplifying, we get:
\[ \sum_j \pi_i P_{ij} = \sum_j \pi_j P_{ji}, \]
which means the total rate of transitions out of state i equals the total rate of transitions into state i.
:p Why is it true that \( \sum_j \pi_i P_{ij} = \sum_j \pi_j P_{ji} \) for an ergodic Markov chain?
??x
This equality holds because in a long run, every departure from state i must be balanced by some arrival into state i. The total rate of departures (outgoing transitions) from state i is the sum \( \sum_j \pi_i P_{ij} \), and the total rate of arrivals (incoming transitions) to state i is the sum \( \sum_j \pi_j P_{ji} \). Since the system reaches a steady state, these rates must be equal.
x??

---


#### Stationary Equations Simplified
The stationary equations can also be simplified by ignoring self-loops:
\[ \sum_{j \neq i} \pi_i P_{ij} = \sum_{j \neq i} \pi_j P_{ji}. \]
:p How are the stationary equations rewritten to ignore self-loops?
??x
The stationary equations can be rewritten to ignore self-loops by removing \( \pi_i P_{ii} \) from both sides of the equation:
\[ \sum_{j \neq i} \pi_i P_{ij} = \sum_{j \neq i} \pi_j P_{ji}. \]
This simplified form highlights that the rate of transitions out of state i is equal to the rate of transitions into state i, excluding self-loops.
x??

---

---

