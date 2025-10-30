# High-Quality Flashcards: 10A007---Effective-TypeScript---Dan-Vanderkam_processed (Part 3)

**Rating threshold:** >= 8/10

**Starting Chapter:** Item 7 Think of Types as Sets of Values

---

**Rating: 8/10**

#### TypeScript Type Declarations
TypeScript provides a way to declare types for variables, parameters, and return values. These type declarations can include various properties such as `body`, `cache`, `credentials`, etc., which are common in interfaces like `RequestInit`. Understanding these helps in writing more robust code.

:p What is the purpose of type declarations in TypeScript?
??x
Type declarations in TypeScript help to define the structure and expected behavior of variables, parameters, and return values. This allows for better type checking during development and can improve the readability and maintainability of the code.
x??

---

#### TypeScript Type System Overview
The TypeScript type system works by categorizing each variable into a set of possible values. At runtime, variables hold specific values from JavaScript's value universe (e.g., numbers, strings, objects). However, when TypeScript checks your code, it considers types as sets of these values.

:p How does TypeScript represent types at compile-time?
??x
At compile-time, TypeScript represents types as sets of possible values. For instance, a `number` type includes all numeric values but excludes non-numeric values like strings or objects.
x??

---

#### Type as Sets of Values
In the context of TypeScript, each variable has an associated type that defines what kind of values it can hold. This concept is crucial for understanding how types are used to infer and enforce correct usage throughout your code.

:p Explain why thinking of a type as a set of values is useful.
??x
Thinking of a type as a set of values helps in understanding the constraints and possible values a variable can have. It aids in writing more precise and error-free code by ensuring that only valid operations are performed on variables based on their types.

For example, considering `42` and `-37.25` under the number type means they fit within its domain, whereas `null` or `'Canada'` do not.
x??

---

#### Literal Types in TypeScript
Literal types allow you to define specific values that a variable can take. In TypeScript, you can create custom literal types using `type` declarations.

:p How are literal types created and used?
??x
Literal types in TypeScript are defined using the `type` keyword followed by an identifier and the value it should hold. For instance:
```typescript
type A = 'A';
type B = 'B';
```
These can be combined into unions to form more complex types, such as `AB = 'A' | 'B'`.
x??

---

#### Union Types in TypeScript
Union types allow a variable to take on one of several possible types. The domain of a union type is the combination (union) of its constituent types.

:p What does it mean for a union type?
??x
For a union type, a variable can hold any value from the set of values defined by each of its constituent types. For example:
```typescript
type AB12 = 'A' | 'B' | 12;
```
Here, `AB12` is a union type that allows variables to be `'A'`, `'B'`, or `12`.
x??

---

#### Assignability in TypeScript
Assignability refers to whether one type can be assigned to another. A variable with a specific type can only hold values from its domain and cannot assign values outside of it.

:p What does "assignable" mean in the context of types?
??x
In the context of types, "assignable" means that if a variable has a certain type, it can only be assigned values that are within the defined set of possible values for that type. For example:
```typescript
const x: never = 12; // Type 'number' is not assignable to type 'never'.
```
Here, `never` is an empty type with no values, so assigning a number to it results in a compile-time error.
x??

---

**Rating: 8/10**

#### Type Checking as Subset Relationships
TypeScript's type checker performs operations like checking whether one set of values is a subset of another. This helps ensure that assignments and type compatibility are correct.
:p What does the TypeScript compiler check when assigning a value to a variable?
??x
The TypeScript compiler checks if the assigned value belongs to the same or a compatible set of values as defined by the target type. If the assigned value is not within the domain (set) described by the target type, it results in a compilation error.
```typescript
const a: AB = 'A';  // OK, value 'A' is a member of the set {'A', 'B'}
const c: AB = 'C';  // Error, as "C" is not a subset of {"A", "B"}
```
x??

---

