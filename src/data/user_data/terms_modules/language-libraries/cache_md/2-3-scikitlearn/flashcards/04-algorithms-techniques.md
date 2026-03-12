# Machine Learning Algorithms Flashcards

## Coordinate Descent and Lasso

---

#### Lasso Objective Function

Lasso combines least squares loss with L1 regularization.

:p What is the Lasso objective function?
??x
```
minimize: (1/2n)||y - Xw||² + α||w||₁
          ^^^^^^^^^^^^^^^^   ^^^^^^^
          loss (smooth)      L1 penalty (sparse)
```

L1 penalty creates sparse solutions (feature selection).
x??

---

#### Why Coordinate Descent for Lasso

Lasso is non-smooth but coordinate descent works well.

:p Why is coordinate descent ideal for Lasso?
??x
1. **Objective is convex** - guarantees global minimum
2. **Smooth in each coordinate** - easy to optimize one at a time
3. **L1 has closed-form solution** - soft thresholding
4. **Naturally produces sparsity**

**Location**: `sklearn/linear_model/_cd_fast.pyx:101`
x??

---

#### Soft Thresholding Operator

The proximal operator for L1 regularization.

:p What is the soft thresholding operator?
??x
```python
def soft_threshold(z, lambda_):
    if z > lambda_:
        return z - lambda_
    elif z < -lambda_:
        return z + lambda_
    else:
        return 0.0  # Sparsity!
```

**Shrinks and zeros** small coefficients.
x??

---

#### Soft Thresholding Effect

Soft thresholding creates sparse models.

:p How does soft thresholding create sparsity?
??x
Values within `[-λ, λ]` are set to **exactly zero**:

```
Input:   -5  -2  -1   0   1   2   5
Output:  -4  -1   0   0   0   1   4  (λ=1)
         ↑   ↑    ↑       ↑   ↑   ↑
       shrink  ZERO    ZERO shrink
```

Many features → zero = automatic feature selection.
x??

---

#### Coordinate Descent Algorithm

Updates one coefficient at a time.

:p What's the basic coordinate descent algorithm for Lasso?
??x
```python
for iteration in range(max_iter):
    for j in range(n_features):
        # Compute residual without feature j
        r_j = y - X @ w + X[:, j] * w[j]

        # Soft threshold
        w[j] = soft_threshold(X[:, j].T @ r_j, α)
```

Cycles through features, updating each.
x??

## K-D Trees

---

#### K-D Tree Purpose

Space partitioning for fast nearest neighbor search.

:p What is a K-D tree used for?
??x
**Efficient nearest neighbor search** in k-dimensional space.

- Binary tree with axis-aligned splits
- Each level splits on different dimension
- **Complexity**: O(log n) average case

**Location**: `sklearn/neighbors/_kd_tree.pyx.tp:44`
x??

---

#### K-D Tree Construction

Trees are built recursively.

:p How is a K-D tree constructed?
??x
1. **Select axis**: Cycle through dimensions (depth % k)
2. **Find median**: Along selected axis
3. **Split**: Points < median go left, ≥ median go right
4. **Recurse**: Build left and right subtrees

Result: Balanced binary tree.
x??

---

#### K-D Tree Search

Nearest neighbor search with pruning.

:p How does K-D tree search prune branches?
??x
**Key pruning rule:**

```python
distance_to_plane = |query[axis] - split_value|

if distance_to_plane < best_distance:
    # Must check other branch
else:
    # Prune! Other branch can't have closer point
```

Exploits axis-aligned splits to skip entire regions.
x??

---

#### K-D Tree Complexity

Performance depends on dimensionality.

:p What's the complexity of K-D tree nearest neighbor search?
??x
**Average**: O(log n)
**Worst case**: O(n)

**Fails in high dimensions** (curse of dimensionality):
- Pruning becomes ineffective
- Most volume in "corners" of space
- Degenerates to linear search
x??

## Barnes-Hut for t-SNE

---

#### Barnes-Hut Purpose

Approximates n-body forces efficiently.

:p What problem does Barnes-Hut solve for t-SNE?
??x
**Reduces complexity** from O(n²) to O(n log n).

**Naive t-SNE**: Compute all pairwise forces
**Barnes-Hut**: Group distant points, approximate their effect

**Location**: `sklearn/manifold/_barnes_hut_tsne.pyx`
x??

---

#### Barnes-Hut Key Idea

Distant groups treated as single point.

:p What's the key approximation in Barnes-Hut?
??x
**Multipole approximation:**

If group of points is **far away**, treat as **single point** at center of mass:

```python
if region_size / distance < theta:
    # Approximate: use center of mass
    force = total_mass * direction / distance²
else:
    # Exact: recurse to children
```

θ controls accuracy vs speed.
x??

---

#### Quad Tree Structure

Barnes-Hut uses spatial tree.

:p What data structure does Barnes-Hut use?
??x
**Quad tree** (2D) or **Octree** (3D):

Each node stores:
- Center of mass
- Total mass (number of points)
- Region size
- 4 children (2D) or 8 children (3D)
x??

---

#### Barnes-Hut Performance

Dramatic speedup for large datasets.

:p What speedup does Barnes-Hut provide for t-SNE?
??x
**Example: n=100,000 points**

