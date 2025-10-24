# Frappe Framework Expert Concepts - Flashcards

#### frappe.db.sql_list() Quick Value Lists
When you need just a list of values from a single column (like all user emails), sql_list() returns a flat Python list instead of list of tuples. More convenient than sql() for single-column queries.

```python
# Pseudocode:
# sql() returns: [('email1',), ('email2',), ('email3',)]
# sql_list() returns: ['email1', 'email2', 'email3']
```

:p How do you get a flat list of values from a single database column?
??x
Use `frappe.db.sql_list()` for single-column queries.

```python
# Regular sql (returns tuples):
result = frappe.db.sql("SELECT email FROM `tabUser`")
# [('user1@ex.com',), ('user2@ex.com',)]
emails = [r[0] for r in result]  # Extract from tuples

# sql_list (returns flat list):
emails = frappe.db.sql_list("SELECT email FROM `tabUser`")
# ['user1@ex.com', 'user2@ex.com']

# Pseudocode:
# function sql_list(query):
#     results = execute_query(query)
#     # SELECT returns [(val1,), (val2,), (val3,)]
#     flat_list = [row[0] for row in results]
#     return flat_list
```
x??

---

#### frappe.db.get_single_value() Quick Setting Access
Single DocTypes store global settings. get_single_value() fetches one field value from a Single DocType without loading the entire document. Efficient for reading configuration values.

:p How do you quickly read a single setting value from a Single DocType?
??x
Use `frappe.db.get_single_value(doctype, fieldname)`.

```python
# Get single setting value
timezone = frappe.db.get_single_value("System Settings",
                                      "time_zone")

# Compare to loading full document (slower):
settings = frappe.get_single("System Settings")
timezone = settings.time_zone

# Pseudocode:
# function get_single_value(doctype, field):
#     query = "SELECT {field} FROM `tabSingles`
#              WHERE doctype = {doctype}
#              AND field = {field}"
#     return execute(query)[0]
#
# Versus get_single():
#     query = "SELECT * FROM `tabSingles`
#              WHERE doctype = {doctype}"
#     # Loads ALL fields, slower
```
x??

---

#### frappe.db.set_single_value() Quick Setting Update
Directly update a Single DocType field value without loading the document. Bypasses validation - use carefully for simple setting updates.

:p How do you update a system setting without loading the entire Single DocType?
??x
Use `frappe.db.set_single_value(doctype, field, value)`.

```python
# Update single field
frappe.db.set_single_value("System Settings",
                           "enable_scheduler",
                           1)

# Multiple fields at once
frappe.db.set_single_value("System Settings", {
    "enable_scheduler": 1,
    "time_zone": "America/New_York"
})

# Pseudocode:
# function set_single_value(doctype, field, value):
#     UPDATE `tabSingles`
#     SET value = {value}
#     WHERE doctype = {doctype}
#       AND field = {field}
#
#     clear_cache(doctype)
```
x??

---

#### frappe.db.delete() Bulk Delete
Delete records matching criteria without loading documents. Much faster than get_doc().delete() for bulk operations. Bypasses controller hooks.

:p How do you efficiently delete multiple records matching criteria?
??x
Use `frappe.db.delete(doctype, filters)` for bulk deletion.

```python
# Delete all inactive users
frappe.db.delete("User", {
    "enabled": 0,
    "creation": ["<", "2020-01-01"]
})

# Delete by name list
frappe.db.delete("Book", {
    "name": ["in", ["book-1", "book-2", "book-3"]]
})

# Pseudocode:
# function delete(doctype, filters):
#     where_clause = build_where(filters)
#     query = f"DELETE FROM `tab{doctype}`
#              WHERE {where_clause}"
#     execute(query)
#     # No hooks fired!
#     # No on_trash() called!
#     clear_cache(doctype)
#
# Compare to:
# for name in names:
#     doc = get_doc(doctype, name)
#     doc.delete()  # Calls hooks, slower
```
x??

