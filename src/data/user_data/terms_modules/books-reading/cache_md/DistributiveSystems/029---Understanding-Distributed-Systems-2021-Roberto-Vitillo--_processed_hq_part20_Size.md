# High-Quality Flashcards: 029---Understanding-Distributed-Systems-2021-Roberto-Vitillo--_processed (Part 20)

**Rating threshold:** >= 8/10

**Starting Chapter:** Size

---

**Rating: 8/10**

#### Test Pyramid
Background context: The Test Pyramid is a concept that illustrates the relative proportion of different types of tests within an application's test suite. This helps in understanding which type of testing should be prioritized and where resources can be effectively allocated.

:p What is the Test Pyramid and how does it help in structuring a test suite?
??x
The Test Pyramid is a principle used to structure a software testing strategy, suggesting that unit tests form the largest portion (the base) of the pyramid, followed by integration tests, and then end-to-end or system tests forming the smallest section on top. This structure helps ensure that more time is spent on foundational tests at the lower levels, which are faster and less prone to flakiness.

This pyramid indicates:
- The majority of tests (unit tests) should be fast, deterministic, and isolated.
- Integration and end-to-end tests take a smaller but still significant proportion.
- The smallest number of tests would be system or end-to-end tests that simulate full application scenarios.

For example, consider the following simplified representation in terms of relative sizes:
```plaintext
   +---------+
   | E2E Tests|
   +---------+
         |
         v
  +---------+       +----------+      +------------+
  | Int Tests|<---->| Mock Tests|------| Unit Tests  |
  +---------+       +----------+      +------------+
```
x??

---

#### Test Size
Background context: The size of a test can be quantified by the amount of computing resources it consumes. Smaller tests are faster, more deterministic, and less likely to fail intermittently.

:p What does the term "size" refer to in the context of testing?
??x
The term "size" in testing refers to how much computational resource a test needs to run. This can be measured by factors such as the number of nodes (computational units) required, whether it involves local or network I/O, and its overall complexity.

For example:
- A small test runs within a single process, performs no blocking calls, and has very little interaction with external systems.
- An intermediate test might run on a single node but perform local I/O operations like disk reads or network calls to the localhost. This can introduce more delays and non-determinism, increasing the likelihood of intermittent failures.

Small tests are characterized by:
```python
def small_test():
    # Quick operation with no external dependencies
    assert 1 + 1 == 2
```
Intermediate tests might look like this:
```python
import time

def intermediate_test():
    start_time = time.time()
    # Some I/O operations that take a few seconds
    time.sleep(5)
    end_time = time.time()
    assert (end_time - start_time) > 4.9
```
x??

---

#### Test Doubles
Background context: Test doubles are imitations of real dependencies used in testing to make tests more isolated and easier to run. They include fakes, stubs, and mocks.

:p What are test doubles and why are they useful?
??x
Test doubles are mock objects or functions that simulate the behavior of real dependencies but in a controlled manner for testing purposes. The main benefits are:
- Isolation: Tests can be more isolated from external systems.
- Speed: Test doubles can make tests faster since they don't involve actual network calls, database queries, etc.
- Simplicity: Tests can focus on specific logic without the complexity of real dependencies.

Types of test doubles include:
- Fake: A lightweight implementation that behaves similarly to a real dependency. Example:
```java
public class InMemoryDatabase implements Database {
    // Simplified in-memory storage logic
}
```
- Stub: A function that always returns the same value regardless of input, used for simple return values or side effects.
```java
public class StubFunction {
    public int alwaysReturnsFive() {
        return 5;
    }
}
```
- Mock: An object with expectations on how it should be called. Used to test interactions between objects.
```java
import org.mockito.Mockito;

// Mocking an interface method
Mockito.when(mockDatabase.get("key")).thenReturn("value");
```

Using test doubles appropriately can help in maintaining a robust testing strategy while reducing the complexity and flakiness of tests.

x??

---

#### Contract Tests
Background context: A contract test defines the expected interaction with external dependencies, ensuring that both sides of an interface (the producer and consumer) agree on the terms of their communication. This helps in maintaining stability when integrating components or services.

