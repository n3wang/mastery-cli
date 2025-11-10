# High-Quality Flashcards: 7A003--Performance-modeling-and-design-of-computer-systems_processed (Part 5)


**Starting Chapter:** 3.15 Sum of a Random Number of Random Variables

---


#### Normal Approximation for Sum of Uniform Random Variables
Background context: The provided text explains how to use the normal approximation to estimate probabilities when dealing with sums of uniform random variables. Specifically, it uses the properties of the normal distribution and the Central Limit Theorem (CLT).

:p What is the probability that the absolute value of the total noise from 100 signals is less than 10?
??x
The probability can be approximated using the Normal distribution.

Given each source produces an amount of noise \( X_i \) uniformly distributed between -1 and 1:
- Mean: \( \mu_X = 0 \)
- Variance: \( \sigma^2_X = \frac{(b-a)^2}{12} = \frac{4}{12} = \frac{1}{3} \)

For the sum of 100 such sources, \( S_{100} = X_1 + X_2 + \ldots + X_{100} \):
- Mean: \( E[S_{100}] = n\mu_X = 100 \times 0 = 0 \)
- Variance: \( Var(S_{100}) = n\sigma^2_X = 100 \times \frac{1}{3} = \frac{100}{3} \)

Therefore, \( S_{100} \sim N(0, \frac{100}{3}) \).

