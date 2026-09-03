# AWS Certifications Study Guide

## AWS LocalStack

#### localstack-start
Start localstack service for local development

:p How do you start localstack?
??x
```bash
localstack start -d
```
x??

#### create-bucket-and-list
Create S3 bucket and display list of buckets using localstack

:p Create a bucket named riskzone and display the list of buckets
??x
```bash
awslocal s3 mb s3://riskzone
awslocal s3api list-buckets
```
x??

## PostgreSQL Commands

#### list-databases-and-users
List all databases and users in PostgreSQL

:p List all databases and all users
??x
```sql
\l 
\du
```
x??

#### create-database-and-connect
Create a new database and connect to it

:p Create adatabase named riskzone and connect ot the database
??x
```sql
CREATE DATABASE riskzone;
\c riskzone
```
x??

#### create-users
Create PostgreSQL users with different configurations

:p Create a user named no_one 
Create a user named no_one with password pass123
??x
```sql
CREATE USER no_one;
CREATE usUSER no_two with login password `qwerty`;
```
x??

#### remove-database
Remove a PostgreSQL database

:p Remove Database named riskzone
??x
```sql
DROP DATABASE riskzone;
```
x??

## AWS Cloud Practitioner Certification

#### shared-responsibility-model
The Customer is responsible for:
- Customer Data
- Platform, Applications, Identity & Access Management
- Operating System, Network & Firewall Configuration
- Client-Side Data Encryption
- Server-Side Data Encryption
- Networking Traffic Protection

:p List 2 responsibilities of the customer in the Shared Responsibility Model
 And how would you ensure that?
??x
Customer is responsible for securing their data, managing IAM, configuring OS and network settings, and implementing encryption. This can be ensured through proper IAM policies, security group configuration, encryption at rest and in transit, and regular security audits.
x??

#### cost-allocation-tags
Cost allocation tags are key-value pairs that enable you to categorize your AWS costs. For example, you can define a tag key named Department and a tag value named Sales for all the resources in your sales department, and a tag key named Department and a tag value named Engineering for all the resources in your engineering department. You can then view the total costs for each department using the cost allocation tags.

:p how can you use cost allocation tags to categorize your AWS costs?
??x
Use key-value pairs like Department:Sales or Environment:Production on resources, then generate cost reports grouped by these tags to track spending by department, project, or environment.
x??

#### aws-well-architecture-framework-design-principles
Here the design principles for operational excellence in the cloud

Perform operations as code: In the cloud, you can apply the same engineering discipline that you use for application code to your entire environment. You can define your entire workload (applications, infrastructure, etc.) as code and update it with code. You can script your operations procedures and automate their process by launching them in response to events. By performing operations as code, you limit human error and create consistent responses to events.

Make frequent, small, reversible changes: Design workloads that are scaleable and loosely coupled to permit components to be updated regularly. Automated deployment techniques together with smaller, incremental changes reduces the blast radius and allows for faster reversal when failures occur. This increases confidence to deliver beneficial changes to your workload while maintaining quality and adapting quickly to changes in market conditions.

Refine operations procedures frequently: As you evolve your workloads, evolve your operations appropriately. As you use operations procedures, look for opportunities to improve them. Hold regular reviews and validate that all procedures are effective and that teams are familiar with them. Where gaps are identified, update procedures accordingly. Communicate procedural updates to all stakeholders and teams. Gamify your operations to share best practices and educate teams.

Anticipate failure: Perform "pre-mortem" exercises to identify potential sources of failure so that they can be removed or mitigated. Test your failure scenarios and validate your understanding of their impact. Test your response procedures to ensure they are effective and that teams are familiar with their process. Set up regular game days to test workload and team responses to simulated events.

Learn from all operational failures: Drive improvement through lessons learned from all operational events and failures. Share what is learned across teams and through the entire organization.

Use managed services: Reduce operational burden by using AWS managed services where possible. Build operational procedures around interactions with those services.

Implement observability for actionable insights: Gain a comprehensive understanding of workload behavior, performance, reliability, cost, and health. Establish key performance indicators (KPIs) and leverage observability telemetry to make informed decisions and take prompt action when business outcomes are at risk. Proactively improve performance, reliability, and cost based on actionable observability data.

:p Using of the design principles, Ideate a strategy that implments such design prinicple
??x
Implement Infrastructure as Code using CloudFormation/Terraform, use CI/CD pipelines for small incremental deployments, conduct regular chaos engineering exercises, implement comprehensive monitoring with CloudWatch and X-Ray, and establish automated rollback procedures for failed deployments.
x??

#### grouping-of-aws-services

AWS Trusted Advisor
AWS Partner Network
AWS Artifact

:p Select one, indicate when you would use them
??x
AWS Trusted Advisor - To check for recommendations such as saving money, security suggestions, cost optimization features
AWS Partner Network - If a company 
AWS Artifact - AWS and ISV security and compliance reports (Including thridaprty, terminate reports, etc)
x??

#### aws-ec2-pricing-models
On-Demand Instances: Business-critical events or workloads that require capacity assurance     Workloads that need to meet regulatory requirements for high availability     Disaster recovery  

Amazon EC2 Capacity blocks for ML: Training and fine-tuning ML models Running experiments and building prototypes Planning for future surges in demand for ML applications 

Dedicated Hosts: Users looking to save money on licensing costs Workloads that need to run on dedicated physical servers Users looking to offload host maintenance onto AWS, while controlling their maintenance event schedules to suit their business's operational needs

:p Which pricing model would you use existing server bound licenses? 
 How about for ML and machine learning worklouad ? How about for Capacity Reservation? during critical business workloads?
??x
Dedicated Hosts - Existing server-bound licenses
Amazon EC2 Capacity blocks for ML - ML and machine learning worklouad
On-Demand Instances - Critical business workloads
x??

