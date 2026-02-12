# High-Quality Flashcards: 10A007---Effective-TypeScript---Dan-Vanderkam_processed (Part 20)


**Starting Chapter:** Item 64 Consider Brands for Nominal Typing

---


#### Nominal Typing vs Structural Typing
In TypeScript, nominal typing differs from structural typing. In structural typing, a type is determined by its shape (properties and methods). For example:
```typescript
interface Vector2D {
    x: number;
    y: number;
}

function calculateNorm(p: Vector2D) {
    return Math.sqrt(p.x ** 2 + p.y ** 2);
}
```
Here, `calculateNorm` accepts any object with `x` and `y` properties.
:p What is the difference between nominal typing and structural typing in TypeScript?
??x
Nominal typing defines a type by its name or tag, rather than its shape. For example:
```typescript
interface Vector2D {
    type: '2d';
    x: number;
    y: number;
}
```
In this case, `Vector2D` is specifically defined as having a `type` property with the value `'2d'`. This makes it distinct from other objects that may have similar shapes but different types.
x??

---

#### Branding for Nominal Typing
Branding can be used to give otherwise structurally identical types a unique identity. For example, distinguishing between absolute and relative paths:
```typescript
type AbsolutePath = string & {_brand: 'abs'};
function isAbsolutePath(path: string): path is AbsolutePath {
    return path.startsWith('/');
}
```
:p How does branding help in distinguishing similar types?
??x
Branding helps by adding a specific tag to the type, making it distinct from other types with the same structure. In this case, `AbsolutePath` has an additional `_brand` property set to `'abs'`, which makes it clear that it is an absolute path.
x??

---

#### Tagged Unions and Runtime Overhead
Tagged unions are used when you want to enforce exclusive typing in TypeScript:
```typescript
interface Vector2D {
    type: '2d';
    x: number;
    y: number;
}
```
Here, `Vector2D` is tagged with a `type` property of `'2d'`. This makes it an "explicit tag" that enforces the exclusive nature of this type.
:p What are some downsides of using explicit tagging in TypeScript?
??x
The main downside of explicit tagging is runtime overhead. It transforms simple types into more complex ones, adding a string `type` property for each variant. Additionally, tagged unions only work with object types, not primitive types like numbers or strings.
x??

---

#### Using Brands to Brand Primitive Types
Branding can also be used with primitive types:
```typescript
type Meters = number & {_brand: 'meters'};
type Seconds = number & {_brand: 'seconds'};

const meters = (m: number) => m as Meters;
const seconds = (s: number) => s as Seconds;

const oneKm = meters(1000); // oneKm is a number with the brand 'meters'
const oneMin = seconds(60); // oneMin is a number with the brand 'seconds'
```
:p How can brands be used to document types of numeric parameters?
??x
Brands can help document that certain numbers have specific units, such as meters or seconds. This approach avoids runtime overhead and can improve type safety by ensuring that operations involving mixed units are not allowed.
x??

---

#### Using Unique Symbols for Branding
Unique symbols can also be used to brand types:
```typescript
declare const brand: unique symbol;
export type Meters = number & {[brand]: 'meters'};
```
:p What is the advantage of using a unique symbol for branding?
??x
The advantage is that since the `brand` symbol is not exported, users cannot create new types compatible with it directly. This prevents accidental mixing of branded and unbranded types.
x??

---

#### Branding Lists to Enforce Order
Branding can be used to ensure lists are sorted:
```typescript
type SortedList<T> = T[] & {_brand: 'sorted'};
function isSorted<T>(xs: T[]): xs is SortedList<T> {
    for (let i = 0; i < xs.length - 1; i++) {
        if (xs[i] > xs[i + 1]) return false;
    }
    return true;
}
```
:p How does branding help in ensuring lists are sorted?
??x
Branding helps by requiring explicit proof that a list is sorted before using operations that depend on this property. This ensures type safety and correctness, as unsorted lists may not behave as expected.
x??

---


#### Understanding npm Dependencies in TypeScript
Background context: In JavaScript, npm is a package manager that handles both the libraries and dependencies required for projects. It categorizes these into different types based on their usage—dependencies, devDependencies, and peerDependencies.

:p What are the main categories of dependencies managed by npm?
??x
- `dependencies`: Packages necessary to run your application.
- `devDependencies`: Packages needed during development (like test frameworks) but not at runtime.
- `peerDependencies`: Packages that must be installed separately but should be compatible with each other, such as libraries and their type declarations.

x??

---
#### TypeScript as a Development Dependency
Background context: Since TypeScript is used for development purposes and its types do not exist at runtime, it's advisable to treat it as a devDependency. This ensures consistent versioning across team members and projects.

