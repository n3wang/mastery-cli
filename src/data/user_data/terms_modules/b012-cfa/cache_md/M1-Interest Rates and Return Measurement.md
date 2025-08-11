---
tags:
  - CFA
---



## Modulo 1.1 Interest Rates and Return of Measurement

- Default risk::-a borrower may not make the promised payments
- Liquidity risk::-receiving less than fair value; unable to sell
- Maturity risk::—longer-dated bonds have higher interest rate risk

Nominal Interest Rates
Nominal risk-free rate
- $(1+$ nominal RFR$)=(1+$ real RFR$) \times(1+$ expected inflation $)$

Real Risk Free Rate
- Expected Inflation::Compensates investors for expected inflation and reflects the average inflation rate expected over the maturity of the debt. Inflation reduces the purchasing power of a unit of currency
- Default Risk Premium::compensates investors for the possibility that the borrower will fail to make a promised payment at the contracted time and in the contracted amount.
- Liquidity Risk Premium::ompensates investors for the risk of loss relative to an investment’s fair value if the investment needs to be converted to cash quickly
- Maturity Risk Premium::compensates investors for the increased sensitivity of the market value of debt to a change in market interest rates as maturity is extended, in general (holding all else equal).

Risk premiums
?x
- Each factor is associated with a risk premium required by investors
- A required return is sum of the real risk-free rate plus the relevant risk premiums

>![[Pasted image 20250510220956.png]]
Nevermind






#### Holding period return (HPR)

Investors may hld an investment for any chosen period, THE HPR is the return fromt he start to the end of this period
- HPR no income = (end value / beginning value) - 1
- HPR with income $=[($ end value + dividend $) /$ beginning value $]-1$

#cfa-problem
A stock is valued at $\$ 20$ at T 0 , and $\$ 22$ at T 1 and pays a $\$ 1$ dividend over the period. Calculate the HPR.
?x
$$
\begin{aligned}
& P_0=\$ 20 \\
& P_1=\$ 22 \\
& \text { Duidend }=\$ 1 \\
&\left(\frac{P_1+D_{\text {Niddend }}}{P_0}\right)-1 \\
& \frac{22+1}{20}-1 \\
& \frac{23-20}{20}=\frac{3}{20}
\end{aligned}
$$


#cfa-problem 
One way to calculate the annualized mean is to calclate the aritmtic mean of it's returns.
Example:  For the last three years, the returns for Acme Corporation common stock have been $-9.34 \%, 23.45 \%$, and $8.92 \%$. Calculate the arithmetic mean return over the three-year period.



#### Geometric Mean

#cfa-problem 
The geometric mean return is a compounded average return over a period.

$$
G M=\sqrt[n]{\left(1+R_1\right) \times\left(1+R_2\right) \times\left(1+R_3\right) \times \ldots \times\left(1+R_n\right)}-1
$$
Example:
For the last three years, the returns for Acme Corporation common stock have been $-9.34 \%, 23.45 \%$, and $8.92 \%$. Calculate the compound annual rate of return over the three-year period.

?x
$$
\begin{aligned}
&\text { Geometric Mean Solution }\\
&\begin{aligned}
\text { GM } & =\sqrt[n]{\left(1+R_1\right) \times\left(1+R_2\right) \times\left(1+R_3\right) \times \ldots \times\left(1+R_n\right)}-1 \\
& =\sqrt[3]{(1-0.0934) \times(1+0.2345) \times(1+0.0892)}-1 \\
& =\sqrt[3]{1.21903}-1 \\
& =6.825 \%
\end{aligned}
\end{aligned}
$$
> The Geometric Mean Formula solution







