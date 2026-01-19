# High-Quality Flashcards: 7A003--Performance-modeling-and-design-of-computer-systems_processed (Part 12)


**Starting Chapter:** 8.9 Infinite-State Stationarity Result

---


#### Finding Limiting Probabilities in Finite-State DTMCs
Background context: To find the limiting probabilities of a finite-state discrete-time Markov chain (DTMC), we use Theorem 8.6, which states that if the limit distribution exists, it can be obtained by solving the stationary equations and the normalization condition.
Relevant formulas:
- $\vec{\pi} = \vec{\pi} \cdot P $-$\sum_{i=0}^{M-1} \pi_i = 1$:p What is the question about finding limiting probabilities in finite-state DTMCs?
??x
To find the limiting probabilities, we need to solve the stationary equations and ensure that the probabilities sum up to one. For example, for a repair facility problem with states "Working" (W) and "Broken" (B), we have:
- $\pi_W = 0.95\pi_W + 0.4\pi_B $-$\pi_B = 0.05\pi_W + 0.6\pi_B $-$\pi_W + \pi_B = 1$ Solving these equations, we get:
- $\pi_W = \frac{8}{9}$-$\pi_B = \frac{1}{9}$ The answer with detailed explanations: The stationary distribution is also the limiting distribution by Theorem 8.6. In this case, our machine breaks down on average once every nine days.
x??

---

#### Repair Facility Problem Example
Background context: This example involves a repair facility where there are two states: "Working" (W) and "Broken" (B). We need to find the limiting distribution $\vec{\pi} = (\pi_W, \pi_B)$.

:p What is the question about this specific problem?
??x
We need to determine the fraction of time the machine spends in each state by solving the stationary equations:
- $\pi_W = 0.95\pi_W + 0.4\pi_B $-$\pi_B = 0.05\pi_W + 0.6\pi_B $-$\pi_W + \pi_B = 1$ Solving these equations, we get:
- $\pi_W = \frac{8}{9}$-$\pi_B = \frac{1}{9}$ The answer with detailed explanations: The machine is working $ \frac{8}{9} $ of the time and broken for $ \frac{1}{9} $ of the time.
x??

---

#### Umbrella Problem
Background context: This problem involves an umbrella and rain. We need to find the limiting probabilities using stationary equations.

:p What is the question about this problem?
??x
We are given a transition probability matrix where:
- $\pi_0 = (1-p)\pi_2 $-$\pi_1 = (1-p)\pi_1 + p\pi_2 $-$\pi_2 = p\pi_0 + (1-p)\pi_1$ Solving these equations, we get:
- $\pi_0 = \frac{1-p}{3-p}$-$\pi_1 = \frac{1}{3-p}$-$\pi_2 = \frac{1}{3-p}$ The answer with detailed explanations: The professor gets wet on $ \frac{1-p}{3-p} $ of the days, assuming she has no umbrella and it rains. For $ p=0.6 $, this fraction is $\frac{0.4}{2.4} = 0.1$.
x??

---

#### Infinite-State DTMCs
Background context: In an infinite-state DTMC, we consider the limiting probability distribution on states denoted by $\vec{\pi} = (\pi_0, \pi_1, \pi_2, ...)$ where $ \lim_{n \to \infty} P^n_{ij} = \pi_j $.

:p What is the question about infinite-state DTMCs?
??x
In an infinite-state DTMC, we denote the limiting probability distribution on states by $\vec{\pi} = (\pi_0, \pi_1, \pi_2, ...)$ where:
- $\pi_j = \lim_{n \to \infty} P^n_{ij}$-$\sum_{i=0}^{\infty} \pi_i = 1$ The answer with detailed explanations: For infinite-state DTMCs, the stationary distribution is equal to the limiting distribution. This means that if a limiting distribution exists, it is also a stationary distribution and no other stationary distribution exists.
x??

---

#### Infinite-State Stationarity Result
Background context: We need to prove that for an infinite-state DTMC, the stationary distribution equals the limiting distribution.

:p What is the question about this theorem?
??x
We need to show that if $\pi_j = \lim_{n \to \infty} P^n_{ij} > 0 $ is a limiting probability of being in state$j$, then:
- The sequence $\{\pi_j, j=0,1,2,...\}$ forms a stationary distribution.
- Any stationary distribution must be equal to the limiting distribution.

