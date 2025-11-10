# High-Quality Flashcards: 2A005---Learn-Generative-AI-with-PyTorch-Manning-2024-Mark-Liu--_processed (Part 37)


**Starting Chapter:** 16.2.2 Using the OpenAI API in LangChain

---


#### Need for LangChain Library
Background context: The objective is to build a zero-shot know-it-all agent that can generate content, retrieve real-time information, and answer factual questions without explicit instructions. This requires an agent that can intelligently decide which tools to use based on the task at hand.

:p Why is LangChain suitable for building such an agent?
??x
LangChain is suitable because it provides a modular architecture that allows easy integration of different components like LLMs, APIs (e.g., Wolfram Alpha and Wikipedia), and other tools. This enables the agent to leverage the strengths of various models and applications to answer questions effectively.

x??

---


#### Example with LangChain for Factual Question
Background context: Even advanced LLMs like GPT-4 struggle to provide real-time information or predictions about future events. For instance, querying who won the Best Actor Award in the 2024 Academy Awards would yield an inability to provide accurate data due to its nature.

:p Why did GPT-4 fail to answer the query about the 2024 Academy Awards?
??x
GPT-4 failed because it cannot access real-time information or make predictions about future events. Its training data does not include current events beyond a certain date, so it lacks the ability to provide accurate responses for recent or upcoming events.

x??

---


#### Using LangChain to Invoke OpenAI API
Background context: The langchain-openai library allows you to use OpenAI GPTs with minimal prompt engineering. You only need to explain what you want the LLM to do in plain English.

:p How can we use the `langchain_openai` library to correct grammar errors in text?
??x
To correct grammar errors, you can follow these steps:
1. Import the necessary class from the langchain_openai library.
2. Initialize an instance of the OpenAI class with your API key.
3. Provide a clear and straightforward prompt explaining what needs to be done.

Example code:

```python
from langchain_openai import OpenAI

# Initialize the OpenAI model with your API key
llm = OpenAI(openai_api_key=openai_api_key)

# Define the prompt that explains the task in plain English
prompt = """
Correct the grammar errors in the text: 
i had went to stor buy phone. No good. returned get new phone.
"""

# Invoke the LLM with the provided prompt
res = llm.invoke(prompt)
print(res)
```

The output will be:

```
I went to the store to buy a phone, but it was no good. I returned it and got a new phone.
```

x??

---


#### Zero-shot Prompting
Background context: In zero-shot prompting, the model is given a task or question without any examples. The prompt typically includes a clear description of what is expected.

:p What does zero-shot prompting involve?
??x
In zero-shot prompting, the model receives a task or question directly and must generate a response based solely on its pre-existing knowledge and understanding. No prior examples are provided to guide the model.

Example:

```python
from langchain_openai import OpenAI

# Initialize the OpenAI model with your API key
llm = OpenAI(openai_api_key=openai_api_key)

# Define a prompt that describes the task without providing any examples
prompt = """
What is the capital city of the state of Kentucky?
"""

# Invoke the LLM to get the response
res = llm.invoke(prompt)
print(res)
```

x??

---


#### Few-shot Prompting
Background context: In few-shot prompting, multiple examples are provided to help the model understand the task better. This technique can improve accuracy by showing patterns or rules.

:p How does few-shot prompting work?
??x
Few-shot prompting involves providing several examples in the prompt to illustrate how to handle a specific task. The LLM uses these examples to infer the pattern and generate accurate responses.

Example:

```python
from langchain_openai import OpenAI

# Initialize the OpenAI model with your API key
llm = OpenAI(openai_api_key=openai_api_key)

# Provide multiple examples in the prompt
prompt = """
The movie is awesome. // Positive
It is so bad. // Negative
Wow, the movie was incredible. // Positive
How horrible the movie is. // Negative

How would you classify this sentence: "How horrible the movie is."
"""

# Invoke the LLM to get the response
res = llm.invoke(prompt)
print(res)
```

The output will be:

```
Negative
```

x??

---


#### One-shot Prompting
Background context: In one-shot prompting, a single example is provided to illustrate the task. The model learns from this single instance and generates responses accordingly.

:p What does one-shot prompting involve?
??x
In one-shot prompting, you provide a single example in the prompt to guide the LLM on how to handle the task. This example helps the model understand the structure or rules needed for generating an accurate response.

Example:

```python
from langchain_openai import OpenAI

# Initialize the OpenAI model with your API key
llm = OpenAI(openai_api_key=openai_api_key)

# Provide a single example in the prompt
prompt = """
Car -> Driver
Plane -> 
"""

# Invoke the LLM to get the response
res = llm.invoke(prompt)
print(res)
```

The output will be:

```
Pilot
```

x??

---

---


#### Adding a Sentiment Classifier Tool to the Agent's Toolbox
Background context: The task involves adding a tool for sentiment analysis to the agent’s toolbox. This is achieved by defining a new function and integrating it into the existing workflow. Sentiment analysis helps classify texts into categories like positive, negative, or neutral based on their tone and content.

:p How can we add a sentiment classifier tool to an agent's toolbox in LangChain?
??x
To add a sentiment classifier tool, you need to define a new function named `SentimentClassifier` that performs the classification. You then integrate this into your existing tools list. Here’s how it can be done:

1. Define the function: 
```python
def sentiment_classifier(text):
    # Assume this is an existing or custom model for sentiment analysis
    result = analyze_sentiment(text)
    return result['sentiment']
```

2. Add the tool to the agent's toolbox:
```python
from langchain.agents import AgentExecutor, create_react_agent
from langchain.tools import Tool

# Assume `llm` is an existing language model and `prompt` is a prompt template
tools = [Tool.from_function(func=sentiment_classifier, name='Sentiment Classifier', description='A tool to classify text sentiment.')]

agent = create_react_agent(llm=llm, tools=tools, prompt=prompt)
agent_executor = AgentExecutor(agent=agent, tools=tools, handle_parsing_errors=True, verbose=True)

# Invoke the agent with a sample text
res = agent_executor.invoke({"input": "this movie is so-so"})
print(res['output'])
```

The output will provide sentiment classification based on the input text.
x??

---


#### Adding Code Generation Tools to the Agent's Toolbox
Background context: The task involves adding tools for generating code and images. These tools are essential for expanding the agent's capabilities to handle various types of content generation tasks. Here, we focus on adding a tool for generating Python code.

:p How can you add a code generator tool to an agent's toolbox in LangChain?
??x
To add a code generator tool, follow these steps:

1. Define a `PromptTemplate` to describe the task.
2. Create an `LLMChain` object that will generate the code based on the template.
3. Add this new tool to your existing tools list.

Here’s how it can be done:
```python
from langchain import LLMChain, PromptTemplate

temp = PromptTemplate(
    input_variables=['text'],
    template='''Write a Python program based on the description in the following text: {text}'''
)

code_generator = LLMChain(llm=llm, prompt=temp)
tools += [Tool.from_function(name='Code Generator', func=code_generator.run, description='A tool to generate code')]
```

Now, you can use this tool within your agent’s workflow by invoking it as part of the `AgentExecutor`.

Example usage:
```python
agent_executor = AgentExecutor(agent=agent, tools=tools, handle_parsing_errors=True, verbose=True)
res = agent_executor.invoke({'input': 'Write a Python program to plot a sine curve and a cosine curve in the same graph. The sine curve is in solid line and the cosine curve is in dashed line. Add a legend to the graph. Set the x-axis range to -5 to 5. The title should be "Comparing Sine and Cosine Curves."'})
print(res['output'])
```

The output will include the generated Python code for plotting the curves as described.
x??

---

