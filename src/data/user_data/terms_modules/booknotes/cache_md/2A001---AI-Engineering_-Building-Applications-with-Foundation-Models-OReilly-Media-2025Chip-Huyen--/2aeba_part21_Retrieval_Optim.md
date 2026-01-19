# High-Quality Flashcards: 2A001---AI-Engineering_-Building-Applications-with-Foundation-Models-OReilly-Media-2025Chip-Huyen--_processed (Part 21)


**Starting Chapter:** Retrieval Optimization

---


#### Cheap and Precise Retrieval Sequence
Background context: This concept explains a strategy where an initial retrieval step uses less precise but faster methods, followed by more precise but slower mechanisms to refine results. The term-based system fetches broad candidates, while k-nearest neighbors or vector search refines these to the most relevant documents.
:p What is the first step in the cheap and precise retrieval sequence?
??x
The first step involves using a less precise but faster mechanism, such as a term-based system, which fetches all documents containing specific keywords related to the query. This broadens the candidate set without much computational overhead.

```java
// Pseudocode for fetching candidates with a term-based retriever
public List<Document> retrieveByKeyword(String keyword) {
    // Search database or index based on keyword
    return documentIndex.search(keyword);
}
```
x??

---


#### Reranking Mechanism
Background context: After the initial broad retrieval, a more precise mechanism like k-nearest neighbors is used to refine and rank the candidate documents more accurately. This step ensures that only the most relevant results are presented.
:p What is reranking in the context of information retrieval?
??x
Reranking involves using a more precise but computationally expensive method, such as k-nearest neighbors or vector search, to re-rank the candidates fetched by an initial, less precise retriever. This step aims to enhance the relevance of the results.

```java
// Pseudocode for reranking documents with k-NN
public List<Document> rerankDocuments(List<Document> candidates) {
    // Compute similarity scores using vector search or k-NN algorithm
    Map<Document, Double> similarityScores = new HashMap<>();
    for (Document doc : candidates) {
        double score = computeSimilarityScore(doc);
        similarityScores.put(doc, score);
    }
    // Sort documents based on scores to get the best matches
    return sortDocumentsByScore(similarityScores);
}

private double computeSimilarityScore(Document doc) {
    // Implement vector search or k-NN logic here
    return 0.0;
}

private List<Document> sortDocumentsByScore(Map<Document, Double> similarityScores) {
    // Sort documents based on their scores and return sorted list
    return new ArrayList<>(similarityScores.entrySet().stream()
            .sorted(Map.Entry.comparingByValue(Comparator.reverseOrder()))
            .map(entry -> entry.getKey())
            .collect(Collectors.toList()));
}
```
x??

---


#### Chunking Strategy for Indexing Documents
Background context: The chunking strategy involves dividing documents into manageable segments (chunks) to optimize retrieval efficiency. Different units like characters, words, sentences, or paragraphs can be used based on the task requirements.
:p What is a chunking strategy in document indexing?
??x
A chunking strategy divides documents into smaller, manageable chunks for indexing and retrieval. This method helps improve search performance by making it easier to locate relevant parts of large documents.

Common units include:
- Characters: Dividing text into fixed-length segments.
- Words: Splitting text based on spaces or punctuation.
- Sentences: Chunking at the sentence level.
- Paragraphs: Grouping sentences together for indexing.

```java
// Pseudocode for chunking strategy implementation
public List<String> chunkDocument(String document, String unit) {
    if ("characters".equals(unit)) {
        return chunkByCharacters(document);
    } else if ("words".equals(unit)) {
        return chunkByWords(document);
    } else if ("sentences".equals(unit)) {
        return chunkBySentences(document);
    } else if ("paragraphs".equals(unit)) {
        return chunkByParagraphs(document);
    }
    throw new IllegalArgumentException("Invalid unit: " + unit);
}

private List<String> chunkByCharacters(String document, int length) {
    // Implement character-based chunking
    return Collections.emptyList();
}

private List<String> chunkByWords(String document) {
    // Split text by words and return chunks
    String[] words = document.split("\\s+");
    List<String> chunks = new ArrayList<>();
    StringBuilder currentChunk = new StringBuilder();
    for (String word : words) {
        if (currentChunk.length() + word.length() < length) {
            currentChunk.append(word).append(" ");
        } else {
            chunks.add(currentChunk.toString().trim());
            currentChunk.setLength(0);
            currentChunk.append(word).append(" ");
        }
    }
    if (!currentChunk.isEmpty()) {
        chunks.add(currentChunk.toString().trim());
    }
    return chunks;
}

private List<String> chunkBySentences(String document) {
    // Split text by sentences and return chunks
    String[] sentences = document.split("[.!?]");
    List<String> chunks = new ArrayList<>();
    for (String sentence : sentences) {
        chunks.add(sentence.trim());
    }
    return chunks;
}

private List<String> chunkByParagraphs(String document) {
    // Split text by paragraphs and return chunks
    String[] paragraphs = document.split("\n");
    List<String> chunks = new ArrayList<>();
    for (String paragraph : paragraphs) {
        chunks.add(paragraph.trim());
    }
    return chunks;
}
```
x??

