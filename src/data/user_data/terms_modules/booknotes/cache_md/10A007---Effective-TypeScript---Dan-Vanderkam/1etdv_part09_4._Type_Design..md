# High-Quality Flashcards: 10A007---Effective-TypeScript---Dan-Vanderkam_processed (Part 9)


**Starting Chapter:** 4. Type Design. Item 29 Prefer Types That Always Represent Valid States

---


#### Valid State Representation
Background context: When designing types, it is crucial to ensure that they can only represent valid states. This makes your code more understandable and reduces the likelihood of bugs. If a type allows invalid states, it can lead to confusion when reading or maintaining the code.

:p What is the importance of ensuring types always represent valid states?
??x
Ensuring that types always represent valid states helps in making the code straightforward and less error-prone. By defining types such that they only reflect meaningful scenarios, you make your code easier to understand and maintain. This approach reduces the number of potential bugs because invalid states cannot be created through type mismatches.

For example, consider a `State` interface:
```typescript
interface State {
  pageText: string;
  isLoading: boolean;
  error?: string;
}
```
If this type is used correctly, it ensures that any state passed to functions like `renderPage` or `changePage` will always have a valid combination of properties. This helps in preventing logic errors where invalid states could lead to confusion.

```typescript
// Example function with invalid state handling
function renderPage(state: State) {
  if (state.error) {
    return `Error. Unable to load ${currentPage}: ${state.error}`;
  } else if (state.isLoading) {
    return `Loading ${currentPage}...`;
  }
  return `<h1>${currentPage}</h1> ${state.pageText}`;
}
```
??x
The function `renderPage` can encounter issues when both `isLoading` and `error` are set, leading to ambiguous behavior. By ensuring that the type only allows valid combinations of these properties, you prevent such ambiguities.
```typescript
// Revised State interface to better represent valid states
interface State {
  pageText: string;
  isLoading: boolean;
  error?: never; // Ensures error can't be set while isLoading is true
}
```
This revised version ensures that if `isLoading` is true, `error` must not exist, making the function logic clearer and less prone to errors.

---
#### Handling Invalid State in Code
Background context: When designing functions that manipulate state, it's essential to handle invalid states gracefully. If your code allows for invalid states, it can lead to unexpected behavior or bugs. Ensuring valid state transitions is a key aspect of robust type design.

:p How can you ensure that your code handles invalid states correctly?
??x
To ensure that your code handles invalid states correctly, you should design types and functions such that they only allow valid combinations of properties. This involves carefully crafting interfaces and ensuring that any function that modifies state does so in a way that maintains the validity of the overall state.

For example, consider an `async` function `changePage`:
```typescript
async function changePage(state: State, newPage: string) {
  state.isLoading = true;
  try {
    const response = await fetch(getUrlForPage(newPage));
    if (!response.ok) { // Corrected condition to check for non-OK status
      throw new Error(`Unable to load ${newPage}: ${response.statusText}`);
    }
    const text = await response.text();
    state.isLoading = false; // Set isLoading back to false after successful fetch
    state.pageText = text;
  } catch (e) {
    state.error = e.toString(); // Use toString method instead of concatenation
  }
}
```
In this example, the function ensures that `isLoading` is set to `false` when a request succeeds and updates the `pageText`. Additionally, it sets `error` correctly in case of an error. These changes prevent potential issues like lingering loading or error states.

---
#### State Transition Examples
Background context: When working with state in applications, understanding how different states transition can help in writing more robust and maintainable code. Ensuring that state transitions are well-defined and handled correctly is crucial for avoiding bugs and making the code easier to understand.

:p What issues arise from poorly designed state transitions?
??x
Poorly designed state transitions can lead to several issues, including ambiguous behavior, incorrect error handling, and potential data inconsistencies. For instance, in an application that involves loading content, if the state representation does not ensure valid combinations of properties, it can result in logical errors.

