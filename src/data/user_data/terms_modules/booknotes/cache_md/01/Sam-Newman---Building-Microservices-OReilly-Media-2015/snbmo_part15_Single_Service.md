# High-Quality Flashcards: Sam-Newman---Building-Microservices-OReilly-Media-2015_processed (Part 15)


**Starting Chapter:** Single Service Per Host

---


#### Single Service Per Host Model
This model aims to simplify monitoring, remediation, and scaling by ensuring each host runs only a single microservice. It helps reduce single points of failure and eases security management.

:p What are the benefits of using a single-service-per-host model in microservices architecture?
??x
The benefits include simplified monitoring and remediation, easier scalability of individual services, reduced complexity, and improved security by focusing on specific services and hosts. This approach also allows for more flexible deployment techniques like image-based deployments or immutable server patterns.

For example:
```java
public class ServiceA {
    public void handleRequest() {
        // Handle request logic for service A
    }
}

public class ServiceB {
    public void handleRequest() {
        // Handle request logic for service B
    }
}
```
In this scenario, each microservice runs on its own host, making it easier to manage and scale.

x??

---


#### Monitoring and Remediation Simplicity
By running a single service per host, monitoring the health of services becomes more straightforward. Each host can be monitored independently, simplifying the process of identifying issues and applying fixes.

:p How does running a single service on each host simplify monitoring?
??x
Running a single service on each host makes it easier to monitor because you only need to check one service per host. This isolation allows for simpler and more targeted remediation efforts when an issue arises.

For instance, if `ServiceA` is running on Host1 and `ServiceB` on Host2, issues can be isolated to their respective hosts, making troubleshooting more efficient.

x??

---


#### Scale and Failure Design
Designing for scale and failure becomes more manageable with the single-service-per-host model. This approach helps in identifying which service has failed when an outage occurs.

:p How does a single-service-per-host design aid in scale and failure management?
??x
This design aids in scale and failure management by ensuring that outages affect only specific services, not the entire system. You can independently scale each service as needed without affecting others. For example, if `ServiceA` experiences an outage, it impacts only its host and does not bring down other services.

```java
public class ServiceManager {
    public void handleFailure(ServiceType service) {
        switch (service) {
            case A:
                // Handle failure for ServiceA
                break;
            case B:
                // Handle failure for ServiceB
                break;
        }
    }
}
```
Here, each `Service` is managed independently, making it easier to isolate and address failures.

x??

---


#### Cost Implications of More Servers
While the single-service-per-host model provides benefits in terms of monitoring and management, there are downsides like increased server management overhead and potential cost implications for running more distinct hosts.

:p What are the potential downsides of using a single-service-per-host model?
??x
The potential downsides include:
- Increased complexity in managing a larger number of servers.
- Higher costs associated with operating multiple hosts.

For example, if you previously had 3 hosts and now need to scale to 10, there will be more resources required for management tools, additional hardware, and possibly increased cloud costs.

x??

---


#### Alternative Deployment Techniques
The single-service-per-host model opens up the potential to use alternative deployment techniques such as image-based deployments or immutable server patterns. These methods can simplify updates and rollbacks but require careful planning.

:p How does a single-service-per-host architecture support alternative deployment techniques?
??x
A single-service-per-host architecture supports alternative deployment techniques like:
- **Image-Based Deployments**: You can create and maintain consistent images for each service, making deployments more predictable.
- **Immutable Server Patterns**: Each host runs a fixed image, reducing the risk of state corruption during updates.

For instance:
```java
public class DeploymentManager {
    public void deployNewVersion(ServiceType service) {
        switch (service) {
            case A:
                updateServiceAImage();
                break;
            case B:
                updateServiceBImage();
                break;
        }
    }

    private void updateServiceAImage() {
        // Logic to update ServiceA's image
    }

    private void updateServiceBImage() {
        // Logic to update ServiceB's image
    }
}
```
This ensures that each service can be updated independently without affecting others.

x??

---

---


#### Importance of Automation in DevOps
Automation can significantly reduce the overhead associated with managing multiple servers and services, making it easier to scale without increasing workload proportionally. Tools like Ansible or Jenkins facilitate this automation.
:p Why is automation important in managing a large number of servers and services?
??x
Automation is crucial because it allows for consistent and repeatable processes across many machines, reducing human error and freeing up developers' time to focus on development rather than manual tasks. Automation tools can handle tasks such as deployment, configuration management, and monitoring.
```yaml
# Example Ansible playbook for deploying an application
- name: Deploy web application
  hosts: web_servers
  tasks:
    - name: Ensure the application is deployed
      copy:
        src: /path/to/app.jar
        dest: /opt/myapp/
```
x??

