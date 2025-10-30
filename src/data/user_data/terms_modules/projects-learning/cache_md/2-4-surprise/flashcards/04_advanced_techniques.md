# Surprise Library - Advanced Techniques and Optimizations Flashcards

## Design Patterns, Performance, and Implementation Details

---

#### Cython for Performance-Critical Code
Cython compiles Python-like code to C, providing near-C performance while maintaining Python syntax. Surprise uses Cython for compute-intensive algorithms like SVD, similarity computations, and baseline optimization.

**Python vs Cython comparison:**
```python
# Pure Python (slow)
def compute_similarity(ratings1, ratings2):
    total = 0.0
    for i in range(len(ratings1)):
        total += ratings1[i] * ratings2[i]
    return total

# Cython (.pyx file) - much faster
cimport numpy as np
import numpy as np

def compute_similarity(np.ndarray[np.double_t, ndim=1] ratings1,
                      np.ndarray[np.double_t, ndim=1] ratings2):
    cdef double total = 0.0
    cdef int i
    cdef int n = ratings1.shape[0]

    for i in range(n):
        total += ratings1[i] * ratings2[i]

    return total
```

**Why Cython?**
- Type declarations enable C-level performance
- Direct access to NumPy C API
- No Python object overhead in tight loops

:p Why does Surprise use Cython for certain modules, and what performance benefits does it provide?
??x
**Purpose**: Cython compiles Python code to C for significant speedups in compute-intensive operations.

**Performance benefits:**
- 10-100x faster loops (with type declarations)
- Direct memory access (no Python overhead)
- Compile-time optimization

**Where Surprise uses Cython:**
- `matrix_factorization.pyx`: SVD, SVD++, NMF
- `similarities.pyx`: Pearson, cosine, MSD computations
- `optimize_baselines.pyx`: ALS for baseline estimates
- `slope_one.pyx`, `co_clustering.pyx`: Algorithm implementations

**Key technique:**
```cython
# Type declarations for speed
cdef double total = 0.0  # C double, not Python float
cdef int i               # C int, not Python int

# Fast loops without Python interpreter
for i in range(n):
    total += array[i]  # Direct memory access
```

**Result**: Training 100k ratings in seconds instead of minutes.
x??

---

#### Strategy Pattern for Similarity Measures
Surprise uses the Strategy pattern for similarity measures: different similarity algorithms (Pearson, cosine, MSD) are interchangeable without changing k-NN algorithm code. The similarity function is passed as configuration.

**Pattern implementation:**
```python
# k-NN algorithm doesn't know which similarity it uses
class KNNBasic(AlgoBase):
    def __init__(self, sim_options={}):
        self.sim_options = sim_options

    def fit(self, trainset):
        AlgoBase.fit(self, trainset)

        # Strategy: get similarity function based on options
        sim_name = self.sim_options.get('name', 'msd')

        if sim_name == 'pearson':
            self.sim = compute_pearson
        elif sim_name == 'cosine':
            self.sim = compute_cosine
        elif sim_name == 'msd':
            self.sim = compute_msd

        # Compute similarities using selected strategy
        self.similarities = self.compute_similarities(self.sim)

# Usage - swap strategies easily
algo1 = KNNBasic(sim_options={'name': 'pearson'})
algo2 = KNNBasic(sim_options={'name': 'cosine'})
algo3 = KNNBasic(sim_options={'name': 'msd'})
```

:p How does Surprise implement the Strategy pattern for similarity measures?
??x
**Strategy Pattern**: Encapsulate interchangeable algorithms (similarity measures) that can be swapped at runtime.

**Implementation:**
1. k-NN algorithms accept `sim_options` dictionary
2. Based on `name`, select appropriate similarity function
3. All similarities have same interface: `sim(u, v) -> float`

```python
# Configure which similarity to use
sim_options = {
    'name': 'pearson',  # or 'cosine', 'msd', 'pearson_baseline'
    'user_based': True,
    'shrinkage': 100
}

algo = KNNBasic(sim_options=sim_options)
```

**Benefits:**
- Add new similarities without changing k-NN code
- Easy to experiment with different similarities
- Configuration-driven behavior

