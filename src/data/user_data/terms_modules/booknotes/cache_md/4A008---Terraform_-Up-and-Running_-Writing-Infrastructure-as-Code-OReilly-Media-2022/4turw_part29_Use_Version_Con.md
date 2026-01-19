# High-Quality Flashcards: 4A008---Terraform_-Up-and-Running_-Writing-Infrastructure-as-Code-OReilly-Media-2022_processed (Part 29)


**Starting Chapter:** Use Version Control

---


---
#### Consistent Environment Across Developer Machines
Background context: When developers run deployments from their own computers, it can lead to inconsistencies due to different operating systems, dependency versions, configurations, and deployed changes. Using a CI server ensures that all environments are consistent.

:p What is the problem with running deployments from developer machines?
??x
The main problems include differences in operating systems, dependency versions (such as Terraform), configurations, and what's actually being deployed (e.g., accidentally deploying uncommitted changes). By using a CI server, these issues can be eliminated.
x??

---


#### Better Permissions Management Through CI Server
Background context: Giving developers direct access to the production environment can lead to security risks. Using a single CI server for deployments simplifies permission management and enforces good security practices.

:p How does using a CI server help with permissions management?
??x
Using a CI server helps by centralizing deployment permissions, making it easier to enforce security policies since only the CI server has access to production environments. This reduces the risk of unauthorized changes or accidental deployments.
x??

---


#### Workflow for Deploying Infrastructure Code
Background context: The workflow for deploying infrastructure code mirrors that of application code but with additional complexities due to the nature of infrastructure changes. Version control, testing, and deployment are key steps.

:p What are the main steps in the workflow for deploying infrastructure code?
??x
The main steps include:
1. Using version control.
2. Running the code locally.
3. Making code changes.
4. Submitting changes for review.
5. Running automated tests.
6. Merging and releasing the changes.
7. Deploying the infrastructure code.

These steps ensure that changes are thoroughly tested before being deployed, maintaining consistency across environments.
x??

---

---


#### Live Repo and Modules Repo
Live repo and modules repo are separate version control repositories used for managing Terraform infrastructure code. Typically, one is dedicated to reusable, versioned modules, while another focuses on live infrastructure deployments.

The repository for **modules** contains reusable components that can be shared across projects. These include:
- `cluster/asg-rolling-deploy`
- `data-stores/mysql`
- `networking/alb`
- `services/hello-world-app`

The **live infrastructure repo** defines the actual deployed infrastructure in different environments like dev, stage, and prod.

This separation helps maintain consistency across projects and simplifies maintenance by centralizing common modules.
:p What is the purpose of having separate repositories for Terraform modules and live infrastructure?
??x
Having separate repositories allows for better management and reusability of code. The module repository contains reusable, versioned components that can be shared across multiple projects. Meanwhile, the live infrastructure repository defines the actual deployed configurations in various environments (e.g., dev, stage, prod). This separation ensures consistency and makes maintenance easier.
x??

---


#### Golden Rule of Terraform
The Golden Rule of Terraform is a way to ensure your Terraform code accurately reflects the current state of your deployed infrastructure. To check this rule:
1. Go into the live repository.
2. Randomly select several folders.
3. Run `terraform plan` in each one.

If `terraform plan` always outputs "no changes," then your infrastructure code matches what's actually deployed, indicating everything is up to date and consistent.

:p How can you verify that your Terraform code accurately reflects the current state of your deployed infrastructure?
??x
You can verify this by running `terraform plan` in multiple folders within the live repository. If `terraform plan` consistently shows "no changes," it means your code matches the actual deployment, ensuring consistency and accuracy.
x??

---


#### The Trouble with Branches
Branching in Terraform can lead to issues due to the nature of infrastructure as code (IaC). Each branch may have slightly different configurations that are hard to reconcile when merging back to master.

:p What are the challenges associated with branching in Terraform?
??x
Branching in Terraform can cause inconsistencies because each branch might have its own set of configuration changes. Merging branches back into the main codebase requires careful management to avoid conflicts and ensure consistency across environments.
x??

---


#### Workflow for Deploying Infrastructure Code
A recommended workflow involves having a specialized infrastructure team that builds reusable, robust modules. These teams focus on creating production-grade components that implement best practices like:
- Composable API
- Thorough documentation (including examples)
- Automated tests
- Version control
- Implementation of security, compliance, scalability, high availability, and monitoring requirements

