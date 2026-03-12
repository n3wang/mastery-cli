# Surprise Library - Data Structures and Architecture Flashcards

## Core Data Structures and Design Patterns

---

#### Inner IDs vs Raw IDs Concept
Surprise maintains two types of identifiers: Raw IDs (original from dataset, can be strings/integers) and Inner IDs (internal integer indices 0 to n-1). This mapping enables efficient array-based operations while supporting arbitrary user/item identifiers.

**Raw ID → Inner ID mapping logic:**
```python
# Conceptual mapping in Trainset
class Trainset:
    def __init__(self):
        self._raw2inner_id_users = {}  # 'user_A' -> 0
        self._inner2raw_id_users = {}  # 0 -> 'user_A'

    def to_inner_uid(self, ruid):
        """Convert raw user ID to inner ID"""
        return self._raw2inner_id_users[ruid]

    def to_raw_uid(self, iuid):
        """Convert inner user ID to raw ID"""
        return self._inner2raw_id_users[iuid]
```

:p What is the difference between Raw IDs and Inner IDs in Surprise, and why does this distinction exist?
??x
**Raw IDs**: Original user/item identifiers from your dataset (strings, integers, any hashable type)

**Inner IDs**: Internal integer indices (0 to n_users-1 for users, 0 to n_items-1 for items)

**Why?** Algorithms use numpy arrays indexed by integers for efficiency. The mapping allows:
- Users to use any ID format in their data
- Algorithms to use fast array operations internally
- Conversion via `to_inner_uid()`, `to_raw_uid()`, `to_inner_iid()`, `to_raw_iid()`

```python
trainset.to_inner_uid('user_A')  # Returns 0
trainset.to_raw_uid(0)           # Returns 'user_A'
```
x??

---

#### Trainset ur and ir Data Structures
The Trainset contains two primary dictionaries: `ur` (user ratings) and `ir` (item ratings). These enable efficient access to all ratings by a user or for an item without scanning the entire dataset.

**Structure:**
```python
# ur: user_inner_id -> list of (item_inner_id, rating)
ur = {
    0: [(10, 5.0), (15, 4.0), (23, 3.0)],  # User 0 rated items 10, 15, 23
    1: [(10, 3.0), (11, 4.5)],              # User 1 rated items 10, 11
}

# ir: item_inner_id -> list of (user_inner_id, rating)
ir = {
    10: [(0, 5.0), (1, 3.0)],  # Item 10 rated by users 0, 1
    11: [(1, 4.5)],            # Item 11 rated by user 1
}
```

:p What are the `ur` and `ir` data structures in a Trainset, and why are they important?
??x
**ur (user ratings)**: Dictionary mapping user inner IDs to lists of (item_inner_id, rating) tuples
- `ur[user_id]` returns all items rated by that user

**ir (item ratings)**: Dictionary mapping item inner IDs to lists of (user_inner_id, rating) tuples
- `ir[item_id]` returns all users who rated that item

**Importance:**
- k-NN algorithms need to find similar users/items quickly
- Computing user/item statistics (means, counts)
- Enables efficient collaborative filtering

```python
# Get all ratings by user 0
for item_id, rating in trainset.ur[0]:
    print(f"User 0 rated item {item_id}: {rating}")

# Get all ratings for item 10
for user_id, rating in trainset.ir[10]:
    print(f"User {user_id} rated item 10: {rating}")
```
x??

---

#### Dataset vs Trainset Distinction
Dataset is a high-level container for raw rating data, while Trainset is the processed, algorithm-ready representation with inner IDs and ur/ir structures. You load data into a Dataset, then build Trainsets from it.

**Relationship flow:**
```python
# Dataset: holds raw data
data = Dataset.load_builtin('ml-100k')

# Build Trainset: processes into internal format
trainset = data.build_full_trainset()

# Dataset -> Trainset conversion does:
# 1. Assign inner IDs to all unique users/items
# 2. Build ur and ir dictionaries
# 3. Calculate statistics (global_mean, n_users, n_items)
# 4. Store rating scale
```

:p What is the difference between a Dataset and a Trainset in Surprise?
??x
**Dataset**:
- High-level container for raw rating data
- Stores data as loaded from file/DataFrame/built-in source
- Used for cross-validation and splitting
- Raw IDs are preserved

**Trainset**:
- Algorithm-ready processed representation
- Contains inner IDs, ur/ir dictionaries
- Includes statistics (global_mean, n_users, n_items)
- Built from a Dataset via `build_full_trainset()` or during CV

```python
# Dataset: raw data container
data = Dataset.load_builtin('ml-100k')

# Trainset: processed for algorithms
trainset = data.build_full_trainset()

# Now can train
algo.fit(trainset)
```
x??

