# Module 7.1: Sampling Techniques and the Central Limit Theorem
:d Explain the following in the context of Probability and Nonprobability Sampling
Probability sampling:: sampling when we know the probability in the population of each sample member
(Simple) random sampling:: every population member has an equal probability of being selected; systematic sampling selects every $n$th population member to form an approximately random sample
Nonprobability sampling:: use judgment of researcher, or low-cost or readily available data to select sample items

:d In the context of Sampling Error the following represents...
Sampling error:: difference between a sample statistic and the true population parameter (e.g., $x-\mu$ )
Nonprobability sampling may lead to::  greater sampling error than probability sampling

#### Stratified Random Sampling
Stratified random sampling uses a classification system to separate the population into smaller groups using distinguishing characteristics.
1. **Create subgroups** from the population based on important characteristics.
2. **Select samples** from each subgroup in proportion to the size of the subgroup.
:p what to remember when running random sampling?
?x
**Match the characteristics** of the sample distribution to that of the underlying population so it is a representative sample.


#### **Cluster Sampling**
The overall population is divided into subsets (clusters).
One-stage cluster sampling: take random sample of clusters; include all data from those clusters
Two-stage cluster sampling: select clusters and take random samples from each
:d Think of an example of a cluster sampling, and define the diference of stratified and cluster sampling? 
?x
Example: State-level data on the personal incomes of residents is shown by county. The county is the subset (cluster).
Example difference
stratified If studying income: split population into low/middle/high income strata, sample some people from each group	
cluster sampling: If studying schools: randomly select 5 schools (clusters) and survey all students in them
When to use	When you want accurate representation of all key subgroups	When the population is geographically spread out or hard to reach individually

#### Nonprobability Sampling Methods
- selecting sample data based upon its ease of access and being readily available
- select observations from population based on analyst's judgment
:p Explain how are named the samplings mentioned above
?x
Convenience sampling: selecting sample data based upon its ease of access and being readily available
Judgmental sampling: select observations from population based on analyst's judgment

#### Central Limit Theorem
For any population with a mean $\mu$ and variance $\sigma^2$, as the size of a random sample gets large:
- The distribution of sample means approaches a normal distribution, with a mean $\mu$ and variance of $\sigma^2 / \mathrm{n}$

Properties of central limit theorem
- If the sample size is sufficiently large ( $n \geq 30$ ), sampling distribution of the sample means is approximately normal
- The mean of the population and mean of the distribution of all possible sample means are equal
:p Explain the idea of central limit theorem
?x
If you repeatedly take random samples from any population (no matter the shape: skewed, uniform, etc.) with:
- Population mean $=\mu$
- Population variance $=\sigma^2$
and your sample size $n$ is large enough, then:
- The distribution of the sample means will be approximately normal.
- This new distribution will have:
$$
\begin{gathered}
\text { Mean }=\mu \\
\text { Variance }=\frac{\sigma^2}{n} \\
\text { Standard Deviation (Standard Error) }=\frac{\sigma}{\sqrt{n}}
\end{gathered}
$$

#### Standard Error of the Sample Mean
The standard error of the sample mean is the standard deviation of the distribution of sample means.

When the population $\sigma$ is known: $\sigma_{\bar{x}}=\frac{\sigma}{\sqrt{n}}$
When the population $\sigma$ is unknown: $S_{\bar{x}}=\frac{S}{\sqrt{n}}$
Example: A sample contains the past 30 returns for McCreary, Inc. The mean return is $2 \%$, and the sample standard deviation is $20 \%$.
:p Calculate and interpret the standard error of the sample mean.
??x
$$
\mathrm{s}_{\bar{x}}=\frac{\mathrm{s}}{\sqrt{\mathrm{n}}} \quad \mathrm{~s}_{\bar{x}}=\frac{20 \%}{\sqrt{30}}=3.6 \%
$$
Interpretation: For sample sizes of 30, the distribution of the sample means would have a mean of $2 \%$ and a standard error of $3.6 \%$.
x??

#### Resampling
Two alternative methods of estimating the standard error of a sample mean are the jackknife and bootstrap methods.

The jackknife calculates multiple sample means, each with one of the observations removed from the sample. The standard deviation of these sample means is used as an estimate of the standard error.

The bootstrap method draws and replaces repeated samples of size $n$ from the dataset. The standard deviation of these sample means is our estimate of the standard error of the sample mean.

| Feature                 | **Jackknife**                                        | **Bootstrap**                                                   |
| ----------------------- | ---------------------------------------------------- | --------------------------------------------------------------- |
| **Sampling style**      | Leave out 1 observation at a time                    | Sample with replacement                                         |
| **Number of resamples** | Exactly nn                                           | Chosen by user (often 1,000+ resamples)                         |
| **Randomness**          | None (deterministic)                                 | Yes (random resampling)                                         |
| **Computational cost**  | Lower                                                | Higher                                                          |
| **When useful**         | Works well for smooth statistics like mean, variance | Works for many statistics, even with complex/nonlinear formulas |

:p explain in your own wrds the difference of both
?x
Jackknife
- Idea: "What happens if I leave each data point out, one at a time?"
- You take your dataset of size $n$, then make $n$ new datasets - each one missing a different single observation.
- You calculate the mean for each of these reduced datasets.
- The spread (standard deviation) of these means tells you the standard error.
- Key point: Uses systematic leave-one-out resampling, no randomness.
Bootstrap
- Idea: "What happens if I pretend my dataset is the whole population and take many random samples from it?"
- You take many new datasets of size $n$, each created by sampling with replacement from your original dataset.
- You calculate the mean for each of these bootstrap samples.
- The spread (standard deviation) of these means is the standard error.
- Key point: Uses random resampling with replacement - can create duplicates in a sample.






