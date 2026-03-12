# Exercise 3: Creating a Custom DocType from Scratch

## Objective

Learn how to build a complete new DocType — including schema, child table, Python controller, and JavaScript form behavior — by creating a **Maintenance Request** system.

## Difficulty Level

Intermediate (60-90 minutes)

## What You'll Learn

- How to design and create a new DocType with its JSON schema
- How to add a child table (linked DocType) for line items
- How to write a Python controller with lifecycle hooks (`validate`, `on_submit`, `on_cancel`)
- How to implement status transitions and business rules in Python
- How to add rich JavaScript form behavior (dynamic buttons, field toggling)
- How to register the DocType in a module config so it shows in the Desk

## Prerequisites

- Completed Exercise 1 and 2 (recommended)
- Comfort editing JSON, Python, and JavaScript files
- Understanding of Frappe's three-file DocType pattern (JSON, .py, .js)

## Exercise Description

You will build a **"Maintenance Request"** DocType that allows staff to log equipment or asset maintenance jobs. Each request tracks a list of tasks (child table), an assigned technician, status, and estimated/actual cost. You will enforce that a request cannot be submitted without at least one task, and you will add a custom "Mark Complete" button in the UI.

---

## Step-by-Step Instructions

### Step 1: Plan the Schema

Before writing code, plan the fields:

**Maintenance Request (parent DocType)**

| Field Name          | Field Type   | Notes                                        |
|---------------------|--------------|----------------------------------------------|
| `title`             | Data         | Short description, mandatory                 |
| `asset`             | Link         | Links to `Asset` doctype                     |
| `assigned_to`       | Link         | Links to `User`                              |
| `request_date`      | Date         | Defaults to today                            |
| `status`            | Select       | Draft / Open / In Progress / Completed / Cancelled |
| `priority`          | Select       | Low / Medium / High                          |
| `estimated_cost`    | Currency     |                                              |
| `actual_cost`       | Currency     | Set only on completion                       |
| `completion_date`   | Date         | Set only on completion                       |
| `notes`             | Text Editor  | Rich text notes                              |
| `tasks`             | Table        | Links to child DocType `Maintenance Task`    |

**Maintenance Task (child DocType)**

| Field Name    | Field Type | Notes                         |
|---------------|------------|-------------------------------|
| `task_name`   | Data       | Mandatory                     |
| `description` | Small Text |                               |
| `status`      | Select     | Pending / Done                |
| `time_taken`  | Float      | Hours spent                   |
| `cost`        | Currency   | Cost for this task            |

---

### Step 2: Create the Directory Structure

```bash
# Navigate to the assets module (or whichever module fits best)
cd erpnext/assets/doctype/

# Create directories for both DocTypes
mkdir -p maintenance_request
mkdir -p maintenance_task

# Verify
ls -la
```

---

### Step 3: Create the Child DocType — Maintenance Task

Create the JSON schema for the child table first, since the parent will reference it.

**File**: `erpnext/assets/doctype/maintenance_task/maintenance_task.json`

```bash
touch erpnext/assets/doctype/maintenance_task/maintenance_task.json
touch erpnext/assets/doctype/maintenance_task/maintenance_task.py
touch erpnext/assets/doctype/maintenance_task/__init__.py
```

Add to `maintenance_task.json`:

```json
{
    "actions": [],
    "creation": "2024-01-01 00:00:00.000000",
    "doctype": "DocType",
    "editable_grid": 1,
    "engine": "InnoDB",
    "field_order": [
        "task_name",
        "description",
        "status",
        "time_taken",
        "cost"
    ],
    "fields": [
        {
            "fieldname": "task_name",
            "fieldtype": "Data",
            "in_list_view": 1,
            "label": "Task Name",
            "reqd": 1
        },
        {
            "fieldname": "description",
            "fieldtype": "Small Text",
            "in_list_view": 1,
            "label": "Description"
        },
        {
            "fieldname": "status",
            "fieldtype": "Select",
            "in_list_view": 1,
            "label": "Status",
            "options": "Pending\nDone",
            "default": "Pending"
        },
        {
            "fieldname": "time_taken",
            "fieldtype": "Float",
            "in_list_view": 1,
            "label": "Time Taken (hrs)"
        },
        {
            "fieldname": "cost",
            "fieldtype": "Currency",
            "in_list_view": 1,
            "label": "Cost"
        }
    ],
    "index_web_pages_for_search": 1,
    "istable": 1,
    "links": [],
    "modified": "2024-01-01 00:00:00.000000",
    "modified_by": "Administrator",
    "module": "Assets",
    "name": "Maintenance Task",
    "owner": "Administrator",
    "permissions": [],
    "sort_field": "modified",
    "sort_order": "DESC"
}
```

