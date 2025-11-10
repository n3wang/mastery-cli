# High-Quality Flashcards: 2B005---Streaming-Systems_processed (Part 22)


**Starting Chapter:** Fixed Windows

---


#### Streaming Joins and Their Functionality

Background context: The passage explains that streaming joins operate similarly to how we understand joins between streams and tables, but they capture the historical evolution of join operations over time. This is contrasted with join tables which only represent a snapshot at a particular point in time.

:p How do streaming joins differ from traditional join tables?
??x
Streaming joins maintain a history of the join operation as it evolves over time, whereas traditional join tables capture a single snapshot. The streaming approach allows for continuous processing and updating of results as new data arrives.
x??

---

#### Core Join Primitive: FULL OUTER Join

Background context: The core underlying join primitive is the FULL OUTER JOIN, which combines all joined and unjoined rows from both relations into a single result set.

:p What is the primary type of join operation that underlies other variants?
??x
The FULL OUTER JOIN is the fundamental join operation. It collects together all the joined and unjoined rows in a relation. Other types such as LEFT OUTER, RIGHT OUTER, INNER, ANTI, and SEMI are derived by adding additional filtering conditions on top of this full outer join.
x??

---

#### Variants of Join Operations

Background context: The passage lists several types of joins (LEFT OUTER, RIGHT OUTER, INNER, ANTI, and SEMI) which all add an extra layer of filtering after the FULL OUTER JOIN operation.

:p How do LEFT OUTER, RIGHT OUTER, INNER, ANTI, and SEMI join operations relate to the FULL OUTER JOIN?
??x
These join types are built on top of the FULL OUTER JOIN by applying additional filters. For example:
- A LEFT OUTER JOIN keeps all rows from the left relation and adds matching right side rows if they exist.
- A RIGHT OUTER JOIN does the same but for the right relation instead.
- An INNER JOIN only returns rows where there is a match in both relations.
- ANTI join returns only rows that do not have matches on the right-hand side, effectively returning the complement of an INNER JOIN.
- SEMI join returns only the left side row when a match occurs.

The FULL OUTER JOIN provides the base set of all possible joins and unjoins between the two tables, from which other types can be derived through filtering.
x??

---

#### Windowed Joins

Background context: Windowed joins extend the concept of streaming joins by partitioning time in meaningful ways. This allows for more precise control over how data is joined based on specific time intervals.

:p Why are windowed joins useful?
??x
Windowed joins are beneficial because they allow for time-partitioned processing, which can be crucial for:
- Partitioning events into logical periods (e.g., daily windows).
- Improving performance by limiting the range of data considered in a join.
- Handling outer joins where one side might never show up due to temporal validity constraints.

Windowing also helps with timing out unjoined rows when dealing with unbounded data sources, which is not possible without it for classic batch processing approaches.
x??

---

#### Temporal Validity Joins

Background context: The passage mentions that while many streaming systems support fixed windows, there's a need for more sophisticated ways of partitioning time in joins, particularly temporal validity joins. These are discussed as an advanced topic.

:p What is the significance of temporal validity joins?
??x
Temporal validity joins allow for more precise control over data freshness and relevance by defining specific periods during which data is considered valid. This feature is not natively supported by most streaming systems today but can be highly useful in scenarios where historical data needs to be joined with current or future data within certain time windows.

For example, if you want to join sales data from a specific quarter with inventory levels from the same period, temporal validity joins would ensure that only relevant and current data is used for each join operation.
x??

---

#### Timing Out Unjoined Rows in Joins

Background context: The passage explains how windowed joins can help time out unjoined rows by comparing watermarks to the end of the window. This mechanism ensures that after a certain point, any remaining unprocessed rows can be safely considered as timeouts.

:p How do watermarks and windows contribute to timing out unjoined rows?
??x
Watermarks in streaming systems provide a way to gauge the completeness of input sources over time. By applying these watermarks within windowed joins, you can define when it is safe to timeout unjoined rows. Specifically:
- When the watermark passes the end of the window, all remaining data in that window can be considered complete.
- At this point, any unprocessed rows can be safely timed out and their partial results materialized.

This approach is particularly useful for outer joins where one side might never appear due to temporal constraints, ensuring efficient processing without waiting indefinitely.
x??

---


---
#### Fixed Windows and Temporal Validity Joins

In temporal validity joins, time is introduced into the join criteria by using windowing techniques. This allows us to focus on data that falls within a specific time interval or "window." By adding these windows, we can control which rows are considered during the join process based on their timestamps.

When implementing fixed windows for joining tables, we use window functions such as `TUMBLE` to partition the dataset into intervals. The join then only considers pairs of records that fall within the same time interval or window.

