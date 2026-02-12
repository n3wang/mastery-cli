# High-Quality Flashcards: 2B005---Streaming-Systems_processed (Part 21)


**Starting Chapter:** LEFT OUTER

---


#### Full Outer Join Concept
Background context explaining full outer joins and their relevance to streaming data. A full outer join combines all records from both tables, showing matches as well as non-matches with nulls for unmatched rows on one side or the other.
:p What is a full outer join in the context of streaming data?
??x
A full outer join in the context of streaming data combines all records from both input streams (Left and Right), showing matches as well as non-matches. Non-matching rows are represented with null values for the side where there is no match.
x??

---

#### Streaming Full Outer Join Example
Example provided to illustrate a full outer join in a streaming environment, showing how it captures the evolution of data over time.
:p How does the streaming full outer join evolve over time?
??x
The streaming full outer join evolves by continuously updating its state as new records arrive from both input streams. It maintains the entire relation over time, showing matches and non-matches with nulls where there are no corresponding entries in one of the streams.

For instance:
```sql
SELECT STREAM Left.Id as L,
       Right.Id   as R,
       Sys.EmitTime as Time,
       Sys.Undo   as Undo
FROM Left FULL OUTER JOIN Right
ON L.Num = R.Num;
```
This query shows how each record from both streams is matched or marked with a null, depending on whether there is a corresponding entry in the other stream.
x??

---

#### LEFT Outer Join Concept
Explanation of left outer join and its relation to full outer join. A left outer join includes all records from the left table and any matching records from the right table; unmatched rows have nulls for the right side.
:p How does a left outer join differ from a full outer join?
??x
A left outer join differs from a full outer join in that it includes all records from the left dataset (table or stream) and any matching records from the right. If there is no match, the result will include nulls for the columns from the right side.
x??

---

#### LEFT Outer Join Example
Illustration of a left outer join by filtering out unmatched rows from the full outer join.
:p How can you visualize a left outer join using a full outer join?
??x
You can visualize a left outer join by taking the full outer join and removing (filtering) all rows where there is no match on the right side. This means that only records with corresponding entries in the left stream will be included, while unmatched right-side entries are marked as null.

For example:
```sql
SELECT STREAM Left.Id as L,
       Right.Id   as R,
       Sys.EmitTime as Time,
       Sys.Undo   as Undo
FROM Left  LEFT OUTER JOIN Right
ON L.Num = R.Num;
```
This query filters out any rows where there is no match on the right, resulting in a stream that only includes left-side records and their corresponding (or null) right-side matches.
x??

---

#### LEFT Outer Join Stream Example
Detailed example showing the output of a left outer join over time with streaming data.
:p What does the output look like for a left outer join with streaming data?
??x
The output of a left outer join with streaming data will include all records from the left stream and matching records from the right. Unmatched right-side records are represented as nulls on the right side.

For example, during a given time period:
```sql
12:00> SELECT STREAM Left.Id as L,
           Right.Id   as R,
           Sys.EmitTime as Time,
           Sys.Undo   as Undo
FROM Left  LEFT OUTER JOIN Right
ON L.Num = R.Num;
```
This query might produce the following output:
```
| L    | R    | Time  | Undo |
|------|------|-------|------|
| null | R4   | 12:05 |      |
| L3   | null | 12:06 | undo |
| L2   | R2   | 12:06 |      |
```
Each row shows the evolving state of the join, with matches and unmatched right-side records represented as nulls.
x??

---


---
#### RIGHT OUTER JOIN Concept
Background context explaining the RIGHT OUTER JOIN. A RIGHT OUTER JOIN includes all rows from the right dataset, and corresponding matching rows from the left dataset. If no match is found on the left side, the result will include a row with NULL values for those columns.

:p What does a RIGHT OUTER JOIN do?
??x
A RIGHT OUTER JOIN returns all rows from the right table (Right) and the matched rows from the left table (Left). If there is no match in the left table, the result includes NULLs for the left-side columns.
Example:
```sql
SELECT   STREAM Left.Id as L,
         Right.Id   as R,
         Left.Id as L,
         Sys.EmitTime as Time,
         Right.Id as R,
         Sys.Undo   as Undo
FROM Left  RIGHT OUTER JOIN Right
ON L.Num = R.Num;
```
x??

