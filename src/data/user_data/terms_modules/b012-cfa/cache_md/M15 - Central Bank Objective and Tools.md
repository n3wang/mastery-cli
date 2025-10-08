Roles of Central Banks
Central banks have several roles:
- Sole supplier of currency: legal tender, medium of exchange, fiat
- Banker to banks and government
- Regulate banking and payments systems
- Lender of last resort: ability to print money
- Hold gold and foreign currency reserves
- Conduct monetary policy: influence money supply


Objectives of Central Banks
The primary objective of central banks is to control inflation. High inflation leads to menu costs and shoe leather costs.

Some central banks also attempt to have the following:
- Stability in exchange rates with foreign currencies (e.g., USD peg)
- Full employment
- Sustainable positive growth
- Moderate long-term interest rates

The target inflation rate in developed countries is a range around $2 \%$ to $3 \%$.


Monetary Policy Tools
Three main policy tools of central banks: policy rate, reserve requirements, and open market operations

Policy rate: interest rate central banks charge banks for borrowed reserves (a.k.a. the discount rate in the U.S. and refinancing rate for ECB)
- Increasing policy rate discourages banks from borrowing reserves; thus, banks reduce their lending
- Decreasing policy rate tends to increase the amount of lending and the money supply
- The U.S. Fed sets a target for the fed funds rate, the rate at which banks lend short term to each other

Monetary Policy Tools
Repurchase agreements are also used by central banks to lend money to banks.
- Example: Bank of England two-week repo

The central bank buys securities from a bank, which agrees to repurchase them at a higher price two weeks later.
- The two-week repo rate is termed the policy rate in the United Kingdom. A lower rate reduces banks' cost of funds, encourages lending, and decreases rates.

Monetary Policy Tools
Open market operations: most often used
- Central bank buys government securities for cash, reserves increase, money supply increases
- Selling securities decreases the money supply

Required reserve ratio: seldom changed
- Reducing required reserve percentage increases excess reserves and increases the money supply
- Increasing required reserve ratio decreases the money supply

Monetary Policy Transmission
The monetary transmission mechanism refers to four channels through which changes in policy affect prices and inflation.

Example: contractionary policy
1. Policy rate increases, banks' short-term lending rates increase, decreased aggregate demand
2. Asset prices decrease, discount rates increase, savings increase
3. Consumers' and businesses' expectations decrease expenditures
4. Domestic currency appreciates, reduce demand for exports

Overall, aggregate demand decreases; downward pressure on prices


Monetary Policy Effects on Economy
When a central bank buys securities:
- Bank reserves increase
- Interbank lending rates decrease
- Short-term and long-term lending rates decrease
- Businesses increase investment
- Consumers increase durable goods purchases
- Domestic currency depreciates, exports increase

Overall, aggregate demand increases

Monetary Policy Effects on Economy
When a central bank decreases the policy rate:
- Market rates decrease
- Lenders reduce short-term and long-term lending rates
- Interbank lending rates decrease
- Firms and individuals raise their growth expectations
- Businesses increase investment
- Consumers increase durable goods purchases
- Domestic currency depreciates, exports increase

---

Excercises

#### Roles of Central Banks

Central banks perform crucial functions to ensure monetary and financial stability within an economy.

:p List **three key roles** of a central bank.  
??x
1. **Sole supplier of currency** – issues legal tender used as a medium of exchange.
2. **Lender of last resort** – provides emergency funding to banks, maintaining financial stability.
3. **Conducts monetary policy** – manages money supply and interest rates to influence economic activity.  
x??


---

#### Objectives of Central Banks

The central bank’s main goal is to maintain price stability while promoting economic growth and employment.

:p What is the **primary objective** of most central banks, and what is the **target inflation range** in developed countries?  
??x
- Primary objective: **Control inflation**.
- Target inflation: **Between 2% and 3%** annually.  
x??


---

#### Monetary Policy Tools

Central banks adjust the money supply and interest rates using three main tools.

:p Name the **three main monetary policy tools** used by central banks.  
??x
1. **Policy rate** – interest rate charged to banks for borrowing reserves.
2. **Reserve requirements** – minimum reserves banks must hold.
3. **Open market operations** – buying or selling government securities to adjust liquidity.  
x??


---

#### Policy Rate Mechanism

The policy rate influences the cost of borrowing and lending in the economy.

:p What happens to the **money supply and lending** when a central bank **raises the policy rate**?  
??x
- Higher policy rate makes borrowing costlier for banks.
- Banks lend less to consumers and firms.
- **Money supply decreases** and **aggregate demand falls**.  
x??


---

#### Open Market Operations

These are the most frequently used monetary tools.

:p What is the effect on the **money supply** when a central bank **buys government securities** in the open market?  
??x  
When the central bank buys securities, banks receive cash in exchange.
- **Bank reserves increase**,
- **Interest rates decrease**,
- **Money supply expands**, boosting aggregate demand.  
x??


---

