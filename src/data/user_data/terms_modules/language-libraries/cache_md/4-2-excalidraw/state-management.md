# State Management Flashcards

#### Jotai Atomic State Pattern
Excalidraw uses Jotai for state management, which provides atomic, fine-grained reactivity. Unlike traditional Redux where you have one big state tree, Jotai splits state into small "atoms" that components can subscribe to individually. This means components only re-render when the specific atoms they use change, not when any part of the global state changes.

```typescript
// Example atom definition
const zoomAtom = atom({ value: 1 });

// Component using the atom
function ZoomDisplay() {
  const [zoom] = useAtom(zoomAtom);
  // Only re-renders when zoom changes, not when other state changes
  return <div>Zoom: {zoom.value}%</div>;
}
```

:p What state management library does Excalidraw use and what is its key benefit over traditional state management?
??x
Excalidraw uses **Jotai** for atomic state management.

**Key benefit:** Fine-grained reactivity - components only re-render when the specific atoms they subscribe to change, not when any global state changes.

Example:
```typescript
const selectedElementsAtom = atom([]);
// Component using this atom only re-renders when selectedElements change
```

This improves performance by avoiding unnecessary re-renders.
x??

---

#### Jotai Scope for Multiple Instances
A unique challenge in Excalidraw is supporting multiple editor instances on the same page. Jotai-scope solves this by creating isolated state "scopes" for each instance. Without this, all instances would share the same atoms and interfere with each other.

```typescript
// Pseudocode showing scope isolation
// Instance 1 scope
const scope1 = createScope();
// zoom = 100% in this scope

// Instance 2 scope
const scope2 = createScope();
// zoom = 200% in this scope (different from Instance 1)

// Each instance has its own state, no interference
```

:p Why does Excalidraw use jotai-scope and what problem does it solve?
??x
Excalidraw uses **jotai-scope** to allow **multiple editor instances** on the same page without state interference.

**Problem solved:** Without scope, all instances would share the same atoms, causing:
- Selecting elements in instance 1 would select them in instance 2
- Zooming in instance 1 would zoom instance 2
- All instances would have the same state

**Solution:** Each Excalidraw instance gets its own scope:
```typescript
<Provider scope={scope1}>
  <Excalidraw /> {/* Instance 1 */}
</Provider>
<Provider scope={scope2}>
  <Excalidraw /> {/* Instance 2 */}
</Provider>
```

Each instance maintains independent state.
x??

---

#### AppState Structure
The AppState object is the main application state containing 100+ properties that define the entire editor state. It's organized into logical groups: tool state (what tool is active), UI state (what's selected, visible), and view state (zoom, scroll position). This centralized structure makes it easy to save/restore the entire editor state or pass it between components.

```typescript
// Simplified AppState structure
interface AppState {
  // Tool state
  activeTool: { type: "rectangle" | "arrow" | "selection" },
  currentItemStrokeColor: string,

  // UI state
  selectedElementIds: { [id: string]: boolean },
  multiElement: Element | null,

  // View state
  zoom: { value: number },
  scrollX: number,
  scrollY: number,

  // ... 100+ more properties
}
```

:p What is AppState and what are its three main categories of properties?
??x
**AppState** is the main application state object containing 100+ properties that define the entire editor state.

**Three main categories:**

1. **Tool State** - Active tool and tool options
   ```typescript
   activeTool: { type: "rectangle" }
   currentItemStrokeColor: "#000000"
   ```

2. **UI State** - Selection, dialogs, multi-select
   ```typescript
   selectedElementIds: { "elem1": true, "elem2": true }
   editingElement: null
   ```

3. **View State** - Zoom, scroll, viewport
   ```typescript
   zoom: { value: 1.5 }
   scrollX: 100
   scrollY: 200
   ```

Located in: `packages/excalidraw/appState.ts`
x??

---

#### React Context Tree Communication
While Jotai handles reactive state, React Context is used for dependency injection and tree-wide communication. Excalidraw uses multiple contexts to provide different capabilities down the component tree without prop drilling. For example, AppContext provides access to the app instance, DeviceContext provides device capabilities (touch support, etc.), and ExcalidrawContainerContext provides container-level state.

```typescript
// Pseudocode showing context usage
function App() {
  return (
    <AppContext.Provider value={appInstance}>
      <DeviceContext.Provider value={deviceInfo}>
        <ExcalidrawContainerContext.Provider value={containerState}>
          <LayerUI />
          <Canvas />
        </ExcalidrawContainerContext.Provider>
      </DeviceContext.Provider>
    </AppContext.Provider>
  );
}

// Deep child component can access without prop drilling
function DeepChild() {
  const app = useContext(AppContext);
  const device = useContext(DeviceContext);
  // No need to pass through intermediate components
}
```

