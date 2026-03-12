# Frappe Framework Core Concepts - Flashcards

#### DocType Definition
A DocType is the metadata definition that describes a model/table in Frappe. It's the fundamental building block of the framework. Every entity in Frappe (User, Customer, Item, etc.) is defined as a DocType with fields, permissions, and behavior.

DocTypes are stored in the database and define:
- Field structure (name, type, options)
- Permissions (who can read/write)
- Validation rules
- Relationships to other DocTypes

:p What is a DocType in Frappe and what does it define?
??x
A DocType is a metadata definition that describes a model/table in the system.

It defines:
1. Database table structure (fields and their types)
2. Permissions and access control
3. Validation rules and behavior
4. Relationships to other DocTypes

Example structure:
```python
# Conceptual representation
DocType = {
    "name": "User",
    "fields": [
        {"fieldname": "email", "fieldtype": "Data"},
        {"fieldname": "full_name", "fieldtype": "Data"}
    ],
    "permissions": [...],
    "controller": "user.User"  # Python class
}
```
x??

---

#### Document vs DocType
This is a critical distinction in Frappe. A DocType is like a class definition or database schema, while a Document is an instance of that DocType - an actual record with data.

Think of it like OOP:
- DocType = Class definition
- Document = Object instance

:p What is the difference between a DocType and a Document in Frappe?
??x
- **DocType**: The metadata/schema definition (like a class or table schema)
- **Document**: An instance of a DocType (like an object or table row)

```python
# DocType is the definition (metadata)
# Stored in tabDocType, defines structure

# Document is the instance (actual data)
user = frappe.get_doc("User", "admin@example.com")
# This creates/fetches a Document instance
# of the "User" DocType

# Analogy:
# DocType : Document :: Class : Object
# DocType : Document :: Schema : Row
```
x??

---

#### get_doc() Method - Fetching
The get_doc() function is the primary way to interact with documents in Frappe. It can fetch existing documents from the database or create new ones in memory.

When called with two arguments (doctype, name), it fetches from database.
When called with a dict, it creates a new document in memory.

:p How do you fetch an existing document from the database using get_doc()?
??x
Use get_doc() with two parameters: doctype name and document name.

```python
import frappe

# Fetch existing document
user = frappe.get_doc("User", "admin@example.com")

# Now you can access fields
print(user.full_name)
print(user.email)

# Pseudocode logic:
# function get_doc(doctype, name):
#     query = "SELECT * FROM `tab{doctype}` WHERE name = {name}"
#     data = execute_query(query)
#     document_instance = create_document_object(data)
#     return document_instance
```
x??

---

#### get_doc() Method - Creating
When you pass a dictionary to get_doc(), it creates a new document instance in memory (not saved to database yet). You must call insert() to save it.

The dictionary must contain at least the "doctype" key to specify what type of document to create.

:p How do you create a new document instance using get_doc()?
??x
Pass a dictionary with "doctype" key and field values.

```python
import frappe

# Create new document (in memory only)
new_user = frappe.get_doc({
    "doctype": "User",
    "email": "newuser@example.com",
    "full_name": "New User",
    "first_name": "New"
})

# Save to database
new_user.insert()

# Pseudocode:
# function get_doc(dict):
#     doctype = dict["doctype"]
#     document = new Document(doctype)
#     for field, value in dict:
#         document.set_field(field, value)
#     return document  # Not yet saved to DB
```
x??

---

#### Document Lifecycle - Insert
The insert() method creates a new record in the database. Before insertion, Frappe runs validation hooks, sets defaults, and triggers various events.

The lifecycle includes: before_insert → validate → on_update → insert (DB) → after_insert

:p What happens when you call insert() on a document and what is the execution order?
??x
insert() saves a new document to the database and triggers lifecycle hooks.

Execution order:
```python
# 1. before_insert() hook
# 2. validate() - check business rules
# 3. on_update() - process changes
# 4. INSERT INTO database
# 5. after_insert() hook

# Example:
class CustomDocType(Document):
    def before_insert(self):
        # Set default values
        self.status = "Draft"

    def validate(self):
        # Validate business rules
        if not self.name:
            frappe.throw("Name is required")

    def after_insert(self):
        # Send notification
        send_email(self.email)

# Usage:
doc = frappe.get_doc({"doctype": "CustomDocType"})
doc.insert()  # Triggers all hooks in order
```
x??

---

#### Document Lifecycle - Save
The save() method updates an existing record. Unlike insert(), it requires the document to already exist in the database. It runs similar validation hooks.

save() will call validate() before updating, ensuring data integrity.

:p What is the difference between insert() and save() methods?
??x
- **insert()**: Creates a NEW record in the database
- **save()**: Updates an EXISTING record

```python
# INSERT - Create new
new_doc = frappe.get_doc({
    "doctype": "User",
    "email": "new@example.com"
})
new_doc.insert()  # Creates new row in database

# SAVE - Update existing
existing_doc = frappe.get_doc("User", "existing@example.com")
existing_doc.full_name = "Updated Name"
existing_doc.save()  # Updates existing row

# Pseudocode:
# insert():
#     validate()
#     INSERT INTO tabUser VALUES (...)
#     after_insert()
#
# save():
#     validate()
#     UPDATE tabUser SET ... WHERE name = ...
#     after_save()
```
x??

