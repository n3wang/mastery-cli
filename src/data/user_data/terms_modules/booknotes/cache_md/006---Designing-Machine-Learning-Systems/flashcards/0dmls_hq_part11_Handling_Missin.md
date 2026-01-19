# High-Quality Flashcards: 006---Designing-Machine-Learning-Systems_processed (Part 11)

**Starting Chapter:** Handling Missing Values

---

#### Missing Value Types: MNAR, MAR, MCAR
In machine learning, understanding the type of missing data is crucial for proper handling. Missing not at random (MNAR) occurs when the reason for missingness is related to the unobserved value itself, such as high-income individuals not disclosing their income. Missing at random (MAR) happens when missingness depends on observed variables, like age being missing for a specific gender group. Missing completely at random (MCAR) means there's no pattern in missingness, though this is rare in practice.
:p What are the three types of missing data and how do they differ?
??x
1. **MNAR (Missing Not At Random)**: The missingness depends on the unobserved value itself. For example, people with high income may avoid disclosing it.
2. **MAR (Missing At Random)**: The missingness depends on observed variables, not the unobserved ones. For example, age is missing for a certain gender due to survey design.
3. **MCAR (Missing Completely At Random)**: There's no systematic reason for missingness; it's purely random. This is uncommon in real-world datasets.
x??

---

#### Feature Engineering Overview
Feature engineering involves selecting and transforming raw data into features suitable for machine learning models. It's a critical step that affects model performance. The number of features can vary greatly depending on the task — from hundreds to millions in large-scale applications like recommendation systems.
:p Why is feature engineering important in machine learning projects?
??x
Feature engineering is important because:
- It helps extract meaningful patterns from raw data.
- It can significantly improve model accuracy and generalization.
- It allows models to better understand relationships between variables.
- It reduces noise and irrelevant information that can hurt performance.
In large-scale tasks like TikTok's video recommendations, models may use millions of features to capture user behavior effectively.
x??

---

#### Encoding Categorical Features
Categorical variables must be encoded before being used in ML models. Common methods include one-hot encoding, label encoding, and embedding. One-hot encoding creates binary columns for each category, while label encoding assigns integers to categories.
:p How do you encode categorical features for machine learning models?
??x
Common encoding methods:
1. **One-Hot Encoding**: Creates binary columns for each category. Example:
$$
\text{Gender: Male} \rightarrow [1, 0], \quad \text{Female} \rightarrow [0, 1]
$$
2. **Label Encoding**: Assigns integer labels to categories. E.g., Male = 0, Female = 1.
3. **Embedding**: Used in deep learning, maps categories to dense vectors.
One-hot encoding is preferred for tree-based models, whereas label encoding works well for linear models or when order matters.
Example:
```java
// One-hot encoding example
Map<String, Integer> genderMap = new HashMap<>();
genderMap.put("Male", 0);
genderMap.put("Female", 1);
```
x??

---

#### Cross Features and Positional Features
Cross features combine two or more existing features to create new ones, capturing interaction effects. Positional features encode information about the position or sequence of elements, useful in time-series or sequential data.
:p What are cross features and positional features, and why are they useful?
??x
- **Cross Features**: Combine two or more features to capture interactions. For example, combining "Age" and "Income" into a new feature "Age * Income".
- **Positional Features**: Capture order or sequence, such as "Day of Week" or "Time Since Last Purchase".
These features help models learn complex relationships that simple features might miss. They are especially useful in recommendation systems and time-series forecasting.
Example:
```java
// Cross feature example
int crossFeature = age * income;
// Positional feature example
int dayOfWeek = getCurrentDayOfWeek();
```
x??

---

---

#### Feature Scaling Overview
Feature scaling is essential in machine learning to ensure that all features contribute equally to the model's performance. Without scaling, features with larger numerical ranges (e.g., income in dollars) may dominate features with smaller ranges (e.g., age in years), leading to skewed predictions. Scaling transforms features into a similar range to prevent one feature from disproportionately influencing the model.

:p Why is feature scaling important in machine learning models?
??x
Feature scaling ensures that all features are in a comparable range, preventing features with larger values from dominating the model's learning process. This is especially critical for algorithms like gradient-boosted trees and logistic regression, which can produce poor or misleading predictions if features are not scaled.
x??

---

#### Standardization (Z-Score Normalization)
Standardization transforms features to have zero mean and unit variance, assuming the data is normally distributed. This method is particularly useful when the distribution of the data is approximately normal, as it centers the data around the mean and scales it by its standard deviation.

