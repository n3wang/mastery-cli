# High-Quality Flashcards: 10A007---Effective-TypeScript---Dan-Vanderkam_processed (Part 14)

**Rating threshold:** >= 8/10

**Starting Chapter:** Item 44 Prefer More Precise Variants of any to Plain any

---

**Rating: 8/10**

#### Prefer More Precise Variants of any
Background context: In TypeScript, using `any` can lead to a loss of type safety and make debugging harder. It's generally better to use more specific types when possible to ensure that your code is as robust as it could be.

:p What are the disadvantages of using `any` in TypeScript functions?
??x
Using `any` can lead to several issues:
- Loss of type checking, meaning you won't get compile-time errors for invalid operations.
- The function return type will also be inferred as `any`, making the function less useful when calling it or receiving its result.

Example code where using any leads to problems:
```typescript
function getLengthBad(array: any) {
    // Don't do this.
    return array.length;
}

getLengthBad(/123/);  // No error, returns undefined
```
x??

---

#### Using Specific Types Instead of any[]
Background context: When you expect a specific type such as an array or object, it's better to use the appropriate specific type instead of `any`. This improves code safety and readability.

:p What are the benefits of using more specific types like `any[]` over `any` in TypeScript?
??x
Using more specific types like `any[]` offers several advantages:
- Type checking is performed on array operations, ensuring that only valid array methods can be called.
- The function return type is inferred as `number`, making it clearer what the function returns.
- Call checks ensure that parameters are of the expected type.

Example code comparing using `any` and `any[]`:
```typescript
function getLengthBad(array: any) {
    // Don't do this.
    return array.length;
}

function getLength(array: any[]) {
    // This is better
    return array.length;
}

getLength(/123/);  // Error: Argument of type 'RegExp' is not assignable to parameter of type 'any[]'.
```
x??

---

#### Using {[key: string]: any} for Dynamic Objects
Background context: When you expect an object that might have varying keys, using `{[key: string]: any}` or `Record<string, any>` allows for flexibility in the object's structure.

:p What is the difference between using a specific object type and `{[key: string]: any}` when expecting dynamic objects?
??x
Using a specific object type like `object` vs. `{[key: string]: any}` (or `Record<string, any>`) has different implications:
- Using `object` implies that the object can have properties of any non-primitive types.
- You can still iterate over keys but cannot access values directly without type assertion.

Example code showing iteration with specific and dynamic object types:
```typescript
function hasAKeyThatEndsWithZ(o: Record<string, any>) {
    for (const key in o) {
        if (key.endsWith('z')) {
            console.log(key, o[key]);
            return true;
        }
    }
    return false;
}

// Using `object` type:
function hasAKeyThatEndsWithZObject(o: object) {
    for (const key in o) {  // Error: Element implicitly has an 'any' type
        if (key.endsWith('z')) {
            console.log(key, o[key]);
            return true;
        }
    }
    return false;
}
```
x??

---

#### Using void with Functions
Background context: When you expect a function that returns `void` or any specific function signature, it's better to define the type explicitly instead of using `any`.

:p What are some ways to handle different function signatures when not caring about their return values?
??x
Handling function signatures explicitly can help maintain type safety and clarity:
- Use `() => any` for functions with no parameters.
- Use `(arg: any) => any` for functions with one parameter.
- Use `(...args: any[]) => any` for functions with multiple parameters.

Example code showing different function types:
```typescript
type Fn0 = () => any;  // Any function callable with no params
type Fn1 = (arg: any) => any;  // With one param
type FnN = (...args: any[]) => any;  // With any number of params, same as "Function"
```
x??

---

**Rating: 8/10**

