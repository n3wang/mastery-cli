# High-Quality Flashcards: 027---Architecture-Patterns-with-Python_processed (Part 31)

**Starting Chapter:** A Bootstrap Script

---

#### Manual Dependency Injection with Closures
Manual dependency injection using closures allows developers to pre-bind dependencies to functions, making them ready to be called later without explicitly passing dependencies each time. This is especially useful in systems where handlers (e.g., command or event handlers) require certain dependencies like unit-of-work or mail services.

:p What is the purpose of using closures for dependency injection?
??x
Closures capture dependencies at the time of function creation, allowing the function to be called later with those dependencies already bound. For example, in Python:

```python
def allocate(cmd, uow):
    # handler logic
    pass

uow = SqlAlchemyUnitOfWork()
allocate_composed = lambda cmd: allocate(cmd, uow)
```

Here, `allocate_composed` is a closure that already has `uow` injected, so it can be called with just the command (`cmd`) later. This avoids having to pass `uow` every time you call `allocate`.

This pattern is helpful for decoupling handler functions from their dependencies and simplifies runtime usage.
x??

---

#### Manual Dependency Injection with functools.partial
Similar to closures, `functools.partial` allows binding arguments to a function ahead of time, which is useful for dependency injection. It can be cleaner than lambdas in some cases, especially when debugging, because it preserves the original function's name and signature.

:p How does `functools.partial` help in manual dependency injection?
??x
`functools.partial` creates a new function with some arguments pre-filled, which is ideal for injecting dependencies:

```python
import functools

def allocate(cmd, uow):
    # handler logic
    pass

uow = SqlAlchemyUnitOfWork()
allocate_composed = functools.partial(allocate, uow=uow)
```

This is equivalent to the lambda version but offers better stack traces and clearer intent. It binds `uow` to the function so that only `cmd` needs to be passed when calling `allocate_composed`.

This approach is more explicit and readable compared to closures, particularly in larger applications.
x??

---

#### Dependency Injection Using Classes (Callable Objects)
In this approach, handler functions are replaced with callable classes that accept dependencies in their constructor. This makes the dependency injection more explicit and object-oriented.

:p Why might one prefer using classes for dependency injection instead of closures or partials?
??x
Using classes for dependency injection makes dependencies explicit and encourages a more structured design. For example:

```python
class AllocateHandler:
    def __init__(self, uow):
        self.uow = uow

    def __call__(self, cmd):
        # handler logic
        pass

uow = SqlAlchemyUnitOfWork()
allocate = AllocateHandler(uow)
```

Here, `allocate` is a callable object that has `uow` injected during initialization. This is familiar to developers who work with descriptors or context managers, and it can be easier to test and debug.

This pattern is especially useful in larger systems where you want to avoid global state or magic.
x??

---

#### Bootstrapping a Message Bus
A bootstrap script initializes an application by setting up dependencies, wiring up handlers, and returning a configured message bus. This ensures that all components are ready to process messages at runtime.

:p What is the role of the bootstrap function in a message bus system?
??x
The bootstrap function prepares the application by:

1. Initializing required services like ORMs.
2. Defining default or overridden dependencies.
3. Injecting dependencies into command and event handlers.
4. Returning a configured `MessageBus` object.

Example pseudocode:

```python
def bootstrap(start_orm=True, uow=None, send_mail=None):
    if start_orm:
        orm.start_mappers()
    
    dependencies = {'uow': uow, 'send_mail': send_mail}
    injected_handlers = {
        event_type: [inject_dependencies(handler, dependencies) for handler in handlers]
        for event_type, handlers in EVENT_HANDLERS.items()
    }
    
    return MessageBus(
        uow=uow,
        event_handlers=injected_handlers,
        command_handlers=inject_dependencies(COMMAND_HANDLERS, dependencies)
    )
```

This centralizes setup logic and ensures consistency across the application.
x??

---

#### Injecting Dependencies via Function Signatures
This technique uses Python's `inspect.signature()` to analyze function parameters and inject matching dependencies automatically. It reduces boilerplate by dynamically mapping arguments to dependency values.

:p How does `inject_dependencies()` work using function signature inspection?
??x
The function inspects the signature of a handler function and matches parameter names with available dependencies:

```python
import inspect

def inject_dependencies(handler, dependencies):
    params = inspect.signature(handler).parameters
    deps = {
        name: dependency
        for name, dependency in dependencies.items()
        if name in params
    }
    return lambda message: handler(message, **deps)
```

For example, if `allocate(cmd, uow)` expects `uow`, and `dependencies = {'uow': uow}`, then `inject_dependencies(allocate, dependencies)` returns a function that only takes `cmd`.

This avoids writing repetitive lambda expressions manually and scales well with many handlers.
x??

