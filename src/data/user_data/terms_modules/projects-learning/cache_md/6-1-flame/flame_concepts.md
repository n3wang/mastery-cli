# Flame Game Engine Flashcards

## Core Architecture

#### FlameGame Base Structure
FlameGame is the recommended game class in Flame that extends the component system. It automatically manages a component tree with a World and CameraComponent. The World contains game entities (priority: -0x7fffffff) and Camera handles rendering (priority: 0x7fffffff).

```dart
class MyGame extends FlameGame {
  @override
  Future<void> onLoad() async {
    // Called once when game initializes
    await world.add(Player());
  }

  @override
  void update(double dt) {
    super.update(dt);
    // Called every frame for game logic
  }
}
```

The FlameGame class provides automatic component lifecycle management, collision detection support, and event handling integration.
:p What is FlameGame and what are its two main automatically created components with their priorities?
??x
FlameGame is the recommended base class for Flame games that provides:
- Automatic component tree management
- **World** component (priority: -0x7fffffff) - contains game entities
- **CameraComponent** (priority: 0x7fffffff) - handles viewport and rendering
- Built-in lifecycle management and event handling

Example:
```dart
class MyGame extends FlameGame {
  // Automatically has world and camera
}
```
x??

---

#### Game Loop Execution Flow
The game loop runs at approximately 60 FPS, driven by Flutter's Ticker. Each frame has two distinct phases: update (logic) and render (drawing). All components update before any rendering occurs, ensuring deterministic behavior.

```pseudocode
EACH FRAME:
  1. Flutter requests animation frame
  2. GameLoop._tick(timestamp)
  3. Calculate dt = currentTime - lastTime
  4. UPDATE PHASE:
     - game.update(dt)
     - processLifecycleEvents()
     - updateTree(dt) recursively
  5. RENDER PHASE:
     - markNeedsPaint()
     - game.render(Canvas)
     - renderTree(Canvas) recursively
  6. Wait for next frame
```

This separation ensures no state changes happen during rendering and no rendering happens during state updates.
:p What are the two main phases of the Flame game loop and why are they separated?
??x
The two phases are:
1. **Update Phase**: All game logic and state changes (no rendering)
2. **Render Phase**: Only drawing operations (no state changes)

They are separated to ensure:
- Deterministic behavior (all components update before any render)
- No race conditions between state and rendering
- Consistent frame timing

Flow:
```pseudocode
game.update(dt) → all logic updates
    ↓
game.render(canvas) → all drawing
```
x??

---

#### Delta Time (dt) Concept
Delta time (dt) represents the time elapsed since the last frame in seconds. It's crucial for frame-rate independent movement and ensures your game runs at the same speed regardless of device performance.

```dart
// WITHOUT dt (frame-rate dependent - BAD)
position.x += 5;  // Moves 5 pixels per frame
// On 60 FPS: 300 pixels/second
// On 30 FPS: 150 pixels/second (half speed!)

// WITH dt (frame-rate independent - GOOD)
position.x += speed * dt;  // speed = 300
// On 60 FPS: 300 * (1/60) = 5 pixels per frame
// On 30 FPS: 300 * (1/30) = 10 pixels per frame
// Both: 300 pixels/second ✓
```

Always multiply movement and time-based changes by dt to ensure consistent behavior across different devices and frame rates.
:p Why must you multiply velocity by dt in the update method?
??x
Multiplying by dt ensures **frame-rate independent** movement. Without it, your game speed depends on FPS.

Example with speed = 300 pixels/second:
```dart
// WRONG - frame dependent
position += velocity;  // Different speed on different devices

// CORRECT - frame independent
position += velocity * dt;  // Same speed everywhere
```

Calculation:
```
dt = time since last frame (seconds)
At 60 FPS: dt ≈ 0.0167 seconds
At 30 FPS: dt ≈ 0.0333 seconds

movement = velocity * dt
300 * 0.0167 = 5 pixels (60 FPS)
300 * 0.0333 = 10 pixels (30 FPS)
Both = 300 pixels/second ✓
```
x??

---

## Component System

#### Component Base Class
Component is the foundation of the Flame Component System (FCS). Everything in a Flame game is a component organized in a hierarchical tree. Components can contain other components, have a priority for rendering order, and follow a strict lifecycle.

```dart
class MyComponent extends Component {
  @override
  Future<void> onLoad() async {
    // Init once (async safe)
  }

  @override
  void update(double dt) {
    // Every frame logic
  }

  @override
  void render(Canvas canvas) {
    // Every frame drawing
  }
}
```

Components use priority for rendering order: higher priority = rendered last = appears on top.
:p What is the Component class and what is its role in Flame?
??x
Component is the **base class for all game objects** in Flame. It provides:
- Hierarchical parent-child relationships
- Priority-based rendering (higher = on top)
- Lifecycle management (onLoad, update, render, onRemove)
- Event propagation support

Structure:
```
Component (base)
├── Can contain child components
├── Has priority (rendering order)
└── Follows lifecycle states

Example:
Component
├── Component A (priority: 1)
└── Component B (priority: 10) ← renders on top
```
x??

---

#### PositionComponent Properties
PositionComponent extends Component and adds 2D spatial properties: position (x,y), size (width,height), scale, rotation (angle), and anchor. It's the most common base class for game entities.

```dart
class Player extends PositionComponent {
  Player() : super(
    position: Vector2(100, 100),  // x, y coordinates
    size: Vector2(50, 50),        // width, height
    anchor: Anchor.center,         // position reference point
  );

  // Properties you can modify:
  position.x = 200;      // Move horizontally
  position.y = 150;      // Move vertically
  angle = pi / 4;        // Rotate 45 degrees
  scale = Vector2.all(2); // Double size
}
```

The anchor determines which point of the component the position refers to (center, topLeft, bottomCenter, etc.).
:p What are the five main spatial properties of PositionComponent?
??x
The five properties are:
1. **position**: Vector2(x, y) - location in world
2. **size**: Vector2(width, height) - dimensions
3. **angle**: double - rotation in radians
4. **scale**: Vector2 - size multiplier
5. **anchor**: Anchor - position reference point

Example:
```dart
PositionComponent(
  position: Vector2(100, 100),  // at (100, 100)
  size: Vector2(50, 50),        // 50x50 pixels
  angle: 0,                      // no rotation
  scale: Vector2.all(1),         // normal size
  anchor: Anchor.center,         // position = center
)
```

Anchor examples:
- Anchor.center → position is at center
- Anchor.topLeft → position is at top-left corner
x??

---

#### Component Lifecycle States
Components follow a state machine with 7 states: initial → loading → loaded → mounting → mounted → removing → removed. The lifecycle ensures proper initialization and cleanup, with async-safe loading.

```pseudocode
Component()
  → [initial]

add(parent)
  → enqueue LifecycleEvent.add

processLifecycleEvents()
  → [loading]
  → onLoad() executes (async)
  → [loaded]

  → [mounting]
  → onGameResize() if needed
  → onMount() executes
  → [mounted] ← ACTIVE STATE
     ├── update(dt) every frame
     ├── render(canvas) every frame
     └── onGameResize(size) on resize

removeFromParent()
  → enqueue LifecycleEvent.remove
  → [removing]
  → onRemove() executes
  → [removed]
```

