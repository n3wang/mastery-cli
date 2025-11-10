# High-Quality Flashcards: 2A001---AI-Engineering_-Building-Applications-with-Foundation-Models-OReilly-Media-2025Chip-Huyen--_processed (Part 16)


**Starting Chapter:** Summary

---


#### Correlation Between Metrics
Metrics used to evaluate models should be analyzed for their correlation. Perfectly correlated metrics are redundant, while non-correlated ones might indicate an interesting insight or suggest that the metrics are not trustworthy.

:p How do you determine if two metrics are correlated?
??x
To determine if two metrics are correlated, one can use statistical methods such as Pearson's correlation coefficient or Spearman's rank correlation. These measures help in understanding how strongly related two variables (metrics) are.
```python
import numpy as np
from scipy.stats import pearsonr

def check_correlation(metric1, metric2):
    # Calculate the Pearson correlation coefficient and p-value
    corr_coef, _ = pearsonr(metric1, metric2)
    return corr_coef

# Example usage:
metric1 = [0.8, 0.6, 0.9, 0.7]
metric2 = [0.5, 0.4, 0.3, 0.2]
correlation = check_correlation(metric1, metric2)
print(f"Correlation: {correlation}")
```
x??

---


#### Cost and Latency of Evaluation Pipeline
Evaluation pipelines can add significant latency and cost to the application if not managed properly. Careful design is necessary to ensure that these costs do not overshadow the benefits.

:p How does evaluation pipeline impact the cost and latency of an application?
??x
An evaluation pipeline, when poorly designed, can introduce substantial overhead in terms of both time (latency) and resources (cost). This happens because frequent evaluations require running models on test data, which consumes computational power and potentially delays other operations. To mitigate this, one should carefully optimize the evaluation process.

For example, if an application is evaluated every minute but only 1% of its operations are related to evaluation, this could lead to unnecessary resource usage. Optimizations might include evaluating less frequently or optimizing the evaluation code.
```java
public class EvaluationScheduler {
    private static final int EVALUATION_INTERVAL_MINUTES = 5; // Evaluate every 5 minutes

    public void scheduleEvaluation() {
        // Schedule evaluation task with appropriate latency and cost considerations
        System.out.println("Scheduling next evaluation in " + EVALUATION_INTERVAL_MINUTES + " minutes.");
    }
}
```
x??

---


#### Iteration of Evaluation Criteria
As the application evolves, so will its evaluation criteria. It is essential to adapt these criteria over time to reflect changes in needs and user behavior.

:p Why do we need to iterate on our evaluation pipeline?
??x
Iterating on the evaluation pipeline is necessary because as applications evolve, their requirements change. User behaviors, technological advancements, and business goals may shift, leading to a need for updated evaluation metrics and criteria. This ensures that the evaluations remain relevant and provide meaningful insights into model performance.

For instance, if an application initially focused on text generation quality but later needed to include safety checks due to new regulations, the evaluation criteria would need to be adjusted.
```java
public class EvaluationPipeline {
    private List<Criterion> criteria;

    public void updateCriteria(List<Criterion> newCriteria) {
        this.criteria = newCriteria;
        System.out.println("Evaluation criteria updated.");
    }
}
```
x??

---


#### Importance of Reliability in Evaluation Pipeline
A reliable evaluation pipeline is crucial for effective AI adoption. It enables risk reduction, performance improvements, and benchmarking progress.

:p Why is a reliable evaluation pipeline important?
??x
A reliable evaluation pipeline is essential because it ensures that the evaluation results are consistent, meaningful, and can be used to guide development decisions. Without reliability, the evaluation process may produce inconsistent or unreliable data, making it difficult to trust the outcomes and make informed choices about model improvements.

For example, if an evaluation pipeline changes frequently without clear tracking of variables, developers might struggle to pinpoint what caused performance drops or improvements.
```java
public class EvaluationTracker {
    private Map<String, Object> logs;

    public void logEvaluation(EvaluationResult result) {
        String log = "Evaluation at " + new Date() + ": " + result;
        this.logs.put(log, System.currentTimeMillis());
    }
}
```
x??