---

#### Manual DI Without Inspection (Inline Lambdas)
In some cases, developers may choose to manually inject dependencies via inline lambda functions. While more verbose, this approach gives full control and avoids runtime introspection.

:p What are the trade-offs of manually writing lambda functions for dependency injection?
??x
Writing lambdas manually gives full control over what gets injected and how, but it's more verbose and error-prone:

```python
injected_command_handlers = {
    commands.Allocate: lambda c: handlers.allocate(c, uow),
    commands.CreateBatch: lambda c: handlers.add_batch(c, uow),
}
```

Each handler must be explicitly mapped, so it's more maintenance-heavy but also easier to reason about and debug. It’s suitable for smaller systems or when you want to avoid dynamic behavior.

This method avoids runtime inspection, which can be beneficial for performance or clarity in certain contexts.
x??

---

#### Message Bus as a Configurable Class
In the evolution from a static message bus to a configurable class, the system becomes more flexible and testable. Instead of relying on global dictionaries for event and command handlers, the message bus now accepts these handlers during instantiation. This design allows for dependency injection and makes the bus suitable for integration with frameworks like Flask, where the bus instance is shared across the application context.

:p What is the primary benefit of turning the message bus into a class rather than a static module?
??x
By converting the message bus into a class, we enable dependency injection of handlers and unit of work. This makes the system more modular, testable, and adaptable to different environments. The class structure also allows for better encapsulation and runtime configuration, which is essential in frameworks like Flask where global state must be carefully managed.
x??

---

#### Message Bus Initialization and Dependencies
The `MessageBus` class is initialized with a unit of work (`uow`) and two dictionaries: one mapping event types to lists of handlers and another mapping command types to their respective handlers. These dependencies are injected at runtime, which allows the bus to work with pre-configured and potentially mocked components during testing or in different environments.

:p How are the dependencies for the MessageBus class provided during initialization?
??x
Dependencies such as `uow`, `event_handlers`, and `command_handlers` are passed into the `MessageBus` constructor. This approach allows for flexible configuration and enables dependency injection, which is key for testing and decoupling components in an application.
x??

---

#### Handling Events and Commands in MessageBus
The `handle()` method in the message bus determines whether a message is an event or a command and routes it accordingly. It uses a queue to process messages, ensuring that events and commands are handled in order. The logic for handling events and commands is largely similar, but the handlers are retrieved from the instance attributes (`self.event_handlers` and `self.command_handlers`) instead of global dictionaries.

:p What is the logic used to route messages to their respective handlers in the MessageBus?
??x
The `handle()` method checks if the message is an instance of `events.Event` or `commands.Command`. It then routes the message to `handle_event()` or `handle_command()`, respectively. Both methods retrieve handlers from the instance attributes (`self.event_handlers` or `self.command_handlers`) and execute them. This routing ensures that the correct handlers are invoked based on the message type.
x??

---

#### Event Handling Logic
In `handle_event()`, the method iterates through all registered handlers for a given event type. Each handler is executed, and any new events collected from the unit of work are added to the queue for processing. Exception handling ensures that failures in one handler do not prevent others from running.

:p How does the `handle_event()` method manage event handlers and new events?
??x
The `handle_event()` method loops through all handlers registered for the event type, executes them, and collects new events using `self.uow.collect_new_events()`. These new events are added to the queue (`self.queue`) for further processing. If an exception occurs, it is logged, but the method continues to process other handlers.
x??

---

#### Command Handling Logic
The `handle_command()` method retrieves the appropriate handler for a command type and executes it. Similar to event handling, it collects new events after command execution and adds them to the queue. If an exception occurs, it is logged and re-raised, ensuring that errors are not silently ignored.

:p What happens after a command handler is executed in `handle_command()`?
??x
After executing a command handler, `handle_command()` collects new events from the unit of work using `self.uow.collect_new_events()` and appends them to the queue (`self.queue`) for further processing. If an exception occurs during execution, it is logged and then re-raised to propagate the error.
x??

---

#### Thread Safety Considerations
The current implementation of the message bus uses `self.queue` for processing messages, which is not thread-safe. If multiple threads access the same `MessageBus` instance, race conditions could occur. This is particularly relevant in Flask applications where the bus instance is global.

:p Why is the current implementation of `self.queue` not thread-safe, and what is the consequence?
??x
The `self.queue` list is accessed and modified using `pop(0)` and `extend()` operations, which are not atomic. If multiple threads access the same `MessageBus` instance concurrently, race conditions can occur. This can lead to inconsistent or corrupted processing order, especially in high-concurrency environments.
x??

---

#### Dependency Injection in Handlers
The message bus assumes that event and command handlers are already fully configured with their dependencies. This means that handlers are expected to be callable with only one argument — the event or command object. This simplifies the interface and promotes loose coupling.

