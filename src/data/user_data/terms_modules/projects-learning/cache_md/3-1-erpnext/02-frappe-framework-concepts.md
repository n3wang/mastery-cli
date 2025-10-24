# Frappe Framework Concepts Flashcards

#### Frappe Framework Architecture
Frappe is a full-stack web framework written in Python and JavaScript. It provides a complete ecosystem for building database-driven applications with minimal boilerplate. Key components:

**Backend**: Python (Flask-based web server + ORM + business logic)
**Frontend**: JavaScript (vanilla JS with custom components, no React/Vue)
**Database**: MariaDB/MySQL (with ORM abstraction)
**Task Queue**: Redis + RQ for background jobs
**WebSocket**: Real-time updates via Socket.IO

Architecture layers:
```
User Interface (Browser)
    ↓
Frappe Desk (JavaScript)
    ↓
REST API / WebSocket
    ↓
Python Controllers
    ↓
ORM (Database Abstraction)
    ↓
MariaDB Database
```

:p What is Frappe Framework and what are its main technology components?
??x
Frappe is a full-stack framework for building business applications.

**Technology stack**:
- **Backend**: Python (Flask-like server)
- **Frontend**: Vanilla JavaScript (custom framework)
- **Database**: MariaDB/MySQL with ORM
- **Queue**: Redis + RQ for async tasks
- **WebSocket**: Socket.IO for real-time
- **Search**: Optional ElasticSearch

**Architecture**:
```
Browser (Frappe Desk UI)
    ↓
REST API + WebSocket
    ↓
Python (Controllers/ORM)
    ↓
MariaDB
```

Provides: ORM, Form Builder, Reports, Workflows, Permissions, API out-of-box.
ERPNext is built as a Frappe app.
x??

---

#### Frappe Form System
Frappe's form system auto-generates UI from DocType JSON schema. No manual HTML/React needed. The form intelligently renders fields based on fieldtype:

**JSON definition**:
```json
{
    "fields": [
        {"fieldname": "customer", "fieldtype": "Link", "options": "Customer"},
        {"fieldname": "date", "fieldtype": "Date"},
        {"fieldname": "priority", "fieldtype": "Select", "options": "High\nLow"}
    ]
}
```

**Auto-generated UI**:
- Link field → Autocomplete dropdown
- Date field → Date picker
- Select field → Dropdown with options
- Table field → Editable grid
- Text field → Rich text editor

**Form sections and layout**:
```json
{
    "fieldtype": "Section Break",
    "label": "Customer Details"
},
{
    "fieldtype": "Column Break"  // Two column layout
}
```

:p How does Frappe's form system work and how is UI generated from schema?
??x
Frappe auto-generates forms from DocType JSON schema - no manual UI code needed.

**Schema defines UI**:
```json
{
    "fields": [
        {
            "fieldname": "customer",
            "fieldtype": "Link",      // → Autocomplete search
            "options": "Customer"
        },
        {
            "fieldname": "notes",
            "fieldtype": "Text"       // → Rich text editor
        },
        {
            "fieldname": "items",
            "fieldtype": "Table",     // → Editable grid
            "options": "Item Table"
        }
    ]
}
```

**Layout controls**:
- Section Break = New section with heading
- Column Break = Multi-column layout
- Tab Break = Tabbed interface

Framework renders appropriate widget for each fieldtype automatically.
x??

---

#### frappe.ui.form.on() Event System
Frappe's client-side form controller uses an event-driven system. Register event handlers for form and field events:

```javascript
frappe.ui.form.on('Sales Order', {
    // Form-level events
    setup: function(frm) {
        // Runs once when form is first created
        frm.set_query("customer", () => {
            return {filters: {disabled: 0}};
        });
    },

    refresh: function(frm) {
        // Runs every time form loads/refreshes
        if (frm.doc.docstatus === 1) {
            frm.add_custom_button('Create Invoice', () => {
                // Button click handler
            });
        }
    },

    validate: function(frm) {
        // Client-side validation before save
        if (frm.doc.total < 0) {
            frappe.throw("Total cannot be negative");
        }
    },

    // Field-level events
    customer: function(frm) {
        // Runs when customer field changes
        fetch_customer_details(frm);
    }
});
```

