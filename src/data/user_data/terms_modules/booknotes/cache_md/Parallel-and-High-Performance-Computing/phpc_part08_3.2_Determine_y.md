# High-Quality Flashcards: Parallel-and-High-Performance-Computing_processed (Part 8)


**Starting Chapter:** 3.2 Determine your hardware capabilities Benchmarking. 3.2.1 Tools for gathering system characteristics

---


#### Determining Hardware Capabilities: Benchmarking

Background context explaining the concept. To characterize the hardware for performance, various metrics are used such as FLOPs/s (floating-point operations per second), data transfer rate between memory levels (GB/s), and energy usage (Watts). These help in understanding the theoretical peak performance of different components.

Empirical measurements using micro-benchmarks like STREAM can provide insights into real-world performance. Theoretical models give an upper bound, while empirical measurements are closer to actual operating conditions.

:p What are some metrics used to characterize hardware for performance?
??x
Some key metrics include the floating-point operations per second (FLOPs/s), data transfer rate between memory levels (GB/s), and energy usage (Watts). These help in understanding the theoretical peak performance of different components.
x??

---


#### Cache Hierarchy in Modern Systems
This section provides background on how cache hierarchies have evolved to manage data access in modern CPUs.

:p What is the significance of the memory hierarchy and its evolution over time?
??x
The memory hierarchy has grown deeper with the addition of multiple levels of cache, designed to bridge the speed gap between processing units and main memory. Modern processors use a multi-level cache system (L1, L2, L3) to store frequently accessed data closer to the CPU cores.

The general formula for calculating theoretical memory bandwidth is:
\[ BT = MTR \times Mc \times Tw \times Ns \]
Where:
- \( MTR \) is the data transfer rate in millions of transfers per second (MT/s),
- \( Mc \) is the number of memory channels,
- \( Tw \) is the memory transfer width in bits,
- \( Ns \) is the number of sockets.

For example, a system with 3200 MT/s DDR memory, 4 memory channels, and 64-bit transfer width:
\[ BT = (3200 \text{ MT/s} \times 4 \times 8/8 \times 1) = 12800 \text{ MB/s} \]

This evolution helps in improving overall system performance by reducing the latency and increasing the throughput of data access.
x??

---

---


#### Memory Latency
Explanation about how long it takes to retrieve a single byte from different cache levels up to main memory, with a focus on the concept of memory latency. The impact of accessing contiguous data is also discussed.

:p What is memory latency?
??x
Memory latency refers to the time required for the first byte of data from each level of memory hierarchy (L1, L2, L3, or main memory) to be retrieved by the CPU. For a single byte, this can range from 4 cycles in a CPU register, up to 75 cycles in L1 cache, 10 cycles in L2 cache, and 400 cycles in main memory.

To optimize performance, data is loaded in chunks called cache lines (typically 64 bytes or 8 doubles) rather than one byte at a time. This reduces the number of times data needs to be accessed from slower memory levels.

x??

---


#### Cache Lines and Data Transfer
Explanation on why loading data in cache lines (64 bytes or 8 doubles) is more efficient than loading one byte at a time, detailing the impact on performance.

:p Why is loading data in cache lines important?
??x
Loading data in cache lines improves performance significantly because it reduces the number of times slower memory levels need to be accessed. When contiguous data is loaded into cache lines (typically 64 bytes or 8 doubles), nearby values can be reused without needing to access main memory multiple times.

For example, if a single byte is requested and not in any cache, it would take around 50 cycles/double to load from main memory. However, loading an entire cache line at once (64 bytes) allows the CPU to reuse data more efficiently, reducing the total number of memory accesses and improving overall performance.

x??

---


#### Roofline Model
Explanation on how the roofline model integrates both memory bandwidth limit and peak flop rate into a single plot, distinguishing its use from traditional theoretical models.

:p What is the purpose of the roofline model?
??x
The roofline model combines both the memory bandwidth limit and the peak floating-point capability (FLOPS) into one plot. It helps in understanding the limits of performance for different types of computations and can identify whether a system is limited by memory bandwidth or computational speed.

