# High-Quality Flashcards: 2B001--Financial-Data-Engineering_processed (Part 8)

**Rating threshold:** >= 8/10

**Starting Chapter:** Dimension 2 Data Outliers

---

**Rating: 8/10**

#### Introduction to Data Mining Techniques
Background context explaining that techniques such as Pearson correlation, z-score, percentile analysis, and Mahalanobis distance are traditionally employed for data quality management. These methods help in detecting erroneous records.
:p What are some traditional techniques used for identifying errors in datasets?
??x
Traditional techniques like Pearson correlation, z-score, percentile analysis, and Mahalanobis distance are commonly used to identify errors or inconsistencies in datasets.
x??

---

#### Advanced Error Detection Techniques
Explanation that advanced error detection involves using theoretical or quantitative models such as financial asset pricing. These methods can compute the value of erroneous records more accurately.
:p What is an example of an advanced technique for detecting and correcting errors?
??x
An advanced technique involves using theoretical or quantitative models, such as financial asset pricing, to compute the exact values of erroneous records.
x??

---

#### Error Tolerance and Prioritization
Explanation that detected errors need to be checked against business-defined tolerance levels. Errors with high business impact (e.g., Forex exchange rates) require higher priority.
:p How are errors prioritized for correction?
??x
Errors are prioritized based on their business impact; those with significant financial implications, such as Forex exchange rates, are given higher priority due to the potential large-scale impact.
x??

---

#### Cross-Dataset Validation
Explanation of cross-dataset validation used when data comes from a third party and no ground truth is available. This method compares data against another source that records similar but high-quality data.
:p What is cross-dataset validation?
??x
Cross-dataset validation involves comparing data from one source with an alternative source that records similar, high-quality data to detect errors when there is no ground truth available.
x??

---

#### Data Outliers in Financial Data
Explanation of what a data outlier is and its common sources, such as market noise, fraud, systematic issues, structural breaks, poorly formatted data, or measurement errors.
:p What are the primary sources of outliers in financial data?
??x
Outliers in financial data can arise from various sources including high noise levels in market and transaction time series, fraudulent activities like money laundering and credit card fraud, systematic issues (e.g., data transmission errors), structural breaks, poorly formatted or unadjusted data, or measurement errors.
x??

---

#### Outlier Detection Techniques
Explanation that researchers use statistical techniques like principal component analysis, z-score, percentile analysis, kurtosis, and machine learning methods such as clustering, classification, and anomaly detection to identify outliers in financial data.
:p What are some outlier detection techniques used in finance?
??x
Outlier detection techniques include statistical methods (e.g., principal component analysis, z-score, percentile analysis, kurtosis) and machine learning approaches like clustering, classification, and anomaly detection.
x??

---

#### Outlier Treatment Methods: Winsorization and Trimming
Explanation of trimming as the simplest approach but risks altering dataset properties if over-applied. Winsorization involves setting extreme values to a specified percentile value.
:p What are common methods for treating outliers in financial data?
??x
Common methods for treating outliers include winsorization, where extreme values are set to a specific percentile, and trimming, which removes outliers entirely but can alter dataset properties if over-applied.
x??

---

#### Outlier Treatment: Scaling
Explanation that scaling techniques, like taking the logarithm or square root of the data, help normalize distributions and reduce the impact of extreme values. This is useful in financial datasets where stock prices vary widely.
:p What is a common technique for handling outliers by normalizing data?
??x
A common technique for handling outliers is scaling, such as applying logarithmic or square root transformations to normalize the distribution and reduce the impact of extreme values, making it easier to analyze percentage changes across different stocks.
x??

---

**Rating: 8/10**

#### Data Biases in Financial Data

Background context: Financial data often contains biases that can distort analysis and lead to incorrect conclusions. These biases include self-selection bias, survivorship bias, backfilling (or instant history) bias, look-ahead bias, among others.

Self-selection bias occurs when certain entities choose to participate or not based on their performance. Survivorship bias happens when only successful entities are included in the dataset, making overall performance appear better than it is. Backfilling bias appears when data for new entities is added with a full history, potentially skewing historical data. Look-ahead bias involves using future information during analysis.

