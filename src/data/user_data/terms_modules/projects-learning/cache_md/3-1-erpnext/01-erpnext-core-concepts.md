# ERPNext Core Concepts Flashcards

#### DocType Definition
A DocType (Document Type) is the fundamental building block in ERPNext/Frappe. It's similar to a database table but includes much more: schema definition, business logic, UI configuration, and permissions. Each DocType consists of three main files that work together:

1. **JSON file** - Defines the form structure, fields, and metadata
2. **Python file** - Contains server-side business logic
3. **JavaScript file** - Handles client-side form behavior

Example DocType structure:
```
sales_order/
├── sales_order.json    # Schema
├── sales_order.py      # Backend
└── sales_order.js      # Frontend
```

:p What is a DocType and what are its three main components?
??x
A DocType is ERPNext's fundamental data structure that combines:
1. **JSON file** - Form schema and field definitions
2. **Python class** - Server-side business logic and validation
3. **JavaScript controller** - Client-side form events and UI behavior

It's like a database table + ORM model + form controller combined into one entity.
x??

---

#### DocType JSON Schema Structure
The JSON file defines the structure of a document, including fields, permissions, and behavior. Key properties include:

- `name`: The DocType name
- `module`: Which module it belongs to
- `fields`: Array of field definitions
- `permissions`: Role-based access control
- `is_submittable`: Whether documents can be locked after submission
- `naming_series`: Auto-naming pattern for documents

Example field definition:
```json
{
  "fieldname": "customer",
  "fieldtype": "Link",
  "options": "Customer",
  "label": "Customer",
  "reqd": 1
}
```

:p What are the essential properties in a DocType JSON schema?
??x
Key properties:
- **name**: DocType identifier
- **module**: Module it belongs to (e.g., "Selling", "Buying")
- **fields**: Array defining form fields with fieldname, fieldtype, label
- **permissions**: Role-based access rules
- **is_submittable**: Boolean for document locking capability
- **naming_series**: Pattern for auto-generating document IDs

Example: A Sales Order has fields for customer, items, dates, and amounts.
x??

---

#### Field Types in DocType
Frappe provides various field types for different data. Common field types include:

- **Data**: Plain text (single line)
- **Text**: Multi-line text
- **Link**: Reference to another DocType
- **Select**: Dropdown with predefined options
- **Date/Datetime**: Date and time values
- **Currency**: Monetary values with decimal precision
- **Int**: Integer numbers
- **Float**: Decimal numbers
- **Check**: Boolean checkbox
- **Table**: Child table (one-to-many relationship)

Example usage:
```json
{"fieldtype": "Link", "options": "Customer"}  // Links to Customer doctype
{"fieldtype": "Select", "options": "Low\nMedium\nHigh"}  // Dropdown
{"fieldtype": "Currency"}  // Money field
```

:p What are the main field types in Frappe and their purposes?
??x
Common field types:
- **Link**: References another DocType (foreign key)
- **Select**: Dropdown with fixed options (newline-separated)
- **Data**: Short text field
- **Text**: Long multi-line text
- **Date/Datetime**: Temporal data
- **Currency/Int/Float**: Numeric values
- **Check**: Boolean true/false
- **Table**: Child table for line items

Example: Customer field = Link, Priority = Select, Amount = Currency
x??

---

#### Document Lifecycle Hooks - Part 1 (Creation)
Documents go through a lifecycle with hooks at each stage. These hooks allow you to execute custom logic at specific points. Pre-save hooks:

**before_insert()**: Runs only before the first save (document creation)
**validate()**: Runs before every save (create or update)
**on_update()**: Runs after save is committed to database

Example:
```python
class SalesOrder(Document):
    def before_insert(self):
        # Set default values on creation
        self.status = "Draft"

    def validate(self):
        # Runs before every save
        if not self.delivery_date:
            frappe.throw("Delivery date is required")

    def on_update(self):
        # After save, update linked documents
        self.update_delivery_status()
```

