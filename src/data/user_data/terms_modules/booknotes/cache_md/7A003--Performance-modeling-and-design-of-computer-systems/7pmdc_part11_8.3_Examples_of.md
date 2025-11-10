# High-Quality Flashcards: 7A003--Performance-modeling-and-design-of-computer-systems_processed (Part 11)


**Starting Chapter:** 8.3 Examples of Finite-State DTMCs

---


#### Discrete-Time Markov Chains (DTMCs)
Discrete-Time Markov Chains are used to model systems that evolve over discrete time steps. The key property is the *Markovian property*, which states that given the current state, future states do not depend on past states. This can be represented mathematically as:

\[ P(X_{n+1} = j | X_n = i, X_{n-1} = i_{n-1}, \ldots, X_0 = i_0) = P(X_{n+1} = j | X_n = i) \]

This implies that the probability of moving to state \(j\) at time \(n+1\), given that we are in state \(i\) at time \(n\), is independent of the past states.

:p What is a key characteristic of Discrete-Time Markov Chains?
??x
The key characteristic of Discrete-Time Markov Chains is their *Markovian property*, which means the future state depends only on the current state and not on the sequence of events that preceded it. This simplifies the analysis significantly by reducing the complexity from considering all past states to just knowing the current state.
x??

---

#### Transition Probability Matrix
The transition probability matrix \(P\) for a DTMC is an essential tool in representing the probabilities of moving between states. The entry \(P_{ij}\) represents the probability of transitioning from state \(i\) to state \(j\). It holds that:

\[ \sum_{j} P_{ij} = 1 \]

:p What does each row of the transition probability matrix represent?
??x
Each row of the transition probability matrix represents the probabilities of moving to any other state from a specific current state. The sum of the entries in each row equals 1, indicating that the total probability of transitioning to some state must be 1.
x??

---

#### Repair Facility Problem Example
In this problem, a machine can either be working or in repair. If it is working today, there's a 95% chance it will work tomorrow; if in repair, there's a 40% chance it will be working the next day.

The transition probability matrix for this example is:

\[ P = \begin{bmatrix}
0.95 & 0.05 \\
0.40 & 0.60
\end{bmatrix} \]

:p What are the states in the repair facility problem?
??x
The two states in the repair facility problem are "Working" and "Broken." A machine can be either working or in the repair center.
x??

---

#### Umbrella Problem Example
An absent-minded professor uses two umbrellas when commuting. If it rains, she takes an umbrella if available; otherwise, she forgets to take one. The probability of rain is \(p\).

The transition probability matrix for this example is:

\[ P = \begin{bmatrix}
1-p & p \\
p(1-p) & 1 - p
\end{bmatrix} \]

:p How many states does the umbrella problem have?
??x
The umbrella problem has three states: having 0 umbrellas, having 1 umbrella, and having 2 umbrellas.
x??

---

#### Program Analysis Problem Example
A program can execute different types of instructions—CPU (C), Memory (M), or User Interaction (U). We are interested in the sequence of these instructions.

:p What is a possible state space for the program analysis problem?
??x
A possible state space could be defined by tracking the type of instruction at each step. However, if we focus on the transition between states based on the next instruction type, there might be three states: C (CPU), M (Memory), and U (User Interaction).
x??

---


#### n-Step Transition Probabilities

In a Markov chain, the matrix \( P \) represents one-step transition probabilities. The \( (i,j) \)-th entry of \( P \), denoted as \( P_{ij} \), gives the probability that state \( j \) will be visited in the next step if we are currently in state \( i \). When computing the \( n \)-step transition matrix, which is obtained by multiplying the one-step transition matrix by itself \( n \) times (i.e., \( P^n = P \cdot P \cdots P \), where each multiplication occurs \( n \) times), we get a matrix that provides probabilities of moving from state \( i \) to state \( j \) in exactly \( n \) steps.

For example, the provided transition matrix for an instruction sequence is:

\[ P = \begin{bmatrix} 0.7 & 0.2 & 0.1 \\ 0.8 & 0.1 & 0.1 \\ 0.9 & 0.1 & 0 \end{bmatrix} \]

The entry \( (P^n)_{ij} = P^n_{ij} \), often denoted as \( P^n_{ij} \), represents the probability of transitioning from state \( i \) to state \( j \) in exactly \( n \) steps.

:p What does \( P^n_{ij} \) represent?
??x
\( P^n_{ij} \) represents the probability of transitioning from state \( i \) to state \( j \) in exactly \( n \) steps.
x??