---


#### Decision Between Hosting Models or Using APIs
The choice between hosting models in-house and using model APIs depends on various factors including data privacy, performance, control, and cost.

:p What are the pros and cons of hosting models versus using APIs?
??x
The decision to host models in-house (build) versus using external APIs (buy) involves several considerations:

**Pros of Building:**
- **Data Privacy:** Full control over data.
- **Customization:** Ability to tailor models to specific needs.
- **Control:** Direct access and management.

**Cons of Building:**
- **Cost:** Higher initial and ongoing costs for infrastructure, maintenance, and expertise.
- **Maintenance:** Requires continuous updates and improvements.
- **Latency:** May introduce latency due to local processing.

**Pros of Using APIs:**
- **Lower Cost:** Often cheaper as no need for infrastructure.
- **Ease of Use:** Immediate access with minimal setup.
- **Performance:** Can leverage cloud providers' optimized hardware.

**Cons of Using APIs:**
- **Data Privacy:** Less control over data.
- **Limited Customization:** May not meet all specific needs.
- **Dependency:** Reliance on external services for performance and availability.
```java
public class ModelSelection {
    private String modelType;

    public void decideModelType(String privacy, String customization) {
        if (privacy == "high" && customization == "custom") {
            modelType = "Hosted";
        } else {
            modelType = "API";
        }
        System.out.println("Selected model type: " + modelType);
    }
}
```
x??

---


#### Public Benchmarks for Model Selection
Public benchmarks can help identify poor models but may also include data that has been used in training many other models, making them less useful for finding the best models tailored to specific applications.

:p How do public benchmarks impact model selection?
??x
Public benchmarks are valuable tools for initial screening and identifying poorly performing models. However, they have limitations:

- **Training Data Contamination:** Many models use similar datasets during training, leading to biases in benchmark results.
- **Selection Bias:** Not all metrics or criteria are uniformly applied across different benchmarks.
- **Limited Relevance:** Benchmarks may not cover the specific needs of your application.

To mitigate these issues, teams should:
1. Use multiple benchmarks for validation.
2. Consider domain-specific metrics relevant to their application.
3. Avoid relying solely on public benchmarks and supplement with custom evaluations.
```java
public class BenchmarkEvaluator {
    private List<Benchmark> benchmarks;

    public void evaluateModels(List<AIModel> models) {
        for (AIModel model : models) {
            boolean passesBenchmark = false;
            for (Benchmark benchmark : benchmarks) {
                if (benchmark.passes(model)) {
                    passesBenchmark = true;
                    break;
                }
            }
            if (!passesBenchmark) {
                System.out.println("Model " + model.getName() + " fails public benchmarks.");
            } else {
                System.out.println("Model " + model.getName() + " passes public benchmarks.");
            }
        }
    }
}
```
x??

---


#### Creation of Evaluation Pipeline
Creating an evaluation pipeline involves defining criteria, tracking variables, and ensuring consistency over time. This process is critical for guiding the development of AI applications.

:p What are the key steps in creating an evaluation pipeline?
??x
Key steps in creating an evaluation pipeline include:

1. **Define Criteria:** Establish clear metrics that align with your application’s goals.
2. **Track Variables:** Log all variables that could change during evaluations, such as data sets, scoring rubrics, and configurations.
3. **Iterate Consistently:** Ensure the pipeline evolves but maintains consistency to provide meaningful comparisons over time.

For example:
- Define criteria like factual accuracy, fluency, coherence, and safety for NLP models.
- Track changes in evaluation data, scoring rules, and sampling methods used by AI judges.
- Use logging to record these variables systematically.
```java
public class EvaluationPipelineBuilder {
    private List<String> logVariables;

    public void buildPipeline(List<Criterion> criteria) {
        logVariables = new ArrayList<>();
        for (Criterion criterion : criteria) {
            // Log all relevant variables
            logVariables.add(criterion.getName());
        }
    }

    public void trackVariable(String variable) {
        if (!logVariables.contains(variable)) {
            logVariables.add(variable);
        }
    }
}
```
x??

