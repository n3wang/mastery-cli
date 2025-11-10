# High-Quality Flashcards: 4A008---Terraform_-Up-and-Running_-Writing-Infrastructure-as-Code-OReilly-Media-2022_processed (Part 21)


**Starting Chapter:** Creating Modules That Can Work with Multiple Providers

---


#### Reusable Modules in Terraform
Background context: In Terraform, modules can be used to create reusable components that are combined with other modules and resources. Root modules combine these reusable modules into a deployable unit. The challenge is creating reusable modules that work with multiple providers without hardcoding provider blocks.
:p What is the issue with defining provider blocks within reusable modules?
??x
Defining provider blocks within reusable modules can cause several issues:
- **Configuration problems**: Providers control various configurations like authentication, regions, and roles. Exposing these as input variables makes the module complex to maintain.
- **Duplication problems**: Reusing a module across multiple providers requires passing in numerous parameters, leading to code duplication.
- **Performance problems**: Multiple provider blocks can lead to Terraform spinning up more processes, which may cause performance issues at scale.

Example:
```hcl
# Incorrect: Hardcoded provider block in reusable module
module "example" {
  source = "path/to/module"
  
  # Hardcoded provider block (bad practice)
  provider "aws" {
    region = "us-east-1"
  }
}
```
x??

#### Required Providers Block
Background context: To address the issues with hardcoded provider blocks in reusable modules, Terraform allows defining configuration aliases within a `required_providers` block. This forces users to explicitly pass providers when using these modules.
:p How does the `required_providers` block help manage multiple providers in Terraform?
??x
The `required_providers` block helps by requiring users to define and pass provider blocks explicitly, rather than having them hidden within a module.

Example:
```hcl
# Correct: Using required_providers for configuration aliases
terraform {
  required_providers {
    aws = {
      source                 = "hashicorp/aws"
      version                = "~> 4.0"
      configuration_aliases = [aws.parent, aws.child]
    }
  }
}

data "aws_caller_identity" "parent" {
  provider = aws.parent
}

data "aws_caller_identity" "child" {
  provider = aws.child
}
```
x??

#### Provider Aliases and Configuration Aliases
Background context: `provider` aliases can be used to reference different AWS regions or accounts, but in reusable modules, it's best practice not to define any provider blocks. Instead, use configuration aliases defined in the root module.
:p What is the difference between a normal `provider` alias and a `configuration_alias`?
??x
A `normal provider` alias defines a provider block within a Terraform file, whereas a `configuration_alias` does not create a new provider but forces users to pass in providers explicitly via a `providers` map.

Example:
```hcl
# Using configuration aliases in root module
provider "aws" {
  region = "us-east-2"
  alias = "parent"

  assume_role {
    role_arn = "arn:aws:iam::111111111111:role/ParentRole"
  }
}

provider "aws" {
  region = "us-east-2"
  alias = "child"

  assume_role {
    role_arn = "arn:aws:iam::222222222222:role/ChildRole"
  }
}

module "multi_account_example" {
  source = "../../modules/multi-account"
  
  providers = {
    aws.parent = aws.parent
    aws.child = aws.child
  }
}
```
x??

#### Best Practices for Multi-Account Code
Background context: When working with multiple AWS accounts, it’s important to maintain separation and avoid unintentional coupling. Reusable modules that define provider blocks can lead to issues like hardcoding configuration or performance problems.
:p What best practice should be followed when creating reusable Terraform modules for multi-account deployments?
??x
For multi-account Terraform modules:
- Avoid defining any provider blocks in the module itself.
- Use `required_providers` and `configuration_aliases` to allow users to pass necessary configurations explicitly.
- Ensure that provider blocks are defined only in the root module where `apply` is run.

Example:
```hcl
# Correct multi-account module setup
module "multi_account_example" {
  source = "../../modules/multi-account"
  
  providers = {
    aws.parent = aws.parent
    aws.child = aws.child
  }
}
```
x??

---


#### Multiple Different Providers
Background context explaining the need to use different cloud providers and how managing multiple clouds in a single module can be impractical. Examples include AWS, Azure, and Google Cloud.