#cfa-problem 
Example: For the last four semiannual perieds, the 6-month holding period returns on an investment were $2.0 \%, 0.5 \%,-1.0 \%$, and $1.5 \%$. Calculate the geometric mean and the annual rate of return.
?x
Answer:
$$
\begin{aligned}
\text { Geometric mean } & =\sqrt[4]{(1+0.02)(1+0.005)(1-0.01)(1+0.015)}-1 \\
& =0.007435=0.7435 \% \\
\text { Annual return } & =\sqrt[2]{(1+0.02)(1+0.005)(1-0.01)(1+0.015)}-1 \\
& =0.0149=1.49 \%
\end{aligned}
$$
Geometric mean only equals annual return if the periods are annual.
Four Semianual: When something occurs in a "semiannual period," it happens twice a year. Therefore, "four semiannual periods" would represent a time frame of 2 years (since each semiannual period is 6 months, and 4 periods make up 24 months or 2 years).


#### Harmonic mean  average cost per share of stock
Harmonic mean is used to find the average cost per share of stock purchased over time, if each purchase is a constant dollar amount.
$$
\bar{X}_{\text {harmonic }}=\frac{N}{\sum_{i=1}^N \frac{1}{X_i}} \quad x_{i=\text { share price at time } i}
$$
#cfa-problem 
Example: An investor purchases \$1,000 of mutual fund shares each month. Over the last three months, the prices paid were $\$ 8, \$ 9$, and $\$ 10$. Calculate the average cost per share.

| Month 1: | $\$ 1,000 / \$ 8$  | $=125.00$ shares |
| -------- | ------------------ | ---------------- |
| Month 2: | $\$ 1,000 / \$ 9$  | $=111.11$ shares |
| Month 3: | $\$ 1,000 / \$ 10$ | $=100.00$ shares |
| Total    |                    | $=336.11$ shares |
>I have no idea what I am doing

asdsa

> another quote
> 

Average price paid $=\$ 3,000 / 336.11=\$ 8.926$ per share
x??


We cannot calculate a harmonic mean with negative values, but with returns data we can use $(1+$ return $)$ and subtract 1 from the result.

#cfa-problem 
Example: For four periods, the returns on an investment were $20 \%$, $0.5 \%,-1.0 \%$, and $1.5 \%$. Calculate the harmonic mean of these relums
?x
Answer:
$$
\begin{aligned}
& \frac{1}{\frac{1}{(1+0.02)}+\frac{1}{(1+0.005)}+\frac{1}{(1-0.01)}+\frac{1}{(1+0.015)}}-1 \\
& =0.007369=0.7369 \%
\end{aligned}
$$


Appropriate uses
> ![[Pasted image 20250511001233.png]]

Geometric mean:: compound returns over multiple periods
Harmonic mean:: average share cost from fixed money purchases
Arithmetic mean:: include all values, even outliers

## Module 1.2: Money Weighted Rate of Return


#cfa-problem
Example:

#### 1.2 Money Weighted Rate of Return
An investor buys a share for $\$ 100$ at T0. At the end of Year 1, she buys an additional share for $\$ 120$. At the end of Year 2, she sells both shares for $\$ 130$ each. The stock pays a dividend of $\$ 2$ at the end of each year. Calculate the money-weighted rate of return.
??x

| - CF0 | +100 | ENTER | $\downarrow$ | (buys initial share) |
| :---- | :--- | :---- | :----------- | :------------------- |
| - C01 | +118 | ENTER | $\downarrow$ | (buys 2nd share, r   |
| - F01 | 1    | ENTER | $\downarrow$ | (frequency of CF)    |
| - C02 | -264 | ENTER | $\downarrow$ | (x2 shares, plus x'  |
| - F01 | 1    | ENTER | $\downarrow$ | (frequency of CF)    |

x??



The time-weighted return calculates a return for an individual subperiod (e.g., days or months). Subperiod returns can be compounded together to measure returns over longer periods.
$$
Holding Period Return = \left(\frac{P_1+c F_1}{P_0}\right){-1}
$$
Example:
An investor buys a share for $\$ 100$ at TO. At the end of Year 1, she buys an additional share for $\$ 120$. At the end of Year 2, she sells both shares for $\$ 130$ each. The stock pays a dividend of $\$ 2$ at the end of each year, which is not reinvested. Calculate the time-weighted rate of return.
?x
1) $\left(\frac{120+0}{100}\right)-1=0.22$
2) $\left(\frac{130 \times 2+2 \times 2}{120 \times 2}\right)-1=0.1$
3) $\sqrt[2]{(1+0.22) \times(1.1)}=15.84$


