# High-Quality Flashcards: 10A005---C-Software-Design---Klaus-Iglberger_processed (Part 28)

**Rating threshold:** >= 8/10

**Starting Chapter:** Performance Benchmarks

---

**Rating: 8/10**

#### Equality Comparison and Performance Considerations
Background context: The text discusses the challenges of equality comparison using type erasure, noting that while it is sometimes possible, it can be difficult or expensive to implement. It also mentions that returning to `std::function` would introduce performance penalties.

:p What are the main issues with implementing equality comparison for type-erased objects?
??x
The main issues include the complexity and cost of ensuring correct behavior during equality comparisons. Type erasure inherently abstracts away the underlying types, making it difficult to compare instances effectively without additional overhead or loss in performance when using `std::function`.

```cpp
// Example pseudocode for attempting type-erased equality comparison (not recommended)
template <typename T>
class Value {
public:
    bool operator==(const Value& other) const;
};

Value<int> v1 = 5;
Value<double> v2 = 5.0;

bool areEqual = v1 == v2; // Likely to fail or have performance issues
```
x??

---

#### Interface Segregation Principle and Type Erasure
Background context: The text discusses how type erasure can still adhere to the Interface Segregation Principle (ISP), which suggests that no client should be forced to depend on methods it does not use. It provides an example of how multiple abstractions can be created from a single type-erased object.

:p How does Type Erasure help in adhering to the Interface Segregation Principle?
??x
Type Erasure helps adhere to the ISP by allowing the creation of separate, more focused interfaces for different functionalities. For instance, you can create `JSONExportable` and `Serializable` abstractions from a single `Document` type-erased object.

```cpp
class Document {
public:
    void exportToJSON(/*...*/);
    void serialize(ByteStream& bs, /*...*/);
};

// Creating separate interfaces
JSONExportable jdoc = doc;
jdoc.exportToJSON(/* pass necessary arguments */);

Serializable sdoc = doc;
sdoc.serialize(/* pass necessary arguments */);
```
x??

---

#### Performance Benchmarks for Type Erasure
Background context: The text includes performance benchmarks comparing various implementations, including type erasure. It highlights that type erasure provides better performance while maintaining strong decoupling.

:p What are the key findings from the performance benchmark of Type Erasure?
??x
The key findings show that type erasure performs between 6% and 20% better than other strategy implementations like `std::function`, manual implementation, classic Strategy pattern, and even the object-oriented solution. It is noted to be faster in both GCC 11.1 and Clang 11.1 with optimization flags.

```cpp
// Performance benchmark results (example)
#include <iostream>

int main() {
    // Simulated performance test for type erasure
    auto start = std::chrono::high_resolution_clock::now();

    // Code to perform operations using type-erased objects

    auto end = std::chrono::high_resolution_clock::now();
    std::chrono::duration<double> elapsed = end - start;
    std::cout << "Elapsed time: " << elapsed.count() << " seconds" << std::endl;

    return 0;
}
```
x??

---

#### Decoupling Through Type Erasure
Background context: The text emphasizes the benefits of type erasure in terms of decoupling. It states that while it introduces some complexity, the advantages of strong decoupling and performance outweigh these drawbacks.

:p What are the main benefits of using type erasure for design?
??x
The main benefits include significant decoupling between components, leading to easier maintenance and extension of software. Type Erasure allows you to separate concerns more effectively by creating multiple abstractions from a single type-erased object, adhering to principles like ISP while providing better performance than other approaches.

```cpp
// Example of using type erasure in design
class Document {
    // ... implementation details ...
};

// Different interfaces for different functionalities
JSONExportable jdoc = doc;
jdoc.exportToJSON(/* pass necessary arguments */);

Serializable sdoc = doc;
sdoc.serialize(/* pass necessary arguments */);
```
x??

---

#### Artificial Coupling and Type Erasure
Background context: The text mentions an example of artificial coupling in the use of type-erased objects, where operations that should be separate are coupled together.

