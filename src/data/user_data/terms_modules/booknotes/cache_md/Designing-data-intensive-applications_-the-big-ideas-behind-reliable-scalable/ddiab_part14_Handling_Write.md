# High-Quality Flashcards: Designing-data-intensive-applications_-the-big-ideas-behind-reliable-scalable_processed (Part 14)


**Starting Chapter:** Handling Write Conflicts

---


#### Collaborative Editing as a Database Replication Problem
Background context: Collaborative editing can be viewed through the lens of database replication. In this model, changes made by one user are applied to their local replica and then asynchronously replicated to the server and other users who might also be editing the same document.
:p How does collaborative editing relate to database replication?
??x
Collaborative editing involves multiple clients (users) working on a single document simultaneously. Each client has its own local copy of the document, which acts as a replica. Changes made by one user are propagated to their local replica and then asynchronously replicated to the server and other users who might also be editing the same document.
x??

---

#### Locking Mechanism for Conflict Prevention
Background context: To prevent conflicts in collaborative editing, an application can use a locking mechanism. This ensures that only one user at a time can edit the document by obtaining a lock on it before making any changes.
:p What is the role of a locking mechanism in collaborative editing?
??x
The locking mechanism prevents multiple users from simultaneously editing the same document, which could lead to conflicts. When a user wants to edit the document, they must first acquire a lock. If another user tries to edit the document while it's locked by someone else, they will have to wait until the current editor releases the lock.
x??

---

#### Single-Leader Replication for Conflict Prevention
Background context: In the context of collaborative editing, single-leader replication with transactions on the leader can ensure that there are no editing conflicts. The application must obtain a lock on the document before allowing a user to edit it. If another user wants to edit the same document, they have to wait until the first user commits their changes and releases the lock.
:p How does single-leader replication prevent conflicts in collaborative editing?
??x
Single-leader replication with transactions ensures that only one leader is responsible for accepting writes to the document. This means that when a user wants to edit, they must obtain a lock from the leader. If another user tries to edit while the first has not released the lock, their changes will be blocked or aborted until the first user commits and releases the lock.
x??

---

#### Multi-Leader Replication Challenges
Background context: In multi-leader replication for collaborative editing, conflicts can occur if two users try to make simultaneous edits. The application must handle these conflicts either by making conflict detection synchronous or by allowing concurrent writes and then resolving conflicts later.
:p What are the main challenges of multi-leader replication in collaborative editing?
??x
The main challenges of multi-leader replication include handling write conflicts, which can occur when two users try to edit the same document simultaneously. Conflicts must be resolved either synchronously (after all replicas have acknowledged the writes) or asynchronously (later when the conflict is detected). Synchronous conflict detection sacrifices the independent write capability of multi-leader replication.
x??

---

#### Conflict Resolution in Multi-Leader Replication
Background context: When using multi-leader replication, conflicts can arise if two users edit the same document simultaneously. To handle these conflicts, the application must use a strategy to resolve them, such as ensuring that all writes for a particular record go through the same leader.
:p How do you handle write conflicts in multi-leader replication?
??x
To handle write conflicts in multi-leader replication, the application can employ strategies like conflict avoidance. This involves ensuring that all writes for a specific record go through the same leader, thus preventing conflicts. Alternatively, you can use conflict detection mechanisms to resolve conflicts either synchronously or asynchronously.
x??

---

#### Conflict Avoidance Strategy
Background context: A simple strategy to avoid conflicts in multi-leader replication is to ensure that all writes for a particular record go through the same leader. This approach works well when an application can route requests from a user consistently to the same datacenter and use its leader for reading and writing.
:p How does conflict avoidance work in multi-leader replication?
??x
Conflict avoidance involves ensuring that all writes for a specific record are routed through the same leader, thus preventing conflicts. In practice, this means that requests from a particular user are always directed to the same datacenter, which uses its leader for both reading and writing operations. This approach mimics single-leader replication from the perspective of a single user.
x??

---


#### Conflict Resolution Mechanisms in Multi-Leader Replication
Background context: In a multi-leader replication setup, ensuring data consistency across different replicas becomes challenging due to concurrent writes. Each leader may apply updates independently without a defined order, leading to potential conflicts.

:p What are the challenges faced with multiple leaders in terms of conflict resolution?
??x
The challenge lies in maintaining a consistent state across all replicas since no predefined sequence exists for applying concurrent writes. This can result in divergent data states if not properly resolved.
x??