:p How does self-selection bias affect financial datasets?
??x
Self-selection bias affects financial datasets by introducing inaccuracies due to the voluntary nature of reporting performance metrics. Fund managers might choose to report only their best-performing funds, leading to a distorted view where underperforming funds are not included in the dataset.
x??

---

#### Example of Self-Selection Bias

Background context: Self-selection bias occurs when entities selectively report their data based on favorable outcomes.

:p Illustrate self-selection bias with an example involving fund managers.
??x
Suppose you have a dataset for analyzing fund performance. Fund managers voluntarily choose to disclose the performance figures only when their funds are performing well. When these same managers do not wish to attract new capital during underperforming periods, they might withhold this data or report it less frequently.

For instance:
- In 2018, Fund A performs exceptionally well and reports its results.
- However, in 2019, the same fund underperforms but does not disclose these poor results. 
- This selective reporting makes the dataset appear as if the fund is consistently performing well, ignoring the periods of poor performance.

As a result, when analyzing overall fund performance over multiple years, you might conclude that Fund A performs better than it actually did due to this self-selection bias.
x??

---

#### Survivorship Bias

Background context: Survivorship bias happens in financial datasets where only successful entities are included. This can lead to an overly optimistic view of overall performance.

:p Explain survivorship bias using a hedge fund dataset example.
??x
Survivorship bias occurs when data providers exclude or remove underperforming or failed funds from their archives, making the dataset appear as if all surviving funds have performed well. For example, consider a hedge fund database that only includes active and performing funds. If poorly performing or bankrupt funds are not included in the dataset:

1. The average performance of the remaining funds might be inflated.
2. There could be an underestimation of risk since the failed or underperforming funds were not part of the analysis.

This bias can make it seem as though the hedge fund industry is consistently outperforming, when in reality, many funds fail and are not captured in the dataset.
x??

---

#### Backfilling Bias (Instant History Bias)

Background context: Backfilling bias occurs when new entities are added to a dataset with full historical records from their inception. This can distort analysis by making it appear as if these new entities have always been strong performers.

:p Define backfilling bias and provide an example.
??x
Backfilling bias, also known as instant history bias, happens when new financial entities (like hedge funds or companies) are added to a dataset with full historical records from their inception. For instance:

- Suppose you're analyzing the performance of hedge funds over multiple years. A new fund is added to your database, and it shows strong returns for all previous periods even though those periods never existed.
- This can lead to an inaccurate portrayal of historical performance statistics.

To illustrate:
```java
// Pseudocode Example
class HedgeFund {
    String name;
    List<Double> annualReturns; // list of annual returns

    public HedgeFund(String name) {
        this.name = name;
        this.annualReturns = new ArrayList<>();
        for (int i = 0; i < 10; i++) { // Backfilled history
            annualReturns.add(0.2); // Assuming a constant return of 20% per year
        }
    }

    public List<Double> getAnnualReturns() {
        return annualReturns;
    }
}

// Adding a new fund with backfilled history
HedgeFund newFund = new HedgeFund("New Fund");
List<Double> returns = newFund.getAnnualReturns();
returns.forEach(System.out::println); // prints 20% for the last 10 years
```
x??

---

#### Look-Ahead Bias

Background context: Look-ahead bias involves using information that would not have been available during the analyzed period to make decisions or conclusions. This can lead to overly optimistic results in financial analysis.

:p Explain look-ahead bias with a specific example.
??x
Look-ahead bias happens when historical studies use future information, which wasn't accessible at the time of the event being studied. For instance:

- An analyst is evaluating an investment strategy's performance using data from 2015 to 2020.
- However, during this period (2015-2020), a company was planning and releasing a new product in December 2018 that would significantly impact its future earnings. The analyst uses the actual results of this product launch for years after it occurred.

