# ERPNext Architecture Documentation

## Overview

ERPNext is a comprehensive open-source ERP system built on top of the **Frappe Framework**. It follows a modular architecture with a modified MVC pattern, where business logic is organized into domain-specific modules (Accounts, Selling, Buying, Stock, etc.).

## Core Architecture Patterns

### 1. MVC Architecture

ERPNext implements a modified Model-View-Controller pattern:

- **Model Layer**: Doctypes (JSON schemas + Python classes)
- **View Layer**: Frappe's form system + Jinja2 templates
- **Controller Layer**: Python controller classes + JavaScript form controllers

### 2. Module-Based Organization

The application is organized into business domain modules:

```
erpnext/
├── accounts/        # Financial accounting & GL
├── selling/         # Sales operations
├── buying/          # Procurement
├── stock/           # Inventory management
├── manufacturing/   # Production planning
├── projects/        # Project management
├── crm/            # Customer relationship
├── setup/          # System configuration
└── [other modules]
```

## Directory Structure

### Module Structure

Each module follows a consistent structure:

```
module/
├── doctype/
│   └── doctype_name/
│       ├── doctype_name.json         # Schema & form definition
│       ├── doctype_name.py           # Backend business logic
│       ├── doctype_name.js           # Frontend form logic
│       ├── doctype_name_list.js      # List view customization
│       ├── test_doctype_name.py      # Test suite
│       └── test_records.json         # Test fixtures
├── report/
│   └── report_name/
│       ├── report_name.py            # Report query logic
│       └── report_name.js            # Report UI logic
├── utils.py                          # Module utilities
└── config.py                         # Navigation & menu config
```

### Key Directories

| Directory | Purpose |
|-----------|---------|
| `/controllers/` | Base controller classes (AccountsController, StockController, etc.) |
| `/public/js/` | Frontend JavaScript bundles and controllers |
| `/public/css/` | Stylesheets |
| `/templates/` | Jinja2 HTML templates |
| `/config/` | Module configuration files |
| `/patches/` | Database migration scripts |

## Doctypes: The Core Building Block

### What is a Doctype?

A Doctype (Document Type) is ERPNext's fundamental data structure, similar to a database table with associated business logic.

### Doctype Components

#### 1. JSON Schema (`doctype_name.json`)

Defines the form structure, fields, and metadata:

```json
{
  "name": "Sales Order",
  "module": "Selling",
  "is_submittable": 1,
  "fields": [
    {
      "fieldname": "customer",
      "fieldtype": "Link",
      "options": "Customer",
      "label": "Customer",
      "reqd": 1
    }
  ],
  "permissions": [
    {
      "role": "Sales User",
      "read": 1,
      "write": 1
    }
  ]
}
```

#### 2. Python Class (`doctype_name.py`)

Contains server-side business logic:

```python
from frappe.model.document import Document

class SalesOrder(SellingController):
    def validate(self):
        # Runs before save
        self.validate_delivery_date()
        super().validate()

    def on_submit(self):
        # Runs when document is submitted
        self.update_reserved_qty()
        self.create_gl_entries()

    def on_cancel(self):
        # Runs when document is cancelled
        self.reverse_gl_entries()
```

#### 3. JavaScript Controller (`doctype_name.js`)

Handles client-side form behavior:

```javascript
frappe.ui.form.on('Sales Order', {
    setup: function(frm) {
        // Initialize form
    },

    refresh: function(frm) {
        // Runs when form loads/refreshes
        if (frm.doc.docstatus === 1) {
            frm.add_custom_button('Create Delivery', () => {
                // Custom button logic
            });
        }
    },

    customer: function(frm) {
        // Runs when customer field changes
        frappe.call({
            method: 'get_customer_details',
            args: {customer: frm.doc.customer},
            callback: (r) => {
                frm.set_value('customer_name', r.message.customer_name);
            }
        });
    }
});
```

## Controller Hierarchy

ERPNext uses inheritance to share common business logic:

```
Document (Frappe base class)
  ├── TransactionBase
  │   ├── AccountsController
  │   │   ├── SellingController
  │   │   │   ├── SalesOrder
  │   │   │   ├── SalesInvoice
  │   │   │   └── Quotation
  │   │   └── BuyingController
  │   │       ├── PurchaseOrder
  │   │       └── PurchaseInvoice
  │   └── StockController
  │       ├── StockEntry
  │       └── DeliveryNote
  └── StatusUpdater
```

### Key Base Controllers

#### AccountsController
Located at: `erpnext/controllers/accounts_controller.py`

Provides common accounting logic:
- Tax calculations
- GL entry creation
- Currency conversions
- Payment term validation

#### SellingController
Provides sales-specific logic:
- Customer validation
- Sales pricing rules
- Commission calculations
- Sales target tracking

#### BuyingController
Provides procurement logic:
- Supplier validation
- Purchase pricing rules
- Purchase approval workflows

#### StockController
Provides inventory logic:
- Stock balance calculations
- Serial number/batch tracking
- Stock valuation

## Document Lifecycle Hooks

Documents follow a lifecycle with hooks at each stage:

```python
class MyDoctype(Document):
    def before_insert(self):
        # Before first save (creation)
        pass

    def validate(self):
        # Before every save
        pass

    def on_update(self):
        # After save to database
        pass

    def on_submit(self):
        # When document is submitted (finalized)
        pass

    def on_cancel(self):
        # When document is cancelled
        pass

    def on_trash(self):
        # Before deletion
        pass
```

## Frontend Architecture

### JavaScript Structure

ERPNext uses vanilla JavaScript with Frappe's built-in framework (no React/Vue in core).

