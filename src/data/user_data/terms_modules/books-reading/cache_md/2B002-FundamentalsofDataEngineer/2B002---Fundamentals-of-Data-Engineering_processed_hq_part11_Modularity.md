# High-Quality Flashcards: 2B002---Fundamentals-of-Data-Engineering_processed (Part 11)

**Rating threshold:** >= 8/10

**Starting Chapter:** Modularity

---

**Rating: 8/10**

#### Importance of Avoiding Sunk Costs
Background context: It's crucial to avoid treating internal operational overhead as a sunk cost when making technology decisions. Managed platforms offer significant advantages over babysitting on-premises servers. By upskilling your existing data team, you can build sophisticated systems more effectively and efficiently.
:p Why should companies avoid treating internal operational overhead as a sunk cost?
??x
Companies should not treat internal operational overhead as a sunk cost because it doesn't contribute to the long-term value of their technology investments. Managed platforms offer scalable resources and support, reducing the burden on in-house teams while providing more advanced functionalities. By investing in managed services and upskilling your team, you can focus on building sophisticated systems that drive business value.
x??

---

#### Evaluating Company Value through Sales and Customer Experience
Background context: Understanding how a company makes money is critical for assessing its overall health and future potential. Pay special attention to the sales and customer experience teams as they often indicate how the company treats its customers during interactions and when dealing with them financially.
:p How can understanding your company's sales and customer experience provide insights?
??x
Understanding your company’s sales and customer experience can offer valuable insights into its operational efficiency, customer satisfaction, and overall financial health. By observing these teams, you can gauge how the company handles customer service during interactions and transactions, which often reflects on its long-term sustainability and growth prospects.
x??

---

#### Identifying Budget Decision-Makers
Background context: Before making a business case for cloud solutions or managed services, it's important to know who controls the budget at your organization. Understanding this can help tailor your proposal more effectively and increase the likelihood of approval.
:p Who should you identify as the key stakeholders in budget decisions?
??x
Identify the individuals responsible for controlling the budget and understand their decision-making process. They might be the CFO, CTO, or other finance-related executives who have the authority to approve funding for new projects and technologies.
x??

---

#### Evaluating Time to Budget Approval
Background context: Time is a critical factor in business cycles, especially when waiting for budget approval. Delays can significantly impact the success of your proposal, as the longer you wait, the higher the risk that your project will be shelved or delayed indefinitely.
:p Why is minimizing time spent in limbo important when making proposals?
??x
Minimizing time spent in limbo is crucial because delays increase the risk that your budget approval will be postponed or denied. In today's fast-paced business environment, quickly demonstrating value and securing funding can make a significant difference in the success of your project.
x??

---

#### Monolithic vs Modular Systems: An Overview
Background context: Monolithic systems are self-contained and perform multiple functions under one system. They favor simplicity but can become brittle with many moving parts. Modular systems break apart into decoupled services, each focused on a specific task, making them more adaptable to change.
:p What is the main difference between monolithic and modular architectures?
??x
The main difference between monolithic and modular architectures lies in their structure and flexibility:
- **Monolithic**: Self-contained with all components tightly coupled, making updates complex but offering simplicity of reasoning about the system.
- **Modular/Microservices**: Decoupled services that communicate via APIs, allowing for easier scaling, better adaptability to changing requirements, and reduced complexity per service.
x??

---

#### Pros and Cons of Monolithic Systems
Background context: Monolithic systems are easy to reason about but can become brittle with many moving parts. They are good for simplicity in reasoning but difficult to maintain or update due to the vast number of dependencies and interconnections.
:p What are the pros of using a monolithic system?
??x
The main advantages of using a monolithic system include:
- **Simplicity**: Easy to reason about, with fewer moving parts.
- **Lower Cognitive Burden**: Fewer technologies to manage, reducing context switching for developers.
- **Single Codebase**: Typically uses one principal programming language and framework.
x??

---

#### Cons of Monolithic Systems
Background context: Despite their advantages, monolithic systems can be brittle due to the large number of interdependent components. They are harder to update and maintain, especially when dealing with user-induced issues or bugs that impact the entire system.
:p What are the downsides of a monolithic architecture?
??x
The key downsides of a monolithic architecture include:
- **Brittle**: Updates take longer due to the vast number of interdependent components.
- **User-Induced Issues**: Common for ETL pipelines, where any breakage requires a full restart, causing delays and user dissatisfaction.
- **Multitenancy Challenges**: Difficult to isolate workloads and resources, leading to potential conflicts between users.
x??

