# High-Quality Flashcards: 7A003--Performance-modeling-and-design-of-computer-systems_processed (Part 15)


**Starting Chapter:** 9.10 Proof of Ergodic Theorem of Markov Chains

---


#### Stationary Solution and Positive Recurrence

Background context explaining that we are discussing the conditions for a stationary solution to exist, specifically focusing on Di,i. The key points include the calculation of \(\pi/\vec{v_i}·D_{i,i}\) leading to a stationary probability vector \(\pi/\vec{v_i}\), and how this implies positive recurrence given certain conditions.

:p What is a stationary solution in the context of Markov chains, and under what conditions can it be found for \(D_{i,i}\)?
??x
A stationary solution in the context of Markov chains refers to a probability vector \(\pi\) that remains unchanged when passed through the transition matrix. For \(D_{i,i}\), we find that \(\pi/\vec{v_i}·D_{i,i} = \pi/\vec{v_i}\) for all \(i\). This implies that once normalized, this vector can serve as a stationary probability distribution if it sums to 1.

To ensure the probabilities sum to 1, we multiply by an appropriate normalizing constant. Given that \(D_{i,i}\) is aperiodic and irreducible with a stationary solution, Theorem 9.27 guarantees positive recurrence.
x??

---

#### Irreducibility and Limiting Probabilities

Background context explaining the concept of irreducibility in Markov chains and how it affects limiting probabilities. Specifically, when a chain is not irreducible but aperiodic and positive-recurrent, there are still "limiting probabilities" but they depend on the starting state.

:p How does the lack of irreducibility affect the limiting probabilities in a Markov chain?
??x
In an aperiodic, positive-recurrent Markov chain that is not irreducible, the limiting probability of being in state \(j\) depends on the starting state \(i\). Therefore, we cannot define \(\pi_j = \lim_{n \to \infty} P^n_{ij}\) as a single value independent of \(i\).

Since some states may be unreachable or there can be absorbing states from which one never leaves, not every state's limiting probability is necessarily positive. The chain can still be subdivided into irreducible components, each behaving like its own ergodic chain.
x??

---

#### Equivalences of Limiting Probabilities

Background context explaining that given ergodicity, there are multiple ways to represent the limiting probabilities. These include the average fraction of time spent in state \(j\), stationary probability, reciprocal of mean time between visits, and rate of transitions out of state \(j\).

:p What are the different representations of limiting probabilities in an ergodic Markov chain?
??x
In an ergodic Markov chain, the limiting probability \(\pi_j\) can be represented in several ways:
- The average fraction of time spent in state \(j\): \(\pi_j = \lim_{n \to \infty} \frac{N_j(t)}{t}\)
- The stationary probability for state \(j\): \(\pi_j\)
- The reciprocal of the mean time between visits to state \(j\): \(\pi_j = \frac{1}{m_{jj}}\)
- The rate of transitions out of state \(j\): \(\pi_j P_{ij}\)

These representations are equivalent given ergodicity.
x??

---

#### Techniques for Determining Limiting Probabilities

Background context explaining that there are various methods to determine the limiting probabilities, including raising the transition matrix \(P\) to high powers, solving stationary equations (or balance equations), and using time-reversibility.

:p What are some techniques used to determine the limiting probabilities in a Markov chain?
??x
Techniques for determining the limiting probabilities in a Markov chain include:
- Raising the probability transition matrix \(P\) to high powers: This can give an approximation of the long-term behavior.
- Solving stationary equations (balance equations): These are typically formulated as \(\pi P = \pi\), where \(\pi\) is the stationary distribution vector.
- Using time-reversibility equations, which involve solving for states that satisfy certain balance conditions.

While some techniques like solving time-reversibility equations can be simple, they may not always be applicable in all scenarios.
x??

---


#### Definition of \(f_{k}^{ii}\)
Background context: The definition introduces \(f_{k}^{ii}\) as the probability of first returning to state \(i\) after the \(k\)th transition. This is crucial for understanding the recurrence properties in Markov chains.

:p What does \(f_{k}^{ii}\) represent?
??x
\(f_{k}^{ii}\) represents the probability that a Markov chain returns to state \(i\) exactly at the \(k\)th step, given that it started from state \(i\). This concept is fundamental in defining the recurrence properties of states within Markov chains.

x??

---

#### Definition of \(P_{k}^{ii}\)
Background context: The definition introduces \(P_{k}^{ii}\) as the probability of being in state \(i\) after the \(k\)th transition, given that we started from state \(i\). This is related to the behavior and distribution of states over time.

:p What does \(P_{k}^{ii}\) represent?
??x
\(P_{k}^{ii}\) represents the probability that a Markov chain will be in state \(i\) after exactly \(k\) transitions, given that it started from state \(i\). This value helps understand how likely it is to find the system in state \(i\) at step \(k\).

x??

---

#### Definition of \(m_{ii}\)
Background context: The definition of \(m_{ii}\) involves calculating the expected number of time steps for a Markov chain to return to state \(i\). This concept is essential for analyzing long-term behavior and recurrence properties.

:p What does \(m_{ii}\) represent?
??x
\(m_{ii}\) represents the expected (average) number of time steps required for a Markov chain to return to state \(i\), given that it started from state \(i\). This is computed as an infinite sum, which gives insight into how often and on average states are revisited.

x??

---

#### Definitions of \(\limsup\) and \(\liminf\)
Background context: These definitions provide rigorous mathematical frameworks to describe the limiting behavior of sequences. They help in understanding convergence and non-convergence scenarios for Markov chains.

:p What is the definition of \(\limsup_{n \to \infty} a_n = b\)?
??x
\(\limsup_{n \to \infty} a_n = b\) if for all \(\epsilon > 0\), there exists an \(N(\epsilon)\) such that:
1. For all \(n \geq N(\epsilon)\), \(a_n < b + \epsilon\).
2. \(b\) is the smallest value satisfying the above condition.

x??

---

#### Lemma 9.40 on \(\limsup_{n \to \infty} a_n = b\)
Background context: This lemma provides several key properties of sequences converging to their \(\limsup\).

:p What are the three immediate consequences of the definition of \(\limsup\) as described in Lemma 9.40?
??x
1. For all \(\epsilon > 0\), the sequence \(a_n\) exceeds the value \(b - \epsilon\) infinitely many times.
2. There exists an infinite subsequence \(\{a_{n_j}\}\) where \(n_1 < n_2 < n_3 < \ldots\), such that \(\lim_{j \to \infty} a_{n_j} = b\).
3. If there is an infinite subsequence \(\{a_m\}\) with limit not equal to \(b\), then there exists \(b'\) such that infinitely many elements of the subsequence are below \(b'\).

x??

---

#### Theorem 9.25 and its precise formulation (Theorem 9.43)
Background context: This theorem deals with the long-term behavior of Markov chains, specifically focusing on the convergence properties related to state recurrence.

:p What is the precise formulation of Theorem 9.25 as presented in Theorem 9.43?
??x
Theorem 9.43 (precise formulation): For a Markov chain with state space \(S\), and for each state \(i \in S\), if the chain is irreducible and positive recurrent, then:
\[ \lim_{n \to \infty} P_n^{ii} = m_i^i \]
where \(m_i^i\) is the mean recurrence time of state \(i\).

x??

---

#### Proof Outline for Theorem 9.43
Background context: This section outlines the proof strategy to show that the sequence \(P_n^{ii}\) converges to the expected return time \(m_i^i\), using upper and lower bounds.

:p What is the main goal in proving Theorem 9.43?
??x
The main goal is to demonstrate that the sequence \(P_n^{ii}\) converges to the expected return time \(m_i^i\) by defining upper and lower bounds on \(P_n^{ii}\) and showing that these bounds are equal, both being \(m_i^i\).

x??

---


