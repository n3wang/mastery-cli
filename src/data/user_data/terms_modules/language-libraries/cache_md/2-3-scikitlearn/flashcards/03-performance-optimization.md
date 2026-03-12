# Performance Optimization Flashcards

## Cython and Compilation

---

#### Why Cython in Sklearn

Cython compiles Python-like code to C for dramatic performance improvements.

:p Why does sklearn use Cython instead of pure Python for critical code?
??x
Achieves **C-level performance** while maintaining Python readability:
- 10-100x faster than pure Python
- Compiles to C
- Seamless NumPy integration
x??

---

#### Cython Speedup Range

Performance gains depend on optimization level.

:p What speedup can Cython provide over pure Python?
??x
**10-100x faster** for numerical code.

Example:
- Pure Python: 1000ms
- Cython (optimized): 10ms
- Comparable to hand-written C
x??

---

#### Static Typing in Cython

Type annotations enable C-level performance.

:p What's the key optimization technique in Cython?
??x
**Static typing** with C types:

```cython
cdef double value  # C variable
cdef int i         # C integer
double[::1] array  # Typed memory view
```

Eliminates Python type checking overhead.
x??

---

#### Cython Decorators

Decorators disable Python safety checks for speed.

:p What do `@cython.boundscheck(False)` and `@cython.wraparound(False)` do?
??x
Disable safety checks for speed:

- `boundscheck(False)`: No array bounds checking
- `wraparound(False)`: No negative indexing

**Use only when safe!** Can cause crashes if used incorrectly.
x??

---

#### Cython Example Files

Sklearn has extensive Cython code.

:p Where can you find Cython code in sklearn?
??x
Files ending in `.pyx`:
- `sklearn/tree/_tree.pyx` - Decision trees
- `sklearn/linear_model/_cd_fast.pyx` - Coordinate descent
- `sklearn/neighbors/_kd_tree.pyx.tp` - K-D trees

**Location examples throughout sklearn**
x??

## Parallelism and GIL

---

#### Python GIL Problem

The Global Interpreter Lock limits parallelism.

:p What is the GIL and why is it a problem?
??x
**Global Interpreter Lock**: Allows only **one thread** to execute Python code at a time.

**Problem**: Multi-threading doesn't help CPU-bound tasks - threads wait for GIL.

On 4-core CPU: still only 1 core active!
x??

---

#### GIL Impact on Threading

Python threads don't provide true parallelism.

:p What happens when you use threading for CPU-intensive Python code?
??x
Threads run **sequentially** due to GIL:

```python
# 2 threads on 2-core CPU
thread1.start()  # Core 1: running
thread2.start()  # Core 2: waiting for GIL

# Same time as sequential execution!
```

No speedup for CPU-bound work.
x??

---

#### nogil Context

Cython can release the GIL for parallel execution.

:p What does Cython's `with nogil:` do?
??x
**Releases the GIL** for true parallel execution:

```cython
with nogil:
    # Pure C code here
    # Multiple threads run simultaneously
```

**Requirements:** No Python objects, only C types.
x??

---

#### nogil Performance Gain

Releasing GIL enables multi-core usage.

:p What speedup can `nogil` provide on a 4-core CPU?
??x
**Linear with cores**: 4 cores = 4x speedup

```cython
with nogil:
    for i in prange(n):  # Parallel range
        compute(i)

# 4 cores: 4x faster than single-threaded
```

Assuming work is parallelizable.
x??

---

#### prange - Parallel Range

Special loop construct for parallel execution.

:p What's the difference between `range` and `prange` in Cython?
??x
**`range`**: Sequential loop
**`prange`**: Parallel loop (with nogil)

```cython
with nogil:
    for i in prange(n_samples):  # Runs in parallel
        process_sample(i)
```

Distributes iterations across threads.
x??

## Memory Views

---

#### Memory View Purpose

Memory views provide fast array access in Cython.

:p What are Cython memory views?
??x
**Typed, direct access** to array memory without Python overhead.

```cython
double[::1] arr  # Memory view
# Access: arr[i] compiles to C pointer arithmetic
```

10-100x faster than Python array access.
x??

---

#### Memory View Syntax

Syntax specifies dimensionality and layout.

:p What does `double[::1]` mean in Cython?
??x
```cython
double[::1]
^^^^^^     dtype (double)
      ^    1-dimensional
       ^^  C-contiguous (stride=1)
```

