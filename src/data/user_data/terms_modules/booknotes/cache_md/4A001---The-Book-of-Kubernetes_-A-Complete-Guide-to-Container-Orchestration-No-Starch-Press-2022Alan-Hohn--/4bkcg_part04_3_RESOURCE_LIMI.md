# High-Quality Flashcards: 4A001---The-Book-of-Kubernetes_-A-Complete-Guide-to-Container-Orchestration-No-Starch-Press-2022Alan-Hohn--_processed (Part 4)


**Starting Chapter:** 3 RESOURCE LIMITING

---


#### Namespace and Process Isolation in Containers
Background context: The text explains that containers create an isolated environment for processes, similar to traditional process isolation techniques. However, this isolation is achieved through Linux namespaces rather than full virtualization.
:p What are the key differences between container isolation and virtual machine (VM) environments?
??x
Container isolation, facilitated by Linux namespaces, isolates processes at a higher level compared to VMs. Unlike VMs, containers share the same kernel but provide isolated views of resources like network devices, file systems, and process IDs. This means that while each container has its own virtualized environment for these resources, they still share the underlying hardware and operating system.
x??

---


#### Container Runtimes and Namespaces
Background context: The example demonstrates the use of `containerd` and CRI-O, which employ namespaces to isolate containers from each other. This isolation prevents processes in one container from interfering with those in another.
:p How do `containerd` and CRI-O ensure process isolation between different containers?
??x
`containerd` and CRI-O use Linux namespaces to provide a separate view of system resources for each container. By utilizing namespaces, they isolate processes such as network devices, file systems, and user IDs. This ensures that processes running in one container cannot interfere with those in another.
```bash
# Example command to list namespace information
nsenter --mount=/proc/1/mounts --uts=hostname --ipc=ipcs --net=iproute2 --pid=1 -- /bin/bash
```
x??

---


#### Process Interference and Resource Management
Background context: The text points out that while namespaces provide isolation, they do not prevent processes from consuming too many resources. This can affect other processes within the container.
:p How does resource consumption by one process impact others in a shared namespace?
??x
If a single process consumes excessive CPU, memory, or network resources, it can starve other processes running in the same container of these resources. Namespaces provide isolation but do not enforce strict limits on resource usage. To manage this, resource management tools must be used to ensure fair distribution and prevent overconsumption.
x??

---

---


#### Process Isolation and Resource Management
Background context: In Chapter 2, we discussed process isolation to prevent processes from affecting each other. However, without resource limits, a process could still consume too many resources (CPU, memory, network), impacting others.

:p What is the importance of limiting CPU, memory, and network resources for processes?
??x
Limiting these resources ensures that no single process consumes all available resources, thereby preventing starvation or degradation in performance for other processes. This is crucial for resource management in a containerized environment like Kubernetes.
x??

---


#### Completely Fair Scheduler (CFS)
Background context: The Linux kernel uses the Completely Fair Scheduler (CFS) to manage CPU scheduling among processes.

:p How does CFS ensure fairness?
??x
CFS ensures fairness by dynamically allocating CPU time based on the priority of each process. It creates a prioritized list, giving higher priority to more important processes and ensuring that all processes get an opportunity to run.
x??

---


#### Scheduling Policy and Priority
Background context: CFS schedules processes based on both the policy and priority within that policy.

:p How does CFS determine which process to run next?
??x
CFS determines the next process by considering both the scheduling policy (real-time vs. non-real-time) and the priority of each process under that policy. Real-time processes are always given higher priority than non-real-time ones.
x??

---


#### CPU Limits in Kubernetes
Background context: Applying CPU limits ensures that a container does not consume more resources than allocated, providing certainty for resource allocation.

:p How can we apply CPU limits to containers?
??x
To apply CPU limits, you define the maximum amount of CPU (in cores or millicores) a container can use. For example, `cpu-limit: 500m` means the container cannot consume more than 500 millicores.
x??

---


#### Real-Time Processes Example
Background context: Real-time processes have critical deadlines and are given higher priority.

:p What is an example of a real-time process?
??x
An example of a real-time process could be a system collecting data from an embedded hardware device. The process must read the data before the hardware buffer overflows, making it crucial to prioritize this process.
x??

