# High-Quality Flashcards: Pro-ASPNET-Core-7_processed (Part 44)


**Starting Chapter:** 15.3 Using the logging service. 15.3.1 Generating logging messages

---


#### Logging Service in ASP.NET Core
Background context: The logging service in ASP.NET Core helps record messages that describe the state of the application, aiding in tracking errors, monitoring performance, and diagnosing problems. Log providers forward these messages to various destinations where they can be processed.

:p What is the purpose of the logging service in ASP.NET Core?
??x
The logging service in ASP.NET Core allows developers to generate and manage log messages that help track the application's state, troubleshoot issues, and monitor performance. It uses different log providers (e.g., console, debug, EventSource) to forward these messages.

Example code:
```csharp
namespace Platform {
    public class Population {
        public static async Task Endpoint(HttpContext context, ILogger<Population> logger) {
            logger.LogDebug("Started processing for {path}", context.Request.Path);
            // Code to process request and generate log messages...
            logger.LogDebug("Finished processing for {path}", context.Request.Path);
        }
    }
}
```
x??

---


#### Generating Logging Messages
Background context: This section explains how to generate logging messages in an ASP.NET Core application using the `ILogger<T>` service. The method signatures of the `Log` methods allow developers to create log messages at different severity levels (Trace, Debug, Information, Warning, Error, Critical).

:p How do you generate logging messages in an ASP.NET Core application?
??x
You can generate logging messages by injecting an `ILogger<YourType>` into your class and using its extension methods. The following example demonstrates generating debug-level log messages:

Example code:
```csharp
using Microsoft.Extensions.Logging;

public static async Task Endpoint(HttpContext context, ILogger<Population> logger) {
    logger.LogDebug("Started processing for {path}", context.Request.Path);
    // Code to process request...
    logger.LogDebug("Finished processing for {path}", context.Request.Path);
}
```
x??

---


#### Logging in the Program.cs File
Background context: The `Program.cs` file is used to configure the application at a high level. To log messages here, you can use the `ILogger` property provided by the `WebApplication` class.

:p How do you log messages in the `Program.cs` file?
??x
To log messages in the `Program.cs` file, use the `Logger` property of the `WebApplication` class and call its methods to generate log messages. For example:

Example code:
```csharp
var builder = WebApplication.CreateBuilder(args);
var app = builder.Build();
app.Logger.LogDebug("Pipeline configuration starting");
// Middleware and endpoints...
app.Logger.LogDebug("Pipeline configuration complete");
```
x??

---

---


#### Creating a Logger in ASP.NET Core
Background context: In this section, we explore how to use logging services provided by ASP.NET Core. The `ILogger` and `ILoggerFactory` are used to log messages during the application's lifecycle.

:p How do you create a logger for a specific category in an ASP.NET Core application?
??x
To create a logger for a specific category, you can use the `CreateLogger` method from `ILoggerFactory`. This is typically done within the main entry point of your application, such as the `Program.cs` file.

```csharp
using Microsoft.Extensions.Logging;
// ...

var builder = WebApplication.CreateBuilder(args);
var app = builder.Build();
var logger = app.Services.GetRequiredService<ILoggerFactory>().CreateLogger("Pipeline");
logger.LogDebug("Pipeline configuration starting");
app.MapGet("population/{city?}", Population.Endpoint);
logger.LogDebug("Pipeline configuration complete");
app.Run();
```

x??

---


#### Logging Messages with Attributes
Background context: The `LoggerMessage` attribute is an alternative way to generate log messages in ASP.NET Core. It provides better performance compared to other logging methods because the implementation is generated during compilation.

:p How does the `LoggerMessage` attribute work, and what are its benefits?
??x
The `LoggerMessage` attribute works by applying it to partial methods within a partial class. When the application is compiled, it generates the necessary implementation for these methods, which results in more efficient logging compared to other techniques.

```csharp
namespace Platform {
    public partial class Population {
        [LoggerMessage(0, LogLevel.Debug, "Starting response for {path}")]
        public static partial void StartingResponse(ILogger logger, string path);

        public static async Task Endpoint(HttpContext context, ILogger<Population> logger) {
            // Logger messages can be generated using the attribute
            StartingResponse(logger, context.Request.Path);
            
            // Code to process request and log completion
            string city = context.Request.RouteValues["city"] as string ?? "london";
            int? pop = null;
            switch (city.ToLower()) {
                case "london":
                    pop = 8_136_000;
                    break;
                case "paris":
                    pop = 2_141_000;
                    break;
                case "monaco":
                    pop = 39_000;
                    break;
            }
            if (pop.HasValue) {
                await context.Response.WriteAsync($"City: {city}, Population: {pop}");
            } else {
                context.Response.StatusCode = StatusCodes.Status404NotFound;
            }
            logger.LogDebug("Finished processing for {path}", context.Request.Path);
        }
    }
}
```

The main benefits are:
1. Improved performance due to generated implementation.
2. Easier maintenance and understanding of logging code.

x??

---


#### Logging with `CreateLogger` Method
Background context: The `CreateLogger` method is a straightforward way to obtain an `ILogger` instance for specific parts of your application, allowing you to log messages at different levels such as Debug or Info.

:p What are the steps to use `CreateLogger` in ASP.NET Core?
??x
To use `CreateLogger`, follow these steps:
1. Obtain the `ILoggerFactory` from the service collection.
2. Use the factory's `CreateLogger` method, providing a category name for your logger.
3. Call methods on the created `ILogger` instance to log messages.

```csharp
var logger = app.Services.GetRequiredService<ILoggerFactory>().CreateLogger("Pipeline");
logger.LogDebug("Pipeline configuration starting");
```

x??

---


#### Filtering Log Messages by Category
Background context explaining how log messages are filtered based on their category. You can specify different minimum logging levels for various categories in the `Logging:LogLevel` section.

:p How does specifying a logging level for a specific category affect the application?
??x
Specifying a logging level for a specific category ensures that only log messages from that category with or above that level are logged. For example, setting the "Microsoft.AspNetCore" category to "Warning" will only log warning and error-level messages from this namespace.

```json
{
  "Logging": {
    "LogLevel": {
      "Default": "Debug",
      "System": "Information",
      "Microsoft": "Information",
      "Microsoft.AspNetCore": "Warning"
    }
  }
}
```
x??

---


#### Adjusting Logging Levels for Specific Components
Background context explaining that you can adjust the logging levels to focus on specific parts of the application. This is useful during development or troubleshooting.

:p How does adjusting the logging level for a specific component affect the logs?
??x
Adjusting the logging level for a specific component increases the detail of log messages generated by that component. For example, setting the "Microsoft.AspNetCore.Routing" category to "Debug" will provide more detailed routing-related logs.

```json
{
  "Logging": {
    "LogLevel": {
      "Default": "Debug",
      "System": "Information",
      "Microsoft": "Information",
      "Microsoft.AspNetCore": "Warning",
      "Microsoft.AspNetCore.Routing": "Debug"
    }
  }
}
```
x??

---

---

