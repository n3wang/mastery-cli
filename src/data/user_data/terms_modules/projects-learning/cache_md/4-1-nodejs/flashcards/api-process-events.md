# Process and Events API Flashcards

#### Process Exit and Exit Codes
The `process.exit()` method terminates the Node.js process immediately. Exit codes communicate the result: 0 for success, non-zero for errors. Understanding the difference between `process.exit()` and `process.exitCode` is important for proper shutdown handling.

The 'exit' event provides a synchronous hook before the process terminates, but it's too late for asynchronous operations.

```javascript
// Exit immediately with code
process.exit(0);   // Success
process.exit(1);   // General error
process.exit(2);   // Misuse of shell command
process.exit(130); // Ctrl+C (SIGINT)

// Set exit code without exiting (preferred)
process.exitCode = 1;
// Process exits naturally with code 1

// Exit event (synchronous only)
process.on('exit', (code) => {
  console.log(`Exiting with code: ${code}`);
  // Cannot do async work here!
  // fs.writeFile() would be ignored
});

// beforeExit: Can do async work
process.on('beforeExit', (code) => {
  console.log('Before exit:', code);
  // Can schedule async operations
  setTimeout(() => {
    console.log('This will run');
  }, 100);
});
```

Reference: `doc/api/process.md`

:p What is the difference between process.exit(), process.exitCode, and the 'exit' event?
??x
**Three ways to exit:**

**1. process.exit([code]) - Immediate termination:**
```javascript
console.log('Starting');
process.exit(0);
console.log('Never runs');  // ❌ Skipped
```
- **Immediately** terminates process
- Pending I/O operations are abandoned
- 'exit' event fires (synchronous only)
- Use when: Fatal error, must stop now

**2. process.exitCode - Natural termination:**
```javascript
process.exitCode = 1;
console.log('Continues running');  // ✅ Runs
// Process exits naturally when event loop empty
```
- **Sets** exit code but doesn't exit
- All pending operations complete
- Process exits when event loop has no work
- Use when: Want to signal error but finish work

**3. 'exit' event - Cleanup hook:**
```javascript
process.on('exit', (code) => {
  // Last chance for cleanup
  console.log(`Process exiting with code ${code}`);

  // ❌ Cannot do async work
  fs.writeFile('log.txt', 'exit', callback);  // Ignored!
  setTimeout(() => {}, 100);  // Ignored!

  // ✅ Can do sync work
  fs.writeFileSync('log.txt', 'exit');  // Works
});
```
- Fires **after** exit decided
- **Must be synchronous** - no async operations
- Cannot prevent exit
- Use for: Final logging, cleanup

**Comparison:**

```javascript
// Scenario 1: Immediate exit
process.on('exit', code => {
  console.log('Exit event:', code);
});

console.log('1');
process.exit(42);
console.log('2');  // Never runs

// Output:
// 1
// Exit event: 42
// [process exits with code 42]

// Scenario 2: Natural exit
process.exitCode = 42;
console.log('1');
console.log('2');  // Runs

process.on('beforeExit', code => {
  console.log('Before exit:', code);
  // Can schedule more work here
});

process.on('exit', code => {
  console.log('Exit:', code);
});

// Output:
// 1
// 2
// Before exit: 42
// Exit: 42
// [process exits with code 42]
```

**beforeExit vs exit:**

```javascript
// beforeExit: Can do async work
process.on('beforeExit', async (code) => {
  console.log('beforeExit:', code);

  // ✅ Can do async operations
  await fs.promises.writeFile('log.txt', 'cleanup');
  console.log('Cleanup done');

  // This keeps event loop alive, so 'exit' doesn't fire yet
});

// exit: Must be sync
process.on('exit', (code) => {
  console.log('exit:', code);

  // ❌ Async operations ignored
  fs.writeFile('log.txt', 'exit', () => {
    console.log('Never runs');
  });

  // ✅ Sync operations work
  try {
    fs.writeFileSync('log.txt', 'exit');
  } catch (err) {}
});
```

