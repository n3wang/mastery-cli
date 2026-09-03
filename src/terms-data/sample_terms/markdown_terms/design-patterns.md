# Design Patterns

Software design patterns and SOLID principles for better code architecture.

## solid

:p What are the SOLID principles? Mention at least 3

**Example:** S - Single-responsiblity Principle     O - Open-closed Principle     L - Liskov Substitution Principle     I - Interface Segregation Principle     D - Dependency Inversion Principle

## Single Responsability Principle

The single responsibility principle provides another substantial benefit. Classes, software components and microservices that have only one responsibility are much easier to explain, understand and implement than the ones that provide a solution for everything.

:p How could you or are using this SOLID principle?

## Specification Pattern

Specification of which objects satisfy certain business rules should be reusable (DRY). In order to do that we will create a class with sole responsibility of determining, whether object satisfies the rules or not.

:p Example usage of this in current and future projects

## Open Closed Principle

The Open/Closed Principle states that software entities (classes, modules, etc.) should be open for extension, but closed for modification. What does this mean, and why is it an important principle of good object-oriented design?
 Open/closed principle is intended to mitigate risk when introducing new functionality. Since you don't modify existing code you can be assured that it wouldn't be broken. It reduces maintenance cost and increases product stability.

:p How could you use this in current/future project, or where have you seen this principle

## Singleton Pattern

Singleton is a creational design pattern that lets you ensure that a class has only one instance, while providing a global access point to this instance.

:p Example usage for this.

## Liskov Substitution Principle

Liskov Substitution Principle (LSP) states that objects of a superclass should be replaceable with objects of its subclasses without breaking the application. 
    
This helps us model good inheritance hierarchies. It helps us prevent model hierarchies that don't conform to the Open/Closed principle. Any inheritance model that adheres to the Liskov Substitution Principle will implicitly follow the Open/Closed principle.

:p How could you use this principle? What could you fix in the future, any of your code is violeting this principle?

## Interface Segregation Principle

Clients should not be forced to depend upon interfaces that they do not use.
Single Responsibility Principle, the goal of the Interface Segregation Principle is to reduce the side effects and frequency of required changes by splitting the software into multiple, independent parts.
Advantages: Doesn't  implement methods we dont need. Increases readability and maintainability of our code.

:p How could you improve your existent code using this principle?

## Dependency Inversion Principle

Depends on the dependency states is that high level classes should not depend on low level but on abstractions. Class with abstract methods. Swap one from the other. Advantages: gives flexibility and stability at the level of the entire architecture of your application. It will allow your application to evolve more securely and stable.
> In the same way that ceo should not double as a truck driver, Higher level clases shouldnt implement low levels classes.

:p What other real life alternatives examples are here? And how can you use this to improve your code?

## Builder Pattern

Builder is a creational design pattern that lets you construct complex objects step by step. The pattern allows you to produce different types and representations of an object using the same construction code.
The Builder pattern suggests that you extract the object construction code out of its own class and move it to separate objects called builders.
Director: You can go further and extract a series of calls to the builder steps you use to construct a product into a separate class called director. The director class defines the order in which to execute the building steps, while the builder provides the implementation for those steps.

**Attachment:** ./img/2023-01-25-15-31-30.png

:p How could you implement this to any of the current projects? What are the advantages? Hypothetical case?

## Factory Pattern

The Factory Method pattern is a design pattern used to create objects. It defines an interface for creating an object, but allows subclasses to alter the type of objects that will be created. 

The Factory Method pattern consists of three parts:

(1) The Creator abstract class, which defines a factory method that returns an object of the Product type.

(2) The ConcreteCreator subclasses, which implement the factory method and return an instance of a ConcreteProduct.

(3) The Product interface, which defines the type of objects that the factory method creates.

The advantage of using the Factory Method pattern is that it allows you to encapsulate the process of creating objects and make it more flexible. Because the client code only interacts with the Creator class through the factory method, it can be changed to create a different type of object without affecting the client code. This can be useful in cases where the type of object to be created is not known until runtime, or where the client code should not be tightly coupled to the classes that are responsible for creating the objects. It also allows to provide a single point of control over the creation process and can add additional functionality such as caching, logging, etc. In summary, the Factory Method pattern is a way to create objects without specifying the exact class of object that will be created, providing a way to centralize and encapsulate the creation process, making it more flexible and maintainable.

**Attachment:** ./img/2023-01-26-10-39-16.png

:p Whats the advantage over Builder Pattern? How can you use it on future/imaginative project?

**Example:** The advantage of the PointFactory over the Builder pattern is that it provides a simple way to create objects without exposing the internal complexity of the object creation process. This can make the code more readable and maintainable, as the client code only needs to call the factory method and does not need to know the details of how the object is created. Additionally, the PointFactory can also provide additional functionality, such as caching or validation, that can make the object creation process more efficient.