#### Literal Types and Subset Relationships
Literal types represent values exactly. When comparing two literal types or sets of values, TypeScript checks if one set is a subset of another.
:p How does TypeScript determine type compatibility between literal types?
??x
TypeScript determines type compatibility by checking whether the value represented by the source literal type belongs to the target type's domain (set). If it does not, a type error occurs.
```typescript
type AB = 'A' | 'B';
const ab: AB = Math.random() < 0.5 ? 'A' : 'B'; // OK, "A" and "B" are valid values for AB

// Error because 12 is not in the set {"A", "B"}
declare let twelve: AB12;
const back: AB = twelve; 
```
x??

---

#### Infinite Domains and Type Reasoning
For more complex types with infinite domains, TypeScript uses structural typing to reason about type compatibility. This means that a value must match the structure described by the target type.
:p How does TypeScript handle interfaces in terms of type checking?
??x
TypeScript uses structural typing for interfaces, meaning that an object conforms to an interface if it has all the required properties and optionally more. The `keyof` operator can be used to find common keys between types.
```typescript
interface Person {
    name: string;
}

interface Lifespan {
    birth: Date;
    death?: Date;
}

type PersonSpan = Person & Lifespan; // Intersection of both interfaces

const ps: PersonSpan = { 
    name: 'Alan Turing', 
    birth: new Date('1912/06/23'), 
    death: new Date('1954/06/07') 
};  // OK
```
x??

---

#### Union and Intersection Types
Union types combine the values of multiple types, while intersection types intersect properties from different types. The `keyof` operator is used to find common keys between union or intersection types.
:p What does the `keyof` operator do when applied to a union type?
??x
The `keyof` operator on a union type returns the set of all possible keys that can be present in any of the types within the union. For a union type, it results in an empty set because no key is guaranteed to be common.
```typescript
type K = keyof (Person | Lifespan); // Result: never
```
x??

---

#### Set Operations and Type Intersections
Intersecting two interface types combines their properties to form a new type. The resulting type contains all the properties from both interfaces, making it more specific than either of the original interfaces.
:p What happens when you use the `&` operator between two interface types?
??x
The `&` operator between two interface types creates an intersection type that includes all the properties defined in both interfaces. This results in a more restrictive type that requires an object to have all these properties.
```typescript
interface Person {
    name: string;
}

interface Lifespan {
    birth: Date;
    death?: Date;
}

type PersonSpan = Person & Lifespan; // Combines the properties of both interfaces

const ps: PersonSpan = { 
    name: 'Alan Turing', 
    birth: new Date('1912/06/23'), 
    death: new Date('1954/06/07') 
};  // OK
```
x??

---

**Rating: 8/10**

#### Keyof Operators and Type Relationships
Background context explaining the concept of `keyof` operators and how they relate to TypeScript's type system. The `keyof` operator is used to extract keys from a type, which can be combined with logical operations like intersection (`&`) and union (`|`).
:p What do the `keyof (A&B)` and `keyof (A|B)` formulas mean in TypeScript?
??x
The `keyof` operator returns the set of common keys when used with an intersection type (`&`). It combines the keys from both types. For a union type (`|`), it finds the common subset of keys present in both types.
```typescript
interface A { a: number; b: string; }
interface B { c: boolean; d: Date; }

// Keyof (A & B) = "a" | "b" | "c" | "d"
// Keyof (A | B) = ""
```
??x

---

#### Extends in TypeScript Interfaces
Background context explaining the use of `extends` in TypeScript interfaces and how it defines a subset relationship. The `extends` keyword allows adding fields to an interface, or refining existing properties.
:p What does the `extends` keyword mean when used with interfaces?
??x
The `extends` keyword indicates that one interface is a subset of another, meaning every value of the derived interface must satisfy all the constraints defined in the base interface. This can include both adding new properties and modifying existing ones to match stricter types.
```typescript
interface Person { name: string; }
interface PersonSpan extends Person {
    birth: Date;
    death?: Date;
}

// A PersonSpan must have a `name` property, but may or may not have a `death` property.
```
??x

