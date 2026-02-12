# High-Quality Flashcards: 4A005---Efficient-Linux-at-the-Command-Line_processed (Part 4)

**Starting Chapter:** Shell Vocabulary

---

#### Pipeline Concepts in Shell Commands
In shell scripting, pipelines allow commands to communicate by connecting their standard input and output using the pipe character (`|`). This enables the chaining of multiple commands, where each command's stdout becomes the next command's stdin. For example, `command1 | command2` sends the output of `command1` to `command2`. The shell handles this transparently, so individual commands don’t need to know they're part of a pipeline. This modular approach lets users build powerful workflows from simple, reusable tools.

:p What is the purpose of using a pipeline in shell commands?
??x
A pipeline connects the output of one command to the input of another, enabling modular and composable workflows. It allows chaining commands together, where each step processes data from the previous one. For instance, `ls | grep .txt` lists files and filters only those ending in `.txt`. The shell manages the redirection of stdin/stdout behind the scenes, so the commands themselves remain unaware of the pipeline.
x??

---

#### Using `grep` to Filter Lines in a Pipeline
The `grep` command searches for patterns within input text. When used in a pipeline, it can filter lines based on regular expressions or exact matches. The `-v` flag inverts the match, meaning it excludes lines matching the pattern. For example, `grep -v "pattern"` removes all lines containing "pattern". This is useful when removing specific lines from a dataset, such as filtering out unique entries from a list of checksums.

:p How does `grep -v` function in a pipeline?
??x
The `grep -v` command filters out lines that match a given pattern. In a pipeline like `sort | uniq -c | sort -nr | grep -v "      1 "`, it removes lines that start with six spaces, a "1", and a space — which represent unique (non-duplicate) checksums. This helps isolate only the duplicate checksums, which are repeated more than once.
x??

---

#### Identifying Duplicate Files Using Checksums
To detect duplicate files, checksums (like MD5) are computed for each file. Files with identical checksums are duplicates. The process involves computing checksums for all files, extracting the checksum portion, sorting, counting occurrences with `uniq -c`, and filtering to find entries with counts greater than one. This approach leverages shell tools to efficiently detect duplicates without needing complex scripting.

:p How can you detect duplicate files using checksums in a shell pipeline?
??x
You can compute checksums using `md5sum`, extract the checksum part with `cut`, sort and count occurrences using `uniq -c`, then filter for duplicates using `grep -v "      1 "`. The pipeline looks like:
```bash
md5sum *.jpg | cut -c1-32 | sort | uniq -c | sort -nr | grep -v "      1 "
```
This outputs only checksums that appear more than once, indicating duplicate files.
x??

---

#### Extracting Filenames from Checksum Matches
Once you've identified duplicate checksums, you can retrieve the filenames associated with them. By using `grep` to find lines matching a specific checksum, and then `cut` to extract the filename portion, you can identify which files share that checksum. This is a common workflow for confirming duplicates and taking action on them.

:p How do you extract filenames for a specific checksum from a checksum list?
??x
Use `grep` to find lines matching the checksum, then `cut` to extract the filename. For example:
```bash
md5sum *.jpg | grep 146b163929b6533f02e91bdf21cb9563 | cut -c35-
```
Here, `cut -c35-` extracts characters starting from position 35 onward, which corresponds to the filename in the `md5sum` output format.
x??

---

#### Shell Prompt and Command Execution
The shell is an interface between the user and the Linux operating system. It interprets commands, handles expansions like wildcards (`*`), and manages I/O redirections for pipes and files. For example, when a command like `ls *.py` is executed, the shell expands `*.py` into matching filenames before passing them to `ls`. This behavior separates the shell's responsibilities from those of the programs it invokes.

:p What role does the shell play in command execution?
??x
The shell handles tasks such as wildcard expansion, environment variable substitution, and I/O redirection. It translates commands like `ls *.py` into `ls data.py main.py user_interface.py` before executing `ls`. It also manages pipes, allowing programs to communicate without knowing about each other. Understanding this separation helps expert users construct complex commands intuitively.
x??

---

#### Wildcard Expansion in the Shell
Wildcards like `*`, `?`, and `[ ]` are expanded by the shell before a command runs. For instance, `ls *.jpg` expands to a list of all `.jpg` files in the current directory. The shell performs this expansion invisibly, so the command itself never sees the wildcard. This allows powerful, flexible command construction, but it also means that commands must be written with care to avoid unintended behavior.

