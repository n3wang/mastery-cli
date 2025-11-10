# High-Quality Flashcards: Sam-Newman---Building-Microservices-OReilly-Media-2015_processed (Part 17)


**Starting Chapter:** Types of Tests

---


#### Service Independence and CI Builds
Maintaining the ability to release one microservice independently from another is crucial. This requires using a technology that supports independent deployment of services, such as separating each service into its own repository and ensuring there's a CI build per microservice for separate deployment.

:p What are the key points regarding service independence in microservices?
??x
The key points include maintaining the ability to release one service independently from another. This requires using a technology that supports independent deployment of services, such as separating each service into its own repository and ensuring there's a CI build per microservice for separate deployment.
x??

---


#### Automation and Platform Use
Automation is crucial in managing microservices. Using platforms like AWS can provide significant benefits due to the extensive automation features these platforms offer.

:p Why is automation important for managing microservices?
??x
Automation is essential because it allows for consistent, reliable, and repeatable processes in deploying, scaling, and maintaining microservices. Platforms like AWS facilitate this by offering built-in automation tools that simplify tasks such as provisioning resources, deploying applications, and managing infrastructure.

Using AWS Lambda as an example:
```python
# Example of a simple Lambda function in Python
def lambda_handler(event, context):
    # Handle the event and perform necessary operations
    return {
        'statusCode': 200,
        'body': json.dumps('Hello from Lambda!')
    }
```
x??

---


#### Self-Service Deployment Tools
Creating tools that allow developers to self-service deploy any given service into different environments can greatly enhance productivity. This reduces the burden on DevOps teams and ensures consistency in deployment across various stages.

:p Why are self-service deployment tools important for microservices?
??x
Self-service deployment tools are crucial because they empower developers to manage their services independently, reducing the need for frequent manual intervention by DevOps teams. This results in faster deployment cycles, improved collaboration between development and operations teams, and ensures consistency across different environments like staging and production.

Example of a self-service deployment tool:
```bash
# Example command for deploying a service using a self-service tool
deploy-service my-service --stage staging
```
x??

---


#### Continuous Delivery (CD) Books Recommendation
For more in-depth knowledge on microservices, Continuous Delivery by Jez Humble and David Farley is highly recommended. It covers topics like pipeline design and artifact management.

:p What book would you recommend for deeper understanding of microservices?
??x
The book "Continuous Delivery: Reliable Software Releases through Build, Test, and Deployment Automation" by Jez Humble and David Farley is highly recommended. It provides detailed insights into continuous delivery practices, including pipeline design and artifact management.
x??

---


#### Testing Microservices
Testing in a distributed system adds complexity. Tools like Brian Marick's testing quadrant can help categorize different types of tests to balance speed and quality.

:p What does the testing quadrant by Brian Marick differentiate?
??x
Brian Marick’s testing quadrant helps categorize different types of tests into four quadrants:
1. Bottom-left: Technology-facing tests (unit tests, performance tests)
2. Top-left: Business-facing tests that help non-technical stakeholders understand system behavior (acceptance tests)
3. Top-right: End-to-end tests (integration and acceptance tests) and manual testing
4. Bottom-right: Exploratory testing

This categorization helps in understanding the balance between different types of tests to ensure both speed and quality.
x??

---


#### Unit Tests
Background context: Unit tests are a type of automated test that typically checks individual units or functions in isolation. Cohn’s original model referred to these as "unit" tests, though this term can be ambiguous since it is often used interchangeably with other terms like component testing.
:p What defines a unit test according to the Test Pyramid?
??x
A unit test, according to the Test Pyramid, typically checks individual units or functions in isolation. This means that each test focuses on a small piece of functionality without considering its interactions with other parts of the system. In Cohn’s original model, these are referred to as "unit" tests.
x??

---


#### Service Tests
Background context: Service tests, according to Mike Cohn, are a type of automated test that checks multiple functions or classes working together in an integrated manner but not involving the user interface (UI). This layer is often misunderstood and can be confused with other types of integration testing.
:p What are service tests in the Test Pyramid?
??x
Service tests, as defined by Mike Cohn in the Test Pyramid, check multiple functions or classes working together in an integrated manner without involving the UI. These tests are broader than unit tests but narrower than end-to-end (UI) tests. They simulate interactions between different components of the system.
x??

---


#### Unit Tests
Background context explaining unit tests. Unit tests typically test a single function or method call and are used in test-driven design (TDD) and property-based testing. The goal is to provide very fast feedback about the functionality of code snippets in isolation.
:p What are unit tests?
??x
Unit tests are designed to test individual functions or methods in isolation, providing quick feedback on the correctness of small parts of the codebase. They help catch bugs early in the development process and support refactoring by ensuring that changes do not break existing functionality.