These modules can be shared across the organization as a service catalog, allowing other teams to deploy and manage their infrastructure independently.

:p What is the recommended workflow for deploying infrastructure code?
??x
The recommended workflow includes having an infrastructure team that builds reusable, production-grade modules. These modules are documented, tested, and versioned, ensuring they meet all company requirements (security, compliance, scalability, etc.). Other teams can consume these modules like a service catalog to deploy their infrastructure independently while maintaining consistency.
x??

---

---


#### The Golden Rule of Terraform: Main Branch Representation
Background context explaining this concept. According to the golden rule, the main branch of the live repository should be a 1:1 representation of what's actually deployed in production. This means that every resource deployed should have corresponding code checked into the live repo.

:p What does "what’s actually deployed" mean in the context of The Golden Rule of Terraform?
??x
"what’s actually deployed" refers to the actual infrastructure resources that are running and in use, which may differ from what is recorded in your version control system if out-of-band changes have been made. This can lead to discrepancies between the live environment and the code in the repository.
x??

---


#### Avoiding Out-of-Band Changes
This concept explains why making manual or out-of-band changes to deployed infrastructure bypasses the version control process, leading to potential inconsistencies.

:p Why should you avoid making out-of-band changes?
??x
Making out-of-band changes can introduce bugs and break the 1:1 relationship between your code and deployed resources. This undermines the benefits of using Infrastructure as Code (IaC) because any changes made outside the version control system cannot be tracked, reverted, or managed effectively.
x??

---


#### Using Terraform Workspaces vs. Separate Environment Folders
This concept differentiates between using workspaces to manage environments and maintaining separate folders for each environment.

:p Why should you avoid using workspaces to manage environments?
??x
Using workspaces can make it difficult to determine what resources are deployed in which environments just by looking at the codebase, because there is only one copy of the main codebase even though multiple environments exist. This can lead to confusion and maintenance issues.
x??

---


#### The Main Branch as a Single Source of Truth
This concept explains why the main branch should be the single source of truth for production deployments.

:p Why does the main branch need to represent what's actually deployed?
??x
The main branch serves as the authoritative version of your infrastructure code. By ensuring that it is an up-to-date and accurate representation, you can avoid confusion, make changes more predictable, and simplify maintenance.
x??

---


#### Importance of Consistent Branching for Shared Environments
Background context explaining why consistent branching is crucial for shared environments like staging or production. The example illustrates how Terraform’s implicit mapping from code to infrastructure means only one branch should be used for shared environments.
:p Why is it important to use a single branch for shared environments in Terraform?
??x
Using a single branch for shared environments like staging and production ensures that everyone is working with the same configuration, reducing the risk of conflicts and ensuring consistent states across deployments. For example:
```terraform
# Assuming this is part of the .gitignore or branching strategy to restrict direct changes
# Staging environment should only be modified through a specific branch
```
If multiple branches are used, changes might get out of sync, leading to issues like Bill undeploying Anna's instance type change.
x??

---


#### Workflow for Deploying Infrastructure Code
Background context explaining the iterative process of making code changes, running `terraform apply`, and testing with commands like `curl` or automated tests. The goal is to get feedback quickly and iteratively improve the infrastructure.
:p What are the steps in deploying infrastructure code using Terraform?
??x
The steps for deploying infrastructure code using Terraform include:
1. **Iterative Changes**: Make changes in your code, typically within a sandbox environment.
2. **Apply Changes**: Run `terraform apply` to deploy those changes.
3. **Manual Testing**: Use tools like `curl` or other tests to verify the deployed infrastructure works as expected.
   For example:
   ```bash
   $curl hello-world-stage-477699288.us-east-2.elb.amazonaws.com 
   Hello, World v2
   ```
4. **Automated Testing**: Run automated tests with `go test` to ensure the changes don’t break anything.
5. **Commit Changes**: Regularly commit your work to version control.
x??

---


#### Code Review and Clean Coding Practices for Terraform
Background context explaining why code reviews and clean coding practices are essential for writing maintainable, understandable infrastructure code. The example includes documentation requirements like READMEs, API docs, and design documents.
:p What are the key guidelines for clean coding in Terraform?
??x
Key guidelines for clean coding in Terraform include:
- **Documentation**: Write clear READMEs that explain what the module does, how to use it, and how to modify it. Also, include tutorials, API documentation, and design documents.
- **Automated Tests**: Ensure all changes are tested both manually (e.g., `terraform apply`, `curl`) and through automated tests (`go test`).
- **File Layout**: Define conventions for file storage layout that help in providing isolation guarantees between environments.
- **Code Documentation**: Use comments to provide context beyond the code, and leverage Terraform’s description parameters for inputs/outputs.
x??

