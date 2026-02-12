# High-Quality Flashcards: 7A003--Performance-modeling-and-design-of-computer-systems_processed (Part 5)


**Starting Chapter:** Chapter 4 Generating Random Variables for Simulation. 4.1 Inverse-Transform Method

---


#### Inverse-Transform Method Overview
The inverse-transform method is used to generate random variables (r.v.) for simulation based on their cumulative distribution function (c.d.f.). This method works by mapping uniform r.v. instances from $(0, 1)$ to the desired distribution's instance $x$.

Background context: The key idea is that if we have a c.d.f., $F_X(x)$, of a random variable $ X$, and this function is invertible (i.e., we can solve for $ x$given $ u = F_X(x)$), then the inverse c.d.f. method allows us to generate samples from $ X$.

Formula: The relationship between $u $ and$x$ is given by:
$$u = F_X(x) \Rightarrow x = F_X^{-1}(u).$$:p What is the basic idea of the Inverse-Transform Method?
??x
The basic idea is to map a uniform random variable $u \in (0, 1)$ using the inverse cumulative distribution function $F_X^{-1}$ to generate an instance of the desired random variable $X$.
```java
// Pseudocode for generating X from Exp(λ)
double u = Math.random(); // Generate a uniform random number in [0, 1]
double x = -Math.log(1 - u) / lambda; // Apply inverse cdf to get exponential distribution
```
x??

#### Continuous Case Inverse-Transform Method
In the continuous case of the inverse-transform method, we want to map each instance of a uniform r.v. $u \in U(0, 1)$ to an instance of the random variable $X$, where $ X$has c.d.f.$ F_X$.

Background context: We assume without loss of generality that $X $ ranges from 0 to infinity. The mapping should be such that the probability of outputting a value between 0 and$x $ is equal to the probability given by the c.d.f., i.e.,$ P{0 < X < x} = F_X(x)$.

Formula: Given $u \in U(0, 1)$, we want:
$$u = F_X(x) \Rightarrow x = F_X^{-1}(u).$$:p How do you map a uniform random variable to an instance of the desired continuous random variable in the inverse-transform method?
??x
To map a uniform random variable $u $ to an instance of the desired continuous random variable$X$, we use the inverse cumulative distribution function:
$$u = F_X(x) \Rightarrow x = F_X^{-1}(u).$$

For example, for the Exponential distribution with rate parameter $\lambda$:
```java
// Pseudocode for generating an Exp(λ) instance using Inverse-Transform Method
double u = Math.random(); // Generate a uniform random number in [0, 1]
double x = -Math.log(1 - u) / lambda; // Apply inverse cdf to get exponential distribution
```
x??

#### Example: Generating Exponential Random Variable
The specific example given is for generating an instance of $X \sim \text{Exp}(\lambda)$.

Background context: The cumulative distribution function (c.d.f.) for the Exponential distribution with rate parameter $\lambda$ is:
$$F_X(x) = 1 - e^{-\lambda x}.$$

To generate a sample from this distribution, we need to find $x$ such that:
$$u = 1 - e^{-\lambda x} \Rightarrow e^{-\lambda x} = 1 - u \Rightarrow -\lambda x = \ln(1 - u) \Rightarrow x = -\frac{\ln(1 - u)}{\lambda}.$$

Formula: The transformation is given by:
$$x = -\frac{\ln(1 - u)}{\lambda}.$$:p How do you generate an instance of the Exponential distribution with rate parameter $\lambda$ using the inverse-transform method?
??x
To generate an instance of the Exponential distribution with rate parameter $\lambda$, we use:
$$x = -\frac{\ln(1 - u)}{\lambda},$$where $ u $ is a uniform random variable in $[0, 1]$. This transformation maps the uniform random variable to the desired exponential distribution.

Example code:
```java
// Pseudocode for generating Exp(λ) instance using Inverse-Transform Method
double u = Math.random(); // Generate a uniform random number in [0, 1]
double x = -Math.log(1 - u) / lambda; // Apply inverse cdf to get exponential distribution
```
x??

---


