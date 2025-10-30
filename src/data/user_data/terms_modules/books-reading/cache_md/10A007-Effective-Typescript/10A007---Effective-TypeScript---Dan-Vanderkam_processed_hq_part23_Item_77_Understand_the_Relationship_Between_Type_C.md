# High-Quality Flashcards: 10A007---Effective-TypeScript---Dan-Vanderkam_processed (Part 23)

**Rating threshold:** >= 8/10

**Starting Chapter:** Item 77 Understand the Relationship Between Type Checking and Unit Testing

---

**Rating: 8/10**

#### Environment Modeling for TypeScript Applications

Background context: When developing applications using TypeScript, especially when dealing with complex projects that run across different environments (e.g., browser, Node.js, and test environments), it's crucial to accurately model each environment. This involves creating distinct `tsconfig.json` files for each environment and ensuring type declarations match the actual runtime versions.

:p How can you ensure accurate modeling of different environments in a TypeScript project?
??x
To ensure accurate modeling of different environments, use multiple `tsconfig.json` files with specific settings for each environment (e.g., browser, Node.js). Ensure that the types used in your code are aligned with the actual runtime versions. For example, if you're using Node.js version 20, install `@types/node` from that version to match the type declarations.

```json
// Example tsconfig.json for Node.js
{
    "compilerOptions": {
        "target": "es2020",
        "module": "commonjs",
        "typeRoots": ["./node_modules/@types"]
    }
}
```
x??

---

#### TypeScript and Unit Testing

Background context: While TypeScript can catch certain errors through static type checking, it is not a substitute for unit testing. Both serve different purposes in ensuring code correctness.

:p How do type annotations help in finding bugs in the `add` function example?
??x
Type annotations help by catching certain bugs that are hard to detect with just unit tests. For instance, in the `add` function:

```typescript
function add(a: number, b: number): number {
    if (isNaN(a) || isNaN(b)) {
        return 'Not a number.'; // ~~~ Type 'string' is not assignable to type 'number'.
    }
    return (a | 0) + (b | 0);
}
```

The type checker flags the error when trying to return a string from a function that returns a `number`, ensuring that such bugs are caught early.

```typescript
test('add with NaN', () => {
    expect(() => add(NaN, 1)).toThrow(); // This will pass because TypeScript catches it.
});
```
x??

---

#### Complementary Processes of Unit Testing and Type Checking

Background context: Unit tests and type checking both serve as forms of verification but cover different aspects. Unit tests provide a lower bound on correctness by demonstrating expected behavior in some cases, while type checking provides an upper bound on incorrectness by catching certain types of mistakes.

:p How do unit tests and type checking complement each other in the `add` function example?
??x
Unit tests and type checking complement each other as follows:

- **Type Checking:** Catches static errors such as returning the wrong type or performing invalid operations.
  ```typescript
  function add(a: number, b: number): number {
      if (isNaN(a) || isNaN(b)) {
          return 'Not a number.'; // ~~~ Type 'string' is not assignable to type 'number'.
      }
      return (a | 0) + (b | 0);
  }
  ```

- **Unit Testing:** Demonstrates expected behavior in specific cases.
  ```typescript
  test('add', () => {
      expect(add(0, 0)).toEqual(0);
      expect(add(123, 456)).toEqual(579);
      expect(add(-100, 90)).toEqual(-10);
  });
  ```

Together, they ensure that the function is robust and behaves correctly across a wide range of inputs.

```typescript
test('add with NaN', () => {
    expect(() => add(NaN, 1)).toThrow(); // This will pass because TypeScript catches it.
});
```
x??

---

#### Handling Out-of-Domain Calls

Background context: When working with functions that can accept any type of argument (e.g., `add` function), you should rely on the type checker to prevent invalid calls. Unit tests are used for demonstrating expected behavior, not for all possible inputs.

:p How do unit tests and type checking handle out-of-domain calls in TypeScript?
??x
Unit tests and type checking handle out-of-domain calls as follows:

