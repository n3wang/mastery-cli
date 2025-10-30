# High-Quality Flashcards: 2A012---Reinforcement-Learning_processed (Part 14)

**Rating threshold:** >= 8/10

**Starting Chapter:** n-step Off-policy Learning

---

**Rating: 8/10**

#### n-step Bootstrapping Formula for Sarsa
Sarsa is an on-policy temporal difference (TD) learning method that updates action-value estimates using a single step of experience. The n-step return for Sarsa can be written exactly in terms of a novel TD error, as shown below:
\[ G_{t:t+n} = Q_t(S_t, A_t) + \min(n+1, T-t-1)\sum_{k=t}^{t+n-1} \left[R_{k+1} + \gamma^k\left( Q_k(S_{k+1}, A_{k+1}) - Q_{t-1}(S_t, A_t) \right) \right] \]
:p What is the n-step return formula for Sarsa?
??x
The n-step return \( G_{t:t+n} \) in Sarsa can be computed as:
\[ G_{t:t+n} = Q_t(S_t, A_t) + \min(n+1, T-t-1)\sum_{k=t}^{t+n-1} \left[R_{k+1} + \gamma^k\left( Q_k(S_{k+1}, A_{k+1}) - Q_{t-1}(S_t, A_t) \right) \right] \]
This formula takes into account the immediate rewards and discounted future rewards up to \( n \) steps ahead. It uses the current action-value estimate at time \( t \), and updates it based on the actual returns observed over the next \( n \) steps.
x??

---

#### Expected Sarsa n-step Return
Expected Sarsa is a variant of Sarsa that incorporates exploration by considering all possible actions from the future state. The n-step return for Expected Sarsa can be defined as:
\[ G_{t:t+n} = R_{t+1} + \sum_{k=2}^{n} \gamma^k R_{t+k} + \bar{V}_{t+n-1}(S_{t+n}) \]
where \( \bar{V}_{t+n-1}(S) \) is the expected approximate value of state \( S \), given by:
\[ \bar{V}_{t+n-1}(S) = \sum_{a} \pi(a|S) Q_{t+n-1}(S, a) \]
:p What is the n-step return formula for Expected Sarsa?
??x
The n-step return \( G_{t:t+n} \) in Expected Sarsa can be computed as:
\[ G_{t:t+n} = R_{t+1} + \sum_{k=2}^{n} \gamma^k R_{t+k} + \bar{V}_{t+n-1}(S_{t+n}) \]
where \( \bar{V}_{t+n-1}(S) \) is the expected approximate value of state \( S \), given by:
\[ \bar{V}_{t+n-1}(S) = \sum_{a} \pi(a|S) Q_{t+n-1}(S, a) \]
This formula incorporates the average action values over all possible actions under the target policy.
x??

---

#### n-step Off-policy Learning
Off-policy learning in reinforcement learning refers to learning the value function for one policy while following another policy. In n-step methods, returns are constructed over \( n \) steps and adjusted based on the relative probability of taking those actions. The importance sampling ratio is used to weight the return.
The update rule for off-policy n-step Sarsa can be written as:
\[ V_{t+n}(S_t) = V_{t+n-1}(S_t) + \alpha \cdot \frac{P(S_0, A_0; \pi)}{P(S_0, A_0; b)} [G_{t:t+n} - V_{t+n-1}(S_t)] \]
where \( P(S_0, A_0; \pi) \) is the probability of taking action \( A_0 \) in state \( S_0 \) under policy \( \pi \), and \( P(S_0, A_0; b) \) is the same for behavior policy \( b \).
:p What is the update rule for off-policy n-step Sarsa?
??x
The update rule for off-policy n-step Sarsa can be written as:
\[ V_{t+n}(S_t) = V_{t+n-1}(S_t) + \alpha \cdot \frac{P(S_0, A_0; \pi)}{P(S_0, A_0; b)} [G_{t:t+n} - V_{t+n-1}(S_t)] \]
where \( P(S_0, A_0; \pi) \) is the probability of taking action \( A_0 \) in state \( S_0 \) under policy \( \pi \), and \( P(S_0, A_0; b) \) is the same for behavior policy \( b \). This formula adjusts the value based on the importance sampling ratio to account for the difference between the target and behavior policies.
x??

---

#### n-step Off-policy Sarsa Algorithm
The pseudocode for off-policy n-step Sarsa includes an importance sampling ratio to weight returns. The algorithm updates action-value estimates by considering both the actual return and the target policy's expected value.
:p What is the pseudocode for off-policy n-step Sarsa?
??x
```pseudocode
// Off-policy n-step Sarsa Algorithm

Input: behavior policy b, target policy π, step size α, positive integer n
Initialize Q(s, a) arbitrarily, for all s ∈ S, a ∈ A
Initialize π to be greedy with respect to Q or as a fixed policy
Algorithm parameters: step size α ∈ (0, 1], a positive integer n

Loop for each episode:
    Initialize and store S₀ ≠ terminal
    Select and store an action A₀ ∼ b(·|S₀)
    T = 1
    Loop for t=0,1,...:
        If t < T, then: 
            Take action A_t
            Observe and store the next reward as R_{t+1} and the next state as S_{t+1}
            If S_{t+1} is terminal, then end this episode; else continue.
            Select and store an action A_{t+1} ∼ b(·|S_{t+1})
            If t + n < T, then: 
                G = R_{t+1} + γ^n * Q(S_{t+n}, A_{t+n}) - Q(S_t, A_t)
                V_t+n(S_t) = V_{t+n-1}(S_t) + α * [G - V_{t+n-1}(S_t)]
        If π is being learned, ensure that π(·|S_t) is greedy w.r.t. Q
Until T = T-1
```
This pseudocode outlines the steps for updating action values using off-policy n-step Sarsa while adjusting for the difference between target and behavior policies through importance sampling.
x??