#### Discrete Random Variable Generation
Background context: The discrete case involves generating a random variable $X$ that takes on specific values with certain probabilities. This can be represented as:
$$X = \begin{cases} 
x_0 & \text{with probability } p_0 \\
x_1 & \text{with probability } p_1 \\
\vdots \\
x_k & \text{with probability } p_k 
\end{cases}$$

The cumulative distribution function (CDF)$F_X(x) = P(X \leq x)$ is used to generate the random variable. The algorithm involves generating a uniform random variable $U \in [0, 1]$ and comparing it against the CDF values.
:p How does one generate a discrete random variable using its cumulative distribution function?
??x
The process starts by arranging the possible values of $X $ in increasing order:$x_0 < x_1 < \ldots < x_k $. Then, generate a uniform random number$ U \in [0, 1]$. Based on the value of $ U$, the corresponding output is determined as follows:
- If $0 < U \leq p_0 $, then $ X = x_0$.
- If $p_0 < U \leq p_0 + p_1 $, then $ X = x_1$.
- And so on.

This method requires knowing the CDF and being able to invert it, which might not always be practical.
```java
public class DiscreteRVGenerator {
    private double[] cdf; // cumulative distribution function values
    
    public DiscreteRVGenerator(double[] probabilities) {
        this.cdf = new double[probabilities.length + 1];
        for (int i = 0; i < probabilities.length; i++) {
            cdf[i + 1] = cdf[i] + probabilities[i];
        }
    }
    
    public int generateDiscreteRV() {
        double u = Math.random(); // Generate a uniform random number in [0, 1]
        for (int i = 1; i < cdf.length; i++) {
            if (u <= cdf[i]) {
                return i - 1;
            }
        }
        return cdf.length - 2;
    }
}
```
x??

---

#### Accept-Reject Method for Discrete Random Variables
Background context: The Accept-Reject method is an alternative to the Inverse-Transform method when we only know the probability mass function (pmf) $p_j $ but not the cumulative distribution function. This method involves generating instances of a known random variable$Q$ and accepting or rejecting them based on their acceptance probabilities.

The general structure requires:
1. A random variable $Q $ with pmf$q_j$.
2. A target random variable $P $ with desired pmf$p_j$.

For each value $j $, the condition is that $ q_j > 0 \iff p_j > 0 $. The acceptance probability for$ j $ when generating from $ Q $ is $\frac{p_j}{q_j}$.
:p What are the two main ideas in the Accept-Reject method for generating discrete random variables?
??x
Idea #1: Generate an instance of $Q $, and accept it with probability $ p_j$. This approach has the disadvantage that if the number of possible values is high, most probabilities might be very low, leading to a potentially large number of rejections.

Idea #2: Accept an instance of $j $ from$Q $ with probability$\frac{p_j}{q_j}$, and reject it with probability $1 - \frac{p_j}{q_j}$. This approach ensures that the acceptance is more likely when $ q_j$is low, compensating for the low probabilities of $ p_j$.

The key challenge in Idea #2 is ensuring that $p_j \leq c \cdot q_j $, where $ c$ is a normalizing constant. The algorithm proceeds as follows:
1. Find a suitable random variable $Q $ such that its pmf$q_j > 0 \iff p_j > 0$.
2. Generate an instance of $Q $, and call it $ j$.
3. Generate a uniform random number $U \in (0, 1)$.
4. If $U < \frac{p_j}{c \cdot q_j}$, return $ P = j$; else go back to step 2.

The acceptance probability for each value is calculated as:
$$P\{P \text{ ends up being set to } j\} = \frac{q_j \cdot p_j / c}{1/c} = p_j$$

On average, the number of iterations needed before accepting a value is $c$.
```java
public class AcceptRejectDiscreteGenerator {
    private double[] q; // pmf of Q
    private double[] p; // pmf of P
    private double c;   // normalization constant

    public AcceptRejectDiscreteGenerator(double[] q, double[] p) {
        this.q = q;
        this.p = p;
        this.c = 0.0;
        
        for (int i = 0; i < p.length; i++) {
            if (q[i] > 0 && p[i] / q[i] > c) c = p[i] / q[i];
        }
    }

    public int generateDiscreteRV() {
        while (true) {
            int j = // Generate an instance of Q
            double u = Math.random(); // Generate a uniform random number in [0, 1]
            if (u < p[j] / (c * q[j])) return j;
        }
    }
}
```
x??