Fast 1D array of doubles.
x??

---

#### 2D Memory View - C-contiguous

Different syntax for 2D arrays.

:p What's the syntax for a 2D C-contiguous memory view?
??x
```cython
double[:, ::1]  # 2D, rows contiguous
      ^         any stride (dim 0)
         ^^     contiguous (dim 1)
```

Fast row-wise access.
x??

---

#### 2D Memory View - F-contiguous

Column-major layout for column operations.

:p What's the syntax for a 2D F-contiguous (column-major) memory view?
??x
```cython
double[::1, :]  # 2D, columns contiguous
      ^^        contiguous (dim 0)
          ^     any stride (dim 1)
```

Fast column-wise access.
x??

---

#### Memory View vs Python Access

Direct memory access eliminates overhead.

:p Why are memory views faster than Python array access?
??x
**Python access:** `arr[i]`
- Type checking
- Bounds checking
- Reference counting
- Python object protocol

**Memory view:** `arr[i]`
- Compiles to: `data[i]` (C pointer)
- No overhead!

**Result:** 10-100x faster
x??

## BLAS/LAPACK

---

#### BLAS Purpose

Basic Linear Algebra Subprograms provide optimized math.

:p What is BLAS and why does sklearn use it?
??x
**Highly optimized library** for linear algebra:
- Matrix multiply, dot products, etc.
- 100-3000x faster than pure Python
- Uses SIMD, multi-threading, cache optimization

Sklearn uses through SciPy/NumPy.
x??

---

#### BLAS Performance

BLAS is dramatically faster than pure Python.

:p How much faster is BLAS compared to pure Python for matrix multiplication?
??x
**1000-3000x faster!**

Example (1000×1000 matrices):
- Pure Python: 30,000ms
- BLAS (NumPy): 10ms
- Speedup: 3000x

**Location**: `sklearn/utils/_cython_blas.pyx`
x??

---

#### BLAS Levels

Different levels optimize different operations.

:p What are the three levels of BLAS operations?
??x
**Level 1**: Vector-vector O(n) - dot products, norms
**Level 2**: Matrix-vector O(n²) - matrix × vector
**Level 3**: Matrix-matrix O(n³) - matrix × matrix (**most important**)

Level 3 has best optimization potential.
x??

---

#### Why BLAS is Fast

Multiple optimization techniques combined.

:p What techniques make BLAS so fast?
??x
1. **SIMD**: Process 4-8 numbers at once
2. **Cache blocking**: Minimize memory access
3. **Multi-threading**: Use all CPU cores
4. **CPU-specific assembly**: Optimized for hardware

Result: Near-theoretical peak performance.
x??

---

#### BLAS in Sklearn

Sklearn leverages BLAS through multiple paths.

:p How does sklearn use BLAS?
??x
1. **Indirectly**: Through NumPy operations
2. **Directly**: Cython calls in `_cython_blas.pyx`
3. **Via SciPy**: Linear algebra functions

Critical for: PCA, linear models, decomposition.
x??

## Cache Optimization

---

#### Memory Hierarchy

CPU has multiple cache levels with different speeds.

:p What's the memory hierarchy in modern CPUs?
??x
**L1 cache**: 32KB, 0.5ns (100% speed)
**L2 cache**: 256KB, 3ns (20% speed)
**L3 cache**: 8MB, 12ns (10% speed)
**RAM**: GB+, 100ns (1% speed)

Cache misses kill performance!
x??

---

#### Cache-Friendly Access

Sequential access maximizes cache hits.

:p What makes an algorithm "cache-friendly"?
??x
**Sequential memory access patterns:**

```c
// Good - sequential
for (i = 0; i < n; i++)
    for (j = 0; j < n; j++)
        sum += A[i][j];  // Row-major, sequential

// Bad - strided
for (j = 0; j < n; j++)
    for (i = 0; i < n; i++)
        sum += A[i][j];  // Column access, cache misses
```

5-10x performance difference!
x??

---

#### Cache Blocking

Process data in cache-sized chunks.

:p What is cache blocking and why does it help?
??x
**Divide work into blocks** that fit in cache:

```c
// Block size = L1 cache size / element size
block_size = 64;

for (ii = 0; ii < n; ii += block_size)
    for (jj = 0; jj < n; jj += block_size)
        // Process block - stays in cache
```

