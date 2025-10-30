# File System API Flashcards

#### Three Async Patterns in fs Module
Node.js provides three different ways to perform file system operations: synchronous (blocking), callback-based asynchronous, and Promise-based asynchronous. Understanding when to use each pattern is crucial for performance and code readability.

The synchronous methods are easy to use but block the entire event loop, making them unsuitable for production servers. Callbacks are the traditional Node.js pattern but can lead to callback hell. Promises with async/await provide the best of both worlds.

```javascript
// 1. Synchronous (blocking)
const fs = require('fs');
const data = fs.readFileSync('/path/to/file', 'utf8');
console.log(data);  // Blocks until file is read

// 2. Callback-based (traditional async)
fs.readFile('/path/to/file', 'utf8', (err, data) => {
  if (err) throw err;
  console.log(data);
});

// 3. Promise-based (modern async)
const fs = require('fs').promises;
const data = await fs.readFile('/path/to/file', 'utf8');
console.log(data);
```

Reference: `doc/api/fs.md`

###  Async Patterns for File Operations

:p What are the three async patterns for file operations in Node.js and when should each be used?
??x
**Three patterns:**

1. **Synchronous (Blocking):**
```javascript
const data = fs.readFileSync('file.txt', 'utf8');
```
- **Blocks event loop** until complete
- **Use when:** CLI tools, initialization code, config loading at startup
- **Don't use:** HTTP servers, long-running processes, any concurrent operations
- **Performance:** Simplest but worst for servers

2. **Callback-based (Traditional Async):**
```javascript
fs.readFile('file.txt', 'utf8', (err, data) => {
  if (err) { /* handle error */ }
  // use data
});
```
- **Non-blocking**, event loop continues
- **Use when:** Working with legacy code, simple one-off operations
- **Drawback:** Callback hell with nested operations
- **Performance:** Good, but harder to read

3. **Promise-based (Modern Async):**
```javascript
const fs = require('fs').promises;
const data = await fs.readFile('file.txt', 'utf8');
```
- **Non-blocking** with clean syntax
- **Use when:** New code, complex flows, multiple sequential operations
- **Benefits:** Easy error handling with try/catch, readable code
- **Performance:** Best combination of performance and maintainability

**When to use each:**
- **Startup/CLI:** Synchronous OK
- **Server/Production:** Promises preferred, callbacks acceptable
- **Never in server:** Synchronous methods in request handlers

**Example comparison:**
```javascript
// Callback hell (hard to read)
fs.readFile('1.txt', (err1, data1) => {
  fs.readFile('2.txt', (err2, data2) => {
    fs.writeFile('3.txt', data1 + data2, (err3) => {
      // Done
    });
  });
});

// Promise (clean)
try {
  const data1 = await fs.readFile('1.txt', 'utf8');
  const data2 = await fs.readFile('2.txt', 'utf8');
  await fs.writeFile('3.txt', data1 + data2);
} catch (err) {
  console.error(err);
}
```
x??

---

#### File System Flags
When opening files with `fs.open()` or creating write streams, you specify flags that control how the file is accessed. These flags determine whether you're reading, writing, appending, and whether the file must exist.

Choosing the wrong flag can lead to data loss (overwriting when you meant to append) or errors (trying to read a non-existent file).

```javascript
// Common flags
fs.open('file.txt', 'r', (err, fd) => {});   // Read, must exist
fs.open('file.txt', 'w', (err, fd) => {});   // Write, create/truncate
fs.open('file.txt', 'a', (err, fd) => {});   // Append, create if needed
fs.open('file.txt', 'r+', (err, fd) => {});  // Read+Write, must exist
fs.open('file.txt', 'w+', (err, fd) => {});  // Read+Write, create/truncate
fs.open('file.txt', 'a+', (err, fd) => {});  // Read+Append, create if needed

// With createWriteStream
fs.createWriteStream('log.txt', { flags: 'a' });  // Append mode
```

Reference: `doc/api/fs.md` (File system flags section)

:p What are the most common file system flags in Node.js and what does each do?
??x
**Common flags:**

**Read-only:**
- **'r'**: Read mode
  - File must exist (error if not)
  - Start at beginning
  - Cannot write

**Write modes:**
- **'w'**: Write mode
  - Creates file if doesn't exist
  - **Truncates (empties) if exists**
  - Cannot read
  - ⚠️ Dangerous: destroys existing content!

- **'a'**: Append mode
  - Creates file if doesn't exist
  - Preserves existing content
  - Writes go to end
  - Cannot read