---

#### Database Abstraction - frappe.db.sql
frappe.db is the database interface layer. The sql() method allows raw SQL queries but automatically handles connection pooling, error handling, and result formatting.

Returns results as list of tuples by default, or list of dicts with as_dict=True.

:p How do you execute a raw SQL query in Frappe using frappe.db?
??x
Use frappe.db.sql() for raw SQL queries.

```python
import frappe

# Returns list of tuples
results = frappe.db.sql("""
    SELECT name, email
    FROM `tabUser`
    WHERE enabled = 1
""")

# Returns list of dictionaries
results = frappe.db.sql("""
    SELECT name, email
    FROM `tabUser`
    WHERE enabled = 1
""", as_dict=True)

# With parameters (prevents SQL injection)
results = frappe.db.sql("""
    SELECT name FROM `tabUser`
    WHERE email = %s
""", ("user@example.com",))

# Pseudocode:
# function sql(query, params, as_dict):
#     connection = get_db_connection()
#     cursor = connection.execute(query, params)
#     results = cursor.fetchall()
#     if as_dict:
#         return convert_to_dict(results)
#     return results
```
x??

---

#### Database Abstraction - get_value
get_value() is a convenience method to fetch a single field value without loading the entire document. Much more efficient than get_doc() when you only need one field.

Can fetch single value or multiple values (returns as dict).

:p How do you fetch a single field value from the database efficiently?
??x
Use frappe.db.get_value() instead of loading the full document.

```python
import frappe

# Get single field
full_name = frappe.db.get_value("User", "admin@example.com", "full_name")

# Get multiple fields (returns dict)
values = frappe.db.get_value("User", "admin@example.com",
                             ["full_name", "email", "enabled"],
                             as_dict=True)

# With filters (instead of name)
email = frappe.db.get_value("User",
                           {"enabled": 1, "name": "admin@example.com"},
                           "email")

# Pseudocode:
# function get_value(doctype, name, fieldname):
#     query = "SELECT {fieldname} FROM `tab{doctype}`
#              WHERE name = {name}"
#     result = execute(query)
#     return result[0]  # Just the value, not full doc
#
# More efficient than:
# doc = get_doc(doctype, name)  # Loads ALL fields
# value = doc.fieldname
```
x??

---

#### Query Builder - frappe.qb
The query builder (frappe.qb) is based on PyPika and provides a Pythonic way to construct SQL queries. It's type-safe, prevents SQL injection, and is more maintainable than raw SQL.

You create DocType objects and chain methods to build queries.

:p How do you use the query builder (frappe.qb) to construct SQL queries?
??x
Use frappe.qb with DocType objects to build type-safe queries.

```python
from frappe.query_builder import DocType

# Create DocType reference
User = DocType("User")

# Build and execute query
query = (
    frappe.qb.from_(User)
    .select(User.name, User.email, User.full_name)
    .where(User.enabled == 1)
    .where(User.name.like("%admin%"))
    .orderby(User.creation, order="desc")
    .limit(10)
)

results = query.run(as_dict=True)

# Pseudocode translation:
# SELECT name, email, full_name
# FROM `tabUser`
# WHERE enabled = 1
#   AND name LIKE '%admin%'
# ORDER BY creation DESC
# LIMIT 10

# Benefits over raw SQL:
# 1. Type-safe (catches errors early)
# 2. Prevents SQL injection automatically
# 3. More readable and maintainable
# 4. IDE autocomplete support
```
x??

---

#### Whitelisted Methods
The @frappe.whitelist() decorator exposes Python methods as API endpoints. Without this decorator, methods cannot be called from the client side (security feature).

Whitelisted methods are accessible via REST API at /api/method/{method_path}

:p What does the @frappe.whitelist() decorator do and why is it needed?
??x
@frappe.whitelist() exposes a Python method as a callable API endpoint.

Without it, client-side code cannot call the method (security protection).

```python
import frappe

# NOT accessible from client
def internal_method():
    return "Cannot call from client"

# Accessible from client via API
@frappe.whitelist()
def get_user_info(email):
    user = frappe.get_doc("User", email)
    return {
        "name": user.full_name,
        "email": user.email
    }

# Client-side JavaScript can call:
frappe.call({
    method: "myapp.api.get_user_info",
    args: {email: "test@example.com"},
    callback: function(r) {
        console.log(r.message);
    }
});

// Pseudocode flow:
// Client: POST /api/method/myapp.api.get_user_info
//         with args: {email: "test@example.com"}
// Server: Check if method has @whitelist decorator
//         If yes: Execute method and return result
//         If no: Return 403 Forbidden error
```
x??

---

#### Hooks System - doc_events
Hooks allow apps to extend Frappe without modifying core code. doc_events hooks trigger on document lifecycle events (before_insert, on_update, etc.)

Defined in hooks.py of each app, they follow a specific format.

