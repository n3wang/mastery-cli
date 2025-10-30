# Flame Architecture - Advanced Patterns

## State Management Patterns

#### Bitfield State Machine Pattern
Flame uses a single integer to track multiple component lifecycle states using bit operations. Each state is a bit flag, allowing atomic state checks and minimal memory overhead. The component's `_state` field combines flags like `_loading`, `_loaded`, `_mounted`, `_removing`, etc.

```java
// Pseudocode for bitfield state machine:
class Component {
    int _state = 0;

    // State flags as bit positions
    static final int LOADING_BIT = 1 << 0;   // 0001
    static final int LOADED_BIT = 1 << 1;    // 0010
    static final int MOUNTED_BIT = 1 << 2;   // 0100
    static final int REMOVING_BIT = 1 << 3;  // 1000

    // Check state with bitwise AND
    boolean isLoaded() {
        return (_state & LOADED_BIT) != 0;
    }

    // Set state with bitwise OR
    void setLoaded() {
        _state |= LOADED_BIT;
    }

    // Clear state with bitwise AND NOT
    void clearLoaded() {
        _state &= ~LOADED_BIT;
    }

    // Can check multiple states atomically
    boolean isMountedAndNotRemoving() {
        return (_state & (MOUNTED_BIT | REMOVING_BIT)) == MOUNTED_BIT;
    }
}
```

This pattern uses 4 bytes (32 bits) to track unlimited states vs 1 byte per boolean flag.
:p Why does Flame use a bitfield for component state instead of multiple boolean fields?
?x
Benefits of bitfield state machine:

1. **Memory efficiency**: 1 integer (4 bytes) vs N booleans (N bytes)
2. **Atomic operations**: Check multiple states in one operation
3. **Cache friendly**: Single memory location, better CPU cache utilization
4. **Thread safety**: Single int read/write is atomic on most platforms

Example comparison:
```java
// Multiple booleans (7 bytes minimum):
boolean isLoading;
boolean isLoaded;
boolean isMounted;
boolean isRemoving;
boolean isRemoved;
boolean isMounting;
boolean shouldRemove;

// Bitfield (4 bytes total):
int _state;  // Contains all 7+ states
```

Operations:
```
Check: _state & FLAG
Set: _state |= FLAG
Clear: _state &= ~FLAG
Check multiple: _state & (FLAG1 | FLAG2)
```

Flame's implementation allows checking "is component mounted but not removing" in a single bitwise operation.
x?

---

#### Dirty Flag Pattern for Transforms
Transform2D uses dirty flags to lazily calculate expensive matrix operations. The transform stores position, rotation, scale directly but only calculates the transformation matrix when needed. A dirty flag tracks when properties change.

```java
class Transform2D {
    // Direct storage (cheap)
    double x, y;
    double angle;
    double scaleX, scaleY;

    // Expensive calculated matrix
    Matrix4 _transformMatrix;
    boolean _isDirty = true;

    void setPosition(double newX, double newY) {
        x = newX;
        y = newY;
        _isDirty = true;  // Mark dirty on change
    }

    void setAngle(double newAngle) {
        angle = newAngle;
        _isDirty = true;
    }

    Matrix4 getTransformMatrix() {
        if (_isDirty) {
            // Only recalculate when dirty
            _transformMatrix = calculateMatrix();
            _isDirty = false;
        }
        return _transformMatrix;
    }

    Matrix4 calculateMatrix() {
        // Expensive: trigonometry, matrix multiplication
        Matrix4 m = Matrix4.identity();
        m.translate(x, y);
        m.rotateZ(angle);
        m.scale(scaleX, scaleY);
        return m;
    }
}
```

Components may change position 60 times per second but only render 60 times, making lazy calculation efficient.
:p How does Transform2D optimize matrix calculations using the dirty flag pattern?
?x
Transform2D separates **storage** (cheap) from **calculation** (expensive):

Storage (always updated):
```
x, y, angle, scaleX, scaleY
```

Calculation (lazy):
```java
Matrix4 getMatrix() {
    if (dirty) {
        matrix = calculateFromStorage();  // Expensive
        dirty = false;
    }
    return matrix;
}
```

Why it works:
1. **Properties change frequently**: position += velocity every frame
2. **Matrix rarely needed**: only during rendering
3. **Matrix calculation expensive**: trigonometry (sin/cos), multiplication

Example scenario:
```
update():
  position.x += 5;  // dirty = true (cheap)
  position.x += 3;  // dirty = true (cheap)
  position.x -= 2;  // dirty = true (cheap)

render():
  getMatrix();  // calculates ONCE (expensive)
```

Without dirty flag: 3 matrix calculations
With dirty flag: 1 matrix calculation

Pattern also used in NotifyingVector2 to propagate changes up component tree.
x?

---

## Data Structure Patterns

#### OrderedSet with Red-Black Tree
Flame uses OrderedSet (based on Red-Black Tree) to store component children in priority order. The tree provides O(log n) insertion/removal while maintaining sorted iteration by priority. Leaf nodes lazily instantiate to save memory.

```java
class OrderedSet<T> {
    Node root;
    int size = 0;

    static class Node<T> {
        T value;
        int priority;
        Node left, right, parent;
        boolean isRed;  // Red-black tree color

        Node(T value, int priority) {
            this.value = value;
            this.priority = priority;
            this.isRed = true;  // New nodes are red
        }
    }

    void add(T element, int priority) {
        // O(log n) insertion
        Node newNode = new Node(element, priority);
        root = insertNode(root, newNode);
        rebalance(newNode);  // Maintain red-black properties
        size++;
    }

    void remove(T element) {
        // O(log n) removal
        Node node = findNode(element);
        root = deleteNode(root, node);
        rebalance(node.parent);
        size--;
    }

    Iterator<T> iterator() {
        // O(n) in-order traversal
        // Yields elements in priority order
        return new InOrderIterator(root);
    }

    Node insertNode(Node current, Node newNode) {
        if (current == null) return newNode;

        if (newNode.priority < current.priority) {
            current.left = insertNode(current.left, newNode);
        } else {
            current.right = insertNode(current.right, newNode);
        }
        return current;
    }
}
```

Red-black trees guarantee O(log n) operations while maintaining balance, unlike regular BSTs.
:p Why does Flame use a Red-Black Tree for component children instead of a simple List?
?x
OrderedSet provides **efficient priority-based ordering**:

List approach (naive):
```java
// Add component
list.add(component);
list.sort();  // O(n log n) every time!

// Iterate for rendering
for (component : list) {
    render(component);  // In priority order
}
```

Red-Black Tree approach:
```java
// Add component
tree.add(component, priority);  // O(log n), maintains order

// Iterate for rendering
for (component : tree) {  // O(n), already sorted
    render(component);
}
```

