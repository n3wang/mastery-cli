---
title: Corporation Table and Recalculation Updates
tags: [snowflake]
---


Given the following table named `CORPORATION`:

| name          | datatype |
| ------------- | -------- |
| ENTITY_EMAIL  | str      |
| PF_STATE      | str      |
| STATUS        | str      |
| CREATION_DATE | date     |




## Add Email Count Column

Update the `CORPORATION` table to add a column named `pf_state_company_per_email_count` that will store the count of emails per company per state in the state of `Florida` = `FL`.



## Switch Case Update Dates

Add Datetime Column named `pf_cta_due_date` to the `CORPORATION` table and set the value of the column based on the following rules:
- If the `CREATION_DATE` is before `2024-01-01`, set the `pf_cta_due_date` to `2025-01-01`.
- If the `CREATION_DATE` is on or after `2024-01-01` and before `2025-01-01`, set the `pf_cta_due_date` to 90 days after the `CREATION_DATE`.
- If the `CREATION_DATE` is on or after `2025-01-01`, set the `pf_cta_due_date` to 30 days after the `CREATION_DATE`.

