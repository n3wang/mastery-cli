---
tags:
  - software-engineer
---



**String to int**  
?x  
`Integer.parseInt(s);`  
// Converts a String to an int primitive.

**String to Integer**  
?x  
`Integer.valueOf(s);`  
// Converts a String to an Integer object.

**int to String**  
?x  
`String.valueOf(int);`  
// Converts an int primitive to a String.

**char[] to String**  
?x  
`String str = new String(chArray);`  
// Converts a char array to a String.

**list to array**  
?x  
`String[] arr = list.toArray(new String[list.size()]);`  
// Converts a List to an array.

**array to list**  
?x  
`List<String> list = Arrays.asList(arr);`  
// Converts an array to a List. Can also be used for single-element arrays, e.g., `Arrays.asList("first", "second");`.


---

Here are the flashcards with more detailed explanations and examples:

**s.charAt(i)**  
?x  
Returns the character at index `i` in String `s`.  
Example:
```java
String s = "a*b*c";
char c = s.charAt(2);  // Returns 'b', as the character at index 2 is 'b'.
```

**s.length()**  
?x  
Returns the length of the String `s`. This represents the total number of characters in the string.  
Example:
```java
String s = "a*b*c";
int len = s.length();  // Returns 5, since the string contains 5 characters: "a", "*", "b", "*", "c".
```


Returns a substring from index 0 to index 1 (exclusive) in String `s`. The substring will contain only the character at index 0.  
?x  
**s.substring(0, 1)**  
Returns a substring from index 0 to index 1 (exclusive) in String `s`. The substring will contain only the character at index 0.  
Example:
```java
String s = "a*b*c";
String sub = s.substring(0, 1);  // Returns "a", the substring from index 0 to 1.
```

**s.substring(1)**  
?x  
Returns a substring starting from index 1 to the end of String `s`.  
Example:
```java
String s = "a*b*c";
String sub = s.substring(1);  // Returns "*b*c", starting from index 1 to the end.
```

**s.equals("b")**  
?x  
Compares String `s` with the string "b" for equality. Returns `true` if both strings are identical, otherwise `false`.  
Example:
```java
String s = "a*b*c";
boolean isEqual = s.equals("b");  // Returns false, because "a*b*c" is not equal to "b".
```

**s.compareTo("b_c_d")**  
?x  
Compares String `s` lexicographically with "b_c_d". It returns a negative number if `s` comes before "b_c_d" in lexicographical order, zero if they are equal, and a positive number if `s` comes after.  
Example:
```java
String s = "a*b*c";
int result = s.compareTo("b*c*d");  // Returns -1, because "a*b*c" comes before "b*c*d".
```

**s.trim()**  
?x  
Removes any leading and trailing spaces from String `s`.  
Example:
```java
String s = "  hello world  ";
String trimmed = s.trim();  // Returns "hello world", with spaces removed.
```

**s.indexOf("a")**  
?x  
Returns the first index of the substring "a" within String `s`. If "a" is not found, it returns -1.  
Example:
```java
String s = "a*b*c";
int index = s.indexOf("a");  // Returns 0, because "a" is at index 0.
```

**s.indexOf('a', 2)**  
?x  
Returns the index of character `'a'` starting from the given index `2`. If `'a'` is not found after index 2, it returns -1.  
Example:
```java
String s = "a*b*c";
int index = s.indexOf('a', 2);  // Returns -1, because there is no 'a' after index 2.
```

**s.lastIndexOf('a')**  
?x  
Returns the last index of character `'a'` in String `s`. If `'a'` is not found, it returns -1.  
Example:
```java
String s = "a*b*a*c";
int index = s.lastIndexOf('a');  // Returns 4, as the last occurrence of 'a' is at index 4.
```

**s.replaceAll(substr, target)**  
?x  
Replaces all occurrences of the substring `substr` with `target` in String `s`.  
Example:
```java
String s = "a*b*c*a";
String result = s.replaceAll("\\*", "-");  // Replaces all '*' with '-', returns "a-b-c-a".
```

**s.toCharArray()**  
?x  
Converts String `s` into a char array.  
Example:
```java
String s = "a*b*c";
char[] arr = s.toCharArray();  // Returns a char array: ['a', '*', 'b', '*', 'c'].
```

