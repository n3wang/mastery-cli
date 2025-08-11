# Statistics

#### Difference descriptive and inferential statistics
Techniques used in descriptive statistics include: measures of central tendency (mean, median, and mode), measures of dispersion (standard deviation, variance, percentiles, and quartiles), and measures of association (correlation, regression, and covariance).
Techniques used in inferential statistics include: hypothesis testing (t-test, chi-square, and ANOVA), and regression analysis.

:p What is the difference between descriptive and inferential statistics?
??x
Descriptive statistics is about describing the data, inferential statistics is about making conclusions (generalization) about the data.
x??

#### accuracy
Accuracy is the relationship between the measurement and the actual truth (Inversely related to bias)

:p Use accuracy correctly in a setence, or what is it useful for?
??x
The more accurate your model is. The closest it is with providing the truth without any bias
x??

#### Precision
Precision is certaintity of each measurement (Inversely related to variance)

:p Use precision correctly in a setence, or what is it useful for?
??x
Precision is low if it changes everytime I re-measure it.
x??

#### Resolution
The number of data points per unit measurement (time, space, individual, etc.)

:p Use resolution correctly in a setence, or what is it useful for?
??x
I am measuring at 100hz which means that I have 100 data points per second of resolution
x??

#### Gaussian distribution
showing that data near the mean are more frequent in occurrence than data far from the mean.

:p What does a Gaussian distribution suggest?
??x
Suggests that the data is normally distributed having a bell curve in the middle
x??

#### T distribution
A T distribution is similar to a Gaussian distribution but has fatter tails

:p What does a T distribution suggest?
??x
Suggests that the data is normally distributed having a bell curve in the middle
x??

#### unimodal and bimodal
A unimodal distribution has one peak, a bimodal distribution has two peaks

:p What does a unimodal and bimodal distribution suggest?
??x

x??

#### Plot a Gaussian distribution
# import libraries
import matplotlib.pyplot as plt
import numpy as np
import scipy.stats as stats

:p Plot a Gaussian distribution from -4 to 4 having 1001 discretizations
??x
x = np.linspace(-4, 4, 1001)
y = stats.norm.pdf(x, 0, 1)
plt.plot(x, y)
x??

#### Plot a Normally distributed Histogram
# import libraries
import matplotlib.pyplot as plt
import numpy as np
import scipy.stats as stats

:p Plot a Normally distributed Histogram (25 bins) of random data using 1000 points using randn shifted by 5
??x
data = np.random.randn(1000) + 5
plt.hist(data, bins=25)
plt.show()
x??

#### Calculate the SAMPLE variance
Variance is the average (divide by n - 1) of the squared differences from the Mean

:p Calculate the SAMPLE variance of [ 8, 0, 4, 1, -2, 7] knowing that the mean is 3
??x
8 - 3 = 5
0 - 3 = -3
4 - 3 = 1
1 - 3 = -2
-2 - 3 = -5
7 - 3 = 4
(5^2 + (-3)^2 + 1^2 + (-2)^2 + (-5)^2 + 4^2) / 5 = 16
x??

#### Larger variance

:p What does a larger variance mean?
??x
A larger variance means that the data is more spread out
x??

#### diff Sample Variance and Population Variance
This is given that population mean is a theorical quantity. Whereas the sample mean is an empirircal quantity

:p What is the difference between Sample Variance and Population Variance?
??x
Sample Variance is the average (divide by n - 1) of the squared differences from the Mean
Population Variance is the average (divide by n) of the squared differences from the Mean
x??

#### Standard Deviation

:p Whats Standard Deviation, how is it calculated?
??x
Standard Deviation is the square root of the variance
x??

#### Fano Factor
Fano Factor = Variance / Mean

:p Whats Fano Factor, how is it calculated?
??x
Fano Factor is the variance divided by the mean
x??

#### Coefficent of Variation

:p Whats Coefficent of Variation, how is it calculated?
??x
Coefficent of Variation is the standard deviation divided by the mean
x??

#### QQ Plots

:p What is a QQ Plot (Quantile Quantile plot)? What is it used for?
??x
A QQ plot is a plot of the quantiles of two distributions against each other
It is used to compare two distributions, For example checking if the observerd theorical distribution is the same as the theorical distribution
x??

#### Statistical moments
Skewness is the third moment, Kurtosis is the fourth moment

