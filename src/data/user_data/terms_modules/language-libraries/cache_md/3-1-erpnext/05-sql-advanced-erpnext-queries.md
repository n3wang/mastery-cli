# Advanced ERPNext SQL Query Patterns Flashcards

#### Prepopulate Data First (So Queries Always Return Rows)
Before running this lab, seed practice data:

```bash
cd /home/newang/frappe-bench-custom-test
./scripts/seed_full_erpnext_test_data.sh
```

This seed is idempotent (safe to rerun) and fills key tables used in these queries, including:
- `tabSales Invoice`, `tabSales Invoice Item`, `tabPurchase Invoice`, `tabPurchase Invoice Item`
- `tabItem`, `tabItem Price`, `tabCustomer`, `tabSupplier`
- `tabIssue`, `tabOpportunity`, `tabIntegration Request`, `tabError Log`, `tabScheduled Job Log`

---

#### Sales + Items + Customer Join (Transaction Fact View)
This is the core join pattern for most revenue analysis in ERPNext:

```sql
SELECT
  si.name AS invoice_no,
  si.posting_date,
  si.customer,
  sii.item_code,
  sii.item_name,
  sii.qty,
  sii.base_net_rate,
  sii.base_net_amount
FROM `tabSales Invoice` si
JOIN `tabSales Invoice Item` sii
  ON sii.parent = si.name
WHERE si.docstatus = 1
  AND si.posting_date >= CURDATE() - INTERVAL 30 DAY
ORDER BY si.posting_date DESC, si.name DESC;
```

:p What is the fundamental ERPNext sales analytics join pattern?
??x
Join invoice header and line table:
- `tabSales Invoice` (header)
- `tabSales Invoice Item` (lines via `sii.parent = si.name`)

Filter submitted docs with `si.docstatus = 1`.
x??

---

#### Top Customers by Revenue with Window Ranking
Use window functions for ranked summaries:

```sql
WITH customer_rev AS (
  SELECT
    si.customer,
    SUM(si.base_grand_total) AS revenue
  FROM `tabSales Invoice` si
  WHERE si.docstatus = 1
    AND si.posting_date >= CURDATE() - INTERVAL 90 DAY
  GROUP BY si.customer
)
SELECT
  customer,
  revenue,
  DENSE_RANK() OVER (ORDER BY revenue DESC) AS revenue_rank
FROM customer_rev
ORDER BY revenue_rank
LIMIT 20;
```

:p Why use a CTE + window rank for top customer analysis?
??x
CTE keeps aggregation readable, and `DENSE_RANK()` gives deterministic ranking without nested subqueries.
x??

---

#### Month-over-Month Sales Growth (LAG)
Track trend and growth percentage:

```sql
WITH monthly_sales AS (
  SELECT
    DATE_FORMAT(posting_date, '%Y-%m') AS ym,
    SUM(base_grand_total) AS total_sales
  FROM `tabSales Invoice`
  WHERE docstatus = 1
  GROUP BY DATE_FORMAT(posting_date, '%Y-%m')
)
SELECT
  ym,
  total_sales,
  LAG(total_sales) OVER (ORDER BY ym) AS prev_sales,
  ROUND(
    (total_sales - LAG(total_sales) OVER (ORDER BY ym))
    / NULLIF(LAG(total_sales) OVER (ORDER BY ym), 0) * 100, 2
  ) AS mom_growth_pct
FROM monthly_sales
ORDER BY ym DESC
LIMIT 24;
```

:p Which SQL function is key for period-over-period ERP trend analysis?
??x
`LAG()` is key; it lets you compare current period value with previous period in one query.
x??

---

#### Receivables Aging Buckets from Sales Invoice
Classic accounting query for unpaid invoices:

```sql
SELECT
  customer,
  SUM(CASE WHEN DATEDIFF(CURDATE(), due_date) <= 0 THEN outstanding_amount ELSE 0 END) AS current_bucket,
  SUM(CASE WHEN DATEDIFF(CURDATE(), due_date) BETWEEN 1 AND 30 THEN outstanding_amount ELSE 0 END) AS bucket_1_30,
  SUM(CASE WHEN DATEDIFF(CURDATE(), due_date) BETWEEN 31 AND 60 THEN outstanding_amount ELSE 0 END) AS bucket_31_60,
  SUM(CASE WHEN DATEDIFF(CURDATE(), due_date) BETWEEN 61 AND 90 THEN outstanding_amount ELSE 0 END) AS bucket_61_90,
  SUM(CASE WHEN DATEDIFF(CURDATE(), due_date) > 90 THEN outstanding_amount ELSE 0 END) AS bucket_90_plus
FROM `tabSales Invoice`
WHERE docstatus = 1
GROUP BY customer
ORDER BY bucket_90_plus DESC, bucket_61_90 DESC;
```

:p How do you build AR aging buckets in SQL?
??x
Use `CASE WHEN` with `DATEDIFF(CURDATE(), due_date)` and aggregate bucket sums grouped by customer.
x??

---

#### Payment Reconciliation: Invoice vs Payment Entry Reference
Check how invoices are being settled:

```sql
SELECT
  si.name AS invoice_no,
  si.customer,
  si.base_grand_total,
  si.outstanding_amount,
  SUM(IFNULL(per.allocated_amount, 0)) AS allocated_amount,
  (si.base_grand_total - SUM(IFNULL(per.allocated_amount, 0))) AS calc_balance
FROM `tabSales Invoice` si
LEFT JOIN `tabPayment Entry Reference` per
  ON per.reference_doctype = 'Sales Invoice'
 AND per.reference_name = si.name
LEFT JOIN `tabPayment Entry` pe
  ON pe.name = per.parent
 AND pe.docstatus = 1
WHERE si.docstatus = 1
GROUP BY si.name, si.customer, si.base_grand_total, si.outstanding_amount
ORDER BY si.posting_date DESC
LIMIT 200;
```

:p Which table links Payment Entry allocations back to invoices?
??x
`tabPayment Entry Reference` links payment documents to target documents (`reference_doctype`, `reference_name`).
x??

---

#### GL Drilldown for a Voucher
Trace accounting impact of one document:

```sql
WITH target_invoice AS (
  SELECT name
  FROM `tabSales Invoice`
  WHERE docstatus = 1
  ORDER BY posting_date DESC, modified DESC
  LIMIT 1
)
SELECT
  posting_date,
  voucher_type,
  voucher_no,
  account,
  party_type,
  party,
  debit,
  credit,
  against_voucher_type,
  against_voucher
FROM `tabGL Entry` gle
JOIN target_invoice t
  ON gle.voucher_type = 'Sales Invoice'
 AND gle.voucher_no = t.name
ORDER BY account, posting_date, creation;
```

:p What is the fastest SQL route to inspect accounting postings of one transaction?
??x
Query `tabGL Entry` filtered by:
- `voucher_type`
- `voucher_no`
This shows all debit/credit lines posted by that voucher.
x??

---

#### Stock Movement Ledger with Running Quantity
Window sum on stock ledger:

```sql
WITH target_sle AS (
  SELECT item_code, warehouse
  FROM `tabStock Ledger Entry`
  ORDER BY posting_date DESC, posting_time DESC, creation DESC
  LIMIT 1
)
SELECT
  sle.item_code,
  sle.warehouse,
  sle.posting_date,
  sle.posting_time,
  sle.voucher_type,
  sle.voucher_no,
  sle.actual_qty,
  SUM(sle.actual_qty) OVER (
    PARTITION BY sle.item_code, sle.warehouse
    ORDER BY sle.posting_date, sle.posting_time, sle.creation
  ) AS running_qty
FROM `tabStock Ledger Entry` sle
JOIN target_sle t
  ON t.item_code = sle.item_code
 AND t.warehouse = sle.warehouse
ORDER BY sle.posting_date, sle.posting_time, sle.creation;
```

:p Why is a window SUM useful on `tabStock Ledger Entry`?
??x
It reconstructs running stock flow over time without mutating data, useful for forensic stock debugging.
x??

---

#### Validate Bin Snapshot vs Ledger-Derived Balance
Compare current snapshot table with computed ledger total:

```sql
WITH ledger AS (
  SELECT
    item_code,
    warehouse,
    SUM(actual_qty) AS ledger_qty
  FROM `tabStock Ledger Entry`
  GROUP BY item_code, warehouse
)
SELECT
  b.item_code,
  b.warehouse,
  b.actual_qty AS bin_qty,
  IFNULL(l.ledger_qty, 0) AS ledger_qty,
  (b.actual_qty - IFNULL(l.ledger_qty, 0)) AS variance
FROM `tabBin` b
LEFT JOIN ledger l
  ON l.item_code = b.item_code
 AND l.warehouse = b.warehouse
ORDER BY ABS(variance) DESC
LIMIT 100;
```

:p What is the purpose of comparing `tabBin` with aggregated stock ledger?
??x
To detect stock inconsistencies and reconciliation issues between current snapshot (`tabBin`) and transaction history (`tabStock Ledger Entry`).
x??

---

#### Item Velocity (Units Sold Last 30 Days)
Great for replenishment priorities:

```sql
SELECT
  sii.item_code,
  sii.item_name,
  SUM(sii.qty) AS units_sold_30d,
  SUM(sii.base_net_amount) AS revenue_30d
FROM `tabSales Invoice` si
JOIN `tabSales Invoice Item` sii
  ON sii.parent = si.name
WHERE si.docstatus = 1
  AND si.posting_date >= CURDATE() - INTERVAL 30 DAY
GROUP BY sii.item_code, sii.item_name
ORDER BY units_sold_30d DESC
LIMIT 50;
```

:p Which query pattern helps build fast-moving item reports?
??x
Join submitted sales headers + lines, aggregate `SUM(qty)` by item over a rolling window (e.g., 30 days).
x??

---

#### Supplier Spend Analysis from Purchase Invoices
Buying visibility:

```sql
SELECT
  pi.supplier,
  COUNT(*) AS invoice_count,
  SUM(pi.base_grand_total) AS spend_amount
FROM `tabPurchase Invoice` pi
WHERE pi.docstatus = 1
  AND pi.posting_date >= CURDATE() - INTERVAL 180 DAY
GROUP BY pi.supplier
ORDER BY spend_amount DESC
LIMIT 30;
```

:p How do you quickly rank top suppliers by spend?
??x
Aggregate submitted `tabPurchase Invoice` totals by `supplier` and order descending by spend.
x??

---

#### Margin Approximation by Item (Sales vs Buying Rates)
Simple proxy when exact costing model is not ready:

```sql
WITH sales AS (
  SELECT
    sii.item_code,
    SUM(sii.qty) AS sold_qty,
    SUM(sii.base_net_amount) AS sales_amount
  FROM `tabSales Invoice` si
  JOIN `tabSales Invoice Item` sii ON sii.parent = si.name
  WHERE si.docstatus = 1
    AND si.posting_date >= CURDATE() - INTERVAL 90 DAY
  GROUP BY sii.item_code
),
buying AS (
  SELECT
    pii.item_code,
    AVG(pii.base_rate) AS avg_buy_rate
  FROM `tabPurchase Invoice` pi
  JOIN `tabPurchase Invoice Item` pii ON pii.parent = pi.name
  WHERE pi.docstatus = 1
    AND pi.posting_date >= CURDATE() - INTERVAL 180 DAY
  GROUP BY pii.item_code
)
SELECT
  s.item_code,
  s.sold_qty,
  s.sales_amount,
  b.avg_buy_rate,
  ROUND(s.sales_amount - (s.sold_qty * IFNULL(b.avg_buy_rate, 0)), 2) AS approx_margin
FROM sales s
LEFT JOIN buying b ON b.item_code = s.item_code
ORDER BY approx_margin DESC
LIMIT 50;
```

:p Why is this called margin approximation and not exact gross margin?
??x
It uses average buy rate from purchase invoices, not exact inventory valuation layers (FIFO/moving average), so it is a directional KPI.
x??

---

#### SLA Compliance Snapshot for Issues
Support performance query:

```sql
SELECT
  priority,
  status,
  COUNT(*) AS cnt
FROM `tabIssue`
GROUP BY priority, status
ORDER BY priority, status;
```

Aging view:

```sql
SELECT
  name,
  subject,
  priority,
  status,
  DATEDIFF(CURDATE(), DATE(modified)) AS age_days
FROM `tabIssue`
ORDER BY age_days DESC
LIMIT 50;
```