---

#### Subtyping and Interfaces
Background context explaining subtyping in the context of interfaces. Subtyping can be understood through the lens of assignable values, with TypeScript allowing for type changes within an interface as long as it remains compatible.
:p How does the concept of extends work when changing properties within a subtype?
??x
The `extends` keyword allows you to redefine or narrow down the types of properties in a derived interface. As long as these redefined properties are still assignable from their original types, they can be changed. If not, TypeScript will raise an error.
```typescript
interface NullyStudent { name: string; ageYears: number | null; }
interface Student extends NullyStudent {
    ageYears: number;
}

// This is valid because `number` is a subset of `number | null`.
// But this would result in an error:
interface StringyStudent extends NullyStudent {
    // Interface 'StringyStudent' incorrectly extends interface 'NullyStudent'.
    ageYears: number | string; 
}
```
??x

---

#### Vector Interfaces and Subtypes
Background context explaining vector interfaces and how they can be related through subtyping. The `extends` keyword is used to model the relationship between different dimensional vectors.
:p What does it mean when one interface extends another in the context of vector types?
??x
In the context of vector interfaces, extending an interface means that every value satisfying the derived interface must also satisfy the base interface. This allows for more specific or constrained types while maintaining compatibility with broader ones.
```typescript
interface Vector1D { x: number; }
interface Vector2D extends Vector1D { y: number; }
interface Vector3D extends Vector2D { z: number; }

// A Vector3D is a subtype of Vector2D, which is a subtype of Vector1D. This relationship can be visualized using Venn diagrams.
```
??x

---

#### Extends in Generic Types
Background context explaining how `extends` works as a constraint within generic types and the concept of subset relationships.
:p What does it mean when `K extends string` is used in a function parameter?
??x
When `K extends string` is used in a function parameter, it means that `K` must be a subtype of `string`. This ensures that any type used for `K` will have the properties and methods defined by `string`.
```typescript
function getKey<K extends string>(val: any, key: K) {
    // The key passed to this function must be a string or a type derived from string.
}
```
??x

---

**Rating: 8/10**

#### Thinking of Types as Sets
Background context explaining that types can be thought of as sets, where each type represents a set of values. This approach helps understand relationships between different types such as unions and intersections.

:p How do we interpret the relationship between `string | number` and `string | Date` using the set interpretation?
??x
In the set interpretation, both `string | number` and `string | Date` have a non-empty intersection (since they both include strings), but neither type is a subset of the other. This means that while there are common elements (`string`), they do not form a strict hierarchy or subtype relationship.

For example:
- A string literal like `'hello'` can be part of `string | number`, but it cannot be part of `string | Date` unless the date is represented as a string.
- Similarly, a number-like value (if allowed by TypeScript) would fit into `string | number`, but not necessarily `string | Date`.

This understanding aligns with the idea that these types are distinct sets with overlapping elements.

```typescript
const x: string | number = 'hello'; // Valid assignment
const y: string | Date = 'hello';  // Also valid, as it's a string

const z: string | number = new Date(); // Invalid because date is not represented as a string
```
x??

---

#### Array vs. Tuple in TypeScript
Background context explaining that arrays and tuples are different types of collections with distinct structures and behaviors. Arrays can hold any kind of elements, while tuples have fixed-length and ordered elements.

:p How does the array `number[]` differ from the tuple `[number, number]`?
??x
The array `number[]` is not assignable to the tuple `[number, number]` because a tuple has exactly two elements, whereas an array can have any number of elements. For instance:

- An empty list or a single-element list like `[1]` cannot be assigned to a tuple with two required elements.
- Conversely, assigning a tuple to an array works as expected:
  
