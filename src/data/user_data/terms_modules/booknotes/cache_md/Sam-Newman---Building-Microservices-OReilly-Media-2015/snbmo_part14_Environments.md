# High-Quality Flashcards: Sam-Newman---Building-Microservices-OReilly-Media-2015_processed (Part 14)


**Starting Chapter:** Environments

---


#### Immutable Servers
Background context explaining how storing configuration in source control ensures reproducibility. The problem of "configuration drift" is highlighted as a common issue that needs to be addressed.

:p What does the immutable server pattern aim to achieve?
??x
The immutable server pattern aims to ensure that no changes are made directly on running servers; all changes must go through a build pipeline, creating new machines with updated configurations. This approach helps avoid "configuration drift," where the configuration of a running host diverges from what is stored in source control.

To implement this, you might disable SSH access during image creation to prevent manual changes:

```pseudo
// Pseudo-code for disabling SSH on a VM image
function createImmutableVMImage() {
    vm = new VirtualMachine();
    // Disable SSH access
    disableSSHAccess(vm);

    return vm;
}

// Function to simulate disabling SSH access
function disableSSHAccess(vm) {
    vm.disableRemoteAccess();
}
```

x??

---


#### Different Environments for Deployments
Background context explaining the various stages and environments a microservice might go through in a CD pipeline, such as test, UAT, performance, and production. The differences between these environments are highlighted.

:p How do different environments impact software deployments?
??x
Different environments serve distinct purposes and may require different configurations or setups. For instance, a production environment might have multiple load-balanced hosts across data centers, while a test environment could run everything on a single machine. These differences can introduce challenges such as configuration drift if not properly managed.

To ensure consistency, you need to automate the creation of environments that mimic production settings where possible, but also allow for faster feedback in less complex setups:

```pseudo
// Pseudo-code for deploying software across different environments
function deploySoftware(environmentType) {
    switch (environmentType) {
        case "test":
            deployToSingleMachine();
            break;
        case "uat":
            deployToMultipleMachines();
            break;
        case "performance":
            deployWithLoadBalancing();
            break;
        case "production":
            deployWithHighAvailability();
            break;
    }
}

// Example function to simulate deployment on a single machine
function deployToSingleMachine() {
    vm = new VirtualMachine();
    installSoftware(vm);
    startServiceOnVM(vm);
}
```

x??

---

---


#### Service Configuration Management
Background context explaining how service configuration should be handled to avoid problems. Discusses the issues with building one artifact per environment and suggests managing configuration separately.

:p How should we handle different configurations for various environments as part of our deployment process?
??x
We should create a single artifact that includes core functionality, while keeping sensitive or environment-specific configurations managed separately. This can be done through properties files specific to each environment or by passing in parameters during the installation process. Using a dedicated configuration system is also recommended for managing complex and varying environments.

For example:
```properties
# app.properties (example)
database.username=myuser
database.password=mypassword
```

Or using command-line arguments:
```sh
./install.sh --env=production --db-username=admin --db-password=secretpassword
```
x??

---


#### Service-to-Host Mapping
Background context on the concept of hosts in a microservices environment, explaining how multiple services can be run on a single host for easier management and cost savings. Discusses challenges such as monitoring, side effects, and deployment complexity.

:p How many services per host should we have?
??x
Multiple services per host (up to 10-30) is often preferred due to simpler host management and reduced costs. However, it comes with challenges like increased difficulty in monitoring, potential resource contention between services, and more complex deployments.

For instance:
```java
// Example of a simple service deployment script that deploys two services on the same host.
public class ServiceDeployment {
    public void deployServicesOnHost(String hostName) {
        Service service1 = new Service("service1");
        Service service2 = new Service("service2");
        
        // Deploy both services to the same host
        service1.deployTo(hostName);
        service2.deployTo(hostName);
    }
}
```
x??

---


#### Multiple Services Per Host Model
Background context on how deploying multiple microservices on a single host can simplify deployment and reduce costs, but also poses challenges like increased monitoring complexity and resource contention. Discusses the trade-offs between this model and alternatives.

:p Why is having multiple services per host attractive?
??x
Having multiple services per host is attractive because it simplifies host management for different teams and reduces overall costs. It aligns with practices in application containerization, where many services share a single container, making deployment simpler for developers.

For example:
```java
// Example of deploying two microservices to the same host.
public class MicroserviceDeployment {
    public void deployMicroservicesOnHost(String hostName) {
        Microservice service1 = new Microservice("service1");
        Microservice service2 = new Microservice("service2");
        
        // Deploy both services to the same host
        service1.deployTo(hostName);
        service2.deployTo(hostName);
    }
}
```
x??

