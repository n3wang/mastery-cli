# Pipelines and Model Selection Flashcards

## Pipeline Basics

---

#### Pipeline Purpose

Pipelines chain transformers and estimators together.

:p What problem do Pipelines solve?
??x
**Prevent data leakage** by ensuring transformers fit only on training data:

```python
# WRONG:
scaler.fit(X)  # Sees test data!
X_train, X_test = split(X)

# CORRECT:
X_train, X_test = split(X)
pipe.fit(X_train)  # Scaler sees only train
```

**Location**: `sklearn/pipeline.py`
x??

---

#### Pipeline Structure

Pipelines have specific requirements.

:p What are the requirements for Pipeline steps?
??x
1. **All but last** must be transformers (have `transform()`)
2. **Last step** can be estimator or transformer
3. Steps are `(name, estimator)` tuples

```python
Pipeline([
    ('scaler', StandardScaler()),      # transformer
    ('pca', PCA()),                    # transformer
    ('clf', LogisticRegression())      # estimator
])
```
x??

---

#### Pipeline fit() Behavior

Fit applies transformations sequentially.

:p What happens when you call `pipe.fit(X, y)`?
??x
```python
# For each transformer (all but last):
X = transformer.fit_transform(X, y)

# For final estimator:
estimator.fit(X, y)
```

Each step sees **transformed** output of previous step.
x??

---

#### Pipeline predict() Behavior

Predict only transforms, doesn't refit.

:p What happens when you call `pipe.predict(X)`?
??x
```python
# For each transformer:
X = transformer.transform(X)  # No fit!

# For final estimator:
return estimator.predict(X)
```

Uses parameters learned during `fit()`.
x??

---

#### Data Leakage Example

Common mistake without pipelines.

:p What's wrong with this code?
```python
scaler = StandardScaler()
X_scaled = scaler.fit_transform(X)
X_train, X_test = train_test_split(X_scaled, y)
```
??x
**Data leakage!**

Scaler computed statistics (mean, std) on **all data** including test set.

Test set influenced the scaling → overly optimistic results.

**Fix:** Use Pipeline and split before scaling.
x??

---

#### Pipeline Parameter Access

Nested parameters use double underscore.

:p How do you set parameters in a Pipeline?
??x
Use `step__parameter` syntax:

```python
pipe = Pipeline([
    ('scaler', StandardScaler()),
    ('clf', LogisticRegression())
])

pipe.set_params(
    scaler__with_mean=False,
    clf__C=0.1
)
```

**Double underscore** separates step from parameter.
x??

---

#### Pipeline named_steps

Access individual pipeline steps.

:p How do you access fitted transformers from a Pipeline?
??x
Use `named_steps` attribute:

```python
pipe.fit(X, y)

# Access fitted scaler
scaler = pipe.named_steps['scaler']
print(scaler.mean_)  # Scaler's learned parameters

# Access fitted classifier
clf = pipe.named_steps['clf']
print(clf.coef_)  # Classifier's weights
```
x??

## GridSearchCV

---

#### GridSearchCV Purpose

Exhaustive search over hyperparameter combinations.

:p What does GridSearchCV do?
??x
**Tries all parameter combinations** with cross-validation:

1. Generate all combinations (Cartesian product)
2. For each combination: k-fold CV
3. Select best based on mean CV score
4. Refit on all training data

**Location**: `sklearn/model_selection/_search.py`
x??

---

#### GridSearchCV Complexity

Number of fits grows multiplicatively.

:p How many models does GridSearchCV fit?
??x
```
# fits = (# param combinations) × (# CV folds)

Example:
param_grid = {
    'C': [0.1, 1, 10],        # 3 values
    'kernel': ['rbf', 'linear']  # 2 values
}
cv = 5

Total fits = 3 × 2 × 5 = 30 models
```

Can be **very expensive** for large grids!
x??

---

#### GridSearchCV with Pipelines

Seamless integration with nested parameters.

:p How do you use GridSearchCV with a Pipeline?
??x
```python
pipe = Pipeline([
    ('scaler', StandardScaler()),
    ('clf', SVC())
])

param_grid = {
    'scaler__with_std': [True, False],
    'clf__C': [0.1, 1, 10],
    'clf__kernel': ['rbf', 'linear']
}

grid = GridSearchCV(pipe, param_grid, cv=5)
grid.fit(X_train, y_train)
```