:p How does the shell handle wildcards like `*`?
??x
The shell expands wildcards like `*.jpg` into matching filenames before executing the command. So `ls *.jpg` becomes `ls image1.jpg image2.jpg ...` if those files exist. This expansion is transparent to the command (`ls`) itself, which only receives the expanded list of filenames. This behavior allows flexible and concise command usage.
x??

---

#### Shell vs. Command Responsibilities
When a command is run, some steps are handled by the program itself, such as processing arguments or reading input. Others are handled by the shell, such as parsing the command line, expanding wildcards, and managing I/O. Understanding this distinction helps users predict how commands behave and build more complex pipelines.

:p Why is it important to understand the division between shell and command responsibilities?
??x
It helps users predict how commands will behave and avoid unexpected results. For example, knowing that the shell expands `*.py` before `ls` runs allows you to write commands confidently. Expert users can construct long, complex pipelines by mentally separating what the shell does from what the command does, leading to more efficient and accurate scripting.
x??

---

#### The Power of Composable Tools
Shell commands are small, focused tools that can be combined to achieve complex tasks. Because they read from stdin and write to stdout, they're inherently composable. This modularity allows users to build powerful workflows by chaining simple commands together, demonstrating the principle that the whole is greater than the sum of its parts.

:p Why are shell commands considered composable?
??x
Because each command reads from stdin and writes to stdout, they can be linked together in pipelines. For example, `ls | grep .txt | wc -l` chains three commands: list files, filter for `.txt`, and count lines. This composability allows users to build complex workflows from simple, reusable components.
x??

---

#### Pattern Matching in the Shell
Pattern matching, also known as globbing, is a feature of the Linux shell that allows users to refer to multiple files or directories using special characters. This is particularly useful when working with many files that share a naming pattern. The shell performs pattern matching before passing arguments to commands, not the command itself. For example, the pattern `chapter*` matches all files starting with "chapter" such as `chapter1`, `chapter2`, etc. This technique helps avoid typing long lists of filenames manually and increases efficiency in shell usage.
:p What is pattern matching in the Linux shell and how does it work?
??x
Pattern matching is a shell feature that lets you use special characters like `*`, `?`, and `[]` to match multiple filenames. The shell expands these patterns into actual filenames before passing them to commands. For instance, `chapter*` expands to all files starting with "chapter", like `chapter1`, `chapter2`, etc. The shell handles this expansion, not the command being run. This is why commands like `grep Linux chapter*` search for "Linux" in all matching files.
x??

---

#### The Asterisk Wildcard (*)
The asterisk `*` is a wildcard character that matches any sequence of zero or more characters (excluding filenames that start with a dot). It's commonly used to match multiple files with similar prefixes. For example, `chapter*` matches files like `chapter1`, `chapter10`, `chapter100`, etc. This is a powerful tool for batch operations in the shell.
:p How does the asterisk wildcard (*) work in shell patterns?
??x
The asterisk `*` matches any sequence of zero or more characters, except those starting with a dot. For example, `chapter*` matches all files beginning with "chapter", such as `chapter1`, `chapter10`, or `chapter100`. It's useful for batch processing files, for example, running `grep Linux chapter*` to search for "Linux" in all chapter files.
x??

---

#### The Question Mark Wildcard (?)
The question mark `?` is a wildcard that matches exactly one character (excluding filenames that start with a dot). It's useful when you want to match a specific number of characters. For example, `chapter?` matches files like `chapter1`, `chapter2`, but not `chapter10`. Using `chapter??` matches exactly two additional characters, such as `chapter10`, `chapter99`.
:p How does the question mark wildcard (?) work in shell patterns?
??x
The question mark `?` matches exactly one character. For example, `chapter?` matches `chapter1`, `chapter2`, but not `chapter10`. To match two additional characters, you use `chapter??`, which would match `chapter10`, `chapter99`, etc. It's useful for narrowing down matches to a specific length.
x??

---

