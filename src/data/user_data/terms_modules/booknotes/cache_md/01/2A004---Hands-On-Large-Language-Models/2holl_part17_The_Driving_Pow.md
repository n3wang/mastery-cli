# High-Quality Flashcards: 2A004---Hands-On-Large-Language-Models_processed (Part 17)


**Starting Chapter:** The Driving Power Behind Agents Step-by-step Reasoning

---


#### What Are Agents?
Agents are systems that leverage LLMs to determine which actions they should take and in what order. They can utilize tools for tasks beyond the capabilities of LLMs alone.
:p How do agents differ from chains we have seen so far?
??x
Agents are more advanced because they not only understand queries but also decide on tools to use and when, allowing them to create a roadmap to achieve goals. They can interact with the real world through these tools, extending their capabilities significantly.
```
Example:
agent = Agent(model=LLM_model)
agent.run(task="solve math problem", tool=Calculator())
```
x??

---

#### Tools Used by Agents
Agents use external tools in addition to LLMs to perform tasks that the model cannot do on its own. These tools can range from calculators to search engines or weather APIs.
:p Can you give an example of a tool used by an agent?
??x
An example is using a calculator for mathematical problems, or a search engine to find information online. For instance, if an agent needs to know the current price of a MacBook Pro in USD and convert it to EUR, it can use a search engine to find prices and a calculator to perform the conversion.
```
Example:
agent = Agent(model=LLM_model)
agent.run(task="find and convert price", tool=SearchEngine())
agent.run(task="convert currency", tool=Calculator())
```
x??

---

#### The ReAct Framework
ReAct is a framework that combines reasoning and acting to enable LLMs to make decisions based on external tools. It iteratively follows three steps: Thought, Action, Observation.
:p What are the three steps of the ReAct pipeline?
??x
The three steps in the ReAct pipeline are:
1. **Thought**: The agent thinks about what action it should take next and why.
2. **Action**: Based on the thought, an external tool is triggered to perform a specific task.
3. **Observation**: After performing the action, the agent observes the result, which often involves summarizing the output of the external tool.

Example:
```python
agent = Agent(model=LLM_model)
prompt = "Find and convert the price of MacBook Pro from USD to EUR."
thought = agent.reason(prompt)  # Generate a thought about the task.
action = thought.action  # Identify the action, e.g., use a search engine or calculator.
result = action.execute()  # Execute the action using an external tool.
observation = agent.observe(result)  # Summarize and observe the result.
```
x??

---

#### Iterative Process in ReAct
The process of ReAct is iterative. After observing, the agent refines its thought based on the observation, leading to more accurate actions and better outcomes.
:p How does ReAct ensure accuracy in its processes?
??x
ReAct ensures accuracy through an iterative process where after each action, the agent observes the results. Based on this observation, it can refine its reasoning (thought) for future actions, leading to a more accurate and effective sequence of steps.

Example:
```python
while not goal_reached:
    thought = agent.reason(prompt)
    action = thought.action
    result = action.execute()
    observation = agent.observe(result)
    prompt = observation  # Update the prompt based on new information.
```
x??

---

#### Example Scenario: Holiday Shopping
In this scenario, an agent searches for current prices of a MacBook Pro and converts USD to EUR using a calculator.
:p Can you outline the steps an agent would take in the given example?
??x
The agent would follow these steps:
1. **Thought**: The LLM thinks about what it needs to do next—searching for prices online.
2. **Action**: Trigger a search engine to find current prices of MacBook Pro in USD.
3. **Observation**: Observe and summarize the results from the search engine.
4. **Action (if needed)**: If prices are found, use a calculator to convert USD to EUR based on known exchange rates.

Example:
```python
agent = Agent(model=LLM_model)
prompt = "Find and convert the price of MacBook Pro from USD to EUR."
thought1 = agent.reason(prompt)  # Reason about searching for prices.
action1 = thought1.action  # Use a search engine.
result1 = action1.execute()  # Execute the search.
observation1 = agent.observe(result1)  # Observe and summarize results.

if result1.contains_prices():
    thought2 = agent.reason(observation1)  # Reason about converting prices.
    action2 = thought2.action  # Use a calculator for conversion.
    result2 = action2.execute()  # Execute the conversion.
    observation2 = agent.observe(result2)  # Observe and summarize results.
```
x??


