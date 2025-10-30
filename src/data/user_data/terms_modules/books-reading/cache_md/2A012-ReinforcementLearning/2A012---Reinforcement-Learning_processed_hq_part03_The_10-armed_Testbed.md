# High-Quality Flashcards: 2A012---Reinforcement-Learning_processed (Part 3)

**Rating threshold:** >= 8/10

**Starting Chapter:** The 10-armed Testbed

---

**Rating: 8/10**

#### Sample-Average Method for Estimating Action Values
Background context explaining the concept. The sample-average method estimates the value of an action by averaging the rewards received when that action is taken, as shown in Equation 2.1:
\[ Q_t(a) = \frac{\sum_{i=1}^{t-1} R_i \cdot A_i=a}{\sum_{i=1}^{t-1} I(A_i=a)} \]
where \(R_i\) is the reward at time step \(i\), and \(I(\text{predicate})\) is an indicator function that returns 1 if the predicate is true, and 0 otherwise. If the denominator is zero, \(Q_t(a)\) is defined as some default value, such as 0.

:p What does the sample-average method estimate for an action's value?
??x
The sample-average method estimates the true value of an action by averaging the rewards received when that specific action has been taken in the past. This approach aims to converge to the true expected reward over time.
x??

---

#### Greedy Action Selection Method
Background context explaining the concept. The greedy action selection method chooses one of the actions with the highest estimated value, or "greedily." If there are multiple actions with the same highest estimate, an arbitrary tie-breaking rule is applied (e.g., random selection).

:p How does the greedy action selection method choose actions?
??x
The greedy action selection method selects actions by choosing one of the actions that currently has the highest estimated value. In case of ties, it breaks them arbitrarily, often randomly.
x??

---

#### \(\epsilon\)-Greedy Action Selection Method
Background context explaining the concept. The \(\epsilon\)-greedy method is a compromise between exploration and exploitation. It behaves greedily most of the time but occasionally selects actions at random to explore other options.

:p How does an \(\epsilon\)-greedy method balance exploration and exploitation?
??x
An \(\epsilon\)-greedy method balances exploration and exploitation by selecting the greedy action with probability \(1 - \epsilon\) and a different action (randomly chosen) with probability \(\epsilon\). This approach ensures that while most of the time it exploits current knowledge, it also periodically explores other actions.
x??

---

#### 10-Armed Testbed
Background context explaining the concept. The 10-armed testbed is a suite of 2000 randomly generated k-armed bandit problems designed to evaluate the performance of different reinforcement learning methods.

:p What does the 10-armed testbed consist of?
??x
The 10-armed testbed consists of a set of 2000 randomly generated 10-armed bandit problems, where for each problem, action values \(q^*(a)\) are selected from a normal distribution with mean 0 and variance 1. Actual rewards are then sampled from distributions centered around these true values.
x??

---

#### Performance Comparison of Greedy vs \(\epsilon\)-Greedy Methods
Background context explaining the concept. The performance of greedy methods versus \(\epsilon\)-greedy methods was compared on the 10-armed testbed to assess their relative effectiveness.

:p How were the performance and behavior of learning methods evaluated in this experiment?
??x
The performance and behavior of learning methods were evaluated by measuring their average reward per step over 1000 time steps for each of the 2000 independent bandit problems. This was repeated to obtain measures of the algorithm's average behavior.
x??

---

#### Sample-Average Action-Value Estimation
Background context explaining the concept. The sample-average method is one approach to estimate action values by averaging rewards received when an action has been taken.

:p What is the formula for calculating \(Q_t(a)\) using the sample-average method?
??x
The formula for calculating \(Q_t(a)\) using the sample-average method is:
\[ Q_t(a) = \frac{\sum_{i=1}^{t-1} R_i \cdot A_i=a}{\sum_{i=1}^{t-1} I(A_i=a)} \]
This calculates the average reward received for action \(a\) up to time step \(t-1\).
x??

---

#### Performance of Greedy vs \(\epsilon\)-Greedy Methods on 10-Armed Testbed
Background context explaining the concept. The performance of a purely greedy method and two \(\epsilon\)-greedy methods (\(\epsilon = 0.01\) and \(\epsilon = 0.1\)) was compared numerically using the 10-armed testbed.

:p What were the relative performances of the greedy method and \(\epsilon\)-greedy methods on the 10-armed testbed?
??x
The purely greedy method improved slightly faster at the beginning but then leveled off at a lower reward per step, achieving only about 1 reward per step compared to the best possible reward of about 1.55. The \(\epsilon\)-greedy methods performed better in the long run by balancing exploration and exploitation more effectively.
x??

---

**Rating: 8/10**

#### Multi-Armed Bandit Exploration vs Exploitation Trade-off
Background context: The trade-off between exploring new actions to gather more information and exploiting known good actions is a fundamental challenge in multi-armed bandit problems. This balance affects performance significantly, as shown by different -greedy methods.

