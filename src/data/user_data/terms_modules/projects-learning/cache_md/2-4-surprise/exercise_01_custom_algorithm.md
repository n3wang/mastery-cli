# Practice Exercise 1: Implementing a Custom Prediction Algorithm

## Difficulty Level: Beginner

## Objective
Learn the fundamentals of Surprise's algorithm architecture by implementing a simple custom prediction algorithm called `GlobalMeanAlgorithm` that predicts the global mean rating for all user-item pairs.

## What You'll Learn
- How algorithms inherit from `AlgoBase`
- The difference between `fit()` and `estimate()` methods
- How to work with the `Trainset` object
- How to test your algorithm using Surprise's built-in tools

## Background
In Surprise, all prediction algorithms inherit from the `AlgoBase` class. The two main methods you need to implement are:
- **`fit(trainset)`**: Train your algorithm on the training data
- **`estimate(u, i)`**: Estimate the rating for user `u` and item `i`

The simplest possible algorithm is one that always predicts the global mean rating, regardless of the user or item.

## Prerequisites
- Surprise library installed
- Basic Python knowledge
- Understanding of object-oriented programming

## Step-by-Step Instructions

### Step 1: Locate the Algorithm Base Class

First, let's examine the base class that all algorithms inherit from.

**File to examine**: `surprise/prediction_algorithms/algo_base.py`

Open this file and look for:
- The `AlgoBase` class definition
- The `fit()` method signature
- The `estimate()` method signature
- The `predict()` method (already implemented for you)

**Key observation**: Notice that `AlgoBase` is an abstract base class. Subclasses must implement `fit()` and `estimate()`.

### Step 2: Create Your Algorithm File

Create a new file named `global_mean.py` in the `surprise/prediction_algorithms/` directory.

**File path**: `surprise/prediction_algorithms/global_mean.py`

### Step 3: Import Required Modules

Add the following imports to your `global_mean.py` file:

```python
from .algo_base import AlgoBase
```

This imports the base class that your algorithm will inherit from.

### Step 4: Define Your Algorithm Class

Create a class called `GlobalMeanAlgorithm` that inherits from `AlgoBase`:

```python
class GlobalMeanAlgorithm(AlgoBase):
    """
    Algorithm that predicts the global mean rating for all user-item pairs.

    This is the simplest possible prediction algorithm, serving as a baseline
    for more sophisticated methods.
    """

    def __init__(self):
        # Call parent constructor
        AlgoBase.__init__(self)
        # We'll store the global mean here
        self.global_mean = None
```

### Step 5: Implement the `fit()` Method

The `fit()` method trains your algorithm on the training data. For our simple algorithm, "training" just means calculating and storing the global mean.

```python
    def fit(self, trainset):
        """
        Train the algorithm on the trainset.

        For this simple algorithm, training consists of computing and storing
        the global mean of all ratings in the trainset.

        Args:
            trainset: A Trainset object containing the training data

        Returns:
            self: The trained algorithm instance
        """
        # Call parent's fit method (important!)
        AlgoBase.fit(self, trainset)

        # Calculate the global mean from the trainset
        # The trainset object has a 'global_mean' attribute
        self.global_mean = self.trainset.global_mean

        return self
```

**Key Points**:
- Always call `AlgoBase.fit(self, trainset)` first - this stores the trainset
- The `trainset` object provides useful attributes like `global_mean`
- Return `self` to allow method chaining

### Step 6: Implement the `estimate()` Method

The `estimate()` method predicts the rating for a specific user-item pair. Since we're predicting the global mean for everyone, this is simple:

```python
    def estimate(self, u, i):
        """
        Estimate the rating for user u and item i.

        Args:
            u: Inner user id (integer)
            i: Inner item id (integer)

        Returns:
            float: The estimated rating (global mean for this algorithm)
        """
        # For this simple algorithm, always return the global mean
        return self.global_mean
```

**Key Points**:
- `u` and `i` are "inner IDs" (integer indices), not the original user/item IDs
- This method should return a float representing the predicted rating
- No need to handle unknown users/items specially - that's handled by the parent class

### Step 7: Make Your Algorithm Available

To make your algorithm importable, add it to `surprise/prediction_algorithms/__init__.py`:

1. Open `surprise/prediction_algorithms/__init__.py`
2. Add the import at the top with the other imports:
   ```python
   from .global_mean import GlobalMeanAlgorithm
   ```
3. Add `'GlobalMeanAlgorithm'` to the `__all__` list

### Step 8: Test Your Algorithm

Create a test script to verify your algorithm works. Create a file called `test_global_mean.py` in the project root:

```python
"""Test script for GlobalMeanAlgorithm"""

from surprise import Dataset
from surprise.model_selection import cross_validate
from surprise.prediction_algorithms import GlobalMeanAlgorithm

# Load the movielens-100k dataset
data = Dataset.load_builtin('ml-100k')

# Instantiate your algorithm
algo = GlobalMeanAlgorithm()

# Run 5-fold cross-validation
results = cross_validate(algo, data, measures=['RMSE', 'MAE'], cv=5, verbose=True)

# Print results
print("\nResults:")
print(f"Average RMSE: {results['test_rmse'].mean():.4f}")
print(f"Average MAE: {results['test_mae'].mean():.4f}")
```

Run the test:
```bash
python test_global_mean.py
```

### Step 9: Compare with Other Algorithms

Modify your test script to compare your algorithm with `NormalPredictor`:

```python
from surprise import Dataset
from surprise.model_selection import cross_validate
from surprise.prediction_algorithms import GlobalMeanAlgorithm, NormalPredictor

data = Dataset.load_builtin('ml-100k')

# Test your algorithm
print("Testing GlobalMeanAlgorithm...")
algo1 = GlobalMeanAlgorithm()
results1 = cross_validate(algo1, data, measures=['RMSE', 'MAE'], cv=5, verbose=False)

# Test NormalPredictor
print("Testing NormalPredictor...")
algo2 = NormalPredictor()
results2 = cross_validate(algo2, data, measures=['RMSE', 'MAE'], cv=5, verbose=False)

# Compare
print("\nComparison:")
print(f"GlobalMeanAlgorithm - RMSE: {results1['test_rmse'].mean():.4f}, MAE: {results1['test_mae'].mean():.4f}")
print(f"NormalPredictor     - RMSE: {results2['test_rmse'].mean():.4f}, MAE: {results2['test_mae'].mean():.4f}")
```

### Step 10: Verify Your Implementation

Your algorithm should:
- ✓ Train without errors
- ✓ Make predictions for all user-item pairs
- ✓ Achieve RMSE around 1.12 and MAE around 0.94 on MovieLens 100k
- ✓ Perform better than `NormalPredictor`

## Expected Results

On the MovieLens 100k dataset, you should see:
- **RMSE**: ~1.12-1.13
- **MAE**: ~0.94-0.95

These results won't be great compared to sophisticated algorithms like SVD, but that's expected! This is a very simple baseline algorithm.

## Complete Code Reference

Here's what your complete `global_mean.py` file should look like:

```python
"""
Global Mean prediction algorithm
"""

from .algo_base import AlgoBase


class GlobalMeanAlgorithm(AlgoBase):
    """
    Algorithm that predicts the global mean rating for all user-item pairs.

    This is the simplest possible prediction algorithm, serving as a baseline
    for more sophisticated methods.
    """

    def __init__(self):
        AlgoBase.__init__(self)
        self.global_mean = None

    def fit(self, trainset):
        """
        Train the algorithm on the trainset.

        For this simple algorithm, training consists of computing and storing
        the global mean of all ratings in the trainset.

        Args:
            trainset: A Trainset object containing the training data

        Returns:
            self: The trained algorithm instance
        """
        AlgoBase.fit(self, trainset)
        self.global_mean = self.trainset.global_mean
        return self

    def estimate(self, u, i):
        """
        Estimate the rating for user u and item i.

        Args:
            u: Inner user id (integer)
            i: Inner item id (integer)

        Returns:
            float: The estimated rating (global mean for this algorithm)
        """
        return self.global_mean
```

## Troubleshooting

### Import Error
**Problem**: `ImportError: cannot import name 'GlobalMeanAlgorithm'`

**Solution**: Make sure you added the import to `surprise/prediction_algorithms/__init__.py`

### AttributeError: 'GlobalMeanAlgorithm' has no attribute 'trainset'
**Problem**: Forgot to call parent's `fit()` method

**Solution**: Add `AlgoBase.fit(self, trainset)` at the start of your `fit()` method

### Predictions are None
**Problem**: `estimate()` returns None

**Solution**: Make sure `self.global_mean` is set in the `fit()` method and returned in `estimate()`

## Extension Ideas

Once you've successfully implemented this algorithm, try these extensions:

1. **User Mean Algorithm**: Predict the mean rating for each user instead of the global mean
2. **Item Mean Algorithm**: Predict the mean rating for each item
3. **Random Algorithm**: Predict a random rating within the valid rating scale
4. **User-Item Mean**: Average the user mean and item mean

## Key Takeaways

- All Surprise algorithms inherit from `AlgoBase`
- `fit()` trains the algorithm and stores necessary data
- `estimate()` makes predictions for user-item pairs
- The `trainset` object provides useful data like `global_mean`, `ur`, `ir`
- Surprise handles cross-validation, evaluation, and data splitting for you

## Next Steps

After completing this exercise, you're ready for:
- **Exercise 2**: Implementing a Custom Accuracy Metric
- Reading the source code of more complex algorithms like `KNNBasic`
- Implementing algorithms with hyperparameters
- Working with similarity measures
