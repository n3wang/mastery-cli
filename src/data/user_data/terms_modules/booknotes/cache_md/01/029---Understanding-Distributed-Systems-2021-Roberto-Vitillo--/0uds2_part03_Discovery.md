# High-Quality Flashcards: 029---Understanding-Distributed-Systems-2021-Roberto-Vitillo--_processed (Part 3)


**Starting Chapter:** Discovery

---


#### Certificate Chain Verification Process
Background context: When establishing a TLS connection, the client verifies the server's certificate by scanning through the certificate chain until it finds one that it trusts. The certificates are then verified in reverse order from that point in the chain. The verification process checks several things such as the certificate's expiration date and whether the digital signature was actually signed by the issuing CA.

:p How does the client verify a server’s identity using the certificate chain?
??x
The client starts scanning the certificate chain until it finds one trusted by its certificate store (often provided by a browser or operating system). Then, starting from the last certificate in the path, each certificate is checked to ensure its validity and that the digital signature was correctly issued by the respective CA. If all checks pass without errors, the client confirms the server's identity.

```java
// Pseudocode for Certificate Verification
public boolean verifyCertificateChain(X509Certificate[] chain) {
    // Check if the first certificate in the chain is trusted
    TrustManager trustManager = getTrustManager();
    X509Certificate rootCert = chain[chain.length - 1];
    
    try {
        trustManager.checkClientTrusted(chain, "RSA");
    } catch (CertificateException e) {
        return false;
    }
    
    // Verify the certificates in reverse order
    for (int i = chain.length - 2; i >= 0; i--) {
        X509Certificate currentCert = chain[i];
        X509Certificate nextCert = chain[i + 1];
        
        try {
            currentCert.verify(nextCert.getPublicKey());
        } catch (InvalidKeyException | NoSuchAlgorithmException e) {
            return false;
        }
    }
    
    // If all checks pass, the certificate path is valid
    return true;
}
```
x??

---

#### Integrity Protection in TLS
Background context: While data obfuscation can prevent unauthorized access, a middle-man could still tamper with the data. To protect against this, TLS verifies the integrity of the data by calculating a message digest using a secure hash function like HMAC (Hash-based Message Authentication Code).

:p How does TLS ensure that transmitted data remains intact?
??x
TLS ensures data integrity through the use of HMACs (Hash-Based Message Authentication Codes). When a message is sent, both the sender and receiver compute the message digest independently. Upon receiving the message, the recipient re-computes the digest and compares it with the one included in the message. If they match, the data has not been tampered with or corrupted during transmission.

```java
// Pseudocode for HMAC Calculation and Verification
public byte[] calculateHMAC(byte[] key, byte[] data) {
    // Assume a secure hash function like SHA-256 is used to create HMAC
    MessageDigest digest = MessageDigest.getInstance("SHA-256");
    byte[] hmac = digest.doFinal(key, data);
    
    return hmac;
}

public boolean verifyHMAC(byte[] key, byte[] expectedDigest, byte[] receivedData) {
    // Calculate the HMAC for the received data using the same key
    byte[] calculatedDigest = calculateHMAC(key, receivedData);
    
    // Compare the calculated digest with the expected digest
    return Arrays.equals(calculatedDigest, expectedDigest);
}
```
x??

---

#### TLS Handshake Process
Background context: The TLS handshake is a process where the client and server agree on encryption algorithms, create a shared secret for symmetric encryption, verify each other's identities using certificates, and start secure communication. TLS 1.3 reduces the number of round trips required to just one.

:p What are the main steps involved in the TLS handshake?
??x
The main steps in the TLS handshake include:
1. Agreeing on cipher suite: The client and server negotiate which algorithms will be used for key exchange, signature, encryption, and authentication.
2. Generating a shared secret: Using the agreed-upon algorithms, the client and server create a shared secret that is used to encrypt future communication.
3. Verifying certificates: The client verifies the server's certificate, confirming its identity. Optionally, the server may also verify the client’s certificate.

