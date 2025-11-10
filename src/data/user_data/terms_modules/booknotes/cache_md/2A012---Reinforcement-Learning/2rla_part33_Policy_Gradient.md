# High-Quality Flashcards: 2A012---Reinforcement-Learning_processed (Part 33)


**Starting Chapter:** Policy Gradient for Continuing Problems

---


#### Definition of Performance for Continuing Problems

Background context: In continuing problems, there are no episode boundaries, and performance is defined as the average rate of reward per time step. This differs from episodic tasks where a fixed number of steps or episodes define the task.

Relevant formula:
\[ J(\theta) = \lim_{h \to \infty} \frac{1}{h}\sum_{t=1}^h E[R_t | S_0, A_0:t-1 \sim \pi] \]

Explanation: The performance \(J(\theta)\) is the long-term average reward per time step. This requires the steady-state distribution \(\mu(s)\), which represents the probability of being in state \(s\) after many steps.

:p What does \(J(\theta)\) represent in continuing problems?
??x
\(J(\theta)\) represents the long-term average reward per time step for a given policy parameterized by \(\theta\).

---


#### Steady-State Distribution

Background context: The steady-state distribution \(\mu(s)\) is crucial for understanding the performance of policies over an indefinite number of steps. It must exist and be independent of the initial state \(S_0\) (ergodicity assumption).

Relevant formula:
\[ \lim_{t \to \infty} P(S_t = s | A_0:t-1 \sim \pi) = \mu(s) \]

Explanation: This means that over many steps, the probability of being in state \(s\) remains constant regardless of how the initial state is chosen.

