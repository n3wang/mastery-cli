# High-Quality Flashcards: 7A003--Performance-modeling-and-design-of-computer-systems_processed (Part 18)


**Starting Chapter:** 11.6 Merging Independent Poisson Processes. 11.7 Poisson Splitting

---


#### Exponential Distribution and Poisson Process Approximation
Background context: The exponential distribution describes the time between events in a Poisson process. As the interval δ approaches zero, the number of events N(t) by time t can be approximated as a binomial random variable that converges to a Poisson distribution.
Relevant formulas:
$$N(t) \sim \text{Binomial}\left(\frac{t}{\delta}, \lambda \delta + o(\delta)\right) \rightarrow \text{Poisson}\left(\lambda t + o(\delta)/\delta\right)$$:p What is the approximation for $ N(t)$ as δ approaches zero?
??x
As δ approaches zero, the number of events N(t) by time t can be approximated using a binomial distribution where each δ-size interval has 1 event with probability λδ + o(δ) and 0 otherwise. This binomial random variable converges to a Poisson distribution with parameter $\lambda t$.

For example, consider a Poisson process with rate $\lambda = 2 $ events per unit time over a period of$t = 3$ units. The approximation can be made by considering many small intervals δ and then summing them up to get the total number of events.
x??

---

#### Merging Independent Poisson Processes
Background context: Two independent Poisson processes with rates $\lambda_1 $ and$\lambda_2 $ respectively, when merged, form a single Poisson process with rate$\lambda_1 + \lambda_2$.
Relevant formulas:
$$N(t) = \text{Poisson}(\lambda_1 t)$$
$$

M(t) = \text{Poisson}(\lambda_2 t)$$:p What is the merged Poisson process rate when combining two independent Poisson processes?
??x
When merging two independent Poisson processes with rates $\lambda_1 $ and$\lambda_2 $, the resulting process forms a single Poisson process with rate $\lambda_1 + \lambda_2 $. This is because the minimum of exponentially distributed interarrival times from both processes follows an exponential distribution with parameter $\lambda_1 + \lambda_2$.

For example, if you have two independent Poisson processes where one has a rate of 3 events per unit time and the other has a rate of 5 events per unit time, merging them results in a single process with a combined rate of $8$ events per unit time.
x??

---

#### Poisson Splitting
Background context: Given a Poisson process with rate $\lambda $, each event can be classified as "type A" with probability $ p $and "type B" with probability$1-p $. This classification results in two independent Poisson processes, one for type A events with rate $ p\lambda $and another for type B events with rate$(1 - p)\lambda$.
Relevant formulas:
$$P\{N_A(t) = n, N_B(t) = m\} = e^{-\lambda t} \left(\frac{\lambda tp}{n!}\right)^n \cdot \left(e^{-\lambda t(1-p)} \left(\frac{\lambda t (1-p)}{m!}\right)^m\right)$$:p How does the Poisson splitting theorem describe the classification of events in a process?
??x
The Poisson splitting theorem states that given a Poisson process with rate $\lambda $, if each event is classified as "type A" with probability $ p $and "type B" with probability$1-p $, then type A events form a Poisson process with rate $ p\lambda $and type B events form a Poisson process with rate$(1 - p)\lambda$. These two processes are independent.

For instance, if you have a Poisson process of rate 4, and each event is classified as "type A" with probability 0.3 and "type B" with probability 0.7, then the number of type A events by time $t $ follows a Poisson distribution with rate$1.2t $, while the number of type B events follows a Poisson distribution with rate $2.8t$.
x??

---

#### Intuition for Poisson Splitting using Geometric Distribution
Background context: The intuition behind Poisson splitting can be understood by analogy to the geometric distribution. When classifying events in a Poisson process, each event has an underlying "success" probability that determines its type.
Relevant formulas:
$$P\{N_A(t) = n, N_B(t) = m\} = e^{-\lambda t} \left(\frac{\lambda tp}{n!}\right)^n \cdot \left(e^{-\lambda t(1-p)} \left(\frac{\lambda t (1-p)}{m!}\right)^m\right)$$:p How can the Poisson splitting theorem be intuitively understood using geometric distribution?
??x
The Poisson splitting theorem can be intuitively understood by comparing it to the geometric distribution. In a Poisson process, each event has an underlying "success" probability that determines its type (type A or type B). By flipping coins with bias $p $ and$(1-p)$, we can simulate the classification of events.

For example, if you have a biased coin with heads (success) probability $p $, and tails probability $1-p$, each time an event occurs in the original Poisson process, you flip this coin. If it's heads, the event is classified as type A; if it's tails, the event is classified as type B.