**Available strategies:** pearson, cosine, msd, pearson_baseline
x??

---

#### Joblib Parallel Processing
Surprise uses joblib for parallel cross-validation. Each fold is trained and tested independently, making it embarrassingly parallel. The `n_jobs` parameter controls parallelism level.

**Parallel CV implementation concept:**
```python
from joblib import Parallel, delayed

def cross_validate_parallel(algo, data, cv, measures, n_jobs):
    # Generate all folds
    folds = list(cv.split(data))

    # Define work for one fold
    def process_fold(trainset, testset):
        # Clone algorithm for this fold
        algo_clone = clone(algo)

        # Train and test
        algo_clone.fit(trainset)
        predictions = algo_clone.test(testset)

        # Compute metrics
        metrics = {}
        for measure in measures:
            metrics[measure] = compute_metric(measure, predictions)

        return metrics

    # Parallel execution across folds
    results = Parallel(n_jobs=n_jobs)(
        delayed(process_fold)(trainset, testset)
        for trainset, testset in folds
    )

    return aggregate_results(results)
```

**n_jobs values:**
- `n_jobs=1`: Sequential (default, no parallelism)
- `n_jobs=2`: 2 parallel processes
- `n_jobs=-1`: Use all CPU cores

:p How does Surprise implement parallel cross-validation, and what controls the parallelism?
??x
**Mechanism**: Uses joblib to run CV folds in parallel processes.

**Key insight**: Each fold is independent:
- Fold 1: train on folds 2-5, test on fold 1
- Fold 2: train on folds 1,3-5, test on fold 2
- etc.

No dependencies → perfect for parallelization

**Control:**
```python
results = cross_validate(
    algo, data,
    cv=5,
    n_jobs=-1  # -1 = all cores
)
```

**Process:**
1. Split data into folds
2. For each fold (in parallel):
   - Clone algorithm
   - Train on trainset
   - Test on testset
   - Compute metrics
3. Aggregate results

**Speedup**: Near-linear with cores (5-fold CV with 5 cores ≈ 5x faster)
x??

---

#### Memory-Efficient ur and ir Construction
Trainset builds ur (user ratings) and ir (item ratings) dictionaries efficiently by iterating through raw data once and using defaultdict to avoid key checks.

**Efficient construction:**
```python
from collections import defaultdict

def build_ur_ir(raw_ratings):
    """Build user and item rating dictionaries efficiently"""
    # defaultdict avoids "if key in dict" checks
    ur = defaultdict(list)  # user -> [(item, rating)]
    ir = defaultdict(list)  # item -> [(user, rating)]

    # Single pass through data
    for raw_uid, raw_iid, rating in raw_ratings:
        # Convert to inner IDs (happens during build)
        uid = raw_to_inner_uid[raw_uid]
        iid = raw_to_inner_iid[raw_iid]

        # Append to both dictionaries
        ur[uid].append((iid, rating))
        ir[iid].append((uid, rating))

    # Convert defaultdict to regular dict (optional)
    return dict(ur), dict(ir)
```

**Why efficient:**
- O(n) time complexity (single pass)
- O(n) space (store each rating twice)
- No repeated lookups or resizing

:p How does Surprise efficiently build the ur and ir dictionaries in a Trainset?
??x
**Method**: Single pass through ratings using defaultdict

**Algorithm:**
```python
from collections import defaultdict

ur = defaultdict(list)  # user -> ratings
ir = defaultdict(list)  # item -> ratings

for (user, item, rating) in raw_data:
    ur[user].append((item, rating))
    ir[item].append((user, rating))
```

**Efficiency:**
- **Time**: O(n) - one pass through n ratings
- **Space**: O(n) - each rating stored twice
- **No overhead**: defaultdict avoids key existence checks

**Alternative (slow):**
```python
# Bad: checking keys repeatedly
ur = {}
for (user, item, rating) in raw_data:
    if user not in ur:  # Repeated lookups!
        ur[user] = []
    ur[user].append((item, rating))
```

defaultdict is faster and cleaner.
x??

---

#### Lazy Similarity Matrix Computation
k-NN algorithms compute similarity matrices lazily during fit(), storing results for reuse during prediction. User-based and item-based variants differ in which similarities they compute.

