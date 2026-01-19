# High-Quality Flashcards: 2A004---Hands-On-Large-Language-Models_processed (Part 25)


**Starting Chapter:** Parameter-Efficient Fine-Tuning PEFT

---


---
#### Adapters for Parameter-Efficient Fine-Tuning (PEFT)
Adapters are a core component of many PEFT-based techniques. They introduce additional modular components inside the Transformer architecture to improve model performance on specific tasks without fully fine-tuning all the model weights.

Background context: 
- Adapters save time and compute resources by only fine-tuning 3.6% of BERT's parameters, which can achieve comparable or near-comparable performance to full fine-tuning.
- In the GLUE benchmark, the authors achieved results within 0.4% of full fine-tuning.

:p What are adapters in the context of parameter-efficient fine-tuning?
??x
Adapters are additional modular components inside a Transformer model that can be fine-tuned independently to enhance performance on specific tasks without fully training all the model's parameters. This approach saves significant time and computational resources.
x??

---
#### Architecture Placement of Adapters
In the proposed architecture, adapters are placed after both the attention layer and the feedforward neural network within each Transformer block.

:p Where are adapters placed in the Transformer block according to the paper?
??x
Adapters are placed after both the attention layer and the feedforward neural network within each Transformer block. This placement allows for efficient fine-tuning of a small subset of parameters while leaving most of the model's weights unchanged.
```python
# Pseudocode illustrating adapter placement in a single Transformer block
class AdapterBlock:
    def __init__(self, attention_layer, feed_forward_network):
        self.attention = attention_layer
        self.ffn = feed_forward_network
        self.adapter1 = Adapter()
        self.adapter2 = Adapter()

    def forward(self, x):
        # Process through the network
        x = self.attention(x)
        x = self.ffn(x)
        # Apply adapters after both layers
        x += self.adapter1(x)
        x += self.adapter2(x)
        return x
```
x??

---
#### Adapter Components Across Multiple Blocks
Adapter components span across multiple Transformer blocks, allowing for specialization in different tasks.

:p How do adapter components distribute across the model?
??x
Adapter components are distributed across all Transformer blocks within the model. This distribution allows for specialization of individual adapters to specific tasks. For example, one adapter can specialize in medical text classification while another can focus on named-entity recognition (NER).
```java
// Example class representing a single adapter component
public class Adapter {
    public void fineTune(double[] parameters) {
        // Fine-tuning logic here
    }
}

// Adapter components across multiple blocks
class Model {
    List<Adapter> adapters = new ArrayList<>();
    
    public void addAdaptersForTask(String task, double[] initialParams) {
        for (int i = 0; i < numBlocks; i++) {
            Adapter adapter = new Adapter();
            if ("medical".equals(task)) {
                adapter.fineTune(initialParams);
            } else if ("ner".equals(task)) {
                // Different fine-tuning logic
            }
            adapters.add(adapter);
        }
    }
}
```
x??

---
#### AdapterHub Framework
AdapterHub is a central repository for sharing adapters, primarily focused on BERT architectures initially but now applied to text generation Transformers.

:p What is AdapterHub?
??x
AdapterHub is a framework that serves as a central repository for sharing adapters. It has been used predominantly with BERT architectures but has recently been extended to text generation Transformers.
```java
// Example of downloading and using an adapter from AdapterHub
public class AdapterDownload {
    public void downloadAdapter(String task, String modelArchitecture) throws IOException {
        URL url = new URL("https://adapterhub.ml/tasks/" + task + "/" + modelArchitecture);
        HttpURLConnection connection = (HttpURLConnection) url.openConnection();
        InputStream responseStream = connection.getInputStream();
        
        // Process the downloaded adapter
    }
}
```
x??

---
#### Low-Rank Adaptation (LoRA)
Low-rank adaptation (LoRA) is an alternative technique to adapters that only requires updating a small set of parameters.

