# Advanced Techniques Flashcards

## Performance Optimization

#### Django QuerySet Optimization with select_related and prefetch_related
Paperless-NGX optimizes database queries to avoid the N+1 query problem:

```python
# N+1 Query Problem (BAD):
# Fetching documents and their correspondents

documents = Document.objects.all()  # 1 query

for doc in documents:  # Loop through 100 documents
    print(doc.correspondent.name)  # 1 query PER document
    # Total: 1 + 100 = 101 queries!

# Solution 1: select_related (for ForeignKey, OneToOne)
# From src/documents/views.py

documents = Document.objects.select_related('correspondent', 'document_type')
# SQL: Single query with JOIN
# SELECT * FROM documents
# LEFT JOIN correspondents ON documents.correspondent_id = correspondents.id
# LEFT JOIN document_types ON documents.document_type_id = document_types.id

for doc in documents:
    print(doc.correspondent.name)  # No additional query!
    print(doc.document_type.name)  # No additional query!
    # Total: 1 query

# Solution 2: prefetch_related (for ManyToMany, reverse ForeignKey)
documents = Document.objects.prefetch_related('tags')
# SQL: Two separate queries
# Query 1: SELECT * FROM documents
# Query 2: SELECT * FROM tags WHERE document_id IN (1, 2, 3, ...)
# Python joins the results

for doc in documents:
    for tag in doc.tags.all():  # No additional queries!
        print(tag.name)
    # Total: 2 queries (regardless of # of documents)

# Complex example from Paperless-NGX:
documents = Document.objects.select_related(
    'correspondent',
    'document_type',
    'storage_path',
    'owner'
).prefetch_related(
    'tags',
    'custom_fields',
    Prefetch(
        'notes',
        queryset=Note.objects.select_related('user')
    )
)
# Efficiently loads documents with all related data
# Fixed number of queries regardless of result size

# When to use:
# select_related: ForeignKey/OneToOne (uses JOIN)
# prefetch_related: ManyToMany/reverse FK (uses separate queries + Python join)
```

This dramatically reduces database queries from hundreds to just a few.
:p What is the N+1 query problem and how does Paperless-NGX solve it using select_related and prefetch_related?
??x
**N+1 Problem**: Fetching related objects in loop causes N additional queries

**Example**:
```python
for doc in docs:  # 1 query
    doc.correspondent.name  # +1 query per doc
# Total: 101 queries for 100 docs
```

**Solutions**:

1. **select_related** (ForeignKey/OneToOne):
```python
docs = Document.objects.select_related('correspondent')
```
- Uses SQL JOIN
- Single query
- For single-valued relations

2. **prefetch_related** (ManyToMany/reverse FK):
```python
docs = Document.objects.prefetch_related('tags')
```
- Separate queries
- Python joins results
- For multi-valued relations

**Result**: 101 queries → 2-3 queries

**Rule**: Use to avoid queries in loops.
x??

---

#### Caching Strategy with Redis
Paperless-NGX uses Redis for caching to improve performance:

```python
# Caching architecture in Paperless-NGX

# settings.py configuration:
CACHES = {
    'default': {
        'BACKEND': 'django.core.cache.backends.redis.RedisCache',
        'LOCATION': 'redis://redis:6379/1',
        'OPTIONS': {
            'db': 1,
        },
        'KEY_PREFIX': 'paperless',
        'TIMEOUT': 300,  # 5 minutes default
    }
}

# 1. View-level caching (cache entire response)
from django.views.decorators.cache import cache_page

@cache_page(60 * 15)  # Cache for 15 minutes
@api_view(['GET'])
def statistics_view(request):
    # Expensive calculation
    stats = calculate_statistics()
    return Response(stats)
    # Subsequent requests serve cached response

# 2. Low-level caching (cache specific data)
from django.core.cache import cache

def get_document_count():
    # Try to get from cache
    count = cache.get('document_count')

    if count is None:
        # Not in cache, calculate
        count = Document.objects.count()
        # Store in cache for 5 minutes
        cache.set('document_count', count, 300)

    return count

# 3. Template fragment caching (not used in API-only backend)
# In Django templates:
# {% load cache %}
# {% cache 500 sidebar %}
#   ... expensive sidebar rendering ...
# {% endcache %}

# 4. Cache invalidation (the hard part)
from django.db.models.signals import post_save, post_delete

@receiver(post_save, sender=Document)
def invalidate_document_cache(sender, instance, **kwargs):
    # Clear cache when data changes
    cache.delete('document_count')
    cache.delete(f'document_{instance.id}')

# 5. Cache key patterns
def get_user_documents(user_id):
    cache_key = f'user_{user_id}_documents'

    documents = cache.get(cache_key)
    if not documents:
        documents = list(Document.get_user_documents(user_id))
        cache.set(cache_key, documents, 600)  # 10 minutes

    return documents

# Caching best practices:
# - Cache expensive operations (DB queries, calculations)
# - Set appropriate TTL (time to live)
# - Invalidate on data changes
# - Use descriptive cache keys
# - Monitor cache hit rate
```

Caching reduces database load and improves response times.
:p How does Paperless-NGX use Redis caching and what are the different caching strategies?
??x
**Redis Caching**: Store frequently accessed data in memory

**Strategies**:

1. **View caching**: Cache entire response
```python
@cache_page(60 * 15)
def view(request):
    ...
```

2. **Low-level caching**: Cache specific data
```python
count = cache.get('key')
if not count:
    count = expensive_operation()
    cache.set('key', count, timeout)
```

3. **Cache invalidation**: Clear on changes
```python
@receiver(post_save, sender=Document)
def handler(sender, instance, **kwargs):
    cache.delete('document_count')
```

**Best practices**:
- Cache expensive operations
- Set TTL (timeout)
- Invalidate on updates
- Use namespaced keys

**Benefits**: Faster responses, less DB load
x??

---

#### Database Indexing Strategy
Proper indexing is critical for query performance in large document collections:

```python
# Database indexing in Paperless-NGX

# From src/documents/models.py

class Document(models.Model):
    title = models.CharField(max_length=128)
    created = models.DateTimeField(auto_now_add=True)
    modified = models.DateTimeField(auto_now=True)
    checksum = models.CharField(max_length=32, unique=True)  # Auto-indexed

    correspondent = models.ForeignKey(
        Correspondent,
        on_delete=models.SET_NULL,
        null=True,
        db_index=True  # Create index on this foreign key
    )

    class Meta:
        # Composite index (multiple columns)
        indexes = [
            # Speed up queries filtering by correspondent and date
            models.Index(fields=['correspondent', '-created']),

            # Speed up searches by checksum
            models.Index(fields=['checksum']),

            # Speed up sorting by created date
            models.Index(fields=['-created']),

            # Partial index (PostgreSQL only) - index only non-deleted
            models.Index(
                fields=['created'],
                condition=models.Q(deleted_at__isnull=True),
                name='active_documents_idx'
            ),
        ]

# Index types and when to use:

# 1. Single-column index
# USE: Frequently filtered/sorted columns
checksum = models.CharField(max_length=32, db_index=True)

# 2. Unique index (enforces uniqueness)
# USE: Prevent duplicates (also creates index)
checksum = models.CharField(max_length=32, unique=True)

# 3. Foreign key index
# USE: Join performance (Django auto-creates these)
correspondent = models.ForeignKey(..., db_index=True)

# 4. Composite index (multiple columns)
# USE: Queries filtering on multiple columns
# Query: Document.objects.filter(correspondent=x, created__gte=y)
indexes = [
    models.Index(fields=['correspondent', 'created'])
]

# 5. Descending index
# USE: ORDER BY ... DESC queries
# Query: Document.objects.order_by('-created')
indexes = [
    models.Index(fields=['-created'])
]

# Query performance impact:

# Without index:
# SELECT * FROM documents WHERE correspondent_id = 5
# → Full table scan: O(n) - checks every row

# With index:
# SELECT * FROM documents WHERE correspondent_id = 5
# → Index lookup: O(log n) - uses B-tree

# For 1 million documents:
# Without index: ~1 million row checks
# With index: ~20 comparisons (log₂(1000000) ≈ 20)

# Index trade-offs:
# ✓ Faster reads (SELECT, WHERE, ORDER BY, JOIN)
# ✗ Slower writes (INSERT, UPDATE, DELETE)
# ✗ More disk space
# ✗ More memory usage

# Best practices:
# - Index frequently queried columns
# - Index foreign keys
# - Index columns used in WHERE, ORDER BY, JOIN
# - Don't over-index (slows writes)
# - Monitor slow queries and add indexes as needed
```

