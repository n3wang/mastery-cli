# High-Quality Flashcards: Sam-Newman---Building-Microservices-OReilly-Media-2015_processed (Part 13)


**Starting Chapter:** Mapping Continuous Integration to Microservices

---


#### Event Data Pump

Background context: Microservices emit events based on state changes of managed entities. These events can be used by external subscribers, like a reporting system, to populate databases without coupling directly to the source microservice's internal workings.

:p How does an event data pump differ from a traditional data pump in terms of architecture?
??x
An event data pump decouples the process of populating the reporting database from the internal workings of the service emitting events. Instead of relying on scheduled data pumping, it listens for specific events and processes them as they occur.

Example pseudocode:
```java
public class EventDataPump {
    private Set<String> processedEvents;

    public void subscribeToEventStream(EventEmitter emitter) {
        emitter.on("event-created", (data) -> processNewEventData(data));
        emitter.on("event-updated", (data) -> processUpdatedEventData(data));
        emitter.on("event-deleted", (data) -> processDeletedEventData(data));
    }

    private void processNewEventData(String data) {
        // Process and insert new event into the reporting system
    }

    private void processUpdatedEventData(String data) {
        // Update existing records in the reporting system based on the event
    }

    private void processDeletedEventData(String data) {
        // Handle deletion events to reflect changes in the reporting system
    }
}
```
x??

---


#### Netflix's Data Reporting Pipeline
Background context: Netflix uses Hadoop to process SSTable backups for reporting across large amounts of data. They have open-sourced this approach as the Aegisthus project.

:p What tool does Netflix use to report across all its Cassandra data, and what is one notable outcome of using this tool?
??x
Netflix uses Hadoop to report across all its Cassandra data by processing SSTable backups. The notable outcome is that they have open-sourced their solution as the Aegisthus project.
```java
// Pseudocode illustrating the use of Hadoop for processing SSTables
public class DataProcessingPipeline {
    public void processSSTables(String inputPath, String outputPath) throws IOException {
        // Code to read SSTable files from input path and write processed data to output path using Hadoop MapReduce
        Configuration conf = new Configuration();
        FileInputFormat.addInputPath(conf, new Path(inputPath));
        FileOutputFormat.setOutputPath(conf, new Path(outputPath));
        
        Job job = Job.getInstance(conf);
        job.setJarByClass(DataProcessingPipeline.class);
        job.setMapperClass(MySSTableMapper.class);
        job.setReducerClass(MySSTableReducer.class);
        job.setOutputKeyClass(Text.class);
        job.setOutputValueClass(IntWritable.class);
        
        job.waitForCompletion(true);
    }
}
```
x??

---


#### Generic Eventing Systems for Real-Time Data
Background context: The approach of using a single location for reporting is being reconsidered due to the variety of use cases with different accuracy and timeliness requirements. Netflix is moving towards generic eventing systems that can route data to multiple places as needed.

:p Why are generic eventing systems becoming more important in modern data processing?
??x
Generic eventing systems are becoming more important because they allow for flexibility in handling data across various use cases, each with different accuracy and timeliness requirements. This enables routing data to multiple destinations based on specific needs.
```java
// Pseudocode illustrating a simple event routing system
public class EventRoutingSystem {
    public void routeEvent(Event event) {
        if (event.isRealTime()) {
            realTimeProcessor.process(event);
        } else if (event.needsDashboards()) {
            dashboardPublisher.publish(event);
        } else if (event.needAlerts()) {
            alertingSystem.sendAlert(event);
        }
    }
}
```
x??

---


#### Service Decomposition and Boundaries
Background context: In this section, we discuss the process of decomposing large services into smaller, more manageable ones. This is done by identifying seams where service boundaries can emerge incrementally. The goal is to make it easier to maintain and evolve the system over time.
:p How do you identify suitable seams for splitting a large service?
??x
To identify suitable seams for splitting a large service, we start by finding areas of functionality that could operate independently. We use techniques like class-responsibility-collaboration (CRC) cards to understand the responsibilities and collaborations within each potential service. This helps in visualizing how different parts of the system interact with one another.
??x
To illustrate this, let's consider a music shop scenario where customers can search for records, register on the website, or purchase albums. We would create CRC cards for each relevant component to understand its responsibilities and interactions.

```pseudocode
// Example CRC card for a Customer Service
class CustomerService {
    Responsibilities:
        - Handle customer registration
        - Process purchases
        - Search for records
    
    Collaborators:
        - PaymentGateway
        - RecordRepository
}
```
x??

