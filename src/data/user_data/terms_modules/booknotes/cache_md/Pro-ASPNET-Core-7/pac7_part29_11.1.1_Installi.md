# High-Quality Flashcards: Pro-ASPNET-Core-7_processed (Part 29)


**Starting Chapter:** 11.1.1 Installing the Identity package for Entity Framework Core. 11.1.3 Defining the connection string

---


---
#### Installing the Entity Framework Core Package for ASP.NET Core Identity
Background context: The provided text discusses setting up the ASP.NET Core Identity system with Microsoft SQL Server using Entity Framework Core. This involves installing necessary packages and creating a database context class.

:p How do you install the package that contains ASP.NET Core Identity support for Entity Framework Core?
??x
To add the required package, you use the following command in a PowerShell command prompt:
```sh
dotnet add package Microsoft.AspNetCore.Identity.EntityFrameworkCore --version 7.0.0
```
This command installs `Microsoft.AspNetCore.Identity.EntityFrameworkCore`, which is needed to integrate ASP.NET Core Identity with Entity Framework Core.

x??

---


#### Creating the Context Class for ASP.NET Core Identity
Background context: The text explains how to create a database context class (`AppIdentityDbContext`) that serves as a bridge between the database and the Identity model objects provided by ASP.NET Core. This involves deriving from `IdentityDbContext` and specifying the user type.

:p How do you define the `AppIdentityDbContext` class for integrating ASP.NET Core Identity with Entity Framework Core?
??x
You create a class file called `AppIdentityDbContext.cs` in the Models folder and define it as follows:

```csharp
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace SportsStore.Models {
    public class AppIdentityDbContext : IdentityDbContext<IdentityUser> {
        public AppIdentityDbContext(
            DbContextOptions<AppIdentityDbContext> options)
            : base(options) { }
    }
}
```

This class is derived from `IdentityDbContext`, which provides identity-specific features for Entity Framework Core. The generic type parameter `<IdentityUser>` indicates that this context will be used to manage and store `IdentityUser` entities.

x??

---

---


#### Defining a Connection String in `appsettings.json`
Background context: The connection string is essential for connecting to the database. In ASP.NET Core, this configuration is stored in the `appsettings.json` file, which allows for easy management of settings like database connections.

:p How do you define and add a connection string for the Identity database in the `appsettings.json` file?
??x
To define and add a connection string for the Identity database in the `appsettings.json` file, follow these steps:

1. Open the `appsettings.json` file.
2. Add or modify the `ConnectionStrings` section to include your specific connection details.

Here’s how it looks:
```json
{
  "Logging": {
    "LogLevel": {
      "Default": "Information",
      "Microsoft.AspNetCore": "Warning"
    }
  },
  "AllowedHosts": "*",
  "ConnectionStrings": {
    "SportsStoreConnection": "Server=(localdb)\\MSSQLLocalDB;Database=SportsStore;MultipleActiveResultSets=true",
    "IdentityConnection": "Server=(localdb)\\MSSQLLocalDB;Database=Identity;MultipleActiveResultSets=true"
  }
}
```

The connection string is defined in a single unbroken line, but for readability, it's often formatted across multiple lines. The `IdentityConnection` defines the LocalDB database called `Identity`.

x??

---


#### Configuring Identity Services
Background context: ASP.NET Core Identity provides authentication and authorization services out of the box. It needs to be properly configured in the application’s entry point (`Program.cs`) to work effectively.

:p How do you configure the ASP.NET Core Identity services in the SportsStore project?
??x
To configure the ASP.NET Core Identity services in the `SportsStore` project, follow these steps:

1. Use the `CreateBuilder` method from `WebApplicationBuilder`.
2. Add necessary services like controllers, view components, and repositories.
3. Register the Entity Framework Core context for both main application and identity.