#### Overview of Semantic Search and RAG

Semantic search is a powerful approach that enables searching by meaning, rather than just keyword matching. This technique is widely adopted in industry due to its significant improvements in search quality.

Background context: The concept of semantic search was popularized after the release of BERT in 2018, which has been used by major search engines like Google and Bing for improving their search capabilities significantly.
:p What does semantic search enable?
??x
Semantic search enables searching based on meaning rather than just keywords. This means that even if a user searches for "best pizza place," the system will be able to understand the context and provide relevant results, even if the exact words are not present in the database.

---
#### Dense Retrieval

Dense retrieval systems rely on embeddings to convert both search queries and documents into numerical vectors and then retrieve the nearest neighbors of the query from a large archive of texts. This method is part of semantic search.

Background context: In dense retrieval, the similarity between the embedding vectors of the query and the document (or set of documents) determines their relevance.
:p How does dense retrieval work?
??x
Dense retrieval works by converting both the search query and the documents into embeddings, then finding the nearest neighbors in the embedding space. This is shown in Figure 8-1.

---
#### Reranking

Reranking involves reordering a subset of results based on their relevance to the query after initial dense retrieval. It's another component of semantic search pipelines.

Background context: Rerankers take an additional input, which is a set of results from a previous step in the search pipeline and score them against the query.
:p What does a reranker do?
??x
A reranker takes a subset of search results and reorders them based on their relevance to the query. This often leads to more accurate and relevant results.

---
#### RAG (Retrieval-Augmented Generation)

RAG systems combine the strengths of retrieval and generation models, providing both factual answers and context from external sources. They are particularly useful in reducing hallucinations and increasing factuality.

Background context: RAG leverages embeddings for dense retrieval to find relevant documents and uses a language model to generate an answer based on this information.
:p What is the main benefit of using RAG systems?
??x
The main benefit of using RAG systems is that they can reduce hallucinations, increase factuality, and ground the generation model on specific datasets. This combination allows for more accurate and reliable answers.

---
#### Example of a RAG System

A generative search system uses an LLM to formulate an answer based on retrieved information from various sources.

Background context: In this example, we will explore how an LLM can be used in conjunction with retrieval methods to generate factual and relevant answers.
:p Can you provide an example of how RAG works?
??x
Sure! An RAG system would first use dense retrieval to find relevant documents for a query. Then it would present these documents to the LLM, which generates a response based on the retrieved information.

Example pseudocode:
```pseudocode
function generateAnswer(query):
    # Step 1: Retrieve relevant documents using dense retrieval
    relevantDocuments = denseRetrieval(query)
    
    # Step 2: Use the language model to generate an answer
    answer = LLM.generateAnswer(relevantDocuments, query)
    return answer
```

x??
This pseudocode outlines how a RAG system works. It first retrieves documents using dense retrieval and then uses an LLM to process these documents and generate a relevant answer.

---
#### Comparison of Dense Retrieval and Reranking

Dense retrieval focuses on finding the nearest neighbors in embedding space, while reranking refines the results by reordering them based on relevance scores.

Background context: Dense retrieval is about retrieving similar content, whereas reranking adjusts the order to make sure the most relevant items are at the top.
:p How do dense retrieval and reranking differ?
??x
Dense retrieval focuses on finding the nearest neighbors in embedding space, while reranking involves reordering a set of results based on their relevance scores. Dense retrieval is about retrieving similar content, whereas reranking refines the order to ensure that the most relevant items are at the top.

---
#### Example RAG System Workflow

An agent using an LLM can reason about its thoughts and take actions, such as searching the web or using a calculator, before generating a response.

Background context: Agents leverage LLMs to make decisions based on external information.
:p How does an agent with an LLM work in a RAG system?
??x
An agent using an LLM works by first reasoning about its thoughts and taking actions. It can search the web, use a calculator, or access other tools before generating a response. This workflow is part of the ReAct framework.

