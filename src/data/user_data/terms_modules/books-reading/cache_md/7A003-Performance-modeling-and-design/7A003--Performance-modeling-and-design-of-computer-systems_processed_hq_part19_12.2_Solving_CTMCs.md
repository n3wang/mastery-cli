# High-Quality Flashcards: 7A003--Performance-modeling-and-design-of-computer-systems_processed (Part 19)

**Rating threshold:** >= 8/10

**Starting Chapter:** 12.2 Solving CTMCs

---

**Rating: 9/10**

#### Time to Next Event in CTMCs
In a Continuous-Time Markov Chain (CTMC), the time until the next event is exponentially distributed. If we are currently in state \(i\), the time until the next arrival, \(X_A\), follows an exponential distribution with parameter \(\lambda\) and the time until the next departure, \(X_D\), follows an exponential distribution with parameter \(\mu\). These events occur independently of each other.
:p What is the probability that the next event will be an arrival?
??x
The probability that the next event will be an arrival is given by the ratio of the arrival rate to the sum of the arrival and departure rates. This can be expressed as:
\[ P(X_A < X_D) = \frac{\lambda}{\lambda + \mu} \]
This formula captures the likelihood of an arrival occurring before a departure.
x??

---

#### Time Until First Event in CTMCs
In a CTMC, if we are currently in state \(i\), the time until the first event (either arrival or departure) is exponentially distributed with parameter \(\lambda + \mu\). This means that the expected time to leave the current state is:
\[ E[\tau_i] = \frac{1}{\lambda + \mu} \]
:p What is the distribution of \(\tau_i\)?
??x
The distribution of \(\tau_i\) is exponential with rate \(\lambda + \mu\). This means that the time until we leave state \(i\) follows an exponential distribution where:
\[ \tau_i \sim Exp(\lambda + \mu) \]
This indicates that the expected waiting time for either a departure or an arrival to occur from state \(i\) is \(\frac{1}{\lambda + \mu}\).
x??

---

#### Transitioning CTMC to DTMC
To solve a CTMC, we can model it using a Discrete-Time Markov Chain (DTMC) by observing the system at discrete intervals of time \(\delta\). At each step, we flip two coins: one for arrivals with probability \(\lambda \delta\) and one for departures with probability \(\mu \delta\).
:p What are the four possible outcomes when flipping the two coins?
??x
When flipping the two coins, the four possible outcomes are:
1. Arrival and no departure with probability \(\lambda \delta (1 - \mu \delta)\)
2. Departure and no arrival with probability \((1 - \lambda \delta) \mu \delta\)
3. Both an arrival and a departure with probability \(\lambda \delta \mu \delta\)
4. No arrival and no departure with probability \(1 - (\lambda \delta + \mu \delta)\)

These outcomes can be used to model the transitions in a DTMC.
x??

---

#### Solving CTMC via Limiting Probabilities
To find the limiting probabilities of being in state \(j\) for a CTMC, we can use a DTMC approximation by observing the system at small intervals \(\delta\). As \(\delta\) approaches zero, the DTMC approximates the original CTMC. The solution to the CTMC is then equivalent to solving the stationary distribution of the corresponding DTMC.
:p How do we solve for the limiting probabilities using this method?
??x
To solve for the limiting probabilities \(\pi_j\), we approximate the CTMC by a DTMC and take the limit as \(\delta\) approaches zero. The balance equations for the DTMC are:
1. For state \(i = 0\):
\[ \lambda \delta (1 - \mu \delta) \pi_0 + (1 - \lambda \delta - \mu \delta) \pi_0 = (\mu \delta + o(\delta)) \pi_1 \]
2. For state \(i > 0\):
\[ (\lambda \delta + \mu \delta) \pi_i = (\lambda \delta + o(\delta)) \pi_{i-1} + (\mu \delta + o(\delta)) \pi_{i+1} \]

Dividing by \(\delta\) and taking the limit as \(\delta \to 0\), we get:
\[ \frac{\lambda}{\lambda + \mu} \pi_0 = \pi_1 \]
\[ (\lambda + \mu) \pi_i = \lambda \pi_{i-1} + \mu \pi_{i+1} \]

Solving these equations gives the limiting probabilities.
x??

---

#### Limiting Probabilities of State Transitions
Using the balance equations derived from the DTMC approximation, we can solve for the limiting probabilities. For example, if in state \(i\), we have:
\[ \frac{\lambda}{\lambda + \mu} \pi_0 = \pi_1 \]
and for state 1:
\[ (\lambda + \mu) \pi_1 = \lambda \pi_0 + \mu \pi_2 \]

By solving these, we can find the limiting probabilities.
:p What is the formula to determine \(\pi_1\) from \(\pi_0\)?
??x
The formula to determine \(\pi_1\) from \(\pi_0\) is:
\[ \pi_1 = \frac{\lambda}{\lambda + \mu} \pi_0 \]

