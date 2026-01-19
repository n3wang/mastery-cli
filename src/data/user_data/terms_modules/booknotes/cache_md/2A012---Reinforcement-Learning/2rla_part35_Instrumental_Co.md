# High-Quality Flashcards: 2A012---Reinforcement-Learning_processed (Part 35)


**Starting Chapter:** Instrumental Conditioning

---


#### Instrumental Conditioning Overview
In instrumental conditioning experiments, learning depends on the consequences of behavior: the delivery of a reinforcing stimulus is contingent on what the animal does. This contrasts with classical conditioning, where the reinforcing stimulus (US) is delivered independently of the animal's behavior.

:p What distinguishes instrumental conditioning from classical conditioning?
??x
Instrumental conditioning differs from classical conditioning in that learning occurs based on the consequences of an individual's actions. In classical conditioning, a neutral stimulus (NS) becomes conditioned to elicit a response through pairing with an unconditioned stimulus (US). However, in instrumental conditioning, behavior is reinforced or punished depending on its outcome.

Example:
- A rat presses a lever and receives food as a reward.
- The pressing of the lever (behavior) leads to the delivery of food (reinforcer).

This type of learning can be modeled using reinforcement learning algorithms, which update predictions based on the observed outcomes of actions.
x??

---


#### Reinforcement Learning in Instrumental Conditioning
The TD model is an algorithm used in reinforcement learning that helps account for instrumental conditioning. It works by predicting rewards and adjusting these predictions based on experience.

:p How does the TD model work in the context of instrumental conditioning?
??x
The Temporal Difference (TD) model operates by making predictions about future rewards and updating those predictions when actual outcomes are observed. This process is crucial for learning behaviors that maximize reward over time.

Key steps:
1. Initialize prediction values for states or actions.
2. When an action leads to a state with a known outcome, update the predicted value based on the difference between the expected and actual reward.
3. Continuously refine these predictions as more experiences accumulate.

Example code in pseudocode:

```pseudocode
function TDUpdate(state, action, reward, next_state) {
    // Get current prediction for this state-action pair
    let prediction = model.predict(state, action)
    
    // Predict the value of the next state
    let next_prediction = model.predict(next_state)

    // Update the prediction based on the difference between expected and actual reward
    prediction += learning_rate * (reward + discount_factor * next_prediction - prediction)

    // Store updated prediction back into the model
    model.update(state, action, prediction)
}
```
x??

---


#### TD Model Representation of Instrumental Conditioning
The TD model can represent instrumental conditioning through specific stimulus and response mechanisms. For example, it includes representations that translate unconditioned stimuli (US) predictions into conditioned responses (CR).

:p How does the TD model account for instrumental conditioning?
??x
In the context of instrumental conditioning, the TD model accounts for behavior by predicting future rewards based on actions taken. When a particular action leads to a positive outcome (reward), the prediction associated with that action is updated to reflect this new information.

For instance:
- If pressing a lever results in food (a reward), the model updates its prediction of the value of pressing the lever.
- These predictions guide future behavior, reinforcing actions that lead to rewards and discouraging those that do not.

Example using the TD model:

```pseudocode
function performAction(action) {
    // Get state before action
    let currentState = getCurrentState()
    
    // Execute action and observe reward and next state
    let (reward, nextState) = executeAction(action)
    
    // Update predictions based on new information
    TDUpdate(currentState, action, reward, nextState)
}

function executeAction(action) {
    // Perform the action in the environment
    performLeverPress()
    
    // Wait for the result
    wait()
    
    // Check if food (reward) is delivered
    let reward = checkIfFoodDelivered()
    return (reward, getCurrentState())
}
```
x??

---


#### TD Model in Biological Learning Context
TD learning not only serves as an algorithm but also provides a basis for models of biological processes like the activity of neurons producing dopamine. Dopamine is involved in reward processing and reinforces learning behaviors.