:p Why should TypeScript be treated as a devDependency?
??x
Because TypeScript is a development tool that gets transpiled into JavaScript before execution. Installing it globally can lead to discrepancies in versions among different developers or environments, whereas making it a devDependency ensures everyone uses the same version when running `npm install`.

x??

---
#### Managing Type Definitions with @types
Background context: For libraries without built-in TypeScript types, you might find type definitions on DefinitelyTyped under the `@types` scope. These packages only contain the necessary type information and not the actual implementation.

:p How should type declarations be managed for a library like React?
??x
You should install both the library and its corresponding @types package as devDependencies. For example, to use React along with its TypeScript types, you would run:
```
npm install react --save
npm install --save-dev @types/react
```

This ensures that the type definitions are available for development but not included in the final production bundle.

x??

---
#### Separating Development and Production Dependencies
Background context: Even if you're building a web app that won't be published, separating devDependencies from dependencies still offers benefits. This practice helps maintain clarity and manage project dependencies more effectively.

:p Why is it beneficial to keep @types as devDependencies even for non-publishable projects?
??x
Keeping `@types` as devDependencies ensures that type definitions are available during development without cluttering the final production build. It also promotes better separation of concerns, making it easier to manage different types of dependencies and ensuring consistency across team members.

For example:
```json
{
  "devDependencies": {
    "@types/react": "^18.2.23",
    "typescript": "^5.2.2"
  },
  "dependencies": {
    "react": "^18.2.0"
  }
}
```

x??

---
#### Running TSC Using npx
Background context: `npx` is a command-line utility that allows you to run npm packages without installing them globally. It's useful for running tools like TypeScript’s compiler (tsc) in the same way as other npm scripts.

:p How can you use `npx` to run the tsc command?
??x
You can use `npx` to run the TypeScript compiler installed by npm directly from the command line, without needing a global installation. For example:
```
$ npx tsc
```

This ensures that you're using the version of tsc that is compatible with your project's dependencies.

x??

---


#### Understanding Dependencies and DevDependencies
When managing dependencies in a Node.js project, it's crucial to understand the difference between `dependencies` and `devDependencies`. These terms are found in your `package.json` file.

:p What is the significance of distinguishing between `dependencies` and `devDependencies`?
??x
The distinction helps you manage which libraries are used during runtime versus those required only for development. For example, TypeScript itself might not be needed at runtime but is essential for compiling your code.
```json
{
  "dependencies": {
    "react": "^18.2.0"
  },
  "devDependencies": {
    "@types/react": "^18.2.23",
    "typescript": "^4.6.4"
  }
}
```
x??

---

#### Installing Production Dependencies Only
When deploying your application, you want to ensure that only the necessary production dependencies are included in your deployment image.

:p How can you install only production dependencies using npm?
??x
You use the `npm install --production` command. This installs all production dependencies listed in `dependencies` without installing any development ones.
```
npm install --production
```
This results in a smaller, faster-spinning image since it includes fewer components that are not required for runtime.
x??

---

#### Managing TypeScript and @types Dependencies
In a TypeScript project, you need to manage both the package itself and its type declarations separately.

:p Why should TypeScript be included as a `devDependency`?
??x
TypeScript is used primarily during development to compile your code. It's not necessary at runtime, so it should be listed under `devDependencies`. This saves space in your production build.
```json
{
  "devDependencies": {
    "typescript": "^4.6.4"
  }
}
```
x??

---

#### Handling Multiple Versions of Dependencies
In TypeScript projects, you deal with multiple versions: the package version, its type declarations (`@types`), and the TypeScript compiler itself.

:p What are the three versions involved in TypeScript declarations?
??x
There are three versions to consider:
1. The actual package version.
2. The `@types` (type declaration) version corresponding to that package.
3. The TypeScript compiler version used for compiling your code.

These versions must be in sync to avoid runtime or compile-time errors.
```json
{
  "dependencies": {
    "react": "^18.2.0"
  },
  "devDependencies": {
    "@types/react": "^18.2.23",
    "typescript": "^4.6.4"
  }
}
```
x??

---

#### Synchronizing Package and Type Version
To ensure everything works correctly, the package version and its corresponding type declarations should match in major and minor versions but may differ slightly in patch versions.

:p How do you install a specific version of a library and its types?
??x
You can install both the package and its types using:
```
npm install react@18.2.0 --save
npm install --save-dev @types/react@18.2.23
```
Here, `react` is installed as a dependency for production use, while `@types/react` is installed as a development dependency to provide type information.
x??

---

#### Automating Dependency Updates
Automated tools like Renovate or Dependabot can help prioritize updates for your dependencies.

:p How do you configure Renovate to focus on production dependencies?
??x
You can set up Renovate to only target `dependencies` in your `package.json`, ignoring `devDependencies`. This ensures that critical security and functional updates are prioritized.
```json
{
  "renovate": {
    "prTitle": "chore(deps): update [package name] to [version]",
    "openIssuesIgnoreTypes": ["security", "dependency"]
  }
}
```
x??

