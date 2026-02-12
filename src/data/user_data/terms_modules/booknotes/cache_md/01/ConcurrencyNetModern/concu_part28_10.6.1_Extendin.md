# High-Quality Flashcards: ConcurrencyNetModern_processed (Part 28)


**Starting Chapter:** 10.6.1 Extending the F async workflow with applicativefunctoroperators

---


#### Pure Function Implementation in F#
Background context: The `pure` function is a fundamental part of applicative functors. It lifts a value to an asynchronous workflow (`Async`). This allows you to encapsulate synchronous operations within an asynchronous context, making them awaitable.

:p What does the `pure` function do?
??x
The `pure` function in F# takes a value and returns it wrapped in an `Async` computation expression. This is useful for starting asynchronous operations from within a sequence of actions that might be combined with other asynchronous computations.

```fsharp
let pure value = async.Return value
```
x??

---


#### Apply Function Implementation in F#
Background context: The `apply` function in applicative functors combines two asynchronous computations by executing them in parallel and then applying the result of one to the other. This is often used when you have a computation that depends on the results of another.

:p How does the `apply` function work?
??x
The `apply` function starts both async operations (`funAsync` and `opAsync`) in parallel using `Async.StartChild`. Once both are completed, it applies the result of one to the other. This is particularly useful for tasks where you need to wait for multiple async computations before performing an operation.

```fsharp
let apply funAsync opAsync = 
    async {
        let! funAsyncChild = Async.StartChild funAsync
        let! opAsyncChild = Async.StartChild opAsync
        return (funAsyncChild :> obj) |> unbox |> funAsyncRes -> 
               (opAsyncChild :> obj) |> unbox |> opAsyncRes -> 
               (funAsyncRes opAsyncRes)
    }
```
x??

---


#### Parallel Chain of Operations with Applicative Functor in F#
Background context: The `apply` function can be used to create a parallel chain of operations, where each operation is started asynchronously and combined once all are completed. This is demonstrated through the blending of images from blob storage.

:p How does the `blendImagesFromBlobStorage` function use applicative functors?
??x
The `blendImagesFromBlobStorage` function uses the `apply` operator to blend two images that are downloaded from blob storage asynchronously. It starts downloading both images in parallel, ensures they are both completed, and then blends them together using the `blendImages` function.

```fsharp
let blendImagesFromBlobStorage (blobReferenceOne:string) 
                               (blobReferenceTwo:string) 
                               (size:Size) = 
    Async.apply(
        Async.apply(
            Async.apply(
                Async.pure blendImages
                (downloadOptionImage(blobReferenceOne))
                (downloadOptionImage(blobReferenceTwo))
                (Async.pure size)
            )
        )
    )
```
x??

---


#### Difference Between Bind and Apply in Asynchronous Compositions
Background context: `Bind` (`>>=`) is used when the result of one asynchronous operation determines the next, while `Apply` starts both computations independently.

:p What is the key difference between `bind` and `apply` operators in the context of async workflows?
??x
In an async workflow:
- The `bind` operator is used when the execution of a subsequent async operation depends on the result of a previous one.
- The `apply` operator starts both async operations concurrently, allowing them to run independently.

Example using `bind`:
```fsharp
let downloadAndBlendImages (blobReferenceOne:string) 
                           (blobReferenceTwo:string) 
                           (size:Size) = 
    downloadOptionImage blobReferenceOne >>= fun imageOne -> 
    downloadOptionImage blobReferenceTwo >>= fun imageTwo ->
    Async.pure blendImages imageOne imageTwo size
```

Example using `apply`:
```fsharp
let downloadAndBlendImagesWithApply (blobReferenceOne:string) 
                                   (blobReferenceTwo:string) 
                                   (size:Size) = 
    Async.apply(
        Async.apply(
            Async.apply(
                Async.pure blendImages
                (downloadOptionImage blobReferenceOne)
                (downloadOptionImage blobReferenceTwo)
                (Async.pure size)
            )
        )
    )
```
x??

---

---


#### Applicative Functor in F#
Background context: In functional programming, applicative functors are a way to apply functions inside a computational context. This allows for elegant and compositional code that can handle side effects like asynchronous operations without losing the purity of the functional approach. In F#, Async is used as an applicative functor.
:p What is an applicative functor in the context of F#?
??x
An applicative functor in F# is a type constructor (often a monad) that allows you to apply functions inside a computational context, handling side effects like asynchronous operations without losing functional purity. It enables you to lift functions and values into the computational context.
```fsharp
// Example of lifting a function into Async
let liftedAdd = ((+) 1) <*> pure 2
```
x??

