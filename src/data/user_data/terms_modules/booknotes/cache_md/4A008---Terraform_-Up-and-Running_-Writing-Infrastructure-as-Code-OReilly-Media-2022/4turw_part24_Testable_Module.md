# High-Quality Flashcards: 4A008---Terraform_-Up-and-Running_-Writing-Infrastructure-as-Code-OReilly-Media-2022_processed (Part 24)


**Starting Chapter:** Testable Modules

---


#### Testable Modules
Background context: The provided text discusses creating a test harness for infrastructure modules using Terraform. This involves writing example configurations that use your modules to ensure they function as expected before deploying them in production.

:p How can you create and run an example configuration to test your infrastructure modules?
??x
You can create an `examples` folder with sample `main.tf` files that utilize the modules you have written. For instance, the provided code shows how to use the `asg-rolling-deploy` module to deploy a small Auto Scaling Group (ASG) in a specific region and with certain parameters.

To test this configuration:
1. Run `terraform init` to initialize the backend and provider.
2. Run `terraform apply` to create the resources defined in your `main.tf`.

Here's an example of such a configuration for testing:

```hcl
provider "aws" {
  region = "us-east-2"
}

module "asg" {
  source     = "../../modules/cluster/asg-rolling-deploy"
  cluster_name   = var.cluster_name
  ami           = data.aws_ami.ubuntu.id
  instance_type = "t2.micro"
  min_size      = 1
  max_size      = 1
  enable_autoscaling = false
  subnet_ids    = data.aws_subnets.default.ids
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

data "aws_ami" "ubuntu" {
  most_recent = true
  owners      = ["099720109477"] # Canonical
  filter {
    name    = "name"
    values  = ["ubuntu/images/hvm-ssd/ubuntu-focal-20.04-amd64-server-*"]
  }
}
```

This configuration sets up a minimal ASG with one instance in the default VPC of `us-east-2`. Run these commands to test this setup:

```sh
terraform init
terraform apply
```

If everything works as expected, you can proceed to deploy this in production.

x??

---


#### Manual Test Harness
Background context: The text explains how creating an example configuration within the `examples` folder serves as a manual test harness. This means that developers can repeatedly run `terraform apply` and `terraform destroy` commands to check if their modules behave as expected during development.

:p How does using the `examples` folder serve as a manual test harness?
??x
The `examples` folder provides a practical way for developers to manually verify that their infrastructure modules work correctly. By writing small, specific configurations in `main.tf` files within this directory, you can deploy and destroy resources on demand.

For example, if you have an `asg-rolling-deploy` module, you could create an `examples/asg/main.tf` file like the one shown earlier:

```hcl
provider "aws" {
  region = "us-east-2"
}

module "asg" {
  source     = "../../modules/cluster/asg-rolling-deploy"
  cluster_name   = var.cluster_name
  ami           = data.aws_ami.ubuntu.id
  instance_type = "t2.micro"
  min_size      = 1
  max_size      = 1
  enable_autoscaling = false
  subnet_ids    = data.aws_subnets.default.ids
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

data "aws_ami" "ubuntu" {
  most_recent = true
  owners      = ["099720109477"] # Canonical
  filter {
    name    = "name"
    values  = ["ubuntu/images/hvm-ssd/ubuntu-focal-20.04-amd64-server-*"]
  }
}
```

You can then manually run:

```sh
terraform init
terraform apply
terraform destroy
```

This process allows you to quickly iterate and debug your modules without needing a full CI/CD pipeline.

x??

---


#### Automated Test Harness
Background context: The text mentions that the `examples` folder can also be used for automated testing. As described in Chapter 9, these example configurations are how tests are created for your modules, ensuring they behave as expected even when the code changes.

:p How do you use the `examples` folder to create an automated test harness?
??x
The `examples` folder not only serves as a manual test harness but can also be used to write automated tests. By committing example configurations and their corresponding tests into version control, you ensure that your modules' behavior remains consistent over time.