This use of future data to inform past analysis can lead to overly optimistic conclusions about the strategy's performance:
```java
// Pseudocode Example
class Company {
    String name;
    Map<Integer, Double> historicalEarnings; // Map from year to earnings

    public Company(String name) {
        this.name = name;
        this.historicalEarnings = new HashMap<>();
        for (int i = 2015; i <= 2020; i++) {
            if (i == 2018) { // Future event
                historicalEarnings.put(i, 1.5); // Hypothetical earnings after product launch
            } else {
                historicalEarnings.put(i, 1.0); // Normal earnings
            }
        }
    }

    public double getHistoricalEarning(int year) {
        return historicalEarnings.get(year);
    }
}

// Analyst uses actual future data to evaluate past performance
Company company = new Company("TechCo");
double earning2015 = company.getHistoricalEarning(2015); // Uses 1.0, but should use 1.5 for a fair comparison
```
x??

---

#### Data Granularity in Financial Data

Background context: Data granularity describes the level of detail within financial datasets. Highly granular data provides detailed observations about individual entities, while low-granularity data offers summarized or aggregated information.

:p Define and differentiate between high and low data granularity.
??x
Data granularity refers to the level of detail available in a dataset:
- **High Granularity**: Provides detailed information about each entity (e.g., individual stocks, transactions). This allows for deeper analysis but requires more storage and processing power. Examples include daily transaction records or minute-level financial time series.

- **Low Granularity**: Offers summarized or aggregated data at a higher level of aggregation (e.g., monthly portfolio performance, quarterly index returns). While it requires less storage and is easier to process, it sacrifices some detail.
x??

---

#### Example of High Data Granularity

Background context: Highly granular financial data can provide detailed insights but comes with increased complexity.

:p Explain how high data granularity affects the analysis of a financial portfolio.
??x
High data granularity in financial portfolios allows for more precise analysis by providing detailed information about each asset and its allocation. For example:

- A highly granular dataset might include details such as Apple stock at 5%, US government bonds at 20%, and so on, within the overall portfolio.

This level of detail enables:
- Identification of individual performance drivers
- Fine-tuning investment strategies based on specific assets
- Detailed risk assessment

However, it also means:
- Increased storage requirements
- Higher computational costs
- Potential privacy concerns due to detailed information exposure
x??

---

#### Example of Low Data Granularity

Background context: Low data granularity provides aggregated information which is less detailed but more manageable.

:p Explain how low data granularity affects the analysis of a financial index.
??x
Low data granularity in financial indices, such as the S&P 500, offers an aggregated metric representing the performance of the top 500 public companies by market capitalization. This level of detail is useful for:

- Quick overviews and summaries
- Tracking overall market trends
- Comparing broad categories

For example:
```java
// Pseudocode Example
class FinancialIndex {
    String name;
    double totalValue; // Aggregated value of all constituents

    public FinancialIndex(String name) {
        this.name = name;
        this.totalValue = 0.0;
    }

    public void addConstituent(double weight, double value) {
        totalValue += (weight * value);
    }

    public double getTotalValue() {
        return totalValue;
    }
}

// Adding constituents to the S&P 500 index
FinancialIndex sp500 = new FinancialIndex("S&P 500");
sp500.addConstituent(0.2, 1.3); // Apple at 20% of weight with a value contribution of $1.3 billion
double totalValue = sp500.getTotalValue(); // Gives the aggregated index value
```
x??

---

#### Managing Data Granularity Tradeoffs

Background context: Balancing data granularity involves understanding the tradeoff between detail and manageability in financial datasets.

:p Discuss the challenges of managing high data granularity in financial portfolios.
??x
Managing high data granularity in financial portfolios presents several challenges:
- **Storage**: Detailed records require more storage space.
- **Processing Time**: Analyzing large, detailed datasets can be computationally intensive.
- **Privacy**: Detailed information about individual assets or transactions may raise privacy concerns.

To manage these tradeoffs effectively:
- Use efficient data storage techniques (e.g., compression, indexing).
- Employ advanced analytics and machine learning to handle complex data efficiently.
- Implement robust security measures to protect sensitive information.
x??

--- 