- **Type Checking:** Ensures that functions are called with the correct types.
  ```typescript
  test('out-of-domain add', () => {
      expect(add(null, null)).toEqual(0); // ~~~~ Type 'null' is not assignable to parameter of type 'number'.
      expect(add(null, 12)).toEqual(12); // ~~~~ Type 'null' is not assignable to parameter of type 'number'.
      expect(add(undefined, null)).toBe(NaN); // ~~~~~~~~~ Type 'undefined' is not assignable to parameter of ...
      expect(add('ab', 'cd')).toEqual('abcd'); // ~~~~ Type 'string' is not assignable to parameter of type  'number'.
  });
  ```

- **Unit Testing:** Should focus on demonstrating expected behavior for valid inputs.
  ```typescript
  test('add with valid numbers', () => {
      expect(add(0, 0)).toEqual(0);
      expect(add(123, 456)).toEqual(579);
      expect(add(-100, 90)).toEqual(-10);
  });
  ```

This ensures that the function is used correctly and that invalid inputs are caught early.

```typescript
test('add with valid numbers', () => {
    expect(add(0, 0)).toEqual(0);
    expect(add(123, 456)).toEqual(579);
    expect(add(-100, 90)).toEqual(-10);
});
```
x??

---

#### Side Effects and Type Safety

Background context: Functions that have side effects (e.g., updating a database) should be carefully tested to ensure they handle unexpected inputs correctly. Type checking alone may not catch all issues.

:p How can you test the `updateUserById` function with TypeScript?
??x
You can use an `@ts-expect-error` directive in your tests to assert that certain calls are type errors, ensuring that side effects are handled correctly:

```typescript
test('invalid update', () => {
    // @ts-expect-error Can't call updateUserById to update an ID.
    expect(() => updateUserById('123', { id: '234' })).toReject(); // This will pass because TypeScript catches it.
});
```

This ensures that the function behaves as expected when given unexpected inputs.

```typescript
test('invalid update', () => {
    // @ts-expect-error Can't call updateUserById to update an ID.
    expect(() => updateUserById('123', { id: '234' })).toReject();
});
```
x??

---

**Rating: 8/10**

#### Type Checking and Unit Testing Complementarity
Type checking helps catch incorrect behaviors by ensuring type safety, while unit tests ensure correct behavior on specific inputs. Both are important for program correctness but serve different purposes.
:p How do type checking and unit testing complement each other?
??x
Both type checking and unit testing are crucial for ensuring program correctness from different perspectives. Type checking ensures that types align correctly, preventing many errors at compile time. Unit tests, on the other hand, verify specific behaviors of your code with particular inputs. Relying on both helps catch a wide range of bugs.
??x

---

#### Separating Type Checking from Building
In TypeScript, you can separate type checking from building to improve performance. This reduces build times by skipping the type checking step if it's not needed.
:p How does separating type checking from building help with performance?
??x
Separating type checking from building allows you to disable the type checking process during builds, which can be resource-intensive. This speeds up the build process since TypeScript types are erased at runtime anyway (Item 78). You can configure your build tooling to only emit JavaScript files without running the type checker.
??x

---

#### Compiler Performance Impact
TypeScript has minimal impact on runtime performance but can affect developer tooling performance, particularly with `tsc` and `tsserver`.
:p How does TypeScript impact compiler performance?
??x
`tsc`, the TypeScript compiler, impacts build performance by checking your code for type errors. Slower `tsc` means longer compile times and slower production of JavaScript files. `tsserver`, the language service, can make editors feel sluggish if it takes a long time to update error messages or suggest completions.
??x

---

#### Editor Performance Considerations
`tsserver` performance directly affects your editor experience, causing delays in error detection and response times.
:p How does `tsserver` affect developer tooling?
??x
`tsserver` performance is critical for a smooth editing experience. If it's slow, you might experience long wait times for errors to appear or disappear after code changes, making development less efficient. Optimizing `tsserver` can significantly improve the responsiveness of your editor.
??x

---

