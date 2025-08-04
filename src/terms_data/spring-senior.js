/**
 * It would be great to take advatnage of online courses to further your knowledge
 * https://ocw.mit.edu/courses/6-034-artificial-intelligence-fall-2010/video_galleries/lecture-videos/
 * 
 */

const sample_otutput_top = "top - 16:12:09 up  1:28,  2 users,  load average: 0.04, 0.01, 0.00\n\
Tasks: 165 total,\t1 running,\t164 sleeping,\t0 stopped,\t0 zombie\n\n\
\
%Cpu(s):\t0.0 us,\t0.0 sy,\t0.0 ni,\t99.9 id,\t0.0 wa,\t0.0 hi,\t0.1 si,\t0.0 st\n\
MiB Mem :\t1974.4 total,\t924.8 free,\t246.5 used,\t803.1 buff/cache\n\
MiB Swap:\t2048.0 total,\t2048.0 free,\t0.0 used.\t1539.2 avail Mem\n\n\
PID USER\t\tPR\tNI\tVIRT\tRES\tSHR\tS\t%CPU\t%MEM\tTIME+ COMMAND\n\
2737 root\t\t20\t0\t400060\t22288\t11008\tS\t0.3\t1.1\t0:04.54 fail2ban-server\n\
5496 kali-win\t20\t0\t10484\t4044\t3436\tR\t0.3\t0.2\t0:00.28 top\n\
1 root\t\t20\t0\t167664\t13396\t8520\tS\t0.0\t0.7\t0:11.33 systemd\n\
2 root\t\t20\t0\t0\t0\t0\tS\t0.0\t0.0\t0:00.21 kthreadd\n\
3 root\t\t0\t-20\t0\t0\t0\tI\t0.0\t0.0\t0:00.00 rcu_gp";