---
#### Last Write Wins (LWW)
Background context: One common approach to resolving conflicts is using the "last write wins" strategy, where the last received update for a given key is applied as the authoritative version.

:p What does the "Last Write Wins" (LWW) strategy entail?
??x
The LWW strategy involves assigning a unique identifier (like timestamps or UUIDs) to each write and applying the one with the highest ID. The latest write overwrites any previous writes, ensuring that only the last update is retained.
x??

---
#### Unique Replica ID Strategy
Background context: Another approach to conflict resolution involves giving each replica a unique ID and determining which write should be applied based on this ID.

:p How does the strategy of using unique replica IDs for conflict resolution work?
??x
This method assigns a unique identifier to each replica. Writes originating from a higher-numbered replica are given precedence over those from lower-numbered replicas, effectively ensuring that writes from more authoritative sources take effect.
x??

---
#### Value Merge Strategy
Background context: In some cases, merging the conflicting values can be an option. This might involve concatenating or combining different versions of data in a meaningful way.

:p How does value merging work as a conflict resolution strategy?
??x
Value merging involves combining conflicting writes by applying a specific algorithm (e.g., ordering strings alphabetically and concatenating them). For instance, if two leaders update the same field to "B" and "C," the merged output might be "B/C."
x??

---
#### Conflict Resolution Using Application Code
Background context: Custom conflict resolution can be implemented using application-specific logic. This allows for more tailored handling of conflicts based on specific business requirements.

:p How does custom conflict resolution through application code work?
??x
Custom conflict resolution involves writing application-specific code that is executed either at write time or read time to handle conflicts. For instance, a database system might call a user-defined function when it detects a conflict during writes.
Example: Bucardo allows users to implement conflict handlers using Perl scripts.

```perl
# Example of a simple Perl script for conflict resolution in Bucardo
sub custom_conflict_handler {
    my ($new_value, $old_value) = @_;
    if ($new_value > $old_value) {
        return $new_value;
    } else {
        return $old_value;
    }
}
```
x??

---


#### Conflict Resolution in Distributed Databases

CouchDB handles conflict resolution at the individual document level, not the entire transaction. This means that each write operation within a transaction is treated separately for resolving conflicts.

:p What does CouchDB consider when handling conflicts?
??x
In CouchDB, conflict resolution applies to each individual document or row written within a transaction, rather than considering the entire set of changes made in one go. If multiple writes modify the same document at once, the system will treat them as separate operations for resolving any potential conflicts.
x??

---

#### Multi-Leader Replication and Conflict Resolution

Amazon's shopping cart example illustrates how conflict resolution can introduce unexpected behaviors: for a period, adding items to the cart worked, but removing items did not. This led to items reappearing in carts that had been removed.

:p What was the issue with Amazon's shopping cart implementation?
??x
The issue was that the conflict resolution logic in the shopping cart was designed to preserve added items but not removed ones. As a result, when multiple updates were made concurrently, it could lead to unexpected behavior where previously removed items reappeared.
x??

---

#### Conflict-Free Replicated Data Types (CRDTs)

CRDTs are data structures that can be edited by multiple users simultaneously and resolve conflicts automatically in sensible ways.

:p What is the main characteristic of CRDTs?
??x
The main characteristic of CRDTs is their ability to handle concurrent edits from multiple users without needing explicit conflict resolution. They inherently manage conflicts, making them useful for distributed systems where data consistency needs to be maintained across nodes.
x??

---

#### Mergeable Persistent Data Structures

These data structures track history explicitly and use a three-way merge function to reconcile changes.

:p What distinguishes Mergeable Persistent Data Structures from CRDTs?
??x
Mergeable Persistent Data Structures distinguish themselves by tracking the history of changes. They use a three-way merge function, similar to how Git manages code versions, allowing for more complex conflict resolutions compared to two-way merges used in CRDTs.
x??

---

#### Operational Transformation

This is an algorithm designed for concurrent editing of ordered lists, such as text documents.

:p What does operational transformation do?
??x
Operational Transformation ensures that changes made concurrently by different users on the same document are properly integrated. It's particularly useful for collaborative applications like Google Docs or Etherpad, where multiple users can edit a document simultaneously.
x??

---

#### Example of Concurrent Modification Conflict

In CouchDB, if two writes modify the same field in the same record to different values, it creates an obvious conflict.