This relationship comes directly from the balance equation for state 0.
x??

---

#### Solving CTMCs Using Balance Equations
By approximating a CTMC with a DTMC and taking the limit as the time step \(\delta\) approaches zero, we can derive the limiting probabilities. The balance equations in the DTMC lead to:
\[ \pi_1 = \frac{\lambda}{\lambda + \mu} \pi_0 \]
and for state 2:
\[ \pi_2 = \left( \frac{\lambda}{\lambda + \mu} \right)^2 \pi_0 \]

These relationships allow us to solve the CTMC by determining the limiting probabilities.
:p What is the formula to determine \(\pi_2\) from \(\pi_0\)?
??x
The formula to determine \(\pi_2\) from \(\pi_0\) is:
\[ \pi_2 = \left( \frac{\lambda}{\lambda + \mu} \right)^2 \pi_0 \]

This relationship comes from the balance equation for state 1, which in turn depends on the balance equation for state 0.
x??

---

**Rating: 8/10**

#### Transition from CTMC to DTMC
Background context: The process of converting a Continuous-Time Markov Chain (CTMC) into a Discrete-Time Markov Chain (DTMC) involves modeling transitions over small time steps, often denoted as δ. This allows us to use the familiar balance equations for solving limiting probabilities.

:p What is the purpose of converting a CTMC to a DTMC?
??x
The purpose is to leverage the well-established methods of solving DTMCs, which can then be directly related back to the original CTMC. By modeling transitions over small time steps (δ), we approximate the continuous process with discrete steps, making it easier to solve using balance equations.
x??

---
#### Balance Equations for DTMC
Background context: The balance equations derived from the transition model of a DTMC help in finding the limiting probabilities by ensuring that the probability flow into each state equals the probability flow out of that state.

:p What are the balance equations used in solving the DTMC?
??x
The balance equations used in solving the DTMC are:
1. \(\pi_0(λ) = π_1(μ)\)
2. \(\pi_1(λ + μ) = π_0(λ) + π_2(μ)\)
3. \(\pi_2(λ + μ) = π_1(λ) + π_3(μ)\)

These equations ensure that the probability flow into each state equals the probability flow out of it, which is analogous to the balance in CTMCs.
x??

---
#### Limiting Probabilities via Balance Equations
Background context: By solving the balance equations for a DTMC derived from a CTMC, we can find the limiting probabilities. This approach works because the small time step (δ) ensures that multiple transitions within δ do not significantly affect the overall probability distribution.

:p How does the transition from a CTMC to a DTMC help in finding limiting probabilities?
??x
The transition from a CTMC to a DTMC helps in finding limiting probabilities by allowing us to use balance equations, which are derived from modeling transitions over small time steps (δ). These balance equations ensure that the probability flow into each state equals the probability flow out of it. Solving these equations gives us the limiting probabilities, which are equivalent to those found directly through the CTMC.

The key is to recognize that as δ approaches zero, the DTMC closely approximates the original CTMC.
x??

---
#### Irreducibility and Aperiodicity
Background context: For a Markov chain to have well-defined limiting probabilities, it must be both irreducible (every state can be reached from every other state) and aperiodic (the chain does not cycle through states in fixed periods). In the continuous case, aperiodicity is not an issue.

:p What are the conditions for ensuring that a DTMC derived from a CTMC has well-defined limiting probabilities?
??x
The conditions for ensuring that a DTMC derived from a CTMC has well-defined limiting probabilities include:
- Irreducibility: Every state must be reachable from every other state.
- Aperiodicity: The chain should not cycle through states in fixed periods.

In the continuous case, aperiodicity is typically assumed or easily satisfied. Therefore, we only need to check irreducibility to ensure well-defined limiting probabilities.
x??

---
#### Generalization of CTMC to DTMC
Background context: The method presented for converting a CTMC into a DTMC and solving it using balance equations can be generalized to any arbitrary CTMC. By modeling the transitions over small time steps, we can approximate the continuous process with discrete steps.

:p How does the general approach work in translating a CTMC to a DTMC?
??x
The general approach works by:
1. Starting with an arbitrary irreducible CTMC.
2. Modeling the transitions over small time steps (δ).
3. Rewriting the CTMC as a DTMC where transitions happen every δ-step.
4. Solving the balance equations for the DTMC to find the limiting probabilities, which are also the limiting probabilities of the original CTMC.

This approach leverages the familiar framework of DTMCs while approximating the continuous behavior accurately.
x??

---

**Rating: 8/10**

#### Transition to Continuous-Time Markov Chains
The text discusses how to handle continuous-time Markov chains (CTMCs) without explicitly converting them into discrete-time Markov chains (DTMCs). The focus is on deriving balance equations directly from CTMCs, which can be solved to find the limiting probabilities \( \pi_i \).

