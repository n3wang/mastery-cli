# Crypto, Path, and URL API Flashcards

#### Cryptographic Hashing
Hashing converts data into a fixed-size digest using one-way algorithms. Hashes are used for integrity verification, password storage (with salts), and digital signatures. Node.js crypto module provides cryptographically secure hash functions.

Understanding hashing is fundamental for security implementations.

```javascript
const crypto = require('crypto');

// Create hash
const hash = crypto.createHash('sha256');

// Add data (can call multiple times)
hash.update('Hello');
hash.update(' ');
hash.update('World');

// Get digest (can only call once!)
const digest = hash.digest('hex');
console.log(digest);  // '64ec88ca00b268e5ba1a35678a1b5316d212f4f366b2477232534a8aeca37f3c'

// One-shot hashing (Node 19+)
const quickHash = crypto.hash('sha256', 'Hello World', 'hex');

// Common algorithms
crypto.createHash('sha256');   // Recommended
crypto.createHash('sha512');   // More secure, slower
crypto.createHash('sha1');     // Deprecated, don't use
crypto.createHash('md5');      // Insecure, don't use

// Hash a file
const fileHash = crypto.createHash('sha256');
const stream = fs.createReadStream('file.txt');
stream.on('data', (chunk) => fileHash.update(chunk));
stream.on('end', () => {
  console.log(fileHash.digest('hex'));
});
```

Reference: `doc/api/crypto.md`

:p How do you create cryptographic hashes in Node.js and what are the important considerations?
??x
**Creating hashes:**

**Basic pattern:**
```javascript
const hash = crypto.createHash(algorithm);
hash.update(data);
const digest = hash.digest([encoding]);
```

**Step by step:**
```javascript
// 1. Create hash object
const hash = crypto.createHash('sha256');

// 2. Update with data (can call multiple times)
hash.update('Part 1');
hash.update('Part 2');
// Equivalent to: hash.update('Part 1Part 2')

// 3. Get digest (ONLY ONCE per hash object)
const hex = hash.digest('hex');     // Hexadecimal string
const buf = hash.digest();          // Buffer
const b64 = hash.digest('base64');  // Base64 string

// ❌ Cannot use hash after digest()
// hash.update('more');  // Error: Digest already called
// hash.digest();        // Error: Digest already called
```

**Common algorithms:**

```javascript
// SHA-256 (recommended for general use)
crypto.createHash('sha256');
// Output: 256 bits = 32 bytes = 64 hex chars

// SHA-512 (more secure, larger output)
crypto.createHash('sha512');
// Output: 512 bits = 64 bytes = 128 hex chars

// SHA-1 (deprecated - collisions found)
crypto.createHash('sha1');  // Don't use for security!

// MD5 (broken - DO NOT USE)
crypto.createHash('md5');   // Only for non-security use (e.g., checksums)
```

**One-shot hashing (simpler, Node 19+):**
```javascript
const digest = crypto.hash('sha256', 'data', 'hex');
// Equivalent to:
// crypto.createHash('sha256').update('data').digest('hex')
```

**Hashing files:**

```javascript
// Stream approach (memory efficient)
function hashFile(filename) {
  return new Promise((resolve, reject) => {
    const hash = crypto.createHash('sha256');
    const stream = fs.createReadStream(filename);

    stream.on('data', chunk => hash.update(chunk));
    stream.on('end', () => resolve(hash.digest('hex')));
    stream.on('error', reject);
  });
}

const fileHash = await hashFile('large-file.bin');

// Or with pipeline
const { pipeline } = require('stream/promises');
const hash = crypto.createHash('sha256');

await pipeline(
  fs.createReadStream('file.txt'),
  hash
);

console.log(hash.digest('hex'));
```

**Encoding options:**

```javascript
const hash = crypto.createHash('sha256').update('data');

hash.digest('hex');     // '3a6eb0790f39ac87...' (most common)
hash.digest('base64');  // 'Om6weQ85rIc+...'
hash.digest('base64url'); // URL-safe base64
hash.digest();          // Buffer (binary)
```

**Common use cases:**