---


#### Custom Infix Operators in F#
Background context: In F#, custom infix operators allow for more declarative and readable code by defining operators with specific precedence. This feature is not supported in C#. The provided text demonstrates how to define the `Async.apply` and `Async.map` as infix operators.
:p How do you define a custom infix operator in F#?
??x
To define a custom infix operator in F#, you use the backtick notation (`) followed by the desired symbol. For example, for Async.apply, you can define:
```fsharp
let (<*>) = Async.apply
```
Similarly, for Async.map:
```fsharp
let (<.>) = Async.map
```
These operators are used to make function composition more readable and expressive.
x??

---


#### Applying Functions with Infix Operators in F#
Background context: The provided text shows how using infix operators can simplify code when working with asynchronous operations in F#. This makes the code more readable and declarative, leveraging the applicative functor semantics.
:p How does using custom infix operators like `<*>` and `<.` help in writing functional code?
??x
Using custom infix operators like `<*>` and `<.` helps in writing functional code by making function composition more declarative and readable. These operators allow you to chain operations in a way that is closer to mathematical notation, which can make the intent of your code clearer.

For example:
```fsharp
let blendImagesFromBlobStorage (blobReferenceOne:string)  (blobReferenceTwo:string) (size:Size) =
    blendImages     <.> downloadOptionImage(blobReferenceOne)
                    <*> downloadOptionImage(blobReferenceOne)
                    <*> Async.pure size
```
This code demonstrates how to lift and apply functions in a more concise manner, making the flow of asynchronous operations clear.
x??

---


#### Applicative Functors and Heterogeneous Parallel Computation
Applicative functors provide a way to handle computations with varying result types within parallel operations. The idea is to use applicative combinators to lift functions and then apply them across asynchronous tasks, enabling heterogeneous parallel computation.

Background context: In functional programming, particularly in languages like F# or C#, dealing with multiple asynchronous computations that return different types can be challenging. Traditional methods often require all tasks to have the same result type, which limits flexibility. Applicative functors offer a solution by allowing you to apply a function to values wrapped in a computation context (like `Async`), maintaining the original types.

:p How does applying applicative functors enable heterogeneous parallel computations?
??x
Applying applicative functors enables heterogeneous parallel computations by lifting functions and their arguments into an appropriate context, such as `Async`, which allows them to be applied across tasks with different result types. This is done using combinators like `Apply` that exercise the lifting.

For example, in C#, you can define a function that takes two asynchronous tasks of different types and applies a selector function to their results:

```csharp
static Task<R> Lift2<T1, T2, R>(Func<T1, T2, R> selector, Task<T1> item1, Task<T2> item2)
{
    Func<T1, Func<T2, R>> curry = x => y => selector(x, y);
    var lifted1 = Pure(curry);  // Elevate the function
    var lifted2 = Apply(lifted1, item1);  // Apply to the first task
    return Apply(lifted2, item2);  // Apply to the second task
}
```

This approach uses currying and pure functions to lift the selector into a form that can be applied to each asynchronous task.

x??

---


#### Implementation of Lift2 and Lift3 Functions in C#
The implementation details of `Lift2` and `Lift3` functions are crucial for understanding how heterogeneous parallel computations are achieved using applicative functors. These functions use currying, lifting, and the `Apply` operator to handle asynchronous tasks with different result types.

:p How does the `Lift2` function work in C#?
??x
The `Lift2` function works by first currying the given selector function. Then it uses the `Pure` and `Apply` operators to lift the function into a form that can be applied across asynchronous tasks with different result types.

```csharp
static Task<R> Lift2<T1, T2, R>(Func<T1, T2, R> selector, Task<T1> item1, Task<T2> item2)
{
    Func<T1, Func<T2, R>> curry = x => y => selector(x, y);  // Curry the function
    var lifted1 = Pure(curry);  // Elevate the curried function
    var lifted2 = Apply(lifted1, item1);  // Apply to the first task
    return Apply(lifted2, item2);  // Apply to the second task
}
```

