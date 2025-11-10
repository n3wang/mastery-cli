# High-Quality Flashcards: 2A012---Reinforcement-Learning_processed (Part 23)


**Starting Chapter:** On-policy Control with Approximation. Episodic Semi-gradient Control

---


#### Episodic Semi-gradient Control
Background context explaining the extension of semi-gradient prediction methods to action values. The update target \(U_t\) can be any approximation of \(q_\pi(S_t, A_t)\), including backed-up values such as Monte Carlo return or n-step Sarsa returns.
:p What is the general gradient-descent update for action-value prediction?
??x
The general gradient-descent update for action-value prediction is given by:
\[ w_{t+1} = w_t + \alpha \left[ U_t - \hat{q}(S_t, A_t, w_t) \right] \nabla_w \hat{q}(S_t, A_t, w_t). \]
For the one-step Sarsa method:
\[ w_{t+1} = w_t + \alpha \left[ R_{t+1} + \hat{q}(S_{t+1}, A_{t+1}, w_t) - \hat{q}(S_t, A_t, w_t) \right] \nabla_w \hat{q}(S_t, A_t, w_t). \]
This update rule is used to adjust the weights \(w\) of the action-value function approximation.
x??

---


#### Episodic Semi-gradient Sarsa for Estimating \(\hat{q}^\pi\)
Background context explaining how this method extends the ideas from state values to action values. It uses techniques like "epsilon-greedy" for action selection and policy improvement in the on-policy case.
:p What is the pseudocode for the complete algorithm of Episodic Semi-gradient Sarsa?
??x
```pseudocode
Episodic Semi-gradient Sarsa for Estimating \(\hat{q}^\pi\)
Input: A differentiable action-value function parameterization \(\hat{q}\): \(S \times A \times \mathbb{R}^d \to \mathbb{R}\).
Algorithm parameters: step size \(\alpha > 0\), small \(\epsilon > 0\).

Initialize value-function weights \(w \in \mathbb{R}^d\) arbitrarily (e.g., \(w = 0\)).

Loop for each episode:
- Initialize state and action of the episode using \(\epsilon\)-greedy policy.
- Loop for each step in the episode:
  - Take action, observe reward and next state.
  - If next state is terminal, update weights as: 
    \( w \leftarrow w + \alpha (r - \hat{q}(s, a, w)) \nabla_w \hat{q}(s, a, w) \).
  - Choose action based on the updated function approximation using \(\epsilon\)-greedy.
  - Update weights:
    \( w \leftarrow w + \alpha (r + \max_a \hat{q}(s', a, w) - \hat{q}(s, a, w)) \nabla_w \hat{q}(s, a, w) \).
  - Set current state to next state and action.
```
x??

---


#### Mountain Car Task
Background context explaining the challenge of moving an underpowered car up a mountain road. The task involves understanding when actions need to be reversed before they can achieve the goal.
:p What is the objective in the Mountain Car task?
??x
The objective in the Mountain Car task is to drive an underpowered car up a steep mountain road, where gravity makes it challenging for the car to accelerate directly towards the top. The only solution involves first moving away from the goal and up the opposite slope on the left, building enough inertia to carry the car back up the steep slope.
x??

---


#### Function Approximation in Mountain Car Task
Background context explaining how continuous state-action space is handled using grid-tiling for feature extraction and linear combination with parameters \(w\).
:p How are the two continuous state variables (position and velocity) converted to binary features?
??x
The two continuous state variables, position \(x_t\) and velocity \(\dot{x}_t\), are converted to binary features using 8 grid-tilings. Each tile covers 1/8th of the bounded distance in each dimension, with asymmetrical offsets as described in Section 9.5.4.
The feature vectors \(x(s, a)\) created by tile coding are then combined linearly with the parameter vector to approximate the action-value function:
\[ \hat{q}(s, a, w) = \sum_{i=1}^{d} w_i \cdot x_i(s, a), \]
where each pair of state \(s\) and action \(a\) has its corresponding feature vectors.
x??

---


#### Learning Curves for Semi-gradient Sarsa
Background context explaining the performance evaluation through learning curves. The example provided shows the negative cost-to-go function learned during one run.
:p What does Figure 10.2 illustrate?
??x
Figure 10.2 illustrates several learning curves for semi-gradient Sarsa on the Mountain Car task, with different step sizes \(\alpha\). It shows how the performance of the algorithm changes over episodes with varying step size parameters.
x??

---

---


#### n-step Return Definition
In reinforcement learning, the goal is to estimate the value function or action-value function using function approximation. The n-step return generalizes the idea of an n-step return from its tabular form (7.4) to a function approximation form.

