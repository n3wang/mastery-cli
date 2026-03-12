# Python and JavaScript Patterns Flashcards

#### Python @property Decorator for Computed Fields
The `@property` decorator allows you to create computed attributes that look like regular attributes but are calculated on access. Common in ERPNext controllers:

```python
class SalesOrder(Document):
    @property
    def total_qty(self):
        """Calculate total quantity across all items"""
        return sum(item.qty for item in self.items)

    @property
    def is_overdue(self):
        """Check if delivery is overdue"""
        from frappe.utils import getdate, today
        if self.delivery_date:
            return getdate(self.delivery_date) < getdate(today())
        return False

# Usage - looks like attribute access
so = frappe.get_doc("Sales Order", "SO-001")
print(so.total_qty)  # Calls the method
print(so.is_overdue)  # Calls the method

# Note: Cannot do so.total_qty = 10 (read-only)
```

Benefits:
- Clean API (no parentheses needed)
- Lazy calculation (only when accessed)
- Can't be accidentally overwritten

:p How does the @property decorator work and when should you use it in ERPNext?
??x
@property creates computed attributes that are calculated on access.

```python
class SalesOrder(Document):
    @property
    def total_qty(self):
        # Calculated each time accessed
        return sum(item.qty for item in self.items)

    @property
    def days_until_delivery(self):
        from frappe.utils import date_diff, today
        return date_diff(self.delivery_date, today())

# Usage - no parentheses
doc = frappe.get_doc("Sales Order", "SO-001")
qty = doc.total_qty  # Looks like attribute
days = doc.days_until_delivery
```