#### Avoiding Redundant Checks
Avoid testing inputs that would be type errors in unit tests unless there are specific security or data corruption concerns.
:p How should you handle type error-prone inputs in unit tests?
??x
In unit tests, focus on verifying behaviors rather than catching type errors. If an input is a type error and it should never occur in your application, avoid testing these inputs explicitly. Instead, ensure that the types themselves are correct through TypeScript annotations. Only test inputs that make sense from a business logic standpoint.
??x

---

#### Optimizing Build Performance
You can use various techniques to optimize build performance when separating type checking from building.
:p What techniques can be used to improve build performance?
??x
To improve build performance, you might consider the following strategies:
1. **Incremental Builds**: Use tools like `tsc --build` which runs only necessary checks.
2. **Parallel Build Execution**: Run multiple builds in parallel if you have a multi-core system.
3. **Selective Compilation**: Compile only changed files or specific modules.
4. **Tooling Configuration**: Optimize your build tool configuration to reduce unnecessary steps.

These techniques can help balance between thorough type checking and fast build times.
??x

**Rating: 8/10**

#### Transpile Only Mode
Background context: The text discusses how tools like ts-node and bundlers can perform type checking and then bundle or run the generated JavaScript. However, they do not necessarily need to perform these steps, especially if you are only interested in transpiling TypeScript code into JavaScript.
:p What is the purpose of running a tool like ts-node in "transpile only" mode?
??x
Running ts-node with `--transpileOnly` will tell it to skip type checking and simply transform your TypeScript code into JavaScript. This can significantly speed up development time, especially for small or trivial programs where the time taken by type checking is noticeable.
```bash
$ time ts-node --transpileOnly hello.ts  # Runs faster as it skips type checking
```
x??

---

#### Impact on Iteration Cycle
Background context: The text highlights how turning off type checking can improve developer experience (DX) in a development environment. Tools like ts-node or bundlers that perform this task can be set to transpile code only, which is beneficial for quick iterations.
:p How does running TypeScript with `--transpileOnly` affect the iteration cycle?
??x
Running TypeScript with `--transpileOnly` significantly reduces the time it takes to run a program by skipping type checking. For example, a trivial TypeScript program runs much faster without type checking:
```bash
$ time ts-node --transpileOnly hello.ts  # Quick execution due to no type checking
```
This can greatly enhance the developer's iteration cycle and overall experience.
x??

---

#### Pruning Unused Dependencies
Background context: The text suggests that dead code elimination can help reduce the size of TypeScript projects, leading to faster compilation times. By setting flags like `noUnusedLocals`, TypeScript can detect and report unused symbols.
:p What is the purpose of pruning unused dependencies in a TypeScript project?
??x
Pruning unused dependencies helps minimize the amount of code processed by the TypeScript compiler, thereby reducing build times and improving editor responsiveness. It involves identifying and removing unused local variables, functions, and types from your codebase to make it more efficient.
```typescript
function foo() {} //       ~~~ 'foo' is declared but its value is never read.
export function bar() {}
```
x??

---

#### Dead Code Elimination with knip
Background context: The text mentions that using a tool like `knip` can help identify and remove unused third-party dependencies, not just local code. This can significantly reduce the overall size of your project by pruning unnecessary type declarations.
:p How does `knip` assist in managing TypeScript projects?
??x
`knip` is a tool designed to detect and report both local and third-party unused symbols and dependencies. By using `knip`, you can identify unused third-party modules, which often contain extensive type declarations that are not used in your codebase. This helps reduce the overall size of your project and improve performance.
```bash
$ tsc --listFiles  # Lists all sources included in the TypeScript project
```
x??

---

#### Visualizing Dependencies with Treemaps
Background context: The text concludes by suggesting a visual approach to understanding dependencies using treemaps. This visualization can help developers see how one dependency might bring in many others, making it easier to identify unnecessary or redundant modules.
:p What is the purpose of using treemaps for managing TypeScript projects?
??x
Using treemaps to visualize dependencies provides a graphical representation of how different modules and their sub-modules relate to each other. This can help developers understand the complexity of their project's dependency tree, making it easier to identify and remove unused or redundant dependencies.
```bash
$ tsc --listFiles  # Produces output showing all included sources
```
By visualizing these relationships, you can better manage your project's dependencies and improve overall performance.
x??

