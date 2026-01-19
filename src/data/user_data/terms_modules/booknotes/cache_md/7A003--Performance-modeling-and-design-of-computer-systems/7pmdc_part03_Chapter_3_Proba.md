# High-Quality Flashcards: 7A003--Performance-modeling-and-design-of-computer-systems_processed (Part 3)


**Starting Chapter:** Chapter 3 Probability Review. 3.8 Probabilities and Densities

---


#### Sample Space and Events
Background context: The sample space, denoted by $\Omega $, is the set of all possible outcomes of an experiment. An event $ E $is any subset of the sample space$\Omega$. For example, if we roll two dice, each outcome can be represented as a pair (i,j) where i and j are the results of the first and second rolls respectively. There are 36 such outcomes in total.

:p What is an event $E $ defined on the sample space$\Omega$?
??x
An event $E $ defined on the sample space$\Omega $ is any subset of$\Omega $. For instance, if we roll two dice, the event $ E = \{(1,3) \text{ or } (2,2) \text{ or } (3,1)\}$ represents the set where the sum of the dice rolls is 4.
x??

---

#### Mutually Exclusive Events
Background context: Two events $E_1 $ and$E_2 $ are mutually exclusive if their intersection is empty, i.e.,$ E_1 \cap E_2 = \emptyset$. This means that if one event occurs, the other cannot occur.

:p Are the events $E_1 $ and$E_2$ defined in Figure 3.1 independent or mutually exclusive?
??x
The events $E_1 $ and$E_2 $ are not independent; they are mutually exclusive because their intersection is empty ($ E_1 \cap E_2 = \emptyset$). This means that if one event occurs, the other cannot occur.
x??

---

#### Probability of Events
Background context: The probability of an event $E $, denoted by $ P(E)$, is defined as the sum of the probabilities of the sample points in $ E$. If each sample point has an equal probability of occurring (as in the dice rolling example where each outcome has a probability of $\frac{1}{36}$), then:
$$P(E) = \sum_{x \in E} P(x)$$where $ P(x)$ is the probability of the individual sample point.

:p How do you calculate the probability of an event $E$ in terms of its constituent sample points?
??x
The probability of an event $E $ is calculated as the sum of the probabilities of the sample points that make up$E $. If each sample point has a probability of $\frac{1}{36}$, then:
$$P(E) = \sum_{x \in E} P(x) = \text{number of elements in } E \times \frac{1}{36}$$

For example, if $E $ is the event that the sum of two dice rolls equals 4, and there are three sample points (1,3), (2,2), and (3,1) in$E$, then:
$$P(E) = 3 \times \frac{1}{36} = \frac{3}{36} = \frac{1}{12}$$x??

---
These flashcards cover the key concepts from the provided text, focusing on understanding and application rather than pure memorization.


#### Sample Space Probability
Background context: The probability of the sample space Ω is defined to be 1. This means that at least one outcome must occur from all possible outcomes. 
The definition of probability for the union of two events E and F is given by:
$$

P{E \cup F} = P{E} + P{F} - P{E \cap F}$$

This formula ensures that overlapping parts (common to both events) are not counted twice.

:p What is the probability of the sample space Ω?
??x
The probability of the sample space Ω is 1, as it encompasses all possible outcomes.
x??

---

#### Union of Events and Inequality
Background context: The inequality $P{E \cup F} \leq P{E} + P{F}$ can be derived from the definition of the union of two events. This inequality shows that the probability of the union cannot exceed the sum of individual probabilities minus their intersection.

:p When is the theorem $P{E \cup F} \leq P{E} + P{F}$ an equality?
??x
Theorem 3.5 becomes an equality when events E and F are mutually exclusive, meaning they have no common outcomes (i.e.,$P{E \cap F} = 0$).
x??

---

#### Probability of Landing a Dart
Background context: In the case of throwing a dart that is equally likely to land anywhere in [0,1], the probability of landing at exactly any single point, like 0.3, is defined as 0 because there are infinitely many points and each has zero probability.

:p What is the probability that the dart lands at exactly 0.3?
??x
The probability of the dart landing at exactly 0.3 is 0.
x??

---

#### Conditional Probability
Background context: The conditional probability $P{E|F}$ represents the probability of event E occurring given that event F has occurred, and it is calculated as:
$$P{E|F} = \frac{P{E \cap F}}{P{F}}, \text{ where } P{F} > 0.$$

