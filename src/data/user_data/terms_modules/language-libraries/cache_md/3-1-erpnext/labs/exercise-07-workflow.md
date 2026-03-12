# Exercise 7: Building a Document Approval Workflow

## Objective

Learn how to design and implement a multi-step approval workflow using Frappe's Workflow system — covering states, transitions, role-based actions, email alerts, and programmatic interaction. You will build a **Purchase Order Approval** workflow with a manager approval step for orders above a threshold.

## Difficulty Level

Intermediate (60-75 minutes)

## What You'll Learn

- The difference between Frappe Workflows and simple field-based status tracking
- How to create Workflow States and define allowed transitions
- How to restrict transitions by role
- How to send automatic email notifications on state changes
- How to interact with workflows from Python code and `frappe.call()` hooks
- How to customize the form toolbar based on workflow state

## Prerequisites

- Completed Exercise 1 (understanding DocTypes and form JS)
- Familiarity with ERPNext's Buying module (Purchase Orders)
- Understanding of ERPNext roles and permissions

## Exercise Description

The default Purchase Order flow in ERPNext goes directly from Draft → Submit. You will add a **procurement approval gate** so that:

1. When a Draft Purchase Order is ready for review, the buyer clicks **"Submit for Approval"**
2. The order enters a **"Pending Approval"** state
3. A Purchase Manager reviews it and either clicks **"Approve"** or **"Reject"**
4. On Approve → the PO moves to **"Approved"** state and can be submitted (docstatus=1)
5. On Reject → it returns to **"Needs Revision"** with a rejection note
6. Orders below the threshold skip manager approval entirely

---

## Step-by-Step Instructions

### Step 1: Understand Frappe Workflows

A Frappe Workflow is a separate document (DocType: `Workflow`) that attaches to a target DocType. It:

- Adds a `workflow_state` field to the target document (hidden from schema but visible in the form)
- Replaces the standard Save/Submit/Cancel buttons with workflow action buttons
- Enforces that transitions can only happen if the current user has the required role
- Optionally sends email notifications on transitions

Workflows are configured entirely through the UI or fixtures — you do **not** modify the target DocType's controller.

---

### Step 2: Create the Workflow via the UI

Go to **Settings > Workflow > New Workflow**:

**Workflow Settings:**

| Setting                  | Value                |
|--------------------------|----------------------|
| Workflow Name            | Purchase Order Approval |
| Document Type            | Purchase Order       |
| Is Active                | ✅                   |
| Override Status          | ✅                   |
| Send Email Alerts        | ✅                   |
| Workflow State Field Name| `custom_workflow_state` |

> Note: The "Workflow State Field Name" is a custom field that Frappe creates on the target DocType. Name it something distinct from ERPNext's built-in `status` field.

**Workflow States** (add these in the States table):

| State            | Doc Status | Style    | Allow Edit | Allow Delete |
|------------------|------------|----------|------------|--------------|
| Draft            | Draft (0)  | Primary  | ✅         | ✅           |
| Pending Approval | Draft (0)  | Warning  |            |              |
| Needs Revision   | Draft (0)  | Danger   | ✅         |              |
| Approved         | Draft (0)  | Success  |            |              |
| Submitted        | Submitted (1)| Success|            |              |
| Rejected         | Cancelled (2)| Danger |            |              |

**Workflow Transitions** (add these in the Transitions table):

| Action              | From State       | To State         | Allowed Roles         | Condition                         |
|---------------------|------------------|------------------|-----------------------|-----------------------------------|
| Submit for Approval | Draft            | Pending Approval | Purchase User         | `doc.grand_total > 0`            |
| Approve             | Pending Approval | Approved         | Purchase Manager      |                                   |
| Reject              | Pending Approval | Needs Revision   | Purchase Manager      |                                   |
| Revise              | Needs Revision   | Draft            | Purchase User         |                                   |
| Submit Order        | Approved         | Submitted        | Purchase Manager      |                                   |
| Reject Final        | Approved         | Rejected         | Purchase Manager      |                                   |

Save the workflow.

---

### Step 3: Export the Workflow as a Fixture

Instead of always configuring through the UI, export it as a code fixture so it can be versioned and deployed with the app:

```bash
bench --site your-site-name export-fixtures
```

This creates JSON files in `erpnext/fixtures/`. Check:

```bash
ls erpnext/fixtures/
# You should see: Workflow Purchase Order Approval.json
```

Make sure `hooks.py` includes:

```python
fixtures = [
    {"dt": "Workflow", "filters": [["name", "=", "Purchase Order Approval"]]},
    {"dt": "Workflow State"},
    {"dt": "Workflow Action Master"},
]
```

Now the workflow will be installed automatically when `bench --site your-site-name import-fixtures` is run.

---

### Step 4: Add a Workflow Condition for Large Orders

The Condition field on a Transition is evaluated as a Python expression. You can use it to skip approval for small orders:

**Transition: Submit for Approval → Pending Approval (for large orders)**
```python
doc.grand_total >= 10000
```

