
Given the following table named `CORPORATION`:

| name          | datatype |
| ------------- | -------- |
| ENTITY_EMAIL  | str      |
| PF_STATE      | str      |
| STATUS        | str      |
| CREATION_DATE | date     |





## 1. Select Email Frequency

Select table of entities and their frequency of emails in the state of `Florida` = `FL` that are `active`.


| entity_email                 | count |
| ---------------------------- | ----- |
| admin@uplegacycom           | 1     |
| nsowani@eofficesolutionsnet | 42    |
| NGARCIA@TAXPRONETCOM        | 26    |
| govdocs@corpcreationscom    | 3849  |
| KBERGER132@HOTMAILCOM       | 1     |
| gracefrancesca1180@gmailcom | 1     |
| asuperiorpavers@yahoocom    | 1     |

```sql
select ENTITY_EMAIL,count(1) from CORPORATION where ENTITY_EMAIL is not null AND status='A' AND pf_state='FL' group by ENTITY_EMAIL;
```



## 2. Create a Frequency Repetition Table

Write a SQL query to count that count number of entities where have count of specific number of emails in the state of `Florida` = `FL` that are active and were created in the first quarter of 2024.

For example:

| frequency | count_frequency |
| --------- | --------------- |
| 1         | 106259          |
| 2         | 4533            |
| 3         | 1388            |
| 4         | 660             |
| 5         | 454             |


```sql
SELECT RepetitionCount as frequency, COUNT(*) AS count_frequency
FROM (
    SELECT ENTITY_EMAIL, COUNT(*) AS RepetitionCount
    FROM CORPORATION
    WHERE creation_date >= '2024-01-01' and creation_date < '2024-04-01' and ENTITY_EMAIL is not null AND status='A' and pf_state='FL' 
    GROUP BY ENTITY_EMAIL
) AS RepetitionCounts
GROUP BY RepetitionCount
ORDER BY RepetitionCount;
```