#### Root Causes of Large Services
Background context: The text discusses why large services grow beyond a reasonable size and the challenges in splitting them. It emphasizes that growing a service is acceptable but must be done before it becomes too costly.
:p Why do services tend to grow so large, and what are the challenges in splitting them?
??x
Services tend to grow large because as they handle more functionality and scale with the system's requirements, their complexity increases over time. This growth often occurs incrementally without a clear plan for modularity, leading to tightly coupled components that are difficult to isolate.
The main challenges in splitting large services include:
1. **Finding Starting Points**: Identifying where to start decomposition can be challenging since the service might have many interdependencies.
2. **Cost of Splitting**: Resources like infrastructure, development, and testing need to be reallocated, which can be time-consuming.

To address these challenges, libraries, lightweight frameworks, and self-service provision tools can help reduce the cost and complexity of splitting services.
??x
```java
// Example Code for Provisioning a New Service Instance
public class ServiceProvisioner {
    public void createNewServiceInstance(String serviceName) throws Exception {
        // Code to allocate resources, set up new service environment
        System.out.println("Creating instance for " + serviceName);
    }
}
```
x??

#### Incremental Approach to Decomposition
Background context: The text suggests that decomposing a system should be done incrementally. This means making small changes over time rather than attempting a major overhaul all at once.
:p How can we implement an incremental approach to decompose our services?
??x
An incremental approach involves identifying seams or areas of the service where it is relatively easy to isolate functionality. For example, in a music shop scenario:
1. **Identify Functional Areas**: Break down responsibilities like customer registration, record search, and album purchase.
2. **Create CRC Cards**: Use CRC cards to define the responsibilities and collaborations for each new service.
3. **Implement Gradually**: Start by refactoring one area at a time, ensuring that each change is thoroughly tested before moving on.

Here’s an example of how this could be implemented:

```pseudocode
// Step 1: Define Responsibilities
class CustomerRegistrationService {
    Responsibilities:
        - Handle customer sign-up process
    
    Collaborators:
        - Database
}

class RecordSearchService {
    Responsibilities:
        - Search for records based on customer queries
    
    Collaborators:
        - RecordRepository
}
```
x??

#### Cost of Splitting Services
Background context: The text highlights the costs associated with splitting large services, such as finding new infrastructure and setting up a new service stack. It suggests ways to reduce these costs through investment in tools and platforms.
:p What are some ways to reduce the cost of splitting services?
??x
Reducing the cost of splitting services can be achieved by:
1. **Investment in Libraries and Frameworks**: Using established libraries and lightweight frameworks can save development time and effort.
2. **Self-Service Provision Tools**: Providing access to self-service virtual machines or platform as a service (PaaS) can help with quick setup and testing of new services.

For instance, using a PaaS like AWS Elastic Beanstalk can simplify setting up a new environment for the service:
```java
// Example Code Using AWS Elastic Beanstalk
public class ServiceDeployer {
    public void deployServiceToElasticBeanstalk(String serviceName) throws Exception {
        // Code to deploy the service to AWS Elastic Beanstalk
        System.out.println("Deploying " + serviceName + " to Elastic Beanstalk");
    }
}
```
x??

#### Summary of Decomposition and Evolution
Background context: The text concludes by summarizing the importance of decomposing services incrementally, reducing the cost of splitting, and allowing for easier maintenance and evolution over time.
:p What is the overall message about service decomposition in this chapter?
??x
The overall message emphasizes that it's acceptable to grow a service as long as we plan for eventual decomposition. The key is to identify seams where functionality can be isolated incrementally. By doing so, we can keep services manageable and reduce the costs associated with splitting them into smaller, more focused services.
This approach allows us to evolve our systems in an incremental fashion, adapting to new requirements and maintaining a clean architecture.
??x
```java
// Example Code for Incremental Service Decomposition
public class ServiceDecomposer {
    public void decomposeService(String serviceName) throws Exception {
        // Step 1: Identify responsibilities
        identifyResponsibilities(serviceName);
        
        // Step 2: Create CRC cards
        createCRCCards(serviceName);
        
        // Step 3: Implement new services gradually
        implementNewServices(serviceName);
    }
    
    private void identifyResponsibilities(String serviceName) {
        System.out.println("Identifying responsibilities for " + serviceName);
    }
    
    private void createCRCCards(String serviceName) {
        System.out.println("Creating CRC cards for " + serviceName);
    }
    
    private void implementNewServices(String serviceName) {
        System.out.println("Implementing new services for " + serviceName);
    }
}
```
x??
---