:p How does TD learning connect to biological neural mechanisms?
??x
TD learning connects to biological neural mechanisms by providing a theoretical framework that explains how organisms learn through reinforcement. Specifically, it suggests that similar learning principles can be applied to understand how the brain processes rewards and adjusts its responses accordingly.

For example:
- Dopaminergic neurons in the brain release dopamine when a reward is expected or received.
- These signals serve as error corrections, updating predictions about future outcomes based on observed rewards.

This connection helps explain why organisms engage in behaviors that maximize long-term rewards, even if immediate consequences are uncertain.

Example code illustrating this concept:

```pseudocode
function updateDopamineNeuron(rewardExpected) {
    // If a reward is expected, increase the prediction strength (similar to increasing dopamine release)
    if (rewardExpected) {
        predictionStrength += learningRate * (1 - currentPredictionStrength)
        currentPredictionStrength = clamp(predictionStrength, 0, 1)
    }
}
```
x??

---

---


#### Instrumental Conditioning and Reinforcement Learning
:p How do instrumental conditioning experiments relate to reinforcement learning?
??x
Instrumental conditioning experiments, such as those conducted by Thorndike with cats in puzzle boxes, demonstrate principles that are fundamental to reinforcement learning. These experiments show how animals learn through trial and error, adapting their behavior based on the outcomes of their actions.

Relevant context: In instrumental conditioning, behaviors are reinforced when they lead to a desired outcome (like escaping from a box). This process is analogous to the selectional and associative aspects of reinforcement learning.
??x
The answer with detailed explanations:
Instrumental conditioning experiments show that animals learn by trying different actions and selecting those that result in positive outcomes. Similarly, reinforcement learning algorithms try various actions and select ones that maximize cumulative rewards.

Key concepts include:

- **Selectional**: Reinforcement learning algorithms try alternatives and compare their consequences.
- **Associative**: The selected actions are associated with particular situations (states) to form the agent's policy.

Example code: A simple pseudocode for a reinforcement learning algorithm:
```pseudocode
function reinforce_learning(agent, environment):
    state = get_current_state(environment)
    
    while not goal_reached():
        action = choose_action(state, agent.policy)
        
        next_state, reward = take_action(action, environment)
        
        update_policy(action, reward)
        
        state = next_state
```
The `choose_action()` function selects an action based on the current policy. The `update_policy()` function adjusts the policy based on the received reward. This process is similar to how Thorndike's cats learned by trying different actions and adapting their behavior.
x??

---


#### Components of Reinforcement Learning Algorithms
:p What are the essential features of reinforcement learning algorithms?
??x
The essential features of reinforcement learning (RL) algorithms include:

1. **Selectional**: RL algorithms try alternatives and select among them by comparing their consequences.
2. **Associative**: The selected actions are associated with particular situations (states), forming the agent's policy.

Relevant context: These features reflect Thorndike's Law of Effect, where behaviors become more likely to be repeated if they lead to positive outcomes and less likely if they do not.
??x
The answer with detailed explanations:
Reinforcement learning algorithms share key characteristics with the principles observed in Thorndike's experiments:

- **Selectional**: The algorithm tries different actions (like a cat trying different ways to escape) and selects those that yield better outcomes. This is similar to how Thorndike's cats adapted their behavior over time.
- **Associative**: The selected actions are linked to specific states or situations, forming the agent's policy. Just as Thorndike observed behaviors becoming associated with particular puzzles, RL algorithms learn to associate states and actions.

Example code: A simplified pseudocode for an RL algorithm:
```pseudocode
function train_agent(agent, environment):
    state = get_initial_state(environment)
    
    while not goal_reached():
        action = select_action(state, agent.policy)
        
        next_state, reward = take_step(action, environment)
        
        update_policy(action, state, reward)
        
        state = next_state
```
In this example, the `select_action()` function chooses an action based on the current state and policy. The `update_policy()` function adjusts the policy to favor actions that lead to higher rewards.
x??

