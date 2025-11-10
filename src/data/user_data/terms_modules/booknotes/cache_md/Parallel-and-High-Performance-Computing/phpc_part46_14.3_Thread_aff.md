# High-Quality Flashcards: Parallel-and-High-Performance-Computing_processed (Part 46)


**Starting Chapter:** 14.3 Thread affinity with OpenMP

---


---
#### Thread Affinity Overview
Thread affinity is crucial for optimizing applications using OpenMP by ensuring threads are tied to specific locations that minimize memory latency and maximize bandwidth. This helps in maintaining locality of reference, which is essential for performance.

:p What is thread affinity in the context of OpenMP?
??x
Thread affinity in OpenMP refers to the technique of binding or associating threads with specific processor cores or sockets to optimize performance by reducing memory access latency and improving data locality.
x??

---


#### Code Example for Vector Addition
Here’s a code snippet from the provided example, demonstrating the use of OpenMP directives and thread placement reporting.

:p What does this C code do?
??x
This C code demonstrates vector addition using OpenMP and includes functions to report thread placement. It uses `OMP_PLACES` and `OMP_PROC_BIND` to control thread affinity and placement.
```c
#include <stdio.h>
#include <time.h>
#include "timer.h"
#include "omp.h"
#include "place_report_omp.h"

#define ARRAY_SIZE 80000000

static double a[ARRAY_SIZE], b[ARRAY_SIZE], c[ARRAY_SIZE];

void vector_add(double *c, double *a, double *b, int n);

int main(int argc, char *argv[]) {
    #ifdef VERBOSE
        place_report_omp();
    #endif
    struct timespec tstart;
    double time_sum = 0.0;

    #pragma omp parallel 
    { 
        #pragma omp for 
        for (int i=0; i<ARRAY_SIZE; i++) {
            a[i] = 1.0;
            b[i] = 2.0;
        }

        #pragma omp masked
        cpu_timer_start(&tstart);
        vector_add(c, a, b, ARRAY_SIZE);
        #pragma omp masked
        time_sum += cpu_timer_stop(tstart);
    } // end of omp parallel

    printf("Runtime is %lf msecs", time_sum);
}

void vector_add(double *c, double *a, double *b, int n) {
    #pragma omp for 
    for (int i=0; i < n; i++) {
        c[i] = a[i] + b[i];
    }
}
```
x??

---

---


#### Automating Exploration with Multiple Threads
This section explains how to automate the exploration of different OpenMP settings for varying numbers of threads, which can help in optimizing performance by adjusting thread placement and binding based on system characteristics.

:p How can you automate the exploration of OpenMP settings?
??x
To automate the exploration of OpenMP settings, you can use scripts that vary the number of threads and change environment variables like `OMP_PLACES` and `OMP_PROC_BIND`. By running such a script, you can observe how different settings affect performance.

Example steps:

1. Create a build directory and navigate to it.
2. Configure and make your application with verbose options enabled.
3. Run the program with different numbers of threads and environment variable configurations.

```sh
mkdir build && cd build
cmake -DCMAKE_VERBOSE=on ..
make

export OMP_NUM_THREADS=44
./vecadd_opt3
```

By varying `OMP_PLACES` and `OMP_PROC_BIND`, you can test different placements and bindings to find the optimal configuration for your specific workload.
x??

---

---


#### Performance Script: `calc_avg_stddev()`
The script contains a function named `calc_avg_stddev()` which calculates the average runtime of multiple trials and their standard deviation. This is essential to understand how different settings affect program performance.

:p What does the `calc_avg_stddev()` function do?
??x
The `calc_avg_stddev()` function processes input data, typically from timing results, to calculate the mean (average) and standard deviation of the runtime values over multiple trials. This helps in quantifying the variability and consistency of performance across different configurations.

```bash
# Example pseudocode for calc_avg_stddev()
function calc_avg_stddev(inputData)
    sum = 0.0
    sum2 = 0.0
    count = 0
    for each value in inputData
        sum += value
        sum2 += (value * value)
        count += 1
    end

    avg = sum / count
    std_dev = sqrt((sum2 - (sum*sum)/count) / count)
    print "Number of trials: ", count, "avg: ", avg, "std dev: ", std_dev
end function
```
x??

---


#### Executing Performance Tests
The script sets the environment variables `OMP_NUM_THREADS`, `OMP_PLACES`, and `OMP_PROC_BIND` to test different thread counts, core placements, and binding settings. It then runs performance tests with these configurations and compares their speedup against a single-threaded baseline.

:p How does the script set up its test conditions?
??x
The script sets up multiple test scenarios by configuring environment variables for OpenMP such as `OMP_NUM_THREADS`, `OMP_PLACES`, and `OMP_PROC_BIND`. It then runs performance tests with various thread counts, core placements, and binding settings. The objective is to measure the speedup of running a program (`./vecadd_opt3`) under different conditions.

