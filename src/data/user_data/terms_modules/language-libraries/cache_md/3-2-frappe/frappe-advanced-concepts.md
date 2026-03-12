# Frappe Framework Advanced Concepts - Flashcards

#### frappe.db.commit() Transaction Management
In Frappe, database operations are wrapped in transactions. A transaction is a sequence of database operations that must all succeed or all fail together (atomicity). This prevents partial updates that could leave data in an inconsistent state.

Example scenario: Transferring money between accounts. Both the debit and credit must happen, or neither should happen.

```python
# Pseudocode for transaction:
BEGIN TRANSACTION
  operation1()  # Deduct from account A
  operation2()  # Add to account B
  if all_successful:
    COMMIT  # Make permanent
  else:
    ROLLBACK  # Undo everything
```

:p How do you ensure multiple database operations either all succeed or all fail together in Frappe?
??x
Use `frappe.db.commit()` and `frappe.db.rollback()` to control transactions.

```python
import frappe

def transfer_funds(from_acc, to_acc, amount):
    try:
        # Start implicit transaction

        # Operation 1: Deduct from source
        frappe.db.set_value("Account", from_acc, "balance",
            frappe.db.get_value("Account", from_acc, "balance") - amount)

        # Operation 2: Add to destination
        frappe.db.set_value("Account", to_acc, "balance",
            frappe.db.get_value("Account", to_acc, "balance") + amount)

        # Commit both changes
        frappe.db.commit()

    except Exception as e:
        # Undo all changes if any operation fails
        frappe.db.rollback()
        frappe.throw(f"Transfer failed: {str(e)}")

# Pseudocode logic:
# function commit():
#     COMMIT TRANSACTION  # Make all changes permanent
#     flush_to_disk()
#
# function rollback():
#     ROLLBACK TRANSACTION  # Undo all changes since last commit
#     restore_previous_state()
```
x??

---

#### Meta Class and DocType Metadata
Every DocType has associated metadata stored in a `meta` object. This metadata includes all field definitions, permissions, links, and other configuration. The meta object is cached for performance and provides introspection capabilities.

Think of `meta` as the "schema definition" or "blueprint" of the DocType.

:p How do you access the metadata (field definitions, permissions) of a DocType in Frappe?
??x
Use `frappe.get_meta(doctype)` to access DocType metadata.

```python
import frappe

# Get metadata for User DocType
meta = frappe.get_meta("User")

# Access field definitions
for field in meta.fields:
    print(f"Field: {field.fieldname}, Type: {field.fieldtype}")

# Check if field exists
if meta.has_field("email"):
    print("User has email field")

# Get specific field meta
email_field = meta.get_field("email")
print(f"Label: {email_field.label}")
print(f"Mandatory: {email_field.reqd}")
print(f"Unique: {email_field.unique}")

# Get all link fields
link_fields = meta.get_link_fields()

# Check permissions
if meta.has_permission("read"):
    print("User can read")

# Pseudocode:
# class Meta:
#     def __init__(doctype):
#         # Load from cache or database
#         self.name = doctype
#         self.fields = load_fields(doctype)
#         self.permissions = load_permissions(doctype)
#
#     def has_field(fieldname):
#         return fieldname in [f.fieldname for f in self.fields]
#
#     def get_field(fieldname):
#         for field in self.fields:
#             if field.fieldname == fieldname:
#                 return field
#         return None

# Example checking before accessing:
meta = frappe.get_meta("Book")
if meta.has_field("isbn"):
    book = frappe.get_doc("Book", "some-book")
    print(book.isbn)
```
x??

---

#### Standard vs Custom Fields
Frappe distinguishes between standard fields (defined in JSON schema) and custom fields (added via Customize Form). Custom fields allow users to extend DocTypes without modifying code, supporting customization without breaking updates.

Standard fields are in the DocType JSON definition. Custom fields are stored in the "Custom Field" DocType.

:p What is the difference between standard fields and custom fields in Frappe?
??x
- **Standard Fields**: Defined in DocType JSON, part of the core schema
- **Custom Fields**: Added via UI (Customize Form), stored in database

