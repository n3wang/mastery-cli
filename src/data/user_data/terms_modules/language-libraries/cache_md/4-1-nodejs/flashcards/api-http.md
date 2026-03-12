# HTTP/HTTPS API Flashcards

#### Creating HTTP Server
The `http.createServer()` method is the foundation for building web servers in Node.js. The server emits a 'request' event for each incoming HTTP request, providing request and response objects to handle the interaction.

Understanding the server lifecycle and request/response pattern is essential for building web applications.

```javascript
const http = require('http');

// Create server with request handler
const server = http.createServer((req, res) => {
  // req: IncomingMessage (readable stream)
  // res: ServerResponse (writable stream)

  console.log(`${req.method} ${req.url}`);

  // Set status and headers
  res.writeHead(200, { 'Content-Type': 'text/plain' });

  // Send body
  res.write('Hello ');
  res.write('World');

  // End response
  res.end();
});

// Start listening
server.listen(3000, () => {
  console.log('Server running on port 3000');
});

// Graceful shutdown
process.on('SIGTERM', () => {
  server.close(() => {
    console.log('Server closed');
  });
});
```

Reference: `doc/api/http.md`

:p What are the key methods for creating and managing an HTTP server in Node.js?
??x
**Server creation and lifecycle:**

**1. Create server:**
```javascript
const server = http.createServer([requestListener]);

// With listener
const server = http.createServer((req, res) => {
  res.end('Hello');
});

// Or attach listener later
const server = http.createServer();
server.on('request', (req, res) => {
  res.end('Hello');
});
```

**2. Start listening:**
```javascript
// Listen on port
server.listen(port, [hostname], [backlog], [callback]);

server.listen(3000, () => {
  console.log('Listening on 3000');
});

// Listen on Unix socket
server.listen('/tmp/server.sock');

// Listen on random port (useful for testing)
server.listen(0, () => {
  console.log('Port:', server.address().port);
});
```

**3. Stop server:**
```javascript
// Stop accepting new connections
server.close([callback]);

// Existing connections continue until they finish
server.close(() => {
  console.log('Server shut down');
});

// Force close all connections (Node 18.2+)
server.closeAllConnections();
```

**4. Server properties:**
```javascript
server.listening         // Boolean: is server listening?
server.address()         // { port, address, family }
server.maxHeadersCount   // Max headers per request (default: 2000)
server.timeout          // Socket timeout in ms (default: 0, no timeout)
server.keepAliveTimeout // Keep-alive timeout (default: 5000ms)
```

**Important server events:**
```javascript
server.on('request', (req, res) => {
  // Every HTTP request
});

server.on('connection', (socket) => {
  // New TCP connection established
});

server.on('close', () => {
  // Server stopped accepting connections
});

server.on('error', (err) => {
  // Server error (e.g., port in use)
  if (err.code === 'EADDRINUSE') {
    console.error('Port already in use');
  }
});

server.on('clientError', (err, socket) => {
  // Client sent invalid HTTP
  socket.end('HTTP/1.1 400 Bad Request\r\n\r\n');
});
```

**Graceful shutdown pattern:**
```javascript
const server = http.createServer(handler);
server.listen(3000);

// Track active connections
const connections = new Set();

server.on('connection', (conn) => {
  connections.add(conn);
  conn.on('close', () => connections.delete(conn));
});

// Graceful shutdown
function shutdown() {
  console.log('Shutting down...');

  // Stop accepting new connections
  server.close(() => {
    console.log('Server closed');
    process.exit(0);
  });

  // Close idle keep-alive connections
  for (const conn of connections) {
    if (!conn.pending) {
      conn.end();
    }
  }

  // Force shutdown after timeout
  setTimeout(() => {
    console.error('Forcing shutdown');
    for (const conn of connections) {
      conn.destroy();
    }
    process.exit(1);
  }, 10000);
}

process.on('SIGTERM', shutdown);
process.on('SIGINT', shutdown);
```

**Common mistakes:**

```javascript
// WRONG: Forgot to call res.end()
server.on('request', (req, res) => {
  res.write('Hello');
  // Response hangs! Must call res.end()
});

// WRONG: Unhandled error crashes process
const server = http.createServer(handler);
server.listen(3000);
// If port 3000 in use, process crashes!

// RIGHT: Handle errors
server.on('error', (err) => {
  console.error('Server error:', err);
  process.exit(1);
});
server.listen(3000);
```