:p How does the message bus assume that handlers are configured?
??x
The message bus assumes that handlers are pre-configured with all their dependencies and are callable with a single argument, which is either an event or a command. This eliminates the need to pass the unit of work or other dependencies explicitly to the handler, making the interface cleaner and promoting dependency injection at the time of bus instantiation.
x??

---

#### Bootstrap Pattern in Application Entrypoints
The bootstrap pattern centralizes the initialization logic of an application, including setting up the ORM, defining the unit of work, and configuring the message bus. Previously, each entrypoint had to manually configure these components, leading to redundancy and tight coupling. Now, `bootstrap.bootstrap()` returns a fully initialized message bus ready to handle commands.

:p What is the benefit of using `bootstrap.bootstrap()` in Flask entrypoints?
??x
Using `bootstrap.bootstrap()` simplifies the entrypoint code by abstracting away the setup of the ORM, unit of work, and message bus. Instead of manually initializing these components in each route, we simply call `bootstrap.bootstrap()` once to get a configured message bus. This promotes reuse, reduces boilerplate, and ensures consistent initialization across all entrypoints.

```python
# Old approach
orm.start_mappers()
uow = unit_of_work.SqlAlchemyUnitOfWork()
messagebus.handle(cmd, uow)

# New approach
bus = bootstrap.bootstrap()
bus.handle(cmd)
```
x??

---

#### Dependency Injection via Bootstrap
The bootstrap process allows for configurable dependency injection. In tests, we can override default dependencies such as the unit of work or message handlers to use mocks or fakes. This is essential for unit and integration testing without relying on external systems like databases or email services.

:p How does bootstrap enable dependency injection in tests?
??x
The `bootstrap.bootstrap()` function accepts keyword arguments to override default dependencies. For instance, in integration tests, we might inject a real database-backed unit of work and replace actual email or publish functions with no-ops. In unit tests, we can inject a `FakeUnitOfWork` to isolate business logic from persistence concerns.

```python
def bootstrap_test_app():
    return bootstrap.bootstrap(
        start_orm=False,
        uow=FakeUnitOfWork(),
    )
```
x??

---

#### Message Bus as a Specific Instance
Previously, the message bus was a global module-level object. Now, after bootstrapping, we get a specific instance of the message bus, which makes it easier to manage and test. This change improves modularity and supports better test isolation.

:p Why is the message bus now an instance rather than a global module?
??x
Making the message bus a specific instance instead of a global module enhances modularity and testability. It allows us to create different instances with different configurations (e.g., real vs. fake units of work) without affecting other parts of the system. This approach also aligns with dependency injection principles and avoids shared mutable state.

$$
\text{MessageBus instance} = bootstrap.bootstrap()
$$

```python
# Before: global module
from allocation import messagebus
messagebus.handle(cmd)

# After: specific instance
bus = bootstrap.bootstrap()
bus.handle(cmd)
```
x??

---

#### Integration Testing with Custom Bootstrap
In integration tests, we often need a real database but want to avoid sending emails or publishing events. By overriding bootstrap defaults, we can configure a custom message bus with a real unit of work and dummy handlers for non-essential features.

:p How is the bootstrap used in integration tests to isolate dependencies?
??x
In integration tests, `bootstrap.bootstrap()` is called with specific parameters like `uow=SqlAlchemyUnitOfWork(sqlite_session_factory)` to use an in-memory database, and `send_mail=lambda *args: None` to disable email sending. This ensures that tests are fast, isolated, and focused on behavior rather than side effects.

```python
@pytest.fixture
def sqlite_bus(sqlite_session_factory):
    bus = bootstrap.bootstrap(
        start_orm=True,
        uow=unit_of_work.SqlAlchemyUnitOfWork(sqlite_session_factory),
        send_mail=lambda *args: None,
        publish=lambda *args: None,
    )
    yield bus
    clear_mappers()
```
x??

---

#### Unit Testing with Fake Unit of Work
For unit tests, we typically don’t need a real database or ORM. Instead, we inject a `FakeUnitOfWork` to simulate persistence logic while keeping tests fast and isolated. This approach supports true unit testing by mocking dependencies.

:p How does the bootstrap pattern support unit testing with fake units of work?
??x
Unit tests use `bootstrap.bootstrap()` with `start_orm=False` and `uow=FakeUnitOfWork()`. This avoids initializing the ORM and provides a lightweight in-memory mock for unit of work operations. This allows developers to test business logic without relying on external systems like databases or real persistence layers.

```python
def bootstrap_test_app():
    return bootstrap.bootstrap(
        start_orm=False,
        uow=FakeUnitOfWork(),
    )
```
x??

---