- `curry` takes an input and returns a new function that accepts another argument.
- `Pure(curry)` wraps the curried function in a context where it can be applied to asynchronous tasks.
- `Apply(lifted1, item1)` applies the lifted function to the first asynchronous task.
- The final `Apply` operation applies the result to the second asynchronous task.

x??

---


#### Implementation of Lift3 Function in C#
The `Lift3` function extends the concept of `Lift2` by handling three asynchronous tasks with potentially different types. It uses similar logic but for a higher arity function and more arguments.

:p How does the `Lift3` function work in C#?
??x
The `Lift3` function works similarly to `Lift2`, but it handles three asynchronous tasks instead of two. It involves currying, lifting, and applying the selector function across all tasks while maintaining their original types.

```csharp
static Task<R> Lift3<T1, T2, T3, R>(Func<T1, T2, T3, R> selector, Task<T1> item1, Task<T2> item2, Task<T3> item3)
{
    Func<T1, Func<T2, Func<T3, R>>> curry = x => y => z => selector(x, y, z);
    var lifted1 = Pure(curry);  // Elevate the curried function
    var lifted2 = Apply(lifted1, item1);  // Apply to the first task
    var lifted3 = Apply(lifted2, item2);  // Apply to the second task
    return Apply(lifted3, item3);  // Apply to the third task
}
```

- `curry` takes an input and returns a new function that accepts another two arguments.
- `Pure(curry)` wraps the curried function in a context where it can be applied to asynchronous tasks.
- The three `Apply` operations progressively apply the lifted function to each of the three asynchronous tasks.

x??

---


#### Parallel Computation Composition
Parallel computation involves breaking down a complex task into smaller, independent subtasks that can be executed concurrently. This approach is often used to improve performance by utilizing multiple cores or processors. In functional programming, combinators like `async` and operators like `Fork/Join` are commonly used to manage asynchronous tasks efficiently.

In the given example, three operations need to be performed asynchronously:
1. Fetching the bank account balance.
2. Fetching the stock price from the market.
3. Analyzing the historical trend of a given stock symbol.

:p How can you compose and run these computations in parallel?
??x
To compose and run these computations in parallel, you would use asynchronous functions to fetch each piece of data independently. The `Fork/Join` pattern allows concurrent execution while ensuring that all tasks are completed before the final aggregation step.

You can achieve this by creating an independent task for each operation using the `async` keyword in F#. Here's how you could do it:

```fsharp
let bankAccount = 500.0 + float(rnd.Next(1000))
let getAmountOfMoney() = async { 
    return bankAccount 
}

let getCurrentPrice symbol = async {
    let _, data = processStockHistory symbol
    return data.[0].open' 
}

let analyzeHistoricalTrend symbol = asyncResult {
    let! data = getStockHistory symbol (365/2)
    let trend = data.[data.Length-1] - data.[0]
    return trend 
}
```

Then, you can run these tasks concurrently using `Async.Parallel`:

```fsharp
let allTasks = [getAmountOfMoney(); getCurrentPrice("AAPL"); analyzeHistoricalTrend "AAPL"]
let results = Async.RunAll(allTasks)

// results will be a tuple with the results of each task
```

x??

---


#### Transaction Calculation
The `calcTransactionAmount` function calculates the amount that can be traded based on various conditions. This includes considering the bank account balance, stock price, and applying certain fees.

:p What is the purpose of the `calcTransactionAmount` function?
??x
The `calcTransactionAmount` function aims to determine the maximum number of stock options one can buy given their available funds and the current stock price. It takes into account a 75% utilization rate of the available balance, calculates how many shares can be bought with that amount, and applies an arbitrary fee.

Here's the function definition:

```fsharp
let calcTransactionAmount amount (price:float) = 
    let readyToInvest = amount * 0.75
    let cnt = Math.Floor(readyToInvest / price)
    if (cnt < 1e-5) && (price < amount) then 1 else int(cnt)
```

:p How does the `calcTransactionAmount` function work?
??x
The function works by first calculating the maximum amount that can be invested based on a 75% utilization rate of the available balance. It then determines how many shares can be bought with this amount, accounting for the price per share and applying an arbitrary fee. If the calculated number of shares is too small (less than `1e-5`) or if the price exceeds the available balance, it returns 1 as a fallback.

```fsharp
let readyToInvest = amount * 0.75 // Calculate 75% of the available balance for investment
let cnt = Math.Floor(readyToInvest / price) // Determine how many shares can be bought
if (cnt < 1e-5) && (price < amount) then 
    1 // Return 1 as a fallback if conditions are not met
else 
    int(cnt) // Convert the calculated number of shares to an integer
```

