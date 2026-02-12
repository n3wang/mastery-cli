# High-Quality Flashcards: 027---Architecture-Patterns-with-Python_processed (Part 39)

**Starting Chapter:** Validating Semantics

---

#### Semantic Validation in Message Handling
Semantic validation ensures that messages are not only syntactically correct but also meaningful and valid in context. Unlike syntax, which checks structure, semantics evaluates the actual meaning of the data. A message may have correct syntax but still be semantically invalid if it doesn’t make sense in the domain (e.g., allocating a negative quantity or referencing a non-existent product). This is crucial for preventing errors in systems that process structured data like JSON.

:p What is the purpose of semantic validation in message handling?
??x
Semantic validation ensures that messages are not only structurally valid but also meaningful and correct in context. For example, a JSON blob like:
```json
{
  "orderid": "superman",
  "sku": "zygote",
  "qty": -1
}
```
is syntactically valid but semantically invalid because quantities cannot be negative. Such messages must be rejected early to avoid processing invalid data in the system.
x??

---

#### Precondition Checking Using Contract-Based Programming
Preconditions are checks performed before executing business logic to ensure that the input data meets expected constraints. This approach uses exceptions to enforce contracts between components. For instance, a handler may check if a product exists before attempting to allocate stock. Using a base exception class allows for consistent error handling and reporting.

:p How are preconditions enforced in service layers using contract-based programming?
??x
Preconditions are enforced using a base exception class like `MessageUnprocessable`, with specific exceptions such as `ProductNotFound`. These are checked before processing the core logic:
```python
def product_exists(event, uow):
    product = uow.products.get(event.sku)
    if product is None:
        raise ProductNotFound(event)
```
This ensures that invalid messages are rejected early, keeping the service logic clean and declarative.
x??

---

#### Handling Invalid Messages with Custom Exceptions
When a message is invalid due to semantic issues, raising a custom exception (e.g., `ProductNotFound`) allows the system to handle these errors gracefully. This pattern makes it easier to map exceptions to HTTP status codes or log meaningful error messages. For example, in Flask, `ProductNotFound` can be mapped to a 404 error.

:p Why is it beneficial to define specific exception types for invalid messages?
??x
Defining specific exceptions like `ProductNotFound` allows systems to:
- Map errors to appropriate HTTP responses (e.g., 404 for missing resources)
- Provide better logging and monitoring
- Handle errors consistently across the application
```python
class ProductNotFound(MessageUnprocessable):
    def __init__(self, message):
        super().__init__(message)
        self.sku = message.sku
```
This improves maintainability and clarity in error handling.
x??

---

#### Idempotent Message Handling with SkipMessage
In distributed systems, messages may be delivered more than once due to retries or network issues. To prevent duplicate processing, systems can use a `SkipMessage` exception to ignore known duplicates. For example, if a batch already exists, the system logs a warning and skips processing the message instead of failing.

:p How does the `SkipMessage` exception help in handling idempotent operations?
??x
The `SkipMessage` exception allows the system to gracefully skip messages that are duplicates or no longer relevant:
```python
def batch_is_new(event, uow):
    batch = uow.batches.get(event.batchid)
    if batch is not None:
        raise SkipMessage(f"Batch with id {event.batchid} already exists")
```
This prevents duplicate batch creation and keeps the message bus clean, ensuring idempotent behavior.
x??

---

#### Unit of Work (UoW) Consistency in Precondition Checks
When applying preconditions, it’s critical that the same Unit of Work (UoW) instance is used for both checking and processing. Otherwise, inconsistencies can occur, especially in concurrent environments. This ensures that the state seen during validation matches the state during execution.

:p Why is it important to use the same UoW instance for validation and processing?
??x
Using the same UoW instance ensures consistency between validation and execution phases. If different UoW instances are used, the state might change between checks and actual processing, leading to inconsistent behavior. For example:
```python
ensure.product_exists(uow, event)
product = uow.products.get(line.sku)
```
Here, `uow` must be the same across both lines to avoid race conditions or stale data.
x??

---

#### Tolerant Reader Pattern
The Tolerant Reader pattern suggests that applications should only read the fields they need from a message, and avoid over-specifying the internal structure of the message. This approach enhances flexibility by allowing message formats to evolve without breaking existing code.

:p What is the purpose of the Tolerant Reader pattern in message handling?
??x
The purpose of the Tolerant Reader pattern is to reduce coupling between systems by only reading fields that are necessary for processing. It allows the internal structure of messages to change without requiring updates to consumers. This is particularly useful in distributed systems where messages may evolve over time. For example, a service may read only a subset of fields from a JSON message and treat others as opaque strings.
x??

---

#### Validation at System Edges
Validation should happen at the edges of a system (e.g., at input boundaries or API gateways) to ensure that only valid messages reach the core business logic. This prevents invalid data from polluting the domain model and keeps business logic clean and focused.

:p Why should validation be done at the edges of a system?
??x
Validation at the edges ensures that only syntactically and semantically valid messages reach the domain layer. This protects the domain model from invalid data and keeps it focused on business logic. For example, a service layer might validate that a user ID is present and of the correct format before passing the message to a domain model, which then handles the pragmatics (e.g., whether the user has sufficient permissions).
x??

---

#### Domain Model and Pragmatic Validation
Pragmatic validation, which involves business rules and contextual logic, belongs in the domain model. For example, if a command says to allocate stock, the domain model must verify that sufficient stock is available — this is a pragmatic rule.

:p Where should pragmatic validation be placed in a system?
??x
Pragmatic validation, which involves business logic and contextual rules, should be placed in the domain model. For example, if a command says "allocate three million units of SCARCE-CLOCK to order 76543," the system must check if sufficient stock exists. This kind of validation cannot be done at the edges, because it requires context from the domain. The domain model is where business rules are enforced.
x??

---

#### Precondition Checks in Handlers
Precondition checks are used to validate input before a handler processes it. These checks ensure that the handler only receives valid inputs. They should not be used to enforce business rules — that belongs in the domain model.

:p What is the role of precondition checks in a handler?
??x
Precondition checks in handlers are used to ensure that only syntactically and semantically valid inputs are passed to the handler. They prevent invalid data from reaching the business logic. For example, a handler might check that a required field exists or that a number is in a valid range. However, checks that involve business logic (like whether stock is available) should not be in the handler but in the domain model.
x??

---

