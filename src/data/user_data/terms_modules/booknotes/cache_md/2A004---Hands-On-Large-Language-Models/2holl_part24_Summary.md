# High-Quality Flashcards: 2A004---Hands-On-Large-Language-Models_processed (Part 24)


**Starting Chapter:** Summary

---


#### Fine-Tuning BERT for Named-Entity Recognition (NER)
Background context: This section discusses fine-tuning a BERT model specifically for Named-Entity Recognition (NER), where the goal is to identify and classify named entities such as names, places, or organizations within unstructured text. The process involves using token-level classification rather than document-level classification.

:p What are the steps involved in fine-tuning a BERT model for NER?
??x
The steps involve several key components:

1. **Loading Pretrained Model and Tokenizer**: Load a pretrained BERT model and tokenizer.
2. **Tokenization**: Tokenize the dataset into input IDs, attention masks, and labels (true_predictions and true_labels).
3. **Creating Datasets**: Create PyTorch datasets for training and evaluation.
4. **Defining Training Arguments**: Define arguments such as learning rate, batch size, number of epochs, etc.
5. **Initializing Trainer**: Initialize a `Trainer` with the model, dataset, data_collator, and compute_metrics function.
6. **Training the Model**: Train the model using the `trainer.train()` method.
7. **Evaluating the Model**: Evaluate the model on the test set using `trainer.evaluate()`.
8. **Saving and Using the Model**: Save the fine-tuned model and use it in a pipeline for inference.

Code example:
```python
from transformers import BertTokenizer, BertForTokenClassification

# Load pretrained model and tokenizer
tokenizer = BertTokenizer.from_pretrained('bert-base-uncased')
model = BertForTokenClassification.from_pretrained('bert-base-uncased')

# Tokenize the dataset
tokenized = ...  # Assume tokenization has been done here

# Training arguments
training_args = TrainingArguments(
    "ner_model",
    learning_rate=2e-5,
    per_device_train_batch_size=16,
    per_device_eval_batch_size=16,
    num_train_epochs=3,
    weight_decay=0.01,
    save_strategy="epoch",
    report_to="none"
)

# Initialize Trainer
trainer = Trainer(
    model=model,
    args=training_args,
    train_dataset=tokenized["train"],
    eval_dataset=tokenized["test"],
    tokenizer=tokenizer,
    data_collator=data_collator,
    compute_metrics=compute_metrics,
)

# Train the model
trainer.train()

# Evaluate the model
results = trainer.evaluate()
print(results)
```

x??

---

#### Computing Metrics for NER
Background context: After fine-tuning a BERT model, it is essential to evaluate its performance using appropriate metrics. The `seqeval` library can be used to compute various metrics such as precision, recall, F1-score.

:p What function computes the sequence evaluation and returns an overall F1 score?
??x
The function `seqeval.compute` is used to compute sequence evaluation metrics like precision, recall, and F1-score. It takes predicted labels (`predictions`) and reference labels (`references`) as inputs and returns a dictionary with various metrics.

Code example:
```python
from seqeval.metrics import f1_score

# Example usage of seqeval.compute
results = seqeval.compute(
    predictions=true_predictions,
    references=true_labels
)
f1_score_result = results["overall_f1"]
```

x??

---

#### DataCollatorForTokenClassification vs. DataCollatorWithPadding
Background context: For fine-tuning a BERT model, using `DataCollatorForTokenClassification` is crucial because it handles token-level classification tasks differently from text padding.

:p Why should we use `DataCollatorForTokenClassification` over `DataCollatorWithPadding` in NER?
??x
We should use `DataCollatorForTokenClassification` because it is designed to work with token-level classification tasks, which are common in Named-Entity Recognition (NER). Unlike `DataCollatorWithPadding`, which pads input sequences to the same length for batch processing, `DataCollatorForTokenClassification` handles token-level labels correctly.

Code example:
```python
from transformers import DataCollatorForTokenClassification

# Example usage of DataCollatorForTokenClassification
data_collator = DataCollatorForTokenClassification(tokenizer=tokenizer)
```

x??

---

