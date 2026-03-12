# Input Validation Flashcards

## Data Validation Fundamentals

---

#### check_array() Purpose

`check_array()` is sklearn's universal input validation function.

**Location**: `sklearn/utils/validation.py:887`

:p What is the primary purpose of `check_array()`?
??x
Validates and converts various input types to NumPy arrays:
- Lists → arrays
- DataFrames → arrays
- Validates dtype, shape, NaN/Inf
- Ensures memory layout (C-contiguous)
x??

---

#### check_array() Type Conversion

The function handles multiple input types automatically.

:p What input types can `check_array()` handle?
??x
- Python lists
- NumPy arrays
- pandas DataFrames
- Sparse matrices (scipy.sparse)

All converted to NumPy array (or kept sparse if `accept_sparse=True`).
x??

---

#### accept_sparse - Rejecting Sparse

The `accept_sparse` parameter controls sparse matrix handling.

:p What happens when you call `check_array(sparse_matrix)` with default parameters?
??x
Raises `TypeError` because `accept_sparse=False` by default.

Most sklearn algorithms don't support sparse matrices unless explicitly allowed.
x??

---

#### accept_sparse - Format Conversion

Different sparse formats optimize different operations.

:p What does `accept_sparse='csr'` do to a COO sparse matrix?
??x
Converts it to CSR format:

```python
X_coo = sparse.coo_matrix(data)
X_csr = check_array(X_coo, accept_sparse='csr')
# X_csr is now CSR format
```

Ensures algorithm gets preferred format.
x??

---

#### accept_sparse - Multiple Formats

You can accept multiple sparse formats.

:p What does `accept_sparse=['csr', 'csc']` mean?
??x
Accepts either CSR or CSC format, **keeps original format**:

```python
X_csr = csr_matrix(data)
X = check_array(X_csr, accept_sparse=['csr', 'csc'])
# Still CSR (not converted)

X_csc = csc_matrix(data)
X = check_array(X_csc, accept_sparse=['csr', 'csc'])
# Still CSC (not converted)
```
x??

---

#### C-contiguous Memory Layout

Memory layout affects performance dramatically.

:p What does "C-contiguous" mean for a NumPy array?
??x
**Row-major** memory layout:
- Rows stored consecutively in memory
- Fast row-wise access
- Default in NumPy and sklearn

Example: `[[1,2,3], [4,5,6]]` stored as `[1,2,3,4,5,6]`
x??

---

#### F-contiguous Memory Layout

Fortran/column-major layout has different performance characteristics.

:p What's the difference between C-contiguous and F-contiguous?
??x
**C-contiguous:** Rows consecutive → fast row operations
**F-contiguous:** Columns consecutive → fast column operations

Same array `[[1,2], [3,4]]`:
- C-order: `[1, 2, 3, 4]` (row-by-row)
- F-order: `[1, 3, 2, 4]` (column-by-column)
x??

---

#### Why Memory Layout Matters

Cache performance depends on memory access patterns.

:p Why does memory layout affect performance?
??x
CPU cache fetches **contiguous memory blocks**.

**C-contiguous + row iteration:**
- Sequential access = cache hits = fast ✓

**F-contiguous + row iteration:**
- Strided access = cache misses = slow ✗

**Performance difference:** 2-10x!
x??

---

#### Ensuring Memory Order

You can force a specific memory layout.

:p How do you ensure an array is C-contiguous with `check_array()`?
??x
```python
X = check_array(X, order='C')
# Now guaranteed C-contiguous
```

If not already C-contiguous, copies and converts.
x??

---

#### check_X_y() Purpose

Validates features and target together.

