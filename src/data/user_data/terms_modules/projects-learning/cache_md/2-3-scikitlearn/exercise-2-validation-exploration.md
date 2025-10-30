# Exercise 2: Exploring Input Validation in Scikit-learn

**Difficulty**: Beginner to Intermediate
**Time**: 45-60 minutes
**Prerequisites**: Completed Exercise 1, understanding of NumPy arrays and basic Python

## Learning Objectives

By completing this exercise, you will:
1. Understand sklearn's input validation utilities
2. Learn how to handle different input types (lists, arrays, DataFrames, sparse matrices)
3. Explore the `sklearn.utils.validation` module
4. Practice reading and understanding sklearn source code
5. Learn about data type conversions and memory layout

## Background

Input validation is crucial in scikit-learn because:
- Users can pass various input types (lists, NumPy arrays, pandas DataFrames, sparse matrices)
- Data must be in the correct format for algorithms to work
- Invalid inputs should fail fast with clear error messages
- Memory layout affects performance

The main validation module is `sklearn/utils/validation.py`. It contains functions used throughout sklearn to ensure data consistency.

## The Task

You will explore sklearn's validation utilities by:
1. Reading and understanding key validation functions
2. Testing different input types
3. Understanding error messages
4. Tracing how validation flows through an estimator

## Step-by-Step Instructions

### Step 1: Locate the Validation Module

First, let's find and examine the validation module:

```bash
# Navigate to sklearn source
cd sklearn/utils

# Look at the validation module
ls -lh validation.py

# See what functions are exported
grep "^def " validation.py | head -20
```

**Key Functions to Know**:
- `check_array()`: Validates and converts input arrays
- `check_X_y()`: Validates features (X) and target (y) together
- `check_is_fitted()`: Checks if an estimator has been fitted
- `check_consistent_length()`: Ensures arrays have same first dimension
- `column_or_1d()`: Ensures y is 1-dimensional

### Step 2: Explore `check_array()`

This is the most important validation function. Let's explore it:

**Task 2.1**: Read the source code

```bash
# In the sklearn repository
grep -A 200 "^def check_array" sklearn/utils/validation.py | head -250
```

Or open `sklearn/utils/validation.py` and navigate to line ~887.

**Questions to Answer**:
1. What parameters does `check_array()` accept?
2. What does `accept_sparse` do?
3. What does `dtype` specify?
4. What is `order` and why does it matter?
5. What does `ensure_2d` do?

<details>
<summary>Click for answers</summary>

1. **Parameters**: array, accept_sparse, dtype, order, copy, force_all_finite, ensure_2d, and more
2. **accept_sparse**: Controls whether sparse matrices are accepted (False, True, 'csr', 'csc', etc.)
3. **dtype**: Required data type (e.g., 'numeric', 'float64', np.float32)
4. **order**: Memory layout ('C' for C-contiguous, 'F' for Fortran-contiguous)
5. **ensure_2d**: If True, raises error for 1D arrays

Location: `sklearn/utils/validation.py:887`
</details>

**Task 2.2**: Create test script

Create a new file `test_validation.py`:

```python
import numpy as np
import pandas as pd
from scipy import sparse
from sklearn.utils.validation import check_array

def test_check_array_basic():
    """Test basic check_array functionality."""

    # Test 1: Python list → NumPy array
    X_list = [[1, 2], [3, 4], [5, 6]]
    X_array = check_array(X_list)

    print("Test 1: List to Array")
    print(f"  Input type: {type(X_list)}")
    print(f"  Output type: {type(X_array)}")
    print(f"  Output dtype: {X_array.dtype}")
    print(f"  Output shape: {X_array.shape}\n")

    # Test 2: Pandas DataFrame → NumPy array
    X_df = pd.DataFrame([[1, 2], [3, 4]], columns=['a', 'b'])
    X_array = check_array(X_df)

    print("Test 2: DataFrame to Array")
    print(f"  Input type: {type(X_df)}")
    print(f"  Output type: {type(X_array)}")
    print(f"  Output dtype: {X_array.dtype}\n")

    # Test 3: Data type conversion
    X_int = np.array([[1, 2], [3, 4]], dtype=np.int32)
    X_float = check_array(X_int, dtype=np.float64)

    print("Test 3: Data Type Conversion")
    print(f"  Input dtype: {X_int.dtype}")
    print(f"  Output dtype: {X_float.dtype}\n")

    # Test 4: Memory layout (C-contiguous)
    X_fortran = np.array([[1, 2], [3, 4]], order='F')
    X_c = check_array(X_fortran, order='C')

    print("Test 4: Memory Layout")
    print(f"  Input C-contiguous: {X_fortran.flags['C_CONTIGUOUS']}")
    print(f"  Input F-contiguous: {X_fortran.flags['F_CONTIGUOUS']}")
    print(f"  Output C-contiguous: {X_c.flags['C_CONTIGUOUS']}")
    print(f"  Output F-contiguous: {X_c.flags['F_CONTIGUOUS']}\n")

    # Test 5: Sparse matrix handling
    X_sparse = sparse.csr_matrix([[1, 0], [0, 4]])

    # This should fail
    try:
        X_dense = check_array(X_sparse, accept_sparse=False)
        print("ERROR: Should have raised TypeError")
    except TypeError as e:
        print("Test 5: Sparse Matrix Rejection")
        print(f"  Error message: {e}\n")

    # This should succeed
    X_sparse_checked = check_array(X_sparse, accept_sparse='csr')
    print("Test 6: Sparse Matrix Acceptance")
    print(f"  Input type: {type(X_sparse)}")
    print(f"  Output type: {type(X_sparse_checked)}")
    print(f"  Output format: {X_sparse_checked.format}\n")

if __name__ == "__main__":
    test_check_array_basic()
```

**Task 2.3**: Run the test and observe output

```bash
python test_validation.py
```

**Technical Terms Explained**:
- **C-contiguous**: Row-major order; elements in each row are stored consecutively in memory
- **F-contiguous**: Column-major order (Fortran style); elements in each column are consecutive
- **CSR (Compressed Sparse Row)**: Sparse matrix format efficient for row operations
- **dtype**: Data type; determines how numbers are stored (int32, float64, etc.)

### Step 3: Explore Error Handling

Understanding error messages helps debug issues:

**Task 3.1**: Test different error conditions

Add this to your test script:

```python
def test_check_array_errors():
    """Test error handling in check_array."""

    # Error 1: 1D array when 2D required
    print("Error Test 1: 1D array with ensure_2d=True")
    try:
        X_1d = np.array([1, 2, 3])
        check_array(X_1d, ensure_2d=True)
    except ValueError as e:
        print(f"  Error: {e}\n")

    # Error 2: NaN values with force_all_finite=True
    print("Error Test 2: NaN values")
    try:
        X_nan = np.array([[1, 2], [3, np.nan]])
        check_array(X_nan, force_all_finite=True)
    except ValueError as e:
        print(f"  Error: {e}\n")

    # Error 3: Inf values
    print("Error Test 3: Inf values")
    try:
        X_inf = np.array([[1, 2], [3, np.inf]])
        check_array(X_inf, force_all_finite=True)
    except ValueError as e:
        print(f"  Error: {e}\n")

    # Success: Allow NaN
    print("Success Test: Allow NaN with force_all_finite=False")
    X_nan = np.array([[1, 2], [3, np.nan]])
    X_checked = check_array(X_nan, force_all_finite=False)
    print(f"  Shape: {X_checked.shape}")
    print(f"  Contains NaN: {np.any(np.isnan(X_checked))}\n")

if __name__ == "__main__":
    test_check_array_basic()
    print("=" * 60 + "\n")
    test_check_array_errors()
```

### Step 4: Explore `check_X_y()`

This function validates both features and targets together:

**Task 4.1**: Read the source

```bash
grep -A 100 "^def check_X_y" sklearn/utils/validation.py | head -120
```

Location: `sklearn/utils/validation.py:1113`

**Task 4.2**: Test `check_X_y()`