**Read+Write modes:**
- **'r+'**: Read and write
  - File must exist
  - Can read and write at any position
  - Doesn't truncate

- **'w+'**: Read and write
  - Creates if doesn't exist
  - **Truncates if exists**
  - Can read and write
  - ⚠️ Dangerous: destroys existing content!

- **'a+'**: Read and append
  - Creates if doesn't exist
  - Preserves content
  - Writes go to end
  - Can read from anywhere

**Special flags:**
- **'x'**: Exclusive create
  - Fails if file exists
  - Used with 'w' or 'a': 'wx', 'ax'

**Common mistakes:**

```javascript
// WRONG: Overwrites entire log file!
fs.writeFile('app.log', newLog);  // Uses 'w' flag by default

// RIGHT: Appends to log file
fs.appendFile('app.log', newLog);  // Uses 'a' flag

// WRONG: Opens non-existent file for reading
fs.open('missing.txt', 'r', (err, fd) => {
  // err.code === 'ENOENT'
});

// RIGHT: Check existence or use 'a' to create
fs.open('file.txt', 'a+', (err, fd) => {
  // Creates if doesn't exist
});
```

**Memory aid:**
- **r** = read (must exist)
- **w** = write (wipes content)
- **a** = append (adds to end)
- **+** = also allows the other operation
x??

---

#### Streams vs readFile for Large Files
For small files, `readFile()` is convenient because it loads the entire file into memory. However, for large files (>10MB), this can cause memory problems. Streams process data in chunks, keeping memory usage constant.

Understanding when to use streams vs readFile is critical for building scalable applications.

```javascript
// readFile: Loads entire file into memory
const fs = require('fs').promises;
const data = await fs.readFile('large-file.txt');  // May use 1GB+ RAM!
console.log(data.length);

// Stream: Processes in chunks
const stream = fs.createReadStream('large-file.txt', {
  highWaterMark: 64 * 1024  // 64KB chunks
});

let totalBytes = 0;
for await (const chunk of stream) {
  totalBytes += chunk.length;  // Process chunk by chunk
  // Memory usage stays ~64KB
}
console.log(totalBytes);
```

Reference: `doc/api/fs.md` (Streams section)

:p When should you use streams instead of readFile/writeFile in Node.js?
??x
**Use streams when:**

1. **Large files (>10MB):**
```javascript
// BAD: Loads 1GB file into memory
const bigFile = await fs.readFile('movie.mp4');  // 1GB in RAM!
response.send(bigFile);

// GOOD: Streams with constant memory
const stream = fs.createReadStream('movie.mp4');
stream.pipe(response);  // ~64KB in RAM
```

2. **Processing data incrementally:**
```javascript
// Parse CSV line by line without loading entire file
const stream = fs.createReadStream('huge-data.csv');
stream
  .pipe(csvParser())
  .on('data', row => processRow(row))  // Process each row
  .on('end', () => console.log('Done'));
```

3. **Network transfers:**
```javascript
// Upload file to HTTP endpoint
const fileStream = fs.createReadStream('upload.zip');
fileStream.pipe(http.request(options));
```

4. **Concurrent read/write:**
```javascript
// Copy file efficiently
fs.createReadStream('source.txt')
  .pipe(fs.createWriteStream('dest.txt'));
```

**Use readFile/writeFile when:**

1. **Small files (<10MB):**
```javascript
// Config files, JSON, small text files
const config = JSON.parse(await fs.readFile('config.json', 'utf8'));
```

2. **Need entire content in memory:**
```javascript
// Need to parse/analyze complete content
const html = await fs.readFile('template.html', 'utf8');
const rendered = html.replace('{{title}}', title);
```

3. **Atomic writes:**
```javascript
// Ensure entire file written or none
await fs.writeFile('data.json', JSON.stringify(data));
```

**Performance comparison (1GB file):**

```javascript
// readFile: 1GB RAM, fast read
const data = await fs.readFile('1gb.txt');
// Memory: 1GB
// Time: ~500ms

// Stream: ~64KB RAM, similar speed
const stream = fs.createReadStream('1gb.txt');
for await (const chunk of stream) {
  process(chunk);
}
// Memory: 64KB
// Time: ~600ms
```

**Memory formula:**
- **readFile**: Memory = File Size
- **Stream**: Memory = highWaterMark (default 64KB)

**Rule of thumb:**
- File < 10MB: Use readFile (simpler)
- File > 10MB: Use streams (scalable)
- File > 100MB: Must use streams
- Concurrent users: Always use streams (10 users × 50MB = 500MB!)

