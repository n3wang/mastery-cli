# High-Quality Flashcards: 2A001---AI-Engineering_-Building-Applications-with-Foundation-Models-OReilly-Media-2025Chip-Huyen--_processed (Part 22)


**Starting Chapter:** Tools

---


#### Compound Mistakes and Higher Stakes
Background context: The passage discusses how agents, when performing tasks involving multiple steps or complex actions, can face significant accuracy drops due to the cumulative effect of individual mistakes. Additionally, having access to powerful tools increases both the potential impact and risk if something goes wrong.

:p How does the increase in the number of steps in a task affect an agent's overall accuracy?
??x
The increase in the number of steps reduces the overall accuracy exponentially. If each step has a 95% success rate, over 10 steps, the cumulative accuracy drops to approximately 60%, and over 100 steps, it decreases to only about 0.6%.

This can be calculated using the formula:
$$\text{Overall Accuracy} = (\text{Accuracy per Step})^{\text{Number of Steps}}$$

For example, with a step accuracy of 95% (or 0.95):
$$\text{Overall Accuracy after 10 steps} = 0.95^{10} \approx 0.60$$
$$\text{Overall Accuracy after 100 steps} = 0.95^{100} \approx 0.006$$x??

---


#### Knowledge Augmentation
Background context: Knowledge augmentation involves providing agents with additional context and information to improve their responses. This can include text, image, or SQL retrieval tools.

:p What are some potential external tools that can augment an agent’s knowledge?
??x
Potential external tools for knowledge augmentation include:
- Text retriever: Fetches relevant documents from internal databases.
- Image retriever: Serves images related to the task at hand.
- SQL executor: Runs queries on structured data sources.

Other examples include:
- Internal people search: Helps find specific individuals within an organization.
- Inventory API: Provides status updates for different products.
- Slack retrieval: Accesses chat history from internal messaging platforms.
- Email reader: Enables interaction with email systems.

x??

---


#### Capability Extension
Background context: Capability extension tools are designed to address inherent limitations of AI models, such as difficulty in performing certain tasks like arithmetic or programming. These tools can significantly enhance an agent's performance by providing necessary utilities directly.

:p What is a code interpreter and how can it be used?
??x
A code interpreter is a tool that allows agents to execute code snippets, return results, or analyze failures. This capability enables the agent to act as:
- A coding assistant.
- A data analyst.
- A research assistant capable of running experiments and reporting results.

Example usage in pseudocode:
```python
def execute_code(code):
    # Execute provided code snippet
    result = eval(code)
    return result

# Example call to function
result = execute_code("2 + 2")
print(result)  # Output: 4
```

x??

---


#### Autonomous AI Agents
Background context: Autonomous AI agents can perform complex tasks like researching potential customers, drafting emails, sending first emails, and following up with responses. However, there is a risk associated with giving AI the authority to perform potentially harmful actions.

:p What are some valid concerns related to autonomous AI systems?
??x
Valid concerns include the manipulation of financial markets, theft of copyrights, violation of privacy, reinforcement of biases, spread of misinformation and propaganda, among others. These risks highlight the importance of ensuring safety and security in AI applications.
x??

---


#### Function Calling with Models
Background context: Model providers support function calling, which allows models to use external tools for various tasks. This feature is expected to become more common in the future.

:p What does function calling enable in model usage?
??x
Function calling enables models to interact with external tools and perform a wide range of tasks, from scheduling trips to processing financial transactions. This capability enhances the model's ability to solve complex real-world problems.
x??

---


#### Planning in Foundation Model Agents
Background context: Complex tasks require planning, which involves understanding the task, considering different options, and choosing the most promising approach.

:p What is the role of planning in foundation model agents?
??x
The role of planning is to outline a roadmap for accomplishing complex tasks. Effective planning requires models to understand the task, consider multiple options, and select the best course of action.
x??

---


