# High-Quality Flashcards: 006---Designing-Machine-Learning-Systems_processed (Part 18)

**Starting Chapter:** Evaluation Methods

---

#### Perturbation Tests
Perturbation tests evaluate how sensitive a model is to small changes in input data. These tests are crucial in production environments where inputs may differ significantly from training data due to real-world noise, user behavior, or environmental factors. For example, in a cough-based COVID-19 detection model, training data might come from hospital recordings with minimal background noise, but real-world usage may include background chatter, low-quality microphones, or inconsistent recording start times. The goal is to simulate such variations and assess model robustness.

:p What is the purpose of perturbation tests in evaluating ML models?
??x
Perturbation tests help determine how well a model performs when small, realistic changes are introduced to the input data. This simulates real-world variability and helps identify models that are robust to noise and unexpected input variations. For instance, in the cough detection case, adding background noise or clipping audio segments during testing helps assess whether the model's performance degrades significantly in production-like conditions. The model that performs well on both clean and perturbed data is more likely to be reliable in production.
$$
\text{Accuracy}_{\text{perturbed}} = \frac{\text{Correct Predictions on Perturbed Data}}{\text{Total Perturbed Samples}}
$$
```java
// Pseudocode for perturbation test
for each test_sample in test_set {
    noisy_sample = add_noise(test_sample);  // e.g., add background noise
    prediction = model.predict(noisy_sample);
    record(prediction);
}
```
x??

---

#### Invariance Tests
Invariance tests are used to ensure that model outputs remain consistent when irrelevant or sensitive attributes of the input are changed. These tests are especially important in fairness and ethical AI applications. For example, a mortgage approval model should not make decisions based on race or gender, even if those features are present in the training data. Invariance ensures that such spurious correlations do not influence the model's behavior.

