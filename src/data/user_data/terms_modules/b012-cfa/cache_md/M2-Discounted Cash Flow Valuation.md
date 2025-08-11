---
tags:
  - CFA
---
- remember u can use mathpnix to take the photos
- Everytime you finish or mid video, pause and run your flashcards of that modulo

## 2.1 Present and Future Values

Provide the  formula for future value with continuous compounding:
?x
- $\mathrm{FV}=\mathrm{PV} \times \mathrm{e}^{\mathrm{r} t}$
reloa
#### Example Zero Coupon Bond

Example:
A zero-coupon bond has a face value of $\$ 1,000$ and 15 years to maturity. The bond's yield is $4 \%$ with annual compounding.
?p: Calculate the price of the bond.
??x
Using the PV formula:

$$
\begin{aligned}
P V & =F V /(1+r)^t \\
& =\$ 1,000 /(1.04)^{15}=\$ 555.26
\end{aligned}
$$
Using the calculator:
FV & $=1,000$ & 
N & $=15$ & 
$\mathrm{I} / \mathrm{Y}$ & $=4$ & 
PMT & $=0$ & 
CPT & PV $=\$ 555.26$

x??

#### Zero Coupon Bond with a  Negative Yield

Example:
A zero-coupon bond with 15 years to maturity has a face value of $\$ 1,000$. Its yield is a -0.5\% yield with annual compounding. Calculate the price of the bond.
?p: Calculate the price of the bond.

?x
Using the calculator:
FV & $=1,000$ & (future / face value) \\
N & $=15$ & (bond maturity) \\
$\mathrm{I} / \mathrm{Y}$ & $=-0.5$ & (annual yield) \\
PMT & $=0$ & (no coupon payments) \\
CPT PV & $=\$ 1,078.09$
Using the PV formula:
$$
\begin{aligned}
P V & =F V /(1+r)^t \\
& =\$ 1,000 /(1-0.005)^{15}=\$ 1,078.09
\end{aligned}
$$

#### Fixed Coupon Bond
Fixed coupon
- May be paid annually, semiannually, or quarterly
- Fixed percentage of the bond's face value (par value)
- Coupon remains fixed, but bond's yield may change
Fixed coupon vs. bond yield
- If the coupon = yield:: bond will trade at par
- If the coupon > yield:: bond will trade above par
- If the coupon < yield:: bond will trade at a discount to par


Example:
Consider a 10-year, 10\% coupon, annual-pay bond with \$1,000 pa value and a yield to maturity of 8\%.
Q1. Determine if the bond will be priced above, below, or at par (without a calculation).
Q2. Calculate the price of the bond.
?x
Q1. Will the bond trade above, below, or at par?
The coupon ( $10 \%$ ) is > the yield ( $8 \%$ ), so the bond will trade above par.
.
Q2. Calculate the price of the bond.
$$
\begin{aligned}
& F V=1,000 \\
& N \quad=10 \\
& I / Y=8 \\
& P M T=100(10 \% \times \$ 1,000) \\
& C P T P V=\$ 1,134.20
\end{aligned}
$$



### Perpetual and Amortizing Bonds

Perpetual bonds
- Have no maturity date
- Also known as perpetuities
- PV of a perpetuity = cash flow received / required return

Amortizing bonds
- Regular payments to investors include:: interest and principal
- With fixed-coupon bonds, principal is only repaid at maturity
- Amortizing bonds are annuity instruments


#### Computing Loan Payments
Amortizing loan payments contain both interest and principal. This is also known as an annuity payment.

Example:
Consider a \$2,000 loan over a 13-year period with annual loan payments at the end of each year. The annual interest rate is $6 \%$. Calculate the annual loan payment.
?p: Calculate the annual loan payment
?x
$$
\begin{aligned}
&\text { Annual loan payment: }\\
&\begin{array}{lll}
\mathrm{PV} & =2,000 & \\
\mathrm{FV} & =0 & \\
\mathrm{I} / \mathrm{Y} & =6 & \\
\mathrm{~N} & =13 & \text { (fully amortizing) } \\
& \text { (years) }
\end{array}\\
&\text { CPT PMT }=-\$ 225.92 \text { is the annual payment }
\end{aligned}
$$

#### Valuing Equity Securities
What is the value of a security?
- The present value of its future cash flows

$$
\begin{aligned}
& A=L+\epsilon \\
& A-L=\epsilon
\end{aligned}
$$


