# High-Quality Flashcards: Case-in-Point-10_processed (Part 16)

**Starting Chapter:** + GPS APP

---

#### Market Size Calculation

Background context: To determine the market size, one needs to estimate the number of potential customers who could be interested in downloading the app.

:p How does the student calculate the domestic market size?

??x
The student should follow these steps:
1. Estimate the total population of the U.S.
2. Determine the proportion that are smartphone users.
3. Identify the age group most likely to purchase the app (ages 16-36).
4. Calculate the number of potential customers in this age group.

For example, assuming a U.S. population of 320 million and an average life expectancy of 80 years with even numbers of people in each decade:
- Total cellphones: 80 million
- Smartphones (assuming 75% penetration): 60 million
- Potential customers (ages 16-36, estimated 40 million)

Assuming the average person would purchase 2 apps:
- Market size = 40 million * 2 = 80 million

However, a more simplified approach assumes a U.S. population of 320 million with an even distribution across age groups.

```java
public class MarketSizeCalculation {
    private static final int TOTAL_US_POPULATION = 320_000_000;
    private static final double SMARTPHONE_PENETRATION_RATE = 0.75;

    public static void main(String[] args) {
        long totalSmartphones = (long)(TOTAL_US_POPULATION * SMARTPHONE_PENETRATION_RATE);
        long potentialCustomers = 80_000_000; // Assumption based on simplified data
        long appsPerPerson = 2;
        
        long marketSize = potentialCustomers * appsPerPerson;
        System.out.println("Market size: " + marketSize);
    }
}
```

x??

---

#### Profit Estimation

Background context: The estimated profit is calculated based on the number of apps sold, the price per app, and the fixed costs.

:p How does the student estimate profits for the first year?

??x
The formula to calculate the estimated profit involves multiplying the total revenue by the contribution margin per unit and subtracting the fixed costs.

Total Revenue = Number of Apps Sold * Price Per App

Contribution Margin Per Unit = Price - Variable Cost Per Download

Profit = (Number of Apps Sold * Contribution Margin Per Unit) - Fixed Costs

For example, if 10 million apps are sold at $3 each:
- Total revenue: 10,000,000 * $3 = $30,000,000
- Variable cost per download: $\frac{1}{3} \times 3 + 0.5 = 2$
- Contribution margin per unit: $3 - 2 = 1$

Profit = (10,000,000 * 1) - 500,000 = $9,500,000

```java
public class ProfitEstimation {
    private static final double FIXED_COSTS = 500_000;
    private static final double PRICE = 3;
    private static final double VARIABLE_COST_PER_DOWNLOAD = (1/3) * PRICE + 0.5;

    public static void main(String[] args) {
        long appsSold = 10_000_000;
        double contributionMarginPerUnit = PRICE - VARIABLE_COST_PER_DOWNLOAD;
        double totalRevenue = appsSold * PRICE;
        double profit = (appsSold * contributionMarginPerUnit) - FIXED_COSTS;
        
        System.out.println("Profit: $" + profit);
    }
}
```

x??

---

---

#### Market Size Calculation
Background context: The student needs to determine the market size for mini-fridge-and-microwave combos intended for college students. The population of interest is full-time college students living in dorms.

The initial step involves estimating the total number of Americans and then filtering down to those aged 18-22, who are likely to be full-time college students.
$$
\text{Total Americans} = 320 \text{ million}
$$
Assume an average life expectancy of 80 years and evenly distributed age groups:
$$
\text{Number per age group} = \frac{\text{Total Americans}}{\text{Number of Age Groups}} = \frac{320,000,000}{80}
$$

The next step is to identify the college-age population and full-time students.
$$
\text{College-age population (18-22 years)} = 5 \text{ years} \times 4 \text{ million per age group} = 20 \text{ million}
$$
Assuming that only freshmen live in dorms, the market is halved:
$$
\text{Freshmen living in dorms} = \frac{1}{2} \times 2 \text{ million} = 1 \text{ million}
$$

Additionally, consider other students who might purchase these products.
$$
\text{Other potential buyers} = 1 \text{ million}
$$

