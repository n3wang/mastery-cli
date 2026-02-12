# High-Quality Flashcards: 006---Designing-Machine-Learning-Systems_processed (Part 16)

**Starting Chapter:** Ensembles

---

#### Ensemble Methods Overview
Ensemble methods combine predictions from multiple models (called base learners) to improve performance over individual models. The idea is that by aggregating predictions from diverse models, we can reduce overfitting, improve accuracy, and generalize better on unseen data. Common ensemble techniques include bagging, boosting, and stacking. These methods are widely used in machine learning competitions, with 20 out of 22 top Kaggle solutions in 2021 using ensembles.

:p What are the main advantages of using ensemble methods?
??x
Ensemble methods offer several advantages:
1. **Improved Accuracy**: By combining multiple models, ensembles often outperform individual models.
2. **Reduced Overfitting**: Techniques like bagging reduce variance and stabilize predictions.
3. **Better Generalization**: Ensembles can generalize well on unseen data.
4. **Robustness**: Even if one model fails, others may still make correct predictions.
5. **Flexibility**: Different models (e.g., trees, neural networks, boosting) can be combined to form an ensemble.
For example, in a spam classification task, if three classifiers vote on an email, and at least two predict SPAM, the ensemble predicts SPAM.

Example code for majority voting in Java:
```java
int spamVotes = 0;
int notSpamVotes = 0;
for (int prediction : predictions) {
    if (prediction == 1) spamVotes++;
    else notSpamVotes++;
}
String finalPrediction = (spamVotes > notSpamVotes) ? "SPAM" : "NOT SPAM";
```
x??

---

#### Bagging (Bootstrap Aggregating)
Bagging is a technique that reduces variance in models by training multiple models on different bootstrapped samples of the dataset. Each model is trained independently, and their predictions are combined (e.g., by averaging for regression or majority voting for classification). It is particularly effective for unstable models like decision trees.

:p How does bagging work and what is its purpose?
??x
Bagging works by:
1. Sampling the original dataset with replacement to create multiple bootstrap samples.
2. Training a model (e.g., decision tree) on each bootstrap sample.
3. Combining predictions from all models (e.g., average for regression, majority vote for classification).

The purpose of bagging is to:
- Reduce overfitting by averaging out noise in individual models.
- Improve stability and generalization.
- Mitigate the effect of high variance in unstable models like decision trees.

Example pseudocode:
```pseudocode
for i = 1 to n_models:
    bootstrap_sample = sample_with_replacement(dataset)
    model[i] = train_model(bootstrap_sample)
final_prediction = average(model[1], model[2], ..., model[n])
```
x??

---

#### Boosting
Boosting is an ensemble method where weak learners are trained sequentially, with each learner focusing more on examples that previous learners misclassified. It reduces bias by combining weak learners into a strong learner, often using weighted combinations. Popular boosting algorithms include Gradient Boosting and XGBoost.

:p What is the core idea behind boosting algorithms?
??x
The core idea of boosting is to train weak learners sequentially, where each learner focuses on correcting the mistakes of the previous ones. This is done by:
1. Training a weak learner (e.g., shallow decision tree) on the original dataset.
2. Re-weighting the training samples — giving higher weight to misclassified samples.
3. Training the next learner on the reweighted dataset.
4. Combining all learners into a strong learner, where each weak learner has a weight based on its performance.

Boosting reduces bias and improves accuracy by iteratively refining the model.

Example pseudocode:
```pseudocode
for t = 1 to T:
    weight = train_weak_learner(dataset, weights)
    update weights based on misclassifications
    combine weak learners into strong learner
```
x??

---

#### Stacking
Stacking is a technique where multiple base learners are trained on the training data, and their predictions are used to train a meta-learner. The meta-learner learns how to best combine the outputs of base learners to make a final prediction. This method helps improve generalization and performance.

:p How does stacking work in ensemble methods?
??x
Stacking works in two stages:
1. **Base Learners**: Train multiple models (e.g., decision trees, SVMs, neural networks) on the training data.
2. **Meta-Learner**: Use the predictions from base learners as input features to train a meta-learner (e.g., logistic regression or linear regression) to produce the final prediction.

