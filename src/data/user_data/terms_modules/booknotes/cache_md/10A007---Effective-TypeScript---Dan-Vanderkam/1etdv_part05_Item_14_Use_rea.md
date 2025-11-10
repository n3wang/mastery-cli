# High-Quality Flashcards: 10A007---Effective-TypeScript---Dan-Vanderkam_processed (Part 5)


**Starting Chapter:** Item 14 Use readonly to Avoid Errors Associated with Mutation

---


#### Interfaces vs. Types in TypeScript
Background context explaining how interfaces and types are used in TypeScript. Explain that interfaces describe blueprints for objects, while types can be more flexible, including unions, tuples, etc.
:p How do you decide between using an interface or a type in TypeScript?
??x
You should use interfaces when the object structure is consistent across multiple objects, as it provides a clear blueprint and easier refactoring. Use types when you need more flexibility, such as when working with union types or complex type definitions that don't necessarily follow a strict object structure.
x??

---

#### Read-Only Modifier in TypeScript
Background context explaining mutable vs. immutable data structures in JavaScript and how TypeScript can help catch mutations using the readonly modifier.
:p How does the readonly modifier work in TypeScript?
??x
The `readonly` modifier prevents assignments to a property after it has been set, ensuring that certain properties remain constant throughout the object's lifecycle. This helps prevent accidental modifications that could lead to bugs.
x??

---

#### Destructive Array Mutation in JavaScript
Background context explaining why arrays are mutable by default in JavaScript and how this can cause issues if not handled carefully.
:p Why does the `arraySum` function modify the array it receives?
??x
The `arraySum` function uses the `pop()` method, which removes the last element from the array and returns its value. This operation mutates the original array by removing elements from it one by one until the array is empty.
x??

---

#### Using Readonly Modifier to Prevent Mutations
Background context explaining how readonly can be used to prevent unintended modifications of objects in TypeScript.
:p How can you use `readonly` to ensure that certain properties remain unchanged?
??x
You can define an object type with a `readonly` property, as shown below. This prevents any assignments to the specified property after its initial assignment:
```typescript
interface ReadOnlyExample {
    readonly id: number;
}

const exampleObject: ReadOnlyExample = { id: 1 };
exampleObject.id = 2; // Error: Cannot assign to 'id' because it is a read-only property.
```
x??

---

#### Immutable Primitives in TypeScript
Background context explaining that JavaScript primitives (strings, numbers, booleans) are immutable by nature and how this differs from objects and arrays.
:p Why are strings, numbers, and booleans considered immutable?
??x
In JavaScript, primitive values like `string`, `number`, and `boolean` are immutable. This means you can't change their value after they have been created; instead, a new value is created when an operation would seemingly modify the existing one. For example:
```typescript
let num = 5;
num++; // A new number object (6) is created, but num still points to the original object.
```
x??

---

#### Consistency in Object Types
Background context explaining that TypeScript prefers interfaces for object types when consistency and clear structure are desired.
:p When should you prefer using an interface over a type?
??x
You should prefer interfaces when defining complex object structures with consistent properties, as they provide better refactoring support and clearer documentation. Interfaces ensure that the expected fields and their types are consistently followed throughout your codebase.
x??

---


#### Readonly Property Modifier and Readonly<T>
The `Readonly<T>` utility type in TypeScript is used to make all properties of an object readonly, meaning they cannot be reassigned. However, it only performs a shallow transformation; nested properties can still be mutated if they are not also marked as readonly.
:p What does the `Readonly<T>` utility type do?
??x
The `Readonly<T>` utility type makes all top-level properties of an object immutable (readonly), meaning they cannot be reassigned. However, it does not make nested objects or arrays within those properties immutable by default; you need to mark them as readonly separately.
```typescript
type Outer = {
    inner: { x: number };
};

const obj: Readonly<Outer> = { inner: { x: 0 } };
obj.inner.x = 1; // OK, but obj.inner can still be reassigned or mutated
```
x??

---

