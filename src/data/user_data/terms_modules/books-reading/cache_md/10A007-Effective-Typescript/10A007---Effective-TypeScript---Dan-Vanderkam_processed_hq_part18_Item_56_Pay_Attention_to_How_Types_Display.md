# High-Quality Flashcards: 10A007---Effective-TypeScript---Dan-Vanderkam_processed (Part 18)

**Rating threshold:** >= 8/10

**Starting Chapter:** Item 56 Pay Attention to How Types Display

---

**Rating: 8/10**

#### Pay Attention to How Types Display
Background context explaining the importance of how types display. The way TypeScript libraries choose to display their types can greatly affect user experience and understanding.

In this example, we are dealing with a `PartiallyPartial` generic type that makes some properties optional while keeping others mandatory. This is implemented using TypeScript's utility types like `Partial`, `Pick`, and `Omit`.

:p How does the initial implementation of `PartiallyPartial` look?

??x
The initial implementation uses utility types to make some properties optional but results in a display that can be less user-friendly.

```typescript
type PartiallyPartial<T, K extends keyof T> = 
  Partial<Pick<T, K>> & Omit<T, K>;

interface BlogComment {
    commentId: number;
    title: string;
    content: string;
}

type PartComment = PartiallyPartial<BlogComment, 'title'>; // { Partial<Pick<BlogComment, "title">> & Omit<BlogComment, "title"> }
```

x??

---
#### Using Resolve to Improve Type Display
Explanation on how `Resolve` works and why it's useful for displaying types more clearly. `Resolve` is a homomorphic mapped type that flattens out the display of object properties.

:p What does the `Resolve` helper do?

??x
The `Resolve` helper uses a homomorphic mapped type to flatten out the display of all properties in an object type, making it clearer for users while hiding implementation details.

```typescript
type Resolve<T> = T extends Function ? T : {[K in keyof T]: T[K]};
```

Using this with the `PartiallyPartial` type makes the resulting type more user-friendly:

```typescript
type PartiallyPartial<T, K extends keyof T> = 
  Resolve<Partial<Pick<T, K>> & Omit<T, K>>;

type PartComment = PartiallyPartial<BlogComment, 'title'>; // { title?: string | undefined; commentId: number; content: string; }
```

x??

---
#### Dealing with Special Cases in Type Display
Explanation on how to handle special cases where the type parameter is `never`.

:p How does handling the case where `K` is `never` affect the display of `PartiallyPartial`?

??x
Handling the case where `K` is `never` allows for a more concise representation. In this scenario, no properties are marked as optional.

```typescript
type PartiallyPartial<T extends object, K extends keyof T> = 
  [K] extends [never]
    ? T // special case
    : T extends unknown
      ? Resolve<Partial<Pick<T, K>> & Omit<T, K>>
      : never;

type FullComment = PartiallyPartial<BlogComment, never>; // BlogComment
```

x??

---
#### Using Other Techniques to Adjust Type Display
Explanation on other techniques like `Exclude<keyof T, never>` and `unknown & T` or `{}` & T.

:p How can the use of `Exclude<keyof T, never>` improve type display?

??x
Using `Exclude<keyof T, never>` can inline `keyof` expressions, making them more readable:

```typescript
type Chan = keyof Color; // keyof Color
type ChanInline = Exclude<keyof Color, never>; // "r" | "g" | "b" | "a"
```

x??

---
#### Handling Classes in Resolve
Explanation on how `Resolve` can sometimes be too aggressive when applied to classes.

:p How does `Resolve` handle the `Date` class?

??x
`Resolve` can make types overly verbose, especially for classes. For example:

```typescript
type D = Resolve<Date>; // { toLocaleString: ...; ... 42 more methods; [Symbol.toPrimitive]: ...; }
```

In this case, it's better to let the type display as `Date`.

x??

---
#### Applying Resolve to Object Types
Explanation on how `Resolve` can inline object types.

:p How does using `unknown & T` or `{}` & T compare with `Resolve` for inlining object types?

??x
Both `unknown & T` and `{}` & T can be used to inline object types, but they are less brittle than `Resolve`.

```typescript
type U = unknown & { r: number; g: number; b: number; a: number }; // { r: number; g: number; b: number; a: number }
```