:p How do you use doc_events hooks to run code on document lifecycle events?
??x
Define doc_events in your app's hooks.py to hook into document lifecycle.

```python
# In hooks.py
doc_events = {
    "User": {
        "before_insert": "myapp.user.before_user_insert",
        "after_insert": "myapp.user.after_user_insert",
        "on_update": "myapp.user.on_user_update",
        "on_trash": "myapp.user.on_user_trash",
    },
    # Wildcard for all doctypes
    "*": {
        "before_save": "myapp.utils.log_all_saves"
    }
}

# In myapp/user.py
def before_user_insert(doc, method):
    # doc = the User document being inserted
    # method = "before_insert"
    doc.custom_field = "default_value"

def after_user_insert(doc, method):
    # Send welcome email
    frappe.sendmail(recipients=doc.email,
                   subject="Welcome!")

# Execution flow:
# user.insert() called
#   → before_insert() on controller
#   → before_user_insert() from hooks
#   → INSERT INTO database
#   → after_insert() on controller
#   → after_user_insert() from hooks
```
x??

---

#### Virtual DocTypes
Virtual DocTypes don't have corresponding database tables. They're used for views, reports, or computed data. The is_virtual flag is set to 1.

All data operations must be overridden in the controller.

:p What is a Virtual DocType and when would you use it?
??x
A Virtual DocType has no database table - data is computed or fetched from external sources.

Use cases:
- Dashboard views
- Report aggregations
- External API integrations
- Computed/derived data

```python
# In DocType definition
{
    "doctype": "DocType",
    "name": "Server Status",
    "is_virtual": 1
}

# In controller
class ServerStatus(Document):
    def db_insert(self):
        # Override - don't insert to DB
        pass

    def load_from_db(self):
        # Override - compute data instead
        self.cpu_usage = get_cpu_usage()
        self.memory = get_memory_usage()
        self.disk = get_disk_usage()

    def db_update(self):
        # Override - don't update DB
        pass

# Usage (same as regular DocType)
status = frappe.get_doc("Server Status", "localhost")
# But data comes from load_from_db(), not database

# Pseudocode:
# Regular DocType:
#   get_doc() → SELECT FROM tabDocType
# Virtual DocType:
#   get_doc() → controller.load_from_db()
#               → compute/fetch data
#               → populate fields
```
x??

---

#### Child Tables
Child Tables are DocTypes with istable=1 flag. They represent related records that belong to a parent document (one-to-many relationship).

Child tables always have a parent and parenttype field.

:p How do Child Tables work in Frappe and how do you define them?
??x
Child Tables are dependent DocTypes that belong to a parent (one-to-many).

```python
# Parent DocType: "Invoice"
# Child DocType: "Invoice Item" (istable=1)

# Define child table relationship in parent:
{
    "fieldname": "items",
    "fieldtype": "Table",
    "options": "Invoice Item"  # Child DocType name
}

# Usage - creating parent with children:
invoice = frappe.get_doc({
    "doctype": "Invoice",
    "customer": "CUST-001",
    "items": [
        {
            "item_code": "ITEM-001",
            "qty": 5,
            "rate": 100
        },
        {
            "item_code": "ITEM-002",
            "qty": 3,
            "rate": 200
        }
    ]
})
invoice.insert()

# Database structure:
# tabInvoice: id, customer, creation
# tabInvoice Item: name, parent, parenttype, item_code, qty
#
# Query to get child records:
# SELECT * FROM `tabInvoice Item`
# WHERE parent = 'INV-001' AND parenttype = 'Invoice'

# Accessing children:
for item in invoice.items:
    print(item.item_code, item.qty)
```
x??

---

#### Naming Series
Naming series automatically generates sequential names for documents. Format: PREFIX.####. Configured per DocType in the naming_series field.

The series counter is stored in tabSeries.

:p How does Frappe's naming series system work?
??x
Naming series auto-generates sequential document names with a prefix.

```python
# In DocType setup:
# naming_series field with options like:
# "INV-.YYYY.-.####"
# "CUST-.####"

# When document is inserted:
invoice = frappe.get_doc({
    "doctype": "Invoice",
    "naming_series": "INV-.YYYY.-"
})
invoice.insert()
# Generated name: "INV-2025-0001"

# Next insert:
# Generated name: "INV-2025-0002"

# Pseudocode logic:
# function set_new_name(doc):
#     series = doc.naming_series  # "INV-.YYYY.-"
#     series = replace_placeholders(series)  # "INV-2025-"
#
#     # Get current counter from tabSeries
#     current = get_series_counter("INV-2025-")  # Returns 0
#     current = current + 1  # Increment
#
#     # Pad with zeros
#     name = series + pad_with_zeros(current, 4)  # "INV-2025-0001"
#
#     # Update counter
#     update_series_counter("INV-2025-", current)
#
#     doc.name = name

# Available placeholders:
# .YYYY. = Year (2025)
# .MM. = Month (01-12)
# .DD. = Day (01-31)
# .#### = Counter with padding
```
x??

---

#### Permissions - Role-Based
Frappe uses role-based permissions. Users have roles, and DocTypes have permissions defined per role. Permissions control read, write, create, delete, submit, cancel operations.