:p What is a contract test and how does it work?
??x
A contract test specifies what requests should be sent to an external dependency and what responses are expected from that dependency. The contract is then used by tests to mock the external dependencies, ensuring that the interaction remains consistent over time.

For example, consider a REST API contract:
```java
public class RestApiContract {
    public HttpRequest createRequest() {
        return new HttpRequest("GET", "/user/123");
    }

    public HttpResponse createExpectedResponse() {
        return new HttpResponse(200, "User found");
    }
}
```
In the test suite of the external dependency, a similar contract is used to simulate client behavior and verify that the expected response is returned:
```java
public class ExternalServiceTest {
    @Test
    public void shouldReturnExpectedResponse() throws Exception {
        // Setup
        RestApiContract contract = new RestApiContract();
        
        // Action
        HttpResponse actualResponse = service.get(contract.createRequest());
        
        // Assert
        assertEquals(contract.createExpectedResponse(), actualResponse);
    }
}
```
This approach helps in maintaining a consistent and reliable interaction model between services, reducing the risk of breaking changes.

x??

---

**Rating: 8/10**

#### Tradeoffs in Testing
Background context: When testing, especially for complex services involving multiple components and external dependencies, there are often trade-offs to be made. The goal is to write tests that are small and maintainable while ensuring they cover critical functionalities.

:p How do you handle external dependencies when writing tests?
??x
When dealing with external dependencies like other services or third-party APIs, mocks or stubs can be used to isolate the component being tested. For instance, if an API endpoint depends on a database and a billing service:
- Use in-memory mock implementations of databases.
- Utilize sandboxed environments or playgrounds provided by third-party services.

For example, if no such environment is available, you might use mocking frameworks (like Mockito for Java) to simulate the behavior of these external systems:

```java
import org.mockito.Mockito;

// Setup a mocked database service
Mockito.mock(DatabaseService.class);

// Or using a real mock object
DatabaseService db = Mockito.mock(DatabaseService.class);
```
x??

---

#### Choosing Test Approaches Based on Risk
Background context: The choice between unit tests, integration tests, and end-to-end tests depends heavily on the risk associated with functionality failure. High-risk scenarios may require more thorough testing to ensure reliability.

:p In what scenario would you use an end-to-end test that runs in production?
??x
End-to-end tests are used when the potential consequences of a failing feature are severe enough to warrant additional confidence. For example, if compliance laws (like GDPR) mandate specific data handling and failure could result in substantial fines (up to 20 million euros or 4% annual turnover), it's crucial to test that the feature works as expected with live services.

Here’s an example of setting up a basic end-to-end test using a framework like JUnit:

```java
import org.junit.jupiter.api.Test;
import static org.junit.jupiter.api.Assertions.*;

public class DataPurgingTest {
    @Test
    public void testDataPurging() {
        // Setup live services or use an environment that mimics production
        // Perform the purging operation and verify outcomes using real data
    }
}
```
x??

---

#### Leveraging Mocks and Fakes
Background context: To reduce complexity in tests, especially when dealing with external systems, mocks and fakes can be used to simulate behavior. This helps in isolating the component under test without depending on actual live services.

:p How do you use a fake implementation for a data store in testing?
??x
A fake implementation of a data store (e.g., an in-memory version) can be used to avoid making real database calls during tests. For instance, using an in-memory H2 database:

```java
import org.h2.tools.Server;
import java.sql.Connection;

public class DataStoreTest {
    private Connection connection;

    @Before
    public void setUp() throws SQLException {
        // Start an embedded H2 server for in-memory testing
        String url = "jdbc:h2:mem:test;DB_CLOSE_DELAY=-1";
        connection = Server.createTcpServer("-tcpPort", "9092").start();
        try (Connection conn = DriverManager.getConnection(url)) {
            Statement stmt = conn.createStatement();
            // Initialize database schema and data for testing
        }
    }

    @After
    public void tearDown() throws SQLException {
        if (connection != null) {
            connection.close();
        }
    }
}
```
x??

---

#### Risk-Based Testing Decisions
Background context: The decision to use mocks, fakes, or real services depends on the risk of failure. High-risk scenarios necessitate thorough testing with minimal dependencies.