---

#### Advantages of Modular Systems
Background context: Modular systems are designed with decoupled services, each handling specific tasks. They offer greater flexibility, easier scalability, and better adaptability to changing technologies and requirements.
:p What are the benefits of using a modular architecture?
??x
The primary benefits of using a modular architecture include:
- **Decoupling**: Services communicate via APIs, allowing for independent scaling and updates.
- **Flexibility**: Easier to adopt new tools and technologies as they become available.
- **Simpler Updates**: Smaller, manageable components make it easier to update or replace individual services without affecting the entire system.
x??

---

#### Challenges of Modular Systems
Background context: While modular systems offer many advantages, they come with their own set of challenges. Managing multiple services requires a broader understanding of the architecture and increased complexity in reasoning about the overall system.
:p What are the challenges associated with a modular architecture?
??x
The key challenges of using a modular architecture include:
- **Complexity**: More moving parts mean more to reason about, increasing cognitive load.
- **Interoperability**: Ensuring that services work well together can be a significant challenge.
- **Team Size and Scope**: Smaller teams manage simpler domains, which requires careful decomposition and orchestration.
x??

---

**Rating: 8/10**

#### Ephemeral Resources
In cloud computing, treating servers as ephemeral resources means you should create and delete them as needed based on demand. This approach allows for dynamic scaling of compute resources on demand without the overhead of managing physical or virtual machines continuously.

:p What is meant by treating servers as ephemeral resources in serverless architectures?
??x
Ephemeral resources imply that servers are created dynamically when required, and deleted once they are no longer needed. This model leverages the cloud's ability to scale up and down instantly based on demand without the need for constant maintenance or resource allocation.

```python
# Example of creating an ephemeral server using a simple script in Python
def create_server():
    # Logic to deploy a server instance
    print("Server created dynamically")
    
def delete_server():
    # Logic to terminate the server instance
    print("Server deleted upon completion of task")

create_server()
delete_server()
```
x??

---

#### Boot Scripts and CI/CD Pipelines
Boot scripts are essential for setting up environments when creating servers on-demand. CI/CD pipelines automate the deployment process, ensuring that applications can be reliably and frequently deployed.

:p How do boot scripts and CI/CD pipelines contribute to serverless architecture?
??x
Boot scripts help in initializing a new server instance with necessary configurations or dependencies immediately after creation. CI/CD pipelines streamline the application deployment process by automating tasks such as testing, building, and releasing code changes, ensuring consistency and reliability.

```bash
# Example of a boot script using bash for setting up an environment
#!/bin/bash

# Update package list
apt-get update

# Install necessary dependencies
apt-get install -y python3.8 pip

# Clone the repository
git clone https://github.com/example/project.git

# Install application requirements
pip3 install -r project/requirements.txt
```

:x?? (Differentiates from the previous card as it focuses on a specific type of script used in serverless architectures)

---

#### Clusters and Autoscaling
Clusters allow for grouping servers to provide redundancy and horizontal scaling. Autoscaling automatically adjusts the number of active instances based on demand, ensuring optimal performance.

:p What is the purpose of using clusters and autoscaling in cloud computing?
??x
The purpose of using clusters and autoscaling is to ensure that your application can handle varying levels of traffic efficiently without overprovisioning resources. Clusters provide a way to manage multiple server instances as a single unit, while autoscaling adjusts the number of active servers based on current demand.

```python
# Example of configuring autoscaling in Python using boto3 for AWS
import boto3

def configure_autoscaling(group_name):
    ec2 = boto3.client('autoscaling')
    
    # Configure scaling policies to adjust capacity based on CPU utilization
    response = ec2.put_scaling_policy(
        AutoScalingGroupName=group_name,
        PolicyName='ScaleOnCPUUtilization',
        PolicyType='TargetTrackingScaling',
        TargetTrackingConfiguration={
            'PredefinedMetricSpecification': {
                'PredefinedMetricType': 'ASGAverageCPUUtilization'
            },
            'TargetValue': 70.0
        }
    )

configure_autoscaling('myApplicationGroup')
```
x??

---