Thus, the total market size is:
$$
\text{Total Market Size} = 1 \text{ million (freshmen)} + 1 \text{ million (other students)} = 2 \text{ million units per year}
$$

:p What are the steps to calculate the market size for mini-fridge-and-microwave combos?
??x
The calculation involves first determining the total number of Americans, then filtering down to college-age individuals, and further narrowing it to full-time dorm residents. The detailed breakdown is as follows:

1. **Total Americans**: 320 million.
2. **Age Distribution**: Assuming an even distribution over 80 years, each age group has 4 million people.
3. **College-Age Population (18-22 years)**: 5 years * 4 million per age group = 20 million.
4. **Freshmen in Dorms**: Half of the college-age population living in dorms, which is 1 million.
5. **Other Potential Buyers**: Another million students might buy these products.

Summing up gives a total market size of 2 million units per year.
x??

---

#### Market Share Estimation
Background context: The student needs to estimate the market share based on pricing and product differentiation. A reasonable first-year market share could be up to 10%.

:p How should we estimate the initial market share for our mini-fridge-and-microwave combo?
??x
To estimate the initial market share, consider the following:
- **Market Size**: 2 million units per year.
- **Pricing and Differentiation**: Set a competitive price between $310-$320 to attract buyers.
- **First-Year Market Share Estimate**: A reasonable number could be up to 10%.

Thus, for the first year:
$$
\text{Estimated Market Share} = \frac{\text{First-Year Sales}}{\text{Market Size}}
$$

Assuming a 10% market share in the first year:
$$
\text{First-Year Sales} = 0.10 \times 2,000,000 = 200,000 \text{ units}
$$
x??

---

#### Competitive Response
Background context: The student needs to consider how competitors might react to the new product. Possible responses include a price war or introducing similar features (e.g., energy-efficient models).

:p How should we prepare for competitive response?
??x
Competitors might respond in various ways:
1. **Price War**: Competitors could lower their prices significantly, leading to reduced margins.
2. **New Features**: Competitors might introduce new features like energy efficiency or designs similar to ours.

To mitigate these risks, consider:
- Setting a premium price initially.
- Focusing on unique selling points (e.g., cow design).
- Staying competitive with cost and feature advantages.

For example, if competitors lower prices significantly, we can offer value propositions such as better features or customer service to retain market share.
x??

---

#### Decision Making
Background context: The student needs to decide whether to enter this market based on all previous analyses. Key points include market size, pricing, estimated market share, and profit calculations.

:p What is our final decision?
??x
Based on the analysis:
- **Market Size**: 2 million units per year.
- **Pricing**: Estimated at $310-$320 per unit.
- **Estimated Market Share**: Up to 10% in the first year, leading to 200,000 units sold.
- **Profit Calculation**: Detailed profit analysis considering revenue and costs.

If the expected profits are positive and competitive responses can be mitigated, the decision would be:

**Decision: Go ahead with developing and marketing the mini-fridge-and-microwave combo.**

This approach balances market size, pricing, and potential profitability while addressing competition and other factors.
x??

---

---

#### Market Size Calculation
Background on estimating the size of the worldwide bulletproof auto glass market. Given that there are four major players, each with 25% market share, and the industry is growing by 10% annually over the last five years.
:p How do we estimate the current market size?
??x
The current market size can be estimated based on the growth rate of the market. If the market grew at a compound annual growth rate (CAGR) of 10%, and assuming the market was $X$ billion in revenue five years ago, it would now be:
$$
\text{Current Market Size} = X \times (1 + 0.1)^5
$$
If we assume a starting value of $Y$ for simplicity, then:
$$
\text{Current Market Size} = Y \times 1.61
$$
You can use inline math like $X \times 1.61$ to denote the market size calculation.
x??

---

#### Plant Location Decision
Considering the company’s need to enter the market, they should also determine where to set up their production facility given potential barriers like contracts with OEMs typically taking four years to establish and representing 80% of the market.
:p What factors influence plant location decision?
??x
Factors include:
- Proximity to suppliers: for raw materials needed in manufacturing glass
- Access to skilled labor: for assembling and testing bulletproof glass
- Market proximity: customer base (OEMs) is heavily concentrated, so being near major markets like North America or Europe might be crucial

