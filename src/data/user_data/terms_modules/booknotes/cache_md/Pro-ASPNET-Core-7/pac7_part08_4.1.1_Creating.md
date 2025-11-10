# High-Quality Flashcards: Pro-ASPNET-Core-7_processed (Part 8)


**Starting Chapter:** 4.1.1 Creating a project using the command line

---


#### Creating a Project Using Command Line
Background context: This section explains how to create an ASP.NET Core project using command line tools, which is recommended for simplicity and predictability. The `dotnet` command provides various templates for different types of projects.

:p How do you use the `dotnet new` command to create a basic ASP.NET Core web project?
??x
To create a basic ASP.NET Core web project using the `dotnet new` command, you would run:

```sh
dotnet new web --no-https --output MyProject --framework net7.0
```

This command creates a project named "MyProject" in an output folder also called "MyProject." The `--no-https` argument ensures that the project does not include HTTPS support, which is explained further in Chapter 16. The `--framework net7.0` specifies the .NET framework version to be used.

x??

---


#### Creating a Solution File
Background context: This section explains how to create and manage multiple projects using solution files, which are commonly used by Visual Studio.

:p How do you create a solution file for your project?
??x
To create a solution file, use the following command:

```sh
dotnet new sln -o MySolution
```

This creates an `MySolution.sln` file in the output folder (`MySolution`). The solution file references projects added to it using the `dotnet sln add <project>` command.

x??

---


#### Adding a Project to Solution File
Background context: This section explains how to add a project to an existing solution file, which is useful for grouping multiple projects together.

:p How do you add a newly created project to a solution file?
??x
To add a newly created project to a solution file, use the command:

```sh
dotnet sln MySolution.sln add MySolution/MyProject
```

This command adds `MySolution/MyProject` to the existing solution file (`MySolution.sln`).

x??

---


#### Building and Running Projects Using Command-Line Tools
To build and run a .NET Core project using command-line tools, you first need to configure the environment properly by adding specific statements in `Program.cs` and setting up `launchSettings.json`.

:p What are the steps involved in building and running a .NET Core project via the command line?
??x
1. Add necessary configuration in `Program.cs`:
   ```csharp
   var builder = WebApplication.CreateBuilder(args);
   var app = builder.Build();
   
   app.MapGet("/", () => "Hello World.");
   
   app.UseStaticFiles();
   
   app.Run();
   ```
2. Configure the HTTP port and other settings in `launchSettings.json`:
   ```json
   {
       "iisSettings": {
           "windowsAuthentication": false,
           "anonymousAuthentication": true,
           "iisExpress": {
               "applicationUrl": "http://localhost:5000",
               "sslPort": 0
           }
       },
       "profiles": {
           "MyProject": {
               "commandName": "Project",
               "dotnetRunMessages": true,
               "launchBrowser": true,
               "applicationUrl": "http://localhost:5000",
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
3. Build the project using `dotnet build` in the command line.

x??

---


#### Adding a Statement to Program.cs
In .NET Core projects, adding statements like those for handling HTTP requests and serving static files is crucial for setting up basic routing and functionality.

:p What does the statement `app.MapGet("/", () => "Hello World.");` do?
??x
The statement `app.MapGet("/", () => "Hello World.");` maps a GET request to the root URL ("/") of your application, responding with the string "Hello World." when this route is accessed. This sets up a basic HTTP endpoint for testing purposes.
x??

---


#### Configuring Static Files and Routing in .NET Core
.NET Core applications need configuration to handle static files such as HTML or CSS served from specific folders.

:p What does `app.UseStaticFiles();` do?
??x
The statement `app.UseStaticFiles();` enables serving of static files (such as those stored in the `wwwroot` folder) directly from a web server. This is essential for hosting and serving client-side resources.
x??

---


---

#### Using Command Line to Run a Project
Background context: Running projects directly from the command line is an efficient way to develop and test applications. The `dotnet run` command compiles and runs the project seamlessly.

:p How do you build and run a .NET project using the command line?
??x
To build and run a .NET project, you use the following command in the terminal within your project directory:
```bash
dotnet run
```
This command first builds the project (if necessary) and then runs it. If no specific entry point is specified, `dotnet run` will default to running `Program.Main()`.

x??

---

