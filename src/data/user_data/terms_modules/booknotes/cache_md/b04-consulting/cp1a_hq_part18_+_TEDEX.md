# High-Quality Flashcards: Case-in-Point-10_processed (Part 18)

**Starting Chapter:** + TEDEX

---

#### TedEx Lost Packages and Poor Service Costs
Background context: TedEx, similar to FedEx, ships 2.5 billion packages a year with an annual revenue of $40 billion. On average, each customer ships five packages per year. Customer service ranks high except for lost package compensation.
:p What are the key costs associated with lost packages and poor service?
??x
The key costs include insurance payouts, business lost due to poor service, and the cost incurred by TedEx when a package is lost. Specifically:
- Insurance payouts: $480 million (48 million packages x $100)
- Business lost in future sales: $240 million
- Lost package processing costs: $240 million

These three numbers total to $5.28 billion, representing about 13% of the total revenue.
You can use inline math like $480 \text{ million} = 48 \text{ million packages} \times \$100$ (no spaces!) or block math:
$$
\text{Total Costs} = \$4.8 \text{ billion} + \$240 \text{ million} + \$240 \text{ million} = \$5.28 \text{ billion}
$$

```java
// Pseudocode for calculating total costs
public class TedExCosts {
    public static void main(String[] args) {
        int packagesLost = 75_000_000; // 3% of total packages
        double packagesInsured = packagesLost * 0.8; // 80% insured for $100
        int successfulClaims = (int)(packagesInsured * 0.2); // 20% of those give up claims, 25% switch carriers
        int lostCustomers = successfulClaims * 0.25; // 25% of those who give up on claims leave
        double averageRevenuePerPackage = 16;
        double lostBusiness = lostCustomers * 5 * averageRevenuePerPackage; // 3 million customers, each shipping 5 packages

        double insurancePayouts = packagesInsured * 100; // Each package insured for $100
        double processingCosts = (int)(packagesLost * 4); // $4 per claim
        double totalCosts = lostBusiness + insurancePayouts + processingCosts;

        System.out.println("Total Costs: $" + totalCosts);
    }
}
```
x??

---

#### Streamlining Lost Package Claims Process
Background context: TedEx streamlined its claims process, reducing the lost package processing fee to $1 per claim. This improved customer service and increased successful claims.
:p What are the financial impacts of streamlining the lost package claims process?
??x
Streamlining the process resulted in:
- Reduced processing fee from $4 to $1 per claim, saving $200 million (60 million packages x $3).
- No loss of customers due to cumbersome processes.
- Increased successful claims to 100%, boosting insurance payouts by $1.2 billion.

These changes saved TedEx significant money while improving customer satisfaction and overall service marks.
You can use inline math like $\text{Savings} = 60 \text{ million packages} \times \$3 = \$180 \text{ million}$ (no spaces!) or block math:
$$
\text{Total Savings} = 60 \text{ million packages} \times \$3 = \$180 \text{ million}
$$

```java
// Pseudocode for calculating savings from streamlined process
public class StreamlinedProcess {
    public static void main(String[] args) {
        int packagesLost = 75_000_000; // 3% of total packages
        double packagesInsured = packagesLost * 0.8; // 80% insured for $100
        double successfulClaims = packagesInsured * 0.2; // 20% of those give up claims, 25% switch carriers

        int lostCustomers = (int)(successfulClaims * 0.25); // 25% of those who give up on claims leave
        double averageRevenuePerPackage = 16;
        double lostBusiness = lostCustomers * 5 * averageRevenuePerPackage; // 3 million customers, each shipping 5 packages

        double insurancePayoutsBefore = packagesInsured * 100; // Each package insured for $100
        double processingCostsBefore = (int)(packagesLost * 4); // $4 per claim
        double totalCostsBefore = lostBusiness + insurancePayoutsBefore + processingCostsBefore;

        double costPerClaimAfter = 1;
        double processingCostsAfter = packagesLost * costPerClaimAfter; // $1 per claim

        double savings = totalCostsBefore - (lostBusiness + insurancePayoutsBefore + processingCostsAfter);

        System.out.println("Total Savings: $" + savings);
    }
}
```
x??

---