```python
from sklearn.utils.validation import check_X_y

def test_check_X_y():
    """Test check_X_y functionality."""

    # Test 1: Basic usage
    X = [[1, 2], [3, 4], [5, 6]]
    y = [0, 1, 0]

    X_checked, y_checked = check_X_y(X, y)

    print("Test 1: Basic check_X_y")
    print(f"  X shape: {X_checked.shape}")
    print(f"  y shape: {y_checked.shape}")
    print(f"  X dtype: {X_checked.dtype}")
    print(f"  y dtype: {y_checked.dtype}\n")

    # Test 2: Length mismatch error
    print("Test 2: Length mismatch")
    try:
        X = [[1, 2], [3, 4]]
        y = [0, 1, 0]  # Wrong length!
        check_X_y(X, y)
    except ValueError as e:
        print(f"  Error: {e}\n")

    # Test 3: Multi-output
    X = [[1, 2], [3, 4], [5, 6]]
    y = [[0, 1], [1, 0], [0, 1]]  # Multi-output

    X_checked, y_checked = check_X_y(X, y, multi_output=True)

    print("Test 3: Multi-output")
    print(f"  X shape: {X_checked.shape}")
    print(f"  y shape: {y_checked.shape}\n")

    # Test 4: Ensure y is 1D
    print("Test 4: Column vector y")
    X = [[1, 2], [3, 4]]
    y = [[0], [1]]  # Column vector

    X_checked, y_checked = check_X_y(X, y)
    print(f"  Input y shape: {np.array(y).shape}")
    print(f"  Output y shape: {y_checked.shape}")
    print(f"  y squeezed to 1D: {y_checked.ndim == 1}\n")

if __name__ == "__main__":
    test_check_array_basic()
    print("=" * 60 + "\n")
    test_check_array_errors()
    print("=" * 60 + "\n")
    test_check_X_y()
```

### Step 5: Explore `check_is_fitted()`

This function checks if an estimator has been fitted:

**Task 5.1**: Read the source

```bash
grep -A 80 "^def check_is_fitted" sklearn/utils/validation.py | head -100
```

Location: `sklearn/utils/validation.py:1390`

**Task 5.2**: Test with a real estimator

```python
from sklearn.linear_model import LogisticRegression
from sklearn.utils.validation import check_is_fitted

def test_check_is_fitted():
    """Test check_is_fitted functionality."""

    # Create an unfitted estimator
    model = LogisticRegression()

    print("Test 1: Check unfitted estimator")
    try:
        check_is_fitted(model)
        print("  ERROR: Should have raised NotFittedError")
    except Exception as e:
        print(f"  Exception type: {type(e).__name__}")
        print(f"  Error message: {e}\n")

    # Fit the estimator
    X = [[1, 2], [3, 4], [5, 6], [7, 8]]
    y = [0, 0, 1, 1]
    model.fit(X, y)

    print("Test 2: Check fitted estimator")
    try:
        check_is_fitted(model)
        print("  ✓ Estimator is fitted\n")
    except Exception as e:
        print(f"  ERROR: {e}\n")

    # Check specific attributes
    print("Test 3: Check specific attributes")
    try:
        check_is_fitted(model, attributes=['coef_', 'intercept_'])
        print("  ✓ Required attributes exist\n")
    except Exception as e:
        print(f"  ERROR: {e}\n")

    # What attributes does a fitted model have?
    print("Test 4: Fitted attributes")
    fitted_attrs = [attr for attr in dir(model) if attr.endswith('_') and not attr.startswith('_')]
    print(f"  Fitted attributes: {fitted_attrs[:5]}...")  # Show first 5

if __name__ == "__main__":
    test_check_array_basic()
    print("=" * 60 + "\n")
    test_check_array_errors()
    print("=" * 60 + "\n")
    test_check_X_y()
    print("=" * 60 + "\n")
    test_check_is_fitted()
```

### Step 6: Trace Validation Through an Estimator

Now let's see how validation flows through a real estimator:

**Task 6.1**: Trace LogisticRegression

Open `sklearn/linear_model/_logistic.py` and find the `LogisticRegression` class.

**Questions**:
1. Where is `check_X_y()` called in the `fit()` method?
2. What parameters are passed to validation functions?
3. How does it handle sparse matrices?

<details>
<summary>Click for guidance</summary>

Look at `sklearn/linear_model/_logistic.py` around line 1270 (LogisticRegression.fit):

```python
def fit(self, X, y, sample_weight=None):
    # ... parameter validation ...

    # This is where validation happens:
    X, y = self._validate_data(
        X,
        y,
        accept_sparse="csr",
        dtype=_dtype,
        order="C",
        accept_large_sparse=solver not in ["liblinear", "sag", "saga"],
    )
```

