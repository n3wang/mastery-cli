# Django & Backend Concepts Flashcards

## Django Models & Database

#### Django Model Field Types
In Paperless-NGX, the Document model uses various Django field types. Each field type maps to a specific database column type and provides validation:

```python
# From src/documents/models.py
class Document(models.Model):
    title = models.CharField(max_length=128)  # VARCHAR(128)
    created = models.DateTimeField(auto_now_add=True)  # TIMESTAMP
    modified = models.DateTimeField(auto_now=True)  # TIMESTAMP
    checksum = models.CharField(max_length=32, unique=True)  # VARCHAR(32) UNIQUE
    page_count = models.IntegerField(null=True, blank=True)  # INTEGER, nullable

    # ForeignKey creates a relation (stores ID of related object)
    correspondent = models.ForeignKey(
        Correspondent,
        on_delete=models.SET_NULL,  # What happens when correspondent is deleted
        null=True
    )
```

The `on_delete` parameter is crucial - it defines database behavior when the referenced object is deleted.
:p What are the main Django field types used in Paperless-NGX's Document model and what do `null=True` vs `blank=True` mean?
??x
Main field types:
- `CharField`: Variable-length strings (needs max_length)
- `DateTimeField`: Timestamps (auto_now_add for creation, auto_now for updates)
- `IntegerField`: Integer numbers
- `ForeignKey`: Relation to another model

`null=True`: Database can store NULL (database-level)
`blank=True`: Form validation allows empty value (application-level)

Often used together for optional fields.
x??

---

#### Django Migrations Workflow
Django tracks database schema changes through migrations. When you modify a model, Django generates Python files that describe the changes:

```python
# Workflow:
# 1. Modify model in models.py
class Document(models.Model):
    new_field = models.CharField(max_length=100)

# 2. Generate migration
# $ python manage.py makemigrations documents
# Creates: migrations/0042_document_new_field.py

# 3. Migration file contains:
operations = [
    migrations.AddField(
        model_name='document',
        name='new_field',
        field=models.CharField(max_length=100),
    ),
]

# 4. Apply to database
# $ python manage.py migrate documents
```

Migrations are version-controlled and can be rolled back.
:p What is the Django migrations workflow and what commands are used to create and apply migrations?
??x
Two-step process:

1. `python manage.py makemigrations <app_name>`
   - Detects model changes
   - Generates migration file with operations

2. `python manage.py migrate <app_name>`
   - Applies migrations to database
   - Updates schema

Migration files are Python code that can be version-controlled.
You can rollback: `migrate <app_name> <migration_number>`
x??

---

#### Django REST Framework Serializers
Serializers convert between Django models (Python objects) and JSON (API format). In Paperless-NGX, serializers control what data is exposed via API:

```python
# From src/documents/serialisers.py
class DocumentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Document
        fields = (
            'id',
            'title',
            'created',
            'correspondent',  # Will serialize as correspondent ID
            # ... more fields
        )

    # Custom field handling
    def to_representation(self, instance):
        # Called when converting model → JSON (GET request)
        data = super().to_representation(instance)
        # Can modify data here
        return data

    def to_internal_value(self, data):
        # Called when converting JSON → model (POST/PUT request)
        return super().to_internal_value(data)
```

ModelSerializer automatically creates fields based on the model definition.
:p What is the role of Django REST Framework serializers and how do they work in Paperless-NGX?
??x
Serializers are bidirectional converters:

**Model → JSON (Response)**:
- `to_representation()` method
- Used for GET requests
- Returns dictionary for JSON encoding

**JSON → Model (Request)**:
- `to_internal_value()` method
- Used for POST/PUT/PATCH requests
- Validates and converts input data

`ModelSerializer` auto-generates fields from model definition.
The `fields` tuple controls what's exposed in API.
x??

---

#### Django QuerySets and Lazy Evaluation
Django uses lazy evaluation for database queries. Queries aren't executed until data is actually needed:

```python
# From src/documents/views.py (simplified)

# This does NOT hit the database yet (lazy)
documents = Document.objects.filter(title__icontains='invoice')

# Still no database query
documents = documents.exclude(deleted_at__isnull=False)

# NOW the database is queried (evaluation forced):
# 1. Iteration
for doc in documents:
    print(doc.title)  # Database query happens here

# 2. List conversion
doc_list = list(documents)  # Query happens

# 3. Slicing
first_ten = documents[:10]  # Query happens

# 4. Count
count = documents.count()  # Query happens
```

