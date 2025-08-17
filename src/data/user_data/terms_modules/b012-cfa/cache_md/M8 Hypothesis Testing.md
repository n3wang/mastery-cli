#### Hypothesis Test: Example
- We wish to test the hypothesis that the true mean monthly return ( $\boldsymbol{\mu}$ ) of a fund manager is $1 \%$ with a sample of size 101 and significance of 5\%.
:p Convert this into an statistical hypothesis
?x
Central limit theorem: if $\boldsymbol{\mu}=1 \%$, then the distribution of sample means is a $t$-distribution with $\mathrm{n}-1$ degrees of freedom, mean $=\boldsymbol{\mu}$, and dispersion equal to the standard error, $\mathrm{SE}_{\overline{\mathrm{x}}}=\mathbf{s} / \sqrt{ } \mathrm{n}$.
![[Pasted image 20250817123156.png]]
![[Pasted image 20250817123203.png]]

#### Steps in Hypothesis Testing

1. State the hypothesis-the relation to be tested.
- Null hypothesis $\left(\mathrm{H}_0\right)$ :
$$
\mu=1 \%
$$
- Alternative hypothesis $\left(\mathrm{H}_{\mathrm{a}}\right)$ :
$$
\mu \neq 1 \%
$$
1. Select a test statistic and identify its distribution.
	- The test statistic was the distance of the observed sample mean X from the hypothesized mean of 1\% in standard errors.
	- The distribution was a $t$-distribution ( $\sigma$ unknown).
2. Specify the level of significance.
	- The significance level for the test was $5 \%$.
	- Steps in Hypothesis Testing (cont.)
3. State the decision rule for the hypothesis.
	- If the test statistic is greater in magnitude than 1.98 , then reject the null hypothesis.
4. Collect the sample and calculate statistics.
	- A test statistic of 3.6 was calculated based on a sample mean of 1.5\% from a sample of size 101.
5. Make a decision.
	- Test statistic (3.6) > critical value ${ }_{95 \%}(1.98) \rightarrow$ REJECT NULL
:p Briefly explian the steps in hypthesis and how you could have that 
?x
view above

#### Two and One Tailed Tests

![[Pasted image 20250817134336.png]]

![[Pasted image 20250817134349.png]]

One-Tailed Test: Example
Data for a fund's monthly abnormal returns
Sample mean $=0.35 \% \quad$ Sample size $=61$
Sample std. dev. = 1.5\%
Test the hypothesis that a fund's mean return is less than or equal to zero at the 5\% significance level.

- Type I error: rejecting $\mathrm{H}_0$ when it is actually true [e.g., convicting an innocent person (null is innocent)]
- Type II error: failing to reject $\mathrm{H}_0$ when it is false (e.g., failing to convict a guilty person)

Probability of Type I error = significance level (a)
Power of test is (1 - prob. of Type II Error $(\beta)$ )


#### $p$-Value
- The $\boldsymbol{p}$-value of a test is the probability of:: getting the test statistic (or a result more extreme) if the null were true.

$$
p \text {-value < significance level } \rightarrow \text { REJECT }
$$

- A $p$-value is the smallest level of significance at which the null can be rejected.
- Example-if the $p$-value of a test is 0.0213 or $2.13 \%$ :
	- We can reject null at $5 \%$ significance
	- We can reject null at $3 \%$ significance
	- We cannot reject null at $1 \%$ significance

#### Testing the Difference Between Means
For independent samples from different distributions:
- Same approach as for a single mean, except:
- Hypothesis relates to $\mu 1-\mu 2$
- Test statistic is: $\quad\left(\bar{x}_1-\bar{x}_2\right)-$ hypothesized difference

$$
\sqrt{\frac{s_p^2}{n_1}+\frac{s_p^2}{n_2}}
$$

- Where $s_p^2$ is "pooled" standard error, calculated as:

$$
s_p^2=\frac{\left(n_1-1\right) s_1^2+\left(n_2-1\right) s_2^2}{n_1+n_2-2}
$$

- $t$-test with $\mathrm{n}_1+\mathrm{n}_2-2$ degrees of freedom

#### Testing the Difference Between Means:
CFA Institute Example
Suppose we want to test whether the returns of the ACE High Yield Total Return Index, shown below, are different for two different time periods: Period 1 and Period 2.

|                    |     Period 1 |     Period 2 |
| :----------------- | -----------: | -----------: |
| Mean               | $0.01775 \%$ | $0.01134 \%$ |
| Standard deviation | $0.31580 \%$ | $0.38760 \%$ |
| Sample size        |     445 days |     859 days |

