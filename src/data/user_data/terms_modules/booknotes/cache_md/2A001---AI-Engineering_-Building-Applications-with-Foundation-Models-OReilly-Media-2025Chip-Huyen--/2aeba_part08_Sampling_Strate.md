# High-Quality Flashcards: 2A001---AI-Engineering_-Building-Applications-with-Foundation-Models-OReilly-Media-2025Chip-Huyen--_processed (Part 8)


**Starting Chapter:** Sampling Strategies

---


#### Logits and Softmax Layer

Logits are raw scores output by a language model, which do not directly represent probabilities. To convert logits to probabilities, a softmax layer is often used.

Logits for each token $x_1, x_2, ..., x_N$ in the vocabulary can be converted into probabilities using the formula:
$$p_i = \text{softmax}(x_i) = \frac{e^{x_i}}{\sum_{j=1}^N e^{x_j}}$$:p What is the role of logits and softmax in a language model?
??x
Logits are the raw scores output by the model for each token, which do not directly represent probabilities. The softmax function converts these logits into probabilities that sum up to one, allowing them to be used as a probability distribution.

The formula for converting logits $x_1, x_2, ..., x_N$ into probabilities is:
$$p_i = \frac{e^{x_i}}{\sum_{j=1}^N e^{x_j}}$$

This ensures that the generated probabilities are valid and can be used to sample tokens.
x??

---


#### Sampling Strategies

Sampling strategies in language models allow for generating text with specific characteristics, such as creativity or predictability.

One common strategy is **temperature sampling**, which involves adjusting the probability distribution of token selection by dividing the logits by a temperature parameter $T$. This affects how often the model selects high-probability tokens versus low-probability tokens.

The adjusted logit for the $i $ th token with a given temperature$T$ is:
$$\frac{x_i}{T}$$

Softmax is then applied to this adjusted logit instead of the original logits.

:p How does temperature affect sampling in language models?
??x
Temperature affects how often the model selects high-probability tokens versus low-probability tokens. A higher temperature causes the probability distribution to be more chaotic, allowing lower-probability tokens to surface more frequently. Conversely, a lower temperature makes the model more consistent by favoring high-probability tokens.

For example:
- With $T = 1$, the probabilities are distributed as normal.
- With $T < 1$(e.g., 0.5), higher probabilities are reduced, and lower probabilities are increased.
- With $T > 1$, higher probabilities are increased further, making the model more creative but potentially less coherent.

This parameter can be adjusted to balance between creativity and coherence in generated text.
x??

---


#### Arg Max Function vs Softmax Probabilities at Different Temperatures

Background context: The arg max function and softmax probabilities are two ways to transform logits into model outputs. The softmax function normalizes the logits into a probability distribution, while the arg max simply selects the token with the highest logit value.

:p How does setting different temperatures affect the output tokens from a model?
??x
Setting different temperatures affects the output tokens by altering the balance between randomness and determinism in selecting tokens. A higher temperature increases randomness, making the selection more spread out; a lower temperature decreases randomness, making the selection more deterministic.

For example:
- Temperature 0: arg max (chooses the token with the highest logit)
- Higher temperatures (e.g., 1.0): more evenly distributed probability distribution

```python
import math

def softmax(logits, temp=1):
    exp_values = [math.exp(logit / temp) for logit in logits]
    sum_exp = sum(exp_values)
    return [value / sum_exp for value in exp_values]

def arg_max(logits):
    return 1 if max(logits) == logits[0] else 0

logits = [1, 2]
temperature = 0.7
softmax_probs = softmax(logits, temp=temperature)
arg_max_result = arg_max(logits)

print("Softmax probabilities:", softmax_probs)
print("Arg max result:", arg_max_result)
```
x??

---


#### Underflow Problem in Probabilities

Background context: The underflow problem occurs when very small numbers are rounded down to zero due to limited numerical precision. Logarithmic probability representations (logprobs) help mitigate this issue.

:p What is the underflow problem, and how does using logprobs address it?
??x
The underflow problem happens when probabilities become so small that they can't be represented accurately in a computer's floating-point format, leading to them being rounded down to zero. Using logarithmic probability representations (logprobs) helps by reducing the risk of such underflows.

```python
def log_prob(prob):
    return math.log(prob)

def exp_log_prob(log_prob_val):
    return math.exp(log_prob_val)

# Example usage with small probabilities
small_prob = 1e-20
log_small_prob = log_prob(small_prob)
print("Log probability:", log_small_prob)  # Avoids underflow

exp_back = exp_log_prob(log_small_prob)
print("Exponentiated back to prob:", exp_back)  # Should approximate the original small prob
```
x??

