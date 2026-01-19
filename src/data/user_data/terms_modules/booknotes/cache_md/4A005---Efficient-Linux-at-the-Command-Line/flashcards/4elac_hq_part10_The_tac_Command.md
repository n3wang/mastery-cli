# High-Quality Flashcards: 4A005---Efficient-Linux-at-the-Command-Line_processed (Part 10)

**Starting Chapter:** The tac Command

---

#### AWK Field Separator and Line Filtering
AWK is a powerful text-processing tool that allows you to split input lines into fields based on a delimiter. By default, AWK uses whitespace as the field separator, but you can customize this using the `-F` option. The `FNR` variable tracks the record number in the current file, which is useful for skipping header lines. For example, `FNR>1` ensures only lines after the first are processed.

:p How can you use AWK to extract only the fourth field from lines after the first in a file?
??x
The command `awk 'FNR>1 {print $4}' file` skips the first line (header) and prints the fourth field of each subsequent line. This is useful when working with tabular data where the first line contains column names.
```bash
df / /data | awk 'FNR>1 {print $4}'
```
This command uses `FNR` to check that the line number is greater than one, and `$4` to access the fourth column of the output from `df`.
x??

---

#### AWK with Custom Field Separators
When data is separated by characters other than spaces (e.g., colons), you can instruct AWK to use a regular expression as the field separator using the `-F` option. For instance, `-F':*'` tells AWK to split fields at one or more colons.

:p How would you extract the second field from a line separated by multiple colons using AWK?
??x
Using `awk -F':*' '{print $2}'`, you specify that the field separator is one or more colons (`:*`). This allows AWK to correctly parse fields even if they are separated by multiple delimiters. For example, given input like `efficient:::::linux`, it would return `linux`.
```bash
echo "efficient:::::linux" | awk -F':*' '{print $2}'
```
Here, `$2` refers to the second field after splitting on `:::`.
x??

---

#### Combining Files with `cat`
The `cat` command is used to concatenate and print files to standard output. It reads files sequentially and outputs their contents in order, making it ideal for combining multiple files into a single stream. It’s named after "concatenate" because it joins files together.

:p What does the `cat` command do when given multiple filenames?
??x
The `cat` command reads each file in order and prints their contents to stdout. For example, `cat poem1 poem2 poem3` will print the content of `poem1`, followed by `poem2`, and then `poem3`. It’s a simple yet effective way to combine text files.
```bash
cat poem1 poem2 poem3
```
This outputs the contents of all three files sequentially.
x??

---

#### Using `echo` to Combine Strings
The `echo` command prints arguments separated by a single space. It's often used to combine strings or variables into a single line of output. This behavior makes it useful for formatting output in shell scripts.

:p How does `echo` behave when given multiple arguments?
??x
The `echo` command prints all its arguments separated by a single space character. For example, `echo efficient linux in $HOME` would output:
```
efficient linux in /home/smith
```
This is helpful for constructing formatted messages or combining values in shell scripting.
```bash
echo efficient linux in $HOME
```
x??

---

#### The `diff` Command for Comparing Files
The `diff` command compares two files line-by-line and reports differences. It can show which lines were added, removed, or changed between the files. It's widely used for version control and comparing configurations.

