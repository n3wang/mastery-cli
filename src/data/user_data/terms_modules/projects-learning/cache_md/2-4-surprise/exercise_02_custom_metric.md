# Practice Exercise 2: Implementing a Custom Accuracy Metric

## Difficulty Level: Beginner

## Objective
Learn how Surprise's evaluation system works by implementing a custom accuracy metric called MAPE (Mean Absolute Percentage Error), which measures prediction accuracy as a percentage.

## What You'll Learn
- How accuracy metrics work in Surprise
- How to process prediction objects
- How to compute and return metric values
- How to integrate your metric with `cross_validate()`

## Background

Surprise provides several built-in accuracy metrics like RMSE, MAE, MSE, and FCP. All accuracy functions follow the same pattern:
1. Accept a list of `Prediction` objects
2. Process the predictions to calculate the metric
3. Print and return the result

The MAPE metric calculates the average of absolute percentage errors:
```
MAPE = (1/n) * Σ |actual - predicted| / |actual| * 100
```

This metric is useful when you want to understand prediction errors in percentage terms rather than absolute values.

## Prerequisites
- Surprise library installed
- Completion of Exercise 1 (or understanding of basic Surprise usage)
- Basic Python and statistics knowledge

## Step-by-Step Instructions

### Step 1: Examine Existing Metrics

First, let's understand how existing metrics are implemented.

**File to examine**: `surprise/accuracy.py`

Open this file and examine the existing functions:
- `rmse()`: Root Mean Squared Error
- `mae()`: Mean Absolute Error
- `mse()`: Mean Squared Error
- `fcp()`: Fraction of Concordant Pairs

**Key observations**:
1. Each function takes `predictions` and `verbose=True` as parameters
2. Each function processes the predictions list
3. Each function computes a metric value
4. Each function prints the result (if verbose) and returns the value

### Step 2: Understand the Prediction Object

Look at the `Prediction` class in `surprise/prediction_algorithms/predictions.py`.

Each prediction object has these attributes:
- `uid`: User ID (raw ID from dataset)
- `iid`: Item ID (raw ID from dataset)
- `r_ui`: True rating (actual rating from dataset)
- `est`: Estimated rating (predicted by algorithm)
- `details`: Dictionary with additional info

For our MAPE calculation, we need `r_ui` (actual) and `est` (predicted).

### Step 3: Design the MAPE Function

Before coding, let's plan our function:

**Input**: List of `Prediction` objects
**Output**: MAPE value (float)

**Algorithm**:
1. Loop through all predictions
2. For each prediction, calculate: `|actual - predicted| / |actual|`
3. Average all these percentage errors
4. Multiply by 100 to get percentage
5. Print and return the result

**Edge case**: What if actual rating is 0? We'll need to skip those predictions.

### Step 4: Implement the MAPE Function

Open `surprise/accuracy.py` and add your function at the end of the file, before the final docstring.

```python
def mape(predictions, verbose=True):
    """Compute MAPE (Mean Absolute Percentage Error).

    MAPE measures the average magnitude of errors in percentage terms.
    It is calculated as the average of absolute percentage errors:

    .. math::
        \\text{MAPE} = \\frac{100}{n} \\sum_{i=1}^{n} \\frac{|r_i - \\hat{r}_i|}{|r_i|}

    where :math:`r_i` is the true rating and :math:`\\hat{r}_i` is the
    estimated rating.

    Args:
        predictions (:obj:`list` of :obj:`Prediction\
            <surprise.prediction_algorithms.predictions.Prediction>`):
            A list of predictions, as returned by the :meth:`test()
            <surprise.prediction_algorithms.algo_base.AlgoBase.test>` method.
        verbose (bool): If True, will print the computed value. Default is True.

    Returns:
        float: The Mean Absolute Percentage Error across all predictions.

    Note:
        Predictions where the true rating is 0 are excluded from the
        calculation to avoid division by zero.
    """
    # TODO: Implement this function
    pass
```

### Step 5: Implement the Calculation Logic

Now fill in the function body. Here's the step-by-step implementation:

```python
def mape(predictions, verbose=True):
    """Compute MAPE (Mean Absolute Percentage Error).

    MAPE measures the average magnitude of errors in percentage terms.
    It is calculated as the average of absolute percentage errors:

    .. math::
        \\text{MAPE} = \\frac{100}{n} \\sum_{i=1}^{n} \\frac{|r_i - \\hat{r}_i|}{|r_i|}

    where :math:`r_i` is the true rating and :math:`\\hat{r}_i` is the
    estimated rating.

    Args:
        predictions (:obj:`list` of :obj:`Prediction\
            <surprise.prediction_algorithms.predictions.Prediction>`):
            A list of predictions, as returned by the :meth:`test()
            <surprise.prediction_algorithms.algo_base.AlgoBase.test>` method.
        verbose (bool): If True, will print the computed value. Default is True.

    Returns:
        float: The Mean Absolute Percentage Error across all predictions.

    Note:
        Predictions where the true rating is 0 are excluded from the
        calculation to avoid division by zero.
    """
    # Step 1: Initialize a list to store percentage errors
    percentage_errors = []

    # Step 2: Loop through all predictions
    for pred in predictions:
        # Get the true rating and estimated rating
        true_rating = pred.r_ui
        estimated_rating = pred.est

        # Step 3: Skip if true rating is 0 (to avoid division by zero)
        if true_rating == 0:
            continue

        # Step 4: Calculate absolute percentage error for this prediction
        absolute_error = abs(true_rating - estimated_rating)
        percentage_error = (absolute_error / abs(true_rating)) * 100

        # Step 5: Store the percentage error
        percentage_errors.append(percentage_error)

    # Step 6: Calculate the mean of all percentage errors
    if len(percentage_errors) == 0:
        mape_value = 0.0  # No valid predictions
    else:
        mape_value = sum(percentage_errors) / len(percentage_errors)

    # Step 7: Print the result if verbose is True
    if verbose:
        print(f"MAPE: {mape_value:1.4f}")

    # Step 8: Return the MAPE value
    return mape_value
```

**Key Points**:
- We skip predictions where `true_rating == 0` to avoid division by zero
- We use `abs()` for both the numerator and denominator
- We multiply by 100 to get a percentage
- The format `{mape_value:1.4f}` prints with 4 decimal places (matching other metrics)

### Step 6: Export Your Function

To make your function available for import, add it to the `__all__` list at the top of `surprise/accuracy.py`:

Find the line that looks like:
```python
__all__ = ['rmse', 'mae', 'mse', 'fcp']
```

Change it to:
```python
__all__ = ['rmse', 'mae', 'mse', 'fcp', 'mape']
```

### Step 7: Test Your Metric

Create a test script called `test_mape.py` in the project root:

```python
"""Test script for MAPE metric"""

from surprise import Dataset, SVD
from surprise.model_selection import train_test_split
from surprise import accuracy

# Load the MovieLens 100k dataset
data = Dataset.load_builtin('ml-100k')

# Split into train and test sets
trainset, testset = train_test_split(data, test_size=0.25)

# Train an SVD algorithm
algo = SVD()
algo.fit(trainset)

# Make predictions on the test set
predictions = algo.test(testset)

# Test all metrics including your new MAPE
print("Accuracy Metrics:")
print("-" * 40)
accuracy.rmse(predictions)
accuracy.mae(predictions)
accuracy.mse(predictions)
accuracy.mape(predictions)  # Your new metric!
```

Run the test:
```bash
python test_mape.py
```

### Step 8: Use MAPE with Cross-Validation

Create another test script `test_mape_cv.py` to use MAPE with cross-validation:

```python
"""Test MAPE with cross-validation"""

from surprise import Dataset, SVD, NormalPredictor
from surprise.model_selection import cross_validate
from surprise import accuracy

# Load dataset
data = Dataset.load_builtin('ml-100k')

# Test with SVD
print("Testing SVD algorithm...")
algo_svd = SVD()
results_svd = cross_validate(algo_svd, data, measures=['RMSE', 'MAE'], cv=5, verbose=False)

# Manually compute MAPE for each fold
print("\nManual MAPE calculation for SVD:")
algo_svd = SVD()
data_raw = data.build_full_trainset()
from surprise.model_selection import KFold

kf = KFold(n_splits=5)
mape_scores = []

for trainset, testset in kf.split(data):
    algo_svd.fit(trainset)
    predictions = algo_svd.test(testset)
    mape_score = accuracy.mape(predictions, verbose=False)
    mape_scores.append(mape_score)

print(f"MAPE per fold: {[f'{score:.4f}' for score in mape_scores]}")
print(f"Average MAPE: {sum(mape_scores) / len(mape_scores):.4f}")

# Compare with NormalPredictor
print("\n" + "="*50)
print("Testing NormalPredictor algorithm...")
algo_random = NormalPredictor()
mape_scores_random = []

for trainset, testset in kf.split(data):
    algo_random.fit(trainset)
    predictions = algo_random.test(testset)
    mape_score = accuracy.mape(predictions, verbose=False)
    mape_scores_random.append(mape_score)

print(f"MAPE per fold: {[f'{score:.4f}' for score in mape_scores_random]}")
print(f"Average MAPE: {sum(mape_scores_random) / len(mape_scores_random):.4f}")
```

Run this test:
```bash
python test_mape_cv.py
```

### Step 9: Verify Your Implementation

Your MAPE metric should:
- ✓ Run without errors
- ✓ Return a float value
- ✓ Show lower values for better algorithms (e.g., SVD should have lower MAPE than NormalPredictor)
- ✓ Print values in a format consistent with other metrics

### Step 10: Add Unit Tests (Optional)

For a complete implementation, add unit tests to `tests/test_accuracy.py`:

```python
def test_mape():
    """Test MAPE metric calculation."""
    from surprise import accuracy
    from surprise.prediction_algorithms.predictions import Prediction

    # Create some test predictions
    predictions = [
        Prediction(uid='user1', iid='item1', r_ui=4.0, est=3.5, details={}),
        Prediction(uid='user2', iid='item2', r_ui=3.0, est=3.3, details={}),
        Prediction(uid='user3', iid='item3', r_ui=5.0, est=4.5, details={}),
    ]

    # Calculate expected MAPE manually
    # |4.0 - 3.5| / 4.0 * 100 = 12.5%
    # |3.0 - 3.3| / 3.0 * 100 = 10.0%
    # |5.0 - 4.5| / 5.0 * 100 = 10.0%
    # Average = (12.5 + 10.0 + 10.0) / 3 = 10.833%
    expected_mape = 10.833333333333334

    # Calculate MAPE using the function
    calculated_mape = accuracy.mape(predictions, verbose=False)

    # Check if they match (within floating point precision)
    assert abs(calculated_mape - expected_mape) < 1e-6, \
        f"Expected {expected_mape}, got {calculated_mape}"

    print("✓ MAPE test passed!")

if __name__ == '__main__':
    test_mape()
```

Save this as `test_mape_unit.py` and run:
```bash
python test_mape_unit.py
```

## Expected Results

On the MovieLens 100k dataset with SVD:
- **MAPE**: ~20-25% (typical range)

Lower MAPE values indicate better predictions. A MAPE of 20% means that on average, predictions are off by about 20% from the actual ratings.

## Complete Code Reference

Here's your complete implementation in `surprise/accuracy.py`:

```python
def mape(predictions, verbose=True):
    """Compute MAPE (Mean Absolute Percentage Error).

    MAPE measures the average magnitude of errors in percentage terms.
    It is calculated as the average of absolute percentage errors:

    .. math::
        \\text{MAPE} = \\frac{100}{n} \\sum_{i=1}^{n} \\frac{|r_i - \\hat{r}_i|}{|r_i|}

    where :math:`r_i` is the true rating and :math:`\\hat{r}_i` is the
    estimated rating.

    Args:
        predictions (:obj:`list` of :obj:`Prediction\
            <surprise.prediction_algorithms.predictions.Prediction>`):
            A list of predictions, as returned by the :meth:`test()
            <surprise.prediction_algorithms.algo_base.AlgoBase.test>` method.
        verbose (bool): If True, will print the computed value. Default is True.

    Returns:
        float: The Mean Absolute Percentage Error across all predictions.

    Note:
        Predictions where the true rating is 0 are excluded from the
        calculation to avoid division by zero.
    """
    percentage_errors = []

    for pred in predictions:
        true_rating = pred.r_ui
        estimated_rating = pred.est

        if true_rating == 0:
            continue

        absolute_error = abs(true_rating - estimated_rating)
        percentage_error = (absolute_error / abs(true_rating)) * 100
        percentage_errors.append(percentage_error)

    if len(percentage_errors) == 0:
        mape_value = 0.0
    else:
        mape_value = sum(percentage_errors) / len(percentage_errors)

    if verbose:
        print(f"MAPE: {mape_value:1.4f}")

    return mape_value
```

## Troubleshooting

### Division by Zero Error
**Problem**: `ZeroDivisionError` when running the metric

**Solution**: Make sure you're checking for `true_rating == 0` and skipping those predictions

### Import Error
**Problem**: `ImportError: cannot import name 'mape'`

**Solution**: Ensure you added `'mape'` to the `__all__` list in `surprise/accuracy.py`

### Incorrect Values
**Problem**: MAPE values seem too high or too low

**Solution**:
- Verify you're multiplying by 100 for percentage
- Check that you're using `abs()` correctly
- Make sure you're dividing by `true_rating`, not `estimated_rating`

### Verbose Not Working
**Problem**: Function doesn't print even when `verbose=True`

**Solution**: Check the `if verbose:` block and the print statement format

## Understanding MAPE

**Advantages of MAPE**:
- Easy to interpret (percentage error)
- Scale-independent (can compare across different datasets)
- Intuitive for non-technical stakeholders

**Disadvantages of MAPE**:
- Undefined when actual values are zero
- Asymmetric (overestimates and underestimates are treated differently)
- Can be misleading with small actual values

## Extension Ideas

Once you've successfully implemented MAPE, try these extensions:

1. **SMAPE (Symmetric MAPE)**: A variant that treats over- and under-predictions equally
   ```
   SMAPE = (100/n) * Σ |predicted - actual| / ((|actual| + |predicted|) / 2)
   ```

2. **WAPE (Weighted Absolute Percentage Error)**: Weight errors by actual values
   ```
   WAPE = (Σ |actual - predicted|) / (Σ |actual|) * 100
   ```

3. **Coverage Metric**: Calculate what percentage of predictions were possible (not `PredictionImpossible`)

4. **Precision@K**: For top-N recommendations, calculate precision at K items

## Key Takeaways

- Accuracy metrics in Surprise process lists of `Prediction` objects
- Each prediction contains `uid`, `iid`, `r_ui` (actual), and `est` (predicted)
- Metrics should handle edge cases (like division by zero)
- Following the existing code style makes your metric feel native to Surprise
- The `verbose` parameter controls whether metrics print their results

## Comparison with Other Metrics

Here's how MAPE relates to other metrics:

| Metric | Focus | Scale | Interpretation |
|--------|-------|-------|----------------|
| **RMSE** | Penalizes large errors | Same as ratings | Lower is better |
| **MAE** | Average absolute error | Same as ratings | Lower is better |
| **MAPE** | Percentage error | Percentage | Lower is better, intuitive |
| **FCP** | Ranking quality | 0 to 1 | Higher is better |

## Next Steps

After completing this exercise, you're ready to:
- Explore more complex metrics like precision and recall for top-N recommendations
- Implement custom similarity measures in `similarities.pyx`
- Study how `cross_validate()` works internally
- Contribute your metric back to the Surprise project (if useful!)

## Real-World Application

MAPE is particularly useful when:
- Presenting results to stakeholders who prefer percentages
- Comparing recommendation quality across different rating scales
- Building business metrics dashboards
- Evaluating model performance where relative error matters more than absolute error

Good luck with your implementation!
