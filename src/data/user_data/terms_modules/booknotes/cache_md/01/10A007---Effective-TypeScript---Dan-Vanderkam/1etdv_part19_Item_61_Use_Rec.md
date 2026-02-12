# High-Quality Flashcards: 10A007---Effective-TypeScript---Dan-Vanderkam_processed (Part 19)


**Starting Chapter:** Item 61 Use Record Types to Keep Values in Sync

---


#### Record Types to Keep Values in Sync
Background context: This concept revolves around managing state changes in UI components, particularly in scenarios where certain properties should trigger updates while others shouldn't. The `Record` type and `keyof` assertion are used to enforce that all necessary properties are accounted for when checking if a component needs an update.

:p How can you ensure that only relevant properties trigger re-renders in a UI component like a scatter plot?
??x
By using the `Record` type along with `keyof`, we can create an object that maps each property to a boolean value indicating whether it should trigger a re-render. This forces any new properties to be explicitly added, preventing silent bugs.

```typescript
const REQUIRES_UPDATE: Record<keyof ScatterProps, boolean> = {
    xs: true,
    ys: true,
    xRange: true,
    yRange: true,
    color: true,
    onClick: false,
};

function shouldUpdate(
    oldProps: ScatterProps,
    newProps: ScatterProps
): boolean {
    for (const kStr in oldProps) {
        const k = kStr as keyof ScatterProps;
        if (oldProps[k] !== newProps[k] && REQUIRES_UPDATE[k]) {
            return true;
        }
    }
    return false;
}
```

x??

---
#### Conservative vs. Fail Closed Approach
Background context: This concept discusses two strategies for determining when a UI component needs to be re-rendered based on property changes. The conservative approach always ensures correct behavior by checking all properties, while the fail closed approach tries to optimize but risks missing necessary updates.

:p Which approach is more likely to miss necessary re-renders?
??x
The fail closed approach might miss necessary re-renders because it only checks specific properties rather than all of them. While this can reduce unnecessary re-renders, it increases the risk that changes in unmonitored properties won't trigger a re-render.

```typescript
function shouldUpdate(
    oldProps: ScatterProps,
    newProps: ScatterProps
): boolean {
    return (
        oldProps.xs === newProps.xs ||
        oldProps.ys === newProps.ys ||
        oldProps.xRange === newProps.xRange ||
        oldProps.yRange === newProps.yRange ||
        oldProps.color === newProps.color
    );
}
```

x??

---
#### Excess Property Checking with Records and Mapped Types
Background context: This concept highlights how TypeScript’s `Record` type can be used to enforce that an object has exactly the same properties as another, ensuring that all necessary updates are accounted for. This is particularly useful in scenarios where you need to keep track of which properties should trigger re-renders.

:p How does using a `Record` with `keyof` help enforce property consistency?
??x
Using a `Record` with `keyof` ensures that any new or deleted properties in the interface are reflected in the record, thus requiring explicit updates. This is achieved by defining a record where each key from the interface maps to a boolean value indicating whether it should trigger an update.

```typescript
const REQUIRES_UPDATE: Record<keyof ScatterProps, boolean> = {
    xs: true,
    ys: true,
    xRange: true,
    yRange: true,
    color: true,
    onClick: false,
};

// Attempting to add a new property without updating the record will result in an error.
interface ScatterProps {
    // ...
    onDoubleClick?: () => void;
}

const REQUIRES_UPDATE: Record<keyof ScatterProps, boolean> = { // Error
    xs: true,
    ys: true,
    xRange: true,
    yRange: true,
    color: true,
    onClick: false,
    onDoubleClick: false, // Property 'onDoubleClick' is missing in type ...
};
```

x??

---


#### Using `Rest Parameters and Tuple Types` to Model Variadic Functions
Background context explaining the concept. When you need a function that can take a different number of arguments based on some TypeScript type, using rest parameters with tuple types provides a powerful solution. This approach ensures safety by aligning the parameter count with the expected input.

If applicable, add code examples with explanations.
:p How can you design a `buildURL` function in TypeScript to handle optional and varying query parameters for different routes?
??x
To design a `buildURL` function that handles optional and varying query parameters for different routes, you need to use type safety and rest parameters. The key idea is to make the second parameter's type depend on the route.