---
#### INNER JOIN Concept
Background context explaining the INNER JOIN. An INNER JOIN returns only the rows that have matching values in both tables based on a specified column.

:p What is an INNER JOIN?
??x
An INNER JOIN produces a result set that contains only the rows where there is a match between the columns of two tables. Any rows without a corresponding match are excluded.
Example:
```sql
SELECT   STREAM Left.Id as L,
         Right.Id   as R,
         Left.Id as L,
         Sys.EmitTime as Time,
         Right.Id as R,
         Sys.Undo   as Undo
FROM Left  INNER JOIN Right
ON L.Num = R.Num;
```
x??

---
#### ANTI JOIN Concept
Background context explaining the ANTI JOIN. An ANTI JOIN returns all rows from the right table (Right) where there is no match in the left table (Left).

:p What does an ANTI JOIN do?
??x
An ANTI JOIN filters out all rows that have a corresponding match on the left side of the join, returning only those rows from the right dataset that do not match any row in the left dataset.
Example:
```sql
SELECT   STREAM Left.Id as L,
         Right.Id   as R,
         Left.Id as L,
         Sys.EmitTime as Time,
         Right.Id as R,
         Sys.Undo   as Undo
FROM Left  ANTI JOIN Right
ON L.Num = R.Num;
```
x??

---
#### Retractions in INNER JOIN Streams Concept
Background context explaining how retractions are handled in INNER JOIN streams. When a value is updated or deleted, it can affect the join results, leading to retractions and reinsertions.

:p How do retractions play a role in INNER JOIN streams?
??x
Retractions in INNER JOIN streams occur when data changes in either table involved in the join. If an existing row is updated or removed (retracted), this change propagates through both the stream and the resulting join, leading to retractions or reinsertions of rows.
Example:
```sql
SELECT   STREAM LeftV2.Id as L,
         Right.Id   as R,
         LeftV2.Id as L,
         Sys.EmitTime as Time,
         Right.Id as R,
         Sys.Undo   as Undo
FROM LeftV2  INNER JOIN Right
ON L.Num = R.Num;
```
If `Left` row with `Num` of 3 is updated from "L3" to "L3v2" at 12:07, this will result in a retraction of the old value and insertion of the new one.
x??

---


#### Filtered INNER Join vs. SEMI Join

Background context explaining the difference between a filtered INNER join and a SEMI join, including how they handle duplicate values.

:p What is the primary difference between a filtered INNER join and a SEMI join when dealing with multiplicative joins?
??x

The primary difference lies in handling multiple matches (M > 1) for a given predicate. In a **filtered INNER JOIN**, if there are multiple matches, all combinations of these matches will be included in the result set, leading to duplicate values. On the other hand, a **SEMI JOIN** does not include duplicates and only returns unique rows based on the matching predicate.

For example:
```sql
SELECT COALESCE(LeftNM.N_M, RightNM.N_M) as N_M,
       LeftNM.Id as L 
FROM LeftNM INNER JOIN RightNM 
ON LeftNM.N_M = RightNM.N_M;
```

This results in duplicates for each row with a multiplicity greater than 1:

| N_M | L   |
|-----|-----|
| 1:1 | L3  |
| 1:2 | L4  |
| 1:2 | L4  |
| 2:1 | L5A |
| 2:1 | L5B |

In contrast, a **SEMI JOIN**:

```sql
SELECT COALESCE(LeftNM.N_M, RightNM.N_M) as N_M,
       LeftNM.Id as L 
FROM LeftNM SEMI JOIN RightNM 
ON LeftNM.N_M = RightNM.N_M;
```

Only returns unique values for each match:
??x

The result includes only the first occurrence of a match:

| N_M | L   |
|-----|-----|
| 1:1 | L3  |
| 1:2 | L4  |
| 2:1 | L5A |

This is because the SEMI JOIN operation does not retain duplicates, ensuring that each row with multiple matches appears only once in the result set.
x??

---

#### STREAM Renderings of INNER Join and SEMI Join

Background context explaining how stream renderings provide insights into which rows are filtered out.

:p How do stream renderings help differentiate between INNER JOIN and SEMI JOIN results?
??x

Stream renderings show the intermediate steps and highlight how duplicate rows are handled differently in each join type. Specifically, they display all incoming rows and indicate when a row is filtered out due to duplicates.

