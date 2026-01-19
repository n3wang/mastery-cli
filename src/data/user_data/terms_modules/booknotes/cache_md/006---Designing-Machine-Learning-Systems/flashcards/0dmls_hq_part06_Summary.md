# High-Quality Flashcards: 006---Designing-Machine-Learning-Systems_processed (Part 6)

**Starting Chapter:** Summary

---

#### Data Engineering Fundamentals in ML
Data engineering forms the backbone of machine learning systems by ensuring that data is properly collected, stored, and processed for model training and deployment. As ML models become more data-intensive, understanding how to manage large volumes of data efficiently becomes crucial. The success of modern systems like AlexNet, BERT, and GPT underscores the importance of data availability over algorithmic sophistication alone.

:p What is the role of data engineering in building intelligent systems?
??x
Data engineering ensures that data is available, clean, and structured in a way that supports machine learning workflows. It involves handling data from various sources, choosing appropriate formats (e.g., Parquet, CSV), and managing schema changes to prevent downstream failures. As ML models rely heavily on data, engineers must design systems that scale and adapt to evolving data needs without breaking existing pipelines.
x??

---

#### Importance of Large-Scale Data in Modern ML
Modern machine learning models—especially deep learning architectures—have demonstrated that performance improves significantly with access to large datasets. This trend is highlighted in seminal works like "The Unreasonable Effectiveness of Data" and "The Bitter Lesson," which emphasize that data, not clever algorithms, drives progress in AI.

:p How does data size influence the performance of modern ML models?
??x
Modern ML systems like BERT and GPT require massive datasets (e.g., billions of words) to achieve high performance. The availability of large-scale data allows models to learn complex patterns and generalize better. As shown in "The Bitter Lesson," relying on domain-specific knowledge or handcrafted features is less effective than leveraging data-driven learning.
x??

---

#### Apache Parquet Format for Data Storage
Parquet is a columnar storage format optimized for big data systems like Apache Spark and AWS Redshift. It supports efficient compression, predicate pushdown, and schema evolution, making it ideal for storing large volumes of structured data.

:p Why is Apache Parquet preferred for storing large datasets in data lakes or warehouses?
??x
Parquet stores data in a columnar format, enabling efficient compression and fast read performance for analytical queries. It supports schema evolution and integrates well with big data frameworks. For example, Amazon Redshift introduced support for exporting data in Parquet format, allowing easy sharing across platforms.
x??

---

#### Sampling Techniques in Training Data
Sampling techniques are essential methods used to select a subset of data from a larger dataset for training machine learning models. These techniques ensure that the selected samples are representative of the overall data distribution. Common sampling methods include random sampling, stratified sampling, and systematic sampling. Random sampling picks samples uniformly at random, while stratified sampling ensures representation from each class or category in the dataset. Systematic sampling selects every $k^{th}$ item from a sorted list.

:p What are the main goals of sampling techniques in ML training data?
??x
The main goals of sampling techniques are to create a representative subset of the data that reflects the underlying distribution, reduce computational costs, and prevent overfitting by ensuring diversity in training examples. For example, in stratified sampling, if a dataset has 60% class A and 40% class B, the sample should maintain this ratio to avoid bias. This helps in building models that generalize well to unseen data.
$$
\text{Stratified Sample Size} = \frac{N_i}{N} \times n
$$
Where $N_i$ is the number of items in class $i$, $N$ is the total population size, and $n$ is the sample size.
```java
// Pseudocode for stratified sampling
List<List<DataPoint>> strata = groupByClass(data);
List<DataPoint> sample = new ArrayList<>();
for (List<DataPoint> classGroup : strata) {
    int sampleSize = (int) (classGroup.size() * ratio);
    sample.addAll(randomSample(classGroup, sampleSize));
}
```
x??

---

#### Class Imbalance Problem
Class imbalance happens when the distribution of classes in a dataset is not uniform, with some classes having significantly more samples than others. This can cause models to become biased towards the majority class, leading to poor performance on minority classes. Techniques to address this include oversampling the minority class, undersampling the majority class, or using algorithms that are robust to imbalance.

:p How does class imbalance affect model training?
??x
Class imbalance skews model predictions toward the majority class, as most algorithms optimize for overall accuracy. For instance, if a dataset has 90% of samples labeled as "normal" and only 10% as "abnormal", a model might predict "normal" for all inputs and still achieve 90% accuracy, but fail to detect abnormalities. Strategies include SMOTE (Synthetic Minority Oversampling Technique), class weighting, or using anomaly detection techniques.
$$
\text{Class Weight} = \frac{\text{Total Samples}}{\text{Number of Samples in Class} \times \text{Number of Classes}}
$$
```java
// Pseudocode for applying class weights
double[] weights = new double[numClasses];
for (int i = 0; i < numClasses; i++) {
    weights[i] = totalSamples / (classCounts[i] * numClasses);
}
```
x??

---