:p What are the document lifecycle hooks that run during creation and saving?
??x
Creation/save hooks (in order):
1. **before_insert()**: Only on first save, before DB insert
2. **validate()**: Every save, for validation logic
3. **on_update()**: After save commits to database

```python
def before_insert(self):  # Set defaults
def validate(self):       # Validate data
def on_update(self):      # Post-save actions
```

Use validate() for checks, on_update() for side effects.
x??

---

#### Document Lifecycle Hooks - Part 2 (Submit/Cancel)
For submittable documents (is_submittable = 1), additional hooks handle document finalization:

**on_submit()**: Runs when document transitions from Draft to Submitted (locked)
**on_cancel()**: Runs when submitted document is cancelled
**on_trash()**: Runs before document is deleted

Example:
```python
class SalesOrder(Document):
    def on_submit(self):
        # Lock the order, reserve stock
        self.reserve_stock()
        self.create_gl_entries()

    def on_cancel(self):
        # Reverse the submission effects
        self.unreserve_stock()
        self.reverse_gl_entries()

    def on_trash(self):
        # Cleanup before deletion
        if self.docstatus == 1:
            frappe.throw("Cannot delete submitted document")
```

:p What are the lifecycle hooks for submittable documents and when do they execute?
??x
Submission lifecycle hooks:
1. **on_submit()**: When document moves Draft → Submitted (docstatus 0 → 1)
   - Used to lock data, create accounting entries, reserve inventory
2. **on_cancel()**: When submitted document is cancelled (docstatus 1 → 2)
   - Used to reverse on_submit() effects
3. **on_trash()**: Before deletion
   - Prevent deleting submitted docs, cleanup dependencies

```python
def on_submit(self):   # Finalize, create entries
def on_cancel(self):   # Reverse effects
def on_trash(self):    # Pre-deletion checks
```
x??

---

#### Controller Inheritance Hierarchy
ERPNext uses object-oriented inheritance to share common business logic across similar documents. The hierarchy allows specialized behavior while reusing code:

```
Document (Frappe base)
  └── TransactionBase
      ├── AccountsController
      │   ├── SellingController
      │   │   ├── SalesOrder
      │   │   ├── SalesInvoice
      │   │   └── Quotation
      │   └── BuyingController
      │       ├── PurchaseOrder
      │       └── PurchaseInvoice
      └── StockController
          ├── StockEntry
          └── DeliveryNote
```

Each level adds specific functionality:
- **AccountsController**: GL entries, tax calculation
- **SellingController**: Customer validation, sales pricing
- **BuyingController**: Supplier validation, purchase rules
- **StockController**: Inventory tracking, stock valuation

:p Explain the controller inheritance hierarchy in ERPNext and what each level provides.
??x
Hierarchy structure:
```
Document → TransactionBase → AccountsController → SellingController → SalesOrder
```

**Document**: Base Frappe class (CRUD operations)
**TransactionBase**: Common transaction fields/methods
**AccountsController**: Accounting logic (GL entries, taxes, currency)
**SellingController**: Sales-specific (customer validation, pricing, commission)
**SalesOrder**: Specific to sales orders

Benefits:
- SalesOrder inherits all parent methods
- Shared logic in base classes (tax calculation once, used everywhere)
- Override methods for specific behavior

Example: All sales docs share tax calculation from AccountsController.
x??

---

#### AccountsController Base Class
The AccountsController is a crucial base class in `erpnext/controllers/accounts_controller.py` that provides common accounting functionality for all financial transactions. Key responsibilities:

1. **Tax Calculation**: Automatically calculates taxes based on tax templates
2. **GL Entry Creation**: Posts accounting entries to General Ledger
3. **Currency Conversion**: Handles multi-currency transactions
4. **Payment Terms**: Manages installment-based payments
5. **Pricing Rules**: Applies promotional and volume-based pricing

Common methods:
```python
class AccountsController(TransactionBase):
    def calculate_taxes_and_totals(self):
        # Calculates all taxes and document totals
        pass

    def make_gl_entries(self, gl_entries):
        # Creates General Ledger entries
        pass

    def set_missing_values(self):
        # Sets default account heads, exchange rates
        pass
```

