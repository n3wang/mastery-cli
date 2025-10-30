# High-Quality Flashcards: 10A007---Effective-TypeScript---Dan-Vanderkam_processed (Part 8)

**Rating threshold:** >= 8/10

**Starting Chapter:** Item 26 Use Functional Constructs and Libraries to Help Types Flow

---

**Rating: 8/10**

#### Evolving Types and Functional Constructs
Background context: The passage explains how using functional constructs like `map`, `reduce`, etc., can help types flow through your TypeScript code, reducing the need for explicit type annotations. It mentions that these constructs come with their own advantages but also caveats related to incorrect use or overreliance on them.
If applicable, add code examples with explanations:
```typescript
const csvData = "...");
const rawRows = csvData.split(' ');
const headers = rawRows[0].split(',');
const rows = rawRows.slice(1)
  .map((rowStr) => rowStr.split(",").reduce((row, val, i) => ((row[headers[i]] = val), row), {}));
```
:p What are evolving types in TypeScript?
??x
Evolving types allow the type system to infer the structure of objects or arrays as you build them. For example, when using `map` or `reduce`, the initial empty object `{}` can evolve into a specific shape based on the keys and values being assigned.
x??

---

#### Using Lodash for Type Safety
Background context: The passage highlights how using libraries like Lodash can improve type safety in TypeScript by ensuring that types flow through functional constructs. It provides examples of how vanilla JavaScript approaches might require explicit type annotations, whereas Lodash solutions pass the type checker without modification.
If applicable, add code examples with explanations:
```typescript
import _ from 'lodash';

const rows = rawRows.slice(1)
  .map(rowStr => _.zipObject(headers, rowStr.split(',')));
```
:p How do functional constructs and libraries like Lodash help in maintaining typesafety?
??x
Functional constructs and libraries like Lodash help maintain typesafety by providing strongly typed methods that ensure the correct type flow. This means you can avoid or reduce the need for explicit type annotations, making your code more concise while keeping it well-typed.
x??

---

#### Example with Hand-rolled Loops
Background context: The text provides an example of parsing CSV data using hand-rolled loops in TypeScript, which require explicit type annotations to work correctly. This contrasts with functional approaches that do not.
If applicable, add code examples with explanations:
```typescript
const rowsImperative = rawRows.slice(1).map(rowStr => {
  const row = {};
  rowStr.split(',').forEach((val, j) => { // Error: No index signature
    row[headers[j]] = val;
  });
  return row;
});
```
:p Why do hand-rolled loops require type annotations in TypeScript?
??x
Hand-rolled loops often need explicit type annotations because the initial object `{}` does not have a predefined shape. TypeScript needs to be informed about the structure of the resulting object, especially when properties are being added dynamically.
x??

---

#### Flat and Concise Array Operations
Background context: The passage demonstrates how using methods like `flat` can make code more concise and type-safe without requiring additional type annotations. This is particularly useful in complex data munging scenarios.
If applicable, add code examples with explanations:
```typescript
const allPlayers = Object.values(rosters).flat(); // No need for a type annotation here
```
:p How does the `flat` method help in reducing type annotations?
??x
The `flat` method helps reduce type annotations by inferring the correct array structure directly. Since it returns an array of the appropriate depth, TypeScript can infer the final type without needing explicit annotations.
x??

---

#### Team Rosters and Best Paid Players
Background context: The example shows how to build a flat list of players from nested data structures using `flat` and how to find the best-paid players on each team. It contrasts traditional loops with functional approaches that require fewer type annotations.
If applicable, add code examples with explanations:
```typescript
const bestPaid = _(allPlayers)
  .groupBy(player => player.team)
  .mapValues(players => _.maxBy(players, p => p.salary))
  .values()
  .sortBy(p => -p.salary)
  .value();
```
:p How does using `flat` and functional constructs simplify the code for building a flat list of players?
??x
Using `flat` simplifies the code by flattening the multidimensional array directly, resulting in a single-dimensional array. This makes it easier to work with and reduces the need for explicit type annotations.
x??

---