---


#### Artifacts for Microservices
In the context of microservices deployment, we often create artifacts that are used for further validation. These artifacts can include compiled code, binaries, or running services that can be tested.

To enable these artifacts to be reused, they are placed in a repository where they can be accessed and deployed consistently across different environments.

:p What are artifacts in the context of microservices deployment?
??x
Artifacts in the context of microservices deployment refer to compiled code, binaries, or running services that are created as part of the CI process. These artifacts are used for further validation and placed in a repository to be accessed and deployed consistently across different environments.
x??

---


#### Microservices CI Mapping
When implementing CI for microservices, it’s important to map individual services to their own builds rather than a single monolithic one.

:p How should microservices be mapped to CI builds?
??x
Microservices should each have dedicated CI builds. This approach allows isolated changes in one service without affecting others, ensuring independent deployment and testing of each component.

For example:
- Each microservice has its own repository.
- Each repository triggers a separate build process.
- The build validates the service independently before deploying.

This setup ensures that developers can make small, incremental changes to individual services without impacting the entire system. It also facilitates easier debugging and quicker troubleshooting when issues arise.

```java
// Pseudocode for CI pipeline for a microservice

public class MicroserviceCI {
    public void runTests() {
        // Run unit tests
        // Run integration tests
        // Run end-to-end tests
        if (allTestsPass) {
            System.out.println("Build is green.");
        } else {
            System.out.println("Build is red. Fix the issues.");
        }
    }
}
```
x??

---


#### Single Repository vs. Multiple Repositories for CI
A single repository can be used for all microservices, but this approach might not always be ideal.

:p How does a single repository with one build process impact CI?
??x
Using a single repository and a unified build process may simplify the initial setup, as it reduces the number of repositories to manage. However, this approach could lead to inefficiencies when making small changes:

- Frequent integrations (daily check-ins) are required.
- All services get tested even if only one service has been changed.
- This can increase wait times and resource usage unnecessarily.

For example:
If you have multiple microservices in a single repository:
```java
// Pseudocode for unified CI build

public class UnifiedCI {
    public void runAllTests() {
        // Run tests for all services
        if (allTestsPass) {
            System.out.println("Build is green.");
        } else {
            System.out.println("Build is red. Fix the issues.");
        }
    }
}
```

In this setup, every check-in triggers a full build and test of all microservices, which might be unnecessary for minor changes.

To optimize, consider using separate repositories or multi-repository CI systems that focus on individual services.
x??

---

---


#### Cycle Time and Deployment Complexity
Background context: The text discusses challenges related to deploying changes efficiently, particularly when working with microservices. Key points include managing cycle time (the speed of moving a change from development to live) and determining which services need to be deployed.

:p What are the main challenges in deploying changes in a microservices architecture?
??x
The primary challenges involve accurately identifying which services should be deployed based on small, individual changes. This can lead to inefficiencies if you end up redeploying everything together or face build failures that block other deployments.
??x

---


#### Build Services and Deployment
Background context: The text explores different approaches to managing builds in microservices environments. These include deploying all services together, using a monolithic source control system with multiple CI builds, and having one CI build per microservice.

:p What is the risk of deploying everything together?
??x
Deploying everything together can lead to significant delays if there's an issue that requires fixing before other changes can proceed. This approach also doesn't allow for fine-grained control over which services are updated.
??x

---


#### Microservice-Specific CI Builds
Background context: The preferred approach discussed is having one CI build per microservice. This allows for rapid and targeted deployment.

:p Why is a single CI build per microservice advantageous?
??x
It provides clear ownership of the service by the respective team, simplifies testing, and enables faster validation before production deployment.
??x

---


#### Test Automation in Microservices
Background context: The text emphasizes that tests should be part of each microservice's source code repository to ensure accurate test coverage.

:p How can tests for a microservice be managed effectively?
??x
Tests for a microservice should reside within the same source control as its code. This ensures that developers run the correct set of tests every time they make changes.
??x

---


#### Continuous Delivery Integration
Background context: The text moves beyond CI to discuss continuous delivery, indicating an end-to-end process from development to production.

:p What is the relationship between CI and CD in this context?
??x
Continuous Delivery (CD) extends the benefits of CI by automating not just builds but also deployments. It ensures that code changes can be safely delivered to production at any time.
??x

---