Consider the `changePage` function from earlier:
```typescript
async function changePage(state: State, newPage: string) {
  state.isLoading = true;
  try {
    const response = await fetch(getUrlForPage(newPage));
    if (response.ok) { // Corrected condition to check for OK status
      throw new Error(`Unable to load ${newPage}: ${response.statusText}`);
    }
    const text = await response.text();
    state.isLoading = false; // Set isLoading back to false after successful fetch
    state.pageText = text;
  } catch (e) {
    state.error = '' + e; // Improper concatenation, use toString() instead
  }
}
```
This function has several issues:
- It sets `isLoading` to `false` only if the request succeeds.
- It uses improper string concatenation in the error handling block.

To fix these issues, you should handle both success and failure cases properly:
```typescript
async function changePage(state: State, newPage: string) {
  state.isLoading = true;
  try {
    const response = await fetch(getUrlForPage(newPage));
    if (!response.ok) { // Corrected condition to check for non-OK status
      throw new Error(`Unable to load ${newPage}: ${response.statusText}`);
    }
    const text = await response.text();
    state.isLoading = false; // Set isLoading back to false after successful fetch
    state.pageText = text;
  } catch (e) {
    state.error = e.toString(); // Use toString method instead of concatenation
  }
}
```
This revised version ensures that `isLoading` is set to `false` in both success and failure scenarios, making the code more robust and easier to understand.

---
#### Valid State vs. Invalid State
Background context: Understanding the difference between valid and invalid states is crucial for designing types and functions that handle state transitions correctly. Ensuring that your code only allows valid states can prevent many common bugs and make your application more reliable.

:p How do you differentiate between valid and invalid states in type design?
??x
In type design, you differentiate between valid and invalid states by carefully defining the properties of an object or interface such that they represent meaningful combinations of values. Invalid states are those where certain conditions cannot be met simultaneously.

For example, consider a `State` interface:
```typescript
interface State {
  pageText: string;
  isLoading: boolean;
  error?: never; // Ensures error can't be set while isLoading is true
}
```
This type ensures that if `isLoading` is `true`, then `error` cannot exist. This helps in preventing ambiguous states where both properties might overlap, leading to unexpected behavior.

Here’s another example:
```typescript
interface LoginPageState {
  username: string;
  password: string;
  submitting?: never; // Ensures submitting can't be true if either field is empty
}
```
This type ensures that the `submitting` property cannot be set to `true` unless both `username` and `password` are non-empty.

By defining types in this way, you make your code more robust and easier to reason about. This approach helps in reducing bugs by preventing invalid state transitions.

---
#### Type Design for Valid State
Background context: When designing types that represent valid states, it's crucial to ensure that the type constraints reflect meaningful combinations of properties. By doing so, you can avoid ambiguous or inconsistent states, which can lead to errors and confusion.

:p What are the benefits of using type definitions to enforce valid state transitions?
??x
Using type definitions to enforce valid state transitions offers several benefits:
1. **Clarity**: It makes the intended state combinations clear to developers reading the code.
2. **Reduced Bugs**: By constraining states, you prevent invalid or ambiguous scenarios that could lead to bugs.
3. **Maintainability**: Well-defined types make it easier to maintain and understand the code.

For example, consider a `UserState` interface:
```typescript
interface UserState {
  isLoggedIn: boolean;
  username?: string; // Optional if not logged in
  permissions?: Permissions; // Optional set of permissions
  isUpdatingProfile?: never; // Ensures this can't be true while not logged in
}
```
This type ensures that `isUpdatingProfile` cannot be `true` unless the user is logged in, making the logic clearer and reducing potential bugs.

Another example:
```typescript
interface OrderState {
  orderId: number;
  status?: 'pending' | 'shipped' | 'delivered';
  paymentStatus?: never; // Ensures paymentStatus can't be set if not shipped
}
```
This type ensures that `paymentStatus` cannot be set unless the order is in a "shipped" state, making the logic clear and preventing invalid states.

By enforcing such constraints through types, you create a more robust and maintainable codebase.