**Rating: 8/10**

#### General Rule of Thumb for Project Structure
Background context: The general rule suggests that TypeScript is more beneficial when you have a higher proportion of your own first-party code compared to third-party libraries. This often applies to large corporations with extensive custom codebases, but may not hold true for smaller projects.

:p What does the general rule suggest about project structure in relation to TypeScript?
??x
The rule suggests that TypeScript is most beneficial when you have a significant amount of your own first-party code relative to third-party dependencies. For large corporations with substantial custom code, using TypeScript can significantly aid in maintaining and scaling their applications.
x??

---

#### Project Organization for Large Applications
Background context: Proper organization of projects can enhance development speed and performance. Grouping related functionalities into distinct but manageable chunks is recommended.

:p How should you structure your projects for larger applications?
??x
Projects for large applications should be organized by grouping related functionalities into separate, well-defined projects. For example, distinguishing between `src` and `test` directories or separating client-side from server-side code can improve manageability.
x??

---

#### Simplifying Types to Improve Performance
Background context: Overly complex types can significantly degrade TypeScript performance due to the increased number of checks required during compilation.

:p What is a potential consequence of using overly complex union types?
??x
Using overly complex union types, like a `Year` type that represents every possible year from 2000 to 2999, can lead to performance issues. TypeScript has to perform extensive type checking for each operation involving such a type, which can slow down both the build process (`tsc`) and editor latency (`tsserver`).
x??

---

#### Efficient Type Design
Background context: Choosing simpler types over complex ones can improve both build and editor performance.

:p How should you design your types to optimize performance?
??x
To optimize performance, use simpler types like `string` or `number` instead of large unions. For instance, using a string for the `Year` type would be more efficient than defining it as a union of all possible years.
x??

---

#### Extending Interfaces vs Intersecting Type Aliases
Background context: Interface extension is generally more efficient for subtyping compared to intersecting type aliases.

:p Why should you prefer interfaces over types when implementing subtypes?
??x
You should prefer extending interfaces over intersecting type aliases because TypeScript can handle subtyping operations more efficiently with interfaces. This means that using `class` or `interface` inheritance will be processed faster by the TypeScript compiler.
x??

---

#### Annotating Return Types
Background context: Explicitly annotating return types in functions can help the TypeScript compiler infer types more accurately and reduce unnecessary work.

:p When should you consider adding type annotations to function return types?
??x
You should consider adding explicit type annotations to function return types, especially when dealing with complex operations or recursive types. This helps the TypeScript compiler understand the expected output without having to do extensive inference.
x??

---

#### Managing Large Unions
Background context: Avoiding large unions can prevent performance issues in TypeScript.

:p What is a common issue with using large unions?
??x
A common issue with using large unions is that they can significantly impact performance. Each operation involving these types requires checking against all possible union members, which can be slow.
x??

---

#### Recognizing Performance Issues
Background context: Understanding the difference between build performance and editor latency is crucial for effective optimization.

:p How do you differentiate between build performance issues and editor latency?
??x
Build performance issues refer to problems encountered during the TypeScript compiler (`tsc`) process, while editor latency refers to delays experienced in real-time editing and code suggestions by `tsserver`. Recognizing these differences helps target optimizations more effectively.
x??

---

#### Simplifying Types Further
Background context: Additional strategies for optimizing types include using branded types or extending existing interfaces.

:p What are some ways to simplify your types further?
??x
To simplify your types, you can use branded types if needed (as discussed in Item 64) or extend existing interfaces instead of intersecting type aliases. These approaches help maintain simpler and more efficient type definitions.
x??

---

#### Visualizing Compilation with Treemaps
Background context: Using treemaps provides a visual representation of what TypeScript is compiling, helping you identify unnecessary dependencies.

:p How can you use treemaps to optimize your project?
??x
You can use treemaps to visualize the compilation process and identify unnecessary or bloated code. By analyzing these maps, you can pinpoint areas where dead code or redundant type dependencies exist, allowing for targeted optimization.
x??

---

