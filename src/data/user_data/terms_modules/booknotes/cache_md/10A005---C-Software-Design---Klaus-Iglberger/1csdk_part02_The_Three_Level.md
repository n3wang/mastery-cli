# High-Quality Flashcards: 10A005---C-Software-Design---Klaus-Iglberger_processed (Part 2)


**Starting Chapter:** The Three Levels of Software Development

---


#### Overview of Software Development Levels

In software development, three levels are recognized: **Software Architecture**, **Software Design**, and **Implementation Details**. Each level serves a different purpose and has distinct characteristics.

:p What are the three levels of software development mentioned?
??x
The three levels of software development are:
1. **Software Architecture**
2. **Software Design**
3. **Implementation Details**

These levels complement each other, with architecture focusing on big decisions, design on interaction among entities, and implementation details on specific code-level concerns.

---

#### Software Architecture

Architecture is about the overall structure and strategy of a software project. It includes high-level concepts like client-server architecture or microservices, which determine how different parts of the system interact. Decisions here are often challenging to change later in the development process.

:p What does software architecture primarily focus on?
??x
Software architecture primarily focuses on the big decisions that define the overall structure and strategy of a software project. It includes elements like client-server architecture or microservices, which determine how different parts of the system interact and can significantly affect maintainability, changeability, extensibility, testability, and scalability.

---

#### Software Design

Design is concerned with the detailed interactions between components, focusing on aspects like maintainability, changeability, extensibility, testability, and scalability. It uses design patterns to define dependencies among software entities.

:p What are some key aspects of software design?
??x
Key aspects of software design include:
- Maintainability: How easy it is to modify or enhance the system.
- Changeability: The ease with which different parts can be changed without affecting others.
- Extensibility: How easily new features or components can be added.
- Testability: How well the system and its components can be tested.
- Scalability: How well the system performs as more data or users are added.

Design often employs patterns like Visitor, Strategy, and Decorator to manage dependencies among software entities.

---

#### Implementation Details

Implementation details focus on specific code-level concerns such as memory management, performance optimization, exception handling, etc. They include idioms which are commonly used solutions in a particular programming language.

:p What does the implementation level deal with?
??x
The implementation level deals with concrete coding details like choosing the appropriate C++ standard or subset, using features, keywords, and language specifics to manage memory acquisition, ensure exception safety, optimize performance, etc. It includes idioms such as copy-and-swap or RAII, which are specific practices in C++.

---

#### Idioms

Idioms represent commonly used but language-specific solutions for recurring problems. They can be either implementation patterns or design patterns and are best practices within the community.

:p What is an idiom in software development?
??x
An idiom is a common solution to a recurring problem in a particular programming language. Examples include C++ idioms like the copy-and-swap idiom for implementing copy assignment operators, and RAII (Resource Acquisition Is Initialization). These are best practices that don't introduce abstractions but help with practical issues.

---

#### Distinguishing Architecture from Design

The line between architecture and design can be blurry. Architecture tends to focus on high-level decisions and key entities like modules or components, while design focuses more on interactions among these entities using patterns.

:p How do architecture and design differ?
??x
Architecture focuses on high-level decisions that define the overall structure of a system, such as client-server architecture or microservices, making it hard to change. Design deals with lower-level interactions between components using patterns like Visitor, Strategy, and Decorator, addressing maintainability, extensibility, etc.

---

#### RAII Example

RAII (Resource Acquisition Is Initialization) is an idiom in C++ where resources are managed through object lifetimes rather than explicit deallocation functions. This encapsulates resource management within the class lifecycle.

:p What is the RAII idiom?
??x
The RAII (Resource Acquisition Is Initialization) idiom in C++ manages resources by acquiring them during construction and releasing them during destruction. For example, a `File` object might open a file when it's created and automatically close it when it goes out of scope.

```cpp
class File {
private:
    FILE* fp;
public:
    File(const std::string& filename) : fp(fopen(filename.c_str(), "r")) {
        if (!fp) throw std::runtime_error("File not found");
    }
    
    ~File() { 
        if (fp != nullptr) fclose(fp); 
    }

    // Other methods...
};
```

This code ensures that the file is closed when the object goes out of scope, encapsulating resource management within the class lifecycle.

---

These flashcards cover key concepts and provide detailed explanations to enhance understanding.


