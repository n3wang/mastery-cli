# High-Quality Flashcards: 2A004---Hands-On-Large-Language-Models_processed (Part 23)


**Starting Chapter:** Few-Shot Classification. SetFit Efficient Fine-Tuning with Few Training Examples

---


#### Few-shot Classification
Background context explaining few-shot classification, which is a technique within supervised learning where you have limited labeled data per class. This method allows training a model with only a few high-quality labeled examples for each category.

:p What is few-shot classification?
??x
Few-shot classification refers to a scenario in machine learning where the number of labeled samples available for training a classifier is significantly small, often just a handful per class. The goal is to efficiently leverage these limited labels to learn a model that can classify unseen data accurately.
x??

---
#### SetFit Framework
Background context explaining the role of SetFit as an efficient framework for few-shot text classification. It builds upon SentenceTransformer architecture and uses contrastive learning to generate high-quality textual representations.

:p What is the purpose of the SetFit framework?
??x
The primary goal of the SetFit framework is to perform few-shot text classification efficiently by using a small number of labeled examples. It leverages pre-trained embedding models like SentenceTransformers, fine-tuning them through contrastive learning to improve performance on classification tasks with limited data.
x??

---
#### Sampling Training Data
Background context explaining how SetFit generates training data by creating positive and negative pairs from in-class and out-class sentences.

:p How does SetFit generate the necessary training data?
??x
SetFit generates the required training data by sampling sentence pairs: 
- Positive (similar) pairs are created within a class.
- Negative (dissimilar) pairs are generated across different classes.
For example, if there are 16 sentences in a class, positive pairs can be calculated as \( \frac{16 * (16 - 1)}{2} = 120 \). Negative pairs are created by selecting sentences from other classes.

Example:
```python
# Pseudocode for generating sentence pairs
def generate_sentence_pairs(sentences_in_class, sentences_out_class):
    positive_pairs = []
    negative_pairs = []

    # Generate positive pairs within the same class
    for i in range(len(sentences_in_class)):
        for j in range(i + 1, len(sentences_in_class)):
            positive_pairs.append((sentences_in_class[i], sentences_in_class[j]))

    # Generate negative pairs across different classes
    for sentence_in_class in sentences_in_class:
        for sentence_out_class in sentences_out_class:
            negative_pairs.append((sentence_in_class, sentence_out_class))
    
    return positive_pairs, negative_pairs

# Example usage
sentences_programming = ["Learn Python", "Java basics"]
sentences_pets = ["Dog training tips", "Cat care"]

positive_pairs, negative_pairs = generate_sentence_pairs(sentences_programming, sentences_pets)
```
x??

---
#### Fine-tuning Embeddings
Background context explaining the fine-tuning process using contrastive learning in SetFit. It involves adapting a pre-trained SentenceTransformer model to better fit the specific classification task.

:p What is involved in fine-tuning embeddings with SetFit?
??x
Fine-tuning embeddings in SetFit involves:
1. **Using Contrastive Learning**: The model learns embeddings by optimizing the similarity of positive pairs and the dissimilarity of negative pairs.
2. **Adapting Pre-trained Models**: A pre-trained SentenceTransformer model is fine-tuned using the generated sentence pairs to improve its performance on the specific classification task.

Example:
```python
# Pseudocode for fine-tuning with contrastive learning
def fine_tune_embedding_model(model, positive_pairs, negative_pairs):
    # Train the embedding model with contrastive loss
    for pair in positive_pairs:
        model.encode(pair[0])
        model.encode(pair[1])
        # Update embeddings based on contrastive loss

# Example usage
model = SentenceTransformer('distilbert-base-nli-mean-tokens')
positive_pairs, negative_pairs = generate_sentence_pairs(sentences_programming, sentences_pets)
fine_tune_embedding_model(model, positive_pairs, negative_pairs)
```
x??

---
#### Training a Classifier
Background context explaining the final step of using fine-tuned embeddings to train a classifier.

:p What is involved in training a classifier with SetFit?
??x
Training a classifier with SetFit involves:
1. **Generating Embeddings**: Using the fine-tuned embedding model to convert input sentences into vector representations.
2. **Training Classifier**: Creating and training a classification head on top of the embedding model using these embeddings.

Example:
```python
# Pseudocode for training a classifier
from sklearn.linear_model import LogisticRegression

def train_classifier(embedding_model, sentences):
    # Generate embeddings for all sentences
    embeddings = [embedding_model.encode(sentence) for sentence in sentences]
    
    # Train a classifier on the generated embeddings
    classifier = LogisticRegression()
    classifier.fit(embeddings, labels)

# Example usage
classifier = train_classifier(model, all_sentences)
```
x??

---
#### SetFit Pipeline Overview
Background context explaining how the three steps of SetFit work together to perform classification efficiently.

