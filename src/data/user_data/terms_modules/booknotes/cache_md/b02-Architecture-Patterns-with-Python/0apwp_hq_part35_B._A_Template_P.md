# High-Quality Flashcards: 027---Architecture-Patterns-with-Python_processed (Part 35)

**Starting Chapter:** B. A Template Project Structure

---

#### Project Structure Overview
The project structure described in the appendix represents a modular, scalable layout for a Python application, particularly one built around domain-driven design principles. This structure separates concerns into distinct layers—domain logic, infrastructure, and entrypoints—making it easier to maintain and test. The use of `src` as the root of source code ensures clean imports and packaging.

:p What is the purpose of organizing the project into a structured folder hierarchy?
??x
The structured folder hierarchy helps separate concerns in software development. It allows developers to isolate domain logic, infrastructure code, and entrypoints (like web APIs). For example, the `src/allocation/domain` folder contains the core business logic, while `src/allocation/entrypoints` handles how the application is exposed (e.g., via Flask). This modularity makes testing and maintenance easier.
$$
\text{Example structure:} \\
\text{src/} \\
\quad \text{allocation/} \\
\quad \quad \text{domain/} \rightarrow \text{model.py} \\
\quad \quad \text{entrypoints/} \rightarrow \text{flask_app.py} \\
\quad \quad \text{adapters/} \rightarrow \text{orm.py, repository.py}
$$
x??

---

#### Source Code Packaging with `setup.py`
The application's source code is organized within a Python package inside the `src` directory. This package is installed using `pip install -e .`, which allows for easy imports and development without needing to reinstall after every change.

:p How does `pip install -e .` help in development?
??x
The `-e` flag stands for "editable" install, meaning that changes to the source code are immediately reflected in the installed package. This is useful during development, as it avoids the need to reinstall the package every time a change is made. The `setup.py` file declares the package structure and dependencies.
```python
# Example setup.py snippet
from setuptools import setup, find_packages

setup(
    name="allocation",
    packages=find_packages(where="src"),
    package_dir={"": "src"},
)
```
x??

---

#### Layered Architecture in Software Design
The project uses a layered architecture where the domain logic is separated from infrastructure and entrypoints. For instance, `domain/model.py` contains business logic, while `adapters/repository.py` handles data access. This separation supports the dependency inversion principle and improves testability.

:p What is the benefit of separating domain logic from infrastructure code?
??x
Separating domain logic from infrastructure code improves maintainability and testability. For example, in `domain/model.py`, business rules are defined, while in `adapters/repository.py`, data persistence logic is abstracted. This allows developers to test domain logic independently of databases or external services, making the system more robust and easier to evolve.
$$
\text{Domain Logic} \rightarrow \text{Business Rules} \\
\text{Infrastructure} \rightarrow \text{Data Access, External APIs}
$$
x??

---

#### Python Package Structure and Imports
The `src/allocation` directory is a Python package, which allows for clean and organized imports. It uses `__init__.py` files to mark directories as packages and supports nested imports.

:p How does Python's package structure help in organizing code?
??x
Python packages allow for structured imports and modular code. For example, `from allocation.domain.model import Batch` makes it clear where a class comes from. This structure avoids naming conflicts and improves readability. The `__init__.py` files enable the directory to be treated as a package, and `pip install -e .` makes it easy to import from anywhere in the project.
```python
# Example import
from allocation.domain.model import Batch
from allocation.adapters.orm import start_mappers
```
x??

---

---

#### Folder Structure for a Complex Project
In complex software projects, organizing code into a structured hierarchy improves maintainability and scalability. A typical structure includes `domain_model/`, `infrastructure/`, `services/`, and `api/` folders. Tests are kept separately, often in a dedicated `tests/` folder with subfolders for different test types like unit, integration, or functional tests. Shared fixtures (`conftest.py`) are placed in the main `tests/` directory, while more specific ones can be nested in subdirectories. This organization allows developers to run tests independently and maintain clean separation of concerns.
:p What is the recommended folder structure for a complex Python project?
??x
A standard folder structure includes:
- `domain_model/` for core business logic
- `infrastructure/` for external dependencies like databases or APIs
- `services/` for service layer implementations
- `api/` for HTTP endpoints or API definitions
- `tests/` for test code, with subfolders for test types (e.g., `unit/`, `integration/`)
- `conftest.py` for shared fixtures at the root of `tests/`
This layout supports modular development and makes it easier to run targeted tests.
x??

---

#### Configuration via Environment Variables
The 12-factor manifesto recommends managing application configuration through environment variables. This approach ensures that settings like database URIs or API endpoints can be changed without modifying code, supporting deployment flexibility across environments like dev, staging, and production. In Python, this is typically implemented using `os.environ.get()` to fetch values, falling back to defaults when not present.
:p How does the 12-factor manifesto suggest managing application configuration?
??x
According to the 12-factor manifesto, configuration should be stored in environment variables. For example, in a config module:
```python
import os

def get_postgres_uri():
    host = os.environ.get('DB_HOST', 'localhost')
    port = 54321 if host == 'localhost' else 5432
    password = os.environ.get('DB_PASSWORD', 'abc123')
    user, db_name = 'allocation', 'allocation'
    return f"postgresql://{user}:{password}@{host}:{port}/{db_name}"
```
This allows developers to change behavior by setting environment variables, without altering code.
x??