---

#### Reader Class Configuration
The Reader class defines how to parse rating data from files. It specifies the field format, separator character, rating scale, and whether there's a header line. This flexibility allows loading various file formats.

**Configuration options:**
```python
from surprise import Reader

# Example 1: Tab-separated, user item rating format
reader = Reader(
    line_format='user item rating',  # Field order
    sep='\\t',                        # Tab separator
    rating_scale=(1, 5),             # Min and max ratings
    skip_lines=1                     # Skip header line
)

# Example 2: Comma-separated with timestamp
reader = Reader(
    line_format='user item rating timestamp',
    sep=',',
    rating_scale=(0.5, 5.0)  # Supports float scales
)
```

:p What does the Reader class do in Surprise, and what are its main configuration parameters?
??x
**Purpose**: Defines how to parse rating data from files

**Main parameters:**
- `line_format`: Order of fields (e.g., 'user item rating' or 'user item rating timestamp')
- `sep`: Field separator ('\\t', ',', ' ', etc.)
- `rating_scale`: Tuple of (min_rating, max_rating)
- `skip_lines`: Number of header lines to skip

```python
reader = Reader(
    line_format='user item rating',
    sep=',',
    rating_scale=(1, 5),
    skip_lines=1  # Skip CSV header
)

data = Dataset.load_from_file('ratings.csv', reader=reader)
```

Without a Reader, Surprise assumes default format (user item rating, tab-separated, scale 1-5).
x??

---

#### AlgoBase Template Method Pattern
AlgoBase uses the Template Method design pattern: it defines the skeleton of algorithm operations (fit, test, predict) while letting subclasses implement specific behaviors (estimate). This ensures all algorithms have a consistent interface.

**Pattern structure:**
```python
class AlgoBase:
    def fit(self, trainset):
        """Template method - same for all algorithms"""
        self.trainset = trainset
        # Subclass-specific training happens here
        return self

    def test(self, testset):
        """Template method - same for all algorithms"""
        predictions = []
        for (uid, iid, r_ui) in testset:
            # Calls subclass's estimate method
            est = self.estimate(
                self.trainset.to_inner_uid(uid),
                self.trainset.to_inner_iid(iid)
            )
            predictions.append(Prediction(uid, iid, r_ui, est))
        return predictions

    def estimate(self, u, i):
        """Hook method - implemented by subclasses"""
        raise NotImplementedError
```

:p How does the AlgoBase class use the Template Method pattern, and what must subclasses implement?
??x
**Template Method Pattern**: AlgoBase defines the algorithm structure, subclasses fill in specific details.

**AlgoBase provides** (same for all algorithms):
- `fit(trainset)`: Store trainset, call subclass training
- `test(testset)`: Loop through testset, call estimate, build predictions
- `predict(uid, iid)`: Convert IDs, call estimate, return Prediction

**Subclasses must implement**:
- `estimate(u, i)`: Return estimated rating for inner user u and inner item i

```python
class MyAlgorithm(AlgoBase):
    def fit(self, trainset):
        AlgoBase.fit(self, trainset)
        # Custom training logic here
        return self

    def estimate(self, u, i):
        # Custom prediction logic here
        return estimated_rating
```
x??

---

#### Global Mean and Rating Statistics
The Trainset calculates and stores important statistics: global mean (average of all ratings), number of users, number of items, and number of ratings. These are used by algorithms as baselines or initializations.

**Statistics in Trainset:**
```python
class Trainset:
    def __init__(self, ...):
        self.global_mean = sum(all_ratings) / len(all_ratings)
        self.n_users = len(unique_users)
        self.n_items = len(unique_items)
        self.n_ratings = len(all_ratings)
        self.rating_scale = (min_rating, max_rating)

# Usage in algorithms
class BaselineOnly(AlgoBase):
    def fit(self, trainset):
        AlgoBase.fit(self, trainset)
        # Use global mean as starting point
        mu = self.trainset.global_mean
        # Compute user and item biases...
```

:p What statistics does a Trainset provide, and how are they used?
??x
**Key statistics:**
- `global_mean`: Average of all ratings (μ)
- `n_users`: Number of unique users
- `n_items`: Number of unique items
- `n_ratings`: Total number of ratings
- `rating_scale`: (min, max) rating values

**Usage:**
- Baseline algorithms use global mean as starting point
- Matrix factorization initializes with global mean
- Algorithms check dimensions (n_users, n_items) for array allocation

