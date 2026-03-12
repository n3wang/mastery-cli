
# SQL Queries for ERPNext Connections and Monitoring Flashcards

```
bench --site dev_site_a mariadb
bench mariadb



cd /home/newang/frappe-bench-custom-test
bench --site dev_site_a mariadb
```


#### ERPNext SQL Basics: Why `tab` Prefix Exists
ERPNext/Frappe stores each DocType as a SQL table with the pattern:

- `tab<DocType Name>`
- Examples:
  - `tabSales Invoice`
  - `tabItem`
  - `tabGL Entry`
  - `tabStock Ledger Entry`

This matters because almost every direct SQL query in ERPNext needs those exact table names.

```sql
-- Example: read 10 latest sales invoices
SELECT name, customer, posting_date, grand_total, docstatus
FROM `tabSales Invoice`
ORDER BY modified DESC
LIMIT 10;
```

:p What is the table naming pattern for ERPNext DocTypes, and why is it important?
??x
ERPNext stores each DocType as `tab<DocType Name>`, for example:
- `tabItem`
- `tabSales Order`
- `tabIssue`

It is important because direct SQL must query those exact table names.
x??

---

#### Verify Current Database and Server Session
Before any debugging session, confirm:
- Which DB you are connected to
- Which SQL user/session is executing
- Current timestamp/timezone context

```sql
SELECT DATABASE() AS current_db, USER() AS session_user, NOW() AS server_time;
```

:p Which quick SQL query tells you the current DB, user, and server time?
??x
Use:
```sql
SELECT DATABASE(), USER(), NOW();
```
This confirms your current database, session user, and server-side time context.
x??

---

#### Active Connection Count (High-Level Health)
Connection spikes can cause request failures and timeouts in ERPNext.

```sql
SHOW STATUS LIKE 'Threads_connected';
SHOW STATUS LIKE 'Max_used_connections';
SHOW VARIABLES LIKE 'max_connections';
```

Interpretation:
- `Threads_connected`: current open client sessions
- `Max_used_connections`: peak usage since server start
- `max_connections`: configured hard limit

:p Which 3 values help you understand SQL connection pressure?
??x
Use:
- `Threads_connected` (current connections)
- `Max_used_connections` (historical peak)
- `max_connections` (configured limit)

Comparing these shows whether you are near saturation.
x??

---

#### List Long-Running Queries (Live)
When users report slowness, start with active process list.

```sql
SHOW FULL PROCESSLIST;
```

More focused:

```sql
SELECT ID, USER, DB, COMMAND, TIME, STATE, INFO
FROM information_schema.PROCESSLIST
WHERE COMMAND != 'Sleep'
ORDER BY TIME DESC
LIMIT 20;
```

:p What query helps you quickly identify long-running active SQL statements?
??x
Use process list:
```sql
SHOW FULL PROCESSLIST;
```
or filtered:
```sql
SELECT ... FROM information_schema.PROCESSLIST
WHERE COMMAND != 'Sleep'
ORDER BY TIME DESC;
```
x??

---

#### Who Is Locking What (Lock Contention)
ERPNext heavy writes (invoicing, stock posting) may block each other.

```sql
SELECT *
FROM information_schema.innodb_trx
ORDER BY trx_started;
```

If available:

```sql
SELECT * FROM information_schema.innodb_lock_waits;
SELECT * FROM information_schema.innodb_locks;
```

:p Which InnoDB views are used first for lock and transaction contention analysis?
??x
Primary views:
- `information_schema.innodb_trx`
- `information_schema.innodb_lock_waits`
- `information_schema.innodb_locks`

They show running transactions, wait graph, and lock metadata.
x??

---

#### Latest Heavy ERP Transactions (Sales + Stock)
Useful for confirming that core transactions are being created as expected.

```sql
SELECT name, posting_date, customer, grand_total, docstatus, owner, modified
FROM `tabSales Invoice`
ORDER BY modified DESC
LIMIT 20;
```

```sql
SELECT item_code, warehouse, posting_date, posting_time, actual_qty, qty_after_transaction, voucher_type, voucher_no
FROM `tabStock Ledger Entry`
ORDER BY creation DESC
LIMIT 30;
```

:p Which two tables are most useful to verify financial and stock transaction flow?
??x
Use:
- `tabSales Invoice` for billing/financial side
- `tabStock Ledger Entry` for inventory movement side

These together validate order-to-cash/stock posting behavior.
x??

---

#### Queue Backlog Signals in Database
ERPNext uses background jobs; DB artifacts can hint queue pressure.

```sql
SELECT status, COUNT(*) AS cnt
FROM `tabScheduled Job Log`
GROUP BY status
ORDER BY cnt DESC;
```

```sql
SELECT method, status, COUNT(*) AS cnt
FROM `tabRQ Job`
GROUP BY method, status
ORDER BY cnt DESC
LIMIT 30;
```

:p Which doctypes can you query for job execution backlog signals?
??x
Useful backlog signals:
- `tabScheduled Job Log` (scheduler outcomes)
- `tabRQ Job` (background queue job states)
x??

---

#### Detect Large Tables (Capacity + Growth)
Find DB growth hotspots before they become performance issues.

```sql
SELECT
  table_name,
  ROUND((data_length + index_length)/1024/1024, 2) AS size_mb,
  table_rows
FROM information_schema.tables
WHERE table_schema = DATABASE()
ORDER BY (data_length + index_length) DESC
LIMIT 25;
```

:p What query gives top largest tables by data+index size?
??x
Query `information_schema.tables` with:
- `data_length + index_length`
- filter `table_schema = DATABASE()`
- order descending by combined size
x??

---