#### Definition of Return Probability and Limiting Distribution
Background context: The theorem discusses the limiting behavior of a recurrent, aperiodic Markov chain. Specifically, it focuses on how to determine the long-term probability of being in state \(i\) given an initial state \(i\). This is often denoted as \(\lim_{n \to \infty} P^n_{ii}\), where \(P^n_{ii}\) represents the probability of returning to state \(i\) after \(n\) steps.

:p Define \(r_n\) and explain its significance in the context of this theorem.
??x
\(r_n = f_{n+1,ii} + f_{n+2,ii} + \cdots\), where \(f_{k,ii}\) is the probability of visiting state \(i\) exactly at time \(k\). Here, \(r_n\) represents the probability that a return to state \(i\) does not occur until after step \(n\).

---

#### Expected Return Time and Its Relation to \(P^n_{ii}\)
:p How is the expected return time \(m_{ii}\) related to the sequence \(\{f_{k,ii}\}\)?
??x
The expected return time \(m_{ii}\) is given by:
\[ m_{ii} = \sum_{k=0}^{\infty} k f_{k,ii} \]
This means that the average number of steps to return to state \(i\) starting from \(i\) is a weighted sum over all possible return times.

---

#### Summation of Probabilities and Return Time
:p What does the summation \(\sum_{k=0}^n r_k P^{n-k}_{ii}\) represent in this context?
??x
This summation represents the probability that, starting from state \(i\) at time 0, we visit state \(i\) for the last time by step \(n\). Each term \(r_k P^{n-k}_{ii}\) accounts for the probability of visiting state \(i\) last between steps \(k+1\) and \(n\).

---

#### Limiting Probability and Inequality Derivation
:p Explain how the inequality \(\lambda N/\sum_{k=0}^N r_k \leq 1 \leq \mu N/\sum_{k=0}^N r_k + \infty/\sum_{k=N+1}^{\infty} r_k\) leads to \(\lambda \leq 1/\sum_{k=0}^{\infty} r_k \leq \mu\).
??x
By taking the limits as \(j \to \infty\) and \(N \to \infty\), we can deduce that:
\[ \lambda N/\sum_{k=0}^N r_k \to \lambda \]
and
\[ \mu N/\sum_{k=0}^N r_k + \infty/\sum_{k=N+1}^{\infty} r_k \to \mu \]

Thus, as \(N\) becomes very large, the inequality simplifies to:
\[ \lambda \leq 1/\sum_{k=0}^{\infty} r_k \leq \mu \]
Given that \(\mu = \liminf P^n_{ii}\) and \(\lambda = \limsup P^n_{ii}\), it follows that:
\[ \lambda = \mu = \pi_i \]

---

#### Handling Periodic Chains
:p Explain why \(f_1^{ii} > 0\) allows us to find a subsequence where we can move \(P_n^{ii}\) out of the sum as a constant.
??x
If \(f_1^{ii} > 0\), it means that there is at least one step with positive probability for returning to state \(i\). For relatively large \(n\), we can find subsequences where the return probabilities stabilize around \(\lambda\) and \(\mu\). Specifically, if we choose a finite \(M > 0\) such that the chain is aperiodic, we can apply Lemmas 9.41 and 9.42 to show that:
\[ \lim_{j \to \infty} P^{n_j - M - k}_{ii} = \lambda \]
and
\[ \lim_{j \to \infty} P^{m_j - M - k}_{ii} = \mu \]

This allows us to manipulate the sum and show that:
\[ \pi_i = \lim_{n \to \infty} P^n_{ii} = \lambda = \mu \]

---

#### Conclusion on Limiting Probability
:p Why does the inequality chain ultimately establish that \(\pi_i\) is the limiting probability?
??x
The inequality chain derived from the summation and limit operations shows:
\[ \lambda N/\sum_{k=0}^N r_k \leq 1 \leq \mu N/\sum_{k=0}^N r_k + \infty/\sum_{k=N+1}^{\infty} r_k \]
As \(N \to \infty\), the terms involving \(N\) in both sides of the inequality simplify, leading to:
\[ \lambda \leq 1/\sum_{k=0}^{\infty} r_k \leq \mu \]
Since \(\lambda = \limsup P^n_{ii}\) and \(\mu = \liminf P^n_{ii}\), it must be that \(\lambda = \mu\). Thus, the limiting probability \(\pi_i\) is established as:
\[ \pi_i = \lim_{n \to \infty} P^n_{ii} \]

---
---


#### Irreducibility, Aperiodicity, and Positive Recurrence
Background context: In this section, we analyze several transition matrices to determine whether Markov chains are irreducible, aperiodic, or positive recurrent. These properties are crucial for understanding the long-term behavior of the chain.

:p Determine if the following matrix is irreducible, aperiodic, or positive recurrent:
\[
\begin{pmatrix}
1 & 0 & \frac{1}{2} & 0 \\
\frac{1}{4} & \frac{1}{4} & 0 & 0 \\
0 & 0 & 0 & 1 \\
0 & 0 & 0 & 1
\end{pmatrix}
\]
??x
The matrix is not irreducible because there is no path from state 3 to any other state, and similarly for state 4. It also cannot be aperiodic as the periods of states 3 and 4 are both greater than 1 (both are periodic with period 2). Thus, this chain is neither irreducible nor aperiodic, and we can't determine positive recurrence without further analysis.
x??

---
#### Irreducibility, Aperiodicity, and Positive Recurrence for Multiple Matrices
Background context: We examine multiple transition matrices to classify them based on their irreducibility, aperiodicity, and positive recurrence. The properties help us understand the long-term behavior of the chain.

:p Analyze the following matrix:
\[
\begin{pmatrix}
0 & 1 & 0 \\
0 & 0 & 1 \\
1 & 0 & 0
\end{pmatrix}
\]
??x
The matrix is irreducible because there is a path between every pair of states. However, it is periodic with period 3 (since each state can only reach itself after three steps). Therefore, the chain is not aperiodic and cannot be positive recurrent without further analysis.
x??

---
#### Time-Average Fraction of Time Spent in Each State
Background context: We solve for the time-average fraction of time spent in each state using balance equations and time-reversibility equations. These methods help us understand the long-term behavior of Markov chains.

:p Draw the corresponding Markov chains for \( P(1) \) and \( P(2) \):
\[
P(1)=
\begin{pmatrix}
0 & \frac{2}{3} & 0 \\
\frac{1}{3} & \frac{2}{3} & 0 \\
0 & \frac{1}{3} & \frac{2}{3}
\end{pmatrix},
P(2)=
\begin{pmatrix}
\frac{1}{3} & \frac{2}{3} & 0 \\
0 & \frac{2}{3} & 0 \\
\frac{1}{3} & 0 & \frac{2}{3}
\end{pmatrix}
\]
??x
Draw the corresponding Markov chains. For \( P(1) \), state 1 transitions to state 2 with probability \( \frac{2}{3} \), and state 2 can transition to either state 1 or 3, each with probability \( \frac{1}{3} \). State 3 always stays in state 3. For \( P(2) \), the transitions are similar but starting from different states.

The chains are as follows:
```
P(1): A -> B
     B -> C
     C -> C

P(2): A -> B
     B -> C
     C -> A
```
x??

---
#### Time-Reversibility of Markov Chains
Background context: We determine whether given Markov chains are time-reversible and provide an explanation for the symmetry in transition rates.

:p Determine if \( P(1) \) is time-reversible. If so, explain why.
??x
To check if \( P(1) \) is time-reversible, we use the detailed balance equations:
\[
\pi_i p_{ij} = \pi_j p_{ji}
\]
For state 1 and state 2:
\[
\pi_1 \cdot \frac{2}{3} = \pi_2 \cdot \frac{1}{3}
\]
This does not hold for arbitrary stationary probabilities \( \pi_i \), so the chain is not time-reversible.

Explanation: The detailed balance equations must be satisfied for all pairs of states. In this case, the equation fails because the transition rates do not satisfy symmetry.
x??

---
#### Ergodicity and Time-Reversibility in Data Centers
Background context: We model a data center's behavior using a discrete-time Markov chain (DTMC) to determine if it is ergodic and time-reversible. The properties help us understand the long-term behavior of the system.