:p How are Statistical Moment: Mean, Variance, Skewness, Kurtosis used for?
??x
Mean: Center of the distribution
Variance: Spread of the distribution
Skewness: Symmetry of the distribution. When thre is a positive Skew: ot means the values are pulled to the right. When there is a negativeSkew values are pulled to the left
Kurtosis: Tailedness of the distribution: High Kurtosis means that the distribution has heavy tails (fatter), Low Kurtosis means that the distribution has light tails (sharper high low change)
x??

#### Comming with bins
Also calculated as guideneliens:
Sturges: k = 1 + log2(n)
Freedman-Diaconis Rule: k = 2 * IQR(x) / n^(1/3)
Arbitrary: k = 40

:p What is the formula for comming with bins?
??x
Number of bins = (max - min) / width of bins
x??

#### Violin Plot

:p What is a Violin Plot? What is it used for?
??x
A violing pinplot is created by rotating an histogram 90 degrees and mirroring it. It is used to show the distribution of the data
This is useful when you want to show the distribution of the data, but also want to show the mean and standard deviation
x??

#### What does entropy law say?
Formula for entropy: 
H = -sum(p(x) * log2(p(x)))

:p What does entropy information theory law say?
??x
The less likely an event is, the more information it contains
x??

#### high vs low entropy
Entropy differs from variance in entropy is nonlinear and makes no assumption about the distribution

While variance depends on the validity of the mean therefore is appropriate for Gaussian distributions (roughly normal data

:p What does high vs low entropy mean?
??x
High entropy means that the data is more spread out, Low entropy means that the data is more concentrated (That they repeat, and therefore redundant)
x??

#### Z Transform Assumption
zi = (xi - mean) / standard deviation

:p What is the key assumption that makes the z-transform valid?
??x
The key assumption is that the data is normally distributed (Gaussian) Since Mean and standard devaitions are valid descriptions of the distribution's center tendency and dispersion
x??

#### Min Max Scalling
zi = (xi - min) / (max - min)

:p What is Min Max Scalling? What is it used for?
??x
Min Max Scalling is a way to scale data between 0 and 1. It is used to normalize data
x??

#### Outliers
There are two ways to deal with them, either remove them or leave outliers and use robust data

:p What are outliers? Where do they come from?
??x
Non cooperative, faulty sensors, faulty data, etc
Outliers must be investigated and evaluated || Never ignore outliers
x??

#### Removing outliers: z-score method
z = (x - mean) / standard deviation

:p How to remove outliers using z-score method?
??x
Remove outliers that are more than 3 standard deviations away from the mean
Recalculate the devuatuib treshold and remove the outliers and repeat until no more outliers
x??

#### Modified Z-score method
MAD = Median Absolute Deviation 
MAD = median(|xi - median|)

:p How to calculate the modified z score for non gaussian distributed data?
??x
Modified z score = 0.6745 * (x - median) / MAD
x??

#### Multivariate Outliers

:p How to calculate the zscore for multivariate data?
??x
1) Compute the mean
2) Compute the distance from each data point to the mean
3) Convert distances to z-score: z = (x - mean) / standard deviation
x??

#### Mass vs density in Proability
Example of Density probability is the age, whereas you are usually 23.5 age instead of the exact one. The same goes with Salaries. 

:p What is the difference between mass and density in probability?
??x
Mass is the probability of a specific value | Set of exclusive discrete events
Density is the probability of a range of values | Continuous events
x??

#### Cumulative Distribution Function
Example usage to answer: 
What is the probability of getting at least 1 std higher than the mean on the SAT?
Answer: 1 - CDF(1)
What is the probability of an elephant weighting less than 2std below the average?
Answer: CDF(average-2)

:p What is the Cumulative Distribution Function?
??x
The Cumulative Distribution Function is the probability that a random variable X will take a value less than or equal to x
x??

#### Creating Sample
The sample should be representative of the population, 
The sample can only represent from the population it was drawn from

:p How do you answer to are giraffes taller than slow lorises?
??x
1) Create a sample of giraffes and slow lorises
2) Measure the heights of the animals & calculate the mean
3) Compare the means of the two samples
x??

#### Monte Carlo Sampling
Monte Carlo sampling solves really hard problem sby random sampling the solution space, instead of doing the real work.

:p What is Monte Carlo Sampling?
??x
Is the same thing as random sampling from a distribution
x??

#### Sampling Variability
This implies that a single sample mean is not a good estimate of the population parameter

:p What is Sampling Variability?
??x
Sampling Variability is the variability of the sample mean from one sample to another
x??