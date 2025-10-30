# High-Quality Flashcards: 2B002---Fundamentals-of-Data-Engineering_processed (Part 16)

**Rating threshold:** >= 8/10

**Starting Chapter:** Single Machine Versus Distributed Storage

---

**Rating: 8/10**

#### Compression Disadvantages
Background context explaining that while compression saves space, it incurs extra time and resource consumption for reading or writing data. The trade-offs of different compression algorithms are discussed further in Appendix A.

:p What are the disadvantages of using compression?
??x
The main disadvantage is that compressing and decompressing data can consume additional time and resources. This overhead needs to be considered when deciding whether to use compression, especially for applications where performance is critical.
x??

---

#### Caching Overview
Background context explaining that caching stores frequently accessed or recently accessed data in a fast access layer while less frequently accessed data is stored in cheaper, slower storage. Caches are crucial for data serving, processing, and transformation.

:p What is the core idea behind caching?
??x
The core idea of caching is to store frequently or recently accessed data in a fast-access layer (e.g., RAM) to improve performance. Less frequently accessed data is stored in cheaper, slower storage solutions.
x??

---

#### Cache Hierarchy Example
Background context explaining that cache hierarchies are crucial for organizing different types of storage based on their performance and cost characteristics.

:p What does Table 6-1 show?
??x
Table 6-1 shows a heuristic cache hierarchy displaying various storage types with approximate pricing and performance characteristics. This helps in understanding the trade-offs between different levels of caching.
x??

---

#### CPU Cache
Background context explaining that CPUs may have up to four cache tiers, each with its own latency and bandwidth characteristics.

:p What are the characteristics of CPU caches?
??x
CPU caches typically include several tiers:
- **Cache 1 (L1)**: Fastest, smallest capacity, lowest latency (around 1 nanosecond).
- **Cache 2 (L2)**: Larger capacity, higher latency than L1 but lower than main memory.
- **Cache 3 (L3)**: Even larger capacity, slightly higher latency than L2.
- **Cache 4 (L4)**: Large-capacity cache used in some architectures.

Example:
```java
public class CPU {
    private int l1CacheSize;
    private int l2CacheSize;
    private int l3CacheSize;
    private int l4CacheSize;

    public void accessMemory(int size) {
        if (size < 64KB) { // Access L1 cache
            System.out.println("Accessing L1 Cache");
        } else if (size >= 64KB && size < 2MB) { // Access L2 cache
            System.out.println("Accessing L2 Cache");
        } else if (size >= 2MB && size < 8MB) { // Access L3 cache
            System.out.println("Accessing L3 Cache");
        } else { // Access L4 cache
            System.out.println("Accessing L4 Cache");
        }
    }
}
```
x??

---

#### RAM and SSD Characteristics
Background context explaining the performance characteristics of RAM and SSDs.

:p What are the latency and bandwidth for RAM and SSD?
??x
- **RAM**: 0.1 microseconds, 100 GB/s.
- **SSD**: 0.1 milliseconds, 4 GB/s.

Example:
```java
public class StorageAccess {
    public void accessStorage(int size) {
        if (size < 1MB) { // Access RAM
            System.out.println("Accessing RAM");
        } else { // Access SSD
            System.out.println("Accessing SSD");
        }
    }
}
```
x??

---

#### HDD Characteristics
Background context explaining the performance characteristics of HDDs.

:p What are the latency and bandwidth for HDD?
??x
- **HDD**: 4 milliseconds, 300 MB/s.
x??

---

#### Object Storage Characteristics
Background context explaining the access and cost characteristics of cloud object storage.

:p What are the latency and bandwidth for object storage?
??x
- **Object Storage**: 100 milliseconds, 10 GB/s.
x??

---

#### Archival Storage Characteristics
Background context explaining that archival storage is used for low-cost long-term data retention but has inferior access characteristics.

:p What are the latency and cost for archival storage?
??x
- **Archival Storage**: 12 hours (once data is available), $0.004/GB per month.
x??

---

#### Data Storage Systems Overview
Background context explaining that data storage systems exist at a higher level of abstraction than raw ingredients like magnetic disks.

:p What are the major data storage systems discussed in this section?
??x
The major data storage systems discussed include cloud object storage, which operates at a higher level of abstraction and provides features such as long-term data retention, durability, and support for dynamic data movement.
x??

---

**Rating: 8/10**

#### Single Machine Versus Distributed Storage
Background context: As data storage and access patterns become more complex, a single machine may not suffice to manage large volumes of data. This leads to the need for distributed storage, where data is spread across multiple servers for faster retrieval, scalability, and redundancy.