:p How does using Terraform with multiple different providers differ from using multiple instances of the same provider?
??x
Using multiple different providers requires defining each provider explicitly in the `providers` block or referencing them through configuration aliases. This differs from using multiple instances of the same provider, which can be managed by simply adding more blocks.

```hcl
# Example with AWS and Kubernetes providers
provider "aws" {}
provider "kubernetes" {}
```
x??

---


#### Docker Crash Course
Background context explaining that Docker images are self-contained snapshots of the operating system, software, and other relevant details. This is essential for understanding how containers can be deployed in cloud environments.

:p What does a Docker image contain?
??x
A Docker image contains everything needed to run an application: the code, runtime, dependencies, libraries, environment variables, and configuration files. It acts as a snapshot of the operating system (OS) and all necessary components required for the application to function.

```bash
# Example command to build a Docker image
docker build -t my-app-image .
```
x??

---


#### Kubernetes Crash Course
Background context explaining Kubernetes' role in managing applications, networks, data stores, load balancers, secret stores, etc. This provides background on why Kubernetes is considered a cloud of its own.

:p What are some of the capabilities managed by Kubernetes?
??x
Kubernetes can manage various components such as applications, network services, storage systems, load balancers, and secret management. It abstracts these functionalities to provide a consistent platform for deploying and managing containerized applications across different environments.

```bash
# Example command to deploy a Kubernetes deployment
kubectl apply -f my-app-deployment.yaml
```
x??

---


#### Deploying Docker Containers in AWS EKS
Background context explaining the process of using Elastic Kubernetes Service (EKS) on AWS to deploy containers. This involves setting up an EKS cluster and deploying applications.

:p How does one set up a basic EKS cluster for deploying Dockerized applications?
??x
To set up a basic EKS cluster, you need to first create the cluster and then deploy your application using Kubernetes resources like deployments and services.

```hcl
# Example Terraform configuration for creating an EKS cluster
resource "aws_eks_cluster" "example" {
  name     = "my-cluster"
  role_arn = aws_iam_role.example.arn

  # Additional configurations here
}

resource "kubernetes_deployment" "example" {
  metadata {
    name = "my-app"
  }

  spec {
    replicas = 3

    template {
      metadata {
        labels = { app = "my-app" }
      }

      spec {
        containers {
          image = "nginx:latest"
          name  = "web"
        }
      }
    }
  }
}
```
x??
---

---


#### Verifying the Container Environment
Background context: This example shows how to verify that a container running Ubuntu 20.04 is correctly set up by checking system information using `cat /etc/os-release`.
:p How do you check if you are running inside an Ubuntu 20.04 environment?
??x
To check the version and details of your current Ubuntu 20.04 environment, use the following command:
```bash
root@d96ad3779966:/# cat /etc/os-release
```
This will output information such as the name (Ubuntu), version number (20.04.3 LTS), and codename (Focal Fossa).
x??

---


#### Understanding Docker Containers and Isolation
Background context: This explanation covers how Docker containers are isolated at the userspace level, meaning you can only see the filesystem, memory, networking, etc., within the container.
:p How does a Docker container isolate its environment?
??x
Docker containers are isolated from each other and the host system. When inside a container, you can access only the resources (file systems, processes, network) that belong to that container. The isolation is achieved through namespaces in Linux, which allow for separate instances of these resources.
For example, running `ls -al` within the container shows files related to the container's filesystem, but it does not reveal any data from other containers or the host system.
x??

---

---


#### Docker Image Self-Contained Nature
Background context: Docker images are self-contained and portable, ensuring that applications run consistently across different environments. This is because they include everything needed to run an application—code, runtime, system tools, and libraries—and encapsulate it within a single package.

:p What does the term "self-contained" mean in the context of Docker images?
??x
The term "self-contained" means that each Docker image includes all necessary components required for its operation, making it independent from the host environment. This ensures consistency when running applications across different systems.
x??

---