#### taking-advantage-of-ebs
"Amazon Elastic Block Store (EBS) is an easy to use, high-performance, block-storage service designed for use with Amazon Elastic Compute Cloud (EC2) for both throughput and transaction intensive workloads at any scale. A broad range of workloads, such as relational and non-relational databases, enterprise applications, containerized applications, big data analytics engines, file systems, and media workflows are widely deployed on Amazon EBS.

You can choose from different volume types to balance optimal price and performance. You can achieve single-digit-millisecond latency for high-performance database workloads or gigabyte per second throughput for large, sequential workloads. You can change volume types, tune performance, or increase volume size without disrupting your critical applications, so you have cost-effective storage when you need it."

EBS volumes preserve their data through instance stops and terminations, can be easily backed up with EBS snapshots, can be removed from one instance and reattached to another, and support full-volume encryption

:p Think of an usage purpose for EBS considering it's features
??x
You can use it for a self-hosted database that requires a nightly shutdown for maintenance and cost-saving purposes
x??

#### regions-and-availability-zones
Region is a geographical area that has two or more Availability Zones. Each Region is completely independent.
Availability Zone (AZ) is an area with either one or more discrete Data Centres (building filled with servers), each with redundant power, networking, and connectivity, housed in separate facilities. If there are more than one data centre, they are counted as one AZ because they are located close together. Each Availability Zone is isolated, but the Availability Zones in a Region are connected through low-latency links.
Within the constructs of AWS, customers are encouraged to run their workloads in more than one Availability Zone. This ensures that customer applications can withstand even a complete Availability Zone failure - a very rare event in itself. This recommendation stands for real-time SIP infrastructure as well.
--NOTES--
--Edge Locations are endpoints used for caching content. They are located in most of the major cities around the world and are specifically used by CloudFront to distribute AWS content closer to end-users to reduce latency
to help lower latency and improve performance for users.

:p taking that into account, if you were to develop a caching system for optimal loadin gtimes, how would you scale your application?
??x
Identify the region might play, and perhaps which ability zone to separate the group of users (that might play concurrently) and offer cachin in edge locations for faster downloads in the cities where you display ads.
x??

#### estimating-costs
B- Cost Allocation tags: To forecast your costs, use the AWS Cost Explorer. Use cost allocation tags to divide your resources into groups, and then estimate the costs for each group.
C - AWS Pricing Calculator To estimate a bill, use the AWS Pricing Calculator (formerly AWS Simply Monthly Calculator)
D - AWS Total Cost of Ownership (TCO) Calculator: to compare the cost of running your applications in an on-premises or colocation environment to AWS

:p Select the tools for the following Manager asks you : 1- to separate and understand how much each project
 2- To estimate the bill whether we use a new service 

        3- To check if to upgrade to aws
??x
B, C, D
x??

#### consolidated-billing-for-aws-organizations
Consolidated billing has the following benefits:
One bill – You get one bill for multiple accounts.
Easy tracking – You can track the charges across multiple accounts and download the combined cost and usage data.
Combined usage – You can combine the usage across all accounts in the organization to share the volume pricing discounts, Reserved Instance discounts, and Savings Plans. This can result in a lower charge for your project, department, or company than with individual standalone accounts. For more information, see Volume discounts.
No extra fee – Consolidated billing is offered at no additional cost.

:p Explain to your manager, what alternatives to do if we have multiple aws accounts
??x
It would be eaier, since we can consolidate
x??

#### savings-reserved-instances
Standard Reserved Instances provide you with a significant discount compared to On-Demand Instance pricing, and can be purchased for a 1-year or 3-year term. Customers have the flexibility to change the Availability Zone, the instance size, and networking type of their Standard Reserved Instances.

Purchase Convertible Reserved Instances if you need additional flexibility, such as the ability to use different instance families, operating systems, or tenancies over the Reserved Instance term

Standard RIs: These provide the most significant discount (up to 72% off On-Demand) and are best suited for steady-state usage.
Convertible RIs: These provide a discount (up to 54% off On-Demand) and the capability to change the attributes of the RI as long as the exchange results in the creation of Reserved Instances of equal or greater value. Like Standard RIs, Convertible RIs are best suited for steady-state usage.
Scheduled RIs: These are available to launch within the time windows you reserve. This option allows you to match your capacity reservation to a predictable recurring schedule that only requires a fraction of a day, a week, or a month.

:p If you already know that you will need certain instance for a time, then what should you do to save costs? And what if you know that might need to upgrade it? What if you only want to run during a fraction of scheduled time?
??x
Standard RI: are good if you are sure you dont need to change. Convertible RIS are best suited if you might want to upgrade the instane type. And Scheduled RI, so you an optimize over the specific running schedule.
x??

#### elastic-and-cost-of-total-ownership
Cost of Total Ownership refers to the purchase price of an asset plus costs of operation over its life span
The Reduction of Elastic Cloud Computing (EC2) is that Reduces the cost by paying only what you use. 

A core reason organizations adopt a cloud IT infrastructure is to save money. The traditional approach of analyzing Total Cost of Ownership no longer applies when you move to the cloud. Cloud services provide the opportunity for you to use only what you need and pay only for what you use. We refer to this new paradigm as the Total Cost of Operation. You can use Total Cost of Operation (TCO) analysis methodologies to compare the costs of owning a traditional data center with the costs of operating your environment using AWS Cloud services

:p In what situations would you choose using Elastic Computing?
??x
When you want to reduce the cost of total ownership
Instead of running your own machiens.
x??

#### iam-best-practices-and-aws-best-practices