Performance comparison:
```
Operation       | List          | RBTree
----------------|---------------|--------
Add             | O(n log n)    | O(log n)
Remove          | O(n)          | O(log n)
Iterate sorted  | O(n)          | O(n)
Change priority | O(n log n)    | O(log n)
```

Flame optimization: Leaf nodes with single child don't create tree, use direct reference.

Red-black properties ensure tree stays balanced (max depth = 2 log n), preventing worst-case O(n) operations of unbalanced trees.
x?

---

#### RecycledQueue Object Pooling
RecycledQueue reuses LifecycleEvent objects to avoid garbage collection pressure. Events are pooled and recycled after processing, using a queue structure that grows but never shrinks.

```java
class RecycledQueue<T> {
    List<T> queue = new ArrayList<>();
    List<T> pool = new ArrayList<>();
    int readIndex = 0;

    T acquire() {
        // Try to reuse from pool first
        if (!pool.isEmpty()) {
            return pool.removeLast();  // O(1)
        }
        // Create new only if pool empty
        return createNew();
    }

    void enqueue(T item) {
        queue.add(item);  // Add to queue
    }

    void processAll() {
        // Process all events
        while (readIndex < queue.size()) {
            T item = queue.get(readIndex);
            processEvent(item);
            recycle(item);  // Return to pool
            readIndex++;
        }

        // Reset for next frame
        queue.clear();
        readIndex = 0;
    }

    void recycle(T item) {
        item.reset();  // Clear data
        pool.add(item);  // Return to pool for reuse
    }
}

// Usage in lifecycle events:
class ComponentTreeRoot {
    RecycledQueue<LifecycleEvent> events;

    void addComponent(Component c) {
        LifecycleEvent event = events.acquire();  // Reuse or create
        event.type = ADD;
        event.component = c;
        events.enqueue(event);
    }

    void processLifecycleEvents() {
        events.processAll();  // Events recycled automatically
    }
}
```

High-frequency games may add/remove dozens of components per frame, making pooling critical.
:p How does RecycledQueue reduce garbage collection pressure in Flame's lifecycle system?
?x
RecycledQueue implements **object pooling** for LifecycleEvent objects:

Without pooling:
```java
void addComponent(Component c) {
    LifecycleEvent event = new LifecycleEvent();  // New allocation
    event.component = c;
    queue.add(event);
}

void processEvents() {
    for (event : queue) {
        process(event);
        // event becomes garbage
    }
    queue.clear();  // All events garbage collected
}
// Result: N allocations + N deallocations per frame
```

With pooling:
```java
void addComponent(Component c) {
    LifecycleEvent event = pool.acquire();  // Reuse existing
    event.component = c;
    queue.add(event);
}

void processEvents() {
    for (event : queue) {
        process(event);
        pool.recycle(event);  // Return to pool
    }
    queue.clear();
}
// Result: N allocations once, then 0 allocations
```

Benefits:
1. **No allocation** after warmup (pool reaches steady state)
2. **No GC pressure** - objects stay alive
3. **Better cache locality** - reusing same memory
4. **Predictable performance** - no GC pauses

Pattern used in Flame for: LifecycleEvents, collision Prospects, Matrix4 objects.
x?

---

#### ValueCache with Dependency Tracking
ValueCache stores computed values with dependency tracking. When dependencies change, cached values automatically invalidate. Used for expensive calculations that depend on other properties.

```java
class ValueCache<T> {
    T cachedValue;
    boolean isValid = false;
    List<Dependency> dependencies;

    T getValue(Supplier<T> computer) {
        // Check if dependencies changed
        for (Dependency dep : dependencies) {
            if (dep.hasChanged()) {
                isValid = false;
                break;
            }
        }

        if (!isValid) {
            cachedValue = computer.get();  // Recompute
            isValid = true;
            updateDependencyVersions();
        }

        return cachedValue;
    }

    void dependOn(Observable observable) {
        dependencies.add(new Dependency(observable));
    }
}

// Usage in Transform2D:
class Transform2D {
    ValueCache<Matrix4> matrixCache;
    NotifyingVector2 position;
    NotifyingDouble angle;

    Transform2D() {
        matrixCache.dependOn(position);  // Track position changes
        matrixCache.dependOn(angle);     // Track angle changes
    }

    Matrix4 getMatrix() {
        return matrixCache.getValue(() -> {
            // Only called when position or angle changed
            return calculateMatrix(position, angle);
        });
    }
}

// NotifyingVector2 pattern:
class NotifyingVector2 {
    double x, y;
    int version = 0;  // Increments on change

    void setX(double newX) {
        x = newX;
        version++;  // Notify dependents
    }
}
```

Allows automatic invalidation chains: position change → transform cache → absolute position cache.
:p How does ValueCache enable automatic invalidation of dependent calculations?
?x
ValueCache tracks **observable dependencies** and their change versions:

Structure:
```java
ValueCache {
    value: cachedResult
    valid: boolean
    dependencies: [
        { observable: position, version: 5 },
        { observable: angle, version: 3 },
        { observable: scale, version: 2 }
    ]
}
```

Check validity:
```java
getValue() {
    // Check each dependency's current version
    for (dep : dependencies) {
        if (dep.observable.version > dep.storedVersion) {
            valid = false;  // Dependency changed!
            break;
        }
    }

    if (!valid) {
        value = recompute();
        updateStoredVersions();  // Remember current versions
        valid = true;
    }

    return value;
}
```

Automatic invalidation chain:
```
position.x = 10
  → position.version++
  → transformCache.getValue()
    → Sees position.version changed
    → Recalculates transform
    → Stores new position.version
  → absolutePositionCache.getValue()
    → Sees transform changed
    → Recalculates absolute position
```

Benefits:
- No manual invalidation code
- Automatic dependency tracking
- Lazy recomputation
- Prevents redundant calculations

Pattern used in Transform2D for matrix calculation and PositionComponent for absolute position/angle.
x?

---

## Collision Detection Algorithms

#### Sweep and Prune Algorithm
Sweep algorithm sorts hitboxes by minimum X coordinate, then checks only overlapping ranges on X-axis before full collision test. Reduces O(n²) naive approach by skipping boxes that can't possibly collide.

```java
class Sweep {
    List<Hitbox> hitboxes;

    void run(CollisionDetection system) {
        // Sort by minimum X coordinate - O(n log n)
        hitboxes.sort((a, b) -> a.aabb.minX - b.aabb.minX);

        // Sweep along X axis
        for (int i = 0; i < hitboxes.size(); i++) {
            Hitbox a = hitboxes[i];

            // Check only subsequent boxes
            for (int j = i + 1; j < hitboxes.size(); j++) {
                Hitbox b = hitboxes[j];

                // Early exit: if b.minX > a.maxX, no more overlaps
                if (b.aabb.minX > a.aabb.maxX) {
                    break;  // All remaining boxes too far right
                }

                // Passed X-axis test, check Y-axis
                if (a.aabb.minY > b.aabb.maxY || a.aabb.maxY < b.aabb.minY) {
                    continue;  // No Y overlap
                }

                // AABB overlap, add to prospects for detailed test
                prospects.add(new Prospect(a, b));
            }
        }

        // Process prospects with detailed collision tests
        for (Prospect p : prospects) {
            if (p.hitboxA.intersects(p.hitboxB)) {
                system.handleCollision(p);
            }
        }
    }
}
```

