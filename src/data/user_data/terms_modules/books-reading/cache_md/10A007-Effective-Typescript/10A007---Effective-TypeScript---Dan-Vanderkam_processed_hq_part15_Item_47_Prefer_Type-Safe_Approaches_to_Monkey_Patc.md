# High-Quality Flashcards: 10A007---Effective-TypeScript---Dan-Vanderkam_processed (Part 15)

**Rating threshold:** >= 8/10

**Starting Chapter:** Item 47 Prefer Type-Safe Approaches to Monkey Patching

---

**Rating: 8/10**

#### Monkey Patching in JavaScript
Monkey patching is a technique where you modify or add properties to objects, prototypes, and functions at runtime. This feature is common in dynamic languages like JavaScript but can lead to issues related to type safety and maintainability.

:p What are the primary reasons why monkey patching should generally be avoided?
??x
Monkey patching can introduce global state and side effects into your application, making it harder to reason about the codebase and leading to potential bugs. Additionally, TypeScript may not recognize custom properties added through monkey patching, causing type errors.
x??

---
#### Issues with Monkey Patching in TypeScript
When using TypeScript, adding properties to built-in objects like `window` or `document` can lead to type errors because TypeScript does not recognize these additions by default.

:p Why do you get type errors when performing operations on patched global variables in TypeScript?
??x
TypeScript's static typing system does not know about the additional properties added through monkey patching. Therefore, it will throw errors if you try to access or assign values to these properties without proper typing annotations.
x??

---
#### Using Augmentations for Monkey Patching
Augmentations allow you to extend the type definitions of existing objects in TypeScript, effectively adding new properties and their types.

:p How can augmentations be used to fix type errors caused by monkey patching?
??x
By using `declare global` along with an interface augmentation, you can inform TypeScript about additional properties that might be added at runtime. This way, the type checker will not throw errors when accessing these properties.
```typescript
declare global {
    interface Window {
        user: User | undefined;
    }
}
```
x??

---
#### Handling Race Conditions in Augmentations
When augmenting a global object like `window` with new properties that might be set after your application starts, you need to handle the possibility of these properties not being defined.

:p How can you address race conditions when using augmentations for monkey patching?
??x
You can define the augmented property with an optional type or explicitly check if it is defined before accessing it. For example:
```typescript
declare global {
    interface Window {
        user: User | undefined;
    }
}

// In a function
if (window.user) {
    alert(`Hello ${window.user.name}.`);
}
```
x??

---
#### Inline Initialization for Global Variables
Another approach to avoid race conditions is by initializing the global variable directly in the HTML, making it available before any JavaScript runs.

:p How can you initialize a global variable via inline script tags?
??x
You can define and initialize the global variable directly within an `<script>` tag in the HTML:
```html
<script type="text/javascript">
    window.user = { name: 'Bill Withers' };
</script>
```
This ensures that the variable is always available, avoiding race conditions.
x??

---
#### Using Narrower Type Assertions
Instead of using `any` for monkey patching, you can define a custom type with the added properties to maintain better type safety.

:p How does using a narrower type assertion help in managing global variables?
??x
Using a custom type like `MyWindow` that extends the original `window` type and includes the patched property allows for more precise typing while avoiding the pitfalls of `any`. This also helps with code organization by not polluting the global scope.
```typescript
type MyWindow = (typeof window) & { user: User | undefined; }
```
x??

---
#### Trade-offs in Augmentation Approaches
While augmentations provide better type safety and documentation, they come with certain trade-offs such as global modifications or handling race conditions.

:p What are the main downsides of using interface augmentations for monkey patching?
??x
The primary downsides include:
- Global scope pollution: The augmented types affect all parts of your code.
- Handling race conditions: You need to ensure that the properties are defined before accessing them, which can be complex in dynamic applications.
- Lack of encapsulation: Augmented types are visible and usable throughout the application, making it harder to manage dependencies.
x??

---

**Rating: 8/10**

#### Structured Code vs. Global Data
Background context explaining why structured code is preferred over storing data in globals or on the DOM.
:p What are the benefits of using structured code over global variables and DOM storage?
??x
Structured code helps maintain clarity, reduces bugs due to accidental changes, and promotes better testing practices. By avoiding global state, you make your code more predictable and easier to reason about.

```typescript
// Example: Using a class for structured data
class User {
    private name: string;
    constructor(name: string) {
        this.name = name;
    }

    getName(): string {
        return this.name;
    }
}
```
x??

---

#### Type Safety in TypeScript
Background context explaining the concept of type safety and why it is important.
:p What does "sound" mean in the context of TypeScript, and why might a language like TypeScript not always be sound?
??x
A language is considered "sound" if the static type of every symbol (variable) accurately represents its runtime value. However, TypeScript is designed to be flexible enough to support JavaScript, which means it cannot enforce all possible types of type safety due to the nature of JavaScript.