:p What is an example of artificial coupling in type-erased objects?
??x
An example of artificial coupling occurs when a type-erased object contains methods for unrelated functionalities. For instance, if `Document` includes both `exportToJSON` and `serialize`, which could logically belong to separate interfaces (`JSONExportable` and `Serializable`), but are bundled together in the same class.

```cpp
// Example of artificial coupling
class Document {
public:
    void exportToJSON(/*...*/);
    void serialize(ByteStream& bs, /*...*/);
};

void exportDocument(const Document& doc) {
    // ... code to export document ...
    doc.exportToJSON(/* pass necessary arguments */);  // Artificial coupling
}
```
x??

---

#### Setup Costs of Owning Type Erasure Wrappers
Background context: The text hints at the setup costs associated with managing type-erased wrappers, including potential complexity and limitations.

:p What are the setup costs associated with owning type-erased wrappers?
??x
Setup costs include the initial overhead in defining and maintaining multiple abstractions for a single type-erased object. These wrappers can introduce additional complexity and require careful management to ensure correct behavior during operations like equality comparison or method invocation.

```cpp
// Example of managing type-erased wrappers
JSONExportable jdoc = doc;
Serializable sdoc = doc;

jdoc.exportToJSON(/* pass necessary arguments */);
sdoc.serialize(/* pass necessary arguments */);
```
x??

**Rating: 8/10**

#### Type Erasure Overview
Type erasure is a technique used in C++ to achieve runtime polymorphism without using virtual functions. It involves creating a type-erased wrapper that hides specific types, allowing for more loosely coupled and efficient code.

:p What is type erasure?
??x
Type erasure is an approach that allows you to decouple a set of types from their associated operations by hiding the concrete types behind a common interface or base class. This technique enables the addition of new types without changing existing operations, providing a more flexible design.

This can be achieved using techniques like external polymorphism, where you define a common interface and use type-erased wrappers to handle different underlying types. Another way is through the prototype pattern, which allows for cloning objects while hiding their specific implementations.
??x

---

#### Language Support for Type Erasure
Many developers advocate for adding language support for type erasure directly into C++. This would simplify implementation and make it more robust.

:p Why should type erasure be a language feature?
??x
Adding type erasure as a language feature could significantly improve the design patterns used in C++ by providing built-in support for creating type-erased wrappers and managing type information. This would reduce boilerplate code, making the implementation of type-erased designs cleaner and more maintainable.

For example, with direct language support, you might have syntax like this:
```cpp
auto wrapper = makeTypeErased<MyInterface>(std::make_unique<ConcreteImplementation>());
```
This would automatically generate a type-erased wrapper that hides the concrete implementation details.
??x

---

#### Misuse of Type Erasure Terminology
The term "type erasure" has been misused and abused in various contexts, leading to confusion.

:p How is type erasure incorrectly used?
??x
Type erasure is sometimes incorrectly used to refer to techniques like using `void*` pointers or inheritance hierarchies. Additionally, it can be confused with the Visitor pattern and `std::variant`.

For instance, a void* pointer might not truly hide the underlying type information; it merely changes its visibility. Similarly, an inheritance hierarchy or a pointer-to-base does not provide true decoupling of types from operations.

Moreover, `std::variant` is often incorrectly referred to as type erasure because it reveals all possible alternatives through template arguments, which means you are still dependent on these types.
??x

---

#### Guidelines for Using Type Erasure
Using the term "type erasure" should be specific to its design pattern intent.

:p What guidelines should one follow when using type erasure?
??x
To ensure clarity and avoid confusion, use the term "type erasure" only in contexts where it truly represents decoupling from concrete types. Consider replacing inheritance hierarchies with type erasure when you need a value-based, non-intrusive abstraction for an extendable set of unrelated, potentially non-polymorphic types.