#### Square Bracket Wildcards ([ ])
Square brackets `[]` define a set of characters to match a single character in a filename. For example, `chapter[123]` matches `chapter1`, `chapter2`, or `chapter3`. Ranges can also be specified using a dash, such as `chapter[1-5]` to match chapters 1 through 5. This is useful for selecting specific patterns or ranges of files.
:p How do square bracket wildcards ([ ]) work in shell patterns?
??x
Square brackets `[]` match a single character from a set of characters. For example, `chapter[123]` matches `chapter1`, `chapter2`, or `chapter3`. You can also use ranges like `chapter[1-5]` to match chapters 1 through 5. This is useful when you want to match files based on a limited set of possible characters in a specific position.
x??

#### Combining Wildcards for Complex Matching
You can combine wildcards like `*` and `[]` to create more complex patterns. For example, `chapter*[02468]` matches chapter files ending in even digits. Similarly, `[A-Z]*_*@` matches filenames that begin with an uppercase letter, contain an underscore, and end with an `@` symbol. These combinations allow for precise file selection in shell commands.
:p How can wildcards be combined to match complex file patterns?
??x
Wildcards can be combined to create complex file matching patterns. For example, `chapter*[02468]` matches files like `chapter10`, `chapter24`, etc., where the file ends in an even digit. Another example is `[A-Z]*_*@`, which matches filenames beginning with an uppercase letter, containing an underscore, and ending with an `@` symbol. These patterns help in selecting specific subsets of files based on multiple criteria.
x??

#### Shell Expansion vs Command Execution
When a shell encounters a pattern like `chapter*`, it expands the pattern into matching filenames before passing them to the command. This is a key concept: the shell, not the command, handles pattern expansion. If no files match the pattern, the shell leaves the pattern unchanged and passes it literally to the command. For example, `ls *.doc` when no `.doc` files exist will try to list a file literally named `*.doc`.
:p Why does the shell perform pattern expansion instead of the command?
??x
The shell performs pattern expansion to simplify command-line usage. It translates patterns like `chapter*` into actual filenames before passing them to commands. If no files match, the pattern is passed literally to the command, which may fail. For example, if `*.doc` matches nothing, `ls *.doc` tries to find a file literally named `*.doc`, which does not exist.
x??

#### Using Patterns with Commands That Accept Single Arguments
When using patterns with commands that accept only one argument (like `cd`), the shell will expand the pattern into multiple arguments, which can cause errors. For example, `cd P*` will fail if multiple directories match the pattern, because `cd` expects only one directory argument.
:p What happens when you use a pattern with a command like `cd` that accepts only one argument?
??x
When using a pattern like `P*` with a command like `cd`, which expects only one argument, the shell expands the pattern into multiple matching directories. If there are multiple matches (e.g., `Pictures`, `Poems`, `Politics`), `cd P*` will fail with an error like "cd: too many arguments" because `cd` cannot handle multiple directory arguments.
x??

#### File Paths vs Other Command Arguments
Pattern matching in the shell only works for file and directory paths, not for other arguments like usernames or hostnames. For example, you cannot use `s?rt` to match a username or hostname, because the shell does not apply pattern matching to non-path arguments.
:p Why doesn't pattern matching work with usernames or hostnames?
??x
Pattern matching in the shell only applies to file and directory paths. It is not used for other argument types such as usernames or hostnames. For example, if you try to use `s?rt` as a username, the shell will not expand it to match similar usernames. This is a limitation of shell expansion, which is specifically designed for file system navigation.
x??

#### Interactive vs Non-Interactive Shells
An interactive shell is one that waits for user input and presents a prompt, such as `$`. A non-interactive shell runs a script or sequence of commands and exits without user interaction. The behavior of pattern matching and expansion is the same in both, but interactive shells are more commonly used for manual command entry and testing.
:p What is the difference between interactive and non-interactive shells?
??x
An interactive shell, like the one you use in a terminal, waits for user input and shows a prompt (e.g., `$`). A non-interactive shell runs a script or command sequence and exits without user interaction. Both perform pattern matching the same way, but interactive shells are used for manual tasks, while non-interactive shells are used for automation.
x??

#### Shell Vocabulary: Shell Instance vs Shell Concept
The word "shell" has two meanings: the general concept of a shell (like bash) and a specific running instance of a shell. A shell instance is a running process on a computer that awaits commands. The context usually makes it clear which meaning is intended.
:p What is the difference between a shell and a shell instance?
??x
A shell is the general concept or program (like bash), while a shell instance is a running process of that shell on a specific computer. For example, when you open a terminal, you're using a shell instance of the bash shell. The distinction is important for understanding how shell commands are interpreted and executed.
x??