#### Container Isolation from Host OS
Background context: Containers run on top of the host operating system but are isolated from it as well as other containers. Each container has its own file system, network stack, and process space.

:p What does it mean for a container to be "isolated" from both the host OS and other containers?
??x
Isolation in Docker means that each container operates independently with its own filesystem, networking, and processes. This separation ensures that changes or failures within one container do not affect others or the host system.
x??

---


#### Quick Startup of Containers vs Virtual Machines
Background context: Containers start much faster than virtual machines because they share the kernel of the host OS but still have their own isolated environment for applications.

:p How does a Docker container's lightweight nature contribute to its quick startup time compared to virtual machines?
??x
Docker containers are lightweight and boot up quickly because they reuse the underlying host operating system's kernel, which reduces the overhead associated with full virtualization. This allows for rapid instantiation without starting a complete OS environment.
x??

---


#### Docker Port Mapping
Background context: When running a Docker container, by default, ports inside the container are not exposed to the host operating system. This means that accessing services running inside a container from the host OS requires specific configuration.

Explanation: If you try to access a service running inside a container on `localhost` (the host machine), it won't work because the port is only accessible within the container itself and not mapped to an external IP or port.

:p What happens when you run a Docker container without mapping ports?
??x
When you run a Docker container without mapping ports, the service running inside the container will be accessible only from within the container. Attempting to access it via `localhost` on the host machine will result in a "Connection refused" error.
```bash
$ docker run -it training/webapp python app.py
```

You then try:

```bash
$ curl localhost:5000
curl: (7) Failed to connect to localhost port 5000: Connection refused
```
x??

---


#### Kubernetes Overview and Basics
Background context: Kubernetes is an orchestration tool for Docker that helps manage Docker containers across multiple servers. It handles tasks such as scheduling, auto-healing, auto-scaling, load balancing, etc.

Explanation: The main components of a Kubernetes cluster are the control plane and worker nodes. The control plane manages the state of the cluster and schedules containers, while worker nodes run the actual containers based on instructions from the control plane.

:p What is Kubernetes used for?
??x
Kubernetes is used to manage Docker containers across multiple servers. It automates tasks such as scheduling (choosing which server should run a container), auto-healing (automatically redeploying failed containers), auto-scaling (scaling the number of containers based on load), and load balancing (distributing traffic across containers).

Kubernetes is particularly useful for running applications in production environments, especially those with complex requirements like scaling and failover.
x??

---


#### Enabling Kubernetes on Docker Desktop

Background context: To enable Kubernetes for local development, you need to have Docker Desktop installed and configured. Once enabled, it provides a convenient way to set up a local cluster that can be used to run and test applications using Kubernetes.

:p How do you enable Kubernetes in Docker Desktop?
??x
To enable Kubernetes on Docker Desktop, check the "Enable Kubernetes" checkbox if not already enabled, then click "Apply & Restart." After a few minutes of setup, follow the instructions from the Kubernetes website to install `kubectl`, the command-line tool for interacting with Kubernetes.

```bash
# Install kubectl and configure it.
$ curl -LO https://dl.k8s.io/release/$(curl -L -s https://dl.k8s.io/stable-server/binaries.list | grep /linux/amd64/kubectl)
$ chmod +x ./kubectl
$ sudo mv ./kubectl /usr/local/bin/
```

You will need to update the configuration file located in `$HOME/.kube/config` so that `kubectl` knows which Kubernetes cluster to connect to. When you enable Kubernetes through Docker Desktop, it updates this config file for you by adding a `docker-desktop` entry.

??x
:p How do you switch to using the `docker-desktop` context with `kubectl`?
??x
To use the `docker-desktop` context with `kubectl`, run:

```bash
$ kubectl config use-context docker-desktop
Switched to context "docker-desktop".
```

This command tells `kubectl` which cluster configuration to use. After running this, you can check if your Kubernetes cluster is working by using the following command:

```bash
$ kubectl get nodes
```

If everything is set up correctly, you should see information about the node(s) in your local cluster.

