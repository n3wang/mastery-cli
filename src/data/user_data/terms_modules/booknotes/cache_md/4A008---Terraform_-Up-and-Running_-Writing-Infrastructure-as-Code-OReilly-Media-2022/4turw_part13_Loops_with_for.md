# High-Quality Flashcards: 4A008---Terraform_-Up-and-Running_-Writing-Infrastructure-as-Code-OReilly-Media-2022_processed (Part 13)


**Starting Chapter:** Loops with for_each Expressions

---


#### Introducing for_each
Background context: To address the limitations of `count`, Terraform 0.12 introduced `for_each`. This allows you to loop over sets or maps, making it more flexible and avoiding unintended deletions and recreations.

:p How does `for_each` handle the creation of IAM users?
??x
`for_each` creates resources based on a set or map, ensuring that only the specified items are created or updated. It avoids unnecessary deletions and recreations by leveraging the identity provided through each.key or each.value.

Example:
```hcl
resource "aws_iam_user" "example" {
  for_each = toset(var.user_names)
  name    = each.value
}
```
Here, `toset(var.user_names)` converts the list into a set, and each IAM user is created based on the values in `var.user_names`.

x??

---


#### Output Changes with for_each
Background context: When using `for_each`, Terraform’s output representation changes from an array or map to a map of resources. This impacts how you access and utilize outputs.

:p How does the output change when using `for_each`?
??x
When you use `for_each` on a resource, the output becomes a map where keys are derived from the items in your collection (e.g., each.key or each.value). This means that accessing resources via an output now requires referencing by key.

Example:
```hcl
output "all_users" {
  value = aws_iam_user.example
}
```
The `aws_iam_user.example` will be a map of resources, and you can access it using keys like `aws_iam_user.example["neo"]`.

x??

---

---


#### For_each vs Count in Terraform
Background context explaining the concept. The `for_each` and `count` blocks are both used to create multiple resources, but they have different behaviors and use cases. Here’s a brief comparison:
- **Count**: Creates a fixed number of copies based on an integer value.
- **For_each**: Creates copies based on a map or set data type.

Terraform uses these constructs to manage collections of resources dynamically. The `for_each` block is particularly useful when the number and names of resources are determined at runtime, such as when creating multiple IAM users with unique names from a variable list.
:p What is the key difference between `count` and `for_each` in Terraform?
??x
The primary difference lies in how they handle resource creation. While `count` creates a fixed number of identical copies, `for_each` allows you to create resources based on dynamic lists or maps, providing more flexibility for managing unique resources.
For example:
```hcl
variable "user_names" {
  type = list(string)
}

resource "aws_iam_user" "example" {
  count    = length(var.user_names)
  name     = element(var.user_names, count.index)
}
```
versus using `for_each`:
```hcl
variable "user_names" {
  type = set(string)
}

resource "aws_iam_user" "example" {
  for_each = toset(var.user_names)

  name     = each.value
}
```
In the `count` example, you always have a fixed number of resources. In the `for_each` example, the number and names are determined by the elements in `var.user_names`.
x??

---


#### Output Variables for Dynamic Resources
Background context explaining how Terraform handles dynamic resource outputs.
When using `for_each`, the output variables differ from those used with `count`. With `for_each`, you get a map where each key is an item from your input, and values contain all attributes of that specific resource. You can use this to create more detailed or useful outputs than simple arrays.

:p How do you extract ARNs for multiple IAM users created using `for_each`?
??x
To extract the ARNs for resources created with `for_each`, you need to map over the values and collect only those attributes.
```hcl
output "all_arns" {
  value = values(aws_iam_user.example)[*].arn
}
```
This line of code uses the `values` function to get all ARNs from the output, effectively creating an array of ARNs for each user.

:p How does this differ from using a simple `count` block?
??x
Using a `count` block would typically result in a list of resources, which could be less useful when dealing with unique resources like IAM users. With `for_each`, you get a more structured output as a map, where each key corresponds to the specific user name, and the value contains all attributes for that user.

Example:
```hcl
output "all_users" {
  value = aws_iam_user.example
}
```
This outputs a map of IAM users, making it easier to reference individual resources later.
x??