:p What does the `diff` command output when comparing two files?
??x
The `diff` command shows the differences between two files in a format like:
```
1c1
< old_line

---

#### The `tac` Command
The `tac` command is a utility in Unix-like systems that reverses the lines of a file, one by one. It's essentially the reverse of the `cat` command, hence its name — "tac" is "cat" spelled backwards. It is particularly useful for processing data that is already in chronological order but not suitable for reversal using commands like `sort -r`, such as web server logs.

:p What is the typical use case for the `tac` command?
??x
The `tac` command is especially useful for reversing the order of lines in files such as log files, where the data is chronologically ordered but not in a way that can be reversed with `sort -r`. For example, in web server logs, lines are ordered from oldest to newest, and `tac` allows you to process them from newest to oldest without needing to parse timestamps or sort by date.

Example:
```bash
tac access.log
```
This would reverse the lines of `access.log`, making it easier to examine recent entries first.
x??

---

#### The `paste` Command
The `paste` command combines files side-by-side, with each line from the input files joined by a tab character by default. It is often used in conjunction with `cut` to manipulate tab-separated data.

:p What does the `paste` command do?
??x
The `paste` command takes multiple files and merges their lines side-by-side, with each line from the files joined by a tab character. It is commonly used to combine data from multiple sources into a single structured output.

Example:
```bash
paste file1 file2
```
If `file1` contains:
```
A
B
```
and `file2` contains:
```
X
Y
```
then `paste file1 file2` outputs:
```
A	X
B	Y
```
x??

---

#### Custom Delimiters with `paste`
You can change the delimiter used by `paste` using the `-d` option. This is useful for creating comma-separated or other-delimited output.

:p How can you change the delimiter in `paste`?
??x
You can change the delimiter in `paste` using the `-d` option. For example, `paste -d, file1 file2` will join lines from `file1` and `file2` with a comma instead of a tab.

Example:
```bash
paste -d, file1 file2
```
This would output:
```
A,X
B,Y
```
x??

---

#### Interleaving Files with `paste`
You can interleave lines from multiple files by using a newline character as the delimiter with `paste`.

:p How do you interleave lines from multiple files using `paste`?
??x
To interleave lines from multiple files, you can use `paste -d $'\n' file1 file2`. This will alternate lines from each file, producing a merged output with lines from `file1` and `file2` interleaved.

Example:
```bash
paste -d $'\n' file1 file2
```
If `file1` contains:
```
A
B
```
and `file2` contains:
```
X
Y
```
then the output will be:
```
A
X
B
Y
```
x??

---

#### The `diff` Command
The `diff` command compares two files line by line and outputs a report showing the differences between them. It is commonly used in version control and system administration.

:p What does `diff` do when comparing two files?
??x
The `diff` command compares two files line by line and prints a report indicating which lines differ. The output uses a compact format like `1c1`, which means "line 1 in the first file differs from line 1 in the second file". It also shows the actual differing lines.

Example:
```bash
diff file1 file2
```
If `file1` contains:
```
Linux is all about efficiency.
I hope you will enjoy this book.
```
and `file2` contains:
```
MacOS is all about efficiency.
I hope you will enjoy this book.
Have a nice day.
```
Then `diff` will output:
```
1c1
< Linux is all about efficiency.

---

#### The `diff` Command for Interleaving Files
The `diff` command compares two files and outputs their differences in a specific format. Lines starting with `<` come from the first file, and lines starting with `>` come from the second. Notations like `2a3` indicate additions. This format can be leveraged to interleave lines from two files, useful in pipelines for processing text data.

:p What does `diff file1 file2` output when there's a line in file2 not in file1?
??x
It outputs a line prefixed with `>` followed by the extra line from file2. For example, if file2 has an extra line “Have a nice day.” after line 2 of file1, it would appear as:
```
> Have a nice day.
```
This is part of the `diff` output format indicating that line 3 of file2 is not present in file1.
x??

---

#### Using `diff` with `grep` and `cut` to Extract Lines
To isolate lines from either file, you can pipe `diff` output through `grep '^[<>]'` to filter only lines starting with `<` or `>`. Then, `cut -c3-` removes the first two characters (`<` or `>`) to extract just the content.

:p How do you extract only the content lines from `diff` output using `grep` and `cut`?
??x
You use the pipeline:
```bash
diff file1 file2 | grep '^[<>]' | cut -c3-
```
This filters lines beginning with `<` or `>` and removes the first two characters to leave only the actual content.
x??

---

#### The `tr` Command for Character Translation
The `tr` command translates characters from one set to another. It takes two arguments: a set of characters to translate and a set of replacement characters. Common uses include converting case, deleting whitespace, and replacing separators.

:p How do you convert lowercase letters to uppercase using `tr`?
??x
You use the command:
```bash
echo efficient | tr a-z A-Z
```
This translates each character in the first set (`a-z`) to the corresponding character in the second set (`A-Z`). So, `efficient` becomes `EFFICIENT`.
x??

---

#### Deleting Characters with `tr -d`
The `-d` option in `tr` deletes specified characters from input. This is useful for removing whitespace or other unwanted characters from text.

