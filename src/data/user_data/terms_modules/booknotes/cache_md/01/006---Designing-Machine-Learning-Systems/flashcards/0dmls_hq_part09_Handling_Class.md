# High-Quality Flashcards: 006---Designing-Machine-Learning-Systems_processed (Part 9)

**Starting Chapter:** Handling Class Imbalance

---

#### Class Imbalance in Machine Learning
Class imbalance refers to situations where the distribution of classes in a dataset is not uniform, meaning some classes (called majority classes) have significantly more samples than others (called minority classes). This is common in real-world applications such as fraud detection, medical diagnosis, and anomaly detection. When the majority class dominates the dataset, standard evaluation metrics like accuracy can be misleading because a model might achieve high accuracy by simply predicting the majority class for all instances.
:p What are the consequences of using standard accuracy metrics in class imbalance scenarios?
??x
Standard accuracy metrics treat all classes equally, so even if a model performs poorly on the minority class, it can still appear accurate overall. For example, in a dataset where 90% of samples belong to the majority class, a model that always predicts the majority class will achieve 90% accuracy, even though it fails to detect any minority class instances. This makes accuracy an unreliable metric for evaluating model performance in imbalanced datasets.
$$
\text{Accuracy} = \frac{\text{True Positives} + \text{True Negatives}}{\text{Total Samples}}
$$
```java
// Example: Accuracy calculation in Java
double accuracy = (tp + tn) / (tp + tn + fp + fn);
```
x??

---

#### Sensitivity to Class Imbalance
Some machine learning tasks are more sensitive to class imbalance than others. Research shows that non-complex, linearly separable problems are generally unaffected by class imbalance, whereas complex or non-linear problems are more prone to performance degradation when class distributions are skewed. Deep learning models, especially those with many layers, have shown improved robustness to class imbalance compared to shallow models.
:p Why do deep neural networks perform better on imbalanced data than shallow ones?
??x
Deep neural networks possess greater capacity to learn complex patterns and generalize from limited minority class data. As shown by Ding et al., very-deep architectures (over 10 layers) were found to perform significantly better on imbalanced datasets than shallower networks. This is due to their ability to learn richer representations and adaptively weight features, which helps in capturing subtle differences in minority classes.
x??

---

#### Evaluation Metrics for Imbalanced Data
Choosing appropriate evaluation metrics is crucial when dealing with class imbalance. Accuracy and error rate are insufficient because they do not account for the disproportionate impact of misclassifying minority class samples. Instead, metrics like precision, recall, F1-score, and AUC-ROC are preferred as they provide a more nuanced view of model performance across all classes.
:p Which metrics are better suited for evaluating models on imbalanced datasets?
??x
Metrics such as precision, recall, F1-score, and AUC-ROC are more informative than accuracy in imbalanced settings. Precision measures how many selected instances are relevant, while recall measures how many relevant instances were retrieved. The F1-score combines both precision and recall into a single metric:
$$
F1 = 2 \cdot \frac{\text{precision} \cdot \text{recall}}{\text{precision} + \text{recall}}
$$
These metrics help assess how well a model performs on both majority and minority classes.
x??

---

#### Confusion Matrix and Its Role in Evaluation
A confusion matrix is a table used to describe the performance of a classification model on a set of test data for which the true values are known. It provides detailed breakdowns of correct and incorrect predictions for each class, enabling deeper insight into model behavior—especially important when one class dominates the dataset.
:p How does a confusion matrix help in understanding model performance in class imbalance?
??x
A confusion matrix shows the number of true positives (TP), true negatives (TN), false positives (FP), and false negatives (FN) for each class. In imbalanced datasets, focusing only on overall accuracy can mask poor performance on the minority class. For instance, a model might have high accuracy but low recall for the minority class, indicating it fails to detect most of the rare cases.
$$
\text{Recall} = \frac{TP}{TP + FN}
$$
This makes confusion matrices essential for diagnosing model weaknesses in imbalanced classification tasks.
x??

---