---

#### Accept-Reject Method for Continuous Random Variables
Background context: The Accept-Reject method can also be applied to continuous distributions. For a normal random variable $N \sim \text{Normal}(0,1)$, the idea is to generate an absolute value of another exponentially distributed variable and then adjust by multiplying with $-1$ with probability 0.5.

The target distribution for $X = |N|$ has the following pmf:
$$f_X(t) = \frac{2}{\sqrt{2\pi}} e^{-t^2/2}, \quad t > 0$$

We choose an exponential distribution as a proposal, which is easier to generate from.
:p How can we use the Accept-Reject method to generate a normal random variable?
??x
The process involves:
1. Generating $Y \sim \text{Exp}(1)$.
2. Setting $U = 0.5 \cdot (1 - e^{-t})$, where $ t$is generated from $ Y$.
3. Accepting or rejecting based on the ratio of densities.

The key steps are:
- Generate $T \sim \text{Exp}(1)$.
- Calculate $U = 0.5 \cdot (1 - e^{-T})$.
- If a uniform random variable $V \in [0,1] < U $, then accept and return $ X = T$; otherwise, reject.

The average number of iterations needed is the normalizing constant $c$.

```java
public class AcceptRejectNormalGenerator {
    private double c; // normalization constant

    public AcceptRejectNormalGenerator() {
        this.c = 1.3; // Approximate value based on calculations
    }

    public double generateNormalRV() {
        while (true) {
            double t = -Math.log(Math.random()); // Generate T from Exp(1)
            double u = Math.random(); // Generate a uniform random number in [0, 1]
            if (u < (2 * Math.exp(-t * t / 2)) / c) return t;
        }
    }
}
```
x??

---

#### Accept-Reject Method for Poisson Random Variables
Background context: The Inverse-Transform method does not work well when the cumulative distribution function is difficult to invert, such as in the case of a Poisson random variable. Instead, we can use the Accept-Reject method by finding a suitable proposal distribution that fits reasonably well.

For a Poisson random variable with mean $\lambda$, the pmf is:
$$P(X = i) = e^{-\lambda} \frac{\lambda^i}{i!}, \quad i = 0, 1, 2, \ldots$$

A common choice for a proposal distribution is an exponential distribution.
:p How does the Accept-Reject method help in generating Poisson random variables?
??x
The approach involves:
1. Choosing a proposal distribution $Y \sim \text{Exp}(1)$.
2. Generating an instance of $Y$, and using it to generate the target value based on the ratio of densities.
3. Accepting or rejecting the generated value.

The key steps are:
- Generate $T \sim \text{Exp}(1)$.
- Calculate the acceptance probability as a function of $T$.
- If a uniform random variable $U \in [0, 1] < \text{acceptance probability}$, then accept and return; otherwise, reject.

This method requires careful selection of the proposal distribution to ensure that the acceptance probability is not too low.
```java
public class AcceptRejectPoissonGenerator {
    private double lambda; // mean of Poisson distribution
    
    public AcceptRejectPoissonGenerator(double lambda) {
        this.lambda = lambda;
    }

    public int generatePoissonRV() {
        while (true) {
            double t = -Math.log(Math.random()); // Generate T from Exp(1)
            if (Math.random() < Math.exp(-lambda) * Math.pow(lambda, (int)t) / factorial((int)t)) return (int)t;
        }
    }

    private int factorial(int n) {
        if (n <= 1) return 1;
        return n * factorial(n - 1);
    }
}
```
x??

---

#### Poisson Random Variable with Infeasible CDF
Background context: The Inverse-Transform method fails when the cumulative distribution function $F(i) = P(X \leq i)$ is not easily invertible, such as in the case of a Poisson random variable. An alternative approach like the Accept-Reject method or other specialized algorithms are needed.

The problem with directly applying the Inverse-Transform method for Poisson variables lies in the complexity of calculating $F(i)$.
:p Why does the Inverse-Transform method not work well for generating Poisson random variables?
??x
The Inverse-Transform method requires an easy-to-invert cumulative distribution function. For a Poisson random variable, the CDF is:
$$F(i) = e^{-\lambda} \sum_{k=0}^{i} \frac{\lambda^k}{k!}$$