Preferred and common stock
- Preferred stock pays a:: fixed dividend, assumed to be paid in perpetuity
- Common stock is:: a residual claim to a company's assets, with uncertain cash flows
- Required return:: is the discount rate used to bring future cash flows back to present values


#### Example Value preferred Stock as a Perpetuity
Value preferred stock as a perpetuity
- Preferred stock pays a fixed stream of dividends
- Dividends are assumed to be infinite
- PV of a perpetuity = dividend received / required return

Example:
A company's $\$ 100$ par preferred stock pays a $\$ 5.00$ annual dividend. The required return is $8 \%$. Calculate the value of the preferred stock.
?x
$$
\begin{aligned}
\text { Value } \quad & =\text { dividend } / \text { required return } \\
& =\$ 5.00 / 0.08 \\
& =\$ 62.50 \\
\end{aligned}
$$

Future dividends are uncertain (three approaches):
1. Assume a constant future dividend (as with preferred stock)
2. Assume a constant growth rate of dividends
3. Assume a changing growth rate of dividends

Constant growth dividend discount model
- Also known as the Gordon growth model
- Dividends are expected to grow at a constant growth rate, $g_c$
- Required equity return, $\mathrm{k}_{\mathrm{e}}$, must be greater than $\mathrm{g}_{\mathrm{c}}$


## Module 2.2: Implied Returns and Cash Flow Additivity


#### Required Rate of Return

Given a present value, a future value, a time period, and any interim cash flows, we can solve for the required return of a security.

Example:
A zero-coupon bond with a 15-year maturity has a face value of $\$ 1,000$. The bond is priced at $\$ 650$. Calculate the annualized return, assuming annual compounding.
?X
Using the calculator: the result should be iY of 2.9
$$
\begin{aligned}
&\text { Using the calculator: }\\
&\begin{aligned}
\mathrm{PV} & =-650 \\
\mathrm{FV} & =1,000 \\
\mathrm{~N} & =15 \\
\text { PMT } & =0
\end{aligned}
\end{aligned}
$$

Now, consider that this
Example:
Consider a 10-year, 10\% coupon, annual-pay bond with a price of $\$ 1,085.00$. Calculate the yield to maturity.
?x
this should be 8.96
$$
\begin{aligned}
P V & =-1,085 \\
F V & =1,000 \\
N & =10 \\
P M T & =100(=10 \% \times \$ 1,000 \text { par value })
\end{aligned}
$$


#### Cash Flow Additivity Principle

The cash flow additivity principle states that the PV of any stream of cash flows equals to what of the pv inidividual cashflows?:: the sum of the PVs of the individual cash flows.

Example:
A security makes payments of $\$ 100, \$ 100, \$ 400$, and $\$ 100$ over the next four years.
Q1. Calculate the PV of the security, assuming a discount rate of $10 \%$.
Q2. Calculate the PV of a 4-year annuity paying \$100 and a 3-year zero-coupon bond with a par value of $\$ 300$, and a $10 \%$ required return.
?x
In calculator to run the first one is:
clear out usin 2nd CE|C
1. CF
2. Flecha abajo hasa que haya CF0 y inserta usando button enter al costado de la flecha
3. cuando este listo apretas npv, insertas el discount rate y apretas cpt
Answer should be 542
You can also add them up like:
>![[Pasted image 20250629161409.png]]
>  By adding those two computations you get the same result. 


To clear all work from the calculator press
?x
2nd +fv (clr TVM)
2nd CLE|C  (CLWORK)


No-Arbitrage Principle states thatn if two sets of cash flows are identical under all conditions...
?x
The law of one price states that if two sets of cash flows are identical under all conditions, they will have the same price today.

No-arbitrage condition states that If prices are not identical, investors will...
?x
If prices are not identical, investors will buy the lower-priced asset, and sell the higher-priced asset, which drives the prices together.

No-arbitrage valuation states that Forward interest rates, forward exchange rates, and option pricing ...
?x
Forward interest rates, forward exchange rates, and option pricing all use the principle that equivalent cash flows must have the same value.

### Forward Interest Rates

A forward interest rate is a borrowing or lending rate that starts...
?x
at some future date, for a set time period.


| $1 y 1 y$ Something interesting | starts in 1 year  | 1 -year rate |
| :------------------------------ | :---------------- | :----------- |
| $2 y 1 y$                       | starts in 2 years | 1 -year rate |
| $3 y 2 y$                       | starts in 3 years | 2 -year rate |

A spot interest rate is a borrowing or lending rate that starts...
?x
today, for a set time period.