??x
:p What does the `kubectl get nodes` command output indicate?
??x
The `kubectl get nodes` command shows details of all nodes in your Kubernetes cluster. For a locally running setup like Docker Desktop, this usually means only one node (your computer), which is both a control plane and a worker node.

Example output:

```
NAME             STATUS   ROLES                  AGE   VERSION
docker-desktop   Ready    control-plane,master   95m   v1.22.5
```

This indicates that the `docker-desktop` cluster has one ready node with roles as both a control plane and master, running Kubernetes version `v1.22.5`.

??x
:p What are Kubernetes Deployments?
??x
Kubernetes Deployments provide a declarative way to manage application replicas in a Kubernetes cluster. You define what Docker images you want to run, how many copies of them (replicas) should be active, resource requirements like CPU and memory limits, port numbers, environment variables, and update strategies.

Example Deployment YAML:
```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: my-app-deployment
spec:
  replicas: 3
  selector:
    matchLabels:
      app: my-app
  template:
    metadata:
      labels:
        app: my-app
    spec:
      containers:
      - name: my-app-container
        image: my-app-image:latest
        ports:
        - containerPort: 8080
```

With this configuration, you specify that `my-app` should run three replicas with the `my-app-image` Docker image. The Deployment ensures that there are always three running instances of the application.

??x
:p What is a Kubernetes Service?
??x
Kubernetes Services provide network load balancing to expose applications running in the cluster. They act as network endpoints, distributing traffic across multiple pods or replicas based on defined rules (like port numbers).

Example Service YAML:
```yaml
apiVersion: v1
kind: Service
metadata:
  name: my-app-service
spec:
  selector:
    app: my-app
  ports:
    - protocol: TCP
      port: 80
      targetPort: 8080
  type: LoadBalancer
```

This service configuration ensures that traffic directed to `my-app-service` gets distributed among the pods labeled with `app: my-app`, using port `8080`.

??x
:p How do you apply Kubernetes objects created from YAML files?
??x
To deploy resources like Deployments and Services, you use the `kubectl apply` command. This command submits the described objects to your cluster.

Example usage:

```bash
$ kubectl apply -f deployment.yaml
$ kubectl apply -f service.yaml
```

Here, `-f` specifies the file containing the YAML configuration for the Deployment or Service you want to create.

??x

---


#### Creating a Terraform Module for Kubernetes Applications
Background context: This concept explains how to create a Terraform module that deploys an application using Kubernetes. The module will use `kubernetes_deployment` and `kubernetes_service` resources to manage the app's lifecycle, configuration, and networking.

:p What is the purpose of creating a Terraform module for deploying applications in Kubernetes?
??x
The purpose is to encapsulate the necessary configurations for deploying an application using Kubernetes within a reusable module. This helps maintain consistency across different environments and makes it easier to scale or update the deployment.

```hcl
module "k8s-app" {
  source = "./modules/services/k8s-app"
}
```

x??

---


#### Defining Input Variables in Terraform
Background context: Input variables define the parameters that a Terraform module requires. These inputs are used to customize the behavior of the module during deployment.

:p What input variables are defined for the `k8s-app` module?
??x
The following input variables are defined:
- name: The name to use for all resources created by this module.
- image: The Docker image to run.
- container_port: The port the Docker image listens on.
- replicas: How many replicas to run.
- environment_variables: Environment variables to set for the app.

```hcl
variable "name" {
  description = "The name to use for all resources created by this module"
  type        = string
}
```

x??

---


#### Defining Pod Template in Kubernetes Deployment
Background context: The `template` block inside the `spec` section defines how the Pods should be created. It includes details like container specifications, labels, and environment variables.

:p How do you define the template for the Pod inside the `kubernetes_deployment` resource?
??x
You define the Pod template by creating a `template` block within the `spec` section:

```hcl
resource "kubernetes_deployment" "app" {
  spec {
    replicas = var.replicas

    template {
      metadata {
        labels = local.pod_labels
      }

      spec {
        container {
          name   = var.name
          image  = var.image
          port {
            container_port = var.container_port
          }
          dynamic "env" {
            for_each = var.environment_variables
            content {
              name  = env.key
              value = env.value
            }
          }
        }
      }
    }
  }
}
```

