# High-Quality Flashcards: Designing-data-intensive-applications_-the-big-ideas-behind-reliable-scalable_processed (Part 25)


**Starting Chapter:** Byzantine Faults

---


#### Byzantine Faults
Background context explaining the concept. In distributed systems, nodes may be unreliable and sometimes malicious. A Byzantine fault is a situation where a node might send arbitrary faulty or corrupted responses. This can happen due to various reasons including network delays, outdated state, etc.

If a node wants to subvert the system's guarantees, it could send messages with a fake fencing token. However, in this book, we assume nodes are unreliable but honest: they may be slow or never respond (due to faults), and their state might be outdated due to GC pauses or network delays. But if a node does respond, it is telling the truth according to its current knowledge.

:p What are Byzantine faults?
??x
Byzantine faults refer to situations in distributed systems where nodes may send arbitrary faulty or corrupted responses. These can occur due to unreliability (like network delays) or malicious intent.
x??

---


#### Byzantine Generals Problem
Background context explaining the concept. The Byzantine Generals Problem is a generalization of the Two Generals Problem, where generals need to agree on a battle plan despite unreliable communication. In the Byzantine version, some traitors might send false messages to confuse others.

:p What is the Byzantine Generals Problem?
??x
The Byzantine Generals Problem is about reaching consensus among nodes in a distributed system where some nodes may be malicious and send fake or untrue messages.
x??

---


#### Byzantine Fault-Tolerant Systems
Background context explaining the concept. A system is Byzantine fault-tolerant if it can operate correctly even when some nodes are malfunctioning or being attacked by malicious entities.

:p What makes a system Byzantine fault-tolerant?
??x
A system is considered Byzantine fault-tolerant if it continues to function correctly despite some nodes malfunctioning or being compromised. This concern is relevant in specific scenarios like aerospace environments where failures can be catastrophic.
x??

---


#### Practical Considerations in Distributed Systems
Background context explaining the concept. In many server-side data systems, assuming Byzantine faults is impractical due to low memory corruption rates and controlled hardware.

:p Why are Byzantine fault-tolerant solutions often impractical for most server-side data systems?
??x
Byzantine fault-tolerant solutions are impractical in most server-side data systems because of the practical costs involved. Memory corruption rates are low, and nodes are usually controlled by a single organization, making them more reliable.
x??

---


#### Peer-to-Peer Networks and Byzantine Fault Tolerance
Background context explaining the concept. In peer-to-peer networks, there is no central authority to rely on, making Byzantine fault tolerance more relevant.

:p Why are Byzantine fault-tolerant protocols important in peer-to-peer networks?
??x
Byzantine fault-tolerant protocols are crucial in peer-to-peer networks because these systems lack a central authority. This means nodes must be able to agree on data without trusting each other completely.
x??

---


#### Supermajority Requirement for Byzantine Fault Tolerance
Background context explaining the concept. Most Byzantine fault-tolerant algorithms require more than two-thirds of nodes to function correctly.

:p What is the supermajority requirement in Byzantine fault tolerance?
??x
Byzantine fault-tolerant protocols generally require a supermajority (more than two-thirds) of nodes to be functioning correctly. This means that even if some nodes are faulty, the majority can still reach agreement.
x??

---

---


#### System Model: Synchronous Model
Background context explaining the concept. The synchronous model in distributed systems assumes bounded network delay, process pauses, and clock errors, meaning you know these values will never exceed some fixed upper bound.

:p What is the synchronous system model used for?
??x
The synchronous system model is used to design algorithms that can tolerate various faults by assuming certain constraints on timing. It helps in writing robust algorithms that do not depend heavily on unpredictable hardware and software configurations.
??x

---


#### System Model: Partially Synchronous Model
Background context explaining the concept. The partially synchronous model acknowledges that systems behave like synchronous ones most of the time, but occasionally exceed the bounds for network delay, process pauses, and clock drift.

:p How does the partially synchronous system model differ from the synchronous one?
??x
The partially synchronous system model differs because it allows for occasional breaches in timing assumptions. While the system behaves well most of the time, network delays, process pauses, and clock errors can become arbitrarily large when these rare events occur.
??x