:p What is the purpose of AccountsController and what key functionality does it provide?
??x
AccountsController is the base class for all accounting transactions providing:

1. **Tax Calculation**: Auto-calculates taxes from templates
2. **GL Entries**: Posts to General Ledger on submit
3. **Currency Handling**: Multi-currency conversion
4. **Payment Terms**: Installment scheduling
5. **Pricing**: Applies promotional rules

Located at: `erpnext/controllers/accounts_controller.py`

```python
class SalesOrder(SellingController):  # which extends AccountsController
    def on_submit(self):
        super().on_submit()  # Calls AccountsController methods
        # GL entries created automatically
```

All invoice/order doctypes extend this for consistent accounting.
x??

---

#### Module-Based Organization
ERPNext organizes code into business domain modules. Each module is a self-contained unit with its own doctypes, reports, and utilities. Core modules include:

**Accounts**: Financial accounting, GL, invoicing, payments
**Selling**: Sales orders, quotations, customers
**Buying**: Purchase orders, suppliers, procurement
**Stock**: Inventory, warehouses, stock movements
**Manufacturing**: Production, BOMs, work orders
**Projects**: Project management, tasks, timesheets
**CRM**: Leads, opportunities, customer relations
**Setup**: Company configuration, users, settings

Module structure:
```
erpnext/
├── accounts/
│   ├── doctype/
│   ├── report/
│   ├── utils.py
│   └── config.py
├── selling/
└── buying/
```

:p What is the purpose of module-based organization in ERPNext and what are the core modules?
??x
Modules organize ERPNext by business domain for maintainability:

**Financial**: Accounts (GL, invoicing, banking)
**Sales**: Selling (orders, customers, quotations)
**Procurement**: Buying (POs, suppliers)
**Inventory**: Stock (warehouses, items)
**Production**: Manufacturing (BOMs, work orders)
**Service**: Projects, CRM, Support

Each module contains:
```
module/
├── doctype/     # Document types
├── report/      # Analytics reports
├── utils.py     # Helper functions
└── config.py    # Navigation setup
```

Benefits: Clear separation, independent development, easier navigation
x??

---

#### hooks.py - Central Integration File
The `hooks.py` file is where ERPNext registers itself with the Frappe Framework. It's the central configuration file that connects your app to Frappe's lifecycle. Located at `erpnext/hooks.py`, it contains:

**App Metadata**: Name, title, version
**Asset Bundles**: JavaScript/CSS files to include
**Document Hooks**: Triggers on doc lifecycle events
**Scheduler Jobs**: Background tasks (hourly, daily, weekly)
**Permissions**: Custom permission handlers
**Boot Session**: Data to load on login

Example:
```python
# hooks.py
app_name = "erpnext"

# Include JS/CSS
app_include_js = "erpnext.bundle.js"

# Document event hooks
doc_events = {
    "Sales Invoice": {
        "on_submit": ["erpnext.accounts.update_gl"],
        "on_cancel": ["erpnext.accounts.reverse_gl"]
    }
}

# Scheduler (background jobs)
scheduler_events = {
    "daily": ["erpnext.support.auto_close_tickets"]
}
```

:p What is hooks.py and what are its main configuration sections?
??x
hooks.py is the central integration file that registers ERPNext with Frappe.

Main sections:
1. **App Metadata**: `app_name`, `app_title`, version info
2. **Assets**: `app_include_js`, `app_include_css` bundles
3. **Doc Events**: Triggers on save/submit/cancel
4. **Scheduler**: Background jobs (hourly/daily/weekly)
5. **Permissions**: Custom permission logic
6. **Boot Session**: Data loaded at login

```python
doc_events = {
    "Sales Order": {
        "on_submit": ["module.method"]  # Runs on SO submit
    }
}
```

Think of it as the "wiring diagram" connecting app to framework.
x??

---

#### Whitelisted Methods and API Access
In Frappe, methods must be explicitly whitelisted to be callable from the frontend or API. This is a security feature. Use the `@frappe.whitelist()` decorator:

```python
# In sales_order.py
import frappe

@frappe.whitelist()
def get_customer_details(customer):
    """Can be called from frontend or API"""
    customer_doc = frappe.get_doc("Customer", customer)
    return {
        "customer_name": customer_doc.customer_name,
        "territory": customer_doc.territory
    }

def internal_method():
    """Cannot be called from outside - no decorator"""
    pass
```

Calling from JavaScript:
```javascript
frappe.call({
    method: 'erpnext.selling.doctype.sales_order.sales_order.get_customer_details',
    args: {customer: 'CUST-00001'},
    callback: function(r) {
        console.log(r.message);
    }
});
```

:p What is method whitelisting in Frappe and how do you implement it?
??x
Whitelisting allows methods to be called from frontend/API using `@frappe.whitelist()` decorator.

```python
import frappe

@frappe.whitelist()  # Now callable from outside
def public_method(arg1):
    return {"result": "success"}

def private_method():  # NOT callable from frontend
    pass
```

Call from JavaScript:
```javascript
frappe.call({
    method: 'module.doctype.name.file.public_method',
    args: {arg1: 'value'},
    callback: (r) => console.log(r.message)
});
```

Security: Only whitelisted methods are exposed to API/frontend.
Path format: `app.module.doctype.filename.method_name`
x??

---

#### frappe.get_doc() - Document Retrieval
The primary way to fetch documents from the database. Returns a Document object with all fields and methods. Different usage patterns:

**Get existing document**:
```python
# By doctype and name
doc = frappe.get_doc("Sales Order", "SO-00001")
print(doc.customer)  # Access fields
doc.save()  # Call methods
```

**Create new document**:
```python
doc = frappe.get_doc({
    "doctype": "Sales Order",
    "customer": "CUST-001",
    "items": [
        {"item_code": "ITEM-001", "qty": 10}
    ]
})
doc.insert()  # Saves to DB
```

**Get single DocType** (singleton):
```python
settings = frappe.get_doc("Selling Settings")
```

:p How do you use frappe.get_doc() to retrieve and create documents?
??x
frappe.get_doc() fetches/creates Document objects.

**Retrieve existing**:
```python
doc = frappe.get_doc("DocType", "NAME-001")
print(doc.field_name)  # Access fields
```

**Create new**:
```python
doc = frappe.get_doc({
    "doctype": "Sales Order",
    "customer": "CUST-001",
    "items": [{"item_code": "ITEM", "qty": 5}]
})
doc.insert()  # Saves to database
```

**Singleton (settings)**:
```python
settings = frappe.get_doc("Module Settings")
```

Returns Document object with fields + methods (save, submit, cancel, etc.)
x??

---

#### frappe.throw() - Validation Errors
Used to raise validation errors that are user-friendly. When called, it stops execution and shows the message to the user. Better than Python's raise Exception because it's handled gracefully by Frappe's UI.

```python
import frappe

def validate(self):
    if not self.delivery_date:
        frappe.throw("Delivery Date is mandatory")

    if self.qty <= 0:
        frappe.throw("Quantity must be greater than zero")

    # With translation support
    frappe.throw(_("Customer {0} is not active").format(self.customer))

    # With specific exception type
    frappe.throw("Insufficient stock", frappe.InsufficientStockError)
```

Common pattern:
```python
if invalid_condition:
    frappe.throw("Error message")
    # Code after this won't execute
```

:p How and when should you use frappe.throw() for validation?
??x
frappe.throw() raises user-friendly validation errors that stop execution.

```python
import frappe

def validate(self):
    # Simple throw
    if not self.customer:
        frappe.throw("Customer is required")

    # With formatting
    if self.amount > limit:
        frappe.throw(_("Amount {0} exceeds limit {1}").format(
            self.amount, limit
        ))

    # With exception type
    frappe.throw("Error", frappe.ValidationError)
```

**When to use**:
- Validation failures in validate()
- Business rule violations
- Required field checks
- Range/logic validations

Better than `raise Exception` - displays nicely in UI, doesn't crash app.
x??

---