:p Is there a difference between the mean daily returns in Period 1 and in Period 2, using a 5\% level of significance?
??x
State the hypotheses:
$$
\mathrm{H}_0: \quad \text { vs. } \mathrm{H}_{\mathrm{a}}:
$$
Identify appropriate test statistic:
$$
t \text {-distribution with } \quad=\quad \text { degrees of freedom }
$$
Specify critical value: with 5\% significance and two tails:
$$
\mathrm{t}_{\text {crit }}=\quad \text { (large sample } \rightarrow t \text {-values } \approx z \text {-values) }
$$
##### Step 1. Set up the hypotheses

- Null hypothesis $H_0: μ1=μ2\mu_1 = \mu_2$ (no difference in mean daily returns)
- Alternative hypothesis $H_a: μ1≠μ2\mu_1 \neq \mu_2$ (means are different)

##### Step 2. Extract data from the problem

|                    | Period 1             | Period 2             |
| ------------------ | -------------------- | -------------------- |
| Mean $(xˉ\bar{x})$ | 0.01775% = 0.0001775 | 0.01134% = 0.0001134 |
| Std. deviation (s) | 0.31580% = 0.003158  | 0.38760% = 0.003876  |
| Sample size (n)    | 445                  | 859                  |
##### Step 3. Compute standard errors of each mean
$$
\begin{aligned}
& S E_1=\frac{s_1}{\sqrt{n_1}}=\frac{0.003158}{\sqrt{445}} \approx 0.0001496 \\
& S E_2=\frac{s_2}{\sqrt{n_2}}=\frac{0.003876}{\sqrt{859}} \approx 0.0001323
\end{aligned}
$$
##### Step 4. Compute the standard error of the difference
$$
S E_{d i f f}=\sqrt{S E_1^2+S E_2^2}=\sqrt{\left(0.0001496^2\right)+\left(0.0001323^2\right)} \approx 0.0001998
$$
##### Step 5. Compute the test statistic
$$
t=\frac{\bar{x}_1-\bar{x}_2}{S E_{\text {diff }}}=\frac{0.0001775-0.0001134}{0.0001998}=\frac{0.0000641}{0.0001998} \approx 0.32
$$
##### Step 6. Decision rule
For large $n_1, n_2$, use normal approximation:
- Critical values at $5 \%$ two-tailed test: $\pm 1.96$.

Since $|t|=0.32<1.96$, we fail to reject $H_0$.

##### Conclusion
At the 5% significance level, **there is no statistically significant difference between the mean daily returns in Period 1 and Period 2**.

x??

#### Testing the Mean Difference
For dependent samples from related distributions:
- Same approach as for a single mean, except:
- Hypothesis relates to $\mu_d$
- Test statistic is:
$$
\frac{(\overline{\mathrm{d}})-\text { hypothesized difference }}{\left(\frac{\mathrm{s}_{\mathrm{d}}}{\sqrt{\mathrm{n}}}\right)}
$$
- $t$-test with $\mathrm{n}-1$ degrees of freedom

#### Testing a Single Variance
- Hypothesis relates to $\sigma^2$
- Test statistic given by:
$$
\frac{(n-1) s^2}{\text { hypothesized variance }}
$$
- Chi-square $\left(\chi^2\right)$ test with $n-1$ degrees of freedom

Testing a Single Variance: Example
A fund manager has a mandate specifying that monthly volatility should be a maximum of $2 \%$. Since inception three years ago, the manager has achieved a mean monthly return of $1 \%$ and monthly standard deviation of $2.3 \%$. Test whether this data implies that the true volatility of the manager breaches the mandate restriction with 5\% significance.
Problem Setup
- A fund manager must keep monthly volatility $\leq 2 \%$.
- From 3 years of monthly data:
- Sample size $n=36$
- Sample standard deviation $s=2.3 \%=0.023$
- We want to test, at the $\mathbf{5 \%}$ significance level, whether the true volatility exceeds $2 \%$.
:p Create the hypotheses test and check the chi-squares.
??x
**Step 1. Hypotheses**
- Null hypothesis $H_0: \sigma^2 \leq(0.02)^2$
- Alternative hypothesis $H_a: \sigma^2>(0.02)^2$ (one-tailed test)