Works best when objects are distributed horizontally; vertical distribution would sort by Y instead.
:p How does the Sweep algorithm reduce collision checks from O(n²) to better complexity?
?x
Sweep uses **spatial coherence** on one axis to skip impossible pairs:

Naive approach O(n²):
```java
// Check every pair
for (a : hitboxes) {
    for (b : hitboxes) {
        if (a.intersects(b)) {  // Expensive check
            handleCollision(a, b);
        }
    }
}
// n² collision tests
```

Sweep approach:
```java
// Sort by X axis
hitboxes.sortBy(h -> h.minX);

for (i = 0; i < n; i++) {
    for (j = i+1; j < n; j++) {
        // Early exit when too far apart
        if (hitboxes[j].minX > hitboxes[i].maxX) {
            break;  // All remaining boxes even farther
        }

        // Only test Y axis now
        if (overlapsY(hitboxes[i], hitboxes[j])) {
            prospects.add(i, j);
        }
    }
}
```

Visual example:
```
X axis: 0 ─────────────────── 100

Box A: [10───20]
Box B:         [25──35]  ← minX(25) > maxX(20), skip!
Box C:                [40─50]  ← Also skip
Box D:                     [55─65]  ← Also skip

A only compared to itself, not B/C/D
```

Complexity:
- Best case: O(n) - boxes spread out on X axis
- Worst case: O(n²) - all boxes overlap on X
- Average: O(n + k) where k = number of overlapping pairs

Works best for **sparse** distributions.
x?

---

#### QuadTree Spatial Partitioning
QuadTree recursively divides 2D space into quadrants, storing hitboxes in leaf nodes. Queries only traverse relevant quadrants, achieving O(log n) insertion and O(log n + k) query where k is results.

```java
class QuadTree {
    Rectangle bounds;  // This node's region
    int capacity = 4;  // Max items before split
    List<Hitbox> items;

    // Four children (null until split)
    QuadTree northWest, northEast, southWest, southEast;

    void insert(Hitbox hitbox) {
        if (!bounds.contains(hitbox.aabb)) {
            return;  // Outside this quadrant
        }

        if (items.size() < capacity) {
            items.add(hitbox);  // Space available
            return;
        }

        if (northWest == null) {
            subdivide();  // Split into 4 children
        }

        // Try to insert into children
        northWest.insert(hitbox);
        northEast.insert(hitbox);
        southWest.insert(hitbox);
        southEast.insert(hitbox);
    }

    void subdivide() {
        double halfW = bounds.width / 2;
        double halfH = bounds.height / 2;
        double x = bounds.x;
        double y = bounds.y;

        northWest = new QuadTree(new Rectangle(x, y, halfW, halfH));
        northEast = new QuadTree(new Rectangle(x + halfW, y, halfW, halfH));
        southWest = new QuadTree(new Rectangle(x, y + halfH, halfW, halfH));
        southEast = new QuadTree(new Rectangle(x + halfW, y + halfH, halfW, halfH));
    }

    List<Hitbox> query(Rectangle range) {
        List<Hitbox> found = new ArrayList<>();

        if (!bounds.intersects(range)) {
            return found;  // No intersection, skip entire subtree
        }

        // Check items in this node
        for (Hitbox h : items) {
            if (range.intersects(h.aabb)) {
                found.add(h);
            }
        }

        // Recurse into children if subdivided
        if (northWest != null) {
            found.addAll(northWest.query(range));
            found.addAll(northEast.query(range));
            found.addAll(southWest.query(range));
            found.addAll(southEast.query(range));
        }

        return found;
    }
}
```

QuadTree is better for static/slow-moving objects; Sweep is better for fast-moving objects.
:p How does QuadTree spatial partitioning reduce collision detection complexity?
?x
QuadTree divides space **hierarchically**, allowing queries to skip entire regions:

Structure:
```
Root (entire world)
├─ NW quadrant
│  ├─ NW.NW (subdivided)
│  ├─ NW.NE (subdivided)
│  ├─ NW.SW (leaf, 3 items)
│  └─ NW.SE (leaf, 1 item)
├─ NE quadrant (leaf, 2 items)
├─ SW quadrant (leaf, 4 items)
└─ SE quadrant (leaf, 0 items)
```

Query for collisions with hitbox at (10, 10):
```java
query(Rectangle(10, 10, 20, 20)) {
    // Check root bounds
    if (!rootBounds.intersects(queryRect)) return [];

    // Only NW quadrant intersects
    results = northWest.query(queryRect);
    // Skip NE, SW, SE entirely (no intersection)

    return results;
}
```

Complexity analysis:
```
Without QuadTree: O(n) - check all n hitboxes
With QuadTree: O(log n + k)
  - log n: traverse tree depth
  - k: number of results in relevant quadrants
```

Example scenario with 1000 hitboxes:
```
Naive: Check all 1000
QuadTree:
  - Root intersects? → Yes
  - NW intersects? → No (skip 250 hitboxes)
  - NE intersects? → No (skip 250 hitboxes)
  - SW intersects? → Yes
    - SW.NW? → Yes (check 15 hitboxes)
    - Others? → No
Total: ~15 checks instead of 1000
```

Best for **sparse** worlds with **localized** queries.
x?

---

#### Prospect Pooling and Deduplication
Collision detection uses Prospect objects to represent potential collisions. Prospects are pooled and deduplicated using a Set to ensure each pair is only tested once, even if detected by multiple broadphase algorithms.