---


#### Module Usage with for_each
Background context explaining how modules can be used in Terraform and the `for_each` block.
Terraform’s module feature allows you to abstract complex configurations into reusable components. When using a module, you can pass variables that determine its behavior.

:p How do you create multiple IAM users using a module with `for_each`?
??x
To use a module with `for_each`, you define the module block and set the `for_each` attribute to a dynamic list or map:
```hcl
module "users" {
  source = "../../../modules/landing-zone/iam-user"

  for_each = toset(var.user_names)

  user_name = each.value
}
```
This code creates multiple instances of the `iam-user` module, one for each item in `var.user_names`.

:p How do you output ARNs from a module using `for_each`?
??x
You can use the `module` function to access the outputs of the modules and then map over them to extract specific attributes:
```hcl
output "user_arns" {
  value       = values(module.users)[*].user_arn
  description = "The ARNs of the created IAM users"
}
```
This output variable collects all `user_arn` outputs from each module and creates an array with those ARNs.

:x??
---

---


#### Adding Custom Tags Using for_each
Background context: The passage discusses how to use `for_each` to dynamically generate tag inline blocks within a resource, specifically an Auto Scaling Group (ASG), by iterating over custom tags specified as input variables. This allows for flexible and automated tagging of infrastructure resources.

:p How can you use `for_each` to dynamically add custom tags to an ASG in Terraform?
??x
To use `for_each`, you define a dynamic block with a collection to iterate over, such as the `custom_tags` map. Within this block, you access each key and value pair using `.key` and `.value`, respectively.

```hcl
resource "aws_autoscaling_group" "example" {
  launch_configuration = aws_launch_configuration.example.name
  vpc_zone_identifier   = data.aws_subnets.default.ids
  target_group_arns     = [aws_lb_target_group.asg.arn]
  health_check_type     = "ELB"
  min_size              = var.min_size
  max_size              = var.max_size

  dynamic "tag" {
    for_each = var.custom_tags
    content {
      key                  = tag.key
      value                = tag.value
      propagate_at_launch  = true
    }
  }
}
```

This approach allows you to specify multiple tags dynamically, making your infrastructure more flexible and easier to manage.
x??

---


#### Dynamic Tag Generation with for_each
Background context: The passage describes how to use `for_each` in a dynamic block to generate multiple tag blocks based on input variables. This is particularly useful for applying consistent tagging across multiple resources.

:p How does the `for_each` expression work within a resource block in Terraform?
??x
The `for_each` expression allows you to iterate over a collection (like a map or list) and apply inline content for each item. Here's an example of how it works:

```hcl
resource "aws_autoscaling_group" "example" {
  launch_configuration = aws_launch_configuration.example.name
  vpc_zone_identifier   = data.aws_subnets.default.ids
  target_group_arns     = [aws_lb_target_group.asg.arn]
  health_check_type     = "ELB"
  min_size              = var.min_size
  max_size              = var.max_size

  dynamic "tag" {
    for_each = var.custom_tags
    content {
      key                  = tag.key
      value                = tag.value
      propagate_at_launch  = true
    }
  }
}
```

In this example, `var.custom_tags` is a map of tags. For each key-value pair in the map, a new `tag` block is generated with the corresponding `key` and `value`.

Here's what happens step-by-step:
1. `for_each = var.custom_tags`: Iterates over each key-value pair in the `custom_tags` map.
2. Inside the dynamic block, `tag.key` and `tag.value` are used to set the tag properties.

This ensures that all tags defined in `var.custom_tags` are applied to the ASG.
x??

---

---


#### Dynamic Tag Generation Using `for_each` in Terraform

Background context: When using the `for_each` loop with a list or map, you can dynamically generate resource blocks. In this example, we see how to use `dynamic` blocks within an AWS Auto Scaling Group (ASG) resource to add custom tags based on a variable.