:p How do you remove all spaces and tabs from a string using `tr`?
??x
You use:
```bash
echo efficient linux | tr -d ' \t'
```
This deletes all spaces and tab characters, resulting in `efficientslinux`.
x??

---

#### Using `rev` and `cut` for Field Manipulation
The `rev` command reverses the characters in each line of input, and when combined with `cut`, it allows for flexible extraction of fields from lines with varying numbers of fields. This technique is useful when standard tools like `cut -f` fail due to inconsistent field counts.

:p How can you extract the last field from lines with variable field counts?
??x
You can reverse each line using `rev`, extract the first field (which was originally the last), and then reverse again to restore the original order:
```bash
rev file | cut -d' ' -f1 | rev
```
This works because reversing the line puts the last field at the front, and `cut -f1` extracts it. Reversing again restores the field order.
x??

---

#### The `awk` Command Overview
`awk` is a powerful text-processing utility that uses a miniature programming language to manipulate text. It can perform operations like printing lines, replacing strings, and transforming data based on patterns.

:p What is the basic syntax of an `awk` command?
??x
The basic syntax is:
```bash
awk 'pattern {action}' input-files
```
It processes input line-by-line, applying actions when lines match given patterns. For example, to print the first 10 lines:
```bash
awk 'FNR<=10' myfile
```
Here, `FNR` is the record number (line number) of the current file, and `<=10` is the pattern that matches lines up to the 10th.
x??

---

#### The `BEGIN` and `END` Patterns in `awk`
In `awk`, `BEGIN` and `END` are special patterns that run once before and after processing input, respectively. They are useful for initialization and finalization tasks.

:p What is the purpose of `BEGIN` and `END` in `awk`?
??x
`BEGIN` runs before any input is processed and is typically used for initialization tasks:
```awk
BEGIN { print "Processing started" }
```
`END` runs after all input has been processed and is often used for final output or cleanup:
```awk
END { print "Processing finished" }
```
These patterns help manage setup and teardown logic in scripts.
x??

---

#### Basic `awk` Program Structure
An `awk` program consists of one or more rules, each with a pattern and an action. The pattern determines when the action should run, and the action defines what to do.

:p What is the structure of a basic `awk` rule?
??x
A basic `awk` rule has the form:
```awk
pattern { action }
```
For example:
```awk
/John/ { print "Found John" }
```
This rule prints a message whenever a line contains "John". The pattern `/John/` matches lines with that string, and the action `{ print "Found John" }` executes when the match occurs.
x??

---

#### `awk` for Word Swapping
`awk` can easily swap fields in a line by referencing them via `$1`, `$2`, etc., which represent the first, second, and subsequent fields.

:p How do you swap two words using `awk`?
??x
You can swap two words by printing them in reverse order:
```bash
echo "linux efficient" | awk '{print $2, $1}'
```
This outputs `efficient linux`. Here, `$1` refers to "linux" and `$2` refers to "efficient".
x??

---

#### `sed` as a Text Transformation Tool
`sed` (stream editor) is another powerful command-line tool for text transformation. It supports substitution, deletion, insertion, and more, using regular expressions.

:p What does the `sed` command `s/\.jpg/.png/` do?
??x
The command:
```bash
sed 's/\.jpg/.png/' file
```
Replaces the first occurrence of `.jpg` with `.png` in each line of the file. The `s` stands for substitute, and the pattern `\.jpg` matches literal `.jpg` (the backslash escapes the dot to match it literally). For example:
```bash
echo "image.jpg" | sed 's/\.jpg/.png/'
```
Outputs `image.png`.
x??

---

#### Comparing `head` and `awk` for Line Limiting
Both `head` and `awk` can limit output to the first few lines of a file, but `awk` offers more flexibility in conditions.

:p How can you print the first 10 lines using `awk`?
??x
You can use:
```bash
awk 'FNR<=10' myfile
```
Here, `FNR` is the current line number in the file, and the condition `FNR<=10` ensures only the first 10 lines are printed. This is more flexible than `head` because you can use complex conditions:
```bash
awk 'FNR>=5 && FNR<=10' myfile  # Print lines 5 to 10
```
x??

---

#### `awk` vs `sed` - When to Use Which?
While both `awk` and `sed` are powerful, `awk` excels at field-based operations and structured data, while `sed` is better for simple text transformations.

