# Frappe Patterns and Best Practices - Flashcards

#### Singleton Pattern via get_single()
Use Single DocTypes for application-wide settings instead of global variables. Provides UI for configuration, version control, and change tracking.

:p When should you use a Single DocType instead of config files or global variables?
??x
Use Single DocType for user-configurable application settings.

```python
# BAD: Hardcoded config
TIMEZONE = "UTC"
MAX_UPLOAD_SIZE = 10  # MB

# GOOD: Single DocType "App Settings"
settings = frappe.get_single("App Settings")
timezone = settings.timezone
max_size = settings.max_upload_size

# Benefits:
# - Users can change via UI
# - Changes tracked in audit log
# - Validators ensure correctness
# - Can export/import with data

# Pseudocode pattern:
# class AppSettings(Document):
#     def validate(self):
#         if self.max_upload_size > 100:
#             frappe.throw("Too large")
#
# Usage everywhere:
# settings = frappe.get_single("App Settings")
# if file_size > settings.max_upload_size:
#     reject()
```
x??

---

#### Factory Pattern via get_controller()
DocType controllers are loaded dynamically. get_controller() returns the correct class for a doctype. Enables polymorphism and extensibility.

:p How does Frappe implement the factory pattern for DocType controllers?
??x
Via `get_controller(doctype)` which dynamically loads the controller class.

```python
from frappe.model.base_document import get_controller

# Get controller class (not instance)
BookController = get_controller("Book")

# Create instance
book = BookController({"title": "Test"})

# Frappe does this internally in get_doc():
# controller_class = get_controller(doctype)
# return controller_class(*args, **kwargs)

# Pseudocode:
# function get_controller(doctype):
#     # Build module path
#     module_path = f"{app}.{module}.doctype.{doctype}.{doctype}"
#
#     try:
#         # Import module
#         module = import_module(module_path)
#
#         # Get class (same name as doctype)
#         controller_class = getattr(module, doctype)
#
#         return controller_class
#     except ImportError:
#         # No custom controller, use base Document
#         return Document
#
# Example inheritance:
# frappe/custom/doctype/book/book.py:
# class Book(Document):  # Custom controller
#     def validate(self):
#         # Custom logic
#
# get_doc("Book") returns Book instance
# get_doc("User") returns User instance
```
x??

---

#### Observer Pattern via Hooks
Hooks implement the observer pattern. Multiple observers (hook functions) react to document events without coupling to the document class.

:p How do hooks implement the observer pattern in Frappe?
??x
Hook functions are observers that respond to document events (subjects).

```python
# Subject: Document class
class Book(Document):
    def after_insert(self):
        # Notify observers
        run_hooks("after_insert", self)

# Observers: Hook functions (in different modules)
# app1/hooks.py:
doc_events = {
    "Book": {
        "after_insert": "app1.observers.send_notification"
    }
}

# app2/hooks.py:
doc_events = {
    "Book": {
        "after_insert": "app2.observers.update_inventory"
    }
}

# Both observers notified on book creation
# No coupling between Book class and observers

# Pseudocode:
# function run_hooks(event, doc):
#     hooks = get_all_hooks(event, doc.doctype)
#     # ["app1.observers.send_notification",
#     #  "app2.observers.update_inventory"]
#
#     for hook_function in hooks:
#         execute(hook_function, doc, event)
#
# Pattern benefits:
# - Add observers without modifying subject
# - Multiple apps can extend same doctype
# - Loose coupling
```
x??

---

#### Strategy Pattern for Field Validation
Different field types use different validation strategies. The fieldtype determines which validator is applied.

:p How does Frappe use the strategy pattern for field validation?
??x
Each fieldtype has a corresponding validation strategy.

