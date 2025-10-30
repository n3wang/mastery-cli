# High-Quality Flashcards: 2A004---Hands-On-Large-Language-Models_processed (Part 18)

**Rating threshold:** >= 8/10

**Starting Chapter:** Reranking

---

**Rating: 8/10**

#### Fine-Tuning Process for Embeddings
Background context explaining how fine-tuning embeddings helps improve search relevance. The process involves moving relevant queries closer to a document and irrelevant queries farther away from it.
:p What is the primary goal of fine-tuning embeddings in semantic search?
??x
The primary goal is to enhance the similarity between embeddings of relevant queries and the documents they are querying about, while increasing the dissimilarity between irrelevant queries and the same documents. This process refines the model’s understanding of relevance based on the provided examples.
x??

---

#### Reranking in Search Systems
Explanation of how reranking improves search results by reordering shortlisted search results based on their relevance to a query. Provides an example using Cohere's Rerank endpoint.
:p How does reranking improve search results?
??x
Reranking improves search results by taking a list of ranked documents and reordering them based on their actual relevance to the user’s query. This process ensures that more relevant documents appear higher in the ranking, enhancing the overall quality of the search experience.

Example using Cohere's Rerank endpoint:
```python
query = "how precise was the science"
results = co.rerank(query=query, documents=texts, top_n=3, return_documents=True)
for idx, result in enumerate(results.results):
    print(idx, result.relevance_score, result.document.text)
```
x??

---

#### Two-Stage Search Pipeline
Explanation of a two-stage search pipeline where the first stage retrieves shortlisted results and the second stage reranks them. Describes how hybrid search can be used in the first stage.
:p What are the two stages of a search pipeline that improve search relevance?
??x
The two stages of a search pipeline are:
1. **First Stage (Retrieval)**: This stage retrieves a shortlist of relevant documents using keyword search, dense retrieval, or hybrid methods.
2. **Second Stage (Reranking)**: This stage takes the top results from the first stage and reorders them based on their relevance to the query.

Example using keyword search followed by reranking:
```python
def keyword_and_reranking_search(query, top_k=3, num_candidates=10):
    # Keyword Search
    bm25_scores = bm25.get_scores(bm25_tokenizer(query))
    top_n = np.argpartition(bm25_scores, -num_candidates)[-num_candidates:]
    bm25_hits = [{'corpus_id': idx, 'score': bm25_scores[idx]} for idx in top_n]
    bm25_hits = sorted(bm25_hits, key=lambda x: x['score'], reverse=True)
    
    # Reranking
    docs = [texts[hit['corpus_id']] for hit in bm25_hits]
    results = co.rerank(query=query, documents=docs, top_n=top_k, return_documents=True)
    for hit in results.results:
        print(f"\t{hit.relevance_score}\t{hit.document.text.replace(' ', '')}")
```
x??

---

#### Relevance Scoring Example
Explanation of how a reranker assigns scores to search results based on relevance. Provides an example with output.
:p How does the reranker assign relevance scores?
??x
The reranker assigns relevance scores to documents based on their match to the query, with higher scores indicating greater relevance.

Example:
```python
query = "how precise was the science"
results = co.rerank(query=query, documents=texts, top_n=3, return_documents=True)
for idx, result in enumerate(results.results):
    print(idx, result.relevance_score, result.document.text.replace(' ', ''))
```
Output shows that the reranker is more confident about the first result:
0 0.1698185 It has also received praise from many astronomers for its scien- tific accuracy and portrayal of theoretical astrophysics
1 0.07004896 The film had a worldwide gross over $677 million (and $773 mil- lion with subsequent re-releases), making it the tenth-highest grossing film of 2014
2 0.0043994132 Caltech theoretical physicist and 2017 Nobel laureate in Phys- ics[4] Kip Thorne was an executive producer, acted as a scientific consultant, and wrote a tie-in book, The Science of Interstellar
x??

---

#### Benefits of Reranking
Explanation of the benefits of adding reranking to existing search systems. Provides details on performance improvements.
:p What are the key benefits of incorporating reranking in a search system?
??x
The key benefits of incorporating reranking in a search system include:
1. **Improved Search Quality**: By reordering results based on relevance, the user is more likely to see relevant content higher up in the rankings.
2. **Performance Enhancements**: On benchmarks like MIRACL, rerankers can boost performance significantly, as seen with an improvement from 36.5 to 62.8 measured by nDCG@10.

Example on a multilingual benchmark:
```python
# Example usage in a multilingual setting
reranker = co.Reranker()
results = reranker.rank(query="how precise was the science", documents=texts, top_n=3)
for idx, result in enumerate(results.results):
    print(idx, result.relevance_score, result.document.text.replace(' ', ''))
```
x??

---

