# High-Quality Flashcards: 4A008---Terraform_-Up-and-Running_-Writing-Infrastructure-as-Code-OReilly-Media-2022_processed (Part 22)


**Starting Chapter:** Deploying Docker Containers in AWS Using Elastic Kubernetes Service

---


#### IAM Role for EKS Control Plane
The following code snippet creates an IAM role specifically for the EKS control plane, allowing it to assume roles necessary for cluster management. The role is attached with a managed policy that provides required permissions.

:p What does this code do in terms of setting up the IAM role?
??x
This code sets up an IAM role named after the specified EKS cluster (`${var.name}-cluster-role`). It allows the EKS service to assume this role and attaches it with a managed policy `AmazonEKSClusterPolicy` that provides necessary permissions.

```pseudocode
// Create an IAM Role for EKS Control Plane
resource "aws_iam_role" "cluster" {
  name               = "${var.name}-cluster-role"
  
  // Policy Document to Allow EKS to Assume the Role
  assume_role_policy = data.aws_iam_policy_document.cluster_assume_role.json
  
  // Attach a Managed Policy for Permissions
  policy {
    arn = "arn:aws:iam::aws:policy/AmazonEKSClusterPolicy"
  }
}

// Data Source for IAM Policy Document to Allow EKS to Assume the Role
data "aws_iam_policy_document" "cluster_assume_role" {
  statement {
    effect   = "Allow"
    actions  = ["sts:AssumeRole"]
    
    principals {
      type         = "Service"
      identifiers  = ["eks.amazonaws.com"]
    }
  }
}
```
??x
---

---


#### Creating an IAM Role for EKS Node Group
Background context: To enable managed node groups, you need to create an IAM role that the EC2 instances can assume. This role should have necessary permissions.

:p How do you create an IAM role for the EKS node group using Terraform?
??x
You can create an IAM role by using the `resource "aws_iam_role" "node_group"` resource and attach multiple policies to it.
```terraform
resource "aws_iam_role" "node_group" {
  name               = "${var.name}-node-group"
  assume_role_policy = data.aws_iam_policy_document.node_assume_role.json
}

data "aws_iam_policy_document" "node_assume_role" {
  statement {
    effect   = "Allow"
    actions  = ["sts:AssumeRole"]
    principals {
      type         = "Service"
      identifiers  = ["ec2.amazonaws.com"]
    }
  }
}

resource "aws_iam_role_policy_attachment" "AmazonEKSWorkerNodePolicy" {
  policy_arn  = "arn:aws:iam::aws:policy/AmazonEKSWorkerNodePolicy"
  role       = aws_iam_role.node_group.name
}

resource "aws_iam_role_policy_attachment" "AmazonEC2ContainerRegistryReadOnly" {
  policy_arn  = "arn:aws:iam::aws:policy/AmazonEC2ContainerRegistryReadOnly"
  role       = aws_iam_role.node_group.name
}

resource "aws_iam_role_policy_attachment" "AmazonEKS_CNI_Policy" {
  policy_arn  = "arn:aws:iam::aws:policy/AmazonEKS_CNI_Policy"
  role       = aws_iam_role.node_group.name
}
```
x??

---


#### Testing the Deployed Application
Background context: After deploying an application using Terraform with EKS, it's essential to verify its functionality. This involves testing the application via a URL provided by the service endpoint.

:p How can you test the application deployed in the EKS cluster after running `terraform apply`?
??x
You can test the application by using the `curl` command on the `service_endpoint` provided in the Terraform output:

```sh
$curl http://774696355.us-east-2.elb.amazonaws.com
```

This command sends a request to the load balancer, and if everything is set up correctly, you should receive a response like "Hello Terraform." This confirms that the application is running and accessible via the provided URL.

x??

---


#### Using kubectl to Inspect Kubernetes Cluster
Background context: After deploying an application using Terraform on EKS, you can use `kubectl` to inspect various components of your Kubernetes cluster such as nodes, deployments, pods, and services. This involves authenticating to the EKS cluster using AWS CLI commands.

:p How do you authenticate `kubectl` to interact with an EKS cluster?
??x
You can authenticate `kubectl` to interact with an EKS cluster by running:

```sh$ aws eks update-kubeconfig --region <REGION> --name <EKS_CLUSTER_NAME>
```