The meta-learner learns how to optimally combine the predictions of base learners.

Example pseudocode:
```pseudocode
// Stage 1: Train base learners
for each base_learner in learners:
    base_learner.fit(X_train, y_train)
    predictions = base_learner.predict(X_train)

// Stage 2: Train meta-learner
meta_learner.fit(predictions, y_train)
final_prediction = meta_learner.predict(test_predictions)
```
x??

---

#### Hyperparameter Tuning in Machine Learning
Hyperparameter tuning is the process of optimizing model parameters that are not learned during training but are set prior to training, such as learning rate, batch size, number of layers, and dropout probability. These parameters significantly influence model performance. For instance, a model with strong architecture but poorly tuned hyperparameters may underperform compared to a simpler model with well-tuned hyperparameters. This is a core part of AutoML, where automation is used to search for optimal hyperparameters instead of manual trial-and-error.

:p What is the goal of hyperparameter tuning?
??x
The goal of hyperparameter tuning is to find the optimal set of hyperparameters for a given model within a defined search space, evaluated on a validation set to maximize performance while avoiding overfitting to the test set.
x??

---

#### Bayesian Optimization in Hyperparameter Tuning
Bayesian optimization is a probabilistic approach used to find optimal hyperparameters. It builds a probabilistic model of the objective function (e.g., validation loss) and uses it to select the most promising hyperparameter settings to evaluate next. It is more efficient than grid or random search, especially when evaluations are costly.

:p What is the advantage of Bayesian optimization over grid or random search?
??x
Bayesian optimization is more efficient because it intelligently selects hyperparameter combinations based on previous results, reducing the number of evaluations needed to find a good solution, especially when model evaluation is expensive.
x??

---

#### Importance of Validation vs Test Sets in Hyperparameter Tuning
When tuning hyperparameters, it is critical to use a validation set to select the best configuration. The test set must be kept untouched until final evaluation to avoid overfitting to it. Using the test set for tuning introduces bias and can lead to misleading performance estimates.

:p Why must the test set not be used for hyperparameter tuning?
??x
Using the test set for hyperparameter tuning leads to overfitting to the test data, which results in an inflated and misleading performance estimate. The test set should only be used once to report the final model performance.
x??

---

#### Example of Hyperparameter Tuning with scikit-learn
In scikit-learn, hyperparameter tuning can be performed using `GridSearchCV` or `RandomizedSearchCV`. These tools automate the process of evaluating multiple hyperparameter combinations and selecting the best model based on cross-validation scores.

:p How can hyperparameter tuning be implemented in scikit-learn?
??x
Using `GridSearchCV` or `RandomizedSearchCV` from scikit-learn, you can define a parameter grid, specify a model, and perform cross-validation to select the best hyperparameters. For example:

```python
from sklearn.model_selection import GridSearchCV
from sklearn.ensemble import RandomForestClassifier

param_grid = {
    'n_estimators': [100, 200],
    'max_depth': [3, 5, 7]
}
clf = RandomForestClassifier()
grid_search = GridSearchCV(clf, param_grid, cv=5)
grid_search.fit(X_train, y_train)
best_model = grid_search.best_estimator_
```
This approach automates the search for optimal hyperparameters.
x??

---

#### Quantization as a Hyperparameter
Quantization, such as mixed-precision or fixed-point representation, can be treated as a hyperparameter in model training. It affects both model size and performance and can be tuned to optimize for speed or memory usage.

:p Can quantization be considered a hyperparameter? Why or why not?
??x
Yes, quantization levels like mixed-precision or fixed-point can be considered hyperparameters because they directly influence model performance and efficiency. Tuning them can lead to better trade-offs between accuracy and speed or memory usage.
x??

---

#### Performance Estimation in NAS
In NAS, performance estimation is crucial because evaluating each candidate architecture by training it from scratch is computationally expensive. Therefore, surrogate models or estimation strategies are used to approximate performance.

