# High-Quality Flashcards: 10A006---Java-Cookbook---Ian-F-Darwin_processed (Part 13)


**Starting Chapter:** 7.7 Eschewing Duplicates with a Set. Problem. Solution. 7.8 Structuring Data in a Linked List

---


#### Set Interface Overview
Background context: The `Set` interface is a part of Java's Collection framework and provides an unordered collection with unique elements. It does not allow duplicate values, unlike the `List` which maintains order but allows duplicates.

:p What distinguishes a `Set` from a `List` in terms of storing data?
??x
A `Set` enforces uniqueness by ensuring that no two objects are equal as determined by their `equals()` method. In contrast, a `List` can contain duplicate elements and retains the order in which they are added.

The key difference is that a `Set` does not support index-based operations like `add(int, Object)` or `get(int)`, because knowing how many unique items there are might not match the number of total additions if duplicates were present. 

Code example:
```java
// Example usage of Set
Set<String> hashSet = new HashSet<>();
hashSet.add("One");
hashSet.add("Two");
hashSet.add("One"); // Duplicate, but only one "One" is added
hashSet.add("Three");

for (String s : hashSet) {
    System.out.println(s);
}
```
x??

---

#### Adding Elements to a Set
:p How do you add elements to a `Set` in Java?
??x
You can use the `add()` method of the `Set` interface to insert elements. The `add()` method returns `true` if the element was not already present and `false` otherwise, due to the uniqueness constraint.

Code example:
```java
Set<String> hashSet = new HashSet<>();
hashSet.add("One");
hashSet.add("Two");
hashSet.add("One"); // Duplicate, but only one "One" is added
hashSet.add("Three");

System.out.println(hashSet); // Output: [One, Two, Three]
```
x??

---

#### Checking for Duplicates in a Set
:p How can you check if an element already exists in a `Set`?
??x
You can use the `contains()` method to determine whether a set contains a particular element. This method checks the existence of elements based on their equality as determined by the `equals()` and `hashCode()` methods.

Code example:
```java
Set<String> hashSet = new HashSet<>();
hashSet.add("One");
hashSet.add("Two");
System.out.println(hashSet.contains("Three")); // Output: false

// Adding a duplicate
System.out.println(hashSet.contains("One")); // Output: true
```
x??

---

#### Set Operations and Methods
:p What are some common methods available in the `Set` interface?
??x
The `Set` interface provides several key methods, including:

- `add(E e)`: Adds an element to the set.
- `remove(Object o)`: Removes a specified element from this set if it is present.
- `contains(Object o)`: Returns true if this set contains the specified element.
- `size()`: Returns the number of elements in this set (the cardinality).
- `isEmpty()`: Returns true if this set contains no elements.

Code example:
```java
Set<String> hashSet = new HashSet<>();
hashSet.add("One");
hashSet.remove("Two"); // Removing an element that was not added, so nothing happens

System.out.println(hashSet.size()); // Output: 1
System.out.println(hashSet.isEmpty()); // Output: false
```
x??

---

#### Mutable Objects in a Set
:p What precautions should be taken when using mutable objects as elements in a `Set`?
??x
When using mutable objects as elements in a `Set`, care must be exercised because the behavior of the set is not specified if the value of an object is changed in a manner that affects `equals()` comparisons while the object is an element in the set. This can lead to unpredictable results.

For example, modifying any field of the object that contributes to its hash code or equality check (as determined by `equals()`) can cause issues with the set's internal operations.

Code example:
```java
class MutableObject {
    private String value;

    public MutableObject(String value) {
        this.value = value;
    }

    @Override
    public boolean equals(Object obj) {
        if (!(obj instanceof MutableObject)) return false;
        return ((MutableObject) obj).value.equals(value);
    }

    @Override
    public int hashCode() {
        return value.hashCode();
    }
}

Set<MutableObject> set = new HashSet<>();
set.add(new MutableObject("one"));
// Modifying the object while it's in the set can cause issues
((MutableObject)set.iterator().next()).value = "two";
```
x??