#### Planning as an Important Computational Problem
Background context: Planning is a well-studied computational problem that requires understanding and considering various steps to achieve a task.

:p Why is planning considered an important computational problem?
??x
Planning is considered an important computational problem because it involves breaking down complex tasks into manageable steps, evaluating different options, and selecting the most promising approach. This process is crucial for solving real-world problems effectively.
x??

---

---


#### Decoupling Planning and Execution

Planning involves generating a sequence of steps to achieve a goal, while execution entails carrying out those steps. Without proper validation, an agent might generate a long or even invalid plan that consumes resources without yielding results.

:p What is decoupling planning from execution in the context of agents?
??x
Decoupling planning and execution means first generating potential plans for how to achieve a goal, then validating these plans before executing them. This approach helps ensure that only reasonable and feasible plans are executed, saving time and resources.
For example, if an agent is tasked with finding companies without revenue but having raised at least$1 billion, it might generate a plan that first searches for all such companies (Option 1) or filters by raised capital then checks for non-revenue status (Option 2). Validating the plans using heuristics ensures more efficient execution.
```python
# Pseudocode to demonstrate plan generation and validation
def validate_plan(plan):
    # Example heuristic: eliminate plans requiring unavailable tools
    if "google_search" in plan.actions and not has_google_access():
        return False
    # Check length of the plan
    if len(plan.steps) > MAX_STEPS:
        return False
    return True

# Generate and execute a validated plan
plan = generate_plan()
if validate_plan(plan):
    execute_plan(plan)
else:
    print("Invalid or inefficient plan generated.")
```
x??

---


#### Validation Heuristics

Validation heuristics are used to ensure that plans generated by an agent are reasonable and feasible. Common heuristics include checking for the availability of required tools, ensuring plans do not exceed a certain step count, and evaluating the overall reasonableness of the plan.

:p What are validation heuristics in the context of planning?
??x
Validation heuristics are criteria or rules used to evaluate the validity and efficiency of generated plans. They help filter out invalid or inefficient plans before execution. Examples include checking for required tools (e.g., Google Search access) and ensuring the plan does not exceed a certain number of steps.

For instance, if a plan requires a Google search but your system lacks this capability, the heuristic will eliminate such a plan as it is impractical to execute.
```python
# Example validation heuristic function in pseudocode
def check_tools(plan):
    required_tools = {"google_search"}
    available_tools = get_available_tools()
    return all(tool in available_tools for tool in required_tools)

def validate_plan_length(plan, max_steps=1000):
    return len(plan.steps) <= max_steps

# Apply validation heuristics
if check_tools(plan) and validate_plan_length(plan):
    execute_plan(plan)
else:
    print("Plan not validated.")
```
x??

---


#### Multi-Agent System Components

A multi-agent system consists of several components: one for generating plans, another for validating them, and a third for executing those plans. Each component can be considered an agent in its own right, leading to complex interactions and workflows.

:p How does the structure of a multi-agent system work?
??x
In a multi-agent system, the overall task is broken down into smaller subtasks that are handled by specialized agents. There are three primary components:

1. **Plan Generation Agent**: Generates potential plans for achieving the goal.
2. **Validation Agent**: Evaluates generated plans using heuristics to ensure they are valid and efficient.
3. **Execution Agent**: Executes validated plans.

This structure allows each agent to focus on its specific task, potentially speeding up the process by generating multiple plans in parallel and evaluating them simultaneously.

For instance:
```python
# Pseudocode for multi-agent system
class PlanGenerator:
    def generate_plan(self):
        # Generate a plan based on some criteria
        pass

class Validator:
    def validate_plan(self, plan):
        # Validate the plan using heuristics
        return True  # Placeholder logic

class Executor:
    def execute_plan(self, plan):
        # Execute the validated plan
        pass

# Example workflow
generator = PlanGenerator()
validator = Validator()
executor = Executor()

plan = generator.generate_plan()
if validator.validate_plan(plan):
    executor.execute_plan(plan)
else:
    print("Plan not valid.")
```
x??

