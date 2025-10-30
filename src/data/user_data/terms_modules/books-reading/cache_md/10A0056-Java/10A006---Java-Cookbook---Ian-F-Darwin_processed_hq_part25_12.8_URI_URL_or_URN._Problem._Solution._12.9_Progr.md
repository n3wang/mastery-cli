# High-Quality Flashcards: 10A006---Java-Cookbook---Ian-F-Darwin_processed (Part 25)

**Rating threshold:** >= 8/10

**Starting Chapter:** 12.8 URI URL or URN. Problem. Solution. 12.9 Program TFTP UDP Client

---

**Rating: 8/10**

#### Reading Request Setup
Background context: The `readFile` method sets up and sends a read request to a TFTP server. It involves converting filenames and modes into bytes, then sending them over the network. Java handles byte order naturally for you.

:p What is the process for setting up a read request in this method?
??x
The method initializes a buffer and populates it with necessary information such as operation code (OP_RRQ), filename, and mode. It uses `getBytes()` to convert strings into bytes, then copies these byte arrays into the buffer at specific offsets.

```java
// Initialize buffer
buffer[0] = 0;
buffer[OFFSET_REQUEST] = OP_RRQ; // Request opcode

// Convert filename to bytes and copy into buffer
byte[] bTemp = path.getBytes(); 
System.arraycopy(bTemp, 0, buffer, p, path.length());
p += path.length();
buffer[p++] = 0; // Null terminate string

// Similarly convert mode (e.g., "octet") to bytes in buffer
bTemp = MODE.getBytes();
System.arraycopy(bTemp, 0, buffer, p, MODE.length());
p += MODE.length();
buffer[p++] = 0; // Null terminate mode
```
x??

---

#### Sending the Read Request
Background context: After setting up the buffer with necessary information (filename and mode), this part of the method sends the request to the TFTP server. The length of the buffer is set, and it is sent using `sock.send(outp)`.

:p How does the code send a read request to the TFTP server?
??x
The method sets the length of the output packet (`outp`) based on the current position in the buffer (`p`). It then sends this packet to the TFTP server via `sock.send(outp)`. This initiates the data transfer process.

```java
// Set length of output packet and send request
outp.setLength(p);
sock.send(outp);
```
x??

---

#### Receiving Data Packets
Background context: After sending the read request, this part of the method receives data packets from the TFTP server until it encounters a short packet (indicating end-of-file). It handles error responses and prints out the received data.

:p What is the loop used to receive data packets from the server?
??x
The method uses a `do-while` loop to continuously receive packets from the TFTP server. The loop continues as long as the incoming packet size matches the expected packet size (`PACKET_SIZE`). If an error response (OP_ERROR) is received, it prints the error message and exits.

```java
// Loop for receiving data until end-of-file packet
do {
    sock.receive(inp);
    if (debug)
        System.err.println("Packet # " + Byte.toString(buffer[OFFSET_PACKETNUM])
                           + " RESPONSE CODE " + Byte.toString(buffer[OFFSET_REQUEST]));
    
    if (buffer[OFFSET_REQUEST] == OP_ERROR) {
        System.err.println("rcat ERROR: " + new String(buffer, 4, inp.getLength() - 4));
        return;
    }
    
    if (debug)
        System.err.println("Got packet of size " + inp.getLength());
        
    // Print data from the packet
    System.out.write(buffer, 4, inp.getLength() - 4);
    
    // Acknowledge received packet with an ACK
    buffer[OFFSET_REQUEST] = OP_ACK;
    outp.setLength(4);
    outp.setPort(inp.getPort());
    sock.send(outp);
} while (inp.getLength() == PACKET_SIZE);
```
x??

---

#### Handling End-of-File Packet
Background context: Once the loop ends, it indicates that all data packets have been received. This part of the method handles the end-of-file condition and exits the loop.

:p What happens when the loop ends?
??x
When the loop ends (i.e., a packet smaller than `PACKET_SIZE` is received), the method prints out a message indicating completion, followed by exiting the loop.

```java
if (debug)
    System.err.println("** ALL DONE** Leaving loop, last size " + inp.getLength());
```
x??

---

**Rating: 8/10**