Example pseudocode:
```pseudocode
function processQuery(query):
    # Step 1: Reason about what needs to be done
    action = agent.reasonAbout(query)
    
    # Step 2: Take an action, e.g., search the web or use a calculator
    result = takeAction(action)
    
    # Step 3: Generate a response using the LLM
    answer = LLM.generateAnswer(result)
    return answer
```

x??
This pseudocode illustrates how an agent with an LLM works in a RAG system. The agent first reasons about what action to take, performs that action, and then generates a response based on the results.


#### Dense Retrieval Concept
Background context explaining dense retrieval. Embeddings transform text into numeric representations, allowing us to find similar texts based on their proximity in a high-dimensional space.

Dense retrieval relies on embedding queries and documents into the same vector space where proximity indicates semantic similarity. The nearest neighbors to the query are then selected as potential search results.
:p What is dense retrieval?
??x
Dense retrieval involves converting text into embeddings, which are numeric representations of text. These embeddings allow us to find similar texts based on their proximity in a high-dimensional space. When a user enters a query, we embed it and retrieve the nearest documents from our vector database as search results.
x??

---
#### Embedding Texts
Explanation of embedding texts into numerical vectors. This process allows us to compare text using geometric distance measures.

Embeddings convert textual data into dense vectors in a high-dimensional space where similar texts are closer together. The distance between embeddings can be calculated using various metrics like cosine similarity or Euclidean distance.
:p How do we embed texts?
??x
Texts are embedded into numerical vectors through techniques like Word2Vec, BERT embeddings, etc. These embeddings capture the semantic meaning of words and phrases, allowing us to compare them based on their proximity in vector space.

For example, using a simple cosine similarity measure:
```python
from sklearn.metrics.pairwise import cosine_similarity

def embed_text(text):
    # Assume we have an embedding function that returns a vector
    return embedding_function(text)
    
text1 = "The sky is blue."
text2 = "The ground is green."

vector1 = embed_text(text1)
vector2 = embed_text(text2)

similarity_score = cosine_similarity(vector1, vector2)
print(similarity_score)
```
x??

---
#### Embedding Vectors for Search
Explanation of how embedding vectors are used in search systems.

In dense retrieval, embeddings are created and stored in a vector database. When a user queries the system, their query is embedded, and we find the nearest neighbors to that query vector from our stored embeddings.
:p What role do embeddings play in search systems?
??x
Embeddings serve as the backbone of dense retrieval systems by transforming text into numeric vectors. These vectors are then used to represent both documents and queries.

When a user submits a query, it is embedded using the same technique as for documents. The system searches for the nearest neighbors based on these embeddings in the vector database, which returns relevant results.
x??

---
#### Vector Database Construction
Explanation of how a vector database is constructed from text archives.

Documents are broken into smaller chunks and each chunk is embedded. These embedding vectors are stored in a vector database ready for retrieval queries.
:p How do we build a search index using dense retrieval?
??x
To build a search index with dense retrieval, follow these steps:

1. **Chunk the Documents**: Split larger documents into smaller sentences or paragraphs.
2. **Embed Each Chunk**: Convert each chunk of text into an embedding vector.
3. **Store Vectors in Database**: Store these vectors in a vector database for quick retrieval.

Example code:
```python
from sklearn.feature_extraction.text import TfidfVectorizer

def build_search_index(documents):
    # Split documents into sentences
    sentences = [sent for doc in documents for sent in doc.split(". ")]
    
    # Embed each sentence
    embeddings = [co.embed(text).embeddings[0] for text in sentences]
    
    return sentences, embeddings
```
x??

---
#### Query and Retrieval Process
Explanation of querying the vector database with a user's input.

When a user enters a query, it is embedded into a vector. The system then finds the nearest neighbors to this query vector from the stored embedding vectors.
:p How do we retrieve results for a given query?
??x
To retrieve results for a given query in dense retrieval:

1. **Embed the Query**: Convert the user's input into an embedding vector.
2. **Find Nearest Neighbors**: Use a search algorithm to find the nearest neighbors to this query vector from the stored embeddings.