---

#### Summary of Concepts
Each concept covers a different aspect of dependency management in TypeScript and Node.js projects. Understanding these will help you maintain clean, efficient, and secure code.

:p What are the key points covered in this text?
??x
Key points include:
1. Differentiating between `dependencies` and `devDependencies`.
2. Using `npm install --production` to manage your production image.
3. Properly managing TypeScript and its type declarations as `devDependencies`.
4. Understanding and synchronizing multiple versions of dependencies (package, types, TypeScript).
5. Configuring automated tools like Renovate for better dependency management.
x??

---


#### Version Matching Issues: Library and Type Declarations Mismatch
Background context explaining how version mismatches between libraries and their type declarations can occur. This often happens as a result of automatic dependency updating tools like Dependabot or when using `any` types for library imports without proper typing.

:p What are the common ways version matching can go wrong in TypeScript projects?
??x
Version matching issues can arise from several scenarios:
1. Updating a library but forgetting to update its type declarations.
2. Type declarations getting ahead of the library versions due to manual or automated use of `any` types and later adding official types.
3. The need for newer TypeScript features not being compatible with older TypeScript versions used in the project.
4. Duplicate @types dependencies leading to conflicts between different versioned type definitions.

These issues can result in various symptoms such as type errors, runtime errors, or incorrect behavior during development.

x??

---
#### Updating Type Declarations Due to Library Updates
Background context explaining that when a library is updated, its corresponding TypeScript declarations might not be updated simultaneously. This mismatch can lead to compile-time and run-time errors if the newer version of the library contains breaking changes or new features.

:p What should you do if you need to update type declarations due to a library update?
??x
To address this issue, follow these steps:
1. Check for available updates in your package manager.
2. Update the type declaration files manually by editing them directly.
3. Contribute updated type declarations back to the community (e.g., DefinitelyTyped).
4. Use TypeScript's `declare module` syntax to augment existing type definitions.

:p How do you use augmentation in a project to add new functions and methods?
??x
You can use augmentation by adding `declare` statements within your own codebase to extend the types of existing modules or objects. For example, if you want to add a method to an existing interface:

```typescript
// Before augmentation
interface MyInterface {
  myMethod(): void;
}

// After augmentation
declare module "myModule" {
  export interface MyInterface {
    newMethod(): string;
  }
}
```

This approach allows you to extend the type definitions without modifying the original library's code.

x??

---
#### Mismatch Due to TypeScript Version and Type Definitions
Background context explaining that certain popular libraries might require newer versions of TypeScript due to their advanced typing features. However, using an older version of TypeScript can result in type errors within these declarations themselves.

:p How do you resolve issues where the @types/ package requires a newer version of TypeScript than what's installed?
??x
To resolve such issues, consider the following options:
1. Upgrade your current version of TypeScript to match the required version specified by the library.
2. Use an older version of the type declarations that are compatible with your existing TypeScript installation.
3. Stub out the types using `declare module` syntax if upgrading is not feasible.

:p Can you provide a code example for stubbing out types with declare module?
??x
Certainly! Here's how you can use `declare module` to define or extend type definitions:

```typescript
// Example of extending an interface within a module declaration
declare module "react" {
  export interface ComponentState {
    newProperty: boolean;
  }
}
```

This approach allows you to add properties or methods to existing types without modifying the original library's code.

x??

---
#### Duplicate @types Dependencies
Background context explaining that using multiple type definitions for a single library can lead to version mismatches and conflicts. This typically happens when one package depends on an incompatible version of another, causing npm to install both versions in different directories.

:p What is the outcome of having duplicate @types dependencies?
??x
Having duplicate @types dependencies results in:
1. Conflicting type definitions being installed in nested folders.
2. Possible issues during compilation and runtime due to inconsistent types.

For instance, if `@types/bar` depends on an incompatible version of `@types/foo`, npm might install both versions:

```
node_modules/
  @types/
    foo/  // Version 1.2.3
      index.d.ts
    bar/  // Version 2.3.4
      index.d.ts
      node_modules/
        @types/
          foo/  // Version 2.3.4
            index.d.ts
```

This can cause compile-time and runtime errors if the types are not properly resolved.

:p How do you handle duplicate @types dependencies?
??x
To handle this, ensure that your project's type definitions are consistent by:
1. Upgrading to a compatible version of both packages.
2. Downgrading one package to match the other.
3. Sticking with a single, stable version and avoiding nested installations.

:p How can you specify a specific TypeScript version for @types when installing?
??x
To install @types for a specific version of TypeScript, use:

```sh
npm install --save-dev @types/react@ts4.9
```

This command ensures that the correct type definitions are installed for your project's TypeScript version.

x??

---