Defined in DocPerm child table of DocType.

:p How does role-based permission system work in Frappe?
??x
Users have roles, DocTypes have permissions per role defining allowed operations.

```python
# DocPerm structure (child table of DocType)
{
    "role": "Sales User",
    "read": 1,
    "write": 1,
    "create": 1,
    "delete": 0,
    "submit": 0,
    "cancel": 0,
    "if_owner": 0  # Only if user is doc owner
}

# Checking permissions:
if frappe.has_permission("Invoice", "write", doc):
    doc.total = 1000
    doc.save()
else:
    frappe.throw("No permission to modify")

# Pseudocode for permission check:
# function has_permission(doctype, perm_type, doc):
#     user_roles = get_user_roles(frappe.session.user)
#     docperms = get_doctype_permissions(doctype)
#
#     for role in user_roles:
#         for docperm in docperms:
#             if docperm.role == role:
#                 if docperm[perm_type] == 1:
#                     if docperm.if_owner:
#                         return doc.owner == frappe.session.user
#                     return True
#     return False

# Permission levels (0-9):
# Level 0: Parent document fields
# Level 1+: Child table fields at specific levels
```
x??

---

#### User Permissions
User Permissions restrict which specific documents a user can access, beyond role permissions. For example, limiting a user to see only their branch's data.

Stored in "User Permission" DocType.

:p What are User Permissions and how do they differ from role permissions?
??x
User Permissions restrict access to specific document instances, not just DocTypes.

```python
# Role Permission: Can read "Branch" DocType
# User Permission: Can ONLY read "Branch-Mumbai"

# Example: User can only see Mumbai branch invoices
User Permission:
{
    "user": "sales@example.com",
    "allow": "Branch",
    "for_value": "Mumbai",
    "applicable_for": "Invoice"  # Apply to Invoice DocType
}

# Result:
# User can access: Invoice-001 (branch=Mumbai)
# User CANNOT access: Invoice-002 (branch=Delhi)

# In code - automatically applied:
invoices = frappe.get_all("Invoice")
# Query becomes:
# SELECT * FROM tabInvoice
# WHERE branch = 'Mumbai'  -- Auto-added filter

# Pseudocode:
# function get_all(doctype):
#     query = "SELECT * FROM tab{doctype}"
#
#     # Get user permissions
#     user_perms = get_user_permissions(user, doctype)
#
#     # Add filters based on permissions
#     for perm in user_perms:
#         query += " WHERE {perm.allow} = {perm.for_value}"
#
#     return execute(query)

# Comparison:
# Role Permissions: "Can you access this type of document?"
# User Permissions: "Which specific documents can you see?"
```
x??

---

#### Background Jobs - frappe.enqueue
frappe.enqueue() sends tasks to Redis Queue (RQ) for background processing. Prevents timeout on long-running operations.

Jobs are processed by worker processes asynchronously.

:p How do you run background jobs in Frappe using frappe.enqueue()?
??x
Use frappe.enqueue() to run tasks asynchronously in background workers.

```python
import frappe

# Enqueue a method
frappe.enqueue(
    method="myapp.tasks.send_bulk_emails",
    queue="default",  # or 'long', 'short'
    timeout=300,  # seconds
    is_async=True,
    now=False,  # If True, runs synchronously
    job_name="send-emails",  # Unique identifier
    # Method arguments:
    recipients=["user1@ex.com", "user2@ex.com"],
    subject="Hello"
)

# In myapp/tasks.py
def send_bulk_emails(recipients, subject):
    for recipient in recipients:
        frappe.sendmail(
            recipients=[recipient],
            subject=subject,
            message="Email body"
        )

# Pseudocode flow:
# 1. Main request thread:
#    frappe.enqueue()
#    → Serialize method + args
#    → Push to Redis queue
#    → Return immediately (don't wait)
#
# 2. Worker process (separate):
#    → Poll Redis queue
#    → Get job
#    → Deserialize method + args
#    → Execute method
#    → Mark job complete/failed

# Queue types:
# 'short': Quick jobs (< 5 min)
# 'default': Normal jobs (< 10 min)
# 'long': Long jobs (hours)

# Check job status:
frappe.get_doc("RQ Job", job_name)
```
x??

---

#### Scheduled Jobs - Cron-like
Frappe supports scheduled jobs via hooks. Jobs run at specified intervals (daily, hourly, weekly, etc.) processed by the scheduler.

Defined in hooks.py with scheduler_events.

:p How do you set up scheduled/cron jobs in Frappe?
??x
Define scheduler_events in hooks.py for periodic task execution.