Uses `step__parameter` syntax.
x??

---

#### GridSearchCV Best Estimator

Automatically refits with best parameters.

:p What does GridSearchCV do after finding best parameters?
??x
**Refits on all training data:**

```python
grid.fit(X_train, y_train)

# After CV, refits with best params:
grid.best_estimator_.fit(X_train, y_train)

# Can predict directly:
y_pred = grid.predict(X_test)
```

`best_estimator_` is ready to use!
x??

---

#### GridSearchCV Results

Access detailed results.

:p How do you access GridSearchCV results?
??x
```python
grid.fit(X, y)

# Best parameters
grid.best_params_  # {'C': 1.0, 'kernel': 'rbf'}

# Best CV score
grid.best_score_  # 0.95

# All results
grid.cv_results_  # Dict with all scores, times, etc.

# Best estimator
grid.best_estimator_  # Fitted model with best params
```
x??

## Cross-Validation

---

#### Cross-Validation Purpose

More reliable performance estimates.

:p Why use cross-validation instead of single train/test split?
??x
**Single split** depends on random seed → unreliable

**Cross-validation** uses multiple splits:
- Every sample used for validation once
- More stable estimate
- Better use of limited data
- Provides uncertainty (std of scores)
x??

---

#### K-Fold CV Process

Data split into k consecutive folds.

:p How does k-fold cross-validation work?
??x
```python
Split data into k folds:
[Fold1 | Fold2 | Fold3 | Fold4 | Fold5]

Iteration 1: [Val | Train | Train | Train | Train]
Iteration 2: [Train | Val | Train | Train | Train]
Iteration 3: [Train | Train | Val | Train | Train]
Iteration 4: [Train | Train | Train | Val | Train]
Iteration 5: [Train | Train | Train | Train | Val]

Average the 5 scores
```

**Each sample** used for validation exactly once.
x??

---

#### K Value Choice

Common k values and their tradeoffs.

:p What's the typical choice for k in cross-validation and why?
??x
**k=5 or k=10** are most common.

**k=2**: Too little training data (50%)
**k=n (LOOCV)**: High variance, expensive
**k=5 or k=10**: Good balance:
- 80-90% training data
- Reasonable computation
- Low bias and variance
x??

---

#### Stratified K-Fold

Preserves class distribution in each fold.

:p When should you use StratifiedKFold instead of KFold?
??x
**Use StratifiedKFold for classification:**

```python
# Regular KFold might create imbalanced folds
# StratifiedKFold preserves class ratios

from sklearn.model_selection import StratifiedKFold

skf = StratifiedKFold(n_splits=5)
for train, val in skf.split(X, y):
    # Each fold has same class distribution
```

**Critical for imbalanced datasets!**
x??

---

#### cross_val_score Usage

Convenience function for CV.

:p How do you perform cross-validation with cross_val_score?
??x
```python
from sklearn.model_selection import cross_val_score

scores = cross_val_score(
    estimator=model,
    X=X,
    y=y,
    cv=5,           # 5-fold CV
    scoring='accuracy'
)

# scores = array([0.92, 0.94, 0.91, 0.93, 0.95])
print(f"Mean: {scores.mean():.3f} ± {scores.std():.3f}")
```

Returns array of scores (one per fold).
x??

---

#### CV Scoring Metrics

Different metrics for different problems.

:p What are common scoring metrics for cross_val_score?
??x
**Classification:**
- `'accuracy'`: Overall correctness
- `'f1'`: F1 score (harmonic mean of precision/recall)
- `'roc_auc'`: Area under ROC curve

**Regression:**
- `'r2'`: R² coefficient
- `'neg_mean_squared_error'`: Negative MSE
- `'neg_mean_absolute_error'`: Negative MAE

**Note:** Negatives because sklearn maximizes scores.
x??

## Feature Selection

---

#### SelectKBest Purpose

Univariate feature selection.

:p What does SelectKBest do?
??x
Selects **k best features** based on statistical tests:

```python
from sklearn.feature_selection import SelectKBest, f_classif

selector = SelectKBest(f_classif, k=50)
selector.fit(X, y)
X_selected = selector.transform(X)  # Only top 50 features
```

**Each feature scored independently.**
x??

---

#### SelectKBest Scoring Functions