Lifecycle events are queued and processed between update and render to ensure safe tree modifications.
:p What are the four main lifecycle methods of a Component and when is each called?
??x
The four main lifecycle methods:

1. **onLoad()** - Called once per lifetime, async initialization
2. **onMount()** - Called when ready in tree (can be multiple times if re-parented)
3. **update(dt)** - Called every frame for game logic
4. **onRemove()** - Called when removed for cleanup

Flow:
```dart
class MyComponent extends Component {
  @override
  Future<void> onLoad() async {
    // Load assets, initialize data (ONCE)
  }

  @override
  void onMount() {
    // Component is ready in tree
  }

  @override
  void update(double dt) {
    // Every frame logic (60 FPS)
  }

  @override
  void onRemove() {
    // Cleanup resources
  }
}
```
x??

---

#### Component Priority System
Priority determines rendering order in the component tree. Components with higher priority values are rendered last, appearing on top. Default priority is 0. Priority ranges from negative to positive integers.

```dart
// Setup:
world.add(Background()..priority = -100);  // Rendered first (back)
world.add(Player()..priority = 0);         // Default (middle)
world.add(UI()..priority = 100);           // Rendered last (front)

// Rendering order:
// 1. Background (priority: -100)
// 2. Player (priority: 0)
// 3. UI (priority: 100) ← visible on top

// Flame's defaults:
World: priority = -0x7fffffff      // Very back
CameraComponent: priority = 0x7fffffff  // Very front
```

Think of priority as Z-index: higher = closer to camera = on top of everything else.
:p How does the priority property affect component rendering order?
??x
**Higher priority = rendered last = appears on top**

Formula:
```
Lower priority → rendered first → appears in back
Higher priority → rendered last → appears in front
```

Example:
```dart
// Three components:
background.priority = -100;  // ← rendered 1st (back)
player.priority = 0;         // ← rendered 2nd (middle)
ui.priority = 100;           // ← rendered 3rd (front)

Visual result (bottom to top):
┌─────────────┐
│    UI       │ priority: 100
├─────────────┤
│   Player    │ priority: 0
├─────────────┤
│ Background  │ priority: -100
└─────────────┘
```

Default Flame priorities:
- World: -0x7fffffff (always back)
- CameraComponent: 0x7fffffff (always front)
x??

---

#### Lifecycle Event Queue
Component tree modifications (add/remove) are deferred to a queue and processed at a safe moment (after update, before render). This prevents concurrent modification exceptions and ensures tree stability during iteration.

```pseudocode
// When you call add():
game.add(component)
  → Creates LifecycleEvent.add
  → Adds to event queue
  → Returns immediately
  → Component NOT yet in tree!

// Game loop processes events:
EACH FRAME:
  1. update(dt) on all components
  2. processLifecycleEvents() ← HERE
     - Process all queued adds
     - Call onLoad() for new components
     - Process all queued removes
     - Call onRemove() for removed components
  3. render(canvas) on all components

// Waiting for events:
await game.add(component);
// OR
game.add(component);
await game.lifecycleEventsProcessed;
// Now component is definitely in tree
```

This design ensures you can safely add/remove components during update() without breaking iteration.
:p Why are component add/remove operations queued instead of happening immediately?
??x
Operations are queued to prevent **concurrent modification** of the component tree during iteration.

Problem without queuing:
```dart
// BAD - if immediate:
for (component in children) {
  component.update(dt);
  // If component adds/removes others here:
  // → modifies list while iterating
  // → ConcurrentModificationException!
}
```

Solution with queuing:
```pseudocode
FRAME CYCLE:
1. update(dt) all components
   - Calls to add()/remove() are queued
   - Tree is NOT modified yet

2. processLifecycleEvents()
   - NOW process all queued operations
   - Safe: no iteration happening

3. render(canvas) all components
```

Usage:
```dart
// Queue operation
game.add(component);  // queued

// Wait for processing
await game.lifecycleEventsProcessed;
// Now component is in tree
```
x??

---

## Collision Detection

#### Collision System Setup
Flame's collision detection requires three things: 1) Game must have `HasCollisionDetection` mixin, 2) Components need `CollisionCallbacks` mixin, 3) Components must add a Hitbox child (CircleHitbox, RectangleHitbox, etc.).

```dart
// 1. Game with collision detection
class MyGame extends FlameGame with HasCollisionDetection {
  // Automatically runs collision detection each frame
}

// 2. Component with collision callbacks
class Player extends PositionComponent with CollisionCallbacks {
  @override
  Future<void> onLoad() async {
    // 3. Add hitbox
    add(CircleHitbox());
  }

  @override
  void onCollisionStart(Set<Vector2> points, PositionComponent other) {
    // Called when collision begins
    print('Collided with $other');
  }

  @override
  void onCollisionEnd(PositionComponent other) {
    // Called when collision ends
  }
}
```

Collision detection runs every frame automatically, checking all components with hitboxes.
:p What three things are required for collision detection in Flame?
??x
Three requirements:

1. **Game mixin**: `HasCollisionDetection`
2. **Component mixin**: `CollisionCallbacks`
3. **Hitbox**: Add CircleHitbox, RectangleHitbox, etc.

Complete example:
```dart
// 1. Enable on game
class MyGame extends FlameGame
    with HasCollisionDetection {}

// 2. Add to component
class Player extends PositionComponent
    with CollisionCallbacks {

  @override
  Future<void> onLoad() async {
    // 3. Add hitbox shape
    add(CircleHitbox());
  }

  @override
  void onCollisionStart(
    Set<Vector2> points,
    PositionComponent other
  ) {
    // Handle collision
  }
}
```

Without all three, collisions won't work!
x??

---

#### Collision Callbacks
CollisionCallbacks provides three methods for different collision phases: onCollisionStart (first contact), onCollision (continuous overlap), and onCollisionEnd (separation). Each receives information about the other component involved.

```dart
class Bullet extends PositionComponent with CollisionCallbacks {
  @override
  void onCollisionStart(
    Set<Vector2> intersectionPoints,  // Where collision occurred
    PositionComponent other           // What we hit
  ) {
    // Called ONCE when collision begins
    if (other is Enemy) {
      other.takeDamage();
      removeFromParent();  // Bullet disappears
    }
  }

  @override
  void onCollision(
    Set<Vector2> intersectionPoints,
    PositionComponent other
  ) {
    // Called EVERY FRAME while overlapping
    // Use for continuous effects
  }

  @override
  void onCollisionEnd(PositionComponent other) {
    // Called ONCE when collision ends
    // No intersection points (already separated)
  }
}
```

Use onCollisionStart for one-time events, onCollision for continuous effects, onCollisionEnd for cleanup.
:p What are the three collision callback methods and when is each called?
??x
Three collision callbacks:

1. **onCollisionStart()** - Called once when collision begins
2. **onCollision()** - Called every frame while overlapping
3. **onCollisionEnd()** - Called once when collision ends

