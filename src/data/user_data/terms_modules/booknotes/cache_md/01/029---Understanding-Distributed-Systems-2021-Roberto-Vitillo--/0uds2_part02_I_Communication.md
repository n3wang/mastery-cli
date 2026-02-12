# High-Quality Flashcards: 029---Understanding-Distributed-Systems-2021-Roberto-Vitillo--_processed (Part 2)


**Starting Chapter:** I Communication

---


#### Link Layer
Background context explaining the link layer. Network protocols like Ethernet or Wi-Fi operate at this layer, providing an interface to underlying network hardware. Switches at this layer forward Ethernet packets based on their destination MAC address.

:p What is the role of switches in the link layer?
??x
Switches play a crucial role by forwarding Ethernet packets between devices connected on the same local network based on their destination MAC (Media Access Control) address. This allows data to be efficiently routed within a network segment without broadcasting to all nodes.
```java
// Pseudocode for switch operation
switch.handlePacket(packet) {
    if (packet.destinationMAC == this.macAddress) {
        processLocalTraffic(packet);
    } else {
        sendToPort(findPortFor(packet.destinationMAC), packet);
    }
}
```
x??

---

#### Internet Layer
Background context explaining the internet layer. The Internet Protocol (IP) is used to route packets from one machine to another across the network. Routers at this layer forward IP packets based on their destination IP address.

:p What protocol is primarily used in the internet layer for packet routing?
??x
The primary protocol used in the internet layer for packet routing is the Internet Protocol (IP), which routes packets based on destination IP addresses.
```java
// Pseudocode for IP packet handling by a router
router.forwardPacket(packet) {
    switch (packet.destinationIP) {
        case knownNetwork:
            sendToNextHop(router.getBestPath(knownNetwork));
            break;
        default:
            // Use routing table to find next hop and forward the packet
            routeThroughNextHop(packet, router.routingTable.nextHopFor(packet.destinationIP));
    }
}
```
x??

---

#### Transport Layer
Background context explaining the transport layer. This layer transmits data between two processes using port numbers to address processes on either end. The Transmission Control Protocol (TCP) is a critical protocol in this layer that ensures reliable data transmission.

:p What is the most important protocol in the transport layer?
??x
The most important protocol in the transport layer is the Transmission Control Protocol (TCP). TCP ensures reliable data transmission by providing mechanisms such as error detection, correction, and flow control.
```java
// Pseudocode for basic TCP connection setup
Client.tcpConnect(host) {
    // Establish a connection to the server at host:port
    connectSocketTo(host);
    
    while (!connectionEstablished()) {
        sendSYN();  // Send synchronization request
        receiveACK();  // Wait for acknowledgment
    }
}
```
x??

---

#### Application Layer
Background context explaining the application layer. This layer defines high-level communication protocols like HTTP or DNS, enabling processes to communicate over network services.

:p What does the application layer provide in terms of service?
??x
The application layer provides high-level communication protocols such as HTTP (HyperText Transfer Protocol) and DNS (Domain Name System), which enable processes to interact with network services. For example, HTTP is used for web page requests, while DNS resolves domain names into IP addresses.
```java
// Pseudocode for a basic HTTP GET request
public class HttpClient {
    public String get(String url) {
        URLResource resource = new URLResource(url);
        return resource.getContent();
    }
}
```
x??

---

#### Reliable Communication Channel (TCP)
Background context explaining how to build a reliable communication channel on top of an unreliable one (IP). This involves handling packet loss, duplication, and out-of-order delivery.

:p How does TCP handle reliability in data transmission?
??x
TCP handles reliability by ensuring that data is delivered correctly, even over unreliable networks. It manages this through mechanisms such as segmentation, error detection using checksums, retransmission of lost packets, and ordering of packets to maintain the correct sequence.
```java
// Pseudocode for TCP packet handling
tcp.sendPacket(packet) {
    // Segment data into packets if necessary
    segmentedPackets = segmentDataIntoPackets(data);
    
    // Send each packet and wait for acknowledgment
    for (packet in segmentedPackets) {
        send(packet);
        waitForACK(packet.sequenceNumber);  // Wait for ACK before sending next packet
    }
}
```
x??

---

#### Secure Channel (TLS)
Background context explaining how to build a secure channel on top of a reliable one (TCP), providing encryption, authentication, and integrity.

:p What does TLS provide in terms of security?
??x
TLS provides several key security features including encryption, ensuring data confidentiality; authentication, verifying the identities of parties involved in the communication; and integrity, ensuring that the data has not been tampered with during transmission.
```java
// Pseudocode for establishing a TLS connection
tls.initiateHandshake() {
    // Exchange certificates
    sendClientHello();
    receiveServerHello();
    
    // Generate keys and establish encryption
    generateKeys();
    encryptDataWithSharedKey();
}
```
x??