:p What is LoRA?
??x
Low-rank adaptation (LoRA) is a parameter-efficient fine-tuning technique that updates only a small subset of the model's parameters. It is designed as an alternative to adapter-based approaches and is known for its efficiency in fine-tuning large language models.
```python
# Pseudocode illustrating LoRA implementation
class LowRankAdapter:
    def __init__(self, rank):
        self.rank = rank
    
    def update_parameters(self, input_features, target_output):
        # Update parameters based on the low-rank approximation
        pass

# Example usage of LoRA in a model
class ModelWithLoRA(Model):
    def __init__(self):
        super().__init__()
        self.low_rank_adapter = LowRankAdapter(rank=2)
    
    def forward(self, x):
        # Normal forward pass
        y = super().forward(x)
        
        # Apply low-rank adaptation
        updated_params = self.low_rank_adapter.update_parameters(x, y)
        return y + updated_params
```
x??

---


#### Low-Rank Adaptation (LoRA)
Background context explaining LoRA. It is a method for fine-tuning large language models (LLMs) by creating a small subset of parameters instead of adding layers to the model, which can be kept separately from the base LLM. This approach allows for much quicker fine-tuning as only a small part of the base model needs to be updated.
:p What is LoRA and how does it differ from traditional fine-tuning methods?
??x
LoRA is a technique for fine-tuning large language models (LLMs) by creating a smaller subset of parameters that can replace parts of the original LLM. Unlike traditional fine-tuning, which involves updating all layers of the model, LoRA updates only a small portion of the base model's parameters.

The key difference lies in efficiency and resource usage: while full fine-tuning requires updating millions or billions of parameters (depending on the size of the LLM), LoRA reduces this by approximating large matrices with smaller ones. This makes it much faster to train and less computationally intensive.
x??

---

#### Approximation of Weight Matrices
Background context explaining how weight matrices in large language models can be approximated using smaller matrices, leading to significant efficiency gains during training.
:p How does LoRA approximate the weight matrices used in LLMs?
??x
LoRA approximates the weight matrices found in large language models by breaking them into smaller, lower-rank matrices. This is achieved through matrix decomposition techniques where a single large weight matrix $W $ of size$M \times N $ can be represented as a product of two smaller matrices:$U \cdot V^T $, where$ U $ and $ V $ are much smaller in size than $ W$.

For example, if we have a 10x10 weight matrix:
$$W = \begin{bmatrix}
w_{11} & w_{12} & \cdots & w_{1,10}\\
w_{21} & w_{22} & \cdots & w_{2,10}\\
\vdots & \vdots & \ddots & \vdots\\
w_{10,1} & w_{10,2} & \cdots & w_{10,10}
\end{bmatrix}$$

LoRA can approximate this matrix using two smaller matrices:
$$

W \approx U \cdot V^T = \begin{bmatrix}
u_1 \\
u_2 \\
\vdots \\
u_{10}
\end{bmatrix} \cdot
\begin{bmatrix}
v_1 & v_2 & \cdots & v_{10}
\end{bmatrix}$$

This reduces the number of parameters from 100 (for a full matrix) to just 20, significantly reducing computational load.
x??

---

#### Efficiency in Fine-Tuning
Background context on why efficiency is crucial for fine-tuning large language models and how LoRA addresses this issue by using smaller matrices.
:p Why is efficiency important in the fine-tuning of large language models?
??x
Efficiency is crucial in fine-tuning large language models because these models often contain billions or even trillions of parameters. Training such a model requires substantial computational resources, making the process slow and resource-intensive.

LoRA addresses this issue by reducing the number of parameters that need to be updated during training. Instead of fine-tuning all layers, LoRA focuses on updating only a small subset of parameters by approximating large matrices with smaller ones. This reduces both the time required for training and the computational resources needed, making it more feasible to perform fine-tuning.

For example, consider an LLM with 175 billion parameters in each Transformer block. If we can reduce the rank from 12,288x12,288 to a lower rank like 8, this would require only two smaller matrices of size 12,288x2, significantly reducing the number of parameters to be updated.
x??

