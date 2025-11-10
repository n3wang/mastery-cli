# High-Quality Flashcards: Designing-data-intensive-applications_-the-big-ideas-behind-reliable-scalable_processed (Part 29)


**Starting Chapter:** Part III. Derived Data

---


#### Systems of Record vs. Derived Data
Background context: In a complex application, data is often stored and processed using different systems that serve various needs. A system of record holds the authoritative version of your data, while derived data systems process or transform existing data to meet specific requirements.

:p Define a system of record.
??x
A system of record, also known as a source of truth, holds the authoritative version of your data. When new data comes in, e.g., as user input, it is first written here. Each fact is represented exactly once (typically normalized). If there is any discrepancy between another system and the system of record, then the value in the system of record is (by definition) the correct one.
x??

---
#### Derived Data Systems
Background context: Derived data systems take existing data from another system and transform or process it to meet specific needs. This can include caches, denormalized values, indexes, materialized views, and more.

:p Define derived data systems.
??x
Derived data systems store the result of taking some existing data from another system and transforming or processing it in some way. If you lose derived data, you can recreate it from the original source. Examples include caches, denormalized values, indexes, materialized views, and predictive summary data derived from usage logs.
x??

---
#### Systems Architecture Considerations
Background context: In building a complex application, understanding whether each system is a system of record or a derived data system helps clarify the dataflow through your system. This distinction can help in managing dependencies between different parts of the architecture.

:p What are the key distinctions between systems of record and derived data systems?
??x
The key distinctions include:
- **System of Record**: Holds the authoritative version of the data, with each fact represented exactly once (typically normalized). If there is any discrepancy, the system of record's value is correct.
- **Derived Data System**: Stores transformed or processed versions of existing data. Loss can be recovered from the original source.

This distinction helps in managing dependencies and ensuring clarity in the dataflow through your application architecture.
x??

---
#### Batch-Oriented Dataflow Systems
Background context: Batch-oriented dataflow systems, like MapReduce, are discussed as tools for building large-scale data systems. They provide a framework for processing large datasets in batches.

:p What is an example of a batch-oriented dataflow system?
??x
An example of a batch-oriented dataflow system is **MapReduce**. It provides a framework for processing and generating big data sets with a parallel, distributed algorithm on a cluster.
x??

---
#### Data Streams Processing
Background context: Data streams allow real-time processing with lower delays compared to batch systems. This topic will cover applying the ideas from MapReduce to data streams.

:p How do data streams differ from traditional batch-oriented systems?
??x
Data streams differ from traditional batch-oriented systems in that they process data in real-time or near-real-time, allowing for low-latency responses and continuous updates. While batch systems are designed for processing large datasets over time periods (e.g., hours), data stream processing handles continuous input and outputs results on the fly.
x??

---
#### Future Applications
Background context: The final chapter will explore ideas on how to use these tools to build reliable, scalable, and maintainable applications in the future. This includes integrating batch and streaming systems for a more comprehensive approach.

:p What is the main objective of exploring future application ideas?
??x
The main objective is to integrate batch and streaming systems effectively, enabling the building of reliable, scalable, and maintainable applications that can handle both historical data processing and real-time data analysis.
x??

---


#### Offline Systems Definition
Background context: In data processing, offline systems are those that operate without direct user interaction. These systems typically process large amounts of input data and produce output over an extended period.

:p What is a batch processing system also known as?
??x
Offline or Batch Processing System.
x??

---
#### MapReduce Overview
Background context: MapReduce is a programming model for processing large datasets with a parallel, distributed algorithm on a cluster. The key concepts involve splitting data into chunks (maps) and then combining the results (reduces).

:p What are the two main steps in the MapReduce process?
??x
The two main steps in the MapReduce process are:
1. Map: Process input data to produce intermediate key-value pairs.
2. Reduce: Combine the intermediate values associated with a common key.
x??

---
#### Punch Card Machines and Batch Processing
Background context: Early batch processing systems used punch card machines, such as Hollerith machines, which processed large datasets by reading punched cards to compute aggregate statistics.

:p What is an example of early batch processing technology?
??x
An example of early batch processing technology is the Hollerith machine, used in the 1890 US Census. It read punched cards and computed aggregate statistics from large inputs.
x??

---
#### MapReduce as a Programming Model
Background context: MapReduce provides a high-level programming model for distributed computing on large datasets.

:p What does MapReduce offer compared to traditional parallel processing systems?
??x
MapReduce offers higher abstraction over low-level operations, making it easier to develop scalable and fault-tolerant applications. It handles partitioning, scheduling, and recovery automatically.
x??

---
#### Example of Unix Tools for Data Processing
Background context: Before the advent of MapReduce, Unix tools like `grep`, `sort`, `awk`, and `sed` were widely used for text processing tasks.

