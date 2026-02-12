# High-Quality Flashcards: Parallel-and-High-Performance-Computing_processed (Part 48)


**Starting Chapter:** 14.7.2 Changing your process affinities during run time

---


#### Setting Affinities in Your Executable
Background context: The text discusses embedding pinning logic into an executable to simplify process placement and affinity management. This approach can be more user-friendly than using complex mpirun commands, as it integrates affinity settings directly into the application.

:p How can you set affinities within your executable?
??x
You can use libraries like QUO (which is built on top of hwloc) to programmatically set and change process affinities. For example, in a C or Java program, you would query hardware information, determine optimal core bindings, and then apply these settings.

Example using the QUO library involves querying hardware resources and setting affinity policies:

```c
// Pseudocode for setting CPU affinity with QUO
#include <hwloc.h>

int main() {
    hwloc_topology_t topology;
    hwloc_obj_type_t type;

    // Initialize topology
    hwloc_topology_init(&topology);
    hwloc_topology_load(topology);

    // Query the core resources
    type = hwloc_get_type_by_name(topology, "core");
    if (type == HWLOC_OBJ_TYPE_NOTFOUND) {
        fprintf(stderr, "Error: cannot find 'core' type.\n");
        return -1;
    }

    int socket0_cores[] = { /* list of cores on socket 0 */ };
    hwloc_cpuset_setsocket_mask(socket0_cores, topology, 0);

    // Set the affinity
    if (hwloc_set_cpuset_affinity(topology, NULL) != 0) {
        fprintf(stderr, "Error setting CPU affinity.\n");
        return -1;
    }

    // Continue with your application logic

    hwloc_topology_destroy(topology);
    return 0;
}
```

x??

---


#### Run Time Affinity Management with QUO
Background context: The text introduces the QUO library for setting and modifying affinity at runtime. This is particularly useful when applications call libraries that use both MPI ranks and OpenMP threads, requiring dynamic adjustments to process binding.

:p What does the QUO library enable in terms of run-time affinity management?
??x
The QUO library allows you to dynamically set and change CPU affinities during program execution. It leverages hwloc for hardware topology information and provides an easy-to-use interface for managing process bindings.

Example initialization using QUO:

```c
// Pseudocode for initializing QUO in C
#include <quo.h>

int main() {
    // Initialize QUO context
    quo_context_t ctx = quo_init();

    // Set core affinity (example)
    hwloc_obj_type_t type;
    int socket0_cores[] = { /* list of cores on socket 0 */ };
    quo_set_affinity(ctx, "core", socket0_cores);

    // Continue with your application logic

    quo_destroy(ctx);
    return 0;
}
```

x??

---


#### Process Placement and Bindings in MPI, OpenMP, and MPI+OpenMP
Background context: The handling of process placement and bindings is a relatively new but crucial topic in parallel programming. This involves understanding how processes are assigned to specific cores or nodes in hardware architectures, which can significantly impact performance.

This area is particularly important as it influences the efficiency and scalability of parallel applications running on high-performance computing (HPC) systems. The handling methods vary between MPI, OpenMP, and their combination, each offering unique features and capabilities.

:p What are process placement and bindings in HPC contexts?
??x
Process placement refers to how processes or threads are assigned to specific cores or nodes within a hardware architecture. Bindings determine the association of tasks (processes or threads) with particular processors or memory locations, optimizing resource utilization and performance.

Bindings can be set at various levels: process, thread, or task level. For example, in MPI+OpenMP applications, both MPI processes and OpenMP threads can have specific binding requirements to optimize load balancing and reduce contention.
x??

---


#### OpenMP: Beyond the Common Core
Background context: OpenMP is a widely-used shared-memory parallel programming API that allows for multi-threading within a single process. It offers various mechanisms for task scheduling and resource management, including affinity settings.

The `mpirun` command from OpenMPI provides options to control process placement, which can be further customized using the Portable Hardware Locality (hwloc) library.

