
/**
 * Introductions to algorithms
 * https://ocw.mit.edu/courses/6-006-introduction-to-algorithms-fall-2011/video_galleries/lecture-videos/
 * 
 * Design and Analysis of Algorithms
 * https://ocw.mit.edu/courses/6-046j-design-and-analysis-of-algorithms-spring-2015/video_galleries/lecture-videos/
 */
const dsa = [
    {
        term: "Heap", prompt: "Re explain one of the advantages of using Heaps",
        description: "Heaps are a specialized tree-based data structure that are used for various purposes such as priority queues, sorting, graph algorithms, and memory management. Here are some advantages and disadvantages of using heaps:\
        \n\
        Advantages:\
        Fast Insertion and Extraction: Heaps have a fast time complexity for insertion and extraction operations, making them suitable for use in situations where elements are frequently added or removed.\
        Efficient Priority Queue: Heaps can be used to implement priority queues, which are used in many algorithms to efficiently extract the element with the highest or lowest priority.\
        Sorting: Heapsort is a comparison-based sorting algorithm that has a time complexity of O(n log n) which is efficient for sorting large datasets.\
        Memory Management: Heaps are used in memory management to allocate memory dynamically to a program at runtime.\Disadvantages:\
        \n\
        Slow Random Access: Heaps are not well suited for random access, as the time complexity for searching for a specific element is O(n)\
        Not Cache-Friendly: Heaps are not cache-friendly, as the elements are not stored contiguously in memory, which can lead to cache misses and slow down the performance of the application.\
        Complexity: Heaps can be complex to implement, especially when compared to simpler data structures such as arrays or linked lists.\
        In summary, heaps have advantages such as fast insertion and extraction, efficient priority queue, sorting, and memory management. However, they also have some disadvantages such as slow random access, not being cache-friendly and complexity to implement. It's worth noting that using Heaps is not always the best option, it depends on the problem and the use case, for instance, if you require random access or cache-friendliness, then you might want to consider other data structures like balanced trees."
    },
    {
        term: "Iteration Generalizations",
        prompt: "How could you use iteration generalizations to solve your most current problem or in previous dsa/projects?",
        description: "\n\
        - If you ran an operation after certain separator, check if at the end of the loop you need to run the operation again because the sep is not htere\n\
        ",
        example: "On calculator iteration, there was no + - in the end(likely) but you still had to add the number generated into the stack. As well as solving all the non-inside parenthesis operations"
    },
    {
        term: "Stack Problems Generalizations",
        prompt: "Think about how you could use stack generalizations to solve your most current problem or in previous dsa/projects?",
        descriptions: "\n\
        - Check if by reordering we can find a better solution (Reverse, Special?)\n\
        - Check what would happen to the logic if things are reordered\n\
        - Does having multiple stack help?\n\
        ",
        example: "On Calculator problem, having the reorderring of the stack made sense because you wouldnt have the issue with minus simbols, when collapsing the parenthesis\n\
        It was also important to consider the effects of multiple stacks."
    },
    {
        term: "Intervals Problems Generalizations",
        prompt: "Think about how you could use intervals generalizations to solve your most current problem or in previous dsa/projects?",
        description: "\n\
        - Check if by sorting either end or start of the range can help\n\
        - If we iterate over the sorted intervals is there a rule we can squeeze to modify a counting value?",
    },
    {
        term: "Linked List Problems Generalizations",
        prompt: "Think about how you could use linked list generalizations to solve your most current problem or in previous dsa/projects?",
        description: "\n\
        - Check EDGE CASES - null input? Larger linkedList than the other? Carryover?\n\
        - Reversing just mean, flipping the pointers direction\n\
        - Consider having two points, and the distance between them\n\
        - Consider having a double linked list so that you can retrieve the first and last as well as adding them in both ways (Combines well with hashmap)\n\
        "
    },
    {
        term: 'Binary Problems Generalizations',
        prompt: "Think about how you could use binary generalizations to solve your most current problem or in previous dsa/projects?",
        description: "\n\
        - There is heavy logic in checking if both are null or some is Null when checking similitudes\n\
        - When building up a binary tree, consider having left right points and an hashmap if we using the windows.",
    },
    {
        term: "Graph Problems Generalizations",
        prompt: "Think about how you could use graph generalizations to solve your most current problem or in previous dsa/projects?",
        description: "\n\
        - Recoloring the graph for previus steps, and remembering inside of them by coloring\n\
        "
    },
    {
        term: "Graph Theory",
        prompt: "What are the advantages of using Graph Theory?",
        description: "\n\
        - If the graph to be done on is a array, it might make sense to have another arrays to keep track of other values, such as distance, neighbors, etc, and using index as identifiers.\n\
        - If the permutation of a node is limited by its contstraints, e.g. a gene with 8 characters or combinations rom a specific set, then we can craft it's neighbors.\n\
        - If the nodes have dependencies, then making a dependicies list, and starting form the ones with non, is a smart strategy.\n\
        - Usueful variables are: to keep track | \n\
        "
    }
]