The formula for the n-step return is:
\[ G_{t:t+n} = R_{t+1} + \gamma R_{t+2} + \cdots + \gamma^{n-1} R_{t+n} + \gamma^n \hat{q}(S_{t+n}, A_{t+n}, w_{t+n}) \]
where \( 0 \leq t < T \) and \( G_{t:t+n} = G_t \) if \( t+n = T \).

:p What is the formula for the n-step return in function approximation?
??x
The formula for the n-step return is given by:
\[ G_{t:t+n} = R_{t+1} + \gamma R_{t+2} + \cdots + \gamma^{n-1} R_{t+n} + \gamma^n \hat{q}(S_{t+n}, A_{t+n}, w_{t+n}) \]
where \( G_t \) is the n-step return at time step \( t \), and \( \hat{q} \) represents the action-value function approximated by a parameterized model. If \( t+n = T \) (i.e., the episode ends within the next \( n \) steps), then \( G_{t:t+n} = G_t \).

x??

---


#### Semi-gradient n-step Sarsa Update Equation
The update equation for semi-gradient n-step Sarsa is derived by using an n-step return as the target in the semi-gradient Sarsa update. The formula is:

\[ w_{t+n} = w_{t+n-1} + \alpha [G_{t:t+n} - \hat{q}(S_t, A_t, w_{t+n-1})] \nabla_w \hat{q}(S_t, A_t, w_{t+n-1}) \]

where \( G_{t:t+n} \) is the n-step return from time step \( t \), and \( \alpha \) is the learning rate.

:p What is the update equation for semi-gradient n-step Sarsa?
??x
The update equation for semi-gradient n-step Sarsa is:
\[ w_{t+n} = w_{t+n-1} + \alpha [G_{t:t+n} - \hat{q}(S_t, A_t, w_{t+n-1})] \nabla_w \hat{q}(S_t, A_t, w_{t+n-1}) \]

This equation uses the n-step return \( G_{t:t+n} \) as the target to update the parameters of the action-value function approximator. The learning rate is denoted by \( \alpha \), and it adjusts the step size in the direction of the gradient.

x??

---


#### Episodic Semi-gradient n-step Sarsa Algorithm
The episodic semi-gradient n-step Sarsa algorithm iterates over episodes to estimate the action-value function using a differentiable parameterization. The algorithm uses bootstrapping with an intermediate level of \( n \) larger than 1 for better performance.

:p What are the key steps in the Episodic Semi-gradient n-step Sarsa algorithm?
??x
The key steps in the Episodic Semi-gradient n-step Sarsa algorithm are:

1. Initialize value-function weights \( w \in \mathbb{R}^d \) arbitrarily (e.g., \( w = 0 \)).
2. For each episode:
   - Initialize and store \( S_0 \).
   - Select and store an action \( A_0 \sim \pi(\cdot|S_0) \) or \( \epsilon\)-greedy with respect to \( \hat{q}(S_0, \cdot, w) \).
3. For each time step \( t = 0, 1, 2, ... \):
   - Take action \( A_t \).
   - Observe and store the next reward as \( R_{t+1} \) and the next state as \( S_{t+1} \).
   - If \( S_{t+1} \) is terminal:
     - End episode.
   - Else, select and store \( A_{t+1} \sim \pi(\cdot|S_{t+1}) \) or \( \epsilon\)-greedy with respect to \( \hat{q}(S_{t+1}, \cdot, w) \).
4. Determine the time whose estimate is being updated: \( \tau = \min(t+n, T-1) \). If \( \tau < 0 \), then:
   - Calculate the n-step return: \( G_{\tau:\tau+n} = \sum_{i=\tau+1}^{\min(\tau+n,T)} \gamma^{i-\tau-1} R_i + \gamma^n \hat{q}(S_{\tau+n}, A_{\tau+n}, w) \).
   - Update the weights: \( w \leftarrow w + \alpha [G_{\tau:\tau+n} - \hat{q}(S_\tau, A_\tau, w)] \nabla_w \hat{q}(S_\tau, A_\tau, w) \).

x??

---


#### Parameters' Effects on Learning Rate
The effects of learning rate \( \alpha \) and \( n \) on the early performance of semi-gradient n-step Sarsa with tile-coding function approximation were studied. The results indicated that an intermediate level of bootstrapping (e.g., \( n = 4 \)) performed best.

:p What did the study reveal about the effects of learning rate \( \alpha \) and \( n \) on early performance?
??x
The study revealed that the choice of \( \alpha \) and \( n \) had significant effects on the early performance of semi-gradient n-step Sarsa with tile-coding function approximation. Specifically, an intermediate level of bootstrapping (e.g., \( n = 4 \)) generally outperformed other values.

