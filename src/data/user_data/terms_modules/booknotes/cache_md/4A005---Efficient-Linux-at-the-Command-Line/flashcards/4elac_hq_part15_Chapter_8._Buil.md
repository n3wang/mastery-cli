# High-Quality Flashcards: 4A005---Efficient-Linux-at-the-Command-Line_processed (Part 15)

**Starting Chapter:** Chapter 8. Building a Brash One-Liner

---

#### Process Substitution in Bash
Process substitution allows commands to act as if they were files, using `<()` syntax. It is used in the example to feed the output of `echo` and `sed` into `paste` without creating temporary files.
:p What is the purpose of process substitution in the command `paste <(echo {1..10}.jpg | sed 's/ / /g') <(echo {0..9}.jpg | sed 's/ / /g')`?
??x
Process substitution enables the `paste` command to read the output of two subshells as if they were input files. Each `<(...)` runs a command and makes its output available for reading by `paste`, allowing side-by-side comparison of two lists of filenames.
```bash
paste <(echo {1..10}.jpg | sed 's/ / /g') \
      <(echo {0..9}.jpg | sed 's/ / /g')
```
This command effectively creates two streams of data that `paste` aligns column-wise.
x??

---

#### Brace Expansion in Bash
Brace expansion generates multiple strings from a single expression, using `{start..end}` syntax. It is used here to generate sequences of JPEG filenames.
:p How does brace expansion work in `echo {1..10}.jpg`?
??x
Brace expansion in `echo {1..10}.jpg` generates a sequence of strings from 1 to 10, appending `.jpg` to each. The result is:
$$
1.jpg\ 2.jpg\ 3.jpg\ \ldots\ 10.jpg
$$
Each number is expanded into a filename, which is then printed by `echo`.
x??

---

#### Paste Command for Aligning Data
The `paste` command combines lines from multiple inputs side by side. It is used here to align two lists of filenames, making it possible to construct `mv` commands.
:p How does `paste` help in generating rename commands?
??x
The `paste` command aligns two lists side by side. For example:
$$
\begin{align*}
\text{List 1:} &\quad 1.jpg\ 2.jpg\ 3.jpg \\
\text{List 2:} &\quad 0.jpg\ 1.jpg\ 2.jpg \\
\text{Result:} &\quad 1.jpg\ 0.jpg \\
&\quad 2.jpg\ 1.jpg \\
&\quad 3.jpg\ 2.jpg
\end{align*}
$$
This alignment enables the construction of `mv` commands that rename files from one list to another.
x??

---

#### Constructing mv Commands with sed
The `sed 's/^/mv /'` prepends `mv ` to each line of input, effectively converting the aligned filenames into valid `mv` commands.
:p Why is `sed 's/^/mv /'` used in the one-liner?
??x
The `sed 's/^/mv /'` command prepends `mv ` to the start of each line, transforming aligned filenames into executable `mv` commands. For example:
$$
\text{Input: } 1.jpg\ 0.jpg \\
\text{Output: } mv\ 1.jpg\ 0.jpg
$$
This is a key step in generating the actual commands to rename files.
x??

---

#### Bash Execution of Commands
The final part of the command pipes the generated `mv` commands to `bash` for execution. This is a powerful but potentially dangerous pattern — it executes arbitrary commands.
:p What is the role of `bash` in the final step of the one-liner?
??x
The `bash` command executes the generated `mv` commands. This is the final step that applies the renaming operation:
$$
\text{Generated output: } mv\ 1.jpg\ 0.jpg \\
\text{Executed by: } bash
$$
It is important to review the output before piping to `bash` to avoid unintended consequences.
x??

---

#### Brash One-Liner Strategy
A "brash one-liner" is a complex command built step-by-step using trial and error, often solving a problem like renaming files. It involves iterative development and testing.
:p What defines a brash one-liner, and how is it built?
??x
A brash one-liner is a complex, elegant shell command that solves a problem like renaming files. It is built using a step-by-step process:
1. Invent a command to solve a part of the problem.
2. Run and check the output.
3. Recall and tweak the command.
4. Repeat until the desired result is achieved.
This process encourages creativity and builds command-line fluency.
x??

---

#### Command History and Iterative Development
In the development of one-liners, recalling and modifying past commands from history is a core technique. It allows for rapid prototyping and refinement.
:p How does recalling commands from history help in building one-liners?
??x
Recalling commands from history allows for quick reuse and modification of previous attempts. This iterative development approach helps refine the logic:
1. Start with a working piece of command.
2. Adjust and test.
3. Build upon it incrementally.
This is especially useful in shell scripting where small changes can drastically alter output.
x??

