# Element System Flashcards

#### Element Type Hierarchy
Excalidraw supports 11 different element types, each representing a different shape or object on the canvas. All elements share common properties (position, size, color, etc.) defined in the base ExcalidrawElement interface, but each type adds specific properties. For example, arrows have binding points, text elements have font properties, and images have file references. This inheritance-like structure (through TypeScript discriminated unions) ensures type safety while allowing shared behavior.

```typescript
// Base element properties (all elements have these)
interface ExcalidrawElement {
  id: string;
  type: "rectangle" | "diamond" | "ellipse" | "arrow" | ...;
  x: number;
  y: number;
  width: number;
  height: number;
  angle: number;
  strokeColor: string;
  backgroundColor: string;
  // ... more common properties
}

// Specific element types add extra properties
interface ExcalidrawArrowElement extends ExcalidrawElement {
  type: "arrow";
  startBinding: Binding | null;  // Arrow-specific
  endBinding: Binding | null;    // Arrow-specific
}

interface ExcalidrawTextElement extends ExcalidrawElement {
  type: "text";
  fontSize: number;        // Text-specific
  fontFamily: number;      // Text-specific
  text: string;            // Text-specific
}
```

:p What are the 11 element types in Excalidraw and how are common properties shared between them?
??x
**11 Element Types:**
1. Rectangle
2. Diamond
3. Ellipse
4. Arrow
5. Line
6. Text
7. Image
8. Frame
9. Magicframe
10. Embeddable
11. Iframe

**Property sharing via TypeScript discriminated unions:**

```typescript
// Base interface with common properties
interface ExcalidrawElementBase {
  id: string;
  x: number;
  y: number;
  width: number;
  height: number;
  strokeColor: string;
  // ... 30+ common properties
}

// Specific types extend with unique properties
type ExcalidrawElement =
  | ExcalidrawRectangleElement   // adds roundness
  | ExcalidrawArrowElement       // adds bindings
  | ExcalidrawTextElement        // adds fontSize, text
  | ...
```

This ensures type safety while allowing shared behavior.

Located in: `packages/element/src/types.ts`
x??

---

#### mutateElement Pattern
The mutateElement function is the correct way to modify elements in Excalidraw. It ensures immutability by creating a new element object with the updates, increments version numbers for change tracking, and maintains type safety. Direct mutation would break React's rendering optimization and collaboration features. The function takes the element, an object of properties to update, and an optional informMutation flag.

```typescript
// mutateElement signature
function mutateElement(
  element: ExcalidrawElement,
  updates: Partial<ExcalidrawElement>,
  informMutation: boolean = true
): ExcalidrawElement

// ❌ WRONG - Direct mutation
element.x = 100;
element.y = 200;
element.version++; // Manually tracking version

// ✅ CORRECT - Using mutateElement
const newElement = mutateElement(element, {
  x: 100,
  y: 200
});
// Automatically:
// - Creates new object
// - Increments version
// - Increments versionNonce
// - Preserves other properties
```

:p What is mutateElement and why must you use it instead of directly modifying element properties?
??x
**mutateElement** is the correct function to modify element properties in Excalidraw.

**Why it's required:**

1. **Immutability** - Creates new object instead of mutating
2. **Version tracking** - Auto-increments version & versionNonce
3. **Collaboration** - Tracks changes for sync
4. **Type safety** - Ensures valid property updates

```typescript
// ❌ WRONG - Direct mutation breaks everything
element.x = 100;
element.strokeColor = "red";

// ✅ CORRECT - Immutable update
const updated = mutateElement(element, {
  x: 100,
  strokeColor: "red"
});

// What mutateElement does internally:
{
  ...element,           // Copy all properties
  x: 100,              // Apply updates
  strokeColor: "red",
  version: element.version + 1,      // Auto-increment
  versionNonce: generateNonce()      // New nonce
}
```

**Result:** React detects change, collaboration syncs, undo/redo works.
x??

---