```typescript
const triple: [number, number, number] = [1, 2, 3];
const double: number[] = triple; // Valid assignment

// The reverse is not allowed due to the fixed structure of tuples
const singleArray: number[] = [1]; 
const tuplePair: [number, number] = singleArray; // Error: Source has 1 element(s) but target requires 2.
```
This difference reflects the structural typing nature of TypeScript.

x??

---

#### Assignability and Subset Relations
Background context explaining that assignability in TypeScript is based on the concept of subset relations between types. If `T1` can be assigned to `T2`, it means every value in `T1` must also be a valid value for `T2`.

:p Why can't `number[]` be assigned to `[number, number]`?
??x
The reason `number[]` cannot be assigned to `[number, number]` is because tuples have a fixed length and order of elements. A tuple with two numbers strictly requires exactly those two positions to hold values. An array, on the other hand, can have any number of elements.

For example:
- If you try to assign an array that might contain more than two numbers to a tuple, TypeScript will not allow it because tuples do not accommodate additional elements.
- Conversely, assigning a tuple to an array is valid as long as the tuple fits within the bounds of the array's length.

This difference reflects the structural nature of tuples and the flexible nature of arrays in TypeScript.

```typescript
const list: number[] = [1, 2];
// This assignment will fail:
const pair: [number, number] = list; // Error: Target requires 2 element(s) but source may have fewer

// But this is valid:
list.push(3); // Adding an extra element to the array
```
x??

---

#### Using `unknown` Type in TypeScript
Background context explaining that the `unknown` type represents a value of any JavaScript type. It sits at the top of the type hierarchy and can accept all values.

:p How does the `unknown` type work, and why is it useful?
??x
The `unknown` type allows a variable to hold any possible JavaScript value. Since every other type in TypeScript is assignable to `unknown`, you can assign almost any value to a variable of type `unknown`. However, this also means that operations on an `unknown` type require explicit type assertions or checks.

For example:
```typescript
let value: unknown = 'hello'; // Valid because string is assignable to unknown
value = 42;                   // Also valid

// To use the value as a number, you must assert it
const numValue = value as unknown as number;
```

Using `unknown` can be useful when you want to handle any kind of value but are unsure what type it will be at runtime. It provides a way to deal with dynamic values without making strict assumptions about their types.

```typescript
function processInput(input: unknown) {
    if (typeof input === 'number') {
        console.log(`Number received: ${input}`);
    } else if (typeof input === 'string') {
        console.log(`String received: ${input}`);
    }
}
```
In this function, `unknown` allows flexibility in handling different types of inputs.

x??

---

#### Never and Intersection Types
Background context explaining that the `never` type represents functions or statements that never return normally. It also explains how to use intersection types (`T1 & T2`) for combining multiple types into a single type with all properties from both.

:p How do we define an empty set in TypeScript, and what is its significance?
??x
In TypeScript, the `never` type can be thought of as an "empty set" because it represents values that never exist. It's typically used to denote functions that always throw an error or end with a return statement, meaning they never reach their closing brace.

For example:
```typescript
function fail(): never {
    throw new Error('This will never return');
}
```

The `never` type is significant because it helps in defining functions that are guaranteed to exit through an exception or another non-terminating operation. It can also be used as a parameter type to indicate that a function will never receive such a value.

```typescript
function neverCalled(n: never): void {
    // This function will not compile if `n` is ever called with any other type
}
```

Intersection types (`T1 & T2`) combine the properties of two or more types. For instance, `readonly Lockbox & Lockbox` would be a type that has all properties of both interfaces:

```typescript
interface Lockbox {
    code: number;
}

interface ReadonlyLockbox {
    readonly code: number;
}

type LockboxAndReadonly = Lockbox & ReadonlyLockbox; // {code: number}
```

Here, `LockboxAndReadonly` combines the `code` property from both interfaces but with the `readonly` modifier ensuring that `code` cannot be modified.

x??

---

**Rating: 8/10**

#### TypeScript Types as Sets of Values

