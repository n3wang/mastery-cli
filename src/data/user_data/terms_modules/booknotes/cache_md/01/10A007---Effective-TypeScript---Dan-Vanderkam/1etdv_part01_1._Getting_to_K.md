# High-Quality Flashcards: 10A007---Effective-TypeScript---Dan-Vanderkam_processed (Part 1)


**Starting Chapter:** 1. Getting to Know TypeScript. Item 1 Understand the Relationship Between TypeScript and JavaScript

---


#### Understanding TypeScript and JavaScript Relationship
Background context explaining the relationship between TypeScript and JavaScript. Since these languages are closely linked, a strong understanding of their interplay is essential for effective use of TypeScript.

:p What does it mean when someone says "TypeScript is a superset of JavaScript"?
??x
TypeScript is said to be a superset of JavaScript in a syntactic sense, meaning that any valid JavaScript code can also be valid TypeScript code as long as there are no syntax errors. This relationship allows you to write JavaScript and have it recognized by TypeScript without changes.

```typescript
// Example of a simple JavaScript function in TypeScript (no syntax change needed)
function greet(name: string): void {
    console.log(`Hello, ${name}!`);
}

greet("Alice");
```
x??

---
#### TypeScript File Extensions
Background context on file extensions used for TypeScript files. .ts is the extension for TypeScript files, whereas JavaScript files use .js.

:p Why do TypeScript files have a .ts extension instead of .js?
??x
TypeScript files having a .ts extension helps distinguish them from regular JavaScript files and indicates that the file might contain type definitions or other TypeScript-specific syntax. However, renaming a .js file to .ts does not change its content; it remains valid JavaScript.

```typescript
// Example of renaming a JavaScript file to .ts (no code changes needed)
// main.js can be renamed to main.ts without changing its content.
// main.ts: 
console.log("Hello TypeScript!");
```
x??

---
#### Migration Path from JavaScript to TypeScript
Background context on the ease of migrating existing JavaScript projects to TypeScript. The ability to start using TypeScript with minimal code changes is one of its key advantages.

:p Why can you migrate an existing JavaScript project to TypeScript without rewriting it in another language?
??x
You can migrate a JavaScript project to TypeScript without rewriting because TypeScript is a superset of JavaScript. Any valid JavaScript code is also valid TypeScript, provided there are no syntax errors. This means renaming files from .js to .ts allows you to leverage TypeScript's features while retaining the original codebase.

```typescript
// Renaming main.js to main.ts preserves the code structure and functionality.
// main.ts:
console.log("Migrating with ease!");
```
x??

---
#### Type System in TypeScript
Background context on the type system in TypeScript. The type system has some unique aspects that differentiate it from JavaScript, such as additional syntax for specifying types.

:p What are some unusual aspects of TypeScript's type system?
??x
TypeScript's type system introduces additional syntax to specify and enforce types at various levels of detail. For example, you can define interfaces, enums, and union types, which provide more strict typing compared to JavaScript’s dynamic typing.

```typescript
// Example of defining a simple interface in TypeScript
interface Person {
    name: string;
    age: number;
}

const person: Person = {
    name: "Alice",
    age: 30
};
```
x??

---
#### Summary of Key Points
This flashcard provides a summary of the key concepts discussed, including the relationship between TypeScript and JavaScript, file extensions, migration paths, and type system features.

:p What are some main points covered in this chapter about TypeScript?
??x
Key points include:
- TypeScript is a superset of JavaScript.
- .ts files can be used to write valid JavaScript code.
- Renaming existing JavaScript files to .ts allows for gradual adoption without rewriting the entire codebase.
- TypeScript introduces additional type-related syntax that enhances static typing and code quality.

```typescript
// Example showing how renaming works (no change in content)
// main.js:
console.log("Hello, world!");

// Renamed to:
// main.ts:
console.log("Hello, world!");
```
x??