:p What is the purpose of performance estimation in NAS?
??x
Performance estimation strategies aim to quickly evaluate the quality of a candidate architecture without retraining it. Common methods include:
- **Proxy models**: Using a small subset of training data or early stopping to estimate performance.
- **Gradient-based estimation**: Using gradients of the loss with respect to architecture parameters.
- **Neural architecture estimation networks (NAS-Nets)**: Using a separate model to predict performance.

These estimations allow efficient exploration of the search space and reduce computational cost.
x??

---

#### Search Strategies in NAS
Search strategies in NAS define how to navigate the discrete search space. While exhaustive search is infeasible, methods like reinforcement learning (RL), evolutionary algorithms, and gradient-based optimization are commonly used.

:p What are common search strategies in NAS?
??x
Common search strategies include:
1. **Reinforcement Learning (RL)**:
   - Treats architecture design as a sequential decision-making process.
   - Uses a policy network to select components and rewards based on estimated performance.
2. **Evolutionary Algorithms**:
   - Starts with a population of architectures.
   - Mutates and selects top-performing ones iteratively.
3. **Gradient-based Methods**:
   - Uses gradient descent to optimize the architecture parameters directly.
4. **Random Search**:
   - Simple but inefficient; selects random architectures and evaluates them.
   
These methods balance exploration and exploitation to find high-performing architectures efficiently.
x??

---

#### Learned Optimizers
Learned optimizers treat the optimization algorithm itself as a learnable component. Rather than using fixed algorithms like Adam or SGD, a neural network is trained to compute updates to model weights, effectively creating a "learned" optimizer.

:p What is the motivation behind learned optimizers?
??x
Traditional optimizers like Adam or SGD are designed heuristically and may not adapt well across different architectures or tasks. Learned optimizers address this by training a neural network to act as an optimizer:
- The optimizer is a neural network that takes gradients and previous updates as input and outputs the next update step.
- It can be trained on multiple tasks to generalize better than handcrafted optimizers.
- Can be trained either:
  - On a single task (task-specific), or
  - On a set of tasks (task-agnostic) using aggregated loss.
This leads to adaptive, task-aware optimization strategies that improve convergence and performance.
x??

---

#### Four Phases of ML Model Development
Background context: The adoption of machine learning can be divided into four distinct phases. Each phase builds upon the previous one, and solutions from one phase can serve as baselines for the next. The progression allows teams to start simple and scale up as needed.
:p What are the four phases of ML model development?
??x
1. **Before machine learning**: Use heuristics or rule-based approaches.
2. **Simplest machine learning models**: Start with simple algorithms like logistic regression or XGBoost.
3. **Optimizing simple models**: Focus on improving performance using hyperparameter tuning, feature engineering, and ensembles.
4. **Complex systems**: Move to more sophisticated models and architectures, often involving deep learning or ensemble systems.
x??

---

#### Logistic Regression as a Starting Point
Background context: Logistic regression is often the first ML model used in practice due to its simplicity, interpretability, and ease of implementation. It provides a good baseline for understanding data and problem framing.
:p Why is logistic regression a good starting point for ML development?
??x
Logistic regression is simple to implement, interpret, and deploy. It gives visibility into how the model works, making it easy to validate whether the problem is well-framed and whether the data is useful. This allows developers to quickly build a reliable framework before moving to more complex models.
$$
P(y=1|x) = \frac{1}{1 + e^{-(\beta_0 + \beta_1 x_1 + \beta_2 x_2)}}
$$
Example Java code:
```java
public class LogisticRegression {
    double predict(double[] features, double[] weights) {
        double sum = 0;
        for (int i = 0; i < features.length; i++) {
            sum += weights[i] * features[i];
        }
        return 1 / (1 + Math.exp(-sum));
    }
}
```
x??

---