#### Abstraction and Encapsulation
Abstraction and encapsulation are two fundamental principles of object-oriented programming. Abstraction helps in simplifying complex systems by hiding unnecessary details, making them easier to understand and change. Encapsulation, on the other hand, ensures that data is protected from external interference and misuse.
:p How do abstraction and encapsulation help in managing complexity in software development?
??x
Abstraction allows you to focus on high-level functionalities without worrying about the underlying complexities, while encapsulation keeps your code organized by hiding internal details. For instance, a class might provide methods to manipulate data but hide how exactly that data is stored.
```cpp
class DataManipulator {
private:
    int* data;
public:
    void setData(int value) { *data = value; }
    int getData() const { return *data; }
};
```
x??

---

#### RAII and Resource Management
RAII (Resource Acquisition Is Initialization) is a C++ idiom that uses the constructor to acquire resources and the destructor to release them. This technique provides automatic and deterministic resource management, ensuring that resources are properly released even in the presence of exceptions.
:p What does RAII provide as an advantage for resource management?
??x
RAII encapsulates resource management within classes by using constructors to allocate resources and destructors to deallocate them. This ensures that resources are managed automatically and deterministically, making your code more robust and less error-prone.
```cpp
class FileHandler {
private:
    std::ifstream file;
public:
    explicit FileHandler(const std::string& filename) : file(filename) { 
        if (!file.is_open()) throw std::runtime_error("Failed to open file"); 
    }
    ~FileHandler() { file.close(); } // Resource deallocation
};
```
x??

---

#### Non-Virtual Interface (NVI) Idiom and Pimpl Idiom
The NVI idiom and the Pimpl idiom are two design patterns that improve code organization by decoupling interface from implementation. NVI introduces a non-virtual interface to provide a stable public interface, while Pimpl hides the implementation details behind a pointer.
:p How do the NVI idiom and the Pimpl idiom help in software design?
??x
The NVI idiom separates the interface from the implementation by using a pure virtual function for the interface. This makes it easier to extend functionality without breaking existing clients.

Pimpl (Pointer-to-Implementation) hides the implementation details behind a pointer, reducing compile-time dependencies and improving code maintainability.
```cpp
class MyClass {
public:
    void publicMethod1();
    void publicMethod2();

private:
    struct Implementation;
    std::unique_ptr<Implementation> pImpl; // Hides the implementation details
};
```
x??

---

#### Focus on Features in C++
The C++ community often focuses heavily on new language features and standards, sometimes at the expense of software architecture and design. This focus is driven by the complexity of new features and the need to establish best practices.
:p Why does the C++ community place so much emphasis on features?
??x
The C++ community places a strong emphasis on features because there are numerous complex language changes with detailed implementations. Ensuring that developers understand how to use these features correctly is crucial, which requires time and effort.

Expectations for new features can be too high; while they might bring significant improvements, they do not necessarily address structural or design issues.
```cpp
// Example of using modules in C++
module MyModule;
export int add(int a, int b) { return a + b; }
```
x??

---

#### Complexity Comparison: Features vs. Design
While features are complex and require detailed understanding, the complexity of software design is often much greater. Design issues depend heavily on project-specific factors and do not have straightforward solutions.
:p Why might focusing on C++ features be misleading in terms of software development?
??x
Focusing too much on new language features can lead to misdirected efforts because these features, while powerful, address specific problems but may not solve broader design or architectural issues. Design principles such as modularity and abstraction are crucial for maintaining code quality over the long term.

Design decisions often require context-specific knowledge, making them more challenging to standardize.
```cpp
// Example of a complex design decision in C++
class ComplexSystem {
public:
    void performAction();
private:
    // Internal logic that depends on project specifics
};
```
x??


#### Importance of Software Design
Software design is crucial for writing maintainable and adaptable software. It forms the foundation of project success, making it essential to focus on software architecture and principles rather than just features.

:p Why is focusing on software design important?
??x
Focusing on software design is important because it helps in creating more adaptable and maintainable software. Good software design ensures that changes can be made easily without introducing unnecessary complexity or coupling between different parts of the system. This leads to lower costs over time as maintenance becomes easier.