:p What is a common command in Unix for filtering lines based on patterns?
??x
A common command in Unix for filtering lines based on patterns is `grep`. For example:
```sh
grep "pattern" filename
```
This filters the content of `filename`, returning only those lines that contain the pattern.
x??

---
#### MapReduce Implementation Example
Background context: MapReduce can be implemented using frameworks like Hadoop, which provides tools for writing and executing distributed applications.

:p How does a simple map function in MapReduce work?
??x
A simple map function takes an input key-value pair, processes it, and generates one or more intermediate key-value pairs. Here’s a pseudocode example:
```java
public class SimpleMap {
    public static void map(Text key, Text value, Context context) throws IOException, InterruptedException {
        String[] words = value.toString().split(" ");
        for (String word : words) {
            context.write(new Text(word), new IntWritable(1));
        }
    }
}
```
This function splits the input text into words and emits each word with a count of 1.
x??

---


#### SSTables and LSM-Trees Overview
SSTables (Sorted String Tables) are part of the LevelDB storage format, commonly used in database systems like Apache Cassandra. These files store sorted data efficiently, allowing for quick retrieval. LSM-Trees (Log-Structured Merge-Trees) combine memory-mapped structures with on-disk storage to provide fast writes and efficient reads.

:p What is SSTables and its role in LSM-Trees?
??x
SSTables are immutable disk-based tables that contain sorted key-value pairs. They form the base of an LSM-tree by providing a persistent, on-disk representation of data stored in memory. The main advantage of using SSTables is their efficiency for read operations, as they can be accessed directly from disk.

The SSTable structure ensures that frequently accessed data remains in memory (in MemTables) while less frequently accessed data gets written to the SSTables.
??x
---

#### Sorting and Merging Strategy
Sorting chunks of data in memory and writing them out as segment files is a common practice. These segments can then be merged into larger sorted files, which aligns with the sequential access patterns that perform well on disks.

:p How do sorting and merging work together to optimize disk operations?
??x
Sorting smaller chunks of data in memory allows for efficient handling of large datasets that exceed available RAM. Once these segments are written out as file chunks (segment files), they can be merged into larger, sorted files. This process is similar to the merge step in mergesort algorithms.

Mergesort's sequential access pattern makes it well-suited for disk operations since it minimizes random I/O and maximizes sequential reads and writes.
??x
---

#### Unix Philosophy and Command Chaining
The Unix philosophy emphasizes modular design, where programs are designed to do one thing well. This is achieved through the use of pipes, allowing data to flow seamlessly between different commands.

:p What is the significance of the Unix philosophy in modern software development?
??x
The Unix philosophy promotes simplicity and modularity by focusing on building small, specialized tools that can be combined to perform complex tasks. It encourages rapid prototyping, experimentation, and automation through the use of pipes and command chaining.

For example, using `sort` followed by `uniq -c` in a pipeline allows for easy analysis without needing to write a custom program.
??x
---

#### URL and HTTP as Uniform Interfaces
URLs provide a uniform way to identify resources on the web. HTTP (Hypertext Transfer Protocol) is used to transfer data between servers and clients, ensuring that any resource can be accessed from anywhere.

:p How do URLs and HTTP exemplify uniform interfaces in computing?
??x
URLs provide a universal identifier for resources, allowing users to access content from different websites with ease. HTTP ensures that these resources can be reliably fetched by specifying the methods (GET, POST, etc.) and formats used for communication between servers and clients.

This uniformity makes it possible for developers to build applications that can seamlessly interact with various web services without requiring deep knowledge of each service's internal implementation.
??x
---


#### Uniform Interface in Unix
Background context explaining that in Unix, a uniform interface enables programs to be easily composed. This interface is primarily through files or file descriptors which represent various types of data such as actual files on the filesystem, communication channels, device drivers, and sockets.

:p What is the significance of having a uniform interface in Unix?
??x
A uniform interface allows different programs to interact seamlessly because they all use the same input/output format. This means that any program's output can be used as another program's input without needing special handling.
For example:
- Files on the filesystem
- Communication channels (stdin, stdout)
- Device drivers (`/dev/audio`, `/dev/lp0`)
- Sockets representing network connections

This uniformity is achieved through file descriptors which are just ordered sequences of bytes. This simple interface enables a wide variety of data types to be processed uniformly.
x??

---

#### Composability in Unix Shell
Background context explaining how the ability to compose small programs into powerful jobs enhances the functionality of Unix shells like bash.

:p What does "composability" mean in the context of Unix shells?
??x
Composability refers to the capability of combining multiple small, specialized tools or commands through a shell. This allows users to create complex data processing pipelines by linking simple utilities together.
For example:
- Using `sort` followed by `uniq` to eliminate duplicate records from sorted output
- Combining `awk`, `sort`, and `head` in various ways to analyze logs

This composability is enabled by the uniform interface, where each program outputs a file (sequence of bytes), which can be piped into another program.
x??

