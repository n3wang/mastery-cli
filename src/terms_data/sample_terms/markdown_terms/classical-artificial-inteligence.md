
## Artificial Intelligence

#### backpropagation-neural-network
A backpropagation neural network is a supervised learning approach that trains neural networks using input-output pairs, adjusting weights and biases through backpropagation when outputs are incorrect.

:p Design an application using a backpropagation neural network
??x
A backpropagation neural network is an approach to train neural networks using a supervised learning algorithm. It involves providing the neural network with input-output pairs where the correct output is already known. The network processes the input, generates an output, and compares it to the correct value. If the output is incorrect, adjustments are made to the network's weights and biases through a process called backpropagation. This process is iteratively repeated until the network can produce the desired output.
x??

#### ai-definitions
AI definitions include intelligence (ability to acquire and adapt knowledge), artificial intelligence (field creating computer systems with human-like intelligence), agent (entity that perceives and responds), rationality (optimal decision making), and logical reasoning (drawing valid conclusions).

:p Define in your own words at least one of the following: (a) intelligence, (b) artificial intelligence, (c) agent, (d) rationality, (e) logical reasoning.
??x
a. Intelligence refers to the ability of a system or organism to acquire, apply, and adapt knowledge and skills in order to perform well in various environments.
b. Artificial intelligence is the field of study that focuses on creating and implementing computer systems capable of performing tasks that typically require human intelligence.
c. An agent is an entity that perceives its environment, processes the information, and responds with appropriate actions.
d. Rationality is the quality of a system that makes optimal decisions based on its knowledge and available information.
e. Logical reasoning is the process of drawing conclusions from premises or facts, ensuring that the resulting conclusions are valid and consistent with the initial information.
x??

#### evans-analogy-program
The Evans's ANALOGY Program (EAP) is a computer-based test designed to measure verbal reasoning ability through analogy questions, often used for admissions purposes.

:p What is the Evan's ANALOGY Program?
??x
The Evan's ANALOGY Program (EAP) is a computer-based test designed to measure verbal reasoning ability through analogy questions. The test is often used for admissions purposes by universities, graduate programs, and certain professions, such as law and medicine.
x??

#### evans-analogy-extension
Extending Evans's ANALOGY program to score 200 on a standard IQ test would not make it more intelligent than humans, as IQ tests don't encompass all aspects of human intelligence like strategy formulation, memory retention, or introspective reasoning.

:p Suppose we extend Evans's ANALOGY program so that it can score 200 on a standard IQ test. Would we then have a program more intelligent than a human? Explain.
??x
The program would not be more intelligent than a human at present, as its proficiency in standard IQ tests only indicates its ability to perform well in these evaluations. These tests do not encompass the other aspects of human intelligence, such as the capacity to formulate strategy, retain information, or reach conclusions through introspection and reflection.
x??

#### ai-science-or-engineering
AI can be viewed as both a science (systematic study through scientific method) and engineering (practical application of knowledge to develop solutions).

:p Is AI a science, or is it engineering? Or neither or both? Explain.
??x
A science can be defined as the systematic acquisition of empirical knowledge through the application of the scientific method. Engineering, on the other hand, involves the practical utilization of scientific knowledge to address societal issues. Artificial Intelligence can be seen as a science in that it involves the systematic study and understanding of AI systems with the aim of advancing the knowledge domain. At the same time, it can also be viewed as an engineering discipline as it leverages this knowledge base to develop practical applications and solutions.
x??

#### rational-agent-vacuum-cleaner
A rational agent does the right thing given what it knows about the environment. The simple vacuum-cleaner agent is rational under given assumptions because it follows an optimal strategy based on its perception sequence.

:p 2.1 Let us examine the rationality of various vacuum-cleaner agent functions. a. Show that the simple vacuum-cleaner agent function described in Figure 2.3 is indeed rational under the assumptions
??x
Rational according to (section 1.1, Russell & Norvig, 2010), is the measure against an ideal performance measure. The system is rational if it does the correct approach given what it knows about the environment (Section 1.1, Russell & Norvig, 2010).

It can be seen that the agent is indeed doing the right thing, given the perception sequence it has of the environment.

If the amount of unclean pieces is known or the environment does not get dirty in the future, the rational agent could stop moving once it knows that the environment is clean, based on the number of pieces collected or after visiting all squares. This would require the agent to use memory to keep track of which areas have been cleaned or to keep count of the number of pieces collected.
x??

#### solving-problems-by-search
Problem-solving agents use atomic representations to solve problems through search, considering future actions and their desirability. They work best when solutions are fixed sequences of actions.

:p Create a problem representation for: On holiday in Romania; currently in Arad. Flight leaves tomorrow from Bucharest
??x
**Problem representation:**
- **Formulate goal**: be in Bucharest
- **Formulate problem**: states: various cities, actions: drive between cities
- **Find solution**: sequence of cities, e.g., Arad, Sibiu, Fagaras, Bucharest

**Key concepts:**
- Reflex Agents base actions on direct state-to-action mapping, cannot operate well in large environments
- Goal-based agents consider future actions and desirability of outcomes
- Problem-solving agents use atomic representations where states are considered as wholes
- Task environment solutions are fixed sequences of actions
x??

## Artificial Intelligence 2

#### rule-based-agents
Rule-based agents are AI systems that make decisions according to predetermined rules designed by domain experts, guiding decision-making in specific contexts.

:p What are rule-based agents in AI? Provide an example.
??x
Rule-based agents are AI systems that make decisions according to a predetermined set of rules. These rules, often designed by domain experts, guide the agent's decision-making process in a specific context.