Example code:
```python
def search(query, sentences, embeddings):
    # Embed the query
    query_embedding = co.embed(query).embeddings[0]
    
    # Calculate distances and sort by similarity (descending)
    similarities = cosine_similarity([query_embedding], embeddings)[0]
    sorted_indices = np.argsort(-similarities)
    
    return [sentences[i] for i in sorted_indices[:5]]  # Return top 5 closest sentences
```
x??

---
#### Cohere API Integration
Explanation of integrating a Cohere API key and using it to embed texts.

To use the Cohere API, we first import necessary libraries and paste our API key. We then create a client and use its methods to embed texts.
:p How do we integrate Cohere's embedding service?
??x
To integrate Cohere's embedding service:

1. **Get Your API Key**: Sign up for an account at the provided URL and get your API key.
2. **Create a Client**: Use this key to create a client object.
3. **Embed Texts**: Use the client methods to embed texts.

Example code:
```python
api_key = 'your_api_key_here'
co = cohere.Client(api_key)

def embed_text(text):
    response = co.embed(text)
    return response.embeddings[0]

print(embed_text("This is a test sentence."))
```
x??

---
#### Document Chunking Process
Explanation of how documents are split into smaller chunks for embedding.

Documents are broken down into smaller, manageable pieces (sentences or paragraphs) before they are embedded to improve the efficiency and effectiveness of retrieval.
:p How do we chunk documents?
??x
Documents are chunked by breaking them into smaller units like sentences or paragraphs. This process helps in managing large texts efficiently and improves the accuracy of embeddings.

Example code:
```python
def chunk_text(text):
    # Split text into sentences based on period followed by space
    return [sent for sent in text.split(". ") if sent]
    
text = "This is a long document. It needs to be split into smaller chunks."
chunks = chunk_text(text)
print(chunks)
```
x??

---


#### Semantic Search vs. Keyword Search

Background context explaining the difference between semantic search and keyword search methods, including their use cases.

:p What is semantic search?
??x
Semantic search refers to a method of searching where relevance is determined by similarity in meaning rather than simple matching of keywords or phrases. This approach uses embeddings to understand the intent behind the query, allowing for more accurate results even if the exact words are not present in the dataset.
x??

---
#### Embedding Query

Explanation on how embedding a query works and its significance in semantic search.

:p How does the `search` function embed the query?
??x
The `search` function first uses an embedding model to convert the input text (query) into a numerical vector. This embedding process captures the meaning of the text, allowing it to be compared with other texts in the dataset using similarity metrics.
```python
def search(query, number_of_results = 3):
    # Embed the query
    query_embed = co.embed(texts=[query], input_type="search_query").embeddings[0]
```
x??

---
#### Retrieving Nearest Neighbors

Explanation of retrieving nearest neighbors from an index using embedding distances.

:p How does the `search` function retrieve the most similar sentences to the query?
??x
The `search` function retrieves the nearest neighbors by comparing the embedded query with the embeddings in the index. It uses a similarity metric (e.g., cosine distance) to find the closest matches and returns the top results.
```python
# Retrieve the nearest neighbors
distances, similar_item_ids = index.search(np.float32([query_embed]), number_of_results)
```
x??

---
#### Formatting Results

Explanation on how the search function formats and presents the retrieved results.

:p How does the `search` function format the search results?
??x
The `search` function formats the results by creating a DataFrame that includes the closest matching texts from the dataset along with their similarity distances. This allows for easy visualization of the most relevant sentences.
```python
# Format the results
texts_np = np.array(texts)  # Convert texts list to numpy for easier indexing
results = pd.DataFrame(data={'texts': texts_np[similar_item_ids[0]], 'distance': distances[0]})
```
x??

---
#### Keyword Search Comparison

Explanation of how keyword search works and its difference from semantic search.

:p How does the `keyword_search` function work?
??x
The `keyword_search` function performs a lexical search using the BM25 algorithm. It tokenizes the text based on words, ignoring common stop words, and assigns scores to each document based on term frequency-inverse document frequency (TF-IDF) principles.
```python
from rank_bm25 import BM25Okapi
from sklearn.feature_extraction import _stop_words
import string

def bm25_tokenizer(text):
    tokenized_doc = []
    for token in text.lower().split():
        token = token.strip(string.punctuation)
        if len(token) > 0 and token not in _stop_words.ENGLISH_STOP_WORDS:
            tokenized_doc.append(token)
    return tokenized_doc
```
x??