For example:
```cpp
// Applying Type Erasure
std::vector<TypeErasedObject> objects = {makeTypeErased<MyType1>(), makeTypeErased<MyType2>()};
```
This code creates a vector of type-erased objects that can handle different underlying types without modification.
??x

---

#### Optimization Potential of Type Erasure
While powerful, type erasure also has optimization potential.

:p What is the significance of optimizing type erasure?
??x
Optimizing type erasure involves leveraging its features to improve performance. Since type-erased objects often use template metaprogramming and runtime dispatch, careful consideration must be given to ensure that the overhead is minimized.

For instance, you might optimize by:
1. Using `std::variant` for known types instead of dynamic polymorphism.
2. Employing cache-friendly data structures in your type-erased wrappers.
3. Ensuring efficient clone operations if using a prototype pattern.

By optimizing these aspects, you can maintain the benefits of type erasure while reducing potential performance bottlenecks.
??x

---

**Rating: 8/10**

#### Small Buffer Optimization (SBO)
Background context: One of the primary concerns when optimizing performance is to minimize memory allocations, which can be very slow and nondeterministic. In the case of type erasure, a common implementation involves dynamic memory allocation through `std::make_unique()`. However, this approach can significantly impact performance, especially for small objects.

Small Buffer Optimization (SBO) allows us to avoid dynamic memory allocation by storing smaller objects directly within the wrapper class itself. This reduces the overhead associated with heap allocations and improves overall execution speed.

:p How does Small Buffer Optimization help in optimizing type erasure?
??x
Small Buffer Optimization helps by allowing small objects to be stored directly within the wrapper class, thereby avoiding dynamic memory allocation through `std::make_unique()`. This approach minimizes the overhead of heap allocations, which can be slow and nondeterministic. By storing smaller objects inline, performance is significantly improved.

For example, consider a type-erased shape where we have small shapes like circles or triangles:
```cpp
struct SmallShape {
    double data[10]; // Inline storage for small objects

    template <typename T>
    void erase(T&& value) {
        // Erase and store the value directly in the buffer
    }
};
```
x??

---

#### Dynamic Memory Allocation with Type Erasure
Background context: In the initial implementation of type erasure, dynamic memory allocation was performed unconditionally using `std::make_unique()`, which could be inefficient for small objects. This approach can lead to unnecessary overhead and slower performance.

:p Why is dynamic memory allocation a concern in the context of type erasure?
??x
Dynamic memory allocation can be a significant bottleneck in type erasure, especially when dealing with small objects. Unconditional use of `std::make_unique()` for all types can result in excessive heap allocations, which are generally slower and more resource-intensive than stack allocations.

For example:
```cpp
struct BasicTypeEraser {
    void* data;

    template <typename T>
    BasicTypeEraser(T&& value) : data(std::make_unique<T>(std::forward<T>(value)).release()) {}

    // Other methods for managing the erased type
};
```
This approach can be inefficient because it always performs a heap allocation, regardless of the object size. For small objects, this can lead to significant overhead and decreased performance.

x??

---

#### In-Class Memory Management with Type Erasure
Background context: Another strategy to optimize memory usage in type erasure is to manage memory within the class itself rather than relying on dynamic memory allocation. This approach allows for more control over object sizes and reduces the need for heap allocations.

:p How can we use in-class memory management in type erasure?
??x
In-class memory management involves storing objects directly within the wrapper class, thereby eliminating the need for dynamic memory allocation. This is particularly useful for small objects where stack allocation would be more efficient than heap allocation.

For example:
```cpp
struct InClassTypeEraser {
    union {
        char buffer[1024]; // Buffer to store small objects inline
        void* data;       // Pointer to dynamically allocated memory (if needed)
    };

    template <typename T>
    void erase(T&& value) {
        if (sizeof(T) <= sizeof(buffer)) {
            new (buffer) T(std::forward<T>(value));
            data = buffer;
        } else {
            data = std::make_unique<T>(std::forward<T>(value)).release();
        }
    }

    // Destructor to properly clean up resources
};
```
This approach provides flexibility, allowing the wrapper class to manage memory both inline and dynamically based on the size of the object.