:p Which two dimensions are most useful for issue queue monitoring?
??x
Priority and status are the key dimensions; add age in days to prioritize escalations.
x??

---

#### Detect Duplicate-like Customers by Normalized Name
Data quality check:

```sql
SELECT
  LOWER(TRIM(customer_name)) AS normalized_name,
  COUNT(*) AS cnt,
  CASE WHEN COUNT(*) > 1 THEN 'YES' ELSE 'NO' END AS potential_duplicate,
  GROUP_CONCAT(name ORDER BY name SEPARATOR ', ') AS customer_ids
FROM `tabCustomer`
GROUP BY LOWER(TRIM(customer_name))
ORDER BY cnt DESC, normalized_name
LIMIT 50;
```

:p Why use normalization (`LOWER(TRIM())`) in duplicate checks?
??x
It catches logical duplicates that differ only by case or extra spaces.
x??

---

#### Revenue by Item Group (Hierarchical Reporting Input)
Useful base for dashboard chart:

```sql
SELECT
  i.item_group,
  SUM(sii.base_net_amount) AS revenue
FROM `tabSales Invoice` si
JOIN `tabSales Invoice Item` sii ON sii.parent = si.name
JOIN `tabItem` i ON i.item_code = sii.item_code
WHERE si.docstatus = 1
  AND si.posting_date >= CURDATE() - INTERVAL 90 DAY
GROUP BY i.item_group
ORDER BY revenue DESC;
```

:p What join is required to analyze sales by item group?
??x
Join invoice items (`tabSales Invoice Item`) to item master (`tabItem`) using `item_code`.
x??

---

#### Detect Slow Query Risk with EXPLAIN + Covering Index Idea
Profile first, then optimize:

```sql
EXPLAIN
SELECT
  posting_date, customer, base_grand_total
FROM `tabSales Invoice`
WHERE docstatus = 1
  AND posting_date BETWEEN '2026-01-01' AND '2026-03-31'
ORDER BY posting_date DESC
LIMIT 500;
```

Potential index candidate:
- `(docstatus, posting_date, customer)`

:p What is a good ERPNext reporting index design pattern?
??x
Place filter columns first, then sort/group columns. Example: `(docstatus, posting_date)` for date-range submitted document reports.
x??

---

#### CTE for “At-Risk Customers” (Low Frequency + High Outstanding)
Composite KPI query:

```sql
WITH sales_90 AS (
  SELECT customer, COUNT(*) AS invoices_90
  FROM `tabSales Invoice`
  WHERE docstatus = 1
    AND posting_date >= CURDATE() - INTERVAL 90 DAY
  GROUP BY customer
),
outstanding AS (
  SELECT customer, SUM(outstanding_amount) AS os_amount
  FROM `tabSales Invoice`
  WHERE docstatus = 1
  GROUP BY customer
)
SELECT
  o.customer,
  IFNULL(s.invoices_90, 0) AS invoices_90,
  o.os_amount
FROM outstanding o
LEFT JOIN sales_90 s ON s.customer = o.customer
ORDER BY o.os_amount DESC, invoices_90 ASC
LIMIT 50;
```

:p Why combine CTEs for risk segmentation?
??x
It cleanly merges behavior metrics (frequency) with financial exposure (outstanding), enabling actionable prioritization.
x??

---

#### Cross-Module Health Check (Sales, Stock, Support in One Snapshot)
Quick operations board query set:

```sql
-- Sales today
SELECT COUNT(*) AS sales_count, IFNULL(SUM(base_grand_total),0) AS sales_amount
FROM `tabSales Invoice`
WHERE docstatus = 1
  AND posting_date = CURDATE();

-- Negative bins
SELECT COUNT(*) AS negative_bin_count
FROM `tabBin`
WHERE actual_qty < 0;

-- Open issues
SELECT COUNT(*) AS open_issues
FROM `tabIssue`
WHERE status IN ('Open', 'Replied', 'Hold');
```

:p What is the value of a cross-module SQL health snapshot?
??x
It gives a fast operational pulse across revenue, inventory integrity, and support load in under a minute.
x??