No-arbitrage
- Consider a 3-year spot rate.
- Compare to a 1 -year spot rate; reinvest at the 1 y 1 y and at the 2 y 1 y .
- The overall 3 -year return must be equal.
$$
\begin{aligned}
&\text { No-arbitrage relationship: }\\
&\left(1+S_2\right)^2=\left(1+S_1\right)(1+1 y 1 y)
\end{aligned}
$$

Example:
The 2 -year spot rate is $8 \%$ and the 1 -year spot rate is $4 \%$.
Calculate the 1-year forward 1-year rate (1y1y).
?x
$$
1+1 y 1 y=\frac{(1.08)^2}{1.04}=1 + 12.154 \%
$$


### Questions

An asset manager's portfolio had the following annual rates of return:

| Year | Return |
| :--- | :--- |
| $20 \times 7$ | $+6 \%$ |
| $20 \times 8$ | $-37 \%$ |
| $20 \times 9$ | $+27 \%$ |

The manager states that the return for the period is $-5.34 \%$. The manager has reported the:
A) arithmetic mean return.
B) geometric mean return.
C) holding period return.

A bond was purchased exactly one year ago for $\$ 910$ and was sold today for $\$ 1,020$. During the year, the bond made two semi-annual coupon payments of $\$ 30$. What is the holding period return?
A) $12.1 \%$.
B) $18.7 \%$.
C) $6.0 \%$.
?x
To calculate the Holding Period Return (HPR), use the formula:
$$
\text { HPR }=\frac{\text { Income }+ \text { Price Change }}{\text { Initial Price }}=\frac{\left(\text { Coupon Payments }+\left(P_{\text {final }}-P_{\text {initial }}\right)\right)}{P_{\text {initial }}}
$$
Given:
- $P_{\text {initial }}=910$
- $P_{\text {final }}=1020$
- Coupon payments $=2 \times 30=60$
Plug into the formula:
$$
\mathrm{HPR}=\frac{60+(1020-910)}{910}=\frac{60+110}{910}=\frac{170}{910} \approx 0.1868=18.7 \%
$$



An investor buys a share of stock for $\$ 200.00$ at time $t=0$. At time $t=1$, the investor buys an additional share for $\$ 225.00$. At time $t=2$ the investor sells both shares for $\$ 235.00$. During both years, the stock paid a per share dividend of $\$ 5.00$. What are the approximate time-weighted and money-weighted returns respectively?
A) $10.8 \% ; 9.4 \%$.
В) $7.7 \% ; 7.7 \%$.
C) $9.0 \% ; 15.0 \%$.
?x
A) $10.8 \% ; 9.4 \%$.


Wei Zhang has funds on deposit with Iron Range bank. The funds are currently earning 6\% interest. If he withdraws $\$ 15,000$ to purchase an automobile, the $6 \%$ interest rate can be best thought of as a(n):
A) discount rate.
B) financing cost.
C) opportunity cost.
?x
C) opportunity cost.
The return Wei gives up by using his money elsewhere
Opportunity Cost	The return Wei gives up by using his money elsewhere
Discount Rate	Used to calculate present value of future cash flows
Financing Cost	Cost incurred when borrowing funds (e.g., loan interest)


An investor buys one share of stock for $100. At the end of year one she buys three more shares at $89 per share. At the end of year two she sells all four shares for $98 each. The stock paid a dividend of $1.00 per share at the end of year one and year two. What is the investor's time-weighted rate of return?
??x
A)0.06%.
The holding period return in year one is ($89.00 – $100.00 + $1.00) / $100.00 = -10.00%.

The holding period return in year two is ($98.00 – $89.00 + $1.00) / $89 = 11.24%.

The time-weighted return is [{1 + (-0.1000)}{1 + 0.1124}]1/2 – 1 = 0.06%.
x??


An investor buys one share of stock for $\$ 100$. At the end of year one she buys three more shares at $\$ 89$ per share. At the end of year two she sells all four shares for $\$ 98$ each. The stock paid a dividend of $\$ 1.00$ per share at the end of year one and year two. What is the investor's money-weighted rate of return?
A) $0.06 \%$.
B) $5.29 \%$.
C) $6.35 \%$.
?x
C) $6.35 \%$.
1. Press CF (Cash Flow)
2. Input initial cash flow:
- $\mathrm{CF} 0=-100 \rightarrow$ press ENTER, then $\downarrow$
3. Input first year net cash flow:
- $\mathrm{C} 01=-266 \rightarrow$ ENTER, then
- $F 01=1 \rightarrow$ ENTER, then $\downarrow$
4. Input second year cash flow:
- $\mathrm{C} 02=396 \rightarrow$ ENTER, then $\downarrow$
- $\mathrm{F} 02=1 \rightarrow$ ENTER
1. Press IRR, then CPT (Compute)


