# High-Quality Flashcards: 2A012---Reinforcement-Learning_processed (Part 14)


**Starting Chapter:** n-step Off-policy Learning

---


#### n-step Return for Sarsa
Background context explaining the concept. The n-step return Gt:t+n is a way to estimate the total discounted reward over n steps, combining immediate rewards and future state-action values. This method is crucial for understanding how policies can be evaluated or updated using multiple time steps of experience.

The formula for n-step return in Sarsa is:
\[ G_{t:t+n} = Q_{t+1}(S_{t+1}, A_{t+1}) + \min(t+n, T) \sum_{k=t}^{t+n-1}[R_{k+1} + \gamma Q_k(S_k, A_k)] \]

:p What is the formula for the n-step return in Sarsa?
??x
The formula for the n-step return in Sarsa combines immediate rewards and future state-action values over n steps. It starts with the next action value \(Q_{t+1}(S_{t+1}, A_{t+1})\) and adds a sum of discounted rewards from time t to t+n-1, where the discount factor \(\gamma\) is applied.
```python
# Pseudocode for calculating n-step return in Sarsa
def calculate_n_step_return(t, states, actions, rewards, Q, gamma):
    # Initialize the n-step return G
    n = len(states) - t - 1
    G = Q[states[t+1], actions[t+1]]
    
    for k in range(t + 1, min(t + n + 1, len(rewards))):
        G += (gamma ** (k - (t + 1))) * rewards[k]
        
    return G
```
x??

---


#### Expected Sarsa's n-step Return
Expected Sarsa is a variant of the Sarsa algorithm that uses an expected state value function. The key difference lies in how it handles future rewards, using a weighted average over all possible actions.

The formula for the n-step return in Expected Sarsa is:
\[ G_{t:t+n} = R_{t+1} + \cdots + R_{t+n} + \bar{V}_{t+n-1}(S_{t+n}), t + n < T, \]
where
\[ \bar{V}_{t}(s) = \sum_{a \sim \pi(a|s)} Q_{t}(s, a), \]
and if \( s \) is terminal, then its expected approximate value is 0.

:p What is the formula for the n-step return in Expected Sarsa?
??x
The formula for the n-step return in Expected Sarsa sums immediate rewards and uses an expected state value function to account for future rewards. This approach averages over all possible actions under a target policy \(\pi\), rather than considering just one action as in vanilla Sarsa.
```python
# Pseudocode for calculating expected n-step return in Expected Sarsa
def calculate_expected_n_step_return(t, states, actions, rewards, Q, gamma):
    # Initialize the n-step return G
    n = len(states) - t - 1
    G = sum(rewards[t + 1:t + n + 1])
    
    if states[t + n] not in terminal_states:
        for a in possible_actions:
            G += (gamma ** n) * Q[states[t + n], a]
        
    return G
```
x??

---


#### O-Step Learning with Importance Sampling
O-Step learning, particularly o-step Sarsa, is used when the policy being learned (\(\pi\)) differs from the behavior policy (\(b\)). This method accounts for this difference by using importance sampling to weight actions according to their relative probability under both policies.

The update formula for o-step Sarsa with importance sampling is:
\[ V_{t+n}(S_t) = V_{t+n-1}(S_t) + \alpha \cdot \theta_{t:t+n} \cdot [G_{t:t+n} - V_{t+n-1}(S_t)], \]
where
\[ \theta_{t:t+n} = \frac{\pi(A_t|S_t)}{b(A_t|S_t)}, \]
and if any action has a probability of 0 under \(\pi\), it is given zero weight.