---

#### frappe.utils.cint() Safe Integer Conversion
Convert any value to integer safely. Returns 0 for None, empty strings, or non-numeric values instead of throwing errors. Essential for form data processing.

:p How do you safely convert a value to integer without raising exceptions?
??x
Use `frappe.utils.cint(value, default=0)`.

```python
from frappe.utils import cint

# Safe conversions
cint("123")      # 123
cint("12.7")     # 12 (truncates)
cint(None)       # 0
cint("")         # 0
cint("abc")      # 0
cint("42", 99)   # 42 (custom default unused)
cint("", 99)     # 99 (custom default)

# Use case - form data:
page = cint(frappe.form_dict.get("page"))  # Safe even if missing
limit = cint(frappe.form_dict.get("limit"), 20)  # Default 20

# Pseudocode:
# function cint(value, default=0):
#     if value is None or value == "":
#         return default
#     try:
#         return int(float(value))  # Handle "12.7"
#     except:
#         return default
```
x??

---

#### frappe.utils.flt() Safe Float Conversion
Convert to float with precision control. Like cint() but for decimals. Handles None, empty strings, and includes rounding to specified decimals.

:p How do you safely convert to float with precision control?
??x
Use `frappe.utils.flt(value, precision=None)`.

```python
from frappe.utils import flt

# Safe float conversion
flt("123.456")           # 123.456
flt("123.456", 2)        # 123.46 (rounded)
flt(None)                # 0.0
flt("")                  # 0.0
flt("abc")               # 0.0
flt("12.99", 0)          # 13.0

# Financial calculations
rate = flt(doc.rate, 2)      # 2 decimals
qty = flt(doc.qty)
total = flt(rate * qty, 2)   # Round result

# Pseudocode:
# function flt(value, precision=None):
#     if value is None or value == "":
#         return 0.0
#     try:
#         num = float(value)
#         if precision is not None:
#             num = round(num, precision)
#         return num
#     except:
#         return 0.0
```
x??

---

#### frappe.utils.cstr() Safe String Conversion
Convert any value to string safely. Handles None, lists, dicts. Essential for logging and display where str() might fail on None.

:p How do you convert any value to string without errors?
??x
Use `frappe.utils.cstr(value)`.

```python
from frappe.utils import cstr

cstr(None)           # ""
cstr(123)            # "123"
cstr([1, 2, 3])      # "[1, 2, 3]"
cstr({"a": 1})       # "{'a': 1}"

# Safe logging
frappe.log_error(cstr(some_value))  # Won't fail

# Pseudocode:
# function cstr(value):
#     if value is None:
#         return ""
#     return str(value)
```
x??

---

#### frappe.bold() Text Formatting
Format text as bold for msgprint and logs. Part of Frappe's HTML helper functions for user-facing messages.

:p How do you show bold text in user messages?
??x
Use `frappe.bold(text)` to wrap text in bold tags.

```python
import frappe

frappe.msgprint(f"Book {frappe.bold('Clean Code')} is available")
# Displays: Book <b>Clean Code</b> is available

# In validation messages
frappe.throw(f"{frappe.bold(doc.title)} already exists")

# Pseudocode:
# function bold(text):
#     return f"<b>{text}</b>"
```
x??

---

#### frappe.db.get_list() vs get_all() Detail
Both fetch multiple records but get_list() applies permissions and user filters while get_all() ignores them. get_list() is user-safe, get_all() is admin-level.

:p When should you use get_list() instead of get_all()?
??x
Use `get_list()` for user-facing queries (respects permissions), `get_all()` for admin/backend.

```python
# User-facing (respects permissions)
books = frappe.get_list("Book",
    filters={"available": 1},
    fields=["name", "title"]
)
# User only sees books they have permission to read

# Admin/backend (ignores permissions)
books = frappe.get_all("Book",
    filters={"available": 1},
    fields=["name", "title"]
)
# Returns ALL books regardless of permissions

# Pseudocode:
# function get_list(doctype, filters):
#     query = build_query(doctype, filters)
#     query = apply_permission_filters(query, user)
#     query = apply_user_permissions(query, user)
#     return execute(query)
#
# function get_all(doctype, filters):
#     query = build_query(doctype, filters)
#     # NO permission checking
#     return execute(query)
```
x??

