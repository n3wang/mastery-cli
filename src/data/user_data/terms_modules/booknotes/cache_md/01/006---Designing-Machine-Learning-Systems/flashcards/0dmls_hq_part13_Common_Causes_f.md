# High-Quality Flashcards: 006---Designing-Machine-Learning-Systems_processed (Part 13)

**Starting Chapter:** Common Causes for Data Leakage

---

#### Data Leakage in Machine Learning
Data leakage occurs when information from outside the training dataset is used to create the model, leading to overly optimistic performance estimates and poor generalization in production. It's a critical issue that often goes unnoticed in standard ML education but can severely impact model reliability.
:p What are the main causes of data leakage in machine learning?
??x
Data leakage can occur due to several reasons:
1. **Time-correlated data split**: Randomly splitting time-series data leads to future information leaking into training.
2. **Scaling before splitting**: Using global statistics (e.g., mean) from the entire dataset to scale features before splitting causes leakage.
3. **Missing data imputation using test statistics**: Filling missing values with statistics from the full dataset instead of just training data.
4. **Data duplication across splits**: Duplicate examples appearing in both training and test sets.
5. **Group leakage**: Related examples (e.g., same patient with multiple scans) split into different sets.
6. **Leakage from data collection process**: Information inadvertently included due to how data was gathered or processed, such as differences in medical equipment or procedures.

These issues can be avoided by ensuring proper data handling practices like splitting before scaling, removing duplicates, and understanding the structure and origin of the data.
x??

---

#### Time-Based Data Splitting
When working with time-series data, it's essential to split the data chronologically rather than randomly. This prevents information from the future from leaking into the model during training.
:p Why should time-series data be split chronologically instead of randomly?
??x
In time-series tasks, data points are often dependent on time, and future data can influence current labels. For example, in stock prediction, today's stock prices depend on yesterday's prices and events. Random splitting may include future data in training, which leads to data leakage.

Example: If you have 5 weeks of data, use weeks 1–4 for training and week 5 for validation/test. This ensures that the model only learns from historical data.

Code pseudocode:
```pseudocode
train_data = data[:4 weeks]
val_test_data = data[4 weeks:]
val_data, test_data = split(val_test_data, 0.5)
```
This approach mimics real-world conditions where predictions are made based on past observations.
x??

---

#### Scaling Before Splitting
Scaling features requires global statistics such as mean and standard deviation. If these are computed using the entire dataset before splitting, the test set statistics leak into the training process.
:p How does scaling before splitting cause data leakage?
??x
When scaling features (e.g., normalization), we often compute global statistics like mean ($\mu$) and standard deviation ($\sigma$). If we compute these on the entire dataset before splitting, the test set statistics are leaked into the training process.

Correct approach:
1. Split the data into train, validation, and test sets.
2. Compute mean and standard deviation from only the training set.
3. Apply these statistics to all splits.

Example in Python:
```python
from sklearn.preprocessing import StandardScaler

scaler = StandardScaler()
scaler.fit(X_train)  # Only train data used
X_train_scaled = scaler.transform(X_train)
X_val_scaled = scaler.transform(X_val)
X_test_scaled = scaler.transform(X_test)
```

This ensures no information from the test set influences training.
x??

---

#### Missing Data Imputation
Missing data can be filled using statistics like mean or median. However, using statistics from the entire dataset instead of just the training set leads to leakage.
:p How can missing data imputation lead to data leakage?
??x
Filling missing values with global statistics (e.g., mean of all data) introduces leakage because it assumes knowledge of the test set. The model effectively "knows" something about the test data.

Correct approach:
1. Split data first.
2. Calculate mean/median from training data only.
3. Use those values to fill missing entries in all splits.

Example:
```python
from sklearn.impute import SimpleImputer

imputer = SimpleImputer(strategy='mean')
imputer.fit(X_train)  # Only training data
X_train_imputed = imputer.transform(X_train)
X_test_imputed = imputer.transform(X_test)
```

