# High-Quality Flashcards: ConcurrencyNetModern_processed (Part 23)


**Starting Chapter:** 9.3.4 Mapping asynchronous operation the Async.map functor

---


#### AsyncRetryBuilder and Retry Logic
Background context: The AsyncRetryBuilder is a custom computation expression that extends F# to handle retries for asynchronous operations. It allows retrying an operation up to three times with a delay of 250 milliseconds between each attempt.

:p What does the `retry` computation expression do in the provided code snippet?
??x
The `retry` computation expression retries the inner async operation (in this case, `getCloudBlobContainerAsync`) up to three times if an exception occurs. Each retry is delayed by 250 milliseconds.
```fsharp
let container = retry {
    return getCloudBlobContainerAsync()
}
```
x??

---


#### Global Computation Expression for Asynchronous Operations
Background context: A global value identifier can be created for a computation expression to reuse it in different parts of the program. This is useful when the same async workflow or sequence needs to be executed multiple times.

:p How does creating a global computation expression benefit the program?
??x
Creating a global computation expression benefits the program by allowing you to define and use complex asynchronous workflows once, and then reuse them throughout the code without having to redefine them. This promotes code reuse and reduces redundancy.
```fsharp
// Example of defining a global async workflow
let downloadMediaCompAsync (blobNameSource: string) (fileNameDestination: string) = async {
    // Code implementation here
}
```
x??

---


#### Extending the Asynchronous Workflow to Support Task Types
Background context: The F# asynchronous computation expression can be extended to work with `Task` types, which are common in .NET but not natively supported by the default F# async workflow.

:p How does extending the F# asynchronous workflow help handle `Task` operations?
??x
Extending the F# asynchronous workflow helps handle `Task` operations by allowing you to use them seamlessly within an async workflow. This is achieved through methods like `Async.AwaitTask`, which wraps a `Task` and converts it into an `async` computation.

```fsharp
// Example of extending the async workflow to support Task types
let getCloudBlobContainerAsync() : Async<CloudBlobContainer> = async {
    let storageAccount = CloudStorageAccount.Parse(azureConnection)
    let blobClient = storageAccount.CreateCloudBlobClient()
    let container = blobClient.GetContainerReference("media")
    let _ = container.CreateIfNotExistsAsync() |> Async.AwaitTask
    return container
}
```
x??

---


#### Mapping Asynchronous Operations with `Async.map`
Background context: The `Async.map` function allows you to map a function over an asynchronous computation, applying the function only after the async operation completes.

:p How does `Async.map` work in mapping over an asynchronous operation?
??x
`Async.map` works by taking a function and an `async<'a>` computation as arguments. It runs the `async<'a>` computation, unwraps its result, applies the given function to it, and then wraps the resulting value back into an `async<'b>`. This way, you can transform the result of an async operation without leaving the asynchronous context.

```fsharp
// Example usage of Async.map
let downloadBitmapAsync (blobNameSource: string) = async {
    let token = Async.CancellationToken
    let container = getCloudBlobContainerAsync()
    let blockBlob = container.GetBlockBlobReference(blobNameSource)
    use (blobStream : Stream) = blockBlob.OpenReadAsync() |> Async.AwaitTask
    return Bitmap.FromStream(blobStream)
}

let transformImage (blobNameSource: string) =
    downloadBitmapAsync blobNameSource 
    |> Async.map ImageHelpers.setGrayscale
    |> Async.map ImageHelpers.createThumbnail
```
x??

---

---


#### Asynchronous Functional Programming in F#
Background context: This section discusses asynchronous functional programming, focusing on using `Async.map` and `Async.Parallel` for efficient parallel execution of operations. These functions are part of F#'s powerful asynchrony support to handle I/O-bound tasks without blocking the main thread.
:p What is the purpose of using `Async.map` in this context?
??x
`Async.map` applies a function to the result of an asynchronous workflow, allowing for continued encapsulation and composability. It returns another asynchronous workflow that will map over the result when completed.
```fsharp
let transformAndSaveImage (container:CloudBlobContainer) (blobMedia:IListBlobItem) = 
    downloadMediaCompAsync container blobMedia 
        |> Async.map ImageHelpers.setGrayscale 
        |> Async.map ImageHelpers.createThumbnail 
        |> Async.tap (fun image -> 
            let mediaName = 
                blobMedia.Uri.Segments.[blobMedia.Uri.Segments.Length - 1] 
            image.Save(mediaName))
```
x??