:p How do you decide between using mocks and end-to-end tests?
??x
Decide based on the criticality of the feature:
- Use mocks and stubs for lower-risk features where the external systems can be isolated.
- For high-risk features (like compliance requirements), use end-to-end tests that run in a sandboxed environment or even in production to ensure reliability.

For example, if GDPR compliance is involved:

```java
import org.junit.jupiter.api.Test;
import static org.junit.jupiter.api.Assertions.*;

public class ComplianceTest {
    @Test
    public void testDataPurgingCompliance() {
        // Setup the service with a sandbox environment
        // Perform data purging and verify compliance rules are followed using live services
    }
}
```
x??

---

**Rating: 8/10**

#### Continuous Delivery and Deployment Overview
Background context: Continuous delivery and deployment (CD) automate the release of changes to production. This process ensures that changes can be released quickly, safely, and with minimal manual intervention. It requires significant investment in automation, monitoring, and safeguards.

:p What is continuous delivery and deployment?
??x
Continuous Delivery and Deployment automates the entire software release process, from code change merging to its deployment into production. It involves multiple stages such as review, build, pre-production rollout, and production rollout. This ensures that changes can be released quickly and safely without manual intervention.
x??

---

#### Review Stage in CD Pipeline
Background context: The first stage of the CD pipeline is the review stage where code changes are reviewed by a team member before being merged into the repository. This step involves compiling, statically analyzing, and validating tests.

:p What happens during the review stage?
??x
During the review stage, a pull request (PR) submitted for review needs to be compiled, statically analyzed, and validated with a battery of tests. The PR should include unit, integration, and end-to-end tests as needed. Additionally, it should have metrics, logs, and traces. The reviewer must ensure that the change is correct and safe to release automatically by the CD pipeline.
x??

---

#### Build Stage in CD Pipeline
Background context: After a code change has been reviewed and merged into the repository’s main branch, the build stage follows. Here, the content of the repository is built and packaged into a deployable artifact.

:p What happens during the build stage?
??x
During the build stage, after a code change is merged into the repository’s main branch, the CD pipeline builds the repository's content and packages it into a deployable release artifact. This step ensures that the software can be deployed safely to production.
x??

---

#### Automated Rollout in CD Pipeline
Background context: The pre-production rollout stage involves deploying the build artifacts to a staging environment for final testing before moving to production.

:p What is the purpose of the pre-production rollout?
??x
The purpose of the pre-production rollout is to deploy the build artifacts to a staging environment where they undergo final testing. This ensures that any issues can be identified and fixed before the release goes live in production.
x??

---

#### Production Rollout in CD Pipeline
Background context: The final stage of the CD pipeline, the production rollout, involves deploying the tested artifact into the actual production environment.

:p What happens during the production rollout?
??x
During the production rollout, the tested artifact is deployed into the actual production environment. This deployment is automated and ensures that changes can be released quickly and safely to users.
x??

---

#### Automation and Monitoring in CD Pipeline
Background context: Continuous delivery and deployment pipelines require significant investment in automation, monitoring, and safeguards to ensure safe and efficient deployments.

:p Why is automation important in CD pipelines?
??x
Automation is crucial in CD pipelines because it reduces the time spent on manual processes, minimizes human errors, and allows developers to focus on more critical tasks. It ensures that changes can be released quickly and safely without extensive manual intervention.
x??

---

#### Safeguards for Rollbacks
Background context: In case a regression occurs during deployment, the artifact can either be rolled back to the previous version or forwarded to the next one if it contains a hotfix.

:p What should be done in case of a detected regression?
??x
In case of a detected regression, the artifact being released is either rolled back to the previous version or forwarded to the next one if it contains a hotfix. This ensures that any issues can be mitigated quickly and efficiently.
x??

---

#### Importance of Reviewing Configurations
Background context: Configuration changes should also undergo review and release through CD pipelines to avoid production failures caused by untested global configuration changes.

:p Why are configuration changes important in the CD pipeline?
??x
Configuration changes are crucial because they can significantly impact the functionality of a system. If not reviewed and tested properly, they can cause unexpected behavior or even production failures. Using CD pipelines for configuration changes ensures that such changes are thoroughly validated before deployment.
x??

---