For example, if you are doing big calculations out of main memory, the model would show that performance is bottlenecked by the memory bandwidth. The roofline model uses regions to illustrate each performance limit:

- The line represents peak flop rate.
- The region above this line indicates memory-bound workloads where memory bandwidth limits performance.
- The region below this line shows compute-bound workloads where computational speed limits performance.

x??

---


#### Roofline Model Concept
Background context: The roofline model is a graphical representation that shows the relationship between arithmetic intensity and floating-point operations per second (FLOPS) on a computer. It helps in understanding where an application's performance bottlenecks are.

:p What is the roofline model?
??x
The roofline model is a graphical tool used to visualize the relationship between memory bandwidth, FLOPS, and arithmetic intensity on a computer. The model consists of a horizontal line representing maximum theoretical FLOPS (memory bandwidth) and a sloped line that represents achievable FLOPS as a function of arithmetic intensity.

For high arithmetic intensity, where there are many floating-point operations compared to the data loaded, the maximum theoretical FLOPS is the limit. As arithmetic intensity decreases, memory load times dominate, reducing the achievable FLOPS.
x??

---


#### Applying Roofline Model
Background context: The roofline model can be applied to a CPU or GPU by determining the maximum theoretical FLOPS and plotting it against different levels of arithmetic intensity.

:p How do you apply the roofline model?
??x
To apply the roofline model, follow these steps:
1. Determine the maximum theoretical FLOPS (memory bandwidth) using the STREAM Benchmark results.
2. Plot a horizontal line on a graph representing this maximum FLOPS.
3. For different levels of arithmetic intensity, plot points showing achievable FLOPS. As arithmetic intensity decreases, the slope of the line decreases.

The resulting plot will show a characteristic "roofline" shape, indicating where the application performance is limited by memory bandwidth or FLOPS.
x??

---

---


#### Roofline Model
Background context: The roofline model is a graphical tool that illustrates the theoretical and achievable performance of an application. It helps in understanding the efficiency of your code by visualizing the relationship between floating-point operations (FLOPs) and memory bandwidth.

In the provided graph, the horizontal line represents the maximum FLOPs, while the sloped lines represent the various levels of cache and DRAM bandwidths.

:p What does the roofline model help you understand?
??x
The roofline model helps visualize the theoretical peak performance limits and actual achievable performance by showing the relationship between floating-point operations (FLOPs) and memory bandwidth. It assists in identifying whether an application is limited by FLOPs or memory bandwidth, which can guide optimizations.

In the provided graph:
- The horizontal line represents the maximum FLOPs.
- The sloped lines represent different levels of cache and DRAM bandwidths.
x??

---


#### Call Graph Analysis
Background context: Call graphs provide a visual representation of subroutine dependencies in an application. They highlight hot spots, which are routines that consume significant execution time.

Tools like Valgrind’s cachegrind can generate call graphs, combining information about hot spots and subroutine dependencies for deeper analysis.

:p How do you use call graphs to analyze your application?
??x
Call graphs help identify performance bottlenecks by visualizing the execution flow of subroutines. They highlight routines that consume significant time (hot spots) and show how these subroutines depend on each other.

To generate a call graph using Valgrind’s cachegrind, you would run:
```bash
valgrind --tool=cachegrind ./your_application
```
After execution, the `cachegrind.out.x` file will contain the profiling data. Using tools like KCacheGrind or other visualization tools can help analyze this data to find hot spots and dependencies.

For example, if you run:
```bash
kcachegrind cachegrind.out.x
```
It opens an interface where you can explore the call graph and see execution times for each routine.
x??

---

---


#### Profiling and Performance Analysis
Background context: This section describes how to use profiling tools like Callgrind from Valgrind suite for performance analysis. The objective is to identify bottlenecks and optimize code through techniques such as parallelization with OpenMP and vectorization.

