# High-Quality Flashcards: 4A008---Terraform_-Up-and-Running_-Writing-Infrastructure-as-Code-OReilly-Media-2022_processed (Part 2)


**Starting Chapter:** Chapter 1. Why Terraform. What Is DevOps

---


#### What is DevOps?
Background context explaining the concept. In the past, developers and operations teams worked in isolation, with manual processes for deploying applications. This led to inefficiencies and reliability issues as companies scaled.
If applicable, add code examples with explanations:
```java
public class Example {
    // Code that might be developed by a Dev team
}
```
:p What is DevOps?
??x
DevOps is a set of practices intended to improve the efficiency and automation in software delivery. It aims to break down barriers between development (Dev) and operations (Ops) teams, fostering collaboration and continuous improvement.
x??

---


#### What is Infrastructure as Code?
Background context explaining the concept. Traditionally, infrastructure setup was done manually or via scripts specific to each environment. Infrastructure as code (IaC) involves treating infrastructure configuration as a software asset, written in a declarative language and managed with version control.
:p Define Infrastructure as Code (IaC)?
??x
Infrastructure as Code (IaC) refers to the practice of managing and provisioning infrastructure resources using code. It treats infrastructure configuration as a software artifact that can be stored in a source control system and automated for deployment, ensuring consistency and repeatability across environments.
x??

---


#### What Are the Benefits of Infrastructure as Code?
Background context explaining the concept. IaC allows for the automation of repetitive tasks, reduces human errors through consistent application of policies, and enables better collaboration between development and operations teams by treating infrastructure like any other code.
:p List three benefits of using IaC.
??x
1. Consistency: Ensures that infrastructure is consistently configured across all environments.
2. Automation: Reduces manual effort and increases deployment speed.
3. Collaboration: Facilitates better communication and coordination between Dev and Ops teams.

For example, consider a Terraform script:
```hcl
resource "aws_instance" "example" {
  ami           = "ami-0c55b159cbfafe1f0"
  instance_type = "t2.micro"

  tags = {
    Name = "example-instance"
  }
}
```
This script is managed in version control and can be applied across different environments with ease.
x??

---


#### How Does Terraform Work?
Background context explaining the concept. Terraform is a tool for infrastructure management that allows you to define, manage, and deploy multi-cloud infrastructure as code. It uses configuration files written in HCL (HashiCorp Configuration Language) or JSON.
:p Explain how Terraform works.
??x
Terraform works by defining your infrastructure using configuration files in HashiCorp Configuration Language (HCL). These files describe the desired state of your infrastructure, and Terraform manages the steps required to achieve that state. You can apply these configurations to different environments like development, testing, or production.

Example HCL file:
```hcl
provider "aws" {
  region = "us-west-2"
}

resource "aws_vpc" "example" {
  cidr_block = "10.0.0.0/16"

  tags = {
    Name = "example-vpc"
  }
}
```
Terraform will manage the lifecycle of resources defined in this file, ensuring they match the desired state you have specified.
x??

---


#### Infrastructure as Code (IaC)
Background context: Infrastructure as Code (IaC) is a practice where infrastructure is managed through source control and defined with programming languages. This approach aims to treat all aspects of operations, including hardware configuration, as software. It provides an alternative to ad hoc scripts and specialized tools like Chef, Puppet, Ansible, and others.

:p What is Infrastructure as Code (IaC)?
??x
Infrastructure as Code (IaC) refers to managing infrastructure through source control using programming languages. This practice transforms the provisioning and management of infrastructure into a software development process.
??x

---


#### Configuration Management Tools (Chef, Puppet, Ansible)
Background context: Configuration management tools like Chef, Puppet, and Ansible automate the installation and maintenance of software on servers. These tools enforce consistent structures, making it easier to manage infrastructure across multiple machines.

:p What are configuration management tools?
??x
Configuration management tools are specialized IaC tools designed to install and manage software on existing servers. They provide a structured approach to managing infrastructure, ensuring consistency and idempotency.
??x

---


#### Idempotence in Configuration Management Tools
Background context: Idempotent code performs the same action regardless of how many times it is executed. This property ensures that running the same script multiple times does not lead to unintended side effects.

:p What is idempotence?
??x
Idempotence refers to a function or process where performing an operation multiple times has the same effect as performing it once, ensuring consistent and predictable outcomes.
??x

---


#### Ansible Role Example (web-server.yml)
Background context: An Ansible role provides a structured way to define tasks that are idempotent and easy to manage. The provided example shows how to configure an Apache web server using Ansible.

:p What is the purpose of the `web-server.yml` Ansible role?
??x
The `web-server.yml` Ansible role configures an Apache web server by installing necessary packages, cloning a repository, and starting the service. It ensures that these operations are idempotent.
??x

---


#### Virtual Machines vs. Containers

Virtual machines (VMs) and containers are two types of server templating tools that provide varying degrees of isolation and performance characteristics.

:p What is a virtual machine?
??x
A virtual machine emulates an entire computer system, including hardware, by running on top of a hypervisor like VMware or VirtualBox. Each VM has its own operating system and runs in isolated environments, ensuring consistency across different deployment stages (development, QA, production).

The main benefits include:
- Full isolation from the host and other VMs.
- Consistent behavior regardless of environment.

However, there are significant drawbacks:
- High overhead due to emulating full hardware.
- Longer boot times compared to containers.

x??

---


#### Containers

Containers emulate user space environments of an operating system, providing a lightweight alternative to virtual machines by sharing the host's kernel and hardware resources.

:p What is a container?
??x
A container emulates only the user space environment (e.g., running applications) without the overhead of a full OS. Container engines like Docker, CoreOS rkt, or cri-o run isolated processes, memory, mount points, and networking on top of a shared kernel.

The main benefits include:
- High isolation at the application level.
- Extremely fast boot times due to no need to virtualize hardware.

However, there are some drawbacks:
- Shared kernel and hardware resources can introduce security risks if misconfigured.
- Less robust isolation compared to VMs.

x??

---

---