This concept narrows down the sample space to points in F.

:p How is the conditional probability $P{E|F}$ defined?
??x
The conditional probability of event E given that event F has occurred is defined as:
$$P{E|F} = \frac{P{E \cap F}}{P{F}}, \text{ where } P{F} > 0.$$

This formula adjusts the probability of E based on the occurrence of F.
x??

---

#### Independent Events
Background context: Two events E and F are independent if their intersection's probability equals the product of their individual probabilities:
$$

P{E \cap F} = P{E} \cdot P{F}.$$

If E and F are independent, then the conditional probability $P{E|F}$ is equal to the marginal probability $P{E}$.

:p If events E and F are independent, what is $P{E|F}$?
??x
If events E and F are independent, the conditional probability $P{E|F}$ is equal to $P{E}$:
$$P{E|F} = P{E}.$$

This means that the occurrence of event F does not affect the probability of event E.
x??

---


#### Mutual Exclusivity and Independence of Events
Background context: Two events are mutually exclusive if they cannot occur at the same time. For independent events, the occurrence of one does not affect the probability of the other. However, mutual exclusivity and independence are different properties; a pair of mutually exclusive events can never be independent unless at least one has zero probability (which is non-null in this context).

:p Can two mutually exclusive (non-null) events ever be independent?
??x
No, because if E and F are mutually exclusive,$P(E \cap F) = 0 $. For independence, we need $ P(E|F) = P(E)$, but since $ P(E \cap F) = 0$ for mutually exclusive events (and neither is zero), this cannot hold true.
x??

---

#### Dice Rolling Events Independence
Background context: Two events are independent if the occurrence of one does not affect the probability of the other. In a dice rolling scenario, we can determine independence by calculating conditional probabilities and comparing them.

:p Are the following pairs of events independent when rolling two dice?
1.$E_1 $= "First roll is 6" and $ E_2$= "Second roll is 6"
2.$E_1 $= "Sum of the rolls is 7" and $ E_2$= "Second roll is 4"
??x
1. Yes, because the outcome of the first die does not affect the second.
2. Yes, because knowing the sum of 7 does not change the probability that the second roll is a 4 (it must be a 3).
x??

---

#### Conditional Independence vs. Independence
Background context: Conditional independence given an event $G $ means that the occurrence of events$E $ and$F $ are independent given the information provided by$G $. This does not imply that $ E $and$ F $are necessarily independent without conditioning on$ G$.

:p Are $E_1 = "Sum of the rolls is 8"$ and $E_2 = "Second roll is 4"$ conditionally independent given an event $G$?
??x
No, because we need to check if $P(E_1 \cap E_2 | G) = P(E_1|G) \cdot P(E_2|G)$, and without a specific $ G$, this is not necessarily true. The sum being 8 restricts the outcomes for both dice.
x??

---

#### Law of Total Probability
Background context: This theorem states that an event can be expressed as the union of its intersections with a partition of the sample space, allowing us to calculate the probability by conditioning on each part of the partition.

:p Use the law of total probability to find $P(E)$ given a set of mutually exclusive and exhaustive events $F_1, F_2, ..., F_n$.
??x
$$P(E) = \sum_{i=1}^{n} P(E|F_i) \cdot P(F_i)$$

This can be broken down as:
- $E $ is the union of$E \cap F_i $ for all$i$.
- The events $E \cap F_i$ are mutually exclusive.
x??

---

#### Conditional Probability and Independence
Background context: Conditional probability allows us to find the likelihood of an event given that another has occurred. Bayes' Law helps in calculating reverse conditional probabilities.

:p Explain why the solution for the transaction failure scenario is incorrect?
??x
The events "caching failure" and "network failure" are not mutually exclusive, meaning they can both occur simultaneously, which affects their combined probability. Therefore, directly summing the individual conditional probabilities does not account for overlapping cases.
x??

---

#### Bayes' Law Application
Background context: Bayes' Law is used to find $P(F|E)$ given $P(E|F)$, along with other necessary probabilities.

:p Apply Bayes' Law to determine $P{F|E}$ where we know:
- $P{E|F} = \frac{5}{6}$-$ P{F} = 0.01 $-$ P(E) = ?$(unknown, but needed for the calculation)
??x
Using Bayes' Law:
$$P{F|E} = \frac{P{E|F} \cdot P{F}}{P{E}}$$

