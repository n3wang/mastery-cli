# High-Quality Flashcards: 2A001---AI-Engineering_-Building-Applications-with-Foundation-Models-OReilly-Media-2025Chip-Huyen--_processed (Part 5)


**Starting Chapter:** Summary

---


#### AI Engineering as a Discipline

Background context: The emergence of AI engineering is driven by the availability of foundation models, which simplify and accelerate application development. This shift brings more emphasis on interfaces and integrates frontend engineering skills.

:p What is AI engineering?
??x
AI engineering refers to the discipline of building applications using foundation models, which are pre-trained models capable of a wide range of tasks without significant retraining. The focus shifts towards creating user-friendly interfaces and integrating these models into various platforms like web, desktop, mobile, chatbots, etc.
x??

---


#### Shift in AI Development Workflow

Background context: Traditionally, ML engineering involves data collection, model training, and then product development. However, with the availability of foundation models, developers can start by building products first and invest in data and models only if the product shows promise.

:p How has the workflow for AI engineering changed?
??x
The new workflow rewards fast iteration by allowing developers to start building products using pre-trained models first. This approach enables quicker feedback loops and more efficient development cycles.
x??

---


#### New Workflow for AI Engineering

Background context: With the rise of foundation models, it is possible to start with building products first and only invest in data and models if the product shows promise. This contrasts with the traditional workflow where data collection and training come before product development.

:p How does the new AI engineering workflow differ from traditional ML engineering?
??x
The new AI engineering workflow emphasizes starting with product design and development, leveraging pre-trained foundation models to quickly build prototypes. The focus shifts towards rapid iteration based on user feedback rather than spending initial resources on data collection and model training.
x??

---


#### Rapid Evolution of AI

Background context: The chapter highlights the transition from language models to large language models and how these advancements have led to new application patterns.

:p What are some notable transformations discussed in the chapter?
??x
The chapter discusses the evolution from language models to large language models, driven by self-supervision techniques. It also covers how these models incorporate other data modalities and give rise to AI engineering.
x??

---


#### Training Data Distribution
Background context: Model developers curate training data, which significantly influences a model's capabilities and limitations. The distribution of this training data is crucial as it shapes how well the model performs on different types of tasks.

:p How does the distribution of training data affect a model?
??x
The distribution of training data impacts a model’s performance across various tasks. A model trained with diverse data will likely generalize better to unseen scenarios compared to one that was trained on a narrow set of examples. For instance, if a language model is primarily trained on tech-related texts, it may struggle when given financial or literary content.

```java
// Example code demonstrating how different datasets can be combined for training
public class DataMerger {
    public static Dataset mergeDatasets(Dataset dataset1, Dataset dataset2) {
        // Combine two datasets by concatenating their data arrays
        List<String> mergedData = new ArrayList<>(dataset1.getData());
        mergedData.addAll(dataset2.getData());

        return new Dataset(mergedData);
    }
}
```
x??

---


#### Transformer Architecture Dominance
Background context: The transformer architecture has been the dominant choice for foundation models due to its ability to handle long-range dependencies and parallelize computations efficiently. Understanding why it is so special requires delving into its design principles.

:p Why does the transformer architecture continue to dominate in model development?
??x
The transformer architecture continues to dominate because of its unique properties that enhance performance on complex tasks like natural language processing (NLP). Key reasons include:

1. **Self-Attention Mechanism**: Allows each position in the input sequence to attend over all other positions, enabling it to capture dependencies at different scales.
2. **Parallelization**: Computation can be parallelized easily due to its structure, significantly reducing training time and allowing larger models.

```java
// Pseudocode for a simple transformer layer
public class TransformerLayer {
    public OutputLayer applySelfAttention(InputLayer input) {
        // Apply self-attention mechanism to the input
        return new OutputLayer(selfAttention.apply(input));
    }
}
```
x??

---


