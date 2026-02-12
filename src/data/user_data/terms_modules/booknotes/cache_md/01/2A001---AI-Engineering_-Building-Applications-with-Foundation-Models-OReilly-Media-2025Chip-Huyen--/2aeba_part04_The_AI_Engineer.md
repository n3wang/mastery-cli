

#### AI Engineering vs. ML Engineering

Background context: The text differentiates between AI engineering and traditional ML engineering, noting that they share significant overlap but have distinct roles in the AI application building process.

:p How does AI engineering differ from traditional ML engineering?
??x
AI engineering differs from traditional ML engineering primarily by focusing on:
- Dealing with more complex and dynamic models.
- Managing regulatory compliance issues related to national security concerns.
- Ensuring data privacy and intellectual property rights.
While both roles involve similar technical skills, AI engineers often work in environments with stricter legal and ethical considerations.

x??

---


#### Engineering Stack for Building AI Applications

Background context: The text introduces the concept of an AI engineering stack, emphasizing that while there is a lot of hype around new tools and techniques, understanding the fundamental building blocks is essential.

:p What are the key components of the AI engineering stack?
??x
The key components include:
- Data management.
- Model training and evaluation.
- Deployment and monitoring.
- Version control and infrastructure support.
These components form the backbone of any AI application, ensuring it can scale and adapt to changing conditions.

Example: A typical stack might involve using tools like TensorFlow for model training, Docker for deployment, and Git for version control.

x??

---

---


#### Application Development Layer
Background context: The application development layer is where anyone can use readily available models to develop applications. It's a rapidly evolving field that requires good prompts, necessary context, and rigorous evaluation of the applications developed.

:p What does application development in AI involve?
??x
Application development in AI involves providing a model with well-crafted prompts and necessary context. The process also requires thorough evaluation to ensure that the applications are effective and user-friendly.
```java
public class ApplicationDeveloper {
    public void developApplication(String prompt, Context context) {
        // Use pre-existing models to develop an application based on the prompt and context provided.
        Model model = fetchModel(prompt);
        Application app = generateApplication(model, context);
        evaluateApplication(app); // Ensure the application meets quality standards
    }
}
```
x??

---


#### Model Development Layer
Background context: The model development layer provides tools for developing new models, including frameworks for modeling, training, finetuning, and inference optimization. It also involves dataset engineering.

:p What does the model development layer include?
??x
The model development layer includes:
- Frameworks for modeling, training, finetuning, and inference optimization.
- Dataset engineering to centralize data used in model development.

x??

---


#### Infrastructure Layer
Background context: The infrastructure layer is crucial for deploying models at scale. It involves managing resources such as data and compute, and monitoring the performance of deployed models.

:p What does the infrastructure layer include?
??x
The infrastructure layer includes:
- Tooling for model serving to deploy models in production environments.
- Data management tools to handle large datasets.
- Compute management to allocate appropriate resources based on needs.
- Monitoring systems to track the performance and health of deployed models.

x??

---


#### ML vs. AI Engineering Principles

Background context: The principles of building AI applications are similar to those of traditional machine learning (ML) engineering, but with key differences.

:p How do enterprise use cases for AI applications differ from classical ML engineering?

??x
Enterprise use cases for AI applications still require solving business problems by mapping between business metrics and ML metrics. Systematic experimentation is essential, whether it involves hyperparameters in classical ML or models, prompts, retrieval algorithms, and more in foundation models.
x??

---


#### Key Differences Between AI and ML Engineering

Background context: Building applications using foundation models today differs from traditional ML engineering in three major ways.

:p What are the three major differences between AI engineering and traditional ML engineering?

??x
The three major differences are:
1. Traditional ML requires training your own models, whereas AI engineering uses pre-trained models.
2. Foundation models consume more compute resources and incur higher latency, requiring efficient training and inference optimization.
3. Open-ended outputs in foundation models make evaluation a more challenging task.
x??

---


#### Evaluation Challenges in AI Engineering

Background context: The evaluation process is significantly more complex due to open-ended outputs from foundation models.

:p What makes model evaluation a larger challenge in AI engineering?

??x
Evaluation becomes much harder because foundation models can produce open-ended outputs, which offer flexibility but also complicate the assessment of their performance and utility.
x??

---


#### Finetuning
Background context explaining finetuning as a method to update model weights by making changes directly to the model. This technique is more complex and requires more data but can significantly improve model performance.

:p What does finetuning involve in adapting a model?
??x
Finetuning involves updating the model weights by making direct changes to the model itself. Unlike prompt-based methods, this approach modifies the internal parameters of the model. While it is more complex and requires more data, finetuning can significantly enhance the quality, latency, and cost-effectiveness of models, especially for tasks that require high performance or are not adequately addressed by simpler methods.
x??

---