```cpp
// Example of bad coupling
class Engine {
public:
    void setFuelType(std::string type) { /* code */ }
};

class Car {
private:
    Engine engine;
public:
    void changeFuelType(std::string newType) {
        engine.setFuelType(newType); // Tight coupling between classes
    }
};
```
x??

---

#### Design for Change
The ability to change software easily is a critical expectation. This is because software needs to adapt to changing requirements, which is one of the key differences from hardware.

:p What does "Design for Change" mean in the context of software development?
??x
"Design for Change" means creating software architectures and designs that are flexible and can be modified or adapted without significant effort. This involves minimizing dependencies between different parts of the system to ensure that changes in one part do not require extensive modifications elsewhere.

```java
// Example of change-friendly design using interfaces
interface FuelType {
    void setFuelType(String type);
}

class ElectricCar implements FuelType {
    public void setFuelType(String newType) { /* code */ }
}

class Car {
    private FuelType fuelSystem;

    public Car(FuelType fuelSystem) {
        this.fuelSystem = fuelSystem;
    }

    public void changeFuelType(String newType) {
        fuelSystem.setFuelType(newType); // Decoupled design
    }
}
```
x??

---

#### Separation of Concerns
The separation of concerns is a key principle in software design. It involves breaking down complex systems into smaller, manageable parts to simplify complexity and enable easier maintenance.

:p What is the purpose of separating concerns in software design?
??x
The purpose of separating concerns in software design is to reduce artificial dependencies and make code more modular. By splitting functionality into well-defined pieces, it becomes easier to understand and manage different aspects of a system independently. This leads to better maintainability and adaptability.

```cpp
// Example of separation of concerns using function objects
class Engine {
public:
    void setFuelType(std::string type) { /* code */ }
};

void changeFuelType(Engine& engine, std::string newType) {
    engine.setFuelType(newType); // Separation of responsibility
}

int main() {
    Engine carEngine;
    changeFuelType(carEngine, "Diesel");
}
```
x??

---


#### Separation of Concerns - Orthogonality

In software development, separation of concerns is a design principle that emphasizes dividing a system into distinct components or modules. Each module should have one specific task or function. This concept has been termed "orthogonality" by the Pragmatic Programmers.

Background context: 
Orthogonality aims to reduce artificial dependencies between different parts of your codebase, making it more modular and easier to maintain. It is about grouping elements that belong together and keeping unrelated functionality separate.
:p What does orthogonality aim to achieve in software development?
??x
Orthogonality seeks to minimize the interdependencies between different modules or components by ensuring that each module handles a single responsibility, thereby making the system more modular and easier to maintain. 
x??

---

#### Cohesion

Cohesion is a measure of how strongly related elements within a module are.

Background context: 
Tom DeMarco defines cohesion as the strength of association among the elements in a software module. A highly cohesive module consists of elements that are closely related, making it easy to understand and maintain.
:p What does Tom DeMarco's definition of cohesion imply?
??x
Cohesion implies that a module should contain elements (functions, variables) that are strongly related to each other. Highly cohesive modules are easier to understand and maintain because their components perform similar or related tasks. 
x??

---

#### Single-Responsibility Principle (SRP)

The Single-Responsibility Principle states that a class should have only one reason to change.

Background context: 
In the SOLID principles, the SRP dictates that classes should be responsible for a single functionality and shouldn't take on additional responsibilities. This principle helps in reducing artificial dependencies and making code more maintainable.
:p According to the Single-Responsibility Principle (SRP), what does a class in good design practice do?
??x
According to the SRP, a class should have only one reason to change. In other words, each class should be responsible for a single functionality or feature. This ensures that modifying one aspect of the system doesn't affect unrelated parts.
x??

---

#### Example - Document Class

Consider the provided `Document` class as an example.

Background context: 
The `Document` class is designed to be a base class for various document types, such as PDF and Word documents. It has two pure virtual functions: `exportToJSON()` and `serialize()`.
:p What are the issues with the current implementation of the Document class?
??x
The current implementation of the Document class violates separation of concerns by grouping unrelated functionalities together. Both `exportToJSON()` and `serialize()` are methods that might change for different reasons, making the class less cohesive.

For instance:
- Changing how a document is serialized might not require changes to JSON export.
- Adding support for new formats (e.g., XML) could involve modifying both serialization and JSON export functionalities.