Timeline:
```
Frame 1: Components touch
  → onCollisionStart(points, other)

Frames 2-5: Still overlapping
  → onCollision(points, other)  // each frame

Frame 6: Separated
  → onCollisionEnd(other)
```

Example usage:
```dart
@override
void onCollisionStart(
  Set<Vector2> points,
  PositionComponent other
) {
  // One-time: damage, score, removal
  if (other is Enemy) {
    score++;
    removeFromParent();
  }
}

@override
void onCollision(
  Set<Vector2> points,
  PositionComponent other
) {
  // Continuous: pushing, draining health
}
```
x??

---

#### Hitbox Types
Hitboxes define the collision shape of a component. Flame provides CircleHitbox (circular), RectangleHitbox (rectangular), and PolygonHitbox (custom shape). Hitboxes are children components added during onLoad.

```dart
class Player extends PositionComponent with CollisionCallbacks {
  @override
  Future<void> onLoad() async {
    // Circle hitbox (default: matches component size)
    add(CircleHitbox());

    // Rectangle hitbox with custom size
    add(RectangleHitbox(
      size: Vector2(30, 50),
      position: Vector2(10, 0),
    ));

    // Polygon hitbox with custom vertices
    add(PolygonHitbox([
      Vector2(0, 0),
      Vector2(50, 0),
      Vector2(25, 50),
    ]));

    // Multiple hitboxes allowed!
    add(CircleHitbox()..radius = 10);
    add(RectangleHitbox()..size = Vector2(20, 20));
  }
}
```

Choose hitbox shape based on your component's visual shape for accurate collision detection.
:p What are the three main types of hitboxes in Flame and how do you add them?
??x
Three hitbox types:

1. **CircleHitbox** - Circular collision area
2. **RectangleHitbox** - Rectangular collision area
3. **PolygonHitbox** - Custom polygon shape

Adding hitboxes:
```dart
@override
Future<void> onLoad() async {
  // Circle (default size matches component)
  add(CircleHitbox());

  // Rectangle with custom properties
  add(RectangleHitbox(
    size: Vector2(30, 40),
    position: Vector2(5, 5),
  ));

  // Polygon with vertex list
  add(PolygonHitbox([
    Vector2(0, 0),
    Vector2(50, 0),
    Vector2(25, 50),
  ]));

  // Can add multiple hitboxes!
}
```

Hitboxes are **child components** and inherit parent's transform (position, rotation, scale).
x??

---

## Effects and Animation

#### Effect System Overview
Effects are time-based modifications to components using an EffectController that tracks progress from 0.0 to 1.0. Common effects include MoveEffect, ScaleEffect, RotateEffect, and OpacityEffect. Effects are added as child components.

```dart
// Basic effect structure:
component.add(
  MoveEffect.to(
    Vector2(100, 100),           // Target
    EffectController(duration: 2), // 2 seconds
  ),
);

// Effect progress (EffectController):
// Time 0s:   progress = 0.0 (start)
// Time 1s:   progress = 0.5 (halfway)
// Time 2s:   progress = 1.0 (complete, effect removes itself)

// Common effects:
component.add(MoveEffect.to(target, controller));
component.add(ScaleEffect.by(Vector2.all(2), controller));
component.add(RotateEffect.by(pi, controller));
component.add(OpacityEffect.to(0, controller));
component.add(RemoveEffect(delay: 1.0)); // Remove after delay
```

Effects automatically remove themselves when complete (progress = 1.0).
:p What is an Effect in Flame and how does EffectController track progress?
??x
An **Effect** is a time-based component modification that uses EffectController to track progress from 0.0 to 1.0.

EffectController tracking:
```dart
EffectController(duration: 2.0)  // 2 seconds

Time tracking:
t=0.0s → progress=0.0 (start)
t=0.5s → progress=0.25
t=1.0s → progress=0.5 (halfway)
t=1.5s → progress=0.75
t=2.0s → progress=1.0 (complete, auto-remove)
```

Usage:
```dart
// Move over 2 seconds
component.add(
  MoveEffect.to(
    Vector2(200, 200),
    EffectController(duration: 2),
  ),
);

// Effect calculates:
// position = lerp(start, target, progress)
// At progress=0.5: halfway between start and target
```

Effects are **components** (added as children) and auto-remove when done.
x??

---

#### Common Effect Types
Flame provides several built-in effects for common animations: MoveEffect (position), ScaleEffect (size), RotateEffect (angle), OpacityEffect (transparency), and SequenceEffect (chain effects).

```dart
// MoveEffect - change position
component.add(MoveEffect.to(
  Vector2(100, 100),  // absolute position
  EffectController(duration: 1),
));

component.add(MoveEffect.by(
  Vector2(50, 0),  // relative movement
  EffectController(duration: 1),
));

// ScaleEffect - change size
component.add(ScaleEffect.by(
  Vector2.all(2),  // double size
  EffectController(duration: 0.5),
));

// RotateEffect - change angle
component.add(RotateEffect.by(
  pi * 2,  // full rotation
  EffectController(duration: 1),
));

// OpacityEffect - change transparency
component.add(OpacityEffect.to(
  0,  // fade out
  EffectController(duration: 0.5),
));

// SequenceEffect - chain multiple
component.add(SequenceEffect([
  MoveEffect.by(Vector2(0, -50), EffectController(duration: 0.5)),
  ScaleEffect.by(Vector2.all(2), EffectController(duration: 0.3)),
  RemoveEffect(delay: 0.2),
]));
```

Effects can run in parallel (add multiple) or sequence (use SequenceEffect).
:p What are the five main effect types in Flame?
??x
Five main effects:

1. **MoveEffect** - Animate position
2. **ScaleEffect** - Animate size
3. **RotateEffect** - Animate rotation
4. **OpacityEffect** - Animate transparency
5. **SequenceEffect** - Chain multiple effects

Examples:
```dart
// Position: .to() = absolute, .by() = relative
MoveEffect.to(Vector2(100, 100), controller);
MoveEffect.by(Vector2(10, 0), controller);

// Size
ScaleEffect.by(Vector2.all(2), controller);  // 2x size

// Rotation (radians)
RotateEffect.by(pi, controller);  // 180°

// Transparency (0=invisible, 1=opaque)
OpacityEffect.to(0, controller);  // fade out
OpacityEffect.fadeIn(controller); // convenience

// Chain effects
SequenceEffect([
  MoveEffect.by(Vector2(0, -50), controller1),
  ScaleEffect.to(Vector2.zero(), controller2),
  RemoveEffect(delay: 0),
]);
```
x??

---

#### Effect Completion Callbacks
Effects can trigger callbacks when they complete using the onComplete parameter. This is useful for chaining actions, removing components, or triggering game events after animations.

```dart
// Basic completion callback
component.add(
  MoveEffect.to(
    Vector2(100, 100),
    EffectController(duration: 1),
    onComplete: () {
      print('Movement finished!');
    },
  ),
);

// Common pattern: remove after animation
component.add(
  ScaleEffect.to(
    Vector2.zero(),
    EffectController(duration: 0.5),
    onComplete: () => component.removeFromParent(),
  ),
);

// Chain without SequenceEffect
component.add(
  MoveEffect.to(
    Vector2(100, 100),
    EffectController(duration: 1),
    onComplete: () {
      // Add next effect when first completes
      component.add(
        ScaleEffect.by(
          Vector2.all(2),
          EffectController(duration: 0.5),
        ),
      );
    },
  ),
);
```

