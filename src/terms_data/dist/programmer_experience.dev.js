'use strict';

function _defineProperty(obj, key, value) {
	if (key in obj) {
		Object.defineProperty(obj, key, {
			value: value,
			enumerable: true,
			configurable: true,
			writable: true
		});
	} else {
		obj[key] = value;
	}
	return obj;
}

/**
 * A good Roadmap:
 * https://roadmap.sh/devops
 * The advantage of devops is that tit is usually definition based, so I should be able to go throught the list and get as much of these definitions based problems.
 */
var aws_glossary = [
	{
		term: 'access key rotation',
		description:
			'A method to increase security by changing the AWS access key ID. You can use this method to retire an old key at your discretion.',
		prompt: 'Define it | Use it on a sentence'
	}
];
/**
 * Probably a good idea to take form here:
 *  https://intellipaat.com/blog/interview-question/aws-lambda-interview-questions/
 */

var aws_services = [
	{
		prompt: 'When should you use SQS vs SNS?',
		term: 'sqs sns',
		description:
			'SNS: \n\
        Publishing messages to a topic can deliver to many subscribers of different types (SQS, Lambda, Email)\n\
        SNS topics are used to enable communication: producers publish messages to topics, and consumers subscribe to these topics to receive messages. You can deliver messages to various types of subscribers, such as AWS SQS queues, AWS Lambda functions, and HTTP endpoints. You can also use SNS to send SMS messages, email, and push notifications to end-user devices.\n\n\
        Queueing service for message processing. A system which must poll the queue to discover new events. Messages in the queue are typically processed by a single consumer. So there is a poling on stage ot get a certain amount of jsons.\n\
        AWS SQS is a distributed, managed queueing service used for communication between applications, microservices, and distributed systems.'
	},
	{
		prompt: 'Whats the difference between SQS FIFO and Standard queue?',
		term: 'sns queues',
		description:
			'Standard queues provide at-least-once delivery, which means that each message is delivered at least once. FIFO queues provide exactly-once processing, which means that each message is delivered once and remains available until a consumer processes it and deletes it.'
	},
	{
		term: 'Containers - Dockerization',
		prompt: 'What problem solves for you?',
		description:
			"a virtual machine can still sit under-utilized or even idle when the demand is low. If you've ever worked in a role managing a fleet of servers, you would have noticed the dramatic under-utilization of compute during low demand periods. Ideally, we don't want the overhead of deploying and configuring a full operating system every time we need to run a workload.\n\n\
        To achieve this, we can make use of containerization technologies such as Docker. Docker allows applications running on an operating system to be isolated from each other by running inside a container. Each container holds only the application and associated dependencies (binaries and libraries):"
	},
	{
		term: 'Function as a Service (FaaS)',
		prompt: 'What is this and how In what situation do you see this as useful, what real life alternatives can you find?',
		description:
			"While containerization technologies such as Docker are commonplace in cloud-native applications, we can take another step further by dividing our applications into discrete functions.\n\n\
        Function as a Service (FaaS) is another level of abstraction and is where we get to choose the runtime to execute our code on, some execution parameters such as memory allocation, and that's about it. The hardware, operating system, and runtime are all managed for you."
	},
	{
		term: 'Scaling Horizontally in AWS',
		prompt: 'What does this mean, and how do you achieve this?',
		description:
			'In terms of hardware utilization, the biggest impact here is that we can now scale by workload type. If the user demand was running a task that was creating a high load on the processing tier, we can add more compute nodes (virtual machines) to this tier, independently of the web tier. This is called scaling horizontally'
	},
	{
		term: 'EAI',
		prompt: 'What is that and when would you use it?',
		description:
			'Enterprise application integration (EAI) refers to the process of connecting different enterprise applications to allow data and functionality to be shared between them. Here are the pros and cons of EAI:\n\
        Pros:      Increased efficiency: By connecting different enterprise applications, data and functionality can be shared easily between different departments, reducing manual data entry and avoiding duplication of effort.     Improved data accuracy: Integration can ensure that data is consistent and up-to-date across different enterprise applications, reducing the risk of errors and inconsistencies.\
        Enhanced collaboration: Integration makes it easier for different departments and teams to work together, as they can access the same information and collaborate on projects in real-time.     Increased competitiveness: Integration can help organizations respond more quickly to changes in the market, allowing them to stay ahead of the competition.'
	},
	{
		term: 'ESB',
		prompt: "What's the difference between this and EAI?",
		description:
			"ESB stands for Enterprise Service Bus, and it's a type of software architecture that helps different computer systems communicate with each other.  Imagine that you have a bunch of different software systems in your school, like a library system, a student management system, and a payment system. All of these systems have different ways of storing and processing information, and it can be difficult to get them to work together and share information.  An ESB acts as a middleman between these different systems, allowing them to communicate and share information with each other. It acts like a bus, carrying messages and data between the systems, and making sure that the right information gets to the right place at the right time.",
		example:
			'Enterprise Application Integration (EAI) and Enterprise Service Bus (ESB) are similar concepts in the field of software architecture, but they have some key differences.      Purpose: EAI is a broader term that refers to the overall goal of integrating different enterprise applications, while ESB specifically refers to a type of architecture used to achieve that goal.      Approach: EAI can involve a variety of approaches, including file transfer, message-oriented middleware, and service-oriented architecture (SOA), while ESB is a specific type of SOA architecture that uses a message bus to route messages between applications.      Focus: EAI focuses on the integration of applications, while ESB focuses on the routing and transformation of messages between applications.      Functionality: EAI often provides additional functionality beyond message routing, such as data transformation and mapping, security, and monitoring, while ESB focuses primarily on message routing and transformation.      Complexity: EAI can be a more complex solution, as it may involve a variety of technologies and approaches, while ESB is a more focused and streamlined solution.  In general, ESB is considered a subset of EAI, and many EAI solutions include an ESB as a key component. Both EAI and ESB are aimed at solving the same problem: how to integrate different enterprise applications and systems, and how to make sure that they can communicate and share data effectively. The choice between an EAI solution and an ESB depends on the specific needs and requirements of your organization.'
	},
	{
		term: 'cyclomatic complexity',
		prompt: 'use this on a sentence',
		description:
			'Cyclomatic complexity is calculated based on the control flow graph of the code, where each node in the graph represents a single point of execution and each edge represents a possible flow of control. The cyclomatic complexity of a program is defined as the number of nodes minus the number of edges plus two. This formula provides a measure of the minimum number of independent paths that must be tested to ensure that all paths through the code have been tested.'
	},
	{
		term: 'Questions-ch2',
		prompt: 'Adding new components to a large monolith can increase what? [Code Base, Static Coupling, Cyclomatic Complexity]\
        What is the concept of providing application connect? \
        What should an event producer and an event consumer use to exchange mmessages? [Message broker]\
        ',
		example:
			'In event-driven architecture, event producers and event consumers exchange messages through a message broker. A message broker acts as an intermediary between the event producer and the event consumer, allowing them to exchange messages asynchronously and decoupling their interactions. The message broker receives messages from event producers, stores them in a queue, and then delivers them to the event consumers. This helps to ensure reliability, as messages are stored and delivered even if the event consumer is temporarily unavailable.\n\
        Message brokers can also provide additional features such as routing, transformation, and filtering of messages, making them a powerful tool for event-driven integration and communication between systems.'
	},
	{
		term: 'Event Driven Architecture (EDA)',
		description:
			'Event-driven architecture (EDA) is a software design pattern in which the flow of the program is determined by events or messages. In event-driven systems, individual components, or event emitters generate events or messages that are then processed by other components, or event handlers.\n\
        Advantages of event-driven architecture include:      Loose coupling: Event-driven systems can allow for a high degree of decoupling between components, which can make it easier to build and maintain large, complex software systems.      Scalability: Event-driven systems can be designed to handle large amounts of data, making them well-suited to cloud computing and big data applications.      Real-time processing: Event-driven systems can process events and update applications in real-time, making them ideal for applications that require immediate responsiveness, such as financial trading systems or social media applications.      Flexibility: Event-driven systems can be highly flexible, as different components can be easily added, removed, or replaced to accommodate changing requirements.',
		prompt: 'How to use this?'
	},
	{
		term: 'Sharding and SQL',
		prompt: 'What advantages are there in PostgreSQL?',
		example:
			'With PostgreSQL, it supports sharding, which means that now you can run horizontal distributed queries for aggregations, as well as vertical distributed queries for Filtering ORS and AND\
        I imagine this would be the case if you have an operation that request for Column A to be X and Column B to be Y then, you could have one shard running first condition and another for the other condition.\n\
        An advantage over NONSQL is also that it is ACID compliant.',
		attachment: './img/2023-02-10-16-07-42.png'
	},
	{
		term: 'Lambda-ch3',
		prompt: 'Answer why the following',
		description:
			'\
        1) Why do I keep receiving HTTP 429 status code responses when using the6. Lambda Invoke API? [ The request concurrency limit has been exceeded]\
        2) Event-driven compute and architectural patterns have evolved to abstract away1. the runtime from the developer so that they can focus on writing business value into their code. Such a pattern is called what? [Functions as a Service]\
        3) When creating a Lambda function, there are a number of configurable options Which of the following is NOT a directly configurable option []\
        ',
		example:
			'\
        3) When creating a Lambda function, you can configure various options such as memory allocation, runtime, and execution timeout. However, the number of CPU cores is not a directly configurable option. Instead, the number of CPU cores is determined by the memory allocation you choose for your function. AWS Lambda automatically allocates an equal number of CPU shares proportional to the amount of memory you have configured for your function. So, when you increase the memory allocation for your function, the number of CPU cores allocated to the function will also increase.'
	},
	_defineProperty(
		{
			term: 'XMPP',
			prompt: 'What does it translates to? Use it on an example?',
			description:
				'Based on XML, it enables the near-real-time exchange of structured data between two or more network entities.\n\
        XMPP protocol is used for all the following applications. • Instant messaging apps (Google Talk, WhatsApp) • Presence status • Message delivery • Conferencing (Multi-party chat) • Roster management • Voice and video calls • Online gaming • News websites • VoIP apps \n\n\
        Benefits or advantages of XMPP protocol  Following are the benefits or advantages of XMPP protocol: ➨Extensible : It can be customized to individual user requirements. ➨Messaging : Short messages are used for fast communication between user and server. ➨Presence : It is reactive to presence of user and his/her status. ➨Protocol : It is an open platform which is constantly evolving. ➨Secured : It uses TLS and SASL to provide secured end to end connection. ➨It offers persistent connection. ➨It is decentralized in nature as no central XMPP servers are needed. ➨It allows servers with different architectures to communicate.\n\n\
        Drawbacks or disadvantages of XMPP protocol  Following are the drawbacks or disadvantages of XMPP protocol: ➨It does not have QoS mechanism as used by MQTT protocol. ➨Streaming XML has overhead due to text based communication compare to binary based communication. ➨XML content transports asynchronously. ➨Server may overload with presence and instant messaging. '
		},
		'prompt',
		'Extensible Messaging and Presence Protocol is an open communication protocol designed for instant messaging, presence information, and contact list maintenance.'
	),
	{
		term: 'Database selection',
		prompt: 'Pick 1+ of the following databases and tell me why (in what situation) would you use it?',
		attachment: './img/2023-02-14-11-47-17.png',
		description:
			'You have: 1) Aurora RDS, 2) Aurora RDS Serverless, 3) Postgres, 4) ElasticSearch, 5) Elasticache, 6) DynamoDB, 7) MongoDB'
	},
	{
		term: 'Cloud Formation Cloud',
		prompt: 'What happens when you delete a stack?\n\
         What happens when you update a stack',
		description:
			'Stack Actions Creaate Change set for current Stack -> Upload File, calculate and then makes the changes\n\
         Deleting the stack will also delete the resources created.'
	},
	_defineProperty(
		{
			term: 'SHA-1 vs SHA-256',
			prompt: 'Whats the difference? And when to use one vs the other?',
			description:
				'SHA-1 and SHA-256 are both cryptographic hash functions that are widely used for securing data. However, SHA-1 is an older algorithm and has known vulnerabilities, while SHA-256 is a more modern algorithm that is considered to be more secure.  Here are some of the key pros and cons of each algorithm:  SHA-1:  Pros:      SHA-1 is a widely supported and well-established hash function.     It is faster than SHA-256.     It has a smaller output size (160 bits), which can be useful in certain contexts.  Cons:      SHA-1 is no longer considered to be secure for cryptographic purposes, due to known vulnerabilities.     It is vulnerable to collision attacks, which means that it is possible for an attacker to create two different inputs that hash to the same value.     It is no longer recommended for use by major security organizations, such as NIST and the NSA.  SHA-256:  Pros:      SHA-256 is a more modern hash function and is considered to be more secure than SHA-1.     It is resistant to collision attacks and other forms of cryptographic attacks.     It has a larger output size (256 bits), which makes it more difficult to brute force.  Cons:      SHA-256 is slower than SHA-1.     It has a larger output size, which can be less efficient in certain contexts.     It may not be compatible with older software and systems that only support SHA-1.  Overall, while SHA-1 may have some advantages in terms of speed and output size, its known vulnerabilities make it unsuitable for modern cryptographic applications. SHA-256, on the other hand, is a more secure algorithm and is the recommended choice for most applications.'
		},
		'prompt',
		"When to use SHA-1:      Compatibility: If you are working with older software or systems that only support SHA-1, then it may be more convenient to use SHA-1.     Performance: If you are working with large datasets and need to process data quickly, then SHA-1 may be a better choice since it is faster than SHA-256.     Output size: If you need a smaller output size for your hash function, then SHA-1's 160-bit output may be more convenient.  When to use SHA-256:      Security: If security is your primary concern, then SHA-256 is the more secure choice. It is resistant to collision attacks and other forms of cryptographic attacks, and is recommended by major security organizations such as NIST and the NSA.     Brute force resistance: If you need a hash function that is resistant to brute force attacks, then SHA-256's larger output size makes it more difficult to crack than SHA-1.     Future-proofing: Since SHA-1 is no longer considered to be secure, using SHA-256 ensures that your system will remain secure and up-to-date with current cryptographic standards.  In general, if security is your primary concern, then SHA-256 is the better choice. However, if compatibility or performance is more important for your specific use case, then SHA-1 may be more convenient. Nelson Wang how much faster sha1 is in percentage  The speed difference between SHA-1 and SHA-256 can depend on a variety of factors, such as the hardware used, the size of the input data, and the specific implementation of the hash function. In general, SHA-1 is faster than SHA-256, but the difference in speed may not be significant for small datasets.  In terms of specific numbers, it is difficult to give an exact percentage for the speed difference between SHA-1 and SHA-256, as it can vary depending on the specific use case. However, some benchmarks have shown that SHA-1 can be up to 20-30% faster than SHA-256 for small to medium-sized datasets. For larger datasets, the speed difference may become less noticeable, as the time required to hash the data can become dominated by other factors such as I/O and memory access.  It is important to note, however, that while SHA-1 may be faster than SHA-256, its known vulnerabilities make it unsuitable for modern cryptographic applications. For most applications, the improved security provided by SHA-256 is worth the small speed penalty. "
	)
];
var coderTerms = [
	{
		term: 'Business Logic Modules Overview',
		description:
			'Business logic modules are independent code components that multiple business logic units use. Code reuse eases the maintenance of the business logic. Reuse eliminates code duplication and enables you to apply system-wide logic changes quickly and easily.\
        The system uses two of the metrics to describe the helpdesk performance:\
        Metric name:  Successful Ticket resolution on time.\
        Objective statement:  \
        No less than 99% of the tickets should be resolved within 4 hours.\
        Business logic: \
        Resolution should be calculated from Open to Closed.',
		prompt: 'Create an example of a business logic.'
	},
	{
		term: 'Tech bus terms I',
		description:
			'\
        (a) Enterprise Project (b) Regression (c) Branch Coverage Metric (d) MUT (e) Mock (f) Double (g) SUT',
		example:
			'\
        (a) An enterprise application is an application that aims at automating or assisting an organizations inner processes. It can take many forms, but usually the characteris- tics of an enterprise software are  High business logic complexity  Long project lifespan  Moderate amounts of data  Low or moderate performance requirement\
        (b)  when a feature stops working as intended after a cer- tain event (usually, a code modification). The terms regression and software bug are synonyms and can be used interchangeably.\
        (c) To calculate the branch coverage metric, you need to sum up all possible branches in your code base and see how many of them are visited by tests.\
        (d)  a method in the SUT called by the test. The terms MUT and SUT are often used as synonyms, but normally, MUT refers to a method while SUT refers to the whole class -> NAME the class under test using variable sut\
        (e) A mock is a special kind of test double that allows you to examine interactions between the system under test and its collaborators.\
        (f) an overarching term that describes all kinds of non-production-ready, fake dependencies in a test\
        (g) System Under Test\
        ',
		prompt: 'Explain any of the following'
	},
	{
		term: 'Interpreted vs Compiled',
		prompt: 'Summarize Adv/Disadvantages using compiled vs Interpreted?',
		description:
			'\
        Interpreted: \n\
        Steps      Creation of the program.     It doesn’t require the linking of files or generation of machine code.     It executes the source statements line by line during the execution. \n\
        They are fairly easy to use and execute, even for a beginner. Only computers with the corresponding Interpreter can run the interpreted programs. It doesn’t save the machine language at all. The interpreted codes run comparatively slower. It works on the basis of the Interpretation method. It doesn’t generate an output program. Meaning, it evaluates the source program every time during individual execution. Execution of the program is one of the steps of the Interpretation process. So, you can perform it line by line.\n\
        They work the best in web environments- where the load time is very crucial. Compiling takes a relatively long time, even with small codes that may not run multiple times due to the exhaustive analysis. Interpretations are better in such cases.\n\n\
        Compiler \n\
        Steps:      Creation of the program.     The Compiler analyses all the language statements and throws an error when it finds something incorrect.     If there’s zero error, the compiler converts the source code to machine one.     It links various code files into a runnable program (exe).     It runs the program. \n\
        The code execution time is comparatively less because the program code already gets translated into machine code. One can’t change a program without getting back to the source code.  	It stores the machine language on the disk in the form of machine code. The compiled codes run comparatively faster. It works on the basis of the language-translation linking-loading model. \n\
        You cannot port the Compiler because it stays bound to the specific target machine. The compilation model is very common in programming languages like C and C++.\
        ',
		example:
			'Java can be considered both a compiled and an interpreted language because its source code is first compiled into a binary byte-code. This byte-code runs on the Java Virtual Machine (JVM), which is usually a software-based interpreter.\n\
        Java is a statically typed and compiled language, and Python is a dynamically typed and interpreted language. This single difference makes Java faster at runtime and easier to debug, but Python is easier to use and easier to read.'
	},
	{
		term: 'Concurrent Computing',
		example: 'yes',
		description:
			"In concurrent computing, multiple calculations are made within overlapping time frames. It takes advantage of the concept that multiple threads or processes can make progress on a task without waiting for others to complete. This general approach to writing and executing computer programs is called concurrency.  Concurrent computing is different than synchronous (sequential) computing, where calculations are made one after the other, with each waiting for the previous to complete. It's not the same as parallel computing, where calculations are made simultaneously on separate processors.  The three main types of concurrent computing are threading, asynchrony, and preemptive multitasking. Each method has its own special precautions which must be taken to prevent race conditions, where multiple threads or processes access the same shared data in memory in improper order.",
		prompt: 'Whats the difference between different concurrent computing types?'
	}
];
var unit_testing = [
	{
		term: 'testing upkeeps',
		description:
			' Refactoring the test when you refactor the underlying code  Running the test on each code change  Dealing with false alarms raised by the test  Spending time reading the test when you’re trying to understand how the underlying code behaves',
		prompt: 'What to consider before creating our tests?'
	},
	{
		term: '(a) Shared, (b) private, and (c) out-of-process dependencies (d) volatile (e) Collaborator, (f) Cyclomatic Complexity',
		prompt: 'Use this definitions on a sentence:',
		description:
			'\
        \
       (a) A shared dependency is a dependency that is shared between tests and provides means for those tests to affect each other’s outcome. A typical example of shared dependencies is a static mutable field. \
       (b) A private dependency is a dependency that is not shared\
       (c) An out-of-process dependency is a dependency that runs outside the application’s execution process; it’s a proxy to data that is not yet in the memory.\
       (d) that exhibits one of the following: It introduces a requirement to set up and configure a runtime environment inaddition to what is installed on a developer’s machine by default. Databasesand API services are good examples here. They require additional setup andare not installed on machines in your organization by default. It contains nondeterministic behavior. An example would be a random num-ber generator or a class returning the current date and time. These depen-dencies are non-deterministic because they provide different results on eachinvocation\
       (e) Collaborator: providing access to the database is a collaborator since the database is a shared dependency \
       (d) indicates the number of branches in a given program or method. This metric is calculated as 1 + <number of branching points> You can think of it as the amount of tests to reach 100% branch coverage\
       \
        '
	},
	{
		term: 'Chicago vs London School of TDD',
		prompt: 'In which situation would you use each of them?',
		description:
			'\
        Chicago school: Test changes in the state, then test the return values | Better for Functional Architecture \n\
        London School: Desing from top down, and test the Interactions between. Characterized with ideas of mocks (Just interfaces) | Better for Object oriented architecture.  \
        ',
		attachment: './img/2023-02-01-14-34-56.png'
	},
	{
		term: 'AAA Pattern',
		prompt: 'Describe when you could use this pattern? (2) What it means if there is more than AAA?, (3) What happens if you find an if? (4) Whats the right length of each section?',
		description:
			'The AAA pattern advocates for splitting each test into three parts: arrange, act, and assert. The advatnage being that following increases readability on the future.',
		example:
			'(2) Means that probably is an integration test and is time to split it into multiple tests. (3) That would be an antipattern. (4) Act should be one line, Assertion if too large means lack of abstraction and is okay for arrange to be large.'
	},
	{
		term: 'Namings in Testing',
		prompt: '(1) How should you call this test ? (Sum_TwoNumbers_ReturnsSum, isDateInvalid) ',
		description:
			'Don’t follow a rigid naming policy. You simply can’t fit a high-level description of a complex behavior into the narrow box of such a policy. Allow freedom of expression.  Name the test as if you were describing the scenario to a non-programmer who is familiar with the problem domain. A domain expert or a business analyst is a good example.  Separate words with underscores. Doing so helps improve readability, especially in long names',
		example:
			"(1) Sum_of_two_numbers, delivery_with_pastdate_is_invalid // More specific why it's invalid, it's okay to be verbose."
	},
	{
		term: 'Good Pillars Tests',
		prompt: 'What mental guidelines to have to create good code?',
		description:
			'(1) Protection against Regressions (2) Resistance to refactoring (3) Using mocks to assert intra-system communications leads to fragile tests. Mock- ing is legitimate only when it’s used for inter-system communications',
		example:
			'(1) To maximize the metric of protection against regressions, the test needs to aim at exercising as much code as possible.\
        (2) Aim to keep distance between the actual (current implementation of the class.) \
        '
	},
	{
		term: 'mock stub',
		prompt: 'Describe difference Mock and Stub, when would you use each?',
		description:
			'Mocks help to emulate and examine outcoming interactions. These interactions are calls the SUT makes to its dependencies to change their state.  Stubs help to emulate incoming interactions. These interactions are calls the SUT makes to its dependencies to get input data',
		attachment: './img/2023-02-02-10-13-30.png'
	},
	{
		term: 'CQRS Principle',
		prompt: 'Whats the principle useful for?',
		attachment: './img/2023-02-02-10-30-14.png',
		description:
			'Commoand Query Responsability Segregation It states that every method should either be a command that performs an action, or a query that returns data to the caller, but not both; Useful in event sourcing on the event source. CQRS takes the defining principle of CQS and extends it to specific objects within a system, one retrieving data and one modifying data. CQRS is the broader architectural pattern, and CQS is the general principle of behaviour.'
	},
	{
		term: 'Encapsulating APIs',
		prompt: 'What mental guidelines to follow when encapsulating API?',
		attachment: './img/2023-02-02-10-51-02.png',
		description:
			'\
        Without encapsulation, you have no practical way to cope with ever-increasing code complexity. When the code’s API doesn’t guide you through what is and what isn’t allowed to be done with that code, you have to keep a lot of information in mind to make sure you don’t introduce inconsistencies with new code changes'
	},
	{
		term: 'Hexagonal Architecture Enphasis',
		prompt: 'How would you refactor or use this Pattern on your projects?',
		attachment: './img/2023-02-02-12-11-43.png',
		description:
			'Hexagonal architecture emphasizes three important aspects:\
        - Separation of concerns between the domain and application services layers. The domain layer should be responsible for the business logic, while the application services should orchestrate the work between the domain layer and external applications.\n\
        - A one-way flow of dependencies from the application services layer to the domain layer. Classes inside the domain layer should only depend on each other; they should not depend on classes from the application services layer.\n\
        - External applications connect to your application through a common inter- face maintained by the application services layer. No one has a direct access to the domain layer '
	},
	{
		term: '(a) Mathematical functions',
		prompt: 'Why identifying this is important?',
		example:
			'The goal is to cover the functional core exten- sively with output-based tests and leave the mutable shell to a much smaller number of integration tests',
		description:
			'\
        \
       (a)Methods with no hidden inputs and outputs are called mathematical functions because such methods adhere to the definition of a function in mathematics\n\
       Functional functions are easier to mantain as can be wrapped into Chicago Style testing, which abstracts internal workings, while class based functions make this harder.\
       \
        '
	},
	{
		term: 'Humble Object Pattern',
		prompt: 'When and why would be convenient to use it? What preconditions to test and what not to test?',
		description:
			'For example you have a code with logs of logic and time to setup, or also an ',
		example:
			'You can break it down into Factory pattern to build the objects, (with those preconditions)'
	},
	{
		term: 'end to end vs integration test',
		prompt: 'What is the difference between integration and end to end test?'
	},
	{
		term: 'integration testing',
		prompt: 'Think of how would you design a passable Integration Testing for your current project?',
		description:
			'To have in mind: (1) Make the domain model boundaries explicit (2) Reduce the amount of layers (3) Cover one intgegrated Happy path / edge cases are for unit tests (4) Test the controllers'
	},
	{
		term: 'support, diagnostic',
		prompt: 'Whats the difference?',
		description:
			'Logging should only be done only if is a business requirement',
		example:
			'Support logging produces messages that are intended to be tracked by support staff or system administrators. \n\
        Diagnostic logging helps developers understand what’s going on inside the applicatio'
	},
	{
		term: 'Managaged, Unmanaged',
		prompt: 'Whats the difference? For which should you create a test?',
		description:
			"Managed dependencies are dependencies that are directly controlled and managed by a package manager (e.g. npm, pip, gem, etc.). These dependencies are installed and updated automatically when you run a command such as npm install or pip install. \n\
        Unmanaged dependencies are dependencies that are not managed by a package manager and must be installed and updated manually. This can occur, for example, if you're using a library or package that isn't listed in a public repository, or if you've forked a project and made changes to its dependencies. Use real instances of managed dependencies in integration tests; replace unman-\n\
        aged dependencies with mocks."
	},
	{
		term: 'YAGNI',
		prompt: 'Why Yagni is a good principle? Not good? Why would you use an interface with a single implementation?',
		description:
			'Interfaces with a single implementation are not abstractions and don’t provide loose coupling any more than the concrete classes that implement those inter- faces. Trying to anticipate future implementations for such interfaces violates the YAGNI (you aren’t gonna need it) principl\n\
        A feature creep is avoided. No bloatware is created, i.e. software with functions that are hardly used or not used at all. Functions that are not implemented do not have to be tested, documented and supported. Thus there is no (unnecessary) effort.',
		example: 'The only legit reason would be to enable mocking.'
	},
	{
		term: 'Spy',
		promp: 'Whats the difference between Mocks and Spies?',
		description:
			'Spy: Spies are used for creating partial or half mock objects. Like mock, spies are also used in large test suites., \n When using spy objects, the default behavior of the methods (when not stubbed) is the real method behavior\n\n\
        Mock: Mocks are used to create fully mock or dummy objects. It is mainly used in large test suites.\n\
        When using mock objects, the default behavior of methods (when not stubbed) is do nothing (performs nothing.) '
	}
];
module.exports = {
	aws_glossary: aws_glossary,
	aws_services: aws_services,
	coderTerms: coderTerms,
	unit_testing: unit_testing
};