:p When should you prefer `awk` over `sed`?
??x
Use `awk` when:
- You need to work with fields (e.g., `$1`, `$2`)
- You want to perform calculations or conditional logic
- You're manipulating structured data like CSV or log files

Use `sed` for:
- Simple text replacements (e.g., `s/old/new/`)
- Line deletion or insertion
- Basic stream editing without field parsing

For example, swapping fields is easier with `awk`, while replacing file extensions is simpler with `sed`.
x??

---

#### `awk` Program Files and `-f` Option
You can store `awk` programs in files and run them using the `-f` option, allowing for reuse and better organization of complex logic.

:p How do you run an `awk` script stored in a file?
??x
If you have a script in `script.awk`, you run it like:
```bash
awk -f script.awk input-file
```
This is useful for complex programs that are too long to write inline, or when you want to reuse the same logic across multiple files.
x??

---

#### `awk` and Regular Expressions
`awk` supports regular expressions in patterns, making it powerful for matching and filtering lines based on content.

:p How do you match lines containing a specific word in `awk`?
??x
You can use a regular expression in the pattern:
```awk
/John/ { print $0 }
```
This prints all lines containing the word "John". The `/John/` is a regular expression pattern that matches any line with "John" anywhere in it.
x??

---

#### `awk` Field Variables (`$1`, `$2`, etc.)
In `awk`, fields are accessed using `$1`, `$2`, ..., where `$1` is the first field, `$2` the second, and so on.

:p What does `$1` represent in an `awk` script?
??x
`$1` refers to the first field in the current input line, where fields are separated by whitespace by default. For example:
```bash
echo "apple banana cherry" | awk '{print $1}'
```
Outputs `apple`.

You can also change the field separator using the `-F` option:
```bash
echo "a,b,c" | awk -F',' '{print $2}'
```
Outputs `b`.
x??

---

#### `awk` Functions and Calculations
`awk` supports mathematical operations and can perform calculations on fields or variables.

:p How can you compute the sum of numbers in the second field using `awk`?
??x
You can accumulate values in a variable:
```bash
awk '{ sum += $2 } END { print sum }' file
```
Here, `$2` is the second field, and `sum` accumulates the total. At the end, `print sum` outputs the result.

Example input:
```
1 5
2 3
3 7
```
Output:
```
15
```
x??

---

#### `awk` and Pattern Matching with Variables
`awk` allows you to use variables in patterns and actions, enhancing flexibility in matching and transformation.

:p How do you use a variable in an `awk` pattern?
??x
You can define a variable using `-v`:
```bash
awk -v pattern="John" '$0 ~ pattern { print }' file
```
This prints lines matching the value stored in `pattern`. Alternatively, you can use it directly:
```awk
BEGIN { search = "John" }
$0 ~ search { print }
```
Here, `~` is the match operator, and `search` is a variable holding the pattern.
x??

---

#### `sed` Substitution with Regular Expressions
`sed` supports regular expressions in substitution commands, enabling complex replacements.

:p How do you replace all occurrences of a pattern in a line using `sed`?
??x
Use the global flag `g` with `s`:
```bash
echo "cat bat rat" | sed 's/at/IT/g'
```
This replaces all occurrences of `at` with `IT`:
```
cIT bIT rIT
```
The `g` flag ensures all matches in the line are replaced, not just the first.
x??

---

#### `awk` and the `FNR` Variable
`FNR` is a built-in variable in `awk` that holds the current line number in the current file, resetting for each new file.

:p Why is `FNR` useful in `awk`?
??x
`FNR` helps distinguish between line numbers within a file and across multiple files. For example:
```awk
FNR == 1 { print "Start of file" }
```
This prints a message only at the start of each file, not for each line in the entire input stream.

It is especially useful when processing multiple files:
```bash
awk 'FNR <= 5' file1 file2
```
This prints the first 5 lines of both files.
x??

---

#### Combining `rev`, `cut`, and `rev` for Last Field Extraction
The combination of `rev`, `cut -f1`, and `rev` is a clever workaround for extracting the last field when the number of fields varies.

