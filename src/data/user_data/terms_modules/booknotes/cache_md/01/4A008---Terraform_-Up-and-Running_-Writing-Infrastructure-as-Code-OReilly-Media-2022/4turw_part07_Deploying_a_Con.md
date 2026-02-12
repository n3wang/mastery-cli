# High-Quality Flashcards: 4A008---Terraform_-Up-and-Running_-Writing-Infrastructure-as-Code-OReilly-Media-2022_processed (Part 7)


**Starting Chapter:** Deploying a Configurable Web Server

---


#### Private Subnets for Production Systems
Background context: In cloud infrastructure, particularly within a Virtual Private Cloud (VPC), it is crucial to ensure that sensitive components such as data stores are protected from direct public internet access. By deploying these services into private subnets, their IP addresses can only be accessed internally through the VPC.

:p What is the primary reason for using private subnets in production systems?
??x
To protect critical infrastructure like data stores from unauthorized access by limiting external internet exposure and ensuring that they are only accessible within the VPC.
x??

---


#### Don't Repeat Yourself (DRY) Principle
Background context: The DRY principle, also known as "Don’t Repeat Yourself," encourages developers to avoid redundancy in their code. This is important for maintainability and reducing the risk of errors when modifying configurations.

:p What does the DRY principle aim to prevent?
??x
The repetition of information within a system, which can lead to inconsistencies and increase the likelihood of errors if changes are not made uniformly across all instances.
x??

---


#### Using Variables in Terraform
Background context: To adhere to the DRY principle, Terraform allows users to define input variables that can be reused throughout the configuration. These variables provide flexibility by allowing values to be passed from external sources such as command-line arguments or environment variables.

:p How does using variables in Terraform help maintain consistency and reduce redundancy?
??x
Using variables in Terraform helps maintain consistency and reduce redundancy by providing a single source of truth for configurations that might otherwise need to be defined multiple times. This ensures that any updates are applied uniformly across the system.
x??

---


#### Enforcing Type Constraints
Background context: Specifying type constraints for variables in Terraform helps ensure that only valid data types are passed into your configuration files. This can help catch simple errors early.

:p Why should you define type constraints when declaring variables?
??x
Defining type constraints is important because it enforces the correct format of the input, helping to prevent runtime errors and ensuring that the values used in configurations are semantically correct.
x??

---


#### Sensitive Information Handling
Background context: In many scenarios, sensitive information like passwords and API keys need to be passed into Terraform configurations. To protect such information, the `sensitive` parameter can be used to prevent logging of these values.

:p What does the `sensitive` parameter do when set to true?
??x
When the `sensitive` parameter is set to true, Terraform will not log the value of the variable during plan or apply commands. This provides an additional layer of security by preventing sensitive information from being recorded in logs.
x??

---

---


---

#### Input Variables and Type Constraints

Background context: In Terraform, input variables are used to define parameters that can be set when running a Terraform script. Type constraints are used to ensure that the values passed into these variables comply with specific data types or structures.

:p What is an example of an input variable in Terraform that checks for a number?
??x
An example of an input variable in Terraform that checks for a number:
```terraform
variable "number_example" {
  description = "An example of a number variable in Terraform"
  type        = number
  default     = 42
}
```
x??

---


#### List Input Variables

Background context: Lists are another data structure used in input variables to pass multiple values. These can be validated to ensure they contain elements of the correct type.

:p How would you define an input variable that is a list?
??x
An example of defining an input variable as a list:
```terraform
variable "list_example" {
  description = "An example of a list in Terraform"
  type        = list
  default     = ["a", "b", "c"]
}
```
x??

---


#### Numeric List Input Variables

Background context: A numeric list is a specific type of list where all the items must be numbers. This can be defined using `list(number)`.

:p How would you define an input variable that ensures all elements are numbers?
??x
An example of defining a numeric list input variable:
```terraform
variable "list_numeric_example" {
  description = "An example of a numeric list in Terraform"
  type        = list(number)
  default     = [1, 2, 3]
}
```
x??

---


#### Map Input Variables

Background context: Maps are used to associate keys with values. They can be constrained to ensure all the values are of a specific type.

:p How would you define an input variable that is a map of strings?
??x
An example of defining a map input variable:
```terraform
variable "map_example" {
  description = "An example of a map in Terraform"
  type        = map(string)
  default     = {
    key1 = "value1"
    key2 = "value2"
    key3 = "value3"
  }
}
```
x??

---


#### Structural Input Variables Using Object

Background context: Complex structures can be defined using the `object` constraint. This allows you to specify a set of required keys and their types.