To set up automated testing:
1. Write tests in the `test` folder.
2. Use these test files alongside the examples in the `examples` directory.
3. Run these tests as part of a CI/CD pipeline to automatically validate module changes.

For instance, you might create a test file named `asg_test.tf` in the `test` directory:

```hcl
provider "aws" {
  region = "us-east-2"
}

module "asg" {
  source     = "../../modules/cluster/asg-rolling-deploy"
  cluster_name   = var.cluster_name
  ami           = data.aws_ami.ubuntu.id
  instance_type = "t2.micro"
  min_size      = 1
  max_size      = 1
  enable_autoscaling = false
  subnet_ids    = data.aws_subnets.default.ids
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

data "aws_ami" "ubuntu" {
  most_recent = true
  owners      = ["099720109477"] # Canonical
  filter {
    name    = "name"
    values  = ["ubuntu/images/hvm-ssd/ubuntu-focal-20.04-amd64-server-*"]
  }
}
```

Then, you can use Terraform's `test` command to run these tests as part of your CI/CD pipeline.

x??

---


#### Executable Documentation
Background context: The text highlights the value of including example configurations and a README in version control. This approach allows team members to understand how modules work and test them without writing additional code, making it both an educational tool and a way to ensure documentation remains accurate.

:p How does having examples and a README improve your module's maintainability?
??x
Having examples and a README in version control significantly enhances the maintainability of your infrastructure modules. These files provide executable documentation that can be used by developers to understand and test how the modules work, ensuring that they are correctly implemented and functioning as intended.

For instance, you might include a `README.md` file with instructions on how to use and test the module:

```markdown
# asg-rolling-deploy Module Example

## Usage

1. Ensure Terraform is initialized:
   ```sh
   terraform init
   ```

2. Apply the example configuration:
   ```sh
   terraform apply
   ```

3. Destroy the resources when done:
   ```sh
   terraform destroy
   ```

## Example `main.tf` Configuration

```hcl
provider "aws" {
  region = "us-east-2"
}