:p What does the transition to continuous-time Markov chains entail?
??x
The transition involves working with CTMCs directly by formulating and solving balance equations. This approach avoids the cumbersome process of translating a CTMC into a DTMC using small time steps (\(\delta\)). The key idea is that balance equations in CTMCs represent a direct relationship between the rates of transitions leaving and entering states.

```java
// Pseudocode for deriving balance equations
for each state j {
    // Left-hand side: Total rate of transitions leaving state j
    lhs = πj * νj;
    
    // Right-hand side: Sum of rates of transitions from other states to state j
    rhs = Σ (πi * qij);
}
```
x??

---

#### Interpreting Balance Equations for CTMCs
The balance equations in CTMCs are derived by balancing the rate at which jobs leave a state with the rate at which they enter it. The standard notation is:
\[ \pi_j \nu_j = \sum_{i} \pi_i q_{ij} \]

:p What do the left-hand side (LHS) and right-hand side (RHS) of the balance equation represent?
??x
The LHS represents the total rate of transitions leaving state \( j \), which is calculated by multiplying the limiting probability of being in state \( j \) (\( \pi_j \)) with the rate at which the Markov chain leaves state \( j \) given that it is in state \( j \) (\( \nu_j \)).

The RHS represents the total rate of transitions entering state \( j \), which sums up the products of the limiting probability of being in state \( i \) (\( \pi_i \)) and the transition rate from state \( i \) to state \( j \) given that it is in state \( i \) (\( q_{ij} \)).

```java
// Pseudocode for balance equations interpretation
for each state j {
    lhs = πj * νj;
    rhs = Σ (πi * qij);
}
```
x??

---

#### Summary Theorem for CTMCs
The summary theorem for CTMCs is analogous to the ergodicity theory for DTMCs. It states that if a CTMC is irreducible, and there exist probabilities \( \pi_i \) such that:
\[ \pi_j \nu_j = \sum_{i} \pi_i q_{ij} \]
and
\[ \sum_{i} \pi_i = 1 \]

Then the \( \pi_i \)'s are the limiting probabilities for the CTMC, and the CTMC is ergodic.

:p What does Theorem 12.6 state about the CTMC?
??x
Theorem 12.6 states that given an irreducible CTMC, if there exist probabilities \( \pi_i \) such that:
\[ \pi_j \nu_j = \sum_{i} \pi_i q_{ij} \]
and the sum of these probabilities equals one (\( \sum_{i} \pi_i = 1 \)), then the \( \pi_i \)'s are the limiting probabilities for the CTMC, and the CTMC is ergodic. This theorem effectively translates the concept of steady-state probabilities from DTMCs to CTMCs.

```java
// Pseudocode for applying Theorem 12.6
if (CTMC is irreducible) {
    find πi such that: 
        πj * νj = Σ(πi * qij)
    and
        Σ(πi) = 1
}
```
x??

---

#### Converting a CTMC to a DTMC
The text explains how to model any CTMC as a DTMC with small time steps (\(\delta\)). The goal is to draw the corresponding DTMC for a given CTMC and write out the balance equations, then take the limit as \(\delta\) approaches zero to derive the CTMC balance equations.

:p How do you convert a CTMC to a DTMC?
??x
To convert a CTMC to a DTMC, follow these steps:
1. Identify the transition rates in the CTMC.
2. Draw the state diagram of the DTMC with small time steps (\(\delta\)).
3. Write down the balance equations for the DTMC using \(\delta\)-step transitions.
4. Take the limit as \(\delta\) approaches zero to derive the CTMC balance equations.

```java
// Pseudocode for converting CTMC to DTMC and deriving balance equations
for each state j {
    // Calculate transition probabilities in the DTMC with step δ
    pji = qij * δ;
    
    // Write down balance equations using these probabilities
    πj * (νj * δ) = Σ(πi * pji);
}
// Take limit as δ -> 0 to get CTMC balance equations
```
x??

---

#### Potential Pitfall: Balance ≠ Stationary for CTMCs
The text highlights a potential pitfall where the balance equations in CTMCs yield the limiting probabilities, whereas stationary equations are meaningless until translated into a DTMC.

:p What is the difference between balance and stationary equations in CTMCs?
??x
In CTMCs, balance equations directly give the limiting probabilities. On the other hand, stationary equations (which equate the probability of being in state \( j \) with the sum of probabilities of entering state \( j \)) are meaningless without first converting the CTMC to a DTMC.

```java
// Pseudocode for writing balance and stationary equations
for each state j {
    // Balance equation
    πj * νj = Σ(πi * qij);
    
    // Stationary equation (meaningless in this context)
    πj = Σ(πi * qij);
}
```
x??

---

