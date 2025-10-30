# .NET Basics Flashcards

## .NET Platform Fundamentals

#### What is .NET?
.NET is a free, open-source platform for building applications. It consists of three main components that work together: the Runtime (CLR - Common Language Runtime) executes your code, the Libraries (BCL - Base Class Library) provide pre-built functionality, and the SDK (Software Development Kit) contains tools for building and running applications.

```
.NET Platform
├── Runtime (CLR) - Executes applications
├── Libraries (BCL) - Pre-built code
└── SDK - Development tools
```

:p What are the three main components of .NET and what does each do?
??x
The three main components of .NET are:

**1. Runtime (CLR):**
- Executes your applications
- Manages memory (garbage collection)
- Handles security and type safety
- Just-In-Time (JIT) compilation

**2. Libraries (BCL - Base Class Library):**
- Pre-built code you can use
- Collections, file I/O, networking, etc.
- No need to write everything from scratch

**3. SDK (Software Development Kit):**
- Tools for building apps: `dotnet build`
- Tools for running apps: `dotnet run`
- Package manager: `dotnet add package`
- Project templates: `dotnet new`

**Analogy:**
- Runtime = Engine that runs your car
- Libraries = GPS, radio, features you use
- SDK = Tools to build and maintain the car
x??

---

#### Project File Structure (.csproj)
The `.csproj` file is an XML file that defines your project configuration. It specifies the target framework (which .NET version), enabled features (like nullable reference types), and dependencies (NuGet packages).

```xml
<Project Sdk="Microsoft.NET.Sdk.Web">
  <PropertyGroup>
    <TargetFramework>net9.0</TargetFramework>
    <Nullable>enable</Nullable>
    <ImplicitUsings>enable</ImplicitUsings>
  </PropertyGroup>

  <ItemGroup>
    <PackageReference Include="Npgsql.EntityFrameworkCore.PostgreSQL" Version="9.0.4" />
  </ItemGroup>
</Project>
```

:p What is the purpose of the .csproj file and what are its key elements?
??x
The `.csproj` file is the **project configuration file** in XML format.

**Key elements:**

**1. Project SDK:**
```xml
<Project Sdk="Microsoft.NET.Sdk.Web">
```
- Defines project type
- `Sdk.Web` = Web applications
- `Sdk` = Console apps, class libraries

**2. PropertyGroup - Project settings:**
```xml
<TargetFramework>net9.0</TargetFramework>
```
- Which .NET version to use
- `net9.0` = .NET 9.0
- `net8.0` = .NET 8.0

```xml
<Nullable>enable</Nullable>
```
- Enable nullable reference types
- Helps prevent null reference errors

```xml
<ImplicitUsings>enable</ImplicitUsings>
```
- Automatically imports common namespaces
- Don't need `using System;` everywhere

**3. ItemGroup - Dependencies:**
```xml
<PackageReference Include="PackageName" Version="1.0.0" />
```
- External libraries (NuGet packages)
- Version management

**Editing:** Usually edit via `dotnet add package`, not manually
x??

---

## CLI Commands

#### dotnet build vs dotnet run
The `dotnet build` command compiles your code into assemblies (DLL files) without running it. The `dotnet run` command both builds AND runs your application in one step. Build is useful for checking compilation errors without starting the app.

```bash
# Just compile (check for errors)
dotnet build

# Compile and run
dotnet run
```

:p What is the difference between `dotnet build` and `dotnet run`?
??x
**dotnet build** - Compile only:
```bash
dotnet build

# What happens:
1. Compiles .cs files → .dll files
2. Checks for syntax/type errors
3. Creates bin/Debug/net9.0/ output
4. Does NOT run the application

# Build in Release mode (optimized):
dotnet build -c Release
```

**dotnet run** - Compile AND run:
```bash
dotnet run

# What happens:
1. Checks if build needed (implicit build)
2. Builds if source changed
3. Runs the application
4. Starts web server or console app

# Run with file watching:
dotnet watch run  # Auto-restart on file changes
```

**When to use:**

