# High-Quality Flashcards: Pro-ASPNET-Core-7_processed (Part 33)


**Starting Chapter:** 12.4.1 Defining middleware using a class

---


---
#### Custom Middleware Explanation
Custom middleware can be defined using lambda functions or classes. Lambda functions are convenient but may lead to long and complex statements, making it hard to reuse across projects. Classes provide a way to keep middleware code organized outside of `Program.cs`.

Lambda function example:
```csharp
app.Use(async (context, next) => {
    if (context.Request.Method == HttpMethods.Get && context.Request.Query["custom"] == "true") {
        context.Response.ContentType = "text/plain";
        await context.Response.WriteAsync("Custom Middleware ");
    }
    await next();
});
```

Class-based middleware example:
```csharp
public class QueryStringMiddleWare {
    private RequestDelegate next;
    public QueryStringMiddleWare(RequestDelegate nextDelegate) {
        next = nextDelegate;
    }

    public async Task Invoke(HttpContext context) {
        if (context.Request.Method == HttpMethods.Get && context.Request.Query["custom"] == "true") {
            if (!context.Response.HasStarted) { // Fix: Change .context to context
                context.Response.ContentType = "text/plain";
            }
            await context.Response.WriteAsync("Class Middleware ");
        }
        await next(context);
    }
}
```

:p How does class-based middleware differ from lambda function middleware in ASP.NET Core?
??x
Class-based middleware differs by receiving a `RequestDelegate` object as a constructor parameter, allowing requests to be forwarded asynchronously. The `Invoke` method processes incoming requests and can conditionally execute custom logic before passing the request to the next middleware component.

Code example:
```csharp
public class QueryStringMiddleWare {
    private RequestDelegate next;
    public QueryStringMiddleWare(RequestDelegate nextDelegate) {
        next = nextDelegate;
    }

    public async Task Invoke(HttpContext context) {
        if (context.Request.Method == HttpMethods.Get && context.Request.Query["custom"] == "true") {
            if (!context.Response.HasStarted) { // Fix: Change .context to context
                context.Response.ContentType = "text/plain";
            }
            await context.Response.WriteAsync("Class Middleware ");
        }
        await next(context);
    }
}
```
x??

---


#### Adding Class-Based Middleware
To add class-based middleware, use the `UseMiddleware<T>` method in `Program.cs`, where `T` is the type of your middleware class. This method allows you to integrate custom logic outside the main entry point of the application.

:p How do you add a class-based middleware component to the ASP.NET Core pipeline?
??x
You add a class-based middleware component by using the `UseMiddleware<T>` method in `Program.cs`, where `T` is the type of your middleware class. This integration keeps the custom logic separate from the main entry point, making it reusable across different projects.

Example:
```csharp
app.UseMiddleware<Platform.QueryStringMiddleWare>();
```

x??

---


#### Thread-Safety Considerations for Middleware
Since a single middleware object handles all requests in ASP.NET Core, any code within its `Invoke` method must be thread-safe. This is crucial because multiple requests can be processed concurrently.

:p Why is the `Invoke` method of class-based middleware important?
??x The `Invoke` method of class-based middleware is critical because it is called by ASP.NET Core for each incoming request. Since a single middleware instance handles all requests, the code within this method must ensure thread safety to avoid race conditions and other concurrency issues.

Example:
```csharp
public async Task Invoke(HttpContext context) {
    if (context.Request.Method == HttpMethods.Get && context.Request.Query["custom"] == "true") {
        if (!context.Response.HasStarted) { // Fix: Change .context to context
            context.Response.ContentType = "text/plain";
        }
        await context.Response.WriteAsync("Class Middleware ");
    }
    await next(context);
}
```

x??

---

---


---
#### Class-Based Middleware Component
Class-based middleware components allow developers to define custom logic for handling HTTP requests and responses. These components can be created as classes and registered within the application pipeline using `app.UseMiddleware<ClassName>()`.
:p What is a class-based middleware component used for in ASP.NET Core?
??x
A class-based middleware component is used to add custom functionality to an ASP.NET Core application by modifying or handling HTTP requests and responses. It can be implemented as a class that defines the middleware logic, which is then registered with the application pipeline using `app.UseMiddleware<ClassName>()`.
```csharp
public class PlatformQueryStringMiddleWare : IApplicationBuilder
{
    public void Use(IApplicationBuilder next)
    {
        // Middleware logic here
    }
}
```
x??