**Exit codes convention:**

```javascript
process.exitCode = 0;    // Success
process.exitCode = 1;    // General error
process.exitCode = 2;    // Misuse of command
process.exitCode = 126;  // Command can't execute
process.exitCode = 127;  // Command not found
process.exitCode = 128;  // Invalid exit code
process.exitCode = 130;  // Terminated by Ctrl+C (SIGINT)
process.exitCode = 137;  // Killed by SIGKILL
```

**Common patterns:**

```javascript
// Pattern 1: Graceful shutdown
async function shutdown() {
  console.log('Shutting down...');

  // Close resources
  await server.close();
  await db.close();

  console.log('Cleanup complete');
  process.exitCode = 0;
  // Exit naturally
}

process.on('SIGTERM', shutdown);
process.on('SIGINT', shutdown);

// Pattern 2: Error handling
process.on('uncaughtException', (err) => {
  console.error('Uncaught exception:', err);
  process.exitCode = 1;

  // Try to shut down gracefully
  server.close(() => {
    // process.exit(1);  // Force if needed
  });
});

// Pattern 3: Forced exit with timeout
function forceExit(timeout = 5000) {
  setTimeout(() => {
    console.error('Forced exit after timeout');
    process.exit(1);
  }, timeout).unref();  // Don't keep process alive
}
```

**Key differences:**
- `process.exit()`: Immediate, abandons pending work
- `process.exitCode`: Deferred, completes pending work
- `'exit'` event: Synchronous only, cleanup hook
- `'beforeExit'`: Can do async work, extends lifetime

**Best practice:** Use `process.exitCode` instead of `process.exit()` when possible to ensure clean shutdown.
x??

---

#### Process Environment Variables
Environment variables provide configuration to applications without hardcoding values. The `process.env` object gives access to all environment variables as strings.

Understanding how to read and set environment variables is essential for application configuration and deployment.

```javascript
// Read environment variables
console.log(process.env.NODE_ENV);     // 'development' or 'production'
console.log(process.env.PORT);         // '3000'
console.log(process.env.DATABASE_URL); // 'postgres://...'

// Set environment variables (affects current process only)
process.env.MY_VAR = 'value';

// Check existence
if ('API_KEY' in process.env) {
  const apiKey = process.env.API_KEY;
}

// Provide defaults
const port = process.env.PORT || 3000;
const env = process.env.NODE_ENV || 'development';

// Parse values (all env vars are strings!)
const port = parseInt(process.env.PORT || '3000', 10);
const debug = process.env.DEBUG === 'true';

// Delete environment variable
delete process.env.TEMP_VAR;
```

Reference: `doc/api/process.md` (process.env section)

:p How do you work with environment variables in Node.js and what are important gotchas?
??x
**Reading environment variables:**

```javascript
// Access via process.env
const port = process.env.PORT;
const nodeEnv = process.env.NODE_ENV;
const dbUrl = process.env.DATABASE_URL;

// Check if defined
if (process.env.API_KEY) {
  // Use API_KEY
}

// Better: Check with 'in' operator
if ('API_KEY' in process.env) {
  // Handles API_KEY='' correctly
}

// Provide default values
const port = process.env.PORT || 3000;
const host = process.env.HOST || 'localhost';
```

**Key gotcha: All values are strings!**

```javascript
// Environment: PORT=3000

// WRONG: Type assumption
const port = process.env.PORT;
if (port > 2000) {  // ❌ String comparison! '3000' > 2000 is false
  // ...
}

// RIGHT: Parse numbers
const port = parseInt(process.env.PORT, 10);
if (port > 2000) {  // ✅ Numeric comparison
  // ...
}

// WRONG: Boolean assumption
// Environment: DEBUG=false
if (process.env.DEBUG) {  // ❌ String 'false' is truthy!
  console.log('Debug mode');  // Always runs!
}

// RIGHT: Parse booleans
const debug = process.env.DEBUG === 'true';
if (debug) {  // ✅ Correct boolean check
  console.log('Debug mode');
}

// Better: Handle various truthy values
function parseBool(value) {
  return value === 'true' || value === '1' || value === 'yes';
}
const debug = parseBool(process.env.DEBUG);
```