**1. File integrity verification:**
```javascript
// Create checksum
const originalHash = crypto.createHash('sha256')
  .update(fs.readFileSync('file.txt'))
  .digest('hex');

// Later, verify file unchanged
const currentHash = crypto.createHash('sha256')
  .update(fs.readFileSync('file.txt'))
  .digest('hex');

if (originalHash === currentHash) {
  console.log('File intact');
} else {
  console.log('File modified!');
}
```

**2. Content-based cache keys:**
```javascript
function getCacheKey(content) {
  return crypto.createHash('sha256')
    .update(content)
    .digest('hex');
}

const key = getCacheKey(JSON.stringify(data));
cache.set(key, result);
```

**3. Password hashing (WRONG - need PBKDF2/bcrypt):**
```javascript
// ❌ NEVER do this - insecure!
const passwordHash = crypto.createHash('sha256')
  .update(password)
  .digest('hex');

// ✅ Use PBKDF2 or bcrypt instead
crypto.pbkdf2(password, salt, 100000, 64, 'sha512', (err, derivedKey) => {
  if (err) throw err;
  const hash = derivedKey.toString('hex');
  // Store hash + salt
});
```

**Important considerations:**

**1. One-way only:**
```javascript
const hash = crypto.createHash('sha256')
  .update('secret data')
  .digest('hex');

// ❌ Cannot reverse: hash → original data
// Hashing is one-way only!
```

**2. Same input = same output (deterministic):**
```javascript
const h1 = crypto.createHash('sha256').update('data').digest('hex');
const h2 = crypto.createHash('sha256').update('data').digest('hex');
console.log(h1 === h2);  // true - always same
```

**3. Small change = completely different hash:**
```javascript
const h1 = crypto.createHash('sha256').update('data').digest('hex');
const h2 = crypto.createHash('sha256').update('Data').digest('hex');
console.log(h1 === h2);  // false - completely different
```

**4. digest() can only be called once:**
```javascript
const hash = crypto.createHash('sha256').update('data');
const hex = hash.digest('hex');
// hash.digest();  // ❌ Error!

// Must create new hash for another digest
const hash2 = crypto.createHash('sha256').update('data');
const buffer = hash2.digest();
```

**Performance:**

```javascript
// Benchmark different algorithms (1MB data)
// MD5:     ~15ms   (fast but insecure)
// SHA-1:   ~20ms   (fast but deprecated)
// SHA-256: ~25ms   (good balance) ← Use this
// SHA-512: ~35ms   (more secure, slower)

// For large files, performance difference is negligible
// compared to I/O time
```

**Security notes:**
- Use SHA-256 or SHA-512 for modern applications
- Never use MD5 or SHA-1 for security (both have known collisions)
- For passwords, use PBKDF2, bcrypt, or argon2 (not plain hashing)
- Add salt to prevent rainbow table attacks
- Hashes are not encryption (cannot be reversed)

**Available algorithms:**
```javascript
// List all available hash algorithms
console.log(crypto.getHashes());
// ['sha256', 'sha512', 'sha1', 'md5', 'sha3-256', ...]
```

**Key takeaways:**
- Use `sha256` for general hashing
- Call `digest()` only once per hash object
- Stream large files instead of loading into memory
- Hashing is one-way (cannot reverse)
- Don't use plain hashing for passwords (use PBKDF2/bcrypt)
x??

---

#### HMAC for Message Authentication
HMAC (Hash-based Message Authentication Code) combines hashing with a secret key to create authenticated signatures. Unlike plain hashes, HMAC proves both integrity and authenticity—only someone with the secret key could have created the HMAC.

HMAC is commonly used in API authentication, JWT tokens, and webhook signatures.

