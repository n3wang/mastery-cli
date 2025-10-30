# High-Quality Flashcards: 10A007---Effective-TypeScript---Dan-Vanderkam_processed (Part 2)

**Rating threshold:** >= 8/10

**Starting Chapter:** Item 4 Get Comfortable with Structural Typing

---

**Rating: 8/10**

#### Structural Typing in TypeScript
Background context explaining structural typing. TypeScript's type system is structural, meaning that it checks the structure of objects rather than their type names or interfaces. This allows for more flexible and dynamic typing but can also introduce potential issues if not handled carefully.

:p What is structural typing in TypeScript?
??x
Structural typing in TypeScript refers to a feature where types are checked based on the presence and type of properties, rather than their declared interface or class name. For example, a NamedVector object can be passed to a function expecting a Vector2D because both have `x` and `y` properties.

```typescript
interface Vector2D {
    x: number;
    y: number;
}

interface NamedVector {
    name: string;
    x: number;
    y: number;
}

function calculateLength(v: Vector2D) {
    return Math.sqrt(v.x ** 2 + v.y ** 2);
}

const v: NamedVector = { x: 3, y: 4, name: 'Pythagoras' };
calculateLength(v); // This works because the structure matches.
```
x??

---

#### Bug in Normalization Function
Background context explaining how structural typing can lead to unexpected results. In this example, a Vector2D is passed to a function expecting a Vector3D, which leads to incorrect behavior.

:p Why does the normalization function return a vector with a length greater than 1?
??x
The normalization function `normalize` assumes it receives a Vector3D but actually gets a NamedVector (which has an additional `name` property). The z component is ignored during normalization because the input object does not explicitly specify that it must be of type Vector3D. This leads to incorrect length calculation.

```typescript
interface Vector3D {
    x: number;
    y: number;
    z: number;
}

function normalize(v: Vector3D) {
    const length = calculateLength(v);
    return {
        x: v.x / length,
        y: v.y / length,
        z: v.z / length,
    };
}

const vector = { x: 3, y: 4, z: 5, name: 'Example' };
normalize(vector); // This will result in a vector with length > 1.
```
x??

---

#### Open Types and Potential Errors
Background context explaining the concept of open types in TypeScript. The type system is open, meaning that objects can have additional properties beyond those declared.

:p Why does calling `calculateLengthL1` with an object containing unexpected properties result in a runtime error?
??x
Calling `calculateLengthL1` with an object like `vec3D` that has additional properties leads to a runtime error because the type system is open. The function assumes that only `x`, `y`, and `z` are present, but since TypeScript does not enforce this, accessing these properties without checking can lead to errors.

```typescript
const vec3D = { x: 3, y: 4, z: 1, address: '123 Broadway' };
calculateLengthL1(vec3D); // This will result in NaN because the type of v[axis] is any.
```
x??

---

#### Structural Typing and Classes
Background context explaining how structural typing applies to class assignability. In TypeScript, classes are compared structurally for assignability.

:p Why can `b` be assigned to a variable of type `SmallNumContainer` even though it does not fully conform to the constructor's logic?
??x
In TypeScript, `b` can be assigned to a variable of type `SmallNumContainer` because structural typing only checks if an object has the required properties. The class `SmallNumContainer` enforces validation in its constructor, but this is not checked at runtime when assigning objects.

```typescript
class SmallNumContainer {
    num: number;
    constructor(num: number) {
        if (num < 0 || num >= 10) {
            throw new Error(`You gave me ${num} but I want something 0-9.`);
        }
        this.num = num;
    }
}

const a = new SmallNumContainer(5);
const b: SmallNumContainer = { num: 2024 }; // This is allowed due to structural typing.
```
x??

---

#### Benefits of Structural Typing in Testing
Background context explaining the benefits and practical applications of structural typing, particularly in testing.

:p How does using a structurally typed interface help simplify tests?
??x
Using a structurally typed interface can make writing tests simpler by allowing you to pass objects that only need to match a certain structure without implementing an entire class. This is useful for mocking or creating test-specific data structures.

```typescript
interface Author {
    first: string;
    last: string;
}

function getAuthors(database: PostgresDB): Author[] {
    const authorRows = database.runQuery(`SELECT first, last FROM authors`);
    return authorRows.map(row => ({ first: row[0], last: row[1] }));
}

interface DB {
    runQuery: (sql: string) => any[];
}

function getAuthors(database: DB): Author[] {
    const authorRows = database.runQuery(`SELECT first, last FROM authors`);
    return authorRows.map(row => ({ first: row[0], last: row[1] }));
}

test('getAuthors', () => {
    const authors = getAuthors({
        runQuery(sql: string) { 
            return [['Toni', 'Morrison'], ['Maya', 'Angelou']]; 
        }
    });
});
```
x??