#### Confusion Matrix
A confusion matrix is a table used to evaluate the performance of a classification model by summarizing the counts of correct and incorrect predictions for each class. It helps visualize how well the model performs on both positive and negative classes. In binary classification, it contains four values: true positives (TP), false positives (FP), true negatives (TN), and false negatives (FN).

For example, in Model A’s confusion matrix:
- Predicted CANCER: 10 true positives, 10 false positives
- Predicted NORMAL: 90 false negatives, 890 true negatives

:p What does the confusion matrix tell us about Model A and Model B's performance on detecting cancer?
??x
Model A detects 10 out of 100 cancer cases (10 TP), while Model B detects 90 out of 100 (90 TP). This shows that Model B has a much higher recall (sensitivity) for the cancer class. However, both models have the same overall accuracy of 0.9, which doesn't reflect their performance on the positive class.
$$
\text{Accuracy} = \frac{TP + TN}{TP + TN + FP + FN}
$$
```java
// Example Java code to compute accuracy from confusion matrix
public double computeAccuracy(int tp, int tn, int fp, int fn) {
    return (double)(tp + tn) / (tp + tn + fp + fn);
}
```
x??

---

#### Recall (Sensitivity)
Recall, also known as sensitivity or true positive rate (TPR), measures how well a model identifies the positive class. It is defined as the ratio of true positives to the sum of true positives and false negatives. Recall focuses on how many actual positives were correctly identified.

$$
\text{Recall} = \frac{TP}{TP + FN}
$$

In the context of cancer detection, recall indicates how many real cancer cases were correctly detected.

:p What is the recall for Model A and Model B when considering cancer as the positive class?
??x
For Model A, recall = $ \frac{10}{10 + 90} = 0.1 $, meaning only 10% of actual cancer cases were detected.
For Model B, recall = $ \frac{90}{90 + 10} = 0.9 $, indicating 90% of actual cancer cases were correctly identified.
This shows that Model B is significantly better at detecting cancer, even though both models have the same overall accuracy.
x??

---

#### F1 Score
The F1 score is the harmonic mean of precision and recall, providing a balanced measure of a model’s performance on the positive class. It is particularly useful in imbalanced datasets where accuracy alone may be misleading.

$$
F1 = 2 \cdot \frac{\text{precision} \cdot \text{recall}}{\text{precision} + \text{recall}}
$$

The F1 score ranges from 0 to 1, with 1 being the best.

:p What is the F1 score for Model A if we consider cancer as the positive class?
??x
To compute F1, we first need precision and recall:
- Recall for Model A = 0.1 (from earlier)
- Precision = $ \frac{TP}{TP + FP} = \frac{10}{10 + 10} = 0.5 $
Then,
$$
F1 = 2 \cdot \frac{0.5 \cdot 0.1}{0.5 + 0.1} = 2 \cdot \frac{0.05}{0.6} = \frac{0.1}{0.6} \approx 0.17
$$
Thus, Model A’s F1 score is approximately 0.17.
x??

---

#### Accuracy vs. Class-Specific Metrics
Accuracy is the proportion of correct predictions among all predictions. While it gives an overall view of performance, it can be misleading when dealing with imbalanced datasets. For example, in cancer detection, if only 10% of patients have cancer, a model could achieve 90% accuracy by simply predicting "normal" for everyone, but fail to detect any real cases.

:p Why is accuracy not sufficient to evaluate Model A and Model B in the cancer detection scenario?
??x
Although both models have the same accuracy (0.9), Model A detects only 10% of cancer cases (low recall), while Model B detects 90%. Accuracy does not distinguish between true positives and false negatives for the positive class. Therefore, metrics like recall and F1 are more informative when assessing performance on the minority class.
x??

---

#### Precision-Recall Curve
The Precision-Recall (PR) curve plots precision against recall at various thresholds. Unlike the ROC curve, PR curves are more informative for imbalanced datasets because they focus on the positive class and ignore true negatives. This makes them better for evaluating models in scenarios like rare disease detection.

$$
\text{Precision} = \frac{TP}{TP + FP}
$$