**Build:**
- Check for compilation errors
- CI/CD pipelines
- Prepare for publishing
- Verify code compiles without running

**Run:**
- Development (test locally)
- See application output
- Debug issues
- Test HTTP endpoints

**Performance:** `dotnet build` is faster if you just need to check errors
x??

---

#### Package Management Commands
NuGet is .NET's package manager for adding external libraries. Packages are downloaded from NuGet.org and added to your project's dependencies. The `.csproj` file tracks which packages and versions your project uses.

```bash
# Add package
dotnet add package Npgsql.EntityFrameworkCore.PostgreSQL

# Add specific version
dotnet add package PackageName --version 1.2.3

# Remove package
dotnet remove package PackageName

# List all packages
dotnet list package
```

:p How do you manage NuGet packages using the dotnet CLI?
??x
**NuGet package management commands:**

**Add a package:**
```bash
dotnet add package PackageName

# What happens:
1. Downloads package from NuGet.org
2. Adds to .csproj file:
   <PackageReference Include="PackageName" Version="x.x.x" />
3. Restores dependencies
4. Ready to use in code
```

**Add specific version:**
```bash
dotnet add package PackageName --version 1.2.3

# Locks to exact version
# Useful for stability/compatibility
```

**Remove package:**
```bash
dotnet remove package PackageName

# Removes from .csproj
# Cleans up unused dependencies
```

**List packages:**
```bash
dotnet list package

# Shows all installed packages
# With version numbers

dotnet list package --outdated
# Shows packages with newer versions available
```

**Restore packages:**
```bash
dotnet restore

# Downloads all packages from .csproj
# Usually automatic (build/run do this)
# Useful after cloning repo
```

**Example workflow:**
```bash
# Clone project
git clone repo-url
cd project

# Restore dependencies
dotnet restore

# Add new package
dotnet add package Swashbuckle.AspNetCore

# Build with new package
dotnet build
```
x??

---

#### EF Core Migration Commands
Entity Framework Core migrations are a way to evolve your database schema over time. Migrations track changes to your models and generate SQL to update the database accordingly.

```bash
# Create migration
dotnet ef migrations add AddUserTable

# Apply to database
dotnet ef database update

# Remove last migration (if not applied)
dotnet ef migrations remove

# Generate SQL script
dotnet ef migrations script
```

:p What are EF Core migrations and how do you use them?
??x
**Migrations = Version control for your database schema**

**Workflow:**

**1. Install EF Core tools:**
```bash
dotnet tool install --global dotnet-ef

# Verify installation:
dotnet ef
```

**2. Create migration:**
```bash
dotnet ef migrations add MigrationName

# What happens:
1. Compares current model to last migration
2. Generates C# code with Up()/Down() methods
3. Creates file in Migrations/ folder
4. Calculates SQL needed for changes

# Example:
dotnet ef migrations add AddTodoTable
```

**3. Apply migration:**
```bash
dotnet ef database update

# What happens:
1. Generates SQL from migration
2. Executes SQL on database
3. Updates __EFMigrationsHistory table
4. Database now matches your models
```

**4. Remove migration:**
```bash
dotnet ef migrations remove

# Only works if:
- Migration not applied to database
- Removes the last migration file
```

**5. Generate SQL script:**
```bash
dotnet ef migrations script

# Outputs SQL without running it
# Useful for:
- Manual review
- DBA approval
- Production deployments
```

**Example scenario:**
```bash
# 1. Add property to model
public class TodoItem {
    public string? Tags { get; set; }  // NEW
}

# 2. Create migration
dotnet ef migrations add AddTagsToTodo

# 3. Apply to database
dotnet ef database update

# Database now has Tags column
```

**vs EnsureCreated():**
- `EnsureCreated()` - Creates DB from scratch (no evolution)
- Migrations - Evolves DB over time (proper versioning)
x??

---

## Development Workflow

#### Watch Mode
Watch mode monitors your source files and automatically rebuilds and restarts your application when changes are detected. This is extremely useful during development to see changes immediately without manually restarting.