:p What are the key differences between storing data on a single machine versus using distributed storage?
??x
Distributed storage involves spreading data across multiple servers to enhance performance, scalability, and reliability. On the other hand, single-machine storage has limited capacity and is prone to failures without additional mechanisms like backups or replication.
??x

---

#### Distributed Storage
Background context: In distributed storage systems, multiple servers work together to store, retrieve, and process data. This approach provides redundancy and better performance for large datasets.

:p What benefits does a distributed storage system offer compared to single-machine storage?
??x
A distributed storage system offers several key benefits:
- **Scalability**: Data can be easily scaled by adding more nodes.
- **Redundancy**: Data is replicated across multiple servers, reducing the risk of data loss due to server failures.
- **Performance**: Multiple nodes can handle read and write operations concurrently, improving overall performance.

??x

---

#### Eventual Versus Strong Consistency
Background context: In distributed systems, achieving strong consistency (where all nodes have the same up-to-date state) is challenging. This leads to a trade-off between eventual consistency and strong consistency, where strong consistency ensures data integrity but can introduce latency, while eventual consistency trades off some accuracy for better performance.

:p What are the key differences between eventual and strong consistency?
??x
Eventual consistency means that eventually, all nodes will have the same state. However, during this process, reads may return inconsistent data. Strong consistency ensures that any read operation returns the most recent written value, but it can lead to higher latency due to the need for consensus across nodes.

??x

---

#### Acidity and BASE
Background context: ACID (Atomicity, Consistency, Isolation, Durability) compliance is a set of properties for transaction processing. BASE stands as an alternative approach that focuses on providing eventual consistency instead of strong consistency.

:p What does the acronym BASE stand for?
??x
BASE stands for:
- Basically available: Consistency is not guaranteed.
- Soft-state: The state of transactions may change over time, and it's uncertain whether a transaction is committed or uncommitted.
- Eventual consistency: Reading data will eventually return consistent values.

??x

---

#### Data Engineering Decisions on Consistency
Background context: Data engineers must decide between strong and eventual consistency based on the requirements of their application. Database technology, configuration parameters, and query-level settings can influence these decisions.

:p What factors do data engineers consider when deciding on a consistency model?
??x
Data engineers consider:
- **Database Technology**: Different databases default to different consistency models.
- **Configuration Parameters**: These can be adjusted to balance between performance and consistency.
- **Query-Level Consistency**: Some databases support varying levels of consistency at the query level.

??x

---

#### DynamoDB Consistency Models
Background context: DynamoDB supports both eventual consistent reads and strongly consistent reads. Strongly consistent reads are slower but ensure the latest data, while eventually consistent reads are faster but may return stale data.

:p What consistency models does DynamoDB support?
??x
DynamoDB supports:
- **Eventual Consistent Reads**: These are faster but may not always return the most recent updates.
- **Strongly Consistent Reads**: These are slower and more resource-intensive, ensuring that you read the latest data written to a table.

??x

---
These flashcards cover various aspects of distributed storage and consistency in databases, providing context and explanations for each key concept.

**Rating: 8/10**

#### File Storage Overview
File storage involves organizing data into files and directories. A file has characteristics such as being finite, allowing append operations, and supporting random access.

:p What are the defining characteristics of a file in file storage systems?
??x
A file is a data entity with specific read, write, and reference characteristics used by software and operating systems. It has the following properties:
- Finite length: A file consists of a finite-length stream of bytes.
- Append operations: We can append bytes to the file up to the limits of the host storage system.
- Random access: We can read from any location in the file or write updates to any location.

For example, consider the directory reference `/Users/matthewhousley/output.txt`. This structure starts at the root directory and navigates through subdirectories until reaching `output.txt`.
??x
---
#### File Storage Directory Structure
The filesystem organizes files into a directory tree. Each file's path contains directories that are contained inside parent directories, starting from the root.

:p How does a file reference navigate through directories to find a specific file?
??x
A file reference such as `/Users/matthewhousley/output.txt` is broken down and traversed by the operating system:
1. Start at the root directory `/`.
2. Follow `Users`, which points to a subdirectory.
3. Follow `matthewhousley`, another subdirectory inside Users.
4. Finally, follow `output.txt`, which leads directly to the file.

This process is similar in both Unix and Windows systems but uses different semantical details for directory structure. For example, in a Unix system, each directory contains metadata about its files and directories, including their names, permissions, and pointers to actual entities.
??x
---
#### Object Storage Introduction
Object storage behaves much like file storage with key differences, particularly more relevant today due to the nature of data engineering tasks.

:p How does object storage differ from traditional file storage?
??x
While both support finite length, object storage differs in its handling and use cases:
- Only supports append operations (not random access).
- Useful for storing large unstructured data sets such as logs, images, and videos.
- Typically used in cloud storage services like AWS S3, Google Cloud Storage.