:p What is the overall pipeline of SetFit?
??x
The overall pipeline of SetFit consists of:
1. **Sampling Training Data**: Generating positive and negative sentence pairs.
2. **Fine-tuning Embeddings**: Using contrastive learning to adapt a pre-trained SentenceTransformer model.
3. **Training Classifier**: Creating and training a classifier on top of the fine-tuned embedding model.

Example:
```python
# Pseudocode for SetFit pipeline
def set_fit_pipeline(sentences, labels):
    positive_pairs, negative_pairs = generate_sentence_pairs(sentences)
    model = SentenceTransformer('distilbert-base-nli-mean-tokens')
    fine_tune_embedding_model(model, positive_pairs, negative_pairs)
    classifier = train_classifier(model, sentences, labels)

# Example usage
set_fit_pipeline(all_sentences, all_labels)
```
x??

---


#### Two-Step Pretraining and Fine-Tuning Process
Background context: The two-step process involves pretraining a model (often using masked language modeling) and then fine-tuning it for a specific task. This method is widely used but has limitations when dealing with domain-specific data, as the pretrained models might not be well-tuned to the specific terminology or concepts of the domain.
:p What are the two main steps involved in the traditional approach to pretraining and fine-tuning?
??x
The two main steps are first pretraining a model (often using masked language modeling) and then fine-tuning it for a particular task. This process is commonly used but can be limited when dealing with domain-specific data.
x??

---

#### Domain-Specific Pretraining
Background context: Domain-specific pretrained models, such as BioBERT for the medical domain or BioCDBERT for clinical drug discovery, are created by continuing pretraining on relevant datasets to better adapt the model to specific terminologies and contexts.
:p How can we improve a general BERT model's performance for a specific domain?
??x
We can continue pretraining the already pretrained BERT model using data from the specific domain. This updates the subword representations to be more tuned toward words that are relevant in the domain, thus improving its performance on tasks related to that domain.
x??

---

#### Continued Pretraining with Masked Language Modeling
Background context: To improve a model's adaptability to specific domains or use cases, continued pretraining can be performed using masked language modeling (MLM) with data from the target domain. This helps in updating subword representations and better aligning them with the vocabulary of the specific task.
:p What is the purpose of continuing pretraining an already pretrained BERT model?
??x
The purpose is to update the subword representations to be more tuned toward words that are relevant in the specific domain, thereby improving the model's performance on tasks related to that domain. This can be done using masked language modeling with data from the target domain.
x??

---

#### Tokenization and Data Preparation for MLM
Background context: For continued pretraining, tokenizing the raw sentences is necessary. The dataset needs to be prepared by removing labels as it is not a supervised task anymore. We use tokenizers from the Hugging Face library to handle this process efficiently.
:p How do you prepare data for masked language modeling in BERT?
??x
First, we load the tokenizer and model using `AutoTokenizer` and `AutoModelForMaskedLM`. Then, we tokenize the raw sentences by removing labels and preparing them for MLM. Here is an example:
```python
from transformers import AutoTokenizer, AutoModelForMaskedLM

model = AutoModelForMaskedLM.from_pretrained("bert-base-cased")
tokenizer = AutoTokenizer.from_pretrained("bert-base-cased")

def preprocess_function(examples):
    return tokenizer(examples["text"], truncation=True)

tokenized_train = train_data.map(preprocess_function, batched=True)
tokenized_train = tokenized_train.remove_columns("label")

tokenized_test = test_data.map(preprocess_function, batched=True)
tokenized_test = tokenized_test.remove_columns("label")
```
x??

---

#### DataCollator for Masking Tokens
Background context: A `DataCollator` is used to mask tokens during the MLM process. Two common methods are token masking and whole-word masking. Token masking randomly masks 15% of the tokens, while whole-word masking ensures that entire words are masked.
:p What is a DataCollator used for in BERT's MLM?
??x
A `DataCollator` is used to mask tokens during the MLM process. It prepares the input data by masking certain tokens according to specific strategies. For this example, we use token masking with `DataCollatorForLanguageModeling`. Here is how it can be set up:
```python
from transformers import DataCollatorForLanguageModeling

data_collator = DataCollatorForLanguageModeling(
    tokenizer=tokenizer,
    mlm=True,
    mlm_probability=0.15
)
```
x??

---

#### Training Arguments for MLM Task
Background context: When training a model using masked language modeling, certain parameters need to be set in the `TrainingArguments`. These include the number of epochs, learning rate, batch size, and other optimization settings.
:p What are the key parameters set in `TrainingArguments` for an MLM task?
??x
Key parameters in `TrainingArguments` for an MLM task include:
- Number of training epochs: The model will be trained for a specified number of epochs to ensure it learns effectively from the data.
- Learning rate: This controls how much the model is adjusted with each batch during training.
- Batch size: Determines how many samples are processed before the model's internal parameters are updated.
- Weight decay: A regularization parameter that helps in preventing overfitting.