const network = [
    {
        term: "Application - presentation - session", prompt: "Descripbe an example of an app in one of the first 3 sessions:", description: "Layer 7 - Application The Application Layer in the OSI model is the layer that is the “closest to the end user”. It receives information directly from users and displays incoming data to the user. Oddly enough, applications themselves do not reside at the application layer. Instead the layer facilitates communication through lower layers in order to establish connections with applications at the other end. Web browsers (Google Chrome, Firefox, Safari, etc.) TelNet, and FTP, are examples of communications  that rely  on Layer 7. \n\
    Layer 6 - Presentation The Presentation Layer represents the area that is independent of data representation at the application layer. In general, it represents the preparation or translation of application format to network format, or from network formatting to application format. In other words, the layer “presents” data for the application or the network. A good example of this is encryption and decryption of data for secure transmission; this happens at Layer 6.\n\
     Layer 5 - Session When two computers or other networked devices need to speak with one another, a session needs to be created, and this is done at the Session Layer. Functions at this layer involve setup, coordination (how long should a system wait for a response, for example) and termination between the applications at each end of the session.",
        example: "Session Layer: The session layer deals with establishing and maintaining a connection between two devices. In this case, the session layer would establish and maintain a connection between your computer and the Zoom servers. Zoom uses the session layer to establish and maintain a connection between your computer and the Zoom servers.  Presentation Layer: The presentation layer deals with how data is presented to the user. In this case, the presentation layer would ensure that the video and audio data received from other participants are displayed and played back correctly on your computer screen and speakers. Zoom uses the presentation layer to encode, decode, and display video and audio data in a user-friendly manner.  Application Layer: The application layer is the layer that the end-user interacts with directly. In this case, the Zoom application is the application layer. It uses the lower layers to establish a connection to the Zoom servers, transmit and receive video and audio data, and provide a user-friendly interface for the user to interact with."
    },
    {
        prompt: "Describe an example of an app in one of the first 3 sessions:", term: "Transport, Network, Data Link, Physical", description: "\
    Layer 4 – Transport The Transport Layer deals with the coordination of the data transfer between end systems and hosts. How much data to send, at what rate, where it goes, etc. The best known example of the Transport Layer is the Transmission Control Protocol (TCP), which is built on top of the Internet Protocol (IP), commonly known as TCP/IP. TCP and UDP port numbers work at Layer 4, while IP addresses work at Layer 3, the Network Layer. \n\
    Layer 3 - Network Here at the Network Layer is where you’ll find most of the router functionality that most networking professionals care about and love. In its most basic sense, this layer is responsible for packet forwarding, including routing through different routers. You might know that your Boston computer wants to connect to a server in California, but there are millions of different paths to take. Routers at this layer help do this efficiently. \n\
    Layer 2 – Data Link The Data Link Layer provides node-to-node data transfer (between two directly connected nodes), and also handles error correction from the physical layer. Two sublayers exist here as well--the Media Access Control (MAC) layer and the Logical Link Control (LLC) layer. In the networking world, most switches operate at Layer 2. But it’s not that simple. Some switches also operate at Layer 3 in order to support virtual LANs that may span more than one switch subnet, which requires routing capabilities. \n\
    Layer 1 - Physical At the bottom of our OSI model we have the Physical Layer, which represents the electrical and physical representation of the system. This can include everything from the cable type, radio frequency link (as in a Wi-Fi network), as well as the layout of pins, voltages, and other physical requirements. When a networking problem occurs, many networking pros go right to the physical layer to check that all of the cables are properly connected and that the power plug hasn’t been pulled from the router, switch or computer, for example.",
        example: "Physical Layer: The physical layer deals with the physical connection between the computer and the network. In this case, it would involve the physical cable or wireless connection that connects your computer to the internet. Zoom uses the physical layer to transmit data over the internet using your computer's network adapter.  Data Link Layer: The data link layer deals with how data is transmitted over the physical connection. This layer is responsible for things like error checking and flow control. Zoom uses the data link layer to ensure that data is transmitted correctly over the physical connection and that there are no transmission errors.  Network Layer: The network layer deals with routing data between different networks. In this case, the network layer would route the data from your computer to the Zoom servers over the internet. Zoom uses the network layer to route data between different networks and to ensure that the data reaches its destination.  Transport Layer: The transport layer deals with the reliability of data transmission. It ensures that data is transmitted correctly and in the correct order. Zoom uses the transport layer to ensure that data is transmitted reliably over the internet using protocols such as TCP or UDP."
    },
    {
        prompt: "When should you use TCP vs UDP?", term: "TCP UDP",
        description: "Transmission Control Protocol (TCP) is connection-oriented, meaning once a connection has been established, data can be transmitted in two directions. TCP has built-in systems to check for errors and to guarantee data will be delivered in the order it was sent, making it the perfect protocol for transferring information like still images, data files, and web pages.\n\
        User Datagram Protocol (UDP) is a simpler, connectionless Internet protocol wherein error-checking and recovery services are not required. With UDP, there is no overhead for opening a connection, maintaining a connection, or terminating a connection; data is continuously sent to the recipient, whether or not they receive it."
    },
    {
        prompt: 'Why time-to-live (TTL) is useful?', term: "ttl", description: "Time to live (TTL) refers to the amount of time or “hops” that a packet is set to exist inside a network before being discarded by a router. TTL is also used in other contexts including CDN caching and DNS caching."
    },
    {
        prompt: "How could do you design a CDN in real life?", term: "cdn", description: "A content delivery network (CDN) is a group of geographically distributed servers that speed up the delivery of web content by bringing it closer to where users are. Data centers across the globe use caching, a process that temporarily stores copies of files, so that you can access internet content from a web-enabled device or browser more quickly through a server near you. CDNs cache content like web pages, images, and video in proxy servers near to your physical location. This allows you to do things like watch a movie, download software, check your bank balance, post on social media, or make purchases, without having to wait for content to load. CDNs cache content like web pages, images, and video in proxy servers near to your physical location. This allows you to do things like watch a movie, download software, check your bank balance, post on social media, or make purchases, without having to wait for content to load. You could think of a CDN like an ATM."
    },
    {
        prompt: "Example of Network Switch equivalent in other than internet usage?", term: "Network Switch",
        description: "A network switch connects users, applications, and equipment across a network so that they can communicate with one another and share resources. The simplest network switches offer connectivity exclusively to devices on a single local-area network (LAN). More advanced switches can connect devices from multiple LANs and may even incorporate basic data security functions. \n\
        Network switches are used to allow communication and sharing of resources between multiple devices on a network. They help in forwarding data packets to their destination and improve network performance by reducing network congestion and network collisions. Additionally, switches provide network segmentation, which enhances network security, and support advanced networking features like Quality of Service (QoS) and VLANs."
    },
    {
        term: "Mac", prompt: "What has a Mac address? And if you design a what it would require a Mac address?",
        description: "A MAC (Media Access Control) address is a unique identifier assigned to network interfaces for use as a network address in communications within a network segment. This use is common in most IEEE 802 networking technologies, including Ethernet, Wi-Fi, and Bluetooth.",
        example: "Every network interface, whether it's an Ethernet card or a Wi-Fi adapter, has a unique MAC address, which makes it possible for devices to communicate with each other on the same network."
    },
    {
        term: "Load Balancing", prompt: "Why would you use Load Balancing?", description: "Load balancing lets you evenly distribute network traffic to prevent failure caused by overloading a particular resource. This strategy **improves the performance and availability of applications, websites, databases, and other computing resources**. It also helps process user requests quickly and accurately.\n\
        **Scalability is hampered for most load balancers by a limited number of nodes for distributing processes**. Other challenges include energy consumption, performance monitoring, QoS management, resource scheduling, and service availability in the cloud."
    },
    {
        term: "DHCP", prompt: "When do you encounter DHCP working?", description: "DHCP (Dynamic Host Configuration Protocol) is a network protocol that automatically assigns IP addresses, subnet masks, default gateways, and other network configuration parameters to client devices. It's used to simplify the task of configuring devices on a network, as the DHCP server manages the assignment of IP addresses, rather than requiring manual configuration of each device.\n\
        When a device, such as a computer, connects to a network, it sends a broadcast request for an IP address. The DHCP server, which is usually built into a router, receives the request and assigns the device an available IP address from a pool of addresses. The DHCP server also assigns the device other information, such as the subnet mask, default gateway, and DNS server addresses. This process is called leasing an IP address and the lease has a limited time, after which the device will request a new lease.\n\
        DHCP makes it easy to add or remove devices from a network, as the DHCP server automatically assigns new addresses as needed and frees up addresses when devices are disconnected. This makes it an important component of most networks, especially in home or small office environments."
    },
    {
        term: "Clonning vs Automation", prompt: "In what situations would you clone vs automate an installation?", example: "In general, automation is a better option for large organizations that need to perform installations on a large scale, while cloning is a good choice for small organizations or individual users who want a simple and fast installation process.",
        description: "Advantages of Automation:\n 1. Flexibility: Automation allows you to perform installations in a flexible manner, making it easier to adapt to changes in the environment. For example, you can add or remove components of your installation process as needed, which can save time and effort.\n2. Repeatability: Automation can ensure that installations are performed consistently and reliably, even across multiple systems. This reduces the risk of errors or inconsistencies in the installation process.\n3. Scalability: Automation can be used to automate installations across large numbers of systems, which makes it an attractive option for large organizations or data centers.\n Disadvantages of Automation:\n 1. Complexity: Automation can be complex to set up, particularly for inexperienced users.\n2. Maintenance: Automated installation processes need to be maintained, and updates need to be made as the environment changes.\n Advantages of Cloning:\n 1. Simplicity: Cloning is a simple process that can be performed quickly and easily, making it an attractive option for smaller organizations or individual users.\n2. Speed: Cloning can be faster than other installation methods, as the entire operating system and all installed software is copied to the target system.\n Disadvantages of Cloning:\n 1. Inflexibility: Cloning does not offer the same level of flexibility as automation, as changes made to the original system will be reflected in all cloned systems.\n2. Compatibility: Cloning may not always be compatible with different systems, and compatibility issues can arise if hardware components are not identical between systems."
    },
    {
        term: "Preboot Execution Environment (PXE)", prompt: "When is this useful?",
        description: "Network booting is generally applied in a diskless environment using routers and centrally managed computers, also known as thin clients. \n\
        Centralized computing environments provide reduced maintenance costs, enhanced security and enhanced control over the system's workstations. \n\
        PXE code is generally delivered with computer machines on a ROM chip or a boot disk to enable remote boot and configuration. The process makes use of network protocols such as User Datagram Protocol (UDP), Trivial File Transfer Protocol (TFTP), Internet Protocol (IP) and Dynamic Host Configuration Protocol (DHCP)."
    },
    {
        term: "mke2fs", description: "A set of inode storage cells – each holds info about one file ● A set of scattered “superblocks” – holds global filesystem info (multiple copies for reliability) – size and location of inode tables, block map and usage, etc. ● A map of the disk blocks in the filesystem (used and free) ● The set of data blocks",
        prompt: "Whatis it used and why ?"
    },
    {
        term: "Mounting a filesystem", prompt: "What to consider when mounting a filesystem?",
        example: "When mounting a filesystem, there are several factors to consider, including:      Filesystem type: Different filesystem types have different properties and may be optimized for different use cases. Some common filesystem types in Linux include ext4, NTFS, and XFS. You should choose the appropriate filesystem type based on your needs and the capabilities of your operating system.      Mount point: The mount point is the directory on the existing filesystem where the new filesystem will be mounted. It is important to choose a mount point that makes sense for the purpose of the new filesystem. For example, if you are mounting a network share, you might want to use a mount point under /mnt.      Filesystem options: When mounting a filesystem, you can specify a variety of options that control how the filesystem is mounted and used. Some common options include read-only mode, user permissions, and disk caching.      Device and partition: You need to identify the device and partition that contains the filesystem you want to mount. This could be a physical disk, a network share, or a virtual device.      Security: Depending on the sensitivity of the data stored on the filesystem, you may want to consider security measures such as encrypting the filesystem or using access controls to restrict who can mount and access the filesystem.      Persistence: If you want the filesystem to be automatically mounted at boot time, you need to add an entry to the /etc/fstab file. This will ensure that the filesyste",
        description: "Filesystem must be mounted before use ● Must be made part of root filesystem\n\
        Can be mounted on (top of) any directory # mount /dev/sda1 /usr/local # df /usr/local – Use /mnt for temporary mounts – Want to set up automatic mounting"
    },
    {
        term: "fsck", prompt: "How does the FSCK handle failure and not written blocks?",
        example: "In general, when a power outage occurs during a filesystem check, fsck will detect the interruption when the system boots up again. It will then attempt to resume the check from where it left off. If the outage was brief and there was no damage to the filesystem, fsck may be able to complete the check successfully without any further action.  However, if the power outage was more severe and caused data corruption or other issues, fsck may not be able to complete the check without manual intervention. In some cases, it may even be necessary to restore from a backup to ensure data integrity.  To minimize the risk of data corruption during a power outage, it's recommended to use a battery backup or uninterruptible power supply (UPS) to keep the system running during a filesystem check. This can help ensure that the check is completed successfully and prevent data loss.",
        description: "During power failure, superblock, inodes, and data blocks may not get written to disk – fsck can fix minor damage (ext3/4 systems quickly) ● unreferenced inodes ● inexplicably large link counts ● unused data blocks not recorded in block maps ● data blocks listed as free that are also used in a file ● incorrect summary info in superblock – More complex damage will make fsck ask human ● Places unfixable files in lost+found directory ● You should re-run fsck until no errors are found"
    },
    {
        term: "The Filesystem", prompt: "Explain what  types of files are defined by linux",
        description: "● Linux defines seven types of files [-] - Regular files [d] - Directories [c] - Character device files [b] - Block device files [s] - Local domain sockets [p] - Named pipes (FIFO) [l] - Symbolic links ● ls -ld shows the filetype of a file"
    },
    {
        term: "Sockets & Pipes", prompt: "Whats the difference between local domain sockets and named pipes?",
        example: "local domain sockets are more powerful and versatile than named pipes, supporting many communication protocols and providing secure communication between processes on the same machine or across the network. Named pipes are simpler and less powerful, but are useful for basic one-way communication between processes running on the same machine.",
        description: "Local domain sockets ● Sockets provide connections between processes ● Local/UNIX domain sockets are only accessible through the filesystem ● Only used by processes involved in connection ● Created with socket, deleted by rm or unlink ● Used by X Windows, syslog, and printing system\n\n\
        Named pipes ● FIFO files that allow communication between processes on same host ● Created with mknod and deleted with rm"
    },
    {
        term: "Symbolic Links", prompt: "Give yourself owner execute",
        example: "700",
        description: "Nine permission bits – User:owner read, write, execute ● 400, 200, 100 – Group read, write, execute ● 40, 20, 10 – Other:world read, write execute ● 4,2,1 ● Ability to delete or rename is controlled by permissions on directory"
    },
    {
        term: "chmod", prompt: "What command for changing permssion | of a group? | How to give permission to everything ot the owner?",
        description: "– chmod changes permissions – chown changes ownership and group # chown -R user.group /home/user – umask ● Set shell parameters to control default permissions ● umask 027 gives everything to owner, forbids writes to group, and gives nothing to other users ● Usually set in /etc/profile or /etc/csh.login"
    },
    {
        term: "disk components", prompt: "What are the disk components? What is RAID or Host Bus Adapter or Drive Controller?",
        description: "Spinning Disk (magnetic) SSD (solid state disk) Drive Controller Host Bus Adapter RAID\n\
        Hard disk drive (HDD): This is the physical storage device that stores the data. It consists of one or more spinning disks that read and write data using read/write heads.      Solid-state drive (SSD): This is a newer type of storage device that uses flash memory to store data. It has no moving parts and can be faster and more reliable than HDDs.      RAID: RAID stands for \"redundant array of independent disks.\" It is a technology that combines multiple hard drives into a single logical unit. RAID can provide increased performance, data redundancy, and fault tolerance.      Host Bus Adapter (HBA): This is a component that connects the disk system to the computer's motherboard. It manages the data transfer between the disk system and the computer.      Drive controller: This is a component that manages the individual hard drives or SSDs in the disk system. It controls the read/write operations and other functions of the drive.  RAID is a technology that allows multiple hard drives to be combined into a single logical unit. There are several types of RAID configurations, including RAID 0, RAID 1, RAID 5, RAID 6, and RAID 10. Each RAID configuration provides different levels of performance, data redundancy, and fault tolerance.",
        example: " RAID employs the techniques of disk mirroring or disk striping. Mirroring will copy identical data onto more than one drive. Striping partitions help spread data over multiple disk drives. CAREFUL IS NOT BACKUP BECAUSE ERROR GETS MIRROWED\n\
        A host bus adapter (HBA) is a circuit board or integrated circuit adapter that connects a host system, such as a server, to a storage or network device.\n\
        A device that connects an unenclosed hard drive to the computer via USB. Drive adapters are generally used to clone the contents of an existing drive to a new drive."
    },
    {
        term: "Storage Needs", prompt: "How to check your storage needs, what to check for?",
        example: "Check with your departments to see what they need and current usage. See storage use trends and growth needs."
    },
    {
        term: 'NAS', example: "You can have multiple network interfaces on different networks to help increase the system in case of a network outage.",
        prompt: "What can you use NAS for?",
        description: "A NAS system is a storage device connected to a network that allows storage and retrieval of data from a centralized location for authorized network users and heterogeneous clients. NAS systems are flexible and scale-out, meaning that as you need additional storage, you can add on to what you have. NAS is like having a private cloud in the office. It’s faster, less expensive and provides all the benefits of a public cloud on site, giving you complete control. \n\n\
        Network Outage means an unscheduled period in which the Service is interrupted and not usable for sixty (60) or more seconds within a 15-minute period, as measured by Supplier"
    },
    {
        term: "Monitoring", example: "Various different aspects of the system, to detect a possible problem before it happens, or to fix a problem after it has happened before people complain. Disk Failures Running out of disk space System Running Networking Issues For printers (out of paper or paper jam) System Temperature Other Outages\n\
        System resource usage: You should monitor system resource usage, such as CPU, memory, and disk usage, to ensure that the system is not overloaded and is functioning efficiently.      System logs: You should monitor system logs, including the system log, application logs, and security logs, for errors, warnings, and other important messages. This can help you identify and troubleshoot issues before they become major problems.      Network traffic: You should monitor network traffic to ensure that the system is not being attacked or experiencing excessive traffic that could affect performance.      User activity: You should monitor user activity, including login attempts, file access, and system commands, to ensure that users are not abusing the system or engaging in malicious activity.      Backup and recovery: You should monitor backup and recovery processes to ensure that backups are being performed correctly and regularly, and that recovery processes are tested and ready to use in case of a system failure or disaster.      System updates and patches: You should monitor system updates and patches to ensure that the system is up-to-date and secure, and that updates and patches are applied in a timely manner.",
        prompt: "What to be monitoring on a system when u are a sys admin??"
    },
    {
        term: "sudo usermod", prompt: "The command \"sudo usermod -aG sudo theo\" will",
        description: "Add theo to the sudo group",
        example: "Adds the user theo to the sudo group, making it a secondary group for him."
    },
    {
        term: "membership permission on-creation", prompt: "When a user creates a new file or folder, which group membership is used to create the group permissions?",
        example: "The Primary group of the user is used to create assign the file to a group"
    },
    {
        term: "mv-command", prompt: "The command mv file1 file2 will",
        example: "Rename file1 to file2 and move file1 to file2"
    },
    {
        term: "chmod 755", prompt: "The command chmod 755 file1 will",
        example: "Change the permissions of file1 to rwxr-xr-x. Which is: Owner: Read, Write, Execute Group: Read, Execute Other: Read, Execute"
    },
    {
        term: "chmod o-x", prompt: "The command chmod o-x file1 will",
        example: "Remove the execute permission for the other group"
    },
    {
        term: "soft-link", prompt: "ln -s file1 file2 will",
        example: "Create a soft link from file1 to file2. Deleting, changing the name of the original file, will break the link. \n\
        You can confirm it with ls -l file1"
    },
    {
        term: "scp",
        prompt: "Problem: Copy a file named example.txt from your local machine to a remote server with the IP address 192.168.1.100, and save it in the /home/user directory on the remote server. Assume your username on the remote server is user.",
        example: "scp example.txt user@192.168.1.100:/home/user"
    },
    {
        term: "curl",
        prompt: "Retrieve the contents of the web page https://www.example.com/index.html and save it to a file named index.html in your current directory.",
        example: "curl https://www.example.com/index.html -o index.html",
        description: "-o is used to specify the file to save the contents to"
    },
    {
        term: "wget",
        prompt: "Download a file named file.zip from the web server https://example.com/downloads/file.zip and save it to a directory named downloads in your home directory.",
        example: "wget https://example.com/downloads/file.zip -P ~/downloads",
        description: "-P is used to specify the directory to save the file to"
    }, {
        term: "Bash scripting",
        prompt: "Write a script that takes two integer arguments and prints the sum of the two numbers. If no arguments are provided, print an error message.",
        description: "if [ $# -ne 2 ]; then\n  echo 'Usage: script_name num1 num2'\n  exit 1\nfi\n\n\
        \necho \"The sum of $num1 and $num2 is: $sum\"",
        example: "if [ $# -ne 2 ]; then\n  echo 'Usage: script_name num1 num2'\n  exit 1\nfi\n\nnum1=$1\nnum2=$2\nsum=$((num1 + num2))\necho \"The sum of $num1 and $num2 is: $sum\""
    },
    {
        term: "Bash scripting",
        prompt: "Write a script that takes a file name as an argument and checks if the file exists. If it does, print a message saying the file exists. If it doesn't, print a message saying the file doesn't exist.",
        example: "if [ $# -ne 1 ]; then\n  echo 'Usage: script_name filename'\n  exit 1\nfi\n\nfilename=$1\nif [ -e \"$filename\" ]; then\n  echo 'The file exists.'\nelse\n  echo 'The file does not exist.'\nfi",
        description: "if [ $# -ne 1 ]; then\n  echo 'Usage: script_name filename'\n  exit 1\nfi\n\n"
    },
    {
        term: "Bash scripting ",
        prompt: "Write a script that takes a file name as an argument and deletes the file if it exists. If it doesn't exist, print a message saying the file doesn't exist.",
        example: "if [ $# -ne 1 ]; then\n  echo 'Usage: script_name filename'\n  exit 1\nfi\n\nfilename=$1\nif [ -e \"$filename\" ]; then\n  rm \"$filename\"\n  echo 'File deleted.'\nelse\n  echo 'The file does not exist.'\nfi",
        description: "if [ $# -ne 1 ]; then\n  echo 'Usage: script_name filename'\n  exit 1\nfi\n\nfilename=$1\nif [ -e \"$filename\" ]; then\n\nelse\n  echo 'The file does not exist.'\nfi"
    },
    {
        term: "Bash scripting append_text_to_file",
        prompt: "Write a function that takes two arguments, a file name and a string of text, and appends the string of text to the end of the file. Call the function with the arguments 'file.txt' and 'Hello, world!'.",
        example: "append_text_to_file() {\n  filename=$1\ntext=$2\necho \"$text\" >> \"$filename\"\necho 'Text appended to file.'\n}\n\nappend_text_to_file 'file.txt' 'Hello, world!'",
        description: "\nappend_text_to_file 'file.txt' 'Hello, world!'"
    },
    {
        term: "Bash scripting count_file_stats",
        prompt: "Write a function that takes a file name as an argument and outputs the number of lines, words, and characters in the file. Call the function with the argument 'file.txt'.",
        example: "count_file_stats() {\n  filename=$1\nlines=$(wc -l < \"$filename\")\nwords=$(wc -w < \"$filename\")\ncharacters=$(wc -c < \"$filename\")\necho \"Lines: $lines\"\necho \"Words: $words\"\necho \"Characters: $characters\"\n}\n\ncount_file_stats 'file.txt'"
    },
    {
        term: "grep search",
        prompt: "Search for the word 'example' in a file named file.txt.",
        example: "grep 'example' file.txt",
        description: 'Print lines containing a pattern: grep [pattern] [file]\n' +
            'Print line numbers of matches: grep -n [pattern] [file]\n' +
            'Print number of matches: grep -c [pattern] [file]\n' +
            'Search recursively: grep -r [pattern] [directory]\n' +
            'Case-insensitive search: grep -i [pattern] [file]\n' +
            'Invert the match: grep -v [pattern] [file]\n' +
            'Match whole words only: grep -w [pattern] [file]\n'
    },
    {
        term: "grep line number",
        prompt: "Search for the word 'example' in a file named file.txt and print the line number where the word appears.",
        example: "grep -n 'example' file.txt",
        description: 'Print lines containing a pattern: grep [pattern] [file]\n' +
            'Print line numbers of matches: grep -n [pattern] [file]\n' +
            'Print number of matches: grep -c [pattern] [file]\n' +
            'Search recursively: grep -r [pattern] [directory]\n' +
            'Case-insensitive search: grep -i [pattern] [file]\n' +
            'Invert the match: grep -v [pattern] [file]\n' +
            'Match whole words only: grep -w [pattern] [file]\n'

    },
    {
        term: "grep count",
        prompt: "Search for the word 'example' in a file named file.txt and print the number of times the word appears.",
        example: "grep -c 'example' file.txt",
        description: 'Print lines containing a pattern: grep [pattern] [file]\n' +
            'Print line numbers of matches: grep -n [pattern] [file]\n' +
            'Print number of matches: grep -c [pattern] [file]\n' +
            'Search recursively: grep -r [pattern] [directory]\n' +
            'Case-insensitive search: grep -i [pattern] [file]\n' +
            'Invert the match: grep -v [pattern] [file]\n' +
            'Match whole words only: grep -w [pattern] [file]\n'

    },
    {
        term: "grep file extension",
        prompt: "Search for the word 'example' in all files in the current directory that have the .txt file extension.",
        example: "grep 'example' *.txt",
        description: 'Print lines containing a pattern: grep [pattern] [file]\n' +
            'Print line numbers of matches: grep -n [pattern] [file]\n' +
            'Print number of matches: grep -c [pattern] [file]\n' +
            'Search recursively: grep -r [pattern] [directory]\n' +
            'Case-insensitive search: grep -i [pattern] [file]\n' +
            'Invert the match: grep -v [pattern] [file]\n' +
            'Match whole words only: grep -w [pattern] [file]\n'

    },
    {
        term: "grep recursive",
        prompt: "Search for the word 'example' in all files in the current directory and its subdirectories.",
        example: "grep -r 'example' .",
        description: 'Print lines containing a pattern: grep [pattern] [file]\n' +
            'Print line numbers of matches: grep -n [pattern] [file]\n' +
            'Print number of matches: grep -c [pattern] [file]\n' +
            'Search recursively: grep -r [pattern] [directory]\n' +
            'Case-insensitive search: grep -i [pattern] [file]\n' +
            'Invert the match: grep -v [pattern] [file]\n' +
            'Match whole words only: grep -w [pattern] [file]\n'

    },
    {
        term: "grep case insensitive",
        prompt: "Search for the word 'example' in all files in the current directory and its subdirectories, ignoring case.",
        example: "grep -ri 'example' .",
        description: 'Print lines containing a pattern: grep [pattern] [file]\n' +
            'Print line numbers of matches: grep -n [pattern] [file]\n' +
            'Print number of matches: grep -c [pattern] [file]\n' +
            'Search recursively: grep -r [pattern] [directory]\n' +
            'Case-insensitive search: grep -i [pattern] [file]\n' +
            'Invert the match: grep -v [pattern] [file]\n' +
            'Match whole words only: grep -w [pattern] [file]\n'

    },
    {
        term: "Piping - ls and grep",
        prompt: "List all files in the current directory that contain the word 'example'.",
        description: "Use ls to get all files",
        example: "ls | grep 'example'"
    },
    {
        term: "Piping - ps and grep",
        prompt: "Find all processes that contain the word 'chrome' in their name.",
        description: "Use ps to get all processes and grep to filter the results\n aux is an option to ps that shows all processes",
        example: "ps aux | grep 'chrome'"
    },
    {
        term: "Piping - find and xargs",
        prompt: "Find all files in the current directory and its subdirectories that have the '.jpg' extension and delete them.",
        description: "Use find to get all files and xargs to execute a command for each result\n -name is an option to find that filters by file name",
        example: "find . -name '*.jpg' | xargs rm"
    },
    {
        term: "Piping - sort and uniq",
        prompt: "Count the number of occurrences of each line in a file named 'data.txt'.",
        description: "Use sort to sort the lines and uniq to count the occurrences\n -c is an option to uniq that counts the occurrences",
        example: "sort data.txt | uniq -c"
    },
    {
        term: "Piping - wc",
        prompt: "Count the number of lines in a file named 'example.txt'.",
        example: "cat example.txt | wc -l",
        description: "The `wc` command can be used to count the number of lines, words, and characters in a file or stream.\n\
         By default, `wc` counts all three of these statistics, but you can use the `-l` option to count only the number of lines.\n\n\
         In this example, we use the `cat` command to output the contents of the file 'example.txt', which is then piped to `wc -l` to count the number of lines."
    },
    {
        term: "Shbang - Bash script",
        prompt: "Create a Bash script named 'hello.sh' that prints the message 'Hello, World!' to the console when executed.",
        example: "#!/bin/bash\n\necho 'Hello, World!'",
        description: "The shebang `#!/bin/bash` is used to specify that the script should be executed using the Bash shell. The `echo` command is used to print the message 'Hello, World!' to the console. Save the script as a file named 'hello.sh' and make it executable with the command `chmod +x hello.sh`. You can then run the script by typing `./hello.sh` in the terminal."
    },
    {
        term: "Starting ssh Server",
        prompt: "Start the ssh server on your machine. How do you check status? How do you get your inet address?",
        example: "sudo service ssh start\nCheck status using: sudo service ssh status\nGet inet address using: ip addr | grep inet",
    },
    {
        term: "Tee - Append output to file",
        prompt: "Create a script named 'test.sh' that contains the following code:\n\n`#!/bin/bash`\n\n`echo 'Hello, world!' | tee -a output.txt`\n\nRun the script to append the output of the 'echo' command to a file named 'output.txt'.",
        example: "#!/bin/bash\n\necho 'Hello, world!' | tee -a output.txt",
        description: "The `tee` command allows you to write the output of a command to both the console and a file. The `-a` option tells `tee` to append to the file instead of overwriting it. In this example, we use `echo` to output a message, and then pipe it to `tee -a output.txt` to save it to a file named 'output.txt' and display it on the console."
    },
    {
        term: "cat - Display file contents",
        prompt: "Create a file named 'test.txt' that contains the following text:\n\n`Hello, world!`\n\nUse the `cat` command to display the contents of the file on the console.",
        example: "cat test.txt",
        description: "The `cat` command is used to display the contents of a file on the console. In this example, we create a file named 'test.txt' with the message 'Hello, world!', and then use `cat test.txt` to display the contents of the file on the console."
    },
    {
        term: "less - View file contents page-by-page",
        prompt: "Create a file named 'test.txt' that contains the following text:\n\n`Line 1\nLine 2\nLine 3\nLine 4\nLine 5`\n\nUse the `less` command to view the contents of the file page-by-page.",
        example: "less test.txt",
        description: "The `less` command is used to view the contents of a file page-by-page. This is useful for files that are too long to display on the console at once. In this example, we create a file named 'test.txt' with several lines of text, and then use `less test.txt` to view the contents of the file page-by-page."
    },
    {
        term: "man - View manual page",
        prompt: "Use the `man` command to view the manual page for the `ls` command.",
        example: "man ls",
        description: "The `man` command is used to view the manual page for a command or other topic. This provides detailed information on how to use the command, including all of its available options and arguments. In this example, we use `man ls` to view the manual page for the `ls` command."
    },
    {
        term: "cp - Copy files",
        prompt: "Create a file named 'test.txt' that contains the following text:\n\n`Hello, world!`\n\nUse the `cp` command to create a copy of the file named 'test_copy.txt'.",
        example: "cp test.txt test_copy.txt",
        description: "The `cp` command is used to copy files. In this example, we create a file named 'test.txt' with the message 'Hello, world!', and then use `cp test.txt test_copy.txt` to create a copy of the file named 'test_copy.txt'."
    },
    {
        term: "rm - Remove files",
        prompt: "Create a file named 'test.txt' that contains the following text:\n\n`Hello, world!`\n\nUse the `rm` command to delete the file.",
        example: "rm test.txt",
        description: "The `rm` command is used to delete files. In this example, we create a file named 'test.txt' with the message 'Hello, world!', and then use `rm test.txt` to delete the file."
    },
    {
        term: "rmdir - Remove an empty directory",
        prompt: "Remove the empty directory named 'testdir' that was created in the previous example.",
        example: "rmdir testdir",
        description: "The `rmdir` command is used to remove an empty directory. In this example, we assume that there is already an empty directory named 'testdir' (which was created in the previous example), and then use `rmdir testdir` to remove the directory."
    },
    {
        term: "mv - Move or rename files",
        prompt: "Rename the file named 'oldname.txt' to 'newname.txt'.",
        example: "mv oldname.txt newname.txt",
        description: "The `mv` command is used to move or rename files. In this example, we assume that there is already a file named 'oldname.txt', and then use `mv oldname.txt newname.txt` to rename the file to 'newname.txt'."
    },
    {
        term: "chmod - Change file permissions",
        prompt: "Change the permissions of a file named 'myfile.txt' to allow the owner to read, write, and execute the file, but only allow other users to read the file.",
        example: "chmod 744 myfile.txt",
        description: "The `chmod` command is used to change the permissions of a file. In this example, we use `chmod 744 myfile.txt` to allow the owner to read, write, and execute the file (represented by the digits '7', '4', and '4'), and to allow other users to read the file only (represented by the digits '4', '4', and '4')."
    },
    {
        term: "ps - List running processes",
        prompt: "List all running processes on the system.",
        example: "ps -e",
        description: "The `ps` command is used to list the running processes on the system. By default, it only lists the processes that are running in the current shell. In this example, we use the `-e` option to list all running processes on the system."
    },
    {
        term: "top - Display system resource usage",
        prompt: "Display the top processes consuming CPU resources.",
        example: "top",
        description: "The `top` command is used to display the system resource usage. By default, it displays the processes consuming the most CPU resources. In this example, we use `top` to display the top processes consuming CPU resources."
    },
    {
        term: "du - Show disk usage",
        prompt: "Show the disk usage of the current working directory.",
        example: "du",
        description: "The `du` command is used to show the disk usage of a file or directory. By default, it shows the disk usage of the current working directory. In this example, we use `du` to show the disk usage of the current working directory."
    },
    {
        term: "df - Show disk free space",
        prompt: "Show the free space on all mounted filesystems.",
        example: "df -h",
        description: "The `df` command is used to show the free space on all mounted filesystems. In this example, we use the `-h` option to display the free space in a human-readable format."
    },
    {
        term: "tar - Compress or extract files",
        prompt: "Create a compressed archive of a directory named 'mydir' and save it to a file named 'myarchive.tar.gz'.",
        example: "tar -czf myarchive.tar.gz mydir",
        description: "The `tar` command is used to create or extract compressed archives. In this example, we use `tar -czf myarchive.tar.gz mydir` to create a compressed archive of the directory 'mydir' and save it to a file named 'myarchive.tar.gz'. The `-c` option is used to create a new archive, the `-z` option is used to compress the archive using gzip, and the `-f` option is used to specify the output file name."
    },
    {
        term: "Grep - Invert match",
        prompt: "Search for all lines that do not contain the word 'example' in a file named 'file.txt'.",
        example: "grep -v 'example' file.txt",
        description: "This command searches for all lines in the file 'file.txt' that do not contain the word 'example'."
    }, {
        term: "Grep - Search for lines starting with a pattern",
        prompt: "Find all lines in a file named 'file.txt' that start with the word 'example'.",
        example: "grep '^example' file.txt",
        description: "This command searches for all lines in the file 'file.txt' that start with the word 'example'. The caret (^) symbol is used to match the start of a line."
    },
    {
        term: "Grep - Search for lines ending with a pattern",
        prompt: "Find all lines in a file named 'file.txt' that end with the word 'example'.",
        example: "grep 'example$' file.txt",
        description: "This command searches for all lines in the file 'file.txt' that end with the word 'example'. The dollar sign ($) symbol is used to match the end of a line."
    },
    {
        term: "Grep - Search for lines between patterns",
        prompt: "Find all lines in a file named 'file.txt' that are between the patterns 'start' and 'end'.",
        example: "grep -E 'start.*end' file.txt",
        description: "This command searches for all lines in the file 'file.txt' that are between the patterns 'start' and 'end'. The -E option is used to enable extended regular expressions."
    },
    {
        term: "Grep - Search for lines that match any of several patterns",
        prompt: "Find all lines in a file named 'file.txt' that contain either the word 'example1' or 'example2'.",
        example: "grep -e 'example1' -e 'example2' file.txt",
        description: "This command searches for all lines in the file 'file.txt' that contain either the word 'example1' or 'example2'. The -e option is used to specify multiple patterns."
    },
    {
        term: "Grep - Search for lines that match a specific pattern",
        prompt: "Find all lines in a file named 'file.txt' that match the regular expression pattern '[0-9]+'.",
        example: "grep -E '[0-9]+' file.txt",
        description: "This command searches for all lines in the file 'file.txt' that contain one or more digits. The -E option is used to enable extended regular expressions."
    },
    {
        term: "Find the path to the home directory",
        prompt: "What is the full path to the home directory of the current user?",
        description: "The home directory contains a user's personal files and settings. It is located within the /home directory and named after the user.",
        example: "echo $HOME"
    },
    {
        term: "Find the path to the current working directory",
        prompt: "What is the full path to the current working directory?",
        description: "The current working directory is the directory that the user is currently located in. It can be found using the 'pwd' command.",
        example: "pwd"
    },
    {
        term: "Find the path to the root directory",
        prompt: "What is the full path to the root directory?",
        description: "The root directory is the top-level directory in the filesystem hierarchy. It is represented by a single forward slash (/).",
        example: "echo /"
    },
    {
        term: "Find the path to the system logs directory",
        prompt: "What is the full path to the system logs directory?",
        description: "The system logs directory contains log files that record system events and errors. It is typically located in the /var/log directory.",
        example: "echo /var/log"
    },
    {
        term: "Find the path to the Apache configuration file",
        prompt: "What is the full path to the Apache configuration file?",
        description: "The Apache web server configuration file is used to specify settings for the server, such as which ports to listen on, which files to serve, and how to handle requests. It is typically located in the /etc/apache2 directory.",
        example: "echo /etc/apache2/apache2.conf"
    }
    ,
    {
        term: "Find the path to the passwd file",
        prompt: "What is the full path to the passwd file?",
        description: "The passwd file contains information about user accounts on the system, including usernames, user IDs, home directories, and login shells. It is typically located in the /etc directory.",
        example: "echo /etc/passwd"
    },
    {
        term: "Find the path to the group file",
        prompt: "What is the full path to the group file?",
        description: "The group file contains information about user groups on the system, including group names, group IDs, and the users who belong to each group. It is typically located in the /etc directory.",
        example: "echo /etc/group"
    },
    {
        term: "Find the path to the shadow file",
        prompt: "What is the full path to the shadow file?",
        description: "The shadow file contains encrypted password information for user accounts on the system. It is typically located in the /etc directory.",
        example: "echo /etc/shadow"
    },
    {
        term: "Find the path to the fstab file",
        prompt: "What is the full path to the fstab file?",
        description: "The fstab file contains information about file systems that are mounted at boot time, including their device names, mount points, and file system types. It is typically located in the /etc directory.",
        example: "echo /etc/fstab"
    },
    {
        term: "Find the path to the hosts file",
        prompt: "What is the full path to the hosts file?",
        description: "The hosts file contains mappings of hostnames to IP addresses, allowing the system to resolve domain names to IP addresses. It is typically located in the /etc directory.",
        example: "echo /etc/hosts"
    },
    {
        term: "Find the path to the hostname file",
        prompt: "What is the full path to the hostname file?",
        description: "The hostname file contains the hostname of the system. It is typically located in the /etc directory.",
        example: "echo /etc/hostname"
    },
    {
        term: "Find the path to the sudoers file",
        prompt: "What is the full path to the sudoers file?",
        description: "The sudoers file contains configuration information for the 'sudo' command, allowing users to execute commands with superuser privileges. It is typically located in the /etc directory.",
        example: "echo /etc/sudoers"
    },
    {
        term: "Find the path to the resolv.conf file",
        prompt: "What is the full path to the resolv.conf file?",
        description: "The resolv.conf file contains information about the DNS servers that are used by the system to resolve domain names to IP addresses. It is typically located in the /etc directory.",
        example: "echo /etc/resolv.conf"
    },
    {
        term: "List all repositories",
        prompt: "What command is used to list all repositories on an Ubuntu system?",
        description: "The 'sudo cat /etc/apt/sources.list' command can be used to list all repositories on an Ubuntu system.",
        example: "sudo cat /etc/apt/sources.list"
    },
    {
        term: "Update repositories",
        prompt: "What command is used to update the repositories on an Ubuntu system?",
        description: "The 'sudo apt-get update' command can be used to update the repositories on an Ubuntu system.",
        example: "sudo apt-get update"
    },
    {
        term: "Upgrade packages",
        prompt: "What command is used to upgrade the packages on an Ubuntu system?",
        description: "The 'sudo apt-get upgrade' command can be used to upgrade the packages on an Ubuntu system.",
        example: "sudo apt-get upgrade"
    },
    {
        term: "Dist-upgrade packages",
        prompt: "What command is used to upgrade the packages, including any dependencies, on an Ubuntu system?",
        description: "The 'sudo apt-get dist-upgrade' command can be used to upgrade the packages, including any dependencies, on an Ubuntu system.",
        example: "sudo apt-get dist-upgrade"
    },
    {
        term: "Remove unused packages",
        prompt: "What command is used to remove unused packages on an Ubuntu system?",
        description: "The 'sudo apt-get autoremove' command can be used to remove unused packages on an Ubuntu system.",
        example: "sudo apt-get autoremove"
    },
    {
        term: "Remove unused packages and their dependencies",
        prompt: "What command is used to remove unused packages and their dependencies on an Ubuntu system?",
        description: "The 'sudo apt-get autoclean' command can be used to remove unused packages and their dependencies on an Ubuntu system.",
        example: "sudo apt-get autoclean"
    },
    {
        term: "Remove unused packages, dependencies, and cached files",
        prompt: "What command is used to remove unused packages, their dependencies, and cached files on an Ubuntu system?",
        description: "The 'sudo apt-get clean' command can be used to remove unused packages, their dependencies, and cached files on an Ubuntu system.",
        example: "sudo apt-get clean"
    },
    {
        term: "Check for broken dependencies",
        prompt: "What command is used to check for broken dependencies on an Ubuntu system?",
        description: "The 'sudo apt-get check' command can be used to check for broken dependencies on an Ubuntu system.",
        example: "sudo apt-get check"
    },
    {
        term: "Remove a package",
        prompt: "What command is used to remove a package named 'nginx'?",
        description: "The 'sudo apt-get remove' command can be used to remove packages on an Ubuntu system.",
        example: "sudo apt-get remove nginx"
    },
    {
        term: "Remove a package and its configuration files",
        prompt: "What command is used to remove a package named 'mysql-server' and its configuration files?",
        description: "The 'sudo apt-get purge' command can be used to remove packages and their configuration files on an Ubuntu system.",
        example: "sudo apt-get purge mysql-server"
    },
    {
        term: "Install a package without confirmation",
        prompt: "What command is used to install a package named 'python3' without asking for confirmation?",
        description: "The 'sudo apt-get install -y' command can be used to install packages without asking for confirmation on an Ubuntu system.",
        example: "sudo apt-get install -y python3"
    },
    {
        term: "Install a package and its dependencies without confirmation",
        prompt: "What command is used to install a package named 'apache2' and its dependencies without asking for confirmation?",
        description: "The 'sudo apt-get install -f' command can be used to install packages and their dependencies without asking for confirmation on an Ubuntu system.",
        example: "sudo apt-get install -f apache2"
    },
    {
        term: "Ubuntu Release Upgrade",
        prompt: "What are the best practices to follow when performing a release upgrade on an Ubuntu system?\n\
        What would you do if your boss asked you to perform a release upgrade on a production system?",
        example: "Backup your data: Always backup your important data before performing a release upgrade. This will ensure that you can recover your data if anything goes wrong during the upgrade process.\n\nPlan the upgrade: Before performing the upgrade, review the release notes and upgrade instructions for the specific release you're upgrading to. This will help you understand the changes that will be made to the system and prepare for any potential issues.\n\nTest the upgrade: If possible, test the release upgrade in a non-production environment before upgrading your production system. This will allow you to identify and resolve any issues before performing the upgrade on your production system.\n\nUpdate packages: Before performing the release upgrade, make sure all currently installed packages are up-to-date by running sudo apt-get update && sudo apt-get upgrade.\n\nClean up the system: Remove any unnecessary packages and files from the system to ensure a clean upgrade. You can use the sudo apt-get autoremove and sudo apt-get autoclean commands to clean up the system.\n\nMonitor the upgrade: During the upgrade process, monitor the system for any issues or errors. You can use the tail -f /var/log/syslog command to monitor the system log file in real-time.\n\nVerify the upgrade: After the upgrade is complete, verify that the system is functioning correctly and all necessary packages and configurations are in place.",
        description: "The best practices to follow when performing a release upgrade on an Ubuntu system are to backup your data, plan the upgrade, test the upgrade, update packages, clean up the system, monitor the upgrade, and verify the upgrade."
    },
    {
        term: "Ubuntu Release Upgrade",
        prompt: "Perform a release upgrade from Ubuntu 18.04 LTS to Ubuntu 20.04 LTS using the command `sudo do-release-upgrade`.",
        example: "sudo do-release-upgrade",
        description: "To perform a release upgrade from Ubuntu 18.04 LTS to Ubuntu 20.04 LTS using the `do-release-upgrade` command, follow these steps:\n\n1. Open a terminal and run the command `sudo do-release-upgrade`\n2. Follow the prompts to confirm the upgrade and provide any necessary input.\n3. Wait for the upgrade process to complete.\n4. After the upgrade is complete, reboot the system to apply the changes."
    },
    {
        term: "Ubuntu Release Distribution Upgrade",
        prompt: "How to upgrade, the current distribution packages?, What is the difference between `sudo do-release-upgrade` and `sudo apt-get dist-upgrade`?",
        example: "sudo apt-get dist-upgrade",
        description: "The `do-release-upgrade` command is specifically designed to upgrade an Ubuntu system to a new release, whereas `apt-get dist-upgrade` is used to upgrade the current distribution's packages to their latest versions. While `apt-get dist-upgrade` can be used to upgrade to a newer version of Ubuntu, it does not handle some aspects of the upgrade process, such as modifying the system's sources.list file to point to the new release's repositories, which is handled by `do-release-upgrade`."
    },
    // Searching for software
    {
        term: "apt-cache search",
        prompt: "Using `apt-cache search`, find a package that provides the `grep` command.",
        example: "apt-cache search grep",
        description: "The `apt-cache search` command searches for packages in the package cache that match the given search term. In this example, we're searching for packages that provide the `grep` command."
    },
    {
        term: "apt-file search",
        prompt: "Using `apt-file search`, find the package that provides the `ls` command.",
        example: "apt-file search /bin/ls",
        description: "The `apt-file search` command searches for packages that provide the specified file. In this example, we're searching for the package that provides the `/bin/ls` file, which contains the `ls` command."
    },
    {
        term: "dpkg -S",
        prompt: "Using `dpkg -S`, find the package that provides the `ssh` command.",
        example: "dpkg -S /usr/bin/ssh",
        description: "The `dpkg -S` command searches for the package that provides the specified file. In this example, we're searching for the package that provides the `/usr/bin/ssh` file, which contains the `ssh` command.\n\
        The dpkg -S command searches for files installed on the local system from installed packages, it does not search on the internet."
    },
    {
        term: "aptitude search",
        prompt: "Using `aptitude search`, find all packages that start with the letters \"python3-\" and end with \"-dev\".",
        example: "aptitude search '^python3-.*-dev$'",
        description: "The `aptitude search` command searches for packages that match a specified pattern. In this example, we're searching for packages that start with \"python3-\" and end with \"-dev\". The `^` and `$` characters are regular expression anchors that match the beginning and end of the package name, respectively.\n\
        aptitude is a package manager for Debian-based Linux systems like Ubuntu that searches and installs packages from online repositories, similar to apt. However, it also has a powerful search function that can be used to find packages locally or remotely. By default, aptitude searches for packages available in the configured repositories, but it can also search for packages that are installed locally."
    },
    // VIM
    {
        term: "Vim word navigation - next word",
        prompt: "Move to the next word in Vim.",
        example: "Press 'w' to move to the next word.",
        description: "In Vim, 'w' moves the cursor to the beginning of the next word. Use this command to quickly move through a file or to navigate to the next word."
    },
    {
        term: "Vim word navigation - beginning of word",
        prompt: "Move to the beginning of the word in Vim.",
        example: "Press 'b' to move to the beginning of the word.",
        description: "In Vim, 'b' moves the cursor to the beginning of the current word and traverses to the previous word. Use this command to quickly move through a file or to navigate to the beginning of a word."
    },
    {
        term: "Vim line navigation - beginning of line",
        prompt: "Move to the beginning of the line in Vim.",
        example: "Press '0' to move to the beginning of the line.",
        description: "In Vim, '0' moves the cursor to the beginning of the line. Use this command to quickly move to the beginning of a line."
    },
    {
        term: "Vim line navigation - end of line",
        prompt: "Move to the end of the line in Vim.",
        example: "Press '$' to move to the end of the line.",
        description: "In Vim, '$' moves the cursor to the end of the line. Use this command to quickly move to the end of a line."
    },
    {
        term: "Vim file navigation - end of file",
        prompt: "Move to the end of the file in Vim.",
        example: "Press 'G' to move to the end of the file.",
        description: "In Vim, 'G' moves the cursor to the end of the file. Use this command to quickly move to the end of a file."
    },
    {
        term: "Vim file navigation - beginning of file",
        prompt: "Move to the beginning of the file in Vim.",
        example: "Press 'gg' to move to the beginning of the file.",
        description: "In Vim, 'gg' moves the cursor to the beginning of the file. Use this command to quickly move to the beginning of a file."
    },

    {
        term: "Vim line deletion - end of line",
        prompt: "Delete from the cursor to the end of the line in Vim.",
        example: "Press 'd$' to delete to the end of the line.",
        description: "In Vim, 'd$' deletes from the current cursor position to the end of the line. Use this command to quickly delete text to the end of a line."
    },
    {
        term: "Vim line deletion - current line",
        prompt: "Delete the current line in Vim.",
        example: "Press 'dd' to delete the current line.",
        description: "In Vim, 'dd' deletes the current line. Use this command to quickly delete the entire current line."
    },
    {
        term: "Vim word deletion - current word",
        prompt: "Delete the current word in Vim.",
        example: "Press 'dw' to delete the current word.",
        description: "In Vim, 'dw' deletes the current word."
    },
    {
        term: "Vim Search",
        prompt: "How do you search for a word in Vim?",
        example: "Type '?' followed by the word you want to search for.",
        description: "In Vim, you can search for a word using the '?' command followed by the word you want to search for. Vim will highlight the first occurrence of the word and you can navigate to the next occurrence using the 'n' command."
    },
    {
        term: "Vim Replace",
        prompt: "How do you replace all occurrences of a word with another word in Vim?",
        example: "Type '%gc/word/anotherword/gc'.",
        description: "In Vim, you can replace all occurrences of a word with another word using the '%gc/word/anotherword/gc' command. This will replace all occurrences of 'word' with 'anotherword', and confirm each replacement before making the change."
    },
    {
        term: "Vim replace",
        prompt: "Replace all occurrences of 'old' with 'new' in the current line in Vim.",
        example: ":s/old/new/g",
        description: "In Vim, ':s/old/new/g' is used to replace all occurrences of 'old' with 'new' in the current line. This command only affects the current line."
    },
    {
        term: "Vim word navigation- previous word",
        prompt: "Move to the end of the word in Vim.",
        example: "Press 'e' to move to the end of the word.",
        description: "In Vim, 'e' moves the cursor to the end of the current word and traverses to the next word. Use this command to quickly move through a file or to navigate to the end of a word."
    },

    // Security
    {
        term: "Fail2ban start",
        prompt: "How do you start Fail2ban?",
        example: "Run 'sudo service fail2ban start' in the terminal.",
        description: "To start Fail2ban, you can run the command 'sudo service fail2ban start' in the terminal. This will start the Fail2ban service on your system."
    },
    {
        term: "Fail2ban status sshd",
        prompt: "How do you check the status of Fail2ban for the sshd service?",
        example: "Run 'sudo service fail2ban status sshd' in the terminal.",
        description: "To check the status of Fail2ban for the sshd service, you can run the command 'sudo service fail2ban status sshd' in the terminal. This will display the current status of the sshd jail, including the number of failed attempts and the time of the last ban action."
    },
    {
        term: "Fail2ban unban IP",
        prompt: "How do you unban an IP address in Fail2ban?",
        example: "Run 'sudo fail2ban-client set sshd unbanip IPADDRESS' in the terminal.",
        description: "To unban an IP address in Fail2ban, you can run the command 'sudo fail2ban-client set sshd unbanip IPADDRESS' in the terminal. Replace 'IPADDRESS' with the IP address that you want to unban. This will remove the IP address from the Fail2ban blacklist for the sshd jail."
    },
    {
        term: "Fail2ban list banned IPs",
        prompt: "How do you list all the IPs that are currently banned by Fail2ban?",
        example: "Run 'sudo fail2ban-client status' in the terminal.",
        description: "To list all the IPs that are currently banned by Fail2ban, you can run the command 'sudo fail2ban-client status' in the terminal. This will display the status of all the jails, including the list of currently banned IPs for each jail."
    },
    {
        term: "Fail2ban ban specific IP",
        prompt: "How do you ban a specific IP address using Fail2ban?",
        example: "Run 'sudo fail2ban-client set sshd banip IPADDRESS' in the terminal.",
        description: "To ban a specific IP address using Fail2ban, you can run the command 'sudo fail2ban-client set sshd banip IPADDRESS' in the terminal. Replace 'IPADDRESS' with the IP address that you want to ban. This will add the IP address to the Fail2ban blacklist for the sshd jail, preventing further access from that IP address."
    },
    // UFW commands
    {
        term: "UFW deny incoming",
        prompt: "How do you deny all incoming connections using UFW?",
        example: "Run 'sudo ufw default deny incoming' in the terminal.",
        description: "To deny all incoming connections using UFW, you can run the command 'sudo ufw default deny incoming' in the terminal. This will set the default policy to deny incoming connections."
    },
    {
        term: "UFW allow outgoing",
        prompt: "How do you allow all outgoing connections using UFW?",
        example: "Run 'sudo ufw default allow outgoing' in the terminal.",
        description: "To allow all outgoing connections using UFW, you can run the command 'sudo ufw default allow outgoing' in the terminal. This will set the default policy to allow outgoing connections."
    },
    {
        term: "UFW allow ssh",
        prompt: "How do you allow SSH connections using UFW?",
        example: "Run 'sudo ufw allow ssh' in the terminal.",
        description: "To allow SSH connections using UFW, you can run the command 'sudo ufw allow ssh' in the terminal. This will add a rule to allow incoming SSH connections on port 22."
    },
    {
        term: "UFW enable",
        prompt: "How do you enable UFW?",
        example: "Run 'sudo ufw enable' in the terminal.",
        description: "To enable UFW, you can run the command 'sudo ufw enable' in the terminal. This will activate the firewall and enable the rules that have been configured."
    },
    {
        term: "UFW list rules",
        prompt: "How do you list the rules that have been configured in UFW?",
        example: "Run 'sudo ufw -L' in the terminal.",
        description: "To list the rules that have been configured in UFW, you can run the command 'sudo ufw -L' in the terminal. This will display a list of the rules that have been added to the firewall, including the default policies and any custom rules that have been added."
    },
    {
        term: "UFW allow HTTP",
        prompt: "How do you allow HTTP connections using UFW?",
        example: "Run 'sudo ufw allow http' in the terminal.",
        description: "To allow HTTP connections using UFW, you can run the command 'sudo ufw allow http' in the terminal. This will add a rule to allow incoming HTTP connections on port 80."
    },
    {
        term: "UFW allow HTTPS",
        prompt: "How do you allow HTTPS connections using UFW?",
        example: "Run 'sudo ufw allow https' in the terminal.",
        description: "To allow HTTPS connections using UFW, you can run the command 'sudo ufw allow https' in the terminal. This will add a rule to allow incoming HTTPS connections on port 443."
    },
    {
        term: "UFW status verbose",
        prompt: "How do you display the current status of UFW in verbose mode?",
        example: "Run 'sudo ufw status verbose' in the terminal.",
        description: "To display the current status of UFW in verbose mode, you can run the command 'sudo ufw status verbose' in the terminal. This will show the current status of the firewall, including the list of rules that have been configured and the current default policies."
    },
    {
        term: "UFW list rules",
        prompt: "How do you list the rules that have been configured in UFW?",
        example: "Run 'sudo ufw status verbose' in the terminal.",
        description: "To list the rules that have been configured in UFW, you can run the command 'sudo ufw status verbose' in the terminal. This will display a list of the rules that have been added to the firewall, including the default policies and any custom rules that have been added."
    },
    {
        term: "UFW delete rule",
        prompt: "How do you delete a specific rule in UFW? e..g rule Number 2 appear as\n\
         [ 2] Apache                     ALLOW IN    Anywhere \n\n\
         And you want to delete Apache",
        example: "Run 'sudo ufw delete RULENUMBER' in the terminal. e.g.",
        description: "To delete a specific rule in UFW, you can run the command 'sudo ufw delete RULENUMBER' in the terminal. Replace 'RULENUMBER' with the number of the rule that you want to delete, as listed in the output of the 'sudo ufw status verbose' command. This will remove the selected rule from the firewall configuration."
    },
    {
        term: "Process Status Symbols",
        prompt: "What does the 'D' status symbol mean in the `ps aux` command output?",
        example: "The 'D' status symbol in `ps aux` output means that the process is blocked waiting for I/O to complete.",
        description: "In the `ps aux` command output, the 'D' status symbol indicates that the process is blocked and waiting for I/O to complete. This is also known as disk sleep. The other common status symbols in `ps aux` output include 'S' for sleep, 'R' for running, and 'T' for stopped.\n\
        S: Sleep. The process is sleeping and waiting for some event to occur.     R: Running. The process is currently running or executing.     D: Disk sleep. The process is blocked waiting for I/O to complete.     T: Stopped. The process has been stopped, usually by receiving a signal.     Z: Zombie. The process has completed execution but is still listed in the process table because its parent process hasn't yet read its exit status.     I: Idle. The process is idle or is running with a low priority.     <: High-priority. The process is running with a high priority.     N: Low-priority. The process is running with a low priority.     s: Session leader. The process is a session leader.     l: Multithreaded. The process is multithreaded (using CLONE_THREAD, like NPTL pthreads do).     +: Foreground. The process is running in the foreground process group of its controlling terminal."
    },
    {
        term: "cpu-usage-stat-us",
        prompt: "What does the 'us' CPU usage statistic represent?",
        example: "The 'us' CPU usage statistic represents the percentage of time that the CPU is being used in user space.",
        description: "In CPU usage statistics, the 'us' value represents the percentage of time that the CPU is being used in user space, or in other words, the amount of time that processes are spending in user mode. This value is often displayed as part of the output of commands like `top` or `vmstat`." + sample_otutput_top
    },
    {
        term: "cpu-usage-stat-us-sy",
        prompt: "What does the 'sy' CPU usage statistic represent?",
        example: "The 'sy' CPU usage statistic represents the percentage of time that the CPU is being used in system space.",
        description: "In CPU usage statistics, the 'sy' value represents the percentage of time that the CPU is being used in system space, or in other words, the amount of time that the kernel is spending in kernel mode. This value is often displayed as part of the output of commands like `top` or `vmstat`." + sample_otutput_top
    },
    {
        term: "cpu-usage-stat-us-sy",
        prompt: "What does the 'ni' CPU usage statistic represent?",
        example: "The 'ni' CPU usage statistic represents the percentage of time that the CPU is being used by processes with a low priority (nice value).",
        description: "In CPU usage statistics, the 'ni' value represents the percentage of time that the CPU is being used by processes with a low priority (nice value). This value is often displayed as part of the output of commands like `top` or `vmstat`." + sample_otutput_top
    },
    {
        term: "cpu-usage-stat-us-id",
        prompt: "What does the 'id' CPU usage statistic represent?",
        example: "The 'id' CPU usage statistic represents the percentage of time that the CPU is idle.",
        description: "In CPU usage statistics, the 'id' value represents the percentage of time that the CPU is idle, or in other words, the amount of time that there are no processes running on the CPU. This value is often displayed as part of the output of commands like `top` or `vmstat`." + sample_otutput_top
    },
    {
        term: "cpu-usage-stat-us-hi",
        prompt: "What does the 'hi' CPU usage statistic represent?",
        example: "The 'hi' CPU usage statistic represents the percentage of time that the CPU is interrupted by hardware.",
        description: "In CPU usage statistics, the 'hi' value represents the percentage of time that the CPU is interrupted by hardware, or in other words, the amount of time that the CPU spends handling hardware interrupts. This value is often displayed as part of the output of commands like `top` or `vmstat`." + sample_otutput_top
    },
    {
        term: "cpu-usage-stat-us-si",
        prompt: "What does the 'si' CPU usage statistic represent?",
        example: "The 'si' CPU usage statistic represents the percentage of time that the CPU is interrupted by software.",
        description: "In CPU usage statistics, the 'si' value represents the percentage of time that the CPU is interrupted by software, or in other words, the amount of time that the CPU spends handling software interrupts. This value is often displayed as part of the output of commands like `top` or `vmstat`." + sample_otutput_top
    },
    {
        term: "Free Memory Display",
        prompt: "How do you display the amount of free memory in the system?",
        example: "Run 'free -h' in the terminal.",
        description: "To display the amount of free memory in the system, you can run the command 'free -h' in the terminal. This will show the memory usage in human-readable format, with the amount of free, used, and available memory."
    },
    {
        term: "Watch Command",
        prompt: "How do you continuously display the amount of free memory in the system every second using the watch command?",
        example: "Run 'watch -n 1 free -h' in the terminal.",
        description: "To continuously display the amount of free memory in the system every second using the watch command, you can run the command 'watch -n 1 free -h' in the terminal. This will show the memory usage in human-readable format every second, and you can exit the command by pressing Ctrl + C."
    },
    {
        term: "recursive vs non recursive servers",
        prompt: "What is the difference between a recursive and non-recursive DNS server?",
        example: "Servers that allow recursive queries will do all the work \n\
        – Nonrecursive servers will only return referrals or answers",
        description: "Recursive servers will do all the work of resolving a query, including querying other DNS servers if necessary. Nonrecursive servers will only return referrals or answers. Recursive servers are often used by end users, while nonrecursive servers are often used by other DNS servers."
    },
    {
        term: "authoritative cs caching-only servers",
        prompt: "What is the difference between an authoritative and a caching-only DNS server? And how do they work?",
        description: "Authoritative servers have the original data – Caching servers retain data previously seen for future use"
    },
    {
        term: "bind client configuration",
        prompt: "What is the Bind client configuration?",
        description: "Bind, or the Berkeley Internet Name Domain, is a popular DNS server software that translates domain names into IP addresses. A Bind client is a computer or device that requests DNS information from a Bind server to resolve domain names to IP addresses. The Bind client configuration involves setting up the client to connect to the Bind server, specifying the Bind server's IP address or hostname, and configuring the client to use the Bind server as its primary DNS resolver.",
    }
]