#### Pattern Matching in Command Arguments
Pattern matching works in any place where a file or directory path is expected. For example, `ls /etc/*.conf` lists all files in `/etc` ending in `.conf`. This allows for flexible and efficient file operations without manually listing each file.
:p How can pattern matching be used in command arguments?
??x
Pattern matching allows you to use wildcards like `*` or `[]` in command arguments to refer to multiple files. For example, `ls /etc/*.conf` lists all files in `/etc` ending in `.conf`. This avoids the need to manually type each filename and makes command-line operations more efficient.
x??

---

#### Shell Variable Evaluation
In shell scripting, variables are evaluated by replacing the variable name (prefixed with `$`) with its assigned value. This process happens before a command runs. For example, `$HOME` evaluates to `/home/smith`, and `$USER` evaluates to `smith`. This allows dynamic use of values in commands and scripts.

:p What does the shell do when it encounters a variable like `$HOME` in a command?
??x
The shell replaces `$HOME` with its value, such as `/home/smith`. This evaluation occurs before the command is executed, so the actual path is passed to the program. For instance, `echo $HOME` prints `/home/smith`.
x??

---

#### Pattern Matching in Shell Commands
The shell performs filename expansion (pattern matching) before passing arguments to a command. Patterns like `*.txt` are expanded to match all files ending in `.txt`. This behavior works with any command that accepts filenames as arguments, including custom programs. It simplifies batch operations on files.

:p How does the shell handle patterns like `*.txt` when used in a command?
??x
The shell expands `*.txt` to match all files in the current directory ending in `.txt`. For example, if there are files `file1.txt` and `file2.txt`, the command `cp *.txt /backup/` becomes `cp file1.txt file2.txt /backup/`.
x??

---

#### Defining Custom Shell Variables
You can define your own shell variables using the syntax `name=value` without spaces around the `=`. For example, `work=$HOME/Projects` creates a variable `work` that holds the path to a project directory. These variables can be used just like predefined ones such as `HOME` or `USER`.

:p How do you define a custom shell variable named `work` pointing to your projects directory?
??x
You use the assignment syntax: `work=$HOME/Projects`. No spaces are allowed around the `=`. After defining it, you can use `$work` in commands like `cd $work` or `ls $work`.
x??

---

#### Using Variables in Commands
Once defined, shell variables can be used in any command that expects a path or argument. For example, after setting `work=$HOME/Projects`, you can run `cd $work` to change directories or `ls $work` to list files in that directory.

:p How can you use a custom variable like `$work` in a command?
??x
You can pass it directly to commands expecting a path. For example, `ls $work` lists files in the directory stored in `$work`. Similarly, `cp myfile $work` copies `myfile` to that directory.
x??

---

#### Predefined Shell Variables
Variables like `HOME` and `USER` are predefined by the shell and set automatically upon login. They provide convenient access to system information such as the user's home directory and username. These are typically uppercase by convention.

:p What are some examples of predefined shell variables and their typical values?
??x
Examples include `HOME`, which holds the home directory path like `/home/smith`, and `USER`, which holds the username like `smith`. These are set by the system at login and are available throughout the session.
x??

---

#### Echo Command for Variable Evaluation
The `echo` command is useful for observing how the shell evaluates variables. When you run `echo $USER`, it prints the value of the `USER` variable. Similarly, `echo ch*ter9` expands the pattern to match files like `chapter9`.

:p How can you observe variable evaluation using the `echo` command?
??x
Run `echo $USER` to see the username or `echo ch*ter9` to see how a pattern matches files like `chapter9`. This shows how the shell substitutes variables and expands patterns before passing arguments to commands.
x??

---

#### Variable Scope and Persistence
Shell variables are local to the current shell session and are not automatically available to child processes unless exported. However, within the same shell, they persist until the shell exits or is redefined.

:p What happens to a shell variable after the shell session ends?
??x
The variable is lost unless it's exported using `export work=$HOME/Projects`. Then, child processes (like scripts) can inherit and use the value. Otherwise, it remains local to the current shell session.
x??

---

#### Shell Variable Assignment and Commands
Assigning a value to a variable using `name=value` does not execute any command; it only sets the variable. If you want to run a command using the variable, you must explicitly invoke it, such as `cd $work`.

