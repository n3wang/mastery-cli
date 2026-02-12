# High-Quality Flashcards: 10A007---Effective-TypeScript---Dan-Vanderkam_processed (Part 25)


**Starting Chapter:** Item 83 Dont Consider Migration Complete Until You Enable noImplicitAny

---


#### Starting Migration by Adding @types

Background context: The first step in migrating a project to TypeScript is ensuring that all third-party modules and external API calls have proper type definitions. This often involves adding `@types` packages if they are not already available.

:p How do you start the migration process for third-party modules and external APIs?
??x
The process begins by installing any necessary `@types` packages using npm or yarn. For example:
```sh
npm install --save-dev @types/node
```
or
```sh
yarn add --dev @types/react
```

You should also consider the dependency graph of your project, starting with utility code at the bottom and moving upwards.

??x

---

#### Migrating Own Modules

Background context: After ensuring third-party modules are correctly typed, you proceed to migrate your own custom modules. This typically starts from the bottom of the dependency graph, focusing on utility or helper functions before moving towards more complex parts of the codebase.

:p What is the recommended order for migrating custom modules?
??x
Start with the lowest-level utility and helper functions in your project. These are usually found at the base of the dependency tree and do not rely heavily on other components.

Example:
If you have a `config.ts` file that contains global configuration values, start by converting this before moving to more complex modules like services or controllers.

??x

---

#### Visualizing Dependency Graphs

Background context: To help manage the migration process, it is useful to visualize the dependency graph of your project. Tools such as `ts-node-dev` with a custom script can be used to explore and map out dependencies.

:p Why is visualizing the dependency graph important during TypeScript migration?
??x
Visualizing the dependency graph helps in understanding which parts of the codebase depend on each other, allowing you to prioritize migrations effectively. It also aids in tracking progress and ensures that no critical modules are overlooked.

For example, using `ts-node-dev` with a custom script can help:
```sh
ts-node-dev --transpile-only ./node_modules/ts-node-digraph/cli.js > dependency_graph.dot
```
This generates a DOT file which can be visualized with tools like Graphviz to get an overview of the project's architecture.

??x

---

#### Refactoring Considerations During Migration

Background context: While migrating, it is important to avoid refactoring code unless absolutely necessary. Instead, keep track of ideas for future refactorings and focus on type conversion tasks only.

:p What should you avoid doing while converting your codebase to TypeScript?
??x
Avoid refactoring or changing the design of your code as you migrate from JavaScript to TypeScript. Focus solely on adding types where needed and fixing any type-related errors. Keep a list of potential future refactorings but do not implement them yet.

For example, if you come across an odd or poorly designed part of the code:
```typescript
class OddClass {
  // some logic here
}
```
Note it down for later refactoring, but keep it as is during the initial migration phase.

??x

---

#### Enabling noImplicitAny

Background context: Once you have added types to your codebase and are ready to enforce stricter type checking, enable `noImplicitAny`. This setting ensures that all variables must be explicitly typed, preventing loose type checks from masking real errors.

:p What does enabling `noImplicitAny` do?
??x
Enabling `noImplicitAny` forces the TypeScript compiler to treat any untyped variables as having an implicit `any` type. This helps in catching potential type-related issues early during development.

For example:
Before:
```typescript
class Chart {
  indices: any;
  
  getRanges() {
    for (const r of this.indices) {
      const low = r[0];
      const high = r[1];
    }
  }
}
```
After enabling `noImplicitAny` and fixing types:
```typescript
class Chart {
  indices: number[][];
  
  getRanges() {
    for (const r of this.indices) {
      const low = r[0]; // Error: Element implicitly has an 'any' type because...
      const high = r[1]; // Error: Element implicitly has an 'any' type because...
    }
  }
}
```

??x

---

#### Tracking Progress During Migration

Background context: To ensure you are making progress during the migration, track your type coverage and monitor the number of `noImplicitAny` errors. This helps in measuring the effectiveness of the changes made.

:p How can you track progress during the TypeScript migration?
??x
You can use tools like the `--watch` option with `tsc` to continuously check for new type issues as you make changes:
```sh
npx tsc --watch
```
Additionally, tracking your type coverage (using tools like Istanbul) gives a good sense of how much of your codebase is properly typed.

For example:
Use the `--project` flag with `istanbul` to generate a report on type coverage:
```sh
npx istanbul cover npx tsc -- --project tsconfig.json
```

??x

---

#### Committing Changes During Migration

Background context: As you make changes during the migration, commit your progress frequently. This helps in maintaining a history of changes and makes it easier to revert if necessary.

