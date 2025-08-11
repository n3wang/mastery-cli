# Swift

Swift programming language fundamentals for iOS development.

## Using Regex

Check the following regex example.
import Foundation

func timeConversion(s: String) -> String {
    do {
        let pattern = "^(\\d{2}):(\\d{2}):(\\d{2})([APap][Mm])$"
        let regex = try NSRegularExpression(pattern: pattern, options: [])
        if let match = regex.firstMatch(in: s, options: [], range: NSRange(s.startIndex..., in: s)) {
            let hoursRange = Range(match.range(at: 1), in: s)!
            let minutesRange = Range(match.range(at: 2), in: s)!
            let secondsRange = Range(match.range(at: 3), in: s)!
            let ampmRange = Range(match.range(at: 4), in: s)!
            
            var hours = Int(s[hoursRange])!
            let minutes = String(s[minutesRange])
            let seconds = String(s[secondsRange])
            let ampm = String(s[ampmRange])
            
            if (ampm.uppercased() == "PM" && hours != 12) {
                hours += 12
            } else if (ampm.uppercased() == "AM" && hours == 12) {
                hours = 0
            }
            
            return String(format: "%02d:%@:%@", hours, minutes, seconds)
        }
    } catch {
        print("Error: (error)")
        return "Error \\(error)"
    }
    
    return ""
}

let stdout = ProcessInfo.processInfo.environment["OUTPUT_PATH"]!
FileManager.default.createFile(atPath: stdout, contents: nil, attributes: nil)
let fileHandle = FileHandle(forWritingAtPath: stdout)!

guard let s = readLine() else { fatalError("Bad input") }

let result = timeConversion(s: s)
fileHandle.write(result.data(using: .utf8)!)
fileHandle.write("\\n".data(using: .utf8)!)

:p Create regex to match time in 12 hour format. e.g. 07:05:45PM

**Example:** ??^(\\d{2}):(\\d{2}):(\\d{2})([APap][Mm])$??

## Using Regex II

Complete the code to match the hour as an integer

:p Complete the code to match the hour as an integer

**Example:** ??Range(match.range(at: 1), in: s)!
Int(s[hoursRange])!??

## Declaring Type Variable

:p Can you declare a float variable?

**Example:** ??var a: Float = 1.0??

## For Loop on Swift

:p How to iterate over a range in Swift? (1..5)

**Example:** ??for i in 1...5 { print(i) }??

## For Loop on Swift II

:p How to iterate over an array
e.g let numbers = [1, 2, 3, 4, 5]

**Example:** ??for i in numbers { print(i) }??

## For Loop enumerate

:p How to iterate over an array and get the index and value?

**Example:** ??for (index, value) in numbers.enumerated() { print(index, value) }??

## Format decimals

:p How to print a double in 6 places after the decimal?

**Example:** ??String(format: "%.6f", 1.0)??

## Dict | Swift

:p Create a dictionary with key as string and value as int

**Example:** ??var dict: [String: Int] = [:]??

## Dict | Add, , update

:p How to add, update a dictionary?

**Example:** ??dict["a"] = 1
dict["b"] = 2??

## Dict | Remove

:p How to remove a key from a dictionary?

**Example:** ??dict.removeValue(forKey: "a")??

## Set | init

:p How to initialize a set of Integers?

**Example:** ??var set: Set<Int> = []
var set: Set<Int> = [1, 2, 3]??

## Set | Add, check if contains

:p How to add an element to a set and check if it contains an element?

**Example:** ??set.insert(1)
set.contains(1)??

## Set | Remove & Remove All

:p How to remove an element from a set and remove all elements?

**Example:** ??set.remove(1)
set.removeAll()??

## For loop from 2 to count

:p How to iterate from 2 to count?

**Example:** ??for i in 2..<count { print(i) }??

## Get first and second half array

:p How to get the first and second half of an array? from middle = nums.count - ( k % nums.count )

**Example:** ??let firstHalf = nums[0..<middle]
let secondHalf = nums[middle..<nums.count]??