:p What's the difference between `check_array()` and `check_X_y()`?
??x
`check_X_y()` validates **both X and y** together:
1. Validates X and y individually
2. **Checks length consistency** (same # samples)
3. Converts y to 1D if needed
4. Returns both: `X, y = check_X_y(X, y)`

**Location**: `sklearn/utils/validation.py:1113`
x??

---

#### check_X_y() Length Validation

Ensures X and y have compatible shapes.

:p What error does `check_X_y()` catch that separate `check_array()` calls miss?
??x
**Length mismatch:**

```python
X = [[1, 2], [3, 4]]  # 2 samples
y = [0, 1, 0]         # 3 samples

check_X_y(X, y)
# ValueError: X has 2 samples but y has 3
```

Prevents training on mismatched data.
x??

---

#### check_X_y() Column Vector Handling

Automatically handles common y shape issues.

:p What does `check_X_y()` do to a column vector y?
??x
Converts column vector to 1D:

```python
y = [[1], [2], [3]]  # Shape (3, 1)
X, y = check_X_y(X, y)
# y is now [1, 2, 3]  # Shape (3,)
```

Unless `multi_output=True`.
x??

---

#### check_is_fitted() Detection

Verifies an estimator has been trained.

:p How does `check_is_fitted()` know if an estimator is fitted?
??x
Checks for attributes ending with `_`:

```python
check_is_fitted(estimator)
# Looks for: coef_, intercept_, classes_, etc.
# Raises NotFittedError if none found
```

**Location**: `sklearn/utils/validation.py:1390`
x??

---

#### check_is_fitted() Specific Attributes

You can check for specific fitted attributes.

:p How do you check if a model has specific fitted attributes?
??x
```python
check_is_fitted(model, ['coef_', 'intercept_'])
# Checks both attributes exist
# Raises NotFittedError if either missing
```

Useful when only certain attributes are required.
x??

---

#### force_all_finite - Default Behavior

Controls NaN/Inf handling.

:p What does `force_all_finite=True` (default) do?
??x
**Rejects** both NaN and Inf values:

```python
X = [[1, 2], [3, np.nan]]
check_array(X)  # ValueError: Input contains NaN

X = [[1, 2], [3, np.inf]]
check_array(X)  # ValueError: Input contains Inf
```
x??

---

#### force_all_finite - Allow NaN

Some algorithms can handle missing values.

:p When would you use `force_all_finite='allow-nan'`?
??x
When algorithm handles NaN but not Inf:

```python
X = [[1, 2], [3, np.nan]]
check_array(X, force_all_finite='allow-nan')  # ✓ OK

X = [[1, 2], [3, np.inf]]
check_array(X, force_all_finite='allow-nan')  # ✗ Error!
```

Used in tree-based methods.
x??

---

#### force_all_finite - Disable All Checks

Imputers need to see NaN values.

:p When would you use `force_all_finite=False`?
??x
When you **need** NaN/Inf in your data:

```python
# Imputer must see NaN to fill them
X = [[1, np.nan], [3, 4]]
check_array(X, force_all_finite=False)  # ✓ Keeps NaN
```

Used in: `SimpleImputer`, preprocessing with missing data.
x??

---

#### dtype Parameter - Numeric Validation

Ensures data is numeric.

:p What does `dtype='numeric'` do in `check_array()`?
??x
Validates data is numeric (int or float), but **doesn't convert**:

```python
X = [[1, 2], [3, 4]]  # int
check_array(X, dtype='numeric')  # ✓ Returns int

X = [['a', 'b']]  # string
check_array(X, dtype='numeric')  # ✗ ValueError
```
x??

---

#### dtype Parameter - Type Conversion

Can force specific data types.

:p What's the difference between `dtype='numeric'` and `dtype=np.float64`?
??x
**`dtype='numeric'`:**
- Validates is numeric
- Keeps original type (int32, float32, etc.)

**`dtype=np.float64`:**
- **Converts** to float64
- Creates copy if type differs

```python
X_int = np.array([[1, 2]], dtype=np.int32)
check_array(X_int, dtype=np.float64)
# Returns float64 array (converted)
```
x??

---

#### column_or_1d() Purpose

Ensures target is 1-dimensional.

:p What does `column_or_1d()` do?
??x
Converts various y shapes to 1D:

```python
[1, 2, 3]      → [1, 2, 3]  # Already 1D
[[1], [2], [3]] → [1, 2, 3]  # Column vector squeezed
[[1, 2, 3]]    → [1, 2, 3]  # Row vector squeezed
```

Rejects 2D with both dims > 1.
x??

---

#### ensure_2d Parameter

Controls dimensionality requirements.

:p What does `ensure_2d=True` check in `check_array()`?
??x
Requires array to be 2-dimensional:

```python
X = [1, 2, 3]  # 1D
check_array(X, ensure_2d=True)  # ValueError

X = [[1, 2, 3]]  # 2D
check_array(X, ensure_2d=True)  # ✓ OK
```

Most ML algorithms need 2D input (samples × features).
x??

---

#### CSR vs CSC Sparse Formats

Different sparse formats for different operations.

:p When should you use CSR vs CSC sparse format?
??x
**CSR (Compressed Sparse Row):**
- Fast row slicing
- Good for: matrix-vector multiply, most ML algorithms

**CSC (Compressed Sparse Column):**
- Fast column slicing
- Good for: feature selection, column operations

**Sklearn default:** CSR for most algorithms
x??

---

#### Sparse Matrix Memory Savings

Sparse matrices save memory for sparse data.

:p How much memory can sparse matrices save?
??x
**Dense:** `rows × cols × 8 bytes`
**Sparse:** `nnz × 12 bytes` (roughly)

Example: 10000×10000 matrix, 1% non-zero
- Dense: 800MB
- Sparse: 12MB
- **Savings: 98.5%!**

Where nnz = number of non-zeros.
x??

---

#### Validation Location in Estimators

Validation happens at specific points.

:p When should you call validation functions in a custom estimator?
??x
**In `fit()`:**
```python
X, y = self._validate_data(X, y, reset=True)
```

**In `predict()/transform()`:**
```python
X = self._validate_data(X, reset=False)
```

**In `__init__()`:** Never! Validation happens at runtime.
x??