```python
trainset = data.build_full_trainset()
print(trainset.global_mean)     # e.g., 3.52
print(trainset.n_users)         # e.g., 943
print(trainset.n_items)         # e.g., 1682
print(trainset.rating_scale)    # e.g., (1, 5)
```
x??

---

#### Testset Format and Structure
A testset is a list of tuples, each containing (raw_user_id, raw_item_id, actual_rating). Unlike a Trainset, it uses raw IDs and doesn't have the ur/ir structure. Testsets are what algorithms' `test()` method accepts.

**Format:**
```python
# Testset structure
testset = [
    ('user_A', 'item_X', 5.0),  # (uid, iid, actual_rating)
    ('user_A', 'item_Y', 3.0),
    ('user_B', 'item_X', 4.0),
    # ...
]

# Created by train_test_split or CV iterators
trainset, testset = train_test_split(data, test_size=0.25)

# Used for testing
predictions = algo.test(testset)
```

:p What is the structure of a testset in Surprise, and how is it different from a trainset?
??x
**Testset structure**: List of tuples `(uid, iid, rating)`
- Uses **raw IDs** (not inner IDs)
- Simple list, no ur/ir dictionaries
- Contains actual ratings for evaluation

**Trainset structure**: Object with:
- **Inner IDs** and mapping dictionaries
- `ur` and `ir` dictionaries for efficient lookup
- Statistics (global_mean, n_users, etc.)

```python
# Testset example
testset = [
    ('196', '302', 3.0),
    ('186', '302', 5.0),
]

# Algorithm converts raw -> inner IDs internally
predictions = algo.test(testset)
```

**Why raw IDs in testset?** User provides data with raw IDs; Surprise handles conversion internally.
x??

---

#### Cross-Validation Iterator Protocol
CV iterators in Surprise follow the protocol of having a `split(data)` method that yields (trainset, testset) pairs. This allows custom splitting strategies while maintaining compatibility with `cross_validate()`.

**Iterator protocol:**
```python
class CustomSplitter:
    def __init__(self, n_splits=5):
        self.n_splits = n_splits

    def split(self, data):
        """Yield (trainset, testset) pairs"""
        for i in range(self.n_splits):
            # Custom splitting logic here
            trainset = ...  # Trainset object
            testset = ...   # List of (uid, iid, rating)
            yield trainset, testset

    def get_n_folds(self):
        """Return number of folds"""
        return self.n_splits

# Usage with cross_validate
custom_cv = CustomSplitter(n_splits=3)
results = cross_validate(algo, data, cv=custom_cv)
```

:p What protocol must a custom cross-validation iterator implement in Surprise?
??x
**Required methods:**

1. `split(data)`: Generator that yields (trainset, testset) tuples
   - Trainset: Trainset object
   - Testset: List of (uid, iid, rating) tuples

2. `get_n_folds()`: Returns number of folds (optional but recommended)

```python
class MyCVIterator:
    def split(self, data):
        for fold in range(self.n_folds):
            trainset = self._build_trainset(...)
            testset = self._build_testset(...)
            yield trainset, testset

    def get_n_folds(self):
        return self.n_folds

# Use it
cv = MyCVIterator()
cross_validate(algo, data, cv=cv)
```
x??

---

#### Dataset Folds and Cross-Validation
When you pass an integer to `cross_validate(cv=5)`, Surprise creates a `DatasetAutoFolds` object that automatically generates folds using KFold splitting. This is a convenience wrapper around the full CV iterator protocol.

**Internal mechanism:**
```python
# When you do this:
cross_validate(algo, data, cv=5)

# Surprise does this internally:
from surprise.model_selection import KFold
kf = KFold(n_splits=5)

for trainset, testset in kf.split(data):
    algo.fit(trainset)
    predictions = algo.test(testset)
    # Compute metrics...
```

:p What happens internally when you pass an integer to the `cv` parameter in `cross_validate()`?
??x
Passing an integer `cv=n` is a shortcut for `KFold(n_splits=n)`.

**Process:**
1. Creates a `KFold(n_splits=n)` iterator
2. Calls `kf.split(data)` to generate folds
3. For each (trainset, testset) pair:
   - Trains algorithm on trainset
   - Tests on testset
   - Computes metrics

```python
# These are equivalent:
cross_validate(algo, data, cv=5)

# Explicit version:
from surprise.model_selection import KFold
kf = KFold(n_splits=5)
cross_validate(algo, data, cv=kf)
```

You can pass any CV iterator that implements the `split()` protocol.
x??

---

#### Prediction Details Dictionary
Each Prediction object has a `details` dictionary containing algorithm-specific information about how the prediction was made. This is useful for debugging and understanding algorithm behavior.