---
#### Introduction to Sockets
Sockets are fundamental components for implementing networking protocols. They allow communication between a client and server across different languages, such as C, C++, Perl, Python, or Java. Various high-level services like JDBC, RMI, CORBA, EJB, RPC, and NFS all rely on socket connections.
:p What is the role of sockets in networked applications?
??x
Sockets serve as the basic building blocks for networking protocols, enabling communication between clients and servers regardless of programming language. They are essential for implementing services like JDBC, RMI, CORBA, EJB, RPC, and NFS.
x??

---
#### ServerSocket Behavior
ServerSocket is used to establish a listening socket on the server side that waits for incoming client connections. Understanding how ServerSocket behaves is crucial even if you use higher-level services like RMI or JDBC in your applications.
:p What does a ServerSocket do?
??x
A ServerSocket sets up an endpoint where clients can connect, allowing the server to receive and process requests from multiple clients simultaneously. It listens for incoming connections on a specified port and handles each connection as a separate thread or process.
x??

---
#### Writing Data Over Sockets
There are various methods to write data over sockets in Java, including using streams like `DataOutputStream`, `PrintStream`, or custom byte array writing. These methods allow sending both primitive data types and complex objects.
:p How can you send data over a socket in Java?
??x
You can send data over a socket by using output streams such as `DataOutputStream` or `PrintStream`. For example, to write a string:

```java
import java.io.*;

public class DataSender {
    public static void sendData(String data) throws IOException {
        Socket socket = new Socket("localhost", 12345);
        OutputStream os = socket.getOutputStream();
        PrintWriter out = new PrintWriter(os, true);
        out.println(data); // Send the string to the server
        socket.close(); // Close the connection
    }
}
```
x??

---
#### Complete Implementation of a Chat Server
A chat server is a comprehensive example of using sockets for real-world applications. It involves setting up a `ServerSocket` to listen for incoming connections, handling multiple clients in separate threads, and managing client communication.
:p What does a complete implementation of a chat server involve?
??x
A complete chat server involves:
1. Setting up a `ServerSocket` on the server side to wait for clients.
2. Handling multiple client connections using threads or a thread pool.
3. Managing communication between clients through shared channels (like queues).
4. Ensuring proper message handling and synchronization.

Here is a simplified version of a chat server:

```java
import java.io.*;
import java.net.*;
import java.util.*;

public class ChatServer {
    public static void main(String[] args) throws IOException {
        ServerSocket serverSocket = new ServerSocket(12345);
        System.out.println("Chat server started on port 12345");

        while (true) {
            Socket clientSocket = serverSocket.accept();
            Thread clientHandler = new ClientHandler(clientSocket);
            clientHandler.start(); // Handle each client in a separate thread
        }
    }

    static class ClientHandler extends Thread {
        private final Socket socket;

        public ClientHandler(Socket socket) {
            this.socket = socket;
        }

        @Override
        public void run() {
            try (BufferedReader in = new BufferedReader(new InputStreamReader(socket.getInputStream()));
                 PrintWriter out = new PrintWriter(socket.getOutputStream(), true)) {

                String inputLine, outputLine;
                while ((inputLine = in.readLine()) != null) {
                    System.out.println("Received: " + inputLine);
                    // Process the message and send back a response
                    if ("exit".equals(inputLine.toLowerCase())) break;
                    out.println("Echo: " + inputLine);
                }
            } catch (IOException e) {
                System.err.println(e.getMessage());
            }
        }
    }
}
```
x??

---

**Rating: 8/10**

#### ServerSocket Basics
In Java, `ServerSocket` is used to create a socket-based server that waits for client connections. It represents one end of a connection and is typically instantiated with just the port number. The server listens on the specified port for incoming client connections.

:p How do you initialize a `ServerSocket` in Java?
??x
You can initialize a `ServerSocket` by specifying the port number as follows:

```java
public class Listen {
    public static final short PORT = 9999;

    public static void main(String[] argv) throws IOException {
        ServerSocket sock;
        Socket clientSock;
        try {
            sock = new ServerSocket(PORT);
            while ((clientSock = sock.accept()) != null) {
                // Process it, usually on a separate thread
                process(clientSock);
            }
        } catch (IOException e) {
            System.err.println(e);
        }
    }

    static void process(Socket s) throws IOException {
        System.out.println("Accept from client " + s.getInetAddress());
        // The conversation would be here.
        s.close();
    }
}
```
x??

---