:p Why is the `rev | cut -f1 | rev` method effective for variable field counts?
??x
Because `rev` reverses each line, the last field becomes the first field. Using `cut -f1` extracts that field, and `rev` reverses it again to restore the original order. For example:
```bash
echo "a b c" | rev | cut -d' ' -f1 | rev
```
Outputs `c`.

This method avoids needing to count fields or use complex logic.
x??

---

#### Regular Expressions in awk
Regular expressions in awk are patterns used to match text. They are enclosed in forward slashes `/` and can be used in patterns to filter input lines. For example, `/^[A-Z]/` matches lines that begin with a capital letter.

:p What does the regular expression `/^[A-Z]/` do in awk?
??x
This regular expression matches any line that starts with an uppercase letter. The `^` anchors the pattern to the beginning of the line, and `[A-Z]` matches any uppercase letter from A to Z.
$$
\text{Pattern: } /^ [A-Z] /
$$
In awk, this can be used as part of a pattern to filter input lines, such as:
```awk
/^[A-Z]/ { print $0 }
```
x??

---

#### Field Matching with `$n` in awk
In awk, fields are accessed using `$n`, where `n` is the field number. For example, `$3` refers to the third field of an input line. You can combine this with regular expressions to match specific field content.

:p How would you check if the third field of a line begins with a capital letter in awk?
??x
You can use the expression `$3~/^[A-Z]/` to match lines where the third field starts with a capital letter. The `~` operator tests if the field matches the regular expression.
$$
\text{Pattern: } \$3 \sim /^[A-Z]/
$$
Example:
```awk
$3~/^[A-Z]/ { print $0 }
```
x??

---

#### Patterns with No Action in awk
When a pattern is specified without an action in awk, the default action `{print}` is executed, meaning that matching input lines are printed unchanged.

:p What happens if you write a pattern without an action in awk?
??x
If a pattern is given without an action, awk performs the default action, which is to print the matching input line. For example:
```awk
/efficient/ { print }  # prints lines containing "efficient"
```
is equivalent to:
```awk
/efficient/  # prints lines matching the pattern
```
x??

---

#### Using `FNR` to Skip Lines in awk
The variable `FNR` represents the current line number in the current input file. You can use it to skip lines, such as `FNR > 5` to skip the first five lines of input.

:p How do you skip the first five lines of input in awk?
??x
You can use the condition `FNR > 5` to skip the first five lines. For example:
```awk
FNR > 5 { print $0 }
```
This will print all lines after the fifth one.
$$
\text{Condition: } FNR > 5
$$
x??

---

#### Using `NF` to Access Last Field in awk
The variable `NF` represents the number of fields in the current input line. `$NF` accesses the last field.

:p How do you print the last field of a line in awk?
??x
You use `$NF` to refer to the last field of a line. For example:
```awk
{ print $NF }
```
This will print the last field of every input line.
$$
\text{Last field: } \$NF
$$
x??

---

#### Combining Patterns and Actions in awk
Patterns and actions in awk are combined in the form `pattern { action }`. If no pattern is given, the action applies to every line.

:p What is the syntax for a basic awk command with a pattern and action?
??x
The syntax is:
```awk
pattern { action }
```
If no pattern is specified, the action is applied to all lines. For example:
```awk
/^[A-Z]/ { print $0 }  # prints lines starting with uppercase letter
```
x??

---

#### Using `-F` to Change Field Separator in awk
The `-F` option in awk allows you to specify a custom input field separator. For example, `-F'\t'` sets the separator to a tab character.

:p How do you specify a tab-separated input in awk?
??x
You use the `-F'\t'` option to set the input field separator to a tab. For example:
```bash
awk -F'\t' '{ print $1, $2 }' file.txt
```
This reads the file with tab-separated fields.
$$
\text{Command: } awk -F'\t' \{ \ldots \}
$$
x??

---

#### Using BEGIN and END Blocks in awk
The `BEGIN` block in awk runs before processing input, and the `END` block runs after all input is processed. These are useful for initialization and final output.

:p How do you use `BEGIN` and `END` in an awk script?
??x
`BEGIN` runs once before any input is processed, and `END` runs once after all input is processed. For example:
```awk
BEGIN { print "Processing started" }
{ print $0 }
END { print "Processing finished" }
```
x??

---