**Details examples:**
```python
# k-NN algorithm prediction
pred = knn_algo.predict('196', '302')
print(pred.details)
# Output: {
#     'actual_k': 40,           # Number of neighbors used
#     'was_impossible': False   # Whether prediction was possible
# }

# SVD algorithm prediction
pred = svd_algo.predict('196', '302')
print(pred.details)
# Output: {
#     'was_impossible': False
# }

# Baseline algorithm
pred = baseline_algo.predict('196', '302')
print(pred.details)
# Output: {
#     'was_impossible': False,
#     'reason': None
# }
```

:p What information is stored in a Prediction object's `details` dictionary?
??x
The `details` dictionary contains algorithm-specific metadata about the prediction.

**Common fields:**
- `was_impossible`: Boolean indicating if prediction was impossible
- `reason`: Why prediction was impossible (if applicable)

**Algorithm-specific fields:**
- k-NN: `actual_k` (number of neighbors used)
- Co-clustering: cluster assignments
- Others: varies by algorithm

```python
pred = algo.predict(uid, iid)

if pred.details['was_impossible']:
    print(f"Cannot predict: {pred.details.get('reason')}")
else:
    print(f"Prediction: {pred.est}")

# For k-NN:
if 'actual_k' in pred.details:
    print(f"Used {pred.details['actual_k']} neighbors")
```
x??

---

#### PredictionImpossible Exception Handling
When an algorithm cannot make a prediction (e.g., cold start: user or item not in trainset), it raises or handles `PredictionImpossible`. The default behavior is to return the global mean and set `was_impossible=True` in details.

**Handling mechanism:**
```python
class AlgoBase:
    def predict(self, uid, iid, r_ui=None):
        try:
            # Convert to inner IDs
            iuid = self.trainset.to_inner_uid(uid)
            iiid = self.trainset.to_inner_iid(iid)
        except ValueError:
            # User or item not in trainset
            est = self.default_prediction()
            details = {
                'was_impossible': True,
                'reason': 'User and/or item is unknown'
            }
            return Prediction(uid, iid, r_ui, est, details)

        # Normal prediction
        est = self.estimate(iuid, iiid)
        return Prediction(uid, iid, r_ui, est, details)
```

:p How does Surprise handle predictions for unknown users or items (cold start problem)?
??x
When a user or item doesn't exist in the trainset:

1. Algorithm tries to convert raw ID to inner ID
2. Conversion fails (raises ValueError)
3. Falls back to default prediction (usually global mean)
4. Returns Prediction with `was_impossible=True`

```python
# User '999' not in trainset
pred = algo.predict(uid='999', iid='302')

print(pred.est)  # Global mean (e.g., 3.52)
print(pred.details)
# {'was_impossible': True,
#  'reason': 'User and/or item is unknown'}
```

**Customization**: Override `default_prediction()` method to change default behavior.

```python
class MyAlgo(AlgoBase):
    def default_prediction(self):
        return 3.0  # Custom default instead of global mean
```
x??

---

#### Build Testset from Trainset
You can create a testset from a trainset's build_anti_testset() method, which generates all user-item pairs that were NOT in the training set. This is useful for making recommendations (predicting unrated items).

**Usage:**
```python
trainset = data.build_full_trainset()

# Build anti-testset: all (user, item) pairs not in trainset
anti_testset = trainset.build_anti_testset()

# Each element is (uid, iid, rating)
# where rating is the default fill-in value (usually trainset.global_mean)

# Predict on all unrated items
predictions = algo.test(anti_testset)

# Get top-N recommendations per user
from collections import defaultdict
top_n = defaultdict(list)
for uid, iid, true_r, est, _ in predictions:
    top_n[uid].append((iid, est))

# Sort and get top 10 for each user
for uid, user_ratings in top_n.items():
    user_ratings.sort(key=lambda x: x[1], reverse=True)
    top_n[uid] = user_ratings[:10]
```

:p What is an anti-testset and when would you use it?
??x
**Anti-testset**: A testset containing all (user, item) pairs that were NOT rated in the trainset.

**Creation**:
```python
trainset = data.build_full_trainset()
anti_testset = trainset.build_anti_testset()
```

**Use cases:**
- Generate recommendations for all users (predict unrated items)
- Compute predictions for items users haven't seen
- Build top-N recommendation lists

```python
# Get predictions for all unrated items
predictions = algo.test(anti_testset)

# Find top-N items for a specific user
user_preds = [p for p in predictions if p.uid == 'user_A']
user_preds.sort(key=lambda x: x.est, reverse=True)
top_10 = user_preds[:10]
```

Note: The "actual rating" in anti-testset is a fill value, not real data.
x??