:p What is the role of invariance tests in ensuring fair and ethical AI?
??x
Invariance tests check whether model outputs are invariant to changes in non-relevant or sensitive input features. For example, if a resume screening model produces different results for candidates with the same qualifications but different genders or names, it may be biased. By testing invariance, we can detect and correct such unintended dependencies. This helps in building models that are fair, unbiased, and aligned with ethical standards. The idea is to ensure that irrelevant attributes like race or gender do not affect decision-making.
$$
\text{Output}(x, \text{feature}_1, \text{feature}_2) = \text{Output}(x, \text{feature}_1, \text{feature}_2')
$$
Where $\text{feature}_2$ and $\text{feature}_2'$ are two versions of a non-relevant feature.
```java
// Pseudocode for invariance test
for each input in dataset {
    input1 = modify_non_sensitive_feature(input);
    input2 = modify_non_sensitive_feature(input);
    pred1 = model.predict(input1);
    pred2 = model.predict(input2);
    if (pred1 != pred2) {
        flag_bias = true;
    }
}
```
x??

---

#### Model Robustness in Production
Model robustness refers to a model's ability to maintain consistent performance in real-world, often noisy, conditions. It’s not enough for a model to perform well on clean training data; it must also generalize well under variations that occur in production. This is particularly relevant when data collection in production is different from that in development, such as in mobile apps or IoT devices.

:p Why is robustness in production environments critical for ML models?
??x
Robustness ensures that a model performs consistently when deployed in real-world conditions where inputs may differ from training data. For example, in a cough-based COVID detection system, user recordings are noisier and more variable than hospital recordings. If a model is only optimized for clean data, it may fail in production. Robustness testing helps identify such failures early, allowing developers to improve the model or adjust expectations. Models that are robust to input variations are less likely to be affected by small changes in user behavior or device quality.
$$
\text{Robustness Score} = \frac{\text{Performance on Clean Data}}{\text{Performance on Noisy Data}}
$$
x??

---

#### Adversarial Vulnerability
Adversarial vulnerability refers to how easily a model can be fooled by small, carefully crafted inputs designed to cause misclassification. Models that are sensitive to input perturbations are more vulnerable to adversarial attacks. These attacks can be used to manipulate model behavior in malicious ways, such as fooling a facial recognition system or a fraud detection model.

:p How does adversarial vulnerability relate to model robustness?
??x
Adversarial vulnerability is a key indicator of model robustness. If a model is highly sensitive to small input changes, it is more likely to be vulnerable to adversarial attacks. For example, a model trained to detect COVID-19 from coughs may be easily fooled if someone slightly modifies the audio in a way that is imperceptible to humans but causes the model to misclassify. Perturbation tests can help identify such vulnerabilities. A robust model should resist these small perturbations and maintain stable performance.
$$
\text{Adversarial Loss} = \max_{\delta \in \mathcal{B}} \mathcal{L}(f(x + \delta), y)
$$
Where $\mathcal{B}$ is a small perturbation ball and $\mathcal{L}$ is the loss function.
```java
// Pseudocode for adversarial test
for each input in test_set {
    adversarial_input = generate_adversarial_example(input);
    prediction = model.predict(adversarial_input);
    if (prediction != model.predict(input)) {
        flag_adversarial_vulnerability = true;
    }
}
```
x??

---

#### Evaluation Beyond Accuracy
In production, it's not enough to evaluate models based on accuracy alone. Other critical factors include fairness, calibration, and robustness. Accuracy may be misleading if a model performs well on clean data but fails when exposed to real-world noise or bias. A complete evaluation framework should include multiple metrics and tests to ensure that the model behaves as expected in a variety of scenarios.

:p Why is accuracy alone insufficient for evaluating ML models in production?
??x
Accuracy only tells us how often a model is correct, but it doesn’t account for real-world variability or ethical concerns. A model may have high accuracy on clean training data but fail in production due to noise, bias, or adversarial inputs. For example, a model might perform well on hospital cough recordings but fail on noisy user inputs. Additionally, accuracy doesn't ensure fairness or calibration. Therefore, a comprehensive evaluation must include perturbation tests, invariance tests, fairness checks, and robustness metrics.
$$
\text{Overall Model Score} = w_1 \cdot \text{Accuracy} + w_2 \cdot \text{Fairness} + w_3 \cdot \text{Robustness}
$$
Where $w_1, w_2, w_3$ are weights assigned to each metric.
x??

---

---

#### Bias Detection in Models
Bias in machine learning models occurs when the model's outputs are systematically influenced by sensitive attributes (like race, gender, etc.) even when these features are not explicitly used. This can lead to unfair or unusable models despite good performance. A key method to detect such bias is to keep all inputs constant and vary only the sensitive attribute to observe if the output changes. Alternatively, one can exclude sensitive features from the model training process entirely.

:p What is a common technique to detect bias in a model?
??x
One effective technique to detect bias is to keep all input features the same and change only the sensitive attribute (e.g., gender or race) to see if the model's output changes. If it does, this indicates the model is biased. Another approach is to remove sensitive features from the input data before training the model to prevent any unintended learning of these biases.
x??

---

#### Model Calibration
Model calibration refers to how well a model's predicted probabilities match the actual frequency of outcomes. For example, if a model predicts a 70% chance of an event occurring, that event should occur about 70% of the time in reality. A well-calibrated model is essential for decision-making systems where probabilities are interpreted as confidence levels.

:p What does it mean for a model to be calibrated?
??x
A model is calibrated if its predicted probabilities align with real-world outcomes. For example, if a model predicts that an event will happen with 70% probability, then in a large number of such predictions, the event should occur approximately 70% of the time. This is critical for making reliable decisions based on model outputs.
x??

---

#### Calibration in Ad Click Prediction
In ad click prediction, a calibrated model helps estimate the expected number of clicks accurately. If a model predicts a 10% chance of a user clicking on an ad, but in reality, the ad is clicked only 5% of the time, the model is not calibrated. This can lead to significant errors in traffic or budget forecasting.

:p Why is calibration crucial for ad click prediction models?
??x
Calibration is crucial in ad click prediction because it ensures that the predicted click probabilities reflect actual click rates. For example, if a model predicts a 10% click probability, and the real-world click rate is 5%, the model's predictions will lead to incorrect estimates of expected clicks, affecting ad spend and performance metrics.
x??

---

#### Calibration in Model Evaluation
Calibration refers to how well a model's predicted probabilities match the actual frequency of outcomes. A well-calibrated model assigns a probability of $p$ to a prediction, and approximately $p$ percent of those predictions should be correct. This is important for trust and decision-making, especially in high-stakes applications. In scikit-learn, you can visualize calibration using `sklearn.calibration.calibration_curve`, which plots predicted probabilities against actual frequencies.

:p How can you evaluate the calibration of a model?
??x
To evaluate model calibration, you can use the `calibration_curve` function from `sklearn.calibration`. This function takes the true labels and predicted probabilities, then computes the fraction of positive samples for each bin of predicted probabilities. The closer the resulting curve is to the diagonal line $y = x$, the better calibrated the model is. For example, if your model predicts 0.8 for 100 samples, and 80 of them are true, it's perfectly calibrated.

```python
from sklearn.calibration import calibration_curve
import matplotlib.pyplot as plt

fraction_of_positives, mean_predicted_value = calibration_curve(y_true, y_prob, n_bins=10)
plt.plot(mean_predicted_value, fraction_of_positives, "s-")
plt.plot([0, 1], [0, 1], "k:", label="Perfectly calibrated")
```
x??

---

#### Platt Scaling
Platt scaling is a method used to calibrate the output probabilities of a classifier. It fits a logistic regression model to map the classifier's scores to probabilities. This technique is implemented in scikit-learn via `sklearn.calibration.CalibratedClassifierCV`, which can apply Platt scaling or isotonic regression to improve calibration. It's especially useful when the base classifier does not naturally output well-calibrated probabilities.

:p What is Platt scaling and how is it used in model calibration?
??x
Platt scaling fits a logistic regression model to map classifier scores to calibrated probabilities. It's useful when a classifier outputs decision scores rather than probabilities. In scikit-learn, you can use `CalibratedClassifierCV` with `cv='prefit'` or by specifying a base estimator and a calibration method like 'sigmoid' (Platt scaling). The method fits a sigmoid function to the classifier’s outputs and adjusts them to better reflect true likelihoods.

```python
from sklearn.calibration import CalibratedClassifierCV
from sklearn.linear_model import LogisticRegression

base_clf = LogisticRegression()
calibrated_clf = CalibratedClassifierCV(base_clf, method='sigmoid', cv=3)
calibrated_clf.fit(X_train, y_train)
```
x??

---

#### Confidence Measurement and Thresholding
Confidence measurement evaluates how sure a model is about its predictions. It allows for filtering out low-confidence predictions, which may be unreliable or dangerous to act upon. For instance, in smartwatch activity detection, showing a prediction that the user is "running" when they're just walking fast could cause annoyance or mistrust. Confidence thresholds help determine which predictions are trustworthy and which should be discarded or escalated to humans.

:p Why is confidence measurement important in real-world applications?
??x
Confidence measurement helps assess the reliability of individual predictions. For example, in predictive policing or medical diagnosis, a model may be 90% accurate overall, but fail on specific subgroups. If the model is unsure, showing predictions to users could lead to harmful decisions. By setting a threshold (e.g., only show predictions with confidence > 0.9), you ensure that only high-confidence outputs are used, reducing risk and improving user trust.

x??

---

#### Slice-Based Evaluation
Slice-based evaluation involves assessing model performance across different subgroups (slices) of the data. It helps detect disparities in performance across demographics, data types, or other attributes. A model might perform well on average but fail significantly on minority groups. For example, a model achieving 98% accuracy on a majority group and 80% on a minority group will have an overall accuracy of 96.2%, masking the poor performance on the minority.

:p What is the issue with relying solely on overall accuracy for model evaluation?
??x
Relying only on overall accuracy can hide performance disparities across subgroups. For example, if a dataset has a majority group (90%) and a minority group (10%), and a model achieves 98% accuracy on the majority but only 80% on the minority, the overall accuracy will be 96.2%. This can mislead users into thinking the model is performing well, while in reality, it fails on a critical subset of data. Slice-based evaluation helps identify such issues.

```python
# Example: Compute accuracy per slice
def slice_accuracy(model, X, y, slice_feature):
    unique_slices = np.unique(slice_feature)
    for s in unique_slices:
        mask = slice_feature == s
        acc = accuracy_score(y[mask], model.predict(X[mask]))
        print(f"Slice {s}: Accuracy = {acc:.2f}")
```
x??

---

#### Calibration Curve Visualization
Calibration curves are graphical representations that show how well predicted probabilities match actual outcomes. They plot the average predicted probability against the actual fraction of positive outcomes for each bin. A perfectly calibrated model will have its curve lying along the diagonal line $y = x$. Deviations from this line indicate miscalibration, where the model is either overconfident or underconfident.

:p How do you interpret a calibration curve?
??x
A calibration curve plots average predicted probability against the actual fraction of positive outcomes. If the curve lies close to the diagonal $y = x$, the model is well-calibrated. If the curve is above the diagonal, the model is overconfident; if below, it is underconfident. For example, if the model predicts 0.7 for a group, and 60% of those are actually true, it’s underconfident. Visualization helps identify such mismatches and guide calibration techniques.

x??

---

#### Instance-Level vs System-Level Metrics
System-level metrics like accuracy or F1 score evaluate overall model performance, while instance-level metrics assess how well the model performs on individual predictions. Instance-level metrics are crucial when model failure on a single instance can have catastrophic consequences. For example, in autonomous driving, one incorrect prediction could result in a crash, so it’s essential to understand confidence and reliability per prediction.

:p Why is instance-level evaluation important in high-risk systems?
??x
Instance-level evaluation is critical in high-risk domains like healthcare or autonomous driving because errors on individual predictions can be fatal. While system-level metrics like accuracy may look good, they can mask poor performance on specific cases. Instance-level metrics help identify when a model is uncertain, allowing for better decision-making—such as flagging low-confidence predictions for human review or avoiding action altogether.

x??

---

---

#### Slice-Based Evaluation in Model Performance
Slice-based evaluation refers to assessing a model's performance across different subgroups or slices of data, rather than relying solely on overall metrics. This approach is essential because overall metrics can mask biases or performance disparities between subgroups. For example, a model may have high accuracy overall but perform poorly on underrepresented groups, leading to unfair outcomes or missed opportunities for improvement.

:p Why is slice-based evaluation important in model development?
??x
Slice-based evaluation is important because it helps identify potential biases and performance gaps across different subgroups. For instance, in Table 5-5, Model A has 98% accuracy on the majority group but only 80% on the minority group, whereas Model B performs consistently at 95% for both. Focusing only on overall accuracy might lead to choosing a model that is unfair or suboptimal for certain user segments. This method allows developers to tailor strategies for improving model fairness and performance across all user types.
x??

---

#### Critical Subgroups in Model Evaluation
In many real-world applications, certain subgroups are more critical than others. For example, in churn prediction models, paid users are often more important than non-paid users because they generate revenue. A model that performs well overall but poorly on critical subgroups may fail to meet business objectives, even if it appears to be working correctly.

:p Why are critical subgroups important in model evaluation?
??x
Critical subgroups, such as paid users in a churn prediction model, are important because they have a greater impact on business outcomes. Even if a model performs well overall, poor performance on these critical subgroups can result in significant revenue loss or user dissatisfaction. Evaluating model performance on such slices ensures that the model is effective where it matters most, not just in aggregate.
x??

---

#### Overall Metrics vs. Subgroup Metrics
While overall metrics like accuracy or F1-score are commonly used to evaluate models, they can be misleading. Subgroup metrics provide a more nuanced view and help detect issues like bias or performance disparities that are hidden in aggregated data.

:p Why should overall metrics not be the sole basis for model evaluation?
??x
Overall metrics, such as accuracy, provide a high-level view of model performance but can mask disparities between subgroups. For example, in Table 5-5, Model A has 98% overall accuracy, but only 80% on the minority group. This discrepancy shows that overall metrics alone may not reflect the true effectiveness of a model across all user segments. Subgroup metrics are needed to ensure fairness and identify where improvements are necessary.
x??

---

#### Slice-based Model Evaluation
Slice-based evaluation involves assessing model performance on specific subgroups or slices of data, rather than on the entire dataset. This method helps identify performance disparities across different user segments, geographic regions, or other relevant dimensions. It's essential for detecting biases, non-machine learning issues, and improving model robustness.

:p Why is slice-based evaluation important in machine learning?
??x
Slice-based evaluation is important because it provides insights into how a model behaves on different subgroups. For example, a model may perform well overall but fail significantly on mobile users due to UI issues. By analyzing slices, teams can detect such biases or systemic problems that would otherwise go unnoticed. This approach also builds stakeholder trust by showing model reliability across critical segments.
x??

---

#### Slice Performance Monitoring
Monitoring slice performance is essential for maintaining model reliability over time. It helps in detecting performance degradation, identifying new biases, and ensuring that the model continues to generalize well across all critical subgroups.

:p Why should you monitor slice performance over time?
??x
Monitoring slice performance over time ensures that the model remains reliable and fair as data evolves. For example, a slice that performed well initially might degrade due to shifts in user behavior or data distribution. Regular monitoring allows teams to detect such changes early and take corrective actions, such as retraining or adjusting the model.
x??

---

#### Clustering in Machine Learning
Clustering is an unsupervised learning technique used to group similar data points together based on their features. Common algorithms include K-means, hierarchical clustering, and DBSCAN. The goal is to identify natural groupings in the data without prior knowledge of labels.

:p How does K-means clustering work?
??x
K-means partitions data into $k$ clusters by minimizing the sum of squared distances between each point and its assigned cluster centroid. The process involves initializing centroids, assigning points to the nearest centroid, and updating centroids based on the mean of assigned points. This iteration continues until convergence.
$$
J = \sum_{i=1}^{k} \sum_{x \in S_i} ||x - \mu_i||^2
$$
Where $S_i$ is the set of points in cluster $i$, and $\mu_i$ is the centroid of cluster $i$.
```java
// Pseudocode for K-means
function k_means(data, k, max_iters) {
    centroids = initialize_centroids(data, k)
    for iter in range(max_iters) {
        clusters = assign_points_to_centroids(data, centroids)
        centroids = update_centroids(clusters)
    }
    return clusters, centroids
}
```
x??

---

#### Model Selection and Hyperparameter Tuning
Model selection involves choosing the best model from a set of candidates, often using cross-validation. Hyperparameter tuning adjusts parameters that are not learned during training, such as learning rate or number of layers. Techniques include grid search, random search, and Bayesian optimization.

:p What is the difference between grid search and random search for hyperparameter tuning?
??x
Grid search exhaustively evaluates all combinations of hyperparameters in a predefined space, which can be computationally expensive. Random search samples random combinations from the space, often more efficient and sometimes more effective in finding good hyperparameters.
$$
\text{Grid Search Complexity} = O(n^d)
$$
Where $n$ is the number of values per hyperparameter and $d$ is the number of hyperparameters.
```java
// Pseudocode for Random Search
function random_search(hyperparameter_space, num_trials) {
    best_score = -inf
    best_params = null
    for i in range(num_trials) {
        params = sample_randomly(hyperparameter_space)
        score = evaluate_model(params)
        if (score > best_score) {
            best_score = score
            best_params = params
        }
    }
    return best_params
}
```
x??

---

#### Ensemble Methods in ML
Ensemble methods combine multiple models to improve performance. Popular techniques include bagging (bootstrap aggregating), boosting (sequential model improvement), and stacking (meta-model prediction). These methods help reduce variance and bias, leading to better generalization.

:p How does bagging reduce model variance?
??x
Bagging trains multiple models on different bootstrap samples of the dataset and averages their predictions. This reduces variance because each model sees slightly different data, and averaging out individual errors leads to a more stable final prediction.
$$
\text{Bagged Prediction} = \frac{1}{B} \sum_{b=1}^{B} f_b(x)
$$
Where $f_b(x)$ is the prediction of the $b$-th model.
```java
// Pseudocode for Bagging
function bagging_train(base_model, data, num_models) {
    models = []
    for i in range(num_models) {
        bootstrap_sample = sample_with_replacement(data)
        model = train(base_model, bootstrap_sample)
        models.add(model)
    }
    return models
}

function bagging_predict(models, x) {
    predictions = [model.predict(x) for model in models]
    return average(predictions)
}
```
x??

---

#### Optimization in Machine Learning
Optimization refers to the process of adjusting model parameters to minimize a loss function. Common optimizers include gradient descent, Adam, and RMSprop. The goal is to find a set of parameters that generalize well to unseen data.

:p What is the role of gradient descent in machine learning optimization?
??x
Gradient descent is an iterative optimization algorithm used to minimize a loss function by updating parameters in the direction of the negative gradient. It is fundamental to training neural networks and other models where parameters are adjusted to reduce prediction error.
$$
\theta_{t+1} = \theta_t - \alpha \nabla_\theta J(\theta_t)
$$
Where $\alpha$ is the learning rate and $J(\theta)$ is the loss function.
```java
// Pseudocode for Gradient Descent
function gradient_descent(loss_function, initial_params, learning_rate, num_iterations) {
    params = initial_params
    for i in range(num_iterations) {
        gradient = compute_gradient(loss_function, params)
        params = params - learning_rate * gradient
    }
    return params
}
```
x??

---

#### AutoML and Model Discovery
AutoML automates the process of selecting and tuning models, including choosing the appropriate function form and hyperparameters. It can involve techniques like neural architecture search (NAS), evolutionary algorithms, or Bayesian optimization to find good models automatically.

:p What is neural architecture search (NAS)?
??x
Neural architecture search (NAS) is an automated method for designing neural network architectures. It uses techniques like reinforcement learning or evolutionary algorithms to explore a space of possible architectures and find ones that perform well on a given task. For example, DARTS uses differentiable architecture search to optimize architectures efficiently.
$$
\text{Architecture Search} = \arg\max_{\mathcal{A}} \text{Validation Accuracy}(\mathcal{A})
$$
x??

---

#### Overfitting and Underfitting
Overfitting occurs when a model learns noise in the training data, leading to poor generalization. Underfitting occurs when a model is too simple to capture the underlying pattern. Balancing these is crucial for good model performance.

:p What causes overfitting in machine learning models?
??x
Overfitting happens when a model is too complex relative to the amount of training data, causing it to memorize training examples instead of learning generalizable patterns. It often occurs in high-capacity models like deep neural networks or decision trees without pruning. Techniques like regularization, dropout, and early stopping help mitigate overfitting.
$$
\text{Training Error} < \text{Validation Error}
$$
x??

---

#### Regularization Techniques
Regularization adds constraints to the model to prevent overfitting. Common types include L1 (Lasso), L2 (Ridge), and dropout for neural networks. These techniques penalize large weights or introduce randomness to improve generalization.

:p How does L2 regularization work in linear regression?
??x
L2 regularization adds a penalty term proportional to the square of the weights to the loss function. This encourages small weights and reduces overfitting. The modified loss function becomes:
$$
J_{\text{regularized}} = J + \lambda \sum_{i=1}^{n} w_i^2
$$
Where $\lambda$ controls the strength of regularization.
```java
// Pseudocode for L2 Regularized Regression
function l2_regularized_loss(weights, y_true, y_pred, lambda) {
    mse = mean_squared_error(y_true, y_pred)
    regularization = lambda * sum(weights^2)
    return mse + regularization
}
```
x??

---

---