**Rating: 8/10**

#### Duck Typing and Structural Typing in TypeScript

Duck typing is a concept where an object's capabilities are determined by what it can do rather than its type. In JavaScript, objects can have properties and methods dynamically added or removed at runtime. TypeScript uses structural typing to model this behavior.

:p What is the key difference between duck typing and structural typing?
??x
The key difference lies in how type checking works. Duck typing checks an object's capabilities based on what it can do (functions and properties), whereas structural typing focuses on the shape of objects, ensuring they match a specific structure regardless of their class or prototype chain.

In TypeScript:

```typescript
interface Animal {
    move: () => void;
}
```

A class `Bird` implementing the `move()` method would satisfy this interface.
x??

---

#### Structural Typing in TypeScript

Structural typing allows objects to be compatible based on their structure, not just their type. This means an object can conform to a type without explicitly declaring that type.

:p How does structural typing work in TypeScript?
??x
In structural typing, types are checked for compatibility by comparing the properties and methods of objects. An object can satisfy a given interface or type if it has all the required properties and methods, even if its class is different from what is expected.

```typescript
interface Animal {
    move: () => void;
}

class Dog implements Animal {
    move() {}
}

const dog: Animal = new Dog();
```

Here, `Dog` conforms to the `Animal` type due to its method signature.
x??

---

#### The `any` Type in TypeScript

The `any` type in TypeScript allows you to bypass most forms of type checking. It is often used when you don't understand an error or think the type checker is incorrect.

:p What are the main drawbacks of using the `any` type?
??x
Using the `any` type can lead to several issues:
- Loss of type safety: You can assign any value to a variable, potentially breaking contracts and leading to bugs.
- Reduced language services: Features like intelligent autocomplete and refactoring support are lost for variables with `any` types.
- Runtime bugs: Changes in your code might go unnoticed by the type checker but will manifest at runtime.

```typescript
let ageInYears: number;
ageInYears = '12'; // OK, TypeScript allows this due to any

// Later refactor:
interface Person {
    firstName: string;
    lastName: string;
}

const person: any = {firstName: "John", lastName: "Doe"};
console.log(person.firstName); // Works but can be misleading
```
x??

---

#### Refactoring with the `any` Type

Refactoring code that uses `any` types can lead to hidden bugs because TypeScript will not catch type mismatches.

:p How does using `any` affect refactoring?
??x
Using `any` can make refactoring error-prone because:
- The type checker won’t flag potential issues when you change the structure of your data.
- You might inadvertently introduce bugs that only surface at runtime, leading to hard-to-diagnose errors.

For example:

```typescript
interface ComponentProps {
    onSelectItem: (item: any) => void;
}

function renderSelector(props: ComponentProps) {
    // ...
}

let selectedId = 0;

function handleSelectItem(item: any) {
    selectedId = item.id; // This might be a bug if item doesn't have an id
}

renderSelector({onSelectItem: handleSelectItem});

// Later refactor:
interface ComponentProps {
    onSelectItem: (id: number) => void;
}
```

In the refactored code, `handleSelectItem` still accepts any object because of its `any` type, leading to runtime errors if `item.id` does not exist.
x??

---

#### Limiting the Use of `any`

While `any` can be useful in certain scenarios, it should be used sparingly. Overuse can undermine the benefits of TypeScript.

:p Why is using `any` generally discouraged?
??x
Using `any` is discouraged because:
- It removes type safety and can lead to runtime errors.
- It hinders language services like autocomplete and refactoring support.
- It makes your code harder to understand and maintain, as explicit types are better for communicating intent.

Instead of using `any`, consider writing out more specific types or using union types where appropriate.
x??

---

#### Examples of Using Specific Types vs. `any`

Using specific types can provide clearer and safer code compared to using the `any` type.

:p How does using a specific type compare to using `any`?
??x
Specific types offer better type safety, clarity, and tooling support:

```typescript
interface Person {
    firstName: string;
    lastName: string;
}

const person = {firstName: "John", lastName: "Doe"};

// Using any:
let anyPerson: any = {firstName: "Jane", age: 30}; // No type checking

// Using specific types:
let correctPerson: Person = {firstName: "Jane", lastName: "Smith"};
```

The `any` version bypasses type checks, potentially leading to errors. The specific type `Person` ensures the object has the necessary properties and provides better tooling support.
x??

---

**Rating: 8/10**