**Gotcha:**
```javascript
// Creates array in memory - defeats streaming!
const chunks = [];
for await (const chunk of stream) {
  chunks.push(chunk);  // BAD: Accumulating in memory
}
const data = Buffer.concat(chunks);  // Now same as readFile!

// Correct streaming
for await (const chunk of stream) {
  process(chunk);  // Process and discard
}
```
x??

---

#### Path Resolution with require vs fs
One of the most common mistakes in Node.js is confusion about how paths are resolved. `require()` resolves relative paths from the current file's location, while `fs` methods resolve from `process.cwd()` (current working directory).

This difference causes bugs when applications are run from different directories.

```javascript
// File structure:
// /app/server.js
// /app/config/settings.json

// In /app/server.js:

// require() - relative to current file
const settings = require('./config/settings.json');  // ✅ Works

// fs - relative to process.cwd()
fs.readFile('./config/settings.json', (err, data) => {
  // ✅ Works if running: node server.js (cwd=/app)
  // ❌ Fails if running: node app/server.js (cwd=/)
});

// Solution: Use __dirname
const path = require('path');
const configPath = path.join(__dirname, 'config', 'settings.json');
fs.readFile(configPath, callback);  // ✅ Always works
```

Reference: `doc/api/fs.md`, `doc/api/modules.md`

:p How do relative paths differ between require() and fs methods in Node.js?
??x
**Key difference:**

**require() resolves relative to file location:**
```javascript
// File: /home/user/app/lib/utils.js
require('./config.json');
// Resolves to: /home/user/app/lib/config.json
// Relative to utils.js location
```

**fs resolves relative to process.cwd():**
```javascript
// File: /home/user/app/lib/utils.js
fs.readFile('./config.json', callback);
// Resolves to: [process.cwd()]/config.json
// Depends on where you ran `node` from!
```

**Problem scenario:**
```
/home/user/app/
  ├── server.js
  └── data/
      └── config.json
```

```javascript
// In server.js:
fs.readFile('./data/config.json', callback);

// Run from /home/user/app:
$ node server.js
// ✅ Works! cwd=/home/user/app, resolves to /home/user/app/data/config.json

// Run from /home/user:
$ node app/server.js
// ❌ Fails! cwd=/home/user, resolves to /home/user/data/config.json (doesn't exist)
```

**Solutions:**

**1. Use __dirname (best for file-relative paths):**
```javascript
const path = require('path');
const configPath = path.join(__dirname, 'data', 'config.json');
fs.readFile(configPath, callback);
// __dirname = directory of current file
// Always resolves correctly regardless of cwd
```

**2. Use process.cwd() explicitly (best for user-relative paths):**
```javascript
const configPath = path.join(process.cwd(), 'data', 'config.json');
fs.readFile(configPath, callback);
// Explicitly shows intent to use working directory
```

**3. Use absolute paths:**
```javascript
fs.readFile('/home/user/app/data/config.json', callback);
// Always works but not portable
```

**When to use each:**

**Use __dirname for:**
- Application assets (templates, static files)
- Configuration bundled with app
- Default files shipped with your package

```javascript
// Load template bundled with app
const template = path.join(__dirname, 'templates', 'email.html');
```

**Use process.cwd() for:**
- User-specified files
- Output files
- Files relative to where user runs command

```javascript
// Process file in user's current directory
const inputFile = path.join(process.cwd(), 'input.txt');
```

**Memory aid:**
- **require()**: "Where is my file?"
- **fs**: "Where is the user?"

**Debugging tip:**
```javascript
console.log('__dirname:', __dirname);
console.log('process.cwd():', process.cwd());
console.log('Resolved:', path.resolve('./file.txt'));
```
x??

---

#### File Descriptors and Manual Control
File descriptors (fd) are low-level integer handles to open files. While high-level methods like `readFile()` and `createReadStream()` are easier, understanding file descriptors gives you fine-grained control over file operations.

File descriptors must be explicitly closed to avoid resource leaks.

```javascript
const fs = require('fs');

// Low-level: Manual file descriptor management
fs.open('file.txt', 'r', (err, fd) => {
  if (err) throw err;

  const buffer = Buffer.alloc(1024);

  // Read 1024 bytes from position 0
  fs.read(fd, buffer, 0, 1024, 0, (err, bytesRead, buffer) => {
    if (err) throw err;
    console.log(buffer.toString('utf8', 0, bytesRead));

    // MUST close manually!
    fs.close(fd, (err) => {
      if (err) throw err;
    });
  });
});

// High-level: Automatic management
fs.readFile('file.txt', 'utf8', (err, data) => {
  // File descriptor opened and closed automatically
  console.log(data);
});
```

