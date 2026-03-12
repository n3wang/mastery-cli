# Exercise 1: Adding a Custom Field to Sales Order

## Objective

Learn how to customize an existing DocType by adding a custom field with validation logic on both the frontend and backend.

## Difficulty Level

Beginner (30-45 minutes)

## What You'll Learn

- How to modify a DocType's JSON schema
- How to add server-side validation in Python
- How to add client-side form behavior in JavaScript
- How to test your changes

## Prerequisites

- ERPNext development environment set up
- Basic understanding of Python and JavaScript
- Familiarity with JSON

## Exercise Description

You will add a **"Customer Priority"** field to the Sales Order form that allows users to mark orders as Low, Medium, High, or Critical priority. You'll also add validation to ensure Critical priority orders have a delivery date within 7 days.

## Step-by-Step Instructions

### Step 1: Locate the Sales Order DocType

Navigate to the Sales Order doctype directory:

```bash
cd erpnext/selling/doctype/sales_order/
```

You should see these files:
- `sales_order.json` - Form schema
- `sales_order.py` - Backend logic
- `sales_order.js` - Frontend logic
- `test_sales_order.py` - Tests

### Step 2: Add the Field to the JSON Schema

Open `sales_order.json`:

```bash
# View the file to understand its structure
cat sales_order.json | head -50
```

**Task**: Add a new field definition to the `fields` array in `sales_order.json`.

Find a good location in the fields array (after the `customer` field is a good spot) and add:

```json
{
    "fieldname": "customer_priority",
    "fieldtype": "Select",
    "label": "Customer Priority",
    "options": "Low\nMedium\nHigh\nCritical",
    "default": "Medium",
    "in_list_view": 0,
    "in_standard_filter": 1,
    "description": "Priority level for this sales order"
}
```

**Important**: Make sure the JSON is valid (proper commas between objects).

**How to edit**:
1. Use your preferred text editor or use the bench command:
   ```bash
   # Open in your editor
   nano sales_order.json
   # or
   vim sales_order.json
   ```

2. Find the `"fields"` array
3. Locate the customer field object
4. Add a comma after the customer field's closing `}`
5. Insert the new field definition above

### Step 3: Add Server-Side Validation

Open `sales_order.py`:

```bash
# View the file structure
head -100 sales_order.py
```

**Task**: Add validation logic to ensure Critical priority orders have a delivery date within 7 days.

Find the `validate()` method in the `SalesOrder` class. It should look something like:

```python
def validate(self):
    super().validate()
    # ... other validation code
```

Add this new validation method to the class:

```python
def validate_customer_priority(self):
    """Validate delivery date for critical priority orders"""
    from frappe.utils import add_days, getdate, today

    if self.customer_priority == "Critical":
        if not self.delivery_date:
            frappe.throw("Delivery Date is mandatory for Critical priority orders")

        max_delivery_date = add_days(today(), 7)
        if getdate(self.delivery_date) > getdate(max_delivery_date):
            frappe.throw(
                f"Critical priority orders must have delivery date within 7 days. "
                f"Maximum allowed date: {max_delivery_date}"
            )
```

Then call this method from the `validate()` method:

```python
def validate(self):
    super().validate()

    # Add this line
    self.validate_customer_priority()

    # ... rest of the validation code
```

**How to edit**:
1. Open `sales_order.py` in your editor
2. Scroll to the `SalesOrder` class definition
3. Find the `validate()` method
4. Add the call to `validate_customer_priority()`
5. Add the new `validate_customer_priority()` method below `validate()`

### Step 4: Add Client-Side Form Behavior

Open `sales_order.js`:

```bash
# View the file structure
head -100 sales_order.js
```

**Task**: Add JavaScript to highlight the priority field when "Critical" is selected.

Find or create the `frappe.ui.form.on('Sales Order', { ... })` block and add:

```javascript
frappe.ui.form.on('Sales Order', {
    customer_priority: function(frm) {
        // Highlight critical priority orders
        if (frm.doc.customer_priority === 'Critical') {
            frm.set_df_property('customer_priority', 'description',
                '<span style="color: red; font-weight: bold;">⚠️ Critical orders require delivery within 7 days!</span>');

            // Make delivery_date mandatory
            frm.set_df_property('delivery_date', 'reqd', 1);

            // Show a warning message
            if (!frm.doc.delivery_date) {
                frappe.msgprint({
                    title: 'Action Required',
                    indicator: 'red',
                    message: 'Please set a delivery date within 7 days for this critical order.'
                });
            }
        } else {
            // Reset description for non-critical
            frm.set_df_property('customer_priority', 'description', 'Priority level for this sales order');
        }
    },

    refresh: function(frm) {
        // Trigger priority validation on form load
        if (frm.doc.customer_priority) {
            frm.trigger('customer_priority');
        }
    }
});
```