:p What is the formula for standardization, and when is it most appropriate to use?
??x
The formula for standardization is:
$$
x' = \frac{x - \bar{x}}{\sigma}
$$
where $\bar{x}$ is the mean and $\sigma$ is the standard deviation of the feature $x$. Standardization is most appropriate when the data follows a normal distribution, as it centers the data around zero and scales it to unit variance.
x??

---

#### Data Leakage in Scaling
Scaling can introduce data leakage if global statistics (like mean and standard deviation) from the entire dataset are used during training and then applied to test or inference data. If the new data significantly differs from the training data, the scaling statistics may no longer be valid, causing poor model performance.

:p Why is it risky to use global statistics (like mean and std) from the training data for scaling during inference?
??x
Using global statistics (e.g., mean and standard deviation) computed from the training data to scale new data can lead to data leakage. If the distribution of new data differs significantly from the training data, the scaling will be incorrect, potentially degrading model performance. Retraining the model regularly helps mitigate this issue.
x??

---

#### Scaling and Model Performance
Proper scaling can significantly improve model performance, especially for classical algorithms like logistic regression and gradient-boosted trees. Neglecting to scale features can result in poor predictions, as models may incorrectly weight features based on their magnitude rather than their relevance.

:p How does scaling affect the performance of classical ML models?
??x
Scaling ensures that features contribute equally to the model's learning process. Without scaling, algorithms like logistic regression and gradient-boosted trees may give undue weight to features with larger numerical ranges, leading to poor or misleading predictions. Proper scaling often boosts model accuracy.
x??

---

#### Handling Changing Data in Production
In production environments, data may change over time, which can invalidate previously computed scaling statistics. To maintain model accuracy, it is important to retrain models periodically and update scaling parameters accordingly.

:p What should be done to maintain model accuracy when data changes over time in production?
??x
To maintain accuracy when data changes over time, models should be retrained regularly to update scaling statistics and other preprocessing parameters. This ensures that the model adapts to new data distributions and continues to perform well in real-world applications.
x??

---

#### Discretization Overview
Discretization is a preprocessing technique used in machine learning to convert continuous features into discrete buckets or categories. This process is also known as quantization. The main idea is to group similar values together so that the model treats them similarly, even if they are numerically different. For example, an annual income of $9000.50 and $10000 might be considered equivalent in terms of income level, and thus grouped into the same bucket.

:p What is the purpose of discretization in machine learning models?
??x
The purpose of discretization is to reduce the complexity of continuous features by grouping similar values into buckets. This helps models generalize better and learn more efficiently, especially when dealing with a wide range of numerical values. Instead of learning an infinite number of unique values, the model learns to classify inputs into a finite set of categories.
$$
\text{Example: } \text{Income } \$9000.50 \text{ and } \$10000 \text{ are grouped into the same bucket}
$$
Here's a pseudocode example for discretizing income:
```pseudocode
function discretize_income(income):
    if income < 35000:
        return "Lower income"
    elif income >= 35000 and income <= 100000:
        return "Middle income"
    else:
        return "Upper income"
```
x??

---

#### Benefits of Discretization in Model Training
Using discretization has several advantages in model training:
1. **Reduced Overfitting**: Fewer unique values mean less noise for the model to learn from.
2. **Improved Generalization**: The model learns to generalize across buckets instead of specific values.
3. **Simplified Interpretability**: Bucketed features are easier to interpret and explain.
4. **Handling Outliers**: Extreme values can be grouped into a single bucket, reducing their impact.

:p What are the benefits of using discretization in machine learning?
??x
Discretization offers several benefits:
- **Reduced Overfitting**: By grouping similar values, models avoid fitting to noise.
- **Improved Generalization**: Models learn patterns within buckets rather than specific numerical values.
- **Interpretability**: Buckets make it easier to understand how features affect predictions.
- **Handling Outliers**: Extreme values can be safely grouped into one bucket without skewing results.

For example:
$$
\text{Before: } \$9000.50 \text{ vs } \$10000 \Rightarrow \text{Two separate inputs}
$$
$$
\text{After: } \$9000.50 \text{ and } \$10000 \Rightarrow \text{Same bucket}
$$
Code snippet showing a simple discretization logic:
```java
public class FeatureDiscretizer {
    public static int discretize(double value, double[] thresholds) {
        for (int i = 0; i < thresholds.length; i++) {
            if (value <= thresholds[i]) return i;
        }
        return thresholds.length;
    }
}
```
x??

---

---