---

#### Example of File Renaming Using mv Commands
This one-liner effectively renames files from `1.jpg` to `10.jpg` into `0.jpg` to `9.jpg`, respectively, using `paste`, `sed`, and `bash`.
:p What does the full command do in terms of renaming files?
??x
The command renames files from:
$$
1.jpg\ 2.jpg\ \ldots\ 10.jpg \quad \text{to} \quad 0.jpg\ 1.jpg\ \ldots\ 9.jpg
$$
It works by:
1. Generating two lists of filenames.
2. Aligning them side by side.
3. Prepending `mv ` to each pair.
4. Executing the resulting commands via `bash`.
This is a concise and powerful way to batch rename files in a shell environment.
x??

---

#### Flexibility in Writing Brash One-Liners
Flexibility is a key trait when crafting brash one-liners in Linux. It means being able to choose the most appropriate tool or combination of tools for a given task. This mindset allows you to adapt and solve problems creatively, especially when standard approaches like `ls *.jpg` might fail due to too many files or other constraints. The goal is not just to get the job done, but to understand how different commands can be used in combination to achieve the same result.

:p What are some alternative methods to list `.jpg` files in the current directory besides `ls *.jpg`?
??x
Alternative methods include:
1. Using `ls | grep '\.jpg$'` to filter output from `ls`.
2. Using `find . -maxdepth 1 -type f -name "*.jpg"` to directly search for files.
3. Using process substitution like `cat <(ls *.jpg)` or `bash -c 'ls *.jpg'`.
4. Combining commands like `ls > tmp && grep '\.jpg$' tmp && rm -f tmp`.

Each of these methods has its own strengths depending on context—such as handling large numbers of files or avoiding shell expansion issues.
x??

---

#### Understanding Shell Command Execution and Process Substitution
Process substitution allows you to treat the output of a command as if it were a file. It's done using `<()` syntax, which creates a temporary file descriptor. For example, `cat <(ls *.jpg)` runs `ls *.jpg` and feeds its output to `cat` as if it were reading from a file. This is useful in one-liners where you need to pass command output to another command without creating temporary files.

:p How does process substitution work in a command like `cat <(ls *.jpg)`?
??x
In `cat <(ls *.jpg)`, the `<()` part runs `ls *.jpg` in a subshell and provides the output as a file-like object (e.g., `/dev/fd/63`). Then `cat` reads from this pseudo-file, effectively printing the contents of the directory matching `*.jpg`. This avoids the need for temporary files and allows chaining commands more cleanly.

Example pseudocode:
```bash
output = execute("ls *.jpg")
cat(output)
```
x??

---

#### Using Find Command for File Filtering
The `find` command is a powerful utility for locating files based on various criteria such as name, type, size, or modification time. When crafting brash one-liners, `find` is often used because it avoids issues with argument lists that can exceed limits in shells.

:p Why might you prefer using `find . -maxdepth 1 -type f -name "*.jpg"` over `ls *.jpg`?
??x
`find . -maxdepth 1 -type f -name "*.jpg"` is preferred when dealing with directories that contain many files, as `ls *.jpg` may hit shell argument limits (e.g., `ARG_MAX`), causing errors. `find` handles large numbers of files gracefully by not relying on shell expansion and supports more complex filtering logic than globbing alone.

Example:
```bash
find . -maxdepth 1 -type f -name "*.jpg"
```
This finds all regular files (`-type f`) in the current directory (`.`), up to one level deep (`-maxdepth 1`), whose names end with `.jpg`.
x??

---

#### Combining Commands with Pipes and Redirections
Pipes (`|`) and redirections (`>`, `<`) are fundamental to Linux scripting. They allow you to chain commands together so that the output of one becomes the input of another. In one-liners, this chaining helps avoid intermediate storage like temporary files.

:p How does the command `ls > tmp && grep '\.jpg$' tmp && rm -f tmp` work?
??x
This command:
1. Runs `ls` and redirects its output to a file named `tmp`.
2. Then uses `grep '\.jpg$'` to filter lines in `tmp` that end with `.jpg`.
3. Finally, removes the temporary file `tmp`.

While functional, it’s not ideal compared to alternatives like `ls | grep '\.jpg$'`, which avoids the overhead of writing to disk and managing files manually.