```javascript
const crypto = require('crypto');

// Create HMAC with secret key
const hmac = crypto.createHmac('sha256', 'secret-key');

// Add data
hmac.update('Message to authenticate');

// Get signature
const signature = hmac.digest('hex');
console.log(signature);

// Verify HMAC
function verifyHmac(message, signature, key) {
  const expectedHmac = crypto.createHmac('sha256', key)
    .update(message)
    .digest('hex');

  return crypto.timingSafeEqual(
    Buffer.from(expectedHmac),
    Buffer.from(signature)
  );
}

// Usage in API authentication
const payload = JSON.stringify({ user: 'alice', action: 'delete' });
const apiKey = 'my-secret-key';
const signature = crypto.createHmac('sha256', apiKey)
  .update(payload)
  .digest('hex');

// Send: payload + signature
// Server verifies signature matches payload + their copy of key
```

Reference: `doc/api/crypto.md` (HMAC section)

:p What is HMAC and how does it differ from regular hashing?
??x
**HMAC vs Hash:**

**Regular Hash:**
```javascript
const hash = crypto.createHash('sha256')
  .update('message')
  .digest('hex');

// Anyone can compute this hash
// Proves: Integrity (message unchanged)
// Doesn't prove: Authenticity (who sent it)
```

**HMAC (Hash with secret key):**
```javascript
const hmac = crypto.createHmac('sha256', 'secret-key')
  .update('message')
  .digest('hex');

// Only someone with 'secret-key' can compute this
// Proves: Integrity + Authenticity (message unchanged AND from legitimate sender)
```

**Key differences:**

| Aspect | Hash | HMAC |
|--------|------|------|
| Key | None | Required secret key |
| Purpose | Integrity | Integrity + Authenticity |
| Anyone can create | Yes | No (need key) |
| Use for | Checksums, fingerprints | Authentication, signatures |

**Creating HMAC:**

```javascript
// 1. Create HMAC with algorithm and key
const hmac = crypto.createHmac('sha256', 'secret-key');

// 2. Update with data (can call multiple times)
hmac.update('Part 1');
hmac.update('Part 2');

// 3. Get signature (only once!)
const signature = hmac.digest('hex');
```

**Verifying HMAC (timing-safe):**

```javascript
function verifyHmac(message, receivedSignature, secretKey) {
  // Compute expected HMAC
  const expectedHmac = crypto.createHmac('sha256', secretKey)
    .update(message)
    .digest('hex');

  // ❌ WRONG: String comparison (timing attack vulnerable)
  // return expectedHmac === receivedSignature;

  // ✅ RIGHT: Timing-safe comparison
  return crypto.timingSafeEqual(
    Buffer.from(expectedHmac, 'hex'),
    Buffer.from(receivedSignature, 'hex')
  );
}

// Usage
const isValid = verifyHmac(message, signature, 'secret-key');
if (isValid) {
  console.log('Authentic message');
} else {
  console.log('Tampered or wrong key');
}
```

**Why timing-safe comparison?**

```javascript
// String comparison leaks timing information
function unsafeCompare(a, b) {
  if (a.length !== b.length) return false;

  for (let i = 0; i < a.length; i++) {
    if (a[i] !== b[i]) return false;  // Returns early!
  }
  return true;
}

// Attacker can guess signature byte-by-byte
// by measuring response time!

// timingSafeEqual() compares all bytes
// even if mismatch found (constant time)
```

**Common use cases:**

**1. API request signing:**
```javascript
// Client signs request
const apiKey = 'shared-secret';
const requestBody = JSON.stringify({ user: 'alice', amount: 100 });
const timestamp = Date.now();

const signature = crypto.createHmac('sha256', apiKey)
  .update(timestamp + requestBody)
  .digest('hex');

// Send request with signature
fetch('/api/transfer', {
  method: 'POST',
  headers: {
    'X-Signature': signature,
    'X-Timestamp': timestamp
  },
  body: requestBody
});

// Server verifies
function verifyRequest(req) {
  const expectedSignature = crypto.createHmac('sha256', apiKey)
    .update(req.headers['x-timestamp'] + req.body)
    .digest('hex');

  const receivedSignature = req.headers['x-signature'];

  return crypto.timingSafeEqual(
    Buffer.from(expectedSignature),
    Buffer.from(receivedSignature)
  );
}
```