x??

---

**Rating: 8/10**

#### OwningModel and Placement New
Background context: The text discusses manually creating an `OwningModel` within a byte buffer using `std::construct_at()` or placement new. This requires the user to explicitly call the destructor for proper memory management.

:p How is an `OwningModel` created and destructed in this scenario?
??x
In this scenario, `OwningModel` is created by manually calling `std::construct_at()` or using a placement new within a byte buffer. For destruction, you must explicitly call the destructor for the constructed object.

Example:
```cpp
using Model = OwningModel<ShapeT, DrawStrategy>;
// Create model in place
std::construct_at(static_cast<Model*>(pimpl()), std::move(shape), std::move(drawer));

// Later, when destructing
std::destroy_at(static_cast<Model*>(pimpl()));
```

To use a placement new:
```cpp
auto* ptr = static_cast<void*>(pimpl());
new (ptr) Model(std::move(shape), std::move(drawer));
// Destructor call is required later
ptr->~Model();
```
x??

---

#### Static Buffer Optimization (SBO)
Background context: The text mentions using `std::construct_at()` to create objects in a static buffer (`pimpl`) without dynamic memory allocation, adhering to size and alignment constraints.

:p What is the benefit of using SBO for object creation?
??x
Using SBO with `std::construct_at()` allows creating objects directly within a static buffer without requiring dynamic memory allocations. This reduces overhead from heap allocation and improves performance by minimizing fragmentation and improving cache utilization.

Example:
```cpp
template <size_t Capacity = 32U, size_t Alignment = alignof(void*)>
class Shape {
public:
    template <typename ShapeT, typename DrawStrategy>
    Shape(ShapeT shape, DrawStrategy drawer) {
        using Model = OwningModel<ShapeT, DrawStrategy>;
        
        static_assert(sizeof(Model) <= Capacity, "Given type is too large");
        static_assert(alignof(Model) <= Alignment, "Given type is misaligned");

        std::construct_at(static_cast<Model*>(pimpl()), std::move(shape), std::move(drawer));
    }
private:
    // Implementation of pimpl
};
```

x??

---

#### Performance Benchmark Comparison
Background context: The text provides a performance comparison between different implementations, showing the benefits of using SBO for `Shape`.

:p What were the performance results for the SBO implementation?
??x
The SBO implementation showed impressive performance. Here are the results:

| Compiler  | Time (s) |
|-----------|---------|
| GCC       | 1.3591  |
| Clang     | 1.0348  |

This is approximately 20% faster than the fastest Strategy implementation and even outperforms the object-oriented solution.

Example:
```cpp
// Performance results table
```

x??

---

#### Flexibility vs. Performance Trade-offs
Background context: The text discusses the trade-off between flexibility and performance when using SBO. While it offers better performance, it limits the size of objects that can be stored due to capacity constraints.

:p What is a limitation of the current implementation regarding object sizes?
??x
A limitation of the current implementation is that only `OwningModel` instantiations smaller or equal to the specified `Capacity` can be stored inside `Shape`. Larger models are excluded, which limits flexibility in terms of what objects can be stored.

Example:
```cpp
// Capacity check for OwningModel
static_assert(sizeof(Model) <= Capacity, "Given type is too large");
```

x??

---

#### Hybrid Memory Allocation Strategy
Background context: The text suggests switching between class-internal buffer and dynamic memory allocation based on the size of the object. Small objects are stored internally, while larger ones are allocated dynamically.

:p How can we adapt the implementation to use both in-class and dynamic memory?
??x
To adapt the `Shape` implementation to use both in-class buffers and dynamic memory, you would need to:

1. Determine a threshold for when to switch from in-class buffer allocation.
2. Use placement new or `std::construct_at()` within an in-class buffer for small objects.
3. Allocate memory dynamically for larger objects.

