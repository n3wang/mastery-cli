# High-Quality Flashcards: 2A001---AI-Engineering_-Building-Applications-with-Foundation-Models-OReilly-Media-2025Chip-Huyen--_processed (Part 10)


**Starting Chapter:** Bits-per-Character and Bits-per-Byte

---


#### Entropy
Background context explaining the concept of entropy and its relation to information. The formula for entropy is given as $H = -\sum p_i \log_2(p_i)$, where $ p_i$ represents the probability of a token.

:p What is entropy in the context of language models?
??x
Entropy measures, on average, how much information each token carries. A higher entropy value indicates that tokens carry more information but require more bits to represent them. This can be understood by considering a simple example where two different languages are used to describe positions within a square.
```java
public class EntropyExample {
    public static double calculateEntropy(double[] probabilities) {
        double entropy = 0;
        for (double prob : probabilities) {
            if (prob > 0) {
                entropy -= prob * Math.log2(prob);
            }
        }
        return entropy;
    }

    // Example usage
    public static void main(String[] args) {
        double[] probabilities = {0.5, 0.5};
        System.out.println("Entropy: " + calculateEntropy(probabilities));
    }
}
```
x??

---


#### Cross Entropy
Background context explaining the concept of cross entropy and its relevance to language models. The formula for cross entropy is given as $H(P||Q) = -\sum p_i \log_2(q_i)$, where $ P$represents the true distribution of training data, and $ Q$ is the distribution learned by the model.

:p What does cross entropy measure in a language model?
??x
Cross Entropy measures how difficult it is for the language model to predict what comes next in the dataset. It depends on two factors: 1) The predictability of the training data (measured by its entropy), and 2) How closely the distribution captured by the model matches the true distribution of the training data.
```java
public class CrossEntropyExample {
    public static double calculateCrossEntropy(double[] trueDistribution, double[] predictedDistribution) {
        double crossEntropy = 0;
        for (int i = 0; i < trueDistribution.length; i++) {
            if (trueDistribution[i] > 0 && predictedDistribution[i] > 0) {
                crossEntropy -= trueDistribution[i] * Math.log2(predictedDistribution[i]);
            }
        }
        return crossEntropy;
    }

    // Example usage
    public static void main(String[] args) {
        double[] trueDist = {0.5, 0.5};
        double[] predDist = {0.6, 0.4};
        System.out.println("Cross Entropy: " + calculateCrossEntropy(trueDist, predDist));
    }
}
```
x??

---


#### Perplexity
Background context explaining the concept of perplexity and its relation to cross entropy.

:p What is perplexity in language models?
??x
Perplexity is a measure derived from cross entropy. It gives an estimate of how well a probability distribution predicts a sample. Lower perplexity indicates better prediction accuracy, where 2^H(P||Q) = \exp(H(P||Q)) represents the perplexity.
```java
public class PerplexityExample {
    public static double calculatePerplexity(double crossEntropy) {
        return Math.exp(crossEntropy);
    }

    // Example usage
    public static void main(String[] args) {
        double crossEntropy = 1.0; // Assuming some value from previous calculations
        System.out.println("Perplexity: " + calculatePerplexity(crossEntropy));
    }
}
```
x??

---


#### Bits-Per-Character (BPC)
Background context explaining the concept of BPC and its relation to entropy and cross entropy.

:p What is bits-per-character in language models?
??x
Bits-Per-Character (BPC) measures how many bits are required on average to represent a character, based on the distribution learned by the model. It can be calculated as $\text{BPC} = -\frac{\log_2(P(x_{i+1}|x_i))}{n}$, where $ P(x_{i+1}|x_i)$is the probability of the next token given a context, and $ n$ is the number of tokens.
```java
public class BPCExample {
    public static double calculateBPC(double crossEntropy, int nTokens) {
        return -crossEntropy / Math.log(2) / nTokens;
    }

    // Example usage
    public static void main(String[] args) {
        double crossEntropy = 1.0; // Assuming some value from previous calculations
        int nTokens = 100; // Number of tokens in the dataset
        System.out.println("BPC: " + calculateBPC(crossEntropy, nTokens));
    }
}
```
x??

---