```java
public void testAddition() {
    Calculator calculator = new Calculator();
    int result = calculator.add(1, 2);
    assertEquals(3, result);
}
```
x??

---


#### Service Tests
Background context explaining service tests. Service tests are used to test individual services within a system or monolithic application by stubbing out external collaborators, allowing for isolated testing of service capabilities.
:p What are service tests?
??x
Service tests bypass the user interface and focus on testing individual services in isolation. This is achieved by stubbing out all external dependencies, ensuring that only the service itself is tested. Service tests help improve the isolation of tests, making it easier to find and fix issues.

```java
public void testUserService() {
    UserService userService = new UserService();
    MockUserRepository userRepository = new MockUserRepository();
    userService.setUserRepository(userRepository);
    
    User user = new User("john", "password");
    userService.registerUser(user);
    assertEquals(1, userRepository.users.size());
}
```
x??

---


#### End-to-End Tests
Background context explaining end-to-end tests. These tests simulate the entire workflow of a system from start to finish, often driving a GUI through a browser or mimicking other user interactions.
:p What are end-to-end tests?
??x
End-to-end (E2E) tests cover the complete flow of a system, including interactions with databases and external services. They provide high confidence that the code will work in production environments but can be slow and more complex to set up and maintain.

```java
@bdd.scenario("User registration", "Testing end-to-end flow")
public void userRegistration() {
    WebDriver driver = new ChromeDriver();
    
    // Navigate to the registration page
    driver.get("http://example.com/register");
    
    // Fill in form fields
    WebElement usernameField = driver.findElement(By.name("username"));
    usernameField.sendKeys("testuser");
    
    WebElement passwordField = driver.findElement(By.name("password"));
    passwordField.sendKeys("testpass123");
    
    // Submit the form
    WebElement submitButton = driver.findElement(By.cssSelector("input[type='submit']"));
    submitButton.click();
    
    // Check if the user is registered successfully
    WebElement successMessage = driver.findElement(By.id("success-message"));
    assertEquals("Registration successful!", successMessage.getText());
}
```
x??

---


#### Trade-Offs in Testing
Background context explaining trade-offs between different types of tests. The pyramid model illustrates that as test scope increases, so does the confidence level and complexity.
:p What are the key trade-offs when considering unit, service, and end-to-end tests?
??x
The key trade-offs involve balancing the speed of feedback with the confidence in functionality:

- **Unit Tests**: Fast but limited to small scopes; catch local bugs early.
- **Service Tests**: Faster than E2E, isolated environment for services; harder to pinpoint issues if they fail.
- **End-to-End Tests**: Provide full system confidence, slow and resource-intensive.

For example:
```java
// Unit Test - Fast and focused on a small function
public void testAddition() {
    Calculator calculator = new Calculator();
    int result = calculator.add(1, 2);
    assertEquals(3, result);
}

// Service Test - Isolated environment for testing services
public void testUserService() {
    UserService userService = new UserService();
    MockUserRepository userRepository = new MockUserRepository();
    userService.setUserRepository(userRepository);
    
    User user = new User("john", "password");
    userService.registerUser(user);
    assertEquals(1, userRepository.users.size());
}

// End-to-End Test - Full system simulation
@bdd.scenario("User registration", "Testing end-to-end flow")
public void userRegistration() {
    WebDriver driver = new ChromeDriver();
    
    // Navigate to the registration page
    driver.get("http://example.com/register");
    
    // Fill in form fields and submit, then verify success message
}
```
x??

---

---


#### Broken Functionality Detection
Background context: The text discusses how broken functionality detection is crucial for maintaining software quality. It mentions that finding and fixing broken functionality faster leads to more efficient development processes.

:p How can a team ensure they detect broken functionality faster?
??x
A team can ensure they detect broken functionality faster by using a combination of unit tests, service tests, and end-to-end tests in their continuous integration builds. This approach helps in quickly identifying which part of the code has caused an issue.
???x

---


#### Feedback Cycles Improvement
Background context: The text suggests that feedback cycles are crucial for efficient development. It mentions that smaller-scoped tests provide quicker feedback on what exactly broke.

:p How can a team improve their feedback cycles?
??x
A team can improve their feedback cycles by writing more unit tests and fewer end-to-end or service tests, as unit tests provide faster feedback on specific parts of the codebase. The team should also aim to replace broader-scoped tests with smaller-scoped ones where possible.
???x

---


#### Test Snow Cone
Background context: The text describes a common anti-pattern known as the test snow cone, where there are few small-scoped tests but many large-scoped ones.

