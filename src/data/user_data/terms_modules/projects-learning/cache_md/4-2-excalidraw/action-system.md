# Action System Flashcards

#### Action System Architecture
The Action system in Excalidraw is the standardized way to perform all user operations. Instead of scattered event handlers modifying state directly, actions provide a unified interface: they receive elements and appState, perform operations, and return updated elements and appState. This architecture enables consistent undo/redo, keyboard shortcuts, toolbar buttons, and context menus to all trigger the same logic. Every user operation (copy, paste, delete, change color, etc.) is implemented as an action.

```typescript
// Action interface
interface Action {
  name: string;                    // Unique identifier
  label: string;                   // Human-readable name
  perform: (                       // The actual operation
    elements: ExcalidrawElement[],
    appState: AppState,
    formData: any,
    app: AppClassProperties
  ) => ActionResult;
  keyTest?: (event: KeyboardEvent) => boolean;  // Keyboard shortcut
  predicate?: (elements, appState) => boolean;  // When action is available
  contextItemLabel?: string;       // Context menu text
}

// Example: Delete action
const actionDelete = {
  name: "delete",
  perform: (elements, appState) => ({
    elements: elements.map(el =>
      appState.selectedElementIds[el.id]
        ? mutateElement(el, { isDeleted: true })
        : el
    ),
    appState,
    storeAction: StoreAction.CAPTURE  // Enable undo
  }),
  keyTest: (e) => e.key === "Delete" || e.key === "Backspace"
};
```

:p What is the Action system in Excalidraw and what are the key parts of an Action definition?
??x
The **Action system** is the standardized interface for all user operations in Excalidraw.

**Key parts of an Action:**

```typescript
interface Action {
  // 1. Identity
  name: string;              // "delete", "copy", "changeColor"
  label: string;             // "Delete" (for UI)

  // 2. The operation
  perform: (elements, appState, formData, app) => {
    return {
      elements: updatedElements,      // Modified elements
      appState: updatedAppState,      // Modified state
      storeAction: StoreAction.CAPTURE // Undo/redo behavior
    };
  },

  // 3. Keyboard shortcut (optional)
  keyTest: (event) => event.key === "Delete",

  // 4. Availability check (optional)
  predicate: (elements, appState) =>
    hasSelectedElements(appState),

  // 5. Context menu (optional)
  contextItemLabel: "Delete"
}
```

**Benefits:**
- Unified logic for keyboard, toolbar, menu
- Automatic undo/redo integration
- Consistent behavior across triggers
- Easy to test in isolation

Located in: `packages/excalidraw/actions/`
x??

---

#### Action perform Function Pattern
The perform function is the heart of an action - it contains the actual logic. It receives four parameters: elements array, current appState, formData (from UI inputs), and app instance (for utilities). It must return an ActionResult object containing updated elements, updated appState, and a storeAction flag that tells the undo/redo system whether to capture this change. The pattern is always: read current state, compute changes immutably, return new state.

```typescript
// perform function signature
type ActionPerform = (
  elements: readonly ExcalidrawElement[],
  appState: Readonly<AppState>,
  formData: any,
  app: AppClassProperties
) => ActionResult;

// ActionResult structure
interface ActionResult {
  elements?: ExcalidrawElement[];     // Updated elements
  appState?: AppState;                // Updated state
  storeAction: StoreAction;           // Undo/redo behavior
}

// Example implementation
perform: (elements, appState, formData, app) => {
  // 1. Read current state
  const selectedIds = appState.selectedElementIds;

  // 2. Compute new state immutably
  const newElements = elements.map(el =>
    selectedIds[el.id]
      ? mutateElement(el, { strokeColor: formData.color })
      : el
  );

  // 3. Return result
  return {
    elements: newElements,
    appState,  // Unchanged in this case
    storeAction: StoreAction.CAPTURE  // Save for undo
  };
}
```

:p What are the four parameters of an Action's perform function and what must it return?
??x
The **perform function** executes the action's logic.

**Four parameters:**

```typescript
perform: (
  // 1. elements - Current elements array
  elements: readonly ExcalidrawElement[],

  // 2. appState - Current application state
  appState: Readonly<AppState>,

  // 3. formData - User input from UI
  formData: any,

  // 4. app - App instance with utilities
  app: AppClassProperties
) => ActionResult
```

**Must return ActionResult:**

```typescript
{
  elements?: ExcalidrawElement[],  // Updated elements
  appState?: AppState,              // Updated state
  storeAction: StoreAction          // Undo/redo control
}
```