:p What are the key steps involved in using Callgrind for generating a call graph of an application?
??x
The key steps involve installing necessary tools, downloading and building the mini-app CloverLeaf, running Valgrind with specific options to generate a call graph file, and visualizing it using QCacheGrind.

Example code:
```sh
# Step 1: Install Valgrind and KcacheGrind or QCacheGrind
sudo apt-get install valgrind kcachegrind

# Step 2: Clone CloverLeaf repository
git clone --recursive https://github.com/UK-MAC/CloverLeaf.git

# Step 3: Build the serial version of CloverLeaf
cd CloverLeaf/CloverLeaf_Serial
make COMPILER=GNU IEEE=1 C_OPTIONS="-g -fno-tree-vectorize" OPTIONS="-g -fno-tree-vectorize"

# Step 4: Run Valgrind with Callgrind tool
cp InputDecks/clover_bm256_short.in clover.in
edit clover.in and change cycles from 87 to 10
valgrind --tool=callgrind -v ./clover_leaf

# Step 5: Visualize the call graph using QCacheGrind
qcachegrind
```
x??

---


#### Call Graph and Its Visualization
Background context: The call graph generated by Callgrind provides insights into how different functions are called during program execution. Understanding this can help identify performance bottlenecks.

:p What is a call stack, and how does it work?
??x
A call stack is a chain of routines that calls the present location in the code. When a routine calls another subroutine, it pushes its address onto the stack. At the end of the routine, the program pops the address off the stack as it returns to the prior calling routine. This hierarchical structure helps track function invocations and their return paths.

Explanation:
```java
public class Example {
    public void methodA() {
        System.out.println("Method A");
        methodB();
    }

    public void methodB() {
        System.out.println("Method B");
    }
}
```
In the above example, if `methodA` is called and then calls `methodB`, the call stack would first push `methodA`'s address onto the stack, execute its body (prints "Method A"), and then push `methodB`'s address onto the stack. Once `methodB` finishes executing, both addresses are popped off the stack in reverse order.

x??

---


#### Inclusive Timing Measurement
Inclusive timing measures the total time spent within a function, including its child functions. This is useful for understanding the overall contribution of a routine to the entire runtime.

:p What does inclusive timing measure?
??x
Inclusive timing measures the total run time of a function, including the time taken by all its called subroutines. This provides an accurate picture of how much of the overall execution time is spent within that specific function.
x??

---


#### Call Hierarchy and Run Time Analysis
The call hierarchy in profiling tools shows the routines calling each other and their respective run times. Understanding the call hierarchy helps identify where most of the runtime is spent.

:p What does a call hierarchy reveal about an application's performance?
??x
A call hierarchy reveals which functions are called by others, and how much time is spent in these functions. This helps pinpoint inefficient or heavily used routines that might benefit from optimization.
x??

---


#### CloverLeaf Performance Profiling with Intel Advisor
Intel Advisor can be used to profile applications and generate roofline models, providing insights into arithmetic intensity and computational rates.

:p How does Intel Advisor help in performance profiling?
??x
Intel Advisor helps by collecting runtime data on an application, analyzing it using the roofline model, which separates computation from memory access efficiency. This allows developers to identify bottlenecks related to both floating-point operations and memory usage.
x??

---


#### Roofline Model in Action
The roofline model visualizes computational limits and performance, showing the theoretical maximum performance based on arithmetic intensity and hardware capabilities.

:p What is the purpose of using the roofline model?
??x
The purpose of using the roofline model is to understand the relationship between computational throughput (FLOPS) and memory bandwidth. It helps in identifying whether an application is limited by computation or memory access, guiding optimization strategies.
x??

---


#### Viewing Roofline Analysis Results
The roofline analysis summary provides details on arithmetic intensity and floating-point computational rate, helping to assess the efficiency of an application.

:p What information does the roofline analysis provide?
??x
The roofline analysis provides summaries such as arithmetic intensity (FLOPS/byte or FLOPS/word) and floating-point computational rates. These metrics help in assessing whether an application is memory-bound or compute-bound, guiding further optimization efforts.
x??