:p Why is the Precision-Recall curve preferred over the ROC curve in imbalanced datasets?
??x
In imbalanced datasets, the number of negative samples dominates, so the ROC curve may give a misleading impression of good performance due to high TN rates. The PR curve focuses on the positive class, showing how precision and recall trade off, making it more informative for tasks where detecting the rare class is critical, such as identifying cancer cases.
x??

---

#### Threshold Tuning
Threshold tuning involves adjusting the decision boundary used to classify outputs from a model. For example, if a model outputs a probability, a threshold of 0.5 is often used to classify as positive or negative. Adjusting this threshold allows us to increase recall at the cost of precision, or vice versa.

:p How does changing the classification threshold affect recall and precision?
??x
Increasing the threshold makes the model more conservative in predicting the positive class, increasing precision but decreasing recall. Conversely, lowering the threshold increases recall but decreases precision. For example, lowering the threshold from 0.5 to 0.3 increases the number of predicted positives (more true positives), but also increases false positives, thus reducing precision.
x??

---

---

#### Resampling Techniques Overview
Resampling methods are data-level approaches used to address class imbalance by modifying the distribution of training data. These techniques include oversampling, which increases the number of minority class instances, and undersampling, which reduces the number of majority class instances. The goal is to balance the dataset so that machine learning models can learn more effectively from the minority class.

:p What are the two main types of resampling techniques?
??x
The two main types of resampling techniques are **oversampling**, which involves duplicating or generating synthetic samples from the minority class, and **undersampling**, which involves removing samples from the majority class to achieve a balanced distribution.
x??

---

#### Avoiding Evaluation on Resampled Data
When using resampling techniques, it is critical to avoid evaluating the model on the resampled data. Doing so leads to overfitting, as the model learns to perform well on the artificially balanced distribution rather than generalizing to real-world data.

:p Why should you not evaluate a model on resampled data?
??x
You should not evaluate a model on resampled data because it causes the model to overfit to the artificial distribution created during resampling. The evaluation would not reflect the model's performance on real-world, unbalanced data.
x??

---

#### Two-Phase Learning Method
Two-phase learning is a hybrid approach where a model is first trained on resampled data (e.g., undersampled majority class) and then fine-tuned on the original, unbalanced dataset. This helps the model learn from both balanced and real-world data.

:p How does the two-phase learning method work?
??x
In two-phase learning, the model is first trained on resampled data (e.g., undersampled majority class) to improve learning from the minority class. Then, the model is fine-tuned on the original, unbalanced dataset to ensure it generalizes well to real-world data.
x??

---

#### Dynamic Sampling Strategy
Dynamic sampling is a training technique where the sampling strategy changes during training. It oversamples underperforming classes and undersamples high-performing ones, encouraging the model to focus on harder-to-learn examples.

:p What is dynamic sampling and how does it help in training?
??x
Dynamic sampling adjusts the class distribution during training by oversampling underperforming classes and undersampling high-performing ones. This encourages the model to learn from harder examples and avoid overfitting to easy cases, improving overall generalization.
x??

---

#### Weighted Loss Functions
A common algorithm-level method involves using weighted loss functions, where misclassifying a minority class instance contributes more to the total loss than misclassifying a majority class instance. This encourages the model to reduce errors on the minority class.

:p How does a weighted loss function help in handling class imbalance?
??x
A weighted loss function assigns higher weights to misclassified minority class instances, so that errors on these instances contribute more to the total loss. This encourages the model to focus more on learning the minority class, improving its sensitivity.
x??

---

#### Cost-Sensitive Learning
Cost-sensitive learning is a technique used in machine learning where different misclassifications are assigned different costs. This is important because in real-world applications, misclassifying certain classes can be more costly than others. For example, misclassifying a positive case as negative in medical diagnosis might be more harmful than the reverse. The cost matrix $C_{ij}$ defines the cost of predicting class $j$ when the true class is $i$. The loss for an instance $x$ of class $i$ is computed as a weighted average of all possible classifications:
$$
L(x; \theta) = \sum_j C_{ij} P(j|x; \theta)
$$
Here, $P(j|x; \theta)$ is the predicted probability that $x$ belongs to class $j$.

