# Architecture Patterns Flashcards

#### Monorepo with Yarn Workspaces
Excalidraw is organized as a monorepo - a single repository containing multiple related packages. It uses Yarn Workspaces to manage dependencies between packages. The main benefit is code sharing: packages/excalidraw can depend on @excalidraw/element, and both can be developed simultaneously. Workspace also optimizes dependencies by hoisting shared packages to the root, avoiding duplicate installations.

```typescript
// Monorepo structure
excalidraw/
├── package.json              // Root workspace configuration
├── packages/
│   ├── excalidraw/          // Main library
│   │   └── package.json     // Depends on other packages
│   ├── element/             // Element types package
│   │   └── package.json     // Standalone package
│   ├── math/                // Math utilities
│   └── utils/               // Common utilities
└── excalidraw-app/          // Web application
    └── package.json         // Uses @excalidraw/excalidraw

// Root package.json
{
  "private": true,
  "workspaces": [
    "packages/*",
    "excalidraw-app"
  ]
}

// packages/excalidraw/package.json
{
  "name": "@excalidraw/excalidraw",
  "dependencies": {
    "@excalidraw/element": "*",    // Uses workspace package
    "@excalidraw/math": "*",
    "@excalidraw/utils": "*"
  }
}

// Benefits:
// 1. Shared code across packages
// 2. Single install for all dependencies
// 3. Cross-package changes in one commit
// 4. Simplified version management
```

:p What is a monorepo and how does Excalidraw use Yarn Workspaces to organize its packages?
??x
A **monorepo** is a single repository containing multiple related packages, managed by **Yarn Workspaces**.

**Excalidraw structure:**
```
excalidraw/                    (monorepo root)
├── packages/
│   ├── excalidraw/           (@excalidraw/excalidraw)
│   ├── element/              (@excalidraw/element)
│   ├── math/                 (@excalidraw/math)
│   ├── utils/                (@excalidraw/utils)
│   └── common/               (@excalidraw/common)
└── excalidraw-app/           (Web application)
```

**Yarn Workspaces configuration:**
```json
// Root package.json
{
  "private": true,
  "workspaces": [
    "packages/*",
    "excalidraw-app"
  ]
}
```

**Package dependencies:**
```json
// packages/excalidraw/package.json
{
  "name": "@excalidraw/excalidraw",
  "dependencies": {
    "@excalidraw/element": "*",  // ← Internal package
    "@excalidraw/math": "*",     // ← Internal package
    "react": "^18.0.0"           // ← External package
  }
}
```

**Benefits:**

1. **Code sharing** - Internal packages reference each other
2. **Unified dependencies** - Shared packages hoisted to root
3. **Atomic changes** - Update multiple packages in one commit
4. **Type safety** - TypeScript works across packages
5. **Simplified build** - Build all packages together

**Single command installs everything:**
```bash
yarn  # Installs all packages + links workspaces
```
x??

---

#### Library vs App Separation
Excalidraw is split into two parts: the library (@excalidraw/excalidraw) provides the core drawing functionality, and the app (excalidraw-app) adds collaboration, storage, and hosting features. This separation allows developers to embed just the drawing component in their own apps without the backend dependencies. The library is framework-agnostic React component, while the app is a full Next.js/Firebase application.

```typescript
// LIBRARY: @excalidraw/excalidraw
// packages/excalidraw/index.tsx

export const Excalidraw = (props: ExcalidrawProps) => {
  // Provides:
  // - Drawing canvas
  // - Element manipulation
  // - Undo/redo
  // - Keyboard shortcuts
  // - Export/import (JSON, PNG, SVG)

  // Does NOT provide:
  // - Backend storage
  // - User authentication
  // - Collaboration
  // - Hosting
};

// Usage: Embed in any React app
import { Excalidraw } from "@excalidraw/excalidraw";

function MyApp() {
  return (
    <div>
      <Excalidraw
        onChange={(elements, appState) => {
          // Save to your own backend
        }}
      />
    </div>
  );
}

// APP: excalidraw.com
// excalidraw-app/App.tsx

function ExcalidrawApp() {
  // Wraps library with:
  // - Firebase storage
  // - Real-time collaboration
  // - User accounts
  // - Sharing/publishing
  // - Plus features

  return (
    <Excalidraw
      onChange={saveToFirebase}
      onPointerUpdate={broadcastToCollaborators}
      // ... collaboration props
    />
  );
}
```