If applicable, include code examples explaining the logic:
```hcl
resource "aws_autoscaling_group" "example" {
  launch_configuration = aws_launch_configuration.example.name
  vpc_zone_identifier   = data.aws_subnets.default.ids
  target_group_arns     = [aws_lb_target_group.asg.arn]
  health_check_type     = "ELB"
  min_size              = var.min_size
  max_size              = var.max_size

  tag {
    key                 = "Name"
    value               = var.cluster_name
    propagate_at_launch = true
  }

  dynamic "tag" {
    for_each = var.custom_tags

    content {
      key                  = tag.key
      value                = tag.value
      propagate_at_launch  = true
    }
  }
}
```

:p How can you dynamically generate custom tags using the `dynamic` block in an AWS Auto Scaling Group resource?
??x
You can use a `dynamic` block with a variable containing key-value pairs to create multiple `tag` blocks. This allows you to programmatically add any number of tags based on input variables, ensuring that each ASG instance gets the required tags.

The logic behind this is that `for_each = var.custom_tags` iterates over each item in `var.custom_tags`, and for each iteration, a new `tag` block is generated with the key and value from the current item. Here’s an example of how you might define `var.custom_tags`:

```hcl
variable "custom_tags" {
  default = [
    {key: "Owner", value: "team-foo"},
    {key: "ManagedBy", value: "terraform"}
  ]
}
```

Then, in the ASG resource:
```hcl
dynamic "tag" {
  for_each = var.custom_tags

  content {
    key                  = tag.key
    value                = tag.value
    propagate_at_launch  = true
  }
}
```
This results in multiple `tag` blocks being created based on the length of `var.custom_tags`.

x??

---


#### For Expressions in Terraform
Background context: In Chapter 5, you'll learn about loops and conditionals to manage resources more efficiently. One of the advanced features is the `for` expression, which allows for transforming lists and maps into output values or resource instances.

The basic syntax of a `for` expression is as follows:
```terraform
[for <ITEM> in <LIST> : <OUTPUT> ]
```
- **LIST**: A list to loop over.
- **ITEM**: The local variable name assigned to each item in the LIST.
- **OUTPUT**: An expression that transforms the ITEM.

For example, you can transform a list of names into uppercase:
```terraform
output "upper_names" {
  value = [for name in var.names : upper(name)]
}
```

:p How does Terraform's `for` expression work for transforming lists?
??x
The `for` expression allows you to loop over each item in the provided list and apply a transformation, such as converting all names to uppercase. For example:
```terraform
output "upper_names" {
  value = [for name in var.names : upper(name)]
}
```
When this Terraform code is applied, it will output an array of the transformed items.

If you need to filter or add conditions based on each item, you can do so within the `for` expression:
```terraform
output "short_upper_names" {
  value = [for name in var.names : upper(name) if length(name) < 5]
}
```
This will only include names with a length less than 5 and convert them to uppercase.

x??

---


#### For Expressions with Maps
Background context: In addition to lists, Terraform's `for` expression can also be used on maps. This allows you to loop over the key-value pairs in a map and apply transformations or conditions based on each pair.

The syntax for looping over a map is:
```terraform
[for <KEY>, <VALUE> in <MAP> : <OUTPUT> ]
```
- **MAP**: A map to loop over.
- **KEY**: The local variable name assigned to the key of each key-value pair in the MAP.
- **VALUE**: The local variable name assigned to the value of each key-value pair in the MAP.
- **OUTPUT**: An expression that transforms KEY and VALUE.

For example, you can define a map for heroes with their roles:
```terraform
variable "hero_thousand_faces" {
  description = "map"
  type        = map(string)
  default     = {
    neo      = "hero"
    trinity  = "love interest"
    morpheus = "mentor"
  }
}
```

:p How do you use a `for` expression to loop over a map in Terraform?
??x
To use a `for` expression with a map, you specify the keys and values using `<KEY>, <VALUE>`, where `<KEY>` is assigned to each key and `<VALUE>` is assigned to each value. You can then perform operations on both or apply conditions.

Example:
```terraform
variable "hero_thousand_faces" {
  description = "map"
  type        = map(string)
  default     = {
    neo      = "hero"
    trinity  = "love interest"
    morpheus = "mentor"
  }
}
output "roles_of_heroes" {
  value = [for key, value in var.hero_thousand_faces : { role = key, description = value }]
}
```