```python
# Field validation strategies
validators = {
    "Email": validate_email,
    "Int": validate_integer,
    "Currency": validate_currency,
    "Date": validate_date,
    "Link": validate_link
}

# Meta class applies correct validator
def validate_field(field, value):
    validator = validators[field.fieldtype]
    return validator(value, field)

# Pseudocode:
# class Document:
#     def validate_fields(self):
#         for field in self.meta.fields:
#             value = self.get(field.fieldname)
#
#             # Select strategy based on fieldtype
#             validator = get_validator(field.fieldtype)
#
#             # Execute strategy
#             is_valid = validator.validate(value, field)
#
#             if not is_valid:
#                 throw(f"Invalid {field.label}")
#
# Example validators:
# class EmailValidator:
#     def validate(value, field):
#         regex = r'^[\w\.-]+@[\w\.-]+\.\w+$'
#         return re.match(regex, value)
#
# class IntValidator:
#     def validate(value, field):
#         return isinstance(value, int)
```
x??

---

#### Decorator Pattern for Permissions
Permission checking wraps method execution. @whitelist and @only_for decorators add permission layers without modifying core logic.

:p How do decorators add permission layers in Frappe?
??x
Decorators wrap methods with permission checks before execution.

```python
# Layer 1: Whitelist (API access)
@frappe.whitelist()
def my_method():
    # Layer 2: Role check
    @frappe.only_for("System Manager")
    def dangerous_operation():
        # Core logic
        delete_all_data()

    dangerous_operation()

# Pseudocode execution:
# User calls: frappe.call("my_method")
#
# 1. Check @whitelist:
#    if not has_whitelist_decorator(my_method):
#        raise Forbidden("Method not whitelisted")
#
# 2. Execute my_method:
#    Execute dangerous_operation
#
# 3. Check @only_for:
#    if not has_role(user, "System Manager"):
#        raise PermissionError("Need System Manager")
#
# 4. Execute core logic:
#    delete_all_data()
#
# Decorator wrapping:
# function whitelist(fn):
#     fn._is_whitelisted = True
#     return fn
#
# function only_for(role):
#     def decorator(fn):
#         def wrapper(*args):
#             if role not in user_roles:
#                 raise PermissionError
#             return fn(*args)
#         return wrapper
#     return decorator
```
x??

---

#### Template Method Pattern in Document Lifecycle
Document class defines template (save process). Subclasses override specific steps (validate, before_save) without changing overall algorithm.

:p How does the Document save process use the template method pattern?
??x
Base Document defines save template, subclasses override specific steps.

```python
# Base Document (template)
class Document:
    def save(self):
        # Template algorithm
        self.run_before_save_methods()
        self.validate()           # Hook 1
        self.before_save()        # Hook 2
        self.db_update()          # Fixed step
        self.after_save()         # Hook 3
        self.run_post_save_methods()

    def validate(self):
        pass  # Override in subclass

    def before_save(self):
        pass  # Override in subclass

# Subclass (concrete implementation)
class Book(Document):
    def validate(self):
        # Custom validation
        if not self.title:
            frappe.throw("Title required")

    def before_save(self):
        # Custom logic
        self.title = self.title.upper()

# Usage:
book = frappe.get_doc("Book", "book-001")
book.save()  # Executes template with Book's overrides

# Pseudocode flow:
# function save():
#     # Fixed template algorithm
#     run_before_save_methods()
#
#     validate()              # Subclass-specific
#     before_save()           # Subclass-specific
#
#     # Fixed database operation
#     db_update()
#
#     after_save()            # Subclass-specific
#
#     run_post_save_methods()
#
# Benefits:
# - Consistent save process across all DocTypes
# - Subclasses customize specific steps
# - Cannot break overall algorithm
```
x??

---

#### Cache-Aside Pattern with frappe.cache()
Application checks cache first, loads from DB on miss, then populates cache. Frappe implements this pattern in get_cached_doc().

:p How does Frappe implement the cache-aside pattern?
??x
Check cache first, load from DB on miss, populate cache for next time.

```python
def get_book_stats():
    cache_key = "book_stats"

    # 1. Try cache (aside from main data store)
    stats = frappe.cache().get_value(cache_key)

    if stats:
        return stats  # Cache hit

    # 2. Cache miss - load from DB
    stats = {
        "total": frappe.db.count("Book"),
        "available": frappe.db.count("Book", {"available": 1})
    }

    # 3. Populate cache for next request
    frappe.cache().set_value(cache_key, stats, expires_in_sec=3600)

    return stats

# Pseudocode:
# function get_with_cache_aside(key):
#     # Step 1: Check cache
#     value = cache.get(key)
#
#     if value is not None:
#         return value  # Fast path
#
#     # Step 2: Cache miss - go to source
#     value = database.get(key)
#
#     # Step 3: Update cache
#     cache.set(key, value)
#
#     return value  # Slow path (first time only)
#
# Next request:
#   cache.get(key) → HIT → return (fast)
```
x??

