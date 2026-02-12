# High-Quality Flashcards: Parallel-and-High-Performance-Computing_processed (Part 25)


**Starting Chapter:** 8.3.5 Using scatter and gather to send data out to processes for work

---


#### MPI_Allreduce and Kahan Summation
Background context explaining how MPI_Allreduce is used with the Kahan summation method to compute a global sum across all processes. The Kahan summation algorithm helps reduce numerical error when adding a sequence of finite precision floating point numbers.

:p What is the purpose of using MPI_Allreduce in conjunction with Kahan summation?
??x
MPI_Allreduce along with Kahan summation is used to ensure accurate and consistent global sums are computed across all processes in an MPI program. Kahan summation helps reduce numerical error, while MPI_Allreduce ensures that each process performs the reduction operation, eventually converging on a single value shared among all processors.
??x
The purpose of using MPI_Allreduce with Kahan summation is to ensure accurate and consistent global sums across multiple processes in an MPI program. The Kahan summation algorithm helps reduce numerical errors when adding floating-point numbers, while MPI_Allreduce ensures that the reduction operation is performed globally.

Example code for performing a Kahan sum using MPI_Allreduce:
```c
#include <mpi.h>

double local = 1.0;
double global;

MPI_Allreduce(&local, &global, 1, MPI_DOUBLE, MPI_KAHAN_SUM, MPI_COMM_WORLD);
```

The algorithm ensures that each process starts with its own local sum and then uses MPI_Allreduce to combine these sums into a single global value.

x??

---


#### DebugPrintout Using Gather
Explanation of how gather operations can be used in debugging by collecting data from all processes and printing it out in an ordered manner. The gather operation stacks data from all processors into a single array, allowing for controlled output.

:p How does the MPI_Gather function help in organizing debug printouts?
??x
The MPI_Gather function helps organize debug printouts by bringing together data from all processes into a single array on process 0. This allows you to control the order of output and ensure that only the main process prints, thus maintaining consistency.

Example code for using MPI_Gather:
```c
#include <mpi.h>
#include <stdio.h>

int main(int argc, char *argv[]) {
    int rank, nprocs;
    double total_time;

    MPI_Init(&argc, &argv);
    MPI_Comm_rank(MPI_COMM_WORLD, &rank);
    MPI_Comm_size(MPI_COMM_WORLD, &nprocs);

    cpu_timer_start(&tstart_time);
    sleep(30);  // Simulate some work
    total_time += cpu_timer_stop(tstart_time);

    double times[nprocs];
    MPI_Gather(&total_time, 1, MPI_DOUBLE, times, 1, MPI_DOUBLE, 0, MPI_COMM_WORLD);

    if (rank == 0) {
        for (int i = 0; i < nprocs; i++) {
            printf("Process %d: Work took %.2f secs \n", i, times[i]);
        }
    }

    MPI_Finalize();
    return 0;
}
```

In this example, the gather operation collects the total time from all processes into a single array `times` on process 0. Process 0 then prints out the data in an ordered manner.

x??

---


#### Scatter and Gather for Data Distribution
Explanation of how scatter and gather operations can be used to distribute data arrays among processes for work, followed by gathering them back together at the end. Scatter distributes data from one process to all others, while gather collects data from all processes back to a single process.

:p How does the MPI_Scatter function work in the context of distributing data?
??x
The MPI_Scatter function works by sending data from one process (the root) to all other processes in the communication group. Each process receives a portion of the global data, enabling parallel processing on multiple tasks.

