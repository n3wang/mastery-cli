# Angular & Frontend Concepts Flashcards

## Angular Component Architecture

#### Angular Component Structure
Angular components are the building blocks of the UI. Each component has three parts:

```typescript
// From src-ui/src/app/components/dashboard/dashboard.component.ts

// 1. Component Decorator (metadata)
@Component({
  selector: 'app-dashboard',  // HTML tag: <app-dashboard></app-dashboard>
  templateUrl: './dashboard.component.html',  // HTML template
  styleUrls: ['./dashboard.component.scss']   // Component-specific styles
})

// 2. Component Class (logic)
export class DashboardComponent implements OnInit {
  // Properties (data)
  documentCount: number = 0;
  isLoading: boolean = false;

  // Constructor (dependency injection)
  constructor(
    private documentService: DocumentService,
    private router: Router
  ) {}

  // Lifecycle hooks
  ngOnInit() {
    // Runs when component initializes
    this.loadDocuments();
  }

  // Methods (behavior)
  loadDocuments() {
    this.documentService.list().subscribe(data => {
      this.documentCount = data.count;
    });
  }
}

// 3. Template (HTML with Angular syntax)
// In dashboard.component.html:
/*
<div class="dashboard">
  <h1>Total Documents: {{ documentCount }}</h1>
  <button (click)="loadDocuments()">Refresh</button>
  <div *ngIf="isLoading">Loading...</div>
</div>
*/
```

Template binds to component properties and methods using Angular's template syntax.
:p What are the three parts of an Angular component and how do they work together?
??x
**Three parts**:

1. **Decorator (@Component)**:
   - `selector`: HTML tag name
   - `templateUrl`: Path to HTML
   - `styleUrls`: Path to CSS/SCSS

2. **Class (TypeScript)**:
   - Properties: Component state
   - Methods: Component behavior
   - Constructor: Dependency injection
   - Lifecycle hooks: `ngOnInit()`, etc.

3. **Template (HTML)**:
   - Binds to class properties with `{{ }}`
   - Event handlers with `(click)="method()"`
   - Directives like `*ngIf`, `*ngFor`

All three work together: decorator configures, class provides logic, template displays UI.
x??

---

#### Angular Lifecycle Hooks
Angular components have lifecycle hooks that run at specific times. Paperless-NGX uses these for initialization and cleanup:

```typescript
// Component lifecycle order:
export class DocumentDetailComponent implements OnInit, OnDestroy {

  // 1. Constructor: Runs when component is instantiated
  constructor(private route: ActivatedRoute) {
    // DON'T call external services here
    // Component isn't fully initialized yet
  }

  // 2. ngOnInit: Runs after component is initialized
  ngOnInit() {
    // GOOD: Load data, subscribe to observables
    this.route.params.subscribe(params => {
      this.loadDocument(params['id']);
    });
  }

  // 3. ngAfterViewInit: Runs after view is rendered
  ngAfterViewInit() {
    // Access child components or DOM elements
    // Useful for third-party library integration
  }

  // 4. ngOnDestroy: Runs before component is destroyed
  ngOnDestroy() {
    // IMPORTANT: Clean up to prevent memory leaks
    this.subscription?.unsubscribe();
  }
}

// Full lifecycle order:
// constructor → ngOnInit → ngAfterViewInit → ... → ngOnDestroy
```

`ngOnInit` is most commonly used for initialization logic.
:p What are the key Angular lifecycle hooks and when should you use ngOnInit vs constructor?
??x
**Key lifecycle hooks** (in order):

1. **constructor**: Component instantiation
   - For dependency injection only
   - Component not fully initialized

2. **ngOnInit**: After component initialized
   - Load data, subscribe to services
   - Most initialization logic goes here

3. **ngAfterViewInit**: After view rendered
   - Access DOM, child components

4. **ngOnDestroy**: Before component destroyed
   - Unsubscribe, cleanup resources
   - Prevent memory leaks

