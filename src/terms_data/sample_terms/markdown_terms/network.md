## Network Fundamentals

#### application-presentation-session
Layer 7 - Application: The Application Layer in the OSI model is the layer that is "closest to the end user". It receives information directly from users and displays incoming data to the user. Applications themselves do not reside at the application layer, but the layer facilitates communication through lower layers.

Layer 6 - Presentation: The Presentation Layer represents the area that is independent of data representation at the application layer. It represents the preparation or translation of application format to network format, or from network formatting to application format. A good example is encryption and decryption of data for secure transmission.

Layer 5 - Session: When two computers or other networked devices need to speak with one another, a session needs to be created, and this is done at the Session Layer. Functions at this layer involve setup, coordination and termination between the applications at each end of the session.

:p Describe an example of an app in one of the first 3 sessions:
??x
**Session Layer**: The session layer deals with establishing and maintaining a connection between two devices. In Zoom, the session layer would establish and maintain a connection between your computer and the Zoom servers.

**Presentation Layer**: The presentation layer deals with how data is presented to the user. In Zoom, the presentation layer would ensure that the video and audio data received from other participants are displayed and played back correctly on your computer screen and speakers.

**Application Layer**: The application layer is the layer that the end-user interacts with directly. In Zoom, the Zoom application is the application layer. It uses the lower layers to establish a connection to the Zoom servers, transmit and receive video and audio data, and provide a user-friendly interface.
x??

#### transport-network-datalink-physical
Layer 4 – Transport: The Transport Layer deals with the coordination of the data transfer between end systems and hosts. How much data to send, at what rate, where it goes, etc. The best known example is TCP, which is built on top of IP (TCP/IP).

Layer 3 - Network: Here at the Network Layer is where you'll find most of the router functionality. This layer is responsible for packet forwarding, including routing through different routers. Routers at this layer help route data efficiently.

Layer 2 – Data Link: The Data Link Layer provides node-to-node data transfer (between two directly connected nodes), and also handles error correction from the physical layer. Two sublayers exist: the Media Access Control (MAC) layer and the Logical Link Control (LLC) layer.

Layer 1 - Physical: At the bottom of our OSI model we have the Physical Layer, which represents the electrical and physical representation of the system. This can include everything from the cable type, radio frequency link, as well as the layout of pins, voltages, and other physical requirements.

:p Describe an example of an app in one of the first 3 sessions:
??x
**Physical Layer**: The physical layer deals with the physical connection between the computer and the network. In Zoom, it would involve the physical cable or wireless connection that connects your computer to the internet.

**Data Link Layer**: The data link layer deals with how data is transmitted over the physical connection. This layer is responsible for error checking and flow control. Zoom uses this layer to ensure that data is transmitted correctly over the physical connection.

**Network Layer**: The network layer deals with routing data between different networks. In Zoom, the network layer would route the data from your computer to the Zoom servers over the internet.

**Transport Layer**: The transport layer deals with the reliability of data transmission. It ensures that data is transmitted correctly and in the correct order. Zoom uses protocols such as TCP or UDP.
x??

#### tcp-udp
Transmission Control Protocol (TCP) is connection-oriented, meaning once a connection has been established, data can be transmitted in two directions. TCP has built-in systems to check for errors and to guarantee data will be delivered in the order it was sent, making it perfect for transferring information like still images, data files, and web pages.

User Datagram Protocol (UDP) is a simpler, connectionless Internet protocol wherein error-checking and recovery services are not required. With UDP, there is no overhead for opening a connection, maintaining a connection, or terminating a connection; data is continuously sent to the recipient, whether or not they receive it.

:p When should you use TCP vs UDP?
??x
**Use TCP when:**
- Reliability is important (file transfers, web browsing, email)
- Data integrity must be maintained
- Order of packets matters
- You need guaranteed delivery

**Use UDP when:**
- Speed is more important than reliability (live streaming, gaming)
- Real-time applications where some data loss is acceptable
- Broadcasting or multicasting
- Simple request-response protocols (DNS)
x??

#### ttl
Time to live (TTL) refers to the amount of time or "hops" that a packet is set to exist inside a network before being discarded by a router. TTL is also used in other contexts including CDN caching and DNS caching.

:p Why is time-to-live (TTL) useful?
??x
TTL prevents packets from circulating indefinitely in a network due to routing loops. It acts as a safety mechanism:

1. **Prevents infinite loops**: Packets don't bounce around forever
2. **Network efficiency**: Reduces unnecessary network traffic
3. **Resource management**: Prevents routers from being overwhelmed
4. **DNS caching**: Controls how long DNS records are cached
5. **CDN optimization**: Manages content freshness in cache servers
x??

#### cdn
A content delivery network (CDN) is a group of geographically distributed servers that speed up the delivery of web content by bringing it closer to where users are. Data centers across the globe use caching, a process that temporarily stores copies of files, so that you can access internet content more quickly through a server near you. CDNs cache content like web pages, images, and video in proxy servers near to your physical location. You could think of a CDN like an ATM.