Callbacks execute when progress reaches 1.0 (animation complete).
:p How do you execute code after an effect completes?
??x
Use the **onComplete** parameter in the effect constructor.

Syntax:
```dart
component.add(
  EffectType(
    parameters,
    EffectController(duration: X),
    onComplete: () {
      // Code runs when progress = 1.0
    },
  ),
);
```

Common patterns:
```dart
// 1. Remove component after animation
MoveEffect.to(
  target,
  EffectController(duration: 1),
  onComplete: () => component.removeFromParent(),
);

// 2. Chain effects manually
ScaleEffect.to(
  Vector2.zero(),
  EffectController(duration: 0.5),
  onComplete: () {
    component.add(nextEffect);
  },
);

// 3. Trigger game event
OpacityEffect.to(
  0,
  EffectController(duration: 1),
  onComplete: () => game.levelComplete(),
);
```

Alternative: Use **SequenceEffect** for chaining.
x??

---

## Input Handling

#### Input Callback Mixins
Flame uses mixins to add input handling capabilities to components. Common mixins include TapCallbacks (tap/click), DragCallbacks (drag), HoverCallbacks (mouse hover), and KeyboardHandler (keyboard input).

```dart
// Tap handling
class Button extends PositionComponent with TapCallbacks {
  @override
  void onTapDown(TapDownEvent event) {
    print('Tapped at ${event.localPosition}');
  }

  @override
  void onTapUp(TapUpEvent event) {
    print('Released');
  }

  @override
  void onTapCancel(TapCancelEvent event) {
    print('Tap cancelled');
  }
}

// Drag handling
class Draggable extends PositionComponent with DragCallbacks {
  @override
  void onDragStart(DragStartEvent event) {}

  @override
  void onDragUpdate(DragUpdateEvent event) {
    position += event.delta;  // Follow drag
  }

  @override
  void onDragEnd(DragEndEvent event) {}
}

// Keyboard handling
class Player extends Component with KeyboardHandler {
  @override
  bool onKeyEvent(KeyEvent event, Set<LogicalKeyboardKey> keysPressed) {
    if (keysPressed.contains(LogicalKeyboardKey.space)) {
      jump();
    }
    return true;  // Event handled
  }
}
```

Game must have corresponding mixin (e.g., HasKeyboardHandlerComponents) for input to work.
:p What are the four main input handling mixins in Flame?
??x
Four main input mixins:

1. **TapCallbacks** - Tap/click events
2. **DragCallbacks** - Drag events
3. **HoverCallbacks** - Mouse hover events
4. **KeyboardHandler** - Keyboard events

Usage:
```dart
// 1. Tap
class Button extends PositionComponent
    with TapCallbacks {
  @override
  void onTapDown(TapDownEvent event) {
    // Handle tap
  }
}

// 2. Drag
class Draggable extends PositionComponent
    with DragCallbacks {
  @override
  void onDragUpdate(DragUpdateEvent event) {
    position += event.delta;
  }
}

// 3. Hover
class Hoverable extends PositionComponent
    with HoverCallbacks {
  @override
  void onHoverEnter() {}
  @override
  void onHoverExit() {}
}

// 4. Keyboard
class Player extends Component
    with KeyboardHandler {
  @override
  bool onKeyEvent(KeyEvent event,
      Set<LogicalKeyboardKey> keys) {
    return true;
  }
}
```
x??

---

#### Event Bubbling and Propagation
Input events propagate through the component tree from back to front (low to high priority). Events can be stopped by setting event.handled = true. Only components whose hitbox contains the event point receive the event.

```pseudocode
TAP EVENT at (100, 100):

1. Check all components with TapCallbacks
2. Sort by priority (low to high)
3. For each component:
   - Check containsLocalPoint(100, 100)
   - If YES: call onTapDown(event)
   - Check if event.handled == true
   - If YES: STOP propagation

Example tree:
Background (priority: 0, covers whole screen)
  → Button (priority: 10, at 100, 100)

Tap at (100, 100):
1. Background.containsLocalPoint() → YES
   Background.onTapDown(event)
   event.handled = false → continue

2. Button.containsLocalPoint() → YES
   Button.onTapDown(event)
   event.handled = true → STOP

3. Background receives tap, but Button stops it
```

Use event.handled = true in components that should "consume" events (buttons, draggables).
:p How does event propagation work in Flame and how can you stop it?
??x
Events **propagate through component tree** from low to high priority. Stop propagation with `event.handled = true`.

Flow:
```pseudocode
INPUT EVENT:
1. Get all components with callbacks
2. Sort by priority (ascending)
3. For each component:
   a. Check if event hits component
      (containsLocalPoint)
   b. If hit: call callback
      (onTapDown, onDragUpdate, etc.)
   c. If event.handled = true:
      → STOP, no more components
   d. Else: continue to next
```

Example:
```dart
// Background (priority: 0)
class Background with TapCallbacks {
  @override
  void onTapDown(TapDownEvent event) {
    print('Background tapped');
    // event.handled = false (default)
    // → continues to Button
  }
}

// Button (priority: 10)
class Button with TapCallbacks {
  @override
  void onTapDown(TapDownEvent event) {
    print('Button tapped');
    event.handled = true;  // STOP HERE
  }
}

// Tap over Button:
// → Background.onTapDown() called
// → Button.onTapDown() called
// → Button stops propagation
```
x??

---

#### Keyboard Input Pattern
Keyboard handling uses the KeyboardHandler mixin and onKeyEvent method. The method receives the key event and a set of currently pressed keys, allowing for multi-key detection (e.g., WASD movement).

```dart
class Player extends PositionComponent with KeyboardHandler {
  final Vector2 velocity = Vector2.zero();
  static const double speed = 200.0;

  @override
  bool onKeyEvent(
    KeyEvent event,                    // Current key event
    Set<LogicalKeyboardKey> keysPressed  // ALL pressed keys
  ) {
    // Reset velocity
    velocity.setZero();

    // Check all pressed keys (allows diagonal)
    if (keysPressed.contains(LogicalKeyboardKey.keyW)) {
      velocity.y = -speed;
    }
    if (keysPressed.contains(LogicalKeyboardKey.keyS)) {
      velocity.y = speed;
    }
    if (keysPressed.contains(LogicalKeyboardKey.keyA)) {
      velocity.x = -speed;
    }
    if (keysPressed.contains(LogicalKeyboardKey.keyD)) {
      velocity.x = speed;
    }

    // Normalize diagonal movement
    if (velocity.length > 0) {
      velocity.normalize();
      velocity.scale(speed);
    }

    return true;  // Event handled
  }

  @override
  void update(double dt) {
    position += velocity * dt;
  }
}
```

Always check the keysPressed set (not just event.key) to detect multiple simultaneous keys.
:p What is the pattern for handling multi-key keyboard input in Flame?
??x
Use the **keysPressed set** in onKeyEvent to check all currently pressed keys simultaneously.