---


---
#### Asynchronous Model
The asynchronous model is a very restrictive approach where an algorithm cannot make any timing assumptions and does not have access to a clock. This means it must handle situations without knowing when operations will complete or what the current state of other nodes might be.

In this model, besides timing issues, node failures are also a concern. The three most common system models for nodes include:
- **Crash-stop faults**: Nodes can fail by crashing and do not come back.
- **Crash-recovery faults**: Nodes can crash at any moment but have stable storage that is preserved across crashes.
- **Byzantine (arbitrary) faults**: Nodes can behave in arbitrary ways, potentially deceiving other nodes.

:p What are the three common node failure models in distributed systems?
??x
The three common node failure models include:
1. Crash-stop faults: Nodes stop responding and do not come back.
2. Crash-recovery faults: Nodes may crash but eventually recover with preserved stable storage.
3. Byzantine (arbitrary) faults: Nodes can behave arbitrarily, including lying or trying to deceive other nodes.

x??

---


#### Correctness of Distributed Algorithms
To define the correctness of a distributed algorithm, one must specify its properties. For example:
- **Uniqueness**: Ensure no two requests for a fencing token return the same value.
- **Monotonic sequence**: Tokens should be returned in a strictly increasing order based on request completion times.
- **Availability**: Requests should eventually receive a response if they do not crash.

:p How does an algorithm's correctness relate to its properties in distributed systems?
??x
An algorithm is considered correct if it satisfies its defined properties under all possible scenarios specified by the system model. For instance, in generating fencing tokens for locks:
- Uniqueness ensures that no two requests return the same token.
- Monotonic sequence ensures tokens are returned in a strictly increasing order based on request completion times.
- Availability ensures that non-crashing nodes receive responses eventually.

x??

---


#### Safety vs. Liveness Properties
Safety properties ensure "nothing bad happens," while liveness properties guarantee "something good eventually happens." Key safety and liveness examples include:
- **Uniqueness** and **monotonic sequence**: These are safety properties because they ensure specific behaviors do not lead to harmful outcomes.
- **Availability**: This is a liveness property since it ensures some positive outcome (response) will eventually occur.

:p What distinguishes safety from liveness properties in distributed systems?
??x
Safety properties guarantee that "nothing bad happens," meaning the algorithm does not produce incorrect or harmful outputs. Liveness properties ensure that "something good eventually happens," such as a node receiving a response. For example:
- Uniqueness and monotonic sequence are safety properties because they prevent collisions or ordering issues.
- Availability is a liveness property, ensuring nodes get responses over time.

x??

---

---


#### Safety Properties Violation
Background context: In distributed systems, safety properties define behaviors that should never occur. If a safety property is violated, we can pinpoint exactly when and where it happened. The violation cannot be undone; once it occurs, the damage is done.

:p What happens if a safety property is violated in a distributed system?
??x
If a safety property is violated, we can identify a specific point in time when it was broken. For example, if the uniqueness property was violated, we can determine which operation resulted in duplicate fencing tokens being returned. Once this violation occurs, it cannot be undone; the damage is permanent.

This means that even after fixing the system, any subsequent state might reflect the incorrect outcome caused by the safety violation.
x??

---


#### Liveness Properties
Background context: Liveness properties ensure that the system eventually reaches a desired state or behavior. Unlike safety properties, liveness violations can be resolved over time if certain conditions are met. For example, a request may not receive a response immediately, but it might in the future.

:p What distinguishes liveness from safety properties?
??x
Liveness properties allow for situations where the property might temporarily fail to hold, but there is always hope that it can be satisfied eventually. In contrast, safety properties must never be violated under any circumstances.

For example:
- Safety: A distributed algorithm must ensure no duplicate transactions occur.
- Liveness: A request should receive a response from a majority of nodes if the network recovers and most nodes are still operational.

Code Example (Pseudocode):
```pseudocode
if(network_recovered() && majority_nodes_operational()) {
    send_response()
}
```
x??

---


#### System Models and Reality Mismatch
Background context: While system models help in reasoning about the correctness of distributed algorithms, they often simplify real-world complexities. Assumptions such as data surviving crashes or nodes remembering stored data can break down in practice.