```java
class Prospect {
    Hitbox hitboxA;
    Hitbox hitboxB;
    Set<Vector2> intersectionPoints;
    boolean isActive;

    void reset() {
        hitboxA = null;
        hitboxB = null;
        intersectionPoints.clear();
        isActive = false;
    }

    boolean equals(Object other) {
        // Symmetric: (A,B) == (B,A)
        Prospect p = (Prospect) other;
        return (hitboxA == p.hitboxA && hitboxB == p.hitboxB) ||
               (hitboxA == p.hitboxB && hitboxB == p.hitboxA);
    }

    int hashCode() {
        // Symmetric hash: (A,B) == (B,A)
        int hash1 = hitboxA.hashCode();
        int hash2 = hitboxB.hashCode();
        return hash1 ^ hash2;  // XOR is commutative
    }
}

class CollisionDetection {
    ObjectPool<Prospect> prospectPool;
    Set<Prospect> prospects;  // Automatically deduplicates

    void run() {
        prospects.clear();

        // Broadphase generates prospects
        quadTree.query(world).forEach(pair -> {
            Prospect p = prospectPool.acquire();
            p.hitboxA = pair.first;
            p.hitboxB = pair.second;
            prospects.add(p);  // Set deduplicates
        });

        sweep.run(world).forEach(pair -> {
            Prospect p = prospectPool.acquire();
            p.hitboxA = pair.first;
            p.hitboxB = pair.second;
            prospects.add(p);  // May be duplicate, Set handles it
        });

        // Process unique prospects
        prospects.forEach(p -> {
            if (p.hitboxA.intersects(p.hitboxB)) {
                handleCollision(p);
            }
            prospectPool.recycle(p);  // Return to pool
        });
    }
}
```

Multiple broadphase algorithms may detect the same pair; deduplication prevents double-processing.
:p Why does Flame use Prospect pooling and Set-based deduplication in collision detection?
?x
Prospect pooling + deduplication solves two problems:

**Problem 1: Allocation pressure**
```java
// Without pooling:
void detectCollisions() {
    for (pair : potentialCollisions) {
        Prospect p = new Prospect(pair.a, pair.b);  // Allocation
        if (p.hitboxA.intersects(p.hitboxB)) {
            handleCollision(p);
        }
        // p becomes garbage
    }
}
// 100 potential collisions = 100 allocations per frame
```

**Solution: Object pooling**
```java
void detectCollisions() {
    for (pair : potentialCollisions) {
        Prospect p = pool.acquire();  // Reuse from pool
        p.set(pair.a, pair.b);
        test(p);
        pool.recycle(p);  // Return for reuse
    }
}
// After warmup: 0 allocations per frame
```

**Problem 2: Duplicate pairs**
```java
// QuadTree finds: (A, B), (B, C)
// Sweep finds: (A, B), (C, D)
// Without deduplication: Test (A, B) twice!
```

**Solution: Set with symmetric hash**
```java
class Prospect {
    hashCode() {
        return hashA ^ hashB;  // XOR is commutative
        // (A,B).hash == (B,A).hash
    }

    equals(other) {
        return (A==A' && B==B') || (A==B' && B==A');
        // (A,B) equals (B,A)
    }
}

prospects = new Set<Prospect>();
prospects.add(new Prospect(A, B));  // Added
prospects.add(new Prospect(B, A));  // Duplicate, ignored
```

Result: Each pair tested exactly once, minimal allocations.
x?

---

## Rendering Pipeline Patterns

#### Camera Projection Pipeline
Flame's camera uses a three-stage transformation pipeline: World coordinates → Viewfinder transform (position/zoom) → Viewport transform (screen fit) → Screen coordinates. Each stage is a separate component with its own responsibility.

```java
class CameraComponent {
    Viewfinder viewfinder;  // World layer
    Viewport viewport;      // Screen layer
    World world;

    void render(Canvas canvas) {
        // Stage 1: Viewport clips and transforms to screen
        viewport.apply(canvas);
        canvas.save();

        // Stage 2: Viewfinder transforms world coordinates
        viewfinder.apply(canvas);
        canvas.save();

        // Stage 3: Render world in transformed space
        world.renderTree(canvas);

        canvas.restore();  // Undo viewfinder
        canvas.restore();  // Undo viewport

        // Stage 4: Render viewport children (HUD)
        viewport.renderTree(canvas);
    }
}

// Viewfinder transformation:
class Viewfinder {
    Vector2 position;  // Where camera looks
    double zoom;       // Magnification
    double angle;      // Camera rotation

    void apply(Canvas canvas) {
        canvas.translate(-position.x, -position.y);
        canvas.scale(zoom, zoom);
        canvas.rotate(-angle);
    }
}

// Viewport transformation:
class Viewport {
    Vector2 size;  // Screen dimensions

    void apply(Canvas canvas) {
        canvas.clipRect(Rect.fromLTWH(0, 0, size.x, size.y));
        // May scale/letterbox to fit screen
    }
}
```

Coordinate conversion example: Click at screen (100, 100) → viewport inverse → viewfinder inverse → world (250, 300).
:p How does Flame's camera pipeline transform coordinates from world to screen?
?x
Three-stage transformation pipeline with **separation of concerns**:

**Stage 1: World space**
```
Entity position in game world
Player at (500, 300)
```

**Stage 2: Viewfinder transform (camera)**
```java
canvas.translate(-cameraX, -cameraY);  // Camera position
canvas.scale(zoom, zoom);               // Camera zoom
canvas.rotate(-cameraAngle);            // Camera rotation

// Example:
// Player at world (500, 300)
// Camera at (400, 200), zoom 2.0
// Result: ((500-400)*2, (300-200)*2) = (200, 200)
```

**Stage 3: Viewport transform (screen fit)**
```java
canvas.clipRect(screenBounds);  // Clip to screen
canvas.scale(screenScale);      // Scale to fit
canvas.translate(letterbox);    // Letterbox offset

// Example:
// Viewfinder (200, 200)
// Screen scale 1.5x
// Result: (300, 300) screen pixels
```

**Stage 4: Render separation**
```java
render() {
    // Apply viewport + viewfinder
    canvas.save();
    viewport.apply(canvas);
    viewfinder.apply(canvas);
    world.render(canvas);  // World entities transformed
    canvas.restore();

    // Apply viewport only
    canvas.save();
    viewport.apply(canvas);
    viewport.render(canvas);  // HUD not transformed
    canvas.restore();
}
```

Benefits:
- **World entities** affected by both transforms
- **HUD elements** affected only by viewport
- **Clean separation** of screen vs world space
x?

---

#### Decorator Chain Pattern
Decorators wrap components to add visual effects without modifying component code. Decorators are applied in sequence, each transforming the canvas before the next decorator or component renders.

```java
abstract class Decorator {
    Decorator parent;  // Chain to next decorator

    void render(Canvas canvas, Component component) {
        if (parent != null) {
            parent.render(canvas, component);  // Chain continues
        } else {
            component.renderTree(canvas);  // End of chain
        }
    }
}

class Transform2DDecorator extends Decorator {
    void render(Canvas canvas, Component component) {
        canvas.save();
        canvas.translate(x, y);
        canvas.rotate(angle);
        canvas.scale(scaleX, scaleY);

        super.render(canvas, component);  // Next in chain

        canvas.restore();
    }
}

class OpacityDecorator extends Decorator {
    double opacity;

    void render(Canvas canvas, Component component) {
        canvas.saveLayer(null, Paint()..color = Color.withOpacity(opacity));

        super.render(canvas, component);  // Next in chain

        canvas.restore();
    }
}

class BlurDecorator extends Decorator {
    double blurRadius;

    void render(Canvas canvas, Component component) {
        canvas.saveLayer(null, Paint()..imageFilter = blur(blurRadius));

        super.render(canvas, component);  // Next in chain

        canvas.restore();
    }
}

// Usage:
component.decorator = Transform2DDecorator()
    ..parent = OpacityDecorator()
    ..parent = BlurDecorator();

// Rendering order:
// Transform → Opacity → Blur → Component
```