Here’s how it is done:
```csharp
var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddControllersWithViews();
builder.Services.AddDbContext<StoreDbContext>(opts =>
    opts.UseSqlServer(
        builder.Configuration["ConnectionStrings:SportsStoreConnection"]));

builder.Services.AddScoped<IStoreRepository, EFStoreRepository>();
builder.Services.AddScoped<IOrderRepository, EFOrderRepository>();

builder.Services.AddRazorPages();
builder.Services.AddDistributedMemoryCache();
builder.Services.AddSession();
builder.Services.AddScoped<Cart>(sp => SessionCart.GetCart(sp));
builder.Services.AddSingleton<IHttpContextAccessor, HttpContextAccessor>();
builder.Services.AddServerSideBlazor();

// Configure Identity services
builder.Services.AddDbContext<AppIdentityDbContext>(options =>
    options.UseSqlServer(
        builder.Configuration["ConnectionStrings:IdentityConnection"]));

builder.Services.AddIdentity<IdentityUser, IdentityRole>()
    .AddEntityFrameworkStores<AppIdentityDbContext>();

var app = builder.Build();
```

This configuration registers the necessary components and sets up the middleware for authentication and authorization.

x??

---


#### Configuring Middleware for Authentication and Authorization
Background context: After setting up services, you need to configure middleware in `Program.cs` to enable authentication and authorization functionalities.

:p How do you configure middleware for authentication and authorization in the SportsStore project?
??x
To configure middleware for authentication and authorization in the `SportsStore` project, use the following methods:

1. `UseStaticFiles`: Serve static files.
2. `UseSession`: Enable sessions if needed.
3. `UseAuthentication`: Register authentication services.
4. `UseAuthorization`: Apply authorization policies.

Here’s how it is done:
```csharp
app.UseStaticFiles();
app.UseSession(); // Use this only if you are using session-based cart
app.UseAuthentication(); // Enables authentication middleware to run before your default MVC middleware.
app.UseAuthorization(); // Adds AuthorizationMiddleware to the request pipeline after the call to UseAuthentication.

// Additional routes for mapping controllers and pages
app.MapControllerRoute("catpage", 
    "{category}/Page{productPage:int}", 
    new { Controller = "Home", action = "Index" });

app.MapControllerRoute(
    "page",
    "Page{productPage:int}",
    new { Controller = "Home", action = "Index", productPage = 1 });

app.MapControllerRoute("category",
    "{category}",
    new { Controller = "Home", action = "Index", productPage = 1 });

app.MapControllerRoute("pagination",
    "Products/Page{productPage}",
    new { Controller = "Home", action = "Index", productPage = 1 });

app.MapDefaultControllerRoute();
app.MapRazorPages();
app.MapBlazorHub();
app.MapFallbackToPage("/admin/{*catchall}", "/Admin/Index");

// Ensure that the database is populated with initial data
SeedData.EnsurePopulated(app);
```

The `UseAuthentication` and `UseAuthorization` methods are crucial for setting up the middleware components that enforce security policies.

x??

---

---


#### Creating and Applying Database Migrations
Background context: Entity Framework Core (EF Core) is a popular ORM tool that allows for database schema management through migrations. In this scenario, we are using EF Core to manage the migration of the Identity database used by ASP.NET Core Identity.

:p What command creates a new migration for the Identity database?
??x
The `dotnet ef migrations add Initial --context AppIdentityDbContext` command is used to create a new migration named "Initial" specifically targeting the `AppIdentityDbContext` context. This allows us to define changes to the schema in an incremental manner.
```bash
dotnet ef migrations add Initial --context AppIdentityDbContext
```
x??

---


#### Applying the Database Migrations
Background context: After creating a migration, applying it updates the database schema according to the specified changes.

:p What command applies the newly created migration and creates the database?
??x
The `dotnet ef database update --context AppIdentityDbContext` command is used to apply the latest migrations and create the database if it doesn't exist. This ensures that the Identity database reflects the current schema defined in the migrations.
```bash
dotnet ef database update --context AppIdentityDbContext
```
x??

---


#### Seeding the Identity Database in Program.cs
Background context: The `Program.cs` file is where the application's entry point and configuration are defined. Seeding data here ensures that necessary administrative accounts or other initial data exist when the application starts.

:p How does the `EnsurePopulated` method ensure the database is populated with admin user data?
??x
The `EnsurePopulated` method in `Program.cs` calls another static method, `IdentitySeedData.EnsurePopulated`, to ensure that the Identity database is created and seeded with an admin user account named "Admin". This method checks if a user exists by name and creates one if necessary.
```csharp
var app = builder.Build();
// Other configurations...
SeedData.EnsurePopulated(app);
IdentitySeedData.EnsurePopulated(app);
app.Run();
```
x??

---