:p What is a fixed window in the context of temporal validity joins?
??x
A fixed window in the context of temporal validity joins refers to dividing data into predefined, non-overlapping intervals based on timestamps. Each row is assigned to a specific time interval, and the join operation only considers pairs of records that fall within the same time interval.
```
// Example usage of TUMBLE function
SELECT 
    TABLE *, 
    TUMBLE(Time, INTERVAL '5' MINUTE) as Window 
FROM Left;
```
x??

---
#### Join Criteria with Time Windows

In temporal validity joins, the traditional equality join condition `Left.Num = Right.Num` is expanded to include time window conditions. Specifically, a row from Table A (Left) and a row from Table B (Right) are considered for joining only if they fall within the same specified time interval.

The join criteria now becomes:
```
Left.Num = Right.Num AND Left.Window = Right.Window
```

:p How does the traditional join condition change in temporal validity joins?
??x
In temporal validity joins, the traditional equality join condition `Left.Num = Right.Num` is extended to include a window condition. This means that for two records to be joined, not only must they match on some key (like `Num`), but also their time windows must overlap or coincide.

This expanded condition ensures that we are only joining data within the same temporal interval.
```
// Example join with window equality
FROM Left
FULL OUTER JOIN Right 
ON L.Num = R.Num AND TUMBLE(Left.Time, INTERVAL '5' MINUTE) = TUMBLE(Right.Time, INTERVAL '5' MINUTE);
```
x??

---
#### Windowed Join Example

In the provided example, two tables (Left and Right) are windowed into five-minute fixed intervals using the `TUMBLE` function. This results in each row being associated with a specific time interval.

The original join on `Num` is extended to include window equality to ensure that only rows within the same time interval are joined.

:p What happens when applying temporal validity joins to our example tables?
??x
When applying temporal validity joins, the join condition expands from simply matching keys (like `Num`) to also including a check for the time windows in which these records fall. In the provided example, this means that:

- The original join on `Left.Num = Right.Num` is extended to:
  ```
  Left.Num = Right.Num AND TUMBLE(Left.Time, INTERVAL '5' MINUTE) = TUMBLE(Right.Time, INTERVAL '5' MINUTE)
  ```

This ensures that only records from the same time interval are joined. For instance, `L2` and `R2` do not fall within the same five-minute window `[12:00, 12:05)`, so they are not joined.

```
// Example join with window equality
FROM Left
FULL OUTER JOIN Right 
ON L.Num = R.Num AND TUMBLE(Left.Time, INTERVAL '5' MINUTE) = TUMBLE(Right.Time, INTERVAL '5' MINUTE);
```
x??

---
#### Unwindowed vs. Windowed Joins

The provided tables illustrate the difference between unwindowed and windowed joins by showing how rows that do not fall within the same time interval are excluded from the join.

In the unwindowed join (left table), all records with matching `Num` values are joined, regardless of their timestamps:

```
| L1   | null |
|  L2   | R2    |
| L3   | R3   |
| null | R4   |
```

In the windowed join (right table), only rows that fall within the same five-minute interval are joined:

```
| L1   | null |
|  L2   | null |
| L3   | R3   |
| null | R4   |
```

:p How do unwindowed and windowed joins differ in terms of their output?
??x
Unwindowed joins (left table) consider all rows that match on the join key (`Num`), regardless of their timestamps. This means that records with different time intervals are still considered for joining.

In contrast, windowed joins (right table) only join rows that fall within the same specified time interval. This ensures that we focus on data relevant to a specific period, as defined by the `TUMBLE` function.

This results in a more granular and time-bound join operation:

```
// Example unwindowed join
SELECT 
    TABLE Left.Id as L, 
    Right.Id as R 
FROM Left 
FULL OUTER JOIN Right ON L.Num = R.Num;

// Example windowed join
SELECT 
    TABLE Left.Id as L, 
    Right.Id as R, 
    COALESCE(
        TUMBLE(Left.Time, INTERVAL '5' MINUTE),
        TUMBLE(Right.Time, INTERVAL '5' MINUTE)
    ) AS Window
FROM Left 
FULL OUTER JOIN Right 
ON L.Num = R.Num AND 
TUMBLE(Left.Time, INTERVAL '5' MINUTE) = TUMBLE(Right.Time, INTERVAL '5' MINUTE);
```
x??


#### Temporal Validity Windows
Temporal validity windows are used to handle situations where data slices time into regions wherein a given value is valid. This concept is crucial in systems that require real-time processing of time-varying data, such as financial currency conversion rates.

:p What is a temporal validity window?
??x
A temporal validity window refers to the period during which a specific value or state is considered valid within a database or stream-processing system. In the context provided, it means understanding when different exchange rates for currencies are applicable based on their event times and processing times.
x??

---
#### Event-Time vs Processing-Time Ordering
In systems dealing with temporal validity windows, data can arrive out of order (event-time ordering), but they need to be processed in a way that maintains the correct timeline (processing-time ordering). This creates challenges because the state of the system changes over time as new data arrives.