The results showed that higher standard errors were observed at large \( n \) compared to small \( n \). This is likely because larger \( n \) values could introduce more variance in the estimates, making it harder for the algorithm to converge to a good solution early on.

x??

---


#### Monte Carlo Methods and Their Absence
Monte Carlo methods are not explicitly covered or given pseudocode in this chapter. However, they can be derived from similar principles by using full episodes as returns rather than n-step returns.

:p Why is it reasonable not to give pseudocode for Monte Carlo methods?
??x
It is reasonable not to provide explicit pseudocode for Monte Carlo methods because the basic idea of Monte Carlo methods is more straightforward and less complex compared to semi-gradient n-step Sarsa. Monte Carlo methods typically involve using full episodes as returns, which can be directly derived from the principles discussed in this chapter without the need for additional complexity.

:p How would Monte Carlo methods perform on the Mountain Car task?
??x
Monte Carlo methods would likely perform well on the Mountain Car task because they use entire episodes to update the value function. This approach can provide more stable estimates of the action-value function, especially when combined with function approximation techniques. However, Monte Carlo methods may require a larger number of samples (episodes) before converging compared to n-step Sarsa.

x??

---


#### Semi-gradient One-step Expected Sarsa Pseudocode
Semi-gradient one-step Expected Sarsa is similar to the n-step version but uses only one step for bootstrapping. The pseudocode for this algorithm can be derived from the general semi-gradient framework.

:p Give pseudocode for semi-gradient one-step Expected Sarsa.
??x
Here is the pseudocode for semi-gradient one-step Expected Sarsa:

```java
// Initialize value-function weights w arbitrarily (e.g., w = 0)
Episodic Semi-gradient One-step Expected Sarsa {
    Input: a differentiable action-value function parameterization q:S x A -> R^d, policy π
    Algorithm parameters: step size α > 0, small ε > 0
    
    Initialize value-function weights w ∈ R^d arbitrarily (e.g., w = 0)
    
    for each episode {
        Initialize and store S_0
        Select and store an action A_0 ∼ π(·|S_0) or ε-greedy with respect to q(S_0, ·, w)
        
        for t = 0, 1, 2, ... {
            Take action A_t
            Observe and store the next reward as R_{t+1} and the next state as S_{t+1}
            
            if S_{t+1} is terminal then end episode
            
            else select and store A_{t+1} ∼ π(·|S_{t+1}) or ε-greedy with respect to q(S_{t+1}, ·, w)
            
            // Update the weights
            τ = t + 1 if (t < T - 1) else T - 1
            G_t = R_{t+1} + α[ε(∑_a π(a|S_t)q(S_t, a, w) - q(S_t, A_t, w)) + γε(∑_a π(a|S_{t+1})q(S_{t+1}, a, w) - q(S_t, A_t, w))]
            w ← w + α[G_t - q(S_t, A_t, w)] ∇w q(S_t, A_t, w)
        }
    }
}
```

x??

---


#### Average Reward Setting Overview
In the context of Markov Decision Problems (MDPs), we introduce a third setting for formulating the goal—alongside episodic and discounted settings. This setting focuses on continuing tasks, where interactions between the agent and environment never terminate or have a start state. Unlike the discounted setting, which involves discounting future rewards, average reward disregards this concept and treats all time steps equally. The quality of a policy \( \pi \) is defined as its long-term average rate of reward.

:p What does the average-reward setting aim to achieve in MDPs?
??x
The average-reward setting aims to define policies based on their long-term average rate of reward without discounting future rewards, making it suitable for tasks that continue indefinitely. It focuses on steady-state performance rather than terminal states or discounted returns.
x??

---


#### Steady-State Distribution Definition
In the context of MDPs within the average-reward setting, a policy \( \pi \) is associated with a steady-state distribution \( \mu_\pi \), which represents the long-term probability distribution over states under that policy. Mathematically, it can be expressed as:

\[
\mu_\pi(s) = \lim_{t \to \infty} P(S_t = s | A_0:A_{t-1} \sim \pi)
\]

:p How is the steady-state distribution defined in the average-reward setting?
??x
The steady-state distribution \( \mu_\pi(s) \) in the average-reward setting is the long-term probability of being in state \( s \) given that actions are chosen according to policy \( \pi \). It means that, over time, the probability of being in any particular state becomes stable and independent of where or how the MDP started.
x??

---


#### Average Reward Calculation
The average reward \( r(\pi) \) for a policy \( \pi \) is defined as:

\[
r(\pi) = \lim_{t \to \infty} E[R_t | S_0, A_0:A_{t-1} \sim \pi]
\]

