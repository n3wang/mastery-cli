# High-Quality Flashcards: 10A007---Effective-TypeScript---Dan-Vanderkam_processed (Part 24)

**Rating threshold:** >= 8/10

**Starting Chapter:** Item 80 Use ts-check and JSDoc to Experiment with TypeScript

---

**Rating: 8/10**

#### Use @ts-check and JSDoc to Experiment with TypeScript

Background context: This concept introduces the use of `@ts-check` directive and JSDoc comments for type checking in JavaScript files before converting them fully to TypeScript. It helps identify issues early on, making the migration process smoother.

:p What is the purpose of using `@ts-check`?
??x
The purpose of using `@ts-check` is to enable a form of type checking in JavaScript code without fully converting it to TypeScript. This helps developers catch potential type-related errors and gain familiarity with TypeScript's type system before making a full migration.

```typescript
// Example: Using @ts-check for type checking
// @ts-check
const person = {first: 'Grace', last: 'Hopper'};
2 * person.first; // Error: The right-hand side of an arithmetic operation must be of type 'any', 'number', or an enum.
```
x??

---

#### Undeclared Globals

Background context: Identifies symbols that are not declared in the code but used, requiring proper declaration to resolve errors. This is crucial for maintaining correct and consistent type definitions.

:p What does `@ts-check` report when encountering undeclared global variables?
??x
When using `@ts-check`, it reports errors related to undeclared global variables. These can be either local symbols that need `let` or `const` declarations, or "ambient" symbols defined elsewhere (e.g., in HTML `<script>` tags) that require a type declaration file.

```typescript
// Example: Error due to undeclared global variable 'user'
// @ts-check
console.log(user.firstName); // Error: Cannot find name 'user'
```
x??

---

#### Unknown Libraries

Background context: When using third-party libraries, TypeScript needs specific type declarations. `@ts-check` helps identify these missing declarations and provides guidance on how to resolve them.

:p What does `@ts-check` report when encountering an unknown library function?
??x
When using `@ts-check`, it reports errors for functions or properties that are not recognized by the compiler due to missing type definitions. For example, using a jQuery method like `.style()` without the appropriate types can result in errors.

```typescript
// Example: Error due to missing TypeScript declaration for jQuery
// @ts-check
$('#graph').style({'width': '100px', 'height': '100px'}); // Error: Cannot find name '$'
```
x??

---

#### DOM Issues

Background context: When working with the Document Object Model (DOM) in web applications, TypeScript may report errors due to type mismatches between methods and the `HTMLElement` interface. This requires careful handling of element types.

:p What error might `@ts-check` generate when manipulating DOM elements?
??x
`@ts-check` can generate an error related to property access on `HTMLElement`. For example, attempting to set `.value` on a generic `HTMLElement` will result in a type error because only specific input types have this property.

```typescript
// Example: Error due to incorrect property access on HTMLElement
// @ts-check
const ageEl = document.getElementById('age');
ageEl.value = '12'; // Error: Property 'value' does not exist on type 'HTMLElement'
```
x??

---

#### Inaccurate JSDoc

Background context: Existing JSDoc comments in the codebase can be misleading or incomplete. `@ts-check` checks these annotations for accuracy and enforces strict typing, leading to better code quality.

:p What issues might `@ts-check` identify with inaccurate JSDoc?
??x
`@ts-check` may identify two main types of inaccuracies: (1) Mismatches between the actual implementation and documented return or parameter types; (2) Incorrect assumptions about DOM methods or properties. These issues need to be addressed for smooth TypeScript integration.

```typescript
// Example: Error due to inaccurate JSDoc comments
// @ts-check
/** 
 * Gets the size (in pixels) of an element.
 * @param {Node} el The element
 * @return {{w: number, h: number}} The size
 */
function getSize(el) {
    const bounds = el.getBoundingClientRect();
    return {width: bounds.width, height: bounds.height};
}
```
x??

---

#### Quick Fixes in JSDoc

Background context: `@ts-check` can suggest quick fixes to add type annotations based on usage. These suggestions help developers incrementally improve their codebase while working with JavaScript files.

:p How does the TypeScript language service provide quick fixes?
??x
The TypeScript language service provides quick fixes for adding type annotations based on the actual usage of variables or parameters in the code. For example, it can infer types from function arguments and suggest JSDoc comments to document these types accurately.

```typescript
// Example: Quick fix suggestion by TypeScript language service
function double(val) {
    return 2 * val;
}
```
x??

---

#### Structural Typing Mismatch

Background context: While `@ts-check` can suggest type annotations, the results might not always be ideal. Structural typing in JavaScript allows for flexible object shapes, but `@ts-check` may sometimes infer overly generic types.

:p What is a potential drawback of using quick fixes with `@ts-check`?
??x
A potential drawback of using quick fixes with `@ts-check` is that they might result in overly generic or structurally mismatched type annotations. For instance, inferring `{files: {forEach: (arg0: (file: any) => Promise<void>) => void;}}` for an array of files may not accurately reflect the intended structure.

