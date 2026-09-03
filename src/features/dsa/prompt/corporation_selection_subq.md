---
title: Corporation Selection Subquery
tags: [snowflake]
---

### Description


Using table `corporation` with the following schema:

| name          | datatype |
| ------------- | -------- |
| entity_email  | str      |
| pf_state      | str      |
| status        | str      |
| creation_date | date     |

### 1. Select using temporal table:


```sql
CREATE TEMPORARY TABLE mytemptable (id NUMBER, creation_date DATE);
```

Select all corporations where:
- Entities have less than 4 emails in the state of `Florida` = `FL` that are active.
- corporations were created in 2024.


Use the following Streatgy: Create a temporary table to store the count of emails per entity in the state of `Florida` and then use it to filter the corporations.



### 2. Select using partition

Using the temporary table `LESS5EMAIL` to filter the corporations. Select the last corporation created in 2024 for each entity.


## Reference


### Temporal Tables

https://docs.snowflake.com/en/user-guide/tables-temp-transient

```sql
CREATE TEMPORARY TABLE mytemptable (id NUMBER, creation_date DATE);
```

Similar to the other table types (transient and permanent), temporary tables belong to a specified database and schema; however, because they are session-based, they aren’t bound by the same uniqueness requirements. This means you can create temporary and non-temporary tables with the same name within the same schema.


### Having & Group By

https://docs.snowflake.com/en/sql-reference/constructs/having

```sql
SELECT ...
FROM ...
GROUP BY ...
HAVING <predicate>
[ ... ]
```

The condition specified by the HAVING clause applies to expressions produced by the GROUP BY. Therefore, the same restrictions that apply to GROUP BY expressions also apply to the HAVING clause. The predicate can only refer to:


```sql
SELECT ...
  FROM ...
  [ ... ]
  GROUP BY groupItem [ , groupItem [ , ... ] ]
  [ ... ]
```