**Rating: 8/10**

#### n-step Q(λ) Algorithm Overview
The algorithm unifies three different kinds of action-value algorithms: n-step Sarsa, n-step Tree Backup, and n-step Expected Sarsa. It allows for a continuous variation between sampling (as in Sarsa) and expectation (as in tree-backup). This is achieved by introducing a parameter λ that controls the degree of sampling on each step.

:p What is the n-step Q(λ) algorithm designed to unify?
??x
The n-step Q(λ) algorithm unifies three different action-value algorithms: n-step Sarsa, n-step Tree Backup, and n-step Expected Sarsa. It allows for a smooth transition between fully sampling actions (as in Sarsa) and considering the expectation over all possible actions (as in tree-backup). The parameter λ controls this balance.

---
#### Step-by-Step Implementation of n-step Q(λ)
The algorithm uses the n-step return formula to update action values. For each step t, it decides whether to sample or use expectations based on λ.

:p How does the n-step Q(λ) algorithm handle sampling and expectation?
??x
In n-step Q(λ), at each step \(t\), a decision is made between sampling an action (as in Sarsa) and considering the expected value over all actions. This decision is controlled by the parameter λ, which ranges from 0 to 1. If \(\lambda = 1\), it fully samples the action; if \(\lambda = 0\), it only considers the expected value.

The n-step return for Q(λ) can be written as:
\[ G_{t:h} = R_{t+1} + \lambda \left[ \theta_t (G_{t+1:h} - Q_{h-1}(S_{t+1}, A_{t+1})) + (1 - \theta_t) \bar{V}_{h-1}(S_{t+1}) \right] \]
where \( \theta_t = 1 \) if a sample is taken, and \( \theta_t = 0 \) otherwise. The term \(\bar{V}_{h-1}(S_{t+1})\) represents the expected value.

Example pseudocode for updating Q(λ):
```python
for t in range(T-2, -1, -1): # T is the terminal state
    if random() < λ:  # Decide to sample or not based on λ
        action = choose_action(S[t+1])  # Sample an action
        G[t] = R[t+1] + (G[t+1] if t < T-2 else 0) - Q[S[t], A[t]]
    else:
        G[t] = R[t+1] + λ * expected_value(S[t+1])  # Use expectation

Q[S[τ], A[τ]] += α * (G[τ] - Q[S[τ], A[τ]])
```

x??

---
#### n-step Tree Backup Algorithm
The tree-backup algorithm updates the value of a state-action pair by considering all possible actions at each step. It does not sample action values but uses the expected value directly.

:p How is the tree-backup algorithm different from Sarsa in terms of updating Q-values?
??x
Unlike Sarsa, which samples an action and follows it to get the return, the tree-backup algorithm considers all possible actions at each step. It updates the state-action value by summing up expected values for all actions and states encountered during a trajectory.

The n-step tree backup update can be written as:
\[ G_{t:h} = R_{t+1} + \lambda \left[ \theta_t (G_{t+1:h} - Q_{h-1}(S_{t+1}, A_{t+1})) + (1 - \theta_t) \bar{V}_{h-1}(S_{t+1}) \right] \]
where for tree-backup, the term involving \( G_{t+1:h} \) is not present since it doesn't sample an action. The update simplifies to:
\[ Q(S_t, A_t) = Q(S_t, A_t) + \alpha [R_{t+1} + \lambda \bar{V}(S_{t+1}) - Q(S_t, A_t)] \]

x??

---
#### n-step Sarsa Algorithm
n-step Sarsa updates the value of a state-action pair based on the actual action taken. It follows the chosen action to get the return and uses this information to update the Q-value.

:p How does n-step Sarsa differ from tree-backup in its approach to updating Q-values?
??x
n-step Sarsa differs from tree-backup by sampling actions as they are taken during the episode. For each step, it updates the state-action value based on the actual action chosen and follows this action to get the return.

The update for n-step Sarsa can be written as:
\[ Q(S_t, A_t) = Q(S_t, A_t) + \alpha [R_{t+1} + \lambda (G_{t+1:h} - Q_{h-1}(S_{t+1}, A_{t+1}))] \]
where \( G_{t+1:h} \) is the n-step return from step \( t+1 \).

Example pseudocode for updating n-step Sarsa:
```python
for t in range(T-2, -1, -1):
    action = choose_action(S[t+1])
    G[t] = R[t+1] + (G[t+1] if t < T-2 else 0) - Q[S[t], A[t]]
Q[S[τ], A[τ]] += α * G[τ]
```