This block sets the container specifications, including its image and environment variables.

x??

---


#### Pod Template Definition
In Kubernetes, a Pod Template defines the specifications for how the Pods should be created and configured. It includes details like container images, ports, environment variables, and labels.

Background context: When deploying applications to Kubernetes, you often need to specify multiple aspects of your application's deployment, such as which Docker image to use, what ports to expose, and which environment variables are required. The Pod Template is a crucial component that encapsulates these details.
:p What does the Pod Template in this context define?
??x
The Pod Template defines the specifications for running containers within a Kubernetes cluster. It includes the name of the container image, the port it should listen on, and any environment variables needed by the application.

For example:
```hcl
resource "kubernetes_pod" "app" {
  metadata {
    labels = var.pod_labels
  }
  spec {
    container {
      name   = var.name
      image  = var.image
      port {
        container_port = var.container_port
      }
      dynamic "env" {
        for_each = var.environment_variables
        content {
          name   = env.key
          value  = env.value
        }
      }
    }
  }
}
```
x??

---


#### Kubernetes Deployment Specification
A Kubernetes Deployment is a resource that automates the deployment and management of application containers across a cluster. It allows you to update, scale, and manage your containerized applications.

Background context: Deployments in Kubernetes are used to ensure stable rolling updates and rollbacks for your application's Pods. They provide mechanisms like rolling updates and revision history.
:p What is included in the `spec` block of a Kubernetes Deployment?
??x
The `spec` block of a Kubernetes Deployment includes details such as how many replicas should be running, which Pod Template to use, and a selector that targets specific Pods.

For example:
```hcl
resource "kubernetes_deployment" "app" {
  metadata {
    name = var.name
  }
  spec {
    replicas = var.replicas
    template {
      metadata {
        labels = local.pod_labels
      }
      spec {
        container {
          name   = var.name
          image  = var.image
          port {
            container_port = var.container_port
          }
          dynamic "env" {
            for_each = var.environment_variables
            content {
              name   = env.key
              value  = env.value
            }
          }
        }
      }
    }
    selector {
      match_labels = local.pod_labels
    }
  }
}
```
x??

---


#### Kubernetes Service Configuration
A Kubernetes Service allows you to expose an application running on a set of Pods as a network service. It defines policies for routing traffic to the services.

Background context: Services are essential for exposing internal cluster resources and making them available outside the cluster or between different clusters.
:p What does the `kubernetes_service` resource do?
??x
The `kubernetes_service` resource creates a Kubernetes Service that routes traffic to specified Pods based on labels. It can be configured as different types of load balancers depending on your cloud provider.

For example:
```hcl
resource "kubernetes_service" "app" {
  metadata {
    name = var.name
  }
  spec {
    type = "LoadBalancer"
    port {
      port         = 80
      target_port  = var.container_port
      protocol     = "TCP"
    }
    selector = local.pod_labels
  }
}
```
x??

---


#### Selector Block in Kubernetes Deployment
The `selector` block in a Kubernetes Deployment ensures that the Deployment targets specific Pods based on their labels. This is crucial for maintaining consistency between the Deployment and the Pods it manages.

Background context: The `selector` uses label keys and values to target specific sets of Pods. Without a selector, the Deployment would not know which Pods it should manage.
:p What does the `selector` block in a Kubernetes Deployment do?
??x
The `selector` block in a Kubernetes Deployment ensures that the Deployment targets specific Pods based on their labels. It uses label keys and values to match against the metadata of the Pods.

For example:
```hcl
resource "kubernetes_deployment" "app" {
  ...
  spec {
    ...
    selector {
      match_labels = local.pod_labels
    }
  }
}
```
x??

---


#### Dynamic Block for Environment Variables
The `dynamic` block in Terraform allows you to iterate over a list of items and generate multiple blocks based on the contents. In this context, it's used to set environment variables dynamically.

