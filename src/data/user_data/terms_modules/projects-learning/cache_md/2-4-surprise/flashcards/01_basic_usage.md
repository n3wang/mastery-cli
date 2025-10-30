# Surprise Library - Basic Usage Flashcards

## Core Workflow and Usage Patterns

---

#### Loading Built-in Datasets
Surprise provides built-in datasets like MovieLens 100k, MovieLens 1M, and Jester. These are automatically downloaded and cached on first use. The `Dataset.load_builtin()` method returns a Dataset object ready for cross-validation.

```python
from surprise import Dataset

# Loads MovieLens 100k dataset
data = Dataset.load_builtin('ml-100k')
# Other options: 'ml-1m', 'jester'
```

:p What method do you use to load a built-in dataset in Surprise, and what does it return?
??x
Use `Dataset.load_builtin('dataset_name')` where dataset_name can be 'ml-100k', 'ml-1m', or 'jester'.

It returns a Dataset object that contains the rating data ready to be used for training and evaluation.

```python
from surprise import Dataset
data = Dataset.load_builtin('ml-100k')
```
x??

---

#### Basic Cross-Validation Workflow
Cross-validation is the primary way to evaluate algorithms in Surprise. The `cross_validate()` function handles splitting data, training, testing, and computing metrics automatically. It returns a dictionary with arrays of metric values for each fold.

```python
from surprise import Dataset, SVD
from surprise.model_selection import cross_validate

data = Dataset.load_builtin('ml-100k')
algo = SVD()

# 5-fold CV with RMSE and MAE metrics
results = cross_validate(algo, data, measures=['RMSE', 'MAE'],
                        cv=5, verbose=True)
```

:p What is the basic workflow for running cross-validation in Surprise?
??x
1. Load a dataset using `Dataset.load_builtin()` or `Dataset.load_from_file()`
2. Instantiate an algorithm (e.g., `algo = SVD()`)
3. Call `cross_validate(algo, data, measures=['RMSE', 'MAE'], cv=5)`

The function automatically handles data splitting, training, testing, and metric calculation for all folds.

```python
from surprise import Dataset, SVD
from surprise.model_selection import cross_validate

data = Dataset.load_builtin('ml-100k')
algo = SVD()
results = cross_validate(algo, data, measures=['RMSE'], cv=5)
```
x??

---

#### Train-Test Split Pattern
For a single train-test split instead of cross-validation, use `train_test_split()`. This is useful when you want explicit control over training and testing, or when implementing custom evaluation logic.

```python
from surprise import Dataset, SVD
from surprise.model_selection import train_test_split

data = Dataset.load_builtin('ml-100k')
trainset, testset = train_test_split(data, test_size=0.25)

algo = SVD()
algo.fit(trainset)  # Train on trainset
predictions = algo.test(testset)  # Test on testset
```

:p How do you perform a single train-test split in Surprise and make predictions?
??x
1. Use `train_test_split(data, test_size=0.25)` to get trainset and testset
2. Call `algo.fit(trainset)` to train the algorithm
3. Call `algo.test(testset)` to get predictions
4. Optionally evaluate with `accuracy.rmse(predictions)`

```python
trainset, testset = train_test_split(data, test_size=0.25)
algo = SVD()
algo.fit(trainset)
predictions = algo.test(testset)
```
x??

---

#### Making Single Predictions
After training an algorithm on a trainset, you can predict individual user-item ratings using the `predict()` method. This returns a Prediction object containing the estimated rating and details.

```python
algo = SVD()
algo.fit(trainset)

# Predict rating for user '196' and item '302'
prediction = algo.predict(uid='196', iid='302')
print(prediction.est)  # Estimated rating
```

:p How do you predict a single user-item rating after training an algorithm?
??x
After calling `algo.fit(trainset)`, use `algo.predict(uid, iid)` where uid and iid are the raw user and item IDs (as they appear in your dataset).

Returns a Prediction object with attributes:
- `est`: estimated rating
- `r_ui`: actual rating (if known)
- `details`: algorithm-specific details

```python
prediction = algo.predict(uid='196', iid='302')
estimated_rating = prediction.est
```
x??

---

#### Loading Custom Datasets from File
To load your own rating data, use `Dataset.load_from_file()` with a Reader object that specifies the file format. The Reader defines the line format, separator, and rating scale.

```python
from surprise import Dataset, Reader

# Define the format: user item rating (tab-separated)
reader = Reader(line_format='user item rating', sep='\\t',
                rating_scale=(1, 5))

# Load data from file
data = Dataset.load_from_file('path/to/ratings.csv', reader=reader)
```

:p How do you load a custom dataset from a file in Surprise?
??x
1. Create a Reader object specifying the format:
   - `line_format`: order of fields (e.g., 'user item rating')
   - `sep`: separator character (tab, comma, etc.)
   - `rating_scale`: tuple of (min, max) ratings

