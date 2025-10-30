# High-Quality Flashcards: 10A007---Effective-TypeScript---Dan-Vanderkam_processed (Part 22)

**Rating threshold:** >= 8/10

**Starting Chapter:** 9. Writing and Running Your Code. Item 72 Prefer ECMAScript Features to TypeScript Features

---

**Rating: 8/10**

#### Using Literal Types for Enums

Background context: In TypeScript, enums provide a way to define named constants. However, using string literals can offer better type safety and translate more directly to JavaScript. This is particularly useful when you have both JavaScript and TypeScript users interacting with your code.

:p Why might TypeScript developers prefer literal types over numeric or string enums?
??x
Literal types in TypeScript offer strong type checking at the compile-time level, which means that any invalid value will be caught before runtime. For example, using `type Flavor = 'vanilla' | 'chocolate' | 'strawberry';` ensures that only valid flavors can be assigned to a variable of this type. This is beneficial for both TypeScript and JavaScript users since string literals directly translate to strings in JavaScript.

Code Example:
```typescript
type Flavor = 'vanilla' | 'chocolate' | 'strawberry';
let favoriteFlavor: Flavor = 'chocolate';  // OK
favoriteFlavor = 'americone dream';        // ~~~~ Type '"americone dream"' is not assignable to type 'Flavor'
```
x??

---

#### Parameter Properties in TypeScript

Background context: Parameter properties allow you to assign a constructor parameter directly to a class property. This can make the code more concise and readable.

:p What are parameter properties, and how do they work?
??x
Parameter properties enable you to initialize class properties from constructor parameters directly. For example, instead of writing `constructor(name: string) { this.name = name; }`, you can use `constructor(public name: string) {}`.

Code Example:
```typescript
class Person {
    // Traditional way
    constructor(name: string) {
        this.name = name;
    }

    // Using parameter property
    constructor(public name: string) {}
}
```

The `public` keyword is optional and can be omitted, but it makes the intention clear that the property should be public. The generated JavaScript code will look like:
```javascript
var Person = (function () {
    function Person(name) {
        this.name = name;
    }
    return Person;
})();
```
x??

---

#### Complications with Parameter Properties

Background context: While parameter properties can make your TypeScript classes more concise, they also introduce some challenges. These include potential issues with type checking and class design clarity.

:p What are the downsides of using parameter properties in a class?
??x
One downside is that parameter properties can sometimes lead to misleading code structure, especially if there are many parameters or non-parameter properties. This can make it difficult to understand the actual state of an object from its declaration.

Code Example:
```typescript
class Person {
    first: string;
    last: string;

    constructor(public name: string) {
        [this.first, this.last] = name.split(' ');
    }
}

// The class has three properties (first, last, name), but it's hard to read off the code.
```

Another issue is that parameter properties are compiled into regular class properties, which can result in unused parameters in the generated JavaScript. This can be confusing when debugging or maintaining the code.

x??

**Rating: 8/10**

#### Triple-Slash Imports and Namespaces
Background context explaining how JavaScript lacked an official module system before ECMAScript 2015. Different environments like Node.js and AMD used their own methods, while TypeScript introduced its own module system using a `module` keyword and triple-slash imports.
:p What is the role of triple-slash imports in TypeScript?
??x
Triple-slash imports were used to include type declaration files or external modules before ECMAScript 2015. However, they are now considered historical and should not be used in modern code unless necessary for compatibility with older libraries.

```typescript
/// <reference path="other.ts" />
foo.bar();
```
x??

---

#### Decorators in TypeScript
Background context explaining how decorators were added to support Angular but have since evolved into a more standardized form. Early decorators required the `--experimentalDecorators` flag, while modern decorators can be used directly without any flags.

:p What is the difference between experimental and standard decorators in TypeScript?
??x
Experimental decorators (enabled with the `--experimentalDecorators` flag) are non-standard and were primarily designed to support Angular before the official decorators proposal was finalized. Standard decorators can now be used directly in your code without any flags, following the latest ECMAScript standards.