:p What is React Context used for in Excalidraw and name two context providers used?
??x
React Context is used for **dependency injection** and **tree-wide communication** without prop drilling.

**Key contexts:**

1. **AppContext** - Provides access to the app instance
   - Methods like `updateScene()`, `addFiles()`
   - Central app functionality

2. **DeviceContext** - Provides device capabilities
   - Touch support detection
   - Screen size information
   - Platform-specific features

3. **ExcalidrawContainerContext** - Container-level state
   - Container dimensions
   - Container-specific settings

```typescript
function ChildComponent() {
  const app = useContext(AppContext);
  const device = useContext(DeviceContext);
  // Access without prop drilling through parents
}
```
x??

---

#### State Immutability Pattern
Excalidraw follows strict immutability for all state updates. Instead of modifying state objects directly, you create new objects with the changes. This is crucial for React's rendering optimization and enables features like undo/redo. The pattern is: read the old state, create a new object with spread operator, modify the needed properties, and return the new object.

```typescript
// ❌ WRONG - Direct mutation
appState.zoom.value = 2;
element.x = 100;

// ✅ CORRECT - Immutable update
const newAppState = {
  ...appState,
  zoom: { ...appState.zoom, value: 2 }
};

const newElement = {
  ...element,
  x: 100
};

// For elements, use the helper function
const newElement = mutateElement(element, { x: 100 });
```

:p Why does Excalidraw require immutability for state updates and what's the correct pattern?
??x
Excalidraw requires **immutability** for:

1. **React rendering optimization** - React compares references to detect changes
2. **Undo/redo functionality** - Stores previous state snapshots
3. **Collaboration** - Tracks versions and changes
4. **Predictability** - No side effects from mutations

**Correct pattern:**
```typescript
// ❌ WRONG - Direct mutation
element.x = 100;
appState.zoom = 2;

// ✅ CORRECT - Create new objects
const newElement = mutateElement(element, {
  x: 100
});

const newAppState = {
  ...appState,
  zoom: { ...appState.zoom, value: 2 }
};
```

**Key rule:** Never modify objects in place, always create new ones.
x??

---

#### Hybrid State Management Architecture
Excalidraw uses a hybrid approach combining Jotai atoms for reactive state and React Context for dependency injection. This gives the benefits of both: Jotai's fine-grained reactivity prevents unnecessary re-renders, while Context provides clean access to app instances and utilities without prop drilling. The combination is more flexible than using just one approach.

```typescript
// Hybrid architecture pseudocode
function Excalidraw() {
  // Jotai for reactive state
  const [appState, setAppState] = useAtom(appStateAtom);
  const [elements, setElements] = useAtom(elementsAtom);

  // Context for dependency injection
  const appInstance = {
    updateScene: (elements) => setElements(elements),
    getAppState: () => appState,
    // ... other methods
  };

  return (
    <AppContext.Provider value={appInstance}>
      {/* Children can use both:
          - useAtom for reactive state
          - useContext for app instance methods */}
      <Canvas />
    </AppContext.Provider>
  );
}
```

:p Explain Excalidraw's hybrid state management approach and the benefit of combining Jotai with React Context.
??x
Excalidraw uses a **hybrid state management** approach:

**Jotai (Atomic State):**
- Fine-grained reactive state
- Components subscribe to specific atoms
- Prevents unnecessary re-renders

**React Context (Dependency Injection):**
- Provides app instance methods
- Device capabilities
- Container state
- No prop drilling needed

**Benefits of combination:**
```typescript
function Component() {
  // Jotai: Reactive state (auto re-render on change)
  const [zoom] = useAtom(zoomAtom);

  // Context: Methods and utilities (no re-render)
  const app = useContext(AppContext);

  // Best of both: reactive data + utility methods
  return <button onClick={() => app.zoomToFit()}>
    Current: {zoom.value}%
  </button>;
}
```

This provides reactivity where needed and clean API access everywhere.
x??

---

#### State Persistence Strategy
Excalidraw persists state to enable saving and loading drawings. The state is serialized to JSON and can be stored in multiple ways: browser IndexedDB for local autosave, JSON files for export/import, or PNG files with embedded JSON metadata. The serialization process carefully handles only the necessary state (elements, appState subset, files) and maintains backward compatibility through migration logic.

```typescript
// Pseudocode for state persistence
function serializeState(elements, appState) {
  return {
    type: "excalidraw",
    version: 2,
    source: "excalidraw.com",
    elements: elements.map(serializeElement),
    appState: {
      // Only persist relevant appState properties
      viewBackgroundColor: appState.viewBackgroundColor,
      currentItemStrokeColor: appState.currentItemStrokeColor,
      // Don't persist: selectedElementIds, editingElement, etc.
    },
    files: files
  };
}

// Can be saved to:
// 1. IndexedDB - Local autosave
// 2. JSON file - Export
// 3. PNG metadata - Image with embedded data
```