---

#### frappe.get_cached_doc() Performance Optimization
Load document from cache instead of database. Huge performance gain for frequently accessed, rarely changed docs. Cache persists across requests.

:p How do you load documents with caching to improve performance?
??x
Use `frappe.get_cached_doc(doctype, name)` instead of `get_doc()`.

```python
# Regular (always hits database)
user = frappe.get_doc("User", "admin@example.com")

# Cached (database only on first call)
user = frappe.get_cached_doc("User", "admin@example.com")

# Good for: Settings, rarely-changing master data
settings = frappe.get_cached_doc("System Settings",
                                  "System Settings")

# Pseudocode:
# function get_cached_doc(doctype, name):
#     cache_key = f"doc:{doctype}:{name}"
#
#     # Check cache
#     doc = cache.get(cache_key)
#     if doc:
#         return doc  # Cache hit
#
#     # Cache miss - load from DB
#     doc = get_doc(doctype, name)
#
#     # Store in cache
#     cache.set(cache_key, doc, expires=3600)
#
#     return doc
#
# Cache cleared on doc.save()
```
x??

---

#### frappe.get_hooks() Runtime Hook Access
Access all registered hooks at runtime. Useful for debugging or dynamic hook inspection. Shows what functions are registered for each hook.

:p How do you see all registered hooks for a specific hook point?
??x
Use `frappe.get_hooks(hook_name)` to get list of registered functions.

```python
# Get all functions for a hook
doc_events = frappe.get_hooks("doc_events")
print(doc_events)
# {"Book": {"after_insert": ["app.hooks.on_book_create"]}}

# Get scheduler events
daily_jobs = frappe.get_hooks("daily")
# ["app.tasks.daily_cleanup", "app.tasks.send_report"]

# Check if hook exists
if frappe.get_hooks("override_whitelisted_methods"):
    print("Methods overridden")

# Pseudocode:
# function get_hooks(hook_name):
#     hooks = {}
#     for app in installed_apps:
#         app_hooks = load_hooks_file(app)
#         if hook_name in app_hooks:
#             hooks.update(app_hooks[hook_name])
#     return hooks
```
x??

---

#### frappe.db.escape() SQL Injection Prevention
Escape strings for safe SQL usage. Critical for dynamic queries. Prevents SQL injection attacks by escaping special characters.

:p How do you safely include user input in SQL queries?
??x
Use `frappe.db.escape(value)` or parameterized queries (preferred).

```python
# UNSAFE - SQL Injection risk!
user_input = "admin' OR '1'='1"
sql = f"SELECT * FROM tabUser WHERE name='{user_input}'"
# Results in: SELECT * FROM tabUser WHERE name='admin' OR '1'='1'
# Returns ALL users!

# SAFE - Using escape
safe_input = frappe.db.escape(user_input)
sql = f"SELECT * FROM tabUser WHERE name={safe_input}"

# BETTER - Parameterized (recommended)
result = frappe.db.sql("""
    SELECT * FROM tabUser
    WHERE name = %s
""", (user_input,))

# Pseudocode:
# function escape(value):
#     # Add quotes and escape special chars
#     escaped = value.replace("'", "\\'")
#     escaped = escaped.replace('"', '\\"')
#     return f"'{escaped}'"
#
# Parameterized (safer):
# function sql(query, params):
#     for param in params:
#         query = replace_placeholder(query, escape(param))
#     return execute(query)
```
x??

---

#### frappe.db.begin() Explicit Transactions
Start an explicit transaction for fine-grained control. Useful when you need multiple operations in one atomic unit with manual commit/rollback points.