```typescript
// Experimental decorator
function logged(originalFn: any, context: ClassMethodDecoratorContext) {
    return function(this: any, ...args: any[]) {
        console.log(`Calling ${String(context.name)}`);
        return originalFn.call(this, ...args);
    };
}

class Greeter {
    greeting: string;
    constructor(message: string) {
        this.greeting = message;
    }
    @logged
    greet() {
        return `Hello, ${this.greeting}`;
    }
}

console.log(new Greeter('Dave').greet()); // Logs: Calling greet Hello, Dave

// Standard decorator
class GreeterStandard {
    greeting: string;
    constructor(message: string) {
        this.greeting = message;
    }
    @logged
    greet() {
        return `Hello, ${this.greeting}`;
    }
}
```
x??

---

#### Module System in TypeScript
Background context explaining how the module system was introduced to fill the gap left by JavaScript before ECMAScript 2015. The module keyword and triple-slash imports were used to manage code organization and avoid naming conflicts.

:p How did modules work in older versions of TypeScript?
??x
In older versions of TypeScript, the `module` keyword was used alongside triple-slash imports to create a modular structure for code. The `namespace` keyword served as a synonym for `module` to maintain compatibility with other module systems. However, these are now considered historical and should not be used in modern TypeScript projects.

```typescript
// older module usage
namespace foo {
    export function bar() {}
}

// newer import/export style
import { bar } from './other';
bar();
```
x??

---

#### Using ECMAScript 2015 Modules
Background context explaining that after the official module system was introduced in ECMAScript 2015, TypeScript added support for `import` and `export`. This should be used instead of older triple-slash imports or custom modules.

:p Why should you use ECMAScript 2015-style modules over old methods?
??x
ECMAScript 2015 introduced a standardized module system with `import` and `export`, which is now the recommended way to manage code in modern JavaScript applications. Using these features ensures compatibility, maintainability, and adherence to industry standards.

```typescript
// ECMAScript 2015 style modules
import { bar } from './other';

class Greeter {
    greeting: string;
    constructor(message: string) {
        this.greeting = message;
    }
    greet() {
        return `Hello, ${this.greeting}`;
    }
}

console.log(new Greeter('Dave').greet()); // No decorator usage here
```
x??

---

#### Avoiding Decorators in Code
Background context explaining that while decorators can be useful for certain tasks, they may make code harder to follow and should be used judiciously. Specifically, avoid changing method type signatures with decorators.

:p How should you use decorators in your TypeScript projects?
??x
Decorators are a powerful feature but should be used cautiously. Avoid writing nonstandard decorators or modifying method type signatures with them. Stick to standard decorators when possible to maintain clarity and compatibility.

```typescript
class Greeter {
    greeting: string;
    constructor(message: string) {
        this.greeting = message;
    }
    // @logged - this is a standard decorator usage
    greet() {
        return `Hello, ${this.greeting}`;
    }
}

// Avoid this kind of usage:
function logged(originalFn: any, context: ClassMethodDecoratorContext) {
    return function(this: any, ...args: any[]) {
        console.log(`Calling ${String(context.name)}`);
        return originalFn.call(this, ...args);
    };
}
```
x??

**Rating: 8/10**

---
#### JavaScript's Private Fields Before ES2022
Background context explaining the concept. The provided text discusses how JavaScript historically lacked a way to enforce private properties and methods, leading to workarounds like prefixing variables with underscores.

:p What were the limitations of using an underscore prefix as a workaround for making fields private in JavaScript?
??x
The limitation was that this approach only discouraged users from accessing "private" data but did not provide any real enforcement. Users could still access the properties by circumventing the convention, such as through type assertions or iteration.

```javascript
class Foo {
    _private = 'secret123';
}

const f = new Foo();
f._private; // 'secret123'
```
x??

---
#### TypeScript's Private Fields
Background context explaining the concept. The text describes how TypeScript introduced public, protected, and private field visibility modifiers, but these are more of a type system feature rather than actual enforcement mechanisms.

