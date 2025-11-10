# High-Quality Flashcards: 2A005---Learn-Generative-AI-with-PyTorch-Manning-2024-Mark-Liu--_processed (Part 19)


**Starting Chapter:** 8.3 Preparing data to train the LSTM model. 8.3.1 Downloading and cleaning up the text

---


#### Creating Dictionaries
Background context: After cleaning up the text data, we create dictionaries that map tokens to indices and vice versa.

:p How do you create mappings between unique tokens and their indexes?
??x
To create these mappings, use the following code:
```python
from collections import Counter

word_counts = Counter(text)
words = sorted(word_counts, key=word_counts.get, reverse=True)

text_length = len(text)
num_unique_words = len(words)
print(f"the text contains {text_length} words")
print(f"there are {num_unique_words} unique tokens")

word_to_int = {v: k for k, v in enumerate(words)}
int_to_word = {k: v for k, v in enumerate(words)}

print({k: v for k, v in word_to_int.items() if k in words[:10]})
print({k: v for k, v in int_to_word.items() if v in words[:10]})
```
This code first counts the occurrences of each unique token using `Counter`. Then it creates a list of these tokens sorted by frequency. Finally, it generates two dictionaries: one mapping from tokens to their indexes and another from indexes back to tokens.
x??

---


#### Using Dictionaries for Indexing
Background context: Once we have the dictionaries, they can be used to convert text data into a numerical format suitable for training an LSTM model.

:p How do you use the `word_to_int` and `int_to_word` dictionaries?
??x
You can use these dictionaries as follows:
```python
# Example usage of word_to_int and int_to_word
print(word_to_int["the"])  # prints: 2
print(int_to_word[5])      # prints: 'to'
```
The `word_to_int` dictionary allows you to get the index corresponding to a token, while `int_to_word` lets you retrieve the token from an index. This is crucial for converting text into numerical data and vice versa during training.
x??

---


#### Token Indexing
Background context: In natural language processing, tokenizing involves breaking down text into individual words or tokens. After tokenization, each unique word is assigned an index to facilitate machine learning models like LSTM networks.

:p What are dictionaries `word_to_int` and `int_to_word` used for in the given text?
??x
The `word_to_int` dictionary assigns a unique integer index to each token (word) in the text. The `int_to_word` dictionary does the reverse, translating an index back into its corresponding token.

For example:
```python
# Example of using dictionaries
word = "the"
index = word_to_int[word]  # This gets the index for 'the'
token = int_to_word[index]  # This converts index to the original token
```

x??

---


#### Creating Training Pairs (x, y)
Background context: In the context of training language models like LSTM networks, a common approach is to create pairs of input sequences (`x`) and their corresponding target outputs (`y`). These are used to train the model to predict the next word in a sequence based on the previous words.

:p How does the code block in Listing 8.2 create the training data?
??x
The code creates training data by generating pairs of inputs (x) and targets (y). Each input is a sequence of 100 indexes, and each target `y` is the next index after the corresponding input sequence.

Here’s how it works:
```python
seq_len = 100
xys = []
for n in range(0, len(wordidx) - seq_len - 1):
    xys.append((wordidx[n:n+seq_len], wordidx[n+seq_len]))
```

This means that for every index `n` from 0 to the length of `wordidx` minus `seq_len` and one (to ensure enough data), a pair `(x, y)` is created where:
- `x` is a sequence of indexes from `wordidx[n:n+seq_len]`
- `y` is the next index in `wordidx`, i.e., `wordidx[n+seq_len]`

This process ensures that each input sequence has a corresponding target output for training.

x??

---


#### Sliding Window Technique
Background context: The sliding window technique is a common method for generating sequence data where each input sequence (`x`) consists of a fixed number of tokens, and the target output (`y`) is the next token after `x`.

:p How does the sliding window technique work in creating training pairs?
??x
The sliding window technique works by taking sequences of a fixed length (e.g., 100 indexes) from the text and using the next index as the target. This process repeats, moving the window one step at a time until the end of the text is reached.

For example:
```python
seq_len = 100
xys = []
for n in range(0, len(wordidx) - seq_len - 1):
    xys.append((wordidx[n:n+seq_len], wordidx[n+seq_len]))
```

Here’s the breakdown:
- `n` iterates from 0 to `len(wordidx) - seq_len - 1`.
- For each `n`, a pair `(x, y)` is created where:
  - `x` is a sequence of indexes from `wordidx[n:n+seq_len]`.
  - `y` is the next index in `wordidx`, i.e., `wordidx[n+seq_len]`.

This approach ensures that every possible sequence of length `seq_len` has an associated target, allowing the model to learn patterns and dependencies effectively.

x??

---

---


#### Word Embedding Layer
Background context explaining how the `torch.nn.Embedding` layer works. It is a trainable lookup table that maps integer indexes to dense, continuous vector representations (embeddings). When you create an instance of `torch.nn.Embedding()`, you need to specify two main parameters: `num_embeddings`, the size of the vocabulary (total number of unique tokens), and `embedding_dim`, the size of each embedding vector.
:p How does the `torch.nn.Embedding` class work?
??x
The `torch.nn.Embedding` class creates a matrix or lookup table where each row corresponds to an integer index mapping to a dense, continuous vector representation. Initially, these embeddings are randomly initialized but are learned and updated during training through backpropagation.
```python
vocab_size = len(word_to_int)
embedding_dim = 128
embed_layer = nn.Embedding(vocab_size, embedding_dim)
```
x??

---


#### Training the WordLSTM Model
Explanation of how to train the `WordLSTM` model using the training data. It involves creating batches, initializing the model and optimizer, and iterating over the dataset to update the model's weights.
:p How do you train the `WordLSTM` model?
??x
To train the `WordLSTM` model, you create a DataLoader for batching the input data, initialize the model and an optimizer (like Adam), and then iterate over the dataset. During each epoch, you process batches of input-output pairs to update the model's weights using backpropagation.
```python
from torch.optim import Adam

# Initialize model and optimizer
model = WordLSTM()
optimizer = Adam(model.parameters())

# Training loop
for epoch in range(num_epochs):
    for batch_xys in loader:
        x, y = map(lambda t: t.to(device), batch_xys)
        optimizer.zero_grad()
        output, _ = model(x)
        loss = criterion(output.permute(0, 2, 1), y)
        loss.backward()
        optimizer.step()
```
x??

---

---