#### Filtering Lines with Regular Expressions in awk
You can filter lines using regular expressions by combining them with field tests. For example, `$3~/^201/` matches lines where the third field starts with "201".

:p How do you filter lines where the third field starts with "2010"?
??x
You can use the pattern `$3~/^201/` to match lines where the third field starts with "201". For example:
```awk
$3~/^201/ { print $0 }
```
This will match lines where the third field starts with "201", such as "2010", "2012", etc.
$$
\text{Pattern: } \$3 \sim /^201/
$$
x??

---

#### Conditional Processing in awk with Regular Expressions
You can combine regular expressions with conditions to selectively process input lines. For example, to process only lines matching a specific pattern.

:p How would you process only lines that start with "horse"?
??x
You can use the pattern `/^horse/` to match lines that start with "horse":
```awk
/^horse/ { print $0 }
```
This will only process lines beginning with "horse".
$$
\text{Pattern: } /^horse/
$$
x??

---

#### Understanding `awk` for Text Processing
Background context: `awk` is a powerful command-line tool for processing text files. It reads input line by line, applies patterns and actions, and can perform calculations, string manipulations, and more. In this example, `awk` is used to count duplicate files based on their checksums.
:p What does the command `seq 1 100 | awk '{s+=$1} END {print s}'` do?
??x
This command generates numbers from 1 to 100 using `seq`, pipes them into `awk`, where each number is added to a variable `s`. At the end, it prints the sum of all numbers from 1 to 100, which is $ \frac{100(100 + 1)}{2} = 5050 $. This demonstrates how `awk` can perform arithmetic operations on input data.
$$
\sum_{i=1}^{100} i = 5050
$$
```bash
seq 1 100 | awk '{s+=$1} END {print s}'
```
x??

---

#### Using `awk` Arrays for Counting
Background context: `awk` supports arrays, which allow storing multiple values indexed by keys. In this case, an array `counts` is used to store the frequency of each checksum.
:p How does the command `md5sum *.jpg | awk '{counts[$1]++}'` work?
??x
This command runs `md5sum` on all `.jpg` files, producing a list of checksums and filenames. For each line, `awk` takes the first field (`$1`) as the checksum key and increments its count in the `counts` array. The `++` operator automatically initializes the key if it doesn't exist.
```bash
md5sum *.jpg | awk '{counts[$1]++}'
```
x??

---

#### Looping Through Arrays in `awk`
Background context: The `for` loop in `awk` allows iterating over array elements using their keys. This is useful for printing results after processing input.
:p How does the `for (key in counts)` loop work in `awk`?
??x
The `for (key in counts)` loop iterates through each key in the `counts` array. For each key (a checksum), it accesses the corresponding value (the count of occurrences) and performs an action—here, printing it.
```awk
for (key in counts)
    print counts[key]
```
x??

---

#### Storing Filenames with Checksums Using Two Arrays
Background context: To improve the duplicate detection script, we can use a second array to store filenames associated with each checksum.
:p How do you use two arrays (`counts` and `names`) to track both frequency and filenames?
??x
One array (`counts`) tracks how many times each checksum appears. Another array (`names`) stores the filenames associated with each checksum. As `awk` processes each line:
1. Increment `counts[$1]` (checksum).
2. Append `$2` (filename) to `names[$1]` (the checksum key).

Example:
```awk
{
    counts[$1]++
    names[$1] = names[$1] $2 " "
}
END {
    for (key in counts)
        print counts[key] " " key " " names[key]
}
```
x??

---

#### Example of Duplicate File Detection with `awk`
Background context: This demonstrates a full working `awk` script to detect duplicate files by checksum, including printing the filenames of duplicates.
:p What is a complete `awk` script to detect and list duplicate files?
??x
Here's a complete script that detects duplicates and prints their counts and filenames:
```awk
{
    counts[$1]++
    names[$1] = names[$1] $2 " "
}
END {
    for (key in counts)
        if (counts[key] > 1)
            print counts[key] " " key " " names[key]
}
```
This script:
- Reads `md5sum` output line by line.
- Increments count for each checksum.
- Appends filenames to the `names` array.
- Prints only entries with a count greater than 1 (duplicates).
x??

---

---