---
#### Cross Entropy and Kullback-Leibler Divergence
Cross entropy is a measure of the difference between two probability distributions. It quantifies how much one distribution (Q) deviates from another reference distribution (P). The formula for cross entropy $H(P, Q)$ with respect to P is given by:
$$H(P, Q) = -\sum_{x} P(x) \log Q(x)$$

The Kullback-Leibler (KL) divergence measures the difference between these distributions in a way that is not symmetric. It quantifies how one probability distribution diverges from a second, expected probability distribution and is given by:
$$

D_{KL}(P || Q) = H(P, Q) - H(P)$$

The cross entropy isn't symmetric;$H(P, Q) \neq H(Q, P)$. The KL divergence of Q with respect to P is:
$$D_{KL}(P || Q) = \sum_{x} P(x) \log \left( \frac{P(x)}{Q(x)} \right)$$

A language model trained to minimize its cross entropy with respect to the training data will approximate the true distribution of the training data. If it learns perfectly, the cross entropy would match the entropy of the training data, and the KL divergence would be 0.

:p What is the formula for cross entropy $H(P, Q)$?
??x
The formula for cross entropy between two probability distributions P and Q is:
$$H(P, Q) = -\sum_{x} P(x) \log Q(x)$$

This quantifies how much distribution Q deviates from the reference distribution P.
x??

---


#### Cross Entropy vs. KL Divergence
Cross entropy measures the difficulty for a model to predict the next token in a sequence, while KL divergence measures the uncertainty or information needed to change one probability distribution into another.

:p How does cross entropy and KL divergence differ in their application?
??x
Cross entropy $H(P, Q)$ measures how well a model predicts the next token. It quantifies the expected number of bits required to encode messages generated by P using codes optimized for Q.

KL Divergence $D_{KL}(P || Q)$, on the other hand, measures the difference between two probability distributions. Specifically, it tells us how much information is needed to change distribution Q to match P.
x??

---


#### Perplexity
Perplexity measures the uncertainty or surprise of a model's predictions. It is derived from cross entropy and is defined as:
$$PPL(P) = 2^{H(P)}$$

For a dataset with true distribution $P $ and learned distribution$Q$:
$$PPL(P, Q) = 2^{H(P, Q)}$$

Perplexity provides insight into the model's uncertainty when predicting the next token in a sequence.

:p What is the formula for Perplexity?
??x
The formula for Perplexity is:
$$\text{PPL} = 2^{\text{Cross Entropy}}$$

For a dataset with true distribution $P $ and learned distribution$Q$:
$$\text{PPL}(P, Q) = 2^{H(P, Q)}$$

Perplexity measures the uncertainty of predictions, making it useful in evaluating how well a model can predict sequences.
x??

---

---


#### Bit vs. Nat for Entropy and Cross Entropy
Background context explaining the concept. The text discusses the use of bits and nats as units for measuring entropy and cross entropy. Bits represent 2 unique values, while nats use the base $e$. Popular frameworks like TensorFlow and PyTorch use nats.
:p What are the differences between using bits and nats in measuring entropy and cross entropy?
??x
Bits and nats are used to measure entropy and cross entropy differently due to their bases. Bits are based on a binary system (base 2), which means each bit can represent two unique values, $0 $ or$1 $. In contrast, nats use the natural logarithm base $ e \approx 2.718$.

Using bits for these measurements involves calculations with base 2 logarithms, while using nats involves calculations with the natural logarithm (base $e$). For example:
- Entropy in bits: $H(X) = -\sum_{i} p(x_i) \log_2(p(x_i))$- Entropy in nats:$ H(X) = -\sum_{i} p(x_i) \ln(p(x_i))$ Consequently, perplexity calculations differ based on the unit used. When using bits, perplexity is given by:
$$PPL(P,Q) = 2^{H(P,Q)}$$

However, when using nats, perplexity becomes:
$$

PPL(P,Q) = e^{H(P,Q)}$$x??

---


#### Perplexity Interpretation and Use Cases
Background context explaining the concept. The text provides a detailed explanation of how perplexity is used to measure the uncertainty in predicting tokens by language models.
:p What does a higher or lower perplexity value indicate about a model's performance?
??x
A higher perplexity value indicates greater uncertainty in the model’s predictions, while a lower perplexity value indicates more accurate predictions. This means that with lower perplexity, the model can better predict the next token(s) in a sequence.