Pattern:
```dart
class Player extends Component
    with KeyboardHandler {
  Vector2 velocity = Vector2.zero();

  @override
  bool onKeyEvent(
    KeyEvent event,
    Set<LogicalKeyboardKey> keysPressed  // ← All pressed
  ) {
    velocity.setZero();

    // Check multiple keys (allows combinations)
    if (keysPressed.contains(LogicalKeyboardKey.keyW)) {
      velocity.y = -speed;  // Up
    }
    if (keysPressed.contains(LogicalKeyboardKey.keyS)) {
      velocity.y = speed;   // Down
    }
    if (keysPressed.contains(LogicalKeyboardKey.keyA)) {
      velocity.x = -speed;  // Left
    }
    if (keysPressed.contains(LogicalKeyboardKey.keyD)) {
      velocity.x = speed;   // Right
    }

    // W+D both pressed → diagonal movement ✓

    return true;  // handled
  }
}
```

**Don't** use event.key alone - it only shows the latest key, not all pressed keys.
x??

---

## Camera and World

#### Camera System Structure
Flame's camera system consists of three parts: CameraComponent (root), Viewport (screen area/shape), and Viewfinder (camera position/zoom). The camera renders the World through these transforms.

```dart
// Automatic setup in FlameGame:
game.camera = CameraComponent()
  ..viewport = Viewport()  // Screen area
  ..viewfinder = Viewfinder()  // Camera transform
  ..world = game.world;  // What to render

// Rendering flow:
Canvas
  → Viewport.transform (clip to screen)
    → Viewfinder.transform (position/zoom)
      → World.render() (draw game entities)

// Components can go in two places:
world.add(Player());  // Moves with camera
camera.viewport.add(ScoreText());  // Fixed on screen (HUD)
```

The separation allows for split-screen, minimaps, and multiple cameras viewing the same world.
:p What are the three main parts of Flame's camera system?
??x
Three parts of the camera system:

1. **CameraComponent** - Root camera object
2. **Viewport** - Screen area and shape
3. **Viewfinder** - Camera position and zoom

Structure:
```
CameraComponent
├── Viewport
│   ├── Defines screen area
│   ├── Can have HUD components
│   └── Examples: MaxViewport, FixedResolutionViewport
│
├── Viewfinder
│   ├── Camera position (where camera looks)
│   ├── Camera zoom (magnification)
│   └── Camera angle (rotation)
│
└── World reference (what to render)
```

Transform flow:
```
World coordinates (game entities)
    ↓
Viewfinder transform (camera position/zoom)
    ↓
Viewport transform (fit to screen)
    ↓
Screen pixels
```

Usage:
```dart
world.add(Player());  // Affected by camera
camera.viewport.add(UI());  // Fixed to screen
```
x??

---

#### Camera Movement
Move the camera by modifying the viewfinder's position and zoom properties. The camera can follow components automatically using camera.follow().

```dart
// Manual camera control
camera.viewfinder.position = Vector2(100, 100);
camera.viewfinder.zoom = 2.0;  // 2x magnification
camera.viewfinder.angle = pi / 4;  // Rotate view

// Follow a component
camera.follow(player);
// Camera automatically updates to track player position

// Follow with offset
camera.follow(
  player,
  maxSpeed: 200,  // Smooth following
);

// Move camera smoothly with effects
camera.viewfinder.add(
  MoveEffect.to(
    Vector2(500, 500),
    EffectController(duration: 2),
  ),
);

// Zoom smoothly
camera.viewfinder.zoom = 1.0;
camera.viewfinder.add(
  ScaleEffect.by(
    Vector2.all(2),  // 2x zoom
    EffectController(duration: 1),
  ),
);
```

Higher zoom = closer view (magnified), lower zoom = farther view (zoomed out).
:p How do you move and zoom the camera in Flame?
??x
Modify **camera.viewfinder** properties:

Properties:
```dart
// Position - where camera looks
camera.viewfinder.position = Vector2(x, y);

// Zoom - magnification level
camera.viewfinder.zoom = 2.0;  // 2x closer
camera.viewfinder.zoom = 0.5;  // 2x farther

// Angle - camera rotation
camera.viewfinder.angle = pi / 4;  // 45°
```

Follow component:
```dart
camera.follow(player);
// Camera tracks player automatically
```

Smooth movement with effects:
```dart
// Smooth pan
camera.viewfinder.add(
  MoveEffect.to(
    Vector2(500, 500),
    EffectController(duration: 2),
  ),
);

// Smooth zoom
camera.viewfinder.add(
  ScaleEffect.by(
    Vector2.all(2),  // Double zoom
    EffectController(duration: 1),
  ),
);
```

Remember: **Higher zoom = closer/magnified view**
x??

---

#### World vs Viewport Components
Components added to World are affected by camera transforms (move, zoom, rotate). Components added to camera.viewport are fixed on screen (HUD elements).

```dart
class MyGame extends FlameGame {
  @override
  Future<void> onLoad() async {
    // World components - affected by camera
    await world.add(Player());      // Moves with camera
    await world.add(Background());  // Scrolls with camera
    await world.add(Enemy());       // Affected by zoom

    // Viewport components - fixed on screen (HUD)
    await camera.viewport.add(
      TextComponent(
        text: 'Score: 0',
        position: Vector2(10, 10),  // Always at screen (10, 10)
      ),
    );

    await camera.viewport.add(HealthBar());  // Always visible

    // Camera movement
    camera.viewfinder.position = Vector2(500, 500);
    // → Player, Enemy move on screen
    // → Score, HealthBar stay fixed
  }
}
```

Rule: game entities in World, UI elements in camera.viewport.
:p What is the difference between adding components to world vs camera.viewport?
??x
**World**: Components affected by camera (move, zoom, rotate)
**camera.viewport**: Components fixed on screen (HUD)

Comparison:
```dart
// World components
world.add(Player());
world.add(Enemy());
world.add(Background());

// When camera moves:
camera.viewfinder.position = Vector2(100, 100);
// → All world components move/scroll ✓

// Viewport components (HUD)
camera.viewport.add(ScoreText());
camera.viewport.add(HealthBar());
camera.viewport.add(Minimap());

// When camera moves:
camera.viewfinder.position = Vector2(100, 100);
// → Viewport components stay fixed ✓
```

Visual example:
```
┌──────────────────────┐
│ Score: 100    [HUD]  │ ← camera.viewport
├──────────────────────┤
│                      │
│   Player  Enemy      │ ← world
│      Background      │ ← world
│                      │
└──────────────────────┘

Camera moves right:
→ Player/Enemy shift left on screen
→ Score stays in corner
```

Rule: **Game entities → world**, **UI → viewport**
x??

---

## Advanced Patterns

#### Mixin Composition Pattern
Flame uses mixins instead of deep inheritance to add functionality. Components mix in only the features they need (TapCallbacks, CollisionCallbacks, HasGameReference, etc.).