This will output an array of maps where each map contains the key (hero name) and the corresponding value (role).

x??

---


#### For Expressions - Filtering and Transforming
Background context: Terraform's `for` expression allows for both transforming elements in a list or map and filtering them based on specific conditions. This is particularly useful when you need to process complex data structures.

For example, combining transformations with conditions:
```terraform
output "short_upper_names" {
  value = [for name in var.names : upper(name) if length(name) < 5]
}
```

:p Can you provide an example of using `for` expression with filtering?
??x
Yes, you can use the `for` expression to both transform and filter elements. Here’s an example:

```terraform
output "short_upper_names" {
  value = [for name in var.names : upper(name) if length(name) < 5]
}
```

In this example:
- The `names` variable is a list of names.
- The `upper(name)` function converts each name to uppercase.
- The `if length(name) < 5` condition ensures only names with fewer than 5 characters are included in the final output.

This will result in an array containing only the uppercase versions of names that have less than five characters.

x??

---


#### List Comprehensions in Python
Background context: Python offers a concise and readable way to create lists using list comprehensions. This can be seen as an analogy for how Terraform's `for` expressions work, but with some differences. In Python, the syntax is:

```python
upper_case_names = [name.upper() for name in names]
```

:p How does Python use list comprehensions to transform a list?
??x
In Python, you can create lists of transformed elements using list comprehensions. For example:
```python
names = ["neo", "trinity", "morpheus"]
upper_case_names = [name.upper() for name in names]
```

This code will output `['NEO', 'TRINITY', 'MORPHEUS']`. You can also add conditions to filter the resulting list:
```python
short_upper_case_names = [name.upper() for name in names if len(name) < 5]
```
This will result in `['NEO']`.

x??

---

---


#### For Expressions for Lists

Background context: The provided text explains how to use `for` expressions in Terraform to generate a list of strings. This is useful for creating dynamic outputs based on input variables.

:p What does the `for` expression used with lists do?
??x
The `for` expression with lists allows you to create a list by iterating over an input collection (like a variable containing a list) and generating new elements in the output list.

Example:
```terraform
output "bios" {
  value = [for name, role in var.hero_thousand_faces : "${name} is the ${role}"]
}
```
This will loop through each element in `var.hero_thousand_faces` (a map where keys are names and values are roles) and generate a string for each pair.

??x
The answer with detailed explanations.
```terraform
output "bios" {
  value = [for name, role in var.hero_thousand_faces : "${name} is the ${role}"]
}
```
In this example, `var.hero_thousand_faces` is a map where keys are names and values are roles. The `for` expression iterates over each key-value pair (name, role), and for each iteration, it generates a string in the format `${name} is the ${role}`.

The resulting list will be:
```plaintext
[
  "morpheus is the mentor",
  "neo is the hero",
  "trinity is the love interest"
]
```
??x

---


#### For Expressions for Maps

Background context: The text also explains how to use `for` expressions with maps to output a map of key-value pairs, where each pair consists of the transformed key and value.

:p How can you transform keys and values in a map using `for` expressions?
??x
You can transform both keys and values in a map by using a `for` expression. This is done by specifying an output key and value for each iteration of the collection (map).

Example:
```terraform
output "upper_roles" {
  value = {for name, role in var.hero_thousand_faces : upper(name) => upper(role)}
}
```
This will loop through each key-value pair in `var.hero_thousand_faces`, transform both keys and values to uppercase using the `upper` function, and create a new map with these transformed key-value pairs.

??x
The answer with detailed explanations.
```terraform
output "upper_roles" {
  value = {for name, role in var.hero_thousand_faces : upper(name) => upper(role)}
}
```
In this example, the `for` expression iterates over each key-value pair (name, role) in `var.hero_thousand_faces`. For each iteration, it transforms both the key (`name`) and value (`role`) to uppercase using the `upper` function.

The resulting map will be:
```plaintext
{
  "MORPHEUS" = "MENTOR"
  "NEO" = "HERO"
  "TRINITY" = "LOVE INTEREST"
}
```
??x

---