---


#### Parallel Plan Generation and Evaluation

To speed up the process, multiple plans can be generated in parallel. An evaluator then selects the most promising plan for execution. This approach introduces a trade-off between latency (time to complete) and cost (resources consumed during evaluation).

:p How does generating multiple plans in parallel improve an agent's workflow?
??x
Generating multiple plans in parallel allows for faster identification of promising plans, potentially reducing overall processing time. However, this comes at the cost of increased resource consumption since more plans are being generated simultaneously.

For example, if your system needs to find companies that have raised over $1 billion but do not generate revenue, it can generate several different strategies (plans) in parallel and evaluate them concurrently using a validator. The most promising plan is then selected for execution.
```python
# Pseudocode for parallel plan generation and evaluation
def generate_and_validate_plans(parallel_plan_count):
    plans = []
    results = []
    
    for _ in range(parallel_plan_count):
        generated_plan = PlanGenerator().generate_plan()
        validated_plan = Validator().validate_plan(generated_plan)
        
        if validated_plan:
            results.append((generated_plan, validate_plan(generated_plan)))
    
    # Select the most promising plan
    best_plan = max(results, key=lambda x: x[1])
    Executor().execute_plan(best_plan)

# Example usage
generate_and_validate_plans(5)  # Generate and evaluate 5 plans in parallel
```
x??

---

---


#### Intent Classification Mechanism
Intent classification helps agents understand the user's query to determine appropriate actions. This mechanism can be considered another agent within a multi-agent system, assisting with task decomposition and tool selection based on the intent.

:p What is the role of intent classification in an agent system?
??x
Intent classification plays a crucial role in guiding the correct course of action by categorizing user queries into predefined intents. For instance, if a query pertains to billing information, the intent classifier might classify it as 'billing inquiry', enabling the agent to retrieve relevant data or documentation.

For example:
```python
# Pseudocode for an Intent Classifier
def classify_intent(query):
    # Dummy classification logic
    if "payment" in query.lower():
        return "billing_inquiry"
    elif "password" in query.lower():
        return "password_reset"
    else:
        return "irrelevant"
```
x??

---


#### Planning Processes
Solving a task typically involves several stages: plan generation, reflection and error correction, execution, and further reflection and error correction upon receiving outcomes. These steps are essential for ensuring the goal is achieved accurately.

:p What are the main processes involved in solving a task?
??x
The main processes involve:
1. **Plan Generation**: Creating a sequence of actions to accomplish the task.
2. **Reflection and Error Correction**: Evaluating the generated plan and making adjustments if necessary.
3. **Execution**: Carrying out the planned actions.
4. **Post-Execution Reflection and Error Correction**: Assessing the outcomes and determining if the goal was met, then generating a new plan if needed.

For example:
```python
def solve_task(task):
    # Plan generation
    action_sequence = generate_plan(task)
    
    # Execution
    outcome = execute_plan(action_sequence)
    
    # Post-execution reflection
    if not is_goal_achieved(outcome):
        new_plan = correct_and_generate_new_plan(action_sequence, outcome)
        outcome = execute_plan(new_plan)
```
x??

---


#### Decomposition of Tasks
Decomposing a task involves breaking it down into manageable actions, which is crucial for effective planning. This process helps in understanding the complexity and identifying the steps needed to achieve the goal.

:p How does decomposition help in solving complex tasks?
??x
Decomposition simplifies complex tasks by breaking them down into smaller, more manageable actions. By doing so, it makes the task easier to understand and execute, reducing the cognitive load on both humans and AI systems. For example, if a user wants to automate a report generation process, decomposition might involve:
1. Collecting data.
2. Cleaning the data.
3. Processing the data.
4. Generating the report.

This breakdown allows for clear steps that can be automated or executed manually as needed.