x??

---
#### Ensuring Legibility Without Sacrificing Clarity
Explanation on the importance of maintaining legibility in type displays.

:p How should you approach changing type displays to ensure clarity without sacrificing readability?

??x
When changing type displays, it's important to maintain legibility. Avoid compromising one aspect for another. For example:

```typescript
type ChanInline = Resolve<keyof Color>; // "r" | "g" | "b" | "a"
```

This improves readability while keeping the display clear.

x??

---

**Rating: 8/10**

#### Tail-Recursive Generic Types

Background context: Tail recursion is a form of recursion where the recursive call is the last operation in the function. This allows for tail call optimization (TCO), which can prevent stack overflow errors by reusing the current stack frame.

:p What are the benefits and importance of making generic types tail-recursive?
??x
Tail-recursive functions have several advantages:
1. They avoid stack overflow issues since they reuse the same stack frame.
2. They are more efficient as they reduce the overhead associated with multiple function calls.
3. They allow for better optimization by compilers.

For TypeScript, this is particularly important because TypeScript's type system supports complex generic types that can become deeply nested and potentially lead to stack overflows if not optimized properly.

C/Java code or pseudocode: 
```typescript
// Non-tail-recursive version of a function
function sum(nums: number[]): number {
    if (nums.length === 0) return 0;
    return nums[0] + sum(nums.slice(1));
}

// Tail-recursive version with accumulator
function tailSum(nums: number[], acc = 0): number {
    if (nums.length === 0) return acc;
    return tailSum(nums.slice(1), acc + nums[0]);
}
```
x??

---

#### Understanding the GetChars Generic Type

Background context: The `GetChars` generic type is used to convert a string literal type into the union of its characters. This can be useful for processing or manipulating strings at the type level.

:p How does the `GetChars` generic type work, and why might it lead to stack overflow issues?
??x
The `GetChars` generic type works by recursively breaking down the string into its first character and the rest of the string until there are no more characters left. However, if the input string is very long, this can cause a stack overflow.

Example code:
```typescript
type GetChars<S extends string> = 
    S extends `${infer FirstChar}${infer RestOfString}` ? 
        FirstChar | GetChars<RestOfString> : never;

// Example usage
type ABC = GetChars<"abc">; // type ABC = "a" | "b" | "c"
```
This works by pattern matching on the string, but it performs a union with `FirstChar` after each recursive call. For very long strings (like over 50 characters), this can lead to excessive depth and potentially infinite recursion.

x??

---

#### Implementing Tail-Recursive ToSnake Generic Type

Background context: The `ToSnake` generic type converts snake_case string literal types into camelCase, but it is not tail-recursive, which means it might cause stack overflow issues for long input strings. Making it tail-recursive can solve these problems.

:p How does the non-tail-recursive version of the `ToSnake` function work, and why can it lead to stack overflow?
??x
The non-tail-recursive version of the `ToSnake` function processes each character in a string recursively by checking if the current character is uppercase. If so, it prepends an underscore and converts the character to lowercase before continuing the recursion.

Example code:
```typescript
type ToSnake<T extends string> = 
    T extends `${infer First}${infer Rest}` ? 
        (First extends Uppercase<First> 
            ? `_${Lowercase<First>}${ToSnake<Rest>}` 
            : `${First}${ToSnake<Rest>}`) : T;

// Example usage
type S = ToSnake<'fooBarBaz'>; // type S = "foo_bar_baz"
```
This function performs a recursive call after performing operations on the string, which means it is not tail-recursive. For very long strings (like over 50 characters), this can lead to excessive depth and potentially infinite recursion.

x??

---

#### Tail-Recursive ToSnake Generic Type Implementation

Background context: To avoid stack overflow issues, we need to make the `ToSnake` function tail-recursive by using an accumulator that accumulates the result as it processes each character.

:p How does the tail-recursive version of the `ToSnake` function work?
??x
The tail-recursive version of the `ToSnake` function uses an accumulator to build the resulting string. It checks if the input type is a simple string (base case) or recursively processes each character by appending it to the accumulator.

