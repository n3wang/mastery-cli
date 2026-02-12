# High-Quality Flashcards: 10A007---Effective-TypeScript---Dan-Vanderkam_processed (Part 11)


**Starting Chapter:** Item 35 Prefer More Precise Alternatives to String Types

---


#### Prefer More Precise Alternatives to String Types
String types are often used broadly, but they can mask errors and hide relationships between types. By using more precise alternatives, you improve type safety and code readability.

:p What is a "stringly typed" function parameter?
??x
A "stringly typed" function parameter uses the string type without specifying the exact kind of data it should contain. This can lead to issues because any string value can be passed, even if only certain types are valid.
```typescript
function recordRelease(title: string, date: string) {
    // ... implementation ...
}
recordRelease(kindOfBlue.releaseDate, kindOfBlue.title);  // OK, should be error
```
x??

---

#### Use Union Types for Narrowing String Types
Union types allow you to specify multiple possible values for a type, making the code more precise and catching potential errors.

:p How can you define a union type for recording types?
??x
You can define a union type using the `|` operator to list all possible values. This ensures that only valid types are used.
```typescript
type RecordingType = 'studio' | 'live';
```
x??

---

#### Use Keyof Types for Function Parameters
The `keyof` type allows you to specify which keys of an object can be used as function parameters, improving type safety.

:p How does using `keyof Album` improve the pluck function?
??x
Using `keyof Album` ensures that only valid keys from the Album interface are accepted, preventing errors and making the code more readable.
```typescript
function pluck<T, K extends keyof T>(records: T[], key: K): T[K][] {
    return records.map(r => r[key]);
}
```
x??

---

#### Avoid Stringly Typed Code
String types should be avoided when not every string is a possibility. Using more precise types ensures better error detection and improved code readability.

:p Why are stringly typed fields problematic in the Album interface?
??x
Stringly typed fields can mask errors because any string value can be used, even if only specific values are valid. This leads to incorrect assignments and makes it harder to catch bugs.
```typescript
interface Album {
    artist: string; // Can contain any string, not just "Miles Davis"
    title: string;  // Can contain any string, not just "Kind of Blue"
    releaseDate: string; // Can be incorrectly formatted like 'August 17th, 1959'
    recordingType: string; // Can be incorrectly capitalized or misspelled
}
```
x??

---

#### Use Date Objects for Date Fields
Using `Date` objects instead of strings can avoid issues with formatting and make the code more precise.

:p How does using a `Date` object in the Album interface improve error checking?
??x
Using a `Date` object ensures that the release date is always correctly formatted, preventing errors like incorrect dates. This makes the code more robust and easier to maintain.
```typescript
interface Album {
    artist: string;
    title: string;
    releaseDate: Date; // Ensures correct formatting
    recordingType: 'studio' | 'live';
}
```
x??

---

#### Use Named Types for Better Documentation
Explicitly defining types can provide better documentation and make the code more understandable.

:p How does using a named type like `RecordingType` improve the Album interface?
??x
Using a named type provides clear documentation about what values are valid. This makes it easier to understand the code and prevents bugs.
```typescript
type RecordingType = 'live' | 'studio';
interface Album {
    artist: string;
    title: string;
    releaseDate: Date;
    recordingType: RecordingType; // Clearer documentation
}
```
x??

---

#### Use Template Literal Types for Infinite Sets of Strings
Template literal types can be used to model infinite sets, such as all strings that start with "http:".

