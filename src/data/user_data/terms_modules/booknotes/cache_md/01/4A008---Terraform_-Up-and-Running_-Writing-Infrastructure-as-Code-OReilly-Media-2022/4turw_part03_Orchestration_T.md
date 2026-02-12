# High-Quality Flashcards: 4A008---Terraform_-Up-and-Running_-Writing-Infrastructure-as-Code-OReilly-Media-2022_processed (Part 3)


**Starting Chapter:** Orchestration Tools

---


#### Deployment and Kubernetes Clusters
Background context: In cloud computing, deploying applications involves managing multiple instances of VMs or containers efficiently. This is where orchestration tools like Kubernetes come into play. Kubernetes allows you to define how your application should run as code using YAML files.

:p What are the key components in a Kubernetes cluster setup for deploying Docker containers?
??x
The key components in a Kubernetes cluster setup for deploying Docker containers include:
1. **Kubernetes Cluster**: A group of servers managed by Kubernetes.
2. **Deployment**: A way to manage multiple replicas of your Docker container(s).
3. **Pods**: Groups of containers that are closely related, such as the backend and frontend for an application.
4. **YAML File Configuration**: A declarative way to define how containers should be deployed and managed.

Example YAML file configuration:
```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: example-app
spec:
  selector:
    matchLabels:
      app: example-app
  replicas: 3
  strategy:
    rollingUpdate:
      maxSurge: 3
      maxUnavailable: 0
    type: RollingUpdate
  template:
    metadata:
      labels:
        app: example-app
    spec:
      containers:
      - name: example-app
        image: httpd:2.4.39
        ports:
        - containerPort: 80
```

x??

---


#### Kubernetes Deployment Strategy
Background context: When deploying applications, it's important to have a strategy for updating existing deployments without causing downtime or issues with the application. Kubernetes provides several strategies such as Rolling Updates, Blue-Green Deployments, and Canary Releases.

:p What is a rolling update in Kubernetes?
??x
A rolling update in Kubernetes is a deployment strategy that updates your application by gradually replacing one replica at a time to ensure zero downtime during upgrades. The `maxSurge` and `maxUnavailable` fields control the maximum number of new pods that are created, and the maximum number of unavailable replicas before the old ones are torn down.

Example rolling update configuration:
```yaml
strategy:
  rollingUpdate:
    maxSurge: 3
    maxUnavailable: 0
```

Explanation: 
- `maxSurge` specifies the maximum number by which the desired number of pods may be increased above the specified replica count.
- `maxUnavailable` indicates the maximum number of unavailable replicas that can exist during the update.

x??

---


#### Pod and Container Management in Kubernetes
Background context: Pods are the smallest deployable units in a Kubernetes cluster, consisting of one or more containers. They share network namespaces and volumes, making it easy to manage related containers together.

:p What is a Pod in Kubernetes?
??x
A Pod in Kubernetes is a group of containers (one or more) that are closely related. These containers share the same context within the cluster, including storage, network, and process space. Pods can be created by deploying applications using YAML files, where each container in the Pod runs the specified application.

Example Pod configuration:
```yaml
spec:
  containers:
  - name: example-app
    image: httpd:2.4.39
    ports:
    - containerPort: 80
```

Explanation: 
- The `containers` section defines the Docker images and their port mappings that will run within the Pod.
- Each container in a Pod shares the network namespace, which means they can communicate with each other using localhost.

x??

---


#### Auto Scaling in Kubernetes
Background context: As application traffic changes, so should the number of containers or replicas to handle the load efficiently. Kubernetes provides auto-scaling capabilities that adjust the number of instances based on defined metrics and thresholds.

:p How does auto-scaling work in Kubernetes?
??x
Auto-scaling in Kubernetes automatically adjusts the number of replicas running for a deployment based on predefined conditions, ensuring efficient use of resources while maintaining application availability. This is achieved using Horizontal Pod Autoscaler (HPA), which monitors CPU usage or custom metrics and scales up or down the number of pods.

Example HPA configuration:
```yaml
apiVersion: autoscaling/v2beta2
kind: HorizontalPodAutoscaler
metadata:
  name: example-app-hpa
spec:
  scaleTargetRef:
    apiVersion: apps/v1
    kind: Deployment
    name: example-app
  minReplicas: 3
  maxReplicas: 10
  metrics:
  - type: Resource
    resource:
      name: cpu
      targetAverageUtilization: 60
```