Selmer Jones has just inherited some money and wants to set some of it aside for a vacation in Hawaii one year from today. His bank will pay him 5\% interest on any funds he deposits. In order to determine how much of the money must be set aside and held for the trip, he should use the $5 \%$ as a:
A) discount rate.
B) opportunity cost.
C) required rate of return.
??x

discount rate.

|Term|Meaning in Context|
|---|---|
|**Discount Rate**|✔ Used to find today's value of future money|
|Opportunity Cost|The value of the best alternative use of funds|
|Required Rate of Return|Used in investments to judge performance threshold|

x??


On January 1, Jonathan Wood invests $\$ 50,000$. At the end of March, his investment is worth $\$ 51,000$. On April 1, Wood deposits \$10,000 into his account, and by the end of June, his account is worth \$60,000. Wood withdraws \$30,000 on July 1 and makes no additional deposits or withdrawals the rest of the year. By the end of the year, his account is worth $\$ 33,000$. The time-weighted return for the year is closest to:
A) $10.4 \%$.
B) $5.5 \%$.
C) $7.0 \%$.
??x
a) $10.4 \%$.

|Date|Event|
|---|---|
|Jan 1|Invest $50,000|
|Mar 31|Value = $51,000|
|Apr 1|Add $10,000 (now total = $61,000)|
|Jun 30|Value = $60,000|
|Jul 1|Withdraw $30,000 → balance = $30,000|
|Dec 31|Value = $33,000|
Period 1: Jan $1 \rightarrow$ Mar 31

$$
R_1=\frac{51,000-50,000}{50,000}=2.00 \%
$$


Period 2: Apr $1 \rightarrow$ Jun 30
Start $=51,000+10,000=61,000$ (accounting for April 1 deposit)

$$
R_2=\frac{60,000-61,000}{61,000}=-1.639 \%
$$


Period 3: Jul $1 \rightarrow$ Dec 31
Start $=\$ 30,000$ (after $\$ 30 \mathrm{k}$ withdrawal)

$$
R_3=\frac{33,000-30,000}{30,000}=10.00 \%
$$

- Step 2: Chain the returns

$$
\begin{gathered}
\mathrm{TWR}=\left(1+R_1\right)\left(1+R_2\right)\left(1+R_3\right)-1 \\
=(1.02)(0.98361)(1.10) \approx 1.1044-1=10.44 \%
\end{gathered}
$$

x??

An investor makes the following investments:
- She purchases a share of stock for $\$ 50.00$.
- After one year, she purchases an additional share for $\$ 75.00$.
- After one more year, she sells both shares for $\$ 100.00$ each.
- There are no transaction costs or taxes.
During year one, the stock paid a $\$ 5.00$ per share dividend. In year 2 , the stock paid a $\$ 7.50$ per share dividend. The investor's required return is $35 \%$. Her money-weighted return is closest to:
A) $48.9 \%$.
B) $16.1 \%$.
C) $-7.5 \%$.
??x

 $48.9 \%$.

| Time (Years) | Event                                                         | Net Cash Flow     |
| ------------ | ------------------------------------------------------------- | ----------------- |
| 0            | Buy 1 share @ $50                                             | **−50**           |
| 1            | Receive $5 dividend, buy 1 share @ $75                        | **−70** = −75 + 5 |
| 2            | Receive $7.50 × 2 = $15, sell both shares @ $100 = $200 total | **+215**          |

Press CF

CF0 = -50 → ENTER → ↓

C01 = -70 → ENTER → ↓
F01 = 1 → ENTER → ↓

C02 = 215 → ENTER → ↓
F02 = 1 → ENTER

Press IRR, then CPT

x??


 Given a holding period return of R , the continuously compounded rate of return is:
A) $e^R-1$.
B) $\ln (1+R)$.
C) $\ln (1+R)-1$.
:p the continuously compounded rate  is...
??x
 $\ln (1+R)$

|Option|Expression|Meaning|
|---|---|---|
|A|eR−1e^R - 1|This converts **continuously compounded return to simple return**, not the other way around. ❌|
|B|ln⁡(1+R)\ln(1 + R)|✅ Correct formula for converting HPR to continuously compounded return|
|C|ln⁡(1+R)−1\ln(1 + R) - 1|This subtracts 1 unnecessarily. ❌|

x??