---

#### DNS (Domain Name System)
Background context explaining how the phone book of the Internet works, allowing nodes to discover others using names. At its core, DNS is a distributed, hierarchical, and eventually consistent key-value store.

:p What is at the heart of the Domain Name System?
??x
At the heart of the Domain Name System (DNS) lies a decentralized, hierarchical, and eventually consistent key-value storage system that allows nodes to discover other nodes using human-readable names instead of IP addresses.
```java
// Pseudocode for DNS query resolution
dns.resolveName(name) {
    // Start at root servers
    currentServer = getRootServers();
    
    while (!currentServer.respondsToQuery(name)) {
        // Follow the referral chain
        currentServer = currentServer.getReferralFor(name);
    }
    
    return currentServer.getResponseFor(name);  // Return IP address associated with name
}
```
x??

---

#### Service APIs
Background context explaining how services can expose APIs that other nodes can use to send commands or notifications. Specifically, this involves diving into the implementation of a RESTful HTTP API.

:p What is the purpose of exposing APIs in services?
??x
The purpose of exposing APIs in services is to enable other nodes and systems to interact with and utilize the functionalities provided by these services through standardized protocols like HTTP. This allows for modular development, better integration between different parts of a system or different systems altogether.
```java
// Pseudocode for creating a RESTful API endpoint
public class ServiceAPI {
    public void registerResource(Resource resource) {
        // Map URL to resource handler
        urlMap.put(resource.path(), resource.handler());
    }
    
    public Response handleRequest(Request request) {
        ResourceHandler handler = urlMap.get(request.url());
        if (handler != null) {
            return handler.handleRequest(request);
        } else {
            throw new UnknownEndpointException();
        }
    }
}
```
x??


#### Reliability Mechanism in TCP
Background context: In TCP, reliability is achieved through segment numbering and acknowledgment. Segments are numbered sequentially so that the receiver can detect missing or duplicate segments. Each transmitted segment must be acknowledged by the receiver to ensure its successful delivery. If an acknowledgment is not received within a certain time, a timer triggers retransmission.
:p How does TCP ensure the reliability of data transmission?
??x
TCP ensures reliability through sequential numbering and acknowledgments. Every sent segment has a unique sequence number so that the receiver can identify missing or duplicate segments. Upon receiving a segment, the receiver sends an acknowledgment (ACK) to confirm receipt. If no ACK is received after a timer expires, the sender retransmits the segment.
??x
```java
// Pseudocode for sending and receiving segments in TCP
public void sendSegment(int sequenceNumber, byte[] data) {
    // Send data with sequence number
    if (!receiveACK(sequenceNumber)) {
        // Timer expires without ACK
        resendSegment(sequenceNumber);
    }
}

public boolean receiveACK(int expectedSequenceNumber) {
    // Receive ACK and check for matching sequence number
    return receivedData.getAck().equals(expectedSequenceNumber);
}
```
x??

---

#### Three-Way Handshake in TCP Connection Establishment
Background context: The three-way handshake is a method used to establish a TCP connection. It involves three steps where both the sender and receiver agree on a connection by exchanging SYN, SYN/ACK, and ACK segments.
:p What is the three-way handshake process in establishing a TCP connection?
??x
The three-way handshake involves:
1. The sender sends a SYN segment with a random sequence number to initiate connection.
2. The receiver replies with a SYN/ACK segment, incrementing the sequence number.
3. The sender acknowledges the received sequence number and sends the first bytes of application data.

This establishes a connection in which both parties agree on the initial state.
??x
```java
// Pseudocode for three-way handshake in TCP connection establishment
public void startConnection() {
    int senderSequenceNumber = generateRandomNumber();
    
    // Step 1: Send SYN segment
    sendSYN(senderSequenceNumber);
    
    // Wait for ACK
    if (receiveACK(senderSequenceNumber)) {
        // Step 2 and 3: Send ACK with incremented sequence number, then application data
        int receiverSequenceNumber = getReceivedSequenceNumber();
        sendACKAndData(receiverSequenceNumber);
    }
}

private void sendSYN(int senderSequenceNumber) {
    // Send SYN segment with senderSequenceNumber
}

private boolean receiveACK(int expectedSenderSequenceNumber) {
    // Receive and process ACK, check for match with expectedSenderSequenceNumber
    return receivedData.getAck().equals(expectedSenderSequenceNumber);
}

private void sendACKAndData(int receiverSequenceNumber) {
    // Send ACK with incremented receiverSequenceNumber and application data
}
```
x??

---

