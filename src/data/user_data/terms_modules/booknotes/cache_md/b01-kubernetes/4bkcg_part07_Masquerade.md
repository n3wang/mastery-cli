# High-Quality Flashcards: 4A001---The-Book-of-Kubernetes_-A-Complete-Guide-to-Container-Orchestration-No-Starch-Press-2022Alan-Hohn--_processed (Part 7)


**Starting Chapter:** Masquerade

---


#### Network Masquerade and Source NAT

Network masquerading, also known as source network address translation (SNAT), is a technique used to hide the IP addresses of hosts within a private network. It works by rewriting the source IP address of packets that are sent from internal devices to external networks. This mechanism allows multiple internal devices to share a single public IP address while still being able to communicate with external networks.

:p How does masquerade work in the context described?
??x
Masquerade works by translating the source IP address of outgoing traffic so that it appears as though all packets originated from the host's IP address. When a ping request is sent from within a container, its source IP (10.85.0.4) is rewritten to match the host's IP (192.168.61.11). The external host responds to 192.168.61.11 but then has its destination IP address rewritten back to the container's internal IP.

```shell
# Example trace of ping traffic
root@host01:/opt# crictl exec $B1C_ID ping 192.168.61.12 >/dev/null 2>&1 &
tcpdump -i any -n icmp
```
x??

---


#### CNI Chain for Containerized Networks

The CNI (Container Network Interface) provides a way to configure network connectivity for containers. In the context of this setup, the CNI chain is used to apply masquerading rules specifically for each container.

:p What role does the CNI chain play in setting up masquerading?
??x
The CNI chain plays a crucial role by applying specific rules tailored to each container's network configuration. It ensures that traffic originating from internal containers is correctly translated and can communicate with external networks without revealing their true IP addresses.

For example, consider the following CNI rule:
```shell
Chain CNI-48ad69d30fe932fda9ea71d2 (1 references)
target     prot opt source               destination          ACCEPT     all  --  anywhere             10.85.0.0/16 
MASQUERADE  all  --  anywhere             .224.0.0.0/4
```
This rule allows local traffic to be accepted and then masquerades the rest, except for multicast traffic (224.0.0.0/4).

```shell
# Example CNI chain rule
Chain CNI-48ad69d30fe932fda9ea71d2 (1 references)
target     prot opt source               destination          ACCEPT     all  --  anywhere             10.85.0.0/16 
MASQUERADE  all  --  anywhere             .224.0.0.0/4
```
x??

---


#### Complexity of Container Networking
Background context explaining the concept. The text highlights the complexity involved in container networking to achieve both isolation and connectivity among containers and between different networks.

:p What does the author say about the apparent simplicity of container networking?
??x
The author states that while container networking might appear simple—each container having its own set of network devices—it requires complex configuration to ensure not only isolation but also connectivity with other containers and external networks. This is further emphasized by the complexity introduced when connecting containers running on different hosts and load balancing traffic across multiple instances.

x??

---


#### Container Storage Concepts
Background context explaining the concept. The author introduces the next topic as understanding container storage mechanisms, including the base filesystem used for new containers and temporary storage during runtime.

:p What is the focus of the upcoming chapter?
??x
The focus of the upcoming chapter is on container storage concepts, which include how container images are used as the base filesystem when starting a new container and the temporary storage used by running containers. The text also mentions the importance of layered filesystems in saving storage and improving efficiency.

x??

---

---