---


#### Parallel Execution with `Async.Parallel`
Background context: The `Async.Parallel` function in F# allows for efficient parallel execution of multiple asynchronous computations. It leverages the scalability properties of the .NET thread pool and controlled overlapping by modern operating systems to maximize resource utilization.
:p How does `Async.Parallel` work, and what are its benefits?
??x
`Async.Parallel` takes a collection of asynchronous workflows and runs them in parallel, waiting for all of them to complete. It uses a Fork/Join pattern with the thread pool scheduler to coordinate tasks, ensuring efficient resource use.
```fsharp
let downloadMediaCompAsyncParallel() = 
    retry { 
        let! container = getCloudBlobContainerAsync()
        let computations = 
            container.ListBlobs() |> Seq.map (fun blob -> transformAndSaveImage container blob)
        return Async.Parallel computations 
    }
```
x??

---


#### Composing Asynchronous Workflows
Background context: This example demonstrates how to build and compose asynchronous workflows in F# for efficient image processing tasks. The `downloadMediaCompAsync` function handles downloading and processing images, while `transformAndSaveImage` applies transformations.
:p What is the role of the `transformAndSaveImage` function?
??x
The `transformAndSaveImage` function composes several asynchronous operations to download a blob, convert it to an image, apply transformations (grayscale, thumbnail creation), and save the result. It uses `Async.map` for each transformation step.
```fsharp
let transformAndSaveImage (container:CloudBlobContainer) (blobMedia:IListBlobItem) = 
    downloadMediaCompAsync container blobMedia 
        |> Async.map ImageHelpers.setGrayscale 
        |> Async.map ImageHelpers.createThumbnail 
        |> Async.tap (fun image -> 
            let mediaName = 
                blobMedia.Uri.Segments.[blobMedia.Uri.Segments.Length - 1] 
            image.Save(mediaName))
```
x??

---


#### Retrying Asynchronous Operations
Background context: The `retry` computation builder in F# is used to handle retries of asynchronous operations, ensuring robustness and fault tolerance.
:p What does the `RetryAsyncBuilder` do?
??x
The `RetryAsyncBuilder` handles retrying of asynchronous operations with a specified number of attempts and delay between retries. It ensures that if an operation fails, it will be retried up to a certain point, providing resilience in the system.
```fsharp
let retry = RetryAsyncBuilder(3, 250)
```
x??

---


#### Side Effects with `Async.tap`
Background context: The `Async.tap` function is used to apply side effects (like saving images) without affecting the result of an asynchronous workflow. It's useful for logging or performing actions after computations complete.
:p What is the role of `Async.tap` in this scenario?
??x
`Async.tap` applies a side effect to its input and discards the result, ensuring that it doesn't affect the overall computation flow but allows for additional actions like saving images post-processing.
```fsharp
|> Async.tap (fun image -> 
    let mediaName = 
        blobMedia.Uri.Segments.[blobMedia.Uri.Segments.Length - 1] 
    image.Save(mediaName))
```
x??

---

---


#### Async.tap Operator Implementation
Background context: The `Async.tap` operator is a utility function that applies an asynchronous transformation to a value without waiting for its result. This operator is particularly useful when you want to perform side effects (like logging) after starting some asynchronous computation, but don't need the results of those computations.

:p What does the implementation of the `Async.tap` operator look like?
??x
The implementation of the `Async.tap` operator using F# Async workflow:

```fsharp
let inline tap (fn:'a -> 'b) (x:Async<'a>) =
    (Async.map fn x) |> Async.Ignore |> Async.Start; x
```

Explanation: This function takes a transformation function `fn` and an asynchronous value `x`. It applies the function to the asynchronous computation using `Async.map`, ignores the result with `Async.Ignore`, starts the computation with `Async.Start`, and then returns the original asynchronous value.