**Example:**
```typescript
perform: (elements, appState, formData, app) => {
  const newElements = elements.map(el =>
    appState.selectedElementIds[el.id]
      ? mutateElement(el, { x: el.x + 10 })
      : el
  );

  return {
    elements: newElements,
    appState,
    storeAction: StoreAction.CAPTURE  // Enable undo
  };
}
```

**Pattern:** Read → Compute immutably → Return
x??

---

#### StoreAction Enum for Undo/Redo
The storeAction field in ActionResult controls how the action interacts with the undo/redo system. StoreAction.CAPTURE means "save this state change for undo/redo", StoreAction.NONE means "don't save this change", and StoreAction.UPDATE means "update the current undo state without creating a new entry". This fine-grained control allows actions to decide whether they should be undoable (like deletions) or not (like zooming).

```typescript
enum StoreAction {
  CAPTURE = "capture",  // Save as new undo state
  NONE = "none",        // Don't save
  UPDATE = "update"     // Update current undo state
}

// Example: Delete action (should be undoable)
return {
  elements: deletedElements,
  appState,
  storeAction: StoreAction.CAPTURE  // ✅ User can undo deletion
};

// Example: Zoom action (shouldn't be undoable)
return {
  appState: { ...appState, zoom: { value: 2 } },
  storeAction: StoreAction.NONE  // ❌ Can't undo zoom
};

// Example: Continuous drag (update current undo entry)
// While dragging, update position continuously
// Only create one undo entry for the entire drag
return {
  elements: movedElements,
  appState,
  storeAction: StoreAction.UPDATE  // 🔄 Update current undo
};
```

:p What is StoreAction and what are the three possible values for controlling undo/redo behavior?
??x
**StoreAction** controls how actions interact with the undo/redo system.

**Three values:**

```typescript
enum StoreAction {
  // 1. CAPTURE - Create new undo entry
  CAPTURE = "capture",

  // 2. NONE - Don't save for undo
  NONE = "none",

  // 3. UPDATE - Modify current undo entry
  UPDATE = "update"
}
```

**When to use each:**

```typescript
// CAPTURE - User should be able to undo this
actionDelete.perform = () => ({
  elements: deletedElements,
  storeAction: StoreAction.CAPTURE
  // User can press Ctrl+Z to undo deletion
});

// NONE - Not an undoable action
actionZoom.perform = () => ({
  appState: { ...appState, zoom: 2 },
  storeAction: StoreAction.NONE
  // Zooming is not undoable
});

// UPDATE - Continuous operation (drag, resize)
onDrag.perform = () => ({
  elements: draggedElements,
  storeAction: StoreAction.UPDATE
  // Updates existing undo entry
  // One undo for entire drag, not each pixel
});
```

**Result:** Fine-grained control over what's undoable.
x??

---

#### Keyboard Shortcut with keyTest
The keyTest function determines if a keyboard event should trigger the action. It receives a KeyboardEvent and returns a boolean. You check for specific key combinations using event.key, event.ctrlKey, event.metaKey (Cmd on Mac), event.shiftKey, and event.altKey. The function should handle cross-platform differences (Ctrl on Windows/Linux, Cmd on Mac) and avoid conflicts with existing shortcuts.

```typescript
// keyTest function signature
keyTest?: (event: KeyboardEvent) => boolean;

// Example: Delete action (Delete or Backspace)
keyTest: (event) => {
  return event.key === "Delete" || event.key === "Backspace";
}

// Example: Copy (Ctrl+C or Cmd+C)
keyTest: (event) => {
  return (event.ctrlKey || event.metaKey) &&
         event.key.toLowerCase() === "c" &&
         !event.shiftKey &&
         !event.altKey;
}

// Example: Duplicate (Ctrl+D)
keyTest: (event) => {
  return (event.ctrlKey || event.metaKey) &&
         event.key.toLowerCase() === "d" &&
         !event.shiftKey;
}

// Cross-platform helper pattern
keyTest: (event) => {
  // Check modifier based on platform
  const modifier = event.ctrlKey || event.metaKey;
  return modifier && event.key === "s";
}
```

:p How do you define keyboard shortcuts for actions using keyTest and what should you check for cross-platform compatibility?
??x
**keyTest** defines keyboard shortcuts for actions.

**Basic structure:**
```typescript
keyTest: (event: KeyboardEvent) => boolean

// Example: Delete key
keyTest: (event) => {
  return event.key === "Delete" || event.key === "Backspace";
}
```