```typescript
// Example: Sound and unsound in TypeScript
const x = Math.random(); // Sound, as static type `number` matches potential runtime values.
const xs = [0, 1, 2]; // Unsound, as static type `number[]` does not account for undefined at index 3.
```
x??

---

#### Generic Types and Soundness
Background context explaining the trade-off between generic types and soundness in TypeScript.
:p How do generic types affect soundness in TypeScript?
??x
Generic types increase expressiveness by allowing more precise type definitions, but they also introduce potential sources of unsoundness. For instance, using generic types without proper null checks can lead to runtime errors.

```typescript
// Example: Using generics with strictNullChecks enabled
const safeArray = <T>(value: T): T[] => [value];

let result: number[] = safeArray<number>(2); // Sound if the input is always a number.
```
x??

---

#### Handling Undefined in TypeScript
Background context explaining why undefined should be considered when inferring types in TypeScript.
:p How can you ensure that `undefined` is included in your type inference to avoid runtime errors?
??x
To handle `undefined`, you need to explicitly include it in your type definitions or use the union type approach. This ensures that `undefined` is accounted for during static analysis, reducing the risk of runtime errors.

```typescript
// Example: Including undefined in a type definition
const xs = [0, 1, 2, undefined] as const; // Type assertion to include undefined.
```
x??

---

#### Soundness Traps and Trade-offs
Background context explaining the concept of soundness traps and trade-offs between expressiveness and soundness.
:p What are some common sources of unsoundness in TypeScript?
??x
Common sources of unsoundness in TypeScript include array out-of-bound access, accessing properties on `undefined`, and using type assertions that do not accurately reflect runtime behavior.

```typescript
// Example: Array out-of-bound access leading to unsoundness
const xs = [0, 1, 2];
const x = xs[3]; // Unsound, as the static type infers a number but at runtime, it can be undefined.
```
x??

---

#### StrictNullChecks in TypeScript
Background context explaining how strict null checks impact soundness and expressiveness.
:p How does enabling `strictNullChecks` affect TypeScript's type system?
??x
Enabling `strictNullChecks` enhances the type safety by requiring explicit null type annotations, which can make some operations more cumbersome but help catch bugs earlier. This feature improves the overall soundness of the code.

```typescript
// Example: Enabling strictNullChecks
function safeLog(x: number | null): void {
    if (x !== null) {
        console.log(x.toFixed(1));
    }
}
```
x??

---

#### Soundness vs. Flexibility in TypeScript
Background context explaining the balance between soundness and flexibility.
:p Why is soundness not a design goal for TypeScript?
??x
TypeScript prioritizes flexibility over strict soundness to maintain compatibility with JavaScript. Enforcing soundness would make TypeScript less expressive, potentially limiting its ability to model complex JavaScript patterns.

```typescript
// Example: Trade-offs in type systems
const x = Math.random(); // Sound as static type `number` matches potential runtime values.
const xs = [0, 1, 2]; // Unsound due to possibility of undefined at runtime.
```
x??

**Rating: 8/10**

---

#### TypeScript's Inaccurate Model of Variance for Objects and Arrays
Background context: This concept highlights a common issue in TypeScript where arrays and objects can be assigned to each other based on their properties, leading to potential runtime errors if not handled carefully. The core issue is that TypeScript does not enforce strict variance rules when dealing with object types, particularly in the context of method parameters and function calls.

:p What are the issues with assigning Hen[] to Animal[] in TypeScript?
??x
In TypeScript, you can assign a `Hen[]` array to an `Animal[]` array because arrays are covariant. However, this assignment does not guarantee that any operations on the array will preserve type safety. For example, if you push a `Fox` into the `Animal[]`, it could lead to unexpected behavior or runtime errors.

```typescript
const henhouse: Hen[] = [new Hen()];
const animals: Animal[] = henhouse; // This is allowed.
animals.push(new Fox()); // Now we have a Fox in our Hen array!
```
x??

---

#### Readonly Annotation for Function Parameters
Background context: The readonly annotation in TypeScript can be used to enforce immutability on function parameters, ensuring that the function cannot alter the passed-in data. This helps maintain type safety and prevents accidental mutations of the original data.

:p Why is it recommended to use `readonly` when passing arrays or objects as function parameters?
??x
Using `readonly` ensures that the function cannot mutate the array or object passed in as a parameter. This provides a safer way to work with complex types, ensuring type safety and preventing unexpected changes.

```typescript
function addFoxOrHen(animals: readonly Animal[]) { 
    // animals.push(Math.random() > 0.5 ? new Fox() : new Hen()); // Error: Property 'push' does not exist on type 'readonly Animal[]'.
}
```
x??

