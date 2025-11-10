# High-Quality Flashcards: 2B002---Fundamentals-of-Data-Engineering_processed (Part 18)


**Starting Chapter:** Big Ideas and Trends in Storage

---


#### Data Lakehouse Architecture
A data lakehouse combines elements of both data lakes and data warehouses, aiming to balance the flexibility of a lake with the structured querying capabilities of a warehouse. This architecture supports automated metadata management and table history, ensuring seamless update and delete operations without exposing the complexity of underlying file and storage management.
:p What is a key characteristic of a data lakehouse?
??x
A data lakehouse combines the flexibility of a data lake with the structured querying capabilities of a data warehouse, providing both raw and structured data storage alongside automated metadata management and support for various tools to read data directly from object storage without managing underlying files.
x??

---
#### Interoperability in Data Lakehouses
Interoperability is a significant advantage of data lakehouses over proprietary tools. Storing data in open file formats allows easier exchange between different tools, reducing the overhead associated with reserializing data from proprietary formats to common ones like Parquet or ORC.
:p What does interoperability mean in the context of data lakehouses?
??x
Interoperability in data lakehouses means that various tools can easily connect to the metadata layer and read data directly from object storage, without having to manage or convert data stored in a proprietary format. This facilitates seamless integration between different analytical tools.
x??

---
#### Stream-to-Batch Storage Architecture
The stream-to-batch architecture involves writing streaming data to multiple consumers: real-time processing systems for generating statistics on the stream and batch storage consumers for long-term retention and batch queries. Tools like AWS Kinesis Firehose can generate S3 objects based on configurable triggers, while BigQuery automatically reserializes streaming data into columnar object storage.
:p How does a stream-to-batch architecture handle real-time and historical data?
??x
In a stream-to-batch architecture, streaming data is written to multiple consumers: one or more real-time processing systems for generating statistics on the fly, and at least one batch storage consumer for long-term retention and batch queries. AWS Kinesis Firehose can create S3 objects based on configurable triggers (like time or batch size), while BigQuery automatically converts streaming data into columnar object storage.
x??

---
#### Data Platforms
Data platforms are vendor-created ecosystems of interoperable tools with tight integration into the core data storage layer, aiming to simplify the work of data engineering and potentially generate significant vendor lock-in. These platforms often emphasize close integration with object storage for handling unstructured data use cases.
:p What is a key feature of data platforms?
??x
A key feature of data platforms is their ability to provide an ecosystem of interoperable tools that are tightly integrated into the core data storage layer, designed to simplify the work of data engineering and potentially create significant vendor lock-in. These platforms often integrate closely with object storage for handling unstructured data use cases.
x??

---
#### Data Engineering Storage Abstractions
Data engineering storage abstractions refer to managing data in a way that abstracts away the complexities of underlying file and storage management, allowing engineers to focus on higher-level operations such as metadata management and querying. This is especially relevant when dealing with large-scale data processing and storage needs.
:p What does data engineering storage abstraction aim to achieve?
??x
Data engineering storage abstractions aim to simplify the handling of large-scale data by abstracting away the complexities of underlying file and storage management, allowing engineers to focus on higher-level operations such as metadata management and querying. This is particularly useful in environments where data volume and variety are high.
x??

---


#### Data Catalog
A data catalog is a centralized metadata store for all data across an organization. It integrates with various systems and abstractions, working across operational and analytics data sources while providing lineage and presentation of data relationships.
:p What is a data catalog?
??x
A data catalog serves as a central repository for metadata related to the organization's datasets, enabling users to search, discover, and understand their data better. It supports integration with different data systems like data lakes, warehouses, and operational databases.
??x

---

#### Catalog Application Integration
Ideally, data applications are designed to integrate directly with catalog APIs to handle their metadata and updates. As catalogs become more prevalent in an organization, this ideal becomes more achievable.
:p How can data applications be integrated with a data catalog?
??x
Data applications can be integrated with a data catalog by leveraging its APIs. This integration allows the application to automatically manage metadata related to the datasets it uses. Here is a simplified example of how this might look in pseudocode:

```pseudocode
// Pseudocode for integrating an application with a data catalog API

function integrateWithCatalog(appName) {
    // Step 1: Initialize connection to the data catalog API
    let catalogAPI = new CatalogAPI()

    // Step 2: Register the application with the catalog
    catalogAPI.registerApplication(appName)

    // Step 3: Define metadata handling functions for the app
    function handleMetadataChanges() {
        // Function logic to update and retrieve metadata as needed
    }

    // Step 4: Use catalog API throughout the application's lifecycle
    while (true) {
        // Fetch data from various sources using catalog metadata
        let metadata = catalogAPI.getMetadataForDatasets()
        
        // Process the fetched metadata
        handleMetadataChanges(metadata)
    }
}
```
This example demonstrates how an application can continuously interact with a data catalog to manage and use its metadata.
??x

---

#### Automated Scanning
In practice, cataloging systems often rely on automated scanning layers that collect metadata from various sources such as data lakes, warehouses, and operational databases. These tools can infer relationships or sensitive data attributes automatically.
:p How do cataloging systems typically gather metadata?
??x
Cataloging systems use automated scanning layers to collect metadata from diverse data sources like data lakes, warehouses, and operational databases. This process can also involve inferring additional information such as key relationships or identifying sensitive data.

Here is a simplified example of an automated scanning function:

```pseudocode
// Pseudocode for an automated scanning mechanism

function scanAndCollectMetadata(source) {
    // Step 1: Connect to the data source (e.g., database, file system)
    let dataSource = connectToDataSource(source)

    // Step 2: Scan the data and collect metadata information
    let metadataInfo = dataSource.scanData()

    // Step 3: Infer relationships or sensitive data attributes if necessary
    if (metadataInfo.containsSensitiveData) {
        processSensitiveData(metadataInfo)
    }

    return metadataInfo
}

// Example usage of the scanning function

function collectAllMetadata() {
    let sources = [dataLake, dataWarehouse, operationalDB]
    
    for each source in sources {
        let metadata = scanAndCollectMetadata(source)
        
        // Store or use the metadata as needed
        storeMetadata(metadata)
    }
}
```
This pseudocode illustrates how a scanning function can be implemented to collect and process metadata from different data sources.
??x

---

#### Data Portal and Social Layer
Data catalogs often provide a web interface for users to search, view relationships between datasets, and enhance user interaction through features like Wiki functionality. This social layer allows users to collaborate by sharing information, requesting data, and posting updates.
:p What additional functionalities do data portals and social layers offer in data catalogs?
??x
Data portals in data catalogs provide a web interface where users can search for and view relationships between datasets. Social layers enhance user interaction through features like Wiki functionality. Users can share information, request data from others, and post updates as they become available.

Here is an example of how a social layer might be implemented:

```pseudocode
// Pseudocode for implementing a social layer in a data catalog

class User {
    function searchForData(query) {
        // Logic to search the catalog based on user's query
    }

    function shareInformation(info, datasetName) {
        // Logic to post information related to a specific dataset
    }

    function requestInformation(requestDetails, targetUser) {
        // Logic to send a request for data or information to another user
    }
}

class SocialLayer {
    function displayDataPortal() {
        // Display the web interface with search and view functionalities
    }

    function enableCollaboration(usersList) {
        // Enable collaboration features such as sharing and requesting information
    }
}
```
This pseudocode outlines how a social layer can be integrated into a data catalog, providing users with collaborative tools.
??x


#### Colocation of Compute and Storage
Colocation is a method used to improve database performance by placing compute and storage resources close together. This proximity allows for faster, lower-latency disk reads and higher bandwidth compared to remote access.

For transactional databases:
- Data blocks are stored locally on the same machine or within a small network.
- This setup minimizes latency and maximizes I/O operations per second (IOPS).

For analytics query systems using HDFS and MapReduce:
- Data blocks are distributed across multiple nodes in a cluster.
- Map tasks are dispatched to data locations, reducing network overhead.
- Locality optimization is crucial for improving performance.

:p What is colocation of compute and storage?
??x
Colocation of compute and storage refers to the practice of placing computing resources and storage devices close together to minimize latency and improve I/O operations. This method enhances database performance by ensuring that data can be accessed rapidly without incurring significant network overhead.
x??

---