:p What does the steady-state distribution represent?
??x
The steady-state distribution represents the long-term probability of being in any given state under a policy. It ensures that if actions are selected according to \(\pi\), the system will remain in this distribution over time: 
\[ \sum_{s} \mu(s) \sum_{a} \pi(a|s, \theta)p(s'|s,a) = \mu(s') \]
for all \(s' \in S\).

---


#### Actor-Critic Algorithm Pseudocode

Background context: The actor-critic algorithm is used to optimize policies by estimating the value function and policy simultaneously. In continuing problems, it uses eligibility traces for better learning.

:p What is the pseudocode for the actor-critic algorithm with eligibility traces in a continuing case?
??x
```pseudocode
Input: A differentiable policy parameterization \(\pi(a|s,\theta)\)
Input: A differentiable state-value function parameterization \(v(s,w)\)

Algorithm parameters: \(\lambda_w \in [0, 1], \lambda_\theta \in [0, 1], \alpha_w > 0, \alpha_\theta > 0, \alpha_{\bar{R}} > 0\)

Initialize \(\bar{R} \in \mathbb{R}\) (e.g., to 0)
Initialize state-value weights \(w \in \mathbb{R}^d\) and policy parameter \(\theta \in \mathbb{R}^{d_0}\) (e.g., to 0)
Initialize \(S \in S\) (e.g., to \(s_0\))
Initialize eligibility traces: \(z_w \leftarrow 0\) (d-component vector), \(z_\theta \leftarrow 0\) (d_0-component vector)

Loop forever:
    A \sim \pi(·|S, \theta)
    Take action A, observe S', R
    \bar{R} \leftarrow \bar{R} + \alpha_{\bar{R}} v(S', w) - v(S, w)
    z_w \leftarrow (1 - \lambda_w)z_w + r v(S, w)
    z_\theta \leftarrow (1 - \lambda_\theta)z_\theta + R \log(\pi(A|S, \theta))
    w \leftarrow w + \alpha_w z_w
    \theta \leftarrow \theta + \alpha_\theta z_\theta
    S \leftarrow S'
```
x??

---


#### Value Definitions for Continuing Problems

Background context: In continuing problems, the value and state-action values (q-values) are defined with respect to the differential return \(G_t = R_{t+1} - r(\pi) + R_{t+2} - r(\pi) + \ldots\).

Relevant formula:
\[ G_t = R_{t+1} - r(\pi) + R_{t+2} - r(\pi) + R_{t+3} - r(\pi) + \cdots \]

Explanation: This differential return captures the cumulative reward beyond what is expected from following policy \(\pi\).

:p What are \(v_\pi(s)\) and \(q_\pi(s,a)\) in continuing problems?
??x
In continuing problems, \(v_\pi(s)\) represents the state value function:
\[ v_\pi(s) = E^\pi[G_t | S_t = s] \]

And \(q_\pi(s,a)\) is the state-action value function:
\[ q_\pi(s,a) = E^\pi[G_t | S_t = s, A_t = a] \]

These definitions are crucial for understanding how much reward can be expected starting from state \(s\) or taking action \(a\).

---


#### Policy Gradient Theorem in Continuing Problems

Background context: The policy gradient theorem states that the gradient of performance with respect to the policy parameters is proportional to the expectation of the state-action values.

Relevant formula:
\[ \nabla_\theta J(\theta) = E^\pi \left[ G_t \cdot \log (\pi(a|s,\theta)) \right] \]

Explanation: In continuing problems, this theorem remains valid, and it can be derived similarly to episodic cases but considering the infinite horizon.

:p What is the policy gradient theorem in continuing problems?
??x
The policy gradient theorem for continuing problems states:
\[ \nabla_\theta J(\theta) = E^\pi[G_t \cdot \log (\pi(a|s,\theta))], \]
where \(G_t\) is the differential return and \(\pi(a|s,\theta)\) is the policy parameterization.

This theorem helps in optimizing policies by directly updating parameters based on the expected increase in performance.

---


#### Policy Parameterization for Continuous Actions
Policy-based methods offer practical ways of dealing with large action spaces, even continuous ones. Instead of computing learned probabilities for each of the many actions, we learn statistics (mean and standard deviation) of the probability distribution.

For example, if actions are real numbers chosen from a normal (Gaussian) distribution, the probability density function is given by:
\[ p(x) = \frac{1}{\sqrt{2\pi\sigma^2}} e^{-\frac{(x-\mu)^2}{2\sigma^2}} \]

Where \( \mu \) and \( \sigma \) are the mean and standard deviation of the normal distribution.

:p What is the probability density function for a Gaussian distribution?
??x
The probability density function for a Gaussian distribution is:
\[ p(x) = \frac{1}{\sqrt{2\pi\sigma^2}} e^{-\frac{(x-\mu)^2}{2\sigma^2}} \]
This formula gives the density of the probability at \( x \), which can be greater than 1, but the total area under the curve must sum to 1. The parameters \( \mu \) and \( \sigma \) represent the mean and standard deviation of the distribution.
x??

---


#### Policy Parameterization
In policy-based methods for continuous action spaces, policies are parameterized using parametric function approximators that learn the mean and standard deviation of a Gaussian distribution.

The policy is defined as:
\[ \pi(a|s, \theta) = \frac{1}{\sqrt{2\pi\sigma^2(s,\theta)}} e^{-\frac{(a-\mu(s,\theta))^2}{2\sigma^2(s,\theta)}} \]

Where \( \mu(s,\theta) \) and \( \sigma(s,\theta) \) are the mean and standard deviation approximated by parameterized function approximators. The state feature vectors \( x_\mu(s) \) and \( x_\sigma(s) \) are used to compute these values.

:p How is a policy defined for continuous action spaces?
??x
A policy for continuous action spaces is defined as:
\[ \pi(a|s, \theta) = \frac{1}{\sqrt{2\pi\sigma^2(s,\theta)}} e^{-\frac{(a-\mu(s,\theta))^2}{2\sigma^2(s,\theta)}} \]
Here, \( \mu(s,\theta) \) and \( \sigma(s,\theta) \) are approximated using parameterized function approximators that depend on the state. The feature vectors \( x_\mu(s) \) and \( x_\sigma(s) \) are used to compute these values.
x??

---


#### Deriving Eligibility Vectors for Gaussian Policy
To derive eligibility vectors for a Gaussian policy, we need to calculate the gradients of the log probability with respect to the parameters.

Given:
\[ r\ln\pi(a|s,\theta_\mu) = \frac{r\pi(a|s,\theta_\mu)}{\pi(a|s,\theta_\mu)} - (a-\mu(s,\theta)) x_\mu(s) \]
and
\[ r\ln\pi(a|s,\theta_\sigma) = r\pi(a|s,\theta_\sigma) - \frac{(a-\mu(s,\theta))^2}{\sigma^2(s,\theta)} + \frac{1}{\sigma(s,\theta)} x_\sigma(s) \]

:p What are the parts of the eligibility vector for a Gaussian policy?
??x
The eligibility vector has two parts:
\[ r\ln\pi(a|s, \theta_\mu) = \frac{r\pi(a|s, \theta_\mu)}{\pi(a|s, \theta_\mu)} - (a-\mu(s, \theta)) x_\mu(s) \]
and
\[ r\ln\pi(a|s, \theta_\sigma) = r\pi(a|s, \theta_\sigma) - \frac{(a-\mu(s, \theta))^2}{\sigma^2(s, \theta)} + \frac{1}{\sigma(s, \theta)} x_\sigma(s) \]
These expressions are derived by computing the gradients of the log probability with respect to \( \theta_\mu \) and \( \theta_\sigma \).
x??

---


#### Bernoulli-Logistic Unit
A Bernoulli-logistic unit is a stochastic neuron-like unit used in some ANNs. Its output, \( A_t \), is a random variable with values 0 or 1, based on the policy parameter \( \theta_t \).

If the exponential softmax distribution is used:
\[ P(A_t=1) = \frac{1}{1 + e^{-\theta^T x(s)}} \]

Where \( \theta \) is the weight vector and \( x(s) \) is the input feature vector.

:p How does the Bernoulli-logistic unit's output probability relate to its policy parameter?
??x
The output probability of a Bernoulli-logistic unit, given by:
\[ P(A_t=1) = \frac{1}{1 + e^{-\theta^T x(s)}} \]
relates directly to the policy parameter \( \theta \). This is known as the logistic function.
x??

---


#### Monte-Carlo REINFORCE Update for Bernoulli-Logistic Unit
The Monte Carlo REINFORCE update for a Bernoulli-logistic unit involves updating the parameters based on the return received.

If \( h(s,0,\theta) \) and \( h(s,1,\theta) \) are the preferences in state \( s \) for the unit’s two actions given policy parameter \( \theta \), and assuming:
\[ h(s,1,\theta) - h(s,0,\theta) = \theta^T x(s) \]

Then:
\[ P_t = \pi(1|s_t, \theta_t) = \frac{1}{1 + e^{-\theta_t^T x(s_t)}} \]

The REINFORCE update rule is:
\[ \theta_{t+1} = \theta_t + \alpha G_t A_t \]

Where \( G_t \) is the return and \( A_t \) is the action taken.

:p What is the Monte-Carlo REINFORCE update for a Bernoulli-logistic unit?
??x
The Monte-Carlo REINFORCE update for a Bernoulli-logistic unit is:
\[ \theta_{t+1} = \theta_t + \alpha G_t A_t \]
where \( G_t \) is the return and \( A_t \) is the action taken. This rule updates the parameters based on the return received.
x??

---


#### Policy Gradient Methods Overview
Background context: This section discusses methods that learn a parameterized policy directly, as opposed to learning action values and then selecting actions. The advantages include specific probabilities for taking actions, appropriate exploration levels, handling continuous action spaces naturally, and representing policies parametrically when necessary.
:p What are the key advantages of using policy gradient methods over value-based methods?
??x
The key advantages are:
- Specific probabilities for taking actions can be learned directly.
- Appropriate levels of exploration can be approached asymptotically.
- They handle continuous action spaces naturally.
- Policies can often be represented parametrically more easily than value functions.

Example pseudo-code for a simple policy gradient update:

```python
# Policy parameter vector θ
θ = initial_policy_parameters

for episode in range(num_episodes):
    state = environment.reset()
    while not done:
        # Sample action from the current policy based on state and parameters
        action = sample_action(state, θ)
        
        # Perform action and observe next state and reward
        next_state, reward, done, _ = env.step(action)
        
        # Estimate gradient of performance with respect to θ
        grad_policy = estimate_gradient(θ, state, action)
        
        # Update policy parameters using the estimated gradient
        θ += learning_rate * grad_policy
        
    # Optionally, perform evaluation or logging after each episode
```

x??

---


#### Policy Gradient Theorem
Background context: This theorem provides an exact formula for how performance is affected by changes in the policy parameter without involving derivatives of the state distribution. It forms the theoretical foundation for many policy gradient methods.
:p What is the policy gradient theorem, and why is it important?
??x
The policy gradient theorem gives a direct way to update policy parameters based on how they affect overall performance. Specifically, it provides an exact formula for the expected change in return with respect to changes in the policy parameter. This avoids needing to take derivatives of the state distribution, which can be complex or impossible.

Example pseudo-code:

```python
# Define the policy gradient theorem function
def policy_gradient_theorem(policy_params):
    # Calculate the expected change in return
    grad = sum([R[s] * gradient(s) for s in states]) / len(states)
    
    return grad

# Usage in an update step
θ += learning_rate * policy_gradient_theorem(θ)
```

x??

---


#### REINFORCE Method
Background context: REINFORCE is a simple policy gradient method that updates the policy parameter on each step based on an estimate of the gradient of performance with respect to the policy parameter. It involves sampling actions from the current policy and using these samples to approximate the necessary gradients.
:p What is the REINFORCE algorithm, and how does it work?
??x
REINFORCE is a method that directly updates the policy parameters by estimating the gradient of the expected return with respect to the policy parameters. The basic idea involves sampling actions from the current policy and using these samples to approximate the necessary gradients.

Algorithm:

```python
# Initialize the policy and other variables
θ = initial_policy_parameters

for episode in range(num_episodes):
    state = environment.reset()
    path = []
    
    while not done:
        action_probs = policy(state, θ)
        action = sample_from(action_probs)
        
        # Perform action and observe next state, reward, and whether the episode is done
        next_state, reward, done, _ = env.step(action)
        
        # Store the transition in a path for later use
        path.append((state, action))
        state = next_state
    
    # Calculate returns and gradients based on the path
    G = 0
    policy_gradient = []
    
    for s, a in reversed(path):
        G += reward
        grad = gradient(s, a)
        policy_gradient.append(G * grad)
        
    θ += learning_rate * sum(policy_gradient)

# Optionally, perform evaluation or logging after each episode
```

x??

---


#### Actor-Critic Methods Overview
Background context: These methods combine the concepts of actors and critics. The actor selects actions based on the current state, while the critic evaluates the policy's action selection by assigning credit (or blame) to it.
:p What are actor-critic methods, and how do they differ from other policy gradient methods?
??x
Actor-critic methods involve two components: an actor that chooses actions and a critic that evaluates those actions. The actor updates its policy based on the critic's feedback. This approach can reduce variance compared to pure policy gradients because the critic provides additional information about the quality of actions.

Example pseudo-code:

```python
# Define the actor and critic models
actor = ActorModel()
critic = CriticModel()

for episode in range(num_episodes):
    state = environment.reset()
    
    while not done:
        action_probs = actor(state)
        action = sample_from(action_probs)
        
        next_state, reward, done, _ = env.step(action)
        
        # Update the critic
        target_value = calculate_target_value(next_state, reward)
        critic.update(state, target_value)
        
        # Update the actor based on the critic's evaluation
        grad = critic.evaluate(state, action) * gradient(s, a)
        actor.update(state, grad)

# Optionally, perform evaluation or logging after each episode
```

x??

---


#### Actor-Critic Methods Variations
Background context: Various extensions and variations of actor-critic methods have been developed, such as off-policy methods and entropy regularization. These improve performance in different ways by addressing issues like variance reduction and exploration.
:p What are some recent developments in actor-critic methods?
??x
Recent developments in actor-critic methods include:

- Natural-gradient methods: Methods that use natural gradients to update parameters more effectively.
- Deterministic policy gradient methods: Approaches that focus on deterministic policies rather than stochastic ones.
- Off-policy actor-critic methods: Algorithms like Q-learning integrated with value-based components to reduce variance and improve sample efficiency.
- Entropy regularization: Techniques to add entropy to the policy to encourage exploration.

Example of an off-policy actor-critic algorithm:

```python
# Initialize the actor, critic, and other variables
actor = ActorModel()
critic = CriticModel()

for episode in range(num_episodes):
    state = environment.reset()
    
    while not done:
        action_probs = actor(state)
        action = sample_from(action_probs)
        
        next_state, reward, done, _ = env.step(action)
        
        # Update the critic
        target_value = calculate_target_value(next_state, reward)
        critic.update(state, target_value)
        
        # Update the actor based on the critic's evaluation (off-policy)
        grad = critic.evaluate(state, action) * gradient(s, a)
        actor.update(state, grad)

# Optionally, perform evaluation or logging after each episode
```

x??

---

---

