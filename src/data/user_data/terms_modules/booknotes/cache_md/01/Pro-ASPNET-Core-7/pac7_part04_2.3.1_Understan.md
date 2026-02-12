# High-Quality Flashcards: Pro-ASPNET-Core-7_processed (Part 4)


**Starting Chapter:** 2.3.1 Understanding endpoints

---


#### Creating an ASP.NET Core Project Using Command Line
Background context: This section explains how to create a basic ASP.NET Core project using the command line interface (CLI) provided by the .NET SDK. It covers essential commands for setting up the environment and creating a new MVC project.

:p How do you create a new ASP.NET Core project using the dotnet CLI?
??x
To create a new ASP.NET Core project, follow these steps:
1. Open a PowerShell command prompt.
2. Navigate to the desired folder where you want to create your project.
3. Use the following commands to set up and create the project:

```powershell
# Create global.json file specifying .NET SDK version
dotnet new globaljson --sdk-version 7.0.100 --output FirstProject

# Create a new ASP.NET Core MVC project using net7.0 framework
dotnet new mvc --no-https --output FirstProject --framework net7.0

# Create a solution file named FirstProject.sln
dotnet new sln -o FirstProject

# Add the newly created project to the solution
dotnet sln FirstProject add FirstProject
```

These commands ensure that your project uses the specified .NET SDK version, creates an MVC template-based ASP.NET Core project, and sets up a solution file for managing multiple projects.

x??

---


#### Configuring the `launchSettings.json` File
The `Properties/launchSettings.json` file in an ASP.NET Core project determines which HTTP port the application will use. This file can be edited to change the default settings.

:p How does one modify the default HTTP port for running an ASP.NET Core application using Visual Studio Code?
??x
To change the default HTTP port, open the `Properties/launchSettings.json` file and update the URLs in the `profiles` section. Specifically, you should set the `applicationUrl` to use a different port number.

For example:
```json
{
  "iisSettings": {
    "windowsAuthentication": false,
    "anonymousAuthentication": true,
    "iisExpress": {
      "applicationUrl": "http://localhost:5001", // Changed from :5000 to :5001
      "sslPort": 0
    }
  },
  "profiles": {
    "FirstProject": {
      "commandName": "Project",
      "dotnetRunMessages": true,
      "launchBrowser": true,
      "applicationUrl": "http://localhost:5001", // Changed from :5000 to :5001
      "environmentVariables": {
        "ASPNETCORE_ENVIRONMENT": "Development"
      }
    },
    "IIS Express": {
      "commandName": "IISExpress",
      "launchBrowser": true,
      "environmentVariables": {
        "ASPNETCORE_ENVIRONMENT": "Development"
      }
    }
  }
}
```

x??

---


#### Starting the ASP.NET Core Application
Using command-line tools to run an ASP.NET Core application provides more reliability and consistency compared to integrated development environments (IDEs).

:p How can one start the example ASP.NET Core application using `dotnet run` in a PowerShell window?
??x
To start the ASP.NET Core application, open a new PowerShell command prompt from the Windows Start menu. Navigate to the project folder containing the `.csproj` file and execute the following command:
```sh
dotnet run
```

This command compiles the code and starts the application.

For example:
```powershell
PS C:\path\to\FirstProject> dotnet run
```

x??

---


#### Understanding Endpoints in ASP.NET Core
In an ASP.NET Core application, incoming HTTP requests are handled by endpoints. These endpoints consist of actions, which are methods written in C#. Actions are defined within controllers, derived from `Microsoft.AspNetCore.Mvc.Controller`.

:p What is the relationship between controllers and actions in an ASP.NET Core application?
??x
Controllers in ASP.NET Core are classes that inherit from `Microsoft.AspNetCore.Mvc.Controller`. Public methods defined in these controller classes act as actions. These actions handle incoming HTTP requests.

For example:
```csharp
using Microsoft.AspNetCore.Mvc;

public class FirstController : Controller {
    public IActionResult Index() {
        return Content("Hello, World!");
    }
}
```

In this code snippet, `Index` is an action that returns a simple text response when accessed via the browser. The `Controller` base class provides methods to handle different HTTP verbs (GET, POST, etc.).

x??
---

---


#### ASP.NET Core Project Structure and Controllers
Background context: In ASP.NET Core projects, controllers play a crucial role in handling HTTP requests. The project template typically includes a `Controllers` folder with a default `HomeController`. This controller handles common routing such as `/Home/Index`.
:p What is the purpose of the `Controllers` folder in an ASP.NET Core project?
??x
The `Controllers` folder houses the C# classes that handle HTTP requests and return responses, making it easier to manage different routes and actions within the application.
x??

---


#### Understanding ASP.NET Core Routing System
Background context: The routing system in ASP.NET Core is responsible for selecting the endpoint that will handle an HTTP request based on a defined rule. When the project was created, it included default rules to get started.

:p What are some examples of URLs that can be used to access the `Index` action method from the `HomeController`?
??x
Examples include `/`, `/Home`, and `/Home/Index`. These requests will all route to the `Index` action in the `HomeController`.
x??

---


