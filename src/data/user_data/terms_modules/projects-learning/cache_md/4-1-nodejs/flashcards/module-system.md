# Module System and Architecture Flashcards

#### Module Wrapper Function
Node.js wraps every CommonJS module in a function wrapper before execution. This creates a private scope for each module and provides the familiar `require`, `exports`, `module`, `__filename`, and `__dirname` variables.

The wrapper prevents modules from polluting the global scope and provides module-specific context. Understanding this wrapper is key to understanding why module code doesn't have direct access to global variables.

```javascript
// What Node.js actually executes
(function(exports, require, module, __filename, __dirname) {
  // Your module code here
  const x = 10;  // Not global, scoped to this function

  exports.foo = function() {
    // Can access __filename, __dirname, module, etc.
  };

  return module.exports;
});
```

Reference: `doc/api/modules.md`

:p What is the module wrapper function in Node.js and what five parameters does it provide?
??x
The module wrapper is a function that wraps every CommonJS module:

```javascript
(function(exports, require, module, __filename, __dirname) {
  // Module code here
});
```

**Five parameters:**
1. **exports**: Reference to `module.exports` (shortcut for attaching exports)
2. **require**: Function to import other modules
3. **module**: Reference to the current module object
4. **__filename**: Absolute path to the current module file
5. **__dirname**: Absolute path to the directory containing the module

**Purpose**: Creates a private scope for each module, preventing global pollution and providing module-specific context without the user explicitly writing a function wrapper.

**Key insight**: `exports` and `module` are just function parameters, not global variables!
x??

---

#### Module Cache Keying
Node.js caches modules after first load to avoid re-executing the same code multiple times. However, with ESM (ECMAScript Modules), the same file can be imported with different import attributes, requiring a more sophisticated cache key.

The `ModuleCacheKey` structure combines the module specifier (path/URL) with import attributes (like `type: 'json'`) and computes a hash for quick lookup.

```cpp
// Module cache key structure
struct ModuleCacheKey {
  std::string specifier;                  // Module path/URL
  ImportAttributeVector import_attributes; // e.g., {type: 'json'}
  std::size_t hash;                       // Precomputed for speed

  // Two keys are equal if specifier AND attributes match
  bool operator==(const ModuleCacheKey& other) const {
    return specifier == other.specifier &&
           import_attributes == other.import_attributes;
  }
};

// Hash computation
hash = std::hash<string>(specifier) ^
       std::hash<attributes>(import_attributes);
```

Reference: `src/module_wrap.h`

:p Why does Node.js use both specifier and import attributes as the cache key for modules instead of just the file path?
??x
**The same file can be imported differently:**

```javascript
// Import as JavaScript module
import obj1 from './data.json' assert { type: 'json' };

// Import as text (hypothetically)
import text from './data.json' assert { type: 'text' };
```

The same file (`data.json`) requires different processing based on attributes:
- `type: 'json'` → Parse as JSON
- `type: 'text'` → Read as string

**Cache key structure enables:**
1. **Separate cache entries**: Same file, different processing = different cache entries
2. **Fast lookups**: Hash precomputed for O(1) cache access
3. **Correctness**: Prevents returning wrong module variant

**Hash computation:**
```cpp
hash = hash(specifier) XOR hash(attributes)
```
XOR combines both components; if either changes, hash changes. This is a quick filter before full equality check.

**Without attributes in key:** Would return wrong cached module when import attributes differ, causing subtle bugs.
x??

---

#### Dual Module System
Node.js supports two module systems: CommonJS (CJS) and ECMAScript Modules (ESM). These systems have different semantics, loading mechanisms, and interoperability rules.

The dual system creates complexity but provides backward compatibility with existing npm packages while supporting modern JavaScript standards.

**Key differences:**

| Aspect | CommonJS | ESM |
|--------|----------|-----|
| Syntax | `require()` | `import` |
| Loading | Synchronous | Asynchronous |
| File extension | `.js` (default), `.cjs` | `.mjs`, `.js` (with `"type": "module"`) |
| Top-level await | ❌ Not supported | ✅ Supported |
| `__filename` | ✅ Available | ❌ Not available |
| Exports | Dynamic (runtime) | Static (parse time) |

Reference: `doc/api/modules.md`, `doc/api/esm.md`

:p What are the three main technical differences between CommonJS and ESM module loading in Node.js?
??x
1. **Loading model:**
   - CommonJS: Synchronous (blocks until module loaded)
   - ESM: Asynchronous (returns promises, non-blocking)

2. **Export timing:**
   - CommonJS: Exports determined at runtime (can be conditional)
   - ESM: Exports determined at parse time (must be static)

3. **File resolution:**
   - CommonJS: Automatic extension resolution (`require('./foo')` finds `foo.js`)
   - ESM: Requires explicit extensions (`import './foo.js'`)

**Why these differences matter:**