This sum does not have a closed-form solution that can be easily inverted to generate the random variable directly. Therefore, other methods like the Accept-Reject method are more suitable.
```java
// No code example needed as this is an explanation of the method's limitations.
```
x??

--- 

These flashcards cover the key concepts in the provided text, focusing on the generation of discrete and continuous random variables using both the Inverse-Transform and Accept-Reject methods. Each card includes context, relevant formulas, and code examples where appropriate to aid understanding.


#### Generating Poisson Random Variables from Exponential Random Variables

In Chapter 11, we learn that the Poisson distribution can be viewed as counting instances of an Exponentially distributed random variable. This method allows us to generate Poisson random variables by generating many instances of exponential random variables.

:p How can you use exponentially distributed random variables to generate a Poisson random variable?
??x
To generate a Poisson random variable using exponentially distributed random variables, we follow these steps:
1. Generate an Exponential random variable $T $ with rate$\lambda$.
2. Count the number of events that occur in time $T $. This count follows a Poisson distribution with parameter $\lambda T$.

For example, if you generate 5 exponentially distributed random variables and they sum up to 3 units of time, then the number of occurrences counted is a Poisson random variable with an average rate of 3.

```java
import java.util.Random;

public class ExponentialToPoisson {
    public static void main(String[] args) {
        Random rand = new Random();
        double lambda = 1.0; // Rate parameter for the exponential distribution
        
        // Simulate time T using an exponential random variable
        double T = -Math.log(1 - rand.nextDouble()) / lambda;
        
        // Count number of events (occurrences)
        int count = 0;
        while(T > 0) {
            T -= -Math.log(1 - rand.nextDouble()) / lambda; // Subtract another exponential random variable from T
            count++;
        }
        
        System.out.println("Poisson random variable value: " + count);
    }
}
```
x??

---

#### Algorithm for Generating a Random Variable with Specific Density Function

The problem describes generating a random variable (r.v.) having the density function $f(x) = 30( x^2 - 2x^3 + x^4)$, where $0 \leq x \leq 1$.

:p How do you generate a random variable with the given density function?
??x
To generate a random variable with the specified density function, we can use methods like inverse transform sampling or acceptance-rejection method. Here, an appropriate approach might be the inverse transform method since the cumulative distribution function (CDF) is straightforward to derive and invert.

The CDF $F(x)$ for the given density function $f(x)$ is:
$$F(x) = \int_{0}^{x} 30(y^2 - 2y^3 + y^4) dy$$

First, compute the integral:
$$

F(x) = 10x^3 - 15x^4 + \frac{30}{5} x^5 = 10x^3 - 15x^4 + 6x^5$$

Then, invert $F(x)$.

:p The code to generate a random variable with the given density function.
??x
Here is an example in Java of generating a random variable using inverse transform sampling:

```java
import java.util.Random;

public class GenerateRandomVariable {
    public static double generateRandomVariable() {
        Random rand = new Random();
        double u = rand.nextDouble(); // Generate a uniform random number
        
        // Invert the CDF to get the quantile function
        return Math.pow((15 * Math.cbrt(u) + 3), (1.0 / 5));
    }
    
    public static void main(String[] args) {
        for (int i = 0; i < 10; ++i) {
            System.out.println("Random variable value: " + generateRandomVariable());
        }
    }
}
```

x??

---

#### Inverse-Transform Method for Continuous Distributions

The inverse transform method is a technique used to generate random variables from any continuous distribution when the cumulative distribution function (CDF) $F(x)$ can be inverted. Given a uniform random variable $U(0,1)$, we use the CDF and its inverse to get a sample from the desired distribution.

Given the density function:
$$f(t) = \frac{5}{4} t - 2$$where $1 < t < 5$.

First, find the cumulative distribution function (CDF):
$$F(t) = \int_{1}^{t} (\frac{5}{4} y - 2) dy = \left[ \frac{5}{8} y^2 - 2y \right]_1^t = \frac{5}{8} t^2 - 2t + \frac{9}{8}$$

