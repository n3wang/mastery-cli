# High-Quality Flashcards: 2A001---AI-Engineering_-Building-Applications-with-Foundation-Models-OReilly-Media-2025Chip-Huyen--_processed (Part 9)


**Starting Chapter:** The Probabilistic Nature of AI

---


#### Deterministic vs. Probabilistic Models
Deterministic models always produce the same output for a given input, while probabilistic models can vary their responses based on probabilities. This difference is crucial in understanding how AI systems operate and the challenges they present.

:p What's the key difference between deterministic and probabilistic models?
??x
The main difference lies in their response to identical inputs:
- Deterministic models: Always produce the same output.
- Probabilistic models: Can produce different outputs with the same input due to random variations.

```java
public class DeterministicProbabilisticExample {
    public int deterministicFunction(int x) {
        return x * 2;
    }

    public String probabilisticFunction(String prompt) {
        double chance = Math.random();
        if (chance < 0.5) {
            return "Vietnamese cuisine";
        } else {
            return "Italian cuisine";
        }
    }
}
```
x??

---

---


#### Consistency Issues in AI Models
Background context explaining the concept. Inconsistent outputs can create a jarring user experience, as users expect consistency when interacting with AI systems. This inconsistency can arise due to various factors such as different sampling variables or hardware differences.

:p What are some approaches to mitigate inconsistency in AI model outputs?
??x
There are several strategies to address inconsistency:

1. **Caching Answers**: Store the response generated for a particular input and return it whenever the same input is encountered again.
2. **Fixing Sampling Variables**: Adjust parameters such as temperature, top-p (nucleus sampling), and top-k (top-k sampling) to ensure more predictable behavior.
3. **Fixing the Seed Variable**: This acts as the starting point for the random number generator used during token sampling.

Even with these fixes, complete consistency cannot be guaranteed due to hardware differences in how instructions are executed on different machines.

```java
// Example of fixing a seed variable in Java
public class ConsistencyExample {
    public String generateResponse(String input) {
        Random rng = new Random(12345); // Fixing the seed value for reproducibility
        // Token generation logic using the fixed rng
        return "Consistent response based on the same seed";
    }
}
```
x??

---


#### Memory Systems and Prompt Crafting
Background context explaining the concept. To achieve more consistent and relevant outputs, AI models can be trained with a memory system or fine-tuned using carefully crafted prompts.

:p How can memory systems and prompt crafting help in generating more consistent responses?
??x
Memory systems and prompt crafting can help ensure that an AI model generates responses closer to what is desired by:

1. **Memory Systems**: By maintaining a record of previous interactions, the model can provide contextually relevant and consistent answers.
2. **Prompt Crafting**: Carefully designed prompts can guide the model to produce more accurate and aligned outputs.

For instance, using a memory system where the AI remembers past conversations or facts can help it generate responses that are consistent with previously stated information.

```java
// Example of using a memory system (pseudocode)
public class MemorySystem {
    private Map<String, String> conversationHistory = new HashMap<>();

    public void storeConversation(String key, String value) {
        conversationHistory.put(key, value);
    }

    public String retrieveConversation(String key) {
        return conversationHistory.get(key);
    }
}
```
x??

---


#### Reinforcement Learning from Human Feedback (RLHF) for Reducing Hallucination
Background context: Schulman proposed using reinforcement learning with human feedback (RLHF) to reduce hallucinations. This involves training the model not only on factual data but also based on comparisons of responses.
:p How does RLHF work in reducing hallucinations?
??x
RLHF works by training a reward model that evaluates responses based on comparisons without explaining why one response is better than another. By adding more complex reward functions, it can punish the model for making things up, thus reducing hallucinations. However, OpenAI found mixed results with InstructGPT.
??x
Example of a simple RLHF reward function:
```java
// Pseudocode for a simple RLHF reward function
public double calculateReward(String responseA, String responseB) {
    if (responseA.contains("Hallucinated facts")) {
        return -1.0;
    }
    if (responseB.contains("Hallucinated facts")) {
        return 1.0;
    }
    // More complex logic to compare responses
    return 0.5; // Default neutral reward
}
```
x??

---


#### Detecting Hallucinations
Background context on how difficult it is to detect when a human is lying or making things up. Despite this difficulty, efforts have been made to develop methods for detecting and measuring hallucinations in AI models.

:p How challenging is it to detect hallucinations in AI models?
??x
Detecting hallucinations in AI models is extremely challenging because it mirrors the difficulty humans face in discerning truth from lies or fabrications. The complexity arises due to the probabilistic nature of how AI models generate outputs, making it hard to distinguish between factual and fabricated information.

There are ongoing efforts to develop methods for detecting hallucinations, which will be discussed in Chapter 4.
x??

---


#### Core Design Decisions When Building a Foundation Model
Background context explaining the importance of considering core design decisions when building foundation models. These choices significantly impact model performance and usability.

:p What is one crucial factor affecting a model’s performance according to this chapter?
??x
One crucial factor affecting a model's performance is its training data. Large models require extensive training data, which can be expensive and time-consuming to acquire. Model providers often leverage available data, leading to models that perform well on tasks present in the training data but may not align with specific user needs.

The quality and specificity of the training data are critical for developing models targeted at particular languages or domains.
x??

---


#### Training Data Importance
Background context explaining why training data is so important. The chapter highlights how training data impacts model performance, especially when targeting specific languages or domains.

:p Why is training data crucial in building foundation models?
??x
Training data is crucial because it directly influences a model's ability to perform well on various tasks. For language-based foundation models, the quality and specificity of the training data are vital for ensuring that the model can handle tasks related to particular languages or domains effectively.