Proper indexing is the difference between millisecond and second-long queries.
:p What types of database indexes does Paperless-NGX use and when should you create an index?
??x
**Index Types**:

1. **Single-column**: `db_index=True`
2. **Unique**: `unique=True` (prevents duplicates)
3. **Composite**: Multiple columns
```python
Index(fields=['col1', 'col2'])
```
4. **Descending**: For `ORDER BY DESC`
```python
Index(fields=['-created'])
```
5. **Partial**: Condition-based (PostgreSQL)

**When to index**:
- Frequently filtered columns (WHERE)
- Sort columns (ORDER BY)
- Foreign keys (JOIN)
- Unique constraints

**Trade-offs**:
- ✓ Faster reads: O(log n) vs O(n)
- ✗ Slower writes
- ✗ More disk/memory

**Rule**: Index columns in WHERE/ORDER BY/JOIN clauses. Don't over-index.
x??

---

## Security Techniques

#### Token-Based Authentication
Paperless-NGX uses token authentication for API access:

```python
# Token authentication implementation

# 1. Token generation (Django Rest Framework)
from rest_framework.authtoken.models import Token

# Create token for user
user = User.objects.get(username='john')
token = Token.objects.create(user=user)
print(token.key)  # '9944b09199c62bcf9418ad846dd0e4bbdfc6ee4b'

# 2. Client includes token in requests
# HTTP Header:
# Authorization: Token 9944b09199c62bcf9418ad846dd0e4bbdfc6ee4b

# 3. Django validates token
# From src/paperless/settings.py
REST_FRAMEWORK = {
    'DEFAULT_AUTHENTICATION_CLASSES': [
        'rest_framework.authentication.TokenAuthentication',
        'rest_framework.authentication.SessionAuthentication',
    ],
}

# 4. Token authentication flow
"""
Client                      Server
  │                           │
  ├─ POST /api/token/        │
  │  {username, password}  ───▶│
  │                           │ Verify credentials
  │                           │ Generate/retrieve token
  │◀─── {token: "9944b0..."} ─┤
  │                           │
  │                           │
  ├─ GET /api/documents/     │
  │  Header: Token 9944b0... ─▶│
  │                           │ Validate token
  │                           │ Get user from token
  │                           │ Execute request as user
  │◀─── {documents: [...]}  ─┤
"""

# 5. Token validation (automatic via DRF)
# In views, authenticated user available:
@api_view(['GET'])
def my_view(request):
    user = request.user  # User from token
    # DRF already validated token

# 6. Token-based permission check
from rest_framework.permissions import IsAuthenticated

class DocumentViewSet(ModelViewSet):
    permission_classes = [IsAuthenticated]
    # Only requests with valid token can access

# Token vs Session authentication:

# Session (cookie-based):
# - Stateful (server stores session)
# - Automatic in browsers
# - CSRF protection needed

# Token (header-based):
# - Stateless (token contains all info)
# - Works for mobile/API clients
# - No CSRF issues
# - Can be stored in localStorage

# Security best practices:
# - Use HTTPS only (tokens in plaintext)
# - Set token expiration
# - Rotate tokens periodically
# - Allow token revocation
# - Don't expose tokens in URLs
```