2. Use `Dataset.load_from_file(file_path, reader=reader)`

```python
from surprise import Dataset, Reader

reader = Reader(line_format='user item rating',
                sep='\\t', rating_scale=(1, 5))
data = Dataset.load_from_file('ratings.txt', reader=reader)
```
x??

---

#### Evaluating Predictions with Accuracy Metrics
After getting predictions from `algo.test()`, use accuracy functions to compute error metrics. Common metrics include RMSE (Root Mean Squared Error), MAE (Mean Absolute Error), and MSE (Mean Squared Error).

```python
from surprise import accuracy

predictions = algo.test(testset)

# Compute and print metrics
accuracy.rmse(predictions)  # Root Mean Squared Error
accuracy.mae(predictions)   # Mean Absolute Error
accuracy.mse(predictions)   # Mean Squared Error
```

:p What are the main accuracy metrics in Surprise and how do you compute them?
??x
Main metrics:
- **RMSE**: Root Mean Squared Error (penalizes large errors more)
- **MAE**: Mean Absolute Error (average absolute difference)
- **MSE**: Mean Squared Error (squared differences)
- **FCP**: Fraction of Concordant Pairs (ranking quality)

Compute them by passing predictions to accuracy functions:

```python
from surprise import accuracy
predictions = algo.test(testset)
accuracy.rmse(predictions)  # Prints and returns RMSE
accuracy.mae(predictions)   # Prints and returns MAE
```

All functions return the computed value and print it by default (use `verbose=False` to suppress printing).
x??

---

#### Hyperparameter Tuning with GridSearchCV
GridSearchCV performs exhaustive search over specified parameter values, using cross-validation to evaluate each combination. It finds the best parameters based on a specified metric.

```python
from surprise import Dataset, SVD
from surprise.model_selection import GridSearchCV

data = Dataset.load_builtin('ml-100k')

# Define parameter grid
param_grid = {
    'n_epochs': [5, 10, 20],
    'lr_all': [0.002, 0.005, 0.01],
    'n_factors': [50, 100]
}

gs = GridSearchCV(SVD, param_grid, measures=['rmse'], cv=3)
gs.fit(data)

print(gs.best_params['rmse'])  # Best parameters
print(gs.best_score['rmse'])   # Best RMSE score
```

:p How do you perform hyperparameter tuning in Surprise using GridSearchCV?
??x
1. Define a parameter grid as a dictionary with parameter names as keys and lists of values to try
2. Create GridSearchCV with the algorithm class (not instance), param_grid, measures, and cv folds
3. Call `gs.fit(data)` to run the search
4. Access best parameters via `gs.best_params['metric_name']`

```python
from surprise.model_selection import GridSearchCV

param_grid = {'n_factors': [50, 100], 'n_epochs': [10, 20]}
gs = GridSearchCV(SVD, param_grid, measures=['rmse'], cv=3)
gs.fit(data)
best_params = gs.best_params['rmse']
```

Note: Pass the algorithm CLASS (SVD), not an instance (SVD()).
x??

---

#### Building Full Trainset
When you want to train on ALL available data (not splitting into train/test), use `build_full_trainset()`. This is useful before making predictions on new, unseen data or when deploying a model.

```python
from surprise import Dataset, SVD

data = Dataset.load_builtin('ml-100k')

# Build trainset using ALL data
trainset = data.build_full_trainset()

algo = SVD()
algo.fit(trainset)

# Now can predict for any user-item pair
prediction = algo.predict('196', '302')
```

:p When and how do you train an algorithm on the entire dataset in Surprise?
??x
Use `data.build_full_trainset()` to create a trainset from all available data. This is useful when:
- You've finished evaluation and want to train a final model
- You want to make predictions on new data
- You're deploying the model to production

```python
trainset = data.build_full_trainset()
algo = SVD()
algo.fit(trainset)
# Now ready for predictions
```

Note: You cannot evaluate on this trainset since there's no held-out test data.
x??

---

#### Understanding Prediction Objects
The `predict()` and `test()` methods return Prediction objects (or lists of them). Each Prediction contains the user ID, item ID, actual rating (if known), estimated rating, and algorithm-specific details.

```python
# Single prediction
pred = algo.predict(uid='196', iid='302', r_ui=4.0)

# Access attributes
print(pred.uid)      # User ID: '196'
print(pred.iid)      # Item ID: '302'
print(pred.r_ui)     # Actual rating: 4.0
print(pred.est)      # Estimated rating: e.g., 3.8
print(pred.details)  # Dict with algorithm details
```

:p What information does a Prediction object contain in Surprise?
??x
A Prediction object has these attributes:
- **uid**: Raw user ID (as it appears in the dataset)
- **iid**: Raw item ID (as it appears in the dataset)
- **r_ui**: Actual rating (None if unknown)
- **est**: Estimated rating (the prediction)
- **details**: Dictionary with algorithm-specific information

