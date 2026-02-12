# High-Quality Flashcards: 7A003--Performance-modeling-and-design-of-computer-systems_processed (Part 13)


**Starting Chapter:** Chapter 9 Ergodicity Theory. 9.2 Finite-State DTMCs

---


#### Limiting Distribution vs. Stationary Distribution
Background context: In discussing DTMCs (Discrete-Time Markov Chains), we have defined both a limiting probability and a stationary distribution. The limiting probability πj is the long-term probability of being in state j, given by $\pi_j = \lim_{n \to \infty} P^n_{ij}$. On the other hand, a stationary distribution $\vec{\pi} = (\pi_0, \pi_1, \pi_2, ...)$ is a vector that satisfies $\vec{\pi} \cdot P = \vec{\pi}$, where $ P$ is the transition matrix. Theorems 8.6 and 8.8 state that if the limiting distribution exists, it is unique and equals the stationary distribution.

:p What distinguishes πj from pj?
??x
πj represents the long-term or time-average probability of being in state j, while $p_j $ denotes the fraction of time spent in state j over an infinite number of steps along a single sample path. This distinction highlights that πj is related to ensemble averages (averaging over all possible paths), whereas$p_j$ pertains to time averages on individual paths.
x??

---

#### Periodic Chains and Limiting Distributions
Background context: A key aspect in determining the existence of the limiting distribution is examining periodicity. If a state can only be visited at certain intervals, it may not converge to a stationary distribution.

:p What example demonstrates a two-state transition matrix where πj does not exist?
??x
A valid example of a two-state transition matrix for which $\pi_j$ does not exist is:
$$P = \begin{bmatrix} 0 & 1 \\ 1 & 0 \end{bmatrix}$$

In this case, the chain is periodic with period 2 because each state can only be visited every other step. Therefore,$\pi_j = \lim_{n \to \infty} P^n_{ij}$ does not exist, but $\lim_{n \to \infty} P^{(2n)}_{jj}$ does.
x??

---

#### Finite-State DTMCs and Existence of Limiting Distribution
Background context: This section focuses on finite-state Markov chains to explore the conditions under which a limiting distribution exists. The key idea is to understand when the state space allows for convergence to a unique stationary distribution.

:p What are some conditions that ensure the existence of the limiting distribution in finite-state DTMCs?
??x
Conditions ensuring the existence of the limiting distribution include irreducibility and aperiodicity:
- **Irreducibility:** There must be a path from any state to any other state.
- **Aperiodicity:** States should not have a fixed periodicity, meaning they can return at any step.

These conditions help in guaranteeing that the chain mixes well over time, leading to convergence to a unique stationary distribution. For instance, if the Markov chain is irreducible and aperiodic, it will converge to a unique limiting distribution.
x??

---

#### Mean Time Between Visits
Background context: The mean time between visits to state j can be related to πj through the concept of the expected return time.

:p What does πj tell us about the mean time between visits to state j?
??x
πj provides information about the long-term frequency or probability of visiting state j. However, it does not directly give the mean time between visits. The mean time between visits can be derived from the stationary distribution and additional properties like expected return times, which are typically calculated using the structure of the Markov chain.
x??

---

#### Time-Reversibility
Background context: Time-reversibility offers a method to compute limiting probabilities more efficiently in certain types of Markov chains. This concept is crucial for understanding how states behave over time and whether they follow a reversible process.

:p What is the significance of time-reversibility in computing limiting probabilities?
??x
Time-reversibility means that reversing the direction of time does not change the distribution of states. For Markov chains, this property simplifies computations by allowing us to use backward transitions to calculate forward ones. This can be particularly useful for finite-state chains where certain symmetries or structures exist.

For example, in a reversible chain, the detailed balance equations can help compute $\pi_j$ without needing to solve the full set of stationary distribution equations.
x??

---


#### Time Averages and Stationary Distribution
Background context: The concept revolves around understanding how much time is spent in each state of a Discrete-Time Markov Chain (DTMC) over an extended period. For a DTMC, there are certain states that must be visited with some frequency.

:p What is the time average $p_j$ for the given chain?
??x
The time average $p_j $ represents the long-term fraction of time spent in state$j$. Given the provided transition matrix, we can see:

- The chain transitions from state 0 to states 1 and 2 with equal probability.
- State 0 stays at itself half the time and moves to state 1 for the other half.

Thus, the time average $p_0 = \frac{1}{2}$, and since state 1 is reached from both states, it gets visited with equal probability:
$$p_1 = \frac{1}{2}$$

This implies that over a long period, the chain spends exactly half of its time in state 0 and the other half in state 1.

??x
---
#### Existence of Stationary Distribution
Background context: A stationary distribution exists if there is a probability vector $\pi $ such that$\pi P = \pi$. For the given matrix, we can derive this using the equations provided:
$$\pi_0 = \pi_1$$
$$\pi_1 = \pi_0$$
$$\pi_0 + \pi_1 = 1$$

Solving these equations gives $\pi = (\frac{1}{2}, \frac{1}{2})$.