---


#### Non-Real-Time Processes Example
Background context: Non-real-time processes do not have strict deadlines but still require fair scheduling.

:p What is an example of a non-real-time process?
??x
An example of a non-real-time process could be a web server handling requests. While timely response is important, it does not have the same critical deadline as real-time tasks.
x??

---


#### Scheduling Policies in Linux
Linux supports multiple scheduling policies for different types of tasks. The most common are time-sharing (TS), first-in-first-out (FIFO or FF), and round-robin (RR).

:p What does the `ps` command output tell us about a process's scheduling class?
??x
The `ps -e -o pid,class,rtprio,ni,comm` command outputs the scheduling class of each process. The class can be:
- TS: Time-sharing policy for normal processes.
- FF: First-in-first-out (FIFO) or real-time priority.

For example:
```
PID CLS RTPRIO NI COMMAND
1   TS    -     0 systemd ...
6   TS    -    -20 kworker/0:0H-kblockd ...
11  FF    99   - migration/0
12  FF    50   - idle_inject/0
85  FF    99   - watchdogd ...
484 RR    99   - multipathd ...
7967 TS    -     0 ps
```

Here, `systemd` and other non-real-time processes are listed as `TS`, while `watchdogd` is a real-time process with the `FF` class.
x??

---


#### Setting Process Priorities in Linux
Linux provides mechanisms to set and control process priorities. The priority can be adjusted using tools like `renice` or directly through the scheduling policy.

:p What are the two numeric fields that indicate how processes are prioritized within their respective policies?
??x
The `ps -e -o pid,class,rtprio,ni,comm` command provides two numeric fields to indicate process priorities:
- **RTPRIO**: Real-time priority (applies only to real-time processes).
- **NI**: Nice level (applies only to non-real-time processes).

For example:
```
PID CLS RTPRIO NI COMMAND
1   TS    -     0 systemd ...
6   TS    -    -20 kworker/0:0H-kblockd ...
11  FF    99   - migration/0
12  FF    50   - idle_inject/0
85  FF    99   - watchdogd ...
484 RR    99   - multipathd ...
7967 TS    -     0 ps
```

The `NI` field ranges from -20 (highest priority) to 19 (lowest priority), while the `RTPRIO` field indicates real-time priorities.
x??

---


#### Running a Containerized Process with CRI-O
CRI-O is a container runtime for Kubernetes clusters. It allows running and managing containers on Linux systems.

:p How can you start a container using CRI-O, and what are the steps involved?
??x
To start a container using CRI-O, you need to define Pod and Container YAML files, pull the container image, and then run the container through `crictl`.

1. **Pull the Image:**
   ```sh
   root@host01:/opt# crictl pull docker.io/bookofkubernetes/stress:stable
   ```

2. **Create a Pod and Container using YAML Files:**

   - Pod YAML (`po-nolim.yaml`):
     ```yaml
     ---
     metadata:
       name: stress
       namespace: crio
     linux:
       security_context:
         namespace_options:
           network: 2
     ```

   - Container YAML (`co-nolim.yaml`):
     ```yaml
     ---
     metadata:
       name: stress
     image:
       image: docker.io/bookofkubernetes/stress:stable
     args:
       - "--cpu"
       - "1"
       - "-v"
     ```

3. **Run the Pod and Container:**
   ```sh
   root@host01:/opt# cd /opt
   root@host01:/opt# PUL_ID=$(crictl runp po-nolim.yaml)
   root@host01:/opt# CUL_ID=$(crictl create $PUL_ID co-nolim.yaml po-nolim.yaml)
   root@host01:/opt# crictl start $CUL_ID
   ```

4. **Verify the Container is Running:**
   ```sh
   root@host01:/opt# crictl ps
   ```

These steps ensure that a containerized process, specifically `stress`, runs in a defined environment using CRI-O.
x??

---

---


#### Linux Control Groups (cgroups)
Control groups (cgroups) manage process resource utilization by limiting access to system resources such as CPU, memory, and block devices. Each resource type can have a hierarchy of cgroups associated with it.
:p What is the purpose of control groups (cgroups)?
??x
The purpose of control groups is to provide finer-grained control over how processes use system resources like CPU time, memory, and I/O operations, ensuring that no single process monopolizes critical resources at the expense of others.
x??