---


#### Isolation via File Layout
Background context explaining how the file layout of Terraform code can affect isolation guarantees between different environments (e.g., staging vs. production). This ensures that changes in one environment do not inadvertently affect another.
:p How does file layout affect isolation in Terraform?
??x
File layout in Terraform impacts isolation by determining where and how state is stored, which can help prevent accidental modifications from one environment affecting another. For example:
```bash
# Example of a file structure that promotes isolation
├── main.tf
├── staging/
│   └── terraform.tfstate
└── production/
    └── terraform.tfstate
```
This layout ensures that changes in the `staging` directory do not affect the `production` state, maintaining clear separation and preventing unintended side effects.
x??

---

---


#### Code Style and Formatting
Background context: Consistent coding style is important for maintainability, readability, and avoiding bugs. Tools like `terraform fmt` can help enforce a consistent code style across your team.

:p How does Terraform's built-in `fmt` command ensure consistency in the codebase?
??x
The `terraform fmt` command automatically reformats your Terraform code to match a predefined style guide, ensuring that all contributions follow the same formatting rules. This helps maintain uniformity and readability across different contributors' code.

Example usage:
```bash$ terraform fmt
```
This command should be integrated into the commit process to ensure that any code committed adheres to the chosen coding conventions.
x??

---


#### Automated Tests
Background context: Automated tests, including unit, integration, end-to-end, and `plan` tests, are crucial for ensuring that your Terraform configurations work as expected without causing unintended changes.

:p What is the significance of running `terraform plan` before applying a configuration?
??x
Running `terraform plan` before applying a configuration provides a "diff" showing what changes will be made to the infrastructure. This step allows you to review and understand the implications of your changes before making them, which can help catch errors early.

Example usage:
```bash
$terraform plan
```
You should integrate this command into your code review process, such as using tools like Atlantis, which automatically runs `terraform plan` on commits and adds the output as a comment to pull requests.
x??

---


#### Code Review Process
Background context: A thorough code review ensures that changes are well thought out and align with team standards. Tools like Atlantis can automate part of this process by running `terraform plan`.

:p How does integrating `terraform plan` into the code review process benefit the team?
??x
Integrating `terraform plan` into the code review process helps catch potential issues early in the development cycle. By reviewing the output, reviewers and authors can understand what changes will be made to the infrastructure before they are applied. This reduces the risk of unintended side effects and ensures that the desired state is accurately represented.

Example usage:
Atlantis automatically runs `terraform plan` on commits and adds the output as a comment to pull requests.
```yaml
# Example Atlantis config snippet
hooks:
  - name: plan
    command: terraform plan
    merge_request_comment: "Plan results:"
```
x??

---


#### Scripting in General-Purpose Languages
You can write scripts using general-purpose programming languages like Python, Ruby, or Bash to customize how you use Terraform. This approach allows for more complex automation tasks beyond what Terraform’s core functionality provides.
:p How can you customize your use of Terraform?
??x
By writing scripts in languages such as Python, Ruby, or Bash, you can automate complex operations and workflows that go beyond the basic capabilities of Terraform. These scripts can be used to perform actions before or after Terraform commands.
x??

---


#### Handling Terraform Errors
Certain errors in Terraform are transient and can be fixed by re-running the command. Deployment tooling should detect these known errors and retry automatically after a brief pause. For state file issues, if the apply fails due to temporary network problems, it saves an errored state file.
:p How do you handle errors in Terraform?
??x
Transient errors in Terraform can be resolved by rerunning the `terraform apply` command. Deployment tooling like Terragrunt has built-in automatic retries for known errors. State file issues occur if internet connectivity is lost during an apply, leading to a saved errored state file.
x??

---

---


#### CI Server Lock Management
Background context: In a CI/CD pipeline, Terraform locks state files to prevent concurrent modifications. However, if something goes wrong (like a CI server crash), locks might not be released properly, causing issues when trying to deploy again.

