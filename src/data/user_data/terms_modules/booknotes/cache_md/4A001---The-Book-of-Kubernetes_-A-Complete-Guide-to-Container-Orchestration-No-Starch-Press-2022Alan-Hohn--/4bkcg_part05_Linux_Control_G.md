# High-Quality Flashcards: 4A001---The-Book-of-Kubernetes_-A-Complete-Guide-to-Container-Orchestration-No-Starch-Press-2022Alan-Hohn--_processed (Part 5)


**Starting Chapter:** Linux Control Groups

---


---
#### Process Prioritization and CPU Utilization
Explanation: In this context, we discuss how process prioritization through the nice value does not solve the problem of balancing CPU usage across containerized applications running on a Kubernetes cluster. Lower-priority processes can still use 100% of one CPU if no other work is available, which might seem beneficial but leads to issues in multitenant environments.

:p What issue arises from using process prioritization with lower-nice-value processes?
??x
Even though the nice value lowers a process's priority, it does not prevent the process from utilizing 100% of one CPU if no other processes are demanding CPU resources. This can cause imbalances in resource distribution and affect other containers running on the same host.
x??

---


#### Container Orchestration Challenges
Explanation: In multitenant Kubernetes clusters, container orchestration faces challenges due to varying priorities and unpredictable CPU usage patterns among multiple applications or teams.

:p Why is it problematic for a container orchestration system like Kubernetes to rely solely on process priority for resource allocation?
??x
Relying solely on process priority can lead to issues because the relative priority of each container cannot be known in a multitenant environment. This uncertainty makes it difficult for the cluster to accurately determine which hosts have available resources and which are fully utilized, potentially leading to inefficient scheduling.
x??

---


#### Linux Control Groups (cgroups)
Explanation: cgroups are a mechanism within the Linux kernel that can enforce limits on resource usage by processes or groups of processes, ensuring that each process gets only as much CPU time as it is allocated.

:p What is the main purpose of using control groups in containerized applications?
??x
The primary purpose of using control groups (cgroups) is to limit and manage resource utilization by processes. Specifically, cgroups can ensure that containers do not exceed their allocated resources, helping Kubernetes to better schedule containers on hosts with sufficient available resources.
x??

---


#### Hierarchy of Control Groups
Explanation: Cgroups in Linux form a hierarchical structure where each resource type (CPU, memory, block device) has its own cgroup hierarchy. Processes are placed within these hierarchies, and the kernel enforces limits from the group.

:p How does the hierarchical nature of cgroups work?
??x
The hierarchical nature of cgroups allows for nested control over resources. Each entry in `/sys/fs/cgroup` represents a different resource type (e.g., CPU, memory). Processes are assigned to specific cgroups within this hierarchy. The kernel enforces limits set at each level of the hierarchy, starting from root and moving down to leaf nodes.
x??

---


#### Creating and Configuring Cgroups
Explanation: In Linux, configuring cgroups involves managing processes through a special filesystem that mirrors the hierarchical structure of cgroups.

:p How are cgroups configured in a Linux environment?
??x
Cgroups are configured using a specific type of filesystem. To configure cgroups for CPU limits, you would typically use commands to create and modify cgroup directories under `/sys/fs/cgroup/cpu` or `cpuacct`. For example:
```bash
mkdir /sys/fs/cgroup/cpu/mycontainer
echo "process-pid" > /sys/fs/cgroup/cpu/mycontainer/tasks
```
This places the process with PID `process-pid` into a new cgroup named `mycontainer`, which enforces CPU limits.
x??

---


#### Kubernetes and Resource Management
Explanation: To effectively manage resource allocation in Kubernetes, specific resource requests and limits are set for containers. This ensures that even non-real-time processes do not consume more resources than allocated.

:p How can we use control groups to ensure fair CPU distribution among containers in a multitenant Kubernetes cluster?
??x
To ensure fair CPU distribution, you configure each container with specific CPU request and limit values using Kubernetes' resource specifications (`requests` and `limits`). For example:
```yaml
apiVersion: v1
kind: Pod
metadata:
  name: my-pod
spec:
  containers:
  - name: my-container
    image: my-image
    resources:
      limits:
        cpu: "0.5" # limit to half a CPU core
      requests:
        cpu: "0.25" # minimum guarantee of a quarter of a CPU core
```
This configuration ensures that `my-container` gets no more than 0.5 CPU cores and at least 0.25 CPU cores, helping Kubernetes to schedule containers across hosts efficiently.
x??

