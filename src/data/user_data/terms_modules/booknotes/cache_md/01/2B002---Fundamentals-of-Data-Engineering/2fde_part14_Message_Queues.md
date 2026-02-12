# High-Quality Flashcards: 2B002---Fundamentals-of-Data-Engineering_processed (Part 14)


**Starting Chapter:** Message Queues and Event-Streaming Platforms

---


#### Data Sharing and Data Mesh

Background context: Data sharing can streamline data pipelines within an organization by allowing units to manage their data selectively, while still maintaining control over compute and query costs. This approach facilitates decentralized data management patterns such as data mesh.

:p What is the primary benefit of data sharing in organizations?
??x
The main benefit of data sharing is that it allows different units within an organization to manage their own data independently, share relevant information with other departments when necessary, and facilitate a more flexible and scalable architecture. This approach can lead to better utilization of resources and improved efficiency.
x??

---

#### Data Mesh

Background context: Data mesh involves decentralized data management where individual business domains have ownership over specific datasets. It emphasizes the use of common components to enable efficient data exchange and expertise sharing.

:p What is data mesh?
??x
Data mesh is a distributed data architecture that decentralizes data management by giving different business units or domains control over their own data assets. Each domain owns its data, and there are clear interfaces for data consumption and production.
x??

---

#### Third-Party Data Sources

Background context: Companies increasingly want to make their data available to customers and users, creating a "flywheel" effect where more data leads to better application integration and further data collection.

:p Why do companies make their data available?
??x
Companies make their data available because it encourages user adoption and usage. When users can integrate third-party data into their applications, they gain access to richer datasets, which in turn drives greater data volume. This cycle of increased data leads to more sophisticated applications, creating a flywheel effect that benefits both the company providing the data and its customers.
x??

---

#### APIs for Data Access

Background context: APIs are commonly used for direct third-party data access, enabling deep integration capabilities.

:p What is an API?
??x
An API (Application Programming Interface) is a set of rules and protocols for building software applications. It allows different software systems to communicate with each other. APIs often provide the means to pull and push data between systems, facilitating seamless integration.
x??

---

#### Message Queues

Background context: Message queues are used in event-driven architectures as mechanisms to asynchronously send small pieces of data (messages) between discrete systems.

:p What is a message queue?
??x
A message queue is an asynchronous communication mechanism that allows sending and receiving small messages between different systems using a publish-subscribe model. Data is published to the queue, and subscribers receive it based on their subscription criteria.
x??

---

#### Event-Streaming Platforms

Background context: Event-driven architectures use event-streaming platforms for near real-time analytics and data processing.

:p What are event-streaming platforms?
??x
Event-streaming platforms handle continuous streams of events in near real-time. They are crucial in event-driven architectures, where events can trigger work within applications and feed into real-time analytics.
x??

---

#### Practical Details of Message Queues

Background context: Message queues facilitate asynchronous communication by publishing messages that are consumed by subscribers.

:p How does a message queue work?
??x
A message queue works using the publish-subscribe model. Messages are published to the queue, and subscribers receive them based on their subscriptions. The subscriber acknowledges receipt of the message, which removes it from the queue.
```java
public class MessageQueueExample {
    public void sendMessage(String message) {
        // Publish the message to the queue
    }
    
    public void subscribe() {
        // Subscribe to the queue and listen for messages
    }
}
```
x??

---


#### Message Queues and Decoupling
Background context explaining that message queues allow applications and systems to be decoupled from each other, useful in microservices architectures. Message queues buffer messages for load spikes and ensure durability through replication.

:p What are the primary benefits of using message queues?
??x
The primary benefits include decoupling applications and systems, handling transient load spikes, ensuring message delivery durability through a distributed architecture with replication. These features make message queues essential in microservices architectures.
x??

---

#### Message Ordering and Delivery
Background context explaining that the order of messages can significantly impact downstream subscribers. Order guarantees vary depending on the technology used.

:p How does exactly once delivery work in message queues?
??x
Exactly once delivery means a message is sent only once, and after the subscriber acknowledges receipt, the message disappears and won’t be delivered again. This ensures no duplicates but requires idempotent processing of messages.
x??

---

#### Delivery Frequency and Idempotency
Background context explaining that messages can be sent exactly once or at least once, with idempotent systems ensuring consistent outcomes regardless of delivery frequency.

:p What is the significance of idempotency in message handling?
??x
Idempotency ensures that processing a message multiple times has the same outcome as processing it once. This is crucial for managing scenarios where messages might be delivered more than once, such as retries or failures before acknowledgments.
x??

---

#### Scalability and Message Queues
Background context explaining how popular message queues are horizontally scalable, buffering messages to handle load spikes and ensuring durability.