In terms of specific scenarios:
- **Structured Data**: More structured data tends to have lower expected perplexity because it is easier to predict. For example, HTML code has more predictable patterns compared to everyday text.
- **Vocabulary Size**: Larger vocabularies lead to higher perplexity due to the increased number of possible tokens. A model’s perplexity on a children's book (smaller vocabulary) would be lower than its perplexity on War and Peace (larger vocabulary).
- **Context Length**: Longer context lengths reduce uncertainty, leading to lower perplexity. Modern models can condition their predictions on up to 10,000 previous tokens or more.
x??

---


#### Examples of Perplexity in Different Contexts
Background context explaining the concept. The text provides examples comparing perplexity values for different types of data and contexts.
:p How does the perplexity value change with different types of data?
??x
Perplexity varies significantly based on the type of data being modeled:
- **More Structured Data**: HTML code is more predictable, leading to lower perplexity because the structure (like opening tags) helps in prediction. For instance, a model's perplexity might be 2 for predicting closing tags after an opening tag.
- **Vocabulary Size**: A smaller vocabulary means fewer possible tokens, making it easier to predict the next token accurately. Therefore, a model’s perplexity on a children's book would typically be lower than its perplexity on War and Peace due to the broader range of words in the latter.
- **Context Length**: With longer context lengths, models have more information to make accurate predictions, reducing uncertainty and lowering the perplexity value.

For example:
- Predicting the next character in a children's book might result in a perplexity of 3.
- Predicting the next word in War and Peace would likely yield a higher perplexity, say around 10 or more.
x??

---


#### Perplexity as a Model Evaluation Metric
Background context explaining the concept. The text discusses how perplexity is used as an evaluation metric for language models, emphasizing that it reflects the model's uncertainty and predictive accuracy.
:p What does a good value for perplexity depend on?
??x
A good value for perplexity depends on several factors:
- **Data Structure**: More structured data tends to have lower expected perplexity. For example, HTML code is more predictable than everyday text due to its structured nature.
- **Vocabulary Size**: Larger vocabularies result in higher perplexity because there are more possible tokens that the model must predict accurately. Therefore, a children's book with a smaller vocabulary would likely have a lower perplexity compared to War and Peace.
- **Context Length**: Longer context lengths reduce uncertainty, leading to lower perplexity. Modern models can condition their predictions on up to 10,000 previous tokens or more.

In general:
- Perplexity values as low as 3 or even lower are not uncommon for well-performing language models.
x??

---

---


#### Perplexity as a Model Proxy

Perplexity is used to evaluate the capability of language models, serving as an indirect measure for performance on downstream tasks. Generally, lower perplexity indicates better model performance.

:p What does perplexity indicate about a model's capabilities?
??x
Lower perplexity suggests that a model has better predictive power and is more capable of understanding and generating coherent text. This metric reflects how well the model can predict the next token in a sequence.
x??

---


#### Quantization and Perplexity

Quantization, which reduces numerical precision and memory footprint, can also impact a model's perplexity unpredictably.

:p How does quantization affect a model’s perplexity?
??x
Quantization can alter a model's perplexity in unexpected ways. By reducing the numerical precision, it affects how the model processes information, potentially impacting its predictive power.
x??

---


#### Overall Performance Proxy

Perplexity is a useful proxy for understanding the underlying language model’s performance, which reflects its capabilities on downstream tasks.

:p What role does perplexity play in evaluating models?
??x
Perplexity helps us understand how well a language model can generalize and predict text, serving as a proxy for its overall performance on both training and unseen data.
x??

---

---


#### Perplexity Calculation for Language Models
Background context: Perplexity is a measure used to evaluate how well a language model predicts a given sequence of tokens. It provides insight into the complexity of generating a particular piece of text. The lower the perplexity, the better the model's performance.
Relevant formula:
$$

P(x_1,x_2,...,x_n) = \left( \prod_{i=1}^{n} \frac{1}{P(x_i|x_1,...,x_{i-1})} \right)^{\frac{1}{n}}$$where $ P(xi|xi−1)$is the probability that the model assigns to the token $ xi$ given the previous tokens.