:p What is the issue described here?
??x
The issue is that occasionally, Terraform will fail to release a lock, especially if your CI server crashes during a `terraform apply`. This can result in other users encountering an error stating the state is locked.
x??

---


#### Deployment Server Best Practices
Background context: All infrastructure code changes should be applied from a CI server, ensuring full automation and consistent environments. However, managing permissions for the CI server to deploy infrastructure can be tricky due to the elevated administrative privileges required.

:p Why is giving permanent admin permissions to a CI server problematic?
??x
Giving permanent admin permissions to a CI server poses significant security risks because:
- CI servers are notoriously hard to secure.
- They are accessible by all developers in your organization.
- They execute arbitrary code, making them a high-value target for attackers.

To mitigate these risks, you can implement security measures like:
- Locking the CI server down over HTTPS and requiring authentication.
- Running the CI server in private subnets with no public IP to restrict access only via a VPN connection.
```bash
# Example network setup
aws ec2 create-security-group --group-name ci-server-sg --description "CI Server Security Group"
aws ec2 authorize-security-group-ingress --group-name ci-server-sg --protocol tcp --port 443 --cidr <internal CIDR range>
```
x??

---


#### CI Server Security Measures
Background context: To minimize the risk of security breaches, especially when granting admin permissions to a CI server, you need to harden it against attacks. This includes securing network access, implementing authentication, and following best practices for server hardening.

:p What are some steps to secure your CI server?
??x
To secure your CI server, follow these steps:
- Ensure all communications are over HTTPS.
- Require users to be authenticated before accessing the server.
- Follow server-hardening practices such as:
  - Locking down the firewall.
  - Installing fail2ban to block repeated failed login attempts.
  - Enabling audit logging for monitoring and security auditing.

For example, you can configure a firewall rule to allow HTTPS traffic only:

```bash
# Example of configuring a firewall rule with iptables$ sudo iptables -A INPUT -p tcp --dport 443 -j ACCEPT
```
x??

---

---


#### Enforcing Approval Workflows
Background context: To ensure that every deployment is thoroughly reviewed and validated before it happens, you can enforce an approval workflow in your CI/CD pipeline. This involves requiring at least one person (other than the original requestor) to approve any changes before they are deployed.

:p What does enforcing an approval workflow entail?
??x
Enforcing an approval workflow means that every code change and deployment must be reviewed by a second pair of eyes before it is applied. During this review, the approver should inspect both the code changes and the plan output as one final check to ensure everything looks correct.

:p How can you implement the approval step in your CI/CD pipeline?
??x
You would configure your CI/CD pipeline so that after a pull request or any other change is detected, it triggers an automatic review process. The reviewer should be able to view and approve (or reject) the changes before they proceed to deployment.

Example of a simple approval workflow in pseudocode:
```java
if (codeChangeDetected()) {
    notifyReviewer(codeChanges);
    waitForApproval();
    
    if (approvalReceived()) {
        applyCodeChanges();
    } else {
        notifyDeveloper("Changes not approved.");
    }
} else {
    log("No changes detected.");
}
```
x??

---


#### Using Temporary Credentials
Background context: To further enhance security, you should avoid using permanent credentials for your CI server. Instead, use authentication mechanisms that provide temporary credentials, such as IAM roles and OIDC.

:p Why is it recommended to use temporary credentials instead of permanent ones?
??x
Using temporary credentials enhances security by limiting the exposure time of sensitive information like access keys. Permanent credentials could be accidentally exposed or lost, whereas temporary credentials expire after a limited period, reducing the risk if they are compromised.

Example of using IAM roles for temporary credentials in pseudocode:
```java
// Retrieve temporary AWS credentials from IAM role
credentials = getIAMRoleCredentials();
```
x??

---


#### Isolating Admin Credentials
Background context: To mitigate the impact of credential leaks, you should isolate admin credentials to a separate and isolated worker. This way, even if an attacker gains access to your CI server, they won't have full admin privileges.

:p How can you structure the isolation for admin credentials?
??x
You can create a separate server or container dedicated to handling admin tasks, which is strictly controlled and not accessible by developers. The only interaction allowed from the CI server is through an extremely limited API that allows running specific commands in specific contexts.

Example of restricted access API logic in pseudocode:
```java
// Define restricted access API methods
public boolean canRunCommand(Command command) {
    // Check if the command, repository, and branch match authorized criteria
}

if (canRunCommand(command)) {
    executeCommandOnWorker(command);
} else {
    log("Access denied.");
}
```
x??

