# High-Quality Flashcards: 10A005---C-Software-Design---Klaus-Iglberger_processed (Part 22)

**Rating threshold:** >= 8/10

**Starting Chapter:** The CRTP Design Pattern Explained

---

**Rating: 8/10**

#### CRTP Design Pattern Introduction
Background context: The CRTP (Curiously Recurring Template Pattern) is a design pattern used to create compile-time abstractions. It builds upon the concept of creating an abstraction via a base class but establishes this relationship at compile time rather than runtime using virtual functions.
:p What does CRTP stand for, and what problem does it solve?
??x
CRTP stands for Curiously Recurring Template Pattern. It solves the problem of defining a compile-time abstraction for a family of related types by creating a compile-time relationship between base and derived classes.
x??

---

#### Upgrading Base Class to Template
Background context: In CRTP, the DenseVector class is upgraded from a regular class to a template class. This allows the DenseVector class to be aware of its derived type at compile time.
:p How does upgrading the base class to a template help in CRTP?
??x
Upgrading the base class to a template allows the DenseVector class to know the actual type of its derived class during compilation. This is achieved by using the `Derived` template parameter, which represents the type of the derived class.
x??

---

#### Forward Declaration and Template Instantiation
Background context: CRTP uses an incomplete type (the declared but not fully defined class) as a template argument. This allows the derived class to be used in the base class's template instantiation before its full definition is seen by the compiler.
:p Why can `DynamicVector` use itself as a template argument for `DenseVector`?
??x
`DynamicVector` can use itself as a template argument for `DenseVector` because of forward declaration. The type `DynamicVector<T>` is declared but not fully defined, making it an incomplete type that is sufficient to instantiate the base class template. This allows the derived class to be used in the base class's template instantiation before its full definition.
x??

---

#### Accessing Derived Class Implementation
Background context: In CRTP, the DenseVector class can access and call the concrete implementation of methods in the derived class through a static_cast. The `size()` function is an example where this happens.
:p How does the `DenseVector` base class access the `size()` function in the derived class?
??x
The `DenseVector` base class accesses the `size()` function in the derived class by using a static_cast to convert itself into a reference to the derived class and then calling the `size()` function on that. This is not a recursive call but rather a call to the `size()` member function in the derived class.
x??

---

#### Example of CRTP Implementation
Background context: The example provided demonstrates how DenseVector and DynamicVector are implemented using CRTP.
:p Provide an example of implementing CRTP for `DenseVector` and `DynamicVector`.
??x
Here is an example implementation:

```cpp
//---- <DenseVector.h> ----------------
template<typename Derived>
struct DenseVector {
    // This method can call the size function in the derived class using static_cast.
    size_t size() const { return static_cast<const Derived&>(*this).size(); }
};

//---- <DynamicVector.h> ----------------
template<typename T>
class DynamicVector : public DenseVector<DynamicVector<T>> {
public:
    // ... other members ...
    size_t size() const;  // Implementation of the size function in derived class.
};
```
x??

---

#### CRTP Parameter Naming
Background context: The template parameter `Derived` is used to represent the type of the derived class. This naming helps communicate intent and makes the code more readable.
:p Why is it recommended to use `Derived` as the name for the template parameter in CRTP?
??x
Using `Derived` as the name for the template parameter in CRTP helps communicate intent by clearly indicating that this parameter represents the type of the derived class. This naming convention improves code readability and understanding, making it easier for others to comprehend the purpose of the template.
x??

---

**Rating: 8/10**

#### CRTP and Virtual Functions
Background context explaining that CRTP (Template Curiously Recurring Template Pattern) is a design pattern used to achieve compile-time polymorphism, avoiding virtual functions and their associated performance overhead. This allows for more efficient code without sacrificing flexibility.
:p Explain why the use of `static_cast` in CRTP base classes can be preferred over virtual functions?
??x
Using static_cast in CRTP base classes avoids the overhead of virtual function calls and can lead to better compile-time optimizations. Since the type is known at compile time, the compiler can inline the function calls without any performance penalty.
```cpp
// Example of a simple CRTP usage
template<typename Derived>
struct Base {
    void call() { static_cast<Derived*>(this)->doSomething(); }
};
```
x??

---

