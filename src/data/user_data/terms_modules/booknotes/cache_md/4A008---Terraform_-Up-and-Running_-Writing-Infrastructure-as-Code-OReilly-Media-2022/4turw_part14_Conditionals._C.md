# High-Quality Flashcards: 4A008---Terraform_-Up-and-Running_-Writing-Infrastructure-as-Code-OReilly-Media-2022_processed (Part 14)


**Starting Chapter:** Conditionals. Conditionals with the count Parameter

---


#### Conditionals Using count Parameter
Background context: In Terraform, while direct `if` statements aren't supported, you can use the `count` parameter to conditionally create resources. The `count` parameter allows you to specify how many copies of a resource should be created based on an integer value.

:p How can you conditionally enable auto-scaling using the `count` parameter in Terraform?
??x
By setting `count` to 1, one instance of the resource is created; by setting it to 0, no instances are created. In this case, we use a Boolean input variable to control whether auto-scaling should be enabled.

For example:
```hcl
variable "enable_autoscaling" {
  description = "If set to true, enable auto scaling"
  type        = bool
}

resource "aws_autoscaling_schedule" "scale_out_during_business_hours" {
  count                  = var.enable_autoscaling ? 1 : 0

  scheduled_action_name  = "${var.cluster_name}-scale-out-during-business-hours"
  min_size                = 2
  max_size                = 10
  desired_capacity        = 10
  recurrence              = "0 9 * * *"
  autoscaling_group_name  = aws_autoscaling_group.example.name
}

resource "aws_autoscaling_schedule" "scale_in_at_night" {
  count                  = var.enable_autoscaling ? 1 : 0

  scheduled_action_name  = "${var.cluster_name}-scale-in-at-night"
  min_size                = 2
  max_size                = 10
  desired_capacity        = 2
  recurrence              = "0 17 * * *"
  autoscaling_group_name  = aws_autoscaling_group.example.name
}
```
x??

---


#### count Parameter Example in Action
Background context: The `count` parameter can be used not only for basic loops but also as a conditional mechanism. By setting `count` to 1 or 0 based on a variable value, Terraform decides whether to create the resource.

:p How does using `count = var.enable_autoscaling ? 1 : 0` in a Terraform configuration work?
??x
By using the ternary operator within the `count` parameter, you conditionally create resources. If `var.enable_autoscaling` is true (or non-zero), then `count` will be set to 1 and the resource will be created; otherwise, it will be set to 0 and no instance of that resource will be created.

Example:
```hcl
resource "aws_autoscaling_schedule" "scale_out_during_business_hours" {
  count                  = var.enable_autoscaling ? 1 : 0

  scheduled_action_name  = "${var.cluster_name}-scale-out-during-business-hours"
  min_size                = 2
  max_size                = 10
  desired_capacity        = 10
  recurrence              = "0 9 * * *"
  autoscaling_group_name  = aws_autoscaling_group.example.name
}
```
This ensures that the `aws_autoscaling_schedule` resource is only created when auto-scaling is enabled.
x??

---

---


#### Conditional Logic with `count` Parameter
Conditional logic can be implemented using the ternary syntax in Terraform. Specifically, you can control whether resources are created or not based on a boolean condition. The `count` parameter is used to decide how many instances of a resource should be created.

In this case, the `enable_autoscaling` variable determines whether auto-scaling schedules (`aws_autoscaling_schedule`) will be configured for your web server cluster.

:p How does Terraform use conditional logic in the `count` parameter for resources like `aws_autoscaling_schedule`?
??x
Terraform uses a ternary expression to conditionally set the `count` value. If `var.enable_autoscaling` is true, the count will be 1, creating one instance of the resource (in this case, an autoscaling schedule). If it's false, the count will be 0, meaning no instances of that resource will be created.

Here’s how you can implement this in Terraform:

```hcl
resource "aws_autoscaling_schedule" "scale_out_during_business_hours" {
    count = var.enable_autoscaling ? 1 : 0
    scheduled_action_name   = "${var.cluster_name}-scale-out-during-business-hours"
    min_size                = 2
    max_size                = 10
    desired_capacity        = 10
    recurrence              = "0 9 * * *"
    autoscaling_group_name  = aws_autoscaling_group.example.name
}

resource "aws_autoscaling_schedule" "scale_in_at_night" {
    count = var.enable_autoscaling ? 1 : 0
    scheduled_action_name   = "${var.cluster_name}-scale-in-at-night"
    min_size                = 2
    max_size                = 10
    desired_capacity        = 2
    recurrence              = "0 17 * * *"
    autoscaling_group_name  = aws_autoscaling_group.example.name
}
```

The `count` parameter effectively enables or disables the creation of these resources based on the value of `var.enable_autoscaling`.
x??

---


#### Conditional Logic with `count` Parameter for Different Environments
In Terraform, you can use conditional logic to enable or disable specific configurations in different environments by setting environment-specific variables.

:p How does one conditionally configure auto-scaling in Terraform based on the environment?
??x
You define a variable `enable_autoscaling`, and set it to true for production and false for staging. This way, the resources will be created only if `var.enable_autoscaling` is true, allowing you to enable or disable auto-scaling schedules depending on the environment.

Here’s an example of how this can be done:

For Staging (in live/stage/services/webserver-cluster/main.tf):
```hcl
module "webserver_cluster" {
    source  = "../../../../modules/services/webserver-cluster"
    cluster_name            = "webservers-stage"
    db_remote_state_bucket  = "(YOUR_BUCKET_NAME)"
    db_remote_state_key     = "stage/data-stores/mysql/terraform.tfstate"
    instance_type           = "t2.micro"
    min_size                = 2
    max_size                = 2
    enable_autoscaling      = false
}
```

For Production (in live/prod/services/webserver-cluster/main.tf):
```hcl
module "webserver_cluster" {
    source  = "../../../../modules/services/webserver-cluster"
    cluster_name            = "webservers-prod"
    db_remote_state_bucket  = "(YOUR_BUCKET_NAME)"
    db_remote_state_key     = "prod/data-stores/mysql/terraform.tfstate"
    instance_type           = "m4.large"
    min_size                = 2
    max_size                = 10
    enable_autoscaling      = true
    custom_tags             = {
        Owner      = "team-foo"
        ManagedBy  = "terraform"
    }
}
```

In the above example, setting `enable_autoscaling` to false in staging means that no auto-scaling schedules will be created for this environment.
x??

---


#### Conditional Logic for Resource Creation
Conditional logic using the `count` parameter in Terraform helps manage which resources are created based on a condition. The ternary operator is particularly useful here to dynamically control resource creation.

:p How does one use the ternary operator with `count` in Terraform?
??x
You can use the ternary operator within the `count` attribute of Terraform resources to conditionally create them. For example, if you want to create an autoscaling schedule only when auto-scaling is enabled:

```hcl
resource "aws_autoscaling_schedule" "scale_out_during_business_hours" {
    count = var.enable_autoscaling ? 1 : 0
    // Other resource attributes
}
```

If `var.enable_autoscaling` is true, one instance of the `aws_autoscaling_schedule` will be created. If it's false, no instances will be created.

This approach allows you to dynamically manage resources in your Terraform configurations based on conditionally set variables.
x??

---

---


#### Using Count Parameter for Conditional Resource Creation
Background context: In Terraform, you can use the `count` parameter to conditionally create resources based on a boolean variable. This is useful when you need to decide between creating one of several similar resources depending on some input.

:p How can you use the count parameter to conditionally attach different IAM policies to an IAM user?
??x
You can use the `count` parameter in Terraform to conditionally create resources based on a boolean variable. If `var.give_neo_cloudwatch_full_access` is true, it creates an attachment for full access; otherwise, it attaches read-only permissions.

```terraform
resource "aws_iam_user_policy_attachment" "neo_cloudwatch_full_access" {
  count = var.give_neo_cloudwatch_full_access ? 1 : 0
  user       = aws_iam_user.example[0].name
  policy_arn = aws_iam_policy.cloudwatch_full_access.arn
}

resource "aws_iam_user_policy_attachment" "neo_cloudwatch_read_only" {
  count = var.give_neo_cloudwatch_full_access ? 0 : 1
  user       = aws_iam_user.example[0].name
  policy_arn = aws_iam_policy.cloudwatch_read_only.arn
}
```