---


#### Top-k Sampling Strategy

Background context: The top-k sampling strategy is a technique to reduce computational workload by considering only the k most probable tokens, rather than all possible values. This helps in balancing diversity and efficiency.

:p What is the top-k sampling strategy, and how does it work?
??x
The top-k sampling strategy involves selecting only the k highest-probability tokens instead of generating a probability distribution over all possible tokens. This reduces computational load while still maintaining some level of response diversity.

```python
def top_k_sampling(logits, k):
    top_k_indices = sorted(range(len(logits)), key=lambda i: logits[i], reverse=True)[:k]
    top_k_probs = [logits[i] for i in top_k_indices]
    return top_k_indices, top_k_probs

# Example usage
logits = [0.1, 0.2, 0.3, 0.4, 0.5, 0.6]
k = 3
top_k_indices, top_k_probs = top_k_sampling(logits, k)
print("Top-k indices:", top_k_indices)
print("Top-k probabilities:", top_k_probs)
```
x??

---


---
#### Top-k Sampling
Top-k sampling involves selecting the top k most probable logits and performing softmax on these values. This method is used to reduce computational load by considering only a subset of the vocabulary, making it more feasible for large models.

:p What is top-k sampling?
??x
Top-k sampling is a technique that helps manage the computational cost associated with large vocabularies in language models. Instead of considering all possible tokens (logits), the model focuses on the k most probable ones and performs softmax on these values to generate the next token.

For example, if you have a vocabulary size of 5000 words but only want to consider the top 100 likely options, you would apply top-k sampling with k=100.
x??

---


#### Top-p (Nucleus) Sampling
Top-p or nucleus sampling dynamically selects tokens based on their cumulative probability. The model sums probabilities in descending order until it reaches a threshold p, and then only considers these values for the next token.

:p What is top-p (nucleus) sampling?
??x
Top-p (nucleus) sampling is a method that allows for more flexible selection of tokens based on their cumulative probability. It helps generate outputs that are contextually appropriate by focusing only on relevant tokens, making it particularly useful in scenarios where the number of potential values should vary.

For instance, if p = 0.9, the model will select tokens until their cumulative probability reaches 90%, ensuring that the selected tokens have a high combined likelihood.
x??

---


#### Min-p Sampling
Min-p sampling involves setting a minimum probability threshold for tokens to be considered during generation. This ensures that only tokens with sufficient probability are chosen.

:p What is min-p sampling?
??x
Min-p sampling is a technique used in text generation where the model only considers tokens whose probabilities exceed a specified minimum value (min-p). This can help ensure that generated text includes more meaningful and likely words, reducing the inclusion of unlikely or improbable tokens.

For example, if you set min-p to 0.05, only tokens with a probability greater than 5% will be considered for generation.
x??

---


#### Stopping Conditions
Stopping conditions are used in autoregressive language models to limit the length of generated sequences, reducing computational costs and improving user experience.

:p What is a stopping condition?
??x
A stopping condition is a criterion applied to an autoregressive language model that determines when it should cease generating tokens. This can be based on various factors such as reaching a specific token or achieving a fixed number of tokens.

For example, you might instruct the model to stop after 50 tokens or upon encountering a particular end-of-sequence token.
x??

---

---


#### Test Time Compute Concept
Background context explaining the use of test time compute to improve model responses. This technique involves generating multiple outputs for a single input and selecting the best one based on various criteria.

:p What is test time compute, and why is it used?
??x
Test time compute refers to the process of generating multiple responses from a model for a given input instead of just one response. It aims to increase the likelihood of obtaining high-quality outputs by exploring different possible sequences or options. This technique can be applied during inference when the number of samples you can generate is determined by the amount of computational resources allocated.

In practice, this involves running the model multiple times and selecting the output with the highest probability or using a reward model to score each generated sequence.
x??

---


#### Beam Search
Explanation of beam search and how it differs from generating all outputs independently.

:p How does beam search work in the context of test time compute?
??x
Beam search is an optimization technique used to generate multiple candidate sequences during inference, but unlike generating all possible sequences, it only maintains a limited number of candidates at each step. This approach helps reduce the computational complexity while still exploring promising options. The "beam" refers to this fixed number of top-scoring sequences that are considered for further expansion.

Here’s an example pseudocode:

```java
public class BeamSearch {
    private int beamWidth;
    
    public List<String> generateOutput(String input, Model model) {
        Queue<Sequence> queue = new PriorityQueue<>((a, b) -> Double.compare(b.probability, a.probability));
        Sequence rootSequence = new Sequence(input);
        queue.add(rootSequence);

        while (!queue.isEmpty()) {
            // Take the top `beamWidth` sequences from the queue
            List<Sequence> candidates = getTopCandidates(queue, beamWidth);
            
            for (Sequence seq : candidates) {
                if (seq.isCompleted()) continue;
                
                // Generate next token(s)
                String[] tokens = model.predictNextTokens(seq.tokens);
                
                for (String token : tokens) {
                    Sequence newSeq = seq.extend(token);
                    queue.add(newSeq);
                }
            }
        }

        // Select the best sequence based on some criterion
        return Collections.max(queue, Comparator.comparingDouble(Sequence::probability));
    }
}
```

This code maintains a priority queue of sequences with their associated probabilities and explores them step by step while pruning less promising paths.

x??

---


#### Diverse Outputs Strategy
Explanation of strategies to increase the diversity of outputs, such as varying model sampling variables.

:p How can you increase the diversity of model outputs during test time compute?
??x
Increasing the diversity of model outputs is crucial for improving the quality and robustness of responses. One effective strategy is to vary the model’s sampling parameters or variables. By altering these parameters, you can generate a wider range of possible sequences, which increases the likelihood of finding high-quality solutions.

For example, you could change temperature settings in probabilistic models, adjust the length or complexity constraints, or introduce random perturbations in the input data.

```java
public class DiverseSampling {
    private double temperature;
    
    public List<String> generateOutput(String input, Model model) {
        List<String> diverseOutputs = new ArrayList<>();
        
        for (int i = 0; i < numSamples; i++) {
            // Adjust sampling variables each time
            model.setTemperature(randomTemperature());
            
            String output = model.predictNextTokens(input);
            diverseOutputs.add(output);
        }
        
        return diverseOutputs;
    }

    private double randomTemperature() {
        // Generate a random temperature within the desired range
        return Math.random() * (maxTemp - minTemp) + minTemp;
    }
}
```

This code demonstrates how to vary the temperature parameter during each sampling iteration, leading to different sequences of tokens.

x??

---


#### Log Prob Calculation
Explanation of calculating log probabilities for sequence generation and why it’s used.

:p How is the log probability calculated for a sequence of tokens?
??x
Log probability is often used in sequence models because working with logarithms can simplify numerical computations. The log probability of a sequence of tokens is the sum of the individual token probabilities, which avoids underflow issues common when dealing with very small probabilities.

Given a sequence $[t_1, t_2, ..., t_n]$, the log probability can be calculated as:

$$\logprob(t_1, t_2, ..., t_n) = \sum_{i=1}^{n} \log(p(t_i | t_{<i}))$$where $ p(t_i | t_{<i})$is the conditional probability of token $ t_i$ given all previous tokens.

```java
public class LogProbCalculator {
    public double calculateLogProb(String[] tokens, List<Double> tokenProbs) {
        return IntStream.range(0, tokens.length)
                        .mapToDouble(i -> Math.log(tokenProbs.get(i)))
                        .sum();
    }
}
```

This code snippet demonstrates how to compute the log probability for a sequence of tokens.

x??

---


#### Selection Methods
Explanation of selection methods used in test time compute, such as choosing based on average logprob or using reward models.

:p What are some common methods for selecting outputs in test time compute?
??x
There are several methods for selecting outputs from multiple generated sequences during test time compute. Two common approaches include:

1. **Average Log Probability**: This method selects the output with the highest average log probability across all tokens.
2. **Reward Models**: These models score each generated sequence and select the one with the highest score.

For example, in OpenAI's API, you can set `best_of = 10` to get the output that has the highest average logprob out of 10 different outputs:

```java
public class OutputSelector {
    public String selectBestOutput(List<String> generatedOutputs) {
        double maxLogProb = Double.NEGATIVE_INFINITY;
        String bestOutput = null;

        for (String output : generatedOutputs) {
            List<Double> tokenProbs = calculateTokenProbabilities(output);
            double avgLogProb = calculateAverageLogProb(tokenProbs);
            
            if (avgLogProb > maxLogProb) {
                maxLogProb = avgLogProb;
                bestOutput = output;
            }
        }

        return bestOutput;
    }

    private List<Double> calculateTokenProbabilities(String output) {
        // Calculate token probabilities here
    }

    private double calculateAverageLogProb(List<Double> tokenProbs) {
        return tokenProbs.stream()
                         .mapToDouble(Double::doubleValue)
                         .sum() / tokenProbs.size();
    }
}
```