---

#### Flexibility in Fine-Tuning
Background context on how LoRA allows for selective fine-tuning of specific parts of the base model and provides flexibility in training.
:p How does LoRA provide flexibility in fine-tuning large language models?
??x
LoRA provides flexibility by allowing users to selectively fine-tune specific parts of the base model. Unlike traditional full fine-tuning, which updates all parameters, LoRA enables updating only a small subset of the model's parameters.

For instance, during training, you might choose to fine-tune only certain weight matrices in each Transformer layer, such as the Query and Value matrices. This selective approach ensures that the model can be adapted without overwhelming computational resources, making it more practical for various applications.

By focusing on specific parts of the model, LoRA achieves a balance between performance and resource efficiency, allowing for more targeted improvements where needed.
x??

---

#### Intrinsic Dimensionality
Background context explaining how intrinsic dimensionality affects the effectiveness of language model fine-tuning, as demonstrated by research.
:p How does intrinsic dimensionality explain the effectiveness of language model fine-tuning?
??x
Intrinsic dimensionality is a concept that describes the effective number of parameters required to capture the essential information in a high-dimensional space. Research has shown that large language models have a very low intrinsic dimension, meaning they can be well-approximated using much smaller matrices.

This insight is crucial for methods like LoRA, which aims to update only a small subset of the model's parameters during fine-tuning. Since the effective number of parameters required is lower than the full matrix size, approximating these with smaller matrices leads to significant efficiency gains without compromising performance.

For example, in a 175 billion parameter model like GPT-3, each Transformer block contains a weight matrix of 12,288x12,288. By reducing this to a rank 8 approximation (using two smaller matrices), the number of parameters needed is drastically reduced, leading to faster and more efficient training.
x??

---

#### Decomposition for Training Efficiency
Background context on how decomposing large weight matrices into smaller matrices helps in making fine-tuning more efficient during training.
:p How does decomposing large weight matrices help in making fine-tuning more efficient?
??x
Decomposing large weight matrices into smaller, lower-rank matrices helps in making the fine-tuning process more efficient. This is achieved by approximating a large matrix $W $ of size$M \times N $ using two smaller matrices:$U \cdot V^T $, where$ U $ and $ V$ are much smaller.

By doing this, the number of parameters required for training is significantly reduced. For example, if we have a 10x10 matrix:
$$W = \begin{bmatrix}
w_{11} & w_{12} & \cdots & w_{1,10}\\
w_{21} & w_{22} & \cdots & w_{2,10}\\
\vdots & \vdots & \ddots & \vdots\\
w_{10,1} & w_{10,2} & \cdots & w_{10,10}
\end{bmatrix}$$

We can approximate this matrix using two smaller matrices:
$$

W \approx U \cdot V^T = \begin{bmatrix}
u_1 \\
u_2 \\
\vdots \\
u_{10}
\end{bmatrix} \cdot
\begin{bmatrix}
v_1 & v_2 & \cdots & v_{10}
\end{bmatrix}$$

This reduces the number of parameters from 100 (for a full matrix) to just 20, making the training process much faster and more resource-efficient.

During training, only these smaller matrices are updated, while the full weight changes are combined with the frozen base weights.
x??

---


#### Weight Representation and Precision
Background context explaining how weights in large language models (LLMs) are represented with a specific precision, typically float64 or float32. Reducing the number of bits can decrease memory requirements but also reduces accuracy as shown in Figure 12-15.

:p How does reducing the number of bits affect weight representation and model memory?
??x
Reducing the number of bits used to represent weights decreases the precision, which can lead to less accurate results. However, it also lowers the memory requirements for storing these weights, making the model more efficient. As illustrated in Figure 12-15, using a float32 representation compared to a float16 representation leads to a loss in accuracy.

