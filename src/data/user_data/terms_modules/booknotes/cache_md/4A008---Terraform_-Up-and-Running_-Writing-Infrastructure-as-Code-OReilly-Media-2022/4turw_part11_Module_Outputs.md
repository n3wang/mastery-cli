# High-Quality Flashcards: 4A008---Terraform_-Up-and-Running_-Writing-Infrastructure-as-Code-OReilly-Media-2022_processed (Part 11)


**Starting Chapter:** Module Outputs

---


#### Using Local Values for Ease of Maintenance
Local values can be used to make Terraform configurations more readable and maintainable. By defining variables like `local.any_port`, `local.any_protocol`, and `local.all_ips` in your configuration, you avoid hardcoding these values directly into the resource blocks.
:p How do local values improve Terraform configurations?
??x
Local values help by allowing you to reuse common settings across multiple resources without repeating them. This makes your code easier to read and maintain. For example:
```hcl
locals {
  any_port = 80
  any_protocol = "tcp"
  all_ips = "0.0.0.0/0"
}
```
You can then reference these locals in resource blocks like this:
```hcl
resource "aws_security_group_rule" "example" {
    from_port      = local.any_port
    to_port        = local.any_port
    protocol       = local.any_protocol
    cidr_blocks    = [local.all_ips]
}
```
x??

---


#### Defining Auto Scaling Schedules Directly in Production
Auto scaling schedules can be used to adjust the number of servers based on traffic patterns. In this example, you define two scheduled actions: one for scaling out during business hours and another for scaling in at night.
:p What are the benefits of defining auto scaling schedules directly in production configurations?
??x
Defining auto scaling schedules directly in production allows for immediate control over server scalability without needing to manage these actions through separate modules. This can be useful when you want more granular control or when conditional definitions (like moving scheduled actions into a module) are not yet required.
```hcl
resource "aws_autoscaling_schedule" "scale_out_during_business_hours" {
    scheduled_action_name = "scale-out-during-business-hours"
    min_size               = 2
    max_size               = 10
    desired_capacity       = 10
    recurrence             = "0 9 * * *" # This means "9 a.m. every day"
}
resource "aws_autoscaling_schedule" "scale_in_at_night" {
    scheduled_action_name = "scale-in-at-night"
    min_size               = 2
    max_size               = 10
    desired_capacity       = 2
    recurrence             = "0 17 * * *" # This means "5 p.m. every day"
}
```
x??

---


#### Accessing Module Outputs for Resource Parameters
Modules can output values that can be used in other configurations or modules. In this scenario, you need to access the name of an Auto Scaling Group (ASG) defined within a module.
:p How do you use module outputs to set parameters in AWS Auto Scaling resources?
??x
To use the ASG name from the `webserver-cluster` module, you first define it as an output variable in `/modules/services/webserver-cluster/outputs.tf`. Then, in your main configuration file (`prod/services/webserver-cluster/main.tf`), you can reference this output using the appropriate syntax.
```hcl
output "asg_name" {
    value       = aws_autoscaling_group.example.name
    description = "The name of the Auto Scaling Group"
}
```
In `main.tf`, you use the following syntax to set the `autoscaling_group_name` parameter:
```hcl
resource "aws_autoscaling_schedule" "scale_out_during_business_hours" {
    scheduled_action_name       = "scale-out-during-business-hours"
    min_size                    = 2
    max_size                    = 10
    desired_capacity            = 10
    recurrence                  = "0 9 * * *" # Means "9 a.m. every day"
    autoscaling_group_name      = module.webserver_cluster.asg_name
}
resource "aws_autoscaling_schedule" "scale_in_at_night" {
    scheduled_action_name       = "scale-in-at-night"
    min_size                    = 2
    max_size                    = 10
    desired_capacity            = 2
    recurrence                  = "0 17 * * *" # Means "5 p.m. every day"
    autoscaling_group_name      = module.webserver_cluster.asg_name
}
```
x??

---

---


#### File Paths and Path References
Background context explaining how file paths can be a challenge when using Terraform, especially with modules. Discuss why relative paths are necessary and introduce path references.

:p What is the issue with file paths when using the `templatefile` function in a module?
??x
The issue arises because the `templatefile` function requires a relative path to the template file, but this path can vary depending on where Terraform code runs. By default, it uses the current working directory (path.cwd), which might not be suitable for modules defined in separate folders.

To solve this, you should use path references such as `path.module`, which returns the filesystem path of the module where the expression is defined. This ensures that your file paths are consistent and relative to the correct location within the module.