Example code for using MPI_Scatter:
```c
#include <mpi.h>
#include <stdio.h>

int main(int argc, char *argv[]) {
    int rank, nprocs, ncells = 100000;
    double *a_global, *a_test;

    MPI_Init(&argc, &argv);
    MPI_Comm comm = MPI_COMM_WORLD;
    MPI_Comm_rank(comm, &rank);
    MPI_Comm_size(comm, &nprocs);

    long ibegin = ncells * (rank) / nprocs;
    long iend   = ncells * (rank + 1) / nprocs;
    int nsize   = (int)(iend - ibegin);

    double *a_global, *a_test;

    if (rank == 0) {
        a_global = (double *)malloc(ncells * sizeof(double));
        for (int i = 0; i < ncells; i++) {
            a_global[i] = (double)i;
        }
    }

    int nsizes[nprocs], offsets[nprocs];
    MPI_Allgather(&nsize, 1, MPI_INT, nsizes, 1, MPI_INT, comm);
    offsets[0] = 0;
    for (int i = 1; i < nprocs; i++) {
        offsets[i] = offsets[i - 1] + nsizes[i - 1];
    }

    double *a = (double *)malloc(nsize * sizeof(double));
    MPI_Scatterv(a_global, nsizes, offsets, MPI_DOUBLE, a, nsize, MPI_DOUBLE, 0, comm);

    for (int i = 0; i < nsize; i++) {
        a[i] += 1.0;
    }

    if (rank == 0) {
        a_test = (double *)malloc(ncells * sizeof(double));
        MPI_Gatherv(a, nsize, MPI_DOUBLE, a_test, nsizes, offsets, MPI_DOUBLE, 0, comm);
    }

    if (rank == 0) {
        int ierror = 0;
        for (int i = 0; i < ncells; i++) {
            if (a_test[i] != a_global[i] + 1.0) {
                printf("Error: index %d a_test %.2f a_global %.2f \n", i, a_test[i], a_global[i]);
                ierror++;
            }
        }
        printf("Report: Correct results %d errors %d \n", ncells - ierror, ierror);
    }

    free(a);
    if (rank == 0) {
        free(a_global);
        free(a_test);
    }

    MPI_Finalize();
    return 0;
}
```

In this example, the scatter operation distributes the global array `a_global` to each process based on the calculated offsets and sizes. Each process performs a computation, and at the end, gather collects all processed data back into the main process.

x??

---

---


#### MPI Scatter Operation
MPI scatter operations distribute data from a single process to all other processes. For this operation, we need to know the sizes and offsets of the data chunks each process will receive.

Background context: In the provided code snippet, an `MPI_Scatterv` call is used to distribute data across multiple processes. The `counts` array contains the number of elements for each process, while the `offsets` array specifies where in the buffer these counts begin.

:p What does MPI Scatterv do?
??x
The MPI `Scatterv` function distributes an array from one process (the root) to all other processes such that each process receives a portion of the data. The distribution is based on predefined `counts` and `offsets`.

Example:
```c
MPI_Scatterv(buf, counts, offsets, MPI_DOUBLE, &local_buffer[i], local_counts[i], MPI_DOUBLE, 0, MPI_COMM_WORLD);
```
Here, `buf` is the global buffer containing all the data. `counts` specifies how many elements each process will receive, and `offsets` provides starting points in `buf`. The `&local_buffer[i]` is where the local part of the data will be stored.

x??

---


#### Stream Triad for Bandwidth Testing
The Stream Triad is a benchmark to measure memory bandwidth and latency.

Background context: The provided C code measures the performance of basic arithmetic operations (addition, multiplication) on arrays. It uses MPI to parallelize these operations across multiple processes.

:p What is the purpose of the Stream Triad in this context?
??x
The purpose of the Stream Triad is to measure the memory bandwidth and latency of a system by performing simple arithmetic operations (like addition and multiplication) on large data sets. This helps determine how effectively the system can handle such operations, which is crucial for performance optimization.

Example:
```c
for (int i=0; i<nsize; i++) {
    a[i] = 1.0;
    b[i] = 2.0;
}
```
This code initializes two arrays `a` and `b` with constant values, setting the stage for the subsequent operations.

x??

---


#### Ghost Cells and Halos

Background context: In parallel processing, especially with MPI, ghost cells are used to cache values from adjacent processors. This caching reduces the need for frequent communications between processes. The concept of halos (both domain-boundary and ghost cells) is crucial in managing boundary conditions and communication in distributed memory systems.

:p What are ghost cells?
??x
Ghost cells are virtual cells surrounding a computational mesh that do not actually exist on the local processor but hold values from neighboring processors. These cells help reduce the need for frequent communications by caching data locally, making the process more efficient. Ghost cells only contain temporary values and their real data resides on adjacent processors.
x??