```dart
// Instead of inheritance hierarchy:
// Component → PositionComponent → TappablePositionComponent →
// CollisionPositionComponent → ...  (BAD - rigid)

// Use mixin composition:
class MyComponent extends PositionComponent
    with
        TapCallbacks,           // Add tap handling
        DragCallbacks,          // Add drag handling
        CollisionCallbacks,     // Add collision handling
        HasGameReference<MyGame>, // Add game access
        HasVisibility {         // Add show/hide

  @override
  void onTapDown(TapDownEvent event) {
    // From TapCallbacks
  }

  @override
  void onCollisionStart(Set<Vector2> points, PositionComponent other) {
    // From CollisionCallbacks
  }

  void doSomething() {
    game.score++;  // From HasGameReference
    isVisible = false;  // From HasVisibility
  }
}
```

Mixins provide flexible composition: pick exactly the features you need for each component.
:p Why does Flame use mixins instead of inheritance for features?
??x
Mixins provide **flexible composition** - add only the features you need without rigid inheritance hierarchies.

Problem with inheritance:
```dart
// Deep hierarchy - rigid, inflexible
Component
 ├─ PositionComponent
   ├─ TappableComponent
     ├─ DraggableComponent
       └─ CollisionComponent
         └─ Your component
// Must inherit ALL features, can't pick
```

Solution with mixins:
```dart
// Flexible composition - choose features
class MyComponent extends PositionComponent
    with
        TapCallbacks,      // Want tapping ✓
        CollisionCallbacks, // Want collision ✓
        HasGameReference {  // Want game access ✓
        // No drag - don't add DragCallbacks
}

class OtherComponent extends Component
    with
        DragCallbacks {     // Only drag, nothing else
}
```

Benefits:
- Pick exactly what you need
- No unused features
- Easy to add/remove capabilities
- Multiple mixins, single inheritance

Common Flame mixins: TapCallbacks, DragCallbacks, CollisionCallbacks, KeyboardHandler, HasGameReference, HasVisibility
x??

---

#### HasGameReference Pattern
HasGameReference<T> is a mixin that provides access to the parent game instance through the game property. Use it to access game state, methods, and properties from components.

```dart
class MyGame extends FlameGame {
  int score = 0;

  void incrementScore(int amount) {
    score += amount;
    print('Score: $score');
  }

  void gameOver() {
    print('Game Over!');
  }
}

class Collectible extends PositionComponent
    with CollisionCallbacks, HasGameReference<MyGame> {
    // ^^^^^^^^^^^^^^^^^^^^^^^^ Important: specify game type

  @override
  void onCollisionStart(Set<Vector2> points, PositionComponent other) {
    if (other is Player) {
      // Access game instance
      game.incrementScore(10);  // ← game property from mixin

      // Can access any game property
      if (game.score >= 100) {
        game.gameOver();
      }

      removeFromParent();
    }
  }
}

// Without HasGameReference:
// - Would need to pass game reference manually
// - More boilerplate code
// - Less clean
```

The generic type <MyGame> provides typed access to your specific game class.
:p What does the HasGameReference mixin provide and how do you use it?
??x
**HasGameReference<T>** provides a **game** property to access the parent game instance from components.

Setup:
```dart
// 1. Define your game
class MyGame extends FlameGame {
  int score = 0;
  void incrementScore() { score++; }
}

// 2. Add mixin with type
class Player extends PositionComponent
    with HasGameReference<MyGame> {
    //   ^^^^^^^^^^^^^^^^^^^^^^^^^^
    //   Specify game type for typed access

  void collect() {
    game.incrementScore();  // ← Access game
    print(game.score);      // ← Access properties
  }
}
```

Without mixin (manual):
```dart
class Player extends PositionComponent {
  final MyGame gameRef;
  Player(this.gameRef);  // Must pass manually

  void collect() {
    gameRef.incrementScore();
  }
}
```

With mixin (automatic):
```dart
class Player extends PositionComponent
    with HasGameReference<MyGame> {
  void collect() {
    game.incrementScore();  // Automatic!
  }
}
```

**Key**: Generic type <MyGame> provides typed access to your game's specific methods/properties.
x??

---

#### Component Communication Patterns
Components can communicate through: 1) Parent-child hierarchy (parent/children properties), 2) Game reference (HasGameReference), 3) Direct references, 4) Event systems, or 5) Collision callbacks.

```dart
// 1. Parent-child hierarchy
class Parent extends Component {
  void notifyChildren(String message) {
    for (final child in children) {
      if (child is MessageReceiver) {
        child.receive(message);
      }
    }
  }
}

// 2. Game reference (centralized state)
class Collectible with HasGameReference<MyGame> {
  void collect() {
    game.incrementScore();  // Through game
  }
}

// 3. Direct reference (tight coupling)
class Enemy {
  final Player player;
  Enemy(this.player);

  void update(double dt) {
    final distance = player.position.distanceTo(position);
  }
}

// 4. Collision callbacks (loose coupling)
class Bullet with CollisionCallbacks {
  @override
  void onCollisionStart(Set<Vector2> points, PositionComponent other) {
    if (other is Enemy) {
      other.takeDamage(10);  // Direct method call
    }
  }
}

// 5. Custom event system
class EventBus {
  final events = <String, List<Function>>{};

  void on(String event, Function callback) {
    events.putIfAbsent(event, () => []).add(callback);
  }

  void emit(String event, dynamic data) {
    events[event]?.forEach((cb) => cb(data));
  }
}
```

Choose based on coupling needs: parent-child for hierarchies, game reference for global state, collision callbacks for interactions.
:p What are three common patterns for component communication in Flame?
??x
Three main communication patterns:

1. **Game Reference** - Centralized state
2. **Collision Callbacks** - Interaction detection
3. **Parent-Child Hierarchy** - Direct relationships

Examples:

**1. Game Reference (global state):**
```dart
class Collectible with HasGameReference<MyGame> {
  void collect() {
    game.incrementScore();  // Access global state
    game.playSound('collect');
  }
}
```

**2. Collision Callbacks (interactions):**
```dart
class Bullet with CollisionCallbacks {
  @override
  void onCollisionStart(
    Set<Vector2> points,
    PositionComponent other
  ) {
    if (other is Enemy) {
      other.takeDamage();  // Direct interaction
      removeFromParent();
    }
  }
}
```

**3. Parent-Child (hierarchy):**
```dart
class Player extends PositionComponent {
  void powerUp() {
    // Access child components
    final weapon = children.whereType<Weapon>().first;
    weapon.upgrade();
  }
}
```

Choose based on needs:
- Global state → Game reference
- Physical interaction → Collisions
- Related objects → Parent-child
x??

---

#### TimerComponent Pattern
TimerComponent runs callbacks at intervals or after delays. Useful for spawning enemies, cooldowns, periodic updates, and timed events.

