# High-Quality Flashcards: 4A008---Terraform_-Up-and-Running_-Writing-Infrastructure-as-Code-OReilly-Media-2022_processed (Part 28)


**Starting Chapter:** Give Your Team the Time to Learn

---


#### Value Delivered in Each Step
In large projects, there's a risk of getting zero value if the project gets canceled or delayed. Splitting the work into steps that deliver value incrementally helps mitigate this risk.
:p How does incrementalism ensure value delivery at each step?
??x
Incrementalism ensures that each step brings some value to the project, even if it doesn't complete all planned steps. This way, if a project gets canceled or delayed, the team still has tangible results from the completed steps. For instance, automating one problematic deployment can make outages less frequent and reduce downtime.
```bash
# Example: Incremental Deployment Automation
echo "Step 1: Automate first critical service"
terraform apply --auto-approve

echo "Step 2: Monitor and refine automation for additional services"
terraform apply --var-file=service_vars.tfvars
```
x??

---


#### Contextual Learning and Process Definition
Contextual learning involves providing detailed documentation, tutorials, and dedicated time to help the team adopt IaC. Defining a systematic workflow is crucial as your company grows.
:p How does contextual learning support IaC adoption?
??x
Contextual learning includes creating comprehensive documentation, video tutorials, and ensuring developers have dedicated time to learn IaC. This approach helps maintain consistent usage of IaC even when outages occur, preventing the team from reverting to manual methods. Defining a repeatable workflow ensures that deployments are automated and can be scaled as your company grows.
```markdown
# Example: Contextual Learning Plan
- **Documentation**: Create detailed guides on Terraform best practices.
- **Tutorials**: Develop video tutorials covering various use cases of IaC.
- **Ramp-Up Time**: Allocate 20% of each developer's time for learning IaC.
```
x??

---

---


#### Use Version Control
Background context: In software development, version control is essential for managing changes to source code over time. This helps developers track modifications, collaborate on projects, and revert to previous versions if necessary.

:p What are the primary benefits of using version control in a team environment?
??x
The primary benefits include maintaining a history of changes, facilitating collaboration among multiple developers, ensuring consistency across development environments, and enabling easy rollback to previous states. Version control systems like Git help manage these aspects efficiently.
x??

---


#### Running Code Locally
Background context: Running code locally is the first step in the workflow where developers test their changes before committing them. This allows for quick feedback on whether the code works as expected without involving external dependencies or other team members.

:p What are some common practices for running application code locally?
??x
Common practices include setting up a local development environment that mirrors the production environment, using a virtual machine (VM) or container technology like Docker to ensure consistency, and employing automated scripts to facilitate setup and testing.
x??

---


#### Submitting Changes for Review
Background context: Code reviews are an essential part of the development process, ensuring quality and consistency across the codebase. Peer review helps catch issues early, improves code quality, and fosters knowledge sharing among team members.

:p What is the purpose of submitting changes for review in version control systems?
??x
The purpose is to have other team members or designated reviewers check the changes before they are merged into the main branch. This process ensures that the code meets the project's standards, catches potential issues early, and promotes a collaborative development environment.
x??

---


#### Running Automated Tests
Background context: Automated testing is critical for ensuring the reliability of application code. It helps detect bugs early in the development cycle, improves code quality, and provides confidence when making changes.

:p What role do automated tests play in the development workflow?
??x
Automated tests help verify that new or modified features work as expected without manual intervention. They ensure that existing functionality remains stable during updates and provide quick feedback on breaking changes. Common types include unit tests, integration tests, and end-to-end tests.
x??

---


#### Merging and Release
Background context: After thorough testing and review, the code is merged into the main branch or a staging environment for final preparation before production deployment.

:p What steps are involved in merging and releasing code?
??x
The steps typically involve merging changes from feature branches to the main branch (or another designated release branch), resolving any conflicts that arise during merge. After successful merging, further steps include running comprehensive tests, preparing deployment artifacts, and staging the release for final approval before pushing it to production.
x??

---


#### Deploying
Background context: Deployment involves moving the application from development or staging environments into a live environment where users can access it.

:p What factors should be considered when deploying an application?
??x
Factors include ensuring all changes are thoroughly tested, verifying that infrastructure supports the new version of the application, managing dependencies and external services, planning for rollback scenarios in case of issues, and monitoring performance post-deployment.
x??

---

---


#### Making Code Changes
Background context: After verifying the application code works as expected locally, you can start making changes to the code. This process involves making a change, running manual or automated tests to ensure everything still works correctly, and repeating these steps iteratively until the desired functionality is achieved.

:p How do you make changes and verify them in the Ruby web server example?
??x
To make changes and verify them in the Ruby web server example, follow these steps:

1. **Make a Change:** Modify the `web-server.rb` file as needed. For instance, change the output message from "Hello, World" to "Hello, World v2":
    ```ruby
    # Before:
    # puts "Hello, World"
    
    # After:
    puts "Hello, World v2"
    ```

2. **Restart the Server:** After making changes, restart the server by stopping it and starting it again.

3. **Test the Change:** Use `curl` to test the new output of the server:
    ```bash
    $ curl http://localhost:8000
    Hello, World v2
    ```

4. **Run Automated Tests (Optional):** If you have automated tests for your application, run them to ensure that no other functionality was affected by the change.

:p How do you run a simple HTTP server using Ruby?
??x
To run a simple HTTP server using Ruby, follow these steps:

1. Navigate to the directory containing the `web-server.rb` file:
    ```bash
    $ cd code/ruby/10-terraform/team
    ```

2. Start the server by running the script with the Ruby interpreter:
    ```bash
    $ ruby web-server.rb
    ```

The output should indicate that the server is up and running on port 8000.

:p How do you test a locally run HTTP server using `curl`?
??x
To test a locally run HTTP server using `curl`, use the following command:
```bash
$ curl http://localhost:8000
```

This command sends an HTTP GET request to the local server running on port 8000 and displays the response, which should be "Hello, World" by default.

:p How do you run automated tests for a Ruby application?
??x
To run automated tests for a Ruby application, use the `ruby` command followed by the path to the test file. For example:
```bash
$ ruby web-server-test.rb
```

The output will indicate whether all tests passed or if any failed.

:x??

---


#### Committing Code Changes
Background context: After making and testing changes locally, you should commit your code with a clear message explaining what was changed. This helps maintain the history of changes made to the project.

:p How do you commit local code changes?
??x
To commit local code changes, use the `git commit` command followed by an appropriate message that describes the changes. For example:
```bash
$ git commit -m "Updated Hello, World text"
```

This command commits all staged changes to your current branch with a clear commit message.

:p How do you push your feature branch back to GitHub?
??x
To push your feature branch back to GitHub, use the `git push` command followed by the remote repository and the name of the branch. For example:
```bash
$ git push origin example-feature
```

This command pushes all changes in the current branch (`example-feature`) to the remote repository on GitHub.

:p What happens after pushing your feature branch back to GitHub?
??x
After pushing your feature branch back to GitHub, you can create a pull request from the web interface. The log output will contain a URL that you can visit:
```bash
remote: Create a pull request for 'example-feature' on GitHub by visiting:
      https://github.com/<OWNER>/<REPO>/pull/new/example-feature
```

You can open this URL in your browser and fill out the pull request title and description, then click "Create" to submit the changes for review.

:x??

---

---


#### Setting Up Commit Hooks for Automated Tests
Continuous integration (CI) servers like Jenkins, CircleCI, or GitHub Actions can be used to set up commit hooks that run automated tests on every push. This ensures code quality and reduces bugs before merging into the main branch.

:p How do you integrate automated testing with a CI server in a version control system?
??x
To integrate automated testing with a CI server such as CircleCI, you configure the server to automatically execute test scripts whenever a new commit is pushed. For example, on GitHub Actions, you add a `.github/workflows` file to your repository that defines jobs and steps for running tests.

For instance, in a CircleCI configuration:
```yaml
version: 2.1
jobs:
  build:
    docker:
      - image: circleci/node:latest
    steps:
      - run: npm install
      - run: npm test

workflows:
  version: 2
  build-and-test:
    jobs:
      - build
```
x??

---


#### Running Automated Tests in GitHub Pull Requests
Automated tests can be run and their results displayed directly in the pull request. This helps developers review code changes more effectively.

:p How do automated test results appear in a GitHub pull request?
??x
Automated test results are shown in the pull request itself when using CI servers integrated with platforms like GitHub. For example, if you use CircleCI, it can run unit tests, integration tests, end-to-end tests, and static analysis checks against the code changes.

In the GitHub interface, a badge or a section will display the status of these tests:
- Green: Tests passed
- Red: Tests failed

This information helps reviewers quickly assess the state of the pull request.
??x
Example output in the GitHub pull request could look like this:
```
![CircleCI](https://circleci.com/gh/user/repo/tree/main)
<img src="https://example.com/circleci.png" alt="Test Results">
```

The output integrates seamlessly with the pull request, providing instant feedback to the reviewers.
x??

---


#### Immutable Infrastructure Practices for Releasing Code
Using immutable infrastructure practices ensures that once a code artifact is created, it cannot be changed. Each release should have a unique version number or tag.

:p How do you ensure your application code follows immutable infrastructure practices?
??x
To follow immutable infrastructure practices, you package the new version of the application into an unchangeable artifact with a unique identifier. For Docker images, this can be done by tagging the image with a commit ID or a custom version number.