#### Sampling in Models
Background context: Sampling is a critical process where models choose outputs from all possible options. This process can significantly affect model behavior and performance, especially leading to issues like hallucinations.

:p What role does sampling play in AI models?
??x
Sampling plays a crucial role in how AI models generate outputs. It determines the selection of an output from multiple possibilities, affecting factors such as consistency, reliability, and overall performance. Poor sampling strategies can lead to incorrect or misleading predictions.

```java
// Pseudocode for a simple sampling strategy
public String sampleFromOptions(List<String> options) {
    // Choose one option randomly based on certain criteria (e.g., probabilities)
    return options.get(random.nextInt(options.size()));
}
```
x??

---

---


#### Training Data Quality and Sources

Background context: The quality of training data significantly affects the performance of AI models. Different sources of training data have varying degrees of reliability and relevance.

:p How does the choice of training data impact an AI model's performance?

??x
The choice of training data greatly influences how well an AI model performs on specific tasks. If the data is not representative or lacks certain features, the model may struggle with those aspects during inference. For instance, if a translation model has limited exposure to Vietnamese text in its training set, it will perform poorly when translating English to Vietnamese.

Code examples are less relevant here, but consider the following scenario where we evaluate the quality of different datasets:

```python
def evaluate_dataset_quality(data):
    # Example function to evaluate dataset based on criteria like diversity and relevance.
    quality_score = 0
    if "Vietnamese" in data:
        quality_score += 2
    if "Clickbait" not in data:
        quality_score += 1
    return quality_score

# Evaluating a hypothetical dataset
data_quality_score = evaluate_dataset_quality(common_crawl_data)
print(f"The quality score of the dataset is {data_quality_score}.")
```

x??

---


#### Common Crawl and Its Usage in Training AI Models

Background context: Common Crawl is an extensive web crawling project that collects vast amounts of data, often used as a source for training large language models. However, the data collected can be noisy and may contain unwanted content like fake news or biased information.

:p What are some issues with using Common Crawl as a primary training data source?

??x
Using Common Crawl as a primary training data source has several potential issues. The data is often unfiltered and can include low-quality, irrelevant, or harmful content such as clickbait, misinformation, propaganda, racism, and more. Additionally, the quality of the crawled websites varies widely, ranging from reputable news outlets to sketchy websites.

Code examples are less relevant here, but consider how a model might filter out certain types of data:

```python
def filter_common_crawl_data(data):
    # Example function to filter out noisy or harmful content.
    filtered_data = []
    for item in data:
        if "clickbait" not in item and "misinformation" not in item:
            filtered_data.append(item)
    return filtered_data

# Filtering a hypothetical dataset
filtered_common_crawl_data = filter_common_crawl_data(common_crawl_data)
print(f"The amount of filtered data is {len(filtered_common_crawl_data)}.")
```

x??

---


#### Model Performance and Data Relevance

Background context: The performance of an AI model depends on the relevance and quality of its training data. If a model lacks exposure to certain types of data, it may not perform well when encountering those scenarios during inference.

:p Why might a translation model trained only on animal images struggle with plant-based content?

??x
A translation model trained exclusively on animal images would be poorly equipped to handle plant-related content due to the lack of relevant training examples. The model's knowledge base is limited to what it has been exposed to, and without any exposure to plant images or related data during training, its ability to understand and translate terms associated with plants will be severely lacking.

Code examples are less relevant here, but consider a hypothetical example:

```python
def evaluate_model_performance(model, test_data):
    # Example function to assess model performance on specific tasks.
    correct_predictions = 0
    total_predictions = len(test_data)
    for item in test_data:
        if model.predict(item) == item['expected_output']:
            correct_predictions += 1
    return (correct_predictions / total_predictions) * 100

# Evaluating a translation model's performance on plant-related content
performance_score = evaluate_model_performance(translation_model, plant_based_test_data)
print(f"The model performs at {performance_score}% accuracy for plant-based content.")
```