:p How would you define an input variable that has a complex structure?
??x
An example of defining a structural input variable:
```terraform
variable "object_example" {
  description = "An example of a structural type in Terraform"
  type        = object({
    name     = string
    age      = number
    tags     = list(string)
    enabled  = bool
  })
  default     = {
    name     = "value1"
    age      = 42
    tags     = ["a", "b", "c"]
    enabled  = true
  }
}
```
x??

---


#### Default Values for Input Variables

Background context: If an input variable is not given a default value, Terraform will prompt the user to provide one. Alternatively, you can set a default value directly in the configuration.

:p How do you define an input variable with a default value?
??x
An example of defining an input variable with a default value:
```terraform
variable "server_port" {
  description = "The port the server will use for HTTP requests"
  type        = number
  default     = 8080
}
```
x??

---


#### Using Input Variables in Terraform Code

Background context: To use input variables in your Terraform code, you can use variable references. These are prefixed with `var.` and the name of the variable.

:p How do you use a server port variable inside an AWS security group resource?
??x
To use a server port variable inside an AWS security group resource:
```terraform
resource "aws_security_group" "instance" {
  name = "terraform-example-instance"
  ingress {
    from_port    = var.server_port
    to_port      = var.server_port
    protocol     = "tcp"
    cidr_blocks  = ["0.0.0.0/0"]
  }
}
```
x??

---


#### Output Variables

Background context: Output variables are used to expose the results of a Terraform configuration. They can be any valid Terraform expression.

:p How do you define an output variable in Terraform?
??x
An example of defining an output variable:
```terraform
output "example_output" {
  value = <value>
}
```
x??

---

---


#### Sensitive Parameter
Background context: The `sensitive` parameter in Terraform output variables is used to prevent logging sensitive information such as passwords or private keys. This ensures that potentially harmful data is not exposed during plan or apply operations.

:p What does the `sensitive` parameter do, and when should it be used?
??x
The `sensitive` parameter instructs Terraform not to log certain output variables in plain text, which is particularly useful for handling sensitive information like passwords or private keys. This helps maintain security by preventing sensitive data from being exposed during planning or applying configurations.

To mark an output variable as sensitive:
```hcl
output "sensitive_output" {
    value = ...
    sensitive = true  # Mark the output as sensitive.
}
```
x??

---


#### Depends_on Parameter
Background context: The `depends_on` parameter in Terraform can be used to explicitly define dependencies between resources or outputs. This is particularly useful when a resource's state needs to be updated before an output variable can accurately reflect its value.

:p How does the `depends_on` parameter work in Terraform?
??x
The `depends_on` parameter allows you to specify that one resource or output depends on another. When this dependency exists, Terraform will ensure that the dependent resource is fully processed and ready before evaluating any outputs that depend on it. This can be useful for ensuring that certain configurations are complete before they are referenced.

Example usage:
```hcl
output "public_ip" {
    value       = aws_instance.example.public_ip
    description = "The public IP address of the web server"
    depends_on  = [aws_security_group.instance]
}
```
In this example, Terraform will wait for the `aws_security_group.instance` to be fully configured before calculating the output variable `public_ip`.

x??

---

---


#### Auto Scaling Groups (ASGs) for Web Servers
Background context: In cloud environments, ensuring your application can handle varying loads is crucial. An Auto Scaling Group (ASG) automatically manages a group of Amazon EC2 instances by launching new instances when needed and terminating old ones as demand decreases. This helps maintain optimal resource usage while avoiding downtime.

:p What is an Auto Scaling Group (ASG) used for?
??x
An Auto Scaling Group (ASG) is used to manage a cluster of EC2 Instances, automatically scaling the number of running instances based on traffic load and health checks. It ensures that your application remains available even when some instances fail or become overloaded.
x??

---


#### Creating an Auto Scaling Group with Terraform
Background context: To create an ASG in Terraform, you need to define both the launch configuration and the ASG itself. The ASG will then use the specified launch configuration to manage a fleet of EC2 instances.

:p How do you create an Auto Scaling Group using Terraform?
??x
To create an ASG with Terraform, first define the `aws_launch_configuration` resource to specify how each instance should be launched:
```terraform
resource "aws_launch_configuration" "example" {
  image_id         = "ami-0fb653ca2d3203ac1"
  instance_type    = "t2.micro"
  security_groups  = [aws_security_group.instance.id]
  user_data        = <<-EOF
                      #!/bin/bash
                      echo "Hello, World" > index.html
                      nohup busybox httpd -f -p ${var.server_port} &
                     EOF
}
```

Then, define the `aws_autoscaling_group` resource to specify how many instances should be running and where they should be deployed:
```terraform
resource "aws_autoscaling_group" "example" {
  launch_configuration  = aws_launch_configuration.example.name
  min_size              = 2
  max_size              = 10
  tag {
    key                 = "Name"
    value                = "terraform-asg-example"
    propagate_at_launch  = true
  }
}
```
x??

