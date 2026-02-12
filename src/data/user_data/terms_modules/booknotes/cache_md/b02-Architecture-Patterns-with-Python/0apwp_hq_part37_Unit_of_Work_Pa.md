# High-Quality Flashcards: 027---Architecture-Patterns-with-Python_processed (Part 37)

**Starting Chapter:** Unit of Work Pattern with Django

---

#### Django ORM Custom Methods for Domain Model Conversion
In the context of domain-driven design, mapping between Django ORM models and domain models is essential. Custom methods like `to_domain()` and `update_from_domain()` are defined on ORM classes to facilitate translation. These methods allow the domain model to remain independent of the persistence layer, adhering to dependency inversion principles where the ORM depends on the domain model rather than the other way around.

:p What is the purpose of the `to_domain()` method in the `Batch` class?
??x
The `to_domain()` method translates a Django ORM `Batch` object into a domain model `Batch` object. It initializes a domain `Batch` with attributes from the ORM object and populates the `_allocations` field by converting each related `Allocation` object into a domain `OrderLine`. This allows the domain logic to operate on pure domain objects without being coupled to Django models.
```python
def to_domain(self) -> domain_model.Batch:
    b = domain_model.Batch(
        ref=self.reference, sku=self.sku, qty=self.qty, eta=self.eta
    )
    b._allocations = set(
        a.line.to_domain()
        for a in self.allocation_set.all()
    )
    return b
```
x??

---

#### Unit of Work Pattern with Django Transactions
The Unit of Work (UoW) pattern is used to manage transactions and ensure consistency across operations. In Django, transactions are managed using `transaction.set_autocommit(False)` to delay commits until the end of a transaction block. The UoW pattern ensures that all changes are committed or rolled back together.

:p How does the `DjangoUnitOfWork` manage transactions in Django?
??x
The `DjangoUnitOfWork` class uses Django’s transaction control to manage a unit of work. It disables autocommit at the start (`set_autocommit(False)`), allowing multiple operations to be grouped into a single transaction. During `commit()`, it updates all seen batches and explicitly calls `transaction.commit()`. If an error occurs, `rollback()` is invoked to undo all changes.
```python
class DjangoUnitOfWork(AbstractUnitOfWork):
    def __enter__(self):
        self.batches = repository.DjangoRepository()
        transaction.set_autocommit(False)
        return super().__enter__()

    def commit(self):
        for batch in self.batches.seen:
            self.batches.update(batch)
        transaction.commit()

    def rollback(self):
        transaction.rollback()
```
x??

---

#### Repository Pattern with Django ORM
A repository abstraction is used to encapsulate data access logic and hide the details of how domain entities are persisted. In this implementation, `DjangoRepository` is used within `DjangoUnitOfWork` to manage batch retrieval and updates. Repositories provide a clean interface between domain logic and ORM models.

:p How does the `DjangoRepository` interact with `DjangoUnitOfWork`?
??x
The `DjangoRepository` is instantiated in the `DjangoUnitOfWork.__enter__()` method and used to manage domain entities. It abstracts access to the database through methods like `get()` and `update()`. During `commit()`, the `DjangoUnitOfWork` iterates over `self.batches.seen` and calls `update()` on the repository for each entity that was modified, ensuring persistence of changes.
x??

---

#### Handling Relationships in Domain Model Translation
Relationships between entities in the domain model must be carefully translated when moving between ORM and domain models. For example, the `Batch` model has a `related_name` of `allocation_set`, which is used to fetch related allocations and convert them into domain objects.

:p How are relationships like allocations handled when translating from ORM to domain?
??x
In the `to_domain()` method, related `Allocation` objects are fetched using `self.allocation_set.all()`. Each `Allocation` is then converted into a domain `OrderLine` via `a.line.to_domain()`. This ensures that the relationship between `Batch` and `OrderLine` is correctly represented in the domain model, preserving data integrity and semantic meaning.
```python
b._allocations = set(
    a.line.to_domain()
    for a in self.allocation_set.all()
)
```
x??

---

#### Dependency Inversion Principle in ORM and Domain Models
The dependency inversion principle is applied by ensuring that the domain model does not depend on the ORM. Instead, the ORM classes depend on the domain model. This is achieved through custom methods on ORM models that convert between the two representations, keeping the domain clean and testable.

