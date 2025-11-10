# High-Quality Flashcards: Sam-Newman---Building-Microservices-OReilly-Media-2015_processed (Part 16)


**Starting Chapter:** Docker

---


#### Docker Overview
Docker is a platform that simplifies container management by providing tools and abstractions to handle container creation, deployment, networking, and registry storage. It allows developers to package applications along with their dependencies into lightweight, portable containers.

:p What does Docker provide for managing applications in the context of containerization?
??x
Docker provides a platform for creating, deploying, and running packaged applications (referred to as Docker apps or images) in lightweight containers. This includes handling container provisioning, networking, and registry management.
x??

---


#### VM vs. Container Abstraction
In traditional virtual machine (VM) environments, developers deal with full operating systems, whereas Docker abstracts away the underlying OS, focusing on application-level packaging.

:p How does Docker simplify application deployment compared to using VMs?
??x
Docker simplifies application deployment by hiding the underlying OS details and focusing on lightweight containerization. Instead of managing a full OS for each application (as with VMs), Docker allows multiple applications to share the host OS, leading to more efficient use of resources.
x??

---


#### Docker App Abstraction
Docker abstracts away the underlying technology used to implement services, similar to how VM images work.

:p What is the benefit of Docker's app abstraction for developers?
??x
The benefit of Docker's app abstraction is that it shields developers from the complexities of the underlying OS and container management. Developers can focus on building their applications without worrying about the intricacies of deployment infrastructure.
x??

---


#### Docker for Development and Testing
Using Docker can reduce the complexity of setting up multiple services locally by running a single VM that hosts a Docker instance.

:p How does Docker simplify local development and testing?
??x
Docker simplifies local development and testing by allowing developers to run a single VM with Docker, rather than multiple VMs. This reduces setup time and overhead, making it faster to develop and test applications.
x??

---


#### Scheduling Layer Requirements
For managing multiple Docker instances across machines, additional tools like Kubernetes or CoreOS's cluster technology are required.

:p What is a key requirement for running Docker in a multi-machine environment?
??x
A key requirement for running Docker in a multi-machine environment is the need for a scheduling layer that can allocate and manage containers. Tools like Kubernetes from Google or CoreOS’s cluster technology help in this regard by providing ways to request and run containers across multiple machines.
x??

---


#### Deployment Interface Overview
In order to ensure uniform deployment mechanisms from development to production, a single parameterizable command-line call is recommended. This approach allows for consistency and ease of use across different environments. The command typically requires three parameters: artifact name (microservice), version, and environment.
:p What are the key elements of a unified deployment interface?
??x
The key elements include:
1. A known entity or microservice name.
2. The version of the artifact to deploy, which could be locally, latest green build from an artifact repository, or an exact build for testing/bugs.
3. The environment where the service should be deployed.

This setup ensures that deployments are consistent and can be easily triggered via scripts or manually in various scenarios like local development, CI testing, and production environments.
??x

---


#### CI/CD Trigger Example
The CI build service can pick up changes and trigger deployments automatically. The latest build artifact from a successful CI run is passed through the pipeline to subsequent stages.

Example command for CI stage:
```
$ deploy artifact=catalog environment=ci version=b456
```

:p How would you deploy the catalog service into an integrated test environment using the latest build artifact?
??x
To deploy the catalog service into an integrated test environment with the latest build artifact, you would use the following command:

```sh
$ deploy artifact=catalog environment=integrated_qa version=latest
```
This command deploys the `catalog` microservice in the integrated QA environment using the most recent build from the CI/CD pipeline.
??x

---


#### Deployment Automation with Fabric and Boto
Fabric is a Python library that allows mapping command-line calls to functions. It supports tasks like SSH into remote machines, making it suitable for deploying services across cloud environments.

:p How can you use Fabric and Boto together to automate deployments on AWS?
??x
To automate deployments on AWS using Fabric and Boto, you would typically create a script that leverages both tools. Here is an example of how this might be structured:

```python
from fabric import Connection
import boto3

def deploy_microservice(connection, artifact_name, version, environment):
    # SSH into the target machine
    conn = Connection(host='your_remote_host', user='ubuntu')

    # Use Boto to interact with AWS services if needed
    ec2 = boto3.resource('ec2')
    
    # Deploy logic here
    conn.run(f'deploy artifact={artifact_name} environment={environment} version={version}')
```

This script sets up a connection to an EC2 instance and uses Fabric's `Connection` object to run the deployment command on that machine. Boto3 can be used for more complex interactions with AWS services if necessary.
??x

---


#### Environment Definition Overview
Background context: The environment definition is a YAML file that maps microservices to specific compute, network, and storage resources for different environments. It allows specifying varying resource requirements based on the environment type (e.g., development vs production) and can include credentials management.

:p What are the key components of an environment definition?
??x
The key components of an environment definition include:
- **Nodes**: Specifies the instance types (AMI ID, size), region, and credentials for each node.
- **Services**: Lists which services run on each node.
- **Number of Nodes**: Indicates how many instances to launch in certain environments.
- **Credentials Management**: Allows specifying different credentials for different environments, often stored separately for security reasons.

For example:
```yaml
development:
  nodes:
    - ami_id: ami-e1e1234
      size: t1.micro
      credentials_name: eu-west-ssh
      services: [catalog-service]
  region: eu-west-1

production:
  nodes:
    - ami_id: ami-e1e1234
      size: m3.xlarge
      credentials_name: prod-credentials
      services: [catalog-service]
  number: 5
```
x??

---


#### Resource Management Across Environments
Background context: The system uses different resources (instance sizes, number of nodes) for various environments based on cost-effectiveness and testing needs. By default, load balancers are automatically created if a service has more than one instance.

:p How does the system manage resource scaling across environments?
??x
The system manages resource scaling by:
- Specifying different instance types (sizes and AMI IDs) in each environment.
- Configuring the number of nodes for certain environments to optimize cost or testing efficiency.
- Automatically creating load balancers if a service is deployed on multiple instances.

For example, comparing development and production settings:
```yaml
development:
  nodes: 
    - ami_id: ami-e1e1234
      size: t1.micro
      services: [catalog-service]
  region: eu-west-1

production:
  nodes:
    - ami_id: ami-e1e1234
      size: m3.xlarge
      number: 5
      services: [catalog-service]
```
x??

---


#### Puppet Configuration for Microservices
Background context: The Puppet configuration system is used to manage the deployment of microservices, ensuring consistency and ease of updates across environments. This approach leverages conventions such as standardizing port usage.

:p How does Puppet manifest management work in environment definitions?
??x
Puppet manifest management works by:
- Storing the name or path to a Puppet manifest file for each service.
- Using Puppet configurations to manage the deployment and configuration of services consistently across environments.

For example, defining a Puppet manifest for a microservice:
```yaml
catalog-service:
  puppet_manifest: catalog.pp
```
x??

---


#### Load Balancing Strategy Across Environments
Background context: The system automatically creates load balancers when multiple instances of a service are deployed. This helps distribute traffic efficiently and ensures high availability.

:p How does the system handle load balancing for microservices?
??x
The system handles load balancing by:
- Automatically creating load balancers if more than one instance is configured for a service.
- Using the region specified in the environment definition to target the correct AWS regions or other cloud services.

For example, configuring multiple nodes with an auto-created load balancer:
```yaml
production:
  nodes: 
    - ami_id: ami-e1e1234
      size: m3.xlarge
      number: 5
      services: [catalog-service]
```
x??

---