---

---


#### Law of Effect and Reinforcement Learning

Explanation of the Law of Effect as a combination of search and memory in reinforcement learning.

: What does the Law of Effect describe?
??x
The Law of Effect describes how actions are learned by combining two key processes:
1. **Search**: Trying out different possible actions in various situations.
2. **Memory**: Forming associations between specific situations and actions that have been found to be effective so far.

This approach is fundamental in reinforcement learning, where agents learn from the environment through trial and error.

In computational terms, this can be seen as:
```python
# Pseudocode for a simple reinforcement learning algorithm using epsilon-greedy action selection
def select_action(state):
    if random.uniform(0, 1) < epsilon:  # Explore with probability epsilon
        return random.choice(actions)
    else:  # Exploit the best known action
        return max(Q[state], key=Q[state].get)

# Q is a dictionary where each state maps to a dictionary of actions and their associated values.
```
x??

---


#### Exploration in Reinforcement Learning

Explanation of how exploration works in reinforcement learning algorithms.

: How does exploration work in reinforcement learning?
??x
Exploration in reinforcement learning involves methods for the agent to try out different actions when it is uncertain which ones will lead to better outcomes. This helps the agent discover new strategies and improve its performance over time.

Popular methods include:
- **Epsilon-Greedy**: With probability $\epsilon$, choose a random action; otherwise, take the best known action.
- **Upper Confidence Bound (UCB)**: Balances exploration and exploitation by considering both the mean reward of an action and the uncertainty about its true value.

These methods are crucial because they ensure that the agent does not get stuck in suboptimal solutions too quickly.

Example:
```python
def select_action(state):
    if random.uniform(0, 1) < epsilon:  # Explore with probability epsilon
        return random.choice(actions)
    else:  # Exploit the best known action
        return max(Q[state], key=Q[state].get)
```
x??

---


#### Thorndike’s Observations and Reinforcement Learning

Explanation of how Thorndike's observations align with modern reinforcement learning concepts.

: How do Thorndike’s observations about cat behavior in puzzle boxes relate to reinforcement learning?
??x
Thorndike observed that cats selected actions based on their instinctual responses to the current situation, which is similar to specifying admissible action sets $A(s)$ for each state. This approach reduces the complexity of the search space by focusing only on relevant actions.

Additionally, Thorndike’s findings hint at a form of context-specific ordering in action selection, suggesting that animals might have some level of deliberate exploration guided by their instinctual responses rather than purely random behavior.

Example:
```python
def get_admissible_actions(state):
    if state == 'confined':
        return ['scratch', 'claw', 'bite']
    else:
        return []

# Example Q-learning update rule
def q_learning_update(state, action, reward, next_state):
    global Q
    current_q = Q[state][action]
    max_future_q = max(Q[next_state].values())
    new_q = (1 - alpha) * current_q + alpha * (reward + gamma * max_future_q)
    Q[state][action] = new_q
```
x??

---


#### Reinforcement Schedules
Background context explaining the concept, including the use of reinforcement schedules in experiments like recording cumulative lever presses.
:p What is a key feature of reinforcement learning according to the text?
??x
A key feature of reinforcement learning is its use of different reinforcement schedules to investigate how varying intervals and patterns affect an animal’s rate of behavior. For instance, recording the cumulative number of lever presses over time in the Skinner box helps understand these effects.
x??

---


#### Shaping Behavior
Background context explaining the concept through the example of training a pigeon to bowl by reinforcing successive approximations of the desired behavior.
:p What is shaping and how did it work in training a pigeon?
??x
Shaping involves reinforcing closer approximations of a desired behavior over time. In training a pigeon, this meant initially reinforcing any response resembling a swipe with its beak, then progressively selecting responses more like the final form. This technique led to rapid learning, akin to sculpting clay.
x??

---