#### Shallow vs. Deep Readonly in TypeScript
When using `Readonly<T>` on an object, it makes the top-level properties immutable (readonly) but does not recursively apply this to nested objects unless those are also marked with `Readonly`. There is no built-in support for deep readonly types, but you can implement one yourself.
:p What is a limitation of using `Readonly<T>`?
??x
A limitation of using `Readonly<T>` is that it only performs a shallow transformation. This means that while top-level properties become readonly, nested objects or arrays within those properties are not affected unless they are also marked with `Readonly`. To achieve deep readonly types, you would need to implement this functionality yourself.
```typescript
type DeepReadonly<T> = {
    readonly [P in keyof T]: T[P] extends object ? DeepReadonly<T[P]> : T[P];
};

const obj: DeepReadonly<{ a: { b: number } }> = { a: { b: 0 } };
obj.a.b = 1; // Error: Cannot assign to 'b' because it is a read-only property
```
x??

---

#### Readonly with Methods in TypeScript Interfaces
When you apply `Readonly<T>` to an interface that contains methods, the readonly modifier only affects properties. It does not modify or remove any methods defined on the object.
:p How does `Readonly<T>` affect interfaces containing methods?
??x
`Readonly<T>` only modifies top-level properties of an interface, making them immutable (readonly). However, it does not change or remove any methods that are part of the interface. Methods can still mutate the underlying object if they are defined to do so.
```typescript
interface Outer {
    inner: { x: number };
}

const obj: Readonly<Outer> = { inner: { x: 0 } };
obj.inner.x = 1; // OK, because only properties are made readonly
obj.inner = { x: 1 }; // Error: Cannot assign to 'inner' because it is a read-only property
```
x??

---

#### Mutable and Immutable Versions of Classes in TypeScript
The standard library provides both mutable and immutable versions of common classes like `Array`. The mutable version (`Array<T>`) contains methods that can mutate the underlying array, while the immutable version (`ReadonlyArray<T>`) does not.
:p What are the key differences between `Array<T>` and `ReadonlyArray<T>`?
??x
The key differences between `Array<T>` and `ReadonlyArray<T>` are:
1. **Mutating Methods**: `Array<T>` has methods like `pop()`, `shift()`, etc., which can mutate the underlying array.
2. **Readonly Modifier**: `ReadonlyArray<T>` marks properties like `length` as readonly and does not define any mutating methods, preventing modifications to the array.

```typescript
const a: number[] = [1, 2, 3];
const b: readonly number[] = a;
b.pop(); // OK, but mutates 'a'
// const c: number[] = b; // Error: Type 'readonly number[]' is 'readonly' and cannot be assigned to the mutable type 'number[]'
```
x??

---

#### Subtype Relationship Between `T[]` and `readonly T[]`
In TypeScript, an array of a certain type (`T[]`) is considered strictly more capable than a readonly array of that type (`readonly T[]`). This means that any array can be assigned to a variable of the readonly array type, but not vice versa.
:p What is the subtype relationship between `T[]` and `readonly T[]`?
??x
The subtype relationship in TypeScript is such that an array of a certain type (`T[]`) is considered strictly more capable than a readonly array of that type (`readonly T[]`). This means:
- You can assign a mutable array to a variable of the readonly array type.
- You cannot assign a readonly array to a variable of the mutable array type.

```typescript
const a: number[] = [1, 2, 3];
const b: readonly number[] = a; // OK, because 'a' is an array and can be assigned to 'readonly'
const c: number[] = b; // Error: Type 'readonly number[]' is 'readonly' and cannot be assigned to the mutable type 'number[]'
```
x??


#### DRY Principle: Don’t Repeat Yourself

**Background context:** The DRY principle, which stands for "Don't Repeat Yourself," is a software development principle that suggests every piece of knowledge should have a single, unambiguous, authoritative representation within a system. This helps to avoid duplication of information and ensures consistency.

In the provided code example, there are several instances where the same calculations (surface area and volume) are repeated with different values. By defining functions for these calculations, you can reduce redundancy and improve maintainability of your code.

:p How does the DRY principle apply to reducing repetition in JavaScript/TypeScript code?
??x
The DRY principle applies by encouraging developers to refactor their code into reusable functions or constants instead of repeating the same logic multiple times. In the given example, we define `surfaceArea` and `volume` functions that take radius (`r`) and height (`h`) as parameters. This way, you can easily reuse these functions for different cylinders without rewriting the calculations.

