# Scikit-learn API Patterns Flashcards

## Estimator API Basics

---

#### BaseEstimator - Core Methods

Every sklearn estimator inherits from `BaseEstimator`, which provides automatic parameter management through introspection.

**Location**: `sklearn/base.py:175`

:p What two methods does `BaseEstimator` provide automatically?
??x
1. `get_params(deep=True)` - returns dict of all hyperparameters
2. `set_params(**params)` - updates hyperparameters

Both use introspection on `__init__` signature.
x??

---

#### get_params Implementation

`get_params()` uses Python introspection to extract parameters from the `__init__` method signature.

:p How does `get_params()` know which parameters an estimator has?
??x
It inspects the `__init__` method signature using `inspect.signature()` and extracts parameter names.

**Key requirement:** All hyperparameters must be stored as attributes with the same name as in `__init__`.
x??

---

#### Why get_params Matters

The `get_params()`/`set_params()` pattern enables sklearn's meta-estimators.

:p Why are `get_params()` and `set_params()` critical for GridSearchCV?
??x
GridSearchCV needs to:
1. Get current parameters: `params = model.get_params()`
2. Try different values: `model.set_params(C=0.1, kernel='rbf')`
3. Clone models with modified parameters

Without these methods, hyperparameter tuning wouldn't work.
x??

---

#### Trailing Underscore Convention

Sklearn uses a strict naming convention to distinguish configuration from learned parameters.

:p What does a trailing underscore (`_`) mean in sklearn attribute names?
??x
Attributes ending with `_` are **learned during `fit()`**.

Examples:
- `coef_` - learned weights
- `classes_` - unique class labels
- `n_features_in_` - number of features seen during fit

Hyperparameters (set before training) have **no underscore**.
x??

---

#### Identifying Learned Parameters

The underscore convention helps identify an estimator's state.

:p How can you tell if a LogisticRegression model has been fitted?
??x
Check for attributes ending with `_`:

```python
model = LogisticRegression()
hasattr(model, 'coef_')  # False - not fitted

model.fit(X, y)
hasattr(model, 'coef_')  # True - fitted!
```

Or use: `check_is_fitted(model)`
x??

---

#### fit() Return Value

Every `fit()` method must return `self` for method chaining.

:p Why must `fit()` always return `self`?
??x
Enables **method chaining**:

```python
model.fit(X, y).predict(X_test)

# Pipelines rely on this:
scaler.fit(X).transform(X)
```

Without returning `self`, chaining breaks!
x??

---

#### Method Chaining Example

Returning `self` enables the fluent interface pattern.

:p What would happen if `fit()` returned `None` instead of `self`?
??x
```python
# With return self:
result = model.fit(X, y).predict(X_test)  # ✓ Works

# With return None:
result = model.fit(X, y).predict(X_test)  # ✗ Error!
# AttributeError: 'NoneType' has no attribute 'predict'
```

Pipelines and chaining would be impossible.
x??

---

#### TransformerMixin Purpose

`TransformerMixin` provides automatic `fit_transform()` implementation.

:p What does `TransformerMixin` give you for free?
??x
The `fit_transform()` method:

```python
def fit_transform(self, X, y=None):
    return self.fit(X, y).transform(X)
```

You only implement `fit()` and `transform()`, get `fit_transform()` free!
x??

---

#### TransformerMixin Usage

Any class with `fit()` and `transform()` can use TransformerMixin.

:p How do you use `TransformerMixin` in a custom transformer?
??x
```python
class MyTransformer(BaseEstimator, TransformerMixin):
    def fit(self, X, y=None):
        return self

    def transform(self, X):
        return X_transformed

    # fit_transform() inherited automatically!
```
x??

---

#### Estimator Lifecycle - States

Sklearn estimators have three distinct lifecycle states.

:p What are the three states of an sklearn estimator's lifecycle?
??x
1. **Uninitialized** - no object exists
2. **Unfitted** - created but not trained (`__init__` called)
3. **Fitted** - trained (`fit()` called, has `_` attributes)
x??

---

#### Checking Fitted State

You can check if an estimator has been fitted.

