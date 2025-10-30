# High-Quality Flashcards: 10A007---Effective-TypeScript---Dan-Vanderkam_processed (Part 21)

**Rating threshold:** >= 8/10

**Starting Chapter:** Item 68 Use TSDoc for API Comments

---

**Rating: 8/10**

#### Version Mismatch and Dependency Management
Background context: When working with TypeScript, it's crucial to manage dependencies between libraries and their type declarations. Different versions of a library may require corresponding @types versions, which can lead to version mismatches if not managed properly.

The three key components are:
- Library version
- @types version (TypeScript definitions)
- TypeScript compiler version

:p How do different versions of a library affect the @types dependency?
??x
When you update a library, it's important to ensure that the corresponding @types package is also updated. This prevents issues arising from version mismatches between the actual library and its type definitions.

For example:
```typescript
// Update library and @types together
npm install --save some-library@new-version
npm install --save-dev @types/some-library@new-version
```

If you forget to update the @types, your TypeScript compiler might throw errors due to incompatible types. It's a best practice to keep these dependencies aligned.

x??

---

#### Exporting Types in Public APIs
Background context: When designing public API methods, it’s important to consider whether certain types should be exported or not. If types are used within functions but aren’t explicitly exported, users might still need them and can extract them from the function signatures using TypeScript utility types like `Parameters` and `ReturnType`.

:p Should all types that appear in public method signatures be exported?
??x
Yes, it’s a good practice to export such types. Users of your module will likely want to use these types directly when implementing their own logic. Exporting them makes the API more convenient for users.

Example:
```typescript
// Private type and function
interface SecretName {
    first: string;
    last: string;
}

interface SecretSanta {
    name: SecretName;
    gift: string;
}

export function getGift(name: SecretName, gift: string): SecretSanta { // ...

// User can extract the types like this:
type MySanta = ReturnType<typeof getGift>; // SecretSanta
type MyName = Parameters<typeof getGift>[0]; // SecretName

```

x??

---

#### Using JSDoc for API Comments (TSDoc)
Background context: To enhance documentation and improve developer experience, it’s recommended to use JSDoc-style comments in TypeScript. These are supported by editors like Visual Studio Code, which can display relevant information as you type.

:p Why should API method descriptions use JSDoc?
??x
Using JSDoc allows for better integration with editor features such as tooltip documentation when calling functions. The `@param`, `@returns` tags provide structured and readable comments that are easier to maintain than inline comments.

Example:
```typescript
/** 
 * Generate a greeting.
 * @param name - Name of the person to greet
 * @param title - The person's title
 * @returns A greeting formatted for human consumption.
 */
function greetFullTSDoc(name: string, title: string): string {
    return `Hello ${title} ${name}`;
}

// In an editor, hovering over `greetFullTSDoc` will show the TSDoc comments.
```

x??

---

#### Dealing with Deprecation in Documentation
Background context: As code evolves, it’s common to deprecate certain functions or features. It’s important to inform users about these changes and mark deprecated items appropriately.

:p How do you document a deprecated function using TSDoc?
??x
You can use the `@deprecated` tag within your JSDoc comments to indicate that a symbol is no longer recommended for use. This tag also helps in rendering the text with strikethrough formatting, making it visually clear that the item has been deprecated.

Example:
```typescript
/**
 * @deprecated Use `newGreet` instead.
 */
function oldGreet(name: string): string {
    return "Hello " + name;
}
```

In an editor, you would see:

- **oldGreet** (strikethrough)

x??

**Rating: 8/10**

#### Marking Methods as Deprecated

Background context: When you mark a method or function as deprecated, it's important to provide clear guidance for your users. This helps them transition smoothly and avoid using outdated code.

:p What should you include when marking a method as deprecated?
??x
When marking a method as deprecated, you should include what the new alternative is. If there isn't a direct replacement, at least include a reference to documentation on the deprecation. This provides users with clear guidance on how to update their code.
```markdown
@deprecated Use `newMethod` instead.
```
x??

---

#### Using JSDoc-/TSDoc-Formatted Comments

Background context: Properly documenting your exported functions, classes, and types using JSDoc-/TSDoc-formatted comments helps editors provide relevant information to users.

:p How should you document parameters and returns in JavaScript using JSDoc?
??x
You should use the @param and @returns tags for documentation. Include type information where applicable. For example:
```js
/**
 * Logs the squares of values.
 *
 * @param {number[]} vals - The array of numbers to square.
 * @returns {void} - No return value is expected.
 */
function logSquares(vals) {
    // function body
}
```
x??

---

#### JavaScript's `this` Keyword

Background context: The `this` keyword in JavaScript has a dynamic scoping, meaning its value depends on how the function is called. This can lead to confusion if not handled properly.

:p How does `this` behave when a method is assigned to a variable and called directly?
??x
When you assign a method to a variable and call it directly without using an instance of the class, `this` will be set to undefined because there's no current object context. This can lead to errors as methods that rely on `this` will not have access to their expected properties or methods.

Example:
```js
class C {
    vals = [1, 2, 3];
    logSquares() {
        for (const val of this.vals) {
            console.log(val ** 2);
        }
    }
}

const c = new C();
const method = c.logSquares; // Assign the function to a variable
method(); // Throws TypeError: Cannot read properties of undefined (reading 'vals')
```
x??

---

#### Using `call` and Arrow Functions for `this` Binding

Background context: To handle `this` binding, you can use methods like `call`, or prefer arrow functions which provide lexical scoping.

:p How does the `call` method help with `this` binding?
??x
The `call` method explicitly sets the `this` value when a function is invoked. This ensures that the correct context is used for accessing properties and calling other methods within the function.