For example:
```python
def decompose_task(task):
    actions = []
    if "collect" in task.lower():
        actions.append("Collect relevant data")
    if "clean" in task.lower():
        actions.append("Clean the collected data")
    # Add more steps as necessary
    return actions

# Example usage
actions = decompose_task("Generate a report by cleaning and processing sales data.")
print(actions)
```
x??

---

---


#### Backtracking in Search
Backtracking is a fundamental technique used to find solutions by incrementally building candidates and abandoning a candidate ("backtracking") as soon as it is determined that the candidate cannot possibly be completed to a valid solution. In search problems, if an action does not lead to a promising state, backtracking allows revisiting previous decisions.
:p Explain the concept of backtracking in the context of searching?
??x
Backtracking involves exploring potential solutions incrementally and abandoning them if they are found to be non-promising. For instance, consider a scenario where you have two actions (A and B) at a given step. If taking action A leads to an unfruitful state, backtracking allows revisiting the previous state to take alternative action B.
x??

---


#### Planning with World Knowledge
Reasoning capabilities in models like LLMs allow them to predict outcomes of actions based on their vast world knowledge. This capability enables coherent planning by incorporating predicted outcomes into the sequence of actions, potentially leading to more effective plans.
:p How can LLMs generate coherent plans?
??x
LLMs can generate coherent plans by leveraging their extensive world knowledge to predict the outcome of each action. By understanding potential states resulting from different actions, they can make informed decisions, leading to more coherent and effective planning.
x??

---


#### Agent Concept in Reinforcement Learning (RL)
Agents in RL are defined as entities that take actions in dynamic environments to maximize cumulative rewards. The primary difference between RL agents and foundation model (FM) agents lies in their planners: RL agents use an RL algorithm for training, while FM agents rely on the model itself.
:p What is a core concept in reinforcement learning?
??x
A core concept in reinforcement learning (RL) is the agent—a software entity that interacts with its environment by taking actions to maximize cumulative rewards. Agents are trained using algorithms like Q-learning or policy gradients to make optimal decisions.
x??

---


#### Plan Generation Challenges
This section highlights the complexities in generating plans due to uncertain parameters and potential hallucinations (mistaken predictions) from AI models.

:p How do uncertainties affect the planning process?
??x
Uncertainties in the planning process arise because it is often unclear what exact parameter values should be used for functions based on the available information. For example, if a user asks "What’s the average price of best-selling products?", key questions such as "How many best-selling products does the user want to look at?" or "Does the user want the best-selling products from last week, last month, or all time?" remain ambiguous.

To handle these uncertainties, AI models may need to make guesses, which can lead to hallucinations. Hallucinations include calling invalid functions or valid functions with incorrect parameters.

```python
# Example of handling parameter uncertainty
def fetch_top_products(start_date=None, end_date=None, num_products=1):
    # Logic to fetch top products based on inferred dates and number
    pass

start_date = get_time() - timedelta(days=7)  # Assuming last week is defined as the past 7 days
end_date = get_time()
plan = [
    get_time,
    fetch_top_products(start_date=start_date, end_date=end_date),
    fetch_product_info,
    generate_query,
    generate_response
]
```
x??

---


#### Planning Granularity
Explanation of planning granularity and the trade-off between detailed and high-level plans, as well as how hierarchical planning can address this issue.
:p What is planning granularity in the context of task execution?
??x
Planning granularity refers to the level of detail at which a plan is created. A higher-granularity plan provides more specific steps for executing a task, while a lower-granularity plan offers broader outlines. There's often a trade-off between the effort required to generate detailed plans versus the ease with which they can be executed.