:p Draw a DTMC for the given problem where states represent the working or down status of a data center.
??x
The DTMC can be represented as follows:
```
Working -> Down (Backhoe) with probability 1/6
Working -> Down (Bug)    with probability 1/4
Down (Backhoe) -> Working with probability 1
Down (Bug)     -> Working with probability 3/4
```

The state space is {Working, Down}, and the transition probabilities are:
\[
P = \begin{pmatrix}
0 & \frac{5}{6} \\
\frac{1}{6} & \frac{3}{4}
\end{pmatrix}
\]

The DTMC can be visualized as:
```
     1/6
Working -> Down (Backhoe)
      |         |
1/4 |         | 3/4
      v         v
Down (Bug) -> Working
```
x??

---
#### Ergodicity of Data Centers
Background context: We determine if the data center DTMC is ergodic by checking irreducibility and aperiodicity.

:p Determine if the given data center DTMC is ergodic.
??x
The chain is not ergodic. It is reducible because states "Working" and "Down (Backhoe)" form one communicating class, while "Down (Bug)" forms another distinct class. Therefore, it is neither irreducible nor aperiodic.

Explanation: A chain must be irreducible to be ergodic. Here, the two distinct classes prevent the chain from being ergodic.
x??

---
#### Time-Reversibility of Data Centers
Background context: We check if the data center DTMC is time-reversible by verifying detailed balance equations.

:p Determine if the given data center DTMC is time-reversible.
??x
The chain is not time-reversible. Detailed balance equations must be satisfied for all pairs of states, but they are not:

For state "Working" and state "Down (Backhoe)":
\[
\pi_{Working} \cdot 0 = \pi_{Down(Backhoe)} \cdot \frac{1}{6}
\]
This does not hold in general.

Explanation: The detailed balance equations do not hold for arbitrary stationary probabilities, indicating that the chain is not time-reversible.
x??

---


#### Why or why not? (d)
Background context: In this question, you are asked to determine what fraction of time a data center is working. This involves analyzing the long-term behavior of a system using Markov chains.

:p What fraction of time is the data center working?
??x
To find the fraction of time the data center is working, we need to calculate the limiting probability \( \pi_j \) for the state where the data center is operational. The limiting probability represents the long-term proportion of time spent in each state.

Assuming the states are defined as "working" and "not working," and using a Markov chain model, the fraction of time the data center is working would be \( \pi_{\text{working}} \).

Example:
If we have two states (working and not working), with transition probabilities given by:

```
P = | 0.9  0.1 |
    | 0.2  0.8 |
```

Where the first row represents the probability of staying in or transitioning from each state, respectively.

The limiting probability vector \( \pi \) can be found by solving:
\[ \pi P = \pi \]
and
\[ \sum_{i} \pi_i = 1 \]

Let's solve for this example:

```python
import numpy as np

# Transition matrix
P = np.array([[0.9, 0.1],
              [0.2, 0.8]])

# Solve the system of equations πP = π and ∑πi = 1
pi = np.linalg.solve(np.eye(2) - P, np.ones(2))
print(pi)
```

The result will give you the fraction of time spent in each state.
x??

---

#### What is the expected number of days between backhoe failures? (e)
Background context: This question asks for the mean recurrence time to a failure state in a Markov chain. For an ergodic Markov chain, this value can be derived from the matrix properties.

:p What is the expected number of days between backhoe failures?
??x
To find the expected number of days between backhoe failures, we need to determine the mean return time \( m_{jj} \) for the state representing a failure. This value represents the average number of steps (days in this context) until the chain returns to state j starting from that same state.

For an ergodic Markov chain, the expected number of days between failures is given by:

\[ m_{jj} = \frac{1}{f_j} \]

where \( f_j \) is the probability of ever returning to state j. For a failure state in the backhoe context, if it is positive recurrent and ergodic, we can find \( f_j \) from the transition matrix.

Example:
If the transition matrix for the backhoe states includes a failure state (F) with:

```
P = | 0.9  0.1 |
    | 0.2  0.8 |
```

And if we assume state F is a failure, then \( f_F \) can be found by analyzing the chain properties.

```python
# Transition matrix for backhoe example
P_backhoe = np.array([[0.9, 0.1],
                      [0.2, 0.8]])

# Calculate the mean return time for state F
f_F = 1 / (1 - P_backhoe[1, 1])
m_FF = 1 / f_F

print(f"Expected number of days between backhoe failures: {m_FF}")
```

The result will give you the expected number of days.
x??

---

#### Positive Recurrent Transient Null Recurrent
Background context: This section deals with different types of states in Markov chains, specifically focusing on their recurrence properties. The key concepts are:
- **Positive recurrent**: State j is positive recurrent if \( m_{jj} < \infty \).
- **Transient**: State j is transient if the probability of ever returning to state j from itself ( \( f_j \) ) is less than 1.
- **Null recurrent**: State j is null recurrent if \( m_{jj} = \infty \).

:p What states are positive recurrent, transient, and null recurrent?
??x
To determine whether a state in a Markov chain is positive recurrent, transient, or null recurrent, we need to analyze the long-term behavior of the system. Specifically:
- **Positive Recurrent**: The expected number of steps to return to this state is finite (\( m_{jj} < \infty \)).
- **Transient**: The probability of ever returning to this state from itself is less than 1 (\( f_j < 1 \)).
- **Null Recurrent**: The expected number of steps to return to this state is infinite (\( m_{jj} = \infty \)).

Example:
Consider a simple Markov chain with states \( S_1, S_2, \ldots, S_n \) and transition probabilities given by matrix P. For a positive recurrent state j:

```python
# Example of checking recurrence properties for states in a Markov chain
def check_recurrence(P):
    n = len(P)
    f = np.zeros(n)

    # Initialize a vector to store the probability of return from each state
    for i in range(n):
        f[i] = 1 if P[i, i] == 0 else 0

    # Solve the system using fixed point iteration or matrix inversion
    # (this is simplified and would require actual numerical methods)
    pi = np.linalg.solve(np.eye(n) - P, np.ones(n))

    for j in range(n):
        f[j] = sum(pi * P[:, j])
    
    return f

P_example = np.array([[0.9, 0.1],
                      [0.2, 0.8]])

f_states = check_recurrence(P_example)
print(f"f states: {f_states}")
```

In this example:
- \( f_j \) is calculated for each state.
- If \( f_j < 1 \), the state is transient.
- If \( f_j = 1 \) and \( m_{jj} < \infty \), the state is positive recurrent.
- If \( f_j = 1 \) and \( m_{jj} = \infty \), the state is null recurrent.

Based on the values of \( f_j \), you can determine the recurrence properties for each state.
x??

---

#### Sherwin’s Conjecture (9.5)
Background context: The conjecture by Sherwin states that for an ergodic Markov chain, the mean number of steps to return to a state given we are in that state (\( m_{jj} \)) is less than or equal to the sum of the mean numbers of steps to reach another state from the current state and back to the initial state (\( m_{ji} + m_{ij} \)).

:p Prove or disprove Sherwin’s conjecture.
??x
To prove or disprove Sherwin's conjecture, we need to analyze the properties of an ergodic Markov chain. The conjecture states:

\[ m_{jj} \leq m_{ji} + m_{ij} \]

Where:
- \( m_{jj} \) is the mean number of steps to return to state j starting from state j.
- \( m_{ji} \) is the mean number of steps to get from state j to state i.
- \( m_{ij} \) is the mean number of steps to get from state i back to state j.

For an ergodic Markov chain, we know that:

1. The chain is aperiodic and irreducible.
2. There exists a unique stationary distribution \( \pi \).
3. All states are positive recurrent, so \( m_{jj} < \infty \).

Using the concept of expected hitting times and the properties of Markov chains, let's analyze the conjecture.

Proof:
Consider an ergodic Markov chain with state space S. For any two states i and j:

\[ m_{ji} = E[T_{i,j}] \]
where \( T_{i,j} \) is the number of steps to reach state j from state i for the first time.

Similarly,

\[ m_{ij} = E[T_{j,i}] \]

The total expected time to return to state j starting from state j can be broken down into two parts:
1. The expected time to go from state j to any other state i.
2. The expected time to go back from state i to state j.

Thus,

\[ m_{jj} = E[T_{j,i}] + E[T_{i,j}] \]

Given the properties of Markov chains, it follows that:

\[ m_{jj} \leq m_{ji} + m_{ij} \]

This inequality holds because the total return time to state j must be at least as long as the sum of the two individual expected times.

Therefore, Sherwin’s conjecture is true.
x??

---

#### Time-average fraction of time spent in each state (9.6)
Background context: In this exercise, you are asked to derive the time-average fraction of time that a market maker spends in each state of their bidirectional chain model for pricing GOGO stock.

:p Derive the time-average fraction of time spent in each state.
??x
To find the time-average fraction of time spent in each state by the market maker, we need to determine the stationary distribution \( \pi_i \) of the Markov chain representing the bidirectional states.

The bidirectional chain for pricing is defined as follows:
- State 0: Market Maker neither long nor short.
- States -1 and +1 represent the market maker being short or long by one share, respectively.

Given the transition probabilities:

```
P = | p   q  0 |
    | q   p  0 |
    | 0   0  1 |
```

Where:
- \( p \) is the probability of staying in state i.
- \( q \) is the probability of moving to an adjacent state.

To find the stationary distribution, we solve:

\[ \pi P = \pi \]

and

\[ \sum_{i} \pi_i = 1 \]

Let's derive the stationary distribution for this chain:

```python
import numpy as np

# Transition matrix
P = np.array([[p, q, 0],
              [q, p, 0],
              [0, 0, 1]])

# Solve the system of equations πP = π and ∑πi = 1
pi = np.linalg.solve(np.eye(3) - P, np.ones(3))
print(f"Stationary distribution: {pi}")
```

The result will give you the time-average fraction of time spent in each state.

Example:
If \( p = 0.6 \) and \( q = 0.4 \):

```python
p = 0.6
q = 0.4

# Transition matrix
P = np.array([[p, q, 0],
              [q, p, 0],
              [0, 0, 1]])

# Solve the system of equations πP = π and ∑πi = 1
pi = np.linalg.solve(np.eye(3) - P, np.ones(3))
print(f"Stationary distribution: {pi}")
```

The output will be:

\[ \pi_0, \pi_{-1}, \pi_{+1} \]

These values represent the time-average fraction of time spent in each state.
x??

---

#### Expected (absolute value) size of position (9.6)
Background context: In this exercise, you are asked to find the expected absolute value of the market maker's position over time.

:p What is the expected (absolute value) size of your position?
??x
To find the expected (absolute value) size of the market maker's position, we need to analyze the long-term behavior of the bidirectional chain. Given that the stationary distribution \( \pi_i \) describes the time-average fraction of time spent in each state, we can use this information.

The expected absolute value of the position is given by:

\[ E[|X_n|] = \sum_{i} |i| \pi_i \]

Where:
- \( X_n \) represents the market maker's position at step n.
- \( \pi_i \) is the stationary probability of being in state i.

Given the previous example with \( p = 0.6 \) and \( q = 0.4 \):

```python
p = 0.6
q = 0.4

# Transition matrix
P = np.array([[p, q, 0],
              [q, p, 0],
              [0, 0, 1]])

# Solve the system of equations πP = π and ∑πi = 1
pi = np.linalg.solve(np.eye(3) - P, np.ones(3))

# Expected absolute value of position
E_abs_position = sum(abs(i) * pi[i] for i in range(-1, 2))
print(f"Expected absolute value of position: {E_abs_position}")
```

The output will give you the expected (absolute value) size of your position.

Example:
If \( \pi_0 = 0.576 \), \( \pi_{-1} = 0.216 \), and \( \pi_{+1} = 0.216 \):

\[ E[|X_n|] = |0| \cdot 0.576 + |-1| \cdot 0.216 + |1| \cdot 0.216 \]

\[ E[|X_n|] = 0 + 0.216 + 0.216 \]

\[ E[|X_n|] = 0.432 \]

The result will be the expected (absolute value) size of your position.
x??

---

#### Expected number of minutes until k consecutive failures in a row (9.7)
Background context: This problem asks for the expected time until there are k consecutive failures, given that failures occur independently every minute with probability p.

:p Derive the expected number of minutes until k consecutive failures in a row?
??x
To find the expected number of minutes until k consecutive failures in a row, we need to model this as a Markov chain where states represent different numbers of consecutive failures. Let's define the states and transition probabilities:

- State \( S_0 \): No consecutive failures.
- States \( S_i \) for \( 1 \leq i < k \): \( i \) consecutive failures.

The transition probabilities are:
- From state \( S_0 \), with probability p, move to state \( S_1 \); otherwise stay in \( S_0 \).
- From state \( S_i \) (where \( 1 \leq i < k \)), with probability p, move to state \( S_{i+1} \); with probability \( 1-p \), return to state \( S_0 \).

The expected time until k consecutive failures can be derived using the properties of Markov chains and first-step analysis.

Let \( T_i \) be the expected number of minutes until k consecutive failures starting from state \( S_i \). We have:

\[ T_0 = 1 + pT_1 \]
\[ T_i = 1 + pT_{i+1} + (1-p)T_0 \quad \text{for } 1 \leq i < k-1 \]

Solving these equations iteratively, we get:

For \( i = k-1 \):

\[ T_{k-1} = 1 + p \cdot 0 + (1-p)T_0 \]
\[ T_{k-1} = 1 + (1-p)T_0 \]

Substituting backwards:

\[ T_{k-2} = 1 + p(1 + (1-p)T_0) + (1-p)T_0 \]
\[ T_{k-2} = 1 + p + p(1-p)T_0 + (1-p)T_0 \]

Continue this process until we reach \( T_0 \).

Example:
For simplicity, let's assume k = 3 and p = 0.5:

```python
from sympy import symbols, Eq, solve

# Define symbols
p, T0 = symbols('p T0')

# Equations for T_{k-1} to T_0
equations = [Eq(T2, 1 + (1-p) * T0),
             Eq(T1, 1 + p * T2 + (1-p) * T0)]

# Solve the equations
solutions = solve(equations, (T1, T2))
T0_value = solutions[T0]

print(f"Expected number of minutes until k consecutive failures: {T0_value}")
```

The output will give you the expected number of minutes until k consecutive failures in a row.

Example:
If \( p = 0.5 \):

```python
from sympy import symbols, Eq, solve

# Define symbols
p, T0 = symbols('p T0')

# Equations for T_{2} to T_0
equations = [Eq(T2, 1 + (1-p) * T0),
             Eq(T1, 1 + p * T2 + (1-p) * T0)]

# Solve the equations
solutions = solve(equations.subs(p, 0.5), (T1, T2))
T0_value = solutions[T0]

print(f"Expected number of minutes until k consecutive failures: {T0_value}")
```

The result will be the expected number of minutes until k consecutive failures in a row.
x??


#### Long-run Proportion of Time in State i

Background context: In a Markov chain, each node transition probability \(P_{ij}\) is given by \(P_{ij} = \frac{w_{ij}}{\sum_j w_{ij}}\), where \(w_{ij}\) represents the weight of the edge from node \(i\) to node \(j\). The long-run proportion of time spent in state \(i\) can be derived using time-reversibility equations.

To find this, we need to write out and solve the time-reversibility equations. The hint suggests guessing a solution to these equations.

:p What is the question about finding the long-run proportion of time a particle spends in state \(i\)?
??x
The long-run proportion of time that the particle is in state \(i\) can be determined by solving the time-reversibility equations for the stationary distribution. The key idea here is to ensure that the system's forward and backward transition probabilities are equal, allowing us to guess a solution.