#### Using Your Editor to Interrogate and Explore the Type System
Background context explaining the importance of using your editor for type exploration. This involves understanding how TypeScript infers types, which is crucial for writing clean and idiomatic code.

:p How can you use an editor to inspect variable types in TypeScript?
??x
You can hover over a symbol to see its inferred type as shown in Figure 2-1. For example, hovering over the `num` symbol shows that it is of type `number`, even though `number` wasn't explicitly written.
```typescript
let num = 10;
```
For functions, you can inspect their return types and parameters as demonstrated in Figure 2-2. This helps you understand what TypeScript infers about your code's typing.

??x
---
#### Autocomplete and Type Inference
Explaining how autocomplete features help you write TypeScript by suggesting types and values based on the context.

:p What role does autocomplete play in understanding type inference?
??x
Autocomplete is a powerful tool for exploring the type system. When you hover over `num` (Figure 2-1), you see that its inferred type is `number`. This helps build intuition about how TypeScript infers types based on values, which is useful for writing compact and idiomatic code.

??x
---
#### Conditional Branching and Type Narrowing
Explaining the concept of widening and narrowing in type systems and how it applies to conditional statements.

:p How does the type of a variable change within a branch of a conditional statement?
??x
The type of `message` is inferred as `string | null` outside the conditional block but changes to just `string` inside, as shown in Figure 2-3. This is because TypeScript narrows down the possible types based on the condition.

```typescript
let message: string | null = "Hello";
if (message) {
    console.log(message.length); // message inferred as string
} else {
    message = null;
}
```
??x
---
#### Inspecting Properties in Objects
Explaining how to inspect individual properties of objects and their inferred types.

:p How can you inspect the types of individual properties within a larger object?
??x
You can click on an object property, such as `obj.x`, to see its inferred type. For example, if `x` is intended to be a tuple `[number, number]`, TypeScript would require a type annotation since it cannot infer this complex structure without explicit declaration.

```typescript
let obj = {
    x: [10, 20]
};
```
??x
---
#### Inferred Generic Types in Method Chains
Explaining how to inspect generic types within method chains and their usefulness for complex operations.

:p How can you inspect inferred generic types in the middle of a chain of method calls?
??x
By hovering over or clicking on the method name, you can see the inferred generic type. For example, in `Array.split`, TypeScript infers that it returns an array of strings (`Array<string>`), as shown in Figure 2-5.

```typescript
let result = "a,b,c".split(",");
```
??x
---
#### Type Errors and Debugging
Explaining how to learn from type errors provided by the editor, enhancing understanding of the TypeScript type system.

:p What can you learn from seeing type errors in your editor?
??x
TypeScript flags errors like those shown in the function `getElement`, helping you understand nuances such as type narrowing. The first error occurs because `elOrId` could still be `null` even though it's an object, and the second error is due to `document.getElementById` potentially returning `null`.

```typescript
function getElement(elOrId: string | HTMLElement | null): HTMLElement {
    if (typeof elOrId === 'object') { // Error: Type 'HTMLElement | null' is not assignable to type 'HTMLElement'
        return elOrId;
    } else if (elOrId === null) {
        return document.body;
    }
    elOrId; // (parameter) elOrId: string
    return document.getElementById(elOrId); // Error: Type 'HTMLElement | null' is not assignable to type 'HTMLElement'
}
```
??x
---
#### Refactoring Tools in TypeScript
Explaining refactoring tools available through the editor, such as renaming symbols.

:p How can you rename a symbol using an editor’s refactoring tool?
??x
In VS Code, clicking on `i` within the for loop and hitting F2 opens a text box to enter a new name. Only references that match this name are changed, as shown in Figure 2-6.

```typescript
let i = 0;
for (let i = 0; i < 10; i++) {
    console.log(i);
    { 
        let i = 12;
        console.log(i); 
    }
}
console.log(i);
```
Renaming `i` to `x` changes only the relevant references.

```typescript
let x = 0;
for (let x = 0; x < 10; x++) {
    console.log(x);
    { 
        let i = 12;
        console.log(i); 
    }
}
console.log(i);
```
??x
---
#### Navigating Through Code and Libraries
Explaining how to navigate through your own code, external libraries, and type declarations.

:p How can you learn more about a global function like `fetch` using the editor?
??x
By clicking on `fetch`, you navigate to its definition in `lib.dom.d.ts`. Here you see that `fetch` returns a Promise and takes two arguments as shown:

```typescript
declare function fetch(
    input: RequestInfo | URL, 
    init?: RequestInit
): Promise<Response>;
```
Navigating through nested types like `RequestInfo`, `Request`, and `RequestInit` provides detailed information about the function's parameters and return values.

??x
---

