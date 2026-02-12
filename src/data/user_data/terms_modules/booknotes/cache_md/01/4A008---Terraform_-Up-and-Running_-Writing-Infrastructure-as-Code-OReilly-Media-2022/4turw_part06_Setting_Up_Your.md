# High-Quality Flashcards: 4A008---Terraform_-Up-and-Running_-Writing-Infrastructure-as-Code-OReilly-Media-2022_processed (Part 6)


**Starting Chapter:** Setting Up Your AWS Account

---


#### Terraform Basics
Background context: The text introduces Terraform as an easy-to-learn tool for deploying infrastructure across various cloud providers.

:p What is Terraform?
??x
Terraform is a tool that allows you to define and provision infrastructure using configuration files. It supports provisioning infrastructure on public cloud providers like AWS, Azure, Google Cloud, DigitalOcean, and private cloud/virtualization platforms such as OpenStack and VMware. The goal of the tool in this book is to help you deploy scalable, highly available web services.
x??

---


#### Deploying a Web Server
Background context: After deploying a single server, the next step is to deploy a web server that can handle HTTP requests.

:p How do you configure Terraform to deploy a web server?
??x
To deploy a web server using Terraform:
1. Create an `amazonec2_instance` resource in your configuration file.
2. Define the necessary properties like instance type, AMI, key pair, and security group rules.
3. Ensure that the security group allows HTTP traffic.

Example configuration snippet:
```hcl
resource "aws_instance" "web" {
  ami           = "ami-0c55b159cbfafe1f0"
  instance_type = "t2.micro"

  tags = {
    Name = "WebServer"
  }

  vpc_security_group_ids = [aws_security_group.web.id]

  user_data = <<-EOF
              #!/bin/bash
              sudo yum update -y
              sudo yum install httpd -y
              sudo systemctl start httpd
              sudo systemctl enable httpd
              EOF
}
```
x??

---


#### Cleaning Up Resources
Background context: The text suggests cleaning up resources after you are done with the examples to avoid unnecessary costs.

:p How do you clean up Terraform-managed infrastructure?
??x
To clean up resources deployed by Terraform:
1. Run `terraform destroy` to remove all resources created in your configuration.
2. Confirm the deletion process, ensuring that no errors occur during cleanup.

Example command:
```bash
# Destroy the infrastructure defined in your config file
terraform destroy
```
x??

---

---


#### Setting AWS Credentials as Environment Variables
Background context: This section explains how to securely store and set up AWS credentials using environment variables. The goal is to enable Terraform to make changes in your AWS account.

:p How do you set the AWS_ACCESS_KEY_ID and AWS_SECRET_ACCESS_KEY environment variables on a Unix/Linux/macOS terminal?
??x
To set the AWS_ACCESS_KEY_ID and AWS_SECRET_ACCESS_KEY environment variables on a Unix/Linux/macOS terminal, use the following commands:
```bash
$export AWS_ACCESS_KEY_ID=(your access key id)$ export AWS_SECRET_ACCESS_KEY=(your secret access key)
```

These commands export the required credentials as environment variables. Note that these environment variables are only available in the current shell session and need to be set again after a reboot or opening a new terminal window.
x??

---


#### Example of a Basic AWS Provider Configuration
Background context: This section provides an example of how to configure the AWS provider in your Terraform setup, specifying the region for infrastructure deployment.

:p What is the content of a basic `main.tf` file that configures the AWS provider?
??x
A basic `main.tf` file that configures the AWS provider and sets the region might look like this:

```hcl
provider "aws" {
  region = "us-east-2"
}
```

This configuration tells Terraform to use the AWS provider and deploy infrastructure in the us-east-2 region.
x??

---

---


---

#### AWS Regions and Availability Zones

AWS organizes its infrastructure into regions, which are geographically separate areas. Within each region, there are multiple isolated data centers called Availability Zones (AZs).

Each AZ is designed to be independent of others within the same region, meaning that an outage in one AZ should not affect another.

:p What is an AWS Region?
??x
An AWS Region is a geographic area where all the underlying hardware and services are hosted. For example, us-east-2 represents the Ohio region.
x??

---


#### Creating Resources with Terraform

Terraform allows you to define infrastructure as code using configuration files written in HCL (HashiCorp Configuration Language). The general syntax for creating resources is:

```hcl
resource "<PROVIDER>_<TYPE>" "<NAME>" {
  [CONFIG ...]
}
```

Where:
- PROVIDER: Specifies the provider, like `aws`.
- TYPE: Specifies the type of resource to create, such as `instance`.
- NAME: An identifier for this resource.
- CONFIG: Arguments specific to that resource.

:p What is the general syntax for creating resources in Terraform?
??x
The syntax involves specifying a provider and a resource type within the `resource` block. For example:
```hcl
resource "aws_instance" "example" {
  ami           = "ami-0fb653ca2d3203ac1"
  instance_type = "t2.micro"
}
```
x??

---


#### AMI ID Considerations