#### Prefer More Precise Types Over `any[]` for Rest Parameters
Background context: In TypeScript, rest parameters can be used to accept a variable number of arguments. The type `any[]` allows any JavaScript value as an argument but is less precise compared to more specific types like `unknown[]`. Using more precise types enhances code safety and maintainability.
:p What is the difference between using `any` and `unknown[]` for rest parameters?
??x
Using `any` allows any JavaScript value, which can introduce type safety issues. On the other hand, `unknown[]` is safer because it requires you to explicitly narrow down the types before using them. This means that TypeScript will not allow operations on elements until they are checked, reducing potential runtime errors.
```typescript
const numArgsBad = (...args: any) => args.length; // returns any
const numArgsBetter = (...args: unknown[]) => args.length; // returns number after checking each element's type
```
x??

---

#### Prefer `unknown[]` Over `any[]` for Less Precise Arrays
Background context: When you need an array but don’t care about the specific types of its elements, using `any[]` can be tempting. However, `unknown[]` is generally safer because it requires you to explicitly narrow down the types before operations are performed.
:p Why would one prefer `unknown[]` over `any[]` for arrays?
??x
Using `unknown[]` is preferable over `any[]` because it enforces a level of safety. TypeScript will not allow operations on elements until they are checked, reducing potential runtime errors. This requires more explicit type checking but improves the overall robustness and maintainability of your code.
```typescript
async function fetchPeak(peakId: string): Promise<unknown> {
    return checkedFetchJSON(`/api/mountain-peaks/${peakId}`);
}
```
x??

---

#### Prefer Type Signatures Over Unsafe Implementations in Public APIs
Background context: When designing functions, it is crucial to prioritize the type signature over the implementation. The type signature represents the public API of your function and should reflect what users can expect from it. Safe implementations that avoid type assertions are preferred because they ensure a clean interface for users.
:p Why should you prefer the type signature over an unsafe implementation in public APIs?
??x
You should prefer the type signature because it is visible to users and other parts of the codebase. An unsafe implementation with type assertions or `any` types may pass internal tests but can lead to runtime errors when used elsewhere. A well-defined, safe API ensures that functions work as expected without requiring users to make additional checks.
```typescript
export async function fetchPeak(peakId: string): Promise<MountainPeak> {
    return checkedFetchJSON(`/api/mountain-peaks/${peakId}`);
}
```
x??

---

#### Safe Fetch Wrapper with `unknown` Type
Background context: A wrapper function can add safety to API calls by checking the response and setting a more specific type. In this example, `checkedFetchJSON` returns `unknown`, which is safer than `any`. However, you need to ensure that the return value matches the expected type.
:p What is the problem with using `unknown` in the `fetchPeak` function?
??x
The main issue with using `unknown` in the `fetchPeak` function is that it prevents the TypeScript compiler from inferring the correct type for the returned data. This leads to a type error when trying to use the result directly.
```typescript
async function fetchPeak(peakId: string): Promise<MountainPeak> {
    return checkedFetchJSON(`/api/mountain-peaks/${peakId}`); // Type 'unknown' is not assignable to type 'MountainPeak'.
}
```
x??

---

#### Using `unknown` for Safe API Calls
Background context: When making API calls, it’s important to handle the response safely. Using `unknown` allows you to inspect and cast the data appropriately before using it in your code. This prevents potential runtime errors.
:p How can you use `unknown` effectively in an API call?
??x
You can use `unknown` to safely receive a JSON response from an API and then cast it to the expected type or perform explicit checks. For example, after fetching data, you can inspect its structure before using it in your codebase.
```typescript
export async function fetchPeak(peakId: string): Promise<MountainPeak> {
    const result = await checkedFetchJSON(`/api/mountain-peaks/${peakId}`);
    if (result instanceof MountainPeak) {
        return result;
    } else {
        throw new Error('Unexpected response format');
    }
}
```
x??

---

**Rating: 8/10**

#### Type Assertions and Assertions in TypeScript

Background context: In TypeScript, type assertions are used to tell the compiler that you expect a certain type for an expression. However, overusing or incorrectly using type assertions can lead to runtime errors. It is better to keep type signatures clean and add type assertions or assertions within function bodies where necessary.