:p What is recommended practice for committing changes during TypeScript migration?
??x
Commit your type corrections and other changes regularly. This ensures that you have a clear record of your progress and can easily backtrack if needed.

Example:
Instead of making all changes at once, commit after fixing each file or module:
```sh
git add .
git commit -m "Fix types in Chart class"
```

??x

---

#### Prioritizing Type Safety

Background context: Depending on the criticality of your codebase, you might choose to prioritize type safety in different parts. For instance, production code might need stricter type checks than test code.

:p How can you handle type safety priorities differently in various parts of a project?
??x
You can have distinct `tsconfig.json` files with different settings for different parts of your project. For example, you can have one configuration file that is more permissive and another that enforces stricter types.

Example:
```json
// tsconfig.prod.json
{
  "compilerOptions": {
    "noImplicitAny": true,
    "strictNullChecks": true
  }
}

// tsconfig.unit.json
{
  "compilerOptions": {
    "noImplicitAny": false
  }
}
```

You can use `ts-node-dev` with project references to manage these configurations.

??x

---

#### Enforcing Strict Type Checking

Background context: After enabling `noImplicitAny`, you can further increase the strictness of type checking by turning on other options like `strictNullChecks`. These settings help in catching more potential issues early in the development process.

:p What are some additional ways to enforce stricter type checking?
??x
In addition to `noImplicitAny`, you can enable `strictNullChecks` and other `compilerOptions` to increase the strictness of your code. For example:
```json
{
  "compilerOptions": {
    "noImplicitAny": true,
    "strictNullChecks": true,
    "strictFunctionTypes": true,
    "alwaysStrict": true
  }
}
```

These settings help in ensuring that your TypeScript code is robust and type-safe.

??x

---


---
#### Understand the Relationship Between TypeScript and JavaScript
Background context: TypeScript is a superset of JavaScript that adds static typing to help catch errors during development. Understanding this relationship is crucial for effective use of TypeScript.

:p What is the relationship between TypeScript and JavaScript?
??x
TypeScript is a language built on top of JavaScript, adding type checking and other features while still compiling down to standard JavaScript. This means all valid JavaScript code is also valid TypeScript, but not vice versa.
```typescript
// Example in TypeScript
function sayHello(name: string): void {
    console.log(`Hello, ${name}!`);
}

// The same function in JavaScript
function sayHello(name) {
    console.log(`Hello, ${name}!`);
}
```
x??

---
#### Know Which TypeScript Options You’re Using
Background context: TypeScript has various options that control how the language behaves. Being aware of these can help you configure your development environment and avoid common pitfalls.

:p What are some key TypeScript compiler options?
??x
Key TypeScript compiler options include `noImplicitAny`, `strictNullChecks`, and `checkJs`. These options affect type inference, null checks, and JavaScript file handling respectively.
```bash
tsc --init  # Initializes a tsconfig.json file with default settings
```
x??

---
#### Understand That Code Generation Is Independent of Types
Background context: TypeScript’s static typing is purely for development-time checking. The generated JavaScript does not include these types; they are used during compilation to catch errors.

:p How does code generation differ from type checking in TypeScript?
??x
Code generation in TypeScript is independent of its type system. While TypeScript uses the type information at compile time to generate strongly-typed JavaScript, this typing information is discarded after compilation. The generated JavaScript will not include any type annotations.
```typescript
// TypeScript
function add(a: number, b: number): number {
    return a + b;
}

// Generated JavaScript (by TypeScript compiler)
function add(a, b) {
    return a + b;
}
```
x??

---
#### Get Comfortable with Structural Typing
Background context: Structural typing in TypeScript allows for type compatibility based on structure rather than explicit inheritance. This feature is powerful but can lead to unexpected results if not used carefully.

:p What is structural typing in TypeScript?
??x
Structural typing in TypeScript determines type compatibility based on the structure of objects, not their class hierarchy. For example, an object with the same shape as a defined interface or class is considered compatible.
```typescript
interface Point { x: number; y: number; }

const pointLike = { x: 0, y: 0 };
let p: Point = pointLike; // Valid due to structural typing
```
x??

---
#### Limit Use of the any Type
Background context: The `any` type in TypeScript is a wildcard that bypasses most type checking. Overusing it can lead to runtime errors and defeat the purpose of static typing.

:p Why should you limit the use of the `any` type?
??x
Limiting the use of the `any` type helps maintain the benefits of static typing by reducing the risk of runtime errors and making code more predictable. It is generally advisable to use more precise types where possible.
```typescript
// Overuse of any can lead to issues
let value: any = 5;
value = "hello"; // No error, but could cause runtime issues

// Using a specific type is better practice
let value2: number = 5;
value2 = "hello"; // Error at compile time
```
x??

---