AWS AMIs (Amazon Machine Images) are specific to each region. The example provided uses an Ubuntu 20.04 image in the `us-east-2` region.

:p Why does the AMI ID need to be region-specific?
??x
The AMI ID is unique per AWS region because it identifies a particular operating system or software stack configured by Amazon for use with EC2 instances. For example, if you change the region parameter to `eu-west-1`, you would need to find and replace the AMI ID with the corresponding Ubuntu 20.04 image ID for that region.
x??

---


#### Using Terraform Documentation

Terraform provides extensive documentation for each provider and resource type.

:p Where should you look when writing Terraform code?
??x
You should refer to the official Terraform documentation to understand available resources, their configuration options, and usage examples. The documentation can be particularly useful for finding specific arguments or understanding complex configurations.
x??

---

---


#### Running Terraform Plan
After initializing the backend and providers, you can run `terraform plan` to see what changes will be made. This command simulates the execution of Terraform commands without actually making any changes to the infrastructure.

:p What does the `terraform plan` command do?
??x
The `terraform plan` command generates a detailed report showing what Terraform intends to do if you run `terraform apply`. It checks your configuration and provider plugins, then outputs a list of resources that will be created, modified, or destroyed. This allows you to review the proposed changes before applying them.

```sh
$terraform plan
```
Output:
```
Terraform will perform the following actions:

  # aws_instance.example will be created
  + resource "aws_instance" "example" {
      ...
  }
Plan: 1 to add, 0 to change, 0 to destroy.
```

x??

---


#### Terraform Apply Command
Once you are satisfied with the plan, you can execute `terraform apply` to make the proposed changes.

:p What does the `terraform apply` command do?
??x
The `terraform apply` command applies a previously generated execution plan to your infrastructure. It creates resources according to the configuration defined in your Terraform files and provider plugins. After running `terraform apply`, you will see detailed outputs indicating what actions are being taken.

```sh$ terraform apply
```
Output:
```
Terraform will perform the following actions:

  # aws_instance.example will be created
  + resource "aws_instance" "example" {
      ...
  }
Plan: 1 to add, 0 to change, 0 to destroy.
```

x??

---


#### Terraform Backend Initialization
The `terraform init` command also initializes a backend, which is a storage mechanism used by Terraform for storing state and workspaces.

:p What does the "Initializing the backend" message indicate?
??x
When you see the "Initializing the backend..." message during the execution of `terraform init`, it means that Terraform is setting up a backend to store information about your infrastructure's state. The backend can be configured to use different storage mechanisms, such as remote servers or local files.

:x?

---


#### Understanding Plan Output
The plan output shows what actions Terraform intends to take before applying them with `terraform apply`.

:p What does the output of `terraform plan` show?
??x
The output of `terraform plan` provides a summary of the resources that will be created, modified, or destroyed. It lists each resource and indicates whether it is being added, changed, or removed.

For example:
```
Terraform will perform the following actions:

  # aws_instance.example will be created
  + resource "aws_instance" "example" {
      ...
  }
Plan: 1 to add, 0 to change, 0 to destroy.
```

This output tells you that Terraform plans to create one EC2 instance and does not intend to modify or delete any existing resources.

x??

---


#### Idempotence of `terraform init`
`terraform init` can be run multiple times without causing issues because it is idempotent; running the command again will not alter your project unless there are changes in configuration files.

:p Why is `terraform init` idempotent?
??x
`terraform init` is designed to be idempotent, meaning that running it repeatedly does not change the state of your Terraform project beyond its initial setup. This property ensures that you can safely run `terraform init` multiple times without worrying about unexpected behavior.

```sh
$terraform init  # Initial setup$ terraform init  # No-op as everything is already initialized
```

This idempotence makes it safe to include `terraform init` in your deployment scripts or CI/CD pipelines, ensuring that the environment always starts from a clean state when necessary.

x??

---

---


#### EC2 Instance Deployment
Terraform allows you to deploy resources like EC2 instances in your AWS account by defining resource blocks in configuration files and running `terraform apply`.

:p How do you deploy an EC2 instance using Terraform?
??x
You define the resource block for the EC2 instance in your Terraform configuration file, then run `terraform apply`. This command will create or update the EC2 instance according to the defined configuration.
```hcl
resource "aws_instance" "example" {
  ami           = "ami-0fb653ca2d3203ac1"
  instance_type = "t2.micro"
}
```
x??

---


#### Tagging Resources with Terraform
Terraform supports tagging resources, which allows you to add metadata like names or descriptions. When deploying a resource and adding tags, Terraform can update the existing resource if it already exists.

:p How do you add a tag to an EC2 instance using Terraform?
??x
You can add a `tags` block within your resource definition for the EC2 instance to specify tags. Running `terraform apply` will then either create or update the instance with these new tags.
```hcl
resource "aws_instance" "example" {
  ami           = "ami-0fb653ca2d3203ac1"
  instance_type = "t2.micro"

  tags = {
    Name = "terraform-example"
  }
}
```
x??