:p What defines an "obvious" conflict in CouchDB?
??x
An "obvious" conflict in CouchDB is when two write operations concurrently modify the same field in a document to different values. This clear contradiction requires explicit handling or automatic resolution based on predefined rules.
x??

---

#### Meeting Room Booking System Example

A booking system needs to ensure that each room can be booked by only one group at any time, preventing overlapping bookings.

:p What kind of conflict does this scenario illustrate?
??x
This scenario illustrates a subtle conflict: if two different bookings are created for the same room simultaneously, it violates the rule that no room should be booked by more than one group at once. This can lead to scheduling overlaps and require careful handling or automatic resolution.
x??

---


---
#### Multi-Leader Replication vs. Star Schema
Multi-leader replication and star schema are two different concepts within database design, with distinct purposes.

- **Star Schema**: Describes a data model structure where fact tables are connected to dimension tables through a single central table (star), enabling efficient querying.
- **Multi-leader Replication**: Refers to a communication topology in distributed databases where writes can be initiated from any leader node, and these changes need to propagate across multiple nodes.

:p What is the difference between multi-leader replication and star schema?
??x
Star schema is about modeling data for analysis purposes with a central fact table, whereas multi-leader replication concerns how writes are propagated in distributed databases among various leaders.
x??

---
#### Conflicts in Multi-Leader Replication
When using multi-leader replication, conflicts can arise if multiple leaders attempt to update the same record simultaneously. Without proper conflict resolution mechanisms, such as timestamp-based ordering or optimistic concurrency control, data integrity might be compromised.

:p How do conflicts occur in a multi-leader replication system?
??x
Conflicts occur when two or more leaders try to write to the same piece of data concurrently. Since updates are propagated through multiple nodes, there is no inherent order guaranteeing that all replicas receive changes in the same sequence.
x??

---
#### Replication Topologies for Multi-Leaders
Multi-leader replication can adopt various communication topologies, including circular and star topologies, which determine how writes propagate across leaders.

- **Circular Topology**: Each node forwards writes to a single other node.
- **Star Topology**: A designated root node forwards updates to all other nodes.

:p What are the two common topologies for multi-leader replication?
??x
The circular topology involves each node forwarding its writes to one specific other node, while in the star topology, a central node (root) handles all write propagation.
x??

---
#### Fault Tolerance in Multi-Leader Replication Topologies
Fault tolerance is enhanced by using more densely connected topologies like "all-to-all," as they allow data to travel through multiple paths. However, such dense networks can also introduce issues like replication message order and network congestion.

:p How does fault tolerance differ between circular/topology and all-to-all topology in multi-leader systems?
??x
In a circular or star topology, if one node fails, it can disrupt the flow of messages leading to communication breakdown. Conversely, an all-to-all topology allows data to travel through multiple paths, reducing single points of failure but potentially causing issues with message order due to network congestion.
x??

---
#### Handling Conflicts and Replication Loops
To handle conflicts in multi-leader replication, nodes are given unique identifiers, and changes are tagged during propagation. This tagging helps avoid infinite loops by ignoring messages that include the node’s own identifier.

:p How do nodes prevent infinite replication loops?
??x
Nodes use unique identifiers for each write operation and tag them accordingly. When a node receives a change log with its own identifier, it ignores the message since it already processed this change.
x??

---
#### Example of Write Order in Multi-Leader Replication
Consider a scenario where leader 1 receives an insert from client A and leader 3 receives an update from client B. In some cases, leader 2 might receive these changes out of order, leading to causality issues.

:p What problem can arise due to write ordering in multi-leader replication?
??x
Causality issues may occur when the correct temporal sequence is not maintained during propagation. For example, an update might be applied before its corresponding insert, violating the expected order of operations.
x??

---
#### Causal Ordering and Timestamps
To resolve causality issues, timestamps can be attached to write operations to ensure they are processed in the correct order at each node.

:p How do timestamps help in resolving causality issues?
??x
Timestamps help by providing a mechanism for ordering writes. Each operation is tagged with a timestamp indicating when it occurred. Nodes then process updates based on their timestamps, ensuring that operations are applied in the expected sequence.
x??

---
#### Pseudocode for Handling Timestamps
Here's an example of how timestamps could be used to handle write propagation and causality:

```java
class WriteOperation {
    long timestamp;
    Object data;

    public void applyTo(Node node) {
        if (node.getLastProcessedTimestamp() < this.timestamp) {
            // Apply the operation
            node.setData(this.data);
        }
    }

    private long getLastProcessedTimestamp() { /* logic to retrieve last processed timestamp */ }
}

// In a node handling writes:
for (WriteOperation op : incomingWrites) {
    op.applyTo(this);
}
```