```python
# In hooks.py
scheduler_events = {
    # Run every hour
    "hourly": [
        "myapp.tasks.sync_external_data"
    ],
    # Run daily at midnight
    "daily": [
        "myapp.tasks.generate_daily_report",
        "myapp.tasks.cleanup_old_logs"
    ],
    # Run weekly on Sunday
    "weekly": [
        "myapp.tasks.weekly_backup"
    ],
    # Run monthly on 1st
    "monthly": [
        "myapp.tasks.monthly_reconciliation"
    ],
    # Specific cron expression
    "cron": {
        "0 9 * * *": [  # Every day at 9 AM
            "myapp.tasks.morning_reminder"
        ]
    }
}

# In myapp/tasks.py
def generate_daily_report():
    report = create_report()
    frappe.sendmail(
        recipients=["admin@example.com"],
        subject="Daily Report",
        content=report
    )

# Execution flow:
# 1. bench start starts scheduler process
# 2. Scheduler checks time every minute
# 3. If scheduled time matches:
#    → Enqueue job to background worker
#    → Worker executes method
#
# Pseudocode:
# while scheduler_running:
#     current_time = get_current_time()
#
#     if current_time.minute == 0:  # Every hour
#         for method in hourly_jobs:
#             enqueue(method)
#
#     if current_time.hour == 0 and minute == 0:  # Daily
#         for method in daily_jobs:
#             enqueue(method)
#
#     sleep(60)  # Check every minute
```
x??

---

#### frappe.db.commit vs rollback
Database transactions must be explicitly committed or rolled back. Frappe auto-commits after each request, but you can control this for atomicity.

frappe.db.rollback() undoes all changes since last commit.

:p When and how do you use frappe.db.commit() and frappe.db.rollback()?
??x
Use commit() to save changes, rollback() to undo changes in current transaction.

```python
import frappe

def transfer_money(from_account, to_account, amount):
    try:
        # Start transaction (implicit)

        # Deduct from source
        from_doc = frappe.get_doc("Account", from_account)
        from_doc.balance -= amount
        from_doc.save()

        # Add to destination
        to_doc = frappe.get_doc("Account", to_account)
        to_doc.balance += amount
        to_doc.save()

        # Explicitly commit
        frappe.db.commit()

    except Exception as e:
        # Undo all changes
        frappe.db.rollback()
        frappe.throw(f"Transfer failed: {str(e)}")

# Pseudocode:
# function transfer_money():
#     BEGIN TRANSACTION
#
#     try:
#         UPDATE tabAccount SET balance = balance - 100
#         WHERE name = 'ACC-001'
#
#         UPDATE tabAccount SET balance = balance + 100
#         WHERE name = 'ACC-002'
#
#         COMMIT  # Make changes permanent
#
#     catch error:
#         ROLLBACK  # Undo both UPDATEs
#         raise error

# Auto-commit behavior:
# After each web request, Frappe automatically commits
# unless an error occurred (then rollback)
#
# Manual control needed for:
# - Multi-step operations (atomicity)
# - Background jobs
# - Custom scripts
```
x??

---

#### frappe.get_all vs frappe.get_list
Both fetch multiple documents, but get_list() applies user permissions while get_all() ignores them (admin access).

get_all() is faster but should be used carefully.

:p What is the difference between frappe.get_all() and frappe.get_list()?
??x
- **get_list()**: Applies user permissions (filtered by role/user perms)
- **get_all()**: Ignores permissions (admin-level access)

```python
import frappe

# get_list - Respects permissions
invoices = frappe.get_list("Invoice",
    filters={"status": "Paid"},
    fields=["name", "customer", "total"],
    order_by="creation desc",
    limit=10
)
# User only sees invoices they have permission to view

# get_all - Ignores permissions (use carefully!)
all_invoices = frappe.get_all("Invoice",
    filters={"status": "Paid"},
    fields=["name", "customer", "total"]
)
# Returns ALL invoices regardless of user permissions

# Pseudocode difference:
# get_list(doctype, filters):
#     query = build_query(doctype, filters)
#     query = apply_user_permissions(query, user)
#     query = apply_role_permissions(query, user)
#     return execute(query)
#
# get_all(doctype, filters):
#     query = build_query(doctype, filters)
#     # NO permission filtering
#     return execute(query)

# Use cases:
# get_list(): User-facing features (shows filtered data)
# get_all(): Backend/admin operations, reports, scheduled jobs

# Common options (both methods):
filters = {"status": "Open", "creation": [">", "2025-01-01"]}
fields = ["name", "customer"]  # Specific fields only
order_by = "creation desc"
limit_page_length = 20
as_list = True  # Return tuples instead of dicts
```
x??

---

#### frappe.throw vs raise
frappe.throw() is preferred over Python's raise for user-facing errors. It displays messages nicely in the UI and can be translated.

raise is for unexpected errors/bugs.

:p When should you use frappe.throw() versus Python's raise statement?
??x
- **frappe.throw()**: User-facing validation errors (displays in UI)
- **raise**: Unexpected errors, bugs, system errors

