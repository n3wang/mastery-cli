# Exercise 6: Hooks, Document Events, and Scheduled Tasks

## Objective

Learn how Frappe's `hooks.py` system lets you react to document lifecycle events and run background scheduled jobs — without modifying core DocType controllers. You will build a **Stock Alert System** that sends daily summary emails and logs an audit trail on every Sales Invoice submission.

## Difficulty Level

Intermediate (60-90 minutes)

## What You'll Learn

- How `hooks.py` works as the central integration point for a Frappe app
- How to listen to `doc_events` (before/after save, submit, cancel, delete) for any DocType
- How to write and register `scheduler_events` (daily, hourly, weekly tasks)
- How `frappe.enqueue()` offloads work to background workers (Redis Queue)
- How to use Server Scripts as a no-code alternative for simple hooks
- How to test scheduler tasks manually from the bench console

## Prerequisites

- Completed Exercise 1 (DocTypes) and Exercise 4 (APIs) — recommended
- Basic Python understanding — especially functions, imports, loops
- Understanding of ERPNext Sales Invoice lifecycle

## Exercise Description

You will implement two things:

**Part A — Document Event Hook**: Every time a Sales Invoice is submitted, your hook function runs and writes an audit log entry (a custom DocType) recording: who submitted, when, what the total was, and from which IP address.

**Part B — Scheduler Task**: A daily background job that scans all Items for those below their reorder level and emails a summary to all users with the "Stock Manager" role.

---

## Step-by-Step Instructions

### Step 1: Understand `hooks.py`

Every Frappe app has a `hooks.py` at its root. This file is the registration manifest — it tells Frappe what to load and when.

Open `erpnext/hooks.py` and study the structure:

```bash
head -100 erpnext/hooks.py
```

Key sections you'll use:

```python
# Run a function when a specific document event fires on a specific DocType
doc_events = {
    "Sales Invoice": {
        "on_submit": "myapp.module.file.function_name",
    }
}

# Cron-style scheduled background tasks
scheduler_events = {
    "daily": [
        "myapp.module.file.daily_function_name",
    ],
    "hourly": [...],
    "weekly": [...],
    "cron": {
        "0 9 * * 1-5": ["myapp.module.file.weekday_morning_job"],
    }
}
```

When Frappe processes a Sales Invoice submission, it:
1. Runs the controller's `on_submit()` method
2. Then runs all functions listed in `doc_events["Sales Invoice"]["on_submit"]`

The hook function receives `doc` (the document) and `method` (the event name) as arguments.

---

### Step 2: Part A — Create the Audit Log DocType

First create a simple DocType to store the audit entries.

Create `erpnext/accounts/doctype/invoice_audit_log/`:

```bash
mkdir -p erpnext/accounts/doctype/invoice_audit_log
touch erpnext/accounts/doctype/invoice_audit_log/__init__.py
touch erpnext/accounts/doctype/invoice_audit_log/invoice_audit_log.json
touch erpnext/accounts/doctype/invoice_audit_log/invoice_audit_log.py
```

Add to `invoice_audit_log.json`:

```json
{
    "creation": "2024-01-01 00:00:00",
    "doctype": "DocType",
    "editable_grid": 0,
    "engine": "InnoDB",
    "field_order": [
        "invoice", "event", "user", "timestamp",
        "grand_total", "customer", "ip_address", "notes"
    ],
    "fields": [
        { "fieldname": "invoice",     "fieldtype": "Link",      "label": "Invoice",     "options": "Sales Invoice", "reqd": 1 },
        { "fieldname": "event",       "fieldtype": "Data",      "label": "Event",       "reqd": 1, "in_list_view": 1 },
        { "fieldname": "user",        "fieldtype": "Link",      "label": "User",        "options": "User", "in_list_view": 1 },
        { "fieldname": "timestamp",   "fieldtype": "Datetime",  "label": "Timestamp",   "in_list_view": 1 },
        { "fieldname": "grand_total", "fieldtype": "Currency",  "label": "Grand Total" },
        { "fieldname": "customer",    "fieldtype": "Link",      "label": "Customer",    "options": "Customer" },
        { "fieldname": "ip_address",  "fieldtype": "Data",      "label": "IP Address" },
        { "fieldname": "notes",       "fieldtype": "Small Text","label": "Notes" }
    ],
    "index_web_pages_for_search": 0,
    "links": [],
    "modified": "2024-01-01 00:00:00",
    "modified_by": "Administrator",
    "module": "Accounts",
    "name": "Invoice Audit Log",
    "owner": "Administrator",
    "permissions": [
        {
            "read": 1, "report": 1, "export": 1,
            "role": "Accounts Manager"
        }
    ],
    "read_only": 1,
    "sort_field": "timestamp",
    "sort_order": "DESC"
}
```