The `_validate_data()` method (from BaseEstimator) calls `check_X_y()` internally.

Location: `sklearn/base.py:578` (_validate_data method)
</details>

**Task 6.2**: Create a tracing script

```python
from sklearn.linear_model import LogisticRegression
import numpy as np

def trace_validation():
    """Trace how validation works in LogisticRegression."""

    # Create data in different formats
    X_list = [[1, 2], [3, 4], [5, 6], [7, 8]]
    y_list = [0, 0, 1, 1]

    # Fit the model
    model = LogisticRegression()

    print("Before fit:")
    print(f"  X type: {type(X_list)}")
    print(f"  y type: {type(y_list)}")
    print(f"  Has coef_: {hasattr(model, 'coef_')}\n")

    # Fit (validation happens here)
    model.fit(X_list, y_list)

    print("After fit:")
    print(f"  Has coef_: {hasattr(model, 'coef_')}")
    print(f"  coef_ shape: {model.coef_.shape}")
    print(f"  coef_ dtype: {model.coef_.dtype}")
    print(f"  n_features_in_: {model.n_features_in_}")

    # The model converted our lists to arrays internally!

    # Now predict
    X_test = [[2, 3]]
    y_pred = model.predict(X_test)

    print(f"\nPrediction:")
    print(f"  Input type: {type(X_test)}")
    print(f"  Output: {y_pred}")
    print(f"  Output type: {type(y_pred)}")

if __name__ == "__main__":
    # ... previous tests ...
    print("=" * 60 + "\n")
    trace_validation()
```

### Step 7: Explore Other Validation Functions

**Task 7.1**: Test additional utilities

```python
from sklearn.utils.validation import (
    column_or_1d,
    check_consistent_length,
    assert_all_finite
)

def test_other_validators():
    """Test other validation utilities."""

    # Test 1: column_or_1d
    print("Test 1: column_or_1d")
    y_column = np.array([[1], [2], [3]])  # Column vector
    y_1d = column_or_1d(y_column)
    print(f"  Input shape: {y_column.shape}")
    print(f"  Output shape: {y_1d.shape}\n")

    # Test 2: check_consistent_length
    print("Test 2: check_consistent_length")
    X = [[1, 2], [3, 4], [5, 6]]
    y = [0, 1, 0]
    sample_weight = [1.0, 2.0, 1.5]

    try:
        check_consistent_length(X, y, sample_weight)
        print("  ✓ All arrays have consistent length\n")
    except ValueError as e:
        print(f"  Error: {e}\n")

    # Test 3: check_consistent_length with mismatch
    print("Test 3: check_consistent_length with mismatch")
    try:
        bad_weights = [1.0, 2.0]  # Wrong length
        check_consistent_length(X, y, bad_weights)
    except ValueError as e:
        print(f"  Error: {e}\n")

    # Test 4: assert_all_finite
    print("Test 4: assert_all_finite")
    X_good = np.array([[1, 2], [3, 4]])
    assert_all_finite(X_good)
    print("  ✓ All values are finite\n")

    print("Test 5: assert_all_finite with NaN")
    try:
        X_bad = np.array([[1, 2], [3, np.nan]])
        assert_all_finite(X_bad)
    except ValueError as e:
        print(f"  Error: {e}\n")
```

## Verification Checklist

After completing this exercise, you should be able to:

- [ ] Explain what `check_array()` does and when to use it
- [ ] Understand the difference between C-contiguous and F-contiguous arrays
- [ ] Know how to validate both X and y using `check_X_y()`
- [ ] Use `check_is_fitted()` to verify an estimator has been trained
- [ ] Handle different input types (lists, arrays, DataFrames, sparse matrices)
- [ ] Understand common error messages from validation functions
- [ ] Trace validation flow through sklearn estimators

## Key Insights

### Why Input Validation Matters

1. **User Experience**: Clear error messages help users fix issues quickly
2. **Performance**: Correct memory layout (C-contiguous) improves performance
3. **Correctness**: Ensures algorithms receive data in expected format
4. **Flexibility**: Allows users to pass various input types