---

---


---
#### Understanding cgroups and CPU Controls
Cgroups (Control Groups) are a Linux kernel feature that allows for the creation of resource management hierarchies. They can be used to control resources such as CPU, memory, disk I/O, network, etc., on a per-process or per-container basis.

:p What is a key purpose of using cgroups in managing processes?
??x
Cgroups enable administrators to limit and monitor the usage of system resources for specific processes or groups of processes. This is useful for optimizing resource allocation, ensuring that critical services have sufficient resources, and preventing any single process from consuming all available resources.
x??

---


#### Using `cpu.cfs_period_us` and `cpu.cfs_quota_us`
These files control the CPU time allocation per period.

:p What do the `cpu.cfs_period_us` and `cpu.cfs_quota_us` parameters control?
??x
- `cpu.cfs_period_us`: This parameter defines the length of a period, measured in microseconds. During each period, all processes within the cgroup are allowed to use CPU time.
- `cpu.cfs_quota_us`: This parameter sets the maximum amount of CPU time (in microseconds) that the cgroup can use during a single period.

For example:
```sh
# Set a 100ms period and allow up to 50% of the period's duration in this case
echo 100000 > /sys/fs/cgroup/cpu/system.slice/runc-${CUL_ID}.scope/cpu.cfs_period_us
echo 50000 > /sys/fs/cgroup/cpu/system.slice/runc-${CUL_ID}.scope/cpu.cfs_quota_us
```
x??

---

---


#### Setting CPU Quotas for Containers
Background context: In this scenario, we need to control the CPU usage of a container named `stress` by setting an absolute quota. The method involves modifying the `cpu.cfs_quota_us` file within the cgroup filesystem, which specifies how much time in microseconds (μs) the processes can use the CPU per period.

:p How do you set a CPU quota for a container?
??x
To set a CPU quota for a container, you modify the `cpu.cfs_quota_us` file within the appropriate cgroup. This file determines the amount of CPU time that the processes in this cgroup are allowed to use per period (specified by `cpu.cfs_period_us`). For instance, if you want to limit a container's CPU usage to 50% of one core, you can set `cpu.cfs_quota_us` to half of `cpu.cfs_period_us`.

Example command:
```sh
echo "50000" > cpu.cfs_quota_us
```
This sets the quota such that for every period (100,000 μs in this case), the processes get 50,000 μs of CPU time, which corresponds to 50% usage.

x??

---


#### Launching a Container with CPU Limits
Background context: Once you have defined the necessary YAML files for your Pod and containers, you can launch a container with predefined CPU limits by running these configurations through `crictl`.

:p How do you launch a container with predefined CPU limits using crictl?
??x
To launch a container with predefined CPU limits, follow these steps:

1. **Run the Pod**:
   ```sh
   PCL_ID=$(crictl runp po-clim.yaml)
   ```
2. **Create and Start the Container**:
   ```sh
   CCL_ID=$(crictl create $PCL_ID co-clim.yaml po-clim.yaml)
   crictl start $CCL_ID
   ```

This sequence of commands starts a container with the specified CPU limits defined in `co-clim.yaml` and runs it within the Pod described by `po-clim.yaml`.

x??

---

---


#### CPU Usage and Quotas
Background context explaining the concept of CPU usage, including how `top` provides a snapshot of process activity. The text describes using `stress-ng` to monitor CPU usage and shows how CRI-O manages CPU quotas via cgroups.
:p How does CRI-O manage CPU quotas for containers?
??x
CRI-O manages CPU quotas by creating cgroups (control groups) that limit the amount of CPU time a container can use. For example, it uses the `cpu.cfs_quota_us` file to specify the number of microseconds a container is allowed to run in a given period.

For instance, if you see the following output:
```
root@host01:...pod.slice# cat crio-$CCL_ID.scope/cpu.cfs_quota_us
10000
```
It means the container has been allocated 10 milliseconds (10,000 microseconds) of CPU time per second. This ensures that even if a process attempts to use more CPU, it will be throttled.