```bash
# Normal run
dotnet run

# Watch mode
dotnet watch run

# Output: "Watching for file changes..."
# Any .cs file change → auto rebuild + restart
```

:p What is `dotnet watch run` and when should you use it?
??x
**Watch mode = Auto-restart on file changes**

**Usage:**
```bash
dotnet watch run

# Console output:
# "dotnet watch ⌚ Started"
# "dotnet watch ⌚ Building..."
# "dotnet watch ⌚ Started"
# "Watching for file changes..."
```

**What it does:**

**1. Monitors files:**
- All `.cs` files
- `.csproj` file
- Configuration files

**2. On file change:**
- Detects change
- Stops running app
- Rebuilds project
- Restarts app
- Shows in console

**3. Hot reload (some changes):**
- Method body changes
- Adding methods
- No restart needed for small changes

**When to use:**

**Development ✓:**
```bash
dotnet watch run

# Make changes
# Save file
# Instantly see results in browser
# No manual restart
```

**Production ✗:**
```bash
dotnet run  # Regular run for production
```

**Example workflow:**
```bash
# Terminal 1: Start watch
dotnet watch run

# Terminal 2: Make changes
vim Controllers/TodoController.cs
# Edit, save

# Terminal 1: Automatically shows
# "File changed: TodoController.cs"
# "Restarting..."
# "Application started"

# Browser: Refresh to see changes
```

**Benefit:** Save 10-30 seconds per change × 100 changes/day = huge time saver
x??

---

#### Build Configurations
.NET has two main build configurations: Debug (development) and Release (production). Debug mode includes symbols for debugging and is not optimized. Release mode is fully optimized for performance.

```bash
# Debug build (default)
dotnet build

# Release build (optimized)
dotnet build -c Release

# Publish for deployment
dotnet publish -c Release -o ./publish
```

:p What is the difference between Debug and Release build configurations?
??x
**Debug vs Release configurations:**

**Debug configuration:**
```bash
dotnet build  # Default is Debug
dotnet build -c Debug  # Explicit

# Characteristics:
- Optimization: OFF
- Debug symbols: Included (.pdb files)
- Assertions: Enabled
- Code size: Larger
- Performance: Slower
- Debugging: Easy (breakpoints work)

# Output: bin/Debug/net9.0/
```

**Release configuration:**
```bash
dotnet build -c Release

# Characteristics:
- Optimization: ON (aggressive)
- Debug symbols: Usually excluded
- Assertions: Removed
- Code size: Smaller
- Performance: Faster
- Debugging: Difficult

# Output: bin/Release/net9.0/
```

**Publishing:**
```bash
dotnet publish -c Release -o ./publish

# Creates deployment-ready files:
- Optimized binaries
- All dependencies
- Configuration files
- Ready to deploy

# Self-contained (includes runtime):
dotnet publish -c Release -r linux-x64 --self-contained
# Creates standalone app with .NET runtime included
# Larger size but no .NET installation needed
```

**When to use:**

**Debug:**
- Local development
- Testing with breakpoints
- Investigating bugs

**Release:**
- Production deployment
- Performance testing
- Docker images
- Final builds

**Performance difference:**
```
Debug:   100 requests/sec
Release: 500 requests/sec (example - varies)
```

**File size:**
```
Debug:   50 MB
Release: 30 MB (optimized, trimmed)
```
x??

---

## Environment Variables

#### ASPNETCORE_ENVIRONMENT
This environment variable controls the application's runtime behavior. Different environments (Development, Production) enable different features like detailed error pages, logging verbosity, and configuration sources.

```bash
# Development mode
export ASPNETCORE_ENVIRONMENT=Development
dotnet run

# Production mode
export ASPNETCORE_ENVIRONMENT=Production
dotnet run
```

:p What does ASPNETCORE_ENVIRONMENT control and what are the common values?
??x
**ASPNETCORE_ENVIRONMENT** determines runtime behavior

**Common values:**

