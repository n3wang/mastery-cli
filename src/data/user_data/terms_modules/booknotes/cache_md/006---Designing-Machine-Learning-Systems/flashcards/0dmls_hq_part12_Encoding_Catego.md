# High-Quality Flashcards: 006---Designing-Machine-Learning-Systems_processed (Part 12)

**Starting Chapter:** Encoding Categorical Features

---

#### Hashing Trick for Categorical Encoding
The hashing trick is a method used to encode categorical features into a fixed-size vector space without needing to know the total number of categories beforehand. This is especially useful in production systems where new categories (e.g., new brands, user accounts) are continuously introduced. Instead of assigning a unique index to each category, a hash function maps each category to an index within a predefined hash space. For example, if we use a hash space of $2^{18} = 262,144$ possible indices, all categories—known or unknown—are mapped to indices between $0$ and $262,143$. This avoids the need for a special "UNKNOWN" category and allows models to handle unseen data gracefully.

:p What is the main advantage of using the hashing trick for encoding categorical features?
??x
The main advantage of the hashing trick is that it allows encoding of categorical features into a fixed-size space without needing to predefine all possible categories. This is crucial in production environments where new categories (e.g., new brands on Amazon) are constantly introduced. It avoids the need for an "UNKNOWN" category and prevents model crashes due to unseen categories. Hashing also reduces memory usage and computational overhead by limiting the number of unique indices.
$$
\text{Index} = \text{hash(category)} \mod 2^k
$$
where $k$ is the number of bits in the hash space.
```java
int hashIndex = Math.abs(category.hashCode()) % (1 << 18); // 2^18 = 262144
```
x??

---

#### Handling New Categories in Production
In production systems, categorical features often evolve over time. For example, new brands are added to Amazon, new accounts are created on platforms, and new domains appear on websites. If a model is trained with a fixed set of categories, it fails when encountering new ones unless special handling (like an "UNKNOWN" category) is implemented. However, using "UNKNOWN" categories can lead to poor model performance since the model doesn't learn how to treat them. The hashing trick provides a scalable and robust solution by assigning each category to a fixed index regardless of whether it was seen during training.

:p How does the hashing trick help in handling new categories in production systems?
??x
The hashing trick helps by mapping each category to a fixed index within a predetermined hash space, regardless of whether the category was seen during training. This allows models to handle unseen categories without crashing. Unlike a fixed "UNKNOWN" category, which may cause poor recommendations, hashing ensures that new categories are encoded in a way that doesn't bias the model. It is especially useful in environments with continual learning, where models are updated with new data over time.
$$
\text{Encoded Index} = \text{hash(feature)} \mod \text{hash\_space\_size}
$$
x??

---

#### Hashing Trick in Industry Tools
The hashing trick is widely adopted in machine learning frameworks and tools such as Vowpal Wabbit, scikit-learn, TensorFlow, and gensim. It is a core technique in handling high-cardinality categorical features, especially in settings like online learning and recommendation systems. It is often considered a "hacky" solution by academics due to its empirical nature, but its effectiveness in production systems makes it indispensable. It enables scalable and robust handling of categorical features, even when the number of categories is unknown or changes over time.

:p Why is the hashing trick widely used in industry tools despite being dismissed by academics?
??x
The hashing trick is widely used in industry tools because it provides a practical, scalable solution to a common problem: encoding high-cardinality categorical features without knowing all possible categories in advance. While academics may view it as a heuristic or "hacky," its real-world effectiveness in production systems—such as in recommendation engines, spam detection, and online learning—makes it essential. Tools like Vowpal Wabbit, scikit-learn, and TensorFlow incorporate it to handle large-scale data efficiently.
x??

---

#### Feature Crossing
Feature crossing is a technique used in machine learning to combine two or more features to generate new features, which helps model non-linear relationships. It's particularly useful for models that struggle with non-linear patterns, such as linear or logistic regression, and tree-based models. However, feature crossing can lead to a combinatorial explosion in feature space and increase the risk of overfitting.

:p What is the main purpose of feature crossing in machine learning?
??x
The main purpose of feature crossing is to model non-linear relationships between features by creating new composite features. For example, combining "marital status" and "number of children" into a new feature like "married with 2 children" allows the model to better capture complex interactions that simple linear combinations might miss. This is especially important for models that are not inherently good at capturing non-linear dependencies.
x??