#### Separation of Compute and Storage
The shift toward separating compute from storage is driven by the need for ephemeral resource management, scalability, and improved data durability.

Ephemeral and scalable resources:
- In cloud environments, it’s cheaper to pay-as-you-go than to maintain dedicated hardware 24/7.
- Workloads can vary significantly; therefore, dynamically scaling resources is more efficient.
- Examples include web servers in online retail and periodic big data batch jobs.

Data durability and availability:
- Cloud object stores provide high uptime through redundancy across multiple zones or regions.
- S3, for instance, stores data across multiple zones to ensure high availability even if one zone fails due to a natural disaster.
- Multiple cloud regions can further mitigate the risk of misconfiguration by deploying updates regionally.

:p Why is there a shift toward separating compute and storage?
??x
There is a shift toward separating compute and storage in cloud environments because it allows for more efficient resource management. By dynamically scaling resources based on demand, organizations can reduce costs and improve performance. Cloud object stores provide high uptime and data durability through redundancy across multiple zones or regions.
x??

---

#### Hybrid Separation and Colocation
Hybrid separation and colocation combine the benefits of both approaches by using multi-tier caching and hybrid object storage.

Multitier caching:
- Utilizes object storage for long-term data retention and access.
- Local storage is used during queries and various stages of data pipelines to improve performance.
- Example: Using SSDs or NVMe drives locally, while storing less frequently accessed data on S3 or similar services.

Hybrid object storage:
- Tightly integrates compute with object storage to balance the benefits of both.
- Examples include Google Cloud Storage and Amazon EFS (Elastic File System).

:p How do we hybridize separation and colocation?
??x
We hybridize separation and colocation by using multitier caching, where local storage is used for performance-critical operations while data is stored in object storage for long-term retention. This approach combines the benefits of both methods to optimize resource usage and performance.

For example:
```java
public class DataPipeline {
    private S3Client s3;
    private LocalStorageCache cache;

    public void process() {
        String key = "important-data";
        
        // Check if data is in local cache
        if (cache.containsKey(key)) {
            byte[] data = cache.get(key);
            // Process data locally
            processData(data);
        } else {
            // Fetch from S3 if not in cache
            byte[] data = s3.getObject(key).getContent();
            cache.put(key, data);  // Store in local cache for future use
            processData(data);
        }
    }

    private void processData(byte[] data) {
        // Process the data as needed
    }
}
```
x??

---


#### AWS EMR with S3 and HDFS
AWS Elastic MapReduce (EMR) allows engineers to use temporary Hadoop Distributed File System (HDFS) clusters for processing large datasets. The system can reference both Amazon Simple Storage Service (S3) and local HDFS as filesystems. A common pattern is to:
1. Mount an HDFS cluster on SSD drives.
2. Pull data from S3.
3. Process the data in intermediate steps, storing results locally on HDFS for better performance.
4. Write full results back to S3 once processing is complete.
5. Delete the temporary HDFS cluster.

This approach leverages local storage (SSD) within the EMR cluster to speed up processing and reduce latency compared to direct operations from S3, which can be slower due to network overhead.

:p How does AWS EMR utilize S3 and HDFS in its data processing pipeline?
??x
AWS EMR uses temporary Hadoop Distributed File System (HDFS) clusters running on SSD drives. It leverages both S3 and local HDFS for efficient data storage and processing:
1. Data is initially pulled from S3 into the HDFS cluster.
2. Intermediate results are stored in HDFS to take advantage of faster local disk access.
3. Once all processing steps are complete, final results are written back to S3.
4. The temporary EMR cluster and associated HDFS resources are then deleted.

This method optimizes performance by reducing network latency between S3 and the compute nodes, thereby speeding up data processing tasks.

```java
// Pseudocode for a simplified EMR job flow
public void processEMRJob(String s3BucketName, String hdfsPath) {
    // Pull data from S3 into HDFS
    pullDataFromS3(s3BucketName, hdfsPath);

    // Process the data in intermediate steps
    processDataInHDFS(hdfsPath);

    // Write final results back to S3
    writeResultsToS3(s3BucketName);
}

public void pullDataFromS3(String s3BucketName, String hdfsPath) {
    // Code to copy files from S3 to HDFS
}

public void processDataInHDFS(String hdfsPath) {
    // Code to process data in HDFS using MapReduce or Spark
}

public void writeResultsToS3(String s3BucketName) {
    // Code to move processed results back to S3
}
```
x??