This ensures that the model doesn't use test-set information during training.
x??

---

#### Data Duplication Across Splits
If the same examples appear in both training and test sets, the model may overfit and give inflated performance metrics.
:p Why is it important to check for and remove duplicate data before splitting?
??x
Duplicates in training and test sets lead to data leakage because the model sees the same examples during both phases. This can result in overly optimistic accuracy scores and poor real-world performance.

Steps to prevent this:
1. Identify duplicates before splitting.
2. Remove them or ensure they are not split across sets.
3. After splitting, verify no duplicates exist in each subset.

Example in Python:
```python
import pandas as pd

df = pd.read_csv('data.csv')
df_dedup = df.drop_duplicates()  # Remove duplicates
train, test = train_test_split(df_dedup, test_size=0.2)
```

This ensures independent and unbiased evaluation.
x??

---

#### Group Leakage
Group leakage occurs when related samples (e.g., multiple scans from the same patient) are split into different sets, allowing the model to indirectly access information from the test set.
:p What is group leakage, and how can it be prevented?
??x
Group leakage happens when samples belonging to the same group are split into different training and test sets. For example, if a patient has two CT scans and one is in training while the other is in test, the model might learn from the test scan indirectly.

Prevention strategies:
- Understand the data structure.
- Use group-aware splitting techniques (e.g., `GroupKFold` in scikit-learn).
- Ensure all samples from the same group stay together in one split.

Example:
```python
from sklearn.model_selection import GroupKFold

gkf = GroupKFold(n_splits=5)
for train_idx, test_idx in gkf.split(X, y, groups=patient_ids):
    X_train, X_test = X[train_idx], X[test_idx]
    y_train, y_test = y[train_idx], y[test_idx]
```

This ensures that no information leaks between training and test due to shared groups.
x??

---

#### Leakage from Data Collection Process
Sometimes, data leakage arises from how data is collected, such as differences in sensors, procedures, or environments across datasets.
:p How can data collection differences cause leakage in machine learning models?
??x
Models trained on data collected under different conditions (e.g., using different machines, hospitals, or protocols) may perform poorly on new data. For instance, a model trained on CT scans from one hospital may fail on another due to differences in scanning machines or procedures.

Detection requires:
- Deep understanding of data sources.
- Domain expertise.
- Monitoring model performance across different environments.

Mitigation:
- Keep track of data collection methods.
- Use stratified splits or cross-validation across environments.
- Evaluate model performance on held-out domains.

Example:
If a model performs well on data from hospital A but poorly on hospital B, it might indicate leakage due to differences in scanning equipment or protocols.
x??

---

#### Data Normalization in ML
Data normalization is a preprocessing step used to standardize the range of features in a dataset. It ensures that different data sources or sensors (e.g., CT scan machines with different resolutions) can be compared and used effectively in machine learning models. Without normalization, features with larger scales can dominate the learning process, leading to poor model performance.

For example, if one feature is measured in thousands and another in decimals, normalization ensures they contribute equally to the model. Common methods include Min-Max scaling, Z-score normalization, and robust scaling.

:p What is the purpose of normalizing data in machine learning?
??x
The purpose of normalizing data is to bring features to a common scale so that no single feature dominates the model due to its scale. This is especially important when data comes from different sources or sensors with varying ranges or units. For instance, in medical imaging, CT scans from different machines may have varying resolutions or intensity levels. Normalization ensures that the model learns from the actual patterns rather than artificial scale differences.

Example of Min-Max normalization:
$$
x_{\text{norm}} = \frac{x - x_{\min}}{x_{\max} - x_{\min}}
$$

Example in Java:
```java
public class Normalizer {
    public static double[] minMaxNormalize(double[] data) {
        double min = Arrays.stream(data).min().orElse(0);
        double max = Arrays.stream(data).max().orElse(0);
        return Arrays.stream(data)
                     .map(x -> (x - min) / (max - min))
                     .toArray();
    }
}
```
x??