---

---


#### Automation in Microservice Architectures
Background context explaining how automation is crucial for managing microservices, including provisioning services, deployment processes, and monitoring. The chapter emphasizes that automation helps maintain productivity among developers by enabling self-service for provisioning and deploying services.

:p What are some key aspects of automation mentioned in the text?
??x
Automation involves several critical areas:
1. **Provisioning Services**: Developers should be able to provision individual or groups of services easily.
2. **Deployment Processes**: Software deployment must be automated, ensuring that changes can be deployed without manual intervention.
3. **Database Changes**: Deployment of database changes should also be automated to reduce human error and increase efficiency.

x??

---


#### Case Study: RealEstate.com.au
Background context explaining the journey of REA towards a distributed microservices architecture. The case study highlights how automation was essential in transitioning from monolithic architectures to microservices, reducing development time significantly over 18 months.

:p What challenges did REA face during its transition to a microservices-based architecture?
??x
REA faced significant initial challenges due to the complexity of setting up the necessary tooling. The company had to spend considerable time on getting services provisioned, deploying code, and monitoring them initially. This front-loading of work impacted the development pace early on.

For example:
- In the first three months: Just two new microservices were moved into production.
- Next three months saw 10-15 microservices being deployed.
- By the end of 18 months: Over 60-70 microservices were live.

x??

---


#### Case Study: Gilt
Background context explaining Gilt's move from a monolithic Rails application to multiple microservices. The case study illustrates how automation, particularly in tooling for developers, drove the rapid adoption and growth of microservices within the company.

:p How did Gilt's approach to microservices differ initially compared to later stages?
??x
Initially, Gilt had a monolithic Rails application which was difficult to scale. In 2009, they started decomposing this into multiple microservices due to automation, especially in tooling for developers. Over time, the use of automated processes significantly increased their microservice count:
- After one year: Around 10 microservices.
- By 2012: Over 100 microservices.
- In 2014: More than 450 microservices.

This rapid growth was attributed to automation and developer-friendly tooling, making it easier for developers to handle the build, deployment, and support of services.

x??

---


#### Diminishing Returns in Slicing VMs
Explain why there are diminishing returns when slicing a physical server into smaller VMs, highlighting resource allocation issues.

:p Why do we face diminishing returns when trying to slice up our physical infrastructure further?
??x
As you create more VMs on a single physical server, the overhead of the hypervisor increases. This means that each VM gets fewer resources because a portion of the CPU, memory, and other resources are consumed by the hypervisor itself. Eventually, adding more VMs leads to less available resources for applications running inside them.

This can be illustrated with an example:
```java
public class ResourceAllocation {
    private int totalCores;
    private List<VirtualMachine> vmList;

    public void allocateResources() {
        for (VirtualMachine vm : vmList) {
            // Calculate effective resource allocation after considering hypervisor overhead
        }
    }
}
```
x??

---


#### Lightweight Containers
Introduce the concept of lightweight containers as an alternative to traditional VMs, discussing their advantages and disadvantages compared to virtualization.

:p What are lightweight containers and how do they compare to traditional VMs?
??x
Lightweight containers, such as Docker or LXC, run directly on the host's operating system without a full-fledged hypervisor. They isolate applications by using namespaces and control groups (cgroups) but share the kernel with other processes running on the same host. This approach minimizes overhead and allows for more efficient use of resources.

For example:
```java
public class ContainerManager {
    private List<Container> containerList;

    public void startContainers() {
        // Start containers without hypervisor overhead
    }
}
```
x??

---

---


#### Security Considerations with Linux Containers
Despite their advantages, Linux containers have limitations regarding isolation. Processes within a container can potentially interact with other containers or the host due to shared kernel resources.

:p What are some security concerns with using Linux Containers?
??x
Security concerns include:
- Potential for processes from one container to interact with others or the host.
- Need for careful management of permissions and resource allocation.
- Risk of bugs or design limitations allowing processes to escape isolation.

Mitigation strategies might involve thorough testing, using established best practices, and monitoring for unusual activity.
x??

---