---

---


#### Document Chunking Strategies

Background context: Splitting documents into chunks is a crucial step for various NLP tasks, including vector database construction and generative model training. Proper chunking ensures that important information is not lost or broken off arbitrarily.

:p What are the different strategies mentioned for splitting documents?
??x
The different strategies include:
1. **Character-based chunking**: Splitting into chunks of 2,048 characters.
2. **Sentence-based chunking**: Splitting into chunks containing a fixed number of sentences (e.g., 20).
3. **Paragraph-based chunking**: Each paragraph is its own chunk.
4. **Recursive splitting**: Starting with sections and recursively splitting smaller units until each chunk fits within the maximum allowed size.

Additionally, specific strategies like language-specific splitters and question-answer pair chunking for Q&A documents are noted.

x??

---


#### Token-Based Chunking

Background context: Token-based chunking involves splitting documents using tokens determined by a specific tokenizer. This approach is particularly useful when working with models that use tokenizers for processing input text, as it aligns better with downstream model requirements.

:p How does token-based chunking work?
??x
Token-based chunking works by first tokenizing the document using a specific tokenizer (e.g., Llama 3’s tokenizer). The chunks are then created based on these tokens rather than characters or sentences. This method ensures compatibility with models that rely heavily on tokenization.

Example:
```python
# Pseudocode for token-based chunking
def tokenize_document(document, tokenizer):
    tokens = tokenizer.tokenize(document)
    chunks = []
    current_chunk = []

    for token in tokens:
        if len(current_chunk) + len(tokenizer.encode(token)) <= max_chunk_length:
            current_chunk.append(token)
        else:
            chunks.append(' '.join(current_chunk))
            current_chunk = [token]
    
    # Add the last chunk
    if current_chunk:
        chunks.append(' '.join(current_chunk))

    return chunks

# Example usage with a hypothetical tokenizer and document
document = "Your long document here"
tokenizer = HypotheticalTokenizer()
chunks = tokenize_document(document, tokenizer)
```

x??

---


#### Context Length Constraints

Background context: When using generative models like Llama 3, chunking must consider the model's maximum context length. Embedding-based approaches also have their own constraints related to embedding model contexts.

:p How do max context lengths affect document splitting?
??x
Max context lengths affect document splitting by limiting the size of chunks that can be fed into a generative or embedding model. For instance, if Llama 3 has a maximum context length of 2048 tokens, then any chunk used for processing must not exceed this limit.

To handle longer documents, you might need to split them into smaller chunks and ensure proper overlap to maintain contextual information across the splits.

Example:
```python
# Pseudocode for considering max context length in chunking
def split_document(document, tokenizer, max_chunk_length):
    tokens = tokenizer.tokenize(document)
    chunks = []
    
    current_chunk = []
    for token in tokens:
        if len(current_chunk) + len(tokenizer.encode(token)) <= max_chunk_length - 10: #预留一些空间以确保不超出最大长度
            current_chunk.append(token)
        else:
            chunks.append(' '.join(current_chunk))
            current_chunk = [token]
    
    # Add the last chunk
    if current_chunk:
        chunks.append(' '.join(current_chunk))

    return chunks

# Example usage with a hypothetical tokenizer and document
document = "Your long document here"
tokenizer = HypotheticalTokenizer()
max_chunk_length = 2048 - 10 #预留一些空间以确保不超出最大长度
chunks = split_document(document, tokenizer, max_chunk_length)
```

x??

---


