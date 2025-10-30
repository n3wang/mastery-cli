# High-Quality Flashcards: 10A007---Effective-TypeScript---Dan-Vanderkam_processed (Part 4)

**Rating threshold:** >= 8/10

**Starting Chapter:** Item 10 Avoid Object Wrapper Types String Number Boolean Symbol BigInt

---

**Rating: 8/10**

#### String and Object Wrapper Types
Background context explaining that JavaScript has primitive values like strings, numbers, booleans, etc., which are immutable and do not have methods. Strings can seem to have methods because of implicit conversion.

:p What is the nature of string primitives in JavaScript?
??x
String primitives in JavaScript are immutable and do not inherently have methods. However, when you call a method on a string primitive like `charAt`, JavaScript implicitly converts it into an object wrapper type (a String object), performs the operation, and then discards the object.

```javascript
const originalCharAt = String.prototype.charAt;
String.prototype.charAt = function(pos) {
    console.log(this, typeof this, pos);
    return originalCharAt.call(this, pos);
};
console.log('primitive'.charAt(3)); // Outputs: [String: 'primitive'] object 3  m
```
x??

---
#### Implicit Conversion to Object Wrappers
Background context explaining how JavaScript can convert primitives into objects automatically when methods are called.

:p What happens when you try to assign a property to a string primitive in JavaScript?
??x
When you assign a property to a string primitive, the value is implicitly converted to an object wrapper type (a String object), and the property is set on that object. However, this object is discarded immediately after the operation.

Example:
```javascript
let x = "hello";
x.language = 'English'; // Sets language on a new String object
console.log(x.language); // Outputs: undefined
```
The `language` property is lost because it was set on an object that got discarded, leaving `x` unchanged and still a string primitive.

x??

---
#### TypeScript's Treatment of Primitives vs. Object Wrappers
Background context explaining how TypeScript distinguishes between primitives (string, number, boolean) and their corresponding object wrapper types (String, Number, Boolean).

:p What is the difference between using `string` and `String` in TypeScript?
??x
In TypeScript, `string` represents a primitive string value, while `String` represents an object that wraps around a string. While `string` can be assigned to `String`, `String` cannot be assigned to `string`.

```typescript
function getStringLen(foo: String) {
    return foo.length;
}

getStringLen("hello"); // OK
// getStringLen(new String("hello")); // Error, Argument of type 'String' is not assignable to parameter of type 'string'.
```

It's generally recommended to use the primitive types (`string`, `number`, etc.) unless you specifically need object methods or static properties.

x??

---
#### Primitives vs. Object Wrappers in Practice
Background context explaining that while primitives are more efficient, using object wrappers can lead to errors and confusion due to implicit type conversions.

:p Why is it important to use the primitive types (`string`, `number`, etc.) instead of their wrapper types like `String`?
??x
Using the primitive types is generally better because:

1. **Type Safety**: TypeScript enforces that primitives are not objects, avoiding errors that can occur when treating a primitive as an object.
2. **Performance**: Primitives are more efficient than wrapping them in objects.
3. **Clarity**: It's clearer what you're working with (a simple value vs. a complex object).

Examples of incorrect usage:
```typescript
function isGreeting(phrase: String) {
    return ['hello', 'good day'].includes(phrase); // Error, Argument of type 'String' is not assignable to parameter of type 'string'.
}

const s: String = "primitive"; // This can lead to confusion and errors.
```

It's better to use the primitive types (`string`, `number`, etc.) when possible.

x??

---
#### Constructing BigInt and Symbol Values
Background context explaining that calling `BigInt` or `Symbol` without `new` creates a primitive value, not an object wrapper.

:p How can you create a `bigint` value in JavaScript?
??x
You can create a `bigint` value by appending the letter "n" to a numeric literal. This results in a `bigint` primitive and not the `BigInt` object type.

```javascript
typeof 1234n; // 'bigint'
```

It's important to use the primitive types (`string`, `number`, etc.) for clarity, simplicity, and performance reasons.

x??

---

**Rating: 8/10**

#### Excess Property Checking
Excess property checking is a mechanism provided by TypeScript that helps catch errors where an object literal has properties that do not match the declared type. This check ensures that only known properties are used, which can prevent mistakes such as typos or unintended extra properties.

:p What is excess property checking and when does it occur?
??x
Excess property checking occurs when you assign an object literal to a variable with a declared type or pass it as an argument to a function. It ensures that the object literal only has known properties defined by the type, which helps catch typos or unintended extra properties.

For example:
```typescript
interface Room {
    numDoors: number;
    ceilingHeightFt: number;
}

const r: Room = {    // Excess property checking would flag 'elephant' as unknown here
    numDoors: 1,
    ceilingHeightFt: 10,
    elephant: 'present', 
};
```
x??