x??

---


#### Conditional Output Based on Resource Creation
Background context: After conditionally creating resources using the `count` parameter, you might want to output an attribute of the resource that was actually created.

:p How can you ensure that an output variable correctly reflects the policy attached based on a conditional resource creation?
??x
To handle this, you use the `try` function in Terraform. The `try` function returns the value if the resource is attached and throws an error if it isn't, allowing you to conditionally set your output.

```terraform
output "neo_cloudwatch_policy_arn" {
  value = try(element(split("\n", aws_iam_user_policy_attachment.neo_cloudwatch_full_access.*.policy_arn),0), aws_iam_user_policy_attachment.neo_cloudwatch_read_only[0].policy_arn)
}
```

This `try` function checks if the full access policy is attached; if not, it falls back to the read-only policy.

x??

---


#### Conditional Resource Creation Logic
Background context: In Terraform, you can conditionally create resources using the `count` parameter based on a boolean input variable. This example demonstrates how to attach either a full-access or read-only IAM policy to an IAM user.

:p How does the conditional logic work in Terraform for creating different types of resource attachments?
??x
The conditional logic works by using the `count` parameter, which evaluates to 1 if the condition is true and 0 otherwise. Here’s how it’s implemented:

```terraform
resource "aws_iam_user_policy_attachment" "neo_cloudwatch_full_access" {
  count = var.give_neo_cloudwatch_full_access ? 1 : 0
  user       = aws_iam_user.example[0].name
  policy_arn = aws_iam_policy.cloudwatch_full_access.arn
}

resource "aws_iam_user_policy_attachment" "neo_cloudwatch_read_only" {
  count = var.give_neo_cloudwatch_full_access ? 0 : 1
  user       = aws_iam_user.example[0].name
  policy_arn = aws_iam_policy.cloudwatch_read_only.arn
}
```

In this example, if `var.give_neo_cloudwatch_full_access` is true, the full access policy will be attached (count=1), otherwise, only read-only access will be given (count=0).

x??

---

---


#### Ternary Syntax vs Concat and One Functions
Background context: The text discusses different ways to handle conditional logic in Terraform, specifically focusing on ternary syntax and a safer approach using `concat` and `one` functions. This is important for ensuring code robustness as conditions become more complex.

:p What are the limitations of using ternary syntax for conditional logic in Terraform?
??x
Using ternary syntax can lead to brittle code that becomes difficult to maintain, especially if you modify conditions or resource definitions. For instance, changing the `count` parameter in `aws_iam_user_policy_attachment` resources might require updating multiple places, leading to potential errors.
x??

---


#### Conditional Logic with for_each and for Expressions
Background context: The text explains using `for_each` combined with the `for` expression to implement more complex conditional logic in Terraform. This approach allows you to conditionally create resources based on dynamic collections.

:p How does combining `for_each` and the `for` expression enable more complex conditional logic?
??x
Combining `for_each` with a nested `for` expression enables you to apply conditions directly within loops, allowing for arbitrary logical decisions. For example:

```hcl
dynamic "tag" {
  for_each = { 
    for key, value in var.custom_tags: 
    key => upper(value) 
    if key == "Name"
  }
  content {
    key                  = tag.key
    value                = tag.value
    propagate_at_launch  = true
  }
}
```

- `for_each` iterates over `var.custom_tags`.
- The nested `for` expression processes each tag, converting the value to uppercase and filtering out any "Name" tags.
- If no conditions match or the collection is empty, zero copies of the resource block are created.

This approach provides a flexible way to implement conditional logic without cluttering your code with multiple explicit conditions.
x??

---

---


---

#### Zero-Downtime Deployment Concept
In a web server cluster, ensuring minimal or no downtime during updates is crucial. This involves updating the Amazon Machine Image (AMI) without affecting user access. The core idea is to use Terraform configuration to manage these changes smoothly.