:p How is Excalidraw split between library and app, and what does each part provide?
??x
Excalidraw has a **library/app separation:**

**LIBRARY (@excalidraw/excalidraw)**
```typescript
// Published to npm
// Location: packages/excalidraw/

// Provides:
- Drawing canvas
- Element creation/manipulation
- Rendering (RoughJS)
- Actions (copy, paste, delete, etc.)
- Keyboard shortcuts
- Undo/redo
- Export (JSON, PNG, SVG)
- Import/restore

// Does NOT provide:
- Backend storage
- User authentication
- Real-time collaboration
- Sharing features
```

**APP (excalidraw.com)**
```typescript
// Web application
// Location: excalidraw-app/

// Adds:
- Firebase storage
- Real-time collaboration
- User accounts
- Public sharing
- Plus (premium) features
- Custom backend
```

**Usage:**
```typescript
// Embed library in your app
import { Excalidraw } from "@excalidraw/excalidraw";

function MyApp() {
  return (
    <Excalidraw
      onChange={(elements) => {
        // You handle storage
        saveToYourBackend(elements);
      }}
    />
  );
}

// Official app wraps library
function ExcalidrawApp() {
  return (
    <Excalidraw
      onChange={saveToFirebase}
      onPointerUpdate={syncCollaboration}
    />
  );
}
```

**Benefit:** Use drawing features without needing Firebase/collaboration infrastructure.
x??

---

#### Portal Tunneling with tunnel-rat
Excalidraw uses tunnel-rat library to solve a React rendering problem: some components need to render in different parts of the DOM tree than where they're logically defined. For example, a dialog might be defined deep in a component but needs to render at the document root for z-index layering. Tunnel-rat creates "tunnels" - one end is the content source, the other end is where it actually renders.

```typescript
// Problem: Component defined deep in tree
function DeepNestedComponent() {
  return (
    <div style={{ position: "relative", zIndex: 1 }}>
      <Dialog>  {/* ❌ Gets clipped by parent's z-index */}
        This dialog needs to appear on top!
      </Dialog>
    </div>
  );
}

// Solution: Portal tunneling with tunnel-rat
import tunnel from "tunnel-rat";

// Create tunnel
const dialogTunnel = tunnel();

// In deep component: tunnel In (source)
function DeepNestedComponent() {
  return (
    <div style={{ position: "relative", zIndex: 1 }}>
      <dialogTunnel.In>
        <Dialog>This content is "sent" through tunnel</Dialog>
      </dialogTunnel.In>
    </div>
  );
}

// At root: tunnel Out (destination)
function RootApp() {
  return (
    <div>
      <DeepNestedComponent />

      {/* Content appears here, not in DeepNestedComponent! */}
      <dialogTunnel.Out />  {/* ✅ Renders at root level */}
    </div>
  );
}

// How it works:
// 1. Component renders <tunnel.In>content</tunnel.In>
// 2. tunnel-rat captures the content
// 3. Content actually renders at <tunnel.Out />
// 4. Dialog appears at root with proper z-index
```

:p What is tunnel-rat and what problem does it solve in Excalidraw's component architecture?
??x
**tunnel-rat** is a library for portal tunneling - rendering content in a different DOM location than where it's defined.

**Problem:**
```typescript
function NestedComponent() {
  return (
    <div style={{ overflow: "hidden", zIndex: 1 }}>
      <Dialog>  {/* ❌ Gets clipped by parent overflow/z-index */}
        Important content!
      </Dialog>
    </div>
  );
}
```

**Solution:**
```typescript
import tunnel from "tunnel-rat";

// 1. Create tunnel
const dialogTunnel = tunnel();

// 2. Send content through tunnel (source)
function NestedComponent() {
  return (
    <div style={{ overflow: "hidden" }}>
      <dialogTunnel.In>
        <Dialog>Content teleports through tunnel!</Dialog>
      </dialogTunnel.In>
    </div>
  );
}

// 3. Receive content at destination
function RootLayout() {
  return (
    <>
      <NestedComponent />
      <dialogTunnel.Out />  {/* Content renders HERE */}
    </>
  );
}
```

**How it works:**
```
Component tree:          DOM result:

<Root>                   <div class="root">
  <Nested>                 <div class="nested">
    <tunnel.In>              <!-- Nothing here -->
      <Dialog/>            </div>
    </tunnel.In>           <Dialog/>  ← Renders here!
  </Nested>              </div>
  <tunnel.Out/>
</Root>
```