**Step 2. Test statistic**
$$
\chi^2=\frac{(n-1) s^2}{\sigma_0^2}
$$
Plug in numbers:
$$
\chi^2=\frac{(36-1)\left(0.023^2\right)}{0.02^2}=\frac{35 \times 0.000529}{0.0004}=46.29
$$
Degrees of freedom: $d f=n-1=35$



One-tail test, $\mathrm{H}_0: \sigma^2 \leq 4$ and $\mathrm{H}_{\mathrm{a}}: \sigma^2>4$
Reject $\mathrm{H}_0$ if the test statistic is > (95th percentile of $\chi 2$ distribution with 36-1 = 35 degrees of freedom)

| Degrees of | Probability in Right Tail |                    |                  |                  |                    |                      |
| :--------: | :-----------------------: | :----------------: | :--------------: | :--------------: | :----------------: | :------------------: |
|  Freedom   |   $\mathbf{0 . 9 7 5}$    | $\mathbf{0 . 9 5}$ | $\mathbf{0 . 9}$ | $\mathbf{0 . 1}$ | $\mathbf{0 . 0 5}$ | $\mathbf{0 . 0 2 5}$ |
|     30     |          16.791           |       18.493       |      20.599      |      40.256      |       43.773       |        46.979        |
|     35     |          20.569           |       22.465       |      24.797      |      46.059      |       49.802       |        53.203        |
|     40     |          24.433           |       26.509       |      29.051      |      51.805      |       55.758       |        59.342        |
**Step 3. Critical value**
From the chi-square distribution table:
- At $5 \%$ (upper tail), with $d f=35$,
$$
\chi_{0.95,35}^2 \approx 49.80
$$

x??

#### Testing the Difference Between Variances: CFA Institute Example
You are investigating whether the population variance of returns on a stock market index changed after a change in market regulation. The first 418 weeks occurred before the regulation change, and the second 418 weeks occurred after the regulation change. You gather the data displayed below for 418 weeks of returns both before and after the change in regulation. You have specified a 5 percent level of significance.

|                          | $\mathbf{n}$ | Mean Weekly Return (%) | Variance of Returns |
| :----------------------- | :----------: | :--------------------: | :-----------------: |
| Before regulation change |     418      |         0.250          |        4.644        |
| After regulation change  |     418      |         0.110          |        3.919        |
:p Are the variance of returns different before the regulation change versus after the regulation change?
??x
Testing the Difference Between Variances: Solution
State the hypotheses:

$$
H_0: \sigma_{\text {before }}^2=\sigma_{\text {after }}^2 \text { vs. } H_a: \sigma_{\text {before }}^2 \neq \sigma_{\text {after }}^2
$$


Identify appropriate test statistic:
- F-distribution with 417 df on numerator and 417 df on denominator
- Specify critical value: with $5 \%$ significance and two tails:

$$
\mathrm{F}_{\text {crit }}=0.82512 \text { and } 1.21194 \text { (from F-distribution tables) }
$$
Calculate the test statistic:

$$
F=\frac{\sigma_{\text {before }}^2}{\sigma_{\text {after }}^2}=
$$


Make decision: test stat (1.185) falls within 0.82512 and 1.21194 null
x??

#### Parametric vs Nonparametric Tests
- **Parametric tests** are based on assumptions about population distributions and population parameters (e.g., $t$-test, $z$-test, $F$-test).
- **Nonparametric tests** make few, if any, assumptions about the population distribution and test things other than parameter values (e.g., runs tests, rank correlation tests).
:p What are the differences with parametric and nonparametric tests?
??x

| Feature                     | Parametric Tests                                               | Nonparametric Tests                                                      |
| --------------------------- | -------------------------------------------------------------- | ------------------------------------------------------------------------ |
| **Assumptions**             | Assume data comes from a specific distribution (often normal). | Make few or no assumptions about the distribution.                       |
| **Parameters**              | Concerned with population parameters (mean, variance, etc.).   | Do not estimate parameters; focus on ranks, medians, or orderings.       |
| **Examples**                | t-test, z-test, F-test, ANOVA.                                 | Runs test, Wilcoxon rank-sum, Kruskal-Wallis, Spearman rank correlation. |
| **Data type**               | Requires interval or ratio data (quantitative, numeric).       | Can use ordinal or ranked data, sometimes nominal.                       |
| **Efficiency**              | More powerful if assumptions hold true.                        | More robust when assumptions are violated.                               |
| **Sample size sensitivity** | Works best with larger samples and normally distributed data.  | Useful with small samples or when distribution is unknown/non-normal.    |
x??