#### Model Development Layer
Background context describing the responsibilities in developing an AI application, including modeling and training, dataset engineering, inference optimization, and evaluation.

:p What are the three main responsibilities of model development?
??x
The three main responsibilities of model development include:
1. **Modeling and Training**: This involves creating a model architecture, training it using appropriate datasets, and finetuning the model to improve performance.
2. **Dataset Engineering**: This step focuses on preparing and processing data for use in the models, including cleaning, normalization, augmentation, and labeling.
3. **Inference Optimization**: This responsibility involves optimizing the model's deployment to ensure efficient and effective predictions during real-time or production use.

These responsibilities collectively ensure that an AI application can be developed and deployed effectively.
x??

---


#### Modeling and Training
Background context on modeling and training, including examples of tools like TensorFlow, Hugging Face’s Transformers, and Meta’s PyTorch. It also mentions the need for specialized ML knowledge to develop models.

:p What are some popular tools used in modeling and training?
??x
Some popular tools used in modeling and training include:
- **Google's TensorFlow**: A powerful platform for building and deploying machine learning models.
- **Hugging Face’s Transformers**: A library that provides state-of-the-art models and pipelines for natural language processing tasks.
- **Meta’s PyTorch**: An open-source machine learning library based on the Torch library, widely used in deep learning research.

These tools provide a range of functionalities from model building to training and inference optimization. Developers need specialized ML knowledge to effectively use these tools, including understanding different types of algorithms like clustering, logistic regression, decision trees, collaborative filtering, as well as neural network architectures such as feedforward, recurrent, convolutional, and transformer models.
x??

---


#### Evaluation
Background context on evaluation in the application development layer, noting that it is discussed further in a separate section.

:p Why is evaluation important in model development?
??x
Evaluation is crucial in model development because it helps assess the performance of the model against predefined metrics or criteria. While most people will encounter evaluation first in the application development layer, understanding its role in model development ensures comprehensive testing and validation before deployment. Evaluation helps identify any shortcomings in the model's performance, ensuring that it meets the required standards for accuracy, reliability, and efficiency.
x??

---

---


---
#### Pre-training
Pre-training refers to training a model from scratch—the model weights are randomly initialized. For large language models (LLMs), pre-training often involves training a model for text completion. Out of all training steps, pre-training is often the most resource-intensive by a long shot. For the InstructGPT model, pre-training takes up to 98 percent of the overall compute and data resources.
:p What does pre-training involve?
??x
Pre-training involves training a model from scratch with randomly initialized weights. This phase focuses on learning general knowledge or patterns that can be applied across various tasks. It is highly resource-intensive due to the extensive computation required for large models like LLMs.
x??

---


#### Finetuning
Finetuning means continuing to train a previously trained model—the model weights are obtained from the previous training process. Because the model already has certain knowledge from pre-training, finetuning typically requires fewer resources (e.g., data and compute) than pre-training.
:p What is finetuning?
??x
Finetuning involves further training an existing model that has been pretrained to refine its performance on specific tasks. This phase leverages the pre-trained knowledge to adapt the model more effectively for a particular application with less computational resources compared to the initial pre-training process.
x??

---


#### Post-training
Post-training and finetuning are often used interchangeably, but sometimes people might use them differently to signify different goals. Conceptually, post-training is done by model developers, while finetuning can be performed by application developers. It’s usually post-training when a model like InstructGPT is improved for following instructions before release.
:p What does the term "post-training" typically refer to?
??x
Post-training typically refers to further optimizing or improving an already pretrained model for specific tasks, often done by model developers. This could include adjustments that make the model better at certain aspects of its function, such as enhancing instruction-following capabilities in InstructGPT.
x??

---


---
#### Dataset Engineering
Background context explaining dataset engineering, including its importance and differences from traditional ML engineering. Foundation models require more open-ended data annotation compared to close-ended models like spam classification.

:p What is dataset engineering?
??x
Dataset engineering involves curating, generating, and annotating the data needed for training and adapting AI models. It's particularly challenging for foundation models due to their open-ended nature, where annotating queries requires significant effort compared to predefined values.

For example, while it might be straightforward to classify an email as "spam" or "not spam," writing a coherent essay is much more complex and time-consuming.

```java
// Pseudocode for basic dataset annotation process
public class AnnotationTool {
    public void annotateData(String data) {
        // Process the input data (e.g., text, images)
        if (data.contains("harmful content")) {
            label = "toxic";
        } else if (data.matches(patternForSpam)) {
            label = "spam";
        } else {
            label = "neutral";
        }
        // Output the labeled data for further processing
    }
}
```
x??

---


#### Inference Optimization

Background context explaining the importance of inference optimization for both traditional ML and foundation models, with a particular emphasis on the challenges faced by foundation models due to their autoregressive nature.