**When to use**:
- Derived/computed values (don't need storage)
- Read-only attributes
- Values that depend on other fields

**Benefits**: Clean syntax, lazy evaluation, can't be set accidentally
x??

---

#### List Comprehensions for Data Transformation
Python's list comprehensions provide concise syntax for transforming lists. Heavily used in ERPNext for processing child tables:

```python
# Get all item codes from items table
item_codes = [item.item_code for item in self.items]

# Get items with qty > 10
high_qty_items = [item for item in self.items if item.qty > 10]

# Calculate line totals
totals = [item.qty * item.rate for item in self.items]

# Extract specific fields
item_data = [
    {"code": item.item_code, "amount": item.amount}
    for item in self.items
]

# Filtering and transformation combined
valid_items = [
    item.item_code
    for item in self.items
    if item.qty > 0 and not item.is_cancelled
]

# Nested comprehension (avoid if too complex)
all_taxes = [
    tax.tax_amount
    for item in self.items
    for tax in item.item_taxes
]
```

**Equivalent to**:
```python
item_codes = []
for item in self.items:
    item_codes.append(item.item_code)
```

:p How and when should you use list comprehensions in ERPNext development?
??x
List comprehensions provide concise syntax for transforming/filtering lists.

**Basic transformation**:
```python
# Extract field values
item_codes = [item.item_code for item in self.items]

# Calculate values
totals = [item.qty * item.rate for item in self.items]
```

**With filtering**:
```python
# Get items with condition
valid = [item for item in self.items if item.qty > 0]

# Transform filtered items
amounts = [
    item.amount
    for item in self.items
    if not item.is_cancelled
]
```

**Dict comprehension**:
```python
# Create lookup dict
item_map = {
    item.item_code: item.rate
    for item in self.items
}
```

**When to use**: Child table processing, data extraction, filtering
**Avoid**: Complex nested comprehensions (use regular loops for readability)
x??

---

#### Python *args and **kwargs
Variable argument patterns for flexible function signatures. Used in Frappe hooks and callback systems:

```python
# *args - variable positional arguments
def process_items(*items):
    """Accept any number of items"""
    for item in items:
        print(item)

process_items("ITEM-1")
process_items("ITEM-1", "ITEM-2", "ITEM-3")

# **kwargs - variable keyword arguments
def create_doc(**fields):
    """Accept any number of field=value pairs"""
    doc = frappe.get_doc({
        "doctype": "Sales Order",
        **fields  # Unpack kwargs
    })
    return doc

so = create_doc(customer="CUST-001", delivery_date="2024-01-15")

# Combined usage
def frappe_call(method, *args, **kwargs):
    """
    args: positional arguments to method
    kwargs: keyword arguments to method
    """
    return method(*args, **kwargs)

# Real example from ERPNext
def make_mapped_doc(source_doctype, target_doctype, *args, **kwargs):
    """
    Flexible mapping function
    Can accept various optional parameters
    """
    pass
```

:p Explain *args and **kwargs in Python and their use cases in ERPNext.
??x
Variable-length argument syntax for flexible functions.

***args** (positional):
```python
def sum_all(*numbers):
    return sum(numbers)

sum_all(1, 2, 3)        # numbers = (1, 2, 3)
sum_all(1, 2, 3, 4, 5)  # numbers = (1, 2, 3, 4, 5)
```

****kwargs** (keyword):
```python
def create_doc(**fields):
    doc = frappe.get_doc({
        "doctype": "Sales Order",
        **fields  # Unpack
    })
    return doc

create_doc(customer="C1", date="2024-01-01")
# fields = {"customer": "C1", "date": "2024-01-01"}
```

**Combined**:
```python
def wrapper(method, *args, **kwargs):
    # Forward all arguments
    return method(*args, **kwargs)
```

**Use cases**: Wrappers, hooks, callbacks, flexible APIs
*args = tuple of positional, **kwargs = dict of keyword args
x??

---

#### JavaScript Object Destructuring
ES6 destructuring makes code cleaner when working with Frappe responses and form data:

```javascript
// Extract fields from frm.doc
const {customer, transaction_date, grand_total} = frm.doc;
console.log(customer, transaction_date);

// With renaming
const {customer: customerName, grand_total: total} = frm.doc;

// From API response
frappe.call({
    method: 'get_details',
    callback: function(r) {
        const {customer_name, territory, credit_limit} = r.message;
        frm.set_value('customer_name', customer_name);
        frm.set_value('territory', territory);
    }
});

// Array destructuring
const [first_item, second_item] = frm.doc.items;
console.log(first_item.item_code);

// Default values
const {customer, currency = 'USD'} = frm.doc;

// Nested destructuring
const {items: [{item_code}]} = frm.doc;  // First item's code

// Function parameters
function process_order({customer, items, grand_total}) {
    // Extract directly in parameter
    console.log(customer, grand_total);
}
process_order(frm.doc);
```

:p How does JavaScript object destructuring work and when is it useful in ERPNext development?
??x
Destructuring extracts values from objects/arrays with concise syntax.

**Object destructuring**:
```javascript
// Extract multiple fields
const {customer, grand_total, status} = frm.doc;

// With renaming
const {customer: cust, grand_total: total} = frm.doc;

// With defaults
const {currency = 'USD', exchange_rate = 1} = frm.doc;
```

**In callbacks**:
```javascript
frappe.call({
    callback: ({message}) => {
        // message extracted from r
        const {customer_name, territory} = message;
    }
});
```

**Array destructuring**:
```javascript
const [first, second] = frm.doc.items;
```

**Function params**:
```javascript
function update_totals({items, tax_rate}) {
    // Direct extraction
}
update_totals(frm.doc);
```

**Use cases**: API responses, form data access, cleaner code
x??

---

#### JavaScript Arrow Functions and This Context
Arrow functions have different `this` binding than regular functions. Important for Frappe event handlers:

```javascript
// Regular function - 'this' is dynamically scoped
frappe.ui.form.on('Sales Order', {
    refresh: function(frm) {
        // 'this' refers to the form object
        console.log(this);

        setTimeout(function() {
            // 'this' is now window/undefined (lost context)
            console.log(this);  // NOT the form
        }, 1000);
    }
});

// Arrow function - 'this' is lexically scoped
frappe.ui.form.on('Sales Order', {
    refresh: function(frm) {
        setTimeout(() => {
            // 'this' still refers to form (inherited from parent)
            console.log(this);
        }, 1000);
    }
});

// Practical example
frappe.ui.form.on('Sales Order', {
    customer: function(frm) {
        // Use arrow function in callback to maintain context
        frappe.call({
            method: 'get_customer_details',
            args: {customer: frm.doc.customer},
            callback: (r) => {
                // Can use frm here easily
                frm.set_value('territory', r.message.territory);
            }
        });
    }
});
```

:p Explain arrow functions vs regular functions in JavaScript, especially regarding 'this' binding.
??x
Arrow functions have lexical 'this' binding (inherit from parent scope).

**Regular function** - dynamic 'this':
```javascript
frappe.ui.form.on('Sales Order', {
    refresh: function(frm) {
        setTimeout(function() {
            // 'this' is NOT form anymore
            // Lost context
        }, 1000);
    }
});
```

**Arrow function** - lexical 'this':
```javascript
frappe.ui.form.on('Sales Order', {
    refresh: function(frm) {
        setTimeout(() => {
            // 'this' still refers to parent context
            // Context preserved
        }, 1000);
    }
});
```

**Practical use** in callbacks:
```javascript
customer: function(frm) {
    frappe.call({
        method: 'get_data',
        callback: (r) => {
            // Arrow function preserves frm access
            frm.set_value('field', r.message.value);
        }
    });
}
```

Arrow functions capture 'this' from surrounding scope.
x??

---

#### Python Dictionary get() with Default Values
Safe dictionary access with defaults. Prevents KeyError and reduces if checks:

```python
# Unsafe - raises KeyError if missing
value = my_dict["key"]

# Safe with get() - returns None if missing
value = my_dict.get("key")

# With default value
value = my_dict.get("key", "default_value")

# Common in Frappe filter handling
def execute(filters=None):
    filters = filters or {}

    # Safe access with defaults
    from_date = filters.get("from_date", "2024-01-01")
    to_date = filters.get("to_date", today())
    customer = filters.get("customer")  # None if not provided

    # Build conditions only if filter exists
    conditions = []
    if customer:
        conditions.append(f"customer = '{customer}'")

# Alternative: setdefault() - sets if missing
filters.setdefault("company", frappe.defaults.get_user_default("company"))

# Dictionary unpacking with defaults
def create_sales_order(**kwargs):
    defaults = {
        "transaction_date": today(),
        "delivery_date": add_days(today(), 7),
        "currency": "USD"
    }
    # Override defaults with provided kwargs
    defaults.update(kwargs)
    return frappe.get_doc({"doctype": "Sales Order", **defaults})
```

:p How do you safely access dictionary values with defaults in Python?
??x
Use dict.get() for safe access with fallback values.

**Basic get()**:
```python
# Returns None if missing (no KeyError)
value = my_dict.get("key")

# With default
value = my_dict.get("key", "default_value")

# vs unsafe access
value = my_dict["key"]  # KeyError if missing
```

**Common pattern** in filters:
```python
def execute(filters=None):
    filters = filters or {}

    # Safe with defaults
    from_date = filters.get("from_date", "2024-01-01")
    customer = filters.get("customer")  # None

    if customer:
        # Process only if provided
        pass
```

**setdefault()** - sets if missing:
```python
filters.setdefault("company", get_default_company())
# If "company" not in filters, sets it
```

**Benefits**: No KeyError, cleaner code, less if-checks
x??

---

#### Python fget/fset Pattern with frappe.utils
ERPNext utilities use getter/setter patterns for safe data conversion:

```python
from frappe.utils import flt, cint, cstr, getdate

# flt() - Float conversion with default
amount = flt(user_input)  # Returns 0.0 if invalid
amount = flt(user_input, 2)  # Round to 2 decimals
amount = flt("abc")  # Returns 0.0 (safe)

# cint() - Integer conversion
qty = cint(user_input)  # Returns 0 if invalid
qty = cint("10.5")  # Returns 10

# cstr() - String conversion
text = cstr(value)  # Handles None, numbers, etc.

# getdate() - Date conversion
from_date = getdate(filters.get("from_date"))  # Returns date object
# Handles: "2024-01-01", datetime, None

# Real example
def validate(self):
    # Safe numeric operations
    self.total_qty = flt(sum(flt(item.qty) for item in self.items))
    self.total_amount = flt(self.total_qty * flt(self.rate), 2)

    # Safe date comparison
    from frappe.utils import getdate, today
    if getdate(self.delivery_date) < getdate(today()):
        frappe.throw("Delivery date cannot be in the past")
```

Common utils:
- `flt()`: Float with precision
- `cint()`: Integer
- `cstr()`: String
- `getdate()`: Date
- `get_datetime()`: Datetime
- `today()`: Current date
- `now()`: Current datetime

:p What are frappe.utils conversion functions and why use them?
??x
Frappe provides safe type conversion utilities that handle invalid inputs gracefully.

**flt() - Float**:
```python
from frappe.utils import flt

amount = flt("123.45")     # 123.45
amount = flt("abc")        # 0.0 (safe, no error)
amount = flt("99.999", 2)  # 100.0 (rounded)
```

**cint() - Integer**:
```python
qty = cint("10")      # 10
qty = cint("10.8")    # 10 (truncated)
qty = cint("abc")     # 0 (safe)
```

**getdate() - Date**:
```python
date = getdate("2024-01-01")  # date object
date = getdate(None)          # None (safe)
```

**Why use**:
```python
# Unsafe
total = float(item.qty) * float(item.rate)  # Error if invalid

# Safe
total = flt(item.qty) * flt(item.rate)  # 0 if invalid
```

**Other utils**: cstr(), get_datetime(), today(), now(), add_days()
Prevents crashes from bad data.
x??

---

#### Python Super() for Controller Inheritance
Calling parent class methods in ERPNext's inheritance hierarchy. Essential for proper controller behavior:

```python
from erpnext.controllers.selling_controller import SellingController

class SalesOrder(SellingController):
    def validate(self):
        # MUST call parent validate first
        super().validate()  # Calls SellingController.validate()

        # Then add custom validation
        self.validate_delivery_date()
        self.check_credit_limit()

    def on_submit(self):
        # Parent handles GL entries, tax postings
        super().on_submit()

        # Then custom logic
        self.reserve_stock()
        self.send_notification()

    def calculate_taxes_and_totals(self):
        # Override but call parent for base calculation
        super().calculate_taxes_and_totals()

        # Add custom calculations
        self.calculate_loyalty_points()

# Without super() - parent logic is skipped!
class BadExample(SellingController):
    def validate(self):
        # BUG: SellingController.validate() never runs
        # Missing tax calculation, customer validation, etc.
        self.custom_validation()
```

**Call chain**:
```
SalesOrder.validate()
    → super().validate() → SellingController.validate()
        → super().validate() → AccountsController.validate()
            → super().validate() → TransactionBase.validate()
```

:p How and why should you use super() in ERPNext controller methods?
??x
super() calls the parent class method in inheritance hierarchy - CRITICAL in ERPNext.

**Proper usage**:
```python
class SalesOrder(SellingController):
    def validate(self):
        # Call parent FIRST
        super().validate()

        # Then custom logic
        self.custom_validation()

    def on_submit(self):
        super().on_submit()  # Parent creates GL entries
        self.reserve_stock()  # Custom logic
```

**Call chain**:
```
SalesOrder.validate()
  → super() → SellingController.validate()
    → super() → AccountsController.validate()
      → (tax calculation, etc.)
```

**Without super() - BROKEN**:
```python
def validate(self):
    # BUG: Parent logic skipped!
    # No tax calculation, no customer validation
    self.custom_check()
```

**Rule**: Always call super() in lifecycle hooks (validate, on_submit, on_cancel)
Ensures parent class logic executes (taxes, GL, stock, etc.)
x??

---

#### JavaScript Promises and Async/Await
Modern async patterns in Frappe JavaScript. Better than callback hell:

```javascript
// Old callback style
frappe.call({
    method: 'get_customer',
    callback: function(r1) {
        frappe.call({
            method: 'get_items',
            callback: function(r2) {
                frappe.call({
                    method: 'calculate_total',
                    callback: function(r3) {
                        // Callback hell!
                    }
                });
            }
        });
    }
});

// Promise-based
frappe.call({
    method: 'get_customer',
    args: {customer: 'CUST-001'}
}).then(r => {
    return frappe.call({
        method: 'get_items',
        args: {customer: r.message.name}
    });
}).then(r => {
    return frappe.call({
        method: 'calculate_total',
        args: {items: r.message}
    });
}).then(r => {
    console.log('Total:', r.message);
});

// Async/await - cleanest
frappe.ui.form.on('Sales Order', {
    customer: async function(frm) {
        try {
            // Sequential async calls
            const customer_data = await frappe.call({
                method: 'get_customer_details',
                args: {customer: frm.doc.customer}
            });

            frm.set_value('territory', customer_data.message.territory);

            const items = await frappe.call({
                method: 'get_default_items',
                args: {customer: frm.doc.customer}
            });

            frm.clear_table('items');
            items.message.forEach(item => {
                frm.add_child('items', item);
            });
            frm.refresh_field('items');
        } catch (error) {
            frappe.msgprint('Error: ' + error);
        }
    }
});
```

:p Explain promises and async/await in JavaScript for Frappe development.
??x
Modern async patterns to avoid callback hell in Frappe JavaScript.

**Old callback style**:
```javascript
frappe.call({
    method: 'get_data',
    callback: function(r) {
        // Nested callbacks = callback hell
        frappe.call({
            method: 'process',
            callback: function(r2) {
                // ...
            }
        });
    }
});
```

**Promise chaining**:
```javascript
frappe.call({method: 'step1'})
    .then(r => frappe.call({method: 'step2', args: {data: r.message}}))
    .then(r => console.log(r.message));
```

**Async/await** (cleanest):
```javascript
customer: async function(frm) {
    // Sequential async calls
    const r1 = await frappe.call({method: 'get_customer'});
    const r2 = await frappe.call({method: 'get_items'});

    frm.set_value('items', r2.message);
}
```

**Error handling**:
```javascript
try {
    const r = await frappe.call({method: 'may_fail'});
} catch (error) {
    frappe.msgprint('Error: ' + error);
}
```

async/await = cleaner, easier to read sequential async code.
x??

---

#### Python Comprehension with Conditional Expression
Combining list comprehensions with ternary operators for complex transformations:

```python
# Ternary operator (conditional expression)
status = "Active" if self.enabled else "Disabled"
value = x if x > 0 else 0  # Like: max(x, 0)

# In list comprehension - transformation
statuses = [
    "High" if item.qty > 100 else "Low"
    for item in self.items
]

# Complex example
processed_items = [
    {
        "item_code": item.item_code,
        "qty": item.qty,
        "status": "In Stock" if item.actual_qty > 0 else "Out of Stock",
        "priority": "High" if item.qty > item.reorder_level else "Normal"
    }
    for item in self.items
    if not item.is_cancelled  # Filter condition
]

# Multiple conditions
discounts = [
    item.amount * 0.2 if item.qty > 100
    else item.amount * 0.1 if item.qty > 50
    else 0
    for item in self.items
]

# Real ERPNext example
def get_item_tax_template(self):
    """Get tax template based on customer and item"""
    return [
        item.item_tax_template or customer_tax_template
        for item in self.items
    ]

# Equivalent verbose code
templates = []
for item in self.items:
    if item.item_tax_template:
        templates.append(item.item_tax_template)
    else:
        templates.append(customer_tax_template)
```

:p How do you use conditional expressions in list comprehensions?
??x
Combine ternary operator with list comprehensions for conditional transformations.

**Ternary operator**:
```python
value = x if condition else y

status = "Active" if enabled else "Disabled"
amount = value if value > 0 else 0
```

**In list comprehension**:
```python
# Transform with condition
statuses = [
    "High" if item.qty > 100 else "Low"
    for item in items
]

# Complex transformation
processed = [
    {
        "code": item.code,
        "status": "Available" if item.qty > 0 else "Out"
    }
    for item in items
    if not item.cancelled  # Filter
]
```

**Chained conditions**:
```python
priorities = [
    "Critical" if qty > 1000
    else "High" if qty > 100
    else "Normal"
    for qty in quantities
]
```

**Pattern**: `[expression if condition else alternative for item in list if filter]`
transformation + filtering in one line
x??

---

#### JavaScript Template Literals
Template literals (backticks) for string interpolation. Cleaner than concatenation:

```javascript
// Old string concatenation
let msg = "Order " + order_id + " for customer " + customer + " total: " + total;

// Template literal
let msg = `Order ${order_id} for customer ${customer} total: ${total}`;

// Multi-line strings
let html = `
    <div class="order-summary">
        <h3>Order ${frm.doc.name}</h3>
        <p>Customer: ${frm.doc.customer}</p>
        <p>Total: ${frm.doc.grand_total}</p>
    </div>
`;

// Expressions in templates
let status = `Status: ${frm.doc.docstatus === 1 ? 'Submitted' : 'Draft'}`;

// Function calls
let formatted = `Total: ${format_currency(frm.doc.grand_total, frm.doc.currency)}`;

// Real Frappe example
frappe.ui.form.on('Sales Order', {
    refresh: function(frm) {
        if (frm.doc.docstatus === 1) {
            frm.add_custom_button(__('Create Delivery'), () => {
                frappe.call({
                    method: `${frm.doc.doctype}.${frm.doc.name}.make_delivery_note`,
                    freeze: true,
                    freeze_message: `Creating delivery for ${frm.doc.name}...`,
                    callback: (r) => {
                        frappe.msgprint(`Delivery Note ${r.message} created`);
                    }
                });
            });
        }
    }
});
```

:p How do template literals work in JavaScript and when should you use them?
??x
Template literals use backticks for string interpolation with ${expression}.

**Basic interpolation**:
```javascript
// Old way
let msg = "Hello " + name + ", total: " + total;

// Template literal
let msg = `Hello ${name}, total: ${total}`;
```

**Multi-line**:
```javascript
let html = `
    <div>
        <h1>${title}</h1>
        <p>${description}</p>
    </div>
`;
```

**Expressions**:
```javascript
let status = `Status: ${doc.docstatus === 1 ? 'Submitted' : 'Draft'}`;
let total = `Total: ${qty * rate}`;
let formatted = `${format_currency(amount)}`;
```

**Frappe example**:
```javascript
frappe.msgprint(`
    Order ${frm.doc.name}
    Customer: ${frm.doc.customer}
    Total: ${frm.doc.grand_total}
`);

frappe.call({
    freeze_message: `Loading data for ${customer}...`
});
```

Cleaner than concatenation, supports multi-line, evaluates expressions.
x??

---

#### Python enumerate() for Index Access
Get both index and value when iterating. Essential for child table row numbers:

```python
# Without enumerate - manual counter
index = 0
for item in self.items:
    item.idx = index + 1
    index += 1

# With enumerate - cleaner
for index, item in enumerate(self.items):
    item.idx = index + 1  # Row number
    print(f"Row {index}: {item.item_code}")

# Start from 1 instead of 0
for row_num, item in enumerate(self.items, start=1):
    item.idx = row_num
    print(f"Item {row_num}: {item.item_code}")

# Real ERPNext example
def validate_items(self):
    """Validate each item and show row number in error"""
    for idx, item in enumerate(self.items, start=1):
        if not item.item_code:
            frappe.throw(f"Row #{idx}: Item Code is mandatory")

        if item.qty <= 0:
            frappe.throw(f"Row #{idx}: Quantity must be greater than 0")

# Creating lookup with index
def create_item_index(self):
    """Create mapping of item_code to row index"""
    return {
        item.item_code: idx
        for idx, item in enumerate(self.items)
    }

# Processing with position awareness
def calculate_running_total(self):
    total = 0
    for idx, item in enumerate(self.items):
        total += item.amount
        item.running_total = total
        print(f"After row {idx + 1}, running total: {total}")
```

:p How does enumerate() work and when is it useful in ERPNext?
??x
enumerate() provides both index and value when iterating - useful for child tables.

**Basic usage**:
```python
for index, item in enumerate(self.items):
    print(f"Index {index}: {item.item_code}")
    # index starts at 0
```

**Start from 1**:
```python
for row_num, item in enumerate(self.items, start=1):
    print(f"Row {row_num}: {item.item_code}")
    # row_num starts at 1
```

**Error messages with row numbers**:
```python
def validate_items(self):
    for idx, item in enumerate(self.items, start=1):
        if not item.item_code:
            frappe.throw(f"Row #{idx}: Item Code required")
```

**Create index mapping**:
```python
item_index = {
    item.item_code: idx
    for idx, item in enumerate(self.items)
}
```

**vs manual counter**:
```python
# Manual - verbose
i = 0
for item in items:
    print(i, item)
    i += 1

# enumerate - clean
for i, item in enumerate(items):
    print(i, item)
```

Essential for row-based validation messages in child tables.
x??

---

#### Python any() and all() Built-ins
Efficient boolean checks on iterables. Cleaner than manual loops:

```python
# any() - True if ANY element is truthy
has_cancelled_items = any(item.is_cancelled for item in self.items)
has_high_qty = any(item.qty > 100 for item in self.items)

# Equivalent verbose code
has_cancelled_items = False
for item in self.items:
    if item.is_cancelled:
        has_cancelled_items = True
        break

# all() - True if ALL elements are truthy
all_items_valid = all(item.qty > 0 for item in self.items)
all_delivered = all(item.delivered_qty >= item.qty for item in self.items)

# Real ERPNext examples
def validate(self):
    # Check if any item exceeds stock
    if any(item.qty > item.actual_qty for item in self.items):
        frappe.throw("Some items exceed available stock")

    # Check if all items have prices
    if not all(item.rate > 0 for item in self.items):
        frappe.throw("All items must have a price")

# Conditional logic
def is_order_complete(self):
    """Check if all items are fully delivered"""
    return all(
        item.delivered_qty >= item.qty
        for item in self.items
        if not item.is_cancelled
    )

def has_discounted_items(self):
    """Check if any item has discount"""
    return any(
        item.discount_percentage > 0
        for item in self.items
    )
```

:p Explain any() and all() built-in functions and their use cases in ERPNext.
??x
any() and all() perform boolean checks on iterables efficiently.

**any()** - True if ANY element is truthy:
```python
# Check if any item is cancelled
has_cancelled = any(item.is_cancelled for item in self.items)

# Check if any qty > 100
has_large = any(item.qty > 100 for item in self.items)

# vs verbose
found = False
for item in self.items:
    if item.is_cancelled:
        found = True
        break
```

**all()** - True if ALL elements are truthy:
```python
# Check if all items have prices
valid = all(item.rate > 0 for item in self.items)

# Check if all delivered
complete = all(item.delivered_qty >= item.qty for item in self.items)
```

**ERPNext validation**:
```python
def validate(self):
    if not all(item.qty > 0 for item in self.items):
        frappe.throw("All quantities must be positive")

    if any(item.rate == 0 for item in self.items):
        frappe.throw("Some items have no price")
```

Short-circuits (stops at first match). Cleaner than manual loops.
x??