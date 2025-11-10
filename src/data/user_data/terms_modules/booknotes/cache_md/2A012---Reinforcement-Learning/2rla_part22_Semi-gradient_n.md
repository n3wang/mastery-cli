# High-Quality Flashcards: 2A012---Reinforcement-Learning_processed (Part 22)


**Starting Chapter:** Semi-gradient n-step Sarsa

---


#### Semi-gradient n-step Sarsa Overview
Semi-gradient n-step Sarsa extends the tabular form of semi-gradient Sarsa to a function approximation setting. The update target is an n-step return, which generalizes from its tabular form (Equation 7.4) to a function approximation form as shown in Equation 10.4.
:p What is Semi-gradient n-step Sarsa?
??x
Semi-gradient n-step Sarsa uses an n-step return as the update target in the semi-gradient Sarsa update equation, allowing for more efficient updates by combining information from multiple time steps. This method improves learning efficiency and can achieve better asymptotic performance.
---
#### Update Equation of Semi-gradient n-step Sarsa
The update rule for the weights \( w \) in semi-gradient n-step Sarsa is given by Equation 10.5, which involves using an n-step return to adjust the weights based on the current state and action.
:p What is the update equation for Semi-gradient n-step Sarsa?
??x
The weight vector \( w \) is updated as follows:
\[ w_{t+n} = w_{t+n-1} + \alpha [G_t:t+n - \hat{q}(S_t, A_t, w_{t+n-1})] r(S_t, A_t, w_{t+n-1}) \]
where \( G_t:t+n \) is the n-step return defined as:
\[ G_t:t+n = \sum_{i=\tau+1}^{\min(\tau+n, T)} R_i + \gamma^n \hat{q}(S_{\tau+n}, A_{\tau+n}, w_{t+n}) \]
for \( t < T - n \) and \( G_t:t+n = G_t \) if \( t \geq T - n \).
---
#### Pseudocode for Episodic Semi-gradient n-step Sarsa
The pseudocode provided outlines the algorithm for estimating \( \hat{q}^{\pi} \) or \( q^* \) using a differentiable action-value function parameterization.
:p Can you provide the pseudocode for Episodic Semi-gradient n-step Sarsa?
??x
```plaintext
Episodic semi-gradient n-step Sarsa for estimating hat{q}^{pi} or q*
Input: a differentiable action-value function parameterization \hat{q}:S × A × R^d → R
Input: a policy pi (if estimating q^{pi})
Algorithm parameters: step size alpha > 0, small \epsilon > 0, a positive integer n
Initialize value-function weights w in R^d arbitrarily (e.g., w=0)
All store and access operations (St, At, and Rt) can take their index mod n+1
Loop for each episode:
    Initialize and store S_0 = terminal
    Select and store an action A_0 ∼ pi(·|S_0) or \epsilon-greedy w.r.t. hat{q}(S_0, ·, w)
    T-1 Loop for t=0, 1, 2,...:
        | If t < T, then:
            | Take action A_t
            | Observe and store the next reward as R_{t+1} and the next state as S_{t+1}
            | If S_{t+1} is terminal, then: Goto T
            | else: Select and store A_{t+1} ∼ pi(·|S_{t+1}) or \epsilon-greedy w.r.t. hat{q}(S_{t+1}, ·, w)
            | \tau <- t - n + 1 (time whose estimate is being updated)
            | If \tau >= 0:
                | G <- sum_{i=\tau+1}^{min(\tau+n, T)} R_i
                | If \tau + n < T: G <- G + gamma^n * hat{q}(S_{\tau+n}, A_{\tau+n}, w)
            | w <- w + alpha [G - hat{q}(S_{\tau}, A_{\tau}, w)] * r(S_{\tau}, A_{\tau}, w)
    Until \tau = T-1
```
---
#### Performance of Semi-gradient n-step Sarsa on Mountain Car Task
The performance of semi-gradient n-step Sarsa, particularly with an optimal intermediate level of bootstrapping (n=4), was demonstrated to outperform one-step and larger values of n. The results showed faster learning at \( n=8 \) compared to \( n=1 \).
:p What does the figure 10.3 indicate about Semi-gradient n-step Sarsa on Mountain Car?
??x
Figure 10.3 illustrates that semi-gradient n-step Sarsa, with a well-chosen step size (α = 0.5/8 for \( n=1 \) and α = 0.3/8 for \( n=8 \)), performs better than one-step Sarsa on the Mountain Car task at \( n=8 \). The algorithm learns faster and achieves a better asymptotic performance with an intermediate level of bootstrapping.
---
#### Effect of Step Size (α) and n on Learning
The study showed that the choice of step size α and the number of steps n significantly affect the rate of learning. An optimal balance is achieved when \( n=4 \), indicating an intermediate level of bootstrapping.
:p What does Figure 10.4 reveal about the effect of α and n?
??x
Figure 10.4 demonstrates that the performance of semi-gradient n-step Sarsa with tile-coding function approximation on the Mountain Car task is most effective when \( n=4 \), representing an intermediate level of bootstrapping. The results show a higher rate of learning for this choice, with standard errors ranging from 0.5 to about 4 across different values of n.
---
#### Exercise 10.1: Monte Carlo Methods in Sarsa
Monte Carlo methods involve waiting for the end of an episode before updating the value function based on all sampled returns. However, these are not covered explicitly in this chapter due to their focus on gradient-based methods like Sarsa and Expected Sarsa.
:p Why is pseudocode for Monte Carlo methods not provided?
??x
Monte Carlo methods involve sampling full episodes before updating the value function, which can be computationally expensive compared to gradient-based methods. Since this chapter focuses on semi-gradient methods that provide a balance between Monte Carlo sampling and bootstrapping, it may not explicitly cover Monte Carlo updates due to their different nature.
---
#### Exercise 10.2: Semi-gradient One-step Expected Sarsa
Semi-gradient one-step Expected Sarsa involves using the expected value of future rewards based on a single step ahead.
:p Give pseudocode for semi-gradient one-step Expected Sarsa for control.
??x
```plaintext
Semi-gradient one-step Expected Sarsa for Control:
Input: differentiable action-value function parameterization \hat{q}:S × A × R^d → R
Algorithm parameters: step size alpha > 0, a small epsilon > 0
Initialize value-function weights w in R^d arbitrarily (e.g., w=0)
Loop for each episode:
    Initialize and store S_0 = terminal state
    Select and store an action A_0 ∼ pi(·|S_0) or \epsilon-greedy w.r.t. hat{q}(S_0, ·, w)
    T-1 Loop for t=0, 1, ...:
        Take action A_t
        Observe the next reward R_{t+1} and state S_{t+1}
        Select and store A_{t+1} ∼ pi(·|S_{t+1}) or \epsilon-greedy w.r.t. hat{q}(S_{t+1}, ·, w)
        Update the weight vector as:
            w <- w + alpha * [R_{t+1} + \gamma * (hat{q}(S_{t+1}, A_{t+1}, w) - hat{q}(S_t, A_t, w))] * hat{q}(S_t, A_t, w)
    Until the episode ends
```
---
#### Exercise 10.3: Standard Errors in Large n vs Small n
The higher standard errors at large values of \( n \) compared to small values are due to overfitting and instability in the estimates. Smaller values of \( n \) reduce variance but increase bias, while larger values of \( n \) decrease bias but can increase variance.
:p Why do results have higher standard errors at large n than at small n?
??x
Higher standard errors at large values of \( n \) are due to the increased risk of overfitting and instability in the estimates. As \( n \) increases, the algorithm relies more on predictions far into the future, which can be less accurate. Conversely, smaller values of \( n \) reduce variance but introduce bias, leading to more stable performance with lower standard errors.
---


