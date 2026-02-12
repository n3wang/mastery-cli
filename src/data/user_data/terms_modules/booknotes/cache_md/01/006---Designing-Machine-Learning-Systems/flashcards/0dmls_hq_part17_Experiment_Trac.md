# High-Quality Flashcards: 006---Designing-Machine-Learning-Systems_processed (Part 17)

**Starting Chapter:** Experiment Tracking and Versioning

---

#### Model Parallelism and Data Parallelism
Model parallelism involves splitting a neural network model across multiple machines, where each machine handles part of the model. Data parallelism splits the dataset across machines, with each machine training on its portion. These methods are not mutually exclusive and can be combined for better hardware utilization.
:p What is the relationship between model parallelism and data parallelism in distributed training?
??x
Model parallelism and data parallelism are complementary techniques in distributed machine learning. Model parallelism splits the model across machines, while data parallelism splits the data. Combining both allows for more efficient use of hardware resources, though it increases engineering complexity. For example, one machine might handle the forward and backward pass for a subset of layers, while multiple machines process different batches of data. This hybrid approach maximizes throughput and can be implemented using frameworks like TensorFlow or PyTorch.
x??

---

#### Experiment Tracking Overview
Experiment tracking involves logging details about machine learning experiments, such as metrics, hyperparameters, and artifacts. It helps in comparing models, debugging issues, and understanding how small changes affect performance.
:p Why is experiment tracking important in machine learning development?
??x
Experiment tracking is essential because it enables reproducibility, facilitates comparison between different models, and supports debugging. It allows developers to monitor training progress, identify bottlenecks, and understand how hyperparameter changes influence model behavior. Tools like Weights & Biases or MLflow provide dashboards and logging capabilities that help manage this process effectively. For instance, tracking metrics like loss, accuracy, and gradient norms over time can reveal overfitting or underfitting early in training.
x??

---

#### Key Metrics to Track During Training
During training, it's crucial to monitor metrics like loss curves, performance metrics (accuracy, F1), speed (steps per second or tokens per second), and system metrics (memory usage, CPU/GPU utilization). These help detect problems and evaluate model behavior.
:p What are the key metrics to track during training and why?
??x
Key metrics include:
- Loss curves for train and eval splits to detect overfitting or underfitting.
- Performance metrics (e.g., accuracy, F1, perplexity) to assess model effectiveness.
- Speed (steps/sec or tokens/sec) to measure efficiency.
- System metrics (memory, CPU/GPU utilization) to identify bottlenecks.
Tracking these helps in diagnosing issues such as loss stagnation or gradient explosion. For example, if the training loss decreases but validation loss increases, it suggests overfitting. Pseudocode for tracking metrics:
```java
logMetric("train_loss", loss);
logMetric("eval_accuracy", accuracy);
logMetric("gpu_utilization", gpuUsage);
```
x??

---

#### Versioning in Machine Learning
Versioning in ML involves tracking changes in both code and data to ensure reproducibility. While code versioning is standard, data versioning remains challenging due to data size and complexity.
:p Why is data versioning difficult in machine learning compared to code versioning?
??x
Data versioning is difficult because data is often much larger than code, making duplication impractical. Unlike code, where changes are tracked line-by-line, data changes are not easily compared. For example, a change in a single pixel in an image may not be detectable by line-by-line comparison. Tools like DVC (Data Version Control) use checksums to track data changes, but they don't support fine-grained diffs. Additionally, data privacy regulations like GDPR complicate versioning by mandating deletion of user data, making older versions unrecoverable.
x??

---

#### Reproducibility and Experiment Replication
Reproducibility ensures that experiments can be replicated exactly. Without proper versioning and tracking, even small changes in code or data can lead to inconsistent results.
:p How does proper experiment tracking and versioning improve reproducibility?
??x
Proper tracking and versioning ensure that experiments can be exactly reproduced by preserving code, data, hyperparameters, and environment settings. For example, a versioning tool can log the exact commit hash of the code, dataset version, and model parameters. This allows a researcher to recreate a previous run and validate results. Without versioning, a small code change or dataset modification can lead to inconsistent results, making it hard to trust model performance or debug issues.
x??

---

#### DVC as a Data Versioning Tool
DVC (Data Version Control) is a tool that helps manage data versioning by tracking changes via checksums. It supports integration with Git for code versioning and enables sharing and collaboration.
:p What is DVC and how does it help with data versioning?
??x
DVC is a tool for versioning machine learning data and models. It works by computing checksums of files and tracking only changes in those checksums. For example, if a dataset file changes, DVC detects the new checksum and logs it. This avoids storing full copies of large datasets. It integrates with Git for code versioning and supports collaboration workflows. Example:
```bash
dvc add dataset.csv
git add dataset.csv.dvc
git commit -m "Add dataset version"
```
This allows teams to track and share data versions effectively.
x??

---