**2. Webhook signature verification (like GitHub webhooks):**
```javascript
// GitHub sends webhook with signature
// X-Hub-Signature-256: sha256=abc123...

function verifyGitHubWebhook(payload, signature, secret) {
  const hmac = crypto.createHmac('sha256', secret)
    .update(payload)
    .digest('hex');

  const expectedSignature = `sha256=${hmac}`;

  return crypto.timingSafeEqual(
    Buffer.from(expectedSignature),
    Buffer.from(signature)
  );
}

app.post('/webhook', (req, res) => {
  const signature = req.headers['x-hub-signature-256'];
  const payload = JSON.stringify(req.body);

  if (verifyGitHubWebhook(payload, signature, process.env.WEBHOOK_SECRET)) {
    // Process webhook
    res.send('OK');
  } else {
    res.status(401).send('Invalid signature');
  }
});
```

**3. Secure session tokens:**
```javascript
function createSession(userId) {
  const sessionData = {
    userId,
    createdAt: Date.now()
  };

  const data = JSON.stringify(sessionData);
  const signature = crypto.createHmac('sha256', process.env.SESSION_SECRET)
    .update(data)
    .digest('base64');

  // Token = data + signature
  return Buffer.from(JSON.stringify({
    data,
    signature
  })).toString('base64');
}

function verifySession(token) {
  const decoded = JSON.parse(Buffer.from(token, 'base64').toString());
  const { data, signature } = decoded;

  const expectedSignature = crypto.createHmac('sha256', process.env.SESSION_SECRET)
    .update(data)
    .digest('base64');

  if (!crypto.timingSafeEqual(Buffer.from(expectedSignature), Buffer.from(signature))) {
    throw new Error('Invalid session');
  }

  return JSON.parse(data);
}
```

**4. Message integrity in distributed systems:**
```javascript
// Ensure message not tampered in transit
function sendMessage(message, key) {
  const hmac = crypto.createHmac('sha256', key)
    .update(message)
    .digest('hex');

  return {
    message,
    hmac
  };
}

function receiveMessage(data, key) {
  const expectedHmac = crypto.createHmac('sha256', key)
    .update(data.message)
    .digest('hex');

  if (!crypto.timingSafeEqual(Buffer.from(expectedHmac), Buffer.from(data.hmac))) {
    throw new Error('Message tampered');
  }

  return data.message;
}
```

**Key management:**

```javascript
// ❌ NEVER hardcode keys
const hmac = crypto.createHmac('sha256', 'my-secret-key');  // Bad!

// ✅ Use environment variables
const hmac = crypto.createHmac('sha256', process.env.HMAC_KEY);

// ✅ Generate secure keys
const key = crypto.randomBytes(32).toString('hex');  // 256-bit key
```

**Algorithms:**

```javascript
// Use SHA-256 or SHA-512
crypto.createHmac('sha256', key);  // Good (256-bit output)
crypto.createHmac('sha512', key);  // More secure (512-bit output)

// Avoid weak algorithms
crypto.createHmac('sha1', key);    // Deprecated
crypto.createHmac('md5', key);     // Insecure
```

**Common mistakes:**

```javascript
// ❌ Using regular hash instead of HMAC
const hash = crypto.createHash('sha256')
  .update(message)
  .digest('hex');
// Anyone can compute this - no authentication!

// ✅ Use HMAC with secret key
const hmac = crypto.createHmac('sha256', secretKey)
  .update(message)
  .digest('hex');
// Only someone with secretKey can compute this

// ❌ Unsafe comparison (timing attack)
if (expectedHmac === receivedHmac) {  // Vulnerable!

// ✅ Timing-safe comparison
if (crypto.timingSafeEqual(Buffer.from(expectedHmac), Buffer.from(receivedHmac))) {
```

**Key takeaways:**
- HMAC = Hash + Secret Key
- Provides authentication + integrity
- Always use `timingSafeEqual()` for verification
- Use SHA-256 or SHA-512
- Store keys securely (environment variables, secrets manager)
- Common for API authentication and webhook verification
x??

---

#### Path Manipulation with path Module
The `path` module provides utilities for working with file and directory paths. It handles platform differences (Unix vs Windows) automatically, making code portable.

