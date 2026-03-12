# Exercise 2: Creating a Custom Sales Report

## Objective

Learn how to create a custom query report from scratch that displays sales data with filters and formatting.

## Difficulty Level

Beginner (45-60 minutes)

## What You'll Learn

- How to create a new Report doctype
- How to write SQL queries for reports
- How to add filters to reports
- How to format report columns
- How to add charts to reports

## Prerequisites

- Completed Exercise 1 or familiar with ERPNext structure
- Basic SQL knowledge
- Understanding of Python dictionaries and lists

## Exercise Description

You will create a **"Customer Sales Summary"** report that shows total sales by customer with filtering options by date range and customer group. The report will include a bar chart visualization.

## Step-by-Step Instructions

### Step 1: Create the Report Directory Structure

Navigate to the Selling module and create the report structure:

```bash
# Navigate to selling module
cd erpnext/selling/report/

# Create the report directory
mkdir -p customer_sales_summary

# Navigate into the report directory
cd customer_sales_summary
```

### Step 2: Create the Report Metadata File

Create `customer_sales_summary.json`:

```bash
# Create the JSON file
touch customer_sales_summary.json
```

**Task**: Add the following content to `customer_sales_summary.json`:

```json
{
    "add_total_row": 1,
    "columns": [],
    "creation": "2024-01-01 00:00:00.000000",
    "disable_prepared_report": 0,
    "disabled": 0,
    "docstatus": 0,
    "doctype": "Report",
    "idx": 0,
    "is_standard": "Yes",
    "modified": "2024-01-01 00:00:00.000000",
    "modified_by": "Administrator",
    "module": "Selling",
    "name": "Customer Sales Summary",
    "owner": "Administrator",
    "ref_doctype": "Sales Order",
    "report_name": "Customer Sales Summary",
    "report_type": "Script Report",
    "roles": [
        {
            "role": "Sales User"
        },
        {
            "role": "Sales Manager"
        }
    ]
}
```

**How to edit**:
```bash
nano customer_sales_summary.json
# or
vim customer_sales_summary.json
```

**Key fields explained**:
- `ref_doctype`: The main doctype this report is based on
- `report_type`: "Script Report" means it uses Python/SQL
- `module`: Which module this report belongs to
- `is_standard`: "Yes" means it's part of the app (not user-created)
- `roles`: Who can access this report

### Step 3: Create the Python Report Logic

Create `customer_sales_summary.py`:

```bash
touch customer_sales_summary.py
```

**Task**: Add the following code to `customer_sales_summary.py`:

```python
# Copyright (c) 2024, Frappe Technologies Pvt. Ltd. and contributors
# For license information, please see license.txt

import frappe
from frappe import _


def execute(filters=None):
    """
    Main entry point for the report.
    Returns: columns, data, message, chart
    """
    columns = get_columns()
    data = get_data(filters)
    chart = get_chart_data(data)

    return columns, data, None, chart


def get_columns():
    """
    Define the columns for the report.
    Each column is a dictionary with label, fieldname, fieldtype, and options.
    """
    return [
        {
            "label": _("Customer"),
            "fieldname": "customer",
            "fieldtype": "Link",
            "options": "Customer",
            "width": 200
        },
        {
            "label": _("Customer Name"),
            "fieldname": "customer_name",
            "fieldtype": "Data",
            "width": 180
        },
        {
            "label": _("Customer Group"),
            "fieldname": "customer_group",
            "fieldtype": "Link",
            "options": "Customer Group",
            "width": 150
        },
        {
            "label": _("Territory"),
            "fieldname": "territory",
            "fieldtype": "Link",
            "options": "Territory",
            "width": 120
        },
        {
            "label": _("Total Orders"),
            "fieldname": "total_orders",
            "fieldtype": "Int",
            "width": 120
        },
        {
            "label": _("Total Amount"),
            "fieldname": "total_amount",
            "fieldtype": "Currency",
            "width": 150
        },
        {
            "label": _("Average Order Value"),
            "fieldname": "avg_order_value",
            "fieldtype": "Currency",
            "width": 150
        }
    ]


def get_data(filters):
    """
    Fetch and return the report data based on filters.
    """
    conditions = get_conditions(filters)

    data = frappe.db.sql("""
        SELECT
            so.customer,
            so.customer_name,
            c.customer_group,
            c.territory,
            COUNT(so.name) as total_orders,
            SUM(so.grand_total) as total_amount,
            AVG(so.grand_total) as avg_order_value
        FROM
            `tabSales Order` so
        LEFT JOIN
            `tabCustomer` c ON so.customer = c.name
        WHERE
            so.docstatus = 1
            {conditions}
        GROUP BY
            so.customer
        ORDER BY
            total_amount DESC
    """.format(conditions=conditions), filters, as_dict=1)

    return data


def get_conditions(filters):
    """
    Build SQL WHERE conditions from filters.
    """
    conditions = []

    if filters.get("from_date"):
        conditions.append("so.transaction_date >= %(from_date)s")

    if filters.get("to_date"):
        conditions.append("so.transaction_date <= %(to_date)s")

    if filters.get("customer"):
        conditions.append("so.customer = %(customer)s")

    if filters.get("customer_group"):
        conditions.append("c.customer_group = %(customer_group)s")

    if filters.get("territory"):
        conditions.append("c.territory = %(territory)s")

    return " AND " + " AND ".join(conditions) if conditions else ""


def get_chart_data(data):
    """
    Generate chart configuration for visualization.
    """
    if not data:
        return None

    # Limit to top 10 customers for chart readability
    chart_data = data[:10]

    return {
        "data": {
            "labels": [d.get("customer_name") for d in chart_data],
            "datasets": [
                {
                    "name": "Total Sales Amount",
                    "values": [d.get("total_amount") for d in chart_data]
                }
            ]
        },
        "type": "bar",
        "colors": ["#7cd6fd"],
        "barOptions": {
            "stacked": False
        }
    }
```