:p How does event-time and processing-time ordering differ?
??x
Event-time ordering refers to the sequence in which events occurred, whereas processing-time ordering is about when those events are processed. In a financial system for currency conversions, event-time would be the actual time the exchange rate was set, while processing-time is the current timestamp at which data is being processed.

Example:
```plaintext
| Event-Time | Processing-Time |
|------------|----------------|
| 12:00:30   | 12:06:23       |
| 12:03:00   | 12:09:07       |
```
x??

---
#### Timeline Representation
To visualize temporal validity windows, timelines can be used to represent the regions where certain values are valid. These timelines dynamically update as new data arrives, making it challenging to maintain a fixed state.

:p How does the timeline for conversion rates change over time?
??x
The timeline changes dynamically based on new incoming data. For instance, in a currency conversion system, as new exchange rates arrive, they invalidate previous rates and create new valid periods:

Original Timeline:
```
|----[-inf, 12:06:23)----|
|--[12:06:23, 12:07:33)--
```

After a new rate arrives at 12:09:07:
```
|----[-inf, 12:06:23)----|
|--[12:06:23, 12:07:33)--
|--[12:07:33, 12:09:07)--
```

x??

---
#### Windowed Joins and Temporal Validity
Windowed joins are used to handle temporal data by ensuring that only relevant data from the correct time window is joined. In the context of currency conversion rates, this means joining rates valid at a certain point in time with other related data.

:p How do windowed joins relate to temporal validity?
??x
Windowed joins help manage and join temporal data by ensuring that only the current or relevant rates are considered based on their event times and processing times. For example, when querying currency conversion details, the system must only consider the rate valid at a specific time.

Example:
```sql
SELECT * 
FROM Orders o 
JOIN YenRates r ON o.currency = r.Curr AND r.EventTime <= o.OrderTime AND (r.ProcTime >= o.OrderTime OR r.ProcTime IS NULL);
```
x??

---
#### Dynamic Region Calculation
In systems with temporal validity windows, the regions of valid values can change dynamically as new data arrives. This dynamic nature makes it challenging to maintain a fixed state and requires incremental updates.

:p How do you handle dynamic region changes in temporal validity?
??x
Handling dynamic region changes involves continuously updating the timeline based on incoming data. For each new piece of data, you update the regions where that data is valid and invalidate previous regions as necessary. This process can be complex and may require algorithms to efficiently manage these updates.

Example:
```java
public class RegionUpdater {
    public void addRate(String curr, int rate, long eventTime) {
        // Logic to add a new rate and update existing regions
    }
    
    public void removeOldRates() {
        // Logic to invalidate old rates as new ones arrive
    }
}
```
x??

---
#### Time-Varying Relations
Time-varying relations capture data that changes over time. In the provided example, `YenRates` and `YenRatesWithRegion` are time-varying relations where each row represents a rate valid during a specific period.

:p What is a time-varying relation?
??x
A time-varying relation is a database concept where data values change over time. Each row in the relation represents a value that is valid during a certain period, and this validity period can change as new data arrives or previous data expires.

Example:
```sql
SELECT TVR * FROM YenRatesWithRegion ORDER BY EventTime;
```
x??

---


#### Validity Windows Overview
Background context: The concept of validity windows is crucial for handling temporal data, ensuring that each piece of input data only affects a specific time range. This mechanism is particularly useful when dealing with financial or real-time data where historical accuracy is paramount.

:p What are validity windows in the context of processing temporal data?
??x
Validity windows are used to define a period during which a particular event or record is considered valid. In other words, each piece of input data affects only events within its defined time range, allowing for precise temporal control over data modifications.
x??

---

#### Shrinkability of Validity Windows
Background context: Validity windows must be able to shrink over time, meaning that as more recent data becomes available, previously valid data might no longer be considered relevant. This process ensures that the reach of a validity window diminishes and any data contained therein is split across new windows.

:p How do validity windows handle shrinking over time?
??x
Validity windows can shrink over time by adjusting their end points based on newer input data. When new data arrives, it might invalidate older records within the same window. As a result, these records are split into multiple smaller windows that better reflect their current valid time periods.

For example:
If a record was previously valid from [12:00 - 12:06], and a new input occurs at 12:03, it might split the original window into two: one ending at 12:03, and another starting from 12:03.
x??

---

#### SQL Implementation of Validity Windows
Background context: The SQL implementation provides a way to express validity windows using constructs like `VALIDITY_WINDOW`. This allows for precise temporal validation within SQL queries.

:p How can validity windows be implemented in SQL?
??x
Validity windows can be implemented in SQL using the `VALIDITY_WINDOW` construct. For example, a query might look like this:

```sql
SELECT 
  Curr, 
  MAX(Rate) as Rate,
  VALIDITY_WINDOW(EventTime) as Window
FROM YenRates 
GROUP BY Curr, VALIDITY_WINDOW(EventTime)
HAVING Curr = 'Euro';
```