Using `path` methods prevents common bugs caused by manual string concatenation and platform differences.

```javascript
const path = require('path');

// Join path segments
path.join('/foo', 'bar', 'baz/asdf', 'quux', '..');
// '/foo/bar/baz/asdf'

// Resolve to absolute path
path.resolve('foo', 'bar', 'baz');
// '/current/working/dir/foo/bar/baz'

path.resolve('/foo', '/bar', 'baz');
// '/bar/baz' (absolute path on left takes precedence)

// Parse path into components
path.parse('/home/user/file.txt');
// {
//   root: '/',
//   dir: '/home/user',
//   base: 'file.txt',
//   name: 'file',
//   ext: '.txt'
// }

// Get components
path.dirname('/foo/bar/baz.txt');  // '/foo/bar'
path.basename('/foo/bar/baz.txt'); // 'baz.txt'
path.extname('/foo/bar/baz.txt');  // '.txt'

// Normalize path
path.normalize('/foo/bar//baz/asdf/quux/..');
// '/foo/bar/baz/asdf'

// Platform separators
console.log(path.sep);        // '/' on Unix, '\\' on Windows
console.log(path.delimiter);  // ':' on Unix, ';' on Windows
```

Reference: `doc/api/path.md`

:p What are the key differences between path.join() and path.resolve() and when should each be used?
??x
**path.join() vs path.resolve():**

**path.join() - Concatenate segments:**
```javascript
path.join('foo', 'bar', 'baz');
// 'foo/bar/baz' (relative path)

path.join('/foo', 'bar', 'baz');
// '/foo/bar/baz' (preserves leading /)

path.join('foo', '/bar', 'baz');
// 'foo/bar/baz' (removes extra /)

path.join('foo', '..', 'bar');
// 'bar' (resolves ..)
```
- Joins segments with platform separator
- Normalizes resulting path
- Returns relative or absolute (based on input)
- Does NOT use current working directory

**path.resolve() - Resolve to absolute:**
```javascript
path.resolve('foo', 'bar', 'baz');
// '/current/working/dir/foo/bar/baz' (absolute!)

path.resolve('/foo', 'bar', 'baz');
// '/foo/bar/baz'

path.resolve('/foo', '/bar', 'baz');
// '/bar/baz' (jumps to /bar)

path.resolve('foo', '/bar', 'baz');
// '/bar/baz' (absolute /bar overrides foo)
```
- **Always returns absolute path**
- Works right-to-left, stops at first absolute path
- Uses `process.cwd()` if no absolute path found
- Like `cd` commands in sequence

**When to use each:**

**Use path.join() for:**
1. **Combining path segments:**
```javascript
// Build relative paths
const configPath = path.join('config', 'settings.json');
// 'config/settings.json'

// Build paths relative to known directory
const filePath = path.join(__dirname, 'data', 'file.txt');
// '/app/src/data/file.txt' (if __dirname is '/app/src')
```

2. **When you want relative paths:**
```javascript
const relativePath = path.join('..', 'sibling', 'file.txt');
// '../sibling/file.txt'
```

**Use path.resolve() for:**
1. **Getting absolute paths:**
```javascript
// Resolve relative to current directory
const absolutePath = path.resolve('file.txt');
// '/current/working/dir/file.txt'

// Resolve from multiple possibilities
const filePath = path.resolve(
  process.env.CONFIG_DIR || './config',
  'settings.json'
);
```

2. **Command-line argument paths:**
```javascript
// User provides relative or absolute path
const inputFile = process.argv[2];
const absoluteInput = path.resolve(inputFile);
// Always get absolute path, regardless of user input
```

**Detailed behavior differences:**

**Example 1: Relative segments**
```javascript
path.join('a', 'b', 'c');
// 'a/b/c'

path.resolve('a', 'b', 'c');
// '/current/working/dir/a/b/c'
```

**Example 2: Absolute segment in middle**
```javascript
path.join('a', '/b', 'c');
// 'a/b/c' (joins, removes extra /)

path.resolve('a', '/b', 'c');
// '/b/c' (stops at /b, ignores 'a')
```