:p How could you design a CDN in real life?
??x
**CDN Design Components:**

1. **Geographic Distribution**: Place edge servers in major cities worldwide
2. **Origin Servers**: Central servers containing the original content
3. **Caching Strategy**: Implement intelligent caching algorithms based on content popularity
4. **Load Balancing**: Distribute requests across multiple servers
5. **Content Routing**: Use DNS-based routing to direct users to nearest edge server
6. **Cache Invalidation**: System to update/purge outdated content
7. **Monitoring**: Real-time performance monitoring and analytics
8. **Failover**: Backup systems for high availability

**Real-world example**: Like having multiple bank ATMs in different locations rather than one central bank - users can access services from the nearest location.
x??

#### network-switch
A network switch connects users, applications, and equipment across a network so that they can communicate with one another and share resources. The simplest network switches offer connectivity exclusively to devices on a single local-area network (LAN). More advanced switches can connect devices from multiple LANs and may even incorporate basic data security functions.

Network switches are used to allow communication and sharing of resources between multiple devices on a network. They help in forwarding data packets to their destination and improve network performance by reducing network congestion and network collisions.

:p Example of Network Switch equivalent in other than internet usage?
??x
**Real-world analogies:**

1. **Telephone Switchboard**: Old-fashioned operator connecting different callers
2. **Railway Junction**: Directing trains to different tracks/destinations
3. **Mail Sorting Office**: Routing mail to correct destinations based on addresses
4. **Airport Traffic Control**: Directing planes to appropriate gates and runways
5. **Office Receptionist**: Connecting visitors to the right departments/people

The switch intelligently forwards data to the correct destination rather than broadcasting to everyone, just like a receptionist directs you to the right office instead of announcing your arrival to the entire building.
x??

#### mac
A MAC (Media Access Control) address is a unique identifier assigned to network interfaces for use as a network address in communications within a network segment. This use is common in most IEEE 802 networking technologies, including Ethernet, Wi-Fi, and Bluetooth.

:p What has a MAC address? And if you design something, what would require a MAC address?
??x
**Devices with MAC addresses:**
- Network interface cards (Ethernet, Wi-Fi)
- Smartphones and tablets
- Laptops and computers
- IoT devices
- Bluetooth devices
- Network printers

**Design scenarios requiring MAC addresses:**
- **Smart Home Hub**: Each connected device needs unique identification
- **Industrial IoT System**: Manufacturing sensors and controllers
- **Vehicle Network**: Car components communicating via CAN bus
- **Building Security System**: Access cards, cameras, sensors
- **Medical Devices**: Hospital equipment in networked environments

Every network interface needs a unique MAC address for proper communication within the network segment.
x??

#### load-balancing
Load balancing lets you evenly distribute network traffic to prevent failure caused by overloading a particular resource. This strategy improves the performance and availability of applications, websites, databases, and other computing resources. It also helps process user requests quickly and accurately.

Scalability is hampered for most load balancers by a limited number of nodes for distributing processes. Other challenges include energy consumption, performance monitoring, QoS management, resource scheduling, and service availability in the cloud.

:p Why would you use Load Balancing?
??x
**Benefits of Load Balancing:**

1. **High Availability**: If one server fails, others continue serving requests
2. **Performance**: Distribute workload to prevent any single server from becoming a bottleneck
3. **Scalability**: Easy to add or remove servers based on demand
4. **Resource Optimization**: Ensure all servers are utilized efficiently
5. **User Experience**: Faster response times and reduced downtime

**Use Cases:**
- **Web Applications**: Distribute HTTP requests across multiple web servers
- **Database**: Balance read queries across multiple database replicas
- **Microservices**: Route API calls to available service instances
- **Content Delivery**: Distribute content serving load
- **Gaming**: Balance player connections across game servers
x??

#### dhcp
DHCP (Dynamic Host Configuration Protocol) is a network protocol that automatically assigns IP addresses, subnet masks, default gateways, and other network configuration parameters to client devices. It's used to simplify the task of configuring devices on a network, as the DHCP server manages the assignment of IP addresses.

When a device connects to a network, it sends a broadcast request for an IP address. The DHCP server, which is usually built into a router, receives the request and assigns the device an available IP address from a pool of addresses. The DHCP server also assigns other information, such as the subnet mask, default gateway, and DNS server addresses.

:p When do you encounter DHCP working?
??x
**Common DHCP scenarios:**

1. **Home Wi-Fi**: When you connect your phone/laptop to home Wi-Fi, DHCP assigns it an IP address
2. **Office Networks**: Employees' computers get IP addresses automatically when connecting
3. **Coffee Shop Wi-Fi**: Public networks use DHCP to assign temporary addresses to customers
4. **Hotel Networks**: Guest devices get network configuration automatically
5. **Corporate VPN**: Remote workers get virtual IP addresses through DHCP
6. **IoT Devices**: Smart home devices automatically get network configuration

