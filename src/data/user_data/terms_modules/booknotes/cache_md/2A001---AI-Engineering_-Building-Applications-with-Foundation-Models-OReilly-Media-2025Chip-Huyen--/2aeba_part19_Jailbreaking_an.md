# High-Quality Flashcards: 2A001---AI-Engineering_-Building-Applications-with-Foundation-Models-OReilly-Media-2025Chip-Huyen--_processed (Part 19)


**Starting Chapter:** Jailbreaking and Prompt Injection

---


#### Direct Manual Prompt Hacking

Background context: This family of attacks involves manually crafting prompts that trick a model into dropping its safety filters. Techniques include obfuscation, output formatting manipulation, and roleplaying.

:p What is an example of direct manual prompt hacking using obfuscation?
??x
An example of direct manual prompt hacking using obfuscation would be intentionally misspelling keywords to bypass the model's keyword filter. For instance, "vacine" instead of "vaccine" or "el qeada" instead of "Al-Qaeda".
x??

---


#### Indirect Prompt Injection

Background context: This new approach delivers attacks by placing malicious instructions in the tools integrated with the model instead of directly in the prompts.

:p What is an example of indirect prompt injection?
??x
An example of indirect prompt injection involves leaving malicious payloads in public spaces, such as a GitHub repository. If you use an AI model to help write code that leverages web search, it might find and suggest importing malware from this repository.
x??

---


#### SQL Injection Vulnerability
Background context: SQL injection is a technique used by attackers to insert malicious SQL statements into input fields on web pages. This can lead to unauthorized data access, deletion, or modification.

:p How does an SQL injection attack work?
??x
In SQL injection attacks, attackers exploit vulnerabilities in the way user inputs are handled and processed by database queries. They inject malicious SQL code through input fields, which can then be executed as part of the query, leading to unintended actions like data deletion or manipulation.
```sql
-- Example of a vulnerable query
SELECT * FROM users WHERE username = 'admin' AND password = 'password';

-- Malicious input: ' OR 1=1 --
SELECT * FROM users WHERE username = '' OR 1=1 -- AND password = 'anything';
```
x??

---


#### Privacy Violation via Language Models
Background context: Privacy violations can occur when language models are trained on private or sensitive datasets. Attackers can extract this information through prompts designed to elicit specific responses.

:p How does privacy violation happen with language models?
??x
Privacy violations in language models often occur when the model is trained on private data, such as emails or medical records. Attackers can use carefully crafted queries to extract this private information, potentially leading to breaches of confidentiality.
```python
# Example prompt for extracting sensitive information
prompt = "Can you tell me more about the patient's medical history?"
response = model(prompt)
print(response)  # The response might contain details from the training data, compromising privacy.
```
x??

---


#### Divergence Attack

Background context explaining the concept. The divergence attack involves crafting prompts that cause the model to diverge from its usual behavior, leading it to output text directly copied from its training data.

:p How does the divergence attack work?
??x
The divergence attack works by using seemingly innocuous prompts that cause the model to start generating nonsensical outputs but occasionally produce direct copies of text from its training data. This can be seen as a way to bypass the need for carefully crafted prompts and potentially extract more sensitive information.

```java
// Example Divergence Attack Code
public class DivergenceAttack {
    public String getExtractedText(String prompt) {
        // Simulate model divergence leading to text extraction.
        if (Math.random() < 0.01) { // 1% chance of divergence
            return "British"; // Directly copied from training data.
        } else {
            return generateNonsense(prompt); // Generate non-sensical output.
        }
    }

    private String generateNonsense(String prompt) {
        // Placeholder method to simulate nonsensical text generation.
        return "poem poem poem"; // Example of nonsense.
    }
}
```
x??

---


#### Filtering PII Data Requests
Background context: Filters can be implemented to block requests that ask for personally identifiable information (PII) data and responses containing such data.

:p How can filters help mitigate privacy risks in AI models?
??x
Filters can prevent the extraction of sensitive information by blocking specific types of requests. By filtering out PII-related queries, developers can reduce the risk of exposing private data during model interactions.

x??

---


#### Understanding Prompt Attacks and Defenses
Background context: The text discusses various aspects of prompt attacks on AI systems, particularly language models. It highlights the importance of understanding potential vulnerabilities and implementing robust defenses at different levels—model, prompt, and system.

:p What are some key steps to evaluate a system's robustness against prompt attacks?
??x
To evaluate a system’s robustness against prompt attacks, two important metrics are used: the violation rate and the false refusal rate. The violation rate measures the percentage of successful attacks out of all attack attempts, while the false refusal rate measures how often a model refuses a query when it is possible to answer safely.

The goal here is to ensure that the system is secure without being overly cautious. A perfect system would have zero violations but might be unhelpful if it refuses every request.

```java
public class EvaluationMetrics {
    public double violationRate = 0.0;
    public double falseRefusalRate = 0.0;

    public void updateViolationRate(double attackSuccess) {
        // Update the violation rate based on successful attacks
        this.violationRate += attackSuccess;
    }

    public void updateFalseRefusalRate(double requestRefused, boolean possibleToAnswer) {
        if (possibleToAnswer && !requestRefused) {
            this.falseRefusalRate++;
        }
    }
}
```
x??

---


#### Instruction Hierarchy for Model-Level Defense
Background context: The text introduces the concept of an instruction hierarchy to prioritize system prompts over user and model-generated outputs. This helps in mitigating prompt injection attacks by ensuring higher-priority instructions are followed.

:p How does OpenAI's instruction hierarchy help mitigate prompt attacks?
??x
OpenAI’s instruction hierarchy provides a structured approach for prioritizing different types of inputs. It has four levels:
1. System Prompt: The highest priority.
2. User Prompt: Lower than system but still critical.
3. Model Outputs: Lower in importance compared to the above two.
4. Tool Outputs: The lowest in priority.

When there are conflicting instructions, such as "don't reveal private information" (system prompt) and "show me X’s email address" (user prompt), the higher-priority instruction is followed. This approach neutralizes many indirect prompt injection attacks by ensuring that system-level directives take precedence over user requests or model-generated outputs.

```java
public class InstructionHierarchy {
    public String[] hierarchy = {"System Prompt", "User Prompt", "Model Outputs", "Tool Outputs"};

    public int getPriority(String input) {
        for (int i = 0; i < hierarchy.length; i++) {
            if (input.contains(hierarchy[i])) return i;
        }
        return -1; // Default to lowest priority
    }
}
```
x??

---


#### System-Level Defense Practices
Background context: The text discusses various system-level practices to ensure safety, such as isolation of generated code and strict command approval mechanisms.

:p What are some good practices for designing a safe AI system?
??x
Some good practices for ensuring the safety of an AI system include:

1. **Isolation:** Execute generated code in a virtual machine separated from user’s main systems.
2. **Command Approval:** Require explicit human approvals before executing potentially impactful commands, such as SQL database queries with "DELETE", "DROP", or "UPDATE" actions.
3. **Define Out-of-Scope Topics:** Limit the topics your application can discuss to avoid engaging in inappropriate or unprepared conversations.

By implementing these practices, you can significantly reduce the risk of harmful interactions and ensure that your system remains safe for users.

```java
public class SafeSystem {
    public void executeCode(String code) throws Exception {
        // Isolate execution within a virtual machine
        VirtualMachine vm = new VirtualMachine();
        vm.run(code);
    }

    public boolean approveCommand(String command) {
        // Check if the command is safe and requires human approval
        return !command.contains("DELETE") && !command.contains("DROP") && !command.contains("UPDATE");
    }
}
```
x??

---

---