---

#### Detecting Data Leakage
Data leakage occurs when information from outside the training dataset is used to create the model, leading to overly optimistic performance metrics. It can happen during data collection, sampling, splitting, processing, or feature engineering. Identifying and preventing data leakage is critical to building robust models that generalize well.

:p How can data leakage be detected in an ML pipeline?
??x
Data leakage can be detected by carefully monitoring the entire lifecycle of an ML project. Key steps include:
1. Examining feature correlations with the target variable.
2. Investigating features that have unusually high correlation.
3. Performing ablation studies to assess how removing a feature affects model performance.
4. Checking for temporal or structural dependencies (e.g., using future data to predict past events).

For example, if both start date and end date are used to compute tenure, the model may be inadvertently using information that shouldn't be available at prediction time.

```java
// Example: Ablation study logic
public class AblationStudy {
    public double evaluateModelWithFeatures(List<String> features) {
        // Train and evaluate model with subset of features
        return model.evaluate();
    }
}
```
x??

---

#### Feature Correlation and Leakage
When individual features have low correlation with the target, but a combination of features does, this can indicate leakage. This is especially true in cases where one feature might be derived from another (e.g., date range = end date - start date). Understanding how features are constructed is crucial to identifying such leakage.

:p Why is it important to examine feature combinations for correlation?
??x
Examining feature combinations helps detect situations where the model may be learning spurious relationships due to data leakage. For instance, a feature like "days employed" might not be directly useful, but when combined with start and end dates, it could reveal information that shouldn't be available at prediction time. This highlights the importance of domain knowledge and careful feature engineering.

$$
\text{Correlation}(X, Y) = \frac{\text{Cov}(X, Y)}{\sigma_X \sigma_Y}
$$

In practice, you can use libraries like pandas to compute correlations:
```python
import pandas as pd
correlations = df.corr()
```
x??

---

#### Importance of Subject Matter Expertise
Subject matter expertise is crucial in feature engineering because it helps identify potential sources of leakage and ensures that features make logical sense in the context of the problem. Experts can guide which features to include, how to combine them, and what constitutes valid vs. invalid information.

:p Why is domain knowledge important in feature engineering?
??x
Domain knowledge is essential because it allows engineers and data scientists to understand how features are generated, what they represent, and whether they are likely to introduce leakage. For example, in HR analytics, knowing that "start date" and "end date" can be used to compute tenure helps prevent accidentally including derived features that leak future information. It also aids in designing meaningful features that align with real-world processes.

Example:
```java
// Domain expert insight: Do not use "days employed" directly if it's derived from start/end dates
class HRFeatures {
    // Instead of using derived tenure, use raw dates
    private Date startDate;
    private Date endDate;
}
```
x??

---

---

#### Feature Engineering and Model Performance
Feature engineering plays a critical role in machine learning model performance. While adding more features can improve performance, it's not always the case. Too many features can introduce problems like data leakage, overfitting, and technical debt. It's essential to understand the trade-offs and evaluate how features contribute to predictions.

:p What are the main risks of adding too many features to a model?
??x
Adding too many features can lead to several issues:

1. **Data Leakage**: More features increase the chance that information from the target variable (label) inadvertently leaks into the model during training.
2. **Overfitting**: With more features, especially irrelevant ones, models may start fitting noise instead of the true signal, leading to poor generalization on unseen data.
3. **Technical Debt**: Unused or redundant features become maintenance burdens. If data sources change, all affected features must be updated accordingly.

For example, if a feature like "user age" is no longer collected, any feature that depends on it must also be re-evaluated or removed.

Regularization techniques such as L1 regularization can help by shrinking the coefficients of unimportant features towards zero, effectively removing them from the model.

```java
// Example: L1 regularization in a linear model
// The penalty term is the sum of absolute values of coefficients
// L1 penalty = λ * Σ|wi|
```
x??