---


#### Ghost Cell Updates and Exchanges

Background context: Ghost cell updates or exchanges are essential in parallel processing to ensure that the local copies of data from neighboring processors are up-to-date. This is crucial for maintaining consistency across processes, especially during computations.

:p What do ghost cell updates or exchanges involve?
??x
Ghost cell updates or exchanges refer to the process where the temporary values stored in ghost cells on a local processor are updated with real data from adjacent processors. These updates are necessary only when multiple processes need to exchange information to maintain consistency and ensure accurate computations across all processors.

For example:
```java
// Pseudocode for updating ghost cells
for (int i = 0; i < numberOfGhostCells; i++) {
    int neighborProcID = getNeighborProcessId(i);
    MPI_Recv(ghostCells[i], &neighborProcID, MPI_INT, MPI_ANY_SOURCE, TAG, MPI_COMM_WORLD, MPI_STATUS_IGNORE);
}
```
x??

---


#### Communication Buffer with MPI_Pack

Background context: To optimize MPI communication, ghost cells can be packed into a buffer before sending them to the appropriate neighboring processes. This method helps in reducing the number of communications and making the data parallel approach perform more efficiently.

:p How does one use the `MPI_Pack` routine for packing ghost cells?
??x
The `MPI_Pack` routine is used to pack multiple variables or arrays into a single buffer, which can then be sent as a single message. This reduces the number of communication calls and optimizes data transfer in parallel applications.

For example:
```java
// Pseudocode for using MPI_Pack with ghost cells
int totalSize = 0;
for (int i = 0; i < numberOfGhostCells; i++) {
    int sizeOfCell = getSizeOfCell(i); // Function to get the size of each cell
    totalSize += sizeOfCell;
}

char* buffer = new char[totalSize];
MPI_Pack(buffer, totalSize, MPI_CHAR, ghostCells, &count, &position, MPI_COMM_WORLD);

// Send the packed buffer to a neighboring process
int neighborProcID = getNeighborProcessId(i);
MPI_Send(buffer, totalSize, MPI_PACKED, neighborProcID, TAG, MPI_COMM_WORLD);
```
x??

---


#### Optimizing MPI Communication

Background context: By reducing the number of communications required for exchanging ghost cells, parallel applications can improve their performance. This is achieved by grouping multiple ghost cell updates into fewer communication calls.

:p How does using ghost cells optimize MPI communication?
??x
Using ghost cells optimizes MPI communication by reducing the frequency and overhead associated with sending and receiving data between processes. Instead of sending individual values as needed, ghost cells store temporary copies of required data locally. During a stream triad loop or at specific intervals, these local copies are updated with actual values from neighboring processors, thereby minimizing the number of communication calls.

For example:
```java
// Pseudocode for optimizing MPI communication with ghost cells
for (int i = 0; i < numberOfGhostCells; i++) {
    int neighborProcID = getNeighborProcessId(i);
    if (isTimeToUpdate(neighborProcID)) { // Function to check when to update
        MPI_Recv(ghostCells[i], &neighborProcID, MPI_INT, MPI_ANY_SOURCE, TAG, MPI_COMM_WORLD, MPI_STATUS_IGNORE);
    }
}
```
x??

---

---


#### Grid Setup and Memory Allocation
Background context: The code snippet describes setting up a 2D grid for parallel processing. This involves determining process coordinates, exchanging ghost cells between processes, and allocating memory to handle both real data and halo regions.

The `malloc2D` function is used to allocate memory with additional padding (halos) around the actual computational domain. The memory allocation ensures that each process can access its local grid along with neighboring regions required for communication.

:p What does the setup code do in terms of memory allocation?
??x
The setup code allocates a 2D array `double** x` and another `double** xnew`, both with additional padding to handle ghost cells. The memory is allocated using `malloc2D` function, which takes the size of the grid plus halos into account.