#### Element Versioning for Collaboration
Every element has two version fields: version (integer that increments with each change) and versionNonce (random number that changes with each modification). This dual versioning enables conflict resolution in collaborative editing. When two users edit the same element simultaneously, the system can detect conflicts using version numbers and resolve them using versionNonce as a tiebreaker. This ensures last-write-wins behavior without data loss.

```typescript
interface ExcalidrawElement {
  version: number;        // Incremental counter
  versionNonce: number;   // Random number (tiebreaker)
  // ... other properties
}

// Collaboration conflict resolution pseudocode
function mergeElement(local, remote) {
  // Check version first
  if (remote.version > local.version) {
    return remote; // Remote is newer
  } else if (local.version > remote.version) {
    return local;  // Local is newer
  } else {
    // Same version (simultaneous edit)
    // Use versionNonce as tiebreaker
    return remote.versionNonce > local.versionNonce
      ? remote
      : local;
  }
}

// Every mutation updates both
mutateElement(element, { x: 100 });
// → version: 5 → 6
// → versionNonce: 123456 → 789012 (new random)
```

:p Explain the dual versioning system (version and versionNonce) used in Excalidraw elements and why both are needed.
??x
Excalidraw uses **dual versioning** for collaboration conflict resolution:

**1. version (integer counter):**
- Increments with each change: 1 → 2 → 3
- Tracks how many times element was modified
- Used to detect newer changes

**2. versionNonce (random number):**
- Changes to random value on each update
- Acts as tiebreaker for simultaneous edits
- Ensures deterministic conflict resolution

```typescript
// Conflict resolution logic
function resolveConflict(localEl, remoteEl) {
  // First: Compare version
  if (remoteEl.version > localEl.version) {
    return remoteEl; // Remote is newer
  }
  if (localEl.version > remoteEl.version) {
    return localEl;  // Local is newer
  }

  // Both have same version (simultaneous edit!)
  // Second: Use versionNonce as tiebreaker
  return remoteEl.versionNonce > localEl.versionNonce
    ? remoteEl
    : localEl;
}
```

**Why both are needed:**
- version alone can't resolve simultaneous edits
- versionNonce provides deterministic tiebreaker
- Together they enable last-write-wins without data loss
x??

---

#### Scene Class Architecture
The Scene class is Excalidraw's central manager for elements. Instead of just using an array, Scene maintains multiple internal Maps for fast lookups (by ID, by type, etc.), manages element ordering for rendering, and provides methods for querying elements. This architecture optimizes performance for large drawings where you frequently need to find elements by ID or get all elements of a certain type.

```typescript
// Scene class structure (simplified)
class Scene {
  private elements: readonly ExcalidrawElement[];
  private elementsMap: Map<string, ExcalidrawElement>;
  private selectedElementsCache: WeakMap<...>;

  // Fast lookup by ID - O(1) instead of O(n)
  getElement(id: string): ExcalidrawElement | null {
    return this.elementsMap.get(id) || null;
  }

  // Get non-deleted elements
  getNonDeletedElements(): ExcalidrawElement[] {
    return this.elements.filter(el => !el.isDeleted);
  }

  // Replace all elements (updates internal maps)
  replaceAllElements(elements: ExcalidrawElement[]) {
    this.elements = elements;
    this.elementsMap = new Map(
      elements.map(el => [el.id, el])
    );
    // Update other caches...
  }
}
```

:p What is the Scene class and how does it optimize element management compared to using a simple array?
??x
**Scene class** is the central manager for elements in Excalidraw.

**Optimizations over simple arrays:**

```typescript
// ❌ Simple array approach - O(n) lookups
const elements = [el1, el2, el3, ...];
const found = elements.find(el => el.id === targetId);
// Slow for large drawings

// ✅ Scene class - O(1) lookups
class Scene {
  private elements: ExcalidrawElement[];
  private elementsMap: Map<string, ExcalidrawElement>;

  getElement(id: string) {
    return this.elementsMap.get(id); // O(1) - instant
  }

  getNonDeletedElements() {
    return this.elements.filter(el => !el.isDeleted);
  }
}
```