**Example 3: With process.cwd() = '/home/user'**
```javascript
path.join('foo', 'bar');
// 'foo/bar' (relative)

path.resolve('foo', 'bar');
// '/home/user/foo/bar' (absolute, uses cwd)
```

**Example 4: Multiple absolute paths**
```javascript
path.join('/foo', '/bar', '/baz');
// '/foo/bar/baz' (joins all)

path.resolve('/foo', '/bar', '/baz');
// '/baz' (rightmost absolute wins)
```

**Right-to-left processing in resolve:**
```javascript
// Think of resolve as 'cd' commands
path.resolve('a', 'b', 'c');
// cd a; cd b; cd c
// Result: /cwd/a/b/c

path.resolve('a', '/b', 'c');
// cd a; cd /b; cd c
// Result: /b/c (cd /b jumps to root)

path.resolve('/a', '/b', '/c');
// cd /a; cd /b; cd /c
// Result: /c (each cd jumps to root)
```

**Cross-platform considerations:**

```javascript
// ❌ NEVER do this (breaks on Windows)
const filePath = __dirname + '/data/file.txt';

// ✅ Use path.join
const filePath = path.join(__dirname, 'data', 'file.txt');
// Unix: '/app/data/file.txt'
// Windows: 'C:\\app\\data\\file.txt'

// ❌ NEVER do this
const filePath = `/home/user/${filename}`;

// ✅ Use path.join or resolve
const filePath = path.resolve('/home/user', filename);
```

**Common patterns:**

**1. File relative to current module:**
```javascript
// Good: Relative to current file
const dataPath = path.join(__dirname, 'data', 'config.json');

// Bad: Relative to working directory
const dataPath = path.join('data', 'config.json');  // Breaks if cwd changes!
```

**2. User-provided paths:**
```javascript
// User provides path (might be relative or absolute)
const userPath = process.argv[2];

// Convert to absolute
const absolutePath = path.resolve(userPath);

// Now safe to use
fs.readFile(absolutePath, callback);
```

**3. Building nested paths:**
```javascript
// Join: For known structure
const logPath = path.join(__dirname, '..', 'logs', 'app.log');

// Resolve: For dynamic paths
const configPath = path.resolve(
  process.env.CONFIG_DIR || './config',
  `${process.env.NODE_ENV}.json`
);
```

**Quick decision guide:**
- Need absolute path? → Use `resolve()`
- Combining known segments? → Use `join()`
- Working with `__dirname`? → Use `join()` (already absolute)
- Processing user input? → Use `resolve()` (ensure absolute)

**Key differences summary:**

| Aspect | join() | resolve() |
|--------|--------|-----------|
| Output | Relative or absolute | Always absolute |
| Uses cwd | No | Yes |
| Multiple absolutes | Joins all | Rightmost wins |
| Think of it as | String concatenation | cd commands |
x??

---

#### URL Parsing with WHATWG URL API
The WHATWG URL API is the modern standard for parsing and manipulating URLs in Node.js. It replaced the legacy `url.parse()` method and provides a more robust, spec-compliant API.

Understanding URL parsing is essential for web applications, API clients, and any network programming.

```javascript
// Create URL object
const myUrl = new URL('https://user:pass@example.com:8080/path?query=value#hash');

// Access components
console.log(myUrl.protocol);   // 'https:'
console.log(myUrl.hostname);   // 'example.com'
console.log(myUrl.port);       // '8080'
console.log(myUrl.pathname);   // '/path'
console.log(myUrl.search);     // '?query=value'
console.log(myUrl.hash);       // '#hash'
console.log(myUrl.username);   // 'user'
console.log(myUrl.password);   // 'pass'
console.log(myUrl.origin);     // 'https://example.com:8080'
console.log(myUrl.href);       // Full URL

// Modify URL
myUrl.pathname = '/new/path';
myUrl.searchParams.set('foo', 'bar');
console.log(myUrl.href);
// 'https://user:pass@example.com:8080/new/path?query=value&foo=bar#hash'

// Parse query parameters
const params = myUrl.searchParams;
console.log(params.get('query'));  // 'value'
console.log(params.has('foo'));    // true
params.set('new', '123');
params.delete('query');

// Relative URL resolution
const base = new URL('https://example.com/foo/');
const relative = new URL('./bar/baz.html', base);
console.log(relative.href);
// 'https://example.com/foo/bar/baz.html'
```

