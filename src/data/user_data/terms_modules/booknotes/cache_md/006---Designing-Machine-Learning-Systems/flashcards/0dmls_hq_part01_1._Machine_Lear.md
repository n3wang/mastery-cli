# High-Quality Flashcards: 006---Designing-Machine-Learning-Systems_processed (Part 1)

**Starting Chapter:** 1. Machine Learning Systems in Production

---

#### Why is it important to consider the full ML system, not just the algorithm?
While many people associate machine learning with algorithms like logistic regression or neural networks, the actual deployment of ML systems involves much more. The system must be designed to handle data ingestion, model serving, monitoring, and user interaction.
:p Why is it a mistake to focus only on the ML algorithm in production?
??x
Focusing only on the algorithm ignores other critical aspects of an ML system:
- **Data pipeline issues**: Poor data quality leads to poor model performance.
- **Infrastructure**: Without proper compute resources, even the best model won't run.
- **User experience**: If the interface is not intuitive, users won't adopt the system.
- **Monitoring and maintenance**: Models degrade over time; systems must be able to retrain or update.
Thus, understanding the full system is essential for success in production.
x??

---

#### How does deploying ML systems differ from traditional software development?
Deploying ML systems introduces unique challenges compared to traditional software. ML systems must handle data, model updates, and performance monitoring, which are not typically concerns in traditional software.
:p What are the main differences between ML systems and traditional software in production?
??x
Key differences include:
- **Data dependency**: ML systems rely heavily on data, which must be continuously collected, cleaned, and labeled.
- **Model updates**: Models must be retrained and updated regularly to maintain performance.
- **Monitoring**: ML systems must be monitored for data drift, concept drift, and model degradation.
- **Scalability**: ML systems often require significant compute resources and must scale accordingly.
Traditional software, by contrast, is typically static and less dependent on dynamic data inputs.
x??

---

#### What is the iterative process for designing an ML system?
Designing an ML system involves an iterative process that includes problem definition, data collection, model development, deployment, and monitoring. Each stage must be revisited and refined.
:p What are the steps in the iterative process of ML system design?
??x
The iterative process typically includes:
1. **Problem definition**: Clearly define the use case and success metrics.
2. **Data collection and preprocessing**: Gather and clean data.
3. **Model development**: Train and evaluate models.
4. **Deployment**: Integrate the model into production.
5. **Monitoring and feedback**: Track performance and collect user feedback.
6. **Iteration**: Refine the system based on results and feedback.
This cycle ensures that the system evolves to meet user needs and maintain performance over time.
x??

---

#### Why is it crucial to ask “when and when not to use machine learning”?
Not every problem is suitable for an ML solution. It’s important to assess whether ML is the right tool for a given task before investing time and resources.
:p Why should one question whether to use machine learning for a given task?
??x
ML is not always the best solution:
- **Simple tasks**: Rule-based systems may be more efficient and interpretable.
- **Lack of data**: ML models require sufficient data to train effectively.
- **Interpretability needs**: Some domains (e.g., legal or medical) require explainable decisions.
- **Cost vs. benefit**: The cost of building and maintaining an ML system may outweigh its benefits.
Thus, careful evaluation is needed to determine if ML is the right approach.
x??

---

#### What are the key considerations when evaluating ML algorithms?
Choosing the right algorithm depends on factors like data size, problem type, and performance requirements. The goal is to select a solution that fits the problem and environment.
:p How do you choose the best ML algorithm for a problem?
??x
Key considerations include:
- **Problem type**: Classification, regression, clustering, etc.
- **Data size and structure**: Some algorithms work better with large datasets, others with small.
- **Interpretability**: Some domains require explainable models.
- **Performance requirements**: Speed, accuracy, and resource usage.
- **Scalability**: Whether the algorithm can scale with the data and compute needs.
Algorithms like neural networks are powerful but may not be necessary for simple tasks. A good process involves experimentation and evaluation.
x??

---