#### Fine-Tuning Arguments for NER
Background context: Fine-tuning a model involves defining and tuning various parameters such as learning rate, batch size, number of epochs, etc. These are encapsulated in `TrainingArguments`.

:p What are the key arguments defined in the `TrainingArguments` for fine-tuning BERT for NER?
??x
The key arguments defined in the `TrainingArguments` include:

- **Learning Rate (`learning_rate`)**: Controls how much to update the model parameters per batch.
- **Batch Size (`per_device_train_batch_size`, `per_device_eval_batch_size`)**: The number of samples used for each training and evaluation step.
- **Number of Epochs (`num_train_epochs`)**: The number of times the entire dataset will be passed through the model during training.
- **Weight Decay (`weight_decay`)**: A regularization term that penalizes large weights to prevent overfitting.
- **Save Strategy (`save_strategy`)**: Determines when and how often the model should be saved during training.
- **Report To (`report_to`)**: Where to log the training metrics.

Code example:
```python
training_args = TrainingArguments(
    "ner_model",
    learning_rate=2e-5,
    per_device_train_batch_size=16,
    per_device_eval_batch_size=16,
    num_train_epochs=3,
    weight_decay=0.01,
    save_strategy="epoch",
    report_to="none"
)
```

x??

---

#### Inference with Fine-Tuned NER Model
Background context: After fine-tuning, the model can be used for inference using a pipeline.

:p How do you create and use a token classification pipeline to perform inference on a text?
??x
To create and use a token classification pipeline for performing inference, follow these steps:

1. **Save the Fine-Tuned Model**: Use `trainer.save_model` to save the fine-tuned model.
2. **Initialize Pipeline**: Use the saved model in a `pipeline`.
3. **Run Inference**: Pass text through the pipeline to get predictions.

Code example:
```python
from transformers import pipeline

# Save the fine-tuned model
trainer.save_model("ner_model")

# Initialize token classification pipeline
token_classifier = pipeline(
    "token-classification",
    model="ner_model"
)

# Run inference on a sentence
input_text = "My name is Maarten."
predictions = token_classifier(input_text)
print(predictions)
```

x??

---


#### Language Modeling
Background context: The first step in creating a high-quality Large Language Model (LLM) is to pretrain it on one or more massive text datasets. During this training, the model attempts to predict the next token based on an input without labels, aiming to learn linguistic and semantic representations.

:p What is language modeling?
??x
Language modeling is the process of training a neural network model to predict the probability distribution over words in a sentence given its context. It helps the model learn patterns from large amounts of text data.
```python
# Pseudocode for simple language model training loop
for epoch in range(num_epochs):
    for batch in dataset:
        input_ids = batch['input_ids']
        labels = batch['labels']  # Usually same as input_ids, shifted by one token
        loss = model(input_ids=input_ids, labels=labels).loss
        optimizer.zero_grad()
        loss.backward()
        optimizer.step()
```
x??

---

#### Supervised Fine-Tuning (SFT)
Background context: After pretraining the base model, supervised fine-tuning is used to adapt it to follow instructions better. This involves training on labeled data where each input has an associated target output.

:p What is supervised fine-tuning?
??x
Supervised fine-tuning is a process of adapting a pretrained language model to specific tasks by fine-tuning its parameters using labeled data, often in the form of instruction-following or specific task completion.
```python
# Pseudocode for SFT training loop
for epoch in range(num_epochs):
    for batch in dataset:
        input_ids = batch['input_ids']
        labels = batch['labels']  # User inputs with desired outputs
        loss = model(input_ids=input_ids, labels=labels).loss
        optimizer.zero_grad()
        loss.backward()
        optimizer.step()
```
x??

---

#### Preference Tuning
Background context: The final step in enhancing an LLM is preference tuning. This process aligns the model's output with human preferences or AI safety standards by fine-tuning on data that reflects these preferences.