#### Incremental Builds with Project References
Background context: Using incremental builds and project references can reduce the work `tsc` does between builds.

:p How do incremental builds help in optimizing TypeScript performance?
??x
Incremental builds allow `tsc` to only recompile changed files, reducing the overall compilation time. By leveraging project references, you can further minimize the work required by including only necessary dependencies during each build.
x??

---

#### Summary of Key Points
Background context: The text covers several key points about optimizing TypeScript performance through efficient type design and project organization.

:p What are some key strategies for improving TypeScript performance?
??x
Key strategies include simplifying types to avoid large unions, using interfaces instead of intersecting type aliases for subtyping, annotating function return types, organizing projects into manageable chunks, and utilizing tools like treemaps and incremental builds.
x??
---

**Rating: 8/10**

#### ECMAScript Modules
ECMAScript modules provide a standard way to break JavaScript code into separate modules. Prior to ES2015, there was no standard module system, and developers had to use various methods like manual concatenation, Node.js require statements, AMD define callbacks, or TypeScript's own module system.

:p What is the advantage of using ECMAScript modules over other module systems?
??x
ECMAScript modules offer a standardized approach that simplifies module management in JavaScript projects. They improve code organization and maintainability by allowing developers to split large scripts into smaller, reusable pieces. This standardization also enhances compatibility across different environments.

```typescript
// Example of ES Module in TypeScript
import * as b from './b';
console.log(b.name);

// Corresponding file (./b.ts)
export const name = 'Module B';
```
x??

---

#### Classes vs Prototypes
JavaScript traditionally uses a prototype-based object model, but many developers prefer the class-based approach due to its simplicity and readability. ES2015 introduced the `class` keyword, making it easier for developers to write code that is more familiar to those coming from other languages like C++ or Java.

:p How does using classes in JavaScript differ from using prototypes?
??x
Using classes in JavaScript provides a clearer structure and syntax compared to traditional prototype-based inheritance. Classes encapsulate properties and methods within their scope, making the code easier to understand and maintain. Additionally, TypeScript can better handle class definitions compared to prototype chains.

```typescript
// Prototype version
function Person(first, last) {
  this.first = first;
  this.last = last;
}
Person.prototype.getName = function() {
  return this.first + ' ' + this.last;
}

const marie = new Person('Marie', 'Curie');
console.log(marie.getName());

// Class-based version
class Person {
  constructor(first, last) {
    this.first = first;
    this.last = last;
  }
  
  getName() {
    return this.first + ' ' + this.last;
  }
}

const marie = new Person('Marie', 'Curie');
console.log(marie.getName());
```
x??

---

#### Migration to ES Modules
If your project is still using a single file or concatenation for managing modules, it's time to transition to ECMAScript modules. This change can simplify your build process and improve the maintainability of your codebase.

:p Why should you use ES modules in TypeScript projects?
??x
Using ES modules in TypeScript simplifies module management by providing a standardized approach that enhances compatibility across different environments. It allows for better organization of code, easier reuse, and improved readability. Transitioning to ES modules can also make the migration process smoother when moving from one JavaScript project setup to another.

```typescript
// CommonJS version
const b = require('./b');
console.log(b.name);

// ES Module version in TypeScript
import * as b from './b';
console.log(b.name);
```
x??

---

#### TypeScript with Classes
TypeScript can handle class definitions more effectively than it does prototype-based inheritance. By adopting classes, you can leverage the strong typing and static analysis features of TypeScript to ensure your code is correct.

:p How does TypeScript handle class definitions?
??x
TypeScript understands class-based constructs better than prototype chains. It provides type safety and enables easier refactoring through tools like the `--emitDecoratorFromClassExpression` flag in the compiler options. This ensures that your classes are compiled correctly into JavaScript, maintaining their structure and functionality.

```typescript
// Example of a class in TypeScript
class Person {
  constructor(first: string, last: string) {
    this.first = first;
    this.last = last;
  }
  
  getName(): string {
    return `${this.first} ${this.last}`;
  }
}

const marie = new Person('Marie', 'Curie');
console.log(marie.getName());
```
x??

---