:p Explain the frappe.ui.form.on() event system and common form events.
??x
Event-driven form controller for client-side logic.

```javascript
frappe.ui.form.on('DocType Name', {
    // Form events
    setup: function(frm) {
        // Once, first load only
        // Setup queries, custom fields
    },

    refresh: function(frm) {
        // Every load/refresh
        // Add buttons, conditional visibility
    },

    validate: function(frm) {
        // Before save (client-side)
        // Validation checks
    },

    // Field events
    field_name: function(frm) {
        // When field_name changes
        // Fetch dependent data
    }
});
```

**Common pattern**:
```javascript
customer: function(frm) {
    if (frm.doc.customer) {
        // Field changed, fetch related data
        frappe.call({method: '...', args: {...}});
    }
}
```

frm = form object, frm.doc = document data
x??

---

#### frm Object Methods
The `frm` object in JavaScript provides methods to manipulate the form. Available in all event handlers:

**Setting values**:
```javascript
frm.set_value('field_name', value);  // Set field value
frm.set_df_property('field_name', 'read_only', 1);  // Make read-only
frm.set_df_property('field_name', 'hidden', 1);  // Hide field
frm.set_df_property('field_name', 'reqd', 1);  // Make required
```

**Field manipulation**:
```javascript
frm.toggle_display('field_name', condition);  // Show/hide
frm.toggle_reqd('field_name', condition);  // Required/optional
frm.toggle_enable('field_name', condition);  // Enable/disable
```

**Buttons**:
```javascript
frm.add_custom_button('Label', callback);
frm.remove_custom_button('Label');
```

**Refresh**:
```javascript
frm.refresh_field('field_name');  // Refresh specific field
frm.reload_doc();  // Reload entire document
```

**Data access**:
```javascript
frm.doc.field_name  // Read field value
frm.doc.items[0]    // Access child table row
```

:p What are the main methods available on the frm object for form manipulation?
??x
frm object provides methods to control form behavior in JavaScript.

**Set values**:
```javascript
frm.set_value('amount', 1000);
```

**Field properties**:
```javascript
frm.set_df_property('field', 'read_only', 1);  // Read-only
frm.set_df_property('field', 'hidden', 1);     // Hide
frm.set_df_property('field', 'reqd', 1);       // Required
```

**Toggle helpers**:
```javascript
frm.toggle_display('field', condition);   // Show/hide
frm.toggle_enable('field', condition);    // Enable/disable
frm.toggle_reqd('field', condition);      // Required toggle
```

**Buttons**:
```javascript
frm.add_custom_button('Create Invoice', () => {...});
```

**Data access**:
```javascript
let value = frm.doc.field_name;  // Read
frm.refresh_field('field_name'); // Refresh UI
```

All methods available in frappe.ui.form.on() handlers.
x??

---

#### frappe.call() - AJAX Communication
Primary method for client-server communication. Calls whitelisted Python methods from JavaScript:

```javascript
frappe.call({
    method: 'erpnext.selling.doctype.sales_order.sales_order.get_items',
    args: {
        customer: frm.doc.customer,
        date: frm.doc.transaction_date
    },
    callback: function(response) {
        if (response.message) {
            // response.message contains return value from Python
            console.log(response.message);
            frm.set_value('items', response.message);
        }
    },
    error: function(err) {
        console.error(err);
    }
});
```

**Calling doc methods**:
```javascript
frm.call({
    method: 'calculate_totals',  // Method on current doctype
    doc: frm.doc,  // Pass current document
    callback: (r) => {
        frm.refresh();
    }
});
```

