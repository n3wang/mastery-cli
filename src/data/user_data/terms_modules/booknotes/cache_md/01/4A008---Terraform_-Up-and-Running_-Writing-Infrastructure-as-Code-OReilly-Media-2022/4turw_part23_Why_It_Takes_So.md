# High-Quality Flashcards: 4A008---Terraform_-Up-and-Running_-Writing-Infrastructure-as-Code-OReilly-Media-2022_processed (Part 23)


**Starting Chapter:** Why It Takes So Long to Build Production-Grade Infrastructure

---


#### Accidental Complexity vs. Essential Complexity
Accidental complexity refers to the problems imposed by specific tools and processes chosen, while essential complexity is inherent in the task itself regardless of the tools used.

:p What differentiates accidental complexity from essential complexity?
??x
Accidental complexity involves issues arising from the tools and processes selected for a project. For example, dealing with memory allocation bugs in C++ is an accidental complexity because using a language like Java would avoid such problems. Essential complexity, on the other hand, pertains to inherent challenges that must be addressed no matter what technologies are used—such as developing algorithms to solve specific problems.
x??

---


#### Example of Yak Shaving
Yak shaving can occur in DevOps projects where small tasks lead to larger and more complex issues.

:p Provide an example of yak shaving in a DevOps context?
??x
In a DevOps context, trying to deploy a quick fix for a typo might uncover configuration issues. Resolving these could lead to TLS certificate problems. Addressing this issue might involve updating the deployment system, which could reveal an out-of-date Linux version. Ultimately, this might result in updating all server operating systems, all stemming from the initial desire to fix a small typo.
x??

---

---


#### Production-Grade Infrastructure Checklist Overview
The context of this checklist is to ensure that infrastructure is production-ready by addressing common gaps developers might overlook. The goal is to standardize deployment processes and ensure critical functionalities are covered.

:p What is the main objective of the Production-Grade Infrastructure Checklist?
??x
The main objective of the Production-Grade Infrastructure Checklist is to provide a comprehensive guide for deploying infrastructure in a way that ensures it is robust, secure, scalable, and performant. This checklist aims to address common gaps in developers' knowledge about necessary deployment tasks, ensuring that critical functionalities are not overlooked.

This helps standardize the process across different teams and projects within an organization.
??x

---


#### Install Task
The task of installing software binaries and their dependencies is crucial for setting up a production environment. Tools like Bash, Ansible, Docker, and Packer can be used to automate this process.

:p What tools are commonly used for the "Install" task in the Production-Grade Infrastructure Checklist?
??x
Commonly used tools for the "Install" task include:
- **Bash**: A command-line shell that is used for scripting installation processes.
- **Ansible**: An automation tool that can manage and install software.
- **Docker**: A platform to build, ship, and run applications in containers.
- **Packer**: A tool to create machine images.

These tools help automate the process of installing software binaries and their dependencies.
??x

---


#### Configure Task
The "Configure" task involves setting up the software at runtime. This includes settings like port configurations, TLS certificates, service discovery, leaders, followers, replication, etc. Tools such as Chef, Ansible, and Kubernetes can be used to manage these configurations.

:p What tools are commonly used for the "Configure" task in the Production-Grade Infrastructure Checklist?
??x
Commonly used tools for the "Configure" task include:
- **Chef**: An infrastructure automation tool that manages configuration data.
- **Ansible**: A simple, flexible, and powerful IT automation engine.
- **Kubernetes**: A platform for automating deployment, scaling, and management of containerized applications.

These tools help manage runtime configurations effectively.
??x

---


#### Provision Task
The "Provision" task involves setting up the infrastructure, including servers, load balancers, network configuration, firewall settings, IAM permissions, etc. Tools like Terraform and CloudFormation can be used for this purpose.

:p What tools are commonly used for the "Provision" task in the Production-Grade Infrastructure Checklist?
??x
Commonly used tools for the "Provision" task include:
- **Terraform**: An open-source infrastructure as code tool.
- **CloudFormation**: A service provided by AWS to enable declarative provisioning and management of cloud resources.

These tools help manage the setup and configuration of servers, load balancers, network settings, and other components required for a production environment.
??x

---


#### Deploy Task
The "Deploy" task involves deploying the service on top of the infrastructure with zero downtime. Tools like ASG (Auto Scaling Group), Kubernetes, and ECS (Elastic Container Service) can be used to manage deployments.

