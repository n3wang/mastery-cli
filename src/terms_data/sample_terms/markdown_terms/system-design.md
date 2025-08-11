# System Design

System design concepts and principles for distributed systems and software architecture.

## Load Balancing Algorithms

Load balancing refers to efficiently distributing incoming network traffic across a group of backend servers, also known as a server farm or server pool.

:p When would it be useful to have Load balancing going on?

## Round Robin

Requests are distributed across the group of servers sequentially. 
Round robin load balancing is a load balancing technique that cyclically forwards client requests via a group of servers to effectively balance the server load. It works best when these servers have similar computational and storage capabilities.

:p When should u use this?

## Weighted Server

The weighted round robin load balancing approach is based on the round robin load balancing method. In a weighted round robin, the network administrator assigns a pre-set numerical weight to each server in the pool. The most efficient and top-performing server is given a weighted score of 100. A server with half the processing capability is given a weight of 50, and so on for the rest of the farm's servers.

:p What if I have weight 75 and 25?

## Micro-frontends

The micro frontend approach makes it possible to delay loading these other modules until they are required to speed up performance across your site. 

Benefits: Performance, Faster Feature Rollouts, Reusabiility of code, Technology Agnotism.

MFE Standards:
- Indenpendece: Each application provides its own development experience, and each will build, version, and release distinctly apart from each other. 
- Composition: should be manageable by a reasonably small development team. This composition should support horizontal scaling of UI development to many teams and allow engineers to avoid organizational bottlenecks to feature delivery.
- Isolation: In the context of a build and dependency resolution system, this means each application is free to bundle and depend on its own set of libraries and frameworks. 
- Automation.

:p How could I use Micro front end in one of my current projects, how about in life?

## Continuous Integration

Developers practicing continuous integration merge their changes back to the main branch as often as possible. The developer's changes are validated by creating a build and running automated tests against the build. By doing so, you avoid integration challenges that can happen when waiting for release day to merge changes into the release branch.

Continuous integration puts a great emphasis on testing automation to check that the application is not broken whenever new commits are integrated into the main branch.

What you need (cost) - Your team will need to write automated tests for each new feature, improvement or bug fix. You need a continuous integration server that can monitor the main repository and run the tests automatically for every new commits pushed. Developers need to merge their changes as often as possible, at least once a day.

What you gain: Less bugs get shipped to production as regressions are captured early by the automated tests. Building the release is easy as all integration issues have been solved early. Less context switching as developers are alerted as soon as they break the build and can work on fixing it before they move to another task. Testing costs are reduced drastically – your CI server can run hundreds of tests in the matter of seconds. Your QA team spends less time testing and can focus on significant improvements to the quality culture.

