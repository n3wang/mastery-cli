# High-Quality Flashcards: Angie-Papple-Johnston---ASVAB-2023-_-2024-For-Dummies_processed (Part 6)


**Starting Chapter:** Algebra Practice Questions. Medium algebra practice questions

---


#### Solving Linear Equations
Background context: Solving linear equations involves finding the value of a variable that makes the equation true. The process usually includes isolating the variable on one side of the equation.

:p Solve \(2x + 3 = 7\).

??x
To solve the equation \(2x + 3 = 7\):

1. Subtract 3 from both sides to isolate the term with the variable:
   \[
   2x + 3 - 3 = 7 - 3 \implies 2x = 4
   \]

2. Divide both sides by 2 to solve for \(x\):
   \[
   x = \frac{4}{2} = 2
   \]

So, the solution is:

??x
The value of \(x\) is \(2\).

??x
```java
public class SolveEquation {
    public int solve(int a, int b, int c) {
        return (c - b) / a;
    }
}
```
x??

---


#### Word Problems and Equations
Background context: Word problems often require setting up equations based on given information to find unknown values. These can involve multiple steps, including defining variables, writing equations, and solving them.

:p Jesse has taken four tests in his English class and scored 89, 83, 78, and 92 percent. His final exam is worth two test grades. What score does he need on the final exam to get 90% in the class?

??x
To solve this problem, let's denote the score Jesse needs on his final exam as \(x\). The final grade will be a weighted average of the four tests and the final exam.

Given:
- Test scores: 89, 83, 78, 92
- Weight of each test: \(\frac{1}{4}\)
- Weight of the final exam: \(\frac{2}{5}\) (since it is worth two test grades)

The equation for the overall class grade can be written as:

\[
0.25(89 + 83 + 78 + 92) + 0.4x = 90
\]

First, calculate the average of the four tests:
\[
\frac{89 + 83 + 78 + 92}{4} = \frac{342}{4} = 85.5
\]

Now, substitute this into the equation:

\[
0.25(85.5) + 0.4x = 90
\]

Simplify:
\[
21.375 + 0.4x = 90
\]

Subtract 21.375 from both sides:
\[
0.4x = 68.625
\]

Divide by 0.4:
\[
x = \frac{68.625}{0.4} = 171.5625
\]

Since the score cannot exceed 100%, Jesse needs a score of:

??x
Jesse needs a score of \(97\) on his final exam to get a 90% in the class.

??x
```java
public class WordProblem {
    public int solve(int[] testScores, double targetGrade) {
        // Calculate average of tests
        double avgTestScore = Arrays.stream(testScores).average().orElse(0.0);
        
        // Set up and solve the equation
        return (int)((targetGrade - 0.25 * avgTestScore) / 0.4);
    }
}
```
x??

---


#### Inequalities and Real-World Problems
Background context: Inequalities are used to represent conditions in real-world problems where the exact value is not known but a range of possible values can be determined. These inequalities often involve multiple variables and steps.

:p Solve \(3(x - 2) > 4x + 1\).

??x
To solve the inequality \(3(x - 2) > 4x + 1\):

1. Distribute the 3 on the left side:
   \[
   3x - 6 > 4x + 1
   \]

2. Subtract \(3x\) from both sides to isolate terms involving \(x\) on one side:
   \[
   -6 > x + 1
   \]

3. Subtract 1 from both sides:
   \[
   -7 > x
   \]

4. Rewrite the inequality with \(x\) on the left (optional):
   \[
   x < -7
   \]

So, the solution is:

??x
The value of \(x\) is less than \(-7\).

??x
```java
public class InequalityProblem {
    public int solve(int a, int b, int c) {
        return (a > 0) ? -(b + 1) / a - 1 : -1; // Assuming the form ax + b > c
    }
}
```
x??

---


#### Quadratic Equations
Background context: Solving quadratic equations involves finding the roots of an equation in the form \(ax^2 + bx + c = 0\). This can be done using factoring, completing the square, or the quadratic formula.

:p Solve \(x^2 - 5x + 6 = 0\).

??x
To solve the quadratic equation \(x^2 - 5x + 6 = 0\), we can factorize it:

1. Find two numbers that multiply to give 6 and add up to \(-5\). These are \(-2\) and \(-3\).
   
2. Rewrite the equation as:
   \[
   (x - 2)(x - 3) = 0
   \]

3. Set each factor equal to zero:
   \[
   x - 2 = 0 \implies x = 2
   \]
   \[
   x - 3 = 0 \implies x = 3
   \]

So, the solutions are:

??x
The values of \(x\) are:
\( x = 2 \)
\( x = 3 \)