Reference: `doc/api/url.md`

:p What are the key components of a URL and how do you parse and manipulate them with the WHATWG URL API?
??x
**URL components:**

```
https://user:pass@example.com:8080/path/to/page?query=value&foo=bar#section

└──┬──┘ └───┬───┘ └─────┬──────┘└┬┘ └─────┬─────┘ └───────┬────────┘ └──┬──┘
protocol  auth      hostname    port   pathname        search         hash

└────────────────┬────────────────┘
            origin
```

**Creating URL:**

```javascript
// From string
const url = new URL('https://example.com/path?query=value');

// With base URL (for relative URLs)
const base = 'https://example.com/foo/';
const url = new URL('../bar/baz.html', base);
// Result: https://example.com/bar/baz.html

// Safe parsing (returns null instead of throwing)
const url = URL.parse('https://example.com');  // URL object
const invalid = URL.parse('not a url');        // null

// Check if valid (doesn't throw)
if (URL.canParse('https://example.com')) {
  // Valid URL
}
```

**Reading URL components:**

```javascript
const url = new URL('https://user:pass@example.com:8080/path/to/page?query=value#section');

// Protocol
url.protocol;    // 'https:' (includes colon)

// Authentication
url.username;    // 'user'
url.password;    // 'pass'

// Host
url.hostname;    // 'example.com' (without port)
url.host;        // 'example.com:8080' (with port)
url.port;        // '8080' (string, or '' if default)

// Path
url.pathname;    // '/path/to/page'

// Query string
url.search;      // '?query=value' (includes ?)
url.searchParams; // URLSearchParams object

// Fragment
url.hash;        // '#section' (includes #)

// Computed
url.origin;      // 'https://example.com:8080' (protocol + host)
url.href;        // Full URL as string
```

**Modifying URL:**

```javascript
const url = new URL('https://example.com/path');

// Change protocol
url.protocol = 'http:';  // now http://example.com/path

// Change hostname
url.hostname = 'newsite.com';

// Change port
url.port = '3000';

// Change path
url.pathname = '/new/path';

// Get modified URL
console.log(url.href);  // 'http://newsite.com:3000/new/path'
```

**Query parameters (URLSearchParams):**

```javascript
const url = new URL('https://example.com/path?foo=bar&baz=qux');
const params = url.searchParams;

// Get parameter
params.get('foo');       // 'bar'
params.get('missing');   // null

// Check existence
params.has('foo');       // true
params.has('missing');   // false

// Set parameter
params.set('new', 'value');    // Adds or replaces
params.append('foo', 'bar2');  // Adds another 'foo'

// Delete parameter
params.delete('baz');

// Get all values for key
params.getAll('foo');    // ['bar', 'bar2']

// Iterate
for (const [key, value] of params) {
  console.log(`${key}=${value}`);
}

// Convert to object
const obj = Object.fromEntries(params);
// { foo: 'bar2', new: 'value' } (note: loses duplicates)

// Sort parameters (useful for caching)
params.sort();

// Convert to string
params.toString();  // 'foo=bar&foo=bar2&new=value'
```

**Creating URLSearchParams:**

```javascript
// From string
const params = new URLSearchParams('foo=bar&baz=qux');

// From object
const params = new URLSearchParams({ foo: 'bar', baz: 'qux' });

// From array of pairs
const params = new URLSearchParams([
  ['foo', 'bar'],
  ['baz', 'qux']
]);

// From existing URL
const url = new URL('https://example.com?foo=bar');
const params = url.searchParams;
```

**Relative URL resolution:**