**With freeze message**:
```javascript
frappe.call({
    method: '...',
    freeze: true,
    freeze_message: 'Loading...',
    // Shows loading overlay
});
```

:p How do you use frappe.call() to communicate between JavaScript and Python?
??x
frappe.call() makes AJAX calls to whitelisted Python methods.

**Basic call**:
```javascript
frappe.call({
    method: 'path.to.module.function_name',
    args: {
        arg1: 'value1',
        arg2: 'value2'
    },
    callback: function(r) {
        // r.message = Python return value
        console.log(r.message);
    }
});
```

**Call doc method**:
```javascript
frm.call({
    method: 'calculate_total',  // Method on current DocType
    doc: frm.doc,
    callback: (r) => frm.refresh()
});
```

**With loading**:
```javascript
frappe.call({
    method: '...',
    freeze: true,
    freeze_message: 'Processing...'
});
```

Python method must have `@frappe.whitelist()` decorator.
response.message = return value from Python.
x??

---

#### Frappe Virtual DocTypes
Virtual DocTypes don't have database tables - used for dashboards, reports, and settings. Data comes from other sources or calculations:

**Report DocType**:
```python
# No table, data from custom query
def execute(filters):
    columns = [...]
    data = get_data_from_calculation()
    return columns, data
```

**Dashboard DocType**:
```json
{
    "is_virtual": 1,  // No database table
    "issingle": 0
}
```

**Settings DocType** (Singleton):
```json
{
    "issingle": 1  // Only one instance, stored in tabSingles
}
```

Examples in ERPNext:
- **Report**: Sales Analytics (virtual, calculates on-demand)
- **Dashboard**: Sales Dashboard (aggregates data)
- **Settings**: Selling Settings (singleton, one global config)

Virtual doctypes are useful for:
- Reports and analytics
- Aggregated views
- System settings
- Temporary data processing

:p What are Virtual DocTypes and when should you use them?
??x
Virtual DocTypes don't have database tables - data comes from calculations/other sources.

**Types**:

**1. Reports** (is_virtual=1):
```python
# No table, calculate on demand
def execute(filters):
    data = calculate_from_other_tables()
    return columns, data
```

**2. Singletons** (issingle=1):
```json
{"issingle": 1}  // One instance, stored in tabSingles
```
Example: "Selling Settings" - global configuration

**3. Dashboards**:
```python
# Aggregate from multiple sources
def get_data():
    return aggregated_metrics()
```

**When to use**:
- Reports (calculated data, not stored)
- Analytics dashboards
- Global settings (singleton)
- Temporary processing views

**Not for**: Transactional data, permanent records, audit trails
x??

---

#### Frappe Desk vs Portal
Frappe has two frontend interfaces serving different user types:

**Frappe Desk** (Internal Users):
- Full ERP interface for employees
- Access to all modules, forms, reports
- Role-based permissions
- Rich form builder UI
- URL: `/app`
- Bundle: `erpnext.bundle.js`

**Portal** (External Users):
- Customer/Supplier/Website visitor interface
- Limited, public-facing pages
- Simplified forms
- Custom web pages
- URL: `/` (root)
- Bundle: `erpnext-web.bundle.js`

Example portal pages:
- Customer portal: View orders, invoices
- Supplier portal: View POs, submit quotations
- Public forms: Lead capture, support tickets

**Configuration**:
```python
# hooks.py
app_include_js = "erpnext.bundle.js"  # Desk
web_include_js = "erpnext-web.bundle.js"  # Portal
```

:p What's the difference between Frappe Desk and Portal interfaces?
??x
Two separate frontend interfaces for different users:

**Frappe Desk** (/app):
- **Users**: Internal employees, staff
- **Access**: Full ERP functionality
- **UI**: Rich forms, reports, dashboards
- **Auth**: Role-based permissions
- **Bundle**: erpnext.bundle.js
- **Example**: Sales User managing orders