However, without knowing $P(E)$, we cannot fully calculate it. The formula is:
$$P{F|E} = \frac{\frac{5}{6} \times 0.01}{P{E}}$$x??

---


#### Extended Bayes Law
The theorem provides a way to update probabilities based on new evidence. It is crucial for understanding conditional probabilities in complex scenarios involving multiple conditions.

:p What does Theorem 3.11 (Extended Bayes Law) state, and how can it be applied to the given example?
??x
The Extended Bayes Law states that if $F_1, F_2, \ldots, F_n $ partition the sample space$\Omega$, then:
$$P(F|E) = \frac{P(E|F) \cdot P(F)}{\sum_{j=1}^{n} P(E|F_j) \cdot P(F_j)}$$

For example, in diagnosing a rare disease with a test that is 95% accurate:
- The probability of having the disease given a positive test result can be calculated using Bayes' Rule.
- Here $P(\text{Disease}) = \frac{1}{10000}$, and $ P(\text{Healthy}) = 1 - P(\text{Disease}) = \frac{9999}{10000}$.
- The test gives a positive result with probability:
  - 0.95 for those who have the disease.
  - 0.05 for those who do not.

Thus, the calculation is:
$$P(\text{Disease}|\text{Test Positive}) = \frac{0.95 \cdot \frac{1}{10000}}{0.95 \cdot \frac{1}{10000} + 0.05 \cdot \frac{9999}{10000}} \approx 0.0019$$

This shows the probability that the child has the disease is only about 2 out of 1,000.
x??

---

#### Discrete versus Continuous Random Variables
The distinction between discrete and continuous random variables is essential for understanding different types of outcomes in experiments.

:p What are the key differences between discrete and continuous random variables?
??x
- A **discrete** random variable can take on only a countable number of distinct values. For example, the sum of two dice can be 2 to 12.
- A **continuous** random variable can take any value in an interval or set of intervals. For example, the time until the next arrival at a website.

To illustrate:
- The sum of the rolls of two dice is discrete because it has only specific values (2 through 12).
- The number of arrivals at a website by time $t$ is also discrete as it can take integer values from 0 to infinity.
- Time until the next arrival and CPU requirement are continuous, even though they might be measured in discrete units.

Code Example:
```java
public class RandomVariableExample {
    public static double PDiscreteX(int X) {
        if (X == 3) return 2.0 / 36;
        // Other values...
        return 0; // Default case
    }

    public static double PContinuousT(double t) {
        // Continuous probability density function for time
        return somePDF(t); // Replace with actual PDF logic
    }
}
```
x??

---

#### Law of Total Probability in Context
The law can be applied to various scenarios involving multiple conditions.

:p How does the Law of Total Probability apply to counting arrivals at a website and how is it used to condition on events?
??x
The **Law of Total Probability** states that for any event $N $(e.g., number of arrivals by time $ t $), we can partition the sample space into mutually exclusive and exhaustive events. For example, if we want to find$ P(N > 10)$:

$$P(N > 10) = P(N > 10 | \text{weekday}) \cdot P(\text{weekday}) + P(N > 10 | \text{weekend}) \cdot P(\text{weekend})$$

Here, we consider different conditions (e.g., weekdays and weekends), each with its probability. This is useful for complex scenarios where direct calculation might be difficult.

For instance:
- $P(\text{weekday}) = \frac{5}{7}$-$ P(\text{weekend}) = \frac{2}{7}$ If the probabilities of having more than 10 arrivals given a weekday or weekend are known, they can be used to compute the total probability.

```java
public class TotalProbabilityExample {
    public static double PArrivals(int n) {
        if (n > 10) {
            return 0.5; // Example probability
        }
        return 0;
    }

    public static void main(String[] args) {
        double PWeekday = 5.0 / 7;
        double PWeekend = 2.0 / 7;

        double PTotal = PArrivals(10) * PWeekday + PArrivals(11) * PWeekend;
        System.out.println("Probability of >10 arrivals: " + PTotal);
    }
}
```
x??

---


#### Expectation of a Random Variable (Discrete Case)
Background context: The expectation or mean of a discrete random variable $X$ is calculated by summing all possible values weighted by their probabilities. This concept generalizes to continuous distributions as well, but here we focus on the discrete case.

:p What is the formula for calculating the expectation $E[X]$ of a discrete random variable $X$?
??x
The expectation $E[X]$ of a discrete random variable $X$ can be calculated using the following formula:
$$E[X] = \sum x \cdot P(X=x)$$

