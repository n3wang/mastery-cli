# High-Quality Flashcards: 4A008---Terraform_-Up-and-Running_-Writing-Infrastructure-as-Code-OReilly-Media-2022_processed (Part 25)


**Starting Chapter:** Conclusion

---


#### Production-Grade Infrastructure Checklist
The process involves going through a checklist to ensure all necessary elements for production-grade Terraform code are considered. This includes aspects such as error handling, logging, security, and more, ensuring the infrastructure is robust and maintainable.

:p What is the purpose of the production-grade infrastructure checklist?
??x
The purpose of the production-grade infrastructure checklist is to systematically identify key components required for building reliable, secure, and maintainable Terraform code. By going through this checklist, developers can ensure that their infrastructure code meets certain standards before deployment. This includes checking for error handling, logging mechanisms, security practices, and other best practices.

```yaml
# Example of a simplified production-grade infrastructure checklist
- Error Handling: Implement robust error handling.
- Logging: Ensure logs are well configured and detailed.
- Security: Check for secure configuration and authentication methods.
- Reusability: Design modules to be reusable across projects.
```
x??

---


#### Test Folder and Automated Tests
Create a `test` folder to write automated tests for each example. This ensures that your infrastructure code is reliable and robust.

:p What are the benefits of writing automated tests for Terraform modules?
??x
Writing automated tests for Terraform modules provides several benefits:
1. **Reliability**: Ensures that changes in one part of the infrastructure do not break other parts.
2. **Maintainability**: Tests serve as documentation, helping new team members understand how to use and maintain the code.
3. **Regression Testing**: Prevents regressions by catching issues early in the development process.

For example:
```hcl
# Example: Test for VPC creation
resource "aws_vpc" "test_vpc" {
  cidr_block = var.cidr_block

  tags = {
    Name = "Test-VPC"
  }
}

output "vpc_id" {
  value = aws_vpc.test_vpc.id
}
```

Automated tests should cover various scenarios and edge cases to ensure comprehensive coverage.

```java
public class TestVpcCreation {
    public void testVpcCreation() throws Exception {
        // Setup Terraform state
        String terraformState = "provider \"aws\" {\n" +
                                "  region = \"us-west-2\"\n" +
                                "}\n" +
                                "\n" +
                                "resource \"aws_vpc\" \"test_vpc\" {\n" +
                                "  cidr_block = \"10.0.0.0/16\"\n" +
                                "}\n";
        
        // Run Terraform apply
        String output = runTerraform(terraformState);
        
        // Assert VPC ID is present in the output
        assertTrue(output.contains("aws_vpc.test_vpc.id"));
    }
}
```
x??

---

---


#### Testing Web Server Code in Ruby
Background context: An example of manually testing code written in a general-purpose programming language, specifically a simple web server in Ruby.

:p How would you write a script to test a simple web server implemented in Ruby?

??x
You can create a script that runs the web server and tests its responses. Here's an example:

```ruby
class WebServer < WEBrick::HTTPServlet::AbstractServlet
  def do_GET(request, response)
    case request.path
    when "/"
      response.status = 200
      response['Content-Type'] = 'text/plain'
      response.body = 'Hello, World'
    when "/api"
      response.status = 201
      response['Content-Type'] = 'application/json'
      response.body = '{"foo":"bar"}'
    else
      response.status = 404
      response['Content-Type'] = 'text/plain'
      response.body = 'Not Found'
    end
  end
end

if __FILE__ == $0
  server = WEBrick::HTTPServer.new(:Port => 8000)
  server.mount '/', WebServer
  trap('INT') do
    server.shutdown
  end
  server.start
end
```

This script runs the web server on port 8000, and you can test it using a web browser or `curl` commands.

```sh
$ ruby web-server.rb
[2019-05-25 14:11:52] INFO  WEBrick 1.3.1 
[2019-05-25 14:11:52] INFO  ruby 2.3.7 (2018-03-28) [universal.x86_64-darwin17]
[2019-05-25 14:11:52] INFO  WEBrick::HTTPServer#start: pid=19767 port=8000

$ curl localhost:8000/
Hello, World
```

The `if __FILE__ == $0` condition ensures that the script runs only if it is called directly from the command line.
x??

---


#### Testing Terraform Code Manually
Background context: Manual testing of Terraform code by deploying and destroying resources on a real environment to ensure they behave as expected.

:p How do you manually test a module in Terraform, like the ALB example provided?

??x
You can manually test a Terraform module by creating an example configuration file that uses the module. For instance, if you have an `alb` module with resources defined in `modules/networking/alb/main.tf`, you can create an example configuration at `examples/alb/main.tf`:

```hcl
provider "aws" {
  region = "us-east-2"
}

module "alb" {
  source      = "../../modules/networking/alb"
  alb_name    = "terraform-up-and-running"
  subnet_ids  = data.aws_subnets.default.ids
}
```

Then, you can apply this example configuration:

```sh
$ terraform apply

Apply complete. Resources: 5 added, 0 changed, 0 destroyed.

Outputs:

alb_dns_name = "hello-world-stage-477699288.us-east-2.elb.amazonaws.com"
```

