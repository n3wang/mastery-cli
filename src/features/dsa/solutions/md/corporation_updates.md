

Given the following table named `CORPORATION`:

| name          | datatype |
| ------------- | -------- |
| ENTITY_EMAIL  | str      |
| PF_STATE      | str      |
| STATUS        | str      |
| CREATION_DATE | date     |


## Add Email Count Column

Update the `CORPORATION` table to add a column named `pf_state_company_per_email_count` that will store the count of emails per company per state in the state of `Florida` = `FL`.


```sql

ALTER TABLE CORPORATION ADD pf_state_company_per_email_count INT;

UPDATE CORPORATION
SET pf_state_company_per_email_count = sub.email_count
FROM (
    SELECT ENTITY_EMAIL, pf_state, COUNT(*) AS email_count
    FROM CORPORATION
    GROUP BY ENTITY_EMAIL, pf_state
) sub
WHERE CORPORATION.ENTITY_EMAIL = sub.ENTITY_EMAIL AND CORPORATION.pf_state = sub.pf_state;


```


## Switch Case Update Dates

Add Datetime Column named `pf_cta_due_date` to the `CORPORATION` table and set the value of the column based on the following rules:
- If the `CREATION_DATE` is before `2024-01-01`, set the `pf_cta_due_date` to `2025-01-01`.
- If the `CREATION_DATE` is on or after `2024-01-01` and before `2025-01-01`, set the `pf_cta_due_date` to 90 days after the `CREATION_DATE`.
- If the `CREATION_DATE` is on or after `2025-01-01`, set the `pf_cta_due_date` to 30 days after the `CREATION_DATE`.


```sql
ALTER TABLE CORPORATION ADD pf_cta_due_date DATETIME;

UPDATE CORPORATION
SET pf_cta_due_date = CASE
    WHEN CREATION_DATE < '2024-01-01' THEN '2025-01-01' -- Sets due date to 1/1/2025 if formation is before 1/1/2024
    WHEN CREATION_DATE >= '2024-01-01' AND CREATION_DATE < '2025-01-01' THEN DATEADD(day, 90, CREATION_DATE) -- Adds 90 days to the creation date if formation is in 2024
    WHEN CREATION_DATE >= '2025-01-01' THEN DATEADD(day, 30, CREATION_DATE) -- Adds 30 days to the creation date if formation is on or after 1/1/2025
    ELSE pf_cta_due_date 
END;

```