Reference: `doc/api/fs.md` (File descriptors section)

:p What is a file descriptor in Node.js and when would you use manual fd management instead of high-level methods?
??x
**File descriptor (fd):**
A small integer (e.g., 3, 4, 5) that uniquely identifies an open file in the process. It's the operating system's handle to the file.

**Standard file descriptors:**
- 0: stdin
- 1: stdout
- 2: stderr
- 3+: Your opened files

**Manual fd management:**

```javascript
// Open file (get fd)
fs.open('file.txt', 'r+', (err, fd) => {
  if (err) throw err;
  // fd is a number, e.g., 3

  // Read from specific position
  const buffer = Buffer.alloc(100);
  fs.read(fd, buffer, 0, 100, 50, (err, bytesRead) => {
    // Read 100 bytes starting at position 50 in file
  });

  // Write to specific position
  fs.write(fd, 'data', 0, 'utf8', 20, (err, written) => {
    // Write at position 20 in file
  });

  // MUST close!
  fs.close(fd, (err) => {});
});
```

**When to use manual fd management:**

**1. Random access (reading/writing specific positions):**
```javascript
// Update specific bytes in binary file
fs.open('data.bin', 'r+', (err, fd) => {
  // Write 4 bytes at position 1000
  const buf = Buffer.from([0x00, 0xFF, 0x00, 0xFF]);
  fs.write(fd, buf, 0, 4, 1000, (err) => {
    fs.close(fd, err => {});
  });
});
```

**2. Multiple operations on same file:**
```javascript
// Read header, then read body based on header
fs.open('file.bin', 'r', (err, fd) => {
  // Read header
  const header = Buffer.alloc(100);
  fs.read(fd, header, 0, 100, 0, (err) => {
    const dataOffset = header.readUInt32LE(0);

    // Use header info to read data
    const data = Buffer.alloc(1000);
    fs.read(fd, data, 0, 1000, dataOffset, (err) => {
      fs.close(fd, err => {});
    });
  });
});
```

**3. Keeping file open for multiple reads:**
```javascript
// Keep file open across async operations
const fd = await fs.open('file.txt', 'r');
for (let i = 0; i < 10; i++) {
  const buffer = Buffer.alloc(100);
  await fd.read(buffer, 0, 100, i * 100);
  await processChunk(buffer);
}
await fd.close();
```

**4. Avoiding race conditions:**
```javascript
// Ensure same file across operations
const fd = await fs.open('counter.txt', 'r+');
const current = await readNumber(fd);
await writeNumber(fd, current + 1);
await fd.close();
// File can't be replaced between read and write
```

**When NOT to use manual fd:**

**Use high-level methods for:**
- Reading entire file: `readFile()`
- Writing entire file: `writeFile()`
- Streaming: `createReadStream()` / `createWriteStream()`
- Appending: `appendFile()`

**Resource leak danger:**
```javascript
// BAD: Never closed!
fs.open('file.txt', 'r', (err, fd) => {
  if (err) throw err;
  doSomething(fd);
  // Forgot fs.close(fd)!
  // File descriptor leaks, eventually hits OS limit
});

// GOOD: Always close in finally
const fd = await fs.open('file.txt', 'r');
try {
  await doSomething(fd);
} finally {
  await fd.close();  // Guaranteed cleanup
}
```

**Promise-based API (cleaner):**
```javascript
const fsPromises = require('fs').promises;

// FileHandle automatically closes
const fh = await fsPromises.open('file.txt', 'r');
try {
  const buffer = Buffer.alloc(1024);
  await fh.read(buffer, 0, 1024, 0);
} finally {
  await fh.close();
}
```

**Key takeaway:**
- High-level methods (readFile, writeFile): Simple, automatic management
- File descriptors: Fine control, manual management, must close explicitly
- Use fds only when you need random access or multiple operations on same file
x??

---

#### fs.stat for File Metadata
The `fs.stat()` method retrieves detailed metadata about a file or directory without reading its contents. This is essential for checking file existence, size, type, and permissions before performing operations.

Understanding Stats objects helps avoid errors and build robust file handling code.