:p How do you ensure zero-downtime deployment in a web server cluster using AMI updates?
??x
To ensure zero-downtime deployment, you need to make your Terraform configurations flexible and capable of updating the AMI without disrupting service. Specifically, this involves:

1. Defining the AMI as an input variable in `variables.tf`.
2. Modifying the `user-data.sh` script to accept a variable that controls the text returned by the web server.
3. Updating the launch configuration in `main.tf` to use these variables.

Here's how you can do it:

1. **Define Variables:**
   ```hcl
   variable "ami" {
     description = "The AMI to run in the cluster"
     type        = string
     default      = "ami-0fb653ca2d3203ac1"
   }

   variable "server_text"  {
     description = "The text the web server should return"
     type        = string
     default      = "Hello, World"
   }
   ```

2. **Update User Data Script:**
   ```hcl
   #./bin/bash
   cat > index.html <<EOF
   <h1>${server_text}</h1>
   <p>DB address: ${db_address}</p>
   <p>DB port: ${db_port}</p>
   EOF

   nohup busybox httpd -f -p ${server_port} &
   ```

3. **Update Launch Configuration:**
   ```hcl
   resource "aws_launch_configuration" "example"  {
     image_id         = var.ami
     instance_type    = var.instance_type
     security_groups  = [aws_security_group.instance.id]
     user_data        = templatefile("${path.module}/user-data.sh", {
       server_port  = var.server_port
       db_address   = data.terraform_remote_state.db.outputs.address
       db_port      = data.terraform_remote_state.db.outputs.port
       server_text  = var.server_text
     })
     # Required when using a launch configuration with an auto scaling group.
     lifecycle  {
       create_before_destroy  = true
     }
   }
   ```

4. **Apply Changes in Staging Environment:**
   ```hcl
   module "webserver_cluster"  {
     source      = "../../../../modules/services/webserver-cluster"
     ami         = "ami-0fb653ca2d3203ac1"
     server_text = "New server text"
     cluster_name            = "webservers-stage"
     db_remote_state_bucket  = "(YOUR_BUCKET_NAME)"
     db_remote_state_key     = "stage/data-stores/mysql/terraform.tfstate"
     instance_type       = "t2.micro"
     min_size            = 2
     max_size            = 2
     enable_autoscaling  = false
   }
   ```

By following these steps, you can update the AMI and server text without downtime.

x??

---


#### Launch Configuration Update in Terraform
When updating an existing launch configuration in a web server cluster, you need to ensure that the changes are applied seamlessly. The launch configuration is crucial for defining how instances should be launched within an auto-scaling group.

:p How do you update the launch configuration to use a new AMI and variable inputs in Terraform?
??x
To update the launch configuration using a new AMI and variable inputs, follow these steps:

1. **Define Variables:**
   ```hcl
   variable "ami" {
     description = "The AMI to run in the cluster"
     type        = string
     default      = "ami-0fb653ca2d3203ac1"
   }

   variable "server_text"  {
     description = "The text the web server should return"
     type        = string
     default      = "Hello, World"
   }
   ```

2. **Update User Data Script:**
   ```hcl
   #./bin/bash
   cat > index.html <<EOF
   <h1>${server_text}</h1>
   <p>DB address: ${db_address}</p>
   <p>DB port: ${db_port}</p>
   EOF

   nohup busybox httpd -f -p ${server_port} &
   ```

3. **Update Launch Configuration in `main.tf`:**
   ```hcl
   resource "aws_launch_configuration" "example"  {
     image_id         = var.ami
     instance_type    = var.instance_type
     security_groups  = [aws_security_group.instance.id]
     user_data        = templatefile("${path.module}/user-data.sh", {
       server_port  = var.server_port
       db_address   = data.terraform_remote_state.db.outputs.address
       db_port      = data.terraform_remote_state.db.outputs.port
       server_text  = var.server_text
     })
     # Required when using a launch configuration with an auto-scaling group.
     lifecycle  {
       create_before_destroy  = true
     }
   }
   ```