#### Average Reward Setting for Continuing Tasks
In this setting, we address Markov decision problems (MDPs) where there is no inherent termination condition; interactions between an agent and environment continue indefinitely. Unlike the discounted setting which discounts future rewards to a lower value, the average reward setting does not discount future rewards.

The quality of a policy \( \pi \) is defined as the long-term average reward it generates:
\[ r(\pi) = \lim_{h \to \infty} \frac{1}{h} \sum_{t=1}^{h} E[R_t | S_0, A_0:A_{t-1} \sim \pi] \]
or equivalently,
\[ r(\pi) = \lim_{t \to \infty} E[R_t | S_0, A_0:A_{t-1} \sim \pi]. \]

This can also be expressed as:
\[ r(\pi) = \sum_s \mu_\pi(s) \sum_a \pi(a|s) \sum_{s',r} p(s',r | s,a)r, \]
where \( \mu_\pi(s) \) is the steady-state distribution defined as:
\[ \mu_\pi(s) = \lim_{t \to \infty} Pr(S_t = s | A_0:A_{t-1} \sim \pi). \]

This assumption about the MDP, known as ergodicity, ensures that starting from any state and following policy \( \pi \), the long-term expectation of being in a state depends only on the policy and transition probabilities. Policies are compared based on their average reward per time step.