// I got the study set way too long... This is a specific focus for the midterm
const network_midterm = [
    {
        term: "responsabilities-admin",
        prompt: "What are some of the responsibilities of the System Administrator?",
        example: "It is important to keep documentation of the system so that it can be easily understood by others.",
        description: "User management: Creating, modifying, and deleting user accounts and groups, assigning appropriate permissions and access rights, and managing authentication and authorization.      System installation and configuration: Installing, configuring, and maintaining operating systems, software applications, and hardware components.      Security management: Implementing and enforcing security policies, managing firewalls, applying security patches and updates, monitoring system logs for potential threats, and running regular security audits.      Backup and disaster recovery: Implementing and maintaining backup solutions, performing regular data backups, and developing and testing disaster recovery plans.      System monitoring and optimization: Monitoring system performance and resource usage, troubleshooting performance issues, and optimizing systems for maximum efficiency.      Network management: Configuring and maintaining network devices, monitoring network traffic, and managing connectivity and access to resources.      Server management: Ensuring server availability and performance, configuring and maintaining server software, and managing server hardware.      Technical support: Providing technical support and assistance to end-users, diagnosing and resolving hardware and software issues.      Documentation and reporting: Maintaining accurate and up-to-date documentation of system configurations, processes, and policies, and generating reports for management or compliance purposes.      Staying current with industry trends and technologies: Continuously learning about new technologies, tools, and best practices to ensure the most efficient and secure operation of the organization's systems."
    },
    {
        term: "documentaiton-keep",
        prompt: "Why is it important to keep documentation of the system? What would your daily morning to night routine be as a sys admin?",
        description: "    Knowledge sharing: Comprehensive documentation enables other IT professionals, such as new hires or consultants, to understand the system quickly and perform their tasks efficiently. It prevents the loss of knowledge when team members leave the organization or change roles.      Troubleshooting and problem resolution: Well-documented systems make it easier to identify and resolve issues, as they provide a clear understanding of system configurations, dependencies, and processes. This can lead to faster problem resolution and reduced downtime.      Consistency and standardization: Documentation ensures that procedures and configurations are applied consistently across the organization, which helps maintain system stability and prevents configuration drift.      Compliance and auditing: Many industries have regulatory requirements that mandate organizations to maintain proper documentation of their systems for compliance purposes. Detailed documentation can help demonstrate compliance during audits and inspections.      Disaster recovery and business continuity: In the event of a disaster or system failure, accurate documentation can facilitate the recovery process and minimize downtime by providing information about backup procedures, system configurations, and recovery steps.      Change management: Documenting changes to the system helps track the system's evolution over time and ensures that any modifications are carried out systematically and with proper approvals. This can help prevent unauthorized changes and minimize the risk of introducing errors or conflicts.      Training and onboarding: Documentation serves as a valuable resource for training new team members and bringing them up to speed on the organization's systems and procedures.      Reducing human error: By providing clear and detailed instructions for routine tasks and procedures, documentation can help minimize the risk of human error and ensure that best practices are followed.",
        example: "    Document from the start: Begin documenting as soon as you start working on a new system or project. This ensures that essential details are not missed and makes it easier to maintain the documentation as the system evolves.      Use a standard format: Adopt a consistent format and structure for your documentation, such as using templates, to make it easy to understand and navigate. This also helps maintain a professional appearance and promotes adherence to organizational standards.      Keep it clear and concise: Write documentation that is clear, concise, and easy to understand. Avoid jargon and technical terms when possible, and always provide explanations for any acronyms or abbreviations.      Organize and categorize: Organize your documentation logically, using categories, sections, and headings to make it easy for others to find relevant information. Create a table of contents and use hyperlinks for easy navigation.      Use visuals: Incorporate diagrams, flowcharts, and screenshots to illustrate concepts and processes more clearly. Visual aids can help make complex information more accessible and easier to understand.      Regular updates and version control: Update documentation regularly to reflect changes in the system, and use version control to track changes over time. This ensures that the documentation remains accurate and up-to-date, and makes it easier to roll back to a previous version if necessary.      Review and edit: Periodically review and edit your documentation for clarity, accuracy, and consistency. Encourage feedback from colleagues and end-users to ensure that the documentation remains relevant and useful.      Centralize documentation storage: Store all documentation in a centralized location, such as an internal wiki, shared drive, or a document management system. This makes it easy for team members to access and collaborate on the documentation, and ensures that everyone is working with the most current version.      Secure and back up: Protect sensitive documentation with appropriate access controls and encryption, and ensure that all documentation is backed up regularly to prevent data loss.      Promote a documentation culture: Encourage a culture of documentation within your team and organization, emphasizing its importance and value. Share best practices, provide training, and recognize the efforts of team members who contribute to maintaining high-quality documentation."

    },
    // HERE there are more things to complete
    {
        term: "machine-life-cycle | what-is-machine-life-cycle",
        prompt: "What is the machine life cycle? You had just been hired as a sys admin, provide example of how you would treat your first order of linux machines through the machine life cycel??",
        description: "    Planning and procurement: During this stage, sysadmins work with stakeholders to identify the organization's needs, set requirements, and evaluate potential solutions. This may involve researching and selecting hardware, software, and networking components, considering factors such as cost, performance, compatibility, and scalability.      Installation and configuration: Once the necessary components have been procured, sysadmins install and configure the hardware, operating system, software, and network settings. This includes setting up user accounts, access controls, and security measures, as well as integrating the system with existing infrastructure.      Deployment: After the system has been set up and tested, it is deployed into production. Sysadmins must ensure a smooth transition, which may involve training users, migrating data, and updating documentation.      Operation and maintenance: Once the system is in use, sysadmins are responsible for its ongoing operation and maintenance. This includes monitoring performance and resource utilization, applying patches and updates, and troubleshooting issues as they arise. Regular backups, security audits, and user support also fall under this stage.      Optimization and upgrades: Over time, sysadmins may need to optimize the system to improve performance, address changing requirements, or adapt to new technologies. This could involve hardware or software upgrades, changes to system configurations, or the implementation of new tools and processes.      Decommissioning and disposal: Eventually, a system may become obsolete or no longer meet the organization's needs. In this stage, sysadmins plan and execute the decommissioning process, which may involve migrating data and services to new systems, securely erasing sensitive data, and responsibly disposing of hardware.",
        example: ""

    },
    {
        term: "machine-life-cycle | How do you reduce entropy to a system?",
        prompt: "How do you reduce entropy to a system? What would be your daily rutine as a sys admin to reduce entropy?",
        description: "Establish and enforce configuration management: Implement a configuration management system (e.g., Ansible, Puppet, Chef) to automate and standardize the deployment, configuration, and maintenance of software and system settings. This helps ensure consistency across the infrastructure and reduces the likelihood of configuration drift.  Regular updates and patching: Keep your operating system, software packages, and applications up-to-date by applying patches and updates regularly. This not only helps maintain system stability and security but also prevents the accumulation of outdated or unused software components.  Use version control systems: Employ version control systems (e.g., Git, Subversion) to track changes in source code, configuration files, and documentation. This enables you to revert to a previous state if necessary, simplifying troubleshooting and reducing the impact of human errors.  Implement system monitoring: Set up monitoring solutions (e.g., Nagios, Zabbix) to keep track of system performance, resource usage, and potential issues. Regular monitoring helps you identify and resolve problems before they lead to increased entropy.  Adopt standard naming conventions: Use consistent and descriptive naming conventions for files, directories, and other system components. This makes it easier to locate and manage resources, reducing clutter and confusion.  Perform regular system audits: Conduct periodic audits of your system to identify and address inconsistencies, security vulnerabilities, and other issues that may contribute to entropy. This may involve reviewing logs, scanning for malware, or assessing system configurations.  Automate repetitive tasks: Use scripts or automation tools to perform repetitive or routine tasks, such as backups, log rotation, or software installations. Automation reduces the likelihood of human error and ensures that processes are executed consistently.  Maintain documentation: Keep thorough and up-to-date documentation of your system's configuration, processes, and policies. Documentation provides a reference point for maintaining consistency and helps ensure that best practices are followed.  Encourage a culture of consistency: Promote a culture of consistency within your team and organization by emphasizing the importance of adhering to standards, sharing best practices, and providing training as needed.  Clean up and declutter: Periodically remove unused or unnecessary files,",


    },
    {
        term: "machine-life-cycle1 | How do you reduce entropy to a system?",
        prompt: "How do you reduce entropy to a system? What would be your daily rutine as a sys admin to reduce entropy?",
        description: "Establish and enforce configuration management: Implement a configuration management system (e.g., Ansible, Puppet, Chef) to automate and standardize the deployment, configuration, and maintenance of software and system settings. This helps ensure consistency across the infrastructure and reduces the likelihood of configuration drift.  Regular updates and patching: Keep your operating system, software packages, and applications up-to-date by applying patches and updates regularly. This not only helps maintain system stability and security but also prevents the accumulation of outdated or unused software components.  Use version control systems: Employ version control systems (e.g., Git, Subversion) to track changes in source code, configuration files, and documentation. This enables you to revert to a previous state if necessary, simplifying troubleshooting and reducing the impact of human errors.  Implement system monitoring: Set up monitoring solutions (e.g., Nagios, Zabbix) to keep track of system performance, resource usage, and potential issues. Regular monitoring helps you identify and resolve problems before they lead to increased entropy.  Adopt standard naming conventions: Use consistent and descriptive naming conventions for files, directories, and other system components. This makes it easier to locate and manage resources, reducing clutter and confusion.  Perform regular system audits: Conduct periodic audits of your system to identify and address inconsistencies, security vulnerabilities, and other issues that may contribute to entropy. This may involve reviewing logs, scanning for malware, or assessing system configurations.  Automate repetitive tasks: Use scripts or automation tools to perform repetitive or routine tasks, such as backups, log rotation, or software installations. Automation reduces the likelihood of human error and ensures that processes are executed consistently.  Maintain documentation: Keep thorough and up-to-date documentation of your system's configuration, processes, and policies. Documentation provides a reference point for maintaining consistency and helps ensure that best practices are followed.  Encourage a culture of consistency: Promote a culture of consistency within your team and organization by emphasizing the importance of adhering to standards, sharing best practices, and providing training as needed.  Clean up and declutter: Periodically remove unused or unnecessary files,",


    },
    {
        term: "machine-life-cycle | Why would a machine retire? How do you detect a machine that needs to be retired?",
        prompt: "Why would a machine retire?",
        description: "    End of life: Every machine has a limited life span and usage capacity. Once a machine has reached the end of its useful life, it may need to be retired or replaced.      Obsolescence: As technology advances, newer and more advanced machines become available. This can make older machines obsolete and unsuitable for modern operations.      Maintenance costs: As machines age, they may require more frequent repairs and maintenance, which can become increasingly expensive. At a certain point, retiring the machine may be more cost-effective than continuing to repair and maintain it.      Energy efficiency: Older machines may be less energy-efficient than newer models, resulting in higher operating costs. Retiring the old machine and replacing it with a more energy-efficient model can save money over the long term.      Regulatory compliance: Some industries are subject to strict regulatory requirements related to equipment and machinery. If a machine no longer meets these requirements, it may need to be retired or upgraded.",
        example: "    Age: Knowing the age of the machine is important. Most manufacturers provide an estimated lifespan for their machines. If a machine has reached or exceeded its estimated lifespan, it may be time to consider retirement.      Maintenance costs: Keep track of the cost of maintaining the machine over time. If the cost of repairs and maintenance becomes prohibitively expensive or more than the cost of purchasing a new machine, it may be time to retire it.      Performance: Track the machine's performance metrics, such as its speed, efficiency, and output. If these metrics begin to decline or become inconsistent, it may be time to retire the machine.      Energy consumption: Keep track of the machine's energy consumption. If it's significantly higher than newer models, this may be an indication that it's time to upgrade to a more energy-efficient machine.      Regulatory compliance: Be aware of any changes in regulatory requirements that may affect the machine's operation. If the machine is no longer compliant, it may need to be retired or upgraded.      Industry trends: Keep up with industry trends and advancements in technology. If newer, more advanced machines are becoming standard, it may be time to consider upgrading or retiring older equipment."
    },
    {
        term: "machine-life-cycle | What would you do with the retired machine?",
        prompt: "What would you do with the retired machine? | Can you build a business out of machines to be retired?",
        description: "    Sell it: If the machine is still in good condition, it may have some residual value. You can try selling it to a third party, such as a used equipment dealer, to recover some of the cost of the machine.      Recycle it: If the machine is no longer usable, consider recycling it. Many components of machines, such as metals, plastics, and circuit boards, can be recycled.      Donate it: If the machine is still usable, consider donating it to a school or nonprofit organization that may have a need for it.      Repurpose it: Some retired machines can be repurposed for a different use, such as using an old server as a backup storage device.      Dispose of it: If the machine is in poor condition and cannot be repaired, it may need to be disposed of. This should be done in compliance with local regulations and best practices to ensure safe and environmentally responsible disposal.",
        example: ""
    },
    {
        term: "Brand-new-100",
        prompt: "You are an administrator for a lab of 100 brand new computers all with a built in hard drive with no operating system installed, DVD, network card, the same hardware specs on the same network. You want to install CentOS on all the machines. • Give a specific way (with some details) how you would like to handle the install to make it as easy as possible for you",
        description: "To install CentOS on all 100 computers, I would use a method called network boot or PXE (Preboot Execution Environment) boot. This method allows me to install the operating system on all the computers simultaneously over the network, rather than installing it manually on each computer.  Here are the steps I would take:      Set up a PXE boot server: I would set up a PXE boot server on the network, which will act as a central repository for the CentOS installation files.      Configure the server: I would configure the server to serve the CentOS installation files over the network using the TFTP (Trivial File Transfer Protocol) protocol.      Create a boot image: I would create a boot image that includes the CentOS installation files, which will be used to boot the computers over the network.      Configure the BIOS: I would configure the BIOS on all 100 computers to allow network booting as the primary boot option.      Boot the computers: I would then boot all 100 computers over the network using the boot image created in step 3.      Install CentOS: Once the computers are booted over the network, the CentOS installation process will start automatically. I would then follow the prompts to install CentOS on all the computers.      Configure the computers: Once the installation is complete, I would configure each computer with the necessary network settings and software applications.",

    },
    {
        term: "mirror-raid",
        prompt: "If you have a Mirror RAID system (RAID 0), do you need to keep a backup? Explain your answer",
        description: "Yes, you still need to keep a backup even if you have a Mirror RAID system (RAID 1) in place. While a Mirror RAID system can provide some level of redundancy by creating a duplicate copy of your data across two or more disks, it does not protect against all possible types of data loss. For example, a Mirror RAID system will not protect your data in the event of accidental deletion, data corruption, or malicious software such as viruses or ransomware. In such cases, the changes will be mirrored across all disks, meaning that the backup copies will also be corrupted or lost. Additionally, a Mirror RAID system does not protect against physical damage or theft of the entire system, which could result in the loss of all data."
    },
    {
        term: "solid-5ervice",
        prompt: "You are asked to design a solid service for the customers of your company: • What would you do to keep the systems running through: o power failures o network outages o disk failures",
        description: "Power Failures: a. Redundant Power Supplies: To ensure continuous uptime during a power outage, we can install redundant power supplies in our servers, which will switch to backup power sources (such as batteries or generators) in case of power failure. b. Uninterrupted Power Supply (UPS): We can also use Uninterrupted Power Supplies (UPS) for our servers, which will provide temporary power during an outage and allow time for our systems to shut down gracefully to avoid data loss or hardware damage. Network Outages: a. Redundant Network Connections: To minimize the impact of a network outage, we can establish redundant network connections that will automatically switch to a backup connection in case of failure. This can be done using technologies such as Network Load Balancing (NLB) or Link Aggregation Control Protocol (LACP). b. Failover Systems: We can also have failover systems in place, which can take over operations if the primary system becomes unavailable. This can be done using technologies such as load balancers or clustering. Disk Failures: a. Redundant Disk Drives: To protect against disk failures, we can use redundant disk drives in our servers, such as RAID configurations (e.g. RAID 1, RAID 5, or RAID 6). This will ensure that data is automatically mirrored or distributed across multiple disks, so that in case of a disk failure, the data can be recovered from the remaining disks. b. Regular Backup: We should also perform regular backups of critical data to an offsite location or cloud storage. This will ensure that even if all disk drives fail, the data can be recovered from the backups."
    },
    {
        term: "cloud-vs-server",
        prompt: "Compare storing data “in the cloud” vs storing it on servers in your organization. What are some pros and cons to this? ",
        description: "Storing Data in the Cloud:    Pros:   Accessibility: Data stored in the cloud can be accessed from anywhere with an internet connection, which allows for greater flexibility and remote work capabilities.   Scalability: Cloud providers typically offer a variety of storage options and can quickly and easily scale up or down as needed. Reliability: Cloud providers typically offer high levels of uptime and availability, as well as built-in redundancy and disaster recovery capabilities. Cost-effective: Using cloud storage can be more cost-effective than investing in and maintaining on-premise servers.       Cons: Security: While cloud providers typically have robust security measures in place, there may be concerns around the security of sensitive data being stored outside of the organization's network. Dependence on third-party: Organizations using cloud storage may become dependent on the cloud provider's infrastructure and services, which could lead to vendor lock-in and loss of control over the infrastructure. Network connectivity: Storing data in the cloud requires a stable and fast internet connection, which could be an issue in some areas or for some organizations.\n\n\n\
        Storing Data on Servers in Your Organization: Pros: Security: Data stored on-premise can be more secure as it is under the direct control of the organization and can be protected by the organization's own security measures. Control: Organizations have complete control over the infrastructure, including hardware, software, and security measures. Network Connectivity: The organization's network infrastructure can be optimized for performance and reliability, which could result in faster and more consistent access to data.       Cons: Scalability: On-premise storage may be more difficult and time-consuming to scale up or down as needed. Cost: On-premise storage can be expensive, as it requires hardware, software, and maintenance costs. Disaster Recovery: Organizations must have their own disaster recovery plan in place to protect against data loss or disruption"
    },
    {
        term: "help-desk-incident",
        prompt: "For a help desk, what is the proper way for handling an incident report? You can answer it by writing down what takes place during the 4 phases\n\
        You are handled a report, explain your next steps",
        description: "Identification: A customer reports an incident to the help desk, either through a phone call, email, chat, or any other communication channel. The help desk agent will document the incident by collecting information such as the customer's name, contact information, and a description of the issue. The incident is then assigned a unique ticket number for tracking purposes. Triage: The help desk agent will evaluate the incident to determine its priority and severity level, based on pre-established criteria such as impact on business operations, number of users affected, and urgency of the issue. The agent may also perform initial troubleshooting steps to try to resolve the issue or escalate it to a higher level of support. Investigation: Once the incident has been triaged and assigned to the appropriate support team, a more detailed investigation takes place. The support team will gather more information about the incident, such as logs, error messages, or other relevant data to try to diagnose the root cause of the issue. The support team may also collaborate with other teams or vendors to investigate the issue further. Resolution: Once the root cause of the issue has been identified, the support team will work to develop a solution or workaround to resolve the incident. The solution or workaround will be tested and verified to ensure that it resolves the incident and does not cause any other issues. The support team will then communicate the resolution to the customer, and close the incident ticket."
    },
    {
        term: "company-15-computers",
        prompt: "You work for a company that has 15 computers. Your boss’s computer, the boss’s 2 secretaries, you have 2 desktop computers in your office that you use, and 10 other employees have desktops in their offices (one of these employee’s is a good friend of yours). • You want to roll out some major upgrade to these computers. What strategy would you do, to make sure that the upgrade goes with minimal problems?",
        description: "Document the upgrade plan: It's important to document the upgrade plan, including all the steps involved, timelines, and dependencies. This documentation should be clear, concise, and easy to understand, to ensure that all stakeholders are aware of the plan and can follow it properly. Document the hardware and software requirements: Document the hardware and software requirements for the upgrade, to ensure that all systems are compatible with the new software or hardware. This documentation should include details such as minimum system requirements, network requirements, and any other specific requirements. Document the testing process: Document the testing process used to ensure that the upgrade is working properly. This should include the test cases used, the results of the testing, and any issues or bugs discovered during the testing process. Document the support process: Document the process for providing support to employees who may have questions or issues related to the upgrade. This should include details on who to contact for support, how to report issues, and how to escalate issues if necessary. Document the training process: Document the training process for employees who will be using the new software or hardware. This should include details on the training materials used, the training schedule, and any other relevant information."
    },
    {
        term: "physicial-workstation-virtual-desktop",
        prompt: "Compare a Physical Workstation to a Virtual Desktop Infrastructure • Cost • Maintenance • Storage\n\
        Your boss came to you and now is asking for suggestions whether to go with a physical workstation or a virtual desktop infrastructure. What are some pros and cons to this?",
        description: "Cost:\nPhysical Workstation: A physical workstation requires a significant upfront investment in hardware, including the cost of the computer, monitor, keyboard, and other peripherals. In addition, there may be ongoing costs associated with upgrading and replacing hardware as needed.\nVirtual Desktop Infrastructure: A VDI typically requires less hardware than a physical workstation, as multiple virtual desktops can be run on a single physical server. This can result in lower hardware costs overall, although there may be additional costs associated with setting up and maintaining the VDI infrastructure.\n\nMaintenance:\nPhysical Workstation: A physical workstation requires regular maintenance and upgrades to keep it running smoothly. This may include installing updates, replacing hardware components, and performing regular backups. Additionally, if a physical workstation fails, it may require on-site repairs or replacement.\nVirtual Desktop Infrastructure: A VDI typically requires less maintenance than a physical workstation, as updates and upgrades can be applied centrally to all virtual desktops. Additionally, if a virtual desktop fails, it can be easily replaced or restored from a backup without the need for on-site repairs.\n\nStorage:\nPhysical Workstation: A physical workstation typically requires a large amount of local storage to store applications and data. This can result in higher storage costs, as larger hard drives or additional storage devices may be required.\nVirtual Desktop Infrastructure: A VDI typically uses centralized storage, which allows for more efficient use of storage resources. This can result in lower storage costs overall, as less local storage is required for each virtual desktop."

    },
    {
        term: "why-server-belong-in-a-data-center",
        prompt: "Why do servers belong in a data center? Give specifics:",
        description: "Power and cooling: Data centers are specifically designed to provide reliable power and cooling to large numbers of servers. This ensures that servers can operate continuously and without overheating, which can cause hardware failure. \nPhysical security: Data centers are typically equipped with advanced physical security measures, such as surveillance cameras, security personnel, and biometric access controls. This helps to protect servers from theft, vandalism, or other physical damage. \nNetwork connectivity: Data centers are connected to high-speed, redundant networks, which allows servers to communicate with each other and with other systems on the internet. This ensures that servers can provide fast and reliable access to data and services. \nScalability: Data centers are designed to be scalable, meaning that additional servers can be added or removed as needed to accommodate changing demands. This makes it easier to manage server resources and ensure that they are being used efficiently. \nDisaster recovery: Data centers often have redundant power supplies, backup generators, and other measures in place to ensure that servers can continue to operate even in the event of a disaster, such as a power outage or natural disaster."
    },
    {
        term: "setuid | special executable",
        prompt: "What is special about an executable file owned by root with the setuid bit on?",
        example: "An executable file owned by root with the setuid bit on has special privileges when executed by a user. Specifically, when a regular user executes such a file, the file runs with the privileges of the root user instead of the user who executed it. This means that the file can perform actions that are normally restricted to the root user, such as accessing and modifying system files and directories, managing user accounts, or installing software.\n\n\
        It's worth noting that while the setuid bit allows an executable to run with the privileges of the file owner, it does not grant access to any additional resources beyond those that are already available to the user who executed the file. For example, if the user executing the file does not have permission to access a particular file or directory, the setuid bit will not override those permissions."
    },
    {
        term: "setuid | name a program",
        prompt: "Can you name any program that we talked about in class that uses setuid? ",
        example: "passwd, sudo, ping, ping6, mount, umount, su, \n\n\
        Some examples of programs that traditionally used setuid include passwd (for changing user passwords), su (for switching to another user's account), ping (for sending network packets), and mount (for mounting file systems)."
    },
    {
        term: "File Permission | Can Shirley ",
        prompt: "Which file above can shirly write and why?",
        description: "larry:x:501:larry\nshirley:x:502:shirley\nherbert:x:503:herbert\nstudent:x:600:larry,shirley\n-rw------- 1 larry student 12 Aug 21 13:06 hw.txt\n-rw-rw---- 1 larry student 12 Aug 21 13:08 project.txt\n-rw-r--r-- 1 larry student 12 Aug 21 13:10 manual.txt",
        example: "shirley can write to project.txt because she is in the group student and the group has write permissions\n\
        She cant read hw.txt\n\
        she can read manual.txt because is open to everyone"
    },
    {
        term: "File Permission | Can larry read the hw.txt and why?",
        prompt: "Can larry read the hw.txt and why?",
        description: "larry:x:501:larry\nshirley:x:502:shirley\nherbert:x:503:herbert\nstudent:x:600:larry,shirley\n-rw------- 1 larry student 12 Aug 21 13:06 hw.txt\n-rw-rw---- 1 larry student 12 Aug 21 13:08 project.txt\n-rw-r--r-- 1 larry student 12 Aug 21 13:10 manual.txt",
        example: "Larry can read/write hw.txt because he is the owner and he has read permissions"
    },
    {
        term: "File Permission | Can herbert write to project.txt and why?",
        prompt: "Can herbert write to project.txt and why?",
        description: "larry:x:501:larry\nshirley:x:502:shirley\nherbert:x:503:herbert\nstudent:x:600:larry,shirley\n-rw------- 1 larry student 12 Aug 21 13:06 hw.txt\n-rw-rw---- 1 larry student 12 Aug 21 13:08 project.txt\n-rw-r--r-- 1 larry student 12 Aug 21 13:10 manual.txt",
        example: "Herbert cannot read project.txt because he is not in the group student"
    },
    {
        term: "File Permission | Can herbert read manual.txt and why?",
        prompt: "Can herbert read manual.txt and why?",
        description: "larry:x:501:larry\nshirley:x:502:shirley\nherbert:x:503:herbert\nstudent:x:600:larry,shirley\n-rw------- 1 larry student 12 Aug 21 13:06 hw.txt\n-rw-rw---- 1 larry student 12 Aug 21 13:08 project.txt\n-rw-r--r-- 1 larry student 12 Aug 21 13:10 manual.txt",
        example: "Herbert can read manual.txt because it is open for read"
    },
    {
        term: "LVM | LVM",
        prompt: "What is LVM?",
        description: "A physical volume is a storage device or partition that can be used as a building block for an LVM. A physical volume is typically a disk or disk partition that has been designated as a physical volume for use by the LVM."
    },
    {
        term: "LVM | Physicial Volume",
        prompt: "What is a physical volume in LVM?",
        description: "A volume group is a collection of physical volumes that have been combined to create a larger pool of storage space. The volume group allows for flexible allocation of storage space and helps to simplify storage management by abstracting away the underlying physical storage devices."
    },
    {
        term: "LVM | Volume Group",
        prompt: "What is a volume group in LVM?",
        description: "A logical volume is a virtual volume that is created within a volume group. Logical volumes are used to provide logical partitions that can be assigned to file systems or used as virtual disks. Logical volumes can be resized or moved within the volume group, providing greater flexibility and ease of management."
    },
    {
        term: "LVM | Logical Volume",
        prompt: "What is a logical volume in LVM?",
        description: "A file system is a method used to organize and store files on a disk or disk partition. File systems can be created on logical volumes, providing a means of storing and accessing files on the logical volume. Common file systems used in Linux include ext4, XFS, and Btrfs."
    },
    {
        term: "automation-potential-errors",
        prompt: "How does automation of an install help prevent problems",
        example: "Automation eliminate the potentials errors that comes out from installing it manually, it also allows faster installation as well as it lets users with little to no knowledge to be able to install successfully"

    },
    {
        term: "server-desktop",
        prompt: "What makes Server hardware different from Desktop hardware",
        example: "erver hardware is designed to handle more specific and heavier tasks, allowing scalability such as the support of RAID configurations. While desktop hardware usually are designed for more user friendly design such as having a gui available and common home utiltites"
    },
    {
        term: "machine-single-running-all",
        prompt: "Why is it poor design to have a single machine running all the services your organization needs (even if this single system is powerful enough to handle it all)?",
        example: "This is poor design because a single point of failure can occur. Resources contention and blocking can occur when multipe services compete for the same resources such as CPU memory and diskss Mantainance  on the services would downtime for the entire organization"
    },
    {
        term: "good domain",
        prompt: "Why is mail.yourcompany.com a good domain for your email server, rather than eagle.yourcompany.com?",
        example: "The first one would be a good domain for the email server as it is intuitive and standard. Causes less confusion and it would be easy for a new technitian to understand the responsability of the domain."
    },
    {
        term: "hostname-vs-IP",
        prompt: "Why is it better to refer to a machine by a hostname on your local network than by its IP address? Think about if you move the services of a server to a new machine.",
        example: "Using hostnames is better because it allows you to refer to the same machine regardless of IP changes, and also makes it easier to memorize the name of the machine. This is especially useful if you move the services of a server to a new machine, as you can simply update the hostname to point to the new machine, without having to worry about IP addresses."
    },
    {
        term: "bootloader",
        prompt: "What does a boot loader do?",
        example: "A bootloader is responsible for loading the operating system into memory during the boot process. It is the first program that runs when a computer starts up and is responsible for initializing the hardware and loading the operating system kernel into memory."
    },
    {
        term: "partition-isolation",
        prompt: "Why is it a good idea to put some partitions on a separate drive from other files and programs?",
        example: "Isolating data through partition separation can improve security by protecting information with distinct access permissions. It also allows for easier modularity and backup, as a single disk can be saved upon. Additionally, separating partitions can help with resource allocation, as different partitions can be optimized for different purposes (e.g. a partition for the OS and another for data storage)."
    },
    {
        term: "passwd-permissions",
        prompt: "The /etc/passwd file can be read by users, but only the superuser can write to it. However, users can run the passwd command, and the passwd command can edit the /etc/passwd file. How is this possible?",
        example: "When a user runs the passwd command, it initiates a process that requires elevated access for it to modify the /etc/passwd file. Therefore, the passwd command calls another program (setuid) that does have the superuser permissions to modify the file. This allows users to change their password without having direct write access to the file, while still ensuring that only the superuser can modify the file itself."
    }
]