This code demonstrates the logic for selecting the output with the highest average log probability.

x??

---


#### Verifiers and Reward Models
Explanation of using verifiers and reward models to improve model performance, including their benefits and potential drawbacks.

:p How do verifiers and reward models enhance model performance in test time compute?
??x
Verifiers and reward models can significantly boost model performance by providing an additional layer of quality control. A verifier is a separate model that evaluates the correctness or validity of generated outputs, while a reward model scores each output based on its relevance to a specific task.

Using these models helps ensure that only high-quality, relevant responses are selected, thereby improving overall application performance. For instance, OpenAI used verifiers for math problems and found they provided approximately the same performance boost as tripling the model size without using them.

However, relying solely on test time compute can be expensive in terms of computational resources. The more outputs you sample, the higher the cost. In some cases, such as generating 10,000 different outputs, the costs become prohibitive.

```java
public class RewardModel {
    public double scoreOutput(String output) {
        // Score based on relevance and quality
        return model.predictScore(output);
    }
}

public class Verifier {
    public boolean verifyOutput(String output) {
        // Verify correctness of output
        return model.isCorrect(output);
    }
}
```

These classes demonstrate how to integrate reward models and verifiers into the selection process.

x??

---


#### Application-Specific Heuristics
Explanation of using application-specific heuristics for selecting outputs, such as choosing the shortest response or valid SQL queries.

:p How can application-specific heuristics be used in test time compute?
??x
Application-specific heuristics can help tailor the output selection process to meet specific requirements. For example:

- **Shortest Response**: If your application prefers shorter responses, you can pick the shortest candidate among the generated outputs.
- **Valid SQL Queries**: In applications converting natural language to SQL queries, you can continue generating outputs until a valid SQL query is produced.

Here’s an example of selecting the shortest response:

```java
public class ShortestResponseSelector {
    public String selectShortestOutput(List<String> generatedOutputs) {
        String shortestOutput = null;
        int minLen = Integer.MAX_VALUE;

        for (String output : generatedOutputs) {
            if (output.length() < minLen) {
                minLen = output.length();
                shortestOutput = output;
            }
        }

        return shortestOutput;
    }
}
```

And here’s an example of generating valid SQL queries:

```java
public class SQLQueryGenerator {
    public String generateValidSQL(String input) {
        while (true) {
            List<String> outputs = model.generateMultipleOutputs(input);
            for (String output : outputs) {
                if (isValidSQL(output)) {
                    return output;
                }
            }
        }
    }

    private boolean isValidSQL(String sql) {
        // Validation logic here
        return true;
    }
}
```

These code snippets illustrate how to implement application-specific heuristics.

x??

---

---


#### Self-Consistency Approach
Background context: Wang et al. (2023) introduced a self-consistency approach for handling brittle models, which are models that may not perform consistently under small input variations.

:p What is the self-consistency approach?
??x
The self-consistency approach involves running a model multiple times with the same input to ensure consistency in outputs and improve reliability. This method helps mitigate issues where small variations in inputs lead to dramatically different outputs.
```java
public class SelfConsistencyApproach {
    public String runModelMultipleTimes(String input, int numberOfRuns) {
        List<String> results = new ArrayList<>();
        for (int i = 0; i < numberOfRuns; i++) {
            String result = model.run(input); // Assuming model.run is a method that returns the output of running the model
            results.add(result);
        }
        return mostCommonOutput(results); // Method to find the most common output among runs
    }

    private String mostCommonOutput(List<String> results) {
        Map<String, Long> frequencyMap = results.stream().collect(Collectors.groupingBy(Function.identity(), Collectors.counting()));
        return Collections.max(frequencyMap.entrySet(), Comparator.comparingLong(Map.Entry::getValue)).getKey();
    }
}
```
x??

---


#### Parallel Response Generation
Background context: To address latency issues in models, especially for complex queries like chain-of-thought questions, a common approach is to generate multiple responses in parallel and display the first valid response. This method helps reduce overall wait times.