```typescript
// Example: Incorrect quick fix suggestion by TypeScript language service
function loadData(data) {
    data.files.forEach(async file => {
        // ...
    });
}
```
x??

---

**Rating: 8/10**

#### Enable Type Checking Without Converting to TypeScript
Background context: To enable type checking without converting a JavaScript file to TypeScript, you can add `// @ts-check` at the top of your JavaScript file. This allows for basic type checking using JSDoc annotations and third-party type definitions.

:p How do you enable type checking in a JavaScript file without converting it to TypeScript?
??x
By adding `// @ts-check` at the top of the JavaScript file, you can use JSDoc-style type comments and have better type inference. This allows for basic static typing checks while keeping your code as JavaScript.
```javascript
// @ts-check

function add(a: number, b: number): number {
    return a + b;
}
```
x??

---

#### Declare Globals and Add Type Declarations for Third-Party Libraries
Background context: When working with third-party libraries in TypeScript, you often need to declare global types or use existing type definitions. This can be done by creating custom `.d.ts` files or using pre-existing declaration files from npm.

:p How do you add type declarations for a third-party library in TypeScript?
??x
You can create a custom `index.d.ts` file and declare the types, interfaces, and functions of the third-party library. Alternatively, you can install an existing `.d.ts` file via npm.

For example:
```typescript
// index.d.ts

declare global {
    interface Window {
        myLibrary: any;
    }
}

window.myLibrary = { // initialization code here };
```
x??

---

#### Use `allowJs` to Mix TypeScript and JavaScript
Background context: The `allowJs` compiler option in TypeScript allows you to work with both TypeScript and JavaScript files within the same project. This is particularly useful when gradually transitioning from JavaScript to TypeScript.

:p What does the `allowJs` compiler option enable?
??x
The `allowJs` compiler option enables the coexistence of TypeScript and JavaScript files in a single project, allowing for gradual migration. When using `allowJs`, you can import JavaScript modules into TypeScript code and vice versa, with limited type checking unless you use `@ts-check`.

Example:
```typescript
// main.ts

import { myFunction } from './myScript.js';

console.log(myFunction());
```

```javascript
// myScript.js
export function myFunction() {
    return "Hello, TypeScript!";
}
```
x??

---

#### Transition Gradually to TypeScript with `allowJs`
Background context: To gradually transition a JavaScript project to TypeScript, you can use the `allowJs` compiler option. This allows you to introduce TypeScript into your build chain and run tests while converting individual modules.

:p How do you start introducing TypeScript into an existing JavaScript project?
??x
You can enable `allowJs` in your `tsconfig.json` to allow JavaScript files to coexist with TypeScript. You can then use tools like Jest or Webpack to integrate TypeScript sources, ensuring that your tests run correctly during the transition.

Example `tsconfig.json`:
```json
{
    "compilerOptions": {
        "allowJs": true,
        "outDir": "./dist",
        "rootDir": "./src"
    },
    "include": ["src/**/*.ts", "src/**/*.js"]
}
```

Example `jest.config.js` for Jest integration:
```javascript
module.exports = {
    transform: { '^.+\\.tsx?$': 'ts-jest' }
};
```
x??

---

#### Configure Webpack with TypeScript Support
Background context: To use TypeScript in a Webpack project, you need to configure Webpack and install necessary loaders like `ts-loader`.

:p How do you configure Webpack to support TypeScript?
??x
You can install `ts-loader` via npm and then configure your `webpack.config.js` to include rules for `.tsx` and `.ts` files.

Example `webpack.config.js`:
```javascript
module.exports = {
    module: {
        rules: [
            { test: /\.tsx?$/, use: 'ts-loader', exclude: /node_modules/ }
        ]
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js']
    }
};
```
x??

---

#### Configure Jest for TypeScript
Background context: To run tests in a TypeScript project using Jest, you need to configure Jest to handle `.ts` and `.tsx` files.

:p How do you configure Jest to work with TypeScript?
??x
You can install `ts-jest` via npm and then configure Jest's transform options to include TypeScript sources.

Example `jest.config.js`:
```javascript
module.exports = {
    transform: { '^.+\\.tsx?$': 'ts-jest' }
};
```
x??

---

#### Use `ts-node` for Node.js Integration
Background context: To run a TypeScript file with Node.js, you can use the `ts-node` package as a drop-in replacement or configure it to understand TypeScript.

:p How do you use `ts-node` to run TypeScript files?
??x
You can install `ts-node` via npm and then register it with Node.js so that it understands TypeScript syntax. Alternatively, you can replace the Node command with `ts-node`.

Example:
```bash
$ node -r ts-node/register main.ts
```
x??

---

#### Generate Pure JavaScript Sources with `outDir`
Background context: When using TypeScript, you can specify an output directory (`outDir`) that generates pure JavaScript sources. This allows your existing build chain to process the generated JavaScript files.