Code Example:
```cpp
// Memory allocation with halo padding
int jsize = jmax * (ycoord + 1) / nprocy;
int isize = imax * (xcoord + 1) / nprocx;

double** x    = malloc2D(jsize + 2 * nhalo, isize + 2 * nhalo, nhalo, nhalo);
double** xnew = malloc2D(jsize + 2 * nhalo, isize + 2 * nhalo, nhalo, nhalo);
```
x??

---


#### Stencil Iteration Loop
Background context: The stencil iteration loop performs a simple blur operation on the grid. This is a common pattern in image processing and partial differential equations where each cell's value is updated based on its neighbors' values.

:p What does the stencil iteration loop do?
??x
The stencil iteration loop updates every cell in the computational domain by averaging itself with its immediate horizontal and vertical neighbors, effectively performing a blur operation. This process is repeated for 1000 iterations to ensure sufficient convergence of the algorithm.

Code Example:
```cpp
for (int iter = 0; iter < 1000; iter++) {
    cpu_timer_start(&tstart_stencil);
    
    for (int j = 0; j < jsize; j++) {
        for (int i = 0; i < isize; i++) {
            xnew[j][i] = (x[j][i] + x[j][i-1] + x[j][i+1] + 
                          x[j-1][i] + x[j+1][i]) / 5.0;
        }
    }

    SWAP_PTR(xnew, x, xtmp);
    stencil_time += cpu_timer_stop(tstart_stencil);

    boundarycondition_update(x, nhalo, jsize, isize, 
                             nleft, nrght, nbot, ntop);
    ghostcell_update(x, nhalo, corners, 
                     jsize, isize, nleft, nrght, nbot, ntop);
}
```
x??

---


#### Ghost Cell Update
Background context: After the stencil operation, the code updates boundary conditions and exchanges ghost cells with neighboring processes. This ensures that each process has the correct values at its boundaries for subsequent iterations.

:p What is the purpose of the `ghostcell_update` function?
??x
The `ghostcell_update` function is responsible for exchanging ghost cell data between adjacent processes to ensure consistency in the computational domain. It handles both regular halo cells and corner cells, ensuring that all processes have up-to-date boundary values required for the stencil operation.

Code Example:
```cpp
// Pseudocode for updating ghost cells
for each process {
    if (process has left neighbor) {
        MPI_Recv(ghost cell data from left neighbor);
    }
    
    if (process has right neighbor) {
        MPI_Send(ghost cell data to right neighbor);
    }

    // Similar steps for top and bottom neighbors
}
```
x??

---


#### Boundary Condition Update
Background context: The `boundarycondition_update` function handles the boundary conditions of the computational domain. This ensures that values at the edges are correctly set, often based on specific physical or mathematical constraints.

:p What is the purpose of the `boundarycondition_update` function?
??x
The `boundarycondition_update` function sets the appropriate values for cells near the boundaries of the computational grid to ensure they comply with predefined boundary conditions. These could be periodic, fixed, or some other type depending on the application's requirements.

Code Example:
```cpp
// Pseudocode for updating boundary conditions
for (int j = 0; j < jsize; j++) {
    x[j][0] = ... // Left boundary condition
    x[j][isize - 1] = ... // Right boundary condition
    
    for (int i = 0; i < isize; i++) {
        x[0][i] = ... // Bottom boundary condition
        x[jsize - 1][i] = ... // Top boundary condition
    }
}
```
x??

---

---


---
#### Ghost Cell Region and Halo Communication
Background context: In parallel computing, especially with 2D meshes, ghost cells are used to manage data exchange between processes. These ghost cells act as buffers for communication, holding data from neighboring processes that is not stored locally.

Key terms:
- **Ghost Cells**: Cells outside the local domain but required by the computation.
- **Halo Region**: The width of the ghost cell region around each process's local mesh.
- **Corners**: In some applications, cells at the corners need special handling during communication.

The halo region can vary in size and whether corner cells are included. This example demonstrates how to handle this using MPI (Message Passing Interface) for data exchange among processes.

:p What is the purpose of ghost cells in parallel computing?
??x
Ghost cells serve as buffers to hold data from neighboring processes that are not stored locally, facilitating efficient computation across process boundaries.
x??

---


---

#### Custom MPI Data Types