Decorators are composable: any combination of effects without changing component code.
:p How does the Decorator pattern enable composable visual effects in Flame?
?x
Decorators form a **chain of transformations** applied before rendering:

Structure:
```java
Component {
    decorator: Decorator

    render(canvas) {
        if (decorator != null) {
            decorator.render(canvas, this);
        } else {
            renderTree(canvas);
        }
    }
}

Decorator {
    parent: Decorator  // Next in chain

    render(canvas, component) {
        applyEffect(canvas);  // This decorator's effect

        if (parent != null) {
            parent.render(canvas, component);  // Chain
        } else {
            component.renderTree(canvas);  // Actual rendering
        }
    }
}
```

Example chain:
```java
component.decorator =
    new BlurDecorator(5.0)
        .chain(new Rotate3DDecorator(angle))
        .chain(new ShadowDecorator());

// Execution order:
render() {
    BlurDecorator.render():
        canvas.blur(5.0)
        Rotate3DDecorator.render():
            canvas.rotate3D(angle)
            ShadowDecorator.render():
                canvas.shadow(...)
                component.renderTree()  // Finally render
}
```

Benefits:
1. **No component modification** - add effects externally
2. **Composable** - any combination of decorators
3. **Reusable** - same decorator on multiple components
4. **Order matters** - blur then rotate ≠ rotate then blur

Without decorators:
```java
// Would need subclasses:
BlurredComponent extends Component { }
RotatedComponent extends Component { }
BlurredRotatedComponent extends Component { }  // Combinatorial explosion!
```

With decorators:
```java
component.decorator = blur().chain(rotate());  // Any combination
```
x?

---

#### RenderObject Bridge to Flutter
GameRenderBox bridges Flame's game loop to Flutter's rendering system by extending RenderBox and managing a Ticker-driven GameLoop. It translates Flutter's paint callbacks into Flame's update/render cycle.

```java
class GameRenderBox extends RenderBox {
    Game game;
    GameLoop gameLoop;
    Ticker ticker;

    void attach(PipelineOwner owner) {
        super.attach(owner);

        // Initialize game
        game.onLoad();

        // Create game loop with Flutter's Ticker
        ticker = Ticker(onTick);
        gameLoop = GameLoop(ticker);
        gameLoop.start();
    }

    void onTick(Duration elapsed) {
        double dt = calculateDelta(elapsed);

        // Update game logic
        game.update(dt);

        // Request Flutter repaint
        markNeedsPaint();
    }

    void paint(PaintingContext context, Offset offset) {
        Canvas canvas = context.canvas;
        canvas.save();
        canvas.translate(offset.dx, offset.dy);

        // Delegate to Flame rendering
        game.render(canvas);

        canvas.restore();
    }

    void performLayout() {
        // Tell game about size changes
        size = constraints.biggest;
        game.onGameResize(size);
    }

    void detach() {
        gameLoop.stop();
        ticker.dispose();
        super.detach();
    }
}

// Ticker provides vsync:
class Ticker {
    void start() {
        SchedulerBinding.scheduleFrameCallback((elapsed) {
            callback(elapsed);
            if (running) {
                SchedulerBinding.scheduleFrameCallback(...);  // Next frame
            }
        });
    }
}
```

This pattern allows Flame to integrate seamlessly with Flutter's widget tree and vsync.
:p How does GameRenderBox bridge Flame's game loop to Flutter's rendering pipeline?
?x
GameRenderBox **extends RenderBox** to integrate game loop with Flutter:

Flutter's render tree:
```
Widget tree
  → Element tree
    → RenderObject tree
      → GameRenderBox ← Flame integrates here
```

Lifecycle integration:
```java
class GameRenderBox extends RenderBox {

    // 1. Attachment (widget mounted)
    attach(PipelineOwner owner) {
        game.onLoad();           // Initialize Flame
        ticker = Ticker(onTick); // Create ticker
        ticker.start();          // Start game loop
    }

    // 2. Frame callback (from Ticker)
    onTick(Duration elapsed) {
        dt = elapsed - lastElapsed;
        game.update(dt);         // Flame update
        markNeedsPaint();        // Request Flutter repaint
    }

    // 3. Paint phase (Flutter rendering)
    paint(PaintingContext ctx, Offset offset) {
        Canvas canvas = ctx.canvas;
        canvas.translate(offset);
        game.render(canvas);     // Flame render
    }

    // 4. Layout phase (size changes)
    performLayout() {
        size = constraints.biggest;
        game.onGameResize(size); // Notify Flame
    }

    // 5. Detachment (widget unmounted)
    detach() {
        ticker.stop();
        gameLoop.dispose();
        game.onRemove();
    }
}
```

Sync with vsync:
```
Flutter vsync signal (60 FPS)
    ↓
Ticker callback
    ↓
game.update(dt)
    ↓
markNeedsPaint()
    ↓
Paint phase scheduled
    ↓
paint() calls game.render()
```

Benefits:
- **Perfect frame sync** with Flutter's vsync
- **Part of widget tree** - can combine with Flutter widgets
- **Standard RenderBox** - follows Flutter conventions
- **Automatic lifecycle** - attach/detach handled by Flutter
x?

---

## Component Tree Patterns

#### Depth-First Postorder Traversal
Hit testing uses depth-first postorder traversal (visit children before parent) reversed, ensuring highest-priority components (rendered on top) are tested first. This finds the topmost visual element under a point.

```java
class Component {
    List<Component> children;
    int priority;

    List<Component> componentsAtLocation(Vector2 point) {
        List<Component> result = new ArrayList<>();

        // Recursive depth-first traversal
        collectComponentsAtLocation(point, result);

        // Reverse for top-to-bottom hit testing
        Collections.reverse(result);
        return result;
    }

    void collectComponentsAtLocation(Vector2 point, List<Component> result) {
        // Transform point to local coordinates
        Vector2 localPoint = parentToLocal(point);

        if (!containsLocalPoint(localPoint)) {
            return;  // Not hitting this component or children
        }

        // Visit children first (depth-first)
        for (Component child : childrenInPriorityOrder()) {
            child.collectComponentsAtLocation(localPoint, result);
        }

        // Visit self after children (postorder)
        result.add(this);
    }

    List<Component> childrenInPriorityOrder() {
        // OrderedSet already maintains priority order
        return children;  // Low to high priority
    }
}

// Example tree with priorities:
//     Root (0)
//     ├─ A (10)
//     │  └─ A1 (5)
//     └─ B (20)
//        └─ B1 (15)
//
// Traversal order: A1, A, B1, B, Root
// After reverse: Root, B, B1, A, A1
// Hit test finds: B first (highest priority rendered last = on top)
```