```java
// Example of weight initialization with different precisions
float[] float64Weights = new float[1000]; // High precision, high memory
float[] float32Weights = new float[1000]; // Lower precision, lower memory
```
x??

---

#### Quantization and Its Challenges
Background context explaining the need for quantization to reduce model size while maintaining accuracy. Directly mapping higher precision values to lower precision can result in loss of differentiating factors as shown in Figure 12-16.

:p What are the challenges when directly quantizing weights from high to low precision?
??x
Directly mapping higher precision values to lower precision can cause multiple original weight values to be represented by the same lower precision value, leading to a loss of differentiation and accuracy. For example, if we map 32-bit values to 16-bit values, some close but distinct weights might end up being quantized to the same value.

```java
// Pseudocode for direct mapping challenge
float[] highPrecisionValues = [0.999f, 1.001f]; // Example high precision values
short[] lowPrecisionValues; // These could map to the same value if directly mapped

for (int i = 0; i < highPrecisionValues.length; i++) {
    int quantizedValue = (int) ((highPrecisionValues[i] + 1.0f) * 32768); // Direct mapping
    lowPrecisionValues[i] = (short) quantizedValue;
}
```
x??

---

#### Blockwise Quantization Method
Background context explaining how blockwise quantization, introduced by QLoRA, allows for efficient and accurate quantization of weights. This method uses additional blocks to prevent the loss of differentiating factors between close values.

:p What is blockwise quantization, and why is it useful?
??x
Blockwise quantization is a technique that enhances quantization by creating additional blocks or sub-blocks to represent similar weights accurately with lower precision. It helps in maintaining differentiation between closely valued weights without reducing accuracy too much. This approach prevents the loss of differentiating factors that can occur when directly mapping higher precision values to lower precision, as shown in Figure 12-16.

```java
// Pseudocode for blockwise quantization
class BlockQuantizer {
    Map<Short, List<Float>> blockMap = new HashMap<>();

    public void addBlock(float value) {
        int blockIndex = findClosestBlock(value); // Find the closest existing block or create a new one
        blockMap.computeIfAbsent(blockIndex, k -> new ArrayList<>()).add(value);
    }

    private int findClosestBlock(float value) {
        // Logic to find the closest block index based on value
        return 0;
    }
}
```
x??

---

#### Distribution-Aware Quantization
Background context explaining that neural network weights are generally normally distributed between -1 and 1. This distribution can be leveraged for more efficient quantization as shown in Figure 12-18.

:p How does the normal distribution of weights impact quantization?
??x
The normal distribution of weights in neural networks, typically centered around zero with values ranging from -1 to 1, allows for more efficient quantization. By understanding this distribution, we can bin or group similar weight values together and quantize them accurately using fewer bits. This approach helps mitigate issues with outliers that might otherwise cause inaccuracies.

```java
// Pseudocode for distribution-aware quantization
public class DistributionAwareQuantizer {
    private Map<Double, List<Float>> bins = new HashMap<>();

    public void quantize(float value) {
        double normalizedValue = (value + 1.0f) / 2; // Normalize to [0, 1]
        int binIndex = findClosestBin(normalizedValue); // Find the closest bin index
        List<Float> valuesInBin = bins.computeIfAbsent(binIndex, k -> new ArrayList<>());
        valuesInBin.add(value);
    }

    private int findClosestBin(double value) {
        // Logic to find the closest bin based on normalized value
        return 0;
    }
}
```
x??

---


#### Quantization Overview
Quantization is a technique used to reduce the memory footprint and computational complexity of deep learning models without significantly degrading their performance. It involves converting high-precision weights (e.g., 32-bit floating-point) into lower-precision representations, such as 4-bit or 8-bit integers.

In this context, the `bitsandbytes` package is used to compress a pretrained model into a more efficient representation.
:p How does quantization help in managing deep learning models?
??x
Quantization helps by reducing the memory usage and computational requirements of the model, making it more suitable for deployment on resource-constrained devices or environments. By converting weights from 32-bit floats to lower-precision formats (like 4-bit), we can significantly decrease the VRAM needed while maintaining acceptable performance.
x??

