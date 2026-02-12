# High-Quality Flashcards: 2B002---Fundamentals-of-Data-Engineering_processed (Part 34)


**Starting Chapter:** The Tight Feedback Between Applications and ML

---


#### Modern Data Stack (MDS) Limitations
Background context: The modern data stack is praised for its powerful tools, cost-effectiveness, and empowerment of analysts. However, it has limitations when compared to next-generation real-time applications due to its cloud data warehouse-centric nature.

:p What are the key limitations of the Modern Data Stack?
??x
The key limitations include:

- It is essentially a repackaging of old data warehousing practices using modern technologies.
- It focuses on internal-facing analytics and data science, which may not meet the demands of real-time applications.
- Batch processing techniques limit its ability to handle continuous streams of data efficiently.

x??

---

#### Live Data Stack Evolution
Background context: The live data stack aims to move beyond traditional MDS by integrating real-time analytics and ML into applications. This evolution is driven by the need for automation and sophisticated real-time data processing in business-critical applications like TikTok, Uber, or Google.

:p What drives the shift toward a Live Data Stack?
??x
The shift toward a live data stack is driven by:

- Automation replacing repetitive analytical tasks.
- The need for real-time decision-making and actions based on events as they occur.
- The democratization of advanced streaming technologies previously exclusive to large tech companies.

x??

---

#### Streaming Pipelines and Real-Time Analytical Databases
Background context: Traditional MDS focuses on batch processing, while the live data stack embraces streaming pipelines and real-time analytical databases for continuous data flow. These tools enable subsecond queries and fast ingestion.

:p What are the two core technologies of the live data stack?
??x
The two core technologies of the live data stack are:

- Streaming Pipelines: Continuous stream-based processing.
- Real-Time Analytical Databases: Enabling fast ingestion and real-time query capabilities.

x??

---

#### ETL vs STL Transformation
Background context: The move from traditional ELT to modern STL transformations is driven by the need for continuous data streams. This shift impacts how data is extracted, transformed, and loaded into systems.

:p What does STL stand for in the context of data engineering?
??x
STL stands for Stream, Transform, and Load. It refers to a transformation approach where:

- Extraction: Continuous process.
- Transformation: Occurs as part of the streaming pipeline.
- Loading: Integrates real-time data into storage systems.

x??

---

#### Data Modeling in Real-Time Systems
Background context: Traditional batch-oriented modeling techniques are not suitable for real-time systems. New data-modeling approaches will be needed to handle dynamic and continuous streams of data.

:p Why is traditional data modeling less suited for real-time systems?
??x
Traditional data modeling techniques, such as those used in the MDS, are designed for batch processing and ad hoc queries. They struggle with:

- Continuous streaming ingestion.
- Real-time query requirements.
- Dynamic and evolving data definitions.

New approaches will focus on upstream definitions layers, metrics, lineage, and continuous evolution of data models throughout the lifecycle.

x??

---

#### Fusion of Application and Data Layers
Background context: The integration of application and data layers is a key aspect of the live data stack. This fusion aims to create seamless real-time decision-making within applications.

:p How will the application and data layers be integrated in the future?
??x
The application and data layers will be integrated by:

- Applications becoming part of the data stack.
- Real-time automation and decision-making powered by streaming pipelines and ML.
- Shortening the time between stages of the data engineering lifecycle through continuous updates.

x??

---


#### Availability Zones
Background context explaining the concept. Availability zones are the smallest unit of network topology that public clouds make visible to customers. They generally consist of two or more data centers, ensuring independent resources so a local power outage doesn't affect multiple zones.

In most cloud environments, there is high throughput and low latency between systems within a zone. This makes it ideal for running performance-critical workloads such as high-throughput data processing jobs. For example, an ephemeral Amazon EMR cluster should generally be deployed in a single availability zone to ensure optimal performance and cost efficiency.

Network traffic sent to VMs within the same zone is free but must be directed to private IP addresses. This means that if you need to communicate between two VMs within the same zone, it will not incur any additional costs. However, using public IPs for external communications may lead to data egress charges.
:p What are availability zones in cloud computing?
??x
Availability zones refer to the smallest unit of network topology that a public cloud makes visible to customers. They are typically comprised of two or more independent data centers, ensuring that local power outages do not affect multiple zones.

They offer high throughput and low latency between systems within the same zone, making them ideal for running performance-critical workloads like high-throughput data processing jobs.
x??

---

#### Regions
Background context explaining the concept. A region is a collection of two or more availability zones. This setup ensures that if one part of a region experiences an issue, it won't affect other parts within the same region due to independent resources.

Regions allow cloud providers to spread their infrastructure across different physical locations, which can be beneficial for minimizing latency and offering services closer to users globally.
:p What is a region in cloud computing?
??x
A region is a collection of two or more availability zones. Each region has its own set of data centers with independent resources, ensuring that if one part of the region experiences an issue, other parts within the same region remain unaffected.

