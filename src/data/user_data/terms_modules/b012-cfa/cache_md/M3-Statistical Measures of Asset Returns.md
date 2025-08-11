---
tags:
  - CFA
---
- remember u can use mathpnix to take the photos
- Everytime you finish or mid video, pause and run your flashcards of that modulo

## Modulo 3.1 Central Tendency and Dispersion

Measures of Central Tendency
The arithmetic mean is:: the sum of the observation values divided by the number of observations.
The sample mean is the sum of all the values in a sample of a population divided by the number of observations.
arithmetic mean: 
$$
\bar{x}=\frac{\sum_{i=1}^n x_i}{n}
$$
of arithmetic mean, we've endountered it already.


Median
The median is the midpoint of a dataset (half above and half below).
Example with an odd number of observations
Example with an even number of observations
- Median is the average of the two middle observations
Less affected by extremedraldes ithaty the imeater.


:d Quartiles, how much of the data points the following represents ?
- less than the 3rd quartile.means: $75 \%$ of the data points are 
- less than the 6th decile:: $60 \%$ of the data points
- less than the 50th percentile (50th percentile is the median):: 50% of the data points

- With an odd number of values, 50 th percentile is the middle value when observations are ordered from least to greatest.

#### Box and Whisker Plot

![[Pasted image 20250717035601.png]]
:p What is a Box and Whisker Plot? What does the upper obsiravation and lowest observation represent? How about the box top and bottom? Where is that located on the plot?
??x

|Element|Meaning|Location on Plot|
|---|---|---|
|**Lowest Observation**|Minimum value (excluding outliers)|End of the left whisker|
|**Lower Quartile (Q1)**|25th percentile — 25% of the data falls below this|Bottom of the box (left edge)|
|**Median (Q2)**|50th percentile — middle of the data|Line inside the box|
|**Upper Quartile (Q3)**|75th percentile — 75% of the data falls below this|Top of the box (right edge)|
|**Upper Observation**|Maximum value (excluding outliers)|End of the right whisker|

x??

:d what does the following describe in finance?
Dispersion:: is defined as the variability around the central tendency
Tradeoff:: in finance and investments between reward (return) and variability (risk)
Range:: is the distance between the largest and smallest value of the dataset from the arithmetic mean
mean absolute deviation:: is the average of the absolute deviations from the arithmetic mean



### Sample Variance and Standard Deviation

Sample Variance and Standard Deviation

$$
s^2=\frac{\sum_{i=1}^n\left(x_i-\bar{x}\right)^2}{n-1} \quad s=\sqrt{\frac{\sum_{i=1}^n\left(x_i-\bar{x}\right)^2}{n-1}}
$$


Note that for sample variance, the sum of the squared deviations is divided by $n-1$ instead of $n$.
What is the bessel correction? :: Is when on Sample Variance we divide the sum of the squared deviations by `n-1` instead of `n`


#### Problem

Annual returns data: $30 \%, 12 \%, 25 \%, 20 \%, 23 \%$
:p Calculate the sample variance and sample standard deviation.
?x
$$
\begin{aligned}
& \bar{X}=\frac{30+12+25+20+23}{5}=22 \% \\
& s^2=\frac{(30-22)^2+(12-22)^2+(25-22)^2+(20-22)^2+(23-22)^2}{5-1}=44.5
\end{aligned}
$$


Target Downside Deviation: Example
Annual returns data: $30 \%, 12 \%, 25 \%, 20 \%, 23 \%$
Using a target of $24 \%$, what is the target downside deviation?
?x
$$
\begin{aligned}
& 30 \%-24 \%=6 \% \\
& 12 \%-24 \%=-12 \% \\
& 25 \%-24 \%=1 \% \\
& 20 \%-24 \%=-4 \% \\
& 23 \%-24 \%=-1 \%
\end{aligned}
$$






##  Module 3.2: Skewness, Kurtosis, and Correlation

#### Skeweness

Positive Skew = Right Skew
Positive skew has outliers in the right tail.
Skew absolute values > 0.5 are significant.
Mean is most affected by outliers.


| Positive Skew                        | Negative Skew                        |
| ------------------------------------ | ------------------------------------ |
| ![[Pasted image 20250731203746.png]] | ![[Pasted image 20250731203754.png]] |


What does Positive or Negative Skew mean?


#### Kurtosis
This measures the degree to which a distribution is more or less peaked than a normal distribution.
Leptokurtic (kurtosis > 3) is more peaked with fatter tails (more extreme outliers).

![[Pasted image 20250803180844.png]]

- **Kurtosis** = concentration in tails (how “outlier-prone” it is).
- **Leptokurtic = risky** due to **extreme outcomes**.

#### Covariance