Background context: In TypeScript, types define a set of values and operations that can be performed on those values. These sets can either be finite or infinite, such as `boolean` or `number`. The type system forms intersecting sets rather than a strict hierarchy, meaning two types can overlap without one being a subtype of the other.

:p How do TypeScript types define value spaces?
??x
TypeScript types define value spaces by specifying which values are valid for a particular variable or property. For example, if you declare a variable with a type `number`, it means that any number can be assigned to this variable, but not strings or objects.
```typescript
// Example of defining a value space in TypeScript
let age: number = 25; // Valid assignment
age = "twenty-five"; // Error: Type 'string' is not assignable to type 'number'.
```
x??

---

#### Immutable Values and Readonly Properties

Background context: The concept revolves around working with immutable values, which means that once a value has been assigned, it cannot be changed. In TypeScript, the `readonly` keyword can be used to declare properties of an object as read-only.

:p What is the effect of using the `readonly` keyword in TypeScript?
??x
The `readonly` keyword in TypeScript makes the specified property or members immutable after the object has been created. This means you cannot change the value of a `readonly` property once it has been assigned.
```typescript
const robox: ReadonlyLockbox = { code: 3625 };
robox.code = 1234; // Error: Cannot assign to 'code' because it is a read-only property.
```
x??

---

#### TypeScript Type Spaces and Value Spaces

Background context: In TypeScript, symbols can exist in either type space or value space. Understanding the difference between these two spaces helps prevent common errors.

:p What are the differences between type space and value space in TypeScript?
??x
In TypeScript, type space refers to the set of values that a variable or property is allowed to have, while value space contains actual values at runtime. A symbol can exist in either one of these spaces depending on how it's declared.
```typescript
// Type space example
interface Cylinder {
  radius: number;
  height: number;
}

const Cylinder = (radius: number, height: number) => ({ radius, height });

function calculateVolume(shape: unknown) {
  if (shape instanceof Cylinder) { // Error here because `instanceof` operates on value space.
    shape.radius; // Error: Property 'radius' does not exist on type '{}'.
  }
}
```
x??

---

#### Union Types and Set Operations

Background context: TypeScript supports union types, which are a way to express that a variable can hold values of multiple types. The domain of `A | B` is the union of the domains of `A` and `B`.

:p How does the union type work in TypeScript?
??x
The union type allows you to specify multiple possible types for a single variable. The domain of `A | B` includes all values that can be assigned to either `A` or `B`.
```typescript
type T1 = 'string literal' | 42; // A union type with string and number literals.
let v: T1 = 'string literal';   // Valid assignment
v = 42;                        // Also valid
```
x??

---

#### instanceof Operator in TypeScript

Background context: The `instanceof` operator is a JavaScript runtime operator that checks whether an object is an instance of a specific constructor function. In TypeScript, it operates on value space.

:p Why does the `instanceof` operator not work as expected with types?
??x
The `instanceof` operator in TypeScript and JavaScript operates on values at runtime, not on types during compile time. Therefore, when you use `instanceof` with a type name, it checks against constructors, not types.
```typescript
// Incorrect usage of instanceof with a type
function calculateVolume(shape: unknown) {
  if (shape instanceof Cylinder) { // Error: 'Cylinder' is not a constructor function.
    shape.radius; // Error: Property 'radius' does not exist on type '{}'.
  }
}
```
x??

---

#### Type Operations and Domain Unions

Background context: TypeScript types form intersecting sets, meaning the domain of `A | B` includes all values that can be assigned to either `A` or `B`.

:p How do you determine the combined set when using union types?
??x
When using union types, the domain includes all possible values from each individual type. If a variable is declared as `type T = A | B`, it means the variable can hold any value that can be assigned to either `A` or `B`.
```typescript
type UnionExample = number | string;
let v: UnionExample = 42; // Valid assignment with number
v = "hello";              // Also valid assignment with string
```
x??

---

**Rating: 8/10**