#### Improved State Representation
Background context: The original state representation was ambiguous, leading to difficulties in implementing `render()` and `changePage()`. A new approach using tagged unions (discriminated unions) explicitly models the different states a network request can be in. This approach eliminates invalid states and makes it easier to implement functions like `renderPage` and `changePage`.
:p How does the improved state representation eliminate ambiguity?
??x
The improved state representation uses tagged unions (`RequestPending`, `RequestError`, and `RequestSuccess`) to explicitly model different states of network requests, ensuring that each request is in exactly one state. This eliminates the ambiguity present in the original implementation where it was unclear what the current page was or how pending and error states interacted.
```typescript
interface RequestPending {
    state: 'pending';
}

interface RequestError {
    state: 'error';
    error: string;
}

interface RequestSuccess {
    state: 'ok';
    pageText: string;
}

type RequestState = RequestPending | RequestError | RequestSuccess;

interface State {
    currentPage: string;
    requests: {[page: string]: RequestState};
}
```
x??

---
#### RenderPage Function
Background context: The `renderPage` function takes the state as input and determines what to render based on the current page's request state.
:p What is the logic behind the `renderPage` function?
??x
The `renderPage` function uses a switch statement to determine the appropriate content to render based on the state of the current page. It checks the request state for each page, rendering different messages depending on whether the request is pending, an error occurred, or the data has been successfully fetched.
```typescript
function renderPage(state: State) {
    const {currentPage} = state;
    const requestState = state.requests[currentPage];
    
    switch (requestState.state) {
        case 'pending': 
            return `Loading ${currentPage}...`;
        case 'error':
            return `Error. Unable to load ${currentPage}: ${requestState.error}`;
        case 'ok':
            return `<h1>${currentPage}</h1> ${requestState.pageText}`;
    }
}
```
x??

---
#### ChangePage Function
Background context: The `changePage` function updates the state when the user changes pages, handling both pending and error states appropriately.
:p What does the `changePage` function do?
??x
The `changePage` function updates the state to reflect a new page being selected. It sets the request state of the new page to 'pending' and then attempts to fetch the content for that page. If successful, it updates the request state to 'ok' with the fetched text; otherwise, it sets the request state to 'error' with the error message.
```typescript
async function changePage(state: State, newPage: string) {
    state.requests[newPage] = {state: 'pending'};
    state.currentPage = newPage;

    try {
        const response = await fetch(getUrlForPage(newPage));
        if (!response.ok) {
            throw new Error(`Unable to load ${newPage}: ${response.statusText}`);
        }
        const pageText = await response.text();
        state.requests[newPage] = {state: 'ok', pageText};
    } catch (e) {
        state.requests[newPage] = {state: 'error', error: e.toString()};
    }
}
```
x??

---
#### Airbus 330 Flight 447 Accident
Background context: The accident of Air France Flight 447 highlighted the dangers of poor state management in complex systems, particularly in automated aircraft like the Airbus 330. The separate control inputs for pilots and copilots contributed to the confusion during the flight.
:p How did the design of controls on the Airbus 330 contribute to the accident?
??x
The design of controls on the Airbus 330 had two sets: one for the pilot and another for the co-pilot. This separation led to a situation where both pilots were trying to control the aircraft independently, causing confusion during critical moments. When the aircraft encountered severe turbulence, the automated systems malfunctioned due to conflicting commands from both sets of controls.
```java
// Pseudocode example
public class FlightControlSystem {
    private boolean pilotControl;
    private boolean copilotControl;

    public void applyPilotInput(double input) {
        if (pilotControl) {
            // Apply pilot's control input
        }
    }

    public void applyCopilotInput(double input) {
        if (copilotControl) {
            // Apply co-pilot's control input
        }
    }
}
```
x??

---


#### Designing Interfaces for Simplicity and Safety
Background context: The text discusses the importance of designing interfaces, especially those involving critical systems like aircraft controls, to ensure they are simple, unambiguous, and safe. It uses the example of Airbus 330’s side sticks and the getStickSetting function to illustrate potential pitfalls in complex system designs.

:p What is the main issue highlighted in the text regarding the design of the `getStickSetting` function?
??x
The main issue highlighted is that the `getStickSetting` function, as designed with dual input mode, can fail silently. The function averages the inputs from both side sticks, which could lead to unexpected behavior if both pilots are pulling in opposite directions.