---


#### Challenges with Multiple Services Per Host Model
Background context on the complexities introduced by deploying multiple services on a single host, such as increased monitoring complexity, resource contention, and deployment challenges. Discusses the importance of maintaining independent release strategies.

:p What are some challenges associated with having multiple microservices per host?
??x
Some challenges include difficulty in monitoring individual services' performance independently, potential side effects from load imbalances (one service under heavy load affecting others), increased complexity in analyzing host failures and their impact, and complexities in deploying updates without affecting other services.

For example:
```java
// Example of a scenario where deployment of one microservice affects another.
public class ServiceDeployment {
    public void deployServicesWithImpact(String hostName) {
        Microservice service1 = new Microservice("service1");
        Microservice service2 = new Microservice("service2");
        
        // Deploying service1 first might impact the resources available to service2
        service1.deployTo(hostName);
        service2.deployTo(hostName);
    }
}
```
x??

---


#### Impact Analysis and Deployment Complexity
Background context on how having multiple services per host can complicate impact analysis during failures and deployment, as well as limiting autonomy of teams and options for image-based deployments.

:p What are the potential downsides of using a single host for multiple microservices?
??x
Potential downsides include difficulty in analyzing the impact of host failures (since one host failure affects all services), increased complexity in deploying updates to individual services without affecting others, reduced autonomy for different teams managing their own hosts, and limitations on deployment artifact options like image-based deployments or immutable servers.

For example:
```java
// Example of a deployment scenario where multiple services are tied together.
public class ServiceDeployment {
    public void deployServicesTogether(String hostName) {
        Microservice service1 = new Microservice("service1");
        Microservice service2 = new Microservice("service2");
        
        // Deploying both services in one step
        service1.deployTo(hostName);
        service2.deployTo(hostName);
    }
}
```
x??

---


#### Technological Constraints of Application Containers
Background context discussing how application containers can constrain technology choices, leading to the need for a specific technology stack that limits options for implementation and automation.

:p How do application containers impact technology choices?
??x
Application containers can force you to adopt a particular technology stack, which restricts both the choice of implementing technologies for your services and the options available for automated management. This constraint could be detrimental if it limits flexibility in choosing tools or frameworks that better suit specific service needs.

```java
public class TechnologyStackChoice {
    public void chooseTechnology() {
        // Code to demonstrate choosing a technology stack
        String techStack = "JVM with embedded Jetty";
        System.out.println("Choosing: " + techStack);
    }
}
```
x??

---


#### Overhead and Resource Management
Background context highlighting the overhead associated with managing multiple hosts, and how automation can help address these challenges. Discusses potential downsides of using application containers like increased complexity in lifecycle management and slower spin-up times.

:p What are some of the downsides of using application containers?
??x
Some downsides include constrained technology choices, increased complexity in lifecycle management (as compared to simply restarting a JVM), slower spin-up times affecting developer feedback cycles, and added resource overhead from commercial technologies. These factors can make managing multiple services less efficient.

```java
public class LifecycleManagement {
    public void manageLifecycle() {
        // Code to demonstrate complex lifecycle management
        System.out.println("Managing application lifecycle is more complex than restarting a JVM.");
    }
}
```
x??

---


#### Self-Contained Deployable Microservices
Background context on the approach of using self-contained deployable microservices as artifacts, highlighting examples like Nancy for .NET and Jetty embedded container in Java. Discusses their potential to operate at scale.

:p What is recommended instead of application containers?
??x
Instead of application containers, it’s recommended to use self-contained deployable microservices. Examples include using tools like Nancy for .NET or the Jetty embedded container in Java, which can run multiple services independently and are designed to operate at scale without the constraints of a single JVM.

```java
public class SelfContainedMicroservice {
    public void createMicroservice() {
        // Code to demonstrate creating self-contained microservices
        System.out.println("Creating a self-contained deployable microservice using embedded Jetty.");
    }
}
```
x??

---


#### Resource Overhead and Management Complexity
Background context on the resource overhead associated with application containers, including commercial costs and added complexity in analyzing resource use and threads due to multiple applications sharing the same process.

:p What are some of the resource-related challenges with application containers?
??x
Resource-related challenges include additional costs for commercial tools, higher resource overhead from using these technologies, increased complexity in analyzing resource use and thread management when multiple applications share a single process. These factors can impact performance and scalability negatively.

```java
public class ResourceManagement {
    public void manageResources() {
        // Code to demonstrate managing resources with shared JVMs
        System.out.println("Managing resources becomes complex with multiple services sharing the same JVM.");
    }
}
```
x??

---