:p What are some common issues with system model assumptions?
??x
Common issues with system model assumptions include:

- Data Corruption: Data on disk might get corrupted due to hardware errors, firmware bugs, or misconfigurations.
- Hardware Failures: A server might fail to recognize its hard drives upon reboot, even if the drives are correctly attached.
- Node Amnesia: Nodes may forget data they previously stored, breaking quorum conditions.

These issues highlight the need for more realistic system models but also make reasoning about distributed algorithms harder because assumptions that simplify analysis can no longer be relied upon.

Code Example (Pseudocode):
```pseudocode
if(is_disk_corrupted() || is_firmware_bug()) {
    handle_data_recovery()
}
```
x??

---


#### Quorum Algorithms and Node Amnesia
Background context: Quorum algorithms rely on nodes remembering the data they store. If a node suffers from amnesia, it can break the quorum condition, leading to incorrect algorithm behavior.

:p How does node amnesia affect the correctness of quorum algorithms?
??x
Node amnesia affects the correctness of quorum algorithms because these algorithms depend on nodes accurately recalling and verifying the stored data. If a node forgets previously stored data, this breaks the quorum conditions, thus breaking the algorithm's correctness.

For example:
- A node claiming to have stored data might actually not have it anymore.
- This can lead to incorrect read or write operations violating the algorithm’s intended behavior.

Code Example (Pseudocode):
```pseudocode
if(node_forgets_data()) {
    invalidate_quorum_conditions()
}
```
x??

---


#### Network Packet Loss and Delay
In distributed systems, network packet loss and arbitrary delays are common issues. These problems can occur during message transmission over a network. The reliability of communication between nodes cannot be guaranteed due to these uncertainties.

:p What is an example of a problem that can arise from network packet loss and delay in a distributed system?
??x
An example of a problem that can arise is when a node sends a message but does not receive the reply, making it uncertain whether the message was successfully delivered. This ambiguity can lead to incorrect assumptions about the state or behavior of other nodes.
x??

---


#### Clock Synchronization Issues
Even with Network Time Protocol (NTP) setup, clock synchronization between nodes in a distributed system can be problematic. Nodes may experience significant time discrepancies, unexpected jumps, or have unreliable measures of their own clock errors.

:p How does NTP help in maintaining clock synchronization among nodes?
??x
NTP helps to synchronize the clocks across different nodes by periodically adjusting them to match an accurate external reference time source. However, despite its efforts, issues such as significant time discrepancies, sudden jumps, and inaccurate error intervals can still occur.
x??

---


#### Partial Failures in Distributed Systems
Partial failures, where a process may pause for a substantial amount of time or be declared dead by other nodes before coming back to life, are critical challenges in distributed systems. These partial failures can manifest due to various reasons such as garbage collection pauses.

:p What is the impact of partial failures on processes in a distributed system?
??x
Partial failures can lead to unpredictable behavior where a process might pause unexpectedly, be incorrectly flagged as dead by other nodes, and then resume execution without realizing it was paused. This unpredictability complicates fault tolerance and reliable operation within the system.
x??

---


#### Detecting Node Failures Using Timeouts
To handle partial failures, distributed systems often rely on timeouts to determine if a remote node is still available. However, this approach can lead to false positives or negatives due to network variability.

:p How does timeout-based failure detection work in distributed systems?
??x
Timeout-based failure detection works by setting a time limit for receiving a reply from another node. If the reply is not received within the timeout period, it's assumed that the node has failed. However, this method can incorrectly suspect nodes of crashing due to network delays or degraded states.
x??

---


#### Handling Degraded Node States
Degraded states, where a node functions at reduced capacity but continues to operate, pose additional challenges in distributed systems. Examples include network interfaces dropping to lower throughput rates unexpectedly.

:p What is an example of a scenario where a node might be considered "limping"?
??x
An example of a scenario is when a Gigabit network interface card suddenly drops its throughput to 1 Kb/s due to a driver bug, allowing the node to continue functioning but at a much reduced capacity.
x??

---

---