:p What is the benefit of localizing type assertions in functions?
??x
By localizing type assertions, you make your code more maintainable and safer. Type assertions hidden away in the function implementation allow calling code to be written cleanly without any knowledge of potential unsafe secrets. Additionally, it makes it easier to improve safety by adding validations or shape checks within the function.

```typescript
export async function fetchPeak(peakId: string): Promise<MountainPeak> {
    const maybePeak = checkedFetchJSON(`/api/mountain-peaks/${peakId}`);
    if (maybePeak && typeof maybePeak === 'object' && 'firstAscentYear' in maybePeak) {
        throw new Error(`Invalid mountain peak: ${JSON.stringify(maybePeak)}`);
    }
    return checkedFetchJSON(`/api/mountain-peaks/${peakId}`) as Promise<MountainPeak>;
}
```
x??

---
#### Overloading Functions for Type Hiding

Background context: Function overloading can be used to provide different type signatures that callers see versus the implementation. This helps in hiding internal type assertions and ensuring cleaner calling code.

:p How does function overloading help in managing types?
??x
Function overloading allows you to present a specific type signature to the caller while implementing with another signature internally. This way, the external interface remains clean, but the internal logic can handle more complex operations without exposing unsafe type assertions directly to the user.

```typescript
export async function fetchPeak(peakId: string): Promise<MountainPeak>;
export async function fetchPeak(peakId: string): Promise<unknown> {
    return checkedFetchJSON(`/api/mountain-peaks/${peakId}`); // OK
}

const denali = fetchPeak('denali'); // ^? const denali: Promise<MountainPeak>
```
x??

---
#### Handling Type Checking and Assertions in Functions

Background context: Sometimes, the TypeScript type checker cannot infer certain types correctly. To handle this, you can perform type checks or assertions within your function to ensure that data is as expected before using it.

:p What are some methods for handling type checking within functions?
??x
You can use explicit type assertions along with validations inside the function body to ensure that the data matches the expected shape and types. This approach keeps the calling code clean while allowing internal checks to be performed safely.

```typescript
export async function fetchPeak(peakId: string): Promise<MountainPeak> {
    const maybePeak = checkedFetchJSON(`/api/mountain-peaks/${peakId}`);
    if (maybePeak && typeof maybePeak === 'object' && 'firstAscentYear' in maybePeak) {
        throw new Error(`Invalid mountain peak: ${JSON.stringify(maybePeak)}`);
    }
    return checkedFetchJSON(`/api/mountain-peaks/${peakId}`) as Promise<MountainPeak>;
}
```
x??

---
#### Shallow Object Equality Check

Background context: When checking if two objects are shallowly equal, you need to ensure that both have the same keys and corresponding values. However, TypeScript may not infer certain types correctly during this process.

:p How can you perform a shallow object equality check in TypeScript?
??x
To perform a shallow object equality check, you need to validate that all keys present in one object are also present in the other and that their corresponding values match. This ensures that the objects have the same structure and content without deep diving into nested properties.

```typescript
function shallowObjectEqual(a: object, b: object): boolean {
    for (const [k, aVal] of Object.entries(a)) {
        if (!(k in b) || aVal !== b[k]) { // Corrected to use === instead of .==
            return false;
        }
    }
    return Object.keys(a).length === Object.keys(b).length;
}
```
x??

---

**Rating: 8/10**

#### Unknown Type vs Any Type
Background context: The `unknown` type is introduced as a safer alternative to using `any` when you have values but don't know their exact types. This helps maintain stricter type safety and enables better error messages from TypeScript.
:p What is the main difference between `unknown` and `any` in TypeScript?
??x
The main difference lies in how they handle type checking:
- `any`: Allows any value to be assigned, making it a superset of all types. This can lead to less safe code but provides more flexibility.
- `unknown`: Enforces that the type is known before using its properties or methods. Any operation on an `unknown` type results in an error if not narrowed down properly.