**Key insights:**
- Server is an EventEmitter
- Request handler is optional (can use 'request' event)
- close() stops new connections but allows existing to finish
- Must handle 'error' event to prevent crashes
x??

---

#### Request and Response Headers
HTTP headers carry metadata about the request and response. Node.js provides methods to read request headers and set response headers, with specific rules about when headers can be modified.

Headers must be set before the response body is sent, and there are important differences between `setHeader()` and `writeHead()`.

```javascript
const http = require('http');

const server = http.createServer((req, res) => {
  // READ REQUEST HEADERS
  console.log(req.headers);  // Object with lowercase keys
  console.log(req.headers['user-agent']);
  console.log(req.headers['content-type']);

  // Raw headers (preserves case and duplicates)
  console.log(req.rawHeaders);  // ['User-Agent', 'Mozilla...', 'Content-Type', 'text/plain']

  // SET RESPONSE HEADERS

  // Method 1: setHeader (can call multiple times)
  res.setHeader('Content-Type', 'application/json');
  res.setHeader('X-Custom', 'value');

  // Method 2: writeHead (sets status + headers at once)
  res.writeHead(200, {
    'Content-Type': 'application/json',
    'X-Custom': 'value'
  });

  // Can't modify headers after body sent!
  res.write('data');  // Headers sent now
  // res.setHeader() would throw error here

  res.end();
});
```

Reference: `doc/api/http.md` (Headers section)

:p How do you read request headers and set response headers in Node.js HTTP servers?
??x
**Reading request headers:**

```javascript
server.on('request', (req, res) => {
  // Headers object (keys are lowercase)
  console.log(req.headers);
  // { 'user-agent': 'Mozilla...', 'content-type': 'text/plain' }

  // Access specific header
  const contentType = req.headers['content-type'];
  const userAgent = req.headers['user-agent'];

  // Check if header exists
  if ('authorization' in req.headers) {
    const token = req.headers.authorization;
  }

  // Raw headers (preserves original case)
  console.log(req.rawHeaders);
  // ['User-Agent', 'Mozilla...', 'Content-Type', 'text/plain']

  // HTTP method and URL
  console.log(req.method);  // GET, POST, etc
  console.log(req.url);     // /path?query=string
});
```

**Setting response headers:**

**Method 1: setHeader() - Individual headers:**
```javascript
res.setHeader('Content-Type', 'application/json');
res.setHeader('X-Custom-Header', 'value');
res.setHeader('Cache-Control', 'no-cache');

// Can call multiple times before body sent
res.setHeader('X-Test', 'old');
res.setHeader('X-Test', 'new');  // Overwrites

// Check if header set
console.log(res.getHeader('Content-Type'));

// Remove header (before body sent)
res.removeHeader('X-Custom-Header');

// Get all headers
console.log(res.getHeaders());
```

**Method 2: writeHead() - Status + headers at once:**
```javascript
res.writeHead(200, {
  'Content-Type': 'application/json',
  'X-Custom': 'value'
});

// Can only call writeHead() once!
// res.writeHead(201); // Error!

// After writeHead(), headers are immutable
res.write('body');
```

**Setting status code:**
```javascript
// Method 1: Property
res.statusCode = 404;
res.end('Not Found');

// Method 2: writeHead
res.writeHead(404, 'Not Found', {
  'Content-Type': 'text/plain'
});
res.end('Not Found');

// Method 3: writeHead with just status
res.writeHead(404);
res.end();
```

**Header lifecycle:**

```javascript
// ✅ VALID: Set headers before body
res.setHeader('X-Custom', 'value');
res.write('body');  // Headers sent here
res.end();

// ❌ INVALID: Set headers after body
res.write('body');
res.setHeader('X-Custom', 'value');  // Error: Headers already sent

// ✅ VALID: writeHead before any write
res.writeHead(200, { 'Content-Type': 'text/plain' });
res.end('body');

// ❌ INVALID: writeHead after write
res.write('body');
res.writeHead(200);  // Error: Headers already sent
```

**Common headers:**