Example:
```cpp
template <size_t Capacity = 32U, size_t Alignment = alignof(void*)>
class Shape {
public:
    template <typename ShapeT, typename DrawStrategy>
    Shape(ShapeT shape, DrawStrategy drawer) {
        using Model = OwningModel<ShapeT, DrawStrategy>;

        // Determine if the object fits in an in-class buffer
        static_assert(sizeof(Model) <= Capacity, "Given type is too large");
        static_assert(alignof(Model) <= Alignment, "Given type is misaligned");

        // In-class allocation check
        if (sizeof(Model) <= Capacity && alignof(Model) <= Alignment) {
            std::construct_at(static_cast<Model*>(pimpl()), std::move(shape), std::move(drawer));
        } else {
            // Dynamic memory allocation for larger objects
            auto* ptr = ::operator new(sizeof(Model));
            new (ptr) Model(std::move(shape), std::move(drawer));
            // Use the allocated memory
            this->setPimpl(ptr);
        }
    }

private:
    void* pimpl() {
        // Implementation to return in-class buffer or dynamically allocated memory
    }
};
```

x??

**Rating: 8/10**

#### Separation of Concerns and Policy-Based Design

In this context, we discuss a design principle called separation of concerns. This is crucial for maintaining flexibility and adhering to principles like Single Responsibility Principle (SRP) and Open/Closed Principle (OCP). The core idea is to separate the logic and functionality from how certain aspects are implemented.

The example uses template metaprogramming in C++ to achieve this by introducing a `Shape` class that can be instantiated with different storage policies. This allows the user to dictate how memory for objects of type `ShapeT` should be managed.

:p What is the main design principle discussed, and why is it important?
??x
The main design principle discussed is separation of concerns (SoC), which is important because it keeps the logic and functionality separate from implementation details. This makes the code more flexible and adheres to principles like SRP and OCP.
x??

---

#### DynamicStorage Policy

A `DynamicStorage` policy class is provided as an example for dynamically allocating memory using the `new` operator. The template functions `create` and `destroy` are used to manage object lifetimes.

:p What does the `DynamicStorage` policy do, and how is it implemented?
??x
The `DynamicStorage` policy manages dynamic memory allocation and deallocation. It has two main functions: `create`, which dynamically allocates an object of type `T`, and `destroy`, which deletes a pointer to an object.

Here's the implementation:
```cpp
struct DynamicStorage {
    template<typename T, typename... Args>
    T* create(Args&&... args) const {
        return new T(std::forward<Args>(args)...);
    }

    template<typename T>
    void destroy(T* ptr) const noexcept {
        delete ptr;
    }
};
```

This class provides a simple way to manage object creation and destruction using dynamic memory allocation.
x??

---

#### InClassStorage Policy

An `InClassStorage` policy is introduced, which manages storage within the same class (in-class storage). This can be useful when you need to store objects within a fixed buffer. The template functions `create` and `destroy` ensure that the object fits into the provided buffer.

:p What does the `InClassStorage` policy do, and how is it implemented?
??x
The `InClassStorage` policy manages in-class storage by allocating memory for an object within the same class's buffer. It ensures the object fits into the buffer by checking the size and alignment requirements. The template functions `create` and `destroy` are used to manage object lifetimes.

Here is the implementation:
```cpp
template<size_t Capacity, size_t Alignment>
struct InClassStorage {
    template<typename T, typename... Args>
    T* create(Args&&... args) const {
        static_assert(sizeof(T) <= Capacity, "The given type is too large");
        static_assert(alignof(T) <= Alignment, "The given type is misaligned");

        T* memory = const_cast<T*>(reinterpret_cast<const T*>(buffer_.data()));
        return std::construct_at(memory, std::forward<Args>(args)...);
    }

    template<typename T>
    void destroy(T* ptr) const noexcept {
        std::destroy_at(ptr);
    }

    alignas(Alignment) std::array<std::byte, Capacity> buffer_;
};
```