:p How do you create an explicit database transaction?
??x
Use `frappe.db.begin()` to start, then `commit()` or `rollback()`.

```python
frappe.db.begin()
try:
    # Multiple operations
    doc1.save()
    doc2.save()
    frappe.db.sql("UPDATE tabAccount SET balance=0")

    frappe.db.commit()  # Make permanent
except:
    frappe.db.rollback()  # Undo all
    raise

# Pseudocode:
# function begin():
#     execute("BEGIN TRANSACTION")
#
# function commit():
#     execute("COMMIT")
#     clear_transaction_cache()
#
# function rollback():
#     execute("ROLLBACK")
#     restore_cached_state()
#
# Flow:
# BEGIN TRANSACTION
#   operation1
#   operation2
#   if error: ROLLBACK (undo all)
#   if success: COMMIT (save all)
```
x??

---

#### frappe.as_json() JSON Serialization
Convert Python objects (dicts, lists, documents) to JSON strings. Handles Frappe-specific objects like _dict and Document. Better than json.dumps() for Frappe objects.

:p How do you convert Frappe objects to JSON strings?
??x
Use `frappe.as_json(obj, indent=None)`.

```python
import frappe

doc = frappe.get_doc("Book", "book-001")

# Convert to JSON string
json_str = frappe.as_json(doc)
# '{"name": "book-001", "title": "Clean Code", ...}'

# Pretty print
json_str = frappe.as_json(doc, indent=2)

# Works with dicts, lists
data = {"books": [{"title": "A"}, {"title": "B"}]}
json_str = frappe.as_json(data)

# Pseudocode:
# function as_json(obj, indent=None):
#     if isinstance(obj, Document):
#         obj = obj.as_dict()
#     if isinstance(obj, _dict):
#         obj = dict(obj)
#
#     # Handle dates, datetimes
#     obj = convert_dates_to_strings(obj)
#
#     return json.dumps(obj, indent=indent,
#                      default=custom_serializer)
```
x??

---

#### frappe.parse_json() Safe JSON Parsing
Parse JSON strings to Python objects. Safer than json.loads() as it handles edge cases and returns None for invalid JSON instead of throwing.

:p How do you safely parse JSON strings in Frappe?
??x
Use `frappe.parse_json(json_str)` for safe parsing.

```python
import frappe

# Valid JSON
data = frappe.parse_json('{"name": "test"}')
# {"name": "test"}

# Invalid JSON (returns None instead of error)
data = frappe.parse_json('invalid json')
# None

# With default
data = frappe.parse_json('invalid', default={})
# {}

# Pseudocode:
# function parse_json(json_str, default=None):
#     try:
#         return json.loads(json_str)
#     except:
#         return default
```
x??

---

#### frappe.copy_doc() Document Cloning
Create a copy of a document with a new name. Useful for duplicating records. Can exclude certain fields and child tables during copy.

:p How do you duplicate/clone an existing document?
??x
Use `frappe.copy_doc(doc, ignore_no_copy=True)`.

```python
# Copy existing document
original = frappe.get_doc("Book", "book-001")
copy = frappe.copy_doc(original)

# Modify and save
copy.title = "Copy of " + original.title
copy.isbn = "new-isbn-here"  # Must be unique
copy.insert()

# Exclude fields marked no_copy=1
copy = frappe.copy_doc(original, ignore_no_copy=True)

# Pseudocode:
# function copy_doc(doc, ignore_no_copy=False):
#     new_doc = create_new_document(doc.doctype)
#
#     for field in doc.meta.fields:
#         # Skip no_copy fields
#         if field.no_copy and not ignore_no_copy:
#             continue
#
#         # Skip auto fields
#         if field.fieldname in ["name", "creation", "modified"]:
#             continue
#
#         # Copy value
#         new_doc.set(field.fieldname, doc.get(field.fieldname))
#
#     # Copy child tables
#     for table_field in doc.meta.get_table_fields():
#         for child in doc.get(table_field.fieldname):
#             new_child = copy_doc(child)
#             new_doc.append(table_field.fieldname, new_child)
#
#     return new_doc
```
x??