This setup allows cloud providers to offer services closer to users by spreading their infrastructure across different physical locations.
x??

---

#### Network Traffic and Costs
Background context explaining the concept. Network traffic between VMs within the same zone is free but must be directed to private IP addresses. Using public IPs for external communications may lead to data egress charges.

Cloud providers typically utilize virtual private clouds (VPCs) which provide private IP addresses for internal communication, while allowing VMs to also have public IP addresses for external communication.
:p How does network traffic between VMs within the same zone work in cloud computing?
??x
Network traffic between VMs within the same availability zone is free but must be directed to private IP addresses. If you need to communicate between two VMs within the same zone, you should use their private IPs to avoid additional costs.

However, if external communications are required, public IP addresses may be used, but this can incur data egress charges.
x??

---


#### Physical Distance and Network Hops Impact on Performance

Background context explaining how physical distance and network hops affect performance, including terms like latency. Provide a brief explanation of why these factors are important for cloud services.

:p How do physical distance and network hops impact performance in cloud services?
??x
Physical distance can increase latency due to the time it takes for data to travel over the network. Network hops also contribute to this latency as each hop adds processing overhead and potential delays. In summary, both factors combined can significantly decrease the performance of cloud services.

For example, if two VMs are in different regions separated by a long physical distance with multiple network hops, their communication will likely experience higher latency compared to VMs within the same region.
??x
The answer with detailed explanations includes why these factors are crucial for understanding the performance implications in cloud environments. No code is necessary here as this concept is more theoretical.

---
#### Regional Networking Performance

Background context explaining the networking performance between zones and regions, including nominal data egress charges. Provide a brief explanation of how regional networking works to deliver data efficiently without complex replication processes.

:p What are the differences in networking performance between zones and within a single region?
??x
Networking performance is generally better within a single zone compared to between zones or across regions. Zones support fast, low-latency networking, while networking between zones incurs additional nominal data egress charges and may be slower due to more hops.

Additionally, GCP's multiregional storage allows efficient data access without the need for complex replication processes between regions.
??x
The answer explains that within a zone, performance is faster and cheaper, whereas between zones or regions, there can be additional costs and reduced performance. For multiregions, it highlights how GCP manages this to provide cost-effective and fast access.

---
#### Multiregional Redundancy in Google Cloud Platform

Background context explaining the concept of multiregion in GCP, including its design for redundancy and efficient data delivery within a multiregion. Provide an explanation of why multiregions are beneficial and how they work to ensure data availability.

:p What is a multiregion in Google Cloud Platform (GCP)?
??x
A multiregion in GCP is a layer in the resource hierarchy that contains multiple regions. Resources like Cloud Storage and BigQuery can be set up across these regions, providing geo-redundancy so that data remains available even if a regional failure occurs.

Data within a multiregion is stored redundantly across zones to ensure availability. This design allows efficient data delivery to users within the same multiregion without incurring egress fees for VMs accessing Cloud Storage data.
??x
The answer explains what a multiregion is, its purpose, and how it ensures data availability through redundancy and efficient data access.

---
#### Premium-Tier Networking in Google Cloud Platform

Background context explaining GCP's premium-tier networking, which allows traffic to pass over Google-owned networks without traversing the public internet. Provide an explanation of why this feature is beneficial for performance.

:p What is premium-tier networking in GCP?
??x
Premium-tier networking in GCP allows traffic between zones and regions to pass entirely over Google-owned networks instead of traversing the public internet. This can significantly improve network performance by reducing latency and avoiding potential issues with public internet reliability.

For example, if a VM in one region needs to access data stored in another region, premium-tier networking ensures that this communication occurs on Google's own infrastructure rather than via the potentially congested and unreliable public internet.
??x
The answer explains the concept of premium-tier networking, its benefits, and how it works to improve performance by leveraging Google's proprietary network resources.

---
#### Direct Network Connections to Clouds

Background context explaining enhanced connectivity options provided by major cloud providers, such as Amazon Cloud Networking. Provide an explanation of why these features are beneficial for integrating cloud regions or VPCs directly with customer networks.

:p What are the benefits of direct network connections in public clouds?
??x
Direct network connections offered by cloud providers like AWS allow customers to integrate their on-premises networks with a cloud region or Virtual Private Cloud (VPC) directly. This integration can significantly improve performance and security, as it reduces reliance on the public internet for data transfer.

For instance, using Amazon Cloud Networking enables private connectivity between on-premises resources and AWS services without routing traffic through the internet.
??x
The answer explains why direct network connections are beneficial, focusing on improved performance and security. No code is necessary here as this concept is more about understanding benefits and use cases.