This class ensures that the object fits within a fixed-size buffer and manages its construction and destruction.
x??

---

#### Shape Class Template

The `Shape` class template is designed to accept different storage policies. It uses these policies to manage memory for objects of type `ShapeT`. The class template provides a clean interface for instantiation and cleanup.

:p How does the `Shape` class template work with storage policies?
??x
The `Shape` class template works by accepting a `StoragePolicy` as a template parameter. This allows different storage mechanisms to be used, such as dynamic or in-class storage. The class uses the policy's `create` and `destroy` functions to manage object lifetimes.

Here is an example of how it might look:
```cpp
template<typename StoragePolicy>
class Shape {
public:
    template<typename ShapeT>
    Shape(ShapeT shape) {
        using Model = OwningModel<ShapeT>;
        pimpl_ = policy_.template create<Model>(std::move(shape));
    }

    ~Shape() { policy_.destroy(pimpl_); }

private:
    [[no_unique_address]] StoragePolicy policy_{};
    Concept* pimpl_{};
};
```

This template allows flexible memory management and adheres to SRP and OCP by separating concerns.
x??

---

#### Small-Object Optimization (SBO)

The text mentions that Small-Object Optimization (SBO) is an effective optimization for type erasure implementations, especially when using policies like `InClassStorage`. It reduces overhead by storing objects directly within the class rather than dynamically allocating them.

:p What is SBO and why is it important in this context?
??x
Small-Object Optimization (SBO) is a technique that optimizes memory management by storing small objects directly within the class instead of using dynamic memory allocation. This can reduce overhead, especially for small objects.

In the provided context, SBO is used with `InClassStorage` to store objects directly in a fixed buffer. The compiler can omit the space reserved for the storage policy data member if it's empty, reducing memory usage and improving performance.

The key benefit of SBO is that it reduces allocation/deallocation overhead, which can be significant for small objects.
x??

---

#### Standard Library Optimization

The text notes that while C++ standard library types like `std::function` and `std::any` might use SBO, the C++ Standard Library specification does not require its use. This means developers should hope for but not rely on SBO being used.

:p Why is there no guarantee of SBO usage in the C++ Standard Library?
??x
There is no guarantee of Small-Object Optimization (SBO) usage in the C++ Standard Library because the standard library specification does not mandate its use. Developers can hope that it will be used for performance benefits, but they cannot rely on this behavior.

The lack of a requirement means that the implementation details are left to compiler and library developers, which can lead to variations in behavior across different systems.
x??

---

**Rating: 8/10**

#### Performance Optimization of Virtual Functions
Virtual functions introduce a performance overhead due to indirection through virtual function tables and vptrs. A virtual function call typically involves two indirections: one via the vptr, and another to fetch the actual function pointer from the table.

This can be costly compared to regular non-virtual function calls, which are direct and involve no such indirections.

:p How does a typical virtual function call work in C++?
??x
In a typical virtual function call, the process involves:

1. Accessing the vptr (virtual pointer) of an object.
2. Using the vptr to fetch the address of the virtual table associated with that type.
3. Finding the corresponding function pointer within the virtual table.
4. Calling the function using the obtained function pointer.

This means a virtual function call involves two levels of indirection, making it slower than regular function calls. Here is an example in pseudocode:
```cpp
// Example in Pseudocode
Function CallVirtualFunction(Object obj) {
    // Step 1: Access vptr via object
    VTable *vtable = (VTable *)*(Object.vptr);
    
    // Step 2: Fetch the function pointer from the virtual table
    void (*func_ptr)(void) = (void(*)(void))vtable[FunctionIndex];
    
    // Step 3: Call the function using the obtained function pointer
    func_ptr();
}
```
x??

---