Postorder ensures children processed before parents, critical for hit testing since children render on top.
:p Why does Flame use reversed postorder traversal for hit testing?
?x
Reversed postorder matches **rendering order**, finding topmost visual element:

Rendering order (normal postorder):
```java
render(component) {
    for (child : component.children) {
        render(child);  // Children first
    }
    component.draw();   // Self after (drawn on top)
}

// Example tree:
Root (priority 0)
├─ Child A (priority 10)
└─ Child B (priority 20)

Render order: A, B, Root
Visual stack (bottom to top): Root, A, B
```

Hit testing (reversed postorder):
```java
hitTest(point) {
    // Collect in postorder
    result = depthFirstPostorder(root, point);
    // [A, B, Root]

    // Reverse
    result.reverse();
    // [Root, B, A]

    return result.first();  // Root (topmost)
}
```

Why reversed postorder:
```
Visual stack:          Test order:
┌──────────┐          ┌──────────┐
│    B     │ ← on top │    B     │ ← test first
├──────────┤          ├──────────┤
│    A     │          │    A     │ ← test second
├──────────┤          ├──────────┤
│   Root   │          │   Root   │ ← test last
└──────────┘          └──────────┘
```

Postorder guarantees:
```
Component rendered after children
→ Component drawn on top of children
→ Component should be hit-tested before children
→ Need reverse of render order
→ Reverse of postorder
```

Example:
```
Click at (50, 50)
Both B and A contain point
B has higher priority (20 > 10)
B rendered last (on top)
B found first in hit test ✓
```
x?

---

#### Transform Propagation Pattern
PositionComponent calculates absolute world transforms by recursively accumulating parent transforms. Changes propagate down the tree using dirty flags, with caching to avoid redundant calculations.

```java
class PositionComponent {
    // Local transform
    Vector2 position;
    double angle;
    Vector2 scale;

    // Cached absolute transform
    Vector2 _absolutePosition;
    double _absoluteAngle;
    Vector2 _absoluteScale;
    boolean _transformDirty = true;

    void setPosition(Vector2 pos) {
        position = pos;
        invalidateTransform();  // Mark dirty
    }

    void invalidateTransform() {
        _transformDirty = true;

        // Recursively invalidate children
        for (child : children) {
            if (child is PositionComponent) {
                child.invalidateTransform();
            }
        }
    }

    Vector2 getAbsolutePosition() {
        if (_transformDirty) {
            recalculateTransform();
        }
        return _absolutePosition;
    }

    void recalculateTransform() {
        if (parent is PositionComponent) {
            // Accumulate parent's transform
            Vector2 parentPos = parent.getAbsolutePosition();
            double parentAngle = parent.getAbsoluteAngle();
            Vector2 parentScale = parent.getAbsoluteScale();

            // Transform local position by parent
            _absolutePosition = rotateAndScale(position, parentAngle, parentScale);
            _absolutePosition += parentPos;

            // Accumulate rotation and scale
            _absoluteAngle = angle + parentAngle;
            _absoluteScale = scale * parentScale;
        } else {
            // No parent, absolute = local
            _absolutePosition = position;
            _absoluteAngle = angle;
            _absoluteScale = scale;
        }

        _transformDirty = false;
    }

    Vector2 rotateAndScale(Vector2 v, double angle, Vector2 scale) {
        // Rotate vector
        double cos = Math.cos(angle);
        double sin = Math.sin(angle);
        double x = v.x * cos - v.y * sin;
        double y = v.x * sin + v.y * cos;

        // Scale
        return new Vector2(x * scale.x, y * scale.y);
    }
}
```

Example: Child at local (10, 0), parent rotated 90°, moves to absolute (0, 10).
:p How do transforms propagate through the component tree in Flame?
?x
Transforms **accumulate** from root to leaves using recursive calculation:

Structure:
```
Root
  position: (100, 100)
  angle: 0
  scale: (1, 1)
  ↓
Parent
  position: (50, 0)    ← local to Root
  angle: π/2           ← 90° rotation
  scale: (2, 2)
  ↓
Child
  position: (10, 0)    ← local to Parent
  angle: π/4           ← 45° rotation
  scale: (1, 1)
```

Calculation:
```java
// Child's absolute position:
1. Parent's absolute position:
   parentAbs = (100, 100) + rotate((50, 0), 0) * (1, 1)
   parentAbs = (150, 100)

2. Child's local position in parent's space:
   localInParent = rotate((10, 0), π/2) * (2, 2)
   localInParent = (0, 10) * (2, 2)
   localInParent = (0, 20)

3. Child's absolute position:
   childAbs = (150, 100) + (0, 20)
   childAbs = (150, 120)

// Child's absolute angle:
childAngle = 0 + π/2 + π/4 = 3π/4

// Child's absolute scale:
childScale = (1, 1) * (2, 2) * (1, 1) = (2, 2)
```

Dirty flag optimization:
```java
parent.position = newPos;  // Changes
  → parent.invalidateTransform()
    → parent._dirty = true
    → for (child : children) {
        child.invalidateTransform()  // Recursive
          → child._dirty = true
      }

later:
child.getAbsolutePosition()
  → if (_dirty) recalculate()  // Lazy
  → _dirty = false
```

Benefits:
- **Lazy calculation** - only when needed
- **Cached results** - reuse until dirty
- **Automatic propagation** - children auto-invalidate
x?

---

## Event System Patterns

#### Event Bubbling with Handled Flag
Input events propagate through component tree from low to high priority. Components can stop propagation by setting event.handled = true. Only components containing the event point receive it.

```java
class TapDownEvent {
    Vector2 globalPosition;
    Vector2 localPosition;
    boolean handled = false;

    void stopPropagation() {
        handled = true;
    }
}

class EventDispatcher {
    void dispatchTapDown(Vector2 position) {
        List<Component> targets = root.componentsAtLocation(position);

        // targets already sorted by priority (low to high)
        for (Component target : targets) {
            if (target is TapCallbacks) {
                // Transform to component's local space
                Vector2 localPos = target.toLocal(position);

                TapDownEvent event = new TapDownEvent(
                    globalPosition: position,
                    localPosition: localPos,
                );

                target.onTapDown(event);

                if (event.handled) {
                    break;  // Stop propagation
                }
            }
        }
    }
}

// Usage in components:
class Button extends PositionComponent with TapCallbacks {
    void onTapDown(TapDownEvent event) {
        // Handle button tap
        executeAction();

        // Stop event from reaching components behind button
        event.handled = true;
    }
}

class Background extends PositionComponent with TapCallbacks {
    void onTapDown(TapDownEvent event) {
        // Background tap (only if no button caught it)
        clearSelection();
        // Don't set handled, allow further propagation
    }
}

// Example scenario:
// Components: Background (priority 0), Button (priority 10)
// Tap on button at (50, 50)
// 1. Background.onTapDown() called first (lower priority)
// 2. Button.onTapDown() called second
// 3. Button sets event.handled = true
// 4. No more components called
```