This leads to a situation where neither pilot's intended action (climbing or diving) is properly executed due to averaging out their conflicting commands.
x??

---
#### Mechanical Connection of Controls
Background context: The text mentions that in most planes, the controls are mechanically linked. If one pilot moves a control, the other will experience the same movement. This simplifies the state representation since only one angle needs to be tracked.

:p How does the mechanical connection between cockpit controls simplify the design?
??x
The mechanical connection between cockpit controls simplifies the design by ensuring that both pilots' actions are linked. If one side stick is moved, the other will move in a corresponding manner. This means that only one `stickAngle` value needs to be tracked rather than two independent values.

This simplification reduces complexity and potential ambiguity, making it easier to determine the current state of the controls.
x??

---
#### Averaging Input vs. Linked Controls
Background context: The text provides examples of how averaging input from multiple controls (like the side sticks) can lead to unexpected outcomes. It contrasts this with a simpler design where controls are linked mechanically.

:p How does averaging inputs from both side sticks in `getStickSetting` function pose a risk?
??x
Averaging inputs from both side sticks in the `getStickSetting` function poses a significant risk because it can result in no input being effectively applied if one pilot pulls back and the other pushes forward. This can lead to dangerous situations, such as the Airbus 330 case where pilots were moving their controls in opposite directions but the system averaged out their inputs, causing the plane to remain stationary despite intended actions.

This averaging mechanism does not account for conflicting commands effectively and can result in a failure of critical safety measures.
x??

---
#### Design Principles for Critical Systems
Background context: The text emphasizes the importance of designing interfaces that are simple and unambiguous. It suggests that by excluding invalid states, the code becomes easier to write and safer to use.

:p What principle does the text suggest when designing interfaces for critical systems?
??x
The text suggests the principle of designing interfaces in a way that only valid states are allowed, making the code simpler and reducing the potential for errors. This involves carefully considering which values should be included and which should be excluded to ensure safety and clarity.

For example, instead of using separate left and right side sticks with dual input mode, a simpler design would link both controls mechanically so that they move together. This ensures that only one angle needs to be tracked, making the system safer and more straightforward.
x??

---


#### Robustness Principle (Postel's Law)
Background context: The robustness principle, also known as Postel’s Law, advises developers to be conservative in what they produce and liberal in what they accept. This principle is crucial for creating resilient software systems, especially in network protocols where different implementations can interact with each other.
:p What does the robustness principle suggest?
??x
The robustness principle suggests that when producing data or functionality, one should adhere strictly to standards; however, when accepting inputs or processing data from others, one should be more lenient and forgiving. This approach helps in accommodating variations across different implementations.
x??

---

#### Liberal Acceptance vs Strict Production
Background context: In software development, it is often convenient for functions to accept a broad range of input types (liberal) but produce specific output types (strict). This distinction can affect how robust the codebase is and ease of use.
:p What is the difference between liberal acceptance and strict production in function contracts?
??x
Liberal acceptance means that a function should be able to handle a wide variety of input formats, making it easy for users to call the function. In contrast, strict production implies that a function produces a specific type or set of types as output, ensuring more predictable behavior downstream.
x??

---

#### Camera and Viewport Example
Background context: The example provided uses a 3D mapping API where `setCamera` and `viewportForBounds` functions are defined with liberal input types but produce union types for outputs. This leads to type safety issues when using the resulting camera object.
:p Why did the initial implementation of `focusOnFeature` function fail?
??x
The initial implementation failed because the `viewportForBounds` function returned a union type that included optional properties, making it difficult to safely access specific properties like `lat`, `lng`, and `zoom`. The type inference resulted in properties being typed as `number | undefined`.
x??

---

#### Distinguishing Between Canonical and Loose Types
Background context: To address the issues with liberal return types, the solution involves distinguishing between a canonical form (strict) and loose forms. This allows for more precise typing without sacrificing usability.
:p How can you create a distinction between `LngLat` and `LngLatLike`?
??x
You can create a distinction by defining `LngLat` as an exact type with all required properties, while `LngLatLike` is a union that includes the strict `LngLat` along with other forms. This way, you maintain flexibility in input types but enforce stricter typing on outputs.
```typescript
interface LngLat {
    lng: number;
    lat: number;
};

type LngLatLike = LngLat | { lon: number; lat: number } | [number, number];
```
x??

