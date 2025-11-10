# High-Quality Flashcards: Pro-ASPNET-Core-7_processed (Part 34)


**Starting Chapter:** 12.4.5 Creating terminal middleware

---


---
#### Using `MapWhen` Middleware
Background context: The `MapWhen` middleware method allows you to branch the request pipeline based on certain conditions. This is useful for routing requests differently depending on specific query parameters or other factors.

:p What does the `app.MapWhen` method do, and how is it used in the example provided?
??x
The `app.MapWhen` method branches the request pipeline when a specified predicate function returns true. In the example, the middleware checks if the query string contains a key named "branch". If it does, certain middleware components are added to handle those requests.

Example code:
```csharp
app.MapWhen(context => context.Request.Query.Keys.Contains("branch"), 
    branch => {
        // Add middleware components here...
});
```
x??

---


#### Creating Terminal Middleware with `Run` Method
Background context: Terminal middleware is a type of middleware that does not forward requests to other components and always marks the end of the request pipeline. The `Run` method in ASP.NET Core simplifies creating terminal middleware by directly writing content to the response without calling the next middleware.

:p How does the `Run` method facilitate the creation of terminal middleware?
??x
The `Run` method is a convenience feature that allows you to write terminal middleware by immediately responding to the request and ending the pipeline. When using `Run`, no further middleware processing occurs for the request. This is demonstrated in Listing 12.12 where a simple message "Branch Middleware" is written directly to the response.

Example code:
```csharp
app.Use(async (context, next) => {
    await context.Response.WriteAsync("Branch Middleware");
});
```
This snippet uses `Use` with an async lambda that writes the string "Branch Middleware" to the response and then ends processing by not calling `next`.

x??

---


#### Applying Terminal Middleware Using `Run` Method
Background context: In ASP.NET Core, terminal middleware components end the request pipeline without forwarding requests. The `Run` method is used in these cases to ensure that no further middleware processes are called.

:p How does the `Run` method differ from using `Use` for creating a middleware component?
??x
The `Run` method is specifically designed for terminal middleware, meaning it ends the processing of the request pipeline and does not invoke any subsequent middleware. In contrast, `Use` can be used to add both regular and terminal middleware; if you want to ensure no further middleware runs after your current handler, use `Run`.

Example code:
```csharp
app.Use(async (context) => {
    await context.Response.WriteAsync("Branch Middleware");
});
```
This uses `Use` without calling the next function, making it a terminal component. However, if you want to make it explicit that this is a terminal handler, use `Run` instead.

x??

---


#### Adding Terminal Support in Class-based Middleware
Background context: Class-based components can be designed to work as both regular and terminal middleware by handling the `nextDelegate` parameter appropriately. When this parameter is provided (non-null), the component behaves like regular middleware; otherwise, it acts as a terminal component.

:p How does a class-based component handle the `nextDelegate` parameter to determine whether it should act as terminal or regular middleware?
??x
A class-based component can be designed to accept an optional `nextDelegate` parameter. If this parameter is null (indicating no further middleware), the component acts as a terminal component by directly responding to the request without calling the next function. Otherwise, it behaves like regular middleware by invoking the `nextDelegate`.

Example code:
```csharp
public class QueryStringMiddleWare {
    private RequestDelegate? next;
    
    public QueryStringMiddleWare() { }
    public QueryStringMiddleWare(RequestDelegate nextDelegate) {
        next = nextDelegate;
    }

    public async Task Invoke(HttpContext context) {
        if (context.Request.Method == HttpMethods.Get && context.Request.Query["custom"] == "true") {
            if (context.Response.HasStarted) {
                context.Response.ContentType = "text/plain";
            }
            await context.Response.WriteAsync("Class Middleware");
        }
        
        if (next != null) {
            await next(context);
        }
    }
}
```
This class has two constructors and an `Invoke` method. The first constructor initializes the component without setting up a next delegate, making it suitable for terminal use cases. The second constructor sets the `nextDelegate`, allowing it to be used as regular middleware.

x??

---


#### Understanding the ASP.NET Core Platform
Background context: The provided text discusses how to configure and use middleware in an ASP.NET Core application. Middleware is a powerful feature that allows developers to intercept HTTP requests before they reach their destination and modify responses before they are sent back.

:p What is the `UseMiddleware` method used for?
??x
The `UseMiddleware` method is used to register middleware components with an ASP.NET Core pipeline. This method allows you to insert custom middleware into your application's request-response cycle, enabling functionalities like authentication, logging, and query string handling before they reach the final handler.

```csharp
app.UseMiddleware<Platform.QueryStringMiddleWare>();
```
x??

---


#### Configuring Middleware with the Options Pattern
Background context: The text explains that some built-in ASP.NET Core middleware components utilize the options pattern, which allows for configurable settings via a class. This is demonstrated using the `MessageOptions` class to configure custom middleware.

:p How does the `Configure` method work in the context of configuring middleware?
??x
The `Configure` method from `WebApplicationBuilder` is used to set up configuration options for middleware components. It takes a generic type parameter and allows you to define how these options should be configured when the application starts.

```csharp
builder.Services.Configure<MessageOptions>(options =>
{
    options.CityName = "Albany";
});
```
This statement creates an instance of `MessageOptions` and sets its properties, which can then be accessed within middleware functions.

x??

---


#### Accessing Configuration Options in Middleware
Background context: The provided code snippet shows how to access configuration options from a middleware component using the `IOptions<T>` interface. This allows for dynamic configuration based on application settings.

:p How do you use the `IOptions` interface to access configuration options?
??x
To use the `IOptions` interface, you define it as a parameter in your request-handling function. The `Value` property of `IOptions<MessageOptions>` provides access to the configured options.