#### Reserve Requirement Ratio

This tool affects the proportion of deposits banks must hold as reserves.

:p Explain how **reducing the required reserve ratio** affects lending and the money supply.  
??x  
Reducing reserve requirements leaves banks with more **excess reserves** to lend.  
→ **Lending increases**, and the **money supply expands**.  
x??

---

#### Monetary Transmission Mechanism

Policy changes affect the economy through various channels before influencing prices.

:p List the **four main channels** of the monetary transmission mechanism.  
??x
1. **Interest rate channel** – changes in borrowing costs affect consumption and investment.
2. **Asset price channel** – policy changes influence stock and bond valuations.
3. **Expectations channel** – altered confidence changes spending behavior.
4. **Exchange rate channel** – currency appreciation/depreciation affects exports and imports.  
x??


---

#### Effects of Expansionary Monetary Policy

An expansionary stance aims to stimulate the economy through lower interest rates and increased liquidity.

:p Describe the **chain of effects** when a central bank **decreases the policy rate**.  
??x
1. Market and interbank rates **decrease**.
2. Businesses **invest more**; consumers buy more durable goods.
3. Domestic currency **depreciates**, boosting exports.
4. **Aggregate demand increases**, stimulating GDP growth.  
x??


---

#### Effects of Contractionary Monetary Policy

Used to slow inflation and prevent overheating of the economy.

:p What are the **macroeconomic effects** of a contractionary monetary policy?  
??x
- **Higher interest rates** reduce borrowing and investment.
- **Asset prices fall**, and **currency appreciates**, reducing exports.
- **Aggregate demand decreases**, placing **downward pressure on prices**.  
x??

---


#### Repo Rates and Policy Rates

Central banks use **policy rates** and **repo rates** to control the cost and availability of money in the banking system. These rates are core tools of **monetary policy** that influence lending, borrowing, and inflation levels.

To visualize this relationship computationally:

```python
def money_supply_effect(policy_rate, repo_rate):
if policy_rate < repo_rate:
	return "Expansionary: cheap funding, money supply increases."
elif policy_rate > repo_rate:
	return "Contractionary: expensive funding, money supply decreases."
else:
	return "Neutral: stable liquidity conditions."

# Example usage:
print(money_supply_effect(3.0, 2.5))
# Output: "Expansionary: cheap funding, money supply increases."
```

This illustrates how **changes in repo and policy rates** directly influence liquidity and economic activity.

:p Explain how **repo rates** and **policy rates** work in central bank operations.
??x
1. **Policy rate** – the general term for the **interest rate** at which the central bank lends money to commercial banks.
* When the policy rate **increases**, borrowing becomes **more expensive**, reducing lending and slowing the economy.
* When it **decreases**, borrowing becomes **cheaper**, stimulating lending and economic growth.

1. **Repo rate (repurchase agreement rate)** – a **short-term lending tool** used by central banks.
* The central bank **buys securities** (like government bonds) from commercial banks with an agreement that the banks will **repurchase** them later at a higher price.
* The difference between the sale and repurchase price represents the **interest rate (repo rate)**.

* A **lower repo rate** → cheaper short-term funding → **increases money supply**.
* A **higher repo rate** → costlier borrowing → **reduces liquidity** and controls inflation.

**In summary:**
* The **policy rate** is the benchmark guiding all short-term interest rates.
* The **repo rate** is one mechanism through which that policy rate is applied in practice.
x??

---

Central Bank Essential Qualities
To be effective, central banks should be independent (i.e., free from political interference)
- Operational independence: independently sets the policy rate
- Target independence: sets the inflation target, measures inflation, determines the horizon to meet the target

Not absolute; viewed as degree of independence


Central Bank Essential Qualities
To be effective, central banks should have credibility and transparency.
- They should have credibility to follow through on their stated intentions. Market participants know that the central bank is serious about achieving an inflation target.
- They should have transparency of the economic indicators and other factors used to establish the interest rate setting policy (and issue inflation reports).


Central Bank Targets
Interest rate targeting: increase (decrease) money supply growth when interest rates are above (below) targets

Inflation targeting: target band for inflation rate (1\% to 3\%)
- Increase money supply growth when inflation is below target band; decrease money supply growth when inflation is above target band
- Target inflation band $>0$ to prevent deflation

Central Bank Targets
Exchange rate targeting: used by developing countries to target a currency exchange rate with a developed country (e.g., USD)
- If the domestic currency falls relative to USD, central bank uses foreign reserves to buy the domestic currency
- Sell (buy) domestic currency when above (below) target
- Central bank doesn't react to domestic economic conditions
- Result of successful exchange rate targeting is same inflation rate in domestic economy as in targeted developed country

Limitations of Monetary Policy (1)
Monetary policy does not always produce the intended results.

Expected inflation
- If individuals and businesses believe that a decrease in money supply will be successful, they expect lower inflation rates.
- Long-term bond yields that include an inflation premium will fall, tending to increase economic growth.
- The central bank intended to slow economic activity.