#### JavaScript's `this` Keyword vs TypeScript's `this`
Background context: In JavaScript, the `this` keyword can have different meanings depending on its context, such as function invocation or object methods. In TypeScript, `this` is used to refer to a type that allows for polymorphism and method chaining.
:p How does `this` behave in JavaScript compared to TypeScript?
??x
In JavaScript, `this` can refer to the global object (or `undefined` in strict mode) when called as a standalone function. In object methods, it refers to the current object. In TypeScript, `this` is a type that represents the context of an object or class and is used for method chaining.
??x

---

#### Bitwise AND and OR vs Intersection and Union
Background context: In value space, bitwise operators `&` and `|` perform logical operations on binary representations of numbers. In TypeScript's type space, these symbols have different meanings: `&` denotes the intersection of two types, while `|` represents their union.
:p How do `&` and `|` behave differently in value space compared to type space?
??x
In value space, `&` performs a bitwise AND operation on numbers, whereas `|` performs a bitwise OR. In TypeScript's type system, `&` denotes the intersection of two types (the common properties of both), and `|` represents their union (a type that can be either one or the other).
??x

---

#### `const` in Value Space vs Type Space
Background context: In JavaScript, `const` is used to declare a constant value. In TypeScript, `as const` changes the inferred types of literal values and objects.
:p What are the differences between using `const` in value space and type space?
??x
In value space, `const` declares a new variable that cannot be reassigned. In type space, `as const` modifies the inferred type of a literal or object, making all properties read-only and inferring the exact type of objects.
??x

---

#### Extends in Value Space vs Type Space
Background context: The `extends` keyword is used differently depending on whether you are working with classes (value space) or interfaces/types (type space). In class definitions, it establishes a subclass relationship. In type definitions, it defines subtype relationships and can be used as constraints for generic types.
:p How does `class A extends B` differ from `interface A extends B`?
??x
In value space, `class A extends B` is used to define a subclass that inherits properties and methods from the superclass B. In type space, `interface A extends B` defines interface A as having all properties of B, allowing for subtype relationships in TypeScript's type system.
??x

---

#### `in` Operator in Value Space vs Mapped Types
Background context: The `in` keyword is used differently in value and type spaces. In value space, it is used in loops to iterate over the keys of an object. In type space, it is used to create mapped types that transform existing types.
:p How does the `in` operator function in value space compared to its use in mapped types?
??x
In value space, `for (key in obj)` iterates over all enumerable properties of an object. In mapped types, `T in U` creates a new type where each key from T is transformed or checked against another type U.
??x

---

#### Logical NOT vs Non-null Assertion
Background context: The dot (`.`) operator has different meanings in value space and type space. In value space, it is used as the logical NOT operator. In type space, `x.` asserts that x does not include a `null` or `undefined` type.
:p How do the `.` operators differ between value space and type space?
??x
In value space, `.x` acts as the logical NOT operator on a boolean expression. In type space, `x.` is used to assert that the type of x does not include `null` or `undefined`.
??x

---

#### Email Function in TypeScript
Background context: A function called `email` was updated to accept an object with properties `to`, `subject`, and `body`. When attempting to use destructuring assignment, TypeScript generates errors because it interprets the types as values instead of types.
:p What are the issues when trying to use destructuring in the email function?
??x
The issue arises from TypeScript interpreting `Person` and `string` as value bindings rather than type annotations. To resolve this, you need to separate the type and value parts: `{to, subject, body}: {to: Person, subject: string, body: string}`.
??x

---

#### Type and Value Space
Background context: TypeScript operates in both a value space (for actual JavaScript code) and a type space (for type definitions). Understanding these differences is crucial for writing correct TypeScript code.
:p Why is it important to distinguish between type space and value space?
??x
It's essential to understand the difference between type space and value space because constructs that behave similarly in both spaces can have different meanings. Misunderstanding this distinction can lead to errors like treating types as values or vice versa.
??x

**Rating: 8/10**