Design Best practices 
Loose coupling - As application complexity increases, a desirable attribute of an IT system is that it can be broken into smaller, loosely coupled components. 
This means that IT systems should be designed in a way that reduces interdependencies—a change or a failure in one component should not cascade to other components
IAM Best Practices - To help secure your AWS resources, follow these recommendations for the AWS Identity and Access Management (IAM) service:
IAM Best Practices
--Lock away your AWS account root user access keys
--Create individual IAM users
--Use groups to assign permissions to IAM users
--Grant least privilege
--Get started using permissions with AWS managed policies
--Use customer managed policies instead of inline policies
--Use access levels to review IAM permissions
--Configure a strong password policy for your users
--Enable MFA – These are not physical MFA tokens typically
--Use roles for applications that run on Amazon EC2 instances
--Use roles to delegate permissions
--Do not share access keys
--Rotate credentials regularly
--Remove unnecessary credentials
--Use policy conditions for extra security
--Monitor activity in your AWS account

:p Design a workflow that follows the best practices for system design
??x
Create loosely coupled microservices architecture, implement proper IAM with least privilege, use MFA and rotate credentials regularly, separate environments with different AWS accounts, and implement automated monitoring and logging.
x??

#### efs-vs-s3-vs-ebs
EBS: Elastic Block Storage: use case is more easily understood than the other two. It must be paired with an EC2 instance. So when you need a high-performance storage service for a single instance, use EBS.
EFS:Scaleable File Storage |  may be used whenever you need a shared file storage option for multiple EC2 instances with automatic, high-performance scaling. 
This makes it a great candidate for file storage for content management systems; for lift and shift operations, as its autoscaling potential means you do not need to re-architect; for application development, as EFS's shareable file storage is ideal for storing code and media files.
S3 is good at storing long-term data due to its archiving system. Things like reports and records, which may go unused for years, can be stored on S3 at a lower cost than the other two storage services discussed. 
As already stated, S3 is also useful for storing data on which complex queries may be run. This makes it useful for data related to customer purchases, behaviour or profiles, because that data can be easily queried and fed into analytics tools.
This  capacity for interfacing with other tools also makes S3 great for back-up and restoration, as it can be paired with Amazon Glacier for even more secure backing up.
S3 also supports static websites, so if you need to host a static HTML page, S3 is a good choice.

:p Design scenrios to use efs, s3 or ebs
??x
If I have an app on an ec2 that is the only one that needs to access the data, then I would use ebs. If I have multiple ec2 instances that need to access the same data, then I would use efs. If I have a static website at low cost, then I would use s3.
x??

#### redshift
AWS Redshift is a data warehousing service that shines in its ability to handle huge volumes of data — capable of processing structured and unstructured data in the range of exabytes. However, the service can also be used for large-scale data migrations.

:p What is aws redshift? When it is used for? Whats it's advantage?
??x
AWS Redshift, Redshift shines in its ability to handle huge volumes of data — capable of processing structured and unstructured data in the range of exabytes (10^18 bytes). However, the service can also be used for large-scale data migrations. 
Used when data to be analyzed is humongus. Petabyte Scales. To run Real time analytics,. Combination of data sources. Business Intelligence. and Log analysis.
Used for data encryption, familiar tools, intelligent potimization, automate repetitive tasks. Concurrent scales.
x??

#### inherited-controls
Inherited controls are controls that are inherited from other entities, such as the underlying infrastructure, operating system, or database layer. These controls are inherited by the customer and are not assessed by AWS. For example, AWS manages controls related to the physical and environmental security of the data centers, but the customer inherits those controls and is responsible for assessing them. Inherited controls are not included in the scope of the AWS SOC reports.

:p If you were to create your own cloud service what else would you consider as an inherited control?
??x
The underlying infrastructure, operating system, or database instance.
x??

#### shared-controls
Controls which apply to both the infrastructure layer and customer layers, but in completely separate contexts or perspectives. In a shared control, AWS provides the requirements for the infrastructure and the customer must provide their own control implementation within their use of AWS services. For example:

Patch Management – AWS is responsible for patching and fixing flaws within the infrastructure, but customers are responsible for patching their guest OS and applications.
Configuration Management – AWS maintains the configuration of its infrastructure devices, but a customer is responsible for configuring their own guest operating systems, databases, and applications.
Awareness & Training - AWS trains AWS employees, but a customer must train their own employees.

:p Understanding your controls. What are your cofniguration and awraness responsabilities? if you use aws?
??x
To Configure your own guest operating systems, databases, and applications. And to train your own employees.
x??

#### aws-iam-vs-aws-organizations
AWS IAM is an AWS service that enables you to manage access to AWS services and resources securely. Using IAM, you can create and manage AWS users and groups, and use permissions to allow and deny their access to AWS resources.

AWS Organizations is an account management service that enables you to consolidate multiple AWS accounts into an organization that you create and centrally manage. AWS Organizations includes account management and consolidated billing capabilities that enable you to better meet the budgetary, security, and compliance needs of your business. As an administrator of an organization, you can create accounts in your organization and invite existing accounts to join the organization. You can organize those accounts into groups and attach policy-based controls. You can apply policies across your organization to control access to AWS services, resources, and regions, and you can automate the creation of new accounts as your business needs grow.

:p What would you need if you need to create an account? How about if you need to manage access to aws services?
??x
AWS IAM to manage access to aws services. AWS Organizations to manage accounts.
x??

#### changes-in-aws-regions
Costs of the AWS Services can be different for each region because the cost, taxes, manpower, etc for the physical infrastructure and data centers are different from Region to Region.
--Latency depends on physical location. When your application is being accessed by your users, it should be blazing fast. So you need to identify the locations of your target audience and choose the region having a smaller latency for your customers.
--Data sovereignty compliance differs across the nations of the world. Considerations will need to be taken when using AWS in an unfamiliar location.
--Most of the AWS Services and features are Region dependent, and just a few ones are Region independent. Also, sometimes it happens that some services are not available in all the regions

:p Before choosing to pay for a region, or use certain technology for a region, what should you consider?
??x
Costs, Latency, Data sovereignty compliance, AWS Services and features
x??

#### ec2-regular-spot-optimized-dedicated-instance-dedicated-host
Regular Instances: These are the normal instances that you launch in AWS. They are billed at the On-Demand rate. are shared between multiple customers