**Lazy computation pattern:**
```python
class KNNBasic:
    def fit(self, trainset):
        self.trainset = trainset
        self.sim_matrix = None  # Not computed yet

        # Determine what to compute
        if self.sim_options['user_based']:
            self.n_x = trainset.n_users
            self.xr = trainset.ur  # user ratings
        else:
            self.n_x = trainset.n_items
            self.xr = trainset.ir  # item ratings

        # Compute similarity matrix (expensive!)
        self.sim_matrix = np.zeros((self.n_x, self.n_x))

        for x in range(self.n_x):
            for y in range(x + 1, self.n_x):
                # Compute once, store in both positions
                sim = self.compute_similarity(x, y)
                self.sim_matrix[x, y] = sim
                self.sim_matrix[y, x] = sim  # Symmetric

    def estimate(self, u, i):
        # Reuse precomputed similarities
        if self.sim_options['user_based']:
            neighbors = self.sim_matrix[u]  # All user similarities
        else:
            neighbors = self.sim_matrix[i]  # All item similarities
        # ... use neighbors for prediction
```

:p Why does k-NN precompute similarity matrices during fit(), and how does this affect memory?
??x
**Reason**: Computing similarities on-demand during prediction is too slow.

**Tradeoff:**
- **Time**: Compute once during fit() → fast predictions
- **Space**: Store n×n matrix (large for many users/items)

**Example:**
```python
# 1000 users, 1000 items

User-based k-NN:
- Fit: Compute 1000×1000 user similarities (slow once)
- Predict: Look up precomputed similarities (fast)
- Memory: 1M floats ≈ 8MB

Item-based k-NN:
- Fit: Compute 1000×1000 item similarities
- Predict: Look up precomputed similarities
- Memory: 8MB
```

**Why symmetric storage?**
```python
sim[u1, u2] = sim[u2, u1]
# Could store only upper triangle, but full matrix
# makes lookup faster (no conditional logic)
```

For very large datasets, this becomes a bottleneck.
x??

---

#### GridSearchCV Exhaustive Search
GridSearchCV tries every combination of parameters, trains and evaluates using CV. For 3 parameters with 3 values each, that's 3³ = 27 combinations × k folds = 27k training runs.

**Search space explosion:**
```python
param_grid = {
    'n_factors': [50, 100, 150],        # 3 options
    'n_epochs': [10, 20, 30],           # 3 options
    'lr_all': [0.002, 0.005, 0.01],    # 3 options
}

# Total combinations: 3 × 3 × 3 = 27
# With cv=5: 27 × 5 = 135 training runs!

gs = GridSearchCV(SVD, param_grid, measures=['rmse'], cv=5)
```

**Execution logic:**
```python
def grid_search_cv(algo_class, param_grid, data, cv, measures):
    results = []

    # Generate all combinations
    for params in generate_combinations(param_grid):
        # Create algorithm with these params
        algo = algo_class(**params)

        # Cross-validate
        cv_results = cross_validate(algo, data, cv=cv, measures=measures)

        # Store results
        results.append({
            'params': params,
            'mean_rmse': mean(cv_results['test_rmse']),
            'std_rmse': std(cv_results['test_rmse']),
        })

    # Find best
    best = min(results, key=lambda x: x['mean_rmse'])
    return best
```

:p How does GridSearchCV work in Surprise, and what is the computational cost?
??x
**Method**: Exhaustive search over all parameter combinations.

**Process:**
1. Generate all combinations from parameter grid
2. For each combination:
   - Run k-fold cross-validation
   - Compute average metric
3. Return best parameters

**Computational cost:**
$$\\text{Total training runs} = \\prod_{p \\in params} |values_p| \\times k_{folds}$$

**Example:**
```python
param_grid = {
    'n_factors': [50, 100, 150],     # 3
    'n_epochs': [10, 20],             # 2
    'lr_all': [0.002, 0.005]         # 2
}
cv = 5

Total runs = 3 × 2 × 2 × 5 = 60 training runs
```

**Speedup**: Can parallelize (but still expensive for large grids)
x??

---