```dart
class MyGame extends FlameGame {
  @override
  Future<void> onLoad() async {
    // One-time delay
    add(TimerComponent(
      period: 3,           // 3 seconds
      repeat: false,       // Don't repeat
      onTick: () {
        print('3 seconds elapsed!');
      },
    ));

    // Repeating timer
    add(TimerComponent(
      period: 2,           // Every 2 seconds
      repeat: true,        // Repeat forever
      onTick: () {
        spawnEnemy();
      },
    ));

    // Limited repeats
    add(TimerComponent(
      period: 1,
      repeat: true,
      repeatCount: 5,      // Only 5 times
      onTick: () {
        spawnPowerup();
      },
    ));

    // Auto-start (default true)
    final timer = TimerComponent(
      period: 5,
      autoStart: false,    // Don't start yet
      onTick: () {},
    );
    add(timer);

    // Start later
    timer.timer.start();

    // Pause/resume
    timer.timer.pause();
    timer.timer.resume();
  }
}
```

TimerComponent is a Component, so add it to the component tree (game, world, or other component).
:p How do you create repeating and one-time timers in Flame?
??x
Use **TimerComponent** with repeat parameter:

**One-time timer (delay):**
```dart
add(TimerComponent(
  period: 3,        // 3 seconds
  repeat: false,    // Don't repeat
  onTick: () {
    print('Delayed action');
  },
));
```

**Repeating timer (interval):**
```dart
add(TimerComponent(
  period: 2,        // Every 2 seconds
  repeat: true,     // Repeat forever
  onTick: () {
    spawnEnemy();
  },
));
```

**Limited repeats:**
```dart
add(TimerComponent(
  period: 1,
  repeat: true,
  repeatCount: 5,   // Only 5 times total
  onTick: () {
    flashScreen();
  },
));
```

**Control:**
```dart
final timer = TimerComponent(
  period: 5,
  autoStart: false,  // Manual control
  onTick: () {},
);
add(timer);

timer.timer.start();   // Start
timer.timer.pause();   // Pause
timer.timer.resume();  // Resume
timer.timer.stop();    // Stop
```

TimerComponent is a **Component** - must be added to tree!
x??

---

## Rendering and Visual

#### Rendering Order and Priority
Components render in priority order (low to high). Within same priority, render order is insertion order. Children render after their parents. Priority determines z-index.

```dart
// Priority determines render order:
Background: priority = -10
  → Renders first (back layer)

Player: priority = 0  (default)
  → Renders second (middle)

UI: priority = 100
  → Renders last (front layer)

// Visual result (bottom to top):
┌──────────┐
│    UI    │ priority: 100 (front)
├──────────┤
│  Player  │ priority: 0 (middle)
├──────────┤
│Background│ priority: -10 (back)
└──────────┘

// Parent-child rendering:
Parent (priority: 10)
├─ Child A (priority: 5)   // Rendered after parent
└─ Child B (priority: 15)  // Even if higher priority

Render order:
1. Parent
2. Child A (priority: 5)
3. Child B (priority: 15)
// Children ALWAYS after parent
// Among children, priority matters

// Flame defaults:
World: -0x7fffffff        // Very back
CameraComponent: 0x7fffffff  // Very front
```

Children inherit parent's transform (position, rotation, scale) and render relative to parent.
:p How does priority affect rendering order and what about parent-child components?
??x
**Priority**: Lower renders first (back), higher renders last (front)
**Parent-child**: Children always render after parent, regardless of priority

Priority rules:
```dart
// Three independent components:
background.priority = -10;  // ← Renders 1st (back)
player.priority = 0;        // ← Renders 2nd (middle)
ui.priority = 100;          // ← Renders 3rd (front)

Result (viewing from front):
[UI on top] [Player middle] [Background back]
```

Parent-child rules:
```dart
// Parent with children:
Parent (priority: 10)
├─ ChildA (priority: 5)    // Low priority
└─ ChildB (priority: 100)  // High priority

// Rendering order:
1. Parent
2. ChildA  ← After parent (priority: 5)
3. ChildB  ← After ChildA (priority: 100)

// Rule: Children ALWAYS after parent
// Among siblings, priority determines order
```

Special Flame priorities:
```
World: -0x7fffffff (always back)
CameraComponent: 0x7fffffff (always front)
```

Think: **Priority = Z-index**, **Parent-child = Transform hierarchy**
x??

---

#### Canvas Rendering Basics
Components render using Flutter's Canvas API. The render method receives a Canvas pre-transformed to the component's local coordinate space. Common operations include drawRect, drawCircle, drawPath.

```dart
class CustomComponent extends PositionComponent {
  @override
  void render(Canvas canvas) {
    super.render(canvas);  // Call super first

    // Canvas is in local coordinates:
    // (0, 0) = top-left of component
    // size = component's size

    // Draw rectangle
    final paint = Paint()
      ..color = Colors.blue
      ..style = PaintingStyle.fill;
    canvas.drawRect(size.toRect(), paint);

    // Draw circle at center
    canvas.drawCircle(
      (size / 2).toOffset(),  // Center point
      size.x / 2,              // Radius
      Paint()..color = Colors.red,
    );

    // Draw line
    canvas.drawLine(
      Offset.zero,           // From (0, 0)
      size.toOffset(),       // To (size.x, size.y)
      Paint()
        ..color = Colors.white
        ..strokeWidth = 2,
    );

    // Draw custom path
    final path = Path()
      ..moveTo(size.x / 2, 0)
      ..lineTo(size.x, size.y)
      ..lineTo(0, size.y)
      ..close();
    canvas.drawPath(path, Paint()..color = Colors.green);
  }
}
```

Canvas transform automatically handles component position, rotation, and scale - just draw in local coordinates.
:p How does the render method work in Flame components?
??x
**render(Canvas canvas)** receives a canvas in **local coordinates** - pre-transformed for the component.

Local coordinate space:
```dart
@override
void render(Canvas canvas) {
  // Canvas origin (0, 0) = top-left of component
  // size = component's size property

  // Draw in local space:
  canvas.drawRect(
    Rect.fromLTWH(0, 0, size.x, size.y),
    Paint()..color = Colors.blue,
  );

  // Center of component:
  final center = (size / 2).toOffset();
  canvas.drawCircle(center, 10, Paint()..color = Colors.red);
}
```

Transforms handled automatically:
```dart
component.position = Vector2(100, 100);
component.angle = pi / 4;  // 45° rotation
component.scale = Vector2.all(2);

// render() receives canvas already transformed:
// → Translated to (100, 100)
// → Rotated 45°
// → Scaled 2x
// You just draw at (0, 0) in local space!
```

Common operations:
```dart
canvas.drawRect(rect, paint);
canvas.drawCircle(offset, radius, paint);
canvas.drawLine(p1, p2, paint);
canvas.drawPath(path, paint);
canvas.drawImage(image, offset, paint);
```

Always call **super.render(canvas)** first!
x??

---

#### Opacity and HasPaint Mixin
HasPaint mixin provides a paint property with opacity control. Effects like OpacityEffect modify this paint. Useful for fading components in/out.

