'use strict';

var network = [
	{
		term: 'Application - presentation - session',
		prompt: 'Descripbe an example of an app in one of the first 3 sessions:',
		description:
			'Layer 7 - Application The Application Layer in the OSI model is the layer that is the “closest to the end user”. It receives information directly from users and displays incoming data to the user. Oddly enough, applications themselves do not reside at the application layer. Instead the layer facilitates communication through lower layers in order to establish connections with applications at the other end. Web browsers (Google Chrome, Firefox, Safari, etc.) TelNet, and FTP, are examples of communications  that rely  on Layer 7. \n\
    Layer 6 - Presentation The Presentation Layer represents the area that is independent of data representation at the application layer. In general, it represents the preparation or translation of application format to network format, or from network formatting to application format. In other words, the layer “presents” data for the application or the network. A good example of this is encryption and decryption of data for secure transmission; this happens at Layer 6.\n\
     Layer 5 - Session When two computers or other networked devices need to speak with one another, a session needs to be created, and this is done at the Session Layer. Functions at this layer involve setup, coordination (how long should a system wait for a response, for example) and termination between the applications at each end of the session.'
	},
	{
		prompt: 'Describe an example of an app in one of the first 3 sessions:',
		term: 'Transport, Network, Data Link, Physical',
		description:
			'\
    Layer 4 – Transport The Transport Layer deals with the coordination of the data transfer between end systems and hosts. How much data to send, at what rate, where it goes, etc. The best known example of the Transport Layer is the Transmission Control Protocol (TCP), which is built on top of the Internet Protocol (IP), commonly known as TCP/IP. TCP and UDP port numbers work at Layer 4, while IP addresses work at Layer 3, the Network Layer. \n\
    Layer 3 - Network Here at the Network Layer is where you’ll find most of the router functionality that most networking professionals care about and love. In its most basic sense, this layer is responsible for packet forwarding, including routing through different routers. You might know that your Boston computer wants to connect to a server in California, but there are millions of different paths to take. Routers at this layer help do this efficiently. \n\
    Layer 2 – Data Link The Data Link Layer provides node-to-node data transfer (between two directly connected nodes), and also handles error correction from the physical layer. Two sublayers exist here as well--the Media Access Control (MAC) layer and the Logical Link Control (LLC) layer. In the networking world, most switches operate at Layer 2. But it’s not that simple. Some switches also operate at Layer 3 in order to support virtual LANs that may span more than one switch subnet, which requires routing capabilities. \n\
    Layer 1 - Physical At the bottom of our OSI model we have the Physical Layer, which represents the electrical and physical representation of the system. This can include everything from the cable type, radio frequency link (as in a Wi-Fi network), as well as the layout of pins, voltages, and other physical requirements. When a networking problem occurs, many networking pros go right to the physical layer to check that all of the cables are properly connected and that the power plug hasn’t been pulled from the router, switch or computer, for example.'
	},
	{
		prompt: 'When should you use TCP vs UDP?',
		term: 'TCP UDP',
		description:
			'Transmission Control Protocol (TCP) is connection-oriented, meaning once a connection has been established, data can be transmitted in two directions. TCP has built-in systems to check for errors and to guarantee data will be delivered in the order it was sent, making it the perfect protocol for transferring information like still images, data files, and web pages.\n\
        User Datagram Protocol (UDP) is a simpler, connectionless Internet protocol wherein error-checking and recovery services are not required. With UDP, there is no overhead for opening a connection, maintaining a connection, or terminating a connection; data is continuously sent to the recipient, whether or not they receive it.'
	},
	{
		prompt: 'Why time-to-live (TTL) is useful?',
		term: 'ttl',
		description:
			'Time to live (TTL) refers to the amount of time or “hops” that a packet is set to exist inside a network before being discarded by a router. TTL is also used in other contexts including CDN caching and DNS caching.'
	},
	{
		prompt: 'How could do you design a CDN in real life?',
		term: 'cdn',
		description:
			'A content delivery network (CDN) is a group of geographically distributed servers that speed up the delivery of web content by bringing it closer to where users are. Data centers across the globe use caching, a process that temporarily stores copies of files, so that you can access internet content from a web-enabled device or browser more quickly through a server near you. CDNs cache content like web pages, images, and video in proxy servers near to your physical location. This allows you to do things like watch a movie, download software, check your bank balance, post on social media, or make purchases, without having to wait for content to load. CDNs cache content like web pages, images, and video in proxy servers near to your physical location. This allows you to do things like watch a movie, download software, check your bank balance, post on social media, or make purchases, without having to wait for content to load. You could think of a CDN like an ATM.'
	},
	{
		prompt: 'Example of Network Switch equivalent in other than internet usage?',
		term: 'Network Switch',
		description:
			'A network switch connects users, applications, and equipment across a network so that they can communicate with one another and share resources. The simplest network switches offer connectivity exclusively to devices on a single local-area network (LAN). More advanced switches can connect devices from multiple LANs and may even incorporate basic data security functions. \n\
        Network switches are used to allow communication and sharing of resources between multiple devices on a network. They help in forwarding data packets to their destination and improve network performance by reducing network congestion and network collisions. Additionally, switches provide network segmentation, which enhances network security, and support advanced networking features like Quality of Service (QoS) and VLANs.'
	},
	{
		term: 'Mac',
		prompt: 'What has a Mac address? And if you design a what it would require a Mac address?',
		description:
			'A MAC (Media Access Control) address is a unique identifier assigned to network interfaces for use as a network address in communications within a network segment. This use is common in most IEEE 802 networking technologies, including Ethernet, Wi-Fi, and Bluetooth.',
		example:
			"Every network interface, whether it's an Ethernet card or a Wi-Fi adapter, has a unique MAC address, which makes it possible for devices to communicate with each other on the same network."
	},
	{
		term: 'Load Balancing',
		prompt: 'Why would you use Load Balancing?',
		description:
			'Load balancing lets you evenly distribute network traffic to prevent failure caused by overloading a particular resource. This strategy **improves the performance and availability of applications, websites, databases, and other computing resources**. It also helps process user requests quickly and accurately.\n\
        **Scalability is hampered for most load balancers by a limited number of nodes for distributing processes**. Other challenges include energy consumption, performance monitoring, QoS management, resource scheduling, and service availability in the cloud.'
	},
	{
		term: 'DHCP',
		prompt: 'When do you encounter DHCP working?',
		description:
			"DHCP (Dynamic Host Configuration Protocol) is a network protocol that automatically assigns IP addresses, subnet masks, default gateways, and other network configuration parameters to client devices. It's used to simplify the task of configuring devices on a network, as the DHCP server manages the assignment of IP addresses, rather than requiring manual configuration of each device.\n\
        When a device, such as a computer, connects to a network, it sends a broadcast request for an IP address. The DHCP server, which is usually built into a router, receives the request and assigns the device an available IP address from a pool of addresses. The DHCP server also assigns the device other information, such as the subnet mask, default gateway, and DNS server addresses. This process is called leasing an IP address and the lease has a limited time, after which the device will request a new lease.\n\
        DHCP makes it easy to add or remove devices from a network, as the DHCP server automatically assigns new addresses as needed and frees up addresses when devices are disconnected. This makes it an important component of most networks, especially in home or small office environments."
	}
];
var artificialIntelligence = [
	{
		term: 'Backpropagation Neural Network',
		description:
			'A backpropagation neural network is a way to train neural networks. It involves providing a neural network with a set of input values for which the correct output value is known beforehand. The network processes the input and produces an output value, which is compared to the correct value. If the result is incorrect, gradual changes are propagated backward through the network, and the calculation is made again. This process repeats until the desired output is calculated by the network.',
		prompt: 'Design one using that model'
	},
	{
		term: 'AI Definitions',
		prompt: 'Define in your own words (at least 1): (a) intelligence, (b) artificial intelligence, (c) agent, (d) rationality, (e) logical reasoning.',
		description:
			'Dictionary definitions of intelligence talk about “the capacity to acquire and apply knowledge” or “the faculty of thought and reason” or “the ability to comprehend and profit from experience.” These are all reasonable answers, but if we want something quantifiable we would use something like “the ability to apply knowledge in order to perform better in an environment.” b. We define artificial intelligence as the study and construction of agent programs that perform well in a given environment, for a given agent architecture. c. We define an agent as an entity that takes action in response to percepts from an environment. d. We define rationality as the property of a system which does the “right thing” given what it knows. See Section 2.2 for a more complete discussion. Both describe perfect rationality, however; see Section 27.3. e. We define logical reasoning as the a process of deriving new sentences from old, such that the new sentences are necessarily true if the old ones are true. (Notice that does not refer to any specific syntax oor formal language, but it does require a well-defined notion of truth.)'
	}
]; // From Math for Business

