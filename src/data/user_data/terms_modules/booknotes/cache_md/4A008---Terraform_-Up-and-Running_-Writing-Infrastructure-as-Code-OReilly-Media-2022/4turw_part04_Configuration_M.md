# High-Quality Flashcards: 4A008---Terraform_-Up-and-Running_-Writing-Infrastructure-as-Code-OReilly-Media-2022_processed (Part 4)


**Starting Chapter:** Configuration Management Versus Provisioning

---


#### Overview of IaC Tools Comparison
Background context: The provided text discusses the challenges and considerations when choosing an Infrastructure as Code (IaC) tool. It mentions that many tools overlap, making it difficult to determine which one is best suited for a specific use case without practical experience.

:p What are some key factors discussed in the text that make picking an IaC tool challenging?
??x
The text highlights several factors such as overlapping functionality among tools, open-source and commercial support options, lack of clear criteria for selection, and comparing tools based on general properties rather than specific use cases. It emphasizes the need to understand trade-offs between different features like configuration management versus provisioning, mutable vs immutable infrastructure, procedural language vs declarative language, and more.

```java
public class IaCToolComparison {
    public void evaluateTools() {
        String[] factors = {"configuration management vs provisioning", 
                            "mutable infrastructure vs immutable infrastructure",
                            "procedural language vs declarative language"};
        for (String factor : factors) {
            System.out.println("Factor: " + factor);
        }
    }
}
```
x??

---


#### Trade-offs and Priorities
Background context: The text outlines various trade-offs that need to be considered when choosing an IaC tool, including the nature of configuration management versus provisioning, mutable infrastructure versus immutable infrastructure, and more. These considerations are crucial for making a decision based on specific needs.

:p What are some key trade-offs mentioned in the text?
??x
The key trade-offs include:
- Configuration management versus provisioning: Tools differ in how they handle infrastructure setup.
- Mutable infrastructure versus immutable infrastructure: Some tools allow changes to existing resources, while others enforce recreating resources from scratch.
- Procedural language versus declarative language: The way configuration is written and managed can vary significantly.

```java
public class TradeOffs {
    public void displayTradeoffs() {
        String[] tradeoffs = {"configuration management vs provisioning", 
                              "mutable infrastructure vs immutable infrastructure",
                              "procedural language vs declarative language"};
        for (String tradeoff : tradeoffs) {
            System.out.println("Trade-off: " + tradeoff);
        }
    }
}
```
x??

---


#### Detailed Comparison of Tools
Background context: The text mentions a detailed comparison between multiple IaC tools, including Terraform, Chef, Puppet, Ansible, Pulumi, CloudFormation, and OpenStack Heat. This comparison helps in making an informed decision by understanding the strengths and weaknesses of each tool.

:p What are some specific criteria used to compare these IaC tools?
??x
Specific criteria for comparing IaC tools include:
- Configuration management versus provisioning
- Mutable infrastructure versus immutable infrastructure
- Procedural language versus declarative language
- General-purpose language versus domain-specific language
- Master versus masterless architecture
- Agent-based versus agentless deployment models
- Paid vs free offerings
- Community size and maturity
- Use of multiple tools together

```java
public class ComparisonCriteria {
    public void displayCriteria() {
        String[] criteria = {"configuration management vs provisioning", 
                             "mutable infrastructure vs immutable infrastructure",
                             "procedural language vs declarative language"};
        for (String criterion : criteria) {
            System.out.println("Criterion: " + criterion);
        }
    }
}
```
x??

---


#### Server Templating and Infrastructure Management
If you use server templating tools such as Docker or Packer, the majority of your configuration needs are already handled during the image creation phase. Once you have an image created from these templates, you can then focus on provisioning infrastructure to run those images.
:p What is the role of server templating tools in managing infrastructure?
??x
Server templating tools like Docker and Packer help create standardized machine images with all necessary configurations baked in. This approach minimizes configuration drift since changes are typically deployed as new servers rather than updates to existing ones. For example, when deploying a new version of OpenSSL, you would use Packer to update the image and then provision new instances based on this updated image.
x??

---