Different tests for different data types.

:p What scoring functions can SelectKBest use?
??x
**Classification:**
- `f_classif`: ANOVA F-test
- `chi2`: Chi-squared (non-negative features only)
- `mutual_info_classif`: Mutual information

**Regression:**
- `f_regression`: F-test for regression
- `mutual_info_regression`: Mutual information

Choose based on data type and assumptions.
x??

---

#### Feature Selection in Pipeline

Must be inside Pipeline to avoid leakage.

:p Why must feature selection be inside a Pipeline?
??x
**Prevents data leakage:**

```python
# WRONG - leakage:
selector = SelectKBest(k=50)
X_selected = selector.fit_transform(X)  # Sees all data!
X_train, X_test = split(X_selected)

# CORRECT - no leakage:
pipe = Pipeline([
    ('selector', SelectKBest(k=50)),
    ('clf', LogisticRegression())
])
X_train, X_test = split(X)
pipe.fit(X_train)  # Selector sees only training
```

**Each CV fold** may select different features!
x??

---

#### GridSearch with Feature Selection

Tune number of features selected.

:p How do you tune the number of features with GridSearchCV?
??x
```python
pipe = Pipeline([
    ('selector', SelectKBest(f_classif)),
    ('clf', LogisticRegression())
])

param_grid = {
    'selector__k': [10, 20, 50, 100],
    'clf__C': [0.1, 1, 10]
}

grid = GridSearchCV(pipe, param_grid, cv=5)
grid.fit(X_train, y_train)

print(grid.best_params_)
# {'selector__k': 50, 'clf__C': 1}
```

Finds optimal number of features and model params together!
x??

## Model Evaluation Best Practices

---

#### Train/Val/Test Split

Proper dataset splitting.

:p What's the proper way to split data for model selection?
??x
**Three-way split:**

```python
# 1. Split into train+val and test
X_trainval, X_test, y_trainval, y_test = train_test_split(
    X, y, test_size=0.2
)

# 2. Use train+val for GridSearchCV (it splits internally)
grid.fit(X_trainval, y_trainval)

# 3. Final evaluation on test set (never seen before)
final_score = grid.score(X_test, y_test)
```

**Test set:** Touch only once at the end!
x??

---

#### Why Separate Test Set

Prevents overfitting to validation set.

:p Why do you need a separate test set when using GridSearchCV?
??x
**GridSearchCV already does CV**, but:

**Validation set:** Used to select hyperparameters
- Model selection process "sees" validation performance
- Can overfit to validation set

**Test set:** Unseen data
- Unbiased estimate of generalization
- Never used for any decisions

**Rule:** One evaluation on test set only!
x??

---

#### Cross-Validation in GridSearch

GridSearchCV combines grid search with CV.

:p How does GridSearchCV prevent overfitting during hyperparameter tuning?
??x
Uses **cross-validation** for each parameter combination:

```python
For each param combination:
    cv_scores = []
    For each fold in k-fold:
        model.fit(train_fold)
        score = model.score(val_fold)
        cv_scores.append(score)

    mean_score = average(cv_scores)

Select params with best mean_score
Refit on all training data
```

Mean CV score is unbiased estimate.
x??

---

#### Scoring Parameter

Customize evaluation metric.

:p How do you specify a custom scoring metric in GridSearchCV?
??x
```python
from sklearn.metrics import make_scorer, f1_score

# Option 1: String (built-in)
grid = GridSearchCV(model, param_grid, scoring='f1')

# Option 2: Callable
def custom_score(y_true, y_pred):
    return f1_score(y_true, y_pred, average='weighted')

grid = GridSearchCV(model, param_grid,
                    scoring=make_scorer(custom_score))

# Option 3: Multiple metrics
grid = GridSearchCV(model, param_grid,
                    scoring=['accuracy', 'f1'],
                    refit='f1')  # Which to use for best
```
x??

---

#### Pipeline Benefits Summary

Multiple advantages of using Pipelines.

:p What are the main benefits of using sklearn Pipelines?
??x
1. **Prevents data leakage** - transformers fit on train only
2. **Cleaner code** - one object instead of many
3. **Hyperparameter tuning** - grid search over entire workflow
4. **Reproducibility** - single object captures full process
5. **Deployment** - pickle one object for production

**Critical for proper ML workflows!**
x??