:p What is inference optimization?

??x
Inference optimization involves making AI models faster and cheaper. It has always been important in machine learning (ML) engineering because users want fast models, and companies benefit from cost savings. With the rise of foundation models, which can be computationally intensive and time-consuming to generate outputs, inference optimization becomes even more critical.

For instance, autoregressive generation processes used by many foundation models (like text generation) require multiple sequential steps, each taking a certain amount of time. Reducing latency is crucial for maintaining user satisfaction in real-time applications.

```java
// Pseudocode for inference optimization techniques
public class InferenceOptimizer {
    public String optimizeInference(String input, FoundationModel model) {
        // Techniques like beam search or other optimization algorithms can be used here
        return optimizedOutput;
    }
}
```
x??

---


#### Data Needs for Different Adapter Techniques

Background context explaining how the amount of data required varies depending on whether you are training a model from scratch, fine-tuning an existing model, or using prompt engineering.

:p How does the amount of data needed differ between different adapter techniques?

??x
The amount of data required significantly depends on the adapter technique used:

- **Training a Model from Scratch**: Requires large amounts of high-quality labeled data.
- **Fine-Tuning**: Requires less data but still needs to be carefully curated and relevant.
- **Prompt Engineering**: Typically requires minimal data, focusing more on well-crafted prompts.

For example:
```java
// Pseudocode for different data requirements
public class DataRequirement {
    public int getRequiredData(int adapterTechnique) {
        if (adapterTechnique == 0) { // Training from scratch
            return 100000; // Large dataset required
        } else if (adapterTechnique == 1) { // Fine-tuning
            return 50000; // Smaller but still significant dataset
        } else { // Prompt Engineering
            return 1000; // Minimal data needed
        }
    }
}
```
x??

---

---


#### Evaluation of Foundation Models
Evaluation is a critical process to mitigate risks and uncover opportunities, essential throughout the model adaptation process. It's necessary for selecting models, benchmarking progress, determining deployment readiness, and detecting issues or improvement opportunities.

Evaluation becomes even more important with foundation models due to their open-ended nature and expanded capabilities. Traditional ML tasks often have expected ground truths that can be compared against model outputs, but this is not always the case with open-ended tasks like chatbots, where many possible responses make it challenging to curate exhaustive lists of ground truths.

:p What are some challenges in evaluating foundation models?
??x
The challenges include the open-ended nature of tasks and the expanded capabilities of the models. For example, in tasks like chatbots, there are numerous potential responses, making it difficult to create comprehensive ground truth data. Additionally, different adaptation techniques can affect model performance differently.
x??

---


#### Prompt Engineering for Foundation Models
Prompt engineering involves using carefully crafted prompts to elicit desired behaviors from AI models without changing the underlying model weights. This technique is crucial because different prompts can significantly impact model performance.

Google's Gemini evaluation demonstrated the effectiveness of prompt engineering, where using a CoT@32 (Chain-of-Thought @ 32) technique improved Gemini Ultra’s MMLU (Multimodal Math and Language Understanding) performance from 83.7% to 90.04%.

:p How did Google's Gemini evaluation highlight the impact of prompt engineering?
??x
Google used a CoT@32 prompt engineering technique, which showed Gemini more examples than ChatGPT, leading to better performance on the MMLU benchmark. Specifically, when both models were shown five examples, ChatGPT performed better, but with 32 examples, Gemini Ultra's performance improved significantly.
x??

---


#### Context Construction in Prompt Engineering
Context construction is a part of prompt engineering that involves providing AI models with necessary context and tools to perform complex tasks effectively, especially those involving long contexts. This might require additional systems like memory management to help the model track its history.

:p What does context construction involve in prompt engineering?
??x
Context construction includes giving the AI model the necessary background information, tools, and possibly a memory management system to handle long-term dependencies or histories, ensuring it can perform tasks accurately.
x??

---


#### AI Interface Development for Applications
AI interfaces enable end users to interact with AI applications. With foundation models, anyone can build such applications, whether as standalone products or integrated into other platforms.

:p What is an AI interface in the context of building AI applications?
??x
An AI interface is a means for end users to interact with AI applications. It allows users to input queries or commands and receive responses from the AI model. With foundation models, this interaction can be implemented as standalone products or embedded into existing platforms.
x??

---


#### Differentiation through Application Development
In traditional ML engineering, model quality differentiates teams building proprietary models. However, with foundation models where many use the same underlying model, differentiation comes from application development layers such as evaluation, prompt engineering, and AI interface.

:p How does the approach to differentiation change when using foundation models?
??x
With foundation models, the focus shifts to application development layers like evaluation, prompt engineering, and AI interface rather than just improving the quality of proprietary models. These layers allow teams to differentiate their applications through better user experience, more effective task completion, and tailored interactions.
x??

---

---