**Portal** (/):
- **Users**: Customers, suppliers, public
- **Access**: Limited, specific pages
- **UI**: Simplified web pages
- **Auth**: Customer/contact login
- **Bundle**: erpnext-web.bundle.js
- **Example**: Customer viewing their invoices

**Portal pages**:
```python
# routes.py
def get_portal_pages():
    return [
        "orders",      # /orders
        "invoices"     # /invoices
    ]
```

Portal = public-facing, Desk = internal operations
x??

---

#### Frappe Session and Boot
When a user logs in, Frappe "boots" the session by loading essential data. This reduces subsequent API calls. Boot data includes:

**System Defaults**:
```python
# In boot.py
def boot_session(bootinfo):
    bootinfo.user_defaults = frappe.defaults.get_user_defaults()
    bootinfo.company = frappe.defaults.get_user_default('company')
    bootinfo.fiscal_year = get_fiscal_year()
```

**Accessed in JavaScript**:
```javascript
// Available globally after boot
frappe.boot.user_defaults
frappe.boot.company
frappe.boot.sysdefaults

// User info
frappe.session.user
frappe.session.user_fullname
```

**Custom boot data** (in hooks.py):
```python
boot_session = "erpnext.startup.boot.boot_session"

# In boot.py
def boot_session(bootinfo):
    bootinfo.custom_data = get_custom_data()
```

Benefits:
- Reduces API calls
- Preloads user preferences
- Caches system defaults

:p What is Frappe's boot session and what data does it provide?
??x
Boot session loads essential data once at login, available globally in JS.

**Boot process**:
```python
# hooks.py
boot_session = "module.boot.boot_session"

# boot.py
def boot_session(bootinfo):
    bootinfo.user_defaults = get_defaults()
    bootinfo.company = get_user_company()
    bootinfo.fiscal_year = get_fiscal_year()
```

**Access in JavaScript**:
```javascript
frappe.boot.user_defaults      // User preferences
frappe.boot.company            // Default company
frappe.boot.sysdefaults        // System settings

frappe.session.user            // Current user ID
frappe.session.user_fullname   // User's name
```

**Benefits**:
- One-time load at login
- Reduces API calls for common data
- User preferences cached

Example: Default company/currency loaded once, not on every form.
x??

---

#### Frappe Caching System
Frappe provides multiple caching layers for performance. Cache commonly accessed data to reduce database queries:

**frappe.cache()**:
```python
# Get from cache
value = frappe.cache().get_value("key_name")

# Set in cache (TTL in seconds)
frappe.cache().set_value("key_name", value, expires_in_sec=3600)

# Delete from cache
frappe.cache().delete_value("key_name")

# Check existence
exists = frappe.cache().exists("key_name")
```

**Common patterns**:
```python
def get_customer_balance(customer):
    cache_key = f"customer_balance:{customer}"

    # Try cache first
    balance = frappe.cache().get_value(cache_key)
    if balance is not None:
        return balance

    # Cache miss - calculate and cache
    balance = calculate_balance(customer)
    frappe.cache().set_value(cache_key, balance, expires_in_sec=300)
    return balance
```

**Cache invalidation**:
```python
def on_submit(self):
    # Invalidate related caches
    frappe.cache().delete_value(f"customer_balance:{self.customer}")
```

:p How does Frappe's caching system work and how do you use it?
??x
Frappe provides Redis-based caching for performance optimization.

**Basic usage**:
```python
# Set cache (expires in 1 hour)
frappe.cache().set_value("key", value, expires_in_sec=3600)

# Get cache
val = frappe.cache().get_value("key")

# Delete cache
frappe.cache().delete_value("key")

# Check exists
exists = frappe.cache().exists("key")
```