```javascript
const base = new URL('https://example.com/foo/bar/page.html');

new URL('page2.html', base).href;
// 'https://example.com/foo/bar/page2.html'

new URL('./page2.html', base).href;
// 'https://example.com/foo/bar/page2.html'

new URL('../page2.html', base).href;
// 'https://example.com/foo/page2.html'

new URL('/absolute', base).href;
// 'https://example.com/absolute'

new URL('//other.com/path', base).href;
// 'https://other.com/path' (inherits protocol)
```

**URL validation:**

```javascript
// Throws on invalid URL
try {
  new URL('not a url');
} catch (err) {
  console.error('Invalid URL');
}

// Safe parsing (Node 19+)
const url = URL.parse('maybe-invalid');
if (url) {
  // Valid
} else {
  // Invalid
}

// Check without parsing
if (URL.canParse('https://example.com')) {
  // Valid
}
```

**Common patterns:**

**1. Add/modify query parameters:**
```javascript
const url = new URL('https://api.example.com/users');
url.searchParams.set('page', '2');
url.searchParams.set('limit', '50');
url.searchParams.set('sort', 'name');

console.log(url.href);
// 'https://api.example.com/users?page=2&limit=50&sort=name'
```

**2. Parse API response URL:**
```javascript
const response = await fetch(url);
const responseUrl = new URL(response.url);

// Check if redirected
if (responseUrl.href !== url.href) {
  console.log('Redirected to:', responseUrl.href);
}
```

**3. Build API URL:**
```javascript
function buildApiUrl(endpoint, params) {
  const url = new URL(endpoint, 'https://api.example.com');

  for (const [key, value] of Object.entries(params)) {
    if (value !== undefined && value !== null) {
      url.searchParams.set(key, value);
    }
  }

  return url.href;
}

const url = buildApiUrl('/users', {
  page: 2,
  limit: 50,
  active: true
});
// 'https://api.example.com/users?page=2&limit=50&active=true'
```

**4. Parse and normalize URL:**
```javascript
function normalizeUrl(urlString) {
  const url = URL.parse(urlString);
  if (!url) return null;

  // Remove default ports
  if ((url.protocol === 'http:' && url.port === '80') ||
      (url.protocol === 'https:' && url.port === '443')) {
    url.port = '';
  }

  // Sort query parameters
  url.searchParams.sort();

  // Remove fragment
  url.hash = '';

  return url.href;
}

normalizeUrl('https://example.com:443/path?b=2&a=1#frag');
// 'https://example.com/path?a=1&b=2'
```

**WHATWG URL vs Legacy url.parse():**

```javascript
// ❌ Legacy (deprecated)
const url = require('url');
const parsed = url.parse('https://example.com/path?query=value');
// Returns plain object, inconsistent behavior

// ✅ Modern WHATWG URL
const myUrl = new URL('https://example.com/path?query=value');
// Returns URL object, spec-compliant
```

**Common mistakes:**

```javascript
// ❌ Protocol without colon
url.protocol = 'https';  // Wrong

// ✅ Protocol with colon
url.protocol = 'https:';  // Correct

// ❌ Pathname without leading slash
url.pathname = 'path/to/page';  // Becomes '/path/to/page' anyway

// ✅ Pathname with leading slash
url.pathname = '/path/to/page';

// ❌ Setting search with ?
url.search = '?foo=bar';  // Extra ?

// ✅ Setting search without ?
url.search = 'foo=bar';  // Or use searchParams
```

**File URLs:**

```javascript
// Convert filesystem path to file:// URL
const { pathToFileURL } = require('url');
const fileUrl = pathToFileURL('/path/to/file.txt');
console.log(fileUrl.href);  // 'file:///path/to/file.txt'

// Convert file:// URL to filesystem path
const { fileURLToPath } = require('url');
const filePath = fileURLToPath('file:///path/to/file.txt');
console.log(filePath);  // '/path/to/file.txt'
```

**Key takeaways:**
- Use WHATWG URL API (not legacy url.parse)
- URL object provides clean component access
- searchParams for query string manipulation
- Supports relative URL resolution
- Always validate URLs before using
- Protocol and hash include delimiters (: and #)
x??