To formalize, let \(\pi_i\) represent the long-run proportion of time spent in state \(i\). We need to satisfy the following equation derived from time-reversibility:
\[
\sum_j \pi_j P_{ji} = \sum_j \pi_j \frac{w_{ij}}{\sum_k w_{kj}}
\]
By guessing a solution, we can often find that \(\pi_i\) is proportional to some invariant quantity related to the graph structure. For many graphs, this typically results in \(\pi_i = 1/N\) if all states are equally likely.

??x
The long-run proportion of time spent in state \(i\) can be found by solving the time-reversibility equations for the stationary distribution. Given that we often have equal probabilities across nodes due to uniform edge weights, the solution is typically \(\pi_i = 1/N\), where \(N\) is the number of states.

---
#### Randomized Chess: King

Background context: The problem concerns a chess piece (king) moving randomly on an 8x8 board. At each time step, the king makes a uniformly random legal move.

:p Is the Markov chain for this process irreducible and aperiodic?
??x
Yes, the Markov chain is both irreducible and aperiodic.

1. **Irreducibility**: The king can move to any other square on the board from almost any position (except for the edges where movement may be restricted). This means that there is always a path between any two squares.
2. **Aperiodicity**: The king's moves are random, and it can return to its starting point in an arbitrary number of steps. There isn't a fixed period.

??x
The Markov chain for the king's movement on the board is irreducible because every square can be reached from any other square, and it is aperiodic since the king can return to its starting position after any number of moves.

---
#### Randomized Chess: Bishop

Background context: The bishop can move any number of squares along diagonals. 

:p Is the Markov chain for this process irreducible and aperiodic?
??x
Yes, the Markov chain is both irreducible and aperiodic.

1. **Irreducibility**: A bishop can reach any square on the same color (all white or all black) from any other square of the same color.
2. **Aperiodicity**: Since bishops move along diagonals, they can return to their starting position in an arbitrary number of steps, making the chain aperiodic.

??x
The Markov chain for the bishop's movement on the board is irreducible because every square of the same color can be reached from any other square of the same color, and it is aperiodic since the bishop can return to its starting position after an arbitrary number of moves.

---
#### Randomized Chess: Knight

Background context: The knight moves in an L-shape (two squares in one direction and one in perpendicular).

:p Is the Markov chain for this process irreducible and aperiodic?
??x
Yes, the Markov chain is both irreducible and aperiodic.

1. **Irreducibility**: A knight can reach any square on the board from almost any position, given enough moves.
2. **Aperiodicity**: The knight's L-shaped move pattern allows it to return to its starting position in various numbers of steps, making the chain aperiodic.

??x
The Markov chain for the knight's movement on the board is irreducible because every square can be reached from any other square with enough moves, and it is aperiodic since the knight can return to its starting position after an arbitrary number of moves.

---
#### Expected Time for King to Return

Background context: The problem requires calculating the expected time for the king to return to the corner. Using time-reversibility simplifies this calculation significantly.

:p Calculate the expected time for the king to return to the corner using time-reversibility.
??x
Using time-reversibility, we can simplify the calculation of the expected return time. The key insight is that each state's expected return time is proportional to its degree (number of possible moves from that state).

For a uniform random walk on an 8x8 board, the return time to any corner can be calculated as follows:

1. Define \(T_0\) as the time for the king to return to the starting position.
2. Using the properties of Markov chains and time-reversibility, we find that:
   \[
   T_0 = 64
   \]
This is because each state's expected return time is proportional to its degree, and on a uniform random walk, the expected return time to any state from itself is the same.

??x
Using time-reversibility, the expected time for the king to return to the corner is \(T_0 = 64\). This result simplifies significantly due to the symmetry and uniformity of the problem. Each move can be reversed, making the calculation straightforward.

---
#### Threshold Queue: Aperiodic and Irreducible

Background context: The threshold queue has a state transition based on a threshold point \(T=3\).

:p Argue that the Markov chain is aperiodic and irreducible.
??x
1. **Irreducibility**: The system can transition from any state to any other state without being trapped in subcomponents, making it irreducible.
2. **Aperiodicity**: There are no cycles with odd-length loops, ensuring the chain is aperiodic.

To show these properties:
- From any state \(i\), there exists a path back to itself and all other states.
- Any state can transition directly or through intermediate states to any other state in an arbitrary number of steps.

??x
The Markov chain for the threshold queue is both irreducible and aperiodic. Irreducibility follows because every state can reach any other state, and aperiodicity is ensured by the lack of odd-length cycles.

---
#### Symmetric Random Walk: Mean Time Between Visits to State 0

Background context: The symmetric random walk on Figure 9.10 shows that starting at state 0, we will return with probability 1.

:p Prove that \(m_{00} = \infty\), where \(m_{00}\) denotes the mean time between visits to state 0.
??x
To prove that \(m_{00} = \infty\):

1. **First Return Time**: Define \(T_0\) as the first return time to state 0 after starting from 0.
2. **Catalan Numbers**: The number of paths that do not return to 0 before the first visit to state 2 is related to Catalan numbers.
3. **Infinite Path Lengths**: As we can construct an infinite sequence of returns, the mean time between visits to state 0 will be infinite.

Formally:
\[
m_{00} = \sum_{n=1}^{\infty} n P(T_0 = n)
\]
Using properties of Catalan numbers and the fact that paths are infinitely long, we conclude \(m_{00} = \infty\).

??x
The mean time between visits to state 0 in a symmetric random walk is infinite (\(m_{00} = \infty\)). This result comes from the infinite number of possible paths and the nature of Catalan numbers, ensuring that returns are increasingly rare as the path length increases.


#### Characterizing Middle Steps for T00=n

**Background Context:**
Given \( T_{00} = n \), we are interested in characterizing the middle \( n-2 \) steps. The problem involves understanding how to express \( P\{T_{00}=n\} \) using a Catalan number and deriving a lower bound on this probability.

Catalan numbers, denoted as \( C(k) \), represent the number of valid strings of length \( 2k \) such that there are exactly \( k \) zeros (0’s) and \( k \) ones (1’s), with no prefix containing more 0’s than 1’s. This is a key concept in combinatorial mathematics.

**Question:**
:p How can we express \( P\{T_{00}=n\} \) using an expression involving a Catalan number?

??x
We need to use the properties of Catalan numbers to derive this probability. Specifically, consider that \( P\{T_{00}=n\} = P\{T_{00}=n | \text{First step is right}\} \).

Given that \( T_{00} = n \), let’s assume the first step is a right move (which means we start with 1). The problem then reduces to finding the probability of returning to state 0 from state 1 in exactly \( n-2 \) steps, given the constraints.

To express this using Catalan numbers:
\[ P\{T_{00}=n | T_0 = 1\} = C\left(\frac{n-2}{2}\right) / (2^{n-2}) \]

This is derived from the fact that the number of valid paths with exactly \( k \) up and down steps, starting at 1 and ending at 0, without ever going below 0, is given by the Catalan number.

Thus:
\[ P\{T_{00}=n | T_0 = 1\} = C(k) / (2^{2k}) \]
where \( k = \frac{n-2}{2} \).

x??

---

#### Lower Bound Using Catalan Number

**Background Context:**
We have derived the expression for \( P\{T_{00}=n | T_0 = 1\} \) using Catalan numbers. Now, we need to use this to derive a lower bound on \( P\{T_{00}=n\} \).

The well-known formula for Catalan numbers is:
\[ C(k) = \frac{1}{k+1} \binom{2k}{k} \]

Using this in the context of our probability expression, we can derive a lower bound.

**Question:**
:p Use the fact that \( C(k) = \frac{1}{k+1} \binom{2k}{k} \) and Lemma 9.18 to derive a lower bound on \( P\{T_{00}=n\} \).

??x
Using the derived expression:
\[ P\{T_{00}=n | T_0 = 1\} = C\left(\frac{n-2}{2}\right) / (2^{n-2}) \]
and the formula for Catalan numbers:
\[ C(k) = \frac{1}{k+1} \binom{2k}{k} \]