The key parts are:
- **Async.map fn x**: Applies the function `fn` to the result of `x`.
- **Async.Ignore**: Ignores the result of the mapped operation.
- **Async.Start**: Starts the computation asynchronously without blocking the current thread.

This operator is useful for adding side effects (like logging) in an asynchronous workflow.
x??

---


#### Async.Parallel Function
Background context: The `Async.Parallel` function allows you to run multiple asynchronous computations concurrently and wait until all of them complete. It aggregates the results into a single array, which can then be iterated over.

:p What does the `Async.Parallel` function do?
??x
The `Async.Parallel` function runs an array of asynchronous computations in parallel and waits for all to complete before returning their results as an array.

Example usage:

```fsharp
let tasks = [| downloadImage1; downloadImage2; downloadImage3 |]
let results = Async.Parallel tasks |> Async.RunSynchronously
```

Here, `downloadImage1`, `downloadImage2`, and `downloadImage3` are asynchronous computations. The `Async.Parallel` function runs these tasks concurrently, and once all of them complete, it returns an array of their results.

:p What is the performance gain observed when using `Async.Parallel` for downloading images?
??x
The performance gain observed was approximately 5 seconds faster than Asynchronous Programming Model (APM), making it about 8 times faster than the original synchronous implementation. This improvement in execution time highlights the efficiency of parallel computation in F#.

:p How does the Async.StartCancelable function work?
??x
The `Async.StartCancelable` function starts an asynchronous workflow without blocking the current thread and provides a cancellation token that can be used to stop the computation if needed. It returns an `IDisposable` object that, when disposed, cancels the workflow.

Example usage:

```fsharp
let cancellationTokenSource = new CancellationTokenSource()
let asyncComputation: Async<_> = downloadImageAsync

async {
    try
        do! Async.StartCancelable(asyncComputation, cancellationTokenSource.Token)
        // Code to handle results after computation completes
    with exn ->
        printfn "Exception occurred: %s" exn.Message
}

// Later in the code...
cancellationTokenSource.Cancel()
```

In this example:
- `Async.StartCancelable` starts the asynchronous computation and waits for it to complete.
- The `IDisposable` token from `CancellationTokenSource` can be used to cancel the ongoing computation if needed.

:p What is the difference between F# Async workflow and C# async/await?
??x
In F#, an asynchronous function using the `Async<'a>` return type represents a computation that will materialize only with an explicit request. This allows for modeling and composing multiple asynchronous functions conditionally on demand, providing a more flexible approach compared to C#'s `async/await` model.

Key differences:
- **F# Async**: Non-blocking computations are only executed when requested.
- **C# async/await**: Asynchronous operations start execution immediately upon being called.

The F# approach is particularly useful for complex workflows where you want to control the order of asynchronous operations and handle results conditionally, while C#'s model starts executing as soon as it's called, which can lead to less flexibility in some scenarios.
x??

---

---


---
#### Async.StartCancelable
Background context explaining that `Async.StartCancelable` is a method to start an asynchronous operation with support for cancellation, which is different from `Async.Start`. It uses `Async.StartWithContinuations` internally.

:p What does `Async.StartCancelable` do and how does it differ from `Async.Start`?
??x
`Async.StartCancelable` starts an asynchronous operation that can be canceled. Unlike `Async.Start`, which does not support cancellation by default, `Async.StartCancelable` allows for a function to be triggered when the operation is canceled.

The underlying implementation uses `Async.StartWithContinuations` and provides built-in support for handling cancellation.
```fsharp
type Microsoft.FSharp.Control.Async with 
    static member StartCancelable(op: Async<'a>) (tap:'a -> unit)(?onCancel) =
        let ct = new System.Threading.CancellationTokenSource()
        let onCancel = defaultArg onCancel ignore
        Async.StartWithContinuations(op, tap, ignore, onCancel, ct.Token)
        { new IDisposable with 
            member x.Dispose() = ct.Cancel()}
```
x??

---


#### Async.StartWithContinuations
Background context explaining that `Async.StartWithContinuations` is a powerful operator for starting an asynchronous workflow and handling its completion in multiple ways. It allows specifying handlers for the result, exception, or cancellation.

