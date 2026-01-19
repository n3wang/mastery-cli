# High-Quality Flashcards: 027---Architecture-Patterns-with-Python_processed (Part 11)

**Starting Chapter:** Error Conditions That Require Database Checks

---

#### Error Handling in REST APIs
REST APIs often return specific HTTP status codes to indicate success or failure. Common error codes include 400 (Bad Request) for invalid input, 404 (Not Found) for missing resources, and 201 (Created) for successful creation. When an API encounters an error, it should return a meaningful error message to help with debugging.

:p How are errors typically communicated in RESTful APIs?
??x
Errors in REST APIs are communicated using HTTP status codes and JSON responses. For example, a 400 status code with a message like `'Out of stock for sku {sku}'` indicates that the request was invalid due to insufficient stock. This allows clients to understand what went wrong and how to correct their request.
x??

---

#### Batch Allocation Logic
When allocating stock, the system must determine which batch to use based on availability. The allocation algorithm should prioritize using stock from earlier batches, especially if the batches have expiration dates or other constraints. This ensures optimal stock usage and prevents waste.

:p What is the expected behavior of batch allocation in a stock management system?
??x
The system should allocate stock from the earliest available batch first. If the first batch is exhausted, it should proceed to the next batch. This ensures that older inventory is used first, adhering to FIFO (First In, First Out) principles, which is crucial for managing perishable goods or items with expiration dates.
x??

---

#### Testing Invalid SKU Scenarios
Invalid SKUs (those that don’t exist in the system) should be rejected at the API level to prevent further processing. This is a sanity check that ensures only valid SKUs are processed by the domain logic.

:p How do we test for invalid SKU inputs in the API?
??x
We send a request with a SKU that was never added to the system using `add_stock`. For example:

```python
unknown_sku = random_sku()
data = {'orderid': orderid, 'sku': unknown_sku, 'qty': 20}
r = requests.post(f'{url}/allocate', json=data)
assert r.status_code == 400
assert r.json()['message'] == f'Invalid sku {unknown_sku}'
```

This confirms that the API rejects requests for non-existent SKUs and provides a helpful error message.
x??

---

#### Separation of Concerns in API Design
A clean API design separates concerns by ensuring that domain logic doesn’t need to know about data validation or database constraints. These checks are handled at the API or service layer, allowing the domain to focus purely on business rules.

:p Why is it important to separate domain logic from data validation in an API?
??x
Separating concerns improves modularity and maintainability. If validation is handled in the domain, it becomes tightly coupled to business logic, making it harder to change or extend. By performing validations at the API layer, the domain remains focused on core business rules, while the API ensures data integrity before passing data to the domain.
x??

---

#### Service Layer Introduction
In the context of software architecture, especially in layered applications like Flask web apps, the service layer acts as an intermediary between the API layer and the domain model. It encapsulates business logic and orchestrates operations, making the code more modular and testable. The service layer abstracts away concerns like database interaction, input validation, and error handling from the API endpoints, which should only be concerned with HTTP request/response handling.

:p What is the purpose of introducing a service layer in a Flask application?
??x
The purpose of introducing a service layer is to separate business logic from the web framework code (like Flask), improving modularity, testability, and maintainability. It allows the API layer to focus on handling HTTP requests and responses, while the service layer handles orchestration, such as fetching data from repositories, validating inputs, and committing transactions. This separation helps avoid an "inverted test pyramid" where end-to-end tests dominate, and unit tests are underused.
x??

---

#### Fake Repository Pattern
The fake repository pattern is used in unit testing to replace real database repositories with in-memory implementations. This allows for fast, isolated tests without relying on external systems like databases. In this case, `FakeRepository` mimics the behavior of a real repository by storing `Batch` objects in memory and implementing methods like `add`, `get`, and `list`.

:p How does the fake repository pattern improve unit testing?
??x
The fake repository pattern improves unit testing by allowing developers to test business logic in isolation without requiring a real database. Instead of relying on external systems, tests can use in-memory collections to simulate data access. This leads to faster, more reliable tests that are easier to set up and maintain. For example, `FakeRepository` stores `Batch` objects in a set and implements methods like `list()` and `get()` to return mock data.
x??

---

#### Unit Testing with Fake Repositories
Unit testing with fake repositories enables developers to test service functions in isolation. By injecting a `FakeRepository` into the service function, we can simulate various scenarios like valid skus, invalid skus, or out-of-stock conditions. This approach ensures that business logic is tested independently of the database layer, which is crucial for maintaining a healthy test pyramid.

:p What are the benefits of testing service functions with a fake repository?
??x
Testing service functions with a fake repository allows for fast, isolated unit tests that don't require a real database. It enables testing of business logic under various conditions, such as valid skus, invalid skus, or out-of-stock scenarios. This leads to a better test pyramid where unit tests are more numerous and faster than end-to-end tests, improving both speed and maintainability of the test suite.
x??

---

#### Service Function: allocate()
The `allocate()` function in the service layer acts as a bridge between the API endpoint and the domain model. It takes an `OrderLine`, a list of batches, and a repository, and orchestrates the allocation of stock. It handles input validation and error propagation, ensuring that the domain logic is invoked correctly and that errors are appropriately returned to the client.

