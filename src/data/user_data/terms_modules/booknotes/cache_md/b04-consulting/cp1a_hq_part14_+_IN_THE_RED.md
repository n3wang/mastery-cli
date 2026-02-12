# High-Quality Flashcards: Case-in-Point-10_processed (Part 14)

**Starting Chapter:** + IN THE RED

---

#### Cost Analysis
Even though this is a revenue case, understanding the cost structure can provide insights into why some kiosks may be unprofitable. Costs include location rent and licensing fees from movie studios.

:p Why should we investigate costs?
??x
Investigating costs is important because it helps identify areas where expenses are high relative to revenues. By breaking down the total cost structure, we can pinpoint which kiosks or operational aspects contribute most to profitability issues. This knowledge can guide decisions on whether to continue operating certain machines or make adjustments.

For example:
- Calculate the average revenue per unit (kiosk).
- Compare it with the average costs per unit.
- Identify any high-cost locations that are underperforming.
```java
// Pseudocode for cost analysis
public class CostAnalysis {
    public void analyzeCostStructure(double totalRevenue, double totalCosts) {
        double avgRevenPerUnit = totalRevenue / numberOfKiosks;
        double avgCostPerUnit = totalCosts / numberOfKiosks;
        
        System.out.println("Average revenue per unit: $" + avgRevenPerUnit);
        System.out.println("Average cost per unit: $" + avgCostPerUnit);
    }
}
```
x??

---

#### Revenue Case Analysis
The student discusses how to approach revenue cases by asking about historical trends and validating hypotheses.

:p How should one structure a revenue case analysis?
??x
A revenue case analysis involves:
1. Understanding current revenues and historical trends (ask what happened in the last three years).
2. Validating hypotheses by examining industry conditions.
3. Proposing price increases, changes to product mix, or market expansion strategies.
4. Using mathematical models like $$R = P \times V$$ to analyze revenue components.
5. Considering both short-term and long-term solutions.
x??

---

#### Customer Segmentation and Cost Analysis
The student analyzes segments of customers with low credit ratings, estimating their impact on revenue and costs.

:p How many customers are in the 500-549 credit rating range?
??x
According to the first pie chart, 1% of the 60 million customers fall into the 500-549 credit rating range. This is approximately 600,000 customers.
x??

---

#### Discount Brokerage Growth Analysis
Background context: The student is analyzing a discount brokerage's growth strategy to maintain its industry ranking. The company, ranked 6th with $600 million revenue and a 10% growth rate, needs to determine the required growth for Y3 to regain its sixth-place ranking.

Relevant data:
- Company F: Current size of $600 million, current rank 6
- Industry competitors' rankings and growth rates

:p How much growth does Company F need in Y3 to maintain a 6th place industry ranking?
??x
To determine the required growth rate for Company F (current size $600 million) in Y3 to stay ranked 6th, we compare its performance with other companies. By calculating each company's projected revenue and rankings:

- Company A: $1010 million at rank 1
- Company B: $918 million at rank 2
- Company C: $800 million at rank 4 (unchanged)
- Company D: $882 million at rank 3
- Company E: $772.5 million at rank 6 (target to beat for 6th place)
- Company F: Projected revenue of $726 million, staying at rank 7 if growth is only 10%
- Company G: $864 million at rank 4
- Company H: $720 million at rank 8

To regain the 6th place ranking, Company F's projected revenue needs to be above $772.5 million (Company E’s target). The necessary growth rate \( X \) can be calculated using:
$$
660(1 + X) = 772.5
$$
Solving for \( X \):
$$
X = \frac{772.5}{660} - 1 \approx 0.17 \text{ or } 17\%
$$

Company F needs at least a 17% growth rate in Y3 to maintain its sixth-place ranking.
x??

---

#### Projected Revenue Calculations
Background context: The student calculates the projected revenue for each company to determine the required growth rate for Company F.

Relevant data:
- Current sizes and Y1 growth rates for Companies C through H

:p What is the projected revenue for each of these companies in Y3?
??x
Here are the calculations for each company's projected revenue in Y3:

- **Company C**: Current size $800 million, no change in rank 3
  $$ 
  \text{Y2 Revenue} = 800 \times (1 + 0\%) = 800 \text{ million}
  $$
  
- **Company D**: Current size $800 million, growth rate of 5%
  $$
  \text{Y3 Revenue} = 800 \times (1 + 0.05) = 840 \text{ million}
  $$

- **Company E**: Current size $700 million, growth rate of 5%
  $$
  \text{Y3 Revenue} = 700 \times (1 + 0.05) = 735 \text{ million}
  $$

- **Company F**: Current size $600 million, growth rate of 10%
  $$
  \text{Y3 Revenue} = 600 \times (1 + 0.10) = 660 \text{ million}
  $$

- **Company G**: Current size $600 million, growth rate of 20%
  $$
  \text{Y3 Revenue} = 600 \times (1 + 0.20) = 720 \text{ million}
  $$

- **Company H**: Current size $500 million, growth rate of 20%
  $$
  \text{Y3 Revenue} = 500 \times (1 + 0.20) = 600 \text{ million}
  $$

Company F's revenue in Y3 is projected to be $726 million if it maintains a 10% growth rate, putting it at rank 7.
x??

---