---

---


#### Prompt Engineering vs. Finetuning
Unlike finetuning, which involves changing a model’s weights through training, prompt engineering modifies how the model responds by guiding it with instructions.
:p How does prompt engineering differ from finetuning?
??x
Prompt engineering guides an AI model's behavior without altering its underlying structure (weights). In contrast, finetuning involves adjusting the model's parameters to better fit a specific task. Prompt engineering is easier and less resource-intensive than finetuning but can be just as effective for simpler tasks.
x??

---


#### Best Practices for Prompt Engineering
Best practices include systematic experimentation and evaluation, clear task descriptions, and understanding the model's capabilities and limitations.
:p What are some best practices for prompt engineering?
??x
Some best practices for prompt engineering include:
- Systematic Experimentation: Designing experiments with varying prompts to see which ones produce better results.
- Clear Task Descriptions: Providing detailed instructions that guide the model effectively.
- Understanding Model Capabilities: Knowing what the model can and cannot do helps in crafting more effective prompts.

Example Best Practice:
```
When asking for a summary, specify whether you want it in bullet points or full sentences.
```
x??

---


#### Conclusion on Prompt Engineering
Prompt engineering is a fundamental skill for building AI applications, but it should be part of a broader set of skills including statistics, ML knowledge, and dataset curation.
:p What key points about prompt engineering were discussed?
??x
Key points about prompt engineering include:
- It's the process of crafting instructions to get models to generate desired outcomes.
- It is easier and less resource-intensive than finetuning but can be just as effective for simple tasks.
- Conducting experiments with rigor, understanding model capabilities, and systematic evaluation are important practices.
- It should complement other skills like statistics, ML knowledge, and dataset curation for building robust AI applications.

Example Summary:
```
Prompt engineering is a versatile technique that requires creativity, understanding of models, and rigorous testing. It's not just about fiddling with words but involves strategic communication to achieve desired outcomes.
```
x??

---


#### Prompt Engineering for NER
Background context explaining Named Entity Recognition (NER) and how prompting can be used to improve model performance. Mention that NER is a common task where models need to identify named entities such as persons, organizations, locations, etc., within unstructured text.

:p What are the key elements of prompt engineering when dealing with NER tasks?
??x
Prompt engineering for NER involves carefully crafting instructions and examples to guide the model on how to recognize specific types of entities in text. The key steps include providing clear task descriptions, using labeled data as examples, and ensuring that the prompts are concise yet comprehensive.

For example:
```plaintext
The concrete task is to identify named entities like persons, organizations, and locations within a given text.
```
x??

---


#### Robustness of Models
Background context on how models can be tested for their robustness by perturbing prompts and observing changes in output. Discuss the correlation between model strength and robustness.

:p How can one evaluate whether a model is robust to prompt perturbation?
??x
To evaluate a model's robustness, you can introduce small changes to the prompts (e.g., changing "5" to "five", adding new lines) and observe if the model’s response changes significantly. This evaluation helps in understanding how well the model adheres to instructions despite minor variations.

For example:
```plaintext
Randomly perturb the prompt: Replace “five” with “5”, add a new line, or change capitalization.
```
x??

---


#### In-Context Learning for NER
Background context on in-context learning and its application in tasks like Named Entity Recognition. Explain how models can learn from examples within prompts without explicit training.

:p What is in-context learning in the context of NER?
??x
In-context learning refers to a model’s ability to understand and adapt to new instructions or tasks based on examples provided directly in the prompt, rather than through traditional training methods. For NER, this means providing labeled examples within the prompt so that the model can learn how to identify specific entities.

For example:
```plaintext
Identify persons, organizations, and locations in the following text: "Apple Inc., founded by Steve Jobs and Steve Wozniak, is a leading tech company."
```
x??