#### RandomizedSearchCV Sampling
RandomizedSearchCV samples parameter combinations randomly instead of trying all. With distributions for continuous parameters, it can explore spaces impossible for GridSearchCV.

**Sampling approach:**
```python
from scipy.stats import uniform, randint

param_distributions = {
    'n_factors': randint(20, 200),          # Random int from 20-200
    'n_epochs': randint(5, 50),             # Random int from 5-50
    'lr_all': uniform(0.001, 0.01),        # Random float from 0.001-0.011
    'reg_all': uniform(0.01, 0.1),         # Random float from 0.01-0.11
}

# Sample 20 random combinations
rs = RandomizedSearchCV(
    SVD,
    param_distributions,
    n_iter=20,    # Number of samples
    cv=5
)
```

**Sampling logic:**
```python
def randomized_search(algo_class, param_distributions, n_iter, cv):
    results = []

    for i in range(n_iter):
        # Sample one parameter combination
        params = {}
        for param_name, distribution in param_distributions.items():
            params[param_name] = distribution.rvs()  # Random sample

        # Evaluate this combination
        algo = algo_class(**params)
        cv_results = cross_validate(algo, data, cv=cv)
        results.append((params, cv_results))

    return best_from(results)
```

:p What is RandomizedSearchCV and when is it better than GridSearchCV?
??x
**RandomizedSearchCV**: Samples random parameter combinations instead of trying all.

**Advantages:**
1. **Faster**: Control cost with n_iter (e.g., 20 samples vs 1000 combinations)
2. **Continuous parameters**: Can sample from distributions
3. **Better exploration**: For large spaces, random sampling often finds good solutions faster

**Example:**
```python
from scipy.stats import uniform

param_dist = {
    'lr_all': uniform(0.001, 0.02),  # Any float in range
    'n_factors': randint(50, 200),   # Any int in range
}

rs = RandomizedSearchCV(SVD, param_dist, n_iter=20, cv=5)
# Only 20 × 5 = 100 runs (vs 150 × 20 = 3000 for grid!)
```

**When to use:** Large parameter spaces, continuous parameters, limited time budget.
x??

---

#### Algorithm Cloning for CV
During cross-validation, each fold needs a fresh algorithm instance. Surprise clones algorithms to ensure folds are independent and don't interfere with each other.

**Cloning implementation:**
```python
import copy

def cross_validate(algo, data, cv):
    results = []

    for trainset, testset in cv.split(data):
        # Clone algorithm to avoid state pollution
        algo_clone = copy.deepcopy(algo)

        # Train on this fold
        algo_clone.fit(trainset)

        # Test on this fold
        predictions = algo_clone.test(testset)

        # Compute metrics
        rmse = compute_rmse(predictions)
        results.append(rmse)

    return results
```

**Why cloning matters:**
```python
# Without cloning (WRONG):
algo = SVD()
for fold in folds:
    algo.fit(trainset)  # Overwrites previous training!
    # Predictions contaminated by previous fold

# With cloning (CORRECT):
algo = SVD()
for fold in folds:
    algo_clone = copy.deepcopy(algo)
    algo_clone.fit(trainset)  # Independent training
```

:p Why does Surprise clone algorithms during cross-validation?
??x
**Reason**: Ensure each fold uses an independent, fresh algorithm instance.

**Problem without cloning:**
```python
algo = SVD()

# Fold 1
algo.fit(trainset1)  # Sets algo.pu, algo.qi

# Fold 2
algo.fit(trainset2)  # Overwrites algo.pu, algo.qi
                     # Previous state lost!
```

**Solution:**
```python
import copy

for fold in cv_folds:
    algo_clone = copy.deepcopy(algo)  # Fresh copy
    algo_clone.fit(trainset)          # Independent
```

**What gets cloned:**
- Algorithm parameters (n_factors, lr_all, etc.)
- Initial configuration
- NOT trained state (trainset, factors, etc.)

**Result**: Each fold starts from same initial configuration but trains independently.
x??

---

#### Optimizing Baseline Computation with ALS
Computing optimal baselines uses Alternating Least Squares: fix item biases, optimize user biases; fix user biases, optimize item biases; repeat until convergence. This is faster than gradient descent.