**Excalidraw use cases:**
- Dialogs render at root (not clipped)
- Popovers escape overflow containers
- Tooltips appear above everything
- Flexible UI placement

**Benefit:** Keep component logic together while rendering elsewhere in DOM.
x??

---

#### Radix UI for Accessible Components
Excalidraw uses Radix UI library for complex UI components like dialogs, popovers, dropdowns, and tooltips. Radix provides unstyled, accessible primitives that handle the hard parts: keyboard navigation, focus management, ARIA attributes, screen reader support, and edge cases. Excalidraw adds its own styling while getting accessibility for free. This is better than building from scratch because accessibility is complex and easy to get wrong.

```typescript
// Without Radix: Manual accessibility (error-prone)
function Dialog({ open, onClose, children }) {
  return open && (
    <div
      role="dialog"  // ✓ Added
      // ❌ Missing: aria-modal, aria-labelledby
      // ❌ Missing: Focus trap
      // ❌ Missing: Escape key handler
      // ❌ Missing: Focus restoration
      onClick={onClose}
    >
      {children}
    </div>
  );
}

// With Radix: Accessibility built-in
import * as Dialog from "@radix-ui/react-dialog";

function MyDialog({ open, onOpenChange, children }) {
  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="overlay" />
        <Dialog.Content className="content">
          {children}
          <Dialog.Close>×</Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

// Radix automatically handles:
// ✓ Focus trap (can't tab outside)
// ✓ Escape key closes
// ✓ Focus returns to trigger on close
// ✓ aria-modal="true"
// ✓ aria-labelledby connection
// ✓ Screen reader announcements
// ✓ Scroll locking
// ✓ Click outside to close

// Excalidraw just adds styling:
<Dialog.Content className="excalidraw-dialog">
  {/* Custom styles, Radix handles behavior */}
</Dialog.Content>
```

:p Why does Excalidraw use Radix UI and what problems does it solve?
??x
**Radix UI** provides unstyled, accessible UI primitives that handle complex behavior automatically.

**What Radix provides:**

```typescript
import * as Dialog from "@radix-ui/react-dialog";

function MyDialog() {
  return (
    <Dialog.Root>
      <Dialog.Trigger>Open</Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Content>
          Hello!
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

// Radix automatically handles:
✓ Focus trap (can't tab outside dialog)
✓ Escape key to close
✓ Focus restoration on close
✓ ARIA attributes (role, aria-modal, aria-labelledby)
✓ Screen reader support
✓ Keyboard navigation
✓ Click outside to close
✓ Scroll locking (prevent background scroll)
✓ Portal rendering (renders at document root)
```

**Excalidraw use cases:**
```typescript
// Dialog
import * as Dialog from "@radix-ui/react-dialog";

// Popover (color picker, etc.)
import * as Popover from "@radix-ui/react-popover";

// Dropdown menu
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";

// Tooltip
import * as Tooltip from "@radix-ui/react-tooltip";
```

**Benefits:**

1. **Accessibility for free** - ARIA, keyboard, screen readers
2. **Unstyled** - Full control over appearance
3. **Battle-tested** - Edge cases already handled
4. **Composable** - Build complex patterns

**Why not build from scratch:**
```typescript
// ❌ Manual dialog - easy to forget things
<div role="dialog">  // No focus trap!
  // No escape handler!
  // Focus stays in background!
  // Screen readers confused!
</div>

// ✅ Radix - everything included
<Dialog.Root>  // All accessibility built-in
```

**Result:** Excalidraw is fully keyboard-navigable and screen-reader accessible.
x??

---

#### TypeScript Discriminated Unions for Elements
Excalidraw uses TypeScript discriminated unions to represent the 11 element types. Instead of a single interface with optional properties, each element type is its own interface, and they're combined with a union. The "type" field is the discriminant - TypeScript can narrow the type based on checking element.type. This provides strong type safety and autocomplete without type assertions.