Example:
```hcl
user_data  = templatefile("${path.module}/user-data.sh", {
    server_port  = var.server_port
    db_address   = data.terraform_remote_state.db.outputs.address
    db_port      = data.terraform_remote_state.db.outputs.port
})
```
x??

---


#### Inline Blocks vs Separate Resources in Terraform Modules
Background context explaining the difference between using inline blocks and separate resources for configurations within a module, and the potential issues when mixing both.

:p What is the main reason to prefer using separate resources over inline blocks in Terraform modules?
??x
Using separate resources provides more flexibility and configurability. Inline blocks are tied to specific resource definitions and cannot be added outside of their parent module. Separate resources can be added anywhere, making them easier to customize and extend by users or other modules.

For example, consider the security group configuration:
Inline block approach (not recommended):
```hcl
resource "aws_security_group" "alb" {
   name = "${var.cluster_name}-alb"
   ingress { ... }
   egress { ... }
}
```
Separate resource approach (recommended):
```hcl
resource "aws_security_group" "alb" {
   name = "${var.cluster_name}-alb"
}

resource "aws_security_group_rule" "allow_http_inbound" {
   type              = "ingress"
   security_group_id = aws_security_group.alb.id
   from_port    = local.http_port
   to_port      = local.http_port
   protocol     = local.tcp_protocol
   cidr_blocks  = local.all_ips
}

resource "aws_security_group_rule" "allow_all_outbound" {
   type              = "egress"
   security_group_id = aws_security_group.alb.id
   from_port    = local.any_port
   to_port      = local.any_port
   protocol     = local.any_protocol
   cidr_blocks  = local.all_ips
}
```
x??

---


#### Exporting Outputs in Terraform Modules
Background context on why it's useful to export specific outputs, such as the DNS name of an ALB, so users can easily reference them outside the module.

:p How do you expose the DNS name of the ALB as an output variable in a Terraform module?
??x
To expose the DNS name of the ALB as an output variable, add an `output` block in your module's outputs file. This allows users to access this information easily when using the module.

Example:
```hcl
output "alb_dns_name" {
   value       = aws_lb.example.dns_name
   description = "The domain name of the load balancer"
}
```

You can then pass through this output in other modules that use it, like so:

```hcl
output "alb_dns_name" {
   value       = module.webserver_cluster.alb_dns_name
   description = "The domain name of the load balancer"
}
```
x??

---


#### Security Group IDs as Outputs
Background context on why exporting the ID of a security group attached to an ALB can be useful for extending or modifying configurations in other parts of the infrastructure.

:p How do you export the ID of the AWS security group as an output variable in a Terraform module?
??x
To export the ID of the AWS security group, add an `output` block in your module's outputs file. This allows users to reference this ID when adding additional rules or configuring other resources that need access control.

Example:
```hcl
output "alb_security_group_id" {
   value       = aws_security_group.alb.id
   description = "The ID of the Security Group attached to the load balancer"
}
```

Now, if you need to add an extra ingress rule for testing in a specific environment (like staging), you can do this:

```hcl
resource "aws_security_group_rule" "allow_testing_inbound" {
   type              = "ingress"
   security_group_id  = module.webserver_cluster.alb_security_group_id
   from_port    = 12345
   to_port      = 12345
   protocol     = "tcp"
   cidr_blocks  = ["0.0.0.0/0"]
}
```

This ensures that the code works correctly, as it references the ID of the security group consistently.
x??

---

---


#### Network Isolation
Background context: The provided text discusses how the network environments created using Terraform are not isolated at a network level, which can pose risks. Resources from one environment (e.g., staging) can communicate with another environment (e.g., production), leading to potential issues like configuration mistakes affecting both or security breaches compromising multiple environments.
:p What is a significant risk when running both staging and production environments in the same VPC?
??x
There are several risks, but a key one is that any mistake in the configuration of resources in the staging environment could affect the production environment. Additionally, if an attacker gains access to the staging environment, they can also gain access to the production environment due to their interconnectedness.
x??

---


#### Module Versioning
Background context: The text explains why it’s important to version modules when working with Terraform, especially for separate environments like staging and production. This helps in making changes in one environment without affecting another by using different versions of the same module.
:p Why is module versioning critical when managing multiple environments?
??x
Module versioning ensures that changes made in a staging environment do not inadvertently affect the production environment until they are thoroughly tested. By maintaining separate versions, developers can test new configurations or features in a controlled environment before deploying them to production.
x??

---