The answer with detailed explanations: We prove that if the limiting distribution exists, it is also a stationary distribution. Then we show that any other stationary distribution must match this limiting distribution. This is achieved by carefully manipulating infinite sums and limits.
x??

---


#### Concept of Limiting Probability Distribution in DTMCs
Background context: In discrete-time Markov chains (DTMCs), the limiting probability distribution $\pi $ represents the long-term behavior of the system. It is defined such that as$n $ approaches infinity, the probability that the chain is in state$j $, denoted by $ P(X_n = j)$, converges to $\pi_j$.

Relevant equations:
$$P(X_n = j) = \sum_{i=0}^{\infty} P(X_n = j | X_0 = i) \cdot P(X_0 = i) = \sum_{i=0}^{\infty} P^n_{ij} \pi'_i$$
$$\pi_j' = \sum_{i=0}^{M} P^n_{ij} \pi'_i + \sum_{i=M+1}^{\infty} P^n_{ij} \pi'_i$$:p What does the equation $ P(X_n = j) = \sum_{i=0}^{\infty} P(X_n = j | X_0 = i) \cdot P(X_0 = i)$ represent?
??x
This equation represents the probability of being in state $j $ at time$n $, given that the initial state is $ i$. It uses the law of total probability, summing over all possible initial states to find the final probability.
x??

---
#### Bounding $\pi'_j $ Background context: We need to show that the sequence$\{\pi'_j\}$ converges to $\pi_j$ by bounding it from above and below using the sandwich theorem.

Relevant equations:
$$M/\sum_{i=0}^{M} P^n_{ij} \pi'_i \leq \pi'_j \leq M/\sum_{i=0}^{M} P^n_{ij} \pi'_i + \infty/\sum_{i=M+1}^{\infty} \pi'_i$$:p How do we use the sandwich theorem to bound $\pi'_j$?
??x
By applying the sandwich theorem, we can show that $\pi'_j $ is bounded between two limits. The lower bound comes from considering only a finite number of states$M$, and the upper bound includes the remaining infinite states.
x??

---
#### Solving Stationary Equations in Infinite-State DTMCs
Background context: To find the stationary distribution, we need to solve an infinite set of equations. For an unbounded queue example, where jobs arrive and depart according to certain probabilities.

Relevant equations:
$$\pi_0 = \pi_0(1-r) + \pi_1 s$$
$$\pi_1 = \pi_0 r + \pi_1 (1 - r - s) + \pi_2 s$$
$$\ldots$$:p How do we approach solving the infinite stationary equations?
??x
We can start by expressing higher order probabilities in terms of $\pi_0 $. For instance, if we know $\pi_1 = \frac{r}{s} \pi_0 $, we substitute this into subsequent equations to express other $\pi_i$ values.
x??

---
#### General Guess for Stationary Distribution
Background context: After expressing higher order probabilities in terms of $\pi_0$, a general guess can be made that:
$$\pi_i = \left( \frac{r}{s} \right)^i \pi_0$$:p How do we verify the correctness of this guess?
??x
To verify, substitute the guessed form into the stationary equations. For example:
$$\pi_i = \pi_{i-1} r + \pi_i (1 - r - s) + \pi_{i+1} s$$

Substituting $\pi_i = \left( \frac{r}{s} \right)^i \pi_0$ and simplifying should satisfy the equation.
x??

---
#### Determining $\pi_0 $ Background context: To determine$\pi_0$, use the normalization condition:
$$\sum_{i=0}^{\infty} \pi_i = 1$$

Relevant equations:
$$\pi_0 \left( 1 + \frac{r}{s} + \left( \frac{r}{s} \right)^2 + \ldots \right) = 1$$
$$\pi_0 \cdot \frac{1}{1 - \frac{r}{s}} = 1$$
$$\pi_0 = 1 - \frac{r}{s}$$:p How do we find the value of $\pi_0$?
??x
Using the geometric series formula, we can sum the infinite series:
$$\sum_{i=0}^{\infty} \left( \frac{r}{s} \right)^i = \frac{1}{1 - \frac{r}{s}}$$

Solving for $\pi_0$ gives us:
$$\pi_0 = 1 - \frac{r}{s}$$x??