#### What is the importance of monitoring ML systems in production?
Once deployed, ML systems must be monitored for performance degradation, data drift, and model staleness. Without monitoring, systems can fail silently.
:p Why is monitoring critical for ML systems in production?
??x
Monitoring is essential because:
- **Performance degradation**: Models may perform worse over time due to data drift.
- **Data quality issues**: New data may not match training data, affecting predictions.
- **Concept drift**: The underlying patterns in data may change over time.
- **System reliability**: Ensures that the system continues to function as expected.
Tools and processes for monitoring must be built into the system from the start to avoid silent failures.
x??

---

#### How does ML in production differ from ML in research?
ML in research focuses on innovation and experimentation, while ML in production emphasizes reliability, scalability, and real-world applicability.
:p What are the differences between ML in research and ML in production?
??x
Differences include:
- **Focus**: Research is exploratory; production is about delivering value.
- **Performance vs. reproducibility**: Research prioritizes reproducibility; production prioritizes performance and uptime.
- **Data handling**: In research, data is often controlled; in production, data is dynamic and often noisy.
- **Deployment**: Research models are often prototyped; production systems are built for long-term, scalable deployment.
These differences require different methodologies and tools in each environment.
x??

---

#### When to Use Machine Learning
Machine learning should be considered when dealing with problems that involve complex patterns in data, especially when traditional rule-based systems are impractical or inefficient. Problems such as image recognition, natural language processing, and predictive analytics are good candidates for ML.

However, ML is not always necessary. For simple, rule-based tasks—like sorting zip codes by state—using a lookup table is more efficient and reliable than deploying an ML model.

:p How do you decide whether to apply machine learning to a problem?
??x
You should consider applying machine learning when:
1. The problem involves complex, non-linear relationships that are hard to express in code.
2. There is sufficient data available for training.
3. The task requires generalization to new, unseen data.
4. The cost of manual rule creation outweighs the benefits of automation.

Avoid ML when:
1. The problem is straightforward and can be solved with simple logic or lookup tables.
2. There is insufficient data.
3. The required accuracy can be achieved using simpler methods.

Example: Sorting Airbnb listings by state using zip code is simple enough to use a lookup table; predicting rental prices requires ML due to the complexity of factors involved.
x??

---

#### Supervised Learning Basics
Supervised learning is a type of machine learning where the algorithm learns from labeled training data. Each example in the dataset includes both input features and the correct output label. The goal is to learn a mapping from inputs to outputs so that the model can predict labels for new, unseen data.

For instance, in predicting Airbnb rental prices, inputs could include features like square footage, number of rooms, neighborhood, amenities, and rating, while the output is the rental price.

:p What is the basic workflow in supervised learning?
??x
In supervised learning:
1. **Training Data**: A dataset with inputs (features) and corresponding correct outputs (labels).
2. **Model Training**: The algorithm learns the relationship between inputs and outputs.
3. **Prediction**: Once trained, the model predicts outputs for new inputs.

Example:
$$
\text{Input} = [\text{sqft}, \text{rooms}, \text{rating}] \\
\text{Output} = \text{price}
$$
Training data might look like:
$$
\begin{align*}
[1000, 3, 4.5] & \rightarrow 300 \\
[1500, 4, 4.8] & \rightarrow 500 \\
\end{align*}
$$
After training, the model predicts the price for a new listing like $[1200, 3, 4.6]$.

Pseudocode:
```pseudocode
train_model(training_data):
    for each example in training_data:
        learn_mapping(example.input, example.output)

predict(input):
    return model(input)
```
x??

---

#### Why Not Use ML for Simple Tasks?
Machine learning systems are powerful but not always cost-effective or necessary. For tasks with simple, predictable patterns—like assigning states based on zip codes—using a lookup table is more efficient, reliable, and easier to debug.

:p Why shouldn’t we always use machine learning?
??x
Machine learning is not always the best choice because:
1. **Overhead**: ML systems require significant time and resources for training, tuning, and deployment.
2. **Simplicity**: If a problem can be solved with simple logic or rules, ML adds unnecessary complexity.
3. **Debugging**: Rule-based systems are easier to interpret and debug than black-box ML models.
4. **Cost**: Training ML models requires large datasets and computational power, which may not be justified for simple tasks.

Example:
To assign a state to an Airbnb listing based on zip code:
- A lookup table is sufficient and fast.
- An ML model would be overkill and harder to maintain.

This makes it important to evaluate whether the benefits of ML outweigh its costs.
x??

