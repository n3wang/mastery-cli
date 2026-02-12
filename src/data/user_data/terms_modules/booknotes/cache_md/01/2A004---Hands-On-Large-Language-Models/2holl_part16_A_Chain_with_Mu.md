# High-Quality Flashcards: 2A004---Hands-On-Large-Language-Models_processed (Part 16)


**Starting Chapter:** A Chain with Multiple Prompts

---


#### Breaking Complex Prompts into Subtasks
Background context: In advanced text generation, sometimes a single complex prompt is required to generate detailed outputs. However, handling such complexity can be challenging for Language Models (LMs). To address this, we can break down the task into smaller subtasks and handle them sequentially using multiple prompts. Each step provides intermediate outputs that are fed into the next step.

:p How can you break a complex prompt into simpler tasks?
??x
By breaking down the complex task into manageable subtasks, each requiring a specific piece of information or a particular output. This approach ensures that the LLM handles smaller and more focused prompts, making it easier to generate accurate and detailed responses.
??x
The answer with detailed explanations:
Breaking a complex prompt into simpler tasks involves defining multiple steps or sub-tasks. Each step focuses on generating one aspect of the final output. For instance, in generating a story, you might first create a title, then describe the main character, and finally summarize the story.

Here’s an example using LangChain in Python:

```python
from langchain import LLMChain, PromptTemplate

# Define the template for the title prompt
template_title = """<s><|user|> Create a title for a story about {summary}. Only return the title.<|end|> <|assistant|>"""
title_prompt = PromptTemplate(template=template_title, input_variables=['summary'])
title_chain = LLMChain(llm=llm, prompt=title_prompt, output_key='title')

# Define the template for the character description
template_character = """<s><|user|> Describe the main character of a story about {summary} with the title {title}. Use only two sentences.<|end|> <|assistant|>"""
character_prompt = PromptTemplate(template=template_character, input_variables=['summary', 'title'])
character_chain = LLMChain(llm=llm, prompt=character_prompt, output_key='character')

# Define the template for the story summary
template_story = """<s><|user|> Create a story about {summary} with the title {title}. The main character is: {character}. Only return the story and it cannot be longer than one paragraph. <|end|> <|assistant|>"""
story_prompt = PromptTemplate(template=template_story, input_variables=['summary', 'title', 'character'])
story_chain = LLMChain(llm=llm, prompt=story_prompt, output_key='story')

# Combine all chains
full_chain = title_chain | character_chain | story_chain

# Invoke the full chain with a sample summary
result = full_chain.invoke({"summary": "a girl that lost her mother"})
print(result)
```

In this example:
- The `title` prompt generates a title for the story.
- The `character` prompt uses both the summary and the generated title to describe the main character.
- The `story` prompt combines all elements (summary, title, and character) to generate the full story.

This approach ensures that each step is handled by the LLM with smaller, more focused prompts, leading to better quality outputs.
x??

---
#### Combining Chains for Sequential Prompts
Background context: After defining individual chains for generating different components of a complex task (like a story), these chains can be combined into a single chain using the `|` operator. This allows sequential execution where each output serves as input for the next step.

:p How do you combine multiple LLM chains to form a full chain for text generation?
??x
By using the `|` operator, you can sequentially execute multiple LLM chains. Each chain's output is passed as input to the next chain in the sequence.
??x
The answer with detailed explanations:
To combine multiple LLM chains into a single chain that handles sequential execution, use the `|` operator provided by LangChain.

Here’s how it works:

```python
from langchain import LLMChain

# Define and create each individual chain
title = LLMChain(llm=llm, prompt=title_prompt, output_key='title')
character = LLMChain(llm=llm, prompt=character_prompt, output_key='character')
story = LLMChain(llm=llm, prompt=story_prompt, output_key='story')

# Combine the chains
full_chain = title | character | story

# Invoke the full chain with a sample summary
result = full_chain.invoke({"summary": "a girl that lost her mother"})
print(result)
```

In this example:
- `title`, `character`, and `story` are individual LLM chains.
- The `|` operator links these chains, ensuring that each step's output is passed to the next chain as input.

This setup allows for a structured workflow where the complexity of generating multiple components is managed by breaking down the task into smaller, manageable steps. Each step builds upon the previous one, ultimately producing a complete and coherent final output.
x??

---
#### Using LangChain Templates in Python
Background context: LangChain provides a framework to create and manage chains for text generation tasks. It allows defining prompts with placeholders (like `{summary}`) that can be dynamically filled during the execution of the chain.

:p How do you define and use templates in LangChain?
??x
By defining `PromptTemplate` objects that contain placeholder variables, which can be dynamically replaced with actual values during the execution of the LLM chain.
??x
The answer with detailed explanations:
In LangChain, you define prompts using `PromptTemplate`. These templates include placeholders (like `{summary}`) that are later filled with specific input values.

Here’s how to use templates:

```python
from langchain import PromptTemplate

# Define a template for the title prompt
template_title = """<s><|user|> Create a title for a story about {summary}. Only return the title.<|end|> <|assistant|>"""
title_prompt = PromptTemplate(template=template_title, input_variables=['summary'])
print(title_prompt.format(summary="a girl that lost her mother"))

# Define a template for the character description
template_character = """<s><|user|> Describe the main character of a story about {summary} with the title {title}. Use only two sentences.<|end|> <|assistant|>"""
character_prompt = PromptTemplate(template=template_character, input_variables=['summary', 'title'])
print(character_prompt.format(summary="a girl that lost her mother", title="In Loving Memory: A Journey Through Grief"))

# Define a template for the story summary
template_story = """<s><|user|> Create a story about {summary} with the title {title}. The main character is: {character}. Only return the story and it cannot be longer than one paragraph. <|end|> <|assistant|>"""
story_prompt = PromptTemplate(template=template_story, input_variables=['summary', 'title', 'character'])
print(story_prompt.format(summary="a girl that lost her mother", title="In Loving Memory: A Journey Through Grief", character="The protagonist, Emily, is a resilient young girl who struggles to cope with her overwhelming grief after losing her beloved and caring mother at an early age."))
```

These templates allow you to define the structure of your prompts with placeholders that can be dynamically replaced during execution.

For example:
- The `title` prompt generates a title based on the provided summary.
- The `character` prompt uses both the summary and the generated title to describe the main character.
- The `story` prompt combines all elements (summary, title, and character) to generate the full story.

This approach ensures that each step is handled by the LLM with smaller, more focused prompts, leading to better quality outputs.
x??

---


#### Conversation Buffer Window Memory
Background context: In scenarios where maintaining a full conversation history might exceed token limits, using a windowed buffer for memory can be an effective solution. This technique retains only the last k conversations to manage the context size more efficiently. The `ConversationBufferWindowMemory` class from LangChain is used to implement this functionality.
:p How does the Conversation Buffer Window Memory work in maintaining conversation history?
??x
The Conversation Buffer Window Memory works by retaining only a fixed number (k) of recent conversations, effectively reducing the input prompt's token size and avoiding overflow issues. This method ensures that the most relevant context is available while minimizing memory usage.

```python
from langchain.memory import ConversationBufferWindowMemory

# Retain only the last 2 conversations in memory
memory = ConversationBufferWindowMemory(k=2, memory_key="chat_history")
```
x??

---
#### Chain Integration with Memory and LLM
Background context: Integrating a language model (LLM) chain with conversation buffer window memory allows for maintaining a relevant context within the token limit. This integration ensures that the LLM can recall recent interactions without needing to store the entire history, which is crucial in real-time applications.
:p How does one integrate an LLM chain with Conversation Buffer Window Memory?
??x
To integrate an LLM chain with Conversation Buffer Window Memory, you first import and configure the memory class. Then, you create an `LLMChain` object that includes this memory to ensure the model can recall recent interactions efficiently.

```python
from langchain.memory import ConversationBufferWindowMemory
from langchain.chains import LLMChain

# Retain only the last 2 conversations in memory
memory = ConversationBufferWindowMemory(k=2, memory_key="chat_history")

# Chain the LLM, prompt, and memory together
llm_chain = LLMChain(
    prompt=prompt,
    llm=llm,
    memory=memory
)
```
x??

---
#### Example Sequence of Questions with Memory Retention
Background context: Demonstrating how the Conversation Buffer Window Memory retains only recent interactions while forgetting older ones is crucial for understanding its functionality. This example shows maintaining a relevant conversation history without exceeding token limits.
:p What happens when we invoke the LLM chain with a sequence of questions?
??x
When invoking the LLM chain with a sequence of questions, the `ConversationBufferWindowMemory` retains only the last two interactions, effectively managing the context size. This ensures that the model can recall recent interactions while discarding older ones.

```python
# Ask two questions and generate two conversations in its memory
llm_chain.predict(input_prompt="Hi. My name is Maarten and I am 33 years old. What is 1 + 1?")
llm_chain.predict(input_prompt="What is 3 + 3?")

# Check whether it knows the name we gave it
llm_chain.invoke({"input_prompt": "What is my name?"})
```
Output:
```python
{'input_prompt': 'What is my name?', 
'chat_history': "Human: Hi. My name is Maarten and I am 33 years old. What is 1 + 1? AI: Hello Maarten. It's nice to meet you. Regarding your question, 1 + 1 equals 2. If you have any other questions or need further assistance, feel free to ask.", 
'text': 'Your name is Maarten, as mentioned at the beginning of our conversation. Is there anything else you would like to know or discuss?' }
```
x??

---
#### Age Information Retention with Memory
Background context: To test whether the LLM can remember specific information provided in earlier interactions (like age), we need to ensure that recent memories are retained while older ones, such as the first interaction, are forgotten.
:p Does the LLM retain the age information given in the initial interaction?
??x
The LLM does not retain the age information given in the initial interaction because it only retains the last k (in this case, 2) conversations. Therefore, when checking for the age using a new prompt, the model does not have access to the previous age information.

