# Surprise Library - Algorithms and Mathematics Flashcards

## Mathematical Foundations and Algorithm Mechanics

---

#### Baseline Estimate Formula
Baseline estimates capture user and item biases independent of interaction. The formula predicts a rating as the global mean plus user deviation plus item deviation. This serves as a strong baseline for collaborative filtering.

**Mathematical formula:**
$$\\hat{r}_{ui} = \\mu + b_u + b_i$$

Where:
- $\\mu$ = global mean of all ratings
- $b_u$ = user bias (how much user u rates above/below average)
- $b_i$ = item bias (how much item i is rated above/below average)

**Example calculation:**
```
Global mean (μ) = 3.5
User A typically rates 0.3 above average: b_u = 0.3
Movie X typically rated 0.5 above average: b_i = 0.5

Prediction = 3.5 + 0.3 + 0.5 = 4.3
```

:p What is the formula for baseline estimates in recommender systems, and what does each component represent?
??x
**Formula:** $\\hat{r}_{ui} = \\mu + b_u + b_i$

**Components:**
- $\\mu$ (mu): Global mean of all ratings
- $b_u$: User bias (user's tendency to rate high/low)
- $b_i$: Item bias (item's tendency to be rated high/low)

**Example:**
```
μ = 3.5 (average rating)
b_u = -0.2 (user rates 0.2 below average)
b_i = 0.7 (item rated 0.7 above average)

Prediction = 3.5 + (-0.2) + 0.7 = 4.0
```

This captures systematic tendencies without considering user-item interactions.
x??

---

#### Computing User and Item Biases
User and item biases are computed by minimizing squared error with regularization. Surprise uses ALS (Alternating Least Squares) or SGD (Stochastic Gradient Descent) to optimize biases, balancing fit to data and complexity.

**Optimization objective:**
$$\\min_{b_u, b_i} \\sum_{r_{ui} \\in R} (r_{ui} - (\\mu + b_u + b_i))^2 + \\lambda(b_u^2 + b_i^2)$$

**Closed-form solution (ALS):**
```python
# Update user bias (fixing item biases)
for user u:
    numerator = sum(r_ui - μ - b_i for all items i rated by u)
    denominator = λ + number_of_ratings_by_u
    b_u = numerator / denominator

# Update item bias (fixing user biases)
for item i:
    numerator = sum(r_ui - μ - b_u for all users u who rated i)
    denominator = λ + number_of_ratings_for_i
    b_i = numerator / denominator
```

:p How are user and item biases computed in baseline algorithms?
??x
**Objective**: Minimize squared error with regularization

**Formula for user bias:**
$$b_u = \\frac{\\sum_{i \\in I_u} (r_{ui} - \\mu - b_i)}{\\lambda + |I_u|}$$

where $I_u$ is items rated by user u, λ is regularization

**Formula for item bias:**
$$b_i = \\frac{\\sum_{u \\in U_i} (r_{ui} - \\mu - b_u)}{\\lambda + |U_i|}$$

where $U_i$ is users who rated item i

**Process:**
1. Initialize all biases to 0
2. Alternate: update all user biases, then all item biases
3. Repeat until convergence

Regularization (λ) prevents overfitting to users/items with few ratings.
x??

---

#### k-NN Collaborative Filtering Logic
k-NN predicts a rating by finding k most similar users (or items) and averaging their ratings, weighted by similarity. The key is the similarity measure (cosine, Pearson, MSD) that determines which neighbors are relevant.

**User-based k-NN formula:**
$$\\hat{r}_{ui} = \\frac{\\sum_{v \\in N_i^k(u)} sim(u, v) \\cdot r_{vi}}{\\sum_{v \\in N_i^k(u)} |sim(u, v)|}$$

Where:
- $N_i^k(u)$ = k users most similar to u who rated item i
- $sim(u, v)$ = similarity between users u and v
- $r_{vi}$ = rating by user v for item i

**Pseudocode:**
```python
def estimate_knn(user, item, k=40):
    # Find all users who rated this item
    neighbors = []
    for other_user in users_who_rated(item):
        if other_user != user:
            sim = similarity(user, other_user)
            rating = get_rating(other_user, item)
            neighbors.append((sim, rating))

    # Sort by similarity, take top k
    neighbors.sort(reverse=True, key=lambda x: x[0])
    top_k = neighbors[:k]

    # Weighted average
    numerator = sum(sim * rating for sim, rating in top_k)
    denominator = sum(abs(sim) for sim, rating in top_k)

    return numerator / denominator if denominator != 0 else global_mean
```

:p How does k-NN collaborative filtering predict ratings, and what is the mathematical formula?
??x
**Concept**: Predict based on k most similar users/items

**Formula (user-based):**
$$\\hat{r}_{ui} = \\frac{\\sum_{v \\in N^k(u)} sim(u,v) \\cdot r_{vi}}{\\sum_{v \\in N^k(u)} |sim(u,v)|}$$

**Steps:**
1. Find all users who rated the target item
2. Compute similarity between target user and each of them
3. Select k most similar users
4. Predict = weighted average of their ratings

```python
# Similarities: [(0.9, user_A), (0.7, user_B), (0.5, user_C)]
# Their ratings: [5, 4, 3]
# k = 2 (take top 2)

prediction = (0.9*5 + 0.7*4) / (0.9 + 0.7)
           = (4.5 + 2.8) / 1.6
           = 4.56
```

Item-based k-NN is similar but uses item similarities.
x??

---

#### Pearson Correlation Similarity
Pearson correlation measures linear relationship between two users' ratings, accounting for different rating scales. It ranges from -1 (opposite) to +1 (identical), with 0 meaning no correlation.

**Formula:**
$$sim(u, v) = \\frac{\\sum_{i \\in I_{uv}} (r_{ui} - \\bar{r}_u)(r_{vi} - \\bar{r}_v)}{\\sqrt{\\sum_{i \\in I_{uv}} (r_{ui} - \\bar{r}_u)^2} \\sqrt{\\sum_{i \\in I_{uv}} (r_{vi} - \\bar{r}_v)^2}}$$

Where:
- $I_{uv}$ = items rated by both users u and v
- $\\bar{r}_u$ = mean rating of user u
- $\\bar{r}_v$ = mean rating of user v

**Example:**
```
User A ratings: [5, 4, 3] (mean = 4.0)
User B ratings: [4, 3, 2] (mean = 3.0)

Deviations A: [1, 0, -1]
Deviations B: [1, 0, -1]

Numerator: (1*1) + (0*0) + (-1*-1) = 2
Denominator: sqrt(1²+0²+1²) * sqrt(1²+0²+1²) = sqrt(2) * sqrt(2) = 2

Pearson = 2 / 2 = 1.0 (perfect correlation)
```

:p What is Pearson correlation similarity and how is it calculated for two users?
??x
**Definition**: Measures linear correlation between two users' rating patterns, centered around their means.

**Formula:**
$$pearson(u,v) = \\frac{\\sum (r_{ui} - \\bar{r}_u)(r_{vi} - \\bar{r}_v)}{\\sqrt{\\sum (r_{ui} - \\bar{r}_u)^2} \\sqrt{\\sum (r_{vi} - \\bar{r}_v)^2}}$$

**Properties:**
- Range: [-1, 1]
- 1 = perfect positive correlation
- -1 = perfect negative correlation
- 0 = no correlation

**Why useful?** Accounts for users who rate everything high vs. low - focuses on pattern, not absolute values.

```python
# User A: [5,4,3] mean=4 → deviations [+1,0,-1]
# User B: [3,2,1] mean=2 → deviations [+1,0,-1]
# Same pattern, different scales → pearson = 1.0
```
x??

---

#### Cosine Similarity
Cosine similarity measures the angle between two rating vectors. Unlike Pearson, it doesn't center around means - it treats ratings as vectors in n-dimensional space and computes the cosine of the angle between them.

**Formula:**
$$sim(u, v) = \\frac{\\sum_{i \\in I_{uv}} r_{ui} \\cdot r_{vi}}{\\sqrt{\\sum_{i \\in I_{uv}} r_{ui}^2} \\sqrt{\\sum_{i \\in I_{uv}} r_{vi}^2}}$$

**Geometric interpretation:**
```
Vector u = [5, 4, 3]
Vector v = [4, 3, 2]

Dot product: 5*4 + 4*3 + 3*2 = 20 + 12 + 6 = 38
Magnitude u: sqrt(5² + 4² + 3²) = sqrt(50) = 7.07
Magnitude v: sqrt(4² + 3² + 2²) = sqrt(29) = 5.39

Cosine = 38 / (7.07 * 5.39) = 38 / 38.11 = 0.997
```

**Range:** [0, 1] for rating data (all values positive)

:p What is cosine similarity and how does it differ from Pearson correlation?
??x
**Cosine similarity**: Angle between rating vectors (dot product normalized by magnitudes)

$$cosine(u,v) = \\frac{\\sum r_{ui} \\cdot r_{vi}}{||u|| \\cdot ||v||}$$

**Key differences from Pearson:**
1. **No mean centering**: Uses raw ratings
2. **Always positive** for rating data: [0, 1]
3. **Direction-focused**: Cares about rating pattern direction

```python
# User A: [5, 4, 3]
# User B: [10, 8, 6] (2x of A)
# Cosine = 1.0 (same direction)
# Pearson = 1.0 (same pattern)

# User A: [5, 4, 3]
# User B: [3, 3, 3] (all same)
# Cosine = high (similar direction)
# Pearson = undefined (no variance in B)
```
x??

---

#### Mean Squared Difference (MSD) Similarity
MSD measures dissimilarity by computing average squared differences, then converts to similarity. Smaller differences mean higher similarity. It's simple and intuitive but doesn't account for rating scale differences.

**Formula:**
$$MSD(u, v) = \\frac{1}{|I_{uv}|} \\sum_{i \\in I_{uv}} (r_{ui} - r_{vi})^2$$

**Convert to similarity:**
$$sim(u, v) = \\frac{1}{MSD(u, v) + 1}$$

Adding 1 prevents division by zero when MSD=0 (identical ratings).

**Example:**
```python
# User A ratings: [5, 4, 3]
# User B ratings: [4, 3, 3]

# Squared differences: (5-4)² + (4-3)² + (3-3)²
#                    = 1 + 1 + 0 = 2

MSD = 2 / 3 = 0.667

Similarity = 1 / (0.667 + 1) = 1 / 1.667 = 0.6
```

:p What is Mean Squared Difference (MSD) similarity and how is it computed?
??x
**MSD**: Average of squared rating differences

$$MSD(u,v) = \\frac{1}{n} \\sum (r_{ui} - r_{vi})^2$$

**Convert to similarity:**
$$similarity = \\frac{1}{MSD + 1}$$

**Properties:**
- Lower MSD = more similar users
- Range: [0, 1] after conversion
- Simple but doesn't handle rating scale differences

```python
# User A: [5, 4, 3]
# User B: [4, 4, 2]

differences = [(5-4)², (4-4)², (3-2)²]
            = [1, 0, 1]

MSD = (1+0+1)/3 = 0.667
similarity = 1/(0.667+1) = 0.6
```

Used in `KNNBasic` with `sim_options={'name': 'msd'}`.
x??

---

#### SVD Matrix Factorization Concept
SVD decomposes the rating matrix into user and item latent factor matrices. Each user and item is represented by a vector in latent space, and ratings are predicted by dot product of these vectors.

**Matrix factorization:**
$$R \\approx P \\times Q^T$$

Where:
- R = rating matrix (users × items)
- P = user factor matrix (users × factors)
- Q = item factor matrix (items × factors)

**Prediction formula:**
$$\\hat{r}_{ui} = \\mu + b_u + b_i + \\sum_{f=1}^{k} p_{uf} \\cdot q_{if}$$

**Conceptual pseudocode:**
```python
class SVD:
    def fit(self, trainset):
        # Initialize random factors
        self.pu = random_matrix(n_users, n_factors)   # User factors
        self.qi = random_matrix(n_items, n_factors)   # Item factors
        self.bu = zeros(n_users)  # User biases
        self.bi = zeros(n_items)  # Item biases

        # SGD optimization
        for epoch in range(n_epochs):
            for (u, i, rating) in trainset:
                # Prediction
                pred = mu + bu[u] + bi[i] + dot(pu[u], qi[i])
                error = rating - pred

                # Update with gradient descent
                bu[u] += lr * (error - reg * bu[u])
                bi[i] += lr * (error - reg * bi[i])
                pu[u] += lr * (error * qi[i] - reg * pu[u])
                qi[i] += lr * (error * pu[u] - reg * qi[i])
```

:p How does SVD matrix factorization work in recommender systems?
??x
**Concept**: Represent users and items as vectors in latent space; predict ratings via dot product.

**Formula:**
$$\\hat{r}_{ui} = \\mu + b_u + b_i + \\langle p_u, q_i \\rangle$$

**Components:**
- $\\mu$: global mean
- $b_u, b_i$: user/item biases
- $p_u$: user latent factor vector (k dimensions)
- $q_i$: item latent factor vector (k dimensions)
- $\\langle p_u, q_i \\rangle$: dot product = $\\sum_{f=1}^k p_{uf} \\cdot q_{if}$

**Intuition**: Latent factors capture hidden features (e.g., for movies: genre, style, era). Similar users/items have similar factor vectors.

```python
# User vector: [0.5, 0.8, -0.3] (3 factors)
# Item vector: [0.6, 0.7, -0.2]
# Dot product: 0.5*0.6 + 0.8*0.7 + (-0.3)*(-0.2) = 0.92
```
x??

---

#### SGD for SVD Training
Stochastic Gradient Descent (SGD) optimizes SVD parameters by processing one rating at a time, computing error, and updating factors in the direction that reduces error. Learning rate controls step size; regularization prevents overfitting.

**Update rules:**
```
For each rating r_ui in training data:

1. Compute prediction:
   pred = μ + b_u + b_i + dot(p_u, q_i)

2. Compute error:
   error = r_ui - pred

3. Update biases:
   b_u ← b_u + lr * (error - reg * b_u)
   b_i ← b_i + lr * (error - reg * bi)

4. Update factors:
   for each factor f:
       p_u[f] ← p_u[f] + lr * (error * q_i[f] - reg * p_u[f])
       q_i[f] ← q_i[f] + lr * (error * p_u[f] - reg * q_i[f])
```

**Parameters:**
- lr = learning rate (e.g., 0.005)
- reg = regularization (e.g., 0.02)
- n_epochs = number of passes through data

:p How does SGD optimize SVD parameters, and what are the update rules?
??x
**SGD process**: For each rating, compute error and adjust parameters to reduce it.

**Update rules:**
1. Prediction: $\\hat{r} = \\mu + b_u + b_i + p_u \\cdot q_i$
2. Error: $e = r - \\hat{r}$
3. Updates:
   - $b_u \\leftarrow b_u + \\alpha(e - \\lambda b_u)$
   - $b_i \\leftarrow b_i + \\alpha(e - \\lambda b_i)$
   - $p_{uf} \\leftarrow p_{uf} + \\alpha(e \\cdot q_{if} - \\lambda p_{uf})$
   - $q_{if} \\leftarrow q_{if} + \\alpha(e \\cdot p_{uf} - \\lambda q_{if})$

Where α = learning rate, λ = regularization

```python
error = actual - predicted
# Move parameters toward reducing error
bu += lr * error  # but also apply regularization
pu += lr * error * qi  # gradient direction
```

Repeat for n_epochs passes through all ratings.
x??

---

#### k-NN with Mean Centering
KNNWithMeans centers ratings around each user's mean before computing similarities and predictions. This handles users who consistently rate high or low, focusing on relative preferences rather than absolute values.

**Prediction formula:**
$$\\hat{r}_{ui} = \\bar{r}_u + \\frac{\\sum_{v \\in N^k(u)} sim(u,v) \\cdot (r_{vi} - \\bar{r}_v)}{\\sum_{v \\in N^k(u)} |sim(u,v)|}$$

**Logic:**
```python
def estimate_with_means(user, item, k=40):
    user_mean = mean_rating(user)

    neighbors = []
    for other_user in users_who_rated(item):
        other_mean = mean_rating(other_user)
        rating = get_rating(other_user, item)

        # Center rating around mean
        centered_rating = rating - other_mean

        sim = similarity(user, other_user)
        neighbors.append((sim, centered_rating))

    # Weighted average of centered ratings
    neighbors.sort(reverse=True, key=lambda x: x[0])
    top_k = neighbors[:k]

    weighted_sum = sum(sim * c_rating for sim, c_rating in top_k)
    sim_sum = sum(abs(sim) for sim, _ in top_k)

    # Add back user's mean
    return user_mean + (weighted_sum / sim_sum)
```

:p How does KNNWithMeans differ from basic k-NN, and why is mean centering useful?
??x
**Difference**: Centers each user's ratings around their mean before averaging.

**Formula:**
$$\\hat{r}_{ui} = \\bar{r}_u + \\frac{\\sum sim(u,v) \\cdot (r_{vi} - \\bar{r}_v)}{\\sum |sim(u,v)|}$$

**Why useful?** Handles rating scale differences:
- User A rates [5,4,3] (mean 4, tough rater)
- User B rates [3,2,1] (mean 2, easy rater)
- Same pattern, different scales

**Without centering:**
```
Average neighbor ratings: (5+3)/2 = 4
```

**With centering:**
```
User A: [+1,0,-1] (deviations from 4)
User B: [+1,0,-1] (deviations from 2)
Predict for user with mean 3: 3 + 0 = 3 (correct pattern)
```
x??

---

#### k-NN with Z-Score Normalization
KNNWithZScore normalizes ratings to z-scores (standard deviations from mean) before computing similarities. This handles both mean differences and variance differences between users, making comparisons more fair.

**Z-score transformation:**
$$z_{ui} = \\frac{r_{ui} - \\bar{r}_u}{\\sigma_u}$$

**Prediction formula:**
$$\\hat{r}_{ui} = \\bar{r}_u + \\sigma_u \\cdot \\frac{\\sum_{v \\in N^k(u)} sim(u,v) \\cdot z_{vi}}{\\sum_{v \\in N^k(u)} |sim(u,v)|}$$

**Example:**
```python
# User A: ratings [5,4,3], mean=4, std=1
# z-scores: [(5-4)/1, (4-4)/1, (3-4)/1] = [1, 0, -1]

# User B: ratings [5,3,1], mean=3, std=2
# z-scores: [(5-3)/2, (3-3)/2, (1-3)/2] = [1, 0, -1]

# Same z-score pattern even though:
# - Different means (4 vs 3)
# - Different variances (1 vs 2)
```

:p What is z-score normalization in k-NN and when is it better than mean centering?
??x
**Z-score**: Normalize by mean AND standard deviation

$$z = \\frac{r - \\bar{r}}{\\sigma}$$

**Prediction:**
$$\\hat{r}_{ui} = \\bar{r}_u + \\sigma_u \\cdot (\\text{weighted avg of neighbor z-scores})$$

**Advantage over mean centering**: Handles variance differences
- User A uses full scale [1,2,3,4,5] → high variance
- User B always rates [3,3,3,3] → low variance
- Z-score makes them comparable

```python
# User A: [5,3,1] mean=3, std=2
# z-scores: [1, 0, -1]

# User B: [4.5,3,1.5] mean=3, std=1.5
# z-scores: [1, 0, -1]

# Same normalized pattern despite different spreads
```

Use when users have different "rating vocabularies" (some use full scale, others don't).
x??

---

#### SlopeOne Algorithm Logic
SlopeOne is an item-based collaborative filtering algorithm that precomputes average rating differences between items. To predict, it averages these differences from all items the user has rated.

**Deviation formula:**
$$dev(i, j) = \\frac{1}{|U_{ij}|} \\sum_{u \\in U_{ij}} (r_{ui} - r_{uj})$$

Where $U_{ij}$ = users who rated both items i and j

**Prediction formula:**
$$\\hat{r}_{ui} = \\frac{\\sum_{j \\in R(u)} (r_{uj} + dev(i,j)) \\cdot |U_{ij}|}{\\sum_{j \\in R(u)} |U_{ij}|}$$

**Example:**
```python
# Precomputed deviations:
dev(Movie_A, Movie_B) = 0.5  # A rated 0.5 higher than B on average
dev(Movie_A, Movie_C) = -0.3 # A rated 0.3 lower than C

# User rated: B=4, C=5
# Predict A:

from_B = 4 + 0.5 = 4.5
from_C = 5 + (-0.3) = 4.7

prediction = average(4.5, 4.7) = 4.6
# (weighted by number of users who rated both pairs)
```

:p How does the SlopeOne algorithm work, and what is its core principle?
??x
**Principle**: Items have average rating differences; use these to predict.

**Process:**
1. **Precompute** average difference between every item pair:
   $$dev(i,j) = avg(r_{ui} - r_{uj})$$ for users who rated both

2. **Predict** by averaging differences from user's rated items:
   $$\\hat{r}_{ui} = avg(r_{uj} + dev(i,j))$$ for all j user rated

**Example:**
```
User rated:
- Movie B: 4 stars
- Movie C: 5 stars

Precomputed:
- Movies A-B differ by +0.5 on average
- Movies A-C differ by -0.3 on average

Predict A:
- From B: 4 + 0.5 = 4.5
- From C: 5 - 0.3 = 4.7
- Average: 4.6
```

Simple, efficient, and performs well despite simplicity.
x??

---

#### NMF Non-Negative Matrix Factorization
NMF factors the rating matrix into user and item matrices with non-negative values. This constraint creates interpretable factors (e.g., "amount of action" in movies) and often improves predictions for sparse data.

**Constraint:**
$$R \\approx P \\times Q^T$$

Where all values in P and Q are ≥ 0

**Why non-negative?** Interpretability:
```
Movie factors:
Item 1: [0.8 action, 0.1 romance, 0.0 comedy]
Item 2: [0.0 action, 0.9 romance, 0.2 comedy]

User factors:
User 1: [0.7 likes_action, 0.3 likes_romance, 0.0 likes_comedy]

Prediction = dot([0.7, 0.3, 0.0], [0.8, 0.1, 0.0])
           = 0.7*0.8 + 0.3*0.1
           = 0.56 + 0.03 = 0.59
```

**Update rules** use multiplicative updates to maintain non-negativity:
```python
# Simplified NMF updates
P *= (R @ Q) / (P @ Q.T @ Q + eps)
Q *= (R.T @ P) / (Q @ P.T @ P + eps)
```

:p What is NMF (Non-negative Matrix Factorization) and how does it differ from regular SVD?
??x
**NMF**: Matrix factorization with constraint that all factor values ≥ 0

**Key difference from SVD:**
- SVD allows negative factors (hard to interpret)
- NMF enforces non-negativity (interpretable as "parts")

**Advantage**: Factors represent additive components
```
Movie = 0.7×Action + 0.3×Drama + 0.0×Comedy
(Each factor is amount of each component)
```

**Prediction:**
$$\\hat{r}_{ui} = \\sum_{f=1}^k p_{uf} \\cdot q_{if}$$

where $p_{uf} \\geq 0$ and $q_{if} \\geq 0$

**Use case**: When interpretability matters - factors can represent themes, topics, or genres naturally.
x??

---

#### SVD++ with Implicit Feedback
SVD++ extends SVD by incorporating implicit feedback (which items a user has rated, regardless of rating value). This captures the signal that "user engaged with this item" beyond the explicit rating.

**Formula:**
$$\\hat{r}_{ui} = \\mu + b_u + b_i + q_i^T \\left( p_u + |I_u|^{-0.5} \\sum_{j \\in I_u} y_j \\right)$$

Where:
- $I_u$ = set of items rated by user u
- $y_j$ = implicit factor vector for item j
- The sum captures implicit preferences from all items user interacted with

**Intuition:**
```python
# User rated items [A, B, C, D]
# Even if predicting for item X:

# Regular SVD uses:
prediction = baseline + dot(user_factors, item_X_factors)

# SVD++ adds:
implicit_signal = sum(implicit_factors[A],
                      implicit_factors[B],
                      implicit_factors[C],
                      implicit_factors[D])
implicit_signal /= sqrt(4)  # Normalize by sqrt(number of items)

prediction = baseline + dot(user_factors + implicit_signal,
                           item_X_factors)
```

:p What is SVD++ and how does it improve upon regular SVD?
??x
**SVD++**: Adds implicit feedback to SVD by considering which items a user has rated (not just the ratings).

**Formula:**
$$\\hat{r}_{ui} = \\mu + b_u + b_i + q_i^T(p_u + |I_u|^{-0.5} \\sum_{j \\in I_u} y_j)$$

**Improvement**: Captures implicit preferences
- User rated action movies A, B, C (even if ratings varied)
- Signal: "user engages with action movies"
- Helps predict other action movies

**Example:**
```
User rated: [Movie1: 3★, Movie2: 5★, Movie3: 4★]

SVD: Uses only 3, 5, 4 values
SVD++: Also uses "user rated Movies 1,2,3" as signal
       (adds implicit factor vectors y1, y2, y3)
```

**Tradeoff**: Better accuracy but slower training (more parameters).
x??

---

#### Similarity Shrinkage Parameter
Many k-NN implementations use a shrinkage parameter to reduce the weight of similarities computed from few common ratings. This prevents overconfident similarities based on insufficient data.

**Shrunk similarity:**
$$sim_{shrunk}(u, v) = \\frac{|I_{uv}|}{|I_{uv}| + shrinkage} \\cdot sim(u, v)$$

Where:
- $|I_{uv}|$ = number of items rated by both users
- $shrinkage$ = parameter (e.g., 100)

**Effect:**
```python
# Two users both rated only 2 movies:
raw_similarity = 0.95 (very high)
common_items = 2

# With shrinkage = 100:
shrunk = (2 / (2 + 100)) * 0.95
       = (2 / 102) * 0.95
       = 0.0186  # Heavily reduced!

# Two users rated 200 movies:
raw_similarity = 0.90
common_items = 200

# With shrinkage = 100:
shrunk = (200 / 300) * 0.90
       = 0.60  # Only slightly reduced
```

:p What is similarity shrinkage in k-NN algorithms and why is it important?
??x
**Shrinkage**: Reduces similarity weight when computed from few common items.

**Formula:**
$$sim' = \\frac{n_{common}}{n_{common} + \\lambda} \\cdot sim$$

where λ is shrinkage parameter (e.g., 100)

**Why important?** Prevents spurious similarities:
```
Users A & B rated 2 same movies: 5,5
→ Raw similarity = 1.0 (perfect!)
→ But not enough data to trust this

With shrinkage=100:
→ Shrunk similarity = (2/102) * 1.0 = 0.02
→ Appropriately low confidence
```

**In Surprise:**
```python
sim_options = {
    'name': 'pearson',
    'shrinkage': 100  # Default
}
algo = KNNBasic(sim_options=sim_options)
```
x??