:p What is the update formula for o-step Sarsa with importance sampling?
??x
The update formula for o-step Sarsa with importance sampling incorporates an importance sampling ratio to account for the difference between the target policy \(\pi\) and the behavior policy \(b\). This ensures that actions taken under \(b\) are weighted appropriately based on their relative probability in \(\pi\).
```java
// Pseudocode for o-step Sarsa update with importance sampling
public void updateOStepSarsa(int t, State state, Action action, double reward, ValueFunction Q, double gamma, double alpha) {
    int n = states.length - t - 1;
    
    // Calculate the importance sampling ratio
    double theta = (pi.getActionProbability(state, action)) / b.getActionProbability(state, action);
    
    if (theta == 0) return; // If any action has zero probability under pi
    
    // Calculate the target value G
    double G = reward + gamma * Q.getValue(action, state); 
    for (int i = t + 1; i < Math.min(t + n + 1, states.length); i++) {
        G += (gamma ** (i - t)) * b.getReward(i);
    }
    
    // Update the value function
    double delta = alpha * theta * (G - Q.getValue(action, state));
    Q.updateValue(action, state, delta);
}
```
x??

---


#### n-step Bootstrapping for Off-policy Sarsa
Background context: The off-policy version of \(n\)-step Expected Sarsa updates use a similar update to standard \(n\)-step Sarsa but with an adjusted importance sampling ratio. This adjustment ensures that the importance sampling only considers one less factor, specifically \( \theta_{t+1:t+n-1} \) instead of \( \theta_{t+1:t+n} \). Additionally, it uses the Expected Sarsa version of the \(n\)-step return (7.7).

:p What is the key adjustment in the off-policy \(n\)-step Expected Sarsa update?
??x
The key adjustment in the off-policy \(n\)-step Expected Sarsa update involves using a reduced importance sampling ratio, specifically \( \theta_{t+1:t+n-1} \) instead of \( \theta_{t+1:t+n} \). This is because in Expected Sarsa, all possible actions are considered in the last state, and the action taken has no effect. Thus, it does not need to be corrected for.
x??

---


#### Per-decision Methods with Control Variates
Background context: The multi-step off-policy methods presented earlier can be improved using per-decision importance sampling ideas, such as control variates introduced in Section 5.9. The ordinary \(n\)-step return (7.1) is written recursively to understand how it can be adjusted for off-policy learning.

:p How does the recursive form of the \(n\)-step return help in adjusting for off-policy learning?
??x
The recursive form of the \(n\)-step return, given by:
\[ G_{t:h} = R_{t+1} + \gamma G_{t+1:h}, \quad t < h < T, \]
where \( G_{h:h} = V_{h-1}(S_h) \), helps in understanding how the return can be adjusted for off-policy learning. By using an alternate, off-policy definition of the \(n\)-step return (7.13):
\[ G_{t:h} = \theta_t (R_{t+1} + \gamma G_{t+1:h}) + (1 - \theta_t) V_{h-1}(S_h), \]
where \(\theta_t = \frac{\pi(A_t|S_t)}{b(A_t|S_t)}\), one can avoid having a target of zero when \(\theta_t\) is zero, thereby reducing variance.

x??

---


#### Off-policy State-value Prediction Algorithm
Background context: The off-policy state-value prediction algorithm uses the modified \(n\)-step return (7.13) to adjust for importance sampling. This approach ensures that if an action has a zero probability under the target policy, its contribution is not lost entirely.

:p What is the key formula used in the off-policy state-value prediction algorithm?
??x
The key formula used in the off-policy state-value prediction algorithm is:
\[ G_{t:h} = \theta_t (R_{t+1} + \gamma G_{t+1:h}) + (1 - \theta_t) V_{h-1}(S_h), \]
where \( \theta_t = \frac{\pi(A_t|S_t)}{b(A_t|S_t)} \). This formula ensures that the importance sampling ratio is used appropriately, and if \(\theta_t\) is zero, it does not reduce the target to zero but rather keeps the original value.

x??

---


#### Off-policy Action-value Prediction Algorithm
Background context: For action values, the \(n\)-step return needs to be adjusted differently because the first action plays no role in importance sampling. The modified action-value \(n\)-step return (7.14) includes a control variate term to handle this.

:p What is the key formula used in the off-policy action-value prediction algorithm?
??x
The key formula used in the off-policy action-value prediction algorithm is:
\[ G_{t:h} = R_{t+1} + \gamma [\theta_t (G_{t+1:h} - Q_{h-1}(S_{t+1}, A_{t+1})) + V_{h-1}(S_{t+1})], \]
where \( \theta_t = \frac{\pi(A_t|S_t)}{b(A_t|S_t)} \). This formula adjusts the importance sampling ratio to account for the fact that only actions following the first action are sampled, and it includes a control variate term to manage variance.