#### `awk` Script for Duplicate File Detection
This concept introduces how to use `awk` to process file checksums and identify duplicate files based on their MD5 hashes. The script uses associative arrays to count occurrences of each checksum and collect filenames associated with each checksum.

:p How does the `awk` script count file occurrences and group filenames by checksum?
??x
The script processes each line of input (e.g., from `md5sum *.jpg`) where the first field is the checksum and the second is the filename. It uses two associative arrays: `counts[$1]` to count how many times each checksum appears, and `names[$1]` to accumulate all filenames for that checksum. In the `END` block, it iterates over all keys in `counts` and prints the count, checksum, and associated filenames.

```bash
md5sum *.jpg \
  | awk '{counts[$1]++; names[$1]=names[$1] " " $2} \
         END {for (key in counts) print counts[key] " " key ":" names[key]}'
```
This script builds a mapping from checksums to lists of files, allowing identification of duplicates.
x??

---

#### Filtering Single Occurrences from Duplicate Lists
After collecting all checksums and their associated files, we filter out lines where the count is 1, since those represent unique files, not duplicates.

:p How do you filter out lines with only one occurrence of a checksum?
??x
You can pipe the output of the `awk` command to `grep -v '^1 '`, which removes lines starting with `1 `. This filters out checksums that occur only once, leaving only those with two or more occurrences, indicating duplicates.

Example:
```bash
awk '{counts[$1]++; names[$1]=names[$1] " " $2} END {for (key in counts) print counts[key] " " key ":" names[key]}' \
  | grep -v '^1 '
```
x??

---

#### Sorting Duplicate Counts Numerically in Descending Order
Once duplicates are identified, sorting them by count in descending order helps prioritize which duplicates to address first.

:p How do you sort the duplicate checksums by frequency in descending order?
??x
Use the `sort -nr` command after filtering single occurrences. The `-n` flag sorts numerically, and `-r` reverses the order to descending. This ensures that the most frequent duplicates appear first.

Example:
```bash
sort -nr
```
This sorts lines like:
```
3 f6464ed766daca87ba407aede21c8fcc: image007.jpg image012.jpg image014.jpg
2 c7978522c58425f6af3f095ef1de1cd5: image019.jpg image020.jpg
```
x??

---

#### Introduction to `sed` as a Text Transformation Tool
`sed` (stream editor) is a powerful utility for transforming text using scripts composed of commands. It reads input line by line and applies transformations, such as substitutions, to produce modified output.

:p What is the role of `sed` in processing text?
??x
`sed` is used to perform text transformations on input streams or files. It supports commands like substitution (`s/old/new/`), which replaces occurrences of a pattern with another string. Scripts can be passed directly on the command line or loaded from files using `-e` or `-f` options respectively.

Example:
```bash
echo "Efficient Windows" | sed "s/Windows/Linux/"
# Output: Efficient Linux
```
It's commonly used for editing, filtering, and manipulating text in Unix/Linux environments.
x??

---

#### Substitution Command Syntax in `sed`
The basic syntax for substitution in `sed` is `s/pattern/replacement/`. The pattern is a regular expression, and replacement can include special characters like `\1`, `\2`, etc., for capturing groups.

:p What is the syntax for performing a substitution in `sed`?
??x
The substitution command in `sed` is written as:
$$
s/regexp/replacement/
$$
Where `regexp` is a regular expression to match, and `replacement` is the text to replace it with. Forward slashes are used as delimiters by default but can be replaced with other characters (e.g., `s#pattern#replacement#`) to avoid escaping slashes in the pattern.

Example:
```bash
sed 's/Windows/Linux/' file.txt
```
This replaces all occurrences of "Windows" with "Linux".
x??

---

#### Using `sed` to Extract Last Names from a List
A common use of `sed` is to extract specific parts of text using regular expressions. For example, extracting the last name from a full name line.

:p How can `sed` be used to extract just the last name from a line of names?
??x
You can use a regular expression to match everything up to the last space and replace it with nothing:
```bash
sed 's/.* //'
```
This regex matches any character (`.*`) followed by a space, effectively removing the first part of the line and leaving only the last name.

Example:
```bash
echo "Curtis Deschanel" | sed 's/.* //'
# Output: Deschanel
```
x??

---