```typescript
interface RouteQueryParams {
    '/': null,
    '/search': { query: string; language?: string },
    // ... other routes
}

function buildURL<Path extends keyof RouteQueryParams>(
    route: Path, 
    params: RouteQueryParams[Path] = null as any // Provide a type-safe default
) {
    return route + (params ? `?${new URLSearchParams(params)}` : '');
}
```

In this example:
- The function is generic over the path.
- The second parameter's type depends on the specific route (`RouteQueryParams[Path]`).
- A default value of `null as any` ensures type safety.

This approach works well for routes with defined query parameters, but it doesn't handle the case where no parameters are required (like `/`). To address this, you can use rest parameters and conditional types to make the function variadic.

```typescript
function buildURL<Path extends keyof RouteQueryParams>(
    route: Path,
    ...args: (RouteQueryParams[Path] extends null ? [] : [params: RouteQueryParams[Path]])
) {
    const params = args ? args[0] : null;
    return route + (params ? `?${new URLSearchParams(params)}` : '');
}
```

This function:
- Uses rest parameters to handle varying numbers of arguments.
- Checks if the query parameter type is `null` and adjusts accordingly.

Using this approach, you can ensure that the function works correctly for all routes without unnecessary null arguments.
x??

---
#### Conditional Types in Function Signatures
Background context explaining the concept. Conditional types are a powerful feature in TypeScript that allow you to define the type of one element based on another's value or type. This is particularly useful when modeling functions whose signatures depend on some input type.

:p How can you use conditional types to model a function with variable parameter count and type?
??x
To use conditional types to model a function with a variable parameter count and type, you need to ensure that the function signature adapts based on the specific route's query parameters. Here’s how:

```typescript
interface RouteQueryParams {
    '/': null,
    '/search': { query: string; language?: string },
    // ... other routes
}

function buildURL<Path extends keyof RouteQueryParams>(
    route: Path,
    ...args: (RouteQueryParams[Path] extends null ? [] : [params: RouteQueryParams[Path]])
) {
    const params = args ? args[0] : null;
    return route + (params ? `?${new URLSearchParams(params)}` : '');
}
```

In this example:
- The function is generic over the path.
- A rest parameter (`...args`) is used to accept a variable number of arguments.
- A conditional type `(RouteQueryParams[Path] extends null ? [] : [params: RouteQueryParams[Path]])` ensures that if the route does not have query parameters, no additional arguments are required. Otherwise, one argument with the appropriate parameter type is expected.

This approach allows you to write a function that behaves differently based on the route's requirements, providing both safety and flexibility.
x??

---
#### Handling Route Query Parameters Safely
Background context explaining the concept. When building routes for web applications, it’s common to have different query parameters depending on the route. Ensuring type safety while allowing flexible argument handling is crucial.

:p How can you ensure that a `buildURL` function handles optional and varying query parameters safely?
??x
To ensure that a `buildURL` function handles optional and varying query parameters safely, you should use TypeScript’s generic types to align the parameter count with the expected input. Here’s how:

```typescript
interface RouteQueryParams {
    '/': null,
    '/search': { query: string; language?: string },
    // ... other routes
}

function buildURL<Path extends keyof RouteQueryParams>(
    route: Path, 
    params: RouteQueryParams[Path] = null as any // Provide a type-safe default
) {
    return route + (params ? `?${new URLSearchParams(params)}` : '');
}
```

In this example:
- The function is generic over the path (`<Path extends keyof RouteQueryParams>`).
- The second parameter's type depends on the specific route (`RouteQueryParams[Path]`).
- A default value of `null as any` ensures type safety.

For routes that don't require query parameters, passing a null value works correctly. However, this can be extended to handle variadic functions using rest parameters and conditional types:

```typescript
function buildURL<Path extends keyof RouteQueryParams>(
    route: Path,
    ...args: (RouteQueryParams[Path] extends null ? [] : [params: RouteQueryParams[Path]])
) {
    const params = args ? args[0] : null;
    return route + (params ? `?${new URLSearchParams(params)}` : '');
}
```

This approach:
- Uses rest parameters to handle varying numbers of arguments.
- Checks if the query parameter type is `null` and adjusts accordingly.