This allows Django to optimize queries by combining filters before executing.
:p How does Django's lazy evaluation work with QuerySets and when do database queries actually execute?
??x
QuerySets are lazy - they don't hit the database until evaluated.

**Building queries (no DB access)**:
```python
qs = Model.objects.filter(x=1).exclude(y=2)
```

**Evaluation triggers (DB access)**:
- Iteration: `for item in qs:`
- List conversion: `list(qs)`
- Slicing: `qs[:10]`
- `.count()`, `.exists()`, `.first()`
- Boolean context: `if qs:`

Benefits: Django combines filters into single optimized SQL query.
x??

---

## Celery & Asynchronous Tasks

#### Celery Task Queue Architecture
Paperless-NGX uses Celery for background processing. The architecture has three main components:

```
┌──────────────┐      ┌─────────┐      ┌────────────────┐
│   Django     │─────▶│  Redis  │◀─────│ Celery Worker  │
│ (Web Server) │      │ (Broker)│      │   (Consumer)   │
└──────────────┘      └─────────┘      └────────────────┘
     1. Enqueue           2. Store           3. Execute
        task              message             task
```

**Flow**:
```python
# 1. Define task (src/documents/consumer.py)
from celery import shared_task

@shared_task
def consume_document(document_id):
    # Heavy processing (OCR, indexing, etc.)
    # Runs in separate worker process
    pass

# 2. Enqueue from Django view
from documents.consumer import consume_document

def upload_view(request):
    doc = create_document(request.FILES['file'])
    # Task added to Redis queue, returns immediately
    consume_document.delay(doc.id)
    return Response({"status": "processing"})

# 3. Celery worker picks up task from Redis and executes
```

This prevents long operations from blocking web requests.
:p How does Celery task queue architecture work in Paperless-NGX and why is it used?
??x
**Architecture**: Django → Redis (broker) → Celery Worker

**Components**:
1. Django app: Enqueues tasks with `.delay()`
2. Redis: Stores task messages in queue
3. Celery worker: Picks tasks and executes

**Why use it**:
- Prevents blocking web requests
- Handles long operations (OCR, document processing)
- Scales independently (add more workers)
- Retry failed tasks

Example: Document upload returns immediately, processing happens in background.
x??

---

#### Celery Task Monitoring
Paperless-NGX tracks Celery task status so users can monitor background operations:

```python
# From src/documents/views.py (simplified)

# When task is created, we get a task ID
result = consume_document.delay(doc_id)
task_id = result.id  # UUID

# Store task info in database
PaperlessTask.objects.create(
    task_id=task_id,
    type='document_consumption',
    status='PENDING'
)

# Later, check task status
from celery.result import AsyncResult

task_result = AsyncResult(task_id)
status = task_result.state  # PENDING, STARTED, SUCCESS, FAILURE

# API endpoint returns task status
@api_view(['GET'])
def task_status(request, task_id):
    result = AsyncResult(task_id)
    return Response({
        'status': result.state,
        'progress': result.info.get('progress', 0),
        'result': result.result if result.successful() else None
    })
```

The frontend polls this endpoint to show progress.
:p How does Paperless-NGX monitor and track Celery task progress?
??x
**Task ID tracking**:
- `.delay()` returns AsyncResult with UUID task_id
- Store task_id in database (PaperlessTask model)

**Status checking**:
```python
AsyncResult(task_id).state
```

**States**: PENDING → STARTED → SUCCESS/FAILURE

**Frontend integration**:
- API endpoint exposes task status
- Frontend polls endpoint for updates
- Shows progress bars/spinners

Allows users to monitor long-running operations like document processing.
x??

---

## Django REST Framework Views

#### ViewSet vs APIView
Paperless-NGX primarily uses ViewSets for its REST API. Understanding the difference:

```python
# APIView: Manual control over HTTP methods
from rest_framework.views import APIView

class DocumentDetailView(APIView):
    def get(self, request, pk):
        document = Document.objects.get(pk=pk)
        return Response(serializer.data)

    def put(self, request, pk):
        # Update logic
        pass

    def delete(self, request, pk):
        # Delete logic
        pass

# ViewSet: Automatic CRUD operations
from rest_framework.viewsets import ModelViewSet

class DocumentViewSet(ModelViewSet):
    queryset = Document.objects.all()
    serializer_class = DocumentSerializer

    # Automatically provides:
    # list() -> GET /documents/
    # retrieve() -> GET /documents/{id}/
    # create() -> POST /documents/
    # update() -> PUT /documents/{id}/
    # partial_update() -> PATCH /documents/{id}/
    # destroy() -> DELETE /documents/{id}/

    # Add custom actions:
    @action(detail=True, methods=['post'])
    def download(self, request, pk=None):
        # Custom endpoint: POST /documents/{id}/download/
        pass
```