x??

---


#### Parallel Composition and Applicative Functors
Background context explaining how applicative functors promote reusability and better compositionality. Discuss the use of `AsyncResult` for handling results that can be either successful or error-prone.

:p What is the role of `lift2` in applying functions to asynchronous operations?
??x
The `lift2` function is used to apply a two-parameter function (in this case, `calcTransactionAmount`) to two asynchronous computations (`getAmountOfMoney()` and `getCurrentPrice(stockId)`). This allows for running these computations concurrently without blocking the main thread. The result of applying `lift2` is then wrapped in an `AsyncResult`, which can handle both success and failure scenarios.

```fsharp
let howMuchToBuy stockId : AsyncResult<int> =
    Async.lift2 (calcTransactionAmount)
                (getAmountOfMoney())
                (getCurrentPrice stockId)
    |> AsyncResult.handler
```
x??

---


#### Asynchronous Operations with `Async.StartCancelable`
Background context explaining the use of asynchronous operations and how they are managed using continuations. Discuss the benefits of running computations asynchronously.

:p How does the `analyze` function start and manage an asynchronous computation?
??x
The `analyze` function starts a cancellable asynchronous operation by calling `Async.StartCancelable`. This allows the computation to run in parallel without blocking other operations. The continuation passed to `Async.StartCancelable` handles either the success (`Ok (total)`) or failure (`Error (e)`) of the async operation.

```fsharp
let analyze stockId =
    howMuchToBuy stockId
    |> Async.StartCancelable(function
        | Ok (total) -> printfn "I recommend to buy %d unit" total
        | Error (e) -> printfn "I do not recommend to buy now"
```
x??

---


#### Applicativity and Combinators in Asynchronous Programming
Background context explaining the use of combinators for composing asynchronous operations. Discuss how these combinators can be used to build complex workflows.

:p What is an example of a combinator that could emulate an `if-else` statement?
??x
An example of a combinator that emulates an `if-else` statement would involve combining the results of two or more async computations based on a condition. For instance, you could define a function like `asyncIfElse` that takes conditions and async operations to run depending on those conditions.

```fsharp
let asyncIfElse cond thenOp elseOp =
    if cond() then Async.StartChild(thenOp)
             else Async.StartChild(elseOp)

// Example usage:
let hasSufficientFunds : bool = true // Assume this is the result of some check

async {
    let! canBuy, buyAmount = asyncIfElse
                               (fun () -> hasSufficientFunds) 
                               (Async.lift2 calcTransactionAmount getAmountOfMoney)
                               (getCurrentPrice stockId)
    if canBuy then
        printfn "Buying %d units" buyAmount
    else
        printfn "Insufficient funds to buy"
}
```
x??

---


#### Reproducibility and Common Patterns in Code
Background context explaining how using common patterns like applicative functors can make code more understandable and maintainable. Discuss the importance of having consistent coding practices.

:p How does reusability enhance the development process when using combinators?
??x
Reusability enhances the development process by allowing developers to write reusable functions that encapsulate complex operations or workflows. By leveraging combinators like `lift2`, you can easily compose and reuse these building blocks without duplicating code, leading to cleaner and more maintainable applications.

For example:
- You can define a generic function for handling two async computations using `lift2`.
- This same function can be used across different parts of your application, reducing boilerplate code and making the logic easier to understand.
x??

---

---


#### Async Workflow Conditional Combinators Overview
This section introduces combinators for conditional asynchronous programming using F# async workflows. The combinators help to branch logic and manage conditions within an asynchronous context without leaving that context.

:p What are some of the conditional asynchronous combinators introduced?
??x
The introduced combinators include `ifAsync`, `iffAsync`, `notAsync`, `AND`, and `OR`. These allow for branching based on async predicates or conditions, making it easier to manage logic within an asynchronous workflow. 
```fsharp
module AsyncCombinators =
    let inline ifAsync (predicate:Async<bool>) (funcA:Async<'a>)  ➥ (funcB:Async<’a>) = 
        async.Bind(predicate, fun p -> if p then funcA else funcB)

    // Other combinators like iffAsync, notAsync, AND, OR are also defined similarly.
```
x??

---