:p How do template literal types differ from union types?
??x
Template literal types allow you to specify patterns in string values, whereas union types list specific possible values. For example, a template literal type could represent any string starting with "http:", while a union type would list specific valid strings.
```typescript
type HttpUrl = `http://${string}`;
```
x??
---


#### Special Values and Type Safety in TypeScript

Background context: The text discusses a common issue where special values (like -1) are used within functions without proper handling, leading to potential bugs. It highlights how using such values can reduce type safety and how explicitly handling these cases can improve the robustness of code.

:p What is the problem with using `-1` as a return value for `indexOf` in TypeScript?
??x
The problem arises because TypeScript cannot distinguish between a valid index and an invalid one (`-1`). This makes it difficult to handle both cases properly, leading to unexpected behavior when the value `-1` is returned.

For example:
```typescript
function splitAround<T>(vals: readonly T[], val: T): [T[], T[]] {
    const index = vals.indexOf(val);
    return [vals.slice(0, index), vals.slice(index + 1)];
}
```
When `val` is not found in the array, `index` will be `-1`, and this will cause issues with `slice`.

x??

---

#### Safe Index Of Function

Background context: To address the issue mentioned above, a function `safeIndexOf` was introduced that returns either a number or null to clearly distinguish between valid indices and invalid ones.

:p What is the purpose of the `safeIndexOf` function?
??x
The purpose of the `safeIndexOf` function is to return a number if the value is found in the array and null if it is not. This helps TypeScript differentiate between these two cases, improving type safety.

```typescript
function safeIndexOf<T>(vals: readonly T[], val: T): number | null {
    const index = vals.indexOf(val);
    return index === -1 ? null : index;
}
```

x??

---

#### Handling Special Values with `splitAround` Function

Background context: The `safeIndexOf` function was used to rewrite the `splitAround` function, ensuring that it correctly handles cases where the value is not found.

:p How does the revised `splitAround` function handle the case when the element is not present in the array?
??x
The revised `splitAround` function explicitly handles the null case returned by `safeIndexOf`. If the index is null (meaning the value was not found), it returns an empty array and the original array.

```typescript
function splitAround<T>(vals: readonly T[], val: T): [T[], T[]] {
    const index = safeIndexOf(vals, val);
    if (index === null) {
        return [[...vals], []];
    }
    return [vals.slice(0, index), vals.slice(index + 1)];
}
```

This ensures that the function behaves correctly even when the value is not found in the array.

x??

---

#### Using `null` vs. Special Values

Background context: The text emphasizes avoiding special values like -1 or 0 and suggests using null or undefined instead to represent special cases more clearly. It also mentions the importance of using tagged unions for complex state representations.

:p Why is it better to use `null` or `undefined` instead of in-domain special values like `-1`, `0`, or `""`?
??x
Using `null` or `undefined` as special values helps maintain type safety and clarity. These values are explicitly used to represent nullability, making the code more readable and easier to understand.

For example:
```typescript
interface Product {
    title: string;
    /** Price of the product in dollars, or undefined if price is unknown */
    priceDollars?: number | null;
}
```
This approach ensures that the type checker can distinguish between a valid `number` and an undefined value. Using tagged unions (like `ProductStatus`) for complex states can further enhance clarity and robustness.

x??

---

#### Tagged Unions for Complex States

Background context: The text suggests using tagged unions to represent special cases more explicitly, especially when dealing with complex state representations like network request statuses.

:p What is a tagged union, and why might it be preferable over using `null` or `undefined`?
??x
A tagged union (also known as an algebraic data type) is a way to model values that can take on one of several distinct forms. It helps avoid the ambiguity associated with nullables by explicitly representing each state.

For example, in modeling network request statuses:
```typescript
type NetworkStatus = {
    readonly status: 'pending';
} | {
    readonly status: 'error';
    readonly message: string;
} | {
    readonly status: 'success';
    readonly data: any;
};
```
This approach makes the intentions of each case clear and avoids the potential for bugs caused by null or undefined.

x??

---


#### Avoiding Optional Properties
When your application evolves, you might be tempted to add optional properties to existing interfaces. However, this can introduce bugs and make debugging more challenging.
:p What are some reasons to avoid using optional properties?
??x
Using optional properties can lead to several issues:
1. **Consistency Issues**: Missing a required property in multiple places (e.g., forgetting to pass `unitSystem` to `formatValue`).
2. **Debugging Complexity**: Harder to find missing or incorrect defaults, leading to inconsistent behavior.
3. **Type Safety**: Optional properties can introduce unsoundness issues in TypeScript.

For example, if you have a function like:
```typescript
function formatHike({miles, hours}, config: AppConfig) {
    const { unitSystem } = config;
    const distanceDisplay = formatValue({
        value: miles,
        units: 'miles',
        unitSystem // Only passed here
    });
    const paceDisplay = formatValue({
        value: miles / hours,
        units: 'mph'  // Missing unitSystem, leading to inconsistent display.
    });
    return `${distanceDisplay} at${paceDisplay}`;
}
```
This can result in incorrect unit conversions and a confusing user experience.

x??

---

#### Type Splitting for Configurations
To handle evolving configurations while maintaining backward compatibility, you might want to split the type into two: one for un-normalized input and another for normalized use within the application.
:p How can you split AppConfig types to maintain compatibility?
??x
You can split `AppConfig` into two types: `InputAppConfig`, which allows optional properties, and a more specific `AppConfig` that requires all properties. This approach centralizes default value handling and ensures consistency.

For example:
```typescript
interface InputAppConfig {
    darkMode: boolean;
    // ... other settings ...
    /** default is imperial */
    unitSystem?: UnitSystem;
}

interface AppConfig extends InputAppConfig {
    unitSystem: UnitSystem;  // required
}
```

Additionally, you can provide normalization logic to ensure consistency:
```typescript
function normalizeAppConfig(inputConfig: InputAppConfig): AppConfig {
    return {
        ...inputConfig,
        unitSystem: inputConfig.unitSystem ?? 'imperial',
    };
}
```

This approach helps maintain backward compatibility while ensuring type safety and consistency.

x??

---

#### Optional Properties in Large Interfaces
Adding optional properties to large interfaces can lead to a combinatorial explosion of possible combinations, making it difficult to test all valid states.
:p Why is managing optional properties in large interfaces problematic?
??x
Managing optional properties in large interfaces can become overwhelming due to the exponential increase in potential combinations. For instance, if you have 10 optional properties, there are $2^{10} = 1024$ possible combinations.

Testing all these combinations is impractical, and it's hard to ensure that all combinations make sense or are valid states for your application. This can lead to inconsistencies and bugs in your codebase.

For example:
```typescript
interface LargeInterface {
    prop1?: boolean;
    prop2?: number;
    // ... up to 10 properties ...
}
```

With 10 optional properties, you have $2^{10} = 1024$ combinations. Testing all these states can be challenging and error-prone.

x??

---

#### Optional Properties and Backward Compatibility
Optional properties are often used when evolving APIs while maintaining backward compatibility with existing code.
:p When is it appropriate to use optional properties in evolving interfaces?
??x
Optional properties are necessary when:
1. **Describing Existing APIs**: You need to maintain compatibility with older versions of your API.
2. **Evolving APIs Gradually**: You want to introduce new features without breaking existing implementations.

However, they can lead to issues such as inconsistency and debugging complexity if not handled carefully. Therefore, it's important to weigh the benefits against potential drawbacks.

For example:
```typescript
interface OldInterface {
    prop1: boolean;
    prop2: number; // Required in old code
}
```

When evolving `OldInterface`, you might introduce optional properties like this:
```typescript
interface NewInterface extends OldInterface {
    prop3?: string;  // Optional property for new features
}
```

This approach allows for gradual evolution while maintaining compatibility with older implementations.

x??

---