const system_design = [
    {
        term: "Load Balancing Algorithms",
        description: "Load balancing refers to efficiently distributing incoming network traffic across a group of backend servers, also known as a server farm or server pool.",
        prompt: "When would it be useful to have Load balancing going on?"
    },
    {
        term: "Round Robin", description: "Requests are distributed across the group of servers sequentially. \n\
        Round robin load balancing is a load balancing technique that cyclically forwards client requests via a group of servers to effectively balance the server load. It works best when these servers have similar computational and storage capabilities. ",
        prompt: "When should u use this?"
    },
    {
        term: "Weighted Server", description: "The weighted round robin load balancing approach is based on the round robin load balancing method. In a weighted round robin, the network administrator assigns a pre-set numerical weight to each server in the pool. The most efficient and top-performing server is given a weighted score of 100. A server with half the processing capability is given a weight of 50, and so on for the rest of the farm’s servers.",
        prompt: "What if I have weight 75 and 25?"
    },
    {
        term: "Micro-frontends", description: "The micro frontend approach makes it possible to delay loading these other modules until they are required to speed up performance across your site. \n\
        Benefits: Performance, Faster Feature Rollouts, Reusabiility of code, Technology Agnotism.\n\
        MFE Standards:\n\
        - Indenpendece: Each application provides its own development experience, and each will build, version, and release distinctly apart from each other. \n\
        - Composition: should be manageable by a reasonably small development team. This composition should support horizontal scaling of UI development to many teams and allow engineers to avoid organizational bottlenecks to feature delivery.\n\
        - Isolation: In the context of a build and dependency resolution system, this means each application is free to bundle and depend on its own set of libraries and frameworks. \n\
        - Automation.",
        prompt: "How could I use Micro front end in one of my current projects, how about in life?"
    },
    {
        term: "Continuous Integration", description: "Developers practicing continuous integration merge their changes back to the main branch as often as possible. The developer's changes are validated by creating a build and running automated tests against the build. By doing so, you avoid integration challenges that can happen when waiting for release day to merge changes into the release branch.\n\n\
        Continuous integration puts a great emphasis on testing automation to check that the application is not broken whenever new commits are integrated into the main branch.\n\n\
        What you need (cost) - Your team will need to write automated tests for each new feature, improvement or bug fix. You need a continuous integration server that can monitor the main repository and run the tests automatically for every new commits pushed. Developers need to merge their changes as often as possible, at least once a day.\n\n\
        What you gain: Less bugs get shipped to production as regressions are captured early by the automated tests. Building the release is easy as all integration issues have been solved early. Less context switching as developers are alerted as soon as they break the build and can work on fixing it before they move to another task. Testing costs are reduced drastically – your CI server can run hundreds of tests in the matter of seconds. Your QA team spends less time testing and can focus on significant improvements to the quality culture.",
        prompt: "How could you apply Continuous Integration into Business or Academic Fields? (Or on ur personal project? Or design one architecture that accets that"
    },
    {
        term: "Continuous Delivery", description: "Continuous delivery is an extension of continuous integration since it automatically deploys all code changes to a testing and/or production environment after the build stage. \n\n\
        What you need (cost): You need a strong foundation in continuous integration and your test suite needs to cover enough of your codebase.Deployments need to be automated. The trigger is still manual but once a deployment is started there shouldn't be a need for human intervention. Your team will most likely need to embrace feature flags so that incomplete features do not affect customers in production. What you gain: The complexity of deploying software has been taken away. Your team doesn't have to spend days preparing for a release anymore.  You can release more often, thus accelerating the feedback loop with your customers. There is much less pressure on decisions for small changes, hence encouraging iterating faster.",
        prompt: "Define the difference between continuous integration and continuous delivery."
    },
    {
        term: "Ringelmann Effect", description: "The Ringelmann effect is the tendency for individual members of a group to become increasingly less productive as the size of their group increases\n\
        This effect, discovered by French agricultural engineer Maximilien Ringelmann (1861–1931), illustrates the inverse relationship that exists between the size of a group and the magnitude of group members’ individual contribution to the completion of a task",
        prompt: "How could you use Ringelman Effect in business? How could you design a model to take advantage of this fact?"
    },
    // https://ganeshpr227.medium.com/key-concepts-and-terms-of-system-design-interview-notes-9bf882cf3730
    {
        term: "Fault Tolerance", description: "the ability of a system to perform well despite some failures in the system.\n\n\
        For example, suppose some of the hundreds of thousands of servers serving Youtube videos stop working. In that case, you will still be able to enjoy watching videos because of Youtube's ability to continue its operation without any terrible user experience.",
        prompt: "How could you improve the current Fault Tolerance of your project?"
    },
    {
        term: "Availability", description: "A System is said to be available if it is operational Availability refers to the percentage of time that the infrastructure, system, or solution remains operational under normal circumstances in order to serve its intended purpose. Highly available systems are reliable in the sense that they continue operating even when critical components fail. They are also resilient, meaning that they are able to simply handle failure without service disruption or data loss, and seamlessly recover from such failure.",
        prompt: "What would be the availability percentage of your current project?"
    },
    {
        term: "Reliability", prompt: "Whats the difference between reliability and availability?",
        description: "Reliability is the probability that a system will remain available for use during a period.\n\n\
        Today every major company invests heavily to achieve some, if not total, reliability. For example, when you upload a photo on Facebook or Instagram, several copies of that data are stored at several locations to ensure that the image is not lost if some system failure occurs. Read in detail ❤️‍🔥.",
        example: "Availability is a measure of the percentage of time that an IT service or component is in an operable state. Reliability, on the other hand, is a measure of the probability that the system will meet defined performance standards in performing its intended function during a specified interval."
    },
    {
        link: 'https://medium.com/swlh/6-best-ways-to-scale-your-systems-590c901e6d7',
        term: "Scalability", prompt: "When scalability becomes important? | \n\
        Design s scalable system (it can be for business, for software, for your current project)\n\
        You can use outsourcing,  standarization, Assets,\n\n\
        As for software: Memory Chaching, Database Sharding, CQRS, Splitting Services, Horizontal Splitting ",
        description: "Scalability is the ability of a system to increase or decrease performance or cost depending on the demand. A system may need to scale when it needs more data storage or processing power.",
    },
    {
        term: "Vertical Scaling vs Horizonal scalling", prompt: "Whats the difference?",
        example: "a. Vertical Scaling  When you add more storage, RAM, GPU power, and CPU to an existing system you have, it is called Scaling Vertically. \n\n\
        b. Horizontal Scaling  When you scale by adding more nodes/servers to tackle increased demands, that's called horizontal scaling."
    },
    {
        term: "Redundanacy & Replication", prompt: "Why they are useful? What are their advantages?",
        description: "To increase the reliability of a system in case of failures, duplication of resources is performed; this is called achieving redundancy. Having multiple copies of some resources assures us that others can work as a backup if one system has trouble. Redundancy also reduces loads on resources by distributing them over duplicate systems.  Replication is the process of making consistent copies of resources, be it software or hardware, to increase reliability, and fault tolerance, reduce latency, or increase accessibility.",
    },
    {
        term: "Proxies", prompt: "How could you use Proxies in Maid CLI (or other current project?)",
        description: "Proxies are used to cache requests and responses to serve the clients if multiple requests are made for the same web page or file; they protect you from hackers or any snooper who may want to track your online activity. Proxies are also used to limit access to resources; for example, in places like colleges, hospitals, etc., you cannot use their wifi to access certain websites."
    },
    {
        term: "Data Partitioning", prompt: "Advantages of partitioning Horizontally vs Vertically?", attachment: "./img/2023-02-07-10-29-38.png",
        description: "partitioning horizontally means dividing a large table into multiple tables (by rows), also known as sharding. Whereas vertical partitioning is dividing a table based on columns, for example, a school record of students can be divided into a table storing students' names, I.D.s, etc., and different table may store their addresses.\n\
        if you divide a table into very small chunks, it leads to complex join operations.\n\
        If you added a record using a hash function depending on the number of partitions, and later when you add or remove a partition, all of the data needs to be redistributed with the updated hash function.",

    },
    {
        term: "Indexing", prompt: "how fast can this indexes mean?",
        description: "As a database grows, the time to fetch a record also increases. Indexing is a technique used to substantially reduce the access time by creating a separate table based on one or more columns of a database. Such a table is called an index; it is sorted and has a pointer pointing to a record in the actual database.",

    },
    {
        term: "ACID Properties", prompt: "What are their advantages? | Sumarize ACID Properties | How could they be used to refactor/business/UX Design? | What examples can you find?",
        description: "    Atomicity: Entire transaction will occur at once or doesn't happen at all.\n\
        Consistency: Integrity should be maintained so that the database is consistent before and after the transaction.\n\
        Isolation: Multiple transactions can take place at once without affecting each other.\n\
        Durability: Once a transaction is successful, all the updates and modifications persist in the database.",
        example: "ACID compliance offers multiple benefits: Data integrity. Using ACID-compliant systems guarantees your data will be accurate, valid, and in line with the constraints you impose on the system. Simplified operational logic\n\
        Database systems that rely on ACID transactions are usually slower at read and write operations, because of the locking mechanism. "
    },
    {
        term: "BASE Properties", prompt: "When to use BASE properties vs ACID ? What are the advantages and disadvatanges in comparison?",
        description: "Regarding NoSQL databases, where consistency and correctness are not that big of an issue, but performance and scalability are, BASE properties make more sense.\n\
        Basic Availability: The database is available most of the time.\n\
        Soft-State: When storing new data, not all replicas have to be updated instantly, nor do they have to be write-consistent.\n\
        Eventual-Consistency: Eventually, stores are updated everywhere to make the database consistent.",
        example: "Marketing and customer service companies who deal with sentiment analysis will prefer the elasticity of BASE when conducting their social network research. Social network feeds are not well structured but contain huge amounts of data which a BASE-modeled database can easily store.\n\
        Financial institutions will almost exclusively use ACID databases. Money transfers depend on the atomic nature of ACID. \n\
        An interrupted transaction which is not immediately removed from the database can cause a lot of issues. Money could be debited from one account and, due to an error, never credited to another."
    },
    {

        term: "CAP Theorem", prompt: "How would you rate your current application in the CAP Theorem framework's axis?",
        description: "CAP theorem states that while designing a distributed system, we can only have two out of three guarantees: Consistency, Availability, and Partition Tolerance (CAP).\n\
        Consistency: all the systems in a distributed environment see the same data at any time.\n\
        Availability: For every request, there is going to be a response of success/failure.\n\
        Partition Tolerance: The system continues to work even when a few of the nodes of the distributed system stop working.",
    },
    {
        link: "https://www.youtube.com/watch?v=UF9Iqmg94tk", attachment: "./img/2023-02-07-11-49-30.png",
        term: "Consistent Hashing", prompt: "What services use this? | Explain how this works in your own words?",
        description: "This is where the consistent hashing technique is helpful to save us from remapping all the keys of the system and distributing them evenly. This method maps the nodes to specific integers within a range (say [0, 255]) using a hash function. This will be a circular structure starting from 0 to 255. Then we map the keys to some integer of the range and use the next available server on the ring.\n\        To distribute the keys evenly to all the nodes in the system, replicate the nodes to multiple ring parts.",
        example: "Dynamo DB: Data Partitioning, \n\
        \nand could advantages from this: Content Delivery Networks: Distribute Web contents Evenly\n Load balancers:: Distributed Persistent connections evenly."
    },
    {
        term: "Sharding", description: "Sharding is a technique used to divide data into multiple smaller parts known as shards (Horizontal partitioning). These shards are not only smaller but faster and more manageable.",
        prompt: "How does sharding work? EOWords | How could u use sharding in your current project? | What are their advantage and disadvantages? ",
        example: "application-visible sharding policy using relational databases… \n\
         Advantages:      If your shard key is well-chosen, and the machinery for getting apps to connect to the right shard instance for a given piece of data is well-done, you can scale your world basically infinitely. If you are going to have a multi-petabyte relational db world, you have to shard.     Sharding also allows your individual instances to not be overly huge, reducing performance and general instance management issues.     Lots of shards mitigate problems that affect individual instances. With one huge DB, an outage takes the whole site down. With 100 shards, a single-instance outage affects only 1% of your dataworld. \n\n\
         Disadvantages:      Shards can be complicated to get right, particularly if your shard key isn’t obvious.     You occasionally have to worry about splitting shards, or very occasionally about merging shards. This can be quite complicated.     Applications need to be aware of the details of database organization, at least at some level.     Joins across shards are not easily doable. If you need to do cross-shard joining, you probably need a data warehouse or some type of alternate reporting dataworld. Wherever possible, you should restrict “galactic” reporting to joins that can be done within shards and “merged” by applications above the db, or by sending the bits of data (audit tables, etc) to the reporting world and running reports ther"
    },
    {
        term: "Long polling", prompt: "What are the advantages or disadvantages of Long Polling? | How could u use this in a Dog and Cats Images API ? How about in an AI model (or your porjject)",
        description: "Long polling is different from traditional polling as the server does not have to respond immediately; it accepts the request and lets the client know once the data is ready. This way, the client does not have to keep requesting new data and gets an empty response if no update is available.",
        example: "Long polling advantages      Long polling is implemented on the back of XMLHttpRequest, which is near-universally supported by devices so there’s usually little need to support further fallback layers.     In cases where exceptions must be handled though, or where a server can be queried for new data but does not support long polling (let alone other more modern technology standards), basic polling can sometimes still be of limited use, and can be implemented using XMLHttpRequest, or via JSONP through simple HTML script tags.\n\
        \nLong polling disadvantages      Long polling is more resource intensive on the server than a WebSocket connection.     Long polling can come with a latency overhead because it requires several hops between servers and devices. Gateways often have different ideas of how long a typical connection is allowed to stay open, so sometimes close while processing is still underway.     Reliable message ordering can be an issue with long polling because it is possible for multiple HTTP requests from the same client to be in flight simultaneously. For example, if a client has two browser tabs open consuming the same server resource, and the client-side application is persisting data to a local store such as localStorage or IndexedDb, there is no in-built guarantee that duplicate data won’t be written more than once.     Depending on the server implementation, confirmation of message receipt by one client instance may also cause another client instance to never receive an expected message at all, as the server could mistakenly believe that the client has already received the data it is expecting."
    },
    {
        term: "Web Sockets", prompt: "Why it has this advantages? When could this be used?",
        description: "Using WebSockets, a bi-directional communication also known as a duplex is possible between a client and a server. A client creates a connection using what is known as a WebSocket handshake. Once the connection is successful, communication can occur between the parties without much overhead and frequent authentication.",
        example: "This can be used for: Real time Feeds, Real Time Multiplayer Gaming, Collaborative Editing, Data Visualization, Multimedia Chat, Real Time Location, Real Time Recommendation Clicking., Real time Sports: Streaming, Event Updates (w input)"
    },
    {
        term: "Server-Sent Events", prompt: "Whats the difference between this and Web Sockets?",
        description: "In this protocol, once a connection is established between a client and a server, the server can send frequent data any time using the connection, but the client will need another protocol to send any data to the server. This is useful in scenarios where a server needs to send data continually once a client creates a connection.",
    },
    {
        term: "Aggregation", prompt: "How is it symbolized? What does it mean? Make an example when you would be using this",
        example: ""
    },
    {
        term: "system design", prompt: "How would you design an Photo App?",
        description: "",
        example: "(1) Do you have a real life example? Whats the audience?"
    },
    {
        term: "garbage collection", prompt: "What is this | in which language are they found?",
        description: "is a dynamic technique for memory management and heap allocation that examines and identifies dead memory blocks before reallocating storage for reuse. Garbage collection's primary goal is to reduce memory leaks.",
        prompt: "Garbage collection (GC) is a memory recovery feature built into programming languages such as C# and Java."
    }
]