```java
// Pseudocode for TLS Handshake (simplified)
public void performTLSHandshake(TLSClient client, TLSServer server) {
    // Step 1: Agree on cipher suite
    CipherSuite agreedCipherSuite = client.sendCipherSuites();
    server.receiveCipherSuites(agreedCipherSuite);
    
    // Step 2: Generate shared secret and start encryption
    KeyExchangeAlgorithm keyExchangeAlgo = agreedCipherSuite.getKeyExchangeAlgorithm();
    SymmetricEncryptionAlgorithm encAlg = agreedCipherSuite.getSymmetricEncryptionAlgorithm();
    
    // Perform key exchange to generate a shared secret
    byte[] sharedSecret = client.generateSharedSecret(keyExchangeAlgo, server.publicKey);
    server.sharedSecret = sharedSecret;
    
    // Step 3: Certificate verification and secure communication start
    if (client.verifyServerCertificate(server.certificate)) {
        client.sendEncryptedData(encAlg.encrypt("Hello Server"));
        server.receiveAndDecrypt(sharedSecret, "Encrypted Message");
    }
}
```
x??

---

#### DNS Resolution Process
Background context: DNS resolution translates a hostname into an IP address using a distributed and hierarchical key-value store. The process involves several round trips to resolve the domain name, with caching used to speed up subsequent resolutions.

:p How does DNS resolution work for resolving hostnames in a browser?
??x
DNS resolution works by iteratively querying multiple servers until the final IP address is obtained. Here’s how it happens:
1. Browser checks its local cache.
2. Resolver (typically hosted by ISP) translates the hostname, starting from root name servers and moving down through TLD and authoritative name servers.

```java
// Pseudocode for DNS Resolution
public String resolveHostname(String hostname) {
    // Check if the hostname is already in the local cache
    if (cache.containsKey(hostname)) {
        return cache.get(hostname);
    }
    
    // Resolve using DNS resolver
    Resolver resolver = new Resolver();
    String ipAddress = resolver.resolve(hostname);
    
    // Cache the result for future use
    cache.put(hostname, ipAddress);
    return ipAddress;
}
```
x??

---

#### Security Considerations with DNS
Background context: While UDP is used for its low overhead in DNS queries, it poses security risks. The industry has started moving towards using TLS over DNS (DNS-over-TLS) to enhance security.

:p Why did the designers of DNS choose UDP and what are the downsides?
??x
The designers of DNS chose UDP due to its lightweight nature and low overhead, allowing for quick resolution without establishing a new connection. However, this choice poses several security risks:
- DNS queries can be intercepted or tampered with by third parties.
- No encryption means sensitive data like domain names and IP addresses are exposed in clear text.

To address these issues, the industry is moving towards using TLS over DNS (DNS-over-TLS) to provide secure and encrypted communication for DNS resolution.

```java
// Pseudocode for DNS-over-TLS
public String resolveHostnameDnsOverTls(String hostname) {
    // Establish a TLS connection with a DNS server
    DnsOverTlsClient client = new DnsOverTlsClient("example-dns-server");
    
    // Send the query and receive the response securely
    String ipAddress = client.sendQuery(hostname);
    
    return ipAddress;
}
```
x??

---


---
#### Service Communication Patterns

Distributed systems use various communication patterns to enable interaction between services. Understanding these patterns is crucial for designing scalable and fault-tolerant systems.

:p What are the key differences between synchronous and asynchronous communication patterns in distributed systems?
??x
Communication patterns in distributed systems fall into two main categories:

**Synchronous (Request-Response)**
- Client blocks waiting for response
- Simple programming model (like function calls)
- Strong coupling: both services must be available
- Latency directly impacts client performance
- Example latency formula: Total = Network_RTT + Server_Processing
- Use cases: User-facing APIs, real-time queries

**Asynchronous (Message-Driven)**
- Client doesn't block, uses callbacks/promises/futures
- Decoupled: services communicate via message brokers
- Better fault tolerance and scalability
- Complexity: must handle eventual consistency
- Throughput formula: T = N / (Network_RTT + Server_Processing), where N = pipeline depth
- Use cases: Event processing, background jobs, data pipelines