---

#### Feature Crossing and Overfitting
When using feature crossing, the number of features can grow exponentially. For instance, if one feature has 100 possible values and another has 100, their cross results in 10,000 unique combinations. This can cause models to overfit the training data due to too many parameters relative to available data.

:p Why does feature crossing increase the risk of overfitting?
??x
Feature crossing increases the number of features exponentially, leading to a much larger feature space. If the dataset isn't large enough to support this many features, models may overfit by memorizing the training examples rather than generalizing well. This is especially problematic in linear models or tree-based models that don't inherently regularize well.
x??

---

#### Discrete Positional Embeddings
In models like Transformers, where inputs are processed in parallel, positional information must be explicitly encoded. Discrete positional embeddings work similarly to word embeddings, where each position index maps to a learned vector of fixed size. These embeddings are typically initialized randomly and updated during training.

:p How are discrete positional embeddings used in models like Transformers?
??x
Discrete positional embeddings assign a unique learned vector to each position in a sequence. For example, in a sequence of length 8, each of the 8 positions gets a unique embedding vector (e.g., 0 → [0.1, 0.5], 1 → [0.3, 0.7], etc.). These are summed with token embeddings before being fed into the model. This allows the model to distinguish between positions without relying on sequential processing.
x??

---

#### Fixed Positional Embeddings (Fourier Features)
Fixed positional embeddings use sine and cosine functions to encode position information. In the original Transformer paper, even indices use sine and odd indices use cosine. This approach avoids the need for learned embeddings and provides a fixed representation based on mathematical functions.

:p What is the mathematical basis for fixed positional embeddings?
??x
Fixed positional embeddings use sine and cosine functions to encode position information. For a position $p$ and embedding dimension $d$, the $d$-th element of the embedding is defined as:
$$
\text{PE}(p, d) = 
\begin{cases}
\sin\left(\frac{p}{10000^{2d/D}}\right) & \text{if } d \text{ is even} \\
\cos\left(\frac{p}{10000^{2d/D}}\right) & \text{if } d \text{ is odd}
\end{cases}
$$
where $D$ is the total embedding dimension. This is known as Fourier features and allows continuous position encodings.
x??

---

#### Code Example: Positional Encoding Implementation
Here is a Python implementation of fixed positional embeddings using sine and cosine functions, similar to those used in the Transformer model.

```python
import numpy as np

def get_positional_encoding(positions, embedding_dim):
    # positions: list or array of integers
    # embedding_dim: integer, dimension of the embedding vector
    pe = np.zeros((len(positions), embedding_dim))
    div_term = np.exp(np.arange(0, embedding_dim, 2) * -(np.log(10000.0) / embedding_dim))
    
    for pos in positions:
        pe[pos, 0::2] = np.sin(pos * div_term)
        pe[pos, 1::2] = np.cos(pos * div_term)
    return pe

# Example usage
positions = [0, 1, 2, 3]
embedding_dim = 4
encoding = get_positional_encoding(positions, embedding_dim)
print(encoding)
```
:p What does the above code snippet demonstrate?
??x
This code snippet demonstrates how to compute fixed positional embeddings using sine and cosine functions. For a given set of positions and an embedding dimension, it calculates the positional encodings using the formula:
$$
\text{PE}(p, 2i) = \sin\left(p / 10000^{2i/D}\right)
$$
$$
\text{PE}(p, 2i+1) = \cos\left(p / 10000^{2i/D}\right)
$$
It is commonly used in models like Transformers to inject order information into input sequences.
x??

---

#### Data Leakage in Machine Learning
Data leakage occurs when information from the target variable (label) inadvertently enters the feature set used for training a model. This leads to overly optimistic performance on test sets, but the model fails in production because the "leaked" information is not available during inference.

:p What is data leakage and why is it dangerous in machine learning models?
??x
Data leakage happens when a model learns patterns from information that should not be available during real-world inference. For example, in predicting lung cancer from CT scans, if hospital A uses a different scan machine for suspected cases, a model might learn to distinguish scans based on machine type rather than cancer indicators. When deployed to hospital B using different machines, the model fails because it relies on leaked information. This leads to high training/test performance but poor production performance.

$$
\text{Leakage} = \text{Information from } y \text{ appearing in } X
$$