```python
# Standard fields are in book.json:
# {
#   "fields": [
#     {"fieldname": "title", "fieldtype": "Data"},
#     {"fieldname": "author", "fieldtype": "Data"}
#   ]
# }

# Custom fields added via Customize Form:
# Stored in tabCustom Field DocType

# Accessing both types (no difference in code):
book = frappe.get_doc("Book", "book-001")
print(book.title)  # Standard field
print(book.custom_rating)  # Custom field (if added)

# Check if field is custom:
meta = frappe.get_meta("Book")
field = meta.get_field("custom_rating")
if field and field.is_custom_field:
    print("This is a custom field")

# Programmatically create custom field:
custom_field = frappe.get_doc({
    "doctype": "Custom Field",
    "dt": "Book",  # Target DocType
    "fieldname": "custom_rating",
    "label": "Rating",
    "fieldtype": "Select",
    "options": "1\n2\n3\n4\n5",
    "insert_after": "author"
})
custom_field.insert()

# Pseudocode:
# function get_doc_with_custom_fields(doctype, name):
#     # Load standard fields from JSON
#     fields = load_standard_fields(doctype)
#
#     # Load custom fields from database
#     custom_fields = db.get_all("Custom Field",
#                                 filters={"dt": doctype})
#
#     # Merge both
#     all_fields = fields + custom_fields
#
#     # Load document with all fields
#     return load_document(doctype, name, all_fields)
```
x??

---

#### Single DocTypes
Single DocTypes have only one instance/record in the database. They're used for settings, configurations, or global singletons. Instead of multiple records, there's always just one.

Examples: System Settings, Website Settings, Email Account Settings

:p What is a Single DocType and when would you use it?
??x
A Single DocType has exactly one record, used for global settings/configuration.

```python
# Mark DocType as Single in definition:
# {
#   "doctype": "DocType",
#   "name": "System Settings",
#   "issingle": 1  # This makes it a Single
# }

# Accessing a Single DocType (no name needed):
settings = frappe.get_single("System Settings")
# or
settings = frappe.get_doc("System Settings", "System Settings")

# Modify and save:
settings.enable_notifications = 1
settings.default_language = "en"
settings.save()

# No need to specify name - there's only one record

# Difference from regular DocType:
# Regular: Multiple records
users = frappe.get_all("User")  # Many users
user1 = frappe.get_doc("User", "user1@example.com")
user2 = frappe.get_doc("User", "user2@example.com")

# Single: One record
settings = frappe.get_single("System Settings")  # Only one

# Pseudocode:
# Regular DocType storage:
# tabUser:
#   name          email               full_name
#   user1         user1@example.com   User One
#   user2         user2@example.com   User Two
#   user3         user3@example.com   User Three
#
# Single DocType storage:
# tabSystemSettings (only one row ever):
#   name              enable_notifications  default_language
#   System Settings   1                     en

# Use cases:
# - Global application settings
# - Configuration that applies system-wide
# - Feature flags
# - System-wide defaults
```
x??

---

#### frappe.only_for() Permission Decorator
The `@frappe.only_for()` decorator restricts method execution to users with specific roles. This provides method-level security beyond DocType permissions, useful for administrative or privileged operations.

It's like adding a "role gate" before a function executes.

:p How do you restrict a method to only users with specific roles in Frappe?
??x
Use `@frappe.only_for()` decorator to restrict method access by role.

```python
import frappe

@frappe.whitelist()
@frappe.only_for("System Manager")
def delete_all_books():
    """
    Dangerous operation - only System Managers can call this
    """
    frappe.db.sql("DELETE FROM `tabBook`")
    frappe.db.commit()
    return "All books deleted"

# Multiple roles (any one of them):
@frappe.whitelist()
@frappe.only_for("System Manager", "Administrator")
def backup_database():
    # Only System Manager OR Administrator can call
    perform_backup()

# When unauthorized user calls:
# Error: "Not permitted. Only System Manager role can access this."

# Pseudocode implementation:
# function only_for(*roles):
#     def decorator(fn):
#         def wrapper(*args, **kwargs):
#             user_roles = get_user_roles(current_user)
#
#             has_permission = False
#             for role in roles:
#                 if role in user_roles:
#                     has_permission = True
#                     break
#
#             if not has_permission:
#                 raise PermissionError(
#                     f"Only {roles} can access this"
#                 )
#
#             return fn(*args, **kwargs)
#         return wrapper
#     return decorator

# Client-side call:
frappe.call({
    method: 'myapp.api.delete_all_books',
    callback: function(r) {
        // Will fail if user doesn't have System Manager role
    }
});

# Checking roles programmatically:
if "System Manager" in frappe.get_roles():
    # User has System Manager role
    pass
```
x??