#### Listening on Specific Network Interfaces
Java `ServerSocket` can listen on a specific network interface by providing the address of that interface to its constructor. This allows services to be exposed only to certain networks, enhancing security and functionality.

:p How do you specify a network interface when creating a `ServerSocket`?
??x
To create a `ServerSocket` that listens on a specific network interface, use the following code:

```java
public class ListenInside {
    public static final short PORT = 9999;
    public static final String INSIDE_HOST = "acmewidgets-inside";
    public static final int BACKLOG = 10;

    public static void main(String[] argv) throws IOException {
        ServerSocket sock;
        Socket clientSock;
        try {
            sock = new ServerSocket(PORT, BACKLOG,
                    InetAddress.getByName(INSIDE_HOST));
            while ((clientSock = sock.accept()) != null) {
                // Process it.
                process(clientSock);
            }
        } catch (IOException e) {
            System.err.println(e);
        }
    }

    static void process(Socket s) throws IOException {
        System.out.println("Connected from " + INSIDE_HOST + ": "
                + s.getInetAddress());
        // The conversation would be here.
        s.close();
    }
}
```
x??

---

#### Port Number Restrictions
Certain ports are reserved for specific services, and on server-based operating systems, ports below 1024 require root or administrator privilege to use. This was an early security mechanism but provides little real security in today's environment.

:p What restrictions exist when using ports below 1024?
??x
Ports below 1024 are considered privileged and typically require root/administrator privileges to create a `ServerSocket`. This restriction is largely due to historical reasons and provides minimal security benefits in modern, single-user desktop environments. Example:

```java
// Code example for using non-privileged ports (above 1024)
public class Listen {
    public static final short PORT = 9999;

    public static void main(String[] argv) throws IOException {
        ServerSocket sock;
        Socket clientSock;
        try {
            sock = new ServerSocket(PORT);
            while ((clientSock = sock.accept()) != null) {
                // Process it, usually on a separate thread
                process(clientSock);
            }
        } catch (IOException e) {
            System.err.println(e);
        }
    }

    static void process(Socket s) throws IOException {
        System.out.println("Accept from client " + s.getInetAddress());
        // The conversation would be here.
        s.close();
    }
}
```
x??

---

#### Overview of Java Enterprise Edition (Java EE)
Java EE provides support for building scalable and well-structured, multitiered distributed applications. It includes features like the servlet framework, JSP, JSF, EJB3 remote access, and Java Messaging Service.

:p What are some key components provided by Java EE?
??x
Java EE offers several important components:
- **Servlet Framework**: A strategy object that can be installed into any standard Java EE web server.
- **JSP (JavaServer Pages)**: An original technology for building dynamic web pages.
- **JSF (JavaServer Faces)**: A newer, component-based approach to creating user interfaces.

Example code using JSP:

```java
// JSP Example
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <title>Welcome</title>
</head>
<body>
<h1>Hello, World!</h1>
</body>
</html>
```
x??

---

#### ServerSocket Accept Method
The `accept()` method of `ServerSocket` blocks until a client connects. Once a connection is established, it returns a `Socket` object that can be used for both reading and writing.

:p What does the `accept()` method do?
??x
The `accept()` method of `ServerSocket` waits (blocks) until a client makes a connection request. When a client connects, `accept()` returns a `Socket` object representing the established connection. This object can be used to send and receive data.

Example:

```java
public class Listen {
    public static final short PORT = 9999;

    public static void main(String[] argv) throws IOException {
        ServerSocket sock;
        Socket clientSock;
        try {
            sock = new ServerSocket(PORT);
            while ((clientSock = sock.accept()) != null) {
                // Process it, usually on a separate thread
                process(clientSock);
            }
        } catch (IOException e) {
            System.err.println(e);
        }
    }

    static void process(Socket s) throws IOException {
        System.out.println("Accept from client " + s.getInetAddress());
        // The conversation would be here.
        s.close();
    }
}
```
x??

---

**Rating: 8/10**