:p What is the issue with a test snow cone structure?
??x
A test snow cone structure has too many end-to-end and service tests, leading to slow feedback cycles. This setup can significantly impact development speed because builds run slower and issues might remain unresolved for longer periods.
???x

---


#### Implementing Service Tests
Background context: The text discusses the implementation of service tests, which aim to test a slice of functionality across an entire service while stubbing out collaborators.

:p How do you implement service tests in a system?
??x
To implement service tests, you need to create instances of services and stub out any downstream dependencies. For example, if testing the customer service from Figure 7-3, deploy the customer service instance and stub out its downstream service (like the loyalty points bank). Configure these stubs to return expected responses.
???x

---


#### Stubbing Downstream Collaborators
Background context: The text explains how to mock or stub collaborators in a test environment.

:p How do you handle faking downstream collaborators for service tests?
??x
To fake downstream collaborators, you can create a stub service that responds with predefined responses. For example, if testing the customer service, you might configure the stub loyalty points bank to return known points balances for certain customers.
???x

---


#### Stub vs Mock Approach

Background context: The text discusses the use of stubs and mocks in testing, explaining their differences and when to use each. It also introduces tools like Mountebank for creating mock services.

:p What is the main difference between a stub and a mock in testing?

??x
A stub does not care about how many times it is called or if any calls are made, whereas a mock verifies that specific methods or actions were performed during the test. Stubs return fixed responses to simplify tests, while mocks track interactions to ensure they occur as expected.
x??

---


#### Stubbing vs Mocking in Service Tests

Background context: The text highlights the difference between using stubs versus mocks in service tests, explaining that stubs are used more frequently.

:p In what situations might you prefer a mock over a stub?

??x
You would prefer a mock when you need to verify interactions with a collaborator. For example, if you want to ensure that a specific method is called during the test. Stubs are useful when you just want to provide canned responses without tracking the number or nature of calls.
x??

---


#### Implementing a Stub Service

Background context: The text discusses different methods for implementing stub services, mentioning personal experiences and the introduction of Mountebank.

:p How can you implement a stub service using Mountebank?

??x
To use Mountebank as a stub service:
1. Launch it specifying the port and protocol.
2. Define the expected requests and their responses via HTTP commands.
3. Optionally set expectations to track interactions.
4. Use these endpoints in your tests.

For example, to create a simple HTTP stub:
```
curl -X POST http://localhost:2525/stubs --data '{"protocol": "http", "port": 8081, "methods": ["GET"], "responses": [{"statusCode": 200, "body": "{'balance': 15000}"}]}'
```

x??

---


#### Testing Service Interactions

Background context: The text discusses the importance of testing interactions between different services and not just individual components.

:p How can you ensure that changes in one service do not break others?

??x
You should test the interaction between services, such as running integration tests where your customer service communicates with a stubbed or mocked version of the loyalty points bank. After ensuring these internal tests pass, consider testing the external interactions by simulating how real clients (like helpdesk and web shop) would interact with your customer service.
x??

---

---


#### End-to-End Testing in Microservices
Background context explaining the concept: In a microservice architecture, end-to-end tests are crucial for ensuring that all services interact correctly when deployed together. Mike Cohn's testing pyramid highlights their importance by placing them at the top due to their broad coverage of the system.
:p What is the role of end-to-end tests in a microservice system?
??x
End-to-end tests simulate user interactions through multiple services, providing an overview of how these services work together. They help ensure that all parts of the system behave as expected when deployed in production-like environments.
```java
// Pseudocode for an end-to-end test scenario
public class EndToEndTest {
    @Test
    public void testCustomerService() {
        // Deploy and configure all services (customer, helpdesk, webshop)
        CustomerService customerService = deployAndConfigureServices();
        
        // Perform actions that a user might do through the UI
        String customerId = createCustomer(customerService);
        
        // Verify interactions with other services
        boolean isHelpDeskAvailable = checkAvailability(customerId, helpdeskService);
        assertTrue(isHelpDeskAvailable);
    }
}
```
x??

---


#### Deployment Strategy for End-to-End Tests
Background context explaining the concept: When deploying a new version of one service in a microservice system, it's essential to test its interaction with other services. This involves running end-to-end tests that require multiple service deployments.
:p How should we manage deployment and testing of new versions across services?
??x
We can use a pipeline design where each service change triggers an end-to-end test stage. This approach ensures that every time a service changes, the entire system is tested to catch potential integration issues early.

