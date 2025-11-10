# High-Quality Flashcards: Pro-ASPNET-Core-7_processed (Part 12)


**Starting Chapter:** 5.9.1 Applying extension methods to an interface

---


---
#### Extension Methods
Background context: Extension methods are a feature of C# that allow you to add new functionality to an existing type without modifying its source code. They do not break through access rules and only extend class members that were accessible before. The key aspect is that extension methods provide a way to enrich the functionality of types in a clean, readable manner.

:p What are extension methods?
??x
Extension methods allow you to add new methods to existing classes without modifying their source code. They do not change the accessibility rules and can be used to extend the functionality based on the members that were already accessible. This feature enhances the reusability and readability of your code by providing a natural extension mechanism for any class.

Example:
```csharp
namespace LanguageFeatures.Models {
    public static class MyExtensionMethods {
        public static decimal TotalPrices(this ShoppingCart cart) {
            decimal total = 0;
            foreach (Product prod in cart.Products) {
                total += prod.Price;
            }
            return total;
        }
    }
}
```
x?

---


#### Applying Extension Methods
Background context: In the provided code, an extension method called `TotalPrices` is applied to a `ShoppingCart` object. This demonstrates how you can extend the functionality of existing classes using extension methods.

:p How does applying an extension method work in C#?
??x
Applying an extension method works by defining a static method within a class that uses the `this` keyword as its first parameter, indicating which type it will be extending. The compiler then allows you to call this method on instances of the specified type as if they were instance methods.

Example:
```csharp
decimal cartTotal = cart.TotalPrices();
```
Here, `cart.TotalPrices()` is called on a `ShoppingCart` object, but the `TotalPrices` method is defined in an external class.

x?

---


#### Extension Methods and Interfaces
Background context: The text shows how to apply extension methods to interfaces. This allows calling these methods on any class that implements the interface, adding flexibility and reusability.

:p How can you apply extension methods to an interface?
??x
You can define an extension method for a type that implements an interface by targeting `IEnumerable<T>` in your extension method signature. This way, the extension method can be called on instances of any class that implements this interface or inherits from it.

Example:
```csharp
public static decimal TotalPrices(this IEnumerable<Product?> products) {
    decimal total = 0;
    foreach (Product? prod in products) {
        total += prod?.Price ?? 0;
    }
    return total;
}
```
This method can now be called on any `IEnumerable<Product?>` object, including `ShoppingCart`.

x?

---


---
#### Extension Methods in ASP.NET Core
Background context: Extension methods allow you to add new functionality to existing types without modifying their source code. In this scenario, extension methods are being used to manipulate and calculate totals for collections of `Product` objects.

:p How can you use extension methods to calculate the total price of a collection of `Product` objects?
??x
You can define an extension method called `TotalPrices` that iterates through each product in the collection and sums up their prices. This method is defined within the `MyExtensionMethods` class as follows:

```csharp
public static decimal TotalPrices(
    this IEnumerable<Product?> products)
{
    decimal total = 0;
    foreach (Product? prod in products)
    {
        total += prod?.Price ?? 0;
    }
    return total;
}
```

x??

---


#### Using Lambda Expressions for Multiple Filters
Background context: Lambda expressions provide a concise way to create anonymous functions. In this scenario, using lambda expressions allows you to define multiple filtering methods without duplicating code.

:p How can you use two different filter methods in the same collection?
??x
You can define separate extension methods for each type of filter and then apply them sequentially. For example, `FilterByPrice` filters by price and `TotalPrices` calculates the total:

```csharp
decimal priceFilterTotal = productArray.FilterByPrice(20).TotalPrices();
```

Similarly, you can use another method to filter by name and calculate the total:

```csharp
decimal nameFilterTotal = productArray.FilterByName('S').TotalPrices();
```

x??

---


#### Extension Methods in C#
Background context explaining extension methods. Extension methods allow adding functionality to existing types without modifying their source code. They are defined inside a static class and use the `this` keyword before the type name as shown in the example.

:p What is an extension method and how does it work?
??x
Extension methods allow adding functionality to any type without modifying its original implementation. This is achieved by defining the method within a static class, specifying the `this` keyword followed by the type on which you want to extend the functionality. For instance, in the provided text, an extension method is defined for the `IEnumerable<Product?>` type.

```csharp
public static class MyExtensionMethods {
    public static decimal TotalPrices(this IEnumerable<Product?> products) { 
        // Implementation details
    }
}
```
x??

---


#### Lambda Expressions in C#
Background context explaining lambda expressions. Lambda expressions provide a concise way to define inline methods. They are particularly useful for defining simple functions that can be passed as parameters, such as filters or action delegates.

:p What is the syntax of a lambda expression and how does it work?
??x
Lambda expressions allow you to create small anonymous functions that can be used where delegate types are expected. The basic syntax includes parameters followed by `=>` (goes to) and an expression that returns a value.

```csharp
Func<Product?, bool> nameFilter = p => p?.Name?[0] == 'S';
```
In this example, the lambda expression takes a `Product?` object as a parameter and returns a boolean value indicating whether the first character of its name is 'S'.

x??

---