:p What does the -greedy method do differently from the greedy method in handling exploration?
??x
The -greedy method introduces exploration by randomly selecting actions with probability , while always choosing the best-known action with probability (1-). This allows it to continue exploring and potentially improve its selection of optimal actions, unlike the purely greedy approach which sticks to known good actions.

This balance can be seen through the implementation where an action is chosen based on:
```java
if (Math.random() < epsilon) {
    // explore: select a random action
} else {
    // exploit: choose the best-known action
}
```
x??

---

#### Performance Comparison of -greedy Methods
Background context: The text compares different -greedy methods and their performance in finding optimal actions. It indicates that different values of affect exploration vs exploitation trade-off, impacting both cumulative rewards and probability of selecting the best action.

:p Which method between -0.1 and -0.01 would generally perform better over time?
??x
The -0.01 method would likely perform better over time as it balances more exploration with exploitation compared to the -0.1 method, which explores more but exploits less frequently (only 91% of the time).

This can be quantitatively expressed in terms of expected cumulative rewards and probability of selecting the best action:
- For -0.1: Higher initial exploration but lower long-term exploitation.
- For -0.01: Lower initial exploration but potentially higher long-term exploitation due to its closer balance.

Therefore, -0.01 is expected to outperform -0.1 in terms of both cumulative rewards and probability of selecting the best action over a large number of time steps.

x??

---

#### Incremental Action-Value Estimation
Background context: The incremental implementation discussed here focuses on efficiently updating action-value estimates (Q) using sample averages, which avoids storing all past rewards, thus saving memory. This is crucial for practical applications where data storage and computation are limited.

:p How can the average reward be updated incrementally according to the provided formula?
??x
The average reward Qn+1 can be updated incrementally as follows:
```java
Qn+1 = (Rn + n-1 * Qn) / n
```
This updates the average by incorporating the new reward Rn while reusing the previous average Qn, thus saving memory and computational resources.

Explanation: The formula reflects the idea of taking a step towards the target value (the new reward) from the current estimate. Specifically:
- Multiply the old average Qn by n-1 to keep track of past rewards.
- Add the new reward Rn to this product.
- Divide by the total number of samples (n) to get the updated average.

This ensures that each update is computationally efficient and memory-friendly.

x??

---

**Rating: 8/10**

#### Multi-armed Bandit Algorithm Overview
Background context: The multi-armed bandit problem is a classic reinforcement learning scenario where an agent must choose between different actions (often referred to as "one-armed bandits") with uncertain rewards. Each action has a probability distribution from which the reward is drawn.

The goal of the algorithm is to balance exploration (trying new actions) and exploitation (choosing actions known to yield high rewards). The pseudocode provided uses an incremental update rule for averaging, combined with \(\epsilon\)-greedy policy selection.

:p What does the pseudocode for a complete bandit algorithm using incrementally computed sample averages and \(\epsilon\)-greedy action selection represent?
??x
The pseudocode represents an implementation of a multi-armed bandit algorithm that uses incremental updates to estimate the expected reward for each action. It combines this with \(\epsilon\)-greedy policy selection, where actions are chosen either greedily based on the current best estimates or randomly to explore other options.

```java
public class BanditAlgorithm {
    private double[] Q; // Estimated action values
    private int[] N; // Number of times each action was selected
    
    public void initialize(int k) {
        for (int a = 0; a < k; ++a) {
            Q[a] = 0.0;
            N[a] = 0;
        }
    }
    
    public int selectAction(double epsilon, Random random) {
        double maxQ = Double.NEGATIVE_INFINITY;
        int bestAction = -1;
        
        // Find the action with the highest estimated value
        for (int a = 0; a < Q.length; ++a) {
            if (Q[a] > maxQ) {
                maxQ = Q[a];
                bestAction = a;
            }
        }
        
        // Choose an action randomly with probability epsilon
        if (random.nextDouble() < epsilon) {
            return random.nextInt(Q.length);
        } else {
            return bestAction;
        }
    }
    
    public void update(int a, double reward) {
        N[a]++;
        Q[a] = Q[a] + 1.0 / N[a] * (reward - Q[a]);
    }
}
```

x??

---

#### Step-size Parameter in Bandit Algorithms
Background context: In the multi-armed bandit algorithm, the step-size parameter \(\alpha_t(a)\) is used to update the estimated action values incrementally. The choice of \(\alpha_t(a)\) affects how much weight recent rewards are given compared to older ones.

:p How does the step-size parameter affect the averaging method in multi-armed bandit algorithms?
??x
The step-size parameter \(\alpha\) influences how much weight is given to past and current rewards. If \(\alpha = 1/n\), it corresponds to the sample-average update rule, which converges to the true action values by the law of large numbers but can be slow.

For a constant step-size parameter \(\alpha \in (0, 1]\), the averaging method becomes an exponential recency-weighted average where older rewards are given less weight. This is useful in nonstationary environments because it allows more recent rewards to have a greater impact on the action values.

