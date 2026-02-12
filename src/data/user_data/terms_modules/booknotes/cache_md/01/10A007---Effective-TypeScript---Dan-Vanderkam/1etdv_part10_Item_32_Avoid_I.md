# High-Quality Flashcards: 10A007---Effective-TypeScript---Dan-Vanderkam_processed (Part 10)


**Starting Chapter:** Item 32 Avoid Including null or undefined in Type Aliases

---


#### Avoid Repeating Type Information in Comments and Variable Names
Background context: When working with programming, it's important to avoid redundancy by not repeating type information within comments or variable names. This practice can lead to inconsistencies if the types are updated but the documentation isn't.

Explanation: If a variable is declared as `readonly` or has an associated unit (like `temperatureC`), this information should be reflected in the type declaration, rather than redundantly stated in the comments.
:p How can you avoid redundancy when naming variables and adding comments?
??x
To avoid redundancy, ensure that your variable names include relevant units where necessary. For example, use `timeMs` instead of just `time`, which might imply a different unit such as seconds or minutes.

In comments, avoid repeating the type information if it's already clear from the type declaration.
```ts
// Incorrect: // This is in milliseconds. const timeMs = 1000;
// Correct: const timeMs = 1000; // Time duration of 1 second (1000ms)
```
x??

---

#### Declaring Parameters as Readonly
Background context: In programming, marking a parameter as `readonly` indicates that the value should not be changed after it is initialized. This can help prevent accidental modification and ensure the integrity of data.

Explanation: By declaring parameters as `readonly`, you provide clear documentation to other developers about how they should interact with the function. This also helps in understanding the function's contract without needing external comments.
:p Why would you declare a parameter as `readonly`?
??x
Declaring a parameter as `readonly` is useful because it signals that the value passed into the function will not be modified within the function. This can help prevent bugs and ensure that data integrity is maintained.

For example, in TypeScript:
```ts
function processReadOnlyData(data: readonly string[]) {
  // You cannot modify the array elements here.
}
```
x??

---

#### Avoiding `null` or `undefined` in Type Aliases
Background context: In TypeScript, allowing type aliases to include `null` or `undefined` can lead to confusion and potential bugs. This is because it's generally better practice to handle optional values explicitly rather than implicitly through the type system.

Explanation: If a type alias might allow null or undefined, it should be clearly indicated in the function signature. Using an optional chain (`?.`) ensures that properties are checked for null before accessing them.
:p Why should you avoid including `null` or `undefined` in type aliases?
??x
You should avoid including `null` or `undefined` in type aliases because it can lead to confusion and potential bugs, especially if the alias is used in multiple places. Instead, use a union type that includes both the expected object shape and null/undefined, and utilize optional chaining (`?.`) when accessing properties.

For example:
```ts
type NullableUser = { id: string; name: string } | null;
function getCommentsForUser(comments: readonly Comment[], user: User | null) {
  return comments.filter(comment => comment.userId === (user?.id ?? ''));
}
```
x??

---

#### Handling `null` or `undefined` in Object Types
Background context: When defining object types, allowing properties to be `null` or `undefined` can sometimes make the type definition more complex and harder to understand. However, it's often better practice to explicitly handle such cases.

Explanation: If a property might be null or undefined, consider using an optional field (with a question mark) instead of adding `| null | undefined` to the entire object shape. This makes the structure clearer and avoids unnecessary complexity.
:p How should you handle properties that can be `null` or `undefined` in TypeScript?
??x
You should handle properties that might be `null` or `undefined` by using optional fields (with a question mark) instead of adding `| null | undefined` to the entire object shape. This makes the structure clearer and avoids unnecessary complexity.

For example:
```ts
interface User {
  id: string;
  name?: string; // Optional property
}
```
x??

---

#### Using `null` in Type Aliases vs. Union Types
Background context: In TypeScript, type aliases that include `null` or `undefined` can be confusing and lead to potential bugs. It's generally better practice to use union types with explicit definitions for optional properties.

Explanation: If a type alias might allow null or undefined, it should be clearly indicated in the function signature using a union type. This makes the type system more clear and avoids redundancy.
:p Why is it better to avoid `null` or `undefined` in type aliases?
??x
It's better to avoid `null` or `undefined` in type aliases because it can lead to confusion, especially if the alias is used across multiple places in your codebase. Using a union type with explicit definitions for optional properties makes the structure clearer and avoids unnecessary complexity.

For example:
```ts
// Incorrect: type NullableUser = { id: string; name: string } | null;
type User = {
  id: string;
  name?: string; // Optional property
};
```
x??