These examples should help illustrate the different biases and granularities in financial datasets. If you have any further questions or need more detailed explanations, feel free to ask! 
```

**Rating: 8/10**

#### Network Reconstruction and Link Prediction Methods
Background context: To test the code quickly online, researchers have proposed network reconstruction and link prediction methods to infer and construct the network structure at a bank-to-bank level. These methods are crucial for ensuring the integrity of financial networks by identifying potential connections that might not be explicitly stated in the data.
:p What are network reconstruction and link prediction methods used for?
??x
These methods help infer and construct network structures, especially important for bank-to-bank relationships where explicit connections may not always be clear from available data. They enable the identification of hidden or indirect links between entities.
x??

---

#### Data Duplicates in Finance
Background context: Data duplicates are repeated records that represent the same data observation but can vary due to human errors, automatic machine insertions, and improper merging of multiple data sources. Detecting and treating these duplicates is critical for maintaining accurate financial data and preventing severe issues such as incorrect balance calculations.
:p What causes data duplicates in finance?
??x
Data duplicates can arise from several factors: human errors (multiple entries of the same data), automatic machine insertions due to improperly built systems, and improper merging of multiple data sources with non-unique identifiers. These variations can lead to inconsistencies that impact financial accuracy.
x??

---

#### Preventing Duplicates in PostgreSQL
Background context: The example provided demonstrates how to prevent duplicate records before insertion into a PostgreSQL database by using primary key constraints and exclusion constraints.
:p How do you prevent duplicates when creating a table in PostgreSQL?
??x
To prevent duplicates, create a unique constraint on the record key field. Additionally, use an exclusion constraint on fields that should not have identical values across multiple records (e.g., company_id and company_name). Here is the example code:
```sql
CREATE EXTENSION btree_gist;
CREATE TABLE company(
    record_key INT PRIMARY KEY,
    company_id VARCHAR NOT NULL,
    company_name VARCHAR NOT NULL,
    dividend_date DATE NOT NULL,
    dividend_amount DECIMAL(10,2) NOT NULL,
    EXCLUDE USING gist (company_id WITH =, company_name WITH <>)
);
```
This ensures that each combination of `company_id` and `company_name` is unique.
x??

---

#### Detecting Duplicates with Aggregation
Background context: After data has been generated and stored potentially containing duplicates, you can use aggregation or analytical queries to identify them. This example demonstrates using a GROUP BY statement in PostgreSQL to count the number of records sharing the same company name and headquarters.
:p How do you detect duplicate records using GROUP BY in PostgreSQL?
??x
You can use the GROUP BY clause with COUNT() to group by relevant fields and count occurrences. For instance:
```sql
SELECT company_name, company_headquarters, count(company_id) AS record_count
FROM company
GROUP BY company_name, company_headquarters;
```
This query will help identify groups of records that share the same `company_name` and `company_headquarters`, indicating potential duplicates.
x??

---

#### Handling Duplicates with Window Functions
Background context: When exact matches are not sufficient for identifying duplicates due to data quality issues, you can use window functions like ROW_NUMBER() to assign an ordered sequential number within groups. This allows for selective deduplication based on the first occurrence of each record.
:p How do you handle duplicate records using window functions in PostgreSQL?
??x
You can use a combination of `GROUP BY` and `ROW_NUMBER()` to identify duplicates while keeping all original data intact:
```sql
SELECT company.*, ROW_NUMBER() OVER (PARTITION BY company_name, company_headquarters) AS row_num 
FROM company 
ORDER BY company_name, company_headquarters, row_num;
```
This query assigns a unique sequential number (`row_num`) to each record within groups defined by `company_name` and `company_headquarters`. You can then decide which records to keep or discard based on the `row_num`.
x??

---

#### Entity Resolution for Duplicates
Background context: In cases where exact matches do not suffice due to data quality issues, entity resolution (data matching) becomes necessary. This process involves identifying similar entities within a single dataset and resolving them.
:p What is entity resolution in the context of handling duplicates?
??x
Entity resolution is the process of identifying and merging records that refer to the same real-world entity but are recorded differently in the database. It's essential for cleaning datasets where exact matches may not be sufficient, such as when names are recorded with different formatting.
x??

---