module "asg" {
  source     = "../../modules/cluster/asg-rolling-deploy"
  cluster_name   = var.cluster_name
  ami           = data.aws_ami.ubuntu.id
  instance_type = "t2.micro"
  min_size      = 1
  max_size      = 1
  enable_autoscaling = false
  subnet_ids    = data.aws_subnets.default.ids
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

data "aws_ami" "ubuntu" {
  most_recent = true
  owners      = ["099720109477"] # Canonical
  filter {
    name    = "name"
    values  = ["ubuntu/images/hvm-ssd/ubuntu-focal-20.04-amd64-server-*"]
  }
}
```

By committing these files into version control, you ensure that other team members can easily understand and test the modules.

x??

---

---


#### Test-Driven Development (TDD) in Terraform Module Development
Writing tests and examples first can lead to a better understanding of the module's API and usage patterns. This approach is known as Test-Driven Development (TDD).

:p Why should you write test code before writing module code?
??x
Writing test code first helps in designing an intuitive and user-friendly API for the module. It allows developers to think through ideal use cases and APIs while ensuring that tests are written early, making it easier to validate behavior.

```terraform
# Example of a validation block
variable "instance_type" {
  description = "The type of EC2 Instances to run (e.g. t2.micro)"
  type        = string
  validation {
    condition      = contains(["t2.micro", "t3.micro"], var.instance_type)
    error_message  = "Only free tier is allowed: t2.micro | t3.micro."
  }
}
```

x??

---


#### Validations in Terraform
Starting from Terraform 0.13, you can add validation blocks to input variables to perform checks beyond basic type constraints.

:p How does the `validation` block work in Terraform?
??x
The `validation` block allows for more complex checks than simple type constraints. The `condition` parameter should evaluate to true if the value is valid and false otherwise. If the condition fails, an error message can be provided.

```terraform
# Example of a validation block
variable "instance_type" {
  description = "The type of EC2 Instances to run (e.g. t2.micro)"
  type        = string
  validation {
    condition      = contains(["t2.micro", "t3.micro"], var.instance_type)
    error_message  = "Only free tier is allowed: t2.micro | t3.micro."
  }
}
```

x??

---

---


#### Precondition Block for Validating Instance Types
Background context: A precondition block can be used to ensure that certain conditions are met before Terraform applies a resource. In this example, we're validating whether an instance type is eligible for the AWS Free Tier.

:p What does the `precondition` block do in this scenario?
??x
The `precondition` block checks if the specified instance type is eligible for the AWS Free Tier before applying the resources. If the condition evaluates to false, Terraform will throw an error with a custom message.

Example:
```terraform
resource "aws_launch_configuration" "example" {
  # Other properties...
  
  lifecycle {
    create_before_destroy = true
    precondition {
      condition      = data.aws_ec2_instance_type.instance.free_tier_eligible
      error_message   = "${var.instance_type} is not part of the AWS Free Tier."
    }
  }
}
```
If `var.instance_type` does not belong to the AWS Free Tier, Terraform will raise an error:
```plaintext
Error: Resource precondition failed

data.aws_ec2_instance_type.instance.free_tier_eligible is false
${var.instance_type} is not part of the AWS Free Tier.
```
x??

---

---


---
#### Postcondition Blocks for Error Checking
Postcondition blocks are used to ensure certain conditions hold true after a resource is applied. This is particularly useful in ensuring that resources are deployed correctly and meet specific requirements post-deployment.

For example, consider an `aws_autoscaling_group` resource where you want to ensure the Auto Scaling Group spans multiple availability zones (AZs) for high availability:
```hcl
resource "aws_autoscaling_group" "example" {
  name                 = var.cluster_name
  launch_configuration = aws_launch_configuration.example.name
  vpc_zone_identifier  = var.subnet_ids

  lifecycle {
    postcondition {
      condition      = length(self.availability_zones) > 1
      error_message  = "You must use more than one AZ for high availability."
    }
  }

  # Additional configuration...
}
```

:p What is the purpose of using a `postcondition` block in an AWS Auto Scaling Group resource?
??x
The purpose of using a `postcondition` block is to ensure that after the Auto Scaling Group is deployed, it spans more than one availability zone. This guarantees high availability by ensuring that even if one AZ fails, other instances can still be utilized.

This check ensures that Terraform will show an error during `apply` if the deployment does not meet this requirement.
```hcl
lifecycle {
    postcondition {
        condition      = length(self.availability_zones) > 1
        error_message  = "You must use more than one AZ for high availability."
    }
}
```
x??

---


#### Validations for Input Sanitization
Validation blocks are used to sanitize inputs, preventing users from passing invalid variables into the module. This is crucial for catching basic input errors early in the process.

:p How do validation blocks help prevent issues with Terraform modules?
??x
Validation blocks help by ensuring that any variable passed into a Terraform module meets certain criteria before changes are applied. By using validation blocks, you can catch and prevent invalid inputs, thus avoiding deployment failures due to basic configuration errors.

For example:
```hcl
variable "subnet_ids" {
  description = "List of subnet IDs"
  type        = list(string)
  validation {
    condition     = length(element(var.subnet_ids, 0)) > 2
    error_message = "Each subnet ID must be a non-empty string."
  }
}
```
x??

---


#### Precondition Blocks for Assumption Checks
Precondition blocks are used to verify assumptions about the state of resources and variables before any changes are made. They help in catching issues early that could otherwise lead to deployment failures.

:p How do precondition blocks work?
??x
Precondition blocks allow you to check various conditions, such as dependencies between variables or data sources, before Terraform applies any changes. This helps ensure that the state of your resources and configurations is correct prior to making changes.

For example:
```hcl
precondition {
  condition      = length(var.subnet_ids) > 0 && var.region == "us-east-1"
  error_message  = "You need at least one subnet ID in us-east-1 region."
}
```
x??

---


#### Postconditions for Enforcing Basic Guarantees
Postcondition blocks are used to ensure that the module behaves as expected after deployment. They provide confidence that the module either performs its intended function or exits with an error if it doesn't.

:p What is the purpose of using postcondition blocks in Terraform modules?
??x
The purpose of using postcondition blocks is to enforce basic guarantees about how your module behaves after changes have been deployed. This gives users and maintainers confidence that the module will either perform its intended function or exit with an error if it doesn't.

For example, ensuring that a web service can respond to HTTP requests:
```hcl
lifecycle {
  postcondition {
    condition      = true # Logic to check if service is responding
    error_message  = "Web service did not start correctly."
  }
}
```
x??

---

---


---
#### Versioning of Terraform Core
Background context: When working on production-grade Terraform code, it is essential to ensure that deployments are predictable and repeatable. One way to achieve this is by version pinning your dependencies, starting with the Terraform core version.

:p How do you ensure the correct version of Terraform core is used in your modules?
??x
To ensure the correct version of Terraform core is used, you can use the `required_version` argument in your Terraform configuration. This allows you to specify a specific major or minor version of Terraform that your code depends on.

```terraform
terraform {
  # Require any 1.x version of Terraform
  required_version = ">= 1.0.0, < 2.0.0"
}
```

This will allow you to use only versions from the `1.x` series, such as `1.0.0` or `1.2.3`. If you try to run a Terraform version outside this range (e.g., `0.14.3` or `2.0.0`), you will receive an error.

For production-grade code, it is recommended to pin not only the major version but also the minor and patch versions:

```terraform
terraform {
  # Require Terraform at exactly version 1.2.3
  required_version = "1.2.3"
}
```

This ensures that you are using a specific version of Terraform, avoiding accidental upgrades to potentially incompatible versions.
x??

---


#### Versioning of Providers
Background context: In addition to pinning the core version of Terraform, it is also important to manage the versions of providers used in your modules. Providers define how resources from different services (like AWS or GCP) are managed.

:p How do you specify the version of a provider in your Terraform configuration?
??x
To specify the version of a provider in your Terraform configuration, you include it within the `provider` block. For example, if you are using the AWS provider, you would define its version as follows:

```terraform
provider "aws" {
  # Specify the version of the provider
  version = "=2.64.0"
}
```

Here, `version = "=2.64.0"` ensures that only the exact version `2.64.0` is used. If you want to use a broader range, you can specify it like this:

```terraform
provider "aws" {
  # Specify a range of provider versions
  version = "[2.58.0,2.70.0)"
}
```

This means the AWS provider version must be at least `2.58.0` but less than `2.70.0`.

Versioning providers is crucial to maintain compatibility and avoid breaking changes in future releases.
x??

---


#### Versioning of Modules
Background context: Module versioning ensures that your code remains consistent across deployments by specifying the exact versions of modules you depend on. This helps prevent accidental upgrades to incompatible module versions.

:p How do you specify the version of a module in Terraform?
??x
To specify the version of a module, you include it within the `module` block. For example:

```terraform
module "example_module" {
  # Specify the exact version of the module
  source = "git://github.com/your_org/your_module"
  version = "1.2.0"
}
```

Here, `version = "1.2.0"` ensures that only the specific version `1.2.0` is used for the module named `example_module`.

You can also use a range of versions if needed:

```terraform
module "example_module" {
  # Specify a range of module versions
  source = "git://github.com/your_org/your_module"
  version = "[1.1.0,1.3.0)"
}
```

This means the `example_module` must be at least `1.1.0` but less than `1.3.0`.

Versioning modules is essential to maintain consistency and avoid unintended changes.
x??

---

---


#### Pinning Terraform Versions
Background context: When using different versions of Terraform, it can lead to issues when mixing environments. To avoid these problems and test new features or bug fixes, pinning specific versions is recommended.
:p How do you ensure consistent use of a specific version of Terraform across an environment?
??x
To ensure consistency, you can use the `tfenv` tool to manage different versions of Terraform. This involves installing a specific version using the command `tfenv install <version>`, and then setting up your project to use that version.
```sh
$ tfenv install 1.2.3
```
Once installed, you can set the default version for your environment by running:
```sh
$ tfenv use 1.2.3
```
You can also specify versions in `.terraform-version` files within project directories to automatically use a specific version in that directory and its subdirectories.
x??

---


#### Pinning Provider Versions
Background context: In addition to managing Terraform versions, it is crucial to pin provider versions to avoid breaking changes or unexpected behavior when upgrading providers. The `required_providers` block within the Terraform configuration allows you to specify which version of a provider should be used.
:p How do you pin the AWS provider version in your Terraform configuration?
??x
To pin the AWS provider version in your Terraform configuration, use the `required_providers` block as shown below. This example pins the AWS provider to any 4.x version.

```hcl
terraform {
   required_version = ">= 1.0.0, < 2.0.0"
   required_providers {
     aws = {
       source = "hashicorp/aws"
       version = "~> 4.0"
     }
   }
}
```
The `version = "~> 4.0"` syntax ensures that the AWS provider will use any minor updates within the 4.x series but won't upgrade to a major update (5.0 or later).
x??

---


---

#### Pinning Provider Versions to a Specific Major Version Number
Background context explaining that pinning to a specific major version number is recommended to avoid accidentally pulling in backward-incompatible changes. With Terraform 0.14.0 and above, minor or patch versions are automatically handled due to the lock file.
:p What should be done if you want to avoid accidental backward-incompatible changes with providers?
??x
You should pin to a specific major version number of the provider in your `required_providers` block. For example:
```hcl
required_providers {
  myprovider = {
    source  = "hashicorp/myprovider"
    version = "~> 2.0"  # Pinning to any version >= 2.0 and < 3.0
  }
}
```
This ensures that only changes compatible with the major version are pulled in, avoiding potential issues.
x??

---


#### Upgrading Provider Versions Explicitly
Background context explaining how the lock file ensures consistency but does not need minor and patch pinning from version 0.14.0 onwards due to automatic behavior. Explicit upgrades can be done by modifying the `required_providers` block and running `terraform init -upgrade`.
:p How do you explicitly upgrade a provider version in Terraform?
??x
You update the version constraint in the `required_providers` block, for example:
```hcl
required_providers {
  myprovider = {
    source  = "hashicorp/myprovider"
    version = "~> 2.1"  # Pinning to any version >= 2.1 and < 3.0
  }
}
```
Then run `terraform init -upgrade` to download new versions of the providers that match your updated constraints.
The `.terraform.lock.hcl` file will be updated with these changes, which should then be reviewed and committed to version control.
x??

---


#### Security Measures via Checksums
Background context explaining how Terraform records checksums for downloaded providers to ensure integrity. It also mentions validating signatures if the provider is cryptographically signed.
:p How does Terraform ensure that the provider code hasn't been tampered with?
??x
Terraform records the checksum of each provider it downloads and checks these against the recorded values during subsequent `terraform init` runs. This ensures that any changes to the provider binaries are detected, preventing malicious code from being substituted.
If the provider is cryptographically signed (most official HashiCorp providers are), Terraform also validates the signature as an additional security check.
x??

---


#### Lock Files Across Multiple Operating Systems
Background context explaining that by default, Terraform only records checksums for the platform on which `terraform init` was run. If this file is shared across multiple OSes, a command like `terraform providers lock -platform=...` needs to be run to record checksums from all relevant platforms.
:p How do you ensure that the `.terraform.lock.hcl` file works across different operating systems?
??x
You need to run `terraform providers lock` with the `-platform` option for each OS on which the code will run. For example:
```sh
terraform providers lock \
  -platform=windows_amd64 \ 
  # 64-bit Windows  
  -platform=darwin_amd64 \  # 64-bit macOS  
  -platform=darwin_arm64 \  # 64-bit macOS (ARM)  
  -platform=linux_amd64     # 64-bit Linux
```
This command records the checksums for each platform, ensuring that `terraform init` on any of these systems will download the correct versions.
x??

---


#### Pinning Module Versions Using Git Tags
Background context explaining why it's important to pin module versions using source URLs with a specific ref parameter. This ensures consistency across different environments when initializing modules.
:p How do you pin a module version in Terraform?
??x
You should use the `source` URL along with the `ref` parameter set to a Git tag or branch, like:
```hcl
module "hello_world" {
  source  = "git@github.com:foo/modules.git//services/hello-world-app?ref=v0.0.5"
}
```
This ensures that every time you run `terraform init`, the exact same version of the module is downloaded and used, maintaining consistency.
x??

---

---


#### Outputting Deployment Information
Explanation of how to output deployment information such as the ALB DNS name for monitoring or testing purposes.

:p How do you configure an output in Terraform to display the ALB DNS name?
??x
To configure an output that displays the ALB DNS name, add the following block to your `outputs.tf` file:

```hcl
output "alb_dns_name"  {
   value       = module.hello_world_app.alb_dns_name
   description = "The domain name of the load balancer"
}
```

After running `terraform apply`, you will see the ALB DNS name outputted as part of the deployment:

```sh
Outputs:
alb_dns_name = "hello-world-stage-477699288.us-east-2.elb.amazonaws.com"
```
x??

---


#### Publishing Modules to Terraform Registry
Explanation on how to publish a module to the Public Terraform Registry and the requirements.

:p What are the steps for publishing a module to the Public Terraform Registry?
??x
To publish a module to the Public Terraform Registry, follow these steps:

1. Ensure your module is hosted in a public GitHub repository.
2. Name your repository `terraform-provider-name` where `provider` is the target provider (e.g., `aws`) and `name` is the name of the module (e.g., `rds`).
3. Structure your module directory as follows:
   - `main.tf`
   - `variables.tf`
   - `outputs.tf`
4. Use semantic versioning with Git tags for releases.
5. Log in to the Terraform Registry using your GitHub account and use the web UI to publish.

Once published, you can share it with your team via the web UI or through the registry.
x??

---

---


#### Using Terraform Modules from the Registry

Background context: Terraform allows you to use modules from the Terraform Registry, a central repository for reusable infrastructure components. This approach simplifies dependency management and promotes code reuse by leveraging pre-built, tested modules.

:p How do you consume an open-source module from the Terraform Registry in your Terraform configuration?
??x
You can specify a module using a shorter URL in the `source` argument along with its version via the `version` argument. The general syntax is:

```hcl
module "<NAME>"  {
   source   = "<OWNER>/<REPO>/<PROVIDER>"
   version  = "<VERSION>"
   #(...)
}
```

Here, replace `<NAME>` with a unique identifier for your module in Terraform code, and provide the appropriate values for `source` (owner/repo/provider) and `version`.

For example, to use an RDS module from the Terraform AWS modules registry:

```hcl
module "rds"  {
   source   = "terraform-aws-modules/rds/aws"
   version  = "4.4.0"
   #(...)
}
```

x??

---


#### Private Terraform Registry

Background context: In addition to public modules in the Terraform Registry, you can also use a private registry hosted within your Git repositories for security and control reasons. This allows you to share custom-built or modified modules among team members while keeping them isolated from external dependencies.

:p How can you utilize a private Terraform Registry?
??x
To use a private Terraform Registry, you need to host it on your private Git server (e.g., GitHub Enterprise, Bitbucket Server) and configure it properly. You then reference the hosted modules in the same way as public ones but point to your internal repository URL.

Example of using a private module:

```hcl
module "example"  {
   source = "<git-repo-url>/<path-to-module>"
   version = "0.12.3"
}
```

Where `<git-repo-url>` is the URL of your Git server and `<path-to-module>` points to the specific directory containing the Terraform module.

x??

---


#### Beyond Terraform Modules

Background context: While Terraform is a powerful tool for infrastructure as code, building comprehensive production-grade environments often requires integration with other DevOps tools like Docker, Packer, Chef, Puppet, or Bash scripts. These tools can be used to create custom AMIs, automate the configuration of EC2 instances, and perform other tasks that complement what Terraform can do.

:p How can you integrate non-Terraform code within a Terraform module?
??x
You can use provisioners in Terraform to execute scripts directly from your Terraform configuration. Provisioners allow you to run commands on either the local machine or remote resources, enabling integration with other DevOps tools and workarounds for limitations in Terraform.

Example using `local-exec` provisioner:

```hcl
resource "aws_instance" "example"  {
   ami           = data.aws_ami.ubuntu.id
   instance_type = "t2.micro"
   provisioner "local-exec"  {
      command = "echo \"Hello, World from $(uname -smp)\""
   }
}
```

This example demonstrates running a simple script on the local machine during `terraform apply`.

x??

---


#### Using Provisioners in Terraform

Background context: Provisioners are a key feature of Terraform that allow you to run scripts or commands at various stages of your infrastructure deployment. They can be used for bootstrapping, configuration management, and cleanup tasks.

:p What are the types of provisioners available in Terraform?
??x
Terraform provides several types of provisioners:

- `local-exec`: Executes a script on the local machine.
- `remote-exec`: Executes a script on remote resources (e.g., EC2 instances).
- `file`: Copies files to a remote resource.

Example using `local-exec` provisioner for bootstrapping an instance:

```hcl
resource "aws_instance" "example"  {
   ami           = data.aws_ami.ubuntu.id
   instance_type = "t2.micro"
   provisioner "local-exec"  {
      command = "echo \"Hello, World from $(uname -smp)\""
   }
}
```

x??

---


#### Remote-Exec Provisioner

Background context: The `remote-exec` provisioner is particularly useful for executing scripts on remote resources. It can be configured to run commands on specific instances after they are created by Terraform.

:p How do you use the `remote-exec` provisioner?
??x
To use the `remote-exec` provisioner, you need to specify it within a resource block and configure it with necessary parameters like `connection`, `user`, `private_key`, etc. Here's an example of using `remote-exec` on an AWS EC2 instance:

```hcl
resource "aws_instance" "example"  {
   ami           = data.aws_ami.ubuntu.id
   instance_type = "t2.micro"
   provisioner "remote-exec"  {
      connection  {
         type        = "ssh"
         user        = "ec2-user"
         private_key = file("~/.ssh/id_rsa")
         host        = self.public_ip
      }
      inline  = [
         "echo 'Configuring the instance...'",
         "apt-get update && apt-get install -y nginx",
         "service nginx start"
      ]
   }
}
```

In this example, a script is executed on the EC2 instance after it's launched to configure Nginx.

x??

---

---


#### Associating Public Key with EC2 Instance
Background context: After generating an SSH private and public key pair, the next step is to associate the public key with the EC2 instance so that you can SSH into it. This is done using the `aws_key_pair` resource.

:p How do you upload a public key to AWS using Terraform?
??x
To upload a public key to AWS in Terraform, use the `aws_key_pair` resource and provide its public key value.

```hcl
resource "aws_key_pair" "generated_key" {
  public_key = tls_private_key.example.public_key_openssh
}
```
This step ensures that the public key is associated with the EC2 instance, allowing you to SSH into it using the corresponding private key.
x??

---


#### Deploying an EC2 Instance with SSH Key
Background context: The final step is deploying an EC2 instance and associating it with the security group and the generated SSH key pair. This ensures that the instance can be accessed via SSH.

:p How do you deploy an EC2 instance using Terraform?
??x
To deploy an EC2 instance, use the `aws_instance` resource. You need to specify the AMI ID, instance type, VPC security group IDs, and the key name.

```hcl
resource "aws_instance" "example" {
  ami                    = data.aws_ami.ubuntu.id
  instance_type           = "t2.micro"
  vpc_security_group_ids  = [aws_security_group.instance.id]
  key_name                = aws_key_pair.generated_key.key_name
}
```
This configuration ensures that the EC2 instance is launched with the specified AMI, security group, and SSH key pair.
x??

---

---


#### Creation-Time Provisioners vs. Destroy-Time Provisioners
Background context: Provisioners in Terraform can be configured to run either during the creation or destruction of resources, providing flexibility for different use cases such as initial setup or cleanup tasks.
:p What are the differences between creation-time and destroy-time provisioners?
??x
Creation-time provisioners execute during `terraform apply` and only on the first execution. They are typically used for setting up a resource, like installing dependencies or configuring settings.

Destroy-time provisioners run after `terraform destroy`, just before the resource is deleted. They can be useful for cleanup tasks such as removing temporary files or ensuring resources are properly shut down.

Example configuration for both types:
```hcl
# Creation-Time Provisioner
resource "aws_instance" "example" {
  # ... previous configuration ...
  
  provisioner "remote-exec" {
    when = "create"
    inline = [
      "echo \"Setting up the instance\"",
    ]
  }
}

# Destroy-Time Provisioner
resource "aws_instance" "example" {
  # ... previous configuration ...
  
  provisioner "remote-exec" {
    when = "destroy"
    inline = [
      "echo \"Cleaning up the instance\"",
    ]
  }
}
```
x??

---


#### null_resource for Independent Provisioning
Background context: Sometimes, you might need to run scripts as part of the Terraform lifecycle but not tied directly to a specific resource. The `null_resource` can be used for this purpose.

:p How do you define a `null_resource` in Terraform to execute local scripts?
??x
You define a `null_resource` with provisioners, which allows running scripts without being attached to any "real" resource. Here’s an example:

```hcl
resource "null_resource" "example" {
  provisioner "local-exec" {
    command = "echo 'Hello, World from $(uname -smp)'"
  }
}
```

This `null_resource` will execute the local script every time Terraform is applied.

x??

---


#### Triggers with null_resource
Background context: The `triggers` argument in a `null_resource` can be used to force re-creation of the resource whenever its value changes. This can be useful for executing scripts at specific times or intervals.

:p How do you use the `uuid()` function within `triggers` to execute a local script every time `terraform apply` is run?
??x
You can use the `uuid()` function in the `triggers` argument of a `null_resource` to force re-creation and thus re-execution of provisioners each time Terraform is applied.

```hcl
resource "null_resource" "example" {
  triggers = { uuid = uuid() }

  provisioner "local-exec" {
    command = "echo 'Hello, World from $(uname -smp)'"
  }
}
```

Every `terraform apply` will re-run the local script because the UUID changes each time.

x??

---


#### External Data Source for Fetching Dynamic Data
Background context: The `external` data source in Terraform allows fetching dynamic data and making it available within your code. It works by executing an external command that reads input via JSON on stdin and writes output to stdout, which is then accessible in the Terraform configuration.

:p How do you use the `external` data source to execute a Bash script and retrieve its results?
??x
You can use the `external` data source to fetch dynamic data by executing an external command. Here’s an example:

```hcl
data "external" "echo" {
  program = ["bash", "-c", "cat /dev/stdin"]
  query   = { foo = "bar" }
}

output "echo" {
  value = data.external.echo.result
}

output "echo_foo" {
  value = data.external.echo.result.foo
}
```

This will execute a Bash script that reads `foo=bar` via stdin and echoes it back to stdout. The result is then accessible in the Terraform outputs.

x??

---

---