---


#### Stronger Models and Prompt Engineering
Background on how stronger models are more robust to prompt changes and require less tweaking. Discuss the correlation between model capability and robustness.

:p Why do stronger models require less fiddling with prompts?
??x
Stronger models, due to their improved understanding of language and context, are more robust to minor perturbations in prompts. This means that they can better follow instructions even if there are slight changes in the prompt wording or structure, reducing the need for extensive tweaking.

For example:
```plaintext
Prompt: "Identify persons, organizations, and locations in this text."
Perturbed Prompt: "Identify people, companies, and places in this text."
```
The model’s response should remain consistent despite the minor change.
x??

---


#### Continual Learning via In-Context Updates
Background on continual learning and how in-context updates can keep models relevant over time. Explain the benefits of this approach.

:p How does in-context updating benefit models?
??x
In-context updating allows models to learn new information continuously without needing retraining, making them more adaptable to evolving data or technologies. This is particularly useful for tasks that require frequent updates, such as keeping up with new versions of programming languages.

For example:
```plaintext
Context Update: "JavaScript has introduced a new feature called async/await. How does this work?"
```
x??

---


#### Few-Shot Learning
Background context explaining few-shot learning. Few-shot learning involves teaching a model using only a few examples.

:p What is few-shot learning?
??x
Few-shot learning refers to teaching a model by providing it with a small number of examples, usually less than the maximum context length allowed by the model.
For instance, 5-shot learning uses five examples, and zero-shot learning uses no examples at all. The optimal number of examples varies depending on the model and application.

:p How does few-shot learning compare to zero-shot learning in terms of performance?
??x
In general, showing more examples can improve a model's performance. However, for some models like GPT-4, few-shot learning showed only limited improvement compared to zero-shot learning. This suggests that as models become more powerful, they may need fewer examples to perform well.

:p What is the impact of context length on few-shot learning?
??x
The number of examples in a prompt is limited by the model's maximum context length. Adding more examples increases the prompt length and can increase inference costs.
```python
# Example: Calculating context length for different shot types
def calculate_context_length(num_shots, example_length):
    return num_shots * example_length + 50  # Add a constant overhead for instructions

context_length = calculate_context_length(5, 100)
print(f"Context length with 5-shot learning: {context_length}")
```
x??

---


#### Model Power and Few-Shot Learning
Background context explaining how the power of a model affects its ability to perform with fewer examples.

:p How does the power of a model affect its need for examples in few-shot learning?
??x
As models become more powerful, they can better understand and follow instructions, leading to better performance with fewer examples. This suggests that while more examples are generally beneficial, highly capable models might require fewer examples to perform well.
```java
// Example: Simulating model performance based on its power
public class ModelPowerSimulation {
    public static String simulatePerformance(int modelPower) {
        if (modelPower > 1000) { // Hypothetical threshold for powerful models
            return "Better with fewer examples";
        } else {
            return "Needs more examples";
        }
    }

    public static void main(String[] args) {
        System.out.println(simulatePerformance(1200));
    }
}
```
x??

---


#### Context Length and Model Capabilities
Context length plays a critical role in how much information can be included in a prompt. The model's context limit has expanded rapidly, from 1K for GPT-2 to 2M for Gemini-1.5 Pro within five years.

The first three generations of GPTs have the following context lengths:
- GPT-1: 1K
- GPT-2: 2K
- GPT-3: 4K

A 100K context length can fit a moderate-sized book, and a 2M context length can accommodate approximately 2,000 Wikipedia pages or a complex codebase like PyTorch.

:p What is the relationship between context length and model capabilities?
??x
Context length directly influences how much information a model can process at once. Longer context lengths allow for more detailed and comprehensive prompts, which can be crucial for tasks requiring extended reasoning or large amounts of input data. For example, 2M context length allows handling complex codebases like PyTorch or extensive documents.

The expansion from 1K to 2M context length has been rapid, indicating a race among model providers to increase this limit.
x??

---