Code example:
```bash
# Check the CPU quota for a specific container
cat /sys/fs/cgroup/cpu/pod.slice/crio-$CCL_ID.scope/cpu.cfs_quota_us
```
x??

---


#### Unix Limits and Containers

Background context explaining why Unix limits are insufficient for container management. Discuss the limitations related to individual processes, users, and resource allocation.

:p What is a primary limitation of using traditional Unix limits for managing containers?
??x
Unix limits are applied to individual processes or an entire user, which is insufficient because containers require limiting resources across multiple processes grouped within a single container.
x??

---


#### cgroups for Memory Limits

Explanation on how cgroups can be used to apply memory limits in Kubernetes.

:p Why do we need to use cgroups for setting memory limits in containers?
??x
cgroups allow us to set resource limits at the group level, which is essential for managing multiple processes within a container. This is necessary because traditional Unix limits are applied either per process or per user and don't address the need for shared resource limitations across all processes within a container.
x??

---


#### OOM Killer Overview
Background context explaining the concept. The Out of Memory (OOM) killer is a feature in Linux that helps manage system memory when it becomes scarce by killing processes to free up memory. This is particularly useful in containerized environments where individual containers are not critical and can be restarted.
:p What is the OOM killer?
??x
The OOM killer is a mechanism in the Linux kernel designed to handle situations where there isn't enough available memory for all running processes. When the system runs out of memory, the OOM killer selects one or more processes to kill to free up resources, prioritizing less essential ones.
x??

---


#### Differences Between Regular Memory Limits and OOM Killer
Background context explaining how regular memory limits differ from the OOM killer behavior. Regular memory limits cause immediate failure when exceeded, whereas the OOM killer sends SIGKILL signals to terminate processes.
:p How do regular memory limits and OOM killer differ in handling memory constraints?
??x
Regular memory limits cause the memory allocation process to fail immediately when the limit is reached. In contrast, the OOM killer sends a SIGKILL signal to terminate the process, allowing it to clean up resources before termination. The difference lies in how the system responds to memory constraints—failures or graceful shutdowns.
x??

---


#### Conclusion: Handling Memory Constraints in Containers
Background context summarizing the need for handling memory constraints effectively in containerized environments. The OOM killer is a useful tool, but it should be balanced with proper resource management practices to ensure system stability and efficiency.
:p How can we manage memory constraints effectively in containers?
??x
To manage memory constraints effectively in containers, use a combination of regular memory limits, monitoring tools like cgroups, and the OOM killer. Regularly monitor and adjust resource allocation policies to prevent memory issues while leveraging the OOM killer for critical scenarios where immediate action is necessary.
x??

---

---


#### Network Bandwidth Control Overview
Background context: This section explains the challenges in controlling network bandwidth, including why managing ingress traffic at the host level is difficult. It introduces VLANs and traffic shaping as potential solutions.
:p Why is controlling network bandwidth more challenging than CPU or memory control?
??x
Controlling network bandwidth is more challenging because:
- Network devices don't sum up like CPU or memory; thus, usage needs to be limited per individual device.
- The host can only control egress (outgoing) traffic and not completely control ingress (incoming) traffic at the host level.

This makes it difficult to manage overall network bandwidth effectively from a single host perspective. VLANs and traffic shaping on switches/routers are commonly used to address this challenge.
x??

---


#### Using `tc` for Traffic Control
Background context: The text explains how to use `tc` (Traffic Control) to set a quota for outgoing traffic, providing an example with specific parameters.
:p How can you limit the egress bandwidth using `tc`?
??x
To limit egress bandwidth using `tc`, you can configure the Traffic Control settings as follows:
```bash
IFACE=$(ip -o addr | grep 192.168.61.11 | awk '{print $2}')
tc qdisc add dev $IFACE root tbf rate 100mbit burst 256kbit latency 400ms
```
This command sets a Traffic Control (TBF) queue discloser on the specified interface (`$IFACE`), limiting the outgoing traffic to `100mbit` with a burst size of `256kbit` and a latency of `400ms`.
x??

---