This means that you sum up all possible values $x $ weighted by their corresponding probabilities$P(X=x)$.

Example: To find the average cost of lunch over one week, we use the weights (days) and respective costs.
```java
// Example calculation in Java
public class LunchCost {
    public static double calculateAverageLunchCost(int[] daysOfWeek, int[] costs) {
        double total = 0;
        for (int i = 0; i < daysOfWeek.length; i++) {
            total += daysOfWeek[i] * costs[i];
        }
        return total / daysOfWeek.length;
    }

    public static void main(String[] args) {
        int[] daysOfWeek = {1, 1, 0, 0, 0, 0, 1}; // Monday to Sunday
        int[] costs = {7, 7, 5, 5, 5, 0, 2};
        System.out.println(calculateAverageLunchCost(daysOfWeek, costs));
    }
}
```
x??

---

#### Expectation of a Random Variable (Continuous Case)
Background context: For continuous random variables $X$, the expectation is calculated using integration. The integral sums up all possible values weighted by their probability density function.

:p What is the formula for calculating the expectation $E[X]$ of a continuous random variable $X$?
??x
The expectation $E[X]$ of a continuous random variable $X$ can be calculated using the following formula:
$$E[X] = \int_{-\infty}^{\infty} x \cdot f_X(x) \, dx$$where $ f_X(x)$is the probability density function of $ X$.

Example: If we want to find the expected value for a geometric distribution with parameter $p$, we use the formula:
```java
// Example calculation in Java (Pseudo-code)
public class GeometricExpectation {
    public static double calculateGeometricMean(double p) {
        return 1 / p; // Expected number of trials until first success
    }

    public static void main(String[] args) {
        double p = 1.0 / 3; // Probability of success on each trial
        System.out.println(calculateGeometricMean(p));
    }
}
```
x??

---

#### Expectation for Bernoulli Distribution
Background context: A Bernoulli random variable $X $ can take two values, typically 0 and 1, with probabilities$1-p $ and$p$, respectively. The expectation of a Bernoulli random variable is simply the probability of success.

:p If $X \sim \text{Bernoulli}(p)$, what is $ E[X]$?
??x
If $X \sim \text{Bernoulli}(p)$, then the expectation $ E[X]$ is given by:
$$E[X] = 0 \cdot (1-p) + 1 \cdot p = p$$

This means that the expected value of a Bernoulli random variable is just its success probability.

Example: If we flip a biased coin where heads has a probability of $p $, then the expectation of getting heads is simply $ p$.
```java
// Example calculation in Java (Pseudo-code)
public class BernoulliExpectation {
    public static double calculateBernoulliMean(double p) {
        return p; // Expected value
    }

    public static void main(String[] args) {
        double p = 1.0 / 3; // Probability of success
        System.out.println(calculateBernoulliMean(p));
    }
}
```
x??

---

#### Variance of a Random Variable
Background context: The variance measures the spread or dispersion of a random variable around its mean. It is defined as the expected squared difference from the mean.

:p Define the variance $Var(X)$ for a random variable $X$.
??x
The variance $Var(X)$ for a random variable $X$ is defined as:
$$Var(X) = E[(X - E[X])^2]$$

This can also be expressed equivalently as:
$$

Var(X) = E[X^2] - (E[X])^2$$

Explanation: The variance measures the average squared deviation of a random variable from its mean. It is always non-negative and provides insight into how much a random variable deviates from its expected value.

Example: For an exponential distribution with rate parameter $p$, the variance can be derived as follows:
```java
// Example calculation in Java (Pseudo-code)
public class ExponentialVariance {
    public static double calculateExponentialVariance(double p) {
        return 1 / Math.pow(p, 2); // Variance of an exponential distribution
    }

    public static void main(String[] args) {
        double p = 3; // Rate parameter
        System.out.println(calculateExponentialVariance(p));
    }
}
```
x??

---

#### Higher Moments and Expectation of Functions
Background context: The $i $-th moment of a random variable $ X $is the expectation of$ X^i $. More generally, we can consider the expectation of any function$ g(X)$ of a random variable.

:p What is the general formula for calculating the expectation $E[g(X)]$ of a function $g(X)$?
??x
The expectation $E[g(X)]$ of a function $g(X)$ of a random variable $X$ can be calculated as follows:
- For discrete $X$:
$$E[g(X)] = \sum x g(x) \cdot P(X=x)$$- For continuous $ X$:
$$E[g(X)] = \int_{-\infty}^{\infty} g(x) f_X(x) \, dx$$

