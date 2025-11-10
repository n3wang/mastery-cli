# High-Quality Flashcards: 4A001---The-Book-of-Kubernetes_-A-Complete-Guide-to-Container-Orchestration-No-Starch-Press-2022Alan-Hohn--_processed (Part 2)


**Starting Chapter:** Why Containers

---


---
#### Resilience and Microservices
In a scenario where an application can handle hardware or software failures without affecting end-users, it is considered resilient. However, resilience from one instance to another might not be enough if only separate instances are running.

:p What does resilience mean in the context of microservices?
??x
Resilience means that the application should be able to handle a failure (either hardware or software) such that end-users remain unaware. If multiple unrelated instances are running, the failure of one instance might not be hidden from users.
x??

---


#### Modern Application Architecture
Modern application architecture using microservices is appealing due to its flexibility and scalability. However, building such applications involves significant trade-offs related to complexity in managing individual services.

:p Why does modern application architecture with microservices sound appealing?
??x
Modern application architecture with microservices offers the advantage of independent deployment and scaling capabilities for each service, enhancing overall system resilience and allowing teams to work independently on different components. However, this comes at a cost: it increases the complexity in packaging, deploying, configuring, and maintaining multiple services.
x??

---


#### Trade-offs in Microservices Architecture
Engineering trade-offs are crucial when designing modern applications with microservices. While microservices offer independence and flexibility, they introduce complex problems such as deployment, configuration, and dependency management.

:p What are some significant trade-offs when using microservices?
??x
When using microservices, the complexity arises from managing numerous small pieces. This includes packaging, deploying, configuring, and maintaining each service independently. Additionally, ensuring multiple instances of a service can communicate and scale efficiently while handling failures introduces substantial challenges.
x??

---


#### Containers in Microservices Architecture
Containers are used to manage the complexities introduced by microservices architecture. They help with isolation, versioning, fast startup, and low overhead, making it easier to deploy and maintain microservices.

:p Why do we need containers for microservices?
??x
Containers provide a solution to the challenges of managing individual microservices. They ensure that each service is isolated from others, can be easily packaged and deployed, and started quickly with minimal resource overhead. Containers also help manage dependencies and facilitate updates.
x??

---


#### Requirements for Containers
To address the needs of deploying microservices, containers must bundle applications, uniquely identify versions, isolate services, start quickly, and minimize resource usage.

:p What are the requirements for a single microservice when using containers?
??x
The requirements include:
- **Packaging**: Bundling the application with dependencies.
- **Versioning**: Identifying unique versions for updates.
- **Isolation**: Ensuring services do not interfere with each other.
- **Fast startup**: Quickly starting new instances.
- **Low overhead**: Minimizing resource usage.

Containers meet these requirements by providing isolation, low overhead, and fast startup. Each container runs from a container image that includes the application and its dependencies.
x??

---


#### Orchestration for Multiple Microservices
Orchestration is necessary to manage multiple microservices working together. It involves clustering services across servers to ensure processing, memory, and storage are effectively utilized.

:p What does orchestration involve in managing multiple microservices?
??x
Orchestration involves providing a way to cluster containers (running microservices) across multiple servers to distribute processing, memory, and storage resources efficiently. This ensures that the system can handle failures and scale appropriately.
x??

---

---


#### Discovery: How Microservices Find Each Other
Background context explaining how microservices discover and communicate with each other. In a dynamic environment, containers might move around, so a discovery mechanism is needed to ensure that services can find one another reliably.

:p What is the purpose of a discovery service in a microservice architecture?
??x
A discovery service helps microservices locate and communicate with each other by maintaining up-to-date information about where instances of various services are running. This is crucial because containers might be deployed or moved to different servers dynamically.
x??

---


#### Configuration: Decoupling Configurations from Code
Background context explaining the importance of decoupling configurations from code in microservices, allowing for easier reconfiguration and deployment without changing the application logic.

:p Why is configuration separation important?
??x
Configuration separation allows developers to change runtime settings without modifying the source code. This makes it easier to maintain and update applications by keeping configuration details separate from the business logic.
x??

---


#### Access Control: Managing Container Authorization
Background context explaining how access control ensures only authorized containers are allowed to run, maintaining security within a microservice architecture.

:p What is the role of access control in container orchestration?
??x
Access control manages authorization for creating and running containers. It ensures that only properly authorized containers can be executed, helping prevent unauthorized or malicious activities.
x??

---


#### Load Balancing: Distributing Requests Among Containers
Background context explaining how load balancing distributes incoming requests across multiple instances of a service to avoid overloading any single instance.

