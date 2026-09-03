---
title: Corporation Count Repetitions
tags: [snowflake]
---

### Description

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
| admin@uplegacy.com           | 1     |
| nsowani@eofficesolutions.net | 42    |
| NGARCIA@TAXPRONET.COM        | 26    |
| govdocs@corpcreations.com    | 3849  |
| KBERGER132@HOTMAIL.COM       | 1     |
| gracefrancesca1180@gmail.com | 1     |
| asuperiorpavers@yahoo.com    | 1     |




## 2. Create a Frequency Repetition Table

Write a SQL query to count that count number of entities where have count of specific number of emails in the state of `Florida` = `FL` that are active and were created in the first quarter of 2024.

For example:

| frequency | countofrepetitions |
| --------- | ------------------ |
| 1         | 106259             |
| 2         | 4533               |
| 3         | 1388               |
| 4         | 660                |
| 5         | 454                |