const network_final = [
    {
        term: "wireshark-protocol",
        prompt: "What is wireshark used for?",
        description: "Wireshark is a widely used network protocol analyzer or packet sniffer. It is an open-source software tool that allows users to capture and analyze network traffic in real-time. Wireshark can be used for various purposes, including:\n\
        Network Troubleshooting: It helps in diagnosing and resolving network issues by capturing and examining packets to identify errors, latency problems, misconfigurations, or faulty network devices.\n\
        Network Security: Wireshark can be used to analyze network traffic for security purposes, such as detecting and investigating suspicious activities, identifying network attacks (e.g., malware infections, intrusion attempts), and monitoring for unauthorized access or data breaches"
    }, {
        term: "switches-router",
        prompt: "What is the difference between switches and routers?",
        description: "Switches operate at the Data Link Layer, connecting devices within a local network based on MAC addresses. Routers operate at the Network Layer, connecting different networks based on IP addresses, facilitating inter-network communication. Switches forward packets within a network segment, while routers route packets between networks. Switches focus on MAC addresses, while routers use IP addresses. Switches are used within LANs, while routers connect networks and provide additional services like routing protocols, NAT, firewalling, QoS, and VPN support."
    },
    {
        term: "subnet-task",
        prompt: "What is subnet mask?",
        description: "he subnet mask is applied by performing a bitwise logical AND operation between the IP address and the subnet mask. This operation results in the network address, which identifies the specific subnet to which the IP address belongs. The subnet mask consists of a series of consecutive 1s followed by a series of consecutive 0s. The 1s indicate the network bits, while the 0s indicate the host bits. The number of leading 1s in the subnet mask determines the size of the network portion. For description, a common subnet mask is 255.255.255.0, which is written in decimal format. In binary, it is represented as 11111111.11111111.11111111.00000000. This subnet mask is associated with a Class C IP address and allows for 254 host addresses within a network. By applying subnet masks, network administrators can effectively partition a large network into smaller, more manageable subnets, helping with network organization, addressing, and routing. It enables efficient use of IP addresses and allows for better control and segmentation of network traffic.",
        description: "The subnet mask splits the IP address into the host and network addresses, thereby defining which part of the IP address belongs to the device and which part belongs to the network."
    },
    {
        term: "nfs-usage",
        prompt: "What is NFS used for?",
        description: "NFS stands for Network File System, and it is a distributed file system protocol. NFS allows a computer to access files and directories over a network as if they were located on the local storage of the computer. \n\
    \
            It enables remote file sharing and facilitates network-based file access and management. NFS is commonly used in networked environments,\n\
    \
            particularly in UNIX-like systems, to share files and resources among multiple computers or clients.\n\
    \
            Here are some key use cases and benefits of NFS:",
        description: "The Network File System (NFS) is a mechanism for storing files on a network. It is a distributed file system that allows users to access files and directories located on remote computers and treat those files and directories as if they were local."
    },
    {
        term: "product-manager-share-folders",
        prompt: "You are a Product Manager and you want to share a certain folder, called ProjectX, with your team members with whom you share a defined user group on a UNIX system. These files are management-level sensitive documents that the entire group needs to work on the project. As such, you want to share them in such a way that the group has read-only access to the files, and everyone else has no access. Using the numeric representation of permissions, write a command that will allow you to perform this operation on the ProjectX directory that resides in /org/projects/ProjectX",
        description: "chmod 750 /org/projects/ProjectX"
    },
    {
        term: "network-layers",
        prompt: "Describe the 7 (or 5 in the book) network layers.",
        description: "1. Physical Layer: This layer represents the actual physical transmission of data over the network. It deals with the physical components such as cables, connectors, and the electrical signals used for communication.\n\
    2. Data Link Layer: The data link layer provides reliable and error-free communication between two directly connected nodes on the network. It breaks data into frames, performs error detection and correction, and manages flow control.\n\
    3. Network Layer: The network layer is responsible for logical addressing and routing of data across multiple networks. It determines the optimal path for data transmission and ensures data reaches its destination by selecting appropriate routes and managing congestion.\n\
    4. Transport Layer: The transport layer facilitates end-to-end communication between the source and destination hosts. It ensures reliable and error-free data transfer by segmenting data into smaller units (segments) and handling retransmissions, flow control, and error recovery.\n\
    5. Session Layer: The session layer establishes, manages, and terminates communication sessions between applications. It enables synchronization, checkpointing, and recovery of data exchange, allowing for seamless communication between different processes or applications.\n\
    6. Presentation Layer: The presentation layer is responsible for data representation, encryption, compression, and protocol conversion. It ensures that data sent by the application layer is in a format that can be understood by the receiving system.\n\
    7. Application Layer: The application layer is the closest layer to the end-user and interacts directly with applications. It provides services and protocols that enable user applications to access network resources. descriptions include HTTP for web browsing, FTP for file transfer, and SMTP for email."
    },
    {
        term: "advantages-of-sudo",
        prompt: "What are 3 of the advantages of using the sudo command?",
        description: "1. Privilege Separation: The sudo command allows administrators to grant specific privileges to regular users on an as-needed basis. Instead of logging in as the superuser (root) all the time, users can execute privileged commands using sudo and their own account credentials. This practice helps enforce the principle of least privilege by minimizing the risk of accidental or malicious system changes.\n\
    2. Auditing and Accountability: sudo provides an audit trail of user actions. By using sudo to execute commands, administrators can track and log the activities of individual users, including the commands they run and when they run them. This logging capability enhances accountability and simplifies the troubleshooting process by allowing administrators to trace the source of system changes or investigate potential security incidents.\n\
    3. Fine-Grained Access Control: With sudo, administrators can finely control which commands and resources users can access with elevated privileges. Access permissions can be configured at a granular level, specifying which commands are allowed or denied for specific users or groups. This flexibility allows administrators to restrict access to critical commands or sensitive files, reducing the risk of unauthorized modifications or malicious activities."
    },
    {
        term: "reasons-to-use-full-path",
        prompt: "Why is it a good idea to put some partitions (such as /var, /home, and swap) on a separate drive from other data files and programs? What about /tmp? Give specific reasons for each of the filesystems listed.",
        description: "1. /var: The /var directory contains variable data, including log files, spool files, cached data, and databases. By placing /var on a separate drive, you can isolate it from other filesystems to prevent issues caused by disk space limitations. For description, if logs or databases grow significantly, they won't affect the availability of other partitions or programs. Additionally, separating /var can improve system performance since frequent write operations to log files or databases won't compete with other data on the same drive.\n\
    2. /home: The /home directory typically stores user home directories and personal data. By having /home on a separate drive, you can simplify backups and facilitate easier system upgrades or reinstallation. If you need to reinstall the operating system or change the root filesystem, the user data stored in /home can remain intact, ensuring minimal disruption to users and preserving their personal files and settings.\n\
    3. swap: The swap partition or swap file provides virtual memory space that the operating system uses when physical memory (RAM) becomes full. Placing swap on a separate drive can improve system performance since swap activity won't compete for disk resources with other data or programs. It also allows for dedicated swap space management and monitoring.\n\
    4. /tmp: The /tmp directory is used for temporary files created by various applications. By putting /tmp on a separate drive, you can enhance security and stability. Isolating /tmp prevents potential issues caused by runaway processes, denial-of-service attacks, or malicious software filling up the root filesystem, which could lead to system instability or unavailability. Additionally, separate /tmp can improve system performance by avoiding contention with other disk-intensive operations.\n\
    \n\
    Separating these partitions onto different drives or filesystems offers benefits such as improved performance, data isolation, better system stability, simplified management, and enhanced security. It allows you to optimize resource allocation, minimize the impact of certain activities or failures on other components, and streamline administrative tasks related to backup, upgrade, or recovery."
    },
    {
        term: "use-full-path-as-root",
        prompt: "When logged in as root, why is it important to use the full path of programs you run?",
        description: "1. Security: The root user has elevated privileges and can execute any command on the system. By using the full path of a program, you ensure that you are running the intended program and not a malicious or unauthorized version that may exist in a different location. It reduces the risk of inadvertently executing a program with the same name but located elsewhere in the system, such as a user's home directory or a compromised location.\n\
    2. Environment Variability: You eliminate ambiguity and ensure that the desired program is executed regardless of the environment variables or settings.\n\
    3. Script Execution: When writing scripts or automation tasks that are intended to run as the root user, using the full path of programs becomes even more critical. Scripts may be scheduled to run at specific times or by other processes, and the environment variables may differ from when the script is executed manually. By explicitly specifying the full path, you ensure that the script executes with the correct program, regardless of the context in which it runs.\n\
    4. Script Portability: Using the full path of programs in scripts enhances their portability across different systems. Different systems may have variations in the default installation paths or may not have the same programs installed in the same locations. By specifying the full path, you ensure that the script can be executed on different systems without relying on specific assumptions about the system's environment."
    },
    {
        term: "components-of-url",
        prompt: "What are the components of a URL address?",
        description: "1. Protocol: The protocol specifies the communication method to be used when accessing the resource.\n\
    2. Domain or Host: The domain or host component identifies the specific server or network location where the resource is hosted.\n\
    3. Port: The port number represents a specific endpoint or service on the server.\n\
    4. Path: The path refers to the specific file or resource location on the server.\n\
    5. Query Parameters: Query parameters are optional parameters appended to the URL after a question mark.\n\
    6. Fragment Identifier: The fragment identifier appears after a hash symbol in the URL."
    },
    {
        term: "port-address-in-url",
        prompt: "Why isn't the port address of the service requested normally not included in the URL?",
        description: "1. Default Ports: Many internet protocols have well-known default ports assigned to them. Since these default ports are widely known and understood, they do not need to be explicitly specified in the URL.\n\
    2. Simplicity: Including the port in the URL can make it longer and more complex, especially for services that use non-standard ports. Omitting the port from the URL allows for a cleaner and more user-friendly presentation of the web address.\n\
    3. Automatic Handling: Most web browsers and network clients are programmed to handle the default ports automatically. This simplifies the user experience and reduces the need for users to remember or manually enter the port number for common protocols."
    },
    {
        term: "components-of-email-system",
        prompt: "Explain the four components of the email system.",
        description: "1. User Agents (Email Clients): User agents, commonly known as email clients, are software applications or web interfaces that allow users to create, send, receive, and manage email messages.\n\
    2. Mail Transfer Agent (MTA): The Mail Transfer Agent is responsible for the transfer and routing of email messages between mail servers.\n\
    3. Mail Delivery Agent (MDA): The Mail Delivery Agent handles the delivery of incoming email messages to the recipient's mailbox.\n\
    4. Message Access Agent/Server: The Message Access Agent/Server is responsible for providing access to email messages stored on a mail server."
    },
    {
        term: "unix-linux-email-programs",
        prompt: "What programs might a typical email message pass through as one Unix/Linux user emails another, and what do they do?",
        description: "1. Mail User Agent (MUA): This is the program used to compose, read, and send emails.\n\
    2. Mail Transfer Agent (MTA): The MTA sends the email to the recipient's MTA using the Simple Mail Transfer Protocol (SMTP).\n\
    3. Mail Delivery Agent (MDA): The MDA takes the email from the recipient's MTA and places it into the recipient's mailbox.\n\
    4. Mail Retrieval Agents/Protocols: Depending on the email client's setup, it may use protocols like POP or IMAP to retrieve email from the mailbox.\n\
    5. Spam Filters: Programs like SpamAssassin analyze incoming email and filter out unwanted spam.\n\
    6. Security and Encryption tools: Programs like OpenSSL and GnuPG may be used for secure, encrypted email communication."
    },
    {
        term: "top-level-domains-us",
        prompt: "Name at least 4 Top-Level Domains in the U.S. and what they are used for.",
        description: "1. .com (Commercial): The .com TLD is one of the most common and widely used TLDs. It is intended for commercial entities and is often used by businesses, e-commerce websites, and other commercial ventures.\n\
    2. .org (Organization): The .org TLD is traditionally associated with non-profit organizations, foundations, and community groups. It is commonly used by organizations that are not primarily profit-driven, such as non-profits, charities, and open-source projects.\n\
    3. .edu (Education): The .edu TLD is reserved for accredited educational institutions, such as universities, colleges, and educational organizations. It is used to distinguish educational resources and institutions from other types of websites.\n\
    4. .gov (Government): The .gov TLD is exclusively reserved for government entities at the federal, state, and local levels in the United States. Websites with a .gov domain indicate official government websites and online services."
    },
    {
        term: "zone-file-records",
        prompt: "Name at least 3 types of records found in a zone file and what they are for.",
        description: "1. A (Address) Record: An A record associates a domain name with an IPv4 address. It maps a domain (e.g., description.com) to the corresponding IP address (e.g., 192.0.2.1). A records are used to point domain names to specific servers or machines on the internet.\n\
    2. MX (Mail Exchange) Record: An MX record identifies the mail servers responsible for accepting email messages for a domain. It specifies the priority and hostname of the mail servers that should receive incoming emails. MX records enable the proper routing of email to the correct mail servers associated with a domain.\n\
    3. CNAME (Canonical Name) Record: A CNAME record provides an alias or canonical name for a domain. It associates a domain or subdomain with another domain name. CNAME records are often used to create subdomains or to point multiple domains to a single canonical domain."
    },
    {
        term: "nfs-root-squash",
        prompt: "With NFS, what is typically used to prevent users with root access on a client from gaining access to any file?",
        description: "In NFS (Network File System), to prevent users with root access on a client from gaining access to any file on the NFS server, a common approach is to use the 'root squash' feature. Root squash is a security mechanism implemented on the NFS server that maps requests from the root user on the client to a non-privileged user on the server."
    },
    {
        term: "fbi-agent-access-protocol",
        prompt: "If an FBI agent shows up at your office claiming he needs access to private information pertaining to an employee at your company, what is the very first action that you should take?",
        description: "1. Request Identification: Politely ask the agent to provide official identification, such as an FBI badge or credentials. Take note of their name, badge number, and agency affiliation.\n\
    2. Contact Your Legal Department: Inform your legal department or the appropriate authority within your organization immediately. Share the details of the situation and seek guidance on how to proceed.\n\
    3. Validate the Request: Your legal department should initiate direct contact with the FBI to verify the agent's identity, the purpose of their request, and the legal basis for accessing the information."
    },
    {
        term: "backup-services-contract-details",
        prompt: "Suppose you are being hired to provide backup services for a third party. What are the important details that need to be included in the contract? (State 2)",
        description: "1. Scope of Services: Define the scope of backup services to be provided, specifying the data, systems, and technologies covered under the agreement.\n\
    2. Service Level Agreement (SLA): Include a comprehensive SLA that outlines the performance standards, uptime guarantees, response times for support requests, and any penalties or compensations for service-level breaches."
    },
    {
        term: "importance-of-backups",
        prompt: "List two reasons why backups are essential.",
        description: "1. Data Loss Protection: Backups serve as a safeguard against data loss.\n\
    2. Disaster Recovery and Business Continuity: Backups play a vital role in disaster recovery and business continuity planning."
    },
    {
        term: "scheduling-maintenance-factors",
        prompt: "What are some important factors to consider when scheduling maintenance?",
        description: "1. Impact on Operations: Consider the potential impact of maintenance activities on normal operations. Schedule maintenance during periods of low user activity or non-peak hours to minimize disruption.\n\
    2. Service Level Agreements (SLAs): Take into account any SLAs or contractual obligations that specify maintenance windows or response times.\n\
    3. Communication and Notification: Plan for effective communication with stakeholders to inform them of scheduled maintenance, including the duration, expected impact, and any alternative arrangements.\n\
    4. Criticality and Priority: Prioritize maintenance tasks based on their criticality and potential impact on system availability, security, or performance.\n\
    5. Resource Availability: Ensure that necessary resources, including personnel, tools, and equipment, are available for performing the maintenance tasks.\n\
    6. Testing and Validation: Allocate sufficient time for testing, validation, and rollback procedures to ensure that systems are properly functioning after maintenance.\n\
    7. Documentation and Record-Keeping: Maintain thorough documentation of maintenance activities, including procedures, changes made, and any issues encountered."
    },
    {
        term: "dns-method-load-balance-web-server",
        prompt: "What DNS method can be used to load balance a web server?",
        description: "The DNS method that can be used to load balance a web server is called 'Round Robin DNS' or 'DNS load balancing.' Round Robin DNS involves configuring the DNS server to respond to DNS queries for a specific domain with multiple IP addresses, each corresponding to a different web server hosting the same content."
    },
    {
        term: "difference-between-tcp-and-udp",
        prompt: "What is the difference between TCP and UDP, and explain where one might be more appropriate than the other?",
        description: "1. Reliability:\n\
    - TCP: TCP provides reliable and ordered delivery of data. It guarantees that data is received without errors, retransmits lost packets, and ensures data integrity through error checking and acknowledgment mechanisms.\n\
    - UDP: UDP is a connectionless protocol that does not guarantee reliable delivery or ordering of packets. It is a best-effort protocol that delivers packets without error checking or retransmission.\n\
    2. Connection-Oriented vs. Connectionless:\n\
    - TCP: TCP is a connection-oriented protocol. Before data transfer, TCP establishes a reliable and ordered connection between the sender and receiver. It performs handshaking, manages acknowledgments, and ensures data delivery in the correct sequence.\n\
    - UDP: UDP is a connectionless protocol, which means it does not establish a dedicated connection before transmitting data. Each packet is treated as an independent entity and can be sent to the destination without prior communication or setup.\n\
    3. Efficiency and Overhead:\n\
    - TCP: Due to its reliability mechanisms and connection-oriented nature, TCP incurs additional overhead in terms of packet acknowledgments, retransmissions, and flow control. This overhead can introduce higher latency and consume more network resources.\n\
    - UDP: UDP has minimal overhead compared to TCP since it lacks built-in reliability and connection management mechanisms.\n\
    4. Use Cases:\n\
    - TCP: TCP is commonly used for applications that require reliable data transfer and in-order delivery, such as web browsing, file transfers (FTP), email (SMTP, IMAP), remote login (SSH), and transactional protocols (HTTP, HTTPS).\n\
    - UDP: UDP is suitable for applications that prioritize speed, efficiency, and real-time communication over reliability, such as real-time streaming, VoIP, online gaming, DNS lookups, and IoT applications."
    },
    {
        term: "security-problems-with-nfs",
        prompt: "What are some of the security problems associated with NFS (4) and how can these issues be avoided? (5)",
        description: "1. Lack of Authentication and Encryption: By default, NFS traditionally lacked strong authentication and encryption mechanisms. This makes it vulnerable to eavesdropping, unauthorized access, and data tampering during network transmission. Without proper authentication and encryption, sensitive data transferred over NFS can be intercepted or manipulated by attackers.\n\
    2. Weak Access Control: NFS relies on host-based access control, known as the \"host- based security model.\" \n\
    \
            This model uses the client's IP address to determine access permissions, which can be easily spoofed or manipulated. It lacks granularity and does not provide strong access control mechanisms based on user identities or groups.\n\
    \
            3. Insecure Mounting: Improper NFS mounting configurations can lead to security vulnerabilities. For description, using the \"no_root_squash\" option allows the root user on the client to have unrestricted access to files on the NFS server, which can be a significant security risk.\n\
    4. Network Exposure: NFS operates over the network, making it susceptible to network-based attacks, such as sniffing, IP spoofing, or man-in-the-middle attacks. If the network infrastructure is not adequately protected, NFS traffic can be intercepted or manipulated by attackers.\n\
    \n\
    1. Use NFSv4: NFSv4 offers improved security features, including stronger authentication mechanisms and support for encryption. Upgrading to NFSv4 enhances \n\
    \
            data security and protects against unauthorized access and tampering.\n\
    2. Implement Strong Authentication: Use secure authentication mechanisms, such as Kerberos, for NFS. Kerberos provides strong mutual authentication and helps prevent unauthorized access to NFS resources.\n\
    3. Enable Encryption: Enable encryption for NFS traffic using technologies such as IPsec or VPN tunnels. Encryption ensures the confidentiality and integrity of data transmitted over the network.\n\
    4. Implement Network Segmentation: Separate NFS traffic onto dedicated, secure network segments, isolating it from potentially compromised or untrusted networks. Network segmentation helps protect NFS communications and prevents unauthorized access.\n\
    5. Use Secure Mount Options: Implement secure NFS mounting options, such as the \"root_squash\"\
             option, which maps requests from the root user on the client to a non-privileged user on the server. This prevents the root user on the client from gaining unrestricted access to NFS files.\n\
    6. Implement Firewall Rules: Configure firewalls to restrict access to NFS services only from trusted hosts or subnets. Limiting access to NFS services minimizes the exposure to potential attacks.\n\
    7. Regularly Update and Patch: Keep NFS servers and clients up to date with the latest security patches and updates to address any known vulnerabilities.\n\
    8. Implement Network Security Measures: Implement network security measures, such as intrusion detection and prevention systems (IDPS), network monitoring, and secure network configurations, to detect and mitigate any network-based attacks targeting NFS."
    },
    {
        term: "disable-root-access-ssh",
        prompt: "Why is it best to disable root access for SSH login?",
        description: "1. Mitigating Brute Force Attacks: By disabling root access, you make it more difficult for attackers to launch brute force attacks against the root account. Attackers commonly target the root account because it has full administrative privileges. Disabling root login forces attackers to guess both a valid username and password combination, making it harder for them to gain unauthorized access.\n\
    2. Reducing Attack Surface: Disabling root access minimizes the attack surface exposed to potential vulnerabilities. The root account has extensive privileges and can perform critical operations, making it a prime target for exploitation. By disabling direct root login, you limit the potential impact of a successful attack by forcing attackers to compromise a non-root user account first.\n\
    3. Enforcing Principle of Least Privilege: The principle of least privilege dictates that users should only have the privileges necessary to perform their tasks. Granting root access over SSH to users provides excessive privileges that can lead to accidental or intentional misuse. Disabling root login encourages users to log in with their individual accounts, allowing administrators to audit and control their access permissions."
    },
    {
        term: "ssh-vs-telnet",
        prompt: "Why is it better to use SSH instead of Telnet to remotely login to your system?",
        description: "1. Encryption: SSH encrypts all communication between the client and server, including login credentials and transmitted data. This prevents eavesdropping and protects sensitive information from being intercepted. Telnet, on the other hand, sends data in plain text, making it vulnerable to sniffing attacks where attackers can capture and view login credentials and other sensitive data.\n\
    2. Authentication: SSH supports a variety of authentication methods, including public-key authentication, certificates, and password-based authentication. This allows for stronger and more secure authentication mechanisms compared to Telnet's simple username/password authentication. SSH provides an additional layer of security, particularly when using public-key authentication, which can offer stronger resistance against brute force attacks.\n\
    3. Integrity Checks: SSH uses cryptographic integrity checks to ensure that data sent between the client and server has not been modified during transmission. This protects against tampering and data manipulation. Telnet does not provide any built-in integrity checks, making it susceptible to unauthorized modification of data by attackers.\n\
    4. Secure File Transfer: SSH includes secure file transfer capabilities through utilities like SCP (Secure Copy) and SFTP (SSH File Transfer Protocol). These protocols allow for secure file transfers between systems, ensuring the confidentiality and integrity of transferred files. Telnet does not provide built-in secure file transfer mechanisms."
    },
    {
        term: "kill-9-pid",
        prompt: "What does kill -9 pid do?",
        description: "kill -9 pid: The 9 signal, also known as SIGKILL, is a special signal that terminates a process immediately without allowing it to perform any cleanup operations. When you send the SIGKILL signal to a process using kill -9, it forces the process to terminate abruptly. The process does not have the chance to handle or ignore the signal and is forcefully terminated. This signal should be used as a last resort when a process is unresponsive or cannot be terminated by other means."
    },
    {
        term: "kill-1-pid",
        prompt: "What does kill -1 pid do?",
        description: "kill -1 pid: The 1 signal, also known as SIGHUP (Hangup), is commonly used to instruct a process to reload its configuration or reinitialize itself. When you send the SIGHUP signal to a process using kill -1, the process receives the signal and typically responds by re-reading its configuration files or restarting its operation, depending on the application. This signal is often used to trigger a graceful restart of a daemon or to refresh its state."
    },
    {
        term: "a-vs-cname",
        prompt: "What is the difference between A and CNAME records in DNS?",
        description: "1. A (Address) Record: An A record maps a domain name to an IPv4 address. It associates a specific hostname (e.g., www.description.com) with an IPv4 address (e.g., 192.0.2.1). A records are used to point a domain or subdomain directly to the IP address of a specific server or host. Each A record corresponds to a single IPv4 address.\n\
    \n\
    2. CNAME (Canonical Name) Record: A CNAME record creates an alias or canonical name for a domain or subdomain. It associates a hostname with another domain or subdomain name. Instead of specifying an IP address directly, a CNAME record points to the canonical name of another record. When resolving a hostname with a CNAME record, the DNS resolver follows the alias and looks up the associated record to obtain the corresponding IP address."
    },
    {
        term: "/etc/resolv.conf",
        prompt: "What goes in /etc/resolv.conf?",
        description: "The /etc/resolv.conf file typically contains the following information:\n\
    \n\
    1. nameserver: Specifies the IP addresses of the DNS servers to be used for name resolution. Multiple nameserver lines can be added to specify multiple DNS servers.\n\
    2. domain: Specifies the default domain name to be appended to a hostname when resolving it.\n\
    3. search: Specifies a list of domain names to be tried when resolving a hostname.\n\
    4. options: Allows the configuration of additional resolver options, such as the timeout value for DNS queries or the behavior of the resolver library."
    },

    {
        term: "http-https-ports",
        prompt: "What ports are HTTP and HTTPS accessed on?",
        description: "By default, HTTP is accessed on port 80, while HTTPS is accessed on port 443."
    },
    {
        term: "web-page-error-check",
        prompt: "Where would you check to see an error about a web page on your web server? (Apache, Php, cms)",
        description: "1. Web Server Logs: Web servers maintain log files that record various activities and errors. The specific location and naming conventions of these log files depend on the web server software being used. Common web server log files include:\n\
     - Apache HTTP Server: Error logs can be found in files such as /var/log/apache2/error.log or /var/log/httpd/error_log.\n\
     - Nginx: Error logs can be found in files like /var/log/nginx/error.log or /var/log/nginx/error_log.\n\
    2. Application-specific Logs: If the error is related to a specific web application or framework running on the web server, the application may generate its own logs. These logs can provide insights into application-specific errors and issues. The location and naming conventions of these logs vary depending on the application and its configuration.\n\
    3. PHP Error Logs: If your web server is running PHP, you can check PHP error logs to identify any errors or warnings specific to PHP scripts. The location of PHP error logs depends on the PHP configuration, and it can typically be found in a file specified by the error_log directive in the PHP configuration file (php.ini). Common locations include /var/log/php/error.log or /var/log/httpd/php_errors.log.\n\
    4. Content Management System (CMS) Logs: If you are using a CMS like WordPress, Joomla, or Drupal, these systems often have their own logging mechanisms. The CMS logs can provide insights into errors specific to the CMS installation, plugins, or themes being used."
    },
    {
        term: "SELinux",
        prompt: "What is the purpose of SELinux?",
        description: "1. Enhanced Access Control: The most significant purpose of SELinux is to implement advanced access control mechanisms above and beyond what is provided by the standard Linux system. This includes Mandatory Access Control (MAC), which allows access control policies to be defined centrally and enforced consistently across the system.\n\
    2. Confine Program Capabilities: SELinux can be used to confine the abilities of a program to the bare minimum it requires to function correctly. This means that even if an attacker manages to exploit a vulnerable program, they would have limited ability to cause harm, because the program itself has limited capabilities.\n\
    3. Protect User Data: By using a policy that segregates user data from system data and from other users' data, SELinux can help to protect sensitive information from unauthorized access.\n\
    4. Prevent Privilege Escalation: SELinux policies can be designed to prevent a process from gaining more privileges than it was initially granted, helping to prevent attacks that rely on privilege escalation.\n\
    5. Logging and Audit Capabilities: SELinux can provide detailed logs and audit trails about security-related events, which can be used to identify attempted attacks, conduct forensic investigations, and ensure compliance with security policies.\n\
    6. Security Policy Enforcement: Through its policy enforcement mechanism, SELinux ensures that the security policies defined by the system administrator or security officer are strictly enforced by the kernel."
    },
    {
        term: "firewall",
        prompt: "Why use a firewall?",
        description: "1. Protection Against Unauthorized Access: Firewalls help to prevent unauthorized access to your network from external sources. This includes hackers, bots, and malicious programs trying to access your network.\n\
    2. Controlled Network Traffic: Firewalls control the flow of traffic to and from your network based on predefined rules, allowing you to determine which types of traffic are allowed and which are not.\n\
    3. Block Malicious Software: Firewalls can prevent or limit the spread of malicious software like viruses, worms, and ransomware by blocking access to the ports that these programs use to spread.\n\
    4. Prevent Remote Access: Firewalls can help prevent remote access attempts that are unauthorized. This is crucial in preventing attackers from gaining control over network resources.\n\
    5. Logging and Reporting: Firewalls can provide detailed logs of network activity, which can be used for troubleshooting, identifying patterns of malicious activity, and providing evidence in the event of a cyber attack.\n\
    6. Privacy Assurance: By denying unauthorized access, firewalls help ensure the privacy of data stored on your network.\n\
    7. Data Flow Management: Firewalls can be configured to prioritize certain types of traffic, ensuring that the most important data gets through even during times of heavy network use.\n\
    8. Regulatory Compliance: For many businesses, particularly in fields like healthcare, finance, and ecommerce, having a robust firewall in place is often a requirement for compliance with industry regulations and standards."
    },
    {
        term: "Firewall Access for Web Server",
        prompt: "What do you need to do to a firewall to allow access to a web server running HTTP and HTTPS?",
        description: "sudo firewall-cmd --add-service=http --permanent\n\
    sudo firewall-cmd --add-service=https --permanent\n\
    sudo firewall-cmd --reload"
    },
    {
        term: "rsync vs sftp",
        prompt: "Compare rsync to sftp",
        description: "1. rsync:\n\
      - Advantages:\n\
        - Efficient Synchronization: rsync excels at synchronizing files and directories by transferring only the differences between source and destination. This can be beneficial for both binary and text files, especially when dealing with large files or directories.\n\
        - Bandwidth Optimization: rsync's differential transfer mechanism minimizes network usage by transferring only the changed portions of files, making it efficient for both binary and text files.\n\
      - Use Cases:\n\
        - Large File Transfers: If you need to transfer large files or directories and want to optimize bandwidth usage and reduce transfer time, rsync can be a good choice.\n\
        - Incremental Backups: When performing incremental backups, rsync's ability to transfer only the changed parts of files makes it suitable for both binary and text files.\n\
    2. SFTP:\n\
      - Advantages:\n\
        - Secure File Transfer: SFTP provides encryption and secure data transmission over SSH, ensuring the confidentiality and integrity of both binary and text files during transfer.\n\
        - Remote File Management: SFTP allows bidirectional file transfer and provides features for remote file management, making it suitable for both binary and text files.\n\
      - Use Cases:\n\
        - Secure File Transfer: If the primary concern is secure file transfer, especially over untrusted networks, SFTP is recommended for both binary and text files.\n\
        - Remote Access and Management: When the goal is remote access and management of files, such as renaming, deleting, or creating directories, SFTP offers comprehensive capabilities for both binary and text files."
    },
    {
        term: "Server Documentation",
        prompt: "What should you include in the documentation about your servers?",
        description: "1. Server Information:\n\
       - Server name: Unique name or identifier for the server.\n\
       - Server purpose: Description of the server's role or function.\n\
       - Server location: Physical or virtual location of the server.\n\
       - Server IP address(es): IPv4 and/or IPv6 addresses assigned to the server.\n\
       - Operating system: Details about the server's operating system, including version and any specific configurations.\n\
    2. Hardware Configuration:\n\
       - CPU: Type, speed, and number of processors.\n\
       - RAM: Installed memory capacity.\n\
       - Storage: Type and capacity of storage devices (hard drives, SSDs, etc.).\n\
       - Network interfaces: Details about network interfaces, including MAC addresses and speeds.\n\
       - Other relevant hardware components: Include details about additional hardware, such as RAID controllers, network cards, or specialized hardware.\n\
    3. Software and Services:\n\
       - Installed software packages: List the software installed on the server, including their versions.\n\
       - Services running on the server: Document the services running on the server, including their names, versions, and configuration details.\n\
       - Ports and protocols: Specify the ports and protocols used by the services running on the server.\n\
       - Dependencies: Identify any dependencies between different software components or services.\n\
    4. Network Configuration:\n\
       - Network topology: Document the network layout and connections related to the server.\n\
       - IP addressing: Specify the IP addressing scheme used by the server and any associated subnets or VLANs.\n\
       - DNS configuration: Include information about DNS settings, such as domain names, DNS server addresses, and DNS resolver configuration.\n\
    5. Security Information:\n\
       - Access controls: Document the user accounts, roles, and permissions associated with the server.\n\
       - Firewall rules: Include details about the firewall configuration, including allowed and blocked ports, protocols, and IP ranges.\n\
       - Security software: Document any security software or tools installed on the server, such as antivirus or intrusion detection systems.\n\
       - SSL/TLS certificates: Include information about any SSL/TLS certificates used by the server.\n\
    6. Backup and Recovery:\n\
       - Backup procedures: Document the backup schedule, methods, and locations.\n\
       - Recovery procedures: Provide step-by-step instructions for recovering the server in the event of a failure or disaster.\n\
    7. Contact Information:\n\
       - Server administrators: Include contact details for the server administrators or IT support personnel responsible for managing the server.\n\
       - Vendor or support contacts: Document any vendor or support contacts relevant to the server's hardware or software components."
    },
    {
        term: "Network Security Measures",
        prompt: "What kind of security should you have in place for your network in terms of both physical, electronic, and system policies?",
        description: "Physical Security:\n\
    \n\
    1. Restricted Access: Implement physical access controls to limit unauthorized entry to sensitive areas, such as server rooms or network infrastructure facilities. This can include measures like access cards, biometric authentication, or security personnel.\n\
    2. Video Surveillance: Install video surveillance systems to monitor and record activities in critical areas. This helps deter unauthorized access and provides evidence in case of security incidents.\n\
    3. Equipment Protection: Safeguard network equipment and servers by securing them in locked cabinets or racks, ensuring physical protection against theft or tampering.\n\
    4. Environmental Controls: Maintain appropriate environmental conditions (temperature, humidity) to prevent damage to network infrastructure and equipment.\n\
    \n\
    Electronic Security:\n\
    \n\
    1. Firewalls: Implement firewalls to control incoming and outgoing network traffic, protecting against unauthorized access and potential threats.\n\
    2. Intrusion Detection and Prevention Systems (IDPS): Deploy IDPS solutions to detect and respond to suspicious or malicious activities within the network, helping to mitigate security breaches.\n\
    3. Secure Authentication: Enforce strong password policies, multi-factor authentication, and regular password updates to prevent unauthorized access to network resources.\n\
    4. Network Segmentation: Divide the network into segments using VLANs or subnets, limiting the exposure of sensitive systems and reducing the potential impact of security incidents.\n\
    \n\
    System Policies:\n\
    \n\
    1. Patch Management: Regularly update and apply security patches to operating systems, applications, and network devices to address known vulnerabilities and reduce the risk of exploitation.\n\
    2. User Access Controls: Implement role-based access control (RBAC) and least privilege principles to restrict user access to only what is necessary for their roles, minimizing the risk of unauthorized activities.\n\
    3. Data Encryption: Implement encryption mechanisms, such as SSL/TLS, to protect sensitive data during transmission over the network and at rest.\n\
    4. Security Auditing and Monitoring: Implement logging mechanisms to record and monitor system activities for identifying and investigating security incidents. Regularly review logs and employ security information and event management (SIEM) systems to detect potential threats.\n\
    5. Security Awareness Training: Provide regular security awareness training to employees to educate them about security best practices, social engineering threats, and the importance of data protection."
    },
    {
        term: "NAT (Network Address Translation) Benefits",
        prompt: "What does NAT allow you to do for a network?",
        description: "1. IP Address Conservation: NAT conserves public IP addresses by allowing multiple devices in a private network to share a single public IP address. With NAT, organizations can use private IP addresses internally, which are not globally routable, saving valuable public IP address space.\n\
    2. IP Masquerading: NAT hides the private IP addresses of devices on a network. The only addresses visible to the external network (like the Internet) are the public addresses that the NAT system maintains. This enhances security by effectively making the internal network invisible to external networks, which can help protect against certain types of attacks.\n\
    3. Port Forwarding: NAT allows you to use port forwarding to direct external traffic to a specific internal device. For description, if you host a server on your local network, you can use NAT to direct all traffic on a specific port to that server. This is also known as static NAT."
    },
    {
        "term": "Resetting Forgotten Passwords",
        "prompt": "How do you get into your system, if you forgot your password (and the root password)?",
        "description": "1. Single-User Mode: Some operating systems provide a single-user mode or recovery mode that allows you to boot into a minimal environment with root privileges. In this mode, you can reset the password for your user account or the root account. The steps to access single-user mode vary depending on the operating system and boot loader used.\n\
    2. Live CD/USB: Booting from a live CD or USB containing a Linux distribution allows you to access the file system of your installed operating system. From there, you can modify system files to reset the password or gain access to user accounts. This method requires some knowledge of the file system structure and the necessary commands.\n\
    3. Reset with Another Administrator Account: If you have another user account with administrative privileges, you can log in with that account and reset the password for the locked user account.\n\
    4. Password Recovery Tools: There are various third-party password recovery tools available that can help you reset the user or root password. These tools are typically bootable and can be used to reset passwords or bypass the authentication process. However, caution should be exercised when using such tools, as they can carry a risk of data loss or system instability."
    },

    {
        "term": "Dynamic Host Configuration Protocol (DHCP)",
        "prompt": "What is the purpose of DHCP?",
        "description": "1. Automatic IP Address Assignment: DHCP enables the automatic allocation of IP addresses to devices on a network. Instead of manually configuring IP addresses on each device, DHCP dynamically assigns IP addresses from a predefined range or pool. This eliminates the need for manual IP address management and reduces the chances of IP address conflicts.\n\
    2. Centralized Configuration: DHCP allows centralized management and configuration of network parameters. In addition to IP addresses, DHCP can provide other essential network settings, such as subnet mask, default gateway, DNS server addresses, and more. By configuring these parameters centrally on a DHCP server, network administrators can ensure consistency and streamline network configuration.\n\
    3. Efficient Resource Utilization: With DHCP, IP addresses are assigned only when they are needed, and they can be reclaimed when devices are no longer connected to the network or their lease period expires. This efficient allocation and management of IP addresses help optimize the utilization of available IP address space within a network."
    },

    {
        "term": "Address Resolution Protocol (ARP)",
        "prompt": "What is the purpose of ARP?",
        "description": "1. IP to MAC Address Mapping: Computers on a network typically communicate using IP addresses. However, when data is actually transmitted over a network, it needs to be sent to a specific MAC address. ARP is used to find the MAC address that corresponds to a given IP address, enabling proper data transmission.\n\
    2. Enabling Efficient Communication: By resolving IP addresses to MAC addresses, ARP allows devices on a network to communicate efficiently. Without ARP, each packet sent on the network would need to be sent to every device, creating significant network congestion.\n\
    3. Populating the ARP Cache: When a device resolves an IP address to a MAC address, it stores this information in an ARP cache. Future communications can use this cache to more quickly resolve IP addresses to MAC addresses, further improving network efficiency."
    },
    {
        "term": "Mail System Components",
        "prompt": "Compare for a mail system: User Agent, Mail Transfer Agent, Delivery Agent, Access Agent",
        "description": "User Agent (UA):\n\
    \n\
    - Purpose: The User Agent, also known as the Mail User Agent (MUA), is an application or software that allows users to compose, read, and manage email messages. It provides an interface for users to interact with their email accounts, organize emails into folders, and perform actions like sending, receiving, replying, and forwarding messages.\n\
    - Functionality: The UA typically includes features like a graphical interface, message composition tools, address book integration, and management of multiple email accounts. It communicates with the Mail Transfer Agent to send outgoing messages and retrieves incoming messages from the mail server using protocols like POP3 or IMAP.\n\
    \n\
    Mail Transfer Agent (MTA):\n\
    \n\
    - Purpose: The Mail Transfer Agent is responsible for routing and transferring email messages between different mail servers over a network. It facilitates the transmission of emails from the sender's mail server to the recipient's mail server.\n\
    - Functionality: The MTA receives outgoing messages from the User Agent and performs various tasks, including DNS lookups to determine the recipient's mail server, establishing SMTP (Simple Mail Transfer Protocol) connections, and transferring the message to the appropriate destination. It also handles error reporting and queue management for undeliverable or deferred messages.\n\
    \n\
    Delivery Agent (DA):\n\
    \n\
    - Purpose: The Delivery Agent, also known as the Mail Delivery Agent (MDA), is responsible for delivering incoming email messages from the mail server to the recipient's mailbox or storage location.\n\
    - Functionality: The DA receives incoming messages from the Mail Transfer Agent or a mail server's local queue. It processes the messages based on predefined rules or configurations, such as filtering spam or applying user-specific mail sorting. The DA places the delivered messages into the recipient's mailbox or storage location, making them accessible for retrieval by the User Agent.\n\
    \n\
    Access Agent (AA):\n\
    \n\
    - Purpose: The Access Agent, also referred to as the Mail Access Agent or Mail Retrieval Agent, provides access to email messages stored on the mail server for retrieval by the User Agent.\n\
    - Functionality: The AA handles incoming requests from the User Agent to retrieve messages from the server. It communicates with the server using protocols like POP3 (Post Office Protocol) or IMAP (Internet Message Access Protocol) to authenticate the user, retrieve the requested messages, and provide them to the User Agent for display or further processing. The AA may also handle tasks like message flagging, marking messages as read, or managing server-side folders."
    },
    {
        "term": "Mail Forwarding",
        "prompt": "What is the purpose of a mail forward?",
        "description": "Mail forwarding is an optional service that is used to redirect your mail when you move. Contrary to popular belief, mail forwarding does not actually change your address; it simply redirects mail. If you forgot to tell someone or missed a service provider when changing your address, your mail will be forwarded to the right address by USPS. The mail forwarding service is like a safety net, but is not a magical way to change your address!"
    },
    {
        "term": "File Access Control",
        "prompt": "What prevents one user from reading another user's files?",
        "description": "1. User and Group Permissions: File permissions are set to control access at the user and group levels. Permissions specify who can read (read permission), modify (write permission), or execute (execute permission) files. By default, files are typically owned by the user who created them and are only accessible to that user.\n\
    2. Filesystem Permissions: The filesystem itself may have its own permissions that determine which users or groups can access certain directories or files. The filesystem permissions work in conjunction with user and group permissions to enforce access control.\n\
    3. Encryption and Secure File Systems: Encryption techniques can be applied to sensitive files or entire file systems to protect their contents. Encryption ensures that even if unauthorized access is gained to the files, the data remains unreadable without the encryption key."
    },
    {
        "term": "LVM",
        "prompt": "Why use LVM for your disk management?",
        "description": "1. Dynamic Disk Resizing: LVM allows for dynamic resizing of disk partitions, which can be extremely helpful. You can easily increase or decrease the size of logical volumes while they are in use, without any downtime.\n\
    2. Improved Disk Utilization: With LVM, you can pool together storage from multiple disks, allowing you to utilize storage more efficiently by creating volumes that span multiple disks.\n\
    3. Snapshots: LVM supports creating snapshots, which are read-only or read-write copies of a logical volume at a particular point in time. These can be useful for backup purposes, or for testing changes without affecting the original volume.\n\
    4. Easier Storage Upgrade or Replacement: When you need to upgrade or replace a disk, LVM makes it easy to migrate data from one disk to another. You can move data while the original storage remains online and accessible.\n\
    5. Data Striping: LVM can stripe data across multiple physical volumes in a way similar to RAID 0, potentially improving performance for certain types of workloads.\n\
    6. Mirroring: LVM supports mirroring, which can increase data availability similarly to RAID 1.\n\
    7. Encryption: LVM volumes can be encrypted to enhance data security, with the Linux Unified Key Setup (LUKS) often used for this purpose."
    },
    {
        "term": "IMAP, POP3, SMTP",
        "prompt": "Compare IMAP, POP3, SMTP",
        "description": "1. IMAP (Internet Message Access Protocol):\n\
      - IMAP is used for receiving emails.\n\
      - IMAP maintains emails on a mail server and allows an email client to view and manipulate the emails as though they were stored locally on the client's device.\n\
      - Multiple clients can connect to the same mailbox at the same time.\n\
      - It supports multiple folders and synchronization between the client and server. This makes it ideal for users who access their email on multiple devices.\n\
      - Generally, IMAP uses port 143, or port 993 for SSL/TLS encrypted connections.\n\
    \n\
    2. POP3 (Post Office Protocol version 3):\n\
      - POP3 is also used for receiving emails.\n\
      - In contrast to IMAP, POP3 is designed to support \"download and delete\" scenarios. It typically downloads all new messages to the client device and then deletes them from the server. However, most clients can be configured to leave a copy of the messages on the server.\n\
      - It's best suited for users who only access their email from one device.\n\
      - POP3 does not support multiple folders; it presents all messages in one inbox.\n\
      - Generally, POP3 uses port 110, or port 995 for SSL/TLS encrypted connections.\n\
    \n\
    3. SMTP (Simple Mail Transfer Protocol):\n\
      - SMTP is used for sending emails.\n\
      - It works with a Mail Transfer Agent (MTA) to route your email to the correct server for delivery.\n\
      - SMTP servers communicate with one another to transfer emails from one domain to another.\n\
      - Generally, SMTP uses port 25. However, many ISPs block port 25 to prevent spam, so port 587 is often used for email submission from email clients, and port 465 is used for SMTP over SSL."
    },
    {
        term: "extra",
        prompt: "Typa a",
        example: ""
    }
]