```javascript
// Content type
res.setHeader('Content-Type', 'application/json');
res.setHeader('Content-Type', 'text/html; charset=utf-8');

// Content length (auto-set by end(data), but can set manually)
res.setHeader('Content-Length', Buffer.byteLength(body));

// Caching
res.setHeader('Cache-Control', 'public, max-age=3600');
res.setHeader('ETag', '"abc123"');

// CORS
res.setHeader('Access-Control-Allow-Origin', '*');
res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT');

// Security
res.setHeader('X-Content-Type-Options', 'nosniff');
res.setHeader('X-Frame-Options', 'DENY');

// Cookies
res.setHeader('Set-Cookie', 'session=abc123; HttpOnly; Secure');
```

**Multiple values for same header:**
```javascript
// Array for multiple values
res.setHeader('Set-Cookie', [
  'cookie1=value1',
  'cookie2=value2'
]);

// Appending (for Set-Cookie only, others get overwritten)
res.setHeader('Set-Cookie', 'cookie1=value1');
// To add another cookie, must use array
```

**Case sensitivity:**
```javascript
// Request headers: always lowercase in req.headers
req.headers['content-type']  // ✅
req.headers['Content-Type']  // ❌ undefined

// Response headers: case-insensitive, but typically use lowercase
res.setHeader('content-type', 'text/plain');  // Conventional
res.setHeader('Content-Type', 'text/plain');  // Also works
```

**Headers sent check:**
```javascript
if (!res.headersSent) {
  res.setHeader('X-Custom', 'value');
}

// After first write() or writeHead(), headersSent = true
res.write('data');
console.log(res.headersSent);  // true
```

**Key rules:**
1. Request headers are lowercase in `req.headers`
2. Response headers must be set before body
3. `writeHead()` can only be called once
4. Use `setHeader()` for flexibility, `writeHead()` for efficiency
5. Check `res.headersSent` before modifying headers
x??

---

#### HTTP Request Body Parsing
HTTP request bodies are streams, not strings. For POST/PUT requests with body data, you must read and buffer the incoming data chunks. The body doesn't arrive all at once.

Understanding how to properly read request bodies is crucial for handling form submissions, JSON APIs, and file uploads.

```javascript
const http = require('http');

const server = http.createServer((req, res) => {
  if (req.method === 'POST') {
    let body = '';

    // Request is a readable stream
    req.on('data', (chunk) => {
      body += chunk.toString();

      // Prevent abuse: limit body size
      if (body.length > 1e6) {  // 1MB
        req.connection.destroy();
      }
    });

    req.on('end', () => {
      // All data received
      try {
        const data = JSON.parse(body);
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ received: data }));
      } catch (e) {
        res.writeHead(400);
        res.end('Invalid JSON');
      }
    });

    req.on('error', (err) => {
      console.error(err);
      res.writeHead(500);
      res.end();
    });
  } else {
    res.writeHead(200);
    res.end('Send POST request');
  }
});
```

Reference: `doc/api/http.md` (Request body section)

:p How do you properly read and parse HTTP request bodies in Node.js?
??x
**Request body is a stream:**

```javascript
// HTTP request body arrives in chunks
req.on('data', chunk => {
  // chunk is a Buffer
  console.log('Received:', chunk.length, 'bytes');
});

req.on('end', () => {
  // All data received
  console.log('Body complete');
});
```

**Pattern 1: Buffer chunks (for JSON/text):**
```javascript
server.on('request', (req, res) => {
  const chunks = [];

  req.on('data', chunk => {
    chunks.push(chunk);
  });

  req.on('end', () => {
    const body = Buffer.concat(chunks).toString();
    console.log('Body:', body);

    // Parse JSON
    try {
      const data = JSON.parse(body);
      res.end(JSON.stringify({ success: true, data }));
    } catch (err) {
      res.writeHead(400);
      res.end('Invalid JSON');
    }
  });
});
```

**Pattern 2: String concatenation (simpler but less efficient):**
```javascript
let body = '';

req.on('data', chunk => {
  body += chunk.toString();  // Convert Buffer to string
});

req.on('end', () => {
  console.log('Body:', body);
});
```

**Pattern 3: With size limit (prevent abuse):**
```javascript
const MAX_SIZE = 1e6;  // 1MB
let body = '';
let size = 0;

req.on('data', chunk => {
  size += chunk.length;

  if (size > MAX_SIZE) {
    // Destroy connection
    req.connection.destroy();
    return;
  }

  body += chunk.toString();
});

req.on('end', () => {
  // Process body
});
```