Potential plant location strategies could involve:
```java
// Pseudocode for location selection logic
if (marketShareNeeded > 50 && OEMContractsTake4Years) {
    location = "Major Market"
} else if (costOfLaborIsLow && proximityToRawMaterials) {
    location = "Raw Material Source"
} else {
    location = "Cost Effective Location"
}
```

Inline math: $location = "Cost Effective Location"$, if cost is the primary factor.
x??

---

#### Decision to Enter Market
Based on market size calculation, pricing strategy, and plant location decision, the client must decide whether entering this new market makes strategic sense. Given that they need to capture 50% of the aftermarket (which is unlikely without an acquisition) and the time required for OEM contracts.
:p What factors should influence the final decision?
??x
Key factors include:
- Market size: estimated current market size and potential growth
- Pricing strategy: competitive pricing based on cost-plus model or value-based pricing
- Plant location: proximity to major markets, availability of skilled labor, raw materials

The decision framework could involve a checklist like this:
```java
// Pseudocode for decision logic
if (marketSize > threshold && pricingStrategyFeasible && plantLocationOptimal) {
    enterMarket = true;
} else {
    enterMarket = false;
}
```

Inline math: $enterMarket = true$, if all conditions are met.
x??

---

---

#### Market-Sizing
Background context: To determine the size of the worldwide market for bulletproof auto glass, the company starts by calculating the number of U.S. vehicles with bulletproof glass. They assume that 1 percent of U.S. vehicles have such glass and that U.S. cars make up 10 percent of the world market.

The U.S. population is estimated at 320 million people, with an average household size of three individuals, resulting in approximately 100 million households. The breakdown by income levels provides further detail to estimate the number of vehicles.

:p What assumptions were made to determine the number of cars with bulletproof glass?
??x
Assumptions include:
- 320 million U.S. population
- 3 people per household, leading to about 100 million households
- 1 percent of U.S. vehicles have bulletproof glass
- U.S. vehicles make up 10 percent of the world market

Using these assumptions, the calculation suggests there are approximately 2 million cars with bulletproof glass in the U.S., and therefore 20 million worldwide.
x??

---

#### Acquiring a Smaller Player
Background context: The company is considering acquiring a smaller player to enter a new market. This acquisition could be advantageous if the acquired company has an OEM (Original Equipment Manufacturer) contract, which can significantly speed up market entry and help achieve higher market share faster.

The student should consider that:
- Each regional market segment (Middle East, South America, Asia, U.S., Other) represents 25% of the market.
- Acquiring a smaller player could provide immediate access to one of these segments, thereby accelerating market penetration.

:p What is the question about this concept?
??x
The company should consider acquiring a smaller competitor to enter the market. This approach can be beneficial because it leverages existing OEM contracts and speeds up market entry by three years. The student needs to explain how acquiring a smaller player fits into their overall strategy for entering the market.

For example, if the acquired player has an established OEM contract in South America (25% of the market), this could significantly expedite the company's ability to capture that segment and potentially other segments through cross-selling or leveraging synergies.
x??

---

#### Plant Location Decision
Background context: The company is considering plant locations and how these relate to entering different regional markets efficiently.

:p What factor should the student consider when deciding on a plant location?
??x
The student should consider the proximity of the plant location to the target market regions. For example, Ireland might be chosen as it could provide easier access or lower production costs for one of the key regional markets (e.g., Middle East, South America, Asia).

For instance, if the company decides to enter the Middle East market, having a plant in Ireland may not be ideal due to higher shipping and customs costs. A location closer to the Middle East might offer better logistics.
x??

---

#### Repeating the Question and Verifying Objectives
Background context: The interview structure includes repeating the question, verifying objectives, laying out a clear structure, asking solid questions, avoiding math mistakes, keeping organized notes, drawing a final slide, and developing a short summary.

:p What steps should be included in the initial part of an interview?
??x
The student should start by:
1. Repeating the question to ensure understanding.
2. Verifying objectives to clarify what the company is looking for (e.g., market entry strategy).
3. Laying out a clear structure for their approach.

For example, the student might say: "Let's begin by discussing our objective of entering the auto glass market and how we can achieve 10% market share in three years."
x??

---

---