```javascript
// CommonJS - runtime exports (OK)
if (condition) {
  module.exports = A;
} else {
  module.exports = B;
}

// ESM - static exports (INVALID)
if (condition) {
  export default A;  // ❌ SyntaxError
} else {
  export default B;
}

// ESM - top-level await (OK)
const data = await fetch('/api');  // ✅ Works
export { data };

// CommonJS - top-level await (INVALID)
const data = await fetch('/api');  // ❌ SyntaxError
module.exports = { data };
```

The synchronous vs asynchronous difference is fundamental: CJS was designed when everything was local files; ESM was designed for potentially remote modules.
x??

---

#### Module Phases in ESM
ECMAScript Modules go through distinct phases during loading and execution. Node.js implements these phases to correctly handle module dependencies and circular imports.

Understanding phases is crucial for debugging module loading issues and understanding when code executes.

```javascript
// Phase 1: Source Phase - Module source loaded
import './foo.js';
// At this point, foo.js source code is loaded but not executed

// Phase 2: Evaluation Phase - Module body executed
// foo.js code now runs, including its imports
```

The separation allows Node.js to:
1. Discover all dependencies before executing any code
2. Detect and handle circular dependencies
3. Enable static analysis tools to understand the dependency graph

Reference: `src/module_wrap.h` (ModulePhase enum)

:p What are the two main phases of ESM module loading in Node.js and why is this separation important?
??x
**Two phases:**

1. **Source Phase (kSourcePhase)**:
   - Module source code is loaded and parsed
   - Dependencies are identified
   - Module is prepared but NOT executed

2. **Evaluation Phase (kEvaluationPhase)**:
   - Module body code executes
   - Exports become available
   - Side effects occur

**Why separation matters:**

**Circular dependency handling:**
```javascript
// a.mjs
import { b } from './b.mjs';
export const a = 'A';

// b.mjs
import { a } from './a.mjs';  // Circular!
export const b = 'B';
```

Phase separation enables:
1. **Source phase**: Both modules parsed, dependencies discovered
2. **Evaluation phase**: Modules execute in topological order
3. **Circular references**: Can be resolved because modules exist before execution

**Static analysis:**
Tools can analyze the dependency graph without executing code, enabling:
- Bundlers to tree-shake unused code
- IDEs to provide import suggestions
- Security tools to audit dependencies

**Without phases:** Circular dependencies would cause runtime errors or infinite loops.
x??

---

#### Code Caching Mechanism
Node.js implements code caching to avoid re-parsing and re-compiling JavaScript code on subsequent runs. When a module is first loaded, V8 compiles it to bytecode; Node.js can cache this bytecode to disk.

Code caching significantly improves startup time, especially for large applications with many modules.

```cpp
// Simplified code caching flow
class CompileCache {
  // Cache entry structure
  struct CacheEntry {
    std::string source_hash;           // Verify source unchanged
    v8::ScriptCompiler::CachedData* data;  // Compiled bytecode
    uint64_t timestamp;                // When cached
  };

  // Cache operations
  CachedData* Get(const std::string& filename);
  void Store(const std::string& filename, CachedData* data);

  // Validation
  bool IsValid(const std::string& source_hash, CacheEntry* entry);
};
```

**Cache invalidation:** If source code changes, hash changes, cache entry invalidated.

Reference: `src/` (compile cache implementation)

:p How does Node.js code caching improve startup performance and how does it ensure cached bytecode is still valid?
??x
**Performance improvement:**

1. **First run:**
   - Load source → Parse → Compile to bytecode → Execute
   - Store bytecode to cache

2. **Subsequent runs:**
   - Load cached bytecode → Execute
   - Skips parsing and compilation (expensive steps)

**Validation mechanism:**

```cpp
// Pseudocode for cache validation
function useCachedCode(filename) {
  sourceCode = readFile(filename);
  sourceHash = computeHash(sourceCode);

  cacheEntry = cache.get(filename);
  if (!cacheEntry) return compileAndCache(sourceCode);

  // Verify source unchanged
  if (cacheEntry.hash !== sourceHash) {
    return compileAndCache(sourceCode);  // Re-compile
  }

  return cacheEntry.bytecode;  // Use cached
}
```

**Hash-based invalidation:**
- Source code hashed (e.g., SHA-256)
- Hash stored with cached bytecode
- Before using cache: recompute hash, compare
- If different: source changed, must re-compile

**Why not use timestamp?** File modification time can be manipulated or unreliable across systems. Hash guarantees source hasn't changed.

**Typical speedup:** 30-50% faster startup for large applications on subsequent runs.
x??

---

#### Module Resolution Algorithm
Node.js uses a complex algorithm to resolve module specifiers to actual file paths. The algorithm differs between CommonJS and ESM, but both involve searching multiple locations.

For CommonJS `require()`, Node.js searches in this order:

```javascript
// require('./foo')

// 1. Core modules (highest priority)
if (isCoreModule('foo')) return loadCore('foo');

// 2. Relative/absolute paths
if (startsWithPath('./foo')) {
  // Try exact match, then add extensions
  try './foo'
  try './foo.js'
  try './foo.json'
  try './foo.node'
  try './foo/index.js'
  try './foo/index.json'
  try './foo/index.node'
}

// 3. node_modules directory traversal
searchInNodeModules('foo', [
  './node_modules',
  '../node_modules',
  '../../node_modules',
  // ... up to filesystem root
]);
```