#### TypeScript vs JavaScript
Background context: The text discusses the differences between TypeScript and plain JavaScript, highlighting how TypeScript offers additional features like type annotations that help catch errors before runtime. It emphasizes that while all TypeScript is a subset of JavaScript, not all JavaScript can be interpreted as TypeScript without encountering syntax issues.
:p What are the key differences between TypeScript and plain JavaScript mentioned in the text?
??x
TypeScript introduces type annotations which allow for static typing, helping to identify potential errors at compile time rather than runtime. Plain JavaScript does not have these features and relies on dynamic typing. While all JavaScript can be written in a way that is compatible with TypeScript (by removing type annotations), not all TypeScript code can run as plain JavaScript due to the presence of type annotations.
??x
The answer explains how TypeScript enhances error detection through static typing while plain JavaScript uses dynamic typing, making TypeScript more robust for large and complex projects. This distinction affects how developers write and test their code.

---

#### Type Inference in TypeScript
Background context: The text provides an example where TypeScript's type checker can infer the type of a variable without explicit type annotations, catching errors that would occur at runtime if not corrected.
:p How does TypeScript perform type inference?
??x
TypeScript performs type inference by analyzing the initial value assigned to a variable. It uses this information to determine the most likely type and then enforces consistency throughout the code. For example, if you initialize `let city = 'new york city'`, TypeScript infers that `city` is of type string.
??x
TypeScript infers types based on the context in which variables are used. This allows for more robust error checking without requiring explicit type annotations.

---

#### Static Type System in TypeScript
Background context: The text explains how TypeScript's static type system can detect potential issues at compile time, such as property mismatches and undefined properties.
:p What is a "static" type system, and why is it valuable?
??x
A static type system in TypeScript refers to the ability of the compiler to check types during development without executing the code. This helps catch errors before runtime, improving code quality and maintainability.
??x
Static typing ensures that developers adhere to predefined types, reducing bugs related to incorrect data handling at runtime. It provides a level of safety by ensuring that operations are performed on compatible data.

---

#### Property Mismatch in TypeScript
Background context: The text presents an example where TypeScript's type checker flags a property mismatch due to a typo.
:p What issue does the following code snippet highlight?
```typescript
let state = {name: 'Alabama', capital: 'Montgomery'};
console.log(state.capitol);
```
??x
The code snippet highlights a property mismatch error where `state` is defined with the correct property `capital`, but `console.log` attempts to access `capitol`. TypeScript's type checker catches this and suggests using `capital` instead.
??x
TypeScript identifies that `state.capitol` does not exist on the object, suggesting it might be a typo. It recommends checking for `capital` as the intended property.

---

#### Type Annotations in TypeScript
Background context: The text explains how adding type annotations to functions can help catch errors and improve code clarity.
:p What is the role of type annotations in TypeScript?
??x
Type annotations in TypeScript specify the expected data types for variables, function parameters, and return values. They enhance code readability and help the compiler detect type-related issues early in development.
??x
Type annotations provide explicit information about variable types, making it easier to understand the intended use and behavior of each element in the code.

---

#### Benefits of Type Annotations
Background context: The text describes how adding type annotations can significantly improve code quality by catching errors before runtime.
:p How do type annotations benefit TypeScript programs?
??x
Type annotations in TypeScript help catch potential errors early, improving code reliability. They also enhance readability and maintainability by clearly defining the expected types for variables and function parameters.
??x
Type annotations prevent issues like property mismatches and ensure that operations are performed on compatible data types, reducing runtime bugs.

---

#### Example of a Valid TypeScript Program
Background context: The text provides an example of a valid TypeScript program with type annotations.
:p What is the purpose of adding type annotations to this function?
```typescript
function greet(who: string) {
    console.log('Hello', who);
}
```
??x
The purpose of adding the `who: string` type annotation in this function is to specify that the `who` parameter should be a string. This helps catch errors at compile time if an incorrect type is passed.
??x
Type annotations like `who: string` ensure that only strings are passed as arguments, preventing runtime errors and improving code clarity.

---