**ALS iteration:**
```python
def optimize_baselines_als(trainset, n_iterations, reg):
    mu = trainset.global_mean
    bu = np.zeros(trainset.n_users)
    bi = np.zeros(trainset.n_items)

    for iteration in range(n_iterations):
        # Step 1: Update user biases (fix item biases)
        for u in range(trainset.n_users):
            numerator = 0
            for (i, rating) in trainset.ur[u]:
                numerator += (rating - mu - bi[i])

            denominator = reg + len(trainset.ur[u])
            bu[u] = numerator / denominator

        # Step 2: Update item biases (fix user biases)
        for i in range(trainset.n_items):
            numerator = 0
            for (u, rating) in trainset.ir[i]:
                numerator += (rating - mu - bu[u])

            denominator = reg + len(trainset.ir[i])
            bi[i] = numerator / denominator

    return bu, bi
```

**Convergence:**
- Typically 5-10 iterations sufficient
- Much faster than SGD for baselines

:p How does ALS (Alternating Least Squares) optimize baseline estimates?
??x
**ALS**: Alternate between optimizing user biases and item biases.

**Algorithm:**
```
Initialize: bu = 0, bi = 0

Repeat until convergence:
  1. Fix bi, optimize all bu
     bu[u] = Σ(r_ui - μ - bi) / (λ + |ratings_u|)

  2. Fix bu, optimize all bi
     bi[i] = Σ(r_ui - μ - bu) / (λ + |ratings_i|)
```

**Why alternating?**
- Subproblem (fixing one, optimizing other) has closed-form solution
- No learning rate needed
- Fast convergence (5-10 iterations)

**Example (1 iteration):**
```
μ = 3.5, λ = 10
User 1 rated [A:5, B:4] (2 ratings)
bi = [0.3, 0.2]

Step 1: bu[1] = ((5-3.5-0.3) + (4-3.5-0.2)) / (10+2)
              = (1.2 + 0.3) / 12 = 0.125
```

Implemented in Cython for speed: `optimize_baselines.pyx`
x??

---

#### Handling Cold Start with Default Predictions
When predicting for unknown users/items, algorithms return a default prediction. The default is usually global mean, but can be customized by overriding `default_prediction()`.

**Default prediction logic:**
```python
class AlgoBase:
    def predict(self, uid, iid, r_ui=None):
        # Try to make normal prediction
        try:
            iuid = self.trainset.to_inner_uid(uid)
            iiid = self.trainset.to_inner_iid(iid)

            # Normal prediction
            est = self.estimate(iuid, iiid)
            details = {'was_impossible': False}

        except ValueError:
            # User or item unknown - use default
            est = self.default_prediction()
            details = {
                'was_impossible': True,
                'reason': 'User and/or item is unknown'
            }

        return Prediction(uid, iid, r_ui, est, details)

    def default_prediction(self):
        """Override this to customize cold start behavior"""
        return self.trainset.global_mean
```

**Custom default:**
```python
class ConservativeSVD(SVD):
    def default_prediction(self):
        # For unknown items, predict conservatively
        return self.trainset.global_mean - 0.5
```

:p How does Surprise handle cold start predictions, and how can you customize the default?
??x
**Cold start**: User or item not in training data → cannot make informed prediction.

**Default behavior**: Return global mean with `was_impossible=True`

**Customization**: Override `default_prediction()` method

```python
class CustomAlgo(AlgoBase):
    def default_prediction(self):
        # Option 1: Conservative estimate
        return self.trainset.rating_scale[0]  # Min rating

        # Option 2: Optimistic estimate
        return self.trainset.rating_scale[1]  # Max rating

        # Option 3: Median (need to compute)
        return 3.0

        # Option 4: Random within scale
        return np.random.uniform(*self.trainset.rating_scale)
```

**Usage:**
```python
pred = algo.predict('unknown_user', 'item_123')
if pred.details['was_impossible']:
    print(f"Cold start: using default {pred.est}")
```

Some algorithms (like SVD++) handle cold start better by using item averages.
x??

---