**s.split("\*")**  
?x  
Splits String `s` by the delimiter `"*"`. It returns an array of substrings.  
Example:
```java
String s = "a*b*c";
String[] arr = s.split("\\*");  // Returns an array: ["a", "b", "c"].
```

**s.split("\.")**  
?x  
Splits String `s` by the delimiter `"."`. It returns an array of substrings.  
Example:
```java
String s = "a.b.c";
String[] arr = s.split("\\.");  // Returns an array: ["a", "b", "c"].
```

**String.join(delimiter, List data)**  
?x  
Concatenates the strings in `data` using `delimiter` as a separator.  
Example:
```java
List<String> data = Arrays.asList("a", "b", "c");
String result = String.join("-", data);  // Returns "a-b-c", with '-' as the delimiter.
```

**Objects.equals(Object a, Object b)**  
?x  
Compares two objects `a` and `b`. It returns `true` if both are equal or both are `null`.

- (1) If both are `null`, returns `true`.
- (2) If exactly one is `null`, returns `false`.
- (3) Otherwise, it calls `a.equals(b)`.  
    Example:
```java
Object obj1 = "hello";
Object obj2 = "hello";
boolean isEqual = Objects.equals(obj1, obj2);  // Returns true, because both objects are equal.

Object obj3 = null;
boolean isNullEqual = Objects.equals(obj3, null);  // Returns true, because both are null.
```


### String Builder

Here are the updated flashcards following your requested format:

**Creates a new StringBuilder instance.**  
?x
```java
StringBuilder sb = new StringBuilder();
```
This initializes an empty `StringBuilder` instance which can be used to efficiently modify strings by appending, inserting, deleting, or reversing characters.  
Example:
```java
StringBuilder sb = new StringBuilder();  // Creates an empty StringBuilder.
```

---

**Appends the string "a" to the end of the StringBuilder.**  
?x
```java
sb.append("a");
```
This method adds the string `"a"` to the end of the current `StringBuilder` content.  
Example:
```java
StringBuilder sb = new StringBuilder("b");
sb.append("a");  // Returns "ba", appends "a" to the end.
```

---

**Inserts the string "a" at index 0 in the StringBuilder.**  
?x
```java
sb.insert(0, "a");
```
This method inserts the string `"a"` at the specified index `0` in the `StringBuilder`. It shifts existing characters to the right.  
Example:
```java
StringBuilder sb = new StringBuilder("bcd");
sb.insert(0, "a");  // Returns "abcd", inserts "a" at the start.
```

---

**Deletes the character at the specified index in the StringBuilder.**  
?x
```java
sb.deleteCharAt(index);
```
This method removes the character at the given `index` in the `StringBuilder`. It does not return a new object, it modifies the existing `StringBuilder`.  
Example:
```java
StringBuilder sb = new StringBuilder("abcd");
sb.deleteCharAt(2);  // Returns "abd", removes the character at index 2 ('c').
```

---

**Reverses the characters in the StringBuilder.**  
?x
```java
sb.reverse();
```
This method reverses the sequence of characters in the `StringBuilder`.  
Example:
```java
StringBuilder sb = new StringBuilder("abcd");
sb.reverse();  // Returns "dcba", the characters are reversed.
```

---

**Converts the StringBuilder to a regular String.**  
?x
```java
sb.toString();
```
This method converts the current `StringBuilder` into a standard `String`.  
Example:
```java
StringBuilder sb = new StringBuilder("abc");
String result = sb.toString();  // Returns "abc", converts StringBuilder to String.
```

---

**Returns the number of characters in the StringBuilder.**  
?x
```java
sb.length();
```
This method returns the number of characters currently stored in the `StringBuilder`. It is similar to calling `length()` on a `String`.  
Example:
```java
StringBuilder sb = new StringBuilder("abc");
int length = sb.length();  // Returns 3, as there are 3 characters.
```

### Hashsets

**Creates a new HashMap with Character keys and Integer values.**  
?x
```java
HashMap<Character, Integer> map = new HashMap<Character, Integer>();
```
This initializes an empty `HashMap` where keys are `Character` and values are `Integer`.  
Example:
```java
HashMap<Character, Integer> map = new HashMap<>();  // Creates an empty HashMap with Character keys and Integer values.
```