#### Type Inference vs Explicit Annotations
Background context: The text explains the benefits of both explicit type annotations and implicit type inference in TypeScript.
:p How does type inference differ from explicitly specifying types?
??x
Type inference allows TypeScript to deduce variable types based on initial values, while explicit type annotations provide clear declarations for each element. Type inference can catch some errors but is not as robust as explicit annotations, which are more precise and provide better error messages.
??x
Explicit type annotations give developers full control over data types, ensuring that the code behaves as intended. Type inference works well in simple cases but may miss complex or edge-case scenarios where explicit annotations are necessary.

---

#### Runtime vs Compile-Time Errors
Background context: The text contrasts compile-time errors detected by TypeScript with runtime errors that might occur even if no type annotations are used.
:p What is the difference between a compile-time error and a runtime error in TypeScript?
??x
A compile-time error occurs when TypeScript's compiler detects an issue before code execution, such as mismatched property names. A runtime error happens during actual program execution, like accessing undefined properties or performing invalid operations on data.
??x
Compile-time errors are caught early by the TypeScript compiler and can be fixed without running the application. Runtime errors occur at execution time and may require debugging to resolve.

---

#### Conclusion: Benefits of Using TypeScript
Background context: The text concludes with an overview of how TypeScript offers additional safety and clarity through its static type system.
:p What are the main benefits of using TypeScript over plain JavaScript?
??x
The main benefits of using TypeScript include improved code quality, enhanced readability, early detection of errors, and better maintainability. Its static typing helps catch bugs during development rather than at runtime.
??x
TypeScript offers a robust framework for writing complex applications with fewer runtime issues, making it suitable for large-scale projects that require strong type checking and clear variable definitions.


#### Property Naming Consistency and TypeScript Typing

Background context: When working with JavaScript, using TypeScript can help catch errors early by providing static typing. However, if property names are inconsistently named (e.g., `capitol` vs `capital`), TypeScript might not be able to correctly identify which spelling is intended.

:p What happens when a JavaScript object uses inconsistent property naming like `capitol` and `capital`, and how can this issue be resolved in TypeScript?
??x
When a JavaScript object uses inconsistent property naming, such as using `capitol` for one state and `capital` for another, TypeScript may not correctly identify which spelling is intended. This results in incorrect type checking messages, making it difficult to resolve issues.

To resolve this issue, explicitly declare the type of objects with interfaces. By doing so, you can ensure that property names match exactly as they are defined in your code.

```typescript
interface State {
    name: string;
    capital: string; // Explicitly define 'capital' instead of 'capitol'
}
const states: State[] = [
    {name: 'Alabama', capitol: 'Montgomery'},   // Error due to inconsistent spelling
    {name: 'Alaska',  capitol: 'Juneau'},
    {name: 'Arizona', capital: 'Phoenix'}       // Corrected spelling
];
```

With the correct type definition, TypeScript will provide more accurate error messages and suggestions.

```typescript
for (const state of states) {
    console.log(state.capital);
}
// Error message will correctly suggest to use 'capital' instead of 'capitol'
```
x??

---

#### Type Annotations in TypeScript

Background context: Adding explicit type annotations to your code can help the TypeScript compiler catch errors related to property names and types, ensuring that your code is more consistent and less prone to runtime issues.

:p How does adding a type annotation help with catching errors in JavaScript/TypeScript?
??x
Adding a type annotation helps by providing additional information to the TypeScript compiler. This allows the compiler to check for type consistency throughout the program, including properties of objects.

By explicitly defining types using interfaces or types, you can catch issues early, such as inconsistent property names. For example:

```typescript
interface State {
    name: string;
    capital: string; // Explicitly define 'capital' instead of 'capitol'
}
const states: State[] = [
    {name: 'Alabama', capitol: 'Montgomery'},   // Error due to inconsistent spelling
    {name: 'Alaska',  capitol: 'Juneau'},
    {name: 'Arizona', capital: 'Phoenix'}       // Corrected spelling
];
```

With the correct type definition, TypeScript will provide more accurate error messages and suggestions.

```typescript
for (const state of states) {
    console.log(state.capital);
}
// Error message will correctly suggest to use 'capital' instead of 'capitol'
```
x??

---

#### Venn Diagram of JavaScript and TypeScript Programs