ViewSets reduce boilerplate and work with Django REST Framework routers.
:p What's the difference between APIView and ViewSet in Django REST Framework, and which does Paperless-NGX use?
??x
**APIView**: Low-level, manual HTTP method handling
- Define get(), post(), put(), delete() methods
- More control, more code

**ViewSet**: High-level, automatic CRUD
- Define queryset and serializer
- Auto-generates list, retrieve, create, update, destroy
- Less boilerplate

**Paperless-NGX uses ViewSets** (ModelViewSet):
- Auto routes to /api/documents/
- Custom actions with `@action` decorator
- Works with DefaultRouter for URL patterns

Example: DocumentViewSet provides full CRUD without writing each HTTP method.
x??

---

#### Django Permissions and django-guardian
Paperless-NGX uses object-level permissions to control who can access specific documents:

```python
# Traditional Django permissions: Model-level only
# Can user edit ANY document? (not granular enough)

# django-guardian: Object-level permissions
from guardian.shortcuts import assign_perm, get_objects_for_user

# Assign permission to specific document
document = Document.objects.get(pk=1)
assign_perm('view_document', user, document)
assign_perm('change_document', user, document)

# Check permission
from guardian.shortcuts import has_perm
if has_perm('view_document', user, document):
    # User can view THIS specific document
    pass

# Get all documents user can view
viewable_docs = get_objects_for_user(
    user,
    'documents.view_document',
    klass=Document
)

# In DRF View (src/documents/views.py):
class DocumentViewSet(ModelViewSet):
    def get_queryset(self):
        # Filter to only documents user can access
        return get_objects_for_user(
            self.request.user,
            'documents.view_document',
            klass=Document
        )
```

This enables multi-user setups where users only see their own documents.
:p How does Paperless-NGX implement object-level permissions using django-guardian?
??x
**Object-level permissions**: Per-document access control

**django-guardian adds**:
- `assign_perm(permission, user, obj)`: Grant access
- `has_perm(permission, user, obj)`: Check access
- `get_objects_for_user(user, perm)`: Filter accessible objects

**Example**:
```python
# User A can view Document 1
assign_perm('view_document', userA, doc1)

# Filter queryset to user's documents
user_docs = get_objects_for_user(user, 'view_document')
```

**Why**: Multi-user system where users have private documents. More granular than model-level permissions.
x??

---

## Django Signals

#### Using Django Signals for Document Events
Paperless-NGX uses Django signals to trigger actions when documents change:

```python
# From src/documents/signals/handlers.py

from django.db.models.signals import post_save, pre_delete
from django.dispatch import receiver

# Signal: Fired AFTER document is saved
@receiver(post_save, sender=Document)
def document_saved_handler(sender, instance, created, **kwargs):
    """
    Args:
        sender: The model class (Document)
        instance: The actual document object
        created: True if new document, False if updated
    """
    if created:
        # New document - trigger consumption workflow
        from documents.consumer import consume_document
        consume_document.delay(instance.id)
    else:
        # Updated document - reindex search
        from documents.index import update_document_index
        update_document_index.delay(instance.id)

# Signal: Fired BEFORE document is deleted
@receiver(pre_delete, sender=Document)
def document_delete_handler(sender, instance, **kwargs):
    # Clean up files before database record is deleted
    if instance.original_file:
        instance.original_file.delete(save=False)
    if instance.archive_file:
        instance.archive_file.delete(save=False)
```

Signals decouple code - handlers can be in separate modules.
:p How does Paperless-NGX use Django signals for document lifecycle events?
??x
**Django signals**: Hooks for model lifecycle events

**Common signals**:
- `post_save`: After object saved (created or updated)
- `pre_delete`: Before object deleted
- `pre_save`, `post_delete`

**Pattern**:
```python
@receiver(post_save, sender=Document)
def handler(sender, instance, created, **kwargs):
    if created:
        # New document
    else:
        # Updated document
```

**Use cases in Paperless-NGX**:
- Trigger document processing on creation
- Update search index on changes
- Clean up files on deletion