**DHCP Process (DORA):**
- **Discover**: Client broadcasts request for IP
- **Offer**: Server offers available IP address
- **Request**: Client requests the offered IP
- **Acknowledge**: Server confirms the assignment
x??

#### cloning-vs-automation
Cloning is a simple process that can be performed quickly and easily, making it an attractive option for smaller organizations or individual users. Cloning can be faster than other installation methods, as the entire operating system and all installed software is copied to the target system.

Automation allows you to perform installations in a flexible manner, making it easier to adapt to changes in the environment. Automation can ensure that installations are performed consistently and reliably, even across multiple systems.

:p In what situations would you clone vs automate an installation?
??x
**Use Cloning when:**
- Small-scale deployments (< 10 systems)
- Identical hardware configurations
- Quick setup needed
- Limited IT staff/expertise
- Standard desktop environments
- One-time deployments

**Use Automation when:**
- Large-scale deployments (> 50 systems)
- Different hardware configurations
- Need customization per system
- Regular/recurring deployments
- Complex software stacks
- Enterprise environments
- Long-term maintenance required

**Example**: Clone for setting up 5 identical workstations in a small office; automate for deploying 500 servers in a data center with different roles and configurations.
x??

## Network Midterm

#### responsabilities-admin
System Administrator responsibilities include user management, system installation and configuration, security management, backup and disaster recovery, system monitoring and optimization, network management, server management, technical support, documentation and reporting, and staying current with industry trends and technologies.

It is important to keep documentation of the system so that it can be easily understood by others.

:p What are some of the responsibilities of the System Administrator?
??x
It is important to keep documentation of the system so that it can be easily understood by others.
x??

#### documentaiton-keep
Documentation is important for knowledge sharing, troubleshooting and problem resolution, consistency and standardization, compliance and auditing, disaster recovery and business continuity, change management, training and onboarding, and reducing human error.

Best practices include documenting from the start, using a standard format, keeping it clear and concise, organizing and categorizing, using visuals, regular updates and version control, reviewing and editing, centralizing documentation storage, securing and backing up, and promoting a documentation culture.

:p Why is it important to keep documentation of the system? What would your daily morning to night routine be as a sys admin?
??x
Document from the start: Begin documenting as soon as you start working on a new system or project. This ensures that essential details are not missed and makes it easier to maintain the documentation as the system evolves.

Use a standard format: Adopt a consistent format and structure for your documentation, such as using templates, to make it easy to understand and navigate. This also helps maintain a professional appearance and promotes adherence to organizational standards.

Keep it clear and concise: Write documentation that is clear, concise, and easy to understand. Avoid jargon and technical terms when possible, and always provide explanations for any acronyms or abbreviations.

Organize and categorize: Organize your documentation logically, using categories, sections, and headings to make it easy for others to find relevant information. Create a table of contents and use hyperlinks for easy navigation.

Use visuals: Incorporate diagrams, flowcharts, and screenshots to illustrate concepts and processes more clearly. Visual aids can help make complex information more accessible and easier to understand.

Regular updates and version control: Update documentation regularly to reflect changes in the system, and use version control to track changes over time. This ensures that the documentation remains accurate and up-to-date, and makes it easier to roll back to a previous version if necessary.

Review and edit: Periodically review and edit your documentation for clarity, accuracy, and consistency. Encourage feedback from colleagues and end-users to ensure that the documentation remains relevant and useful.

Centralize documentation storage: Store all documentation in a centralized location, such as an internal wiki, shared drive, or a document management system. This makes it easy for team members to access and collaborate on the documentation, and ensures that everyone is working with the most current version.

Secure and back up: Protect sensitive documentation with appropriate access controls and encryption, and ensure that all documentation is backed up regularly to prevent data loss.

Promote a documentation culture: Encourage a culture of documentation within your team and organization, emphasizing its importance and value. Share best practices, provide training, and recognize the efforts of team members who contribute to maintaining high-quality documentation.
x??

#### machine-life-cycle
The machine life cycle includes planning and procurement, installation and configuration, deployment, operation and maintenance, optimization and upgrades, and decommissioning and disposal.

:p What is the machine life cycle? You had just been hired as a sys admin, provide example of how you would treat your first order of linux machines through the machine life cycel??
??x
Planning and procurement: During this stage, sysadmins work with stakeholders to identify the organization's needs, set requirements, and evaluate potential solutions. This may involve researching and selecting hardware, software, and networking components, considering factors such as cost, performance, compatibility, and scalability.

Installation and configuration: Once the necessary components have been procured, sysadmins install and configure the hardware, operating system, software, and network settings. This includes setting up user accounts, access controls, and security measures, as well as integrating the system with existing infrastructure.

Deployment: After the system has been set up and tested, it is deployed into production. Sysadmins must ensure a smooth transition, which may involve training users, migrating data, and updating documentation.

