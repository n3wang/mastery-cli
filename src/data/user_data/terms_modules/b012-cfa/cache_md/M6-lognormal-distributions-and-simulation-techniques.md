---
tags:
  - CFA
---
- remember u can use mathpnix to take the photos
- Everytime you finish or mid video, pause and run your flashcards of that modulo

## Normal vs. Lognormal Distributions

#### Continuously Compounded Returns
Continuously Compounded Returns
Lognormal distribution is useful for modeling asset prices

$$
P_T=P_0 e^{r_{0, T}} \quad \begin{aligned}
& P_0=\text { asset price today } \\
& P_T=\text { asset price at time } T \\
& r=\text { continuously compounded return } T_0 \text { to } T_1
\end{aligned}
$$
:p Suppose the following is lognormal distributed and:  $\mathrm{T}_0=100, \mathrm{~T}_1=120$, What is the return?
?x
- HPR = (120 / 100) - $1=20 \%$
- $R_{c c} \quad=\ln (120 / 100) \quad=18.23 \%$
- $R_{\text {simple }}=e^{0.1823}-1=20 \%$


#### Identically and Independently Distributed Returns
- **Identically distributed** returns are stationary, meaning their mean and variance do not change over time.
- **Independently distributed** past returns are not useful for predicting future returns.

Many pricing models in the CFA Program assume that returns are both independently and identically distributed.
:p Whats the difference of both distributions?
?x
see above


#### Monte Carlo Simulation
**Monte Carlo simulation** is a technique based on the repeated generation of one or more risk factors to generate a distribution of security values.

Example: stock options
1. Specify the probability distributions of stock prices, interest rates, and the distribution parameters (e.g., mean, variance, skewness)
2. Random generation of stock price values and interest rates
3. Value the stock options for each pair of risk factor values
4. After many iterations, calculate the mean option value

Uses of Monte Carlo Simulation
Monte Carlo simulation is used to do the following:
- Value complex securities
- Simulate the profits/losses from a trading strategy
- Calculate estimates of value at risk (VaR)
- Simulate pension fund assets and liabilities over time
- Value portfolios of assets that have nonnormal return distributions

Key advantage: inputs are not limited to historical data
Key disadvantage: complexity; garbage in, garbage out


#### Bootstrap Resampling
Resampling is another method for generating data inputs to use in a simulation; used with sample data
- Start with an observed sample
- Repeatedly draw samples of size $n$, replacing the data each time
- From the sample data, we infer population parameters (e.g., mean and variance)

Bootstrap resampling
- Using the same technique as above, bootstrap data provides the inputs to a simulation; relies on actual past returns