:p How do you calculate the perplexity of a sequence using a language model?
??x
To calculate the perplexity, you need to compute the product of the reciprocal probabilities of each token in the sequence conditioned on all preceding tokens. This is then raised to the power of $\frac{1}{n}$, where $ n$ is the length of the sequence.
```java
public class PerplexityCalculator {
    public double calculatePerplexity(List<String> tokens, LanguageModel model) {
        double product = 1;
        for (int i = 1; i < tokens.size(); i++) {
            String prevToken = " ".equals(tokens.get(i - 1)) ? "" : tokens.get(i - 1);
            String token = tokens.get(i);
            double prob = model.predictProbability(prevToken, token); // Assume this method exists
            product *= (1 / prob);
        }
        return Math.pow(product, 1.0 / tokens.size());
    }
}
```
x??

---


#### Exact Evaluation vs Subjective Evaluation
Background context: When evaluating models' performance, it is crucial to understand the difference between exact and subjective evaluation methods. Exact evaluations provide clear and unambiguous results, while subjective evaluations depend on human judgment.
Relevant formula: None

:p What are the differences between exact evaluation and subjective evaluation?
??x
Exact evaluation produces judgments without ambiguity, like a correct or incorrect answer in multiple-choice questions. In contrast, subjective evaluation depends on human judgment, such as grading an essay, where different graders might give varying scores even for the same work.
x??

---


#### Functional Correctness Evaluation
Background context: Evaluating systems based on whether they perform intended functionality is known as functional correctness evaluation. This method checks if a model generates output that meets specific criteria, like creating a website or making reservations.
Relevant formula: None

:p How does functional correctness evaluation work?
??x
Functional correctness evaluates systems by checking if the generated outputs meet specified requirements. For example, when generating code for a function `gcd(num1, num2)`, the test involves running the generated code in a Python interpreter to ensure it produces correct results.
x??

---


#### Example of Functional Correctness in Code Generation
Background context: An example of functional correctness evaluation is evaluating a model's ability to generate valid and accurate code. This can be done by checking if the output functions correctly when executed.

:p What does functional correctness mean for code generation tasks?
??x
Functional correctness in code generation means verifying that the generated code not only compiles but also performs its intended function accurately. For instance, a model generating a `gcd` function should produce valid Python code that correctly computes the greatest common divisor.
```java
public class FunctionCorrectnessChecker {
    public boolean checkFunctionCorrectness(String generatedCode) {
        // Use a Java compiler to compile and execute the generated code
        String result = runCompiler(generatedCode); 
        if (result.contains("Exception")) return false;
        int num1 = 24, num2 = 36; // Example input values
        String output = runFunction(num1, num2, generatedCode);
        return Integer.parseInt(output) == gcd(num1, num2); // Verify against known correct result
    }
    
    private String runCompiler(String code) {
        // Pseudo-code for running a compiler to check if the code is valid
    }
    
    private String runFunction(int num1, int num2, String generatedCode) {
        // Pseudo-code for executing the function within the generated code and capturing output
    }

    public static int gcd(int a, int b) {
        return (b == 0) ? a : gcd(b, a % b);
    }
}
```
x??

---


#### Functional Correctness Evaluation in Code Verification

Background context explaining the concept. Include any relevant formulas or data here.

Functional correctness evaluation is a standard practice in software engineering to ensure that the submitted solutions meet the expected outcomes for given scenarios. This method is widely used by coding platforms like LeetCode and HackerRank, as well as AI benchmarks such as HumanEval and MBPP.

Functional correctness is often validated using unit tests where code runs through different scenarios and checks if it generates the expected outputs. For example, a function to compute the greatest common divisor (GCD) of two numbers should return 5 for the input pair (15, 20).

:p How does functional correctness evaluation work in software engineering?
??x
Functional correctness evaluation involves running code through various test cases to ensure it produces the expected output. For example, a GCD function should correctly return 5 when given inputs 15 and 20.
x??

---


#### Example Test Cases for Function Validation

Background context explaining the concept. Include any relevant formulas or data here.

Test cases are crucial in validating code functionality. They define specific scenarios that the code must handle correctly, along with the expected outcomes. For instance, a function to check if numbers in a list are close to each other within a threshold can be tested using various inputs and thresholds.

:p What is an example of test cases for validating a function's correctness?
??x
Test cases for validating a function include specific scenarios like:
- `has_close_elements([1.0, 2.0, 3.9, 4.0, 5.0, 2.2], 0.3)` should return `True`.
- `has_close_elements([1.0, 2.0, 3.9, 4.0, 5.0, 2.2], 0.05)` should return `False`.

