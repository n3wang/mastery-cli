---
tags:
  - software-engineer
  - java
---

### 1. **Overloading vs Overriding**
**Prompt:**  
Describe the difference between method overloading and method overriding in Java.  
?x
**Description:**  
Overloading occurs when multiple methods with the same name but different parameter lists exist in the same class. Overriding occurs when a subclass provides a specific implementation of a method already defined in the parent class.
**Overloading Example**
```java
class Sample {
    void display(int num) {
        System.out.println("Integer: " + num);
    }

    void display(String str) {
        System.out.println("String: " + str);
    }
}
```
**Overriding Example**
```java
class Parent {
    void display() {
        System.out.println("Parent display");
    }
}

class Child extends Parent {
    @Override
    void display() {
        System.out.println("Child display");
    }
}
```

### 2. **Final Keyword (Final Method, Final Class, Final Variable)**
**Prompt:**  
What is the significance of the `final` keyword in Java?  
?x
**Description:**  
The `final` keyword is used to define constants, prevent method overriding, and prevent inheritance of classes. When applied to a variable, the value cannot be changed after initialization; when applied to a method, the method cannot be overridden; and when applied to a class, the class cannot be subclassed.
**Final Variable Example**
```java
final int MAX_VALUE = 100;
```
**Final Method Example**
```java
class Base {
    final void show() {
        System.out.println("Final method in Base class");
    }
}

class Derived extends Base {
    // Error: Cannot override final method
    // void show() {}
}
```
**Final Class Example**
```java
final class FinalClass {
    // Cannot inherit from final class
}

class Derived extends FinalClass {} // Error: Cannot inherit from final class
```

### 3. **Static vs Instance Variables**
**Prompt:**  
Explain the difference between static and instance variables in Java.  
?X
**Description:**  
A static variable is shared among all instances of a class and belongs to the class itself, while an instance variable belongs to an individual instance of the class. Static variables retain their values across different objects, whereas instance variables are initialized separately for each object.
**Static Variable Example**
```java
class Example {
    static int count = 0;

    Example() {
        count++;
    }

    public static void main(String[] args) {
        new Example();
        new Example();
        System.out.println("Count: " + count);  // Output: Count: 2
    }
}
```
**Instance Variable Example**
```java
class Example {
    int count = 0;

    Example() {
        count++;
    }

    public static void main(String[] args) {
        Example obj1 = new Example();
        Example obj2 = new Example();
        System.out.println("Count for obj1: " + obj1.count);  // Output: Count for obj1: 1
        System.out.println("Count for obj2: " + obj2.count);  // Output: Count for obj2: 1
    }
}
```

### 4. **Access Modifiers (public, protected, default, private)**
**Prompt:**  
What are the different access modifiers in Java and how do they work?  
?x
**Description:**  
Access modifiers control the visibility of variables, methods, and classes. `public` allows access from anywhere, `private` restricts access within the same class, `protected` allows access within the same package or subclasses, and the default modifier allows access within the same package.
```java
class A {
    public int publicVar = 1;
    protected int protectedVar = 2;
    int defaultVar = 3;
    private int privateVar = 4;
}
```

### 5. **Constructor Overloading**
**Prompt:**  
What is constructor overloading in Java?  
?x
**Description:**  
Constructor overloading occurs when multiple constructors with different parameter lists exist in the same class. This allows an object to be initialized in different ways based on the parameters passed.
```java
class OverloadConstructor {
    OverloadConstructor() {
        System.out.println("Default Constructor");
    }

    OverloadConstructor(int a) {
        System.out.println("Constructor with int: " + a);
    }

    public static void main(String[] args) {
        new OverloadConstructor();
        new OverloadConstructor(5);
    }
}
```

### 6. **Abstract Class vs Interface**
**Prompt:**  
What is the difference between an abstract class and an interface in Java?  
?x
**Description:**  
An abstract class can have both abstract methods (without implementation) and concrete methods (with implementation), while an interface can only have abstract methods (prior to Java 8). Abstract classes allow partial implementation, whereas interfaces enforce a contract for implementation.
**Abstract Class Example**
```java
abstract class Animal {
    abstract void sound();

    void sleep() {
        System.out.println("Animal is sleeping");
    }
}

class Dog extends Animal {
    void sound() {
        System.out.println("Bark");
    }
}
```
**Interface Example**
```java
interface Animal {
    void sound();
}

class Dog implements Animal {
    public void sound() {
        System.out.println("Bark");
    }
}
```

### 7. **Method Signature (Overloading & Overriding)**
**Prompt:**  
Explain method signatures and how they relate to overloading and overriding.  
?x
**Description:**  
In method overloading, methods with the same name but different parameter types or numbers are allowed. In method overriding, the method signature must be identical to the one in the superclass, including the method name and parameter list.
```java
class Base {
    void print(int a) {
        System.out.println("Integer: " + a);
    }
}

class Derived extends Base {
    @Override
    void print(double a) {  // Overridden method (signature differs from Base)
        System.out.println("Double: " + a);
    }
}
```

### 8. **Static Method and Instance Method (Calling Order)**
**Prompt:**  
What is the difference between static and instance methods in terms of calling and behavior?  
?x
**Description:**  
Static methods are called on the class itself, while instance methods require an object to be invoked. Static methods cannot access instance variables or methods, but they can access other static variables and methods.
```java
class Example {
    static void staticMethod() {
        System.out.println("Static method");
    }

    void instanceMethod() {
        System.out.println("Instance method");
    }

    public static void main(String[] args) {
        Example obj = new Example();
        obj.instanceMethod();
        staticMethod();
    }
}
```