#### NumPy Array Backing for Factors
Matrix factorization algorithms store user and item factors in NumPy arrays for efficient linear algebra operations. Cython can access these arrays directly via the NumPy C API.

**Array-based storage:**
```python
class SVD(AlgoBase):
    def fit(self, trainset):
        # Allocate factor matrices as NumPy arrays
        self.pu = np.random.normal(
            0, 0.1,
            size=(trainset.n_users, self.n_factors)
        )
        self.qi = np.random.normal(
            0, 0.1,
            size=(trainset.n_items, self.n_factors)
        )

        # Bias arrays
        self.bu = np.zeros(trainset.n_users)
        self.bi = np.zeros(trainset.n_items)

    def estimate(self, u, i):
        # Fast dot product via NumPy
        est = self.trainset.global_mean
        est += self.bu[u]
        est += self.bi[i]
        est += np.dot(self.pu[u], self.qi[i])  # Vector dot product
        return est
```

**Cython access (even faster):**
```cython
cdef double estimate(self, int u, int i):
    cdef double est = self.global_mean
    cdef double[:, :] pu = self.pu  # Typed memoryview
    cdef double[:, :] qi = self.qi
    cdef int f

    est += self.bu[u] + self.bi[i]

    # Manual dot product (C-level loop)
    for f in range(self.n_factors):
        est += pu[u, f] * qi[i, f]

    return est
```

:p Why does Surprise use NumPy arrays for storing algorithm parameters, especially in Cython code?
??x
**Reasons:**
1. **Efficient storage**: Contiguous memory, cache-friendly
2. **Fast operations**: Vectorized math, BLAS/LAPACK
3. **Cython integration**: Direct C-level access via memoryviews

**Example:**
```python
# Factor matrices for 1000 users, 100 factors
pu = np.random.normal(0, 0.1, (1000, 100))  # 1000×100 array

# Fast operations
user_vector = pu[42]  # O(1) access
dot_product = np.dot(pu[42], qi[99])  # Optimized C code
```

**Cython benefit:**
```cython
# Typed memoryview: direct memory access
cdef double[:, :] pu = self.pu

# C-level loop (no Python overhead)
for u in range(n_users):
    for f in range(n_factors):
        pu[u, f] += update  # Direct memory write
```

**vs Python lists:** 100-1000x faster for numeric operations
x??

---

#### Prediction Clamping to Rating Scale
After computing a prediction, algorithms clamp it to the valid rating scale. If the scale is [1, 5] and prediction is 5.7, return 5. This ensures predictions are always valid.

**Clamping logic:**
```python
class AlgoBase:
    def predict(self, uid, iid, r_ui=None):
        # ... get estimate ...
        est = self.estimate(iuid, iiid)

        # Clamp to rating scale
        lower_bound, upper_bound = self.trainset.rating_scale
        est = max(lower_bound, est)  # Not below minimum
        est = min(upper_bound, est)  # Not above maximum

        return Prediction(uid, iid, r_ui, est, details)
```

**Example:**
```python
# Rating scale: (1, 5)
trainset.rating_scale = (1, 5)

# SVD predicts 5.7 (too high)
raw_prediction = 5.7
clamped = min(5, max(1, 5.7)) = min(5, 5.7) = 5.0

# SVD predicts 0.3 (too low)
raw_prediction = 0.3
clamped = min(5, max(1, 0.3)) = min(5, 1.0) = 1.0

# SVD predicts 3.2 (valid)
raw_prediction = 3.2
clamped = min(5, max(1, 3.2)) = 3.2
```

:p Why and how does Surprise clamp predictions to the rating scale?
??x
**Why clamp?** Algorithms can predict outside valid range (e.g., SVD predicts 5.8 when scale is 1-5).

**How:**
```python
lower, upper = trainset.rating_scale
clamped = max(lower, min(upper, prediction))
```

**Example:**
```
Scale: [1, 5]

Prediction: 5.7 → Clamped: 5.0 (max out)
Prediction: 0.3 → Clamped: 1.0 (min out)
Prediction: 3.2 → Clamped: 3.2 (unchanged)
```

**Why it happens:**
- Matrix factorization: dot products can be arbitrarily large
- k-NN with extrapolation: weighted averages can exceed bounds
- Baseline estimates: biases can be large