---

#### Data Leakage in Feature Engineering
Data leakage occurs when information from the future (i.e., labels or test data) is used during training, leading to artificially inflated performance metrics. This is a serious problem because it can mislead practitioners into thinking their model is performing well when it's not generalizing properly.

:p How can data leakage occur during feature engineering?
??x
Data leakage can happen in multiple ways:

1. **Using future information in features**: For example, using a user's future purchase behavior to predict their current spending.
2. **Accidentally including test data in training**: If features are derived using data that includes test labels or outcomes.
3. **Feature construction based on labels**: Constructing features that directly encode label information, such as using target values to compute mean or variance.

To prevent leakage, always ensure that features are constructed using only historical or available data up to the point of prediction. The test set should only be used for final evaluation, never for feature design or hyperparameter tuning.

Example:
```python
# Bad practice: Using test labels to compute a feature
train_features = df_train.drop('target', axis=1)
test_features = df_test.groupby('target').mean()  # This leaks information!
```
x??

---

#### Regularization and Feature Selection
Regularization is a technique used to prevent overfitting by adding a penalty term to the loss function. L1 regularization, in particular, is useful for feature selection as it drives some coefficients to zero, effectively eliminating irrelevant features from the model.

:p How does L1 regularization help in feature selection?
??x
L1 regularization adds a penalty equal to the absolute value of the magnitude of coefficients:

$$
\text{Loss} = \text{Original Loss} + \lambda \sum_{i=1}^{n} |w_i|
$$

Where $w_i$ are the model weights and $\lambda$ controls the strength of the penalty.

This penalty encourages sparsity in the model — meaning that many weights become exactly zero, effectively removing those features from the model. This makes L1 regularization useful for automatic feature selection, especially in high-dimensional datasets where many features may be irrelevant or redundant.

Example:
```java
// Pseudocode for L1 regularization
for each weight w in model {
    if (abs(w) < threshold) {
        w = 0; // Remove feature
    }
}
```
x??

---

#### Importance of Test Set Isolation
The test set should be kept completely separate from the training process to ensure unbiased evaluation of model performance. Any interaction with the test set, whether for feature engineering or hyperparameter tuning, introduces risk of information leakage.

:p Why should the test set never be used for feature engineering or tuning?
??x
The test set is meant to simulate unseen data and provide an unbiased estimate of model performance. Using it for feature engineering or tuning leads to:

1. **Information Leakage**: The model may start to "learn" patterns from the test data, which it shouldn't have access to.
2. **Overly Optimistic Performance Estimates**: The model may appear to perform better than it actually does on real-world data.
3. **Misleading Validation**: If features or hyperparameters are tuned using test data, the model’s generalization ability is compromised.

Instead, use a validation set for tuning and feature selection, and reserve the test set strictly for final performance reporting.

```python
# Correct workflow:
# 1. Train on train set
# 2. Tune on validation set
# 3. Evaluate on test set
```
x??

---

#### Managing Technical Debt from Features
As models evolve, features may become obsolete or redundant. Keeping track of features and their dependencies is crucial to avoid technical debt, which can slow down development and increase maintenance costs.

:p What constitutes technical debt in feature engineering?
??x
Technical debt in feature engineering refers to:

1. **Unused Features**: Features that do not contribute to model performance but still require maintenance.
2. **Outdated Dependencies**: Features that rely on data sources that no longer exist or have changed.
3. **Redundant Computation**: Features that are computationally expensive but offer little predictive value.

For example, if a company stops collecting age data, features like `age_group` or `age_squared` must be reviewed and potentially removed. Managing this debt ensures that the model remains efficient, maintainable, and aligned with current data availability.

```java
// Example: Clean up obsolete features
if (data_source.contains("age")) {
    // Keep age-related features
} else {
    // Remove all age-based features
    removeFeatures(["age_group", "age_squared"]);
}
```
x??

---