:p What does `Async.StartWithContinuations` do?
??x
`Async.StartWithContinuations` starts an asynchronous operation on the current OS thread and handles its completion by invoking specified functions based on the outcome: success, failure (exception), or cancellation. The function can be associated with a specific `SynchronizationContext`, which is useful for updating UI elements.

The operator's signature is:
```fsharp
Async<'T> -> ('T -> unit) * (exn -> unit) * (OperationCanceledException -> unit) -> unit
```
Example usage in F#:
```fsharp
let computation() = 
    async {
        use client = new WebClient()
        let! manningSite = client.AsyncDownloadString(Uri("http://www.manning.com"))
        return manningSite
    }
Async.StartWithContinuations(computation(),
                             (fun site -> printfn "Size %d" site.Length),
                             (fun exn -> printfn "exception-%d" <| exn.ToString()),
                             (fun exn -> printfn "cancell-%d" <| exn.ToString()))
```
x??

---


#### Async.Ignore
Background context explaining that `Async.Ignore` is a method used to ignore the result of an asynchronous operation, effectively returning unit (`()`) once the computation completes.

:p What does `Async.Ignore` do?
??x
`Async.Ignore` takes an asynchronous workflow and starts it while ignoring its final result. This is useful when you want to run some background task but don't need to use or check its output.

The operator's signature is:
```fsharp
Async< 'T> -> Async<unit>
```
Example usage in F#:
```fsharp
let asyncIgnore = Async.Ignore >> Async.Start

// Direct usage example
async {
    // Some asynchronous computation
    do! Async.Sleep 1000
}.Start() |> ignore
```
x??

---

---


#### Async.Start and Asynchronous Computation Expressions
Background context explaining that `Async.Start` is used to start an asynchronous workflow without returning a value. It queues the computation for execution in the thread pool and returns control immediately, allowing other tasks to run while this one runs asynchronously.

:p How does `Async.Start` work?
??x
`Async.Start` takes an asynchronous computation of type `Async<unit>` (which means it doesn't return any value) and starts executing it without blocking the current thread. This is useful for performing background operations where you don’t need to wait for a result.

```fsharp
let computationUnit() = 
    async {
        do! Async.Sleep 1000
        use client = new WebClient()
        let! manningSite = client.AsyncDownloadString(Uri("http://www.manning.com"))
        printfn "Size %d" manningSite.Length
    }
Async.Start(computationUnit())
```

x??

---


#### Asynchronous Workflow Cancellation Support
Background context explaining the importance of cancellation in long-running, non-blocking operations. The F# asynchronous workflow supports cancellation natively and allows you to cancel a workflow and all its child computations.

:p How does F# support cancellation in asynchronous workflows?
??x
F# provides built-in mechanisms for cancelling asynchronous workflows through `Async.StartWithContinuations`, passing a `CancellationToken`, or using the default token. When a cancellation is requested, it will terminate the current computation and any nested operations automatically.

```fsharp
let tokenSource = new CancellationTokenSource()
let container = getCloudBlobContainer()

let parallelComp() =
    container.ListBlobs()
    |> Seq.map(fun blob -> downloadMediaCompAsync container blob)
    |> Async.Parallel

Async.Start(parallelComp() |> Async.Ignore, tokenSource.Token)

// To cancel the operation
tokenSource.Cancel()
```

x??

---


#### Async.TryCancelled and Composable Cancellation
Background context explaining that `Async.TryCancelled` allows you to handle cancellations with custom behavior and still return a value. It’s useful for adding extra code when an asynchronous operation is cancelled.

:p How does `Async.TryCancelled` work?
??x
`Async.TryCancelled` wraps an asynchronous computation, allowing it to execute with the possibility of being cancelled. When cancellation occurs, a specified function is called, providing an opportunity to perform cleanup or other necessary actions. It returns a value, making it composable.

```fsharp
let onCancelled = fun (cnl: OperationCanceledException) -> 
    printfn "Operation cancelled."

let tokenSource = new CancellationTokenSource()

let tryCancel = Async.TryCancelled(parallelComp(), onCancelled)
Async.Start(tryCancel, tokenSource.Token)

// To cancel the operation
tokenSource.Cancel()
```

x??

---