**Cross-platform modifiers:**
```typescript
// ✅ CORRECT - Works on Mac (Cmd) and Windows (Ctrl)
keyTest: (event) => {
  const cmdOrCtrl = event.metaKey || event.ctrlKey;
  return cmdOrCtrl && event.key.toLowerCase() === "c";
}

// ❌ WRONG - Only works on Windows
keyTest: (event) => {
  return event.ctrlKey && event.key === "c";
}
```

**Common patterns:**
```typescript
// Copy: Cmd/Ctrl + C
(event.ctrlKey || event.metaKey) &&
event.key === "c" &&
!event.shiftKey

// Paste: Cmd/Ctrl + V
(event.ctrlKey || event.metaKey) &&
event.key === "v"

// Duplicate: Cmd/Ctrl + D
(event.ctrlKey || event.metaKey) &&
event.key === "d"

// Save: Cmd/Ctrl + S
(event.ctrlKey || event.metaKey) &&
event.key === "s"
```

**Key checks:**
- `event.key` - The key pressed
- `event.ctrlKey` - Ctrl key (Windows/Linux)
- `event.metaKey` - Cmd key (Mac)
- `event.shiftKey` - Shift modifier
- `event.altKey` - Alt/Option modifier
x??

---

#### Action Predicate for Conditional Availability
The predicate function determines when an action should be available or visible in the UI. It receives elements and appState and returns a boolean. This allows actions to only appear in context menus when relevant (e.g., "Bring to Front" only when elements are selected) or to disable toolbar buttons when the action can't be performed. The predicate is evaluated frequently, so it should be efficient.

```typescript
// predicate function signature
predicate?: (
  elements: readonly ExcalidrawElement[],
  appState: AppState
) => boolean;

// Example: Only show when elements are selected
predicate: (elements, appState) => {
  const selectedIds = appState.selectedElementIds;
  return Object.keys(selectedIds).some(id => selectedIds[id]);
}

// Example: Only for text elements
predicate: (elements, appState) => {
  const selected = getSelectedElements(elements, appState);
  return selected.some(el => el.type === "text");
}

// Example: Only when multiple elements selected
predicate: (elements, appState) => {
  const selectedCount = Object.values(
    appState.selectedElementIds
  ).filter(Boolean).length;
  return selectedCount > 1;  // Need at least 2 for align
}

// Example: Clipboard actions need clipboard data
predicate: (elements, appState) => {
  return appState.clipboardData != null;
}
```

:p What is the predicate function in an Action and when should you use it?
??x
**predicate** determines when an action should be available in the UI.

**Signature:**
```typescript
predicate: (
  elements: readonly ExcalidrawElement[],
  appState: AppState
) => boolean
```

**Use cases:**

```typescript
// 1. Only show when elements selected
predicate: (elements, appState) => {
  return Object.keys(appState.selectedElementIds)
    .some(id => appState.selectedElementIds[id]);
}
// Result: Delete button disabled when nothing selected

// 2. Only for specific element types
predicate: (elements, appState) => {
  const selected = getSelectedElements(elements, appState);
  return selected.some(el =>
    el.type === "rectangle" || el.type === "diamond"
  );
}
// Result: "Round Corners" only for rectangles/diamonds

// 3. Only when multiple selected
predicate: (elements, appState) => {
  const count = Object.values(appState.selectedElementIds)
    .filter(Boolean).length;
  return count > 1;
}
// Result: "Align" actions need 2+ elements

// 4. Only when state permits
predicate: (elements, appState) => {
  return appState.clipboardData != null;
}
// Result: "Paste" only when clipboard has data
```

**Benefits:** Context-aware UI, disabled buttons when not applicable, cleaner menus.
x??

---

#### Action Registration Pattern
Actions must be registered to be used in Excalidraw. The register function wraps the action definition and adds it to the action manager. Once registered, actions can be triggered via keyboard shortcuts, toolbar buttons, context menus, or programmatically. The registration also validates the action definition and sets up the keyboard event listeners.

```typescript
// Import register function
import { register } from "./register";

// Define and register action in one step
export const actionChangeStrokeColor = register({
  name: "changeStrokeColor",
  label: "Change stroke color",
  perform: (elements, appState, formData) => {
    // ... implementation
  },
  // ... other properties
});

// Later, action can be triggered in multiple ways:

// 1. Via keyboard (automatic via keyTest)
// User presses Ctrl+S → action executes

// 2. Via toolbar button
<button onClick={() =>
  actionChangeStrokeColor.perform(elements, appState, formData)
}>
  Change Color
</button>

// 3. Via context menu (automatic via contextItemLabel)
// Right-click → "Change stroke color" → action executes

// 4. Programmatically
const result = actionChangeStrokeColor.perform(
  elements,
  appState,
  { color: "#ff0000" },
  app
);
```