:p How could you apply Continuous Integration into Business or Academic Fields? (Or on ur personal project? Or design one architecture that accets that

## Continuous Delivery

Continuous delivery is an extension of continuous integration since it automatically deploys all code changes to a testing and/or production environment after the build stage. 

What you need (cost): You need a strong foundation in continuous integration and your test suite needs to cover enough of your codebase.Deployments need to be automated. The trigger is still manual but once a deployment is started there shouldn't be a need for human intervention. Your team will most likely need to embrace feature flags so that incomplete features do not affect customers in production. What you gain: The complexity of deploying software has been taken away. Your team doesn't have to spend days preparing for a release anymore.  You can release more often, thus accelerating the feedback loop with your customers. There is much less pressure on decisions for small changes, hence encouraging iterating faster.

:p Define the difference between continuous integration and continuous delivery.

## Ringelmann Effect

The Ringelmann effect is the tendency for individual members of a group to become increasingly less productive as the size of their group increases

This effect, discovered by French agricultural engineer Maximilien Ringelmann (1861–1931), illustrates the inverse relationship that exists between the size of a group and the magnitude of group members' individual contribution to the completion of a task

:p How could you use Ringelman Effect in business? How could you design a model to take advantage of this fact?

## Fault Tolerance

the ability of a system to perform well despite some failures in the system.

For example, suppose some of the hundreds of thousands of servers serving Youtube videos stop working. In that case, you will still be able to enjoy watching videos because of Youtube's ability to continue its operation without any terrible user experience.

:p How could you improve the current Fault Tolerance of your project?

## Availability

A System is said to be available if it is operational Availability refers to the percentage of time that the infrastructure, system, or solution remains operational under normal circumstances in order to serve its intended purpose. Highly available systems are reliable in the sense that they continue operating even when critical components fail. They are also resilient, meaning that they are able to simply handle failure without service disruption or data loss, and seamlessly recover from such failure.

:p What would be the availability percentage of your current project?

## Reliability

Reliability is the probability that a system will remain available for use during a period.

Today every major company invests heavily to achieve some, if not total, reliability. For example, when you upload a photo on Facebook or Instagram, several copies of that data are stored at several locations to ensure that the image is not lost if some system failure occurs. Read in detail ❤️‍🔥.

:p Whats the difference between reliability and availability?

**Example:** Availability is a measure of the percentage of time that an IT service or component is in an operable state. Reliability, on the other hand, is a measure of the probability that the system will meet defined performance standards in performing its intended function during a specified interval.

## Scalability

Scalability is the ability of a system to increase or decrease performance or cost depending on the demand. A system may need to scale when it needs more data storage or processing power.

**Link:** https://medium.com/swlh/6-best-ways-to-scale-your-systems-590c901e6d7

:p When scalability becomes important? | 
Design s scalable system (it can be for business, for software, for your current project)
You can use outsourcing,  standarization, Assets,

As for software: Memory Chaching, Database Sharding, CQRS, Splitting Services, Horizontal Splitting

## Vertical Scaling vs Horizonal scalling

:p Whats the difference?

**Example:** a. Vertical Scaling  When you add more storage, RAM, GPU power, and CPU to an existing system you have, it is called Scaling Vertically. 

b. Horizontal Scaling  When you scale by adding more nodes/servers to tackle increased demands, that's called horizontal scaling.

## Redundanacy & Replication

To increase the reliability of a system in case of failures, duplication of resources is performed; this is called achieving redundancy. Having multiple copies of some resources assures us that others can work as a backup if one system has trouble. Redundancy also reduces loads on resources by distributing them over duplicate systems.  Replication is the process of making consistent copies of resources, be it software or hardware, to increase reliability, and fault tolerance, reduce latency, or increase accessibility.

:p Why they are useful? What are their advantages?

## Proxies

Proxies are used to cache requests and responses to serve the clients if multiple requests are made for the same web page or file; they protect you from hackers or any snooper who may want to track your online activity. Proxies are also used to limit access to resources; for example, in places like colleges, hospitals, etc., you cannot use their wifi to access certain websites.

:p How could you use Proxies in Maid CLI (or other current project?)

## Data Partitioning

partitioning horizontally means dividing a large table into multiple tables (by rows), also known as sharding. Whereas vertical partitioning is dividing a table based on columns, for example, a school record of students can be divided into a table storing students' names, I.D.s, etc., and different table may store their addresses.
if you divide a table into very small chunks, it leads to complex join operations.
If you added a record using a hash function depending on the number of partitions, and later when you add or remove a partition, all of the data needs to be redistributed with the updated hash function.

:p Advantages of partitioning Horizontally vs Vertically?

**Attachment:** ./img/2023-02-07-10-29-38.png

## Indexing

As a database grows, the time to fetch a record also increases. Indexing is a technique used to substantially reduce the access time by creating a separate table based on one or more columns of a database. Such a table is called an index; it is sorted and has a pointer pointing to a record in the actual database.

:p how fast can this indexes mean?

## ACID Properties

Atomicity: Entire transaction will occur at once or doesn't happen at all.
Consistency: Integrity should be maintained so that the database is consistent before and after the transaction.
Isolation: Multiple transactions can take place at once without affecting each other.
Durability: Once a transaction is successful, all the updates and modifications persist in the database.

:p What are their advantages? | Sumarize ACID Properties | How could they be used to refactor/business/UX Design? | What examples can you find?

**Example:** ACID compliance offers multiple benefits: Data integrity. Using ACID-compliant systems guarantees your data will be accurate, valid, and in line with the constraints you impose on the system. Simplified operational logic
Database systems that rely on ACID transactions are usually slower at read and write operations, because of the locking mechanism.

## BASE Properties

Regarding NoSQL databases, where consistency and correctness are not that big of an issue, but performance and scalability are, BASE properties make more sense.
Basic Availability: The database is available most of the time.
Soft-State: When storing new data, not all replicas have to be updated instantly, nor do they have to be write-consistent.
Eventual-Consistency: Eventually, stores are updated everywhere to make the database consistent.

:p When to use BASE properties vs ACID ? What are the advantages and disadvatanges in comparison?

**Example:** Marketing and customer service companies who deal with sentiment analysis will prefer the elasticity of BASE when conducting their social network research. Social network feeds are not well structured but contain huge amounts of data which a BASE-modeled database can easily store.
Financial institutions will almost exclusively use ACID databases. Money transfers depend on the atomic nature of ACID. 
An interrupted transaction which is not immediately removed from the database can cause a lot of issues. Money could be debited from one account and, due to an error, never credited to another.

## CAP Theorem

CAP theorem states that while designing a distributed system, we can only have two out of three guarantees: Consistency, Availability, and Partition Tolerance (CAP).
Consistency: all the systems in a distributed environment see the same data at any time.
Availability: For every request, there is going to be a response of success/failure.
Partition Tolerance: The system continues to work even when a few of the nodes of the distributed system stop working.

:p How would you rate your current application in the CAP Theorem framework's axis?

## Consistent Hashing

This is where the consistent hashing technique is helpful to save us from remapping all the keys of the system and distributing them evenly. This method maps the nodes to specific integers within a range (say [0, 255]) using a hash function. This will be a circular structure starting from 0 to 255. Then we map the keys to some integer of the range and use the next available server on the ring.
To distribute the keys evenly to all the nodes in the system, replicate the nodes to multiple ring parts.

**Link:** https://www.youtube.com/watch?v=UF9Iqmg94tk
**Attachment:** ./img/2023-02-07-11-49-30.png

:p What services use this? | Explain how this works in your own words?

**Example:** Dynamo DB: Data Partitioning, 

and could advantages from this: Content Delivery Networks: Distribute Web contents Evenly
 Load balancers:: Distributed Persistent connections evenly.

## Sharding

Sharding is a technique used to divide data into multiple smaller parts known as shards (Horizontal partitioning). These shards are not only smaller but faster and more manageable.

:p How does sharding work? EOWords | How could u use sharding in your current project? | What are their advantage and disadvantages?

**Example:** application-visible sharding policy using relational databases… 
 Advantages:      If your shard key is well-chosen, and the machinery for getting apps to connect to the right shard instance for a given piece of data is well-done, you can scale your world basically infinitely. If you are going to have a multi-petabyte relational db world, you have to shard.     Sharding also allows your individual instances to not be overly huge, reducing performance and general instance management issues.     Lots of shards mitigate problems that affect individual instances. With one huge DB, an outage takes the whole site down. With 100 shards, a single-instance outage affects only 1% of your dataworld. 

 Disadvantages:      Shards can be complicated to get right, particularly if your shard key isn't obvious.     You occasionally have to worry about splitting shards, or very occasionally about merging shards. This can be quite complicated.     Applications need to be aware of the details of database organization, at least at some level.     Joins across shards are not easily doable. If you need to do cross-shard joining, you probably need a data warehouse or some type of alternate reporting dataworld. Wherever possible, you should restrict "galactic" reporting to joins that can be done within shards and "merged" by applications above the db, or by sending the bits of data (audit tables, etc) to the reporting world and running reports ther

## Long polling

Long polling is different from traditional polling as the server does not have to respond immediately; it accepts the request and lets the client know once the data is ready. This way, the client does not have to keep requesting new data and gets an empty response if no update is available.

:p What are the advantages or disadvantages of Long Polling? | How could u use this in a Dog and Cats Images API ? How about in an AI model (or your porjject)

**Example:** Long polling advantages      Long polling is implemented on the back of XMLHttpRequest, which is near-universally supported by devices so there's usually little need to support further fallback layers.     In cases where exceptions must be handled though, or where a server can be queried for new data but does not support long polling (let alone other more modern technology standards), basic polling can sometimes still be of limited use, and can be implemented using XMLHttpRequest, or via JSONP through simple HTML script tags.

Long polling disadvantages      Long polling is more resource intensive on the server than a WebSocket connection.     Long polling can come with a latency overhead because it requires several hops between servers and devices. Gateways often have different ideas of how long a typical connection is allowed to stay open, so sometimes close while processing is still underway.     Reliable message ordering can be an issue with long polling because it is possible for multiple HTTP requests from the same client to be in flight simultaneously. For example, if a client has two browser tabs open consuming the same server resource, and the client-side application is persisting data to a local store such as localStorage or IndexedDb, there is no in-built guarantee that duplicate data won't be written more than once.     Depending on the server implementation, confirmation of message receipt by one client instance may also cause another client instance to never receive an expected message at all, as the server could mistakenly believe that the client has already received the data it is expecting.

## Web Sockets

Using WebSockets, a bi-directional communication also known as a duplex is possible between a client and a server. A client creates a connection using what is known as a WebSocket handshake. Once the connection is successful, communication can occur between the parties without much overhead and frequent authentication.

:p Why it has this advantages? When could this be used?

**Example:** This can be used for: Real time Feeds, Real Time Multiplayer Gaming, Collaborative Editing, Data Visualization, Multimedia Chat, Real Time Location, Real Time Recommendation Clicking., Real time Sports: Streaming, Event Updates (w input)

## Server-Sent Events

In this protocol, once a connection is established between a client and a server, the server can send frequent data any time using the connection, but the client will need another protocol to send any data to the server. This is useful in scenarios where a server needs to send data continually once a client creates a connection.

:p Whats the difference between this and Web Sockets?

## Aggregation

:p How is it symbolized? What does it mean? Make an example when you would be using this

## system design

:p How would you design an Photo App?

**Example:** (1) Do you have a real life example? Whats the audience?

## garbage collection

is a dynamic technique for memory management and heap allocation that examines and identifies dead memory blocks before reallocating storage for reuse. Garbage collection's primary goal is to reduce memory leaks.

:p What is this | in which language are they found?

:p Garbage collection (GC) is a memory recovery feature built into programming languages such as C# and Java.