For example, objects in object storage can be accessed via unique identifiers but do not support direct file-like manipulation or random access.
??x
---
#### Ephemeral Environments for Processing Files
When processing files on a server with an attached disk, it's important to use ephemeral environments to avoid state issues. Intermediate steps should leverage object storage.

:p When and why should we prefer using object storage over local disk storage during file processing?
??x
Ephemeral environments should be used whenever possible for file processing because:
- They minimize the risk of state corruption.
- Intermediate results can be stored in object storage, avoiding potential loss or corruption on the server's local disk.

For example, consider a pipeline that processes large datasets. Instead of writing intermediate files to the local disk, store them in object storage like S3 for safety and reliability.
??x
---
#### Local Disk Filesystem Consistency
Local disk filesystems typically support full read-after-write consistency, meaning immediate reads after writes will return the written data. Locking strategies are used to manage concurrent write access.

:p What is the consistency behavior of local disk filesystems?
??x
Local disk filesystems generally ensure that:
- Reading immediately after a write returns the newly written data.
- Concurrent writing attempts are managed through locking mechanisms by the operating system (e.g., NTFS, ext4).

For example, in a Linux environment using ext4, you might see this behavior when writing to a file and reading it back:
```java
// Pseudocode example
public void writeToFile(String filename, String content) {
    try (FileWriter writer = new FileWriter(filename)) {
        writer.write(content);
    } catch (IOException e) {
        System.err.println("Error writing to file");
    }
}

public String readFromFile(String filename) {
    StringBuilder content = new StringBuilder();
    try (BufferedReader reader = new BufferedReader(new FileReader(filename))) {
        String line;
        while ((line = reader.readLine()) != null) {
            content.append(line);
        }
    } catch (IOException e) {
        System.err.println("Error reading from file");
    }
    return content.toString();
}
```
??x
---

**Rating: 8/10**

---
#### Network-attached Storage (NAS)
Network-attached storage provides a file storage system to clients over a network. While there are performance penalties when accessing the filesystem over a network, significant advantages like redundancy and reliability exist. NAS systems support fine-grained control of resources, storage pooling across multiple disks for large virtual volumes, and file sharing across multiple machines.
:p What is Network-attached Storage (NAS)?
??x
Network-attached storage provides a file storage system to clients over a network. It supports redundancy, reliability, and fine-grained control of resources by allowing storage pooling across multiple disks and facilitating file sharing among various machines.
x??

---
#### Performance Penalties in NAS
While NAS systems offer advantages like redundancy and file sharing, accessing the filesystem over a network introduces performance penalties compared to local storage solutions.
:p What are the performance penalties associated with Network-attached Storage (NAS)?
??x
Performance penalties arise due to the network overhead involved in accessing the filesystem stored remotely. This can lead to slower read and write operations when compared to accessing data locally on a machine.
x??

---
#### Redundancy and Reliability in NAS
Redundancy and reliability are significant advantages of Network-attached Storage (NAS) systems, ensuring that even if one disk fails, others continue to provide uninterrupted service.
:p What benefits does Network-attached Storage (NAS) offer in terms of redundancy and reliability?
??x
Network-attached storage enhances redundancy by allowing multiple disks to be used together. In the event of a disk failure, other disks can still serve data, ensuring that the system remains functional without interruption.
x??

---
#### File Sharing with NAS
File sharing across multiple machines is one of the key benefits of Network-attached Storage (NAS), enabling seamless access and collaboration among different users or applications on the network.
:p How does Network-attached Storage (NAS) facilitate file sharing?
??x
Network-attached storage allows multiple clients to share files stored on the NAS device. This means that any authorized user can access, read, write, or modify these files from their respective client machines over the network, promoting collaboration and easy data exchange.
x??

---
#### Consistency Model in Cloud Filesystems
When using cloud filesystem services like Amazon EFS, engineers should be aware of the consistency model provided. For example, local read-after-write consistency ensures that changes made on a specific machine are visible immediately when accessed from that same machine.
:p What is an important aspect to consider regarding the consistency model for cloud file systems?
??x
When using cloud filesystem services like Amazon EFS, it's crucial to understand the consistency models provided. For instance, local read-after-write consistency means that any write operation performed on a specific machine will be visible immediately when accessed from that same machine.
x??

---
#### Block-Level Access in SAN Systems
In contrast to Network-attached Storage (NAS), storage area networks (SAN) provide block-level access without the filesystem abstraction. This is useful for applications requiring direct read/write operations at the block level rather than through a file system interface.
:p What does a Storage Area Network (SAN) offer compared to NAS?
??x
A Storage Area Network (SAN) offers block-level access, bypassing the filesystem layer typically found in NAS systems. Applications using SAN can perform direct read/write operations on blocks of data, which is suitable for scenarios requiring low-level disk management or high-performance I/O operations.
x??

