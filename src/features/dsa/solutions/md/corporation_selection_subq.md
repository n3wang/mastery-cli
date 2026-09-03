

Using table `corporation` with the following schema:

| name          | datatype |
| ------------- | -------- |
| entity_email  | str      |
| pf_state      | str      |
| status        | str      |
| creation_date | date     |


### 1. Select using temporal table:

Select all corporations where:
- Entities have less than 4 emails in the state of `Florida` = `FL` that are active.
- corporations were created in 2024.


Use the following Streatgy: Create a temporary table to store the count of emails per entity in the state of `Florida` and then use it to filter the corporations.


```sql
--- 1. Create temp table

CREATE TEMPORARY TABLE LESS5EMAIL AS
SELECT
    ENTITY_EMAIL,count(*) cnt
FROM
  corporation
WHERE status = 'A'
AND pf_state = 'FL'
GROUP BY ENTITY_EMAIL, pf_state
HAVING count(1) < 4;


--- 2. Select corporations

select * from CORPORATION
WHERE ENTITY_EMAIL IS NOT NULL
    AND creation_date >= '2024-01-01'
    AND creation_date < '2024-12-01' 
AND entity_email in (
    select entity_email from LESS5EMAIL);

DROP TABLE LESS5EMAIL;

```

### 2. Select using partition

Using the temporary table `LESS5EMAIL` to filter the corporations. Select the last corporation created in 2024 for each entity.

```sql
SELECT * FROM (
    SELECT ENTITY_EMAIL, pf_state_company_per_email_count,
        ROW_NUMBER() OVER (PARTITION BY ENTITY_EMAIL ORDER BY creation_date DESC) as rn, creation_date
    FROM CORPORATION
    WHERE entity_email in ( select entity_email from LESS5EMAIL )
    AND creation_date >= '2024-01-01'
    AND creation_date < '2024-12-01') 
WHERE RN = 1;
```