This allows UI elements to "consume" events and prevent underlying elements from reacting.
:p How does Flame's event system implement bubbling with the handled flag?
?x
Events propagate **through visual stack** with explicit stop mechanism:

Event flow:
```java
dispatchEvent(position) {
    // 1. Find all components at position
    targets = componentsAtLocation(position);
    // Returns [Background, MiddleLayer, Button]
    // Sorted by priority (low to high)

    // 2. Create event
    event = new TapEvent(position);
    event.handled = false;

    // 3. Dispatch to each target
    for (target : targets) {
        target.onTap(event);

        if (event.handled) {
            break;  // Stop propagation
        }
    }
}
```

Example scenario:
```
Visual stack (bottom to top):
┌──────────────┐
│   Button     │ priority: 20
├──────────────┤
│  MiddleLayer │ priority: 10
├──────────────┤
│  Background  │ priority: 0
└──────────────┘

User taps on Button
```

Propagation:
```java
// 1. Background receives first (low priority)
Background.onTap(event) {
    print("Background tapped");
    // event.handled = false (continue)
}

// 2. MiddleLayer receives second
MiddleLayer.onTap(event) {
    print("MiddleLayer tapped");
    // event.handled = false (continue)
}

// 3. Button receives last (high priority)
Button.onTap(event) {
    print("Button clicked");
    event.handled = true;  // STOP HERE
    executeAction();
}

// 4. No more components called
```

Why this order:
- Rendering: Background → MiddleLayer → Button (bottom to top)
- Hit testing: All three contain point
- Event dispatch: Same order, Button decides to stop

Common pattern:
```java
// Interactive elements stop propagation
Button.onTap(event) {
    event.handled = true;  // I handle this
}

// Background doesn't stop
Background.onTap(event) {
    // event.handled stays false
    // Allows overlapping elements to also respond
}
```
x?

---

#### NotifyingVector2 Automatic Invalidation
NotifyingVector2 automatically notifies parent component when x or y changes, triggering transform recalculation. This eliminates manual invalidation calls and ensures transforms stay synchronized.

```java
class NotifyingVector2 {
    double _x, _y;
    PositionComponent parent;

    NotifyingVector2(this.parent);

    double get x => _x;

    void set x(double value) {
        if (_x != value) {
            _x = value;
            notifyParent();  // Auto-invalidate
        }
    }

    double get y => _y;

    void set y(double value) {
        if (_y != value) {
            _y = value;
            notifyParent();  // Auto-invalidate
        }
    }

    void setValues(double x, double y) {
        boolean changed = (_x != x) || (_y != y);
        _x = x;
        _y = y;
        if (changed) {
            notifyParent();  // Single notification for both
        }
    }

    void notifyParent() {
        parent.onPositionChanged();
    }
}

class PositionComponent {
    NotifyingVector2 position;
    Transform2D transform;

    PositionComponent() {
        position = new NotifyingVector2(this);
    }

    void onPositionChanged() {
        transform.invalidate();  // Mark transform dirty

        // Propagate to children
        for (child : children) {
            if (child is PositionComponent) {
                child.transform.invalidate();
            }
        }
    }
}

// Usage comparison:
// Without NotifyingVector2:
component.position.x = 10;
component.invalidateTransform();  // Must remember!

// With NotifyingVector2:
component.position.x = 10;  // Auto-invalidates!
```

This pattern prevents bugs where transform updates are forgotten after position changes.
:p Why does Flame use NotifyingVector2 instead of regular Vector2 for component positions?
?x
NotifyingVector2 provides **automatic change detection** and invalidation:

Regular Vector2 problem:
```java
class Component {
    Vector2 position;
    Transform2D transform;

    void moveRight() {
        position.x += 10;
        // BUG: Forgot to invalidate transform!
        // Transform cache now stale
    }

    Matrix4 getTransform() {
        return transform.getMatrix();  // Returns WRONG cached matrix
    }
}
```

NotifyingVector2 solution:
```java
class NotifyingVector2 {
    double _x;
    PositionComponent owner;

    set x(double value) {
        _x = value;
        owner.onPositionChanged();  // Auto-notify
    }
}

class Component {
    NotifyingVector2 position;  // Knows its owner

    Component() {
        position = NotifyingVector2(this);  // Bind to owner
    }

    void onPositionChanged() {
        transform.invalidate();  // Auto-invalidate
    }

    void moveRight() {
        position.x += 10;  // Automatically invalidates!
    }
}
```

Benefits:
```java
// 1. No manual invalidation
position.x = 100;  // ✓ Auto-invalidates

// 2. Works with all operations
position.x += 10;   // ✓ Auto-invalidates
position.setAll(x, y);  // ✓ Auto-invalidates
position.rotate(angle);  // ✓ Auto-invalidates

// 3. Batch notifications
position.setValues(x, y) {
    _x = x;
    _y = y;
    notifyOnce();  // Single notification for both changes
}

// 4. Prevents bugs
// Can't forget to invalidate - automatic!
```

Pattern also used in:
- NotifyingDouble for angle
- NotifyingVector2 for scale
- Any property affecting cached transforms
x?

---

## Asynchronous Patterns

#### Async-Safe Component Loading
Component onLoad() is async, allowing asset loading without blocking. The lifecycle state machine ensures components don't mount until loading completes, preventing race conditions.

```java
class Component {
    int _state = INITIAL;
    Future<void> _loadFuture;

    Future<void> add(Component child) {
        children.add(child);

        if (isMounted) {
            // Parent already mounted, start child loading immediately
            child._startLoading();
        }
        // Otherwise, child loads when parent mounts
    }

    void _startLoading() {
        if (_state != INITIAL) return;

        _state = LOADING;
        _loadFuture = _executeLoad();
    }

    Future<void> _executeLoad() async {
        try {
            await onLoad();  // User's async code

            // Wait for all children to load
            for (child : children) {
                await child._loadFuture;
            }

            _state = LOADED;
            _tryMount();
        } catch (e) {
            _state = FAILED;
            handleLoadError(e);
        }
    }

    void _tryMount() {
        if (_state != LOADED) return;
        if (parent == null || !parent.isMounted) return;

        _state = MOUNTING;
        onMount();
        _state = MOUNTED;

        // Mount children recursively
        for (child : children) {
            child._tryMount();
        }
    }
}

// Usage - no race conditions:
class Player extends SpriteComponent {
    Future<void> onLoad() async {
        // Load sprite async
        sprite = await Sprite.load('player.png');

        // Load child components
        final weapon = Weapon();
        await add(weapon);  // Wait for weapon to load

        // Both player and weapon loaded before mounting
    }

    void onMount() {
        // Safe: sprite is definitely loaded
        // Safe: all children are loaded
        startAnimation();
    }
}
```