Explanation: 
- `scaleTargetRef` references the deployment being managed.
- `minReplicas` and `maxReplicas` set the limits for scaling.
- `metrics` section defines how to measure the load, in this case, using CPU utilization.

x??

---


#### Service Discovery in Kubernetes
Background context: In a distributed system, it's crucial that containers can find and communicate with each other. Kubernetes provides service discovery mechanisms such as DNS and labels to enable communication between services.

:p What is service discovery in Kubernetes?
??x
Service discovery in Kubernetes refers to the ability for different components within an application to discover and communicate with each other over the network, even when their IP addresses or endpoints might change dynamically. This is achieved through mechanisms like Kubernetes Services, which abstract away the actual IP addresses of containers.

Example Service configuration:
```yaml
apiVersion: v1
kind: Service
metadata:
  name: example-app-service
spec:
  selector:
    app: example-app
  ports:
  - protocol: TCP
    port: 80
    targetPort: 80
```

Explanation: 
- The `Service` object defines a logical set of pods that can be accessed using a single name.
- The `selector` field labels the pods that are part of this service.
- `ports` maps the external ports to internal container ports.

x??

---

---


#### Deploying Updates Using Kubernetes
Background context: When deploying a new version of your Docker container, you can use `kubectl apply -f example-app.yml` to instruct Kubernetes to deploy your application. By modifying the YAML file and running this command again, you can roll out updates without downtime.

:p How do you deploy an updated version of a Docker container using Kubernetes?
??x
To deploy an updated version, you modify the `example-app.yml` file with changes for the new version. Then, run:
```sh
kubectl apply -f example-app.yml
```
This command instructs Kubernetes to roll out updates by creating new replicas and ensuring they are healthy before removing the old ones.
x??

---


#### Using Terraform to Provision Servers
Background context: Terraform is a provisioning tool that allows you to create not only servers but also other components of your infrastructure such as databases, load balancers, and more. It uses configuration files written in HCL (HashiCorp Configuration Language) which are similar to YAML.

:p How does the following Terraform code provision an AWS EC2 instance?
??x
The provided Terraform code provisions a web server on an AWS `t2.micro` instance located in `us-east-2a`. It uses an AMI ID and a user_data script to configure the instance at boot time.
```hcl
resource "aws_instance" "app" {
  instance_type      = "t2.micro"
  availability_zone  = "us-east-2a"
  ami               = "ami-0fb653ca2d3203ac1"
  user_data         = <<-EOF
                     #!/bin/bash
                     sudo service apache2 start
                     EOF
}
```
x??

---


#### Infrastructure as Code (IaC)
Background context: IaC is a practice where infrastructure and resources are defined with code. This allows for version control, automation, and easier management of infrastructure changes.

:p What does the term "Infrastructure as Code" mean?
??x
Infrastructure as Code (IaC) refers to the process of defining and managing your IT infrastructure using programming languages or configuration files. These definitions can be managed within a version control system like Git, enabling collaboration and tracking of changes.
x??

---


#### Benefits of Infrastructure as Code
Background context explaining why IaC is beneficial, including references to the 2016 State of DevOps Report which highlights improved deployment frequency, faster recovery from failures, and significantly lower lead times for organizations that use DevOps practices like IaC.
:p Why should you bother with Infrastructure as Code (IaC)?
??x
You should bother with Infrastructure as Code because it offers significant benefits such as improved delivery speed, reduced errors, enhanced documentation, version control, and validation. According to the 2016 State of DevOps Report, organizations that use DevOps practices like IaC deploy more frequently, recover from failures faster, and have lower lead times.
x??

---


#### Self-Service
Background context explaining how manual infrastructure deployment can create bottlenecks and dependencies on a small number of sysadmins. Contrast this with the automation provided by IaC which enables developers to manage deployments themselves.
:p What is self-service in the context of Infrastructure as Code?
??x
Self-service in the context of Infrastructure as Code means that developers can initiate their own infrastructure deployments without relying on a limited pool of sysadmins who hold all the knowledge and access. This automation allows for faster, more frequent deployments by making the deployment process available to everyone.
x??

---


