# High-Quality Flashcards: Pro-ASPNET-Core-7_processed (Part 18)


**Starting Chapter:** 7.2.5 Creating a repository

---


---
#### Configuring Entity Framework Core in SportsStore
Entity Framework Core must be configured to know which database type, connection string, and context class will manage data. The `Program.cs` file contains the configuration code for this setup.

:p How is Entity Framework Core configured in the `SportsStore` application?
??x
Entity Framework Core is configured using the `builder.Services.AddDbContext<StoreDbContext>` method with a SQL Server connection specified via the configuration settings. This ensures that EF Core knows how to interact with the database.

```csharp
builder.Services.AddDbContext<StoreDbContext>(opts =>
    opts.UseSqlServer(
        builder.Configuration["ConnectionStrings:SportsStoreConnection"]));
```

x??

---


#### Creating a Repository Interface and Implementation Class
A repository pattern is used to abstract data access, making it easier to change storage mechanisms later. The `IStoreRepository` interface defines the contract for accessing product data.

:p What does the `IStoreRepository` interface do in the context of SportsStore?
??x
The `IStoreRepository` interface allows components to request a sequence of `Product` objects efficiently using LINQ queries. It uses `IQueryable<Product>` which is derived from `IEnumerable<Product>` and represents a collection that can be queried.

```csharp
namespace SportsStore.Models {
    public interface IStoreRepository {
        IQueryable<Product> Products { get; }
    }
}
```

x??

---


#### Understanding `IQueryable<T>` vs. `IEnumerable<T>`
`IQueryable<T>` is used in repository interfaces because it allows efficient querying of data directly from the database, whereas `IEnumerable<T>` retrieves all objects first and then filters them.

:p Why is `IQueryable<T>` preferred over `IEnumerable<T>` in repository interfaces?
??x
`IQueryable<T>` is preferred because it lets you query only the required subset of data from the database using standard LINQ statements. This avoids loading unnecessary data into memory, which can be more efficient and reduce load on the server.

```csharp
using System.Linq;
var products = context.Products.Where(p => p.Category == "Sports").Take(10);
```

x??

---


#### Creating an Implementation of the Repository Interface
The `EFStoreRepository` class implements the `IStoreRepository` interface, mapping to the database's `Products` property.

:p How does the `EFStoreRepository` implementation work?
??x
The `EFStoreRepository` maps the `Products` property defined by the `IStoreRepository` interface onto the `Products` property of the `StoreDbContext` class. This leverages Entity Framework Core’s `DbSet<T>` to provide an `IQueryable<Product>`.

```csharp
namespace SportsStore.Models {
    public class EFStoreRepository : IStoreRepository {
        private StoreDbContext context;
        public EFStoreRepository(StoreDbContext ctx) {
            context = ctx;
        }
        public IQueryable<Product> Products => context.Products;
    }
}
```

x??

---


#### Adding the Repository Service to `Program.cs`
Services are created in ASP.NET Core to manage dependencies. The repository service is added as a scoped service so each HTTP request gets its own instance.

:p How does adding the `IStoreRepository` service work in `Program.cs`?
??x
The `AddScoped` method creates a scoped service, ensuring that one instance of the `EFStoreRepository` is created per HTTP request. This aligns with Entity Framework Core’s typical usage pattern.

```csharp
builder.Services.AddScoped<IStoreRepository, EFStoreRepository>();
```

x??
---

---


#### Creating a Database Migration Using Entity Framework Core
Background context: Entity Framework Core can generate database schema from model classes using migrations. Migrations are used to handle changes in your data models without manually writing SQL commands. This is particularly useful for maintaining a consistent and up-to-date database schema.

:p What command creates a migration class that prepares the database for its first use?
??x
The `dotnet ef migrations add Initial` command generates a C# class containing the necessary SQL commands to prepare the database.
```sh
dotnet ef migrations add Initial
```
x??

---


#### Understanding Seed Data and Migrations
Background context: To populate the database with sample data, seed data is created using classes. This helps in providing initial data for testing and demonstration purposes. The `EnsurePopulated` method ensures that the database has the initial data.