---

#### Function Calls Don’t Invalidate Refinements
Background context: This concept explains how TypeScript's type system can sometimes fail to correctly track the types of objects after a function call, especially when dealing with optional properties. The issue arises because function calls do not invalidate refinements made earlier in the code.

:p How does the `processFact` function demonstrate the failure of refinement invalidation?
??x
The `processFact` function demonstrates that even though we have checked for the presence of an author and performed a type refinement, calling another function can revert this refinement back to its original state. This means that after the call to `processor(fact)`, TypeScript no longer knows whether `fact.author` is defined or not.

```typescript
function processFact(fact: FunFact, processor: (fact: FunFact) => void) {
    if (fact.author) { 
        processor(fact); 
        console.log(fact.author.blink());  // Error: Property 'blink' does not exist on type 'string | undefined'.
    }
}

processFact(
    { fact: 'Peanuts are not actually nuts', author: 'Botanists' },
    f => delete f.author
);
```
x??

---

**Rating: 8/10**

---
#### Avoiding Mutations of Function Parameters
Background context explaining why avoiding mutations is important. In JavaScript, functions typically do not modify their parameters directly because doing so can cause unintended side effects and make code harder to reason about. To enforce that callbacks do not mutate function parameters, you can pass them a `Readonly` version of the object.

:p How can you ensure that function parameters are not mutated?
??x
By using TypeScript’s `Readonly` utility type or similar patterns in other programming languages to prevent modifications of passed-in objects or arrays. This ensures that any operations within the function will only read from but never write to the parameter.
```typescript
interface Person {
    name: string;
}

const getPersonName = (person: Readonly<Person>) => {
    console.log(person.name);
};
```
x??

---
#### Structural Typing and Excess Property Checking
Background context explaining structural typing, where an object can have extra properties beyond those declared in the type. This means that TypeScript allows objects with additional properties to be assigned to types without causing errors.

:p Why might an assignment from one type to another violate soundness?
??x
An assignment could violate soundness if it assigns an object with extra incompatible properties to a more specific type where such properties do not exist or are marked as optional. For example, assigning `{name: 'Serena', age: '42 years'}` to `Person` and then to `PossiblyAgedPerson` can lead to unexpected behavior because the string value of `age` is incompatible with its expected numeric type.
```typescript
interface Person {
    name: string;
}

interface PossiblyAgedPerson extends Person {
    age?: number;
}

const p1 = { name: "Serena", age: "42 years" };
const p2: Person = p1; // This is sound because {name: 'Serena', age: '42 years'} is assignable to Person
const p3: PossiblyAgedPerson = p2; // This leads to unsoundness due to the string 'age'
```
x??

---
#### Optional Properties and Unsoundness
Background context explaining optional properties and how they can introduce inconsistencies or errors in TypeScript. Optional properties allow for additional properties beyond those declared, which can lead to unexpected behavior when assigned to more specific types.

:p What issue arises from using optional properties with structural typing?
??x
The issue is that if a type has an optional property, assigning an object to it might include incompatible extra properties, leading to unsoundness. For example, in the given code, `age` being defined as a string violates its expected numeric type when assigned to `PossiblyAgedPerson`.
```typescript
interface Person {
    name: string;
}

interface PossiblyAgedPerson extends Person {
    age?: number;
}

const p1 = { name: "Serena", age: "42 years" };
const p2: Person = p1; // Sound assignment, {name: 'Serena', age: '42 years'} is assignable to Person
const p3: PossiblyAgedPerson = p2; // Unsound because the string value of `age` is incompatible with its expected number type.
```
x??

---
#### Choosing Specific Property Names
Background context explaining how generic property names like `type` can cause naming conflicts and lead to errors.

:p Why should you choose specific property names when using optional properties?
??x
To avoid naming collisions that can lead to type incompatibilities. For example, instead of using a generic name like `age`, use more specific names such as `ageInYears` or `ageFormatted`. This helps prevent unexpected behavior and ensures the object's structure aligns with its declared types.
```typescript
interface Person {
    name: string;
}

interface PossiblyAgedPerson extends Person {
    ageInYears?: number; // More specific property name
    ageFormatted?: string; // Another specific property name
}

const p1 = { name: "Serena", ageInYears: 42, ageFormatted: "42 years" };
```
x??

---
#### Unsoundness and Other Issues with Optional Properties
Background context explaining the broader implications of using optional properties. It highlights that unsoundness is one problem among others when using optional properties in TypeScript.

