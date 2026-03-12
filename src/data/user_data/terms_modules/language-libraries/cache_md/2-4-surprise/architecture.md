# Surprise Architecture Documentation

## Overview

Surprise (Simple Python RecommendatIon System Engine) is a Python library for building and analyzing recommender systems. This document outlines the architecture and design principles of the library.

## High-Level Architecture

The Surprise library follows a modular, layered architecture with clear separation of concerns:

```
┌─────────────────────────────────────────────────────────────┐
│                    User Interface Layer                      │
│                (API for users to interact)                   │
└─────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────┐
│                    Core Data Structures                      │
│      Dataset, Trainset, Reader, Builtin Datasets           │
└─────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────┐
│                 Prediction Algorithms                        │
│              (All inherit from AlgoBase)                    │
├─────────────────────────────────────────────────────────────┤
│ • Baseline Methods    • K-NN Algorithms                     │
│ • Matrix Factorization • Similarity Measures               │
│ • Special Purpose Algorithms                                │
└─────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────┐
│               Model Selection & Evaluation                   │
│      Cross-validation, Grid Search, Accuracy Metrics       │
└─────────────────────────────────────────────────────────────┘
```

## Core Components

### 1. Data Management Layer

#### Dataset (`surprise/dataset.py`)
- **Purpose**: Manages loading and handling of rating data
- **Key Classes**:
  - `Dataset`: Main class for loading data from files or built-in datasets
  - `DatasetAutoFolds`: Dataset with automatic fold generation for cross-validation
- **Responsibilities**:
  - Load data from various sources (files, pandas DataFrames, built-in datasets)
  - Create training and test sets
  - Handle data transformations

#### Reader (`surprise/reader.py`)
- **Purpose**: Parses rating files with flexible configurations
- **Key Features**:
  - Customizable field separators (tabs, commas, etc.)
  - Configurable rating scale
  - Line format specification (which columns contain user, item, rating)

#### Trainset (`surprise/trainset.py`)
- **Purpose**: Internal representation of training data optimized for algorithms
- **Key Concepts**:
  - **Raw IDs vs Inner IDs**: Maps external user/item IDs to internal integer indices
  - `ur` (user ratings): Dict mapping user IDs to their ratings
  - `ir` (item ratings): Dict mapping item IDs to their ratings
  - Maintains rating scale and statistics

### 2. Prediction Algorithm Layer

#### AlgoBase (`surprise/prediction_algorithms/algo_base.py`)
- **Purpose**: Base class for all prediction algorithms
- **Key Methods**:
  - `fit(trainset)`: Train the algorithm on a trainset
  - `predict(uid, iid, r_ui=None)`: Predict rating for user-item pair
  - `test(testset)`: Make predictions on a test set
- **Design Pattern**: Template Method pattern

#### Algorithm Categories

**Baseline Algorithms**:
- `NormalPredictor`: Random predictions from normal distribution
- `BaselineOnly`: Baseline estimates using user and item biases

**K-NN Inspired Algorithms**:
- `KNNBasic`: Basic k-nearest neighbors
- `KNNWithMeans`: k-NN with mean-centered ratings
- `KNNWithZScore`: k-NN with z-score normalization
- `KNNBaseline`: k-NN with baseline estimates

**Matrix Factorization** (Cython-optimized):
- `SVD`: Singular Value Decomposition
- `SVDpp`: SVD++ with implicit feedback
- `NMF`: Non-negative Matrix Factorization

**Special Purpose**:
- `SlopeOne`: Item-based collaborative filtering
- `CoClustering`: Co-clustering approach

### 3. Model Selection Layer

#### Cross-Validation (`surprise/model_selection/validation.py`)
- **Function**: `cross_validate()`
- **Features**:
  - Parallel execution support via joblib
  - Multiple metrics evaluation
  - Verbose output options

#### Split Strategies (`surprise/model_selection/split.py`)
- `KFold`: K-fold cross-validation
- `ShuffleSplit`: Random permutations
- `RepeatedKFold`: Repeated K-fold
- `LeaveOneOut`: Leave-one-out validation
- `PredefinedKFold`: Custom fold definitions
- `train_test_split()`: Simple train-test splitting

#### Hyperparameter Search (`surprise/model_selection/search.py`)
- `GridSearchCV`: Exhaustive grid search
- `RandomizedSearchCV`: Randomized search

### 4. Evaluation Layer

#### Accuracy Metrics (`surprise/accuracy.py`)
- **RMSE**: Root Mean Squared Error
- **MSE**: Mean Squared Error
- **MAE**: Mean Absolute Error
- **FCP**: Fraction of Concordant Pairs

## Design Patterns and Principles

### 1. Template Method Pattern
The `AlgoBase` class defines the skeleton of algorithm operations (`fit`, `predict`, `test`), with subclasses implementing specific behaviors.

### 2. Strategy Pattern
Different similarity measures and accuracy metrics can be swapped without changing algorithm code.

### 3. Factory Pattern
`Dataset` class provides factory methods for creating datasets from various sources.