This SQL query groups data by currency and a window defined by `VALIDITY_WINDOW(EventTime)`, ensuring that each record is valid within its time range.

Additionally, validity windows can be described using a three-way self-join in standard SQL:

```sql
SELECT 
  r1.Curr, 
  MAX(r1.Rate) AS Rate, 
  r1.EventTime AS WindowStart, 
  r2.EventTime AS WIndowEnd 
FROM YenRates r1 
LEFT JOIN YenRates r2 
ON r1.Curr = r2.Curr 
AND r1.EventTime < r2.EventTime 
LEFT JOIN YenRates r3 
ON r1.Curr = r3.Curr 
AND r1.EventTime < r3.EventTime 
AND r3.EventTime < r2.EventTime 
WHERE r3.EventTime IS NULL 
GROUP BY r1.Curr, WindowStart, WindowEnd 
HAVING r1.Curr = 'Euro';
```

This query ensures that the windows are correctly defined by comparing event times and grouping records accordingly.
x??

---

#### Streaming Example of Validity Windows
Background context: The streaming example illustrates how validity windows operate in a real-time setting, where events continuously arrive and affect ongoing calculations.

:p What is an example of a streaming implementation for handling temporal data with validity windows?
??x
A streaming example can be seen in the following SQL-like pseudocode:

```sql
SELECT 
  STREAM 
  Curr, 
  MAX(Rate) as Rate, 
  VALIDITY_WINDOW(EventTime) as Window, 
  Sys.EmitTime as Time, 
  Sys.Undo as Undo 
FROM YenRates 
GROUP BY 
  Curr, 
  VALIDITY_WINDOW(EventTime) 
HAVING Curr = 'Euro';
```

This example shows how each new event (arrival of a new row) affects the validity windows. As new data comes in, it can invalidate previous windows and split them into new ones, ensuring that the latest events are correctly reflected.

For instance:
- When a new rate is received at 12:06 for "Euro", it might invalidate the window [12:03 - 12:06) and create a new one starting from 12:06.
x??

---


#### Temporal Validity Windows
Background context: Temporal validity windows are a crucial concept when dealing with time-varying data. They represent intervals during which certain values are valid or applicable. This is particularly useful in financial applications where exchange rates, for instance, can change over time.

:p What are temporal validity windows?
??x
Temporal validity windows are intervals during which certain values, such as currency conversion rates, are considered valid and applicable.
x??

---

#### Validity Window Construction
Background context: To effectively use temporal validity windows in a financial application, we need to construct them from the given data. The provided example constructs these windows by grouping currency conversion orders based on their event times and calculating the maximum rate within each interval.

:p How are validity windows constructed for the `YenRates` relation?
??x
Validity windows are constructed by first selecting relevant rows from the `YenRates` relation, then grouping them by the current currency (`Curr`) and the validity window defined by the `EventTime`. For each group, we calculate the maximum rate within that interval.

For example:
```sql
SELECT  Curr,
        MAX(Rate) as Rate,
        VALIDITY_WINDOW(EventTime) as Window
FROM YenRates
GROUP BY Curr,
         VALIDITY_WINDOW(EventTime)
HAVING Curr = "Euro";
```
This query groups the rates by currency and event time intervals, ensuring that each conversion order has a valid rate within its corresponding window.

x??

---

#### Temporal Validity Joins
Background context: Once we have constructed the validity windows, we can perform temporal validity joins. This involves joining the `YenOrders` with the `YenRates` relations to determine the appropriate rate for each conversion based on when it occurred.

:p How are temporal validity joins performed?
??x
Temporal validity joins involve matching events in one relation (e.g., `YenOrders`) with their corresponding valid rates from another relation (`YenRates`). This is achieved by using a full outer join and applying conditions to match the event times within the appropriate validity windows.

For example:
```sql
WITH ValidRates AS (
    SELECT Curr,
           MAX(Rate) as Rate,
           VALIDITY_WINDOW(EventTime) as Window
    FROM YenRates
    GROUP BY Curr,
             VALIDITY_WINDOW(EventTime)
)
SELECT  YenOrders.Amount as "E",
        ValidRates.Rate as "Y/E",
        YenOrders.Amount * ValidRates.Rate as "Y",
        YenOrders.EventTime as Order,
        ValidRates.Window as "Rate Window"
FROM YenOrders FULL OUTER JOIN ValidRates
ON YenOrders.Curr = ValidRates.Curr
AND WINDOW_START(ValidRates.Window) <=   YenOrders.EventTime
AND YenOrders.EventTime <   WINDOW_END(ValidRates.Window)
HAVING Curr = "Euro";
```
This query constructs the `ValidRates` relation by grouping and calculating rates, then joins it with `YenOrders` to find the correct rate for each order based on its event time.

x??

---