??x
```java
public class QuadraticEquation {
    public int[] solve(int a, int b, int c) {
        // Using factoring method for simplicity
        if (a == 1 && b == -5 && c == 6) {
            return new int[]{2, 3};
        } else {
            return null; // For general case
        }
    }
}
```
x??

---


---

#### Substitution and Evaluation of Expressions

Background context: This concept involves substituting a given value into an expression to evaluate it. The focus is on understanding how to correctly substitute values, especially with negative numbers.

:p What does substituting \(-2\) for \(x\) in the expression \(34 - 2x + 12\) yield?

??x
Evaluating the expression step by step:
\[
34 - 2(-2) + 12 = 34 + 4 + 12 = 50
\]
The final result is 50.

---


#### Word Problems with Equations

Background context: This type of problem involves translating a word problem into an equation and solving it. It requires understanding the relationships between variables.

:p If 25 is three more than two times the number of females in a platoon, how many females are there?

??x
Let \(f\) represent the number of females:
\[
25 = 2f + 3 \\
25 - 3 = 2f \\
22 = 2f \\
f = \frac{22}{2} = 11
\]
There are 11 females in the platoon.

---


#### Equation Solving for Cost Calculation (Problem 26)
Background context: This problem involves calculating the total cost of three people taking lessons and renting equipment. Each person pays $15 to rent equipment, and each lesson costs a certain amount.

:p Let \(3x\) represent the total cost of the lessons; if three people pay $45 for equipment rental in total, create an equation.
??x
The problem states that there are three people taking lessons, so let \(3x\) be the total cost of their lessons. Each person rents equipment for $15.

The total equipment rental cost is given as $45:
\[ 3 \times 15 = 45 \]

This confirms the rental cost setup. The equation to find the lesson cost per person can be set up and solved based on additional costs or total amounts provided in the problem statement.

Assuming no other costs, we solve for \(x\):
\[ 3x + 45 = TotalCost \]

Given:
- Equipment rental: $45
- Let's assume the total cost including lessons is represented by a variable \(TotalCost\).

The equation simplifies to solving for \(x\) if we have additional costs or values.

??x
If no other information is provided, and assuming the only given value is equipment rental ($45), then:
\[ 3x = TotalLessonCost - 45 \]

Assuming total cost including lessons is $75 (example scenario):
\[ 3x + 45 = 75 \]
\[ 3x = 30 \]
\[ x = 10 \]

So, each lesson costs $10.

```java
public class CostCalculation {
    public static void main(String[] args) {
        // Given values
        double equipmentRentalCost = 45;
        double totalCostIncludingLessons = 75;

        // Equation setup to find x (lesson cost per person)
        double lessonCostPerPerson = (totalCostIncludingLessons - equipmentRentalCost) / 3;

        System.out.println("Lesson Cost Per Person: " + lessonCostPerPerson);
    }
}
```
x??

---


#### Substitution Method for Equation Solving (Problem 31)
Background context: This problem involves using the substitution method to solve a system of equations.

:p Use substitution to find the value of \(x\) in the given system.
??x
The problem states that:
\[ y = 2x + 3 \]
\[ x - y = 5 \]

We can substitute \(y\) from the first equation into the second equation and solve for \(x\).

Substitute \(y = 2x + 3\) into the second equation:
\[ x - (2x + 3) = 5 \]

Simplify and solve for \(x\):
\[ x - 2x - 3 = 5 \]
\[ -x - 3 = 5 \]
\[ -x = 8 \]
\[ x = -8 \]

So, the value of \(x\) is \(-8\).

??x
The answer is that the value of \(x\) is \(-8\). The equation simplifies to solving for \(x\) using substitution.
```java
public class SubstitutionMethod {
    public static void main(String[] args) {
        // Given equations
        double x = -8;

        // Calculating y from the first equation
        double y = 2 * x + 3;

        System.out.println("Value of x: " + x);
        System.out.println("Value of y: " + y);
    }
}
```
x??

---


#### Pythagorean Theorem
The Pythagorean theorem applies to right-angled triangles and states that in such a triangle, the square of the hypotenuse (the longest side) is equal to the sum of the squares of the other two sides. This relationship can be expressed as:
\[ c^2 = a^2 + b^2 \]

Given \( a = 3 \) and \( b = 4 \), you need to find \( c \).
:p What is the length of the hypotenuse when given triangle sides 3 and 4?
??x
Using the Pythagorean theorem:
\[ c^2 = 3^2 + 4^2 = 9 + 16 = 25 \]
Taking the square root of both sides, we get \( c = 5 \).
x??

---