#### Check Missing/Weak Index Coverage on Frequent Filters
For ERPNext custom reports, index mistakes are common.

```sql
SHOW INDEX FROM `tabSales Invoice`;
SHOW INDEX FROM `tabGL Entry`;
SHOW INDEX FROM `tabStock Ledger Entry`;
```

When debugging a slow report:
1. Look at `WHERE` columns
2. Confirm index exists for those columns
3. Use `EXPLAIN` on the query

:p What is the quick SQL workflow for slow filter/report queries?
??x
Workflow:
1. `SHOW INDEX FROM <table>`
2. Identify filtered/joined columns in your query
3. `EXPLAIN <query>` to verify index usage
4. Add/adjust index if needed
x??

---

#### EXPLAIN Before Running Heavy Query
Always inspect query plan first in production-like systems.

```sql
EXPLAIN
SELECT si.name, si.posting_date, si.customer, si.grand_total
FROM `tabSales Invoice` si
WHERE si.docstatus = 1
  AND si.posting_date >= '2026-01-01'
ORDER BY si.posting_date DESC
LIMIT 100;
```

Look for:
- `type` not equal to `ALL` when possible
- useful `key` selected
- low `rows` scanned

:p Why should you run EXPLAIN first, and what columns matter most in output?
??x
Use `EXPLAIN` to estimate scan pattern and index usage before heavy reads.
Important output:
- `type` (access method)
- `key` (chosen index)
- `rows` (estimated scanned rows)

Goal: avoid full table scans on large tables.
x??

---

#### Find Failed Integrations and API Errors Fast
For ecommerce/POS integrations, log tables are critical.

```sql
SELECT name, status, method, error, creation
FROM `tabError Log`
ORDER BY creation DESC
LIMIT 50;
```

```sql
SELECT name, modified, owner
FROM `tabIntegration Request`
ORDER BY modified DESC
LIMIT 50;
```

:p Which tables should you query first for recent integration/API failures?
??x
Start with:
- `tabError Log`
- `tabIntegration Request`

They quickly reveal failing methods, timestamps, and error payload context.
x??

---

#### Support Monitoring Query (Open Issues Aging)
Simple operations monitoring for support workloads.

```sql
SELECT
  status,
  priority,
  COUNT(*) AS cnt
FROM `tabIssue`
WHERE status IN ('Open', 'Replied', 'Hold')
GROUP BY status, priority
ORDER BY cnt DESC;
```

```sql
SELECT
  name, subject, priority, status, owner, modified
FROM `tabIssue`
WHERE status IN ('Open', 'Replied', 'Hold')
ORDER BY modified ASC
LIMIT 30;
```

:p What SQL pattern helps monitor support queue health in ERPNext?
??x
Use two views:
1. Aggregate counts by `status, priority`
2. Oldest modified open issues list

This shows both volume and aging risk.
x??

---

#### Sales Monitoring Query (Daily Revenue + Count)
Basic daily dashboard query for sanity checks.

```sql
SELECT
  posting_date,
  COUNT(*) AS invoice_count,
  SUM(grand_total) AS total_amount
FROM `tabSales Invoice`
WHERE docstatus = 1
GROUP BY posting_date
ORDER BY posting_date DESC
LIMIT 30;
```

:p How do you quickly compute daily submitted sales in SQL?
??x
Group submitted invoices by `posting_date` and aggregate:
- `COUNT(*)` for volume
- `SUM(grand_total)` for revenue

Filter with `docstatus = 1`.
x??

---

#### Inventory Risk Query (Negative or Low Stock)
Fast operational query for replenishment risk.

```sql
SELECT
  item_code,
  warehouse,
  actual_qty
FROM `tabBin`
WHERE actual_qty <= 0
ORDER BY actual_qty ASC
LIMIT 100;
```

:p Which table is best for current per-warehouse stock snapshot checks?
??x
Use `tabBin` for current stock snapshot by item+warehouse.
It is ideal for low/negative stock scans and operational alerts.
x??

---

#### Connection Safety Rules (Must Memorize)
When doing SQL diagnostics in live ERP systems:

1. Start read-only (`SELECT`, `SHOW`, `EXPLAIN`).
2. Never run broad `UPDATE/DELETE` without explicit filter and backup.
3. Prefer narrow time windows and `LIMIT` during investigation.
4. Save your exact query in incident notes for reproducibility.

:p What are the core safety rules when running SQL on live ERPNext databases?
??x
Core rules:
1. Use read-only diagnostics first.
2. Avoid destructive statements unless planned and backed up.
3. Scope queries tightly (time range + LIMIT).
4. Record exact queries/results for repeatable troubleshooting.
x??

---

#### ERPNext Connection + Monitoring Drill (Daily 5-Minute Routine)
Run this quick routine:

```sql
SELECT DATABASE(), USER(), NOW();
SHOW STATUS LIKE 'Threads_connected';
SELECT ID, USER, DB, TIME, STATE, INFO
FROM information_schema.PROCESSLIST
WHERE COMMAND != 'Sleep'
ORDER BY TIME DESC
LIMIT 10;
```

Then check:

```sql
SELECT status, COUNT(*) FROM `tabScheduled Job Log` GROUP BY status;
SELECT posting_date, COUNT(*), SUM(grand_total)
FROM `tabSales Invoice`
WHERE docstatus = 1
GROUP BY posting_date
ORDER BY posting_date DESC
LIMIT 7;
```

:p What is a practical daily SQL monitoring routine for ERPNext?
??x
Daily routine:
1. Validate DB/user/time context
2. Check connection pressure
3. Inspect active long-running sessions
4. Check scheduler/job outcomes
5. Check recent submitted sales trend

This catches early signs of incidents before users report them.
x??
