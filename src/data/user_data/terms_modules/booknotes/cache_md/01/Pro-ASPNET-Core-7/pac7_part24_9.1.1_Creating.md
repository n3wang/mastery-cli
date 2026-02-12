# High-Quality Flashcards: Pro-ASPNET-Core-7_processed (Part 24)


**Starting Chapter:** 9.1.1 Creating a storage-aware cart class

---


---
#### Refactoring Cart Management for Simplicity
Background context: The previous implementation of managing a shopping cart relied on direct handling within Razor Pages and controllers, which led to redundancy. This made it harder to maintain and scale the application. Using services can abstract away these details, making components more focused on their primary responsibilities.

:p What is the main problem with using session data directly in the Cart class?
??x
The main problem is that managing cart persistence through session data requires duplicating code across multiple Razor Pages or controllers, leading to redundancy and potential inconsistencies if changes are not synchronized across all instances.

```csharp
public void AddItem(Product product, int quantity) {
    // existing implementation
}
```
x??

---


#### Creating a Subclass for Session-Aware Cart
Background context: To address the issues with direct session handling, we create a `SessionCart` class that inherits from `Cart`. This new class will handle storing and retrieving cart data from the session state more efficiently.

:p How does the `SessionCart` class improve upon the original `Cart` model?
??x
The `SessionCart` class improves upon the original by encapsulating the logic for saving and loading cart data to/from the session. It provides a clean interface for managing the cart without worrying about session details, promoting better separation of concerns.

```csharp
public static Cart GetCart(IServiceProvider services)
{
    // code for retrieving and initializing SessionCart from session
}
```
x??

---


#### Overriding Cart Methods for Persistence
Background context: To maintain the integrity of the cart data, the `SessionCart` class overrides several methods from the base `Cart` class. These overridden methods ensure that any changes to the cart are persisted back to the user's session.

:p How does overriding these methods in `SessionCart` help with cart management?
??x
Overriding these methods ensures that every time a change is made to the cart (adding, removing items, clearing), it is automatically saved to the session. This simplifies the codebase by abstracting away the session handling logic and making sure data persistence is consistent.

```csharp
public override void AddItem(Product product, int quantity) {
    base.AddItem(product, quantity);
    Session?.SetJson("Cart", this);
}
```
x??

---

---


---
#### Adding Services for Cart Management
Background context: In this section, we are focusing on adding a service to manage `Cart` objects within an e-commerce application. The goal is to use session storage to maintain cart information across user interactions. This involves setting up services that handle `Cart` requests using ASP.NET Core's dependency injection system.

:p How can you ensure that the same `Cart` object is used for related requests in a web application?
??x
To ensure that the same `Cart` object is used for related requests, we use the `AddScoped` method to add the `Cart` service. This method tells ASP.NET Core to create an instance of `Cart` per HTTP request and share it among all components handling that request.

```csharp
builder.Services.AddScoped<Cart>(sp => SessionCart.GetCart(sp));
```

Here, a lambda expression is used to return a `SessionCart` object, which will store itself in the session when modified. This ensures that any page or controller that needs a cart within the same HTTP request gets the same instance.

x??

---


#### HttpContextAccessor for Session Management
Background context: To access the current session within the `SessionCart` class, we need to use an `HttpContextAccessor`. This service is added using the `AddSingleton` method, ensuring that the same `HttpContextAccessor` object is used throughout the application.

:p Why is it necessary to add a `HttpContextAccessor` as a singleton service?
??x
It is necessary to add a `HttpContextAccessor` as a singleton service because this class provides access to the current HTTP context, which includes session data. Without this accessor, we would not be able to read or write session-based cart information from within the `SessionCart` class.

```csharp
builder.Services.AddSingleton<IHttpContextAccessor, HttpContextAccessor>();
```

This service is required for the `SessionCart.GetCart()` method to work correctly and retrieve the current session data.

x??

---


#### Simplifying Cart Razor Page Code
Background context: The goal here is to simplify the code where `Cart` objects are used by leveraging services. By injecting a `Cart` object into the page model constructor, we can remove the need for session management logic from handler methods, making the code cleaner and more maintainable.