:p How does this pseudocode ensure causal ordering in multi-leader replication?
??x
The pseudocode ensures causal ordering by checking the timestamp of each write operation against the last processed timestamp at the receiving node. If a new operation has a higher timestamp, it is applied, ensuring that operations are processed in the correct sequence.
x??

---


#### Leaderless Replication Overview
Background context: In leaderless replication, there is no single node (leader) that handles all write requests. Instead, any replica can accept writes directly from clients. This contrasts with traditional leader-based replication where one node enforces the order of writes.

:p What does a leaderless replication system do differently compared to a leader-based system?
??x
In a leaderless replication system, there is no central coordinator enforcing the write order; instead, multiple replicas can accept writes independently. This approach allows for higher availability but introduces challenges in maintaining data consistency across all replicas.
x??

---
#### Handling Node Outages in Leaderless Replication
Background context: When using leaderless replication, nodes may come online or offline unpredictably. If a node is down and later comes back, it needs to catch up on the writes that were missed during its downtime.

:p What happens when a node is down and then comes back online in a leaderless system?
??x
When a node comes back online after being down, it may miss some of the writes that occurred while it was offline. To handle this, clients send read requests to multiple nodes in parallel, allowing them to detect stale values. If a client reads from an out-of-date replica, they can perform a read-repair by writing the newer value back to that replica.
x??

---
#### Read Repair Mechanism
Background context: In leaderless replication, read repair is a mechanism used to ensure that nodes come up-to-date after missing writes during downtime. It involves clients reading from multiple replicas and detecting stale values.

:p How does read-repair work in leaderless systems?
??x
Read-repair works by having clients perform parallel reads on multiple replicas. If a client detects that some of the replicas have outdated or stale data, it can write the correct (newer) value back to those replicas. This ensures that eventually all nodes have the latest data.
x??

---
#### Anti-Entropy Process
Background context: An anti-entropy process is another mechanism used in leaderless replication to ensure data consistency across all replicas. Unlike read-repair, which happens during reads, the anti-entropy process runs as a background task to continuously check for differences between replicas and copy missing data.

:p What is the purpose of an anti-entropy process?
??x
The purpose of an anti-entropy process is to periodically synchronize different replicas by copying any missing data from one replica to another. This helps maintain consistent data across all nodes without relying on client-initiated read-repairs.
x??

---
#### Quorum for Writing and Reading in Leaderless Replication
Background context: To ensure consistency, leaderless systems use quorums for both writing and reading. A quorum is a minimum number of replicas that must confirm a write or be queried during reads.

:p What are the parameters n, w, and r used for in leaderless replication?
??x
In leaderless replication, `n` represents the total number of replicas, `w` is the number of nodes required to acknowledge a successful write, and `r` is the number of nodes from which we read. These quorum values ensure that at least one replica has seen the most recent write, allowing for continued operations even if some nodes are unavailable.
x??

---
#### Configuring Quorums in Dynamo-Style Databases
Background context: The parameters n, w, and r can be configured to optimize performance and reliability based on the workload. In many systems, these values are set such that `w = r = (n + 1) / 2` rounded up.

:p How do you configure quorum values in Dynamo-style databases?
??x
In Dynamo-style databases, n, w, and r are typically configurable. A common choice is to set n as an odd number (usually 3 or 5) and `w = r = (n + 1) / 2` rounded up. This ensures balanced performance for both reads and writes while tolerating some node failures.
x??

---
#### Tolerating Unavailable Nodes
Background context: The quorum condition, `w + r > n`, allows the system to continue operating even if nodes are unavailable.

:p How does the quorum condition help in leaderless replication?
??x
The quorum condition helps by ensuring that the number of successful writes and readable replicas can tolerate some node failures. For example, with `n = 3`, `w = 2`, and `r = 2`, you can handle one unavailable node without affecting reads or writes.
x??

---
#### Example of Quorum in Action
Background context: An example scenario shows how the quorum condition is applied to ensure data consistency.

:p How does a system with `n = 5`, `w = 3`, and `r = 3` handle node outages?
??x
In this setup, the system can tolerate up to two unavailable nodes. If one or more nodes are down, reads and writes will still succeed as long as at least three nodes remain operational. This ensures that the majority of nodes can continue processing requests.
x??

---