We get:
\[ P\{T_{00}=n | T_0 = 1\} = \frac{\binom{n-2}{(n-2)/2}}{(n-2) / (2^{n-2})} \]
which simplifies to:
\[ P\{T_{00}=n | T_0 = 1\} \geq \frac{1}{(n-2) + 1} \cdot \frac{\binom{n-2}{(n-2)/2}}{2^{n-2}} \]
\[ P\{T_{00}=n | T_0 = 1\} \geq \frac{1}{n/2} \cdot \frac{\binom{n-2}{(n-2)/2}}{2^{n-2}} \]

Since the total probability \( P\{T_{00}=n\} \) is at least the probability of starting from 1:
\[ P\{T_{00}=n\} \geq P\{T_{00}=n | T_0 = 1\} \]
Thus, we have a lower bound on \( P\{T_{00}=n\} \).

x??

---

#### Determining \( m_{00} \)

**Background Context:**
Using the derived lower bound and applying it to show that \( m_{00} = \infty \), where \( m_{00} \) denotes the mean time between visits to state 0.

**Question:**
:p Use the derived lower bound in (a) to show that \( m_{00} = \infty \).

??x
From part (b), we have:
\[ P\{T_{00}=n | T_0 = 1\} \geq \frac{C((n-2)/2)}{2^{(n-2)}} \]

Since \( C(k) \) grows faster than any polynomial, the probability \( P\{T_{00}=n | T_0 = 1\} \) does not decrease fast enough for the expected value to be finite. Therefore:
\[ E[T_{00}] = \sum_{n=2}^{\infty} n P\{T_{00}=n | T_0 = 1\} \]

Given that \( P\{T_{00}=n | T_0 = 1\} \) does not decrease quickly, the sum diverges, implying:
\[ m_{00} = E[T_{00}] = \infty \]

x??

---

#### Stopping Times and Wald's Equation

**Background Context:**
A positive integer-valued random variable \( N \) is a stopping time for a sequence \( X_1, X_2, X_3, ... \) if the event \( \{N=n\} \) is independent of \( X_{n+1}, X_{n+2}, ... \).

**Question:**
:p Consider a sequence of coin flips. Let \( N \) denote the time until we see 5 heads total. Is \( N \) a stopping time? How about the time until we see 5 consecutive heads?

??x
\( N \), the time until we see 5 heads in total, is a stopping time because the event of seeing the next head does not depend on future coin flips.

However, the time until we see 5 consecutive heads is **not** a stopping time. The occurrence of the next head depends on whether or not the current sequence already includes the required number of heads.

x??

---

#### Gambler's Stopping Time

**Background Context:**
The gambler stops whenever he is 2 dollars ahead in a game where each outcome (win or lose) is equally likely. \( N \) is the stopping time for this scenario.

**Question:**
:p Let \( X_i \) denote the result of the \( i \)-th game, and let \( N \) be the number of games until the gambler reaches a 2-dollar lead. Write a mathematical expression for \( N \).

??x
The stopping time \( N \) can be expressed as:
\[ N = \sum_{i=1}^{n} X_i \]
where the sum stops when the gambler’s net gain is exactly +2.

This is derived from the fact that each game outcome (win or lose) contributes to the cumulative net gain until the desired lead is achieved.

x??

---

#### Expectation of Summation

**Background Context:**
Given i.i.d. random variables \( X_i \), and a positive integer-valued random variable \( Y \) independent of the \( X_i \)'s, we need to determine \( E\left[\sum_{i=1}^{Y} X_i\right] \).

**Question:**
:p What do we know about \( E\left[\sum_{i=1}^{Y} X_i\right] \)?

??x
Using the linearity of expectation and properties of i.i.d. random variables, we have:
\[ E\left[\sum_{i=1}^{Y} X_i\right] = E[Y] E[X_1] \]

This result comes from the fact that \( Y \) and each \( X_i \) are independent.

x??

---

#### Proving Wald's Equation

**Background Context:**
Wald’s equation states:
\[ E\left[\sum_{i=1}^{N} X_i | N < \infty\right] = E[N] E[X] \]

We need to prove this using an indicator random variable \( I_n = 1 \) if and only if \( N \geq n \).

**Question:**
:p Prove Wald's equation by defining an indicator random variable \( I_n = 1 \) if and only if \( N \geq n \), and then considering the product \( X_n I_n \).

??x
Define the indicator random variable \( I_n = 1 \) if \( N \geq n \). Then, consider:
\[ E[X_n I_n] = P(N \geq n) E[X_n | N \geq n] \]

By summing over all possible values of \( n \), we can express the left-hand side as a telescoping series:
\[ \sum_{n=1}^{\infty} E[X_n I_n] = \sum_{n=1}^{\infty} P(N \geq n) E[X_n | N \geq n] \]

Using \( E\left[\sum_{i=1}^{N} X_i\right] = \sum_{n=1}^{\infty} E[X_n I_n] \), we get:
\[ E\left[\sum_{i=1}^{N} X_i | N < \infty\right] = \sum_{n=1}^{\infty} P(N \geq n) E[X_n | N \geq n] \]

Since \( E[X_n | N \geq n] = E[X_1] \), we have:
\[ E\left[\sum_{i=1}^{N} X_i | N < \infty\right] = E[N] E[X] \]

x??

---

#### Symmetric Random Walk

**Background Context:**
For a symmetric random walk, prove that \( m_{11} > 0.5 m_{01} \) and show that \( m_{01} = \infty \).

**Question:**
:p Prove that \( m_{11} > 0.5 m_{01} \), where \( m_{11} \) denotes the mean time between visits to state 1.

??x
Given:
\[ m_{11} > 0.5 m_{01} \]

To prove this, consider that returning to state 1 from state 1 involves a return to state 0 first (with probability \( m_{01}/2 \)) and then continuing back to state 1.

Thus:
\[ m_{11} = E[T_{11}] > \frac{m_{01}}{2} \cdot m_{01} = 0.5 m_{01}^2 \]

Since \( m_{01} \) is the mean time to return from state 0, and given that it must be infinite for the random walk to be recurrent without returning in a finite expected time:
\[ m_{01} = \infty \]
Therefore:
\[ m_{11} > 0.5 \cdot \infty = \infty \]

x??

---

#### Recurrent versus Transient

**Background Context:**
The problem involves determining whether certain states are recurrent or transient in a given DTMC.

**Question:**
:p Consider the DTMC shown in Figure 9.12. Determine if the state is recurrent or transient.

??x
To determine if a state is recurrent or transient, we need to check if the expected number of visits \( E[T_{00}] \) is finite (transient) or infinite (recurrent).

From part (a):
\[ m_{01} = \infty \]
Since the mean time between visits to state 1 from state 0 is infinite, state 1 must be recurrent.

For state 2:
If we can show that \( E[T_{22}] = \infty \), then state 2 is also recurrent. This follows because if a state has an infinite expected return time, it cannot be transient.

x??


#### Markov Chain Recurrence and Transience

Background context: This problem deals with a specific Markov chain depicted in Figure 9.12, where states are labeled \(0, 1, 2, 3\). The transition probabilities between these states can be derived from the given information that \(q = 1 - p\) for all transitions.

:p For which values of \(p\) is this Markov chain recurrent or transient? Provide a detailed explanation based on the expected number of visits to each state.
??x
To determine recurrence and transience, we need to analyze the behavior of the chain over time. A key criterion is that if the expected number of returns to any state is infinite (recurrent) or finite (transient).

For this Markov chain, observe that from state \(0\), the probability of returning back is influenced by the parameter \(p\). Specifically, we can use the concept of recurrence and transience based on whether the sum of expected visits diverges.

The states can be classified as follows:
- If the sum \(\sum_{n=0}^{\infty} P_n(0, 0) = \infty\), then state \(0\) is recurrent.
- If the sum \(\sum_{n=0}^{\infty} P_n(0, 0) < \infty\), then state \(0\) is transient.