**Benefits:**

1. **Fast ID lookups** - Map instead of linear search
2. **Caching** - Computed values cached (selected elements, etc.)
3. **Element ordering** - Manages z-index for rendering
4. **Batch updates** - Efficient multi-element updates

Located in: `packages/excalidraw/scene/Scene.ts`

**Performance:** O(1) lookups vs O(n) for arrays with 1000+ elements.
x??

---

#### Fractional Indexing for Element Ordering
Elements in Excalidraw are rendered in a specific z-order (which appears on top). Instead of using integer indices that require renumbering when inserting elements, Excalidraw uses fractional indexing. This allows inserting elements between any two existing elements without changing other indices. An element can be inserted between index "a" and "b" by using "a5" (between "a" and "b" alphabetically).

```typescript
// Traditional integer indexing problem
elements = [
  { id: 1, index: 0 },  // Bottom
  { id: 2, index: 1 },
  { id: 3, index: 2 }   // Top
];

// Insert between id 1 and 2? Must renumber everything!
// id 2: index 1 → 2
// id 3: index 2 → 3
// New: index 1

// Fractional indexing solution
elements = [
  { id: 1, index: "a0" },  // Bottom
  { id: 2, index: "a1" },
  { id: 3, index: "a2" }   // Top
];

// Insert between id 1 and 2? Just use "a05"!
// No other elements need updating
// New: index "a05"
// Sorts as: "a0" < "a05" < "a1" < "a2"
```

:p What is fractional indexing and why does Excalidraw use it for element ordering?
??x
**Fractional indexing** uses string-based indices that allow insertion between any two elements without renumbering others.

**Problem with integer indices:**
```typescript
// Integer indices
[el0, el1, el2, el3] // indices: 0, 1, 2, 3

// Insert between 1 and 2? Must shift everything!
[el0, el1, NEW, el2, el3] // reindex: 0,1,2,3,4
// Expensive for large arrays
```

**Solution with fractional indexing:**
```typescript
// String indices
[
  { index: "a0" },
  { index: "a1" },
  { index: "a2" }
]

// Insert between "a1" and "a2"? Just use "a15"!
[
  { index: "a0" },
  { index: "a1" },
  { index: "a15" },  // NEW - no others change!
  { index: "a2" }
]

// Sort alphabetically: "a0" < "a1" < "a15" < "a2"
```

**Benefits:**
1. **No renumbering** - Only new element gets index
2. **Collaboration-friendly** - No conflicts when ordering
3. **Efficient** - O(1) insertion instead of O(n) reindexing

Critical for collaborative editing where multiple users reorder elements.
x??

---

#### Element Binding System
Arrows in Excalidraw can "bind" to other elements, meaning they stay attached when the bound element moves. Each arrow has startBinding and endBinding objects that store the bound element's ID and the attachment point. The binding system calculates the correct arrow endpoint positions based on the bound element's geometry, automatically adjusting when elements resize or rotate.

```typescript
// Arrow binding structure
interface ExcalidrawArrowElement {
  type: "arrow";
  startBinding: {
    elementId: string;     // ID of bound element
    focus: number;         // Position on element's edge (-1 to 1)
    gap: number;          // Distance from element
  } | null;
  endBinding: { ... } | null;
}

// Binding update pseudocode
function updateArrowPosition(arrow, elements) {
  if (arrow.startBinding) {
    const boundElement = elements.find(
      el => el.id === arrow.startBinding.elementId
    );

    // Calculate attachment point on element's edge
    const startPoint = calculateBindingPoint(
      boundElement,
      arrow.startBinding.focus
    );

    // Update arrow start position
    arrow.startPoint = [startPoint.x, startPoint.y];
  }
  // Similar for endBinding...
}
```

:p How does Excalidraw's arrow binding system work and what information is stored in a binding?
??x
**Arrow binding** allows arrows to attach to elements and follow them when moved.