:p What happens when you run `work=$HOME/Projects`?
??x
It sets the variable `work` to the value `/home/smith/Projects`. It does not execute a command. To use this variable in a command, you must reference it with `$work`, e.g., `cd $work`.
x??

---

#### Combining Variables with Commands
You can combine variables with commands in various ways. For example, `ls $work` lists files in the directory pointed to by `$work`. This allows for flexible and reusable scripts.

:p How would you list files in a directory stored in a variable using `ls`?
??x
You write `ls $work`, where `$work` is the variable holding the path. For example, if `work=/home/smith/Projects`, then `ls $work` lists files in `/home/smith/Projects`.
x??

---

#### Variable Evaluation in Shell Commands
In shell scripting, variables are expanded by the shell *before* a command runs. For example, when you run `echo $HOME`, the shell substitutes the value of `$HOME` (like `/home/smith`) before passing it to `echo`. This means `echo` itself doesn't understand variables — it just prints what it receives.

:p What happens when the shell processes a command with a variable like `$HOME`?
??x
The shell evaluates the variable *before* executing the command. So `echo $HOME` becomes `echo /home/smith` before the command runs. The `echo` command receives the literal string `/home/smith` and prints it, not the variable itself.
x??

---

#### Patterns vs Variables in File Operations
Shell patterns like `*.txt` match filenames based on globbing rules, and they include the full path if specified. Variables, however, are replaced with their literal value without special handling for paths. This difference is critical when moving files.

:p Why does `mv mammals/*.txt reptiles` work, but `mv mammals/$FILES reptiles` does not?
??x
`mammals/*.txt` uses globbing to match full paths (`mammals/lizard.txt`, `mammals/snake.txt`), so `mv` operates correctly. In contrast, `$FILES` expands to `lizard.txt snake.txt`, and `mv mammals/$FILES reptiles` becomes `mv mammals/lizard.txt snake.txt reptiles`, which tries to find `snake.txt` in the current directory, not `mammals/`.
x??

---

#### Using Loops to Handle File Paths with Variables
When working with variables that contain filenames, you must explicitly prepend directory names to avoid path errors. A loop can iterate over the filenames and apply the correct path to each.

:p How can you correctly move files from a subdirectory using a variable that holds filenames?
??x
Use a `for` loop to iterate over the variable contents and prepend the directory path to each file. For example:
```bash
FILES="lizard.txt snake.txt"
for f in $FILES; do
    mv mammals/"$f" reptiles
done
```
This ensures each file is moved from the correct location.
x??

---

#### Aliases in Shell
Aliases are shortcuts for longer commands. They are defined using the `alias` command and can simplify repetitive tasks. Aliases are expanded when typed, so they act like macros for command sequences.

:p How do you define and use a shell alias?
??x
You define an alias using `alias name="command"`. For example:
```bash
alias ll="ls -l"
alias g="grep"
```
Then typing `ll` runs `ls -l`, and `g` runs `grep`. Aliases save time and reduce typing.
x??

---

#### Overriding Built-in Commands with Aliases
You can redefine an existing command by creating an alias with the same name. This replaces the original command in your shell session, which can be useful for customizing behavior.

:p What happens if you create an alias with the same name as an existing command?
??x
The alias overrides the original command. For example:
```bash
alias ls="ls -la"
```
Now typing `ls` runs `ls -la` instead of the default `ls` behavior.
x??

---

#### Shell Expansion and Command Parsing
Shell expansion includes variable expansion, pathname expansion (globbing), and command substitution. These expansions happen *before* the command is executed, so it's essential to understand how and when they occur.

:p Why is understanding shell expansion important for scripting?
??x
Because shell expansions happen before command execution, incorrect assumptions about expansion can lead to errors. For example, unquoted variables or improper use of patterns can cause commands to operate on unintended files or arguments.
x??

---

#### Shell Aliasing and Command Shadowing
In shell environments, aliases allow you to create shortcuts for commands. When an alias is defined with the same name as an existing command, it shadows that command within the current shell session. This means that when you invoke the command name, the alias is executed instead of the original command. For example, defining `alias less="less -c"` makes every call to `less` automatically include the `-c` flag to clear the screen before displaying each page. This behavior is useful for customizing command behavior without modifying system-wide settings.