#### Open Source Retrieval and Reranking with Sentence Transformers
Explanation of using Sentence Transformers for setting up local retrieval and reranking systems. Provides a link to the documentation.
:p How can one set up local retrieval and reranking systems using Sentence Transformers?
??x
One can set up local retrieval and reranking systems using the Sentence Transformers library by following the setup instructions provided in the documentation.

Documentation link:
https://oreil.ly/jJOhV

Example code for setting up a reranker:
```python
from sentence_transformers import SentenceTransformer, util
model = SentenceTransformer('all-MiniLM-L6-v2')

query_embedding = model.encode("how precise was the science")
text_embeddings = model.encode(texts)

# Find the closest 3 sentences of the corpus for each query sentence based on cosine similarity
top_k = 3
cosine_scores = util.cos_sim(query_embedding, text_embeddings).cpu().numpy()
ranked_results = []
for score in cosine_scores:
    top_results = np.argpartition(score, -top_k)[-top_k:]
    ranked_results.append(top_results)
```
x??

**Rating: 8/10**

#### Mean Average Precision (MAP)
Background context explaining the concept. MAP is a metric used to evaluate the performance of information retrieval systems by considering the average precision score for every query in the test suite. It provides a single numerical value that allows for comparisons between different search systems.
:p What is mean average precision (MAP)?
??x
Mean Average Precision (MAP) takes into account the average precision scores for each query within the test suite and averages them to produce a single metric, which can be used to compare various search systems. This approach helps in evaluating how well a system ranks relevant documents relative to irrelevant ones.
```python
def calculate_map(relevance_scores):
    # relevance_scores is a list of (query_id, score) tuples
    map_score = 0
    for i, (query_id, score) in enumerate(relevance_scores, start=1):
        precision_at_i = sum(score > s[1] for s in relevance_scores[:i]) / i
        map_score += precision_at_i
    return map_score / len(set(query_id))
```
x??

---

#### Normalized Discounted Cumulative Gain (nDCG)
Background context explaining the concept. nDCG is another metric used to evaluate search systems, taking into account the relevance of documents in a more nuanced manner than binary relevance (relevant or not relevant). This metric considers how much each document contributes to the overall gain.
:p What is normalized discounted cumulative gain (nDCG)?
??x
Normalized Discounted Cumulative Gain (nDCG) is an evaluation metric for search systems that accounts for the varying levels of relevance among documents, providing a more nuanced comparison than binary relevance. It discounts lower ranked items less and considers how much each document contributes to the overall gain.
```python
def calculate_ndcg(relevance_scores, ideal_relevance_scores):
    # relevance_scores is a list of (query_id, doc_id, score) tuples
    dcg = 0
    idcg = sorted(ideal_relevance_scores, reverse=True)
    
    for i in range(len(relevance_scores)):
        score = relevance_scores[i][2]
        ideal_score = idcg[i]
        dcg += (2**score - 1) / np.log2(i + 2)
        idcg_val = (2**ideal_score - 1) / np.log2(i + 2)
    
    if not idcg:
        return 0
    else:
        return dcg / max(0, idcg[-1])
```
x??

---

#### Retrieval-Augmented Generation (RAG)
Background context explaining the concept. RAG combines search capabilities with generation capabilities to improve the factuality and accuracy of responses generated by LLMs. It involves two steps: a retrieval step where relevant documents are retrieved from a knowledge base, followed by a grounded generation step where an LLM is prompted to generate a response based on the retrieved information.
:p What is Retrieval-Augmented Generation (RAG)?
??x
Retrieval-Augmented Generation (RAG) is a method that enhances the performance of LLMs by integrating search capabilities. It involves two steps: first, retrieving relevant documents from a knowledge base using a search step, and then generating responses grounded in the retrieved information via a generation step. This approach helps reduce hallucinations and improves factuality.
```python
def rag_pipeline(query, knowledge_base):
    # Step 1: Search for relevant documents
    retrieved_docs = search_knowledge_base(query)
    
    # Step 2: Grounded generation using LLM
    context = prepare_context(retrieved_docs)
    answer = generate_answer(context, query)
    
    return answer
```
x??

---

#### Generative Search with RAG
Background context explaining the concept. In a generative search system that uses RAG, the question is presented to an LLM along with the top retrieved documents from the previous step of the search pipeline. The LLM then generates an answer based on this context.
:p How does generative search work in the context of RAG?
??x
In the context of RAG, a generative search system works by first using a search engine to retrieve relevant documents for a given query. These retrieved documents are then presented as context to an LLM, which generates a response based on this information. This grounded generation step helps ensure that the generated answer is factually correct and aligned with the provided context.
```python
def generative_search(query):
    # Step 1: Search for relevant documents
    retrieved_docs = search_knowledge_base(query)
    
    # Step 2: Grounded generation using LLM
    context = prepare_context(retrieved_docs)
    answer = generate_answer(context, query)
    
    return answer
```
x??