#### Connection Lifecycle in TCP
Background context: The lifecycle of a TCP connection includes three main states—opening, established, and closing. These states help manage the connection's life cycle from initiation to termination.
:p What are the three main states of a TCP connection?
??x
The three main states of a TCP connection are:
1. **Opening State**: In this state, the connection is being created or established.
2. **Established State**: The connection is open and data transfer can occur.
3. **Closing State**: The connection is in the process of termination.

These states help manage the transition phases of establishing and closing a TCP connection.
??x
```java
// Pseudocode for state transitions in TCP connection lifecycle
public enum ConnectionState {
    OPENING, ESTABLISHED, CLOSING
}

public void setState(ConnectionState newState) {
    this.state = newState;
}

// Example usage:
public void transitionToEstablished() {
    if (state == OPENING) {
        setState(ESTABLISHED);
        startDataTransfer();
    }
}
```
x??

---

#### Flow Control in TCP
Background context: Flow control in TCP is a mechanism to prevent the sender from overwhelming the receiver by using a buffer. The receiver communicates the size of its receive buffer to the sender, which helps regulate data flow.
:p How does TCP implement flow control?
??x
TCP implements flow control by maintaining a receive buffer at the receiver side. When data arrives, it is stored in this buffer until the application processes it. The receiver sends back window advertisements (indicating the size of its buffer) along with ACK segments to the sender. If the sender respects these window sizes, it avoids sending more data than can fit in the receiver's buffer.
??x
```java
// Pseudocode for flow control implementation in TCP
public void sendSegment(int sequenceNumber, byte[] data) {
    // Send data if within receive window size
    if (bufferSize > 0 && !bufferIsFull()) {
        addToBuffer(sequenceNumber, data);
        bufferSize--;
    } else {
        // If buffer is full or max window size reached, wait for space
        waitForSpace();
    }
}

private boolean bufferIsFull() {
    return bufferSize == MAX_WINDOW_SIZE;
}

public void processACK(int expectedSequenceNumber) {
    // Process ACK to update buffer and window size
    if (receivedData.getAck().equals(expectedSequenceNumber)) {
        removeFromBuffer(expectedSequenceNumber);
        bufferSize++;
    }
}
```
x??

---


#### Encryption in TLS
Background context: Encryption is a crucial aspect of TLS, ensuring that data transmitted between a client and a server remains confidential. This confidentiality is achieved through the use of encryption keys negotiated during the initial handshake.

:p What does encryption do to ensure data security in TLS?
??x
Encryption ensures that any data transmitted between a client and a server is obfuscated so that only the communicating processes can read it. This is achieved by generating a shared secret key using asymmetric encryption, which is then used for symmetric encryption.

```java
// Pseudocode for establishing a TLS connection
public class TLSSession {
    public void establishConnection() {
        // Generate public and private keys
        KeyPair serverKeyPair = generateKeyPair();
        KeyPair clientKeyPair = generateKeyPair();

        // Exchange public keys to create shared secret
        SharedSecret sharedSecret = exchangePublicKeys(serverKeyPair.getPublic(), clientKeyPair.getPrivate());

        // Use shared secret for symmetric encryption
        SymmetricKey symmetricKey = deriveSymmetricKey(sharedSecret);
    }
}
```
x??

---

#### Asymmetric Encryption in TLS
Background context: Asymmetric encryption, also known as public key cryptography, is used to create a shared secret between the client and server. This ensures that sensitive information can be securely exchanged.

:p What role does asymmetric encryption play in establishing a TLS connection?
??x
Asymmetric encryption is used initially during the TLS handshake to negotiate a shared secret. The client and server generate their own key pairs, consisting of private and public keys. They then exchange their public keys to create a shared secret without ever transmitting it over the network.

```java
// Pseudocode for generating and exchanging public keys in asymmetric encryption
public class AsymmetricEncryption {
    public KeyPair generateKeyPair() {
        // Generate a key pair (private, public)
        return new KeyPair(new PrivateKey(), new PublicKey());
    }

    public SharedSecret exchangePublicKeys(PublicKey publicKeyClient, PrivateKey privateKeyServer) {
        // Client sends its public key to the server
        // Server uses client's public key and its own private key to create a shared secret
        return deriveSharedSecret(publicKeyClient, privateKeyServer);
    }
}
```
x??

---

#### Symmetric Encryption in TLS
Background context: Once a shared secret is established using asymmetric encryption, symmetric encryption takes over for faster and more efficient data transmission. This ensures that the actual communication remains fast while maintaining security.

:p Why is symmetric encryption used after establishing a shared secret?
??x
Symmetric encryption is used because it is much faster and cheaper compared to asymmetric encryption. Once the client and server have established a shared secret, they use this key for encrypting and decrypting data during their communication session.