---

#### Repository Pattern via frappe.db
frappe.db abstracts database operations. Provides consistent interface regardless of underlying DB (MariaDB/PostgreSQL).

:p How does frappe.db implement the repository pattern?
??x
frappe.db provides a database-agnostic interface for data access.

```python
# Application code (DB-agnostic)
books = frappe.db.get_all("Book", filters={"available": 1})

# frappe.db translates to actual DB
# MariaDB:
#   SELECT * FROM `tabBook` WHERE available = 1
# PostgreSQL:
#   SELECT * FROM "tabBook" WHERE available = 1

# Pseudocode:
# class DatabaseRepository:
#     def __init__(db_type):
#         if db_type == "mariadb":
#             self.connector = MariaDBConnector()
#         elif db_type == "postgres":
#             self.connector = PostgresConnector()
#
#     def get_all(doctype, filters):
#         # Build query using connector's syntax
#         query = self.connector.build_query(doctype, filters)
#         return self.connector.execute(query)
#
# class MariaDBConnector:
#     def build_query(doctype, filters):
#         return f"SELECT * FROM `tab{doctype}` WHERE {filters}"
#
# class PostgresConnector:
#     def build_query(doctype, filters):
#         return f'SELECT * FROM "tab{doctype}" WHERE {filters}'
#
# Benefits:
# - Switch DB without changing application code
# - Consistent API
# - Easy testing (mock repository)
```
x??

---

#### Lazy Loading for Child Tables
Child table records loaded only when accessed, not when parent loads. Improves performance for documents with many children.

:p How does Frappe implement lazy loading for child tables?
??x
Child tables load on first access, not when parent document loads.

```python
# Load parent document
invoice = frappe.get_doc("Invoice", "INV-001")
# At this point, child items NOT loaded

# Access child table (triggers lazy load)
for item in invoice.items:  # Load happens here
    print(item.item_code)

# Pseudocode:
# class Document:
#     def __init__(doctype, name):
#         # Load only parent fields
#         self.load_from_db()
#         # Child tables marked as "not loaded"
#         self._loaded_children = {}
#
#     def __getattribute__(name):
#         field = get_field_meta(name)
#
#         if field.fieldtype == "Table":
#             # Check if already loaded
#             if name not in self._loaded_children:
#                 # Lazy load now
#                 children = db.get_all(field.options, {
#                     "parent": self.name,
#                     "parenttype": self.doctype
#                 })
#                 self.set(name, children)
#                 self._loaded_children[name] = True
#
#         return super().__getattribute__(name)
#
# Performance:
# Without lazy loading:
#   Load parent: 1 query
#   Load 5 child tables: 5 queries
#   Total: 6 queries (always)
#
# With lazy loading:
#   Load parent: 1 query
#   Access 2 child tables: 2 queries
#   Total: 3 queries (only what's needed)
```
x??

---

#### Builder Pattern for Complex Documents
Use setter methods to build complex documents step by step. Better than passing huge dictionaries.

:p When should you use the builder pattern for creating documents?
??x
For complex documents with many fields, use setter methods instead of large dicts.