---

#### Example Configuration Functions in Python
The `config.py` file typically contains functions that dynamically return configuration values based on environment variables. These functions are preferred over static constants because they allow runtime modification of settings via `os.environ`. Default values are provided so that the app works out-of-the-box in local development environments.
:p What is the purpose of functions like `get_postgres_uri()` in a config module?
??x
Functions like `get_postgres_uri()` allow dynamic configuration retrieval based on environment variables. They provide fallback defaults for local development, e.g.:
```python
def get_postgres_uri():
    host = os.environ.get('DB_HOST', 'localhost')
    port = 54321 if host == 'localhost' else 5432
    password = os.environ.get('DB_PASSWORD', 'abc123')
    user, db_name = 'allocation', 'allocation'
    return f"postgresql://{user}:{password}@{host}:{port}/{db_name}"
```
This pattern supports flexible deployment and avoids hardcoded values.
x??

---

#### Environment-Based Configuration with Default Values
In `config.py`, functions use default values when environment variables are not set, enabling local development without explicit configuration. For instance, `DB_HOST` defaults to `'localhost'`, and the port changes accordingly. This makes the application portable and easy to run in different environments.
:p How does default value handling in config functions support local development?
??x
Functions like:
```python
host = os.environ.get('DB_HOST', 'localhost')
port = 54321 if host == 'localhost' else 5432
```
ensure the app runs locally with minimal setup. When `DB_HOST` is not defined, it defaults to `'localhost'`, and the port adjusts to match local Docker mappings (e.g., 54321 instead of 5432).
x??

---

#### Avoiding Config Module Bloat
A well-structured config module should avoid becoming a dumping ground. Only immutable configuration items should be defined here, and all changes should be made via environment variables. A bootstrap script can centralize config loading to prevent widespread imports throughout the codebase.
:p Why should a config module not become a dumping ground?
??x
A config module should only contain configuration items that are immutable or set via environment variables. If it becomes bloated with unrelated logic or state, it leads to tight coupling and harder-to-maintain code. Centralizing config loading in a bootstrap script ensures clean separation of concerns.
x??

---

#### Using `environs` for Simplified Config Management
The `environs` Python package simplifies environment variable parsing and validation. It offers a cleaner way to handle configuration than manually writing `os.environ.get()` calls. It supports nested structures, type conversion, and default values.
:p What is the benefit of using `environs` over manual environment variable handling?
??x
`environs` provides type-safe parsing and validation of environment variables:
```python
from environs import Env

env = Env()
env.read_env()  # Read from .env file

db_host = env.str('DB_HOST', default='localhost')
db_port = env.int('DB_PORT', default=5432)
```
This reduces boilerplate and improves robustness compared to manual handling.
x??

---

#### Container Networking in Docker Compose
Docker Compose sets up internal networking so that services can communicate using their service names as hostnames. For example, if a service is named `postgres`, it can be reached from another service via `postgres`.
:p How does Docker Compose facilitate inter-container communication?
??x
Docker Compose automatically creates a network where services are accessible by their service name. For example:
```yaml
services:
  app:
    depends_on:
      - postgres
  postgres:
    image: postgres:9.6
```
Inside the `app` container, `DB_HOST=postgres` allows it to connect to the database using the service name `postgres`.
x??

---

#### Python Source Structure with `src` Folder
The application code is organized in a `src` folder, where subfolders define top-level module names. This structure supports pip-installable packages using `setup.py`, making it easy to distribute and reuse code. It's a common pattern in modern Python projects.
:p Why is the `src` folder used in Python projects?
??x
The `src` folder organizes application code in a way that supports pip-installable packages. Subfolders become top-level modules, and `setup.py` defines how these modules are installed. This structure separates source code from tests and other project files, promoting clean and maintainable codebases.
x??

---

#### Environment Variables and Configuration
Environment variables are used to configure applications, with defaults defined in a centralized `config.py` file. This allows the application to run both inside and outside containers, making it flexible for different environments like development and production.
:p Why are environment variables and `config.py` used in applications?
??x
Environment variables allow configuration without hardcoding values, making applications flexible for different environments. The `config.py` file centralizes these settings, providing defaults for local development while allowing overrides in production. This approach supports both containerized and non-containerized deployments.
x??

---

#### Separation of Development and Production Docker Images
Separating Docker images for development and production helps manage dependencies and configurations more effectively. For example, development images may include debug tools, while production images are optimized for size and security.
:p Why separate Docker images for development and production?
??x
Separating images allows developers to include debugging tools and dev-specific dependencies in development images, while production images are optimized for minimal size and security. This reduces risk and improves deployment efficiency.
x??

---