Tokens enable stateless authentication for API clients.
:p How does token-based authentication work in Paperless-NGX and how does it differ from session authentication?
??x
**Token Authentication**: Client sends token in header

**Flow**:
1. Login: POST credentials → Receive token
2. Requests: Include token in Authorization header
3. Server: Validates token → Gets user

**Header format**:
```
Authorization: Token <token_value>
```

**vs Session Authentication**:

**Session (cookies)**:
- Stateful (server stores session)
- Browser automatic
- Needs CSRF protection

**Token (header)**:
- Stateless (self-contained)
- API/mobile friendly
- No CSRF issues
- Manual storage (localStorage)

**Security**:
- Use HTTPS only
- Set expiration
- Allow revocation

**Paperless-NGX**: Supports both (token for API, session for web)
x??

---

#### Object-Level Permissions with django-guardian
Fine-grained access control on individual documents:

```python
# Object-level permissions in Paperless-NGX

# Standard Django permissions: Model-level only
# "Can this user edit ANY document?" (too broad)

# django-guardian: Object-level permissions
# "Can this user edit THIS SPECIFIC document?" (granular)

from guardian.shortcuts import assign_perm, remove_perm, get_objects_for_user

# 1. Assign permission to specific object
document = Document.objects.get(pk=1)
user = User.objects.get(username='john')

# Grant view permission
assign_perm('view_document', user, document)

# Grant change permission
assign_perm('change_document', user, document)

# Grant delete permission
assign_perm('delete_document', user, document)

# 2. Check object permission
from guardian.shortcuts import get_perms

perms = get_perms(user, document)
# Returns: ['view_document', 'change_document']

if user.has_perm('view_document', document):
    # User can view this specific document
    pass

# 3. Query objects user can access
viewable_docs = get_objects_for_user(
    user,
    'documents.view_document',
    klass=Document
)
# Returns QuerySet of documents user can view

# 4. Integration with DRF views
from rest_framework import viewsets
from guardian.shortcuts import get_objects_for_user

class DocumentViewSet(viewsets.ModelViewSet):
    def get_queryset(self):
        # Filter to only documents user can view
        user = self.request.user

        if user.is_superuser:
            return Document.objects.all()

        return get_objects_for_user(
            user,
            'documents.view_document',
            klass=Document
        )

    def perform_create(self, serializer):
        # When user creates document, grant them all permissions
        document = serializer.save()
        user = self.request.user

        assign_perm('view_document', user, document)
        assign_perm('change_document', user, document)
        assign_perm('delete_document', user, document)

# 5. Group-based permissions
from django.contrib.auth.models import Group

# Create group
editors = Group.objects.create(name='Editors')
editors.user_set.add(user)

# Grant permission to group
from guardian.shortcuts import assign_perm
assign_perm('change_document', editors, document)

# All users in 'Editors' group can now edit this document

# 6. Permission inheritance
# Documents can inherit permissions from parent (storage path)
def inherit_permissions(document):
    if document.storage_path:
        # Copy permissions from storage path to document
        for user in User.objects.all():
            if user.has_perm('view_storagepath', document.storage_path):
                assign_perm('view_document', user, document)

# Use case: Multi-user Paperless-NGX
# - User A can only see their own documents
# - User B can only see their own documents
# - Admin can see all documents
# - Shared documents: specific users granted access
```

Object-level permissions enable true multi-user document management.
:p How does django-guardian provide object-level permissions and how is it used in Paperless-NGX?
??x
**Object-Level Permissions**: Per-object access control

**Standard Django**: Model-level only
- "Can user edit ANY document?"

**django-guardian**: Object-level
- "Can user edit THIS document?"

**Key functions**:
```python
# Grant
assign_perm('view_document', user, doc)

# Check
user.has_perm('view_document', doc)

# Query
get_objects_for_user(user, 'view_document')
```