---

**Puts a key-value pair into the HashMap.**  
?x
```java
map.put('c', 1);
```
This method adds the key `'c'` with value `1` to the `HashMap`.  
Example:
```java
map.put('c', 1);  // Adds 'c' as the key with 1 as the value.
```

---

**Gets the value associated with the given key from the HashMap.**  
?x
```java
map.get('c');
```
This method retrieves the value associated with key `'c'` from the `HashMap`.  
Example:
```java
int value = map.get('c');  // Returns 1 if 'c' exists in the map.
```

---

**Returns the value associated with the key, or a default value if the key doesn't exist.**  
?x
```java
map.getOrDefault(key, defaultValue);
```
This method returns the value if the key exists, otherwise returns `defaultValue`.  
Example:
```java
int value = map.getOrDefault('d', -1);  // Returns -1 since 'd' is not in the map.
```

---

**Removes the key-value pair associated with the given key.**  
?x
```java
map.remove('c');
```
This method removes the entry for the key `'c'` from the `HashMap`.  
Example:
```java
map.remove('c');  // Removes the key-value pair for 'c'.
```

---

**Computes the value for the key if absent, or returns the existing value.**  
?x
```java
map.computeIfAbsent(key, mappingFunction);
```
This method computes the value for the specified key using `mappingFunction` if the key does not exist in the map.  
Example:
```java
map.computeIfAbsent('c', k -> 2);  // Adds 'c' with value 2 if 'c' doesn't exist in the map.
```

---

**Adds a value to the collection created for the key using computeIfAbsent.**  
?x
```java
map.computeIfAbsent(key, k -> new HashSet<>()).add(val);
```
This method ensures a `HashSet` is created for the key if it does not exist, then adds the value `val` to that set.  
Example:
```java
map.computeIfAbsent('c', k -> new HashSet<>()).add(3);  // Adds 3 to the HashSet for 'c'.
```

---

**Adds a value to the list created for the key using computeIfAbsent.**  
?x
```java
map.computeIfAbsent(key, k -> new ArrayList<>()).add(val);
```
This method ensures an `ArrayList` is created for the key if it does not exist, then adds the value `val` to that list.  
Example:
```java
map.computeIfAbsent('c', k -> new ArrayList<>()).add(3);  // Adds 3 to the ArrayList for 'c'.
```

---

**Checks if the given key exists in the map.**  
?x
```java
if (map.containsKey('c')) {
}
```
This checks whether the key `'c'` exists in the `HashMap`.  
Example:
```java
if (map.containsKey('c')) {  // Executes if 'c' is a key in the map.
    System.out.println("Key 'c' exists.");
}
```

---

**Checks if the given value exists in the map.**  
?x
```java
if (map.containsValue(1)) {
}
```
This checks whether the value `1` exists in the `HashMap`.  
Example:
```java
if (map.containsValue(1)) {  // Executes if 1 is a value in the map.
    System.out.println("Value 1 exists.");
}
```

---

**Traverses and prints all keys in the map.**  
?x
```java
for (Character d : map.keySet()) {
}
```
This loop iterates over all the keys in the `HashMap`.  
Example:
```java
for (Character d : map.keySet()) {
    System.out.println(d);  // Prints each key in the map.
}
```

---

**Traverses and prints all values in the map.**  
?x
```java
for (Integer i : map.values()) {
}
```
This loop iterates over all the values in the `HashMap`.  
Example:
```java
for (Integer i : map.values()) {
    System.out.println(i);  // Prints each value in the map.
}
```

---

**Traverses and prints both keys and values in the map.**  
?x
```java
for (Map.Entry<Character, Integer> entry : map.entrySet()) {
    entry.getKey();
    entry.getValue();
}
```
This loop iterates over each key-value pair in the `HashMap`.  
Example:
```java
for (Map.Entry<Character, Integer> entry : map.entrySet()) {
    System.out.println("Key: " + entry.getKey() + ", Value: " + entry.getValue());
}
```

---