const artificialIntelligence = [
    {
        term: "Backpropagation Neural Network",
        description: "A backpropagation neural network is an approach to train neural networks using a supervised learning algorithm. It involves providing the neural network with input-output pairs where the correct output is already known. The network processes the input, generates an output, and compares it to the correct value. If the output is incorrect, adjustments are made to the network's weights and biases through a process called backpropagation. This process is iteratively repeated until the network can produce the desired output.",
        prompt: "Design an application using a backpropagation neural network"
    },
    {
        term: "AI Definitions",
        prompt: "Define in your own words at least one of the following: (a) intelligence, (b) artificial intelligence, (c) agent, (d) rationality, (e) logical reasoning.",
        description: "a. Intelligence refers to the ability of a system or organism to acquire, apply, and adapt knowledge and skills in order to perform well in various environments. b. Artificial intelligence is the field of study that focuses on creating and implementing computer systems capable of performing tasks that typically require human intelligence. c. An agent is an entity that perceives its environment, processes the information, and responds with appropriate actions. d. Rationality is the quality of a system that makes optimal decisions based on its knowledge and available information. e. Logical reasoning is the process of drawing conclusions from premises or facts, ensuring that the resulting conclusions are valid and consistent with the initial information."
    },
    {
        term: "Evan-analogy-Program",
        prompt: "What is the Evan's ANALOGY Program?",
        description: "The Evan's ANALOGY Program (EAP) is a computer-based test designed to measure verbal reasoning ability through analogy questions. The test is often used for admissions purposes by universities, graduate programs, and certain professions, such as law and medicine.",
        example: "The Evan's ANALOGY Program (EAP) is a computer-based test designed to measure verbal reasoning ability through analogy questions. The test is often used for admissions purposes by universities, graduate programs, and certain professions, such as law and medicine."
    },
    {
        term: "evans-analogy-program-extension",
        prompt: "Suppose we extend Evans’s ANALOGY program so that it can score 200 on a standard IQ test. Would we then have a program more intelligent than a human? Explain.",
        example: "The program would not be more intelligent than a human at present, as its proficiency in standard IQ tests only indicates its ability to perform well in these evaluations. These tests do not encompass the other aspects of human intelligence, such as the capacity to formulate strategy, retain information, or reach conclusions through introspection and reflection."
    },
    {
        term: "science-ai-engineering",
        prompt: "Is AI a science, or is it engineering? Or neither or both? Expain.",
        example: "A science can be defined as the systematic acquisition of empirical knowledge through the application of the scientific method. Engineering, on the other hand, involves the practical utilization of scientific knowledge to address societal issues. Artificial Intelligence can be seen as a science in that it involves the systematic study and understanding of AI systems with the aim of advancing the knowledge domain. At the same time, it can also be viewed as an engineering discipline as it leverages this knowledge base to develop practical applications and solutions."
    },
    {
        term: "rationality-ai",
        attachment: "./img/2023-03-26-20-47-01.png",
        prompt: "2.1 Let us examine the rationality of various vacuum-cleaner agent functions. a. Show that the simple vacuum-cleaner agent function described in Figure 2.3 is indeed rational under the assumptions",
        description: "Asumptions: The performance measure awards one point for each clean square at each time step, over a “lifetime” of 1000 time steps. • The “geography” of the environment is known a priori (Figure 2.2) but the dirt distribution and the initial location of the agent are not. Clean squares stay clean and sucking cleans the current square. The Left and Right actions move the agent left and right except when this would take the agent outside the environment, in which case the agent remains where it is. • The only available actions are Left, Right, and Suck. • The agent correctly perceives its location and whether that location contains dir",
        example: "Rational according to ( section 1.1, Russell & Norvig, 2010), is the measure against an ideal performance measure. The system is rational if it does the correct approach given Assignment #2 2 what it knows about the environment (Section 1.1, Russell & Norvig, 2010)\n\
        It can be seen that the agent is indeed doing the right thing, given the perception sequence it has of the environment. b. Describe a rational agent function for the case in which each movement costs one point. Does the corresponding agent program require internal state? If the amount of unclean pieces is known or the environment does not get dirty in the future, the rational agent could stop moving once it knows that the environment is clean, based on the number of pieces collected or after visiting all squares. This would require the agent to use memory to keep track of which areas have been cleaned or to keep count of the number of pieces collected."
    },
    {
        term: "rational-agent",
        prompt: "2.2 What is a rational agent? What is a rational agent function? What is a rational performance measure? What is a rational environment?",
        description: "A rational agent is an agent that does the right thing, given what it knows about the environment. A rational agent function is a function that maps a perception sequence to an action. A rational performance measure is a measure that awards the agent points for doing the right thing. A rational environment is an environment that is such that the agent can do the right thing, given what it knows about the environment.",
        example: " A rational agent is an agent that does the right thing, given what it knows about the environment.\n\
        A rational agent function is a function that maps a perception sequence to an action. A rational performance measure is a measure that awards the agent points for doing the right thing. A rational environment is an environment that is such that the agent can do the right thing, given what it knows about the environment."
    },
    {
        term: "rational-agent-costs-one",
        prompt: "Describe a rational agent function for the case in which each movement costs one point. Does the corresponding agent program require internal state?",
        example: "If the amount of unclean pieces is known or the environment does not get dirty in the future, the rational agent could stop moving once it knows that the environment is clean, based on the number of pieces collected or after visiting all squares. This would require the agent to use memory to keep track of which areas have been cleaned or to keep count of the number of pieces collected."
    },
    {
        term: "rational-agent-clean-squares-dirty",
        prompt: "Discuss possible agent designs for the cases in which clean squares can become dirty and the geography of the environment is unknown. Does it make sense for the agent to learn from its experience in these cases? If so, what should it learn? If not, why not?",
        example: "If this is the case, an agent could learn to predict where dirt is more likely to accumulate on the geography based on past experiences. For example, certain areas may be more likely to become dirty during holidays or at specific times of day, such as morning rush hours. An agent could learn from past experiences and identify patterns or correlations to predict future unclean areas."
    },
    {
        term: "solving-problems-by-search",
        description: "Solving Problems By Searching \n\n\
        • Reflex Agents, which base their actions on a direct mapping from states to actions, Cannot Operate well in environments for which this mapping would be too large to store and would take too long to learn. \n\
        • Goal-based agents, on the other hand, consider future actions and the desirability of their outcomes \n\
        • Problem-solving agents is one kind of goal-based agent \n\
        • Problem-solving agents use atomic representations- that is states of the world are considered as wholes, with no internal structure visible to the problem solving algorithm. \n\
        • First, begin with definitions of the problem and the solution. \n\
        • Then describe several general purpose search algorithms to solve these problems \n\
        • The task environment is one for which the solution is always a fixed sequence of actions.",
        prompt: "Create a problem reoresentation for: On holiday in Romania; currently in Arad. Flight leaves tomorrow from Bucharest",
        example: "Formulate goal: be in Bucharest \n\
        • Formulate problem: states: various cities actions: drive between cities \n\
        • Find solution: sequence of cities, e.g., Arad, Sibiu, Fagaras, Bucharest"
    }
];


