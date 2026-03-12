# Exercise 5: Building a Custom Desk Page

## Objective

Learn how to create a fully custom Frappe Desk page — a standalone page with its own URL, layout, and interactive widgets — by building an **Operations Dashboard** that shows live inventory alerts, pending maintenance requests, and quick action buttons.

## Difficulty Level

Intermediate (75-90 minutes)

## What You'll Learn

- How Frappe's page system works (vs. reports and doctypes)
- How to create a page with its own JavaScript controller
- How to fetch data from the backend using `frappe.call()` and `frappe.db.get_list()`
- How to build UI widgets using Frappe's built-in UI helpers (`frappe.ui.Dialog`, `frappe.listview_settings`, etc.)
- How to use Chart.js (built into Frappe) for visualizations
- How to add your page to the navigation and workspace

## Prerequisites

- Completed Exercise 1 (understanding DocTypes) and Exercise 4 (API methods)
- Comfortable with JavaScript and basic DOM manipulation
- Familiarity with the ERPNext Desk interface

## Exercise Description

You will create a **"Operations Dashboard"** custom page at the URL `/operations-dashboard`. It will display:

1. **Summary cards** — counts of open maintenance requests by priority
2. **Low stock alerts** — items below their re-order level
3. **A bar chart** — maintenance requests by status over the last 30 days
4. **Quick action buttons** — navigate to new document forms directly from the page

---

## Step-by-Step Instructions

### Step 1: Understand the Frappe Page System

A Frappe custom page consists of:

```
frappe/public/js/frappe/pages/<page-name>/
    <page-name>.js     ← JavaScript controller (required)
    <page-name>.html   ← Optional HTML template
    <page-name>.css    ← Optional CSS
```

OR as part of an app:

```
erpnext/<module>/page/<page-name>/
    __init__.py
    <page-name>.json   ← Page metadata
    <page-name>.py     ← Python backend (optional whitelisted methods)
    <page-name>.js     ← JavaScript controller
```

Each page is also a **Page DocType record** — the JSON file is the "fixture" for it.

---

### Step 2: Create the Directory Structure

```bash
# Create page directory inside the assets module (or any relevant module)
mkdir -p erpnext/assets/page/operations_dashboard

# Create all files
touch erpnext/assets/page/operations_dashboard/__init__.py
touch erpnext/assets/page/operations_dashboard/operations_dashboard.json
touch erpnext/assets/page/operations_dashboard/operations_dashboard.py
touch erpnext/assets/page/operations_dashboard/operations_dashboard.js
```

---

### Step 3: Create the Page Metadata JSON

Add to `operations_dashboard.json`:

```json
{
    "creation": "2024-01-01 00:00:00.000000",
    "doctype": "Page",
    "icon": "fa fa-dashboard",
    "modified": "2024-01-01 00:00:00.000000",
    "module": "Assets",
    "name": "operations-dashboard",
    "page_name": "operations-dashboard",
    "roles": [
        { "role": "System Manager" },
        { "role": "Maintenance User" }
    ],
    "standard": "Yes",
    "title": "Operations Dashboard"
}
```

**Key fields**:
- `"page_name"` determines the URL: `/operations-dashboard`
- `"roles"` controls who can access the page
- `"standard": "Yes"` marks it as part of the app (not user-created)

---

### Step 4: Write the Python Backend

Add to `operations_dashboard.py`:

```python
"""
Backend data provider for the Operations Dashboard page.
All methods are whitelisted and called via frappe.call() from the page JS.
"""

import frappe
from frappe import _
from frappe.utils import add_days, today


@frappe.whitelist()
def get_dashboard_data():
    """
    Single endpoint that returns all data needed to render the dashboard.
    Batching into one call reduces network round-trips.

    Returns:
        dict: summary_cards, low_stock_items, chart_data
    """
    return {
        "summary_cards": get_maintenance_summary(),
        "low_stock_items": get_low_stock_items(),
        "chart_data": get_request_trend(),
    }


def get_maintenance_summary():
    """Count open Maintenance Requests grouped by priority."""
    rows = frappe.db.sql(
        """
        SELECT priority, COUNT(name) AS count
        FROM `tabMaintenance Request`
        WHERE docstatus = 1
          AND status IN ('Open', 'In Progress')
        GROUP BY priority
        ORDER BY FIELD(priority, 'High', 'Medium', 'Low')
        """,
        as_dict=True,
    )
    # Return as a dict for easy JS access: { High: 3, Medium: 7, Low: 2 }
    return {row.priority: row.count for row in rows}


def get_low_stock_items(threshold_multiplier=1.0):
    """
    Return items where actual_qty <= re_order_qty.
    threshold_multiplier=1.0 means 'at or below re-order level'.
    """
    return frappe.db.sql(
        """
        SELECT
            b.item_code,
            i.item_name,
            b.warehouse,
            b.actual_qty,
            i.reorder_level
        FROM `tabBin` b
        JOIN `tabItem` i ON i.name = b.item_code
        WHERE i.reorder_level > 0
          AND b.actual_qty <= i.reorder_level * %(multiplier)s
          AND i.disabled = 0
        ORDER BY (b.actual_qty / i.reorder_level) ASC
        LIMIT 15
        """,
        {"multiplier": threshold_multiplier},
        as_dict=True,
    )


def get_request_trend():
    """
    Count Maintenance Requests per day over the last 30 days, grouped by status.
    Returns chart-friendly labels and datasets.
    """
    from_date = add_days(today(), -30)

    rows = frappe.db.sql(
        """
        SELECT
            DATE(creation) AS day,
            status,
            COUNT(name) AS count
        FROM `tabMaintenance Request`
        WHERE creation >= %(from_date)s
        GROUP BY day, status
        ORDER BY day ASC
        """,
        {"from_date": from_date},
        as_dict=True,
    )

    # Build chart.js compatible structure
    days = sorted({str(r.day) for r in rows})
    statuses = ["Open", "In Progress", "Completed", "Cancelled"]
    colors = {"Open": "#5e64ff", "In Progress": "#f4a707", "Completed": "#28a745", "Cancelled": "#dc3545"}

    lookup = {(str(r.day), r.status): r.count for r in rows}

    datasets = [
        {
            "name": status,
            "values": [lookup.get((day, status), 0) for day in days],
            "chartType": "bar",
        }
        for status in statuses
    ]

    return {
        "labels": days,
        "datasets": datasets,
        "colors": [colors[s] for s in statuses],
    }
```

---

### Step 5: Write the JavaScript Page Controller

Add to `operations_dashboard.js`:

```javascript
/**
 * Operations Dashboard
 * A custom Frappe page showing live inventory and maintenance stats.
 */

frappe.pages['operations-dashboard'].on_page_load = function(wrapper) {
    // Create the page using Frappe's Page class
    let page = frappe.ui.make_app_page({
        parent: wrapper,
        title: 'Operations Dashboard',
        single_column: true,
    });

    // Add a refresh button in the toolbar
    page.add_action_item(__('Refresh'), () => load_dashboard());

    // Add a quick-create button group
    page.add_action_item(__('New Maintenance Request'), () => {
        frappe.new_doc('Maintenance Request');
    });

    // Build the page HTML skeleton
    $(wrapper).find('.page-content').html(`
        <div id="ops-dashboard" class="container-fluid mt-4">
            <!-- Summary Cards Row -->
            <div class="row mb-4" id="summary-cards">
                <div class="col-12">
                    <h5 class="text-muted">Open Maintenance Requests by Priority</h5>
                </div>
                <div class="col-md-4">
                    <div class="card border-danger shadow-sm">
                        <div class="card-body text-center">
                            <h6 class="card-subtitle text-danger mb-2">HIGH</h6>
                            <h2 id="card-high" class="text-danger">—</h2>
                        </div>
                    </div>
                </div>
                <div class="col-md-4">
                    <div class="card border-warning shadow-sm">
                        <div class="card-body text-center">
                            <h6 class="card-subtitle text-warning mb-2">MEDIUM</h6>
                            <h2 id="card-medium" class="text-warning">—</h2>
                        </div>
                    </div>
                </div>
                <div class="col-md-4">
                    <div class="card border-info shadow-sm">
                        <div class="card-body text-center">
                            <h6 class="card-subtitle text-info mb-2">LOW</h6>
                            <h2 id="card-low" class="text-info">—</h2>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Chart Row -->
            <div class="row mb-4">
                <div class="col-12">
                    <div class="card shadow-sm">
                        <div class="card-header"><strong>Maintenance Request Trend (Last 30 Days)</strong></div>
                        <div class="card-body">
                            <div id="trend-chart" style="height: 260px;"></div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Low Stock Table -->
            <div class="row">
                <div class="col-12">
                    <div class="card shadow-sm">
                        <div class="card-header d-flex justify-content-between align-items-center">
                            <strong>Low Stock Alerts</strong>
                            <a href="/stock-balance" class="btn btn-sm btn-outline-primary">
                                View Full Report
                            </a>
                        </div>
                        <div class="card-body p-0">
                            <table class="table table-hover mb-0" id="low-stock-table">
                                <thead class="thead-light">
                                    <tr>
                                        <th>Item</th>
                                        <th>Warehouse</th>
                                        <th>Current Qty</th>
                                        <th>Reorder Level</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody id="low-stock-body">
                                    <tr><td colspan="5" class="text-center text-muted">Loading…</td></tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `);

    // Load data on first render
    load_dashboard();


    function load_dashboard() {
        // Show a loading spinner in the summary cards
        ['card-high', 'card-medium', 'card-low'].forEach(id => {
            document.getElementById(id).textContent = '…';
        });

        frappe.call({
            method: 'erpnext.assets.page.operations_dashboard.operations_dashboard.get_dashboard_data',
            callback: function(r) {
                if (r.exc) return;
                const data = r.message;
                render_summary_cards(data.summary_cards);
                render_chart(data.chart_data);
                render_low_stock(data.low_stock_items);
            }
        });
    }


    function render_summary_cards(cards) {
        document.getElementById('card-high').textContent   = cards['High']   || 0;
        document.getElementById('card-medium').textContent = cards['Medium'] || 0;
        document.getElementById('card-low').textContent    = cards['Low']    || 0;
    }


    function render_chart(chart_data) {
        const container = document.getElementById('trend-chart');
        container.innerHTML = '';  // clear previous chart

        if (!chart_data.labels.length) {
            container.innerHTML = '<p class="text-center text-muted mt-4">No data for the last 30 days.</p>';
            return;
        }

        // frappe.Chart is a Frappe-bundled Chart.js wrapper
        new frappe.Chart(container, {
            type: 'bar',
            data: {
                labels: chart_data.labels,
                datasets: chart_data.datasets,
            },
            colors: chart_data.colors,
            barOptions: { stacked: true },
            height: 240,
            axisOptions: { xIsSeries: true },
        });
    }


    function render_low_stock(items) {
        const tbody = document.getElementById('low-stock-body');

        if (!items || !items.length) {
            tbody.innerHTML = '<tr><td colspan="5" class="text-center text-success">All items are above reorder level.</td></tr>';
            return;
        }

        tbody.innerHTML = items.map(item => {
            const pct = Math.round((item.actual_qty / item.reorder_level) * 100);
            const color = pct <= 25 ? 'text-danger font-weight-bold' : 'text-warning';
            return `
                <tr>
                    <td>
                        <a href="/app/item/${encodeURIComponent(item.item_code)}">
                            ${item.item_name}
                        </a>
                        <small class="text-muted d-block">${item.item_code}</small>
                    </td>
                    <td>${item.warehouse}</td>
                    <td class="${color}">${item.actual_qty}</td>
                    <td>${item.reorder_level}</td>
                    <td>
                        <button class="btn btn-xs btn-outline-secondary"
                            onclick="frappe.new_doc('Purchase Order')">
                            Reorder
                        </button>
                    </td>
                </tr>
            `;
        }).join('');
    }
};
```

---

### Step 6: Add the Page to Navigation

Add to the Workspace or Sidebar so users can find your page.

**Option A — Frappe Workspace UI (no code)**:
1. Go to **Settings > Workspace > Assets** (or create a new workspace)
2. Edit the workspace
3. Add a **Link** shortcut pointing to `/operations-dashboard`

**Option B — Module config (code)**:

Edit `erpnext/assets/config/assets.py`:

```python
{
    "label": _("Dashboards"),
    "items": [
        {
            "type": "page",
            "name": "operations-dashboard",
            "label": _("Operations Dashboard"),
            "description": _("Live overview of maintenance requests and stock alerts"),
        }
    ]
},
```