---

#### Quantization Configuration
The `BitsAndBytesConfig` is used to define the quantization scheme when loading a model with the `AutoModelForCausalLM` class. This configuration helps in specifying how the model should be compressed.

Here’s an example of setting up 4-bit quantization:
:p What are the key parameters for configuring 4-bit quantization using `BitsAndBytesConfig`?
??x
The key parameters include:

- `load_in_4bit`: Enables loading the model with 4-bit precision.
- `bnb_4bit_quant_type`: Specifies the type of quantization (e.g., "nf4").
- `bnb_4bit_compute_dtype`: Defines the compute data type used during inference.
- `bnb_4bit_use_double_quant`: Applies double quantization for improved efficiency.

Here’s how you can set up these parameters:
```python
import torch
from transformers import AutoModelForCausalLM, AutoTokenizer, BitsAndBytesConfig

# 4-bit quantization configuration - Q in QLoRA
bnb_config = BitsAndBytesConfig(
    load_in_4bit=True,  # Use 4-bit precision model loading
    bnb_4bit_quant_type="nf4",  # Quantization type
    bnb_4bit_compute_dtype="float16",  # Compute dtype
    bnb_4bit_use_double_quant=True,  # Apply nested quantization
)

# Load the model to train on the GPU with these settings
model_name = "TinyLlama/TinyLlama-1.1B-intermediate-step-1431k-3T"
model = AutoModelForCausalLM.from_pretrained(
    model_name,
    device_map="auto",
    # Leave this out for regular SFT
    quantization_config=bnb_config,
)
```
x??

---

#### LoRA Configuration
The `LoraConfig` is used to define the hyperparameters of the fine-tuning process. This configuration helps in specifying how the model should be fine-tuned using Low-Rank Adaptation (LoRA).

Here’s an example of setting up a LoRA configuration:
:p What are the key parameters for configuring LoRA with `LoraConfig`?
??x
The key parameters include:

- `lora_alpha`: Controls the amount of change that is added to the original weights. It balances the knowledge of the original model with that of the new task.
- `r`: The rank of the compressed matrices, which affects the compression and performance balance.
- `bias`: Specifies whether bias should be included in the fine-tuning process.
- `task_type`: Indicates the type of task (e.g., "CAUSAL_LM" for language modeling).
- `target_modules`: Lists the specific layers to target during fine-tuning.

Here’s how you can set up these parameters:
```python
from peft import LoraConfig, prepare_model_for_kbit_training, get_peft_model

# Prepare LoRA Configuration
peft_config = LoraConfig(
    lora_alpha=32,  # LoRA Scaling
    lora_dropout=0.1,  # Dropout for LoRA Layers
    r=64,  # Rank
    bias="none",
    task_type="CAUSAL_LM",  # Type of task (e.g., causal language model)
    target_modules=[
        "k_proj", "gate_proj", "v_proj", "up_proj", "q_proj", "o_proj", "down_proj"
    ]  # Layers to target
)

# Prepare model for training with LoRA
model = prepare_model_for_kbit_training(model)
model = get_peft_model(model, peft_config)
```
x??

---

#### Training Configuration
The `TrainingArguments` are used to configure the training process. This includes parameters like batch size, learning rate, and optimization algorithms.

Here’s an example of setting up a training configuration:
:p What are the key parameters for configuring the training with `TrainingArguments`?
??x
The key parameters include:

- `output_dir`: The directory where the model outputs will be saved.
- `per_device_train_batch_size`: The batch size per device used during training.
- `gradient_accumulation_steps`: Number of steps of gradient accumulation to help stabilize and speed up training.
- `optim`: Optimizer to use for weight updates (e.g., "paged_adamw_32bit").
- `learning_rate`: Step size at each iteration of weight updates.
- `lr_scheduler_type`: Type of learning rate scheduler, such as "cosine".
- `num_train_epochs`: Total number of training epochs. Lower values generally work better for fine-tuning.
- `logging_steps`: Number of steps between logging the loss.