```python
# BAD: Large dict (hard to read/maintain)
invoice = frappe.get_doc({
    "doctype": "Invoice",
    "customer": "CUST-001",
    "posting_date": "2025-01-15",
    "due_date": "2025-02-15",
    "items": [
        {"item_code": "ITEM-001", "qty": 5, "rate": 100},
        {"item_code": "ITEM-002", "qty": 3, "rate": 200}
    ],
    "taxes": [
        {"account": "Tax", "rate": 10}
    ]
})

# GOOD: Builder pattern (readable)
invoice = frappe.new_doc("Invoice")
invoice.customer = "CUST-001"
invoice.posting_date = "2025-01-15"
invoice.due_date = "2025-02-15"

# Add items
invoice.append("items", {
    "item_code": "ITEM-001",
    "qty": 5,
    "rate": 100
})
invoice.append("items", {
    "item_code": "ITEM-002",
    "qty": 3,
    "rate": 200
})

# Add tax
invoice.append("taxes", {
    "account": "Tax",
    "rate": 10
})

invoice.insert()

# Pseudocode pattern:
# class DocumentBuilder:
#     def __init__(doctype):
#         self.doc = new_doc(doctype)
#
#     def set_customer(customer):
#         self.doc.customer = customer
#         return self  # Fluent interface
#
#     def add_item(item_code, qty, rate):
#         self.doc.append("items", {
#             "item_code": item_code,
#             "qty": qty,
#             "rate": rate
#         })
#         return self
#
#     def build():
#         return self.doc
#
# Usage:
# invoice = (InvoiceBuilder("Invoice")
#     .set_customer("CUST-001")
#     .add_item("ITEM-001", 5, 100)
#     .add_item("ITEM-002", 3, 200)
#     .build())
```
x??

---

#### Command Pattern via frappe.enqueue()
Background jobs encapsulate operations as commands. Can be queued, scheduled, retried independently.

:p How does frappe.enqueue() implement the command pattern?
??x
Each enqueued job is a command object that can be executed later.

```python
# Command: Send email
frappe.enqueue(
    method="app.tasks.send_email",
    queue="default",
    recipients=["user@example.com"],
    subject="Hello"
)

# Command stored and executed later by worker

# Pseudocode:
# class Command:
#     def __init__(method, **kwargs):
#         self.method = method
#         self.kwargs = kwargs
#
#     def execute():
#         function = import_function(self.method)
#         return function(**self.kwargs)
#
# function enqueue(method, **kwargs):
#     # Create command object
#     command = Command(method, **kwargs)
#
#     # Serialize and queue
#     redis.push("queue:default", serialize(command))
#
# # Worker (separate process)
# while True:
#     command = redis.pop("queue:default")
#     command.execute()
#
# Benefits:
# - Decouple request from execution
# - Queue commands for later
# - Retry on failure
# - Execute in different process/server
```
x??

---

#### Specification Pattern for Filters
Filters are specifications that select records. Can combine specifications with AND/OR logic.

:p How do filters implement the specification pattern?
??x
Filters are specifications that define selection criteria.

```python
# Simple specification
filters = {"available": 1}

# Composite specification (AND)
filters = {
    "available": 1,
    "genre": "Science",
    "publication_year": [">", 2000]
}

# OR specification
filters = [
    {"genre": "Science"},
    {"genre": "Fiction"}
]

# Pseudocode:
# class Specification:
#     def is_satisfied_by(item):
#         pass
#
# class AvailableSpec(Specification):
#     def is_satisfied_by(item):
#         return item.available == 1
#
# class GenreSpec(Specification):
#     def __init__(genre):
#         self.genre = genre
#
#     def is_satisfied_by(item):
#         return item.genre == self.genre
#
# class AndSpecification(Specification):
#     def __init__(*specs):
#         self.specs = specs
#
#     def is_satisfied_by(item):
#         return all(s.is_satisfied_by(item) for s in self.specs)
#
# # Usage:
# spec = AndSpecification(
#     AvailableSpec(),
#     GenreSpec("Science")
# )
#
# books = all_books.filter(spec.is_satisfied_by)
#
# Frappe translates to SQL:
# filters = {"available": 1, "genre": "Science"}
# → WHERE available = 1 AND genre = 'Science'
```
x??

---

#### Null Object Pattern for Optional Fields
Frappe returns None for missing fields. Use get() with default to implement null object pattern.

:p How do you handle optional fields without None checks everywhere?
??x
Use `get(fieldname, default)` to provide null objects/defaults.