**Binding structure:**
```typescript
interface Binding {
  elementId: string;    // Which element to bind to
  focus: number;        // Position on edge (-1 to 1)
  gap: number;          // Distance from element surface
}

interface ArrowElement {
  startBinding: Binding | null;  // Start attachment
  endBinding: Binding | null;    // End attachment
}
```

**How it works:**
```typescript
// 1. User connects arrow to rectangle
arrow.startBinding = {
  elementId: "rect-123",
  focus: 0.5,    // Middle of edge
  gap: 0
};

// 2. Rectangle moves
rectangle.x += 100;

// 3. Arrow automatically updates
const rect = getElement(arrow.startBinding.elementId);
const attachPoint = calculateEdgePoint(
  rect,
  arrow.startBinding.focus
);
arrow.startPoint = [attachPoint.x, attachPoint.y];
```

**Key features:**
- Auto-updates when bound element moves/resizes
- Supports rotation of bound elements
- Can bind to any element (rectangles, ellipses, etc.)

Located in: `packages/element/src/binding.ts` (68,258 lines!)
x??

---

#### Element Deletion Strategy
Excalidraw uses soft deletion instead of hard deletion. Elements are never removed from the array; instead, they're marked with isDeleted: true. This approach is crucial for collaboration (users need to sync deletions), undo/redo (need to restore deleted elements), and performance (no array splicing). The rendering and selection logic filters out deleted elements automatically.

```typescript
interface ExcalidrawElement {
  isDeleted: boolean;
  // ... other properties
}

// ❌ Hard deletion - removes from array
function deleteElement(elements, id) {
  return elements.filter(el => el.id !== id);
  // Problems:
  // - Can't undo (element is gone)
  // - Can't sync to collaborators
  // - Array indices shift
}

// ✅ Soft deletion - mark as deleted
function deleteElement(elements, id) {
  return elements.map(el =>
    el.id === id
      ? mutateElement(el, { isDeleted: true })
      : el
  );
  // Benefits:
  // - Undo: set isDeleted = false
  // - Sync: collaborators can process deletion
  // - Stable: indices don't change
}

// Filter deleted elements when needed
scene.getNonDeletedElements(); // Excludes isDeleted: true
```

:p Why does Excalidraw use soft deletion (isDeleted flag) instead of removing elements from the array?
??x
Excalidraw uses **soft deletion** - marking elements with `isDeleted: true` instead of removing them.

**Implementation:**
```typescript
// ❌ Hard deletion - removes from array
const filtered = elements.filter(el => el.id !== targetId);

// ✅ Soft deletion - marks as deleted
const updated = elements.map(el =>
  el.id === targetId
    ? mutateElement(el, { isDeleted: true })
    : el
);
```

**Why soft deletion:**

1. **Undo/Redo support**
   ```typescript
   // Undo deletion: just set isDeleted back to false
   mutateElement(deletedElement, { isDeleted: false });
   ```

2. **Collaboration sync**
   ```typescript
   // All users need to process the same deletion
   // Hard delete would lose the element immediately
   ```

3. **Performance**
   ```typescript
   // No array splicing/filtering (expensive)
   // Just update one property
   ```

4. **Stable references**
   - Element IDs remain valid
   - Array indices don't shift

**Usage:** Filter when needed via `getNonDeletedElements()`
x??

---

#### Element Common Properties
All Excalidraw elements share approximately 30 common properties that define their basic appearance and behavior. These include geometric properties (position, size, rotation), visual properties (colors, stroke width, opacity), and metadata properties (id, version, timestamps). Understanding these properties is essential because they're used across all element types and many operations modify multiple properties together.

```typescript
// Common element properties (all elements have these)
interface ExcalidrawElement {
  // Identity
  id: string;
  type: ElementType;

  // Geometry
  x: number;
  y: number;
  width: number;
  height: number;
  angle: number;

  // Visual styling
  strokeColor: string;
  backgroundColor: string;
  fillStyle: "solid" | "hachure" | "cross-hatch";
  strokeWidth: number;
  strokeStyle: "solid" | "dashed" | "dotted";
  roughness: number;
  opacity: number;

  // Metadata
  version: number;
  versionNonce: number;
  isDeleted: boolean;
  groupIds: string[];
  boundElements: Binding[];
  updated: number;  // Timestamp
  link: string | null;
  locked: boolean;
}
```