These test cases help ensure the function works as expected across different scenarios.
x??

---


#### Pass@k Score in Model Evaluation

Background context explaining the concept. Include any relevant formulas or data here.

In model evaluation, especially for AI-generated code, a pass@k score is used to measure how well a model solves problems. The score indicates the fraction of problems that are solved by at least one of k generated code samples out of all problems.

:p How does the pass@k score work in evaluating models?
??x
The pass@k score measures the effectiveness of a model by considering whether any of its k generated code samples pass all test cases for each problem. For example, if a model generates 3 code samples and solves 5 out of 10 problems, the pass@3 score is 50%.

```python
def calculate_pass_at_k(solved_problems: int, total_problems: int, k_samples: int) -> float:
    return solved_problems / (total_problems * k_samples)
```
x??

---


---
#### Game Bots Evaluation
Background context: Evaluating game bots, such as a bot for Tetris, can be done by measuring the score it achieves. This is an example of tasks with measurable objectives that can be evaluated using functional correctness.

:p How would you evaluate a Tetris-playing bot?
??x
You would evaluate a Tetris-playing bot by observing its score. The higher the score, the better the performance of the bot. For instance, a bot that clears more lines and holds up the game for longer periods will have a higher score.
x??

---


#### Reference Data Evaluation
Background context: When tasks cannot be evaluated through functional correctness alone, reference data is used to evaluate AI outputs. This method involves comparing generated responses against known correct (reference) responses.

:p What approach would you use if you need to translate sentences from French to English using an AI model?
??x
You would compare the generated English translation with a set of correct English translations provided as reference data. The quality of the generated output is then judged based on how closely it matches these references.
x??

---


#### Similarity Measurements
Background context: When exact match or reference-free methods are not applicable, similarity measurements can be used to evaluate AI outputs. There are three common methods for comparing texts: exact matching, lexical similarity, and semantic similarity.

:p What is the difference between exact matching and lexical similarity?
??x
Exact matching checks if the generated text exactly matches one of the references. Lexical similarity measures how visually similar or closely related the words in the generated text are to those in the reference.
x??

---


#### Semantic Similarity
Background context: Semantic similarity evaluates how close in meaning two texts are, which is particularly useful when exact wording may vary but the essence should be preserved.

:p How do you measure semantic similarity between two open-ended texts?
??x
Semantic similarity measures how closely the generated text aligns with the intended meaning of the reference text. This can involve using natural language processing techniques like word embeddings or machine learning models to compare the meanings.
x??

---


#### Similarity Measurements for Various Use Cases
Background context: The provided text explains various applications of similarity measurements, including retrieval and search, ranking, clustering, anomaly detection, and data deduplication. These techniques are essential for processing and understanding complex texts or items.
:p What are some use cases mentioned in the text where similarity measurements can be applied?
??x
The text mentions several use cases:
- Retrieval and search: Finding similar items to a query.
- Ranking: Ranking items based on their similarity to a query.
- Clustering: Grouping items that are similar to each other.
- Anomaly detection: Identifying items that are the least similar to others.
- Data deduplication: Removing duplicate or highly similar items.

x??

---


#### Semantic Similarity
Background context: Lexical similarity focuses on token overlap, while semantic similarity considers meaning beyond just word choice. It’s particularly useful for complex tasks where exact phrasing might vary.
:p How does semantic similarity differ from lexical similarity?
??x
Semantic similarity differs from lexical similarity by focusing not only on the shared tokens but also on the overall meaning of the text. While lexical similarity measures how many words overlap, semantic similarity evaluates if the meanings align.

Example: Using the same texts:
- Reference Response: "My cats scare the mice"
- Generated Response A: "My cats eat the mice" (Lexical: 80%)
- Generated Response B: "Cats and mice fight all the time" (Lexical: 60%)

Semantically, both responses might be considered more similar because they convey a similar meaning about interaction between cats and mice.

x??

---

---


#### Edit Distance and Fuzzy Matching
Background context: Lexical similarity can be measured using approximate string matching, known as fuzzy matching. This method calculates the minimum number of single-character edits required to transform one string into another. The three basic operations are deletion, insertion, and substitution.

:p What is edit distance in the context of lexical similarity?
??x
Edit distance measures the minimum number of single-character edits (deletions, insertions, or substitutions) required to change one word or phrase into another.
x??