**Setting environment variables:**

**In code (affects current process only):**
```javascript
process.env.MY_VAR = 'value';
console.log(process.env.MY_VAR);  // 'value'

// Doesn't affect:
// - Parent process
// - Child processes spawned before setting
// - Other processes
```

**From command line:**
```bash
# Unix/Linux/Mac
PORT=3000 NODE_ENV=production node app.js

# Windows (cmd)
set PORT=3000
set NODE_ENV=production
node app.js

# Windows (PowerShell)
$env:PORT=3000
$env:NODE_ENV="production"
node app.js

# Cross-platform with cross-env package
npx cross-env PORT=3000 NODE_ENV=production node app.js
```

**Using .env files (with dotenv package):**

```bash
# .env file
PORT=3000
NODE_ENV=development
DATABASE_URL=postgres://localhost/mydb
API_KEY=secret123
```

```javascript
// Load .env file at startup
require('dotenv').config();

// Now available
console.log(process.env.PORT);         // '3000'
console.log(process.env.DATABASE_URL); // 'postgres://localhost/mydb'
```

**Common patterns:**

**1. Configuration object:**
```javascript
// config.js
module.exports = {
  port: parseInt(process.env.PORT || '3000', 10),
  env: process.env.NODE_ENV || 'development',
  database: {
    url: process.env.DATABASE_URL,
    maxConnections: parseInt(process.env.DB_MAX_CONN || '10', 10)
  },
  api: {
    key: process.env.API_KEY,
    secret: process.env.API_SECRET
  }
};

// Usage
const config = require('./config');
server.listen(config.port);
```

**2. Required environment variables:**
```javascript
function requireEnv(name) {
  const value = process.env[name];
  if (!value) {
    throw new Error(`Environment variable ${name} is required`);
  }
  return value;
}

const apiKey = requireEnv('API_KEY');
const dbUrl = requireEnv('DATABASE_URL');
```

**3. Type-safe parsing:**
```javascript
function getEnv(name, defaultValue, parser = String) {
  const value = process.env[name];

  if (value === undefined) {
    return defaultValue;
  }

  try {
    return parser(value);
  } catch (err) {
    console.warn(`Invalid value for ${name}: ${value}`);
    return defaultValue;
  }
}

// Usage
const port = getEnv('PORT', 3000, v => parseInt(v, 10));
const debug = getEnv('DEBUG', false, v => v === 'true');
const timeout = getEnv('TIMEOUT', 5000, parseInt);
```

**Security considerations:**

```javascript
// ❌ NEVER log environment variables in production
console.log(process.env);  // May contain secrets!

// ❌ NEVER commit .env files to git
// Add to .gitignore:
# .env
# .env.local
# .env.*.local

// ✅ Provide .env.example without secrets
// .env.example
PORT=3000
NODE_ENV=development
DATABASE_URL=postgres://localhost/mydb
API_KEY=your_api_key_here

// ✅ Sanitize logs
function sanitizeEnv(env) {
  const safe = { ...env };
  const secrets = ['API_KEY', 'API_SECRET', 'DATABASE_URL', 'PASSWORD'];

  for (const key of secrets) {
    if (key in safe) {
      safe[key] = '***';
    }
  }

  return safe;
}

console.log(sanitizeEnv(process.env));
```

**Deleting variables:**

```javascript
// Remove variable
delete process.env.TEMP_VAR;

// Check if removed
console.log(process.env.TEMP_VAR);  // undefined
```

**Iteration:**

```javascript
// List all environment variables
for (const [key, value] of Object.entries(process.env)) {
  console.log(`${key}=${value}`);
}

// Filter specific prefix
const dbVars = Object.keys(process.env)
  .filter(key => key.startsWith('DB_'))
  .reduce((obj, key) => {
    obj[key] = process.env[key];
    return obj;
  }, {});
```