---

#### frappe.cache() Redis Caching
Frappe uses Redis for caching to improve performance. The cache stores frequently accessed data in memory, avoiding repeated database queries. Cache is key-value based and can have expiration times.

Think of it as a fast temporary storage that sits between your code and the database.

:p How do you use caching in Frappe to improve performance?
??x
Use `frappe.cache()` to get/set cached values with Redis.

```python
import frappe

# Set cache value
frappe.cache().set_value("user_count", 150)

# Get cache value
count = frappe.cache().get_value("user_count")
print(count)  # 150

# Set with expiration (in seconds)
frappe.cache().set_value("session_data",
                        {"user": "admin"},
                        expires_in_sec=3600)  # 1 hour

# Cache complex data (auto-serialized):
book_stats = {
    "total": 100,
    "available": 75,
    "genres": ["Fiction", "Science"]
}
frappe.cache().set_value("book_stats", book_stats)

# Get with default if not exists:
stats = frappe.cache().get_value("book_stats",
                                  generator=lambda: compute_stats())

# Delete cache:
frappe.cache().delete_value("user_count")

# Example: Expensive operation with caching
def get_book_statistics():
    # Try cache first
    cache_key = "book_stats"
    stats = frappe.cache().get_value(cache_key)

    if stats:
        return stats  # Cache hit

    # Cache miss - compute
    stats = {
        "total": frappe.db.count("Book"),
        "available": frappe.db.count("Book", {"available": 1}),
        # ... expensive calculations
    }

    # Store in cache for 10 minutes
    frappe.cache().set_value(cache_key, stats, expires_in_sec=600)

    return stats

# Pseudocode:
# function get_value(key, generator=None):
#     # Try Redis
#     value = redis.get(key)
#
#     if value is not None:
#         return deserialize(value)  # Cache hit
#
#     # Cache miss
#     if generator:
#         value = generator()  # Compute value
#         set_value(key, value)  # Store in cache
#         return value
#
#     return None
#
# function set_value(key, value, expires_in_sec=None):
#     serialized = serialize(value)  # Convert to string/bytes
#
#     if expires_in_sec:
#         redis.setex(key, expires_in_sec, serialized)
#     else:
#         redis.set(key, serialized)

# Clear all cache:
frappe.clear_cache()

# Clear cache for specific doctype:
frappe.clear_cache(doctype="Book")
```
x??

---

#### frappe.db.exists() Filters
The `exists()` method can check existence not just by name, but also by filters. This is more flexible than checking by document name alone and is still very efficient.

It's like asking "Does any document matching these criteria exist?"

:p How do you check if a document exists matching specific filter conditions?
??x
Use `frappe.db.exists()` with filters dictionary instead of just name.

```python
import frappe

# Check by name (simple):
if frappe.db.exists("User", "admin@example.com"):
    print("User exists")

# Check by filters (flexible):
exists = frappe.db.exists("Book", {
    "author": "Robert Martin",
    "genre": "Science",
    "available": 1
})

if exists:
    print(f"Found book: {exists}")  # Returns the name if exists

# Multiple conditions with operators:
exists = frappe.db.exists("Invoice", {
    "customer": "CUST-001",
    "status": ["in", ["Draft", "Pending"]],
    "total": [">", 1000]
})

# Common pattern: Check before insert
isbn = "978-0-13-110362-7"
if not frappe.db.exists("Book", {"isbn": isbn}):
    # Safe to insert
    book = frappe.get_doc({
        "doctype": "Book",
        "isbn": isbn,
        "title": "New Book"
    })
    book.insert()
else:
    frappe.throw(f"Book with ISBN {isbn} already exists")

# Pseudocode:
# function exists(doctype, name_or_filters):
#     if isinstance(name_or_filters, str):
#         # Simple name check
#         query = f"SELECT name FROM `tab{doctype}`
#                   WHERE name = '{name_or_filters}'
#                   LIMIT 1"
#     else:
#         # Filter-based check
#         where_clause = build_where_clause(name_or_filters)
#         query = f"SELECT name FROM `tab{doctype}`
#                   WHERE {where_clause}
#                   LIMIT 1"
#
#     result = execute(query)
#     return result[0] if result else None

# Performance comparison:
# BAD (loads full document):
try:
    doc = frappe.get_doc("Book", {"author": "Martin"})
    exists = True
except:
    exists = False

# GOOD (just checks existence):
exists = frappe.db.exists("Book", {"author": "Martin"})
```
x??