**Pattern**: Cache expensive calculations
```python
def get_report_data():
    cache_key = "expensive_report"

    # Try cache first
    data = frappe.cache().get_value(cache_key)
    if data:
        return data

    # Cache miss - calculate
    data = expensive_calculation()
    frappe.cache().set_value(cache_key, data, expires_in_sec=600)
    return data
```

**Invalidate on changes**:
```python
def on_submit(self):
    frappe.cache().delete_value("related_key")
```

Reduces DB queries significantly.
x??

---

#### Frappe Scheduler and Background Jobs
Frappe uses RQ (Redis Queue) for background job processing. Define scheduled tasks in hooks.py:

```python
# hooks.py
scheduler_events = {
    "hourly": [
        "erpnext.projects.doctype.project.project.send_reminders"
    ],
    "daily": [
        "erpnext.support.doctype.issue.issue.auto_close_tickets",
        "erpnext.accounts.doctype.subscription.subscription.process_subscriptions"
    ],
    "weekly": [
        "erpnext.hr.doctype.employee.employee.send_birthday_reminders"
    ],
    "monthly": [
        "erpnext.accounts.deferred_revenue.process_deferred_accounting"
    ],
    "cron": {
        "0 0 * * *": [  # Custom cron expression (midnight daily)
            "module.path.to.function"
        ]
    }
}
```

**Enqueue one-time jobs**:
```python
frappe.enqueue(
    method="module.path.to.function",
    queue="default",  # default, short, long
    timeout=300,
    kwargs={"arg1": "value"}
)
```

:p How do you configure scheduled jobs and background tasks in Frappe?
??x
Frappe uses RQ (Redis Queue) for background jobs. Configure in hooks.py:

**Scheduled tasks**:
```python
# hooks.py
scheduler_events = {
    "hourly": [
        "module.function"  # Runs every hour
    ],
    "daily": [
        "module.daily_task"  # Runs daily
    ],
    "weekly": ["module.weekly"],
    "monthly": ["module.monthly"],

    "cron": {
        "0 0 * * *": ["module.midnight_task"]  # Custom cron
    }
}
```

**Manual queue**:
```python
# Enqueue one-time job
frappe.enqueue(
    method="module.function",
    queue="default",  # default/short/long
    timeout=300,
    kwargs={"arg1": "value"}
)
```

**In function**:
```python
def process_large_data():
    # Runs in background worker
    pass
```

Queues: short (< 5min), default (< 15min), long (> 15min)
x??

---

#### frappe.get_list() vs frappe.get_all()
Two methods for fetching multiple documents with subtle differences:

**frappe.get_list()**:
- Respects permissions (checks user access)
- Returns only docs user can read
- Slower due to permission checks
- Use in user-facing code

```python
# Only returns SOs the current user can read
orders = frappe.get_list("Sales Order",
    filters={"customer": customer},
    fields=["name", "grand_total"],
    limit=10
)
```

**frappe.get_all()**:
- Ignores permissions (returns all matching)
- Faster, no permission overhead
- Use in background jobs, system tasks
- Dangerous in user-facing code

```python
# Returns ALL sales orders, ignoring permissions
all_orders = frappe.get_all("Sales Order",
    filters={"docstatus": 1},
    fields=["name", "grand_total"]
)
```

**Rule of thumb**:
- User request → `get_list()`
- Background job → `get_all()`

:p What's the difference between frappe.get_list() and frappe.get_all()?
??x
Both fetch multiple documents, but handle permissions differently:

**frappe.get_list()**:
- **Checks permissions** (user can only see allowed docs)
- Slower (permission overhead)
- **Use**: User-facing code, API endpoints

```python
# User sees only their allowed docs
docs = frappe.get_list("Sales Order",
    filters={"customer": customer},
    fields=["name", "total"]
)
```

**frappe.get_all()**:
- **Ignores permissions** (returns ALL matching)
- Faster (no permission checks)
- **Use**: Background jobs, system tasks, admin scripts