```javascript
const fs = require('fs').promises;

const stats = await fs.stat('file.txt');

console.log(stats.isFile());         // true if regular file
console.log(stats.isDirectory());    // true if directory
console.log(stats.isSymbolicLink()); // true if symlink (lstat only)
console.log(stats.size);             // File size in bytes
console.log(stats.mtime);            // Modified time (Date)
console.log(stats.birthtime);        // Created time (Date)
console.log(stats.mode);             // Permissions as number

// Check if file is readable
const canRead = !!(stats.mode & fs.constants.R_OK);

// Compare modification times
const file1Stats = await fs.stat('file1.txt');
const file2Stats = await fs.stat('file2.txt');
if (file1Stats.mtime > file2Stats.mtime) {
  console.log('file1 is newer');
}
```

Reference: `doc/api/fs.md` (fs.Stats class)

:p What information does fs.stat() provide and what are common use cases?
??x
**fs.stat() returns Stats object with:**

**File type checks:**
```javascript
stats.isFile()           // Regular file
stats.isDirectory()      // Directory
stats.isSymbolicLink()   // Symbolic link (lstat only)
stats.isBlockDevice()    // Block device
stats.isCharacterDevice() // Character device (e.g., /dev/null)
stats.isFIFO()           // Named pipe
stats.isSocket()         // Unix socket
```

**Size and timestamps:**
```javascript
stats.size              // File size in bytes
stats.atime             // Last access time (Date)
stats.mtime             // Last modification time (Date)
stats.ctime             // Last status change time (Date)
stats.birthtime         // Creation time (Date) - not reliable on all systems
stats.atimeMs           // Access time in milliseconds since epoch
stats.mtimeMs           // Modification time in milliseconds
```

**Permissions:**
```javascript
stats.mode              // File permissions and type as number
stats.uid               // User ID of owner
stats.gid               // Group ID of owner
```

**Common use cases:**

**1. Check file existence:**
```javascript
// Better than fs.exists() which is deprecated
try {
  await fs.stat('file.txt');
  console.log('File exists');
} catch (err) {
  if (err.code === 'ENOENT') {
    console.log('File does not exist');
  }
}
```

**2. Check if path is file or directory:**
```javascript
const stats = await fs.stat(somePath);
if (stats.isDirectory()) {
  const files = await fs.readdir(somePath);
} else if (stats.isFile()) {
  const content = await fs.readFile(somePath);
}
```

**3. Avoid reading large files:**
```javascript
const stats = await fs.stat('movie.mp4');
if (stats.size > 100 * 1024 * 1024) {  // 100MB
  console.log('File too large, use streaming');
  const stream = fs.createReadStream('movie.mp4');
} else {
  const data = await fs.readFile('movie.mp4');
}
```

**4. Check if file was modified:**
```javascript
// Cache key based on modification time
const stats = await fs.stat('data.json');
const cacheKey = `data-${stats.mtimeMs}`;

if (cache.has(cacheKey)) {
  return cache.get(cacheKey);
}
```

**5. Compare file ages:**
```javascript
// Find most recently modified file
const stats1 = await fs.stat('file1.txt');
const stats2 = await fs.stat('file2.txt');

const newer = stats1.mtime > stats2.mtime ? 'file1.txt' : 'file2.txt';
console.log(`${newer} is more recent`);
```

**6. Check permissions:**
```javascript
const stats = await fs.stat('script.sh');

// Check if executable (mode & 0o111)
const isExecutable = (stats.mode & 0o111) !== 0;

// Check if writable by owner (mode & 0o200)
const isWritable = (stats.mode & 0o200) !== 0;
```

**stat vs lstat vs fstat:**

```javascript
// stat: Follows symlinks
const stats = await fs.stat('link.txt');
stats.isSymbolicLink();  // false (followed link)

// lstat: Does NOT follow symlinks
const lstats = await fs.lstat('link.txt');
lstats.isSymbolicLink();  // true (link itself)

// fstat: Use file descriptor
const fd = await fs.open('file.txt', 'r');
const fstats = await fs.fstat(fd);
await fd.close();
```

**Performance note:**
```javascript
// stat is a syscall - relatively expensive
// Don't stat in tight loops

// BAD: stat for every file
for (const file of files) {
  const stats = await fs.stat(file);  // Many syscalls
  if (stats.size > 1000) process(file);
}

// BETTER: Use readdir with options
const entries = await fs.readdir('.', { withFileTypes: true });
for (const entry of entries) {
  if (entry.isFile()) {
    // Already know it's a file, no stat needed
  }
}
```

**Common gotchas:**
- `birthtime` is unreliable on Linux (may show ctime instead)
- `atime` may be disabled on some filesystems for performance
- `ctime` is status change, not creation time (confused often)
- Timestamps are Date objects, not strings
x??