Example:
```js
const c = new C();
const method = c.logSquares;
method.call(c); // Correctly logs: 1 4 9
```
x??

---

#### TypeScript's Handling of `this` in Callbacks

Background context: In TypeScript, you can model dynamic `this` binding by adding a `this` parameter to callback functions. This ensures type safety and avoids runtime errors.

:p How does adding a `this` parameter to a callback function help?
??x
Adding a `this` parameter to a callback function in TypeScript allows the function to have proper context when called, ensuring that properties and methods are accessed correctly. This helps maintain type safety and prevents issues like `undefined`.

Example:
```typescript
function addKeyListener(
    el: HTMLElement,
    listener: (this: HTMLElement, e: KeyboardEvent) => void
) {
    el.addEventListener('keydown', e => listener.call(el, e));
}
```
x??

---

#### Avoiding Dynamic Binding in Modern JavaScript

Background context: While dynamic `this` binding was historically popular, it can lead to confusion and errors. Arrow functions provide a more modern and predictable way of handling `this`.

:p Why is using arrow functions preferred over regular methods for callbacks?
??x
Arrow functions do not have their own `this`, instead they inherit the `this` value from the surrounding lexical scope. This makes them ideal for use in callbacks where you need to maintain the context of the outer function.

Example:
```js
class ResetButton {
    render() {
        return makeButton({text: 'Reset', onClick: this.onClick});
    }

    onClick = () => { // Arrow function
        alert(`Reset ${this}`); // `this` refers to the ResetButton instance.
    }
}
```
x??

---

**Rating: 8/10**

#### Avoid Transitive Type Dependencies in Published npm Modules
Background context: This concept is about ensuring that when you publish an npm module, it does not depend on transitive @types dependencies. This helps maintain a good experience for all TypeScript developers and can improve compiler performance by severing unnecessary dependencies.

:p Why should published npm modules avoid transitive type dependencies?
??x
Published npm modules should avoid transitive type dependencies because they can negatively impact the development experience for users who might not need or want those dependencies. By removing them, you provide a cleaner and more efficient setup for your module's consumers.
x??

---

#### Use Module Augmentation to Improve Types
Background context: This concept involves using TypeScript interfaces to modify existing declarations in libraries. This is useful for making built-in types stricter and more precise, or for disallowing certain constructs that might be problematic.

:p How can you use interface augmentation to improve the return type of JSON.parse?
??x
You can use interface augmentation to change the return type of `JSON.parse` from `any` to `unknown`, ensuring better type safety. By defining your own `JSON` interface and merging it with the library declarations, TypeScript will prioritize your overload.

```typescript
// declarations/safe-json.d.ts
interface JSON {
    parse(
        text: string,
        reviver?: (this: any, key: string, value: any) => any
    ): unknown;
}
```
x??

---

#### Ban Problematic Constructs Using Declaration Merging
Background context: This concept explains how to ban certain problematic constructs like the `Set` constructor that accepts a string by using interface augmentation. This helps prevent bugs in your code and provides better type safety.

:p How can you ban the use of `new Set('abc')`?
??x
You can ban the use of `new Set('abc')` by overriding the `SetConstructor` interface to return `void` when called with a string argument. This way, attempting to construct a `Set` from a string will result in a void type, indicating an error.

```typescript
// declarations/ban-set-string-constructor.d.ts
interface SetConstructor {
    new (str: string): void;
}
```
x??

---

#### Use Overloads for Better Type Safety
Background context: This concept involves using function overloads to provide more specific and safer types for certain functions, such as `JSON.parse` and `Response.prototype.json()`.

:p How can you use overloads to improve the type safety of JSON.parse?
??x
You can use overloads to change the return type of `JSON.parse` from `any` to `unknown`. This ensures that when you parse a JSON string, TypeScript will understand the structure better and provide more accurate type information.

```typescript
// declarations/safe-json.d.ts
interface JSON {
    parse(
        text: string,
        reviver?: (this: any, key: string, value: any) => any
    ): unknown;
}
```
x??

---

#### Declaration Merging in TypeScript
Background context: This concept describes how declaration merging works in TypeScript. Interface declarations from different sources can be merged to form a final result, which is useful for making local modifications without affecting the global namespace.

:p How does declaration merging work with interface augmentation?
??x
Declaration merging allows you to define interfaces or type aliases that will merge with existing library declarations. This means if you have an interface with the same name as one in a library, TypeScript will combine them into a single definition.

```typescript
// Example of merging interfaces
interface JSON {
    parse(
        text: string,
        reviver?: (this: any, key: string, value: any) => any
    ): unknown;
}

declare var JSON: JSON; // The `JSON` interface is now merged with the library declaration.
```
x??

---

#### Type Safety with Unknown vs Any
Background context: This concept explains why using `unknown` instead of `any` can provide better type safety, as `unknown` requires explicit assertions to access its properties.

:p Why should you use unknown over any for safer types?
??x
Using `unknown` provides better type safety because it requires explicit type assertions when accessing properties. This avoids silent type errors and makes your code more robust against potential bugs.

```typescript
const response = JSON.parse(apiResponse) as ApiResponse;
const cacheExpirationTime = response.lastModified + 3600; // Type assertion ensures type safety.
```
x??

---

#### Marking Deprecated Constructs with @deprecated
Background context: This concept involves marking certain constructs as deprecated to give users a clear warning and hint that the feature is no longer recommended.

:p How can you mark a function or method as deprecated using TypeScript?
??x
You can mark a function or method as deprecated by adding the `@deprecated` comment above its declaration. This will display the deprecation message in editors, guiding users to avoid using it.

```typescript
interface SetConstructor {
    /** @deprecated */
    new (str: string): void;
}
```
x??

---