**Rule**: Use `ngOnInit()` for initialization, not `constructor`.
Constructor is for DI only.
x??

---

## RxJS and Reactive Programming

#### Observable Pattern in Angular
Paperless-NGX uses RxJS Observables extensively for async operations:

```typescript
// From src-ui/src/app/services/rest/document.service.ts

import { Observable } from 'rxjs';

@Injectable()
export class DocumentService {

  constructor(private http: HttpClient) {}

  // Returns Observable, not the data directly
  list(page: number = 1): Observable<DocumentListResponse> {
    return this.http.get<DocumentListResponse>(
      `/api/documents/?page=${page}`
    );
    // HTTP request not sent yet - Observable is lazy
  }
}

// In component:
export class DocumentListComponent implements OnInit {

  documents: Document[] = [];

  constructor(private documentService: DocumentService) {}

  ngOnInit() {
    // Subscribe to execute the Observable
    this.documentService.list().subscribe({
      next: (response) => {
        // Success: data received
        this.documents = response.results;
      },
      error: (error) => {
        // Error handling
        console.error('Failed to load documents:', error);
      },
      complete: () => {
        // Optional: called when Observable completes
        console.log('Request finished');
      }
    });
  }
}
```

Observables are lazy - nothing happens until you subscribe.
:p How do RxJS Observables work in Angular and why are they used instead of Promises?
??x
**Observable**: Stream of async values over time

**Key characteristics**:
- **Lazy**: Nothing happens until `.subscribe()`
- **Cancellable**: Can unsubscribe
- **Multiple values**: Can emit many values

**Subscribe pattern**:
```typescript
observable.subscribe({
  next: (data) => { },    // Success
  error: (err) => { },    // Error
  complete: () => { }     // Done
})
```

**vs Promises**:
- Promise: Single value, eager, not cancellable
- Observable: Multiple values, lazy, cancellable

Angular uses Observables for HTTP, events, state management.
x??

---

#### RxJS Operators for Data Transformation
Paperless-NGX uses RxJS operators to transform data streams:

```typescript
// From src-ui/src/app/services/rest/document.service.ts

import { map, catchError, retry, debounceTime } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable()
export class DocumentService {

  // Example 1: Transform response data
  getDocument(id: number): Observable<Document> {
    return this.http.get<Document>(`/api/documents/${id}/`).pipe(
      // map: Transform each emitted value
      map(response => {
        // Add computed property
        return {
          ...response,
          displayTitle: response.title || 'Untitled'
        };
      }),
      // retry: Retry failed requests
      retry(3),
      // catchError: Handle errors gracefully
      catchError(error => {
        console.error('Error loading document:', error);
        return of(null);  // Return fallback value
      })
    );
  }

  // Example 2: Search with debounce
  search(query: Observable<string>): Observable<Document[]> {
    return query.pipe(
      // debounceTime: Wait for user to stop typing
      debounceTime(300),  // 300ms pause
      // switchMap: Cancel previous request if new one starts
      switchMap(searchTerm =>
        this.http.get<Document[]>(`/api/search/?q=${searchTerm}`)
      )
    );
  }
}
```

Operators are chained with `.pipe()` to create data processing pipelines.
:p What are common RxJS operators used in Paperless-NGX and what do they do?
??x
**Common operators**:

1. **map**: Transform each value
   ```typescript
   .pipe(map(x => x * 2))
   ```

2. **catchError**: Handle errors, return fallback
   ```typescript
   .pipe(catchError(err => of(defaultValue)))
   ```

3. **debounceTime**: Wait before emitting
   - Use for search (wait for typing pause)

4. **retry**: Retry failed operations
   ```typescript
   .pipe(retry(3))
   ```

5. **switchMap**: Switch to new Observable, cancel previous
   - Use for search (cancel old request)

**pipe()**: Chain operators
```typescript
obs.pipe(op1(), op2(), op3())
```
x??

---