#### Window Functions and Conditions
Background context: The logic of temporal validity joins relies heavily on window functions (`VALIDITY_WINDOW`, `WINDOW_START`, `WINDOW_END`) and conditions that ensure events are matched within their corresponding windows. These functions help in defining the range during which a rate is valid for a given conversion order.

:p What role do window functions play in temporal validity joins?
??x
Window functions like `VALIDITY_WINDOW` define intervals during which certain rates are considered valid, while `WINDOW_START` and `WINDOW_END` specify the start and end of these intervals. These functions are crucial for matching events with their corresponding valid rates.

For example:
```sql
WITH ValidRates AS (
    SELECT Curr,
           MAX(Rate) as Rate,
           VALIDITY_WINDOW(EventTime) as Window
    FROM YenRates
    GROUP BY Curr,
             VALIDITY_WINDOW(EventTime)
)
SELECT  YenOrders.Amount as "E",
        ValidRates.Rate as "Y/E",
        YenOrders.Amount * ValidRates.Rate as "Y",
        YenOrders.EventTime as Order,
        ValidRates.Window as "Rate Window"
FROM YenOrders FULL OUTER JOIN ValidRates
ON YenOrders.Curr = ValidRates.Curr
AND WINDOW_START(ValidRates.Window) <=   YenOrders.EventTime
AND YenOrders.EventTime <   WINDOW_END(ValidRates.Window)
HAVING Curr = "Euro";
```
The `WINDOW_START` and `WINDOW_END` functions are used to ensure that an order's event time falls within the appropriate rate window, thus providing accurate conversions.

x??

---


#### Validity Windowed Conversion Rate Relation
Background context: The validity windowed conversion rate relation is crucial for understanding how exchange rates evolve over time, especially when dealing with out-of-order data. This concept involves maintaining a valid range (window) of times during which an exchange rate is applicable.

:p What does the `VALIDITY_WINDOW(EventTime)` function do in this context?
??x
The `VALIDITY_WINDOW(EventTime)` function creates a validity window for each event time, indicating the period during which the exchange rate remains valid. This helps track how rates change over different periods.
```sql
WITH ValidRates AS (
  SELECT 
    Curr,
    MAX(Rate) as Rate,
    VALIDITY_WINDOW(EventTime) as Window
  FROM YenRates
  GROUP BY 
    Curr, 
    VALIDITY_WINDOW(EventTime)
)
```
x??

---

#### Full TVR for Validity-Windowed Join
Background context: The full temporal view relation (TVR) for the validity-windowed join is essential to understand how orders are matched with rates over time. This involves handling out-of-order data and ensuring that each order is correctly matched with the most recent valid rate within its window.

:p What does the `FULL OUTER JOIN` in the query do?
??x
The `FULL OUTER JOIN` ensures that all records from both tables (YenOrders and ValidRates) are included, even if there's no matching record. This helps handle cases where orders might be placed before or after rates become available.
```sql
WITH ValidRates AS (
  SELECT 
    Curr,
    MAX(Rate) as Rate,
    VALIDITY_WINDOW(EventTime) as Window
  FROM YenRates
  GROUP BY 
    Curr, 
    VALIDITY_WINDOW(EventTime)
)
SELECT 
  TVR,
  YenOrders.Amount as "E",
  ValidRates.Rate as "Y/E", 
  YenOrders.Amount * ValidRates.Rate as "Y",
  YenOrders.EventTime as Order, 
  ValidRates.Window as "Rate Window"
FROM YenOrders
FULL OUTER JOIN ValidRates 
ON YenOrders.Curr = ValidRates.Curr 
AND WINDOW_START(ValidRates.Window) <= YenOrders.EventTime 
AND YenOrders.EventTime < WINDOW_END(ValidRates.Window)
HAVING Curr = "Euro";
```
x??

---

#### Handling Out-of-Order Data
Background context: In a scenario where data arrives out of order, it's crucial to match each order with the most recent valid rate. This involves checking if an order falls within the start and end times of a validity window.

:p How does the condition `WINDOW_START(ValidRates.Window) <= YenOrders.EventTime AND YenOrders.EventTime < WINDOW_END(ValidRates.Window)` work?
??x
This condition ensures that the event time of the order (`YenOrders.EventTime`) falls within the start and end times of the validity window for each rate. If it does, the order is matched with that rate.
```sql
WITH ValidRates AS (
  SELECT 
    Curr,
    MAX(Rate) as Rate,
    VALIDITY_WINDOW(EventTime) as Window
  FROM YenRates
  GROUP BY 
    Curr, 
    VALIDITY_WINDOW(EventTime)
)
SELECT 
  TVR,
  YenOrders.Amount as "E",
  ValidRates.Rate as "Y/E", 
  YenOrders.Amount * ValidRates.Rate as "Y",
  YenOrders.EventTime as Order, 
  ValidRates.Window as "Rate Window"
FROM YenOrders
FULL OUTER JOIN ValidRates 
ON YenOrders.Curr = ValidRates.Curr 
AND WINDOW_START(ValidRates.Window) <= YenOrders.EventTime 
AND YenOrders.EventTime < WINDOW_END(ValidRates.Window)
HAVING Curr = "Euro";
```
x??