---


#### Using Data Sources in Terraform
Background context: Data sources allow you to fetch read-only information from the provider (in this case, AWS). They are useful for retrieving details like VPC subnets without creating new resources.

:p How do you use a data source in Terraform?
??x
To use a data source in Terraform, define it with the appropriate type and arguments. For example, to get the ID of the default VPC:
```terraform
data "aws_vpc" "default" {
  default = true
}
```

You can then reference this data source's attributes in your configuration using syntax like `data.aws_vpc.default.id`.

To use subnets from a specific VPC in an ASG, you would fetch the subnet IDs and pass them to the `subnet_ids` parameter:
```terraform
data "aws_subnet_ids" "example" {
  vpc_id = data.aws_vpc.default.id
}
```
x??

---

---


#### AWS Auto Scaling Group (ASG) with VPC
When deploying servers using ASG within a VPC, you need to specify which subnets the instances should be launched into. The `vpc_zone_identifier` argument in the ASG resource is used for this purpose.
:p How do you configure an ASG to use specific subnets within a VPC?
??x
To configure an ASG to use specific subnets, first retrieve the subnet IDs using the `aws_subnets` data source. Then, pass these IDs via the `vpc_zone_identifier` argument in your ASG resource.
```hcl
resource "aws_autoscaling_group" "example" {
  launch_configuration = aws_launch_configuration.example.name
  vpc_zone_identifier   = data.aws_subnets.default.ids
  min_size              = 2
  max_size              = 10
  tag {
    key                 = "Name"
    value                = "terraform-asg-example"
    propagate_at_launch  = true
  }
}
```
This configuration ensures that the instances launched by your ASG will be placed in the specified subnets.
x??

---


#### Load Balancing with Amazon Elastic Load Balancer (ALB)
Load balancing is essential for distributing traffic across multiple servers, providing a single point of access to users. In AWS, you can use the Elastic Load Balancer (ALB) service to achieve this. The ALB works at Layer 7 of the OSI model and is ideal for HTTP and HTTPS traffic.
:p What is Amazon's Application Load Balancer (ALB), and why is it suitable for an HTTP application?
??x
The Application Load Balancer (ALB) from AWS is designed to distribute HTTP and HTTPS traffic efficiently. It operates at Layer 7 of the OSI model, which means it can understand the content of your requests and responses.
```hcl
resource "aws_alb" "example" {
  name               = "terraform-alb-example"
  subnets            = [data.aws_subnets.default.ids]
  security_groups    = [aws_security_group.example.id]

  listener {
    port           = 80
    protocol       = "HTTP"
    default_action = { type = "forward", target_group_arn = aws_alb_target_group.example.arn }
  }

  target_group {
    name     = "example"
    port     = 80
    protocol = "HTTP"
    vpc      = true
  }
}
```
The ALB is suitable for HTTP applications because it can process and route requests based on the URL path, query parameters, and cookies. This makes it highly flexible and powerful for modern web applications.
x??

---


#### Deploying a Load Balancer in Terraform
To deploy a load balancer using Terraform, you can use the AWS ALB resource. You need to configure listeners, target groups, and security settings.
:p How do you create an Application Load Balancer (ALB) using Terraform?
??x
Creating an ALB with Terraform involves defining its resources such as `aws_alb`, `aws_alb_listener`, and `aws_alb_target_group`. Here’s a basic example:
```hcl
resource "aws_alb" "example" {
  name               = "terraform-alb-example"
  subnets            = [data.aws_subnets.default.ids]
  security_groups    = [aws_security_group.example.id]

  listener {
    port           = 80
    protocol       = "HTTP"
    default_action = { type = "forward", target_group_arn = aws_alb_target_group.example.arn }
  }

  target_group {
    name     = "example"
    port     = 80
    protocol = "HTTP"
    vpc      = true
  }
}
```
This configuration sets up an ALB that listens on port 80 for HTTP traffic and forwards requests to a target group.
x??

---


#### AWS Load Balancer Overview
Background context: This section explains how to set up an Application Load Balancer (ALB) using Terraform. It covers creating the ALB, defining a listener, and setting up a target group for an Auto Scaling Group (ASG). The focus is on understanding the steps required to configure these components.
:p What is an Application Load Balancer (ALB)?
??x
An Application Load Balancer (ALB) distributes traffic across multiple targets such as EC2 instances or containers. It performs health checks and ensures high availability by sending requests only to healthy nodes.
x??

---