// Things that I research by my own
const artificialIntelligence_2 = [
    // Agents
    {
        term: "Rule-based agents",
        prompt: "What are rule-based agents in AI? Provide an example.",
        example: "An example of a rule-based agent is a medical diagnosis system that offers recommendations based on a set of rules derived from medical expertise and patient input.",
        description: "Rule-based agents are AI systems that make decisions according to a predetermined set of rules. These rules, often designed by domain experts, guide the agent's decision-making process in a specific context."
    },
    {
        term: "Utility-based agents",
        prompt: "What are utility-based agents in AI?",
        example: "An example of a utility-based agent is a financial investment algorithm that selects stocks based on maximizing expected returns and minimizing risks.",
        description: "Utility-based agents are AI systems that make decisions by considering the utility or value of each possible outcome. The agent selects the action that maximizes its expected utility, aiming for the most favorable result."
    },
    {
        term: "Learning agents",
        prompt: "What are learning agents in AI?",
        example: "An example of a learning agent is an e-commerce recommendation system that adapts its suggestions based on a user's browsing history and purchase patterns.",
        description: "Learning agents are AI systems that improve their performance over time by learning from experience. These agents employ machine learning algorithms to analyze data, identify patterns, and make better decisions in the future."
    },
    {
        term: "Reflex agents",
        prompt: "What are reflex agents in AI? Provide an example.",
        example: "An example of a reflex agent is a light-sensitive switch that turns on the lights when the ambient light level falls below a predefined threshold.",
        description: "Reflex agents are AI systems that make decisions solely based on their current percepts or sensory input, without considering past experiences or future outcomes."
    },
    {
        term: "Goal-based agents",
        prompt: "What are goal-based agents in AI?, provide an example.",
        example: "An example of a goal-based agent is a personal assistant that helps a user achieve specific goals, such as booking a flight or scheduling a meeting.",
        description: "Goal-based agents are AI systems that have a specific goal they are trying to achieve. They use their percept history to make decisions that will help them achieve their goal."
    },
    {
        term: "Multi-agent systems",
        prompt: "What are multi-agent systems in AI?, provide an example.",
        example: "An example of a multi-agent system is a swarm of drones that work together to survey a large area.",
        description: "Multi-agent systems are AI systems in which multiple agents work together to achieve a common goal. They can be used in a wide range of applications, from robotics to video games."
    },
    {
        term: "Intelligent virtual agents",
        prompt: "What are intelligent virtual agents in AI?, provide an example.",
        example: "An example of an intelligent virtual agent is a chatbot that can answer customer questions and provide support.",
        description: "Intelligent virtual agents are AI systems that interact with humans in a virtual environment. They can be used for a variety of applications, including customer service, education, and entertainment."
    },
    {
        term: "Cognitive architectures",
        prompt: "What are cognitive architectures in AI?, provide an example.",
        example: "An example of a cognitive architecture is ACT-R, a framework for modeling human cognition and decision-making.",
        description: "Cognitive architectures are AI systems that attempt to model human cognition and reasoning. They are used to study how humans think and make decisions, and to develop more intelligent AI systems."
    },
    {
        term: "Hierarchical agents",
        prompt: "What are hierarchical agents in AI?, provide an example.",
        example: "An example of a hierarchical agent is a robot that can perform multiple tasks by breaking them down into smaller subtasks and executing them in a hierarchical manner.",
        description: "Hierarchical agents are AI systems that can perform complex tasks by breaking them down into smaller subtasks and executing them in a hierarchical manner. This allows the agent to handle large, complex problems by dividing them into smaller, more manageable parts."
    },
    {
        term: "Simple reflex agents",
        prompt: "What are simple reflex agents in AI?, provide an example.",
        example: "An example of a simple reflex agent is a thermostat that turns on the heating or cooling system if the temperature goes above or below a certain threshold.",
        description: "Simple reflex agents are a type of AI agent that operate using a set of predefined rules or heuristics based on the current state of the environment. They only react to the current state and do not take into account any history or future states. Simple reflex agents are often used in control systems and other applications where a set of rules can be easily defined."
    },
    {
        term: "Model-based agents",
        prompt: "What are model-based agents in AI?, provide an example.",
        example: "An example of a model-based agent is a self-driving car that uses a map of the environment to plan the best route to a destination.",
        description: "Model-based agents are a type of AI agent that maintain an internal model of the environment and use it to make decisions. They can handle more complex environments than simple reflex agents and can adapt to changing situations more easily. However, model-based agents can be more computationally intensive and may require more resources than simple reflex agents."
    },
    // Lets get into specific searches.
    {
        term: "admissible-heuristic",
        prompt: "What is admissible heuristic in AI? And what algorithms use it?",
        description: "An admissible heuristic is a heuristic function used in heuristic search algorithms that never overestimates the cost of reaching the goal. In other words, an admissible heuristic is a function that always provides an estimate that is less than or equal to the actual cost of reaching the goal.",
        example: "A* search, Greedy best-first search, and Hill climbing are examples of algorithms that use admissible heuristics."
    },
    {
        term: "informed-search",
        prompt: "What is informed search in AI? And what algorithms use it? When in the real world you can use it?",
        description: "Informed search is a type of search algorithm that uses a heuristic function to guide the search towards the goal. Informed search algorithms are more efficient than uninformed search algorithms because they can eliminate many of the nodes that would otherwise be explored.",
        example: "A* search, Greedy best-first search, and Hill climbing are examples of informed search algorithms.\n\
        GPS Navigation, Chess, Solving a Rubik's Cube, and Solving a Sudoku Puzzle are examples of real-world applications of informed search algorithms."
    },
    {
        term: "uninformed-search",
        prompt: "What is uninformed search in AI? And what algorithms use it?",
        description: "Uninformed search is a type of search algorithm that does not use any additional information to guide the search. Uninformed search algorithms are less efficient than informed search algorithms because they must explore all possible nodes in the search space.",
        example: "Breadth-first search and depth-first search are examples of uninformed search algorithms.\n\
        Solving a maze, finding the shortest path between two points, are examples of uninformed search algorithms."
    },
    // https://www.geeksforgeeks.org/introduction-hill-climbing-artificial-intelligence/?ref=lbp
    {
        term: "breadth-first-search",
        prompt: "What is breadth-first search in AI? And what algorithms use it? When in the real world you can use it?",
        description: "Breadth-first search (BFS) is an uninformed search algorithm that explores nodes in a tree or graph level by level. It starts at the root node and expands all neighboring nodes before moving on to the next level of neighbors. BFS is complete and optimal for problems with uniform path costs.\n\
        time complexity: O(b^d) where b is the branching factor and d is the depth of the goal node.\n\
        space complexity: O(b^d) where b is the branching factor and d is the depth of the goal node.",
        example: "Breadth-first search can be used on its own or as a component of other algorithms, such as Iterative Deepening Depth-First Search.\n\
        Finding the shortest path in an unweighted graph, social network analysis, web crawlers, and spreading information in a network are examples of real-world applications of breadth-first search."
    },
    {
        term: "astarsearch",
        prompt: "What is A* search in AI? And what algorithms use it? When in the real world you can use it?",
        description: "A* search is an informed search algorithm that uses a heuristic function to guide the search towards the goal. It combines the advantages of Dijkstra's Algorithm (considering the cost from the start node) and Greedy Best-First Search (using a heuristic function to estimate the remaining cost to the goal). A* search is complete and optimal when used with an admissible and consistent heuristic.\n\
        time complexity: O(b^d)* where b is the branching factor and d is the depth of the goal node. (Given an admissible heuristic)\n\
        space complexity: O(b^d)* where b is the branching factor and d is the depth of the goal node. (Given an admissible heuristic) ",
        example: "A* search is often used on its own or as a component of other algorithms, such as IDA* (Iterative Deepening A*).\n\
        Pathfinding in maps (e.g., GPS navigation), route planning, puzzle-solving (e.g., 8-puzzle, Rubik's Cube), and game AI (e.g., Chess, Go) are examples of real-world applications of A* search."
    },
    {
        term: "depth-first-search",
        prompt: "What is depth-first search in AI? And what algorithms use it? When in the real world you can use it?",
        description: "Depth-first search (DFS) is an uninformed search algorithm that explores nodes in a tree or graph by visiting a node and recursively exploring its children before backtracking. DFS goes as deep as possible before backtracking (Which menas it doesn't stop even after finding the goal), making it memory efficient but not always optimal or complete.",
        example: "Depth-first search can be used on its own or as a component of other algorithms, such as Iterative Deepening Depth-First Search (IDDFS).\n\
        Solving mazes, generating spanning trees for graphs, analyzing network connectivity, and searching for solutions in state - space problems are examples of real- world applications of depth - first search."
    },
    {
        term: "greedy-best-first-search",
        prompt: "What is greedy best-first search in AI? And what algorithms use it? When in the real world you can use it?",
        description: "Greedy best-first search is an informed search algorithm that uses a heuristic function to guide the search towards the goal. It selects the node with the lowest estimated cost to the goal as the next node to explore. Greedy best-first search is not guaranteed to be complete or optimal but can be faster than other search algorithms in certain cases.",
        example: "Greedy best-first search can be used on its own or as a component of other algorithms, such as A* search.\n\
    Pathfinding in maps with simple heuristics, approximate solutions for NP - hard problems(e.g., Traveling Salesman Problem), and solving puzzles with suboptimal solutions are examples of real - world applications of greedy best - first search."
    },
    {
        term: "beam-search",
        prompt: "What is beam search in AI? And what algorithms use it? When in the real world you can use it?",
        description: "Beam search is an informed search algorithm that uses a heuristic function to guide the search towards the goal. It maintains a fixed-size 'beam' of the most promising nodes at each level of the search tree. Beam search explores only the best nodes, making it memory efficient but not always optimal or complete.",
        example: "Beam search can be used on its own or as a component of other algorithms.\n\
        Natural language processing(e.g., speech recognition, machine translation), solving large - scale optimization problems, and real - time decision making in resource - constrained environments are examples of real - world applications of beam search."
    },
    {
        term: "hill-climbing",
        prompt: "What is hill climbing in AI? And  what is the difference between hill climbing and greedy best-first search?",
        description: "",
    },
    {
        term: "adversarial-min-max-logic",
        prompt: "What are the min and max logic in adversarial search with Prunging?",
        example: "Maximizer: \n\
        philosophy: if my children are greater than the top value then I don't need to explore\n\
        Initializes with Alpha = -Inf\n\
        for each child of the current node\n\
        Alpha = max(Alpha, MinValue(child, Alpha, Beta))\n\
        if Alpha >= Beta\n\
        ---- return Alpha\n\
        return Alpha\n\
        \n\n\n\
        Minimizer: \n\
        philosophy: if my children are less than the top value then I don't need to explore\n\
        Initializes with Beta = Inf\n\
        for each child of the current node\n\
        Beta = min(Beta, MaxValue(child, Alpha, Beta))\n\
        if Alpha >= Beta | Prunes if Alpha returned is  \n\
        ---- return Beta (Prune)\n\
        return Beta"
    },
    // Perceptron
    {
        term: "Perceptron | weights",
        prompt: "What are weights on a perceptron? | How could you think of it in Business?",
        example: "A set of values or a dataset for predicting the output value. They are also described as a dataset’s features and dataset. "

    },
    {
        term: "Perceptron | bias",
        prompt: "What is bias on a perceptron? | How could you think of it in Business?",
        example: "The activation function is shifted towards the left or right using bias. You may understand it simply as the y-intercept in the line equation. "
    },
    {
        term: "Perceptron | activation function",
        prompt: "What is activation function on a perceptron? Any application in business?",
        example: "It introduces non-linearity in the perceptron model.\n\
        The activation function is a function that takes in the weighted sum of all of the inputs from the previous layer and then generates and passes an output value (typically nonlinear) to the next layer. \n\
        application: "
    },
    {
        term: "Perceptron | Summation Function",
        prompt: "What is summation function on a perceptron? | How could you think of it in Business?",
        example: "The summation function binds the weights and inputs together. It is a function to find their sum."
    },
    {
        term: "Perceptron | activation functions",
        prompt: "What is activation functions on a perceptron? | How could you think of it in Business?",
        example: "It introduces non-linearity in the perceptron model."
    },
    {
        term: "Perceptron | Gradoemt Descemt",
        prompt: "What is Gradoemt Descemt on a perceptron? | How are they useful?",
        example: "In a perceptron, a gradient refers to the direction and magnitude of the steepest increase or decrease in the output of the perceptron with respect to a small change in the weights of the perceptron. It is used in the process of adjusting the weights of the perceptron during the training phase, in order to minimize the error between the actual output of the perceptron and the desired output. More specifically, the gradient is calculated using the partial derivatives of the error function with respect to each weight of the perceptron. The gradient points in the direction of the steepest increase of the error function, so by moving the weights in the opposite direction of the gradient, the error can be minimized. The size of the step taken in the direction of the gradient is typically controlled by a learning rate parameter, which determines how quickly the weights are updated during the training process.",
        description: ":m During the training process, we present the perceptron with an input example with values x1 = `0.3`, x2 = `0.7`, and the desired output of positive. The current output of the perceptron is calculated as follows:\n\n`output = activation_function(w1 * x1 + w2 * x2 + b)`\n\nLet's say that the activation function is a simple threshold function, such that if the weighted sum is greater than or equal to 0, the output is positive, otherwise it is negative.\n\nSo in this case, we have:\n\n`output = activation_function(0.5 * 0.3 + 0.2 * 0.7 + b)`\n\nLet's assume that the bias term b is also set to `0.2` for simplicity. Then we have:\n\n`output = activation_function(0.29)`\n\nLet's say that the actual output is negative, so there is an error of `-1`. We can then calculate the gradient of the error function with respect to the weights as follows:\n\ndE/dw1 = x1 * error = `0.3 * -1 = -0.3`\ndE/dw2 = x2 * error = `0.7 * -1 = -0.7`\nThe gradient points in the direction of the steepest decrease in the error function, so we want to update the weights in the opposite direction of the gradient. Let's assume that the learning rate is `0.1` for simplicity. Then we can update the weights as follows:\n\n`w1 = w1 - learning_rate * dE/dw1 = 0.5 - 0.1 * (-0.3) = 0.53`\n`w2 = w2 - learning_rate * dE/dw2 = 0.2 - 0.1 * (-0.7) = 0.27`"
    },
    {
        term: "Unsurpervised | hebbian vs competitive",
        prompt: "What is the difference between hebbian and competitive learning? | How are they useful?",
        example: `Hebbian learning is a type of associative learning that strengthens the connections between neurons that fire simultaneously. This is based on the idea that when two neurons fire together, the connection between them is strengthened, which is often referred to as "cells that fire together, wire together." Hebbian learning can be useful for learning patterns in data, such as identifying common features in images or recognizing speech. On the other hand, competitive learning is a type of learning that involves neurons competing with each other to become active. In this type of learning, a group of neurons receive the same input, and the neuron with the highest activation becomes active while the others remain inactive. Competitive learning can be useful for clustering similar data together or finding the most salient features in a dataset.\n\n\
        Hebbian learning is useful when the goal is to identify patterns in data, such as recognizing common features in images or identifying correlations between variables. Hebbian learning is often used in unsupervised learning tasks, where the network is not given explicit labels for the input data.\n\
        \n\
        Competitive learning, on the other hand, is useful when the goal is to cluster similar data together or to identify the most salient features in a dataset. Competitive learning can also be used for dimensionality reduction, where the goal is to reduce the number of input variables while retaining as much information as possible.`,
    },
    {
        term: "Perceptron Model",
        prompt: "What is a perceptron model? | How are they useful?",
        example: ":m A perceptron is a type of artificial neuron that is used in artificial neural networks. \n\
        It consists of a single neuron with a set of weights and a bias term.\n\
        The perceptron takes in a set of inputs and produces a single output. The output of the perceptron is calculated as follows:\n\n\
        `output = activation_function(w1 * x1 + w2 * x2 + ... + wn * xn + b)`\n\n\
        where `w1, w2, ..., wn` are the weights, `x1, x2, ..., xn` are the inputs, b is the bias term, and the activation function is a function that takes \n\
        in the weighted sum of all of the inputs from the previous layer and then generates and passes an output value (typically nonlinear) to the next layer. \n\
        The perceptron is typically used in the first layer of a neural network, where it takes in the input data and passes the output to the next layer. \n\
        The perceptron is often used in conjunction with other types of neurons, such as sigmoid neurons, which are used in the hidden layers of a neural network.",

    },
    {
        term: "Backpropagation two phases",
        prompt: "What are the two phases of backpropagation? | How are they useful?",
        example: "The two phases of backpropagation are the forward pass and the backward pass. \n\
        In the forward pass, the input is fed into the network and the output is calculated. In the backward pass, the error is calculated and the weights are updated. \n\n\
        The forward pass is useful for calculating the output of the network, while the backward pass is useful for updating the weights of the network. \n\
        The forward pass is also known as the feedforward pass, while the backward pass is also known as the backpropagation pass.",
        description: "`Forward phase`- Activation functions propagate from the `input layer` to the output layer. All weighted inputs are `added to compute outputs` using the `sigmoid threshold`.\n\n\
        `Backward phase`- The errors between the `observed actual` value and the `demanded nominal value in the output layer` are propagated backward. \n\
        The weights and bias values are modified to achieve the requested value. The modification is done by apportioning the `weights` and `bias` to each unit according to its impact on the error."
    },
    {
        term: "Perceptron | Perceptron function",
        prompt: "What is a perceptron function? | How are they useful?",
        example: "Perceptron function ”f(x)” is generated by multiplying the input ‘x’ with the learned weight coefficient ‘w’. The same can be expressed through the following mathematical equation:"
    },
    {
        term: "corresponding y values",
        prompt: "Suppose you are given a list x, and a list of corresponding y values\n\
        create a scatter plot of the (x,y) values. Then perform a 1d polynomial fit to the data. Plot the polynomial on top of the scatter plot.",
        description: "# Suppose you are given a list x, and a list of corresponding y values\n\
        x=[1,2,3,4,5,6,7,8,9,10,12,13,14,15,16,18,19,21,22n\n\
        y=[100,90,80,60,60,55,60,65,66, 67, 70,75,76,78,79,90,99,99,100]\n\
        import numpy as np\n\
        import matplotlib.pyplot as plt\n\
        Use these lists to scatter plot the (x,y) values. Then perform a 1d poly",
        example: "\n\
        plt.scatter(x, y, color='black', label='scatter_data')\n\
        \n\
        # Then perform a 1d polynom\n\
        deg = 3\n\
        coeffs = np.polyfit(x, y, deg)\n\
        polynom_1d = np.poly1d(coeffs)\n\
        \n\
        # Plot the polynomial\n\
        \n\
        # Range of the polynomial\n\
        domain = np.linspace(min(x), max(x), 100)\n\
        plt.plot(domain, polynom_1d(domain), color='red', label='1d_polynom')\n\
        plt.legend()\n\
        plt.xlabel('x')\n\
        plt.ylabel('y')\n\
        plt.show()"
    },
    {
        term: "One layer perceptron",
        prompt: "Whats the problem with one layer perceptron? Why there is a need for 3 layer problems?",
        example: "The problem with one layer perceptron is that it can only solve linearly separable problems. \n\
        It can only separate into one plane.\n\
        "
    },
    {
        term: "What are features?",
        prompt: "What are features? | How are they useful?",
        example: " It represents the multidimensional space where the input data and their corresponding features reside.\n\
        For example, in an image classification task, the input space would represent all possible images, where each image is characterized by pixel values or other relevant features.\n\
        is a transformed or encoded version of the input space. It represents a space where the input features are organized or mapped to facilitate analysis and learning. "
    },
    // Homework 6
    {
        term: "Own linear formula",
        prompt: "Create your own linear formula by filling the follwoing",
        description: ":m\
        import numpy as np\n\
        import matplotlib.pyplot as plt\n\
        \n\
        # Define the input (x) and output (y) data\n\
        x = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 12, 13, 14, 15, 16, 18, 19, 21, 22]\n\
        y = [100, 90, 80, 60, 60, 55, 60, 65, 66, 67, 70, 75, 76, 78, 79, 90, 99, 99, 100]\n\
        \n\
        ## => Calculate the means of x and y\n\
        \n\
        ## => Calculate the slope and y-intercept of the line\n\
        \n\
        # Create a line of 100 points between x=1 and x=22\n\
        myline = np.linspace(1, 22, 100)\n\
        \n\
        # Evaluate the line at each point of the line\n\
        mymodel = m*myline + b\n\
        \n\
        # Plot the original data and the line fit\n\
        plt.scatter(x, y, color='blue', label='data')\n\
        plt.plot(myline, mymodel, color='red', label='A simple linear fit')\n\
        \n\
        # Add a legend and labels to the plot\n\
        plt.legend()\n\
        plt.xlabel('x')\n\
        plt.ylabel('y')\n\
        \n\
        # Show the plot\n\
        plt.show()",
        example: "\
            # Calculate the means of x and y\n\
            x_mean = sum(x) / len(x)\n\
            y_mean = sum(y) / len(y)\n\
            \n\
            # Calculate the slope and y-intercept of the line\n\
            numerator = sum((xi - x_mean)*(yi - y_mean) for xi, yi in zip(x, y))\n\
            denominator = sum((xi - x_mean)**2 for xi in x)\n\
            m = numerator / denominator\n\
            b = y_mean - m*x_mean"
    },
    // Hw 7 + Exploration
    {
        term: "perceptron | perceptron composition",
        prompt: "What is a perceptron? How is it structured?",
        example: "A perceptron takes in a set of inputs and produces a single output. The output of the perceptron is calculated as follows:\n\n\
        `output = activation_function(w1 * x1 + w2 * x2 + ... + wn * xn + b)`\n\n\
        where `w1, w2, ..., wn` are the weights, `x1, x2, ..., xn` are the inputs, b is the bias term, and the activation function is a function that takes \n\
        in the weighted sum of all of the inputs from the previous layer and then generates and passes an output value (typically nonlinear) to the next layer. \n\
        The perceptron is typically used in the first layer of a neural network, where it takes in the input data and passes the output to the next layer. \n\
        "
    },
    {
        term: "sigmoid functions",
        prompt: "What is sigmoid functions? Example usecase?",
        description: "\n\
        The sigmoid function is a special form of the logistic function and is usually denoted by σ(x) or sig(x). It is given by:\n\
        \n\
        σ(x) = 1/(1+exp(-x))\n\n\
        The sigmoid function is also called a squashing function as its domain is the set of all real numbers, and its range is (0, 1). Hence, if the input to the function is either a very large negative number or a very large positive number,  the output is always between 0 and 1. Same goes for any number between -∞ and +∞.",
        example: "It is commonly used for models where we have to predict the probability as an output. Since probability of anything exists only between the range of 0 and 1, sigmoid is the right choice because of its range."
    },
    {
        term: "sigmoid functions | patterns",
        prompt: "How is a perceptron used to classify 2 pattern classes?",
        example: `A perceptron is a simple type of neural network that can be used to classify patterns into two classes. It learns to separate the patterns by adjusting its weights and bias based on the training data.`,
    },
    {
        term: "sigmoid functions | augment patterns",
        prompt: "What is an augmented pattern vector and why is it used.",
        example: "An augmented pattern vector is an extended version of the original input pattern vector that includes an additional component called the bias or bias term. It is used in machine learning algorithms, including perceptrons and other neural network models.",
    },
    {
        term: "reward-punishment",
        prompt: "How is reward-punishment used to separate 2-D patterns such that (0,0)T\n\
        and (0,1)T  represent one class (ω1 ) and (1,0)T  and (1, 1)T  to represent a second class (ω2 ). If it can separate these pattern",
        example: "To separate the 2-D patterns into two classes using the reward-punishment procedure, \n\
        we can apply the perceptron learning algorithm. Let's go through the steps:"
    },
    {
        prompt: "Explain how the Neural Net program Neurolab in Python can be used to set up the network and train a perceptron to separate the patterns not using reward-punishment.\n\
        ",
        term: "neuro-lab",
        example: "Although the perceptron learning algorithm with the reward-punishment procedure is not directly implemented in Neurolab, we can still use Neurolab to set up a network and train a perceptron to separate patterns. "
    },
    {
        term: "3-layer neural network",
        prompt: "Explain why a 3-layer neural network having a hidden layer can solve the deficiencies of the perceptron.",
        description: "\n\
            A 3-layer neural network with a hidden layer can solve the deficiencies of the perceptron by introducing non-linearity and allowing for more complex decision boundaries. Here are a few key reasons why a 3-layer neural network can overcome the limitations of a perceptron:\n\
            \n\
            1. Non-linearity: The perceptron is limited to learning linear decision boundaries. It can only classify patterns that are linearly separable. However, many real-world problems require non-linear decision boundaries to accurately classify complex patterns. By introducing a hidden layer with non-linear activation functions, a 3-layer neural network can learn and represent non-linear relationships between input features and output classes. This enables the network to solve more complex classification tasks that the perceptron cannot handle.\n\
            \n\
            2. Representation power: The perceptron has limited representation power due to its linear nature. It can only learn and represent simple linear functions. In contrast, a 3-layer neural network with a hidden layer can learn and represent highly complex functions by combining multiple non-linear transformations. The hidden layer allows the network to capture and represent intricate patterns and relationships within the data, enabling it to solve more challenging classification problems.\n\
            \n\
            3. Feature extraction: The hidden layer in a 3-layer neural network can act as a feature extractor. It learns to automatically extract relevant features from the input data and transform them into a higher-dimensional representation. This feature extraction capability enables the network to identify and capture informative representations of the input patterns, making it more effective at discriminating between different classes. In contrast, the perceptron directly operates on the raw input features without any intermediate feature extraction step.\n\
            \n\
            4. Generalization: A 3-layer neural network with a hidden layer has better generalization capabilities compared to a perceptron. The hidden layer allows the network to learn abstract representations of the input patterns, which helps in handling noise, variations, and unseen data. The additional layer provides more flexibility in modeling complex relationships, making the network less susceptible to overfitting and better able to generalize to unseen examples.\n\
            \n\
            In summary, a 3-layer neural network with a hidden layer can overcome the limitations of the perceptron by introducing non-linearity, enhancing representation power, enabling feature extraction, and improving generalization capabilities. These advantages make it capable of solving more complex classification tasks that involve non-linear decision boundaries and intricate patterns in the data.",
        example: "The backpropagation algorithm uses the delta rule to adjust the weights and biases of the network based on the errors propagated backward from the output layer. The delta rule determines the weight updates by multiplying the error term with the input or output of the corresponding neuron. These weight updates gradually minimize the error by adjusting the network's parameters to improve its performance in approximating the target outputs."
    },
    {
        term: "CNF Form | eg 1",
        prompt: "(p ∧ (q ∨ ¬r)) → (¬p ∨ r) into CNF:",
        description: "\
            Eliminate implications: Replace any implication (p → q) with its equivalent form (¬p ∨ q).\n\
            \n\
            Move negations inward: Use De Morgan's laws to push negations inward by applying the following rules:\n\
            \n\
            ¬(p ∧ q) becomes (¬p ∨ ¬q)\n\
            ¬(p ∨ q) becomes (¬p ∧ ¬q)\n\
            \n\
            Distribute disjunctions over conjunctions: Use the distributive property to distribute disjunctions over conjunctions. This step involves converting any nested conjunctions or disjunctions into separate clauses.\n\
            \n\
            (p ∧ (q ∨ r)) becomes ((p ∧ q) ∨ (p ∧ r))\n\
            \n\
            Repeat steps 2 and 3 until no further simplification is possible.",
        example: "\
            Eliminate implications:\n\
            (p ∧ (q ∨ ¬r)) → (¬p ∨ r) becomes (¬(p ∧ (q ∨ ¬r))) ∨ (¬p ∨ r)\n\
            \n\
            Move negations inward:\n\
            ¬(p ∧ (q ∨ ¬r)) becomes (¬p ∨ ¬(q ∨ ¬r))\n\
            ¬(q ∨ ¬r) becomes (¬q ∧ r)\n\
            \n\
            Updated formula: (¬p ∨ ¬(q ∨ ¬r)) ∨ (¬p ∨ r)\n\
            \n\
            Distribute disjunctions over conjunctions:\n\
            (¬p ∨ ¬(q ∨ ¬r)) becomes (¬p ∨ (¬q ∧ r))\n\
            \n\
            Updated formula: (¬p ∨ (¬q ∧ r)) ∨ (¬p ∨ r)"
    },
    {
        term: "CNF Form | eg 2",
        prompt: " (p → q) ∧ (q → r) into CNF.",
        example: `\n\
        Eliminate implications:\n\
        (p → q) ∧ (q → r) becomes (¬p ∨ q) ∧ (¬q ∨ r)\n\
        \n\
        The formula is already in CNF since it is a conjunction of clauses, and each clause is a disjunction of literals.\n\
        \n\
        CNF form: (¬p ∨ q) ∧ (¬q ∨ r)"`

    },
    {
        term: "CNF Form | eg 4",
        prompt: "Convert the formula (p ∨ q) ∧ (¬p ∨ r) ∧ (¬q ∨ s) into CNF.",
        example: "\
        The formula is already in CNF since it is a conjunction of clauses, and each clause is a disjunction of literals.\n\
        \n\
        CNF form: (p ∨ q) ∧ (¬p ∨ r) ∧ (¬q ∨ s)"
    },
    {
        term: "De morgan | 1",
        prompt: "Apply De Morgan's laws to simplify the following expression: ¬(p ∨ q ∧ ¬r).",
        example: "\
        Using De Morgan's laws, we can distribute the negation sign to each component of the expression:\n\
        ¬(p ∨ q ∧ ¬r) becomes (¬p ∧ ¬(q ∧ ¬r))\n\
        Then, applying De Morgan's laws again to the nested conjunction:\n\
        (¬p ∧ ¬(q ∧ ¬r)) becomes (¬p ∧ (¬q ∨ r))\n\
        \n\
        Simplified expression: ¬p ∧ (¬q ∨ r)"

    },
    {
        term: "Simplify |  =>  p ∧ (q ∨ r)",
        prompt: "Simplify the following expression: (p ∧ q) ∨ (p ∧ r).",
        example: "\
        Applying the distributive law, we can distribute the conjunction over the disjunction:\n\
        (p ∧ q) ∨ (p ∧ r) becomes (p ∧ (q ∨ r))\n\
        \n\
        Simplified expression: p ∧ (q ∨ r)"
    },
    {
        term: "CNF of the Wampus World",
        prompt: "B[1, 1] <=> (P [1, 2] V P [2, 1])",
        example: "\
        2. This is accomplished for the sentence in Wampus World: B1,1 ⇔(P1,2 ∨ P2,1) as follows:\n\
            a) Eliminate ⇔ by replacing α⇔β, with (α→β ) ∧ (β→α).\n\
            (B1,1 →(P1,2 ∨ P2,1)) ∧ ((P1,2 ∨P2,1)→B1,1)\n\
            b) Eliminate → by replacing (α→β ) with ¬α ∨β\n\
            (¬B1,1 ∨(P1,2 ∨ P2,1)) ∧ (¬(P1,2 ∨P2,1)∨B1,1)\n\
            c) CNF requires only literals have a ¬\n\
            (¬B1,1 ∨(P1,2 ∨ P2,1)) ∧ (¬P1,2 ∧¬P2,1)∨B1,1)\n\
            d) After applying DeMorgan’s theorem and distributative laws:\n\
            (¬B1,1 ∨P1,2 ∨ P2,1)∧(¬P1,2 ∨B1,1) ∧(¬P2,1∨B1,1)"
    },
    {
        term: "maximum likelihood estimate",
        prompt: "What is maximum likelihood estimate? What does it mean when someone says that they have found the maximum likelihood estimate for the mean or standard deviation?",
        example: "It means that they found the value for the mean or the standard deviation that maximizes the likelihood that you observed the things you observed",
        attachment: "./img/2023-05-21-20-30-12.png"

    },
    {
        term: "Mutual Information",
        description: "Here's a simple way to think about it: If the two tests are completely unrelated, knowing the score on one test wouldn't tell you anything about the score on the other test. The mutual information would be low because there is no information shared between the two.\n\
        On the other hand, if the two tests are strongly related, knowing the score on one test could give you a lot of information about the score on the other test. The mutual information would be high because the scores on one test would provide valuable clues or hints about the scores on the other test.",
        prompt: "What is mutual information? When is it useful?",
        example: "Mutual information is a concept used to measue how much two things are related or provide information about each other. It helps us understand how knowing something about one thing can give us information about another thing.\n\
        \n\
        Mutual information is useful in machine learning because it can be used to measure the amount of information shared between two variables. This can be helpful in determining which features are most useful for predicting the target variable in a machine learning model."
    },
    {
        term: "Minimum Description Length",
        prompt: "What is minimum description length principle in MDL?",
        example: "The MDL principle suggests that the best model is the one that achieves a balance between simplicity (fewer parameters) and accuracy (low residual errors). It avoids both underfitting (oversimplified model) and overfitting (excessively complex model).\n\
        Model Complexity: This refers to the number of parameters or assumptions used by the model. A complex model with many parameters can potentially fit the data very closely but may overfit or capture noise instead of true patterns. On the other hand, a simple model with fewer parameters may not capture all the intricacies of the data but may be more robust and generalize better to new data.\n\
        \n\
        Residual Error: This represents the remaining discrepancies between the model's predictions and the actual data. The goal is to minimize these errors by finding a model that captures the most important patterns or relationships in the data."
    },
    {
        term: "What is Gradient descent algorithm in Model searching?",
        prompt: "What is Gradient descent algorithm in Model searching?",
        example: "The idea behind Gradient Descent in machine learning is to iteratively adjust the model's parameters in a way that minimizes the difference between the model's predictions and the actual data. It's like finding the best combination of parameter values that make our model perform well on the given task.\n\
        \n\
        By continuously updating the parameters based on the gradients and the error, Gradient Descent helps us search through the space of possible parameter values to find the ones that yield the best model performance.",
        attachment: "./img/2023-05-21-21-33-43.png"
    },
    {
        term: "What is the learning rate in Gradient descent algorithm?",
        prompt: "What is the learning rate in Gradient descent algorithm?",
        example: "The learning rate is a hyperparameter that controls how much the model's parameters are updated at each step of the optimization process. It determines the size of the steps taken in the direction of the gradient. A larger learning rate means that the parameters are updated more quickly, while a smaller learning rate means that the parameters are updated more slowly.",
        attachment: "./img/2023-05-21-21-37-25.png"
    },
    {
        term: "What is regularization?",
        prompt: "What is regularization?",
        example: "Regularization is a technique used to prevent overfitting by adding a penalty term to the loss function.\
        This penalty term encourages the model to learn simpler patterns that generalize better to new data. \
        It helps to reduce the model's variance and improve its generalization performance.",
    },
    {
        term: "What is a pattern class?",
        prompt: "What is a pattern class?",
        example: "Set of patterns that are 'Close' in Pattern Space"
    },
    {
        term: "What is a pattern Space?",
        prompt: "What is dimension of the pattern Space?",
        example: "Is the number of features that are needed to determine the patterns."

    },
    {
        term: "What are Epochs?",
        prompt: "What are Epochs?",
        description: "Imagine you are studying for an exam, and you have a set of practice questions. Each time you go through all the questions in the practice set, it counts as one epoch. Each question represents a training example, and your goal is to learn and improve your understanding of the material by repeatedly going through the practice questions.\n\
        \n\
        Similarly, in machine learning, an epoch represents a full iteration over the entire training dataset. The number of epochs determines how many times the model will see and learn from the training examples. By going through multiple epochs, the model has more opportunities to adjust its parameters and improve its predictions.\n\
        \n\
        Choosing the appropriate number of epochs is important. Too few epochs may result in an underfit model that hasn't fully learned the patterns in the data. On the other hand, too many epochs can lead to overfitting, where the model becomes too specialized to the training data and fails to generalize well to new, unseen examples.",
        example: `
        In machine learning, an epoch refers to a complete pass through the entire training dataset during the training phase of a model. It is a measure of how many times the algorithm has iterated over the entire dataset while updating the model's parameters.`
    },
    {
        term: "Gradient Descent",
        prompt: "What is the Gradient Descent Main Idea?",
        description: "\
        The main idea behind gradient descent is simple. Given a function defined by a set of parameters, gradient descent starts with an initial set of parameter values and iteratively moves toward a set of parameter values that minimize the function. This iterative minimization is achieved by taking steps in the negative direction of the function gradient.\n\
        \n\
        Here are the basic steps in the gradient descent algorithm:\n\
        \n\
        1. Initialize the parameters randomly.\n\
        2. Compute the cost function.\n\
        3. Compute the gradient of the cost function (i.e., the first derivative of the function with respect to the parameters).\n\
        4. Update the parameters by taking a step in the direction opposite to the gradient. This step size is determined by the learning rate, which is a hyperparameter that you set.\n\
        5. Repeat steps 2-4 until the algorithm converges to a minimum."
    },
    {
        term: "Where does the gradient vector point to? What does it mean?",
        prompt: "Where does the gradient vector point to? What does it mean?",
        description: "The gradient vector points in the direction of the steepest ascent. It tells us which direction to move in order to increase the function's value the most.\n\
        The magnitude of the gradient vector tells us how steep the slope is in that direction. \n\
        A larger magnitude means that the slope is steeper, while a smaller magnitude means that the slope is flatter."
    },
    {
        term: "Stochastic Gradient Descent",
        "prompt": "What is Stochastic Gradient Descent?",
        attachment: "./img/2023-05-22-23-29-13.png",
        description: "\
        Stochastic Gradient Descent (SGD) is a variant of the standard (batch) Gradient Descent algorithm. While standard gradient descent computes the gradient using the entire dataset, which can be computationally expensive and slow for large datasets, Stochastic Gradient Descent estimates the gradient using a single randomly picked training example.\n\
        \n\
        Here are the steps in Stochastic Gradient Descent:\n\
        \n\
        1. Randomly shuffle the dataset.\n\
        2. For each example in the dataset:\n\
            1. Compute the gradient of the cost function for the given example.\n\
            2. Update the parameters by taking a step in the direction opposite to the gradient.\n\
        \n\
        Stochastic Gradient Descent has several advantages over standard gradient descent:\n\
        \n\
        1. Because it uses a single example at a time, it can be much faster for large datasets.\n\
        2. Because it's stochastic (i.e., random), it can escape from shallow local minima of the cost function. This is a common problem in neural network training where the cost function is non-convex and has many local minima.\n\
        \n\
        However, Stochastic Gradient Descent also has some downsides. The main one is that it's noisy due to the stochastic nature. The cost function can fluctuate wildly during training, and the final parameters may not be the global optimum. To mitigate this, a variant called Mini-batch Gradient Descent is often used, which strikes a balance between batch gradient descent and stochastic gradient descent by using a mini-batch of n training examples at each step instead of just 1."
    },
    // Logical Equivalence
    {
        term: "Contrapostion",
        prompt: "(a=>b)",
        example: "(¬b=>¬a)"
    },
    {
        term: "Implication Elimination",
        prompt: "(a=>b)",
        example: "(¬a∨b)"
    },
    {
        term: "Biconditional Elimination",
        prompt: "(a<=>b)",
        example: "((a=>b)∧(b=>a))"
    },
    {
        term: "De Morgan",
        prompt: "¬(a∧b)",
        example: "(¬a∨¬b)"
    },
    {
        term: "Dsitribuity",
        prompt: "(a∧(b∨c))",
        example: "((a∧b)∨(a∧c))"
    },
    // Summary Inference and Knowledge Base
    // TODO Ask Chat GPT more about these
    {
        term: "What is syntax?",
        prompt: "What is syntax?",
        example: "Formal rules for constructing valid sentences in a language"
    },
    {
        term: "What is semantics?",
        prompt: "What is semantics?",
        example: "The meaning of a sentence\n\
        Truth of senteces in a model (world)",

    },
    {
        term: "What is an inference?",
        prompt: "What is an inference?",
        example: "Deriving new sentences from old ones",
        description: "\
        Premise 1: If it is raining, then the ground is wet. (p → q)\n\
        Premise 2: It is raining. (p)\n\
        \n\
        Conclusion: Therefore, the ground is wet. (q)\n\
        \n\
        In this example, we have two premises. The first premise establishes a logical implication between rain (p) and a wet ground (q). The second premise states that it is indeed raining. From these two premises, we can make the logical inference that the ground must be wet as a result.\n\
        \n\
        Using modus ponens, a valid inference rule in propositional logic, we can derive the conclusion. Modus ponens states that if we have a conditional statement (p → q) and the assertion of the antecedent (p), we can infer the consequent (q)."
    },
    {
        term: "What is soundness?",
        prompt: "What is soundness?",
        description: "In the context of a KB agent, soundness is crucial because it ensures that the agent's reasoning process \n\
        doesn't lead to false or incorrect conclusions. If an inference mechanism is sound, it means that it adheres to the rules of logic \n\
        and follows a valid reasoning process, thereby preserving the truth of the knowledge it operates on.",
        example: "Derivations produce only entailed sentences\n\
        If KB |- α then KB |= α"
    },
    {
        term: "What is completeness?",
        prompt: "What is completeness?",
        description: "Completeness, in the context of inference in a knowledge-based agent, is another important property that \n\
        complements soundness. While soundness ensures that the conclusions drawn from true premises are also true, \n\
        completeness focuses on ensuring that all true conclusions can be derived from the available knowledge base.",
        example: "Derivations can produce all entailed sentences\n\
        If KB |= α then KB |- α"
    }
]