#### Mutable vs. Immutable Infrastructure
Configuration management tools like Chef, Puppet, and Ansible default to mutable infrastructure, meaning that they apply changes directly to existing servers over time. This can lead to subtle configuration drift as each server accumulates a unique history of changes.
:p What is the difference between mutable and immutable infrastructure in the context of configuration management?
??x
Mutable infrastructure allows for direct updates to running servers, which can result in configuration drift over time. For example, using Chef to install a new version of OpenSSL will update the existing installation on the server. This approach makes it harder to diagnose and reproduce issues since each server might have its own history of changes.

Immutable infrastructure, typically used with provisioning tools like Terraform, involves deploying completely new servers whenever there is a change in configuration. For instance, if you need to deploy a new version of OpenSSL, you would create a new image using Packer, then deploy it and terminate the old servers.
x??

---


#### Using Configuration Management and Provisioning Together
For environments not using server templating tools, combining a provisioning tool with a configuration management tool is common. For example, Terraform can be used to provision servers while Ansible can manage the configurations on each server.
:p How do you use a combination of configuration management and provisioning tools?
??x
You can use a combination where Terraform provisions new infrastructure (using Docker or Packer for images), and Ansible configures each newly created instance. For example, when deploying a new version of OpenSSL:
- Use Terraform to create a new image with the updated OpenSSL version.
- Deploy this image to a set of new servers using Terraform.
- Terminate old servers after deployment.

This approach reduces configuration drift and makes it easier to manage and test infrastructure consistently across environments.
x??

---


#### Benefits of Immutable Infrastructure
Immutable infrastructure, often deployed via provisioning tools like Terraform, uses completely new instances for changes. This reduces the likelihood of configuration drift bugs and allows easy rollback to previous versions by deploying old images again.
:p Why is immutable infrastructure beneficial in terms of automated testing?
??x
Immutable infrastructure is beneficial because it ensures that an image tested in a test environment will behave identically when deployed in production, assuming both environments use identical images. This consistency makes automated tests more effective and reliable.

For example, if you deploy a new version using Packer to create a new image and then provision servers with this image:
- Changes are always applied by deploying fresh instances.
- Automated tests in the test environment can be assumed to reflect the production environment accurately since they both use the same images.
x??

---

---


#### Immutability Trade-offs
Background context explaining the downsides of using an immutable approach. Immutable changes can be slow when redeploying servers for trivial updates, and there's a risk of configuration drift after deployment.

:p What are some drawbacks of immutability?
??x
The main drawbacks include long rebuild times for minor updates as you need to redeploy entire server images. Additionally, even though the image is immutable once deployed, the running instance may modify its state over time, leading to configuration drift unless frequently reinitialized.
??x

---


#### Managing Server Deployment with Terraform
Explanation of how Terraform handles server deployment in a declarative manner.

:p How does Terraform manage server deployments?
??x
Terraform uses a declarative approach where you declare the desired state and let the tool handle the changes. The following Terraform code deploys 10 EC2 instances:
```hcl
resource "aws_instance" "example" {
  count         = 10
  ami           = "ami-0fb653ca2d3203ac1"
  instance_type = "t2.micro"
}
```
To scale up, you simply update the `count` attribute without rewriting the entire script. You can also use Terraform's `plan` command to preview changes:
```sh
$ terraform plan
# Preview of changes before applying the configuration.
```
Terraform will recognize existing resources and only apply necessary updates.
??x

---


#### Procedural vs Declarative Infrastructure as Code (IaC)
Background context explaining the concept. IaC tools are used to manage infrastructure using configuration files instead of manual processes. The two main approaches are procedural and declarative.

Procedural IaC, such as Ansible, involves writing scripts that describe a series of steps to achieve an end state. Declarative IaC, like Terraform, focuses on specifying the desired state directly in the code.

