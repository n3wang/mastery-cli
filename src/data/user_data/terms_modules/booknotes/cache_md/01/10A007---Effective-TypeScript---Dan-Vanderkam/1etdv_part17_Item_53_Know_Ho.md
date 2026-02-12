# High-Quality Flashcards: 10A007---Effective-TypeScript---Dan-Vanderkam_processed (Part 17)


**Starting Chapter:** Item 53 Know How to Control the Distribution of Unions over Conditional Types

---


#### Preventing Distribution of Unions

Background context: In TypeScript, unions distribute over conditional types when the condition is a bare type. However, sometimes we want to prevent this distribution for specific use cases.

If applicable, add code examples with explanations:

```typescript
type Comparable<T> = 
  [T] extends [Date] ? Date | number : // Check if T is Date
  [T] extends [number] ? number :      // Check if T is number
  [T] extends [string] ? string :      // Check if T is string
  never;
```

:p How can we prevent a union from distributing over a conditional type?
??x
By wrapping the type `T` in a one-element tuple `[T]`, you can prevent unions from distributing. This works because the condition `[T] extends [Type]` is no longer a bare type but an array type, which stops distribution.

```typescript
type Comparable<T> = 
  [T] extends [Date] ? Date | number : // Check if T is Date
  [T] extends [number] ? number :      // Check if T is number
  [T] extends [string] ? string :      // Check if T is string
  never;
```
x??

---

#### Conditional Type Not Distributing

Background context: Sometimes, a conditional type does not distribute over unions due to the structure of the condition.

:p Why might a conditional type not distribute over a union?
??x
A conditional type may not distribute over a union if the condition is not structured as `N extends ...`. In the example provided, `NTuple<T, N>` uses an accumulator but does not distribute because the condition `Acc['length'] extends N` starts with the length of the accumulated array rather than checking if `N` extends any specific type.

```typescript
type NTuple<T, N extends number> = 
  NTupleHelp<T, N, []>;
  
type NTupleHelp<T, N extends number, Acc extends T[]> = 
  Acc['length'] extends N // This does not start with "N extends"
    ? Acc 
    : NTupleHelp<T, N, [T, ...Acc]>;

// Example
type PairOrTriple = NTuple<bigint, 2 | 3>; 
// Incorrectly results in: type PairOrTriple = [bigint, bigint]
```
x??

---

#### Fixing Conditional Type to Distribute

Background context: To fix the issue where a conditional type does not distribute over unions, we need to ensure that the condition starts with `N extends ...`.

:p How can you make sure a conditional type distributes over a union?
??x
To make a conditional type distribute over a union, the condition must start with `N extends ...`. In the provided example, this can be achieved by directly checking if `N` is one of the values in the union.

```typescript
type NTuple<T, N extends number> = 
  NTupleHelp<T, N, []>;
  
type NTupleHelp<T, N extends number, Acc extends T[]> = 
  (N extends 2 | 3 // Start with "N extends"
    ? (Acc['length'] extends N ? Acc : [])
    : []);

// Example
type PairOrTriple = NTuple<bigint, 2 | 3>;
// Correctly results in: type PairOrTriple = [bigint, bigint] | [bigint, bigint, bigint]
```
x??

---

#### Summary of Key Concepts

- **Preventing Distribution**: Use `[T]` to wrap the type and ensure unions do not distribute.
- **Distributing Conditionally**: Ensure the condition starts with `N extends ...` to allow distribution over unions.


#### Conditional Types and Union Distribution
Background context: In TypeScript, conditional types can be distributed over union types. This means that when a type parameter is a union, each member of the union will be processed individually by the conditional type.

:p What happens when a conditional type is applied to a union type?
??x
When a conditional type is applied to a union type, it processes each member of the union separately. This can result in unions of types or in some cases, `never` if no members match.
```typescript
type CelebrateIfTrue<V> = V extends true ? 'Huzzah.' : never;
type SurpriseParty = CelebrateIfTrue<boolean>;
```
x??

---

#### Recursive Generic Types with Accumulators
Background context: Using accumulators in recursive generic types can improve performance by reducing the number of type operations. This technique helps manage complex type transformations.