**Add a second transition for small orders (auto-approve path):**

| Action              | From State | To State | Allowed Roles  | Condition              |
|---------------------|------------|----------|----------------|------------------------|
| Quick Submit        | Draft      | Approved | Purchase User  | `doc.grand_total < 10000` |

Now buyers can directly approve their own small orders, while large ones go through manager review.

---

### Step 5: Add Email Notifications

Go to **Settings > Notification > New Notification**:

**Notification 1 — Alert Manager on Pending Approval:**

| Setting          | Value                             |
|------------------|-----------------------------------|
| Name             | PO Pending Approval               |
| Document Type    | Purchase Order                    |
| Event            | Value Change                      |
| Value Changed    | custom_workflow_state              |
| Condition        | `doc.custom_workflow_state == "Pending Approval"` |
| Subject          | `Purchase Order Requires Approval: {{ doc.name }}` |
| Message          | (see below)                       |
| Recipients       | Role: Purchase Manager            |

**Message template** (Jinja2):

```html
<p>Hello,</p>
<p>Purchase Order <strong>{{ doc.name }}</strong> requires your approval.</p>
<table border="1" cellpadding="4" style="border-collapse:collapse">
    <tr><th>Supplier</th><td>{{ doc.supplier }}</td></tr>
    <tr><th>Grand Total</th><td>{{ doc.grand_total }} {{ doc.currency }}</td></tr>
    <tr><th>Order Date</th><td>{{ doc.transaction_date }}</td></tr>
    <tr><th>Created By</th><td>{{ doc.owner }}</td></tr>
</table>
<p>
    <a href="{{ frappe.utils.get_url() }}/app/purchase-order/{{ doc.name }}">
        Click here to review the order
    </a>
</p>
```

**Notification 2 — Notify Buyer on Rejection:**

| Setting    | Value                                              |
|------------|----------------------------------------------------|
| Condition  | `doc.custom_workflow_state == "Needs Revision"`    |
| Subject    | `Purchase Order Returned for Revision: {{ doc.name }}` |
| Recipients | Created By (Owner)                                 |

---

### Step 6: Interact with Workflows from Python

Sometimes you need to programmatically advance a workflow — for instance, an automated process that auto-approves orders that pass a compliance check.

```bash
bench --site your-site-name console
```

```python
import frappe
from frappe.model.workflow import apply_workflow

# Get a PO in Pending Approval state
po = frappe.get_doc("Purchase Order", "PUR-ORD-2024-00001")
print("Current state:", po.custom_workflow_state)

# Apply a workflow transition programmatically
# The user must have the required role for the transition
frappe.set_user("purchase.manager@example.com")
apply_workflow(po, "Approve")
print("New state:", po.custom_workflow_state)

# Fetch all pending approval POs
pending = frappe.get_all(
    "Purchase Order",
    filters={"custom_workflow_state": "Pending Approval", "docstatus": 0},
    fields=["name", "supplier", "grand_total", "owner"],
)
print(f"Pending approvals: {len(pending)}")
for p in pending:
    print(f"  {p.name} — {p.supplier} — {p.grand_total}")
```

---

### Step 7: Customize Form Buttons Based on Workflow State

You can add additional behavior in `purchase_order.js` to react to workflow state:

```javascript
// Add to the existing frappe.ui.form.on('Purchase Order', { ... }) block

refresh: function(frm) {
    const state = frm.doc.custom_workflow_state;

    // Show a rejection note field when returning for revision
    if (state === 'Needs Revision') {
        frm.dashboard.add_comment(
            'This order was returned for revision. Please update and resubmit.',
            'orange'
        );
    }

    // Show approval badge prominently
    if (state === 'Approved') {
        frm.dashboard.add_comment('This order is approved and ready to submit.', 'green');
    }

    // Add a custom "View Approval History" button
    if (['Pending Approval', 'Approved', 'Submitted'].includes(state)) {
        frm.add_custom_button(__('Approval History'), function() {
            frappe.route_options = {
                "reference_doctype": "Purchase Order",
                "reference_name": frm.doc.name
            };
            frappe.set_route('List', 'Workflow Action');
        }, __('View'));
    }
}
```

---

### Step 8: Add a Rejection Reason via Dialog

When a manager rejects, they should be able to provide a reason. Intercept the workflow action with a custom button:

```javascript
// Override the Reject workflow button with a custom dialog
// Place this inside the refresh event, after the default workflow buttons render

if (frm.doc.custom_workflow_state === 'Pending Approval' &&
    frappe.user.has_role('Purchase Manager')) {

    // Add a custom Reject button that opens a dialog for the reason
    frm.add_custom_button(__('Reject with Reason'), function() {
        let d = new frappe.ui.Dialog({
            title: __('Rejection Reason'),
            fields: [
                {
                    fieldname: 'reason',
                    fieldtype: 'Small Text',
                    label: __('Reason for Rejection'),
                    reqd: 1
                }
            ],
            primary_action_label: __('Reject'),
            primary_action: function(values) {
                // Save the reason to a custom field, then apply the workflow action
                frappe.call({
                    method: 'frappe.client.set_value',
                    args: {
                        doctype: 'Purchase Order',
                        name: frm.doc.name,
                        fieldname: 'custom_rejection_reason',  // add this field to the DocType
                        value: values.reason,
                    },
                    callback: function() {
                        frappe.call({
                            method: 'frappe.model.workflow.apply_workflow',
                            args: {
                                doc: frm.doc,
                                action: 'Reject',
                            },
                            callback: function() {
                                d.hide();
                                frm.reload_doc();
                                frappe.show_alert({ message: __('Order rejected'), indicator: 'red' });
                            }
                        });
                    }
                });
            }
        });
        d.show();
    }, __('Actions'));
}
```

---

### Step 9: Test the Full Workflow

#### Create a test Purchase Order:

```bash
bench --site your-site-name console
```

```python
import frappe

po = frappe.get_doc({
    "doctype": "Purchase Order",
    "supplier": "_Test Supplier",
    "schedule_date": frappe.utils.add_days(frappe.utils.today(), 7),
    "items": [{
        "item_code": "_Test Item",
        "qty": 100,
        "rate": 200,
        "schedule_date": frappe.utils.add_days(frappe.utils.today(), 7),
    }]
})
po.insert()
print(f"Created: {po.name}, State: {po.custom_workflow_state}")
# Expected: Draft
```

Then open the PO in the browser and:

1. Click **"Submit for Approval"** (as Purchase User) → state → `Pending Approval`
2. Log in as a Purchase Manager
3. Click **"Approve"** → state → `Approved`
4. Click **"Submit Order"** → state → `Submitted`, docstatus → 1
5. Verify email notifications were queued

---

## Expected Results

1. ✅ Workflow appears in Settings > Workflow list
2. ✅ Opening a Purchase Order shows workflow state indicator
3. ✅ "Submit for Approval" button appears for Purchase Users on Draft POs
4. ✅ After clicking, state becomes "Pending Approval"
5. ✅ Purchase Manager sees "Approve" and "Reject" buttons
6. ✅ Approving moves to "Approved", rejection moves to "Needs Revision"
7. ✅ Orders below threshold show "Quick Submit" bypassing manager approval
8. ✅ Email notification queued when state → "Pending Approval"
9. ✅ `apply_workflow()` works programmatically in the console

---

## Common Issues & Troubleshooting

### Issue 1: Workflow Actions Not Appearing

- Verify the Workflow is set to **Is Active = Yes**
- Check that the user's role matches the **Allowed Roles** on the transition
- Clear cache: `bench clear-cache`

### Issue 2: Condition Not Evaluated Correctly

Conditions use Python expressions. Test them in the console:

```python
doc = frappe.get_doc("Purchase Order", "PUR-ORD-2024-00001")
print(eval("doc.grand_total >= 10000", {"doc": doc}))
```

### Issue 3: Email Not Sending After State Change

- Check Notification is set to **Event: Value Change** on the correct field
- Verify Email Queue for queued messages: `frappe.get_all("Email Queue", limit=5)`

### Issue 4: Workflow State Field Conflict

If `custom_workflow_state` conflicts with an existing field, change the **Workflow State Field Name** in the Workflow settings and clear cache.

---

## Verification Checklist

- [ ] Workflow created with all 6 states defined
- [ ] All 6 transitions defined with correct roles
- [ ] Condition `doc.grand_total < 10000` skips approval for small orders
- [ ] Fixture exported and listed in `hooks.py` fixtures
- [ ] Email notifications configured for Pending Approval and Needs Revision
- [ ] Form JS adds appropriate dashboard messages per state
- [ ] Rejection dialog captures reason before applying workflow action
- [ ] Full workflow cycle tested: Draft → Pending → Approved → Submitted
- [ ] `apply_workflow()` tested programmatically in console

---

## Next Steps

1. **SLA enforcement**: Add a scheduler task that auto-escalates orders stuck in Pending Approval for >48 hours
2. **Approval delegation**: Allow managers to delegate approval rights temporarily
3. **Multi-level approval**: Add a CFO approval step for orders above $50,000
4. **Audit trail**: Use the Exercise 6 hook pattern to log every state change in a custom table

---

## Key Concepts Learned

- ✅ Frappe Workflow: States, Transitions, Allowed Roles, Conditions
- ✅ Doc Status alignment: Draft=0, Submitted=1, Cancelled=2 and how states map to them
- ✅ Condition expressions on transitions — Python eval in workflow context
- ✅ Frappe Notifications: triggering on field value change with Jinja2 templates
- ✅ `frappe.model.workflow.apply_workflow()` — programmatic workflow control
- ✅ `frappe.ui.Dialog` — custom dialog forms in JavaScript
- ✅ `frm.dashboard.add_comment()` — contextual messages in form header
- ✅ Fixture export/import — versioning workflows as code
- ✅ Role-based UI customization in `refresh` event