:p What is the definition of the quality of a policy in terms of the average reward?
??x
The quality of a policy \( \pi \) is defined as the limit of the average total reward received over time, under that policy:
\[ r(\pi) = \lim_{h \to \infty} \frac{1}{h} \sum_{t=1}^{h} E[R_t | S_0, A_0:A_{t-1} \sim \pi]. \]
This measures the long-term average reward generated by following policy \( \pi \).
x??

---

#### Steady-State Distribution
The steady-state distribution \( \mu_\pi(s) \) is a key concept in the average reward setting. It represents the probability of being in state \( s \) after a long period, assuming actions are chosen according to the policy \( \pi \).

Formally,
\[ \mu_\pi(s) = \lim_{t \to \infty} Pr(S_t = s | A_0:A_{t-1} \sim \pi). \]

It also satisfies the equation:
\[ \sum_s \mu_\pi(s) \sum_a \pi(a|s) p(s',r | s,a) = \mu_\pi(s'). \]
This equation ensures that the distribution remains unchanged over time if actions are chosen according to \( \pi \).

:p What is the definition of the steady-state distribution in terms of policy \( \pi \)?
??x
The steady-state distribution \( \mu_\pi(s) \) for a policy \( \pi \) is defined as the probability of being in state \( s \) after many time steps, assuming actions are chosen according to \( \pi \). It satisfies:
\[ \mu_\pi(s) = \lim_{t \to \infty} Pr(S_t = s | A_0:A_{t-1} \sim \pi). \]
It also ensures that the distribution is invariant under the policy, as shown by the equation:
\[ \sum_s \mu_\pi(s) \sum_a \pi(a|s) p(s',r | s,a) = \mu_\pi(s'). \]
x??

---

#### Differential Return and Value Functions
In the average reward setting, returns are defined differently. The differential return \( G_t \) is:
\[ G_t = R_{t+1} - r(\pi) + R_{t+2} - r(\pi) + \cdots. \]

This represents the difference between the actual rewards and the long-term average reward.

The corresponding value functions are known as differential value functions, defined as:
\[ v_\pi(s) = E_\pi[G_t | S_t = s] \]
and
\[ q_\pi(s,a) = E_\pi[G_t | S_t = s, A_t = a]. \]

These have their own Bellman equations, which are similar to but slightly different from the ones we've seen before.

:p What is the definition of differential return in the average reward setting?
??x
The differential return \( G_t \) in the average reward setting is defined as the difference between actual rewards and the long-term average reward:
\[ G_t = R_{t+1} - r(\pi) + R_{t+2} - r(\pi) + \cdots. \]
This captures the deviation of each reward from the expected average reward.
x??

---

#### Bellman Equations for Differential Value Functions
The Bellman equations for differential value functions are similar to those for discounted or undiscounted returns, but with slight modifications:
\[ v_\pi(s) = E_\pi[R_{t+1} - r(\pi) + G_t | S_t = s] \]
and
\[ q_\pi(s,a) = E_\pi[R_{t+1} - r(\pi) + G_t | S_t = s, A_t = a]. \]

These equations capture the value of being in state \( s \) or taking action \( a \) at time \( t \), considering both immediate rewards and future rewards relative to the average reward.

:p What are the Bellman equations for differential value functions?
??x
The Bellman equations for differential value functions are:
\[ v_\pi(s) = E_\pi[R_{t+1} - r(\pi) + G_t | S_t = s] \]
and
\[ q_\pi(s,a) = E_\pi[R_{t+1} - r(\pi) + G_t | S_t = s, A_t = a]. \]

These equations express the value functions in terms of both immediate rewards and future rewards relative to the long-term average reward \( r(\pi) \).
x??

---


#### Deprecating the Discounted Setting

Background context explaining the concept. The continuing, discounted problem formulation has been useful in the tabular case but questionable with function approximation due to its reliance on states that are not clearly distinguishable through feature vectors.

:p What would the sequence of \(R_{t+1}^{\bar{R}}\) errors be if one were using a method for estimating average rewards?

??x
The sequence of \(R_{t+1}^{\bar{R}}\) errors, in this context, refers to the errors that occur when averaging returns over a long interval. These errors would depend on the specific nature of the reward sequence and the algorithm used for estimation. However, without a clear state distinction, these errors might not provide useful information as they could be influenced by the same feature vectors representing indistinguishable states.