---
#### Apache Spark and HDFS
Apache Spark is often used for big data processing, where it relies on distributed filesystems like HDFS for temporary storage between steps. The main issue with using DRAM (Dynamic Random Access Memory) directly as memory is its high cost. Therefore, running Spark in the cloud allows users to rent large amounts of memory temporarily and release it when not needed.

:p How does Apache Spark use HDFS or other distributed filesystems?
??x
Apache Spark uses HDFS or another ephemeral distributed filesystem for temporary storage between processing steps. This approach helps manage the cost of DRAM, which is expensive compared to disk-based storage:
1. Data can be stored temporarily on a distributed filesystem.
2. Intermediate results are processed and stored in memory (DRAM) for faster access during the computation.
3. Final results are written back to persistent storage such as HDFS or another suitable filesystem.

This method balances performance with cost efficiency, leveraging cheaper disk-based storage while taking advantage of fast in-memory processing.

```java
// Pseudocode for a simplified Spark job flow
public void runSparkJob(String inputPath, String outputPath) {
    // Load data from distributed filesystem (e.g., HDFS)
    Dataset<Row> dataset = spark.read().format("csv").load(inputPath);

    // Process the data using Spark transformations and actions
    dataset.transformationsAndActions();

    // Write final results back to persistent storage (e.g., HDFS or S3)
    dataset.write().mode(SaveMode.Overwrite).parquet(outputPath);
}
```
x??

---
#### Apache Druid and SSDs
Apache Druid is designed for high performance by heavily relying on Solid State Drives (SSDs) for data storage. Given that SSDs are significantly more expensive than magnetic disks, Druid optimizes storage costs by keeping only one copy of the data in its cluster. This approach reduces "live" storage costs by a factor of three.

:p How does Apache Druid manage storage costs while maintaining high performance?
??x
Apache Druid maintains high performance and manages storage costs efficiently by:
1. Using SSDs for fast data access.
2. Keeping only one copy of the data in the cluster to reduce live storage costs (by a factor of three).
3. Utilizing an object store as its durability layer, ensuring data can be recovered from node failures or data corruption.

This approach balances performance with cost efficiency by leveraging expensive SSDs for fast read/write operations and using cheaper object stores for backup and recovery purposes.

```java
// Pseudocode for Apache Druid's data ingestion process
public void ingestDataIntoDruid(String dataSource, String jsonData) {
    // Process and serialize the input data into compressed columns
    byte[] serializedData = processDataAndSerialize(jsonData);

    // Write the serialized data to cluster SSDs and object storage
    writeDataToCluster(serializedData);
}

// Pseudocode for writing data to the cluster
private void writeDataToCluster(byte[] data) {
    // Write data to SSDs in the cluster
    writeToSSDs(data);

    // Store a copy of the data in an object store for durability and recovery
    storeInObjectStore(data);
}
```
x??

---
#### Hybrid Object Storage
Google's Colossus file storage system supports fine-grained control over data block location, allowing BigQuery to colocate customer tables in single locations. This results in ultra-high bandwidth queries by leveraging local network resources.

:p What is hybrid object storage and how does it work?
??x
Hybrid object storage combines the clean abstractions of object storage with some advantages of colocating compute and storage:
1. It allows for fine-grained control over data block location.
2. Colocating tables in a single location can significantly improve query performance by maximizing local network bandwidth.

Public cloud services like AWS S3 Select allow users to filter S3 data directly within the S3 cluster, optimizing performance and efficiency.

```java
// Pseudocode for hybrid object storage usage
public void processS3Data(String s3BucketName) {
    // Use S3 Select to filter data locally before returning it over the network
    String filteredData = filterDataLocally(s3BucketName);

    // Process the filtered data as needed
    processData(filteredData);
}

private String filterDataLocally(String s3BucketName) {
    // Code to query S3 for specific data and process it locally within the cluster
    return s3Client.filterData(s3BucketName, criteria);
}
```
x??

---