#### Type Annotations vs. Type Assertions in TypeScript
TypeScript allows you to assign types to variables through type annotations and type assertions, which have different implications for your codebase.

:p What is the difference between a type annotation and a type assertion?
??x
A type annotation explicitly states that a variable conforms to a certain type at the point of declaration. This enforces strict type checking and can help catch errors early in development. On the other hand, a type assertion tells TypeScript to trust you and treat the value as if it matches the specified type, even if the inferred type is different.

```typescript
const alice: Person = { name: 'Alice' }; // Type annotation, ensures that `name` property exists
const bob = {} as Person; // Type assertion, silences errors but does not enforce the same checks
```
x??

---

#### Safety Checks with Type Annotations
Type annotations provide additional safety checks by ensuring that a variable conforms to the specified type at the time of declaration.

:p How do type annotations ensure safety in TypeScript?
??x
Type annotations ensure that variables are properly typed when they are declared. This means that if you try to assign a value that does not match the required type, TypeScript will flag an error. For instance, if `Person` requires a `name` property, using a type annotation will enforce this requirement.

```typescript
const alice: Person = {}; // Error: Property 'name' is missing in type '{}'
```
x??

---

#### Type Assertions and Extra Properties
Type assertions can be used to bypass type checking for additional properties that might not be defined in the interface or type declaration. However, they are generally less safe than type annotations.

:p What happens when using a type assertion with extra properties?
??x
Using a type assertion does not perform the same checks as a type annotation and may allow additional properties. While this can be useful for some cases, it can also introduce errors since TypeScript won't flag these issues during compilation.

```typescript
const alice: Person = { name: 'Alice', occupation: 'TypeScript developer' }; // Error in type annotations
const bob = {} as Person; // No error in type assertions
```
x??

---

#### Arrow Function with Type Annotations
Using arrow functions in TypeScript can sometimes require careful handling of types. Type annotations need to be applied correctly to ensure the correct typing.

:p How do you use a type annotation with an arrow function in TypeScript?
??x
To apply a type annotation within an arrow function, you can either declare the variable inside the function or annotate the return type of the function itself.

```typescript
const people = ['alice', 'bob', 'jan'].map(name => {
    const person: Person = { name };
    return person; // Correct way using local variable and type annotation
});

const people2 = ['alice', 'bob', 'jan'].map((name): Person => ({ name })); // Using return type annotation

// Both `people` and `people2` are of type Person[]
```
x??

---

#### Excess Property Checking in TypeScript
Excess property checking ensures that objects passed to a function with a specific interface do not have extra properties. Type assertions can bypass this check, leading to potential issues.

:p What is excess property checking in TypeScript?
??x
Excess property checking ensures that an object passed as an argument to a function does not contain any extra properties beyond those defined in the expected type or interface. If there are additional properties, TypeScript will flag an error unless you use a type assertion.

```typescript
const alice: Person = { name: 'Alice', occupation: 'TypeScript developer' }; // Error without assertions

const bob = {} as Person; // No error due to type assertion bypassing checks
```
x??

---

#### Summary of Best Practices
In general, it is recommended to use type annotations over type assertions for better safety and reliability. Type annotations provide more robust type checking and can help catch errors during development.

:p Why prefer type annotations over type assertions?
??x
Type annotations are preferred because they enforce strict type checks at the time of declaration, ensuring that variables conform to their specified types. This leads to fewer runtime errors and helps maintain code quality. Type assertions, while useful in certain cases, can bypass these safety checks and may introduce potential issues.

```typescript
const alice: Person = {}; // Error if `name` is missing
const bob = {} as Person; // No error but can lead to silent type mismatches
```
x??
---

**Rating: 8/10**