Operation and maintenance: Once the system is in use, sysadmins are responsible for its ongoing operation and maintenance. This includes monitoring performance and resource utilization, applying patches and updates, and troubleshooting issues as they arise. Regular backups, security audits, and user support also fall under this stage.

Optimization and upgrades: Over time, sysadmins may need to optimize the system to improve performance, address changing requirements, or adapt to new technologies. This could involve hardware or software upgrades, changes to system configurations, or the implementation of new tools and processes.

Decommissioning and disposal: Eventually, a system may become obsolete or no longer meet the organization's needs. In this stage, sysadmins plan and execute the decommissioning process, which may involve migrating data and services to new systems, securely erasing sensitive data, and responsibly disposing of hardware.
x??

#### machine-entropy-reduction
To reduce entropy in a system, establish configuration management, perform regular updates and patching, use version control systems, implement system monitoring, adopt standard naming conventions, perform regular system audits, automate repetitive tasks, maintain documentation, encourage consistency culture, and clean up and declutter regularly.

:p How do you reduce entropy to a system? What would be your daily rutine as a sys admin to reduce entropy?
??x
Establish and enforce configuration management: Implement a configuration management system (e.g., Ansible, Puppet, Chef) to automate and standardize the deployment, configuration, and maintenance of software and system settings. This helps ensure consistency across the infrastructure and reduces the likelihood of configuration drift.

Regular updates and patching: Keep your operating system, software packages, and applications up-to-date by applying patches and updates regularly. This not only helps maintain system stability and security but also prevents the accumulation of outdated or unused software components.

Use version control systems: Employ version control systems (e.g., Git, Subversion) to track changes in source code, configuration files, and documentation. This enables you to revert to a previous state if necessary, simplifying troubleshooting and reducing the impact of human errors.

Implement system monitoring: Set up monitoring solutions (e.g., Nagios, Zabbix) to keep track of system performance, resource usage, and potential issues. Regular monitoring helps you identify and resolve problems before they lead to increased entropy.

Adopt standard naming conventions: Use consistent and descriptive naming conventions for files, directories, and other system components. This makes it easier to locate and manage resources, reducing clutter and confusion.

Perform regular system audits: Conduct periodic audits of your system to identify and address inconsistencies, security vulnerabilities, and other issues that may contribute to entropy. This may involve reviewing logs, scanning for malware, or assessing system configurations.

Automate repetitive tasks: Use scripts or automation tools to perform repetitive or routine tasks, such as backups, log rotation, or software installations. Automation reduces the likelihood of human error and ensures that processes are executed consistently.

Maintain documentation: Keep thorough and up-to-date documentation of your system's configuration, processes, and policies. Documentation provides a reference point for maintaining consistency and helps ensure that best practices are followed.

Encourage a culture of consistency: Promote a culture of consistency within your team and organization by emphasizing the importance of adhering to standards, sharing best practices, and providing training as needed.

Clean up and declutter: Periodically remove unused or unnecessary files.
x??

#### machine-retirement
Machines may retire due to end of life, obsolescence, maintenance costs, energy efficiency, or regulatory compliance issues.

Detection methods include monitoring age, maintenance costs, performance metrics, energy consumption, regulatory compliance, and industry trends.

:p Why would a machine retire?
??x
**Why machines retire:**
- End of life: Every machine has a limited life span and usage capacity
- Obsolescence: As technology advances, newer and more advanced machines become available
- Maintenance costs: As machines age, they may require more frequent repairs and maintenance, which can become increasingly expensive
- Energy efficiency: Older machines may be less energy-efficient than newer models
- Regulatory compliance: Some industries are subject to strict regulatory requirements

**Detection methods:**
- Age: Knowing the age of the machine is important. Most manufacturers provide an estimated lifespan
- Maintenance costs: Keep track of the cost of maintaining the machine over time
- Performance: Track the machine's performance metrics, such as its speed, efficiency, and output
- Energy consumption: Keep track of the machine's energy consumption
- Regulatory compliance: Be aware of any changes in regulatory requirements
- Industry trends: Keep up with industry trends and advancements in technology
x??

#### retired-machine-disposal
Options for retired machines include selling, recycling, donating, repurposing, or proper disposal. These approaches can potentially form the basis of a business model.

:p What would you do with the retired machine? | Can you build a business out of machines to be retired?
??x
**Options for retired machines:**
- Sell it: If the machine is still in good condition, it may have some residual value
- Recycle it: If the machine is no longer usable, consider recycling it
- Donate it: If the machine is still usable, consider donating it to a school or nonprofit organization
- Repurpose it: Some retired machines can be repurposed for a different use
- Dispose of it: If the machine is in poor condition and cannot be repaired, it may need to be disposed of properly
x??

#### brand-new-100-pxe-install
To install CentOS on 100 brand new computers efficiently, use PXE (Preboot Execution Environment) boot with a centralized server approach.