```python
# Returns ALL docs, ignores user permissions
docs = frappe.get_all("Sales Order",
    filters={"docstatus": 1},
    fields=["name", "total"]
)
```

**Security**: Never use get_all() for user-facing features - exposes all data!
x??

---

#### Frappe Filters Syntax
Frappe supports multiple filter formats for querying documents:

**Simple dict filters**:
```python
filters = {"status": "Open", "customer": "CUST-001"}
```

**List of lists** (complex conditions):
```python
filters = [
    ["status", "in", ["Open", "Pending"]],
    ["grand_total", ">", 1000],
    ["transaction_date", "between", ["2024-01-01", "2024-12-31"]]
]
```

**Operators**:
- `=` : Equal (default)
- `!=` : Not equal
- `>`, `<`, `>=`, `<=` : Comparisons
- `in` : In list
- `not in` : Not in list
- `like` : Pattern match (% wildcard)
- `between` : Range

```python
# Complex example
frappe.get_list("Sales Order",
    filters=[
        ["customer", "like", "%Corp%"],
        ["grand_total", ">=", 5000],
        ["status", "not in", ["Cancelled", "Closed"]]
    ]
)
```

**Combining with OR**:
```python
filters = [
    ["status", "=", "Open"],
    ["priority", "=", "High"]
]
or_filters = [  # Separate OR conditions
    ["customer_group", "=", "VIP"],
    ["territory", "=", "North"]
]
```

:p What are the different filter syntax options in Frappe queries?
??x
Frappe supports multiple filter formats:

**Simple dict** (AND conditions):
```python
filters = {
    "status": "Open",
    "customer": "CUST-001"
}
# WHERE status = 'Open' AND customer = 'CUST-001'
```

**List format** (complex):
```python
filters = [
    ["status", "in", ["Open", "Pending"]],
    ["grand_total", ">", 1000],
    ["name", "like", "SO-%"]
]
```

**Operators**:
- `=`, `!=`: Equality
- `>`, `<`, `>=`, `<=`: Comparison
- `in`, `not in`: List membership
- `like`: Pattern (% wildcard)
- `between`: Range [val1, val2]

**Example**:
```python
frappe.get_list("Sales Order",
    filters=[
        ["transaction_date", "between", ["2024-01-01", "2024-12-31"]],
        ["grand_total", ">=", 5000]
    ]
)
```

List format more flexible than dict for complex queries.
x??

---

#### frappe.db.get_single_value()
Efficient method to get a single field from a Single DocType (settings). Avoids loading entire document:

```python
# Inefficient - loads entire doc
settings = frappe.get_doc("Selling Settings")
value = settings.customer_naming_by

# Efficient - gets only one field
value = frappe.db.get_single_value("Selling Settings", "customer_naming_by")
```

**Multiple fields**:
```python
# Get multiple fields from single doctype
values = frappe.db.get_singles_dict("Selling Settings",
    ["customer_naming_by", "cust_master_name", "campaign_naming_by"]
)
# Returns: {"customer_naming_by": "...", "cust_master_name": "...", ...}
```

**Common use case**:
```python
def get_default_company():
    return frappe.db.get_single_value("Global Defaults", "default_company")

def validate(self):
    naming_method = frappe.db.get_single_value("Selling Settings", "cust_master_name")
    if naming_method == "Customer Name":
        # Validation logic
        pass
```

:p How do you efficiently fetch values from Single DocTypes (settings)?
??x
Use frappe.db.get_single_value() for efficient field access from singletons.

**Single field**:
```python
# Efficient - only fetches one field
value = frappe.db.get_single_value("Selling Settings", "field_name")

# Inefficient - loads entire doc
settings = frappe.get_doc("Selling Settings")
value = settings.field_name
```

**Multiple fields**:
```python
values = frappe.db.get_singles_dict("Settings DocType",
    ["field1", "field2", "field3"]
)
# Returns: {"field1": val1, "field2": val2, "field3": val3}
```