:p How does Excalidraw persist state and what are the three storage methods used?
??x
Excalidraw **serializes state to JSON** containing elements, appState subset, and files.

**Three storage methods:**

1. **IndexedDB (Local Autosave)**
   ```typescript
   // Browser storage for automatic saving
   await saveToLocalStorage(sceneData);
   // Persists across page reloads
   ```

2. **JSON File (Export/Import)**
   ```json
   {
     "type": "excalidraw",
     "version": 2,
     "elements": [...],
     "appState": {...}
   }
   ```

3. **PNG with Metadata (Image Export)**
   ```typescript
   // JSON embedded in PNG file metadata
   // Open image file → extract → restore full scene
   ```

**Key insight:** Only persists necessary state (not UI state like selection), and includes migration logic for backward compatibility.

Located in: `packages/excalidraw/data/`
x??

---

#### State Update Flow Pattern
When state needs to change in Excalidraw, there's a specific flow: the change is initiated (user action or API call), the update function creates new state objects immutably, Jotai atoms are updated which triggers React re-renders for subscribed components, the Scene updates its internal state, and finally the canvas re-renders with the new state. This unidirectional flow ensures predictable state changes.

```typescript
// State update flow pseudocode
// 1. User action triggers change
function handleElementMove(elementId, newX, newY) {

  // 2. Create new state immutably
  const newElements = elements.map(el =>
    el.id === elementId
      ? mutateElement(el, { x: newX, y: newY })
      : el
  );

  // 3. Update atom (triggers Jotai)
  setElementsAtom(newElements);

  // 4. Jotai notifies subscribed components
  // → Components using elementsAtom re-render

  // 5. Scene updates internal maps
  scene.replaceAllElements(newElements);

  // 6. Canvas re-renders
  renderCanvas();
}
```

:p Describe the state update flow in Excalidraw from user action to canvas re-render.
??x
**State Update Flow (6 steps):**

```typescript
// 1. ACTION: User drags element
handleDrag(elementId, newX, newY);

// 2. IMMUTABLE UPDATE: Create new state
const newElements = elements.map(el =>
  el.id === elementId
    ? mutateElement(el, { x: newX, y: newY })
    : el
);

// 3. ATOM UPDATE: Trigger Jotai
setElementsAtom(newElements);

// 4. REACT RE-RENDER: Subscribed components update
// Components using elementsAtom automatically re-render

// 5. SCENE UPDATE: Internal state syncs
scene.replaceAllElements(newElements);

// 6. CANVAS RE-RENDER: Visual update
renderInteractiveScene();
```

**Key principle:** Unidirectional data flow ensures predictable state changes and makes debugging easier.
x??

---

#### Computed State with Jotai
Excalidraw uses Jotai's derived atoms to compute state based on other atoms. This is like computed properties - the derived value automatically updates when its dependencies change, and components using the derived atom only re-render when the computed value changes, not the underlying atoms. This pattern reduces redundant calculations and keeps components efficient.

```typescript
// Derived atom example
const selectedElementsAtom = atom((get) => {
  const elements = get(elementsAtom);
  const selectedIds = get(selectedElementIdsAtom);

  // Compute selected elements
  return elements.filter(el => selectedIds[el.id]);
});

// Component using derived atom
function SelectedCount() {
  const selectedElements = useAtom(selectedElementsAtom);
  // Only re-renders when selected elements actually change
  // Not when elements or selectedIds change separately
  return <div>Selected: {selectedElements.length}</div>;
}
```

:p What are Jotai derived atoms and how do they optimize rendering in Excalidraw?
??x
**Jotai derived atoms** are computed state based on other atoms, similar to computed properties.

**How they work:**
```typescript
// Base atoms
const elementsAtom = atom([...]);
const selectedIdsAtom = atom({ "id1": true });

// Derived atom (computed)
const selectedElementsAtom = atom((get) => {
  const elements = get(elementsAtom);
  const selectedIds = get(selectedIdsAtom);

  return elements.filter(el => selectedIds[el.id]);
});
```

**Optimization benefits:**

1. **Automatic updates** - Recomputes when dependencies change
2. **Memoization** - Only recalculates when inputs change
3. **Selective re-renders** - Components only update when computed value changes

```typescript
function Component() {
  const selected = useAtom(selectedElementsAtom);
  // Re-renders only when RESULT changes
  // Not when elements or selectedIds change separately
}
```

This reduces redundant calculations and unnecessary re-renders.
x??