## Adapters

The Adapter design pattern is used to convert the interface of one class into another interface that the client expects. Here are some advantages and disadvantages of using adapters:
Advantages:
Improved compatibility: Adapters allow existing classes to work together that couldn't otherwise because of incompatible interfaces.
Increased reusability: Adapters can make it easier to reuse existing code by converting it to a form that is more appropriate for the current application.
Increased flexibility: Adapters can make it easier to change the interface of a class without modifying the class itself.
Loose coupling: Adapters allow the client and adaptee classes to be loosely coupled, so that changes to one class will not affect the other.
Disadvantages:
Increased complexity: Adapters can make the code more complex, especially in large codebases or when multiple adapters are used.
Reduced performance: Adapters can add an additional layer of indirection, which can slow down the performance of the application.
Harder to debug: Adapters can make it harder to debug the application, especially if the adaptee class is not well-documented or is hard to understand.
Limited functionality: Adapters can only convert the interface of a class, they cannot add new functionality to it.

:p How could you use adapters in daily life or in one of your projects?

## The Bridge

The Bridge design pattern is a structural pattern that is used to separate an abstraction from its implementation. It allows the two to evolve independently and provides a way to change the implementation of an abstraction without affecting its clients.
Advantages:
Decoupling: The Bridge pattern decouples the abstraction from the implementation, which makes it easier to change the implementation without affecting the clients.
Increased flexibility: The Bridge pattern allows for the implementation of an abstraction to be changed at runtime, making the code more flexible.
Improved maintainability: The Bridge pattern improves the maintainability of the code by allowing the abstraction and the implementation to evolve independently.
Reducing complexity: The Bridge pattern can be useful in situations where you want to avoid a combinatorial explosion of subclasses.
Disadvantages:
Increased complexity: The Bridge pattern can make the code more complex, especially in large codebases or when multiple bridges are used.
Reduced performance: The Bridge pattern can add an additional layer of indirection, which can slow down the performance of the application.
Limited functionality: The Bridge pattern can only separate the interface and implementation, it cannot add new functionality to it.
Harder to debug: The Bridge pattern can make it harder to debug the application, especially if the implementation class is not well-documented or is hard to understand.

**Example:** the Bridge design pattern is like having a remote control for your TV. The remote control is the abstraction, and the TV is the implementation. The remote control lets you change the channel, turn the volume up and down, and do other things, but it doesn't actually do anything on its own. It just sends signals to the TV, which is the part that actually changes the channel and adjusts the volume.

The remote control and the TV can change independently of each other. For example, you can change the batteries in the remote control without affecting the TV. You can also buy a new TV that has different features, but you can still use your old remote control to control it. This is similar to how the Bridge pattern allows the abstraction and the implementation to evolve independently.

So, the Bridge pattern is a way of connecting two things so they can work together, while still being able to change them independently. It makes the code more flexible and maintainable, but it can also make it more complex.

## Composite Design Pattern

The Composite design pattern is a way to structure a program so that it can have objects that are made up of other objects. Imagine that you have a school project where you have to build a tree out of different materials like paper, cardboard, and glue. The tree is made up of branches and leaves, and each branch is made up of smaller branches and leaves.
It allows you to treat individual objects and compositions of objects in the same way, making it easier to work with complex structures.
It promotes the Single Responsibility Principle by allowing each class to only handle its own specific part of the structure.
It promotes code reusability, as the same classes can be used to create different structures.

Disadvantages of using the Composite design pattern include:
It can make code more complex and harder to understand, especially if there are many levels of nesting in the structure.
It can make it harder to debug the code, because it can be difficult to trace through the structure to find the source of an error.
It can lead to performance issues if the structure is too deep or if there are too many elements in the structure.

:p Where do you think it would make sense to implement such design pattern? What applications?

## Decorator Design Pattern

The Decorator pattern is a way to add new behavior to an object without changing the object's class. Imagine you're a student and you want to decorate a plain notebook with stickers, pictures and drawings. The notebook is your object and the stickers, pictures and drawings are the new behavior you want to add. (The important thing is to make it work at runtime.)

:p Provide an example of how could you use this Design Pattern?

## Proxy Pattern

A class that functions as an interface to a particular resource. That resource may be remote, expensive to construct, or may require logging or some other functionality.

:p Name an example in how you could use this pattern on

**Example:** Creating a protection proxy: For protecting business logic

## Promises vs Observables

Promise: 
provides a single future value, is not lazy, can not be cancelled.


Observable: 
provides multiple future values, is lazy, can be cancelled.

:p When would you use one over the other? What are the advantages and disadvantages of each?

**Example:** Use promises for populating a site page statically, or get a report, while if you want a dynamic page, or a stream of data, use observables.