**Pattern 4: Promise-based (cleaner with async/await):**
```javascript
function getBody(req) {
  return new Promise((resolve, reject) => {
    const chunks = [];

    req.on('data', chunk => chunks.push(chunk));
    req.on('end', () => resolve(Buffer.concat(chunks).toString()));
    req.on('error', reject);
  });
}

// Usage
server.on('request', async (req, res) => {
  try {
    const body = await getBody(req);
    const data = JSON.parse(body);
    res.end(JSON.stringify(data));
  } catch (err) {
    res.writeHead(400);
    res.end('Error');
  }
});
```

**Parsing different content types:**

**JSON (application/json):**
```javascript
const contentType = req.headers['content-type'];

if (contentType === 'application/json') {
  let body = '';
  req.on('data', chunk => body += chunk);
  req.on('end', () => {
    try {
      const data = JSON.parse(body);
      // Use data
    } catch (err) {
      res.writeHead(400);
      res.end('Invalid JSON');
    }
  });
}
```

**URL-encoded form (application/x-www-form-urlencoded):**
```javascript
if (contentType === 'application/x-www-form-urlencoded') {
  let body = '';
  req.on('data', chunk => body += chunk);
  req.on('end', () => {
    const params = new URLSearchParams(body);
    console.log(params.get('username'));
    console.log(params.get('password'));
  });
}
```

**Multipart form data (file uploads):**
```javascript
// For file uploads, use a library like 'formidable' or 'busboy'
// Don't parse manually - very complex format

const formidable = require('formidable');
const form = new formidable.IncomingForm();

form.parse(req, (err, fields, files) => {
  console.log('Fields:', fields);
  console.log('Files:', files);
});
```

**Common mistakes:**

```javascript
// WRONG: Assuming body is available immediately
server.on('request', (req, res) => {
  console.log(req.body);  // ❌ undefined! Body is streamed
});

// WRONG: Not checking Content-Type
req.on('end', () => {
  const data = JSON.parse(body);  // ❌ May not be JSON!
});

// RIGHT: Check Content-Type
if (req.headers['content-type'] === 'application/json') {
  // Parse as JSON
}

// WRONG: No size limit (DoS vulnerability)
let body = '';
req.on('data', chunk => {
  body += chunk;  // ❌ Attacker can send GB of data
});

// RIGHT: Enforce size limit
if (size > MAX_SIZE) {
  req.connection.destroy();
}
```

**Error handling:**
```javascript
req.on('data', chunk => {
  // Process chunk
});

req.on('end', () => {
  // Complete
});

// Always handle error!
req.on('error', err => {
  console.error('Request error:', err);
  if (!res.headersSent) {
    res.writeHead(500);
    res.end();
  }
});
```

**Key points:**
1. Request body is a stream, arrives in chunks
2. Must buffer chunks and concatenate
3. Always enforce size limits (security)
4. Check Content-Type header before parsing
5. Use try/catch for JSON.parse
6. Consider using body-parser library for production
x??

---

#### HTTP Keep-Alive and Connection Pooling
HTTP Keep-Alive allows multiple requests to reuse the same TCP connection, significantly improving performance by avoiding the overhead of establishing new connections for each request.

Node.js uses an Agent to manage connection pooling, with different behavior for HTTP clients and servers.

```javascript
const http = require('http');

// Default agent with Keep-Alive
const agent = new http.Agent({
  keepAlive: true,
  keepAliveMsecs: 1000,    // Send keep-alive packets every 1s
  maxSockets: 256,          // Max concurrent sockets per host
  maxFreeSockets: 256,      // Max idle sockets to keep open
  timeout: 60000            // Socket timeout
});

// Make request with agent
http.get('http://example.com', { agent }, (res) => {
  console.log('Status:', res.statusCode);
  res.on('data', chunk => {});
  res.on('end', () => {
    // Connection returned to pool, not closed
  });
});

// Disable agent for single request (no pooling)
http.get('http://example.com', { agent: false }, (res) => {
  // Connection closes after response
});

// Use global agent
http.globalAgent.maxSockets = 128;
```

Reference: `doc/api/http.md` (http.Agent section)

:p What is HTTP Keep-Alive and how does Node.js implement connection pooling with Agents?
??x
**Keep-Alive basics:**

Without Keep-Alive:
```
Client                   Server
  |                         |
  |------ Request 1 ------->|
  |<----- Response 1 -------|
  |---- Close connection ---|
  |                         |
  |---- New connection ---->|
  |------ Request 2 ------->|
  |<----- Response 2 -------|
  |---- Close connection ---|

Cost: 2 TCP handshakes (expensive!)
```