```python
pred = algo.predict(uid='196', iid='302', r_ui=4.0)
estimated = pred.est
actual = pred.r_ui
error = abs(estimated - actual)
```
x??

---

#### Using Different CV Iterators
Surprise provides multiple cross-validation iterators for different splitting strategies. You can pass these to `cross_validate()` via the `cv` parameter instead of just an integer.

```python
from surprise.model_selection import KFold, ShuffleSplit

# K-Fold: splits into k consecutive folds
kf = KFold(n_splits=5)

# ShuffleSplit: random permutations
ss = ShuffleSplit(n_splits=3, test_size=0.25, random_state=42)

# Use with cross_validate
cross_validate(algo, data, cv=kf, measures=['RMSE'])
cross_validate(algo, data, cv=ss, measures=['RMSE'])
```

:p What are the different cross-validation iterators available in Surprise?
??x
Main CV iterators:
- **KFold(n_splits)**: Traditional k-fold CV
- **ShuffleSplit(n_splits, test_size)**: Random permutations
- **RepeatedKFold(n_splits, n_repeats)**: Repeated k-fold
- **LeaveOneOut()**: Leave one rating out
- **PredefinedKFold()**: Custom fold definitions

Usage:
```python
from surprise.model_selection import KFold, ShuffleSplit

kf = KFold(n_splits=5)
results = cross_validate(algo, data, cv=kf)
```

Or just pass an integer: `cv=5` (defaults to KFold).
x??

---

#### Saving and Loading Trained Models
After training an algorithm, you can save it to disk using `dump.dump()` and later load it with `dump.load()`. This is useful for deploying models or avoiding retraining.

```python
from surprise import dump

# Train and save
algo = SVD()
algo.fit(trainset)
dump.dump('my_model.pkl', algo=algo)

# Later, load the model
_, loaded_algo = dump.load('my_model.pkl')

# Make predictions with loaded model
prediction = loaded_algo.predict('196', '302')
```

:p How do you save and load a trained algorithm in Surprise?
??x
Use `dump.dump()` to save and `dump.load()` to load:

**Save:**
```python
from surprise import dump
algo = SVD()
algo.fit(trainset)
dump.dump('model.pkl', algo=algo)
```

**Load:**
```python
_, loaded_algo = dump.load('model.pkl')
prediction = loaded_algo.predict(uid, iid)
```

Note: `dump.load()` returns a tuple; the second element is the algorithm.
x??

---

#### Parallel Processing in Cross-Validation
Cross-validation can be parallelized across folds using the `n_jobs` parameter. Setting `n_jobs=-1` uses all available CPU cores, significantly speeding up evaluation.

```python
from surprise import Dataset, SVD
from surprise.model_selection import cross_validate

data = Dataset.load_builtin('ml-100k')
algo = SVD()

# Run folds in parallel using all CPU cores
results = cross_validate(algo, data, measures=['RMSE'],
                        cv=5, n_jobs=-1, verbose=True)
```

:p How do you enable parallel processing in Surprise's cross-validation?
??x
Use the `n_jobs` parameter in `cross_validate()`:
- `n_jobs=1`: Sequential (default)
- `n_jobs=N`: Use N cores
- `n_jobs=-1`: Use all available cores

```python
results = cross_validate(algo, data, measures=['RMSE'],
                        cv=5, n_jobs=-1)
```

This parallelizes across CV folds using joblib. Each fold is trained and tested independently, making it ideal for multi-core systems.
x??

---

#### Loading Data from Pandas DataFrame
You can load rating data directly from a pandas DataFrame using `Dataset.load_from_df()`. The DataFrame must have columns for user IDs, item IDs, and ratings in that order.

```python
import pandas as pd
from surprise import Dataset, Reader

# Create or load DataFrame
df = pd.DataFrame({
    'user': ['A', 'A', 'B', 'B'],
    'item': ['X', 'Y', 'X', 'Z'],
    'rating': [5, 3, 4, 2]
})

# Specify rating scale
reader = Reader(rating_scale=(1, 5))

# Load from DataFrame
data = Dataset.load_from_df(df[['user', 'item', 'rating']], reader)
```

:p How do you load rating data from a pandas DataFrame in Surprise?
??x
1. Ensure DataFrame has columns in order: user, item, rating
2. Create a Reader with the rating scale
3. Use `Dataset.load_from_df(df[['user', 'item', 'rating']], reader)`

```python
import pandas as pd
from surprise import Dataset, Reader

df = pd.DataFrame({
    'userID': [1, 1, 2],
    'itemID': [101, 102, 101],
    'rating': [5, 3, 4]
})

reader = Reader(rating_scale=(1, 5))
data = Dataset.load_from_df(
    df[['userID', 'itemID', 'rating']],
    reader
)
```

The column names don't matter, only the order matters.
x??