Code examples:
```typescript
function processValue(value: any) {
  value.read(); // No error, could be anything
}

function safeProcessValue(value: unknown) {
  if (value instanceof Date) { 
    value; // ^? (parameter) value: Date 
  } else {
    throw new Error("Unknown type");
  }
}
```
x??

---

#### Return Type of parseYAML Method
Background context: The `parseYAML` method is designed to return a structured object, but using `any` as the return type would defeat the purpose of TypeScript's static typing. Instead, returning `unknown` allows for better error messages and forces users to narrow down the type.
:p Why should the `parseYAML` method use `unknown` instead of `any`?
??x
Using `unknown` ensures that the resulting value is checked more rigorously by TypeScript:
- TypeScript won't allow operations on an `unknown` value unless it's explicitly narrowed down, leading to more precise type errors.
- This encourages users to provide additional type assertions or narrow the type themselves.

Code example:
```typescript
function safeParseYAML(yaml: string): unknown {
  return parseYAML(yaml);
}

const book = safeParseYAML(`name: Wuthering Heights author: Emily Brontë`);
console.log(book.title); // Error: Property 'title' does not exist on type 'unknown'
```
x??

---

#### Type Narrowing with instanceof and User-Defined Guards
Background context: To work with values of the `unknown` type, you can use a combination of TypeScript's built-in checks like `instanceof` or user-defined guards. These methods help narrow down the unknown type to something more specific.
:p How can you use `instanceof` and user-defined type guards for narrowing down an `unknown` value?
??x
You can use `instanceof` to check if a value is of a certain class, or define a user-defined type guard function that returns a boolean indicating the type.

Code examples:
```typescript
function processValue(value: unknown) {
  if (value instanceof Date) { 
    // value is narrowed down to Date
    value; // ^? (parameter) value: Date
  }
}

// User-defined type guard
function isBook(value: unknown): value is Book {
  return (
    typeof value === 'object' &&
    value !== null &&
    'name' in value && 'author' in value
  );
}

function processValue(value: unknown) {
  if (isBook(value)) { 
    // value is narrowed down to Book
    value; // ^? (parameter) value: Book
  }
}
```
x??

---

#### Type Parameters vs `unknown` for Function Return Types
Background context: While using a type parameter like `<T>` might seem more flexible, it often leads to unnecessary complexity. The use of `unknown` combined with explicit type assertions is generally safer and clearer.
:p Why should you prefer returning `unknown` over using a generic type parameter in the `safeParseYAML` method?
??x
Using `unknown` is preferred because:
- It enforces stricter type safety by preventing operations on unknown values until they are properly narrowed down.
- Users are forced to assert or narrow the type themselves, leading to clearer and more maintainable code.

Code examples:
```typescript
function safeParseYAML(yaml: string): unknown {
  return parseYAML(yaml);
}

const book = safeParseYAML(`name: Wuthering Heights author: Emily Brontë`);
console.log(book.title); // Error: Property 'title' does not exist on type 'unknown'
```
x??

---

#### Using `object` and `{}` Types
Background context: While `unknown` is often the best choice, there are cases where you might use other broad types like `object` or `{}`. These types are slightly narrower than `unknown`, but still allow a wide range of values.
:p How do `object`, `{}`, and `unknown` differ in their usage?
??x
The differences between these types are subtle:
- `unknown`: Enforces that the type is known before using its properties or methods, leading to more precise error messages.
- `{}`: Consists of all values except `null` and `undefined`. Allows primitives like strings and numbers but not objects.
- `object`: Consists of non-primitive types (objects, arrays, functions).

Code examples:
```typescript
declare const foo: Foo;
let barAny = foo as any as Bar; // Using 'any'
let barUnk = foo as unknown as Bar; // Using 'unknown'
```
x??

---