**Key property**: `"istable": 1` marks this as a child table, not a standalone DocType. Child tables don't have their own list view or permissions — they live inside a parent.

Add to `maintenance_task.py`:

```python
# Copyright (c) 2024, Frappe Technologies Pvt. Ltd. and contributors
# For license information, please see license.txt

import frappe
from frappe.model.document import Document


class MaintenanceTask(Document):
    pass
```

---

### Step 4: Create the Parent DocType — Maintenance Request

**File**: `erpnext/assets/doctype/maintenance_request/maintenance_request.json`

```bash
touch erpnext/assets/doctype/maintenance_request/maintenance_request.json
touch erpnext/assets/doctype/maintenance_request/maintenance_request.py
touch erpnext/assets/doctype/maintenance_request/maintenance_request.js
touch erpnext/assets/doctype/maintenance_request/test_maintenance_request.py
touch erpnext/assets/doctype/maintenance_request/__init__.py
```

Add to `maintenance_request.json`:

```json
{
    "actions": [],
    "allow_import": 1,
    "autoname": "MR-.YYYY.-.#####",
    "creation": "2024-01-01 00:00:00.000000",
    "doctype": "DocType",
    "engine": "InnoDB",
    "field_order": [
        "title",
        "status",
        "priority",
        "column_break_1",
        "asset",
        "assigned_to",
        "request_date",
        "section_break_cost",
        "estimated_cost",
        "actual_cost",
        "completion_date",
        "section_break_tasks",
        "tasks",
        "section_break_notes",
        "notes"
    ],
    "fields": [
        {
            "fieldname": "title",
            "fieldtype": "Data",
            "label": "Title",
            "reqd": 1,
            "in_list_view": 1,
            "in_standard_filter": 1
        },
        {
            "fieldname": "status",
            "fieldtype": "Select",
            "label": "Status",
            "options": "Draft\nOpen\nIn Progress\nCompleted\nCancelled",
            "default": "Draft",
            "in_list_view": 1,
            "in_standard_filter": 1,
            "read_only": 1
        },
        {
            "fieldname": "priority",
            "fieldtype": "Select",
            "label": "Priority",
            "options": "Low\nMedium\nHigh",
            "default": "Medium",
            "in_list_view": 1,
            "in_standard_filter": 1
        },
        {
            "fieldname": "column_break_1",
            "fieldtype": "Column Break"
        },
        {
            "fieldname": "asset",
            "fieldtype": "Link",
            "label": "Asset",
            "options": "Asset"
        },
        {
            "fieldname": "assigned_to",
            "fieldtype": "Link",
            "label": "Assigned To",
            "options": "User"
        },
        {
            "fieldname": "request_date",
            "fieldtype": "Date",
            "label": "Request Date",
            "default": "Today",
            "reqd": 1
        },
        {
            "fieldname": "section_break_cost",
            "fieldtype": "Section Break",
            "label": "Cost Details"
        },
        {
            "fieldname": "estimated_cost",
            "fieldtype": "Currency",
            "label": "Estimated Cost"
        },
        {
            "fieldname": "actual_cost",
            "fieldtype": "Currency",
            "label": "Actual Cost",
            "read_only": 1
        },
        {
            "fieldname": "completion_date",
            "fieldtype": "Date",
            "label": "Completion Date",
            "read_only": 1
        },
        {
            "fieldname": "section_break_tasks",
            "fieldtype": "Section Break",
            "label": "Tasks"
        },
        {
            "fieldname": "tasks",
            "fieldtype": "Table",
            "label": "Tasks",
            "options": "Maintenance Task"
        },
        {
            "fieldname": "section_break_notes",
            "fieldtype": "Section Break",
            "label": "Notes"
        },
        {
            "fieldname": "notes",
            "fieldtype": "Text Editor",
            "label": "Notes"
        }
    ],
    "index_web_pages_for_search": 1,
    "is_submittable": 1,
    "links": [],
    "modified": "2024-01-01 00:00:00.000000",
    "modified_by": "Administrator",
    "module": "Assets",
    "name": "Maintenance Request",
    "naming_rule": "Expression (make_autoname)",
    "owner": "Administrator",
    "permissions": [
        {
            "create": 1,
            "delete": 1,
            "email": 1,
            "export": 1,
            "print": 1,
            "read": 1,
            "report": 1,
            "role": "System Manager",
            "share": 1,
            "submit": 1,
            "write": 1
        },
        {
            "create": 1,
            "email": 1,
            "export": 1,
            "print": 1,
            "read": 1,
            "report": 1,
            "role": "Maintenance User",
            "share": 1,
            "write": 1
        }
    ],
    "sort_field": "modified",
    "sort_order": "DESC",
    "states": []
}
```