`"read_only": 1` means the DocType can only be created programmatically — users cannot edit records through the form.

Add to `invoice_audit_log.py`:

```python
import frappe
from frappe.model.document import Document


class InvoiceAuditLog(Document):
    pass
```

---

### Step 3: Part A — Write the Hook Handler Function

Create `erpnext/accounts/events/invoice_events.py`:

```bash
mkdir -p erpnext/accounts/events
touch erpnext/accounts/events/__init__.py
touch erpnext/accounts/events/invoice_events.py
```

Add to `invoice_events.py`:

```python
"""
Document event handlers for Sales Invoice.
Registered in hooks.py under doc_events.
"""

import frappe
from frappe.utils import now_datetime


def on_invoice_submit(doc, method):
    """
    Runs after a Sales Invoice is submitted (docstatus 0 → 1).

    Args:
        doc: The Sales Invoice document object (fully populated)
        method: The event name string ('on_submit')
    """
    _write_audit_log(doc, event="Submitted")


def on_invoice_cancel(doc, method):
    """
    Runs after a Sales Invoice is cancelled (docstatus 1 → 2).
    """
    _write_audit_log(doc, event="Cancelled")


def before_invoice_save(doc, method):
    """
    Runs before every save of Sales Invoice.
    Use this for pre-save checks or field auto-fills.
    """
    # Example: auto-set a custom field based on total
    if doc.grand_total and doc.grand_total > 100_000:
        doc.custom_requires_approval = 1  # hypothetical custom field


def _write_audit_log(doc, event):
    """Internal helper — creates an Invoice Audit Log record."""
    try:
        log = frappe.get_doc({
            "doctype": "Invoice Audit Log",
            "invoice": doc.name,
            "event": event,
            "user": frappe.session.user,
            "timestamp": now_datetime(),
            "grand_total": doc.grand_total,
            "customer": doc.customer,
            "ip_address": frappe.local.request_ip if frappe.local.request_ip else "N/A",
            "notes": f"Items: {len(doc.items)}, Currency: {doc.currency}",
        })
        log.insert(ignore_permissions=True)
        frappe.db.commit()  # explicit commit — hooks sometimes run in deferred context
    except Exception as e:
        # Never let audit logging crash the main transaction
        frappe.log_error(
            title="Invoice Audit Log failed",
            message=frappe.get_traceback()
        )
```

**Important pattern**: Always wrap hook functions in `try/except`. If your hook raises an unhandled exception, it blocks the original document save/submit. Audit logging should be silent on failure.

---

### Step 4: Part B — Write the Scheduler Task

Create `erpnext/stock/tasks/stock_alerts.py`:

```bash
mkdir -p erpnext/stock/tasks
touch erpnext/stock/tasks/__init__.py
touch erpnext/stock/tasks/stock_alerts.py
```

Add to `stock_alerts.py`:

```python
"""
Scheduled tasks for stock monitoring.
Registered in hooks.py under scheduler_events.
"""

import frappe
from frappe import _
from frappe.utils import today


def send_daily_low_stock_alert():
    """
    Runs once per day (registered in scheduler_events['daily']).
    Finds items below reorder level and emails Stock Manager users.
    """
    low_stock = _get_low_stock_items()

    if not low_stock:
        return  # Nothing to report — don't send an empty email

    recipients = _get_stock_manager_emails()
    if not recipients:
        frappe.log_error(
            title="Low Stock Alert: No recipients",
            message="No users with 'Stock Manager' role found. Alert not sent."
        )
        return

    _send_alert_email(recipients, low_stock)


def send_weekly_stock_summary():
    """
    Runs once per week.
    Sends a broader summary including items that will hit reorder level within 7 days.
    """
    # Use frappe.enqueue to run in the background worker (non-blocking)
    frappe.enqueue(
        "erpnext.stock.tasks.stock_alerts._generate_and_send_weekly_summary",
        queue="long",
        timeout=300,
    )


def _get_low_stock_items():
    """Query items currently at or below their reorder level."""
    return frappe.db.sql(
        """
        SELECT
            i.name        AS item_code,
            i.item_name,
            i.item_group,
            i.reorder_level,
            SUM(b.actual_qty) AS total_qty
        FROM `tabItem` i
        LEFT JOIN `tabBin` b ON b.item_code = i.name
        WHERE i.reorder_level > 0
          AND i.disabled = 0
        GROUP BY i.name
        HAVING total_qty <= i.reorder_level OR total_qty IS NULL
        ORDER BY (COALESCE(total_qty, 0) / i.reorder_level) ASC
        LIMIT 50
        """,
        as_dict=True,
    )


def _get_stock_manager_emails():
    """Return email addresses of all active users with 'Stock Manager' role."""
    users = frappe.db.sql(
        """
        SELECT DISTINCT u.email
        FROM `tabUser` u
        JOIN `tabHas Role` hr ON hr.parent = u.name
        WHERE hr.role = 'Stock Manager'
          AND u.enabled = 1
          AND u.email != ''
        """,
        as_dict=True,
    )
    return [u.email for u in users if u.email]


def _send_alert_email(recipients, items):
    """Compose and send the low stock alert email."""
    rows_html = "".join(
        f"""
        <tr>
            <td>{i.item_code}</td>
            <td>{i.item_name}</td>
            <td>{i.item_group or ''}</td>
            <td style="color:{'red' if (i.total_qty or 0) == 0 else 'orange'}">
                {i.total_qty or 0}
            </td>
            <td>{i.reorder_level}</td>
        </tr>
        """
        for i in items
    )

    body = f"""
        <h3>Low Stock Alert — {today()}</h3>
        <p>The following {len(items)} item(s) are at or below their reorder level:</p>
        <table border="1" cellpadding="6" cellspacing="0" style="border-collapse:collapse">
            <thead style="background:#f0f0f0">
                <tr>
                    <th>Item Code</th><th>Item Name</th><th>Group</th>
                    <th>Current Qty</th><th>Reorder Level</th>
                </tr>
            </thead>
            <tbody>{rows_html}</tbody>
        </table>
        <p>Please review and place purchase orders where needed.</p>
    """

    frappe.sendmail(
        recipients=recipients,
        subject=f"[ERPNext] Low Stock Alert — {len(items)} items — {today()}",
        message=body,
        delayed=False,
    )


def _generate_and_send_weekly_summary():
    """Runs inside the background worker (called via frappe.enqueue)."""
    # This is where you'd build the heavier weekly report
    # Running in the background prevents it blocking the scheduler process
    frappe.sendmail(
        recipients=_get_stock_manager_emails(),
        subject=f"[ERPNext] Weekly Stock Summary — {today()}",
        message="<p>Weekly stock summary goes here.</p>",
    )
```

---

### Step 5: Register Everything in `hooks.py`

Open `erpnext/hooks.py` and add/extend these sections:

```python
# ── Document Event Hooks ──────────────────────────────────────────────────────

doc_events = {
    # Existing entries may already be here — ADD to the dict, don't replace it
    "Sales Invoice": {
        "before_save": "erpnext.accounts.events.invoice_events.before_invoice_save",
        "on_submit":   "erpnext.accounts.events.invoice_events.on_invoice_submit",
        "on_cancel":   "erpnext.accounts.events.invoice_events.on_invoice_cancel",
    },
}

# ── Scheduler Events ─────────────────────────────────────────────────────────

scheduler_events = {
    # Existing entries — ADD to each list, don't replace it
    "daily": [
        "erpnext.stock.tasks.stock_alerts.send_daily_low_stock_alert",
    ],
    "weekly": [
        "erpnext.stock.tasks.stock_alerts.send_weekly_stock_summary",
    ],
    # Cron syntax: run at 8am on weekdays only
    "cron": {
        "0 8 * * 1-5": [
            "erpnext.stock.tasks.stock_alerts.send_daily_low_stock_alert",
        ],
    },
}
```

**Important**: If `doc_events` or `scheduler_events` already exist in `hooks.py`, extend the existing dict/list rather than overwriting it — otherwise you'll break existing hooks.

Then clear cache:

```bash
bench clear-cache
```

---

### Step 6: Test Manually

**Test the document hook:**

```bash
bench --site your-site-name console
```

```python
import frappe

# Simulate submitting a Sales Invoice and observe the hook
# (or create a real one)
from erpnext.accounts.events.invoice_events import on_invoice_submit

# Get any existing submitted invoice to test against
invoice = frappe.get_doc("Sales Invoice", frappe.get_all(
    "Sales Invoice", filters={"docstatus": 1}, limit=1
)[0].name)

on_invoice_submit(invoice, "on_submit")

# Check the log was created
logs = frappe.get_all("Invoice Audit Log",
    filters={"invoice": invoice.name},
    fields=["invoice", "event", "user", "timestamp", "grand_total"]
)
print(logs)
```

**Test the scheduler task manually:**

```bash
bench --site your-site-name console
```

```python
from erpnext.stock.tasks.stock_alerts import send_daily_low_stock_alert

# Run it now — check console output and email queue
send_daily_low_stock_alert()

# Check if an email was queued
import frappe
emails = frappe.get_all("Email Queue",
    filters={"status": "Not Sent"},
    fields=["name", "recipients", "subject"],
    limit=5
)
print(emails)
```

**Trigger scheduler manually from bench:**

```bash
# Run all daily jobs right now (useful for testing)
bench --site your-site-name execute frappe.utils.scheduler.enqueue_events_for_all_sites

# Or run a specific function directly:
bench --site your-site-name execute erpnext.stock.tasks.stock_alerts.send_daily_low_stock_alert
```

---

### Step 7: Monitor Background Workers

```bash
# Watch the background worker logs in real time
tail -f sites/your-site-name/logs/worker.log

# Check which jobs are queued:
bench --site your-site-name console
```

```python
import frappe
from rq import Queue
from frappe.utils.background_jobs import get_redis_conn

conn = get_redis_conn()
q = Queue("default", connection=conn)
print(f"Jobs in queue: {len(q)}")
for job in q.jobs:
    print(job.func_name, job.args)
```

---

### Step 8: Explore Server Scripts as an Alternative

For `doc_events`, you can also use **DocType Events Server Scripts** (no code deploy needed):

1. Go to **Settings > Server Script > New**
2. Set **Script Type** to `DocType Event`
3. Set **DocType** to `Sales Invoice`
4. Set **DocType Event** to `on_submit`
5. Write the script body:

```python
# 'doc' is automatically available as the current document
if doc.grand_total > 10000:
    frappe.sendmail(
        recipients=["manager@example.com"],
        subject=f"Large Invoice Submitted: {doc.name}",
        message=f"<p>Invoice {doc.name} for {doc.customer} — {doc.grand_total}</p>"
    )
```

6. Save and enable

This fires on every Sales Invoice submission without touching code files.

---

## Expected Results