:p How do TypeScript's private fields work in terms of enforcement?
??x
TypeScript's private fields provide some level of discouragement for accessing private data through features of the type system. However, at runtime, they behave similarly to JavaScript properties without any enforced privacy. TypeScript's private fields still rely on conventions and can be accessed using methods like type assertions.

```typescript
class Diary {
    private secret = 'cheated on my English test';
}

const diary = new Diary();
(diary as any).secret; // Still accessible with a type assertion
```
x??

---
#### ES2022 Private Fields in JavaScript
Background context explaining the concept. The text highlights that ES2022 introduced support for private fields, which are enforced both at type-checking and runtime levels.

:p What is a key difference between TypeScript's private fields and ES2022 private fields?
??x
The key difference is that ES2022 private fields are standard and widely supported, providing real enforcement of privacy. They are not just part of the type system but also prevent access from outside the class at runtime.

```javascript
class PasswordChecker {
    #passwordHash: number;
    constructor(passwordHash: number) {
        this.#passwordHash = passwordHash;
    }

    checkPassword(password: string) {
        return hash(password) === this.#passwordHash;
    }
}

const checker = new PasswordChecker(hash('s3cret'));
checker.#passwordHash; // Error: Property '#passwordHash' is not accessible
```
x??

---
#### Public and Protected in JavaScript (and TypeScript)
Background context explaining the concept. The text explains that public fields are the default visibility, so no annotation is needed, while protected implies inheritance.

:p Why are practical uses of `protected` quite rare according to the text?
??x
Practical uses of `protected` are quite rare because the general rule in object-oriented programming is to prefer composition over inheritance. This means that instead of inheriting from a class, developers often opt for more flexible and modular design patterns.

```javascript
class Parent {
    protected data = 'protected data';
}

class Child extends Parent {
    // Can access `data` but not encouraged due to preference for composition.
}
```
x??

---
#### Readonly as a Field Modifier in TypeScript
Background context explaining the concept. The text mentions that `readonly` is a type-level construct and can be used alongside private fields.

:p How can you use `readonly` with private fields?
??x
You can use `readonly` to enforce immutability at the type level, ensuring that once a private field is set, it cannot be changed. This is useful for maintaining invariants within a class.

```typescript
class ReadOnlyPasswordChecker {
    #passwordHash: readonly number;
    constructor(passwordHash: number) {
        this.#passwordHash = passwordHash; // Immutable after construction
    }
}
```
x??

---
#### Member Visibility Modifiers
Background context explaining the concept. The text discusses various member visibility modifiers in JavaScript, TypeScript, and ES2022.

:p What should you use instead of TypeScript's private fields for better security?
??x
For better security, you should use ES2022 private fields, as they are standard, widely supported, and provide real enforcement at both type-checking and runtime levels. This ensures that properties marked with `#` cannot be accessed from outside the class.

```javascript
class Diary {
    #secret = 'cheated on my English test';
}

const diary = new Diary();
diary.#secret; // Error: Property '#secret' is not accessible
```
x??

---

**Rating: 8/10**

#### Source Maps in TypeScript Debugging
Background context explaining source maps and their role in debugging TypeScript. Explain how TypeScript compiles to JavaScript, and why direct debugging of generated JavaScript can be challenging.

:p What are source maps, and why are they important for debugging TypeScript code?
??x
Source maps are mappings between a script’s original source code (like TypeScript) and the compiled version (JavaScript). They enable debuggers to show you the original source code even when working with the generated JavaScript. This is crucial because direct debugging of generated JavaScript can be difficult due to its complex structure, especially in cases involving asynchronous operations or minification.

For example, consider a simple TypeScript function:

```typescript
// index.ts
function addCounter(el: HTMLElement) {
    let clickCount = 0;
    const button = document.createElement('button');
    button.textContent = 'Click me';
    button.addEventListener('click', () => {
        clickCount++;
        button.textContent = `Click me (${clickCount})`;
    });
    el.appendChild(button);
}
addCounter(document.body);
```