:p How does parallel response generation work?
??x
Parallel response generation involves running a model multiple times on the same input simultaneously. The system then displays the first valid response that completes. If none complete, it might show the most common or best among all responses.
```java
public class ParallelResponseGenerator {
    public String generateResponses(String input, int numberOfRuns) {
        List<Future<String>> futures = new ArrayList<>();
        ExecutorService executor = Executors.newFixedThreadPool(numberOfRuns);
        
        for (int i = 0; i < numberOfRuns; i++) {
            FutureTask<String> task = new FutureTask<>(() -> model.run(input)); // Assuming model.run is a method that returns the output of running the model
            futures.add(task);
            executor.submit(task);
        }
        
        String firstValidResponse = "";
        for (Future<String> future : futures) {
            try {
                String response = future.get();
                if (!response.isEmpty()) { // Assuming an empty string indicates no valid response
                    firstValidResponse = response;
                    break; // Stop once a valid response is found
                }
            } catch (InterruptedException | ExecutionException e) {
                e.printStackTrace();
            }
        }
        
        executor.shutdown();
        return firstValidResponse;
    }
}
```
x??

---


#### Sampling for Robustness
Background context: When dealing with brittle models, sampling multiple outputs can help in obtaining more robust and reliable results. This technique is particularly useful when the model's responses vary significantly with small input variations.

:p How does sampling help in making a model more robust?
??x
Sampling helps by generating multiple outputs for the same input and then selecting the most common or best output among them. This method reduces variability in the model’s responses, leading to more consistent and reliable results.
```java
public class SamplingForRobustness {
    public String sampleMultipleTimes(String input, int numberOfSamples) {
        List<String> samples = new ArrayList<>();
        for (int i = 0; i < numberOfSamples; i++) {
            String sample = model.run(input); // Assuming model.run is a method that returns the output of running the model
            samples.add(sample);
        }
        
        return mostCommonOutput(samples); // Method to find the most common output among samples
    }

    private String mostCommonOutput(List<String> samples) {
        Map<String, Long> frequencyMap = samples.stream().collect(Collectors.groupingBy(Function.identity(), Collectors.counting()));
        return Collections.max(frequencyMap.entrySet(), Comparator.comparingLong(Map.Entry::getValue)).getKey();
    }
}
```
x??

---


#### Structured Output Tasks
Background context: In certain applications, models need to generate outputs in a specific format. This is particularly common in tasks like semantic parsing, where natural language needs to be converted into machine-readable formats.

:p What are structured output tasks?
??x
Structured output tasks involve generating outputs that follow a predefined format or structure. These tasks often require the model to produce valid SQL queries from natural language inputs (text-to-SQL) or other structured data types.
```java
public class StructuredOutputTask {
    public String generateRegex(String item, int numberOfSamples) {
        // Example: Generate regex for email addresses and dates
        List<String> samples = new ArrayList<>();
        for (int i = 0; i < numberOfSamples; i++) {
            if ("Email address".equals(item)) {
                samples.add("[a-zA-Z0-9._ percent+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}");
            } else if ("Dates".equals(item)) {
                samples.add("(?:\\d{1,2}[\\/-\\.])(?:\\d{1,2}[\\/-\\.])?\\d{2,4}");
            }
        }
        
        return mostCommonOutput(samples); // Method to find the most common output among samples
    }

    private String mostCommonOutput(List<String> samples) {
        Map<String, Long> frequencyMap = samples.stream().collect(Collectors.groupingBy(Function.identity(), Collectors.counting()));
        return Collections.max(frequencyMap.entrySet(), Comparator.comparingLong(Map.Entry::getValue)).getKey();
    }
}
```
x??

---

---


#### Structured Outputs Overview
Structured outputs are necessary when downstream applications require specific formats for processing. Even though the model itself may not need structured data, its outputs must be parseable by these applications.
:p What is the purpose of having structured outputs?
??x
The purpose of having structured outputs is to ensure that the model's outputs can be easily processed and utilized by downstream applications that require specific formats.
x??

---


#### Generating Constrained Outputs Using Guidance
Guidance can be used to generate outputs constrained within specific options or regex patterns. This technique helps ensure that generated content matches desired formats.
:p How does guidance assist in generating structured outputs?
??x
Guidance assists in generating structured outputs by constraining the model’s output within predefined options or using regex patterns, ensuring the generated content adheres to specific formats.
x??

---


#### Example of Constrained Sampling
Constrained sampling involves guiding the model to generate outputs that fit specific formats, often used when the model is already good at generating structured data but needs a little help.
:p What does constrained sampling do?
??x
Constrained sampling guides the model to generate outputs that match specific formats. It’s particularly useful when the model is nearly capable of generating structured data but requires some additional direction.
x??