Example: If we want to find the expected value of $2X^2 + 3 $ for a given random variable$X$, we can use:
```java
// Example calculation in Java (Pseudo-code)
public class FunctionExpectation {
    public static double calculateFunctionMean(double[] values, double[] probabilities) {
        double total = 0;
        for (int i = 0; i < values.length; i++) {
            total += probabilities[i] * g(values[i]);
        }
        return total;
    }

    private static double g(double x) {
        return 2 * Math.pow(x, 2) + 3; // Function g(X)
    }

    public static void main(String[] args) {
        double[] values = {0, 1, 2};
        double[] probabilities = {0.2, 0.5, 0.3};
        System.out.println(calculateFunctionMean(values, probabilities));
    }
}
```
x??

---


#### Conditional Probabilities and Expectations for Discrete Random Variables

Background context: Conditional probabilities extend the concept of conditional events to random variables. This is particularly useful when we want to understand how the probability distribution of one random variable changes given some information about another.

Formula: The conditional probability mass function (p.m.f.) of a discrete r.v. $X $ given an event$A$ is defined as:
$$p_X|A(x) = \frac{P(X=x, A)}{P(A)} = \frac{P((X=x) \cap A)}{P(A)}$$:p What is the definition of the conditional probability mass function for a discrete random variable given an event?
??x
The conditional probability mass function $p_X|A(x)$ is defined as the probability that the random variable $X$ takes on the value $x$, given that the event $ A$has occurred. It can be expressed as:
$$p_X|A(x) = \frac{P(X=x, A)}{P(A)} = \frac{P((X=x) \cap A)}{P(A)}$$

This essentially normalizes the joint probability of $X=x $ and$A $ by the probability of $ A$.

---

#### Conditional Expectation for Discrete Random Variables

Background context: The conditional expectation of a discrete random variable $X $ given an event$A$ is similar to the unconditional expectation but takes into account additional information.

Formula: For a discrete r.v.$X $, the conditional expectation of $ X $given event$ A$is:
$$E[X|A] = \sum_x x \cdot p_X|A(x) = \sum_x x \cdot P(X=x, A) / P(A)$$:p How do you compute the conditional expectation for a discrete random variable?
??x
To compute the conditional expectation $E[X|A]$ for a discrete random variable $X$ given an event $A$, we use the formula:
$$E[X|A] = \sum_x x \cdot p_X|A(x) = \sum_x x \cdot P(X=x, A) / P(A)$$

This means that you sum up the product of each value $x $ and its conditional probability given$A$.

---

#### Example: Hair Color

Background context: This example uses a discrete random variable to categorize people based on their hair color. The goal is to find probabilities and expectations related to hair colors.

:p What are the steps to compute the conditional expectation of a discrete r.v. in this hair color example?
??x
To compute the conditional expectation of a discrete r.v. $X $(hair color) given event $ A$(light-colored or dark-colored hair), follow these steps:
1. Define the events and their probabilities.
2. Calculate the conditional probability mass function $p_X|A(x)$.
3. Use the formula for conditional expectation:
$$E[X|A] = \sum_x x \cdot p_X|A(x)$$

For instance, if we define "light" as Blonde or Red-haired (values 1 and 2), and "dark" as Brown or Black-haired (values 3 and 4):
- $p_{X}(1) = P\{Blonde\} = 5/38 $-$ p_{X}(2) = P\{Red\} = 2/38 $-$ p_{X}(3) = P\{Brown\} = 17/38 $-$ p_{X}(4) = P\{Black\} = 14/38$The conditional expectation when a person has light-colored hair is:
$$E[X|A] = 1 \cdot p_X|A(1) + 2 \cdot p_X|A(2)$$---

#### Continuous Random Variables and Conditional Expectation

Background context: For continuous r.v.'s, the concept of conditional expectation uses probability density functions (p.d.f.) to describe how the distribution changes given additional information.

Formula: The conditional p.d.f. of a continuous r.v.$X $ given an event$A $, where$ A$is a subset of real numbers with positive probability, is defined as:
$$f_{X|A}(x) = \frac{f_X(x)}{P(X \in A)} \text{ if } x \in A; 0 \text{ otherwise}$$