:p What tools are commonly used for the "Deploy" task in the Production-Grade Infrastructure Checklist?
??x
Commonly used tools for the "Deploy" task include:
- **ASG (Auto Scaling Group)**: A service that automatically adjusts the number of active servers based on the load.
- **Kubernetes**: An open-source platform for automating deployment, scaling, and management of containerized applications.
- **ECS (Elastic Container Service)**: A managed container orchestration service by AWS.

These tools help manage deployments to ensure minimal downtime during rollouts.
??x

---


#### High Availability Task
The "High Availability" task involves ensuring the infrastructure can withstand outages in individual processes, servers, services, datacenters, and regions. Multi-datacenter and multi-region strategies are essential for achieving high availability.

:p What is the main goal of the "High Availability" task in the Production-Grade Infrastructure Checklist?
??x
The main goal of the "High Availability" task is to ensure that the infrastructure can continue operating even if individual processes, servers, services, datacenters, or regions fail. This involves strategies such as:
- Multi-datacenter and multi-region setups.
- Implementing redundancy in critical components.

These strategies help maintain service availability and minimize downtime.
??x

---


#### Scalability Task
The "Scalability" task involves scaling the infrastructure both horizontally (adding more servers) and vertically (bigger servers). Tools like Auto Scaling can be used to manage this process.

:p What tools are commonly used for the "Scalability" task in the Production-Grade Infrastructure Checklist?
??x
Commonly used tools for the "Scalability" task include:
- **Auto Scaling**: A service that automatically adjusts the number of active servers based on the load.
- **Replication**: A method to duplicate data or processes across multiple nodes.

These tools help manage horizontal and vertical scaling, ensuring the infrastructure can handle varying loads efficiently.
??x

---


#### Performance Task
The "Performance" task involves optimizing CPU, memory, disk, network, and GPU usage. Tools like Dynatrace, Valgrind, and VisualVM can be used for performance optimization.

:p What tools are commonly used for the "Performance" task in the Production-Grade Infrastructure Checklist?
??x
Commonly used tools for the "Performance" task include:
- **Dynatrace**: A monitoring tool that provides insights into application performance.
- **Valgrind**: A memory debugging tool to identify memory leaks and other issues.
- **VisualVM**: A Java-based visual virtual machine monitor.

These tools help optimize resource usage, ensuring better performance of the infrastructure.
??x

---


#### Networking Task
The "Networking" task involves configuring static and dynamic IPs, ports, service discovery, firewalls, DNS, SSH access, and VPN access. Tools like VPCs (Virtual Private Cloud) and Route 53 can be used for network configuration.

:p What tools are commonly used for the "Networking" task in the Production-Grade Infrastructure Checklist?
??x
Commonly used tools for the "Networking" task include:
- **VPCs (Virtual Private Cloud)**: A service that provides a virtualized network environment.
- **Route 53**: Amazon’s domain name system (DNS) web service.

These tools help configure static and dynamic IPs, ports, DNS settings, and other networking components for the infrastructure.
??x

---


#### Security Task
The "Security" task involves ensuring encryption in transit (TLS), authentication, authorization, secrets management, server hardening. Tools like ACM (AWS Certificate Manager), Let’s Encrypt, KMS (Key Management Service), and Vault can be used.

:p What tools are commonly used for the "Security" task in the Production-Grade Infrastructure Checklist?
??x
Commonly used tools for the "Security" task include:
- **ACM (AWS Certificate Manager)**: A service that enables you to provision, manage, and deploy SSL/TLS certificates.
- **Let’s Encrypt**: A non-profit organization providing free TLS/SSL certificates.
- **KMS (Key Management Service)**: A managed service for storing cryptographic keys used in AWS.
- **Vault**: An open-source tool for securely accessing secrets.

These tools help ensure robust security measures are in place, protecting data and services from unauthorized access.
??x

---

---


---
#### Small Modules
Background context: Developers often define all infrastructure for different environments (dev, stage, prod) in a single file or module. This approach is inefficient and can lead to security and performance issues.
:p Why should large modules be considered harmful?
??x
Large modules are slow because they contain more than a few hundred lines of code, leading to long execution times for commands like `terraform plan`. They also compromise security as users with permissions to change any part of the infrastructure might have too much access. This goes against the principle of least privilege.
??x

---