**Platform differences:**

```javascript
// Unix: case-sensitive
process.env.PATH !== process.env.path  // Different variables

// Windows: case-insensitive
process.env.PATH === process.env.path  // Same variable

// Portable: use consistent casing
const PATH = process.env.PATH || process.env.path;
```

**Common environment variables:**

```javascript
process.env.NODE_ENV        // 'development', 'production', 'test'
process.env.PORT            // Server port
process.env.HOST            // Server host
process.env.DATABASE_URL    // Database connection string
process.env.LOG_LEVEL       // Logging verbosity
process.env.DEBUG           // Debug mode flag
process.env.NODE_OPTIONS    // Node.js runtime flags
process.env.TZ              // Timezone
process.env.LANG            // Locale
```

**Key points:**
- All values are strings (must parse)
- Changes only affect current process
- Use .env files for local development
- Never commit secrets to version control
- Validate required variables at startup
x??

---

#### Process Signals
Signals are notifications sent to a process to trigger specific behavior. Common signals include SIGTERM (graceful shutdown), SIGINT (Ctrl+C), and SIGKILL (force kill). Understanding signal handling is crucial for building robust servers.

Node.js allows you to listen for signals and perform cleanup before termination.

```javascript
// Listen for signals
process.on('SIGTERM', () => {
  console.log('SIGTERM received, shutting down gracefully');

  // Close server
  server.close(() => {
    console.log('Server closed');

    // Close database
    db.close(() => {
      console.log('Database closed');
      process.exit(0);
    });
  });

  // Force shutdown after timeout
  setTimeout(() => {
    console.error('Forced shutdown');
    process.exit(1);
  }, 10000);
});

process.on('SIGINT', () => {
  console.log('Ctrl+C pressed');
  process.exit(0);
});

// Send signal to process
process.kill(process.pid, 'SIGUSR1');  // Send to self
process.kill(otherPid, 'SIGTERM');      // Send to other process
```

Reference: `doc/api/process.md` (Signal events section)

:p What are the common signals in Node.js and how do you implement graceful shutdown?
??x
**Common signals:**

**1. SIGTERM (15) - Graceful termination:**
```javascript
process.on('SIGTERM', () => {
  console.log('SIGTERM: Graceful shutdown requested');
  // Clean up resources
  // Close connections
  // Save state
  process.exit(0);
});
```
- Sent by: `kill <pid>`, `systemd`, Docker stop
- Can be caught and handled
- Default: Terminates process
- Use for: Graceful shutdown

**2. SIGINT (2) - Interrupt (Ctrl+C):**
```javascript
process.on('SIGINT', () => {
  console.log('SIGINT: User pressed Ctrl+C');
  process.exit(0);
});
```
- Sent by: Ctrl+C in terminal
- Can be caught
- Default: Terminates process
- Use for: User-initiated shutdown

**3. SIGKILL (9) - Force kill:**
```bash
kill -9 <pid>
```
- **Cannot be caught** or ignored
- Immediately terminates process
- No cleanup possible
- Use for: Stuck processes (last resort)

**4. SIGHUP (1) - Hangup:**
```javascript
process.on('SIGHUP', () => {
  console.log('SIGHUP: Reload configuration');
  reloadConfig();
  // Don't exit - just reload
});
```
- Sent by: Terminal close, `kill -HUP`
- Can be caught
- Traditionally: Reload config without restart
- Use for: Hot reload

**5. SIGUSR1 / SIGUSR2 - User-defined:**
```javascript
process.on('SIGUSR1', () => {
  console.log('SIGUSR1: Toggle debug mode');
  debugMode = !debugMode;
});

process.on('SIGUSR2', () => {
  console.log('SIGUSR2: Dump state');
  console.log(JSON.stringify(state, null, 2));
});
```
- User-defined signals
- No default behavior
- Use for: Custom actions

**Graceful shutdown pattern:**