Here’s how you can set up these parameters:
```python
from transformers import TrainingArguments

output_dir = "./results"  # Directory to save model outputs
training_arguments = TrainingArguments(
    output_dir=output_dir,
    per_device_train_batch_size=2,
    gradient_accumulation_steps=4,
    optim="paged_adamw_32bit",
    learning_rate=2e-4,
    lr_scheduler_type="cosine",
    num_train_epochs=1,
    logging_steps=10,
    fp16=True,  # Use mixed precision training
    gradient_checkpointing=True,  # Enable gradient checkpointing to save memory
)
```
x??

---

#### Fine-Tuning with SFTTrainer
The `SFTTrainer` is used for supervised fine-tuning. This involves training the model on a dataset of query-response pairs.

Here’s an example of setting up and running the trainer:
:p How do you set up and run the `SFTTrainer`?
??x
To set up and run the `SFTTrainer`, follow these steps:

1. Import necessary classes.
2. Set supervised fine-tuning parameters.
3. Train the model.

Here’s how to do it:
```python
from trl import SFTTrainer

# Set supervised fine-tuning parameters
trainer = SFTTrainer(
    model=model,
    train_dataset=dataset,  # Dataset of query-response pairs
    dataset_text_field="text",
    tokenizer=tokenizer,
    args=training_arguments,  # Training arguments
    max_seq_length=512,  # Maximum sequence length for inputs
    peft_config=peft_config,  # LoRA configuration
)

# Train the model
trainer.train()

# Save QLoRA weights
trainer.model.save_pretrained("TinyLlama-1.1B-qlora")
```
x??

---


#### Perplexity: A Measure of Prediction Difficulty
Perplexity is a measure used to evaluate how well a language model predicts the next token in a sequence. It provides insights into the confidence with which the model can predict the correct next word given the context.

The formula for perplexity is defined as:
$$\text{Perplexity} = 2^{-\frac{\sum_{i=1}^n \log_2 P(w_i|w_{1:i-1})}{n}}$$where $ P(w_i|w_{1:i-1})$is the probability of the next word given all previous words, and $ n$ is the number of tokens.

The model performs better when it gives higher probabilities to the correct next token. A lower perplexity score indicates a better model.

:p How does Perplexity measure the quality of predictions by a language model?
??x
Perplexity measures the average number of unique words that could have been predicted at each position in the sequence, given the previous context. It reflects how surprised the model is about the next word. Lower perplexity means the model can predict the correct token with higher confidence.

For example, if a model has a perplexity score of 10 on a piece of text, it suggests that for every word, there are an average of 10 possible words that could have been predicted at each position.

```python
def calculate_perplexity(probabilities):
    log_prob = sum([math.log2(p) if p > 0 else -float('inf') for p in probabilities])
    perplexity = 2 ** (-log_prob / len(probabilities))
    return perplexity
```
x??

---

#### ROUGE: Automatic Evaluation of Summaries
ROUGE (Recall-Oriented Understudy for Gisting Evaluation) is a metric used to evaluate the quality of generated summaries. It measures how well the summary matches a reference summary.

ROUGE computes several types of precision, recall, and F1 scores based on n-gram overlap between candidate and reference summaries.

:p What is ROUGE, and what does it measure?
??x
ROUGE evaluates the similarity between a generated summary (candidate) and one or more reference summaries. It calculates various metrics such as precision, recall, and F1 score based on overlapping n-grams.

For example:
```python
from rouge import Rouge

def evaluate_summary(candidate_summary, references):
    rouge = Rouge()
    scores = rouge.get_scores(candidate_summary, references)
    return scores
```
This function uses the `Rouge` class from the `rouge` library to compute the similarity scores between the candidate and reference summaries.

