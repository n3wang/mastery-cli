# High-Quality Flashcards: 006---Designing-Machine-Learning-Systems_processed (Part 7)

**Starting Chapter:** Non-Probability Sampling

---

#### Bias in Non-Probability Sampling
Non-probability sampling methods often introduce selection bias because the samples are not randomly selected. This can lead to misleading conclusions, especially in machine learning applications where the training data is not representative of real-world data. For example, language models trained on Wikipedia or Reddit may not generalize well to other types of text.
:p Why is non-probability sampling problematic for machine learning?
??x
Non-probability sampling is problematic for machine learning because it often leads to biased or unrepresentative datasets. For example, training a language model on data from Wikipedia or Reddit may not reflect the diversity of real-world text, leading to poor performance on unseen data. This bias can result in models that fail to generalize to broader or different contexts.
x??

---

#### Weighted Sampling
Weighted sampling assigns weights to each sample, determining the probability of selection. Samples with higher weights are more likely to be selected. This method is useful when certain data points are more informative or representative, such as recent data or data from a different distribution. For example, if red samples are 25% in the data but 50% in real-world distribution, they can be given higher weights to correct for this imbalance.

:p What is the purpose of weighted sampling in machine learning?
??x
Weighted sampling is used to adjust the probability of selecting samples based on their importance or representativeness. It is helpful when dealing with imbalanced data or when certain samples are more informative. For example, if a class is underrepresented in the dataset but is critical for model performance, it can be given a higher weight to increase its chance of selection.
x??

---

#### Reservoir Sampling
Reservoir sampling is an algorithm used to randomly select a fixed number $k$ of items from a large or infinite stream of data, without knowing the total size of the stream. It ensures that each item in the stream has an equal probability of being included in the final sample. This technique is essential in production systems dealing with continuous data streams like real-time analytics or online learning.

The algorithm works in three steps:
1. Fill the reservoir with the first $k$ elements.
2. For each subsequent element $n$, generate a random number $i$ between $1$ and $n$.
3. If $i \leq k$, replace the $i$-th element in the reservoir with the current element.

:p How does reservoir sampling ensure uniform probability for all elements in the stream?
??x
Reservoir sampling ensures uniformity by maintaining that at any point during the process, each element in the stream has an equal chance of being selected into the reservoir. When the $n$-th element arrives, it has a probability of $\frac{k}{n}$ of replacing one of the existing elements in the reservoir. Over time, this process guarantees that every element in the stream has an equal probability of $\frac{k}{N}$ of appearing in the final reservoir, where $N$ is the total number of elements.
x??

---