**Benefit**: Decouples logic, keeps models clean.
x??

---

## Document Processing Pipeline

#### Document Consumption Flow
The document consumption pipeline in Paperless-NGX is a multi-stage process:

```python
# Pseudocode of src/documents/consumer.py

def consume_document(document_id):
    """
    Main consumption task - processes uploaded document
    """
    # Stage 1: File Validation
    document = Document.objects.get(pk=document_id)
    validate_file_type(document.original_file)
    calculate_checksum(document.original_file)

    # Stage 2: Parser Selection
    mime_type = detect_mime_type(document.original_file)
    parser = get_parser_for_type(mime_type)
    # Examples: PDFParser, ImageParser, EmailParser

    # Stage 3: Text Extraction
    extracted_text = parser.extract_text(document.original_file)

    # Stage 4: OCR (if needed for images/scanned PDFs)
    if parser.needs_ocr():
        from paperless_tesseract import ocr
        ocr_text = ocr.process(document.original_file)
        extracted_text += ocr_text

    # Stage 5: Classification (auto-assign metadata)
    from documents.classifier import classify_document
    suggestions = classify_document(extracted_text)
    apply_suggestions(document, suggestions)

    # Stage 6: Barcode Detection
    barcodes = detect_barcodes(document.original_file)
    process_barcode_actions(document, barcodes)

    # Stage 7: Search Indexing
    from documents.index import index_document
    index_document(document, extracted_text)

    # Stage 8: Archive Generation
    generate_archive_version(document)

    # Stage 9: Workflow Triggers
    execute_workflow_triggers(document, event='consumption')

    document.save()
```

Each stage is modular and can be extended via plugins.
:p What are the main stages of the document consumption pipeline in Paperless-NGX?
??x
**9-stage pipeline**:

1. **File Validation**: Check type, calculate checksum
2. **Parser Selection**: Choose parser based on MIME type
3. **Text Extraction**: Extract text from document
4. **OCR**: Run Tesseract if needed (images/scans)
5. **Classification**: Auto-assign tags/correspondent/type
6. **Barcode Detection**: Read and process barcodes
7. **Search Indexing**: Add to Whoosh full-text index
8. **Archive Generation**: Create searchable PDF version
9. **Workflow Triggers**: Execute automation rules

All runs asynchronously in Celery task.
Each stage is modular and extensible.
x??

---

#### Parser Selection Strategy
Paperless-NGX uses a registry pattern to select the appropriate parser:

```python
# Simplified from src/documents/parser.py

# Base class all parsers inherit from
class DocumentParser:
    """Base parser interface"""

    def __init__(self, file_path):
        self.file_path = file_path

    def extract_text(self):
        """Must be implemented by subclasses"""
        raise NotImplementedError

    def needs_ocr(self):
        """Does this document need OCR?"""
        return False

# Registry: Maps MIME types to parser classes
PARSER_REGISTRY = {
    'application/pdf': PDFParser,
    'image/png': ImageParser,
    'image/jpeg': ImageParser,
    'message/rfc822': EmailParser,
    'text/plain': TextParser,
}

# Parser selection
def get_parser_for_file(file_path):
    """
    Detect file type and return appropriate parser
    """
    mime_type = magic.from_file(file_path, mime=True)

    parser_class = PARSER_REGISTRY.get(mime_type)
    if not parser_class:
        raise UnsupportedFileType(f"No parser for {mime_type}")

    return parser_class(file_path)

# Usage in consumer
parser = get_parser_for_file(document.file.path)
text = parser.extract_text()
if parser.needs_ocr():
    text += run_ocr(document.file.path)
```

New file types can be supported by registering new parser classes.
:p How does Paperless-NGX select the appropriate document parser and what pattern is used?
??x
**Registry Pattern**: Maps MIME types to parser classes

**Structure**:
```python
PARSER_REGISTRY = {
    'application/pdf': PDFParser,
    'image/jpeg': ImageParser,
}
```

**Parser Interface** (base class):
- `extract_text()`: Required method
- `needs_ocr()`: Optional hook

**Selection Process**:
1. Detect MIME type with `python-magic`
2. Lookup parser in registry
3. Instantiate parser class
4. Call `extract_text()`

**Extensibility**: Add new parser by:
- Creating class inheriting DocumentParser
- Registering MIME type in PARSER_REGISTRY

Follows Strategy pattern for algorithm selection.
x??

---