$$
s_{X, Y}=\frac{\sum_{i=1}^n\left[\left(X_i-\bar{X}\right)\left(Y_i-\bar{Y}\right)\right]}{n-1}
$$

| Term      | Meaning                       |
| --------- | ----------------------------- |
| $$X_i$$   | Each value of variable X      |
| $\bar{X}$ | Mean of variable X            |
| $Y_i$     | Each value of variable Y      |
| $\bar{Y}$ | Mean of variable Y            |
| n         | Number of paired observations |
:p What Is Sample Covariance? Which is the formula? what it means that is positive or negative? What letter is used to be denoted?
?x
It tells us how two variables move together:
- Positive covariance → when one goes up, the other tends to go up.
- Negative covariance → when one goes up, the other tends to go down.
$$
s_{X, Y}=\frac{\sum_{i=1}^n\left[\left(X_i-\bar{X}\right)\left(Y_i-\bar{Y}\right)\right]}{n-1}
$$


#### Correlation
- Correlation does not imply causation.
- Variables with strong nonlinear relationships may have a correlation near zero.
- Variables may exhibit spurious correlation:
- Correlation may result from chance.
- Both variables may be related to a third variable.

$$
\rho_{X, Y}=\frac{s_{X, Y}}{s_X s_Y}
$$
- No units-values range from +1 , perfect positive correlation, to -1 , perfect negative correlation
- Correlation of zero indicates no linear relationship


Calculate the correlation of returns between Stocks A and B ( $\rho_{A B}$ ) given the following data:
- $\mathrm{s}^2{ }_{\mathrm{A}}=0.0028$
- $\mathrm{s}^2{ }_{\mathrm{B}}=0.0124$
- $\mathrm{s}_{\mathrm{A}, \mathrm{B}}=0.0058$
:p Calculate the correlation of returns between Stocks A and B
??x
0.9842
$$
\rho_{A B}=\frac{s_{A B}}{s_A s_B}
$$

$$
\rho_{A B}=\frac{s_{A B}}{s_A s_B}=\frac{0.0058}{0.0529 \times 0.1114}=0.9842
$$
x??


## Module 4.1: Probability Models, Expected Values, and Bayes' Formula


#### Expected Values Simple Excercise
Expected Value
The expected value of a random variable is the probability-weighted average of the possible outcomes of the variable.

$$
\begin{aligned}
& E(X)=\sum P\left(x_i\right) x_i=P\left(x_1\right) x_1+P\left(x_2\right) x_2+\ldots+P\left(x_n\right) x_n \\
& P\left(x_i\right)=\text { probability of outcome } x_i
\end{aligned}
$$

Expected Value
Example: EPS for Ron's Stores
- 10\% probability EPS = £1.80
- $20 \%$ probability EPS = £1.60
- 40\% probability EPS = £1.20
- $30 \%$ probability EPS = £1.00

:p What is the Expected EPS:?
??x
$$
=0.10(1.80)+0.20(1.60)+0.40(1.20)+0.30(1.00)=£ 1.28
$$
x??

#### Probability Tree
Expected Value
A probability tree is used to show the probabilities of various outcomes. Conditional expected values are contingent on the outcome of some other event (e.g., on the arrival of new information).
Ron's Stores Example:
- Probability of a good economy: 60\%
- If good: EPS \$1.80 (30\% probability) or \$1.70 (70\% probability)
- Probability of a poor economy: $40 \%$
- If poor: EPS \$1.30 (60\% probability) or \$1.00 (40\% probability)
:p Draw the Probability Tree of the thing above.
?x
![[Pasted image 20250803184053.png]]


#### Bayers Formula
Bayes' formula is used to update a given set of prior probabilities for a given event in response to the arrival of new information.

$$
P(A \mid B)=\frac{P(B \mid A)^{\prime} P(A)}{P(B)}
$$


The joint probability of A and B , divided by the unconditional probability of B
- $P(B)=P(B \mid A) \times P(A)+P\left(B \mid A^C\right) \times P\left(A^C\right)$
- $P(B \mid A)=$ probability of $B$, given $A$ has occurred
- $P\left(B \mid A^C\right)=$ probability of $B$, given $A$ has not occurred

:p Redraw the Bayers Formula and re explain what each item represents
?x
See above

#### Bayers Formula Excercise
Example:
- 60\% probability the economy will outperform
- If it outperforms, there is $70 \%$ probability the stock will go up and $30 \%$ probability it will go down
40\% probability the economy will underperform
- If it underperforms, there is $20 \%$ probability the stock will go up and $80 \%$ probability it will go down
:p Given that the stock increased in value, calculate the probability that the economy outperformed.
?x
84%
![[Pasted image 20250803184656.png]]
Probability that it gained and outputermoed / Probability gained (aggregated)
Using the bayers formula then this is how it would look like:
![[Pasted image 20250803185038.png]]

