:p What does the `EnsurePopulated` method do?
??x
The `EnsurePopulated` method checks if there are any pending migrations to create or update the database schema, then seeds it with sample products.
```csharp
public static void EnsurePopulated(IApplicationBuilder app)
{
    // Obtain a StoreDbContext object through IApplicationBuilder interface and call Database.Migrate() 
    StoreDbContext context = app.ApplicationServices
        .CreateScope().ServiceProvider
        .GetRequiredService<StoreDbContext>();
    
    if (context.Database.GetPendingMigrations().Any())
    {
        context.Database.Migrate();
    }
    
    // Check if any products exist, if not add a collection of sample products
    if (!context.Products.Any())
    {
        context.Products.AddRange(
            new Product { Name = "Kayak", Description = "A boat for one person", Category = "Watersports", Price = 275m },
            // more products...
        );
        context.SaveChanges();
    }
}
```
x??

---


#### Preparing the HomeController
Background context: The `HomeController` class is responsible for handling HTTP requests and displaying views related to products. To ensure that the controller can access the repository, dependency injection is used.

:p How does ASP.NET Core handle the creation of a new instance of the `HomeController`?
??x
ASP.NET Core inspects the constructor of the `HomeController` class to determine its dependencies. In this case, it requires an implementation of `IStoreRepository`. It uses the configuration in the `Program.cs` file to create an appropriate repository (e.g., `EFStoreRepository`) and pass it into the controller's constructor. This process is known as dependency injection.

Here’s a simplified version of how this works:
```csharp
public class HomeController : Controller {
    private IStoreRepository repository;

    public HomeController(IStoreRepository repo) {
        repository = repo;
    }
}
```
x??

---


#### Dependency Injection in Action
Background context: Dependency injection allows the `HomeController` to access the application’s data through an interface (`IStoreRepository`) without knowing which specific implementation is used. This makes it easier to switch implementations (e.g., from Entity Framework to another storage solution) without modifying the controller.

:p What is dependency injection, and why is it useful in this context?
??x
Dependency injection is a design pattern where objects are provided with their dependencies instead of creating those dependencies themselves. In the context of `HomeController`, it means that the controller does not directly instantiate its repository but receives one via its constructor. This decouples the controller from any specific implementation, making the application more flexible and easier to test.

For example:
```csharp
public class HomeController : Controller {
    private IStoreRepository repository;

    public HomeController(IStoreRepository repo) {
        repository = repo;
    }

    public IActionResult Index() => View(repository.Products);
}
```
x??

---


#### Unit Testing with Mock Objects
Background context: To verify that the `HomeController` is correctly accessing the repository, a unit test can be written using mock objects. A mock repository is created to simulate data and behavior.

:p How can you set up a unit test for the `Index()` action in `HomeController`?
??x
You can create a mock repository that mimics the actual repository's behavior but is controlled by your tests. Here’s an example of how to set it up:

```csharp
using System;
using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.Mvc;
using Moq;
using SportsStore.Controllers;
using SportsStore.Models;
using Xunit;

namespace SportsStore.Tests {
    public class HomeControllerTests {

        [Fact]
        public void Can_Use_Repository() {
            // Arrange
            Mock<IStoreRepository> mock = new Mock<IStoreRepository>();
            mock.Setup(m => m.Products).Returns((new Product[] {
                new Product { ProductID = 1, Name = "P1" },
                new Product { ProductID = 2, Name = "P2" }
            }).AsQueryable<Product>());

            HomeController controller = new HomeController(mock.Object);

            // Act
            var result = controller.Index() as ViewResult;

            // Assert
            Assert.IsAssignableFrom<ViewResult>(result);
            Assert.Contains(result.Model as List<Product>, p => p.Name == "P1");
            Assert.Contains(result.Model as List<Product>, p => p.Name == "P2");
        }
    }
}
```

This test checks that the `Index` action returns a view with products and ensures they match the expected data.
x??

---

---