:p Why is dependency inversion important in the ORM-domain model integration?
??x
Dependency inversion ensures that the domain model remains independent of the persistence layer (Django ORM). This allows for easier testing, refactoring, and switching of persistence mechanisms. It also enforces a clear separation of concerns, where the ORM provides translation methods (`to_domain`, `update_from_domain`) rather than the domain depending on ORM specifics.
x??

---

#### Django Views as Thin Wrappers Around Service Layer
In the context of a Django application, views act as thin wrappers around the service layer. This architectural pattern ensures that business logic remains separate from the web framework code. The views are responsible for handling HTTP requests and responses, while the actual logic is delegated to services. This design promotes modularity and testability.

:p What is the purpose of Django views in this architecture?
??x
The Django views act as a bridge between the HTTP request and the service layer. They parse incoming data, call service functions, and return appropriate HTTP responses. In this example, `add_batch` and `allocate` functions handle POST requests to manage inventory batches and allocations, respectively. The views do not contain complex business logic but instead delegate to services that encapsulate the core logic. This separation ensures that the service layer remains reusable and independent of the web framework.
x??

---

#### Handling JSON Data in Django Views
When handling HTTP requests in Django, especially POST requests, data is often sent in JSON format. The Django view must deserialize this JSON data into Python objects to process it. This involves using `json.loads(request.body)` to extract and parse the data.

:p How does a Django view extract and process JSON data from a POST request?
??x
The Django view uses `json.loads(request.body)` to parse the raw JSON data from the request body. For example, in `add_batch`, the data is extracted like this:
```python
data = json.loads(request.body)
```
This allows access to fields such as `eta`, `ref`, `sku`, and `qty`. The view then processes this data, potentially converting formats like ISO date strings into Python date objects before passing it to service functions.
x??

---

#### Unit of Work Pattern in Django Views
The Unit of Work pattern is used to manage database transactions and ensure consistency. In this Django example, `unit_of_work.DjangoUnitOfWork()` is passed to service functions. This abstraction allows services to work with database operations without directly managing transactions or connections.

:p What is the role of the Unit of Work in Django views?
??x
The Unit of Work pattern encapsulates database transaction management, ensuring that all related operations are committed or rolled back together. In Django views, `unit_of_work.DjangoUnitOfWork()` is passed to service functions to abstract away database handling. This allows services to focus on business logic rather than transaction control. The unit of work ensures that database changes are atomic and consistent.
x??

---

#### Error Handling in Django API Views
When calling service functions, errors such as `OutOfStock` or `InvalidSku` may occur. These exceptions must be caught and handled gracefully, returning appropriate HTTP responses with error messages.

:p How does a Django view handle exceptions from service functions?
??x
Exceptions from service functions are caught using a `try-except` block. For example:
```python
try:
    batchref = services.allocate(...)
except (model.OutOfStock, services.InvalidSku) as e:
    return JsonResponse({'message': str(e)}, status=400)
```
This ensures that the API returns a meaningful error message with an HTTP 400 status code when invalid data or stock issues occur. It improves the robustness and usability of the API.
x??

---

#### Separation of Concerns in Web Frameworks
In modern web applications, separating concerns is crucial. The Django views handle HTTP interactions, the service layer handles business logic, and the data layer handles database operations. This separation improves maintainability and testability.

:p How does separating concerns improve application design?
??x
Separation of concerns ensures that each part of the application has a single responsibility. In this Django setup:
- Views handle HTTP request/response logic.
- Services contain business logic.
- The Unit of Work manages database transactions.
This design allows developers to modify one component without affecting others, improves testability, and makes the codebase easier to maintain and scale.
x??

---

#### Repository and Unit of Work Patterns in Django
The Repository and Unit of Work (UoW) patterns are useful for decoupling domain logic from Django's ORM. These patterns help improve testability by allowing unit tests to run without hitting the database. However, implementing them in Django requires extra effort since Django's ORM doesn't directly support the classical mapper pattern used in SQLAlchemy.

:p What are the benefits of applying Repository and Unit of Work patterns in Django?
??x
These patterns allow for faster unit tests and better decoupling from Django and the database. They enable easier migration away from Django if needed. However, they require building translation layers between domain models and Django models, increasing upfront complexity. The UoW pattern ensures atomicity of operations across multiple repositories.