:p How do you check if an estimator is fitted?
??x
```python
from sklearn.utils.validation import check_is_fitted

check_is_fitted(estimator)
# Raises NotFittedError if not fitted
# Returns None if fitted
```

Checks for attributes ending with `_`.
x??

---

#### ClassifierMixin vs RegressorMixin

Different mixins provide `score()` with different metrics.

:p What's the difference between `ClassifierMixin` and `RegressorMixin`?
??x
Both provide `score()` method, but:

**ClassifierMixin:** `score()` returns **accuracy**

**RegressorMixin:** `score()` returns **R² score**

Used by GridSearchCV for optimization.
x??

---

#### Score Method Purpose

The `score()` method provides a default performance metric.

:p Why do mixins provide a default `score()` method?
??x
Enables **consistent API** across estimators:

```python
# All classifiers have same interface
model.score(X_test, y_test)  # Returns accuracy

# GridSearchCV can optimize any estimator
grid.fit(X, y)  # Uses estimator.score() internally
```

Higher is always better.
x??

---

#### _validate_data Helper

`_validate_data()` is a convenience method from BaseEstimator.

:p What does `_validate_data(X, y, reset=True)` do?
??x
1. Calls `check_X_y(X, y)` for validation
2. If `reset=True`: Sets `n_features_in_` (use in `fit()`)
3. If `reset=False`: Checks `n_features_in_` matches (use in `predict()`)

Combines validation + feature tracking.
x??

---

#### _validate_data reset Parameter

The `reset` parameter controls feature count handling.

:p When should you use `reset=True` vs `reset=False` in `_validate_data()`?
??x
**`reset=True`** - in `fit()`:
- Sets `n_features_in_` for first time

**`reset=False`** - in `predict()`/`transform()`:
- Validates feature count matches training data
- Raises error if mismatch

```python
def fit(self, X, y):
    X, y = self._validate_data(X, y, reset=True)

def predict(self, X):
    X = self._validate_data(X, reset=False)
```
x??

---

#### clone() Function

`clone()` creates a new unfitted estimator with same hyperparameters.

:p What does `sklearn.base.clone()` do?
??x
Creates new **unfitted** estimator with same hyperparameters:

```python
original = LogisticRegression(C=0.1)
original.fit(X, y)  # Fitted

copy = clone(original)
# copy.C == 0.1 ✓ (hyperparameter copied)
# hasattr(copy, 'coef_') == False ✓ (not fitted)
```

**Location**: `sklearn/base.py:77`
x??

---

#### clone() Implementation

Clone uses `get_params()` to copy configuration.

:p How does `clone()` work internally?
??x
```python
def clone(estimator):
    # 1. Get hyperparameters
    params = estimator.get_params(deep=False)

    # 2. Create new instance
    klass = type(estimator)
    new = klass(**params)

    # 3. Return unfitted estimator
    return new
```

Does NOT copy learned parameters (those with `_`).
x??

---

#### Why clone() is Essential

Cross-validation and grid search rely on clone().

:p Why is `clone()` essential for cross-validation?
??x
Each CV fold needs an independent model:

```python
for train, val in kfold.split(X):
    model_copy = clone(original)  # Fresh unfitted model
    model_copy.fit(X[train], y[train])
    scores.append(model_copy.score(X[val], y[val]))
```

Without clone, same fitted model would be reused!
x??

---

#### Parameter Storage Requirement

Sklearn requires specific parameter storage for get_params to work.

:p What's the requirement for storing hyperparameters in `__init__`?
??x
Store as attributes with **same name** as parameters:

```python
class MyEstimator(BaseEstimator):
    def __init__(self, alpha=1.0, beta=2.0):
        self.alpha = alpha  # MUST match param name
        self.beta = beta    # MUST match param name
```

Required for `get_params()` to work correctly.
x??

---

#### Nested Parameter Access

Pipelines use double underscore for nested parameters.

:p How do you access nested parameters in a Pipeline?
??x
Use `step__parameter` syntax:

```python
pipe = Pipeline([
    ('scaler', StandardScaler()),
    ('clf', LogisticRegression())
])

# Access nested:
pipe.get_params()['clf__C']  # Get
pipe.set_params(clf__C=0.1)  # Set
```

Double underscore separates step name from parameter.
x??