Background context: The concept of a Venn diagram can be used to illustrate the relationship between JavaScript programs, TypeScript programs that pass type checking, and those that do not.

:p How does the Venn diagram help in understanding TypeScript's role relative to JavaScript?
??x
The Venn diagram helps visualize the relationship between different types of JavaScript and TypeScript programs. It shows that all JavaScript programs are also valid TypeScript programs, but only some (those which pass type checks) are fully compliant with TypeScript.

- The outer circle represents all possible JavaScript programs.
- The inner circle represents programs written in TypeScript.
- The overlapping area between both circles represents those TypeScript programs that pass the type checker and can be considered as a superset of valid JavaScript code.

The statement "TypeScript is a superset of JavaScript" means that any valid JavaScript program can also run as a TypeScript program, but not all TypeScript programs will necessarily run as valid JavaScript (due to stricter static typing).

```plaintext
+---------------------------------------------------+
| All JavaScript Programs                          |
|                                                  |
|         +---------------------------------------  |
|         |                                      |
|         v                                      |
|   +---------------------------------+          |
|   |                                 |          |
|   |  Valid TypeScript Programs     |<--------  |
|   |                                 |          |
|   +---------------------------------+          |
|                                               |
|           Superset of valid JavaScript       |
|                   programs                    |
+---------------------------------------------------+
```
x??

---

#### Runtime Behavior and Type Checking

Background context: TypeScript's type system models the runtime behavior of JavaScript, which can sometimes lead to surprises for developers coming from languages with stricter runtime checks. This is because TypeScript performs static typing but still compiles down to plain JavaScript.

:p How does TypeScript handle operations that are valid in JavaScript but may produce errors at runtime?
??x
TypeScript handles operations like string concatenation and addition of numbers and strings in a way that allows these operations at compile time, even though they can cause runtime errors. For example:

```typescript
const x = 2 + '3'; // OK
//    ^? const x: string

const y = '2' + 3; // OK
//    ^? const y: string
```

In both cases, TypeScript allows these operations and infers the type of `x` and `y` to be `string`. However, at runtime, this will result in a concatenation rather than an addition:

```typescript
const x = 2 + '3'; // Results in "23"
const y = '2' + 3; // Results in "23"
```

This can lead to unexpected behavior if not handled carefully. The key takeaway is that while TypeScript performs static type checking, it does so based on the TypeScript language rules rather than JavaScript's runtime semantics.

```typescript
// Example of a potential runtime error due to type inference
const result = 5 - '3'; // Result will be 2 at compile time,
                        // but if you change '3' to "three", this will fail at runtime.
```
x??

---


#### TypeScript's Type Checking vs JavaScript Runtime Behavior
Background context explaining how TypeScript models JavaScript runtime behavior but introduces stricter type checking. This includes scenarios where TypeScript flags errors even though no exceptions occur at runtime, such as using `null + 7` or `[] + 12`.
:p How does TypeScript decide when to model JavaScript’s runtime behavior and when to go beyond it?
??x
TypeScript adopts a cautious approach by considering unusual usages more likely due to developer error rather than intended behavior. This leads to stricter type checking, even if no runtime errors are thrown.
The guiding principle is that TypeScript should catch potential issues early in development, reducing the likelihood of bugs making their way into production code.

Code example:
```typescript
const a = null + 7;  // Evaluates to 7 in JS
//        ~~~~ The value 'null' cannot be used here.
```
x??

---

#### Example: Addition with `null` and Array Concatenation
Background context explaining specific examples where TypeScript flags errors even though the JavaScript code runs fine. These include using `null + 7`, which evaluates to `7` in JavaScript but is flagged by TypeScript, and concatenating arrays that evaluate to strings.
:p Can you provide an example of how TypeScript flags an error for `null + 7`?
??x
```typescript
const a = null + 7;  // Evaluates to 7 in JS
//        ~~~~ The value 'null' cannot be used here.
```
TypeScript flags this expression because it expects the operand types to match, and using `null` with the `+` operator is not allowed by default.