This process results in two independent Poisson processes: one for type A events with rate $p\lambda $ and another for type B events with rate$(1 - p)\lambda$.
x??

---


#### Poisson Process Independence
Background context: In a Poisson process, if we consider two types of events (e.g., A and B) with rates $\lambda p $ and$\lambda(1-p)$, respectively, then the number of type A events in time $ t$($ N_A(t)$) and the number of type B events in time $ t$($ N_B(t)$) are independent Poisson processes.

If we have a single Poisson process with rate $\lambda $, and we divide it into two sub-processes based on an event that occurs with probability $ p$, then:
$$P\{N_A(t)=n, N_B(t)=m\} = P\{N_A(t)=n\} \cdot P\{N_B(t)=m\}.$$:p What is the joint probability of two independent Poisson processes?
??x
The joint probability of the number of type A events $N_A(t) = n $ and type B events$N_B(t) = m $ in a time interval$t$ can be computed as:
$$P\{N_A(t)=n, N_B(t)=m\} = e^{-\lambda p} \left( (\lambda p)^n / n! \right) \cdot e^{-\lambda (1-p)} \left( (\lambda (1-p))^m / m! \right).$$

This is derived by summing the joint probabilities over all values of $m$, showing that the processes are independent.
x??

---

#### Uniformity in Poisson Process
Background context: Given one event occurs by time $t $ in a homogeneous Poisson process with rate$\lambda $, the time at which this event occurred is uniformly distributed over the interval [0, $ t $]. If$ k $ events occur, these events are independently and uniformly distributed over the interval [0, $ t$].

:p What theorem proves that the first event in a Poisson process occurs uniformly?
??x
Theorem 11.9 states: Given that one event of a Poisson process has occurred by time $t $, that event is equally likely to have occurred anywhere in the interval [0, $ t$]. This implies:
$$P\{T_1 < s | N(t) = 1\} = \frac{s}{t}.$$

If $k $ events occur, they are distributed independently and uniformly over [0,$ t$].
x??

---

#### Memorylessness of Exponential Distribution
Background context: The exponential distribution has the memoryless property. This means that if a random variable $X $ follows an exponential distribution with rate parameter$\lambda $, then for any $ s > 0$:
$$P(X > s + t | X > t) = P(X > s).$$:p How can we prove the memorylessness of the Exponential distribution?
??x
The memoryless property can be proven by integrating the conditional probability density function (pdf).
For a random variable $X \sim \text{Exp}(\lambda)$:
$$P(X > 10 + t | X > 10) = \frac{\int_{10+10}^{\infty} \lambda e^{-\lambda x} dx}{\int_{10}^{\infty} \lambda e^{-\lambda x} dx}.$$

By solving, we get:
$$

P(X > 10 + t | X > 10) = e^{-\lambda t},$$which is the same as $ P(X > t)$.

Alternatively, using the memoryless property directly:
$$P(X > 10 + t | X > 10) = P(X > t).$$x??

---

#### Failure Rate
Background context: The failure rate (hazard function) of a continuous random variable $X $ with pdf$f(t)$ and cumulative distribution function $F(t)$ is given by:
$$r(t) = \frac{f(t)}{1 - F(t)}.$$

For the exponential distribution, the failure rate is constant.

:p Prove that for the Exponential distribution, the failure rate is a constant.
??x
For an exponentially distributed random variable $X \sim \text{Exp}(\lambda)$, with pdf:
$$f(t) = \lambda e^{-\lambda t},$$and cumulative distribution function (cdf):
$$

F(t) = 1 - e^{-\lambda t}.$$

The failure rate is:
$$r(t) = \frac{\lambda e^{-\lambda t}}{e^{-\lambda t}} = \lambda.$$

This shows that the failure rate for an exponential distribution is a constant,$\lambda$.

To prove it's the only distribution with a constant failure rate, assume another distribution has a constant failure rate:
$$r(t) = c.$$

Then:
$$f(t) = c (1 - F(t)).$$

Integrating both sides from 0 to $t$:
$$\int_0^t c (1 - F(u)) du = \int_0^t f(u) du = F(t).$$

Differentiating with respect to $t$:
$$c (1 - F(t)) = f(t),$$which implies:
$$f(t) = \lambda e^{-\lambda t},$$hence the exponential distribution.
x??

---