For a Markov chain to be recurrent, it must satisfy that the expected number of visits to any state starting from that state is infinite. For this particular chain:
- If \(p > \frac{1}{2}\), the chain is likely to return often enough for all states.
- If \(p < \frac{1}{2}\), there's a higher chance of being absorbed or transiting away, making the chain transient.

:p What values of \(p\) make this Markov chain recurrent?
??x
For \(p > \frac{1}{2}\), the expected number of visits to each state is infinite. This means that the chain is recurrent because the probability of returning to any state from where it started is high enough for all states.

:p What values of \(p\) make this Markov chain transient?
??x
For \(p < \frac{1}{2}\), the expected number of visits to each state is finite. This means that the chain is transient because there's a significant probability of not returning to certain states after leaving them.

---
#### Probability of Ever Returning to State 0

Background context: In the case where the Markov chain is transient, we need to compute \(f_0 = P(\text{Ever return to state 0 given start at } 0)\) as a function of \(p\).

:p Compute \(f_0\) for the transient Markov chain.
??x
For a transient Markov chain where the probability of returning to any state is finite, we need to calculate the probability that starting from state 0, we will ever return to it.

Given that the chain is transient and \(p < \frac{1}{2}\), the probability \(f_0\) can be derived based on the properties of Markov chains. Specifically:

\[ f_0 = P(\text{ever return to } 0) = 1 - P(\text{never return to } 0) \]

Since the chain is transient, the probability that we never return to state 0 from any visit is finite and non-zero.

:p What is \(f_0\) for a Markov chain with \(p < \frac{1}{2}\)?
??x
For a Markov chain with \(p < \frac{1}{2}\), the probability of ever returning to state 0 given that we start at state 0 can be derived as:

\[ f_0 = 1 - (1 - p)^n \]

However, since the chain is transient, this simplifies to a finite value less than 1. Specifically,

\[ f_0 = 1 - (1 - p)^\infty \approx 1 - 0 = 1 \]

For practical purposes in this context:

\[ f_0 = 1 - (1 - p)^n \text{ as } n \to \infty \]

But since it is transient, we can say that \(f_0 < 1\).

---
#### Expected Time to Return from State 0

Background context: Let \(T_{00}\) denote the time to go from state 0 back to state 0. We need to derive \(E[T_{00}]\) for a transient Markov chain, and what this tells us about \(\pi_0 = \lim_{n \to \infty} P_n(0, 0)\).

:p Derive \(E[T_{00}]\) for the given Markov chain.
??x
The expected time to return to state 0 from state 0 can be derived using the concept of first-step analysis. Given that the chain is transient and \(p < \frac{1}{2}\), we need to calculate:

\[ E[T_{00}] = \sum_{n=1}^{\infty} n P(T_{00} = n) \]

This can be simplified by considering the probabilities of transitioning between states. For a transient chain, this would involve summing over all possible paths that return to state 0.

Since \(p < \frac{1}{2}\), the expected time is finite and given by:

\[ E[T_{00}] = \frac{1}{f_0} \]

Where \(f_0\) is the probability of ever returning to state 0, which we derived as less than 1.

:p What does \(E[T_{00}]\) tell us about \(\pi_0\)?
??x
The expected time to return from state 0 back to state 0 (\(E[T_{00}]\)) provides insight into the long-term behavior of the Markov chain. Specifically, for a transient chain:

\[ E[T_{00}] = \frac{1}{f_0} \]

Where \(f_0\) is the probability of ever returning to state 0.

This implies that if \(E[T_{00}]\) is finite (which it is in this case), then \(\pi_0 = 0\). This means that in the long run, starting from state 0, the chain does not spend any positive fraction of time in state 0. Thus:

\[ \lim_{n \to \infty} P_n(0, 0) = 0 \]

---
#### Limiting Probabilities for Transient Chain

Background context: The problem assumes \(p < q\), and we need to derive the limiting probabilities using stationary equations.

:p Derive all the limiting probabilities.
??x
For a Markov chain with states \(\{0, 1, 2, 3\}\) where \(q = 1 - p\) and assuming \(p < q\):

The stationary distribution \(\pi_i\) can be derived by solving the balance equations:

\[ \pi_0 P(0,0) + \pi_1 P(1,0) = \pi_0 \]
\[ \pi_2 P(2,0) + \pi_3 P(3,0) = \pi_0 \]

Given that the chain is transient and \(p < q\), we can use the fact that \(\sum_i \pi_i = 1\) to solve for the limiting probabilities.

Since the chain is transient:

\[ \lim_{n \to \infty} P_n(i, j) = 0 \text{ for all } i, j \]

Thus,

\[ \pi_0 + \pi_1 + \pi_2 + \pi_3 = 1 \]
\[ \pi_i = 0 \text{ for all } i \]

:p Are the limiting probabilities zero?
??x
Yes, the limiting probabilities are zero because the chain is transient. This means that in the long run, the probability of being in any state approaches zero.

---
#### Residue Classes in Periodic Chains

Background context: In Section 9.8, we discussed residue classes for irreducible DTMCs with period \(d\). We need to define and prove properties related to these residue classes.

:p Show that the notion of residue classes is well-defined.
??x
To show that the notion of residue classes is well-defined, we need to prove that the lengths of any two paths from state \(i\) to state \(j\) are equivalent modulo \(d\).

Let \(\pi_k(i, j)\) denote a path of length \(k\) from state \(i\) to state \(j\). By irreducibility and periodicity, there exists at least one such path for each residue class.

If two paths have lengths \(k_1\) and \(k_2\), then:

\[ k_1 \equiv k_2 \pmod{d} \]

This means that any two paths from state \(i\) to state \(j\) will have the same remainder when divided by \(d\).

:p Prove that from a state in residue class \(k\) we can only go to a state in residue class \(k+1\).
??x
Given the definition of residue classes, if we start from a state in residue class \(k\), any path taken will result in a transition to another state such that the new residue class is determined by the properties of the Markov chain.

For an irreducible DTMC with period \(d\):

- From state \(i\) (residue class \(k\)), all paths must transition to states whose residues are exactly one step ahead modulo \(d\).

Thus, if we start in a state from residue class \(k\), any subsequent transition will move us to a state that is in the next residue class:

\[ \text{Res}(i + 1) = (k + 1) \pmod{d} \]

This means that moving from one state to another always results in transitioning between consecutive residue classes.

---
#### Finite-State DTMCs

Background context: This problem proves a theorem about finite-state irreducible DTMCs, specifically that all states are positive recurrent. We will use class properties to prove this.

:p Prove the following theorem for a finite-state, irreducible DTMC:
- All states are positive recurrent.
??x
To prove that all states in an irreducible and finite-state DTMC are positive recurrent, we need to leverage two key class property theorems:

1. Null recurrence is a class property: If state \(i\) is null recurrent and communicates with state \(j\), then state \(j\) is also null recurrent.
2. Positive recurrence is a class property: If state \(i\) is positive recurrent and communicates with state \(j\), then state \(j\) is also positive recurrent.

Since the chain is irreducible, every pair of states communicate directly or indirectly. Therefore:

- Start from any state \(i\).
- If state \(i\) is positive recurrent, then by the class property theorem for positive recurrence, all other states must be positive recurrent as well.
- Similarly, if state \(i\) is null recurrent, then all states are null recurrent.

For a finite-state irreducible DTMC, we can conclude that since one state being positive recurrent implies all others must also be positive recurrent due to the class property. Therefore:

\[ \text{All states in an irreducible and finite-state DTMC are positive recurrent.} \]

:p Prove the theorem for null recurrence is a class property.
??x
To prove that null recurrence is a class property, assume state \(i\) is null recurrent and communicates with state \(j\).

- By definition, being null recurrent means:
  - The expected time to return to state \(i\) starting from state \(i\) is infinite: \(E[T_i] = \infty\).
  
Since states communicate:

- There exists a path from state \(j\) to state \(i\) and vice versa.