---

#### Umbrella Problem

The umbrella problem involves a Markov chain with states representing whether it is raining or not. Here, we have:

\[ P = \begin{bmatrix} 0 & 0 & 1 \\ 0 & 0.6 & 0.4 \\ 0.6 & 0.4 & 0 \end{bmatrix} \]

Where:
- State 1: No umbrella and not raining
- State 2: Umbrella and not raining
- State 3: Umbrella and it is raining

For large \( n \), the matrix powers \( P^n \) converge to a steady state where each row becomes identical. This implies that in the long run, the probability of being in any specific state converges to a constant.

:p In the long term, what does each row of \( P^n \) represent?
??x
In the long term, each row of \( P^n \) represents the limiting probabilities of transitioning to different states, given that we start from any initial state.
x??

---

#### Repair Facility Problem

Consider a repair facility with two states: operational and non-operational. The transition matrix is:

\[ P = \begin{bmatrix} 1-a & a \\ b & 1-b \end{bmatrix} \]

Where \( 0 < a, b < 1 \). For large \( n \), the matrix powers converge to:

\[ \lim_{n \to \infty} P^n = \begin{bmatrix} \frac{a}{a+b} & \frac{b}{a+b} \\ \frac{a}{a+b} & \frac{b}{a+b} \end{bmatrix} \]

This shows that in the long term, both states become equally likely.

:p What happens to the rows of \( P^n \) as \( n \) approaches infinity?
??x
As \( n \) approaches infinity, the rows of \( P^n \) converge to a constant vector where each state's probability is equal.
x??

---

#### Two-Step Transition Probabilities

For an M-state Markov chain (where states are C, M, and U), we can find the two-step transition probabilities using:

\[ P^2_{ij} = \sum_{k=0}^{M-1} P_{ik} \cdot P_{kj} \]

This is equivalent to summing over all intermediate states \( k \) that could be visited between state \( i \) and state \( j \).

:p What does the formula for two-step transition probabilities represent?
??x
The formula represents the probability of transitioning from state \( i \) to state \( j \) in exactly two steps by considering all possible intermediate states.
x??

---

#### Limiting Probabilities

The limiting probabilities, denoted as \( \pi_j \), are found by taking the limit of \( P^n \) as \( n \) approaches infinity. They represent the long-term behavior of the Markov chain.

For a given initial state \( i \), the limiting probability of being in state \( j \) is:

\[ \lim_{n \to \infty} P^n_{ij} = \pi_j \]

:p What does the limit of \( P^n_{ij} \) as \( n \) approaches infinity represent?
??x
The limit of \( P^n_{ij} \) as \( n \) approaches infinity represents the long-term probability of being in state \( j \), given that we start from state \( i \).
x??

---

#### Example with Umbrella Problem

From the example, it is observed that:

\[ P^{30} = \begin{bmatrix} 0.23 & 0.385 & 0.385 \\ 0.23 & 0.385 & 0.385 \\ 0.23 & 0.385 & 0.385 \end{bmatrix} \]

This shows that the long-term probability of having no umbrella (state 1) is approximately 0.23.

:p What is the limiting probability of having 0 umbrellas based on \( P^{30} \)?
??x
The limiting probability of having 0 umbrellas, as given by \( P^{30}_{11} \), is approximately 0.23.
x??

---


#### Limiting Probability and Initial State Irrelevance
Background context: The fact that the rows of \( \lim_{n\to\infty} P^n \) are all the same indicates that the long-term behavior of the Markov chain is independent of the initial state. This means the probability of being in a particular state after many transitions converges to a specific value, regardless of where you start.

:p What does it mean when the rows of \( \lim_{n\to\infty} P^n \) are all the same?
??x
It signifies that the limiting probability (or steady-state probability) is independent of the initial state. After many transitions, the probabilities converge to a fixed value that is the same for every state.
x??

---

#### Limiting Distribution and Stationary Probability
Background context: The limiting distribution \( \boldsymbol{\pi} = (\pi_0, \pi_1, ..., \pi_{M-1}) \) represents the long-term probability of being in each state. It is defined such that the sum of all probabilities equals 1.

:p What does \( \boldsymbol{\pi} \) represent?
??x
\( \boldsymbol{\pi} \) represents the limiting distribution, which is the vector of steady-state probabilities for each state in a Markov chain. Each \( \pi_j \) is the long-term probability that the system is in state \( j \).
x??