```javascript
// Basic pattern
function shutdown(signal) {
  console.log(`${signal} received`);

  // 1. Stop accepting new work
  server.close(() => {
    console.log('Server closed');

    // 2. Finish existing work
    // 3. Close resources
    db.close(() => {
      console.log('Database closed');
      process.exit(0);
    });
  });

  // 4. Force exit after timeout
  setTimeout(() => {
    console.error('Forced shutdown after timeout');
    process.exit(1);
  }, 10000);
}

process.on('SIGTERM', () => shutdown('SIGTERM'));
process.on('SIGINT', () => shutdown('SIGINT'));
```

**Production-ready graceful shutdown:**

```javascript
class GracefulShutdown {
  constructor(options = {}) {
    this.timeout = options.timeout || 30000;
    this.signals = options.signals || ['SIGTERM', 'SIGINT'];
    this.cleanupHandlers = [];
    this.shuttingDown = false;

    // Register signal handlers
    for (const signal of this.signals) {
      process.on(signal, () => this.shutdown(signal));
    }
  }

  // Register cleanup function
  onShutdown(handler) {
    this.cleanupHandlers.push(handler);
  }

  async shutdown(signal) {
    if (this.shuttingDown) {
      console.log('Shutdown already in progress');
      return;
    }

    this.shuttingDown = true;
    console.log(`${signal} received, starting graceful shutdown`);

    // Force exit after timeout
    const forceExitTimer = setTimeout(() => {
      console.error(`Forcing exit after ${this.timeout}ms`);
      process.exit(1);
    }, this.timeout);

    try {
      // Run all cleanup handlers
      for (const handler of this.cleanupHandlers) {
        await handler();
      }

      console.log('Graceful shutdown complete');
      clearTimeout(forceExitTimer);
      process.exit(0);
    } catch (err) {
      console.error('Error during shutdown:', err);
      clearTimeout(forceExitTimer);
      process.exit(1);
    }
  }
}

// Usage
const graceful = new GracefulShutdown({ timeout: 10000 });

graceful.onShutdown(async () => {
  console.log('Closing HTTP server');
  await new Promise(resolve => server.close(resolve));
});

graceful.onShutdown(async () => {
  console.log('Closing database');
  await db.close();
});

graceful.onShutdown(async () => {
  console.log('Flushing logs');
  await logger.flush();
});
```

**Sending signals:**

```javascript
// Send signal to current process
process.kill(process.pid, 'SIGUSR1');

// Send signal to other process
process.kill(otherPid, 'SIGTERM');

// Check if process exists (doesn't actually send signal)
try {
  process.kill(pid, 0);
  console.log('Process exists');
} catch (err) {
  console.log('Process does not exist');
}

// From command line
// kill <pid>           # SIGTERM (default)
// kill -9 <pid>        # SIGKILL
// kill -INT <pid>      # SIGINT
// kill -HUP <pid>      # SIGHUP
// kill -USR1 <pid>     # SIGUSR1
```

**Signals that cannot be caught:**

```javascript
// ❌ Cannot listen to SIGKILL or SIGSTOP
process.on('SIGKILL', () => {
  // Never called - SIGKILL can't be caught
});

// These will NOT work:
// kill -9 <pid>    (SIGKILL)
// kill -STOP <pid> (SIGSTOP)

// Use SIGTERM for graceful, SIGKILL as last resort
```

**Platform differences:**

```javascript
// Windows: Limited signal support
// Only SIGINT (Ctrl+C) and SIGTERM work reliably

if (process.platform === 'win32') {
  // Windows-specific handling
  process.on('SIGINT', shutdown);
  // SIGTERM may not work on Windows
} else {
  // Unix/Linux/Mac
  process.on('SIGTERM', shutdown);
  process.on('SIGINT', shutdown);
  process.on('SIGHUP', reloadConfig);
}
```

**Multiple signal handlers:**

```javascript
// Can attach multiple handlers
process.on('SIGTERM', () => {
  console.log('Handler 1');
});

process.on('SIGTERM', () => {
  console.log('Handler 2');
});

// Both will be called in order
// When SIGTERM received:
// Handler 1
// Handler 2
```