:p How does the procedural approach manage infrastructure changes?
??x
In the procedural approach, you write scripts or templates that describe each step needed to deploy resources. For example, updating an AMI requires writing a new template and manually identifying which servers need to be updated, as shown:
```yaml
# Example Ansible template for deploying an application
- name: Deploy Application on EC2 Instances
  hosts: all_ec2_instances
  tasks:
    - name: Update AMIs on all instances
      ec2_instance_info:
        region: us-east-1
        filters:
          tag:Name: "{{ item }}"
      register: instance_info

    - name: Rebuild instances with new AMI
      ec2:
        image_id: ami-02bcbb802e03574ba
        instance_type: t2.micro
        region: us-east-1
        tags:
          Name: "{{ item }}"
      loop: "{{ instance_info.instances | map(attribute='tags.Name') | list }}"
```
x??

---


#### Limitations of Reusability in Procedural IaC Tools
Background context explaining the concept. Procedural code must account for the current state of infrastructure, making reusability limited as this state changes frequently.

:p How does procedural code limit its reusability?
??x
Procedural code limits reusability because it needs to consider the current state of the infrastructure at every execution. Code that worked a week ago may no longer be applicable due to changes in the environment, such as new instances being added or existing ones being removed.

For example, if you had a script deploying an application on 10 servers last month and now need to update it to deploy on 15 servers:
```yaml
- name: Update App on Existing Servers
  hosts: existing_servers
  tasks:
    - name: Deploy app update

# New code needs to account for the change in number of instances.
```
This change requires modifying the script, which can be error-prone and time-consuming.

x??

---

---


#### Declarative vs. Procedural Approach

Terraform uses a declarative approach to manage infrastructure as code, while other tools like Chef and Pulumi use procedural approaches.

:p What is the difference between a declarative and procedural approach in managing infrastructure with IaC tools?
??x
In a declarative approach, Terraform describes the desired state of your infrastructure. This means you simply define what resources should exist, their properties, and relationships without specifying how to achieve this state. Terraform figures out the steps required to reach the desired state automatically.

In contrast, procedural approaches like those used by Chef and Pulumi require you to write scripts that detail each step needed to configure your infrastructure. This can lead to large, complex codebases over time as history and timing become important considerations.

Example of a simple Terraform configuration:
```hcl
resource "aws_instance" "example" {
  ami           = "ami-0c55b159210eEXAMPLE"
  instance_type = "t2.micro"

  tags = {
    Name = "my-web-server"
  }
}
```

Example of a Chef recipe (procedural approach):
```ruby
# Cookbook:: myapp
# Recipe:: default

package 'httpd' do
  action :install
end

template '/var/www/html/index.html' do
  source 'index.html.erb'
  variables(
    title: node[:myapp][:title],
    content: node[:myapp][:content]
  )
  notifies :restart, 'service[httpd]', :immediately
end

service 'httpd' do
  action [:enable, :start]
end
```
x??

---


#### General-Purpose Language (GPL) vs. Domain-Specific Language (DSL)

Chef and Pulumi allow you to use general-purpose programming languages (GPLs) like Ruby or JavaScript respectively for managing infrastructure as code.

Terraform uses a domain-specific language (HCL), Puppet uses its own Puppet language, Ansible, CloudFormation, and OpenStack Heat also use YAML.

:p What are the advantages of using a GPL over a DSL in IaC tools?
??x
Using a general-purpose programming language (GPL) like JavaScript with Pulumi offers several advantages:

1. **Familiarity**: Developers who already know the GPL can start using it quickly without learning an entirely new language.
2. **Flexibility and Power**: GPLs support complex logic, control flow structures like loops and conditionals, integrations with other tools, and more advanced programming tasks.
3. **Rich Ecosystem and Tooling**: GPLs have larger communities and better tooling such as IDEs, libraries, testing frameworks, and mature workflows.

Example of using Pulumi with JavaScript:
```javascript
// Import the Pulumi SDK for AWS
import * as pulumi from "@pulumi/pulumi";
import * as aws from "@pulumi/aws";

const vpc = new aws.ec2.Vpc("vpc", {
    cidrBlock: "10.0.0.0/16",
});

const subnets = [];
for (let i = 0; i < 4; i++) {
    const subnet = new aws.ec2.Subnet(`subnet${i}`, {
        vpcId: vpc.id,
        cidrBlock: `10.0.${i}.0/24`,
    });
    subnets.push(subnet);
}
```
x??

---