#### Composable Modules
Background context: Composing smaller modules allows for more maintainable and reusable code. Each module should focus on a single responsibility, making them easier to test and understand.
:p What is the benefit of using composable modules?
??x
The benefit of using composable modules is that they allow for better organization and reusability of infrastructure code. Smaller, focused modules are easier to maintain, test, and scale individually. This approach promotes a modular architecture where components can be easily swapped or extended.
??x

---


#### Testable Modules
Background context: Automated testing ensures that changes do not break existing functionality. Testable modules allow for comprehensive testing of infrastructure code before deployment.
:p How does having testable modules help in the development process?
??x
Having testable modules helps ensure that changes to infrastructure code do not introduce bugs or unintended behavior. By writing tests (e.g., using Terratest, tflint) and running them after every commit and nightly, developers can catch issues early and maintain a stable infrastructure.
??x

---


#### Versioned Modules
Background context: Versioning allows for tracking changes to modules over time and ensures that upgrades or downgrades are managed properly. It is crucial for maintaining consistency in deployments.
:p Why is versioning important when managing infrastructure code?
??x
Versioning is important because it provides a historical record of changes, making it easier to track updates, roll back, and maintain consistent deployments across environments. Using versioned modules ensures that upgrades or downgrades can be managed systematically without disrupting existing configurations.
??x

---


#### Beyond Terraform Modules
Background context: While Terraform modules are powerful, they may not cover all aspects of production-grade infrastructure management. Other tools and practices (e.g., Infracost for cost optimization) should also be considered to ensure comprehensive and robust infrastructure.
:p What additional tools or practices can complement Terraform modules?
??x
Additional tools like Infracost can help with cost optimization by providing detailed cost breakdowns, ensuring that resource allocation is efficient. Other practices such as documenting code, architecture, and incidents (using READMEs, wikis, Slack) and writing infrastructure-as-code tests (e.g., Terratest, tflint, OPA, InSpec) are essential for maintaining robust and scalable infrastructure.
??x
---

---


#### Large Modules are Risky
Background context: The provided text discusses why large modules can be problematic. It highlights risks such as breaking everything due to a minor mistake, difficulty in understanding complex code, difficulties in reviewing and testing extensive modules.

:p Why are large modules considered risky?
??x
Large modules pose several risks:
1. **Breaking Everything**: A single error or command typo can lead to the deletion of production databases.
2. **Understanding Difficulty**: Large modules make it hard for one person to understand all aspects, leading to costly mistakes.
3. **Review Challenges**: Reviewing large modules is nearly impossible due to their extensive codebase and lengthy `terraform plan` output.
4. **Testing Difficulties**: Testing infrastructure with a large amount of code is almost impossible.

For example, if a module has 20,000 lines of code, it would be difficult for anyone to understand or review effectively:
```python
def complex_function():
    # Imagine a function that does too many things
    pass
```
x??

---


#### Small Modules Benefit
Background context: The text emphasizes the benefits of using small modules. Smaller modules are easier to understand and manage, reducing the risk of errors.

:p Why should code be built out of small modules?
??x
Code should be built out of small modules because:
1. **Ease of Understanding**: Smaller modules make it easier for anyone to understand what each module does.
2. **Risk Reduction**: Breaking one part of a small module is less likely to cause widespread issues compared to breaking a large monolithic module.

For instance, refactoring a 20,000-line module into smaller ones:
```java
public class ASGModule {
    public void deployASG() {
        // Logic for deploying an ASG
    }
}

public class ALBModule {
    public void deployALB() {
        // Logic for deploying an ALB
    }
}
```
x??

---


#### Refactoring Example: Webserver-Cluster
Background context: The text provides a specific example of refactoring a large `webserver-cluster` module into smaller, more manageable modules.

:p How can the `webserver-cluster` module be refactored?
??x
The `webserver-cluster` module can be refactored as follows:
1. **ASG Module** - Deploy an Auto Scaling Group with zero-downtime rolling deployment.
2. **ALB Module** - Deploy an Application Load Balancer.
3. **Hello, World App Module** - Deploy a simple “Hello, World” app using the ASG and ALB.

