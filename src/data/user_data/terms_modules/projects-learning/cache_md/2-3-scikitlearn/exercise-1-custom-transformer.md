# Exercise 1: Creating a Custom Transformer

**Difficulty**: Beginner
**Time**: 30-45 minutes
**Prerequisites**: Basic Python knowledge, understanding of NumPy arrays

## Learning Objectives

By completing this exercise, you will:
1. Understand how scikit-learn transformers work
2. Learn the estimator API pattern
3. Explore the sklearn validation utilities
4. Write tests for your transformer
5. Use your transformer in a pipeline

## Background

Transformers are a core concept in scikit-learn. They transform data without requiring a target variable (y). Common examples include:
- `StandardScaler`: Scales features to have mean=0 and std=1
- `MinMaxScaler`: Scales features to a given range
- `PCA`: Reduces dimensionality

All transformers follow the same pattern:
1. `fit(X, y=None)`: Learn parameters from training data
2. `transform(X)`: Apply learned transformation to new data
3. `fit_transform(X, y=None)`: Convenience method combining both

## The Task

Create a `LogTransformer` that applies log transformation to numerical features. This is useful for:
- Making skewed distributions more normal
- Handling features with different scales
- Reducing impact of outliers

Your transformer should:
- Apply `log(X + offset)` to handle zeros and negative values
- Store the offset parameter as a hyperparameter
- Validate inputs properly
- Work in scikit-learn pipelines

## Step-by-Step Instructions

### Step 1: Set Up Your Environment

Create a new Python file in the sklearn folder to experiment:

```bash
# Create a test script (not in the actual sklearn package)
touch test_custom_transformer.py
```

### Step 2: Import Required Dependencies

Open `test_custom_transformer.py` and add these imports:

```python
import numpy as np
from sklearn.base import BaseEstimator, TransformerMixin
from sklearn.utils.validation import check_array, check_is_fitted
```

**Key Concepts**:
- `BaseEstimator`: Provides `get_params()` and `set_params()` methods
- `TransformerMixin`: Provides `fit_transform()` method
- `check_array()`: Validates and converts input to proper format
- `check_is_fitted()`: Ensures transformer is fitted before transform

**Location in codebase**:
- BaseEstimator: `sklearn/base.py:175`
- TransformerMixin: `sklearn/base.py:831`
- check_array: `sklearn/utils/validation.py:887`

### Step 3: Create the Transformer Class

```python
class LogTransformer(BaseEstimator, TransformerMixin):
    """Apply logarithmic transformation to features.

    This transformer applies log(X + offset) to all features.
    The offset prevents log(0) errors.

    Parameters
    ----------
    offset : float, default=1.0
        Value added to X before taking logarithm.
        Must be positive.

    base : {'e', 2, 10}, default='e'
        Base of logarithm. 'e' for natural log.

    Attributes
    ----------
    n_features_in_ : int
        Number of features seen during fit.

    Examples
    --------
    >>> from sklearn.preprocessing import LogTransformer
    >>> X = [[1, 2], [3, 4], [5, 6]]
    >>> transformer = LogTransformer(offset=1.0)
    >>> transformer.fit_transform(X)
    array([[0.69314718, 1.09861229],
           [1.38629436, 1.60943791],
           [1.79175947, 1.94591015]])
    """

    def __init__(self, offset=1.0, base='e'):
        # TODO: Store hyperparameters
        pass

    def fit(self, X, y=None):
        """Fit the transformer.

        Parameters
        ----------
        X : array-like of shape (n_samples, n_features)
            Training data.
        y : None
            Ignored. Exists for API consistency.

        Returns
        -------
        self : object
            Returns the instance itself.
        """
        # TODO: Implement fit method
        pass

    def transform(self, X):
        """Apply log transformation.

        Parameters
        ----------
        X : array-like of shape (n_samples, n_features)
            Data to transform.

        Returns
        -------
        X_transformed : ndarray of shape (n_samples, n_features)
            Log-transformed data.
        """
        # TODO: Implement transform method
        pass
```

**Your Task**: Fill in the three TODO sections.

**Hints**:
1. In `__init__`: Store parameters as instance attributes
2. In `fit`:
   - Validate input using `check_array()`
   - Store `n_features_in_`
   - Return `self`
3. In `transform`:
   - Check if fitted using `check_is_fitted()`
   - Validate input
   - Apply log transformation based on `base` parameter
   - Use `np.log()`, `np.log2()`, or `np.log10()`

### Step 4: Implement the `__init__` Method

<details>
<summary>Click to reveal solution</summary>