```python
# Example: Simplified Repository pattern
class UserRepository:
    def find_by_id(self, user_id):
        return User.objects.get(id=user_id)

class UserService:
    def __init__(self, user_repo):
        self.user_repo = user_repo

    def update_user_email(self, user_id, new_email):
        user = self.user_repo.find_by_id(user_id)
        user.email = new_email
        self.user_repo.save(user)
```
x??

---

#### Service Layer Pattern in Django
The Service Layer pattern helps reduce duplication in views by encapsulating business logic. When views start to contain too much logic, extracting that logic into services makes code more maintainable and testable. It separates use cases from web endpoints.

:p How does the Service Layer pattern improve Django applications?
??x
The Service Layer pattern centralizes business logic, reducing duplication in views. It allows you to think about use cases independently from web endpoints. This improves maintainability and testability, especially as applications grow beyond simple CRUD functionality.

```python
# Example: Service Layer usage
class OrderService:
    def create_order(self, customer_id, items):
        # Business logic here
        order = Order(customer_id=customer_id, items=items)
        return order

# In views.py
def order_create_view(request):
    service = OrderService()
    order = service.create_order(request.user.id, request.POST['items'])
    return render(request, 'order_created.html', {'order': order})
```
x??

---

#### Fat Models vs. Domain Layer in Django
Some developers use "fat models" in Django, putting all business logic inside models. While this works initially, it can lead to scalability issues, especially when managing interdependencies between apps. Extracting a business logic layer helps manage complexity and promotes better separation of concerns.

:p What are the drawbacks of using fat models in Django?
??x
Fat models can lead to scalability problems, especially with interdependencies between apps. As applications grow, managing complex logic within models becomes harder. It also makes testing more difficult and can result in tightly coupled code. A separate domain layer helps decouple business logic from Django models.

```python
# Example: Fat model approach (not recommended for large apps)
class Order(models.Model):
    customer = models.ForeignKey(User, on_delete=models.CASCADE)
    status = models.CharField(max_length=20)

    def process_payment(self):
        # Business logic mixed with ORM
        if self.status == 'pending':
            self.status = 'paid'
            self.save()
```
x??

---

#### Business Logic Layer Using logic.py
A recommended approach for Django projects is to create a `logic.py` file in each app from the beginning. This provides a dedicated place for business logic, keeping models, views, and forms free of such logic. It serves as a stepping stone toward fully decoupled domain models.

:p Why should you add a logic.py file to every Django app early on?
??x
Adding `logic.py` early helps separate business logic from Django components like models, views, and forms. It prepares the codebase for future migration to fully decoupled domain models or service layers. It also improves maintainability and makes the app easier to refactor later.

```python
# Example structure
# app_name/logic.py
def calculate_shipping_cost(order_items):
    # Business logic here
    total = sum(item.price * item.quantity for item in order_items)
    return total + 5.99  # Flat shipping fee

# app_name/views.py
from .logic import calculate_shipping_cost

def order_view(request):
    shipping_cost = calculate_shipping_cost(order.items)
    return render(request, 'order.html', {'shipping_cost': shipping_cost})
```
x??

---

#### Migrating to Decoupled Domain Models
When starting with Django, it's often easier to begin with tightly coupled models and gradually introduce decoupling. Over time, you can evolve from working with Django model objects to plain Python data structures. This gradual migration allows you to maintain functionality while improving architecture.

:p What is the recommended approach for migrating to a decoupled domain model in Django?
??x
Start with tightly coupled models and gradually extract business logic into a separate domain layer. Initially, work with Django model objects, but eventually transition to plain Python data structures. This allows you to maintain existing functionality while improving architecture. The transition should be gradual to avoid breaking changes.

```python
# Phase 1: Tightly coupled
class Order(models.Model):
    customer = models.ForeignKey(User, on_delete=models.CASCADE)
    status = models.CharField(max_length=20)

# Phase 2: Decoupled
class Order:
    def __init__(self, customer_id, status):
        self.customer_id = customer_id
        self.status = status

class OrderService:
    def process_order(self, order_data):
        # Business logic without Django ORM
        order = Order(order_data['customer_id'], order_data['status'])
        return order
```
x??

---