The refactored code structure would look like:
```plaintext
modules/
├── cluster/
│   └── asg-rolling-deploy/
│       ├── main.tf  # Contains resources for ASG deployment
│       └── variables.tf  # Contains necessary variables
├── networking/
│   └── alb/
│       ├── main.tf  # Contains resources for ALB deployment
│       └── variables.tf  # Contains necessary variables
└── services/
    └── hello-world-app/
        ├── main.tf  # Deploys the "Hello, World" app using asg-rolling-deploy and alb
        └── variables.tf  # Contains specific variables for the Hello, World app
```
x??

---


#### Benefits of Small Modules
Background context: The text discusses the benefits of breaking down large modules into smaller ones. It includes points like better understanding, easier review, and improved testing.

:p What are the benefits of using small modules?
??x
Using small modules offers several benefits:
1. **Improved Understanding**: Each module focuses on one task, making it easier to understand.
2. **Easier Review**: Smaller modules can be reviewed more efficiently.
3. **Better Testability**: Testing individual modules is simpler and more effective.

For example, a 20,000-line module can be broken down into smaller, manageable pieces:
```plaintext
// Example of a small ASG module in Terraform
resource "aws_autoscaling_group" "example" {
    # ASG configuration details
}
```
x??

---


#### Testing Infrastructure Code
Background context: The text mentions the difficulty in testing large infrastructure modules due to their complexity.

:p Why is testing large infrastructure code difficult?
??x
Testing large infrastructure code is difficult because:
1. **Complexity**: Large modules have more moving parts, making it hard to test thoroughly.
2. **Resource Intensive**: Testing requires significant computational resources and time.

For instance, a large module might involve multiple services and complex dependencies that are hard to simulate during testing:
```plaintext
# Example of a large infrastructure module with many dependencies
resource "aws_cloudwatch_metric_alarm" "example" {
    # Metric alarm configuration details
}
```
x??

---

---


#### Unix Philosophy: Write Programs That Do One Thing and Do It Well

Background context explaining the concept. The Unix philosophy emphasizes simplicity and modularity, encouraging developers to create programs that perform a single task efficiently.

:p What is the main idea of the Unix philosophy mentioned by Doug McIlroy?
??x
The main idea is to write programs that are focused on doing one thing well, rather than creating complex monolithic applications. This approach enhances reusability and maintainability.
x??

---


#### Composable Modules in Terraform

Background context explaining how modules can be used to break down infrastructure into reusable components. The example provided uses two small modules—`asg-rolling-deploy` and `alb`.

:p How do you make modules like `asg-rolling-deploy` and `alb` work together in a composable way?
??x
To make the modules work together, they need to be designed with clear inputs (input variables) and outputs (output variables). This allows them to pass necessary data between each other, making the overall infrastructure more modular and reusable.

For example, if `asg-rolling-deploy` creates an Auto Scaling Group and `alb` creates a Load Balancer, they can share information about resources like security groups or subnets.

```hcl
# asg-rolling-deploy module
variable "security_group_id" {
  description = "The ID of the security group to associate with the ASG"
  type        = string
}

resource "aws_security_group" "example_sg" {
  name        = var.security_group_name
  description = "Security group for ASG"
  vpc_id      = data.aws_vpc.example.id
}
```

```hcl
# alb module
variable "alb_name" {
  description = "The name to use for this ALB"
  type        = string
}

resource "aws_lb" "example" {
  name               = var.alb_name
  load_balancer_type = "application"
  subnets            = data.aws_subnets.default.ids
  security_groups    = [var.security_group_id]
}
```
x??

---


#### Function Composition in Programming

Background context explaining how function composition works, using the Ruby example provided.

:p What is function composition and how can it be applied in programming?
??x
Function composition involves combining multiple functions to create a new, more complex function. In the provided Ruby example, simpler functions like `add`, `sub`, and `multiply` are combined to form a more complex `do_calculation` function.

Here's a brief explanation of how this works:

```ruby
# Simple function to do addition
def add(x, y)
  return x + y
end

# Simple function to do subtraction
def sub(x, y)
  return x - y
end

# Simple function to do multiplication
def multiply (x, y)
  return x * y
end

# Complex function that composes several simpler functions
def do_calculation (x, y)
  return multiply(add(x, y), sub(x, y))
end
```

In this example, `do_calculation` takes two inputs and uses the outputs of other functions as its own parameters.
x??

---


#### Reusability in Terraform Modules

Background context explaining how minimizing side effects can improve code reusability and maintainability.

