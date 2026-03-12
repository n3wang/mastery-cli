# Architecture & Design Patterns Flashcards

## REST API Architecture

#### RESTful API Design Principles
Paperless-NGX follows REST architectural constraints for its API:

```
REST Principles Applied in Paperless-NGX:

1. Resource-Based URLs (nouns, not verbs)
   ✓ /api/documents/           (collection)
   ✓ /api/documents/123/       (specific resource)
   ✗ /api/getDocuments/        (verb-based - avoid)

2. HTTP Methods for Actions
   GET    /api/documents/      → List all documents
   POST   /api/documents/      → Create new document
   GET    /api/documents/123/  → Get document 123
   PUT    /api/documents/123/  → Replace document 123
   PATCH  /api/documents/123/  → Update document 123
   DELETE /api/documents/123/  → Delete document 123

3. Nested Resources for Relationships
   /api/documents/123/notes/   → Notes belonging to document 123

4. Filtering via Query Parameters
   /api/documents/?correspondent=5
   /api/documents/?search=invoice&page=2

5. Standard HTTP Status Codes
   200 OK           → Success
   201 Created      → Resource created
   204 No Content   → Success, no response body
   400 Bad Request  → Validation error
   401 Unauthorized → Not authenticated
   403 Forbidden    → Not authorized
   404 Not Found    → Resource doesn't exist
   500 Server Error → Backend error

6. Hypermedia (HATEOAS) - Partial
   Response includes links to related resources:
   {
     "id": 123,
     "title": "Invoice",
     "url": "/api/documents/123/",
     "download_url": "/api/documents/123/download/"
   }
```

REST makes the API predictable and easy to use.
:p What are the key REST principles applied in Paperless-NGX's API design?
??x
**REST Principles**:

1. **Resource-based URLs** (nouns): `/api/documents/`
2. **HTTP methods for actions**:
   - GET: Read
   - POST: Create
   - PUT/PATCH: Update
   - DELETE: Delete
3. **Query params for filtering**: `?search=invoice`
4. **HTTP status codes**:
   - 2xx: Success
   - 4xx: Client error
   - 5xx: Server error
5. **Nested resources**: `/documents/123/notes/`
6. **Stateless**: Each request independent

**Benefits**: Predictable, cacheable, scalable API design.
x??

---

#### API Pagination Strategy
Paperless-NGX uses page-based pagination for large result sets:

```python
# API Response structure:
{
  "count": 1523,           # Total number of items
  "next": "/api/documents/?page=3",  # Next page URL
  "previous": "/api/documents/?page=1",  # Previous page URL
  "results": [             # Current page items
    {
      "id": 21,
      "title": "Invoice",
      ...
    },
    // ... more documents
  ]
}

# Implementation (simplified from src/documents/views.py):
from rest_framework.pagination import PageNumberPagination

class CustomPagination(PageNumberPagination):
    page_size = 25  # Default items per page
    page_size_query_param = 'page_size'  # Allow client to override
    max_page_size = 100  # Maximum allowed

# In ViewSet:
class DocumentViewSet(ModelViewSet):
    pagination_class = CustomPagination
    # DRF automatically paginates queryset

# Client usage:
# GET /api/documents/?page=2
# GET /api/documents/?page=2&page_size=50
```

Frontend can navigate pages using `next`/`previous` URLs or construct URLs manually.
:p How does Paperless-NGX implement API pagination and what information is included in paginated responses?
??x
**Pagination Type**: Page-based (page numbers)

**Response Structure**:
```json
{
  "count": 1523,              // Total items
  "next": "?page=3",          // Next page URL
  "previous": "?page=1",      // Previous page URL
  "results": [...]            // Current page items
}
```

**Configuration**:
- Default: 25 items per page
- Client can override: `?page_size=50`
- Max limit: 100 items