```typescript
const b = [] + 12;  // Evaluates to '12' in JS
//        ~~~~~~~~ Operator '+' cannot be applied to types ...
```
TypeScript flags this because it expects a numeric type for the operands, and an array literal is not directly compatible with the `+` operator.

x??

---

#### Example: Superfluous Arguments in Alerts
Background context explaining how TypeScript handles function calls that have more arguments than expected. This includes calling `alert('Hello', 'TypeScript')`, which evaluates to a string alert but is flagged by TypeScript.
:p How does TypeScript handle superfluous arguments in function calls?
??x
```typescript
alert('Hello', 'TypeScript');  // alerts "Hello"
//             ~~~~~~~~~~~~ Expected 0-1 arguments, but got 2
```
TypeScript flags this call because it expects the `alert` function to take either zero or one argument. The presence of a second string is flagged as an error.

x??

---

#### Example: Array Out-of-Bounds Access
Background context explaining how TypeScript's static type checking can still lead to runtime errors, even if the code appears correct.
:p Can you provide an example where TypeScript does not catch a potential runtime error?
??x
```typescript
const names = ['Alice', 'Bob'];
console.log(names[2].toUpperCase());  // Throws TypeError at runtime
```
TypeScript assumes that accessing `names[2]` will be within bounds, but it is not. This leads to a `TypeError: Cannot read properties of undefined (reading 'toUpperCase')` at runtime.

Explanation:
```typescript
// TypeScript infers the length of names as 2 and does not catch the out-of-bounds access.
```
x??

---

#### Example: Using the Any Type
Background context explaining how using the `any` type in TypeScript can lead to uncaught errors. This includes scenarios where the actual value at runtime differs from its static type, leading to exceptions.
:p What is a scenario where using the `any` type might still result in an error?
??x
Using the `any` type allows you to bypass TypeScript's type checking but does not prevent runtime errors if the actual values do not match the expected types. For example:

```typescript
let value: any = 'Hello';
console.log(value.toUpperCase());  // No error here, but may throw at runtime
value = 123;  // No error, but calling .toUpperCase() on a number will cause an error.
```
:p Can you explain why using the `any` type might still result in runtime errors?
??x
Using the `any` type bypasses static type checking, meaning that if the actual value at runtime is different from what it was expected to be (e.g., calling `.toUpperCase()` on a number), this will lead to an error.

Explanation:
```typescript
// The use of 'any' suppresses TypeScript's checks but does not prevent JavaScript's dynamic nature.
```
x??


#### Soundness in TypeScript
Background context: The provided text discusses the soundness of TypeScript's type system and compares it with other static typing languages like Reason, PureScript, and Dart. Soundness means that if a program is correctly typed, it will not exhibit certain errors at runtime.

:p What does "soundness" mean in the context of TypeScript's type system?
??x
Soundness in the context of TypeScript’s type system refers to the property where if a program passes all static type checks (i.e., the type checker does not report any issues), it will not throw exceptions at runtime. However, this is not the case with TypeScript as its type system is described as "unsound," meaning that a program can pass the type check but still fail at runtime.

```typescript
function add(a: number, b: number) {
    return a + b;
}

add(10, null); // This will compile without errors in TypeScript
```
x??

---

#### Superset of JavaScript in TypeScript
Background context: The text mentions that TypeScript is a superset of JavaScript. This means that all valid JavaScript code is also valid TypeScript code, but not all TypeScript code is valid JavaScript.

:p What does it mean for TypeScript to be a superset of JavaScript?
??x
It means that any syntactically correct JavaScript program can also be written as a valid TypeScript program without changes. However, TypeScript adds type checking and additional syntax (like optional semicolons) which are not part of pure JavaScript.

```typescript
function add(a: number, b: number): number {
    return a + b;
}
```
x??

---

#### Type Annotations in TypeScript
Background context: The text explains that type annotations in TypeScript help the compiler understand and enforce the intended types for variables and function parameters. This helps catch errors early.

:p What is the role of type annotations in TypeScript?
??x
Type annotations in TypeScript tell the compiler about the expected types, helping to catch type-related errors during development. They improve code readability and maintainability by explicitly defining variable and parameter types.

