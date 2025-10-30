# High-Quality Flashcards: 10A006---Java-Cookbook---Ian-F-Darwin_processed (Part 24)

**Rating threshold:** >= 8/10

**Starting Chapter:** 12.3 Finding and Reporting Network Addresses. Problem. Solution. 12.4 Handling Network Errors

---

**Rating: 8/10**

#### Finding and Reporting Network Addresses
Background context: This section explains how to find and report network addresses using Java's `InetAddress` class. It covers methods like `getByName`, `getHostAddress`, and `getHostName`. Additionally, it mentions that these methods do not contact the remote host and thus do not throw exceptions related to network connections.
:p What method in InetAddress is used to get the numeric IP address corresponding to an InetAddress object?
??x
The `getHostAddress()` method returns the numeric IP address as a string for a given InetAddress object. This is useful when you need to obtain the IP address from an already obtained host name or address.

```java
String ipAddress = InetAddress.getByName("darwinsys.com").getHostAddress();
```
x??

---

#### Getting InetAddress by Address
Background context: The text explains how to get an `InetAddress` object using a network address string. This can be useful when you know the IP address of a host and want to find its hostname or other related information.
:p How do you obtain an InetAddress for a known IP address?
??x
You can use the `getByName(String hostnameOrAddress)` method, passing in the IP address as a string.

```java
String ipAddress = "8.8.8.8"; // Google's public DNS server
InetAddress inetAddress = InetAddress.getByName(ipAddress);
```
x??

---

#### Getting InetAddress by Host Name
Background context: This section describes how to get an `InetAddress` object using the hostname of a host. It explains that this method can be used to find out the IP address given a host name.
:p How do you obtain an InetAddress for a known host name?
??x
You can use the `getByName(String hostnameOrAddress)` method, passing in the hostname as a string.

```java
String hostName = "darwinsys.com";
InetAddress inetAddress = InetAddress.getByName(hostName);
```
x??

---

#### Getting Localhost Address
Background context: The text provides information on how to get the `InetAddress` for the local machine using the `getLocalHost()` method. This is particularly useful when you want to connect to a server running on the same machine.
:p How do you obtain the InetAddress representing localhost?
??x
You can use the `getLocalHost()` static method of the `InetAddress` class.

```java
final InetAddress localHost = InetAddress.getLocalHost();
```
x??

---

#### Getting Remote InetAddress from Socket
Background context: This section explains how to get an `InetAddress` object for a remote host by using a `Socket`. It is useful in scenarios where you have established a connection and want to know the address of the server.
:p How do you obtain the InetAddress of a remote host using a Socket?
??x
You can use the `getInetAddress()` method on an existing `Socket` object.

```java
String someServerName = "google.com";
try (Socket theSocket = new Socket(someServerName, 80)) {
    InetAddress remote = theSocket.getInetAddress();
}
```
x??

---

#### Getting All Addresses for a Host
Background context: The text describes how to get all `InetAddress` objects associated with a host name using the `getAllByName(String hostname)` method. This is useful when a server might be on multiple networks.
:p How do you obtain all InetAddress objects for a given host name?
??x
You can use the `getAllByName(String hostname)` static method of the `InetAddress` class.

```java
String[] addresses = InetAddress.getAllByName("google.com");
```
x??

---

#### Using Inet6Address for IPv6
Background context: The text mentions that if you are using IPv6, you should use `Inet6Address` instead of `InetAddress`. This is necessary to handle the different format and representation of IPv6 addresses.
:p How do you get an Inet6Address object?
??x
You can create an `Inet6Address` object by calling the appropriate constructor or methods from the `InetAddress` class, specifying that you are using IPv6.

```java
// Example: Creating an Inet6Address instance
String ip6Address = "2001:db8::1";
try {
    Inet6Address inet6Addr = (Inet6Address) InetAddress.getByName(ip6Address);
} catch (UnknownHostException e) {
    // handle exception
}
```
x??

---

**Rating: 8/10**

---
#### BufferedReader and PrintWriter Construction
Background context: When working with textual data over a network connection, you often need to read from or write to a socket. The `Socket` class provides methods for getting an input or output stream but does not directly provide reader or writer objects. You can convert these streams into readers and writers using conversion classes.

:p How do you construct a `BufferedReader` and `PrintWriter` from a `Socket`?
??x
To construct a `BufferedReader` and `PrintWriter`, you first get the input and output streams from the socket, then wrap those streams with appropriate reader and writer objects. For example:

```java
BufferedReader is = new BufferedReader(new InputStreamReader(sock.getInputStream()));
PrintWriter os = new PrintWriter(sock.getOutputStream(), true);
```

The `BufferedReader` is used for reading text line by line, while the `PrintWriter` handles writing text to the socket. The second argument in `PrintWriter` being set to `true` ensures that each write operation flushes the buffer automatically.

x??
---

#### Reading from Daytime Service
Background context: The example provided demonstrates how to read a single line of text from a "Daytime" service, which is available on some networked systems. This service sends the current date and time when connected to via TCP/IP.

:p How does the `DaytimeText` class read the current date and time from a server?
??x
The `DaytimeText` class connects to a Daytime server and reads one line of text, which contains the current date and time. Here's how it works:

```java
public static void main(String[] argv) {
    String server_name = argv.length == 1 ? argv[0] : "localhost";
    try (Socket sock = new Socket(server_name, TIME_PORT);
         BufferedReader is = new BufferedReader(new InputStreamReader(sock.getInputStream()))) {
        String remoteTime = is.readLine();
        System.out.println("Time on " + server_name + " is " + remoteTime);
    } catch (IOException e) {
        System.err.println(e);
    }
}
```