:p What are some other issues to consider before adding optional properties?
??x
When considering optional properties, you should also be aware of potential issues like name collisions, type safety concerns, and increased complexity. These can lead to runtime errors or unexpected behavior if not handled carefully.
```typescript
// Example of a problematic property name collision
interface Item {
    type: string;
}

interface DetailedItem extends Item {
    // This could conflict with the `type` in Item
    type?: number; // Potential naming conflict
}
```
x??

---

**Rating: 8/10**

#### Any Types and Their Impact on Type Safety

Background context explaining any types and their impact on type safety. Note that even with `noImplicitAny` enabled, any types can still enter your program through explicit any types or third-party type declarations.

:p How do any types affect type safety in TypeScript programs?
??x
Any types significantly reduce the benefits of using a statically typed language like TypeScript by introducing dynamic typing into parts of your code. This lack of strong typing can lead to runtime errors that could have been caught at compile time if more precise types were used. Even with `noImplicitAny` enabled, any types can still enter your program through explicit type assertions or third-party type declarations.

Even though you may not use the word "any" explicitly in your code, these any types can flow through your project and undermine its overall type safety. Tracking the number of symbols that have any types is a good practice to ensure ongoing improvement in type safety.
x??

---

#### Tracking Type Coverage

Background context on how tracking type coverage helps prevent regressions in type safety by keeping an eye on the percentage of non-any types in your codebase.

:p How does tracking type coverage help maintain type safety?
??x
Tracking type coverage is crucial because it quantifies the extent to which your TypeScript project uses precise, non-ambiguous types. By running tools like `type-coverage`, you can get a numerical score indicating how well-typed your program is. This metric helps identify areas where any types may have snuck in and need attention. A drop in this percentage suggests that some parts of the codebase might no longer be as type-safe as they should be, encouraging continuous improvement.

For example, running `type-coverage` with the `--detail` flag can reveal specific locations where any types are used:
```bash
npx type-coverage --detail path/to/code.ts
```
This command will output detailed information about every occurrence of any types in your code, allowing you to focus on and resolve these issues.

---
#### Explicit Any Types

Background context on how explicit any types can arise from expedient coding practices or oversight. These types can be problematic if they are not revisited for accuracy and specificity over time.

:p What are the implications of using explicit any types in your TypeScript code?
??x
Using explicit any types, such as `any[]` or `{[key: string]: any}`, is a common expedient to resolve type issues quickly. However, these any types can lead to loss of valuable type information and reduced type safety. For instance, if you have a function that returns an object of unknown structure but you decide to use `any`, like:
```typescript
function getColumnInfo(name: string): any {
    return utils.buildColumnInfo(appState.dataSchema, name);
}
```
Later, if the actual return value from `utils.buildColumnInfo` is more specific (e.g., it returns a `ColumnDescription` object), keeping the type as `any` would be wasteful and could mask potential issues.

Removing unnecessary any types improves type safety by making your codebase more robust against runtime errors.
x??

---

#### Third-Party Type Declarations

Background context on how third-party type declarations can introduce any types into your project, even with `noImplicitAny` enabled. This is particularly insidious because the any types might come from unofficial or buggy type declarations.

:p How do third-party type declarations contribute to issues of any types in TypeScript projects?
??x
Third-party type declarations can introduce any types into your project silently, even if you have `noImplicitAny` set. For example, declaring a module as `any`:
```typescript
declare module 'my-module';
```
allows you to import anything from that module without TypeScript complaining about types.

Consider the following scenario where you use such an any type declaration:
```typescript
import { someMethod, someSymbol } from 'my-module';

const pt1 = { x: 1, y: 2 };
const pt2 = someMethod(pt1, someSymbol);
```
Here, `someMethod` and `someSymbol` could have any types due to the module being declared as `any`. This can lead to unexpected runtime behavior if you pass in or return incorrect types.

It is important to revisit third-party type declarations periodically to ensure they are up-to-date and accurate. Tools like `@types` should be kept updated, and contributions back to the community with more precise typing can help maintain robust type safety.
x??

---

#### Highlighting Any Types

Background context on how tools like `type-coverage` can provide visual cues for any types in your editor, helping you identify and resolve issues quickly.

:p How does `type-coverage` assist in identifying any types in TypeScript projects?
??x
The `type-coverage` tool helps by highlighting any types directly in your editor, giving you a clear indication of where type safety might be compromised. It provides numerical feedback on the percentage of non-any symbols in your codebase.

For example:
```bash
npx type-coverage 9985 / 10117 98.69 percent
```
This output tells you that 98.69% of symbols in your project have explicit types, while the remaining 1.31% are any or aliases to any.

Using `type-coverage` with the `--detail` flag can show exactly where any types appear:
```bash
npx type-coverage --detail path/to/code.ts
```
This will output detailed information about every occurrence of any types, helping you pinpoint and address these issues proactively.
x??

---

