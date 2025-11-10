# High-Quality Flashcards: 2A012---Reinforcement-Learning_processed (Part 3)


**Starting Chapter:** The 10-armed Testbed

---


#### Sample-Average Method for Estimating Action Values
Background context explaining the concept. The true value of an action is the mean reward when that action is selected. One natural way to estimate this is by averaging the rewards actually received:
\[ Q_t(a) = \frac{\sum_{i=1}^{t-1} R_i \cdot A_i = a}{\sum_{i=1}^{t-1} A_i = a}, \]
where \( predicate \) denotes the random variable that is 1 if the predicate is true and 0 if it is not. If the denominator is zero, then we instead define \( Q_t(a) \) as some default value, such as 0.

:p What does the formula for the sample-average method represent?
??x
The formula represents the estimation of action values using a simple averaging technique over time. Each estimate is an average of the rewards received when a specific action was taken.
x??

---


#### Greedy Action Selection Method
The simplest action selection rule is to select one of the actions with the highest estimated value, that is, one of the greedy actions as defined in the previous section. If there is more than one greedy action, then a selection is made among them in some arbitrary way, perhaps randomly.
\[ A_t = \arg\max_a Q_t(a), \]
where \( \arg\max_a \) denotes the action \( a \) for which the expression that follows is maximized (with ties broken arbitrarily).

:p What does the greedy action selection method do?
??x
The greedy action selection method always exploits current knowledge to maximize immediate reward by selecting actions with the highest estimated value. It spends no time sampling apparently inferior actions.
x??

---


#### \(\epsilon\)-Greedy Action Selection Method
A simple alternative is to behave greedily most of the time, but every once in a while (with small probability \( \epsilon \)), select randomly from among all the actions with equal probability independently of the action-value estimates.

:p What does an \(\epsilon\)-greedy method do?
??x
An \(\epsilon\)-greedy method selects the greedy action most of the time, but occasionally selects a random action to explore other options. This ensures that every action is sampled infinitely often in the limit, leading to better long-term performance.
x??

---


#### 10-Armed Testbed
To assess the relative effectiveness of greedy and \(\epsilon\)-greedy methods, experiments were conducted on a suite of test problems known as the 10-armed testbed. Each bandit problem had 10 actions with true values selected according to a normal distribution with mean zero and unit variance.

:p What is the 10-armed testbed used for?
??x
The 10-armed testbed is used to numerically compare different action-value methods by applying them to various randomly generated k-armed bandit problems. Each problem has true values of actions selected from a normal distribution, and rewards are sampled accordingly.
x??

---


#### Performance Comparison on the 10-Armed Testbed
The performance of greedy and \(\epsilon\)-greedy methods was compared numerically using the 10-armed testbed. For each run, one of the bandit problems was applied to a learning method over 1000 time steps.

:p What does Figure 2.2 show about the performance of different methods on the 10-armed testbed?
??x
Figure 2.2 shows that \(\epsilon\)-greedy methods, especially with a small \(\epsilon\) value like 0.01, outperform the pure greedy method in terms of average reward per step over time.
x??

---


#### Multi-Armed Bandit Exploration vs Exploitation
Background context explaining the concept of the multi-armed bandit problem and how greedy methods perform suboptimally compared to -greedy methods. The lower graph shows that greedy methods find the optimal action in only approximately one-third of tasks, while -greedy methods continue to explore and improve their chances of finding the optimal action.
:p What is the main difference between greedy and -greedy methods in the context of multi-armed bandit problems?
??x
Greedy methods tend to exploit known good actions without exploring other options, which can lead to suboptimal performance if the initial exploration samples are disappointing. On the other hand, -greedy methods balance exploitation with exploration by occasionally choosing a random action, thus providing better chances of identifying the optimal action.
x??

---


#### Exploration vs Exploitation Tradeoff
Background context explaining that the trade-off between exploring new actions and exploiting known good actions is crucial in reinforcement learning tasks. The performance of these methods depends on the task characteristics such as reward variance and whether the task is stationary or nonstationary.
:p How does the -greedy method's performance compare to the greedy method when the reward variance increases?
??x
When the reward variance increases, -greedy methods are expected to perform better relative to greedy methods because more exploration is needed to find the optimal action. The higher variance means that initial samples may be less indicative of true rewards, making it necessary for -greedy methods to explore more thoroughly.
x??

---


#### Bandit Action Selection
Background context explaining how the choice of actions affects long-term performance in multi-armed bandits. The example provided illustrates a specific sequence of action and reward selections under an -greedy strategy.
:p In the given sequence, on which time steps did the random selection (if any) definitely occur?
??x
The random selection definitely occurred at time step 5, as the action chosen was 3, which is not the one with the highest estimated value based on previous rewards. If -greedy exploration has not yet occurred by this point, it must have happened then.
x??

---