The `Socket` object is created to connect to the specified host and port. The input stream of the socket is wrapped with a `BufferedReader`, which reads one line of text using `readLine()`. This line contains the date and time from the server.

x??
---

#### Writing to Echo Server
Background context: The "Echo" server sends back whatever data it receives. It can be used for testing network connections or client-server interactions.

:p How does the `EchoClientOneLine` class communicate with an Echo server?
??x
The `EchoClientOneLine` class establishes a connection with an Echo server, sends a message, and prints the echoed response. Here's how it works:

```java
public static void main(String[] argv) {
    if (argv.length == 0)
        new EchoClientOneLine().converse("localhost");
    else
        new EchoClientOneLine().converse(argv[0]);
}

protected void converse(String hostName) {
    try (Socket sock = new Socket(hostName, 7)) { // echo server.
        BufferedReader is = new BufferedReader(new InputStreamReader(sock.getInputStream()));
        PrintWriter os = new PrintWriter(sock.getOutputStream(), true);
        
        os.println(mesg); // Send the message
        String response = is.readLine(); // Read the echoed message
        System.out.println("Received: " + response);
    } catch (IOException e) {
        System.err.println(e);
    }
}
```

The `Socket` object connects to the specified host and port. The output stream of the socket is wrapped with a `PrintWriter`, which sends a message using `println()`. The input stream is then used to read the echoed response from the server.

x??
---

**Rating: 8/10**

#### Reading and Writing Text Data
Background context: In Java, when you need to send or receive text data over a network connection using sockets, you can use `PrintWriter` for sending data and `BufferedReader` (or `InputStreamReader`) for receiving it. The provided code snippet demonstrates the process of writing a message to a socket and reading the response.

:p What is the process of sending a message through a socket using PrintWriter?
??x
To send a message, you first obtain an output stream from the socket with `sock.getOutputStream()`. Then, wrap this stream in a `PrintWriter` object. You can then use the `print` method to append the message and a CRLF (carriage return line feed), which is necessary because `println` only appends `\r` on some platforms.

```java
// Get output stream from socket
Socket sock = new Socket("localhost", 12345);
PrintWriter os = new PrintWriter(sock.getOutputStream(), true);

// Send message with CRLF and flush to ensure it's sent immediately
os.print("Hello Server" + "\r\n");
os.flush();
```
x??

---

#### Reading and Writing Binary Data
Background context: When you need to send binary data or serialized Java objects over a network, using `DataInputStream`/`DataOutputStream`, `ObjectInputStream`/`ObjectOutputStream` is more appropriate. The example provided demonstrates reading the current time as an unsigned 32-bit integer from a server.

:p How do you read and write binary data using DataInputStream and DataOutputStream?
??x
To handle binary data, create instances of `DataInputStream` and `DataOutputStream` from the socket's input and output streams. If performance is critical for large amounts of data, wrap these with buffered streams like `BufferedInputStream` and `BufferedOutputStream`.

```java
// Example of using DataInputStream and DataOutputStream
Socket sock = new Socket("localhost", 37);
DataInputStream is = new DataInputStream(new BufferedInputStream(sock.getInputStream()));
DataOutputStream os = new DataOutputStream(new BufferedOutputStream(sock.getOutputStream()));
```
x??

---

#### Reading Binary Time from a Server
Background context: The server in this example provides the current time as an unsigned integer representing the number of seconds since 1900. This value needs to be adjusted by subtracting the difference between 1970 and 1900, multiplied by the number of seconds per day.

:p How do you read an unsigned integer from a `DataInputStream` in Java?
??x
Java does not have an unsigned integer type. To simulate this, read four bytes (unsigned), then combine them to form a single long value using bit shifting and bitwise OR operations.

```java
long remoteTime = ((is.readUnsignedByte() << 24) |
                   (is.readUnsignedByte() << 16) |
                   (is.readUnsignedByte() << 8) |
                   is.readUnsignedByte());
```
x??

---

#### Calculating the Time Difference Between Bases
Background context: The difference between 1970 and 1900 needs to be accounted for when converting time from a server providing data in a different base year.

:p How do you calculate the number of days between two years, considering leap years?
??x
To calculate the number of days between two years, factor in the number of leap years within that period. For instance, between 1900 and 1970, there are specific leap years (e.g., 1904, 1908, ..., 1968) which add extra days.

```java
long BASE_DAYS = ((1970 - 1900) * 365 + 
                  (1970 - 1900 - 1) / 4); // Leap year adjustment

// Convert to seconds and account for leap years
long BASE_DIFF = BASE_DAYS * 24 * 60 * 60;
```
x??

---

#### Object Serialization in Java
Background context: Object serialization is the process of converting objects into a format that can be transmitted over a network. This involves using `ObjectOutputStream` to write objects and `ObjectInputStream` to read them.

:p How do you use ObjectOutputStream and ObjectInputStream for object serialization?
??x
For object serialization, construct an `ObjectOutputStream` or `ObjectInputStream` from the socket’s input or output stream. These classes allow you to serialize Java objects directly over a network connection.

```java
// Example of using ObjectOutputStream and ObjectInputStream
Socket sock = new Socket("localhost", 37);
ObjectOutputStream os = new ObjectOutputStream(sock.getOutputStream());
ObjectInputStream is = new ObjectInputStream(sock.getInputStream());

// Write an object
os.writeObject(new SomeJavaObject());

// Read an object
SomeJavaObject obj = (SomeJavaObject)is.readObject();
```
x??

---