#### Embedding-based Retrieval Challenges
Background context explaining the concept. Halving the chunk size means that you have twice as many chunks to index and twice as many embedding vectors to generate and store, leading to a larger vector search space which can reduce query speed. There is no universal best chunk size or overlap size; experimentation is needed.
:p What challenge does halving the chunk size pose in embedding-based retrieval?
??x
Halving the chunk size increases the number of chunks and embedding vectors, doubling the indexing time and storage requirements. This leads to a larger vector search space, which can degrade query performance due to increased computational overhead.
```java
// Pseudocode for understanding the impact on query speed
public void adjustChunkSize(int originalChunkSize) {
    int newChunkSize = originalChunkSize / 2;
    long embeddingVectors = (long) Math.pow(newChunkSize, dimensionality); // assuming a fixed dimensionality
    System.out.println("New number of embedding vectors: " + embeddingVectors);
}
```
x??

---


#### Query Rewriting in RAG Systems
Background context explaining the concept. Query rewriting is used to transform ambiguous or incomplete user queries into more precise and meaningful ones that can yield relevant results.
:p What is query rewriting, and why is it important?
??x
Query rewriting involves transforming ambiguous or incomplete user queries into more specific and accurate versions. It is crucial for ensuring that search engines retrieve the correct information by understanding the true intent behind a user's query.
```java
// Pseudocode for query rewriting using ChatGPT prompt example
public String rewriteQuery(String originalQuery) {
    String rewrittenQuery = "Given the following conversation, rewrite the last user input to reflect what the user is actually asking.";
    return rewrittenQuery;
}
```
x??

---

---


#### Chunk Augmentation Techniques
Chunk augmentation involves adding contextual information to document chunks, such as tags, keywords, and entities extracted from the original text. This helps in better retrieval when queried.
:p How can chunk augmentation be used in customer support articles?
??x
Chunk augmentation can be effectively used in customer support articles by associating them with related questions. For instance, an article on how to reset your password could be augmented with queries like “How to reset password?”, “I forgot my password”, or even “Help, I can’t find my account”. This makes it easier for the retrieval system to locate relevant content based on common user queries.
```java
// Example of augmenting an article with related questions in Java
public class SupportArticle {
    private String title;
    private String content;
    private List<String> relatedQuestions; // Metadata

    public SupportArticle(String title, String content) {
        this.title = title;
        this.content = content;
        this.relatedQuestions = Arrays.asList("How to reset password?", "I forgot my password", "Help, I can’t find my account"); // Adding metadata for context
    }
}
```
x??

---


#### Evaluating Retrieval Solutions
Evaluating a retrieval solution involves considering various factors such as supported retrieval mechanisms, embedding models and vector search algorithms, scalability, indexing time, query latency, and pricing.
:p What key factors should be considered when evaluating a retrieval solution?
??x
When evaluating a retrieval solution, consider the following key factors:
- Supported retrieval mechanisms (e.g., hybrid search)
- Embedding models and vector search algorithms used
- Scalability in terms of data storage and query traffic
- Time to index data and ability to process bulk additions or deletions
- Query latency for different retrieval algorithms
- Pricing structure based on document/vector volume or query volume

These factors help ensure that the chosen solution meets specific needs, such as handling large volumes of data and providing fast response times.
```java
// Example pseudo-code for evaluating a retrieval solution in Java
public class RetrievalSolutionEvaluator {
    public void evaluate(String[] factors) {
        // Logic to assess each factor
        System.out.println("Evaluating retrieval mechanism: " + factors[0]);
        System.out.println("Supported vector search algorithms: " + factors[1]);
        // Additional logic for other factors
    }
}
```
x??

---

---


#### Multimodal RAG
Multimodal Retrieval-Augmented Generation (RAG) extends traditional RAG systems by incorporating non-textual data, such as images and videos. This approach enriches the context for the model to generate more informative responses. The retriever can fetch both textual information and visual content relevant to a query.

:p How does multimodal RAG enhance text-based RAG?
??x
Multimodal RAG enhances traditional text-based RAG by integrating image data with text. When a query is made, the system retrieves not only relevant text but also images that might help in understanding or answering the query better. For example, if asked about the color of a house from a specific movie like "Up," an image of the house can be fetched to aid the model's response.