Example:
```bash
ls > tmp && grep '\.jpg$' tmp && rm -f tmp
```
x??

---

#### Shell Scripting with Bash and Command Substitution
Bash supports several ways to execute commands dynamically, including using `bash -c`, which allows executing a string as a shell command. This is useful in one-liners where you want to construct and run dynamic commands programmatically.

:p What does `bash -c 'ls *.jpg'` do?
??x
`bash -c 'ls *.jpg'` tells the shell to execute the string `'ls *.jpg'` as a command. It runs the command in a new subshell, bypassing the current shell's expansion behavior. This can be useful when you want to evaluate expressions or commands dynamically without affecting the parent shell's state.

Example:
```bash
bash -c 'ls *.jpg'
```
x??

---

#### String Manipulation Using sed
The `sed` command is a stream editor used to perform basic text transformations on input. It can be used to replace parts of strings or transform command lines dynamically, making it handy in one-liners for generating and executing new commands.

:p How does `echo 'monkey *.jpg' | sed 's/monkey/ls/' | bash` work?
??x
This one-liner:
1. Outputs the string `monkey *.jpg`.
2. Replaces `monkey` with `ls` using `sed`.
3. Pipes the result (`ls *.jpg`) to `bash`, which executes it.

This is a way to dynamically build and execute a command from a template string. It demonstrates how shell scripting can be used to generate and run commands programmatically.

Example:
```bash
echo 'monkey *.jpg' | sed 's/monkey/ls/' | bash
```
x??

---

#### Importance of Starting with Simple Output
Brash one-liners begin with producing simple, clean output from a basic command. This initial step is crucial because it sets up the data flow that will be manipulated later using tools like `grep`, `cut`, `sed`, etc. The ability to generate predictable, structured output is foundational to writing robust one-liners.

:p Why is it important to start with a simple command when building a brash one-liner?
??x
Starting with a simple command ensures that the input data is well-defined and predictable. This makes it easier to apply further transformations using tools like `grep`, `cut`, or `sed`. If the starting point is messy or inconsistent, subsequent steps become harder to control and debug. For example, if you're trying to extract the 17th letter of the alphabet, starting with `echo {A..Z}` gives you clean, ordered output that can then be sliced or filtered.

Example:
```bash
echo {A..Z}  # Produces A B C D E F G H I J K L M N O P Q R S T U V W X Y Z
```
x??

---

#### Command-Line Tool Selection and Problem Solving
Choosing the right tool for a task is critical in Linux. Different tools like `grep`, `cut`, `awk`, and `sed` offer varying levels of power and complexity. A flexible mindset lets you select the best tool for the job, whether it's a simple `ls` or a complex multi-step pipeline.

:p How does choosing the right tool improve your ability to write brash one-liners?
??x
Choosing the right tool improves efficiency and correctness. For instance, `grep` is excellent for filtering text, `cut` for splitting fields, and `sed` for pattern substitution. By understanding these tools, you can construct more concise and reliable one-liners. For example, instead of manually parsing output with `ls`, `grep` lets you quickly isolate matching entries.

Example:
```bash
ls | grep '\.jpg$'
```
This is cleaner and more maintainable than manually iterating through all files.
x??

---

#### Using `sed` and `cut` to Manipulate Strings
If you want to extract a specific character from a string after removing spaces, you can use `sed` to remove spaces and then `cut` to extract the nth character. For instance, to get the 17th character from a string like `{A..Z}`, you'd first remove spaces and then use `cut -c17`.

:p How can you extract the 17th character from a space-separated list like `{A..Z}` using `sed` and `cut`?
??x
You can use the following command:
```bash
echo {A..Z} | sed 's/ //g' | cut -c17
```
Here, `sed 's/ //g'` removes all spaces from the input, and `cut -c17` extracts the 17th character from the resulting string. Since the alphabet is ordered, this will return 'Q'.
x??

---

#### Safe Command Testing with `echo`
When experimenting with potentially destructive commands like `rm`, `mv`, or `cp`, it's safer to prepend `echo` to see which files would be affected before executing the actual command.

:p Why is it safer to prepend `echo` to commands like `rm` during testing?
??x
Prepending `echo` to commands like `rm` allows you to preview what would be executed without actually performing the action. For example:
```bash
echo rm file.txt
```
Instead of:
```bash
rm file.txt
```
This prevents accidental data loss and helps verify the correctness of your command before running it.
x??