---

#### frappe.rename_doc() Document Renaming
Rename a document and update all links. Frappe automatically updates references in other DocTypes. Can merge with existing if specified.

:p How do you rename a document and update all references?
??x
Use `frappe.rename_doc(doctype, old_name, new_name, merge=False)`.

```python
# Simple rename
frappe.rename_doc("Book", "old-name", "new-name")
# All links updated automatically

# Merge with existing
frappe.rename_doc("Customer", "cust-001", "cust-002",
                  merge=True)
# cust-001 merged into cust-002, then deleted

# Force rename (ignore conflicts)
frappe.rename_doc("Book", "old", "new",
                  force=True,
                  merge=False)

# Pseudocode:
# function rename_doc(doctype, old, new, merge=False):
#     if merge and exists(doctype, new):
#         # Merge old into new
#         update_all_links(doctype, old, new)
#         delete(doctype, old)
#     else:
#         # Update document name
#         UPDATE `tab{doctype}`
#         SET name = new
#         WHERE name = old
#
#         # Update all links in other doctypes
#         for link_field in get_all_link_fields(doctype):
#             UPDATE `tab{link_field.parent}`
#             SET {link_field.fieldname} = new
#             WHERE {link_field.fieldname} = old
#
#     clear_cache()
```
x??

---

#### frappe.db.truncate() Table Cleanup
Delete all records from a table instantly. Much faster than deleting individually. Cannot be rolled back. Use with extreme caution.

:p How do you quickly delete all records from a DocType?
??x
Use `frappe.db.truncate(doctype)` to empty a table.

```python
# Delete all records (DANGEROUS!)
frappe.db.truncate("Error Log")

# Does NOT:
# - Call on_trash hooks
# - Check permissions
# - Create backups

# Pseudocode:
# function truncate(doctype):
#     TRUNCATE TABLE `tab{doctype}`
#     # All rows deleted instantly
#     # Cannot be rolled back!
#     clear_cache(doctype)
#
# Compare to delete all:
# DELETE FROM `tab{doctype}`  # Slower, can rollback
# versus
# TRUNCATE TABLE `tab{doctype}`  # Instant, no rollback
```
x??

---

#### frappe.db.update() Bulk Field Update
Update a field for all records matching filters. Single query, very fast. Bypasses controller hooks.

:p How do you update a field for multiple records at once?
??x
Use `frappe.db.update(doctype, field, value, filters)`.

```python
# Update all matching records
frappe.db.update("Book",
    {"available": 1},  # Set these fields
    {"genre": "Fiction"}  # Where these match
)

# Single field
frappe.db.set_value("Book",
    {"genre": "Fiction"},
    "available", 1
)

# Pseudocode:
# function update(doctype, updates, filters):
#     set_clause = build_set_clause(updates)
#     where_clause = build_where_clause(filters)
#
#     query = f"UPDATE `tab{doctype}`
#              SET {set_clause}
#              WHERE {where_clause}"
#
#     execute(query)
#     clear_cache(doctype)
#
# Example:
# UPDATE `tabBook`
# SET available = 1
# WHERE genre = 'Fiction'
```
x??

---

#### frappe.db.multisql() Database-Agnostic Queries
Write different SQL for MariaDB vs PostgreSQL. Frappe chooses the right query based on database type. Essential for cross-database compatibility.

:p How do you write database-specific SQL queries?
??x
Use `frappe.db.multisql()` with dict of DB-specific queries.

```python
result = frappe.db.multisql({
    "mariadb": """
        SELECT name
        FROM `tabBook`
        WHERE MATCH(title) AGAINST(%s)
    """,
    "postgres": """
        SELECT name
        FROM "tabBook"
        WHERE title ILIKE %s
    """
}, ("search term",))

# Pseudocode:
# function multisql(queries_dict, params):
#     db_type = get_database_type()  # "mariadb" or "postgres"
#
#     query = queries_dict[db_type]
#
#     return sql(query, params)
#
# Auto-selects correct syntax for:
# - String matching (MATCH vs ILIKE)
# - Date functions
# - JSON operations
# - Full-text search
```
x??