Replace `<REGION>` and `<EKS_CLUSTER_NAME>` with the appropriate values. For example, if your region is `us-east-2` and your cluster name is `kubernetes-example`, you would run:

```sh
$ aws eks update-kubeconfig --region us-east-2 --name kubernetes-example
```

This command updates your local Kubernetes configuration file (`~/.kube/config`) with the necessary credentials to interact with the specified EKS cluster.

x??

---

---


#### Using Off-the-Shelf Production-Grade Kubernetes Modules
Background context: The use of off-the-shelf production-grade Kubernetes modules, such as those found in the Gruntwork Infrastructure as Code Library, can simplify deploying EKS clusters and Kubernetes applications. These modules help ensure consistency and reduce the risk of configuration errors.
:p How should private subnets be used for an EKS cluster instead of default VPC and public subnets?
??x
To use private subnets for your EKS cluster, you should configure the EKS cluster within a VPC that uses only private subnets. This approach enhances security by isolating the Kubernetes workloads from internet exposure.
```terraform
resource "aws_vpc" "example" {
  cidr_block = "10.0.0.0/16"
}

resource "aws_subnet" "private" {
  count             = 3
  vpc_id            = aws_vpc.example.id
  cidr_block        = ["10.0.${count.index + 1}.0/24"]
  availability_zone = var.availability_zones[count.index]
}
```
x??

---


#### Using Multiple Providers Sparingly
Background context: While it is possible to use multiple providers in a single Terraform module, doing so is generally discouraged due to issues related to dependency ordering and isolation. Each provider should ideally be isolated in its own module.
:p Why shouldn’t you use multiple providers in the same module?
??x
Using multiple providers in the same module can lead to issues with dependency ordering between different cloud services or Kubernetes resources, making debugging and maintaining your infrastructure more challenging. Moreover, it increases the blast radius if something goes wrong, affecting all resources managed by those providers.
```terraform
provider "aws" {
  alias  = "example"
  region = var.region1
}

provider "kubernetes" {
  config_path = "~/.kube/config"
}
```
x??

---


#### Handling Multiple AWS Regions, Accounts, and Clouds
Background context: To support deployment across multiple AWS regions, accounts, or other clouds, you can use multiple provider blocks in your Terraform code. Each block is configured with the appropriate region, assume_role, or cloud-specific settings.
:p How should you deploy to multiple AWS regions using Terraform?
??x
To deploy resources to multiple AWS regions, you would configure separate provider blocks for each region and apply the configuration files accordingly. This ensures that each deployment is isolated and can be managed independently.
```terraform
# Provider block for Region 1
provider "aws" {
  alias  = "region1"
  region = var.region1
}

# Provider block for Region 2
provider "aws" {
  alias  = "region2"
  region = var.region2
}
```
x??

---

---


#### Production-Grade Infrastructure Checklist

Background context: The passage suggests that building production-grade infrastructure is challenging and time-consuming. It provides a framework for evaluating the readiness of an infrastructure project to be production-ready, including aspects like security, data integrity, and fault tolerance.

:p What is included in the production-grade infrastructure checklist?
??x
The production-grade infrastructure checklist should include several critical factors such as:
- Ensuring that your infrastructure can handle increased traffic without falling over.
- Making sure your data remains safe even during outages.
- Protecting your data from potential breaches by hackers.
- Assessing whether all these measures would prevent the failure of your company if something goes wrong.

Example checklist items might include:
1. High availability and redundancy
2. Data backup and recovery plans
3. Network security configurations
4. Regular updates and patch management

x??

---


#### Production-Grade Infrastructure Modules

Background context: The passage emphasizes the importance of reusable, production-grade modules in building infrastructure. These modules are designed to be small, composable, testable, versioned, and extend beyond just Terraform.

:p What types of production-grade infrastructure modules should you consider?
??x
You should consider creating the following types of production-grade infrastructure modules:
- **Small modules**: Focused on specific components or services.
- **Composable modules**: Can be combined to form larger systems.
- **Testable modules**: Include automated tests for reliability and correctness.
- **Versioned modules**: Allow tracking changes over time with version control.

Example pseudocode for a small, composable module might look like this:
```terraform
module "vpc" {
  source = "./modules/vpc"
}

module "eks_cluster" {
  source = "./modules/eks"
}
```
x??

---