**Alternative**: Some systems use sigmoid/tanh to naturally bound predictions, but Surprise uses simple clamping for speed.
x??

---

#### User-Based vs Item-Based k-NN
k-NN can be user-based (find similar users) or item-based (find similar items). Item-based often performs better because items are more stable than users, and similarity matrix is usually smaller.

**User-based prediction:**
```python
def estimate_user_based(target_user, target_item):
    # Find k users most similar to target_user who rated target_item
    neighbors = []
    for other_user in users_who_rated(target_item):
        sim = similarity(target_user, other_user)
        rating = get_rating(other_user, target_item)
        neighbors.append((sim, rating))

    # Weighted average
    return weighted_average(neighbors, k=40)
```

**Item-based prediction:**
```python
def estimate_item_based(target_user, target_item):
    # Find k items most similar to target_item rated by target_user
    neighbors = []
    for other_item in items_rated_by(target_user):
        sim = similarity(target_item, other_item)
        rating = get_rating(target_user, other_item)
        neighbors.append((sim, rating))

    # Weighted average
    return weighted_average(neighbors, k=40)
```

**Comparison:**
- User-based: "Users like you rated this item..."
- Item-based: "Items like this one you rated..."

:p What is the difference between user-based and item-based k-NN collaborative filtering?
??x
**User-based**: Find similar users, use their ratings

```python
"Users similar to you rated this item 4.5 stars"

# To predict Alice's rating for Movie X:
# 1. Find users similar to Alice
# 2. See how they rated Movie X
# 3. Average their ratings (weighted by similarity)
```

**Item-based**: Find similar items, use user's ratings of them

```python
"You rated similar items 4.5 stars on average"

# To predict Alice's rating for Movie X:
# 1. Find movies similar to Movie X
# 2. See how Alice rated those movies
# 3. Average those ratings (weighted by similarity)
```

**Configuration:**
```python
sim_options = {'user_based': True}   # User-based
sim_options = {'user_based': False}  # Item-based
```

**When item-based is better:**
- More users than items (similarity matrix smaller)
- Items more stable than users (preferences change)
- Easier to explain ("You liked X, you'll like Y")
x??

---

#### Min-k for k-NN Predictions
k-NN can require minimum number of neighbors to make a prediction. If fewer than min_k neighbors exist, return impossible prediction or default. This prevents predictions based on insufficient data.

**Min-k logic:**
```python
class KNNBasic:
    def __init__(self, k=40, min_k=1, ...):
        self.k = k          # Max neighbors to use
        self.min_k = min_k  # Minimum required neighbors

    def estimate(self, u, i):
        # Get neighbors (sorted by similarity)
        neighbors = self.get_neighbors(u, i, k=self.k)

        # Check if we have enough
        if len(neighbors) < self.min_k:
            # Not enough neighbors - cannot predict
            raise PredictionImpossible('Not enough neighbors')

        # Proceed with prediction
        return self.weighted_average(neighbors)
```

**Example:**
```python
# Require at least 5 neighbors
algo = KNNBasic(k=40, min_k=5)

# User rated only 2 similar items
# len(neighbors) = 2 < min_k = 5
# → PredictionImpossible
# → Default to global mean
```

:p What is the min_k parameter in k-NN algorithms and why is it useful?
??x
**min_k**: Minimum number of neighbors required to make a prediction.

**Purpose**: Prevent low-confidence predictions based on too few neighbors.

**Usage:**
```python
algo = KNNBasic(
    k=40,      # Use up to 40 neighbors
    min_k=5    # Require at least 5
)
```

**Behavior:**
```
User has 2 similar neighbors:
- len(neighbors) = 2 < min_k = 5
- Prediction marked as impossible
- Returns default (global mean)

User has 10 similar neighbors:
- len(neighbors) = 10 >= min_k = 5
- Use top 10 neighbors (or k=40, whichever is smaller)
- Make confident prediction
```

**Trade-off:**
- Higher min_k: More reliable predictions, but more cold start
- Lower min_k: Fewer cold starts, but less reliable

Default is usually `min_k=1` (use even 1 neighbor if that's all you have).
x??