```python
# BAD: Lots of None checks
if book.subtitle is not None:
    display_subtitle = book.subtitle
else:
    display_subtitle = ""

# GOOD: Null object pattern
display_subtitle = book.get("subtitle", "")

# For objects
author = book.get("author_details") or {}
bio = author.get("bio", "No bio available")

# Pseudocode:
# class Document:
#     def get(key, default=None):
#         value = self.get_value(key)
#
#         if value is None:
#             return default  # Null object
#
#         return value
#
# Example null objects:
# Empty string: ""
# Empty list: []
# Empty dict: {}
# Default number: 0
#
# Usage:
# tags = doc.get("tags", [])  # Empty list if None
# for tag in tags:  # Works even if tags was None
#     process(tag)
```
x??

---

#### Identity Map Pattern via Document Cache
Frappe caches documents by name to ensure single instance per request. Prevents inconsistent state from multiple loads.

:p How does Frappe ensure you get the same document instance?
??x
Via identity map - same name returns cached instance within request.

```python
# First load
book1 = frappe.get_doc("Book", "book-001")

# Second load (same request)
book2 = frappe.get_doc("Book", "book-001")

# book1 and book2 are THE SAME OBJECT
assert book1 is book2  # True

# Modify one
book1.title = "New Title"

# Other reference sees change
print(book2.title)  # "New Title"

# Pseudocode:
# frappe.local.doc_cache = {}  # Identity map
#
# function get_doc(doctype, name):
#     cache_key = f"{doctype}::{name}"
#
#     # Check identity map
#     if cache_key in frappe.local.doc_cache:
#         return frappe.local.doc_cache[cache_key]
#
#     # Load from DB
#     doc = load_from_db(doctype, name)
#
#     # Store in identity map
#     frappe.local.doc_cache[cache_key] = doc
#
#     return doc
#
# Benefits:
# - Consistent state within request
# - Avoid duplicate DB queries
# - Changes visible across references
#
# Cleared after each request
```
x??

---

#### Chain of Responsibility for Permission Checks
Permission checking chains: DocPerm → User Permission → Custom Checks. Each handler in chain can allow or deny.

:p How does Frappe's permission system use chain of responsibility?
??x
Multiple permission handlers check in sequence, any can deny access.

```python
# Permission check chain
def has_permission(doc):
    # Handler 1: DocPerm (role-based)
    if not check_docperm(doc):
        return False

    # Handler 2: User Permission (record-level)
    if not check_user_permission(doc):
        return False

    # Handler 3: Custom permission (in controller)
    if hasattr(doc, "has_permission"):
        if not doc.has_permission():
            return False

    # Handler 4: Shared documents
    if not check_share_permission(doc):
        return False

    # All handlers passed
    return True

# Pseudocode:
# class PermissionHandler:
#     def __init__(next_handler=None):
#         self.next = next_handler
#
#     def check(doc, user):
#         pass  # Override
#
# class DocPermHandler(PermissionHandler):
#     def check(doc, user):
#         has_role_perm = check_role_permissions(doc, user)
#
#         if not has_role_perm:
#             return False  # Deny
#
#         if self.next:
#             return self.next.check(doc, user)
#
#         return True
#
# class UserPermHandler(PermissionHandler):
#     def check(doc, user):
#         user_perms = get_user_permissions(user, doc.doctype)
#
#         if user_perms and not matches_user_perm(doc, user_perms):
#             return False  # Deny
#
#         if self.next:
#             return self.next.check(doc, user)
#
#         return True
#
# # Build chain
# chain = DocPermHandler(
#     UserPermHandler(
#         CustomPermHandler()
#     )
# )
#
# has_access = chain.check(doc, user)
```
x??

---

#### Memento Pattern via Version Control
Frappe stores document versions as mementos. Can restore to previous state.

:p How does version control implement the memento pattern?
??x
Each save creates a memento (version) that can restore previous state.

