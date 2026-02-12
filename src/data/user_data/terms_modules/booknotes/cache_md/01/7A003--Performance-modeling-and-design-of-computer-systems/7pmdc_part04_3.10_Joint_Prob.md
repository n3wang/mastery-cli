# High-Quality Flashcards: 7A003--Performance-modeling-and-design-of-computer-systems_processed (Part 4)


**Starting Chapter:** 3.10 Joint Probabilities and Independence

---


#### Variance of Bernoulli Distribution
Background context: The variance of a random variable $X $ can be calculated using the formula$\text{Var}(X) = E[(X - \mu)^2]$, where $\mu $ is the expected value. For a Bernoulli distribution, which models a binary outcome with probability $p$, we have two possible outcomes: 0 and 1.
The formula for the variance of a Bernoulli random variable $X$ is:
$$E[(X - p)^2] = p(1-p)$$:p What is the formula to calculate the variance of a Bernoulli distribution?
??x
The variance of a Bernoulli random variable $X\sim \text{Bernoulli}(p)$ is calculated as:
$$\text{Var}(X) = p(1 - p)$$

This formula leverages the definition of variance and the properties of the Bernoulli distribution.
x??

---


#### Law of Total Probability for Discrete Random Variables
The Law of Total Probability extends to random variables, allowing us to break down complex problems into simpler sub-problems. For discrete random variables $X $ and partitioning events$Y = y$, we have:
$$P\{X=k\} = \sum_{y} P\{X=k|Y=y\}P\{Y=y\}.$$

This is a powerful tool for simplifying the calculation of probabilities.

:p What does the Law of Total Probability for Discrete Random Variables state?
??x
The law states that to find the probability $P\{X=k\}$, we can sum over all possible values of $ Y$(the conditioning event) the product of the conditional probability $ P\{X=k|Y=y\}$and the marginal probability $ P\{Y=y\}$.

For example, if we want to find the probability that a geometric random variable $N$ is less than 3:
```java
// P(N < 3) = P(N=1) + P(N=2)
// Using the formula: P(N=k | Y=y) * P(Y=y)
double p = 0.5; // Example parameter for a geometric distribution with success probability p
double prob_N_less_than_3 = (1 - Math.pow(1-p, 1)) + (1 - Math.pow(1-p, 2));
```
x??

---


#### Conditional Expectation and Linearity of Expectation for Discrete Random Variables
The theorem states that the expected value of a random variable $X $ can be computed by summing the conditional expectations given each possible value of another random variable$Y$, weighted by the probability of those values. For discrete random variables, we have:
$$E[X] = \sum_y E[X|Y=y]P\{Y=y\}.$$:p How is the expected value of a discrete random variable derived using conditioning?
??x
The expected value $E[X]$ can be found by summing over all possible values of $Y$(the conditioning event), multiplying the conditional expectation $ E[X|Y=y]$with the probability of each $ Y$:
$$E[X] = \sum_y E[X|Y=y]P\{Y=y\}.$$

For instance, if we want to find the expected number of trials for a geometric distribution:
```java
// E[N | Y=1] * P(Y=1) + E[N | Y=0] * P(Y=0)
double p = 0.5; // Example parameter for a geometric distribution with success probability p
double exp_N = (1/p) * p + (2/p) * (1 - p);
```
x??

---


#### Linearity of Expectation
One of the most powerful theorems in probability, it states that for any random variables $X $ and$Y$, the expected value of their sum is equal to the sum of their individual expected values:
$$E[X + Y] = E[X] + E[Y].$$:p What does the Linearity of Expectation theorem state?
??x
The linearity of expectation states that for any random variables $X $ and$Y$, the expected value of their sum is equal to the sum of their individual expected values:
$$E[X + Y] = E[X] + E[Y].$$

This holds true even if $X $ and$Y$ are not independent.

For example, when calculating the expected number of heads in two coin flips:
```java
// Let X1 and X2 be the outcomes of two coin flips
double exp_X1_plus_X2 = 0.5 + 0.5; // Each flip has an expected value of 0.5
```
x??

---


#### Central Limit Theorem (CLT)
Background context: The Central Limit Theorem is a fundamental theorem in probability theory that states, under certain conditions, the sum of a large number of independent and identically distributed (i.i.d.) random variables will tend to be normally distributed.

Given:
- Let $X_1, X_2, \ldots, X_n $ be i.i.d. random variables with mean$\mu $ and variance$\sigma^2$.
- Define the sum of these variables as $S_n = X_1 + X_2 + \cdots + X_n$.

Relevant formulas:
$$E[S_n] = n\mu$$
$$

Var(S_n) = n\sigma^2$$

The standard deviation is then $\sqrt{n}\sigma$. 

Let $Z_n$ be defined as:
$$Z_n = \frac{S_n - n\mu}{\sigma\sqrt{n}}$$

Relevant formulas for $Z_n$:
- Mean: 0
- Standard Deviation: 1

:p What is the Central Limit Theorem (CLT)?
??x
The Central Limit Theorem states that if we have a sequence of i.i.d. random variables $X_1, X_2, \ldots, X_n $ with mean$\mu $ and variance$\sigma^2 $, then as $ n$ becomes large, the sum of these variables, normalized by subtracting their mean and dividing by the standard deviation, will approximately follow a normal distribution.

Formally:
$$Z_n = \frac{S_n - n\mu}{\sigma\sqrt{n}}$$where
- $E[Z_n] = 0 $-$ Var(Z_n) = 1 $Thus, as$ n $approaches infinity, the cumulative distribution function (CDF) of$ Z_n$ converges to the standard normal CDF.
x??

---