:p How does adding an accumulator to a recursive generic type help?
??x
Adding an accumulator to a recursive generic type helps avoid unnecessary instantiation and combination of intermediate results, thereby improving performance. The accumulator captures parts of the result as they are computed, reducing the overall complexity.
```typescript
type NTuple<T, N extends number> = 
    N extends number 
    ? NTupleHelp<T, N, []> 
    : never;
type NTupleHelp<T, N extends number, Acc extends any[]> =
  N extends (infer R) & 1
  ? NTupleHelp<T, N - 1, [...Acc, T]>
  : Acc;

type PairOrTriple = NTuple<bigint, 2 | 3>; // [bigint, bigint] | [bigint, bigint, bigint]
```
x??

---

#### Conditional Types and Booleans
Background context: When a conditional type is applied to a boolean union, it distributes over each member of the boolean union. This can lead to unexpected results if not handled carefully.

:p What happens when a conditional type is applied to `boolean`?
??x
When a conditional type is applied to `boolean`, it distributes over both `true` and `false`. As a result, the output includes types from both branches of the conditional type.
```typescript
type CelebrateIfTrue<V> = V extends true ? 'Huzzah.' : never;
type SurpriseParty = CelebrateIfTrue<boolean>;
```
x??

---

#### Conditional Types and the Never Type
Background context: The `never` type in TypeScript is a subtype of every other type. When used in conditional types, it can lead to surprising results due to distribution.

:p What happens when a conditional type involves the `never` type?
??x
When a conditional type involves the `never` type and no member matches, TypeScript will resolve it as `never`. This is because `never` acts as a wildcard that can match any type, but in this context, no branch of the conditional type matches.
```typescript
type AllowIn<T> = T extends { password: "open-sesame" } ? "Yes" : "No";
type N = AllowIn<never>; // never
```
x??

---


#### Conditional Types and Union Distribution

Background context: Conditional types in TypeScript are powerful tools that allow you to define complex type relationships. One of their most significant features is how they distribute over unions, which can significantly impact your generic types.

:p How does distribution work with conditional types over unions?
??x
Distribution works by applying the conditional type to each member of a union and then combining the results using a union. For example:

```typescript
type AllowIn<T> = AllowIn<T | never>;
// This is equivalent to:
type AllowIn<T> = AllowIn<T> | AllowIn<never>;
// Since `never` in TypeScript has no values, it simplifies to:
type AllowIn<T> = AllowIn<T> | never;
// Which further simplifies back to just:
type AllowIn<T> = AllowIn<T>
```

This means that if you have a generic type and want to apply conditional logic to every member of a union, the resulting type will be a union of those results.

```typescript
type F<never> = never; // F<never> must always be `never` when distribution applies.
```

:p How can one-tuples help manage union distribution in conditional types?
??x
Using one-tuples to wrap conditions can prevent unwanted distribution. For example:

```typescript
type AllowIn<T> = T extends string ? 'string' : never;
// Without a tuple, this would distribute over unions:
type AllowInUnion = AllowIn<'foo' | 'bar'>; // Results in "string" | never

// But by wrapping the condition in a one-tuple, we can disable distribution:
type AllowInTuple<T> = [T] extends [string] ? 'string' : never;
AllowInTuple<'foo' | 'bar'>; // Results in 'string'
```

This demonstrates that using tuples can control whether or not your conditional type distributes over unions.

??x
The answer with detailed explanations.
Using one-tuples to wrap conditions can prevent unwanted distribution. For example, consider the following type:

```typescript
type AllowIn<T> = T extends string ? 'string' : never;
```

Without a tuple, this would distribute over unions:

```typescript
type AllowInUnion = AllowIn<'foo' | 'bar'>; // Results in "string" | never
```

However, by wrapping the condition in a one-tuple, you can disable distribution:

```typescript
type AllowInTuple<T> = [T] extends [string] ? 'string' : never;
AllowInTuple<'foo' | 'bar'>; // Results in 'string'
```

This demonstrates that using tuples can control whether or not your conditional type distributes over unions, giving you more fine-grained control over how your types behave.

---


#### Template Literal Types

Background context: Template literal types allow you to model a subset of strings based on patterns. They are particularly useful when you want to enforce specific string structures in your code without resorting to the generic `string` type.

:p How do template literal types work?
??x
Template literal types let you define a set of strings that match a certain pattern. For example, consider the following:

```typescript
type PseudoString = `pseudo${string}`;
const science: PseudoString = 'pseudoscience';  // ok
const alias: PseudoString = 'pseudonym';       // ok
const physics: PseudoString = 'physics';       //    ~~~~~~~ Type '\"physics\"' is not assignable to type '`pseudo${string}`'.
```