```java
// Pseudocode for using symmetric encryption in TLS
public class SymmetricEncryption {
    public void encryptData(SymmetricKey symmetricKey, byte[] plaintext) throws Exception {
        // Encrypt the data using the symmetric key
        byte[] ciphertext = symmetricEncrypt(symmetricKey, plaintext);
        // Send encrypted data over the network
    }

    public byte[] decryptData(SymmetricKey symmetricKey, byte[] ciphertext) throws Exception {
        // Decrypt the received data using the symmetric key
        byte[] plaintext = symmetricDecrypt(symmetricKey, ciphertext);
        return plaintext;
    }
}
```
x??

---

#### Periodic Renegotiation in TLS
Background context: To minimize the risk of intercepted shared keys being used to decipher future communications, TLS implements periodic renegotiation. This involves re-establishing the shared secret periodically.

:p Why is periodic renegotiation important in TLS?
??x
Periodic renegotiation is important because it minimizes the amount of data that can be deciphered if a shared key is compromised. By regularly renewing the shared encryption key, the risk of long-term exposure of sensitive information is reduced.

```java
// Pseudocode for periodic renegotiation
public class TLSRenegotiation {
    public void renegotiateKey() throws Exception {
        // Generate new public and private keys
        KeyPair newKeyPair = generateKeyPair();
        
        // Exchange the new public key with the server/client
        SharedSecret newSharedSecret = exchangePublicKeys(newKeyPair.getPublic(), otherPartyKey);
        
        // Derive a new symmetric key from the shared secret
        SymmetricKey newSymmetricKey = deriveSymmetricKey(newSharedSecret);
    }
}
```
x??

---

#### Authentication in TLS via Certificates
Background context: While encryption ensures data confidentiality, authentication is necessary to verify the identity of the client and server. This is achieved using digital signatures based on asymmetric cryptography.

:p What is the role of certificates in TLS?
??x
Certificates play a crucial role in authenticating entities in TLS. They prove ownership of public keys for specific entities through a chain of trust. A certificate includes information about the owning entity, its expiration date, and a digital signature from a trusted third party (certificate authority or CA).

```java
// Pseudocode for handling certificates in TLS
public class TLSCertificate {
    public Certificate generateCertificate() throws Exception {
        // Generate a private key
        PrivateKey privateKey = generatePrivateKey();
        
        // Create a certificate request
        CertificateRequest certRequest = createCertificateRequest(privateKey);
        
        // Send the certificate request to a CA for signing
        Certificate signedCert = sendToCA(certRequest);
        
        return signedCert;
    }
}
```
x??

---

#### Trusted Certificate Authorities (CAs)
Background context: To establish trust, TLS relies on trusted root CAs that issue certificates. These CAs are included in the client's trusted store by default. A certificate chain ends with a self-signed certificate issued by a root CA.

:p How does a device verify the authenticity of a server’s certificate?
??x
A device verifies the authenticity of a server’s certificate by checking if it and its ancestors (intermediate certificates) are present in the client's trusted store. The chain starts from the server's certificate, goes through intermediate CAs, and ends with a root CA that self-signs its certificate.

```java
// Pseudocode for verifying a TLS certificate
public class CertificateVerification {
    public boolean verifyCertificate(Certificate certChain) throws Exception {
        // Retrieve trusted CAs from the client's trusted store
        List<CertAuthority> trustedCAs = getTrustedCAs();
        
        // Verify each certificate in the chain
        for (Certificate cert : certChain) {
            if (!cert.verify(trustedCAs)) {
                return false;
            }
        }
        
        return true;
    }
}
```
x??

---

#### Certificate Chain and Root CA
Background context: The certificate chain is a sequence of certificates, each signed by the next one in the chain. This creates a chain of trust that ultimately ends with a root CA.

:p What is the role of a root CA in TLS?
??x
A root CA plays a fundamental role as the ultimate authority in the certificate chain. It self-signs its certificate and issues intermediate CAs, which in turn issue certificates for specific entities (servers, clients). The client's trusted store includes root CAs like Let’s Encrypt, ensuring that only these authorities can issue trusted certificates.

```java
// Pseudocode for a root CA issuing certificates
public class RootCA {
    public Certificate selfSign() throws Exception {
        // Generate private and public keys for the root CA
        PrivateKey privateKey = generatePrivateKey();
        PublicKey publicKey = derivePublicKey(privateKey);
        
        // Create a certificate with the public key of this CA
        Certificate selfSignedCert = createSelfSignedCertificate(publicKey);
        
        return selfSignedCert;
    }
}
```
x??

---

