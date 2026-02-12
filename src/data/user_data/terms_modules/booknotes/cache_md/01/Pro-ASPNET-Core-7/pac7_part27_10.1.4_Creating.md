# High-Quality Flashcards: Pro-ASPNET-Core-7_processed (Part 27)


**Starting Chapter:** 10.1.4 Creating the Razor Components

---


#### Creating the Startup Razor Page
Background context: A Blazor application relies on a Razor page to provide initial content and JavaScript for connecting to the server. The `Index.cshtml` file is where you set up this initial connection.

:p What does the `Index.cshtml` file in the `Pages/Admin` folder do?
??x
The `Index.cshtml` file serves as the entry point for Blazor Server, providing initial content and JavaScript necessary to connect to the server. It includes a component that renders Blazor content based on routes and loads the required JavaScript.

```razor
@page "/admin"
@{
    Layout = null;
}
<!DOCTYPE html>
<html>
<head>
    <title>SportsStore Admin</title>
    <link href="/lib/bootstrap/css/bootstrap.min.css" rel="stylesheet" />
    <base href="/" />
</head>
<body>
    <component type="typeof(Routed)" render-mode="Server" />
    <script src="/_framework/blazor.server.js"></script>
</body>
</html>
```
x??

---


#### Creating the Routing and Layout Components
Background context: Blazor uses routing to manage navigation between components. The `Routed` component is responsible for routing based on URL paths, while `AdminLayout` provides a custom layout for administrative tools.

:p What does the `Routed.razor` file do?
??x
The `Routed.razor` component sets up Blazor's router to match URLs and render appropriate components. It uses the current browser URL to find matching routes and display them.

```razor
<Router AppAssembly="typeof(Program).Assembly">
    <Found>
        <RouteView RouteData="@context" DefaultLayout="typeof(AdminLayout)" />
    </Found>
    <NotFound>
        <h4 class="bg-danger text-white text-center p-2">No Matching Route Found</h4>
    </NotFound>
</Router>
```
x??

---


#### Creating the Admin Layout Component
Background context: The `AdminLayout.razor` component provides a custom layout for administrative tools, ensuring they have a distinct appearance and structure.

:p What does the `AdminLayout.razor` file do?
??x
The `AdminLayout.razor` file defines a custom layout specifically for administrative tools. It sets up a header with "SPORTS STORE Administration" text and a container for content.

```razor
@inherits LayoutComponentBase

<div class="bg-info text-white p-2">
    <span class="navbar-brand ml-2">SPORTS STORE Administration</span>
</div>

<div class="container-fluid">
    <div class="row p-2">
        <div class="col-3">
            <div class="d-grid gap-1">
                <NavLink class="btn btn-outline-primary"
                         ... />
            </div>
        </div>
        <!-- Other content can be added here -->
    </div>
</div>
```
x??

---

---


#### Blazor Layout and Navigation
Blazor uses Razor syntax to generate HTML but introduces its own directives and features. This layout renders a two-column display with product and order navigation buttons, which are created using `NavLink` elements.

:p What does the layout structure for the admin section look like?
??x
The layout consists of a two-column display where the left column contains navigation links for products and orders, while the right column displays the content based on the selected link. The `NavLink` elements apply a built-in Razor Component that changes the URL without triggering a new HTTP request.

Example:
```razor
<div class="row">
    <div class="col-3">
        <div class="nav flex-column nav-pills" role="tablist" aria-orientation="vertical">
            <NavLink class="btn btn-primary" href="/admin/products"
                     ActiveClass="btn-primary text-white"
                     Match="NavLinkMatch.Prefix">Products</NavLink>
            <NavLink class="btn btn-outline-primary" href="/admin/orders"
                     ActiveClass="btn-primary text-white"
                     Match="NavLinkMatch.Prefix">Orders</NavLink>
        </div>
    </div>
    <div class="col">
        @Body
    </div>
</div>
```
x??

---


#### Implementing Administration Features
Now that Blazor is set up and tested, you can start implementing administration features such as viewing orders and marking them as shipped.

:p What are some of the features being implemented in this section?
??x
In this section, you will implement basic administration tools to view received orders and mark them as shipped. This involves creating or modifying Razor components within the `Pages/Admin` folder to provide these functionalities.

Example:
You might create a component like `Orders.razor` that fetches order data from a database and displays it in a table, along with buttons to mark an order as shipped.

```razor
@page "/admin/orders"

<h4>Order Management</h4>
<table class="table">
    <thead>
        <tr>
            <th>Order ID</th>
            <th>Date</th>
            <th>Status</th>
        </tr>
    </thead>
    <tbody>
        @foreach (var order in Orders)
        {
            <tr>
                <td>@order.Id</td>
                <td>@order.Date.ToShortDateString()</td>
                <td>
                    @if (order.IsShipped)
                    {
                        <span class="badge badge-success">Shipped</span>
                    }
                    else
                    {
                        <button onclick="@(() => MarkAsShipped(order))" class="btn btn-primary">Ship</button>
                    }
                </td>
            </tr>
        }
    </tbody>
</table>

@code {
    private List<Order> Orders { get; set; } = new List<Order>();

    protected override async Task OnInitializedAsync()
    {
        // Fetch orders from the database
        Orders = await OrderService.GetOrdersAsync();
    }

    private async Task MarkAsShipped(Order order)
    {
        // Update the order status and save it back to the database
        order.IsShipped = true;
        await OrderService.SaveOrderAsync(order);
    }
}
```