x??

---
#### n-step Expected Sarsa Algorithm
Expected Sarsa updates the value of a state-action pair by considering all possible actions and their probabilities. It is similar to tree-backup but takes an expectation over all possible actions.

:p How does expected Sarsa differ from n-step Sarsa in terms of action selection?
??x
In expected Sarsa, instead of sampling a single action as in n-step Sarsa, it considers the expected value over all possible actions. The update equation for expected Sarsa includes a summation over all possible actions with their probabilities.

The update can be written as:
\[ Q(S_t, A_t) = Q(S_t, A_t) + \alpha [R_{t+1} + \lambda (G_{t+1:h} - \sum_a \pi(a|S_{t+1}) Q_{h-1}(S_{t+1}, a))] \]

x??

---
#### n-step Bootstrapping and Tree Backup
n-step tree backup updates the value of a state-action pair by considering all possible actions at each step. It does not sample action values but uses the expected value directly.

:p What is the key difference between n-step tree backup and n-step Sarsa in their approach to updating Q-values?
??x
The key difference lies in how they handle action selection during updates:
- **Tree Backup**: Uses a fixed policy (often \(\pi\)) to determine actions at each step without sampling. It sums the expected values of all possible actions.
- **Sarsa**: Samples an actual action taken during the episode and follows it to get the return.

Example pseudocode for tree-backup update:
```python
for t in range(T-2, -1, -1):
    G[t] = R[t+1] + λ * expected_value(S[t+1])  # No sampling, uses expected value directly
Q[S[τ], A[τ]] += α * (G[τ] - Q[S[τ], A[τ]])
```

x??

---

**Rating: 8/10**

#### Models and Planning
Background context: In reinforcement learning, a model of the environment is used to predict its response to actions. This can be either a distribution model that provides all possible outcomes with their probabilities or a sample model that randomly samples one outcome according to these probabilities.

:p What are the two types of models discussed in the chapter?
??x
- Distribution models: These produce a description of all possibilities and their probabilities.
- Sample models: These provide just one possibility, sampled according to the probabilities.
x??

---
#### Planning as a Search Through State Space
Background context: State-space planning involves searching through states for an optimal policy or path to a goal. Actions cause transitions from state to state, and value functions are computed over these states.

:p How does state-space planning differ from plan-space planning?
??x
- State-space planning: It searches the state space for an optimal policy or path.
- Plan-space planning: It searches the space of plans where operators transform one plan into another. However, this method is not extensively covered in the chapter due to its difficulty in application to stochastic sequential decision problems.
x??

---
#### Dynamic Programming and Value Functions
Background context: Dynamic programming methods use value functions as a key intermediate step towards improving policies. These values are computed by applying backup operations (or updates) to simulated experience.

:p What is the common structure shared by all state-space planning methods according to the chapter?
??x
All state-space planning methods involve:
1. Computing value functions as an intermediate step.
2. Using these value functions to update policies through backups or updates applied to simulated experience.
The common structure can be diagrammed as follows: values -> backups -> models -> simulated experience -> policy -> updates -> backups.
x??

---
#### Monte Carlo and Temporal-Difference Methods
Background context: The chapter discusses the integration of model-based methods (dynamic programming) with model-free methods (Monte Carlo, temporal-difference). Earlier chapters presented these separately but now focus on how they can be unified.

:p How are Monte Carlo and temporal-difference methods typically described in earlier parts of the book?
??x
In earlier parts, Monte Carlo and temporal-difference methods were presented as distinct alternatives. The chapter aims to unify them using n-step methods.
x??

---
#### Unifying Model-Based and Model-Free Methods
Background context: The goal is to integrate model-based methods (which rely on planning) with model-free methods (which primarily rely on learning). Both types of methods compute value functions, but they do so in different ways.

:p What are the two primary components that distinguish model-based from model-free reinforcement learning methods?
??x
- Model-based: Rely heavily on planning.
- Model-free: Primarily rely on learning.
Both methods involve computing value functions and using backups or updates to update these values based on simulated experience.
x??

---
#### Simulation of Experience Using Models
Background context: Models can be used to simulate the environment. A sample model produces a single transition, while a distribution model provides all possible transitions weighted by their probabilities.

:p How do models produce simulated experience?
??x
- Sample Model: Produces one possible state and reward based on the probability distribution.
- Distribution Model: Provides all possible states and rewards along with their probabilities of occurrence.
This is done to mimic or simulate actual environment interactions, which can be used for planning and learning.
x??

---
#### Planning in Artificial Intelligence
Background context: There are two approaches to planning in AI: state-space planning and plan-space planning. The chapter focuses on state-space planning.

:p What is the difference between state-space planning and plan-space planning?
??x
- State-Space Planning: Search through states for an optimal policy or path.
- Plan-Space Planning: Search through plans, where operators transform one plan into another. It includes methods like evolutionary algorithms and partial-order planning.
The chapter does not delve deeply into plan-space planning due to its complexity in handling stochastic decision problems.
x??

---