---


#### Modifying Response in Return Path
Middleware components can modify the HTTP response after it has passed through other middleware or route handlers. This is achieved by calling `await context.Response.WriteAsync()` to add content to the response body.
:p How does a middleware component modify the HTTP response after processing?
??x
A middleware component modifies the HTTP response after processing by using `await context.Response.WriteAsync()` within its logic. This allows it to write additional content to the response before or after other middleware or route handlers have had their chance to process the request.
```csharp
app.Use(async (context, next) =>
{
    await next();
    if (context.Request.Method == HttpMethods.Get && context.Request.Query["custom"] == "true")
    {
        context.Response.ContentType = "text/plain";
        await context.Response.WriteAsync("Custom Middleware");
    }
    await next();
});
```
x??

---


#### Short-Circuiting the Request Pipeline
Components can choose not to pass the request further along the pipeline by not calling the `next()` function. This is known as short-circuiting and can be used to handle complete responses without further processing.
:p What does it mean for a middleware component to "short-circuit" the pipeline?
??x
Short-circuiting means that a middleware component handles a request completely within itself and does not pass the request along to subsequent components in the pipeline. This is achieved by not calling `next()`, which prevents further processing of the request.
```csharp
app.Use(async (context, next) =>
{
    if (context.Request.Path == "/short")
    {
        await context.Response.WriteAsync("Request Short Circuited");
    }
    else
    {
        await next();
    }
});
```
x??
---

---


---
#### Map Method for Creating Pipeline Branches
Background context: The `Map` method is used to create a section of middleware that processes specific URLs, enabling developers to define different sequences of middleware components based on URL patterns. This can be useful for handling requests differently depending on their paths.

:p How does the `Map` method work in creating pipeline branches?
??x
The `Map` method takes two arguments: 
1. A string representing a URL pattern.
2. An action delegate that configures a branch of middleware components to process matching URLs.

This creates a separate sequence of middleware, allowing for custom handling of specific URL paths while keeping them distinct from the main pipeline flow.

Example in C#:
```csharp
app.Map("/branch", branch => {
    branch.UseMiddleware<Platform.QueryStringMiddleWare>();
    branch.Use(async (HttpContext context, Func<Task> next) => 
    { 
        await context.Response.WriteAsync("Branch Middleware"); 
    });
});
```
x??

---


#### Branching the Request Pipeline with `MapWhen`
Background context: The `MapWhen` method allows for more flexible matching of requests based on a predicate function. This is useful when you need to route requests to different parts of the pipeline not just by URL but by other criteria as well.

:p What does the `MapWhen` method do in ASP.NET Core?
??x
The `MapWhen` method takes two arguments:
1. A predicate function that receives an `HttpContext`.
2. A function that receives an `IApplicationBuilder` object representing the pipeline branch.
This allows for routing requests based on conditions other than just URL patterns, providing a more flexible way to handle different types of requests.

Example in C#:
```csharp
app.MapWhen(ctx => ctx.Request.Path.StartsWithSegments("/special"), appBuilder =>
{
    appBuilder.UseMiddleware<Platform.QueryStringMiddleWare>();
    appBuilder.Use(async (HttpContext context, Func<Task> next) => 
    { 
        await context.Response.WriteAsync("Special Branch Middleware"); 
    });
});
```
x??

---


#### Handling Requests in Different Pipeline Paths
Background context: The `Map` method can be used to create branches within the request pipeline for specific URL patterns. These branches can have their own sequence of middleware, allowing for custom handling based on different paths.

:p How do requests flow through a pipeline with branches created using `Map`?
??x
When a URL matches the pattern specified in the `Map` method, it follows the corresponding branch of middleware components defined within that map. The final component in the branch may or may not invoke the next delegate, which can result in different parts of the pipeline being executed based on the request path.

Example in C#:
```csharp
app.Map("/branch", branch => {
    branch.UseMiddleware<Platform.QueryStringMiddleWare>();
    branch.Use(async (HttpContext context, Func<Task> next) => 
    { 
        await context.Response.WriteAsync("Branch Middleware"); 
    });
});
```
In this example, requests to `/branch` will pass through `QueryStringMiddleWare` and an additional middleware that writes "Branch Middleware" to the response. Requests to other paths follow the main pipeline.

x??

---

---