#### Handling Special Characters in `sed` Patterns
When a pattern contains forward slashes, they must be escaped or replaced with another delimiter to avoid confusion with the substitution syntax.

:p How do you handle forward slashes in `sed` patterns?
??x
If a pattern contains forward slashes, you can change the delimiter used in the substitution command from `/` to another character such as `#` or `|`. This avoids the need to escape slashes in the pattern.

Example:
```bash
sed 's#http://example.com#https://example.com#'
```
This replaces `http://example.com` with `https://example.com` without needing to escape the slashes.
x??

---

#### sed Substitution Basics
The `sed` command is a stream editor used for parsing and transforming text. A basic substitution script like `s/one/two/` replaces the first occurrence of `one` with `two`. The syntax `s/pattern/replacement/` is standard, but it can be modified using delimiters like `s_one_two_` or `s@one@two@` to avoid conflicts with forward slashes in the pattern or replacement.

:p What does the sed command `s/one/two/` do?
??x
This command substitutes the first occurrence of the string `one` with `two` in each line of input. For example, given the input "one two one three", the output would be "two two one three". The substitution is performed on a per-line basis and only affects the first match unless the global flag (`g`) is used.
x??

---

#### Case-Insensitive Substitution with sed
The `sed` command supports modifiers to change how substitutions behave. The `i` flag makes a substitution case-insensitive, so that patterns like `stuff` will match `Stuff`, `STUFF`, etc.

:p How does the `i` flag in sed affect a substitution?
??x
The `i` flag makes the pattern matching case-insensitive. For instance, `s/stuff/linux/i` will match `stuff`, `Stuff`, `STUFF`, and other variations, replacing them all with `linux`. This is useful when you want to perform replacements without worrying about the case of the matched text.
x??

---

#### Global Substitution with sed
By default, `sed` only replaces the first occurrence of a pattern in a line. To replace all occurrences, use the `g` (global) flag. This ensures that every instance of the pattern is replaced, not just the first one.

:p What is the effect of using the `g` flag in a sed substitution?
??x
The `g` flag instructs `sed` to replace all occurrences of the pattern in a line, rather than just the first one. For example, `s/f/F/g` applied to the string "efficient stuff" results in "EFFicient stuFF", where all instances of `f` are replaced by `F`.
x??

---

#### Deletion of Lines by Line Number in sed
In `sed`, you can delete specific lines using the `d` command followed by a line number. For example, `4d` deletes the fourth line of input.

:p How do you delete a specific line number using sed?
??x
To delete a specific line number, use the `d` command followed by the line number. For example, `sed 4d` deletes the fourth line from input. This is useful when you want to filter out certain lines from a file or stream of data.
x??

---

#### Deletion of Lines Matching a Regular Expression in sed
You can also delete lines that match a regular expression. The syntax is `/pattern/d`, where the pattern is a regular expression and `d` deletes matching lines.

:p How do you delete lines matching a regular expression in sed?
??x
Use the syntax `/pattern/d` to delete lines that match a given regular expression. For example, `sed '/[13579]$/d'` deletes lines ending in an odd digit (1, 3, 5, 7, or 9). This is helpful for filtering data based on patterns in the content.
x??

---

#### Using Subexpressions in sed
Subexpressions in `sed` are created using parentheses `\(...\)` to capture parts of a regular expression. These can then be referenced later in the replacement string using `\1`, `\2`, etc., up to `\9`.

:p How do you use subexpressions in sed for rearranging text?
??x
Subexpressions allow you to capture and reuse parts of a matched pattern. For example, `s/image\.jpg\. \([1-3]\)/image\1.jpg/` captures a digit from the filename and moves it earlier in the output. Here, `\1` refers to the captured digit, enabling flexible text reformatting.
x??

---

#### Rearranging Filenames with sed Subexpressions
You can use subexpressions to manipulate filenames by capturing specific parts of a pattern and reordering them in the replacement.

:p How would you rename files like `image.jpg.1` to `image1.jpg` using sed?
??x
Using the command `sed 's/image\.jpg\.\([1-3]\)/image\1.jpg/'`, you capture the digit after `.jpg.` in a subexpression (`\1`) and place it before `.jpg`. This allows for flexible renaming of filenames by extracting and repositioning components.
x??

---

---