#### Creating the ALB with Terraform
Background context: This step involves creating an ALB using the `aws_lb` resource in Terraform. The configuration includes specifying the load balancer type, subnets for the ALB, and security groups.
:p How do you create an ALB using Terraform?
??x
To create an ALB using Terraform, you use the `aws_lb` resource with parameters like `name`, `load_balancer_type`, and `subnets`. Here’s a basic example:
```hcl
resource "aws_lb" "example" {
  name               = "terraform-asg-example"
  load_balancer_type = "application"
  subnets             = data.aws_subnets.default.ids
}
```
The `subnets` parameter uses the `data.aws_subnets.default.ids` to configure the ALB to use all subnets in your Default VPC.
x??

---


#### Setting Up a Target Group for ASG
Background context: A target group is essential to manage and monitor the health of instances in an Auto Scaling Group (ASG). It performs periodic health checks using configured paths and protocols.
:p How do you create a target group for your ASG using Terraform?
??x
To create a target group for your ASG, use the `aws_lb_target_group` resource with parameters like `name`, `port`, `protocol`, and `vpc_id`. Here’s an example:
```hcl
resource "aws_lb_target_group" "asg" {
  name     = "terraform-asg-example"
  port     = var.server_port
  protocol = "HTTP"
  vpc_id    = data.aws_vpc.default.id

  health_check {
    path                 = "/"
    protocol             = "HTTP"
    matcher              = "200"
    interval             = 15
    timeout              = 3
    healthy_threshold    = 2
    unhealthy_threshold  = 2
  }
}
```
This target group performs periodic health checks using an HTTP request to the root path and considers instances healthy if they return a status code of 200.
x??

---

---


#### Auto Scaling Group Integration with Target Group
When an EC2 Instance fails to respond, it is marked as "unhealthy," and the target group stops sending traffic to minimize disruption. With an Auto Scaling Group (ASG), Instances can launch or terminate dynamically, making a static list of instances impractical.

The ASG integrates directly with the Application Load Balancer (ALB) through its `target_group_arns` argument. By setting this argument, the ASG will use the target group’s health check to determine if an Instance is healthy and replace unhealthy Instances automatically.

:p How does the ASG ensure that only healthy EC2 Instances are used by the ALB?
??x
The ASG ensures that only healthy EC2 Instances are used by the ALB through its integration with the target group. The `target_group_arns` argument in the `aws_autoscaling_group` resource points to the ARN of the target group, which contains the health check logic. If an Instance is marked as unhealthy by the target group’s health check (e.g., due to unresponsiveness or critical failures like running out of memory), the ASG will automatically terminate and replace it.

```hcl
resource "aws_autoscaling_group" "example" {
  launch_configuration = aws_launch_configuration.example.name
  vpc_zone_identifier   = data.aws_subnets.default.ids
  target_group_arns     = [aws_lb_target_group.asg.arn]
  health_check_type     = "ELB"
  min_size              = 2
  max_size              = 10

  tag {
    key                 = "Name"
    value                = "terraform-asg-example"
    propagate_at_launch  = true
  }
}
```
x??

---


#### Deployed Load Balancer Verification
Background context: Once `terraform apply` completes, it is essential to verify that your load balancer and associated resources are correctly configured. This involves checking the AWS Management Console.

:p What steps should you take after running `terraform apply`?
??x
1. Open the EC2 console.
2. Navigate to the ASG section and confirm that your Auto Scaling Group (ASG) has been created.
3. Switch to the Instances tab and verify that two EC2 Instances are launching.
4. Go to the Load Balancers tab to see your Application Load Balancer (ALB).
5. Check the Target Groups tab for any target groups you have configured.

This ensures that all components of your infrastructure are deployed correctly.
x??

---


#### Testing the ALB URL
Background context: After confirming that all components are healthy, you can test your load balancer by accessing its DNS name.

:p How do you test if the ALB is routing traffic correctly?
??x
Use `curl` to access the ALB’s DNS name. The command should look like this:
```sh
$ curl http://terraform-asg-example-123.us-east-2.elb.amazonaws.com
```
You should see a response like "Hello, World". This indicates that traffic is being routed correctly to one of your EC2 Instances.
x??

---


#### Instance Termination and Self-Healing
Background context: The Auto Scaling Group (ASG) can automatically launch new instances when existing ones are terminated.

:p What happens if you terminate an instance?
??x
After terminating an instance, the ASG will detect that fewer than two Instances are running. It will then automatically launch a new one to replace the terminated instance, ensuring that your desired capacity is maintained.
x??

---


#### Adjusting Desired Capacity
Background context: You can manually adjust the number of instances managed by your Auto Scaling Group (ASG).

:p How do you add or change the `desired_capacity` in Terraform?
??x
To resize your ASG, you need to modify the desired capacity parameter in your Terraform code. For example:
```hcl
resource "aws_autoscaling_group" "example" {
  # existing configuration...
  desired_capacity = 3
}
```
After modifying the code, re-run `terraform apply` to update the ASG.
x??

---

---