:p What is the loss function used in cost-sensitive learning and how is it calculated?
??x
In cost-sensitive learning, the loss function for an instance $x$ of class $i$ is calculated as:
$$
L(x; \theta) = \sum_j C_{ij} P(j|x; \theta)
$$
Where $C_{ij}$ is the cost of predicting class $j$ when the true class is $i$, and $P(j|x; \theta)$ is the predicted probability of class $j$ for instance $x$. This approach allows the model to be more sensitive to costly errors.
x??

---

#### Class-Balanced Loss
Class-balanced loss is a method used to address class imbalance in datasets by adjusting the weights of different classes. In imbalanced datasets, models often become biased towards the majority class. To counter this, class weights are inversely proportional to the number of samples in each class. This ensures that rare classes are given more importance during training.

The weight for class $i$ is defined as:
$$
W_i = \frac{1}{N_i}
$$
where $N_i$ is the number of samples in class $i$. The loss for an instance $x$ of class $i$ becomes:
$$
L(x; \theta) = W_i \sum_j P(j|x; \theta) \cdot \text{Loss}(x, j)
$$
This formulation ensures that misclassifications in minority classes contribute more to the overall loss.

:p How is the class weight calculated in class-balanced loss and how does it affect the loss function?
??x
In class-balanced loss, the weight for class $i$ is calculated as:
$$
W_i = \frac{1}{N_i}
$$
where $N_i$ is the number of samples in class $i$. The loss for an instance $x$ of class $i$ is then:
$$
L(x; \theta) = W_i \sum_j P(j|x; \theta) \cdot \text{Loss}(x, j)
$$
This ensures that errors on underrepresented classes have a larger impact on the total loss, encouraging the model to pay more attention to these classes.
x??

---

#### Focal Loss
Focal Loss is a loss function designed to address the issue of class imbalance by focusing the model's learning on hard-to-classify examples. It modifies the standard cross-entropy loss by introducing a modulating factor that reduces the loss contribution from easy examples and increases it for hard examples. This helps the model focus on the samples it struggles with, improving performance on minority classes.

The focal loss is defined as:
$$
FL(p_t) = -\alpha_t (1 - p_t)^\gamma \log(p_t)
$$
where $p_t$ is the model’s predicted probability for the true class, $\alpha_t$ is a balancing factor, and $\gamma$ is the focusing parameter that controls how much weight is given to hard examples.

:p What is the formula for Focal Loss and what is its purpose in training models?
??x
Focal Loss is defined as:
$$
FL(p_t) = -\alpha_t (1 - p_t)^\gamma \log(p_t)
$$
where $p_t$ is the predicted probability for the true class, $\alpha_t$ is a balancing factor, and $\gamma$ is the focusing parameter. The purpose of Focal Loss is to reduce the loss contribution from easy examples and increase the focus on hard examples, helping the model learn better from difficult cases, especially in imbalanced datasets.
x??

---

#### Loss Function with Weighted Instances
In many learning scenarios, it's beneficial to assign different weights to training instances based on their importance. For instance, misclassifying a rare but critical instance might be more costly than misclassifying a common one. The weighted loss function can be defined as:
$$
L(x; \theta) = w_x \cdot L_{\text{base}}(x; \theta)
$$
where $w_x$ is the weight for instance $x$ and $L_{\text{base}}(x; \theta)$ is the base loss function (e.g., cross-entropy).

:p How does weighting individual instances affect the loss function in machine learning?
??x
Weighting individual instances modifies the loss function to reflect their relative importance:
$$
L(x; \theta) = w_x \cdot L_{\text{base}}(x; \theta)
$$
Here, $w_x$ is the weight assigned to instance $x$, and $L_{\text{base}}(x; \theta)$ is the base loss function (like cross-entropy). This allows the model to focus more on critical or hard-to-classify instances, improving overall performance, especially in imbalanced or cost-sensitive settings.
x??

---