:p What does it mean to shadow a command in a shell?
??x
Shadowing a command means defining an alias with the same name as an existing command. When invoked, the shell uses the alias instead of the original command, effectively overriding its behavior in the current shell session. For instance, `alias less="less -c"` causes all uses of `less` to automatically clear the screen before displaying content.
x??

---

#### Listing and Managing Aliases
To view all defined aliases in a shell, run the `alias` command without arguments. To see the value of a specific alias, pass its name as an argument to `alias`. To remove an alias from the current shell session, use the `unalias` command followed by the alias name. These commands help manage customizations and ensure that shell behavior is as intended.

:p How do you list all aliases in a shell?
??x
Run the command `alias` with no arguments to display all defined aliases and their values. For example:
```
$ alias
alias g='grep'
alias ll='ls -l'
```
Each line shows the alias name and its associated command.
x??

---

#### Input and Output Redirection in Shell
Shell redirection allows controlling where a command's input and output go. Standard output (`stdout`) can be redirected to a file using `>`, which overwrites the file if it exists. To append to a file instead of overwriting, use `>>`. Similarly, standard input (`stdin`) can be redirected from a file using `<`. This is useful for processing files without interactive input or combining data from multiple sources.

:p How do you redirect standard output to a file in the shell?
??x
Use the `>` symbol followed by the filename to redirect standard output to a file. If the file doesn't exist, it is created. If it does exist, its contents are overwritten. Example:
```bash
grep Perl animals.txt > outfile
```
This writes the output of `grep` to `outfile` instead of the terminal.
x??

---

#### Appending Output with `>>`
When you want to add output to an existing file rather than replacing it, use the `>>` operator. This appends new content to the end of the file. It is particularly useful for logging or accumulating results from multiple commands into one file.

:p What is the purpose of the `>>` redirection operator?
??x
The `>>` operator appends standard output to a file instead of overwriting it. If the file does not exist, it is created. Example:
```bash
echo "New line" >> log.txt
```
This adds "New line" to the end of `log.txt`.
x??

---

#### Input Redirection Using `<`
Input redirection allows a command to read from a file instead of waiting for user input from the keyboard. This is done using the `<` symbol followed by a filename. It is commonly used with commands like `wc`, which can read from stdin when no arguments are given, but also accept filenames directly.

:p How do you redirect input from a file in the shell?
??x
Use the `<` symbol followed by a filename to redirect input from a file. Example:
```bash
wc < animals.txt
```
This causes `wc` to read from `animals.txt` instead of waiting for keyboard input.
x??

---

#### Standard Error (stderr) and Redirection
In Unix/Linux systems, programs generate two types of output streams: standard output (`stdout`) and standard error (`stderr`). While `stdout` is typically displayed on screen or redirected using `>`, `stderr` often contains error messages and is not affected by `>`. To redirect `stderr`, use `2>` followed by a filename. To append `stderr`, use `2>>`. Both streams can be redirected together using `&>`.

:p Why can't standard error be redirected using `>` alone?
??x
Because `>` only redirects `stdout`, not `stderr`. Error messages are sent to `stderr`, which must be explicitly redirected using `2>`. Example:
```bash
cp nonexistent.txt file.txt 2> errors
```
This redirects error messages to `errors` while allowing normal output to be discarded or handled separately.
x??

---

#### Redirecting Both stdout and stderr
To redirect both `stdout` and `stderr` to the same file, use the `&>` operator. This combines both streams into one file, ensuring all output from a command is captured together. This is useful when you want to log everything a command produces, including errors.

:p How do you redirect both stdout and stderr to the same file?
??x
Use the `&>` operator followed by a filename. Example:
```bash
cat goodfile.txt nonexistent.txt &> all.output
```
This captures both standard output and error messages into `all.output`.
x??

---

#### Combining Redirections in Practice
You can combine multiple redirections in a single command to control how output and errors are handled. For example, you might want to display output on screen while logging errors to a file. You can achieve this by redirecting `stderr` separately and leaving `stdout` to default to the terminal.

:p What is an example of combining redirections for stdout and stderr?
??x
Suppose you run:
```bash
cp source.txt dest.txt > success.log 2> error.log
```
Here, `stdout` (success messages) are redirected to `success.log`, and `stderr` (errors) are redirected to `error.log`. This keeps output and errors separate for debugging.
x??

---