### 4. Separation of Concerns
- Data handling is separate from algorithms
- Algorithms are separate from evaluation
- Model selection is independent of specific algorithms

## Performance Optimizations

### Cython Integration
Performance-critical modules are implemented in Cython:
- `matrix_factorization.pyx`: SVD, SVDpp, NMF implementations
- `similarities.pyx`: Similarity computations
- `optimize_baselines.pyx`: Baseline optimization
- `slope_one.pyx`: SlopeOne algorithm
- `co_clustering.pyx`: CoClustering algorithm

### Parallel Processing
- Cross-validation supports parallel execution via joblib
- Configurable number of jobs (`n_jobs` parameter)

### Efficient Data Structures
- NumPy arrays for numerical operations
- Dictionary-based lookups for user/item ratings
- Integer indices for users and items (inner IDs)

## Data Flow

### Typical Usage Flow

```
1. Load Data
   Dataset.load_from_file() or Dataset.load_builtin()
   ↓
2. Create Trainset
   dataset.build_full_trainset() or via cross-validation
   ↓
3. Initialize Algorithm
   algo = SVD()
   ↓
4. Train Algorithm
   algo.fit(trainset)
   ↓
5. Make Predictions
   predictions = algo.test(testset)
   ↓
6. Evaluate
   accuracy.rmse(predictions)
```

### Internal Data Transformations

```
Raw Data (CSV/DataFrame)
   ↓ [Reader.parse_line()]
Parsed Ratings (user_id, item_id, rating)
   ↓ [Dataset]
Dataset with raw IDs
   ↓ [Trainset.build()]
Trainset with inner IDs + ur/ir structures
   ↓ [Algorithm.fit()]
Trained Model
   ↓ [Algorithm.predict()]
Predictions
```

## Extension Points

### Creating Custom Algorithms
Inherit from `AlgoBase` and implement:
- `fit(trainset)`: Training logic
- `estimate(u, i)`: Prediction logic for a user-item pair

### Creating Custom Similarity Measures
Implement in `similarities.pyx` following the existing pattern.

### Creating Custom Accuracy Metrics
Add functions to `accuracy.py` that accept predictions and return metric values.

### Custom Datasets
Use `Dataset.load_from_file()` or `Dataset.load_from_df()` with custom `Reader` configurations.

## Dependencies

### Core Dependencies
- **NumPy**: Numerical operations and array handling
- **SciPy**: Scientific computing utilities
- **Joblib**: Parallel job execution

### Build Dependencies
- **Cython**: Compiling performance-critical modules
- **Setuptools**: Building and installing the package

## Code Organization

```
surprise/
├── __init__.py              # Main package initialization
├── dataset.py               # Dataset handling
├── reader.py                # File parsing
├── trainset.py              # Trainset representation
├── builtin_datasets.py      # Built-in datasets (MovieLens, Jester)
├── dump.py                  # Serialization utilities
├── accuracy.py              # Evaluation metrics
├── utils.py                 # Utility functions
├── prediction_algorithms/   # All prediction algorithms
│   ├── algo_base.py        # Base algorithm class
│   ├── predictions.py      # Prediction class
│   ├── knns.py             # K-NN algorithms
│   ├── matrix_factorization.pyx  # Matrix factorization
│   ├── baseline_only.py    # Baseline algorithms
│   ├── slope_one.pyx       # SlopeOne algorithm
│   ├── co_clustering.pyx   # CoClustering algorithm
│   ├── optimize_baselines.pyx    # Baseline optimization
│   └── similarities.pyx    # Similarity measures
└── model_selection/         # Model selection tools
    ├── validation.py        # Cross-validation
    ├── split.py            # Split strategies
    └── search.py           # Hyperparameter search
```

## Key Concepts

### Inner IDs vs Raw IDs
- **Raw IDs**: Original user/item identifiers from the dataset (can be strings, integers, etc.)
- **Inner IDs**: Internal integer indices used by algorithms (0 to n_users-1 and 0 to n_items-1)
- **Mapping**: Trainset maintains bidirectional mappings between raw and inner IDs

### User Ratings (ur) and Item Ratings (ir)
- **ur**: Dictionary where `ur[user_inner_id]` returns list of `(item_inner_id, rating)` tuples
- **ir**: Dictionary where `ir[item_inner_id]` returns list of `(user_inner_id, rating)` tuples
- These structures enable efficient access to all ratings by a user or for an item

### Global Mean
- Average of all ratings in the trainset
- Used by many algorithms as a baseline or initialization value

## Testing Strategy

The library includes comprehensive tests:
- Algorithm correctness tests
- Dataset loading tests
- Cross-validation tests
- Similarity measure tests
- Edge case handling

Tests are located in the `tests/` directory and use pytest.

## Future Considerations

The library is currently in maintenance mode, focusing on:
- Bug fixes
- Performance improvements
- Documentation updates
- Compatibility with newer Python/NumPy/SciPy versions

New feature development is not planned, but contributions are welcome.