---

#### frappe.respond_as_web_page() Custom Error Pages
Display custom HTML pages for errors or messages. Better UX than plain error messages. Used for 404s, permission denied, success pages.

:p How do you show a custom HTML page to users?
??x
Use `frappe.respond_as_web_page(title, message, success=False)`.

```python
@frappe.whitelist(allow_guest=True)
def public_api():
    if not validate_request():
        frappe.respond_as_web_page(
            "Access Denied",
            "You don't have permission to access this resource",
            http_status_code=403,
            indicator_color="red"
        )
        return

    # Process request...

# Success page
frappe.respond_as_web_page(
    "Success",
    "Your book has been reserved!",
    indicator_color="green"
)

# Pseudocode:
# function respond_as_web_page(title, msg, http_status=200):
#     html = render_template("message_page.html", {
#         "title": title,
#         "message": msg
#     })
#
#     response.status_code = http_status
#     response.content_type = "text/html"
#     response.body = html
#
#     # Stop further processing
#     raise RequestHandled
```
x??

---

#### frappe.db.savepoint() Nested Transactions
Create savepoints within transactions for partial rollback. Rollback to savepoint undoes only some operations, not all. Advanced transaction control.

:p How do you create a savepoint for partial transaction rollback?
??x
Use `frappe.db.savepoint(name)` and `rollback_savepoint(name)`.

```python
frappe.db.begin()

# Operation 1
doc1.save()

# Create savepoint
frappe.db.savepoint("before_risky_operation")

try:
    # Risky operation 2
    doc2.save()
    risky_calculation()
except:
    # Rollback only to savepoint
    frappe.db.rollback_savepoint("before_risky_operation")
    # doc1 still saved, doc2 rolled back

frappe.db.commit()  # Commit doc1

# Pseudocode:
# function savepoint(name):
#     execute(f"SAVEPOINT {name}")
#
# function rollback_savepoint(name):
#     execute(f"ROLLBACK TO SAVEPOINT {name}")
#
# Flow:
# BEGIN
#   operation1  ✓
#   SAVEPOINT sp1
#     operation2  ✓
#     operation3  ✗ (error)
#   ROLLBACK TO sp1  (undo 2&3, keep 1)
#   operation4  ✓
# COMMIT  (save 1 & 4)
```
x??

---

#### frappe.utils.get_url() URL Construction
Build full URLs for resources. Handles site URL, SSL, port. Essential for emails, webhooks, external links.

:p How do you construct full URLs for resources?
??x
Use `frappe.utils.get_url(path)` or `get_url_to_form(doctype, name)`.

```python
from frappe.utils import get_url, get_url_to_form

# Full URL to path
url = get_url("/app/book/book-001")
# "https://mysite.com/app/book/book-001"

# URL to form
url = get_url_to_form("Book", "book-001")
# "https://mysite.com/app/book/book-001"

# URL to list
url = get_url_to_list("Book")
# "https://mysite.com/app/book"

# For emails
link = get_url_to_form("Invoice", invoice.name)
frappe.sendmail(
    recipients=["user@ex.com"],
    message=f'View invoice: <a href="{link}">Click here</a>'
)

# Pseudocode:
# function get_url(path):
#     site_url = get_site_config("site_url")
#     # "https://mysite.com"
#
#     if not path.startswith("/"):
#         path = "/" + path
#
#     return site_url + path
#
# function get_url_to_form(doctype, name):
#     path = f"/app/{doctype.lower()}/{name}"
#     return get_url(path)
```
x??

---

#### frappe.utils.get_datetime() Date Parsing
Parse date/datetime strings to Python datetime objects. Handles multiple formats automatically. Essential for date comparisons and calculations.