After applying the changes, you can test the ALB using tools like `curl` to ensure that it returns the expected responses:
```sh
$ curl -s -o /dev/null -w "%{http_code}" "hello-world-stage-477699288.us-east-2.elb.amazonaws.com"
404
```

This process ensures that your ALB is working correctly before deploying it to a production environment.
x??

---

---


#### AWS Account Management and Testing

Background context: This section discusses managing multiple AWS accounts using AWS Organizations, validating infrastructure with different methods based on its type, setting up isolated sandbox environments for testing, and ensuring proper cleanup to avoid unnecessary costs.

:p What are the advantages of using AWS Organizations?
??x
AWS Organizations allows you to create multiple "child" accounts that can roll up their billing to a single root account. This helps in managing multiple projects or teams efficiently while controlling costs through consolidated billing. Additionally, it simplifies administrative tasks and provides a centralized governance framework.
x??

---


#### Validation Methods for Infrastructure

Background context: The chapter explains the importance of validating infrastructure after deployment using appropriate methods based on the type of resources created.

:p What validation method would you use if your infrastructure code deploys a MySQL database?
??x
If your infrastructure code deploys a MySQL database, you should use a MySQL client to validate its functionality. For example, you can run SQL queries or use a tool like `mysql` command-line utility to ensure the database is up and running and accessible.
x??

---


#### Isolated Sandbox Environments

Background context: This topic emphasizes setting up isolated environments for developers to test infrastructure without affecting production or other development environments.

:p Why is it important for each developer to have their own AWS account as a sandbox environment?
??x
Having each developer use their own AWS account ensures that there are no conflicts, such as multiple developers trying to create resources with the same name. It also helps in isolating testing activities and preventing any accidental changes or failures from impacting other teams or production environments.
x??

---


#### Automated Testing for Infrastructure

Background context: The chapter discusses the challenges and best practices for writing automated tests for infrastructure code.

:p What is the key takeaway regarding test cleanup?
??x
The key takeaway is to create a culture where developers run `terraform destroy` when they are done testing, and use tools like `cloud-nuke` or `aws-nuke` to automate the cleanup of unused or old resources.
x??

---

---


#### Automated Testing Overview
Background context explaining the concept of automated testing. Automated testing is a process where test code validates that your real code behaves as intended, ensuring robustness and reliability. It helps maintain a working state of the code by running tests after every commit.

In Chapter 10, you'll learn to set up Continuous Integration (CI) servers to run these tests automatically post-commit, enabling immediate fixes or reverts for failing tests.
:p What are automated testing's primary goals?
??x
Automated testing aims to ensure that your code behaves as expected by writing test cases. This process helps maintain a working state of the code through continuous integration and quick feedback on changes.

This is crucial because it allows developers to catch issues early, ensuring high-quality software.
x??

---


#### Unit Tests
Background context explaining unit tests. In general-purpose programming languages, unit tests verify the functionality of small units of code—typically individual functions or classes. They replace external dependencies with mocks to test various scenarios.

C/Java code example:
```go
func TestAddition(t *testing.T) {
    mockDB := new(MockDatabase)
    mockDB.On("Add", 1, 2).Return(3)

    result := Add(mockDB, 1, 2)
    if result != 3 {
        t.Errorf("Expected 3 but got %d", result)
    }
}
```
:p What is the purpose of unit tests?
??x
The purpose of unit tests is to validate that individual units (functions or classes) work correctly in isolation. They help build confidence that basic building blocks of code are functioning as expected.

Unit tests typically use mocks to replace external dependencies and test different permutations.
x??

---


#### Integration Tests
Background context explaining integration tests. These tests ensure that multiple units work together correctly. They often mix real dependencies with mocks, depending on the specific part of the system being tested.

C/Java code example:
```go
func TestDatabaseCommunication(t *testing.T) {
    mockAuth := new(MockAuthentication)
    realDB := NewRealDatabase()
    
    mockAuth.On("AuthenticateUser", "user123").Return(true)

    result, err := CommunicateWithDatabase(realDB, "query123", mockAuth)
    if err != nil || result != "expectedResult" {
        t.Errorf("Expected success but got %v, %v", err, result)
    }
}
```
:p What is the goal of integration tests?
??x
The goal of integration tests is to ensure that different units of code (functions or classes) work together correctly. They help identify issues arising from interactions between components.

Integration tests use a mix of real and mock dependencies based on what parts of the system are being tested.
x??

---


#### End-to-End Tests
Background context explaining end-to-end tests. These tests validate that your entire system works as expected, running it in conditions similar to production with minimal resources to save costs.

C/Java code example:
```go
func TestSystemIntegration(t *testing.T) {
    app := NewWebApp()
    browser := NewSeleniumBrowser()

    // Navigate and interact using the browser
    browser.NavigateToURL("http://localhost:8080/login")
    browser.TypeUsername("user123")
    browser.TypePassword("pass456")

    if !browser.IsLoggedIn() {
        t.Errorf("Expected successful login but failed")
    }
}
```
:p What is the purpose of end-to-end tests?
??x
The purpose of end-to-end tests is to validate that your entire system works as expected in conditions similar to a real-world environment. These tests help catch issues related to how different components interact when deployed together.