Here, `PseudoString` represents a set of strings that start with the prefix "pseudo". This ensures that only values matching this pattern are valid.

:p What are some practical uses for template literal types?
??x
Template literal types can be used in various scenarios where you want to enforce specific string patterns. For example:

- **DSLs (Domain Specific Languages):** Define a set of allowed strings for a particular domain.
- **Prefix Patterns:** Ensure that strings match certain prefixes or suffixes, such as "pseudo" or "data-".
- **Configuration Keys:** Enforce consistent naming conventions in configuration files.

:p Can you provide an example using template literal types with a prefix pattern?
??x
Certainly! Here’s an example of using template literal types to enforce a specific prefix pattern:

```typescript
type PseudoString = `pseudo${string}`;
const science: PseudoString = 'pseudoscience';  // ok
const alias: PseudoString = 'pseudonym';       // ok
const physics: PseudoString = 'physics';       //    ~~~~~~~ Type '\"physics\"' is not assignable to type '`pseudo${string}`'.
```

In this example, `PseudoString` ensures that only strings starting with "pseudo" are valid.

??x
The answer with detailed explanations.
Template literal types allow you to model a subset of strings based on patterns. For example, in the given code:

```typescript
type PseudoString = `pseudo${string}`;
const science: PseudoString = 'pseudoscience';  // ok
const alias: PseudoString = 'pseudonym';       // ok
const physics: PseudoString = 'physics';       //    ~~~~~~~ Type '\"physics\"' is not assignable to type '`pseudo${string}`'.
```

`PseudoString` represents a set of strings that start with the prefix "pseudo". This ensures that only values matching this pattern are valid, providing a way to enforce specific string structures in your code.

---


#### Template Literal Types and CSS Selector Parsing
Background context explaining how template literal types can be used to create precise and accurate type definitions for complex string patterns, such as CSS selectors. This is particularly useful when working with the Document Object Model (DOM) in TypeScript.

```typescript
type CSSSpecialChars = ' ' | '>' | '+' | '~' | '|' | ',';
type HTMLTag = keyof HTMLElementTagNameMap;

declare global {
    interface ParentNode {
        // Escape hatch for complex selectors
        querySelector(
            selector: `${HTMLTag}#${string}${CSSSpecialChars}${string}`
        ): Element | null;

        // Standard method for simple selectors
        querySelector<TagName extends HTMLTag>(
            selector: `${TagName}#${string}`
        ): HTMLElementTagNameMap[TagName] | null;
    }
}
```

:p How can template literal types help in creating precise and accurate type definitions for CSS selectors?
??x
Template literal types allow you to model structured subsets of string types, making it possible to define the exact pattern required for a CSS selector. By combining these with other TypeScript features like conditional types and mapped types, you can achieve highly specific and accurate type annotations.

For example:
- `${HTMLTag}#${string}${CSSSpecialChars}${string}` is used to represent a more complex selector structure.
- This approach ensures that the type system accurately reflects the possible structure of selectors, preventing errors where invalid or unexpected characters are used in CSS queries.

```typescript
const img = document.querySelector('img#spectacular-sunset'); //    ^? const img: HTMLImageElement | null
const img2 = document.querySelector('div#container img'); //    ^? const img2: Element | null
```

This ensures safe usage and reduces the likelihood of runtime errors.
x??

---

#### Recursive Type Transformation with `ToCamel`
Background context explaining how to use recursive types in TypeScript to transform snake_case strings into camelCase, which is useful for converting key names from one format to another.

:p How can you create a recursive type that transforms snake_case strings into camelCase?
??x
You can use a combination of conditional types and the `infer` keyword to create a recursive type transformation. This approach involves breaking down the string at each underscore, capitalizing the first letter after an underscore, and combining them back together.

```typescript
type ToCamelOnce<S extends string> = S extends `${infer Head}_${infer Tail}`
    ? `${Head}${Capitalize<Tail>}`
    : S;

type T = ToCamelOnce<'foo_bar'>;  // type is "fooBar"
```

For more complex strings with multiple underscores:
```typescript
type ToCamel<S extends string> = S extends `${infer Head}_${infer Tail}`
    ? `${Head}${Capitalize<ToCamel<Tail>>}`
    : S;

type T0 = ToCamel<'foo'>;  // type is "foo"
type T1 = ToCamel<'foo_bar'>;  // type is "fooBar"
type T2 = ToCamel<'foo_bar_baz'>;  // type is "fooBarBaz"
```