#### Long-Run Performance of Algorithms
Background context explaining that different algorithms perform differently over time in terms of cumulative reward and probability of selecting the best action. The example provided compares two methods: greedy and -greedy with =0.1.
:p Based on Figure 2.2, which method will perform better in the long run, and by how much?
??x
The -greedy method with a higher exploration rate (e.g., =0.1) is expected to outperform the greedy method because it continues to explore and potentially improve its chances of selecting the best action over time. The exact improvement depends on the specific performance measures shown in Figure 2.2, but generally, -greedy methods are expected to have a higher cumulative reward and a higher probability of selecting the best action.
x??

---


#### Incremental Implementation of Averages
Background context explaining how action-value estimates can be computed efficiently with constant memory and per-time-step computation using incremental formulas. The example provided shows how to update averages using the formula derived in equation (2.3).
:p How is the new average value estimated using an incremental method?
??x
The new average value \( Q_{n+1} \) can be estimated incrementally by updating the previous estimate \( Q_n \) with the new reward \( R_n \) and the number of times the action has been selected. The formula for this update is:
\[ Q_{n+1} = Q_n + \frac{R_n - Q_n}{n} \]
This method requires only a small computation (2.3) for each new reward, making it highly efficient in terms of both memory and computational resources.
x??

---


#### General Form of Incremental Estimation
Background context explaining the general form of incremental estimation used in reinforcement learning algorithms, where an old estimate is updated with a step size towards a target value.
:p What is the general formula for updating estimates incrementally?
??x
The general form for incremental estimation is:
\[ \text{NewEstimate} = \text{OldEstimate} + \text{StepSize} \times (\text{Target} - \text{OldEstimate}) \]
This formula reduces the error in the estimate by taking a step toward the target, which can be noisy. In practice, this means updating an old value based on new information while maintaining efficiency.
x??

---

---


#### Weighted Average with Exponential Decay

Background context: When dealing with nonstationary problems, it is common to use a constant step-size parameter to give more weight to recent rewards. The update rule becomes:
\[ Q_{n+1} = \alpha R_n + (1 - \alpha) Q_n. \]
This can be expanded into an exponential recency-weighted average.

:p How does the weighted average with exponential decay ensure that more recent rewards have a greater influence?
??x
The weighted average with exponential decay ensures that more recent rewards have a greater influence by using the formula:
\[ Q_{n+1} = \alpha R_n + (1 - \alpha) Q_n. \]
Here, \(R_n\) is given weight \(\alpha\), and previous estimates are scaled down by \((1 - \alpha)\). This results in an exponentially decreasing influence of older rewards.
x??

---


#### Conditions for Convergence with Non-constant Step-size Parameters

Background context: For nonstationary problems, it might be necessary to vary the step-size parameter from step to step. A well-known result gives conditions that ensure convergence with probability 1:
\[ \sum_{n=1}^{\infty} \alpha_n(a) = 1 \text{ and } \sum_{n=1}^{\infty} \alpha_n^2(a) < 1. \]

:p What are the two conditions required for convergence with non-constant step-size parameters?
??x
The two conditions required for convergence with non-constant step-size parameters are:
\[ \sum_{n=1}^{\infty} \alpha_n(a) = 1 \]
and
\[ \sum_{n=1}^{\infty} \alpha_n^2(a) < 1. \]
The first condition ensures that the steps are large enough to eventually overcome initial conditions and random fluctuations, while the second guarantees that steps become small enough for convergence.
x??

---


#### Sample-Average Method

Background context: The sample-average method is a special case where the step-size parameter \(\alpha_n(a) = \frac{1}{n}\). This method ensures convergence to true action values by the law of large numbers, but it can converge slowly or require tuning.

:p How does the sample-average method ensure convergence?
??x
The sample-average method ensures convergence because it uses a step-size parameter \(\alpha_n(a) = \frac{1}{n}\), which is derived from the number of times action \(a\) has been selected. This leads to:
\[ Q_{n+1} = Q_n + \frac{R_n - Q_n}{N(a)}, \]
where \(N(a)\) is the count of how many times action \(a\) has been selected. By this method, the estimates converge by the law of large numbers.
x??

---


#### Experiment for Nonstationary Problems

Background context: To demonstrate the difficulties that sample-average methods have with nonstationary problems, an experiment can be conducted using a modified 10-armed testbed where all \(q^*(a)\) start equal and then take independent random walks.

:p How would you design an experiment to show difficulties of sample-average methods in nonstationary environments?
??x
To demonstrate the difficulties of sample-average methods in nonstationary environments, follow these steps:

1. **Modify the 10-armed testbed**: Start with all \(q^*(a)\) equal and then make them take independent random walks by adding a normally distributed increment with mean zero and standard deviation 0.01 at each step.
2. **Use different action-value methods**:
   - One method using sample averages, incrementally computed.
   - Another method using a constant step-size parameter, \(\alpha = 0.1\).
3. **Set parameters**: Use \(\epsilon = 0.1\) and run the experiment for 10,000 steps.
4. **Prepare plots** similar to Figure 2.2 to compare performance.

This setup will show how sample-average methods struggle with nonstationary environments compared to those using a constant step-size parameter.
x??

---

---