```bash
# Example setup code for testing
exec_string="./vecadd_opt3"
conducted_tests(exec_string)

THREAD_COUNT="88 44 22 16 8 4 2 1"
for my_thread_count in $THREAD_COUNT
do
    unset OMP_PLACES
    unset OMP_PROC_BIND
    export OMP_NUM_THREADS=$my_thread_count

    conducted_tests(exec_string)

    PLACES_LIST="threads cores sockets"
    BIND_LIST="true false close spread primary"

    for my_place in $PLACES_LIST
    do
        for my_bind in $BIND_LIST
        do
            export OMP_NUM_THREADS=$my_thread_count
            export OMP_PLACES=$my_place
            export OMP_PROC_BIND=$my_bind

            conducted_tests(exec_string)
        done
    done
done
```
x??

---


#### Thread and Core Placement Strategies
Background context: The graph in Figure 14.4 illustrates how varying thread and core placement strategies can affect parallel scaling for an `omp_proc_bind=spread` setting. The text suggests that spreading processes across cores (Threads spread, Cores spread) is generally more beneficial than keeping them close together.

:p What does the term "threads spread cores spread" imply in process placement?
??x
"Threads spread cores spread" implies a strategy where both threads and cores are distributed across multiple processor cores to maximize parallelism and optimize resource utilization.
x??

---

---


#### Performance Gain from Custom Placement
Background context: Recent versions of OpenMPI provide tools for custom placement, which can lead to performance gains. These gains depend on how well the scheduler optimizes placement.

:p What potential benefit can be gained by optimizing process placement using OpenMPI?
??x
Optimizing process placement with OpenMPI can yield a performance gain, typically in the range of 5-10%, but it can also result in much larger benefits. The exact gain depends on how well the scheduler is configured and optimized for the specific workload.
x??

---

---


#### Core Affinity and Memory Allocation
Core affinity in MPI applications can significantly impact performance by influencing how processes are mapped to physical cores. If the application's memory requirements exceed the available RAM on a single node, it may fail during memory allocation.

:p How does spreading out the processes across multiple nodes help address memory allocation issues?
??x
Spreading out the processes across multiple nodes helps because if the total memory requirement of the application exceeds the capacity of one node, distributing the ranks ensures that enough overall memory is available. In this case, by running 32 MPI processes (8 per node), the application can utilize the combined memory resources of four nodes.

```bash
# Example command to spread out processes across multiple nodes
mpirun -n 32 --npernode 8 ./MPIAffinity | sort -n -k 4
```
x??

---


#### NUMA Region and Socket Affinity
NUMA regions are typically aligned with the sockets of a node. Setting affinity to a socket can optimize data locality, which is important for performance in distributed computing.

:p What does setting the core affinity to the NUMA region mean in this context?
??x
Setting the core affinity to the NUMA region means that each MPI process is bound to specific cores within a particular NUMA domain. In this case, the output indicates that ranks 0-31 are spread across four nodes, with each rank's core affinity corresponding to either the first or second half of the available cores on their respective node.

```bash
# Example command to set socket affinity
mpirun -n 32 --npersocket 4 ./MPIAffinity | sort -n -k 4
```
x??

---


#### Alternative Placement Strategy
Another approach is to use `--npersocket` instead of `--npernode`. This can help in scenarios where processes need to communicate more frequently with their nearest neighbors, as adjacent ranks might be placed on the same NUMA domain.

:p How does using --npersocket 4 differ from --npernode 8?
??x
Using `--npersocket 4` means that four MPI processes are allocated per socket. This can be beneficial if communication between processes is frequent, as it ensures that processes communicating with each other are closer in terms of memory locality.

```bash
# Example command to set process placement based on sockets
mpirun -n 32 --npersocket 4 ./MPIAffinity | sort -n -k 4
```
x??

---

---


#### Binding MPI Processes to Cores
Background context: In this scenario, we are exploring how to control where MPI processes run on a multi-core system by binding them to specific hardware resources. The `--bind-to` option in `mpirun` allows us to specify the granularity of process placement and affinity. For example, using `--bind-to core`, we bind each process to a specific core.
:p What does the `--bind-to core` option do in MPI applications?
??x
This option binds each MPI process to a specific hardware core, which can help optimize performance by reducing cache contention and improving data locality. In our example, using this binding method ensures that processes are assigned to cores 0-17 and 36-53.
```shell
mpirun -n 32 --npersocket 4 --bind-to core ./MPIAffinity | sort -n -k 4
```
x??

---


#### NUMA Binding and Placement
Background context: Non-Uniform Memory Access (NUMA) refers to a system where memory access times depend on the location of the data relative to the processing element. Binding processes to specific NUMA nodes can help reduce inter-process communication latency.
:p How does binding MPI processes to NUMA regions work?
??x
Binding MPI processes to NUMA regions ensures that processes are placed in such a way that they share memory and resources within the same NUMA node, reducing inter-process communication latency. In our example, using `--bind-to numa` results in four adjacent ranks being on the same NUMA region.
```shell
mpirun -n 32 --npersocket 4 --bind-to numa ./MPIAffinity | sort -n -k 4
```
x??

---