End-to-end tests typically use real systems and minimal resources, mirroring the production environment.
x??

---

---


---
#### Refactoring Code for Unit Testing
Refactoring the original code to make unit testing easier is a common practice. This involves breaking down complex methods into simpler, more testable pieces.

The context here is understanding how unit tests are difficult to write when there are many dependencies and mutable state involved. In this example, we see how the `WebServer` class was refactored by moving the path handling logic into a separate `Handlers` class.

:p How does moving the path handling logic from `WebServer` into a `Handlers` class improve testability?
??x
By separating the concerns and making the code simpler, it becomes easier to unit test. The `Handlers` class now only handles the logic for determining the response based on the request path, returning simple values like status codes, content types, and bodies.

```ruby
class Handlers
  def handle(path)
    case path
    when "/"
      [200, 'text/plain', 'Hello, World']
    when "/api"
      [201, 'application/json', '{"foo":"bar"}']
    else
      [404, 'text/plain', 'Not Found']
    end
  end
end
```

The `WebServer` class then uses the `Handlers` class to determine the response:

```ruby
class WebServer < WEBrick::HTTPServlet::AbstractServlet
  def do_GET(request, response)
    handlers = Handlers.new
    status_code, content_type, body = handlers.handle(request.path)
    response.status = status_code
    response['Content-Type'] = content_type
    response.body = body
  end
end
```

This makes the `WebServer` class much cleaner and easier to test.
x??

---


#### Unit Testing Web Server Logic
After refactoring, unit testing can be performed more easily on the `Handlers` class. The `handle` method of the `Handlers` class returns simple values which are easy to mock or stub.

:p How would you write a unit test for the `handle` method in the `Handlers` class?
??x
To write a unit test for the `handle` method, we can use a testing framework like RSpec. Here's an example of how this might look:

```ruby
require 'rspec'
require_relative 'handlers'

describe Handlers do
  describe '#handle' do
    context 'when the path is "/"' do
      it 'returns a success response with text/plain content type and Hello, World body' do
        handlers = Handlers.new
        result = handlers.handle('/')
        expect(result).to eq([200, 'text/plain', 'Hello, World'])
      end
    end

    context 'when the path is "/api"' do
      it 'returns a created response with application/json content type and {"foo":"bar"} body' do
        handlers = Handlers.new
        result = handlers.handle('/api')
        expect(result).to eq([201, 'application/json', '{"foo":"bar"}'])
      end
    end

    context 'when the path is any other value' do
      it 'returns a not found response with text/plain content type and Not Found body' do
        handlers = Handlers.new
        result = handlers.handle('/somepath')
        expect(result).to eq([404, 'text/plain', 'Not Found'])
      end
    end
  end
end
```

These tests ensure that the `handle` method behaves as expected for different paths.

x??

---


#### Simplicity in Code Design for Testing
The refactored code with a `Handlers` class demonstrates how simplifying inputs and outputs can make testing easier. The key idea is to avoid complex methods with multiple responsibilities and instead create smaller, focused functions that return simple values.

:p Why is it important to design functions to take simple values as input and output simple values?
??x
Designing functions to take simple values as input and output simple values enhances testability. When a function has simple inputs (like strings or numbers) and returns simple outputs (also like basic data structures), it becomes straightforward to mock, stub, and test the function without dealing with complex object interactions.

In our example:

```ruby
class Handlers
  def handle(path)
    case path
    when "/"
      [200, 'text/plain', 'Hello, World']
    when "/api"
      [201, 'application/json', '{"foo":"bar"}']
    else
      [404, 'text/plain', 'Not Found']
    end
  end
end
```

The `handle` method receives a simple string (`path`) and returns an array of three simple values. This simplicity makes it easy to write unit tests or integration tests without needing to instantiate complex objects like HTTP requests or responses.

x??

---

---


#### Unit Testing for Web Server Code
Background context explaining the unit testing approach and its benefits. The provided Ruby test cases demonstrate how to write simple unit tests for a web server's endpoints, ensuring they behave as expected.
:p What are the three test cases mentioned in the provided Ruby code?
??x
The three test cases check:
- The `hello` endpoint returns a 200 status code, text/plain content type, and "Hello, World" body.
- The `api` endpoint returns a 201 status code, application/json content type, and {"foo":"bar"} body.
- The `404` endpoint returns a 404 status code, text/plain content type, and "Not Found" body.
```ruby
class TestWebServer < Test::Unit::TestCase
  def test_unit_hello
    # Test logic for hello endpoint
  end

  def test_unit_api
    # Test logic for api endpoint
  end

  def test_unit_404
    # Test logic for invalid path
  end
end
```
x??

---


#### Limitations of Unit Testing Terraform Code
Background context discussing the challenges and limitations when trying to unit test Terraform code, focusing on the complexity introduced by external dependencies.
:p Why is pure unit testing not feasible for Terraform code?
??x
Pure unit testing for Terraform code is infeasible because most of its functionality involves making API calls to AWS. It's impractical to mock all these endpoints due to their sheer number and complexity, which makes it difficult to achieve meaningful confidence through simple unit tests.
??x