Limitations of Monetary Policy (2)
Monetary tightening may be viewed as too extreme:
- Increasing the probability of a recession
- Reducing long-term interest rates
- Making long-term bonds more attractive

Bond market "vigilantes"
If monetary supply growth is seen as inflationary:
- Higher future asset prices are expected
- Increase long-term rates
- Long-term bonds become relatively less attractive

Limitations of Monetary Policy (3)
A liquidity trap may occur if the demand for money becomes very elastic.

Liquidity trap
- Individuals willingly hold more money, even without a decrease in short-term rates.
- Increasing the growth of the money supply will not decrease short-term rates (individuals hold the money in cash balances).
- It may occur with deflation, even if the money supply is expansionary.

Limitations of Monetary Policy (4)
Deflation is more difficult for central banks than inflation. Once policy rates are zero, there is limited ability to stimulate the economy.

Quantitative easing was used by central banks to increase the money supply as rates were near zero (post the credit bubble collapse, 2008):
- In the U.K.-large purchases of government bonds, to reduce rates
- In the U.S.-large purchases of Treasuries, mortgage securities, and other credit risky securities, to encourage lending and reduce rates
- Improved banks' $\mathrm{B} / \mathrm{S}$, shifting risk from private to public sectors

---


#### Central Bank Essential Qualities – Independence

A strong central bank must be **independent** from political influence to ensure that decisions are made based on economic stability rather than short-term political goals. Independence promotes **consistency, credibility, and control over inflation expectations**.

:p Explain the **two types of independence** a central bank can have and why they matter.  
??x
1. **Operational independence** – The central bank can independently **set the policy rate** (interest rate) to achieve its monetary goals without direct government approval.
    - Example: Adjusting interest rates to control inflation or stimulate growth based on data, not politics.
2. **Target independence** – The central bank can **set its own inflation target**, decide **how to measure inflation**, and determine the **time horizon** to meet the target.
    - Example: Choosing a 2% inflation target and the strategy to reach it over a specific period.
➡️ These forms of independence allow the bank to act objectively, fostering **market confidence** and **price stability**.  
x??

---

#### Central Bank Essential Qualities – Credibility and Transparency

Credibility and transparency make monetary policy **predictable and trusted** by financial markets, reducing uncertainty and volatility.

:p Why are **credibility and transparency** essential qualities for a central bank?  
??x
- **Credibility:** The public and investors must believe that the central bank will **follow through on its stated goals**, such as maintaining inflation near 2%.
    - Example: If the bank consistently meets its inflation target, people expect stable prices, which helps anchor inflation expectations.
- **Transparency:** The central bank must **clearly communicate** the data, reasoning, and models behind its decisions.
    - Example: Publishing regular **inflation reports** or **minutes of policy meetings** increases public trust.
Together, these qualities enhance the **effectiveness of policy** and reduce speculation in financial markets.  
x??

---

#### Central Bank Targets – Interest Rate Targeting

Interest rate targeting focuses on maintaining a desired **short-term interest rate** to stabilize money supply and demand.

:p How does **interest rate targeting** help stabilize the economy?  
??x
- The central bank sets a **target interest rate** (e.g., the policy rate).
- If actual rates are **above** the target → central bank **increases money supply** (buys bonds) to lower rates.
- If actual rates are **below** the target → central bank **reduces money supply** (sells bonds) to raise rates.

By adjusting liquidity, the central bank keeps borrowing costs stable, **supporting growth and controlling inflation**.  
x??

---

#### Central Bank Targets – Inflation Targeting

Inflation targeting seeks to maintain a **specific band of inflation**, ensuring price stability and economic predictability.

:p Describe how **inflation targeting** works and why the target is usually above 0%.  
??x
- The central bank sets a **target inflation range** (commonly **1%–3%**).
- If inflation is **below** the band → it **increases money supply** (cuts rates, buys bonds).
- If inflation is **above** the band → it **tightens policy** (raises rates, sells bonds).
- Targeting inflation **above 0%** prevents **deflation**, which discourages spending and investment.

This framework anchors public expectations and promotes **stable, sustainable growth**.  
x??

---

#### Central Bank Targets – Exchange Rate Targeting

Some developing nations stabilize their economies by **linking their currency** to that of a stable, developed country (like the U.S. dollar).

:p Explain how **exchange rate targeting** works and its main consequences.  
??x
- The central bank sets a **fixed or narrow range** for its exchange rate with a major currency (e.g., USD).
- If the domestic currency **depreciates**, it **uses foreign reserves to buy** its own currency.
- If it **appreciates**, it **sells** domestic currency to weaken it.
- This means the central bank **focuses on exchange rate stability** rather than internal economic conditions.

✅ **Result:** Domestic inflation aligns with the inflation rate of the target country.  
⚠️ **Drawback:** The central bank **loses autonomy** over its domestic monetary policy.  
x??