// From Math for Business

const algebra = [
    { term: "arithmetic operations", description: "((a/b)/c)", example: "a/(bc)", prompt: "Solve the following" },
    {
        term: "y = log_b(x)", description: "y = log_b(x) convert into power expression",
        example: "x = b^y", prompt: "convert it into the power expression"
    },
    {
        term: "y = log_b(x^r)", description: "log_b(x^r) ", prompt: "what can you do with the r?",
        example: "r*(log_b(x))"
    },
    {
        term: "log_b(x*y)", description: "log_b(x*y)", prompt: "Convert it into the sum for",
        example: "log_b(x) + log_b(y)"
    },
    {
        term: "log_b(x/y) ", description: "log_b(x/y)",
        prompt: "Convert it into the partitioned form", example: "log_b(x) - log_b(y)"
    },
    {
        term: "x^2 + (a+b) x + a*b", description: "x^2 + (a+b) x + a*b",
        prompt: "factor it into two sections multiplying themselves", example: "(x+a)(x+b)"
    },
    {
        term: "(x - a) ^ 3", prompt: "Expand it into addition form",
        example: "x^3 - 3a(x^2) + 3(a^2)x - a^3"
    },
    {
        term: "x^3 + a^3", prompt: "Expand it, knowing that is a factor of (x+a)",
        example: "(x+a)(x^2 - ax + a^2)"
    },
    {
        term: "x^3 - a^3", prompt: "Expand it, knowing that is a factor of (x-a)",
        example: "(x-a) (x^2 + ax + a^2)"
    },
    {
        term: "x^(2n) - a ^(2n)", prompt: "Expand it into the general formula",
        example: "(x^n - a^n) * (x^n + a^n)"
    },
    {
        term: "Quadratic formula",
        description: "Calculate x given: 4*x^2 + 26*x + 12, knwoing that 26^2 = 676",
        prompt: "Solve using quadratic formula, How to detect if unequal solution, repeated solution or two complex?",

        example: "{x = -6, x = -1/2}, You detect by the b^2 - 4 *ac if positive there are two unequal... "

    },
    {
        term: "Inequalities with Absolute",
        prompt: "Write Expersion for x in |3-x| < 6",
        // description: "",
        example: "{x>3, x<9} (1) x < 3: 3-x < 6 x>3 3+x > -6 (2) Then solve"
    },
    {
        term: "Summation", prompt: "What is the sum rule, the difference rule, the constant rule and the constant value rule",
    },
    {
        term: "domain range", prompt: "What is the domain of sqrt(x+3)/(x-3). ",
        description: "Use the teacher's notation",
        example: "D = [-3; +inf[ \\ {3} || [-3; 3)U(3; +inf)"
    },
    {
        term: "newton-f(x)=3-2x",
        prompt: "Find the Newton Quotient for f(x) = 3 - 2x",
        example: "f'(x) = -2"
    },
    {
        term: "newton-f(x)=x^2 + 1",
        prompt: "Find the Newton Quotient for f(x) = x^2 + 1",
        example: "f'(x) = 2x"
    },
    {
        term: "newton-f(x)=1/(x+2)",
        prompt: "Find the Newton Quotient for f(x) = 1/(x+2)",
        example: "f'(x) = -1/(x+2)^2"
    },
    {
        term: "constants k in f(tk)",
        prompt: "For which constant k is F(tK) = t^(k) * F(K) for t >=0",
        description: "F(K) = 10*K^(1/2)",
        example: "k = 1/2"
    },
    {
        term: "log_a (1) = 0",
        description: "log_2 (8) = 3",
        prompt: "What is the value of log_a (1) = 0",
        example: "a = 1"

    },
    {
        term: "log_b^n (a^m)",
        description: "log_10 (1000) = 3",
        attachment: "./img/2023-03-27-19-56-32.png",
        prompt: "What is the value of log_b^n (a^m)",
        example: "n/m log_b(a)"
    },
    {
        term: "what is e?",
        prompt: "What is e in values aprox? How could you think of it in terms of compound interest?",
        description: "e is the base of the natural logarithm",
        example: "e = 2.7.. e is the maximum compound over one time period with 100% interest"
    },
    {
        term: "log_10 (100)",
        prompt: "What is the value of log_10 (100)",
        example: "2",
        description: "log_10 (10000) = 4"
    },
    {
        term: "reciprocal rule ln",
        prompt: "ln(1/x) = ?",
        example: "-ln(x)",
        description: "The natural log of the reciprocal of x is the opposite of the ln of x"
    },
    {
        term: "ln(e)/7",
        prompt: "What is the value of ln(e)/7",
        example: "1/7",
        description: "ln(e) = 1"
    },
    {
        term: "ln(e)",
        prompt: "What is the value of ln(e)",
        example: "1",
        description: "e^1 = e"
    },
    {
        term: "ln product rule",
        prompt: "ln(x*y) = ?",
        example: "ln(x) + ln(y)",
        description: "log_5 (10) = log_5 (2) + log_5 (5)"
    },
    {
        term: "ln quotient rule",
        prompt: "ln(x/y) = ?",
        example: "ln(x) - ln(y)",
        description: "log_5 (2) = log_5 (10) - log_5 (5)"
    },
    {
        term: "adding to f(x) vs f(x+b)",
        prompt: "What is the difference between adding to f(x) vs f(x+b)",
        description: "f(x) +b vs f(x+b) if f(x) = 2x => f(2) + 1 => 5 vs f(2+1) => 6",
        example: "When adding to f(x) you are adding to the domain making the function to go up or down, when adding to f(x+b) you are adding to the range making the graph go right or left"
    },
    {
        term: "average cost given AvC(q) and Afe(q)",
        prompt: "What is the average Total cost given AvC(q) and Afe(q) that are two functions?",
        example: "atc(q) = avc(q) + afe(q)"
    },
    {
        term: "distance between two points",
        prompt: "What is the distance between two points (x1,y1) and (x2,y2)",
        example: "sqrt((x2-x1)^2 + (y2-y1)^2)",
        description: "distance of (1, 3) and (4, 5) = sqrt((4-1)^2 + (5-3)^2) = sqrt(9+4) = sqrt(13)"
    },
    {
        term: "strict and nonstrict increase",
        prompt: "What is the difference between strict and nonstrict increase",
        example: "Strict increase is when the function is always increasing, nonstrict increase is when the function is increasing but can be equal\n\
        when is increasing it cannot be descrease, thus when the slope is 0 and increase and decrease rules applies then is non."
    },

];

