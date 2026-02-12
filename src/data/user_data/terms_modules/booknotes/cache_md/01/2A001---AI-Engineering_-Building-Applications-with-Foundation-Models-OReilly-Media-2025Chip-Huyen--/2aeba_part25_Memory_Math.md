# High-Quality Flashcards: 2A001---AI-Engineering_-Building-Applications-with-Foundation-Models-OReilly-Media-2025Chip-Huyen--_processed (Part 25)


**Starting Chapter:** Memory Math

---


#### Inference Memory Calculation for Models

Background context: During inference, only the forward pass is executed. The memory required includes model weights and activation values. Transformer models also need additional memory for attention mechanism's key-value vectors.

Relevant formulas:
- Model parameter count $N $- Memory per parameter$ M$

Memory needed to load the model’s parameters: 
$$\text{Total Memory} = N \times M$$

For many applications, activation values and key-value vectors are 20% of the memory for the model's weights. Therefore:
$$\text{Total Inference Memory} = N \times M \times 1.2$$:p What is the total inference memory needed for a 13B-parameter model with each parameter requiring 2 bytes?
??x
The total inference memory needed would be calculated as follows:

Given:
- $N = 13,000,000,000$ parameters (13B)
- $M = 2$ bytes per parameter

Total memory for model’s weights:
$$13,000,000,000 \times 2 \text{ bytes} = 26 \text{ GB}$$

Since the activation values and key-value vectors are assumed to be 20% of the model's weights:
$$\text{Total Inference Memory} = 26 \text{ GB} \times 1.2 = 31.2 \text{ GB}$$x??

---


#### Training Memory Calculation for Models

Background context: During training, you need memory for model’s weights and activations (as discussed in inference), gradients, and optimizer states.

Relevant formulas:
- Model parameter count $N $- Memory per parameter $ M$ Training memory is calculated as:
$$\text{Training Memory} = \text{Model Weights} + \text{Activations} + \text{Gradients} + \text{Optimizer States}$$:p What is the total training memory needed for a 13B-parameter model with each parameter requiring 2 bytes?
??x
For a 13B-parameter model, each parameter requires 2 bytes. Let's calculate the memory required:

Given:
- $N = 13,000,000,000$ parameters (13B)
- $M = 2$ bytes per parameter

Memory for model’s weights:
$$13,000,000,000 \times 2 \text{ bytes} = 26 \text{ GB}$$

If we assume the memory needed for activations is less than that of the model's weights, but considering practical scenarios where activation memory can be much larger:
$$\text{Total Training Memory} = \text{Model Weights} + \text{Activations} + \text{Gradients} + \text{Optimizer States}$$

For simplicity, let’s assume activations are 20% of the model's weights:
$$\text{Activation Memory} = 26 \text{ GB} \times 0.2 = 5.2 \text{ GB}$$

Now, using Adam optimizer (which stores two values per parameter for gradients and optimizer states):
$$\text{Gradients + Optimizer States} = 13,000,000,000 \times 3 \times 2 \text{ bytes} / 8 = 96 \text{ GB}$$

Therefore:
$$\text{Total Training Memory} = 26 \text{ GB} + 5.2 \text{ GB} + 96 \text{ GB} = 127.2 \text{ GB}$$
x??

---


#### Gradient Checkpointing and Activation Recomputation

Background context: To reduce memory requirements, one can use techniques like gradient checkpointing (also known as activation recomputation) where activations are not stored but recomputed when necessary.

:p What is gradient checkpointing, and why might it be used?
??x
Gradient checkpointing, also known as activation recomputation, is a technique to reduce the memory needed for storing activations during training. Instead of keeping all intermediate activation values in memory, these values can be computed on-the-fly whenever they are needed for backpropagation.

While this reduces memory requirements, it increases computational time because some operations need to be performed twice (once to generate the activations and once to compute the gradients).

:x??

---

---


#### Range and Precision Bits
Background context: The text explains how range and precision bits affect the representable values and their accuracy.

:p What do "range" and "precision" refer to in floating point formats?
??x
- **Range**: Refers to the minimum and maximum values a format can represent. More exponent bits allow for a wider range.
- **Precision**: Refers to how accurately numbers are represented within that range. Fewer mantissa bits reduce precision.

For example, reducing FP32's 23-bit mantissa to FP16's 10-bit mantissa decreases the accuracy of representing fractional parts.
??x

---


#### Numerical Representations and Formats
Background context explaining the concept. The text highlights that designing lower-precision formats can improve system efficiency without compromising quality. It emphasizes the importance of loading models with the correct numerical format for optimal performance.
:p Why is it important to load a model in its intended numerical format?
??x
Loading a model in the wrong numerical format can significantly degrade its performance because different formats (e.g., FP16 and BF16) have varying levels of precision. For instance, using FP16 instead of BF16 for Llama 2 could result in much lower quality due to differences in how values are represented.
x??

---