**Key functions explained**:
- `execute(filters)`: Main entry point, returns columns and data
- `get_columns()`: Defines report column structure
- `get_data(filters)`: Executes SQL query and returns results
- `get_conditions(filters)`: Builds dynamic WHERE clause from filters
- `get_chart_data(data)`: Generates chart visualization

### Step 4: Create the JavaScript Filter Interface

Create `customer_sales_summary.js`:

```bash
touch customer_sales_summary.js
```

**Task**: Add the following code to `customer_sales_summary.js`:

```javascript
// Copyright (c) 2024, Frappe Technologies Pvt. Ltd. and contributors
// For license information, please see license.txt

frappe.query_reports["Customer Sales Summary"] = {
    "filters": [
        {
            "fieldname": "from_date",
            "label": __("From Date"),
            "fieldtype": "Date",
            "default": frappe.datetime.add_months(frappe.datetime.get_today(), -1),
            "reqd": 1
        },
        {
            "fieldname": "to_date",
            "label": __("To Date"),
            "fieldtype": "Date",
            "default": frappe.datetime.get_today(),
            "reqd": 1
        },
        {
            "fieldname": "customer",
            "label": __("Customer"),
            "fieldtype": "Link",
            "options": "Customer"
        },
        {
            "fieldname": "customer_group",
            "label": __("Customer Group"),
            "fieldtype": "Link",
            "options": "Customer Group"
        },
        {
            "fieldname": "territory",
            "label": __("Territory"),
            "fieldtype": "Link",
            "options": "Territory"
        }
    ],

    "formatter": function(value, row, column, data, default_formatter) {
        value = default_formatter(value, row, column, data);

        // Highlight high-value customers (>100,000)
        if (column.fieldname == "total_amount" && data && data.total_amount > 100000) {
            value = `<span style="color: green; font-weight: bold;">${value}</span>`;
        }

        // Highlight customers with many orders (>10)
        if (column.fieldname == "total_orders" && data && data.total_orders > 10) {
            value = `<span style="color: blue; font-weight: bold;">${value}</span>`;
        }

        return value;
    },

    "onload": function(report) {
        // Add a custom button to export to Excel
        report.page.add_inner_button(__("Download Excel"), function() {
            frappe.msgprint(__("Exporting to Excel..."));
            // The export functionality is built-in to reports
        });
    }
};
```

**Key features explained**:
- `filters`: Define the filter fields shown in the report toolbar
- `formatter`: Custom formatting for specific columns (highlighting)
- `onload`: Add custom buttons or behaviors when report loads

### Step 5: Create the __init__.py File

Create an empty `__init__.py` to make it a Python module:

```bash
touch __init__.py
```

### Step 6: Register the Report

The report needs to be available in ERPNext's module configuration.

Edit `erpnext/selling/config/selling.py`:

```bash
# Navigate to config directory
cd ../../config/

# Edit selling.py
nano selling.py
```

**Task**: Find the "Reports" section and add your report:

```python
{
    "type": "report",
    "name": "Customer Sales Summary",
    "doctype": "Sales Order",
    "is_query_report": True
}
```

Add it to the list of reports under the appropriate category.

### Step 7: Install the Report

Clear cache and migrate to register the new report:

```bash
# Navigate back to bench directory
cd /path/to/your/bench

# Clear cache
bench clear-cache

# Migrate to install the report
bench --site your-site-name migrate

# Build assets
bench build
```

### Step 8: Test Your Report

#### Manual Testing:

1. Start ERPNext:
   ```bash
   bench start
   ```

2. Navigate to **Selling > Reports > Customer Sales Summary**

3. Test the filters:
   - Set date range (e.g., last 30 days)
   - Try filtering by customer group
   - Try filtering by territory
   - Clear filters and run report

4. Verify the results:
   - Check that customer data appears correctly
   - Verify totals are accurate
   - Check that the chart displays top 10 customers
   - Verify highlighting works for high-value customers

#### Test with Sample Data:

If you don't have data, create some test Sales Orders:

```bash
# Use bench console to create test data
bench --site your-site-name console
```

```python
# In the console
from frappe.utils import today, add_days
import frappe

# Create test sales orders
for i in range(5):
    so = frappe.get_doc({
        "doctype": "Sales Order",
        "customer": "_Test Customer",
        "transaction_date": today(),
        "delivery_date": add_days(today(), 7),
        "items": [{
            "item_code": "_Test Item",
            "qty": 10,
            "rate": 100
        }]
    })
    so.insert()
    so.submit()
    print(f"Created Sales Order: {so.name}")
```

### Step 9: Enhance the Report (Optional)

Try adding these enhancements:

#### Add a Summary Section:

Modify `get_data()` to add a summary row:

```python
def get_data(filters):
    conditions = get_conditions(filters)

    data = frappe.db.sql("""...""", filters, as_dict=1)

    # Add summary row
    if data:
        total_orders = sum(d.total_orders for d in data)
        total_amount = sum(d.total_amount for d in data)

        data.append({
            "customer": "TOTAL",
            "customer_name": "",
            "customer_group": "",
            "territory": "",
            "total_orders": total_orders,
            "total_amount": total_amount,
            "avg_order_value": total_amount / total_orders if total_orders else 0
        })

    return data
```

#### Add More Chart Types:

Add a pie chart option in `customer_sales_summary.js`:

```javascript
"onload": function(report) {
    report.page.add_inner_button(__("Show Pie Chart"), function() {
        // Switch to pie chart view
        report.chart_options.type = "pie";
        report.refresh();
    });
}
```

## Expected Results

After completing this exercise:

1. ✅ Report appears in Selling > Reports menu
2. ✅ Report displays customer sales data grouped by customer
3. ✅ Filters work correctly (date range, customer, customer group, territory)
4. ✅ Columns show: Customer, Name, Group, Territory, Total Orders, Total Amount, Average
5. ✅ Bar chart displays top 10 customers by sales amount
6. ✅ High-value customers are highlighted in green
7. ✅ Customers with many orders are highlighted in blue
8. ✅ Report can be exported to Excel/PDF

## Common Issues & Troubleshooting

### Issue 1: Report Not Visible in Menu

**Solution**:
```bash
# Clear cache and rebuild
bench clear-cache
bench build
# Reload the page
```

### Issue 2: SQL Error

**Solution**: Check your SQL syntax. Test the query directly:
```bash
bench --site your-site-name console
```
```python
import frappe
result = frappe.db.sql("YOUR QUERY HERE", as_dict=1)
print(result)
```

### Issue 3: No Data Showing

**Solution**:
- Verify you have submitted Sales Orders in the system
- Check date filters aren't excluding all data
- Verify `docstatus = 1` (submitted status)

### Issue 4: Chart Not Displaying

**Solution**: Check browser console for JavaScript errors. Ensure `get_chart_data()` returns proper format.

## Verification Checklist

- [ ] Report appears in Selling module reports
- [ ] Date filters work correctly
- [ ] Customer filter works
- [ ] Customer group filter works
- [ ] Territory filter works
- [ ] Data displays correctly in columns
- [ ] Totals row appears at bottom
- [ ] Chart displays top 10 customers
- [ ] High-value customers are highlighted
- [ ] Report can be exported
- [ ] No console errors

## Next Steps

After completing this exercise, try these variations:

1. **Add item-wise breakdown**: Show what items each customer purchased
2. **Add trends**: Show month-over-month growth
3. **Add profitability**: Include cost and profit margins
4. **Add comparisons**: Compare current period vs previous period
5. **Add drilldown**: Click on customer to see individual orders

## Key Concepts Learned

- ✅ Report directory structure
- ✅ Report metadata JSON configuration
- ✅ Writing SQL queries for reports
- ✅ Dynamic filter conditions
- ✅ Column definitions and formatting
- ✅ Chart generation and visualization
- ✅ Custom formatters for conditional styling
- ✅ Report filters and their types
- ✅ frappe.db.sql() usage
- ✅ Report lifecycle (execute function)

## File Structure Summary

Your completed report should have these files:

```
erpnext/selling/report/customer_sales_summary/
├── __init__.py
├── customer_sales_summary.json    # Report metadata
├── customer_sales_summary.py      # Report logic (SQL + data processing)
└── customer_sales_summary.js      # Filters and UI customization
```

## Reference Files

Study these existing reports for more examples:

- `erpnext/selling/report/sales_analytics/sales_analytics.py` - Complex analytics
- `erpnext/accounts/report/general_ledger/general_ledger.py` - Advanced filtering
- `erpnext/stock/report/stock_balance/stock_balance.py` - Inventory reporting

## Additional Resources

- [Frappe Report Documentation](https://frappeframework.com/docs/user/en/desk/reports)
- [Query Report Guide](https://frappeframework.com/docs/user/en/guides/reports-and-printing/query-report)
- [Chart.js Documentation](https://www.chartjs.org/docs/) - Used for charts in Frappe