When this is compiled to ES5 JavaScript, the code can become quite different and harder to debug:

```javascript
// index.js
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var addCounter = function (el) {
    var clickCount = 0;
    var button = document.createElement('button');
    button.textContent = 'Click me';
    button.addEventListener('click', (function (_this) { return function () { _this.clickCount++; _this.button.textContent = "Click me (" + _this.clickCount + ")"; }; })(this));
    el.appendChild(button);
};
addCounter(document.body);
```

To debug this in the browser, you would use a source map to view and interact with the original TypeScript code.

x??

---
#### Enabling Source Maps
Explanation of how to enable source maps in a TypeScript project. Discuss modifying `tsconfig.json` and the resulting output files.

:p How do you enable source maps for debugging in your TypeScript project?
??x
To enable source maps in your TypeScript project, you need to modify the `tsconfig.json` file. Specifically, you should add or update the `"compilerOptions"` section with the `"sourceMap": true` option:

```json
{
    "compilerOptions": {
        "sourceMap": true
    }
}
```

When you run `tsc`, it will generate both a `.js` file and a corresponding `.js.map` file for each TypeScript file. The `.js.map` file contains the mapping information that allows your debugger to translate the JavaScript code back into the original TypeScript source.

For example, if you have an `index.ts` file:

```typescript
// index.ts
function addCounter(el: HTMLElement) {
    let clickCount = 0;
    const button = document.createElement('button');
    button.textContent = 'Click me';
    button.addEventListener('click', () => {
        clickCount++;
        button.textContent = `Click me (${clickCount})`;
    });
    el.appendChild(button);
}
addCounter(document.body);
```

After compiling with the source map option enabled, you will get an `index.js` file and an `index.js.map` file:

```shell
$ tsc index.ts
```

These files can be used by your debugger to show you the original TypeScript code during debugging sessions.

x??

---
#### Debugging Generated JavaScript
Explanation of how source maps affect debugging in a browser environment. Discuss setting breakpoints and inspecting variables using the debugger.

:p How does enabling source maps help with debugging generated JavaScript in a browser?
??x
Enabling source maps helps by allowing you to debug your TypeScript code as if it were still the original source, even though the browser is running the compiled JavaScript.

When you enable source maps in your `tsconfig.json`, the TypeScript compiler generates both `.js` and `.js.map` files. When you open the debugger (e.g., Chrome DevTools), you can see a file named after your original TypeScript file (`index.ts`) with an italics font, indicating that this is not a real file but one included via the source map.

For example, in Chrome DevTools:

1. Load your application.
2. Open the Sources panel.
3. You should see `index.ts` listed as if it were part of your project files.
4. Set breakpoints on lines of code in `index.ts`.
5. Interact with your application to hit those breakpoints.

The debugger will pause execution at the correct line of TypeScript, showing you the original source code and allowing you to inspect variables.

Here’s an example setup:

```shell
$ tsc index.ts  # Generates index.js and index.js.map
```

In Chrome DevTools:

1. Open `index.ts` in the Sources panel.
2. Set a breakpoint on line 3 of `index.ts`.
3. Refresh the page or trigger some actions to hit the breakpoint.

The debugger will pause at the correct location, showing you the original TypeScript code and allowing you to inspect variables and step through the code.

x??

---
#### Debugging Node.js Programs
Explanation of how source maps can be used for debugging in Node.js applications. Discuss using `--inspect-brk` flag with Node.

:p How do you use source maps to debug Node.js programs?
??x
To debug Node.js programs using source maps, you first need to ensure that your TypeScript project is set up correctly with source map generation enabled. Then, you can compile and run the program in a way that supports debugging.

Here’s an example of how to do this:

1. **Compile the TypeScript code:**

   ```shell
   $ tsc bedtime.ts  # Generates bedtime.js and bedtime.js.map
   ```