```typescript
type CylinderFn = (r: number, h: number) => number;

const surfaceArea: CylinderFn = (r, h) => 2 * Math.PI * r * (r + h);
const volume: CylinderFn = (r, h) => Math.PI * r * r * h;
```

```typescript
for (const [r, h] of [[1, 1], [1, 2], [2, 1]]) {
    console.log(
        `Cylinder r=${r} × h=${h}`,
        `Surface area: ${surfaceArea(r, h)}`,
        `Volume: ${volume(r, h)}`
    );
}
```
x??

---

#### Type Duplication and Factoring

**Background context:** In TypeScript or other statically typed languages, duplication in types can lead to inconsistencies similar to code repetition. Just as you would factor out repeated code into functions, you should also consider factoring out common type patterns.

In the provided example, two interfaces (`Person` and `PersonWithBirthDate`) are defined with a lot of overlap but some differences (like an optional field in one). This can lead to bugs or inconsistencies if not managed carefully. By factoring out shared parts, you ensure that changes propagate correctly across related types.

:p How does type duplication affect code maintainability?
??x
Type duplication affects code maintainability by introducing redundancy and potential inconsistencies. When you have overlapping interfaces with slight differences (like adding an optional field in one but not the other), it becomes harder to manage updates or introduce new fields consistently. This can lead to bugs if developers don't notice that a type is missing something.

For example, consider the `Person` and `PersonWithBirthDate` interfaces:
```typescript
interface Person {
    firstName: string;
    lastName: string;
}

interface PersonWithBirthDate extends Person {
    birth: Date;
}
```

Here, updating `Person` might not always be reflected in `PersonWithBirthDate`, leading to potential issues.

Factoring out shared parts can help maintain consistency:
```typescript
interface BasePerson {
    firstName: string;
    lastName: string;
}

interface Person extends BasePerson {
}

interface PersonWithBirthDate extends BasePerson {
    birth: Date;
}
```
x??

---

#### Using Interfaces for Common Patterns

**Background context:** Interfaces in TypeScript allow you to define the structure of objects and can be used to create common patterns. By defining a base interface that is extended by other more specific interfaces, you can reduce duplication and ensure consistency across related types.

In the example provided, we can see how a `Point2D` interface simplifies distance calculations compared to writing out the same object shape multiple times.

:p How does using an interface like `Point2D` help in reducing code duplication?
??x
Using an interface like `Point2D` helps reduce code duplication by defining a common structure that can be reused. Instead of repeatedly writing the `{ x: number; y: number }` pattern, you define it once and reuse it.

For example:
```typescript
interface Point2D {
    x: number;
    y: number;
}

function distance(a: Point2D, b: Point2D) {
    return Math.sqrt((a.x - b.x) ** 2 + (a.y - b.y) ** 2);
}
```

This approach makes your code more readable and maintainable. If you need to change the structure of a point or add methods, you only need to update the `Point2D` interface.

```typescript
interface Point2D {
    x: number;
    y: number;

    // Add new properties or methods here
}
```
x??

---

#### Factoring Shared Function Signatures

**Background context:** When several functions share the same type signature, it's a good practice to factor out this shared pattern into a named type. This can simplify function definitions and make your code more readable.

In the example provided, we have two HTTP functions (`get` and `post`) that both take similar arguments and return the same promise type. By factoring out their common signature, you can define a single type for them to use.

:p How does factoring shared function signatures improve code organization?
??x
Factoring shared function signatures improves code organization by making your functions more concise and easier to understand. It also centralizes the definition of common types or interfaces, reducing redundancy and ensuring consistency across related functions.

For example:
```typescript
type HTTPFunction = (url: string, opts: Options) => Promise<Response>;

const get: HTTPFunction = (url, opts) => { /* ... */ };
const post: HTTPFunction = (url, opts) => { /* ... */ };
```

Here, both `get` and `post` functions share the same type signature. By defining a named type (`HTTPFunction`), you avoid repeating the function parameters everywhere.

```typescript
interface Options {
    // options definition here
}

type HTTPFunction = (url: string, opts: Options) => Promise<Response>;

const get: HTTPFunction = (url, opts) => { /* ... */ };
const post: HTTPFunction = (url, opts) => { /* ... */ };
```
x??

---


#### Reducing Code Duplication with Interfaces and Types