```python
# Enable versioning on DocType
# track_changes = 1

# Each save creates version
book = frappe.get_doc("Book", "book-001")
book.title = "New Title"
book.save()  # Version 1 created

book.title = "Another Title"
book.save()  # Version 2 created

# View versions
versions = frappe.get_all("Version",
    filters={"ref_doctype": "Book", "docname": "book-001"},
    order_by="creation desc"
)

# Restore to version
version = frappe.get_doc("Version", versions[1].name)
old_data = json.loads(version.data)

book.update(old_data)
book.save()  # Restored

# Pseudocode:
# class Memento:  # Version DocType
#     def __init__(data):
#         self.data = serialize(data)
#
#     def get_state():
#         return deserialize(self.data)
#
# class Originator:  # Document
#     def save():
#         # Create memento before save
#         if track_changes:
#             memento = Memento(self.as_dict())
#             store_version(memento)
#
#         # Actual save
#         db_update()
#
#     def restore(memento):
#         state = memento.get_state()
#         self.update(state)
#
# # Caretaker (Version management)
# class VersionManager:
#     def save_version(doc):
#         versions.append(Memento(doc))
#
#     def get_version(doc, version_num):
#         return versions[version_num]
```
x??

---

#### Adapter Pattern for External APIs
Frappe integrations adapt external APIs to internal interface. Consistent usage regardless of external system.

:p How do integrations adapt external APIs to Frappe's interface?
??x
Via adapter pattern - wrap external API with Frappe-compatible interface.

```python
# External API (different interface)
class StripeAPI:
    def create_payment(amount, currency, token):
        # Stripe-specific call
        pass

# Adapter (Frappe interface)
class PaymentGateway(Document):
    def process_payment(self, amount):
        if self.provider == "Stripe":
            adapter = StripeAdapter(self.api_key)
            return adapter.process(amount)

class StripeAdapter:
    def __init__(api_key):
        self.api = StripeAPI(api_key)

    def process(amount):  # Frappe interface
        # Adapt to Stripe
        return self.api.create_payment(
            amount=amount * 100,  # Stripe uses cents
            currency="USD",
            token=self.get_token()
        )

# Pseudocode:
# # Target interface (what Frappe expects)
# class PaymentProcessor:
#     def process_payment(amount):
#         pass
#
# # Adaptee (external system)
# class ExternalPaymentAPI:
#     def charge(cents, currency_code, auth_token):
#         pass  # Different interface
#
# # Adapter
# class ExternalPaymentAdapter(PaymentProcessor):
#     def __init__(external_api):
#         self.api = external_api
#
#     def process_payment(amount):
#         # Translate interface
#         cents = amount * 100
#         currency_code = "USD"
#         token = get_auth_token()
#
#         return self.api.charge(cents, currency_code, token)
#
# # Usage (same for all adapters)
# processor = get_payment_processor()  # Could be any adapter
# processor.process_payment(100)  # Consistent interface
```
x??

---

#### Proxy Pattern for Permission Checking
Document access goes through proxy that checks permissions. Actual document only accessible after permission check.

:p How does Frappe implement lazy permission checking?
??x
Via proxy that checks permissions before allowing document access.

```python
# Simplified concept
class DocumentProxy:
    def __init__(doctype, name):
        self.doctype = doctype
        self.name = name
        self._real_doc = None

    def __getattr__(attr):
        # Lazy load + permission check
        if not self._real_doc:
            if not frappe.has_permission(self.doctype, "read", self.name):
                raise frappe.PermissionError

            self._real_doc = load_from_db(self.doctype, self.name)

        return getattr(self._real_doc, attr)

# Usage
doc = DocumentProxy("Book", "book-001")
# No DB hit yet, no permission check yet

title = doc.title  # NOW: check permission + load from DB

# Pseudocode:
# class RealDocument:
#     # Actual document with data
#     def __init__(data):
#         self.data = data
#
# class DocumentProxy:
#     def __init__(doctype, name):
#         self.doctype = doctype
#         self.name = name
#         self.real_doc = None  # Not loaded yet
#
#     def load_real_doc():
#         # Check permission first
#         if not has_permission(self.doctype, self.name):
#             raise PermissionError
#
#         # Load actual document
#         self.real_doc = RealDocument(
#             load_from_db(self.doctype, self.name)
#         )
#
#     def __getattribute__(attr):
#         if self.real_doc is None:
#             self.load_real_doc()  # Lazy load
#
#         return getattr(self.real_doc, attr)
#
# Benefits:
# - Permission check only when actually accessed
# - Can pass proxy around without loading
# - Protect actual document
```
x??

---