```typescript
// ❌ Single interface approach (weak typing)
interface Element {
  type: string;
  x: number;
  y: number;
  // Arrow-specific (optional)
  startBinding?: Binding;
  endBinding?: Binding;
  // Text-specific (optional)
  text?: string;
  fontSize?: number;
}

// Problem: Can't tell which properties are valid
function render(element: Element) {
  // TypeScript doesn't know if this element has text
  console.log(element.text);  // ❌ May be undefined
}

// ✅ Discriminated union approach (strong typing)
interface RectangleElement {
  type: "rectangle";
  x: number;
  y: number;
  roundness: Roundness | null;
}

interface ArrowElement {
  type: "arrow";
  x: number;
  y: number;
  startBinding: Binding | null;
  endBinding: Binding | null;
}

interface TextElement {
  type: "text";
  x: number;
  y: number;
  text: string;
  fontSize: number;
}

// Union of all types
type ExcalidrawElement =
  | RectangleElement
  | ArrowElement
  | TextElement
  | ...;

// TypeScript narrows type based on discriminant
function render(element: ExcalidrawElement) {
  if (element.type === "text") {
    // TypeScript knows this is TextElement
    console.log(element.text);     // ✓ Always defined
    console.log(element.fontSize); // ✓ Always defined
    // console.log(element.startBinding); // ❌ Error! Not on TextElement
  }

  if (element.type === "arrow") {
    // TypeScript knows this is ArrowElement
    console.log(element.startBinding); // ✓ Valid
  }
}
```

:p What are TypeScript discriminated unions and how does Excalidraw use them for element types?
??x
**Discriminated unions** use a common "discriminant" property to enable type narrowing.

**Excalidraw's approach:**

```typescript
// Each element type is separate interface
interface ExcalidrawRectangleElement {
  type: "rectangle";  // ← Discriminant
  x: number;
  y: number;
  roundness: Roundness | null;
  // No arrow properties
}

interface ExcalidrawArrowElement {
  type: "arrow";  // ← Discriminant
  x: number;
  y: number;
  startBinding: Binding | null;
  endBinding: Binding | null;
  // No text properties
}

interface ExcalidrawTextElement {
  type: "text";  // ← Discriminant
  x: number;
  y: number;
  text: string;
  fontSize: number;
  // No arrow properties
}

// Union combines all types
type ExcalidrawElement =
  | ExcalidrawRectangleElement
  | ExcalidrawArrowElement
  | ExcalidrawTextElement
  | ... (11 total);
```

**Type narrowing:**
```typescript
function processElement(element: ExcalidrawElement) {
  // TypeScript doesn't know which type yet
  // element.text  ← Error: Not all elements have text

  // Check discriminant to narrow type
  if (element.type === "text") {
    // TypeScript knows: This is ExcalidrawTextElement
    element.text;       // ✓ Valid
    element.fontSize;   // ✓ Valid
    // element.startBinding; ✗ Error: TextElement doesn't have this
  }

  if (element.type === "arrow") {
    // TypeScript knows: This is ExcalidrawArrowElement
    element.startBinding;  // ✓ Valid
    element.endBinding;    // ✓ Valid
    // element.text; ✗ Error: ArrowElement doesn't have this
  }
}
```

**Benefits:**
- ✓ Type safety - Can't access wrong properties
- ✓ Autocomplete - IDE suggests correct properties
- ✓ No type assertions - TypeScript infers types
- ✓ Compile-time errors - Catch bugs before runtime
x??

---

#### Collaboration with Fractional Indexing and Versioning
Excalidraw's collaboration system handles multiple users editing simultaneously. It uses three techniques: fractional indexing for element ordering (insert between elements without reordering), version and versionNonce for conflict resolution (detect simultaneous edits), and operational transformation for merging changes (apply remote changes to local state). This enables real-time collaboration without central coordination.

```typescript
// Collaboration challenges:
// 1. Element ordering
// 2. Conflict resolution
// 3. Change merging

// TECHNIQUE 1: Fractional indexing for ordering
// User A brings element to front at same time User B adds element
// Without fractional indexing: Must sync integer indices
// With fractional indexing: No conflict, just insert between

elements = [
  { id: "a", index: "a0" },
  { id: "b", index: "a1" }
];

// User A: Bring "a" to front → index "a15" (between a1 and a2)
// User B: Add new element → index "a2"
// Merge: Both changes succeed without conflict
// Result: ["a", "b", "a (moved)", "new"]

// TECHNIQUE 2: Version + versionNonce for conflicts
// User A and User B edit same element simultaneously

// Local version:
{ id: "rect", version: 5, versionNonce: 123, x: 100 }

// Remote version:
{ id: "rect", version: 5, versionNonce: 456, x: 200 }

// Conflict resolution:
if (remote.version > local.version) {
  return remote; // Remote is newer
} else if (remote.version === local.version) {
  // Simultaneous edit! Use versionNonce tiebreaker
  return remote.versionNonce > local.versionNonce
    ? remote
    : local;
}

// TECHNIQUE 3: Operational transformation
// User A moves element, User B changes color
// Both changes should be applied

function mergeChanges(localElement, remoteChanges) {
  // Detect which properties changed
  const merged = { ...localElement };

  if (remoteChanges.x !== localElement.x) {
    merged.x = remoteChanges.x; // Apply position change
  }

  if (remoteChanges.strokeColor !== localElement.strokeColor) {
    merged.strokeColor = remoteChanges.strokeColor; // Apply color change
  }

  // Both changes preserved
  return merged;
}
```