:p How does the allocate service function work?
??x
The `allocate()` service function takes an `OrderLine`, a repository, and a session. It validates the SKU against the batches in the repository and attempts to allocate stock. If the SKU is invalid or if there is insufficient stock, it raises appropriate exceptions. On success, it returns the reference of the allocated batch. It also ensures that the session is committed after the operation, allowing the changes to persist in the database.
x??

---

#### Service Layer Function Structure
The service layer in a layered architecture acts as an orchestrator between the web layer (e.g., Flask) and the domain layer. It fetches data from a repository, performs validations, calls domain logic, and commits changes. This pattern promotes separation of concerns and makes the system easier to test and maintain. The service function typically follows a consistent structure: fetch objects, validate, call domain logic, and persist changes.

:p What are the typical steps in a service-layer function?
??x
The typical steps in a service-layer function are:
1. Fetch objects from the repository.
2. Perform checks or assertions against the current state.
3. Call a domain service or business logic.
4. Commit or save any changes to the persistent storage.

For example, in the `allocate` function:
```python
def allocate(line: OrderLine, repo: AbstractRepository, session) -> str:
    batches = repo.list()
    if not is_valid_sku(line.sku, batches):
        raise InvalidSku(f'Invalid sku {line.sku}')
    batchref = model.allocate(line, batches)
    session.commit()
    return batchref
```
This ensures that all operations are handled in a controlled and predictable way.
x??

---

#### Dependency Inversion Principle in Service Layer
The Dependency Inversion Principle states that high-level modules should not depend on low-level modules. Both should depend on abstractions. In this context, the service layer depends on an `AbstractRepository` abstraction, not a concrete implementation like `SqlAlchemyRepository`. This allows for flexibility in switching implementations, such as using a `FakeRepository` for testing or `SqlAlchemyRepository` in production.

:p How does the service layer apply the Dependency Inversion Principle?
??x
The service layer applies the Dependency Inversion Principle by depending on an abstraction (`AbstractRepository`) rather than a concrete implementation. For example:
```python
def allocate(line: OrderLine, repo: AbstractRepository, session) -> str:
    ...
```
Here, `repo` is of type `AbstractRepository`, which can be implemented by `SqlAlchemyRepository` in production or `FakeRepository` in tests. This decouples the service layer from the persistence mechanism and allows for easier testing and flexibility.
x??

---

#### Role of the Flask App in the Architecture
The Flask app acts as the web layer, responsible for handling HTTP requests, parsing user input, and delegating work to the service layer. It manages per-request sessions, extracts data from POST requests, and returns appropriate JSON responses with status codes. It does not contain business logic; that is handled by the service layer.

:p What are the responsibilities of the Flask app in this architecture?
??x
The Flask app's responsibilities include:
1. Managing per-request database sessions.
2. Parsing data from HTTP requests (e.g., JSON).
3. Delegating work to the service layer.
4. Returning appropriate HTTP status codes and JSON responses.

Example:
```python
@app.route("/allocate", methods=['POST'])
def allocate_endpoint():
    session = get_session()
    repo = repository.SqlAlchemyRepository(session)
    line = model.OrderLine(
        request.json['orderid'],
        request.json['sku'],
        request.json['qty'],
    )
    try:
        batchref = services.allocate(line, repo, session)
    except (model.OutOfStock, services.InvalidSku) as e:
        return jsonify({'message': str(e)}), 400
    return jsonify({'batchref': batchref}), 201
```
This keeps the web layer thin and focused on handling HTTP concerns.
x??

---

#### Unit of Work Pattern and Its Importance
The Unit of Work pattern is a design pattern used to manage transactions and ensure consistency in data changes. It allows the service layer to coordinate changes across multiple objects and commit them all together, or roll them back if something fails. In this architecture, the service layer currently directly commits to the session, but it will be improved in Chapter 6 to use this pattern for better decoupling and control.

:p Why is the Unit of Work pattern important in this architecture?
??x
The Unit of Work pattern is important because it:
1. Ensures atomicity of operations.
2. Provides a way to coordinate multiple changes in a single transaction.
3. Decouples the service layer from the database layer, improving testability and flexibility.

For example, instead of calling `session.commit()` directly in the service layer, we can use a Unit of Work to manage the lifecycle of the session and ensure that all changes are committed together or rolled back on failure.

$$
\text{UoW} = \text{Transaction} + \text{Change Tracking}
$$

This pattern allows for better control over data consistency and is essential for more complex workflows.
x??

---

#### Handling Errors in the Flask App
When an error occurs during allocation (e.g., invalid SKU or out-of-stock), the Flask app catches the exception and returns an appropriate HTTP error response with a JSON message.

:p How does the Flask app handle errors during allocation?
??x
The Flask app handles errors by catching exceptions from the service layer:
```python
try:
    batchref = services.allocate(line, repo, session)
except (model.OutOfStock, services.InvalidSku) as e:
    return jsonify({'message': str(e)}), 400
```

This ensures that the web layer returns a meaningful error message to the client, and the appropriate HTTP status code (e.g., 400) is returned.

$$
\text{Error Handling} = \text{Catch} + \text{Return} + \text{Status Code}
$$
This approach keeps the service layer focused on business logic and the web layer focused on HTTP concerns.
x??

---

