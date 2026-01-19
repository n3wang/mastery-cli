# High-Quality Flashcards: 4A001---The-Book-of-Kubernetes_-A-Complete-Guide-to-Container-Orchestration-No-Starch-Press-2022Alan-Hohn--_processed (Part 5)


**Starting Chapter:** Memory Limits

---


#### Memory Limits in Linux
Background context: The provided text discusses memory management and limitations on processes. It explains that setting a virtual memory limit ensures that a process cannot exceed a certain amount of memory, including both RAM and swap space.
:p How does `ulimit` help manage memory usage in Linux processes?
??x
The `ulimit` command allows setting resource limits for processes running from the current shell session. The example sets a maximum virtual memory limit to 256 MiB.

```shell
root@host01:~# ulimit -v 262144
```
This command restricts each process started from this shell session to use up to 262144 bytes (256 MiB) of virtual memory. The limit prevents processes from consuming excessive swap space.

To verify the limit, attempting to allocate more than the allowed amount results in a failure:

```shell
root@host01:~# cat /dev/zero | head -c 500m | tail
tail: memory exhausted
```
The `cat /dev/zero` command reads from `/dev/zero`, and `head -c 500m` attempts to keep the first 500 MiB in memory. However, when it tries to allocate more space with `tail`, the limit is hit, causing an error.

x??
---

---


#### Cgroups for Memory Limits
Cgroups (Control Groups) are used to enforce memory limits effectively in container environments. They allow setting resource limits at the cgroup level, ensuring that all processes within a container adhere to those limits.

:p How does using cgroups help with managing memory limits in containers?
??x
Using cgroups helps manage memory limits by allowing you to set resource constraints at the cgroup level. This ensures that all processes within a container are constrained by these limits, rather than applying limits individually or at the user level.
```yaml
# Example YAML configuration for setting memory limit with cgroups

---


#### OOM Killer in Container Environments
The context is about understanding why containers might be killed by the Out of Memory (OOM) killer, especially in a scenario where memory limits are exceeded. The OOM killer intervenes when the system runs out of memory, killing processes to prevent the entire system from crashing.
:p Why does the OOM killer intervene with stress-ng-vm?
??x
The OOM killer intervenes because the system is running low on memory and needs to free up resources by terminating some processes. In this case, `stress-ng-vm` repeatedly hits its memory limit set by the container runtime (e.g., CRI-O), causing it to be terminated with a `SIGKILL` signal.
```shell
stress-ng: debug: [11] stress-ng-vm: child died: signal 9 'SIGKILL' (instance 0)
```
x??

---


#### OOM Killer vs. Memory Limits
To understand the difference, we need to know that regular memory limits cause allocation failures rather than process termination by the OOM killer.
:p How does the OOM killer differ from setting a simple memory limit?
??x
The OOM killer is triggered when the system is critically low on memory and there are no other processes willing to release their memory. In contrast, setting a simple memory limit causes any attempt to exceed that limit to fail immediately without involving the OOM killer.
```shell
# Example of a process hitting a memory limit
stress-ng: info:  [6] dispatching hogs: 1 vm ...
stress-ng: debug: [11] stress-ng-vm: started [11] (instance 0)
stress-ng: debug: [11] stress-ng-vm using method 'all'
```
x??

---


#### OOM Killer in Containerized Environments
The context explains that container environments use the OOM killer to manage memory usage, especially when scaling and reliability are key concerns.
:p Why is the OOM killer used in containerized environments?
??x
The OOM killer is used because containers are designed to be lightweight and scalable. If a process exceeds its allocated memory, it's better to kill the process quickly rather than let it hang, which could impact other services or even crash the system.
```shell
# Example of OOM killer action
[  696.651056] oom_reaper: reaped process 8756 (stress-ng-vm)...
```
x??

---


#### Memory Management in Containers
The text discusses how containers manage memory and the risks associated with setting strict limits.
:p What is a potential downside of using strict memory limits without OOM killer intervention?
??x
A potential downside is that processes may hang or become unresponsive if they exceed their allocated memory, potentially leading to system instability. The alternative—using the OOM killer—is generally considered safer as it ensures processes are terminated quickly and cleanly.
```shell
stress-ng: debug: [11] stress-ng-vm: child died: signal 9 'SIGKILL' (instance 0)
```
x??

---


#### Network Bandwidth Control with `tc`
To limit egress bandwidth, tools like `tc` (Traffic Control) can be used to apply rate limits and ensure that processes do not saturate the available bandwidth.

:p How is the `tc qdisc add dev` command used to set a quota for outgoing traffic?
??x
The `tc qdisc add dev` command sets up a traffic control discipline on the specified network interface (`$IFACE`). Here, it adds a TBF (Token Bucket Filter) with a rate limit of 100mbit and burst size of 256kbit.

```bash
root@host01:~# IFACE=$(ip -o addr | grep 192.168.61.11 | awk '{print$2}')
root@host01:~# tc qdisc add dev $IFACE root tbf rate 100mbit \
    burst 256kbit latency 400ms
```
This command ensures that outgoing traffic does not exceed the specified rate, providing a more reliable network environment.

x??

---


---
#### Identifying Network Interfaces
To control network interfaces, you first need to identify them using `ip addr`. This command lists all available network interfaces on your system.

:p How do we identify which network interface to control?
??x
We use the `ip addr` command to list all network interfaces and their details. This helps in identifying the specific interface that needs bandwidth limiting or other network controls.
```bash
root@host01:~# ip addr
```
x??

---


#### Applying Bandwidth Limits with Token Bucket Filter (TBF)
Token Bucket Filter (TBF) is used to limit bandwidth by controlling the token bucket refill rate and size. When a packet arrives, it consumes a token. If there are no tokens available, the packet is queued until tokens become available.

:p How do we apply bandwidth limits using TBF?
??x
To apply bandwidth limits using TBF, you would use the `tc` command with specific parameters to set up the token bucket filter. For example:
```bash
root@host01:~# tc qdisc add dev eth0 root tbf rate 100mbit burst 1540 latency 5ms
```
This command sets a maximum bandwidth limit of 100 Mbps for the `eth0` interface. The `burst` and `latency` parameters control how much data can be buffered before packets start being dropped or queued.

x??

---


#### Isolating Processes for Precise Control
While the TBF limits bandwidth for all processes on a system, to control bandwidth usage more precisely, we need to isolate specific processes from other processes.

:p Why is it important to isolate processes?
??x
Isolating processes helps in managing and limiting resources such as CPU, memory, and network bandwidth more effectively. This ensures that no single process impacts the performance of others on the system.
x??

---


#### Network Namespaces for Isolation
Network namespaces allow each container to have its own set of network interfaces, IP addresses, and ports.

:p What is the purpose of Linux network namespaces?
??x
The purpose of Linux network namespaces is to isolate processes so that they can operate as if they were on a separate network. This means each container has its own isolated view of the network stack, including separate IP addresses and ports.
```bash
root@host01:~# ip netns
```
x??

---