---

#### Comparison: Lookup Table vs ML for State Assignment
When assigning Airbnb listings to states based on zip codes, a lookup table is the preferred solution due to the simplicity and determinism of the task.

:p Why is a lookup table better than ML for assigning states to zip codes?
??x
A lookup table is better in this case because:
1. **Deterministic**: Each zip code maps directly to one state.
2. **Efficient**: No training or computational overhead.
3. **Reliable**: Easy to verify and debug.
4. **Fast**: Instant lookup without processing.

In contrast, using ML would:
1. Be unnecessarily complex.
2. Require training data and computational resources.
3. Add risk of errors due to model misinterpretation.

This highlights the importance of choosing the right tool for the job—ML is powerful, but not always necessary.
x??

---

---

#### Data Availability and ML Models
ML models require data to learn from. Without data, it is impossible to train a model effectively. For example, predicting tax amounts requires access to tax and income data of a large population. However, in some cases, models can be deployed without initial data. In online learning, models start with no data but learn from data generated during production. Alternatively, companies may launch products using human predictions and collect data to train ML models later.

:p How does the availability of data affect machine learning model deployment?
??x
Data availability is crucial for training ML models. Without data, models cannot learn patterns. However, models can be deployed without initial training data in online learning scenarios, where they learn from real-time data. In zero-shot learning, models can predict outcomes for unseen tasks by leveraging prior knowledge from related tasks. If no data is available, companies may adopt a "fake-it-til-you-make-it" strategy, using human predictions to generate data for future model training.
x??

---

#### Predictive Problems and ML Applications
ML algorithms are fundamentally predictive—they make predictions about future or unknown outcomes. For example, predicting the weather, the Super Bowl winner, or a user’s next movie choice are all predictive tasks. As ML becomes more effective, more problems are being reframed as predictive problems. The value of ML lies in its ability to provide many cheap, approximate predictions, which can be useful in business and scientific applications.

:p Why are predictive tasks central to machine learning?
??x
Predictive tasks are central to ML because ML models are designed to estimate unknown outcomes based on input data. Examples include predicting the weather or a user’s next movie choice. As ML systems improve, more domains are being reframed around prediction. This is valuable because it allows ML to generate scalable, approximate predictions that can be used for decision-making in real-world applications.
x??

---

#### Online Learning and Production Data
In online learning, ML models can be deployed without being trained on any data initially. Instead, they learn from data that is generated in production. This allows models to adapt to new situations over time. For example, a recommendation system can start with no training data but gradually improve by learning from user interactions. This is especially useful in dynamic environments where data patterns change frequently.

:p What is online learning, and how does it differ from traditional ML training?
??x
Online learning is a method where ML models are deployed without initial training data and instead learn from data generated in production. Unlike traditional ML, where models are trained on a fixed dataset, online learning allows models to adapt and improve continuously as new data comes in. This is useful in environments where data patterns change over time, such as in recommendation systems or fraud detection.
x??

---

#### Example: Tax Prediction and Data Requirements
Predicting how much tax a person should pay requires access to tax and income data for a large population. Without this data, it is impossible to train an ML model for such a task. This demonstrates that data availability is a prerequisite for building effective ML models.

:p Why is data access critical for tax prediction models?
??x
Predicting tax amounts requires access to detailed income and tax data for individuals. Without this data, ML models cannot be trained to make accurate predictions. This shows that data availability is a fundamental requirement for ML applications, especially in regulated or data-intensive domains like taxation.
x??

---

#### Reframing Problems as Predictive Tasks
When dealing with computationally expensive tasks, it's often useful to reframe them as predictive problems. Instead of calculating exact outcomes, we approximate them using machine learning models. This is especially helpful in domains like graphics rendering, where tasks such as image denoising or screen-space shading can be approximated using ML algorithms.

:p What is the benefit of reframing a computationally expensive problem as a predictive task?
??x
Reframing a problem as a predictive task allows us to use ML models to approximate the outcome, which is often faster and less resource-intensive than computing the exact result. For example, in graphics rendering, instead of calculating every pixel accurately, an ML model can predict a close approximation that is visually acceptable and significantly faster to compute.
```java
// Pseudocode example of reframing a process as prediction
function predictRenderOutput(inputData) {
    // Use ML model to approximate the render output
    return mlModel.predict(inputData);
}
```
x??