x??

---


#### Control Variates Do Not Change Expected Value
Background context: The control variate in the \(n\)-step return (7.13) does not change the expected value of the return because the importance sampling ratio has an expected value of one and is uncorrelated with the estimate, making the overall expected value zero.

:p Why do control variates not change the expected value of the return?
??x
Control variates do not change the expected value of the return because the importance sampling ratio \(\theta_t\) has an expected value of one (Section 5.9) and is uncorrelated with the estimate \(G_{t+1:h}\). Therefore, the term involving the control variate:
\[ V_{h-1}(S_h), \]
has an expected value of zero.

x??

---


#### Off-policy Prediction Algorithm Pseudocode
Background context: The pseudocode for the off-policy state-value prediction algorithm combines the modified \(n\)-step return (7.13) with the action-value update rule (7.5).

:p Write the pseudocode for the off-policy state-value prediction algorithm.
??x
```pseudocode
function OffPolicyStateValuePredictionAlgorithm(states, actions, rewards, gamma, theta):
    for each episode in episodes:
        states = initialize_states()
        actions = initialize_actions()
        rewards = initialize_rewards()
        
        while not end_of_episode():
            t = current_time_step
            
            # Calculate n-step return
            Gt:h = calculate_n_step_return(t, h, states[t:h], actions[t+1:h], rewards[t+1:h], gamma, theta)
            
            # Update state values
            for s in states:
                V(s) += alpha * (Gt:h - V(s))
```

x??

---


#### Programming Exercise: Comparing Off-policy and On-policy Algorithms
Background context: The exercise involves devising a small off-policy prediction problem to show that the off-policy learning algorithm using \(n\)-step TD update is more data-efficient than a simpler on-policy algorithm.

:p Write pseudocode for comparing off-policy and on-policy algorithms.
??x
```pseudocode
function compare_off_on_policy_algorithms(states, actions, rewards, gamma, theta, alpha):
    # Off-policy algorithm with n-step TD update (7.2)
    off_policy_algorithm = OffPolicyStateValuePredictionAlgorithm(states, actions, rewards, gamma, theta)
    
    # On-policy algorithm with simpler step size (7.9)
    on_policy_algorithm = OnPolicyStateValuePredictionAlgorithm(states, actions, rewards, gamma, alpha)
    
    for each episode in episodes:
        states_off = initialize_states()
        actions_off = initialize_actions()
        rewards_off = initialize_rewards()
        
        states_on = initialize_states()
        actions_on = initialize_actions()
        rewards_on = initialize_rewards()
        
        while not end_of_episode():
            t = current_time_step
            
            # Off-policy update
            Gt:h = calculate_n_step_return(t, h, states_off[t:h], actions_off[t+1:h], rewards_off[t+1:h], gamma, theta)
            V_off(s) += alpha * (Gt:h - V_off(s))
            
            # On-policy update
            Gt:t+1 = calculate_1_step_return(t, t+1, states_on[t:t+1], actions_on[t+1:t+2], rewards_on[t+1:t+2], gamma)
            V_on(s) += alpha * (Gt:t+1 - V_on(s))
    
    # Compare the number of samples required for convergence
```

x??

---

---


#### 3-Step Tree Backup Update

Tree-backup is an off-policy learning method that performs updates without using importance sampling. It builds on the idea of backup diagrams but extends them to consider all possible actions and their probabilities under a target policy.

The central part of this algorithm involves updating action values based on a "tree" structure, where each node represents a state-action pair, and branches represent unselected actions. The updates are weighted by the probability of these actions occurring according to the target policy.

:p What is the main idea behind the 3-step tree-backup update?
??x
The main idea is to perform value updates based on an entire "tree" structure of possible future actions and their probabilities, rather than focusing only on the selected action. This method extends backup diagrams by considering all actions at each state, weighted by their probability under the target policy.
x??