Hierarchical planning involves creating high-level plans first and then refining them into more detailed sub-plans as needed. This approach balances the complexity of generating precise plans with the practicality of executing them.
```python
# Example of hierarchical planning in pseudocode
high_level_plan = {"quarters": ["plan_q1", "plan_q2"]}
sub_plans = {
    "plan_q1": {"months": ["plan_jan", "plan_feb", "plan_mar"]},
    "plan_q2": {"months": ["plan_apr", "plan_may", "plan_jun"]}
}
```
x??

---

---


#### Translator Role
Background context explaining the role of a translator in converting natural language plans to executable commands. It notes that translating is simpler and less prone to hallucinations compared to planning.
:p What is the translator's function?
??x
The translator’s function is to convert high-level, natural language actions into executable commands. This process is generally simpler and carries a lower risk of hallucination compared to generating complex plans directly from natural language.
x??

---


#### Complex Plans Overview
Background context explaining different types of control flows (sequential, parallel, if statement, for loop) in the context of planning. These control flows determine the order in which actions can be executed.
:p What are the different types of control flows mentioned?
??x
The text mentions four types of control flows: 
- Sequential: Task B is executed after task A is complete.
- Parallel: Tasks A and B are executed simultaneously.
- If statement: A decision-based flow where a condition determines whether to execute task B or C.
- For loop: Repeated execution of a task until a specific condition is met.

These control flows help in determining the order and logic of actions within plans.
x??

---


#### Parallel Execution Support
Background context: The ability to execute tasks simultaneously can significantly reduce latency and enhance user experience, especially when dealing with tasks that do not rely on sequential execution. For example, browsing ten websites at once is more efficient than sequentially opening them one by one.

:p Can an agent framework support parallel execution?
??x
Yes, an agent framework should be capable of supporting parallel execution to handle tasks that can run concurrently without dependencies. This feature helps in reducing the overall time taken for executing such tasks, thereby improving user experience.
For instance, if a task involves fetching data from multiple sources, these fetches could be performed simultaneously rather than sequentially.

```java
// Pseudocode example of parallel execution using Java's CompletableFuture
import java.util.concurrent.CompletableFuture;

public class ParallelTaskExecutor {
    public void executeTasks() {
        // Assume tasks are represented as functions that return a value when completed
        CompletableFuture<String> task1 = CompletableFuture.supplyAsync(() -> fetchDataFromSource1());
        CompletableFuture<String> task2 = CompletableFuture.supplyAsync(() -> fetchDataFromSource2());

        // When both tasks are complete, perform some action
        task1.thenCombine(task2, (result1, result2) -> processResults(result1, result2));
    }

    private String fetchDataFromSource1() {
        // Simulate fetching data from a source
        return "Data from Source 1";
    }

    private String fetchDataFromSource2() {
        // Simulate fetching data from another source
        return "Data from Source 2";
    }

    private void processResults(String result1, String result2) {
        // Process the results of both tasks
        System.out.println("Processing results: " + result1 + ", " + result2);
    }
}
```
x??

---


#### Reflection Mechanism in Agents
Background context: Reflection is a critical component for agents to evaluate and adjust their plans during task execution. It helps in identifying errors, understanding the feasibility of user queries, and ensuring successful task completion.

:p What is reflection, and why is it important in agent frameworks?
??x
Reflection in agent frameworks involves mechanisms where an agent evaluates its actions and decisions throughout a task process. This self-assessment can help identify errors, validate plans, and ensure that the agent stays on track to achieve its goals.
Reflection is crucial because even well-planned tasks may encounter unexpected issues or require adjustments based on the environment or user feedback.

```java
// Example of an agent generating thought-act-reflection steps
public class ReflectiveAgent {
    public void executeTask() {
        // Initial plan and action
        String act1 = "Visit website 1";
        System.out.println("Thought: Planning to visit website 1");
        System.out.println("Act: Visiting website 1");

        // Simulate an observation or feedback
        boolean success = true; // Assume the operation was successful

        // Evaluate the action based on the outcome
        if (success) {
            System.out.println("Observation: Successfully visited website 1");
            System.out.println("Thought: The plan seems feasible, continue to next step.");
        } else {
            System.out.println("Observation: Could not visit website 1");
            // Reflect and adjust the plan
            String newAct = "Try visiting a different site";
            System.out.println("Thought: Attempting a different action due to failure.");
            System.out.println("Act: Trying to visit a different site");
        }
    }
}
```
x??