This artificial coupling makes the class harder to maintain and extend. 
x??

---

#### Refactored Document Class

To better separate concerns, consider refactoring the `Document` class.

Background context: 
We can create two separate classes for handling JSON exports and serialization, ensuring that each class handles a single responsibility.
:p How should we refactor the Document class to adhere to separation of concerns?
??x
To adhere to separation of concerns, we could create a new class named `JsonExporter` responsible solely for exporting documents in JSON format. Another class named `DocumentSerializer` can handle serialization.

```cpp
class JsonExporter {
public:
    virtual void exportToJson(const Document& doc) const = 0;
};

class DocumentSerializer {
public:
    virtual void serializeToBytes(const Document& doc, ByteStream& stream) const = 0;
};
```

By doing this, we ensure that each class has a single responsibility, making the system more modular and easier to maintain.
x??

---


#### Artificial Dependencies Introduction
Background context: The passage discusses how bundling data and functions within a base class can lead to artificial dependencies, making subsequent changes harder. Specifically, it mentions that implementing pure virtual member functions like `exportToJSON()` and `serialize()` introduces dependencies on third-party libraries.

:p How does the implementation of `exportToJSON()` in derived classes introduce an artificial dependency?
??x
The implementation of `exportToJSON()` as a pure virtual function requires derived classes to provide their own implementations. To avoid manual JSON export, derived classes are likely to rely on external libraries like json, rapidjson, or simdjson. This means that all deriving classes will depend on the chosen library, even if they don't directly use it.

```cpp
class Document {
public:
    virtual void exportToJSON() = 0; // Pure virtual function
};
```
x??

---

#### JSON Library Dependency
Background context: The `exportToJSON()` function introduces a dependency on a specific JSON library. This dependency can limit the reusability of the derived classes and cause issues if switching to another library.

:p What are the consequences of using an external JSON library in the `Document` class?
??x
Using an external JSON library like json, rapidjson, or simdjson for implementing `exportToJSON()` binds all deriving classes to this library. This can make the design less flexible and harder to modify because switching libraries would require updating all derived classes. The dependency might also limit the reusability of the class hierarchy.

```cpp
class JSONExporter {
    // JSON export implementation using external library
};

class MyDocument : public Document {
public:
    void exportToJSON() override {
        // Implementation using JSONExporter from an external library
    }
};
```
x??

---

#### Serialization Function Dependency
Background context: The `serialize()` function introduces another dependency on a third-party serialization library such as protobuf or Boost.serialization. This further complicates the design by coupling JSON export and serialization.

:p How does the `serialize()` function introduce an additional dependency?
??x
The `serialize()` function likely uses a third-party library like protobuf or Boost.serialization, which couples the document serialization process with this specific library. This can cause issues if there are changes in how documents need to be serialized because it may require changes to both the `serialize()` and possibly other parts of the codebase.

```cpp
class Serializer {
    // Serialization implementation using external library
};

class MyDocument : public Document {
public:
    void serialize() override {
        // Implementation using Serializer from an external library
    }
};
```
x??

---

#### Global Decision on Serialization
Background context: The `serialize()` function's implementation might rely on global decisions about how documents are serialized, which can lead to tighter coupling and harder maintenance.

:p How does the `serialize()` function's reliance on global serialization decisions affect the design?
??x
The `serialize()` function's dependency on a specific way of serializing documents introduces an artificial dependency. If there is a change in the global decision about how serialization works, all classes that rely on this function will need to be updated, leading to potential maintenance issues and coupling.

```cpp
class Serializer {
    // Global decisions on serialization implementation
};

class MyDocument : public Document {
public:
    void serialize() override {
        // Implementation using Serializer with current global settings
    }
};
```
x??

---

#### Coupling Between JSON Export and Serialization
Background context: The introduction of `exportToJSON()` and `serialize()` functions can lead to coupling between these unrelated aspects, making changes in one aspect potentially affect the other.

:p What is the risk when both `exportToJSON()` and `serialize()` depend on external libraries?
??x
Both `exportToJSON()` and `serialize()` relying on different third-party libraries (like JSON and serialization) can create a tight coupling between these two unrelated aspects of the design. Changes in one aspect might necessitate changes in the other, leading to maintenance difficulties and potential bugs.