**How to edit**:
1. Open `sales_order.js` in your editor
2. Find the existing `frappe.ui.form.on('Sales Order', {` block
3. Add the `customer_priority` and update the `refresh` event handlers
4. Make sure there are commas between event handlers

### Step 5: Clear Cache and Reload

After making changes to DocType files, you need to clear the cache:

```bash
# Navigate to your bench directory (parent of erpnext)
cd /path/to/your/bench

# Clear cache
bench clear-cache

# Reload the doctype
bench --site your-site-name migrate
```

### Step 6: Test Your Changes

#### Manual Testing:

1. Start your ERPNext instance:
   ```bash
   bench start
   ```

2. Open your browser and navigate to ERPNext

3. Go to **Selling > Sales Order > New**

4. Fill in basic fields (Customer, Items)

5. Test the priority field:
   - Select "Low" - should work normally
   - Select "Critical" - should show warning
   - Select "Critical" and try to save without delivery date - should show error
   - Select "Critical" with delivery date > 7 days - should show error
   - Select "Critical" with delivery date within 7 days - should save successfully

#### Automated Testing:

Add a test case to `test_sales_order.py`:

```python
def test_customer_priority_validation(self):
    """Test that critical priority orders require delivery within 7 days"""
    from frappe.utils import add_days, today

    so = make_sales_order(do_not_save=True)
    so.customer_priority = "Critical"

    # Should fail without delivery date
    so.delivery_date = None
    self.assertRaises(frappe.ValidationError, so.save)

    # Should fail with delivery date > 7 days
    so.delivery_date = add_days(today(), 10)
    self.assertRaises(frappe.ValidationError, so.save)

    # Should succeed with delivery date within 7 days
    so.delivery_date = add_days(today(), 5)
    so.save()
    self.assertEqual(so.customer_priority, "Critical")
```

Run the test:

```bash
bench --site your-site-name run-tests --module erpnext.selling.doctype.sales_order.test_sales_order
```

## Expected Results

After completing this exercise:

1. ✅ Sales Order form shows a new "Customer Priority" dropdown field
2. ✅ The field has options: Low, Medium, High, Critical
3. ✅ When "Critical" is selected, a warning message appears
4. ✅ Saving a Critical order without delivery date shows an error
5. ✅ Saving a Critical order with delivery date > 7 days shows an error
6. ✅ Saving a Critical order with delivery date ≤ 7 days succeeds
7. ✅ The field appears in standard filters for list view

## Common Issues & Troubleshooting

### Issue 1: Changes Not Visible

**Solution**: Clear cache and reload
```bash
bench clear-cache
bench --site your-site-name migrate
```

### Issue 2: JSON Syntax Error

**Solution**: Validate your JSON using a JSON validator or:
```bash
python -m json.tool sales_order.json
```

### Issue 3: Import Errors in Python

**Solution**: Make sure you have the correct imports at the top of `sales_order.py`:
```python
import frappe
from frappe import _
from frappe.utils import add_days, getdate, today
```

### Issue 4: JavaScript Not Loading

**Solution**: Build the JavaScript assets:
```bash
bench build
```

## Verification Checklist

- [ ] Field appears in Sales Order form
- [ ] Field has correct options (Low, Medium, High, Critical)
- [ ] Selecting "Critical" shows warning message
- [ ] Validation prevents saving Critical orders without delivery date
- [ ] Validation prevents saving Critical orders with delivery date > 7 days
- [ ] Validation allows saving Critical orders with delivery date ≤ 7 days
- [ ] Field appears in filters
- [ ] Tests pass

## Next Steps

After completing this exercise, try these variations:

1. **Add color coding**: Make the priority field background color change based on selection
2. **Add email notification**: Send email when Critical priority order is created
3. **Add dashboard**: Show count of Critical priority orders on Sales Order dashboard
4. **Add report**: Create a report showing all Critical priority orders

## Key Concepts Learned

- ✅ DocType JSON schema structure
- ✅ Field types and properties
- ✅ Server-side validation using Python
- ✅ Client-side form events using JavaScript
- ✅ frappe.throw() for validation errors
- ✅ frappe.msgprint() for user messages
- ✅ Form field manipulation using set_df_property()
- ✅ Cache management in Frappe
- ✅ Writing test cases

## Reference Files

- Schema: `erpnext/selling/doctype/sales_order/sales_order.json`
- Backend: `erpnext/selling/doctype/sales_order/sales_order.py`
- Frontend: `erpnext/selling/doctype/sales_order/sales_order.js`
- Tests: `erpnext/selling/doctype/sales_order/test_sales_order.py`

## Additional Resources

- [Frappe Field Types](https://frappeframework.com/docs/user/en/api/form)
- [Form Scripting Guide](https://frappeframework.com/docs/user/en/guides/app-development/form-scripts)
- [Controller Hooks](https://frappeframework.com/docs/user/en/api/document)