### Common Validation Patterns

```python
# Pattern 1: Transformer fit
def fit(self, X, y=None):
    X = check_array(X, accept_sparse=True)
    # ... rest of fit logic ...
    return self

# Pattern 2: Classifier fit
def fit(self, X, y):
    X, y = check_X_y(X, y, accept_sparse='csr')
    # ... rest of fit logic ...
    return self

# Pattern 3: Predict
def predict(self, X):
    check_is_fitted(self)
    X = check_array(X, accept_sparse=True)
    # ... prediction logic ...
    return predictions
```

### Memory Layout Performance

C-contiguous arrays are faster for row-wise operations:
```python
# Slow (row access on F-contiguous)
X = np.array([[1, 2], [3, 4]], order='F')
for row in X:
    process(row)

# Fast (row access on C-contiguous)
X = np.array([[1, 2], [3, 4]], order='C')
for row in X:
    process(row)
```

## Challenge Extensions

### Challenge 1: Create a Validation Helper
Create a helper function that validates data for your custom estimator:

```python
def validate_my_estimator_input(X, y=None, ensure_positive=False):
    """Validate input for my custom estimator.

    Parameters
    ----------
    X : array-like
        Input features
    y : array-like, optional
        Target values
    ensure_positive : bool
        If True, check all values are positive

    Returns
    -------
    X_validated : array
        Validated X
    y_validated : array or None
        Validated y if provided
    """
    # TODO: Implement validation
    pass
```

### Challenge 2: Handle Multiple Input Types
Create a function that handles lists, NumPy arrays, pandas DataFrames, and sparse matrices:

```python
def flexible_input_handler(X):
    """Handle multiple input types and return appropriate format."""
    # Hint: Use isinstance checks and check_array
    pass
```

### Challenge 3: Study Real Estimator
Pick an estimator you're interested in and trace all validation calls:
1. Find the estimator in sklearn
2. Identify all `check_*` function calls
3. Understand why each validation is needed
4. Document the validation flow

### Challenge 4: Implement Custom Validation
Create validation that checks for custom constraints:

```python
def check_positive_definite(X):
    """Check if matrix X is positive definite."""
    # Hint: Use numpy.linalg.eigvals
    pass

def check_probability_distribution(X):
    """Check if rows of X sum to 1 (probability distributions)."""
    pass
```

## Interesting Technical Snippets

Add these to your `compilation.md` file as interesting technical patterns:

### Validation Pattern: Accepting Multiple Sparse Formats
```python
# From sklearn/utils/validation.py
# Allows multiple sparse formats: csr, csc, or coo
X = check_array(X, accept_sparse=['csr', 'csc', 'coo'])
```
**Location**: `sklearn/utils/validation.py:920`

### Pattern: Forcing Numeric Types
```python
# Ensures X contains only numeric values
X = check_array(X, dtype='numeric')
```
**Location**: Used throughout sklearn

### Pattern: Preserving DataFrame Columns
```python
# In sklearn 1.2+, you can preserve feature names
X = check_array(X)  # Converts DataFrame to array
# But you can get names back:
feature_names = self.feature_names_in_  # Stored during fit
```

## Next Steps

1. Read the full `sklearn/utils/validation.py` file
2. Look at how validation is used in different modules:
   - `sklearn/preprocessing/_data.py` - Scalers
   - `sklearn/linear_model/_base.py` - Linear models
   - `sklearn/tree/_classes.py` - Decision trees
3. Practice adding validation to your own estimators
4. Complete the next exercise on testing!

## Resources

- **Validation module**: `sklearn/utils/validation.py`
- **Base estimator**: `sklearn/base.py`
- **NumPy array interface**: https://numpy.org/doc/stable/reference/arrays.ndarray.html
- **Scipy sparse matrices**: https://docs.scipy.org/doc/scipy/reference/sparse.html
- **Developer docs**: https://scikit-learn.org/dev/developers/develop.html

## Summary

Input validation is the foundation of reliable machine learning software. Every sklearn estimator uses these validation utilities to ensure:
- Consistent behavior across different input types
- Clear error messages when something is wrong
- Optimal performance through proper memory layout
- Type safety and correctness

By understanding validation, you can write better estimators and debug issues more effectively!