---
#### Example of Excess Property Checking
The example demonstrates how TypeScript enforces the use of only known properties when assigning an object literal to a variable with a declared type.

:p Provide an example where excess property checking would occur.
??x
Consider this scenario:
```typescript
interface Options {
    title: string;
    darkMode?: boolean;
}

function createWindow(options: Options) {
    if (options.darkMode) {      setDarkMode();    }
} 

createWindow({    
    title: 'Spider Solitaire', 
    darkmode: true // This triggers excess property checking
});
```
TypeScript will flag `darkmode` as an unknown property, suggesting that it should be `darkMode`.

x??

---
#### Understanding TypeScript's Type System with Excess Property Checking
This example illustrates how even though the code does not throw a runtime error, it is likely to fail in achieving what was intended due to the type system’s checks.

:p Explain why using `darkmode` instead of `darkMode` might cause issues.
??x
Using `darkmode` instead of `darkMode` can lead to unexpected behavior because TypeScript expects the exact property names as defined in the interface. The correct name is `darkMode`, and since `darkmode` does not exist in the type, it causes an error during compile-time checking.

The example shows how:
```typescript
interface Options {
    title: string;
    darkMode?: boolean;
}

const createWindow = (options: Options) => { 
    if (options.darkMode) {      setDarkMode();    } 
};

createWindow({
    title: 'Spider Solitaire', 
    darkmode: true // This triggers an error
});
```
The error highlights the typo and ensures that the intended property name is used.

x??

---
#### Using Intermediate Variables to Bypass Excess Property Checking

:p How can using intermediate variables help bypass excess property checking?
??x
Using intermediate variables without type annotations allows you to bypass excess property checking. When TypeScript sees an object literal directly assigned to a variable with a declared type, it performs the check for known properties. However, when you use an intermediate variable (with or without type annotation), the check is not applied.

Example:
```typescript
interface Options {
    title: string;
    darkMode?: boolean;
}

const createWindow = (options: Options) => { 
    if (options.darkMode) {      setDarkMode();    } 
};

// Direct assignment triggers excess property checking
createWindow({
    title: 'Spider Solitaire', 
    darkmode: true // This will fail
});

// Using an intermediate variable bypasses the check
const intermediate = {
    darkmode: true, 
    title: 'Ski Free' 
};
createWindow(intermediate); // No error here

// Without type annotation, it also bypasses the check
const o = { darkmode: true, title: 'MS Hearts' };
createWindow(o); // No error here
```
x??

---
#### Type Assertions and Excess Property Checking

:p How does using a type assertion affect excess property checking?
??x
Using a type assertion in TypeScript bypasses the excess property checking. When you explicitly cast an object to a certain type using `as`, TypeScript assumes that all properties match the target type, even if they are not known.

Example:
```typescript
interface Options {
    title: string;
    darkMode?: boolean;
}

const createWindow = (options: Options) => { 
    if (options.darkMode) {      setDarkMode();    } 
};

// Direct assignment triggers excess property checking
createWindow({
    title: 'Spider Solitaire', 
    darkmode: true // This will fail
});

// Using a type assertion bypasses the check
const o = { darkmode: true, title: 'MS Hearts' } as Options;
createWindow(o); // No error here
```
x??

---
#### Index Signatures and Excess Property Checking

:p How do index signatures affect excess property checking in TypeScript?
??x
Index signatures allow extra properties that are not explicitly defined. When an interface has an index signature, it can include any number of additional properties beyond those specified by the rest of the interface.

Example:
```typescript
interface Options {
    darkMode?: boolean;
    [otherOptions: string]: unknown;
}

const o = { darkmode: true } as const;  // No error here due to index signature

// Without type assertion, it would trigger excess property checking
// const o = { darkmode: true }; // Error: 'darkmode' does not exist in type 'Options'
```
x??

---
#### Weak Types and Excess Property Checking

:p What is the role of "weak types" in relation to excess property checking?
??x
Weak types, which have only optional properties, undergo an additional check by TypeScript. This ensures that the value type and declared type share at least one common property.

Example:
```typescript
interface LineChartOptions {
    logscale?: boolean;
    invertedYAxis?: boolean;
    areaChart?: boolean;
}

function setOptions(options: LineChartOptions) { 
    // Function implementation here
} 

const opts = { logScale: true };  // Error: 'logScale' does not exist in type 'LineChartOptions'
```
This check ensures that the properties used match at least one of those defined in the interface, preventing typos and unintended property usage.

x??

---
#### Summary of Excess Property Checking