Naive: 10 billion force calculations
Barnes-Hut: 1.6 million calculations
**Speedup: 6,000x!**

Complexity: O(n²) → O(n log n)
x??

---

#### Barnes-Hut Theta Parameter

Controls approximation quality.

:p What does the theta parameter control in Barnes-Hut?
??x
**Approximation threshold:**

- `theta=0.0`: Exact (no approximation, slow)
- `theta=0.5`: Good balance (default)
- `theta=1.0`: Crude approximation (fast, less accurate)

**Criterion**: `region_size / distance < theta`
x??

## Random Forests

---

#### Random Forest Components

Combines bagging with feature randomization.

:p What are the two key components of Random Forests?
??x
1. **Bagging**: Bootstrap aggregating (sample with replacement)
2. **Feature randomization**: Random subset of features at each split

Both reduce variance and increase diversity.
x??

---

#### Bootstrap Sampling

Sampling with replacement creates diverse datasets.

:p What percentage of unique samples are in a bootstrap sample?
??x
**~63.2%** of original samples.

Probability NOT selected: `((n-1)/n)^n → 1/e ≈ 0.368`
Probability selected: `1 - 1/e ≈ 0.632`

**~36.8% left out** = out-of-bag (OOB) samples.
x??

---

#### Feature Randomization

Random feature subsets decorrelate trees.

:p How many features are considered at each split in Random Forest?
??x
**Default:**
- Classification: `√n_features`
- Regression: `n_features / 3`

Can be controlled with `max_features` parameter:
```python
RandomForestClassifier(max_features='sqrt')  # √n
RandomForestClassifier(max_features='log2')  # log₂(n)
```
x??

---

#### Why Feature Randomization Helps

Reduces correlation between trees.

:p Why is random feature selection important for Random Forests?
??x
**Without:** All trees split on strongest feature → highly correlated

**With:** Different trees consider different features → decorrelated

**Math:**
- Ensemble variance = `ρσ² + ((1-ρ)/B)σ²`
- Lower correlation ρ → lower variance
- More variance reduction as B → ∞
x??

---

#### Out-of-Bag Error

Free validation using bootstrap samples.

:p What is out-of-bag (OOB) error estimation?
??x
**Free cross-validation!**

For each sample:
1. Find trees where it was **not** in bootstrap (OOB)
2. Predict using only those trees
3. Compare to true label

**~37% of samples are OOB** for each tree.
x??

---

#### Random Forest Prediction

Aggregates predictions from all trees.

:p How does Random Forest make predictions?
??x
**Classification**: Majority vote
```python
predictions = [tree.predict(X) for tree in trees]
final = mode(predictions)  # Most common class
```

**Regression**: Average
```python
predictions = [tree.predict(X) for tree in trees]
final = mean(predictions)
```

**Location**: `sklearn/ensemble/_forest.py`
x??

## Gradient Boosting

---

#### Gradient Boosting Key Idea

Sequential fitting to residuals = gradient descent in function space.

:p What's the core principle of gradient boosting?
??x
**Fit trees sequentially to negative gradient** of loss function:

```python
F₀ = mean(y)  # Initialize
for m in range(M):
    residuals = y - F_m  # Negative gradient for MSE
    tree_m = fit_tree(X, residuals)
    F_{m+1} = F_m + learning_rate * tree_m
```

**Location**: `sklearn/ensemble/_gb.py`
x??

---

#### Functional Gradient Descent

Gradient descent analogy.

:p How is gradient boosting related to gradient descent?
??x
**Parameter space** (normal gradient descent):
```
θ_{t+1} = θ_t - η∇L(θ)
```

**Function space** (gradient boosting):
```
F_{t+1}(x) = F_t(x) - η∇L(F)
           = F_t(x) + η * tree_t(x)
```

Tree fits negative gradient!
x??

---

#### Gradient for MSE Loss

For squared error, gradient = residual.

:p What's the negative gradient of MSE loss?
??x
**MSE Loss**: `L = (y - F)²`

**Gradient**: `∂L/∂F = -2(y - F)`

**Negative gradient**: `2(y - F) = 2 * residual`

**Result**: Fitting residuals = gradient descent!
x??

---

#### Why Shallow Trees

Gradient boosting uses weak learners.

:p Why does gradient boosting use shallow trees?
??x
**Shallow trees** (depth 3-8):
- High bias, low variance
- Fast to fit
- Prevent overfitting

**Sequential fitting** reduces bias:
- Each tree corrects previous errors
- Many weak learners → strong learner
x??

---

#### Learning Rate in Boosting

Shrinkage prevents overfitting.

:p What does the learning rate control in gradient boosting?
??x
**Shrinkage parameter** (0 < η < 1):

```python
F_{m+1} = F_m + η * tree_m
```

**Small η** (e.g., 0.01):
- Requires more trees
- Better generalization
- Slower training

**Large η** (e.g., 0.3):
- Fewer trees needed
- Faster training
- More prone to overfitting
x??

---

#### Boosting vs Bagging

Different approaches to ensemble learning.

:p What's the key difference between boosting and bagging?
??x
**Bagging** (Random Forest):
- Parallel training
- Reduces **variance**
- Trees are independent

**Boosting** (Gradient Boosting):
- Sequential training
- Reduces **bias**
- Each tree depends on previous

Boosting typically more accurate but harder to parallelize.
x??