#### Build Pipelines and Continuous Delivery
Continuous integration (CI) is a method where developers merge their work frequently, usually several times a day, into a shared repository. This allows for multiple stages within a build to be introduced, particularly useful when different types of tests are involved. The idea behind this is to ensure that fast, small-scoped tests provide quick feedback before slow, large-scoped tests run.
:p What is the purpose of having multiple stages in a build pipeline?
??x
The purpose of having multiple stages in a build pipeline is to separate fast, small-scoped tests from slower, larger-scoped tests. This allows for quicker feedback on failing fast tests without waiting for slower tests to complete. If the fast tests fail, there's no need to run slow tests, which saves time and resources.
x??

---


#### Build Pipelines
Build pipelines are a way of organizing stages in a build process where each stage runs specific tasks or tests. This helps in tracking the progress of software as it clears through different environments, providing insights into its quality before release.

:p How does a build pipeline help in managing different types of tests?
??x
A build pipeline helps manage different types of tests by segregating them into distinct stages. For instance, you can have one stage for fast unit tests and another for slower integration or end-to-end tests. This separation ensures that fast feedback is available early on, reducing the time wasted waiting for slow tests to complete if fast tests fail.
x??

---


#### Continuous Delivery
Continuous delivery (CD) builds upon continuous integration by treating each check-in as a potential release candidate. It involves modeling all processes from development to production and tracking the readiness of software versions.

:p What is the main difference between continuous integration and continuous delivery?
??x
The main difference between continuous integration and continuous delivery is that CI focuses on frequent merging of code into a shared repository, while CD goes further by treating every commit as a potential release candidate. CD involves modeling all processes from development to production, ensuring each version is ready for deployment.
x??

---


#### Multistage Build Pipelines
Multistage build pipelines extend the concept of continuous integration by including multiple stages that an artifact must pass through to be considered production-ready. This helps in tracking the quality and progress of software as it moves towards release.

:p How do multistage build pipelines differ from traditional CI pipelines?
??x
Multistage build pipelines differ from traditional CI pipelines by incorporating more stages that represent different environments or processes (e.g., testing, UAT, staging) before a final production release. This adds visibility and ensures each stage is validated before moving to the next.
x??

---


#### Model All Processes
In continuous delivery, all processes from check-in to production are modeled to track the readiness of every version of the software.

:p Why is it important to model all processes in a build pipeline?
??x
It is important to model all processes in a build pipeline because it ensures visibility into the entire release process. By modeling each stage, you can track the quality and status of your code as it moves through different environments, from development to production. This helps in identifying bottlenecks and issues early on.
x??

---


#### Microservices World
In a microservices world, where services are released independently, one pipeline per service is recommended to ensure proper release management.

:p How does the concept of build pipelines apply differently in a microservices architecture?
??x
In a microservices architecture, each microservice has its own pipeline. This ensures that individual services can be released and updated independently without affecting others. Each pipeline focuses on the specific logic and dependencies of that service, providing fine-grained control over release processes.
x??

---

---


#### Initial Service Boundaries for Greenfield Projects
When a team is starting out with a new project, especially one that’s completely new, there will be significant churn as they figure out where service boundaries should lie. During this initial phase, it's often beneficial to keep services larger and in the same build because changes across these boundaries are frequent.
:p Why might it make sense to keep all services in a single build during the early stages of a project?
??x
During the early stages, keeping services together can reduce the overhead of cross-service changes, making development and debugging easier. However, this approach is meant as a transitionary measure until service boundaries stabilize.
x??

---


#### Automated Deployment Tools
Tools like Puppet, Chef, and Ansible can help manage and configure additional software needed to deploy microservices that use different artifact formats. These tools can also standardize the deployment process across multiple technologies.
:p How do automated configuration management tools aid in managing deployments?
??x
Automated tools like Puppet or Chef allow for the creation of scripts that define how services should be configured and deployed, abstracting away differences between artifacts. This helps ensure consistency and reduces manual errors.
x??

---


#### Time-Varying Dependencies

Background context: Over time, as more tools are added to a machine's dependencies, the time needed for provisioning increases. This can become a bottleneck when deploying changes frequently.

:p Why is managing long-term dependency installation problematic?
??x
Managing long-term dependency installations becomes problematic because the process of installing new software every time can take significant time, which can delay deployments and provide slow feedback during development or CI cycles.
x??

---


#### Custom Virtual Machine Images

Background context: Creating a custom virtual machine (VM) image that includes common dependencies can significantly reduce setup time. This is especially useful for frequent deployments.

:p What are the key benefits of using custom VM images?
??x
The key benefits include faster deployment as new instances do not require reinstallation of dependencies, reduced downtime during updates, and consistent environments across multiple deployments.
x??

---