Here is an example of setting these arguments:
```python
from transformers import TrainingArguments

training_args = TrainingArguments(
    "model",
    learning_rate=2e-5,
    per_device_train_batch_size=16,
    per_device_eval_batch_size=16,
    num_train_epochs=10,
    weight_decay=0.01,
    save_strategy="epoch",
    report_to="none"
)
```
x??

---

#### Saving and Loading Pretrained Tokenizer
Background context: After preparing the model for MLM, it is essential to save the pretrained tokenizer as it will not be updated during training.
:p How do you save a pretrained tokenizer in Hugging Face's transformers library?
??x
You can save the pretrained tokenizer using the `save_pretrained` method. This saves the tokenizer configuration and vocabulary so that it can be reloaded later without needing to re-download the model weights.

Here is an example:
```python
# Save pre-trained tokenizer
tokenizer.save_pretrained("mlm")
```
x??

---

#### Fine-Tuning After Continued Pretraining
Background context: After continuing pretraining, the model should be fine-tuned on a specific task. This involves running tasks like masked language modeling to ensure the model has learned from its continued training.
:p How do you evaluate the performance of a model after continued pretraining?
??x
To evaluate the performance, you can run some masking tasks using the fine-tuned model. For example, by loading the pretrained model and using it to predict which word would replace the `[MASK]` in a sentence.

Here is an example:
```python
from transformers import pipeline

# Load and create predictions
mask_filler = pipeline("fill-mask", model="bert-base-cased")
preds = mask_filler("What a horrible [MASK].")

# Print results
for pred in preds:
    print(f">>> {pred['sequence']}")
```
The output might include various possible completions, such as "idea," "dream," "thing," or "day."
x??

---


#### Fine-Tuning Model for Classification

Background context: The provided text discusses fine-tuning a pretrained BERT model on specific classification tasks, such as predicting movie reviews or named-entity recognition (NER). The focus is on leveraging the existing pretraining to adapt the model to new tasks.

:p What is the purpose of fine-tuning a BERT model for classification?
??x
The purpose is to adapt a pretrained BERT model to perform well on specific classification tasks, such as movie reviews or named entities. This involves retraining the model using task-specific data to optimize its performance on these new tasks.
x??

---

#### Predicting Movie Reviews

Background context: The text demonstrates how to fine-tune a BERT model for predicting movie reviews by filling in masked words and observing the bias towards the training data.

:p What did the example predict when fine-tuning the BERT model?
??x
The example predicted sentences like "What a horrible movie," "What a horrible film," "What a horrible mess," and "What a horrible comedy," showing that the model is biased towards its training data.
x??

---

#### Fine-Tuning for Named-Entity Recognition (NER)

Background context: The text explains how to fine-tune a BERT model specifically for NER, which involves classifying individual tokens or words rather than entire documents. This is useful for tasks like de-identification and anonymization.

:p What does NER stand for, and what are its applications?
??x
NER stands for Named-Entity Recognition. Its applications include identifying entities such as people, locations, organizations, dates, etc., in text. These can be useful in tasks like de-identification or anonymization where sensitive data needs to be handled.
x??

---

#### Preprocessing for NER

Background context: The text mentions that fine-tuning a BERT model for NER requires preprocessing the data at a token level rather than document level, which is different from how it was done in previous examples.

:p How does the preprocessing differ when fine-tuning BERT for NER compared to other tasks?
??x
In fine-tuning BERT for NER, the preprocessing involves handling individual tokens or words instead of entire documents. This means each token needs to be classified individually, focusing on detecting named entities such as people and locations.
x??

---

#### Token-Level Classification

Background context: The text emphasizes that in NER tasks, the model makes predictions at a token level rather than aggregating embeddings for entire sentences.

:p What is unique about token-level classification in BERT?
??x
Token-level classification in BERT involves making predictions on individual tokens instead of relying on aggregated or pooled token embeddings. This approach focuses on classifying each word or subword unit, which is crucial for tasks like NER where specific entities need to be identified.
x??

---

#### Fine-Tuning Process for NER

Background context: The text outlines the process of fine-tuning a BERT model for NER, highlighting the differences in how data is processed and classified compared to previous classification tasks.

:p What steps are involved in fine-tuning a BERT model for NER?
??x
The steps involve loading the pretrained BERT model, specifying the number of labels (e.g., 2 for binary classification), and using a tokenizer from the same pretraining. The data is then processed to classify individual tokens, focusing on named entities such as people or locations.
x??

---

#### Fine-Tuning with Named-Entities

Background context: The text describes the fine-tuning process where BERT is adapted to recognize specific named entities in the text.

:p How does the fine-tuned BERT model handle named entities during classification?
??x
The fine-tuned BERT model classifies individual tokens to identify and label named entities, such as people or locations. This allows for accurate detection of these entities within the text.
x??

---