---

#### Rate Window Evolution
Background context: The rate windows evolve over time, reflecting changes in exchange rates. Each window has a start and end time, indicating the period during which a particular rate is valid.

:p What does the `MAX(Rate) as Rate` part of the query do?
??x
The `MAX(Rate)` function ensures that for each currency and validity window, only the highest (latest) exchange rate is selected. This helps in maintaining accurate rates over time.
```sql
WITH ValidRates AS (
  SELECT 
    Curr,
    MAX(Rate) as Rate,
    VALIDITY_WINDOW(EventTime) as Window
  FROM YenRates
  GROUP BY 
    Curr, 
    VALIDITY_WINDOW(EventTime)
)
```
x??

---

#### Example of Out-of-Order Matching
Background context: The provided example shows how orders can be matched with rates that were valid at the time they arrived. Orders and rates might not arrive in chronological order, making it necessary to match them based on their windows.

:p How is the 5 € order initially matched?
??x
The 5 € order placed at `12:05` was originally matched with the rate of `114 ¥/€` because that rate was valid during the window `[12:03, 12:06)`. However, as rates change over time, this match might be updated.
```sql
| E | Y/E | Y   | Order | Rate Window    |
|---|-----|-----|-------|---------------|
| 5 | 114 | 570 | 12:05 | [12:03, 12:06) |
```
x??

---

#### Dynamic Window Adjustments
Background context: As new data arrives, existing windows might need to be adjusted or new ones created. This dynamic nature of validity windows ensures that rates are always up-to-date.

:p How does the `undo` flag in the ValidRates relation affect the matching?
??x
The `undo` flag indicates when a rate has been invalidated and should no longer be used for matching. When an order is placed during such a period, it will not match with that invalid rate.
```sql
| Curr | Rate | Window         | Time     | Undo |
|------|------|---------------|---------|------|
| Euro | 114  | [12:00, +inf)  | 12:07:33 | undo |
```
x??

---

#### Complex Query for TVR
Background context: The complex query for the temporal view relation (TVR) combines multiple operations to ensure that orders are matched with valid rates over time. It involves window functions and joins to handle out-of-order data.

:p What is the purpose of using `HAVING Curr = "Euro"` in the query?
??x
The `HAVING Curr = "Euro"` clause filters the results to only include records where the currency is Euro, ensuring that the query focuses on relevant exchange rates.
```sql
WITH ValidRates AS (
  SELECT 
    Curr,
    MAX(Rate) as Rate,
    VALIDITY_WINDOW(EventTime) as Window
  FROM YenRates
  GROUP BY 
    Curr, 
    VALIDITY_WINDOW(EventTime)
)
SELECT 
  TVR,
  YenOrders.Amount as "E",
  ValidRates.Rate as "Y/E", 
  YenOrders.Amount * ValidRates.Rate as "Y",
  YenOrders.EventTime as Order, 
  ValidRates.Window as "Rate Window"
FROM YenOrders
FULL OUTER JOIN ValidRates 
ON YenOrders.Curr = ValidRates.Curr 
AND WINDOW_START(ValidRates.Window) <= YenOrders.EventTime 
AND YenOrders.EventTime < WINDOW_END(ValidRates.Window)
HAVING Curr = "Euro";
```
x??

---


---
#### Out-of-Order Event Handling

Background context: In stream processing, events can arrive out of order. This example illustrates how an event arriving late (e.g., 12:03) requires updating a previously calculated result.

:p What happens when an event arrives out of order in this scenario?
??x
When an out-of-order event arrives, the system must re-evaluate and possibly update results based on the new data. In this case, the rate for Euros changes from 114 ¥/€ to 116 ¥/€ at 12:03. As a result, any previously calculated conversions using the old rate (e.g., a 5 € order) must be re-evaluated and updated.

For example, if a 5 € order was initially calculated as 570 ¥ at 12:05 with the rate of 114 ¥/€, it should be recalculated to 580 ¥ after the new rate (116 ¥/€) becomes effective. This ensures that all calculations are accurate and reflect the most recent rates.
x??

---
#### Stream Processing with FULL OUTER Join

Background context: The use of a FULL OUTER join can result in messy streams, as it includes rows from both inputs where there is no match. This can lead to unnecessary unjoined rows.

:p How does using a FULL OUTER join affect stream processing?
??x
Using a FULL OUTER join in stream processing means that the output will include all records from both input sources, even if they do not have matching keys. This leads to additional unjoined rows, which might be irrelevant depending on the application requirements. For instance, when handling conversion orders, you may only care about matched rows and can ignore unmatched ones.

To simplify the stream processing, switching to an INNER join can reduce the number of unneeded rows in the output.
x??

---
#### Reducing Stream Chatter