For an INNER JOIN:
```sql
SELECT COALESCE(LeftNM.N_M, RightNM.N_M) as N_M,
       LeftNM.Id as L,
       Sys.EmitTime as Time,
       Sys.Undo as Undo 
FROM LeftNM INNER JOIN RightNM 
ON LeftNM.N_M = RightNM.N_M;
```

Example output:

| N_M | L   | Time  | Undo |
|-----|-----|-------|------|
| 1:2 | null | 12:03 |      |
| 1:2 | null | 12:04 |      |
| 1:2 | null | 12:05 | undo |
| 1:2 | L4   | 12:05 |      |

Here, duplicate rows (1:2) are filtered out after the first occurrence.

For a SEMI JOIN:
```sql
SELECT COALESCE(LeftNM.N_M, RightNM.N_M) as N_M,
       LeftNM.Id as L,
       Sys.EmitTime as Time,
       Sys.Undo as Undo 
FROM LeftNM SEMI JOIN RightNM 
ON LeftNM.N_M = RightNM.N_M;
```

Example output:

| N_M | L   | Time  | Undo |
|-----|-----|-------|------|
| 1:2 | L4   | 12:05 |      |

Only the first occurrence of a match is included, and any subsequent duplicates are discarded.

This stream rendering provides clarity on how the join operation processes multiple matches.
x??

---

#### Multiplicative Nature of Joins

Background context explaining the multiplicative nature of joins with examples involving different cardinalities (e.g., 2:2, 3:3).

:p Explain the multiplicative nature of joins in datasets with multiple rows matching the same predicate.
??x

The multiplicative nature of joins arises from the fact that if a row in one table matches multiple rows in another table, each combination of these matches is included in the result set. This can lead to an exponential increase in the number of resulting rows.

For example:
- A join with cardinality 2:2 (two matching pairs) results in four combinations.
- A join with cardinality 3:3 (three matching triples) results in nine combinations.

This is illustrated by examples like:

```sql
SELECT COALESCE(LeftNM.N_M, RightNM.N_M) as N_M,
       LeftNM.Id as L 
FROM LeftNM INNER JOIN RightNM 
ON LeftNM.N_M = RightNM.N_M;
```

With 2:2 cardinality:
- If `LeftNM` has two rows and `RightNM` has two matching rows for each, the result will have four combinations.

```sql
SELECT COALESCE(LeftNM.N_M, RightNM.N_M) as N_M,
       LeftNM.Id as L 
FROM LeftNM SEMI JOIN RightNM 
ON LeftNM.N_M = RightNM.N_M;
```

With 2:2 cardinality:
- The result will still include only unique values, but the stream rendering shows all incoming rows and filters out duplicates.
??x

This example helps illustrate how joins process multiple matches, with the inner join including all combinations (resulting in duplicates), while the SEMI join retains only the first occurrence of each match.

For a more concrete understanding:
```sql
CREATE TABLE LeftNM (
    N_M INT,
    Id VARCHAR(10)
);

INSERT INTO LeftNM VALUES 
('1:2', 'L4'), ('1:3', 'L5');

CREATE TABLE RightNM (
    N_M INT,
    Id VARCHAR(10)
);

INSERT INTO RightNM VALUES
('1:2', 'R6'), ('1:3', 'R7'), ('1:3', 'R8');
```

The inner join will result in:
```sql
SELECT COALESCE(LeftNM.N_M, RightNM.N_M) as N_M,
       LeftNM.Id as L 
FROM LeftNM INNER JOIN RightNM 
ON LeftNM.N_M = RightNM.N_M;
```
Result:

| N_M | L   |
|-----|-----|
| 1:2 | null |
| 1:2 | R6  |
| 1:3 | null |
| 1:3 | R7  |
| 1:3 | R8  |

The SEMI join will result in:
```sql
SELECT COALESCE(LeftNM.N_M, RightNM.N_M) as N_M,
       LeftNM.Id as L 
FROM LeftNM SEMI JOIN RightNM 
ON LeftNM.N_M = RightNM.N_M;
```
Result:

| N_M | L   |
|-----|-----|
| 1:2 | null |
| 1:3 | R7  |

In the SEMI join, only unique matches are returned.
x??