#### Feature Engineering and Hyperparameter Tuning
Background context: Once a baseline model is in place, optimization can be achieved through feature engineering, hyperparameter tuning, and the use of ensembles. These steps help improve model performance and robustness.
:p How can you optimize simple ML models?
??x
You can optimize simple ML models by performing feature engineering (e.g., creating new features), hyperparameter tuning (e.g., using grid search or Bayesian optimization), increasing the amount of training data, and combining multiple models (ensembles). These steps allow for incremental improvements in model performance.
$$
\text{Accuracy} = f(\text{Features}, \text{Hyperparameters}, \text{Ensemble})
$$
Example pseudocode:
```pseudocode
best_model = tune_hyperparameters(data, model_space)
final_model = train_ensemble(best_model, data)
```
x??

---

---

#### Distributed Training Overview
Distributed training refers to the practice of training machine learning models across multiple machines (CPUs, GPUs, TPUs) to handle large-scale data and model sizes that exceed the capacity of a single machine. This approach is essential when dealing with datasets that don't fit into memory, such as medical imaging or massive text corpora. The challenge lies in efficiently managing data, computation, and communication across multiple nodes.

:p What are the main challenges in distributed training?
??x
The main challenges include:
1. **Memory limitations**: Large data samples or models may not fit into memory, requiring out-of-memory processing techniques like gradient checkpointing.
2. **Data parallelism issues**: Synchronous and asynchronous gradient updates introduce stragglers and staleness.
3. **Batch size scaling**: Increasing batch size due to multiple machines can lead to diminishing returns in performance.
4. **Resource imbalance**: The master-worker node may consume more resources than others, leading to inefficiencies.
5. **Communication overhead**: Efficiently coordinating updates between nodes is critical for performance.
$$
\text{Effective batch size} = \text{Batch size per machine} \times \text{Number of machines}
$$
Example code for simulating batch size scaling:
```java
int batchSizePerMachine = 1000;
int numMachines = 1000;
int effectiveBatchSize = batchSizePerMachine * numMachines;
System.out.println("Effective batch size: " + effectiveBatchSize);
```
x??

---

#### Gradient Checkpointing
Gradient checkpointing is a memory optimization technique used to train large models where the full computation graph cannot fit into memory. It trades computation time for memory usage by storing only a subset of intermediate activations and recomputing the rest during backpropagation. This allows training models 10x larger than what would otherwise fit on a GPU, with only a 20% increase in computation time.

:p How does gradient checkpointing reduce memory usage?
??x
Gradient checkpointing reduces memory usage by:
1. Storing only a few intermediate activations (not all) during the forward pass.
2. Recomputing the rest during the backward pass when needed.
3. Using a trade-off between memory and compute time.
This technique is especially useful when individual data samples are too large to fit into memory.
$$
\text{Memory saved} = \text{Total activations} - \text{Stored activations}
$$
Pseudocode:
```pseudocode
// Forward pass
for i = 1 to num_layers:
    if i in checkpoint_indices:
        store_activations[i] = forward_pass(layer[i], input)
    else:
        output = forward_pass(layer[i], input)

// Backward pass
for i = num_layers down to 1:
    if i in checkpoint_indices:
        backward_pass(layer[i], stored_activations[i])
    else:
        backward_pass(layer[i], computed_output)
```
x??

---

#### Data Parallelism
Data parallelism is a common approach in distributed training where the dataset is split across multiple machines, and each machine trains the same model on its portion of the data. Gradients are computed independently and then aggregated to update the global model weights. This method is widely supported by modern ML frameworks like TensorFlow and PyTorch.

:p What are the two main variants of data parallelism and how do they differ?
??x
The two main variants are:
1. **Synchronous Stochastic Gradient Descent (SSGD)**:
   - All machines compute gradients and wait for all to finish before updating weights.
   - Stragglers slow down the entire process.
2. **Asynchronous SGD (ASGD)**:
   - Machines update weights as soon as they compute gradients.
   - Can cause gradient staleness, where updates are based on outdated weights.
$$
\text{Gradient update in SSGD}: w_{t+1} = w_t - \eta \sum_{i=1}^{n} g_i
$$
$$
\text{Gradient update in ASGD}: w_{t+1} = w_t - \eta g_i
$$
Where $g_i$ is the gradient from machine $i$, $\eta$ is the learning rate, and $n$ is the number of machines.
x??