:p What are some resources for exploring advanced OpenMP features?
??x
- T. Mattson and H. He, "OpenMP: Beyond the common core," available at https://mng.bz/aK47.
- The man page for `mpirun` in OpenMPI can be found at https://www.open-mpi.org/doc/v4.0/man1/mpirun.1.php.

These resources offer detailed information on advanced features of OpenMP, including how to manage process placement and affinity settings.

x??

---


#### Portable Hardware Locality (hwloc)
Background context: hwloc is a standalone package that provides a universal hardware interface for most MPI implementations and many other parallel programming software applications. It helps in managing process placements and thread bindings efficiently.

The hwloc library can be used with both OpenMPI and MPICH, making it a versatile tool for optimizing the performance of parallel applications across different environments.

:p What is Portable Hardware Locality (hwloc)?
??x
Portable Hardware Locality (hwloc) is a standalone package that provides a hardware interface to manage process placements and thread bindings. It works with various MPI implementations like OpenMPI and MPICH, making it a universal tool for optimizing parallel applications on diverse hardware architectures.

:p How does hwloc help in managing process placements?
??x
hwloc helps by providing detailed information about the underlying hardware architecture (e.g., cores, sockets, NUMA nodes). This information is used to make informed decisions about where processes and threads should be placed to optimize performance. For example, it can ensure that data locality is maintained, reducing inter-node communication overhead.

:p What are some resources for exploring hwloc?
??x
- The main page of the hwloc project at https://www.open-mpi.org/projects/hwloc/.
- B. Goglin, “Understanding and managing hardware affinities with Hardware Locality (hwlooc),” presented at High Performance and Embedded Architecture and Compilation (HiPEAC) 2013, available at http://mng.bz/gxYV.

These resources provide comprehensive information on how to use hwloc effectively for affinity management in parallel applications.
x??

---


---
#### Discovering Hardware Characteristics and Running Tests

Background context: To optimize system performance, it is crucial to understand the hardware characteristics of your devices. This involves running various tests using a specific script to gather data on how the hardware behaves under different conditions.

:p What did you discover about optimizing your system's use after running the test suite?

??x
After running the test suite with the provided script (Listing 14.1), we discovered key insights into our system's performance characteristics, such as cache utilization, memory bandwidth usage, and CPU efficiency. These findings help in making informed decisions about task placement and resource allocation.

For example:
```bash
# Sample command to run the test script
./run_tests.sh
```

This process helps identify bottlenecks and optimize parallel tasks for maximum performance.
x??

---


#### Combining Vector Addition and Pythagorean Formula

Background context: To maximize data reuse, the vector addition and Pythagorean formula were combined in a single routine. This approach aimed to leverage common variables to reduce overhead.

:p How did combining vector addition and Pythagorean formula impact your study?

??x
Combining vector addition with the Pythagorean formula allowed for better data reuse, potentially reducing memory access times and improving overall performance. The new routine:
```c
// Combined routine
for (i = 0; i < N; i++) {
    c[i] = a[i] + b[i];
    d[i] = sqrt(a[i]*a[i] + b[i]*b[i]);
}
```

This approach helped in reducing the number of memory accesses and improving cache utilization, leading to better performance but with more complex tasks per loop iteration.
x??

---


#### Setting Placement and Affinity within Applications

Background context: Managing process placement and affinity is crucial for optimizing parallel application performance. Tools exist to set these parameters within applications dynamically.

:p How can you set the placement and affinity within an application?

??x
To set the placement and affinity within an application, you can use specific environment variables or library functions provided by the runtime system. For example, in OpenMP, you can use `omp_set_num_threads` to specify the number of threads and `omp_get_thread_num` for thread management.

For example:
```c
#include <omp.h>

int main() {
    // Set the number of threads explicitly
    omp_set_num_threads(4);

    #pragma omp parallel for
    for (i = 0; i < N; i++) {
        c[i] = a[i] + b[i];
    }

    return 0;
}
```