With Keep-Alive:
```
Client                   Server
  |                         |
  |---- Open connection --->|
  |------ Request 1 ------->|
  |<----- Response 1 -------|
  |------ Request 2 ------->|  (same connection)
  |<----- Response 2 -------|
  |---- Close after idle ---|

Cost: 1 TCP handshake (efficient!)
```

**Node.js Agent:**

```javascript
// Create custom agent
const agent = new http.Agent({
  keepAlive: true,           // Enable Keep-Alive
  keepAliveMsecs: 1000,      // TCP keep-alive probe interval
  maxSockets: 256,           // Max concurrent per host
  maxTotalSockets: Infinity, // Max total across all hosts
  maxFreeSockets: 256,       // Max idle sockets to keep
  scheduling: 'fifo',        // or 'lifo' for socket reuse
  timeout: 0                 // Default socket timeout (0 = no timeout)
});

// Use agent
const options = {
  hostname: 'example.com',
  port: 80,
  path: '/',
  agent: agent  // Use custom agent
};

http.get(options, res => {
  // Connection managed by agent
});
```

**Global agent:**
```javascript
// Default agent used if no agent specified
console.log(http.globalAgent.maxSockets);  // 256 (in recent Node)

// Modify global agent
http.globalAgent.keepAlive = true;
http.globalAgent.maxSockets = 128;

// All requests without explicit agent use global
http.get('http://example.com', res => {
  // Uses http.globalAgent
});
```

**Agent behavior:**

**With Keep-Alive:**
```javascript
const agent = new http.Agent({ keepAlive: true });

// Request 1
http.get({ host: 'api.com', agent }, res => {
  res.on('end', () => {
    // Socket returns to pool (not closed)
  });
});

// Request 2 (reuses socket from pool)
http.get({ host: 'api.com', agent }, res => {
  // Same connection!
});
```

**Without Keep-Alive (agent: false):**
```javascript
http.get({ host: 'api.com', agent: false }, res => {
  res.on('end', () => {
    // Socket immediately closed
  });
});
```

**Connection pooling:**

```javascript
const agent = new http.Agent({
  keepAlive: true,
  maxSockets: 10,         // Max 10 concurrent per host
  maxFreeSockets: 5       // Keep 5 idle sockets
});

// Make 20 requests
for (let i = 0; i < 20; i++) {
  http.get({ host: 'api.com', agent }, res => {
    // First 10 requests: New connections
    // Next 10 requests: Wait for free socket
    res.on('data', () => {});
  });
}

// After requests complete:
// - Up to 5 sockets kept alive (maxFreeSockets)
// - Others closed
```

**Socket scheduling:**

```javascript
// FIFO (default): Fair, balanced
const agent = new http.Agent({
  keepAlive: true,
  scheduling: 'fifo'  // First socket returned to pool is used first
});

// LIFO: Better for Keep-Alive efficiency
const agent = new http.Agent({
  keepAlive: true,
  scheduling: 'lifo'  // Last socket returned is used first (stays warm)
});
```

**Per-host vs total limits:**
```javascript
const agent = new http.Agent({
  maxSockets: 10,        // 10 concurrent per host
  maxTotalSockets: 50    // 50 total across all hosts
});

// Can make:
// - 10 requests to api1.com
// - 10 requests to api2.com
// - 10 requests to api3.com
// - etc., up to 50 total
```

**Manually destroying agent:**
```javascript
// Clean up when done
agent.destroy();

// Closes all sockets in pool
// Further requests with this agent will fail
```

**Server-side Keep-Alive:**

```javascript
const server = http.createServer((req, res) => {
  res.end('OK');
});

// Configure server Keep-Alive
server.keepAliveTimeout = 5000;  // Close idle after 5s (default)
server.headersTimeout = 60000;   // Close if headers not received in 60s
server.requestTimeout = 0;       // Request timeout (0 = no timeout)

server.listen(3000);
```

**Performance implications:**

```javascript
// Benchmark: 100 requests

// Without Keep-Alive
// Time: ~2000ms
// TCP handshakes: 100

// With Keep-Alive
// Time: ~500ms
// TCP handshakes: ~10 (reuses connections)

// Speedup: 4x faster!
```

**Common pitfalls:**