**Use cases**:
- Private documents (user ownership)
- Shared documents (selective access)
- Group-based access
- Multi-tenant systems

**Implementation**:
- Filter queryset by permissions
- Grant on creation
- Works with groups

**Benefit**: True multi-user document management with privacy.
x??

---

## Testing Techniques

#### Test Fixtures and Factories
Paperless-NGX uses factories for test data generation:

```python
# Test fixtures in Paperless-NGX

# 1. Django fixtures (JSON data) - inflexible
# fixtures/test_data.json
"""
[
  {
    "model": "documents.document",
    "pk": 1,
    "fields": {
      "title": "Test Doc",
      "created": "2024-01-01T00:00:00Z"
    }
  }
]
"""
# Load: python manage.py loaddata test_data.json

# 2. Factory pattern (better approach) - flexible

# tests/factories.py
import factory
from documents.models import Document, Tag, Correspondent

class CorrespondentFactory(factory.django.DjangoModelFactory):
    class Meta:
        model = Correspondent

    name = factory.Sequence(lambda n: f"Correspondent {n}")

class TagFactory(factory.django.DjangoModelFactory):
    class Meta:
        model = Tag

    name = factory.Sequence(lambda n: f"Tag {n}")
    color = "#FF0000"

class DocumentFactory(factory.django.DjangoModelFactory):
    class Meta:
        model = Document

    title = factory.Sequence(lambda n: f"Document {n}")
    checksum = factory.Sequence(lambda n: f"checksum{n:032d}")
    created = factory.Faker('date_time_this_year')

    # Relations
    correspondent = factory.SubFactory(CorrespondentFactory)

    # Many-to-many (post-generation)
    @factory.post_generation
    def tags(self, create, extracted, **kwargs):
        if not create:
            return
        if extracted:
            for tag in extracted:
                self.tags.add(tag)

# Usage in tests:
def test_document_creation():
    # Create test document with all relations
    doc = DocumentFactory()
    assert doc.title.startswith("Document")
    assert doc.correspondent is not None

    # Create with specific values
    doc = DocumentFactory(title="Invoice")
    assert doc.title == "Invoice"

    # Create with relations
    tag1 = TagFactory(name="Important")
    tag2 = TagFactory(name="Urgent")
    doc = DocumentFactory(tags=[tag1, tag2])
    assert doc.tags.count() == 2

    # Create multiple
    docs = DocumentFactory.create_batch(10)
    assert len(docs) == 10

# 3. pytest fixtures (setup/teardown)
import pytest

@pytest.fixture
def sample_document():
    """Fixture providing a test document"""
    doc = DocumentFactory()
    yield doc
    # Cleanup (if needed)
    doc.delete()

@pytest.fixture
def authenticated_user():
    """Fixture providing authenticated API client"""
    user = User.objects.create_user('test', 'test@example.com', 'password')
    client = APIClient()
    client.force_authenticate(user=user)
    return client

# Use in tests:
def test_document_api(authenticated_user, sample_document):
    # Client and document already set up
    response = authenticated_user.get(f'/api/documents/{sample_document.id}/')
    assert response.status_code == 200

# Benefits of factories:
# - Flexible (override specific fields)
# - DRY (reusable test data)
# - Realistic (Faker for random data)
# - Maintainable (centralized test data creation)
```

Factories make tests more maintainable and realistic.
:p What are test factories and how does Paperless-NGX use them for testing?
??x
**Test Factories**: Flexible test data generators

**vs Fixtures**:
- Fixtures (JSON): Inflexible, static data
- Factories: Dynamic, customizable

**Factory Pattern**:
```python
class DocumentFactory(DjangoModelFactory):
    class Meta:
        model = Document

    title = factory.Sequence(lambda n: f"Doc {n}")

# Usage
doc = DocumentFactory()  # Default values
doc = DocumentFactory(title="Custom")  # Override
docs = DocumentFactory.create_batch(10)  # Multiple
```