```typescript
function add(a: number, b: number): number {
    return a + b;
}
```
x??

---

#### noImplicitAny in TypeScript
Background context: The text discusses the `noImplicitAny` compiler option, which enforces explicit type declarations. This is useful for catching implicit any types that can lead to runtime errors.

:p What does the `noImplicitAny` option do?
??x
The `noImplicitAny` option in TypeScript ensures that all variables are explicitly typed unless they are assigned a value of an already known type. If not, it will generate errors indicating where implicit any types were used.

```typescript
function add(a: number, b: number): number {
    return a + b; // This is okay because the types are explicit.
}

// The following would be an error:
function add2(a, b) {
    return a + b; // Error: Parameter 'a' implicitly has an 'any' type
}
```
x??

---

#### strictNullChecks in TypeScript
Background context: The text explains that `strictNullChecks` is another compiler option that helps catch errors related to null and undefined values. It ensures that these types are not implicitly allowed unless explicitly permitted.

:p What does the `strictNullChecks` option do?
??x
The `strictNullChecks` option in TypeScript enforces stricter handling of null and undefined values, preventing them from being assigned to non-null or non-undefined types without explicit permission.

```typescript
const x: number = null; // This would be an error with strictNullChecks on.
```
x??

---

#### Setting up tsconfig.json for TypeScript
Background context: The text advises using `tsconfig.json` to configure TypeScript settings, especially for options like `noImplicitAny` and `strictNullChecks`.

:p How should one set up `tsconfig.json` in a new TypeScript project?
??x
To set up `tsconfig.json` in a new TypeScript project, you can use the command `tsc --init`. This will generate a basic configuration file with default settings. You can then modify it to include options like `noImplicitAny` and `strictNullChecks`.

```json
{
  "compilerOptions": {
    "noImplicitAny": true,
    "strictNullChecks": true
  }
}
```
x??

---

#### Other Compiler Options in TypeScript
Background context: The text mentions other compiler options that can be configured but focuses on `noImplicitAny` and `strictNullChecks` as the most critical settings. It also talks about more strict options like `noUncheckedIndexedAccess`.

:p What is the purpose of `noUncheckedIndexedAccess`?
??x
The `noUncheckedIndexedAccess` option in TypeScript helps catch errors related to accessing properties or elements on objects and arrays where null or undefined might be a possibility.

```typescript
const tenses = ['past', 'present', 'future'];
tenses[3].toUpperCase(); // This would throw an exception with noUncheckedIndexedAccess set.
```
x??

---


#### Concept: TypeScript's Type Erasure and Runtime Independence
Background context explaining that TypeScript’s types are erased during compilation, meaning they do not affect the emitted JavaScript. This leads to type information being lost at runtime, which impacts how you can check for specific types.

:p What is the key difference between TypeScript’s transpilation and type checking?
??x
TypeScript's transpilation process converts modern TypeScript/JavaScript into older JavaScript versions that are compatible with browsers or other runtimes. During this process, all TypeScript-specific constructs like interfaces, types, and type annotations are removed (type erasure), meaning the resulting JavaScript does not contain any type information.

This means that while you can check for specific types in your TypeScript code using features like `instanceof`, these checks will be discarded during compilation. The emitted JavaScript does not have the same type system as TypeScript, so runtime behavior is determined by the generated JavaScript, not the original TypeScript.
x??

---

#### Concept: Property Check at Runtime
Background context explaining that while you can perform a property check to determine if an object has a specific attribute, this still allows the TypeScript compiler to refine the type of the variable based on the property existence.

:p How can you use a property check to determine the runtime type of an object in TypeScript?
??x
You can use a property check to determine the runtime type of an object by using `in` operator or checking for the presence of a specific property. This allows the TypeScript compiler to narrow down the type of the variable at compile time, while still ensuring that the runtime logic works as expected.

