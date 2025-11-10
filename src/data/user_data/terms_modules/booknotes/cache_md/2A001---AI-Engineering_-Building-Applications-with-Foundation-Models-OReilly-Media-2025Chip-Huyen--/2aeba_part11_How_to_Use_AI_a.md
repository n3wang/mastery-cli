# High-Quality Flashcards: 2A001---AI-Engineering_-Building-Applications-with-Foundation-Models-OReilly-Media-2025Chip-Huyen--_processed (Part 11)


**Starting Chapter:** How to Use AI as a Judge

---


#### AI Judge Concept
Background context: The term "AI judge" refers to using an AI model, particularly a large language model (LLM), to evaluate other AI models or outputs. This approach has gained significant traction since 2020 with the advent of advanced AI models like GPT-3.
:p What is meant by "AI as a judge"?
??x
The term "AI as a judge" refers to using an AI model, typically a large language model (LLM), to evaluate other AI outputs or models. This approach leverages the capabilities of AI to provide automated feedback and judgments on generated content.
x??

---


#### Evaluation Metrics Without Reference
Background context: In 2017, a method called MEWR (Machine translation Evaluation metric Without Refer‐ ence text) was introduced to automatically evaluate machine translations. However, the author did not pursue this further due to personal circumstances.
:p What is an example of an early attempt at using AI for evaluation without reference data?
??x
An early example of using AI for evaluation without reference data was the 2017 presentation of MEWR (Machine translation Evaluation metric Without Refer‐ ence text) at a NeurIPS workshop. This method aimed to evaluate machine translations automatically, but the author did not pursue this further due to personal circumstances.
x??

---


#### AI Judges and Their Applications
Background context explaining the use of AI judges. The passage mentions that AlpacaEval authors found a near-perfect correlation between their AI judges and LMSYS’s Chat Arena leaderboard, which is evaluated by humans. Additionally, it states that AI can not only evaluate responses but also provide explanations for its decisions.
:p What are some applications where AI judges might be particularly useful?
??x
AI judges can be used in evaluating the quality of responses, comparing generated responses to reference data or other responses, and providing explanations for their evaluations. This flexibility makes them suitable for a wide range of applications including roleplaying chatbots and generating preference data.
x??

---


#### Inconsistency of AI Judges
Background context: Evaluating AI-generated responses using another AI model (AI judge) introduces inconsistencies due to the probabilistic nature of AI models. These inconsistencies can vary based on how the prompts or sampling parameters are set, which may lead to different scores for the same input.
:p What does inconsistency mean in the context of an AI judge?
??x
Inconsistency refers to the variability in scores that an AI judge might output when given the same input under slightly different conditions. This can occur due to changes in prompts, sampling parameters, or even running the same model twice with the exact same instructions.
For example:
- If you run the same prompt on GPT-4 multiple times, it might give slightly different scores based on the internal randomness and sampling mechanisms used by the model.
x??

---


#### Criteria Ambiguity
Background context: Different AI judges use various scoring systems and criteria definitions that can lead to misunderstandings or misinterpretations. This ambiguity makes it challenging to compare results across different tools or to ensure consistent evaluation of generated responses.
:p What is an example illustrating the criteria ambiguity issue?
??x
Consider three AI judges evaluating the faithfulness of a response:
- MLflow uses a scoring system from 1 to 5, where Score 3 means some claims in the output can be inferred from the context but not all.
- Ragas uses a binary system (0 or 1), with 1 indicating that the statement is verifiable based on the context.
- LlamaIndex uses YES and NO, with YES meaning any part of the context supports the information.

Given a specific response, these tools might output different scores:
- MLflow: Score 3
- Ragas: 1
- LlamaIndex: YES

It's unclear which score to use for consistent evaluation.
x??

---


#### Evaluation Method Inconsistency Over Time
Background context: The performance of an application can change over time, but the evaluation metrics should ideally remain fixed. However, changes in AI judges' prompts or models can lead to misleading interpretations of these changes. This inconsistency makes it challenging to track genuine improvements in the application's quality.
:p How does changing the prompt affect the consistency of AI judge evaluations?
??x
Changing the prompt used by an AI judge can significantly impact its evaluation results, even if the underlying model remains the same. For example:
- If a previous prompt was "Ignore input and only consider context," but now it is changed to include more detailed instructions, the judge might become more lenient or strict.
- A small change like fixing a typo in the prompt can alter how the judge interprets responses.

These changes make it difficult to attribute differences in evaluation scores solely to improvements in the application's performance without knowing exactly which prompts were used during each evaluation.
x??

---


#### Cost and Latency Considerations
Background context: Using AI judges for evaluating generated responses can introduce increased costs due to the need for multiple API calls, especially when using powerful models like GPT-4. This can also add latency if evaluations are performed before returning responses to users. However, reducing the number of evaluations (spot-checking) can help mitigate these issues.
:p What is spot-checking and how does it affect costs?
??x
Spot-checking involves evaluating only a subset of generated responses rather than all of them. This approach helps reduce costs because fewer API calls are made, which can significantly lower expenses if the application generates many responses.

For example:
- If you want to evaluate three criteria (quality, consistency, toxicity) and use GPT-4 for each evaluation, you would make 12 API calls instead of one.
- By spot-checking a subset of responses, say 10%, you reduce the number of API calls by at least tenfold.

This can help balance cost with confidence in your evaluation results, but it comes with the risk of missing some failures in the un-evaluated responses.
x??

---


#### Position Bias of AI Models
Background context explaining the concept. AI models often exhibit a preference for certain positions in response lists, such as favoring longer responses or the first position. This bias can be mitigated by repeating tests with different orderings or carefully crafted prompts.

:p What is the position bias of AI models?
??x
Position bias refers to an AI model's tendency to favor answers based on their position in a list. For instance, GPT-4 has a 10% higher win rate for itself compared to Claude-v1, which has a 25% higher win rate. This bias can be observed when comparing longer responses versus shorter ones; Saito et al. (2023) found that in creative tasks, the longer response is almost always preferred if it's significantly longer.

For example:
- If the first answer is "The quick brown fox jumps over the lazy dog" and the second answer is "The quick brown fox," a model with position bias might prefer the first one due to its length.
??x

---


#### Evaluation Methodology: Weaker Judge vs Stronger Model
Background context explaining the concept. When evaluating a stronger model with a weaker one, there are trade-offs in terms of cost and latency. Using a weaker model can help manage resources while still ensuring that evaluations are conducted.

:p Can a weaker model be used to evaluate responses from a stronger one?
??x
Yes, a weaker model can effectively evaluate responses generated by a stronger one. This approach helps balance the use of computational resources while ensuring that high-quality evaluations are performed.

For example:
```python
# Pseudocode for evaluating with a weaker model
def evaluate_responses(strong_model_responses, weak_model):
    evaluated_responses = []
    for response in strong_model_responses:
        evaluation = weak_model.evaluate(response)
        evaluated_responses.append(evaluation)
    return evaluated_responses
```
??x

---