---


#### Key Takeaway: Unit Testing for Terraform
Background context explaining why pure unit testing is impractical and suggesting alternative approaches like integration testing to build confidence in Terraform code.
:p What key takeaway does the text provide regarding unit testing of Terraform code?
??x
The key takeaway is that you cannot do pure unit testing for Terraform code due to its reliance on external dependencies. Instead, consider using integration tests or other methods to test the interactions between modules and infrastructure providers.
??x

---

---


#### Writing Unit Tests for Terraform
Background context: Writing unit tests for Terraform involves creating standalone modules and deploying them to a real environment using `terraform apply`. The goal is to validate that the infrastructure created by the code works as expected, similar to manual testing but automated. This process helps ensure your Terraform configurations behave correctly before applying them in production.

:p What is the basic strategy for writing unit tests for Terraform?
??x
The basic strategy involves creating a small, standalone module and an easy-to-deploy example for that module. You then run `terraform apply` to deploy it into a real environment, validate its functionality, and finally clean up with `terraform destroy`.

To illustrate this in code, consider the following Go code snippet:

```go
package test

import (
    "testing"
    "github.com/gruntwork-io/terratest/modules/terraform"
)

func TestAlbExample(t *testing.T) {
    opts := &terraform.Options{
        TerraformDir: "../examples/alb",
    }
    
    terraform.InitAndApply(t, opts)
}
```

This code sets up the `terraform` options to point at the example directory and then uses the `InitAndApply` helper method from Terratest to deploy the module.
x??

---


#### Deploying and Validating Infrastructure with Terraform in Tests
Background context: When writing unit tests for Terraform modules using Terratest, you need to deploy the module's example infrastructure into a real environment. This involves running `terraform apply`, validating that it works as expected, and then cleaning up with `terraform destroy`.

:p How do you run `terraform init` and `terraform apply` together in one command?
??x
You can use the `InitAndApply` helper method from Terratest to simplify the process of running both commands. Here is an example:

```go
package test

import (
    "testing"
    "github.com/gruntwork-io/terratest/modules/terraform"
)

func TestAlbExample(t *testing.T) {
    opts := &terraform.Options{
        TerraformDir: "../examples/alb",
    }
    
    // Deploy the example with init and apply in one command
    terraform.InitAndApply(t, opts)
}
```

This single line of code performs both `terraform init` and `terraform apply`, simplifying your test script.
x??

---


#### Validating Infrastructure Functionality Post-Deployment
Background context: After deploying infrastructure using Terraform via tests, it is essential to validate that the deployed resources work as intended. This validation can involve sending HTTP requests for services like ALBs or checking other outputs from Terraform.

:p How do you validate the functionality of a resource after `terraform apply`?
??x
To validate the functionality of a resource post-deployment, you need to write test cases that check if the resource works as expected. For example, for an ALB (Application Load Balancer), you might send an HTTP request and verify the response.

Here is how you can perform such validation in Go:

```go
package test

import (
    "testing"
    "net/http"
)

func TestAlbExample(t *testing.T) {
    opts := &terraform.Options{
        TerraformDir: "../examples/alb",
    }
    
    terraform.InitAndApply(t, opts)
    
    // Assuming the ALB is listening on port 80 and returns a specific response
    resp, err := http.Get("http://your-alb-endpoint")
    if err != nil {
        t.Fatal(err)
    }
    defer resp.Body.Close()
    
    if resp.StatusCode != http.StatusOK {
        t.Errorf("Expected HTTP status code to be %d, got %d", http.StatusOK, resp.StatusCode)
    }
}
```

This example sends an HTTP GET request to the ALB endpoint and checks that it returns a 200 OK response.
x??

---


#### Ensuring Infrastructure Cleanup Post-Test
Background context: After running tests that deploy infrastructure with Terraform, it is crucial to clean up the resources by running `terraform.destroy`. However, this must be done reliably even if the test fails.

:p How do you ensure that `terraform.destroy` is called regardless of whether the test passes or fails?
??x
You can use the defer statement in Go to guarantee that `terraform.Destroy` is always executed at the end of the function.
```go
defer terraform.Destroy(t, opts)
```
This ensures that even if an earlier part of the test code causes a failure and the test exits early, `terraform.Destroy` will still be called.
x??

---

---


#### Running the Test with Timeout
When running tests that deploy real infrastructure using Terraform, setting an extended timeout is essential to avoid premature termination of the test run.

:p How should the `go test` command be modified for this scenario?
??x
To ensure the test completes without being prematurely terminated, you need to use the `-timeout` flag with a longer duration. For example:

```bash
$ go test -v -timeout 30m TestAlbExample
```

This command runs the `TestAlbExample` test with a timeout of 30 minutes.
x??

---


#### Clean Up After Testing
After testing, it is crucial to clean up any resources created by Terraform. This ensures that no unwanted infrastructure remains running after tests complete.

:p What cleanup steps are necessary post-test?
??x
Post-testing, you need to run the `terraform destroy` command with appropriate flags to ensure all resources are destroyed:

```bash
$ go test -v -timeout 30m TestAlbExample
# During test:
TestAlbExample 2019-05-26T13:32:06+01:00 command.go:53: Running command terraform with args [destroy -auto-approve -input=false -lock=false] (...) 
TestAlbExample 2019-05-26T13:39:16+01:00 command.go:121: Destroy complete. Resources: 5 destroyed.
```

This ensures that all resources are safely and automatically cleaned up, preventing any potential issues with orphaned infrastructure.
x??

---


#### Manual vs Automated Testing
For testing, especially automated testing of Terraform code deployed on AWS, it is essential to use a sandbox account for manual tests but a separate, dedicated environment for automated tests. This separation ensures that automated tests do not interfere with or affect production resources.

:p Why should different environments be used for manual and automated testing?
??x
Different environments are necessary because:

- **Manual Testing in Sandbox:** A sandbox environment allows testers to manually verify the infrastructure without impacting real production systems.
  
- **Automated Testing in Dedicated Environment:** Automated tests require a dedicated, isolated environment to avoid accidental modifications or deletions of critical resources. This setup prevents any unintended changes from affecting live production services.

Using separate environments helps maintain security and reliability, ensuring that automated tests do not inadvertently cause issues in production.
x??

---


#### Use of `go mod tidy`
`go mod tidy` is a command used to ensure all dependencies are correctly installed and updated according to the requirements specified in your `go.mod` file. This command resolves any version mismatches or missing dependencies.

:p What does running `go mod tidy` accomplish?
??x
Running `go mod tidy` accomplishes several things:

- It ensures that all dependencies listed in your `go.mod` file are installed and up-to-date.
- It identifies and removes unused dependencies, keeping the project clean and efficient.
- It generates a `go.sum` file that hashes each dependency version, ensuring reproducibility.

The command checks for any discrepancies between the `go.mod` and `go.sum` files, making sure all specified versions are correctly installed and up-to-date.

```bash
$ go mod tidy
```
x??

---

---


#### Automated Tests
Background context: The text mentions that automated tests can be run in less than five minutes to verify if the ALB module works as expected, providing a fast feedback loop for infrastructure changes in AWS.

:p What is the main benefit of running automated tests for the ALB module?
??x
The main benefit is to quickly determine whether the ALB module functions correctly without manually checking each resource. This process provides a rapid feedback mechanism, giving confidence that the code works as expected and enabling developers to make changes with minimal risk.

x??

---


#### Dependency Injection in Unit Testing
Background context: The example provided demonstrates how adding an HTTP call to an external dependency (`example.org`) can complicate unit testing due to potential issues like outages, behavioral changes, or delays. Dependency injection is proposed as a solution to minimize reliance on these external dependencies during unit tests.

:p What is the primary issue with directly using real dependencies in unit tests?
??x
The primary issue is that unit tests become unreliable and less predictable because they depend on the behavior of an external system which can change, fail, or be slow. This makes it difficult to isolate and test code in a controlled environment, leading to potential false positives or negatives.

x??

---


#### Implementing Dependency Injection
Background context: The example shows how dependency injection can be applied by allowing the external HTTP call to be injected into the `Handlers` class through a constructor parameter instead of being hardcoded. This allows unit tests to mock the response and isolate the code under test from real-world dependencies.

:p How would you modify the `Handlers` class to implement dependency injection for the new endpoint?
??x
To implement dependency injection, you can pass in an HTTP client as a method argument or constructor parameter. Here’s how it could be done:

```ruby
class Handlers
  def initialize(http_client)
    @http_client = http_client
  end

  def handle(path)
    case path
    when "/"
      [200, 'text/plain', 'Hello, World']
    when "/api"
      [201, 'application/json', '{\"foo\":\"bar\"}']
    when "/web-service"
      # New endpoint that calls a web service
      uri = URI("http://www.example.org")
      response = @http_client.get(uri)
      [response.code.to_i, response['Content-Type'], response.body]
    else
      [404, 'text/plain', 'Not Found']
    end
  end
end
```

x??

---

---


#### Dependency Injection for Web Services
Background context explaining dependency injection and how it applies to web services. This technique helps minimize external dependencies, making testing more manageable and reliable.

```ruby
class WebService
  def initialize(url)
    @uri = URI(url)
  end

  def proxy
    response = Net::HTTP.get_response(@uri)
    [response.code.to_i, response['Content-Type'], response.body]
  end
end
```

:p How does the `WebService` class help in managing dependencies?
??x
The `WebService` class encapsulates the logic for making HTTP requests to a specified URL. By using this class, you can isolate the external dependency on the web service from other parts of your application, such as the `Handlers` class.

This separation allows you to easily replace or mock the `WebService` instance during testing without affecting the overall functionality.
```ruby
class Handlers
  def initialize(web_service)
    @web_service = web_service
  end

  def handle(path)
    case path
    when "/"
      [200, 'text/plain', 'Hello, World']
    when "/api"
      [201, 'application/json', '{"foo":"bar"}']
    when "/web-service"
      # New endpoint that calls a web service
      @web_service.proxy
    else
      [404, 'text/plain', 'Not Found']
    end
  end
end
```
x??