This can be achieved by having multiple pipelines fan in to a single end-to-end test stage. Here’s how this setup works:
```java
// Pseudocode for a pipeline configuration
public class PipelineConfig {
    public void configurePipelines() {
        // Service A pipeline
        serviceAPipeline = new ServicePipeline();
        serviceAPipeline.onBuild().then(testServiceAAndDependencies());
        
        // Service B pipeline
        serviceBPipeline = new ServicePipeline();
        serviceBPipeline.onBuild().then(testServiceBAndDependencies());
        
        // End-to-end test stage
        endToEndTestStage = new EndToEndTestStage();
        serviceAPipeline.fanIn(endToEndTestStage);
        serviceBPipeline.fanIn(endToEndTestStage);
    }
    
    private void testServiceAAndDependencies() {
        deployServices(); // Deploy all services including A, B, etc.
        runEndToEndTests(); // Run end-to-end tests against the deployed services
    }
}
```
x??

---


#### Fan-In Pipeline Model
Background context explaining the concept: The fan-in model is a strategy where multiple pipelines contribute to a single end-to-end test stage. This ensures that every change in any service triggers the execution of comprehensive integration tests.
:p What is the fan-in pipeline model, and why is it beneficial?
??x
The fan-in pipeline model involves setting up separate pipelines for each microservice. Each pipeline runs its specific tests but then feeds into a common end-to-end test stage where all services are deployed and tested together.

This approach is beneficial because:
- It ensures that changes in any service trigger comprehensive system-wide testing.
- It avoids redundant testing by sharing the deployment of services across multiple pipelines.
```java
// Pseudocode for fan-in pipeline model
public class PipelineManager {
    public void managePipelines() {
        List<ServicePipeline> pipelines = new ArrayList<>();
        
        // Add individual service pipelines
        ServiceA pipelineA = new ServiceAPipeline();
        pipelines.add(pipelineA);
        
        ServiceB pipelineB = new ServiceBPipeline();
        pipelines.add(pipelineB);
        
        // Common end-to-end test stage
        EndToEndTestStage endToEndTestStage = new EndToEndTestStage();
        
        for (ServicePipeline pipeline : pipelines) {
            pipeline.fanIn(endToEndTestStage); // Fan in to the common test stage
        }
    }
}
```
x??

---


#### Handling Different Service Versions
Background context explaining the concept: When deploying a new version of a service, it's crucial to decide whether to test against production versions or new development versions. This decision affects the reliability and speed of testing.
:p How do we handle different service versions during end-to-end testing?
??x
Handling different service versions involves deciding whether to use the current production versions or the latest development versions for end-to-end tests. This can be managed by setting up a flexible pipeline that allows for both options:
- Test against production versions to ensure compatibility with live systems.
- Test against new development versions to catch integration issues early.

This flexibility is achieved through configurable settings in the CI/CD pipelines, ensuring that different environments (staging vs. production) are tested appropriately.
```java
// Pseudocode for handling different service versions
public class PipelineConfigurator {
    public void configurePipelines(String environment) {
        if ("production".equals(environment)) {
            // Use production services for end-to-end tests
            deployProductionServices();
        } else {
            // Use development services for end-to-end tests
            deployDevelopmentServices();
        }
        
        runEndToEndTests(); // Run the same end-to-end test against selected versions
    }
}
```
x??

---


#### Redundancy in Testing
Background context explaining the concept: While end-to-end tests are essential, they can sometimes overlap with other testing methods. Managing this redundancy is crucial to avoid unnecessary work and ensure efficient deployment.
:p How do we prevent redundancy in our test suite?
??x
Preventing redundancy involves carefully designing your CI/CD pipeline so that different types of tests (unit, integration, end-to-end) are not duplicating each other's efforts.

For example, if you have unit tests covering basic functionalities and integration tests ensuring service interactions, end-to-end tests should focus on higher-level scenarios rather than retesting lower levels.
```java
// Pseudocode for preventing redundancy
public class TestStrategy {
    public void configureTests() {
        // Unit tests cover individual components
        List<UnitTest> unitTests = new ArrayList<>();
        
        // Integration tests ensure services interact correctly
        List<IntegrationTest> integrationTests = new ArrayList<>();
        
        // End-to-end tests cover complex scenarios involving multiple services
        List<EndToEndTest> endToEndTests = new ArrayList<>();
        
        run(unitTests, "unit"); // Run unit tests
        run(integrationTests, "integration"); // Run integration tests
        run(endToEndTests, "end-to-end"); // Run end-to-end tests
        
        // Ensure no overlap by checking test coverage and dependencies
    }
    
    private void run(List<Test> tests, String testType) {
        for (Test test : tests) {
            if (!test.getCoveredByOtherTests(testType)) { // Custom logic to check redundancy
                test.run();
            }
        }
    }
}
```
x??

---