x??

---

#### BLEU: Automatic Evaluation of Machine Translation Quality
BLEU (Bilingual Evaluation Understudy) is a metric used for evaluating machine translation quality. It measures how similar the generated text is to one or more reference translations by comparing n-grams.

The BLEU score ranges from 0 to 1, with 1 being the best possible score. A higher BLEU score indicates better alignment between the candidate and reference translations.

BLEU uses a brevity penalty that adjusts for the length of the generated text relative to the reference text.

:p What is BLEU, and how does it work?
??x
BLEU (Bilingual Evaluation Understudy) measures the similarity between a candidate translation and one or more reference translations by comparing n-grams. It evaluates both the quality and the fluency of translated sentences using precision metrics.

The formula for BLEU is:
$$\text{BLEU} = \text{BP} \times \text{exp}\left( \sum_{n=1}^{N} \log p_n / N \right)$$where $ p_n$ is the n-gram precision, and BP is the brevity penalty.

The brevity penalty (BP) ensures that shorter translations are not favored unfairly. If the candidate translation is shorter than the shortest reference, the score is penalized. Otherwise, it’s adjusted based on the length ratio of the candidate to the reference.

```python
from nltk.translate.bleu_score import sentence_bleu

def calculate_bleu(candidate, references):
    weights = (1.0 / len(references[0].split()),) * len(references[0].split())
    bleu_score = sentence_bleu([ref.split() for ref in references], candidate.split(), weights)
    return bleu_score
```
This function uses the `sentence_bleu` method from the `nltk.translate.bleu_score` module to compute the BLEU score.

x??

---

#### BERTScore: Evaluating Text Generation with BERT
BERTScore is a metric for evaluating text generation by leveraging pre-trained language models, particularly BERT (Bidirectional Encoder Representations from Transformers). It measures the semantic similarity between generated and reference texts.

BERTScore calculates precision, recall, and F1 score based on word embeddings from BERT. Higher scores indicate better alignment with references.

:p What is BERTScore, and how does it work?
??x
BERTScore evaluates text generation by using pre-trained language models like BERT to measure semantic similarity between generated texts and their reference counterparts. It computes precision, recall, and F1 score based on the cosine similarity of word embeddings produced by BERT.

The formula for BERTScore involves comparing the average cosine similarities of words in the candidate sentence with those in the reference sentences.

```python
from bert_score import score

def calculate_bertscore(candidate, references):
    p, r, f = score([candidate], [[ref] for ref in references], lang='en', verbose=True)
    return p[0].item(), r[0].item(), f[0].item()
```
This function uses the `bert_score` library to compute BERTScore. It returns precision (P), recall (R), and F1 score.

x??

---

#### Evaluating Generative Models on Public Benchmarks
Public benchmarks like MMLU, GLUE, TruthfulQA, GSM8k, HellaSwag, HumanEval, and others provide structured evaluations of generative models. These benchmarks test models across a wide range of tasks from basic language understanding to complex analytical answering.

:Briefly describe how public benchmarks are used to evaluate generative models.
??x
Public benchmarks like MMLU (Massive Multitask Language Understanding), GLUE, TruthfulQA, GSM8k, HellaSwag, and HumanEval provide structured evaluations of generative models. These benchmarks test the models on various tasks ranging from basic language understanding to complex analytical answering.

For example, MMLU tests models on 57 different tasks including classification, question-answering, and sentiment analysis. GLUE focuses on a wide degree of difficulty in natural language understanding. TruthfulQA measures truthfulness, GSM8k contains grade-school math word problems, HellaSwag evaluates common-sense inference, and HumanEval tests the model's ability to solve programming tasks.

These benchmarks help assess how well models perform across different domains but can also be overfitted if not used carefully due to their broad coverage. Additionally, some benchmarks require strong GPUs with a long running time (over hours), which can make iterative testing difficult.

x??

---