:p How do horizontally scalable message queues contribute to system resilience?
??x
Horizontally scalable message queues can run across multiple servers, allowing them to dynamically scale up or down. They buffer messages when systems fall behind and durably store messages for resilience against failure.
x??

---

#### Event-Streaming Platforms
Background context explaining that event-streaming platforms continue the functionality of message queues but with a focus on passing streams of data rather than just routing messages.

:p What differentiates event-streaming platforms from traditional message queues?
??x
Event-streaming platforms primarily differ in their handling of continuous data streams, focusing on processing and analyzing these streams in real-time. While traditional message queues route messages with specific delivery guarantees, event-streaming platforms handle the flow of events more continuously and often in a streaming fashion.
x??

---


#### Event-Streaming Platform Overview

In an event-streaming platform, data is ingested and processed as a continuous stream of events. These platforms are designed to handle real-time or near-real-time data processing, where messages are retained for a certain period, allowing for message replay from past points in time.

:p What is the primary function of an event-streaming platform?
??x
An event-streaming platform ingests and processes data as a stream of events. It retains these events for a specified duration, enabling replay functionality.
x??

---

#### Topics in Event-Streaming Platforms

Topics in an event-streaming platform are used to group related events. Producers send events to topics, which can be consumed by multiple subscribers.

:p What is the role of a topic in an event-streaming platform?
??x
A topic serves as a collection of related events. Producers stream events to these topics, and multiple consumers can subscribe to them for processing.
x??

---

#### Event Structure

An event consists of three main components: a key, value, and timestamp. These elements provide context and timing information about the event.

:p What are the three main components of an event in an event-streaming platform?
??x
The three main components of an event are:
- Key: Identifies the specific event.
- Value: Contains the data or details of the event.
- Timestamp: Indicates when the event occurred.
x??

---

#### Stream Partitions

Stream partitions divide a stream into multiple streams to enable parallel processing and increase throughput. Messages with the same partition key are guaranteed to be processed together.

:p What is the purpose of stream partitions in an event-streaming platform?
??x
The purpose of stream partitions is to enhance parallelism and improve the throughput of data processing. By dividing the stream, messages with the same partition key are always processed together, ensuring consistency.
x??

---

#### Example Event

An example event for an ecommerce order might look like this:
```json
{
   "Key":"Order # 12345",
   "Value":"SKU 123, purchase price of $100",
   "Timestamp":"2023-01-02 06:01:00"
}
```

:p What is an example event for an ecommerce order in an event-streaming platform?
??x
An example event for an ecommerce order might look like this:
```json
{
   "Key":"Order # 12345",
   "Value":"SKU 123, purchase price of $100",
   "Timestamp":"2023-01-02 06:01:00"
}
```
This event contains:
- Key: Identifies the specific order.
- Value: Details about the items purchased and their total cost.
- Timestamp: The time when the order was placed.
x??

---

#### Subscribers in an Event-Driven System

Subscribers, such as fulfillment and marketing, consume events from topics. Fulfillment uses events to trigger processes, while marketing performs real-time analytics or trains ML models.

:p How do subscribers use events in an event-driven system?
??x
In an event-driven system, subscribers consume events from topics for different purposes:
- Fulfillment: Uses events to trigger and manage the fulfillment process.
- Marketing: Performs real-time analytics on events or trains/uses ML models based on them.
x??

---

#### Order Processing Example

An order-processing system generates events that are published to a topic named `web orders`. Two subscribers—fulfillment and marketing—pull events from this topic.

:p How does the order-processing system work with an event-streaming platform?
??x
The order-processing system works by:
1. Generating events for each order.
2. Publishing these events to a topic called `web orders`.
3. Subscribers, such as fulfillment and marketing, consume these events for different purposes (fulfillment: process orders; marketing: analyze data or train ML models).
x??

---


#### Stream Partitioning
Stream partitioning is a technique used to distribute messages across different partitions based on a chosen partition key. This ensures that related messages are processed together, which can be crucial for maintaining data integrity and performance in distributed systems. The process involves dividing the message ID (or any other chosen key) by the number of partitions and taking the remainder as the partition identifier.

For example:
- If you have 3 partitions and a message with an ID that gives a remainder of 0 when divided by 3, it will be assigned to partition 0.
- Messages that give remainders of 1 and 2 upon division by 3 would be placed in partitions 1 and 2 respectively.

:p What is stream partitioning?
??x
Stream partitioning is a method for distributing messages across multiple partitions based on a chosen key, ensuring related data are processed together. This technique helps manage load distribution and maintain consistency in distributed systems.
x??

---

