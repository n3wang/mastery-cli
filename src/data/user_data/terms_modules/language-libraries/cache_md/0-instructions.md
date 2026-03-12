### Practice Problems
Inside docs folder create markdowns for documenting the architecture, and create a couple  excercises for getting familiar with the code they should be  simple, have also step by step instructions on how to complete this problems


### Flashcards
use the doc and src folders to create Flashcards on concepts like how to use it, deeper understanding of its mechanics oh how this repo works
and Interesting Techniques the developer used, architcture for modification, the logic of why something works (math)

on a flashcards folder inside of doc create flashcards of the concepts  that the project is using, have it on this structure .ALWAYS Create simple problems separated by --- and level 4 headers The cards are separated with ?x and :p is used to denote the prompt of the flashcard. a flascard cannot have more than one question. If same topic has multiple cards and specify description. The objective is not pure memorization but familiarity therefore explain relevant context and background on the description.  Whenever possible add c/java code pseudocode explaining the logic in detail

#### First Java Program
Every Java program is part of a class. The entry point is the 'main' method:

```java
public class HelloWorld {
    public static void main(String[] args) \{
        System.out.println("Hello World");
    }
}
```

Java is strict about syntax; the main method is always the first to run.
:p What is the entry point of a Java program and its basic structure?
??x
The entry point is 'public static void main(String[] args)'.
All code is inside a class, defined with '\{\}'.
Example:
```java
public class HelloWorld{}
```
x??

---

#### Negations Problems
some background context on the problem, if there is any formula or relevant data, place it here....
Given the following 
1. $\neg \forall x P(x, y) \equiv \exists x \neg P(x, y)$
2. $\neg \exists x P(x) \equiv \forall x \neg P(x)$
3. $\exists!x P(x)$ 
:p translate the equations above into human words of what they mean
??x
4. If not all x accomplish function then exists one x where not returns functions
5. If not exists one that accomplishes P(x) then all x doesnt accomplish F(x)
6. Means there is a unique x such that p(x) holds
x??

--- 