# High-Quality Flashcards: Pro-ASPNET-Core-7_processed (Part 11)


**Starting Chapter:** 5.4.4 Checking for null values

---


#### Nullable Types in C#
Nullable types allow you to indicate the possibility of a value being null. In C#, you can use the `?` suffix to make a reference type nullable, such as `string?`, which means it can hold any string or `null`.

When dealing with methods that return nullable types (like `Product?[]`), you must ensure that your code correctly handles these potential null values.
:p What is the difference between using a nullable type like `Product?[]` and a non-nullable type like `Product[]`?
??x
The main difference lies in how C# treats the possibility of null. A nullable type, such as `Product?[]`, explicitly allows the value to be null. This means that you must handle this case when using the variable.

A non-nullable type, such as `Product[]`, does not allow null values and will cause a compile-time error if you attempt to assign or return `null`. Therefore, when dealing with nullable types, you need to add checks to ensure your code is safe from runtime exceptions.
```csharp
// Non-nullable type example
Product[] products = Product.GetProducts(); // Error: Cannot convert 'Product?' to 'Product'
```
x??

---


#### Null Conditional Operator in C#
The null conditional operator (`?.`) in C# allows you to safely access members of an object without causing a runtime exception if the object is null. The operator returns `null` if it encounters a null reference, and otherwise, it accesses the member as usual.

Here's how it works:
- If the left operand (the object) is null, the expression evaluates to `null`.
- If the left operand is not null, it behaves like regular property access.
:p How does the null conditional operator help in avoiding null reference exceptions?
??x
The null conditional operator helps avoid null reference exceptions by gracefully handling cases where an object might be null. Instead of attempting to access a property or method on a potentially null object and causing an exception, it returns `null` if the left operand is null.

For example:
```csharp
string? val = products[0]?.Name; // If products[0] is null, val will be null.
```
This prevents the program from crashing due to a null reference and allows you to handle such cases more gracefully in your code.

x??

---


#### Using String Interpolation in C#
Background context: C# supports string interpolation, which allows you to embed expressions inside string literals. This makes it easier to create formatted strings by directly using variables and constants within the string template.

:p How is string interpolation used in C#?
??x
String interpolation in C# uses the `$` symbol before a string literal to denote that the string can contain embedded expressions, which are evaluated at runtime and inserted into the string. The syntax involves placing variable or constant names inside `{}` within the string.

```csharp
Product?[] products = Product.GetProducts();
string result = $"Name: {products[0]?.Name}, Price: {products[0]?.Price}";
```
x??

---


#### Object Initializers in C#
Background context: Object initializers allow you to create and initialize an object using a more concise syntax. This is particularly useful when creating objects and setting their properties at the same time, reducing the number of lines required.

:p How does one use object initialization in C#?
??x
Object initialization allows you to initialize an object and set its property values in a single line without calling the constructor explicitly. You can specify property names and their corresponding values using curly braces `{}`.

```csharp
Product kayak = new Product {
    Name = "Kayak",
    Price = 275M
};
```
x??

---


#### Pattern Matching in C#
Pattern matching is a feature introduced in C# that simplifies complex conditional logic by allowing developers to match values against patterns. This can include checking for specific types, ranges, and more within switch statements or if/else blocks.

The `is` keyword is used for type testing and can be used in the following way:
```csharp
if (data[i] is decimal d) { ... }
```
This checks if the value stored in `data[i]` is of type `decimal`. If it matches, the value is assigned to a new variable `d`, which can then be used directly without needing explicit type conversion.

:p How does the `is` keyword work for pattern matching?
??x
The `is` keyword performs a type check and assigns the value to a new variable if the type matches. For example:
```csharp
if (data[i] is decimal d) {
    total += d;
}
```
In this case, it checks if `data[i]` is of type `decimal`. If true, it assigns that value to the `d` variable and adds its value to `total`.

x??

---


#### Extension Methods in C#
Extension methods allow you to add methods to existing classes without modifying their source code. They are particularly useful when working with third-party libraries where you don't have access to the original class definition.

Syntax for defining an extension method:
```csharp
public static class MyClassExtensions {
    public static void MyMethod(this MyClass obj) { ... }
}
```
The `this` keyword before a parameter in a static method indicates that it is an extension method. You can use these methods as if they were part of the original class.

:p How do you define and call an extension method in C#?
??x
To define an extension method, you declare it within a static class using `this` before the first parameter:
```csharp
public static class MyExtensions {
    public static void AddValue(this ShoppingCart cart) { ... }
}
```
You can then call this method as if it were part of the `ShoppingCart` class:
```csharp
cart.AddValue();
```

x??

---


#### Example of Applying Extension Methods
In the provided example, an extension method was added to the `ShoppingCart` class. The method calculates the total price of all products in the cart.

Code snippet:
```csharp
public static decimal TotalPrices(this ShoppingCart cartParam) {
    decimal total = 0;
    if (cartParam.Products != null) {
        foreach (Product? prod in cartParam.Products) {
            total += prod?.Price ?? 0;
        }
    }
    return total;
}
```

:p How does the extension method `TotalPrices` work?
??x
The `TotalPrices` method iterates through each product in the `Products` collection of a `ShoppingCart`. If a product is not null, it adds its price to the total. If any value might be null, it uses the null-conditional operator `?.` and the null-coalescing operator `??` to handle potential null values.

```csharp
public static decimal TotalPrices(this ShoppingCart cartParam) {
    decimal total = 0;
    if (cartParam.Products != null) { // Ensure Products is not null before iteration
        foreach (Product? prod in cartParam.Products) {
            total += prod?.Price ?? 0; // Add the product's price, or zero if it's null
        }
    }
    return total;
}
```

x??

---

---