Background context: In TypeScript, it is common to encounter situations where you have two interfaces or types that share many fields. Instead of duplicating these shared fields, you can reduce redundancy by using inheritance (interfaces) or intersections.

If the two interfaces share a subset of their fields, you can factor out a base interface with just these common fields. This allows you to avoid rewriting duplicated code and makes maintenance easier.

:p How can you use interfaces to avoid code duplication between `Person` and `PersonWithBirthDate`?
??x
You can define `Person` as the base interface containing shared properties, then extend it for `PersonWithBirthDate`. Here’s how:

```typescript
interface Person {
    firstName: string;
    lastName: string;
}

interface PersonWithBirthDate extends Person {
    birth: Date;
}
```

This approach ensures that changes to the common fields in `Person` will be automatically applied to `PersonWithBirthDate`.

x??

---

#### Using Mapped Types for Subset Interfaces

Background context: Sometimes, you need a subset of properties from another interface or type. Directly extending the original type might not always fit your needs because it adds all properties from the base interface.

Using mapped types allows you to select specific fields from an existing interface or type and create a new one based on them.

:p How can you define `TopNavState` as a subset of `State` using a mapped type?
??x
You can use a mapped type to pick out selected properties from the base `State` interface. Here’s how:

```typescript
type TopNavState = {
    [K in 'userId' | 'pageTitle' | 'recentFiles']: State[K];
};
```

This syntax iterates over the keys specified and creates a new object with those key-value pairs.

x??

---

#### Extending Interfaces vs. Intersection Types

Background context: In TypeScript, you can extend an interface to add new properties or methods while retaining all existing ones from the base interface. Alternatively, you can use intersection types to combine multiple types into one.

However, extending an interface is more common and straightforward for adding fields compared to using intersection types.

:p How do you define `TopNavState` by extending `State`, instead of creating a mapped type?
??x
You can extend the base `State` interface directly with additional properties in `TopNavState`. Here’s how:

```typescript
interface State {
    userId: string;
    pageTitle: string;
    recentFiles: string[];
    pageContents: string;
}

interface TopNavState extends State {
    // No new fields needed since we are extending the full State
}
```

In this case, `TopNavState` inherits all properties from `State`. You only need to extend it if you want to add new unique fields.

x??

---

#### Using Intersections for Combining Types

Background context: When you have a complex type like `PersonWithBirthDate`, which includes properties of two different interfaces (`Person` and an object with the birth date), you can use intersection types to combine them easily.

Intersection types allow you to merge multiple types into one, keeping all their properties together.

:p How do you define `PersonWithBirthDate` using intersection types?
??x
You can use the intersection operator (&) to combine `Person` and an object with the birth date. Here’s how:

```typescript
type PersonWithBirthDate = Person & { birth: Date; };
```

This approach combines all properties from both `Person` and the specified object, providing a single type that includes all these fields.

x??

---


#### Mapped Types and Generic Types
Mapped types allow you to transform one type into another by iterating over its keys. This is particularly useful for creating subsets of existing interfaces, making your code more concise and avoiding duplication. The generic type `Pick<T, K>` from the TypeScript standard library does this but isn't fully explained here.

:p What is a mapped type in TypeScript?
??x
A mapped type in TypeScript is a type that iterates over the keys of an existing type to transform or filter its properties into a new type. It's akin to looping over fields in an array, where each property can be updated or filtered based on certain conditions.
x??

---

#### Using Pick for Type Selection
`Pick<T, K>` allows you to select specific properties from an interface `T`, making it easier to work with subsets of larger types without duplicating the entire type.

:p How do you use the `Pick` utility type in TypeScript?
??x
You use `Pick` by specifying the original type and the keys you want to retain. For example, if you have a state object with multiple properties but only need some of them:

```typescript
type State = {
    userId: string;
    pageTitle: string;
    recentFiles: File[];
};

// Selecting specific fields from the State interface
type TopNavState = Pick<State, 'userId' | 'pageTitle' | 'recentFiles'>;

// TopNavState is now { userId: string; pageTitle: string; recentFiles: File[]; }
```
x??

---

#### Extracting Tag Types from Union Types
Tagged unions are a common pattern in TypeScript where you have multiple types with a shared property called `type`. You can use indexing to extract just the type.

:p How do you extract the tag type from an action union using indexing?
??x
You can extract the tag type by indexing into the union:

```typescript
interface SaveAction {
    type: 'save';
    // ...
}

interface LoadAction {
    type: 'load';
    // ...
}

type Action = SaveAction | LoadAction;

// Extracting the 'type' property from the union
type ActionType = Action['type'];
```
In this case, `ActionType` would be `'save' | 'load'`.

Alternatively, you can use a mapped type to achieve the same result:

```typescript
type ActionType = Pick<Action, 'type'>;
// This results in { type: "save" | "load"; }
```

However, indexing directly is more concise.
x??

---

#### Creating Partial Types for Update Methods
When designing classes with constructor and update methods, it's common to have similar parameters. The `Partial<T>` utility type can be used to make properties optional.

:p How do you create a partial type using mapped types?
??x
You can use a mapped type to make all the properties of an interface optional:

```typescript
interface Options {
    width: number;
    height: number;
    color: string;
    label: string;
}

// Creating a partial type for options
type OptionsUpdate = {[k in keyof Options]?: Options[k]};
```

Here, `OptionsUpdate` will be `{ width?: number; height?: number; color?: string; label?: string; }`.

Alternatively, you can use the built-in `Partial<T>` utility:

```typescript
class UIWidget {
    constructor(init: Options) { /* ... */ }
    update(options: Partial<Options>) { /* ... */ }
}
```
Both methods achieve the same result but using a mapped type gives you more control over which properties are made optional.
x??

---

#### Inverting Key-Value Pairs with Mapped Types
You can use mapped types to invert key-value pairs in an object, which is useful for creating reverse mappings or other transformations.

:p How do you create a reversed mapping of key-value pairs using a mapped type?
??x
To invert the keys and values in an object:

```typescript
interface ShortToLong {
    q: 'search';
    n: 'numberOfResults';
}

type LongToShort = { [k in keyof ShortToLong as ShortToLong[k]]: k };

// Resulting type is { search: "q"; numberOfResults: "n" }
```

The `as` clause in the mapped type allows you to specify a transformation on the keys. In this case, it's transforming values back into keys.
x??

---


#### Type Inference and Control Flow Analysis

TypeScript, like other modern programming languages, supports type inference to reduce redundancy. This allows developers to write fewer explicit type annotations, making their code more concise and readable.

In statically typed languages like TypeScript, types are inferred based on the context in which variables or expressions are used. Control flow analysis tracks how these types change as the program executes, ensuring type safety without cluttering the code with redundant type information.

:p How does TypeScript handle variable types differently compared to traditional statically typed languages?
??x
TypeScript infers the types of variables at specific locations within your code rather than requiring you to declare them explicitly everywhere. This is known as control flow analysis. For example, in a function like this:

```typescript
function add(a: number, b: number): number {
    return a + b;
}
```

The `number` type for the parameters and return value can be inferred by TypeScript. You don't need to declare them explicitly if you are sure of their types.

This allows you to write more concise code like:

```typescript
function add(a, b) {
    return a + b;
}
```

Here, TypeScript infers `a` and `b` as numbers based on the context in which they are used.
x??

---
#### Redundant Type Annotations

In TypeScript, many developers, especially beginners, tend to over-annotate their code with explicit type declarations. However, this can lead to cluttered and less readable code.

TypeScript has sophisticated type inference capabilities that allow it to automatically determine the types of variables based on context. This means you don't need to declare the type every time, making your code cleaner.

:p Why are explicit type annotations considered redundant in TypeScript?
??x
Explicit type annotations are redundant in TypeScript when the type can be inferred from the context. For example:

Instead of:
```typescript
let x: number = 12;
```

You can simply write:
```typescript
let x = 12;
```

The variable `x` is inferred to have a `number` type by TypeScript.

This approach reduces redundancy and improves code readability, as the editor can still show you the inferred types for clarity. However, it's important to note that in complex scenarios or when the type is not clear from context, explicit annotations may be necessary.
x??

---
#### Control Flow Analysis

Control flow analysis tracks how a variable’s type changes due to surrounding code. This helps TypeScript maintain type safety without requiring developers to write redundant type annotations.

For example, consider an object initialization with inferred types:

```typescript
const person = {
    name: 'Sojourner Truth',
    born: { 
        where: 'Swartekill, NY', 
        when: 'c.1797' 
    },
    died: { 
        where: 'Battle Creek, MI', 
        when: 'Nov. 26, 1883' 
    }
};
```

Here, the types for `name`, `where`, and `when` are inferred by TypeScript.

:p How does control flow analysis work in TypeScript?
??x
Control flow analysis works by tracking how a variable’s type changes as it is used throughout the code. For example:

```typescript
const person = {
    name: 'Sojourner Truth',
    born: { 
        where: 'Swartekill, NY', 
        when: 'c.1797' 
    },
    died: { 
        where: 'Battle Creek, MI', 
        when: 'Nov. 26, 1883' 
    }
};
```

In this example, `person.name` is inferred to be of type `string`, and the nested properties like `born.where` are also inferred to be of type `string`. The same applies to `died.where`.

TypeScript uses these inferences to ensure that operations on variables are type-safe without requiring explicit type annotations at every point.
x??

---


#### Type Inference for Object Literals and Arrays
TypeScript infers types based on object literals and array elements, which can add precision to variable types without explicit annotations. This is generally beneficial but should be balanced with clarity.

:p How does TypeScript infer the type of a function's return value in this context?
??x
TypeScript infers the return type based on the input types and operations performed within the function. For example:

```typescript
function square(nums: number[]) {
    return nums.map(x => x * x);
}
const squares = square([1, 2, 3, 4]); // inferred as const squares: number[]
```

x??

---

#### Precision in Type Inference
TypeScript may infer more precise types than explicitly defined ones. Explicit annotations can sometimes reduce precision and add unnecessary noise.

:p How does explicit annotation on a variable compare to inferring its type?
??x
Explicit annotations can be noisy and less precise compared to letting TypeScript infer the type. For example:

```typescript
const axis1: string = 'x'; // const axis1: string
const axis2 = 'y';         // const axis2: "y"
```

Here, inferring `axis2` as `"y"` is more precise than explicitly annotating it with `string`.

x??

---

#### Refactoring and Type Inference
Type inference allows for easier refactoring. Explicit type annotations can make refactoring harder by creating false errors.

:p How does type inference help in refactoring?
??x
Type inference simplifies refactoring because it automatically adapts to changes in the underlying types without requiring manual updates everywhere. For instance, changing `id` from `number` to `string` in a `Product` interface:

```typescript
interface Product {
    id: string; // Changed from number
    name: string;
    price: number;
}
```

Without explicit annotations, this change would be reflected automatically by TypeScript. With explicit annotations, you might get false errors.

x??

---

#### Destructuring Assignment and Type Inference
Destructuring assignment is a concise way to extract values and can work well with type inference, reducing the need for explicit type annotations in variable declarations.

:p How does destructuring enhance code conciseness and maintainability?
??x
Destructuring allows you to assign variables directly from objects or arrays without needing separate `const` statements. This improves readability and reduces boilerplate code:

```typescript
function logProduct(product: Product) {
    const {id, name, price} = product;
    console.log(id, name, price);
}
```

This version is more concise than explicitly annotating each variable:

```typescript
function logProduct(product: Product) {
    const {id, name, price}: {id: string; name: string; price: number} = product;
    console.log(id, name, price);
}
```

The first version leverages type inference and destructuring to avoid clutter.

x??

---

#### Function Parameter Types
Function parameters require explicit type annotations in TypeScript because the language does not infer types based on parameter usage. You must define the expected type for each function parameter explicitly.

:p Why do we need to annotate function parameters even if they are used within the function?
??x
In TypeScript, you need to provide explicit type annotations for function parameters because the type system infers variable types at their declaration points, not based on where they are used. For example:

```typescript
function logProduct(product: Product) {
    const id = product.id; // needs a type annotation here if `id` is not destructured
}
```

Here, without an explicit type for `id`, TypeScript cannot determine its type from the function's parameter declaration.

x??


#### Type Inference and Annotations
TypeScript infers types based on usage, but sometimes explicit annotations are beneficial for clarity or error reporting. This section discusses when to leave type annotations off versus when to include them.