---
#### BM25 Tokenization

Explanation of the BM25 tokenizer function and its role.

:p What does the `bm25_tokenizer` function do?
??x
The `bm25_tokenizer` function is used to tokenize text by splitting it into words, removing punctuation, converting to lowercase, and filtering out common stop words. This preprocessing step is crucial for applying the BM25 algorithm effectively.
```python
def bm25_tokenizer(text):
    tokenized_doc = []
    for token in text.lower().split():
        token = token.strip(string.punctuation)
        if len(token) > 0 and token not in _stop_words.ENGLISH_STOP_WORDS:
            tokenized_doc.append(token)
    return tokenized_doc
```
x??

---
#### Keyword Search Results

Explanation of the results obtained from running `keyword_search` versus semantic search.

:p What are the differences between the results of `search` and `keyword_search`?
??x
The `search` function using semantic embedding retrieves sentences that closely match the meaning or intent behind the query, even if they do not contain the exact words. On the other hand, `keyword_search` performs a traditional keyword-based search which can miss relevant information if the words are not directly present in the documents.
Example:
- Semantic Search: "It has also received praise from many astronomers for its scientific accuracy and portrayal of theoretical astrophysics."
- Keyword Search: "Interstellar is a 2014 epic science fiction film co-written, directed, and produced by Christopher Nolan"
x??

---


#### Caveats of Dense Retrieval
Background context explaining dense retrieval and its limitations. In semantic search, dense retrieval tries to find the most relevant documents based on the similarity between query embeddings and document embeddings. However, it faces challenges such as returning irrelevant results or not finding exact matches for specific phrases.
:p What are some caveats of using dense retrieval in a search system?
??x
Dense retrieval can return results that do not contain the answer to the user's query. For example, if the user asks "What is the mass of the moon?" and the nearest neighbors returned include information about film grosses and scientific accuracy, it may be difficult for the model to identify the correct document with the relevant information.

In addition, dense retrieval struggles with exact matches for specific phrases, making keyword search a better choice in such cases. This limitation highlights the need for hybrid search systems that combine semantic search with keyword matching.
x??

---

#### Chunking Long Texts
Background context explaining why chunking is necessary and how long texts are processed by Transformer models. The primary limitation of Transformer language models is their context size, meaning they can only handle a limited number of tokens in a single input. To overcome this, text needs to be broken down into smaller chunks.
:p Why do we need to chunk long texts when using dense retrieval?
??x
We need to chunk long texts because the context size of Transformer language models is limited. This means that very long documents cannot be processed as a whole; instead, they must be divided into smaller sections. Each chunk can then be embedded independently and later recombined for full-text understanding.
x??

---

#### Indexing One Vector Per Document
Background context explaining the approach of using one vector to represent an entire document. This method simplifies processing but may not capture all the nuances within a longer text. It involves embedding only representative parts of the document, such as titles or beginnings.
:p How can we embed long documents in dense retrieval?
??x
We can embed long documents by representing them with a single vector. However, for longer documents, it's better to split them into smaller chunks that each get their own embeddings. This approach helps capture more detailed information and context within the text.

For example:
```python
def document_embedding(document):
    # Split the document into chunks
    chunks = chunker.split(document)
    
    # Embed each chunk
    chunk_embeddings = [model.encode(chunk) for chunk in chunks]
    
    # Combine embeddings (e.g., average or use a more complex method)
    document_vector = combine_vectors(chunk_embeddings)
```
x??

---

#### Indexing Multiple Vectors Per Document
Background context explaining the alternative approach of using multiple vectors per document. This method involves breaking down the entire document into smaller chunks, each with its own vector representation.
:p How does indexing multiple vectors per document work?
??x
Indexing multiple vectors per document involves breaking down a long text into several smaller segments and embedding each segment independently. Each chunk can then be used to represent part of the document.

For example:
```python
def multi_vector_embedding(document):
    # Split the document into chunks
    chunks = chunker.split(document)
    
    # Embed each chunk
    chunk_vectors = [model.encode(chunk) for chunk in chunks]
    
    return chunk_vectors
```
x??

