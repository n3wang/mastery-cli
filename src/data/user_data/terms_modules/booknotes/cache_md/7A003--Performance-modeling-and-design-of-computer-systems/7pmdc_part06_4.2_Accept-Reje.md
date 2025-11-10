# High-Quality Flashcards: 7A003--Performance-modeling-and-design-of-computer-systems_processed (Part 6)


**Starting Chapter:** 4.2 Accept-Reject Method

---


#### Discrete Random Variable Generation Using Cumulative Distribution Function (CDF)
Background context: In the discrete case, we generate a random variable \(X\) that takes on values \(x_0, x_1, \ldots, x_k\) with probabilities \(p_0, p_1, \ldots, p_k\). The cumulative distribution function (CDF) of \(X\) is given by:
\[ F_X(x) = \sum_{i=0}^{\lfloor x \rfloor} p_i \]
where \(\lfloor x \rfloor\) denotes the largest integer less than or equal to \(x\).
:p How do we generate a discrete random variable using its CDF?
??x
To generate a discrete random variable using its CDF, follow these steps:
1. Arrange the values of \(X\) in ascending order: \(x_0 < x_1 < \ldots < x_k\).
2. Generate a uniform random number \(u\) from the interval \([0, 1]\).
3. If \(0 < u \leq p_0\), return \(x_0\).
4. If \(p_0 < u \leq p_0 + p_1\), return \(x_1\).
5. Continue this process until you find the appropriate interval for \(u\).

This method works well if we have closed-form expressions for partial sums of probabilities, but it can be inefficient when dealing with a large number of values.

```java
public class DiscreteRandomVariableGenerator {
    private double[] cumulativeProbabilities;
    private int[] values;

    public DiscreteRandomVariableGenerator(double[] p) {
        this.values = new int[p.length];
        this.cumulativeProbabilities = new double[p.length + 1];

        // Calculate cumulative probabilities and assign values
        for (int i = 0; i < p.length; i++) {
            values[i] = i;
            if (i == 0) {
                cumulativeProbabilities[i] = p[0];
            } else {
                cumulativeProbabilities[i] = cumulativeProbabilities[i - 1] + p[i];
            }
        }
    }

    public int generateRandomVariable() {
        double u = Math.random(); // Generate a uniform random number in [0, 1]
        for (int i = 0; i < cumulativeProbabilities.length - 1; i++) {
            if (u >= cumulativeProbabilities[i] && u <= cumulativeProbabilities[i + 1]) {
                return values[i];
            }
        }
        return values[values.length - 1]; // Should never reach here
    }
}
```
x??

---


#### Generating Random Variables for Poisson Distribution from Exponential Distributions
Background context: The Poisson distribution can be viewed as counting the number of instances of an Exponentially distributed random variable that occur by a fixed time. This provides another method to generate Poisson random variables, involving generating multiple instances of an Exponential random variable.

:p How can we use Exponential distributions to generate Poisson random variables?
??x
To generate Poisson random variables from Exponential distributions, you need to:
1. Generate Exponential random variables with a fixed rate parameter \(\lambda\).
2. Count the number of events that occur within a given time interval.
3. This count follows a Poisson distribution.

The rate \(\lambda\) is related to the mean arrival rate in a Poisson process, and each Exponential variable represents an interarrival time between events.

Example: If you want to generate a Poisson random variable for arrivals over 10 units of time with a rate \(\lambda = 2\), you would:
- Generate multiple Exponential random variables (each representing the interarrival time).
- Count how many such intervals fit within 10 units of time.

This method is based on the memoryless property of the exponential distribution and the relationship between Poisson and Exponential distributions.
x??

---


#### Inverse-Transform Method for Continuous Distributions
Background context: The inverse-transform method is a technique to generate random variables from any continuous probability distribution. It involves transforming uniform random variables into random variables with the desired distribution.

:p How can we use the inverse-transform method to generate values from a given density function?
??x
To use the inverse-transform method for generating values from a continuous distribution with a given density function \(f(t)\), follow these steps:
1. Find the cumulative distribution function (CDF) \(F(x)\) of the target distribution.
2. Generate a uniform random variable \(U \sim U(0, 1)\).
3. Set \(X = F^{-1}(U)\). The value \(X\) will have the desired distribution.