#### Experiment Tracking Tools
Popular tools for experiment tracking include Weights & Biases, MLflow, and TensorBoard. These tools provide dashboards, artifact storage, and collaboration features.
:p What are some popular tools for experiment tracking in machine learning?
??x
Popular experiment tracking tools include:
- Weights & Biases: Offers real-time monitoring, artifact logging, and collaboration.
- MLflow: Provides experiment tracking, model management, and deployment capabilities.
- TensorBoard: Part of TensorFlow, used for visualizing training metrics.
These tools help log metrics, hyperparameters, and artifacts, and often integrate with versioning systems to ensure reproducibility.
x??

---

#### Debugging with Experiment Tracking
Experiment tracking supports debugging by providing visibility into training dynamics, such as loss curves, gradient norms, and weight values. It helps identify issues like dead neurons or exploding gradients.
:p How does experiment tracking aid in debugging machine learning models?
??x
Experiment tracking provides visibility into model behavior during training. For example, tracking gradient norms can help detect gradient explosion, while monitoring weight values can reveal dead neurons. If the loss curve plateaus or fluctuates wildly, it can indicate issues like poor learning rate or overfitting. Tools like Weights & Biases or MLflow allow users to visualize these metrics over time, enabling faster debugging and model tuning.
x??

---

#### Reproducibility in Machine Learning
Reproducibility in machine learning refers to the ability to obtain consistent results when running the same experiment under identical conditions. However, due to non-deterministic behavior introduced by frameworks and hardware, achieving reproducibility can be challenging. This lack of reproducibility forces practitioners to run many experiments to find a good model, treating ML as a black box rather than understanding why certain configurations work better than others.
:p What are the main challenges to achieving reproducibility in ML experiments?
??x
The main challenges include:
1. **Framework non-determinism**: Some libraries (e.g., TensorFlow, PyTorch) may produce different results across runs due to optimizations or random seed handling.
2. **Hardware variability**: GPUs, CPUs, and memory can influence execution order and floating-point precision.
3. **Environment differences**: Even slight variations in OS, Python version, or installed packages can affect outcomes.
To mitigate this:
```java
// Example pseudo-code for setting deterministic behavior
set_random_seed(42);
set_deterministic_ops(true); // e.g., in PyTorch or TensorFlow
```
This ensures that each run with the same seed produces the same output.
x??

---

#### Model Evaluation Before Deployment
Before deploying a model, it's essential to evaluate its performance using appropriate metrics and methods. In real-world applications, ground truth labels are often unavailable during production, making evaluation difficult. For example, a model detecting intrusions on drones cannot easily measure missed detections without ground truth data.
:p Why is pre-deployment model evaluation critical for ML projects?
??x
Pre-deployment evaluation helps ensure that:
1. The model meets business requirements.
2. It performs well on relevant metrics (e.g., accuracy, precision, recall).
3. It avoids costly mistakes in production where fixes are harder to implement.
4. It enables informed decisions about whether to proceed with deployment.
For tasks like recommendation systems, user behavior such as clicks can be used to approximate ground truth:
$$
\text{Click-through rate} = \frac{\text{Number of clicks}}{\text{Total number of impressions}}
$$
However, this introduces bias since users may not click even if they would have preferred the item.
x??

---

#### Baselines in Model Evaluation
When evaluating machine learning models, it’s crucial to compare against baselines — simple, commonly used models or rules that serve as a minimum standard of performance. These provide a reference point to determine whether a new model offers meaningful improvements.
:p Why are baselines important in model evaluation?
??x
Baselines are important because:
1. They offer a minimal performance threshold to beat.
2. They help avoid overfitting or false confidence in complex models.
3. They allow comparison between different approaches.
Example baselines include:
- **Random guessing**: Predicting class labels randomly.
- **Majority class predictor**: Always predicting the most frequent class.
- **Simple heuristics**: Rules derived from domain knowledge.

For instance, in a binary classification task:
$$
\text{Accuracy}_{\text{baseline}} = \max(p_{\text{class1}}, p_{\text{class2}})
$$
Where $p_{\text{class1}}$ and $p_{\text{class2}}$ are the proportions of each class in the dataset.
x??

---

#### Offline Evaluation Metrics
Offline evaluation involves testing a model using historical data before deployment. Common metrics include accuracy, precision, recall, F1-score, ROC-AUC, and others depending on the problem type (classification, regression, etc.). These metrics help assess how well the model generalizes.
:p What are typical offline evaluation metrics used in classification tasks?
??x
Typical offline evaluation metrics for classification include:
- **Accuracy**: Fraction of correct predictions.
$$
\text{Accuracy} = \frac{TP + TN}{TP + TN + FP + FN}
$$
- **Precision**: Proportion of true positives among predicted positives.
$$
\text{Precision} = \frac{TP}{TP + FP}
$$
- **Recall (Sensitivity)**: Proportion of true positives among actual positives.
$$
\text{Recall} = \frac{TP}{TP + FN}
$$
- **F1-Score**: Harmonic mean of precision and recall.
$$
F1 = 2 \cdot \frac{\text{Precision} \cdot \text{Recall}}{\text{Precision} + \text{Recall}}
$$
These metrics are calculated using confusion matrix components:
- $TP$: True Positive
- $TN$: True Negative
- $FP$: False Positive
- $FN$: False Negative