:p You are an administrator for a lab of 100 brand new computers all with a built in hard drive with no operating system installed, DVD, network card, the same hardware specs on the same network. You want to install CentOS on all the machines. • Give a specific way (with some details) how you would like to handle the install to make it as easy as possible for you
??x
**PXE Boot Installation Process:**
1. Set up a PXE boot server: Set up a PXE boot server on the network, which will act as a central repository for the CentOS installation files
2. Configure the server: Configure the server to serve the CentOS installation files over the network using TFTP protocol
3. Create a boot image: Create a boot image that includes the CentOS installation files
4. Configure the BIOS: Configure the BIOS on all 100 computers to allow network booting as the primary boot option
5. Boot the computers: Boot all 100 computers over the network using the boot image
6. Install CentOS: Once the computers are booted over the network, the CentOS installation process will start automatically
7. Configure the computers: Once the installation is complete, configure each computer with the necessary network settings and software applications
x??

#### mirror-raid-backup
Yes, you still need to keep a backup even with Mirror RAID (RAID 1). While RAID provides redundancy by creating duplicate copies across multiple disks, it does not protect against all possible types of data loss such as accidental deletion, data corruption, malicious software, or physical damage/theft of the entire system.

:p If you have a Mirror RAID system (RAID 0), do you need to keep a backup? Explain your answer
??x
Yes, you still need to keep a backup even if you have a Mirror RAID system (RAID 1) in place. While a Mirror RAID system can provide some level of redundancy by creating a duplicate copy of your data across two or more disks, it does not protect against all possible types of data loss.

For example, a Mirror RAID system will not protect your data in the event of accidental deletion, data corruption, or malicious software such as viruses or ransomware. In such cases, the changes will be mirrored across all disks, meaning that the backup copies will also be corrupted or lost.

Additionally, a Mirror RAID system does not protect against physical damage or theft of the entire system, which could result in the loss of all data.
x??

#### solid-service-design
To design a solid service, implement redundant power supplies and UPS for power failures, redundant network connections and failover systems for network outages, and redundant disk drives with RAID configurations plus regular backups for disk failures.

:p You are asked to design a solid service for the customers of your company: • What would you do to keep the systems running through: o power failures o network outages o disk failures
??x
**Power Failures:**
- Redundant Power Supplies: Install redundant power supplies in servers that switch to backup power sources
- Uninterrupted Power Supply (UPS): Use UPS for servers to provide temporary power during outages

**Network Outages:**
- Redundant Network Connections: Establish redundant network connections using technologies like Network Load Balancing or Link Aggregation Control Protocol
- Failover Systems: Have failover systems in place using load balancers or clustering

**Disk Failures:**
- Redundant Disk Drives: Use redundant disk drives in servers, such as RAID configurations (RAID 1, RAID 5, or RAID 6)
- Regular Backup: Perform regular backups of critical data to an offsite location or cloud storage
x??

#### cloud-vs-server-storage
Cloud storage offers accessibility, scalability, reliability, and cost-effectiveness but has concerns around security, third-party dependence, and network connectivity requirements. On-premise storage provides security, control, and network optimization but faces scalability challenges, higher costs, and disaster recovery complexity.

:p Compare storing data "in the cloud" vs storing it on servers in your organization. What are some pros and cons to this?
??x
**Cloud Storage:**
Pros:
- Accessibility: Data can be accessed from anywhere with internet connection
- Scalability: Easy to scale up or down as needed
- Reliability: High levels of uptime and built-in redundancy
- Cost-effective: More cost-effective than maintaining on-premise servers

Cons:
- Security: Concerns about sensitive data being stored outside organization's network
- Dependence on third-party: Organizations may become dependent on cloud provider's infrastructure
- Network connectivity: Requires stable and fast internet connection

**On-Premise Storage:**
Pros:
- Security: Data is under direct control of the organization
- Control: Complete control over infrastructure, hardware, software, and security measures
- Network Connectivity: Organization's network infrastructure can be optimized for performance

Cons:
- Scalability: More difficult and time-consuming to scale up or down
- Cost: Expensive with hardware, software, and maintenance costs
- Disaster Recovery: Organizations must have their own disaster recovery plan
x??

#### help-desk-incident
The proper way to handle an incident report follows 4 phases: Identification, Triage, Investigation, and Resolution.

:p For a help desk, what is the proper way for handling an incident report? You can answer it by writing down what takes place during the 4 phases. You are handled a report, explain your next steps
??x
**Four phases of incident handling:**

1. **Identification**: A customer reports an incident to the help desk through phone, email, chat, or other communication channel. The help desk agent documents the incident by collecting the customer's name, contact information, and description of the issue. The incident is assigned a unique ticket number for tracking purposes.

2. **Triage**: The help desk agent evaluates the incident to determine its priority and severity level, based on pre-established criteria such as impact on business operations, number of users affected, and urgency. The agent may perform initial troubleshooting or escalate to higher-level support.

3. **Investigation**: Once triaged and assigned to the appropriate support team, detailed investigation takes place. The support team gathers more information such as logs, error messages, or other relevant data to diagnose the root cause. They may collaborate with other teams or vendors.