This can be subtle and hard to detect, especially in complex datasets. A common symptom is a large gap between training and validation performance.

```java
// Example: Identifying leakage in feature engineering
public class DataLeakageDetector {
    public boolean isLeaked(String feature, String label) {
        // If feature changes based on label, it's likely leaked
        // e.g., scan machine ID changes based on doctor diagnosis
        return feature.contains("machine_id") && label.contains("diagnosis");
    }
}
```
x??

---

#### Example of Data Leakage in Medical Imaging
In medical imaging, data leakage often occurs when metadata or preprocessing steps encode information about the label. For instance, a model trained to detect lung cancer may learn to recognize differences in CT scan quality or machine-specific artifacts, which are tied to the label (e.g., diagnosis).

:p How does data leakage manifest in medical imaging tasks like CT scan classification?
??x
In CT scan classification, if a hospital uses different machines for suspected cancer cases, the model may learn to distinguish scans by machine type instead of actual cancer features. The model performs well on data from the same hospital (where the same machine is used) but fails on data from another hospital using different machines. This is because the scan machine used is a proxy for the label, which is not available during inference.

$$
\text{Feature} = f(\text{Scan Machine}, \text{Cancer Indicators})
$$

The model learns $f(\text{Scan Machine})$ as a strong predictor, even though it's not a true indicator of cancer.

```java
// Pseudocode for detecting leakage in scan metadata
function detectLeakage(scanMetadata, labels) {
    for each scan in scanMetadata {
        if (scan.machineID in labels) {
            // This suggests leakage
            return true;
        }
    }
    return false;
}
```
x??

---

#### Detecting Data Leakage in Features
Detecting data leakage requires careful analysis of features to ensure they are independent of the label at inference time. Features that change with the label or are derived from the label directly are problematic.

:p What are the key indicators of data leakage in feature sets?
??x
Key indicators include:
1. Features that are derived directly from the label (e.g., using label values to compute features).
2. Features that vary based on external conditions tied to the label (e.g., scan machine used).
3. Features that are only present in certain subsets of data that correlate with labels.

For example, if a feature like `scan_quality_score` is computed using the diagnosis label, it's a leakage. The model will overfit to this artificial correlation.

$$
\text{Leaked Feature} = g(\text{Label}) \quad \text{where } g \text{ is a function}
$$

```java
// Example of problematic feature creation
public class ProblematicFeature {
    public double computeScore(String diagnosis) {
        // This is leakage if used in training
        if (diagnosis.equals("cancer")) return 1.0;
        else return 0.0;
    }
}
```
x??

---

#### Preventing Data Leakage in Model Development
Prevention of data leakage involves ensuring that features used in training are not influenced by the label or future information. Techniques include careful data splitting, feature engineering without label information, and thorough validation.

:p How can data leakage be prevented during model development?
??x
Prevention techniques include:
1. **Proper data splitting**: Ensure training and test sets are independent.
2. **Feature engineering without label knowledge**: Do not compute features using label values.
3. **Cross-validation with time-aware splits**: For time-series or sequential data.
4. **Audit feature dependencies**: Check if features change with label or are derived from it.

$$
\text{Training Features} \perp \text{Label} \quad \text{(Independence)}
$$

```java
// Example of safe feature engineering
public class SafeFeatureExtractor {
    public double[] extractFeatures(String scanImage, String patientHistory) {
        // Do not use diagnosis or outcome in feature extraction
        return extractImageFeatures(scanImage); // Safe
    }
}
```
x??

---

#### Impact of Data Leakage on Model Performance
Data leakage leads to misleadingly high performance metrics during training and testing but causes dramatic drops in production. This is because the model relies on information not available during inference.

:p Why does data leakage cause a model to fail in production despite good test performance?
??x
Data leakage makes a model appear highly accurate on test data because it has learned spurious correlations with leaked information. However, this information is not present during inference, so the model fails. For example, a model trained to predict cancer might learn that machine type correlates with diagnosis, but since machine type isn't known during inference, the model cannot generalize.

$$
\text{Training Accuracy} \gg \text{Production Accuracy}
$$

This mismatch is a red flag for data leakage.

```java
// Simulate leakage effect
double trainAcc = 0.95;
double prodAcc = 0.30;
if (trainAcc - prodAcc > 0.5) {
    System.out.println("Potential data leakage detected!");
}
```
x??

---

---