---


#### Push Null Values to the Perimeter of Your Types
When you first turn on strictNullChecks, it may seem as though you have to add scores of if statements checking for null and undefined values throughout your code. This is often because the relationships between null and non-null values are implicit: when variable A is non-null, you know that variable B is also non-null and vice versa.

For example, consider a function `extent` that calculates the minimum and maximum of an iterable list of numbers.
:p How does the initial implementation of the `extent` function handle nulls?
??x
The initial implementation of the `extent` function handles nulls by allowing `min` and `max` to be either defined or undefined. This is problematic because it doesn't properly represent the relationship between these variables, leading to potential issues when both are `undefined`.

```typescript
function extent(nums: Iterable<number>) {
    let min, max;
    for (const num of nums) {
        if (!min) { // Incorrect check for min being undefined
            min = num;
            max = num;
        } else {
            min = Math.min(min, num);
            max = Math.max(max, num);
        }
    }
    return [min, max];
}
```

This function will fail when `nums` is an empty list and might also have issues if both `min` and `max` are zero.
x??

---
#### Use Objects to Track Non-null Values
To improve the design of the `extent` function, you can use a single object to track the extent values, making them either fully null or fully non-null.

:p How does the improved implementation of the `extent` function handle nulls?
??x
In the improved implementation, both `min` and `max` are tracked within an array. This ensures that if one is defined, the other will be as well. The object containing these values can either be fully non-null or null.

```typescript
function extent(nums: Iterable<number>) {
    let minMax: [number, number] | null = null;
    for (const num of nums) {
        if (!minMax) { // Check for undefined state correctly
            minMax = [num, num];
        } else {
            const [oldMin, oldMax] = minMax;
            minMax = [Math.min(num, oldMin), Math.max(num, oldMax)];
        }
    }
    return minMax;
}
```

This approach ensures that the returned object is either `[min, max]` or `null`, making it easier for clients to work with.

```typescript
const range = extent([0, 1, 2]);
if (range) {
    const [min, max] = range;
    const span = max - min; // Safe to use here
}
```

By using a single object to track the extent, you improve your design and make it clearer for TypeScript to understand.
x??

---
#### Design Classes with Non-null Values
When designing classes that may contain null values, consider pushing these values to the perimeter of your API by making larger objects either null or fully non-null.

:p How can the `UserPosts` class be redesigned to handle null values better?
??x
The original `UserPosts` class has properties that are initially set to `null`. These properties might hold both null and non-null states, leading to confusion and potential bugs. A better design is to initialize these properties only after all necessary data is fetched.

```typescript
class UserPosts {
    user: UserInfo;
    posts: Post[];

    constructor(user: UserInfo, posts: Post[]) {
        this.user = user;
        this.posts = posts;
    }

    static async init(userId: string): Promise<UserPosts> {
        const [user, posts] = await Promise.all([
            fetchUser(userId),
            fetchPostsForUser(userId)
        ]);
        return new UserPosts(user, posts);
    }

    getUserName() {
        return this.user.name; // Safe to call as user is non-null
    }
}
```

By initializing `user` and `posts` only when all data is available, the class ensures that these properties are always either both null or both non-null. This makes it easier to write correct methods without needing to handle null states.

```typescript
const userPosts = await UserPosts.init(userId);
console.log(userPosts.getUserName()); // Safe call
```

This approach reduces complexity and improves clarity.
x??

---


#### Prefer Unions of Interfaces to Interfaces with Unions

Background context explaining the concept. This section discusses how to define interfaces that represent valid state combinations, avoiding mixed property values which can lead to errors and complexity.

If applicable, add code examples with explanations:
```typescript
// Initial interface with union types
interface Layer {
    layout: FillLayout | LineLayout | PointLayout;
    paint: FillPaint | LinePaint | PointPaint;
}

// Possible usage leading to potential issues
const layerExample = { 
    layout: new FillLayout(), // This could be any of the three options for `layout`
    paint: new LinePaint()   // This could also be any of the three options for `paint`
};

// Better approach by splitting into separate interfaces and using a union type
interface FillLayer {
    layout: FillLayout;
    paint: FillPaint;
}

interface LineLayer {
    layout: LineLayout;
    paint: LinePaint;
}

interface PointLayer {
    layout: PointLayout;
    paint: PointPaint;
}

type Layer = FillLayer | LineLayer | PointLayer;

// Enhanced usage with explicit type information
function drawLayer(layer: Layer) {
    if (layer.layout instanceof FillLayout) { // TypeScript can narrow the type based on `layout`
        const {paint} = layer;  // paint will be of type `FillPaint`
        console.log('Drawing fill layer');
    } else if (layer.layout instanceof LineLayout) {
        const {paint} = layer;  // paint will be of type `LinePaint`
        console.log('Drawing line layer');
    } else {
        const {paint} = layer;  // paint will be of type `PointPaint`
        console.log('Drawing point layer');
    }
}
```