Here’s how you could implement this:
```typescript
interface Square {
    width: number;
}

interface Rectangle extends Square {
    height: number;
}

type Shape = Square | Rectangle;

function calculateArea(shape: Shape) {
    if ('height' in shape) {  // Check for the presence of 'height'
        return shape.width * shape.height;  // Here, TypeScript knows `shape` is a Rectangle
    } else {
        return shape.width * shape.width;
    }
}
```
This approach ensures that TypeScript understands the type at compile time while maintaining runtime flexibility.

x??

---

#### Concept: Tagged Unions and Discriminated Unions
Background context explaining how tagged unions and discriminated unions allow you to recover type information at runtime, making it possible to write more robust and flexible code in TypeScript.

:p How can you use a “tag” property to differentiate between union types at runtime?
??x
You can use a "tag" property to explicitly store the type information in a way that is available at runtime. This approach allows you to distinguish between different union types by checking this tag, enabling the type checker to refine the type based on the value of the tag.

Here’s an example:
```typescript
interface Square {
    kind: 'square';
    width: number;
}

interface Rectangle {
    kind: 'rectangle';
    height: number;
    width: number;
}

type Shape = Square | Rectangle;

function calculateArea(shape: Shape) {
    if (shape.kind === 'rectangle') {  // Check the tag property
        return shape.width * shape.height;  // Here, TypeScript knows `shape` is a Rectangle
    } else {
        return shape.width * shape.width;
    }
}
```
In this example, the `kind` property acts as the "tag," and the type checker can use it to determine the exact subtype of `Shape`.

x??

---


#### Type Assertion vs. Runtime Conversion
TypeScript allows you to use `as` for type assertions, which are not runtime operations but compile-time checks. The `as` keyword does not affect the actual value's runtime behavior.

:p What is a type assertion in TypeScript and why can it fail to normalize values?
??x
A type assertion is a way to tell the TypeScript compiler that you believe a certain expression has a specific type, even if the static analysis of the code cannot confirm this. However, these assertions are only checked at compile time and do not change how the value behaves at runtime.

For instance:

```typescript
function asNumber(val: number | string): number {
    return val as number; // This does not convert the value to a number if it's actually a string.
}
```

You can use `Number(val)` or other JavaScript constructs for actual conversions that affect the value at runtime.

```typescript
function asNumber(val: number | string): number {
    return Number(val); // Converts the value to a number, even if it was originally a string.
}
```
x??

---

#### Dead Code in Type Assertions
TypeScript's type system can sometimes fail to detect dead code paths due to its focus on static typing. While TypeScript usually flags unused branches, there are cases where boolean values or other types might not match their declared type at runtime.

:p How could the `default` branch of a `switch` statement be reached in the `setLightSwitch` function?
??x
The default branch can be triggered if the provided value does not match any case. In JavaScript, booleans are treated as values that can be strings or numbers, leading to potential type mismatches.

For example:

```typescript
function setLightSwitch(value: boolean) {
    switch (value) {
        case true:
            turnLightOn();
            break;
        case false:
            turnLightOff();
            break;
        default:
            console.log(`I'm afraid I can't do that.`);
    }
}

// Example of a string being passed to setLightSwitch
setLightSwitch("ON"); // This will hit the default branch.
```

TypeScript does not catch this at compile time because it only checks static types, and JavaScript runtime types might differ.

```typescript
async function setLight() {
    const response = await fetch('/light');
    const result: LightApiResponse = await response.json();
    setLightSwitch(result.lightSwitchValue); // If `result.lightSwitchValue` is a string, this will hit the default branch.
}
```
x??

---

#### Function Overloading in TypeScript
TypeScript does not support function overloading based on runtime types. Overloading functions means defining multiple versions of a function that differ only by their parameters' types.

:p Why can't you overload functions based on TypeScript types?
??x
Function overloading in languages like C++ allows defining multiple implementations of the same function with different parameter types. However, TypeScript does not support this because it focuses on static typing and does not consider runtime type checking.

Instead, TypeScript supports "overloads" for function signatures:

```typescript
function add(a: number, b: number): number;
function add(a: string, b: string): string;
function add(a: any, b: any) {
    return a + b;
}

const three = add(1, 2); // Result is a number.
const twelve = add('1', '2'); // Result is a string.
```