#### Speed and Safety
Background context explaining how automation in IaC leads to faster and safer deployments due to reduced manual steps and increased consistency. Discuss the benefits of this approach over manual processes.
:p How does Infrastructure as Code improve speed and safety?
??x
Infrastructure as Code improves speed and safety by automating the deployment process, which is significantly faster than manual steps performed by humans. Automation ensures that the process is more consistent, repeatable, and less prone to human error. This results in quicker deployments and a reduced risk of operational failures.
x??

---


#### Documentation
Background context explaining how the lack of documentation can lead to issues when key team members leave or go on vacation, whereas IaC acts as comprehensive documentation accessible to all team members.
:p How does Infrastructure as Code act as documentation?
??x
Infrastructure as Code acts as documentation by storing the state of your infrastructure in source files that anyone can read. This means that even if a key sysadmin leaves or goes on vacation, other team members can understand and manage the infrastructure because it is defined in code rather than in someone's head.
x??

---


#### Version Control
Background context explaining how version control helps capture the history of your infrastructure changes and aids in debugging issues by allowing you to revert to previous versions when necessary.
:p How does version control benefit Infrastructure as Code?
??x
Version control benefits Infrastructure as Code by storing all the historical changes made to your infrastructure in a commit log. This allows you to debug issues effectively by checking the commit history and reverting to known-good versions of your IaC code if needed.
x??

---


#### Validation
Background context explaining how automated validation processes like code reviews, tests, and static analysis tools can significantly reduce defects in your infrastructure code.
:p How does validation improve Infrastructure as Code?
??x
Validation improves Infrastructure as Code by enabling you to perform thorough checks on every change. This includes code reviews, running suites of automated tests, and passing the code through static analysis tools, all of which help identify and prevent defects before they can cause issues in production.
x??

---

---


#### Why Use Infrastructure as Code (IaC)?
Background context explaining why IaC is important. Discussing the repetitive and tedious nature of manual deployment, and how it leads to stress and an unpleasant environment for developers and sysadmins.

:p What are some reasons to use Infrastructure as Code?
??x
Using IaC helps in packaging infrastructure into reusable modules, allowing deployments to be built on known, battle-tested pieces. It automates the repetitive work that developers and sysadmins often handle, reducing manual errors and improving efficiency. This leads to a happier work environment since it allows developers to focus more on coding rather than mundane tasks.

```java
// Example of a simple IaC concept in pseudocode
public class InfrastructureAsCode {
    public static void main(String[] args) {
        System.out.println("Deploying infrastructure code...");
        // Code to apply IaC configurations would go here
    }
}
```
x??

---


#### How Terraform Works?
Background context on how Terraform operates, including its open-source nature and the languages it is written in. Explain that Terraform uses API calls to cloud providers through configuration files.

:p What does Terraform do when you run `terraform apply`?
??x
When you run `terraform apply`, Terraform parses your code, translates it into a series of API calls to the specified cloud providers, and makes those calls efficiently on your behalf. This process involves defining infrastructure in text files called Terraform configurations.

Example Terraform configuration:
```hcl
resource "aws_instance" "example" {
  ami           = "ami-0fb653ca2d3203ac1"
  instance_type = "t2.micro"
}

resource "google_dns_record_set" "a" {
  name         = "demo.google-example.com"
  managed_zone = "example-zone"
  type         = "A"
  ttl          = 300
  rrdatas      = [aws_instance.example.public_ip]
}
```

x??

---


#### Transparent Portability Between Cloud Providers with Terraform?
Background context on the challenge of porting infrastructure between different cloud providers. Explain why “exactly the same” infrastructure might not be directly portable due to differences in features and management.

:p Can you use the same Terraform code to deploy infrastructure across multiple cloud providers?
??x
No, exactly the same infrastructure cannot be deployed across different cloud providers because each provider offers unique types of infrastructure with distinct features, configurations, and management practices. While Terraform allows writing provider-specific code, it uses a consistent language and toolset for all providers.

Example:
```hcl
// AWS configuration
resource "aws_instance" "example" {
  ami           = "ami-0fb653ca2d3203ac1"
  instance_type = "t2.micro"
}

// Google Cloud configuration
resource "google_dns_record_set" "a" {
  name         = "demo.google-example.com"
  managed_zone = "example-zone"
  type         = "A"
  ttl          = 300
  rrdatas      = [aws_instance.example.public_ip]
}
```

x??

---

---