#### Network Interface Discovery and Address Retrieval
This section discusses how to list network interfaces on a machine, retrieve their display names, and get their associated IP addresses. The `NetworkInterface` class provides methods like `getDisplayName()` for interface name retrieval and `getInetAddresses()` for getting the IP addresses.
:p What is the purpose of the code snippet in Example 13-3?
??x
The code lists all network interfaces on a machine, prints their display names, and retrieves their associated IP addresses. This example demonstrates how to enumerate and access details about network interfaces using Java's `NetworkInterface` class.
```java
public static void main(String[] a) throws IOException {
    Enumeration<NetworkInterface> list = NetworkInterface.getNetworkInterfaces();
    while (list.hasMoreElements()) {
        // Get one NetworkInterface
        NetworkInterface iface = list.nextElement();
        // Print its name
        System.out.println(iface.getDisplayName());
        Enumeration<InetAddress> addrs = iface.getInetAddresses();
        // And its address(es)
        while (addrs.hasMoreElements()) {
            InetAddress addr = addrs.nextElement();
            System.out.println(addr);
        }
    }

    // Try to get the Interface for a given local (this machine's) address
    InetAddress destAddr = InetAddress.getByName("laptop");
    try {
        NetworkInterface dest = NetworkInterface.getByInetAddress(destAddr);
        System.out.println("Address for " + destAddr + " is " + dest);
    } catch (SocketException ex) {
        System.err.println("Couldn't get address for " + destAddr);
    }
}
```
x??

---
#### Echo Server Implementation
This section explains how to implement a simple echo server in Java. An echo server listens on a specified port and echoes back any message it receives from the client.
:p What does the `EchoServer` class do?
??x
The `EchoServer` class implements an echo server that listens for incoming client connections, reads messages sent by clients, and sends them back to the client. It handles one complete connection at a time before accepting another connection.
```java
public static void main(String[] args) {
    int p = ECHOPORT;
    if (args.length == 1) {
        try {
            p = Integer.parseInt(args[0]);
        } catch (NumberFormatException e) {
            System.err.println("Usage: EchoServer [port#]");
            System.exit(1);
        }
    }
    new EchoServer(p).handle();
}

public EchoServer(int port) {
    try {
        sock = new ServerSocket(port);
    } catch (IOException e) {
        System.err.println("I/O error in setup");
        System.err.println(e);
        System.exit(1);
    }
}

protected void handle() {
    Socket ios = null;
    while (true) {
        try {
            System.out.println("Waiting for client...");
            ios = sock.accept();
            System.err.println("Accepted from " + ios.getInetAddress().getHostName());
            try (
                BufferedReader is = new BufferedReader(new InputStreamReader(ios.getInputStream(), "8859_1"));
                PrintWriter os = new PrintWriter(new OutputStreamWriter(ios.getOutputStream(), "8859_1"), true);
            ) {
                String echoLine;
                while ((echoLine = is.readLine()) != null) {
                    System.err.println("Read " + echoLine);
                    os.print(echoLine + "\r");
                    os.flush();
                    System.err.println("Wrote " + echoLine);
                }
                System.err.println("All done.");
            }
        } catch (IOException e) {
            System.err.println(e);
        }
    }
}
```
x??

---
#### Daytime Binary Server Implementation
This section provides an example of a binary-based server that sends the current time as a 32-bit integer to clients. It demonstrates handling multiple client connections in a loop.
:p What does the `DaytimeServer` class do?
??x
The `DaytimeServer` class implements a binary-based echo server on port 37, which sends the current time in seconds since the epoch (1970-01-01) as a 32-bit integer to clients. It handles multiple client connections in a loop.
```java
public static void main(String[] argv) {
    new DaytimeServer(PORT).runService();
}

public DaytimeServer(int port) {
    try {
        sock = new ServerSocket(port);
    } catch (IOException e) {
        System.err.println("I/O error in setup " + e);
        System.exit(1);
    }
}

protected void runService() {
    Socket ios = null;
    DataOutputStream os = null;
    while (true) {
        try {
            System.out.println("Waiting for connection on port " + PORT);
            ios = sock.accept();
            System.err.println("Accepted from " + ios.getInetAddress().getHostName());
            os = new DataOutputStream(ios.getOutputStream());
            long time = System.currentTimeMillis() / 1000; // Daytime Protocol is in seconds
            // Convert to Java time base.
            time += RDateClient.BASE_DIFF;
            // Write it, truncating cast to int since it is using the Internet Daytime protocol which uses 4 bytes.
            os.writeInt((int) time);
            os.close();
        } catch (IOException e) {
            System.err.println(e);
        }
    }
}
```
x??

---