Spot Instance: Save money (50-90%)by purchasing the hourly compute power of someone elses unused ec2 instance. Useful for tunning tasks that aren't critical. Fault-tolerant workloads. Such as: batch jobs, compute-intensive analysis, temporary autoo-scaling to meet a short-term spike, or another similar usage

Optimized EC2 Instance: Designed to deliver an optimized service level for a specific area. (Storage, memory, compute. Standard network bandwidth ,dedicated cpus. 
Dedicated Instance: VPC isntances that are blocked for use by a single customer
Dedicated Host: To enable isolation, give visiibility of the physical host. This is required if hte framework and libraries requires or restricts into a specific server

:p If you were to use ec2, what would you use for a fault-tolerant workload? What if you need to use a specific framework and libraries that are licensed to a single server?
??x
Spot Instance, Dedicated Host
x??

#### aws-services-for-video-content
Amazon CloudFront is a fast content delivery network (CDN) service that securely delivers data, videos, applications, and APIs to customers globally with low latency, high transfer speeds, all within a developer-friendly environment. CloudFront is integrated with AWS – both physical locations that are directly connected to the AWS global infrastructure, as well as other AWS services. CloudFront works seamlessly with services including AWS Shield for DDoS mitigation, Amazon S3, Elastic Load Balancing or Amazon EC2 as origins for your applications, and Lambda@Edge to run custom code closer to customers' users and to customize the user experience. Lastly, if you use AWS origins such as Amazon S3, Amazon EC2 or Elastic Load Balancing, you don't pay for any data transferred between these services and CloudFront.

:p Which of the following AWS Services can be used to serve large amounts of online video content?
??x
Amazon CloudFront
x??

#### cloud-native-partner-network-hybrid-architecture-on-premises
Cloud-native architecture is an approach to building and running applications that exploits the advantages of the cloud computing delivery model. Cloud-native is about how applications are created and deployed, not where. While today public cloud impacts the thinking about best practices for cloud-native architectures, cloud-native is not a public cloud-only phenomenon. It is entirely possible to adopt cloud-native practices and build cloud-native applications on-premises.

AWS Partner Network (APN) is the global partner program for technology and consulting businesses who leverage Amazon Web Services to build solutions and services for customers. The APN helps companies build, market, and sell their AWS offerings by providing valuable business, technical, and marketing support.

Hybrid architecture is a computing environment that uses a mix of on-premises, private cloud and third-party, public cloud services with orchestration between the two platforms. By allowing workloads to move between private and public clouds as computing needs and costs change, hybrid cloud gives businesses greater flexibility and more data deployment options.

On-premises (sometimes abbreviated as "on-prem") is a term meaning "on-site". It refers to the location of hardware or software within the confines of an enterprise rather than at a remote facility such as a server farm or cloud. The term is sometimes used to contrast with a similar term: off-premises, which refers to assets that are located outside of the physical confines of an enterprise's property. The term is also used in the phrase "on-premises software", which is a counterpart of "software as a service" (SaaS).

:p What is the difference between cloud-native, Partner network, hybrid architecture and on-premises?
??x
Cloud-native is about how applications are created and deployed, not where. refers to an application that was designed to reside in the cloud from the start. Cloud native involves cloud technologies like microservices, container orchestrators, and auto scaling.
AWS Partner Network (APN) is the global partner program for technology and consulting businesses who leverage Amazon Web Services to build solutions and services for customers. 
Hybrid architecture is a computing environment that uses a mix of on-premises, private cloud and third-party, public cloud services with orchestration between the two platforms. 
On-premises (sometimes abbreviated as "on-prem") is a term meaning "on-site". It refers to the location of hardware or software within the confines of an enterprise rather than at a remote facility such as a server farm or cloud.
x??

#### aws-iam-users-groups-policies-and-roles
IAM Users: An IAM user is a unique identity within your AWS account that can be granted permissions to access resources and perform actions. Users can be created within your AWS account and can be assigned a unique set of credentials, such as an access key and secret key, which are used to authenticate their access to AWS resources.

IAM Groups: An IAM group is a collection of IAM users that you can manage as a single entity. Groups allow you to grant permissions to multiple users at once, and make it easier to manage permissions as your user base grows. For example, you could create a group for all users in your development team, and grant them permissions to access the necessary resources for their work.

IAM Policies: An IAM policy is a document that defines the permissions that can be granted to an IAM user, group, or role. Policies are written in JSON and can be used to grant permissions to access specific AWS services, resources, or actions. For example, you could create a policy that allows a user to read and write to a specific S3 bucket.

IAM Roles: An IAM role is similar to a user or group, but is intended to be assumed by an AWS service or application. Instead of being associated with a set of credentials, roles are assumed by a service, such as an EC2 instance, and are granted permissions to access resources. Roles can also be assumed by external identity providers, such as your organization's identity provider (IdP).

:p You want to allow a multiple devs to login, and create some type of roles for machiens to login on with specific permissions. What would you use?
??x
IAM Users are required to be used for devs to login You can assign them under IAM Groups whcih share the same IAM Policies. IAM Roles are used for machines to login with specific permissions.
x??

#### vpc-networks
A virtual private cloud (VPC) is a virtual network dedicated to your AWS account. It is logically isolated from other virtual networks in the AWS Cloud. You can launch your AWS resources, such as Amazon EC2 instances, into your VPC. You can specify an IP address range for the VPC, add subnets, associate security groups, and configure route tables.

AWS Virtual Private Network (VPN) solutions establish secure connections via the public internet between your on-premises networks, remote offices, client devices, and the AWS global network
Reduced Latency: VPC networks often provide more direct network paths between services and resources, reducing the number of hops data must traverse compared to public internet routing. This can significantly reduce latency, making data exchange faster.
Higher Bandwidth: Within a VPC, the available bandwidth is typically higher than that available over the public internet. This is because cloud providers allocate more network resources within their infrastructure to support internal traffic, allowing for higher throughput.
Network Isolation: Traffic within a VPC does not compete with public internet traffic, which can be subject to congestion and variable performance. This isolation helps ensure consistent network performance, making data exchanges within a VPC more reliable

Optimized Routing: Cloud providers optimize the internal routing of traffic within their networks. When you connect services over a VPC, data packets travel through optimized paths, improving efficiency and reducing transmission times.
Enhanced Security: While not directly related to speed, the enhanced security of VPC connections can indirectly contribute to faster data exchange. Secure connections (like those in a VPC) reduce the risk of data interception and tampering, which can cause delays and require data to be resent. By providing a more secure environment, VPCs help ensure that data exchanges are not only faster but also more reliable.

:p Deisgn a scenario where you would use VPC networks
??x
You can use VPC networks to establish secure connections via the public internet between your on-premises networks, remote offices, client devices, and the AWS global network. You can also use VPC networks to reduce latency, increase bandwidth, isolate network traffic, optimize routing, and enhance security.
x??

#### vpn-virtual-private-network
A virtual private network (VPN) uses encryption to create a private network over the top of a public network. VPN traffic passes through publicly shared Internet infrastructure – routers, switches, etc. – but the traffic is scrambled and not visible to anyone.

:p What is VPN In aws, and when would you use it?
??x
A VPC will have a dedicated subnet and VLAN that are only accessible by the VPC customer. This prevents anyone else within the public cloud from accessing computing resources within the VPC – effectively placing the 'Reserved' sign on the table. The VPC customer connects via VPN to their VPC, so that data passing into and out of the VPC is not visible to other public cloud users.

Example usages:
Access a VPC.
Access a peered VPC.
Access an on-premises network.
Access the internet.
Client-to-client access.
Restrict access to your network.
x??

#### vlan-virtual-local-area-network
A LAN is a local area network, or a group of computing devices that are all connected to each other without the use of the Internet. A VLAN is a virtual LAN. Like a subnet, a VLAN is a way of partitioning a network, but the partitioning takes place at a different layer within the OSI model (layer 2 instead of layer 3).

:p What is VLAN In aws, and when would you use it?
??x
VLANs provide network segmentation at Layer 2 for security and traffic management within AWS networking infrastructure.
x??

#### aws-lambda
AWS Lambda is a compute service that lets you run code without provisioning or managing servers. Lambda runs your code only when needed and scales automatically, from a few requests per day to thousands per second. You pay only for the compute time that you consume—there is no charge when your code is not running. With Lambda, you can run code for virtually any type of application or backend service, all with zero administration. Lambda runs your code on a high-availability compute infrastructure and performs all of the administration of the compute resources, including server and operating system maintenance, capacity provisioning and automatic scaling, code monitoring and logging.

:p What is AWS Lambda? When would you use it?
??x
Processing uploaded S3 objects.
Document editing and conversion in a hurry.
Cleaning up the backend.
Creating and operating serverless websites.
Real-time processing of bulk data.
Rendering pages in real-time.
Automated backups.
Email Campaigns using AWS Lambda & SES.
x??

#### aws-personal-health-dashboard
The AWS Personal Health Dashboard provides alerts and remediation guidance when AWS is experiencing events that may impact you. The dashboard displays relevant and timely information to help you manage events in progress, and provides proactive notification to help you plan for scheduled activities. The dashboard also provides relevant support contact information to help you get assistance in resolving issues.
It is available to all AWS customers at no additional cost.
It provides a personalized view of the health of the specific services that are powering your workloads, not just the overall status of AWS services.
It will proactively notify you through alerts if AWS experiences any events that may affect your resources, helping provide quick visibility and guidance.
Customers with Business or Enterprise support plans also have API access to the events on the Personal Health Dashboard to integrate with their own systems.

:p Name a sample alert that you would receive from the AWS Personal Health Dashboard
??x
One sample alert you may receive from the AWS Personal Health Dashboard is an open event. The AWS Personal Health Dashboard monitors the health of AWS services powering your workloads and applications. It will proactively notify you if AWS experiences any events that could potentially affect your resources. Some examples of open events you could be alerted about are performance issues or availability problems with services like EC2, RDS, S3 etc. The alert helps provide quick visibility into any ongoing issues and guidance to minimize impact on your applications. You can click on the event from the notification bell icon in the AWS console to get more details on the issue from the AWS Health Dashboard.
x??

#### trusted-advisor
AWS Trusted Advisor provides recommendations to help optimize your AWS environment. It continuously monitors your AWS resources and accounts for various best practice checks across categories like cost optimization, security, performance and fault tolerance. Some key use cases of Trusted Advisor include:
Cost Optimization - It identifies unused or underutilized resources that can help reduce costs like unused EC2 instances, EBS volumes etc.
Security - It checks your environment against security best practices and points out any gaps or issues that need attention.
Performance - The performance checks help optimize configuration of resources like databases, caching etc to ensure optimal performance.
Fault Tolerance - It recommends ways to improve fault tolerance of your applications and workloads running on AWS
Service Limits - It provides visibility into your service limits and usage to help you request limit increases as needed. e.g. EC2 instance limits - It notifies you if you are approaching the maximum number of On-Demand Instances or Spot Instances allowed in each region.
Operational Excellence - It provides recommendations to improve operational excellence of your environment. - The goal is to efficiently operate infrastructure and applications while meeting business requirements through standardized, automated processes and continuous monitoring and learning. e.g.

:p What are the key use cases of Trusted Advisor?
??x
Cost Optimization, Security, Performance, Fault Tolerance, Service Limits, Operational Excellence
x??

#### aws-config
"AWS Config is a service that enables you to assess, audit, and evaluate the configurations of your AWS resources.
Config continuously monitors and records your AWS resource configurations and allows you to automate the evaluation of recorded configurations
against desired configurations. With Config, you can review changes in configurations and relationships between AWS resources, dive into detailed 
resource configuration histories, and determine your overall compliance against the configurations specified in your internal guidelines.
This enables you to simplify compliance auditing, security analysis, change management, and operational troubleshooting.

It provides a detailed inventory of all your AWS resources along with their configurations. This includes information like what each resource is configured with, how resources are related to each other through dependencies.

It maintains a configuration history of your AWS resources so you can see how the configurations and relationships change over time. This helps troubleshoot issues by accessing last known good configurations.

It supports configuration change notifications so you are notified when a resource is created, updated or deleted. This helps with audit logging and security monitoring.

You can develop AWS Config rules to specify desired configurations for resources. It then evaluates your resources against these rules and notifies you of any deviations or drifts from desired state.

The configuration history and change notifications provided by AWS Config can help with auditing by relating configuration changes to AWS CloudTrail events. This gives full visibility into who made changes and their impact.

It helps improve overall security and governance of your AWS infrastructure by continuously monitoring configurations and detecting vulnerabilities or compliance violations.

:p Further explain, how would you use any of the features of AWS Config in your organization?
??x
Use AWS Config to track resource compliance, monitor configuration drift, automate remediation actions, maintain security baselines, and generate audit reports for regulatory compliance.
x??

#### aws-cloudtrail-vs-cloud-watch

CloudTrail is an auditing service that records API calls and events within your AWS account. This includes actions taken through the AWS Management Console, command line tools, and SDKs. CloudTrail provides a history of these actions and events for auditing, tracking changes, and troubleshooting issues.

CloudWatch is a monitoring service that collects metrics and logs from AWS resources like EC2 instances, databases etc and also 3rd party applications. It provides visibility into resource utilization, application performance and overall operational health of resources. Some key capabilities include metrics and alarms to create custom metrics, set threshold

:p Where do you need to send logs to in order to analyze cloud trial logs?
??x
To analyze CloudTrail logs, you need to send them to CloudWatch Logs. This allows you to establish monitoring and alerting based on API activity recorded in CloudTrail logs. For example, alarms on specific API calls that create or delete security groups or network configurations.
x??

#### what-was-aws-opsworks
AWS OpsWorks is a configuration management service that helps you build and operate highly dynamic applications, and propagate changes instantly.

:p wHy is aws transitioning away from OpsWork?
??x
AWS OpsWorks is transitioning away from the OpsWorks Stacks service to focus on AWS OpsWorks for Chef Automate and AWS OpsWorks for Puppet Enterprise.

OpsWorks Stacks reached its end of life date in December 2021. AWS recommends customers migrate any existing OpsWorks Stacks instances to other AWS services like EC2, ECS, or Lambda.
Some key reasons for the transition include:
OpsWorks for Chef Automate and OpsWorks for Puppet Enterprise provide configuration management capabilities directly integrated with the Chef Automate and Puppet Enterprise products. This allows customers to leverage the full feature set of these configuration management tools.
AWS aims to focus on configuration management services that are tightly integrated with specific configuration management vendors like Chef and Puppet, rather than maintaining a custom configuration management layer like OpsWorks Stacks.
Migrating to other AWS services gives customers more flexibility and access to newer features compared to the older OpsWorks Stacks product. Services like EC2, ECS and Lambda are more actively developed by AWS.
x??

#### aws-support-plans-case-severity-response-times
Developer: General guidance: <24 hours. System impaired: <12 hours.
Business: General guidance: <24 hours. System impaired: <12 hours. Production System Impaired: <4hours, Production System Down: <1Hour
Enterprise On-Ramp: General guidance: <24 hours. System impaired: <12 hours. Production System Impaired: <1 hour, Production System Down: <30 minutes
Enterprise: General guidance: <24 hours. System impaired: <12 hours. Production System Impaired: <1 hour, Production System Down: <15 minutes

:p What are System Down impairment repsponse for 15 min, 30 min and 1 hour plans? (name htem in order)
??x
Enterprise, Enterprise On-Ramp, Business
x??

#### aws-support-starting-from-business

Full set of AWS Trusted Advisor checks starts from Business
Programmatic Case Management starts from Business
Third Party Software Support starts from Business

Technical Account Management starts from enterpreise On-Ramp
Billing Assistance starts from enterpreise On-Ramp
AWS Managed Services starts from enterpreise On-Ramp
AWS re:Post starts from enterpreise On-Ramp

Incident Detection and response starts from Enterprise: Enhanced monitoring.

:p When does the full set of AWS Trusted Advisor checks start?
??x
Business
x??

#### aws-support-programmatic-case-management

Full set of AWS Trusted Advisor checks starts from Business
Programmatic Case Management starts from Business
Third Party Software Support starts from Business

Technical Account Management starts from enterpreise On-Ramp
Billing Assistance starts from enterpreise On-Ramp
AWS Managed Services starts from enterpreise On-Ramp
AWS re:Post starts from enterpreise On-Ramp

Incident Detection and response starts from Enterprise: Enhanced monitoring.

:p When does the Programmatic Case Management, Third Party Software Support start? and when would you use each of them for?
??x
Business
x??

#### aws-support-technical-account-management

Full set of AWS Trusted Advisor checks starts from Business
Programmatic Case Management starts from Business
Third Party Software Support starts from Business

Technical Account Management starts from enterpreise On-Ramp
Billing Assistance starts from enterpreise On-Ramp
AWS Managed Services starts from enterpreise On-Ramp
AWS re:Post starts from enterpreise On-Ramp

Incident Detection and response starts from Enterprise: Enhanced monitoring.

:p When does the Technical Account Management, Billing Assistance, AWS Managed Services, AWS re:Post start and why would you use each of them for?
??x
Enterprise On-Ramp
x??

#### aws-support-incident-detection

Full set of AWS Trusted Advisor checks starts from Business
Programmatic Case Management starts from Business
Third Party Software Support starts from Business

Technical Account Management starts from enterpreise On-Ramp
Billing Assistance starts from enterpreise On-Ramp
AWS Managed Services starts from enterpreise On-Ramp
AWS re:Post starts from enterpreise On-Ramp

Incident Detection and response starts from Enterprise: Enhanced monitoring.

:p When does the Incident Detection and response (enhanced monitoring) start and why would you use each of them for?
??x
Enterprise
x??

#### amazon-vpc
A virtual private cloud (VPC) is a virtual network dedicated to your AWS account. It is logically isolated from other virtual networks in the AWS Cloud. You can specify an IP address range for the VPC, add subnets, add gateways, and associate security groups.

:p Why would you use Amazon VPC?
??x
You can use Amazon VPC to launch AWS resources into a virtual network that you've defined. This virtual network closely resembles a traditional network that you'd operate in your own data center, with the benefits of using the scalable infrastructure of AWS.
x??

#### amazon-subnet
A subnet is a range of IP addresses in your VPC. You launch AWS resources, such as Amazon EC2 instances, into your subnets. You can connect a subnet to the internet, other VPCs, and your own data centers, and route traffic to and from your subnets using route tables.

:p Why would you use Amazon Subnet?
??x
You can use Amazon Subnet to divide a VPC into multiple networks. This allows you to have multiple layers of security, and to route traffic between the subnets.
x??

#### amazon-route-tables
A route table contains a set of rules, called routes, that are used to determine where network traffic from your VPC is directed. You can explicitly associate a subnet with a particular route table. Otherwise, the subnet is implicitly associated with the main route table.
Each route in a route table specifies the range of IP addresses where you want the traffic to go (the destination) and the gateway, network interface, or connection through which to send the traffic (the target).

:p Why would you use Amazon Route Tables?
??x
You can use Amazon Route Tables to determine where network traffic from your VPC is directed. You can explicitly associate a subnet with a particular route table. Otherwise, the subnet is implicitly associated with the main route table.
x??

#### aws-private-global-network
AWS provides a high-performance, and low-latency private global network that delivers a secure cloud computing environment to support your networking needs. AWS Regions are connected to multiple Internet Service Providers (ISPs) as well as to a private global network backbone, which provides improved network performance for cross-Region traffic sent by customers.

:p Why would you use AWS Private Global Network?
??x
You can use AWS Private Global Network to deliver a secure cloud computing environment to support your networking needs. AWS Regions are connected to multiple Internet Service Providers (ISPs) as well as to a private global network backbone, which provides improved network performance for cross-Region traffic sent by customers.
x??

#### what-is-vpc-peering
A VPC peering connection is a networking connection between two VPCs that enables you to route traffic between them using private IPv4 addresses or IPv6 addresses. Instances in either VPC can communicate with each other as if they are within the same network. You can create a VPC peering connection between your own VPCs, or with a VPC in another AWS account. The VPCs can be in different Regions (also known as an inter-Region VPC peering connection)

:p Why would you use VPC peering?
??x
You can use VPC peering to route traffic between two VPCs using private IPv4 addresses or IPv6 addresses. Instances in either VPC can communicate with each other as if they are within the same network. You can create a VPC peering connection between your own VPCs, or with a VPC in another AWS account. The VPCs can be in different Regions (also known as an inter-Region VPC peering connection).
x??

## AWS Associate Developer Certification

#### t2-micro
A startup with newly created AWS account is testing different EC2 instances. They have used Burstable performance instance - T2.micro - for 35 seconds and stopped the instance.

:p A startup with newly created AWS account is testing different EC2 instances. They have used Burstable performance instance - T2.micro - for 35 seconds and stopped the instance.  At the end of the month, what is the instance usage duration that the company is charged for?
??x
0 seconds
x??

#### domain-name-system-records
A Record (Address Record): An A record is a type of DNS (Domain Name System) record that maps a domain name to an IPv4 address. In other words, an A record is used to translate a human-readable domain name (such as www.example.com) into a machine-readable IP address (such as 192.0.2.1).

Alias Record (ANAME or ALIAS): Alias records are DNS records that allow a DNS query for a domain name to be redirected to another domain name. An alias record is similar to a CNAME record, but it allows the root domain to be used in the DNS query. Alias records are useful for pointing a domain name to a service that is hosted on another domain name, such as pointing a subdomain to a load balancer.

CNAME (Canonical Name) Record: A CNAME record is a type of DNS record that maps one domain name to another. This is useful for creating aliases for a domain or for pointing a subdomain to another domain. For example, if you have a subdomain called shop.example.com and you want it to point to another domain called store.example.net, you can create a CNAME record that maps shop.example.com to store.example.net.

PTR (Pointer) Record: A PTR record is a type of DNS record that maps an IP address to a domain name. PTR records are used in reverse DNS (rDNS) lookups to determine the domain name associated with a given IP address. This is useful for verifying the identity of a server or for troubleshooting network issues.

:p An application is hosted by a 3rd party and exposed at yourapp.3rdparty.com. You would like to have your users access your application using www.mydomain.com, which you own and manage under Route 53.  What Route 53 record should you create?
??x
A CNAME record

A CNAME record maps DNS queries for the name of the current record, such as acme.example.com, to another domain (example.com or example.net) or subdomain (acme.example.com or zenith.example.org).  CNAME records can be used to map one domain name to another. Although you should keep in mind that the DNS protocol does not allow you to create a CNAME record for the top node of a DNS namespace, also known as the zone apex. For example, if you register the DNS name example.com, the zone apex is example.com. You cannot create a CNAME record for example.com, but you can create CNAME records for www.example.com, newproduct.example.com, and so on.
x??

#### aws-blue-green-deployment
Blue-green deployment is a deployment strategy that involves creating two identical environments, one "blue" and one "green," where only one of the environments is live at a time.  In this deployment model, the current production environment, or "blue" environment, remains active and serving traffic while a new "green" environment is deployed with the latest code changes and tested to ensure it is functioning properly. Once the "green" environment has been verified and is ready to go live, traffic is routed to it while the "blue" environment is taken down and updated with any necessary changes.  The process can be repeated in the future, with the "blue" and "green" environments swapping roles. This deployment approach reduces the risk of downtime or errors during the deployment process by enabling the new version to be fully tested before it goes live, and allowing for quick rollbacks if issues arise. It also provides a way to achieve zero-downtime deployments, as the switch from "blue" to "green" can be done seamlessly without impacting end-users.

AWS CodeDeploy is designed to complement other AWS deployment services like AWS CodePipeline, AWS CodeBuild, and AWS Elastic Beanstalk, and offers unique advantages in certain scenarios. While AWS CodePipeline and AWS CodeBuild can be used to automate the build, test, and deployment process, they dont offer the same level of control and customization over the deployment process as AWS CodeDeploy. AWS CodeDeploy provides more granular control over the deployment process and can handle more complex deployment scenarios, such as blue-green deployments and canary releases.  AWS Elastic Beanstalk, on the other hand, is a fully managed platform that automatically handles the deployment and management of applications, but it provides less control over the deployment process and requires the use of specific platforms and configurations.  Overall, AWS CodeDeploy offers advantages in scenarios where a higher degree of control and customization over the deployment process is required, and where more complex deployment scenarios are needed, such as when deploying to on-premises servers, Lambda functions, or other compute services that are not supported by AWS Elastic Beanstalk.

:p A developer has been asked to create an application that can be deployed across a fleet of EC2 instances. The configuration must allow for full control over the deployment steps using the blue-green deployment.  
        Which service will help you achieve that?
??x
AWS CodeDeploy

AWS CodeDeploy is a deployment service that automates application deployments to Amazon EC2 instances, on-premises instances, or serverless Lambda functions. AWS CodeBuild is a fully managed continuous integration service that compiles source code, runs tests, and produces software packages that are ready to deploy.  The blue/green deployment type uses the blue/green deployment model controlled by CodeDeploy. This deployment type enables you to verify a new deployment of service before sending production traffic to it.
x??

#### mapping-responses
Use API Gateway Mapping Templates - In API Gateway, an API's method request can take a payload in a different format from the corresponding integration request payload, as required in the backend. Similarly, vice versa is also possible. API Gateway lets you use mapping templates to map the payload from a method request to the corresponding integration request and from an integration response to the corresponding method response.

:p You are a developer working on AWS Lambda functions that are invoked via REST API's using Amazon API Gateway. Currently, when a GET request is invoked by the consumer, the entire data-set returned by the Lambda function is visible.Your team lead asked you to format the data response.
        Which feature of the API Gateway can be used to solve this issue?
??x
Mapping Templates

Use API Gateway Mapping Templates - In API Gateway, an API's method request can take a payload in a different format from the corresponding integration request payload, as required in the backend. Similarly, vice versa is also possible. API Gateway lets you use mapping templates to map the payload from a method request to the corresponding integration request and from an integration response to the corresponding method response.
x??

#### upload-operation-without-mandated-encryption
SSE-S3 server-side encryption protects data at rest. Amazon S3 encrypts each object with a unique key. As an additional safeguard, it encrypts the key itself with a key that it rotates regularly. Amazon S3 server-side encryption uses one of the strongest block ciphers available to encrypt your data, 256-bit Advanced Encryption Standard (AES-256).  You can use the following bucket policy to deny permissions to upload an object unless the request includes the x-amz-server-side-encryption header to request server-side encryption using SSE-S3:

```json
{
 "Version": "2012-10-17",
 "Id": "PutObjectPolicy",
 "Statement": [
 {
 "Sid": "DenyIncorrectEncryptionHeader",
 "Effect": "Deny",
 "Principal": "",
 "Action": "s3:PutObject",
 "Resource": "arn:aws:s3:::DOC-EXAMPLE-BUCKET/",
 "Condition": {
 "StringNotEquals": {
 "s3:x-amz-server-side-encryption": "AES256"
 }
 }
 },
 {
 "Sid": "DenyUnencryptedObjectUploads",
 "Effect": "Deny",
 "Principal": "",
 "Action": "s3:PutObject",
 "Resource": "arn:aws:s3:::DOC-EXAMPLE-BUCKET/",
 "Condition": {
 "Null": {
 "s3:x-amz-server-side-encryption": "true"
 }
 }
 }
 ]
}
```

Incorrect options: Invoke the PutObject API operation and set the x-amz-server-side-encryption header as aws:kms. Use an S3 bucket policy to deny permission to upload an object unless the request has this header - As mentioned above, you need to use AES256 rather than aws:kms for the given use case. aws:kms is used when you want to use server-side encryption with AWS KMS (SSE-KMS).  Invoke the PutObject API operation and set the x-amz-server-side-encryption header as sse:s3. Use an S3 bucket policy to deny permission to upload an object unless the request has this header - This is a made-up option as the x-amz-server-side-encryption header has no such value as sse:s3.  Set the encryption key for SSE-S3 in the HTTP header of every request. Use an S3 bucket policy to deny permission to upload an object unless the request has this header - This option has been added as a distractor. For SSE-S3, Amazon S3 encrypts each object with a unique key. As an additional safeguard, it encrypts the key itself with a key that it rotates regularly. The encryption key for SSE-S3 encryption key cannot be accessed.

:p A developer has an application that stores data in an Amazon S3 bucket. The application uses an HTTP API to store and retrieve objects. When the PutObject API operation adds objects to the S3 bucket the developer must encrypt these objects at rest by using server-side encryption with Amazon S3-managed keys (SSE-S3).

         Which solution will guarantee that any upload request without the mandated encryption is not processed?
??x
Invoke the PutObject API operation and set the x-amz-server-side-encryption header as AES256. Use an S3 bucket policy to deny permission to upload an object unless the request has this header
x??




#### access-key-rotation
A method to increase security by changing the AWS access key ID. You can use this method to retire an old key at your discretion.

:p Define it | Use it on a sentence
??x

x??