Given density function: \(f(t) = \frac{5}{4}t - 2\), where \(1 < t < 5\).

To apply this method:
- First, find the CDF of the given density function.
- Then, invert the CDF to get the inverse function \(F^{-1}(u)\).
- Generate a uniform random variable \(U \sim U(0, 1)\), and use it to compute \(X = F^{-1}(U)\).

Example: For the given density function, the CDF is:
\[ F(t) = \int_{1}^{t} \left(\frac{5}{4}s - 2\right) ds \]

After computing the integral, find its inverse.

:p
??x
The CDF \(F(t)\) can be computed as follows:
\[ F(t) = \int_{1}^{t} \left(\frac{5}{4}s - 2\right) ds = \left[\frac{5}{8}s^2 - 2s\right]_1^t = \frac{5}{8}(t^2 - 1) - 2(t - 1) \]

Simplify the expression:
\[ F(t) = \frac{5}{8}t^2 - \frac{5}{8} - 2t + 2 = \frac{5}{8}t^2 - 2t + \frac{11}{8} \]

To find \(F^{-1}(u)\), solve for \(t\) in terms of \(u\):
\[ u = \frac{5}{8}t^2 - 2t + \frac{11}{8} \]
\[ 8u = 5t^2 - 16t + 11 \]
\[ 5t^2 - 16t + (11 - 8u) = 0 \]

This is a quadratic equation in \(t\). Solve it using the quadratic formula:
\[ t = \frac{16 \pm \sqrt{(16)^2 - 4 \cdot 5 \cdot (11 - 8u)}}{2 \cdot 5} \]
\[ t = \frac{16 \pm \sqrt{256 - 20(11 - 8u)}}{10} \]
\[ t = \frac{16 \pm \sqrt{256 - 220 + 160u}}{10} \]
\[ t = \frac{16 \pm \sqrt{36 + 160u}}{10} \]
\[ t = \frac{16 \pm \sqrt{4(9 + 40u)}}{10} \]
\[ t = \frac{16 \pm 2\sqrt{9 + 40u}}{10} \]
\[ t = \frac{8 \pm \sqrt{9 + 40u}}{5} \]

Since \(t > 1\), we take the positive root:
\[ t = \frac{8 + \sqrt{9 + 40u}}{5} \]

This is the inverse function. Now, generate a uniform random variable \(U \sim U(0, 1)\) and compute \(X = F^{-1}(U)\).

:p
??x
The inverse of the CDF is:
\[ t = \frac{8 + \sqrt{9 + 40u}}{5} \]

To generate a value from the distribution with the given density function, follow these steps in code:

```java
public double inverseTransform(double u) {
    return (8 + Math.sqrt(9 + 40 * u)) / 5;
}
```

Use this method to generate values from the specified continuous distribution by generating \(U \sim U(0, 1)\) and applying the inverse function.

:p
??x
To generate a value from the given density function using the inverse-transform method:

1. Generate a uniform random variable \(U \sim U(0, 1)\).
2. Use the inverse CDF:
\[ t = \frac{8 + \sqrt{9 + 40u}}{5} \]

Here is an example in Java:

```java
public class InverseTransformExample {
    public double generateRandomValue() {
        // Generate a uniform random variable U from (0, 1)
        double u = Math.random();
        
        // Apply the inverse CDF to get the value of X
        return (8 + Math.sqrt(9 + 40 * u)) / 5;
    }
}
```

:p
??x
To generate a random value using the inverse-transform method, you would follow these steps in Java:

1. Generate a uniform random variable \(U \sim U(0, 1)\).
2. Use the formula:
\[ t = \frac{8 + \sqrt{9 + 40u}}{5} \]

Here is an example implementation:

```java
public class InverseTransformExample {
    public double generateRandomValue() {
        // Generate a uniform random variable U from (0, 1)
        double u = Math.random();
        
        // Apply the inverse CDF to get the value of X
        return (8 + Math.sqrt(9 + 40 * u)) / 5;
    }
}
```

This method transforms a uniform random variable into a value that follows the specified distribution.

x??

---


#### Simulating M/M/1 Queue
Background context: An M/M/1 queue is a single-server queueing system where job arrivals follow a Poisson process and service times are exponentially distributed. This problem asks you to simulate such a queue for different load levels (Arrival rates \(\lambda\)).