#### Memory Leaks and Unsubscribing
A common issue in Angular is forgetting to unsubscribe from Observables:

```typescript
// PROBLEM: Memory leak
export class BadComponent implements OnInit {
  ngOnInit() {
    // Subscription never cleaned up
    this.service.getData().subscribe(data => {
      this.data = data;
    });
    // When component is destroyed, subscription remains active
  }
}

// SOLUTION 1: Manual unsubscribe
export class GoodComponent implements OnInit, OnDestroy {
  private subscription: Subscription;

  ngOnInit() {
    this.subscription = this.service.getData().subscribe(data => {
      this.data = data;
    });
  }

  ngOnDestroy() {
    // Clean up when component is destroyed
    this.subscription?.unsubscribe();
  }
}

// SOLUTION 2: takeUntil pattern (Paperless-NGX uses this)
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

export class BetterComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();

  ngOnInit() {
    this.service.getData()
      .pipe(takeUntil(this.destroy$))  // Auto-unsubscribe on destroy
      .subscribe(data => this.data = data);

    // Can use for multiple subscriptions
    this.service.getMore()
      .pipe(takeUntil(this.destroy$))
      .subscribe(more => this.more = more);
  }

  ngOnDestroy() {
    this.destroy$.next();  // Trigger unsubscribe for all
    this.destroy$.complete();
  }
}
```

Not all subscriptions need cleanup - HttpClient auto-completes.
:p How do you prevent memory leaks from Observable subscriptions in Angular?
??x
**Problem**: Subscriptions remain active after component destroyed

**Solutions**:

1. **Manual unsubscribe**:
```typescript
ngOnDestroy() {
  this.subscription?.unsubscribe();
}
```

2. **takeUntil pattern** (preferred):
```typescript
destroy$ = new Subject<void>();

ngOnInit() {
  obs.pipe(takeUntil(this.destroy$)).subscribe();
}

ngOnDestroy() {
  this.destroy$.next();
  this.destroy$.complete();
}
```

**Exception**: HttpClient auto-completes (single request), no cleanup needed.

Always clean up long-lived subscriptions (WebSocket, timers, event streams).
x??

---

## Angular Services and Dependency Injection

#### Angular Service Pattern
Services in Paperless-NGX centralize business logic and API communication:

```typescript
// From src-ui/src/app/services/rest/document.service.ts

// 1. Injectable decorator makes it available for DI
@Injectable({
  providedIn: 'root'  // Singleton - one instance app-wide
})
export class DocumentService {

  private baseUrl = '/api/documents/';

  // 2. Inject dependencies
  constructor(
    private http: HttpClient,
    private configService: ConfigService
  ) {}

  // 3. Expose methods for components
  list(page: number = 1): Observable<DocumentListResponse> {
    return this.http.get<DocumentListResponse>(
      `${this.baseUrl}?page=${page}`
    );
  }

  get(id: number): Observable<Document> {
    return this.http.get<Document>(`${this.baseUrl}${id}/`);
  }

  update(id: number, data: Partial<Document>): Observable<Document> {
    return this.http.patch<Document>(`${this.baseUrl}${id}/`, data);
  }
}

// Usage in component:
@Component({ ... })
export class DocumentListComponent {

  // 4. Inject service into component
  constructor(private documentService: DocumentService) {}

  loadDocuments() {
    this.documentService.list().subscribe(/* ... */);
  }
}
```

Services are singletons when `providedIn: 'root'` - shared state across app.
:p What is the role of Angular services and how does dependency injection work?
??x
**Angular Service**: Centralized business logic and data access

**Structure**:
```typescript
@Injectable({ providedIn: 'root' })
export class MyService {
  constructor(private http: HttpClient) {}
}
```

**Dependency Injection**:
- Angular creates service instances
- Injects into components via constructor
- `providedIn: 'root'` = singleton (one instance)

**Benefits**:
- Reusable logic across components
- Testable (can mock services)
- Separation of concerns
- Shared state