This approach allows fine-grained control over thread distribution, ensuring optimal use of hardware resources.
x??

---

---


#### Management of High-Performance Clusters
Background context: As the number of users on high-performance computing clusters increases, it becomes necessary to manage the system to ensure efficient job execution and prevent conflicts.
:p Why is management important in high-performance computing?
??x
Management is crucial in high-performance computing because it helps maintain order and efficiency in resource allocation. Without proper management, multiple jobs could collide, leading to slow performance and potential job crashes.

---


#### Batch Schedulers: Overview
Background context explaining the importance of batch schedulers in managing Beowulf clusters. In the late 1990s, Beowulf clusters emerged as a way to build computing clusters using commodity hardware. However, without software control and management, these clusters would not be productive resources.
:p What is the significance of batch schedulers in Beowulf clusters?
??x
Batch schedulers are crucial because they manage the workload on busy clusters efficiently. They ensure that jobs are allocated to nodes based on policies defined by queue rules, thus maximizing resource utilization and job throughput. Without a batch system, multiple users can lead to inefficiencies and conflicts.
```python
# Example of a simple scheduling rule in pseudocode
def schedule_job(job):
    if job.memory <= max_memory and job.time <= max_time:
        allocate_node_to_job(job)
    else:
        add_job_to_queue(job)

# Example usage
schedule_job(job1)  # Checks if the job can be scheduled directly or added to a queue
```
x??

---


#### Managing Back-End Nodes with Queues
Background context explaining that back-end nodes are organized into queues, each with specific policies for job size and runtime. This setup helps in efficient resource allocation.
:p How do back-end nodes manage jobs?
??x
Back-end nodes manage jobs by allocating them based on predefined queue rules. These rules typically consider the number of processors or memory needed and the maximum runtime allowed. By organizing nodes into queues, the system ensures fair usage and maximizes overall efficiency.
```python
# Example of a queue in pseudocode
class JobQueue:
    def __init__(self, max_processors, max_time):
        self.max_processors = max_processors
        self.max_time = max_time

    def can_accept_job(self, job):
        return job.processors <= self.max_processors and job.time <= self.max_time
```
x??

---


#### Big Job Management
Discussing strategies for managing large jobs in a batch system, including queue management and non-work hours scheduling.

:p What is the recommended approach for running big parallel jobs?
??x
For big parallel jobs, it is recommended to use the back-end nodes through the batch system queues. Additionally, keep the number of jobs in the queue small to avoid monopolizing resources. Running large jobs during non-work hours can also help other users get interactive nodes for their work.
```shell
# Example: Submitting a job with a specific time limit and dependency on previous job
qsub -l walltime=24:00:00 -W depend=afterok:prev_job_id script.sh
```
x??

---


#### Batch Job Submission Strategies
Discussing strategies for submitting multiple jobs in an efficient manner, including the use of shell scripts and job dependencies.

:p How can users submit multiple jobs efficiently without monopolizing queue resources?
??x
Users should submit a limited number of jobs initially (e.g., 10) and resubmit more as needed. This approach helps maintain balance within the queue system. Shell scripts or batch dependency techniques can automate this process, ensuring jobs are submitted in an organized manner.
```shell
# Example: Simple shell script to submit multiple jobs
#!/bin/bash

for i in {1..10}
do
    qsub -t $i my_job_script.sh
done
```
x??

---


#### Checkpointing for Long-Running Jobs
Explaining the importance of checkpointing for long-running batch jobs to optimize resource usage.

:p What is the purpose of implementing checkpointing for long jobs?
??x
Checkpointing is crucial for managing long-running batch jobs by catching termination signals or using wall clock timings. It allows subsequent jobs to resume from a saved state, making optimal use of available time and resources. This technique ensures that jobs can complete even if interrupted.
```shell
# Example: Implementing checkpointing in a script
#!/bin/bash

for ((i=1; i<=20; i++))
do
    echo "Running iteration $i"
    # Simulate some work
    sleep 5s
    
    # Checkpointing logic (example pseudo-code)
    if [ $((i % 5)) -eq 0 ]; then
        echo "Checkpointing at iteration $i"
        # Save state to disk or file system
    fi
done
```
x??

