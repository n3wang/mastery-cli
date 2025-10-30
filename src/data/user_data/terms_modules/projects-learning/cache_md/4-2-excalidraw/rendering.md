# Rendering System Flashcards

#### Three-Canvas Architecture
Excalidraw uses three separate HTML canvas elements instead of one. The StaticCanvas renders non-moving elements (background) and updates infrequently, the InteractiveCanvas renders moving elements and selection UI and updates frequently, and the NewElementCanvas renders the element being currently drawn. This separation dramatically improves performance because you can redraw just the interactive layer without re-rendering the entire scene, which would be expensive for large drawings.

```typescript
// Three-canvas structure
<div className="excalidraw">
  {/* Layer 1: Static background (rarely updates) */}
  <canvas
    className="static-canvas"
    // Renders: Grid, non-selected elements
    // Updates: On pan, zoom, or element changes
  />

  {/* Layer 2: Interactive foreground (frequently updates) */}
  <canvas
    className="interactive-canvas"
    // Renders: Selected elements, selection UI, handles
    // Updates: On every mouse move, selection change
  />

  {/* Layer 3: New element preview (temporary) */}
  <canvas
    className="new-element-canvas"
    // Renders: Element being drawn
    // Updates: On every mouse move while drawing
  />
</div>

// Performance comparison:
// ❌ Single canvas: Redraw 1000 elements on mouse move
// ✅ Three canvas: Redraw only selected elements + new element
```

:p What are the three canvases in Excalidraw's rendering system and what does each one render?
??x
Excalidraw uses a **three-canvas architecture** for performance:

**1. StaticCanvas (Background Layer)**
```typescript
// Renders: Non-moving content
- Grid (if enabled)
- Non-selected elements
- Background

// Updates: Infrequently
- When panning/zooming
- When elements are added/deleted
- When selection changes
```

**2. InteractiveCanvas (Foreground Layer)**
```typescript
// Renders: Dynamic content
- Selected elements
- Selection boxes
- Resize handles
- Bounding boxes

// Updates: Frequently
- On mouse move
- During selection
- While dragging
```

**3. NewElementCanvas (Temporary Layer)**
```typescript
// Renders: Work in progress
- Element currently being drawn
- Preview during creation

// Updates: Continuously
- Every mouse move while drawing
- Cleared when drawing completes
```

**Performance benefit:**
```typescript
// Drawing with 1000 elements
// ❌ Single canvas: Redraw all 1000 elements per frame
// ✅ Three canvas: Redraw only ~3 selected elements per frame
```

Located in: `packages/excalidraw/renderer/`
x??

---

#### RoughJS for Hand-Drawn Style
Excalidraw uses RoughJS library to achieve its signature hand-drawn look. RoughJS takes geometric shapes (rectangles, ellipses, lines) and renders them with a sketchy, hand-drawn appearance using configurable parameters like roughness (how sketchy), stroke width, and fill style (solid, hachure, cross-hatch). This gives Excalidraw its unique aesthetic that feels more organic than traditional vector graphics.

```typescript
// RoughJS usage in Excalidraw
import rough from "roughjs";

// Create rough canvas
const rc = rough.canvas(canvasElement);

// Render rectangle with hand-drawn style
rc.rectangle(
  x, y, width, height,
  {
    stroke: "#000000",           // Border color
    strokeWidth: 2,              // Border thickness
    fill: "#ff0000",             // Fill color
    fillStyle: "hachure",        // Hatch pattern fill
    roughness: 1.5,              // How sketchy (0 = perfect, 2 = very rough)
    bowing: 1,                   // Curve in straight lines
    seed: 12345                  // Random seed for consistency
  }
);

// Roughness comparison:
// roughness: 0   → Perfect geometric shape
// roughness: 1   → Slightly hand-drawn
// roughness: 2   → Very sketchy

// Fill styles:
// "solid"        → Solid fill
// "hachure"      → Diagonal lines
// "cross-hatch"  → Crossed lines
// "dots"         → Dotted pattern
```