---

#### Threshold Level and Relevance
Background context explaining how setting a threshold level can help manage irrelevant results. A threshold distance can be used to filter out less relevant documents, ensuring that only highly similar documents are considered.
:p How can we handle cases where dense retrieval returns irrelevant results?
??x
To handle cases where dense retrieval returns irrelevant results, we can set a threshold level—a maximum distance for relevance. This means that any document whose embedding is too far from the query's embedding (i.e., its distance exceeds the threshold) will be filtered out.

For example:
```python
def filter_relevant(documents, distances, threshold):
    relevant_indices = [i for i, dist in enumerate(distances) if dist <= threshold]
    return [doc for idx, doc in enumerate(documents) if idx in relevant_indices]
```
x??

---

#### Tracking User Interaction for Improvement
Background context explaining the importance of user interaction data. By tracking whether users click on search results and find them satisfactory, we can improve future versions of the search system.
:p Why is it important to track user interactions with a search system?
??x
Tracking user interactions helps in understanding the relevance of search results. If users frequently click on specific types of results or navigate away from certain documents, this feedback can be used to refine the model and improve its performance over time.

For example:
```python
def update_search_model(interactions):
    # Analyze interactions to understand which documents are most relevant
    for interaction in interactions:
        if interaction['click']:
            # Update model based on user's positive interaction
            pass
        elif interaction['no_click']:
            # Update model to avoid showing less relevant documents
            pass
```
x??

---

#### Domain-Specific Challenges
Background context explaining the limitations of dense retrieval when deployed in domains different from those it was trained on. Dense retrieval models may not perform well if they lack sufficient training data specific to a particular domain.
:p What are the challenges of deploying dense retrieval systems in new domains?
??x
Deploying dense retrieval systems in new domains can be challenging because these systems often rely heavily on the training data used during model development. If the training data does not adequately cover the nuances and specifics of a new domain, the system may struggle to produce accurate results.

For example:
```python
def check_domain_relevance(model, new_data):
    # Evaluate model performance on new data from an unfamiliar domain
    relevance_scores = [model.encode(new_data[i]) for i in range(len(new_data))]
    
    # Analyze scores to determine if the model is effective in this new domain
    domain_effectiveness = analyze_scores(relevance_scores)
```
x??

---


#### Embedding Documents in Chunks

Background context explaining the concept. The approach of embedding documents in chunks involves breaking down a document into smaller segments, embedding these segments, and then aggregating them to create an index. This method helps in retaining more information compared to embedding entire documents.

:p What is the main idea behind embedding documents in chunks?
??x
The main idea is to break down the document into smaller chunks, embed each chunk individually, and then aggregate their embeddings to form a comprehensive index that captures more of the document's content. This method helps prevent the loss of information that can occur when compressing an entire document into a single vector.
```java
// Pseudocode for embedding documents in chunks
public class DocumentChunker {
    public List<Vector> embedDocument(String document) {
        // Split the document into smaller chunks (e.g., sentences or paragraphs)
        List<String> chunks = splitIntoChunks(document);
        
        // Embed each chunk and store the embeddings
        List<Vector> embeddings = new ArrayList<>();
        for (String chunk : chunks) {
            Vector embedding = embedChunk(chunk);
            embeddings.add(embedding);
        }
        
        return embeddings;
    }

    private List<String> splitIntoChunks(String document) {
        // Implement logic to split the document into meaningful chunks
        return Arrays.asList(document.split("\\. |\\?|!")); // Example splitting logic
    }

    private Vector embedChunk(String chunk) {
        // Implement embedding logic for each chunk
        return new Vector(chunk); // Placeholder implementation
    }
}
```
x??

---

#### Aggregating Chunk Embeddings

Background context explaining the concept. After individual chunks are embedded, these embeddings need to be aggregated into a single vector. The usual method of aggregation is averaging the vectors. However, this can result in loss of information due to compression.