---

#### Form Events and Client Scripts
Client scripts run in the browser and handle form events like load, refresh, field changes. They provide dynamic behavior in the UI without page reloads. These are JavaScript functions that respond to user actions.

Think of them as event listeners for form interactions.

:p How do you add custom JavaScript behavior to a form in Frappe?
??x
Use Client Scripts or custom JS in the DocType's `.js` file to handle form events.

```javascript
// In book.js (frappe/custom/doctype/book/book.js)

frappe.ui.form.on('Book', {
    // Runs when form loads
    onload: function(frm) {
        console.log('Form loaded');
        // Set default values
        if (frm.is_new()) {
            frm.set_value('available', 1);
        }
    },

    // Runs when form refreshes
    refresh: function(frm) {
        // Add custom button
        if (!frm.is_new()) {
            frm.add_custom_button('Mark as Borrowed', function() {
                frm.call({
                    method: 'mark_as_borrowed',
                    doc: frm.doc,
                    callback: function(r) {
                        frm.reload_doc();
                    }
                });
            });
        }

        // Conditional field display
        if (frm.doc.available == 0) {
            frm.set_df_property('isbn', 'read_only', 1);
        }
    },

    // Runs when specific field changes
    publication_year: function(frm) {
        if (frm.doc.publication_year) {
            let age = new Date().getFullYear() - frm.doc.publication_year;
            if (age > 50) {
                frappe.msgprint(`This book is ${age} years old!`);
            }
        }
    },

    // Validate before save (client-side)
    validate: function(frm) {
        if (frm.doc.number_of_pages < 0) {
            frappe.throw('Pages cannot be negative');
            return false;
        }
    },

    // After save
    after_save: function(frm) {
        frappe.show_alert({
            message: 'Book saved successfully',
            indicator: 'green'
        }, 5);
    }
});

// Field-level events
frappe.ui.form.on('Book', 'author', function(frm) {
    // When author field changes
    console.log('Author changed to:', frm.doc.author);
});

// Pseudocode event flow:
// User opens form:
//   → onload event fires
//   → refresh event fires
//   → form rendered
//
// User changes field:
//   → field change event fires
//   → refresh event fires
//   → UI updates
//
// User clicks save:
//   → validate event fires
//   → if valid: before_save fires
//   → save to server
//   → after_save fires
//   → refresh event fires

// Common operations:
frm.set_value('fieldname', value);      // Set field
frm.get_value('fieldname');             // Get field
frm.set_df_property('field', 'hidden', 1); // Hide field
frm.add_custom_button('Label', fn);     // Add button
frm.refresh_field('fieldname');         // Refresh specific field
frm.reload_doc();                       // Reload from server
```
x??

---

#### Property Setters Override
Property Setters allow customizing field properties without modifying the DocType JSON. They override default properties like labels, defaults, visibility, etc. This enables customization that survives framework updates.

Think of them as "overrides" or "patches" to the standard field definitions.

:p How do you change field properties (label, default, mandatory) without modifying the DocType JSON?
??x
Use Property Setters to override field properties via Customize Form.

```python
# Create property setter programmatically:
property_setter = frappe.get_doc({
    "doctype": "Property Setter",
    "doctype_or_field": "DocField",
    "doc_type": "Book",          # Target DocType
    "field_name": "author",      # Target field
    "property": "label",         # Property to change
    "value": "Book Author",      # New value
    "property_type": "Data"
})
property_setter.insert()

# Common properties to override:
# - label: Display label
# - default: Default value
# - reqd: Mandatory (0 or 1)
# - hidden: Hide field (0 or 1)
# - read_only: Make read-only (0 or 1)
# - description: Help text
# - options: For Select/Link fields

# Via Customize Form UI:
# 1. Search "Customize Form"
# 2. Select "Book" DocType
# 3. Click on field to modify
# 4. Change properties
# 5. Click "Update"
# → Property Setters created automatically

# Check existing property setters:
setters = frappe.get_all("Property Setter",
    filters={"doc_type": "Book"},
    fields=["field_name", "property", "value"]
)
for setter in setters:
    print(f"{setter.field_name}.{setter.property} = {setter.value}")

# Pseudocode priority:
# function get_field_property(doctype, field, property):
#     # 1. Check Property Setter (highest priority)
#     setter = db.get_value("Property Setter", {
#         "doc_type": doctype,
#         "field_name": field,
#         "property": property
#     })
#     if setter:
#         return setter.value
#
#     # 2. Check Custom Field
#     if is_custom_field(field):
#         custom = db.get_value("Custom Field", {
#             "dt": doctype,
#             "fieldname": field
#         }, property)
#         if custom:
#             return custom
#
#     # 3. Use standard field definition
#     meta = get_meta(doctype)
#     field_meta = meta.get_field(field)
#     return field_meta.get(property)

# Example: Override multiple properties
properties = [
    ("label", "Author Name"),
    ("description", "Full name of the author"),
    ("reqd", 1)
]

for prop, value in properties:
    frappe.get_doc({
        "doctype": "Property Setter",
        "doctype_or_field": "DocField",
        "doc_type": "Book",
        "field_name": "author",
        "property": prop,
        "value": value
    }).insert()
```
x??