Reference: `doc/api/modules.md`

:p What is the node_modules directory traversal algorithm in Node.js module resolution?
??x
When resolving a non-relative specifier (like `require('express')`), Node.js searches upward through the directory tree:

**Algorithm:**
1. Start in current directory's `node_modules`
2. If not found, move to parent directory's `node_modules`
3. Repeat until module found or reach filesystem root
4. Throw `MODULE_NOT_FOUND` if not found

**Example:** Resolving `require('lodash')` from `/home/user/project/src/utils/helper.js`:

```
Search order:
1. /home/user/project/src/utils/node_modules/lodash
2. /home/user/project/src/node_modules/lodash
3. /home/user/project/node_modules/lodash  ← Found!
4. /home/user/node_modules/lodash
5. /home/node_modules/lodash
6. /node_modules/lodash
```

**Why this design?**
- **Dependency isolation**: Each package can have its own version of dependencies
- **Flat structure optimization**: Commonly used packages install at project root
- **Monorepo support**: Shared dependencies at higher levels

**Mathematical property:** Worst case is O(d) where d is directory depth, but typically finds modules in 1-2 checks due to npm's flat installation strategy.
x??

---

#### Package.json Module Type
The `"type"` field in `package.json` determines how Node.js interprets `.js` files within that package. This allows packages to opt into ESM while maintaining backward compatibility.

```json
// package.json
{
  "type": "module",  // or "commonjs" (default)
  "exports": { ... }
}
```

**Interpretation rules:**
- `"type": "commonjs"` (default): `.js` files are CommonJS
- `"type": "module"`: `.js` files are ESM

**File extensions override type:**
- `.mjs` is always ESM (regardless of type field)
- `.cjs` is always CommonJS (regardless of type field)

Reference: `doc/api/packages.md`

:p How does the "type" field in package.json affect module interpretation and how can you override it?
??x
**Type field effects:**

```json
// package.json with "type": "module"
{
  "name": "my-package",
  "type": "module"
}
```

**Interpretation:**
- `foo.js` → ESM (uses import/export)
- `bar.js` → ESM (uses import/export)
- `baz.mjs` → ESM (always)
- `qux.cjs` → CommonJS (always)

```json
// package.json with "type": "commonjs" (or no type field)
{
  "name": "my-package",
  "type": "commonjs"
}
```

**Interpretation:**
- `foo.js` → CommonJS (uses require/module.exports)
- `bar.js` → CommonJS (uses require/module.exports)
- `baz.mjs` → ESM (always)
- `qux.cjs` → CommonJS (always)

**Override mechanism:**
Use explicit file extensions:
- `.mjs` forces ESM interpretation
- `.cjs` forces CommonJS interpretation

**Scope:** The `"type"` field applies to all `.js` files in the package directory and subdirectories, unless a subdirectory has its own `package.json` with a different `"type"`.

**Migration strategy:** Add `"type": "module"` to gradually migrate CommonJS packages to ESM, using `.cjs` for files that must remain CommonJS.
x??

---

#### Conditional Exports
The `"exports"` field in `package.json` provides fine-grained control over which files can be imported from a package. Conditional exports allow different entry points based on the import context.

This feature enables packages to provide different implementations for different environments (Node.js vs browser, ESM vs CommonJS) while keeping internal files private.

```json
{
  "name": "my-package",
  "exports": {
    ".": {
      "import": "./esm/index.mjs",      // ESM import
      "require": "./cjs/index.cjs"      // CommonJS require
    },
    "./feature": {
      "node": "./feature-node.js",      // Node.js environment
      "default": "./feature-browser.js"  // Browser/other
    }
  }
}
```

Reference: `doc/api/packages.md`

:p What are conditional exports in package.json and what problem do they solve?
??x
**Conditional exports** allow a package to specify different entry points based on how it's being imported:

**Common conditions:**
- `"import"`: Used for `import` statements (ESM)
- `"require"`: Used for `require()` calls (CommonJS)
- `"node"`: Node.js environment
- `"browser"`: Browser environment
- `"default"`: Fallback if no other condition matches

**Problems solved:**

1. **Dual package hazard**: Provide both ESM and CommonJS without duplication bugs
```json
{
  "exports": {
    ".": {
      "import": "./dist/esm/index.mjs",
      "require": "./dist/cjs/index.cjs"
    }
  }
}
```

2. **Environment-specific code**: Different implementations for Node.js vs browser
```json
{
  "exports": {
    "./crypto": {
      "node": "./crypto-node.js",    // Uses Node.js crypto
      "browser": "./crypto-web.js"    // Uses Web Crypto API
    }
  }
}
```

3. **Encapsulation**: Only exported paths are importable; internal files are private
```javascript
import { x } from 'pkg';              // ✅ Listed in exports
import { y } from 'pkg/internal/foo'; // ❌ Not listed, cannot import
```

**Evaluation order:** Node.js checks conditions top-to-bottom, uses first match.
x??