Background context: The dynamic block is useful when dealing with varying numbers or types of environment variables that need to be applied to containers.
:p How does the `dynamic` block work for setting environment variables?
??x
The `dynamic` block in Terraform allows you to iterate over a list of items and generate multiple blocks based on the contents. In this context, it's used to set environment variables dynamically by iterating over the `environment_variables` input variable.

For example:
```hcl
resource "kubernetes_deployment" "app" {
  ...
  spec {
    container {
      ...
      dynamic "env" {
        for_each = var.environment_variables
        content {
          name   = env.key
          value  = env.value
        }
      }
    }
  }
}
```
x??

---


#### Running Terraform Apply
This section describes how to deploy resources using Terraform after configuring the necessary modules and providers.

:p What command is used to see the effects of running `terraform apply`?
??x
The command used to apply the changes defined in the Terraform configuration files is:
```bash
$ terraform apply
```
After executing this command, Terraform will display a plan for the changes it intends to make and ask for your confirmation. Once confirmed, Terraform will execute the plan.

Example output:
```
Apply complete.
```
x??

---

---


#### Kubernetes Deployment and Pods Overview
Kubernetes is a container orchestration platform that automatically deploys, scales, and manages containerized applications. In this context, Deployments ensure that a specified number of pod replicas are running at any time, while Pods encapsulate containers with shared resources.

Deployments handle rolling updates and rolling back functionalities to maintain application availability during changes.
:p What is the difference between using Kubernetes for deploying an app versus using `docker run`?
??x
Kubernetes provides more advanced features such as automatic deployment of multiple replicas, monitoring their health, and ensuring that the desired number of containers are running. It also handles load balancing across these containers and can automatically replace failed or unhealthy containers.

In contrast, `docker run` only starts a single container without any additional management capabilities.
x??

---


#### Multiple Containers in Action
Kubernetes manages multiple instances (Pods) of an application, ensuring that the desired number of replicas are always running. This is different from running a single instance with Docker.

Each Pod can be seen as a group of containers sharing resources such as storage and network interfaces.
:p How does Kubernetes manage container health compared to `docker run`?
??x
Kubernetes actively monitors the state of Containers within Pods. If a container crashes or fails a liveness or readiness probe, Kubernetes automatically restarts it or replaces it with a new instance (Pod). This ensures that the application remains available even if individual containers fail.

In contrast, `docker run` does not have built-in mechanisms to monitor and replace failing containers.
x??

---


#### Load Balancing in Kubernetes
Kubernetes uses Services to provide load balancing across multiple Pods. A Service is an abstraction that defines a logical set of Pods running the same application and provides a single network endpoint for accessing all of them.

The `Type: LoadBalancer` service creates a load balancer that distributes traffic among the replicas.
:p What does the `kubectl get services` command show in this context?
??x
The `kubectl get services` command lists the available Services in the cluster. In this case, it shows two entries:

1. **Kubernetes Service**: A built-in service for accessing Kubernetes API.
2. **Application Service**: Named `simple-webapp`, which is a load balancer that distributes traffic to the application running in multiple Pods.

The output includes details like the type of the service (LoadBalancer), its IP address, and the ports it exposes.
x??

---


#### Automatic Rollout Updates
Kubernetes can automatically handle rolling updates for applications. This means changes are deployed gradually to ensure availability and rollback capabilities if something goes wrong.

To demonstrate this, you can set environment variables in the Kubernetes Deployment configuration.
:p How can you update an application using Environment Variables in a Kubernetes Deployment?
??x
You can update an application by modifying the `environment_variables` field in the Kubernetes Deployment configuration. For example, setting an environment variable like `PROVIDER = "Terraform"` will instruct the app to use this value instead of its default.

Here is how you would modify the `main.tf` file:

```hcl
module "simple_webapp" {
  source          = "../../modules/services/k8s-app"
  name            = "simple-webapp"
  image           = "training/webapp"
  replicas        = 2
  container_port  = 5000
  environment_variables = {
    PROVIDER = "Terraform"
  }
}
```

After making this change, you would apply the configuration to trigger the update.
x??

---

---