#### Treating Infrastructure as Code
Infrastructure as code (IaC) involves managing and provisioning infrastructure through machine-readable definition files, allowing for automation and version control.

:p How does treating infrastructure as code improve cloud management?
??x
Treating infrastructure as code improves cloud management by enabling the automation of deployment processes. IaC allows teams to define infrastructure in text format using languages like Terraform or YAML, which can be version-controlled and automated through CI/CD pipelines, ensuring consistency and reliability across deployments.

```yaml
# Example of a Terraform configuration file for creating an EC2 instance
resource "aws_instance" "web" {
  ami           = "ami-0c55b159cbfafe1f0"
  instance_type = "t2.micro"

  tags = {
    Name = "WebServer"
  }
}
```
x??

---

#### Containers and Kubernetes
Containers provide a way to package applications with their dependencies, ensuring consistency across different environments. Kubernetes orchestrates containerized workloads, scaling them automatically based on demand.

:p What is the role of containers and Kubernetes in serverless architectures?
??x
Containers encapsulate an application along with its runtime environment, making it easy to deploy and run consistently across various platforms. Kubernetes manages these containers by deploying them into pods, ensuring they are scaled up or down as required, thus providing a robust solution for managing containerized workloads.

```yaml
# Example of a Kubernetes deployment file (Kubernetes YAML)
apiVersion: apps/v1
kind: Deployment
metadata:
  name: nginx-deployment
spec:
  replicas: 3 # tells deployment to run 3 pods matching the template
  selector:
    matchLabels:
      app: nginx
  template:
    metadata:
      labels:
        app: nginx
    spec:
      containers:
      - name: nginx
        image: nginx:1.7.9
        ports:
        - containerPort: 80
```
x??

---

#### Workload Size and Complexity
Serverless architectures are best suited for simple, discrete tasks with low complexity. They may not be ideal for workloads requiring extensive compute or memory resources.

:p What factors determine whether a workload is suitable for serverless architectures?
??x
Workloads that are small, stateless, and function-based benefit most from serverless architectures. However, more complex applications with high compute requirements or extensive memory usage might not be well-suited due to the limitations of execution frequency, concurrency, and duration imposed by cloud providers.

```python
# Example of a simple task in Python that could be run as a serverless function
def process_event(event):
    print("Processing event: ", event)
    return "Event processed successfully"
```
x??

---

#### Execution Frequency and Duration
Serverless functions have limitations on how often they can execute and for how long. Understanding these constraints is crucial when designing applications.

:p How do execution frequency and duration limits impact serverless function design?
??x
Execution frequency and duration limits mean that serverless functions must be optimized to complete their tasks quickly, as cloud providers may terminate them if they exceed the allowed time or too many requests are made in a short period. This necessitates careful consideration of how applications are architected.

```python
# Example of a simple function in Python designed for serverless execution
def process_event(event):
    # Ensure the function completes quickly
    import time
    
    start_time = time.time()
    
    if (time.time() - start_time) > 30:  # Termination threshold of 30 seconds
        raise Exception("Function took too long to execute")
    
    print("Processing event: ", event)
    return "Event processed successfully"
```
x??

---

#### Requests and Networking
Serverless platforms often have simplified networking, limiting support for complex virtual network features such as VPCs and firewalls.

:p How do serverless platforms typically handle requests and networking?
??x
Serverless platforms simplify request handling by abstracting away many of the details of traditional servers. However, they may not fully support advanced networking configurations like Virtual Private Cloud (VPC) or complex firewall rules, which could be necessary for certain applications.

```yaml
# Example of a basic VPC setup in AWS using Terraform
resource "aws_vpc" "example" {
  cidr_block = "10.0.0.0/16"

  tags = {
    Name = "ExampleVPC"
  }
}

resource "aws_subnet" "example" {
  vpc_id     = aws_vpc.example.id
  cidr_block = "10.0.1.0/24"
  map_public_ip_on_launch = false

  tags = {
    Name = "ExampleSubnet"
  }
}
```
x??

---

#### Language Support and Runtime Limitations
Serverless platforms often support a specific set of languages, which can limit the development choices for applications that require different runtime environments.

:p What are the implications of language support in serverless architectures?
??x
Language support in serverless architectures is critical as it restricts the choice of programming languages you can use. If your preferred language isn't supported by the platform, you might need to consider alternative approaches like using containers or a container orchestration framework.