:p Why is it important to minimize side effects when designing reusable Terraform modules?
??x
Minimizing side effects enhances the reusability of Terraform modules because it ensures that functions are predictable and deterministic. By avoiding reading state from the outside world (side effects) and returning results via output parameters, you can ensure that modules work correctly in different contexts.

For example, a module might be designed to create an Auto Scaling Group, but its functionality should not depend on external states unless passed as input variables. This makes it easier to use the same module in multiple environments without modifications.
x??

---


#### Terraform Module Composition

Background context explaining how to combine simpler modules into more complex ones.

:p How can you build more complicated modules by combining simpler modules in Terraform?
??x
You can build more complicated modules by combining simpler modules using input and output variables. The `asg-rolling-deploy` and `alb` examples show this process:

1. Define inputs (variables) that the simpler modules require.
2. Pass these inputs when calling one module from another.
3. Use outputs of simpler modules as inputs for more complex ones.

For instance, if `asg-rolling-deploy` creates an Auto Scaling Group with a specific security group ID, and `alb` needs this ID to configure its security groups, you can pass the security group ID output by `asg-rolling-deploy` into `alb`.

```hcl
# asg-rolling-deploy module (output)
output "security_group_id" {
  value = aws_security_group.example.id
}

# alb module (input)
variable "security_group_id" {
  description = "The ID of the security group to associate with the ALB"
  type        = string
}
```

x??

---

---


#### Adding Subnet IDs Variable
Background context: The `subnet_ids` variable allows the module to be used with any VPC or subnets, making it more flexible and reusable. This change is part of transforming a hardcoded deployment approach into a generic one.

:p What does the `subnet_ids` variable enable in the asg-rolling-deploy module?
??x
The `subnet_ids` variable enables the module to be deployed across different VPCs and subnets, providing flexibility and reusability. By defining this variable, users can specify which subnets they want the auto-scaling group (ASG) to target during deployment.

```hcl
variable "subnet_ids" {
  description = "The subnet IDs to deploy to"
  type        = list(string)
}
```
x??

---


#### Adding User Data Variable
Background context: The `user_data` variable allows for a customizable User Data script, enabling the deployment of any application across an ASG. This makes the module more versatile and adaptable to different use cases.

:p What does the `user_data` variable enable in the asg-rolling-deploy module?
??x
The `user_data` variable enables users to pass in a customized User Data script that can be executed on each instance at boot time. This allows for deploying any application, not just a "Hello, World" app.

```hcl
variable "user_data" {
  description = "The User Data script to run in each Instance at boot"
  type        = string
  default     = null
}
```
x??

---


#### Passing Through Variables to AWS Auto Scaling Group Resource
Background context: The `aws_autoscaling_group` resource now uses the new input variables (`subnet_ids`, `target_group_arns`, and `health_check_type`) instead of hardcoded references. This makes the module more flexible, allowing it to be used with various configurations.

:p How are the new input variables passed through to the AWS Auto Scaling Group resource?
??x
The new input variables (`subnet_ids`, `target_group_arns`, and `health_check_type`) are passed directly into the `aws_autoscaling_group` resource. This allows for more flexibility in deploying the ASG with different subnets, load balancers, and health check types.

```hcl
resource "aws_autoscaling_group" "example" {
  name                 = var.cluster_name
  launch_configuration = aws_launch_configuration.example.name
  vpc_zone_identifier   = var.subnet_ids
  target_group_arns     = var.target_group_arns
  health_check_type     = var.health_check_type
  min_size              = var.min_size
  max_size              = var.max_size
}
```
x??

---


#### Adding Output Variables for ASG and Security Group IDs
Background context: Output variables (`asg_name` and `instance_security_group_id`) are added to make the module more reusable. These outputs can be used by consumers of the module to add new behaviors, such as attaching custom rules to the security group.

:p What output variables were added to the ASG deployment?
??x
The following output variables were added:
- `asg_name`: Provides the name of the Auto Scaling Group.
- `instance_security_group_id`: Provides the ID of the EC2 instance security group.

These outputs make the module more reusable by allowing consumers to use these data points for additional configurations, such as attaching custom rules to the security group.

```hcl
output "asg_name" {
  value       = aws_autoscaling_group.example.name
  description = "The name of the Auto Scaling Group"
}

output "instance_security_group_id" {
  value       = aws_security_group.instance.id
  description = "The ID of the EC2 Instance Security Group"
}
```
x??

---