Example code:
```typescript
type ToSnake<T extends string, Acc extends string = ""> = 
    T extends `${infer First}${infer Rest}` ? 
        ToSnake<Rest, First extends Uppercase<First> 
            ? `${Acc}_${Lowercase<First>}` : `${Acc}${First}`>
    : Acc;

// Example usage
type S = ToSnake<'fooBarBaz'>; // type S = "foo_bar_baz"
```
This version works by processing each character and appending it to the accumulator in a tail-recursive manner, which avoids deep recursion and stack overflow issues.

x??

---

**Rating: 8/10**

#### Exhaustiveness Checking Using Never Types

Background context: In TypeScript, exhaustive checking is a technique to ensure that all possible cases of an enumerated type are handled. This avoids runtime errors by catching missing cases during development through static type analysis.

If you have a union type and want to perform operations on its members exhaustively, the `never` type can be used in a switch statement's `default` case to catch any missed patterns.

:p How does using the `never` type help with exhaustive checking?
??x
Using the `never` type in a switch statement’s default case helps TypeScript identify missing cases. When all possible cases are covered, the type of the variable within the default case will be `never`, which is an empty type. If any cases are missed, TypeScript will flag it as a type error.

```typescript
function processShape(shape: Shape) {
    switch (shape.type) {
        case 'box':
            break;
        case 'circle':
            break;
        // Case for line is missing
        default:
            shape; // Type of `shape` here would be `never` if the cases were exhaustive.
    }
}
```
x??

---

#### Adding a New Shape to an Existing Enumerated Type

Background context: When adding a new member to an existing enumerated type (like shapes in this case), it's crucial to ensure that all previous operations and functions handle the new addition. Failing to do so can result in runtime errors or silent failures.

:p What happens when a new shape is added without updating the switch statement?
??x
When a new shape is added but not accounted for in existing logic (like a switch statement), the program will run correctly at runtime, but TypeScript won't catch this omission. For example:

```typescript
interface Line {
    type: 'line';
    start: Coord;
    end: Coord;
}

type Shape = Box | Circle | Line;

function drawShape(shape: Shape, context: CanvasRenderingContext2D) {
    switch (shape.type) {
        case 'box':
            context.rect(...shape.topLeft, ...shape.size);
            break;
        case 'circle':
            context.arc(...shape.center, shape.radius, 0, 2 * Math.PI);
            break; // Missing the line case
        // No default or case for line here.
    }
}
```
In this example, a `line` shape will be ignored by the `drawShape` function.

x??

---

#### Ensuring All Cases Are Handled Using `never`

Background context: To ensure all cases are handled in TypeScript, particularly with union types and exhaustive checks, the `never` type can be used. This type is only assignable if no other cases match, making it useful for catching unhandled scenarios.

:p How does using a `default` case with `never` help?
??x
Using a `default` case with the `never` type forces TypeScript to check that all possible cases of an enumerated type are handled. If any cases are missed, TypeScript will throw an error because there is no value of type `never`.

```typescript
function processShape(shape: Shape) {
    switch (shape.type) {
        case 'box':
            break;
        case 'circle':
            break;
        case 'line': // Added to handle the new shape
            break; 
        default:
            shape; // This will be of type `never` if all cases are covered.
    }
}
```
This ensures that any missing `case` statements in a union type will result in a compile-time error.

x??

---

#### The Never Type as an Empty Set

Background context: The `never` type represents the empty set of values. It is used to indicate that something cannot happen under certain conditions, such as a function that always throws an exception or never returns normally.

:p What does the `never` type represent in TypeScript?
??x
The `never` type in TypeScript represents the empty set of values and is used when a value can never be produced. It often appears in situations where functions are guaranteed to throw an error or enter into an infinite loop, making them not return normally.

For example:

```typescript
function throwError(message: string): never {
    throw new Error(message);
}

// A function that will always run until the end of time (hypothetical)
function foreverLoop(): never {
    while (true) {}
}
```
In these examples, `throwError` and `foreverLoop` are marked with `never` to indicate they do not return.

x??

**Rating: 8/10**