:p How does the introduction of a service for managing `Cart` objects simplify the Razor Page?
??x
The introduction of a service for managing `Cart` objects simplifies the Razor Page by eliminating the need to explicitly load or store sessions in the handler methods. Instead, we can use dependency injection to get the `Cart` object directly.

```csharp
public class CartModel : PageModel {
    private IStoreRepository repository;
    public CartModel(IStoreRepository repo, Cart cartService) {
        repository = repo;
        Cart = cartService;
    }
    public Cart Cart { get; set; }
}
```

By doing this, the `Cart` object is automatically managed by the service and stored in the session. This makes the code more focused on its primary responsibilities without worrying about how carts are created or persisted.

x??

---


#### Testing Cart Update Functionality

Background context explaining how to test the cart update functionality. This involves setting up a mock repository, initializing a cart, and verifying that the cart is updated correctly.

:p How can you test whether an item has been added to the cart using a mock setup?
??x
To test adding an item to the cart, we first create a mock repository with a single product. Then, we initialize a `Cart` object and use it to instantiate a `CartModel`. The `OnPost` method of the model is called with specific parameters (product ID and return URL). Finally, assertions are made to check that the cart contains the expected item.

```csharp
// Arrange
Mock<IStoreRepository> mockRepo = new Mock<IStoreRepository>();
mockRepo.Setup(m => m.Products).Returns((new Product[] {
    new Product { ProductID = 1, Name = "P1" }
}).AsQueryable<Product>());

Cart testCart = new Cart();

// Action
CartModel cartModel = new CartModel(mockRepo.Object, testCart);
cartModel.OnPost(1, "myUrl");

// Assert
Assert.Single(testCart.Lines);
Assert.Equal("P1", testCart.Lines.First().Product.Name);
Assert.Equal(1, testCart.Lines.First().Quantity);
```
x??

---


#### Removing Items from the Cart

Background context explaining how to add a Remove button to allow customers to remove items from their cart. This involves modifying the Razor page and adding a handler method in the page model.

:p How can you add a Remove button in the Razor Page to delete an item from the cart?
??x
To add a Remove button, HTML forms are used within each row of the cart table. Each form submits a POST request when the "Remove" button is clicked. The form includes hidden fields for `ProductID` and `returnUrl`. The button triggers the submission by setting its `type` to `submit`.

```html
<tr>
    <td class="text-center">@line.Quantity</td>
    <td class="text-left">@line.Product.Name</td>
    <td class="text-right">@line.Product.Price.ToString("c")</td>
    <td class="text-right">@(line.Quantity * line.Product.Price).ToString("c")</td>
    <td class="text-center">
        <form asp-page-handler="Remove" method="post">
            <input type="hidden" name="ProductID" value="@line.Product.ProductID" />
            <input type="hidden" name="returnUrl" value="@Model?.ReturnUrl" />
            <button type="submit" class="btn btn-sm btn-danger">Remove</button>
        </form>
    </td>
</tr>
```
x??

---


#### Removing an Item from the Cart in the Page Model

Background context explaining how to handle the removal of items from the cart within the page model. This involves defining a new handler method that processes the request and modifies the cart accordingly.

:p How does the `CartModel` class handle removing items when the "Remove" button is clicked?
??x
The `CartModel` class includes an `OnPostRemove` method to handle the removal of items from the cart. This method receives parameters such as `productId` and `returnUrl`. It locates the item in the cart using the provided product ID and removes it.

```csharp
public IActionResult OnPostRemove(long productId, string returnUrl)
{
    Cart.RemoveLine(Cart.Lines.First(cl => cl.Product.ProductID == productId).Product);
    return RedirectToPage(new { returnUrl = returnUrl });
}
```
x??

---


#### Summary of Cart Functionality

Background context explaining the completion of cart functionality by adding new features such as removing items and displaying a summary.

:p What are the two new features added to the cart functionality in this section?
??x
The two new features added to the cart functionality are:
1. **Removing Items from the Cart**: A "Remove" button is added to each item in the cart, allowing customers to delete items by submitting an HTTP POST request.
2. **Displaying a Summary of the Cart**: The total value of the cart is displayed at the bottom of the page, providing a summary to the customer.

These features enhance user experience and ensure that customers can manage their carts effectively.
x??

---

---