```python
import frappe

def validate_invoice(doc):
    # User-facing validation - use throw
    if not doc.customer:
        frappe.throw("Customer is mandatory")

    if doc.total < 0:
        frappe.throw("Total cannot be negative",
                    frappe.ValidationError)

    # Unexpected error - use raise
    if doc.items is None:  # Should never happen
        raise ValueError("Items list is None - this is a bug")

# frappe.throw() benefits:
# 1. Displays in UI with nice formatting
# 2. Can be translated to user's language
# 3. Specific exception types (ValidationError, PermissionError)
# 4. Rollsback database automatically

# Pseudocode execution:
# try:
#     doc.save()
#
#     if validation_fails:
#         frappe.throw("Error message")
#         # → Stops execution
#         # → Rollsback database
#         # → Returns error to client
#         # → Client shows error in red alert
#
# except Exception as e:
#     frappe.db.rollback()
#     return error_response(e)

# Common exception types:
frappe.throw("Message", frappe.ValidationError)
frappe.throw("Message", frappe.PermissionError)
frappe.throw("Message", frappe.DoesNotExistError)
frappe.throw("Message", frappe.DuplicateEntryError)

# Translated messages:
frappe.throw(_("Customer is mandatory"))
# _ function translates to user's language
```
x??

---

#### frappe.msgprint vs print
frappe.msgprint() displays messages to the user in the web interface. print() only outputs to server console (not visible to users).

msgprint() supports different indicators (red, green, blue, orange).

:p How do you display messages to users in Frappe?
??x
Use frappe.msgprint() to show messages in the UI, not print().

```python
import frappe

def process_order(order_id):
    # Wrong - user won't see this
    print("Processing order...")  # Only in server logs

    # Right - displays in UI
    frappe.msgprint("Processing order...", indicator="blue")

    # Process order
    order = frappe.get_doc("Order", order_id)
    order.submit()

    # Success message
    frappe.msgprint("Order processed successfully!",
                   indicator="green",
                   title="Success")

    # Warning message
    if order.total > 10000:
        frappe.msgprint("High value order - review required",
                       indicator="orange",
                       alert=True)  # Shows as alert popup

# Indicators:
# "green" - Success
# "blue" - Information
# "orange" - Warning
# "red" - Error (or use frappe.throw)

# Pseudocode flow:
# Server:
#   frappe.msgprint("Message")
#   → Store message in response object
#   → Return response to client
#
# Client (browser):
#   Receive response
#   → Extract messages
#   → Display as notification/alert
#   → Auto-hide after few seconds (unless alert=True)

# Multiple messages:
frappe.msgprint("Step 1 complete")
frappe.msgprint("Step 2 complete")
frappe.msgprint("All done!", indicator="green")
# All show sequentially in UI

# Debug messages (only if developer mode):
frappe.msgprint("Debug info", raise_exception=False)
```
x??

---

#### frappe.db.exists
Check if a document exists without loading it (very efficient). Returns the document name if exists, None otherwise.

Much faster than get_doc() for existence checks.

:p How do you efficiently check if a document exists in the database?
??x
Use frappe.db.exists() - much faster than loading the full document.

```python
import frappe

# Check if exists by name
if frappe.db.exists("User", "admin@example.com"):
    print("User exists")

# Check with filters
if frappe.db.exists("Invoice", {"customer": "CUST-001", "status": "Paid"}):
    print("Paid invoice for customer exists")

# Get the name if exists
invoice_name = frappe.db.exists("Invoice", {"customer": "CUST-001"})
if invoice_name:
    print(f"Found invoice: {invoice_name}")

# Inefficient way (DON'T DO THIS):
try:
    user = frappe.get_doc("User", "admin@example.com")
    exists = True
except:
    exists = False
# This loads entire document just to check existence!

# Pseudocode:
# function exists(doctype, name_or_filters):
#     if is_string(name_or_filters):
#         # Simple name check
#         query = "SELECT name FROM `tab{doctype}`
#                  WHERE name = {name_or_filters} LIMIT 1"
#     else:
#         # Filter check
#         query = "SELECT name FROM `tab{doctype}`
#                  WHERE {filters} LIMIT 1"
#
#     result = execute(query)
#     return result[0] if result else None

# Performance:
# exists(): SELECT name only (fast, minimal data)
# get_doc(): SELECT * (slow, loads all fields + children)
```
x??

---

#### Link Fields
Link fields create relationships between DocTypes. They store the name of another document, enforcing referential integrity.

Frappe validates that linked documents exist.

:p How do Link fields work in Frappe and what do they validate?
??x
Link fields create references to other documents with automatic validation.

```python
# DocType field definition:
{
    "fieldname": "customer",
    "fieldtype": "Link",
    "options": "Customer"  # Target DocType
}

# Usage:
invoice = frappe.get_doc({
    "doctype": "Invoice",
    "customer": "CUST-001"  # Must be valid Customer name
})

# Validation happens on save:
invoice.save()
# → Frappe checks: Does "CUST-001" exist in Customer DocType?
# → If not: frappe.throw("Customer CUST-001 does not exist")

# Pseudocode validation:
# function validate_links(doc):
#     for field in doc.get_link_fields():
#         link_value = doc.get(field.fieldname)
#         link_doctype = field.options
#
#         if link_value:
#             exists = db.exists(link_doctype, link_value)
#             if not exists:
#                 throw(f"{link_doctype} {link_value} not found")

# In UI:
# Link fields show autocomplete dropdown
# Type "CUS" → shows matching Customer names

# Fetching linked data:
invoice = frappe.get_doc("Invoice", "INV-001")
customer_name = frappe.db.get_value("Customer",
                                    invoice.customer,
                                    "customer_name")

# Or use get_doc to get full linked document:
customer = frappe.get_doc("Customer", invoice.customer)
print(customer.customer_name)
```
x??

