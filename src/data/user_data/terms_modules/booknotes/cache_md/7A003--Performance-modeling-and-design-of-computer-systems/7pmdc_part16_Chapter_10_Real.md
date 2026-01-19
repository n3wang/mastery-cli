# High-Quality Flashcards: 7A003--Performance-modeling-and-design-of-computer-systems_processed (Part 16)


**Starting Chapter:** Chapter 10 Real-World Examples Google Aloha and Harder Chains. 10.1 Googles PageRank Algorithm

---


#### Importance of Backlinks Not Being Equal
Background context: In Google’s PageRank algorithm, backlinks are used to determine the importance of a web page. However, not all backlinks should be considered equally important.

:p Why would counting all backlinks equally not be a good measure of a page's importance?
??x
Counting all backlinks equally does not account for the quality or significance of each link. A link from a popular and authoritative site (e.g., Yahoo) is more valuable than a link from an obscure personal blog.
x??

---


#### Creation of DTMC for Web Pages
Background context: Google uses a Markov chain to model web surfing behavior, where each state represents a web page and transitions represent clicking from one page to another.

:p What are the steps in creating a DTMC transition diagram for web pages?
??x
1. Create states corresponding to each web page.
2. Draw arrows between states if there is a link from one page to another.
3. Assign probabilities based on the number of outgoing links: if page i has k outgoing links, then each probability is 1/k.

Example:
```java
public class PageRankModel {
    private Map<String, List<String>> linkGraph;
    
    public void buildTransitionDiagram(Map<String, List<String>> linkGraph) {
        this.linkGraph = linkGraph;
        
        for (String page : linkGraph.keySet()) {
            int numOutLinks = linkGraph.get(page).size();
            
            // Assign transition probabilities
            for (String destPage : linkGraph.get(page)) {
                setTransitionProbability(page, destPage, 1.0 / numOutLinks);
            }
        }
    }
    
    private void setTransitionProbability(String from, String to, double prob) {
        // Implement logic to update the transition probability matrix
    }
}
```
x??

---


#### Infinite-State Markov Chains and Generating Functions
Background context: Solving infinite-state Discrete-Time Markov Chains (DTMCs) is challenging due to the lack of a finite number of balance equations. Generating functions can provide a solution for such chains by transforming recurrence relations into closed-form expressions.

:p Why are generating functions useful in solving infinite-state DTMCs?
??x
Generating functions are useful because they convert complex recurrence relations, which might be difficult or impossible to solve directly, into manageable algebraic forms. This allows us to derive closed-form solutions for the limiting probabilities of states.
x??

---


#### Caching Problem
Background context: This problem involves a web server with three pages and caching. The objective is to find the proportion of time that the cache contains certain combinations of pages, and the proportion of requests for cached pages.

:p What are the transition probabilities given in the problem?
??x
The transition probabilities given in the problem are:
$$P_{1,1} = 0$$
$$

P_{1,2} = x$$
$$

P_{1,3} = 1 - x$$
$$

P_{2,1} = y$$
$$

P_{2,2} = 0$$
$$

P_{2,3} = 1 - y$$
$$

P_{3,1} = 0$$
$$

P_{3,2} = 1$$
$$

P_{3,3} = 0$$:p How do you determine the proportion of time that the cache contains certain pages?
??x
To find the proportion of time that the cache contains specific combinations of pages (e.g., {1,2}, {2,3}, {1,3}), we need to analyze the Markov chain transitions and use steady-state probabilities.

:p What is the objective in part (b)?
??x
The objective in part (b) is to find the proportion of requests that are for cached pages. This can be determined by calculating the probability of a request being satisfied from cache.

:x??

---


#### Time to Empty - Part 1
Background context: This problem involves a router where packets increase or decrease in number each step, and we need to compute the expected time and variance for the router to empty.

:p What is the setup of this problem?
??x
The setup involves a Markov chain where at each time step:
- The number of packets increases by 1 with probability $0.4 $- The number of packets decreases by 1 with probability $0.6$ We are interested in the time required for the router to empty, starting from state 1.

:p What is the expression for $E[T_{1,0}]$?
??x
The expected time to get from state 1 to state 0 can be computed using:
$$E[T_{1,0}] = \frac{4}{3}$$:x??

---


#### Time to Empty - Part 2
Background context: This problem is an extension of the previous one but considers a general starting state $n$.

:p What does $T_n,0$ represent?
??x
$T_{n,0}$ represents the time required for the system to get from state $n$ to state 0.

:p How do you compute $E[T_{n,0}]$?
??x
The expected time to empty starting from state $n$ can be computed recursively:
$$E[T_{1,0}] = 2.5$$

For other states, the expected time follows a similar recursive formula derived from the transition probabilities.

:x??

---


#### Processor with Failures
Background context: This problem involves a DTMC that tracks the number of jobs in a system, including processor failures.

:p What does the DTMC shown in Figure 10.10 represent?
??x
The DTMC shown in Figure 10.10 represents a system where:
- The number of jobs can increase or decrease by 1 with probabilities $p $ and$q $- A failure occurs, causing all jobs to be lost, with probability$ r$:p How do you derive the limiting probability for there being i jobs in the system?
??x
The limiting probability $\pi_i$ can be derived using generating functions by solving:
$$\Pi(z) = \sum_{i=0}^{\infty} \pi_i z^i$$

This involves setting up and solving a set of equations based on the transition probabilities.

:x??

---

---