```cpp
class Document {
public:
    virtual void exportToJSON() = 0;
    virtual void serialize() = 0; // Might depend on different libraries
};

class MyDocument : public Document {
public:
    void exportToJSON() override {
        // Implementation using external JSON library
    }

    void serialize() override {
        // Implementation using external serialization library
    }
};
```
x??

---

#### Summary of Artifical Dependencies
Background context: The passage explains how bundling data and functions in a base class like `Document` can lead to artificial dependencies, making the design less flexible and harder to maintain.

:p What are the key issues with the `Document` class design as described?
??x
The key issues include:
1. **Artificial Dependencies:** Implementing pure virtual member functions like `exportToJSON()` and `serialize()` requires external libraries (e.g., JSON, serialization), binding derived classes to these libraries.
2. **Limited Reusability:** Switching from one library to another would require extensive changes in all derived classes.
3. **Tight Coupling:** Changes in how documents are exported or serialized can affect the design and implementation of both aspects.

The design is overly coupled and less flexible, making it harder to maintain and adapt to changing requirements.

x??

---


#### Byte Order Format
Background context explaining byte order and its significance. Big endian and little endian are two common byte order formats used in computer systems for storing multi-byte data types like integers or floating-point numbers.

Big-endian stores the most significant byte first, while little-endian stores it last.
:p What is big-endian and little-endian byte order?
??x
Big-endian stores the most significant byte at the lowest memory address. In contrast, little-endian stores the least significant byte at the lowest memory address.

For example:
- Big-endian: 0x12345678 (stored as `12 34 56 78`)
- Little-endian: 0x12345678 (stored as `78 56 34 12`)

This is important in cross-platform communication and file format handling.
x??

---

#### Document Type Representation
Background context on the need for representing different document types. Enumerations are a common way to represent specific values.

:p How can we represent document types using an enumeration?
??x
Using an enumeration, we can define a set of named constants that represent various document types. For example:

```cpp
enum class DocumentType {
    pdf,
    word,
    excel,
    // More document types can be added here
};
```

This allows for type-safe and explicit representation without the need for magic numbers or string literals.
x??

---

#### Coupling in the Document Class Design
Background context on coupling and its impact on software maintainability. The Single Responsibility Principle (SRP) states that a class should have only one reason to change.

:p What is an issue with the current design of the `Document` class?
??x
The current design of the `Document` class promotes tight coupling between different document types, making it hard to add or modify functionalities without affecting multiple classes. This violates the Single Responsibility Principle (SRP), as changes in one area can impact several unrelated aspects.

For example:
- Changes in JSON library implementation might require modifications across all documents.
- Adding a new document type could affect how `Document` interacts with `ByteStream`.
x??

---

#### Change Impact on Document Class
Background context explaining the consequences of tight coupling and the importance of loose coupling for maintainability. Highlighting that changes should not ripple through unrelated parts of the codebase.

:p How does adding a new document type impact existing functionalities?
??x
Adding a new `Document` type can have wide-ranging effects due to the strong dependencies within the current design:
- The implementation details of `exportToJSON()` might change, requiring updates.
- Changes in the `serialize()` function could cascade through multiple document types.
- Adding a new `DocumentType` enum value would force all derived classes and users of documents to adapt.

This tight coupling makes changes more complex and error-prone. For example:
```cpp
class PDFDocument : public Document {
public:
    void exportToJSON() override { /* Implementation */ }
    void serialize(ByteStream& stream) override { /* Implementation */ }
};
```
Adding a new `ExcelDocument` class might require modifications in both `exportToJSON()` and `serialize()`, which can be cumbersome.
x??

---

#### Summary of Design Flaws
Background context summarizing the key design flaws identified, emphasizing the importance of loose coupling and adherence to SRP.

:p What are some reasons why the current design is flawed?
??x
The current design is flawed because it promotes tight coupling between different components. This makes changes difficult and error-prone:

1. **Implementation Details Dependency**: Changes in underlying libraries or implementations can ripple through multiple parts of the codebase.
2. **Direct Dependencies on Enumerations**: Adding a new document type affects how other documents interact with core functionalities like serialization.
3. **SRP Violation**: The `Document` class takes on too many responsibilities, making it hard to change without affecting unrelated aspects.