---


#### Mocking for Testing
Background context on how to use mocks in testing to simulate behavior of external systems. This helps in writing faster and more reliable tests by controlling the environment.

:p How can you create a mock `WebService` instance for testing purposes?
??x
You can create a mock version of the `WebService` class that returns predefined responses. This allows you to test the behavior of other classes (like `Handlers`) under controlled conditions without needing to rely on an actual web service.

Here’s how you can define and use a mock:
```ruby
class MockWebService
  def initialize(response)
    @response = response
  end

  def proxy
    @response
  end
end
```

In your tests, you can then create and inject this mock into the `Handlers` class.
```ruby
def test_unit_web_service
  expected_status = 200
  expected_content_type = 'text/html'
  expected_body = 'mock example.org'
  mock_response = [expected_status, expected_content_type, expected_body]
  mock_web_service = MockWebService.new(mock_response)
  handlers = Handlers.new(mock_web_service)

  status_code, content_type, body = handlers.handle("/web-service")

  assert_equal(expected_status, status_code)
  assert_equal(expected_content_type, content_type)
  assert_equal(expected_body, body)
end
```
x??

---


#### Unit Test for Web Server
Background context on how unit tests can be written to ensure the correct behavior of components. This includes checking both external dependencies and internal logic.

:p How do you write a unit test for the `WebService` interaction in the `Handlers` class?
??x
You can write a unit test to verify that when a specific path is requested, the `WebServer` correctly interacts with the `WebService` and `Handlers`. This involves mocking the external service call.

Here’s an example of how you might write such a test:
```ruby
def test_unit_web_service
  expected_status = 200
  expected_content_type = 'text/html'
  expected_body = 'mock example.org'
  mock_response = [expected_status, expected_content_type, expected_body]
  mock_web_service = MockWebService.new(mock_response)
  handlers = Handlers.new(mock_web_service)

  status_code, content_type, body = handlers.handle("/web-service")

  assert_equal(expected_status, status_code)
  assert_equal(expected_content_type, content_type)
  assert_equal(expected_body, body)
end
```

This test ensures that the `WebServer` correctly handles a request to `/web-service` by invoking the mocked `WebService`.
x??

---

---


#### Moving Dependencies to `dependencies.tf` File
Background context: In Terraform, it's essential to make dependencies clear and manageable. By moving all data sources and resources representing external dependencies into a separate `dependencies.tf` file, it becomes easier for users of your module to understand what their code depends on.

:p How does the `dependencies.tf` file help in managing dependencies?
??x
The `dependencies.tf` file helps by centralizing all the data sources and resources that represent external dependencies. This makes it clearer at a glance what an external user needs to provide or deploy before using your module. For instance, moving the required S3 bucket for remote state management into a dedicated file simplifies the module's code.

```hcl
// modules/services/hello-world-app/dependencies.tf

data "terraform_remote_state" "db" {
   backend = "s3"
   config  = {
     bucket = var.db_remote_state_bucket
     key    = var.db_remote_state_key
     region = "us-east-2"
   }
}

data "aws_vpc" "default" {
   default = true
}

data "aws_subnets" "default" {
   filter {
      name    = "vpc-id"
      values  = [data.aws_vpc.default.id]
   }
}
```
x??

---


#### Using Input Variables to Inject Dependencies
Background context: To test modules effectively, it's crucial to be able to inject dependencies from outside the module. This is achieved by defining input variables that can be passed in during testing or deployment.

:p How do you define and use input variables to manage external dependencies?
??x
You define input variables within your `variables.tf` file. These variables allow you to pass in values for resources or data sources that represent external dependencies, making the module more flexible and testable. For instance, in the case of the `hello-world-app` module, you can define input variables like `vpc_id`, `subnet_ids`, and `mysql_config`.

```hcl
// modules/services/hello-world-app/variables.tf

variable "vpc_id" {
   description = "The ID of the VPC to deploy into"
   type        = string
   default      = null
}

variable "subnet_ids" {
   description = "The IDs of the subnets to deploy into"
   type        = list(string)
   default     = null
}

variable "mysql_config" {
   description = "The config for the MySQL DB"
   type        = object({
      address  = string
      port     = number
   })
   default     = null
}
```

You can then use these variables in your Terraform configuration to inject dependencies.

```hcl
module "hello_world_app" {
   source    = "../../../modules/services/hello-world-app"
   server_text       = "Hello, World"
   environment       = "example"
   db_remote_state_bucket  = "(YOUR_BUCKET_NAME)"
   db_remote_state_key     = "examples/terraform.tfstate"
   instance_type         = "t2.micro"
   min_size              = 2
   max_size              = 2
   enable_autoscaling    = false
   ami                   = data.aws_ami.ubuntu.id
}
```
x??

---


#### Understanding the Impact of Dependency Injection on Testing
Background context: By moving dependencies into `dependencies.tf` and using input variables, you can reduce the number of external dependencies required for testing a module.