Background context: The example shows how removing redundant information from the stream can decrease its "chattiness," or noise. By eliminating the rate window from the stream, fewer updates are generated.

:p Why is reducing the amount of data (reducing "chattiness") in a stream important?
??x
Reducing the amount of data in a stream helps improve performance and efficiency by minimizing unnecessary updates and processing. In this context, removing the rate window from the stream means that you only emit new values when there's an actual change in the conversion rate. This reduces the frequency of redundant updates, making the system more responsive and resource-efficient.

For example, if the rate window doesn't affect the final conversion value, it can be removed to reduce the number of unnecessary re-calculations.
x??

---
#### Using INNER Join for Conversion Orders

Background context: The transformation using an INNER join focuses only on matching rows between YenOrders and ValidRates tables. This approach eliminates unneeded rows and simplifies the stream processing.

:p How does switching from a FULL OUTER to an INNER join help in handling conversion orders?
??x
Switching from a FULL OUTER join to an INNER join helps simplify the stream by focusing only on matching rows, thereby eliminating unnecessary unjoined rows. In this context, the INNER join ensures that only valid conversions are processed and displayed, making the stream more straightforward and easier to manage.

For instance, in handling conversion orders:
```sql
WITH ValidRates AS (
    SELECT 
        Curr,
        MAX(Rate) as Rate,
        VALIDITY_WINDOW(EventTime) as Window
    FROM YenRates
    GROUP BY 
        Curr, 
        VALIDITY_WINDOW(EventTime)
)
SELECT  STREAM
    YenOrders.Amount as "E",
    ValidRates.Rate as "Y/E",
    YenOrders.Amount * ValidRates.Rate as "Y",
    YenOrders.EventTime as Order,
    Sys.EmitTime as Time,
    Sys.Undo as Undo
FROM YenOrders 
INNER JOIN ValidRates 
ON YenOrders.Curr = ValidRates.Curr 
AND WINDOW_START(ValidRates.Window) <= YenOrders.EventTime 
AND YenOrders.EventTime < WINDOW_END(ValidRates.Window)
HAVING Curr = "Euro";
```

This transformation ensures that only relevant data is processed, leading to cleaner and more efficient stream processing.
x??

---


#### Temporal Validity Join and Windowed Joins

Background context: This concept discusses how to perform joins between two temporal valid relations (TVRs) in a way that is tolerant of out-of-order data. The primary goal is to ensure that orders are correctly matched with their respective currency conversion rates, even when the order arrives before or after the rate.

:p What is a temporal validity join?
??x
A temporal validity join combines records from two TVRs based on the temporal validity windows, ensuring that each record in one relation has a valid corresponding record in the other relation during its validity period.
x??

---

#### Watermarks and Temporal Validity Joins

Background context: This concept explains how watermarks can be used to control when joined results are emitted. The watermark is a timestamp representing the latest event time for which we have complete data, ensuring that no incomplete events are included in the output.

:p How do watermarks improve the handling of out-of-order events in temporal validity joins?
??x
Watermarks improve the handling of out-of-order events by ensuring that only results whose corresponding timestamps are after the watermark are emitted. This prevents premature emission and ensures correctness.
x??

---

#### Per-Record Triggering vs. Watermark Triggering

Background context: The text compares implicit per-record triggering with explicit watermark triggering, highlighting how the latter provides a meaningful reference point for determining when to emit joined results.

:p How does an explicit watermark trigger differ from the default per-record triggering in temporal validity joins?
??x
An explicit watermark trigger fires only once when the watermark passes the end of the validity window in the join. In contrast, per-record triggering can emit multiple outputs and retractions as new records arrive, which may include out-of-order data.
x??

---

#### Example Query with Explicit Watermark Trigger

Background context: The example query shows how to use a temporal validity join to convert currency amounts from Euros to Yen, using both an implicit default trigger and an explicit watermark trigger.

:p What is the difference between the following two queries in terms of emitted results?
??x
The first query (with per-record triggering) emits multiple outputs and retractions for rates arriving out of order. The second query (with an explicit watermark trigger) emits a single, correct converted result per order only when the watermark passes the end of the validity window.
x??

---

#### Animated Diagram of Temporal Validity Join

Background context: Figure 9-2 visualizes the temporal validity join and shows how the structure changes over time, helping to understand the evolution of data processing.

:p How does an animated diagram like Figure 9-2 aid in understanding a temporal validity join?
??x
An animated diagram helps visualize the temporal nature of the data and how joins evolve as new events arrive. It makes it easier to comprehend the dynamic nature of temporal validity windows and watermarks.
x??

---

#### Execution Engine's Role with Watermarks

Background context: The text highlights that an execution engine must be capable of taking watermarks into consideration when determining when to emit joined results.

:p What role does the execution engine play in handling watermarks for temporal validity joins?
??x
The execution engine is responsible for processing the data and ensuring that it respects the watermark. It must correctly handle triggers based on watermark progression and avoid premature emission of incomplete or out-of-order events.
x??

