
Given the following table named `CORPORATION`:

| name          | datatype |
| ------------- | -------- |
| ENTITY_EMAIL  | str      |
| PF_STATE      | str      |
| STATUS        | str      |
| CREATION_DATE | date     |



### 1. GROUP BY CUBE Example

**Scenario:**
Analyze the distribution of corporation statuses across different states with an ability to see the counts by status, by state, and the overall totals.


Output something like this:

| pf_state  | STATUS             | COUNT(*) |
| --------- | ------------------ | -------- |
| FL        | I                  | 7669287  |
| CT        | Dissolved          | 282001   |
| Dissolved | 282001             |          |
| CT        | Pending Conversion | 1        |
| FL        | A                  | 3600710  |




**Explanation:**
- `GROUP BY CUBE (pf_state, status)` generates grouping sets that include all possible combinations of `pf_state` and `status`, as well as the total count of corporations for each state, each status, and a grand total for all corporations.
- This query will help understand the distribution and count of corporations by state and status, including subtotals and a grand total.



### 2. GROUP BY ROLLUP Example

**Scenario:**
Calculate the number of corporations created in each year, broken down by state, and provide cumulative totals for each state and an overall total.

Assuming `creation_date` is stored in a `YYYY-MM-DD` format, we would first extract the year from the date to group by it.


**Explanation:**
- `GROUP BY ROLLUP (pf_state, year)` provides a hierarchical summarization by `pf_state` and `year`. It includes subtotals at each level of grouping, with the most detailed level being by state and year, then by state, and finally a grand total across all states and years.
- This query helps track the growth or reduction in the number of corporations over the years within each state and overall.

Both of these queries allow for complex aggregation with less effort and can be very powerful tools for data analysis and reporting in SQL.


```sql
SELECT
    pf_state,
    EXTRACT(YEAR FROM creation_date) AS year,
    COUNT(*) AS total_corporations
FROM
    corporation
GROUP BY ROLLUP (pf_state, EXTRACT(YEAR FROM creation_date));
```