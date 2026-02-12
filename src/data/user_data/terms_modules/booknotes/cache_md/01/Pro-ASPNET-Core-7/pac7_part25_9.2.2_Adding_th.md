# High-Quality Flashcards: Pro-ASPNET-Core-7_processed (Part 25)


**Starting Chapter:** 9.2.2 Adding the cart summary widget

---


#### Adding a Cart Summary Widget
Background context: The cart functionality is currently functional but has an integration issue. Customers can only view their cart contents by adding new items, which is inconvenient and unintuitive. To improve user experience, we are implementing a widget that summarizes the cart content and provides direct access to it throughout the application.

:p What problem does the current cart summary implementation have?
??x
The current cart summary is only accessible after adding an item to the cart. This makes it hard for customers to know what items they currently have in their cart without navigating away from the product pages.
x??

---


#### Creating CartSummaryViewComponent Class
Background context: We need a view component that will summarize the contents of the cart and can be included in various parts of the application. This component will receive a `Cart` object as an argument and pass it to the view for rendering.

:p How does the `CartSummaryViewComponent` class work?
??x
The `CartSummaryViewComponent` class takes a `Cart` object as a constructor argument, which allows it to access the cart contents. It then passes this `Cart` object to the `Invoke()` method, which returns a view component result containing the summarized cart information.

```csharp
using Microsoft.AspNetCore.Mvc;
using SportsStore.Models;

namespace SportsStore.Components {
    public class CartSummaryViewComponent : ViewComponent {
        private readonly Cart _cart;

        public CartSummaryViewComponent(Cart cart) {
            _cart = cart;
        }

        public IViewComponentResult Invoke() {
            return View(_cart);
        }
    }
}
```
x??

---


#### Modifying the Layout to Include Cart Summary
Background context: To ensure that the cart summary is always available, we need to modify the layout file (`_Layout.cshtml`) so it includes our `CartSummaryViewComponent` in a prominent location.

:p How does modifying the `_Layout.cshtml` file include the cart summary?
??x
We add the `vc:cart-summary` tag helper to the navigation bar within the layout file. This tag helper invokes the `CartSummaryViewComponent`, which renders the cart summary view component's output into the layout at runtime.

```html
<!DOCTYPE html>
<html>
<head>
    <meta name="viewport" content="width=device-width" />
    <title>SportsStore</title>
    <link href="/lib/bootstrap/css/bootstrap.min.css" rel="stylesheet" />
    <link href="/lib/font-awesome/css/all.min.css" rel="stylesheet" />
</head>
<body>
    <div class="bg-dark text-white p-2">
        <div class="container-fluid">
            <div class="row">
                <div class="col navbar-brand">SPORTS STORE</div>
                <div class="col-6 navbar-text text-end">
                    <vc:cart-summary />
                </div>
            </div>
        </div>
    </div>
    <div class="row m-1 p-1">
        <div id="categories" class="col-3">
            <vc:navigation-menu />
        </div>
        <div class="col-9">@RenderBody()</div>
    </div>
</body>
</html>
```
x??

---

---


#### Creating Order Model Class
Background context: The next step is to create a model class to capture shipping details from users. This involves adding validation attributes and ensuring sensitive data is not overwritten by HTTP requests.

:p What is the purpose of creating an `Order.cs` class file?
??x
The purpose of creating an `Order.cs` class file is to define a model that captures the shipping details for a customer. It includes properties like name, address lines, city, state, zip, country, and gift wrap options. Validation attributes ensure user inputs are required and correct.

Here's how the class looks:

```csharp
using System.ComponentModel.DataAnnotations;
using Microsoft.AspNetCore.Mvc.ModelBinding;

namespace SportsStore.Models {
    public class Order {
        [BindNever]
        public int OrderID { get; set; }
        
        [BindNever]
        public ICollection<CartLine> Lines { get; set; } = new List<CartLine>();
        
        [Required(ErrorMessage = "Please enter a name")]
        public string? Name { get; set; }

        // Other properties for address and country
    }
}
```

:p What is the `BindNever` attribute used for?
??x
The `BindNever` attribute prevents users from supplying values for sensitive or important model properties via HTTP requests. This stops ASP.NET Core from using values from the request to populate these properties.

Example:
```csharp
[BindNever]
public int OrderID { get; set; }
```

This means that the `OrderID` property will not be bound by the model binder during an HTTP POST or GET request.
x??

---


#### Creating Checkout Controller and View
Background context: To handle order processing, a controller named `OrderController` is needed. This controller should have a method to render a view where users can enter their shipping details.

:p How do you create the `OrderController` class?
??x
To create the `OrderController`, add a new class file called `OrderController.cs` in the `Controllers` folder and define it as follows:

```csharp
using Microsoft.AspNetCore.Mvc;
using SportsStore.Models;

namespace SportsStore.Controllers {
    public class OrderController : Controller {
        public ViewResult Checkout() => View(new Order());
    }
}
```

:p What does the `Checkout()` method do?
??x
The `Checkout()` method returns a view with an `Order` model as its view model. It initializes and passes a new `Order` object to the view, which will be used to capture user input for shipping details.

Example:
```csharp
public ViewResult Checkout() => View(new Order());
```

:p How do you create the `Checkout.cshtml` view?
??x
To create the `Checkout.cshtml` view, add a Razor view in the `Views/Order` folder. The markup should capture user inputs for shipping details and include validation attributes:

```html
@model Order

<h2>Check out now</h2>
<p>Please enter your details, and we'll ship your goods right away.</p>

<form asp-action="Checkout" method="post">
    <h3>Ship to</h3>
    <div class="form-group">
        <label>Name:</label>
        <input asp-for="Name" class="form-control" />
    </div>
    
    <h3>Address</h3>
    <div class="form-group">
        <label>Line 1:</label>
        <input asp-for="Line1" class="form-control" />
    </div>

    <!-- Other address fields -->

    <h3>Options</h3>
    <div class="checkbox">
        <label>
            <input asp-for="GiftWrap" /> Gift wrap these items
        </label>
    </div>

    <div class="text-center">
        <input class="btn btn-primary" type="submit" value="Complete Order" />
    </div>
</form>
```

:p How do you handle form submission in the `OrderController`?
??x
To handle form submission, you need to add a method in the `OrderController` that processes the POST request and saves the order details. Here is an example:

```csharp
[HttpPost]
public IActionResult Checkout([Bind("Name,Line1,Line2,Line3,City,State,Zip,Country,GiftWrap")] Order order) {
    // Save order to database or perform other actions
    return RedirectToAction("OrderSummary", "Order");
}
```

This method checks for the `Order` model and processes the form submission by saving the order details.
x??

---

---


#### Adding a Property to Database Context
Background context: The text explains how adding a property to the `StoreDbContext` class allows Entity Framework Core to manage orders in the database. This setup is essential for storing and retrieving order information.

:p How can you add a new property to the database context to support order processing?
??x
To add a new property to the database context, you modify the `StoreDbContext` class by adding a `DbSet<Order>` property as shown below:

```csharp
using Microsoft.EntityFrameworkCore;

namespace SportsStore.Models {
    public class StoreDbContext : DbContext {
        public StoreDbContext(DbContextOptions<StoreDbContext> options) 
            : base(options) { }
        
        public DbSet<Product> Products => Set<Product>();
        public DbSet<Order> Orders => Set<Order>(); // Added this line for order support
    }
}
```

This change enables Entity Framework Core to create a migration that adds the `Order` entity to the database schema.
x??

---


#### Creating Database Migrations
Background context: The text discusses creating and applying migrations in Entity Framework Core. These migrations help manage changes to the application's data model without losing existing data.

:p How do you create a migration for orders?
??x
To create a migration for orders, use the following command from the root of the SportsStore project:

```powershell
dotnet ef migrations add Orders
```

This command generates a new migration that updates the database schema to include order entities. The migration is applied automatically when the application starts or can be manually run using `dotnet ef database update`.
x??

---


#### Resetting the Database
Background context: During development, frequent changes to the model may lead to misalignment between migrations and the actual database schema. To resolve this, you might need to reset the database.

:p How do you delete and recreate the database in a development environment?
??x
To delete the existing database and recreate it, use the following command:

```powershell
dotnet ef database drop --force --context StoreDbContext
```

This command deletes the current database. Afterward, run this command to re-create the database and apply all migrations:

```powershell
dotnet ef database update --context StoreDbContext
```

These commands ensure that your application's data model accurately reflects the current codebase.
x??

---


#### Implementing Order Repository Interface
Background context: The text explains how to implement an `IOrderRepository` interface using Entity Framework Core. This repository provides methods for accessing and managing order data.

:p What is the purpose of implementing the `IOrderRepository` interface?
??x
The purpose of implementing the `IOrderRepository` interface is to provide a way to interact with the database for storing, retrieving, and modifying orders. By using this interface, you encapsulate the logic related to reading and writing order data, making your code more modular and testable.

Here is an example implementation of the `EFOrderRepository` class:

```csharp
using Microsoft.EntityFrameworkCore;
namespace SportsStore.Models {
    public class EFOrderRepository : IOrderRepository {
        private StoreDbContext context;

        public EFOrderRepository(StoreDbContext ctx) {
            context = ctx;
        }

        public IQueryable<Order> Orders => 
            context.Orders.Include(o => o.Lines).ThenInclude(l => l.Product);

        public void SaveOrder(Order order) {
            context.AttachRange(order.Lines.Select(l => l.Product));
            if (order.OrderID == 0) {
                context.Orders.Add(order);
            }
            context.SaveChanges();
        }
    }
}
```

This class includes methods to retrieve all orders and save new or modified orders. The `Include` and `ThenInclude` methods ensure that related data is loaded when querying the database.
x??

---


#### Attaching Related Entities
Background context: When saving an order, it's necessary to inform Entity Framework Core about related entities (like products) that should not be saved if they already exist in the database.

:p How do you prevent duplicate product entries when saving an order?
??x
When saving an order, you need to notify Entity Framework Core which products are already attached to the context. This prevents errors caused by trying to insert existing objects again.

Here is how you can attach related entities:

```csharp
public void SaveOrder(Order order) {
    context.AttachRange(order.Lines.Select(l => l.Product));
    if (order.OrderID == 0) {
        context.Orders.Add(order);
    }
    context.SaveChanges();
}
```

The `AttachRange` method ensures that Entity Framework Core recognizes the products in the order as existing entities and does not attempt to insert them again, preventing potential errors.
x??

---

---