Given that the chain is irreducible, there are finite steps between any two states. If state \(i\) has an infinite expected return time, then due to communication, state \(j\) must also have an infinite expected return time because any path can be extended indefinitely through communicating states.

Thus:

\[ E[T_j] = \infty \]

This means that if state \(i\) is null recurrent and communicates with state \(j\), then state \(j\) must also be null recurrent. Therefore, null recurrence is a class property.

:p Prove the theorem for positive recurrence is a class property.
??x
To prove that positive recurrence is a class property, assume state \(i\) is positive recurrent and communicates with state \(j\).

- By definition, being positive recurrent means:
  - The expected time to return to state \(i\) starting from state \(i\) is finite: \(E[T_i] < \infty\).
  
Since states communicate:

- There exists a path from state \(j\) to state \(i\) and vice versa.

Given that the chain is irreducible, there are finite steps between any two states. If state \(i\) has a finite expected return time, then due to communication, state \(j\) must also have a finite expected return time because any path can be traversed in a finite number of steps.

Thus:

\[ E[T_j] < \infty \]

This means that if state \(i\) is positive recurrent and communicates with state \(j\), then state \(j\) must also be positive recurrent. Therefore, positive recurrence is a class property.

---
#### Time Reversibility

Background context: We need to determine whether the given Markov chain is time reversible based on its properties and behavior.

:p Determine if the chain is time reversible.
??x
To determine if the Markov chain is time reversible, we need to check the detailed balance equations. For a state \(i\) communicating with state \(j\):

\[ \pi_i P(i, j) = \pi_j P(j, i) \]

For our specific chain:
- State 0 transitions to states 1 and 3.
- States 1 and 3 transition back to state 0.

If the chain is time reversible:

\[ \pi_0 P(0, 1) \pi_1 = \pi_1 P(1, 0) \pi_0 \]
\[ \pi_0 P(0, 3) \pi_3 = \pi_3 P(3, 0) \pi_0 \]

Given that the chain is transient and not irreducible (since it does not return to all states infinitely), time reversibility would be difficult to verify. However, for a finite-state DTMC:

- Time reversibility requires detailed balance equations.
- In our case, the lack of periodicity and infinite returns make it highly unlikely.

Thus, based on these properties:

\[ \text{The chain is not time reversible.} \]

:p Summarize the key findings from the problem.
??x
This problem covers several important aspects of Markov chains:
1. **Recurrence and Transience**: Determined the values of \(p\) for which the chain is recurrent or transient, focusing on expected number of visits.
2. **Probability of Returning to State 0**: Derived \(f_0\) (probability of ever returning) in a transient scenario.
3. **Expected Time to Return**: Calculated \(E[T_{00}]\) and its implications for the limiting probabilities.
4. **Residue Classes**: Proved properties related to residue classes in periodic chains.
5. **Finite-State DTMCs**: Proved that all states are positive recurrent using class properties.
6. **Time Reversibility**: Determined that the chain is not time reversible due to its transient nature.

These findings provide a comprehensive understanding of Markov chain behavior under different conditions and constraints. \(\boxed{\text{All key aspects have been addressed as per the problem statement.}}\) \end{document}


#### Why Citation Counting Alone Is Inadequate
Background context explaining why citation counting alone is not a good measure of page importance. Discuss how it fails to consider the quality and relevance of links.

:p Why might citation counting be insufficient for ranking web pages?
??x
Citation counting can be inadequate because:
1. Not all links are equal; a link from a highly authoritative page (like Yahoo) should have more weight than a link from an obscure or less reputable source.
2. It is easy to manipulate the system by creating many dummy pages that all point to one’s own page, thereby inflating its rank artificially.

Citation counting does not account for the quality and relevance of incoming links, which could lead to misleading rankings where irrelevant or low-quality content ranks higher than more relevant but less connected content.
x??

---

#### Why Weighted Links Are Also Easy to Fool
Background context explaining why weighted link systems can still be gamed. Discuss the issue with creating a clique of highly linked pages.

:p How can even a weighted link system be easily manipulated?
??x
Even a weighted link system is susceptible to manipulation because:
1. By creating a large number of dummy web pages and having them all point to each other, including the target page, you can create a high-weighted backlink structure.
2. This creates an artificial network that inflates the rank of the target page due to its many weighted backlinks.

To prevent this, the system must consider not just the number but also the relevance and quality of links.
x??

---

#### Google's PageRank Algorithm
Background context explaining how PageRank addresses both issues by considering the importance of incoming links recursively. Discuss the recursive definition and its Markov chain interpretation.

:p How does Google’s PageRank algorithm address the limitations of citation counting?
??x
Google’s PageRank algorithm addresses these limitations through a recursive definition:
- A page has high rank if the sum of the ranks of its backlinks is high.
- This approach considers both the number and quality of incoming links, ensuring that highly authoritative pages contribute more to the rank.

From a Markov chain perspective:
- Each state represents a web page.
- Transitions are based on outgoing links; each outgoing link has an equal probability (1/k) if there are k such links.
- The limiting probabilities represent the long-term distribution of visits, which directly correspond to the PageRank values.

The algorithm can be summarized as follows in pseudocode:
```java
// Pseudocode for calculating PageRank
function calculatePageRank(webGraph) {
    // Initialize rank for each page
    let ranks = initializeRanks(webGraph);
    
    // Apply damping factor (usually 0.85)
    let d = 0.85;
    
    // Iteratively update ranks until convergence
    while (!converged(ranks)) {
        newRanks = {}
        for each page i in webGraph do {
            rank(i) = (1 - d) / numPages + d * sum of incomingRank(j) * P(j -> i)
            where j points to i and P(j -> i) is the probability of transition from j to i
        }
        
        // Assign new ranks
        for each page i in webGraph do {
            ranks[i] = newRanks[i]
        }
    }
    
    return ranks;
}
```
x??

---

#### Example: Dead End or Spider Trap
Background context explaining the issues with dead ends and spider traps. Discuss how they can lead to unsatisfactory solutions.

:p What is a "dead end" in web graph terms, and why does it pose a problem for PageRank?
??x
A “dead end” in a web graph refers to a page that has no outgoing links (or specifically, one with an outgoing link pointing back to itself). This poses problems because:
- It can create an absorbing state where the Markov chain gets stuck.
- The limiting probabilities for such states are 1 (for the dead end) and 0 for all other pages, which is counterintuitive as it suggests that only the dead end page has importance.

This solution does not align with our intuitive understanding of web surfing, where a page that chooses to be anti-social should not dominate the rankings.
x??

---

#### Example: Two Spider Traps
Background context explaining how multiple spider traps can lead to an infinite number of solutions. Discuss why this is problematic for PageRank.

:p What are "spider traps" in web graph terms, and why do they cause issues with PageRank?
??x
“Spider traps” refer to pages that have self-loops (a page that links back to itself). In the context of multiple spider traps:
- The presence of such traps can lead to an infinite number of solutions for the limiting probabilities.
- This is because the start state significantly affects the solution, making it inconsistent and unsatisfying.

The issue here is that pages with self-loops can artificially inflate their own rank, leading to a breakdown in ranking fairness and accuracy.
x??

---

#### Google's Solution to Dead Ends and Spider Traps
Background context explaining how Google introduced a tax mechanism to address these issues. Discuss the concept of taxing each page some fraction of its importance.

:p How does Google’s solution using a "tax" on web pages work?
??x
Google’s solution uses a “tax” mechanism where:
- Each page pays out a certain percentage (e.g., 30%) of its importance.
- This taxed importance is then distributed equally among all pages in the graph.

This approach prevents the Markov chain from getting trapped and ensures that each state has a non-zero probability, leading to more equitable rankings. The modified transition probabilities are calculated as:
1. Multiply existing transitions by (1 - tax).
2. Add uniform outgoing transitions with the taxed amount divided by the number of states.

For example, in a three-state chain after applying a 30% tax, each state gets an additional transition weight to every other state, including itself.
x??

---