The key point is that in function approximation, with no clear state boundaries, the averaging of returns over time can still capture the overall performance but may suffer from instability due to potential misrepresentation by similar feature vectors. This makes the errors more likely to be a reflection of the similarity between states rather than distinct reward contributions.
x??

---

#### Discounted vs Average Reward in Function Approximation

Background context explaining the concept. The text discusses how discounting rewards might not be necessary or beneficial in function approximation settings, as it can lead to the same ranking of policies as undiscounted average reward.

:p How does the discounted return relate to the average reward in a continuing setting?

??x
In the continuing setting with no clear start or end states, the discounted return can be shown to be proportional to the average reward. Specifically, for policy \(\pi\), the average of the discounted returns is always \(r(\pi)/(1-\gamma)\), where \(\gamma\) is the discount rate.

This means that the discounting factor does not affect the ordering of policies in terms of their performance. The key idea behind this result is the symmetry of time steps, where each reward appears in different positions with a specific weight given by \(1 + \gamma + \gamma^2 + \gamma^3 + \cdots = 1/(1-\gamma)\).

Thus, if we optimize discounted value over the on-policy distribution, it has the same effect as optimizing undiscounted average reward. The discount rate \(\gamma\) effectively does not change the ranking of policies.

```java
public class DiscountVsAverageReward {
    // Example method to calculate the weight on a reward in different returns
    public double getWeightOnReward(double gamma) {
        return 1 / (1 - gamma);
    }
}
```
x??

---

#### Policy Improvement Theorem and Function Approximation

Background context explaining the concept. The policy improvement theorem, which guarantees that improving one state's value improves the overall policy, is lost when using function approximation. This loss of the policy improvement theorem can lead to issues in ensuring meaningful optimization of policies.

:p Why might discounting not be useful for control problems with function approximation?

??x
Discounting might not be useful for control problems with function approximation because it does not provide a clear benefit over undiscounted average reward. The discount rate \(\gamma\) has no effect on the ordering of policies, as the average of discounted returns is proportional to the average reward.

This means that optimizing discounted value over the on-policy distribution results in the same ranking of policies as optimizing undiscounted average reward. In practice, this implies that using discounting does not change the overall optimization outcome and might introduce unnecessary complexity without providing additional benefits.

Additionally, with function approximation, we lose the policy improvement theorem (Section 4.2), which ensures that improving one state's value leads to an improved overall policy. This loss of a theoretical guarantee means that methods relying on function approximation cannot be guaranteed to optimize average reward or any other equivalent discounted value over the on-policy distribution.

```java
public class DiscountingInFunctionApproximation {
    // Example method to calculate the effect of discounting
    public double calculateDiscountedReturn(double r, double gamma) {
        return r / (1 - gamma);
    }
}
```
x??

---

#### Futility of Discounting in Continuing Problems

Background context explaining the concept. The text suggests that even if one attempts to use a discounted objective function with function approximation, it does not provide any additional benefit over undiscounted average reward.

:p What is the proposed objective for using discounting in continuous problems?

??x
The proposed objective when using discounting in continuous problems is to sum discounted values over the distribution with which states occur under the policy. This can be written as:

\[ J(\pi) = \sum_{s} \mu_\pi(s)v^\pi(s) (w h e r e v^\pi \text{ is the discounted value function}) \]

This objective simplifies to:

\[ J(\pi) = \sum_{s}\mu_\pi(s)\sum_{a}\pi(a|s)\sum_{s'}\sum_{r}p(s',r|s,a)[r + \gamma v^\pi(s')] (Bellman Eq.) \]

And further simplifies due to the properties of the discounted value function:

\[ J(\pi) = r(\pi) + \sum_{s}\mu_\pi(s)\sum_{a}\pi(a|s)\sum_{s'}\sum_{r}p(s',r|s,a)\gamma v^\pi(s') \]

Using the definition of \(v^\pi\) and properties, it results in:

\[ J(\pi) = r(\pi) + \gamma J(\pi) \]

Which simplifies to:

\[ J(\pi) = \frac{r(\pi)}{1 - \gamma} \]

This shows that the proposed discounted objective orders policies identically to the undiscounted (average reward) objective, and the discount rate \(\gamma\) does not influence the ordering.

```java
public class DiscountedObjective {
    // Example method to calculate the discounted objective value
    public double calculateDiscountedObjective(double r, double gamma) {
        return r / (1 - gamma);
    }
}
```
x??

---