**Removing signal handlers:**

```javascript
const handler = () => {
  console.log('SIGTERM');
  process.exit(0);
};

process.on('SIGTERM', handler);

// Remove handler
process.removeListener('SIGTERM', handler);

// Or remove all
process.removeAllListeners('SIGTERM');
```

**Key points:**
- SIGTERM: Graceful shutdown (most common)
- SIGINT: User interrupt (Ctrl+C)
- SIGKILL: Cannot be caught (force kill)
- SIGHUP: Reload config (convention)
- Always implement graceful shutdown in production
- Set timeout to force exit if cleanup hangs
x??

---

#### EventEmitter Pattern
The EventEmitter is a fundamental pattern in Node.js. Many core modules (streams, HTTP, process) inherit from EventEmitter. Understanding how to use and create EventEmitters is essential.

EventEmitter provides a pub/sub pattern where emitters trigger events and listeners respond to them.

```javascript
const EventEmitter = require('events');

// Create emitter
class MyEmitter extends EventEmitter {}
const emitter = new MyEmitter();

// Add listener
emitter.on('event', (arg1, arg2) => {
  console.log('Event fired:', arg1, arg2);
});

// Add one-time listener
emitter.once('event', () => {
  console.log('Fired once');
});

// Emit event
emitter.emit('event', 'arg1', 'arg2');
// Output: Event fired: arg1 arg2
//         Fired once

emitter.emit('event', 'again');
// Output: Event fired: again
// (once listener doesn't fire again)

// Remove listener
const listener = () => console.log('hi');
emitter.on('event', listener);
emitter.off('event', listener);  // Removed

// Error event (special)
emitter.on('error', (err) => {
  console.error('Error:', err);
});
emitter.emit('error', new Error('Something bad'));
```

Reference: `doc/api/events.md`

:p What are the key methods of EventEmitter and what makes the 'error' event special?
??x
**Core EventEmitter methods:**

**1. on(eventName, listener) - Add listener:**
```javascript
emitter.on('data', (chunk) => {
  console.log('Received:', chunk);
});

// Called every time event is emitted
emitter.emit('data', 'first');   // Received: first
emitter.emit('data', 'second');  // Received: second
```

**2. once(eventName, listener) - One-time listener:**
```javascript
emitter.once('connect', () => {
  console.log('Connected');
});

emitter.emit('connect');  // Connected
emitter.emit('connect');  // (nothing - already removed)
```

**3. emit(eventName, [...args]) - Trigger event:**
```javascript
emitter.emit('data', arg1, arg2, arg3);
// All listeners called with: listener(arg1, arg2, arg3)

// Returns boolean
const hasListeners = emitter.emit('event');
// true if listeners exist, false if none
```

**4. off/removeListener(eventName, listener) - Remove listener:**
```javascript
const handler = (data) => console.log(data);

emitter.on('data', handler);
emitter.off('data', handler);  // Removed

// Must be same function reference!
emitter.on('data', () => console.log('a'));
emitter.off('data', () => console.log('a'));  // ❌ Doesn't work (different function)
```

**5. removeAllListeners([eventName]) - Remove all:**
```javascript
emitter.removeAllListeners('data');  // Remove all 'data' listeners
emitter.removeAllListeners();        // Remove ALL listeners for ALL events
```

**6. listeners(eventName) - Get listener array:**
```javascript
const listeners = emitter.listeners('data');
console.log(listeners.length);  // Number of listeners
```

**7. listenerCount(eventName) - Count listeners:**
```javascript
const count = emitter.listenerCount('data');
console.log(`${count} listeners for 'data'`);
```

**8. eventNames() - Get all event names:**
```javascript
emitter.on('data', () => {});
emitter.on('error', () => {});

console.log(emitter.eventNames());  // ['data', 'error']
```

**Special 'error' event:**