---

#### frappe.flags Temporary State
`frappe.flags` is a temporary dictionary to store state/flags during request processing. Unlike `frappe.local`, flags are specifically for controlling behavior and are cleared after each request.

Common use: Skipping validations, ignoring permissions, controlling hooks.

:p How do you temporarily modify behavior or skip validations during a request in Frappe?
??x
Use `frappe.flags` to set temporary flags that control behavior.

```python
import frappe

# Skip permissions check
frappe.flags.ignore_permissions = True
doc = frappe.get_doc("Book", "some-book")  # Gets doc even if no permission
frappe.flags.ignore_permissions = False  # Reset

# Skip validation
frappe.flags.ignore_validate = True
doc.save()  # Saves without running validate()

# Skip links validation
frappe.flags.ignore_links = True

# Skip mandatory field check
frappe.flags.ignore_mandatory = True

# Don't update modified timestamp
frappe.flags.ignore_set_modified = True

# Example: Bulk import without validation overhead
def import_books(books_data):
    # Set flags for performance
    frappe.flags.ignore_permissions = True
    frappe.flags.ignore_validate = True
    frappe.flags.ignore_mandatory = True

    try:
        for book_data in books_data:
            book = frappe.get_doc(book_data)
            book.insert()

        frappe.db.commit()
    finally:
        # Reset flags
        frappe.flags.ignore_permissions = False
        frappe.flags.ignore_validate = False
        frappe.flags.ignore_mandatory = False

# Custom flags for controlling hooks:
def on_book_update(doc, method):
    # Hook that can be skipped
    if frappe.flags.skip_book_notification:
        return

    send_notification(doc)

# Usage:
frappe.flags.skip_book_notification = True
book.save()  # Won't send notification
frappe.flags.skip_book_notification = False

# Pseudocode:
# function save(doc):
#     if not frappe.flags.ignore_validate:
#         doc.validate()
#
#     if not frappe.flags.ignore_permissions:
#         check_permissions(doc)
#
#     if not frappe.flags.ignore_mandatory:
#         check_mandatory_fields(doc)
#
#     if not frappe.flags.ignore_set_modified:
#         doc.modified = now()
#         doc.modified_by = current_user
#
#     db.update(doc)

# Common flags:
# ignore_permissions = True
# ignore_validate = True
# ignore_mandatory = True
# ignore_links = True
# in_test = True  # Running in test mode
# in_install = True  # During app installation
# in_migrate = True  # During migration
```
x??

---

#### Server-side Print Format
Print formats define how documents are rendered for printing (PDFs, paper). They use Jinja2 templates with access to document data. Print formats can be standard (JSON-based) or custom (HTML/Jinja).

Think of them as "templates" for generating printable documents.

:p How do you create a custom print format for a DocType in Frappe?
??x
Create a Print Format using Jinja2 templates with HTML/CSS.

```python
# Create print format via UI:
# 1. Go to Print Format List
# 2. New Print Format
# 3. Select DocType: Book
# 4. Choose "Custom Format"
# 5. Write HTML/Jinja

# Example print format template:
```