#### Optional Chaining (?.)
Background context explaining the optional chaining operator. This is a runtime check to ensure that an object is not null or undefined before accessing its properties or methods.
:p What does `document.getElementById('foo')?.addEventListener` do?
??x
The optional chaining operator (`?.`) checks if the object `document.getElementById('foo')` is not null or undefined before attempting to add an event listener. If the element is found, it safely adds a click event listener that alerts "Hi there." If the element does not exist, no error occurs; the expression simply returns undefined.
```javascript
document.getElementById('foo')?.addEventListener('click', () => {
    alert('Hi there.');
});
```
x??

---

#### Nullish Coalescing (??)
Background context explaining the nullish coalescing operator. This operator `(a ?? b)` returns `b` if `a` is null or undefined; otherwise, it returns `a`.
:p What does `const el = body as Person ?? {}` do?
??x
The nullish coalescing operator (`??`) checks if the object `body` is null or undefined. If it is, then `{}` (an empty object) is assigned to `el`. Otherwise, `body` itself is assigned.
```javascript
interface Person {
    name: string;
}
const body = document.body;
const el = body as Person ?? {}; // Assigns {} if body is null or undefined
```
x??

---

#### Type Assertions (as)
Background context explaining type assertions and their limitations. Type assertions are used to inform TypeScript about the actual type of a variable at runtime, but they do not change the underlying value.
:p What does `(theElement as HTMLElement).innerHTML = 'Hello World';` do?
??x
The type assertion `as HTMLElement` tells TypeScript that we believe `theElement` is an instance of `HTMLElement`. This assertion allows us to access properties like `innerHTML` on `theElement`, but it does not actually change the underlying value. If `theElement` is not an actual `HTMLElement`, this code will cause a runtime error.
```javascript
const theElement = document.getElementById('myId');
(theElement as HTMLElement).innerHTML = 'Hello World';
```
x??

---

#### User-Defined Type Guards (is)
Background context explaining user-defined type guards. These are functions that return a boolean value indicating whether a given object is of a specific type.
:p What does `if ((el as unknown) instanceof HTMLElement)` do?
??x
The code uses a type assertion `(el as unknown)` to cast the variable `el` to `unknown`, which allows checking if it's an instance of `HTMLElement`. This is useful for runtime checks where you want to ensure that `el` has certain properties or methods.
```javascript
function isElement(el: any): el is HTMLElement {
    return el instanceof HTMLElement;
}

const el = document.getElementById('myId');
if (isElement(el)) {
    el.innerHTML = 'Hello World';
}
```
x??

---

#### Const Context (as const)
Background context explaining `as const`. This assertion makes the type more precise by indicating that all properties of the object are read-only.
:p What does `(constObj as const)` do?
??x
The `as const` assertion makes each property in an object or array read-only, and it ensures that the object is not modified. It's useful for ensuring immutability at compile time.
```typescript
interface Person {
    name: string;
}
const person = { name: 'Alice' } as const; // Each property becomes readonly
```
x??

---

#### Generic Type Inference (Bad Idea)
Background context explaining the misuse of generic type inference, which can lead to false confidence in TypeScript's type checking.
:p What is a bad practice when using generics?
??x
Using generic type inference without proper understanding can be misleading. For example, relying on `T` without ensuring that `T` has the necessary methods or properties can make you think TypeScript is doing thorough checks, but it might not be. This can lead to errors at runtime.
```typescript
// Example of a bad practice
function process<T>(item: T) {
    return item.doSomething(); // Might assume TypeScript will check if T has doSomething()
}
```
x??

---

#### Casting vs Type Assertions (Avoid Terminology)
Background context explaining the difference between casting in languages like C and type assertions in TypeScript.
:p What is wrong with calling a type assertion a "cast"?
??x
Calling a type assertion a "cast" can be misleading because, unlike in languages like C where `cast` changes values at runtime (e.g., from an int to a float), a type assertion in TypeScript only informs the compiler about types without changing the underlying value. This is why it's best to avoid using the term "cast."
```typescript
// Example of a type assertion
const el = document.body as HTMLElement; // No runtime change, just informing the compiler
```
x??