#### Training, Validation, and Test Splits
The train, validation, and test splits are used to evaluate model performance and prevent overfitting. The training set is used to train the model, the validation set to tune hyperparameters, and the test set to assess final performance. Proper splitting ensures that the model generalizes well to unseen data.

:p Why is it important to split data into train, validation, and test sets?
??x
Splitting data into train, validation, and test sets allows for unbiased evaluation of model performance. The training set is used to learn patterns, the validation set to tune hyperparameters and detect overfitting, and the test set to provide an unbiased final performance estimate. A typical split is 70% training, 15% validation, and 15% test.
$$
\text{Train Size} = 0.7 \times \text{Total Samples}, \quad \text{Validation Size} = 0.15 \times \text{Total Samples}
$$
```java
// Pseudocode for splitting data
List<DataPoint> trainSet = sample(data, 0.7);
List<DataPoint> valSet = sample(data, 0.15);
List<DataPoint> testSet = sample(data, 0.15);
```
x??

---

#### Iterative Process of Training Data Creation
Training data creation is not a one-time process but an iterative one. As models evolve, so does the need for better or updated training data. Feedback from model performance and new data sources can lead to continuous refinement of datasets, improving model accuracy and robustness.

:p Why is training data creation considered iterative?
??x
Training data creation is iterative because models evolve over time, and new insights or data may require adjustments to the dataset. For example, if a model performs poorly on a specific category, new data or re-labeling may be needed. This process ensures that the training data remains relevant and effective for model improvement.
$$
\text{Feedback Loop} = \text{Model Performance} \rightarrow \text{Data Refinement} \rightarrow \text{Re-training}
$$
```java
// Pseudocode for iterative data refinement
while (modelPerformance < threshold) {
    updateTrainingData();
    retrainModel();
    modelPerformance = evaluateModel();
}
```
x??

---

---

#### Data Bias in Machine Learning
Data bias refers to systematic errors or distortions in data that can lead to incorrect conclusions or model behavior. These biases can originate from how data is collected, sampled, or labeled, and can be deeply embedded in historical datasets. When ML models are trained on biased data, they often perpetuate or even amplify these biases.

:p What are the common sources of data bias in ML workflows?
??x
Common sources of data bias include:
- **Collection bias**: When data is gathered in a way that does not represent the full population (e.g., using only data from a specific region).
- **Sampling bias**: When samples are not representative of the target population (e.g., oversampling one group).
- **Labeling bias**: When human annotators introduce subjective judgments into labels.
- **Historical bias**: When past decisions or societal patterns are encoded in the data, such as gender or racial bias in hiring datasets.

Example: If a dataset used to train a hiring model only includes resumes from top-tier universities, the model may learn to favor candidates from those institutions, even if it's not a requirement for the job.

```java
// Pseudocode: Example of sampling bias in dataset creation
Dataset fullData = loadAllRealWorldData();
Dataset biasedSample = fullData.filterBy("university", "topTier");
Model model = train(biasedSample);
```
x??

---

#### Sampling in Machine Learning
Sampling is the process of selecting a subset of data from a larger dataset to train or evaluate a model. It is essential when full data is not accessible or when computational constraints prevent processing all data. Sampling can be applied at various stages: creating training/validation/test splits, monitoring system behavior, or conducting experiments.

:p Why is sampling important in ML workflows?
??x
Sampling is important because:
- It allows models to be trained on manageable subsets of data when full datasets are too large.
- It enables fast experimentation by testing models on smaller datasets before scaling up.
- It helps in creating representative splits for training, validation, and testing to ensure generalization.
- It reduces computational costs and time needed for training and evaluation.

Example: When training a model to detect fraudulent transactions, you may sample 10% of all transactions to build an initial model and then scale up once the model shows promise.

```java
// Pseudocode: Sampling for train/validation/test split
Dataset data = loadDataset();
Dataset trainData, valData, testData;
trainData = data.sample(0.7); // 70% for training
valData = data.sample(0.15);  // 15% for validation
testData = data.sample(0.15); // 15% for testing
```
x??

---

#### Efficient Sampling for Model Development
Sampling allows practitioners to experiment quickly and efficiently with models. Instead of training on full datasets, small samples can be used to validate ideas and reduce iteration time. This is especially useful in early-stage experimentation or A/B testing.

:p How can sampling improve efficiency in ML model development?
??x
Sampling improves efficiency by:
- **Speeding up experimentation**: Training on a small subset allows faster iterations.
- **Reducing computational cost**: Lower memory and compute requirements for testing.
- **Early validation**: Helps determine whether a model is worth scaling before full training.

Example: A data scientist might train a model on 10% of the data to see if it's promising before investing in full training.

```java
// Pseudocode: Quick experiment with sample data
Dataset fullData = loadDataset();
Dataset sampleData = fullData.sample(0.1);
Model model = train(sampleData);
if (model.performance > threshold) {
    trainOnFullData(fullData);
}
```
x??

---

---