---


#### Common Metrics for Lexical Similarity
Background context: Various metrics like BLEU, ROUGE, METEOR++, TER, and CIDEr are used to measure lexical similarity. These metrics differ in how they calculate the overlap of tokens or n-grams.

:p What are some common metrics used to measure lexical similarity?
??x
Common metrics for measuring lexical similarity include BLEU, ROUGE, METEOR++, TER, and CIDEr. Each metric calculates the overlap differently.
x??

---


#### Challenges with Reference-Based Metrics
Background context: While reference-based metrics like BLEU, ROUGE, etc., are useful, they face challenges such as requiring a comprehensive set of reference responses and potential biases from low-quality references.

:p What are some drawbacks of using reference-based metrics for measuring lexical similarity?
??x
Drawbacks include the need to curate a comprehensive set of high-quality reference responses. A good response might receive a low score if no similar responses exist in the reference data. Additionally, low-quality or incorrect references can lead to misleading scores.
x??

---


#### Limitations of Lexical Similarity Metrics
Background context: Higher lexical similarity scores do not always correlate with better quality responses. For instance, in code generation tasks like HumanEval, optimizing for BLEU scores might not align with the goal of generating functionally correct solutions.

:p Why might optimizing for lexical similarity metrics like BLEU not be effective?
??x
Optimizing for lexical similarity metrics such as BLEU doesn't necessarily correlate with functional correctness. In tasks like code generation, incorrect and correct solutions can have similar BLEU scores, indicating that these metrics don't ensure the quality of generated content.
x??

---

---


#### Semantic Similarity vs Lexical Similarity

Background context explaining the concept. Include any relevant formulas or data here.

Lexical similarity measures whether two texts look similar, not whether they have the same meaning. Consider the two sentences “What’s up?” and “How are you?” Lexically, they are different—there’s little overlapping in the words and letters they use. However, semantically, they are close. Conversely, similar-looking texts can mean very different things. “Let’s eat, grandma” and “Let’s eat grandma” mean two completely different things.

:p What is semantic similarity?
??x
Semantic similarity aims to compute the similarity in semantics.
x??

---


#### Semantic Similarity and Embeddings

Background context explaining the concept. Include any relevant formulas or data here.

For computing semantic similarity, texts are first transformed into numerical representations called embeddings. For example, the sentence “the cat sits on a mat” might be represented using an embedding that looks like this: [0.11, 0.02, 0.54]. Semantic similarity is therefore also called embedding similarity.

:p What is an embedding?
??x
An embedding is a numerical representation of text.
x??

---


#### Cosine Similarity Calculation

Background context explaining the concept. Include any relevant formulas or data here.

The similarity between two embeddings can be computed using metrics such as cosine similarity. Two embeddings that are exactly the same have a similarity score of 1. Two opposite embeddings have a similarity score of –1. Mathematically, let A be an embedding of the generated response, and B be an embedding of a reference response. The cosine similarity between A and B is computed as $\frac{A·B}{||A|| ||B||}$, with:
- $A·B$ being the dot product of A and B
- $||A||$ being the Euclidean norm (also known as L2 norm) of A.

:p How do you calculate cosine similarity between two embeddings?
??x
The cosine similarity is calculated by taking the dot product of the two vectors and dividing it by the product of their Euclidean norms. Here's an example in pseudocode:

```pseudocode
function cosineSimilarity(A, B):
    dotProduct = 0.0
    normA = 0.0
    normB = 0.0

    for i from 0 to length(A)-1:
        dotProduct += A[i] * B[i]
        normA += A[i]^2
        normB += B[i]^2

    normA = sqrt(normA)
    normB = sqrt(normB)

    return dotProduct / (normA * normB)
```

x??

---


#### Importance of Embeddings

Background context explaining the concept. Include any relevant formulas or data here.

The quality of the underlying embedding algorithm significantly impacts the reliability of semantic similarity. Two texts with the same meaning can still have a low semantic similarity score if their embeddings are poor. Additionally, running an embedding algorithm might require substantial compute and time.

:p Why is the quality of the embedding important?
??x
The quality of the embedding is crucial because it directly affects the accuracy of the semantic similarity score. Poor embeddings may lead to incorrect or misleading similarity scores even when the texts have the same meaning.
x??

---

---