Blocks reused multiple times before eviction.
x??

---

#### Cache Line Size

CPUs fetch memory in chunks.

:p What is a cache line and why does it matter?
??x
**Cache line**: Unit of data transfer (typically 64 bytes).

Accessing one element loads entire cache line:
- Sequential access: uses whole line (good)
- Strided access: wastes line (bad)

**Align data structures** to cache line boundaries when possible.
x??

## SIMD Vectorization

---

#### SIMD Concept

Process multiple data elements simultaneously.

:p What does SIMD stand for and what does it do?
??x
**Single Instruction, Multiple Data**

One CPU instruction processes **multiple numbers**:

```
Scalar: a[0] + b[0] → instruction 1
        a[1] + b[1] → instruction 2

SIMD: [a[0], a[1], a[2], a[3]] + [b[0], b[1], b[2], b[3]]
      → ONE instruction!
```
x??

---

#### SIMD Instruction Sets

Different CPU generations support different SIMD widths.

:p What are the main SIMD instruction sets?
??x
**SSE**: 128-bit, 2 doubles or 4 floats
**AVX**: 256-bit, 4 doubles or 8 floats
**AVX-512**: 512-bit, 8 doubles or 16 floats

Modern CPUs have at least AVX (4x parallelism).
x??

---

#### SIMD Speedup

SIMD provides linear speedup with width.

:p What speedup can SIMD provide?
??x
**2-8x** depending on instruction set:

- SSE: 2x (2 doubles at once)
- AVX: 4x (4 doubles at once)
- AVX-512: 8x (8 doubles at once)

Automatic in BLAS/NumPy operations.
x??

---

#### SIMD in Sklearn

Sklearn benefits from SIMD automatically.

:p How does sklearn use SIMD?
??x
**Automatically through:**
1. BLAS operations (matrix multiply, etc.)
2. NumPy operations (element-wise ops)
3. Compiler auto-vectorization (Cython with -O3)

No manual SIMD programming needed!
x??

---

#### Auto-Vectorization

Compilers can automatically use SIMD.

:p What conditions enable compiler auto-vectorization?
??x
Compilers vectorize when:
1. **Simple loops** (no complex control flow)
2. **No data dependencies** between iterations
3. **Aligned, contiguous memory** access
4. **Optimization flags**: `-O3 -march=native`

Works best with Cython + proper flags.
x??

## Sparse Matrices

---

#### CSR Format Structure

Compressed Sparse Row stores by rows.

:p What are the three arrays in CSR sparse format?
??x
1. **data**: Non-zero values
2. **indices**: Column index of each value
3. **indptr**: Where each row starts in data

Example: `data[indptr[i]:indptr[i+1]]` = row i
x??

---

#### CSR vs CSC Performance

Different formats for different operations.

:p When should you use CSR vs CSC format?
??x
**CSR (Compressed Sparse Row):**
- Fast: Row slicing, matrix × vector
- Use for: Most ML algorithms

**CSC (Compressed Sparse Column):**
- Fast: Column slicing, feature ops
- Use for: Feature selection

**Sklearn default:** CSR
x??

---

#### Sparse Memory Savings

Sparse matrices save memory for sparse data.

:p What's the memory formula for sparse vs dense matrices?
??x
**Dense**: `rows × cols × 8 bytes`
**Sparse**: `nnz × 12 bytes + overhead`

Where nnz = number of non-zeros.

**1% sparse, 10k×10k:**
- Dense: 800MB
- Sparse: 12MB (98.5% savings!)
x??

---

#### When to Use Sparse

Not all sparse matrices benefit from sparse storage.

:p When should you use sparse matrix format?
??x
**Use when:**
- More than 90% zeros (< 10% dense)
- Large matrices (memory constrained)
- Text data, network graphs

**Don't use when:**
- Small matrices (overhead not worth it)
- < 50% zeros (dense often faster)
x??

---

#### Sparse Matrix Operations

Different operations have different performance.

:p What operations are fast on CSR matrices?
??x
**Fast on CSR:**
- Row slicing: `X[5, :]`
- Matrix × vector: `X @ v`
- Row-wise operations

**Slow on CSR:**
- Column slicing: `X[:, 5]` (must scan all rows)

**Opposite for CSC!**
x??