#### Destructors in CRTP
Background context explaining that destructors need to be properly defined to avoid issues like move semantics, which can be unwanted if the base class is empty. Core Guideline C.35 states that a base class destructor should either be public and virtual or protected and non-virtual.
:p How should the destructor be implemented in a CRTP base class?
??x
The destructor should be defined as a protected, non-virtual function to adhere to Core Guideline C.35:
```cpp
template<typename Derived>
struct DenseVector {
    ~DenseVector() = default; // Protected and non-virtual
};
```
This ensures that the compiler does not generate unnecessary move constructors or move assign operators.
x??

---

#### Derived Functions in CRTP
Background context explaining that `static_cast` should be minimized to improve code readability and maintainability. Using derived functions can help encapsulate the type conversion logic within the base class, making it cleaner.
:p Why are `derived()` member functions useful in a CRTP-based implementation?
??x
The `derived()` member functions allow for type-safe downcasting without repeatedly using static_cast throughout the base class methods. This improves code readability and adheres to the DRY (Don't Repeat Yourself) principle:
```cpp
template<typename Derived>
struct DenseVector {
    Derived& derived() { return static_cast<Derived&>(*this); }
    Derived const& derived() const { return static_cast<Derived const&>(*this); }
};
```
These functions can be used in other member functions to access the derived type's methods and members, making the code cleaner and less suspicious.
x??

---

#### Subscript Operators and Iterators
Background context explaining that CRTP base classes often need to provide common interface methods like subscript operators and iterators. However, these methods may require more complex return types based on the derived class implementation.
:p How should the `operator[]` and iterator functions be implemented in a CRTP-based DenseVector?
??x
These functions can be implemented using the `derived()` member functions to access the appropriate methods from the derived type:
```cpp
template<typename Derived>
struct DenseVector {
    Derived& derived() { return static_cast<Derived&>(*this); }
    Derived const& derived() const { return static_cast<Derived const&>(*this); }

    // Subscript operator
    typename Derived::value_type& operator[](size_t index) {
        return derived()[index];
    }
    typename Derived::const_value_type& operator[](size_t index) const {
        return derived()[index];
    }

    // Iterator functions
    typename Derived::iterator begin() { return derived().begin(); }
    typename Derived::const_iterator begin() const { return derived().begin(); }
    typename Derived::iterator end() { return derived().end(); }
    typename Derived::const_iterator end() const { return derived().end(); }
};
```
These implementations ensure type safety and allow the base class to forward calls to the derived type's implementation.
x??

---

**Rating: 8/10**

#### CRTP Incomplete Type Issue
Background context: The Curiously Recurring Template Pattern (CRTP) is a powerful technique in C++ for achieving compile-time polymorphism. However, it can lead to interesting issues when dealing with incomplete types.

The CRTP works by having a derived class inherit from a base template class that takes the derived type as a template parameter. This allows the derived class to use its own nested types (like `value_type`, `iterator`, etc.) in its implementation of functions and methods.

:p What is the issue encountered when trying to use derived class nested types within CRTP?
??x
The compiler complains about not finding the nested types, even though they are defined. This happens because the base class template is instantiated before the definition of the derived class, making the derived class an incomplete type at that point.

For example:
```cpp
template <typename Derived>
struct DenseVector {
    using value_type = typename Derived::value_type;  // Error here
};

class DynamicVector : public DenseVector<DynamicVector<int>> {
public:
    struct value_type { int data; };
};
```
x??

---
#### CRTP Compiler Errors
Background context: When attempting to use the nested types of a derived class in a base class template, you may encounter errors from the compiler indicating that the types are not defined. These errors can be confusing as the definitions exist but the type is still incomplete at the point of instantiation.

:p Why does Clang report an error about no `value_type` when using CRTP?
??x
Clang reports an error because it sees `DynamicVector<int>` before its complete definition, making it an incomplete type. At this stage, the compiler cannot know about the nested types like `value_type`.

Here is a simplified example:
```cpp
template <typename Derived>
struct DenseVector {
    using value_type = typename Derived::value_type;  // Error: no 'value_type'
};

class DynamicVector : public DenseVector<DynamicVector<int>> {
public:
    struct value_type { int data; };
};
```
x??

---
#### CRTP Workaround for Incomplete Types
Background context: To solve the issue of incomplete types when using CRTP, you can use `typedef` or `using` declarations to explicitly define these nested types in the base class. This way, the derived class can provide the necessary type definitions after its complete definition.

:p How can you work around the incomplete type issues in CRTP?
??x
You can define the nested types in the base class using `typedef` or `using`. Here is how it works:

```cpp
template <typename Derived>
struct DenseVector {
    // Explicitly define the nested types here
    typedef typename Derived::value_type value_type;
    typedef typename Derived::iterator iterator;
    typedef typename Derived::const_iterator const_iterator;

    value_type& operator[](size_t index) { return derived()[index]; }
    const value_type& operator[](size_t index) const { return derived()[index]; }

    iterator begin() { return derived().begin(); }
    const_iterator begin() const { return derived().begin(); }
    iterator end()   { return derived().end(); }
    const_iterator end() const { return derived().end(); }

private:
    Derived& derived() { return *static_cast<Derived*>(this); }
};

class DynamicVector : public DenseVector<DynamicVector<int>> {
public:
    struct value_type { int data; };
    typedef value_type value_type;  // Explicitly define the type
    typedef std::vector<int>::iterator iterator;
    typedef std::vector<int>::const_iterator const_iterator;

    iterator begin() override { return std::begin(data); }
    const_iterator begin() const { return std::begin(data); }
    iterator end() override { return std::end(data); }
    const_iterator end() const { return std::end(data); }

private:
    std::vector<int> data;
};
```
x??

---
#### CRTP Derived Class Member Function Call
Background context: Despite the derived class being an incomplete type during template instantiation, you can still call its member functions. This is because the function calls are resolved at runtime.

:p Why can you still call member functions of the derived class in a CRTP implementation?
??x
You can call member functions of the derived class because they are called with actual objects (not just types) and thus resolve to specific implementations at runtime, not at compile time. The issue is with type completeness during template instantiation.

Here’s an example where you can still call `DynamicVector`’s member functions:

```cpp
template <typename Derived>
struct DenseVector {
    // You can call derived class member functions here
    void print(Derived& vec) {
        for (size_t i = 0; i < vec.size(); ++i) {
            std::cout << vec[i] << " ";
        }
        std::cout << std::endl;
    }
};

class DynamicVector : public DenseVector<DynamicVector<int>> {
public:
    void add(int value) { data.push_back(value); }

private:
    std::vector<int> data;
};

int main() {
    DynamicVector dv;
    dv.add(10);
    dv.add(20);
    DenseVector<DynamicVector<int>>::print(dv);  // Calls the print function
    return 0;
}
```
x??

---

**Rating: 8/10**

#### Special Property of Class Templates
Background context: In C++, when using class templates, member functions are only instantiated on demand. This means they are created and compiled only when called, not at the time of template declaration.

:p Explain why this special property is important for the `DenseVector` implementation.
??x
This special property allows the derived classes to be defined after the base class template is declared. Since member functions are instantiated on demand, there is no need for complete definitions of derived classes during the compilation of the base class.

The derived class definition becomes available only when the member functions are called, thus avoiding issues related to incomplete types.
x??

---

#### Return Type Deduction
Background context: C++11 introduced return type deduction with `auto`, which allows automatically deducing the return type from the initializer. However, for more complex cases, using `decltype(auto)` ensures correct type inference.

:p How does `decltype(auto)` help in the implementation of the `DenseVector` class?
??x
Using `decltype(auto)` helps ensure that the return types are correctly inferred and match the exact type returned by the nested derived object. This is particularly useful when dealing with complex expressions or custom types, as it avoids potential issues with `auto`.

```cpp
template< typename Derived >
struct DenseVector {
    // ...

    decltype(auto) operator[]( size_t index )       { return derived()[index]; }
    decltype(auto) operator[]( size_t index ) const { return derived()[index]; }

    decltype(auto) begin()       { return derived().begin(); }
    decltype(auto) begin() const { return derived().begin(); }

    decltype(auto) end()         { return derived().end(); }
    decltype(auto) end()   const { return derived().end(); }
};
```

In this example, `decltype(auto)` ensures that the exact type returned by `derived()[index]`, `derived().begin()`, etc., is used as the return type of the subscript operator and member functions.
x??

---

#### Comparison Between auto and decltype(auto)
Background context: While `auto` can often be sufficient for simple types, there are cases where `decltype(auto)` provides more accurate type deduction. The main difference lies in how they handle complex expressions or user-defined types.

:p Why would using `auto` instead of `decltype(auto)` potentially cause issues?
??x
Using `auto` instead of `decltype(auto)` can lead to incorrect type inference, especially for complex expressions or when dealing with custom types that require specific return types. For instance, consider a derived class where the subscript operator returns by value rather than by reference.

If we use `auto`, it might infer a different (and possibly incorrect) type:
```cpp
template< typename Derived >
struct DenseVector {
    // ...

    auto&       operator[]( size_t index )       { return derived()[index]; }  // Potential issue if returning by value
    auto const& operator[]( size_t index ) const { return derived()[index]; }

    auto begin()       { return derived().begin(); }
    auto begin() const { return derived().begin(); }

    auto end()         { return derived().end(); }
    auto end()   const { return derived().end(); }
};
```

In contrast, `decltype(auto)` ensures that the exact type is deduced correctly:
```cpp
template< typename Derived >
struct DenseVector {
    // ...

    decltype(auto) operator[]( size_t index )       { return derived()[index]; }  // Correctly infers the type
    decltype(auto) operator[]( size_t index ) const { return derived()[index]; }

    decltype(auto) begin()       { return derived().begin(); }
    decltype(auto) begin() const { return derived().begin(); }

    decltype(auto) end()         { return derived().end(); }
    decltype(auto) end()   const { return derived().end(); }
};
```

Using `decltype(auto)` ensures that the type is correctly inferred and matches the exact type returned by the nested operations.
x??

---

**Rating: 8/10**

#### ZeroVector Class Implementation
Background context explaining how a ZeroVector class could be implemented. It should not store elements but return zero by value when accessed, making it efficient.
:p How would you implement the `ZeroVector` class to efficiently represent the zero vector?
??x
The implementation of `ZeroVector` as an empty class that returns a zero by value every time an element is accessed:
```cpp
class ZeroVector {
public:
    int operator[](size_t index) const { return 0; } // Return zero for any access
};
```
This approach avoids storing elements, making the class more memory-efficient. The `operator[]` function is overloaded to return zero regardless of the index.
x??

---

#### Common Base Class Absence in CRTP Pattern
Explanation on how the Curiously Recurring Template Pattern (CRTP) lacks a common base class and how this affects its usage, particularly when needing a shared abstraction for collections.
:p Why does the CRTP design pattern lack a common base class?
??x
The CRTP design pattern does not provide a common base class because each derived class has a different base class due to template parameter inheritance. This makes it challenging to use these classes interchangeably in generic code, such as storing them in collections.
For example:
```cpp
template <typename Derived>
class DenseVector {
public:
    // vector implementation
};

class DynamicVector : public DenseVector<DynamicVector> {};
class StaticVector<T, Size> : public DenseVector<StaticVector<T, Size>> {};

// Collections like std::vector cannot directly use these classes due to lack of common base class.
std::vector<DenseVector<>> vectors; // Error: no common base class
```
x??

---

#### Template Functions in CRTP Pattern
Explanation on how template functions are necessary when working with CRTP-derived classes, and the implications this has for code organization.
:p Why do we need to use template functions when working with CRTP patterns?
??x
Template functions are required because they allow us to write generic functions that can work with any derived class from a CRTP base. This is crucial as these derived classes have different types but share similar interfaces.

For example:
```cpp
template<typename Derived>
std::ostream& operator<<(std::ostream& os, DenseVector<Derived> const& vector) {
    // Implementation to output the dense vector
}

template<typename Derived>
auto l2norm(DenseVector<Derived> const& vector) -> decltype(auto) {
    // Implementation for L2 norm of a vector
}
```
These template functions ensure that `operator<<` and `l2norm()` can work with any `DenseVector` derived class without depending on the concrete type.

Using templates in this way can sometimes lead to code being placed in header files, sacrificing encapsulation.
x??

---

#### Intrusiveness of CRTP Pattern
Explanation on how CRTP is an intrusive design pattern requiring explicit inheritance from a specific base class, and the implications for integrating with existing codebases.
:p Why is the CRTP pattern considered intrusive?
??x
CRTP is considered intrusive because derived classes must explicitly inherit from the specified template parameter. This can be problematic when trying to integrate this pattern into third-party or external codebases.

For example:
```cpp
class MyDerivedClass : public DenseVector<MyDerivedClass> {
    // Class implementation
};
```
This explicit inheritance makes it difficult to add CRTP functionality without modifying existing classes, necessitating the use of adapter patterns in some cases.
x??

---

**Rating: 8/10**

#### CRTP vs C++20 Concepts: Compile-Time Polymorphism
Background context explaining that CRTP provides compile-time polymorphism, which is useful for static type abstractions but lacks runtime flexibility and can be restrictive. C++20 concepts offer a more flexible and nonintrusive alternative.
:p How does CRTP differ from C++20 concepts in terms of implementation and flexibility?
??x
CRTP (Curiously Recurring Template Pattern) requires derived classes to implement certain interfaces, making it less flexible but purely compile-time polymorphic. C++20 concepts, on the other hand, provide a more flexible and nonintrusive way to define requirements for types using templates.
```cpp
// Example of CRTP
template<typename T>
class Base {
public:
    void foo(T t) { /* implementation */ }
};

class Derived : public Base<Derived> {
    // must implement the interface
};
```
x??

---

#### C++20 Concepts: Defining Requirements for Types
Background context explaining how C++20 concepts can define requirements for types in a nonintrusive manner, allowing functions and operators to be restricted to specific type sets.
:p How can we use C++20 concepts to restrict the `operator<<` to only dense vector types?
??x
C++20 concepts allow us to define requirements for types using constraints. By defining a concept like `DenseVector`, we can constrain the `operator<<` to work only with types that meet these requirements.
```cpp
template<typename T>
concept DenseVector = requires (T t, size_t index) {
    { t.size() };
    { t[index] };
    { t.begin() } -> std::same_as<typename T::iterator>;
    { t.end() } -> std::same_as<typename T::iterator>;
} &&
requires (const T t, size_t index) {
    { t[index] };
    { t.begin() } -> std::same_as<const typename T::iterator>;
    { t.end() } -> std::same_as<const typename T::iterator>;
};

template<DenseVector VectorT>
std::ostream& operator<<(std::ostream& os, const VectorT& vector) {
    // implementation
}
```
x??

---

#### Nonintrusive vs Intrusive Approaches with Concepts
Background context explaining that while concepts can be nonintrusive, some situations may require an intrusive approach. A tag class and type traits are introduced to achieve this.
:p How does the introduction of a tag class and type trait improve the concept-based solution?
??x
The introduction of a tag class and type trait allows for both nonintrusive and intrusive approaches to defining types that conform to certain requirements. This is achieved by allowing classes like `DynamicVector` to inherit from a tag class, while others can specialize the type trait.

```cpp
// Using tag class and type traits
struct DenseVectorTag {};

template<typename T>
concept DenseVector = requires (T t, size_t index) {
    // ... requirements ...
} && std::is_base_of_v<DenseVectorTag, T>;

template<typename T>
class DynamicVector : private DenseVectorTag {
    // implementation
};

// Type trait for StaticVector
template<typename T, size_t Size>
struct IsDenseVector : public std::true_type {};

template<typename T, size_t Size>
concept DenseVector = requires (T t, size_t index) {
    // ... requirements ...
} && IsDenseVector<T, Size>::value;
```
x??

---

#### SRP and Separation of Concerns
Background context explaining the principle of separating responsibilities to achieve cleaner designs. In this case, it involves using a type trait for compile-time checks.
:p How does applying the Single Responsibility Principle (SRP) help in this scenario?
??x
Applying the SRP helps by separating the concern of determining if a type is a dense vector into its own class (`IsDenseVector`). This allows `DenseVector` to focus solely on defining requirements without directly checking types, making the code cleaner and more maintainable.

```cpp
// Applying SRP with IsDenseVector
struct DenseVectorTag {};

template<typename T>
concept DenseVector = requires (T t, size_t index) {
    // ... requirements ...
} && std::is_base_of_v<DenseVectorTag, T>;

template<typename T>
class DynamicVector : private DenseVectorTag {
    // implementation
};

// Type trait for StaticVector
template<typename T, size_t Size>
struct IsDenseVector : public std::true_type {};

template<typename T, size_t Size>
concept DenseVector = requires (T t, size_t index) {
    // ... requirements ...
} && IsDenseVector<T, Size>::value;
```
x??

---