:p How do we simulate an M/M/1 queue with different arrival rates?
??x
To simulate an M/M/1 queue, follow these steps:
1. Set up the parameters: 
   - Service rate \(\mu = 1\) (since \(\frac{1}{\mu} = 1\)).
2. Define the interarrival times as Exponential random variables with parameter \(\lambda\).
3. Simulate job arrivals and service completions.
4. Track the state of the system: whether it is empty or occupied.

The goal is to measure the mean response time \(E[T]\) for different arrival rates \(\lambda = 0.5, 0.7,\) and \(0.9\).

Example:
- For \(\lambda = 0.5\), service times are exponentially distributed with rate 1.
- For each run, start from the empty state and simulate until there are 2000 arrivals.
- Record the response time of the 2001st arrival.

Here is a pseudocode for one "run":
```java
public void simulateMMSim() {
    double lambda = ...; // Set \lambda to one of the specified values
    int totalArrivals = 2000;
    
    List<Double> interarrivalTimes = new ArrayList<>();
    List<Double> serviceTimes = new ArrayList<>();
    
    for (int i = 0; i < totalArrivals; ++i) {
        // Generate Exponential random variable as interarrival time
        double arrivalTime = -Math.log(1 - Math.random()) / lambda;
        
        interarrivalTimes.add(arrivalTime);
    }
    
    int currentServiceStart = 0;
    double currentTime = 0.0;
    int arrivalsServed = 0;
    
    for (int i = 0; i < totalArrivals + 1; ++i) {
        // Increment time by interarrival time
        currentTime += interarrivalTimes.get(i);
        
        if (currentServiceStart == -1 || currentTime > currentServiceStart) {
            // Start new service
            currentServiceStart = currentTime + -Math.log(1 - Math.random()) / 1;
            ++arrivalsServed;
        }
    }
    
    // The response time of the 2001st arrival is recorded here.
}
```

:p
??x
To simulate an M/M/1 queue with different arrival rates, follow these steps:

1. Set up parameters:
   - Service rate \(\mu = 1\).
   - Interarrival times are Exponential random variables with parameter \(\lambda\).

2. Simulate the system for a given number of arrivals (e.g., 2000):
   - For each arrival, generate an interarrival time.
   - Track the state transitions: either start a new service or continue waiting.

3. Measure the response time of the 2001st arrival after running the simulation multiple times with different \(\lambda\) values (e.g., \(\lambda = 0.5, 0.7,\) and \(0.9\)).

Here is an example pseudocode for one run:

```java
public void simulateMMSim(double lambda) {
    int totalArrivals = 2000;
    
    List<Double> interarrivalTimes = new ArrayList<>();
    for (int i = 0; i < totalArrivals; ++i) {
        // Generate Exponential random variable as interarrival time
        double arrivalTime = -Math.log(1 - Math.random()) / lambda;
        
        interarrivalTimes.add(arrivalTime);
    }
    
    int currentServiceStart = 0;
    double currentTime = 0.0;
    int arrivalsServed = 0;
    
    for (int i = 0; i < totalArrivals + 1; ++i) {
        // Increment time by interarrival time
        currentTime += interarrivalTimes.get(i);
        
        if (currentServiceStart == -1 || currentTime > currentServiceStart) {
            // Start new service
            currentServiceStart = currentTime + -Math.log(1 - Math.random()) / 1;
            ++arrivalsServed;
        }
    }
    
    // The response time of the 2001st arrival is recorded here.
}
```

This pseudocode simulates an M/M/1 queue for a given \(\lambda\) value and records the response time of the 2001st arrival.

x??

---


#### Measuring Mean Response Time in M/M/1 Queue
Background context: The goal is to measure the mean response time \(E[T]\) for different load levels (Arrival rates \(\lambda\)) by simulating an M/M/1 queue and averaging over multiple runs.

:p How do we measure the mean response time of the 2001st arrival in an M/M/1 simulation?
??x
To measure the mean response time \(E[T]\) for different load levels (Arrival rates \(\lambda\)), follow these steps:

1. For each value of \(\lambda\) (\(0.5, 0.7,\) and \(0.9\)):
   - Run the simulation multiple times (e.g., \(n = 200\) independent runs).
   - Record the response time of the 2001st arrival in each run.
   - Calculate the average response time.