#### Reinforcement Learning Principles
Background context explaining how reinforcement learning principles can model experimental results like those in Skinner’s operant conditioning studies but not fully developed yet.
:p How do reinforcement learning principles relate to psychological experiments?
??x
Reinforcement learning principles can be used to model experimental results from operant conditioning, such as recording lever presses over time. However, the integration and application of these principles are still being explored and are not well-developed in practice.
x??

---


#### Credit-Assignment Problem for Learning Systems
Background context: The credit-assignment problem involves distributing credit for success among many decisions that may have been involved in producing an outcome. In RL and behaviorist psychology, this is particularly relevant when rewards or penalties are delayed.
:p What is the credit-assignment problem?
??x
The credit-assignment problem refers to how to distribute credit for success among the multiple decisions that may have contributed to a particular outcome, especially when these outcomes are only realized after a delay. 
x??

---


#### Eligibility Traces in Reinforcement Learning Algorithms
Background context: Eligibility traces are used in RL algorithms to address delayed reinforcement by tracking which states and actions were involved in producing an outcome. They allow the system to remember past activities for a certain period, enabling learning from delayed rewards.
:p What are eligibility traces?
??x
Eligibility traces are mechanisms that track which states and actions were involved in producing an outcome, allowing the RL algorithm to consider these past activities when updating value functions even after a delay. 
x??

---


#### TD Learning and Eligibility Traces
Background context: Temporal Difference (TD) learning is a method for reinforcement learning that combines on-policy updates with predictions of future rewards. Eligibility traces extend this by giving more weight to recent actions in the update process.
:p How do eligibility traces work with TD learning?
??x
Eligibility traces enhance TD learning by keeping track of which state-action pairs have been visited recently, allowing for a weighted update of value functions even when the reward is delayed. This helps in attributing credit accurately among past decisions.
x??

---


#### Conditioning Experiments and Trace Mechanisms
Background context: In classical conditioning experiments, trace mechanisms like stimulus traces can help explain how animals learn despite delays between conditioned (CS) and unconditioned stimuli (US). These mechanisms are crucial for bridging temporal gaps in reinforcement learning.
:p How do stimulus traces work in conditioning?
??x
Stimulus traces make it possible to learn through the simultaneous presence of a trace of a conditioned stimulus (CS) when the unconditioned stimulus (US) arrives, effectively bridging temporal gaps and enabling animals to associate distant events.
x??

---


#### Exponential Decay of Traces
Background context: Hull hypothesized that internal stimuli decay exponentially over time, reaching zero after about 30-40 seconds. This decay rate affects how actions are associated with subsequent rewards or penalties in learning tasks.
:p What is the exponential decay model for traces?
??x
Hull proposed an exponential decay model where internal stimuli left by actions decay at a certain rate (e.g., every 30 to 40 seconds), affecting the association between actions and their outcomes over time. 
x??

---


#### TD Learning Implementation in Code
Background context: Implementing TD learning with eligibility traces involves updating value functions based on the difference between expected and actual rewards, weighted by eligibility traces.
:p How can TD learning be implemented using eligibility traces?
??x
TD learning updates value functions using a combination of on-policy updates and predictions. Eligibility traces $\eta(s, a)$ are used to weight the impact of past state-action pairs in the update process.

```java
public class TDLearning {
    private double alpha; // Learning rate
    private double gamma; // Discount factor
    private double[] V; // Value function

    public void update(double delta, int s, int a) {
        for (int state = 0; state < V.length; state++) {
            for (int action = 0; action < numActions; action++) {
                if (state == s && action == a) { // Eligibility trace
                    eta[state][action] += 1.0;
                } else {
                    eta[state][action] *= gamma * lambda; // Decay of eligibility traces
                }
            }
        }
        for (int state = 0; state < V.length; state++) {
            for (int action = 0; action < numActions; action++) {
                if (eta[state][action] > 0) { // Update value function
                    V[state][action] += alpha * delta * eta[state][action];
                }
            }
        }
    }
}
```