By using these techniques, you can create a function that handles different routes with their respective query parameters safely and efficiently.
x??

---


#### Exclusive Or (XOR) in TypeScript
Background context: In TypeScript, the inclusive OR (`|`) operator can sometimes lead to unexpected behaviors when modeling exclusive conditions. The traditional understanding of "or" as an exclusive operation is common in ordinary speech but not always reflected in programming languages like JavaScript and TypeScript.

:p How does TypeScript handle the `|` (inclusive OR) operator?
??x
TypeScript treats the `|` operator as inclusive, meaning a type can be both types on either side. This can lead to unexpected results when modeling exclusive conditions.
```typescript
interface ThingOne {
    shirtColor: string;
}

interface ThingTwo {
    hairColor: string;
}

type Thing = ThingOne | ThingTwo;

const bothThings = { 
    shirtColor: 'red', 
    hairColor: 'blue' 
};

const thing1: ThingOne = bothThings;  // ok
const thing2: ThingTwo = bothThings;  // ok
```
x??

---

#### Using Optional `never` to Model Exclusive Or
Background context: To model exclusive OR (XOR) in TypeScript, you can use optional properties with the type `never`. This ensures that a property cannot be present on an object of the resulting union type.

:p How does using optional never (`?: never`) help model exclusive OR?
??x
By making one of the properties optional and assigning it `never`, you force the type to allow only objects that have exactly one of the properties. This effectively models exclusive OR.
```typescript
interface OnlyThingOne {
    shirtColor: string;
    hairColor?: never;
}

interface OnlyThingTwo {
    hairColor: string;
    shirtColor?: never;
}

type ExclusiveThing = OnlyThingOne | OnlyThingTwo;

const thing1: OnlyThingOne = bothThings;  // Error, incompatible property 'hairColor'
const thing2: OnlyThingTwo = bothThings;  // Error, incompatible property 'shirtColor'
```
x??

---

#### Applying `never` to Other Types
Background context: The concept of using optional never can be applied beyond just modeling exclusive OR. It can also be used to disallow certain properties in structural types.

:p How can you use the `never` type to model a 2D vector?
??x
By adding an optional property with the type `never`, you can ensure that objects only have properties valid for 2D vectors, preventing the inclusion of extraneous properties like `z`.
```typescript
interface Vector2D {
    x: number;
    y: number;
    z?: never;
}

const v = { 
    x: 3, 
    y: 4, 
    z: 5 // Error due to z property being optional with never type
};

function norm(v: Vector2D) {
    return Math.sqrt(v.x ** 2 + v.y ** 2);
}
```
x??

---

#### Tagged Unions for Exclusive Or
Background context: Another approach to modeling exclusive OR is using tagged unions. This involves adding a discriminator property that ensures only one variant can be present in an object.

:p How does using tagged unions help model exclusive OR?
??x
Tagged unions use a unique identifier (discriminator) to ensure that objects are of exactly one type within the union. In this case, `type` acts as the discriminator, making it impossible for both types to coexist on the same object.
```typescript
interface ThingOneTag {
    type: 'one';
    shirtColor: string;
}

interface ThingTwoTag {
    type: 'two';
    hairColor: string;
}

type Thing = ThingOneTag | ThingTwoTag;

const thing1: ThingOneTag = { 
    type: 'one', 
    shirtColor: 'red' 
};

const thing2: ThingTwoTag = { 
    type: 'two', 
    hairColor: 'blue' 
};
```
x??

---

#### XOR Helper Type
Background context: For more complex scenarios, a generic helper type `XOR` can be defined to automatically generate types that model exclusive OR based on the given interface definitions.

:p How does the `XOR` type work?
??x
The `XOR` type uses intersection and exclusion patterns to create union types where each type in the resulting union only has properties from one of the input interfaces, ensuring they are mutually exclusive.
```typescript
type XOR<T1, T2> = 
    (T1 & {[k in Exclude<keyof T2, keyof T1>]?: never}) | 
    (T2 & {[k in Exclude<keyof T1, keyof T2>]?: never});

type ExclusiveThing = XOR<ThingOne, ThingTwo>;

const allThings: ExclusiveThing = {  // Error due to incompatible property 'hairColor'
    shirtColor: 'red', 
    hairColor: 'blue' 
};
```
x??