Here is an example pseudocode for measuring the mean response time:

```java
public double measureMeanResponseTime(double lambda) {
    int nRuns = 200;
    List<Double> responseTimes = new ArrayList<>();
    
    for (int i = 0; i < nRuns; ++i) {
        // Simulate the M/M/1 queue and record the response time of the 2001st arrival
        double responseTime = simulateMMSim(lambda);
        
        responseTimes.add(responseTime);
    }
    
    // Calculate the mean response time
    return calculateMean(responseTimes);
}

public double simulateMMSim(double lambda) {
    int totalArrivals = 2000;
    
    List<Double> interarrivalTimes = new ArrayList<>();
    for (int i = 0; i < totalArrivals; ++i) {
        // Generate Exponential random variable as interarrival time
        double arrivalTime = -Math.log(1 - Math.random()) / lambda;
        
        interarrivalTimes.add(arrivalTime);
    }
    
    int currentServiceStart = 0;
    double currentTime = 0.0;
    int arrivalsServed = 0;
    
    for (int i = 0; i < totalArrivals + 1; ++i) {
        // Increment time by interarrival time
        currentTime += interarrivalTimes.get(i);
        
        if (currentServiceStart == -1 || currentTime > currentServiceStart) {
            // Start new service
            currentServiceStart = currentTime + -Math.log(1 - Math.random()) / 1;
            ++arrivalsServed;
        }
    }
    
    return currentTime; // The response time of the 2001st arrival is recorded here.
}

public double calculateMean(List<Double> times) {
    double sum = 0.0;
    for (double t : times) {
        sum += t;
    }
    return sum / times.size();
}
```

:p
??x
To measure the mean response time in an M/M/1 queue simulation, follow these steps:

1. Define a function `measureMeanResponseTime` that takes \(\lambda\) as input.
2. For each value of \(n = 200\) independent runs:
   - Call the `simulateMMSim` function to simulate the system and record the response time of the 2001st arrival.
3. After all runs, calculate the average response time.

Here is a detailed implementation:

```java
public double measureMeanResponseTime(double lambda) {
    int nRuns = 200;
    List<Double> responseTimes = new ArrayList<>();
    
    for (int i = 0; i < nRuns; ++i) {
        // Simulate the M/M/1 queue and record the response time of the 2001st arrival
        double responseTime = simulateMMSim(lambda);
        
        responseTimes.add(responseTime);
    }
    
    // Calculate the mean response time
    return calculateMean(responseTimes);
}

public double simulateMMSim(double lambda) {
    int totalArrivals = 2000;
    
    List<Double> interarrivalTimes = new ArrayList<>();
    for (int i = 0; i < totalArrivals; ++i) {
        // Generate Exponential random variable as interarrival time
        double arrivalTime = -Math.log(1 - Math.random()) / lambda;
        
        interarrivalTimes.add(arrivalTime);
    }
    
    int currentServiceStart = 0;
    double currentTime = 0.0;
    int arrivalsServed = 0;
    
    for (int i = 0; i < totalArrivals + 1; ++i) {
        // Increment time by interarrival time
        currentTime += interarrivalTimes.get(i);
        
        if (currentServiceStart == -1 || currentTime > currentServiceStart) {
            // Start new service
            currentServiceStart = currentTime + -Math.log(1 - Math.random()) / 1;
            ++arrivalsServed;
        }
    }
    
    return currentTime; // The response time of the 2001st arrival is recorded here.
}

public double calculateMean(List<Double> times) {
    double sum = 0.0;
    for (double t : times) {
        sum += t;
    }
    return sum / times.size();
}
```

This code measures the mean response time by running multiple simulations and averaging the results.

x??

---


#### Example of Convergence in Probability

Background context: If \(Y_n\) represents the average of the first \(n\) coin flips for a fair coin (where each flip is either 0 or 1 with equal probability), we expect the sequence to converge to \(\frac{1}{2}\).

:p What do we expect the sequence \(\{Y_n(\omega): n=1,2,...\}\) to converge to if \(Y_n\) represents the average of the first \(n\) coin flips?
??x
We expect the sequence to converge to \(\frac{1}{2}\), as each flip is equally likely to be 0 or 1.

x??

---