---


#### Promoting Artifacts Across Environments
Background context: To manage infrastructure as code effectively across environments, you should promote immutable, versioned artifacts from one environment to another. This ensures that changes are tested before being applied to production.

:p What is the importance of promoting artifacts in pre-production environments?
??x
Promoting artifacts in pre-production (pre-prod) environments allows for thorough testing of infrastructure changes before they reach production. This practice helps catch errors and issues early, reducing risks associated with full-scale deployments.

Example of artifact promotion logic in pseudocode:
```java
if (environmentIsPreProd()) {
    promoteArtifactFromDevToStage();
    promoteArtifactFromStageToProd();
} else if (environmentIsProd()) {
    applyArtifactInProduction();
}
```
x??

---


#### Avoiding Rollback in Case of Errors
Background context: Terraform does not provide automatic rollback mechanisms when changes fail, so it is crucial to test changes in pre-production environments before applying them to production.

:p What are the implications if an error occurs during a Terraform apply operation?
??x
If something goes wrong during a `terraform apply` operation, you must manually fix the issue yourself. Terraform does not automatically roll back or revert any changes made by `apply`, making it critical to thoroughly test and validate changes in pre-production environments.

Example of handling errors after an apply operation in pseudocode:
```java
try {
    result = runTerraformApply();
} catch (Exception e) {
    log("Error during apply: " + e.getMessage());
    // Handle the error, such as fixing or rolling back manually
}
```
x??

---


#### Code Duplication in Environments

Background context: The text discusses the issue of code duplication between environments, especially when managing multiple regions and modules. This can lead to redundant and error-prone code.

:p What is the issue with code duplication in environments?

??x
The issue with code duplication in environments is that it leads to a lot of boilerplate code being repeated across different configurations, which increases the chances of errors and makes maintenance more difficult.

For example:
```bash
# In each environment's module configuration
provider "aws" {
  region = "us-east-1"
}

terraform {
  backend "s3" {
    bucket         = "my-module-backend-bucket"
    key            = "modules/${path.module}/state/terraform.tfstate"
    dynamodb_table = "my-state-lock-table"
  }
}
```
x??

---


#### Using Terragrunt for Code Duplication

Background context: To mitigate code duplication, the text suggests using Terragrunt. Terragrunt is a tool that acts as a thin wrapper around Terraform, allowing you to define your infrastructure code once in the modules repository and then manage it in different environments through `terragrunt.hcl` files.

:p How does Terragrunt help with managing infrastructure code across environments?

??x
Terragrunt helps by allowing you to define your infrastructure code exactly once in the modules repository. You can then use `terragrunt.hcl` files to configure and deploy each module in different environments without duplicating code.

For example:
```hcl
# terragrunt.hcl in the live repo
terraform {
  source = "git::https://github.com/your-modules-repo/modules.git//module-name?ref=v0.0.6"
}

provider "aws" {
  region = "us-east-1"
}
```
x??

---

---


#### Remote State Configuration with Terragrunt
Background context: This section explains how to manage backend configurations across multiple modules using a single `terragrunt.hcl` file.

:p How do you configure remote state for all modules?
??x
You can define the remote state configuration in a root `terragrunt.hcl` file, which will be inherited by child modules. For example, create a `live/stage/terragrunt.hcl`:

```hcl
remote_state {
  backend = "s3"
  generate = {
    path       = "backend.tf"
    if_exists  = "overwrite"
  }
  config = {
    bucket          = "<YOUR BUCKET>"
    key             = "${path_relative_to_include()}/terraform.tfstate"
    region          = "us-east-2"
    encrypt         = true
    dynamodb_table  = "<YOUR_TABLE>"
  }
}
```

??x
Configure the backend settings in a root `terragrunt.hcl` file, like this:

```hcl
remote_state {
  backend = "s3"
  generate = {
    path       = "backend.tf"
    if_exists  = "overwrite"
  }
  config = {
    bucket          = "<YOUR BUCKET>"
    key             = "${path_relative_to_include()}/terraform.tfstate"
    region          = "us-east-2"
    encrypt         = true
    dynamodb_table  = "<YOUR_TABLE>"
  }
}
```

Then, include this root `terragrunt.hcl` in child modules like `data-stores/mysql`:

```hcl
include {
  path = find_in_parent_folders()
}
```

??x

---