**Traverses and prints key-value pairs using lambda expression.**  
?x
```java
map.forEach((k, v) -> System.out.println("key: " + k + " value:" + v));
```
This method uses a lambda expression to traverse and print key-value pairs in the map.  
Example:
```java
map.forEach((k, v) -> System.out.println("key: " + k + " value:" + v));
```

---

**Checks if the map is empty.**  
?x
```java
map.isEmpty();
```
This method returns `true` if the `HashMap` is empty, otherwise `false`.  
Example:
```java
boolean empty = map.isEmpty();  // Returns true if map is empty.
```

---

**Returns the number of entries in the map.**  
?x
```java
map.size();
```
This method returns the number of key-value pairs in the `HashMap`.  
Example:
```java
int size = map.size();  // Returns the number of key-value pairs in the map.
```

---

**Creates a new HashSet and adds a value to it.**  
?x
```java
HashSet<Integer> set = new HashSet<Integer>();
set.add(10);
```
This creates a new `HashSet` and adds the value `10`.  
Example:
```java
HashSet<Integer> set = new HashSet<>();
set.add(10);  // Adds 10 to the set.
```

---

**Removes a value from the HashSet.**  
?x
```java
set.remove(10);
```
This removes the value `10` from the `HashSet`.  
Example:
```java
set.remove(10);  // Removes 10 from the set.
```

---

**Checks if a value exists in the HashSet.**  
?x
```java
if (set.contains(10)) {
}
```
This checks whether the value `10` exists in the `HashSet`.  
Example:
```java
if (set.contains(10)) {  // Executes if 10 is in the set.
    System.out.println("10 is in the set.");
}
```

---

**Returns the number of elements in the HashSet.**  
?x
```java
set.size();
```
This returns the number of elements in the `HashSet`.  
Example:
```java
int size = set.size();  // Returns the number of elements in the set.
```

---

**Checks if the HashSet is empty.**  
?x
```java
set.isEmpty();
```
This method returns `true` if the `HashSet` is empty, otherwise `false`.  
Example:
```java
boolean empty = set.isEmpty();  // Returns true if the set is empty.
```

---

**Keeps the intersection of two sets in setA.**  
?x
```java
setA.retainAll(setB);
```

This keeps only the elements that are present in both `setA` and `setB`.  
Example:

```java
setA.retainAll(setB);  // Retains only the common elements between setA and setB.
```

---

**Removes elements in setC from setB.**  
?x
```java
setB.removeAll(setC);
```

This removes all elements in `setC` from `setB`.  
Example:

```java
setB.removeAll(setC);  // Removes elements in setC from setB.
```

---

**Unites two sets, adding elements of setD to setC.**  
?x
```java
setC.addAll(setD);
```

This adds all elements of `setD` to `setC`.  
Example:

```java
setC.addAll(setD);  // Adds all elements from setD to setC.
```

---

**Checks if setC contains all elements of setD.**  
?x
```java
setC.containsAll(setD);
```

This checks whether `setC` contains all elements from `setD`.  
Example:

```java
if (setC.containsAll(setD)) {  // Returns true if setC contains all elements of setD.
    System.out.println("setC contains all elements of setD.");
}
```

---

**Converts the set to an array.**  
?x
```java
Object[] arr = setA.toArray();
```

This method returns an array containing all elements in `setA`.  
Example:

```java
Object[] arr = setA.toArray();  // Converts the set to an array.
```

---

**Creates a new TreeMap with Integer keys and String values, sorted by keys in ascending order.**  
?x
```java
TreeMap<Integer, String> map = new TreeMap<>();
```
This creates a `TreeMap` that sorts keys in ascending order by default.  
Example:
```java
TreeMap<Integer, String> map = new TreeMap<>();
map.put(2, "b");
map.put(1, "a");
map.put(3, "c");  // TreeMap will sort keys: {1, 2, 3}.
```

---

**Creates a TreeMap sorted in reverse order.**  
?x
```java
TreeMap<Integer, Integer> treeMap = new TreeMap<>(Collections.reverseOrder());
```

This creates a `TreeMap` with keys sorted in descending order.  
Example:

```java
TreeMap<Integer, Integer> treeMap = new TreeMap<>(Collections.reverseOrder());
treeMap.put(2, 20);
treeMap.put(1, 10);  // TreeMap will sort keys: {2, 1}.
```

---

