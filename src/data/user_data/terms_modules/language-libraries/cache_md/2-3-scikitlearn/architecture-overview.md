# Scikit-learn Architecture Overview

This document provides a high-level overview of scikit-learn's architecture to help newcomers understand the codebase structure and design patterns.

## Table of Contents
1. [Core Design Philosophy](#core-design-philosophy)
2. [Project Structure](#project-structure)
3. [Key Components](#key-components)
4. [API Patterns](#api-patterns)
5. [Data Flow](#data-flow)
6. [Module Dependencies](#module-dependencies)
7. [Extension Mechanisms](#extension-mechanisms)

## Core Design Philosophy

Scikit-learn follows a consistent API design based on these principles:

### Consistency
All estimators (models) follow the same interface:
- `fit(X, y)` for training
- `predict(X)` or `transform(X)` for inference
- `score(X, y)` for evaluation

### Inspection
Fitted estimators store learned parameters with a trailing underscore:
```python
model = LinearRegression()
model.fit(X, y)
# Learned parameters end with '_'
print(model.coef_)      # Coefficients
print(model.intercept_) # Intercept
```

### Composition
Complex pipelines are built by combining simple estimators:
```python
from sklearn.pipeline import Pipeline
from sklearn.preprocessing import StandardScaler
from sklearn.linear_model import LogisticRegression

pipe = Pipeline([
    ('scaler', StandardScaler()),
    ('classifier', LogisticRegression())
])
```

## Project Structure

```
sklearn/
├── base.py                 # Base classes for all estimators
├── utils/                  # Shared utility functions
│   ├── validation.py      # Input validation utilities
│   ├── multiclass.py      # Multi-class/multi-label utilities
│   └── _testing.py        # Testing utilities
├── preprocessing/          # Data transformation
│   ├── _data.py           # Scalers, normalizers
│   ├── _encoders.py       # Categorical encoders
│   └── _polynomial.py     # Polynomial features
├── linear_model/          # Linear models
│   ├── _base.py           # Base linear model classes
│   ├── _logistic.py       # Logistic regression
│   └── _ridge.py          # Ridge regression
├── ensemble/              # Ensemble methods
│   ├── _forest.py         # Random forests
│   ├── _gb.py             # Gradient boosting
│   └── _voting.py         # Voting classifiers
├── tree/                  # Decision trees
│   ├── _classes.py        # Tree classifier/regressor
│   └── _tree.pyx          # Cython tree builder
├── cluster/               # Clustering algorithms
├── metrics/               # Evaluation metrics
├── model_selection/       # Cross-validation, grid search
└── pipeline.py            # Pipeline utilities
```

## Key Components

### 1. Base Classes (`sklearn/base.py`)

All estimators inherit from `BaseEstimator`:

```python
class BaseEstimator:
    def get_params(self, deep=True):
        """Get parameters for this estimator."""

    def set_params(self, **params):
        """Set parameters for this estimator."""
```

**Mixins** add specific functionality:
- `ClassifierMixin` - adds `score()` for classification
- `RegressorMixin` - adds `score()` for regression
- `TransformerMixin` - adds `fit_transform()`
- `ClusterMixin` - adds `fit_predict()`

**Technical Terms**:
- **Mixin**: A class that provides methods to other classes through inheritance but is not meant to stand alone
- **Estimator**: Any object that learns from data (has a `fit` method)

### 2. Validation Utilities (`sklearn/utils/validation.py`)

Functions for validating and transforming input data:

```python
from sklearn.utils.validation import check_array, check_X_y, check_is_fitted

# Validate input array
X = check_array(X, accept_sparse=True, dtype='numeric')

# Validate X and y together
X, y = check_X_y(X, y, accept_sparse=False)

# Check if estimator is fitted
check_is_fitted(estimator, attributes=['coef_'])
```

**Technical Terms**:
- **Sparse Matrix**: A matrix where most elements are zero, stored efficiently
- **dtype**: Data type (e.g., float32, float64, int)

### 3. Preprocessing (`sklearn/preprocessing/`)

Transformers for data preparation:

- **Scalers**: `StandardScaler`, `MinMaxScaler`, `RobustScaler`
- **Encoders**: `LabelEncoder`, `OneHotEncoder`, `OrdinalEncoder`
- **Transformations**: `PolynomialFeatures`, `FunctionTransformer`

### 4. Model Selection (`sklearn/model_selection/`)

Tools for model evaluation and tuning:

- **Cross-validation**: `cross_val_score`, `cross_validate`, `KFold`
- **Hyperparameter tuning**: `GridSearchCV`, `RandomizedSearchCV`
- **Train/test splitting**: `train_test_split`

**Technical Terms**:
- **Cross-validation**: Technique to assess model performance by splitting data into multiple folds
- **Hyperparameter**: Parameter set before training (e.g., learning rate, tree depth)

## API Patterns

### The Estimator Pattern

Every estimator follows this lifecycle:

```python
# 1. Initialization - store hyperparameters
estimator = MyEstimator(param1=value1, param2=value2)

# 2. Fitting - learn from data
estimator.fit(X_train, y_train)

# 3. Prediction - make predictions
y_pred = estimator.predict(X_test)

# 4. Evaluation - score the model
score = estimator.score(X_test, y_test)
```

### The Transformer Pattern

Transformers modify data without a target variable:

```python
# 1. Initialization
transformer = StandardScaler()

# 2. Fitting - learn transformation parameters
transformer.fit(X_train)

# 3. Transformation - apply learned transformation
X_train_scaled = transformer.transform(X_train)
X_test_scaled = transformer.transform(X_test)

# Or combine fit and transform
X_train_scaled = transformer.fit_transform(X_train)
```

### The Pipeline Pattern

Combine multiple steps into one estimator:

```python
from sklearn.pipeline import Pipeline

pipeline = Pipeline([
    ('imputer', SimpleImputer(strategy='mean')),
    ('scaler', StandardScaler()),
    ('classifier', LogisticRegression())
])

# Fit entire pipeline
pipeline.fit(X_train, y_train)

# Predict (automatically applies all transformations)
y_pred = pipeline.predict(X_test)
```

## Data Flow

### Training Flow

```
Raw Data (X, y)
    ↓
Input Validation (check_X_y)
    ↓
Data Preprocessing (transformers)
    ↓
Core Algorithm (fit)
    ↓
Store Learned Parameters (attributes with '_')
    ↓
Return Fitted Estimator
```

### Prediction Flow

```
New Data (X_new)
    ↓
Check if Fitted (check_is_fitted)
    ↓
Input Validation (check_array)
    ↓
Apply Preprocessing (transform)
    ↓
Core Prediction Algorithm
    ↓
Return Predictions (y_pred)
```

## Module Dependencies

### Core Dependencies

```
base.py (no dependencies)
    ↓
utils/ (depends on base)
    ↓
All other modules (depend on base and utils)
```

### Module Hierarchy

```
sklearn.base + sklearn.utils
    ↓
sklearn.preprocessing (transformers)
    ↓
sklearn.linear_model (simple models)
    ↓
sklearn.tree (decision trees)
    ↓
sklearn.ensemble (combines trees and models)
    ↓
sklearn.pipeline (orchestrates everything)
```

### Cross-cutting Modules

- **metrics**: Used by all modules for evaluation
- **model_selection**: Used for hyperparameter tuning and validation
- **datasets**: Provides sample data for testing

## Extension Mechanisms

### Creating Custom Estimators

Follow these rules:

1. **Inherit from base classes**:
```python
from sklearn.base import BaseEstimator, ClassifierMixin

class MyClassifier(BaseEstimator, ClassifierMixin):
    def __init__(self, param1=1.0):
        self.param1 = param1  # Store hyperparameters

    def fit(self, X, y):
        # Validate input
        X, y = check_X_y(X, y)

        # Store classes
        self.classes_ = np.unique(y)

        # Your learning algorithm here
        self.coef_ = ...  # Learned parameters end with '_'

        return self  # Always return self

    def predict(self, X):
        # Check if fitted
        check_is_fitted(self)

        # Validate input
        X = check_array(X)

        # Your prediction algorithm here
        return predictions
```

2. **Store hyperparameters as attributes** with the same name as constructor parameters
3. **Learned parameters end with underscore** (e.g., `coef_`, `classes_`)
4. **fit() must return self**
5. **Use validation utilities** from `sklearn.utils.validation`

### Creating Custom Transformers

```python
from sklearn.base import BaseEstimator, TransformerMixin

class MyTransformer(BaseEstimator, TransformerMixin):
    def __init__(self, param1=1.0):
        self.param1 = param1

    def fit(self, X, y=None):
        # Learn transformation parameters
        X = check_array(X)
        self.mean_ = X.mean(axis=0)
        return self

    def transform(self, X):
        # Apply transformation
        check_is_fitted(self)
        X = check_array(X)
        return X - self.mean_
```

## Performance Considerations

### Cython Extensions

Performance-critical code is written in Cython (`.pyx` files):
- Tree building (`sklearn/tree/_tree.pyx`)
- Distance computations (`sklearn/metrics/_pairwise_distances_reduction/`)
- SGD algorithms (`sklearn/linear_model/_sgd_fast.pyx`)

**Technical Terms**:
- **Cython**: Python-like language that compiles to C for better performance
- **C-contiguous**: Memory layout where elements are stored in row-major order

### Memory Layout

Scikit-learn prefers C-contiguous NumPy arrays for better performance:
```python
X = np.asarray(X, order='C')  # Ensure C-contiguous layout
```

### Sparse Matrix Support

Many algorithms support sparse matrices for memory efficiency:
```python
from scipy.sparse import csr_matrix

X_sparse = csr_matrix(X)  # Convert to sparse format
model.fit(X_sparse, y)     # Use sparse matrix
```

**Technical Terms**:
- **CSR (Compressed Sparse Row)**: Efficient sparse matrix format for row-wise operations
- **CSC (Compressed Sparse Column)**: Efficient sparse matrix format for column-wise operations

## Important Files to Know

| File | Purpose | Key Concepts |
|------|---------|--------------|
| `sklearn/base.py` | Base classes for all estimators | BaseEstimator, Mixins |
| `sklearn/utils/validation.py` | Input validation | check_array, check_X_y, check_is_fitted |
| `sklearn/utils/multiclass.py` | Multi-class utilities | type_of_target, unique_labels |
| `sklearn/pipeline.py` | Pipeline implementation | Pipeline, FeatureUnion |
| `sklearn/preprocessing/_data.py` | Data scalers | StandardScaler, MinMaxScaler |
| `sklearn/linear_model/_base.py` | Linear model base classes | LinearModel, LinearClassifierMixin |
| `sklearn/tree/_classes.py` | Decision tree implementation | DecisionTreeClassifier, DecisionTreeRegressor |
| `sklearn/metrics/_classification.py` | Classification metrics | accuracy_score, precision_recall_fscore_support |

## Next Steps

After understanding this architecture:

1. Work through the [practice exercises](./exercise-1-custom-transformer.md) to get hands-on experience
2. Read the [developer guide](../developer.md) for detailed development instructions
3. Explore specific modules that interest you
4. Try implementing a simple custom estimator
5. Read existing estimator code to see patterns in action

## Resources

- **Official Documentation**: https://scikit-learn.org/stable/
- **Developer Guide**: https://scikit-learn.org/dev/developers/
- **Contributing Guide**: https://scikit-learn.org/dev/developers/contributing.html
- **API Reference**: https://scikit-learn.org/stable/modules/classes.html