The conditional expectation of a continuous r.v.$X $ given an event$A$ is:
$$E[X|A] = \int_{-\infty}^{\infty} x f_{X|A}(x) dx = \frac{\int_A x f_X(x) dx}{P(X \in A)}$$:p How do you compute the conditional expectation for a continuous random variable?
??x
To compute the conditional expectation $E[X|A]$ for a continuous r.v.$X $ given an event$A$, use the following steps:
1. Define the subset of real numbers $A$ with positive probability.
2. Compute the p.d.f. of $X $ given$A$:
$$f_{X|A}(x) = \frac{f_X(x)}{P(X \in A)} \text{ if } x \in A; 0 \text{ otherwise}$$3. Integrate the product of $ x $ and the conditional p.d.f. over the subset $ A$:
$$E[X|A] = \int_{-\infty}^{\infty} x f_{X|A}(x) dx = \frac{\int_A x f_X(x) dx}{P(X \in A)}$$---

#### Example: Pittsburgh Supercomputing Center (Continuous Case)

Background context: This example demonstrates how to compute the conditional expectation in a real-world scenario using continuous random variables and exponential distributions.

:p How would you calculate the expected job duration given that it is sent to bin 1?
??x
To calculate the expected job duration given that it is sent to bin 1, follow these steps:
1. Define the event $A$ as the condition that the job is sent to bin 1.
2. Use the conditional p.d.f. of the duration $X $ given$A$:
$$f_{X|Y}(t) = \frac{f_X(t)}{P(Y=1)} = \frac{\lambda e^{-\lambda t}}{P(Y=1)} \text{ if } t < 500; 0 \text{ otherwise}$$3. Integrate the product of $ t $ and the conditional p.d.f. over the range of $ A$:
$$E[X|Y=1] = \int_{-\infty}^{\infty} t f_{X|Y}(t) dt = \int_0^{500} t \cdot \frac{\lambda e^{-\lambda t}}{P(Y=1)} dt$$

For an Exponential distribution with mean 1000 hours:
$$

E[X|Y=1] = \frac{\int_0^{500} t \lambda e^{-\lambda t} dt}{P(Y=1)}$$

Given $P(Y=1) \approx 0.39 $ and$\lambda = \frac{1}{1000}$:
$$E[X|Y=1] \approx \frac{\int_0^{500} t e^{-t/1000} dt}{0.39} \approx 229$$---

#### Example: Uniform Distribution

Background context: This example shows how the expected job duration changes when the distribution is uniform instead of exponential.

:p How does the answer change if the job durations are uniformly distributed between 0 and 2000 hours?
??x
If the job durations are uniformly distributed between 0 and 2000 hours, given that the job is in bin 1 (i.e., less than 500 hours), the expected duration is:
$$

E[X|Y=1] = \frac{500}{2} = 250$$

This result makes sense because the uniform distribution has a linear density function, and the midpoint of the range [0, 500) gives the expected value.

---

#### Expected Value of Exponential Distribution

Background context: The example demonstrates why the expected size of jobs in bin 1 is less than the midpoint of its range when the underlying distribution is exponential.

:p Why is the expected job duration in bin 1 less than 250 hours?
??x
The expected value for an exponentially distributed random variable $X $ with mean$\mu = 1000$ hours is:
$$E[X] = \mu = 1000$$

When we consider only the values between 0 and 500, the distribution of $X|Y=1 $(where$ Y=1$ means the job duration is less than 500) has a truncated exponential distribution. The expected value for such a truncated distribution is:
$$E[X|Y=1] = \int_0^{500} x f_{X|Y}(x) dx / P(Y=1)$$

Since the exponential distribution gives more weight to smaller values, the expected value of the truncated distribution will be less than 250.

---

#### Comparison of Distributions

Background context: This example highlights how different distributions can lead to different expected values even if they have the same mean.

:p How would the answer change for a uniform distribution with the same mean as an exponential distribution?
??x
For a uniform distribution between 0 and 2000 hours, given that the job duration is less than 500, the expected value is:
$$

E[X|Y=1] = \frac{500}{2} = 250$$

This result shows that even though both distributions have the same mean (2500/2 = 1000), the shape of the distribution affects the conditional expectation. The uniform distribution, being symmetric and linear, gives a straightforward midpoint as the expected value.

--- 
These flashcards cover key concepts in conditional probabilities and expectations for discrete and continuous random variables. Each card provides a clear explanation and context to aid understanding.