**Example**: DocumentService handles all document API calls, injected wherever needed.
x??

---

#### Service-Based State Management
Paperless-NGX uses services with BehaviorSubject for state management:

```typescript
// From src-ui/src/app/services/document-list-view.service.ts

import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class DocumentListViewService {

  // BehaviorSubject: Observable that stores current value
  private documentsSubject = new BehaviorSubject<Document[]>([]);

  // Expose as Observable (read-only)
  public documents$: Observable<Document[]> = this.documentsSubject.asObservable();

  // Private state
  private currentPage = 1;

  constructor(private documentService: DocumentService) {}

  // Update state
  loadDocuments(page: number = 1) {
    this.currentPage = page;

    this.documentService.list(page).subscribe(response => {
      // Emit new value to all subscribers
      this.documentsSubject.next(response.results);
    });
  }

  // Get current value synchronously
  getCurrentDocuments(): Document[] {
    return this.documentsSubject.value;
  }
}

// Components subscribe to state:
@Component({ ... })
export class DocumentListComponent implements OnInit {

  documents: Document[] = [];

  constructor(private viewService: DocumentListViewService) {}

  ngOnInit() {
    // Subscribe to state changes
    this.viewService.documents$.subscribe(docs => {
      this.documents = docs;  // Auto-updates when state changes
    });

    this.viewService.loadDocuments();
  }
}
```

BehaviorSubject allows multiple components to share state reactively.
:p How does Paperless-NGX manage application state using services and BehaviorSubject?
??x
**Pattern**: Service with BehaviorSubject

**BehaviorSubject**:
- Observable that stores current value
- New subscribers immediately get current value
- Can emit new values with `.next()`

**Structure**:
```typescript
private state$ = new BehaviorSubject(initialValue);
public state = this.state$.asObservable();  // Read-only

updateState(newValue) {
  this.state$.next(newValue);  // Emit new value
}
```

**Benefits**:
- Multiple components share same state
- Reactive updates (auto-refresh UI)
- No centralized store needed (like Redux)

**Example**: DocumentListViewService maintains list state, multiple components subscribe.
x??

---

## Angular Templates and Data Binding

#### Template Syntax and Binding Types
Angular provides multiple ways to bind data between template and component:

```typescript
// Component
@Component({
  template: `
    <!-- 1. Interpolation: Component → Template (one-way) -->
    <h1>{{ title }}</h1>
    <p>Documents: {{ documentCount }}</p>
    <p>{{ getFormattedDate() }}</p>

    <!-- 2. Property Binding: Component → Template (one-way) -->
    <img [src]="documentUrl">
    <button [disabled]="isLoading">Submit</button>
    <div [class.active]="isActive">...</div>
    <div [style.color]="textColor">...</div>

    <!-- 3. Event Binding: Template → Component (one-way) -->
    <button (click)="onSave()">Save</button>
    <input (keyup)="onKeyUp($event)">
    <form (submit)="onSubmit($event)">

    <!-- 4. Two-Way Binding: Template ↔ Component (bi-directional) -->
    <input [(ngModel)]="searchQuery">
    <!-- Equivalent to: -->
    <input [ngModel]="searchQuery" (ngModelChange)="searchQuery = $event">

    <!-- 5. Template Reference Variables -->
    <input #searchInput type="text">
    <button (click)="search(searchInput.value)">Search</button>
  `
})
export class ExampleComponent {
  title = 'Documents';
  documentCount = 10;
  documentUrl = '/media/doc.pdf';
  isLoading = false;
  isActive = true;
  textColor = 'red';
  searchQuery = '';

  getFormattedDate(): string {
    return new Date().toLocaleDateString();
  }

  onSave() { /* ... */ }
  onKeyUp(event: KeyboardEvent) { /* ... */ }
}
```

Each binding type serves different use cases.
:p What are the different types of data binding in Angular templates and when do you use each?
??x
**Four binding types**:

1. **Interpolation `{{ }}`**: Display data
   - Component → Template
   - `{{ title }}`

2. **Property Binding `[prop]`**: Set element properties
   - Component → Template
   - `[disabled]="isLoading"`
   - `[class.active]="true"`

3. **Event Binding `(event)`**: Handle events
   - Template → Component
   - `(click)="onClick()"`

4. **Two-Way Binding `[(ngModel)]`**: Sync input
   - Template ↔ Component
   - `[(ngModel)]="name"`
   - Requires FormsModule

**Template variables `#name`**: Reference elements
x??

---

#### Structural Directives (*ngIf, *ngFor)
Paperless-NGX uses structural directives to conditionally render and repeat elements:

```typescript
// Component
@Component({
  template: `
    <!-- *ngIf: Conditional rendering -->
    <div *ngIf="isLoading">Loading...</div>

    <div *ngIf="errorMessage; else noError">
      Error: {{ errorMessage }}
    </div>
    <ng-template #noError>
      <p>All good!</p>
    </ng-template>

    <!-- *ngIf with async pipe (auto-subscribe) -->
    <div *ngIf="documents$ | async as documents">
      Found {{ documents.length }} documents
    </div>

    <!-- *ngFor: Repeat elements -->
    <ul>
      <li *ngFor="let doc of documents">
        {{ doc.title }}
      </li>
    </ul>

    <!-- *ngFor with index and tracking -->
    <div *ngFor="let doc of documents; let i = index; trackBy: trackByDocId">
      {{ i + 1 }}. {{ doc.title }}
    </div>

    <!-- *ngSwitch: Multiple conditions -->
    <div [ngSwitch]="documentType">
      <p *ngSwitchCase="'pdf'">PDF Document</p>
      <p *ngSwitchCase="'image'">Image Document</p>
      <p *ngSwitchDefault>Unknown Type</p>
    </div>
  `
})
export class DocumentListComponent {
  isLoading = false;
  errorMessage = '';
  documents: Document[] = [];
  documents$: Observable<Document[]>;
  documentType = 'pdf';

  // trackBy improves performance - Angular knows which items changed
  trackByDocId(index: number, doc: Document): number {
    return doc.id;  // Unique identifier
  }
}
```

The `*` syntax is shorthand for `<ng-template>`.
:p What are Angular structural directives and how do *ngIf and *ngFor work?
??x
**Structural directives**: Add/remove DOM elements

**`*ngIf`**: Conditional rendering
```html
<div *ngIf="condition">Shows if true</div>
<div *ngIf="value; else template">...</div>
```

**`*ngFor`**: Repeat elements
```html
<li *ngFor="let item of items">{{ item }}</li>
<li *ngFor="let item of items; let i = index">
  {{ i }}: {{ item }}
</li>
```

**trackBy**: Performance optimization
```typescript
trackByFn(index, item) { return item.id; }
```
```html
<li *ngFor="let item of items; trackBy: trackByFn">
```

**`*` syntax**: Shorthand for `<ng-template>`

**ngSwitch**: Multiple conditions (like switch statement)
x??

---

## Angular HTTP and Interceptors

#### HTTP Interceptors for Request/Response Modification
Paperless-NGX uses HTTP interceptors to add authentication tokens and handle errors globally:

```typescript
// From src-ui/src/app/interceptors/api.interceptor.ts

import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class ApiInterceptor implements HttpInterceptor {

  constructor(
    private configService: ConfigService,
    private router: Router
  ) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {

    // 1. Clone and modify request (requests are immutable)
    const modifiedRequest = request.clone({
      // Add authentication token to all API requests
      setHeaders: {
        'Authorization': `Token ${this.getToken()}`,
        'Content-Type': 'application/json'
      },
      // Add base URL
      url: `${environment.apiUrl}${request.url}`
    });

    // 2. Pass to next interceptor or HTTP handler
    return next.handle(modifiedRequest).pipe(
      // 3. Handle errors globally
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401) {
          // Unauthorized - redirect to login
          this.router.navigate(['/login']);
        } else if (error.status === 403) {
          // Forbidden - show error
          this.showError('Permission denied');
        } else if (error.status >= 500) {
          // Server error
          this.showError('Server error occurred');
        }

        return throwError(() => error);
      })
    );
  }

  private getToken(): string {
    return localStorage.getItem('auth_token') || '';
  }
}

// Register in app.module.ts:
providers: [
  {
    provide: HTTP_INTERCEPTORS,
    useClass: ApiInterceptor,
    multi: true  // Can have multiple interceptors
  }
]
```