Code example:
```python
from sklearn.metrics import accuracy_score, precision_score, recall_score, f1_score

y_true = [0, 1, 1, 0, 1]
y_pred = [0, 1, 0, 0, 1]

acc = accuracy_score(y_true, y_pred)
prec = precision_score(y_true, y_pred)
rec = recall_score(y_true, y_pred)
f1 = f1_score(y_true, y_pred)
```
x??

---

#### Monitoring in Production Systems
Once a model is deployed, monitoring becomes essential to detect performance degradation or concept drift. Unlike offline evaluation, production monitoring relies on indirect signals such as changes in prediction patterns, user feedback, or system logs.
:p How does monitoring help in maintaining model performance in production?
??x
Monitoring helps in:
1. Detecting performance degradation over time.
2. Identifying concept drift — when the distribution of input data shifts.
3. Tracking user engagement or satisfaction (e.g., click-through rates).
4. Alerting teams when models fail to meet SLAs.

Example monitoring metrics:
- **Prediction accuracy over time**
- **Latency of inference**
- **Number of failed predictions**
- **User feedback signals (e.g., thumbs down, reports)**

Pseudocode for a simple monitoring system:
```java
if (prediction_accuracy < threshold) {
    alert("Model performance degraded!");
}
```
x??

---

#### Continuous Learning in Production
Continuous learning allows models to adapt to new data without full retraining. This is particularly useful when real-time feedback is available, such as in recommendation systems or fraud detection.
:p How does continuous learning improve deployed models?
??x
Continuous learning improves deployed models by:
1. **Updating model weights** with fresh data.
2. **Adapting to changing data distributions** (concept drift).
3. **Reducing latency** compared to full retraining cycles.
4. **Improving long-term performance** through incremental updates.

Example approach:
- Use online learning algorithms like Stochastic Gradient Descent (SGD).
- Retrain model periodically with new batches of data.
- Implement feedback loops from user interactions.

Code snippet:
```python
for batch in data_stream:
    model.partial_fit(X_batch, y_batch)  # Incremental update
```
x??

---

#### Random Baseline
In model evaluation, a random baseline represents the expected performance if a model simply guesses labels at random. For a classification task with imbalanced classes, the baseline performance can be calculated based on the distribution of labels. For example, if a task has two classes, NEGATIVE (90%) and POSITIVE (10%), predicting randomly according to the label distribution results in an F1 score of 0.1. This baseline is critical for understanding whether a model is actually learning or just performing at chance level.
:p What is the F1 score for a random model that predicts according to the label distribution in a task where NEGATIVE appears 90% of the time and POSITIVE 10%?
??x
In this case, the F1 score is approximately 0.1. This is because the model is essentially predicting the majority class most of the time, leading to high precision but low recall. The F1 score is computed as the harmonic mean of precision and recall, both of which are low due to the imbalance. For example, if the model predicts NEGATIVE 90% of the time, it will have high precision (since most predictions are correct) but very low recall (since it misses all the POSITIVE cases). The resulting F1 score is low, indicating poor performance compared to even a basic model.
$$
F1 = 2 \cdot \frac{\text{precision} \cdot \text{recall}}{\text{precision} + \text{recall}}
$$
```java
// Example: Calculate F1 score for a random baseline
double precision = 0.9; // assuming 90% accuracy for majority class
double recall = 0.0;    // assuming 0% recall for minority class
double f1 = 2 * (precision * recall) / (precision + recall);
// f1 will be 0 because recall is 0
```
x??

---

#### Existing Solutions Baseline
In many applications, ML models are designed to replace existing systems—such as business logic or third-party tools. Comparing the new model to these existing solutions is critical. Even if the model is not superior in performance, it might still be useful if it's easier, cheaper, or more scalable to deploy. For example, a model that performs slightly worse than an existing if/else logic system may still be preferred if it's much easier to maintain.
:p How does comparing to existing solutions help in evaluating an ML model?
??x
Comparing a model to existing solutions helps determine whether the new system is useful in practice. Even if the model doesn’t outperform the existing solution, it may still be valuable if it reduces complexity, cost, or maintenance. For example, a model replacing a rule-based system might be preferred if it's easier to update or deploy, even if it's slightly less accurate.
```java
// Example: Compare model to existing system
double modelScore = 0.85;
double existingScore = 0.90;
if (modelScore > existingScore) {
    System.out.println("Model outperforms existing system");
} else {
    System.out.println("Model does not outperform existing system, but may be preferred for other reasons");
}
```
x??

---