---

#### Simplified Example Query

Background context: The simplified example query demonstrates how to use a temporal validity join with an explicit watermark trigger, resulting in more ideal output.

:p What is the purpose of using `EMIT WHEN WATERMARK PAST WINDOW_END` in the provided query?
??x
The purpose is to ensure that joined results are only emitted when the watermark passes the end of the validity window. This prevents premature emission and ensures that all necessary events have been processed, leading to more correct and complete output.
x??

---

#### Join Conditions with Temporal Windows

Background context: The join conditions in the query include temporal windows to ensure that records from both relations are valid during their respective time periods.

:p How do the join conditions `WINDOW_START(ValidRates.Window) <= YenOrders.EventTime` and `YenOrders.EventTime < WINDOW_END(ValidRates.Window)` work?
??x
These conditions ensure that only records within the validity window of the currency rates are joined with orders. This prevents joining an order to a rate that is not valid at the time of the order.
x??

---


#### MapReduce Concept Introduction
Background context explaining how large-scale data processing started with MapReduce. It was introduced by Google engineers to simplify complex data processing tasks by abstracting away scalability and fault-tolerance issues.

:p What is the primary concept behind MapReduce?
??x
MapReduce provides a high-level API for distributed data processing that simplifies the extraction of insights from massive datasets, abstracting away low-level concerns like scalability and fault tolerance. It leverages two core operations: map and reduce.
x??

---
#### Challenges Addressed by MapReduce
Explanation on why MapReduce was created; it addressed the three main challenges faced in large-scale data processing: data processing complexity, scalability, and fault-tolerance.

:p What were the primary problems that MapReduce aimed to solve?
??x
MapReduce aimed to address three major challenges:
1. Data processing is hard.
2. Scalability is hard.
3. Fault tolerance is hard.
By providing a framework for handling these issues, it allowed engineers to focus on the actual data transformation logic rather than dealing with distributed system complexities.

x??

---
#### MapReduce API Overview
Explanation of the map and reduce operations in MapReduce and their high-level semantics.

:p What are the two main operations provided by MapReduce?
??x
MapReduce provides two core operations: `map` and `reduce`.
- **Map**: Converts a table to a stream, applies a transformation to the stream, and groups it into another stream.
- **Reduce**: Takes grouped streams from the map phase and aggregates them.

The overall workflow involves these high-level phases:
1. MapRead: Read input data.
2. Map: Process the data with user-defined functions.
3. MapWrite: Write intermediate output.
4. ReduceRead: Gather all relevant data for each key from multiple maps.
5. Reduce: Aggregate the grouped streams.
6. ReduceWrite: Output final results.

x??

---
#### MapReduce Implementation Details
Explanation of how the MapReduce framework is structured to handle large-scale data processing, including phases and operations.

:p How does the MapReduce framework execute a job?
??x
The execution of a MapReduce job involves several phases:
1. **MapRead**: Reads input data.
2. **Map**: Processes each key-value pair with a user-defined map function, producing intermediate key-value pairs.
3. **MapWrite**: Writes the intermediate output to an appropriate location (e.g., distributed file system).
4. **Shuffle and Sort**: Collects all intermediate records for the same keys together.
5. **ReduceRead**: Reads aggregated data by key.
6. **Reduce**: Processes each group of values with a user-defined reduce function, producing final results.
7. **ReduceWrite**: Writes the output to an appropriate location.

This distributed execution framework ensures scalability and fault tolerance across commodity hardware.

x??

---
#### MapReduce in Google
Explanation of how Google utilized and developed MapReduce for its various tasks over time.

:p How did Google use MapReduce?
??x
Google used MapReduce extensively for a variety of tasks, including:
- Web indexing and search.
- Log analysis.
- Data mining applications.
Over the years, Google continuously refined and extended the framework to handle larger datasets and more complex operations. The focus was on scaling the system to unprecedented levels while maintaining fault tolerance.

x??

---
#### MapReduce Paper
Explanation of the publication that detailed the history and implementation of MapReduce.

:p What important document published in 2004 describes MapReduce?
??x
The paper titled "MapReduce: Simplified Data Processing on Large Clusters," published at OSDI 2004, provided a comprehensive overview of the MapReduce project. It included details about the API design, implementation, and various use cases. However, it did not include actual source code.

x??

---
#### MapReduce Historical Development
Explanation of Google's continued development and refinement of MapReduce over time.

:p What major developments occurred in the MapReduce framework after its initial release?
??x
After the initial release, Google made significant advancements to enhance MapReduce's capabilities:
- Scaling the system to handle petabytes of data.
- Improving fault tolerance mechanisms.
- Enhancing the API and user experience for developers.
These efforts have allowed MapReduce to remain a cornerstone of large-scale data processing in Google.

x??

---