```jinja
{# Book Print Format #}
<div class="print-format">
    <style>
        .book-title {
            font-size: 24px;
            font-weight: bold;
        }
        .book-details {
            margin: 20px 0;
        }
    </style>

    <h1 class="book-title">{{ doc.title }}</h1>

    <div class="book-details">
        <p><strong>Author:</strong> {{ doc.author }}</p>
        <p><strong>ISBN:</strong> {{ doc.isbn }}</p>
        <p><strong>Published:</strong> {{ doc.publication_year }}</p>
        <p><strong>Genre:</strong> {{ doc.genre }}</p>
        <p><strong>Pages:</strong> {{ doc.number_of_pages }}</p>
    </div>

    {# Conditional content #}
    {% if doc.available %}
        <p style="color: green;">✓ Available</p>
    {% else %}
        <p style="color: red;">✗ Currently Borrowed</p>
    {% endif %}

    {# Access linked documents #}
    {% set author_bio = frappe.db.get_value("Author",
                                           doc.author,
                                           "biography") %}
    {% if author_bio %}
        <div class="author-bio">
            <h3>About the Author</h3>
            <p>{{ author_bio }}</p>
        </div>
    {% endif %}

    {# Loops for child tables #}
    {% if doc.reviews %}
        <h3>Reviews</h3>
        {% for review in doc.reviews %}
            <div class="review">
                <strong>{{ review.reviewer }}:</strong>
                {{ review.comment }}
            </div>
        {% endfor %}
    {% endif %}
</div>
```

```python
# Available in Jinja template:
# - doc: The document object
# - frappe: Frappe module (frappe.db, frappe.utils, etc.)
# - _: Translation function

# Generate PDF programmatically:
pdf = frappe.get_print("Book",
                      "book-001",
                      print_format="Book Print Format")

# Save PDF to file:
from frappe.utils.pdf import get_pdf
pdf_data = get_pdf(html_content)

# Attach PDF to email:
frappe.sendmail(
    recipients=["user@example.com"],
    subject="Book Details",
    message="Please find book details attached",
    attachments=[{
        "fname": "book.pdf",
        "fcontent": pdf_data
    }]
)

# Pseudocode:
# function get_print(doctype, name, print_format):
#     # Load document
#     doc = get_doc(doctype, name)
#
#     # Load print format template
#     template = get_print_format_template(print_format)
#
#     # Render with Jinja
#     context = {
#         "doc": doc,
#         "frappe": frappe,
#         "_": translate
#     }
#     html = jinja.render(template, context)
#
#     # Convert HTML to PDF
#     pdf = html_to_pdf(html)
#
#     return pdf

# Access from browser:
# /api/method/frappe.utils.print_format.download_pdf?
#   doctype=Book&name=book-001&format=Book Print Format
```
x??

---

#### Email Queue and Delayed Sending
Frappe queues emails for background sending instead of sending immediately. This prevents request timeouts and allows retry on failure. The email queue is processed by background workers.

Immediate sending blocks the request. Queued sending is asynchronous.

:p How does email sending work in Frappe and how do you control immediate vs queued sending?
??x
Use `frappe.sendmail()` with `now=False` (default) for queued or `now=True` for immediate.

```python
import frappe

# Queued sending (default, recommended)
frappe.sendmail(
    recipients=["user@example.com"],
    subject="Book Available",
    message="Your requested book is now available",
    now=False  # Default: Queue for background sending
)
# Email added to queue, sent by worker

# Immediate sending (blocks request)
frappe.sendmail(
    recipients=["admin@example.com"],
    subject="Critical Alert",
    message="Immediate action required",
    now=True  # Send immediately, wait for completion
)

# Delayed sending (scheduled)
frappe.sendmail(
    recipients=["user@example.com"],
    subject="Reminder",
    message="Return your book",
    delayed=True,  # Queue with lower priority
    send_after=frappe.utils.add_days(None, 7)  # Send after 7 days
)

# Rich HTML email:
frappe.sendmail(
    recipients=["user@example.com"],
    subject="New Book Available",
    message="""
        <h2>New Book Added</h2>
        <p><strong>Title:</strong> Clean Code</p>
        <p><strong>Author:</strong> Robert Martin</p>
        <a href="http://example.com/book/clean-code">View Book</a>
    """,
    attachments=[{
        "fname": "book-cover.jpg",
        "fcontent": image_data
    }]
)

# Check email queue:
queue = frappe.get_all("Email Queue",
    filters={"status": "Not Sent"},
    fields=["name", "recipients", "subject", "status"]
)

# Pseudocode flow:
# QUEUED (now=False):
# function sendmail(recipients, subject, message, now=False):
#     email_doc = create_email_queue_entry({
#         "recipients": recipients,
#         "subject": subject,
#         "message": message,
#         "status": "Not Sent"
#     })
#     email_doc.insert()
#     # Returns immediately
#
# Background worker:
# while True:
#     pending = get_pending_emails()
#     for email in pending:
#         try:
#             smtp_send(email)
#             email.status = "Sent"
#         except:
#             email.status = "Error"
#             email.retry_count += 1
#     sleep(60)

# IMMEDIATE (now=True):
# function sendmail(recipients, subject, message, now=True):
#     try:
#         smtp_send(recipients, subject, message)
#         # Blocks until sent
#     except Exception as e:
#         log_error(e)
#         raise

# Retry failed emails:
frappe.enqueue("frappe.email.queue.flush", queue="default")

# Email with template:
frappe.sendmail(
    recipients=["user@example.com"],
    template="book_notification",
    args={"book": book_doc},
    subject="Book Notification"
)
```
x??