#### frappe.db.sql() - Direct Database Queries
Execute raw SQL queries when ORM methods aren't sufficient. Useful for complex queries, reports, and performance-critical operations.

```python
# Return as list of tuples
result = frappe.db.sql("""
    SELECT customer, SUM(grand_total)
    FROM `tabSales Order`
    WHERE docstatus = 1
    GROUP BY customer
""")

# Return as list of dictionaries
result = frappe.db.sql("""
    SELECT customer, grand_total
    FROM `tabSales Order`
    WHERE docstatus = 1
""", as_dict=1)
# Access: result[0].customer, result[0].grand_total

# With parameters (prevents SQL injection)
result = frappe.db.sql("""
    SELECT * FROM `tabSales Order`
    WHERE customer = %(customer)s
    AND transaction_date >= %(from_date)s
""", {"customer": "CUST-001", "from_date": "2024-01-01"}, as_dict=1)
```

Note: Table names use backticks and `tab` prefix: `` `tabSales Order` ``

:p How do you execute SQL queries safely using frappe.db.sql()?
??x
frappe.db.sql() executes raw SQL queries.

```python
# Basic query - returns list of tuples
data = frappe.db.sql("""
    SELECT customer, grand_total
    FROM `tabSales Order`
    WHERE docstatus = 1
""")

# As dictionaries - easier to use
data = frappe.db.sql("""
    SELECT customer, SUM(grand_total) as total
    FROM `tabSales Order`
    GROUP BY customer
""", as_dict=1)
# Access: data[0].customer, data[0].total

# Parameterized (prevents SQL injection)
data = frappe.db.sql("""
    SELECT * FROM `tabSales Order`
    WHERE customer = %(customer)s
""", {"customer": customer_var}, as_dict=1)
```

**Important**: DocType tables use `` `tabDocType Name` `` format (backticks + tab prefix)
x??

---

#### frappe.db ORM Methods
Frappe provides ORM methods for common database operations without writing SQL. Safer and more maintainable than raw SQL for simple queries.

```python
# Get single value
customer_name = frappe.db.get_value("Customer", "CUST-001", "customer_name")

# Get multiple values
customer = frappe.db.get_value("Customer", "CUST-001",
    ["customer_name", "territory"], as_dict=1)

# Get list of values
customers = frappe.db.get_list("Customer",
    filters={"territory": "North"},
    fields=["name", "customer_name"],
    order_by="creation desc",
    limit=10
)

# Count
count = frappe.db.count("Sales Order", {"docstatus": 1})

# Check exists
exists = frappe.db.exists("Customer", "CUST-001")

# Set value (update without validation)
frappe.db.set_value("Sales Order", "SO-001", "status", "Completed")
```

:p What are the main frappe.db ORM methods for database operations?
??x
Common frappe.db ORM methods:

```python
# Get single field
val = frappe.db.get_value("Customer", "CUST-001", "customer_name")

# Get multiple fields
doc = frappe.db.get_value("Customer", "CUST-001",
    ["name", "territory"], as_dict=1)

# Get list with filters
docs = frappe.db.get_list("Sales Order",
    filters={"customer": "CUST-001", "docstatus": 1},
    fields=["name", "grand_total"],
    order_by="creation desc"
)

# Count records
count = frappe.db.count("Customer", {"disabled": 0})

# Check existence
exists = frappe.db.exists("Customer", "CUST-001")

# Update field directly
frappe.db.set_value("DocType", "name", "field", "value")
```

Safer than SQL for simple operations, no injection risk.
x??

---

#### docstatus Field - Document State
Every submittable document has a `docstatus` field tracking its state. This is a core concept in ERPNext's workflow system:

**docstatus = 0**: Draft (editable, not finalized)
**docstatus = 1**: Submitted (locked, finalized, affects ledgers/stock)
**docstatus = 2**: Cancelled (reversed, maintains audit trail)

Workflow:
```
Draft (0) --[submit]--> Submitted (1) --[cancel]--> Cancelled (2)
  ↑                                                       |
  └──────────────────[amend]────────────────────────────┘
```