---

#### Synchronous vs Asynchronous SGD
In synchronous SGD, all workers must finish their computation before the next iteration begins, which leads to stragglers slowing down the training. In contrast, asynchronous SGD allows workers to update the model weights immediately upon computing gradients, but this introduces gradient staleness, where updates are based on outdated weights.

:p Why might asynchronous SGD still be preferred despite gradient staleness?
??x
Despite gradient staleness, asynchronous SGD is often preferred because:
1. It avoids waiting for slow workers (stragglers).
2. For sparse gradient updates (where only small parts of parameters change), convergence behavior is similar to SSGD.
3. It can offer better resource utilization and faster overall training in large-scale settings.
4. Modern algorithms have been developed to mitigate the impact of staleness.
Example scenario:
- If 100 workers are used, and one worker is 10x slower than others, SSGD waits for that worker, while ASGD proceeds.
$$
\text{Effective training time} = \max(\text{time for each worker}) \quad \text{(SSGD)}
$$
$$
\text{Effective training time} = \text{average time} \quad \text{(ASGD)}
$$
x??

---

#### Batch Size Scaling in Distributed Training
When training models in a distributed environment, increasing the batch size across multiple machines can lead to faster convergence initially, but beyond a certain point, the gains diminish. Scaling the learning rate along with the batch size is necessary to maintain convergence stability, but too large a learning rate can cause instability.

:p How should learning rate be adjusted when scaling batch size in distributed training?
??x
The learning rate should be scaled proportionally with the batch size to maintain stable convergence:
$$
\eta_{\text{new}} = \eta_{\text{old}} \times \frac{\text{new\_batch\_size}}{\text{old\_batch\_size}}
$$
However, increasing batch size beyond a threshold results in diminishing returns due to:
1. Reduced gradient noise, which can hurt generalization.
2. Increased computational overhead without proportional gain.
3. Potential for overfitting on larger batches.
Example:
```java
int oldBatchSize = 100;
int newBatchSize = 1000;
double oldLR = 0.01;
double newLR = oldLR * (newBatchSize / oldBatchSize);
System.out.println("New learning rate: " + newLR);
```
x??

---

#### Model Parallelism
Model parallelism splits the model itself across multiple machines instead of splitting the data. Different components of the model (e.g., layers) are placed on different machines, allowing for training of very large models that cannot fit on a single machine. This is especially useful for models like massive neural networks or matrix operations.

:p What is the difference between data parallelism and model parallelism?
??x
| Aspect | Data Parallelism | Model Parallelism |
|-------|------------------|-------------------|
| Splitting | Dataset | Model |
| Each worker | Has full model | Has part of model |
| Communication | Between workers for gradients | Between workers for intermediate outputs |
| Use case | Large datasets | Large models |
Example:
- In data parallelism: 1000 machines each process 1000 samples of a dataset.
- In model parallelism: Machine 1 handles first 2 layers, Machine 2 handles next 2 layers.
$$
\text{Model size per machine} = \frac{\text{Total model size}}{\text{Number of machines}}
$$
x??

---

#### Pipeline Parallelism
Pipeline parallelism is a form of model parallelism that improves efficiency by overlapping forward and backward passes across machines. It breaks the model into micro-batches and stages computation on different machines so that while one machine computes the first part of a batch, another machine works on the next part, enabling overlap and reducing idle time.

:p How does pipeline parallelism improve training efficiency?
??x
Pipeline parallelism improves efficiency by:
1. Overlapping computation across machines.
2. Reducing idle time by ensuring all machines are working simultaneously.
3. Breaking computation into micro-batches to allow better load balancing.
4. Reducing communication overhead by processing partial results.
Example:
- With 4 machines and 4 micro-batches:
  - Machine 1 computes layer 1 of micro-batch 1.
  - Machine 2 computes layer 2 of micro-batch 1 while Machine 1 computes layer 1 of micro-batch 2.
  - This continues in a pipeline fashion.
$$
\text{Pipeline latency} = \text{Time for one full batch} / \text{Number of stages}
$$
x??

---

---