#### Cross Entropy Loss (CE)
Cross entropy loss is a commonly used loss function in classification tasks, especially in deep learning models. It measures the performance of a classification model whose output is a probability value between 0 and 1. The loss increases as the predicted probability diverges from the actual label. For binary classification, the cross entropy loss is defined as:
$$
\text{CE} = -\left( y \log(\hat{y}) + (1 - y) \log(1 - \hat{y}) \right)
$$
where $y$ is the true label (0 or 1) and $\hat{y}$ is the predicted probability.

For multi-class classification, it generalizes to:
$$
\text{CE} = -\sum_{i=1}^{C} y_i \log(\hat{y}_i)
$$
where $C$ is the number of classes, $y_i$ is the one-hot encoded true label, and $\hat{y}_i$ is the predicted probability for class $i$.

:p What is the mathematical formulation of cross entropy loss for binary classification?
??x
The cross entropy loss for binary classification is defined as:
$$
\text{CE} = -\left( y \log(\hat{y}) + (1 - y) \log(1 - \hat{y}) \right)
$$
Here, $y$ is the true label (0 or 1), and $\hat{y}$ is the predicted probability. This formulation penalizes predictions that are confident but wrong, encouraging the model to produce well-calibrated probabilities.
x??

---

#### Data Augmentation Overview
Data augmentation is a set of techniques used to artificially increase the size and diversity of training datasets by applying transformations to existing data. It's especially useful in scenarios with limited data (e.g., medical imaging) but also beneficial in large-scale tasks to improve robustness and generalization. In computer vision, this includes transformations like rotation, flipping, cropping, and noise injection. In NLP, it can involve synonym replacement or token masking.

:p Why is data augmentation used in machine learning?
??x
Data augmentation is used to increase the effective size of a training dataset, improve model generalization, and enhance robustness to noise and adversarial attacks. It helps prevent overfitting and makes models more resilient by exposing them to varied versions of the same data.
x??

---

#### Adversarial Augmentation
Adversarial augmentation is a form of data augmentation that uses adversarial examples—inputs intentionally designed to cause misclassification. These examples are generated by adding minimal, carefully crafted noise to inputs. One method to generate adversarial examples is DeepFool, which finds the minimal noise needed to misclassify an input with high confidence.

:p What is adversarial augmentation and how is it used?
??x
Adversarial augmentation involves training models on adversarial examples—inputs modified to mislead the model. It improves model robustness by exposing the model to challenging cases. Techniques like DeepFool are used to generate these examples efficiently.
x??

---

#### Computational Efficiency of Data Augmentation
Data augmentation can be computationally efficient when implemented properly. For example, in AlexNet, transformations are applied on the CPU while the GPU trains on the previous batch, making augmentation "computationally free."

:p How is data augmentation made computationally efficient in deep learning?
??x
Data augmentation can be made computationally efficient by parallelizing operations—like applying transformations on the CPU while the GPU trains on the previous batch. This overlapping of computation avoids additional training time.
x??

---

#### Robustness Through Perturbation
Adding noisy or adversarial samples to training data can help models recognize weak spots in their decision boundaries and improve overall performance. This is especially useful in adversarial settings where models are exposed to inputs designed to fool them.

:p How does adding noisy data improve model performance?
??x
Adding noisy or adversarial samples to training data forces the model to learn more robust features, reducing sensitivity to small input changes. This improves generalization and makes the model less prone to misclassification under adversarial conditions.
x??

---

#### Data Synthesis in Machine Learning
Training machine learning models often requires large amounts of labeled data, which can be expensive, slow, and raise privacy concerns. To address these challenges, researchers explore synthesizing training data instead of collecting real-world examples. Although full data synthesis is not yet feasible, partial synthesis—especially in natural language processing and computer vision—can enhance model performance.

:p Why is data synthesis considered beneficial in machine learning?
??x
Data synthesis allows for generating training data without relying on expensive or privacy-sensitive real-world collections. It can bootstrap models with diverse examples, especially useful in NLP where templates generate many training queries, or in computer vision where synthetic images are created by combining real ones.
x??

---