#### Partition Key Selection
Choosing an appropriate partition key is crucial to avoid hotspotting (where one or few partitions receive disproportionately more traffic). For instance, using a device ID as the partition key for IoT applications ensures that all messages from a particular device are processed by the same server. However, if the distribution of devices across regions is uneven, such as California, Texas, Florida, and New York having significantly more devices than others, the partitions associated with these states might become overloaded.

:p How does one avoid hotspotting in stream partitioning?
??x
To avoid hotspotting, carefully select a partition key that evenly distributes messages. For IoT applications, using device IDs can ensure related data are processed together. However, if geographical distribution is uneven, consider alternative keys to balance the load more effectively.
x??

---

#### Fault Tolerance and Resilience in Event-Streaming Platforms
Event-streaming platforms provide fault tolerance by storing streams across multiple nodes. If a node fails, another takes over without affecting accessibility or data integrity. This ensures that records are not lost and can be reliably ingested and processed even when failures occur.

:p What is the role of fault tolerance in event-streaming platforms?
??x
Fault tolerance in event-streaming platforms ensures that streams remain accessible even if nodes fail. Data ingestion and processing continue without interruption, maintaining reliability and availability.
x??

---

#### Working with Stakeholders in Source Systems
Understanding stakeholders involved in source systems is vital for successful data engineering projects. Typically, two categories of stakeholders are encountered: system stakeholders who build and maintain the source systems (e.g., software engineers), and data stakeholders who own the data (usually IT or data governance groups).

:p Who are the key stakeholders in source systems?
??x
Key stakeholders in source systems include system stakeholders who manage and develop the source systems, and data stakeholders who control access to the data. These roles can sometimes overlap.
x??

---

#### Data Contracts
A data contract is a written agreement between the owner of a source system and the team ingesting the data for use in a data pipeline. It specifies the data being extracted, the method (full or incremental), frequency, and contact details for both parties.

:p What is a data contract?
??x
A data contract is a formal agreement that outlines what data will be extracted from a source system, how often it will be updated, and provides contact information for both the source system owner and the data ingestion team.
x??

---

#### Feedback Loop with Stakeholders
Establishing a feedback loop between data engineers and stakeholders of source systems helps in understanding how data is consumed and used. This ensures that changes or issues in upstream sources are promptly addressed.

:p Why is a feedback loop important for data engineers?
??x
A feedback loop is crucial as it enables data engineers to be aware of any changes or issues in the upstream source data, ensuring they can adapt their systems accordingly.
x??

---


#### Understanding SLAs and SLOs
Background context: Service-Level Agreements (SLAs) are contracts between a provider and customer that define service expectations, including uptime, response times, and other performance metrics. A Service-Level Objective (SLO) measures how well these agreements are met. Establishing clear SLAs and SLOs ensures reliability and quality of data.

:p What is the difference between an SLA and an SLO?
??x
An SLA defines what you can expect from source systems, such as reliable availability and high-quality data. An SLO measures performance against these expectations, like 99 percent uptime for data sources.
x??

---

#### Verbal Setting of Expectations
Background context: When formal SLAs or SLOs seem too rigid, verbal agreements can still be effective in setting expectations with upstream providers about key requirements such as uptime and data quality.

:p How can a data engineer set informal expectations with source system owners?
??x
A data engineer should verbally communicate their needs regarding uptime, data quality, and other critical metrics to the stakeholders of source systems. This verbal agreement ensures that both parties understand each other's requirements.
x??

---

#### Impact of Undercurrents on Source Systems
Background context: Undercurrents refer to underlying factors or practices in source systems (e.g., security, architecture) that can significantly influence data engineering efforts. These undercurrents are often outside the direct control of a data engineer.

:p What does "undercurrents" mean in the context of source systems?
??x
Undercurrents in source systems refer to implicit assumptions about best practices, such as data security, architecture, and DevOps principles that affect how data is generated. These factors can impact data reliability and quality.
x??

---

#### Security Considerations for Source Systems
Background context: Ensuring the security of data within source systems is critical. This includes measures like encryption, secure access methods, and secure handling of credentials.

:p What are some key security considerations when accessing a source system?
??x
Key security considerations include:
- Data being securely encrypted both at rest and in transit.
- Accessing the source system via a virtual private network (VPN) or over a public internet.
- Storing passwords, tokens, and other credentials securely using tools like key managers or password managers.
- Verifying the legitimacy of the source system to prevent malicious data ingestion.

Example code for secure SSH key management:
```python
import getpass

def manage_ssh_keys():
    # Prompt user for password without echoing
    ssh_key_password = getpass.getpass("Enter your SSH key password: ")
    
    # Use a tool like ssh-agent or a key manager to securely store the key
    # Example using an assumed secure method:
    print(f"Your SSH key is now managed securely with {ssh_key_password}.")
```
x??

---