---

#### Using `tee` to Inspect Intermediate Pipeline Results
To inspect the output of an intermediate step in a long pipeline, you can use `tee` to save the output to a file while still passing it along to the next command.

:p How does `tee` help in inspecting intermediate results in a pipeline?
??x
The `tee` command allows you to both display and save the output of a command. For example:
```bash
command1 | command2 | command3 | tee outfile | command4 | command5
```
Here:
- `command3`'s output is saved to `outfile`.
- The same output is passed to `command4` and then `command5`.
This is useful for debugging or examining the data at a certain stage without losing it.
x??

---

#### Understanding the Concept of Brash One-Liners
Building a brash one-liner involves combining multiple commands in a pipeline to achieve a complex task. It often requires iterative testing and refining of commands using tools like `echo`, `history`, and `tee`.

:p What is meant by a "brash one-liner" in shell scripting?
??x
A "brash one-liner" refers to a powerful, concise shell command that performs a complex task by chaining multiple commands together. It often requires:
- Iterative testing using tools like `echo`, `history`, and `tee`.
- Manipulation of data using tools like `awk`, `sed`, `cut`, and `date`.
- Combining multiple steps into a single line for efficiency and clarity.

Example:
```bash
ls | awk '{print "echo -n", $0, "| wc -c"}' | bash | sort -nr | head -n1
```
This command finds the longest filename in the current directory in one line.
x??

---

#### Process Substitution for Command Generation
Process substitution allows commands to be used as files, enabling complex pipelines. In this example, two sequences of filenames are generated using `seq` and `sed`, then combined with `paste` to create `mv` commands. This is a powerful pattern for automating repetitive tasks like renaming files.
:p How does process substitution enable the generation of `mv` commands for file renaming?
??x
Process substitution `<()` treats the output of commands as files. In this case:
1. `seq -w 10 -1 3` generates descending numbers from 10 to 3 with zero padding.
2. `sed 's/\(.*\)/ch\1.asciidoc/'` converts those numbers into filenames like `ch10.asciidoc`.
3. The same is done for the destination filenames using `seq -w 11 -1 4`.
4. `paste` combines these two lists side-by-side, creating lines like `ch10.asciidoc ch11.asciidoc`.
5. Finally, `sed 's/^/mv /'` prepends `mv ` to each line, forming executable commands.
```bash
paste <(seq -w 10 -1 3 | sed 's/\(.*\)/ch\1.asciidoc/') \
      <(seq -w 11 -1 4 | sed 's/\(.*\)/ch\1.asciidoc/') \
  | sed 's/^/mv /' \
  | bash
```
This pattern avoids manual typing and is scalable to many files.
x??

---

#### File Renaming Automation Using `seq`, `sed`, and `paste`
This technique automates renaming files by generating source and target filenames, aligning them side-by-side, and converting them into shell commands. It's useful when inserting a new file into a sequence, such as inserting Chapter 3 between Chapters 2 and 4.
:p What is the purpose of combining `seq`, `sed`, and `paste` in the file renaming workflow?
??x
The workflow:
1. `seq -w 10 -1 3` creates descending number list: `10 09 08 ... 03`.
2. `sed` transforms these into filenames: `ch10.asciidoc`, `ch09.asciidoc`, etc.
3. Similarly, `seq -w 11 -1 4` generates `11 10 09 ... 04` and becomes `ch11.asciidoc`, etc.
4. `paste` aligns the two lists to form pairs:
   ```
   ch10.asciidoc ch11.asciidoc
   ch09.asciidoc ch10.asciidoc
   ...
   ch03.asciidoc ch04.asciidoc
   ```
5. Then `sed 's/^/mv /'` prepends `mv ` to each line, turning them into executable `mv` commands.
This approach scales well and reduces human error in large operations.
x??

---

#### Pattern for Generating Reusable Shell Commands
A reusable pattern emerges for generating shell commands from sequences of inputs. It involves generating input lists, aligning them with `paste`, transforming into commands with `sed`, and executing via `bash`. This method is generalizable to other tasks beyond file renaming.
:p What generalizable pattern is used to automate command execution in shell scripts?
??x
The pattern:
1. Generate two sets of inputs (e.g., old filenames and new filenames).
2. Use process substitution to treat them as files.
3. Combine the inputs side-by-side with `paste`.
4. Transform the combined output into commands using `sed`.
5. Pipe the commands to `bash` for execution.