## Module 1.3 Common Measures of Return

Interest rates and market returns are typically stated as annualized returns, regardless of the length of time period over which they occur.

Annualized return $=(1+\text { HPR })^{365 / \text { days }}-1$

#### Example 1.3 Annualized Returns
Example: Annualized return, shorter than one year
A saver deposits $\$ 100$ into a bank account. After 90 days, the account balance is $\$ 100.75$. Calculate the saver's annualized rate of return.
?x
Annualized return $=(1+\mathrm{HPR})^{365 / \text { days }}-1$
$$
\begin{aligned}
\text { HPR } & =\text { (end } / \text { beg. })-1 \\
& =(1,000 / 970)-1 \\
& =3.09 \%
\end{aligned}
$$
Annualized return

$$
\begin{aligned}
& =(1.0309)^{365 / 500}-1 \\
& =2.25 \%
\end{aligned}
$$


### Compounding Frequency
An increase in compounding frequency increases the effective rate of interest. Increases in compound frequency
- increase the future value of a given cash flow, and
- decrease the present value of a given cash flow.

Present value of a future cash flow

$$
P V=F V_N\left(1+\frac{r}{m}\right)^{-m N}
$$

$r=$ quoted annual interest rate, 
$N=$ number of years, 
$m=$ compounding periods per year

#### Example 1.3 Effect of Compounding Frequency on PV
Example: 
$\$ 1,000$ is due to be received one year from now. The stated annual interest rate is $6 \%$. Calculate the PV assuming semiannual, quarterly, monthly, and daily compounding periods.
?x
$$
\begin{array}{ll}
P V=1,000\left(1+\frac{0.06}{2}\right)^{-2} & =942.60 \\
P V=1,000\left(1+\frac{0.06}{4}\right)^{-4} & =942.18 \\
P V=1,000\left(1+\frac{0.06}{12}\right)^{-12} & =941.91 \\
P V=1,000\left(1+\frac{0.06}{365}\right)^{-365} & =941.77
\end{array}
$$
> Do it using your calculator, to do the negative sign, click the button where on top is labelled as reset.

	
#### Example Annualized Returns Calculating from a year 

Example: annualized return, longer than one year 
An investor buys a 500-day government bill for $\$ 970$. The government bill is redeemed at maturity for $\$ 1,000$. Calculate the investor's annualized return.
HPR $=$ (end $/$ beg. $)-1$
?p: Calculate the investor's annualized return
?x
$$
\begin{aligned}
\text { HPR } & =(\text { end } / \text { beg. })-1 \\
& =(1,000 / 970)-1 \\
& =3.09 \%
\end{aligned}
$$
Annualized return
$$
\begin{aligned}
& =(1.0309)^{365 / 500}-1 \\
& =2.25 \%
\end{aligned}
$$

#### Example Annualized Rate of Return
Interest rates and market returns are typically stated as annualized returns, regardless of the length of time period over which they occur.

$$
\text { Annualized return }=(1+\mathrm{HPR})^{365 / \text { days }}-1
$$

Example: Annualized return, shorter than one year
A saver deposits $\$ 100$ into a bank account. After 90 days, the account balance is $\$ 100.75$. Calculate the saver's annualized rate of return.
$$
\text { Annualized return }=(1+\mathrm{HPR})^{365 / \text { days }}-1
$$
?p:  Calculate the saver's annualized rate of return.
?x
$$
\begin{aligned}
\text { HPR } & =(\text { end } / \text { beg. })-1 \\
& =(100.75 / 100)-1 \\
& =0.75 \%
\end{aligned}
$$
Annualized return
$$
\begin{aligned}
& =(1.0075)^{365 / 90}-1 \\
& =3.08 \%
\end{aligned}
$$