:p What are the three main categories of common properties shared by all Excalidraw elements?
??x
All Excalidraw elements share **~30 common properties** in three categories:

**1. Geometric Properties (Position & Transform):**
```typescript
{
  x: number;              // X position
  y: number;              // Y position
  width: number;          // Width
  height: number;         // Height
  angle: number;          // Rotation in radians
}
```

**2. Visual Properties (Appearance):**
```typescript
{
  strokeColor: string;    // Border color
  backgroundColor: string; // Fill color
  strokeWidth: number;    // Border thickness
  strokeStyle: "solid" | "dashed" | "dotted";
  fillStyle: "solid" | "hachure" | "cross-hatch";
  roughness: number;      // Hand-drawn look (0-2)
  opacity: number;        // Transparency (0-100)
}
```

**3. Metadata Properties (State & Tracking):**
```typescript
{
  id: string;             // Unique identifier
  version: number;        // Change counter
  versionNonce: number;   // Conflict resolution
  isDeleted: boolean;     // Soft deletion
  groupIds: string[];     // Group membership
  locked: boolean;        // Prevent editing
  updated: number;        // Last modified timestamp
}
```

Located in: `packages/element/src/types.ts`
x??

---

#### newElement Factory Pattern
Creating new elements in Excalidraw uses factory functions (newElement, newRectangleElement, etc.) instead of manual object construction. These factories ensure all required properties are initialized with correct defaults, type-specific properties are set appropriately, and unique IDs and version numbers are generated. This pattern prevents bugs from missing properties and ensures consistency across the codebase.

```typescript
// ❌ Manual element creation - easy to miss properties
const element = {
  id: generateId(),
  type: "rectangle",
  x: 0,
  y: 0,
  width: 100,
  height: 100,
  // Oops! Forgot strokeColor, backgroundColor, version, etc.
  // Element will be invalid
};

// ✅ Factory function - all defaults provided
const element = newRectangleElement({
  x: 0,
  y: 0,
  width: 100,
  height: 100,
  // Factory provides:
  // - id: auto-generated
  // - strokeColor: default color
  // - backgroundColor: default color
  // - version: 1
  // - versionNonce: generated
  // - All ~30 common properties with defaults
});

// Factory signature
function newRectangleElement(
  opts: {
    x: number;
    y: number;
    width: number;
    height: number;
    // ... optional overrides
  }
): ExcalidrawRectangleElement
```

:p Why does Excalidraw use factory functions like newRectangleElement instead of manual object creation?
??x
Excalidraw uses **factory functions** to create elements safely and consistently.

**Problems with manual creation:**
```typescript
// ❌ Manual - easy to forget properties
const element = {
  id: "123",
  type: "rectangle",
  x: 0,
  y: 0,
  // Missing: width, height, strokeColor, version...
  // Result: Invalid element, bugs, crashes
};
```

**Factory function approach:**
```typescript
// ✅ Factory - all defaults provided
const element = newRectangleElement({
  x: 0,
  y: 0,
  width: 100,
  height: 100
});

// Automatically provides:
// - id: generateId()
// - version: 1
// - versionNonce: generateNonce()
// - strokeColor: default
// - backgroundColor: default
// - opacity: 100
// - roughness: 1
// - ... all 30+ properties
```

**Benefits:**

1. **Consistency** - Same defaults everywhere
2. **Type safety** - TypeScript ensures valid properties
3. **Maintenance** - Add new properties in one place
4. **Error prevention** - Can't forget required properties

```typescript
// Available factories:
newRectangleElement(opts)
newDiamondElement(opts)
newArrowElement(opts)
newTextElement(opts)
// ... for each type
```
x??