:p How do you configure TypeScript to generate JavaScript files in a specific directory?
??x
You can set the `outDir` option in your `tsconfig.json` to specify the output directory for generated JavaScript files.

Example `tsconfig.json`:
```json
{
    "compilerOptions": {
        "outDir": "./dist"
    }
}
```
x??

---

**Rating: 8/10**

#### Migrating to TypeScript
Background context: When migrating from JavaScript (or another language) to TypeScript, developers often encounter issues that were previously implicit. This process can reveal bad design decisions and enforce type safety, making it harder to justify poor designs.
:p What are some common challenges you might face when migrating code to TypeScript?
??x
When migrating code to TypeScript, you may face several challenges such as encountering errors where properties do not exist on an object, losing type safety with JSDoc annotations, or having issues with tests that were implicitly passing due to the dynamic nature of JavaScript. These challenges arise because TypeScript enforces stricter typing and can surface issues that were previously ignored.
```typescript
const state = {};
state.name = 'New York';  // Error: Property 'name' does not exist on type '{}'
state.capital = 'Albany'; // Error: Property 'capital' does not exist on type '{}'

interface State {
    name: string;
    capital: string;
}
const state = {} as State; // Type assertion
state.name = 'New York';
state.capital = 'Albany';

// @ts-check
/**
 * @param {number} num
 */
function double(num) {
    return 2 * num;
}

double('trouble'); // Error: Argument of type 'string' is not assignable to parameter of type 'number'
```
x??

---
#### Fixing Property Type Issues in TypeScript
Background context: When migrating JavaScript objects with dynamically added properties, TypeScript may complain about missing properties. This can be resolved by defining the object's structure using interfaces or by initializing it all at once.
:p How do you fix TypeScript errors related to properties that don't exist on an object?
??x
To fix these issues, you can either initialize the object with all its properties at once or define an interface for the object. Here are both approaches:
1. Initialize the object with all its properties:
```typescript
const state = {
    name: 'New York',
    capital: 'Albany'
};
```
2. Define an interface and type assert the object:
```typescript
interface State {
    name: string;
    capital: string;
}
const state = {} as State; // Type assertion
state.name = 'New York';
state.capital = 'Albany';
```
Using interfaces or type assertions can help avoid errors, but remember to refactor eventually for cleaner code.
x??

---
#### Using Type Assertions in TypeScript
Background context: Sometimes, you might need to use type assertions when the fix is not trivial. However, these should be used sparingly as they bypass static typing checks and can lead to runtime errors.
:p When is it appropriate to use type assertions in TypeScript?
??x
TypeScript allows the use of type assertions in cases where initializing an object with all its properties at once is not feasible. This often happens when you're dealing with dynamic objects or data structures that are hard-coded elsewhere in your application. While using type assertions can help keep your migration process moving, it's important to refactor eventually for better code maintainability.

Example of a situation where a type assertion might be used:
```typescript
interface State {
    name: string;
    capital: string;
}
const state = {} as State; // Type assertion
state.name = 'New York';
state.capital = 'Albany';

// A good practice is to leave a TODO or file a bug to clean this up later.
```
x??

---
#### Maintaining Type Safety with JSDoc and @ts-check
Background context: When using JSDoc comments, they are not enforced in TypeScript. This can lead to issues where types are implicitly `any`, causing type safety concerns.
:p What happens when you convert JavaScript code to TypeScript and use JSDoc annotations?
??x
When converting JavaScript code that uses JSDoc annotations to TypeScript with the `@ts-check` directive, type safety can be compromised because JSDoc comments stop being enforced. This means that types are implicitly set to `any`, leading to potential runtime errors or warnings. 

Example of a problem:
```typescript
// @ts-check
/**
 * @param {number} num
 */
function double(num) {
    return 2 * num;
}

double('trouble'); // No error in TypeScript, but should be an error due to wrong type
```
To maintain type safety, you need to manually add the types using `type` or `interface`. Here's how you can fix it:
```typescript
function double(num: number) {
    return 2 * num;
}

double('trouble'); // Error: Argument of type 'string' is not assignable to parameter of type 'number'
```
Once you've added the types, you should remove them from JSDoc comments to avoid redundancy.
x??

---
#### Migrating Tests Last
Background context: During a TypeScript migration, tests should be the last part of your dependency graph. This ensures that changes in production code do not affect test results, providing reassurance during the transition.
:p Why should you migrate tests last when converting JavaScript code to TypeScript?
??x
Migrating tests last helps maintain consistency and ensures that your tests continue to pass without having been changed. This is important because it provides confidence that the behavior of your application remains intact during the migration process.

Additionally, since production code does not import test files, migrating them later simplifies the transition by reducing dependencies and making the process more straightforward.

Example of a test file:
```typescript
// Test file (should be last to migrate)
describe('double function', () => {
    it('should double the number correctly', () => {
        expect(double(2)).toBe(4);
    });
});
```
By keeping tests as the final part, you ensure that your application's behavior remains consistent during the migration.
x??