**Example**:
```python
def get_defaults():
    company = frappe.db.get_single_value("Global Defaults", "default_company")
    currency = frappe.db.get_single_value("Global Defaults", "default_currency")
    return company, currency
```

Much faster than get_doc() for settings access.
x??

---

#### Frappe Translations (_)
Frappe supports multi-language translations using the `_()` function. Wrap user-facing strings:

**Python**:
```python
from frappe import _

def validate(self):
    if not self.customer:
        frappe.throw(_("Customer is mandatory"))

    frappe.msgprint(_("Order saved successfully"))

    # With formatting
    msg = _("Order {0} has been submitted").format(self.name)
    frappe.msgprint(msg)
```

**JavaScript**:
```javascript
frappe.ui.form.on('Sales Order', {
    refresh: function(frm) {
        frappe.msgprint(__("Form loaded successfully"));

        // With formatting
        let msg = __("Customer {0} selected", [frm.doc.customer]);
        frappe.msgprint(msg);
    }
});
```

**Translation files**:
- Stored in `app/translations/`
- Format: `{language_code}.csv`
- Example: `de.csv` for German

```csv
Source,Translated
"Customer is mandatory","Kunde ist erforderlich"
"Order {0} submitted","Bestellung {0} eingereicht"
```

:p How do you implement translations in Frappe for multi-language support?
??x
Use _() in Python and __() in JavaScript to mark translatable strings.

**Python**:
```python
from frappe import _

frappe.throw(_("Customer is required"))

# With placeholders
msg = _("Order {0} created for {1}").format(
    self.name, self.customer
)
```

**JavaScript**:
```javascript
frappe.msgprint(__("Success"));

// With placeholders
let msg = __("Total: {0}", [frm.doc.grand_total]);
```

**Translation files** (app/translations/de.csv):
```csv
Source,Translated
"Customer is required","Kunde ist erforderlich"
"Order {0} created","Bestellung {0} erstellt"
```

**Extract translatable strings**:
```bash
bench get-untranslated app_name language_code
```

Strings wrapped in _()/__() appear in translation interface.
User's language preference determines display.
x??

---

#### frappe.local vs frappe.session
Two objects for request-scoped and session-scoped data:

**frappe.local** (Request-scoped):
- Lives only during current HTTP request
- Reset on each request
- Stores temporary, request-specific data

```python
# Request context
frappe.local.request  # HTTP request object
frappe.local.response  # HTTP response object
frappe.local.form_dict  # Request parameters
frappe.local.site  # Current site name

# Temporary storage
frappe.local.custom_data = {"temp": "value"}  # Gone after request
```

**frappe.session** (Session-scoped):
- Persists across multiple requests
- Tied to user login session
- Stores user-specific session data

```python
# Session data
frappe.session.user  # Current logged-in user
frappe.session.user_type  # "System User" or "Website User"

# Custom session data
frappe.session.data = {"cart": []}  # Persists across requests
```

**Common usage**:
```python
def is_admin():
    return frappe.session.user == "Administrator"

def get_current_site():
    return frappe.local.site
```

:p What's the difference between frappe.local and frappe.session?
??x
Different scopes for storing data:

**frappe.local** (Request scope):
- Lives only during ONE request
- Reset on each new request
- Request-specific temporary data

```python
frappe.local.request     # HTTP request
frappe.local.form_dict   # Request params
frappe.local.site        # Current site
frappe.local.temp = "x"  # Gone after request ends
```

**frappe.session** (Session scope):
- Persists across multiple requests
- Tied to user login
- User session data

```python
frappe.session.user           # Current user
frappe.session.user_type      # User type
frappe.session.cart = []      # Persists until logout
```

**Example**:
```python
# Check once per request
if not hasattr(frappe.local, "checked"):
    do_expensive_check()
    frappe.local.checked = True
```

local = request, session = user login
x??