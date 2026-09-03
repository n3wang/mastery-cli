
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


```sql
SELECT
    pf_state,
    status,
    COUNT(*) AS total_corporations
FROM
    CORPORATION
GROUP BY CUBE (pf_state, status);
```
### 2. GROUP BY ROLLUP Example

**Scenario:**
Calculate the number of corporations created in each year, broken down by state, and provide cumulative totals for each state and an overall total.

Assuming `creation_date` is stored in a `YYYY-MM-DD` format, we would first extract the year from the date to group by it.


**Explanation:**
- `GROUP BY ROLLUP (pf_state, year)` provides a hierarchical summarization by `pf_state` and `year`. It includes subtotals at each level of grouping, with the most detailed level being by state and year, then by state, and finally a grand total across all states and years.
- This query helps track the growth or reduction in the number of corporations over the years within each state and overall.

| STATE | YEAR | TOTAL_CORPORATIONS |
| ----- | ---- | ------------------ |
| FL    | 2007 | 291524             |
| FL    | 1999 | 141382             |
| FL    |      | 155503             |
| NY    | 2007 | 250376             |
| NY    | 1999 | 668685             |
| NY    |      | 919061             |
|       |      | 1072564            |

```sql
SELECT
    pf_state,
    EXTRACT(YEAR FROM creation_date) AS year,
    COUNT(*) AS total_corporations
FROM
    corporation
GROUP BY ROLLUP (pf_state, EXTRACT(YEAR FROM creation_date));
```


## Reference


### Group By Cube

https://docs.snowflake.com/en/sql-reference/constructs/group-by-cube

GROUP BY CUBE is an extension of the GROUP BY clause similar to GROUP BY ROLLUP. In addition to producing all the rows of a GROUP BY ROLLUP, GROUP BY CUBE adds all the “cross-tabulations” rows. Sub-total rows are rows that further aggregate whose values are derived by computing the same aggregate functions that were used to produce the grouped rows.


```sql
-- Create some tables and insert some rows.
CREATE TABLE products (product_ID INTEGER, wholesale_price REAL);
INSERT INTO products (product_ID, wholesale_price) VALUES 
    (1, 1.00),
    (2, 2.00);

CREATE TABLE sales (product_ID INTEGER, retail_price REAL, 
    quantity INTEGER, city VARCHAR, state VARCHAR);
INSERT INTO sales (product_id, retail_price, quantity, city, state) VALUES 
    (1, 2.00,  1, 'SF', 'CA'),
    (1, 2.00,  2, 'SJ', 'CA'),
    (2, 5.00,  4, 'SF', 'CA'),
    (2, 5.00,  8, 'SJ', 'CA'),
    (2, 5.00, 16, 'Miami', 'FL'),
    (2, 5.00, 32, 'Orlando', 'FL'),
    (2, 5.00, 64, 'SJ', 'PR');
```


```sql
SELECT state, city, SUM((s.retail_price - p.wholesale_price) * s.quantity) AS profit 
 FROM products AS p, sales AS s
 WHERE s.product_ID = p.product_ID
 GROUP BY CUBE (state, city)
 ORDER BY state, city NULLS LAST
 ;
+-------+---------+--------+
| STATE | CITY    | PROFIT |
|-------+---------+--------|
| CA    | SF      |     13 |
| CA    | SJ      |     26 |
| CA    | NULL    |     39 |
| FL    | Miami   |     48 |
| FL    | Orlando |     96 |
| FL    | NULL    |    144 |
| PR    | SJ      |    192 |
| PR    | NULL    |    192 |
| NULL  | Miami   |     48 |
| NULL  | Orlando |     96 |
| NULL  | SF      |     13 |
| NULL  | SJ      |    218 |
| NULL  | NULL    |    375 |
+-------+---------+--------+
```




### Group By Rollup

https://docs.snowflake.com/en/sql-reference/constructs/group-by-rollup


You can think of rollup as generating multiple result sets, each of which (after the first) is the aggregate of the previous result set. So, for example, if you own a chain of retail stores, you might want to see the profit for:

Each store.

Each city (large cities might have multiple stores).

Each state.

Everything (all stores in all states).

```sql
-- Create some tables and insert some rows.
CREATE TABLE products (product_ID INTEGER, wholesale_price REAL);
INSERT INTO products (product_ID, wholesale_price) VALUES 
    (1, 1.00),
    (2, 2.00);

CREATE TABLE sales (product_ID INTEGER, retail_price REAL, 
    quantity INTEGER, city VARCHAR, state VARCHAR);
INSERT INTO sales (product_id, retail_price, quantity, city, state) VALUES 
    (1, 2.00,  1, 'SF', 'CA'),
    (1, 2.00,  2, 'SJ', 'CA'),
    (2, 5.00,  4, 'SF', 'CA'),
    (2, 5.00,  8, 'SJ', 'CA'),
    (2, 5.00, 16, 'Miami', 'FL'),
    (2, 5.00, 32, 'Orlando', 'FL'),
    (2, 5.00, 64, 'SJ', 'PR');
```


```sql
SELECT state, city, SUM((s.retail_price - p.wholesale_price) * s.quantity) AS profit 
 FROM products AS p, sales AS s
 WHERE s.product_ID = p.product_ID
 GROUP BY ROLLUP (state, city)
 ORDER BY state, city NULLS LAST
 ;
+-------+---------+--------+
| STATE | CITY    | PROFIT |
|-------+---------+--------|
| CA    | SF      |     13 |
| CA    | SJ      |     26 |
| CA    | NULL    |     39 |
| FL    | Miami   |     48 |
| FL    | Orlando |     96 |
| FL    | NULL    |    144 |
| PR    | SJ      |    192 |
| PR    | NULL    |    192 |
| NULL  | NULL    |    375 |
+-------+---------+--------+

```