const designPatterns = [
    { term: "solid", prompt: "What are the SOLID principles? Mention at least 3", example: "     S - Single-responsiblity Principle     O - Open-closed Principle     L - Liskov Substitution Principle     I - Interface Segregation Principle     D - Dependency Inversion Principle " },
    { term: "Single Responsability Principle", description: "The single responsibility principle provides another substantial benefit. Classes, software components and microservices that have only one responsibility are much easier to explain, understand and implement than the ones that provide a solution for everything.", prompt: "How could you or are using this SOLID principle?" },
    { term: "Specification Pattern", description: "Specification of which objects satisfy certain business rules should be reusable (DRY). In order to do that we will create a class with sole responsibility of determining, whether object satisfies the rules or not.", prompt: "Example usage of this in current and future projects" },
    {
        term: "Open Closed Principle", description: "The Open/Closed Principle states that software entities (classes, modules, etc.) should be open for extension, but closed for modification. What does this mean, and why is it an important principle of good object-oriented design?\n \
    Open/closed principle is intended to mitigate risk when introducing new functionality. Since you don't modify existing code you can be assured that it wouldn't be broken. It reduces maintenance cost and increases product stability.\n \
    ", prompt: "How could you use this in current/future project, or where have you seen this principle"
    },
    { term: "Singleton Pattern", description: "Singleton is a creational design pattern that lets you ensure that a class has only one instance, while providing a global access point to this instance.", prompt: "Example usage for this." },
    {
        term: "Liskov Substitution Principle",
        description: " Liskov Substitution Principle (LSP) states that objects of a superclass should be replaceable with objects of its subclasses without breaking the application. \n \
    \n \
    This helps us model good inheritance hierarchies. It helps us prevent model hierarchies that don't conform to the Open/Closed principle. Any inheritance model that adheres to the Liskov Substitution Principle will implicitly follow the Open/Closed principle.",
        prompt: "How could you use this principle? What could you fix in the future, any of your code is violeting this principle?"
    },
    {
        term: "Interface Segregation Principle", description: "Clients should not be forced to depend upon interfaces that they do not use.\n \
    Single Responsibility Principle, the goal of the Interface Segregation Principle is to reduce the side effects and frequency of required changes by splitting the software into multiple, independent parts.\n \
   Advantages: Doesn't  implement methods we dont need. Increases readability and maintainability of our code.",
        prompt: "How could you improve your existent code using this principle?"
    },
    {
        term: "Dependency Inversion Principle", description: "Depends on the dependency states is that high level classes should not depend on low level but on abstractions. Class with abstract methods. Swap one from the other. Advantages: gives flexibility and stability at the level of the entire architecture of your application. It will allow your application to evolve more securely and stable.\n \
        > In the same way that ceo should not double as a truck driver, Higher level clases shouldnt implement low levels classes.",
        prompt: "What other real life alternatives examples are here? And how can you use this to improve your code?"
    },
    {
        term: "Builder Pattern", description: "Builder is a creational design pattern that lets you construct complex objects step by step. The pattern allows you to produce different types and representations of an object using the same construction code.\n \
        The Builder pattern suggests that you extract the object construction code out of its own class and move it to separate objects called builders.\n \
        Director: You can go further and extract a series of calls to the builder steps you use to construct a product into a separate class called director. The director class defines the order in which to execute the building steps, while the builder provides the implementation for those steps.",
        prompt: "How could you implement this to any of the current projects? What are the advantages? Hypothetical case?", attachment: "./img/2023-01-25-15-31-30.png"
    },
    {
        term: "Factory Pattern", attachment: "./img/2023-01-26-10-39-16.png", example: "The advantage of the PointFactory over the Builder pattern is that it provides a simple way to create objects without exposing the internal complexity of the object creation process. This can make the code more readable and maintainable, as the client code only needs to call the factory method and does not need to know the details of how the object is created. Additionally, the PointFactory can also provide additional functionality, such as caching or validation, that can make the object creation process more efficient.",
        prompt: "Whats the advantage over Builder Pattern? How can you use it on future/imaginative project?", description: "The Factory Method pattern is a design pattern used to create objects. It defines an interface for creating an object, but allows subclasses to alter the type of objects that will be created. \n \
        \n \
        The Factory Method pattern consists of three parts:\n \
        \n \
        (1) The Creator abstract class, which defines a factory method that returns an object of the Product type.\n \
        \n \
        (2) The ConcreteCreator subclasses, which implement the factory method and return an instance of a ConcreteProduct.\n \
        \n \
        (3) The Product interface, which defines the type of objects that the factory method creates.\n \
        \n \
        The advantage of using the Factory Method pattern is that it allows you to encapsulate the process of creating objects and make it more flexible. Because the client code only interacts with the Creator class through the factory method, it can be changed to create a different type of object without affecting the client code. This can be useful in cases where the type of object to be created is not known until runtime, or where the client code should not be tightly coupled to the classes that are responsible for creating the objects. It also allows to provide a single point of control over the creation process and can add additional functionality such as caching, logging, etc. In summary, the Factory Method pattern is a way to create objects without specifying the exact class of object that will be created, providing a way to centralize and encapsulate the creation process, making it more flexible and maintainable."
    },
    {
        term: "Adapters", description: "The Adapter design pattern is used to convert the interface of one class into another interface that the client expects. Here are some advantages and disadvantages of using adapters:\n \
        Advantages:\n \
        Improved compatibility: Adapters allow existing classes to work together that couldn't otherwise because of incompatible interfaces.\n \
        Increased reusability: Adapters can make it easier to reuse existing code by converting it to a form that is more appropriate for the current application.\n \
        Increased flexibility: Adapters can make it easier to change the interface of a class without modifying the class itself.\n \
        Loose coupling: Adapters allow the client and adaptee classes to be loosely coupled, so that changes to one class will not affect the other.\n \
        Disadvantages:\n \
        Increased complexity: Adapters can make the code more complex, especially in large codebases or when multiple adapters are used.\n \
        Reduced performance: Adapters can add an additional layer of indirection, which can slow down the performance of the application.\n \
        Harder to debug: Adapters can make it harder to debug the application, especially if the adaptee class is not well-documented or is hard to understand.\n \
        Limited functionality: Adapters can only convert the interface of a class, they cannot add new functionality to it."
        , prompt: "How could you use adapters in daily life or in one of your projects?"
    },
    {
        term: "The Bridge", description: "The Bridge design pattern is a structural pattern that is used to separate an abstraction from its implementation. It allows the two to evolve independently and provides a way to change the implementation of an abstraction without affecting its clients.\n \
        Advantages:\n \
        Decoupling: The Bridge pattern decouples the abstraction from the implementation, which makes it easier to change the implementation without affecting the clients.\n \
        Increased flexibility: The Bridge pattern allows for the implementation of an abstraction to be changed at runtime, making the code more flexible.\n \
        Improved maintainability: The Bridge pattern improves the maintainability of the code by allowing the abstraction and the implementation to evolve independently.\n \
        Reducing complexity: The Bridge pattern can be useful in situations where you want to avoid a combinatorial explosion of subclasses.\n \
        Disadvantages:\n \
        Increased complexity: The Bridge pattern can make the code more complex, especially in large codebases or when multiple bridges are used.\n \
        Reduced performance: The Bridge pattern can add an additional layer of indirection, which can slow down the performance of the application.\n \
        Limited functionality: The Bridge pattern can only separate the interface and implementation, it cannot add new functionality to it.\n \
        Harder to debug: The Bridge pattern can make it harder to debug the application, especially if the implementation class is not well-documented or is hard to understand.",
        prompt: "", example: "the Bridge design pattern is like having a remote control for your TV. The remote control is the abstraction, and the TV is the implementation. The remote control lets you change the channel, turn the volume up and down, and do other things, but it doesn't actually do anything on its own. It just sends signals to the TV, which is the part that actually changes the channel and adjusts the volume.\n \
        \n \
        The remote control and the TV can change independently of each other. For example, you can change the batteries in the remote control without affecting the TV. You can also buy a new TV that has different features, but you can still use your old remote control to control it. This is similar to how the Bridge pattern allows the abstraction and the implementation to evolve independently.\n \
        \n \
        So, the Bridge pattern is a way of connecting two things so they can work together, while still being able to change them independently. It makes the code more flexible and maintainable, but it can also make it more complex."
    },
    {
        term: "Composite Design Pattern", description: "The Composite design pattern is a way to structure a program so that it can have objects that are made up of other objects. Imagine that you have a school project where you have to build a tree out of different materials like paper, cardboard, and glue. The tree is made up of branches and leaves, and each branch is made up of smaller branches and leaves.\
        It allows you to treat individual objects and compositions of objects in the same way, making it easier to work with complex structures.\
        It promotes the Single Responsibility Principle by allowing each class to only handle its own specific part of the structure.\
        It promotes code reusability, as the same classes can be used to create different structures.\
        \
    Disadvantages of using the Composite design pattern include:\
        It can make code more complex and harder to understand, especially if there are many levels of nesting in the structure.\
        It can make it harder to debug the code, because it can be difficult to trace through the structure to find the source of an error.\
        It can lead to performance issues if the structure is too deep or if there are too many elements in the structure.",
        prompt: "Where do you think it would make sense to implement such design pattern? What applications?"
    },
    {
        term: "Decorator Design Pattern", description: "The Decorator pattern is a way to add new behavior to an object without changing the object's class. Imagine you're a student and you want to decorate a plain notebook with stickers, pictures and drawings. The notebook is your object and the stickers, pictures and drawings are the new behavior you want to add. (The important thing is to make it work at runtime.)",
        prompt: "Provide an example of how could you use this Design Pattern?"
    },
    {
        term: "Proxy Pattern", description: "A class that functions as an interface to a particular resource. That resource may be remote, expensive to construct, or may require logging or some other functionality.", prompt: "Name an example in how you could use this pattern on", example: "Creating a protection proxy: For protecting business logic",
    },
    {
        term: "Promises vs Observables",
        description: "Promise: \n\
        provides a single future value, is not lazy, can not be cancelled.\n\n\n\
        Observable: \n\
        provides multiple future values, is lazy, can be cancelled.",
        prompt: "When would you use one over the other? What are the advantages and disadvantages of each?",
        example: "Use promises for populating a site page statically, or get a report, while if you want a dynamic page, or a stream of data, use observables."
    },

];


module.exports = { designPatterns, dsa, system_design };