:p Does the chain have a stationary distribution?
??x
Yes, the chain has a stationary distribution. The solution to the system of equations shows that $\pi_0 = \frac{1}{2}$ and $\pi_1 = \frac{1}{2}$. This vector satisfies both the balance equation and the normalization condition.

??x
---
#### Periodicity in Markov Chains
Background context: The period of a state $j $ is defined as the greatest common divisor (GCD) of the set of integers$n $ such that$P^n_{jj} > 0$. A chain is periodic if any state has a period greater than 1. In the provided example, the matrix exhibits periodic behavior due to the structure.

:p Is the given transition matrix periodic?
??x
Yes, the transition matrix is periodic because it cycles states in a pattern that repeats every two steps, making its greatest common divisor (GCD) of step lengths greater than 1.

??x
---
#### Aperiodicity and Irreducibility for Limiting Probabilities
Background context: For a Markov chain to have limiting probabilities independent of the start state, it must be both aperiodic (all states having period 1) and irreducible (states communicating with each other). The identity matrix is an example where the chain consists of disconnected components.

:p Why is irreducibility needed for the limiting probabilities to be independent of the start state?
??x
Irreducibility ensures that all states can be reached from any starting state. If a chain is not irreducible, it could have multiple components, and the limiting probability would depend on which component the initial state belongs to.

??x
---
#### Simple Example of Non-Irreducible Chain
Background context: The identity matrix serves as an example of a non-irreducible Markov chain because its states do not communicate with each other. It consists of disconnected components, making it impossible to transition from one component to another.

:p What is a simple transition matrix that is not irreducible?
??x
The identity matrix $I$ is a simple example:
$$I = \begin{bmatrix} 1 & 0 \\ 0 & 1 \end{bmatrix}$$

This matrix has states that do not communicate with each other, thus making the chain non-irreducible.

??x
---
#### Aperiodicity and Irreducibility Ensuring Limiting Distribution Existence
Background context: For a finite-state DTMC to have limiting probabilities, it needs to be both aperiodic (all states having period 1) and irreducible. According to Theorem 9.4, these conditions ensure the existence of positive, independent of start state, and summing-to-1 limiting probabilities.

:p Do you think that aperiodicity and irreducibility are enough to guarantee the existence of the limiting distribution?
??x
Yes, as stated in Theorem 9.4, for a finite-state DTMC, if it is both aperiodic and irreducible, then there exists a unique limiting probability vector $\pi$ that has all positive components summing to 1 and is independent of the starting state.

??x


#### Understanding Pn·/vectore Convergence

Background context explaining the concept: The vector $\mathbf{v}$ is a specific vector used to illustrate how repeated multiplication by a probability matrix $P$ affects it. Each component of $P$ represents probabilities, ensuring that each row sums to 1.

:p What is the effect of multiplying the vector $\mathbf{e} = \left(0, 10, 0\right)$ by the matrix $P$?
??x
The multiplication $P \cdot \mathbf{e}$ results in a new vector where each component is a weighted average of all components of $\mathbf{e}$. This process brings the values closer together.

For example:
```java
// Example of P·/vectore
Matrix P = new Matrix(new double[][]{
    {1, 2, 1, 3, 1, 6},
    {1, 3, 1, 3, 1, 4},
    {3, 4, 0}
});

Vector e = new Vector(new double[]{0, 10, 0});
Vector result = P.multiply(e);
```
The output vector $P \cdot \mathbf{e}$ will have components that are a weighted average of the original values.

x??

---

#### Maximum and Minimum Component Differences

Background context explaining the concept: The differences between the maximum ($M_n $) and minimum ($ m_n $) components in$ P^n \cdot \mathbf{v}$decrease with each multiplication by $ P$.

:p What is the relationship between $M_n - m_n $ and$M_{n-1} - m_{n-1}$?
??x
The difference decreases according to the formula:
$$M_n - m_n \leq (1 - 2s)(M_{n-1} - m_{n-1})$$where $ s $ is the smallest element in $ P$.

This relationship shows that each multiplication by $P$ brings the components closer together.

x??

---

#### Upper and Lower Bounds on Components

Background context explaining the concept: When multiplying a vector by $P$, the maximum and minimum values are bounded. The upper bound for the largest component is given by:
$$s \cdot m_{n-1} + (1 - s) \cdot M_{n-1}$$

The lower bound for the smallest component is:
$$(1 - s) \cdot m_{n-1} + s \cdot M_{n-1}$$:p How are the upper and lower bounds derived?
??x
These bounds are derived by considering the weighted average of the maximum and minimum values in $P^{n-1} \cdot \mathbf{v}$. The smallest element $ s$ weights one of these components, while the rest are weighted equally.

For example:
```java
// Example to calculate upper bound
double s = 0.2; // smallest element in P
double Mn_minus_1 = 3;
double mn_minus_1 = 1;

double upper_bound = s * mn_minus_1 + (1 - s) * Mn_minus_1;
```
The same logic applies to the lower bound calculation.

x??

---

#### Convergence of Components