```python
# Check whether it knows the age we gave it
llm_chain.invoke({"input_prompt": "What is my age?"})
```
Output:
```python
{'input_prompt': 'What is my age?', 
'chat_history': "Human: What is 3 + 3? AI: Hello again. 3 + 3 equals 6. If there's anything else I can help you with, just let me know.", 
'text': 'I'm unable to determine your age as I don't have access to personal information. Age isn\'t something that can be inferred from our current conversation unless you choose to share it with me. How else may I assist you today?' }
```
x??

---


#### Conversation Summary Memory Concept
Background context: The traditional methods of conversation history management, such as `ConversationBufferMemory`, have limitations like increasing chat size and token limits. To address these issues, an alternative method called `ConversationSummaryMemory` is introduced. This approach involves using a separate LLM to summarize the entire conversation history into key points before processing user prompts.
:p What is ConversationSummaryMemory used for?
??x
ConversationSummaryMemory is used to manage conversation history by summarizing it instead of retaining all messages, thereby reducing token usage and improving efficiency. This method ensures that only essential information is retained in memory while allowing the LLM to have a comprehensive understanding of past interactions through summaries.
x??

---
#### Summarization Template Preparation
Background context: To implement ConversationSummaryMemory, a template needs to be prepared for summarizing the conversation history. The template will guide how the summary should be generated by providing structured input and output formats.

:p How do you prepare a summarization prompt template in LangChain?
??x
To prepare a summarization prompt template in LangChain, you define a string that includes placeholders for new conversation lines and current summaries. Here is an example of such a template:

```python
summary_prompt_template = """<s><|user|>Summarize the conversations and update with the new lines. Current summary: {summary} new lines of conversation: {new_lines} New summary:<|end|> <|assistant|>"""
```

This template uses placeholders `{summary}` for existing summaries and `{new_lines}` for new conversation inputs, ensuring that the LLM can integrate both into a concise summary.

```python
summary_prompt = PromptTemplate(
    input_variables=['new_lines', 'summary'],
    template=summary_prompt_template
)
```
x??

---
#### Implementing ConversationSummaryMemory in LangChain
Background context: After preparing the summarization prompt, you need to integrate it with `ConversationSummaryMemory` by specifying the LLM and other parameters. This allows for efficient handling of conversation history summaries while maintaining interaction speed.

:p How do you use ConversationSummaryMemory in a chain setup within LangChain?
??x
To use ConversationSummaryMemory in LangChain, you first define the type of memory to be used:

```python
from langchain.memory import ConversationSummaryMemory

memory = ConversationSummaryMemory(
    llm=llm,
    memory_key="chat_history",
    prompt=summary_prompt
)
```

Then, you chain this memory with your LLM and prompt to create a cohesive system. Here is how the entire setup looks:

```python
from langchain.chains import LLMChain

# Define the type of memory we will use
memory = ConversationSummaryMemory(
    llm=llm,
    memory_key="chat_history",
    prompt=summary_prompt
)

# Chain the LLM, prompt, and memory together
llm_chain = LLMChain(
    prompt=prompt,
    llm=llm,
    memory=memory
)
```

This configuration ensures that each interaction is summarized effectively before being passed to the LLM for processing.

x??

---
#### Testing ConversationSummaryMemory Functionality
Background context: After setting up `ConversationSummaryMemory`, you can test its functionality by creating and continuing conversations. The summary updates after each new input, providing a concise overview of previous interactions.

:p How do you test the summarization capabilities using `ConversationSummaryMemory`?
??x
To test the summarization capabilities of `ConversationSummaryMemory`, you generate a short conversation and observe how the summary evolves with each interaction:

```python
# Generate a conversation and ask for the name
llm_chain.invoke({"input_prompt": "Hi. My name is Maarten. What is 1 + 1?"})

# Continue the conversation
llm_chain.invoke({"input_prompt": "What is my name?"})
```

The response from `llm_chain` includes a summary of the conversation up to that point:

```python
{'input_prompt': 'What is my name?',
 'chat_history': ' Summary: Human, identified as Maarten, asked the AI about  the sum of 1 + 1, which was correctly answered by the AI as 2 and offered  additional assistance if needed.',
 'text': ' Your name in this context was referred to as "Maarten". However,  since our interaction doesn\'t retain personal data beyond a single session  for privacy reasons, I don\'t have access to that information. How can I  assist you further today?'}
```

You can see the summary updates with each new input, providing a concise overview of previous interactions.

x??

---
#### Accessing Recent Summary
Background context: The recent summary generated by `ConversationSummaryMemory` is stored in the memory variable. This allows for quick access to the current state of the conversation history.

:p How do you check the most recent summary using `ConversationSummaryMemory`?
??x
To check the most recent summary, you can directly access the `chat_history` attribute from the memory variable:

```python
memory.load_memory_variables({})
```

This will return a dictionary containing the current state of the conversation history as summarized by the LLM. Here is an example output:

```python
{'chat_history': ' Maarten, identified in this conversation, initially asked  about the sum of 1+1 which resulted in an answer from the AI being 2. Subse- quently, he sought clarification on his name but the AI informed him that no  personal data is retained beyond a single session due to privacy reasons. The  AI then offered further assistance if required. Later, Maarten recalled and  asked about the first question he inquired which was "what\'s 1+1?"'}
```

This output provides a concise summary of all interactions up to the current point.

x??

---