```javascript
// ❌ No listener for 'error' - CRASHES process!
emitter.emit('error', new Error('Bad thing'));
// Error: Bad thing
//     at ...
// (process crashes with stack trace)

// ✅ With listener - handles gracefully
emitter.on('error', (err) => {
  console.error('Error occurred:', err.message);
  // Handle error without crashing
});

emitter.emit('error', new Error('Bad thing'));
// Output: Error occurred: Bad thing
// (process continues)
```

**Why 'error' is special:**
- If 'error' emitted without listener → process crashes
- All other events: No listener = no problem
- **Always attach 'error' listener** on EventEmitters

**Listener execution order:**

```javascript
emitter.on('event', () => console.log('1'));
emitter.on('event', () => console.log('2'));
emitter.prependListener('event', () => console.log('0'));

emitter.emit('event');
// Output:
// 0  (prepended, runs first)
// 1
// 2
```

**Synchronous execution:**

```javascript
emitter.on('event', () => {
  console.log('1');
  // Long operation
  for (let i = 0; i < 1e9; i++) {}
  console.log('2');
});

emitter.on('event', () => {
  console.log('3');
});

console.log('Before emit');
emitter.emit('event');  // BLOCKS here until all listeners done
console.log('After emit');

// Output:
// Before emit
// 1
// 2  (after long operation)
// 3
// After emit
```

**Async handling:**

```javascript
// Listeners are synchronous, but can trigger async work
emitter.on('data', async (data) => {
  // emit() doesn't wait for this!
  await processData(data);
});

emitter.emit('data', 'value');
console.log('Emitted');  // Prints immediately, before processData() completes

// To wait for async listeners, use Promise:
emitter.on('data', (data) => {
  processData(data).catch(err => {
    emitter.emit('error', err);
  });
});
```

**Max listeners warning:**

```javascript
// Default: Warning at 10 listeners
for (let i = 0; i < 15; i++) {
  emitter.on('event', () => {});
}
// Warning: Possible EventEmitter memory leak detected...

// Increase limit if intentional
emitter.setMaxListeners(20);

// Unlimited (use with caution)
emitter.setMaxListeners(0);

// Check limit
console.log(emitter.getMaxListeners());  // 20
```

**Creating custom EventEmitter:**

```javascript
const EventEmitter = require('events');

class MyClass extends EventEmitter {
  constructor() {
    super();
  }

  doSomething() {
    // Emit event
    this.emit('start');

    // Do work
    const result = performWork();

    if (result.success) {
      this.emit('success', result.data);
    } else {
      this.emit('error', new Error(result.error));
    }
  }
}

// Usage
const obj = new MyClass();

obj.on('start', () => console.log('Started'));
obj.on('success', (data) => console.log('Success:', data));
obj.on('error', (err) => console.error('Error:', err));

obj.doSomething();
```

**Common patterns:**

**1. Event-based API:**
```javascript
class Downloader extends EventEmitter {
  download(url) {
    this.emit('start', url);

    fetch(url).then(res => {
      this.emit('progress', { loaded: 0, total: res.size });
      return res.body;
    }).then(body => {
      this.emit('complete', body);
    }).catch(err => {
      this.emit('error', err);
    });
  }
}

const dl = new Downloader();
dl.on('start', url => console.log('Downloading:', url));
dl.on('progress', p => console.log(`${p.loaded}/${p.total}`));
dl.on('complete', data => console.log('Done'));
dl.on('error', err => console.error(err));
dl.download('http://example.com/file');
```

**2. Promise + EventEmitter:**
```javascript
const { once } = require('events');

// Wait for specific event
const [data] = await once(emitter, 'data');
console.log('Received:', data);

// Async iteration
for await (const [data] of on(emitter, 'data')) {
  console.log(data);
  if (shouldStop) break;
}
```

**Key points:**
- Always handle 'error' events (or process crashes)
- Listeners execute synchronously in registration order
- Use `once()` for one-time events
- Use `off()` to prevent memory leaks
- Set appropriate `maxListeners` for your use case
x??