:p What three techniques does Excalidraw use to enable real-time collaboration without conflicts?
??x
Excalidraw's collaboration uses **three techniques:**

**1. Fractional Indexing (Element Ordering)**
```typescript
// Problem: Two users reorder elements simultaneously

// User A brings element to front
// User B brings different element to front

// Solution: Fractional indices allow insertion anywhere
elements = [
  { id: "a", index: "a0" },
  { id: "b", index: "a1" }
];

// User A: Move "a" to front → "a15" (between "a1" and "a2")
// User B: Move "c" to front → "a2"
// No conflict! Both succeed

// Result: a0, a1, a15 (a moved), a2 (c moved)
```

**2. Version + versionNonce (Conflict Resolution)**
```typescript
// Problem: Two users edit same element simultaneously

// Version 5 on both clients
User A: { id: "rect", version: 5, x: 100 }
User B: { id: "rect", version: 5, x: 200 }

// Conflict resolution
function resolve(local, remote) {
  if (remote.version > local.version) {
    return remote;  // Remote is newer
  }
  if (local.version > remote.version) {
    return local;   // Local is newer
  }

  // Same version (simultaneous!)
  // Use versionNonce as tiebreaker
  return remote.versionNonce > local.versionNonce
    ? remote
    : local;
}
```

**3. Operational Transformation (Merge Changes)**
```typescript
// Problem: User A moves element, User B changes color

// User A: { x: 100, y: 50, strokeColor: "black" }
// User B: { x: 0, y: 0, strokeColor: "red" }

// Solution: Merge non-conflicting properties
function merge(local, remote) {
  return {
    x: remote.x,              // Apply A's position
    y: remote.y,
    strokeColor: remote.strokeColor  // Apply B's color
  };
  // Both changes preserved!
}
```

**Result:** Multiple users edit simultaneously without data loss or conflicts.
x??

---

#### Path Aliases for Clean Imports
Excalidraw uses TypeScript path aliases to avoid deeply nested relative imports. Instead of importing from ../../../../components/Button, you can import from @excalidraw/components/Button. This makes imports cleaner, easier to refactor (move files without updating import paths), and more maintainable. Path aliases are configured in tsconfig.json and bundler config.

```typescript
// ❌ Without path aliases (relative imports)
// In: packages/excalidraw/components/toolbar/ShapeButton.tsx

import { mutateElement } from "../../../../element/mutateElement";
import { Scene } from "../../../scene/Scene";
import { Button } from "../../Button";
import { getSelectedElements } from "../../../../utils/selection";

// Problems:
// 1. Hard to read
// 2. Fragile (breaks when moving files)
// 3. Unclear where files are located

// ✅ With path aliases (clean imports)
// In: packages/excalidraw/components/toolbar/ShapeButton.tsx

import { mutateElement } from "@excalidraw/element";
import { Scene } from "@excalidraw/scene";
import { Button } from "@excalidraw/components";
import { getSelectedElements } from "@excalidraw/utils";

// Benefits:
// 1. Clear and readable
// 2. Move files without changing imports
// 3. Obvious which package provides each module

// Configuration in tsconfig.json:
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@excalidraw/*": ["packages/excalidraw/*"],
      "@excalidraw/element": ["packages/element/src"],
      "@excalidraw/math": ["packages/math"],
      "@excalidraw/utils": ["packages/utils"]
    }
  }
}

// Configuration in bundler (Vite):
{
  resolve: {
    alias: {
      "@excalidraw": path.resolve(__dirname, "packages/excalidraw"),
      "@excalidraw/element": path.resolve(__dirname, "packages/element/src")
    }
  }
}
```

:p What are TypeScript path aliases and why does Excalidraw use them instead of relative imports?
??x
**Path aliases** map clean import paths to actual file locations.