For example:
```bash
# Using commit hash as tag
commit_id=$(git rev-parse HEAD)
docker build -t brikis98/ruby-web-server:$commit_id .

# Alternatively using semantic versioning
git tag -a "v0.0.4" -m "Update Hello, World text"
git push --follow-tags
```

This ensures that the deployed artifact is immutable and can be traced back to its exact codebase.
??x

Example Docker build command:
```bash
commit_id=$(git rev-parse HEAD)
docker build -t brikis98/ruby-web-server:$commit_id .
```
And pushing a tag:
```bash
git tag -a "v0.0.4" -m "Update Hello, World text"
git push --follow-tags
```

These commands help maintain the integrity of the deployed application by ensuring that each version is unique and unchangeable.
x??

---


#### Deployment Tooling

Background context: The choice of deployment tool depends on how you package and run your application, your infrastructure architecture, and the desired deployment strategies. This section discusses different tools such as Terraform for managing infrastructure-as-code and orchestration tools like Kubernetes.

:p What are some examples of deployment tooling mentioned in the text?
??x
Some examples of deployment tooling mentioned include:

- **Terraform**: A tool used to manage infrastructure as code, allowing you to define infrastructure resources using configuration files. It can be used for deploying applications by updating parameters and running `terraform apply`.

- **Orchestration tools**: These include Kubernetes (Docker orchestration), Amazon ECS, HashiCorp Nomad, and Apache Mesos, which are designed to deploy and manage application containers.

- **Scripts**: Custom scripts might be necessary when more complex requirements cannot be met by Terraform or other orchestration tools.
x??

---


#### Deployment Strategies

Background context: Different deployment strategies can be employed based on your application's needs. The text outlines three common strategies: rolling deployment with replacement, rolling deployment without replacement, and blue-green deployment.

:p What is a rolling deployment with replacement?
??x
A rolling deployment with replacement involves gradually replacing old copies of the application with new ones while ensuring that at least one version of the application remains available to users. This method ensures zero downtime by replacing one instance at a time after it passes health checks and starts receiving live traffic.

During this process, both the old and new versions coexist temporarily, allowing for monitoring and rollbacks if necessary.
x??

---


#### Blue-Green Deployment

Background context: Blue-green deployment is another strategy where you deploy two identical sets of application instances (blue and green) in parallel. Traffic can be switched to either set based on health checks.

:p What does blue-green deployment involve?
??x
Blue-green deployment involves deploying an identical copy (green) of the existing application (blue). After both copies are healthy, all traffic is redirected to the new version (green), and the old version (blue) is undeployed. This method ensures that users always see a consistent version of the application.

This strategy is useful in environments with flexible capacity where multiple instances can be managed without downtime.
x??

---


#### Canary Deployment Overview
In software development, a canary deployment is a method used to test new versions of an application in production before rolling it out fully. The process involves deploying a small number of instances (the "canary") and comparing them against existing instances ("control"). This helps identify potential issues early on.
:p What is the purpose of a canary deployment?
??x
The primary purpose of a canary deployment is to test new versions of an application in production without affecting all users. It allows you to compare the behavior of the new version (canary) against the existing version (control). If no issues are found, the full rollout can proceed; otherwise, you can revert changes or troubleshoot.
x??

---


#### Difference Between Canary and Control
During a canary deployment, the "canary" is one or more instances of an application that have been newly deployed. These instances run alongside existing ("control") instances to allow for detailed comparisons. The goal is to ensure both versions perform similarly in all relevant metrics.
:p What are some dimensions used to compare canaries and controls?
??x
Dimensions commonly compared include CPU usage, memory usage, latency, throughput, error rates in logs, HTTP response codes, etc. These metrics help identify any discrepancies between the new ("canary") and existing ("control") versions of the application.
x??

---


#### Rolling Deployment Strategies
After a canary deployment confirms no issues with the new version, you can proceed with a rolling deployment. This strategy gradually deploys the updated code to all instances, allowing time for monitoring and ensuring smooth operation.
:p What are some common rolling deployment strategies?
??x
Common rolling deployment strategies include:
- Gradual increase: Deploying the update to 10% of users initially, then incrementally increasing that percentage over time.
- Canary groups: Similar to canary deployments but applied across multiple servers or environments.
- Blue-green deployment: Using two identical sets of infrastructure; switch traffic from old (blue) to new (green) without downtime.
x??

---


#### CI Server Deployment
Deploying from a CI (Continuous Integration) server ensures that all deployment steps are automated. This practice promotes consistency, reduces human error, and streamlines the process by capturing workflows as scripts or commands.
:p Why is it important to run deployments from a CI server?
??x
Running deployments from a CI server is crucial because it forces the automation of all deployment processes. Automation ensures consistent behavior across multiple environments, reduces potential human errors, and makes the entire workflow more predictable and repeatable.
x??

---

---