---

#### Select Fields vs Link Fields
Select fields are dropdowns with fixed options (defined in metadata). Link fields reference other documents (dynamic options from database).

Select is for static lists, Link is for relationships.

:p What is the difference between Select and Link field types?
??x
- **Select**: Fixed options defined in field metadata (static dropdown)
- **Link**: References to other documents (dynamic from database)

```python
# SELECT FIELD
# Fixed options defined in DocType
{
    "fieldname": "status",
    "fieldtype": "Select",
    "options": "Draft\nSubmitted\nCancelled"
    # Options are hardcoded, separated by \n
}

# Usage:
doc.status = "Draft"  # Must be one of the defined options
# Validation: Value must match one of the options


# LINK FIELD
# References another DocType
{
    "fieldname": "customer",
    "fieldtype": "Link",
    "options": "Customer"
    # Options come from Customer DocType records
}

# Usage:
doc.customer = "CUST-001"  # Must exist in Customer DocType
# Validation: Document must exist in database


# Pseudocode differences:
# Select validation:
# function validate_select(value, field):
#     allowed = field.options.split("\n")
#     if value not in allowed:
#         throw("Invalid option")
#
# Link validation:
# function validate_link(value, field):
#     if not db.exists(field.options, value):
#         throw("Document not found")

# When to use:
# Select: Status, priority, category (fixed list)
# Link: Customer, item, warehouse (dynamic, grows over time)

# Example comparison:
# Status: "Open", "Closed", "Pending" → Select
# Customer: "CUST-001", "CUST-002", ... → Link
```
x??

---

#### frappe.session
frappe.session contains current user session data (user, roles, IP, etc.). Available globally during request processing.

Automatically populated on each request.

:p What information is available in frappe.session?
??x
frappe.session contains current user's session data and context.

```python
import frappe

# Current user
current_user = frappe.session.user
# e.g., "admin@example.com"

# User's full name
user_fullname = frappe.session.data.full_name

# User's roles
user_roles = frappe.session.data.user_roles
# ["System Manager", "Sales User"]

# Check if user has specific role
if "System Manager" in frappe.session.user_roles:
    # Allow admin operation
    pass

# Session ID
session_id = frappe.session.sid

# User's IP address
user_ip = frappe.session.data.user_ip

# Device (mobile/desktop)
device = frappe.session.data.device

# Pseudocode session creation:
# On each HTTP request:
# function init_session():
#     # Get session cookie
#     sid = get_cookie("sid")
#
#     # Load from cache/database
#     session_data = redis.get(f"session:{sid}")
#
#     # Populate frappe.session
#     frappe.session.user = session_data["user"]
#     frappe.session.user_roles = get_user_roles(user)
#     frappe.session.data = session_data
#
#     # Session available throughout request

# Common usage:
def get_user_invoices():
    # Automatically filtered by current user
    return frappe.get_all("Invoice",
                         filters={"owner": frappe.session.user})

# Session isolation:
# Each request has its own session
# No data leakage between users/requests
```
x??

---

#### frappe.db.set_value
Efficiently update a single field without loading the full document. Bypasses controller hooks and validation (use carefully).

Direct database update - faster but no validation.

:p When and how should you use frappe.db.set_value()?
??x
Use frappe.db.set_value() for quick single-field updates without loading the document.

**Warning**: Bypasses validation and controller hooks!

```python
import frappe

# Update single field
frappe.db.set_value("User", "admin@example.com", "full_name", "Admin User")

# Update multiple fields
frappe.db.set_value("Invoice", "INV-001", {
    "status": "Paid",
    "paid_amount": 1000
})

# When to use:
# ✓ Simple status updates
# ✓ Counter increments
# ✓ Background jobs updating flags
# ✓ Performance-critical updates

# When NOT to use:
# ✗ When validation is needed
# ✗ When hooks should trigger
# ✗ Complex business logic

# Comparison:
# SLOW (loads full doc, runs hooks):
doc = frappe.get_doc("Invoice", "INV-001")
doc.status = "Paid"
doc.save()  # Runs validate(), on_update(), etc.

# FAST (direct update, no hooks):
frappe.db.set_value("Invoice", "INV-001", "status", "Paid")

# Pseudocode:
# function set_value(doctype, name, fieldname, value):
#     # Direct SQL UPDATE
#     query = "UPDATE `tab{doctype}`
#              SET {fieldname} = {value},
#                  modified = NOW(),
#                  modified_by = {current_user}
#              WHERE name = {name}"
#     execute(query)
#
#     # NO validation
#     # NO hooks (before_save, validate, etc.)
#     # NO child table loading
#
#     # Clear cache
#     clear_document_cache(doctype, name)

# Auto-updated fields:
# - modified (timestamp)
# - modified_by (current user)
```
x??

---

#### frappe.db.count
Get count of documents matching filters without fetching all records. Much more efficient than len(frappe.get_all()).