**Without aliases (relative imports):**
```typescript
// Deeply nested component
// Location: packages/excalidraw/components/toolbar/properties/ColorPicker.tsx

// ❌ Ugly relative imports
import { mutateElement } from "../../../../../element/mutateElement";
import { Scene } from "../../../../scene/Scene";
import { Button } from "../../../common/Button";

// Problems:
- Hard to read (count the ../..)
- Fragile (breaks when moving files)
- Unclear source (which package?)
```

**With aliases:**
```typescript
// Same file

// ✅ Clean imports
import { mutateElement } from "@excalidraw/element";
import { Scene } from "@excalidraw/scene";
import { Button } from "@excalidraw/components";

// Benefits:
- Easy to read
- Robust (move files freely)
- Clear source (package name visible)
```

**Configuration:**
```json
// tsconfig.json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@excalidraw/*": ["packages/excalidraw/*"],
      "@excalidraw/element": ["packages/element/src"],
      "@excalidraw/math": ["packages/math"],
      "@excalidraw/utils": ["packages/utils"]
    }
  }
}

// vite.config.ts
{
  resolve: {
    alias: {
      "@excalidraw": "./packages/excalidraw",
      "@excalidraw/element": "./packages/element/src"
    }
  }
}
```

**Usage:**
```typescript
// Import from any package using clean paths
import { ExcalidrawElement } from "@excalidraw/element";
import { distance } from "@excalidraw/math";
import { debounce } from "@excalidraw/utils";
```

**Result:** Maintainable imports that don't break when refactoring file structure.
x??

---

#### Build System - esbuild and Vite
Excalidraw uses different build tools for different purposes: esbuild for building the library packages (fast, simple bundling), and Vite for the development server and app builds (includes hot module replacement, dev server, optimizations). This combination provides fast development experience (Vite HMR) and fast library builds (esbuild speed) while optimizing each use case appropriately.

```typescript
// TWO BUILD SYSTEMS:

// 1. esbuild - Library builds
// Location: packages/excalidraw/

// Why esbuild:
// - Extremely fast (written in Go)
// - Simple configuration
// - Perfect for library bundling
// - No dev server needed

// Build script (package.json):
{
  "scripts": {
    "build": "esbuild src/index.tsx --bundle --outfile=dist/index.js"
  }
}

// esbuild features:
- Bundle multiple files into one
- Minification
- Tree shaking
- Fast rebuilds (milliseconds)

// Output: dist/index.js (library for npm)

// 2. Vite - App development & builds
// Location: excalidraw-app/

// Why Vite:
// - Hot Module Replacement (instant updates)
// - Dev server with proxying
// - CSS/asset handling
// - Optimized production builds
// - Plugin ecosystem

// Dev server:
yarn start  // → vite dev server
// Features:
- Instant HMR (no page reload)
- Fast cold start
- Source maps
- CSS hot reload

// Production build:
yarn build:app  // → vite build
// Features:
- Code splitting
- Asset optimization
- Bundle analysis
- Cache busting

// vite.config.ts:
export default {
  build: {
    outDir: "dist",
    rollupOptions: {
      // Advanced bundling options
    }
  },
  server: {
    port: 3000,
    hmr: true  // Hot module replacement
  }
}
```

:p Why does Excalidraw use both esbuild and Vite, and what is each optimized for?
??x
Excalidraw uses **two build systems** for different purposes:

**1. esbuild - Library builds**
```bash
# Location: packages/excalidraw/

# Purpose: Bundle library for npm
yarn build  # → Uses esbuild

# Why esbuild:
- Extremely fast (10-100x faster than webpack)
- Simple bundling
- Tree shaking
- Minification
- No dev server needed

# Output: dist/index.js (published to npm)
```

**Configuration:**
```javascript
// build script
esbuild src/index.tsx \
  --bundle \
  --outfile=dist/index.js \
  --minify \
  --sourcemap
```

**2. Vite - App development & builds**
```bash
# Location: excalidraw-app/

# Purpose: Dev server + production build
yarn start       # → Vite dev server
yarn build:app   # → Vite production build

# Why Vite:
- Hot Module Replacement (instant updates)
- Dev server with fast startup
- CSS/asset handling
- Optimized production builds
- Plugin ecosystem
```

**Dev server features:**
```typescript
// vite.config.ts
{
  server: {
    port: 3000,
    hmr: true  // Hot reload without page refresh
  }
}

// Edit component → See changes instantly (no reload!)
```