---

#### Using `Iterable` for Parameter Types
Background context: When a function only needs to iterate over its input, using `Iterable` can be more flexible than using specific array types like `Array`, `ArrayLike`, or `readonly Array`. This allows for greater flexibility in the data source.
:p Why might you choose to use `Iterable<number>` as the parameter type instead of `number[]`?
??x
You might choose to use `Iterable<number>` if your function only needs to iterate over the elements but does not need to modify them. Using `Iterable` makes it compatible with both arrays and generator expressions, providing more flexibility without sacrificing iteration capabilities.
```typescript
function sum(xs: Iterable<number>): number {
    let sum = 0;
    for (const x of xs) {
        sum += x;
    }
    return sum;
}
```
x??

---


#### Input Types vs Output Types
Background context: The text highlights that input types often have broader types compared to output types. Optional properties and union types are more common in parameter types, while void returns can be awkward for clients.

:p What is a key difference between input and output types as described?
??x
Input types tend to be broader than output types because functions may accept various inputs or even optional arguments, whereas outputs are typically constrained to specific return values. For instance, the function `getForegroundColor` in the text can take an optional string argument but returns an object.

```typescript
function getForegroundColor(page?: string): Color {
    // Implementation details
}
```
x??

---

#### JSDoc Annotations and Documentation
Background context: The text suggests using JSDoc annotations for describing function parameters, which helps maintain consistent type information between the code and documentation. It also emphasizes that comments should not contradict the actual implementation.

:p What is a better way to document the `getForegroundColor` function?
??x
A better way to document the `getForegroundColor` function would be through JSDoc annotations:

```typescript
/**
 * Get the foreground color for the application or a specific page.
 */
function getForegroundColor(page?: string): Color {
    // Implementation details
}
```
The comment is concise and does not contradict the implementation.

x??

---

#### Using Iterable<T> vs Array
Background context: The text advises using `Iterable<T>` instead of arrays (`T[]`) if you only need to iterate over a function parameter, as this makes your code more flexible and works well with generators.

:p Why should one use `Iterable<T>` over `Array`?
??x
Using `Iterable<T>` is beneficial because it allows for greater flexibility. It works seamlessly with both arrays and generators, making the function compatible with various iterable structures without changing its logic. For example:

```typescript
function processElements(elements: Iterable<number>) {
    for (const element of elements) {
        // Process each element
    }
}
```

This function can handle any iterable structure, including arrays and generator functions.

x??

---

#### Void Return Types and Mutation Claims
Background context: The text discusses the importance of using types to enforce immutability claims. It explains that type annotations in TypeScript are checked by the compiler, ensuring consistency between code and comments.

:p What is a better way to ensure an array does not get modified?
??x
A better way to ensure an array does not get modified is to use `readonly` instead of making assumptions in comments. For example:

```typescript
function sortNumerically(nums: readonly string[]): string[] {
    return nums.sort((a, b) => Number(a) - Number(b));
}
```

Using `readonly` ensures that the function cannot modify the input array, and if it does attempt to do so, TypeScript will throw an error.

x??

---

#### Type Annotations for Variables
Background context: The text emphasizes the importance of using type annotations directly in code rather than relying on comments. This approach helps maintain consistency and reduces the chance of errors due to out-of-sync documentation.

:p Why is it better to use `age` instead of `ageNum`?
??x
Using a variable name like `age` without the type annotation can lead to potential errors, as TypeScript cannot enforce that `age` should be a number. By naming the variable `age: number`, you ensure that only numbers are assigned to it.

```typescript
const age = 25; // Correct usage with type annotation

// Without type annotation:
const ageNum = "twenty-five"; // This would not trigger an error in TypeScript, but is incorrect logic
```

Using named types like `age: number` ensures that the variable can only hold values of a specific type.

x??

---