:p How do you register an action in Excalidraw and what are the four ways to trigger a registered action?
??x
**Action registration** makes actions available throughout Excalidraw.

**How to register:**
```typescript
import { register } from "./register";

export const actionMyAction = register({
  name: "myAction",
  label: "My Action",
  perform: (elements, appState) => {
    // Implementation
    return { elements, appState, storeAction: StoreAction.CAPTURE };
  },
  keyTest: (e) => e.key === "m",
  contextItemLabel: "Do My Action"
});

// Export in actions/index.tsx
export { actionMyAction } from "./actionMyAction";
```

**Four ways to trigger:**

```typescript
// 1. Keyboard shortcut (automatic)
// User presses 'm' → action executes via keyTest

// 2. Toolbar button
<button onClick={() =>
  actionMyAction.perform(elements, appState)
}>
  My Action
</button>

// 3. Context menu (automatic)
// Right-click → "Do My Action" → executes via contextItemLabel

// 4. Programmatically
const result = actionMyAction.perform(
  elements,
  appState,
  formData,
  app
);
```

**Result:** One action definition, multiple trigger points with consistent behavior.
x??

---

#### Action Categories in Excalidraw
Excalidraw has 44+ actions organized into logical categories. Canvas actions control the view (zoom, grid), clipboard actions handle copy/paste, property actions modify element appearance (color, stroke, opacity), editing actions manipulate elements (delete, duplicate, align), navigation actions control viewport (scroll, zoom to fit), and history actions handle undo/redo. Understanding these categories helps you find existing actions and know where to add new ones.

```typescript
// Action categories with examples

// CANVAS: View and canvas settings
- actionToggleGrid       // Show/hide grid
- actionToggleStats      // Show statistics
- actionZoomIn/Out       // Zoom controls

// CLIPBOARD: Copy/paste operations
- actionCopy             // Ctrl+C
- actionPaste            // Ctrl+V
- actionCut              // Ctrl+X
- actionCopyAsPng        // Export as image

// PROPERTIES: Element appearance
- actionChangeStrokeColor      // Border color
- actionChangeBackgroundColor  // Fill color
- actionChangeStrokeWidth      // Border thickness
- actionChangeOpacity          // Transparency

// EDITING: Element manipulation
- actionDeleteSelected         // Delete
- actionDuplicateSelection     // Duplicate
- actionFlipHorizontal         // Flip
- actionAlignLeft/Right        // Alignment

// NAVIGATION: Viewport control
- actionZoomToFit              // Fit to screen
- actionZoomToSelection        // Focus selected

// HISTORY: Undo/redo
- actionUndo                   // Ctrl+Z
- actionRedo                   // Ctrl+Shift+Z
```

:p What are the six main categories of actions in Excalidraw and give two examples from each?
??x
Excalidraw has **44+ actions** organized into **six categories:**

**1. CANVAS - View and canvas settings**
```typescript
actionToggleGrid       // Show/hide grid
actionToggleStats      // Show statistics
```

**2. CLIPBOARD - Copy/paste operations**
```typescript
actionCopy             // Ctrl+C copy
actionPaste            // Ctrl+V paste
```

**3. PROPERTIES - Element appearance**
```typescript
actionChangeStrokeColor       // Change border color
actionChangeBackgroundColor   // Change fill color
```

**4. EDITING - Element manipulation**
```typescript
actionDeleteSelected          // Delete elements
actionDuplicateSelection      // Duplicate elements
```

**5. NAVIGATION - Viewport control**
```typescript
actionZoomToFit              // Fit canvas to screen
actionZoomToSelection        // Focus on selected
```

**6. HISTORY - Undo/redo**
```typescript
actionUndo                   // Ctrl+Z undo
actionRedo                   // Ctrl+Shift+Z redo
```

Located in: `packages/excalidraw/actions/` (each category has its own files)

**Pattern:** Group related actions together for organization and discoverability.
x??

---

#### Action Context Menu Integration
Actions can automatically appear in the context menu (right-click menu) by setting the contextItemLabel property. When a user right-clicks, Excalidraw evaluates each action's predicate to determine if it should be shown, then displays the actions with their contextItemLabel. This provides a discoverable way for users to access actions beyond keyboard shortcuts.