---


#### Linked List Implementation Issues
Background context: The provided Java code snippet shows an incomplete implementation of a linked list. It includes methods for accessing elements and converting to arrays but does not use `java.util.LinkedList`. This example is intended to highlight common issues and differences from using the standard library's implementation.
:p What are the problems with directly implementing a linked list as shown in the code?
??x
The code directly implements basic operations of a linked list without leveraging the standard `java.util.LinkedList` class. Direct implementations often lead to issues such as:
- Potential memory leaks due to improper handling of nodes.
- Lack of built-in methods that would be provided by `LinkedList`, such as add, remove, and clear operations.
- Inefficient manipulation of the list, especially when trying to maintain order or handle concurrent access.

Using `java.util.LinkedList` ensures better performance, safety, and ease of use with its rich set of methods and thread-safety features.
x??

---

#### Using HashMap for Mapping
Background context: The text discusses using a `HashMap` to establish one-way mappings between different objects. It provides an example where company names are mapped to their addresses.
:p How does the `HashMap` class help in creating one-way mappings?
??x
The `HashMap` class helps create one-way mappings by providing key-value pairs, where keys and values can be of any object type. This is useful for scenarios like mapping user inputs (keys) to corresponding actions or data (values).

For example:
```java
Map<String, String> map = new HashMap<>();
map.put("Adobe", "Mountain View, CA");
```
Here, `"Adobe"` is the key and `"Mountain View, CA"` is the value. This structure allows for efficient lookups where you can retrieve the address by providing the company name as a key.
x??

---

#### Retrieval from HashMap
Background context: The text demonstrates retrieving values from a `HashMap` using different methods such as direct key lookup and iterating over all entries.
:p How can you retrieve a single value from a `HashMap` given its key?
??x
You can retrieve a single value from a `HashMap` by calling the `get()` method with the corresponding key. This method returns the value associated with the specified key, or null if no mapping for the key is present.

Example:
```java
String queryString = "O'Reilly";
String resultString = map.get(queryString);
System.out.println("They are located in: " + resultString);
```
This code retrieves the address associated with the company name `"O'Reilly"` and prints it.
x??

---

#### Iterating Over HashMap Entries
Background context: The text explains how to iterate over all entries in a `HashMap` using both traditional for-loops and lambda expressions.
:p How can you print all key-value pairs from a `HashMap`?
??x
You can print all key-value pairs from a `HashMap` by iterating over its entry set. This can be done with either a traditional for-loop or a stream-based approach using lambda expressions.

Example:
```java
// Using a for-each loop
for (String key : map.keySet()) {
    System.out.println("Key " + key + "; Value " + map.get(key));
}

// Using a forEach() method and lambda expression
map.entrySet().forEach(mE -> 
    System.out.println("Key: " + mE.getKey() + "; Value: " + mE.getValue()));
```
These methods ensure that all entries are printed, allowing for easy data retrieval or report generation.
x??

---

#### Concurrent Modification Handling
Background context: The text mentions the importance of handling concurrent modifications when iterating over a `HashMap`.
:p What happens if you modify a `HashMap` while iterating through it?
??x
If you attempt to modify a `HashMap` (such as adding, removing, or clearing elements) while iterating through it using an iterator, and the iteration itself is not controlled explicitly, a `ConcurrentModificationException` will be thrown.

To avoid this exception, you should use the explicit iterator methods provided by `HashMap`. For example:
```java
Iterator<String> it = map.keySet().iterator();
while (it.hasNext()) {
    // Perform some operation on key or value
}
```
This approach ensures that modifications are handled safely during iteration.
x??

---


#### Natural Ordering and Comparable Interface
Background context explaining that the `Comparable` interface allows objects to be sorted based on their natural ordering, which should be consistent with the `equals()` method. The `compareTo()` method is used for comparison.
:p What does the `Comparable` interface enable in Java?
??x
The `Comparable` interface enables objects to define a natural ordering that can be used for sorting and comparing. This is achieved through the implementation of the `compareTo()` method, which compares two instances of the class.
??x
```java
// Example of a simple Comparable implementation
public class Person implements Comparable<Person> {
    private String name;
    private int age;

    @Override
    public int compareTo(Person other) {
        return this.age - other.age; // Sorting by age in ascending order
    }
}
```
x??