:p What is RoughJS and how does it create Excalidraw's hand-drawn appearance?
??x
**RoughJS** is a library that renders geometric shapes with a hand-drawn, sketchy appearance.

**How it works:**
```typescript
import rough from "roughjs";

const rc = rough.canvas(canvasElement);

// Render rectangle with hand-drawn style
rc.rectangle(x, y, width, height, {
  stroke: "#000000",
  strokeWidth: 2,

  // Hand-drawn parameters:
  roughness: 1.5,    // 0 = perfect, 2 = very sketchy
  bowing: 1,         // Curve in straight lines
  seed: 123          // Consistent randomness
});
```

**Key parameters:**

**1. Roughness** (sketchiness level)
```typescript
roughness: 0   // Perfect geometric shape
roughness: 1   // Slightly hand-drawn (default)
roughness: 2   // Very sketchy
```

**2. Fill Style**
```typescript
fillStyle: "solid"       // Solid color fill
fillStyle: "hachure"     // Diagonal line pattern
fillStyle: "cross-hatch" // Crossed lines
fillStyle: "dots"        // Dotted pattern
```

**3. Seed** (consistent randomness)
```typescript
seed: 12345  // Same seed = same drawing
// Ensures element looks the same every render
```

**Result:** Transforms perfect `ctx.rect(x,y,w,h)` into organic, hand-drawn sketch.

**Visual impact:** Makes diagrams feel friendly and approachable vs. sterile vector graphics.
x??

---

#### Viewport Culling Optimization
When you have hundreds of elements on a large canvas, rendering all of them every frame would be slow. Viewport culling is an optimization where Excalidraw only renders elements that are visible in the current viewport (the visible portion of the canvas). Elements outside the visible area are skipped during rendering. This is calculated by checking if an element's bounding box intersects with the viewport bounds, considering zoom and scroll offset.

```typescript
// Viewport culling pseudocode
function renderElements(elements, appState) {
  // Calculate visible area
  const viewport = {
    x: -appState.scrollX / appState.zoom.value,
    y: -appState.scrollY / appState.zoom.value,
    width: window.innerWidth / appState.zoom.value,
    height: window.innerHeight / appState.zoom.value
  };

  // Only render visible elements
  for (const element of elements) {
    // Check if element is in viewport
    if (isElementInViewport(element, viewport)) {
      renderElement(element);  // ✅ Render
    } else {
      // ❌ Skip rendering (outside viewport)
    }
  }
}

function isElementInViewport(element, viewport) {
  // Bounding box intersection check
  return !(
    element.x + element.width < viewport.x ||
    element.x > viewport.x + viewport.width ||
    element.y + element.height < viewport.y ||
    element.y > viewport.y + viewport.height
  );
}

// Performance impact:
// Canvas with 1000 elements, viewport shows 50
// ❌ Without culling: Render 1000 elements
// ✅ With culling: Render 50 elements (20x faster!)
```

:p What is viewport culling and how does it optimize rendering performance in Excalidraw?
??x
**Viewport culling** is an optimization that only renders elements visible in the current view.

**How it works:**
```typescript
function renderScene(elements, appState) {
  // 1. Calculate visible area (viewport)
  const viewport = {
    x: -appState.scrollX / appState.zoom.value,
    y: -appState.scrollY / appState.zoom.value,
    width: canvasWidth / appState.zoom.value,
    height: canvasHeight / appState.zoom.value
  };

  // 2. For each element, check visibility
  for (const element of elements) {
    if (isInViewport(element, viewport)) {
      renderElement(element);  // ✅ Visible, render it
    }
    // ❌ Not visible, skip rendering
  }
}

// 3. Visibility check (bounding box intersection)
function isInViewport(element, viewport) {
  const elementBounds = {
    x: element.x,
    y: element.y,
    width: element.width,
    height: element.height
  };

  // Check if rectangles overlap
  return !(
    elementBounds.x + elementBounds.width < viewport.x ||
    elementBounds.x > viewport.x + viewport.width ||
    elementBounds.y + elementBounds.height < viewport.y ||
    elementBounds.y > viewport.y + viewport.height
  );
}
```