```r
# Example: Using CLIP for multimodal retrieval
library(clip)
# 1. Generate embeddings for all texts and images
embeddings <- clip::generate_embeddings(data $texts, data$ images)

# 2. Given a query, generate its embedding
query_embedding <- clip::generate_query_embedding(query)

# 3. Retrieve relevant data based on the similarity of embeddings
relevant_data <- db.query(embeddings = query_embedding)
```
x??

---


#### Retrieval from Tabular Data
Retrieving data from structured formats like tables is essential in many applications, particularly those involving databases or tabular datasets. This involves generating a SQL query based on the user's text input and executing it to retrieve relevant data.

:p How does retrieval work when dealing with tabular data?
??x
When dealing with tabular data, the retrieval process involves understanding the structure of the tables and generating an appropriate SQL query to fetch relevant information. For example, if asked about the number of units sold for a specific product in the last 7 days, the system needs to query a table containing sales data.

```r
# Example: SQL query generation and execution for tabular data retrieval
library(DBI)
library(RSQLite)

# Assuming there is an SQLite database connection
conn <- dbConnect(RSQLite::SQLite(), ":memory:")

# Insert sample data into the Sales table
sales_data <- data.frame(
  OrderID = c(2044, 3492, 2045),
  Timestamp = as.Date(c("2023-10-01", "2023-10-02", "2023-10-03")),
  ProductID = c(1001, 1002, 1003),
  UnitPrice = c(10.99, 25, 18),
  Units = c(1, 2, 1)
)

dbWriteTable(conn, "Sales", sales_data)

# Generate and execute the SQL query
query <- "SELECT SUM(units) AS total_units_sold FROM Sales WHERE product_name = 'Fruity Fedora' AND timestamp >= DATE_SUB(CURDATE(), INTERVAL 7 DAY);"
result <- dbGetQuery(conn, query)

print(result)
```
x??

---


#### Text-to-SQL Conversion for Tabular Data Retrieval
Text-to-SQL conversion is a process where the system takes user queries in natural language and converts them into SQL queries. This step is crucial for interacting with databases that store structured data.

:p What is the role of text-to-SQL conversion in RAG systems dealing with tabular data?
??x
Text-to-SQL conversion plays a vital role by translating user queries from natural language to SQL queries, enabling efficient and accurate retrieval of data from tables. This process involves understanding the semantics of the query and mapping it to an appropriate SQL structure.

```r
# Example: Text-to-SQL conversion for RAG systems with tabular data
library(sqlparser)

query_text <- "How many units of Fruity Fedora were sold in the last 7 days?"
sql_query <- text_to_sql(query_text, schema = "Sales")

print(sql_query)
```
x??

---


#### Overview of Agents
Background context explaining the concept. The term agent has been used in various engineering contexts, including software agents, intelligent agents, user agents, conversational agents, and reinforcement learning agents. An agent is anything that can perceive its environment through sensors and act upon it through actuators.
:p What defines an agent?
??x
An agent is defined as something that can perceive its environment through sensors and act upon that environment through actuators. This means the agent has a specific environment in which it operates and a set of actions it can perform based on that environment.
x??

---


#### Agent Environment and Actions
Background context explaining how an agent's environment and actions are related. The environment determines what tools an agent can potentially use, while the tool inventory restricts the environment an agent can operate within.
:p How does the environment affect an agent's capabilities?
??x
The environment affects an agent’s capabilities by defining its operational domain and the set of possible actions it can take. For example, a chess-playing agent operates in a chess game environment where only valid chess moves are allowed as actions.
x??

---


#### RAG System Actions
Background context explaining that a RAG system has multiple actions for query processing, such as response generation, SQL query generation, and execution. The example given is about projecting sales revenue for Fruity Fedora over three months.
:p What are the key actions in a RAG system?
??x
A RAG system performs several key actions: response generation, SQL query generation, and SQL query execution. For instance, to project future sales revenue for Fruity Fedora, the agent would generate an appropriate SQL query to retrieve historical data and then execute that query.
x??

---


#### Agent's Failures
Background context explaining that agents have new modes of failures due to their complex operations involving tools and planning. Evaluating agents is crucial to catch these failures.
:p What are some challenges in evaluating AI agents?
??x
Evaluating AI agents involves catching the new modes of failure that arise from their complex operations, which include the use of various tools and detailed planning processes. Ensuring that an agent can handle unexpected scenarios and provide accurate results is essential.
x??

---