---

#### Unseen Data and Distribution Similarity
For ML models to generalize well, unseen data must come from similar distributions as the training data. If the data distribution changes drastically (e.g., user behavior in 2008 vs. 2020), a model trained on older data will likely fail on newer data.

:p Why is it important for unseen data to come from a similar distribution as training data?
??x
If unseen data comes from a different distribution than training data, the model’s performance degrades significantly. For example, a model trained to predict app downloads in 2008 won’t work well in 2020 because user behavior and app popularity have changed. This highlights the importance of ensuring that the training and unseen data are drawn from similar underlying distributions.
x??

---

#### Repetitive Patterns and ML Learning
ML models perform better on repetitive tasks because they can learn patterns more effectively with repeated examples. While humans can recognize patterns from a few examples (few-shot learning), most ML systems require many examples to learn reliably.

:p How does repetition help ML models learn better?
??x
Repetition allows ML models to identify and internalize patterns more effectively. For instance, in tasks like image recognition or text classification, if a pattern appears multiple times, the model can learn it more robustly. This is in contrast to few-shot learning, where humans can generalize from just a few examples, but ML models typically require more data.
x??

---

#### Scale and ML Efficiency
ML solutions are most effective when applied at scale, meaning when they are used to make a large number of predictions or when there is a lot of data to train on. The upfront cost of building ML systems is offset when they are used repeatedly.

:p Why is scale important for ML effectiveness?
??x
Scale is important because it justifies the upfront investment in data, compute, and infrastructure needed for ML models. For example, a model that predicts support ticket routing for thousands of tickets daily can benefit from the large volume of data, improving accuracy and reducing manual effort. The more predictions made, the more valuable the model becomes.
x??

---

#### Changing Patterns and Model Adaptation
In domains where patterns change over time—like spam classification or fashion trends—ML models must be able to adapt to new data. Static models that don’t learn from new data will quickly become outdated.

:p How does the changing nature of patterns affect ML model usage?
??x
If patterns change over time, static ML models will fail unless they can be updated with new data. For example, spam emails used to include phrases like “Nigerian prince,” but now they may involve different tactics. Models that support continuous learning or retraining are essential to maintain performance in such dynamic environments.
x??

---

#### When Not to Use Machine Learning
Machine Learning is powerful, but it's not always the right tool for every problem. It should not be used if the use case is unethical, simpler solutions exist, one prediction error could lead to catastrophic outcomes, or if the cost of implementation outweighs the benefits. Understanding when to avoid ML is crucial for responsible deployment.
:p What are the conditions under which machine learning should not be used?
??x
1. **Unethical Use Cases**: ML should not be used if it leads to harm, discrimination, or violates privacy. For example, using ML to make hiring decisions based on biased data can perpetuate unfair practices.
2. **Simpler Solutions Exist**: If a problem can be solved with basic rule-based logic or traditional algorithms, using ML adds unnecessary complexity and cost.
3. **High-Risk Predictions**: In safety-critical domains like medical diagnosis or autonomous vehicles, even a small error in prediction could cause serious harm.
4. **Not Cost-Effective**: If the cost of building, training, and maintaining an ML model exceeds the benefit it provides, it's better to avoid it.
For example, a simple keyword matching system may be sufficient for filtering FAQs, rather than deploying a full-fledged chatbot.
x??

---

#### Latency Tolerance in ML Systems
Latency tolerance varies significantly between consumer and enterprise ML applications. In consumer applications, even a one-second delay might cause a user to switch to another app or service. However, in enterprise applications, users are often more tolerant of delays, especially if the system delivers significant value or cost savings. For example, a slight delay in a resource allocation system may not impact productivity but could save millions.

:p How does latency tolerance differ between consumer and enterprise ML applications?
??x
Latency tolerance is much stricter in consumer applications, where a delay of even one second may cause users to abandon an app. In contrast, enterprise applications are often more tolerant of latency because the value they deliver—such as cost savings or improved efficiency—can outweigh minor delays. For example, a delay in a resource allocation system might be acceptable if it leads to millions in savings.
x??

---