#### HTML Rendering with Views
Background context: To produce an HTML response from the application, a view is required. The Index action method was initially returning plain text instead of HTML.

:p How does modifying the Index action method enable HTML rendering?
??x
By changing the return type to `ViewResult` and specifying a view name, ASP.NET Core knows to render the corresponding view file as an HTML response.
Example code:
```csharp
public ViewResult Index() {
    return View("MyView");
}
```
x??

---


#### Creating and Rendering Views
Background context: After changing the action method to return `ViewResult`, you need to create a matching view in the appropriate folder.

:p How do you instruct ASP.NET Core to find and render a specific view?
??x
You call the `View` method from within your action method, specifying the name of the view file. For example:
```csharp
return View("MyView");
```
x??

---


#### Handling Errors During View Rendering
Background context: Initially, attempting to render a non-existent view results in an error message.

:p What does the error message indicate when trying to find a specific view?
??x
The error message explains that ASP.NET Core was unable to locate the specified view and provides details on where it looked. For instance:
```
Views/Shared/MyView.cshtml (Razor) 
```
x??

---


#### View Structure and Razor Syntax
Background context: The structure of a view typically includes HTML with embedded Razor expressions for dynamic content.

:p How do you use Razor to output dynamic content in the view?
??x
You can use `@model` to specify the type of data passed from the action method, and then use `@Model` to access this data within your view.
Example:
```html
@model string

<div>
    @Model World (from the view)
</div>
```
x??

---


#### Dynamic Output Through ViewModel
Background context: Action methods can pass complex data structures (view models) to views for dynamic content generation.

:p How does an action method provide a view model to a view?
??x
By passing arguments to the `View` method, where the second argument is the view model. For example:
```csharp
public ViewResult Index() {
    int hour = DateTime.Now.Hour;
    string viewModel = hour < 12 ? "Good Morning" : "Good Afternoon";
    return View("MyView", viewModel);
}
```
x??

---


#### Summary of Key Concepts
Background context: This section covers the basics of routing, view rendering, and dynamic content generation in ASP.NET Core.

:p What are the main concepts covered in this text?
??x
Routing system, view creation and rendering, use of action results, passing data (view models) to views.
x??

---

---


---
#### ASP.NET Core Development Environment
Background context: The text mentions that ASP.NET Core development can be done using various tools such as Visual Studio, Visual Studio Code, or any custom code editor. Each tool has its own advantages and methods for building and running applications.

:p What are the primary environments mentioned in which ASP.NET Core can be developed?
??x
The primary environments mentioned are Visual Studio, Visual Studio Code, and other code editors. The text suggests that while many code editors offer integrated build features, using `dotnet` commands ensures consistent results across different tools and platforms.
x??

---


#### Endpoint Processing in ASP.NET Core
Background context: In the example provided, an HTTP request is received by the ASP.NET Core platform, which then uses a routing system to match the request URL with an endpoint. The endpoint here refers to an action method defined within a controller.

:p What happens when an HTTP request reaches the ASP.NET Core platform?
??x
When an HTTP request reaches the ASP.NET Core platform, it is first routed based on the provided URL to an appropriate endpoint (action method). For instance, in the example given, the URL matches the `Index` action method within the `Home` controller. 
x??

---


#### Action Method and ViewResult
Background context: The text explains that the matched endpoint (the `Index` action method) generates a `ViewResult`, which contains metadata about the view to be rendered and the data model.

:p What does an ASP.NET Core action method return in this scenario?
??x
In this scenario, the action method returns a `ViewResult`. This result type indicates that the response will be a Razor view. The `ViewResult` object also includes a reference to the view name and a view model (the data) that will be used by the view.
x??

---


#### View Engine and Razor
Background context: Once the action method produces a `ViewResult`, the Razor view engine is responsible for rendering the actual HTML response. The `@Model` expression within the Razor view evaluates to insert the data from the view model into the response.

:p What role does the Razor view engine play in this process?
??x
The Razor view engine plays a crucial role by locating and processing the specified view file (in this case, the view referenced by the `ViewResult`). It processes the content of the view file, including evaluating expressions such as `@Model` to dynamically insert the data from the action method into the response.
x??

---


#### HTTP Request and Endpoint Matching
Background context: The example provided shows how an HTTP request URL can be matched to an endpoint in ASP.NET Core through its routing system.

:p How does the routing system in ASP.NET Core match URLs to endpoints?
??x
The routing system in ASP.NET Core matches URLs to endpoints by following a predefined set of rules. When a request is made, the routing engine examines the request URL and tries to find an endpoint that corresponds to it. In the example given, the `Index` action method from the `Home` controller is matched when the route configuration is correctly set up.
x??

---


#### C# vs HTML in Endpoints
Background context: The text mentions that endpoints can be written entirely in C# or use a combination of HTML and code expressions.

:p Can an endpoint in ASP.NET Core be implemented using only C#?
??x
Yes, an endpoint in ASP.NET Core can be implemented using only C#. This means the entire logic for processing HTTP requests and generating responses can be handled within action methods written entirely in C#, without any reliance on HTML. 
x??

---

---