x??

---

---


#### Critic and Actor in Reinforcement Learning
Background context: The actor–critic architecture is a type of reinforcement learning algorithm where the critic evaluates the current policy, and the actor updates it. This system closely mirrors how biological systems work, with the TD error acting as a conditioned reinforcement signal.
:p How does the actor-critic architecture function?
??x
In the actor-critic framework, the actor updates its policy based on feedback from the critic. The critic evaluates the current policy by predicting the return (cumulative reward) of actions taken under that policy using Temporal Difference (TD) learning. The TD error is a key component here; it acts as an immediate evaluation signal for the actor, even when rewards are delayed.
For example, if the action-value function $Q(s, a)$ is being used to predict returns:
$$V(s_t) = Q(s_t, a_t) + \alpha [R_{t+1} + \gamma V(s_{t+1}) - Q(s_t, a_t)]$$where $\alpha $ is the learning rate, and$\gamma$ is the discount factor.
??x
The actor receives updates from the critic based on this TD error. Here’s a simplified pseudocode to illustrate:
```python
def update_policy(actor, critic, state, action, reward, next_state):
    # Critic evaluates policy
    critic_value = critic.evaluate(state, action)
    # Actor gets updated using TD error
    td_error = reward + discount_factor * critic.evaluate(next_state, None) - critic_value
    actor.update_policy(td_error, state, action)
```
x??

---


#### Cognitive Maps and Latent Learning
Background context: Cognitive maps are mental representations of the environment that allow organisms to plan routes and predict outcomes. They are often used in model-based reinforcement learning algorithms. Latent learning refers to learning that occurs without immediate rewards.
:p What is latent learning?
??x
Latent learning is a form of learning where an animal or organism learns about the structure of its environment during a period when no reward or penalty is received, and then uses this knowledge later to gain a reward or avoid punishment. It was famously demonstrated in experiments with rats running mazes.
For instance, consider the following experimental setup:
- Two groups of rats run through a maze.
- The first group receives no food reward during the initial exploration phase but gets food only at the end when the maze is modified.
- The second control group gets continuous food rewards throughout their runs in the maze.
By the time the first group discovers the food, they have already learned the route even without immediate reinforcement. This learning is latent until a goal state (food) is introduced.
??x
The conclusion from such experiments was that rats can learn the layout of the environment ("cognitive map") during a non-reward period and use this information later when motivated by the presence of food. Here’s an example pseudocode to simulate such a scenario:
```java
public class MazeRunner {
    private boolean[] learnedMap;
    private int currentLocation;

    public void runMaze(int mazeSize, boolean rewardPresent) {
        // Run initial exploration without reward
        for (int i = 0; i < mazeSize - 1; i++) {
            learnMapStep();
        }

        // Later, when a reward is present
        if (rewardPresent) {
            findRouteToReward(learnedMap);
        }
    }

    private void learnMapStep() {
        // Update learned map based on current location and next step
    }

    private void findRouteToReward(boolean[] learnedMap) {
        // Use the learned map to navigate to the reward location
    }
}
```
x??

---


#### Model-Based Reinforcement Learning Algorithms
Background context: In model-based reinforcement learning, agents use environment models that predict state transitions and rewards. These models help in planning by predicting future states and their associated values.
:p What role do environment models play in model-based reinforcement learning?
??x
Environment models are crucial in model-based reinforcement learning as they enable the agent to predict how actions will change the state of the world and what rewards can be expected from different states or state-action pairs. These predictions allow the agent to plan optimal courses of action.
The two main parts of an environment model include:
1. **State-Transition Model**: This part predicts the next state given a current state and an action.
2. **Reward Model**: This part estimates the rewards that will be received in different states or as a result of specific actions.