#### Exhaustiveness Checking in TypeScript
Background context explaining the need for exhaustiveness checking. This ensures that all possible cases are handled, preventing runtime errors due to unhandled cases.
:p What is the purpose of assertUnreachable in TypeScript?
??x
The `assertUnreachable` function is used to indicate that a certain code path should never be reached under normal circumstances. It helps prevent runtime errors by ensuring that all potential cases of an enum or union type are covered. If you introduce a new case, attempting to run the unreachable code will result in a compile-time error.
```typescript
function drawShape(shape: Shape, context: CanvasRenderingContext2D) {
    switch (shape.type) {
        case 'box':
            // drawing logic for box
            break;
        case 'circle':
            // drawing logic for circle
            break;
        default:
            assertUnreachable(shape);  // This ensures that all cases are covered.
    }
}
```
x??

---

#### Handling Missing Return Values in TypeScript Functions
Background context explaining the importance of return values and why they need to be handled properly. Discusses how omitting a return value can lead to errors during runtime.
:p Why is it important to annotate return types for functions with multiple returns in TypeScript?
??x
Annotating return types for functions with multiple returns ensures that the function always returns a value, which helps prevent undefined behavior and makes the code more predictable. If you don't explicitly define the return type or its possible values, TypeScript will assume it can be `undefined`. This can lead to runtime errors if the caller of the function expects a specific value.
```typescript
function getArea(shape: Shape): number {
    // Without annotation, TypeScript infers the return type as number | undefined
    switch (shape.type) {
        case 'box':
            const [width, height] = shape.size;
            return width * height;
        case 'circle':
            return Math.PI * shape.radius ** 2;
    }
}
```
x??

---

#### Using Never Type in TypeScript Functions
Background context explaining the use of `never` type and how it can be used to handle unreachable code paths. The `never` type is useful for signaling that a function will never return normally.
:p How does using the `never` type help with exhaustiveness checking?
??x
Using the `never` type helps ensure that all possible cases in a union or enum are handled by TypeScript. By returning `never`, you signal to the compiler that this branch of code is unreachable, which forces you to cover every case explicitly.
```typescript
function getArea(shape: Shape): number {
    switch (shape.type) {
        case 'box':
            const [width, height] = shape.size;
            return width * height;
        case 'circle':
            return Math.PI * shape.radius ** 2;
        case 'line':
            return 0; // A placeholder value
        default:
            return assertUnreachable(shape);  // Ensures all cases are covered.
    }
}
```
x??

---

#### Variations of Exhaustiveness Checking in TypeScript
Background context explaining different variations of exhaustiveness checking. Discusses how `assertUnreachable`, `satisfies never`, and other patterns ensure that code paths are handled correctly.
:p What is the purpose of using `satisfies never` or direct assignment to `never`?
??x
The purpose of using `satisfies never` or directly assigning a value to `never` is to inform TypeScript that certain branches of code are unreachable and should not be executed. This helps catch potential errors early by ensuring all possible cases are covered, even in complex switch statements.
```typescript
function processShape(shape: Shape) {
    switch (shape.type) {
        case 'box':
            break;
        case 'circle':
            break;
        default:
            const exhaustiveCheck: never = shape;  // Direct assignment to `never`
            throw new Error(`Missed a case: ${exhaustiveCheck}`);
    }
}
```

```typescript
function processShape(shape: Shape) {
    switch (shape.type) {
        case 'box':
            break;
        case 'circle':
            break;
        default:
            shape satisfies never;  // Using `satisfies` operator
            throw new Error(`Missed a case: ${shape}`);
    }
}
```
x??

---

**Rating: 8/10**

#### Template Literal Types and Exhaustiveness Checking

In TypeScript, template literal types can be used to create subtypes of `string` that consist of a fixed set of values. This technique is useful for ensuring all possible cases are handled explicitly. By leveraging this feature with exhaustiveness checking, you can catch potential bugs where some combinations might be overlooked.

:p How can we use template literal types and exhaustiveness checking in TypeScript to ensure all cases are covered?
??x
By using a template literal type combined with exhaustiveness checking, we can create a function that handles all possible pairs of values from a set. This technique is particularly useful when dealing with finite sets of options like game outcomes.

Here’s how you can implement this for the rock-paper-scissors example:

```typescript
type Play = 'rock' | 'paper' | 'scissors';

function shoot(a: Play, b: Play) {
  const pair = `${a},${b}` as `${Play},${Play}`;

  switch (pair) {
    case 'rock,rock':
    case 'paper,paper':
    case 'scissors,scissors':
      console.log('draw');
      break;
    case 'rock,scissors':
    case 'paper,rock':
      console.log('A wins');
      break;
    case 'rock,paper':
    case 'paper,scissors':
    case 'scissors,rock':
      console.log('B wins');
      break;
    default:
      assertUnreachable(pair);
  }
}

function assertUnreachable(value: never): never {
  throw new Error(`Exhaustiveness checking failed for ${value}`);
}
```

In this code, the `pair` variable is declared with a type that represents all possible combinations of two plays. The `switch` statement ensures that every case is explicitly handled, and if any cases are missed, TypeScript will generate an error indicating which combination was omitted.

The `assertUnreachable` function forces an error at runtime when a value is passed to it that should never be reached in this context. This helps catch bugs where all possible values have not been covered.
x??

---

#### Using Never Types and assertUnreachable

In TypeScript, you can use the `never` type to denote that certain branches of your code will never be executed. The `assertUnreachable` function is used when you want to ensure that a value should not occur, but if it does, there is an issue.

:p How do we use the `never` type and `assertUnreachable` in TypeScript?
??x
The `never` type in TypeScript represents values that never occur. It can be used as the return type of functions that will never return normally (like those with a throw statement or an infinite loop). The `assertUnreachable` function is typically used within switch statements to ensure that all possible cases are covered.

Here’s how you can use it:

```typescript
type Play = 'rock' | 'paper' | 'scissors';

function shoot(a: Play, b: Play): void {
  const pair = `${a},${b}` as `${Play},${Play}`;

  switch (pair) {
    case 'rock,rock':
    case 'paper,paper':
    case 'scissors,scissors':
      console.log('draw');
      break;
    case 'rock,scissors':
    case 'paper,rock':
      console.log('A wins');
      break;
    case 'rock,paper':
    case 'paper,scissors':
    case 'scissors,rock':
      console.log('B wins');
      break;
    default:
      assertUnreachable(pair);
  }
}

function assertUnreachable(value: never): never {
  throw new Error(`Exhaustiveness checking failed for ${value}`);
}
```

In the `assertUnreachable` function, you pass a value that TypeScript expects to be impossible. If such a value is reached during runtime, it will trigger an error.

This technique ensures that all cases are handled and helps prevent bugs related to unhandled conditions.
x??

---

#### Using Exhaustiveness Checking with linters

Linters like `@typescript-eslint` can help enforce exhaustiveness checking by providing rules specifically for switch statements. These tools ensure that your code is exhaustive without needing explicit `assertUnreachable` calls.

:p How does the `switch-exhaustiveness-check` rule from `@typescript-eslint` work?
??x
The `@typescript-eslint/switch-exhaustiveness-check` rule enforces exhaustiveness checking on switch statements in TypeScript. It ensures that all possible cases are handled, which helps prevent bugs where some branches might be overlooked.

Here’s how you can enable this rule and use it:

1. Install the necessary package:
   ```bash
   npm install @typescript-eslint/eslint-plugin --save-dev
   ```

2. Add the rule to your ESLint configuration file (e.g., `.eslintrc.json`):
   ```json
   {
     "rules": {
       "@typescript-eslint/switch-exhaustiveness-check": "error"
     }
   }
   ```

3. Implement a switch statement:
   ```typescript
   type Play = 'rock' | 'paper' | 'scissors';

   function shoot(a: Play, b: Play): void {
     const pair = `${a},${b}` as `${Play},${Play}`;

     switch (pair) {
       case 'rock,rock':
       case 'paper,paper':
       case 'scissors,scissors':
         console.log('draw');
         break;
       case 'rock,scissors':
       case 'paper,rock':
         console.log('A wins');
         break;
       case 'rock,paper':
       case 'paper,scissors':
       case 'scissors,rock':
         console.log('B wins');
         break;
     }
   }
   ```

With this rule enabled, ESLint will automatically check for exhaustiveness. If a case is missing, it will generate an error, indicating which combination was not covered.

This approach simplifies the process of ensuring all cases are handled and can be more convenient than manually adding `assertUnreachable` calls.
x??

---