var algebra = [
	{
		term: 'arithmetic operations',
		description: '((a/b)/c)',
		example: 'a/(bc)',
		prompt: 'Solve the following'
	},
	{
		term: 'y = log_b(x)',
		description: 'y = log_b(x) convert into power expression',
		example: 'x = b^y',
		prompt: 'convert it into the power expression'
	},
	{
		term: 'y = log_b(x^r)',
		description: 'log_b(x^r) ',
		prompt: 'what can you do with the r?',
		example: 'r*(log_b(x))'
	},
	{
		term: 'log_b(x*y)',
		description: 'log_b(x*y)',
		prompt: 'Convert it into the sum for',
		example: 'log_b(x) + log_b(y)'
	},
	{
		term: 'log_b(x/y) ',
		description: 'log_b(x/y)',
		prompt: 'Convert it into the partitioned form',
		example: 'log_b(x) - log_b(y)'
	},
	{
		term: 'x^2 + (a+b) x + a*b',
		description: 'x^2 + (a+b) x + a*b',
		prompt: 'factor it into two sections multiplying themselves',
		example: '(x+a)(x+b)'
	},
	{
		term: '(x - a) ^ 3',
		prompt: 'Expand it into addition form',
		example: 'x^3 - 3a(x^2) + 3(a^2)x - a^3'
	},
	{
		term: 'x^3 + a^3',
		prompt: 'Expand it, knowing that is a factor of (x+a)',
		example: '(x+a)(x^2 - ax + a^2)'
	},
	{
		term: 'x^3 - a^3',
		prompt: 'Expand it, knowing that is a factor of (x-a)',
		example: '(x-a) (x^2 + ax + a^2)'
	},
	{
		term: 'x^(2n) - a ^(2n)',
		prompt: 'Expand it into the general formula',
		example: '(x^n - a^n) * (x^n + a^n)'
	},
	{
		term: 'Quadratic formula',
		description:
			'Calculate x given: 4*x^2 + 26*x + 12, knwoing that 26^2 = 676',
		prompt: 'Solve using quadratic formula, How to detect if unequal solution, repeated solution or two complex?',
		example:
			'{x = -5, x = -2}, You detect by the b^2 - 4 *ac if positive there are two unequal... '
	}
];
var calculousOne = [];
module.exports = {
	network: network,
	artificialIntelligence: artificialIntelligence,
	algebra: algebra,
	calculousOne: calculousOne
};
