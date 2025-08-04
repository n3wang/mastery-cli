


const aws_localstack = [
    {
        prompt: "How do you start localstack?",
        example: "localstack start -d",
    },
    {
        prompt: "Create a bucket named riskzone and display the list of buckets",
        example: "awslocal s3 mb s3://riskzone\n\
        awslocal s3api list-buckets",
    }
]

// My postgresql
// docker pull postgres
// docker run -d --name postgresCont -p 5432:5432 -e POSTGRES_PASSWORD=pass123 postgres
// docker exec -it postgresCont bash
const psql =[
    {
        prompt: "List all databases and all users",
        example: "\\l \n\
        \\du",

    },
    {
        prompt: "Create adatabase named riskzone and connect ot the database",
        example: "CREATE DATABASE riskzone;\n\
        \\c riskzone",
    },
    {
        prompt: "Create a user named no_one \n\
        Create a user named no_one with password pass123",
        example: "CREATE USER no_one;\n\
        CREATE usUSER no_two with login password `qwerty`;"
    },
    {
        prompt: "Remove Database named riskzone",
        example: "DROP DATABASE riskzone;"
    }
]

const aws_certification_cloud_practitioner = [
    {
        term: "Shared Responsibility Model",
        description: "The Customer is responsible for:\n\
        - Customer Data\n\
        - Platform, Applications, Identity & Access Management\n\
        - Operating System, Network & Firewall Configuration\n\
        - Client-Side Data Encryption\n\
        - Server-Side Data Encryption\n\
        - Networking Traffic Protection",
        prompt: "List 2 responsibilities of the customer in the Shared Responsibility Model\n\ And how would you ensure that?",
    },
    {
        term: "Cost Allocation Tags",
        description: "Cost allocation tags are key-value pairs that enable you to categorize your AWS costs. For example, you can define a tag key named Department and a tag value named Sales for all the resources in your sales department, and a tag key named Department and a tag value named Engineering for all the resources in your engineering department. You can then view the total costs for each department using the cost allocation tags.",
        prompt: "how can you use cost allocation tags to categorize your AWS costs?",
    },
    {
        term: "AWS Weel Architecture Framework | Design Principles",
        description: "Here the design principles for operational excellence in the cloud\n\
        Perform operations as code: In the cloud, you can apply the same engineering discipline that you use for application code to your entire environment. You can define your entire workload (applications, infrastructure, etc.) as code and update it with code. You can script your operations procedures and automate their process by launching them in response to events. By performing operations as code, you limit human error and create consistent responses to events.\n\
        \n\
        Make frequent, small, reversible changes: Design workloads that are scaleable and loosely coupled to permit components to be updated regularly. Automated deployment techniques together with smaller, incremental changes reduces the blast radius and allows for faster reversal when failures occur. This increases confidence to deliver beneficial changes to your workload while maintaining quality and adapting quickly to changes in market conditions.\n\
        \n\
        Refine operations procedures frequently: As you evolve your workloads, evolve your operations appropriately. As you use operations procedures, look for opportunities to improve them. Hold regular reviews and validate that all procedures are effective and that teams are familiar with them. Where gaps are identified, update procedures accordingly. Communicate procedural updates to all stakeholders and teams. Gamify your operations to share best practices and educate teams.\n\
        \n\
        Anticipate failure: Perform “pre-mortem” exercises to identify potential sources of failure so that they can be removed or mitigated. Test your failure scenarios and validate your understanding of their impact. Test your response procedures to ensure they are effective and that teams are familiar with their process. Set up regular game days to test workload and team responses to simulated events.\n\
        \n\
        Learn from all operational failures: Drive improvement through lessons learned from all operational events and failures. Share what is learned across teams and through the entire organization.\n\
        \n\
        Use managed services: Reduce operational burden by using AWS managed services where possible. Build operational procedures around interactions with those services.\n\
        \n\
        Implement observability for actionable insights: Gain a comprehensive understanding of workload behavior, performance, reliability, cost, and health. Establish key performance indicators (KPIs) and leverage observability telemetry to make informed decisions and take prompt action when business outcomes are at risk. Proactively improve performance, reliability, and cost based on actionable observability data. ",
        prompt: "Using of the design principles, Ideate a strategy that implments such design prinicple"
    },
    {
        term: "Grouping of AWS Services",
        description: "\n\
        AWS Trusted Advisor\n\
        AWS Partner Network\n\
        AWS Artifact\n",
        prompt: "Select one, indicate when you would use them",
        example: "\
        AWS Trusted Advisor - To check for recommendations such as saving money, security suggestions, cost optimization features\n\
        AWS Partner Network - If a company \n\
        AWS Artifact - AWS and ISV security and compliance reports (Including thridaprty, terminate reports, etc)"
    },
    {
        term: "AWS EC2 Pricing Models",
        description: "On-Demand Instances:      Business-critical events or workloads that require capacity assurance     Workloads that need to meet regulatory requirements for high availability     Disaster recovery  \n\
        Amazon EC2 Capacity blocks for ML: Training and fine-tuning ML models Running experiments and building prototypes Planning for future surges in demand for ML applications \n\
        Dedicated Hosts: Users looking to save money on licensing costs Workloads that need to run on dedicated physical servers Users looking to offload host maintenance onto AWS, while controlling their maintenance event schedules to suit their business’s operational needs",
        prompt: "Which pricing model would you use existing server bound licenses? \n\ How about for ML and machine learning worklouad ? How about for Capacity Reservation? during critical business workloads?",
        example: "Dedicated Hosts - Existing server-bound licenses\n\
        Amazon EC2 Capacity blocks for ML - ML and machine learning worklouad\n\
        On-Demand Instances - Critical business workloads"
    },
    {
        term: "Taking advantage of EBS",
        description: "“Amazon Elastic Block Store (EBS) is an easy to use, high-performance, block-storage service designed for use with Amazon Elastic Compute Cloud (EC2) for both throughput and transaction intensive workloads at any scale. A broad range of workloads, such as relational and non-relational databases, enterprise applications, containerized applications, big data analytics engines, file systems, and media workflows are widely deployed on Amazon EBS.\n\
        \n\
        You can choose from different volume types to balance optimal price and performance. You can achieve single-digit-millisecond latency for high-performance database workloads or gigabyte per second throughput for large, sequential workloads. You can change volume types, tune performance, or increase volume size without disrupting your critical applications, so you have cost-effective storage when you need it.”\n\
        \n\
        EBS volumes preserve their data through instance stops and terminations, can be easily backed up with EBS snapshots, can be removed from one instance and reattached to another, and support full-volume encryption",
        prompt: "Think of an usage purpose for EBS considering it's features",
        example: "You can use it for a self-hosted database that requires a nightly shutdown for maintenance and cost-saving purposes"
    },
    {
        term: "Regions and availability zones",
        description: "Region is a geographical area that has two or more Availability Zones. Each Region is completely independent.\n\
        Availability Zone (AZ) is an area with either one or more discrete Data Centres (building filled with servers), each with redundant power, networking, and connectivity, housed in separate facilities. If there are more than one data centre, they are counted as one AZ because they are located close together. Each Availability Zone is isolated, but the Availability Zones in a Region are connected through low-latency links.\n\
        Within the constructs of AWS, customers are encouraged to run their workloads in more than one Availability Zone. This ensures that customer applications can withstand even a complete Availability Zone failure - a very rare event in itself. This recommendation stands for real-time SIP infrastructure as well.\n\
        --NOTES--\n\
        --Edge Locations are endpoints used for caching content. They are located in most of the major cities around the world and are specifically used by CloudFront to distribute AWS content closer to end-users to reduce latency\n\
        to help lower latency and improve performance for users.",
        prompt: "taking that into account, if you were to develop a caching system for optimal loadin gtimes, how would you scale your application?",
        example: "Identify the region might play, and perhaps which ability zone to separate the group of users (that might play concurrently) and offer cachin in edge locations for faster downloads in the cities where you display ads."
    },
    {
        term: "Estimating costs",
        description: "B- Cost Allocation tags: To forecast your costs, use the AWS Cost Explorer. Use cost allocation tags to divide your resources into groups, and then estimate the costs for each group.\n\
        C - AWS Pricing Calculator To estimate a bill, use the AWS Pricing Calculator (formerly AWS Simply Monthly Calculator)\n\
        D - AWS Total Cost of Ownership (TCO) Calculator: to compare the cost of running your applications in an on-premises or colocation environment to AWS",
        prompt: "Select the tools for the following Manager asks you : 1- to separate and understand how much each project\n\ 2- To estimate the bill whether we use a new service \n\
        3- To check if to upgrade to aws",
        example: "B, C, D"
    },
    {
        term: "Consolidated Billing for AWS Organizations",
        description: "Consolidated billing has the following benefits:\n\
        One bill – You get one bill for multiple accounts.\n\
        Easy tracking – You can track the charges across multiple accounts and download the combined cost and usage data.\n\
        Combined usage – You can combine the usage across all accounts in the organization to share the volume pricing discounts, Reserved Instance discounts, and Savings Plans. This can result in a lower charge for your project, department, or company than with individual standalone accounts. For more information, see Volume discounts.\n\
        No extra fee – Consolidated billing is offered at no additional cost.",
        prompt: "Explain to your manager, what alternatives to do if we have multiple aws accounts",
        example: "It would be eaier, since we can consolidate"
    },
    {
        term: "Savings Reserved Instances",
        description: "Standard Reserved Instances provide you with a significant discount compared to On-Demand Instance pricing, and can be purchased for a 1-year or 3-year term. Customers have the flexibility to change the Availability Zone, the instance size, and networking type of their Standard Reserved Instances.\n\
        \n\
        Purchase Convertible Reserved Instances if you need additional flexibility, such as the ability to use different instance families, operating systems, or tenancies over the Reserved Instance term\n\
        Standard RIs: These provide the most significant discount (up to 72% off On-Demand) and are best suited for steady-state usage.\n\
        Convertible RIs: These provide a discount (up to 54% off On-Demand) and the capability to change the attributes of the RI as long as the exchange results in the creation of Reserved Instances of equal or greater value. Like Standard RIs, Convertible RIs are best suited for steady-state usage.\n\
        Scheduled RIs: These are available to launch within the time windows you reserve. This option allows you to match your capacity reservation to a predictable recurring schedule that only requires a fraction of a day, a week, or a month.",
        prompt: "If you already know that you will need certain instance for a time, then what should you do to save costs? And what if you know that might need to upgrade it? What if you only want to run during a fraction of scheduled time?",
        example: "Standard RI: are good if you are sure you dont need to change. Convertible RIS are best suited if you might want to upgrade the instane type. And Scheduled RI, so you an optimize over the specific running schedule."
    },
    {
        term: "Elastic and Cost of Total Ownership",
        description: "Cost of Total Ownership refers to the purchase price of an asset plus costs of operation over its life span\n\
        The Reduction of Elastic Cloud Computing (EC2) is that Reduces the cost by paying only what you use. \n\n\
        A core reason organizations adopt a cloud IT infrastructure is to save money. The traditional approach of analyzing Total Cost of Ownership no longer applies when you move to the cloud. Cloud services provide the opportunity for you to use only what you need and pay only for what you use. We refer to this new paradigm as the Total Cost of Operation. You can use Total Cost of Operation (TCO) analysis methodologies to compare the costs of owning a traditional data center with the costs of operating your environment using AWS Cloud services",
        prompt: "In what situations would you choose using Elastic Computing?",
        example: "When you want to reduce the cost of total ownership\n\ Instead of running your own machiens."
    },
    {
        term: "IAM Best Practices and AWS Best Practices",
        description: "\n\
        Design Best practices \n\
        Loose coupling - As application complexity increases, a desirable attribute of an IT system is that it can be broken into smaller, loosely coupled components. \n\
        This means that IT systems should be designed in a way that reduces interdependencies—a change or a failure in one component should not cascade to other components\n\
        IAM Best Practices - To help secure your AWS resources, follow these recommendations for the AWS Identity and Access Management (IAM) service:\n\
        IAM Best Practices\n\
        --Lock away your AWS account root user access keys\n\
        --Create individual IAM users\n\
        --Use groups to assign permissions to IAM users\n\
        --Grant least privilege\n\
        --Get started using permissions with AWS managed policies\n\
        --Use customer managed policies instead of inline policies\n\
        --Use access levels to review IAM permissions\n\
        --Configure a strong password policy for your users\n\
        --Enable MFA – These are not physical MFA tokens typically\n\
        --Use roles for applications that run on Amazon EC2 instances\n\
        --Use roles to delegate permissions\n\
        --Do not share access keys\n\
        --Rotate credentials regularly\n\
        --Remove unnecessary credentials\n\
        --Use policy conditions for extra security\n\
        --Monitor activity in your AWS account\n\
        ",
        prompt: "Design a workflow that follows the best practices for system design",
    },
    {
        term: "efs vs s3 vs ebs",
        description: "EBS: Elastic Block Storage: use case is more easily understood than the other two. It must be paired with an EC2 instance. So when you need a high-performance storage service for a single instance, use EBS.\n\
        EFS:Scaleable File Storage |  may be used whenever you need a shared file storage option for multiple EC2 instances with automatic, high-performance scaling. \n\
        This makes it a great candidate for file storage for content management systems; for lift and shift operations, as its autoscaling potential means you do not need to re-architect; for application development, as EFS’s shareable file storage is ideal for storing code and media files.\n\
        S3 is good at storing long-term data due to its archiving system. Things like reports and records, which may go unused for years, can be stored on S3 at a lower cost than the other two storage services discussed. \n\
        As already stated, S3 is also useful for storing data on which complex queries may be run. This makes it useful for data related to customer purchases, behaviour or profiles, because that data can be easily queried and fed into analytics tools.\n\
        This  capacity for interfacing with other tools also makes S3 great for back-up and restoration, as it can be paired with Amazon Glacier for even more secure backing up.\n\
        S3 also supports static websites, so if you need to host a static HTML page, S3 is a good choice.",
        prompt: "Design scenrios to use efs, s3 or ebs",
        example: "If I have an app on an ec2 that is the only one that needs to access the data, then I would use ebs. If I have multiple ec2 instances that need to access the same data, then I would use efs. If I have a static website at low cost, then I would use s3."
    },
    {
        term: "redshift",
        prompt: "What is aws redshift? When it is used for? Whats it's advantage?",
        example: "AWS Redshift, Redshift shines in its ability to handle huge volumes of data — capable of processing structured and unstructured data in the range of exabytes (1018 bytes). However, the service can also be used for large-scale data migrations. \n\
        Used when data to be analyzed is humongus. Petabyte Scales. To run Real time analytics,. Combination of data sources. Business Intelligence. and Log analysis.\n\
        Used for data encryption, familiar tools, intelligent potimization, automate repetitive tasks. Concurrent scales. "

    },
    {
        term: "Inherited Controls",
        description: "Inherited controls are controls that are inherited from other entities, such as the underlying infrastructure, operating system, or database layer. These controls are inherited by the customer and are not assessed by AWS. For example, AWS manages controls related to the physical and environmental security of the data centers, but the customer inherits those controls and is responsible for assessing them. Inherited controls are not included in the scope of the AWS SOC reports.",
        prompt: "If you were to create your own cloud service what else would you consider as an inherited control?",
        example: "The underlying infrastructure, operating system, or database instance."
    },
    {
        term: "Shared Controls",
        description: " Controls which apply to both the infrastructure layer and customer layers, but in completely separate contexts or perspectives. In a shared control, AWS provides the requirements for the infrastructure and the customer must provide their own control implementation within their use of AWS services. For example:\n\n\
        Patch Management – AWS is responsible for patching and fixing flaws within the infrastructure, but customers are responsible for patching their guest OS and applications.\n\
        Configuration Management – AWS maintains the configuration of its infrastructure devices, but a customer is responsible for configuring their own guest operating systems, databases, and applications.\n\
        Awareness & Training - AWS trains AWS employees, but a customer must train their own employees.",
        prompt: "Understanding your controls. What are your cofniguration and awraness responsabilities? if you use aws?",
        example: "To Configure your own guest operating systems, databases, and applications. And to train your own employees."
    },
    {
        term: "AWS IAM vs AWS Organizations",
        description: "AWS IAM is an AWS service that enables you to manage access to AWS services and resources securely. Using IAM, you can create and manage AWS users and groups, and use permissions to allow and deny their access to AWS resources.\n\
        \n\
        AWS Organizations is an account management service that enables you to consolidate multiple AWS accounts into an organization that you create and centrally manage. AWS Organizations includes account management and consolidated billing capabilities that enable you to better meet the budgetary, security, and compliance needs of your business. As an administrator of an organization, you can create accounts in your organization and invite existing accounts to join the organization. You can organize those accounts into groups and attach policy-based controls. You can apply policies across your organization to control access to AWS services, resources, and regions, and you can automate the creation of new accounts as your business needs grow.",
        prompt: "What would you need if you need to create an account? How about if you need to manage access to aws services?",
        example: "AWS IAM to manage access to aws services. AWS Organizations to manage accounts."
    },
    {
        term: "Changes in AWS regions",
        description: "Costs of the AWS Services can be different for each region because the cost, taxes, manpower, etc for the physical infrastructure and data centers are different from Region to Region.\n\
        --Latency depends on physical location. When your application is being accessed by your users, it should be blazing fast. So you need to identify the locations of your target audience and choose the region having a smaller latency for your customers.\n\
        --Data sovereignty compliance differs across the nations of the world. Considerations will need to be taken when using AWS in an unfamiliar location.\n\
        --Most of the AWS Services and features are Region dependent, and just a few ones are Region independent. Also, sometimes it happens that some services are not available in all the regions",
        prompt: "Before choosing to pay for a region, or use certain technology for a region, what should you consider?",
        example: "Costs, Latency, Data sovereignty compliance, AWS Services and features"
    },
    {
        term: "EC2 Regular, Spot, Optimized, Dedicated Instance, Dedicated Host",
        description: "\
        Regular Instances: These are the normal instances that you launch in AWS. They are billed at the On-Demand rate. are shared between multiple customers\n\n\
        Spot Instance: Save money  (50-90%)by purchasing the hourly compute power of someone elses unused ec2 instance. Useful for tunning tasks that aren't critical. Fault-tolerant workloads. Such as: batch jobs, compute-intensive analysis, temporary autoo-scaling to meet a short-term spike, or another similar usage\n\n\
        Optimized EC2 Instance: Designed to deliver an optimized service level for a specific area. (Storage, memory, compute. Standard network bandwidth ,dedicated cpus. \n\
        Dedicated Instance: VPC isntances that are blocked for use by a single customer\n\
        Dedicated Host: To enable isolation, give visiibility of the physical host. This is required if hte framework and libraries requires or restricts into a specific server \n\
        ",
        prompt: "If you were to use ec2, what would you use for a fault-tolerant workload? What if you need to use a specific framework and libraries that are licensed to a single server?",
        example: "Spot Instance, Dedicated Host"
    },
    {
        term: "Which of the following AWS Services can be used to serve large amounts of online video content?",
        description: "Amazon CloudFront is a fast content delivery network (CDN) service that securely delivers data, videos, applications, and APIs to customers globally with low latency, high transfer speeds, all within a developer-friendly environment. CloudFront is integrated with AWS – both physical locations that are directly connected to the AWS global infrastructure, as well as other AWS services. CloudFront works seamlessly with services including AWS Shield for DDoS mitigation, Amazon S3, Elastic Load Balancing or Amazon EC2 as origins for your applications, and Lambda@Edge to run custom code closer to customers’ users and to customize the user experience. Lastly, if you use AWS origins such as Amazon S3, Amazon EC2 or Elastic Load Balancing, you don’t pay for any data transferred between these services and CloudFront.",
        prompt: "Which of the following AWS Services can be used to serve large amounts of online video content?",
        example: "Amazon CloudFront"
    },
    {
        term: "cloud-native, Partner network, hybrid architecture and on-premises",
        description: "Cloud-native architecture is an approach to building and running applications that exploits the advantages of the cloud computing delivery model. Cloud-native is about how applications are created and deployed, not where. While today public cloud impacts the thinking about best practices for cloud-native architectures, cloud-native is not a public cloud-only phenomenon. It is entirely possible to adopt cloud-native practices and build cloud-native applications on-premises.\n\
        \n\
        AWS Partner Network (APN) is the global partner program for technology and consulting businesses who leverage Amazon Web Services to build solutions and services for customers. The APN helps companies build, market, and sell their AWS offerings by providing valuable business, technical, and marketing support.\n\
        \n\
        Hybrid architecture is a computing environment that uses a mix of on-premises, private cloud and third-party, public cloud services with orchestration between the two platforms. By allowing workloads to move between private and public clouds as computing needs and costs change, hybrid cloud gives businesses greater flexibility and more data deployment options.\n\
        \n\
        On-premises (sometimes abbreviated as \"on-prem\") is a term meaning \"on-site\". It refers to the location of hardware or software within the confines of an enterprise rather than at a remote facility such as a server farm or cloud. The term is sometimes used to contrast with a similar term: off-premises, which refers to assets that are located outside of the physical confines of an enterprise's property. The term is also used in the phrase \"on-premises software\", which is a counterpart of \"software as a service\" (SaaS).",
        prompt: "What is the difference between cloud-native, Partner network, hybrid architecture and on-premises?",
        example: "Cloud-native is about how applications are created and deployed, not where. refers to an application that was designed to reside in the cloud from the start. Cloud native involves cloud technologies like microservices, container orchestrators, and auto scaling.\n\
        AWS Partner Network (APN) is the global partner program for technology and consulting businesses who leverage Amazon Web Services to build solutions and services for customers. \n\
        Hybrid architecture is a computing environment that uses a mix of on-premises, private cloud and third-party, public cloud services with orchestration between the two platforms. \n\
        On-premises (sometimes abbreviated as \"on-prem\") is a term meaning \"on-site\". It refers to the location of hardware or software within the confines of an enterprise rather than at a remote facility such as a server farm or cloud."
    },
    {
        term: "AWS IAM Users, Groups, Policies and Roles",
        description: "    IAM Users: An IAM user is a unique identity within your AWS account that can be granted permissions to access resources and perform actions. Users can be created within your AWS account and can be assigned a unique set of credentials, such as an access key and secret key, which are used to authenticate their access to AWS resources.\n\n\
        IAM Groups: An IAM group is a collection of IAM users that you can manage as a single entity. Groups allow you to grant permissions to multiple users at once, and make it easier to manage permissions as your user base grows. For example, you could create a group for all users in your development team, and grant them permissions to access the necessary resources for their work.\n\n\
        IAM Policies: An IAM policy is a document that defines the permissions that can be granted to an IAM user, group, or role. Policies are written in JSON and can be used to grant permissions to access specific AWS services, resources, or actions. For example, you could create a policy that allows a user to read and write to a specific S3 bucket.\n\n\
        IAM Roles: An IAM role is similar to a user or group, but is intended to be assumed by an AWS service or application. Instead of being associated with a set of credentials, roles are assumed by a service, such as an EC2 instance, and are granted permissions to access resources. Roles can also be assumed by external identity providers, such as your organization's identity provider (IdP).",
        prompt: "You want to allow a multiple devs to login, and create some type of roles for machiens to login on with specific permissions. What would you use?",
        example: "IAM Users are required to be used for devs to login You can assign them under IAM Groups whcih share the same IAM Policies. IAM Roles are used for machines to login with specific permissions."

    },
    {
        term: "VPC Networks",
        description: "A virtual private cloud (VPC) is a virtual network dedicated to your AWS account. It is logically isolated from other virtual networks in the AWS Cloud. You can launch your AWS resources, such as Amazon EC2 instances, into your VPC. You can specify an IP address range for the VPC, add subnets, associate security groups, and configure route tables.\n\n\
        AWS Virtual Private Network (VPN) solutions establish secure connections via the public internet between your on-premises networks, remote offices, client devices, and the AWS global network\n\
        Reduced Latency: VPC networks often provide more direct network paths between services and resources, reducing the number of hops data must traverse compared to public internet routing. This can significantly reduce latency, making data exchange faster.\n\
        Higher Bandwidth: Within a VPC, the available bandwidth is typically higher than that available over the public internet. This is because cloud providers allocate more network resources within their infrastructure to support internal traffic, allowing for higher throughput.\n\
        Network Isolation: Traffic within a VPC does not compete with public internet traffic, which can be subject to congestion and variable performance. This isolation helps ensure consistent network performance, making data exchanges within a VPC more reliable\n\n\
        Optimized Routing: Cloud providers optimize the internal routing of traffic within their networks. When you connect services over a VPC, data packets travel through optimized paths, improving efficiency and reducing transmission times.\n\
        Enhanced Security: While not directly related to speed, the enhanced security of VPC connections can indirectly contribute to faster data exchange. Secure connections (like those in a VPC) reduce the risk of data interception and tampering, which can cause delays and require data to be resent. By providing a more secure environment, VPCs help ensure that data exchanges are not only faster but also more reliable.",
        prompt: "Deisgn a scenario where you would use VPC networks",
        example: "You can use VPC networks to establish secure connections via the public internet between your on-premises networks, remote offices, client devices, and the AWS global network. You can also use VPC networks to reduce latency, increase bandwidth, isolate network traffic, optimize routing, and enhance security."
    },
    {
        term: "VPN: Virtual Private Network",
        description: "A virtual private network (VPN) uses encryption to create a private network over the top of a public network. VPN traffic passes through publicly shared Internet infrastructure – routers, switches, etc. – but the traffic is scrambled and not visible to anyone.",
        prompt: "What is VPN In aws, and when would you use it?",
        example: "A VPC will have a dedicated subnet and VLAN that are only accessible by the VPC customer. This prevents anyone else within the public cloud from accessing computing resources within the VPC – effectively placing the 'Reserved' sign on the table. The VPC customer connects via VPN to their VPC, so that data passing into and out of the VPC is not visible to other public cloud users.\n\n\
        Example usages:\n\
        Access a VPC.\n\
        Access a peered VPC.\n\
        Access an on-premises network.\n\
        Access the internet.\n\
        Client-to-client access.\n\
        Restrict access to your network."
    },
    {
        term: "VLAN: Virtual Local Area Network",
        description: "A LAN is a local area network, or a group of computing devices that are all connected to each other without the use of the Internet. A VLAN is a virtual LAN. Like a subnet, a VLAN is a way of partitioning a network, but the partitioning takes place at a different layer within the OSI model (layer 2 instead of layer 3).",
        prompt: "What is VLAN In aws, and when would you use it?",

    },
    {
        term: "AWS Lambda",
        description: "AWS Lambda is a compute service that lets you run code without provisioning or managing servers. Lambda runs your code only when needed and scales automatically, from a few requests per day to thousands per second. You pay only for the compute time that you consume—there is no charge when your code is not running. With Lambda, you can run code for virtually any type of application or backend service, all with zero administration. Lambda runs your code on a high-availability compute infrastructure and performs all of the administration of the compute resources, including server and operating system maintenance, capacity provisioning and automatic scaling, code monitoring and logging.",
        prompt: "What is AWS Lambda? When would you use it?",
        example: "Processing uploaded S3 objects.\n\
        Document editing and conversion in a hurry.\n\
        Cleaning up the backend.\n\
        Creating and operating serverless websites.\n\
        Real-time processing of bulk data.\n\
        Rendering pages in real-time.\n\
        Automated backups.\n\
        Email Campaigns using AWS Lambda & SES."
    },
    {
        term: "AWS Personal Health Dashboard",
        description: "The AWS Personal Health Dashboard provides alerts and remediation guidance when AWS is experiencing events that may impact you. The dashboard displays relevant and timely information to help you manage events in progress, and provides proactive notification to help you plan for scheduled activities. The dashboard also provides relevant support contact information to help you get assistance in resolving issues.\n\
        It is available to all AWS customers at no additional cost.\n\
        It provides a personalized view of the health of the specific services that are powering your workloads, not just the overall status of AWS services.\n\
        It will proactively notify you through alerts if AWS experiences any events that may affect your resources, helping provide quick visibility and guidance.\n\
        Customers with Business or Enterprise support plans also have API access to the events on the Personal Health Dashboard to integrate with their own systems.",
        prompt: "Name a sample alert that you would receive from the AWS Personal Health Dashboard",
        example: "One sample alert you may receive from the AWS Personal Health Dashboard is an open event. The AWS Personal Health Dashboard monitors the health of AWS services powering your workloads and applications. It will proactively notify you if AWS experiences any events that could potentially affect your resources. Some examples of open events you could be alerted about are performance issues or availability problems with services like EC2, RDS, S3 etc. The alert helps provide quick visibility into any ongoing issues and guidance to minimize impact on your applications. You can click on the event from the notification bell icon in the AWS console to get more details on the issue from the AWS Health Dashboard."        
    },
    {
        term: "Trusted Advisor",
        description: "AWS Trusted Advisor provides recommendations to help optimize your AWS environment. It continuously monitors your AWS resources and accounts for various best practice checks across categories like cost optimization, security, performance and fault tolerance. Some key use cases of Trusted Advisor include:\n\
        Cost Optimization - It identifies unused or underutilized resources that can help reduce costs like unused EC2 instances, EBS volumes etc.\n\
        Security - It checks your environment against security best practices and points out any gaps or issues that need attention.\n\
        Performance - The performance checks help optimize configuration of resources like databases, caching etc to ensure optimal performance.\n\
        Fault Tolerance - It recommends ways to improve fault tolerance of your applications and workloads running on AWS\n\
        Service Limits - It provides visibility into your service limits and usage to help you request limit increases as needed. e.g. EC2 instance limits - It notifies you if you are approaching the maximum number of On-Demand Instances or Spot Instances allowed in each region.\n\
        Operational Excellence - It provides recommendations to improve operational excellence of your environment. - The goal is to efficiently operate infrastructure and applications while meeting business requirements through standardized, automated processes and continuous monitoring and learning. e.g. ",
        prompt: "What are the key use cases of Trusted Advisor?",
        example: "Cost Optimization, Security, Performance, Fault Tolerance, Service Limits, Operational Excellence"
     },
    {
        term: "AWS Config",
        description: "“AWS Config is a service that enables you to assess, audit, and evaluate the configurations of your AWS resources.\n\
        Config continuously monitors and records your AWS resource configurations and allows you to automate the evaluation of recorded configurations\n\
        against desired configurations. With Config, you can review changes in configurations and relationships between AWS resources, dive into detailed \n\
        resource configuration histories, and determine your overall compliance against the configurations specified in your internal guidelines.\n\
        This enables you to simplify compliance auditing, security analysis, change management, and operational troubleshooting.\n\n\
        It provides a detailed inventory of all your AWS resources along with their configurations. This includes information like what each resource is configured with, how resources are related to each other through dependencies.\n\n\
        It maintains a configuration history of your AWS resources so you can see how the configurations and relationships change over time. This helps troubleshoot issues by accessing last known good configurations.\n\n\
        It supports configuration change notifications so you are notified when a resource is created, updated or deleted. This helps with audit logging and security monitoring.\n\n\
        You can develop AWS Config rules to specify desired configurations for resources. It then evaluates your resources against these rules and notifies you of any deviations or drifts from desired state.\n\n\
        The configuration history and change notifications provided by AWS Config can help with auditing by relating configuration changes to AWS CloudTrail events. This gives full visibility into who made changes and their impact.\n\n\
        It helps improve overall security and governance of your AWS infrastructure by continuously monitoring configurations and detecting vulnerabilities or compliance violations.",
        prompt: "Further explain, how would you use any of the features of AWS Config in your organization?",
    },
    {
        term: "AWS CloudTrail vs Cloud Watch",
        description: "\n\
        CloudTrail is an auditing service that records API calls and events within your AWS account. This includes actions taken through the AWS Management Console, command line tools, and SDKs. CloudTrail provides a history of these actions and events for auditing, tracking changes, and troubleshooting issues.\n\n\
        CloudWatch is a monitoring service that collects metrics and logs from AWS resources like EC2 instances, databases etc and also 3rd party applications. It provides visibility into resource utilization, application performance and overall operational health of resources. Some key capabilities include metrics and alarms to create custom metrics, set threshold",
        prompt: "Where do you need to send logs to in order to analyze cloud trial logs?",
        example: "To analyze CloudTrail logs, you need to send them to CloudWatch Logs. This allows you to establish monitoring and alerting based on API activity recorded in CloudTrail logs. For example, alarms on specific API calls that create or delete security groups or network configurations."

    },
    {
        term: "What was AWS OpsWorks?",
        description: "AWS OpsWorks is a configuration management service that helps you build and operate highly dynamic applications, and propagate changes instantly.",
        prompt: "wHy is aws transitioning away from OpsWork?",
        example: "AWS OpsWorks is transitioning away from the OpsWorks Stacks service to focus on AWS OpsWorks for Chef Automate and AWS OpsWorks for Puppet Enterprise.\n\n\
        OpsWorks Stacks reached its end of life date in December 2021. AWS recommends customers migrate any existing OpsWorks Stacks instances to other AWS services like EC2, ECS, or Lambda.\n\
        Some key reasons for the transition include:\n\
        OpsWorks for Chef Automate and OpsWorks for Puppet Enterprise provide configuration management capabilities directly integrated with the Chef Automate and Puppet Enterprise products. This allows customers to leverage the full feature set of these configuration management tools.\n\
        AWS aims to focus on configuration management services that are tightly integrated with specific configuration management vendors like Chef and Puppet, rather than maintaining a custom configuration management layer like OpsWorks Stacks.\n\
        Migrating to other AWS services gives customers more flexibility and access to newer features compared to the older OpsWorks Stacks product. Services like EC2, ECS and Lambda are more actively developed by AWS.\n\
        "
    },
    {
        term: "AWS Support Plans | Case Serverity/Response Times",
        description: "Developer: General guidance: <24 hours. System impaired: <12 hours.\n\
        Business: General guidance: <24 hours. System impaired: <12 hours. Production System Impaired: <4hours, Production System Down: <1Hour\n\
        Enterprise On-Ramp: General guidance: <24 hours. System impaired: <12 hours. Production System Impaired: <1 hour, Production System Down: <30 minutes\n\
        Enterprise: General guidance: <24 hours. System impaired: <12 hours. Production System Impaired: <1 hour, Production System Down: <15 minutes",
        prompt: "What are System Down impairment repsponse for 15 min, 30 min and 1 hour plans? (name htem in order)",
        example: "Enterprise, Enterprise On-Ramp, Business"
    },
    {
        term: "AWS Support, Starting from... ",
        description: "\n\
        Full set of AWS Trusted Advisor checks starts from Business\n\
        Programmatic Case Management starts from Business\n\
        Third Party Software Support starts from Business\n\
        \n\
        Technical Account Management starts from enterpreise On-Ramp\n\
        Billing Assistance starts from enterpreise On-Ramp\n\
        AWS Managed Services starts from enterpreise On-Ramp\n\
        AWS re:Post starts from enterpreise On-Ramp\n\
        \n\
        Incident Detection and response starts from Enterprise: Enhanced monitoring.",
        prompt: "When does the full set of AWS Trusted Advisor checks start?",
        example: "Business"
    },
    
    {
        term: "AWS Support, Starting from... ",
        description: "\n\
        Full set of AWS Trusted Advisor checks starts from Business\n\
        Programmatic Case Management starts from Business\n\
        Third Party Software Support starts from Business\n\
        \n\
        Technical Account Management starts from enterpreise On-Ramp\n\
        Billing Assistance starts from enterpreise On-Ramp\n\
        AWS Managed Services starts from enterpreise On-Ramp\n\
        AWS re:Post starts from enterpreise On-Ramp\n\
        \n\
        Incident Detection and response starts from Enterprise: Enhanced monitoring.",
        prompt: "When does the Programmatic Case Management, Third Party Software Support start? and when would you use each of them for?",
        example: "Business"
    },
    {
        term: "AWS Support, Starting from... ",
        description: "\n\
        Full set of AWS Trusted Advisor checks starts from Business\n\
        Programmatic Case Management starts from Business\n\
        Third Party Software Support starts from Business\n\
        \n\
        Technical Account Management starts from enterpreise On-Ramp\n\
        Billing Assistance starts from enterpreise On-Ramp\n\
        AWS Managed Services starts from enterpreise On-Ramp\n\
        AWS re:Post starts from enterpreise On-Ramp\n\
        \n\
        Incident Detection and response starts from Enterprise: Enhanced monitoring.",
        prompt: "When does the Technical Account Management, Billing Assistance, AWS Managed Services, AWS re:Post start and why would you use each of them for?",
        example: "Enterprise On-Ramp"
    },
    {
        term: "AWS Support, Starting from... ",
        description: "\n\
        Full set of AWS Trusted Advisor checks starts from Business\n\
        Programmatic Case Management starts from Business\n\
        Third Party Software Support starts from Business\n\
        \n\
        Technical Account Management starts from enterpreise On-Ramp\n\
        Billing Assistance starts from enterpreise On-Ramp\n\
        AWS Managed Services starts from enterpreise On-Ramp\n\
        AWS re:Post starts from enterpreise On-Ramp\n\
        \n\
        Incident Detection and response starts from Enterprise: Enhanced monitoring.",
        prompt: "When does the Incident Detection and response (enhanced monitoring) start and why would you use each of them for?",
        example: "Enterprise"
    },
    {
        term: "Amazon VPC",
        description: "A virtual private cloud (VPC) is a virtual network dedicated to your AWS account. It is logically isolated from other virtual networks in the AWS Cloud. You can specify an IP address range for the VPC, add subnets, add gateways, and associate security groups.",
        prompt: "Why would you use Amazon VPC?",
        example: "You can use Amazon VPC to launch AWS resources into a virtual network that you've defined. This virtual network closely resembles a traditional network that you'd operate in your own data center, with the benefits of using the scalable infrastructure of AWS."
    },
    {
        term: "Amazon Subnet",
        description: "A subnet is a range of IP addresses in your VPC. You launch AWS resources, such as Amazon EC2 instances, into your subnets. You can connect a subnet to the internet, other VPCs, and your own data centers, and route traffic to and from your subnets using route tables.",
        prompt: "Why would you use Amazon Subnet?",
        example: "You can use Amazon Subnet to divide a VPC into multiple networks. This allows you to have multiple layers of security, and to route traffic between the subnets."
    },
    {
        term: "Amazon Route Tables",
        description: "A route table contains a set of rules, called routes, that are used to determine where network traffic from your VPC is directed. You can explicitly associate a subnet with a particular route table. Otherwise, the subnet is implicitly associated with the main route table.\n\
        Each route in a route table specifies the range of IP addresses where you want the traffic to go (the destination) and the gateway, network interface, or connection through which to send the traffic (the target).",
        prompt: "Why would you use Amazon Route Tables?",
        example: "You can use Amazon Route Tables to determine where network traffic from your VPC is directed. You can explicitly associate a subnet with a particular route table. Otherwise, the subnet is implicitly associated with the main route table."

    },
    {
        term: "AWS Private Global Network",
        description: "AWS provides a high-performance, and low-latency private global network that delivers a secure cloud computing environment to support your networking needs. AWS Regions are connected to multiple Internet Service Providers (ISPs) as well as to a private global network backbone, which provides improved network performance for cross-Region traffic sent by customers.",
        prompt: "Why would you use AWS Private Global Network?",
        example: "You can use AWS Private Global Network to deliver a secure cloud computing environment to support your networking needs. AWS Regions are connected to multiple Internet Service Providers (ISPs) as well as to a private global network backbone, which provides improved network performance for cross-Region traffic sent by customers."

    },
    {
        term: "What is VPC peering?",
        description: "A VPC peering connection is a networking connection between two VPCs that enables you to route traffic between them using private IPv4 addresses or IPv6 addresses. Instances in either VPC can communicate with each other as if they are within the same network. You can create a VPC peering connection between your own VPCs, or with a VPC in another AWS account. The VPCs can be in different Regions (also known as an inter-Region VPC peering connection)",
        prompt: "Why would you use VPC peering?",
        example: "You can use VPC peering to route traffic between two VPCs using private IPv4 addresses or IPv6 addresses. Instances in either VPC can communicate with each other as if they are within the same network. You can create a VPC peering connection between your own VPCs, or with a VPC in another AWS account. The VPCs can be in different Regions (also known as an inter-Region VPC peering connection)."
    },

]


