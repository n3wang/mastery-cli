# High-Quality Flashcards: 027---Architecture-Patterns-with-Python_processed (Part 36)

**Starting Chapter:** C. Swapping Out the Infrastructure Do Everything with CSVs

---

#### Repository Pattern in CSV Processing
The repository pattern is a design pattern that abstracts data access logic, allowing the domain layer to remain independent of the data storage mechanism. In the context of CSV processing, this means we can swap out how data is loaded and saved without changing the core business logic. This is key to making the system flexible and maintainable. The repository acts as a mediator between the domain and data layers, encapsulating all logic related to data retrieval and persistence.

:p What is the role of the repository pattern in enabling infrastructure swapping like CSV processing?
??x
The repository pattern isolates infrastructure concerns by abstracting how data is accessed. In the case of CSV processing, instead of hardcoding CSV reading/writing logic into the domain or service layers, we implement repository classes that handle CSV files. This allows us to reuse the same domain and service logic while simply changing the repository implementation when switching from a database to CSVs. This decoupling makes it easy to add new data sources or change the way data is persisted.
$$
\text{Repository} \rightarrow \text{Domain Layer}
$$
```python
# Example repository interface
class BatchRepository:
    def list(self): ...
    def add(self, batch): ...

# CSV implementation
class CSVBatchRepository(BatchRepository):
    def list(self):
        # Read from CSV and return list of batches
        pass
```
x??

---

#### Service Layer Reuse Across Infrastructures
The service layer contains the core business logic and is meant to be independent of the infrastructure. In this case, the allocation logic is implemented in the service layer and reused regardless of whether the input is from a database or CSV files. This allows us to write a new CSV reader and writer without rewriting the allocation logic, which is a key benefit of separating concerns.

:p Why is it important to keep the service layer independent of infrastructure concerns like CSV or database?
??x
Keeping the service layer independent ensures that business logic remains consistent across different data sources. When the service layer handles allocation logic, it doesn't need to know if data is coming from a database or CSV. This means we can reuse the same allocation logic, test it once, and confidently apply it in multiple environments. This promotes code reusability, maintainability, and reduces the risk of introducing bugs when switching infrastructure.
$$
\text{Service Layer} \rightarrow \text{Domain Logic}
$$
```python
# Service layer function
def allocate_order(order_line, batches):
    # Core business logic
    return batch_ref
```
x??

---

#### Domain Model Usage in CSV Context
The domain model classes like `Batch` and `OrderLine` are reused in the CSV processing logic. This means that the same business objects that were used in the Flask API are also used in the CSV reader/writer. This reuse ensures that the business rules and logic are consistent across different parts of the application.

:p How does reusing domain model objects in CSV processing maintain consistency?
??x
Reusing domain models like `Batch` and `OrderLine` ensures that the same business rules and logic are applied whether the data comes from a database or a CSV file. For example, when a `Batch` object is created from CSV data, it follows the same validation and initialization logic as when it's created from a database. This consistency ensures that the allocation logic behaves the same way regardless of the data source.
$$
\text{CSV} \rightarrow \text{Domain Model} \rightarrow \text{Allocation Logic}
$$
```python
# Reusing domain model
batch = model.Batch(ref=row['ref'], sku=row['sku'], qty=int(row['qty']), eta=eta)
```
x??

---

#### Refactoring for Repository and Unit of Work
The original code was tightly coupled to CSV I/O. By introducing repositories and unit of work, we decoupled the data access logic from the business logic. This refactoring allows us to easily swap out CSV for other data sources like databases, without modifying the core allocation logic.

:p How does introducing repositories and unit of work improve code flexibility?
??x
Introducing repositories and unit of work allows us to abstract data access and transaction handling. This means we can swap out CSV logic for database logic by simply implementing new repository classes, without touching the service or domain layers. It makes the system more modular, testable, and maintainable, and supports rapid prototyping or infrastructure changes.
$$
\text{Service Layer} \rightarrow \text{Repository} \rightarrow \text{Data Source}
$$
```python
# Before: Tight coupling
def main():
    # Direct CSV I/O

# After: Decoupled
def main():
    batch_repo = CSVBatchRepository()
    order_repo = CSVOrderRepository()
    uow = UnitOfWork(batch_repo, order_repo)
```
x??

---

---

#### CLI Application with CSV Integration
The CLI application demonstrates how to integrate CSV-based repositories and units of work into an existing service layer. It reads order lines from `orders.csv` and uses the service layer to allocate inventory, persisting changes through the `CsvUnitOfWork`.

:p How does the CLI application use the service layer with CSV storage?
??x
The CLI application reads order lines from `orders.csv`, and for each order line, it calls the `services.allocate()` function, passing in the order details and a `CsvUnitOfWork` instance. This allows the service layer to manage allocations, and the UoW ensures that all allocations are written to `allocations.csv` upon successful commit. The application does not directly interact with the repository or CSV files; it relies on the abstraction provided by the service layer and UoW.
```python
def main(folder):
    orders_path = Path(folder) / 'orders.csv'
    uow = csv_uow.CsvUnitOfWork(folder)
    with orders_path.open() as f:
        reader = csv.DictReader(f)
        for row in reader:
            orderid, sku = row['orderid'], row['sku']
            qty = int(row['qty'])
            services.allocate(orderid, sku, qty, uow)
```
x??

---

#### Django Repository Pattern Overview
In the context of using Django instead of SQLAlchemy with Flask, the repository pattern is adapted to work with Django's ORM. The repository abstracts data access logic and provides a clean interface for interacting with the database. This allows the core domain logic to remain independent of the data persistence layer.

:p What is the main purpose of adapting the repository pattern for Django?
??x
The main purpose is to encapsulate data access logic using Django's ORM, allowing the domain model to remain decoupled from the database implementation. This makes the system more maintainable and testable by providing a consistent way to perform operations like saving and retrieving batches and allocations.
x??

---