:p What is the formula for calculating average reward in the average-reward setting?
??x
The average reward \( r(\pi) \) for a policy \( \pi \) is calculated as:

\[
r(\pi) = \lim_{t \to \infty} E[R_t | S_0, A_0:A_{t-1} \sim \pi]
\]

This means the average reward is the long-term expected reward per time step under policy \( \pi \), considering the initial state and actions taken according to \( \pi \).
x??

---


#### Bellman Equation for Differential Value Functions
In the average-reward setting, differential value functions have their own set of Bellman equations. The state-value function is defined as:

\[
v_\pi(s) = E_\pi[G_t | S_t = s]
\]

The action-value function (Q-function) is defined similarly:

\[
q_\pi(s, a) = E_\pi[G_t | S_t = s, A_t = a]
\]

These functions are related to the average reward and have their own Bellman equations.

:p What are the definitions of state-value and action-value functions in the context of differential value functions?
??x
In the context of differential value functions within the average-reward setting, the state-value function \( v_\pi(s) \) is defined as:

\[
v_\pi(s) = E_\pi[G_t | S_t = s]
\]

And the action-value function (Q-function) \( q_\pi(s, a) \) is defined as:

\[
q_\pi(s, a) = E_\pi[G_t | S_t = s, A_t = a]
\]

These functions are crucial for evaluating policies based on their long-term average rewards.
x??

---


#### Differential Return Definition
In the average-reward setting, returns are defined in terms of differences between rewards and the average reward:

\[
G_t = R_{t+1} - r(\pi) + R_{t+2} - r(\pi) + \cdots
\]

This is known as the differential return.

:p How are returns defined in the average-reward setting?
??x
In the average-reward setting, returns \( G_t \) are defined as differences between actual rewards and the long-term average reward:

\[
G_t = R_{t+1} - r(\pi) + R_{t+2} - r(\pi) + \cdots
\]

This definition helps in measuring the deviation from the expected average reward.
x??

---

---


#### Average Reward Setting Overview
Background context: The text introduces an alternative setting for reinforcement learning (RL) tasks, specifically focusing on average reward instead of discounted rewards. This change affects how value functions and Q-values are defined.

:p What is the average reward setting in RL?
??x
The average reward setting changes the way we define values and Q-values by removing all instances of s and replacing rewards with the difference between the observed reward and the true average reward. The equations for \( v_{\pi}(s) \), \( q_{\pi}(s, a) \), \( v_{*}(s) \), and \( q_{*}(s, a) \) are adjusted accordingly.

For example:
\[ v_{\pi}(s)=\sum_a \pi(a|s)\sum_r p(s',r|s,a)(r - r(\pi)+v_{\pi}(s')) \]
and
\[ q_{\pi}(s, a)=\sum_r p(s',r|s,a)(r - r(\pi) + \sum_{a'} \pi(a'|s')q_{\pi}(s',a')). \]

These changes affect the algorithms and theoretical results without significant modification.

x??

---


#### Differential TD Errors
Background context: The text introduces differential forms of TD errors for the average reward setting. These errors are used to update weights in algorithms like semi-gradient Sarsa.