#### Virtual Function Table and Indirections
Virtual functions use a virtual function table (vftable) to manage polymorphism. Each type with at least one virtual function has its own vftable, stored in every object of that type via an additional hidden data member called the vptr.

The vptr contains the address of the vftable for the specific type of the object, allowing dynamic dispatch through a series of indirections.

:p What is the role of vptr and virtual function tables in managing polymorphism?
??x
The vptr (virtual pointer) acts as an index to the appropriate vftable within each instance of a class that contains at least one virtual function. The vftable stores pointers to all the virtual functions defined for the type.

When you call a virtual function, here's what happens:
1. The vptr is accessed.
2. It points to the vftable specific to the object's type.
3. From the vftable, the actual function pointer corresponding to the called virtual function is fetched.
4. Finally, that function pointer is used to call the function.

This process involves two indirections: one via the vptr and another within the vftable itself:
```cpp
// Example in Pseudocode
Function CallVirtualFunction(Object obj) {
    VTable *vtable = (VTable *)*(Object.vptr); // Indirect through vptr to get vftable
    void (*func_ptr)(void) = (void(*)(void))vtable[FunctionIndex]; // Indirect again to get function pointer from the table
    func_ptr(); // Call the function using the obtained function pointer
}
```
x??

---

#### Trade Space for Speed in Virtual Dispatch
One way to reduce the performance overhead of virtual functions is by manually implementing dispatch, trading space for speed. This involves storing all virtual function pointers directly within the class.

By doing so, we avoid the need for vptr and virtual tables, reducing the number of indirections required during a call.

:p How can you optimize virtual function calls to reduce performance overhead?
??x
To optimize virtual function calls, you can manually implement dispatch by storing all virtual function pointers directly within the class. This approach reduces the number of indirections from two (one via vptr and one in the table) to just one.

Here’s how it works:
1. Store each virtual function pointer directly as a member variable.
2. Directly call these stored pointers when needed, bypassing the need for vptr or virtual tables.

For example, if you have a `Shape` class with several virtual functions, you can store their addresses and use them directly:
```cpp
class Shape {
public:
    void (*draw_)(void*);  // Pointer to draw function

private:
    // Other members...
};
```
In this setup, calling the `draw` function would be a direct call without needing to go through vptr and virtual tables.

```cpp
// Example in C++
Shape shape;
// Set up pointers to actual functions
shape.draw_ = &DrawSquare;

void DrawSquare(void* obj) {
    // Drawing logic for square
}
```
x??

---

#### Implementation Details of OwningModel Template
The `OwningModel` template is used as storage for a specific kind of shape and a drawing strategy. This reduces the external hierarchy to just this single class, which stores both the shape instance and its drawing strategy.

It removes the need for virtual inheritance or polymorphic behavior within the `Shape` class itself by using templates and raw pointers.

:p What is the purpose of the `OwningModel` template in this context?
??x
The `OwningModel` template serves as a storage mechanism for a specific kind of shape and its associated drawing strategy. It replaces the need for virtual inheritance or polymorphism within the `Shape` class itself by leveraging templates.

By using `OwningModel`, the system can handle different shapes with their respective drawing strategies without relying on virtual functions. This template-based approach allows for more explicit control over how shapes are stored and manipulated, providing a cleaner separation of concerns.

Here’s an example of how it might be used:
```cpp
template<typename ShapeT, typename DrawStrategy>
struct OwningModel {
    OwningModel(ShapeT value, DrawStrategy drawer)
        : shape_(std::move(value)), drawer_(std::move(drawer)) {}

    ShapeT shape_;
    DrawStrategy drawer_;

private:
    // Other members...
};
```
In this implementation, `OwningModel` can be instantiated with different types of shapes and drawing strategies, providing a flexible way to manage polymorphism without the overhead of virtual functions.

```cpp
// Example usage
Shape square;
DrawSquare draw_square{&square};

OwningModel<Shape, DrawStrategy> model(square, draw_square);
```
x??

---