We need to find \( P(|S_{100}| < 10) \):
\[ P(-10 < S_{100} < 10) = P\left(\frac{-10 - 0}{\sqrt{\frac{100}{3}}} < \frac{S_{100} - 0}{\sqrt{\frac{100}{3}} < \frac{10 - 0}{\sqrt{\frac{100}{3}}}\right) = P\left(-3.46 < Z < 3.46\right) \approx 2\Phi(3.46) - 1 \]

Using standard normal distribution tables or a calculator:
\[ 2 \Phi(3.46) - 1 \approx 2 (0.999758) - 1 = 0.999516 \]

Thus, the approximate probability that the absolute value of the total amount of noise from the 100 signals is less than 10 is approximately \( 0.9995 \), which means the signal gets corrupted with a probability less than 10 percent.
??x
The answer with detailed explanations:
We know each source produces an amount of noise uniformly distributed between -1 and 1, so the mean \( \mu_X = 0 \) and variance \( \sigma^2_X = \frac{4}{12} = \frac{1}{3} \). For 100 such sources, \( S_{100} \sim N(0, \frac{100}{3}) \).

To find the probability that the absolute value of the total noise is less than 10:
\[ P(-10 < S_{100} < 10) = P\left(\frac{-10 - 0}{\sqrt{\frac{100}{3}}} < Z < \frac{10 - 0}{\sqrt{\frac{100}{3}}}\right) = P(-3.46 < Z < 3.46) \]

Using the standard normal distribution \( Z \):
\[ P(-3.46 < Z < 3.46) \approx 2\Phi(3.46) - 1 \]
where \( \Phi(x) \) is the cumulative distribution function (CDF) of the standard normal distribution.

From tables or a calculator:
\[ 2\Phi(3.46) - 1 = 2 \times 0.999758 - 1 = 0.999516 \]

Thus, the probability is approximately \( 0.9995 \).
x??

---


#### Sum of a Random Number of Random Variables
Background context: The text discusses how to handle scenarios where the number of random variables to be summed is itself a random variable. Specifically, it introduces the concept of \( S = \sum_{i=1}^N X_i \) where \( N \) and \( X_i \) are i.i.d. random variables.

:p Why can’t we directly apply Linearity of Expectation in this scenario?
??x
Linearity of expectation only applies when \( N \) is a constant, but here \( N \) itself is a random variable.
??x
The answer with detailed explanations:
Linearity of expectation states that if \( X_1, X_2, \ldots, X_n \) are i.i.d. and \( N \) is a constant, then:

\[ E\left[\sum_{i=1}^N X_i\right] = E[N]E[X] \]

However, when \( N \) itself is a random variable, this property no longer holds directly.

To handle such cases, we need to condition on the value of \( N \):

\[ E[S] = E\left[\sum_{i=1}^N X_i\right] = \sum_n E\left[\sum_{i=1}^N X_i | N=n\right] P(N=n) \]

Since \( N \) is a random variable, this conditioning allows us to derive the expected value and variance of \( S \).
x??

---


#### Calculating Expected Value and Variance for Sum of Random Variables
Background context: The provided text explains how to calculate the expected value \( E[S] \) and variance \( Var(S|N=n) \) when summing a random number of i.i.d. variables.

:p How can we derive \( E[S^2] \)?
??x
We need to derive \( E[S^2] \) using conditional expectation, starting with \( E\left[\sum_{i=1}^N X_i | N=n\right]^2 \).

First, find \( Var(S|N=n) = nVar(X) \).
Then use this to get:
\[ E[S^2 | N=n] = nVar(X) + n^2 (E[X])^2 \]
??x
The answer with detailed explanations:
To derive \( E[S^2] \), we start by considering the conditional expectation given that \( N=n \):

1. **Conditional Variance**:
   \[ Var(S | N=n) = nVar(X) \]

2. **Conditional Expected Value Squared**:
   Using Theorem 3.27, we have:
   \[ E[S^2|N=n] = Var(S|N=n) + (E[S|N=n])^2 = nVar(X) + n^2(E[X])^2 \]

3. **Expected Value of \( S \)**:
   From the previous section, we know that:
   \[ E[S | N=n] = nE[X] \]

4. **Overall Expected Value Squared**:
   Therefore,
   \[ E[S^2] = \sum_n E\left[S^2|N=n\right] P(N=n) = \sum_n (nVar(X) + n^2(E[X])^2) P(N=n) \]

Thus, \( E[S^2] \) can be derived using the conditional expectations and probabilities of \( N \).
x??

---

---


#### Variance Proof
Background context: The variance formula can be derived using the linearity of expectation. The goal is to prove that \(\text{Var}(X) = E[X^2] - (E[X])^2\).

:p Use Linearity of Expectation to prove that \(\text{Var}(X) = E[X^2] - (E[X])^2\).
??x
The answer: The variance of a random variable \(X\) is defined as:

\[
\text{Var}(X) = E[(X - E[X])^2]
\]

Expanding the square inside the expectation, we get:

\[
(X - E[X])^2 = X^2 - 2XE[X] + (E[X])^2
\]

Taking the expectation of both sides, and using linearity of expectation:

\[
E[(X - E[X])^2] = E[X^2 - 2XE[X] + (E[X])^2]
= E[X^2] - 2E[XE[X]] + E[(E[X])^2]
\]

Since \(E[X]\) is a constant, we can use the property that \(E[aX] = aE[X]\):

\[
E[XE[X]] = E[X \cdot E[X]] = E[X] \cdot E[E[X]] = E[X] \cdot E[X] = (E[X])^2
\]

And:

\[
E[(E[X])^2] = (E[X])^2
\]

Substituting these back into the equation, we get:

\[
\text{Var}(X) = E[X^2] - 2(E[X])^2 + (E[X])^2
= E[X^2] - (E[X])^2
\]

Thus, we have proven that:

\[
\text{Var}(X) = E[X^2] - (E[X])^2
\]
x??

---


#### Assessing Risk
Background context: The problem involves calculating the probability that a flight will have enough seats for all passengers who show up, given that some people might not show up with certain probability. This is an example of a binomial distribution where each passenger independently has a probability \(p\) of showing up.

:p Queueville Airlines sells 52 tickets for a 50-passenger plane, knowing that on average 5% of reservations do not show up. What is the probability that there will be enough seats?
??x
The answer: The problem can be modeled using the binomial distribution where \(X\) represents the number of passengers who actually show up out of 52 tickets sold. Each passenger independently shows up with a probability of \(0.95\).

We need to find \(P(X \leq 50)\), which is the cumulative probability that fewer than or equal to 50 people show up.

Using the binomial distribution formula:

\[
P(X = k) = \binom{n}{k} p^k (1-p)^{n-k}
\]

Where \(n = 52\) and \(p = 0.95\).

However, for practical purposes, we can use a normal approximation to the binomial distribution because \(n\) is large:

\[
X \sim N(np, np(1-p))
\]

Here, \(np = 52 \times 0.95 = 49.4\) and \(\sigma^2 = np(1-p) = 52 \times 0.95 \times 0.05 = 2.47\), so \(\sigma = \sqrt{2.47} \approx 1.57\).

The z-score for \(X = 50\) is:

\[
z = \frac{50 - 49.4}{1.57} \approx 0.38
\]

Using the standard normal distribution table, we find that:

\[
P(Z < 0.38) \approx 0.65
\]

Thus, the probability that there will be enough seats is approximately \(0.65\).

```java
public class FlightRiskExample {
    public static void main(String[] args) {
        double n = 52; // Number of tickets sold
        double p = 0.95; // Probability each passenger shows up

        double mean = n * p;
        double variance = n * p * (1 - p);
        double standardDeviation = Math.sqrt(variance);

        double zScore = (50 - mean) / standardDeviation;
        System.out.println("Z-Score: " + zScore);
    }
}
```
x??

---


#### Practice with Conditional Expectation
Background context: The problem involves computing the conditional expectation \(E[X | Y \neq 1]\), where \(X\) and \(Y\) are jointly distributed random variables. This is a common operation in probability theory to understand how the value of one variable depends on another.

:p For the joint p.m.f. given in Table 3.3, compute \(E[X | Y \neq 1]\).
??x
The answer: First, we need the joint probability mass function (pmf) for \(X\) and \(Y\). Let's assume the table provides values like:

|   | Y=0 | Y=1 | Y=2 |
|---|-----|-----|-----|
| X=0 | 0.1 | 0.3 | 0.4 |
| X=1 | 0.2 | 0.1 | 0.1 |

To find \(E[X | Y \neq 1]\), we need the conditional expectation:

\[
E[X | Y \neq 1] = \sum_x x P(X=x, Y \neq 1) / P(Y \neq 1)
\]

From the table:
- \(P(Y=0) = 0.1 + 0.2 = 0.3\)
- \(P(Y=2) = 0.4 + 0.1 = 0.5\)

So, \(P(Y \neq 1) = P(Y=0) + P(Y=2) = 0.8\).

Now, compute the numerator:

\[
\sum_x x P(X=x, Y \neq 1) = (0 \cdot 0.3) + (1 \cdot 0.5) = 0.5
\]

Thus,

\[
E[X | Y \neq 1] = \frac{0.5}{0.8} = 0.625
\]

The conditional expectation \(E[X | Y \neq 1]\) is \(0.625\).
x??

--- 

Would you like to go through another problem or need further explanations on any of these? Let me know! 
```

---


#### Eric and Timmy's Meeting Probability
Background context: Eric and Timmy each arrive at a time uniformly distributed between 2 and 3 pm. Each waits for 15 minutes.

The steps are:
1. Define the problem in terms of joint distributions.
2. Calculate the probability that their arrival times overlap by more than 15 minutes.

:p What is the probability that Eric and Timmy will meet?
??x
To find the probability, we can use a geometric approach on a unit square where both axes represent time (from 2 to 3 pm).

The area representing successful meetings (Eric and Timmy meet) can be calculated as:
\[ P(\text{Meet}) = \frac{\text{Area of meeting region}}{\text{Total possible area}} = \frac{60^2 - 45^2}{60^2} = \frac{3600 - 2025}{3600} = \frac{1575}{3600} = \frac{7}{16} \]

x??

---


#### Variance of Geometric Distribution

Background context: The geometric distribution \( X \sim \text{Geometric}(p) \) models the number of trials until the first success. We need to prove that the variance of this distribution is given by:
\[ \text{Var}(X) = \frac{1-p}{p^2} \]

:p Compute the variance on the amount of money the man ends up spending to find a wife.

??x
The variance of the geometric distribution can be computed using the hint provided: use conditioning. The key idea is that:
\[ \text{Var}(X) = E[X^2] - (E[X])^2 \]

First, we know from the properties of the geometric distribution that:
\[ E[X] = \frac{1}{p} \]

To find \( E[X^2] \), we use conditioning. Let's condition on the first trial:
- If the first trial is a success (with probability \( p \)), then \( X = 1 \).
- If the first trial is a failure (with probability \( 1-p \)), then \( X = 1 + Y \) where \( Y \sim \text{Geometric}(p) \).

Thus:
\[ E[X^2] = E[E[X^2 | X_1]] \]
where \( X_1 \) is the outcome of the first trial.

If \( X_1 = 1 \), then \( X^2 = 1 \). If \( X_1 = 0 \), then:
\[ E[X^2 | X_1 = 0] = E[(1 + Y)^2] = E[1 + 2Y + Y^2] = 1 + 2E[Y] + E[Y^2] \]

Since \( E[Y] = \frac{1}{p} \) and using the variance formula:
\[ E[Y^2] = (E[Y])^2 + \text{Var}(Y) = \left(\frac{1}{p}\right)^2 + \frac{1-p}{p^2} = \frac{1}{p^2} + \frac{1-p}{p^2} = \frac{2 - p}{p^2} \]

Thus:
\[ E[X^2 | X_1 = 0] = 1 + 2\left(\frac{1}{p}\right) + \frac{2 - p}{p^2} = 1 + \frac{2}{p} + \frac{2}{p^2} - \frac{1}{p^2} = \frac{3p^2 + 2p - 1}{p^2} \]

Combining these:
\[ E[X^2] = p \cdot 1 + (1-p) \left(1 + \frac{2}{p} + \frac{2 - p}{p^2}\right) = 1 + \frac{2(1-p)}{p} + \frac{(1-p)(2-p)}{p^2} \]
\[ E[X^2] = 1 + \frac{2 - 2p}{p} + \frac{2 - p - 2p + p^2}{p^2} = 1 + \frac{2}{p} - 2 + \frac{2}{p^2} - \frac{3}{p^2} + 1 = \frac{1-p+2-2p+2}{p^2} = \frac{3 - p}{p^2} + 1 = \frac{4 - p}{p^2} \]

Thus:
\[ E[X^2] = \frac{4 - p}{p^2} \]

Finally, the variance is:
\[ \text{Var}(X) = E[X^2] - (E[X])^2 = \frac{4 - p}{p^2} - \left(\frac{1}{p}\right)^2 = \frac{4 - p}{p^2} - \frac{1}{p^2} = \frac{3 - p}{p^2} = \frac{1-p}{p^2} \]

---


#### Expectation via Conditioning

Background context: Stacy's fault-tolerant system crashes only if there are \(k\) consecutive failures, with each failure occurring independently with probability \(p\). We need to find the expected number of minutes until the system crashes.

:p What is the expected number of minutes until Stacy’s system crashes?

??x
We can model this problem using a recurrence relation. Let \( T \) be the time until the first crash, which requires \( k \) consecutive failures.

Define:
\[ E[T] = 1 + p(1 + E[T])^k \]

This equation reflects that the expected time is one minute plus the expected additional time if no failure occurs (with probability \( 1-p \)), followed by \( E[T] \).

Solving this recurrence relation for general \( k \) and \( p \):

For simplicity, assume \( k = 1 \):
\[ E[T] = 1 + pE[T] \]
\[ E[T](1 - p) = 1 \]
\[ E[T] = \frac{1}{1-p} \]

For \( k > 1 \), the solution involves more complex algebra, but can be approximated using:
\[ E[T] \approx \frac{k}{p} \]

---


#### Napster – Brought to You by the RIAA

Background context: To collect all songs from a favorite band with 50 songs randomly downloaded until you have all of them. We need to find \(E[D]\) and \(Var(D)\).

:p (a) What is E[D]? Give a closed-form approximation.

??x
The problem can be modeled using the coupon collector's problem. The expected number of downloads required to collect all 50 songs is given by:

\[ E[D] = 50 \left(1 + \frac{1}{2} + \frac{1}{3} + \cdots + \frac{1}{50}\right) \]

This can be approximated using the harmonic series:
\[ H_n \approx \ln(n) + \gamma \]
where \( \gamma \approx 0.5772156649 \).

Thus, for \( n = 50 \):
\[ E[D] \approx 50 (\ln(50) + 0.5772156649) \approx 50 (3.91202300546 + 0.5772156649) \approx 50 \times 4.48923867036 \approx 224.46 \]

---


#### Example: Exponential Distribution
Background context: The exponential distribution is commonly used for modeling the time between events in a Poisson process. Its CDF is given by \( F_X(x) = 1 - e^{-\lambda x} \). We can use the inverse-transform method to generate samples from this distribution.

:p How do you generate an Exponential random variable using the inverse-transform method?
??x
To generate an Exponential random variable with parameter \( \lambda \), we need to find the value of \( x \) such that \( F_X(x) = u \). Given \( F_X(x) = 1 - e^{-\lambda x} \), we solve for \( x \):

\[ 1 - e^{-\lambda x} = u \]
\[ e^{-\lambda x} = 1 - u \]
\[ -\lambda x = \ln(1 - u) \]
\[ x = -\frac{1}{\lambda} \ln(1 - u) \]

Given \( u \in U(0,1) \), setting \( x = -\frac{1}{\lambda} \ln(1 - u) \) produces an instance of \( X \sim \text{Exp}(\lambda) \).
x??

---


#### CDF of Exponential Distribution
Background context: The CDF of an exponential distribution is \( F_X(x) = 1 - e^{-\lambda x} \).

:p What is the CDF for an exponential distribution with parameter \( \lambda \)?
??x
The CDF for an exponential distribution with parameter \( \lambda \) is given by:

\[ F_X(x) = 1 - e^{-\lambda x} \]
x??

---


#### Inverse of Exponential CDF
Background context: The inverse of the CDF for an exponential distribution can be derived to find the value of \( x \) that corresponds to a given uniform random variable \( u \).

:p What is the inverse of the CDF for an exponential distribution?
??x
The inverse of the CDF for an exponential distribution with parameter \( \lambda \) is:

\[ F_X^{-1}(u) = -\frac{1}{\lambda} \ln(1 - u) \]
x??

---