:p Why is it better to use a union of interfaces rather than an interface with union types for the `Layer` example?
??x
Using a union of interfaces for `Layer` ensures that each layout and paint property are correctly matched, reducing the risk of invalid combinations. This approach allows TypeScript to provide better type checking and autocompletion support.
```typescript
// Example function usage
const layerExample = new FillLayer(); // Correct combination of FillLayout and FillPaint
drawLayer(layerExample); // TypeScript can infer `layer` as a `FillLayer`
```
x??

---

#### Tagged Unions

Background context explaining the concept. Tagged unions, or discriminated unions, are used to model relationships between properties more clearly by using a tag property that indicates which type is present.

If applicable, add code examples with explanations:
```typescript
// Using tagged union approach for `Layer`
interface FillLayer {
    type: 'fill';
    layout: FillLayout;
    paint: FillPaint;
}

interface LineLayer {
    type: 'line';
    layout: LineLayout;
    paint: LinePaint;
}

interface PointLayer {
    type: 'point';
    layout: PointLayout;
    paint: PointPaint;
}

type Layer = FillLayer | LineLayer | PointLayer;

// Function to demonstrate usage
function drawLayer(layer: Layer) {
    switch (layer.type) { // `type` serves as a tag for discriminating the union
        case 'fill':
            const {paint} = layer;  // paint is now guaranteed to be of type FillPaint
            console.log('Drawing fill layer');
            break;
        case 'line':
            const {paint} = layer;  // paint is now guaranteed to be of type LinePaint
            console.log('Drawing line layer');
            break;
        case 'point':
            const {paint} = layer;  // paint is now guaranteed to be of type PointPaint
            console.log('Drawing point layer');
            break;
    }
}
```

:p How does using tagged unions improve the `Layer` definition?
??x
Using tagged unions improves the `Layer` definition by explicitly defining the relationship between layout and paint properties. The `type` property acts as a tag, allowing TypeScript to narrow down the type of the object based on its value.

This approach ensures that:
- Only valid combinations of `layout` and `paint` are possible.
- TypeScript can provide better type checking during development.
```typescript
// Example function usage
const fillLayer = new FillLayer(); // Correct combination with 'fill' tag
drawLayer(fillLayer); // TypeScript can infer the specific layer type
```
x??

---

#### Optional Fields and Unions

Background context explaining the concept. The section discusses how optional fields in interfaces might indicate a problem, suggesting that properties should be grouped into objects to represent their relationships more clearly.

If applicable, add code examples with explanations:
```typescript
// Initial problematic interface
interface Person {
    name: string;
    placeOfBirth?: string; // This could be missing or present
    dateOfBirth?: Date;  // This could also be missing or present
}

// Example usage leading to potential issues
const alanT = { 
    name: 'Alan Turing', 
    placeOfBirth: 'London' // Could be missing in some cases
};

// Better approach by grouping related optional fields into an object
interface Person {
    name: string;
    birth?: {  // Birth details as a single object
        place: string;
        date: Date;
    }
}

// Example usage with improved clarity
const alanT = { 
    name: 'Alan Turing', 
    birth: { 
        place: 'London', 
        date: new Date('1912-06-23') // Both `place` and `date` are required together
    }
};

// Function to demonstrate usage
function eulogize(person: Person) {
    console.log(`Name: ${person.name}`);
    if (person.birth) {  // Check for presence of birth details
        console.log(`Born on ${person.birth.date} in${person.birth.place}.`);
    }
}
```

:p How does grouping related optional fields into an object improve the `Person` interface?
??x
Grouping related optional fields into an object improves the `Person` interface by making it clear that both birth-related properties must be present or absent together. This approach ensures that TypeScript can enforce this relationship and provide better type checking.

By doing so, you avoid potential issues where only one part of the optional field is provided:
```typescript
// Example usage with improved clarity
const alanT = { 
    name: 'Alan Turing', 
    birth: {
        place: 'London',
        date: new Date('1912-06-23') // Both `place` and `date` are required together
    }
};
```
x??