---


#### n-Step Tree Backup Algorithm

The n-step tree-backup algorithm is a generalization of the 3-step tree-backup update to handle any number of steps \( n \). It updates the estimated action values using a return that considers all possible actions and their probabilities, rather than just those taken.

The formula for the target value (n-step tree-backup return) involves summing rewards and discounted future state-action values weighted by policy probabilities:

\[ G_{t:t+n} = R_{t+1} + \sum_{a' \neq A_{t+1}} \pi(a'|S_{t+1})Q_{t+n-1}(S_{t+1}, a') + \pi(A_{t+1}|S_{t+1})G_{t+1:t+n} \]

:p How is the target value for an n-step tree-backup update defined?
??x
The target value \( G_{t:t+n} \) for an n-step tree-backup update is defined as:

\[ G_{t:t+n} = R_{t+1} + \sum_{a' \neq A_{t+1}} \pi(a'|S_{t+1})Q_{t+n-1}(S_{t+1}, a') + \pi(A_{t+1}|S_{t+1})G_{t+1:t+n} \]

This formula includes the immediate reward \( R_{t+1} \), the discounted future rewards and state-action values for unselected actions, and the value of the selected action weighted by its probability under the target policy.
x??

---


#### Pseudocode for n-Step Tree Backup

The pseudocode for the n-step tree-backup algorithm is as follows. It iterates through time steps \( t \) up to \( T - 1 \), calculating and updating the estimated action values based on the defined targets.

:p Provide the pseudocode for the n-step tree-backup algorithm.
??x
```java
for (t = 0; t < T - 1; t++) {
    int n = Math.min(T - t, MAX_STEPS);
    
    double G = R[t + 1];
    if (n > 1) {
        for (int k = 2; k <= n; k++) {
            Action action = A[t + k - 1];
            State state = S[t + k - 1];
            double value = Q[state, action];
            G += discountFactor^k * V[state] - Q[state, action];
        }
    }
    
    double target = R[t + 1] + 
                    sumOverActions(a != A[t+1]) [pi(a|S[t+1]) * Q[S[t+1], a]] +
                    pi(A[t+1]|S[t+1]) * G;
    
    Q[S[t], A[t]] += alpha * (target - Q[S[t], A[t]]);
}
```

This pseudocode iterates through each time step \( t \), calculates the target value \( G \) using the n-step tree-backup formula, and updates the action-value function \( Q \).
x??

---


#### Off-Policy Learning Without Importance Sampling

The 3-step tree backup update is a specific case of an off-policy learning method that does not rely on importance sampling. It uses policy probabilities to weight unselected actions in the target value.

:p Why is 3-step tree backup considered an off-policy learning algorithm?
??x
3-step tree backup is considered an off-policy learning algorithm because it updates action values based on a different (target) policy rather than the behavior policy used to generate the data. This means that while the updates are guided by the target policy, they use samples from a potentially different behavior policy.

In this method, unselected actions' values are weighted according to their probabilities under the target policy, which allows for off-policy learning without directly using importance sampling.
x??

---


#### n-Step Tree Backup Update Details

The update rule for an n-step tree-backup algorithm involves incorporating all possible future rewards and state-action pairs into the target value. This approach extends the idea of a backup diagram by considering all actions at each step, weighted by their probabilities under the target policy.

:p How does the n-step tree-backup update handle unselected actions in its target?
??x
The n-step tree-backup update handles unselected actions in its target by incorporating them into the value estimate. Each unselected action \( a' \) at state \( S_{t+1} \) contributes to the target with a weight proportional to its probability under the target policy \( \pi(a'|S_{t+1}) \). Specifically, for each unselected action:

\[ G_{t:t+n} = R_{t+1} + \sum_{a' \neq A_{t+1}} \pi(a'|S_{t+1})Q_{t+n-1}(S_{t+1}, a') + \pi(A_{t+1}|S_{t+1})G_{t+1:t+n} \]

This ensures that the update considers not only the selected action but also all other possible actions and their probabilities, providing a more comprehensive view of the expected future rewards.
x??

---

---