---


#### Average Number of Jobs at the Server
Background context: This concept is related to queuing theory, specifically M/M/1 or similar queue models. The formula provided calculates the average number of jobs (or customers) at a server using the stationary distribution of states.

The average number of jobs $E[N]$ can be calculated as follows:
$$E[N]=1\rho + 2\rho^2(1-\rho) + 3\rho^3(1-\rho) + \ldots$$

Where $\rho = \frac{r}{s}$, and $ r$is the arrival rate, while $ s$ is the service rate. The stationary distribution for state $ i$ (number of jobs in the system) is given by:
$$\pi_i = \rho^i(1-\rho)$$:p What is the formula to calculate the average number of jobs at the server?
??x
The average number of jobs at the server can be calculated using the following series sum:
$$

E[N]=1\rho + 2\rho^2(1-\rho) + 3\rho^3(1-\rho) + \ldots$$where $\rho = r/s $, and $\pi_i = \rho^i (1 - \rho)$.
x??

---

#### Solving for Limiting Distribution
Background context: This problem involves finding the limiting distribution of a Markov chain, which is essential in understanding its long-term behavior. The goal is to solve stationary equations to determine the probabilities $(\pi_C, \pi_M, \pi_U)$.

:p What does solving for the limiting distribution involve?
??x
Solving for the limiting distribution involves determining the stationary probabilities of states in a Markov chain by solving the system of balance equations. These equations ensure that the probability flux into each state equals the probability flux out of that state.
x??

---

#### Powers of Transition Matrix
Background context: In discrete-time Markov chains, the powers of the transition matrix $P$ are used to determine the probabilities of transitions over multiple time steps.

:p What property must be maintained by any integer power of a finite-state transition matrix?
??x
For any integer power $n $, the matrix $ P^n$ must maintain the property that each row sums to 1. This is because rows in a transition matrix represent state probabilities, and these probabilities must sum to 1 at every step.
x??

---

#### Doubly Stochastic Matrix
Background context: A doubly stochastic matrix has entries where both rows and columns sum up to 1. For such matrices, the stationary distribution is uniform if it exists.

:p What can be said about the stationary distribution of a finite-state Markov chain with a doubly stochastic transition matrix?
??x
For a finite-state Markov chain with a doubly stochastic transition matrix, the stationary distribution is unique and uniform. This means that all states are equally likely in the long run.
x??

---

#### Gambling Game
Background context: This problem involves modeling Dafna's gambling game as a discrete-time Markov chain (DTMC). The objective is to determine the stationary probabilities of having a certain amount of money.

:p What does the stationary probability tell us about Dafna's long-run expected money?
??x
The stationary probability tells us the long-run fraction of time that Dafna has $\$ i$ in her possession. To find this, we set up and solve the balance equations for each state.
x??

---

#### Randomized Chess
Background context: This problem involves a rook on an 8×8 chessboard moving randomly to legal positions until it reaches the upper right corner. The goal is to calculate the expected time $E[T]$ and variance $Var(T)$.

:p How can we compute $E[T]$ for the rook's first visit to the upper right corner?
??x
To compute $E[T]$, we can model this as a Markov chain where states represent positions on the board. We set up balance equations and solve them to find the expected time until reaching the target position.
x??

---

#### Threshold Queue
Background context: This problem introduces a threshold queue with a parameter $T $ that changes its behavior based on job count relative to$T$. The goal is to derive the limiting probability distribution for arbitrary thresholds.

:p How does the Markov chain for the threshold queue change when the number of jobs is less than or greater than $T$?
??x
When the number of jobs is less than $T $, the number decreases by 1 with probability 0.4 and increases by 1 with probability 0.6. Conversely, if the number of jobs exceeds $ T$, these probabilities reverse.
x??

---

#### Naval Battle Analysis
Background context: This problem models a naval battle in the game Axis & Allies where outcomes are determined by dice rolls. The focus is on calculating the probability that destroyers or battleships win.

:p How can matrix powers be used to solve for the probability of winning in this naval battle scenario?
??x
Matrix powers can be used to model repeated rounds of combat, with each round's outcome affecting future probabilities. By raising a relevant transition matrix to a high power, we can approximate the long-term behavior and calculate win probabilities.
x??

---