Returns integer count directly from database.

:p How do you efficiently count documents matching certain criteria?
??x
Use frappe.db.count() instead of loading all documents and counting.

```python
import frappe

# Count all users
total_users = frappe.db.count("User")

# Count with filters
active_users = frappe.db.count("User", {"enabled": 1})

# Count with complex filters
pending_invoices = frappe.db.count("Invoice", {
    "status": "Pending",
    "creation": [">", "2025-01-01"]
})

# INEFFICIENT - Don't do this:
all_users = frappe.get_all("User")
count = len(all_users)
# Loads ALL user data just to count!

# Pseudocode comparison:
# INEFFICIENT:
# function bad_count():
#     query = "SELECT * FROM `tabUser`"
#     results = execute(query)  # Loads ALL data
#     return len(results)  # Count in Python
#
# EFFICIENT:
# function db.count(doctype, filters):
#     query = "SELECT COUNT(*) FROM `tab{doctype}`
#              WHERE {filters}"
#     result = execute(query)  # Database counts
#     return result[0]  # Just a number

# Performance difference:
# get_all then len():
#   - Transfers all data to Python
#   - Uses memory for all records
#   - Slow for large tables
#
# db.count():
#   - Database does counting
#   - Returns single integer
#   - Fast regardless of table size

# Example usage in pagination:
total = frappe.db.count("Invoice", {"status": "Open"})
per_page = 20
total_pages = total // per_page + (1 if total % per_page else 0)
```
x??

---

#### Data Types - Currency
Currency field type stores decimal numbers with precision. Automatically formats based on currency settings and system locale.

Usually set to 6-9 decimal places for precision.

:p How does the Currency field type work in Frappe?
??x
Currency fields store monetary values with high precision and automatic formatting.

```python
# Field definition:
{
    "fieldname": "total_amount",
    "fieldtype": "Currency",
    "precision": 2  # Decimal places in display
}

# Storage:
# Stored as DECIMAL in database with high precision
# Database: DECIMAL(18, 6) - 6 decimal places internally
# Display: Rounded to 2 decimal places (or as per precision)

# Usage:
invoice = frappe.get_doc({
    "doctype": "Invoice",
    "total_amount": 1234.56789
})
# Stored: 1234.567890 (full precision)
# Displayed: 1,234.57 (formatted, rounded)

# Formatting:
from frappe.utils import fmt_money
formatted = fmt_money(1234.56, currency="USD")
# Output: "$1,234.56"

formatted = fmt_money(1234.56, currency="EUR")
# Output: "€1,234.56"

# Pseudocode behavior:
# function save_currency(value):
#     # Store with full precision
#     db_value = DECIMAL(value, precision=6)
#
# function display_currency(value, precision=2):
#     # Round for display
#     rounded = round(value, precision)
#     # Format with thousand separators
#     formatted = add_thousand_separators(rounded)
#     return formatted

# Why high precision storage?
# Prevents rounding errors in calculations:
#
# Example calculation:
# rate = 10.123456
# qty = 3
# amount = rate * qty  # = 30.370368
#
# If stored with only 2 decimals (10.12):
# amount = 10.12 * 3 = 30.36 (WRONG!)
# Lost 0.01 due to premature rounding

# Float vs Currency:
# Float: Approximate, rounding errors
# Currency: Exact, high precision DECIMAL type
```
x??

---

#### frappe.local
frappe.local is a thread-local storage for request-specific data. Each request has isolated frappe.local namespace.

Useful for storing data during request processing without global variables.

:p What is frappe.local and when would you use it?
??x
frappe.local is thread-local storage for request-specific temporary data.

```python
import frappe

# Store data in current request context
frappe.local.custom_flag = True
frappe.local.request_start_time = time.time()
frappe.local.processed_items = []

# Access later in same request
if frappe.local.custom_flag:
    # Do something
    pass

# Common built-in uses:
frappe.local.form_dict  # Request parameters
frappe.local.request    # HTTP request object
frappe.local.response   # HTTP response object
frappe.local.session    # Current session data
frappe.local.lang       # User's language

# Example - track processing time:
def before_request():
    frappe.local.start_time = time.time()

def after_request():
    elapsed = time.time() - frappe.local.start_time
    print(f"Request took {elapsed}s")

# Pseudocode implementation:
# frappe.local uses Python's threading.local
#
# class LocalStorage(threading.local):
#     pass
#
# frappe.local = LocalStorage()
#
# Request 1 (Thread A):
#   frappe.local.user = "user1@example.com"
#
# Request 2 (Thread B):
#   frappe.local.user = "user2@example.com"
#
# No conflict - each thread has isolated storage

# Use cases:
# ✓ Request-specific flags/settings
# ✓ Temporary caching within request
# ✓ Tracking request metrics
# ✓ Passing data between functions in same request

# Don't use for:
# ✗ Persistent data (use database)
# ✗ Cross-request communication (use cache)
# ✗ Background jobs (different process)

# Thread safety:
# Each thread has its own frappe.local
# No locking needed
# Automatically cleaned up after request
```
x??