4. **Apply Changes in Staging Environment:**
   ```hcl
   module "webserver_cluster"  {
     source      = "../../../../modules/services/webserver-cluster"
     ami         = "ami-0fb653ca2d3203ac1"
     server_text = "New server text"
     cluster_name            = "webservers-stage"
     db_remote_state_bucket  = "(YOUR_BUCKET_NAME)"
     db_remote_state_key     = "stage/data-stores/mysql/terraform.tfstate"
     instance_type       = "t2.micro"
     min_size            = 2
     max_size            = 2
     enable_autoscaling  = false
   }
   ```

By updating the `ami` and `server_text` variables, you can ensure that new instances are launched with the updated AMI and server text. Terraform will handle the transition seamlessly.

x??

---

---


#### Zero-Downtime Deployment for AWS Auto Scaling Groups
In order to perform an update on your AWS Auto Scaling Group (ASG) without downtime, you need to ensure that a new ASG is created first and only then destroyed after confirming its stability. This can be achieved using Terraform's `create_before_destroy` lifecycle setting.

Background context: When updating the launch configuration of an ASG, simply referencing the updated launch config won't immediately affect the running instances. The ASG needs to deploy new instances before the changes take effect, which might lead to downtime if done incorrectly.

:p How can you ensure a zero-downtime deployment for your AWS Auto Scaling Group?
??x
To achieve zero-downtime deployment, you need to set up the `create_before_destroy` lifecycle setting in Terraform. This ensures that when Terraform tries to replace an ASG, it first creates a new one before destroying the old one.

```hcl
resource "aws_autoscaling_group" "example" {
  name = "${var.cluster_name}-${aws_launch_configuration.example.name}"
  
  # Other parameters...

  lifecycle {
    create_before_destroy = true
  }
}
```

x??

---


#### Dependent ASG Name on Launch Configuration
To ensure that the ASG's name changes every time the launch configuration is updated, making it necessary for Terraform to replace the ASG.

Background context: By directly depending on the name of the launch configuration in the ASG’s name parameter, you can force a replacement whenever there are updates to the launch config. This ensures that the ASG and its associated instances stay synchronized with any changes made to the underlying infrastructure.

:p How do you ensure the ASG's name changes when the launch configuration is updated?
??x
By explicitly depending on the name of the launch configuration in the ASG’s `name` parameter, you can force a replacement every time there are updates to the launch config. This ensures that the ASG and its associated instances stay synchronized with any changes made to the underlying infrastructure.

```hcl
resource "aws_autoscaling_group" "example" {
  name = "${var.cluster_name}-${aws_launch_configuration.example.name}"
  
  # Other parameters...
}
```

x??

---


---
#### Initial State of ASG
Background context: The deployment process starts with an existing Auto Scaling Group (ASG) running version 1 of your application. This state is a prerequisite for understanding how zero-downtime deployments work.

:p What is the initial state of the Auto Scaling Group before deploying a new version?
??x
The initial state has an ASG running v1 of the code.
x??

---


#### Load Balancer Routing
Background context: Once the new ASG has enough healthy instances (determined by `min_elb_capacity`), traffic starts being routed to the new version of your application.

:p How does the load balancer route traffic between old and new versions?
??x
The ALB routes traffic based on which servers are available. Initially, both v1 and v2 versions might be hit alternately. Once enough instances of v2 have registered, it will start handling more requests.
x??

---


#### Phased Undeployment of Old ASG
Background context: After a successful transition, the old ASG starts deregistering from the ALB, followed by shutting down until only the new version remains.

:p What happens when `min_elb_capacity` instances are registered in the new ASG?
??x
Once `min_elb_capacity` instances of the v2 ASG have registered and passed health checks, Terraform begins undeploying the old ASG. This involves deregistering servers from the ALB and then shutting them down.
x??

---


#### Zero-Downtime Deployment Demonstration
Background context: To verify the zero-downtime deployment, you can make changes to parameters like `server_text` and observe traffic alternation using a continuous curl command.

:p How can you demonstrate the zero-downtime process?
??x
You can update a parameter (e.g., `server_text`) and run `apply`. Using a Bash one-liner, continuously hit the ALB URL with `curl`, observing how requests alternate between old and new versions.
x??

---