```typescript
// Action with context menu integration
export const actionBringToFront = register({
  name: "bringToFront",
  label: "Bring to Front",

  // Text shown in context menu
  contextItemLabel: "Bring to front",

  // Only show when elements are selected
  predicate: (elements, appState) => {
    return Object.values(appState.selectedElementIds)
      .some(Boolean);
  },

  perform: (elements, appState) => {
    // Move selected elements to end of array (renders on top)
    // ... implementation
  },

  keyTest: (e) => (e.ctrlKey || e.metaKey) && e.key === "]"
});

// Context menu rendering (automatic)
// User right-clicks → Excalidraw checks all actions
// For each action:
//   - If predicate returns true
//   - And contextItemLabel is defined
//   - Show menu item with contextItemLabel text
//   - Click → execute perform function
```

:p How do actions integrate with the context menu and what properties control their appearance?
??x
Actions integrate with the **context menu** (right-click menu) automatically.

**Required properties:**
```typescript
export const actionMyAction = register({
  name: "myAction",

  // 1. Label for context menu
  contextItemLabel: "Do My Action",

  // 2. When to show (optional but recommended)
  predicate: (elements, appState) => {
    return hasSelectedElements(appState);
  },

  perform: (elements, appState) => {
    // ... implementation
  }
});
```

**How it works:**
```typescript
// User right-clicks
onContextMenu(event) {
  const menuItems = [];

  // For each registered action
  for (const action of allActions) {
    // Check if action has context menu label
    if (action.contextItemLabel) {
      // Check if action is available
      if (!action.predicate || action.predicate(elements, appState)) {
        // Add to menu
        menuItems.push({
          label: action.contextItemLabel,
          onClick: () => action.perform(elements, appState)
        });
      }
    }
  }

  // Show context menu with items
  showContextMenu(menuItems);
}
```

**Result:**
- User right-clicks → sees "Do My Action"
- Clicks → perform executes
- Only shows when predicate returns true
x??

---

#### Action Form Data Pattern
Some actions need user input beyond the current selection (like a color picker for changing colors). The formData parameter in the perform function receives data from UI components like dialogs, popovers, or toolbar inputs. This allows actions to be parameterized - the same action can be used with different input values, and the UI can be decoupled from the action logic.

```typescript
// Action that uses form data
export const actionChangeStrokeColor = register({
  name: "changeStrokeColor",
  label: "Change stroke color",

  perform: (elements, appState, formData, app) => {
    // formData contains color from color picker
    const newColor = formData.color;

    const newElements = elements.map(el =>
      appState.selectedElementIds[el.id]
        ? mutateElement(el, { strokeColor: newColor })
        : el
    );

    return {
      elements: newElements,
      appState,
      storeAction: StoreAction.CAPTURE
    };
  }
});

// UI component provides formData
function ColorPicker() {
  const [color, setColor] = useState("#000000");

  return (
    <input
      type="color"
      value={color}
      onChange={(e) => {
        setColor(e.target.value);
        // Execute action with color as formData
        actionChangeStrokeColor.perform(
          elements,
          appState,
          { color: e.target.value },  // ← formData
          app
        );
      }}
    />
  );
}
```

:p What is formData in an action's perform function and how does it enable parameterized actions?
??x
**formData** is the third parameter in perform, containing user input from UI components.

**Purpose:** Allows actions to receive parameters from the UI.

```typescript
// Action definition
perform: (
  elements,
  appState,
  formData,    // ← Data from UI inputs
  app
) => {
  // Use formData values
  const color = formData.color;
  const size = formData.size;

  // Apply to elements
  const updated = elements.map(el =>
    appState.selectedElementIds[el.id]
      ? mutateElement(el, { strokeColor: color })
      : el
  );

  return { elements: updated, ... };
}
```

**UI provides formData:**
```typescript
// Color picker
<input
  type="color"
  onChange={(e) => {
    actionChangeStrokeColor.perform(
      elements,
      appState,
      { color: e.target.value },  // formData
      app
    );
  }}
/>

// Slider
<input
  type="range"
  onChange={(e) => {
    actionChangeOpacity.perform(
      elements,
      appState,
      { opacity: Number(e.target.value) },  // formData
      app
    );
  }}
/>
```

**Benefits:**
- Decouples action logic from UI
- Same action with different inputs
- Easy to test (just pass different formData)
- Reusable across multiple UI components
x??