:p How does the `ToCamel` recursive type work to transform strings?
??x
The `ToCamel` type uses a conditional check to split the string at each underscore. If it finds an underscore, it extracts the part before and after the underscore using the `infer` keyword. It then combines these parts into a new string where the first letter after the underscore is capitalized.

This process is recursive, meaning that if there are multiple underscores in the input string, it will continue to break down the string until all parts have been transformed.

Here's an example breakdown:
```typescript
type T2 = ToCamel<'foo_bar_baz'>;
```

1. The type `T2` checks for an underscore and finds one.
2. It extracts "foo" as `Head` and "bar_baz" as `Tail`.
3. It then calls `ToCamel<Tail>` on "bar_baz".
4. The result of the recursive call is `"barBaz"`, so combining it with "foo" gives us "fooBarBaz".

This ensures that all parts of a snake_case string are transformed into camelCase.
x??

---

#### Mapped Types for Object Key Transformation
Background context explaining how mapped types can be used to transform object keys from one format (e.g., snake_case) to another (e.g., camelCase), ensuring precise and accurate type definitions.

:p How can you use TypeScript's mapped types to transform the keys of an object from snake_case to camelCase?
??x
You can use a mapped type in combination with a helper function to transform the keys of an object. The `ToCamel` type is used as a key transformation function within the mapped type.

Here’s how it works:
```typescript
type ObjectToCamel<T extends object> = {
    [K in keyof T as ToCamel<K & string>]: T[K];
};

function objectToCamel<T extends object>(obj: T): ObjectToCamel<T> {
    const out: any = {};
    for (const [k, v] of Object.entries(obj)) {
        out[camelCase(k)] = v;
    }
    return out;
}
```

This mapped type rewrites the keys using the `ToCamel` helper function and assigns the corresponding values.

:p How does the `ObjectToCamel<T>` mapped type work to transform object keys?
??x
The `ObjectToCamel<T>` mapped type uses a mapped type with a key remapping syntax. For each key in the input object, it applies the `ToCamel` helper function to transform the key and maps it to the corresponding value.

Here’s how it works step-by-step:
1. The mapped type iterates over all keys of the input object.
2. It uses the `as` keyword to apply the `ToCamel` transformation to each key.
3. It creates a new property with the transformed key and assigns the original value to it.

For example, if you have an object `{foo_bar: 12}`:
```typescript
const snake = {foo_bar: 12}; //    ^? const snake: { foo_bar: number; }
const camel = objectToCamel(snake); //    ^? const camel: ObjectToCamel<{ foo_bar: number; }> //                    (equivalent to { fooBar: number; })
```

The `camel` object will have the key `fooBar` with a type of `number`, while accessing `foo_bar` would result in an error because it does not exist on the transformed type.

This ensures that your code remains type-safe and provides accurate typing for camelCase keys.
x??

---

#### Conditional Types and Mapped Types
Background context explaining how to use conditional types and mapped types together to achieve precise and accurate type definitions, particularly useful in complex scenarios like transforming key names or parsing domain-specific languages (DSLs).

:p How can you combine conditional types and mapped types to create a more precise and accurate type definition for an object's keys?
??x
You can combine conditional types and mapped types to transform the keys of an object from one format to another, ensuring that the resulting type is highly specific and accurate. This involves using a helper function like `ToCamel` to perform the key transformation.

Here’s how you can do it:

1. Define a helper type for transforming snake_case to camelCase.
2. Use this helper in a mapped type to rewrite object keys.

Example:
```typescript
type ToCamelOnce<S extends string> = S extends `${infer Head}_${infer Tail}`
    ? `${Head}${Capitalize<Tail>}`
    : S;

type ToCamel<S extends string> = S extends `${infer Head}_${infer Tail}`
    ? `${Head}${Capitalize<ToCamel<Tail>>}`
    : S;

function objectToCamel<T extends object>(obj: T): { [K in keyof T as ToCamel<K & string>]: T[K] } {
    const out: any = {};
    for (const [k, v] of Object.entries(obj)) {
        out[camelCase(k)] = v;
    }
    return out;
}
```

This combination ensures that your object keys are transformed accurately while maintaining precise types.