:p How do you convert date strings to datetime objects?
??x
Use `frappe.utils.get_datetime(date_str)` for flexible parsing.

```python
from frappe.utils import get_datetime, now_datetime

# Parse various formats
dt = get_datetime("2025-01-15")
dt = get_datetime("2025-01-15 10:30:00")
dt = get_datetime("15-01-2025")

# Compare dates
if get_datetime(doc.due_date) < now_datetime():
    frappe.throw("Due date is in the past")

# Pseudocode:
# function get_datetime(date_str):
#     formats = [
#         "%Y-%m-%d",
#         "%Y-%m-%d %H:%M:%S",
#         "%d-%m-%Y",
#         # ... more formats
#     ]
#
#     for fmt in formats:
#         try:
#             return datetime.strptime(date_str, fmt)
#         except:
#             continue
#
#     raise ValueError("Cannot parse date")
```
x??

---

#### frappe.utils.add_days() Date Arithmetic
Add or subtract days from a date. Returns date string in Frappe format. Handles None values safely.

:p How do you add or subtract days from a date?
??x
Use `frappe.utils.add_days(date, days)`.

```python
from frappe.utils import add_days, nowdate

# Add days
future = add_days(nowdate(), 7)  # 7 days from now
past = add_days(nowdate(), -7)   # 7 days ago

# Due date calculation
doc.due_date = add_days(doc.start_date, 30)

# None safe
add_days(None, 5)  # Returns None

# Pseudocode:
# function add_days(date, days):
#     if date is None:
#         return None
#
#     dt = get_datetime(date)
#     new_dt = dt + timedelta(days=days)
#     return new_dt.strftime("%Y-%m-%d")
```
x??

---

#### frappe.utils.date_diff() Calculate Day Difference
Calculate days between two dates. Returns integer. Positive if first date is later.

:p How do you calculate the number of days between two dates?
??x
Use `frappe.utils.date_diff(date1, date2)`.

```python
from frappe.utils import date_diff

# Days between dates
days = date_diff("2025-01-20", "2025-01-15")  # 5

# Check if overdue
days_overdue = date_diff(nowdate(), doc.due_date)
if days_overdue > 0:
    frappe.msgprint(f"Overdue by {days_overdue} days")

# Pseudocode:
# function date_diff(date1, date2):
#     dt1 = get_datetime(date1)
#     dt2 = get_datetime(date2)
#     delta = dt1 - dt2
#     return delta.days
```
x??

---

#### frappe.new_doc() Quick Document Creation
Create new document instance without get_doc(). Cleaner syntax for new documents. Automatically sets doctype.

:p What's a cleaner way to create new documents?
??x
Use `frappe.new_doc(doctype)` instead of `get_doc({})`.

```python
# Old way
book = frappe.get_doc({
    "doctype": "Book",
    "title": "New Book"
})

# New way (cleaner)
book = frappe.new_doc("Book")
book.title = "New Book"
book.author = "Author Name"
book.insert()

# Pseudocode:
# function new_doc(doctype):
#     doc = Document()
#     doc.doctype = doctype
#     doc.set_defaults()  # Auto-set default values
#     return doc
```
x??

---

#### frappe.get_list() with pluck
Get just one field as a list. More efficient than getting all fields when you only need one.

:p How do you get a list of values for a single field?
??x
Use `frappe.get_list()` with `pluck` parameter.

```python
# Get list of titles only
titles = frappe.get_list("Book",
    filters={"available": 1},
    pluck="title"
)
# ["Book A", "Book B", "Book C"]

# Instead of:
books = frappe.get_list("Book",
    filters={"available": 1},
    fields=["title"]
)
titles = [b.title for b in books]

# Pseudocode:
# function get_list(doctype, filters, pluck=None):
#     results = query_database(doctype, filters)
#
#     if pluck:
#         return [row[pluck] for row in results]
#
#     return results
```
x??

---