---


#### Creating and Configuring Cgroups
Cgroups are configured through the specific filesystem interface provided by Linux. The creation and configuration process involve setting limits on resources for processes grouped within a cgroup.
:p How do you create and configure cgroups?
??x
To create and configure cgroups, you typically use shell commands to set resource limits:
```sh
# Create a new cgroup named 'my-cgroup'
mkdir /sys/fs/cgroup/cpu/my-cgroup

# Set CPU limit for the group
echo 1000 > /sys/fs/cgroup/cpu/my-cgroup/cpu.cfs_period_us
echo 900 > /sys/fs/cgroup/cpu/my-cgroup/cpu.cfs_quota_us
```
x??
---

---


---

#### CPU Control Groups Overview
This section explains how to manage CPU usage using control groups (cgroups) on a Linux system. The `/sys/fs/cgroup/cpu` directory provides insights into how processes are organized and controlled within different cgroups.

:p What is the significance of examining directories like `/sys/fs/cgroup/cpu`?
??x
The significance lies in understanding the hierarchical structure of cgroups and identifying which process belongs to which cgroup, facilitating effective resource management. Each subdirectory represents a separate CPU control group with its own set of configuration files.
```bash
root@host01:/sys/fs/cgroup/cpu# cd /sys/fs/cgroup/cpu
root@host01:/sys/fs/cgroup/cpu# ls -F
cgroup.clone_children  cpuacct.stat               cpuacct.usage       init.scope/      cgroup.sane_behavior   cpu.cfs_period_us    cpu.shares         cpu.stat          system.slice/
cpuacct.usage_all      cpuacct.usage_cpuacct.usage              notify_on_release  cpuacct.usage_percpu  cpuacct.usage_sys     cpuacct.usage_user  tasks             user.slice/
```
x??

---


#### Practical Example: Limiting CPU Usage with `stress-ng`
This example demonstrates how to limit the CPU usage of a running process using cgroups.

:p How can you use the `stress-ng` command in conjunction with cgroups to limit CPU usage?
??x
By moving a process into a specific cgroup and configuring its limits, you can effectively control the amount of CPU time it uses. The example shows how to verify the current CPU usage and then set limitations.

```bash
root@host01:/sys/fs/cgroup/cpu# top -b -n 1 -p $(pgrep -d , stress)
```
This command checks the current CPU usage before any changes are made.

Next, you can limit the CPU usage by modifying files like `cpu.cfs_period_us` and `cpu.cfs_quota_us` in the cgroup directory of the process. For instance:

```bash
root@host01:/sys/fs/cgroup/cpu/system.slice/runc-${CUL_ID}.scope# echo 5000 > cpu.cfs_period_us
root@host01:/sys/fs/cgroup/cpu/system.slice/runc-${CUL_ID}.scope# echo 4000 > cpu.cfs_quota_us
```
This configuration limits the process to use only 80% of the CPU time during each period.

x??

---

---


#### Verifying the CPU Usage Limitation
Background context: After setting the quota, we need to verify that the stress container is indeed limited by the configured CPU usage.

:p How can we confirm that the stress container's CPU usage has been limited?
??x
We can use `top` or other monitoring tools to check the CPU usage of the processes. For example:
```bash
top -b -n 1 -p $(pgrep -d , stress)
```
This command will show the current CPU usage percentage for the `stress` container.

In our case, we see that the stress container is using approximately 50% of one CPU.
x??

---


#### Launching a Container with Specified CPU Limits
Background context: After configuring, we can launch the container and verify that it adheres to the defined limits.

:p How do you launch a container with specified CPU limits using crictl?
??x
You can launch the container by specifying the pod and container configurations in `crictl`:
```bash
PCL_ID=$(crictl runp po-clim.yaml)
CCL_ID=$(crictl create $PCL_ID co-clim.yaml po-clim.yaml)
crictl start $CCL_ID
```
This command sequence creates the pod, attaches the container to it, and starts the container.

After starting the container, you can confirm its CPU usage using `top` or other monitoring tools.
x??

---

---