---


#### Version Control with Git
Version control using Git is essential for managing changes to your Terraform configurations, allowing you to track history and collaborate with team members.

:p How do you set up a local Git repository for your Terraform configuration?
??x
To set up a local Git repository for your Terraform configuration, initialize a new Git repository, add your Terraform configuration files, and commit the changes. You also need to create and commit a `.gitignore` file to exclude unnecessary files from version control.
```sh
$git init $ git add main.tf .terraform.lock.hcl$git commit -m "Initial commit"
```
Create a `.gitignore` file with:
```plaintext
.terraform
*.tfstate
*.tfstate.backup
```
Then commit the `.gitignore` file.
```sh $git add .gitignore$ git commit -m "Add a .gitignore file"
```
x??

---

---


#### Terraform Dependency Graph
Terraform parses dependencies, builds a dependency graph from them, and uses that to automatically determine the order of resource creation. The `terraform graph` command can visualize these relationships.

:p What does Terraform use to manage the creation order of resources?
??x
Terraform manages the creation order by parsing dependencies and building a dependency graph. This graph helps in determining which resources need to be created first based on their interdependencies. For instance, an EC2 Instance might reference a Security Group ID, so Terraform will create the security group before the EC2 Instance.

```$ terraform graph
digraph {
compound = "true"
newrank = "true"
subgraph "root" { 
  "[root] aws_instance.example" [label = "aws_instance.example", shape = "box"] 
  "[root] aws_security_group.instance" [label = "aws_security_group.instance", shape = "box"] 
  "[root] provider.aws" [label = "provider.aws", shape = "diamond"] 
  "[root] aws_instance.example" -> "[root] aws_security_group.instance"
  "[root] aws_security_group.instance" -> "[root] provider.aws"
  "[root] meta.count-boundary (EachMode fixup)" -> "[root] aws_instance.example"
  "[root] provider.aws (close)" -> "[root] aws_instance.example"
  "[root] root" -> "[root] meta.count-boundary (EachMode fixup)"
  "[root] root" -> "[root] provider.aws (close)"
}
```
x??

---


#### Parallel Resource Creation
Terraform creates resources in parallel as much as possible, making the process efficient. This is a feature of declarative languages where you specify what you want, and Terraform figures out the best way to create it.

:p How does Terraform handle resource creation efficiency?
??x
Terraform increases efficiency by creating multiple resources in parallel. It analyzes the dependency graph to determine which resources can be created concurrently without violating dependencies. This approach minimizes the overall time required to apply changes.

For example, when deploying a web server, Terraform might create an EC2 Instance and its associated Security Group in parallel if they do not depend on each other's specific attributes during initial creation.

```plaintext
Terraform will perform the following actions:
  # aws_instance.example must be replaced -/+ resource "aws_instance" "example" {
    ami                          = "ami-0fb653ca2d3203ac1"
    availability_zone            = "us-east-2c" -> (known after apply)
    instance_state               = "running" -> (known after apply)
    instance_type                = "t2.micro"
  }
  # aws_security_group.instance will be created
```
x??

---


#### Dependency Graph Visualization
Terraform's `graph` command can generate a DOT file, which can be visualized using tools like Graphviz or GraphvizOnline.

:p How does Terraform visualize dependencies between resources?
??x
Terraform uses the `terraform graph` command to generate a DOT file that represents the dependency relationships between resources. This DOT file can then be rendered into a human-readable graph diagram, helping you understand the sequence in which Terraform will create or modify resources.

For example:
```
$ terraform graph
digraph {
compound = "true"
newrank = "true"
subgraph "root" { 
  "[root] aws_instance.example" [label = "aws_instance.example", shape = "box"] 
  "[root] aws_security_group.instance" [label = "aws_security_group.instance", shape = "box"] 
  ...
}
```
This output can be transformed into an image using tools like Graphviz or online services such as GraphvizOnline.

```plaintext
The output is in a graph description language called DOT, which you can turn into an image by using a desktop app such as Graphviz or web app like GraphvizOnline.
```
x??

---


#### Apply Command and Resource Changes
Running the `terraform apply` command shows what changes Terraform intends to make. It highlights resources that need replacement due to updates in configuration.

:p What happens when you run `terraform apply`?
??x
When you run `terraform apply`, it provides a plan of actions it intends to take, highlighting any resources that require creation or replacement based on the current state and desired state defined by your Terraform configuration. For instance:

```
Terraform will perform the following actions:
  # aws_instance.example must be replaced -/+ resource "aws_instance" "example" {
    ami                          = "ami-0fb653ca2d3203ac1"
    availability_zone            = "us-east-2c" -> (known after apply)
    instance_state               = "running" -> (known after apply)
    ...
  }
  # aws_security_group.instance will be created
```
This output indicates that the EC2 Instance needs to be replaced, while a new Security Group is needed.

```plaintext
Plan: 2 to add, 0 to change, 1 to destroy.
```
x??

---