2. **Run the compiled JavaScript with Node's `--inspect-brk` flag:**

   ```shell
   $ node --inspect-brk bedtime.js
   Debugger listening on ws://127.0.0.1:9229/587c380b-fdb4-48df-8c09-a83f36d8a2e7
   For help, see: https://nodejs.org/en/docs/inspector
   ```

3. **Open your browser and navigate to `chrome://inspect`** (or a similar interface in other browsers).

4. **Select the remote target to inspect**:

   - In Chrome, you might see something like "Node.js Runtime".

5. **Set breakpoints and interact with the program**:

   - The debugger will pause at the specified line when the script reaches it.

For example, consider the `bedtime.ts` file:

```typescript
// bedtime.ts
async function sleep(ms: number) {
    return new Promise<void>((resolve) => setTimeout(resolve, ms));
}

async function main() {
    console.log('Good night.');
    await sleep(1000);
    console.log('Morning already.?');
}

main();
```

After compiling and running with `--inspect-brk`, you can set a breakpoint in the TypeScript source code within your browser’s debugger:

```shell
$ tsc bedtime.ts  # Generates bedtime.js and bedtime.js.map
$ node --inspect-brk bedtime.js  # Debugger starts
```

In Chrome DevTools:

1. Go to `chrome://inspect`.
2. Select "Node.js Runtime" (or similar).
3. Set a breakpoint on line 4 of `bedtime.ts`:
   ```typescript
   async function main() {
   ```

When you run the application, it will pause at this point, and you can inspect variables and step through the code.

x??

---

**Rating: 8/10**

#### DOM Hierarchy and TypeScript
Background context: The text discusses how understanding the Document Object Model (DOM) hierarchy becomes crucial when using TypeScript, especially for web applications. It mentions that JavaScript and its APIs are deeply integrated with the DOM structure, making knowledge of these elements essential for debugging type errors and ensuring robust application development.

:p What is the significance of knowing the DOM hierarchy in a TypeScript context?
??x
Knowing the DOM hierarchy in TypeScript helps identify potential null values and ensures correct property usage. This knowledge prevents runtime errors by allowing developers to write more precise code that accounts for the possible types of elements they interact with, such as `Node`, `Element`, and `EventTarget`. For instance, `document.getElementById` can return an `Element` or `null`.
```typescript
const targetEl = document.getElementById('someId');
if (targetEl) {
    // Safe to use targetEl.classList.add('dragging') here.
}
```
x??

#### Event Target in TypeScript
Background context: The text highlights how the concept of `EventTarget` is crucial for type safety when dealing with events in web applications. `EventTarget` is a base interface that all event targets (like elements) implement, but it lacks specific properties and methods.

:p What is an `EventTarget` in TypeScript?
??x
An `EventTarget` is a base interface shared by objects that can receive DOM events. It does not include specific properties or methods like `classList`. When dealing with generic event handling, you should use `EventTarget`, but for more detailed operations (like adding/removing classes), you need to cast the `EventTarget` back to its specific type (e.g., `Element`).
```typescript
function handleDrag(eDown: Event) {
    const targetEl = eDown.currentTarget as HTMLElement;
    // Now safe to use targetEl.classList.
}
```
x??

#### Null Safety in TypeScript
Background context: The text points out that the TypeScript compiler flags null safety issues when dealing with DOM elements, emphasizing the importance of ensuring that variables are not `null` before using them.

:p Why does TypeScript flag errors related to null safety?
??x
TypeScript flags errors related to null safety because it aims to prevent potential runtime crashes by catching type-related issues at compile time. The compiler checks if a variable might be `null`, and if so, warns about operations that could fail if the variable is indeed `null`.

For example, the TypeScript compiler will flag an error when you try to call a method on a possibly null variable:
```typescript
const surfaceEl = document.getElementById('surface');
if (surfaceEl) {
    // Safe to use surfaceEl.addEventListener here.
}
```
x??

#### Element vs. EventTarget in Handling Events
Background context: The text emphasizes the difference between `Element` and `EventTarget`, highlighting that while `EventTarget` is a base interface, `Element` provides specific properties like `classList`.