Example formula:
\[ Q_{n+1} = Q_n + \alpha (R_n - Q_n) \]

x??

---

#### Exponential Recency-weighted Average
Background context: In nonstationary bandit problems, the reward distribution can change over time. The exponential recency-weighted average gives more weight to recent rewards and less to older ones.

:p What is an exponential recency-weighted average?
??x
An exponential recency-weighted average is a method of updating estimates that exponentially decreases the weight given to older observations. It ensures that recent data have more influence on the current estimate, making it suitable for nonstationary environments where reward distributions change over time.

Example formula:
\[ Q_{n+1} = \alpha R_n + (1 - \alpha) Q_n \]

Where \(\alpha\) is a constant step-size parameter between 0 and 1. This can be expanded to show the weights:
\[ Q_{n+1} = \sum_{i=1}^{n+1} (\alpha (1-\alpha)^{n-i+1}) R_i + (1 - \alpha) Q_1 \]

x??

---

#### Constant Step-size Parameter and Convergence
Background context: In the case of a constant step-size parameter, the averaging method becomes an exponential recency-weighted average. The convergence of this method relies on specific conditions involving the sum of the step-sizes.

:p What are the conditions required for the constant step-size parameter to ensure convergence in bandit algorithms?
??x
For a constant step-size parameter \(\alpha\), two main conditions must be met to ensure convergence with probability 1:
1. The sum of all step-sizes must diverge: \(\sum_{n=1}^{\infty} \alpha_n(a) = \infty\).
2. The sum of the squares of the step-sizes must converge: \(\sum_{n=1}^{\infty} \alpha_n^2(a) < \infty\).

For a constant step-size, these conditions are:
\[ 1 \cdot \sum_{n=1}^{\infty} \alpha = \infty \]
\[ \alpha^2 \cdot \sum_{n=1}^{\infty} 1 < \infty \]

The second condition is not met for a constant step-size, indicating that the estimates may continue to vary and never fully converge.

x??

---

#### Programming Experiment with Nonstationary Problems
Background context: To demonstrate the challenges of sample-average methods in nonstationary environments, an experiment can be designed where action values change over time. The 10-armed testbed is modified such that all actions start with equal expected rewards and then undergo independent random walks.

:p How would you design and conduct an experiment to show difficulties with sample-average methods for nonstationary problems?
??x
To demonstrate the challenges of sample-average methods in nonstationary environments, follow these steps:

1. **Modify the 10-armed testbed**:
   - Set initial action values \(q^*(a)\) equal.
   - On each step, add a normally distributed increment with mean zero and standard deviation 0.01 to all actions.

2. **Run simulations**:
   - Implement both sample-average and constant step-size parameter methods.
   - Use \(\epsilon = 0.1\) for the \(\epsilon\)-greedy policy selection.
   - Run each method over 10,000 steps.

3. **Plot results**:
   - Plot cumulative regret or estimated action values against time to compare performance.

Example code structure (pseudocode):
```java
public class NonstationaryExperiment {
    private double[] Q; // Estimated action values
    private int[] N; // Number of times each action was selected
    
    public void initialize(int k) {
        for (int a = 0; a < k; ++a) {
            Q[a] = 1.0; // Initial value, can be adjusted
            N[a] = 0;
        }
    }
    
    public int selectAction(double epsilon, Random random) {
        double maxQ = Double.NEGATIVE_INFINITY;
        int bestAction = -1;
        
        for (int a = 0; a < Q.length; ++a) {
            if (Q[a] > maxQ) {
                maxQ = Q[a];
                bestAction = a;
            }
        }
        
        if (random.nextDouble() < epsilon) {
            return random.nextInt(Q.length);
        } else {
            return bestAction;
        }
    }
    
    public void update(int a, double reward) {
        N[a]++;
        Q[a] += 1.0 / N[a] * (reward - Q[a]);
    }
}

// Run the experiment
public class Main {
    public static void main(String[] args) {
        int k = 10;
        BanditAlgorithm sampleAverage = new BanditAlgorithm();
        BanditAlgorithm constantStepSize = new BanditAlgorithm();
        
        for (int step = 0; step < 10000; ++step) {
            Random random = new Random();
            
            // Select actions and update
            int actionAvg = sampleAverage.selectAction(0.1, random);
            double rewardAvg = simulateReward(random.nextInt(k));
            sampleAverage.update(actionAvg, rewardAvg);
            
            int actionStepSize = constantStepSize.selectAction(0.1, random);
            double rewardStepSize = simulateReward(random.nextInt(k));
            constantStepSize.update(actionStepSize, rewardStepSize);
        }
        
        // Plot the results
        plotResults(sampleAverage.Q, "Sample Average");
        plotResults(constantStepSize.Q, "Constant Step Size");
    }

    private static double simulateReward(int action) {
        // Simulate a normal distribution with mean 0 and std dev 0.1
        return new Random().nextGaussian() * 0.1 + 1; 
    }
}
```

x??

---