---

#### Embeddings and Semantic Search
Background context explaining the concept. The use of embeddings in semantic search involves converting text into numerical vectors to enable similarity comparisons. By comparing the embeddings of input queries with those of documents or other data points, relevant information can be identified.
:p How does embedding-based semantic search work?
??x
Embedding-based semantic search converts textual data into numerical vectors that capture the meaning and context of the text. This allows for efficient comparison and identification of similar content by calculating vector similarities. The process involves two main steps: generating embeddings for both queries and documents, followed by comparing these embeddings to find the most relevant documents.
```python
def semantic_search(query_embedding, document_embeddings):
    # Calculate cosine similarity between query and each document embedding
    similarities = [cosine_similarity(qe, de) for qe, de in zip(query_embedding, document_embeddings)]
    
    # Find the index of the highest similarity score
    most_relevant_doc_index = np.argmax(similarities)
    
    return most_relevant_doc_index
```
x??

**Rating: 8/10**

#### Query Rewriting
Background context explaining how query rewriting helps RAG systems, especially chatbots. It involves transforming verbose user queries into more precise ones to improve retrieval accuracy.

:p What is the primary purpose of query rewriting in RAG systems?
??x
The primary purpose of query rewriting in RAG systems is to transform verbose or complex user queries into simpler and more precise queries that can be effectively processed by the retrieval system. This enhances the accuracy and relevance of the search results, making the overall conversation more efficient.

Example:
User Question: "We have an essay due tomorrow. We have to write about some animal. I love penguins. I could write about them. But I could also write about dolphins. Are they animals? Maybe. Let's do dolphins. Where do they live for example?"

Rewritten Query: "Where do dolphins live"

??x
The rewritten query is more direct and focused, making it easier for the retrieval system to find relevant information.

---
#### Multi-query RAG
Background context explaining how multi-query RAG extends single query rewriting by allowing the system to handle multiple queries if needed. This approach improves the chances of finding accurate and complete answers.

:p How does multi-query RAG differ from single-query RAG?
??x
Multi-query RAG differs from single-query RAG in that it handles cases where a single query is insufficient to answer a user's question comprehensively. Instead, multiple queries are generated based on different parts or aspects of the original question. This approach increases the likelihood of finding relevant information across different documents.

Example:
User Question: "Compare the financial results of Nvidia in 2020 vs. 2023"

Queries Generated:
- Query 1: “Nvidia 2020 financial results”
- Query 2: “Nvidia 2023 financial results”

??x
By generating multiple queries, the system can gather more detailed and comprehensive information from various sources.

---
#### Multi-hop RAG
Background context explaining how multi-hop RAG is used for sequential or follow-up queries to handle complex questions that require several steps of reasoning. It involves breaking down a question into smaller parts and searching sequentially for each part.

:p How does multi-hop RAG address complex user questions?
??x
Multi-hop RAG addresses complex user questions by breaking them down into simpler, sequential sub-questions (hops). This method allows the system to gather information step-by-step, ensuring that all necessary details are considered before generating a final response. Each hop builds upon the results of previous hops, leading to more accurate and comprehensive answers.

Example:
User Question: "Who are the largest car manufacturers in 2023? Do they each make EVs or not?"

Hops:
1. Step 1, Query 1: “largest car manufacturers 2023”
   - Results: Toyota, Volkswagen, Hyundai

2. Step 2, Query 1: "Toyota Motor Corporation electric vehicles"
   - Result: Yes

3. Step 2, Query 2: "Volkswagen AG electric vehicles"
   - Result: Yes

4. Step 2, Query 3: "Hyundai Motor Company electric vehicles"
   - Result: Yes

??x
By breaking down the question into smaller parts and addressing each part sequentially, multi-hop RAG ensures that all aspects of the user's query are thoroughly addressed.

---
#### Query Routing
Background context explaining how query routing allows the model to search multiple data sources based on the nature of the question. This improves the relevance of the search results by leveraging specific databases or systems for particular types of queries.

:p How does query routing enhance RAG performance?
??x
Query routing enhances RAG performance by enabling the system to search different data sources depending on the type of information requested. For example, if a user asks about HR-related information, the model can be directed to search an HR information system like Notion, while questions related to customer data would be routed to a CRM system such as Salesforce.

Example:
If the question is: "How many employees are in the marketing department?"

The query routing could instruct the system to search within the company’s HR information system (Notion) for this specific information.

??x
By directing queries to appropriate systems, query routing ensures that the relevant and most accurate data is retrieved, improving the overall performance of RAG systems.