**Returns the largest key that is smaller than the given key.**  
?x
```java
treeMap.lowerKey(k);
```
This method returns the largest key that is smaller than `k`.  
Example:

```java
int key = treeMap.lowerKey(3);  // Returns 2, the largest key smaller than 3.
```

---

**Returns the largest key that is less than or equal to the given key.**  
?x
```java
treeMap.floorKey(k);
```
This method returns the largest key that is less than or equal to `k`.  
Example:

```java
int key = treeMap.floorKey(3);  // Returns 3, the largest key less than or equal to 3.
```

---

**Returns the smallest key that is greater than the given key.**  
?x
```java
treeMap.higherKey(k);
```
This method returns the smallest key that is greater than `k`.  
Example:

```java
int key = treeMap.higherKey(2);  // Returns 3, the smallest key greater than 2.
```

---

**Returns the smallest key that is greater than or equal to the given key.**  
?x
```java
treeMap.ceilingKey(k);
```
This method returns the smallest key that is greater than or equal to `k`.  
Example:

```java
int key = treeMap.ceilingKey(2);  // Returns 2, the smallest key greater than or equal to 2.
```

---

**Returns the first (lowest) key in the TreeMap.**  
?x
```java
treeMap.firstKey();
```
This method returns the lowest key currently in the map.  
Example:

```java
int firstKey = treeMap.firstKey();  // Returns 1, the lowest key in the TreeMap.
```

---

**Returns a view of the portion of the map whose keys are strictly less than toKey.**  
?x
```java
SortedMap<K, V> portionOfTreeMap = treeMap.headMap(K toKey);
```
This method returns a view of the portion of the map whose keys are strictly less than `toKey`.  
Example:

```java
SortedMap<Integer, String> portion = treeMap.headMap(3);  // Returns keys less than 3.
```

---

**Returns a view of the portion of the map whose keys are less than or equal to toKey.**  
?x
```java
NavigableMap<K, V> map = treeMap.headMap(toKey, true);
```
This method returns a view of the portion of the map whose keys are less than or equal to `toKey`.  
Example:
```java
NavigableMap<Integer, String> portion = treeMap.headMap(3, true);  // Returns keys <= 3.
```

---

**Creates a new TreeSet and adds an element to it.**
?x
```java
Set<Integer> treeSet = new TreeSet<>();
```
This creates a `TreeSet` that sorts elements in ascending order by default.
Example:
```
import java.util.*;

public class TreeSetExample {
    public static void main(String[] args) {
        // Create a TreeSet
        TreeSet<Integer> numbers = new TreeSet<>();

        // Add elements
        numbers.add(5);
        numbers.add(1);
        numbers.add(3);
        
        // Print the TreeSet (sorted order)
        System.out.println(numbers);  // Output: [1, 3, 5]
        
        // Range query
        System.out.println("Subset: " + numbers.subSet(1, 4));  // Output: [1, 3]
    }
}
```

```java
Set<Integer> treeSet = new TreeSet<>();
treeSet.add(10);  // Adds 10 to the TreeSet.
```

---

**Returns the largest element smaller than the specified element.**  
?x
```java
treeSet.lower(Integer e);
```
This method returns the greatest element that is smaller than `e`.  
Example:
```java
Integer lower = treeSet.lower(10);  // Returns the greatest element smaller than 10.
```

---

**Returns the largest element less than or equal to the specified element.**  
?x
```java
treeSet.floor(Integer e);
```
This method returns the greatest element that is less than or equal to `e`.  
Example:
```java
Integer floor = treeSet.floor(10);  // Returns the greatest element <= 10.
```

---

**Returns the smallest element greater than or equal to the specified element.**  
?x
```java
treeSet.ceiling(Integer e);
```
This method returns the smallest element greater than or equal to `e`.  
Example:
```java
Integer ceiling = treeSet.ceiling(10);  // Returns the smallest element >= 10.
```

---

**Returns the smallest element greater than the specified element.**  
?x
```java
treeSet.higher(Integer e);
```
This method returns the smallest element greater than `e`.  
Example:
```java
Integer higher = treeSet.higher(10);  // Returns the smallest element greater than 10.
```

---