State machine ensures: initial → loading → loaded → mounting → mounted (never skip states).
:p How does Flame's async loading system prevent race conditions during component initialization?
?x
State machine ensures **ordered progression** with async safety:

State flow:
```java
Component lifecycle:
INITIAL
  ↓ add(child) called
LOADING (await onLoad())
  ↓ onLoad() completes
LOADED (waiting for parent)
  ↓ parent mounted
MOUNTING (onMount() called)
  ↓
MOUNTED (active)
```

Race condition prevention:
```java
// Problem without state machine:
class Player {
    Sprite sprite;

    async onLoad() {
        sprite = await Sprite.load('player.png');
        // What if render() called here?
    }

    render(canvas) {
        sprite.render(canvas);  // sprite might be null!
    }
}

// Solution with state machine:
lifecycle() {
    if (state == INITIAL) {
        state = LOADING;
        await onLoad();
        state = LOADED;
    }

    if (state == LOADED && parentMounted) {
        state = MOUNTING;
        onMount();
        state = MOUNTED;
    }

    // Render only if mounted
    if (state == MOUNTED) {
        render();  // Safe: onLoad() definitely complete
    }
}
```

Guarantees:
```java
// 1. onLoad() completes before onMount()
state: LOADING → LOADED → MOUNTING
Cannot skip to MOUNTING while LOADING

// 2. Children load before parent mounts
parent.onLoad() {
    await child1.add();  // Wait for child1.onLoad()
    await child2.add();  // Wait for child2.onLoad()
}
parent.onMount() {
    // All children definitely loaded
}

// 3. No rendering until mounted
update(), render() {
    if (!isMounted) return;  // Skip if not ready
    // Safe: all loading complete
}

// 4. Parallel loading supported
onLoad() {
    await Future.wait([
        child1.add(),
        child2.add(),
        child3.add(),
    ]);  // Load in parallel, wait for all
}
```

Example timeline:
```
Frame 1: add(player) → player.state = LOADING
Frame 2: player.onLoad() in progress...
Frame 3: player.onLoad() complete → state = LOADED
Frame 4: state = MOUNTING → onMount() → state = MOUNTED
Frame 5: update() and render() now execute
```
x?

---

#### Future-Based Lifecycle Event Processing
Lifecycle events can be awaited using Future.wait pattern, ensuring tree modifications complete before proceeding. Critical for guaranteeing component state during tests and sequential operations.

```java
class ComponentTreeRoot {
    RecycledQueue<LifecycleEvent> eventQueue;
    Completer<void> _processingCompleter;

    void enqueueEvent(LifecycleEvent event) {
        eventQueue.add(event);
    }

    Future<void> processLifecycleEvents() async {
        if (_processingCompleter != null) {
            // Already processing, wait for current batch
            return _processingCompleter.future;
        }

        _processingCompleter = Completer<void>();

        try {
            while (eventQueue.isNotEmpty) {
                LifecycleEvent event = eventQueue.dequeue();

                switch (event.type) {
                    case ADD:
                        await processAdd(event.component);
                        break;
                    case REMOVE:
                        await processRemove(event.component);
                        break;
                    case MOVE:
                        await processMove(event.component, event.newParent);
                        break;
                }

                eventQueue.recycle(event);
            }
        } finally {
            _processingCompleter.complete();
            _processingCompleter = null;
        }
    }

    Future<void> processAdd(Component component) async {
        // Start loading
        component._startLoading();

        // Wait for loading to complete
        await component._loadFuture;

        // Mount if parent ready
        if (component.parent.isMounted) {
            component._mount();
        }
    }
}

// Usage patterns:
// 1. Sequential operations
game.add(player);
await game.processLifecycleEvents();
// Player definitely added and loaded

game.remove(enemy);
await game.processLifecycleEvents();
// Enemy definitely removed

// 2. Guaranteed state in tests
test('player loads sprite', () async {
    game.add(player);
    await game.ready();  // Waits for processLifecycleEvents

    expect(player.isMounted, true);  // Guaranteed
    expect(player.sprite, isNotNull);  // Guaranteed loaded
});

// 3. Implicit waiting in game loop
update(dt) {
    // Enqueue events
    if (shouldSpawn) {
        game.add(Enemy());
    }
}

await processLifecycleEvents();  // Before render
// All additions processed before rendering
```

Completer pattern allows multiple callers to wait on same processing batch.
:p How does Flame allow waiting for lifecycle events to complete using Futures?
?x
Uses **Completer** pattern to coordinate async event processing:

Completer pattern:
```java
class EventProcessor {
    Completer<void> _completer;
    Queue<Event> events;

    Future<void> processEvents() async {
        // Already processing?
        if (_completer != null) {
            return _completer.future;  // Wait for current batch
        }

        // Start new batch
        _completer = Completer<void>();

        try {
            while (events.isNotEmpty) {
                Event e = events.dequeue();
                await handleEvent(e);  // Async processing
            }
        } finally {
            _completer.complete();  // Signal completion
            _completer = null;
        }
    }
}
```

Multiple waiters:
```java
// Caller 1:
Future<void> operation1() async {
    game.add(component1);
    await game.processLifecycleEvents();  // Waits
    // component1 definitely added
}

// Caller 2 (simultaneous):
Future<void> operation2() async {
    game.add(component2);
    await game.processLifecycleEvents();  // Waits for SAME batch
    // Both components added
}

// Processing:
processLifecycleEvents() {
    if (_completer != null) {
        return _completer.future;  // Both callers wait on same future
    }

    _completer = Completer();
    processAll();  // Processes component1 AND component2
    _completer.complete();  // Both callers resume
}
```

Usage patterns:
```java
// 1. Guaranteed add
game.add(player);
await game.ready();  // Short for processLifecycleEvents()
assert(player.isMounted);  // ✓ Guaranteed

// 2. Guaranteed remove
player.removeFromParent();
await game.ready();
assert(player.parent == null);  // ✓ Guaranteed

// 3. Sequential operations
await game.add(player);
await game.add(enemy);
// Both definitely added in order

// 4. Testing
test('spawns enemy', () async {
    spawnEnemy();
    await game.ready();
    expect(game.children.length, 1);  // ✓ Reliable
});
```

Game loop integration:
```
update(dt):
  enqueue add/remove events
await processLifecycleEvents()
  process all queued events
  callers waiting on events resume here
render():
  all events processed
```
x?

---