This tight coupling makes the design inflexible and harder to maintain. A more modular approach would be preferable.
x??

---


#### Logical Versus Physical Coupling
Logical coupling refers to dependencies between classes that depend on each other's internal implementation details. Physical coupling, on the other hand, involves direct or indirect dependencies through physical elements such as header files or library imports.

:p What is the difference between logical and physical coupling?
??x
Logical coupling pertains to the way code interacts based on the structure and design of classes, while physical coupling deals with actual code dependencies like headers, libraries, and file inclusions. Logical coupling can be managed through design patterns and interfaces, whereas physical coupling often arises due to direct imports or function calls.

For example:
```cpp
// High logical coupling (bad)
class Document {
public:
    void exportToJSON() { /* complex implementation */ }
};

// Low logical coupling (good)
class Document {
public:
    virtual void serialize() = 0;
};
```
x??

---

#### Artificial Coupling in Documents
Artificial coupling occurs when orthogonal aspects like JSON serialization are coupled directly within the document class, making changes difficult and increasing maintenance risks.

:p What is artificial coupling in the context of documents?
??x
Artificial coupling happens when non-core functionalities such as JSON serialization or specific byte stream handling are integrated into a document class. This can lead to complexity increases during modifications because these orthogonal aspects may affect multiple parts of the codebase, not just one class. For instance:
```cpp
// Artificial coupling example
class Document {
public:
    void exportToJSON() { /* uses JSON library directly */ }
};
```
In contrast, proper abstraction would separate such concerns into variation points.
x??

---

#### High Level vs Low Level in Architecture
High-level architecture refers to stable parts of the system that are less likely to change, while low-level architecture includes more volatile or frequently changing aspects.

:p How do you define high-level and low-level architecture?
??x
High-level architecture involves components that are considered stable and less prone to frequent changes. These typically represent core functionalities that form the backbone of the application. Low-level architecture includes parts that are more likely to change, such as implementation details or external dependencies.
For instance:
```cpp
// High-level (stable)
class User {
public:
    void processDocument(Document& doc) { /* high-level logic */ }
};

// Low-level (volatile)
class Document {
public:
    void serialize() { /* complex serialization logic */ }
};
```
x??

---

#### Separation of Concerns (SRP)
The Single Responsibility Principle (SRP) advises that classes should have only one reason to change, meaning their responsibilities should be separated.

:p What is the Single Responsibility Principle (SRP)?
??x
The SRP states that a class should have only one reason to change. This means each class should encapsulate a single responsibility or concern. By separating concerns into variation points, changes can be isolated and made easier.
For example:
```cpp
// Before SRP refactoring
class Document {
public:
    void exportToJSON() { /* complex logic */ }
    void serialize() { /* complex logic */ }
};

// After SRP refactoring
class Document {
public:
    virtual void basicDocumentOperations() = 0;
};

class JSONComponent {
public:
    void exportToJSON(Document& doc) { /* simplified JSON serialization */ }
};
```
x??

---

#### Variation Points and Components
Variation points are identified aspects in the code that change for different reasons. They should be extracted, isolated, and wrapped to avoid dependencies.

:p What are variation points and why are they important?
??x
Variation points are specific areas of the code where changes are expected due to varying requirements or external factors. By identifying these points and isolating them into separate components, you can make your software more flexible and easier to maintain.
For example:
```cpp
// Before isolation
class Document {
public:
    void exportToJSON() { /* complex logic */ }
};

// After refactoring with a variation point
class JSONComponent {
public:
    virtual void serialize(Document& doc) = 0;
};

class DefaultJSON : public JSONComponent {
public:
    void serialize(Document& doc) override { /* simplified serialization */ }
};
```
x??

---

#### Refactoring Document Class
Refactoring the document class to remove orthogonal aspects like JSON and serialization, making it a simple container for basic operations.

:p How should the Document class be refactored according to SRP?
??x
The Document class should focus on its core functionalities, leaving orthogonal concerns like JSON and serialization in separate components. This reduces coupling and simplifies changes.
For example:
```cpp
// Before refactoring
class Document {
public:
    void exportToJSON() { /* complex logic */ }
};

// After refactoring
class Document {
public:
    virtual ~Document() = default; // Only basic operations remain

private:
    void basicOperations() { /* simplified logic */ }
};
```
x??

---