Here’s a simple pseudocode illustrating how these models can be used for decision-making:
```python
class EnvironmentModel:
    def transition_model(self, state, action):
        # Predicts next state based on current state and action
        pass

    def reward_model(self, state, action=None):
        # Estimates rewards for the given state or state-action pair
        pass

def choose_action(model, current_state):
    actions = model.transition_model(current_state)
    best_action = max(actions, key=lambda a: expected_reward(model, current_state, a))
    return best_action

def expected_reward(model, state, action):
    # Computes the expected reward for the given action in the state
    next_state = model.transition_model(state, action)
    return model.reward_model(next_state)
```
x??

---

---


#### Model-Free vs. Model-Based Reinforcement Learning
Background context: In reinforcement learning, model-free approaches rely on trial and error without a complete environment model, while model-based approaches learn an internal representation of the environment dynamics.
:p What are the key differences between model-free and model-based reinforcement learning?
??x
Model-free reinforcement learning involves learning directly from experience with little to no use of an explicit model. In contrast, model-based reinforcement learning uses learned models to predict future states and rewards before taking actions. This distinction is crucial for understanding different strategies animals might employ in environments.
x??

---


#### Decision Strategies in Model-Free vs. Model-Based Reinforcement Learning
Background context: A hypothetical task involving navigating a maze is used to illustrate the differences between model-free and model-based decision strategies. The maze has distinctive goal boxes with associated rewards.
:p How does a rat navigate a maze using both model-free and model-based approaches?
??x
In a model-free approach, the rat learns through trial and error which actions lead to specific outcomes without an explicit understanding of the environment's dynamics. In contrast, a model-based approach involves learning the environment’s structure (e.g., S–S0 or SA–S0 pairs) to predict future states and plan optimal paths.
x??

---

---


#### Model-Free Strategy Overview
A model-free strategy relies on stored values for state-action pairs to make decisions. The rat estimates the highest return it can expect from each action taken from every nonterminal state, which are obtained through repeated trials of running a maze.

:p What is the core concept of a model-free strategy?
??x
The core concept of a model-free strategy involves using stored values for state-action pairs to estimate the best actions leading to maximum returns. This method relies on empirical learning and doesn't require an explicit environment model.
x??

---


#### Action Value Estimation in Model-Free Strategy
In a model-free strategy, action values are estimates of the highest return that can be expected from each action taken from every nonterminal state. These values are refined over many trials until they approximate the optimal returns.

:p How does a model-free strategy determine which actions to take?
??x
A model-free strategy determines which actions to take by selecting the action with the largest estimated value for each state. The values represent expected future rewards, and these estimates improve through repeated trials.
x??

---


#### Example of Model-Free Strategy in Maze Navigation
In the provided example, a rat navigates a maze with specific states (S1, S2, S3) and actions (L, R). When action values have been sufficiently accurate, the rat selects L from state S1 and R from state S2 to achieve a maximum return of 4.

:p What is an illustrative example of model-free strategy in the text?
??x
An illustrative example shows a rat navigating a maze where it learns optimal actions through repeated trials. By selecting L from S1 and R from S2, the rat achieves the highest reward of 4.
x??

---


#### Model-Based Strategy Overview
A model-based strategy involves learning an environment model that consists of state-action-next-state transitions and a reward model associated with goal boxes. The agent uses this model to simulate sequences of actions to find paths yielding the highest return.

:p What is a key difference between model-free and model-based strategies?
??x
The key difference is that while a model-free strategy relies on empirical learning through action-value estimates, a model-based strategy involves explicitly constructing an environment model. This allows for planning based on simulated sequences of actions.
x??

---


#### Example of Model-Based Strategy in Maze Navigation
In the provided text, a rat uses a state-transition model and reward model to simulate paths and select the best sequence of actions (L from S1 and R from S2) to achieve the maximum return.

:p How does a model-based strategy differ from a model-free strategy when applied to maze navigation?
??x
A model-based strategy differs as it explicitly learns an environment model, including state transitions and rewards. It uses this model to simulate sequences of actions, allowing for strategic planning rather than relying solely on empirical learning.
x??

