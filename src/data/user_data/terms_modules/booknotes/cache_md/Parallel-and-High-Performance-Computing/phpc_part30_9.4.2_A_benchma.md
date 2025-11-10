# High-Quality Flashcards: Parallel-and-High-Performance-Computing_processed (Part 30)


**Starting Chapter:** 9.4.2 A benchmark application for PCI bandwidth

---


#### Host to Device Memory Transfer Pseudocode
Explanation of the CUDA-based code that allocates and copies data from the CPU (host) to the GPU (device).

:p What is the purpose of `cudaMallocHost` in this context?
??x
The purpose of `cudaMallocHost` is to allocate memory for data on the host side. This function allocates pinned memory, which means the memory can be accessed more efficiently by both the CPU and the GPU.

```c
cudaError_t status = cudaMallocHost((void**)&x_host, N * sizeof(float));
if (status != cudaSuccess) {
    printf("Error allocating pinned host memory");
}
```

This ensures that the data allocated in `x_host` can be accessed directly by both the CPU and the GPU without any additional overhead.

??x
The function returns a pointer to the newly allocated memory, which is then used for data transfers. If there's an error (indicated by `status` not equaling `cudaSuccess`), it prints an error message.
x??

---


---
#### Pinned and Pageable Memory
Background context: The difference between pinned and pageable memory affects how data is transferred to the GPU. Pinned memory cannot be paged out of RAM, while pageable memory can. This impacts the performance and efficiency of GPU transfers.

:p What is the main difference between pinned and pageable memory in the context of GPU memory allocation?
??x
Pinned memory refers to memory that cannot be swapped out to disk (paged out), allowing it to be directly accessed by the GPU without making a copy. Pageable memory, on the other hand, can be paged out to disk, which means it must first be copied into pinned memory before being sent to the GPU.

Code example:
```java
// Allocating pinned and pageable memory (pseudo-code)
Pointer pinnedMemory = cudaMallocHost((void**)&hostPtrPinned, size);
Pointer pageableMemory = cudaMallocHost((void**)&hostPtrPageable, size);

// Pinned memory can be directly used by CUDA kernels
cudaMemcpyAsync(devicePtr, hostPtrPinned, size, cudaMemcpyHostToDevice);

// Pageable memory needs to be copied into pinned memory first
cudaMemcpy(hostPtrPinned, pageableMemory, size, cudaMemcpyHostToHost);
cudaMemcpyAsync(devicePtr, hostPtrPinned, size, cudaMemcpyHostToDevice);
```
x??

---


#### Multi-GPU Platforms and MPI
Background context: In multi-GPU systems, the use of Message Passing Interface (MPI) is often necessary due to the distributed nature of the GPUs. Each MPI rank can be assigned to a single GPU for data parallelism or multiple ranks can share a GPU.

:p What are some common configurations in multi-GPU platforms?
??x
Common configurations include:
- A single MPI rank driving each GPU.
- Multiple MPI ranks multiplexing their work on a single GPU.

This approach is particularly useful for applications requiring high levels of parallelism and data parallelism across multiple GPUs. However, efficient multiplexing requires optimized software as early implementations faced performance issues due to inefficiencies in handling concurrent access to the same GPU resources.

x??

---


#### Data Transfer Optimization Across Networks
Background context: Efficient data transfer between GPUs across networks is crucial for applications that require inter-GPU communication. The standard method involves multiple copies and stages, which can be inefficient. Newer technologies like NVIDIA GPUDirect® allow for direct data transfers over the PCI bus without these intermediate steps.

:p What are some steps involved in the standard data transfer process?
??x
The standard data transfer process includes:
1. Copying data from one GPU to host processor.
   - a. Move the data across the PCI bus to the processor.
   - b. Store the data in CPU DRAM memory.
2. Sending data via an MPI message to another processor.
   - a. Stage the data from CPU memory to the processor.
   - b. Move the data across the PCI bus to the network interface card (NIC).
   - c. Store the data from the processor to CPU memory.
3. Copying data from the second processor to the second GPU.
   - a. Load the data from CPU memory to the processor.
   - b. Send the data across the PCI bus to the GPU.

GPUDirect® and similar technologies reduce this complexity by allowing direct message passing between GPUs, minimizing unnecessary data copying steps.

x??

---


#### Optimizing Data Movement with GPUDirect
Background context: Direct transfer capabilities like NVIDIA GPUDirect® or AMD's DirectGMA enable more efficient communication between GPUs. By bypassing the CPU memory, these methods significantly reduce the overhead and improve overall performance.

:p How does GPUDirect® optimize data movement?
??x
GPUDirect® optimizes data movement by allowing direct message passing between GPUs. Instead of transferring data to and from the CPU's DRAM, it transfers pointers directly over the PCI bus, reducing the number of intermediate steps required for data transfer.

Example:
```java
// Pseudo-code illustrating GPUDirect communication
Pointer sourceGPU = ...;
Pointer destinationGPU = ...;

// Standard method (with CPU involvement)
cudaMemcpy(hostPtrPinnedSource, sourceGPU, size, cudaMemcpyDeviceToHost);
MPI_Send(hostPtrPinnedSource, size, MPI_FLOAT, destRank, tag, MPI_COMM_WORLD);
MPI_Recv(hostPtrPinnedDestination, size, MPI_FLOAT, srcRank, tag, MPI_COMM_WORLD, &status);
cudaMemcpy(destinationGPU, hostPtrPinnedDestination, size, cudaMemcpyHostToDevice);

// GPUDirect method (direct GPU-to-GPU transfer)
sourceGPU.sendTo(destinationGPU); // Direct GPU communication
```
In the example above, standard methods involve CPU involvement, while GPUDirect allows for direct GPU-to-GPU transfers.

x??

---


#### Concept: CPU vs GPU Performance Comparison
The text provides a comparison between the performance of CPUs and GPUs using Roofline plots, which illustrate theoretical peak performance limits for both architectures. For many applications, these peak values are not always achieved in practice.
:p How do Roofline plots help in comparing CPU and GPU performance?
??x
Roofline plots provide a visual representation of an application's performance by dividing the plot into regions representing different performance limitations: floating-point calculation limits (the roofline) and memory bandwidth limits. By overlaying these plots, one can understand where the bottlenecks lie for both CPUs and GPUs.
x??

---


#### Reducing Time-to-Solution with GPU Acceleration
The example uses Cloverleaf as a proxy application to compare the performance of different systems: an Intel Ivybridge system, a Skylake Gold 6152 system, and a V100 GPU system. The goal is to demonstrate how much faster GPUs can be in reducing the time-to-solution for long-running applications.
:p How does porting Cloverleaf from a CPU system to a V100 GPU reduce the run time?
??x
Porting Cloverleaf to a V100 GPU significantly reduces the run time. For instance, running 500 cycles on an Ivybridge system took 615.1 seconds (1.23 seconds per cycle) for a total of 171 hours or about 7 days and 3 hours. On a Skylake system with 36 cores, it took 273.3 seconds (0.55 seconds per cycle) for the same cycles, reducing the run time to 76.4 hours or roughly 3 days and 4 hours. When running on a V100 GPU, it only took 59.3 seconds (0.12 seconds per cycle), significantly cutting down the total runtime to just 16.5 hours.
x??

---