Usage in code:
```python
def validate(self):
    if self.docstatus == 1:
        frappe.throw("Cannot modify submitted document")

def on_submit(self):
    self.docstatus = 1  # Set automatically by framework
    self.create_stock_entries()

# In queries
submitted_orders = frappe.db.get_list("Sales Order",
    filters={"docstatus": 1}  # Only submitted
)
```

:p Explain the docstatus field and its three states in ERPNext workflow.
??x
docstatus tracks document state in submittable doctypes:

**0 = Draft**: Editable, not final, no business impact
**1 = Submitted**: Locked, finalized, affects inventory/accounts
**2 = Cancelled**: Reversed submission, maintains audit trail

Workflow:
```
Draft (0) → [submit] → Submitted (1) → [cancel] → Cancelled (2)
              ↑                                        ↓
              └────────────[amend]─────────────────────┘
```

Usage:
```python
if self.docstatus == 1:  # Check if submitted
    frappe.throw("Cannot edit submitted doc")

# Query only submitted
frappe.db.sql("""
    SELECT * FROM `tabSales Order`
    WHERE docstatus = 1
""")
```

Amending creates new draft from cancelled doc for corrections.
x??

---

#### Child Tables (Table Fields)
Child tables implement one-to-many relationships. Used for line items in transactions like Sales Order items, Payment Terms, etc.

**Parent DocType JSON**:
```json
{
    "fieldname": "items",
    "fieldtype": "Table",
    "options": "Sales Order Item"  // Child DocType name
}
```

**Child DocType**: Separate DocType with `istable = 1` flag

**Python access**:
```python
# Creating with child table
so = frappe.get_doc({
    "doctype": "Sales Order",
    "customer": "CUST-001",
    "items": [
        {"item_code": "ITEM-001", "qty": 5, "rate": 100},
        {"item_code": "ITEM-002", "qty": 3, "rate": 200}
    ]
})

# Iterating child rows
for item in so.items:
    print(f"{item.item_code}: {item.qty} x {item.rate}")
    total = item.qty * item.rate

# Adding child row
so.append("items", {
    "item_code": "ITEM-003",
    "qty": 2,
    "rate": 150
})
```

:p How do child tables work in ERPNext and how do you use them in code?
??x
Child tables create one-to-many relationships (parent has multiple child rows).

**Setup**:
```json
// In parent doctype.json
{
    "fieldname": "items",
    "fieldtype": "Table",
    "options": "Sales Order Item"  // Child DocType
}
```

**Usage**:
```python
# Create with children
doc = frappe.get_doc({
    "doctype": "Sales Order",
    "items": [
        {"item_code": "ITEM-1", "qty": 5},
        {"item_code": "ITEM-2", "qty": 3}
    ]
})

# Iterate
for row in doc.items:
    print(row.item_code, row.qty)

# Add row
doc.append("items", {"item_code": "ITEM-3", "qty": 2})

# Access specific row
first_item = doc.items[0]
```

Child DocType must have `istable = 1`. Examples: Order Items, Payment Terms.
x??

---

#### frappe.msgprint() vs frappe.throw()
Two ways to communicate with users, but with different purposes and behaviors:

**frappe.msgprint()**: Shows informational message, execution continues
**frappe.throw()**: Shows error message, stops execution

```python
# msgprint - informational, non-blocking
def validate(self):
    if self.total_amount > 10000:
        frappe.msgprint("Large order detected. Please review carefully.")
        # Execution continues here
        self.high_value = 1

# throw - error, blocking
def validate(self):
    if not self.customer:
        frappe.throw("Customer is mandatory")
        # Code after this never executes
```

**msgprint with indicators**:
```python
frappe.msgprint(
    msg="Order saved successfully",
    title="Success",
    indicator="green"  # red, yellow, green, blue
)
```

When to use:
- **msgprint**: Warnings, info, success messages
- **throw**: Validation errors, blocking conditions

:p What's the difference between frappe.msgprint() and frappe.throw()?
??x
Different purposes and behaviors:

**frappe.msgprint()**: Info message, execution CONTINUES
```python
frappe.msgprint("This is a warning")
print("This code runs")  # Executes

frappe.msgprint(
    msg="Success!",
    title="Done",
    indicator="green"  # red/yellow/green/blue
)
```

**frappe.throw()**: Error message, execution STOPS
```python
if error_condition:
    frappe.throw("Critical error")
    print("Never executes")  # Won't run
```

**Use msgprint for**:
- Warnings
- Success notifications
- Informational alerts

**Use throw for**:
- Validation failures
- Required field errors
- Business rule violations

Think: msgprint = alert, throw = exception
x??

---

#### Naming Series and Auto-Naming
ERPNext supports automatic document naming with patterns. Configure in DocType JSON:

```json
{
    "autoname": "naming_series:",
    "naming_series_options": "SO-.YYYY.-\nSO-.####.-"
}
```

Patterns:
- `####`: Sequential numbers (0001, 0002, ...)
- `.YYYY.`: Four-digit year
- `.YY.`: Two-digit year
- `.MM.`: Month
- `.DD.`: Day
- `field:fieldname`: Use field value

Examples:
```
SO-.YYYY.-    → SO-2024-0001, SO-2024-0002
INV-.####     → INV-0001, INV-0002
field:customer → CUST001-0001 (if customer = CUST001)
```

**Custom naming in Python**:
```python
def autoname(self):
    # Custom naming logic
    self.name = f"CUSTOM-{self.customer}-{frappe.utils.nowdate()}"
```

:p How does naming series work in ERPNext and what are common patterns?
??x
Naming series auto-generates document IDs with patterns.

**Configure in JSON**:
```json
{
    "autoname": "naming_series:",
    "naming_series_options": "SO-.YYYY.-\nINV-.####.-"
}
```

**Pattern syntax**:
- `####` = Sequential number (0001, 0002...)
- `.YYYY.` = 4-digit year
- `.MM.` = Month (01-12)
- `.DD.` = Day
- `field:name` = Use field value

**Examples**:
```
SO-.YYYY.-        → SO-2024-0001
INV-.MM.-.####    → INV-01-0001
field:customer    → CUST001-0001
```

**Custom naming**:
```python
def autoname(self):
    self.name = f"CUSTOM-{self.customer}"
```

Provides consistent, readable IDs with auto-incrementing.
x??

---

#### Permissions and Roles
ERPNext uses role-based permissions defined in DocType JSON. Each permission rule specifies what a role can do:

```json
{
    "permissions": [
        {
            "role": "Sales User",
            "read": 1,
            "write": 1,
            "create": 1,
            "submit": 0,
            "cancel": 0,
            "delete": 0
        },
        {
            "role": "Sales Manager",
            "read": 1,
            "write": 1,
            "create": 1,
            "submit": 1,
            "cancel": 1,
            "delete": 1
        }
    ]
}
```

Permission levels (0-9) for field-level security:
```json
{
    "fieldname": "discount_percentage",
    "permlevel": 1  // Only users with permlevel 1+ can edit
}
```

**Check permissions in code**:
```python
if frappe.has_permission("Sales Order", "submit"):
    doc.submit()
else:
    frappe.throw("You don't have permission to submit")
```

:p How are permissions configured in ERPNext and what are permission levels?
??x
Permissions use role-based access control (RBAC).

**DocType JSON configuration**:
```json
{
    "permissions": [
        {
            "role": "Sales User",
            "read": 1,     // Can view
            "write": 1,    // Can edit
            "create": 1,   // Can create new
            "submit": 0,   // Cannot submit
            "cancel": 0,   // Cannot cancel
            "delete": 0    // Cannot delete
        }
    ]
}
```

**Permission levels** (field-level):
```json
{"fieldname": "discount", "permlevel": 1}
// Only roles with permlevel≥1 can edit
```

**Check in code**:
```python
has_perm = frappe.has_permission("DocType", "write")
```

Common roles: Sales User < Sales Manager < System Manager
permlevel 0 = everyone, 1+ = restricted fields
x??