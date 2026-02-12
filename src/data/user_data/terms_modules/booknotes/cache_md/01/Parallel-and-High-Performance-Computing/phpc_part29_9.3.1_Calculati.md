# High-Quality Flashcards: Parallel-and-High-Performance-Computing_processed (Part 29)


**Starting Chapter:** 9.3.1 Calculating theoretical peak memory bandwidth

---


#### Memory Bandwidth Calculation

Background context: Understanding how to calculate the theoretical peak memory bandwidth is crucial for assessing GPU performance. The formula involves the memory clock rate (in GHz), the width of memory transactions in bits, and a transaction multiplier.

Formula:
$$\text{Theoretical Bandwidth} = \text{Memory Clock Rate (GHz)} \times \text{Memory Bus (bits)} \times \left(\frac{\text{1 byte}}{8 \text{ bits}}\right) \times \text{transaction multiplier}$$

:p How do you calculate the theoretical peak memory bandwidth for a GPU?
??x
To calculate the theoretical peak memory bandwidth, multiply the memory clock rate in GHz by the width of memory transactions (in bits), divide by 8 to convert bytes to bits, and then multiply by the transaction multiplier.
For example:
```java
// Example calculation for NVIDIA V100 with HBM2 memory
double theoreticalBandwidth = 0.876 * 4096 * (1 / 8) * 2;
```
x??

---


#### Roofline Performance Model for GPUs (Babel STREAM)
Background context: The Roofline model is used to analyze and predict the performance limits of a system based on memory bandwidth and flop performance. This concept applies similarly to both CPUs and GPUs, helping understand their operational efficiency.

:p How does the roofline performance model apply to measuring GPU performance with Babel STREAM?
??x
The Roofline model helps in understanding the performance limits by plotting the FLOPs/Byte (arithmetic intensity) against GFLOP/s. For GPUs, it involves testing various operations and visualizing their performance on a graph.

For instance, when running the Babel STREAM benchmark using the Empirical Roofline Toolkit, you can generate roofline plots for different GPU architectures like NVIDIA V100 and AMD Vega 20:

```bash
git clone https://bitbucket.org/berkeleylab/cs-roofline-toolkit.git
cd cs-roofline-toolkit/Empirical_Roofline_Tool-1.1.0
cp Config/config.voltar.uoregon.edu Config/config.V100_gpu
# Edit the configuration file for V100 GPU details.
./ert Config/config.V100_gpu

# Repeat similar steps for AMD Vega 20.
```

This process generates detailed plots that illustrate the theoretical and actual performance limits, showing where operations are memory bound or compute bound.

Example of roofline plot output:

```plaintext
Figure 9.5 Roofline plots for NVIDIA V100 and AMD Vega 20:
NVIDIA V100: 
   - DRAM bandwidth = 793.1 GB/s
   - L1 cache bandwidth = 2846.3 GB/s

AMD Vega 20:
   - DRAM bandwidth = 744.0 GB/s
   - L1 cache bandwidth = 2082.7 GB/s
```

x??

---

---


#### Identifying Application Boundaries
Background context: The plot helps identify if applications are memory-bound or compute-bound based on their arithmetic intensity and memory bandwidth requirements.

:p How can you determine if an application is memory-bound or compute-bound?
??x
You can determine if an application is memory-bound or compute-bound by comparing its arithmetic intensity (flops/load) to the GPU's performance characteristics plotted on a roofline plot. If the application's line intersects above the GPU device point, it is memory-bound; below indicates compute-bound.

For example:
- A typical 1 flop/word application would be compared against GPUs like the GeForce GTX 1080Ti.
x??

---