Example:
```bash
paste <(seq -w 10 -1 3 | sed 's/\(.*\)/ch\1.asciidoc/') \
      <(seq -w 11 -1 4 | sed 's/\(.*\)/ch\1.asciidoc/') \
  | sed 's/^/mv /' \
  | bash
```
This pattern allows for scalable automation of repetitive shell tasks.
x??

---

#### Zero-Padded Number Generation with `seq -w`
The `seq` command with the `-w` flag produces zero-padded output, which is essential for consistent file naming. For example, `seq -w 10 -1 3` produces `10 09 08 07 06 05 04 03`.
:p How does `seq -w` help in consistent file naming?
??x
The `-w` flag ensures all numbers are zero-padded to match the width of the largest number. For instance:
```bash
$ seq -w 10 -1 3
10
09
08
07
06
05
04
03
```
This ensures filenames like `ch03.asciidoc` instead of `ch3.asciidoc`, maintaining a consistent format that's easier to sort and parse.
x??

---

#### Constructing Filenames from Numeric Sequences
Using `sed` to transform numeric sequences into structured filenames is a key part of the automation. The regex `s/\(.*\)/ch\1.asciidoc/` captures each number and wraps it in a filename prefix.
:p How does `sed` transform numeric sequences into filenames?
??x
The command:
```bash
seq -w 10 -1 3 | sed 's/\(.*\)/ch\1.asciidoc/'
```
works as follows:
1. `seq -w 10 -1 3` produces:
   ```
   10
   09
   08
   ...
   03
   ```
2. `sed 's/\(.*\)/ch\1.asciidoc/'` captures the entire line (`.*`) and replaces it with `ch` + captured number + `.asciidoc`.
   - `\1` refers to the captured group.
Example:
   ```
   10 -> ch10.asciidoc
   09 -> ch09.asciidoc
   ...
   03 -> ch03.asciidoc
   ```
This pattern is used for both source and destination filenames.
x??

---

#### Executing Generated Commands Safely
After generating commands with `sed`, they must be passed to `bash` for execution. This is done with a pipe (`|`) to avoid needing to write commands to a script file.
:p Why is it necessary to pipe generated commands to `bash`?
??x
Generated commands are shell commands, not executable scripts. They must be interpreted by a shell like bash to execute. For example:
```bash
paste <(...) <(...) | sed 's/^/mv /' | bash
```
Here:
1. `paste` creates pairs of filenames.
2. `sed` prepends `mv ` to each line.
3. `bash` interprets and executes the resulting `mv` commands.
This avoids writing commands to disk and makes the process dynamic and safe for testing (e.g., you can first print without piping to `bash`).
x??

---

#### Using sed to Prepend Command Names
When working with command-line tools, `sed` is a powerful utility for text transformation. One common use case is to prepend a command name to lines in a file. This is done by replacing the beginning-of-line character `^` with a program name and a space. For example, if you want to prepend `ls` to each line, you can use the command `sed 's/^/ls /'`.

This is especially useful when preparing commands for execution via `bash` or when building shell scripts dynamically.

:p How would you prepend the command `echo` to each line of input using `sed`?
??x
```bash
echo "hello" | sed 's/^/echo /'
```
This command takes input (e.g., `hello`) and prepends `echo ` to the start of the line, producing `echo hello`. The `^` matches the start of the line, and `s/^/echo /` substitutes it with `echo ` followed by the original line.
x??

---

#### Comparing Lists of Files Using diff and Process Substitution
When dealing with files that come in pairs (like image files and their corresponding text descriptions), it's useful to compare lists of filenames to detect mismatches. Using `diff` with process substitution allows comparing two lists without writing them to temporary files.

For example, to compare JPEG and text files:
```bash
diff <(ls *.jpg | cut -d. -f1) <(ls *.txt | cut -d. -f1)
```
This command compares the base names of `.jpg` and `.txt` files and highlights differences.

:p What does the command `diff <(ls *.jpg | cut -d. -f1) <(ls *.txt | cut -d. -f1)` do?
??x
It compares the base names of all `.jpg` and `.txt` files in the directory, identifying unmatched pairs. The output shows lines starting with `<` (missing in `.txt`) or `>` (missing in `.jpg`). For example:
```
2d1
< blue_jay
3a3
> oriole
```
This indicates that `blue_jay.jpg` has no corresponding `blue_jay.txt`, and `oriole.txt` has no corresponding `oriole.jpg`.
x??