:p How do conditional types and mapped types work together to transform object keys?
??x
Conditional types allow you to create complex type transformations based on conditions, making it possible to split strings at specific delimiters (like underscores) and apply transformations. Mapped types enable you to iterate over the properties of an object and perform these transformations.

Here’s a breakdown:
1. **ToCamelOnce**: This is a simple transformation that handles one level of snake_case to camelCase conversion.
2. **ToCamel**: This uses recursion to handle multiple levels of snake_case keys in complex strings.
3. **ObjectToCamel**: Uses the mapped type syntax with `as` and a helper function like `camelCase` to transform the keys.

By combining these, you can ensure that your object’s keys are transformed accurately while maintaining precise types, providing a more robust type system for your application.

For example:
```typescript
const snake = {foo_bar: 12}; //    ^? const snake: { foo_bar: number; }
const camel = objectToCamel(snake); //    ^? const camel: ObjectToCamel<{ foo_bar: number; }> //                    (equivalent to { fooBar: number; })
```

This ensures that `camel.fooBar` has the correct type, and accessing `foo_bar` would result in an error.
x??

---


#### Assignability Testing with TypeScript

Background context: When working with TypeScript, you might use assignment for testing type declarations. This method provides some confidence that your type declaration is doing something sensible with types. However, there are limitations and issues associated with this approach.

:p What is a primary issue when using assignment for testing in TypeScript?
??x
A primary issue is that the check uses assignability rather than equality, which can lead to unexpected behavior. For instance, an array of objects might be assignable to an array of simpler objects, even if they don't match exactly.
x??

---
#### Boilerplate and Unused Variable Issues

Background context: To perform assignment-based type checks in TypeScript, you often need to define helper functions, which introduces boilerplate code. Additionally, these helper variables are likely to be unused, leading to linting warnings.

:p How can you work around the issue of unused variables when performing type checks?
??x
You can create a helper function that takes a value and asserts its type without actually using it:

```typescript
function assertType<T>(x: T) {}
```

Then use this helper in your type check:

```ts
assertType<number[]>(map(['john', 'paul'], name => name.length));
```
x??

---
#### Function Type Assignability

Background context: When checking function types with assignment, TypeScript allows functions to be more general than the ones they are assigned to. This means a function that takes fewer parameters can still match a function type that expects more parameters.

:p Why does the following assertion succeed in TypeScript?
??x
```ts
const double = (x: number) => 2 * x;
assertType<(a: number, b: number) => number>(double);  // OK
```

This is because TypeScript's assignability rules allow a function that takes fewer parameters to be considered assignable to a function type that expects more. This behavior reflects the common JavaScript practice where functions can be called with more arguments than declared.
x??

---
#### Object Type Assignability

Background context: When checking object types, assignment-based checks might not reflect true equality but instead check if one type is assignable to another. For example, an array of objects with additional properties might still pass a type check for an array of simpler objects.

:p What issue arises when checking the following type with assignability?
??x
```ts
assertType<{name: string}[]>(map(beatles, name => ({      // OK
  name,
  inYellowSubmarine: name === 'ringo'
})));
```

The map function returns an array of objects with more properties than `{name: string}`, so the assignability check passes. However, this doesn't ensure that all expected properties are present.
x??

---
#### Complex Function Types and `this` Context

Background context: Assignability checks for functions can sometimes lead to unexpected behavior, especially when dealing with complex function types or dynamic contexts like `this`. TypeScript allows functions to be more general than the ones they are assigned to.

:p How does TypeScript handle this issue in Lodash's map function?
??x
Lodash’s map sets the value of `this` for its callback. While TypeScript can model this behavior, it might not always capture all the nuances required by dynamic contexts like `this`.

To properly test such complex functions, you may need to break down the type and check individual components or use advanced type utilities.
x??

---
#### Using Parameters and ReturnType

Background context: When dealing with function types, breaking them down into their component parts using `Parameters` and `ReturnType` can provide a more precise type check.

:p How can you use `Parameters` and `ReturnType` to test the types of functions?
??x
You can use these utility types to check the parameters and return type of a function:

```ts
const double = (x: number) => 2 * x;
declare let p: Parameters<typeof double>;
assertType<[number]>(p); // Argument of type '[number]' is not assignable to parameter of type [number, number]

declare let r: ReturnType<typeof double>;
assertType<number>(r);
```

This approach helps ensure that the function's parameters and return types are correct.
x??

---