x??

---


#### Curating Datasets for Specific Needs

Background context: To ensure that an AI model performs well on specific tasks or domains, it is crucial to curate datasets that are tailored to those needs. This involves selecting and preprocessing data that aligns with the target application.

:p How can one create a specialized dataset for training a translation model?

??x
To create a specialized dataset for training a translation model, you need to gather and preprocess text in both source and target languages, ensuring they are relevant to the specific domain or task. For example, if you want to train a model for translating legal documents from English to Spanish, you should collect and clean texts that pertain to legal language.

Code examples can help illustrate the process:

```python
def curate_dataset(source_lang, target_lang, domain):
    # Example function to curate a dataset based on specific language and domain.
    source_text = get_texts_from_domain(domain, lang=source_lang)
    target_text = get_translations_of_texts(source_text, target=target_lang)
    curated_data = list(zip(source_text, target_text))
    return curated_data

# Curating a dataset for legal documents in English to Spanish
curated_legal_dataset = curate_dataset("en", "es", "legal")
print(f"The curated dataset contains {len(curated_legal_dataset)} entries.")
```

x??

---


#### Finetuning Models on General-Purpose Models

Background context: Instead of training models from scratch, many teams choose to finetune existing general-purpose models on specific tasks or domains. This approach leverages the strengths of pre-trained models while tailoring them for new applications.

:p Why would a team prefer to finetune an existing model rather than train a new one?

??x
A team might prefer to finetune an existing model instead of training a new one because it saves time, resources, and computational power. Pre-trained models have already learned general patterns and features from large datasets, which can serve as a good starting point for specific tasks. Finetuning allows the model to adapt more quickly to new data without requiring extensive retraining.

Code examples could illustrate this process:

```python
def finetune_model(model, training_data):
    # Example function to fine-tune a pre-trained model.
    model.train(training_data)
    return model

# Finetuning an existing model on plant-related content
finetuned_model = finetune_model(general_purpose_model, plant_based_training_data)
print("Model has been successfully finetuned for plant-based content.")
```

x??

---

---


#### Data Quality and Model Performance

Background context: The quality of training data significantly impacts model performance. High-quality, smaller datasets can outperform large low-quality datasets. This is demonstrated by Gunasekar et al. (2023), who trained a 1.3B-parameter model on 7 billion tokens of high-quality coding data that outperformed larger models.

:p How does the quality of training data affect model performance?
??x
The quality of training data greatly influences how well a model performs, often more than the quantity of data. High-quality, smaller datasets can surpass large low-quality datasets in terms of performance.
x??

---


#### Benchmarks for Domain-Specific Performance
Background context: The text provides an example of how models like CLIP and OpenCLIP perform on specific image datasets, indicating their strengths and limitations.

:p How can benchmarks help determine a model's performance on domain-specific tasks?
??x
Benchmarks provide a way to measure a model’s proficiency in specific areas by testing it against well-defined criteria. For instance, Table 2-3 shows how CLIP and OpenCLIP perform on datasets related to birds, flowers, cars, etc., which can indicate the models' strengths and limitations in recognizing these categories.

For domain-specific tasks like drug discovery or cancer screening, such benchmarks can help identify whether a model is suitable by showing its accuracy in relevant categories.
x??

---


#### Training Data Impact
Background context: This section discusses how the training data influences a model's performance on various domains. The text mentions that general-purpose models are trained on diverse datasets, while domain-specific models are curated for particular fields.

:p How does the quality and type of training data affect a model’s performance?
??x
The quality and type of training data significantly impact a model's performance across different domains. General-purpose models benefit from broad exposure to various subjects through large, diverse datasets like Common Crawl. However, domain-specific tasks require specialized knowledge that may not be present in general internet data.

For example, drug discovery involves protein, DNA, and RNA data, which are unlikely to appear frequently enough in public web content for a model to learn effectively from it.
x??

---

---