```python
def __init__(self, offset=1.0, base='e'):
    self.offset = offset
    self.base = base
```

**Why?** Scikit-learn estimators must store all hyperparameters as attributes with the same name as the constructor parameters. This enables `get_params()` and `set_params()` to work correctly.
</details>

### Step 5: Implement the `fit` Method

<details>
<summary>Click to reveal solution</summary>

```python
def fit(self, X, y=None):
    """Fit the transformer."""
    # Validate offset parameter
    if self.offset <= 0:
        raise ValueError("offset must be positive, got %s" % self.offset)

    if self.base not in ['e', 2, 10]:
        raise ValueError("base must be 'e', 2, or 10, got %s" % self.base)

    # Validate and convert input
    X = check_array(X, accept_sparse=False, ensure_2d=True)

    # Check for negative values that would cause issues
    if np.any(X < -self.offset):
        raise ValueError(
            "X contains values less than -offset. "
            "All values must be >= -offset to avoid log of negative numbers."
        )

    # Store number of features
    self.n_features_in_ = X.shape[1]

    # Return self for method chaining
    return self
```

**Key Points**:
- Parameter validation happens in `fit`, not `__init__`
- `check_array()` handles conversion to NumPy array
- Learned attributes (like `n_features_in_`) end with underscore
- Always return `self` from `fit()`

**Location reference**: See how sklearn does this in `sklearn/preprocessing/_data.py:615` (StandardScaler.fit)
</details>

### Step 6: Implement the `transform` Method

<details>
<summary>Click to reveal solution</summary>

```python
def transform(self, X):
    """Apply log transformation."""
    # Check that fit has been called
    check_is_fitted(self, 'n_features_in_')

    # Validate input
    X = check_array(X, accept_sparse=False, ensure_2d=True)

    # Check number of features matches
    if X.shape[1] != self.n_features_in_:
        raise ValueError(
            f"X has {X.shape[1]} features, "
            f"but LogTransformer was fitted with {self.n_features_in_} features."
        )

    # Apply transformation based on base
    X_offset = X + self.offset

    if self.base == 'e':
        return np.log(X_offset)
    elif self.base == 2:
        return np.log2(X_offset)
    elif self.base == 10:
        return np.log10(X_offset)
```

**Key Points**:
- `check_is_fitted()` raises error if transformer not fitted
- Feature count validation prevents shape mismatches
- Transformation is applied to a copy (X + offset creates new array)

**Location reference**: See `sklearn/preprocessing/_data.py:678` (StandardScaler.transform)
</details>

### Step 7: Test Your Transformer

Create a test function:

```python
def test_log_transformer():
    """Test basic functionality of LogTransformer."""
    # Create sample data
    X_train = np.array([[1, 2], [3, 4], [5, 6]])
    X_test = np.array([[2, 3], [4, 5]])

    # Create and fit transformer
    transformer = LogTransformer(offset=1.0, base='e')
    transformer.fit(X_train)

    # Transform test data
    X_transformed = transformer.transform(X_test)

    # Verify output shape
    assert X_transformed.shape == X_test.shape

    # Verify transformation is correct
    expected = np.log(X_test + 1.0)
    np.testing.assert_array_almost_equal(X_transformed, expected)

    print("✓ Basic transformation test passed")

    # Test fit_transform (provided by TransformerMixin)
    X_fit_transformed = transformer.fit_transform(X_train)
    X_manual = transformer.fit(X_train).transform(X_train)
    np.testing.assert_array_almost_equal(X_fit_transformed, X_manual)

    print("✓ fit_transform test passed")

    # Test error handling
    transformer_new = LogTransformer()
    try:
        transformer_new.transform(X_test)  # Should fail - not fitted
        assert False, "Should have raised error"
    except ValueError as e:
        assert "not fitted" in str(e).lower()
        print("✓ Not fitted error test passed")

    # Test negative offset error
    try:
        bad_transformer = LogTransformer(offset=-1.0)
        bad_transformer.fit(X_train)
        assert False, "Should have raised error"
    except ValueError as e:
        assert "offset must be positive" in str(e)
        print("✓ Negative offset error test passed")

    print("\n✅ All tests passed!")

if __name__ == "__main__":
    test_log_transformer()
```

Run your test:
```bash
python test_custom_transformer.py
```

### Step 8: Use in a Pipeline

Test your transformer in a real pipeline:

```python
from sklearn.pipeline import Pipeline
from sklearn.linear_model import LinearRegression
from sklearn.preprocessing import StandardScaler
from sklearn.datasets import make_regression

def test_in_pipeline():
    """Test LogTransformer in a pipeline."""
    # Create sample regression data
    X, y = make_regression(n_samples=100, n_features=5, noise=10, random_state=42)

    # Make all values positive for log transform
    X = np.abs(X)

    # Create pipeline
    pipeline = Pipeline([
        ('log', LogTransformer(offset=1.0)),
        ('scaler', StandardScaler()),
        ('regression', LinearRegression())
    ])

    # Fit pipeline
    pipeline.fit(X[:80], y[:80])

    # Make predictions
    y_pred = pipeline.predict(X[80:])

    # Evaluate
    score = pipeline.score(X[80:], y[80:])
    print(f"Pipeline R² score: {score:.3f}")

    # Access individual steps
    log_step = pipeline.named_steps['log']
    print(f"Log transformer features: {log_step.n_features_in_}")

    print("\n✅ Pipeline test passed!")

if __name__ == "__main__":
    test_log_transformer()
    print("\n" + "="*50 + "\n")
    test_in_pipeline()
```

### Step 9: Explore How sklearn Does It

Now that you've created your own transformer, explore how sklearn implements similar transformers:

1. **Look at StandardScaler**:
   ```bash
   # Open the file
   cat sklearn/preprocessing/_data.py | grep -A 50 "class StandardScaler"
   ```
   - Location: `sklearn/preprocessing/_data.py:590`
   - Notice how it validates input
   - See how it stores learned parameters (`mean_`, `scale_`)

2. **Look at MinMaxScaler**:
   ```bash
   cat sklearn/preprocessing/_data.py | grep -A 50 "class MinMaxScaler"
   ```
   - Location: `sklearn/preprocessing/_data.py:78`
   - Notice the `feature_range` parameter validation
   - See how it handles partial_fit

3. **Compare your code**:
   - Do you follow the same patterns?
   - What did they do that you didn't?
   - What additional features do they have?

## Verification Checklist

Before moving on, verify:

- [ ] Your transformer inherits from `BaseEstimator` and `TransformerMixin`
- [ ] `__init__` stores hyperparameters as instance attributes
- [ ] `fit` validates input, stores learned parameters (with `_`), and returns `self`
- [ ] `transform` checks if fitted and validates input
- [ ] All tests pass
- [ ] Transformer works in a pipeline
- [ ] You understand why each part is necessary

## Challenge Extensions

Want to go further? Try these challenges:

### Challenge 1: Add Feature Names Support
Add support for pandas DataFrames with feature names:
```python
def get_feature_names_out(self, input_features=None):
    """Get output feature names."""
    # Hint: Look at sklearn/preprocessing/_data.py:718
```

### Challenge 2: Add Sparse Matrix Support
Modify your transformer to handle sparse matrices:
```python
from scipy import sparse

def fit(self, X, y=None):
    X = check_array(X, accept_sparse='csr')  # Accept sparse
    # ...
```

### Challenge 3: Add Inverse Transform
Implement `inverse_transform` to reverse the transformation:
```python
def inverse_transform(self, X):
    """Reverse the log transformation."""
    # Hint: If y = log(x + offset), then x = exp(y) - offset
```

### Challenge 4: Write Proper Tests
Create a proper test file following sklearn conventions:
- Look at `sklearn/preprocessing/tests/test_data.py` for examples
- Use pytest fixtures
- Test edge cases (zeros, negatives, NaN, sparse matrices)
- Test parameter validation

## Key Takeaways

After completing this exercise, you should understand:

1. **The Estimator API Pattern**: All sklearn objects follow `fit`, `transform`, `predict`
2. **Validation is Critical**: Always validate inputs and check if fitted
3. **Learned Parameters Have Underscores**: Helps distinguish from hyperparameters
4. **Mixins Provide Functionality**: TransformerMixin gives you `fit_transform()` for free
5. **Pipelines Compose Transformers**: Your transformer automatically works in pipelines

## Next Steps

1. Complete [Exercise 2: Exploring the Validation Module](./exercise-2-validation-exploration.md)
2. Read the source code of transformers in `sklearn/preprocessing/`
3. Try implementing other transformers (Box-Cox, Yeo-Johnson)
4. Contribute a transformer to sklearn!

## Resources

- **TransformerMixin source**: `sklearn/base.py:831`
- **Validation utilities**: `sklearn/utils/validation.py`
- **Preprocessing module**: `sklearn/preprocessing/_data.py`
- **Tests examples**: `sklearn/preprocessing/tests/test_data.py`
- **Developer docs**: https://scikit-learn.org/dev/developers/
