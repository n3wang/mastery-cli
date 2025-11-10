# High-Quality Flashcards: Game-Engine-Architecture_processed (Part 16)


**Starting Chapter:** 8 The Game Loop and Real-Time Simulation. 8.2 The Game Loop

---


#### Rendering Loop Overview
Real-time 3D computer graphics require a different approach compared to static GUI rendering. Instead of rectangle invalidation, real-time graphics present a series of still images rapidly on-screen, simulating motion and interactivity through a loop.

The simplest form of a render loop in a real-time application is structured as follows:
```cpp
while (!quit) {
    // Update the camera transform based on interactive inputs or predefined path.
    updateCamera();
    
    // Update positions, orientations, and relevant visual state of any dynamic elements in the scene.
    updateSceneElements();
    
    // Render a still frame into an off-screen framebuffer known as the "back buffer".
    renderScene();
    
    // Swap the back buffer with the front buffer to make the most recently rendered image visible on-screen. 
    // Or, in windowed mode, copy (blit) the back buffer's contents to the front buffer.
    swapBuffers();
}
```
:p How is a real-time rendering loop structured for 3D graphics?
??x
The render loop updates camera transformations and scene elements before rendering a frame into an off-screen framebuffer called the "back buffer". After rendering, it swaps or copies this back buffer with the on-screen front buffer. This process creates a continuous flow of images that simulate motion.
```cpp
// Example of updating the camera in the render loop
void updateCamera() {
    // Update based on user input or predefined path
}
```
x??

---


#### Game Loop Overview
Games are composed of many interacting subsystems, each requiring periodic servicing at different rates. The game loop is the master loop that services all these systems.

The simplest implementation of a game loop might look like this:
```cpp
void main() {
    initGame();
    
    while (true) { // Game loop
        readHumanInterfaceDevices();
        
        if (quitButtonPressed()) {
            break; // Exit the game loop
        }
        
        movePaddles(); 
        moveBall();
        collideAndBounceBall();
        
        if (ballImpactedSide(LEFT_PLAYER)) {
            incrementScore(RIGHT_PLAYER);
            resetBall();
        } else if (ballImpactedSide(RIGHT_PLAYER)) {
            incrementScore(LEFT_PLAYER);
            resetBall();
        }
        
        renderPlayfield();
    }
}
```
:p What is the basic structure of a game loop?
??x
The basic structure involves initializing the game, entering an infinite loop where it reads input devices, performs necessary updates (like moving paddles and ball), checks collisions, increments scores, and renders the playfield. This ensures all subsystems are serviced at appropriate intervals.
```cpp
// Example of updating human interface devices in a game loop
void readHumanInterfaceDevices() {
    // Read from control wheels, joysticks or other input devices
}
```
x??

---


#### Pong Game Loop Details
Pong is an early example illustrating the core logic of a game loop. The loop continuously reads player inputs, updates game state (paddle and ball positions), checks for collisions, updates scores, and renders the scene.

Here’s how the core logic might look:
```cpp
void main() {
    initGame();
    
    while (true) { // Game loop
        readHumanInterfaceDevices();
        
        if (quitButtonPressed()) {
            break;
        }
        
        movePaddles(); 
        moveBall();
        collideAndBounceBall();
        
        if (ballImpactedSide(LEFT_PLAYER)) {
            incrementScore(RIGHT_PLAYER);
            resetBall();
        } else if (ballImpactedSide(RIGHT_PLAYER)) {
            incrementScore(LEFT_PLAYER);
            resetBall();
        }
        
        renderPlayfield();
    }
}
```
:p What does the core logic of a Pong game loop involve?
??x
The core logic involves reading player inputs, updating paddle and ball positions, checking for collisions, incrementing scores when necessary, and rendering the playfield. This ensures continuous interaction and display of the game state.
```cpp
// Example of moving paddles in a game loop
void movePaddles() {
    // Adjust paddle positions based on current input from control wheels or joysticks
}
```
x??

---

---


#### Windows Message Pumps
Background context explaining the concept. In a game loop, especially on Windows platforms, games need to handle messages from the operating system as well as their own subsystems. This is achieved using a message pump that services both types of events.

:p What is the role of a message pump in a Windows-based game?
??x
A message pump serves as a mechanism for handling Windows messages while allowing the game engine to run its loop only when no messages are pending. It ensures that system-level communications, like window resizing or user input, do not get blocked by game-specific tasks.

Example pseudocode:
```c++
while (true) {
    MSG msg;
    // Service any and all pending Windows messages.
    while (PeekMessage(&msg, nullptr, 0, 0)) {
        TranslateMessage(&msg);
        DispatchMessage(&msg);
    }
    
    // No more Windows messages to process -- run one iteration of the "real" game loop.
    RunOneIterationOfGameLoop();
}
```
x??

---


#### Callback-Driven Frameworks
Callback-driven frameworks are structured differently compared to regular libraries. They provide a pre-written main game loop but rely on the programmer to fill in specific callbacks for various tasks.

:p How does a callback-driven framework structure its main game loop?
??x
In such a framework, the primary game loop is written and controlled by the framework itself. The programmer needs to define custom implementations of functions (callbacks) that are called at appropriate times within this loop. These callbacks handle various aspects of the game logic.

Example pseudocode:
```c++
while (true) {
    for (each frameListener) {
        frameListener.frameStarted();
    }
    
    renderCurrentScene();
    
    for (each frameListener) {
        frameListener.frameEnded();
    }
    
    finalizeSceneAndSwapBuffers();
}
```
x??

---


#### Event-Based Updating
In games, an event is any significant change in the state of the game or its environment. These can be player actions, environmental changes, etc. An event system allows various subsystems to register for specific events and react accordingly.

:p What role does an event system play in a game's architecture?
??x
An event system enables different parts of the game (subsystems) to communicate with each other based on significant state changes. It is similar to how GUI systems work, where components send and receive events. The event system can be used for periodic updates by scheduling future events.

Example pseudocode:
```c++
class GameFrameListener : public Ogre::FrameListener {
public:
    virtual void frameStarted(const FrameEvent& event) {
        // Perform tasks before rendering the scene
        pollJoypad(event);
        updatePlayerControls(event);
        updateDynamicsSimulation(event);
        resolveCollisions(event);
        updateCamera(event);
    }
    
    virtual void frameEnded(const FrameEvent& event) {
        // Perform tasks after rendering the scene
        drawHud(event);
    }
};
```
x??

---


#### Differentiating Between Concepts

- **Windows Message Pumps** focus on handling system messages before proceeding with game-specific logic.
- **Callback-Driven Frameworks** provide a structured main loop where specific callbacks are called to handle various tasks.
- **Event-Based Updating** uses events to trigger updates and actions within the game, making it flexible for complex interactions.

---

---


#### Game Time
Background context: Game time is an abstract timeline that can be independent of the real timeline. It allows for various effects such as pausing, slowing down, or even reversing game actions by scaling and warping one timeline relative to another.

:p What is game time?
??x
Game time is a separate timeline used in game programming that can operate independently of the real timeline. This allows for features like pausing the game temporarily, running the game in slow motion, or even reversing animations by adjusting the scale factor (playback rate).
```java
// Pseudocode to update game time based on real time
double deltaTime = getRealTimeDelta();
gameTime += deltaTime * playbackRate; // playbackRate can be 1.0 for normal speed, <1.0 for slow motion, or <0.0 for reverse
```
x??

---