**Benefits**:
- Override specific fields
- Auto-generate realistic data (Faker)
- Handle relations (SubFactory)
- DRY test code

**pytest fixtures**: Setup/teardown
```python
@pytest.fixture
def sample_doc():
    return DocumentFactory()
```

**Paperless-NGX**: Uses factories for all test models.
x??

---

#### Mocking External Services
Testing without depending on external services:

```python
# Mocking in Paperless-NGX tests

from unittest.mock import Mock, patch, MagicMock
import pytest

# 1. Mock external HTTP calls
@patch('requests.get')
def test_fetch_document(mock_get):
    # Setup mock response
    mock_response = Mock()
    mock_response.status_code = 200
    mock_response.json.return_value = {'title': 'Test Document'}
    mock_get.return_value = mock_response

    # Call function that uses requests.get
    result = fetch_external_document('http://example.com/doc')

    # Verify mock was called correctly
    mock_get.assert_called_once_with('http://example.com/doc')
    assert result['title'] == 'Test Document'

# 2. Mock Celery tasks
from documents.consumer import consume_document

@patch('documents.consumer.consume_document.delay')
def test_document_upload(mock_consume):
    # Upload document
    response = client.post('/api/documents/', data)

    # Verify task was enqueued (but not actually run)
    mock_consume.assert_called_once_with(document.id)

# 3. Mock OCR processing (expensive operation)
@patch('paperless_tesseract.ocr.run_ocr')
def test_document_processing(mock_ocr):
    # Mock OCR to return fake text
    mock_ocr.return_value = "Mocked OCR text content"

    # Process document
    parser = PDFParser('test.pdf')
    text = parser.extract_text()

    # OCR was called but didn't actually run
    mock_ocr.assert_called()

# 4. Mock file system operations
@patch('os.path.exists')
@patch('shutil.copy')
def test_file_operations(mock_copy, mock_exists):
    # Mock file exists
    mock_exists.return_value = True

    # Call function
    result = copy_document_file('/path/to/doc.pdf')

    # Verify calls without touching real filesystem
    mock_exists.assert_called_once()
    mock_copy.assert_called_once()

# 5. Mock Django signals
@patch('documents.signals.handlers.update_search_index')
def test_document_creation_no_indexing(mock_index):
    # Create document
    doc = Document.objects.create(title="Test")

    # Signal handler was called but didn't actually index
    mock_index.assert_called_once()

# 6. pytest monkeypatch (alternative to @patch)
def test_environment_variable(monkeypatch):
    # Temporarily set environment variable
    monkeypatch.setenv('PAPERLESS_OCR_LANGUAGE', 'fra')

    # Test code that reads environment
    config = get_config()
    assert config.ocr_language == 'fra'

# 7. Mock database queries (for performance tests)
@patch.object(Document.objects, 'filter')
def test_query_optimization(mock_filter):
    # Mock queryset
    mock_filter.return_value = []

    # Test logic without hitting database
    results = get_filtered_documents(user)

    # Verify query was built correctly
    mock_filter.assert_called_with(owner=user)

# When to mock:
# ✓ External APIs (network calls)
# ✓ Slow operations (OCR, file I/O)
# ✓ Non-deterministic behavior (random, time)
# ✓ Third-party services (email, cloud storage)
# ✗ Business logic (test real code)
# ✗ Database (use test database instead)
```

Mocking makes tests fast, reliable, and isolated.
:p What is mocking in tests and when should you use it in Paperless-NGX?
??x
**Mocking**: Replace real dependencies with test doubles

**Mock vs Real**:
- Mock: Fake object that simulates behavior
- Real: Actual implementation

**Common mocks**:
```python
@patch('requests.get')
def test(mock_get):
    mock_get.return_value = Mock(status_code=200)
    # requests.get not actually called
```

