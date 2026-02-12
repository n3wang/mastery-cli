# High-Quality Flashcards: 2A001---AI-Engineering_-Building-Applications-with-Foundation-Models-OReilly-Media-2025Chip-Huyen--_processed (Part 18)


**Starting Chapter:** Evaluate Prompt Engineering Tools

---


#### Prompt Engineering Best Practices
Background context: Prompt engineering involves refining prompts to optimize model performance, considering factors such as clarity, structure, and specificity. This practice helps in creating more effective queries that lead to better outputs.
:p What are some key best practices for prompt engineering?
??x
Key best practices for prompt engineering include:
1. **Versioning Prompts:** Systematically test different versions of the same prompt.
2. **Evaluation Metrics:** Use standardized metrics and data to evaluate prompts effectively.
3. **Model Understanding:** Experiment with various prompts to understand which works best for a given model.
4. **Tool Utilization:** Leverage tools like Open-Prompt or DSPy to automate prompt optimization.
5. **Continuous Iteration:** Regularly update and refine prompts based on performance evaluations.

Code example:
```python
# Example Python code for evaluating prompts with metrics
def evaluate_prompt(prompt, data):
    # Placeholder function for actual evaluation logic
    result = "High Performance"
    return result

print(evaluate_prompt("Which animal is faster: cats or dogs?", "Sample Data"))
```
x??

---


#### Separating Prompts from Code
Background context: This practice involves storing prompts in separate files to facilitate reusability, testing, and readability. By separating concerns, it becomes easier to manage multiple applications that might share the same prompt.

:p Why is it important to separate prompts from code?
??x
Separating prompts from code enhances maintainability and flexibility by allowing prompts to be managed independently of application logic. This separation provides several benefits:
- **Reusability**: Prompts can be shared across different applications, reducing redundancy.
- **Testing**: Code and prompts can be tested separately, making debugging easier.
- **Readability**: The code becomes cleaner, focusing on the task at hand while prompts are managed in dedicated files.
- **Collaboration**: Subject matter experts can work on prompts without distraction from coding.

Here’s an example of how to separate a prompt into its own file and reference it in your application:
```python
# prompts.py
GPT4o_ENTITY_EXTRACTION_PROMPT = "Please extract the entities from the following text:"

# application.py
from prompts import GPT4o_ENTITY_EXTRACTION_PROMPT

def query_openai(model_name, user_prompt):
    completion = client.chat.completions.create(
        model=model_name,
        messages=[
            {"role": "system", "content": GPT4o_ENTITY_EXTRACTION_PROMPT},
            {"role": "user", "content": user_prompt}
        ]
    )
```
x??

---


#### Defensive Prompt Engineering

Background context: This section discusses the importance of defensive prompt engineering as applications can be misused by both intended users and malicious attackers. It identifies three main types of prompt attacks and explains various risks associated with them.

:p What are the three main types of prompt attacks discussed in this text?
??x
The three main types of prompt attacks are:
1. Prompt extraction: Extracting the application's prompt, including the system prompt.
2. Jailbreaking and prompt injection: Getting the model to do bad things by manipulating it.
3. Information extraction: Getting the model to reveal its training data or context.

These attacks pose significant risks such as remote code execution, data leaks, social harms, misinformation, service interruptions, and brand risks.
x??

---


#### Prompt Extraction Risks

Background context: This section explains how attackers can extract prompts from applications, which can lead to unauthorized actions or misuse of the application. It provides examples like extracting sensitive data or executing malicious code.

:p How can prompt extraction pose a risk to applications?
??x
Prompt extraction poses a risk because it allows attackers to gain insights into the system's operation and potentially exploit it for malicious purposes. For example, an attacker could extract the application’s prompts to replicate the service or manipulate it into performing undesirable actions. This is analogous to knowing how a door is locked making it easier to open.

Example: If an attacker extracts the prompt used by your AI to run research experiments, they might find a way to generate malicious code that compromises your system.
x??

---