**Development:**
```bash
export ASPNETCORE_ENVIRONMENT=Development
dotnet run

# Behavior:
- Detailed error pages (stack traces)
- Verbose logging
- Developer exception page
- Loads appsettings.Development.json
- Swagger enabled (often)
- No response caching
```

**Production:**
```bash
export ASPNETCORE_ENVIRONMENT=Production
dotnet run

# Behavior:
- Generic error pages (no stack traces)
- Minimal logging
- Production exception handler
- Loads appsettings.Production.json
- Swagger disabled (typically)
- Response caching enabled
- Performance optimized
```

**Staging:**
```bash
export ASPNETCORE_ENVIRONMENT=Staging

# Production-like but with more logging
# For final testing before production
```

**How it works:**

**In code (Program.cs):**
```csharp
var builder = WebApplication.CreateBuilder(args);
var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseDeveloperExceptionPage();
    app.UseSwagger();
}
else
{
    app.UseExceptionHandler("/Error");
}
```

**Configuration files:**
```
appsettings.json              - Base config
appsettings.Development.json  - Dev overrides
appsettings.Production.json   - Prod overrides

# Loaded in order:
1. appsettings.json
2. appsettings.{Environment}.json  (overrides base)
```

**Other variables:**
```bash
# Set custom port
export ASPNETCORE_URLS="http://localhost:3000"

# Set connection string
export ConnectionStrings__DefaultConnection="Host=..."
```

**Windows (PowerShell):**
```powershell
$env:ASPNETCORE_ENVIRONMENT="Development"
dotnet run
```

**Docker:**
```dockerfile
ENV ASPNETCORE_ENVIRONMENT=Production
```
x??

---

## Project Creation

#### Creating a New Web API Project
The `dotnet new` command creates projects from templates. The `webapi` template creates a RESTful API project with all necessary files and configurations.

```bash
# Create new Web API
dotnet new webapi -n MyApi

# Create in current directory
dotnet new webapi -o .

# List available templates
dotnet new list
```

:p How do you create a new Web API project and what files are generated?
??x
**Creating a new Web API project:**

**Command:**
```bash
dotnet new webapi -n TodoApi

# Options:
# -n: Project name
# -o: Output directory
# --no-https: Disable HTTPS
# -f: Target framework (net9.0, net8.0)
```

**Generated files:**

**Program.cs:**
```csharp
// Main entry point
// Configures services and middleware
var builder = WebApplication.CreateBuilder(args);
builder.Services.AddControllers();
var app = builder.Build();
app.MapControllers();
app.Run();
```

**Controllers/WeatherForecastController.cs:**
```csharp
// Example API controller
[ApiController]
[Route("[controller]")]
public class WeatherForecastController : ControllerBase
{
    [HttpGet]
    public IEnumerable<WeatherForecast> Get() { ... }
}
```

**TodoApi.csproj:**
```xml
<!-- Project configuration -->
<Project Sdk="Microsoft.NET.Sdk.Web">
  <PropertyGroup>
    <TargetFramework>net9.0</TargetFramework>
  </PropertyGroup>
</Project>
```

**appsettings.json:**
```json
// Configuration settings
{
  "Logging": {
    "LogLevel": {
      "Default": "Information"
    }
  }
}
```

**Other files:**
- `Properties/launchSettings.json` - Debug profiles
- `WeatherForecast.cs` - Example model

**Create in current directory:**
```bash
mkdir TodoApi
cd TodoApi
dotnet new webapi -o .  # Creates in current folder
```

**Add packages:**
```bash
dotnet new webapi -n TodoApi
cd TodoApi
dotnet add package Npgsql.EntityFrameworkCore.PostgreSQL
dotnet add package Swashbuckle.AspNetCore
```

**Run immediately:**
```bash
dotnet new webapi -n TodoApi
cd TodoApi
dotnet run

# API available at http://localhost:5000
```

**List templates:**
```bash
dotnet new list

# Output:
# console     - Console application
# webapi      - ASP.NET Core Web API
# mvc         - ASP.NET Core MVC
# blazor      - Blazor app
# ... many more
```
x??