**Returns the first element in the TreeSet.**  
?x
```java
treeSet.first();
```
This method returns the first (lowest) element in the `TreeSet`.  
Example:
```java
Integer first = treeSet.first();  // Returns the first element in the TreeSet.
```

---

**Returns the last element in the TreeSet.**  
?x
```java
treeSet.last();
```
This method returns the last (largest) element in the `TreeSet`.  
Example:
```java
Integer last = treeSet.last();  // Returns the last element in the TreeSet.
```


**Creates a LinkedHashMap and iterates through it to print key-value pairs in insertion order.**  
?x
```java
Map<Integer, String> map = new LinkedHashMap<>();
map.put(1, "first");
map.put(2, "second");
map.put(3, "third");
for (Map.Entry<Integer, String> entry : map.entrySet()) {
    System.out.println(entry.getKey() + ", " + entry.getValue());  // Prints: 1, first; 2, second; 3, third
}
```
This creates a `LinkedHashMap`, which maintains the insertion order of elements. The `for-each` loop iterates through the `entrySet()` and prints the key-value pairs in the order they were inserted.  
Example:
```java
Map<Integer, String> map = new LinkedHashMap<>();
map.put(1, "first");
map.put(2, "second");
map.put(3, "third");
for (Map.Entry<Integer, String> entry : map.entrySet()) {
    System.out.println(entry.getKey() + ", " + entry.getValue());  // Prints: 1, first; 2, second; 3, third
}
```

---

**Creates a LinkedHashSet and adds elements, maintaining the insertion order.**  
?x
```java
Set<Integer> set = new LinkedHashSet<>();
set.add(10);
set.add(20);
set.add(30);
for (Integer i : set) {
    System.out.println(i);  // Prints: 10, 20, 30 (in insertion order)
}
```
This creates a `LinkedHashSet`, which maintains the order of elements as they are inserted. The `for-each` loop iterates through the set and prints the elements in the same order they were added.  
Example:
```java
Set<Integer> set = new LinkedHashSet<>();
set.add(10);
set.add(20);
set.add(30);
for (Integer i : set) {
    System.out.println(i);  // Prints: 10, 20, 30 (in insertion order)
}
```

### Arraylist

**Creates and manipulates a List using ArrayList methods, such as adding, removing, setting, and sorting elements.**  
?x
```java
List<Integer> list = new ArrayList<>();
list.add(14);
list.add(0, 10);  // Inserts 10 at index 0
list.get(0);      // Returns element at index 0
list.remove(list.size() - 1);  // Removes the last element
list.set(0, 20);  // Replaces element at index 0 with 20 and returns the original value
list.indexOf(20);  // Returns the index of the first occurrence of 20, or -1 if not found
list.subList(0, 2);  // Returns a sublist containing elements at indices [0, 2)
Collections.sort(list);  // Sorts the list in ascending order
Collections.sort(list, Collections.reverseOrder());  // Sorts the list in descending order
Collections.sort(list, new Comparator<Integer>() {
    @Override
    public int compare(Integer o1, Integer o2) {
        return o1 - o2;  // Ascending order (min-heap)
    }
});
list.forEach(num -> System.out.println(num));  // Iterates and prints elements using lambda
```



Here are the flashcards with separate concepts for Stack, Queue, PriorityQueue, and Deque:

---

**Stack Operations** , Creaete a stack, push, pop, peek, check if empty and check size
?x
```java
Stack<Integer> stack = new Stack<>();
stack.push(10);  // Pushes 10 onto the stack
stack.pop();  // Pops the top element from the stack
stack.peek();  // Returns the top element without removing it
stack.isEmpty();  // Checks if the stack is empty
stack.size();  // Returns the size of the stack
```
A `Stack` follows the Last In, First Out (LIFO) principle. Elements are added and removed from the top. Methods include `push`, `pop`, `peek`, `isEmpty`, and `size`.  
Example:
```java
Queue<Integer> q = new LinkedList<>();
q.offer(10);  // Adds 10 to the queue
q.offer(20);  // Adds 20 to the queue
q.offer(30);  // Adds 30 to the queue
System.out.println(q.peek());  // Prints 10, as it's the front element
q.poll();  // Removes 10 from the queue
System.out.println(q.peek());  // Prints 20, as it's now the front element
q.poll();  // Removes 20
q.poll();  // Removes 30
System.out.println(q.isEmpty());  // Prints true, as the queue is now empty

```