```javascript
// WRONG: Creating new agent per request (defeats pooling)
for (let i = 0; i < 100; i++) {
  const agent = new http.Agent({ keepAlive: true });  // ❌ New agent!
  http.get({ host: 'api.com', agent }, res => {});
}

// RIGHT: Reuse same agent
const agent = new http.Agent({ keepAlive: true });
for (let i = 0; i < 100; i++) {
  http.get({ host: 'api.com', agent }, res => {});  // ✅ Shares pool
}

// WRONG: Never destroying agent (memory leak in long-running process)
function makeRequest() {
  const agent = new http.Agent({ keepAlive: true });
  return http.get({ agent }, res => {});
  // Agent and sockets never cleaned up!
}

// RIGHT: Destroy agent when done or use global
const agent = new http.Agent({ keepAlive: true });
// ... use agent ...
process.on('exit', () => agent.destroy());
```

**Key takeaways:**
- Keep-Alive reuses TCP connections (massive performance boost)
- Agent manages connection pool
- Default: keepAlive false, maxSockets 256
- Use same agent instance across requests
- LIFO scheduling better for warm connections
- Server and client both support Keep-Alive
x??

---

#### HTTPS vs HTTP
HTTPS adds TLS/SSL encryption on top of HTTP. In Node.js, the API is nearly identical to HTTP, but HTTPS requires certificates for servers and supports additional security options.

Understanding certificate management and TLS configuration is essential for secure applications.

```javascript
const https = require('https');
const fs = require('fs');

// Create HTTPS server (requires certificate)
const options = {
  key: fs.readFileSync('private-key.pem'),
  cert: fs.readFileSync('certificate.pem')
};

const server = https.createServer(options, (req, res) => {
  res.writeHead(200);
  res.end('Secure connection');
});

server.listen(443);

// HTTPS client request
https.get('https://api.example.com', (res) => {
  console.log('Status:', res.statusCode);

  res.on('data', chunk => {
    console.log(chunk.toString());
  });
});

// Custom TLS options
const agent = new https.Agent({
  keepAlive: true,
  ca: fs.readFileSync('ca-cert.pem'),        // Custom CA certificate
  rejectUnauthorized: true,                   // Verify certificates (default)
  checkServerIdentity: (hostname, cert) => {  // Custom validation
    // Return error or undefined
  }
});

https.get({ host: 'api.com', agent }, res => {});
```

Reference: `doc/api/https.md`, `doc/api/tls.md`

:p What are the key differences between HTTP and HTTPS in Node.js and how do you configure HTTPS servers?
??x
**HTTP vs HTTPS differences:**

**1. Protocol and port:**
```javascript
// HTTP (plaintext, port 80)
const http = require('http');
http.createServer(handler).listen(80);

// HTTPS (encrypted, port 443)
const https = require('https');
https.createServer(options, handler).listen(443);
```

**2. Certificate requirement:**
```javascript
// HTTP: No certificate needed
const httpServer = http.createServer((req, res) => {
  res.end('Hello');
});

// HTTPS: MUST provide certificate
const httpsServer = https.createServer({
  key: fs.readFileSync('private-key.pem'),
  cert: fs.readFileSync('certificate.pem')
}, (req, res) => {
  res.end('Secure Hello');
});
```

**3. API similarity:**
```javascript
// APIs are nearly identical
// Just replace 'http' with 'https'

// HTTP
http.createServer(handler);
http.get(url, callback);
http.request(options, callback);

// HTTPS (same methods)
https.createServer(options, handler);
https.get(url, callback);
https.request(options, callback);
```

**HTTPS server configuration:**

**Minimal server:**
```javascript
const https = require('https');
const fs = require('fs');

const server = https.createServer({
  key: fs.readFileSync('server-key.pem'),
  cert: fs.readFileSync('server-cert.pem')
}, (req, res) => {
  res.writeHead(200);
  res.end('Encrypted response');
});

server.listen(443);
```

**With intermediate certificates:**
```javascript
const options = {
  key: fs.readFileSync('private-key.pem'),
  cert: fs.readFileSync('certificate.pem'),
  ca: [
    fs.readFileSync('intermediate-cert-1.pem'),
    fs.readFileSync('intermediate-cert-2.pem')
  ]
};

https.createServer(options, handler).listen(443);
```