These overloads provide type information but only one implementation can be used at runtime. The function `add` in the example above will always return a string or a number based on its input types, and not both simultaneously.

```typescript
function add(a: number, b: number): number {
    return a + b;
}

//       ~~~ Duplicate function implementation (not allowed)
function add(a: string, b: string): string {
    return a + b;
}
```
x??

---


---
#### TypeScript Emissions and Performance
TypeScript does not affect runtime performance because all type information is erased during compilation to JavaScript. The primary concern for performance overhead lies with build times, which are usually optimized by TypeScript's compiler team.

:p How can TypeScript function overloads impact the generated JavaScript code?
??x
Function overloads in TypeScript do not directly translate into equivalent constructs in JavaScript. When TypeScript compiles these functions, it might generate additional checks or logic that could affect the runtime behavior and performance, even though types are removed at compile time. This is because type checks might be transformed into runtime checks.

```typescript
// TypeScript code with function overloads
function process(value: number): string;
function process(value: string): boolean;
function process(value: any) {
    if (typeof value === "number") {
        return `Processing number: ${value}`;
    } else if (typeof value === "string") {
        return value.length > 5;
    }
}

// Generated JavaScript might look something like this
function process(value) {
    // Additional type checks at runtime
    if (typeof value === 'number') {
        return `Processing number: ${value}`;
    } else if (typeof value === 'string') {
        return value.length > 5;
    }
}
```
x??

---
#### TypeScript Types and Runtime Behavior
TypeScript types are erased during compilation, so they do not affect runtime behavior. However, type operations can introduce build-time overhead.

:p How does the TypeScript compiler handle errors in a program?
??x
A TypeScript program with type errors still produces JavaScript code because all type information is removed at compile time. The generated JavaScript may include additional checks or error handling to account for these potential issues.

```typescript
// Example of a type error that compiles but produces runtime-safe code
function process(input: string) {
    if (input.length > 10) { // Error, should be number
        return input.toUpperCase();
    }
}

// Generated JavaScript might include runtime checks or safe handling.
```
x??

---
#### Tagged Unions and Property Checking
Tagged unions are a common way to reconstruct types at runtime. Property checking involves dynamically determining the type of an object based on its properties.

:p What is a tagged union in TypeScript, and how does it relate to runtime behavior?
??x
A tagged union is a pattern where a value's type is determined by a tag or discriminator property. In TypeScript, this can be implemented using enums or string tags within objects. At runtime, you can check the value of this tag to determine the actual type.

```typescript
// Example of a tagged union in TypeScript
enum ShapeKind {
    Circle,
    Rectangle
}

interface Circle {
    kind: ShapeKind.Circle;
    radius: number;
}

interface Rectangle {
    kind: ShapeKind.Rectangle;
    width: number;
    height: number;
}

function getArea(shape: Circle | Rectangle): number {
    switch (shape.kind) {
        case ShapeKind.Circle:
            return Math.PI * shape.radius ** 2;
        case ShapeKind.Rectangle:
            return shape.width * shape.height;
    }
}
```

In the generated JavaScript, the `kind` property is used to determine which logic branch to execute at runtime.
x??

---
#### TypeScript Class Types and Runtime Values
Classes in TypeScript introduce both a type definition and a value that can be used at runtime. This allows for dynamic type checking and introspection.

:p How do class definitions impact generated JavaScript code?
??x
Class definitions in TypeScript generate constructors, methods, and properties that are available at runtime. These elements can be inspected or manipulated during execution.

```typescript
class Point {
    x: number;
    y: number;

    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
    }

    distanceFromOrigin(): number {
        return Math.sqrt(this.x ** 2 + this.y ** 2);
    }
}

// Generated JavaScript might look like this
function Point(x, y) {
    this.x = x;
    this.y = y;
}

Point.prototype.distanceFromOrigin = function() {
    return Math.sqrt(this.x ** 2 + this.y ** 2);
};
```

The class methods and properties are exposed as part of the object's prototype in JavaScript.
x??

---