**Performance comparison:**
```
Synchronous:   [Request] --RTT--> [Process] --RTT--> [Response]
Total time: 2*RTT + Processing

Asynchronous:  [Request] --RTT--> [Queue] (client continues)
               [Worker processes when available]
Total time: RTT (from client perspective)
```

```c
// C implementation of async request pattern
typedef struct {
    void (*callback)(void* result, void* context);
    void* context;
    int request_id;
    time_t timestamp;
} AsyncRequest;

typedef struct {
    AsyncRequest* requests;
    int capacity;
    int count;
    pthread_mutex_t lock;
} RequestQueue;

// Async request (non-blocking)
int send_async_request(RequestQueue* queue, void* data,
                       void (*callback)(void*, void*), void* context) {
    pthread_mutex_lock(&queue->lock);

    if (queue->count >= queue->capacity) {
        pthread_mutex_unlock(&queue->lock);
        return -1;  // Queue full: O(1) check
    }

    AsyncRequest* req = &queue->requests[queue->count++];
    req->callback = callback;
    req->context = context;
    req->request_id = generate_id();
    req->timestamp = time(NULL);

    pthread_mutex_unlock(&queue->lock);
    return req->request_id;  // Returns immediately
}

// Sync request (blocking)
void* send_sync_request(const char* server, void* data, size_t size) {
    int sock = socket(AF_INET, SOCK_STREAM, 0);
    connect(sock, server_addr, sizeof(server_addr));  // Blocks

    send(sock, data, size, 0);     // Blocks
    void* response = recv_response(sock);  // Blocks

    close(sock);
    return response;  // Total time: 2*RTT + processing
}
```

**Trade-offs summary:**
| Aspect | Synchronous | Asynchronous |
|--------|-------------|--------------|
| Latency visibility | Direct | Hidden |
| Error handling | Immediate | Deferred |
| Debugging | Easier | Harder |
| Scalability | Limited | Better |
| Consistency | Strong | Eventual |
x??