**Comparison:**

```
Use case          | Tool    | Why
------------------+---------+---------------------------
Library build     | esbuild | Fast, simple bundling
Dev server        | Vite    | HMR, instant feedback
Production app    | Vite    | Optimizations, splitting
Package build     | esbuild | Speed for CI/CD
```

**Result:**
- Development: Fast HMR with Vite
- Library: Fast builds with esbuild
- Best tool for each job
x??

---

#### Immutability Pattern Throughout Codebase
Immutability is a core principle in Excalidraw - all state updates create new objects instead of modifying existing ones. This applies to elements (via mutateElement), appState (via spread operator), and arrays (via map/filter). Immutability enables React rendering optimization (reference equality checks), undo/redo (store snapshots), collaboration (track changes), and predictable debugging. The pattern is enforced through TypeScript readonly types and coding conventions.

```typescript
// IMMUTABILITY EVERYWHERE:

// 1. Elements - Use mutateElement
// ❌ WRONG
element.x = 100;
element.strokeColor = "red";

// ✅ CORRECT
const newElement = mutateElement(element, {
  x: 100,
  strokeColor: "red"
});

// 2. AppState - Use spread operator
// ❌ WRONG
appState.zoom.value = 2;

// ✅ CORRECT
const newAppState = {
  ...appState,
  zoom: { ...appState.zoom, value: 2 }
};

// 3. Arrays - Use map/filter, not push/splice
// ❌ WRONG
elements.push(newElement);
elements.splice(index, 1);

// ✅ CORRECT
const newElements = [...elements, newElement];
const newElements = elements.filter((el, i) => i !== index);

// 4. Actions - Always return new objects
perform: (elements, appState) => {
  return {
    elements: updatedElements,  // New array
    appState: updatedAppState,   // New object
    storeAction: StoreAction.CAPTURE
  };
}

// TypeScript enforcement with readonly
type ExcalidrawElement = Readonly<{
  id: string;
  x: number;
  // ...
}>;

function update(element: Readonly<ExcalidrawElement>) {
  element.x = 100;  // ❌ TypeScript error: Cannot assign to readonly
}

// Why immutability matters:

// 1. React optimization
const prevElements = elements;
const nextElements = elements.map(...);  // New array
// React can check: prevElements !== nextElements (fast)

// 2. Undo/redo
const history = [snapshot1, snapshot2, snapshot3];
// Each snapshot is immutable, safe to restore

// 3. Collaboration
if (localElement !== remoteElement) {
  // Changed! Need to sync
}

// 4. Debugging
console.log(elementsBefore);  // Still intact
doOperation();
console.log(elementsAfter);   // Can compare both
```

:p Why is immutability a core principle in Excalidraw and how is it enforced throughout the codebase?
??x
**Immutability** means never modifying objects - always create new ones.

**Enforcement in Excalidraw:**

```typescript
// 1. Elements - mutateElement function
// ❌ WRONG - Direct mutation
element.x = 100;

// ✅ CORRECT - Immutable update
const updated = mutateElement(element, { x: 100 });

// 2. AppState - Spread operator
// ❌ WRONG
appState.zoom.value = 2;

// ✅ CORRECT
const newAppState = {
  ...appState,
  zoom: { ...appState.zoom, value: 2 }
};

// 3. Arrays - map/filter, never push/splice
// ❌ WRONG
elements.push(newElement);

// ✅ CORRECT
const newElements = [...elements, newElement];

// 4. TypeScript readonly enforcement
interface ExcalidrawElement {
  readonly id: string;
  readonly x: number;
  readonly y: number;
}

element.x = 100;  // ❌ TypeScript error!
```

**Why immutability is critical:**

**1. React Optimization**
```typescript
// Shallow comparison is fast
prevElements === nextElements  // False if changed
// React knows to re-render
```

**2. Undo/Redo**
```typescript
// Store snapshots safely
const history = [state1, state2, state3];
// Restore: just use old reference
const restored = history[1];  // state2 unchanged
```

**3. Collaboration**
```typescript
// Detect changes by reference
if (localElement !== remoteElement) {
  // Something changed, need to sync
}
```

**4. Predictable Debugging**
```typescript
console.log("Before:", elements);
processElements();
console.log("After:", elements);
// "Before" still shows original (not mutated)
```

**Pattern:** Read old, create new, return new. Never modify in place.
x??