x??

---

---


#### Using Entity Framework Core Migrations
Background context explaining how Entity Framework Core migrations can be used to update the database schema without manually writing SQL commands. The `dotnet ef migrations add` command is used to create a migration for adding the `Shipped` property.

:p How do you use Entity Framework Core to update the database schema after modifying the model?
??x
To update the database schema using Entity Framework Core, you can run the following command in a new PowerShell window:

```powershell
dotnet ef migrations add ShippedOrders
```

This command creates a new migration that adds the `Shipped` property to the `Order` class. When the application is started, this migration will be applied automatically by Entity Framework Core.

x??

---


#### Displaying Orders for Administrators
Background context explaining how two tables are displayed—one showing orders waiting to be shipped and another for shipped orders. This helps in managing the order status efficiently from an administrative perspective.

:p How are orders displayed to administrators?
??x
Orders are displayed using two tables: one for orders that need to be shipped, and another for those that have already been shipped. Each order is presented with a button allowing the administrator to change the shipping state.

```csharp
// Pseudocode for displaying orders
if (order.Shipped) {
    displayOrderAsShipped(order);
} else {
    displayOrderWaitingToBeShipped(order, shipmentButton);
}
```

The `shipmentButton` can trigger an action that updates the `Shipped` property to true.

x??

---


#### Iterative Development in ASP.NET Core
Background context explaining iterative development in software projects and how data models are typically extended over time as requirements evolve. This is a common practice in complex applications where the initial model may need adjustments based on user feedback or new features.

:p What does iterative development mean in the context of ASP.NET Core?
??x
Iterative development involves continuously enhancing and adapting the data model to support different features as understanding evolves throughout the project's lifecycle. For instance, adding a `Shipped` property to the `Order` class is an example of such an iterative change.

In practice, you may start with a simple initial model but find that it needs modifications over time to better fit the application’s requirements. Iterative development allows for flexibility and responsiveness to changing needs without requiring a complete redesign from scratch.

x??

---

---


#### Razor Component Introduction
Razor Components are a feature of Blazor that allow for server-side rendering using C# and HTML. They provide a way to create reusable UI components with logic embedded directly into the HTML, making it easier to manage complex user interfaces. The `@code` section within a Razor Component defines the properties and methods required for interactivity.

:p What is a key feature of Razor Components?
??x
Razor Components enable server-side rendering by combining C# code with HTML markup, providing a powerful way to build dynamic UIs in Blazor applications.
x??

---


#### Parameters in Razor Components
Parameters are used to pass data from the parent component to the child component. These parameters can be of various types and provide the necessary context for the component's functionality.

:p What is the purpose of using parameters in Razor Components?
??x
Parameters allow a parent component to pass configuration or data to a child component, enabling reusability and flexibility within the application.
x??

---


#### EventCallback and Communication
The `EventCallback<int>` property allows for asynchronous communication between components. When the button is clicked, it sends data back to the parent component or another part of the application.

:p How does `EventCallback` facilitate communication in Blazor applications?
??x
`EventCallback` enables an event-driven approach where a child component can notify its parent (or other parts) about actions taken by the user. In this case, clicking the button triggers an asynchronous call to the parent component.
x??

---


#### Order Data Management
The `Orders` component manages orders by fetching them from a repository, categorizing them into shipped and unshipped, and providing methods to update their shipping status.

:p How does the `Orders` component fetch order data?
??x
The `Orders` component fetches order data using an asynchronous method called `UpdateData()`. This method is invoked during the initialization of the component (via `OnInitializedAsync()`).

```csharp
public async Task UpdateData()
{
    AllOrders = await Repository.Orders.ToListAsync();
    UnshippedOrders = AllOrders.Where(o => !o.Shipped);
    ShippedOrders = AllOrders.Where(o => o.Shipped);
}
```

This method fetches all orders from the database and then filters them into two categories: unshipped and shipped. The `AllOrders` property contains all the orders, while `UnshippedOrders` and `ShippedOrders` contain filtered results.
??x

---


#### Component Initialization
The `Orders` component uses the `OnInitializedAsync()` method for initializing data. It ensures that the component fetches the latest order data whenever it initializes.

:p How does the `Orders` component initialize its data?
??x
The `Orders` component initializes its data by overriding the `OnInitializedAsync()` method and calling the `UpdateData()` method:

```csharp
protected async override Task OnInitializedAsync()
{
    await UpdateData();
}
```

This ensures that when the component is first rendered, it fetches all orders from the repository and categorizes them into shipped and unshipped states. This initialization happens automatically whenever the user navigates to the `/admin/orders` page.
??x