```csharp
app.MapGet("/location", async (HttpContext context, IOptions<MessageOptions> msgOpts) =>
{
    Platform.MessageOptions opts = msgOpts.Value;
    await context.Response.WriteAsync($"{opts.CityName}, {opts.CountryName}");
});
```
x??

---

---


#### Dependency Injection in ASP.NET Core Middleware
Dependency injection is a design pattern used to supply dependencies to classes or components at runtime, rather than having them hard-coded. In ASP.NET Core, this allows for more flexible and testable code by injecting configuration options or services directly into middleware components.

In the provided example, `IOptions<MessageOptions>` is used as a parameter in the middleware constructor to inject the required configuration.
:p How does dependency injection work with middleware in ASP.NET Core?
??x
Dependency injection in ASP.NET Core works through the service collection (which can be accessed via `builder.Services`). When you configure services using `ConfigureServices` or `Services.Configure`, these configurations are then injected into your components when they are created. For instance, by configuring `MessageOptions` and injecting it as an `IOptions<MessageOptions>` parameter in a middleware constructor, the middleware can access its configuration settings.

This injection is facilitated by ASP.NET Core’s dependency injection container, which resolves the dependencies at runtime.
```csharp
// Example of configuring services
builder.Services.Configure<MessageOptions>(options => {
    options.CityName = "Albany";
});
```
x??

---


#### Using Options Pattern with Lambda Middleware
The `IOptions<T>` pattern in ASP.NET Core allows you to inject configuration settings into your components. This is particularly useful when working with middleware, as it enables you to easily configure and use the settings defined in your application's configuration.

In the example given, a lambda function is used for middleware. The `IOptions<MessageOptions>` interface is passed as an argument to the lambda function, allowing the middleware to access its configuration options.
:p How can you use the options pattern with lambda-based middleware in ASP.NET Core?
??x
Using the options pattern with lambda-based middleware involves defining a lambda function that accepts `IOptions<T>` as one of its parameters. This allows the middleware to access and use configuration settings defined for the type `T`. In the provided example, the lambda function used for middleware is modified to accept `IOptions<MessageOptions>`, which then provides the configuration options needed by the middleware.

Here's a simplified version of how it works:
```csharp
app.MapGet("/location", async (HttpContext context, IOptions<MessageOptions> msgOpts) => {
    MessageOptions opts = msgOpts.Value;
    await context.Response.WriteAsync($"{opts.CityName}, " + opts.CountryName);
});
```
x??

---


#### Using Options Pattern with Class-Based Middleware
The options pattern can also be applied to class-based middleware components. This is achieved by injecting `IOptions<T>` into the constructor of the middleware class, which allows access to configuration settings.

In the example provided, a new class called `LocationMiddleware` is defined and configured using dependency injection.
:p How does one implement the options pattern in class-based middleware?
??x
To implement the options pattern in class-based middleware, you define a class that accepts `IOptions<T>` as a constructor parameter. This allows the class to access configuration settings defined for type `T`. In the example, `LocationMiddleware` is created with an `Invoke` method that checks if the request path matches "/location" and then uses the injected `MessageOptions` object to write the response.

Here's how you define the `LocationMiddleware`:
```csharp
using Microsoft.Extensions.Options;

namespace Platform {
    public class LocationMiddleware {
        private RequestDelegate next;
        private MessageOptions options;

        public LocationMiddleware(RequestDelegate nextDelegate, IOptions<MessageOptions> opts) {
            next = nextDelegate;
            options = opts.Value;
        }

        public async Task Invoke(HttpContext context) {
            if (context.Request.Path == "/location") {
                await context.Response.WriteAsync($"{options.CityName}, " + options.CountryName);
            } else {
                await next(context);
            }
        }
    }
}
```
x??

---


#### Configuring the Middleware with Dependency Injection
Configuring middleware in ASP.NET Core using dependency injection involves setting up services and then using `UseMiddleware` or `Use` to integrate the middleware into the request pipeline. The configuration is often done through a setup like `ConfigureServices`, where you define how your services should be configured.

In the example, the `MessageOptions` settings are defined in `CreateBuilder` and then used by the `LocationMiddleware`.
:p How do you configure class-based middleware using dependency injection in ASP.NET Core?
??x
Configuring class-based middleware with dependency injection in ASP.NET Core involves setting up services in the `ConfigureServices` method. You use `builder.Services.Configure<T>(action)` to define how your options should be configured and then integrate this middleware into the request pipeline with `UseMiddleware`.

Here's an example of how you configure and use `LocationMiddleware`:
```csharp
var builder = WebApplication.CreateBuilder(args);

// Configure MessageOptions
builder.Services.Configure<MessageOptions>(options => {
    options.CityName = "Albany";
});

var app = builder.Build();

app.UseMiddleware<LocationMiddleware>();
app.MapGet("/", () => "Hello World.");
app.Run();
```
x??

---


#### Testing Middleware with Configuration
Testing middleware that uses configuration settings involves ensuring the middleware correctly reads and processes the configured values. This is typically done by making requests to your application and verifying the output matches the expected behavior based on the configuration.

In the example, after configuring `MessageOptions` for the city name "Albany", a request to `/location` produces the expected response.
:p How do you test middleware that uses configuration settings?
??x
Testing middleware with configuration settings involves making sure the middleware correctly interprets and utilizes the configured values. This can be done by running your application, making HTTP requests, and checking if the responses match the expected behavior based on the configurations.

For example, after setting up `MessageOptions` to have `CityName = "Albany"`, you would test this by requesting `http://localhost:5000/location`. The response should be:
```
Albany,
```

This verifies that the middleware is correctly using the configuration settings.
x??

---