:p How does dependency injection help in creating unit tests for Terraform modules?
??x
Dependency injection allows you to decouple your module's logic from its environment. This makes it easier to write unit tests by providing mock or stub values for the dependencies instead of relying on actual deployed resources. For example, in the `hello-world-app` module, you can pass in a mocked VPC ID and subnets during testing without needing to have these resources deployed.

```hcl
// Example test configuration

module "hello_world_app" {
   source    = "../../../modules/services/hello-world-app"
   vpc_id          = "vpc-12345678"
   subnet_ids      = ["subnet-a1b2c3d4", "subnet-e5f6g7h8"]
   mysql_config    = { address = "db.example.com", port = 3306 }
}
```

This approach makes your tests more isolated and repeatable, as you're not relying on the state of an external environment.

```hcl
// Example test code

locals {
   vpc_id = "vpc-12345678"
   subnet_ids = ["subnet-a1b2c3d4", "subnet-e5f6g7h8"]
}

module "hello_world_app" {
   source    = "../../../modules/services/hello-world-app"
   vpc_id          = local.vpc_id
   subnet_ids      = local.subnet_ids
   mysql_config    = { address = "db.example.com", port = 3306 }
}
```
x??

---


#### Example of a `variables.tf` File for the `hello-world-app` Module
Background context: The `variables.tf` file is where you define all the input variables that your module requires. These variables can be used to pass in values during deployment or testing.

:p What are the key steps to create an `variables.tf` file for a Terraform module?
??x
To create an `variables.tf` file for a Terraform module, you need to define input variables that represent external dependencies. For the `hello-world-app` module, these include the VPC ID, subnet IDs, and MySQL configuration.

```hcl
// modules/services/hello-world-app/variables.tf

variable "vpc_id" {
   description = "The ID of the VPC to deploy into"
   type        = string
   default      = null
}

variable "subnet_ids" {
   description = "The IDs of the subnets to deploy into"
   type        = list(string)
   default     = null
}

variable "mysql_config" {
   description = "The config for the MySQL DB"
   type        = object({
      address  = string
      port     = number
   })
   default     = null
}
```

These variables allow you to pass in values during deployment or testing, making your module more flexible and easier to test.

```hcl
// Example usage

module "hello_world_app" {
   source    = "../../../modules/services/hello-world-app"
   vpc_id          = "vpc-12345678"
   subnet_ids      = ["subnet-a1b2c3d4", "subnet-e5f6g7h8"]
   mysql_config    = { address = "db.example.com", port = 3306 }
}
```
x??

---

---


#### Optional Variables and Default Values
Background context: In Terraform, variables can be optional. When a variable is not explicitly set by the user, it defaults to a specified value (in this case, `null`). This allows for flexibility in configuration.

:p What are the implications of setting default values to null for optional variables like `db_remote_state_bucket` and `db_remote_state_key`?
??x
Setting default values to `null` means that these variables can be omitted or customized by the user. If not set, Terraform will use the default value, which in this case is `null`. This flexibility allows users to either provide their own values for state management or rely on the default behavior.

```terraform
variable "db_remote_state_bucket" {
   description  = "The name of the S3 bucket for the DB's Terraform state"
   type        = string
   default      = null
}

variable "db_remote_state_key" {
   description  = "The path in the S3 bucket for the DB's Terraform state"
   type        = string
   default      = null
}
```
x??

---


#### Type-Safe Function Composition
Background context: By structuring variables and outputs to match expected types, you can achieve type-safe function composition. This means that when passing data from one module to another, Terraform can validate the types automatically.

:p How does type-safe function composition work in this scenario?
??x
Type-safe function composition works by ensuring that the output types of one module (in this case, the `mysql` module) match the input types expected by another module or configuration part. This allows for seamless and validated data passing without errors due to mismatched types.

For example, the `mysql_config` variable is structured as an object type with keys `address` and `port`. The `hello-world-app` module expects this exact structure, ensuring that no manual validation of types is needed.

```terraform
output "address" {
   value       = aws_db_instance.example.address
   description  = "Connect to the database at this endpoint"
}

output "port" {
   value       = aws_db_instance.example.port
   description  = "The port the database is listening on"
}
```
x??

---


#### Conditional Data Source Usage Based on Input Variables
Background context: Depending on whether certain input variables are set, you can conditionally apply data sources in your Terraform configuration. This is useful for modular design where different parts of the stack might need or not need specific data sources.

:p How does one conditionally use a `terraform_remote_state` data source based on the absence of an input variable?
??x
You can conditionally apply the `terraform_remote_state` data source by checking if the corresponding input variable is set to `null`. If it is, you don't need to fetch this state remotely.

```terraform
data "terraform_remote_state" "db" {
   count = var.mysql_config == null ? 1 : 0
   backend = "s3"
   config = {
     bucket = var.db_remote_state_bucket
     key    = var.db_remote_state_key
     region = "us-east-2"
   }
}
```
x??

---


#### Unit Test for `hello-world-app` Example
Explanation on creating a unit test with custom validation logic.

:p How does the unit test for `hello-world-app` example check the response?
??x
The unit test checks the response using the following code:

```go
func TestHelloWorldAppExample(t *testing.T) {
  opts := &terraform.Options{
    TerraformDir: "../examples/hello-world-app/standalone",
    
    Vars: map[string]interface{}{
      "mysql_config": map[string]interface{}{
        "address": "mock-value-for-test",
        "port":    3306,
      },
    },
  }

  defer terraform.Destroy(t, opts)
  
  terraform.InitAndApply(t, opts)

  albDnsName := terraform.OutputRequired(t, opts, "alb_dns_name")
  
  url := fmt.Sprintf("http://%s", albDnsName)
  maxRetries := 10
  timeBetweenRetries := 10 * time.Second

  http_helper.HttpGetWithRetryWithCustomValidation(
    t,
    url,
    nil,
    maxRetries,
    timeBetweenRetries,
    func(status int, body string) bool {
      return status == 200 && strings.Contains(body, "Hello, World")
    },
  )
}
```

This test sets the `mysql_config` variable in the Terraform configuration and validates that the response is a 200 OK with the expected text.
x??

---

---


#### Running Tests in Parallel
Background context explaining how Go tests can be run sequentially or in parallel, and why running tests in parallel is important for reducing test execution time.

:p How do you instruct Go to run your tests in parallel?
??x
To instruct Go to run your tests in parallel, you need to add `t.Parallel()` at the top of each test function. This tells Go that this test can be executed concurrently with other tests.
```go
func TestHelloWorldAppExample(t *testing.T) {
    t.Parallel()  // Instructs Go to run this test in parallel

    opts := &terraform.Options{
        TerraformDir: "../examples/hello-world-app/standalone",
        Vars: map[string]interface{}{
            "mysql_config": map[string]interface{}{
                "address":   "mock-value-for-test",
                "port":      3306,
            },
        },
    }
}
```
x??

---


#### Configuring Resource Names in Tests
Background context explaining the need to namespace resources in tests to avoid name clashes when running multiple tests or in a CI environment.

:p How do you make the name of an ALB configurable and ensure it is unique for each test run?
??x
To make the name of the ALB configurable and ensure it is unique, add an input variable `alb_name` in `examples/alb/variables.tf` with a reasonable default value:

```hcl
variable "alb_name" {
    description = "The name of the ALB and all its resources"
    type        = string
    default     = "terraform-up-and-running"
}
```

Then, pass this value through to the ALB module in `examples/alb/main.tf`:

```hcl
module "alb" {
    source  = "../../modules/networking/alb"
    alb_name    = var.alb_name
    subnet_ids  = data.aws_subnets.default.ids
}
```

In your test, set this variable to a unique value using the `random.UniqueId()` helper:

```go
func TestAlbExample(t *testing.T) {
    t.Parallel()

    opts := &terraform.Options{
        TerraformDir: "../examples/alb",
        Vars: map[string]interface{}{
            "alb_name": fmt.Sprintf("test-percents", random.UniqueId()),
        },
    }
}
```
x??

---


#### Running Tests with Mock Data
Background context explaining how to pass in mock data for testing, such as using an in-memory database during tests.

:p How do you set up a test to use mock data?
??x
You can set the `mysql_config` variable to any value you want. For example, you could set it to simulate an in-memory database:

```go
opts := &terraform.Options{
    TerraformDir: "../examples/hello-world-app/standalone",
    Vars: map[string]interface{}{
        "mysql_config": map[string]interface{}{
            "address":   "mock-value-for-test",
            "port":      3306,
        },
    },
}
```

This sets up the `mysql_config` variable to use a mock address and port, allowing you to simulate database interactions without using an actual external database.

For example:
```go
func TestHelloWorldAppExample(t *testing.T) {
    t.Parallel()

    opts := &terraform.Options{
        TerraformDir: "../examples/hello-world-app/standalone",
        Vars: map[string]interface{}{
            "mysql_config": map[string]interface{}{
                "address":   "mock-value-for-test",
                "port":      3306,
            },
        },
    }
}
```
x??

---


#### Running a Single Test with Go
Background context explaining how to run only a specific test using the `go test` command.

:p How do you run a single test, for example, the `TestHelloWorldAppExample` function?
??x
To run a single test, such as `TestHelloWorldAppExample`, you use the `-run` argument with the name of the test:

```sh
$ go test -v -timeout 30m -run TestHelloWorldAppExample
```

This command will only execute `TestHelloWorldAppExample`. By default, Go runs all tests in the current folder if no specific test is provided.

For example:
```sh
$ go test -v -timeout 30m -run TestHelloWorldAppExample
PASS
ok    terraform-up-and-running     204.113s
```
x??

---

---


#### Running Tests in Parallel

Background context: The text explains how to run multiple tests in parallel, ensuring that the overall test suite execution time is optimized. By default, Go runs as many tests in parallel as there are CPU cores available.

:p How can you ensure that your automated tests run in parallel?

??x
You can enable parallel test execution by setting the `GOMAXPROCS` environment variable or using the `-parallel` argument with the `go test` command. For example, to run up to two tests in parallel:

```sh
$ go test -v -timeout 30m -parallel 2
```

This helps speed up the testing process by utilizing multiple CPU cores.

x??

---