:p What is an issue with aggregating chunk embeddings by averaging them?
??x
Aggregating chunk embeddings by simply averaging them can lead to a highly compressed representation that loses much of the detailed information contained within each chunk. This means that specific pieces of information may not be as accurately captured, making it difficult for searches to find precise matches.
```java
// Pseudocode for aggregating chunk embeddings by averaging
public class EmbeddingAggregator {
    public Vector aggregateEmbeddings(List<Vector> embeddings) {
        int totalDimension = embeddings.get(0).size();
        double[] aggregatedVector = new double[totalDimension];
        
        // Sum up the vectors
        for (Vector embedding : embeddings) {
            for (int i = 0; i < totalDimension; i++) {
                aggregatedVector[i] += embedding.getValue(i);
            }
        }
        
        // Average the summed values
        Vector aggregatedEmbedding = new Vector();
        for (double value : aggregatedVector) {
            aggregatedEmbedding.add(value / embeddings.size());
        }
        
        return aggregatedEmbedding;
    }
}
```
x??

---

#### Multiple Vectors Per Document

Background context explaining the concept. Embedding documents in chunks and using multiple vectors per document allows for a more detailed representation of the text, making it easier to capture individual concepts within the document.

:p What is an advantage of having multiple vectors per document?
??x
Having multiple vectors per document provides better coverage of the full content of the text and captures individual concepts more effectively. This leads to a more expressive search index that can handle queries for specific pieces of information contained in the article, as opposed to a single vector which may lose important details.
```java
// Pseudocode for handling multiple vectors per document
public class DocumentEmbedder {
    public List<Vector> embedDocument(String document) {
        // Split the document into smaller chunks (e.g., sentences or paragraphs)
        List<String> chunks = splitIntoChunks(document);
        
        // Embed each chunk and store the embeddings in a list
        List<Vector> embeddings = new ArrayList<>();
        for (String chunk : chunks) {
            Vector embedding = embedChunk(chunk);
            embeddings.add(embedding);
        }
        
        return embeddings;
    }

    private List<String> splitIntoChunks(String document) {
        // Implement logic to split the document into meaningful chunks
        return Arrays.asList(document.split("\\. |\\?|!")); // Example splitting logic
    }

    private Vector embedChunk(String chunk) {
        // Implement embedding logic for each chunk
        return new Vector(chunk); // Placeholder implementation
    }
}
```
x??

---

#### Chunking Strategies

Background context explaining the concept. Different strategies can be used to split a document into chunks, such as splitting by sentences or paragraphs, and adding context around the chunks.

:p What are some chunking strategies mentioned in the text?
??x
The text mentions several chunking strategies:
1. Each sentence is a chunk.
2. Each paragraph is a chunk.
3. Adding the title of the document to the chunk or incorporating surrounding text by overlapping segments.

These strategies help ensure that chunks are meaningful and contextually relevant, allowing for better embedding and search indexing.
```java
// Pseudocode for different chunking strategies
public class Chunker {
    public List<String> splitIntoChunks(String document) {
        // Implement logic to split the document into meaningful chunks based on strategy
        return Arrays.asList(document.split("\\. |\\?|!")); // Example splitting by sentences or paragraphs
    }

    public List<String> addContextualChunking(String document) {
        // Implement adding context around the chunks (e.g., title, surrounding text)
        String[] sentences = splitIntoChunks(document);
        List<String> contextualChunks = new ArrayList<>();
        
        for (String sentence : sentences) {
            contextualChunks.add("Title: " + getDocumentTitle() + "\n" + sentence); // Example adding the title
        }
        
        return contextualChunks;
    }

    private String getDocumentTitle() {
        // Placeholder method to retrieve document title
        return "Sample Document Title"; // Example implementation
    }
}
```
x??

---

#### Nearest Neighbor Search

Background context explaining the concept. After embedding the query and text documents, the next step is to find the nearest vectors in the indexed database of embeddings.