const aws_certification_associate_developer = [
    {
        prompt: "A startup with newly created AWS account is testing different EC2 instances. They have used Burstable performance instance - T2.micro - for 35 seconds and stopped the instance.  At the end of the month, what is the instance usage duration that the company is charged for?",
        example: "0 seconds",
        term: "T2.micro",
    },
    {
        term: "domain name system records",
        prompt: "An application is hosted by a 3rd party and exposed at yourapp.3rdparty.com. You would like to have your users access your application using www.mydomain.com, which you own and manage under Route 53.  What Route 53 record should you create?",
        example: "A CNAME record\n\n\
        A CNAME record maps DNS queries for the name of the current record, such as acme.example.com, to another domain (example.com or example.net) or subdomain (acme.example.com or zenith.example.org).  CNAME records can be used to map one domain name to another. Although you should keep in mind that the DNS protocol does not allow you to create a CNAME record for the top node of a DNS namespace, also known as the zone apex. For example, if you register the DNS name example.com, the zone apex is example.com. You cannot create a CNAME record for example.com, but you can create CNAME records for www.example.com, newproduct.example.com, and so on.",
        description: ":m\n\
        `A Record (Address Record)`:  An A record is a type of DNS (Domain Name System) record that maps a domain name to an IPv4 address. In other words, an A record is used to `translate a human-readable domain name` (such as www.example.com) into a `machine-readable IP address` (such as 192.0.2.1).  \n\n\
        `Alias Record (ANAME or ALIAS)`:  Alias records are DNS records that allow a DNS query for a domain name to be redirected to another domain name. \n\
        `An alias record` is similar to a CNAME record, but it allows the `root domain` to be used in the `DNS query`. Alias records are useful for `pointing a domain name to a service that is hosted on another domain name`, such as pointing a `subdomain to a load balancer`.  \n\n\
        `CNAME (Canonical Name) Record`:  A CNAME record is a type of DNS record that maps one domain name to another. This is useful for creating aliases for a `domain or for pointing a subdomain to another domain`. For example, if you have a subdomain called shop.example.com and you want it to point to another domain called store.example.net, you can create a CNAME record that maps shop.example.com to store.example.net.  \n\n\
        `PTR (Pointer) Record`:  A PTR record is a type of DNS record that maps an `IP address to a domain name`. PTR records are used in reverse DNS (rDNS) lookups to determine the domain name associated with a given IP address. This is useful for `verifying the identity` of a server or for `troubleshooting network issues`."
    },
    {
        term: "AWS blue  green deployment",
        prompt: "A developer has been asked to create an application that can be deployed across a fleet of EC2 instances. The configuration must allow for full control over the deployment steps using the blue-green deployment.  \n\
        Which service will help you achieve that?",
        example: ":m AWS CodeDeploy\n\n\
        AWS CodeDeploy is a deployment service that automates application deployments to Amazon EC2 instances, on-premises instances, or serverless Lambda functions. AWS CodeBuild is a fully managed continuous integration service that compiles source code, \
        runs tests, and produces software packages that are ready to deploy.  The blue/green deployment type uses the blue/green deployment model controlled by CodeDeploy. This deployment type enables you to verify a new deployment of service before sending production traffic to it.",
        description: 'Blue-green deployment is a deployment strategy that involves creating two identical environments, one "blue" and one "green," where only one of the environments is live at a time.  In this deployment model, the current production environment, or "blue" environment, remains active and serving traffic while a new "green" environment is deployed with the latest code changes and tested to ensure it is functioning properly. Once the "green" environment has been verified and is ready to go live, traffic is routed to it `while the "blue" environment is taken down and updated with any necessary change`s.  The process can be repeated in the future, with the "blue" and "green" environments swapping roles. This deployment approach reduces the risk of downtime or errors during the deployment process by enabling the new version to be fully tested before it goes live, and allowing for quick rollbacks if issues arise.\
         It also provides `a way to achieve zero-downtime deployments`, as the switch from "blue" to "green" can be done seamlessly without impacting end-users.\n\n\
        `AWS CodeDeploy` is designed to complement other AWS deployment services like AWS CodePipeline, AWS CodeBuild, and AWS Elastic Beanstalk, and offers unique advantages in certain scenarios. \n\
         While `AWS CodePipeline and AWS CodeBuild` can be used to automate the build, test, and deployment process, they `dont offer the same level of control and customizatio`n over the deployment process as AWS CodeDeploy. \n\n\
         AWS CodeDeploy provides more `granular control over the deployment process and can handle more complex deployment scenarios`, such as blue-green deployments and canary releases.  \n\n\
         `AWS Elastic Beanstalk`, on the other hand, is a fully managed platform that automatically handles the deployment and management of applications, but it provides less control over the deployment process and requires the use of specific platforms and configurations.  \n\
         Overall, AWS CodeDeploy offers advantages in scenarios where a higher degree of control and customization over the deployment process is required, and where more complex deployment scenarios are needed, such as when deploying to on-premises servers, Lambda functions, or other compute services that are not supported by AWS Elastic Beanstalk.'
    },
    {
        term: "mapping reponses",
        prompt: "You are a developer working on AWS Lambda functions that are invoked via REST API's using Amazon API Gateway. \
        Currently, when a GET request is invoked by the consumer, the entire data-set returned by the Lambda function is visible.\
        Your team lead asked you to format the data response.\n\
        Which feature of the API Gateway can be used to solve this issue?",
        example: "Mapping Templates\n\n\
        Use API Gateway Mapping Templates - In API Gateway, an API's method request can take a payload in a different format from the corresponding integration request payload, as required in the backend. Similarly, vice versa is also possible. API Gateway lets you use mapping templates to map the payload from a method request to the corresponding integration request and from an integration response to the corresponding method response.",
    },
    {
        term: "upload-operation-without-mandated-encryption",
        prompt: "A developer has an application that stores data in an Amazon S3 bucket. The application uses an HTTP API to store and retrieve objects.\
         When the PutObject API operation adds objects to the S3 bucket the developer must encrypt these objects at rest by using server-side encryption with \
         Amazon S3-managed keys (SSE-S3).\n\n\
         Which solution will guarantee that any upload request without the mandated encryption is not processed?",
        example: "Invoke the PutObject API operation and set the x-amz-server-side-encryption header as AES256. Use an S3 bucket policy to deny permission to upload an object unless the request has this header",
        description: ':m SSE-S3 server-side encryption protects data at rest. Amazon S3 encrypts each object with a unique key. As an additional safeguard, it encrypts the key itself with a key that it rotates regularly. Amazon S3 server-side encryption uses one of the strongest block ciphers available to encrypt your data, 256-bit Advanced Encryption Standard (AES-256).  You can use the following bucket policy to deny permissions to upload an object unless the request includes the x-amz-server-side-encryption header to request server-side encryption using SSE-S3:\n\n\
        ```json\n\
        {\n "Version": "2012-10-17",\n "Id": "PutObjectPolicy",\n "Statement": [\n {\n "Sid": "DenyIncorrectEncryptionHeader",\n "Effect": "Deny",\n "Principal": "",\n "Action": "s3:PutObject",\n "Resource": "arn:aws:s3:::DOC-EXAMPLE-BUCKET/",\n "Condition": {\n "StringNotEquals": {\n "s3:x-amz-server-side-encryption": "AES256"\n }\n }\n },\n {\n "Sid": "DenyUnencryptedObjectUploads",\n "Effect": "Deny",\n "Principal": "",\n "Action": "s3:PutObject",\n "Resource": "arn:aws:s3:::DOC-EXAMPLE-BUCKET/",\n "Condition": {\n "Null": {\n "s3:x-amz-server-side-encryption": "true"\n }\n }\n }\n ]\n}\n\
        ```\n\n\
        Incorrect options:  Invoke the PutObject API operation and set the x-amz-server-side-encryption header as aws:kms. Use an S3 bucket policy to deny permission to upload an object unless the request has this header - As mentioned above, you need to use AES256 rather than aws:kms for the given use case. aws:kms is used when you want to use server-side encryption with AWS KMS (SSE-KMS).  Invoke the PutObject API operation and set the x-amz-server-side-encryption header as sse:s3. Use an S3 bucket policy to deny permission to upload an object unless the request has this header - This is a made-up option as the x-amz-server-side-encryption header has no such value as sse:s3.  Set the encryption key for SSE-S3 in the HTTP header of every request. Use an S3 bucket policy to deny permission to upload an object unless the request has this header - This option has been added as a distractor. For SSE-S3, Amazon S3 encrypts each object with a unique key. As an additional safeguard, it encrypts the key itself with a key that it rotates regularly. The encryption key for SSE-S3 encryption key cannot be accessed.'
    },
    {
        prompt: "You have created an Elastic Load Balancer that has marked all the EC2 instances in the target group as unhealthy. Surprisingly, when you enter the IP address of the EC2 instances in your web browser, you can access your website.  What could be the reason your instances are being marked as unhealthy? (Select two)",
        example: "The security group of the EC2 instance does not allow for traffic from the security group of the Application Load Balancer  The route for the health check is misconfigured",
        description: "You must ensure that your load balancer can communicate with registered targets on both the listener port and the health check port. Whenever you add a listener to your load balancer or update the health check port for a target group used by the load balancer to route requests, you must verify that the security groups associated with the load balancer allow traffic on the new port in both directions.",
        term: "security group nad health check"
    },
    {
        prompt: "After a test deployment in ElasticBeanstalk environment, a developer noticed that all accumulated Amazon EC2 burst balances were lost. Which of the following options can lead to this behavior?  a) The deployment was either run with immutable updates or in traffic splitting mode b) The deployment was run as a Rolling deployment, resulting in the resetting of EC2 burst balances c) When a canary deployment fails, it resets the EC2 burst balances to 0 d) The deployment was run as a All-at-once deployment, flushing all the accumulated EC2 burst balances",
        example: "The deployment was either run with immutable updates or in traffic splitting mode",
        description: "EC2 burst balance is a feature of Amazon Elastic Compute Cloud (EC2) instances that allows instances to temporarily use additional CPU credits beyond their baseline performance level.\n\
        - Immutable deployments perform an immutable update to launch a full set of new instances running the new version of the application in a separate Auto Scaling group, alongside the instances running the old version. Immutable deployments can prevent issues caused by partially completed rolling deployments.  Traffic-splitting deployments let you perform canary testing as part of your application deployment. In a traffic-splitting deployment, Elastic Beanstalk launches a full set of new instances just like during an immutable deployment. It then forwards a specified percentage of incoming client traffic to the new application version for a specified evaluation period.  Some policies replace all instances during the deployment or update. This causes all accumulated Amazon EC2 burst balances to be lost. It happens in the following cases:      Managed platform updates with instance replacement enabled     Immutable updates     Deployments with immutable updates or traffic splitting enabled  Incorrect options:  The deployment was run as a Rolling deployment, resulting in the resetting of EC2 burst balances - With rolling deployments, Elastic Beanstalk splits the environment's Amazon EC2 instances into batches and deploys the new version of the application to one batch at a time. Rolling deployments do not result in loss of EC2 burst balances.  The deployment was run as a All-at-once deployment, flushing all the accumulated EC2 burst balances - The traditional All-at-once deployment, wherein all the instances are updated simultaneously, does not result in loss of EC2 burst balances.  When a canary deployment fails, it resets the EC2 burst balances to zero - This is incorrect and given only as a distractor.",
        term: "burst lost"
    },
    // TODO Create the terms here:
    {
        term: "ssm parameter store | understand API Call issuer",
        prompt: "Your company has stored all application secrets in SSM Parameter Store. The audit team has requested to get a report to better understand when and who has issued API calls against SSM Parameter Store. \n\
        Which of the following options can be used to produce your report?  \n\
        - Use SSM Parameter Store Access Logs in S3 to get a record of actions taken by a user \n\
        - Use SSM Parameter Store Access Logs in CloudWatch Logs to get a record of actions taken by a user \n\
        - Use AWS CloudTrail to get a record of actions taken by a user \n\
        - Use SSM Parameter Store List feature to get a record of actions taken by a user",
        example: ":m Use `AWS CloudTrail` to get a record of actions taken by a user  \n\
        AWS Systems Manager Parameter Store provides secure, hierarchical storage for configuration data management and secrets management. You can store data such as passwords, database strings, Amazon Machine Image (AMI) IDs, and license codes as parameter values. You can store values as plain text or encrypted data.  \n\n\
        AWS CloudTrail provides a record of actions taken by a user, role, or an AWS service in Systems Manager. Using the information collected by AWS CloudTrail, you can determine the request that was made to Systems Manager, the IP address from which the request was made, who made the request, when it was made, and additional details.",
        description: ":m INCORRECT: Use SSM Parameter Store List feature to get a record of actions taken by a user - This option has been added as a distractor.  \n\n\
        Use SSM Parameter Store Access Logs in CloudWatch Logs to get a record of actions taken by a user - `CloudWatch Logs can be integrated but that will not help determine who issued API calls`.  \n\n\
        Use SSM Parameter Store Access Logs in S3 to get a record of actions taken by a user - `S3 Access Logs can be integrated but that will not help determine who issued API calls.`",

    },
    {
        term: "EC2 | No provisioning required",
        prompt: "A developer has been asked to create a web application to be deployed on EC2 instances. The developer just wants to focus on writing application code without worrying about server provisioning, configuration and deployment. \n\
        Which AWS Service would you recommend to the developer?\n\
        AWS CloudFormation | AWS CodeDeploy | AWS Elastic Beanstalk | AWS OpsWorks | Serverless Application Model (SAM)",
        example: "Elastic Beanstalk  \n\
        AWS Elastic Beanstalk provides an environment to easily deploy and run applications in the cloud. It is integrated with developer tools and provides a one-stop experience for you to manage the lifecycle of your applications.  AWS Elastic Beanstalk lets you manage all of the resources that run your application as environments where each environment runs only a single application version at a time. When an environment is being created, Elastic Beanstalk provisions all the required resources needed to run the application version. You don't need to worry about server provisioning, configuration, and deployment as that's taken care of by Beanstalk.",
        description: ":m INCORRECT: \n\
        `CloudFormation` - AWS CloudFormation is a service that gives developers and businesses an easy way to create a collection of related AWS and third-party resources and provision them in an orderly and predictable fashion. With CloudFormation, you still need to create a template to specify the type of resources you need, hence this option is not correct.  How CloudFormation Works: via - https://aws.amazon.com/cloudformation/  \n\n\
        `CodeDeploy` - AWS CodeDeploy is a fully managed deployment service that automates software deployments to a variety of compute services such as Amazon EC2, AWS Fargate, AWS Lambda, and your on-premises servers. \n\n\
        AWS CodeDeploy makes it easier for you to rapidly release new features, helps you avoid downtime during application deployment, and handles the complexity of updating your applications. It can deploy an application to an instance but it cannot provision the instance. \n\n\
        `Serverless Application Model` - The AWS Serverless Application Model (AWS SAM) is an open-source framework for building serverless applications. It provides shorthand syntax to express functions, APIs, databases, and event source mappings. You define the application you want with just a few lines per resource and model it using YAML. As the web application needs to be deployed on EC2 instances, so this option is ruled out."
    },
    {
        term: "Serverless Authorization",
        prompt: "The development team at a company creates serverless solutions using AWS Lambda. Functions are invoked by clients via AWS API Gateway which anyone can access. The team lead would like to control access using a 3rd party authorization mechanism.  \n\
        Recommend a service for the given use-case?",
        example: ":m `Lambda Authorizer`\n\n An Amazon API Gateway Lambda authorizer (formerly known as a custom authorizer) is a Lambda function that you provide to control access to your API. A Lambda authorizer uses `bearer` token authentication strategies, such as `OAuth or SAML`. \n\
        Before creating an API Gateway Lambda authorizer, you must first create the AWS Lambda function that implements the logic to authorize and, if necessary, to authenticate the caller.",
        attachment: "./img/2023-04-21-14-43-06.png",
        description: ':m INCORRECT: \n\n\
        `"IAM permissions with sigv4"` - Signature Version 4 is the process to add authentication information to AWS requests sent by HTTP. You will still need to provide permissions but our requirements have a need for 3rd party authentication which is where Lambda Authorizer comes in to play.  \n\n\
        `"Cognito User Pools"` - A Cognito user pool is a user directory in Amazon Cognito. With a user pool, your users can sign in to your web or mobile app through Amazon Cognito, or federate through a third-party identity provider (IdP). Whether your users sign-in directly or through a third party, all members of the user pool have a directory profile that you can access through an SDK. This is managed by AWS, therefore, does not meet our requirements.  \n\n\
        `"API Gateway User Pools"` - This is a made-up option, added as a distractor.'
    },
    {
        term: "AWS Billing and Cost Management",
        prompt: "The development team has just configured and attached the IAM policy needed to access AWS Billing and Cost Management for all users under the Finance department. \n\
        But, the users are unable to see AWS Billing and Cost Management service in the AWS console.  What could be the reason for this issue?",
        example: ":m You need to `activate IAM user access` to the Billing and Cost Management console for all the users who need access - \n\n\
        By default, IAM users do not have access to the AWS Billing and Cost Management console. You or your account administrator must grant users access. You can do this by activating IAM user access to the Billing and Cost Management console and attaching an IAM policy to your users. \n\
        Then, you need to activate IAM user access for IAM policies to take effect. You only need to activate IAM user access once.",
        description: "INCORRECT: \n\n\
        The users might have another policy that restricts them from accessing the Billing information - This is an incorrect option, as deduced from the given use-case.  \n\n\
        Only root user has access to AWS Billing and Cost Management console - This is an incorrect statement. AWS Billing and Cost Management access can be provided to any user through user activation and policies, as discussed above.  \n\n\
        IAM user should be created under AWS Billing and Cost Management and not under the AWS account to have access to Billing console - IAM is a feature of your AWS account. All IAM users are created and managed from a single place, irrespective of the services they wish to you."
    },
    {
        term: "Unusued IAM Roles and service",
        prompt: "A development team lead is responsible for managing access for her IAM principals. At the start of the cycle, she has granted excess privileges to users to keep them motivated for trying new things. \n\
        She now wants to ensure that the team has only the minimum permissions required to finish their work.  \n\n\
        Which of the following will help her identify unused IAM roles and remove them without disrupting any service?",
        example: ":m ### Access Advisor feature on IAM console\n\
        - To help identify the unused roles, IAM reports the last-used timestamp that represents when a role was last used to make an AWS request. Your security team can use this information to identify, analyze, and then confidently remove unused roles.\n\
         This helps improve the security posture of your AWS environments. Additionally, by removing unused roles, you can simplify your monitoring and auditing efforts by focusing only on roles that are in use.",
        description: "Incorrect options:  \n\
        `AWS Trusted Advisor` - AWS Trusted Advisor is an online tool that provides you real-time guidance to help you provision your resources following AWS best practices on cost optimization, security, fault tolerance, service limits, and performance improvement.  \n\n\
        `IAM Access Analyzer` - AWS IAM Access Analyzer helps you identify the resources in your organization and accounts, such as Amazon S3 buckets or IAM roles, that are shared with an external entity. This lets you identify unintended access to your resources and data, which is a security risk.\n\n\
        `Amazon Inspector` - Amazon Inspector is an automated security assessment service that helps improve the security and compliance of applications deployed on AWS. Amazon Inspector automatically assesses applications for exposure, vulnerabilities, and deviations from best practices."
    },
    {
        term: "large-scale-order-processing-application | automatically ",
        prompt: "You're a developer working on a large scale order processing application. After developing the features, you commit your code to AWS CodeCommit and begin building the project with AWS CodeBuild before it gets deployed to the server. \n\
        The build is taking too long and the error points to an issue resolving dependencies from a third-party. You would like to prevent a build running this long in the future for similar underlying reasons.  \n\n\
        Ideate a solution to address this issue on codeBuild?",
        example: ":m ### Enable CodeBuild timeouts     A build represents a set of actions performed by AWS CodeBuild to create output artifacts (for example, a JAR file) based on a set of input artifacts (for example, a collection of Java class files).  \n\
        The following rules apply when you run multiple builds:  When possible, builds run concurrently. The maximum number of concurrently running builds can vary.  Builds are queued if the number of concurrently running builds reaches its limit. \n\
        The maximum number of builds in a queue is five times the concurrent build limit.  A build in a queue that does not start after the number of minutes specified in its time out value is removed from the queue. \n\
        The default timeout value is eight hours. You can override the build queue timeout with a value between five minutes and eight hours when you run your build.  By setting the timeout configuration, the build process will automatically terminate post the expiry of the configured timeout.",
        description: ":m Incorrect options:  \n\
        `Use AWS Lambda` - AWS Lambda lets you run code without provisioning or managing servers. You pay only for the compute time you consume. Lambda cannot be used to impact the code build process.  \n\n\
        `Use AWS CloudWatch Events` - Amazon CloudWatch allows you to monitor AWS cloud resources and the applications you run on AWS. Metrics are provided automatically for a number of AWS products and services. CloudWatch is good for monitoring and viewing logs. CloudWatch cannot be used to impact the code build process.  \n\n\
        `Use VPC Flow Logs` - VPC Flow Logs is a feature that enables you to capture information about the IP traffic going to and from network interfaces in your VPC but not for code compiling configuration. VPC Flow Logs cannot be used to impact the code build process."
    },
    {
        term: "Cloudformation serverless first line",
        prompt: "You are given a document written in YAML that represents the architecture of a serverless application. The first line of the document contains Transform: 'AWS::Serverless-2016-10-31'.  \n\
        What does the Transform section in the document represent?",
        example: ':m AWS CloudFormation template is a JSON- or YAML-formatted text file that describes your AWS infrastructure. \n\
        Templates include several major sections. The "Resources" section is the only required section. The optional "Transform" section specifies one or more macros that AWS CloudFormation uses to process your template.\n\
        The AWS Serverless Application Model (SAM) is an open-source framework for building serverless applications. It provides shorthand syntax to express functions, APIs, databases, and event source mappings. With just a few lines per resource, you can define the application you want and model it using YAML.  \
        Presence of "Transform" section indicates `it is a Serverless Application Model (SAM) template` -\n\n\
        The AWS::Serverless transform, which is a `macro hosted by AWS CloudFormation`, takes an `entire template written in the AWS Serverless Application Model (AWS SAM) syntax` and transforms and expands it into a `compliant AWS CloudFormation template`. So, presence of "Transform" section indicates, the document is a SAM template.',
        attachment: "./img/2023-04-21-14-57-59.png",
        description: `Incorrect: options: \n\
        It represents a Lambda function definition - Lambda function is created using "AWS::Lambda::Function" resource and has no connection to 'Transform' section.  \n\n\
        It represents an intrinsic function - Intrinsic Functions in templates are used to assign values to properties that are not available until runtime. They usually start with Fn:: or !. Example: !Sub or Fn::Sub.\n\n\
        Presence of 'Transform' section indicates it is a CloudFormation Parameter - CloudFormation parameters are part of Parameters block of the template, like so:  Parameters in YAML: `
    },
    {
        term: "Load balancers ip address patterns collections",
        prompt: "An organization has offices across multiple locations and the technology team has configured an Application Load Balancer across targets in multiple Availability Zones.\
         The team wants to analyze the incoming requests for latencies and the client's IP address patterns.  \n\n\
         Which feature of the Load Balancer will help collect the required information?",
        example: "ALB access logs - Elastic Load Balancing provides access logs that capture detailed information about requests sent to your load balancer. \n\
        Each log contains information such as the time the request was received, the client's IP address, latencies, request paths, and server responses. \n\
        You can use these access logs to analyze traffic patterns and troubleshoot issues. Access logging is an optional feature of Elastic Load Balancing that is disabled by default.",
        attachment: "./img/2023-04-21-15-02-12.png",
        description: ":m Incorrect options:  \n\
        `CloudTrail logs` - Elastic Load Balancing is integrated with AWS CloudTrail, a service that provides a record of actions taken by a user, role, or an AWS service in Elastic Load Balancing. CloudTrail captures all API calls for Elastic Load Balancing as events. \
        You can use AWS CloudTrail to capture detailed information about the calls made to the `Elastic Load Balancing API` and store them as `log files in Amazon S3`. You can use these `CloudTrail logs` to determine which API calls were made, the source IP address where the API call came from, who made the call, \when the call was made, and so on.  \n\n\
        `CloudWatch metrics` - Elastic Load Balancing ``publishes data points` to Amazon CloudWatch` for your load balancers and your targets. CloudWatch enables you to retrieve statistics about those data points as an ordered set of time-series data, known as `metrics`. \
        You can use metrics to verify that your system is `performing as expected`. This is the right feature if you wish to track a certain metric.  \n\n\
        `ALB request tracing` - You can use request tracing to track HTTP requests. The load balancer adds a header with a `trace identifier` to each request it receives. Request tracing will not help you to analyze latency specific data."
    },
    {
        term: "Security credentials aws root user",
        prompt: "Mention at least one security credentials can only be created by the AWS Account root user? ",
        example: ":m ### CloudFront Key Pairs \n\
        - IAM users can't create CloudFront key pairs. You must log in using root credentials to create key pairs.  \
        To create signed URLs or signed cookies, you need a signer. A signer is either a trusted key group that you create in CloudFront, or an AWS account that contains a CloudFront key pair. \
        AWS recommends that you use trusted key groups with signed URLs and signed cookies instead of using CloudFront key pairs.\n\n\
        Other Credentials:\n\
        AWS Account Root User credentials: These are the initial credentials that are created when an AWS account is set up. They provide complete access to all AWS services and resources in the account.      IAM User with AdministratorAccess Policy: This policy grants the user full access to all AWS services and resources in the account. Only the root user can create IAM users with this policy attached.      IAM Role with AdministratorAccess Policy: This role grants the same level of access as the IAM User with AdministratorAccess Policy, but it can be assumed by other users or services. Only the root user can create IAM roles with this policy attached.      AWS Organizations Service Control Policies (SCPs): SCPs are used to set permissions across all AWS accounts in an organization. Only the root user can create and manage SCPs.\n\
        ",
        description: ":m Incorrect options:  \n\
        `EC2 Instance Key Pairs` - You use key pairs to access Amazon EC2 instances, such as when you use SSH to log in to a Linux instance. These key pairs can be created from the IAM user login and do not `need root user access`.\n\n\
        `IAM User Access Keys` - Access keys consist of two parts: an access key ID and a secret access key. You use access keys to sign programmatic requests that you make to `AWS if you use AWS CLI commands` (using the SDKs) or using AWS API operations. \n\
        IAM users can create their own Access Keys, `does not need root access`.  \n\n\
        `IAM User passwords` - Every IAM user has access to` his own credentials and can reset` the password whenever they need to."
    },
    {
        term: "version-number-category-category",
        prompt: "A gaming company wants to store information about all the games that the company has released. Each game has a name, version number, and category (such as sports, puzzles, strategy, etc). \
        The game information also can include additional properties about the supported platforms and technical specifications. This additional information is inconsistent across games.  \n\n\
        You have been hired as an AWS Certified Developer Associate to build a solution that addresses the following use cases:  \n\
        For a given name and version number, get all details about the game that has that name and version number.  \n\
        For a given name, get all details about all games that have that name.  \n\
        For a given category, get all details about all games in that category.  \n\n\
        What will you recommend as the most efficient solution?",
        example: "Set up an Amazon DynamoDB table with a primary key that consists of the name as the partition key and the version number as the sort key. Create a global secondary index that has the category as the partition key and the name as the sort key",
        description: "When you create a DynamoDB table, in addition to the table name, you must specify the primary key of the table. The primary key uniquely identifies each item in the table, so that no two items can have the same key. You can create one or more secondary indexes on a table. A secondary index lets you query the data in the table using an alternate key, in addition to queries against the primary key. DynamoDB doesn't require that you use indexes, but they give your applications more flexibility when querying your data.\n\
        \n\n\
        Incorrect options:  \n\
        Set up an Amazon DynamoDB table with a primary key that consists of the category as the partition key and the version number as the sort key. \
        Create a global secondary index that has the name as the partition key - The DynamoDB table for this option has the primary key and GSI that do not solve for the condition - \"For a given name and version number, get all details about the game that has that name and version number\". This option does `not allow for efficient querying` of a specific game by its name and version number as you need` multiple queries` which would be less efficient than the `single query allowed by the correct option`.  \
        Set up an Amazon RDS MySQL instance having a games table that contains columns for `name, version number, and category`. \n\n\
        \
        Configure the `name` column `as the primary key` - This option is not the right fit as it does not allow you to efficiently query on the version number and category columns.  \n\n\
        Permanently store the name, version number, and category information about the games in an `Amazon Elasticache` for `Memcached instance` - \
        You cannot use Elasticache for Memcached to permanently `store values meant to be persisted in a database` (relational or NoSQL). Elasticache is a `caching layer`. So this option is incorrect.",
        attachment: "./img/2023-04-21-15-10-37.png"
    },
    {
        term: "retail-company-migrating-on-premises-database-to-amazon-rds-for-postgresql",
        prompt: "A retail company is migrating its on-premises database to Amazon RDS for PostgreSQL. The company has read-heavy workloads. The development team at the company is looking at refactoring the code to achieve optimum read performance for SQL queries.  Which solution will address this requirement with the least current as well as future development effort?",
        example: "Set up Amazon RDS with one or more read replicas. Refactor the application code so that the queries use the endpoint for the read replicas\n\
        Amazon RDS uses the PostgreSQL DB engine's built-in replication functionality to create a special type of DB instance called a read replica from a source DB instance. The source DB instance becomes the primary DB instance. Updates made to the primary DB instance are asynchronously copied to the read replica. You can reduce the load on your primary DB instance by routing read queries from your applications to the read replica. Using read replicas, you can elastically scale out beyond the capacity constraints of a single DB instance for read-heavy database workloads. For the given use case, you can achieve optimum read performance for SQL queries by using the read-replica endpoint for the read-heavy workload.",
        attachment: "./img/2023-04-21-15-17-48.png",
        description: ":m Incorrect options:  \n\
        `Configure Elasticache for Redis to act as a caching layer for Amazon RDS`. - Refactor the application code so that the queries use the Elasticache for Redis endpoint  \n\n\
        `Configure Elasticache for Memcached to act as a caching layer for Amazon RDS` - Refactor the application code so that the queries use the Elasticache for Memcached endpoint  Both Redis and Memcached are popular, open-source, in-memory data stores (also known as in-memory caches). These are not relational databases and cannot be used to run SQL queries. So, both these options are incorrect.  Set up Amazon RDS in the multi-AZ configuration with a single standby instance. \n\n\
        `Refactor the application code so that the queries use the standby instance endpoint` - In an Amazon RDS Multi-AZ deployment with a single standby instance, Amazon RDS automatically creates a primary database (DB) instance and synchronously replicates the data to an instance in a different AZ. When it detects a failure, Amazon RDS automatically fails over to a standby instance without manual intervention. You cannot route the read queries from an application to the standby instance of a multi-AZ RDS database as it's not accessible for the read traffic in the single standby instance configuration."
    },
    {
        term: "amazon-s3-bucket-policy-encryption",
        prompt: "A developer is configuring a bucket policy that denies upload object permission to any requests that do not include the x-amz-server-side-encryption header requesting server-side encryption with SSE-KMS for an Amazon S3 bucket \n\
        - examplebucket.  \n\
        Design JSON policy that policies is the right fit for the given requirement",
        description: `{ "StringNotEquals":{ "s3:x-amz-server-side-encryption":"aws:kms" } } } ] }\n\n\
        { "Version":"2012-10-17", "Id":"PutObjectPolicy", "Statement":[{ "Sid":"DenyUnEncryptedObjectUploads", "Effect":"Deny", "Principal":"", "Action":"s3:PutObject", "Resource":"arn:aws:s3:::examplebucket/", "Condition": .... `,
        example: `{ "Version":"2012-10-17", "Id":"PutObjectPolicy", "Statement":[{ "Sid":"DenyUnEncryptedObjectUploads", "Effect":"Deny", "Principal":"", "Action":"s3:PutObject", "Resource":"arn:aws:s3:::examplebucket/", "Condition":{ "StringNotEquals":{ "s3:x-amz-server-side-encryption":"aws:kms" } } } ] } `,
    },
    {
        term: "aws-most-optimal-change-regions-temporary",
        prompt: "As an AWS Certified Developer Associate, you have configured the AWS CLI on your workstation. \n\
        Your default region is us-east-1 and your IAM user has permissions to operate commands on services such as EC2, S3 and RDS in any region. \
        You would like to execute a command to stop an EC2 instance in the `us-east-2 region`.  \n\n\
        Design an optimal solution for this change when using the cdk",
        example: "U:m se the `--region parameter`: If the region parameter is not set, then the CLI command is executed against the default AWS region.  You can also review all general options for AWS CLI: ",
        attachment: "./img/2023-04-21-15-25-31.png",
        description: "Incorrect options:  \n\
        `You need to override the default region by using aws configure` - This is not the most optimal way as you will have to change it again to reset the default region.  \n\n\
        `You should create a new IAM user just for that other region` - This is not the most optimal way as you would need to manage two IAM user profiles.\n\n\
        `Use boto3 dependency injection` - With the CLI you do not use boto3. This option is a distractor."
    },
    {
        term: "deploy-new-application-version-ec2-instances",
        prompt: "A company uses Elastic Beanstalk to manage its IT infrastructure on AWS Cloud and it would like to deploy the new application version to the EC2 instances. \n\
        When the deployment is executed, some instances should serve requests with the old application version, \
        while other instances should serve requests using the new application version until the deployment is completed.  \n\n\
        Propose a deployment policy that will meet the given requirement.",
        example: "With Elastic Beanstalk, you can quickly deploy and manage applications in the AWS Cloud without having to learn about the infrastructure that runs those applications. Elastic Beanstalk reduces management complexity without restricting choice or control. You simply upload your application, and Elastic Beanstalk automatically handles the details of capacity provisioning, load balancing, scaling, and application health monitoring.  How Elastic BeanStalk Works: via - https://docs.aws.amazon.com/elasticbeanstalk/latest/dg/Welcome.html  The rolling deployment policy deploys the new version in batches. Each batch is taken out of service during the deployment phase, reducing your environment's capacity by the number of instances in a batch. The cost remains the same as the number of EC2 instances does not increase. This policy avoids downtime and minimizes reduced availability, at a cost of a longer deployment time.",
        attachment: "./img/2023-04-21-15-37-18.png",
        description: ":m Incorrect options:  \n\
        `Immutable` - The 'Immutable' deployment policy ensures that your new application version is always deployed to new instances, instead of updating existing instances. It also has the additional advantage of a quick and safe rollback in case the deployment fails.  \n\n\
        `All at once` - This policy deploys the new version to `all instances simultaneously`. Although 'All at once' is the quickest deployment method, but the application may become unavailable to users (or have low availability) for a short time.  \n\n\
        `Rolling with additional batches` - This policy deploys the new version in batches, but first launches a new batch of instances to ensure full capacity during the deployment process. This policy avoids any reduced availability, at a cost of an even longer deployment time compared to the Rolling method. Suitable if you must maintain the same bandwidth throughout the deployment. These increase the costs as you're adding extra instances during the deployment.  Reference:  https://docs.aws.amazon.com/elasticbeanstalk/latest/dg/using-features.deploy-existing-version.html"
    },
    {
        term: "ec2-instance-region",
        prompt: "An IT company is configuring Auto Scaling for its Amazon EC2 instances spread across different AZs and Regions. \n\n\
        Which of the following scenarios are NOT correct about EC2 Auto Scaling? (Select two)\n\n\
        options:\n\
        1. An Auto Scaling group can contain EC2 instances in `one or more Availability Zones within the same Region`\n\
        2. For Auto Scaling groups in a VPC, the EC2 instances are launched in subnets \n\
        3. An IT company is configuring Auto Scaling for its Amazon EC2 instances spread across different AZs and Regions\n\
        4. Amazon EC2 Auto Scaling attempts to distribute instances evenly between the Availability Zones that are enabled for your Auto Scaling group \n\
        ",
        example: " Auto Saling groups that span across multiple Regions need to be enabled for all the Regions specified \
        - Amazon EC2 Auto Scaling attempts to distribute instances evenly between the AZs that are enabled for your Auto Scaling group \
        - An Auto Scaling group can contain EC2 instances in one or more AZs within the same Region - \n\n\
        ForAuto Scaling groups in a VPC, the EC2 instances are launched in subnets - \
        An Auto Scaling group can contain instances in only on AZ zone of a region",
        attachment: "./img/2023-04-21-15-46-04.png",
        description: ":m Incorrect options:  \n\
        An Auto Scaling group can contain EC2 instances in `one or more Availability Zones within the same Region`- This is a valid statement. Auto Scaling groups can span across the availability Zones of a Region.  \n\n\
        Amazon EC2 Auto Scaling attempts to distribute instances evenly between the Availability Zones that are enabled for your Auto Scaling group - When one Availability Zone becomes unhealthy or unavailable, Auto Scaling launches new instances in an unaffected Availability Zone. When the unhealthy Availability Zone returns to a healthy state, Auto Scaling automatically redistributes the application instances evenly across all of the designated Availability Zones.  \n\n\
        For Auto Scaling groups in a VPC, the EC2 instances are launched in subnets - For Auto Scaling groups in a VPC, the EC2 instances are launched in subnets. Customers can select the subnets for your EC2 instances when you create or update the Auto Scaling group."
    },
    {
        term: "limit-permissions-grant-permissions",
        prompt: "A development team lead is configuring policies for his team at an IT company. \n\
        Which of the following policy types only limit permissions but cannot grant permissions (Select two)?  \n\n\
        - AWS Organizations Service Control Policy (SCP) \n\
        - Resource-based policy \n\
        - Permissions boundary \n\
        - Identity-based policy \n\
        - Access control list (ACL)",
        example: "Correct options:  \n\n\
        AWS Organizations Service Control Policy (SCP) – Use an AWS Organizations Service Control Policy (SCP) to define the maximum permissions for account members of an organization or organizational unit (OU). SCPs limit permissions that identity-based policies or resource-based policies grant to entities (users or roles) within the account, but do not grant permissions.  \n\n\
        Permissions boundary - Permissions boundary is a managed policy that is used for an IAM entity (user or role). The policy defines the maximum permissions that the identity-based policies can grant to an entity, but does not grant permissions.",
        attachment: "./img/2023-04-21-15-51-47.png",
        description: ":m INCORRECT: \n\n\
        `Access control list (ACL)` - Use ACLs to control which principals in other accounts can access the resource to which the ACL is attached. ACLs are similar to resource-based policies, although they are the only policy type that does not use the JSON policy document structure. ACLs are cross-account permissions policies that grant permissions to the specified principal.  \n\n\
        `Resource-based policy` - Resource-based policies grant permissions to the principal that is specified in the policy. Principals can be in the same account as the resource or in other accounts. The most common examples of resource-based policies are Amazon S3 bucket policies and IAM role trust policies.  \n\n\
        `Identity-based policy` - Help `attach managed and inline policies` to IAM identities (users, groups to which users belong, or roles). Identity-based policies grant permissions to an identity."
    },
    {
        term: "ebextensions-configuration-files",
        prompt: "You have chosen AWS Elastic Beanstalk to upload your application code and allow it to handle details such as provisioning resources and monitoring.  \n\
        When creating configuration files for AWS Elastic Beanstalk which naming convention should you follow?\n\
        for config | <mysettings> and ebexetensions",
        example: ".ebextensions/<mysettings>.config : You can add AWS Elastic Beanstalk configuration files (.ebextensions) to your web application's source code to\
         configure your environment and customize the AWS resources that it contains. Configuration files are YAML or JSON formatted documents with a .config file \
         extension that you place in a folder named .ebextensions and deploy in your application source bundle.",
        attachment: "./img/2023-04-21-15-56-45.png"
    },
    {
        term: "ec2-instance-region",
        prompt: "You are a developer for a web application written in .NET which uses the AWS SDK. \n\
        You need to implement an authentication mechanism that returns a JWT (JSON Web Token).  \n\
        Which AWS service will help you with token handling and management?",
        example: ':m Correct option:  `"Cognito User Pools"`  After successful authentication, Amazon Cognito returns user pool tokens to your app. \
        You can use the tokens to grant your `users access to your own server-side resources`, or to the Amazon API Gateway.\
        Amazon Cognito user pools implement ID, access, and refresh tokens as defined by the OpenID Connect (OIDC) open standard.\
        The ID token is a JSON Web Token (JWT) that contains claims about the identity of the authenticated user such as name, email, and phone_number. \
        You can use this identity information inside your application. The ID token can also be used to authenticate users against your resource servers or server applications.',
        attachment: "./img/2023-04-21-16-00-28.png",
        description: ':m Incorrect options:  \n\
        `"API Gateway"` - If you are processing tokens server-side and `using other programming languages not supported in AWS` it may be a good choice. \
        Other than that, go with a service already providing the functionality.  \n\n\
        `"Cognito Identity Pools"` - You can use Identity pools to grant your users access to other AWS services. With an identity pool, \
        your users can obtain temporary `AWS credentials to access AWS services, such as Amazon S3 and DynamoDB`. \
        Identity pools support anonymous guest users, as well as the `specific identity providers` that you can use to authenticate users for identity pools.\n\n\
        `"Cognito Sync"` - Amazon Cognito Sync is an AWS service and client library that enables `cross-device syncing of application-related` user data. \
        You can use it to synchronize user profile data across mobile devices and the web without requiring your own backend.'
    },
    {
        term: "identity-pools-explain-foreach",
        prompt: "Whats the difference between User and Identity Pools? Explain the use cases for each.",
        description: ":m `User Pools` are used to `manage user authentication and authorization`, and they provide features such as user `sign-up`, \
        `sign-in, and password recovery`. \n\
        `User Pools` are used to authenticate and authorize individual users, and they can be used to integrate with `social identity providers like Facebook`,\
        Google, and Amazon, as well as enterprise identity providers using SAML 2.0.  \n\
        `Identity Pools`, on the other hand, provide a way to authorize and authenticate access to AWS resources for groups of users, known as `federated identities`. \
        Identity Pools allow users to authenticate with `third-party identity providers, such as Facebook or Google`, and obtain `temporary AWS credentials` that grant access to AWS resources. \n\n\
        These credentials are managed by AWS Security Token Service (STS) and can be customized to restrict access to specific AWS resources or services.",
        example: ":m You can use `User pool` for developing an app where `users can sign up`, while `Identity Pool` is for your applications to be able to \
        `authenticate access` to other aws resources"
    },
    {
        term: "serverless-architecture-given-use-case",
        prompt: "A development team wants to build an application using serverless architecture. \n\
        The team plans to use AWS Lambda functions extensively to achieve this goal. \n\
        The developers of the team work on different programming languages like Python, .NET and Javascript. \n\
        The team wants to model the cloud infrastructure using any of these programming languages.  \n\n\
        Which AWS service/tool should the team use for the given use-case?",
        example: ":m `AWS Cloud Development Kit (CDK)` - The AWS Cloud Development Kit (AWS CDK) is an open-source software development framework to define your cloud application resources using familiar programming languages.  \n\
        Provisioning cloud applications can be a challenging process that requires you to perform manual actions, write custom scripts, maintain templates, or learn domain-specific languages. \
        AWS CDK uses the familiarity and expressive power of programming languages such as JavaScript/TypeScript, Python, Java, and .NET for modeling your applications.\n\
        It provides you with high-level components called constructs that preconfigure cloud resources with proven defaults, so you can build cloud applications without needing to be an expert.\n\
        AWS CDK provisions your resources in a safe, repeatable manner through AWS CloudFormation. It also enables you to compose and share your own custom constructs that incorporate your organization's requirements, helping you start new projects faster.",
        description: "Incorrect options:  AWS CloudFormation - When AWS CDK applications are run, they compile down to fully formed CloudFormation JSON/YAML templates that are then submitted to the CloudFormation service for provisioning. Because the AWS CDK leverages CloudFormation, you still enjoy all the benefits CloudFormation provides such as safe deployment, automatic rollback, and drift detection. But, CloudFormation by itself is not sufficient for the current use case.  AWS Serverless Application Model (SAM) - The AWS Serverless Application Repository is a managed repository for serverless applications. It enables teams, organizations, and individual developers to store and share reusable applications, and easily assemble and deploy serverless architectures in powerful new ways. Using the Serverless Application Repository, you don't need to clone, build, package, or publish source code to AWS before deploying it.  AWS Serverless Application Model and AWS CDK both abstract AWS infrastructure as code making it easier for you to define your cloud infrastructure. If you prefer defining your serverless infrastructure in concise declarative templates, SAM is the better fit. If you want to define your AWS infrastructure in a familiar programming language, as is the requirement in the current use case, AWS CDK is the right fit.  AWS CodeDeploy - AWS CodeDeploy is a fully managed deployment service that automates software deployments to a variety of compute services such as Amazon EC2, AWS Fargate, AWS Lambda, and your on-premises servers. AWS CodeDeploy makes it easier for you to rapidly release new features, helps you avoid downtime during application deployment, and handles the complexity of updating your applications. CodeDeploy can be used with AWS CDK for deployments."
    },
    {
        term: "!findInMap",
        prompt: "You are creating a Cloud Formation template to deploy your CMS application running on an EC2 instance within your AWS account.\
         Since the application will be deployed across multiple regions, you need to create a map of all the possible values for the base AMI.\n\
         How will you invoke the !FindInMap function to fulfill this use case?",
        description: `Mappings:\n RegionMap:\n us-east-1:\n HVM64: "ami-0ff8a91507f77f867"\n HVMG2: "ami-0a584ac55a7631c0c"\n us-west-1:\n HVM64: "ami-0bdb828fd58c52235"\n HVMG2: "ami-066ee5fd4a9ef77f1"\n eu-west-1:\n HVM64: "ami-047bb4163c506cd98"\n HVMG2: "ami-31c2f645"\n ap-southeast-1:\n HVM64: "ami-08569b978cc4dfa10"\n HVMG2: "ami-0be9df32ae9f92309"\n ap-northeast-1:\n HVM64: "ami-06cd52961ce9f0d85"\n HVMG2: "ami-053cdd503598e4a9d"\nResources:\n myEC2Instance:\n Type: "AWS::EC2::Instance"\n Properties:\n ImageId: !FindInMap\n - RegionMap\n - !Ref 'AWS::Region'\n - HVM64\n InstanceType: m1.small",`,
        example: "!FindInMap [ MapName, TopLevelKey, SecondLevelKey ] - The intrinsic function Fn::FindInMap returns the value corresponding to keys in a two-level map that is declared in the Mappings section. \n\
        YAML Syntax for the full function name: Fn::FindInMap: [ MapName, TopLevelKey, SecondLevelKey ]\n\
        Short form of the `above syntax` is : !FindInMap [ MapName, TopLevelKey, SecondLevelKey ]  Where,\n\n\
        `MapName` - Is the `logical name` of a mapping declared in the Mappings section that contains the `keys and values`.\n\n\
        `TopLevelKey`-  The top-level key name. Its value is a list of key-value pairs. \n\n\
        `SecondLevelKey` - The second-level key name, which is set to one of the keys from the list assigned to `TopLevelKey`."
    },
    {
        term: "reduce-average-runtime-of-lambda-function",
        prompt: "A development team wants to deploy an AWS Lambda function that requires significant CPU utilization.\n\
          As a Developer Associate, which of the following would you suggest for reducing the average runtime of the function?",
        example: ":m Deploy the function with its `memory allocation` set `to the maximum amount` \n\
        - Lambda allocates CPU power in proportion to the amount of memory configured. Memory is the amount of memory available to your Lambda function at runtime.\n\
         You can increase or decrease the memory and CPU power allocated to your function using the Memory (MB) setting.\n\
         To configure the memory for your function, set a value between 128 MB and 10,240 MB in 1-MB increments. \n\
         At 1,769 MB, a function has the equivalent of one vCPU (one vCPU-second of credits per second).",
        attachment: "./img/2023-04-21-16-32-41.png",
        description: ":m Incorrect options:\n\n\
        Deploy the function into `multiple AWS Regions` - `Deploying the Lambda function to multiple AWS Regions` does `not increase the compute capacity` or `CPU utilization capacity of Lambda`. So, this option is irrelevant.  \n\n\
        `Deploy the function using Lambda layers` - A Lambda layer is a .zip file archive that can contain additional code or data. A layer can contain libraries, a custom runtime, data, or configuration files. \n\
        Layers promote code sharing and `separation of responsibilities` so that you can `iterate faster on writing business logic`. \
        Layers `do not increase the computational capacity of Lambda`.  Deploy the function with its `CPU allocation set to the maximum amount `- This statement is given as a distractor. CPU allocation is an invalid parameter. As discussed above, the CPU is allocated in proportion to the memory allocated to the function."
    },
    {
        term: "simple-queue-service-aws-sqs",
        prompt: "Amazon Simple Queue Service (SQS) has a set of APIs for various actions supported by the service.  \
        Which of the following would you identify as correct regarding the CreateQueue API? (Select two):\n\n\
        - The dead-letter queue of a FIFO queue must also be a FIFO queue. Whereas, the dead-letter queue of a standard queue can be a standard queue or a FIFO queue - \n\n\
        - You can't change the queue type after you create it \n\n\
        - Queue tags are case insensitive. A new tag with a key identical to that of an existing tag overwrites the existing tag \n\n\
        - The visibility timeout value for the queue is in seconds, which defaults to 30 seconds\n\n\
        - The length of time, in seconds, for which the delivery of all messages in the queue is delayed is configured using MessageRetentionPeriod attribute",
        example: ":m Correct options:  \n\
        You `can't change the queue type after you create it` - You can't change the queue type after you create it and you can't convert an existing standard queue into a FIFO queue. \
        You must either create a new FIFO queue for your application or delete your existing standard queue and recreate it as a FIFO queue.  \n\n\
        The visibility timeout value for the queue is in seconds, which defaults to 30 seconds - The visibility timeout for the queue is in seconds. \
        Valid values are: An integer from 0 to 43,200 (12 hours), the Default value is 30.",
        description: ":m Incorrect options:  \n\n\
        The `dead-letter queue of a FIFO queue must also be a FIFO queue`. Whereas, the dead-letter queue of a standard queue can be a standard queue or a FIFO queue - The dead-letter queue of a FIFO queue must also be a FIFO queue. Similarly, the dead-letter queue of a standard queue must also `be a standard queue`. \n\n\
        The `length of time`, in seconds, for which the delivery of all messages in the queue is delayed is configured using `MessageRetentionPeriod attribute` - The length of time, in seconds, for which the delivery of all messages in the queue is delayed is configured using DelaySeconds attribute. MessageRetentionPeriod attribute controls the length of time, in seconds, for which Amazon SQS retains a message.  Queue tags are case insensitive.\
         A new tag with a key identical to that of an existing tag overwrites the existing tag - Queue tags are case-sensitive. A new tag with a key identical to that of an existing tag overwrites the existing tag. To be able to tag a queue on creation, you must have the sqs:CreateQueue and sqs:TagQueue permissions."
    },
    {
        term: "improve-performance-of-popular-api-service",
        prompt: "A company wants to improve the performance of its popular API service that offers unauthenticated read access to daily updated statistical information via Amazon API Gateway and AWS Lambda.\n\
        What measures can the company take?",
        example: ":m Enable API caching in API Gateway  API Gateway provides a few strategies for optimizing your API to improve responsiveness, like `response caching and payload compression`.\
         You can enable API caching in Amazon API Gateway to cache your endpoint's responses. With caching, you can reduce the number of calls made to your endpoint and also improve the latency of requests to your API.",
        description: ":m Incorrect options:  \n\
        Set up `usage plans` and `API keys` in API Gateway - After you create, test, and deploy your APIs, you can use API Gateway usage plans to make them available as product offerings for your customers. \
        You can configure usage plans and `API keys to allow customers` to access selected APIs, and begin `throttling requests` to `those APIs based on defined limits` and quotas. \
        These can be set at the API, or API method level. This option is incorrect as usage plans and API keys cannot be used to improve the responsiveness of the API.  \n\n\
        Configure API Gateway to use `Elasticache` for `Memcached` - This option has been added as a distractor. Elasticache for Memcached cannot be used with API Gateway to improve the responsiveness of the API for the given use case.\
         You should note that Elasticache for Memcached is a downstream service in the request flow.\n\n\
        Configure API Gateway to use `Gateway VPC Endpoint` - This option has been added as a distractor. Gateway endpoints provide reliable connectivity to Amazon S3 and DynamoDB without requiring an internet gateway or a NAT device for your VPC.\
        Gateway endpoints do not enable AWS PrivateLink."
    },
    {
        term: "isolating-ec2-instances-to-a-single-tenant",
        prompt: "A cybersecurity firm wants to run their applications on single-tenant hardware to meet security guidelines.  \n\n\
        Which of the following is the MOST cost-effective way of isolating their Amazon EC2 instances to a single tenant?\n\
        Dedicated Hosts, On Demand Instances, Spot Instances, or Dedicated Instances?",
        example: "Dedicated Instances - Dedicated Instances are Amazon EC2 instances that run in a virtual private cloud (VPC) on hardware that's dedicated to a single customer.\
        Dedicated Instances that belong to different AWS accounts are physically isolated at a hardware level, even if those accounts are linked to a single-payer account.\n\
        However, Dedicated Instances may share hardware with other instances from the same AWS account that are not Dedicated Instances.  \n\n\
        A Dedicated Host is also a physical server that's dedicated for your use. With a Dedicated Host, you have visibility and control over how instances are placed on the server.  Differences between Dedicated Hosts and Dedicated Instances: ",
        attachment: "./img/2023-04-21-16-47-42.png",
        description: ":m Incorrect options:  \n\
        - `Spot Instances` - A Spot Instance is an unused EC2 instance that is available for less than the `On-Demand price`. Your Spot Instance runs whenever capacity is available and the maximum price per hour for your request exceeds the Spot price. \
        Any instance present with unused capacity will be allocated. Even though this is cost-effective, it does not fulfill the single-tenant `hardware requirement of the client` and hence is not the correct option.  \n\n\
        - `Dedicated Hosts` - An Amazon EC2 Dedicated Host is a physical server with EC2 instance capacity fully dedicated to your use. Dedicated Hosts allow you to use your existing software licenses on EC2 instances. \
        With a Dedicated Host, you have visibility and control over how instances are placed on the server. This option is `costlier` than the Dedicated Instance and hence is `not the right choice` for the current requirement.  \n\n\
        - `On-Demand Instances `- With On-Demand Instances, you pay for compute capacity by the second with no long-term commitments. \
        You have `full control` over its `lifecycle—you decide when to launch, stop, hibernate, start, reboot, or terminate it`. Hardware isolation is not possible and on-demand has one of the costliest instance charges and hence is \
        not the correct answer for current requirements."
    },
    {
        term: "elastic-beanstalk-and-rds",
        prompt: "You have created a Java application that uses RDS for its main data storage and ElastiCache for user session storage. \
        The application needs to be deployed using Elastic Beanstalk and every new deployment should allow the application servers to reuse the RDS database. \
        On the other hand, user session data stored in ElastiCache can be re-created for every deployment.\n\
        Propose a solution that will cache the session data in ElastiCache and allow the application servers to reuse the RDS database.",
        example: ":m ElastiCache defined in .ebextensions/ - Any resources created as part of your .ebextensions is part of your Elastic Beanstalk template and `will get deleted if the environment is terminated`.  \n\
        via - https://docs.aws.amazon.com/elasticbeanstalk/latest/dg/ebextensions.html  RDS database defined externally and referenced through environment variables - \
        To decouple your database instance from your environment, you can run a database instance in Amazon RDS and configure your application to connect to it on launch. \
        This enables you to connect `multiple environments` to a database, terminate an environment without affecting the database, and perform `seamless updates with blue-green deployments.` \
        To allow the Amazon EC2 instances in your environment to connect to an outside database, you can configure the environment's Auto Scaling group with an additional security group.  Using Elastic Beanstalk with",
        attachment: "/img/2023-04-21-16-54-40.png",
    },
    {
        term: "percentage-traffic-to-ec2-instances",
        prompt: "An organization has hosted its EC2 instances in two AZs. AZ1 has two instances and AZ2 has 8 instances. The Elastic Load Balancer managing the instances in the two AZs has cross-zone load balancing enabled in its configuration.\n\
        What percentage traffic will each of the instances in AZ1 receive?",
        example: ":m A `load balancer` accepts incoming traffic from clients and routes requests to its registered targets (such as EC2 instances) in one or more Availability Zones.  \n\
        The nodes for a load balancer distribute requests from clients to `registered targets`. When cross-zone load balancing is enabled, each load balancer node distributes traffic across the registered targets in all enabled Availability Zones.\n\
        When `cross-zone load balancing is disabled`, each load balancer node distributes traffic only across the registered targets in its Availability Zone. With Application Load Balancers, cross-zone load balancing is always enabled.  10 - When cross-zone load balancing is enabled, each of the 10 targets receives 10% of the traffic. This is because each load balancer node can route its 50% of the client traffic to all 10 targets (present in both AZs).",
        attachment: "./img/2023-04-21-20-41-49.png",
        description: "INCORRECT: 25 - If cross-zone load balancing is disabled, each of the two targets in AZ1 will receive 25% of the traffic. Because the load balancer is only able to send to the targets registered in AZ1 (AZ2 instances are not accessible for load balancer on AZ1)  20 - Invalid option, given only as a distractor.  15 - Invalid option, given only as a distractor."
    },
    {
        term: "persistent-cross-az-shared-access",
        prompt: "ECS Fargate container tasks are usually spread across Availability Zones (AZs) and the underlying workloads need persistent cross-AZ shared access to the data volumes configured for the container tasks.\n\
        Which of the following solutions is the best choice for these workloads?",
        example: "`Amazon EFS volumes` - EFS volumes provide a `simple, scalable, and persistent file storage` for use with your Amazon ECS tasks. \
        With Amazon EFS, storage capacity is elastic, growing and shrinking automatically as you add and remove files. \
        Your applications can have the storage they need, when they need it. Amazon EFS volumes are supported for tasks hosted on Fargate or Amazon EC2 instances.  \n\
        You can use `Amazon EFS` file systems with Amazon ECS to export file system data across your fleet of container instances. \n\
        That way, `your tasks have access to the same persistent storage`, no matter the instance on which they land. \
        However, you must configure your container instance AMI to mount the Amazon EFS file system before the Docker daemon starts. \
        Also, your task definitions must reference volume mounts on the `container instance` to use the `file system`.",
        description: "INCORRECT: \n\
        `Docker volumes` - A Docker-managed volume that is created under /var/lib/docker/volumes on the host Amazon EC2 instance. Docker volume drivers (also referred to as plugins) are used to integrate the volumes with external storage systems, such as Amazon EBS. \
        The built-in local volume driver or a third-party volume driver can be used. Docker volumes are only supported when running tasks on Amazon EC2 instances.  \n\n\
        `Bind mounts` - A file or directory on the host, such as an Amazon EC2 instance or AWS Fargate, is mounted into a container. \
        Bind mount host volumes are supported for tasks hosted on Fargate or Amazon EC2 instances. Bind mounts provide temporary storage, and hence these are a wrong choice for this use case.\n\n\
        `AWS Storage Gateway volumes` - This is an incorrect choice, given only as a distractor.",
    },
    {
        term: "rolling-deployment-in-elastic-beanstalk-environment",
        prompt: "When running a Rolling deployment in Elastic Beanstalk environment, only two batches completed the deployment successfully, while rest of the batches failed to deploy the updated version.\
        Following this, the development team terminated the instances from the failed deployment.  \n\
        What will be the status of these failed instances post termination?\n\n\
        - Elastic Beanstalk will not replace the failed instances     \n\
        - Elastic Beanstalk will replace the failed instances with instances running the application version from the oldest successful deployment     \n\
        - Elastic Beanstalk will replace the failed instances with instances running the application version from the most recent successful deployment (Correct)     \n\
        - Elastic Beanstalk will replace the failed instances after the application version to be installed is manually chosen from AWS Console",
        example: ":m Elastic Beanstalk will replace them with `instances running the application version` from the most recent successful deployment      \n\
        When processing a batch, Elastic Beanstalk detaches all instances in the batch from the load balancer, deploys `the new application version`, and then reattaches the instances. If you enable connection draining,\
        Elastic Beanstalk drains existing connections from the Amazon EC2 instances in each batch before `beginning the deployment`.  \
        If a deployment `fails after one or more batches completed successfully`, the completed batches run the `new version of your application` while any `pending batches continue to run the old version`.\
        You can identify the version running on the instances in your environment on the health page in the console. This page displays the deployment `ID of the most recent deployment` that was executed on `each instance in your environment`. \
        If you terminate instances from the failed deployment, Elastic Beanstalk replaces them with instances running the `application version` from the most recent successful deployment.",
        description: "Incorrect options:\n\
        - Elastic Beanstalk will not replace the failed instances  \n\n\
        - Elastic Beanstalk will replace the failed instances with instances running the application version from the oldest successful deployment  \n\n\
        - Elastic Beanstalk will replace the failed instances after the application version to be installed is manually chosen from AWS Console"
    },
    {
        term: "best-kms-encryption-works",
        prompt: "Which of the following best describes how KMS Encryption works?\n\
        - KMS stores the CMK, and receives data from the clients, which it encrypts and sends back\n\
        - KMS receives CMK from the client at every encrypt call, and encrypts the data with that\n\
        - KMS sends the CMK to the client, which performs the encryption and then deletes the CMK\n\
        - KMS generates a new CMK for each Encrypt call and encrypts the data with it ",
        example: ":m `KMS stores the CMK`, and `receives data` from the clients, which it encrypts and sends back   \n\
        A customer master key (CMK) is a logical representation of a master key. The CMK `includes metadata`, such as the key ID, creation date, description, and key state. The CMK also contains the `key material` used to `encrypt and decrypt data`. \n\
        You can generate `CMKs in KMS`, in an `AWS CloudHSM cluster`, or import them from your key management infrastructure.  AWS KMS supports symmetric and asymmetric CMKs. A `symmetric CMK` represents a `256-bit` key that is used for encryption and decryption. \n\
        An asymmetric CMK represents an `RSA key pair` that is used for encryption and decryption or signing and verification (but not both), or an `elliptic curve (ECC)` key pair that is used for `signing and verification`.  \n\
        AWS KMS supports three types of CMKs: customer-managed CMKs, `AWS managed CMKs, and AWS owned CMKs`.",
        description: "Incorrect options:  \n\
        - KMS receives CMK from the client at every encrypt call, and encrypts the data with that \n\n\
        - You can import your own CMK (Customer Master Key) but it is done once and then you can encrypt/decrypt as needed.  KMS sends the CMK to the client, which performs the encryption and then deletes the CMK \n\n\
        - KMS does not send CMK to the client, KMS itself encrypts, and then decrypts the data.  KMS generates a new CMK for each Encrypt call and encrypts the data with it \n\n\
        - KMS does not generate a new key each time but you can have `KMS rotate the keys` for you. Best practices discourage extensive reuse of `encryption keys so it is good practice` to generate new keys.",
        attachment: "./img/2023-04-21-20-50-11.png"
    },
    {
        term: "debug-trace-data-across-accounts",
        prompt: "A multi-national company has multiple business units with each unit having its own AWS account. \
        The development team at the company would like to debug and trace data across accounts and visualize it in a centralized account.\n\n\
        Suggest a way to debug and trace data across accounts\n\n\
        - VPC Flow Logs     \n\
        - CloudWatch Events    \n\
        - CloudTrail     \n\
        - X-Ray",
        example: ":m `X-Ray`  AWS X-Ray helps developers analyze and debug production, distributed applications, such as those built using a microservices architecture. With X-Ray, \
        you can understand how your application and its underlying services are performing to identify and troubleshoot the root cause of performance `issues and errors`. \
        X-Ray provides an end-to-end view of requests as they travel through your application, and shows a map of your applications underlying components.  \
        You can use X-Ray to collect data across AWS Accounts. The X-Ray agent can assume a role to publish data into `an account different from the one` in which it is running.\
        This enables you to publish data from various components of your application into a `central account`.",
        attachment: "./img/2023-04-21-20-57-33.png",
        descrription: "Incorrect options: \n\
        + `VPC Flow Logs`: VPC Flow Logs is a feature that enables you to `capture information` about the `IP traffic` going to and from network interfaces in your VPC. \
        Flow log data is used to analyze network traces and helps with network security. \n\Flow log data can be published to Amazon CloudWatch Logs or Amazon S3. You cannot use VPC Flow Logs to debug and trace data across accounts.  \n\n\
        + `CloudWatch Events`: Amazon CloudWatch Events delivers a near `real-time stream` of system events that describe `changes` in Amazon Web Services \
        (AWS) resources. These help to trigger notifications based on changes happening in AWS services. You cannot use CloudWatch Events to debug and trace data across accounts.  \n\n\
        + `CloudTrail`: With CloudTrail, you can log, continuously monitor, and retain account activity related to actions across your AWS infrastructure. You can use AWS CloudTrail to answer questions such as \
        - “Who made an API call to modify this resource?”. CloudTrail provides `event history` of your AWS account activity thereby `enabling governance, compliance, operational auditing, and risk auditing` of your AWS account. \
        You cannot use CloudTrail to debug and trace data across accounts."
    },
    {
        term: "cdk-steps-creating-app",
        prompt: "As a developer, you are working on creating an application using AWS Cloud Development Kit (CDK).\n\
        Which of the following represents the correct order of steps to be followed for creating an app using `AWS CDK`?",
        example: ":m Create the app from a template provided by AWS CDK \n\
        -> Add code to the app to create resources within stacks \n\
        -> Build the app (optional) \n\
        -> Synthesize one or more stacks in the app \n\
        -> Deploy stack(s) to your AWS account\n\n\
        \n\
        The standard AWS CDK development workflow is similar to the workflow you're already familiar as a developer. There are a few extra steps: Create the app from a template provided by AWS CDK \
        - Each AWS CDK app should be in its own directory, with its own local module dependencies. Create a new directory for your app. Now initialize the app using the cdk init command, specifying the desired template and programming language.\
        The cdk init command creates a number of files and folders inside the created home directory to help you organize the source code for your AWS CDK app. Add code to the app to create resources within stacks \
        - Add custom code as is needed for your application. Build the app (optional) - In most programming environments, after making changes to your code, you'd build (compile) it. \
        This isn't strictly necessary with the AWS CDK—the Toolkit does it for you so you can't forget. But you can still build manually whenever you want to catch syntax and type errors. \
        Synthesize one or more stacks in the app to create an AWS CloudFormation template - Synthesize one or more stacks in the app to create an AWS CloudFormation template. \
        The synthesis step catches logical errors in defining your AWS resources. If your app contains more than one stack, you'd need to specify which stack(s) to synthesize. \n\
        Deploy one or more stacks to your AWS account - It is optional (though good practice) to synthesize before deploying. The AWS CDK synthesizes your stack before each deployment. \
        If your code has security implications, you'll see a summary of these and need to confirm them before deployment proceeds. cdk deploy is used to deploy the stack using CloudFormation templates. \
        This command displays progress information as your stack is deployed. When it's done, the command prompt reappears.",
        description: `The standard AWS CDK development workflow is similar to the workflow you're already familiar as a developer. \n\
        There are a few extra steps: Create the app from a template provided by AWS CDK - Each AWS CDK app should be in its own directory, with its own local module dependencies. \n\
        Create a new directory for your app. Now initialize the app using the cdk init command, specifying the desired template ("app") and programming language. \n\
        The cdk init command creates a number of files and folders inside the created home directory to help you organize the source code for your AWS CDK app. \n\
        Add code to the app to create resources within stacks - Add custom code as is needed for your application. Build the app (optional) - In most programming environments, \n\
        after making changes to your code, you'd build (compile) it. This isn't strictly necessary with the AWS CDK—the Toolkit does it for you so you can't forget. \n\
        But you can still build manually whenever you want to catch syntax and type errors. Synthesize one or more stacks in the app to create an AWS CloudFormation template - Synthesize one or more stacks in the app to create an AWS CloudFormation template. \n\
        The synthesis step catches logical errors in defining your AWS resources. If your app contains more than one stack, you'd need to specify which stack(s) to synthesize. \n\
        Deploy one or more stacks to your AWS account - It is optional (though good practice) to synthesize before deploying. The AWS CDK synthesizes your stack before each deployment.\n\
         If your code has security implications, you'll see a summary of these and need to confirm them before deployment proceeds. cdk deploy is used to deploy the stack using CloudFormation templates. \n\
         This command displays progress information as your stack is deployed. When it's done, the command prompt reappears.` +
            "Incorrect options: Create the app from a template provided by AWS CloudFormation -> Add code to the app to create resources within stacks -> Build the app (optional) -> Synthesize one or more stacks in the app -> Deploy stack(s) to your AWS account Create the app from a template provided by AWS CloudFormation -> Add code to the app to create resources within stacks -> Synthesize one or more stacks in the app -> Deploy stack(s) to your AWS account -> Build the app For both these options, you cannot use AWS CloudFormation to create the app. So these options are incorrect. Create the app from a template provided by AWS CDK -> Add code to the app to create resources within stacks -> Synthesize one or more stacks in the app -> Deploy stack(s) to your AWS account -> Build the app - You cannot have the build step after deployment. So this option is incorrect."
    },
    {
        term: "represent-easiest-solution-to-address-this-use-case",
        prompt: "A company has built its technology stack on AWS serverless architecture for managing all its business functions. To expedite development for a new business requirement, the company is looking at using pre-built serverless applications. \n\
        Which AWS service represents the easiest solution to address this use-case?\n\
        AWS Serverless Application Repository (SAR)\n\
        AWS AppSync\n\
        AWS Service Catalog\n\
        AWS Marketplace",
        example: ":m AWS Serverless Application Repository (SAR) - The AWS Serverless Application Repository is a managed repository for serverless applications. It enables teams, organizations, and individual developers to store and share reusable applications, \
        and easily assemble and deploy serverless architectures in powerful new ways. Using the Serverless Application Repository, you don't need to clone, build, package, or publish source code to AWS before deploying it.\
         Instead, you can use pre-built applications from the Serverless Application Repository in your serverless architectures, helping you and your teams reduce duplicated work, ensure organizational best practices, and get to market faster. \
         Integration with AWS Identity and Access Management (IAM) provides resource-level control of each application, enabling you to publicly share applications with everyone or privately share them with specific AWS accounts.",
        attachment: "./img/2023-04-22-20-51-11.png",
        description: ":m Incorrect options: \n\
        + `AWS Marketplace` - The AWS Marketplace enables qualified partners to market and sell their software to AWS Customers. AWS Marketplace is an online software store that helps customers find, buy, and immediately start using the software and services that run on AWS.\n\n\
        AWS `Marketplace is designed for Independent Software Vendors` (ISVs), Value-Added Resellers (VARs), and Systems Integrators (SIs) who have software products they want to offer to customers in the cloud. \n\n\
        + `AWS AppSync` - AWS AppSync is a fully managed service that makes it easy to develop GraphQL APIs by handling the heavy lifting of securely connecting to data sources like AWS DynamoDB, Lambda, and more. Organizations choose to build APIs with GraphQL because it helps them develop applications faster, \
        by giving front-end developers the ability to query multiple databases, microservices, and APIs with a single GraphQL endpoint.\n\n\
        + `AWS Service Catalog`- AWS Service Catalog allows organizations to create and manage catalogs of IT services that are approved for use on AWS. These IT services can include everything from virtual machine images, servers, software, and databases to complete multi-tier application architectures. AWS Service Catalog allows you to centrally manage deployed IT services and your applications, resources, and metadata. This helps you achieve consistent governance and meet your compliance requirements while enabling users to quickly deploy only the approved IT services they need."
    },
    {
        term: "address-these-requirements-without-additional-application-code",
        prompt: "A global e-commerce company wants to perform geographic load testing of its order processing API. The company must deploy resources to multiple AWS Regions to support the load testing of the API.\n\
        How can the company address these requirements without additional application code?",
        description: ":m `AWS CloudFormation StackSets` extends the capability of stacks by enabling you to create, update, or delete stacks across multiple accounts and AWS Regions with a single operation. Using an administrator account, you define and manage an AWS CloudFormation template, \
        and use the template as the basis for provisioning stacks into selected `target accounts across specified AWS Regions`.",
        example: "Set up an AWS CloudFormation template that defines the load test resources. Leverage the `AWS CLI create-stack-set` command to create a stack set in the desired Regions",
        attachment: "./img/2023-04-23-02-21-11.png",
    },
    {
        term: "aws-entities-that-can-be-used-to-deploy-ssl-tls-server-certificates",
        prompt: "To enable HTTPS connections for his web application deployed on the AWS Cloud, a developer is in the process of creating server certificate.  \n\
        Which AWS entities can be used to deploy SSL/TLS server certificates? (Select two)\n\
        - AWS Certificate Manager (ACM)\n\
        - AWS Secrets Manager\n\
        - AWS Identity and Access Management (IAM)\n\
        - AWS Key Management Service (KMS)\n\
        - AWS CloudFormation",
        example: ":m AWS Certificate Manager (ACM) (Correct)\n\AWS Identity and Access Management (IAM) (Correct)\n\n\
        - AWS Certificate Manager - AWS Certificate Manager (ACM) is the preferred tool to provision, manage, and deploy server certificates. With ACM you can request a certificate or deploy an existing ACM or external certificate to AWS resources. \
        Certificates provided by ACM are free and automatically renew. In a supported Region, you can use ACM to manage server certificates from the console or programmatically.  \n\n\
        - IAM - IAM is used as a certificate manager only when you must support HTTPS connections in a Region that is not supported by ACM.\
        IAM securely encrypts your private keys and stores the encrypted version in IAM SSL certificate storage. IAM supports deploying server certificates in all Regions, but you must obtain your certificate from an external provider for use with AWS. \
        You cannot upload an ACM certificate to IAM. Additionally, you cannot manage your certificates from the IAM Console.",
        description: ":m Incorrect options:  \n\
        `AWS Secrets Manager` - AWS Secrets Manager helps you protect secrets needed to access your applications, services, and IT resources. The service enables you to easily rotate, manage, and retrieve database credentials, API keys, and other secrets throughout their lifecycle.\
             Users and applications retrieve secrets with a call to Secrets Manager APIs, eliminating the need to hardcode sensitive information in plain text. It cannot be used to discover and protect your sensitive data in AWS.  \n\n\
        `AWS Systems Manager` - AWS Systems Manager gives you visibility and control of your infrastructure on AWS. Systems Manager provides a unified user interface so you can view operational data from multiple AWS services and allows you to automate operational tasks such as running commands, managing patches, and configuring servers across AWS Cloud as well as on-premises infrastructure.  \n\
        `AWS CloudFormation` - AWS CloudFormation allows you to use programming languages or a simple text file to model and provision, in an automated and secure manner, all the resources needed for your applications across all Regions and accounts. Think infrastructure as code; `think CloudFormation`. You cannot use CloudFormation for running commands or managing patches on servers."
    },
    {
        term: "beta-access-to-the-new-version-of-the-api-without-causing-any-disturbance-to-the-existing-customers",
        prompt: "A company wants to provide beta access to some developers on its development team for a new version of the company's Amazon API Gateway REST API,\
         without causing any disturbance to the existing customers who are using the API via a frontend UI and Amazon Cognito authentication. The new version has new endpoints\
         and backward-incompatible interface changes, and the company's development team is responsible for its maintenance. \n\
         Design a way to provide beta access to the new version of the API without causing any disturbance to the existing customers.",
        example: ":m Create a `development stage` on the API Gateway API and then have the `developers point the endpoints to the development stage`",
        attachment: "./img/2023-04-24-09-26-10.png",
        description: ":m A stage is a `logical reference` to a lifecycle state of your API (for example, 'dev', 'prod', 'beta', 'v2'). \
        `API stages` are identified by `API ID` and `stage name`. You use a stage to manage and optimize a particular deployment. \
        For example, you can configure stage settings to enable `caching`, customize `request throttling`, `configure logging, define stage variables`, \
        or attach a `canary release` for testing. After the initial deployment, you can add more stages and `associate` them with `existing deployments`. \
        You can use the API Gateway console to create a new stage, or you can choose an existing stage while deploying an API. \
        In general, you can add a new stage to an API deployment before `redeploying the API`.  For the given use case, you can configure a development stage for \
        your API Gateway API and then integrate it with the new version of the backend functionality that has new endpoints and backward-incompatible interface changes.\
         The customers can continue to use the existing API.\n\
        \nIncorrect options:  \n\
        Configure a `canary release deployment` on the API Gateway API and then have the developers point to the relevant deployment by referencing the stage variable in the\
         endpoint - An API deployment is a point-in-time snapshot of your API Gateway API. To be available for clients to use, the deployment must be associated with \
         `one or more API stages`. Canary release is a software development strategy in which a `new version of an API`(as well as other software) is deployed for testing \
         purposes, and the `base version remains deployed as a production release for normal operations on the same stage`.\
          In a `canary release deployment`, `total API traffic` is `separated at random into a production release` and a canary release with a pre-configured ratio. \
          Typically, the canary release receives a small percentage of API traffic and the production release takes up the rest. \
          The updated API features are only visible to API traffic through the canary. You can adjust the canary traffic percentage to optimize test coverage or performance. \
          By keeping canary traffic small and the selection random, most users are not `adversely affected` at any time by `potential bugs` in the new version, and no single \
          user is adversely affected all the time.  This option is incorrect for the given use case as `some of the customers would also access the new version of the API`.\n\n\
        Create new API keys on the API Gateway API and then have the developers point the endpoints by passing the new API keys - AN API key is an alphanumeric string that API Gateway uses to identify an app developer who uses your REST or WebSocket API. This option is a distractor as you cannot selectively provide access to the new version just based on API keys.  Create a new API Gateway API that points to the new API application code and then have the developers point the endpoints to the new API - This is an overkill for the given requirement as there is no need to create a completely new API just to provide some developers early access to the beta version."
    },
    {
        term: "invalid-section-of-the-cloudformation-template",
        prompt: "The Technical Lead of your team has reviewed a CloudFormation YAML template written by a new recruit and specified that an invalid section has\
         been added to the template.\n\
         Which of the following represents an invalid section of the CloudFormation template?  \n\n\
        Resources | Parameters | Dependencies | Conditions",
        example: "Resources: Templates include several major sections. The Resources section is the only required section.",
        attachment: "./img/2023-04-24-09-31-13.png",
        description: ":m Incorrect options:  \n\
        `Conditions` section of the template - This optional section includes conditions that control whether certain resources are created or whether \
        certain resource properties are assigned a value during stack creation or update. For example, you could conditionally create a resource that depends on \
        whether the stack is for a production or test environment.  \n\n\
        `Resources` section of the template - This is the only required section and specifies the stack resources and their properties, such as an Amazon Elastic \
        Compute Cloud instance or an Amazon Simple Storage Service bucket. You can refer to `resources in the Resources` and `Outputs sections of the template`.\n\n\
        `Parameters` section of the template - This optional section is helpful in passing Values to your template `at runtime` (when you create or update a stack). \
        You can refer to parameters from the `Resources and Outputs sections of the template`."
    },
    {
        term: "credential-types-is-not-supported-by-iam-for-codecommit",
        prompt: "CodeCommit is a managed version control service that hosts private Git repositories in the AWS cloud.\n\
        Which of the following credential types is NOT supported by IAM for CodeCommit?\n\n\
        IAM Username and password | Git credentials | SSH keys | AWS access keys",
        example: "IAM username and password - IAM username and password credentials cannot be used to access CodeCommit.",
        description: ":m Incorrect options:  \n\
        `Git credentials` - These are IAM -generated user name and password pair you can use to communicate with CodeCommit repositories over HTTPS.\n\n\
        `SSH Keys` - Are locally generated public-private key pair that you can associate with your IAM user to communicate with CodeCommit repositories over SSH. \n\n\
        `AWS access keys` - You can use these keys with the credential helper included with the AWS CLI to communicate with CodeCommit repositories over HTTPS."
    },
    {
        prompt: "A company is creating a gaming application that will be deployed on mobile devices. The application will send data to a Lambda function-based RESTful API. The application will assign each API request a unique identifier. The volume of API requests from the application can randomly vary at any given time of day. During request throttling, the application might need to retry requests. The API must be able to address duplicate requests without inconsistencies or data loss.\n\n\
        Which of the following would you recommend to handle these requirements?",
        example: "Persist the unique identifier for each request in a DynamoDB table. Change the Lambda function to check the table for the identifier before processing the request  DynamoDB is a fully managed, serverless, key-value NoSQL database designed to run high-performance applications at any scale. DynamoDB offers built-in security, continuous backups, automated multi-Region replication, in-memory caching, and data import and export tools. On-demand backup and restore allows you to create full backups of your DynamoDB. Point-in-time recovery (PITR) helps protect your DynamoDB tables from accidental write or delete operations. PITR provides continuous backups of your DynamoDB table data, and you can restore that table to any point in time up to the second during the preceding 35 days.  These features ensure that there is no data loss for the application, thereby meeting a key requirement for the given use case. The solution should also be able to address any duplicate requests without inconsistencies, so the Lambda function should be changed to inspect the table for the given identifier and process the request only if the identifier is unique.",
        attachment: "./img/2023-04-24-09-36-32.png",
        description: "Incorrect options:  Persist the unique identifier for each request in an ElastiCache for Memcached cache. Change the Lambda function to check the cache for the identifier before processing the request - Memcached is designed for simplicity and it does not offer any snapshot or replication features. This can lead to data loss for applications. Therefore, this option is not the right fit for the given use case.\n\
        Persist the unique identifier for each request in an RDS MySQL table. Change the Lambda function to check the table for the identifier before processing the request - DynamoDB is a better fit than RDS MySQL to handle massive traffic spikes for write requests. DynamoDB is a key-value and document database that supports tables of virtually any size with horizontal scaling. DynamoDB scales to more than 10 trillion requests per day and with tables that have more than ten million read and write requests per second and petabytes of data storage. DynamoDB can be used to build applications that need consistent single-digit millisecond performance. MySQL RDS can be scaled vertically, however, it cannot match the performance benefits offered by DynamoDB for the given use case.  Persist the unique identifier for each request in a DynamoDB table. Change the Lambda function to send a client error response when the function receives a duplicate request - The solution should be able to address any duplicates without any inconsistencies. If Lambda sends a client error response upon receiving a duplicate request, it represents an inconsistent response. So this option is incorrect."
    },
    {
        prompt: "A development team at a social media company uses AWS Lambda for its serverless stack on AWS Cloud. For a new deployment, the Team Lead wants to send only a certain portion of the traffic to the new Lambda version. In case the deployment goes wrong, the solution should also support the ability to roll back to a previous version of the Lambda function, with MIMINUM downtime for the application.   As a Developer Associate, which of the following options would you recommend to address this use-case?",
        example: "Set up the application to use an alias that points to the current version. Deploy the new version of the code and configure the alias to send 10% of the users to this new version. If the deployment goes wrong, reset the alias to point all traffic to the current version  You can use versions to manage the deployment of your AWS Lambda functions. For example, you can publish a new version of a function for beta testing without affecting users of the stable production version. You can change the function code and settings only on the unpublished version of a function. When you publish a version, the code and most of the settings are locked to ensure a consistent experience for users of that version.  You can create one or more aliases for your AWS Lambda function. A Lambda alias is like a pointer to a specific Lambda function version. You can use routing configuration on an alias to send a portion of traffic to a Lambda function version. For example, you can reduce the risk of deploying a new version by configuring the alias to send most of the traffic to the existing version, and only a small percentage of traffic to the new version.",
        attachment: "./img/2023-04-24-09-40-21.png",
        description: "Incorrect Options: Set up the application to use an alias that points to the current version. Deploy the new version of the code and configure alias to send all users to this new version. If the deployment goes wrong, reset the alias to point to the current version - In this case, the application uses an alias to send all traffic to the new version which does not meet the requirement of sending only a certain portion of the traffic to the new Lambda version. In addition, if the deployment goes wrong, the application would see a downtime. Hence this option is incorrect.  Set up the application to directly deploy the new Lambda version. If the deployment goes wrong, reset the application back to the current version using the version number in the ARN - In this case, the application sends all traffic to the new version which does not meet the requirement of sending only a certain portion of the traffic to the new Lambda version. In addition, if the deployment goes wrong, the application would see a downtime. Hence this option is incorrect.  Set up the application to have multiple alias of the Lambda function. Deploy the new version of the code. Configure a new alias that points to the current alias of the Lambda function for handling 10% of the traffic. If the deployment goes wrong, reset the new alias to point all traffic to the most recent working alias of the Lambda function - This option has been added as a distractor. The alias for a Lambda function can only point to a Lambda function version. It cannot point to another alias."
    },
    {
        prompt: "You have deployed a Java application to an EC2 instance where it uses the X-Ray SDK. When testing from your personal computer, the application sends data to X-Ray but when the application runs from within EC2, the application fails to send data to X-Ray.  Provide 3 ways of debugging the issue.",
        example: "EC2 X-Ray Daemon - The AWS X-Ray daemon is a software application that listens for traffic on UDP port 2000, gathers raw segment data, and relays it to the AWS X-Ray API. The daemon logs could help with figuring out the problem.  \n\
        EC2 Instance Role - The X-Ray daemon uses the AWS SDK to upload trace data to X-Ray, and it needs AWS credentials with permission to do that. On Amazon EC2, the daemon uses the instance's instance profile role automatically. Eliminates API permission issues (in case the role doesn't have IAM permissions to write data to the X-Ray service)  \n\
        CloudTrail - With CloudTrail, you can log, continuously monitor, and retain account activity related to actions across your AWS infrastructure. You can use AWS CloudTrail to answer questions such as - “Who made an API call to modify this resource?”. CloudTrail provides event history of your AWS account activity thereby enabling governance, compliance, operational auditing, and risk auditing of your AWS account. You can check CloudTrail to see if any API call is being denied on X-Ray.",
        attachment: "./img/2023-04-24-09-44-35.png",
        description: "Incorrect: X-Ray sampling  By customizing sampling rules, you can control the amount of data that you record, and modify sampling behavior on the fly without modifying or redeploying your code. Sampling rules tell the X-Ray SDK how many requests to record for a set of criteria. X-Ray SDK applies a sampling algorithm to determine which requests get traced however because our application is failing to send data to X-Ray it does not help in determining the cause of failure."
    },
    {
        prompt: "As an AWS Certified Developer Associate, you have been asked to create an AWS Elastic Beanstalk environment to handle deployment for an application that has high traffic and high availability needs. You need to deploy the new version using Beanstalk while making sure that performance and availability are not affected.\n\n\
        Design an optimal way to do this while keeping the solution cost-effective?",
        attachment: "./img/2023-04-24-09-48-22.png",
        example: "AWS Elastic Beanstalk offers several deployment policies and settings. Choosing the right deployment policy for your application is a tradeoff based on a few considerations and depends on your business needs.\n\
        \nDeploy using 'Rolling with additional batch' deployment policy - With this method, Elastic Beanstalk launches an extra batch of instances, then performs a rolling deployment. Launching the extra batch takes time, and ensures that the same bandwidth is retained throughout the deployment. This policy also avoids any reduced availability, although at a cost of an even longer deployment time compared to the Rolling method. Finally, this option is suitable if you must maintain the same bandwidth throughout the deployment.",
        description: "Incorrect options: Deploy using 'Immutable' deployment policy - A slower deployment method, that ensures your new application version is always deployed to new instances, instead of updating existing instances. It also has the additional advantage of a quick and safe rollback in case the deployment fails. With this method, Elastic Beanstalk performs an immutable update to deploy your application. In an immutable update, a second Auto Scaling group is launched in your environment and the new version serves traffic alongside the old version until the new instances pass health checks.  Deploy using 'All at once' deployment policy - This is the quickest deployment method. Suitable if you can accept a short loss of service, and if quick deployments are important to you. With this method, Elastic Beanstalk deploys the new application version to each instance. Then, the web proxy or application server might need to restart. As a result, your application might be unavailable to users (or have low availability) for a short time.  Deploy using 'Rolling' deployment policy - With this method, your application is deployed to your environment one batch of instances at a time. Most bandwidth is retained throughout the deployment. Avoids downtime and minimizes reduced availability, at a cost of a longer deployment time. Suitable if you can't accept any period of completely lost service. The use case states that the application has high traffic and high availability requirements, so full capacity must be maintained during deployments, hence rolling with additional batch deployment is a better fit than the rolling deployment."

    },
    {
        prompt: "Your global organization has an IT infrastructure that is deployed using CloudFormation on AWS Cloud. One employee, in us-east-1 Region, has created a stack 'Application1' and made an exported output with the name 'ELBDNSName'. Another employee has created a stack for a different application 'Application2' in us-east-2 Region and also exported an output with the name 'ELBDNSName'. The first employee wanted to deploy the CloudFormation stack 'Application1' in us-east-2, but it got an error. What is the cause of the error?",
        example: `"Exported Output Values in CloudFormation must have unique names within a single Region"  Using CloudFormation, you can create a template that describes all the AWS resources that you want (like Amazon EC2 instances or Amazon RDS DB instances), and AWS CloudFormation takes care of provisioning and configuring those resources for you.  A CloudFormation template has an optional Outputs section which declares output values that you can import into other stacks (to create cross-stack references), return in response (to describe stack calls), or view on the AWS CloudFormation console. For example, you can output the S3 bucket name for a stack to make the bucket easier to find.  You can use the Export Output Values to export the name of the resource output for a cross-stack reference. For each AWS account, export names must be unique within a region. In this case, we would have a conflict within us-east-2.`,
        attachment: "./img/2023-04-24-10-04-14.png",
        description: "Using CloudFormation, you can create a template that describes all the AWS resources that you want (like Amazon EC2 instances or Amazon RDS DB instances), and AWS CloudFormation takes care of provisioning and configuring those resources for you.  A CloudFormation template has an optional Outputs section which declares output values that you can import into other stacks (to create cross-stack references), return in response (to describe stack calls), or view on the AWS CloudFormation console. For example, you can output the S3 bucket name for a stack to make the bucket easier to find.  You can use the Export Output Values to export the name of the resource output for a cross-stack reference. For each AWS account, export names must be unique within a region. In this case, we would have a conflict within us-east-2."
    },
    {
        prompt: "A multi-national company has just moved to AWS Cloud and it has configured forecast-based AWS Budgets alerts for cost management. However, no alerts have been received even though the account and the budgets have been created almost three weeks ago.  What could be the issue with the AWS Budgets configuration?",
        example: "Correct option:  AWS Budgets lets customers set custom budgets and receive alerts if their costs or usage exceed (or are forecasted to exceed) their budgeted amount.",
        description: "AWS requires approximately 5 weeks of usage data to generate budget forecasts - AWS requires approximately 5 weeks of usage data to generate budget forecasts. If you set a budget to alert based on a forecasted amount, this budget alert isn't triggered until you have enough historical usage information." + `Incorrect options:  Budget forecast has been created from an account that does not have enough privileges - This is an incorrect statement. If the user account does not have enough privileges, the user will not be able to create the budget at all.  Amazon CloudWatch could be down and hence alerts are not being sent - Amazon CloudWatch is fully managed by AWS, this option has been added as a distractor.  Account has to be part of AWS Organizations to receive AWS Budget alerts - This is an incorrect statement. Stand-alone accounts too can create budgets and being part of an Organization is not mandatory to use AWS Budgets.`
    },
    {
        prompt: "A development team has configured inbound traffic for the relevant ports in both the Security Group of the EC2 instance as well as the Network Access Control List (NACL) of the subnet for the EC2 instance. The team is, however, unable to connect to the service running on the Amazon EC2 instance.\n\n\
        Ideate a possible fix for this issue",
        example: "Security Groups are stateful, so allowing inbound traffic to the necessary ports enables the connection. Network ACLs are stateless, so you must allow both inbound and outbound traffic - Security groups are stateful, so allowing inbound traffic to the necessary ports enables the connection. Network ACLs are stateless, so you must allow both inbound and outbound traffic.",
        description: "To enable the connection to a service running on an instance, the associated network ACL must allow both inbound traffic on the port that the service is listening on as well as allow outbound traffic from ephemeral ports. When a client connects to a server, a random port from the ephemeral port range (1024-65535) becomes the client's source port.  The designated ephemeral port then becomes the destination port for return traffic from the service, so outbound traffic from the ephemeral port must be allowed in the network ACL.  By default, network ACLs allow all inbound and outbound traffic. If your network ACL is more restrictive, then you need to explicitly allow traffic from the ephemeral port range.  If you accept traffic from the internet, then you also must establish a route through an internet gateway. If you accept traffic over VPN or AWS Direct Connect, then you must establish a route through a virtual private gateway.\n\n\
        Incorrect options:  Network ACLs are stateful, so allowing inbound traffic to the necessary ports enables the connection. Security Groups are stateless, so you must allow both inbound and outbound traffic - This is incorrect as already discussed.  IAM Role defined in the Security Group is different from the IAM Role that is given access in the Network ACLs - This is a made-up option and just added as a distractor.  Rules associated with Network ACLs should never be modified from the command line. An attempt to modify rules from the command line blocks the rule and results in an erratic behavior - This option is a distractor. AWS does not support modifying rules of Network ACLs from the command line tool."
    },
    {
        prompt: "A media company has created a video streaming application and it would like their Brazilian users to be served by the company's Brazilian servers. Other users around the globe should not be able to access the servers through DNS queries.  Which Route 53 routing policy meets this requirement?\n\
        \n\
        Weighted | Failover | latency | Geolocation",
        example: `Geolocation  Geolocation routing lets you choose the resources that serve your traffic based on the geographic location of your users, meaning the location that DNS queries originate from. For example, you might want all queries from Europe to be routed to an ELB load balancer in the Frankfurt region. You can also use geolocation routing to restrict distribution of content to only the locations in which you have distribution rights  You can create a default record that handles both queries from IP addresses that aren't mapped to any location and queries that come from locations that you haven't created geolocation records for. If you don't create a default record, Route 53 returns a "no answer" response for queries from those locations.`,
        attachment: "./img/2023-04-24-10-12-59.png",
        description: "Incorrect options: Failover - Failover routing lets you route traffic to a resource when the resource is healthy or to a different resource when the first resource is unhealthy.  Latency - If your application is hosted in multiple AWS Regions, you can improve performance for your users by serving their requests from the AWS Region that provides the lowest latency.  Weighted - Use this policy to route traffic to multiple resources in proportions that you specify."
    },
    {
        prompt: "A Developer has been entrusted with the job of securing certain S3 buckets that are shared by a large team of users. Last time, a bucket policy was changed, the bucket was erroneously available for everyone, outside the organization too.  \n\
        Which feature/service will help the developer identify similar security issues with minimum effort?",
        example: "IAM Access Analyzer - AWS IAM Access Analyzer helps you identify the resources in your organization and accounts, such as Amazon S3 buckets or IAM roles, that are shared with an external entity. This lets you identify unintended access to your resources and data, which is a security risk.  You can set the scope for the analyzer to an organization or an AWS account. This is your zone of trust. The analyzer scans all of the supported resources within your zone of trust. When Access Analyzer finds a policy that allows access to a resource from outside of your zone of trust, it generates an active finding.",
        description: `Incorrect options:  Access Advisor feature on IAM console - To help identify the unused roles, IAM reports the last-used timestamp that represents when a role was last used to make an AWS request. Your security team can use this information to identify, analyze, and then confidently remove unused roles. This helps improve the security posture of your AWS environments. This does not provide information about non-IAM entities such as S3, hence it's not a correct choice here.  S3 Object Lock - S3 Object Lock enables you to store objects using a "Write Once Read Many" (WORM) model. S3 Object Lock can help prevent accidental or inappropriate deletion of data, it is not the right choice for the current scenario.  S3 Analytics - By using Amazon S3 analytics Storage Class Analysis you can analyze storage access patterns to help you decide when to transition the right data to the right storage class. You cannot use S3 Analytics to identify unintended access to your S3 resources.`
    },
    {
        prompt: "An e-commerce company has developed an API that is hosted on Amazon ECS. Variable traffic spikes on the application are causing order processing to take too long. The application processes orders using Amazon SQS queues. The ApproximateNumberOfMessagesVisible metric spikes at very high values throughout the day which triggers the CloudWatch alarm. Other ECS metrics for the API containers are well within limits.\n\
        Design a way to improve performance while keeping cost low",
        example: "Use backlog per instance metric with target tracking scaling policy - If you use a target tracking scaling policy based on a custom Amazon SQS queue metric, dynamic scaling can adjust to the demand curve of your application more effectively.  The issue with using a CloudWatch Amazon SQS metric like ApproximateNumberOfMessagesVisible for target tracking is that the number of messages in the queue might not change proportionally to the size of the Auto Scaling group that processes messages from the queue. That's because the number of messages in your SQS queue does not solely define the number of instances needed. The number of instances in your Auto Scaling group can be driven by multiple factors, including how long it takes to process a message and the acceptable amount of latency (queue delay).  The solution is to use a backlog per instance metric with the target value being the acceptable backlog per instance to maintain. You can calculate these numbers as follows:  Backlog per instance: To calculate your backlog per instance, start with the ApproximateNumberOfMessages queue attribute to determine the length of the SQS queue (number of messages available for retrieval from the queue). Divide that number by the fleet's running capacity, which for an Auto Scaling group is the number of instances in the InService state, to get the backlog per instance.  Acceptable backlog per instance: To calculate your target value, first determine what your application can accept in terms of latency. Then, take the acceptable latency value and divide it by the average time that an EC2 instance takes to process a message.  To illustrate with an example, let's say that the current ApproximateNumberOfMessages is 1500 and the fleet's running capacity is 10. If the average processing time is 0.1 seconds for each message and the longest acceptable latency is 10 seconds, then the acceptable backlog per instance is 10 / 0.1, which equals 100. This means that 100 is the target value for your target tracking policy. If the backlog per instance is currently at 150 (1500 / 10), your fleet scales out, and it scales out by five instances to maintain proportion to the target value.",
        description: "Incorrect options:  Use Docker swarm - A Docker swarm is a container orchestration tool, meaning that it allows the user to manage multiple containers deployed across multiple host machines. A swarm consists of multiple Docker hosts which run in swarm mode and act as managers (to manage membership and delegation) and workers (which run swarm services).  Use ECS service scheduler - Amazon ECS provides a service scheduler (for long-running tasks and applications), the ability to run tasks manually (for batch jobs or single run tasks), with Amazon ECS placing tasks on your cluster for you. You can specify task placement strategies and constraints that allow you to run tasks in the configuration you choose, such as spread out across Availability Zones. It is also possible to integrate with custom or third-party schedulers.  Use ECS step scaling policy - Although Amazon ECS Service Auto Scaling supports using Application Auto Scaling step scaling policies, AWS recommends using target tracking scaling policies instead. For example, if you want to scale your service when CPU utilization falls below or rises above a certain level, create a target tracking scaling policy based on the CPU utilization metric provided by Amazon ECS.  With step scaling policies, you create and manage the CloudWatch alarms that trigger the scaling process. If the target tracking alarms don't work for your use case, you can use step scaling. You can also use target tracking scaling with step scaling for an advanced scaling policy configuration. For example, you can configure a more aggressive response when utilization reaches a certain level.  Step Scaling scales your cluster on various lengths of steps based on different ranges of thresholds. Target tracking on the other hand intelligently picks the smart lengths needed for the given configuration."
    },
    {
        prompt: "A Developer at a company is working on a CloudFormation template to set up resources. Resources will be defined using code and provisioned based on certain conditions defined in the Conditions section.\n\
        Which sections (3) of a CloudFormation template CAN be associated with Condition?:\n\
        Parameters | Resources | Conditions | Ouputs",
        example: "Resources, Conditions, Outputs\n\n\
        Resources - Resources section describes the resources that you want to provision in your AWS CloudFormation stacks. You can associate conditions with the resources that you want to conditionally create.  Conditions - You actually define conditions in this section of the CloudFormation template  Outputs - The optional Outputs section declares output values that you can import into other stacks (to create cross-stack references), return in response (to describe stack calls), or view on the AWS CloudFormation console. For example, you can output the S3 bucket name for a stack to make the bucket easier to find. You can associate conditions with the outputs that you want to conditionally create.",
        description: "The optional Conditions section contains statements that define the circumstances under which entities are created or configured. For example, you can create a condition and then associate it with a resource or output so that AWS CloudFormation only creates the resource or output if the condition is true.  You might use conditions when you want to reuse a template that can create resources in different contexts, such as a test environment versus a production environment. In your template, you can add an EnvironmentType input parameter, which accepts either prod or test as inputs. For the production environment, you might include Amazon EC2 instances with certain capabilities; however, for the test environment, you want to use reduced capabilities to save money.  Conditions cannot be used within the Parameters section. After you define all your conditions, you can associate them with resources and resource properties only in the Resources and Outputs sections of a template."
    },
    {
        prompt: "As part of his development work, an AWS Certified Developer Associate is creating policies and attaching them to IAM identities. After creating necessary Identity-based policies, he is now creating Resource-based policies.  Which is the only resource-based policy that the IAM service supports?",
        description: ":m You manage access in AWS by creating policies and attaching them to IAM identities (users, groups of users, or roles) or AWS resources. A policy is an object in AWS that, when associated with an identity or resource, defines their permissions. Resource-based policies are JSON policy documents that you attach to a resource such as an Amazon S3 bucket. These policies grant the specified principal permission to perform specific actions on that resource and define under what conditions this applies.\n\
        INCORRECT:\n\
        `AWS Organizations Service Control Policies (SCP)` - If you enable all features of AWS organization, then you can apply service control policies (SCPs) to any or all of your accounts. SCPs are JSON policies that specify the maximum permissions for an organization or organizational unit (OU). The SCP limits permissions for entities in member accounts, including each AWS account root user. An explicit deny in any of these policies overrides the allow.  \n\
        `Access control list (ACL)` - Access control lists (ACLs) are service policies that allow you to control which principals in another account can access a resource. ACLs cannot be used to control access for a principal within the same account. Amazon S3, AWS WAF, and Amazon VPC are examples of services that support ACLs.  \n\
        `Permissions boundary` - AWS supports permissions boundaries for IAM entities (users or roles). A permissions boundary is an advanced feature for using a managed policy to set the maximum permissions that an identity-based policy can grant to an IAM entity. An entity's permissions boundary allows it to perform only the actions that are allowed by both its identity-based policies and its permissions boundaries.",
        example: ":m `Trust policy` - Trust policies define which principal entities (accounts, users, roles, and federated users) can assume the role. An IAM role is both an identity and a resource that supports resource-based policies. For this reason, you must attach both a trust policy and an identity-based policy to an IAM role. The IAM service supports only one type of resource-based policy called a role trust policy, which is attached to an IAM role.",

    },
    {
        prompt: "An E-commerce business, has its applications built on a fleet of Amazon EC2 instances, spread across various Regions and AZs. The technical team has suggested using Elastic Load Balancers for better architectural design.  What characteristics of an Elastic Load Balancer make it a winning choice? (Select two)",
        example: "A load balancer accepts incoming traffic from clients and routes requests to its registered targets (such as EC2 instances) in one or more Availability Zones. The load balancer also monitors the health of its registered targets and ensures that it routes traffic only to healthy targets. When the load balancer detects an unhealthy target, it stops routing traffic to that target. It then resumes routing traffic to that target when it detects that the target is healthy again.  Elastic Load Balancing supports three types of load balancers:  Application Load Balancers  Network Load Balancers  Classic Load Balancers  Separate public traffic from private traffic - The nodes of an internet-facing load balancer have public IP addresses. Load balancers route requests to your targets using private IP addresses. Therefore, your targets do not need public IP addresses to receive requests from users over the internet.  Build a highly available system - Elastic Load Balancing provides fault tolerance for your applications by automatically balancing traffic across targets – Amazon EC2 instances, containers, IP addresses, and Lambda functions – in multiple Availability Zones while ensuring only healthy targets receive traffic.",
        description: "Incorrect options:  The Load Balancer communicates with the underlying EC2 instances using their public IPs - This is an incorrect statement. The Load Balancer communicates with the underlying EC2 instances using their private IPs.  Improve vertical scalability of the system - This is an incorrect statement. Elastic Load Balancers can connect with Auto Scaling groups to provide horizontal scaling.  Deploy EC2 instances across multiple AWS Regions - A Load Balancer can target EC2 instances only within an AWS Region."
    },
    {
        prompt: "A firm runs its technology operations on a fleet of Amazon EC2 instances. The firm needs a certain software to be available on the instances to support their daily workflows. The developer team has been told to use the user data feature of EC2 instances.  \n\
        Describe at least 1 (2max) default behaviors of the user data feature. How does the suer data run when the instance is launched?\n\
        How are the privileges of the user data scripts defined?",
        example: "Correct options:  User Data is generally used to perform common automated configuration tasks and even run scripts after the instance starts. When you launch an instance in Amazon EC2, you can pass two types of user data - shell scripts and cloud-init directives. You can also pass this data into the launch wizard as plain text or as a file.  By default, scripts entered as user data are executed with root user privileges - Scripts entered as user data are executed as the root user, hence do not need the sudo command in the script. Any files you create will be owned by root; if you need non-root users to have file access, you should modify the permissions accordingly in the script.  By default, user data runs only during the boot cycle when you first launch an instance - By default, user data scripts and cloud-init directives run only during the boot cycle when you first launch an instance. You can update your configuration to ensure that your user data scripts and cloud-init directives run every time you restart your instance.",
        description: "Incorrect options:  By default, user data is executed every time an EC2 instance is re-started - As discussed above, this is not a default configuration of the system. But, can be achieved by explicitly configuring the instance.  When an instance is running, you can update user data by using root user credentials - You can't change the user data if the instance is running (even by using root user credentials), but you can view it.  By default, scripts entered as user data do not have root user privileges for executing - Scripts entered as user data are executed as the root user, hence do not need the sudo command in the script."
    },
    {
        prompt: "You are a developer in a manufacturing company that has several servers on-site. The company decides to move new development to the cloud using serverless technology. You decide to use the AWS Serverless Application Model (AWS SAM) and work with an AWS SAM template file to represent your serverless architecture.  \n\
        Which are valid serverless resource types? (3)\n\
        AWS::Serverless::UserPool | AWS::Serverless::SimpleTable | AWS::Serverless::Api | AWS::Serverless:: Function",
        example: ":m `AWS::Serverless::Function` - This resource creates a Lambda function, IAM execution role, and event source mappings that trigger the function.  \n\
        `AWS::Serverless::Api` - This creates a collection of Amazon API Gateway resources and methods that can be invoked through HTTPS endpoints. It is useful for advanced use cases where you want full control and flexibility when you configure your APIs.  \n\
        `AWS::Serverless::SimpleTable` - This creates a DynamoDB table with a single attribute primary key. It is useful when data only needs to be accessed via a primary key.  Reference:",
        description: "The AWS Serverless Application Model (SAM) is an open-source framework for building serverless applications. It provides shorthand syntax to express functions, APIs, databases, and event source mappings. With just a few lines per resource, you can define the application you want and model it using YAML.  SAM supports the following resource types:  AWS::Serverless::Api  AWS::Serverless::Application  AWS::Serverless::Function  AWS::Serverless::HttpApi  AWS::Serverless::LayerVersion  AWS::Serverless::SimpleTable  AWS::Serverless::StateMachine  UserPool applies to the Cognito service which is used for authentication for mobile app and web. There is no resource named UserPool in the Serverless Application Model."
    },
    {
        prompt: ':m A data analytics company processes Internet-of-Things (IoT) data using Amazon Kinesis. The development team has noticed that the IoT data feed into Kinesis experiences periodic spikes. The PutRecords API call occasionally fails and the logs show that the failed call returns the response shown below:\n\n\
        ```\n\
        HTTP/1.1 200 OK\nx-amzn-RequestId: <RequestId>\nContent-Type: application/x-amz-json-1.1\nContent-Length: <PayloadSizeBytes>\nDate: <Date>\n{\n "FailedRecordCount": 2,\n "Records": [\n {\n "SequenceNumber": "49543463076548007577105092703039560359975228518395012686",\n "ShardId": "shardId-000000000000"\n },\n {\n "ErrorCode": "ProvisionedThroughputExceededException",\n "ErrorMessage": "Rate exceeded for shard shardId-000000000001 in stream exampleStreamName under account 111111111111."\n },\n {\n "ErrorCode": "InternalFailure",\n "ErrorMessage": "Internal service failure."\n }\n ]\n}\n```\n\
        \n Design an option to recommend to address this use case?',
        example: "Use an error retry and exponential backoff mechanism  \n\
        Decrease the frequency or size of your requests  \n\
        You can use PutRecords API call to write multiple data records into a Kinesis data stream in a single call. Each PutRecords request can support up to 500 records. Each record in the request can be as large as 1 MiB, up to a limit of 5 MiB for the entire request, including partition keys. Each shard can support writes up to 1,000 records per second, up to a maximum data write of 1 MiB per second.  The response Records array includes both successfully and unsuccessfully processed records. Kinesis Data Streams attempts to process all records in each PutRecords request. A single record failure does not stop the processing of subsequent records. As a result, PutRecords doesn't guarantee the ordering of records. An unsuccessfully processed record includes ErrorCode and ErrorMessage values. ErrorCode reflects the type of error and can be one of the following values: ProvisionedThroughputExceededException or InternalFailure. ProvisionedThroughputExceededException indicates that the request rate for the stream is too high, or the requested data is too large for the available throughput. Reduce the frequency or size of your requests.  To address the given use case, you can apply these best practices:  Reshard your stream to increase the number of shards in the stream.  Reduce the frequency or size of your requests.  Distribute read and write operations as evenly as possible across all of the shards in Data Streams.  Use an error retry and exponential backoff mechanism.",
        description: "Incorrect options:  Merge the shards to decrease the number of shards in the stream  Increase the frequency or size of your requests  These two options contradict the explanation provided above, so these options are incorrect.  Decrease the number of KCL consumers - This option has been added as a distractor. The number of KCL consumers is irrelevant for the given use case since the ProvisionedThroughputExceededException is due to the PutRecords API call being used by the producers."

    },
    {
        prompt: "A developer is testing Amazon Simple Queue Service (SQS) queues in a development environment. The queue along with all its contents has to be deleted after testing.  \n\
        Which SQS API should be used for this requirement?",
        example: "DeleteQueue - Deletes the queue specified by the QueueUrl, regardless of the queue's contents. When you delete a queue, any messages in the queue are no longer available.  When you delete a queue, the deletion process takes up to 60 seconds. Requests you send involving that queue during the 60 seconds might succeed. For example, a SendMessage request might succeed, but after 60 seconds the queue and the message you sent no longer exist.  When you delete a queue, you must wait at least 60 seconds before creating a queue with the same name.",
        description: "Incorrect options:  PurgeQueue - Deletes the messages in a queue specified by the QueueURL parameter. When you use the PurgeQueue action, you can't retrieve any messages deleted from a queue. The queue however remains.  RemoveQueue - This is an invalid option, given only as a distractor.  RemovePermission - Revokes any permissions in the queue policy that matches the specified Label parameter.  Reference:"
    },
    {
        prompt: "A SaaS company runs a HealthCare web application that is used worldwide by users. There have been requests by mobile developers to expose public APIs for the application-specific functionality. You decide to make the APIs available to mobile developers as product offerings.\n\
        Which AWS Usage Plan will you use to meet this requirement?",
        example: "Use API Gateway Usage Plans\n\
        Amazon API Gateway is an AWS service for creating, publishing, maintaining, monitoring, and securing REST, HTTP, and WebSocket APIs at any scale. API developers can create APIs that access AWS or other web services, as well as data stored in the AWS Cloud.\n\n\
        A usage plan specifies who can access one or more deployed API stages and methods—and also how much and how fast they can access them. The plan uses API keys to identify API clients and meters access to the associated API stages for each key.  You can configure usage plans and API keys to allow customers to access selected APIs at agreed-upon request rates and quotas that meet their business requirements and budget constraints.",
        attachment: "./img/2023-04-24-11-28-33.png",
        description: "Incorrect options:  Use AWS Billing Usage Plans - AWS Billing and Cost Management is the service that you use to pay your AWS bill, monitor your usage, and analyze and control your costs. There is no such thing as AWS Billing Usage Plans. You cannot use AWS Billing to set up public APIs for the application.  Use CloudFront Usage Plans - Amazon CloudFront is a fast content delivery network (CDN) service that securely delivers data, videos, applications, and APIs to customers globally with low latency, high transfer speeds, all within a developer-friendly environment. There is no such thing as CloudFront Usage Plans. You cannot use CloudFront to set up public APIs for the application.  Use AWS Lambda Custom Authorizers - Lambda is a separate service than Gateway API, therefore, it cannot be used to determine the API usage limits."
    },
    {
        prompt: "The manager at an IT company wants to set up member access to user-specific folders in an Amazon S3 bucket - bucket-a. So, user x can only access files in his folder - bucket-a/user/user-x/ and user y can only access files in her folder - bucket-a/user/user-y/ and so on.\n\
        Which IAM Policy will you use to meet this requirement?\n\
        IAM policy condition | IAM policy principal | IAM Policy resource | IAM policy variables",
        attachment: "./img/2023-04-24-11-33-02.png",
        example: `IAM policy variables  Instead of creating individual policies for each user, you can use policy variables and create a single policy that applies to multiple users (a group policy). Policy variables act as placeholders. When you make a request to AWS, the placeholder is replaced by a value from the request when the policy is evaluated.  \n\
        As an example, the following policy gives each of the users in the group full programmatic access to a user-specific object (their own "home directory") in Amazon S3.`,
        desccription: 'Incorrect options:  \n\n\
        IAM policy principal - You can use the Principal element in a policy to specify the principal that is allowed or denied access to a resource (In IAM, a principal is a person or application that can make a request for an action or operation on an AWS resource. The principal is authenticated as the AWS account root user or an IAM entity to make requests to AWS). You cannot use the Principal element in an IAM identity-based policy. You can use it in the trust policies for IAM roles and in resource-based policies.\n\n\
        IAM policy condition - The Condition element (or Condition block) lets you specify conditions for when a policy is in effect, like so - "Condition" : { "StringEquals" : { "aws:username" : "johndoe" }}. This can not be used to address the requirements of the given use-case.  \n\n\
        IAM policy resource - The Resource element specifies the object or objects that the statement covers. You specify a resource using an ARN. This can not be used to address the requirements of the given use-case.'
    },
    {
        prompt: "You are running workloads on AWS and have embedded RDS database connection strings within each web server hosting your applications. After failing a security audit, you are looking at a different approach to store your secrets securely and automatically rotate the database credentials.\n\
        Which AWS service will you use to meet this requirement?",
        example: "AWS Secrets Manager enables you to easily rotate, manage, and retrieve database credentials, API keys, and other secrets throughout their lifecycle. Users and applications retrieve secrets with a call to Secrets Manager APIs, eliminating the need to hardcode sensitive information in plain text. Secrets Manager offers secret rotation with built-in integration for Amazon RDS, Amazon Redshift, and Amazon DocumentDB.",
        attachment: "./img/2023-04-24-11-35-48.png",
        description: ":m Incorrect options:  \n\
        `SSM Parameter Store` - AWS Systems Manager Parameter Store provides secure, hierarchical storage for configuration data management and secrets management. You can store data such as passwords, database strings, and license codes as parameter values. SSM Parameter Store cannot be used to automatically rotate the database credentials.  \n\n\
        `Systems Manager` - AWS Systems Manager gives you visibility and control of your infrastructure on AWS. Systems Manager provides a unified user interface so you can view operational data from multiple AWS services and allows you to automate operational tasks across your AWS resources. Systems Manager cannot be used to store your secrets securely and automatically rotate the database credentials.\n\n\
        `KMS` - AWS Key Management Service (KMS) makes it easy for you to create and manage cryptographic keys and control their use across a wide range of AWS services and in your applications. KMS cannot be used to store your secrets securely and automatically rotate the database credentials."
    },
    {
        prompt: "Your company has configured AWS Organizations to manage multiple AWS accounts. Within each AWS account, there are many CloudFormation scripts running. Your manager has requested that each script output the account number of the account the script was executed in.\n\
        Which Pseudo parameter will you use to get this information?",
        description: ':m Pseudo parameters are parameters that are predefined by AWS CloudFormation. You do not declare them in your template. Use them the same way as you would a parameter, as the argument for the Ref function.  \n\
        `AWS::AccountId` returns the AWS account ID of the account in which the stack is being created.  \n\
        Incorrect options:  \n\
        `AWS::NoValue` - This removes the corresponding resource property when specified as a return value in the Fn::If intrinsic function.  \n\
        `AWS::Region` - Returns a string representing the AWS Region in which the encompassing resource is being created, such as us-west-2.  \n\
        `AWS::StackName` - Returns the name of the stack as specified with the aws cloudformation create-stack command, such as "teststack".',
        example: `AWS::AccountId  Using CloudFormation, you can create a template that describes all the AWS resources that you want (like Amazon EC2 instances or Amazon RDS DB instances), and AWS CloudFormation takes care of provisioning and configuring those resources for you.`
    },
    {

    }

]


module.exports = {
    aws_certification_associate_developer, aws_localstack, aws_certification_cloud_practitioner
}