#### Memory Footprint Reduction Through Quantization
Background context explaining the concept. The text discusses reducing a model's memory footprint by quantizing its values, which means representing them with fewer bits than in the standard FP32 format.
:p What is quantization and why is it important for models?
??x
Quantization refers to converting the values of a model to a lower-precision format, thereby reducing its memory footprint. It's important because it allows using less memory, which can lead to faster inference times and more efficient use of hardware resources. For example, a 10B-parameter model in FP32 requires 40 GB, but in a 16-bit format, it would only need 20 GB.
x??

---


#### Weight Quantization vs Activation Quantization
Background context explaining the concept. The text differentiates between weight quantization and activation quantization, noting that weight quantization is more common due to its stability and minimal impact on performance.
:p What is the difference between weight quantization and activation quantization?
??x
Weight quantization involves reducing the precision of model weights (parameters), whereas activation quantization reduces the precision of activations during inference. Weight quantization is generally preferred because it has a more stable effect on performance with less accuracy loss compared to activation quantization.
x??

---


#### KV Cache in Transformer Models
Background context explaining the concept. The text mentions that the key-value (KV) cache is a significant contributor to memory footprint in transformer-based models. It's covered more thoroughly in Chapter 9.
:p What is the KV cache, and why is it important?
??x
The KV cache stores the keys and values of previously processed tokens, which are used during inference for self-attention mechanisms. It significantly impacts memory usage, especially in large models, making efficient management crucial for performance optimization.
x??

---


#### Mixed Precision Inference
Mixed precision inference combines different levels of precision to balance memory usage and computational efficiency. This approach allows models to use lower precision when possible and higher precision when necessary.
:p What is mixed precision inference?
??x
Mixed precision inference involves serving models with varying levels of precision, typically using a combination of low-precision (e.g., 2-bit or 4-bit) and high-precision (e.g., FP16 or FP32) formats. This strategy reduces memory usage and speeds up computation without significantly compromising model performance.
x??

---


#### Reduced Precision and Latency Trade-offs

Reducing precision can save memory but might increase computation due to format conversion. Each conversion often causes small value changes that can accumulate, leading to performance degradation.

:p How does reducing precision affect model performance?
??x
Reducing precision can introduce small value changes during computations, which can accumulate over multiple steps of training and inference. This can degrade the model's accuracy and performance. Additionally, if a value falls outside the representable range in the reduced precision format, it might be converted to infinity or an arbitrary value, further degrading model quality.
x??

---


#### Loss Values and Precision

Precise loss computation is crucial for guiding parameter updates during training. Small changes in loss values can affect the direction of gradient descent.

:p How does loss value precision impact model training?
??x
Loss values must be computed precisely to ensure that parameter updates are accurate and follow the correct direction. Small fluctuations or imprecisions in these values can lead to incorrect gradients, which may result in poor convergence or suboptimal model performance.
x??

---


#### Post-Training Quantization (PTQ)

Models trained in higher precision are sometimes quantized after training for deployment purposes. This process converts the weights and activations of a model into lower precision formats.

:p What is PTQ and why is it used?
??x
Post-Training Quantization (PTQ) refers to the process of converting a model that was originally trained in high precision to run with reduced precision during inference. It's used to reduce memory usage, deployment costs, and computational requirements on edge devices.
x??

---


#### Training Quantization

Training quantization aims to create models that can perform well at lower precisions while potentially reducing training time and cost.

:p What are the goals of training quantization?
??x
The primary goals of training quantization include:
1. Producing a model that performs well during inference in low precision.
2. Reducing training time and costs by leveraging lower precision computations for memory footprint reduction and computational speedup.
x??

---


#### Quantization-Aware Training (QAT)

QAT simulates the low-precision behavior during training to ensure that the model can produce high-quality outputs even when run at reduced precision.

:p What is QAT?
??x
Quantization-Aware Training (QAT) involves training a model while simulating its behavior in lower precision. This helps the model learn to produce accurate and reliable results even if it runs on hardware with limited precision during inference.
x??

---


#### Mixed Precision Training

Mixed precision training uses higher precision for weights but lower precision for other values like gradients and activations.

:p How does mixed precision training work?
??x
In mixed precision training, a copy of the model's weights is kept in high precision while gradients and intermediate results (activations) are computed in low precision. This balances between memory efficiency and computational accuracy.
x??

---


#### Lower Precision Training

Lower precision training directly trains models in reduced precision formats to potentially improve both inference quality and training efficiency.

:p Can you explain lower precision training?
??x
Lower precision training involves training a model using weights stored in a reduced precision format, such as INT8. This approach aims to maintain high-quality outputs during inference while reducing memory requirements and computational costs.
x??

---


#### Backpropagation Sensitivity

Backpropagation is more sensitive to lower precision, which can affect the accuracy of gradient calculations.

:p Why is backpropagation more sensitive in lower precision?
??x
Backpropagation algorithms rely on precise gradients for correct parameter updates. In lower precision formats, small numerical errors during backpropagation can propagate and accumulate, leading to incorrect or suboptimal gradients.
x??

---