:p When should you consider leaving type annotations off?
??x
You should consider leaving type annotations off in situations where the type can be inferred from context. For instance:
- Function parameters with default values.
- Callbacks where the library has typed declarations.
```typescript
function parseNumber(str: string, base = 10) {
    // The parameter 'base' will have its type inferred as number due to the default value of 10.
}

app.get('/health', (request, response) => { 
    // Here, TypeScript infers the types for request and response from the Express library's declarations.
});
```
x??

---

#### Excess Property Checking
Explicitly defining a type on an object literal can help catch errors by enabling excess property checking. This ensures that only defined properties are included in the object.

:p Why might you want to specify a type even when it can be inferred for an object literal?
??x
Specifying a type for an object literal enables excess property checking, which helps catch errors if any unexpected or undefined properties are added during its definition. This is particularly useful in larger codebases where errors could otherwise occur elsewhere.

```typescript
const elmo: Product = {
    name: 'Tickle Me Elmo',
    id: '048188 627152', // Explicit type annotation helps catch errors.
    price: 28.99,
};

// Without an annotation, a mistake in the object's definition might result in an error where it’s used:
const furby = {
    name: 'Furby',
    id: 630509430963,
    price: 35,
};
logProduct(furby); // Error reported here, not at the object's definition.
```
x??

---

#### Return Type Annotations
Even if a function return type can be inferred, annotating it is beneficial to avoid implementation errors leaking into function usage. This is especially crucial for exported functions in public APIs.

:p Why might you still want to annotate a function’s return type even when it can be inferred?
??x
Annotating the return type of a function helps catch implementation errors where the function does not conform to its declared return type, ensuring that any discrepancies are caught at the point of definition rather than at the call site.

```typescript
function getQuote(ticker: string): Promise<number> {
    const cache: {[ticker: string]: number} = {};
    
    if (ticker in cache) { 
        // Incorrectly returning a number instead of a promise.
        return cache[ticker]; 
    } 

    return fetch(`https://quotes.example.com/?q=${ticker}`)
        .then(response => response.json())
        .then(quote => {
            cache[ticker] = quote;
            return quote as number; // This should be `Promise.resolve(cache[ticker])`.
        });
}

// Incorrect implementation, but the error is not caught until function call:
getQuote('MSFT').then(considerBuying); 
// Error: Property 'then' does not exist on type 'number | Promise<number>'.
```

To avoid this issue and ensure the correct return type is reported at definition time:

```typescript
function getQuote(ticker: string): Promise<number> {
    const cache: {[ticker: string]: number} = {};
    
    if (ticker in cache) { 
        // Correct implementation with explicit annotation.
        return Promise.resolve(cache[ticker]); 
    } 

    return fetch(`https://quotes.example.com/?q=${ticker}`)
        .then(response => response.json())
        .then(quote => {
            cache[ticker] = quote;
            return quote as number; // Now the error is caught at definition time.
        });
}
```
x??

---


#### Importance of Annotating Return Types

Background context: When you annotate the return type, it helps prevent implementation errors from manifesting as runtime errors in user code. This is especially useful for functions that have multiple return statements like `getQuote`. TypeScript requires explicit type annotations to ensure all return statements return the same type.

If a function has multiple returns and a public API, providing an explicit return type annotation can prevent subtle bugs and make your intentions clearer.

:p Why is it important to annotate the return types in such functions?
??x
Annotating return types ensures that TypeScript checks for consistency across all possible paths of execution. Without annotations, TypeScript infers the most general return type, which might not align with your function's actual purpose. This can lead to errors only during runtime if not caught earlier.

For example:
```typescript
function getQuote(isPositive: boolean): string | null {
    if (isPositive) {
        return "Good news!";
    } else {
        // Implementation for negative quotes omitted.
        return null;
    }
}
```
Adding the explicit type annotation makes it clear that the function can return either a `string` or `null`.

```typescript
function getQuote(isPositive: boolean): string | null {
    if (isPositive) {
        return "Good news!";
    } else {
        // Implementation for negative quotes omitted.
        return null;
    }
}
```
x??

---

#### Use of Named Return Types

Background context: When using a named type, it's helpful to explicitly annotate the return type. This is because TypeScript infers the return type from the values being returned, which might not align with your intended use.

For instance:
```typescript
interface Vector2D {
    x: number;
    y: number;
}