Then, invert the CDF:
$$u = F(t) = \frac{5}{8} t^2 - 2t + \frac{9}{8}$$

Solve for $t$:
$$0 = \frac{5}{8} t^2 - 2t + \left( \frac{9}{8} - u \right)$$:p Use the inverse-transform method to generate a random variable from the given density function.
??x
To use the inverse transform method for generating a random variable with the given density function, follow these steps:

1. Generate a uniform random number $u$ in the range (0, 1).
2. Invert the cumulative distribution function (CDF) to get the value of $t$.

Given the CDF:
$$F(t) = \frac{5}{8} t^2 - 2t + \frac{9}{8}$$

We need to solve for $t$ from the equation:
$$u = \frac{5}{8} t^2 - 2t + \frac{9}{8}$$

This is a quadratic equation in $t$:
$$\frac{5}{8} t^2 - 2t + \left( \frac{9}{8} - u \right) = 0$$

Solve for $t$ using the quadratic formula:
$$t = \frac{-b \pm \sqrt{b^2 - 4ac}}{2a}$$where $ a = \frac{5}{8}$,$ b = -2 $, and$ c = \frac{9}{8} - u$.

The code implementation in Java is as follows:

```java
public class InverseTransform {
    public static double generateRandomVariable() {
        Random rand = new Random();
        double u = rand.nextDouble(); // Generate a uniform random number
        
        // Coefficients for the quadratic equation
        double a = 5.0 / 8;
        double b = -2;
        double c = (9.0 / 8) - u;

        // Calculate discriminant
        double discriminant = Math.sqrt(b * b - 4 * a * c);

        // Calculate the two solutions using quadratic formula
        double t1 = (-b + discriminant) / (2 * a);
        double t2 = (-b - discriminant) / (2 * a);

        // Select the appropriate solution based on the range
        return Math.max(t1, t2); // Ensure t is within [1, 5]
    }

    public static void main(String[] args) {
        for (int i = 0; i < 10; ++i) {
            System.out.println("Random variable value: " + generateRandomVariable());
        }
    }
}
```

x??

---

#### Simulation of M/M/1 Queue

The simulation involves modeling a single-server queue with both job arrivals and service times following exponential distributions. The job sizes are distributed according to an exponential distribution with parameter $\mu = 1 $, and the interarrival times between jobs are i.i.d. exponentially distributed with parameter $\lambda$.

Three cases of interest: $\lambda = 0.5 $, $\lambda = 0.7 $, and $\lambda = 0.9 $. The goal is to measure the mean response time $ E[T]$ for each load level.

:p Simulate a single M/M/1 queue with given parameters.
??x
To simulate an M/M/1 queue, we follow these steps:

1. Initialize the system state: start in the empty state.
2. Generate interarrival times using an exponential distribution with parameter $\lambda$.
3. For each job arrival:
   - Start a timer for service time using an exponential distribution with parameter $\mu = 1$.
   - Calculate the response time as the sum of the wait and service times.
4. After running the system from empty state for 2,000 arrivals, record the response time experienced by the 2,001st arrival.
5. Perform this simulation independently $n = 200$ times to get a mean response time.

Here is an example in Java:

```java
import java.util.Random;

public class MM1QueueSimulation {
    public static void main(String[] args) {
        double lambda = 0.7; // Interarrival rate parameter
        int nRuns = 200;
        long totalResponseTime = 0;
        
        for (int run = 0; run < nRuns; ++run) {
            Random rand = new Random();
            
            // Simulate from the empty state
            double currentTime = 0.0;
            while(currentTime <= 2000.0) {
                // Generate interarrival time
                double arrivalTime = -Math.log(1 - rand.nextDouble()) / lambda;
                
                // Update current time
                currentTime += arrivalTime;
                
                // Start service timer for the arriving job
                double serviceStart = currentTime;
                double serviceTime = -Math.log(1 - rand.nextDouble());
                
                // Calculate response time (wait + service)
                totalResponseTime += (currentTime - serviceStart) + serviceTime;
            }
        }
        
        System.out.println("Mean response time: " + totalResponseTime / nRuns);
    }
}
```

x??

---

