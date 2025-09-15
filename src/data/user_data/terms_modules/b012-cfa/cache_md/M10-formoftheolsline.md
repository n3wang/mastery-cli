## Module 10.1: Linear Regression Basics


#### Linear Regression Assumptions Problems

1. Linearity
:p Suppose you have a dataset relating hours studied and exam scores. Explain why the assumption of linearity is important when applying linear regression. 
?x
If the relationship is not linear (e.g., quadratic or exponential), the regression model will give biased predictions since it only fits straight lines.


#### 2. Homoskedasticity
:p In a regression model predicting house prices, you notice that the variance of errors increases as house size increases. Which assumption is violated, and why does it matter?
?x
The assumption of homoskedasticity is violated because error terms should have constant variance. If variance changes with the predictor, standard errors become unreliable.


#### 3. Independence of Errors
:p A researcher collects time-series stock data and fits a linear regression model. They notice that residuals are correlated over time. Which assumption is violated?
?x
The independence of errors assumption is violated. Serial correlation in errors leads to biased standard error estimates.


#### Simple Linear Regression Problems
1. **Definition**  
:p Explain in your own words what simple linear regression is.  
?x  
Simple linear regression studies how changes in one independent variable affect one dependent variable, fitting a straight-line relationship between them.
    
---

#### 2. **Dependent Variable**  
:p In a study predicting student exam scores from hours studied, which variable is the dependent variable and why?  
?x  
The dependent variable is the **exam score** because it is being explained or predicted by the independent variable (hours studied).
  

---

#### 3. **Independent Variable**  
:p In the same study, which variable is the independent variable and why?  
?x  
 The independent variable is **hours studied** because it is used to explain changes in the dependent variable (exam score).
    

---

#### 4. **Terminology Check**  
:p Match the synonyms:
- Dependent variable = ?
- Independent variable = ?  
?x    
- Dependent variable = explained variable, endogenous variable, predicted variable.
- Independent variable = explanatory variable, exogenous variable, predicting variable.
    

#### Linear Regression Practice Problems
1. Compute the Slope
:p Given the covariance between S\&P 500 and ABC = 0.000336 and variance of S\&P $500=0.000522$, compute the slope coefficient.
?x
$$
b_1=\frac{\operatorname{Cov}(X, Y)}{\sigma_x^2}=\frac{0.000336}{0.000522}=0.64
$$

#### 2. Compute the Intercept
:p Using mean return $(A B C)=-4.05 \%$, mean return $($ S\&P 500$)=-2.70 \%$, and slope $=$ 0.64 , compute the intercept.
?x
$$
b_0=\bar{Y}-b_1 \bar{X}=-4.05 \%-0.64(-2.70 \%)=-2.3 \%
$$

#### 3. Interpret the Intercept
$: \mathrm{p}$ What does the intercept ( $-2.3 \%$ ) mean in the context of ABC stock regression?
?x
When S\&P 500 excess return $=0$, the expected ABC excess return is $-2.3 \%$.

#### 4. **Interpret the Slope**  
:p What does the slope (0.64) mean in the regression of ABC returns on S&P 500 returns?      
?x  
For every 1% increase in S&P 500 excess returns, ABC stock’s excess return increases by 0.64% on average.
    

---

#### 4. Interpret the Slope
:p What does the slope (0.64) mean in the regression of ABC returns on S\&P 500 returns?
?x
For every 1\% increase in S\&P 500 excess returns, ABC stock's excess return increases by $0.64 \%$ on average.



#### 5. Assumptions Check
:p List the four main assumptions of linear regression.
?x
6. Linear relationship between dependent and independent variables.
7. Error terms have constant variance (homoskedasticity).
8. Error terms are independent (no correlation).
9. Error terms are normally distributed.



#### 10. Application Question
:p If ABC's slope (0.64) is less than 1 , what does that say about its sensitivity to the market compared to the average stock?
?x
ABC is less sensitive to market movements (lower beta), meaning it is less volatile relative to the market.


---


ANOVA \& Mean Square Problems
#### 1. Formula Check
:p Write the formulas for Mean Square Regression (MSR) and Mean Square Error (MSE) in simple regression.
?x
$$
M S R=\frac{S S R}{1}, \quad M S E=\frac{S S E}{(n-2)}
$$


---

#### 2. Degrees of Freedom
:p In simple linear regression with $n=15$ observations, what are the degrees of freedom for Regression, Error, and Total?
?x
- Regression df $=1$
- Error df $=n-2=13$
- Total df $=n-1=14$


---

#### 3. ANOVA Table Completion
:p Suppose SSR $=120$ and SSE $=30$ with $n=16$. Fill the ANOVA table (SSR, SSE, SST, df, MSR, MSE).
??x

| Source     | df  | SS  | MS   |
| :--------- | :-- | :-- | :--- |
| Regression | 1   | 120 | 120  |
| Error      | 14  | 30  | 2.14 |
| Total      | 15  | 150 | 一    |

x??

---

#### 4. Interpretation of MSR and MSE
:p What does MSR measure? What does MSE measure?
?x
- MSR measures the explained variation in the dependent variable due to the regression (signal).
- MSE measures the unexplained variation in the dependent variable (noise).

#### 5. Relationship Between SSR, SSE, SST
:p State the relationship among SSR, SSE, and SST in regression. 
??x

$$
S S T=S S R+S S E
$$

(Total variation $=$ explained variation + unexplained variation $).$

x??

---

#### SEE & F-Test Problems

#### 1. **Definition of SEE**  
:p What does the Standard Error of the Estimate (SEE) measure in regression?  
?x  
SEE measures the accuracy of predicted values from the regression model. It is the standard deviation of the error term. Lower SEE = better model fit.
   

---

#### 2. **Formula for SEE**  
:p Write the formula for SEE in terms of SSE and sample size nn.  
?x
$$
SEE=SSEn−2=MSESEE = \sqrt{\frac{SSE}{n-2}} = \sqrt{MSE}
$$

---

#### 3. **Numerical Calculation**  
:p Compute the SEE when SSE = 0.0406 and n=36n=36.  ??x
$$
SEE=0.040634=0.0012=0.035SEE = \sqrt{\frac{0.0406}{34}} = \sqrt{0.0012} = 0.035
$$

x??


---

#### 4. **F-Test Hypotheses**  
:p In the F-test for regression, what are the null and alternative hypotheses?
??x
  - H0:β1=0H_0: \beta_1 = 0 (slope coefficient = 0, no relationship).
    
- HA:β1≠0H_A: \beta_1 \neq 0 (slope coefficient ≠ 0, relationship exists).
x??    

---

#### 5. **Decision Rule**  
:p When do we reject the null hypothesis in the F-test?  
?x  
Reject H0H_0 if the computed F-statistic > critical F value (from F-distribution table, given numerator and denominator df).

---

#### 6. **Interpretation**  
:p What does a significant F-statistic tell us in simple regression?  
?x  
It shows that the independent variable explains a significant portion of the variation in the dependent variable — i.e., the model is statistically significant overall.
    
---