function add(a: Vector2D, b: Vector2D): Vector2D {
    return { x: a.x + b.x, y: a.y + b.y };
}
```
Here, TypeScript infers the return type as `Vector2D`, but it might surprise users who expect to see a named type.

:p What is the advantage of explicitly annotating the return type when using a named type?
??x
Explicitly annotating the return type ensures that both you and your users understand the intended behavior. It makes the API clearer and easier to maintain, as the function's contract (its type signature) is explicit.

```typescript
interface Vector2D {
    x: number;
    y: number;
}

function add(a: Vector2D, b: Vector2D): Vector2D {  // Explicitly annotated return type
    return { x: a.x + b.x, y: a.y + b.y };
}
```
This makes it clear that the function returns an object with `x` and `y` properties, matching the `Vector2D` interface.

x??

---

#### Typescript ESLint Rule for Return Type Annotations

Background context: The `no-inferrable-types` rule in TypeScript ESLint ensures that you only use type annotations when they are necessary. This helps avoid redundant and misleading type information.

:p How does the `no-inferrable-types` rule in TypeScript ESLint work?
??x
The `no-inferrable-types` rule enforces that you explicitly annotate return types unless TypeScript can infer them correctly. This ensures that your code is clean and that type annotations are meaningful.

To use this rule, you would configure it in your `.eslintrc.json` file like so:

```json
{
    "rules": {
        "no-inferrable-types": ["error", { "ignoreUnions": true }]
    }
}
```

With this configuration, TypeScript ESLint will enforce that all return types must be explicitly annotated unless the type can be inferred correctly.

For example:
```typescript
function add(a: number, b: number): number {
    return a + b;  // Explicitly annotated return type (no warning)
}

// Without explicit annotation and with `ignoreUnions` set to true,
// this would produce a warning because the union can be inferred.
function processInput(input: string | null) {
    if (input) {
        return input.toUpperCase();  // No explicit annotation
    } else {
        return "Default";
    }
}
```

x??

---

#### Impact on Compiler Performance

Background context: For large codebases, reducing the amount of work TypeScript needs to do in inferring types can have a positive impact on compiler performance. Explicit type annotations reduce the complexity and improve readability.

:p How does annotating your return types affect compiler performance?
??x
Annotating return types can help improve compiler performance for large projects by reducing the complexity that the TypeScript compiler must handle during inference. When you annotate return types, you provide explicit information to the compiler, which can then optimize its work more effectively.

For instance:
```typescript
function calculateArea(radius: number): number {
    return Math.PI * radius ** 2;  // Explicitly annotated return type
}
```
In contrast, without annotations, TypeScript must infer that `calculateArea` returns a `number`, which might be less efficient for the compiler to determine.

For large codebases, this can have a noticeable impact on build times and overall performance. Therefore, it's beneficial to annotate types when necessary.

x??

---

#### Writing Type Signatures First

Background context: Writing the full type signature first helps you think more clearly about your function’s contract before implementing it. This is akin to test-driven development (TDD) in that you define what the function should do and how it should behave, ensuring that its design aligns with your intended use.

:p Why should you write the full type signature first when implementing a function?
??x
Writing the full type signature first helps ensure that your function's contract is clear from the start. This approach makes it easier to understand what inputs are expected and what outputs will be produced, leading to more robust and maintainable code.

For example:
```typescript
function addVectors(a: Vector2D, b: Vector2D): Vector2D {
    // Implementation details omitted.
}
```
This signature makes it clear that the function expects two `Vector2D` objects and returns a new one. Without this, you might implement it differently during development.

x??

---

#### Avoid Writing Type Annotations

Background context: TypeScript can often infer return types correctly in many cases, making explicit type annotations redundant and potentially misleading. By default, for functions with straightforward return types, the compiler infers the type automatically.

:p In what scenarios should you avoid writing type annotations?
??x
You should avoid writing type annotations when the compiler can infer the same type on its own. For simple return types like primitives or basic objects, explicit annotations add unnecessary complexity and might be misleading if they differ from the inferred type.

For example:
```typescript
function getLength(s: string): number {
    return s.length;
}
```
Here, TypeScript infers that `getLength` returns a `number`, so adding an explicit annotation is redundant:

```typescript
// Redundant and unnecessary in this case.
function getLength(s: string): number {  // Explicitly annotated
    return s.length;
}
```

x??

---