1. ✅ Submitting a Sales Invoice creates an `Invoice Audit Log` record
2. ✅ Audit log records: invoice name, user, timestamp, grand_total, IP address
3. ✅ Cancelling an invoice creates a second "Cancelled" audit log entry
4. ✅ `send_daily_low_stock_alert()` runs and creates Email Queue entries
5. ✅ Email Queue entries contain item table with correct low-stock items
6. ✅ `send_weekly_stock_summary()` enqueues a background job
7. ✅ Running `bench execute` triggers the task manually with no errors

---

## Common Issues & Troubleshooting

### Issue 1: Hook Not Firing

```bash
bench clear-cache
# Check that the function path in hooks.py exactly matches the file
python -c "from erpnext.accounts.events.invoice_events import on_invoice_submit; print('OK')"
```

### Issue 2: Hook Crashes the Document Save

Wrap all hook logic in `try/except Exception`. Never let hooks raise unhandled exceptions:

```python
def on_invoice_submit(doc, method):
    try:
        ...
    except Exception:
        frappe.log_error(title="Hook failed", message=frappe.get_traceback())
```

### Issue 3: Scheduler Not Running

```bash
# In development, the scheduler runs as part of bench start
# Verify the scheduler is the worker process is up:
bench start
# Look for "worker" and "scheduler" processes in the output
```

### Issue 4: Emails Not Sending

In development, emails go to the Email Queue (not actually sent unless SMTP configured):

```bash
bench --site your-site-name console
```

```python
import frappe
# View the email queue
frappe.get_all("Email Queue", fields=["name", "recipients", "subject", "status"], limit=10)
```

---

## Verification Checklist

- [ ] `Invoice Audit Log` DocType created and migrated
- [ ] `invoice_events.py` handler functions exist
- [ ] `stock_alerts.py` scheduler functions exist
- [ ] `hooks.py` has correct entries for `doc_events` and `scheduler_events`
- [ ] Cache cleared after `hooks.py` changes
- [ ] Submitting a Sales Invoice creates an audit log record
- [ ] Cancelling creates a second "Cancelled" audit log record
- [ ] `send_daily_low_stock_alert()` runs without error in console
- [ ] Email queue shows queued low-stock email
- [ ] `bench execute` works for the scheduler function

---

## Next Steps

1. **Notification log**: Instead of email, log to Frappe's built-in Notification Log
2. **Webhook on submit**: Post invoice data to an external URL using `frappe.enqueue` + `requests.post`
3. **Hourly sync check**: Use an hourly scheduler task to check for stuck sync records and retry them
4. **Custom `after_install` hook**: Run migration scripts when the app is installed

---

## Key Concepts Learned

- ✅ `hooks.py` as the central app integration manifest
- ✅ `doc_events` — subscribe to any DocType lifecycle event from outside its controller
- ✅ Hook function signature: `def handler(doc, method)` — doc is the full document object
- ✅ `try/except` pattern in hooks — never let hooks crash the main transaction
- ✅ `frappe.log_error()` — write to the Error Log doctype for monitoring
- ✅ `scheduler_events` — daily/hourly/weekly/cron background jobs
- ✅ `frappe.enqueue()` — defer heavy work to a background Redis Queue worker
- ✅ `frappe.sendmail()` — queue emails from Python
- ✅ `bench execute` — trigger any function manually for testing
- ✅ Server Scripts as a no-code alternative for doc_events hooks

---

## File Structure Summary

```
erpnext/
├── hooks.py                                         ← Register hooks here
├── accounts/
│   ├── events/
│   │   ├── __init__.py
│   │   └── invoice_events.py                        ← Doc event handlers
│   └── doctype/
│       └── invoice_audit_log/
│           ├── __init__.py
│           ├── invoice_audit_log.json               ← Read-only audit DocType
│           └── invoice_audit_log.py
└── stock/
    └── tasks/
        ├── __init__.py
        └── stock_alerts.py                          ← Scheduler task functions
```