:p What is the purpose of load balancing in microservices?
??x
Load balancing aims to distribute incoming requests evenly among all available instances of a microservice. This not only helps in managing traffic but also ensures that no single container bears an excessive workload, leading to better performance and reliability.
x??

---


#### Monitoring: Detecting Failed Microservice Instances
Background context explaining the importance of monitoring for identifying failed or unhealthy microservices to ensure load balancing works effectively.

:p Why is monitoring crucial for a healthy microservice architecture?
??x
Monitoring is essential for detecting failures in microservices. Without proper monitoring, traffic might be directed to failing instances, which can degrade the overall performance and availability of the application.
x??

---


#### Resilience: Automatic Recovery from Failures
Background context explaining how resilience mechanisms help in automatically recovering from failures within a microservice architecture.

:p What is the purpose of resilience in container orchestration?
??x
Resilience ensures that the system can automatically recover from failures. This prevents cascading effects where a single failure can bring down an entire application, making the service more robust and reliable.
x??

---


#### Container Orchestration: Running Containers Dynamically
Background context explaining how container orchestration environments like Kubernetes manage containers across multiple servers.

:p What is the role of container orchestration in managing microservices?
??x
Container orchestration tools like Kubernetes allow treating multiple servers as a single set of resources to run containers. They dynamically allocate containers based on availability, provide distributed communication and storage, and help manage the overall lifecycle of containers.
x??

---


#### Container Image and Volume Mounts
Docker containers are often misunderstood as virtual machines due to their isolated nature. When we pull a container image, it is similar to downloading an OS image for a virtual machine. We can run a container from this image with specific configurations like volume mounts and environment variables.

:p How does pulling and running a Docker container differ from traditional VM operations?
??x
When we "pull" a Docker container, it resembles downloading an OS image for a virtual machine. However, when we "run" the container, we can mount host volumes into the container to share files between the host and guest environments. Additionally, we can set environment variables that are accessible within the container.

```bash
# Pulling the Alpine Linux container image
root@host01:~# docker pull alpine:3

# Running a container with volume mounts and an environment variable
root@host01:~# docker run -ti -v /:/host -e hello=world alpine:3
```
x??

---


#### Containers vs Virtual Machines
Containers provide an isolated environment that resembles a separate system but do not have their own kernel. They are lightweight and share resources with the host, such as the file system and network stack.

:p Why can't we SSH into a container by default?
??x
By default, containers do not include services like SSH because they run in a lightweight environment shared with the host's kernel. To enable SSH or other system services within a container, they must be explicitly started inside the container using appropriate Docker commands and configurations.

```bash
# Running an Alpine Linux container without an SSH server by default
root@host01:~# docker run -ti alpine:3
/ # echo $hello  # This will not work as the environment variable is set in the parent command

# Starting a service like SSH within the container would require additional steps, e.g.,
root@host01:~# docker run -ti --rm -v /etc/ssh:/etc/ssh alpine sh -c 'apk add openssh && ssh-keygen -A'
```
x??

---

---


#### Kubernetes and Application Deployment
Background context: The text introduces the concept of deploying applications using Kubernetes, a container orchestration framework that provides load balancing, resilience, and automated scaling. It discusses setting up a single-node K3s cluster and deploying an example "to-do" application with both Node.js and PostgreSQL components.
:p What command is used to check the status of nodes in a Kubernetes cluster?
??x
To check the status of nodes in a Kubernetes cluster, use the `kubectl` command with the `get nodes` option:
```sh
root@host01:~# k3s kubectl get nodes
```
This will provide information about each node, such as its name (`NAME`), status (`STATUS`), roles (`ROLES`), age (`AGE`), and version (`VERSION`). The output might look like this:
```
NAME     STATUS   ROLES             AGE   VERSION
host01   Ready    control-plane...  2d    v1...
```
x??

---


#### Kubernetes Scaling and Recovery Mechanism
Background context: The text highlights how to scale applications in a Kubernetes cluster, emphasizing the automated recovery mechanism when containers are destroyed.
:p How can you manually increase the number of pods running for a specific deployment?
??x
To manually increase the number of pods running for a specific deployment in Kubernetes, use the `scale` command with the `--replicas` option:
```sh
root@host01:~# k3s kubectl scale --replicas=5 deployment todo
```
After scaling, you can verify that new pods have been created by listing all pods again using the following command:
```sh
root@host01:~# k3s kubectl get pods
```
This will show an updated list with more pods running for the `todo` deployment.
x??

---