**With SNI (Server Name Indication) for multiple domains:**
```javascript
const options = {
  SNICallback: (servername, cb) => {
    if (servername === 'example.com') {
      cb(null, tls.createSecureContext({
        key: fs.readFileSync('example-key.pem'),
        cert: fs.readFileSync('example-cert.pem')
      }));
    } else if (servername === 'other.com') {
      cb(null, tls.createSecureContext({
        key: fs.readFileSync('other-key.pem'),
        cert: fs.readFileSync('other-cert.pem')
      }));
    } else {
      cb(new Error('Unknown domain'));
    }
  }
};

https.createServer(options, handler).listen(443);
```

**HTTPS client configuration:**

**Basic request:**
```javascript
https.get('https://api.example.com/data', (res) => {
  // Certificate automatically verified
  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', () => console.log(data));
});
```

**With custom CA (e.g., corporate proxy):**
```javascript
const options = {
  hostname: 'internal.company.com',
  port: 443,
  path: '/api',
  ca: fs.readFileSync('company-ca-cert.pem')
};

https.get(options, res => {
  // Custom CA used for verification
});
```

**Disable certificate verification (DANGEROUS, dev only):**
```javascript
// ⚠️ NEVER do this in production!
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

// Or per-request
https.get({
  hostname: 'self-signed.example.com',
  rejectUnauthorized: false  // ⚠️ Disables verification
}, res => {});
```

**Client certificate authentication (mutual TLS):**
```javascript
const options = {
  hostname: 'api.example.com',
  port: 443,
  path: '/',
  key: fs.readFileSync('client-key.pem'),
  cert: fs.readFileSync('client-cert.pem'),
  ca: fs.readFileSync('server-ca-cert.pem')
};

https.get(options, res => {
  // Server verifies client certificate
});
```

**Custom certificate validation:**
```javascript
const agent = new https.Agent({
  checkServerIdentity: (hostname, cert) => {
    // Custom validation logic
    if (cert.subject.CN !== hostname) {
      return new Error('Hostname mismatch');
    }
    // Return undefined if valid, Error if invalid
  }
});

https.get({ hostname: 'api.com', agent }, res => {});
```

**TLS version and cipher configuration:**
```javascript
const options = {
  key: fs.readFileSync('key.pem'),
  cert: fs.readFileSync('cert.pem'),
  minVersion: 'TLSv1.2',     // Minimum TLS version
  maxVersion: 'TLSv1.3',     // Maximum TLS version
  ciphers: 'HIGH:!aNULL:!MD5' // Allowed cipher suites
};

https.createServer(options, handler);
```

**Generating self-signed certificate (development):**
```bash
# Generate private key
openssl genrsa -out key.pem 2048

# Generate self-signed certificate
openssl req -new -x509 -key key.pem -out cert.pem -days 365

# Use in Node.js
const options = {
  key: fs.readFileSync('key.pem'),
  cert: fs.readFileSync('cert.pem')
};
```

**Common mistakes:**

```javascript
// WRONG: Hardcoded file paths
const options = {
  key: fs.readFileSync('/home/user/key.pem')  // ❌ Not portable
};

// RIGHT: Environment variables or config
const options = {
  key: fs.readFileSync(process.env.SSL_KEY_PATH)
};

// WRONG: Synchronous read in request handler
app.get('/api', (req, res) => {
  const options = {
    key: fs.readFileSync('key.pem')  // ❌ Blocks on every request!
  };
});

// RIGHT: Read once at startup
const tlsOptions = {
  key: fs.readFileSync('key.pem')
};
// Use tlsOptions in all requests

// WRONG: Disabling verification in production
https.get({
  hostname: 'api.com',
  rejectUnauthorized: false  // ⚠️ Vulnerable to MITM!
}, res => {});
```

**Key differences summary:**

| Aspect | HTTP | HTTPS |
|--------|------|-------|
| Encryption | None | TLS/SSL |
| Default port | 80 | 443 |
| Certificate | Not needed | Required for server |
| Performance | Faster | Slightly slower (encryption overhead) |
| Security | Plaintext | Encrypted |
| API | `require('http')` | `require('https')` |

**Best practices:**
- Always use HTTPS in production
- Use Let's Encrypt for free certificates
- Enable HTTP Strict Transport Security (HSTS)
- Keep certificates up to date (monitor expiry)
- Use strong cipher suites
- Enable perfect forward secrecy
- Never disable certificate validation in production
x??