```dart
class FadingComponent extends PositionComponent with HasPaint {

  @override
  void render(Canvas canvas) {
    super.render(canvas);

    // Use this.paint.color.opacity for transparency
    final myPaint = Paint()
      ..color = Colors.blue.withOpacity(
        this.paint.color.opacity,  // From HasPaint
      );

    canvas.drawRect(size.toRect(), myPaint);
  }

  void fadeOut() {
    // OpacityEffect modifies paint.color.opacity
    add(
      OpacityEffect.to(
        0,  // Fully transparent
        EffectController(duration: 1),
      ),
    );
  }

  void fadeIn() {
    add(
      OpacityEffect.to(
        1,  // Fully opaque
        EffectController(duration: 1),
      ),
    );
  }

  // Direct opacity control:
  void setOpacity(double opacity) {
    paint = Paint()..color = Color.fromRGBO(255, 255, 255, opacity);
  }
}
```

OpacityEffect requires HasPaint mixin to work. The mixin's paint property is shared with effects.
:p What does the HasPaint mixin provide and why is it needed for opacity effects?
??x
**HasPaint** provides a **paint** property that OpacityEffect can modify for transparency control.

Why needed:
```dart
// WITHOUT HasPaint:
class Component extends PositionComponent {
  // No paint property
  // OpacityEffect has nothing to modify!
}

// WITH HasPaint:
class Component extends PositionComponent with HasPaint {
  // Has paint property
  // OpacityEffect modifies paint.color.opacity ✓
}
```

Usage:
```dart
class FadingSprite extends SpriteComponent
    with HasPaint {

  @override
  void render(Canvas canvas) {
    super.render(canvas);

    // Use shared paint for opacity
    final myPaint = Paint()
      ..color = color.withOpacity(
        paint.color.opacity  // ← From HasPaint
      );

    canvas.drawRect(size.toRect(), myPaint);
  }

  void fadeOut() {
    add(OpacityEffect.to(
      0,  // Transparent
      EffectController(duration: 1),
    ));
    // Effect modifies paint.color.opacity
  }
}
```

**Key**: OpacityEffect changes **paint.color.opacity** from 1.0 (opaque) to 0.0 (transparent). Component must use this value in render().
x??

---

## Performance and Optimization

#### Component Removal and Cleanup
Properly remove components with removeFromParent() and cleanup resources in onRemove(). Removal is queued and processed between update and render phases.

```dart
class Bullet extends PositionComponent {
  double lifetime = 5.0;  // Remove after 5 seconds

  @override
  void update(double dt) {
    super.update(dt);

    lifetime -= dt;
    if (lifetime <= 0) {
      removeFromParent();  // Queue removal
      // Component still exists until event processing
    }
  }

  @override
  void onRemove() {
    super.onRemove();

    // Cleanup resources
    debugPrint('Bullet removed, cleanup complete');

    // Cancel timers
    // Remove listeners
    // Release assets
  }
}

// Removal patterns:

// 1. Immediate queue (async)
component.removeFromParent();

// 2. Wait for removal
await component.removeFromParent();
// Component now removed

// 3. Remove with effect
component.add(
  RemoveEffect(delay: 2.0)  // Remove after 2 seconds
);

// 4. Remove after effect completes
component.add(
  OpacityEffect.fadeOut(
    EffectController(duration: 1),
    onComplete: () => component.removeFromParent(),
  ),
);

// 5. Check if already removed
if (!component.isRemoved) {
  component.removeFromParent();
}
```

Never access parent or game properties after removeFromParent() - component is in removing state.
:p What is the proper way to remove a component and cleanup resources?
??x
Use **removeFromParent()** to queue removal and **onRemove()** for cleanup.

Pattern:
```dart
class MyComponent extends PositionComponent {
  Timer? myTimer;

  void destroy() {
    removeFromParent();  // Queue removal
    // Component still exists briefly
  }

  @override
  void onRemove() {
    super.onRemove();  // Always call super

    // Cleanup resources HERE:
    myTimer?.cancel();
    // Remove listeners
    // Release assets
    // Cancel timers

    debugPrint('Cleanup complete');
  }
}
```

Removal is **queued**:
```pseudocode
component.removeFromParent()
  → Enqueue LifecycleEvent.remove
  → Continue execution
  → Component still in tree!

Next frame:
  → update(dt) runs
  → processLifecycleEvents()
    → Call onRemove()
    → Remove from parent
  → render() runs
```

Wait for removal:
```dart
await component.removeFromParent();
// Now definitely removed

// OR
component.removeFromParent();
await game.lifecycleEventsProcessed;
// Now definitely removed
```

**Key**: Cleanup in onRemove(), not during removeFromParent() call!
x??

---

#### Update vs Render Separation Best Practices
Never modify state in render(), never draw in update(). This separation ensures determinism, proper frame timing, and predictable behavior.

```dart
class MyComponent extends PositionComponent {
  // CORRECT usage:

  @override
  void update(double dt) {
    super.update(dt);

    // ✓ Modify state
    position.x += velocity.x * dt;
    health -= 1;
    isAlive = health > 0;

    // ✓ Game logic
    if (isAlive) {
      checkCollisions();
    }

    // ✓ Add/remove components
    if (shouldSpawn) {
      parent?.add(Bullet());
    }

    // ✗ NO RENDERING
    // Don't use canvas here!
  }

  @override
  void render(Canvas canvas) {
    super.render(canvas);

    // ✓ Drawing only
    canvas.drawRect(size.toRect(), paint);

    // ✓ Visual calculations
    final visualPos = calculateScreenPosition();
    canvas.drawCircle(visualPos, 10, Paint());

    // ✗ NO STATE CHANGES
    // position.x += 1;  // WRONG!
    // health -= 1;      // WRONG!
    // add(component);   // WRONG!
  }
}

// Why separate?

// 1. Determinism:
//    All logic completes before any rendering
//    → Consistent state across frame

// 2. Performance:
//    Can skip rendering if not visible
//    Logic still runs

// 3. Debugging:
//    Clear separation makes issues easier to find

// 4. Multi-threading potential:
//    Could render on separate thread in future
```

If you need visual-only state, use separate variables only read during render.
:p Why must you never modify state in render() or draw in update()?
??x
Separation ensures **determinism**, **performance**, and **correctness**.

Rules:
```dart
@override
void update(double dt) {
  // ✓ ALLOWED:
  position += velocity * dt;     // State changes
  health -= damage;              // State changes
  if (dead) removeFromParent();  // Logic
  add(Bullet());                 // Tree changes

  // ✗ FORBIDDEN:
  canvas.drawRect(...);  // NO RENDERING!
}

@override
void render(Canvas canvas) {
  // ✓ ALLOWED:
  canvas.drawRect(...);          // Drawing
  final pos = calculate();       // Visual calc

  // ✗ FORBIDDEN:
  position += velocity;  // NO STATE CHANGES!
  health--;              // NO STATE CHANGES!
  add(component);        // NO TREE CHANGES!
}
```

Why separate:

**1. Determinism:**
```
All updates complete → then all renders
Every component sees same state
No race conditions
```

**2. Performance:**
```
Component off-screen?
  → Skip render() (optimization)
  → Still run update() (logic needed)
```

**3. Predictability:**
```
Frame N state = Result of all Frame N updates
Clear cause and effect
```

**Violation example:**
```dart
// BAD:
render(canvas) {
  position.x++;  // State change in render!
  // → Different timing than update
  // → Unpredictable behavior
}
```
x??

---