:p What are the differences between `Element` and `EventTarget`?
??x
`Element` is a more specific type of `EventTarget` that extends it with additional properties and methods, such as `classList`. When you receive an event in a generic context, TypeScript will treat the current target as `EventTarget`, but for operations requiring element-specific functionality (like adding/removing classes), you need to cast the target to `Element`.

For example:
```typescript
const handleDrag = (eDown: Event) => {
    const targetEl = eDown.currentTarget as Element;
    targetEl.classList.add('dragging');
};
```
x??

--- 

These flashcards cover key concepts from the provided text, focusing on DOM hierarchy in TypeScript, understanding `EventTarget`, null safety, and the differences between `Element` and `EventTarget`.

**Rating: 8/10**

#### Specificity of DOM Property Types
TypeScript's type declarations for the DOM make liberal use of literal types to provide the most specific type possible. However, this is not always achievable with certain methods like `document.getElementById`.

:p What are the implications when using `document.getElementById` in TypeScript?
??x
When using `document.getElementById`, you might receive a more general type such as `HTMLElement | null`. This happens because `getElementById` can return any element or null. To get a specific type, you may need to perform a runtime check or use a type assertion.

```typescript
const div = document.getElementById('my-div');
if (div instanceof HTMLDivElement) {
    console.log(div); // const div: HTMLDivElement
}
```

x??

---
#### Handling Nullable Returns from DOM Methods with Type Assertions
With `document.getElementById`, the return value can be `null`. To handle this, you might need to use a type assertion or an if statement.

:p How should you handle null values returned by `getElementById` in TypeScript?
??x
To handle null values returned by `document.getElementById`, you can use a type assertion or an if statement. A type assertion is appropriate when you are certain about the element type, while an if statement is necessary to check for null.

```typescript
const div = document.getElementById('my-div') as HTMLDivElement; // Type assertion
// OR

const div = document.getElementById('my-div');  // Nullable return
if (div) {
    console.log(div); // const div: HTMLDivElement
}
```

x??

---
#### Event Hierarchy in TypeScript
The `Event` type is the most generic, while more specific types like `MouseEvent`, `UIEvent`, etc., exist. The `clientX` and `clientY` properties are available only on specific event types.

:p What causes the error when trying to use `clientX` and `clientY` in an event handler?
??x
The error occurs because the events are declared as `Event`, which does not include `clientX` and `clientY`. These properties exist only on more specific event types such as `MouseEvent`.

To resolve this, you can either inline the event handler to provide context or explicitly declare the event parameter type.

```typescript
function handleDrag(eDown: Event) {
    // ... const dragStart = [eDown.clientX, eDown.clientY]; // Error here

    // Solution 1: Inline the mousedown handler for better context
    el.addEventListener('mousedown', (eDown: MouseEvent) => { 
        const dragStart = [eDown.clientX, eDown.clientY];
        // ...
    });

    // Solution 2: Explicitly declare event type
    function addDragHandler(el: HTMLElement) {
        el.addEventListener('mousedown', (eDown: MouseEvent) => {  
            const dragStart = [eDown.clientX, eDown.clientY];
            // ...
        });
    }
}
```

x??

---
#### Non-Null Assertions and Conditional Checks for DOM Elements
When dealing with potentially null returns from `getElementById`, it is important to account for the possibility of receiving a null value. Use non-null assertions or conditional checks.

:p How can you ensure your code handles elements that might not exist in the document?
??x
To handle elements that might not exist, use a non-null assertion if you are certain they will always be present, or include an if statement to check for `null`.

```typescript
const surfaceEl = document.getElementById('surface');
if (surfaceEl) { 
    addDragHandler(surfaceEl); // If the element exists, proceed with handling
} else {
    console.log("Element not found"); // Handle case where element is missing
}
```

Or using a non-null assertion:

```typescript
const surfaceEl = document.getElementById('surface')!;
addDragHandler(surfaceEl);
// This will result in an error if the element does not exist, so use with caution.
```

x??

---