#### Key Frontend Files

| File | Purpose |
|------|---------|
| `/public/js/erpnext.bundle.js` | Main application bundle |
| `/public/js/controllers/transaction.js` | Base transaction form controller |
| `/public/js/controllers/taxes_and_totals.js` | Tax calculation engine |
| `/public/js/utils/` | Shared utility functions |

#### Form Events

Forms use an event-driven architecture:

```javascript
frappe.ui.form.on('DocType Name', {
    // Form-level events
    setup: function(frm) {},
    refresh: function(frm) {},
    validate: function(frm) {},

    // Field-level events
    field_name: function(frm) {},

    // Child table events
    child_table_fieldname_add: function(frm, cdt, cdn) {},
    child_table_fieldname_remove: function(frm, cdt, cdn) {}
});
```

### Communication with Backend

Use `frappe.call()` for AJAX requests:

```javascript
frappe.call({
    method: 'erpnext.selling.doctype.sales_order.sales_order.make_delivery_note',
    args: {
        source_name: frm.doc.name
    },
    callback: function(r) {
        if (r.message) {
            frappe.model.sync(r.message);
            frappe.set_route('Form', r.message.doctype, r.message.name);
        }
    }
});
```

## Integration with Frappe Framework

### hooks.py - Central Configuration

Located at: `erpnext/hooks.py`

This file registers ERPNext with Frappe:

```python
# App metadata
app_name = "erpnext"
app_title = "ERPNext"

# Frontend bundles
app_include_js = "erpnext.bundle.js"
app_include_css = "erpnext.bundle.css"

# Document event hooks
doc_events = {
    "Sales Invoice": {
        "on_submit": ["erpnext.accounts.utils.update_gl_entries"],
        "on_cancel": ["erpnext.accounts.utils.cancel_gl_entries"]
    }
}

# Scheduler events (background jobs)
scheduler_events = {
    "daily": [
        "erpnext.support.doctype.issue.issue.auto_close_tickets"
    ],
    "hourly": [
        "erpnext.projects.doctype.project.project.hourly_reminder"
    ]
}
```

### Key Integration Points

1. **ORM**: Uses Frappe's ORM for database operations
2. **Authentication**: Leverages Frappe's user/role system
3. **Permissions**: Built on Frappe's permission framework
4. **Workflows**: Extends Frappe's workflow engine
5. **UI Components**: Uses Frappe's form/list/report views
6. **Background Jobs**: Utilizes Frappe's scheduler

## Data Flow Example: Creating a Sales Order

```
1. User fills form in browser
   ↓
2. JavaScript validates (sales_order.js)
   ↓
3. Form submitted via frappe.call()
   ↓
4. Python SalesOrder.validate() runs
   ↓
5. SellingController.validate() runs (parent class)
   ↓
6. AccountsController validates taxes
   ↓
7. Document saved to database
   ↓
8. User clicks "Submit"
   ↓
9. SalesOrder.on_submit() runs
   ↓
10. Stock quantities reserved
    ↓
11. GL entries created (if billing)
    ↓
12. Status updated, notifications sent
```

## Configuration Files

### Module Configuration (`config/module_name.py`)

Defines sidebar navigation:

```python
def get_data():
    return [
        {
            "label": "Documents",
            "items": [
                {
                    "type": "doctype",
                    "name": "Sales Order",
                    "description": "Sales orders from customers"
                }
            ]
        }
    ]
```

### patches.txt

Records database migrations for version upgrades:

```
erpnext.patches.v15_0.update_status_in_loan
erpnext.patches.v15_0.update_payment_terms_outstanding
```

## Reports

ERPNext supports multiple report types:

### 1. Query Reports

SQL-based reports with custom filters:

```python
# report_name.py
def execute(filters=None):
    columns = [
        {"label": "Customer", "fieldname": "customer", "fieldtype": "Link", "options": "Customer"},
        {"label": "Amount", "fieldname": "amount", "fieldtype": "Currency"}
    ]

    data = frappe.db.sql("""
        SELECT customer, SUM(grand_total) as amount
        FROM `tabSales Order`
        WHERE docstatus = 1
        GROUP BY customer
    """, as_dict=1)

    return columns, data
```

### 2. Script Reports

Python-based reports with complex logic:

```python
def execute(filters=None):
    columns = get_columns()
    data = get_data(filters)
    chart = get_chart_data(data)

    return columns, data, None, chart
```

## Best Practices

1. **Always extend base controllers** when creating transaction doctypes
2. **Use whitelisted methods** for API endpoints (`@frappe.whitelist()`)
3. **Implement proper validation** in both client and server side
4. **Write tests** for business logic (`test_doctype_name.py`)
5. **Follow naming conventions**: snake_case for Python, camelCase for JavaScript
6. **Use document hooks** instead of modifying core files
7. **Leverage inheritance** to avoid code duplication
8. **Cache frequently accessed data** using `frappe.cache()`

## Key Files to Study

To understand ERPNext architecture, study these files:

1. `erpnext/hooks.py` - App configuration
2. `erpnext/controllers/accounts_controller.py` - Core accounting logic
3. `erpnext/selling/doctype/sales_order/sales_order.py` - Example doctype
4. `erpnext/public/js/controllers/transaction.js` - Base form controller
5. `erpnext/public/js/controllers/taxes_and_totals.js` - Tax calculation

## Resources

- [Frappe Framework Documentation](https://frappeframework.com/docs)
- [ERPNext Documentation](https://docs.erpnext.com)
- [Frappe Developer API](https://frappeframework.com/docs/user/en/api)