### 9. **Super Keyword**
**Prompt:**  
How is the `super` keyword used in Java?  
?x
**Description:**  
The `super` keyword is used to refer to the superclass of the current object. It can be used to access parent class constructors, methods, and fields.
```java
class Parent {
    int value = 10;
}

class Child extends Parent {
    int value = 20;

    void display() {
        System.out.println("Parent value: " + super.value); //10
        System.out.println("Child value: " + this.value); //20
    }
}
```

### 10. **This Keyword**
**Prompt:**  
What is the purpose of the `this` keyword in Java?  
?x
**Description:**  
The `this` keyword refers to the current instance of the class. It is used to differentiate between instance variables and local variables when they have the same name and to invoke other constructors in the same class.

```java
class Example {
    int value;

    Example(int value) {
        this.value = value;
    }

    void display() {
        System.out.println("Value: " + this.value);
    }

    public static void main(String[] args) {
        Example obj = new Example(5);
        obj.display();
    }
}
```

### 11. **Instance Initialization Block**
**Prompt:**  
What is an instance initialization block in Java?  
?x
**Description:**  
An instance initialization block is used to initialize instance variables. It runs before the constructor is invoked when an object is created.

```java
class Example {
    int value;

    {
        value = 10;
    }

    Example() {
        System.out.println("Constructor executed");
    }

    public static void main(String[] args) {
        Example obj = new Example();
        System.out.println("Value: " + obj.value);
    }
}
```

### 12. **Thread Synchronization**

**Prompt:**  
What is thread synchronization in Java and why is it needed?  
?x
**Description:**  
Thread synchronization ensures that only one thread can access a shared resource at a time, preventing data inconsistency. This is crucial in multi-threaded applications to avoid race conditions.

```java
class Counter {
    private int count = 0;

    synchronized void increment() {
        count++;
    }

    synchronized void decrement() {
        count--;
    }
}
```

### 13. **Exception Handling (Try-Catch-Finally)**

**Prompt:**  
Explain how exception handling works in Java with the use of `try`, `catch`, and `finally`.  
?x
**Description:**  
The `try` block contains code that might throw an exception, the `catch` block handles exceptions, and the `finally` block is executed regardless of whether an exception occurs.
```java
try {
    int result = 10 / 0;
} catch (ArithmeticException e) {
    System.out.println("Exception: " + e.getMessage());
} finally {
    System.out.println("Finally block executed");
}
```

### 14. **Method References**

**Prompt:**  
What are method references in Java?  
?x
**Description:**  
Method references provide a shorthand for invoking a method by referring to it with the help of a lambda expression. They are more concise and can improve readability.
```java
class Example {
    static void printMessage(String message) {
        System.out.println(message);
    }

    public static void main(String[] args) {
        // Using method reference
        Example.printMessage("Hello");
    }
}
```

### 15. **Lambda Expressions**

**Prompt:**  
What is a lambda expression in Java, and when should it be used?  
?x
**Description:**  
Lambda expressions provide a concise way to represent an anonymous function (or a method) in a functional style. They are useful for passing behavior as parameters to methods, especially in contexts like the Java Streams API.
```java
interface Example {
    void showMessage();
}

class Main {
    public static void main(String[] args) {
        Example example = () -> System.out.println("Hello from Lambda");
        example.showMessage();
    }
}
```

### 16. **Enum**

**Prompt:**  
What is an `enum` in Java, and how does it work?  
?x
**Description:**  
An `enum` is a special class that represents a group of constants. It is used when a variable can only take one of a predefined set of values.
```java
enum Day {
    MONDAY, TUESDAY, WEDNESDAY;
}

class Main {
    public static void main(String[] args) {
        Day day = Day.MONDAY;
        System.out.println(day);
    }
}
```

### 17. **Varargs (Variable Arguments)**

**Prompt:**  
What is a varargs parameter in Java, and how does it work?  
?x
**Description:**  
Varargs allows a method to accept a variable number of arguments of a specified type. The arguments are passed as an array inside the method.
```java
class Example {
    static void printNumbers(int... numbers) {
        for (int num : numbers) {
            System.out.println(num);
        }
    }

    public static void main(String[] args) {
        printNumbers(1, 2, 3, 4, 5);
    }
}
```

### 18. **Inner Class (Non-static)**

**Prompt:**  
What is a non-static inner class in Java? 
?x
**Description:**  
A non-static inner class is associated with an instance of the outer class and has access to its instance variables and methods.
```java
class Outer {
    int value = 10;

    class Inner {
        void display() {
            System.out.println("Value: " + value);
        }
    }
}

class Main {
    public static void main(String[] args) {
        Outer outer = new Outer();
        Outer.Inner inner = outer.new Inner();
        inner.display();
    }
}
```

### 19. **Static Nested Class**

**Prompt:**  
What is a static nested class in Java?  
?x
**Description:**  
A static nested class is a nested class that does not require an instance of the outer class to be created. It can access only static members of the outer class.
```java
class Outer {
    static int value = 10;

    static class Inner {
        void display() {
            System.out.println("Value: " + value);
        }
    }
}

class Main {
    public static void main(String[] args) {
        Outer.Inner inner = new Outer.Inner();
        inner.display();
    }
}
```

### 20. **Cloneable Interface**

**Prompt:**  
What is the `Cloneable` interface and how is it used in Java?  
?x
**Description:**  
The `Cloneable` interface is used to indicate that a class allows objects of that class to be cloned. If a class does not implement `Cloneable` and an attempt is made to clone an object, a `CloneNotSupportedException` is thrown.
```java
class Person implements Cloneable {
    String name;

    Person(String name) {
        this.name = name;
    }

    @Override
    protected Object clone() throws CloneNotSupportedException {
        return super.clone();
    }

    public static void main(String[] args) throws CloneNotSupportedException {
        Person person1 = new Person("John");
        Person person2 = (Person) person1.clone();
        System.out.println(person2.name);
    }
}
```