**Benefits**:
- Consistent interface
- Performance (don't load all items)
- Includes total count for UI pagination

**Alternative**: Cursor pagination (for very large datasets)
x??

---

## Design Patterns

#### Repository Pattern for Data Access
Paperless-NGX uses Django models as repositories, abstracting database access:

```python
# Repository Pattern (implicit in Django ORM)
# Models act as repositories for their data

# Document "Repository" (src/documents/models.py)
class Document(models.Model):
    # Fields define schema
    title = models.CharField(max_length=128)

    # Manager provides query interface (repository methods)
    objects = models.Manager()

    # Custom manager methods (repository pattern)
    @classmethod
    def get_by_checksum(cls, checksum):
        """Find document by checksum"""
        return cls.objects.filter(checksum=checksum).first()

    @classmethod
    def get_user_documents(cls, user):
        """Get documents accessible to user"""
        from guardian.shortcuts import get_objects_for_user
        return get_objects_for_user(user, 'documents.view_document')

# Usage in views (like calling repository):
class DocumentViewSet(ModelViewSet):
    def get_queryset(self):
        # Repository pattern: Ask model for data
        user = self.request.user
        return Document.get_user_documents(user)

    def get_by_checksum(self, checksum):
        # Use repository method
        return Document.get_by_checksum(checksum)

# Benefits:
# - Data access logic centralized in model
# - Views don't know about database
# - Easy to test (can mock repository)
# - Can swap database without changing views
```

Django ORM provides built-in repository pattern through models.
:p How does Paperless-NGX implement the Repository pattern and what are its benefits?
??x
**Repository Pattern**: Abstraction layer for data access

**Implementation in Django**:
- Models are repositories
- `objects` Manager provides query methods
- Custom methods encapsulate complex queries

**Structure**:
```python
class Document(models.Model):
    # Data access methods
    @classmethod
    def get_by_checksum(cls, checksum):
        return cls.objects.filter(checksum=checksum).first()
```

**Benefits**:
- Centralized data access logic
- Views don't know about database
- Testable (mock repository)
- Database-agnostic code

**Pattern**: Model = Repository, Manager = Query Interface
x??

---

#### Strategy Pattern for Document Parsers
Paperless-NGX uses the Strategy pattern to select document parsing algorithms at runtime:

```python
# Strategy Pattern for parsers

# 1. Strategy Interface (abstract base class)
from abc import ABC, abstractmethod

class DocumentParser(ABC):
    """Abstract parser strategy"""

    def __init__(self, file_path: str):
        self.file_path = file_path

    @abstractmethod
    def extract_text(self) -> str:
        """Each strategy implements this differently"""
        pass

    def needs_ocr(self) -> bool:
        """Hook method with default"""
        return False

# 2. Concrete Strategies (different algorithms)
class PDFParser(DocumentParser):
    def extract_text(self) -> str:
        # PDF-specific extraction
        return extract_text_from_pdf(self.file_path)

    def needs_ocr(self) -> bool:
        # Check if PDF is scanned
        return is_scanned_pdf(self.file_path)

class ImageParser(DocumentParser):
    def extract_text(self) -> str:
        # Images always need OCR
        return ""  # No embedded text

    def needs_ocr(self) -> bool:
        return True  # Always need OCR for images

class EmailParser(DocumentParser):
    def extract_text(self) -> str:
        # Parse email format
        return extract_email_body(self.file_path)

# 3. Context (chooses strategy)
class DocumentConsumer:
    def __init__(self):
        # Strategy registry
        self.parsers = {
            'application/pdf': PDFParser,
            'image/jpeg': ImageParser,
            'message/rfc822': EmailParser,
        }

    def consume(self, file_path: str):
        # Select strategy based on file type
        mime_type = detect_mime_type(file_path)
        parser_class = self.parsers[mime_type]

        # Use selected strategy
        parser = parser_class(file_path)
        text = parser.extract_text()

        if parser.needs_ocr():
            text += run_ocr(file_path)

        return text
```

New parsers can be added without modifying existing code (Open/Closed Principle).
:p How does Paperless-NGX implement the Strategy pattern for document parsing and what are the benefits?
??x
**Strategy Pattern**: Select algorithm at runtime

**Components**:
1. **Strategy Interface**: `DocumentParser` (abstract)
   - `extract_text()` method
2. **Concrete Strategies**: `PDFParser`, `ImageParser`, etc.
   - Each implements extraction differently
3. **Context**: `DocumentConsumer`
   - Selects strategy based on file type
   - Calls strategy methods

**Code**:
```python
parser = get_parser_for_type(mime_type)
text = parser.extract_text()
```

**Benefits**:
- Add new parsers without changing consumer
- Each algorithm encapsulated
- Runtime strategy selection
- Open/Closed Principle

**Alternative**: If/else chains (harder to extend)
x??

---

#### Plugin Pattern for Extensibility
Paperless-NGX provides a plugin system allowing users to extend document processing:

```python
# Plugin Pattern (from src/documents/plugins/)

# 1. Plugin Interface
class ConsumeTaskPlugin(ABC):
    """Base plugin all plugins inherit from"""

    @abstractmethod
    def run(self, document, **kwargs):
        """
        Main plugin logic
        Args:
            document: Document being processed
            **kwargs: Additional context
        """
        pass

    def setup(self):
        """Called before run() - optional"""
        pass

    def cleanup(self):
        """Called after run() - optional"""
        pass

# 2. Plugin Mixins (modifiers)
class NoSetupPluginMixin:
    """Skip setup phase"""
    def setup(self):
        pass

class NoCleanupPluginMixin:
    """Skip cleanup phase"""
    def cleanup(self):
        pass

class AlwaysRunPluginMixin:
    """Run even if other plugins fail"""
    priority = 999

# 3. Concrete Plugin (user-created)
class BarcodeActionPlugin(ConsumeTaskPlugin, AlwaysRunPluginMixin):
    """Example: Process barcodes in documents"""

    def run(self, document, **kwargs):
        # Custom logic
        barcodes = detect_barcodes(document.file_path)
        for barcode in barcodes:
            self.process_barcode(document, barcode)

    def process_barcode(self, document, barcode):
        # Execute barcode-specific action
        if barcode.startswith('TAG:'):
            tag_name = barcode[4:]
            tag = Tag.objects.get(name=tag_name)
            document.tags.add(tag)

# 4. Plugin Registry and Execution
class PluginManager:
    def __init__(self):
        self.plugins = []

    def register(self, plugin_class):
        """Register plugin"""
        self.plugins.append(plugin_class)

    def execute_plugins(self, document):
        """Run all registered plugins"""
        for plugin_class in self.plugins:
            plugin = plugin_class()

            try:
                plugin.setup()
                plugin.run(document)
            finally:
                plugin.cleanup()

# Usage:
manager = PluginManager()
manager.register(BarcodeActionPlugin)
manager.execute_plugins(document)
```

Plugins allow customization without modifying core code.
:p How does the plugin pattern work in Paperless-NGX and what does it enable?
??x
**Plugin Pattern**: Allow runtime extension

**Components**:
1. **Plugin Interface**: `ConsumeTaskPlugin`
   - `run()`: Main logic (required)
   - `setup()`, `cleanup()`: Lifecycle hooks
2. **Mixins**: Modify behavior (`AlwaysRunPluginMixin`)
3. **Plugin Registry**: Manages and executes plugins
4. **Concrete Plugins**: User implementations

**Lifecycle**:
```
setup() → run() → cleanup()
```

**Benefits**:
- Extend without modifying core
- User customization
- Hot-reload plugins
- Composition via mixins

**Use case**: Custom document processing (barcode actions, custom metadata extraction)
x??

---

## Architectural Patterns

#### Model-View-Controller (MVC) in Django
Django uses a variant of MVC called MVT (Model-View-Template):

```python
# Traditional MVC vs Django MVT

# ┌─────────┐      ┌──────────┐      ┌──────┐
# │ Model   │◀─────│Controller│─────▶│ View │
# └─────────┘      └──────────┘      └──────┘
#     ▲                  │
#     └──────────────────┘

# Django MVT:
# ┌─────────┐      ┌──────────┐      ┌──────────┐
# │ Model   │◀─────│   View   │─────▶│ Template │
# └─────────┘      └──────────┘      └──────────┘
#  (Database)      (Controller)      (Presentation)

# 1. MODEL: Data and business logic (src/documents/models.py)
class Document(models.Model):
    title = models.CharField(max_length=128)

    def get_display_title(self):
        """Business logic in model"""
        return self.title or 'Untitled'

# 2. VIEW: Request handling and logic (src/documents/views.py)
class DocumentViewSet(ModelViewSet):
    """Django View = MVC Controller"""
    queryset = Document.objects.all()

    def list(self, request):
        # Handle request
        documents = self.get_queryset()
        # Apply business logic
        documents = documents.filter(deleted_at__isnull=True)
        # Serialize and return
        serializer = self.get_serializer(documents, many=True)
        return Response(serializer.data)

# 3. TEMPLATE: Presentation (not used in API-only backend)
# In traditional Django:
# <h1>{{ document.get_display_title }}</h1>

# In Paperless-NGX (REST API):
# Template layer is replaced by JSON serialization
# Actual templates are in Angular frontend
```

Django's "View" is actually the Controller, and the Model handles data.
:p How does Django's MVT pattern differ from traditional MVC?
??x
**Traditional MVC**:
- Model: Data
- View: Presentation
- Controller: Logic

**Django MVT**:
- **Model**: Data + business logic (Django models)
- **View**: Controller logic (Django views)
- **Template**: Presentation (HTML templates)

**Mapping**:
- Django View = MVC Controller
- Django Template = MVC View
- Django Model = MVC Model

**In Paperless-NGX**:
- Models: Document, Tag, etc.
- Views: API ViewSets (controllers)
- Template: Angular frontend (separate app)

**Key difference**: Django's "view" is confusingly named - it's the controller.
x??

---

#### Single Page Application (SPA) Architecture
Paperless-NGX frontend is a Single Page Application built with Angular:

```
Traditional Multi-Page App:
┌────────┐                 ┌────────┐
│Browser │◀───Full HTML────│ Server │
└────────┘                 └────────┘
   Click link
┌────────┐                 ┌────────┐
│Browser │◀───Full HTML────│ Server │
└────────┘                 └────────┘
  (Full page reload each time)

SPA Architecture (Paperless-NGX):
┌─────────────────────────┐     ┌─────────────┐
│   Browser (Angular)     │────▶│   Backend   │
│  ┌──────────────────┐   │     │   (Django)  │
│  │  App Shell       │   │     │             │
│  │  (Loaded once)   │   │◀────│  REST API   │
│  └──────────────────┘   │JSON │  (Data)     │
│  ┌──────────────────┐   │     │             │
│  │ Component Router │   │     └─────────────┘
│  │ (Client-side)    │   │
│  └──────────────────┘   │
└─────────────────────────┘

Flow:
1. Initial load: Download Angular app bundle
   GET /
   Response: index.html + app.js (1MB)

2. User navigates: Client-side routing (no server request)
   Click "Documents" → Angular router updates view
   No full page reload

3. Data fetching: API calls only
   GET /api/documents/
   Response: JSON data only (10KB)

4. Rendering: Client-side
   Angular renders components with data

Benefits:
✓ Fast navigation (no full reload)
✓ Responsive UX (instant feedback)
✓ Offline capability (can cache app)
✓ Mobile-friendly

Drawbacks:
✗ Larger initial load
✗ SEO challenges (server-side rendering helps)
✗ More complex state management
```

SPA separates UI from backend - they communicate via API only.
:p What is a Single Page Application (SPA) and how does Paperless-NGX implement this architecture?
??x
**SPA**: Entire app loads once, navigation happens client-side

**Architecture**:
```
Browser (Angular) ←→ Server (Django REST API)
   Full app          JSON data only
   (loads once)      (on demand)
```

**Flow**:
1. Initial: Load Angular app
2. Navigation: Client-side routing (no reload)
3. Data: API calls for JSON
4. Rendering: Client-side

**Benefits**:
- Fast navigation (no page reloads)
- Better UX (responsive)
- Mobile-friendly

**vs Traditional**:
- Traditional: Full HTML each request
- SPA: JSON data only after initial load

**Paperless-NGX**: Angular SPA + Django API backend
x??

---

#### Microservices-Like Architecture with Celery Workers
While not true microservices, Paperless-NGX separates concerns into different processes:

```
Architecture Components:

┌──────────────────────────────────────────────────┐
│              Load Balancer / Reverse Proxy       │
│                    (Optional)                    │
└─────────────────────┬────────────────────────────┘
                      │
        ┌─────────────┴─────────────┐
        │                           │
┌───────▼────────┐         ┌────────▼──────────┐
│  Web Server    │         │   Web Server      │
│  (Granian)     │         │   (Granian)       │
│  Django App    │         │   Django App      │
│  Port 8000     │         │   Port 8001       │
└───────┬────────┘         └────────┬──────────┘
        │                           │
        └─────────────┬─────────────┘
                      │
        ┌─────────────▼─────────────┐
        │                           │
┌───────▼────────┐         ┌────────▼──────────┐
│     Redis      │         │   PostgreSQL      │
│   (Broker)     │         │   (Database)      │
└───────┬────────┘         └───────────────────┘
        │
  ┌─────┴─────┬─────────┬─────────┐
  │           │         │         │
┌─▼────────┐ ┌▼──────┐ ┌▼──────┐  │
│ Celery   │ │Celery │ │Celery │  │
│ Worker 1 │ │Worker2│ │Worker3│  │
│(Consumer)│ │(Index)│ │(Mail) │  │
└──────────┘ └───────┘ └───────┘  │

Each component can scale independently:
- Web servers: Handle HTTP requests
- Workers: Process background tasks
- Redis: Message broker + cache
- Database: Data persistence

Process Isolation:
1. Web Server Process:
   - Handles HTTP requests
   - Queues tasks to Redis
   - Returns immediately

2. Celery Worker Processes:
   - Pick tasks from Redis
   - Process documents (CPU intensive)
   - Update database when done

3. Different worker types:
   - Consumer workers: Document processing
   - Index workers: Search index updates
   - Mail workers: Email processing

Benefits:
- Scalability: Add more workers under load
- Resilience: Worker crash doesn't affect web
- Specialization: Different workers for different tasks
- Resource allocation: Workers can use more CPU/memory
```

This allows independent scaling and fault isolation.
:p How does Paperless-NGX use process separation for scalability and what are the different components?
??x
**Architecture**: Process-based separation

**Components**:
1. **Web Servers** (Granian/Django):
   - Handle HTTP requests
   - Return responses immediately
   - Can run multiple instances

2. **Celery Workers**:
   - Background task processing
   - Different types: consumer, indexer, mail
   - Can scale independently

3. **Redis**: Message broker + cache
4. **PostgreSQL**: Database

**Benefits**:
- **Scalability**: Add workers under load
- **Resilience**: Worker crash ≠ web crash
- **Performance**: CPU tasks don't block requests
- **Specialization**: Workers per task type

**Flow**:
Web → Queue task to Redis → Worker processes

Not true microservices (shared database), but similar benefits.
x??

---

## Data Flow Patterns

#### Unidirectional Data Flow in Angular
Paperless-NGX follows unidirectional data flow from services to components:

```typescript
// Unidirectional data flow pattern

/*
┌──────────────┐
│  REST API    │ (Source of truth)
└──────┬───────┘
       │ HTTP GET
       ▼
┌──────────────┐
│   Service    │ (Data layer)
│  (State)     │
└──────┬───────┘
       │ Observable
       ▼
┌──────────────┐
│  Component   │ (Presentation)
│  (subscribe) │
└──────┬───────┘
       │ Template binding
       ▼
┌──────────────┐
│   Template   │ (View)
│   (Display)  │
└──────────────┘

Data flows ONE WAY: API → Service → Component → Template

User actions flow UPWARD through events:
Template → Component → Service → API
*/

// Implementation:

// 1. Service: Manages state
@Injectable({ providedIn: 'root' })
export class DocumentService {
  private documentsSubject = new BehaviorSubject<Document[]>([]);

  // Expose read-only stream
  public documents$ = this.documentsSubject.asObservable();

  loadDocuments() {
    // Fetch from API
    this.http.get<Document[]>('/api/documents/').subscribe(data => {
      // Update state (flows downstream)
      this.documentsSubject.next(data);
    });
  }
}

// 2. Component: Subscribes to state
@Component({ ... })
export class DocumentListComponent implements OnInit {
  documents: Document[] = [];

  constructor(private documentService: DocumentService) {}

  ngOnInit() {
    // Subscribe to data stream (one-way binding)
    this.documentService.documents$.subscribe(docs => {
      this.documents = docs;  // Component state updates
    });

    // Trigger load
    this.documentService.loadDocuments();
  }

  // User action flows upward
  onDeleteDocument(id: number) {
    // Send to service
    this.documentService.delete(id).subscribe(() => {
      // Service updates state
      // Component automatically re-renders via subscription
    });
  }
}

// 3. Template: Displays data
/*
<div *ngFor="let doc of documents">
  {{ doc.title }}
  <button (click)="onDeleteDocument(doc.id)">Delete</button>
</div>
*/

// Benefits:
// - Predictable data flow
// - Easy to debug (data flows one direction)
// - Components stay in sync (single source of truth)
// - No circular dependencies
```

This prevents the spaghetti of bidirectional data binding.
:p What is unidirectional data flow and how does Paperless-NGX implement it in Angular?
??x
**Unidirectional Data Flow**: Data flows one direction through app

**Flow**:
```
API → Service → Component → Template
     (state)   (subscribe)  (display)
```

**Implementation**:
1. **Service**: Manages state with BehaviorSubject
2. **Component**: Subscribes to state Observable
3. **Template**: Displays via bindings

**User actions flow UP**:
```
Template → Component → Service → API
(click)    (handler)   (HTTP)
```

**Benefits**:
- Predictable data flow
- Single source of truth
- Easy debugging
- No circular dependencies

**vs Two-way**: Two-way allows cycles, harder to track state changes.
x??

---

#### Event-Driven Architecture with Django Signals
Paperless-NGX uses events to decouple components:

```python
# Event-Driven Architecture with Django Signals

# Components communicate via events, not direct calls

# Traditional Coupled Approach (BAD):
class DocumentConsumer:
    def consume(self, document):
        # Save document
        document.save()

        # Directly call other systems (tightly coupled)
        update_search_index(document)
        execute_workflows(document)
        send_notifications(document)
        update_statistics(document)
        # Adding new feature requires modifying this function

# Event-Driven Approach (GOOD):
class DocumentConsumer:
    def consume(self, document):
        # Save document
        document.save()
        # Signal automatically fired by Django
        # post_save signal → all registered handlers execute

# Event handlers (decoupled, in separate files)
# File: documents/signals/search.py
@receiver(post_save, sender=Document)
def update_search_index_handler(sender, instance, created, **kwargs):
    if created:
        index_document.delay(instance.id)

# File: documents/signals/workflows.py
@receiver(post_save, sender=Document)
def execute_workflows_handler(sender, instance, created, **kwargs):
    if created:
        execute_document_workflows.delay(instance.id)

# File: documents/signals/notifications.py
@receiver(post_save, sender=Document)
def send_notification_handler(sender, instance, created, **kwargs):
    notify_user.delay(instance.owner.id, f"Document {instance.title} added")

# Benefits:
# 1. Decoupled: Each handler is independent
# 2. Extensible: Add new handler without modifying consumer
# 3. Testable: Can test handlers in isolation
# 4. Plugin-friendly: Plugins can register their own handlers

# Event flow:
"""
Document.save()
    │
    ├──▶ post_save signal emitted
    │
    ├──▶ Handler 1: Update search index
    │
    ├──▶ Handler 2: Execute workflows
    │
    ├──▶ Handler 3: Send notifications
    │
    └──▶ Handler 4: Update statistics

All handlers run independently
"""

# Drawbacks:
# - Harder to trace execution flow
# - Order of execution not guaranteed
# - Can't return values from handlers
```

Events create a publish-subscribe pattern for loose coupling.
:p How does Paperless-NGX implement event-driven architecture using Django signals?
??x
**Event-Driven Architecture**: Components communicate via events

**Pattern**: Publish-Subscribe
```python
# Publisher
document.save()  # Emits post_save event

# Subscribers
@receiver(post_save, sender=Document)
def handler(sender, instance, **kwargs):
    # React to event
```

**Benefits**:
- **Decoupled**: Handlers independent
- **Extensible**: Add handlers without modifying emitter
- **Testable**: Test handlers in isolation

**Use cases**:
- `post_save` → Update search index
- `post_save` → Execute workflows
- `pre_delete` → Clean up files

**Drawbacks**:
- Harder to trace flow
- No guaranteed order
- No return values

**Alternative**: Direct function calls (tightly coupled)
x??

---