**Deploy**:

```bash
bench clear-cache
bench --site your-site-name migrate
bench build
```

Navigate to: `http://your-site/operations-dashboard`

---

### Step 7: Enhance — Add a Dialog for Quick Filters

Add this to your JS inside `on_page_load`, after `load_dashboard()`:

```javascript
// Filter button — lets user change the low-stock threshold
page.add_field({
    fieldtype: 'Float',
    fieldname: 'threshold',
    label: 'Low Stock Threshold (× reorder level)',
    default: 1.0,
    change: function() {
        const val = this.get_value() || 1.0;
        frappe.call({
            method: 'erpnext.assets.page.operations_dashboard.operations_dashboard.get_dashboard_data',
            args: { threshold: val },
            callback: r => {
                if (!r.exc) render_low_stock(r.message.low_stock_items);
            }
        });
    }
});
```

Then update the Python backend to accept and use `threshold`:

```python
@frappe.whitelist()
def get_dashboard_data(threshold=1.0):
    return {
        "summary_cards": get_maintenance_summary(),
        "low_stock_items": get_low_stock_items(threshold_multiplier=float(threshold)),
        "chart_data": get_request_trend(),
    }
```

---

## Expected Results

1. ✅ Navigating to `/operations-dashboard` shows the custom page
2. ✅ Summary cards display correct counts of open requests by priority
3. ✅ Bar chart renders the 30-day trend with stacked status bars
4. ✅ Low stock table shows items below reorder level with clickable item links
5. ✅ "Refresh" button reloads data without page reload
6. ✅ "New Maintenance Request" button opens the creation form directly
7. ✅ Threshold field lets you change the low-stock alert sensitivity

---

## Common Issues & Troubleshooting

### Issue 1: Blank Page / Page Not Found

```bash
bench --site your-site-name migrate
bench build
bench clear-cache
# Make sure page_name in JSON matches the directory name exactly
```

### Issue 2: `frappe.Chart is not a function`

Frappe bundles `frappe-charts`. Ensure you're using:
```javascript
new frappe.Chart(container, { ... })  // ✅
new Chart(container, { ... })         // ❌ — wrong global
```

### Issue 3: Python Method Not Called / Returns `undefined`

Check that `get_dashboard_data` is decorated with `@frappe.whitelist()` and that the `method` string in `frappe.call` exactly matches the dotted module path.

### Issue 4: Page Styles Look Broken

Frappe uses Bootstrap 4 classes. Make sure you're using Bootstrap 4 class names (e.g. `d-flex` not `flex`, `text-muted` not `text-secondary`).

---

## Verification Checklist

- [ ] Page JSON created with correct `page_name` and `roles`
- [ ] Python backend has `@frappe.whitelist()` on `get_dashboard_data`
- [ ] JS uses `frappe.ui.make_app_page()` to create the page object
- [ ] Summary cards update from Python data
- [ ] Chart renders using `frappe.Chart`
- [ ] Low stock table renders with correct colors for critical items
- [ ] Page accessible from navigation or URL
- [ ] Refresh button works without page reload

---

## Next Steps

1. **Auto-refresh**: Use `setInterval(() => load_dashboard(), 60000)` to poll every minute
2. **Drill-down**: Clicking a summary card filters the maintenance request list
3. **Export button**: Use `frappe.tools.downloadify()` to export low-stock table to CSV
4. **Notification badge**: Show pending count in the browser tab title with `document.title`

---

## Key Concepts Learned

- ✅ Frappe page structure: JSON metadata + Python backend + JS controller
- ✅ `frappe.pages['page-name'].on_page_load` — the entry point for page JS
- ✅ `frappe.ui.make_app_page()` — creates the page chrome (title, toolbar, content area)
- ✅ `page.add_action_item()` — adds buttons to the page toolbar
- ✅ Batching API calls into a single `get_dashboard_data()` to minimize round-trips
- ✅ `frappe.Chart` — built-in chart library for visualizations
- ✅ Dynamic HTML construction and DOM manipulation in Frappe pages
- ✅ Linking from page elements to doctype forms and list views
- ✅ Module config registration to add pages to the navigation sidebar
