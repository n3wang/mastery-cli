# TypeScript

TypeScript programming language fundamentals and type system.

## Create a tuple

:p How to create a tuple? of number, string and last element as boolean | named tuple

**Example:** ??let tuple: [number, string, boolean] = [1, 'a', true]??

## Create an Enum

:p How to create an enum? of Bajo: 10, Normal: 50, Alto: 100

**Example:** ??enum Priority {
    Bajo = 10,
    Normal = 50,
    Alto = 100
}??

## Declare a variable of Enum

:p How to declare a variable of Enum type Priority which starts as Bajo?

**Example:** ??let priority: Priority = Priority.Bajo??

## Create an array of String

:p How to create an array of String?

**Example:** ??let array: string[] = []??

## Create an array II

:p How to create an array of String and Numbers

**Example:** ??let array: (string | number)[] = []??

## Create an array III

:p How to create an array of any type?

**Example:** ??let array: any[] = []??

## Method that returns a String

:p How to create a method that returns a String?

**Example:** ??function sayHello(name: string): string {
    return `Hello ${name}`
}??

## Create an interface

:p How to create an interface of a Person with name and age?

**Example:** ??interface Person {
    name: string,
    age: number
}??

## Use Person Interface in an array

:p How to create an array of interface Person that has name and age??

**Example:** ??let people: Person[] = []??