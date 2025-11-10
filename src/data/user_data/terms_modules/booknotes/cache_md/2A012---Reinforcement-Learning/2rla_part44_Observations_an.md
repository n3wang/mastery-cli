# High-Quality Flashcards: 2A012---Reinforcement-Learning_processed (Part 44)


**Starting Chapter:** Observations and State

---


#### Discounting vs. Average Reward Setting for Hierarchical Policies

Discounting is generally considered inappropriate when using function approximation, especially for control problems. The natural Bellman equation for a hierarchical policy, analogous to (17.4) but for the average reward setting (Section 10.3), needs to be redefined.

:p What is the natural Bellman equation for a hierarchical policy in the average reward setting?
??x
The natural Bellman equation for a hierarchical policy in the average reward setting can be derived by considering the long-term average reward rather than discounted rewards. For an option \(\mathcal{O}\) with value function \(V_{\mathcal{O}}(s)\), the Bellman equation is:

\[ V_{\mathcal{O}}(s) = G(s, a) + \beta \sum_{s'} T(s, a, s') V_{\mathcal{O}}(s') \]

where \(G(s, a)\) represents the immediate reward plus transition and action values, and \(\beta\) is a parameter that balances exploration vs. exploitation.

However, in practice for average reward settings, this equation simplifies to:

\[ V_{\mathcal{O}}(s) = G(s, a) + \sum_{s'} T(s, a, s') V_{\mathcal{O}}(s') \]

This removes the discount factor \(\beta\) as it is replaced by considering the long-term average reward directly.

x??

---


#### Two Parts of the Option Model for Average Reward Setting

In the context of options and hierarchical policies, two parts are essential: the policy within an option (\(\pi_{\mathcal{O}}(a|s)\)) and the termination condition (or option policy) that decides when to exit the option.

For the average reward setting, these components need to be redefined appropriately. The key idea is that options should have a value function that accounts for long-term average rewards instead of discounted values.

:p What are the two parts of the option model analogous to (17.2) and (17.3), but for the average reward setting?
??x
The two parts of the option model, analogous to (17.2) and (17.3), for the average reward setting are:

1. **Policy within an Option (\(\pi_{\mathcal{O}}(a|s)\))**: This is the policy that decides what action \(a\) to take given state \(s\) while within an option \(\mathcal{O}\).

2. **Termination Condition (Option Policy) \(P(s, a = \tau)\)**: This condition determines whether to exit the current option and transition back to the base policy.

For average rewards, these components would be modified to ensure they consider long-term average performance rather than discounted future values.

x??

---


#### Partial Observability and Function Approximation

The methods presented in Part I of the book rely on complete state observability by the agent. However, many real-world scenarios involve partial observability where the sensory input provides only limited information about the true state of the environment. This is a significant limitation because it assumes that all state variables are fully observable.

Parametric function approximation (developed in Part II) addresses this issue by allowing the learned value functions to be parameterized and thus can handle situations where some state variables are not directly observable. 

:p What is a significant limitation of methods presented in Part I regarding state observability?
??x
A significant limitation of methods presented in Part I regarding state observability is that they assume complete state observability by the agent. This means the learned value function is implemented as a table over the environment's state space, which assumes all state variables are fully observable and directly measurable.

In reality, many scenarios (especially those involving natural intelligences) have partial observability where only limited information about the state of the world can be obtained through sensors or observations. Parametric function approximation in Part II is more flexible because it allows for a parameterized representation that does not require full state observability.

x??

---


#### Changes Needed for Partial Observability

To properly handle partial observability, several changes need to be made to the problem formulation and learning algorithms. The environment would emit only observations (signals) rather than states, which provide partial information about the true state of the world. Additionally, rewards might be a function of these observations.

:p What are the four steps needed to explicitly treat partial observability?
??x
To properly handle partial observability, the following four steps need to be taken:

1. **Change the Problem**: The environment emits not its states but only observations — signals that depend on its state and provide only partial information about it.
2. **Rewrite the Value Function**: The value function would now be a function of these observations rather than the full state space.
3. **Define Rewards from Observations**: Rewards are defined as functions of the observations, reflecting the limited information available to the agent.
4. **Adjust Learning Algorithms**: Modify the learning algorithms and models to accommodate the new formulation where only partial state information is available.

x??

---

---


#### Environmental Interaction Sequence
Background context: The passage describes an environmental interaction that alternates between actions and observations without explicit states or rewards, forming a sequence of \(A_0, O_1, A_1, O_2, \ldots\). This is represented as:
\[ A_0, O_1, A_1, O_2, \ldots \]
The interaction can be finite (episodes ending with terminal observations) or infinite.

:p What is the structure of an environmental interaction sequence?
??x
The environmental interaction consists of alternating actions and observations. Each action \(A_t\) is followed by an observation \(O_{t+1}\), forming a sequence such as \(A_0, O_1, A_1, O_2, \ldots\).
x??

---


#### Markov State in Reinforcement Learning
Background context: The passage explains that a state is useful if it has the Markov property. This means that given the current history and action, the probability of the next observation depends only on this information.

:p What does it mean for a state to have the Markov property?
??x
A state has the Markov property if the probability of the next observation depends only on the current state (history) and not on the entire past history. This is formally represented as:
\[ f(h) = f(h_0) \Rightarrow P(O_{t+1} = o | H_t = h, A_t = a) = P(O_{t+1} = o | H_t = h_0, A_t = a), \]
for all \(o \in O\) and \(a \in A\).
x??

---


#### Predicting Future Observations
Background context: The passage explains that the Markov state is not only useful for predicting future observations but also for making predictions about any test sequence.

:p How does a Markov state help in predicting future events?
??x
A Markov state \(S_t = f(H_t)\) helps predict future events because if two histories map to the same state, their probabilities of future observations are equal. This can be represented as:
\[ f(h) = f(h_0) \Rightarrow p(\tau | h) = p(\tau | h_0), \]
where \(\tau\) is any test sequence.
x??

---


#### Computational Considerations for States
Background context: The passage discusses the need to compactly summarize history. While the identity function satisfies Markov conditions, it can grow too large and not recur in continuing tasks.

:p Why do we want states to be compact?
??x
We want states to be compact because they should efficiently summarize the past without growing excessively with time, making them usable for tabular learning methods that rely on state recurrences.
x??

---

---


---
#### State-Update Function
Background context explaining the concept. The state-update function \(u\) is a core part of handling partial observability, where the next state \(S_{t+1}\) is computed incrementally from the current state \(S_t\), action \(A_t\), and observation \(O_{t+1}\). This is in contrast to functions that take entire histories as input.

Formula: 
\[ S_{t+1} = u(S_t, A_t, O_{t+1}) \]

For example, if the function \(f\) were the identity (i.e., \(S_t = H_t\)), then the state-update function \(u\) would merely append the new action and observation to the current state.

:p What is a state-update function?
??x
A state-update function is used in agent architectures to handle partial observability. It takes the current state, an action, and an observation to compute the next state incrementally.
x??

---


#### Partially Observable Markov Decision Processes (POMDPs)
Background context explaining the concept. In POMDPs, the environment has a latent state \(X_t\) that generates observations but is not directly observable by the agent. The natural Markov state for an agent in this scenario is called a belief state \(S_t\), which represents the distribution over possible hidden states given the history.

Belief State Components:
\[ s[i] = P(X_t = i | H_t) \]
where \(H_t\) is the history up to time \(t\).

Belief-State Update Function Formula (Bayes' Rule):
\[ u(s, a, o)[i] = \frac{\sum_{x} s[x] p(i, o | x, a)}{\sum_{x_0} \sum_{x} s[x] p(x_0, o | x, a)} \]

:p What is the belief state in POMDPs?
??x
The belief state in POMDPs is a distribution over possible hidden states given the history. It represents how likely each hidden state \(X_t = i\) is given all observations up to time \(t\).
x??

---


#### Partially Observable State Representation (PSRs)
Background context: The concept revolves around handling partial observability in reinforcement learning by grounding the semantics of agent states in predictions about future observations and actions. This approach uses a Markov state defined as a vector of probabilities for "core" tests, which is updated via a state-update function \( u \) analogous to Bayes rule but grounded in observable data.
:p What are PSRs used for?
??x
PSRs are used to handle partial observability by defining states based on predictions about future observations and actions that are more directly observable. This approach makes it easier to learn because the model deals with state vectors that can act as targets for learning, rather than raw observations.
x??

---


#### Markov State in PSRs
Background context: A Markov state is defined as a vector of probabilities for "core" tests (17.6), and this vector is updated by a function \( u \) similar to Bayes rule but grounded in observable data. This makes it easier to learn because the model can focus on these probabilistic predictions rather than direct observations.
:p How is a Markov state defined in PSRs?
??x
A Markov state in PSRs is defined as a vector of probabilities for "core" tests (17.6). These states are updated by a function \( u \) that acts similarly to Bayes rule, but the semantics are grounded in observable data, making it easier to learn these probabilistic predictions.
x??

---


#### Approximate States
Background context: To handle partial observability, approximate states can be used instead of exact Markov states. The simplest example is using just the latest observation \( S_t = O_t \), but this approach cannot handle hidden state information. A more complex method involves using a kth-order history approach where \( S_t = O_{t},A_{t-1},O_{t-1},\ldots,A_{t-k} \) for some \( k > 1 \).
:p What is the simplest example of an approximate state?
??x
The simplest example of an approximate state is using just the latest observation, denoted as \( S_t = O_t \). This approach cannot handle any hidden state information and is very basic in its handling of past data.
x??

---


#### kth-Order History Approximate States
Background context: For a more complex method to handle partial observability, a kth-order history can be used where the current approximate state \( S_t \) includes the latest observation and action along with the last \( k-1 \) observations and actions. This approach uses a state-update function that shifts new data in and old data out.
:p How is a kth-order history approximate state defined?
??x
A kth-order history approximate state is defined as \( S_t = O_{t}, A_{t-1}, O_{t-1}, \ldots, A_{t-k} \) for some \( k > 1 \). This approach includes the latest observation and action along with the last \( k-1 \) observations and actions. The state-update function shifts new data in and old data out.
x??

---


#### Markov Property Approximation
Background context: When the Markov property is only approximately satisfied, long-term prediction performance can degrade significantly because one-step predictions defining the Markov property become inaccurate. This affects longer-term tests, generalized value functions (GVFs), and state-update functions. There are no useful theoretical guarantees at present for approximations in this area.
:p What happens when the Markov property is only approximately satisfied?
??x
When the Markov property is only approximately satisfied, long-term prediction performance can degrade significantly because one-step predictions defining the Markov property become inaccurate. This affects longer-term tests, generalized value functions (GVFs), and state-update functions. The short-term and long-term approximation objectives are different, and there are no useful theoretical guarantees at present.
x??

---


#### Approximate State in Reinforcement Learning
Background context: To approach artificial intelligence ambitiously, it is essential to embrace approximation even for states. This means using an approximate notion of state that plays the same role as before but may not be Markov. The simplest example is using just the latest observation \( S_t = O_t \), which cannot handle hidden state information.
:p Why must we use approximate states in reinforcement learning?
??x
We must use approximate states in reinforcement learning to approach artificial intelligence ambitiously by embracing approximation, even for states. This means using an approximate notion of state that plays the same role as before but may not be Markov. The simplest example is using just the latest observation \( S_t = O_t \), which cannot handle hidden state information.
x??

---

---


#### Multi-Prediction Approach for State Learning

Background context explaining the concept. The idea is that a state representation good for some predictions might be similarly effective for others, particularly in Markov processes where one-step predictions suffice for long-term ones. This approach extends to multi-headed learning and auxiliary tasks discussed earlier (Section 17.1).

:p What is the key principle behind using multiple predictions for state learning?
??x
The key principle is that representations useful for some predictions are likely to be beneficial for others, suggesting a heuristic that what works well in one prediction context could work in another.
x??

---


#### Scale and Computation Resources

Background on how computational resources can influence the effectiveness of pursuing many predictions. With more computational power, larger numbers of predictions can be experimented with, favoring those most relevant or easiest to learn reliably.

:p How do computational resources affect the pursuit of multiple predictions?
??x
Computational resources allow for a broader exploration of potential predictions. More powerful systems can handle larger numbers of experiments and focus on predictions that are either most useful or easiest to learn accurately.
x??

---


#### Agent-Driven Prediction Selection

Explanation on moving beyond manual selection of predictions, emphasizing the need for an agent to choose based on systematic exploration.

:p Why is manual selection of predictions not ideal in this context?
??x
Manual selection is limiting and may miss out on potentially useful predictions that are not obvious or require experimentation. An agent-driven approach can systematically explore a vast space of possible predictions.
x??

---


#### POMDP and PSR Approaches with Approximate States

Explanation on the application of POMDP (Partially Observable Markov Decision Processes) and PSR (Perceptual State Representation) approaches using approximate states, where precise semantics are not strictly necessary.

:p How do POMDP and PSR handle approximate states?
??x
POMDP and PSR can work with approximate states by focusing on useful information rather than complete accuracy. The state update function can still be effective even if the exact meaning of the state is not precisely correct.
x??