---
#### Cloud Filesystem Services
Cloud filesystem services provide a fully managed storage solution that behaves like a Network-attached Storage (NAS) system but with additional benefits such as automatic scaling and pay-per-storage pricing. These services are designed to simplify storage management for cloud-based applications.
:p What is a key feature of cloud filesystem services?
??x
A key feature of cloud filesystem services, such as Amazon EFS, is their fully managed nature, providing automatic scaling, pay-per-storage pricing, and ease of use for managing storage in cloud environments. These services abstract away the complexities of disk management, allowing developers to focus on application development.
x??

---
#### NFS 4 Protocol
Cloud filesystems like Amazon EFS expose storage through the NFS 4 protocol, which is also used by NAS systems. This protocol allows seamless integration with existing file-based applications and provides features such as local read-after-write consistency and open-after-close consistency across the full filesystem.
:p What protocol does Amazon Elastic File System (EFS) use?
??x
Amazon EFS uses the NFS 4 protocol to expose storage, allowing seamless integration with existing file-based applications. This protocol supports features like local read-after-write consistency, ensuring that changes made on a specific machine are visible immediately when accessed from that same machine.
x??

---

**Rating: 8/10**

#### Block Storage Overview
Block storage provides fine control over storage size, scalability, and data durability beyond raw disks. Blocks are the smallest addressable units of data on a disk, often 4,096 bytes for current disks. Each block can contain metadata for error detection/correction.
:p What is block storage?
??x
Block storage refers to the type of raw storage provided by SSDs and magnetic disks in the cloud. It allows fine control over storage size, scalability, and data durability beyond what is offered by raw disks. The smallest addressable unit on a disk is called a block, typically 4,096 bytes.
x??

---

#### Transactional Database Systems
Transactional database systems access disks at a block level to optimize performance. For row-oriented databases, rows of data are written as continuous streams. SSDs have improved seek-time performance but still rely heavily on high random access performance provided by direct block storage devices.
:p How do transactional database systems typically handle disk access?
??x
Transactional database systems use block-level access for optimal performance. They write rows of data as continuous streams, which was originally the case. With SSDs, although seek time has improved, they still rely on high random access performance to ensure efficient operations when accessing individual blocks.
x??

---

#### RAID Overview
RAID stands for Redundant Array of Independent Disks and is used to improve data durability, enhance performance, and combine capacity from multiple drives. An array can be presented as a single block device with various encoding and parity schemes depending on the desired balance between performance and fault tolerance.
:p What does RAID stand for?
??x
RAID stands for Redundant Array of Independent Disks. It is used to improve data durability, enhance performance, and combine capacity from multiple drives by controlling these disks together.
x??

---

#### Storage Area Network (SAN)
Storage area networks provide virtualized block storage devices over a network, typically from a centralized storage pool. This allows fine-grained storage scaling and enhances performance, availability, and durability. SAN can be on-premises or cloud-based.
:p What is a Storage Area Network (SAN)?
??x
A Storage Area Network (SAN) provides virtualized block storage devices over a network, usually from a centralized storage pool. It enables fine-grained storage scaling, improved performance, enhanced availability, and durability compared to traditional storage solutions.
x??

---

#### Cloud Virtualized Block Storage - Amazon EBS Example
Amazon Elastic Block Store (EBS) is an example of cloud virtualized block storage that abstracts physical disks behind a virtual layer, allowing for finer control over storage. It offers different performance tiers with IOPS and throughput metrics. SSD-backed storage provides higher performance but costs more per gigabyte than magnetic disk-backed storage.
:p What is Amazon Elastic Block Store (EBS)?
??x
Amazon Elastic Block Store (EBS) is cloud virtualized block storage that abstracts physical disks behind a virtual layer, providing finer control over storage with different performance tiers. It offers IOPS and throughput metrics; SSD-backed storage provides higher performance but at a higher cost per gigabyte compared to magnetic disk-backed storage.
x??

---

#### Local Instance Volumes
Local instance volumes are physically attached to the host server running a VM and offer low latency and high IOPS, making them very cost-effective. However, they do not support advanced virtualization features like EBS such as snapshots or replication. The contents of these disks are lost when the VM is deleted.
:p What are local instance volumes?
??x
Local instance volumes are physically attached to the host server running a VM and offer low latency and high IOPS at very low cost. They do not support advanced virtualization features like EBS such as snapshots or replication, but their contents are lost when the VM is deleted.
x??

---