Background context explaining the concept: Given that $P $ is aperiodic and irreducible, there exists an$n_0 $ such that for all$n \geq n_0 $, every entry in $ P^n$ is positive. This ensures that the vector components converge to the same value.

:p What happens when $s = 0$?
??x
If $s = 0 $, then the formula $(1 - 2s) = 1$, which means the difference between maximum and minimum values does not decrease, leading to no convergence.

To fix this, we rely on the aperiodic and irreducible properties of $P$:
$$\exists n_0 \text{ such that for all } n \geq n_0, P^n \text{ has all positive elements.}$$x??

---

#### Positive Elements in High Powers of $P$ Background context explaining the concept: For aperiodic and irreducible matrices, there is a point beyond which all entries become positive.

:p How does the aperiodic and irreducible property ensure that eventually all components are the same?
??x
The aperiodicity ensures that every state can transition to any other state in one step for some power of $P$. Irreducibility means that there is a path from any state to any other state. Therefore, after a sufficient number of multiplications, all entries become positive and equal.

For example:
```java
// Example check if P^n has all positive elements
int n0 = 10; // arbitrary threshold based on properties

for (int i = 0; i < n0; i++) {
    boolean isPositive = true;
    for (double entry : P.getEntries()) {
        if (entry <= 0) {
            isPositive = false;
            break;
        }
    }
    if (isPositive) {
        System.out.println("All entries are positive after " + i + " multiplications.");
        break;
    }
}
```

x??

---


#### Finite-State Markov Chain Limiting Probabilities

Background context explaining the concept: In a finite-state Markov chain, we are interested in understanding the long-term behavior of the system. Specifically, if the Markov chain is irreducible and aperiodic, it will converge to a unique stationary distribution $\pi $, where $\pi_i = \lim_{n \to \infty} P^n_{ij}$ for all states $i$ and $j$. The proof involves showing that after a sufficiently large number of steps $ n_0$, the transition matrix $ P^n$ will have all positive elements, ensuring convergence to the stationary distribution.

:p What does it mean for a Markov chain to be irreducible and aperiodic?
??x
An irreducible Markov chain means that every state can reach any other state with some probability. An aperiodic Markov chain has no periodicity; the period of each state is 1, meaning there's no fixed integer $d > 1 $ such that the chain returns to a state only at multiples of$d$.
x??

---
#### Definition of $n_0 $ Background context: To ensure the transition matrix$P^n $ converges to the stationary distribution$\pi $, we define$ n_0 $as the maximum number of steps required for any two states$ i $and$ j$ to reach each other. This is based on the irreducibility condition, which guarantees a path between any two states.

:p What is the purpose of defining $n_0$ in this context?
??x
The purpose of defining $n_0 $ is to ensure that after$n \geq n_0 $, the transition matrix $ P^n $will have all positive elements, which guarantees convergence to the stationary distribution$\pi$.
x??

---
#### Positive Elements and Convergence

Background context: Once $P^{n_0}$ has all positive elements, subsequent multiplications by $P$ will only create weighted averages of these positive values. This ensures that each element in the matrix remains positive and converges to the stationary distribution.

:p Why must $P^n$ have all positive elements for convergence?
??x
For a finite-state Markov chain to converge to a unique stationary distribution, it is necessary that after some number of steps $n_0 $, the transition probabilities become sufficiently mixed. If $ P^n $has all positive elements, any further multiplication by$ P $will only create weighted averages of these values, preserving positivity and ensuring convergence to the limiting distribution$\pi$.
x??

---
#### Mean Time Between Visits

Background context: The mean time between visits to a state $j $, denoted as $ m_{jj}$, is defined as the expected number of steps between successive visits to state $ j$. This quantity is related to the stationary probability $\pi_j$ through the formula derived in Theorem 9.6.

:p How is $m_{jj}$ related to the stationary probability $\pi_j$?
??x
The mean time between visits to a state $j $, $ m_{jj}$, is related to the stationary probability $\pi_j $ by the equation $m_{jj} = \frac{1}{\pi_j}$. This relationship shows that states with higher stationary probabilities are visited more frequently on average.
x??

---
#### Matrix Decomposition for Proof

Background context: To prove Theorem 9.6, we decompose the matrix $M $ into two parts: a diagonal matrix$D $ and a non-diagonal matrix$ N $. This decomposition helps in expressing the relationship between the mean time to visit state $ j$and the stationary probability $\pi_j$.

:p How is matrix $M$ decomposed for this proof?
??x
Matrix $M $ is decomposed into two parts: a diagonal matrix$D $ and a non-diagonal matrix$N$, where:
- $D $ has its diagonal entries as$d_{jj} = m_{jj}$.
- $N $ has all off-diagonal elements as$N_{ij} = m_{ij}$ for $i \neq j$.

This decomposition is useful because it allows us to express the mean time between visits using matrix operations.
x??

---
#### Stationary Distribution and Limiting Matrix

Background context: The stationary distribution $\pi $ of a Markov chain satisfies the equation$\pi P = \pi $. When all elements in $ P^n $are positive, multiplying by$ P $will only create weighted averages that maintain positivity. Therefore, the limiting matrix$ L $(the matrix as$ n \to \infty$) also has all positive elements and each row sums to 1.