**Performance impact:**
```
Large canvas: 1000 elements total
Viewport shows: 50 elements

❌ Without culling: 1000 render calls/frame
✅ With culling: 50 render calls/frame (20x faster!)
```
x??

---

#### Canvas Coordinate Systems
Excalidraw uses two coordinate systems: screen coordinates (pixels on the user's screen) and scene coordinates (positions in the infinite canvas). You need to convert between them when handling mouse events or rendering. The conversion involves the scroll offset (pan position) and zoom level. Understanding this is crucial for correctly positioning elements and handling user input.

```typescript
// Two coordinate systems

// 1. SCREEN COORDINATES: Pixels on user's screen
// - Mouse events use screen coordinates
// - (0, 0) = top-left of canvas element
// - Example: Mouse at (500, 300) screen pixels

// 2. SCENE COORDINATES: Position in infinite canvas
// - Element positions use scene coordinates
// - (0, 0) = origin of drawing canvas
// - Unaffected by zoom/pan
// - Example: Element at (1000, 2000) in scene

// Conversion: Screen → Scene
function screenToScene(screenX, screenY, appState) {
  const sceneX = (screenX - appState.offsetLeft) / appState.zoom.value
    - appState.scrollX / appState.zoom.value;

  const sceneY = (screenY - appState.offsetTop) / appState.zoom.value
    - appState.scrollY / appState.zoom.value;

  return { sceneX, sceneY };
}

// Conversion: Scene → Screen
function sceneToScreen(sceneX, sceneY, appState) {
  const screenX = (sceneX + appState.scrollX / appState.zoom.value)
    * appState.zoom.value + appState.offsetLeft;

  const screenY = (sceneY + appState.scrollY / appState.zoom.value)
    * appState.zoom.value + appState.offsetTop;

  return { screenX, screenY };
}

// Example usage:
// User clicks at screen (400, 300)
// Canvas is zoomed 2x and scrolled (1000, 500)
// Element should be created at scene coordinates
const { sceneX, sceneY } = screenToScene(400, 300, appState);
```

:p What are the two coordinate systems in Excalidraw and how do you convert between them?
??x
Excalidraw uses **two coordinate systems:**

**1. Screen Coordinates** (User's viewport)
```typescript
// Pixels on screen
// - Mouse events: (clientX, clientY)
// - Canvas element: (0,0) = top-left corner
// - Affected by: Window size

Example: Mouse clicked at (500, 300) screen pixels
```

**2. Scene Coordinates** (Infinite canvas)
```typescript
// Position in drawing
// - Element positions: (x, y)
// - Canvas origin: (0, 0) = center
// - NOT affected by: Zoom, pan

Example: Element at (1000, 2000) scene position
```

**Conversion formulas:**

```typescript
// Screen → Scene (mouse click to element position)
function screenToScene(screenX, screenY, appState) {
  const sceneX =
    (screenX - offsetLeft) / zoom - scrollX / zoom;

  const sceneY =
    (screenY - offsetTop) / zoom - scrollY / zoom;

  return { sceneX, sceneY };
}

// Scene → Screen (element position to pixels)
function sceneToScreen(sceneX, sceneY, appState) {
  const screenX =
    (sceneX + scrollX / zoom) * zoom + offsetLeft;

  const screenY =
    (sceneY + scrollY / zoom) * zoom + offsetTop;

  return { screenX, screenY };
}
```

**When to use:**
- Mouse events → Convert screen to scene
- Rendering → Convert scene to screen
- Always store elements in scene coordinates
x??

---

#### Render Element Function
The renderElement function is responsible for drawing a single element on the canvas. It takes the element, canvas context, rendering options, and render config. The function switches on element type and delegates to specialized renderers (renderRectangle, renderArrow, renderText, etc.). It also handles common concerns like transformations (rotation, position), opacity, and selection highlighting.

```typescript
// renderElement signature
function renderElement(
  element: ExcalidrawElement,
  rc: RoughCanvas,
  context: CanvasRenderingContext2D,
  renderConfig: RenderConfig,
  appState: AppState
): void

// Implementation pattern
function renderElement(element, rc, context, renderConfig, appState) {
  // Save canvas state
  context.save();

  // Apply transformations
  context.translate(element.x, element.y);
  context.rotate(element.angle);
  context.globalAlpha = element.opacity / 100;

  // Render based on type
  switch (element.type) {
    case "rectangle":
      renderRectangle(element, rc, context);
      break;
    case "arrow":
      renderArrow(element, rc, context);
      break;
    case "text":
      renderText(element, context);
      break;
    // ... other types
  }

  // Render selection UI if selected
  if (renderConfig.isSelected) {
    renderSelectionBorder(element, context);
  }

  // Restore canvas state
  context.restore();
}
```

:p What is the renderElement function and what transformations does it apply before delegating to type-specific renderers?
??x
**renderElement** is the main function that renders a single element on the canvas.

**Signature:**
```typescript
function renderElement(
  element: ExcalidrawElement,
  rc: RoughCanvas,               // RoughJS instance
  context: CanvasRenderingContext2D,
  renderConfig: RenderConfig,    // Rendering options
  appState: AppState
): void
```

**Transformations applied:**
```typescript
function renderElement(element, rc, context, ...) {
  // 1. Save state (for restoration later)
  context.save();

  // 2. Position transformation
  context.translate(element.x, element.y);

  // 3. Rotation transformation
  context.rotate(element.angle);

  // 4. Opacity transformation
  context.globalAlpha = element.opacity / 100;

  // 5. Delegate to type-specific renderer
  switch (element.type) {
    case "rectangle":
      renderRectangle(element, rc, context);
      break;
    case "arrow":
      renderArrow(element, rc, context);
      break;
    case "text":
      renderText(element, context);
      break;
    // ... 11 element types total
  }

  // 6. Add selection UI if selected
  if (isSelected) {
    renderSelectionBorder(element, context);
    renderResizeHandles(element, context);
  }

  // 7. Restore state
  context.restore();
}
```

**Key pattern:** Common transformations first, then type-specific rendering.

Located in: `packages/excalidraw/renderer/renderElement.ts`
x??

---

#### Canvas State Management with save/restore
The HTML Canvas API has a state stack for transformations, styles, and clipping regions. Before applying transformations (translate, rotate, scale) for an element, you call context.save() to push the current state onto the stack. After rendering, you call context.restore() to pop the stack and return to the previous state. This ensures that transformations for one element don't affect subsequent elements.

```typescript
// Canvas state stack pattern

function renderMultipleElements(elements, context) {
  for (const element of elements) {
    // Save current state
    // Stack: [default]
    context.save();

    // Apply element-specific transformations
    context.translate(element.x, element.y);
    context.rotate(element.angle);
    // Stack: [default, element1-transformed]

    // Render element
    renderElement(element);

    // Restore to previous state
    context.restore();
    // Stack: [default]
    // Next element starts with clean state
  }
}

// What save() preserves:
context.save();
- Current transformation matrix (translate, rotate, scale)
- Stroke and fill styles
- Line width, dash pattern
- Global alpha (opacity)
- Clipping region
- Font settings
context.restore(); // Returns to saved state

// ❌ Without save/restore
context.translate(100, 100);
renderElement1();  // At (100, 100) ✓
renderElement2();  // At (100, 100) ✗ Wrong! Should be at (0, 0)

// ✅ With save/restore
context.save();
context.translate(100, 100);
renderElement1();  // At (100, 100) ✓
context.restore();
renderElement2();  // At (0, 0) ✓ Correct!
```

:p What is the purpose of context.save() and context.restore() in canvas rendering and what state do they preserve?
??x
**context.save()** and **context.restore()** manage the canvas state stack to isolate transformations.

**How they work:**
```typescript
// Render multiple elements
for (const element of elements) {
  context.save();      // 1. Push current state to stack

  // 2. Apply transformations (only affect this element)
  context.translate(element.x, element.y);
  context.rotate(element.angle);
  context.globalAlpha = element.opacity / 100;

  // 3. Render
  drawElement(element);

  context.restore();   // 4. Pop stack, return to previous state
}
```

**What is saved/restored:**
```typescript
context.save();

// Transformations
- translate(), rotate(), scale()
- Transformation matrix

// Styles
- strokeStyle (color)
- fillStyle (color)
- globalAlpha (opacity)
- lineWidth
- lineCap, lineJoin

// Other
- Clipping region
- Font settings

context.restore();  // All above restored
```

**Why it's critical:**
```typescript
// ❌ Without save/restore - transformations accumulate
context.translate(100, 0);
renderElement1();  // At x=100 ✓
context.translate(100, 0);
renderElement2();  // At x=200 ✗ (should be x=100)

// ✅ With save/restore - isolated transformations
context.save();
context.translate(100, 0);
renderElement1();  // At x=100 ✓
context.restore();

context.save();
context.translate(100, 0);
renderElement2();  // At x=100 ✓ (correct!)
context.restore();
```

**Pattern:** Always pair save() before and restore() after transformations.
x??

---

#### Interactive Scene Rendering
The InteractiveCanvas rendering (in interactiveScene.ts, 33,000+ lines!) is the most complex part of the rendering system. It renders selected elements, selection boxes, resize handles, rotation handles, bounding boxes, and hover highlights. This layer updates on every mouse move during interaction, so it's heavily optimized. The rendering logic considers the current tool, selection state, and whether elements are being transformed.

```typescript
// Interactive scene rendering (simplified)
function renderInteractiveScene(
  elements,
  appState,
  selectionElement,
  scale
) {
  const canvas = getInteractiveCanvas();
  const context = canvas.getContext("2d");
  const rc = rough.canvas(canvas);

  // Clear canvas
  context.clearRect(0, 0, canvas.width, canvas.height);

  // Apply zoom and scroll
  context.save();
  context.scale(scale, scale);
  context.translate(appState.scrollX, appState.scrollY);

  // 1. Render selected elements
  const selectedElements = getSelectedElements(elements, appState);
  for (const element of selectedElements) {
    renderElement(element, rc, context, {
      isSelected: true
    });
  }

  // 2. Render selection box
  if (appState.selectionElement) {
    renderSelectionBox(appState.selectionElement, context);
  }

  // 3. Render resize handles
  if (selectedElements.length > 0) {
    renderResizeHandles(selectedElements, context);
  }

  // 4. Render rotation handle
  if (selectedElements.length === 1) {
    renderRotationHandle(selectedElements[0], context);
  }

  // 5. Render hover highlight
  if (appState.hoveredElement) {
    renderHoverHighlight(appState.hoveredElement, context);
  }

  context.restore();
}
```

:p What does the InteractiveCanvas render and why is it the most complex rendering layer?
??x
**InteractiveCanvas** renders all dynamic, user-interaction UI elements.

**What it renders:**

```typescript
function renderInteractiveScene(elements, appState) {
  // 1. Selected elements
  const selected = getSelectedElements(elements, appState);
  selected.forEach(el => renderElement(el, { highlight: true }));

  // 2. Selection box (dashed rectangle)
  renderSelectionBox(appState.selectionElement);

  // 3. Resize handles (8 points around selection)
  renderResizeHandles([
    "nw", "n", "ne",  // Top handles
    "w",       "e",   // Side handles
    "sw", "s", "se"   // Bottom handles
  ]);

  // 4. Rotation handle (circle above selection)
  renderRotationHandle(selectedElements[0]);

  // 5. Bounding box (dotted outline)
  renderBoundingBox(selectedElements);

  // 6. Hover highlight (blue tint)
  if (appState.hoveredElement) {
    renderHoverHighlight(appState.hoveredElement);
  }

  // 7. Multi-select lasso (if dragging)
  if (appState.multiSelectElement) {
    renderLasso(appState.multiSelectElement);
  }
}
```

**Why it's complex (33,257 lines!):**

1. **Many render states** - Different UI for different tools
2. **Performance critical** - Updates every mouse move
3. **Hit detection** - Which handle/element is under cursor
4. **Edge cases** - Locked elements, grouped elements, frames
5. **Accessibility** - Keyboard navigation, screen readers
6. **Collaboration** - Remote cursors, selections

Located in: `packages/excalidraw/renderer/interactiveScene.ts`

**Update frequency:** Every mouse move, every frame during drag.
x??

---

#### SVG Export Rendering
Excalidraw can export drawings as SVG (Scalable Vector Graphics) for perfect quality at any size. The SVG export uses a completely separate rendering path from canvas rendering - instead of drawing to a canvas context, it builds an SVG DOM tree by creating SVG elements (rect, ellipse, path, text) with the same properties as the drawn elements. This requires converting RoughJS canvas drawings to SVG equivalents.

```typescript
// SVG export pseudocode
function exportToSVG(elements, appState) {
  // Create SVG root element
  const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");

  // Calculate bounds
  const { minX, minY, maxX, maxY } = getCommonBounds(elements);
  svg.setAttribute("viewBox", `${minX} ${minY} ${maxX - minX} ${maxY - minY}`);

  // Convert each element to SVG
  for (const element of elements) {
    const svgElement = elementToSVG(element);
    svg.appendChild(svgElement);
  }

  return svg;
}

function elementToSVG(element) {
  switch (element.type) {
    case "rectangle":
      // Create SVG rect element
      const rect = document.createElementNS("http://www.w3.org/2000/svg", "rect");
      rect.setAttribute("x", element.x);
      rect.setAttribute("y", element.y);
      rect.setAttribute("width", element.width);
      rect.setAttribute("height", element.height);
      rect.setAttribute("stroke", element.strokeColor);
      rect.setAttribute("fill", element.backgroundColor);
      return rect;

    case "text":
      // Create SVG text element
      const text = document.createElementNS("http://www.w3.org/2000/svg", "text");
      text.setAttribute("x", element.x);
      text.setAttribute("y", element.y);
      text.setAttribute("font-size", element.fontSize);
      text.textContent = element.text;
      return text;

    // ... other types
  }
}
```

:p How does SVG export differ from canvas rendering and why is a separate rendering path needed?
??x
**SVG export** uses a different rendering approach than canvas.

**Canvas rendering:**
```typescript
// Draws pixels to bitmap
function renderToCanvas(element, context, rc) {
  // RoughJS draws to canvas
  rc.rectangle(x, y, width, height, {
    stroke: color,
    fill: color
  });

  // Result: Pixel-based image
  // Fixed resolution
}
```

**SVG export:**
```typescript
// Creates vector markup
function exportToSVG(element) {
  // Create SVG DOM elements
  const rect = document.createElementNS(
    "http://www.w3.org/2000/svg",
    "rect"
  );

  rect.setAttribute("x", element.x);
  rect.setAttribute("y", element.y);
  rect.setAttribute("width", element.width);
  rect.setAttribute("height", element.height);
  rect.setAttribute("stroke", element.strokeColor);

  // Result: Scalable vector
  // Infinite resolution
}
```

**Why separate rendering path:**

1. **Different output formats**
   - Canvas → Pixels (bitmap)
   - SVG → Vectors (DOM/XML)

2. **Different APIs**
   ```typescript
   // Canvas API
   context.rect(x, y, w, h);
   context.stroke();

   // SVG API
   const rect = createElementNS("svg", "rect");
   rect.setAttribute("x", x);
   ```

3. **RoughJS conversion**
   ```typescript
   // RoughJS generates different output
   rough.canvas(canvas).rectangle(...)  // Canvas drawing
   rough.svg(svg).rectangle(...)        // SVG markup
   ```

4. **Quality goals**
   - Canvas: Fast rendering for interaction
   - SVG: Perfect quality for export

**Result:** SVG files can be opened in Illustrator, Figma, printed at any size.
x??

---

#### Render Performance Optimization
Excalidraw employs multiple performance optimizations for rendering: viewport culling (only render visible elements), three-canvas separation (only redraw changed layers), requestAnimationFrame throttling (batch updates), dirty region tracking (only clear/redraw changed areas), and element caching (cache rendered shapes for reuse). These optimizations allow smooth 60fps interaction even with thousands of elements.

```typescript
// Performance optimization techniques

// 1. Viewport culling (already covered)
const visibleElements = elements.filter(el =>
  isInViewport(el, viewport)
);

// 2. Three-canvas separation (already covered)
// Only redraw interactive layer on mouse move

// 3. requestAnimationFrame batching
let pendingRender = false;

function scheduleRender() {
  if (!pendingRender) {
    pendingRender = true;
    requestAnimationFrame(() => {
      render();
      pendingRender = false;
    });
  }
}

// Multiple calls in same frame → only renders once
scheduleRender();
scheduleRender();  // Batched
scheduleRender();  // Batched

// 4. Dirty region tracking
const dirtyRegion = {
  minX: Infinity,
  minY: Infinity,
  maxX: -Infinity,
  maxY: -Infinity
};

// Only clear changed area
context.clearRect(
  dirtyRegion.minX,
  dirtyRegion.minY,
  dirtyRegion.maxX - dirtyRegion.minX,
  dirtyRegion.maxY - dirtyRegion.minY
);

// 5. Element caching
const renderCache = new Map();

function getCachedRender(element) {
  const key = `${element.id}-${element.version}`;
  if (!renderCache.has(key)) {
    renderCache.set(key, renderToOffscreenCanvas(element));
  }
  return renderCache.get(key);
}
```

:p What are five performance optimizations used in Excalidraw's rendering system?
??x
Excalidraw uses **five key rendering optimizations:**

**1. Viewport Culling**
```typescript
// Only render visible elements
const visibleElements = elements.filter(el =>
  isInViewport(el, viewport)
);
// 1000 elements → render only ~50 visible
```

**2. Three-Canvas Separation**
```typescript
// Static layer: Rarely updates
// Interactive layer: Frequent updates (only this redraws)
// New element layer: During creation only
// Avoids redrawing entire scene per frame
```

**3. requestAnimationFrame Batching**
```typescript
// Batch multiple updates into single frame
let pending = false;
function scheduleRender() {
  if (!pending) {
    pending = true;
    requestAnimationFrame(render);
  }
}

// 100 calls/frame → 1 actual render
```

**4. Dirty Region Tracking**
```typescript
// Only clear/redraw changed area
const dirty = calculateDirtyRegion(changedElements);
context.clearRect(dirty.x, dirty.y, dirty.w, dirty.h);
// vs clearRect(0, 0, fullWidth, fullHeight)
```

**5. Element Caching**
```typescript
// Cache rendered shapes, reuse when unchanged
const cache = new Map();
const key = `${element.id}-${element.version}`;

if (!cache.has(key)) {
  cache.set(key, renderToCache(element));
}
context.drawImage(cache.get(key), x, y);
```

**Combined result:** 60fps with 1000+ elements during interaction.
x??