:p What are the differential versions of TD errors?
??x
The differential TD errors are defined as:
\[ \delta_t = R_{t+1} - \bar{R}_t + \hat{v}(S_{t+1}, w_t) - \hat{v}(S_t, w_t), \]
and
\[ \delta_t' = R_{t+1} - \bar{R}_t + \hat{q}(S_{t+1}, A_{t+1}, w_t) - \hat{q}(S_t, A_t, w_t). \]

Here, \( \bar{R}_t \) is an estimate of the average reward at time \( t \).

x??

---


#### Differential Semi-Gradient Sarsa Algorithm
Background context: The text provides a modified version of semi-gradient Sarsa for the average reward setting. This involves updating weights based on differential TD errors.

:p What is the pseudocode for differential semi-gradient Sarsa?
??x
```java
// Pseudocode for Differential Semi-Gradient Sarsa
public class SemiGradientSarsa {
    // Input: a differentiable action-value function parameterization q_hat : S x A x R^d -> R
    // Algorithm parameters: step sizes alpha, gamma > 0
    // Initialize value-function weights w in R^d arbitrarily (e.g., w=0)
    // Initialize average reward estimate bar_R in R arbitrarily (e.g., bar_R = 0)
    // Initialize state S and action A

    while true {
        // Take action A, observe R, S'
        // Choose A' as a function of q_hat(S', ·, w) (e.g., ε-greedy)
        delta = R - bar_R + q_hat(S', A', w) - q_hat(S, A, w);
        bar_R += gamma * delta;
        w += alpha * delta * q_hat(S, A, w);
        S = S';
        A = A';
    }
}
```

x??

---


#### Example Task: Access-Control Queuing
Background context: The text describes a decision task involving access control to servers where customers with different priorities arrive at a queue. Servers become free with some probability and serve the customer if available.

:p What are the differential values of the three states in a Markov reward process?
??x
For a ring of three states \( A \), \( B \), and \( C \) with state transitions going deterministically around the ring, where a reward of +1 is received upon arrival in state \( A \) and 0 otherwise, we can compute the differential values as follows:

- State \( A \): The differential value will be the difference between the reward received (1) and the true average reward. If the average reward over time is close to zero due to random transitions, the differential value would approximately be +1.
- State \( B \) and State \( C \): Since no rewards are received in these states, their differential values will be 0.

Thus, the differential values are:
- \( v_A = 1 - r(\pi) \)
- \( v_B = 0 - r(\pi) \)
- \( v_C = 0 - r(\pi) \)

Where \( r(\pi) \) is the average reward over time.

x??

---

---


#### Differential Semi-Gradient Sarsa Algorithm
Background context: The provided text discusses a scenario where customers with varying priorities are to be accepted or rejected based on the number of free servers available. The goal is to maximize long-term reward without discounting, using a tabular solution approach that can also be considered in function approximation settings.

The differential semi-gradient Sarsa algorithm updates action-value estimates by considering the difference between new and old values. It uses parameters \( \alpha = 0.01 \), \( \gamma = 0.01 \), and \( \epsilon = 0.1 \). The initial action values were set to zero, and the average reward \( \bar{R} \) learned was approximately 2.31 after 2 million steps.

:p What is the objective of using differential semi-gradient Sarsa in this queuing problem?
??x
The objective is to maximize long-term rewards without discounting by updating action-value estimates based on differences between new and old values, considering states as (number of free servers, priority of the customer at the head of the queue) pairs.

---


#### Value Function for States A and B
Background context: The text introduces a modified definition of value function to handle cases where the diﬀerential return is not well-defined. This involves considering limits as described in Equation 10.13.

:p According to the modified definition, what are the values of states A and B in this MDP?
??x
Using the modified definition:
- For state A: The reward sequence starts with \(+1\), so the value function \( v_\pi(A) \) can be calculated as 
\[ \lim_{h \to \infty} \frac{1}{2h + 1} (1 + h(0)) = \frac{1}{3}. \]
- For state B: The reward sequence starts with \(0\), so the value function \( v_\pi(B) \) can be calculated as 
\[ \lim_{h \to \infty} \frac{1}{2h + 1} (0 + h(1)) = \frac{1}{3}. \]
Thus, both states A and B have a value of \( \frac{1}{3} \).

---


#### Update Rule for Average Reward
Background context: The text mentions that the pseudocode in Figure 10.6 updates \( \bar{R}_t \) using \( \Delta t \) as an error rather than simply \( R_{t+1} - \bar{R}_t \). This approach helps in stabilizing the estimate of average reward.

:p Why is it better to use \( \Delta t \) instead of \( R_{t+1} - \bar{R}_t \) for updating \( \bar{R}_t \)?
??x
Using \( \Delta t = R_{t+1} - \bar{R}_t \) can lead to oscillations in the estimate as it directly subtracts the current average reward from the new reward. Using \( \Delta t \), which is a more stable measure of error, helps in reducing these oscillations and provides a more consistent update rule.

---


#### Code Example for Ring MRP
Background context: To illustrate the concept, a simple code example can be used to simulate the ring MRP.

:p Provide pseudocode or C/Java code to simulate the ring MRP and update the average reward.
??x
```java
public class RingMRP {
    private int state;
    private double[] rewards = {0.333, 0.333, 0.334}; // example rewards

    public void step() {
        // Transition to next state
        state = (state + 1) % 3;
        return rewards[state]; // Return the reward of the new state
    }

    public double updateAverageReward(double newReward) {
        // Calculate the average reward using a simple moving average
        static double runningSum = 0.0; // Running sum for average calculation
        static int count = 0;

        count++;
        runningSum += (newReward - runningSum) / count;
        return runningSum;
    }
}
```
In this example, the `RingMRP` class simulates a ring MRP with three states and updates the average reward using a simple moving average. The `step` method transitions to the next state and returns the corresponding reward.

---


#### Conclusion
This set of flashcards covers key concepts from the provided text related to reinforcement learning algorithms, value function definitions in non-ergodic settings, and practical examples to reinforce understanding. Each card provides context and explanations for better comprehension and application in similar scenarios.

---