#### Separating Module and Live Repositories
Background context: The text suggests storing reusable modules in one Git repository and the configuration for live environments in another. This separation allows for better management of infrastructure changes without affecting live deployments directly.
:p How should you structure your Terraform repositories according to the best practices mentioned?
??x
You should separate your repositories such that one (e.g., `modules`) contains reusable, versioned modules which define the "blueprints" or infrastructure components. The other repository (e.g., `live`) contains the configuration for deploying these blueprints into different environments like staging and production.
Example folder structure:
```
/modules
  /common
  /network
  /database

/live
  /staging
    main.tf
  /production
    main.tf
```
x??

---


#### Code Example: Versioned Modules in Repositories
Background context: The text provides an example of how to use different versions of the same module for different environments.
:p How do you set up versioned modules in separate repositories?
??x
You can set up your repository structure as follows:
- `modules`: Contains the reusable, versioned Terraform modules. Each module is a blueprint that defines specific infrastructure components.
- `live`: Contains the configuration files to deploy these modules into different environments.

Here’s an example setup:

```plaintext
/modules
  /network
    main.tf     # Module for network resources
    outputs.tf
    variables.tf
/live
  /staging
    main.tf      # Configures the 'network' module using v0.0.2
  /production
    main.tf      # Configures the 'network' module using v0.0.1
```

In `main.tf` of each environment’s live repository, you would reference the versioned modules like this:
```terraform
module "network" {
  source = "git::https://github.com/your-repo/modules.git//network"
  version = "0.0.2" # or "0.0.1" depending on the environment
}
```
x??

---

---


#### Adding Remote Repository and Pushing Code
Background context: After initializing your Git repositories, you need to set up a remote repository on platforms like GitHub. This allows you to push changes to a central location for collaboration or backup.

:p How do you add a remote origin and push the code?
??x
You can add a remote origin and push the code using these commands:
```sh
$ git remote add origin "(URL OF REMOTE GIT REPOSITORY)"
$ git push origin main
```
Replace `(URL OF REMOTE GIT REPOSITORY)` with your actual Git repository URL.
x??

---


#### Specifying Module Version in Terraform Code
Background context: When using modules, specifying the correct version ensures that you are using the intended code. This is especially important when multiple environments or teams need to use consistent versions.

:p How do you specify a specific Git tag as a module version in your Terraform configuration?
??x
You can specify a specific Git tag as a module version by adding the `ref` parameter in your `module` block:
```hcl
module "webserver_cluster" {
  source = "github.com/foo/modules//services/webserver-cluster?ref=v0.0.1"
  cluster_name            = "webservers-stage"
  db_remote_state_bucket  = "(YOUR_BUCKET_NAME)"
  db_remote_state_key     = "stage/data-stores/mysql/terraform.tfstate"
  instance_type           = "t2.micro"
  min_size                = 2
  max_size                = 2
}
```
This ensures that your configuration uses the exact version `v0.0.1` of the webserver-cluster module.
x??

---


#### Updating and Testing Modules in Staging

Background context: When making changes to a module, you need to commit the updates, tag them as a version, and then update the `main.tf` file with the new version number. This process is repeated for testing in staging before moving to production.

:p How do you push a new tag to a Git repository after committing changes?
??x
To push a new tag to a Git repository, use the following command:
```
$ git tag -a "v0.0.2" -m "Second release of webserver-cluster"
$ git push origin main --follow-tags
```

This process tags the commit and pushes it to the `origin` remote repository, ensuring that all relevant tags are also pushed.
x??

---


#### Deploying Modules in Different Environments

Background context: Versioned modules allow you to deploy different versions of a module in different environments (e.g., staging, production). This ensures that changes can be tested before being applied to the live environment.

:p How do you update the `main.tf` file for a specific module in a different environment?
??x
To update the `main.tf` file for a specific module in an environment like staging or production, modify the source URL to use the appropriate version. For example:

For staging:
```hcl
module "webserver_cluster" {
  source = "github.com/foo/modules//services/webserver-cluster?ref=v0.0.2"
  cluster_name            = "webservers-stage"
  db_remote_state_bucket  = "(YOUR_BUCKET_NAME)"
  db_remote_state_key     = "stage/data-stores/mysql/terraform.tfstate"
  instance_type           = "t2.micro"
  min_size                = 2
  max_size                = 2
}
```

For production:
```hcl
module "webserver_cluster" {
  source = "github.com/foo/modules//services/webserver-cluster?ref=v0.0.1"
  cluster_name            = "webservers-prod"
  db_remote_state_bucket  = "(YOUR_BUCKET_NAME)"
  db_remote_state_key     = "prod/data-stores/mysql/terraform.tfstate"
  instance_type           = "m4.large"
  min_size                = 2
  max_size                = 10
}
```

These changes ensure that the correct version is applied to each environment.
x??

---