#### Definition of Discrete-Time Markov Chains (DTMCs)
Background context: DTMCs are stochastic processes where transitions between states occur at discrete time steps. The process is memoryless, meaning that given the current state, future states depend only on the present and not on past events. Transition probabilities remain constant over time.

:p What does the definition of a Discrete-Time Markov Chain (DTMC) emphasize about transition times?
??x
The emphasis in the definition of a DTMC is that transitions occur at discrete time steps $n = 0, 1, 2, \ldots$. This means that the process moves from one state to another only at specific, predetermined points in time.
x??

---

#### Definition and Properties of Continuous-Time Markov Chains (CTMCs)
Background context: CTMCs are continuous-time analogues of DTMCs. They maintain properties 2 and 3 of DTMCs but replace the first property with the ability to transition between states at any time.

:p What replaces the first property in defining a Continuous-Time Markov Chain (CTMC)?
??x
The first property is replaced by: "transitions between states can happen at any time." This means that transitions do not have to occur at discrete, predetermined times but can happen continuously over time.
x??

---

#### Definition and Explanation of τi
Background context: $\tau_i $ represents the time until a CTMC leaves state$i $, given that it is currently in state$ i$. This definition leverages the memoryless property and stationarity.

:p What does $\tau_i$ represent in a Continuous-Time Markov Chain (CTMC)?
??x
$\tau_i $ represents the time until the CTMC leaves state$i $, given that it is currently in state$ i$. This definition highlights the memoryless property and stationarity of the CTMC.
x??

---

#### VIEW 1 of a Continuous-Time Markov Chain (CTMC)
Background context: VIEW 1 defines a CTMC by specifying the time spent in each state before making a transition, which follows an exponential distribution with rate $\nu_i$. The next state is chosen independently based on probabilities.

:p How does VIEW 1 describe the time spent and transitions in a Continuous-Time Markov Chain (CTMC)?
??x
VIEW 1 describes that every time the process enters state $i $, it spends an exponentially distributed amount of time $\tau_i \sim Exp(\nu_i)$. When transitioning, the next state is chosen independently with probabilities $ p_{ij}$.
x??

---

#### VIEW 2 of a Continuous-Time Markov Chain (CTMC)
Background context: VIEW 2 offers a practical perspective by defining transition times from one state to another using exponential distributions. The time until leaving state $i$ is the minimum of these exponential random variables.

:p How does VIEW 2 define the time spent and transitions in a Continuous-Time Markov Chain (CTMC)?
??x
VIEW 2 defines the time until leaving state $i $ as$\tau_i = \min_j \{X_j\}$, where $ X_j \sim Exp(\nu_i p_{ij})$. The next state is determined by which of these random variables is minimal.
x??

---

#### Proof That VIEW 2 Implies VIEW 1
Background context: The proof demonstrates that the minimum of exponential random variables follows an exponential distribution with a rate equal to the sum of individual rates, and each transition probability remains unchanged.

:p How does the proof show that VIEW 2 implies VIEW 1?
??x
The proof shows that $\tau_i = \min_j \{X_j\} \sim Exp(\sum_j \nu_i p_{ij}) = Exp(\nu_i)$. Furthermore, the transition probability to state $ j$ is given by:
$$P(X_m = m_{\text{arg min } j \{X_j\}}) = \frac{\nu_i p_{ij}}{\sum_j \nu_i p_{ij}} = p_{ij}$$x??

---

#### Heuristic Proof That VIEW 1 Implies VIEW 2
Background context: The heuristic proof uses a geometric analogy to show that the time spent in state $i$ and subsequent transitions can be modeled as a series of independent exponential events.

:p How does the heuristic proof explain VIEW 1 implying VIEW 2?
??x
The heuristic proof explains that in VIEW 1, if we consider the process sitting in state $i $ for an exponential time$Exp(\nu_i)$, and then flipping a "direction coin" with probabilities $ p_{ij}$, this is equivalent to waiting for any of several independent exponential events (each representing a transition) and selecting the first one that occurs.
x??

---

#### Example: Single-Server Network as a CTMC
Background context: The example models a single-server network using VIEW 2, where jobs arrive according to a Poisson process with rate $\lambda $, and service times follow an exponential distribution with rate $\mu$.

:p How does the model for a single-server network using VIEW 2 work?
??x
The model for a single-server network using VIEW 2 involves:
- Jobs arriving according to a Poisson process: $X_j \sim Exp(\lambda)$- Service times:$ X_k, X_l \sim Exp(\mu)$- The time until the next event (job arrival or service completion) is given by $\tau_i = \min(X_j, X_k, X_l)$.
x??

---