---

#### Consistency Between `equals()` and `compareTo()`
Background context on the importance of ensuring that the `compareTo()` method is consistent with the `equals()` method. This means if two objects are equal, they should compare as equal.
:p How does the documentation recommend implementing `Comparable` for natural ordering to be consistent with `equals()`?
??x
The documentation recommends that a class’s natural ordering (implemented via `Comparable`) must be consistent with its `equals()` method. Specifically, if two instances of a class are considered equal by `equals()`, their `compareTo()` should return zero.
??x
```java
// Example to ensure compareTo is consistent with equals()
public int compareTo(Person other) {
    if (this.equals(other)) { // Check using equals first
        return 0; // If equals, must return 0 for compareTo
    }
    // Further comparison logic
}
```
x??

---

#### Implementing `equals()` and `hashCode()`
Background context on the relationship between `equals()` and `hashCode()`. The documentation suggests that if a class implements `equals()`, it should also implement `hashCode()` to ensure consistency.
:p Why is implementing `hashCode()` recommended when using `equals()`?
??x
Implementing `hashCode()` is recommended when using `equals()` because of the general contract between these two methods. According to Java's API documentation, if two objects are equal (`equals()` returns true), they must have the same hash code (`hashCode()`). This ensures that objects can be correctly placed in hash-based collections like HashMap and HashSet.
??x
```java
// Example implementing hashCode() with equals()
@Override
public int hashCode() {
    int result = 17;
    result = 31 * result + name.hashCode();
    result = 31 * result + age;
    return result;
}
```
x??

---

#### Custom Comparison Logic in `Appt` Class
Background context on the complexity of comparison logic when dealing with multiple fields. In this example, the `Appt` class compares appointments based on date and time (if available), followed by text.
:p How does the `Appt` class handle complex comparisons?
??x
The `Appt` class handles complex comparisons by breaking down the comparison into smaller parts:
1. First, it compares dates. If the dates are different, it returns the result of comparing those dates.
2. If the dates are the same, it then checks times. Only if both times are non-null does it compare them.
3. If only one time is null or none are set, additional logic determines which appointment should come first (all-day appointments sort low).
4. Finally, if all else fails and dates/times are identical, it compares the text.
??x
```java
@Override
public int compareTo(Appt a2) {
    // Compare dates first
    int dateComp = date.compareTo(a2.date);
    if (dateComp != 0) return dateComp;

    // Dates are the same. Compare times next
    if (time != null && a2.time != null) {
        int timeComp = time.compareTo(a2.time);
        if (timeComp != 0) return timeComp;
    } else if (time == null && a2.time != null) {
        return -1; // All-day appts sort low
    } else if (a2.time == null && time != null) {
        return +1; // Non-all-day appt sorts high
    }

    // Dates and times are the same. Compare text
    return text.compareTo(a2.text);
}
```
x??

---

#### `hashCode()` Implementation for `Appt` Class
Background context on how `hashCode()` is implemented to ensure consistent behavior with `equals()`. The `hashCode()` method must be carefully crafted to handle nulls and use appropriate hash codes.
:p How does the `Appt` class implement its `hashCode()`?
??x
The `Appt` class implements its `hashCode()` by using a prime number multiplier (31) to combine the hash codes of non-null fields. It ensures that null values are handled appropriately, avoiding potential issues with null references.
??x
```java
@Override
public int hashCode() {
    final int prime = 31;
    int result = 1;
    result = prime * result + ((date == null) ? 0 : date.hashCode());
    result = prime * result + ((text == null) ? 0 : text.hashCode());
    result = prime * result + ((time == null) ? 0 : time.hashCode());
    return result;
}
```
x??

---