---
#### Message Serialization Formats
Request and response messages contain data that is serialized in a language-agnostic format. JSON (https://www.json.org) is self-describing and human-readable but comes at the cost of increased verbosity and parsing overhead. Protocol Buffers (https://developers.google.com/protocol-buffers) are leaner, more performant binary formats, sacrificing human readability for speed.

:p What are the trade-offs between using JSON and Protocol Buffers?
??x
Using JSON provides self-describing and human-readable messages but comes with increased verbosity and parsing overhead. On the other hand, Protocol Buffers offer a leaner, more performant binary format at the expense of reduced human readability. The choice depends on the specific requirements of the application, such as performance needs versus ease of development.
x??

---
#### Synchronous vs Asynchronous Communication
Synchronous communication blocks threads waiting for responses, making it less efficient compared to asynchronous communication, which uses callbacks to notify the client when a response is available.

:p What is an example of asynchronous communication in request-response?
??x
In asynchronous communication, instead of blocking and waiting for the response, the client can ask the outbound adapter to invoke a callback function when the response is received. This approach allows other tasks to be performed while waiting for the response.
```java
public void sendRequestAsync(String request) {
    // Code to send the request asynchronously
    serviceAdapter.send(request, new ResponseCallback() {
        @Override
        public void onResponse(String response) {
            // Handle the response when it arrives
        }
    });
}
```
x??

---
#### Direct Communication and Thread Management
Direct communication in a synchronous style can block threads that could be used for other tasks. This is particularly problematic as it reduces the efficiency of concurrent operations.

:p How does blocking threads impact system performance?
??x
Blocking threads impacts system performance by preventing them from being utilized to perform other tasks, such as handling additional requests or processing other data. This can lead to a bottleneck in the system's ability to scale and respond efficiently to user requests.
x??

---


#### JavaScript and C# Handling Asynchronous Code
Background context explaining how asynchronous programming was traditionally handled using callbacks but modern languages like JavaScript and C# offer async/await as a more straightforward approach to writing asynchronous code. Async/await simplifies handling of promises and makes it easier to deal with asynchronous operations.
If applicable, add code examples with explanations:
```javascript
async function fetchData() {
    try {
        let response = await fetch('https://api.example.com/data');
        let data = await response.json();
        console.log(data);
    } catch (error) {
        console.error("Error fetching data:", error);
    }
}
```
:p How does JavaScript and C# make writing asynchronous code simpler compared to traditional callbacks?
??x
JavaScript and C# introduce the `async` and `await` keywords which allow developers to write asynchronous code that looks synchronous. This makes it easier to handle promises and resolve async operations without nesting callback hell, making the code cleaner and more readable.
```csharp
public async Task FetchDataAsync()
{
    try
    {
        var response = await httpClient.GetAsync("https://api.example.com/data");
        var data = await response.Content.ReadAsStringAsync();
        Console.WriteLine(data);
    }
    catch (Exception ex)
    {
        Console.WriteLine($"Error fetching data: {ex.Message}");
    }
}
```
x??

---

#### gRPC, REST, and GraphQL for Service-to-Service Communication
Background context explaining the different IPC technologies used for service-to-service communication, specifically highlighting that internal APIs often use high-performance RPC frameworks like gRPC while public APIs tend to be based on REST. Introduce GraphQL as another popular API format.
:p What are some common IPC technologies used in service-to-service communications and how do they differ?
??x
gRPC is a high-performance RPC framework commonly used for internal API communications within an organization, whereas REST is typically used for external public APIs. GraphQL provides a more flexible data fetching mechanism compared to traditional RESTful services.
x??

---

#### HTTP Request-Response Protocol
Background context explaining that HTTP is a request-response protocol used for encoding and transporting information between clients and servers. It uses textual blocks of data containing start lines, headers, and optional bodies.
If applicable, add code examples with explanations:
```http
GET /api/users HTTP/1.1
Host: example.com

HTTP/1.1 200 OK
Content-Type: application/json
Date: Mon, 1 Jan 2024 00:00:00 GMT
Server: Apache/2.4.41 (Ubuntu)

{
    "users": [
        {"id": 1, "name": "John Doe"},
        {"id": 2, "name": "Jane Smith"}
    ]
}
```
:p What is the purpose of an HTTP request and how does it differ from a response?
??x
An HTTP request is sent by a client to a server to make a specific request (e.g., GET data), while the server responds with a status line, headers, and possibly a body. The main difference lies in their start lines: requests indicate what action to perform, whereas responses report on the result of that action.
x??

---

#### HTTP 1.1 Protocol Details
Background context explaining the stateless nature of HTTP where everything needed by a server to process a request must be contained within the request itself. Also, discuss how HTTP 1.1 manages connections and requests.
:p What is one key difference between HTTP 1.0 and HTTP 1.1 in terms of handling multiple requests?
??x
HTTP 1.1 introduced persistent connections, allowing for reusing a single TCP connection to send multiple requests over the same connection, thus improving performance by avoiding the overhead of establishing new connections.
x??

---

#### Reliability and HTTPS
Background context explaining how HTTP can be unreliable without proper security measures, leading to the adoption of HTTPS which combines HTTP with TLS/SSL. Mention that defaulting to HTTPS is recommended for security reasons.
:p Why should developers always use HTTPS instead of plain HTTP?
??x
Developers should always use HTTPS because it provides end-to-end encryption and authentication, ensuring data privacy and integrity between the client and server. This protection against eavesdropping and tampering makes HTTPS the preferred choice over plain HTTP for secure communications.
x??

---

#### HTTP 1.1 Pipelining
Background context explaining that while HTTP 1.1 technically allows pipelining (sending multiple requests before receiving responses), it has not been widely adopted due to its limitations. Discuss why pipelining is useful and the challenges faced in adoption.
:p What does pipelining in HTTP 1.1 allow for?
??x
Pipelining in HTTP 1.1 allows sending multiple requests on a single TCP connection before receiving responses, which can improve performance by reducing latency. However, it has not been widely adopted due to potential issues with servers that might buffer or mishandle pipelined requests.
x??

---