---


#### Interleaving Reasoning and Action (ReAct Framework)
Background context: The ReAct framework proposes interleaving reasoning with action in an agent's workflow. This approach, where the agent reflects on its actions after each step or after a series of steps, allows for dynamic adjustments based on outcomes.

:p How does the ReAct framework enhance an agent’s task execution?
??x
The ReAct framework enhances an agent's task execution by incorporating continuous reasoning and reflection into the workflow. At each step, the agent evaluates its actions, adjusts its plans if necessary, and makes informed decisions to ensure successful task completion.
This method helps in identifying errors early, making corrections, and adapting strategies based on real-time feedback.

```java
// Example of a ReAct-like framework for an agent
public class ReactiveAgent {
    public void executeTask() {
        // Initial plan
        String initialPlan = "Gather information from source A";

        while (!isTaskComplete()) {
            System.out.println("Thought: Planning to gather info from source A");
            System.out.println("Act: Gathering info from source A");

            // Simulate action and observe the result
            boolean success = false; // Assume an initial failure

            if (success) {
                System.out.println("Observation: Successfully gathered information.");
                System.out.println("Thought: Task is on track, continue to next step.");
            } else {
                System.out.println("Observation: Failed to gather info from source A");
                // Reflect and adjust the plan
                String newPlan = "Gather info from an alternative source B";
                System.out.println("Thought: Adjusting strategy due to initial failure. New plan is gathering info from source B.");
                System.out.println("Act: Gathering info from source B");
            }
        }

        // Final reflection and completion check
        System.out.println("Reflection: Task completed successfully based on final outcome checks.");
    }

    private boolean isTaskComplete() {
        // Placeholder method to simulate task completion condition
        return true;
    }
}
```
x??

---

---


#### Tool Selection for Agents
The selection of tools is critical in task success but depends on the environment, task, and AI model used. The more tools an agent has, the more complex it becomes to use them effectively. Experimentation and analysis are necessary to determine which set of tools works best.
:p What factors should be considered when selecting tools for agents?
??x
Factors include the nature of the environment, the specific task requirements, and the AI model capabilities. More tools can enhance an agent's capability but increase complexity in their efficient use. Experimentation with different sets of tools, ablation studies to identify essential tools, and analyzing tool call distributions are useful methods.
x??

---


#### Different Tools for Different Tasks

Background context: The text highlights that different tasks require different tools and that different models have varying preferences for these tools. For example, science question answering (ScienceQA) relies more on knowledge retrieval tools compared to tabular math problem-solving (TabMWP).

:p How do different tasks influence the choice of tools?
??x
Different tasks may require specific types of tools due to their nature and complexity. ScienceQA benefits from tools that can efficiently retrieve and process scientific information, whereas TabMWP might need tools for numerical computation and data manipulation.

For example:
```java
// Pseudocode for a tool selection strategy based on task type
public class ToolSelector {
    public Tool selectTool(Task task) {
        if (task instanceof ScienceQA) {
            return new KnowledgeRetrievalTool();
        } else if (task instanceof TabMWP) {
            return new DataManipulationTool();
        }
        // Other task types and corresponding tools can be added
        return null;
    }
}
```
x??

---


#### Evaluating Agent Frameworks

Background context: The text discusses the importance of evaluating agent frameworks based on what planners and tools they support. Different frameworks might focus on different categories of tools.

:p How should one evaluate an agent framework?
??x
Evaluating an agent framework involves assessing its tool inventory, planner capabilities, and ease of extending to new tools. You need to consider whether the framework supports a wide range of tools relevant to your needs and how easily you can integrate new tools into the system.