#### Using Functional Constructs in Complex Operations
Background context: The text provides an example of how functional constructs can be used in complex operations like filtering and sorting players based on their salaries. It shows that these constructs provide a more concise and readable solution while maintaining typesafety.
If applicable, add code examples with explanations:
```typescript
const teamToPlayers = {};
for (const player of allPlayers) {
  const {team} = player;
  teamToPlayers[team] = teamToPlayers[team] || [];
  teamToPlayers[team].push(player);
}
```
:p How do functional constructs like `groupBy` and `maxBy` help in managing complex data operations?
??x
Functional constructs like `groupBy` and `maxBy` help manage complex data operations by providing clear, readable code that leverages the type system effectively. They ensure types flow correctly, reducing the need for explicit type annotations and making the code easier to understand.
x??

---

**Rating: 8/10**

#### Introduction to Promises
Promises are a way of handling asynchronous operations in JavaScript. They represent a value that may be available now, in the future, or never. A Promise can be in one of three states: pending (initial), fulfilled (has a value), or rejected (has an error).

A Promise is created by calling its constructor with a callback function which gets two arguments: `resolve` and `reject`. These are functions that you pass values to when the operation completes successfully, or reject it if something went wrong.

:p What does a Promises constructor receive as parameters?
??x
The `Promise` constructor receives two functions as parameters: `resolve` and `reject`.

```js
const myPromise = new Promise((resolve, reject) => {
  // code that may resolve or reject the promise
});
```
x??

---

#### Using Promises in Asynchronous Operations
Promises allow for cleaner and more readable asynchronous operations compared to callbacks. They enable you to handle errors and perform multiple tasks sequentially or concurrently.

:p How can you use promises to fetch pages concurrently?
??x
You can use `Promise.all` to fetch pages concurrently:

```js
async function fetchPages() {
  const [response1, response2, response3] = await Promise.all([
    fetch(url1),
    fetch(url2),
    fetch(url3)
  ]);
}
```

Here, `await Promise.all` waits for all promises in the array to resolve. The result is an array of resolved values.

x??

---

#### Async/Await with Promises
Async/await is a syntactic sugar that simplifies working with Promises by allowing you to write asynchronous code that looks synchronous. It's supported by TypeScript and most modern JavaScript runtimes.

:p How does async/await handle errors in functions?
??x
In async functions, any error thrown inside the function will be caught as an exception in the `catch` block:

```js
async function fetchPages() {
  try {
    const response1 = await fetch(url1);
    const response2 = await fetch(url2);
    const response3 = await fetch(url3);
  } catch (e) {
    // handle error
  }
}
```

If the `await` expression resolves to a rejected Promise, an exception is thrown and caught in the `catch` block.

x??

---

#### Promises with Higher-Order Functions
Promises can be combined using higher-order functions like `Promise.all`, `Promise.race`, etc. These allow you to handle multiple asynchronous operations more effectively.

:p How does `Promise.race` work?
??x
`Promise.race` returns a new Promise that resolves as soon as one of the promises in the array fulfills or rejects:

```js
function timeout(timeoutMs: number): Promise<never> {
  return new Promise((resolve, reject) => {
    setTimeout(() => reject('timeout'), timeoutMs);
  });
}

async function fetchWithTimeout(url: string, timeoutMs: number) {
  return Promise.race([fetch(url), timeout(timeoutMs)]);
}
```

In this example, `Promise.race` returns a new promise that resolves with the first value or rejects immediately after the timeout.

x??

---

#### Using Async Functions
Async functions are always asynchronous and must return Promises. This makes them easier to reason about compared to regular Promise callbacks.

:p Why should you prefer async/await over raw Promises?
??x
You should prefer async/await for a few reasons:
- It produces more concise and straightforward code.
- It enforces that async functions always return Promises, avoiding potential bugs from mixing synchronous and asynchronous operations.

For example:

```js
async function getNumber() {
  return 42;
}

// The TypeScript type infers this as Promise<number>
const getNumber = async () => 42;

// Raw Promise equivalent is less readable
const getNumber = () => Promise.resolve(42);
```

x??

---

#### Consistent Asynchronous Behavior with Async Functions
Async functions ensure that code runs consistently, avoiding issues like unexpected state changes due to caching or other asynchronous operations.

:p How does introducing an async function help in maintaining consistent behavior?
??x
Introducing an `async` function helps maintain consistency by ensuring that the flow of execution remains clear and predictable:

```js
const _cache: {[url: string]: string} = {};

async function fetchWithCache(url: string) {
  if (url in _cache) {
    return _cache[url];
  }
  const response = await fetch(url);
  const text = await response.text();
  _cache[url] = text;
  return text;
}
```

Using `async` ensures that the state (`requestStatus`) is updated consistently, making the behavior predictable.

x??

---

**Rating: 8/10**

#### Async Functions and Promises

Background context: In TypeScript, async functions return a Promise. The return value of an `async` function is automatically wrapped in a `Promise`. However, if you explicitly return a Promise from an `async` function, it will not be wrapped again.

:p What happens when you return a Promise directly from an `async` function?
??x
When you return a Promise directly from an async function, TypeScript does not wrap the returned value in another Promise. The result is that the type of the function's return value is `Promise<T>` rather than `Promise<Promise<T>>`.

```typescript
async function getJSON(url: string): Promise<any> {
    const response = await fetch(url);
    const jsonPromise = response.json();
    return jsonPromise; // No additional wrapping occurs here
}
```
x??

---

#### Prefer Promises and Async/Await

Background context: Promises are generally preferred over callbacks for better composability and type flow. `async` and `await` make the code more readable and easier to reason about by avoiding deep nested callbacks.

:p Why should you prefer using `async`/`await` over raw Promises?
??x
Using `async`/`await` is preferable because it produces cleaner, more readable code that is less prone to callback hell. The use of `await` within an `async` function allows you to write asynchronous operations in a synchronous-like manner, which can make debugging and understanding the flow easier.

```typescript
// Using async/await for fetching JSON data
async function getJSON(url: string): Promise<any> {
    const response = await fetch(url);
    return response.json();
}
```
x??

---

#### TypeScript Type Inference

Background context: TypeScript has strong type inference capabilities, but sometimes it can be too strict. The `fetchAPI` example illustrates this limitation; you need to provide both the API and Path types explicitly because of how type inference works in TypeScript.

:p Why do we get an error when using `fetchAPI<SeedAPI>('/seed/strawberry')`?
??x
The error occurs because TypeScript requires all type parameters to be specified explicitly when calling a generic function, even if some can be inferred. In the case of `fetchAPI`, both the API and Path types must be provided.

```typescript
// Incorrect usage with an error: fetchAPI<SeedAPI>('/seed/strawberry');
// Expected 2 type arguments, but got 1.
```
x??

---

#### Class for Type Capture

Background context: Using a class can help separate the explicit specification of generic types from the inference of others. This approach is particularly useful when you have multiple methods that require the same type parameters.

:p How does using a class to create an `ApiFetcher` solve the problem?
??x
Using a class allows us to define a single type parameter during object creation and infer another within method calls. This separation makes the code more flexible and easier to use while still leveraging TypeScript's strong typing system.

```typescript
// Using a class for Api Fetching
declare class ApiFetcher<API> {
    fetch<Path extends keyof API>(path: Path): Promise<API[Path]>;
}

const fetcher = new ApiFetcher<SeedAPI>();
const berry = await fetcher.fetch('/seed/strawberry'); // Correct usage
```
x??

---

#### Currying for Type Capture

Background context: Currying can be used to create a function that returns another function, each with its own type parameters. This approach allows for more flexible and inferred type handling.

:p How does currying help in the `fetchAPI` example?
??x
Currying helps by allowing us to return a new function for each call, where the API parameter can be specified once, and subsequent calls infer the Path correctly.

```typescript
// Using currying for fetch API
declare function fetchAPI<API>(): <Path extends keyof API>(path: Path) => Promise<API[Path]>;

const berry = await fetchAPI<SeedAPI>()('/seed/strawberry'); // Correct usage
```
x??

---

#### Local Type Aliases with Currying

Background context: When using curried functions, you can define local type aliases within the function's implementation to make complex types more manageable.

:p How does defining a `Routes` type alias help in the `fetchAPI` example?
??x
Defining a local type alias like `Routes` helps simplify and clarify the type constraints. This makes it easier to understand and work with the generic parameters.

```typescript
// Example of using a local type alias with currying
function fetchAPI<API>() {
    type Routes = keyof API & string;  // Local type alias
    return <Path extends Routes>(
        path: Path
    ): Promise<API[Path]> => fetch(path).then(r => r.json());
}
```
x??

---