---

**Queue Operations**  , add, remove from front, check the front element, check if empty, and check size
?x
```java
Queue<Integer> q = new LinkedList<>();
q.offer(10);  // Adds 10 to the queue
q.poll();  // Removes and returns the front element of the queue
q.peek();  // Returns the front element without removing it
q.isEmpty();  // Checks if the queue is empty
q.size();  // Returns the size of the queue
```
A `Queue` follows the First In, First Out (FIFO) principle. Elements are added at the back and removed from the front. Methods include `offer`, `poll`, `peek`, `isEmpty`, and `size`.  
Example:
```java
Queue<Integer> q = new LinkedList<>();
q.offer(10);  // Adds 10 to the queue
q.offer(20);  // Adds 20 to the queue
q.offer(30);  // Adds 30 to the queue
System.out.println(q.peek());  // Prints 10, as it's the front element
q.poll();  // Removes 10 from the queue
System.out.println(q.peek());  // Prints 20, as it's now the front element
q.poll();  // Removes 20
q.poll();  // Removes 30
System.out.println(q.isEmpty());  // Prints true, as the queue is now empty

```

---

**PriorityQueue Operations**  
Create a Priority QUeue, add, poll, peek, check if empty and the size
?x
```java
PriorityQueue<Integer> pq = new PriorityQueue<>();  // Min-heap by default
PriorityQueue<Integer> pqDesc = new PriorityQueue<>(Collections.reverseOrder());  // Max-heap
pq.add(10);  // Adds 10 to the priority queue
pq.poll();  // Removes and returns the highest-priority element (min by default)
pq.peek();  // Returns the highest-priority element without removing it
pq.isEmpty();  // Checks if the priority queue is empty
pq.size();  // Returns the size of the priority queue
```
A `PriorityQueue` orders elements based on priority. By default, it acts as a min-heap, but it can be configured to act as a max-heap using `Collections.reverseOrder()`. Methods include `add`, `poll`, `peek`, `isEmpty`, and `size`.  
```java
class Node implements Comparable<Node> {
    int x, y;
    public Node(int x, int y) {
        this.x = x;
        this.y = y;
    }
    @Override
    public int compareTo(Node that) {
        return this.x - that.x;  // Min-heap based on x value (ascending order)
    }
}
PriorityQueue<Node> pq = new PriorityQueue<>();
pq.add(new Node(10, 100));  // Adds node with x=10, y=100
pq.add(new Node(5, 50));    // Adds node with x=5, y=50
pq.add(new Node(15, 150));  // Adds node with x=15, y=150
x
System.out.println("Poll: " + pq.poll().x);  // Prints 5 (the node with smallest x value)
System.out.println("Poll: " + pq.poll().x);  // Prints 10
System.out.println("Poll: " + pq.poll().x);  // Prints 15
```



---

**Deque Operations**  
?x
```java
import java.util.Deque;
Deque<Integer> dq = new LinkedList<>();
dq.addFirst(10);  // Adds 10 to the front of the deque
dq.addLast(20);  // Adds 20 to the end of the deque
dq.peekFirst();  // Returns the first element without removing it
dq.peekLast();  // Returns the last element without removing it
dq.pollFirst();  // Removes and returns the first element
dq.pollLast();  // Removes and returns the last element
```
A `Deque` (Double-Ended Queue) allows elements to be added and removed from both ends. Methods include `addFirst`, `addLast`, `peekFirst`, `peekLast`, `pollFirst`, and `pollLast`.  
Example:
```java
Deque<Integer> dq = new LinkedList<>();
dq.addFirst(10);  // Adds 10 to the front
dq.addLast(20);   // Adds 20 to the end
dq.addFirst(5);   // Adds 5 to the front
dq.addLast(30);   // Adds 30 to the end
System.out.println(dq.peekFirst());  // 5
System.out.println(dq.peekLast());   // 30
dq.pollFirst();  // Removes 5
dq.pollLast();   // Removes 30
System.out.println(dq.peekFirst());  // 10
System.out.println(dq.peekLast());   // 20
```