**Example**: A medical diagnosis system that offers recommendations based on a set of rules derived from medical expertise and patient input.
x??

#### utility-based-agents
Utility-based agents make decisions by considering the utility or value of each possible outcome, selecting actions that maximize expected utility for the most favorable result.

:p What are utility-based agents in AI?
??x
Utility-based agents are AI systems that make decisions by considering the utility or value of each possible outcome. The agent selects the action that maximizes its expected utility, aiming for the most favorable result.

**Example**: A financial investment algorithm that selects stocks based on maximizing expected returns and minimizing risks.
x??

#### learning-agents
Learning agents improve their performance over time by learning from experience using machine learning algorithms to analyze data, identify patterns, and make better future decisions.

:p What are learning agents in AI?
??x
Learning agents are AI systems that improve their performance over time by learning from experience. These agents employ machine learning algorithms to analyze data, identify patterns, and make better decisions in the future.

**Example**: An e-commerce recommendation system that adapts its suggestions based on a user's browsing history and purchase patterns.
x??

#### goal-based-agents
Goal-based agents have specific goals they're trying to achieve and use their percept history to make decisions that help achieve their goals.

:p What are goal-based agents in AI?, provide an example.
??x
Goal-based agents are AI systems that have a specific goal they are trying to achieve. They use their percept history to make decisions that will help them achieve their goal.

**Example**: A personal assistant that helps a user achieve specific goals, such as booking a flight or scheduling a meeting.
x??

#### admissible-heuristic
An admissible heuristic never overestimates the cost of reaching the goal, always providing estimates less than or equal to the actual cost.

:p What is admissible heuristic in AI? And what algorithms use it?
??x
An admissible heuristic is a heuristic function used in heuristic search algorithms that never overestimates the cost of reaching the goal. In other words, an admissible heuristic is a function that always provides an estimate that is less than or equal to the actual cost of reaching the goal.

**Algorithms that use it**: A* search, Greedy best-first search, and Hill climbing are examples of algorithms that use admissible heuristics.
x??

#### informed-search
Informed search uses heuristic functions to guide search toward the goal, making it more efficient than uninformed search by eliminating many nodes that would otherwise be explored.

:p What is informed search in AI? And what algorithms use it? When in the real world you can use it?
??x
Informed search is a type of search algorithm that uses a heuristic function to guide the search towards the goal. Informed search algorithms are more efficient than uninformed search algorithms because they can eliminate many of the nodes that would otherwise be explored.

**Algorithms**: A* search, Greedy best-first search, and Hill climbing
**Real-world applications**: GPS Navigation, Chess, Solving a Rubik's Cube, and Solving a Sudoku Puzzle
x??

#### breadth-first-search
Breadth-first search (BFS) explores nodes level by level, starting at root and expanding all neighboring nodes before moving to the next level. Complete and optimal for uniform path costs.

:p What is breadth-first search in AI? And what algorithms use it? When in the real world you can use it?
??x
Breadth-first search (BFS) is an uninformed search algorithm that explores nodes in a tree or graph level by level. It starts at the root node and expands all neighboring nodes before moving on to the next level of neighbors. BFS is complete and optimal for problems with uniform path costs.

**Complexity**: Time: O(b^d), Space: O(b^d) where b is branching factor and d is depth
**Applications**: Finding shortest path in unweighted graphs, social network analysis, web crawlers, spreading information in networks
x??

#### a-star-search
A* search combines advantages of Dijkstra's Algorithm and Greedy Best-First Search, using heuristic functions to guide search. Complete and optimal with admissible and consistent heuristics.

:p What is A* search in AI? And what algorithms use it? When in the real world you can use it?
??x
A* search is an informed search algorithm that uses a heuristic function to guide the search towards the goal. It combines the advantages of Dijkstra's Algorithm (considering cost from start) and Greedy Best-First Search (using heuristic for remaining cost). A* search is complete and optimal when used with an admissible and consistent heuristic.

**Complexity**: Time: O(b^d), Space: O(b^d) with admissible heuristic
**Applications**: Pathfinding in maps (GPS navigation), route planning, puzzle-solving (8-puzzle, Rubik's Cube), game AI (Chess, Go)
x??

#### perceptron-model
A perceptron is a type of artificial neuron with weights and bias that takes inputs and produces single output using an activation function.

:p What is a perceptron model? | How are they useful?
??x
A perceptron is a type of artificial neuron that is used in artificial neural networks. It consists of a single neuron with a set of weights and a bias term. The perceptron takes in a set of inputs and produces a single output.

**Formula**: `output = activation_function(w1 * x1 + w2 * x2 + ... + wn * xn + b)`

Where `w1, w2, ..., wn` are weights, `x1, x2, ..., xn` are inputs, b is bias term, and activation function generates output for the next layer. The perceptron is typically used in the first layer of a neural network.
x??

#### backpropagation-phases
Backpropagation has two phases: forward pass (calculating output from input) and backward pass (calculating error and updating weights).

:p What are the two phases of backpropagation? | How are they useful?
??x
The two phases of backpropagation are the forward pass and the backward pass.

**Forward pass**: Input is fed into the network and output is calculated. Activation functions propagate from input layer to output layer using sigmoid threshold.

**Backward pass**: Error is calculated and weights are updated. Errors between observed actual value and demanded nominal value are propagated backward. Weights and bias values are modified to achieve requested value by apportioning weights and bias according to their impact on error.

**Usefulness**: Forward pass calculates network output, backward pass updates network weights for learning.
x??