**Key properties to understand**:
- `"autoname": "MR-.YYYY.-.#####"` — auto-generates names like `MR-2024-00001`
- `"is_submittable": 1` — enables the Submit/Cancel workflow (docstatus 0=draft, 1=submitted, 2=cancelled)
- `"istable": 0` (default) — this is a standalone DocType with its own list view
- `"Column Break"` and `"Section Break"` fieldtypes control form layout (they're invisible layout markers)

---

### Step 5: Write the Python Controller

Add to `maintenance_request.py`:

```python
# Copyright (c) 2024, Frappe Technologies Pvt. Ltd. and contributors
# For license information, please see license.txt

import frappe
from frappe import _
from frappe.model.document import Document
from frappe.utils import today


class MaintenanceRequest(Document):

    def validate(self):
        self.validate_tasks()
        self.calculate_actual_cost()

    def on_submit(self):
        """Called when the document is submitted (docstatus changes to 1)."""
        self.db_set("status", "Open")
        self.notify_assigned_technician()

    def on_cancel(self):
        """Called when the document is cancelled (docstatus changes to 2)."""
        self.db_set("status", "Cancelled")

    def validate_tasks(self):
        """Ensure at least one task exists before submitting."""
        if self.docstatus == 1 and not self.tasks:
            frappe.throw(
                _("Please add at least one Task before submitting the Maintenance Request.")
            )

    def calculate_actual_cost(self):
        """Sum costs from all task rows into actual_cost."""
        total = sum(task.cost or 0 for task in self.tasks)
        self.actual_cost = total

    def notify_assigned_technician(self):
        """Send an email notification to the assigned technician."""
        if not self.assigned_to:
            return

        user_email = frappe.db.get_value("User", self.assigned_to, "email")
        if not user_email:
            return

        frappe.sendmail(
            recipients=[user_email],
            subject=f"Maintenance Request Assigned: {self.name}",
            message=f"""
                <p>Hello,</p>
                <p>A maintenance request has been assigned to you:</p>
                <ul>
                    <li><strong>Request:</strong> {self.name}</li>
                    <li><strong>Title:</strong> {self.title}</li>
                    <li><strong>Priority:</strong> {self.priority}</li>
                    <li><strong>Asset:</strong> {self.asset or 'N/A'}</li>
                </ul>
                <p>Please review and begin work at your earliest convenience.</p>
            """,
        )


@frappe.whitelist()
def mark_complete(docname):
    """
    Whitelisted method called by the 'Mark Complete' button.
    Sets status to Completed and records the completion date.
    """
    doc = frappe.get_doc("Maintenance Request", docname)

    if doc.docstatus != 1:
        frappe.throw(_("Only submitted requests can be marked as complete."))

    if doc.status == "Completed":
        frappe.throw(_("This request is already completed."))

    # Mark all tasks as Done
    for task in doc.tasks:
        task.status = "Done"

    doc.db_set("status", "Completed")
    doc.db_set("completion_date", today())
    doc.save()

    return {"status": "Completed", "completion_date": today()}
```

**Key concepts in this controller**:

- `validate()` runs on every save — good for data integrity checks
- `on_submit()` runs once when docstatus goes 0→1 — use for triggering downstream actions
- `on_cancel()` runs once when docstatus goes 1→2 — use for reversal logic
- `db_set()` writes a single field directly to DB without triggering a full document save cycle (efficient for status updates)
- `@frappe.whitelist()` on `mark_complete` exposes it as a callable API endpoint from JavaScript

---

### Step 6: Write the JavaScript Form Controller

Add to `maintenance_request.js`:

```javascript
// Copyright (c) 2024, Frappe Technologies Pvt. Ltd. and contributors
// For license information, please see license.txt

frappe.ui.form.on('Maintenance Request', {

    refresh: function(frm) {
        // Show "Mark Complete" button only on submitted, non-completed requests
        if (frm.doc.docstatus === 1 && frm.doc.status !== 'Completed' && frm.doc.status !== 'Cancelled') {
            frm.add_custom_button(__('Mark Complete'), function() {
                frappe.confirm(
                    __('Mark this maintenance request as completed?'),
                    function() {
                        // Confirmed - call the Python method
                        frappe.call({
                            method: 'erpnext.assets.doctype.maintenance_request.maintenance_request.mark_complete',
                            args: { docname: frm.doc.name },
                            callback: function(r) {
                                if (!r.exc) {
                                    frappe.show_alert({
                                        message: __('Request marked as complete'),
                                        indicator: 'green'
                                    });
                                    frm.reload_doc();
                                }
                            }
                        });
                    }
                );
            }, __('Actions'));
        }

        // Show a status indicator badge
        set_status_indicator(frm);

        // Toggle cost fields visibility
        toggle_cost_fields(frm);
    },

    status: function(frm) {
        set_status_indicator(frm);
        toggle_cost_fields(frm);
    },

    priority: function(frm) {
        // Warn on high priority
        if (frm.doc.priority === 'High') {
            frappe.show_alert({
                message: __('High priority — please assign a technician immediately.'),
                indicator: 'orange'
            });
        }
    },

    // Triggered when a task row's cost field changes — recalculate total
    'tasks.cost': function(frm) {
        let total = 0;
        (frm.doc.tasks || []).forEach(function(task) {
            total += task.cost || 0;
        });
        frm.set_value('actual_cost', total);
    }
});


function set_status_indicator(frm) {
    const colors = {
        'Draft': 'grey',
        'Open': 'blue',
        'In Progress': 'orange',
        'Completed': 'green',
        'Cancelled': 'red'
    };
    const color = colors[frm.doc.status] || 'grey';
    frm.page.set_indicator(frm.doc.status, color);
}


function toggle_cost_fields(frm) {
    // Show actual_cost and completion_date only when completed
    const is_completed = frm.doc.status === 'Completed';
    frm.set_df_property('actual_cost', 'hidden', !is_completed ? 1 : 0);
    frm.set_df_property('completion_date', 'hidden', !is_completed ? 1 : 0);
}
```

**JavaScript concepts used**:

- `frm.add_custom_button(label, fn, group)` — adds a button to the form toolbar
- `frappe.confirm(msg, fn)` — shows a yes/no dialog before proceeding
- `frappe.call({ method, args, callback })` — calls a `@frappe.whitelist()` Python method
- `frm.reload_doc()` — refreshes the form from the database after a change
- `frm.set_df_property(fieldname, property, value)` — modifies field display properties at runtime
- `frm.page.set_indicator(label, color)` — sets the colored badge in the form header

---

### Step 7: Write Automated Tests

Add to `test_maintenance_request.py`:

```python
# Copyright (c) 2024, Frappe Technologies Pvt. Ltd. and contributors
# For license information, please see license.txt

import frappe
from frappe.tests.utils import FrappeTestCase
from frappe.utils import today


class TestMaintenanceRequest(FrappeTestCase):

    def make_request(self, with_tasks=True):
        doc = frappe.get_doc({
            "doctype": "Maintenance Request",
            "title": "Test Request",
            "request_date": today(),
            "priority": "Medium",
        })
        if with_tasks:
            doc.append("tasks", {
                "task_name": "Check oil",
                "status": "Pending",
                "cost": 50.0,
            })
            doc.append("tasks", {
                "task_name": "Replace filter",
                "status": "Pending",
                "cost": 30.0,
            })
        doc.insert()
        return doc

    def test_actual_cost_calculation(self):
        """actual_cost should sum task costs automatically."""
        doc = self.make_request()
        self.assertEqual(doc.actual_cost, 80.0)

    def test_submit_requires_tasks(self):
        """Submitting without tasks should raise a ValidationError."""
        doc = self.make_request(with_tasks=False)
        self.assertRaises(frappe.ValidationError, doc.submit)

    def test_submit_sets_status_open(self):
        """Status should become 'Open' after submit."""
        doc = self.make_request()
        doc.submit()
        self.assertEqual(doc.status, "Open")

    def test_cancel_sets_status_cancelled(self):
        """Status should become 'Cancelled' after cancel."""
        doc = self.make_request()
        doc.submit()
        doc.cancel()
        self.assertEqual(doc.status, "Cancelled")

    def test_mark_complete(self):
        """mark_complete() should set status to Completed and completion_date."""
        from erpnext.assets.doctype.maintenance_request.maintenance_request import mark_complete

        doc = self.make_request()
        doc.submit()

        result = mark_complete(doc.name)
        self.assertEqual(result["status"], "Completed")

        doc.reload()
        self.assertEqual(doc.status, "Completed")
        self.assertEqual(doc.completion_date, today())
```

Run the tests:

```bash
bench --site your-site-name run-tests \
  --module erpnext.assets.doctype.maintenance_request.test_maintenance_request
```

---

### Step 8: Register in Module Config

Add the DocType to the Assets module navigation by editing `erpnext/assets/config/assets.py`:

```python
# Find the get_data() function and add to the appropriate section:

{
    "label": _("Maintenance"),
    "items": [
        {
            "type": "doctype",
            "name": "Maintenance Request",
            "description": _("Track and manage asset maintenance jobs"),
            "onboard": 1,
        },
    ]
},
```

Then clear cache and migrate:

```bash
bench clear-cache
bench --site your-site-name migrate
bench build
```

---

## Expected Results

1. ✅ `Maintenance Request` appears in the Assets module navigation
2. ✅ Auto-naming generates IDs like `MR-2024-00001`
3. ✅ Creating a request and saving calculates `actual_cost` from task costs
4. ✅ Submitting without tasks throws a validation error
5. ✅ Submitting with tasks sets status to `Open` and sends email (if SMTP configured)
6. ✅ "Mark Complete" button appears on submitted, non-completed requests
7. ✅ Clicking "Mark Complete" → confirm → sets status to `Completed`, records date
8. ✅ Cancelling sets status to `Cancelled`
9. ✅ Priority "High" shows an orange alert
10. ✅ Cost fields hide/show based on completion status

---

## Common Issues & Troubleshooting

### Issue 1: DocType Not Appearing After Migration

```bash
bench clear-cache
bench --site your-site-name migrate
# Verify the JSON is valid:
python -m json.tool erpnext/assets/doctype/maintenance_request/maintenance_request.json
```

### Issue 2: `istable` Field Not Found on Child

The `options` of the parent `tasks` field must exactly match the `name` in the child DocType JSON (`"Maintenance Task"`). Casing matters.

### Issue 3: `@frappe.whitelist()` Method Not Found

The Python import path in `frappe.call` must be the full dotted module path:
```
erpnext.assets.doctype.maintenance_request.maintenance_request.mark_complete
```
It must match the actual file structure.

### Issue 4: Email Not Sending

In development, emails are printed to the console. Check:
```bash
tail -f sites/your-site-name/logs/frappe.log
```

---

## Verification Checklist

- [ ] Both DocType directories created with all required files
- [ ] `maintenance_task.json` has `"istable": 1`
- [ ] `maintenance_request.json` has `"is_submittable": 1`
- [ ] Autoname pattern generates correct IDs
- [ ] `validate()` calculates `actual_cost` correctly
- [ ] Submitting without tasks raises an error
- [ ] `on_submit` sets status to `Open`
- [ ] `on_cancel` sets status to `Cancelled`
- [ ] "Mark Complete" button visible on correct status
- [ ] `mark_complete()` sets Completed + date
- [ ] JavaScript status indicator changes color per status
- [ ] All 4 unit tests pass

---

## Next Steps

1. **Add file attachments**: Use `Attach` fieldtype to allow photos of the asset
2. **Add timeline tracking**: Log status changes with timestamps in a child table
3. **Add SLA tracking**: Warn when request has been Open for more than N days
4. **Dashboard**: Build a dashboard showing open/in-progress/completed counts
5. **List view customization**: Color-code rows by priority in list view

---

## Key Concepts Learned

- ✅ DocType JSON schema: fields, permissions, autoname, is_submittable
- ✅ Child table DocTypes (`istable: 1`) and `Table` fieldtype in parent
- ✅ Form layout with Column Break and Section Break
- ✅ Python controller lifecycle hooks: validate, on_submit, on_cancel
- ✅ `db_set()` for efficient single-field updates
- ✅ `@frappe.whitelist()` to expose Python methods to the frontend
- ✅ `frappe.call()` in JavaScript to invoke whitelisted methods
- ✅ Custom buttons, confirm dialogs, and status indicators in forms
- ✅ Child table field event handlers in JavaScript (`'tasks.cost'`)
- ✅ Writing FrappeTestCase unit tests with document lifecycle

---

## File Structure Summary

```
erpnext/assets/doctype/
├── maintenance_task/
│   ├── __init__.py
│   ├── maintenance_task.json       # Child DocType schema (istable: 1)
│   └── maintenance_task.py        # Minimal controller
└── maintenance_request/
    ├── __init__.py
    ├── maintenance_request.json    # Parent DocType schema (is_submittable: 1)
    ├── maintenance_request.py      # Controller: validate, on_submit, on_cancel
    ├── maintenance_request.js      # Form: custom button, field toggling, events
    └── test_maintenance_request.py # Unit tests for all business rules
```
