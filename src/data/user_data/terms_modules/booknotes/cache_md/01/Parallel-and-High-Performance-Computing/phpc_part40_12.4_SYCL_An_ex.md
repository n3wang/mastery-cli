# High-Quality Flashcards: Parallel-and-High-Performance-Computing_processed (Part 40)


**Starting Chapter:** 12.4 SYCL An experimental C implementation goes mainstream

---


#### SYCL Buffer and Data Transfer
SYCL buffers are used to transfer data between the host and device. They manage memory allocation and synchronization.
:p What is a SYCL buffer, and how is it used in the example?
??x
A SYCL buffer is an object that represents managed memory regions on both the host and device. It allows for efficient data transfers and memory management.

In the example:
- Buffers `dev_a`, `dev_b`, and `dev_c` are created from host arrays.
- These buffers are submitted to the queue for processing, ensuring data is correctly transferred between CPU and GPU (or other devices).
```cpp
Sycl::buffer<double,1> dev_a { a.data(), Sycl::range<1>(a.size()) };
Sycl::buffer<double,1> dev_b { b.data(), Sycl::range<1>(b.size()) };
Sycl::buffer<double,1> dev_c { c.data(), Sycl::range<1>(c.size()) };
```
x??

---


#### Lambda for Queue Submission
Lambdas are used to define kernels that execute on the device. They capture variables by reference and allow for parallel execution.
:p What is a lambda function in this context, and how does it work?
??x
A lambda function is a small, inline function defined at the point of use. In SYCL, lambdas are submitted to queues for execution as kernels.

The example uses a lambda to define the kernel that performs element-wise operations on device buffers:
```cpp
Queue.submit([&](Sycl::handler& CommandGroup) {
    auto a = dev_a.get_access<Sycl::access::mode::read>(CommandGroup);
    auto b = dev_b.get_access<Sycl::access::mode::read>(CommandGroup);
    auto c = dev_c.get_access<Sycl::access::mode::write>(CommandGroup);

    CommandGroup.parallel_for<class StreamTriad>(Sycl::range<1>{nsize}, 
        [=] (Sycl::id<1> it){
            c[it] = a[it] + scalar * b[it];
        });
});
```
The lambda captures variables by reference and can be executed in parallel across the device's elements.
x??

---

---


#### GPU Kernel Capture Mechanism

Background context: In SYCL, capturing variables for use within a kernel or lambda is crucial. This mechanism allows you to pass data from the host (CPU) to the device (GPU) during computation. The way you capture variables can significantly impact performance and correctness.

:p How do you capture variables in a SYCL kernel using lambdas?
??x
In SYCL, you can capture variables by value or reference when defining your lambda functions inside the kernel body. Capturing by value means that each variable is copied into the local scope of the lambda, while capturing by reference means that the lambda uses the original variable's memory location.

For example:
```cpp
Queue.submit([&nsize, &scalar, &dev_a, &dev_b, &dev_c](Sycl::handler& CommandGroup)
{
    // Use dev_a, dev_b, and dev_c within this scope.
});
```

If you want to capture by value, the syntax is slightly different:
```cpp
Queue.submit([=] (Sycl::handler& CommandGroup) 
{
    // Use nsize, scalar, dev_a, dev_b, and dev_c directly from their current state.
});
```
x??

---


#### Kokkos Execution Spaces

Background context: Kokkos is an ecosystem that provides performance portability across different hardware architectures. It supports various execution spaces, enabling developers to write code once and run it on multiple platforms.

:p What are some of the execution spaces provided by Kokkos?
??x
Kokkos provides several named execution spaces:

- Serial Execution (`Kokkos::Serial`)
  - Enabled with `Kokkos_ENABLE_SERIAL`
  
- Multi-threaded Execution (`Kokkos::Threads` / `Kokkos::OpenMP`)
  - Enabled with `Kokkos_ENABLE_PTHREAD` or `Kokkos_ENABLE_OPENMP`

- CUDA Execution (`Kokkos::Cuda`)
  - Enabled with `Kokkos_ENABLE_CUDA`
  
- HPX (High Performance Parallelism)
  - Enabled with `Kokkos_ENABLE_HPX`
  
- ROCm
  - Enabled with `Kokkos_ENABLE_ROCm`

These execution spaces allow the same code to be compiled and run on different hardware platforms without modifications.

Example CMake flags:
```cmake
-DKokkos_ENABLE_SERIAL=On
-DKokkos_ENABLE_PTHREAD=On
-DKokkos_ENABLE_OPENMP=On
-DKokkos_ENABLE_CUDA=On
-DKokkos_ENABLE_HPX=On
-DKokkos_ENABLE_ROCm=On
```
x??

---


#### Kokkos CMake Configuration

Background context: Setting up a project to use Kokkos requires configuring the build process with specific CMake flags. These configurations allow for cross-platform and multi-backend support.

:p How do you configure Kokkos with OpenMP backend using CMake?
??x
To configure Kokkos with an OpenMP backend using CMake, follow these steps:

1. Clone the Kokkos repository.
2. Create a build directory and navigate to it.
3. Run `cmake` with the appropriate flags.

Example command:
```sh
mkdir build && cd build
cmake ../kokkos -DKokkos_ENABLE_OPENMP=On
```

Then, configure and compile the project using CMake:
```sh
export Kokkos_DIR=${HOME}/Kokkos/lib/cmake/Kokkos
cmake ..
make
```

Ensure that `Kokkos_DIR` is set correctly to point to the location of the generated CMake configuration files.

Example setup environment variables:
```sh
export OMP_PROC_BIND=true
export OMP_PLACES=threads
```
x??

---

---


#### RAJA for Performance Portability
RAJA is a performance portable framework that aims to minimize disruptions to existing codes. It supports various backends like OpenMP, CUDA, and TBB.

:p What does RAJA offer in terms of portability?
??x
RAJA offers a simpler and easier-to-adopt approach for achieving performance portability across different architectures (like CPUs and GPUs). It uses lambdas extensively, making it adaptable to both CPU and GPU environments. RAJA can be built with support for OpenMP, CUDA, TBB, etc.

```cpp
// Example of using RAJA.
using Policy = RAJA::KernelPolicy<RAJA::seq_exec>;  // Or other execution policies.

void kernel_function(int i) {
    // Operation on each element...
}

RAJA::forall<nbytes>(Policy{}, 0, nbytes, KOKKOS_LAMBDA(auto i) { 
    // RAJA lambda syntax.
});
```
x??

---