Large amounts of high-quality training data are necessary but often expensive and time-consuming to acquire. Model providers frequently use whatever data is available, which may not always be ideal for specific applications.
x??

---


#### Transformer Architecture
Background context explaining the transformer architecture and its design purposes. The chapter discusses the problems it addresses and its limitations.

:p What is the dominating architecture for language-based foundation models according to this text?
??x
The dominating architecture for language-based foundation models is the transformer. Transformers were designed to address certain challenges in natural language processing, such as handling long-range dependencies and parallelizing computation effectively.

However, transformers also have limitations that need to be considered during model development.
x??

---


#### Scaling Law and Bottlenecks
Background context explaining how scaling a model can improve its performance but may eventually face limitations. The chapter discusses the scaling law and potential bottlenecks in training large models.

:p How does the scale of a model relate to its performance according to this text?
??x
The scale of a model is related to its performance through several key metrics: the number of parameters, the number of training tokens, and the number of FLOPs (Floating Point Operations) needed for training. Generally, scaling up a model can make it better, but this trend might not continue indefinitely due to limitations such as low-quality training data and self-supervision issues.

The scaling law helps determine the optimal number of parameters and tokens given a compute budget, but current practices may face bottlenecks that could limit further scaling.
x??

---


#### Post-Training Steps
Background context explaining post-training steps used to address output inconsistencies and hallucinations. The chapter discusses supervised finetuning and preference finetuning.

:p What are the two main post-training steps in model development mentioned in this text?
??x
The two main post-training steps in model development are:
1. **Supervised Finetuning**: This involves training the model on labeled data to improve its performance on specific tasks.
2. **Preference Finetuning**: This step addresses human preference diversity and attempts to align the model's outputs with user preferences, which is challenging as preferences cannot be fully captured mathematically.

These steps are crucial for addressing inconsistencies and hallucinations that may arise from the model's training process.
x??

---


#### Sampling in AI Models
Background context explaining how sampling makes AI models probabilistic. The chapter highlights this characteristic as a reason why outputs can be inconsistent or hallucinatory, affecting creativity and user interaction with models like ChatGPT.

:p What does sampling make an AI model?
??x
Sampling makes an AI model probabilistic. This inherent probabilistic nature is what enables creative tasks and engaging interactions, but it also introduces inconsistency and the potential for hallucinations in outputs.

Working with AI models requires understanding their probabilistic behavior to build effective workflows.
x??

---


#### Evaluation Pipelines
Background context explaining why evaluation pipelines are essential for detecting model failures and unexpected changes. The chapter states that evaluation is so crucial that two chapters will be dedicated to it, starting next.

:p Why are evaluation pipelines important in the context of foundation models?
??x
Evaluation pipelines are crucial because they help detect model failures and unexpected changes, ensuring that models maintain performance over time. Given the complexity and potential for issues with large foundation models, a robust evaluation process is necessary to maintain trust and utility.

The importance of evaluation warrants dedicated chapters, starting from the next one in this book.
x??

---

---


#### Concept: Evaluation of AI Systems and Risks
Background context explaining that as AI is increasingly used, there is a higher risk of catastrophic failure. The chapter discusses how foundation models have shown failures such as suicide encouragement by chatbots, false evidence submitted by lawyers, and misinformation provided by AI chatbots to Air Canada. These risks highlight the need for robust evaluation methods.
:p What are the key risks highlighted in using foundation models?
??x
The key risks include catastrophic failure, suicides caused by chatbot encouragement, submission of false evidence by lawyers, and providing incorrect information by AI systems leading to legal issues and financial damages. These risks underscore the importance of developing reliable evaluation methods for AI applications.
x??

---


#### Concept: Metrics for Language Models
Background context explaining that language models often require specific metrics like cross entropy and perplexity for evaluation. These metrics help in guiding training and fine-tuning of language models.
:p What are some key metrics used to evaluate language models?
??x
Key metrics used to evaluate language models include cross entropy, which measures the average number of bits needed to represent a symbol, and perplexity, which is derived from cross-entropy and indicates how well the model predicts a text. These metrics guide the training and fine-tuning of language models.
x??

---


#### Concept: Iterative Improvement of AI Models
Background context explaining that as AI systems improve and become more sophisticated, they may require evaluations by even the brightest human minds. This raises questions about who will evaluate future models if current evaluators find them challenging to assess.
:p What does this passage imply about the future evaluation needs for AI?
??x
This passage implies that as AI models continue to evolve, they might need evaluations from increasingly competent and specialized experts, potentially creating a challenge in finding qualified evaluators for more advanced systems.
x??

---

---


#### MMLU to MMLU-Pro
Background context: The text states that MMLU (2020), an early strong benchmark for foundation models, was largely replaced by MMLU-Pro (2024). This change reflects a shift towards more comprehensive and possibly updated evaluation methods.

:p What does the replacement of MMLU with MMLU-Pro indicate about the evolution of model evaluations?
??x
The replacement indicates that the evaluation methods have evolved to be more robust, comprehensive, and possibly aligned with new or emerging tasks. It suggests an ongoing effort to improve the quality and relevance of benchmarks used for assessing foundation models.
x??

---


#### Evaluation Scope Expanding for General-Purpose Models
Background context: The text explains that general-purpose model evaluations now extend beyond known tasks to discover new capabilities and explore potential AI applications.

:p How does the evaluation scope differ between task-specific models and general-purpose models?
??x
For task-specific models, evaluation is focused on performance on trained tasks. In contrast, for general-purpose models, evaluation involves not only assessing current tasks but also discovering new tasks and exploring beyond human capabilities.
x??

---