**When to mock**:
- ✓ External APIs (network)
- ✓ Slow operations (OCR, file I/O)
- ✓ Third-party services
- ✓ Celery tasks (don't run async)
- ✗ Business logic (test real code)
- ✗ Database (use test DB)

**Benefits**:
- Fast tests (no network/disk)
- Reliable (no external dependencies)
- Isolated (test one thing)

**Tools**: `unittest.mock`, pytest monkeypatch
x??

---

## Full-Text Search

#### Whoosh Search Engine Integration
Paperless-NGX uses Whoosh for full-text search of document content:

```python
# Whoosh full-text search in Paperless-NGX

# From src/documents/index.py

from whoosh import index
from whoosh.fields import Schema, TEXT, ID, DATETIME, KEYWORD
from whoosh.qparser import QueryParser, MultifieldParser

# 1. Define search schema
schema = Schema(
    id=ID(stored=True, unique=True),  # Document ID
    title=TEXT(stored=True),  # Searchable title
    content=TEXT,  # Full document text (searchable, not stored)
    correspondent=TEXT(stored=True),  # Searchable correspondent
    tags=KEYWORD(stored=True, commas=True),  # Exact match tags
    created=DATETIME(stored=True),  # Date filtering
)

# 2. Create index
import os
from whoosh.index import create_in, open_dir

index_dir = '/data/index'
if not os.path.exists(index_dir):
    os.mkdir(index_dir)

# Create or open index
if index.exists_in(index_dir):
    ix = index.open_dir(index_dir)
else:
    ix = create_in(index_dir, schema)

# 3. Index a document
def index_document(document):
    writer = ix.writer()

    writer.add_document(
        id=str(document.id),
        title=document.title,
        content=document.content,  # Extracted text
        correspondent=document.correspondent.name if document.correspondent else '',
        tags=','.join(tag.name for tag in document.tags.all()),
        created=document.created,
    )

    writer.commit()

# 4. Update indexed document
def update_document_index(document):
    writer = ix.writer()

    # Delete old version
    writer.delete_by_term('id', str(document.id))

    # Add new version
    writer.add_document(...)

    writer.commit()

# 5. Search documents
def search_documents(query_string, user):
    with ix.searcher() as searcher:
        # Parse query
        parser = MultifieldParser(['title', 'content', 'correspondent'], ix.schema)
        query = parser.parse(query_string)

        # Execute search
        results = searcher.search(query, limit=100)

        # Convert to document IDs
        doc_ids = [int(result['id']) for result in results]

        # Filter by permissions and return Document objects
        return Document.objects.filter(
            id__in=doc_ids
        ).filter(
            # User permission check
        )

# 6. Advanced queries
# Simple: "invoice"
# Phrase: "tax invoice"
# Field-specific: "title:invoice"
# Boolean: "invoice AND 2024"
# Wildcard: "inv*"
# Fuzzy: "invoice~2" (allows 2 character differences)

# 7. Highlighting search results
def search_with_highlights(query_string):
    with ix.searcher() as searcher:
        query = parser.parse(query_string)
        results = searcher.search(query)

        for result in results:
            # Highlight matching terms in content
            highlights = result.highlights('content', top=3)
            # Returns: "...found <b>invoice</b> for..."

# 8. Autocomplete / suggestions
from whoosh.qparser import FuzzyTermPlugin

def autocomplete(partial_query):
    with ix.searcher() as searcher:
        # Fuzzy match for typos
        parser.add_plugin(FuzzyTermPlugin())
        suggestions = searcher.suggest('title', partial_query, limit=5)
        return suggestions

# Performance considerations:
# - Index updates are expensive (batch when possible)
# - Whoosh is pure Python (slower than Elasticsearch for huge datasets)
# - Index size grows with content (monitor disk usage)
# - Rebuilding index needed after schema changes
```

Whoosh enables powerful search without external dependencies.
:p How does Paperless-NGX implement full-text search using Whoosh and what features does it provide?
??x
**Whoosh**: Pure Python full-text search engine

**Architecture**:
1. **Schema**: Define searchable fields
```python
schema = Schema(
    id=ID,
    title=TEXT,
    content=TEXT,
)
```

2. **Indexing**: Add documents to index
```python
writer.add_document(id="1", title="...", content="...")
```

3. **Searching**: Query indexed documents
```python
results = searcher.search(query)
```

**Features**:
- Multi-field search
- Boolean queries (AND, OR, NOT)
- Phrase search: "exact phrase"
- Wildcards: `inv*`
- Fuzzy: `invoice~2` (typo tolerance)
- Highlighting: Show matches in context

**vs Elasticsearch**:
- Whoosh: Simpler, no external service, slower
- Elasticsearch: Faster, requires separate service

**Paperless-NGX**: Uses Whoosh for built-in search without dependencies.
x??

---

## Docker & Deployment

#### Multi-Stage Docker Builds
Paperless-NGX uses multi-stage builds to minimize image size:

```dockerfile
# Multi-stage Dockerfile pattern

# Stage 1: Build frontend (Node.js)
FROM node:20-alpine AS frontend-builder

WORKDIR /app/src-ui

# Copy package files
COPY src-ui/package.json src-ui/pnpm-lock.yaml ./

# Install dependencies
RUN npm install -g pnpm && pnpm install

# Copy source and build
COPY src-ui/ ./
RUN pnpm run build
# Output: dist/ folder with compiled Angular app

# Stage 2: Build Python dependencies
FROM python:3.11-slim AS python-builder

WORKDIR /app

# Install build dependencies
RUN apt-get update && apt-get install -y \
    gcc \
    python3-dev \
    && rm -rf /var/lib/apt/lists/*

# Copy requirements
COPY requirements.txt ./

# Install Python packages to /install directory
RUN pip install --prefix=/install --no-cache-dir -r requirements.txt

# Stage 3: Final runtime image
FROM python:3.11-slim

WORKDIR /app

# Install runtime dependencies only (not build tools)
RUN apt-get update && apt-get install -y \
    tesseract-ocr \
    imagemagick \
    && rm -rf /var/lib/apt/lists/*

# Copy Python packages from builder stage
COPY --from=python-builder /install /usr/local

# Copy frontend build from builder stage
COPY --from=frontend-builder /app/src-ui/dist /app/static

# Copy application code
COPY src/ /app/

# Create non-root user
RUN useradd -m -u 1000 paperless && \
    chown -R paperless:paperless /app

USER paperless

EXPOSE 8000

CMD ["gunicorn", "paperless.asgi:application"]

# Benefits of multi-stage builds:
# 1. Smaller final image (no Node.js, no build tools)
#    - With multi-stage: ~500MB
#    - Without: ~1.5GB
# 2. Security (fewer packages = smaller attack surface)
# 3. Faster deployment (smaller image transfers faster)
# 4. Separation of concerns (build vs runtime)
```

Multi-stage builds keep production images lean and secure.
:p What are multi-stage Docker builds and why does Paperless-NGX use them?
??x
**Multi-Stage Builds**: Multiple FROM statements in Dockerfile

**Pattern**:
```dockerfile
# Stage 1: Build
FROM node:20 AS builder
RUN npm build
# Creates artifacts

# Stage 2: Runtime
FROM node:20-alpine
COPY --from=builder /app/dist ./
# Only copy artifacts, not build tools
```

**Benefits**:
- **Smaller image**: No build tools in final image
  - Example: 1.5GB → 500MB
- **Security**: Fewer packages, smaller attack surface
- **Faster deployment**: Smaller images transfer faster
- **Separation**: Build vs runtime dependencies

**Paperless-NGX stages**:
1. Frontend builder (Node.js) → dist/
2. Python builder → packages
3. Runtime (slim) → copy artifacts only

**Alternative**: Single stage includes everything (larger image)
x??

---