---


#### Summary Statistics from Intel Advisor
Summary statistics include metrics like arithmetic intensity and floating-point performance rate.

:p What are the key summary statistics generated by Intel Advisor?
??x
Key summary statistics generated by Intel Advisor include:
- Arithmetic intensity (FLOPS/byte or FLOPS/word)
- Floating-point computational rate in GFLOPS/s

These stats help understand the efficiency of the application's computation and memory access patterns.
x??

---

---


#### Roofline Plot and Performance Analysis
Background context: The roofline plot provides a visual representation of an application's performance relative to theoretical peak. In this specific case, the roofline plot shows that the CloverLeaf mini-app is bandwidth limited and far left of the compute-bound region, indicating poor arithmetic intensity.
:p What does it mean if an application is shown as bandwidth limited in a roofline plot?
??x
If an application is shown as bandwidth limited in a roofline plot, it means that the performance is constrained by memory bandwidth rather than computational power. This suggests that optimizing for better arithmetic intensity (more flops per byte) could significantly improve performance.
x??

---


#### Arithmetic Intensity Calculation
Background context: Arithmetic intensity measures the amount of computation relative to data movement. It's often used in performance analysis to identify bottlenecks.
:p How is arithmetic intensity calculated?
??x
Arithmetic intensity is calculated by dividing the total floating-point operations (FLOPs) by the total bytes of memory accessed. For double precision:
```plaintext
Arithmetic Intensity = FLOPs / Bytes
```
In this case, for CloverLeaf using double precision:
```plaintext
Operational Intensity = 41274 MFLOPs/sec / 123319.9692 MB/s = 0.33 FLOPs/byte
```
This value indicates that the application is not memory-bound, as it requires less than one floating-point operation per byte of data.
x??

---


#### LIKWID Marker Initialization and Usage
Background context: LIKWID is a performance analysis tool that can be used to measure specific sections of code using markers. This allows for detailed profiling and performance evaluation.

:p How do you initialize and use LIKWID markers in your code?
??x
To initialize and use LIKWID markers, follow these steps:

1. Insert the initialization line at the start of the section you want to profile:
   ```c
   LIKWID_MARKER_INIT;
   ```
2. Initialize each thread if needed (though typically not necessary for single-threaded regions):
   ```c
   LIKWID_MARKER_THREADINIT;
   ```
3. Register a performance counter name and start it before your code block:
   ```c
   LIKWID_MARKER_REGISTER("Compute");
   LIKWID_MARKER_START("Compute");
   ```

4. Execute the section of code you want to measure.

5. Stop the marker after executing the code:
   ```c
   LIKWID_MARKER_STOP("Compute");
   ```
6. Close all markers once your profiling is complete:
   ```c
   LIKWID_MARKER_CLOSE;
   ```

These steps help isolate and analyze specific performance aspects of your application.
x??

---


#### Plotting Arithmetic Intensity and Performance
Background context: Visualizing arithmetic intensity (KI) against performance helps in identifying bottlenecks and optimizing applications.

:p How do you plot arithmetic intensity and performance using matplotlib in a Jupyter notebook?
??x
To plot arithmetic intensity and performance using matplotlib in a Jupyter notebook:

1. Download the plotting script from the GitHub repository.
2. Modify `data.txt` with your measured performance data.
3. Run the following Python code to generate the roofline plot:
   ```python
   import matplotlib.pyplot as plt

   KI = [0.5, 0.6, 0.7]  # Example arithmetic intensities
   performance = [10, 20, 30]  # Corresponding performance rates in GFLOPs/s
   
   plt.plot(KI, performance)
   plt.xlabel('Arithmetic Intensity (KI)')
   plt.ylabel('Performance (GFLOPs/s)')
   plt.title('Roofline Plot')
   plt.show()
   ```

This code will plot the roofline and help you visualize how your application's performance compares to theoretical limits.
x??

---