const calculousOne = [
    {
        term: "multiplication functions",
        prompt: "Find the product of f(x) = (1-x) and g(x) = x^2 using calculus.",
        example: "To solve this problem, we can use the product rule of derivatives in calculus. The product rule states that if we have two functions, f(x) and g(x), their product h(x) = f(x)g(x) can be differentiated as:\n\
        \n\
        h'(x) = f'(x)g(x) + f(x)g'(x)\n\
        \n\
        In this case, our two functions are f(x) = (1-x) and g(x) = x^2. Therefore, their product h(x) = f(x)g(x) is:\n\
        \n\
        h(x) = f(x)g(x) = (1-x) * x^2\n\
        \n\
        Taking the derivative of h(x) with respect to x, we get:\n\
        \n\
        h'(x) = f'(x)g(x) + f(x)g'(x)\n\
        = (-1) * x^2 + (1-x) * 2x (using the chain rule to differentiate f(x) and g(x))\n\
        = x(2-3x)",
    },
    {
        term: "quotient function",
        prompt: "Find the derivative of f(x) = (3x^2 + 2x) / (x + 1) using calculus.",
        example: "To solve this problem, we can use the quotient rule of derivatives in calculus.\n\
        The quotient rule states that if we have two functions, f(x) and g(x), their quotient h(x) = f(x) / g(x) \n\
        can be differentiated as:\n\nh'(x) = (f'(x)g(x) - f(x)g'(x)) / g(x)^2\n\nIn this case, our function is \n\
        f(x) = (3x^2 + 2x) / (x + 1). To find its derivative, we need to apply the quotient rule.\n\n\
        Let's calculate the derivative step by step:\n\n\
        f'(x) = (d/dx)[(3x^2 + 2x) / (x + 1)]\n\n\
        Using the quotient rule:\n\n\
        f'(x) = [(2x(x + 1) - (3x^2 + 2x)(1)) / (x + 1)^2]\n\n\
        Simplifying further:\n\n\
        f'(x) = (2x^2 + 2x - 3x^2 - 2x) / (x + 1)^2\n\n\
        = (-x^2) / (x + 1)^2\n\n\
        Therefore, the derivative of f(x) = (3x^2 + 2x) / (x + 1) is f'(x) = (-x^2) / (x + 1)^2."
    },
    {
        "term": "quotient function II",
        "prompt": "Find the derivative of f(x) = (2x + 3) / x using calculus.",
        "example": "To solve this problem, we can use the quotient rule of derivatives in calculus. The quotient rule states that if we have two functions, f(x) and g(x), their quotient h(x) = f(x) / g(x) can be differentiated as:\n\nh'(x) = (f'(x)g(x) - f(x)g'(x)) / g(x)^2\n\nIn this case, our function is f(x) = (2x + 3) / x. To find its derivative, we need to apply the quotient rule.\n\nLet's calculate the derivative step by step:\n\nf'(x) = (d/dx)[(2x + 3) / x]\n\nUsing the quotient rule:\n\nf'(x) = [(2(x) - (2x + 3)(1)) / (x)^2]\n\nSimplifying further:\n\nf'(x) = (2x - 2x - 3) / x^2\n      = -3 / x^2\n\nTherefore, the derivative of f(x) = (2x + 3) / x is f'(x) = -3 / x^2."
    }

];


module.exports = { network, artificialIntelligence, artificialIntelligence_2, algebra, calculousOne, network_midterm, network_final };