---

#### Parsing Records in Unix Tools
Background context explaining how different Unix tools handle record parsing, using newline characters as default separators.

:p How do Unix tools typically parse records?
??x
Unix tools often treat input files as ASCII text and split lines by newline (`\n`, 0x0A) characters. This is the default behavior for many tools like `awk`, `sort`, `uniq`, etc.
For example:
- A line in a file might be split into fields using whitespace or tab characters, but this can vary based on specific tool options.

However, other delimiters such as commas (`,`), pipes (`|`), or custom separators can also be used. Tools like `xargs` offer multiple options to specify how input should be parsed.
x??

---

#### Example with xargs
Background context explaining that `xargs` is a versatile utility for executing commands by reading from standard input.

:p What does the `xargs` command do?
??x
The `xargs` command reads items from standard input, builds and executes command lines from them. It's useful for generating dynamic arguments to other commands or programs.
For example:
```bash
echo -e "apple\nbanana" | xargs echo
```
This will output: 
```
apple banana
```

The `xargs` command provides several options to parse input, such as `-d` (delimiter), `-n` (number of arguments per line), and `-I` (replace string in command).
x??

---


#### Uniform Interface of Unix Tools
Background context: The uniform interface of Unix tools, specifically focusing on ASCII text and its usage in shell scripting. While not perfect, it remains a remarkable feature that allows for smooth interoperation between different programs.

:p What are some limitations of using `$7` to extract the URL in log analysis?
??x
The use of `$7` is not ideal because it depends on fixed field positions which can vary and may change if the log format evolves. A more descriptive variable like `$request_url` would be more readable and maintainable.

```bash
# Example of using $7
$ cat logs.txt | cut -d' ' -f7

# Descriptive variable for URL
$ cat logs.txt | awk '{print $REQUEST_URL}'
```
x??

---

#### Standard Input (stdin) and Standard Output (stdout)
Background context: Unix tools utilize `stdin` and `stdout` to handle input and output. This design allows programs to be easily piped together, providing a flexible way to process data.

:p How does using `stdin` and `stdout` facilitate the composition of different tools?
??x
Using `stdin` and `stdout`, a shell user can connect various programs in any desired way without worrying about file paths or direct file handling. This promotes loose coupling between components, making it easier to integrate new tools into existing workflows.

```bash
# Example pipeline
$ cat input.txt | tool1 | tool2 | tool3 > output.txt

# Direct file handling vs. stdin/stdout
# Direct File Handling:
$ tool1 input.txt > intermediate.txt && tool2 intermediate.txt > final.txt

# Using stdin and stdout:
$ cat input.txt | tool1 | tool2 | tool3 > final.txt
```
x??

---

#### Pipes in Unix Tools
Background context: Pipes (`|`) allow the output of one process to be used as the input for another, facilitating complex data processing without intermediate files.

:p How do pipes work in a shell command?
??x
Pipes connect the standard output (stdout) of one program directly to the standard input (stdin) of another program. This allows for chaining multiple commands into a pipeline where each step processes and filters the data.

```bash
# Example with `grep` and `sort`
$ cat logs.txt | grep "error" | sort -u > errors.txt

# Explanation:
# 'cat logs.txt' outputs lines to stdout.
# 'grep "error"' reads from stdin, finds lines containing "error", and outputs those lines to stdout.
# 'sort -u' reads from stdin, sorts the unique lines, and writes them to stdout.
```
x??

---

#### Loose Coupling in Unix Tools
Background context: The concept of loose coupling is evident when programs do not depend on specific file paths but use `stdin` and `stdout`. This design promotes flexibility and ease of integration.

:p Why is separation of logic from input/output wiring important?
??x
Separating the core logic (program functionality) from I/O operations enhances modularity and reusability. Programs can be written to focus solely on their primary tasks, while the shell takes care of directing data flow between them.

```bash
# Example: A tool that translates user-agent strings
$ cat logs.txt | translate_user_agent > translated_logs.txt

# The `translate_user_agent` script:
#!/bin/bash
while IFS= read -r line; do
    # Logic to translate user agent string
    echo "$line"
done
```
x??

---

#### Inversion of Control (IoC)
Background context: In Unix tools, the inversion of control is seen in how programs delegate input/output handling to the shell environment. This design principle promotes flexible and reusable code.

:p What does inversion of control mean in the context of Unix tools?
??x
Inversion of control (IoC) means that instead of a program managing its own I/O operations, it relies on an external entity (like the shell) to handle input and output redirection. This allows programs to be more focused on their core logic.

```bash
# Example using IoC
$ cat logs.txt | filter_logs | process_logs > output.txt

# The `filter_logs` script:
#!/bin/bash
while IFS= read -r line; do
    # Filter logic here
done

# The `process_logs` script:
#!/bin/bash
while IFS= read -r line; do
    # Process logic here
done
```
x??