#### ifAsync Combinator
The `ifAsync` combinator takes an asynchronous boolean predicate and two arbitrary async operations as arguments. Depending on the outcome of the predicate, only one of these computations will run.

:p How does the `ifAsync` combinator work?
??x
The `ifAsync` combinator works by using `async.Bind` to bind the predicate's result. If the predicate is true (`p = true`), it runs `funcA`; otherwise, it runs `funcB`. This pattern helps in branching logic within an async workflow.
```fsharp
let inline ifAsync (predicate:Async<bool>) (funcA:Async<'a>)  ➥ (funcB:Async<’a>) = 
    async.Bind(predicate, fun p -> if p then funcA else funcB)
```
x??

---


#### OR Combinator
The `OR` combinator takes two async boolean operations as arguments. It uses the `ifAsync` combinator to run both operations and return a true result if either is true.

:p What does the `OR` combinator do?
??x
The `OR` combinator evaluates two async booleans using `ifAsync`. If the first predicate returns false, it runs the second operation. Otherwise, it immediately returns true.
```fsharp
let inline OR (funcA:Async<bool>) (funcB:Async<bool>) = 
    ifAsync funcA (async.Return true) funcB

let (<&&>)(funcA:Async<bool>) (funcB:Async<bool>) = AND funcA funcB
let (<||>)(funcA:Async<bool>) (funcB:Async<bool>) = OR funcA funcB
```
x??

---

---


#### Inline Functions and Inlining Keyword
Inline functions replace function calls with the actual function body at compile time, aiming to reduce overhead from method calls. This can improve performance but increases code size as the function is duplicated at each call site.

:p What does the inline keyword do in programming?
??x
The `inline` keyword instructs the compiler to include the function's body directly where it is called, rather than creating a separate block of memory for the function. This reduces the overhead associated with function calls but can increase binary size if the function is large.
```csharp
// Example C# code
public class MyClass {
    // Inline hint to the compiler
    [MethodImpl(MethodImplOptions.AggressiveInlining)]
    public int MyFunction(int x) {
        return x * 2;
    }
}
```
x??

---


#### Asynchronous AND Combinator: Task.WhenAll
The `Task.WhenAll` operator is used to wait for multiple tasks to complete before proceeding. It returns a single task that will fire when all of the specified tasks are ready.

:p How does the asynchronous AND combinator using Task.WhenAll work?
??x
The asynchronous AND combinator with `Task.WhenAll` ensures both functions `funcA` and `funcB` complete before combining their results. If either evaluation is canceled, fails, or returns an incorrect result, the other function will not run due to short-circuit logic.

```csharp
// Example C# code for Task.WhenAll
var task1 = FuncAAsync();
var task2 = FuncBAsync();

await Task.WhenAll(task1, task2);
```
x??

---


#### Asynchronous OR Combinator: Task.WhenAny
The `Task.WhenAny` operator starts multiple tasks in parallel and waits only until the first one completes. This is useful for implementing speculative computations.

:p How does the asynchronous OR combinator using Task.WhenAny work?
??x
The asynchronous OR combinator with `Task.WhenAny` runs two asynchronous operations in parallel, but it stops waiting as soon as the first operation completes. It returns the result of the completed task and cancels or discards the other tasks.

```csharp
// Example C# code for Task.WhenAny
var task1 = FuncAAsync();
var task2 = FuncBAsync();

var completedTask = await Task.WhenAny(task1, task2);
```
x??

---


#### AsyncResult Conditional Combinators
`AsyncResult` combinators provide a way to perform logical AND and OR operations over asynchronous results. These combinators are particularly useful when dealing with generic types.

:p What is the purpose of the `AsyncResult` combinators?
??x
The `AsyncResult` combinators, such as `AND` and `OR`, allow for conditional dispatch over asynchronous operations. They are used to combine multiple `AsyncResult` results in a way that provides more flexibility than simple boolean logic.

```csharp
// Example C# code for AsyncResult Combinators
module AsyncResultCombinators =
    let AND (funcA:AsyncResult<'a>) (funcB:AsyncResult<'a>) : AsyncResult<_> = 
        asyncResult {
            let a = funcA
            let b = funcB
            return (a, b)
        }

    let OR (funcA:AsyncResult<'a>) (funcB:AsyncResult<'a>) : AsyncResult<'a> =
        asyncResult {
            return! funcA
            return! funcB
        }
```
x??

---

---