#### expect-type Library Overview
Background context: The `expect-type` library is a powerful tool for testing TypeScript types. It integrates well with existing TypeScript test suites and helps catch type mismatches without requiring additional setup. This library leverages TypeScript's type system to ensure that functions, interfaces, and other constructs match the expected types.
:p What is `expect-type` used for?
??x
The `expect-type` library is used to verify that code adheres strictly to its defined types. It ensures that function parameters, return values, and object properties are of the correct type by utilizing TypeScript's structural type system. This helps in maintaining type safety and catching potential bugs early.
```typescript
import { expectTypeOf } from 'expect-type';

const beatles = ['john', 'paul', 'george', 'ringo'];
expectTypeOf(map(
    beatles,
    function(name, i, array) {
        expectTypeOf(name).toEqualTypeOf<string>();
        expectTypeOf(i).toEqualTypeOf<number>();
        expectTypeOf(array).toEqualTypeOf<string[]>();
        return name.length;
    }
)).toEqualTypeOf<number[]>();
```
x??

---

#### Type Mismatch Detection
Background context: The `expect-type` library is adept at catching type mismatches. When used correctly, it can pinpoint exactly where and what the types are not aligning as expected.
:p What happens when a type mismatch occurs in `expect-type`?
??x
When a type mismatch occurs in `expect-type`, the compiler will generate an error indicating that the expected type does not match the actual type. This helps developers to quickly identify and correct any type-related issues in their code.

For example, consider the following incorrect usage:
```typescript
const anyVal: any = 1;
expectTypeOf(anyVal).toEqualTypeOf<number>();
//                                 ~~~~~~
//           Type 'number' does not satisfy the constraint 'never'.
```
The error message `Type 'number' does not satisfy the constraint 'never'.` indicates that TypeScript cannot satisfy the type constraint because it expects a value of type `any`, but provides a number.
x??

---

#### Function Signature Testing
Background context: The `expect-type` library allows for detailed testing of function signatures, ensuring that the provided arguments and return values match the expected types.
:p How can you test function signatures using `expect-type`?
??x
Testing function signatures with `expect-type` involves verifying both the parameters and the return type. You can use the `toEqualTypeOf` method to ensure that each argument and the overall function signature matches the expected types.

Example:
```typescript
const double = (x: number) => 2 * x;
expectTypeOf(double).toEqualTypeOf<(a: number, b: number) => number>();
//                                 ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
//           Type ... does not satisfy '\"Expected: function, Actual: never\"'
```
This test checks that the `double` function has a return type of `(a: number, b: number) => number`, but since it only takes one parameter and returns a single value, it fails to match the expected signature.
x??

---

#### Interface Testing with `expect-type`
Background context: The `expect-type` library can also be used to test interfaces by ensuring that object properties adhere to the defined structure. This is particularly useful for catching errors related to property types or presence/absence of properties.
:p How do you use `expect-type` to test interface types?
??x
Using `expect-type` to test interface types involves comparing an object's actual type with the expected interface type using `toEqualTypeOf`. You can check if all required properties are present and have the correct types.

Example:
```typescript
interface ABReadOnly {
    readonly a: string;
    b: number;
}

declare let ab: {a: string, b: number};
expectTypeOf(ab).toEqualTypeOf<ABReadOnly>();
//               ~~~~~~~~~~~~~
//           Arguments for the rest parameter 'MISMATCH' were not provided.
```
This test verifies that `ab` matches the `ABReadOnly` interface. Since `ab` does not have a `readonly` modifier and all properties are present, it passes.
x??

---

#### Structural Type Testing
Background context: One of the key advantages of using `expect-type` is its ability to perform structural type testing, which means that types are compared based on their structure rather than their exact identity. This allows for more flexible type checking without getting confused by superficial differences like order in unions or tuples.
:p What advantage does structural type testing offer over nominal typing?
??x
Structural type testing offers an advantage over nominal typing because it checks whether the actual structure of a type matches the expected structure, rather than just verifying if the types are identical. This is particularly useful when dealing with TypeScript's union and intersection types.

For example:
```typescript
type Test1 = Expect<Equals<typeof double, (x: number) => number>>;
type Test2 = Expect<Equals<typeof double, (x: string) => number>>;
//                  ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
//                  Type 'false' does not satisfy the constraint 'true'.
```
In this case, `Test1` correctly identifies that the function matches the expected signature, while `Test2` fails because the parameter type does not match.
x??