---


#### Direct Policy Cache in Model-Free Strategy
Instead of action values, a different model-free approach might cache direct policy links from states to specific actions, making decisions based on these cached policies.

:p Can you explain an alternative model-free strategy without using action values?
??x
An alternative model-free strategy involves caching direct policy links from states to specific actions. This means the rat memorizes which action to take directly in each state, bypassing the need for calculating and comparing action values.
x??

---


#### Simulating Sequences in Model-Based Strategy
A model-based agent uses its environment model to simulate sequences of actions to find paths yielding the highest return. For instance, it might select L from S1 and then R from S2 to achieve a reward of 4.

:p How does a model-based strategy use simulation for decision-making?
??x
A model-based strategy uses simulation by creating hypothetical sequences of actions using its environment model. This allows it to predict future states and rewards, enabling strategic decisions that maximize expected returns.
x??

---


#### Planning in Model-Based Strategy
Planning in the context of model-based strategies involves comparing the predicted returns of simulated paths to decide on the best sequence of actions.

:p What role does planning play in a model-based strategy?
??x
Planning plays a crucial role as it involves simulating different action sequences and comparing their expected returns. This helps the agent choose the path that maximizes its long-term rewards.
x??

---

---


#### Model-Free vs. Model-Based Agents
Model-free agents rely on direct experience to update their policies and value functions, while model-based agents use a model of the environment for planning actions, allowing them to adapt without personal experience.
:p How do model-free and model-based agents differ in adapting to environmental changes?
??x
Model-free agents need to directly experience the consequences of their actions to update their policies or action-value functions. In contrast, model-based agents can adjust their policies through planning using a learned model of the environment, which allows them to adapt without needing personal experience with the changed states and actions.
In pseudocode:
```java
// Model-free agent example
for each episode {
    for each state-action pair in episode {
        update policy or value function based on observed rewards;
    }
}

// Model-based agent example
model = learn_environment();
while true {
    plan_actions(model);
    execute_plan();
}
```
x??

---


#### Goal-Shifts and Policy Updates
When a goal's reward changes, model-free agents must gather new experiences in the updated environment to update their policies or value functions. This process can be time-consuming as it involves repeated visits to states.
:p How does an agent respond when a goal's reward is changed in a model-free setting?
??x
In a model-free setting, the agent must revisit the state where the goal was previously located and experience the new reward. The policy or action-value function associated with that state will be updated based on this new information.
Example:
```java
// Pseudocode for updating value function in Q-learning
Q(s, a) = Q(s, a) + alpha * (r + gamma * max(Q(s', a')) - Q(s, a))
```
where `alpha` is the learning rate, `gamma` is the discount factor, and `s'`, `a'` are the next state and action.
x??

---


#### Extinction Trials and Behavior Reduction
Background context explaining the concept. In the extinction trials, rats reduced lever-pressing even without directly experiencing the link between lever pressing and subsequent sickness. They seemed able to combine knowledge of the outcome with its negative value.
:p Why did the rats reduce their lever-pressing in the extinction trials?
??x
The rats reduced their lever-pressing because they "knew" that the consequence of pressing the lever (receiving pellets) would lead to nausea, which is something they wanted to avoid. This behavior was driven by their cognitive understanding rather than direct experience.
x??

---


#### Model-Free vs. Model-Based Algorithms
Background context explaining the concept. Not every psychologist agrees with Adams and Dickinson's model-based account, as there are alternative explanations for the rats' behavior. However, it is widely accepted that agents can use both model-free and model-based algorithms.
:p Can an agent use both model-free and model-based algorithms?
??x
Yes, an agent can use both model-free and model-based algorithms. Model-free algorithms learn from direct experience, while model-based algorithms rely on a cognitive map to predict outcomes based on past experiences. Both methods have their advantages and are often used together.
x??

---