---


#### Repository Pattern Usage
The `Orders` component uses a repository pattern for data access. The repository provides a clean separation between the business logic of managing orders and the underlying data storage.

:p What is the role of the repository in the `Orders` component?
??x
The repository acts as an abstraction layer between the `Orders` component and the database. It encapsulates the data retrieval, manipulation, and persistence operations. The `Orders` component interacts with the repository to fetch orders and update their shipping status.

```csharp
public IOrderRepository Repository => Service;
```

This property ensures that the `Orders` component has its own instance of the repository, which is different from other components displayed to the same user. This separation helps in maintaining clean code and prevents data access conflicts.
??x

---

---


---
#### CRUD Interface Implementation for Product Catalog Management
Background context: This section discusses implementing a CRUD (Create, Read, Update, Delete) interface using Blazor for managing products in an e-commerce application. The implementation involves extending the repository to include methods that allow creation, modification, and deletion of product objects.
:p What is the purpose of adding `CreateProduct`, `DeleteProduct`, and `SaveProduct` methods to the `IStoreRepository` interface?
??x
The purpose is to provide a clear separation of concerns for data manipulation. These methods enable the application to perform CRUD operations on products stored in the database through an interface, making it easier to manage these operations independently.
```csharp
namespace SportsStore.Models {
    public interface IStoreRepository {
        // Existing properties and methods...
        
        void CreateProduct(Product p);
        void DeleteProduct(Product p);
        void SaveProduct(Product p);
    }
}
```
x??

---


#### Entity Framework Core Repository Implementation
Background context: The `EFStoreRepository` class implements the `IStoreRepository` interface, providing concrete implementations for CRUD operations using Entity Framework Core. This ensures that data persistence is managed through a database context.
:p How does the `EFStoreRepository` class implement the `CreateProduct`, `DeleteProduct`, and `SaveProduct` methods?
??x
The `EFStoreRepository` class implements these methods by leveraging Entity Framework Core's capabilities to manage changes in the database context. For `CreateProduct`, it adds a new product to the context, which will be saved later. For `DeleteProduct`, it removes an existing product from the context and saves the changes. The `SaveProduct` method is used to save any pending changes made to the entity framework context.
```csharp
namespace SportsStore.Models {
    public class EFStoreRepository : IStoreRepository {
        private StoreDbContext context;
        
        public EFStoreRepository(StoreDbContext ctx) { 
            context = ctx; 
        }

        // Existing implementations...
        
        public void CreateProduct(Product p) {
            context.Add(p);
            context.SaveChanges();
        }

        public void DeleteProduct(Product p) {
            context.Remove(p);
            context.SaveChanges();
        }

        public void SaveProduct(Product p) {
            context.SaveChanges();
        }
    }
}
```
x??

---


#### Blazor List Component for Products
Background context: The `Products.razor` component is responsible for displaying a list of products and providing navigation links to their details, edit pages, and creation page. This component uses `NavLink` components to handle navigation based on the product's ID.
:p What does the `Products.razor` component do?
??x
The `Products.razor` component displays a table of products with columns for ID, Name, Category, Price, and Actions (Details and Edit). It also includes a button to navigate to the create page where new products can be added. The component uses LINQ to filter and display data asynchronously.
```csharp
@page "/admin/products"
@page "/admin"
@inherits OwningComponentBase<IStoreRepository>

<table class="table table-sm table-striped table-bordered">
    <thead>
        <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Category</th>
            <th>Price</th>
            <td />
        </tr>
    </thead>
    <tbody>
        @if (ProductData?.Count() > 0) {
            @foreach (Product p in ProductData) {
                <tr>
                    <td>@p.ProductID</td>
                    <td>@p.Name</td>
                    <td>@p.Category</td>
                    <td>@p.Price.ToString("c")</td>
                    <td>
                        <NavLink class="btn btn-info btn-sm" 
                                 href="@GetDetailsUrl(p.ProductID ?? 0)">
                            Details
                        </NavLink>
                        <NavLink class="btn btn-warning btn-sm" 
                                 href="@GetEditUrl(p.ProductID ?? 0)">
                            Edit
                        </NavLink>
                    </td>
                </tr>
            }
        } else {
            <tr>
                <td colspan="5" class="text-center">No Products</td>
            </tr>
        }
    </tbody>
</table>

<NavLink class="btn btn-primary" href="/admin/products/create">
    Create
</NavLink>

@code {
    public IStoreRepository Repository => Service;
    public IEnumerable<Product> ProductData { get; set; } = Enumerable.Empty<Product>();
    
    protected async override Task OnInitializedAsync() {
        await UpdateData();
    }
    
    public async Task UpdateData() {
        ProductData = await Repository.Products.ToListAsync();
    }
    
    public string GetDetailsUrl(long id) => 
        $"/admin/products/details/{id}";
    
    public string GetEditUrl(long id) => 
        $"/admin/products/edit/{id}";
}
```
x??

---