For example:
```java
// Pseudocode for evaluating an agent framework
public class AgentFrameworkEvaluator {
    private Map<String, Tool> toolInventory;
    private Planner planner;

    public void evaluateToolSupport() {
        // Check if all required tools are present in the inventory
        boolean supportsAllTools = true;
        for (String toolName : requiredTools) {
            if (!toolInventory.containsKey(toolName)) {
                supportsAllTools = false;
                break;
            }
        }

        System.out.println("Tool Support: " + (supportsAllTools ? "Good" : "Poor"));
    }

    public void evaluatePlanner() {
        // Test planner's effectiveness in solving a task
        boolean planIsEffective = planner.plan(task).isSolvable();
        System.out.println("Planner Effectiveness: " + (planIsEffective ? "Good" : "Poor"));
    }
}
```
x??

---


#### Tool Transition

Background context: The text introduces the concept of tool transition, where an agent can learn to combine tools into more complex ones. This is useful for building progressively more powerful tools from simpler ones.

:p What is tool transition in the context of AI agents?
??x
Tool transition refers to the process by which an AI agent learns to combine and use different tools together to form more complex functionalities. This allows the agent to create new, advanced capabilities from basic tools it initially has access to.

For example:
```java
// Pseudocode for a tool transition mechanism
public class ToolTransition {
    private Map<Tool, List<Tool>> toolDependencies;

    public void learnTransition(Tool toolX, Tool toolY) {
        // Simulate learning the dependency between tool X and Y
        if (toolX.dependsOn(toolY)) {
            toolDependencies.put(toolX, Collections.singletonList(toolY));
        }
    }

    public List<Tool> getDependencyChain(Tool startTool) {
        return toolDependencies.get(startTool);
    }
}
```
x??

---


#### Planning Failures Overview
Planning failures occur when an agent fails to execute a task correctly, often due to errors in generating or following a plan. Common issues include tool use failure, invalid parameters for valid tools, and incorrect parameter values.

:p What are some common types of planning failures?
??x
Some common types of planning failures include:
1. **Invalid Tool Use**: The agent generates a plan that includes a tool not available in its inventory.
2. **Valid Tool with Invalid Parameters**: A correct tool is called but with incorrectly formatted or invalid parameters.
3. **Valid Tool with Incorrect Parameter Values**: The correct tool and valid parameters are used, but the values provided are incorrect.
4. **Goal Failure**: The agent fails to achieve the intended goal either because the plan does not solve the task correctly or it violates constraints.

For example:
```java
// Invalid Tool Use Example
Tool bing_search = new BingSearch();
Plan plan = new Plan(bing_search); // This will fail if bing_search is not in the inventory

// Valid Tool with Invalid Parameters Example
Tool lbs_to_kg = new LbsToKg();
plan.addStep(lbs_to_kg.call(100, 2)); // lbs_to_kg requires only one parameter but gets two.
```
x??

---


#### Planning Dataset Metrics for Evaluation
To evaluate planning failures, one can create a dataset where each example consists of (task, tool inventory). The agent is asked to generate multiple plans, and metrics are computed based on validity and other factors.

:p How do you measure the effectiveness of an agent's planning using metrics?
??x
Metrics include:
1. **Valid Plans**: Percentage of generated plans that are valid.
2. **Average Valid Plan Generation Attempts**: Average number of plans needed to get a valid one for each task.
3. **Tool Call Validity**: Fraction of tool calls that are valid.

Example pseudocode:
```java
public class PlanningMetrics {
    public double calculateValidPlansRate(List<Plan> plans) {
        int valid = 0;
        for (Plan p : plans) {
            if (isValid(p)) valid++;
        }
        return (double) valid / plans.size();
    }

    private boolean isValid(Plan plan) {
        // Check if all tool calls in the plan are valid
    }
}
```
x??

---