---

#### Translation System (_)
Frappe supports multi-language applications through the translation system. The `_()` function marks strings for translation, and translations are stored in CSV files. Users see content in their preferred language.

English is the source language, other languages are translations.

:p How do you make your Frappe application support multiple languages?
??x
Use `_()` function to mark translatable strings and provide translation files.

```python
import frappe
from frappe import _

# Mark string for translation
message = _("Book not found")
frappe.throw(_(message))

# Translation with context:
label = _("Author")  # Could be "Author" or "Autor" or "著者"

# Formatted translations:
message = _("Book {0} is borrowed by {1}").format(
    book_name,
    user_name
)

# Plural forms:
count = 5
message = _("{0} books found").format(count)

# In JavaScript (client-side):
frappe.msgprint(__("Book saved successfully"));
// __ is the JS equivalent of _

# In Jinja templates:
# {{ _("Welcome") }}
# {{ _("Total: {0}").format(total) }}

# Translation files stored in:
# app/translations/[language_code].csv
#
# Example: de.csv (German)
# Book not found,Buch nicht gefunden
# Author,Autor
# {0} books found,{0} Bücher gefunden

# Set user language:
user = frappe.get_doc("User", "user@example.com")
user.language = "de"  # German
user.save()

# Programmatically translate:
translated = frappe.translate.get_translation(
    "Book not found",
    lang="de"
)
print(translated)  # "Buch nicht gefunden"

# Pseudocode:
# function _(source_string):
#     user_lang = frappe.session.lang or "en"
#
#     if user_lang == "en":
#         return source_string  # No translation needed
#
#     # Look up translation
#     translation = get_from_translation_file(source_string, user_lang)
#
#     if translation:
#         return translation
#     else:
#         return source_string  # Fallback to English

# Extract translatable strings:
# bench --site sitename get-untranslated [language]

# Update translation file:
# Edit app/translations/de.csv
# Add: Book not found,Buch nicht gefunden

# Reload translations:
# bench --site sitename build

# Context-aware translations:
_("Status")  # Could mean different things
_("Status", context="Document Status")  # More specific

# DocType field translations:
# Field labels automatically translated if translation exists
```
x??

---

#### Route and Page Rendering
Frappe renders pages based on routes. Routes map URLs to pages, doctypes, or custom handlers. The routing system determines what content to show for each URL.

Routes are like URL patterns that tell Frappe "what to display when user visits this URL".

:p How does Frappe's routing system work and how do you create custom routes?
??x
Routes map URLs to handlers. Create custom routes via Web Page DocType or route hooks.

```python
# URL structure:
# /app/[doctype]/[name]  → Form view
# /app/[doctype]         → List view
# /[page-route]          → Web page or custom handler

# Create Web Page (simple):
web_page = frappe.get_doc({
    "doctype": "Web Page",
    "title": "About Us",
    "route": "about",  # URL: /about
    "published": 1,
    "content": "<h1>About Our Library</h1><p>...</p>"
})
web_page.insert()
# Now /about shows this page

# Custom route handler in hooks.py:
website_route_rules = [
    {"from_route": "/books/<genre>",
     "to_route": "book_list_by_genre"},
]

# Handler function:
# frappe/www/book_list_by_genre.py
import frappe

def get_context(context):
    # Get genre from route
    genre = frappe.form_dict.genre

    # Fetch books
    books = frappe.get_all("Book",
        filters={"genre": genre},
        fields=["name", "title", "author"]
    )

    # Pass to template
    context.books = books
    context.genre = genre

    return context

# Template: book_list_by_genre.html
```