:p What does the nearest neighbor search involve?
??x
Nearest neighbor search involves finding the vectors in the indexed database that are closest to the embedded query vector. This process typically requires calculating distances between the query vector and all vectors in the index, then selecting the ones with the smallest distances as the nearest neighbors.
```java
// Pseudocode for nearest neighbor search
public class NearestNeighborSearcher {
    public List<Vector> findNearestNeighbors(Vector queryVector, List<Vector> indexedVectors) {
        // Calculate distances between query vector and all indexed vectors
        Map<Vector, Double> distanceMap = new HashMap<>();
        
        for (Vector indexedVector : indexedVectors) {
            double distance = calculateDistance(queryVector, indexedVector);
            distanceMap.put(indexedVector, distance);
        }
        
        // Sort the map by distance and return the closest ones
        List<Map.Entry<Vector, Double>> sortedEntries = 
            new ArrayList<>(distanceMap.entrySet());
        Collections.sort(sortedEntries, (entry1, entry2) -> Double.compare(entry1.getValue(), entry2.getValue()));
        
        int numberOfNeighborsToReturn = 5; // Example number of neighbors to return
        return sortedEntries.stream()
                            .map(Map.Entry::getKey)
                            .limit(numberOfNeighborsToReturn)
                            .collect(Collectors.toList());
    }

    private double calculateDistance(Vector queryVector, Vector indexedVector) {
        // Placeholder implementation for distance calculation
        return 0.0; // Example placeholder value
    }
}
```
x??

---


#### Vector Retrieval Systems
Background context: As mentioned, vector retrieval systems are crucial for efficiently finding similar documents when dealing with millions of vectors. Libraries like Annoy and FAISS can be utilized to perform approximate nearest neighbor search. These libraries optimize performance by leveraging GPU acceleration and distributed computing.

:p What are vector retrieval systems used for?
??x
Vector retrieval systems are used for efficiently searching through large datasets of vectors to find the most similar documents, especially when dealing with millions or billions of vectors.
x??

---

#### Approximate Nearest Neighbor Search Libraries
Background context: Libraries like Annoy and FAISS offer optimized approaches for vector search by allowing rapid retrieval from massive indexes. They can improve performance using GPUs and scaling to clusters of machines.

:p What libraries are commonly used for approximate nearest neighbor searches?
??x
Annoy and FAISS are commonly used libraries for approximate nearest neighbor searches, as they provide efficient ways to retrieve results from large index sets in milliseconds.
x??

---

#### Vector Databases (e.g., Weaviate, Pinecone)
Background context: In addition to specialized search libraries, vector databases like Weaviate or Pinecone offer a more comprehensive solution by allowing dynamic management of vectors and additional filtering capabilities beyond mere distance metrics.

:p What are vector databases?
??x
Vector databases like Weaviate or Pinecone provide a platform for managing large sets of vectors dynamically, including adding or deleting vectors without rebuilding the index. They also support advanced filtering options.
x??

---

#### Fine-Tuning Embedding Models for Dense Retrieval
Background context: To improve the performance of language models in dense retrieval tasks, fine-tuning can be used to optimize text embeddings. This involves training on pairs of relevant queries and documents.

:p What is fine-tuning embedding models for dense retrieval?
??x
Fine-tuning embedding models for dense retrieval involves optimizing the model's ability to understand and retrieve similar documents by training it with query-document pairs, ensuring that relevant queries are mapped closer to their corresponding documents.
x??

---

#### Fine-Tuning Process Example
Background context: The fine-tuning process uses specific examples of positive (relevant) and negative (irrelevant) pairs to adjust the embedding model. This ensures that the model better understands the relationships between queries and documents.

:p Can you provide an example of a query-document pair used in fine-tuning?
??x
Sure, consider the sentence “Interstellar premiered on October 26, 2014, in Los Angeles.” Two relevant queries are "Interstellar release date" and "When did Interstellar premier," while an irrelevant query is "Interstellar cast."
x??

---

#### Impact of Fine-Tuning Before and After
Background context: The fine-tuning process aims to adjust the embeddings so that positive pairs (relevant queries and documents) have smaller distances, whereas negative pairs should have larger distances.

:p How does fine-tuning affect embedding distances?
??x
Fine-tuning adjusts the embeddings such that relevant query-document pairs have smaller distances compared to irrelevant pairs. Before fine-tuning, all queries might have had similar distances to the target document; after fine-tuning, relevant queries would be closer, while irrelevant ones would be farther.
x??

---

