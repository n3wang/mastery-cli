# .NET Basics and Commands

## What is .NET?

.NET is a free, open-source platform for building applications. It includes:
- **Runtime**: Executes your applications
- **Libraries**: Pre-built code you can use
- **SDK**: Tools for building and running apps

## Essential .NET CLI Commands

### Project Management

```bash
# Check .NET version installed
dotnet --version

# List all installed SDKs
dotnet --list-sdks

# Create a new Web API project
dotnet new webapi -n MyProjectName

# Create in current directory
dotnet new webapi -o .

# Restore NuGet packages (dependencies)
dotnet restore

# Build the project
dotnet build

# Build in Release mode (optimized)
dotnet build -c Release
```

### Running Applications

```bash
# Run the application (automatically builds first)
dotnet run

# Run in watch mode (auto-restart on file changes)
dotnet watch run

# Run with specific environment
ASPNETCORE_ENVIRONMENT=Development dotnet run
```

### Package Management

```bash
# Add a NuGet package
dotnet add package PackageName

# Add specific version
dotnet add package PackageName --version 1.2.3

# Remove a package
dotnet remove package PackageName

# List all packages in project
dotnet list package
```

### Database Commands (Entity Framework Core)

```bash
# Install EF Core tools globally
dotnet tool install --global dotnet-ef

# Create a new migration
dotnet ef migrations add MigrationName

# Apply migrations to database
dotnet ef database update

# Remove last migration (if not applied)
dotnet ef migrations remove

# Generate SQL script from migrations
dotnet ef migrations script
```

### Cleaning and Publishing

```bash
# Clean build artifacts
dotnet clean

# Publish application for deployment
dotnet publish -c Release -o ./publish

# Publish self-contained (includes runtime)
dotnet publish -c Release -r linux-x64 --self-contained
```

## Examples Used in This Project

### 1. Creating This Project

```bash
# Create the Web API project
dotnet new webapi -n TodoApi --no-https -o .

# Add PostgreSQL Entity Framework package
dotnet add package Npgsql.EntityFrameworkCore.PostgreSQL

# Add EF Core Design tools (for migrations)
dotnet add package Microsoft.EntityFrameworkCore.Design

# Add Swagger documentation
dotnet add package Swashbuckle.AspNetCore
```

### 2. Running This Project Locally

```bash
# Run the application
dotnet run

# Output will show:
# info: Microsoft.Hosting.Lifetime[14]
#       Now listening on: http://[::]:8080
# info: Microsoft.Hosting.Lifetime[0]
#       Application started. Press Ctrl+C to shut down.

# Access it at http://localhost:5000 (or the port shown)
```

### 3. Building for Production

```bash
# Build optimized version
dotnet build -c Release

# Publish to a folder
dotnet publish -c Release -o ./publish

# The ./publish folder now contains everything needed to run the app
```

## Understanding the Project File (.csproj)

The `TodoApi.csproj` file defines your project:

```xml
<Project Sdk="Microsoft.NET.Sdk.Web">
  <!-- Target framework - what version of .NET to use -->
  <PropertyGroup>
    <TargetFramework>net9.0</TargetFramework>
    <Nullable>enable</Nullable>
    <ImplicitUsings>enable</ImplicitUsings>
  </PropertyGroup>

  <!-- Dependencies (NuGet packages) -->
  <ItemGroup>
    <PackageReference Include="Npgsql.EntityFrameworkCore.PostgreSQL" Version="9.0.4" />
    <PackageReference Include="Microsoft.EntityFrameworkCore.Design" Version="9.0.9" />
    <PackageReference Include="Swashbuckle.AspNetCore" Version="9.0.6" />
  </ItemGroup>
</Project>
```

**Key concepts:**
- `TargetFramework`: Which .NET version your app uses (net9.0 = .NET 9.0)
- `Nullable`: Enable nullable reference types (helps prevent null reference errors)
- `ImplicitUsings`: Automatically imports common namespaces
- `PackageReference`: External libraries your project depends on

## Common Development Workflow

```bash
# 1. Make code changes
# (edit files in your IDE)

# 2. Run and test locally
dotnet run

# 3. Build to check for errors
dotnet build

# 4. Build Docker image for deployment
docker build -t your-image-name .

# 5. Run Docker image locally to test
docker run -p 8080:8080 your-image-name

# 6. Deploy to production
docker push your-image-name
caprover deploy -i your-image-name -a your-app
```

## Useful Debugging Commands

```bash
# Run with verbose logging
dotnet run --verbosity detailed

# Check for outdated packages
dotnet list package --outdated

# View project structure and references
dotnet list reference

# View app configuration
dotnet run --launch-profile https  # if you have profiles defined
```

## Environment Variables

.NET apps use environment variables for configuration:

```bash
# Set environment to Development (more detailed errors, logging)
export ASPNETCORE_ENVIRONMENT=Development
dotnet run

# Set environment to Production (optimized, less verbose)
export ASPNETCORE_ENVIRONMENT=Production
dotnet run

# Set custom port
export ASPNETCORE_URLS="http://localhost:3000"
dotnet run
```

## Next Steps

- Read `docs/api-controller-structure.md` to understand how controllers work
- Read `docs/dependency-injection.md` to learn about DI in .NET
- Read `docs/entity-framework-basics.md` to understand database access

## Official Resources

- [.NET CLI Documentation](https://docs.microsoft.com/en-us/dotnet/core/tools/)
- [ASP.NET Core Documentation](https://docs.microsoft.com/en-us/aspnet/core/)
- [.NET Tutorial for Beginners](https://dotnet.microsoft.com/learn/dotnet/hello-world-tutorial)