```html
{% extends "templates/web.html" %}

{% block content %}
<h1>{{ genre }} Books</h1>
<ul>
    {% for book in books %}
        <li>{{ book.title }} by {{ book.author }}</li>
    {% endfor %}
</ul>
{% endblock %}
```

```python
# Now /books/Science shows all science books

# Programmatic route resolution:
route = frappe.get_route()  # ['books', 'Science']

# Redirect to different route:
frappe.local.flags.redirect_location = "/app/book"
raise frappe.Redirect

# Pseudocode routing:
# function handle_request(url):
#     route = parse_url(url)
#
#     # Check route type
#     if route.startswith("/app/"):
#         # Desk route
#         return render_desk_page(route)
#
#     elif route.startswith("/api/"):
#         # API route
#         return handle_api(route)
#
#     else:
#         # Website route
#         # 1. Check Web Page
#         web_page = db.exists("Web Page", {"route": route})
#         if web_page:
#             return render_web_page(web_page)
#
#         # 2. Check custom handler
#         handler = get_route_handler(route)
#         if handler:
#             context = handler.get_context()
#             return render_template(handler.template, context)
#
#         # 3. 404
#         return render_404()

# Route parameters:
# /books/<genre>/<year>
# Access: frappe.form_dict.genre, frappe.form_dict.year

# Portal pages (require login):
# frappe/www/my-account.py
# Add: no_cache = 1  # Don't cache authenticated pages
```
x??

---

#### File Attachments System
Frappe manages file uploads through the File DocType. Files can be attached to documents, stored on disk or cloud, and accessed via URLs. The system handles upload, storage, and serving of files.

Files are separate documents linked to parent documents.

:p How do you handle file uploads and attachments in Frappe?
??x
Files are managed through the File DocType with automatic handling of uploads and storage.

```python
import frappe
import base64

# Upload file programmatically:
file_doc = frappe.get_doc({
    "doctype": "File",
    "file_name": "book-cover.jpg",
    "attached_to_doctype": "Book",
    "attached_to_name": "book-001",
    "content": base64.b64encode(image_data).decode(),
    "decode": True  # Decode base64
})
file_doc.save()

# Or use save_file helper:
file_doc = frappe.get_doc({
    "doctype": "File",
    "file_name": "document.pdf",
    "attached_to_doctype": "Book",
    "attached_to_name": "book-001",
    "is_private": 1  # Private file
})
file_doc.save_file(
    file_content,
    decode=False  # If already binary
)

# Get attached files:
files = frappe.get_all("File",
    filters={
        "attached_to_doctype": "Book",
        "attached_to_name": "book-001"
    },
    fields=["file_url", "file_name", "file_size"]
)

for file in files:
    print(f"{file.file_name}: {file.file_url}")

# Access file URL:
# /files/book-cover.jpg  (public)
# /private/files/document.pdf  (private)

# Delete file:
file_doc = frappe.get_doc("File", file_name)
file_doc.delete()

# File storage locations:
# Public: sites/[site]/public/files/
# Private: sites/[site]/private/files/

# In DocType, add Attach field:
# {
#   "fieldname": "cover_image",
#   "fieldtype": "Attach",
#   "label": "Cover Image"
# }

# User uploads via form, automatic File doc created

# Pseudocode:
# function save_file(file_content, filename, doctype, name):
#     # Generate unique filename
#     unique_name = generate_unique_name(filename)
#
#     # Determine storage path
#     if is_private:
#         path = f"sites/{site}/private/files/{unique_name}"
#     else:
#         path = f"sites/{site}/public/files/{unique_name}"
#
#     # Write to disk
#     write_file(path, file_content)
#
#     # Create File DocType record
#     file_doc = create({
#         "doctype": "File",
#         "file_name": filename,
#         "file_url": f"/files/{unique_name}",
#         "file_size": len(file_content),
#         "attached_to_doctype": doctype,
#         "attached_to_name": name
#     })
#
#     return file_doc

# Download file:
@frappe.whitelist()
def download_file(file_url):
    file_doc = frappe.get_doc("File", {"file_url": file_url})

    frappe.local.response.filename = file_doc.file_name
    frappe.local.response.filecontent = file_doc.get_content()
    frappe.local.response.type = "download"

# Get file content:
file_doc = frappe.get_doc("File", "file-001")
content = file_doc.get_content()  # Binary content

# Image optimization:
from frappe.utils.image import optimize_image
optimize_image(file_path, max_width=800, max_height=600)
```
x??

---