---


#### Finetuning for Structured Outputs
Finetuning can be used to improve a model's ability to generate structured outputs, especially in cases where simple prompting and constrained sampling don’t suffice.
:p What does finetuning aim to achieve?
??x
Finetuning aims to enhance a model’s ability to generate structured outputs by adjusting the model parameters specifically for this purpose. It is used when simpler methods like prompting and constrained sampling are not sufficient.
x??

---

---


#### AI as a Judge Approach

This approach involves generating an output and then validating it. While this can significantly improve the validity of outputs, it comes with increased costs due to additional validation queries.

:p What is the advantage of using the AI as a judge approach?
??x
The primary advantage is that the added validation layer ensures higher accuracy in outputs by cross-verifying them. However, the cost and latency associated with these extra validation steps can be prohibitive for some applications.
x??

---


#### Constraint Sampling

Constraint sampling is a technique used to guide the generation of text toward specific constraints. It involves filtering logits based on given rules before sampling.

:p What is constraint sampling?
??x
Constraint sampling is a method where the model generates tokens only from those that meet certain predefined constraints. This process starts with generating logit vectors and then filtering these vectors to keep only valid tokens.
x??

---


#### Grammar and Constraint Sampling

Grammar is crucial for defining what constitutes valid outputs within a specific format (e.g., JSON or YAML). Constraint sampling requires a detailed grammar to properly filter and sample.

:p Why is grammar important in constraint sampling?
??x
Grammar is essential because it defines the rules that determine which tokens are valid at each step of output generation. Without proper grammar, constraint sampling cannot accurately guide the model's token selection.
x??

---


#### Increased Latency in Grammar Verification

Grammar verification can increase generation latency due to the complexity of implementing and validating grammars.

:p What is a potential downside of grammar verification?
??x
A potential downside of grammar verification is increased generation latency. The process requires detailed grammatical rules, which can slow down the output generation.
x??

---


---

#### Finetuning a Model
Finetuning is an effective approach to adapt a pre-trained model for specific tasks, especially when dealing with structured outputs. This method involves retraining the model on task-specific data while potentially modifying its architecture to better fit the desired output format.

Training from scratch can work but may not be as efficient or reliable compared to finetuning.
:p What is finetuning and why is it important?
??x
Finetuning is a process where a pre-trained model is further trained on task-specific data. It's important because it adapts the model to specific tasks more effectively than training from scratch, especially when dealing with structured outputs.

Finetuning can work with any expected format but doesn't guarantee consistent output unless modifications are made to the architecture.
x??

---


#### Classifier Head Addition
Adding a classifier head to a base model is a technique used for classification tasks. This involves appending a new component to the existing model that processes the features generated by the foundation model and produces class probabilities or labels.

The architecture looks like Figure 2-22, which shows how the classifier head can be added after the foundation model.
:p How does adding a classifier head help in classification tasks?
??x
Adding a classifier head helps because it transforms the generic feature representations produced by the base model into class-specific predictions. This allows the model to make decisions based on predefined classes.

Example architecture:
- Base Model -> Feature Extractor -> Classifier Head (outputs probabilities for each class)
```java
public class ExampleClassifier {
    private FoundationModel baseModel;
    private NeuralNetwork classifierHead;

    public ExampleClassifier(FoundationModel baseModel, NeuralNetwork classifierHead) {
        this.baseModel = baseModel;
        this.classifierHead = classifierHead;
    }

    public List<Double> classify(List<Feature> features) {
        // Extract features from the base model
        List<Feature> extractedFeatures = baseModel.extractFeatures(features);

        // Use the classifier head to predict class probabilities
        return classifierHead.predict(extractedFeatures);
    }
}
```
x??

---


#### Finetuning vs. Training From Scratch
Training a model from scratch involves initializing and training the entire model on the given task data, while finetuning starts with a pre-trained model and adjusts it for specific tasks.

While simple finetuning doesn't guarantee consistent output formats, it is generally more reliable than prompting.
:p What are the differences between training from scratch and finetuning?
??x
Training from scratch involves initializing all parameters of the model randomly and then training the entire network on task-specific data. This can be time-consuming but might capture new patterns in the data.

Finetuning, on the other hand, starts with a pre-trained model and adjusts it to fit specific tasks. It is more efficient as most of the initial knowledge remains intact, only fine-tuned for the new task.

Finetuning works better for structured outputs because the base model can learn from its pre-training data to predict the desired format.
x??

---