---

#### Transition Probability to Steady-State Probability
Background context: To determine the steady-state probability \( \pi_j = \lim_{n\to\infty} P^n_{ij} \), one can raise the transition matrix \( P \) to a large power and examine any row of \( P^n \).

:p How do we determine \( \pi_j = \lim_{n\to\infty} P^n_{ij} \)?
??x
We take the transition probability matrix \( P \) and raise it to the nth power for some large n, then look at any row in the resulting matrix \( P^n \). As \( n \) approaches infinity, this will give us the steady-state probabilities.
x??

---

#### Stationary Distribution Equations
Background context: A stationary distribution \( \boldsymbol{\pi} = (\pi_0, \pi_1, ..., \pi_{M-1}) \) is a probability distribution that satisfies the equation \( \boldsymbol{\pi} P = \boldsymbol{\pi} \). This implies that if we start in this distribution, one step later we will still be in the same distribution.

:p What are the stationary equations?
??x
The stationary equations are given by:
\[ \sum_{i=0}^{M-1} \pi_i P_{ij} = \pi_j \]
for all \( j \) and 
\[ \sum_{i=0}^{M-1} \pi_i = 1. \]
x??

---

#### Compressed Umbrella Problem
Background context: In the umbrella problem, if we only consider the number of umbrellas (1 vs. 2), the chain becomes symmetric. This symmetry can help in understanding why certain probabilities are equal.

:p Can you see why the limiting probability of having 1 umbrella is equal to the limiting probability of having 2 umbrellas?
??x
Yes, because if we only look at the states with 1 or 2 umbrellas, the chain becomes symmetric. This symmetry implies that the long-term probabilities of being in state 1 (having 1 umbrella) and state 2 (having 2 umbrellas) are equal.
x??

---

#### Stationary Distribution vs Limiting Distribution
Background context: For a finite-state discrete-time Markov chain (DTMC), if the limiting distribution exists, it is unique and represents the stationary probabilities.

:p Based on what we have learned so far, how do we determine \( \pi_j = \lim_{n\to\infty} P^n_{ij} \)?
??x
We take the transition probability matrix \( P \) and raise it to a large power \( n \), then examine any row of \( P^n \). As \( n \) approaches infinity, this will give us the steady-state probabilities.
x??

---

#### Efficient Method for Finding Stationary Distribution
Background context: Solving stationary equations provides an efficient way to find the limiting distribution without having to compute high powers of the transition matrix.

:p Is there a more efficient way to determine the stationary distribution?
??x
Yes, by solving the stationary equations. The equations are given by:
\[ \boldsymbol{\pi} P = \boldsymbol{\pi} \]
and 
\[ \sum_{i=0}^{M-1} \pi_i = 1. \]
This method is more efficient than computing high powers of \( P \).
x??

---

#### Proof of Stationary Distribution
Background context: The theorem states that for a finite-state DTMC, the stationary distribution obtained by solving the stationary equations represents the limiting probabilities.

:p What does the left-hand-side (LHS) of the first equation in (8.1) represent?
??x
The LHS represents the probability of being in state \( j \) one transition from now, given that the current probability distribution on the states is \( \boldsymbol{\pi} \). So equation (8.1) says that if we start out distributed according to \( \boldsymbol{\pi} \), then one step later our probability of being in each state will still follow distribution \( \boldsymbol{\pi} \).
x??

---

#### Stationary Distribution and Limiting Distribution
Background context: The theorem states that for a finite-state DTMC, the stationary distribution obtained by solving (8.1) is unique and represents the limiting probabilities.

:p How does the stationary distribution equal the limiting distribution?
??x
The stationary distribution \( \boldsymbol{\pi} \) equals the limiting distribution because:
1. It satisfies the stationary equations.
2. Any other stationary distribution must be equal to this one, ensuring uniqueness.
This implies that starting with any initial distribution and letting it evolve over time will eventually result in a distribution that follows \( \boldsymbol{\pi} \).
x??

---

#### Definition of Stationary Markov Chain
Background context: A Markov chain is said to be stationary or in steady state if the limiting probabilities exist and the initial state is chosen according to these probabilities.

:p What does it mean for a Markov chain to be stationary?
??x
A Markov chain is considered stationary if the long-term behavior (limiting distribution) exists, and the system starts in this distribution. This means that over time, the probability of being in each state converges to specific values that do not depend on the initial state.
x??

---