:p Why does the limiting matrix $L$ have all positive elements?
??x
The limiting matrix $L $ has all positive elements because once$P^n $ for some$n_0 $ is sufficiently mixed (i.e., all elements are positive), further multiplications by$P $ will only create weighted averages of these positive values. This ensures that the limiting matrix$L$ maintains positivity and each row sums to 1, as required for a stationary distribution.
x??

---


#### Limiting Distribution and Time Averages

Background context explaining the concept. In finite-state Markov chains, when a limiting distribution exists, it is equal to the unique stationary distribution. The time average of being in state $j $ along a sample path can be related to the mean time between visits to state$j $. If the chain has a limiting distribution $\vec{\pi} = (\pi_0, \pi_1, ..., \pi_{M-1})$, then $\pi_j $ represents the proportion of time spent in state $j$ over a long period.

:p What is the relationship between $\pi_j $ and$p_j$ assuming the limiting distribution exists?
??x
The relationship between $\pi_j $ and$p_j $ is that they are equal. This can be formalized by Theorem 9.28, which states that with probability 1,$ p_j = \frac{1}{m_{jj}}$, where $ m_{jj}$is the mean time between visits to state $ j$. Since we also know that $\pi_j = \frac{1}{m_{jj}}$, it follows that with probability 1,$ p_j = \pi_j$.

```java
// Pseudocode for calculating p_j based on m_jj and π_j
public class MarkovChainAnalysis {
    public double calculatePj(double m_jj) {
        // Assuming we know the mean time between visits (m_jj)
        return 1.0 / m_jj;
    }
}
```
x??

---

#### Infinite-State Markov Chains

Background context explaining the concept. Infinite-state Markov chains are far more complex to analyze compared to finite-state ones due to the infinite number of states. The terminology and concepts used for analysis differ significantly, and it may take time to understand them fully.

:p Which of these chains in Figure 9.1 are aperiodic and irreducible?
??x
All three chains in Figure 9.1 are aperiodic and irreducible. This means that each chain can transition between any state without being periodic (aperiodic) and every state can be reached from any other state given enough time (irreducible).

x??

---

#### Positive Recurrence, Transience, and Null Recurrence

Background context explaining the concept. These terms describe different behaviors of Markov chains in infinite states. A chain is "positive recurrent" if it returns to each state infinitely often with probability 1 and has a finite mean recurrence time. It is "transient" if there is some initial state from which the chain never returns, meaning the limiting probability of being in that state is zero. A chain is "null recurrent" if it returns to each state infinitely often but the mean recurrence time is infinite.

:p For Figure 9.1, which chains have positive recurrence and which are transient or null recurrent?
??x
- The first chain in Figure 9.1 has positive recurrence because there is a well-defined limiting probability for being in each state, and these probabilities sum to 1.
- The second chain is transient; the third chain is null recurrent.

x??

---

#### Intuition Behind Transience

Background context explaining the concept. In the second chain of Figure 9.1 (transient), there is a drift away from the "shore" (state 1). This means that once the system moves away from state 1, it may never return or may take an extremely long time to do so.

:p Intuitively, what is the problem with the second chain in Figure 9.1?
??x
The problem with the second chain in Figure 9.1 is that there is a drift away from the "shore" (state 1), making it non-obvious whether we will return to state 1 or any other initial state. There could be some point after which we never return to the shore.

x??

---

#### Intuition Behind Null Recurrence

Background context explaining the concept. In the third chain of Figure 9.1 (null recurrent), while it seems that we should return to each state, it is not clear how long it will take to do so due to the infinite mean recurrence time.

:p Intuitively, what is the problem with the third chain in Figure 9.1?
??x
The problem with the third chain in Figure 9.1 is that while it seems we should return to each state infinitely often, it is not clear how long it will take to do so due to the infinite mean recurrence time. This means that although we theoretically return to each state infinitely often, practically, the system may spend an arbitrarily large amount of time between visits.

x??

---


#### Definition of Recurrent and Transient States
The provided text defines recurrent and transient states. A state $j $ is considered recurrent if the probability$f_j $ that a Markov chain starting from state$ j $ returns to state $ j $ is 1, meaning it will be visited infinitely often with probability 1. Conversely, a state $ j $ is transient if $f_j < 1$, indicating there's some non-zero chance of never returning.

:p What defines a recurrent and a transient state in the context of Markov chains?
??x
A state $j $ is **recurrent** if it has a probability$f_j = 1 $ of being visited infinitely often. On the other hand, a state$ j $ is **transient** if there's a non-zero probability ($f_j < 1$) that you will never return to this state.

x??

#### Geometric Distribution for Transient States
The text states that every time a transient state $j $ is visited, the probability of not returning again is$1 - f_j $. Thus, the number of visits to a transient state follows a geometric distribution with mean $\frac{1}{1 - f_j}$.