Interceptors form a chain - each can modify request/response.
:p How do HTTP interceptors work in Angular and what are they used for in Paperless-NGX?
??x
**HTTP Interceptor**: Middleware for HTTP requests/responses

**Implementation**:
```typescript
@Injectable()
export class MyInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest, next: HttpHandler): Observable<HttpEvent> {
    // Modify request
    const modified = req.clone({ setHeaders: {...} });
    return next.handle(modified).pipe(
      // Modify response or handle errors
      catchError(err => ...)
    );
  }
}
```

**Use cases in Paperless-NGX**:
- Add auth token to all requests
- Add base URL
- Global error handling (401 → login)
- Request/response logging

**Chain**: Multiple interceptors executed in order

**Register**: In providers with `multi: true`
x??

---

## Angular Routing

#### Route Parameters and Navigation
Paperless-NGX uses Angular routing to navigate between views:

```typescript
// Route configuration (app-routing.module.ts)
const routes: Routes = [
  { path: 'dashboard', component: DashboardComponent },
  { path: 'documents', component: DocumentListComponent },
  { path: 'documents/:id', component: DocumentDetailComponent },
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: '**', component: NotFoundComponent }  // 404
];

// Document Detail Component
@Component({ ... })
export class DocumentDetailComponent implements OnInit {
  documentId: number;

  constructor(
    private route: ActivatedRoute,  // Current route
    private router: Router  // Navigation
  ) {}

  ngOnInit() {
    // 1. Get route parameter
    this.route.params.subscribe(params => {
      this.documentId = +params['id'];  // + converts to number
      this.loadDocument(this.documentId);
    });

    // Alternative: Snapshot (non-reactive)
    // this.documentId = +this.route.snapshot.params['id'];
  }

  // 2. Navigate programmatically
  goToList() {
    this.router.navigate(['/documents']);
  }

  editDocument() {
    // Navigate with route params
    this.router.navigate(['/documents', this.documentId, 'edit']);
  }

  goBack() {
    // Navigate relatively
    this.router.navigate(['..'], { relativeTo: this.route });
  }

  // 3. Navigate with query params
  search(query: string) {
    this.router.navigate(['/documents'], {
      queryParams: { search: query, page: 1 }
    });
    // URL: /documents?search=invoice&page=1
  }
}

// In template:
// <a [routerLink]="['/documents', doc.id]">View</a>
// <a routerLink="/documents" [queryParams]="{page: 2}">Page 2</a>
```

Route params are Observables - they update if you navigate to the same component with different params.
:p How does Angular routing work and how do you access route parameters in Paperless-NGX?
??x
**Route Configuration**:
```typescript
{ path: 'documents/:id', component: DetailComponent }
```

**Access route params**:
1. **Observable** (reacts to changes):
```typescript
this.route.params.subscribe(params => {
  this.id = +params['id'];
});
```

2. **Snapshot** (one-time read):
```typescript
this.id = +this.route.snapshot.params['id'];
```

**Programmatic navigation**:
```typescript
// Navigate to route
this.router.navigate(['/documents', id]);

// With query params
this.router.navigate(['/docs'], { queryParams: {q: 'test'} });
```

**Template navigation**:
```html
<a [routerLink]="['/documents', id]">Link</a>
```

Use Observable params when same component, different params.
x??

---