---


---

#### Batch Scripting Basics
Batch systems require a structured approach to job submission, different from ad-hoc job launches. Understanding these systems leads to more efficient resource utilization.

:p What is the purpose of using batch scripts in computing environments?
??x
The primary purpose of using batch scripts is to manage and schedule jobs efficiently, ensuring better use of computational resources. Batch scripts allow for automated job execution, especially useful for long-running or overnight tasks that require no user interaction.
x??

---


#### Running Applications on Allocated Nodes
Once nodes are allocated, you can run applications as required.

:p How do you launch a parallel application using mpirun after allocating nodes with salloc?
??x
After allocating nodes with the `salloc` command, you can launch a parallel application like this:

```
computenode22> mpirun -n 32 ./my_parallel_app
```

This command uses `mpirun` to start the parallel application `./my_parallel_app` on 32 processes. Note that the specific commands and options might vary depending on your system.
x??

---


#### Transitioning to Batch Scripts
Batch scripts are useful for running jobs without user interaction, allowing automation and resubmission in case of failures.

:p How do you convert an interactive job into a batch script?
??x
To convert an interactive job into a batch script, first create a text file with the necessary `sbatch` directives. Here’s how to modify the previous example:

```bash
#SBATCH -N 2       # Request two nodes
#SBATCH -n 32      # Request 32 processors
#SBATCH -t 1:00:00 # Run for one hour

mpirun -n 32 ./my_parallel_app
```

Save this as `my_batch_job` and submit it using:

```
frontend> sbatch my_batch_job
```

This script specifies the number of nodes, processors, and runtime, followed by the command to run the application.
x??

---


#### Batch Scheduler Overview
Slurm is a popular batch scheduler used for managing parallel computing jobs. It helps organize and manage compute resources efficiently by scheduling jobs to run at specific times and on designated nodes. The options provided allow for precise control over job execution, resource allocation, and output redirection.

:p What are the key features of Slurm as described in the text?
??x
Slurm provides various options such as specifying node count, number of tasks (processors), wall time, job names, and error/output file locations. It also supports exclusive use or oversubscription of resources to optimize performance based on specific requirements.

```bash
# Example SBATCH directives for a Slurm script
#SBATCH -N 1      # Requests one compute node
#SBATCH -n 4      # Requests four processors
#SBATCH -t 01:00:00 # Requests the job to run for up to 1 hour
```
x??

---


#### Job Naming and Output Files
Slurm allows you to name your jobs and direct their output (both standard out and error) to specific files. This is useful for tracking job progress and debugging.

:p How do you specify the names of your job and where it should write its outputs?
??x
You can name your job using `#SBATCH --job-name=<name>` and redirect both standard out and error output to specified files with `--output` and `--error`. For example:

```bash
#SBATCH --job-name=my_job      # Names the job "my_job"
#SBATCH --output=run.out       # Redirects standard output to run.out
#SBATCH --error=run.err        # Redirects standard error to run.err
```
x??

---


#### OverSubscription and Exclusive Use
OverSubscription allows more tasks than available nodes, while exclusive use ensures that only one job can be run per node. These options are useful for optimizing resource utilization.

:p What do the `--exclusive` and `--oversubscribe` options in Slurm control?
??x
The `--exclusive` option requests exclusive use of a node or set of resources, meaning no other jobs will run on these nodes during your job's execution. The `--oversubscribe` option allows more tasks than the number of processors available, which can be useful for filling idle time.

```bash
#SBATCH --exclusive  # Requests exclusive resource use
#SBATCH --oversubscribe  # Allows oversubscription of resources
```
x??

---