:p What is the distribution for the number of visits to a transient state?
??x
The number of visits to a transient state $j $ is distributed geometrically with mean$\frac{1}{1 - f_j}$. This means that after each visit, there's a probability $1 - f_j$ that it will be the last visit.

x??

#### Infinity of Visits for Recurrent States
Theorem 9.9 asserts that if a state is recurrent, then starting from this state, with probability 1 you will visit the state infinitely often. Conversely, for transient states, the number of visits is finite almost surely.

:p What does Theorem 9.9 tell us about recurrent and transient states?
??x
Theorem 9.9 states that a recurrent state $j $ will be visited an infinite number of times with probability 1, while a transient state$j$ will only be visited finitely often almost surely.

x??

#### Expected Number of Visits Formula for Recurrent States
Theorem 9.10 provides the formula for the expected number of visits to state $i$. For recurrent states:

$$E[\text{# visits to state } i \text{ in } s \text{ steps} | X_0 = i] = \frac{s}{\sum_{n=0}^{\infty} P^n_{ii}}$$

And for the total number of visits to a recurrent state $i $ starting from$i$:

$$E[\text{Total # visits to state } i | X_0 = i] = \frac{\infty}{\sum_{n=0}^{\infty} P^n_{ii}}$$:p What are the formulas for expected number of visits in Theorem 9.10?
??x
The formula for the expected number of visits to state $i $ within$s $ steps, starting from state$i$, is:

$$E[\text{# visits to state } i \text{ in } s \text{ steps} | X_0 = i] = \frac{s}{\sum_{n=0}^{\infty} P^n_{ii}}$$

And the total expected number of visits starting from $i$ is:
$$E[\text{Total # visits to state } i | X_0 = i] = \frac{\infty}{\sum_{n=0}^{\infty} P^n_{ii}}$$

These formulas imply that for a recurrent state, the number of visits is infinite.

x??

#### Borel-Cantelli Lemma Application
Theorem 9.11 uses the Borel-Cantelli lemma to assert that if state $i $ is recurrent, then the sum of the probabilities of returning to state$i $ infinitely often ($\sum_{n=0}^{\infty} P^n_{ii}$) diverges to infinity. For transient states, this sum converges.

:p What does Theorem 9.11 tell us about recurrent and transient states using the Borel-Cantelli lemma?
??x
Theorem 9.11 uses the Borel-Cantelli lemma to state that if a state $i$ is recurrent, then:
$$\sum_{n=0}^{\infty} P^n_{ii} = \infty$$

This means the probability of returning to state $i$ infinitely often is 1. Conversely, for transient states:
$$\sum_{n=0}^{\infty} P^n_{ii} < \infty$$

This implies that the number of visits to a transient state is finite with probability 1.

x??

#### Communicating States and Recurrence
Theorem 9.12 establishes that if state $i $ communicates with another state$j$, then both states are either recurrent or transient together. This is because communication ensures that the behavior (recurrence/transience) of one state influences the other due to their connectedness.

:p What does Theorem 9.12 say about communicating states?
??x
Theorem 9.12 says that if a state $i $ communicates with another state$j $, then both states are either recurrent or transient together. This is because communication means there's some path from$ i $to$ j$ and vice versa, influencing the recurrence behavior of each other.

x??

---


#### Summation of Probabilities for Recurrent States
In a Markov chain, the state $j $ is recurrent if and only if the probability of returning to state$j$ starting from any state is 1. This can be mathematically expressed as:
$$\sum_{s=0}^{\infty} P^{m+n+s}_{ij} = \infty,$$where $ P^{k}_{ij}$denotes the probability of transitioning from state $ i$to state $ j $ in exactly $ k $ steps, and $m + n$ are fixed integers representing a transition path.

:p What does the equation $\sum_{s=0}^{\infty} P^{m+n+s}_{ij} = \infty$ signify for a recurrent state?
??x
This equation signifies that the sum of probabilities of all possible paths (of length $m + n + s $ where$s \geq 0 $) from any state to state$ j $is infinite. This indicates that the probability of returning to state$ j$ after an indefinite number of steps is certain, confirming its recurrent nature.
x??

---

#### Transient States and Communication
In a Markov chain, if state $i $ is transient and communicates with state$j $(denoted as$ i \leftrightarrow j $), then state$ j$ must also be transient. This can be proven by contradiction:
- Assume $j$ is recurrent.
- Since states $i $ and$j $ communicate, if$ j $ is recurrent, then $ i $ must also be recurrent, which contradicts the initial assumption that state $i$ is transient.

:p What does Theorem 9.13 state about the relationship between transient states and their communicating counterparts?
??x
Theorem 9.13 states that if a state $i $ is transient and communicates with another state$j $, then state$ j$ must also be transient.
x??

---

#### Irreducibility in Markov Chains
An irreducible Markov chain has no non-trivial closed sets, meaning it is possible to get from any state to any other state. In an irreducible chain:
- All states are either all transient or all recurrent.

:p What does the property of an irreducible Markov chain imply about its states?
??x
In an irreducible Markov chain, all states must have the same type—either all states are transient or all states are recurrent.
x??

---

#### Limiting Probabilities in Transient Markov Chains
For a transient Markov chain, as $n $ approaches infinity, the probability of being in any state$j $ after$n$ steps tends to zero:
$$\lim_{n \to \infty} P^n_{ij} = 0, \quad \forall j.$$

This implies that for a transient Markov chain, no stationary distribution exists.

:p What does Theorem 9.14 state about the limiting probabilities in a transient Markov chain?
??x
Theorem 9.14 states that for any state $j $ and as time$n $ goes to infinity, the probability of being in state$j$ tends to zero. Therefore, there does not exist a stationary distribution for a transient Markov chain.
x??

---

#### Non-Existence of Limiting Distribution
If for every state $j $, the limiting probability is zero ($\pi_j = 0$), then the sum of all such probabilities (which would be part of any potential stationary distribution) equals zero:
$$\sum_{j=0}^{\infty} \pi_j = 0.$$

Thus, no stationary distribution can exist.

:p What does Theorem 9.15 state about the existence of a limiting distribution in a Markov chain?
??x
Theorem 9.15 states that if for every state $j $, the limit as $ n $ approaches infinity of $ P^n_{ij}$ is zero, then the sum of all these probabilities (which should form the components of any stationary distribution) equals zero. Therefore, no limiting or stationary distribution can exist.
x??

---

#### Non-Existence of Stationary Distribution for Transient Chains
For a transient Markov chain, since the probability of being in any state $j $ approaches zero as time goes to infinity ($\lim_{n \to \infty} P^n_{ij} = 0$), no stationary distribution can exist. This is stated formally by Corollary 9.16.

:p What does Corollary 9.16 state about the existence of a stationary distribution in a transient Markov chain?
??x
Corollary 9.16 states that for a transient Markov chain, no stationary distribution exists because the probability of being in any state $j$ after an infinite number of steps tends to zero.
x??

---

#### Proof for Non-Existence of Stationary Distribution
Given an aperiodic and irreducible Markov chain where all limiting probabilities are zero ($\pi_j = 0$), it can be proven that no stationary distribution exists. The proof follows by contradiction:
1. Assume any stationary probability vector $\vec{\pi}'$.
2. Show that for every state $j $, $\pi'_j = 0$.

:p What is the main idea behind proving the non-existence of a stationary distribution in an aperiodic and irreducible Markov chain with zero limiting probabilities?
??x
The main idea is to show, through contradiction, that if all states have zero limiting probabilities ($\lim_{n \to \infty} P^n_{ij} = 0 $), then any potential stationary probability vector $\vec{\pi}'$ must have zero values for each state. This proves the non-existence of a stationary distribution.
x??

---


#### Expected Number of Visits to State 0

Background context: The text discusses a random walk and how to determine whether state 0 is recurrent or transient. It involves calculating the expected number of visits $V$ to state 0 using the formula:
$$V = \sum_{n=1}^{\infty} P^{2n}_{0,0}$$

This equation is derived from the fact that one cannot get from state 0 to itself in an odd number of steps. The expected number of visits $V$ helps determine if the chain is transient or recurrent.

:p What does the formula $V = \sum_{n=1}^{\infty} P^{2n}_{0,0}$ represent?
??x
The formula represents the expected number of times state 0 will be visited given that we start from state 0. This is derived because the walk can only return to state 0 in an even number of steps.

---

#### Simplifying the Expected Number of Visits Formula

Background context: The text simplifies the equation for $V$ using Lavrov's lemma, which provides a bound on binomial coefficients.

:p What is Lavrov's lemma and how does it help simplify the expected number of visits formula?
??x
Lavrov's lemma states that for $n \geq 1$:
$$4^n < \binom{2n}{n} < \frac{4^n}{2n+1}$$

Using this, the text simplifies the equation:
$$

V = \sum_{n=1}^{\infty} P^{2n}_{0,0} < \sum_{n=1}^{\infty} 4^n p^n q^n$$

This helps determine if $V$ is finite or infinite.

---

#### Recurrence and Transience of the Random Walk

Background context: The random walk in the text has a probability $p $ of moving right and$q = 1 - p $ of moving left. The chain is recurrent only when$p = \frac{1}{2}$.

:p What condition on $p$ ensures that the random walk is recurrent?
??x
The random walk is recurrent if and only if $p = \frac{1}{2}$. If $ p \neq \frac{1}{2}$, the chain is transient. This is because:
$$V > \sum_{n=1}^{\infty} \frac{4^n}{2n+1} \cdot \left(\frac{1}{4}\right)^n = \sum_{n=1}^{\infty} \frac{1}{2n+1} = \infty$$

And:
$$

V < \sum_{n=1}^{\infty} (4pq)^n < \infty$$since $4pq < 1$.

---

#### Probability of Ever Returning to State 0

Background context: The probability $f_0 $ that the chain ever returns to state 0 is defined. For a random walk with rightward drift ($ p > q$), it should be less than 1.

:p What does $f_0$ represent for the random walk?
??x
$f_0 $ represents the probability that the random walk ever returns to state 0, starting from state 0. For a transient random walk with rightward drift ($ p > q$), we have:
$$f_0 = 2q < 1$$

This is derived by conditioning on the first step and solving for $f_{-1,0}$ and $f_{1,0}$.

---

#### Conditioning on the First Step

Background context: The text uses conditioning on the first step to derive the probability of ever returning to state 0 from a given state.

:p How does conditioning on the first step help in finding $f_0$?
??x
Conditioning on the first step helps by breaking down the problem into simpler parts. For example:
- If we start at $-1 $, with probability $ q $ we go to $-2 $, and with probability $ p$ we move to 0.
$$f_{-1,0} = qf_{-2,0} + pf_{0,0}$$
- For a transient random walk ($p > q$), the solution simplifies to:
$$f_{-1,0} = 1 \text{ and } f_{1,0} = \frac{q}{p}$$

This leads to:
$$f_0 = qf_{-1,0} + pf_{1,0} = q + p\left(\frac{q}{p}\right) = 2q < 1$$---

#### Differentiating Between Aperiodic, Irreducible, and Recurrent

Background context: The text discusses whether aperiodicity, irreducibility, and recurrence are enough to guarantee the existence of a limiting distribution.

:p Do aperiodicity, irreducibility, and recurrence alone ensure the existence of a limiting distribution?
??x
No, aperiodicity, irreducibility, and recurrence alone do not guarantee the existence of a limiting distribution. The chain must also be positive recurrent or null recurrent for a limiting distribution to exist. Recurrence ensures that the chain returns to any state infinitely often but does not necessarily imply the existence of a steady-state distribution.

---

These flashcards cover the key concepts in the text, focusing on the expected number of visits, simplification techniques, and conditions for recurrence and transience in random walks.


#### Positive Recurrence vs. Null Recurrence

Background context: In a Markov chain, states can be classified based on their recurrence properties. A recurrent state will eventually return to itself with probability 1. However, not all recurrent states are created equal; they can be positive recurrent or null recurrent.

- **Positive Recurrent**: The mean time between visits (recurrences) is finite.
- **Null Recurrent**: The mean time between visits is infinite.

Theorem 9.22 and 9.23 provide conditions under which a state's recurrence property is inherited by other states it communicates with in the chain.

:p What does positive recurrence imply about a Markov chain?
??x
Positive recurrence implies that the expected return time to any given state is finite. This means that, on average, the system will revisit the same state within a bounded number of steps.
x??

---

#### Null Recurrent States

Background context: A null recurrent state visits its initial state infinitely often but does so with an infinite mean time between these visits.

:p What is a key characteristic of null recurrent states?
??x
A key characteristic of null recurrent states is that while they are visited infinitely often, the average time between visits (return times) to the state is infinite.
x??

---

#### Symmetric Random Walk Example

Background context: The symmetric random walk in question has an equal probability $p = \frac{1}{2}$ for moving left or right. It was previously proven that this chain is recurrent, but now we need to show that it is null recurrent.

:p What does the proof of the mean time between visits to state 0 being infinite involve?
??x
The proof involves contradiction. Assume that $m_{0,0}$(the mean number of steps between visits to state 0 starting from state 0) is finite. This leads to a contradiction when analyzing the relationship between visit times and states.

Here’s the detailed logic:
- Given $m_{1,0} = 1 + \frac{1}{2} \cdot 0 + \frac{1}{2} m_{2,0}$.
- By symmetry, $m_{2,0} = 2m_{1,0}$ because the mean time to go from state 2 back to 0 is twice the mean time to go from state 1 to 0.
- Substituting into the equation for $m_{1,0}$:
  ```plaintext
  m_{1,0} = 1 + \frac{1}{2} \cdot 0 + \frac{1}{2} (2m_{1,0}) 
           = 1 + m_{1,0}.
  ```
- This equation simplifies to $m_{1,0} = 1 + m_{1,0}$, which is a contradiction since it implies that $ m_{1,0}$ cannot be finite.
x??

---

#### Recurrence and Communication in Markov Chains

Background context: If state $i $ is positive recurrent and communicates with state$j $(denoted as$ i \leftrightarrow j $), then state$ j $must also be positive recurrent. Similarly, if state$ i $ is null recurrent and $ i \leftrightarrow j $, then state$ j$ must also be null recurrent.

:p What theorem supports the idea that recurrence properties are inherited in a Markov chain?
??x
Theorem 9.22 states: If state $i $ is positive recurrent and communicates with state$j $, then state$ j $is also positive recurrent. Similarly, if state$ i $ is null recurrent and communicates with state $ j $, then state$ j$ must be null recurrent.

This theorem ensures that the recurrence properties (positive or null) are consistent across communicating states in a Markov chain.
x??

---

#### Infinite-State Markov Chains

Background context: The discussion involves understanding the behavior of infinite-state Markov chains, specifically the symmetric random walk where each state communicates with its neighbors. This example is used to illustrate that while all states communicate and are recurrent, their mean recurrence times can differ significantly.

:p What does it mean for a chain to have communicating states?
??x
For a Markov chain, if two states $i $ and$j $ can reach each other with positive probability, they are said to be communicating. This means there is a sequence of moves that allows the system to transition from state$ i $ to state $j$, and vice versa.

In this context, all states in the symmetric random walk communicate with each other.
x??

---


#### Ergodicity and Ergodic Theorem for Markov Chains
Background context: The ergodic theory of Markov chains deals with the long-term behavior of discrete-time Markov chains (DTMCs). For a DTMC to be ergodic, it must satisfy three key properties: aperiodicity, irreducibility, and positive recurrence. These properties ensure that the chain will exhibit certain desirable behaviors over time.

For finite-state chains, positive recurrence is automatically implied by irreducibility. The Ergodic Theorem of Markov Chains states that if a DTMC meets these conditions, its limiting probabilities exist and are positive, with specific implications for the mean time between visits to each state.

:p What does it mean for a DTMC to be ergodic?
??x
An ergodic DTMC is one that has all three desirable properties: aperiodicity, irreducibility, and positive recurrence. These conditions ensure that the chain will exhibit certain behaviors over an extended period. For finite-state chains, only aperiodicity and irreducibility are necessary since positive recurrence follows from irreducibility.
x??

---

#### Limiting Probabilities in Ergodic Markov Chains
Background context: The Ergodic Theorem of Markov Chains asserts that for any ergodic DTMC, the limiting probabilities exist and are positive. Specifically, these limiting probabilities equal the reciprocal of the mean time between visits to each state.

:p What is the relationship between the limiting probability $\pi_j $ and the mean time$m_{jj}$ in an ergodic Markov chain?
??x
The limiting probability $\pi_j $ for any state$j $ in an ergodic Markov chain equals the reciprocal of the mean time$m_{jj}$ between visits to that state. This relationship is given by:
$$\pi_j = \frac{1}{m_{jj}}$$

This means that the long-term proportion of time spent in state $j $ is inversely proportional to how often the chain returns to state$j$.

For example, if the mean time between visits to a particular state is 5 steps, then:
$$\pi_j = \frac{1}{5}$$x??

---

#### Ergodic Theorem for Positive Recurrent Markov Chains
Background context: For positive recurrent and ergodic DTMCs (which imply aperiodicity and irreducibility), the limiting probabilities are not only finite but also strictly positive. This result is an extension of the basic ergodic theorem to include chains with potentially infinite states.

:p What can we infer about the limiting probabilities $\pi_j$ in a positive recurrent, ergodic Markov chain?
??x
In a positive recurrent and ergodic Markov chain, the limiting probability for each state $j $, denoted as $\pi_j$, is strictly greater than zero. This means that there is a positive probability of being in any given state over the long term.

For instance, if we have a Markov chain with states 0, 1, and 2, all being positive recurrent:
$$\pi_0 > 0, \quad \pi_1 > 0, \quad \pi_2 > 0$$x??

---

#### Null Recurrent Markov Chains
Background context: A null-recurrent chain is one where the mean time between visits to each state is infinite. Unlike positive recurrent chains, these do not have finite limiting probabilities and thus do not have a stationary distribution.

:p What are the implications of a null-recurrent Markov chain in terms of its limiting behavior?
??x
In a null-recurrent Markov chain, which is ergodic (aperiodic and irreducible), all states have zero limiting probability. This means that over an infinite time horizon, the system does not tend to spend any significant fraction of time in any particular state.

The mean return time to each state being infinite implies:
$$\lim_{n \to \infty} P^n_{ij} = 0 \quad \text{for all states } i \text{ and } j$$

Thus, there is no stationary distribution for a null-recurrent chain since the limiting probabilities sum to zero.

Example:
```java
public class NullRecurrentChain {
    public double[] getPn(int n) {
        // For large n, this should return values close to 0.
        return new double[states.length];
    }
}
```
x??

---

#### Summary Theorem for Irreducible Markov Chains
Background context: This theorem summarizes the possible behaviors of an irreducible, aperiodic DTMC. It states that such chains can either be all transient or null recurrent (with zero limiting probabilities), or they can be positive recurrent with finite and strictly positive limiting probabilities.

:p What are the key outcomes for different types of irreducible Markov chains according to Theorem 9.27?
??x
For an irreducible, aperiodic DTMC:
1. **Transient States**: All states are transient if this is the case; in such scenarios, all limiting probabilities $\pi_j = 0$, and no stationary distribution exists.
2. **Null Recurrent States**: If all states are null recurrent, the limiting probabilities $\pi_j = 0 $ for all$j$, and again, there is no stationary distribution.
3. **Positive Recurrent States**: When all states are positive recurrent, the limiting distribution (and thus the unique stationary distribution) exists with:
   $$\pi_j > 0 \quad \text{and} \quad \sum_{j=0}^{\infty} \pi_j = 1$$

Here,$\pi_j $ is equal to$1 / m_{jj}$, where $ m_{jj}$is the mean time between visits to state $ j$.

This theorem provides a clear framework for understanding the long-term behavior of irreducible Markov chains based on their recurrence type.
x??

---