:p Summarize the key points about excess property checking.
??x
Excess property checking is a feature in TypeScript that helps catch errors by ensuring object literals only contain known properties as per the declared type. It triggers when you assign an object literal to a variable with a declared type or pass it as an argument to a function.

- Excess property checking occurs during assignments and function arguments.
- Using intermediate variables without type annotations can bypass this check.
- Type assertions also bypass excess property checking.
- Index signatures allow for additional properties beyond the defined ones.
- Weak types have at least one common property with the declared type, ensuring consistency.

These checks help catch typos and unintended extra properties, improving code quality and maintainability.

x??

**Rating: 8/10**

#### Applying Types to Entire Function Expressions
Background context explaining how TypeScript distinguishes between function statements and expressions, and why applying a type to an entire function can be beneficial. This helps reduce repetition and provides better safety checks.

:p What is the difference between a function statement and a function expression in TypeScript?
??x
In TypeScript, the primary difference lies in their declaration syntax:
- Function statement: A function declared with `function` keyword.
  ```typescript
  function rollDice1(sides: number): number {
      // ...
  }
  ```

- Function expression: A function declared using a variable assignment or arrow function.
  ```typescript
  const rollDice2 = function(sides: number): number {
      // ...
  };

  const rollDice3 = (sides: number): number => {
      // ...
  };
  ```

Applying types to entire functions can reduce redundancy and improve type inference and safety. For example, using a type alias for a binary operation:
```typescript
type BinaryFn = (a: number, b: number) => number;

const add: BinaryFn = (a, b) => a + b;
```

This approach consolidates the function signature with the implementation.
x??

---

#### Reducing Repetition with Function Types
Background context on how applying types to entire functions can reduce redundancy in defining multiple similar functions. This is particularly useful when performing common operations like arithmetic.

:p How can you consolidate repeated type annotations using a single function type?
??x
By using a type alias, you can avoid repeating the parameter and return types of each function:
```typescript
type BinaryFn = (a: number, b: number) => number;

const add: BinaryFn = (a, b) => a + b;
const sub: BinaryFn = (a, b) => a - b;
const mul: BinaryFn = (a, b) => a * b;
const div: BinaryFn = (a, b) => a / b;
```

This approach makes the logic more apparent and provides type safety. TypeScript infers the types of `add`, `sub`, `mul`, and `div` based on their function type.
x??

---

#### Matching Function Signatures with `typeof`
Background context explaining how to match the signature of an existing function by using `typeof`. This is useful for custom functions that mimic built-in ones.

:p How can you create a checked version of the fetch function?
??x
By applying the type of the original `fetch` function, you ensure the correct parameters and return types are used:
```typescript
const checkedFetch: typeof fetch = async (input, init) => {
    const response = await fetch(input, init);
    if (!response.ok) { // Note: Use ! for negation
        throw new Error(`Request failed: ${response.status}`);
    }
    return response;
};
```

If you mistakenly use `return` instead of `throw`, TypeScript will catch the error:
```typescript
// This will result in a type error
const checkedFetch: typeof fetch = async (input, init) => {
    const response = await fetch(input, init);
    if (!response.ok) { // Note: Use ! for negation
        return new Error(`Request failed: ${response.status}`); // Error here
    }
    return response;
};
```
x??

---

#### Using `Parameters` with Rest Parameters
Background context on how to use the `Parameters` utility type along with rest parameters to match function signatures while changing the return types.

:p How can you write a function that fetches a number from an API?
??x
By using `Parameters` and a rest parameter, you can create a new function that matches the signature of `fetch` but returns a number:
```typescript
async function fetchANumber(...args: Parameters<typeof fetch>): Promise<number> {
    const response = await checkedFetch(...args);
    const num = Number(await response.text());
    if (isNaN(num)) {
        throw new Error(`Response was not a number.`);
    }
    return num;
}
```

This approach ensures that `fetchANumber` takes the same arguments as `fetch`, but performs additional validation to ensure the returned value is a number.
x??

---

#### Benefits of Applying Types
Background context on how applying types can reduce repetition and improve safety in TypeScript functions.

:p Why should you consider applying type declarations to entire functions?
??x
Applying type declarations to entire functions can:
- Reduce redundancy by consolidating parameter and return type annotations.
- Improve readability and maintainability by separating logic from type definitions.
- Provide better static typing checks, catching errors early during development.
For example, instead of writing individual function signatures like this:
```typescript
function add(a: number, b: number) { /* ... */ }
function sub(a: number, b: number) { /* ... */ }
```

You can write a single type alias and use it for all functions:
```typescript
type BinaryFn = (a: number, b: number) => number;
const add: BinaryFn = (a, b) => a + b;
const sub: BinaryFn = (a, b) => a - b;
```

This approach is more concise and leverages TypeScript's type system effectively.
x??

---