Background context explaining how custom MPI data types can simplify communication and enhance performance by encapsulating complex data structures into a single unit. This is particularly useful for sending or receiving multiple smaller pieces of data as one unit.

:p What are custom MPI data types used for?
??x
Custom MPI data types are used to encapsulate complex data into a single type that can be sent or received in a single communication call, simplifying the code and potentially improving performance. This is achieved by defining new data types from basic MPI building blocks such as `MPI_Type_contiguous`, `MPI_Type_vector`, etc.

```c
// Example of creating a custom data type using MPI_Type_contiguous
int count = 10; // Number of elements to create a contiguous block
MPI_Datatype new_type;
MPI_Type_contiguous(count, MPI_DOUBLE, &new_type);
MPI_Type_commit(&new_type);
```
x??

---


#### MPI_Type_indexed

This function creates an irregular set of indices using displacements.

:p What is the difference between `MPI_Type_indexed` and `MPI_Type_create_hindexed`?
??x
Both `MPI_Type_indexed` and `MPI_Type_create_hindexed` are used to create a custom data type for irregular sets of indices. The key difference is that `MPI_Type_indexed` specifies displacements in terms of elements, while `MPI_Type_create_hindexed` specifies displacements in bytes.

```c
// Example using MPI_Type_indexed
int count = 10; // Number of elements
int *displacements = {0, 2, 5}; // Displacements in element units
MPI_Datatype new_type;
MPI_Type_indexed(count, displacements, MPI_DOUBLE, &new_type);
```
x??

---


#### Commit and Free Routines

These routines are used to initialize and clean up custom data types.

:p What do `MPI_Type_Commit` and `MPI_Type_Free` do?
??x
`MPI_Type_Commit` initializes the new custom type with necessary memory allocation or other setup, while `MPI_Type_Free` frees any memory or data structures created during the creation of the datatype to avoid a memory leak.

```c
// Example using MPI_Type_Commit and MPI_Type_Free
int count = 10;
MPI_Datatype new_type;
MPI_Type_contiguous(count, MPI_DOUBLE, &new_type);
MPI_Type_commit(&new_type);

// After use...
MPI_Type_free(&new_type);
```
x??

---


#### Custom Data Types for MPI Communication
Custom data types are used to optimize MPI communication by defining specific patterns of data access. This is particularly useful for handling ghost cells in parallel computations, where each process needs to exchange boundary values with its neighbors.

In the provided code, custom data types are created using `MPI_Type_vector` and `MPI_Type_contiguous`. These functions help in specifying how the data should be laid out for efficient communication.
:p What is the purpose of creating custom MPI data types?
??x
Custom data types in MPI are used to define specific patterns of data access. This helps in optimizing communication between processes, especially when dealing with ghost cells where each process needs to exchange boundary values with its neighbors efficiently.

For example, `MPI_Type_vector` and `MPI_Type_contiguous` are used here to handle different types of array accesses:
- `MPI_Type_vector`: Used for sets of strided array accesses.
- `MPI_Type_contiguous`: Used when the data is contiguous in memory but accessed non-contiguously during communication.

The custom data types are created as follows:

```cpp
// Creating a horizontal type using vector
int jlow = 0, jhgh = jsize;
if (corners) {
   if (nbot == MPI_PROC_NULL) jlow = -nhalo;
   if (ntop  == MPI_PROC_NULL) jhgh = jsize + nhalo;
}
int jnum = jhgh - jlow;

MPI_Datatype horiz_type;
MPI_Type_vector(jnum, nhalo, isize + 2 * nhalo, MPI_DOUBLE, &horiz_type);
MPI_Type_commit(&horiz_type);

// Creating a vertical type using either vector or contiguous
MPI_Datatype vert_type;
if (corners) {
   MPI_Type_vector(nhalo, isize, isize + 2 * nhalo, MPI_DOUBLE, &vert_type);
} else {
   MPI_Type_contiguous(nhalo * (isize + 2 * nhalo), MPI_DOUBLE, &vert_type);
}
MPI_Type_commit(&vert_type);
```

The data types are then used in the `ghostcell_update` function to send and receive ghost cells more efficiently.
x??

---