---

#### Filtering diff Output with grep
After running `diff` on two lists, the output contains lines starting with `<` or `>`. These indicate unmatched entries. To focus only on these unmatched lines, `grep` can be used to filter for lines that begin with `<` or `>`.

For example:
```bash
diff <(ls *.jpg | cut -d. -f1) <(ls *.txt | cut -d. -f1) | grep '^[<>]'
```

:p How can you filter `diff` output to show only unmatched files?
??x
Use `grep '^[<>]'` to filter lines starting with `<` or `>`. For example:
```bash
diff <(ls *.jpg | cut -d. -f1) <(ls *.txt | cut -d. -f1) | grep '^[<>]'
```
This command filters the diff output, showing only unmatched files. Lines like `< blue_jay` or `> oriole` indicate missing files.
x??

---

#### Using awk to Append File Extensions
Once unmatched files are identified, it's useful to reconstruct full filenames by appending the correct extension (`.jpg` or `.txt`). This can be done using `awk` to detect whether a line starts with `<` or `>` and append the appropriate extension.

For example:
```bash
diff <(ls *.jpg | cut -d. -f1) <(ls *.txt | cut -d. -f1) \
  | grep '^[<>]' \
  | awk '/^</{print $2 ".jpg"} /^>/{print $2 ".txt"}'
```

:p How can you reconstruct full filenames of unmatched files using `awk`?
??x
```bash
diff <(ls *.jpg | cut -d. -f1) <(ls *.txt | cut -d. -f1) \
  | grep '^[<>]' \
  | awk '/^</{print $2 ".jpg"} /^>/{print $2 ".txt"}'
```
This script processes lines starting with `<` or `>`, appending `.jpg` or `.txt` respectively to the second field (filename) to reconstruct full unmatched filenames.
x??

---

#### Handling Multiple Dots in Filenames with sed
The `cut` command removes everything from the first dot onward, which fails for filenames with multiple dots (e.g., `yellow.canary.jpg`). To correctly strip the last extension, `sed` with a regex can be used.

For example:
```bash
sed 's/\.[^.]*$//'
```

:p How can you correctly strip the file extension from a filename with multiple dots?
??x
Use `sed 's/\.[^.]*$//'` to remove the last dot and everything after it. For example:
```bash
echo "yellow.canary.jpg" | sed 's/\.[^.]*$//'
```
This produces `yellow.canary`, correctly preserving the part before the final dot.

$$
\text{Regex: } \.[^.]*\$
$$
This regex matches a dot followed by any number of non-dot characters at the end of the line.
x??

---

#### Alternative Method: Using uniq -c to Identify Mismatched Pairs
An alternative approach to detecting unmatched files is to list all files, strip their extensions, and count occurrences. Files that appear exactly once are unmatched.

For example:
```bash
ls *.{jpg,txt} | sed 's/\.[^.]*$//' | uniq -c
```

:p What does the command `ls *.{jpg,txt} | sed 's/\.[^.]*$//' | uniq -c` do?
??x
This command lists all `.jpg` and `.txt` files, removes the file extension using `sed`, and counts how many times each base name occurs. Files that appear once are unmatched:
```bash
2 bald_eagle
1 blue_jay
2 cardinal
1 oriole
```
Here, `blue_jay` and `oriole` are unmatched because they occur only once.
x??

---

#### Combining sed, grep, and awk for File Pair Validation
A full solution to validate matched pairs of files involves combining `sed`, `grep`, and `awk` to extract unmatched files and append correct extensions.

For example:
```bash
diff <(ls *.jpg | sed 's/\.[^.]*$//') \
     <(ls *.txt | sed 's/\.[^.]*$//') \
  | grep '^[<>]' \
  | awk '/^</{print $2 ".jpg"} /^>/{print $2 ".txt"}'
```

:p How do you build a complete one-liner to list unmatched files in a directory?
??x
```bash
diff <(ls *.jpg | sed 's/\.[^.]*$//') \
     <(ls *.txt | sed 's/\.[^.]*$//') \
  | grep '^[<>]' \
  | awk '/^</{print $2 ".jpg"} /^>/{print $2 ".txt"}'
```
This one-liner compares base names of `.jpg` and `.txt` files, filters unmatched lines, and appends the correct extension to each unmatched filename.

This solution correctly handles filenames with multiple dots and ensures that unmatched files are identified accurately.
x??

---