4. **Resolution**: Once the root cause is identified, the support team develops a solution or workaround. The solution is tested and verified to ensure it resolves the incident without causing other issues. The resolution is communicated to the customer and the incident ticket is closed.
x??

#### company-15-computers-upgrade
For rolling out major upgrades to 15 computers in a company, document everything thoroughly including the upgrade plan, hardware/software requirements, testing process, support process, and training process.

:p You work for a company that has 15 computers. Your boss's computer, the boss's 2 secretaries, you have 2 desktop computers in your office that you use, and 10 other employees have desktops in their offices (one of these employee's is a good friend of yours). • You want to roll out some major upgrade to these computers. What strategy would you do, to make sure that the upgrade goes with minimal problems?
??x
**Documentation strategy for 15-computer upgrade:**

- **Document the upgrade plan**: Include all steps, timelines, and dependencies. Documentation should be clear, concise, and easy to understand for all stakeholders
- **Document hardware and software requirements**: Ensure all systems are compatible with new software/hardware, including minimum system requirements, network requirements, and specific requirements  
- **Document the testing process**: Include test cases used, testing results, and any issues or bugs discovered during testing
- **Document the support process**: Detail who to contact for support, how to report issues, and escalation procedures
- **Document the training process**: Include training materials, schedule, and other relevant information for employees using new software/hardware
x??

#### physical-workstation-vs-vdi
Physical workstations require significant upfront hardware investment and regular maintenance, while VDI offers centralized management and lower hardware costs but requires VDI infrastructure setup.

:p Compare a Physical Workstation to a Virtual Desktop Infrastructure • Cost • Maintenance • Storage. Your boss came to you and now is asking for suggestions whether to go with a physical workstation or a virtual desktop infrastructure. What are some pros and cons to this?
??x
**Cost:**
- **Physical Workstation**: Significant upfront investment in hardware (computer, monitor, keyboard, peripherals) plus ongoing upgrade/replacement costs
- **Virtual Desktop Infrastructure**: Less hardware needed as multiple virtual desktops run on single physical server, but additional costs for VDI infrastructure setup

**Maintenance:**
- **Physical Workstation**: Regular maintenance and upgrades required, including updates, hardware replacement, backups. Failed workstations need on-site repairs/replacement
- **Virtual Desktop Infrastructure**: Less maintenance as updates/upgrades applied centrally to all virtual desktops. Failed virtual desktops easily replaced/restored from backup without on-site repairs

**Storage:**
- **Physical Workstation**: Requires large amounts of local storage for applications and data, resulting in higher storage costs
- **Virtual Desktop Infrastructure**: Uses centralized storage allowing more efficient use of storage resources and lower overall storage costs
x??

#### servers-in-data-center
Servers belong in data centers because they provide power and cooling, physical security, network connectivity, scalability, and disaster recovery capabilities specifically designed for server operations.

:p Why do servers belong in a data center? Give specifics:
??x
**Specific reasons servers belong in data centers:**

- **Power and cooling**: Data centers provide reliable power and cooling to large numbers of servers, ensuring continuous operation without overheating
- **Physical security**: Advanced physical security measures including surveillance cameras, security personnel, and biometric access controls protect servers from theft, vandalism, or physical damage
- **Network connectivity**: High-speed, redundant networks allow servers to communicate with each other and internet systems, providing fast and reliable access to data and services
- **Scalability**: Designed to be scalable, allowing additional servers to be added or removed as needed to accommodate changing demands
- **Disaster recovery**: Redundant power supplies, backup generators, and other measures ensure servers continue operating during disasters like power outages or natural disasters
x??

#### setuid-special-executable
An executable file owned by root with the setuid bit runs with root privileges when executed by any user, allowing the file to perform actions normally restricted to root.

:p What is special about an executable file owned by root with the setuid bit on?
??x
An executable file owned by root with the setuid bit on has special privileges when executed by a user. When a regular user executes such a file, it runs with the privileges of the root user instead of the user who executed it. This means the file can perform actions normally restricted to root, such as accessing and modifying system files and directories, managing user accounts, or installing software.

The setuid bit allows an executable to run with the privileges of the file owner, but does not grant access to additional resources beyond those already available to the user who executed the file. For example, if the user doesn't have permission to access a particular file or directory, the setuid bit will not override those permissions.
x??

#### setuid-programs
Common programs that use setuid include passwd, sudo, ping, ping6, mount, umount, and su.

:p Can you name any program that we talked about in class that uses setuid?
??x
**Programs that use setuid:**
- **passwd** (for changing user passwords)
- **su** (for switching to another user's account) 
- **ping** (for sending network packets)
- **mount** (for mounting file systems)
- **sudo**, **ping6**, **umount**

These programs traditionally use setuid to perform privileged operations that regular users wouldn't normally be able to execute.
x??

#### file-permission-shirley
Based on the file permissions shown, Shirley can write to project.txt because she is in the group student and the group has write permissions.

larry:x:501:larry
shirley:x:502:shirley
herbert:x:503:herbert
student:x:600:larry,shirley
-rw------- 1 larry student 12 Aug 21 13:06 hw.txt
-rw-rw---- 1 larry student 12 Aug 21 13:08 project.txt
-rw-r--r-- 1 larry student 12 Aug 21 13:10 manual.txt

:p Which file above can shirly write and why?
??x
Shirley can write to project.txt because she is in the group student and the group has write permissions.

She can't read hw.txt.
She can read manual.txt because it is open to everyone.
x??

#### file-permission-larry
Larry can read/write hw.txt because he is the owner and has read permissions.

:p Can larry read the hw.txt and why?
??x
Larry can read/write hw.txt because he is the owner and he has read permissions.
x??

#### file-permission-herbert-project
Herbert cannot read project.txt because he is not in the group student.

:p Can herbert write to project.txt and why?
??x
Herbert cannot read project.txt because he is not in the group student.
x??

#### file-permission-herbert-manual
Herbert can read manual.txt because it is open for read to everyone.

:p Can herbert read manual.txt and why?
??x
Herbert can read manual.txt because it is open for read.
x??

#### lvm-overview
LVM (Logical Volume Manager) uses physical volumes as storage device building blocks for creating flexible volume management.

:p What is LVM?
??x
A physical volume is a storage device or partition that can be used as a building block for an LVM. A physical volume is typically a disk or disk partition that has been designated as a physical volume for use by the LVM.
x??

#### lvm-physical-volume
A physical volume in LVM is a storage device or partition designated as a building block for the LVM system.

:p What is a physical volume in LVM?
??x
A volume group is a collection of physical volumes that have been combined to create a larger pool of storage space. The volume group allows for flexible allocation of storage space and helps to simplify storage management by abstracting away the underlying physical storage devices.
x??

#### lvm-volume-group
A volume group in LVM is a collection of physical volumes combined to create a larger pool of storage space.

:p What is a volume group in LVM?
??x
A logical volume is a virtual volume that is created within a volume group. Logical volumes are used to provide logical partitions that can be assigned to file systems or used as virtual disks. Logical volumes can be resized or moved within the volume group, providing greater flexibility and ease of management.
x??

#### lvm-logical-volume
A logical volume in LVM is a virtual volume created within a volume group that can be assigned to file systems or used as virtual disks.

:p What is a logical volume in LVM?
??x
A file system is a method used to organize and store files on a disk or disk partition. File systems can be created on logical volumes, providing a means of storing and accessing files on the logical volume. Common file systems used in Linux include ext4, XFS, and Btrfs.
x??

#### automation-prevents-errors
Automation of installations helps prevent potential errors from manual installation, allows faster installation, and enables users with little to no knowledge to install successfully.

:p How does automation of an install help prevent problems
??x
Automation eliminates the potential errors that come from installing manually, allows faster installation, and lets users with little to no knowledge install successfully.
x??

#### server-vs-desktop-hardware
Server hardware is designed to handle more specific and heavier tasks with scalability support like RAID configurations, while desktop hardware is designed for user-friendly interfaces and common home utilities.

:p What makes Server hardware different from Desktop hardware
??x
Server hardware is designed to handle more specific and heavier tasks, allowing scalability such as the support of RAID configurations. While desktop hardware usually is designed for more user friendly design such as having a GUI available and common home utilities.
x??

#### single-machine-poor-design
Having a single machine running all services is poor design because it creates a single point of failure, resource contention when multiple services compete for CPU/memory/disks, and maintenance downtime affects the entire organization.

:p Why is it poor design to have a single machine running all the services your organization needs (even if this single system is powerful enough to handle it all)?
??x
This is poor design because a single point of failure can occur. Resource contention and blocking can occur when multiple services compete for the same resources such as CPU, memory, and disks. Maintenance on the services would cause downtime for the entire organization.
x??

#### good-domain-naming
mail.yourcompany.com is a good domain for an email server because it is intuitive and standard, causes less confusion, and makes it easy for new technicians to understand the domain's responsibility.

:p Why is mail.yourcompany.com a good domain for your email server, rather than eagle.yourcompany.com?
??x
The first one would be a good domain for the email server as it is intuitive and standard. It causes less confusion and would be easy for a new technician to understand the responsibility of the domain.
x??

#### hostname-vs-ip
Using hostnames is better than IP addresses because it allows you to refer to the same machine regardless of IP changes and makes it easier to memorize machine names.

:p Why is it better to refer to a machine by a hostname on your local network than by its IP address? Think about if you move the services of a server to a new machine.
??x
Using hostnames is better because it allows you to refer to the same machine regardless of IP changes, and also makes it easier to memorize the name of the machine. This is especially useful if you move the services of a server to a new machine, as you can simply update the hostname to point to the new machine, without having to worry about IP addresses.
x??

#### bootloader-function
A bootloader is responsible for loading the operating system into memory during the boot process and is the first program that runs when a computer starts up.

:p What does a boot loader do?
??x
A bootloader is responsible for loading the operating system into memory during the boot process. It is the first program that runs when a computer starts up and is responsible for initializing the hardware and loading the operating system kernel into memory.
x??

#### partition-isolation-benefits
Putting partitions on separate drives improves security through distinct access permissions, allows easier modularity and backup, and enables resource allocation optimization for different purposes.

:p Why is it a good idea to put some partitions on a separate drive from other files and programs?
??x
Isolating data through partition separation can improve security by protecting information with distinct access permissions. It also allows for easier modularity and backup, as a single disk can be saved upon. Additionally, separating partitions can help with resource allocation, as different partitions can be optimized for different purposes (e.g. a partition for the OS and another for data storage).
x??

#### passwd-file-permissions
Users can run the passwd command to edit /etc/passwd even though only superuser can write to it because the passwd command uses setuid to run with superuser permissions.

:p The /etc/passwd file can be read by users, but only the superuser can write to it. However, users can run the passwd command, and the passwd command can edit the /etc/passwd file. How is this possible?
??x
When a user runs the passwd command, it initiates a process that requires elevated access to modify the /etc/passwd file. Therefore, the passwd command calls another program (setuid) that does have the superuser permissions to modify the file. This allows users to change their password without having direct write access to the file, while still ensuring that only the superuser can modify the file itself.
x??

## Network Final

#### wireshark-protocol
Wireshark is a widely used network protocol analyzer or packet sniffer used for network troubleshooting and security analysis.

:p What is wireshark used for?
??x
Wireshark is a widely used network protocol analyzer or packet sniffer. It is an open-source software tool that allows users to capture and analyze network traffic in real-time. Wireshark can be used for various purposes, including:

**Network Troubleshooting**: It helps in diagnosing and resolving network issues by capturing and examining packets to identify errors, latency problems, misconfigurations, or faulty network devices.

**Network Security**: Wireshark can be used to analyze network traffic for security purposes, such as detecting and investigating suspicious activities, identifying network attacks (e.g., malware infections, intrusion attempts), and monitoring for unauthorized access or data breaches.
x??

#### switches-router
Switches operate at the Data Link Layer connecting devices within a local network using MAC addresses, while routers operate at the Network Layer connecting different networks using IP addresses.

:p What is the difference between switches and routers?
??x
Switches operate at the Data Link Layer, connecting devices within a local network based on MAC addresses. Routers operate at the Network Layer, connecting different networks based on IP addresses, facilitating inter-network communication. 

Switches forward packets within a network segment, while routers route packets between networks. Switches focus on MAC addresses, while routers use IP addresses. Switches are used within LANs, while routers connect networks and provide additional services like routing protocols, NAT, firewalling, QoS, and VPN support.
x??

#### subnet-mask
The subnet mask splits the IP address into host and network addresses, defining which part belongs to the device and which part belongs to the network.

:p What is subnet mask?
??x
The subnet mask is applied by performing a bitwise logical AND operation between the IP address and the subnet mask. This operation results in the network address, which identifies the specific subnet to which the IP address belongs. 

The subnet mask consists of a series of consecutive 1s followed by a series of consecutive 0s. The 1s indicate the network bits, while the 0s indicate the host bits. The number of leading 1s in the subnet mask determines the size of the network portion.

For example, a common subnet mask is 255.255.255.0, which in binary is 11111111.11111111.11111111.00000000. This subnet mask is associated with a Class C IP address and allows for 254 host addresses within a network.

The subnet mask splits the IP address into the host and network addresses, thereby defining which part of the IP address belongs to the device and which part belongs to the network.
x??

#### nfs-usage
NFS (Network File System) is a distributed file system protocol that allows computers to access files and directories over a network as if they were located on local storage.

:p What is NFS used for?
??x
NFS stands for Network File System, and it is a distributed file system protocol. NFS allows a computer to access files and directories over a network as if they were located on the local storage of the computer.

It enables remote file sharing and facilitates network-based file access and management. NFS is commonly used in networked environments, particularly in UNIX-like systems, to share files and resources among multiple computers or clients.

The Network File System (NFS) is a mechanism for storing files on a network. It is a distributed file system that allows users to access files and directories located on remote computers and treat those files and directories as if they were local.
x??

#### project-folder-permissions
To share the ProjectX folder with read-only access for the group and no access for others, use chmod 750 /org/projects/ProjectX.

:p You are a Product Manager and you want to share a certain folder, called ProjectX, with your team members with whom you share a defined user group on a UNIX system. These files are management-level sensitive documents that the entire group needs to work on the project. As such, you want to share them in such a way that the group has read-only access to the files, and everyone else has no access. Using the numeric representation of permissions, write a command that will allow you to perform this operation on the ProjectX directory that resides in /org/projects/ProjectX
??x
chmod 750 /org/projects/ProjectX
x??