:p What is preference tuning?
??x
Preference tuning is a method of fine-tuning an LLM to better align its outputs with specific preferences or safety guidelines defined through additional training data. It involves adjusting the model parameters based on user-defined preferences.
```python
# Pseudocode for preference tuning loop
for epoch in range(num_epochs):
    for batch in dataset:
        input_ids = batch['input_ids']
        labels = batch['labels']  # Preference scores or ratings given by users
        loss = model(input_ids=input_ids, labels=labels).loss
        optimizer.zero_grad()
        loss.backward()
        optimizer.step()
```
x??

---

#### The Three LLM Training Steps: Pretraining, Supervised Fine-Tuning, and Preference Tuning
Background context: The process of creating a high-quality language model involves three main steps: pretraining to learn general language patterns, supervised fine-tuning for task-specific instruction following, and preference tuning to align outputs with human preferences or safety standards.

:p What are the three main training steps for an LLM?
??x
The three main training steps for an LLM are:
1. **Pretraining**: Training on large datasets to learn general language patterns.
2. **Supervised Fine-Tuning (SFT)**: Adapting the model to follow specific instructions by fine-tuning with labeled data.
3. **Preference Tuning**: Aligning the model's outputs with human preferences or safety standards through additional training.

Example flow:
```python
# Example of a combined workflow
pretrained_model = train_language_model(dataset)
sft_model = fine_tune_sft(pretrained_model, sft_dataset)
tuned_model = fine_tune_preference(sft_model, preference_dataset)
```
x??

---


#### Supervised Fine-Tuning (SFT)
Background context explaining that during pretraining, a model learns to predict the next word(s) in a sequence. However, this doesn't necessarily mean it will follow instructions given by users.

:p What is supervised fine-tuning (SFT)?
??x
Supervised Fine-Tuning (SFT) involves adapting a pre-trained language model to specific tasks using labeled data. While pretraining focuses on learning general language patterns, SFT allows the model to understand and execute more complex instructions provided in a structured format.

This process typically involves providing input-output pairs where the model is trained to map inputs (instructions) to outputs (responses). This helps the model learn task-specific behaviors.
x??

---

#### Pretrained Model Behavior
Background context explaining that pretraining focuses on predicting next words, whereas fine-tuning adapts the model for specific tasks.

:p How does a base or pretrained LLM behave during pretraining?
??x
During pretraining, a language model is trained to predict the next word(s) in a sequence. This process helps it learn general language patterns and understand basic linguistic structures. However, since no instructions are provided, the model will often attempt to complete questions rather than follow them.

For example:
```python
input: "What is the capital of France? "
output: "Paris"
```
The model tries to predict the next word(s) without understanding that it needs to provide a direct answer.
x??

---

#### Full Fine-Tuning Process
Background context explaining full fine-tuning involves updating all parameters using a smaller but labeled dataset. It's used for specific tasks like following instructions.

:p What is full fine-tuning?
??x
Full fine-tuning is the process of adapting a pre-trained model to perform specific tasks by updating all its parameters based on a smaller, labeled dataset. Unlike pretraining, where the model learns general language patterns without any task-specific instructions, full fine-tuning trains the model to follow given instructions.

For example:
```python
input: "What is the capital of France? "
output: "Paris"
```
The model is trained to produce a direct answer based on user input.
x??

---

#### Example Full Fine-Tuning Data
Background context explaining that full fine-tuning uses labeled data, such as queries and corresponding answers.

:p What kind of data can be used for full fine-tuning?
??x
For full fine-tuning, any labeled data where inputs (queries) have corresponding outputs (answers) can be used. This allows the model to learn task-specific behaviors and improve its performance on specific tasks.

Example dataset:
```plaintext
input: "What is the capital of France? "
output: "Paris"

input: "Translate 'hello' into French"
output: "bonjour"
```
x??

---

#### Model Behavior After Fine-Tuning
Background context explaining that after fine-tuning, the model can follow instructions and produce relevant outputs.

:p How does a fine-tuned LLM behave differently from an un-fine-tuned one?
??x
After full fine-tuning, the language model is capable of following specific instructions provided in user queries. Instead of predicting next words or creating new questions, it generates appropriate responses based on the task at hand.

Example:
```python
input: "What is the capital of France? "
output: "Paris"
```
The fine-tuned model now understands that it needs to provide a direct answer rather than completing the question.
x??

---