```python
# Example of a simple Python function that could be run on a serverless platform
def hello_world(request):
    return "Hello, World!"
```
x??

---

#### Cost Considerations
Serverless functions can be cost-effective for low-traffic applications but become expensive as traffic increases due to high event processing costs.

:p How do cost considerations affect the decision to use serverless architectures?
??x
Costs associated with serverless functions can vary significantly based on usage. For applications that receive infrequent requests, serverless can be very economical. However, for applications with high traffic, the cost per request can add up quickly, making traditional servers or container-based approaches more cost-effective.

```python
# Example of a simple Python function to track costs in AWS Lambda
def lambda_handler(event, context):
    # Log event details and track usage
    import json
    
    print("Received event: " + json.dumps(event))
    
    # Simulate cost tracking based on requests
    request_count = 0 if 'request_count' not in context else int(context.get('request_count'))
    request_count += 1
    context['request_count'] = str(request_count)
    
    return {
        'statusCode': 200,
        'body': json.dumps({'request_count': request_count})
    }
```
x??

**Rating: 8/10**

#### Benchmark Comparison Issues
Background context: The passage discusses common issues and pitfalls in benchmark comparisons within the database space. It highlights problems such as comparing databases optimized for different use cases, using small datasets to achieve misleading performance results, nonsensical cost comparisons, and asymmetric optimization.

:p What are some key issues with benchmark comparisons in the database industry mentioned in the text?
??x
The passage identifies several critical issues:
1. Comparing databases optimized for different use cases.
2. Using small test datasets that do not reflect real-world scenarios.
3. Nonsensical cost comparisons, such as comparing cloud-based systems on a per-second basis despite their nature of being created and deleted dynamically.
4. Asymmetric optimization where the benchmark favors one database over another by using data models that are suboptimal for certain types of queries.

For example, comparing a row-based MPP system with a columnar database might use highly normalized data that is optimal for the row-based system but not for the columnar database, leading to misleading performance results.
x??

---

#### Small Datasets in Benchmarks
Background context: The text mentions how some databases claim to support "big data" at petabyte scale but often use benchmark datasets too small to be representative of real-world scenarios. This can lead to inflated claims about performance.

:p How does the size of test datasets affect database benchmarks according to the passage?
??x
The passage indicates that using small test datasets in benchmarks can result in misleadingly high performance claims. For instance, products claiming support for "big data" at petabyte scale might use dataset sizes small enough to fit on a smartphone, which is far from realistic.

For example:
- A database system optimized for caching could show ultra-high performance by repeatedly querying the same small dataset that resides entirely in SSD or memory.
x??

---

#### Nonsensical Cost Comparisons
Background context: The text discusses how cost comparisons can be misleading when vendors compare systems with different operational models. For instance, some MPP (Massively Parallel Processing) databases may not support easy creation and deletion, while others do.

:p How are nonsensical cost comparisons performed according to the passage?
??x
The passage explains that comparing ephemeral systems on a cost-per-second basis with non-ephemeral ones is inappropriate. For example:
- MPP databases that require significant setup time and may not be deleted easily.
- Other databases that support dynamic compute models, charging per query or per second of use.

These different operational models make it illogical to compare them on a simple cost-per-second basis without considering the full lifecycle costs.

Example: Comparing an MPP database that takes 10 minutes to configure and run with a dynamically scalable database where configuration is not needed.
x??

---

#### Asymmetric Optimization
Background context: The passage describes how vendors might present benchmarks favoring their products by using data models or queries that are suboptimal for the competitor's system.

:p What does asymmetric optimization mean in benchmark comparisons?
??x
Asymmetric optimization refers to a situation where a vendor's benchmark results favor their own product at the expense of another. This can happen when:
- Row-based MPP systems are compared against columnar databases using complex join queries on highly normalized data, which is optimal for row-based systems but not for columnar ones.
- The benchmark scenarios used do not reflect real-world use cases, leading to misleading performance results.

For example, a benchmark might run complex join queries on highly normalized data, which would perform exceptionally well in a row-based MPP system but poorly in a columnar database optimized for analytical workloads.

Example:
```sql
SELECT * FROM table1 JOIN table2 ON table1.id = table2.id;
```
This query is designed to favor the row-based MPP system over the columnar one.
x??

---

