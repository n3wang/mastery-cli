# High-Quality Flashcards: Game-Engine-Architecture_processed (Part 17)


**Starting Chapter:** 8.5 Measuring and Dealing with Time

---


#### Frame Rate and Time Deltas
Background context: The frame rate of a real-time game describes how frequently 3D frames are presented to the viewer. In games, this is typically measured in frames per second (FPS), which is equivalent to Hertz (Hz). Common frame rates include 24 FPS for films, 30 or 60 FPS for North American and Japanese games, and 50 FPS for European and most other world games due to their respective television standards.

The duration of time between frames is called the frametime, timedelta, or deltatime. It's often represented mathematically by ∆t.
:p What does "deltatime" refer to in game development?
??x
Deltatime refers to the amount of time that elapses between consecutive frames. This value is crucial for maintaining consistent performance across different frame rates and ensuring smooth animations and physics simulations.

Code example:
```java
long startTime = System.currentTimeMillis();
// Game loop logic here
long deltaTime = (System.currentTimeMillis() - startTime) / 1000.0; // Convert to seconds
```
x??

---


#### Measuring Time in Games
Background context: To accurately measure the time between frames, game developers often use `deltaTime` or `deltatime`. This value is essential for tasks such as updating animations and managing physics simulations smoothly.

The amount of time that elapses during one iteration of the game loop can be measured using various units like milliseconds (ms), seconds, or machine cycles. Commonly used in games are millisecond measurements.
:p How do you measure the frame duration (deltatime) in a game?
??x
To measure the frame duration, you can use the current time at the beginning of each iteration and subtract it from the previous time to get the elapsed time. This value is often referred to as `deltaTime`.

Code example:
```java
long lastFrameTime = System.currentTimeMillis();
// Game loop logic here
double deltaTime = (System.currentTimeMillis() - lastFrameTime) / 1000.0; // Convert to seconds
lastFrameTime = System.currentTimeMillis(); // Update for next iteration
```
x??

---


#### Frame Rate and Speed Calculation
Background context: In real-time games, the frame rate determines how frequently positions or states are updated. This is crucial for maintaining a consistent speed regardless of the number of frames per second.

To achieve constant motion (e.g., 40 meters per second in a 3D game), you multiply the object's speed by the duration of one frame (`deltaTime`).
:p How do you calculate the position update given the ship’s speed and frame delta time?
??x
The position update can be calculated by multiplying the ship's speed (in meters/second) by the frame delta time (in seconds). This ensures that the movement is consistent across different frame rates.

Code example:
```java
double speed = 40.0; // in meters per second
double deltaTime = 1 / 60.0; // Assuming a game running at 60 FPS
double newPosition = currentPosition + (speed * deltaTime);
```
x??

---


#### Frame Rate Variations Across Regions
Background context: Different regions have different television standards, which affect the frame rate of games rendered on those systems. North America and Japan typically use 30 or 60 FPS due to NTSC standard, while Europe uses 50 FPS with PAL or SECAM.

This variation impacts how developers need to handle time in their game logic.
:p Why does a game run at different frame rates in different regions?
??x
A game runs at different frame rates in different regions because of the television standards used. For instance, North America and Japan use 30 or 60 FPS with NTSC standard, while Europe uses 50 FPS with PAL or SECAM.

Developers need to account for these differences when implementing their game logic, ensuring that animations, physics, and other time-sensitive elements behave consistently across all regions.

Code example (pseudo-code):
```java
if (region == "NTSC") {
    frameRate = 30; // North America, Japan
} else if (region == "PAL" || region == "SECAM") {
    frameRate = 50; // Europe
}
deltatime = 1 / frameRate;
```
x??

---


#### Reversing Animations and Time Scaling
Background context: Animations can be played in reverse by reversing the direction of time. This is equivalent to mapping the clip onto the global timeline with a negative `deltaTime` or a scaling factor.

Animating an animation in reverse involves playing it backwards, which is mathematically achieved by multiplying the local timeline by -1.
:p How do you play an animation in reverse?
??x
To play an animation in reverse, you can multiply the time scale of the clip by -1. This effectively reverses the direction of the timeline.

Code example:
```java
// Assuming 'clip' is a reference to the animation clip
clip.timeScale = -1; // Reverse playback
```
x??

---


#### Scaling Time for Animation Playback
Background context: The speed at which an animation plays can be adjusted by scaling the local timeline. This is useful for slowing down or speeding up animations without changing their intrinsic duration.

Scaling the time of a clip by 0.5 means it will play half as fast, while scaling by -1 reverses the playback direction.
:p How does scaling the timeline affect the speed of an animation?
??x
Scaling the timeline affects the speed of an animation by altering how quickly the frames are played back. Scaling by 0.5 makes the animation play at half its original speed, and scaling by -1 flips the animation in reverse.

Code example:
```java
// Assuming 'clip' is a reference to the animation clip
clip.timeScale = 0.5; // Play at half speed
```
x??

---

---


#### Updating Based on Elapsed Time
Background context: To make games CPU-independent, it is essential to measure \(\Delta t\) during each frame. This can be achieved by reading the value of the high-resolution timer at the beginning and end of a frame, then subtracting these values to get an accurate measure of \(\Delta t\). This delta time (\(\Delta t\)) can then be used across various engine subsystems.
:p How do you update game objects based on elapsed time?
??x
Updating game objects based on elapsed time involves measuring the time between frames using a high-resolution timer. By doing so, you ensure that object speeds and movements are consistent regardless of the frame rate.

Here is an example in pseudocode:
```java
// Pseudocode for updating based on elapsed time
long previousTime = System.nanoTime(); // Store the last measured time

while (gameRunning) {
    long currentTime = System.nanoTime(); // Get current time
    double deltaTime = (currentTime - previousTime) / 1000000.0; // Convert to milliseconds
    previousTime = currentTime;

    updateGameObjects(deltaTime); // Update all game objects with the measured delta time

    renderFrame(); // Render the frame based on updated object positions
}
```
x??

---


#### Frame-Rate Spike Problem
Background context: Using \(\Delta t\) from the previous frame to estimate the upcoming frame's duration can lead to inaccuracies. This is because real-world factors might cause a significant deviation in actual frame time, which we call a "frame-rate spike." Such deviations can create a "vicious cycle" of poor frame times.
:p What is a frame-rate spike and how does it affect game performance?
??x
A frame-rate spike occurs when an event causes the current frame to take much more or less time than the previous frame. This deviation from the expected \(\Delta t\) can disrupt the consistency in gameplay, leading to what's known as a "vicious cycle" of poor frame times.

For example:
```java
// Pseudocode illustrating a potential spike
if (networkPacketReceived) {
    // High processing delay due to network packet handling
    previousTime = System.nanoTime();
    updateGameObjects((System.nanoTime() - previousTime) / 1000000.0);
} else {
    // Normal frame time
    previousTime = System.nanoTime();
    updateGameObjects((System.nanoTime() - previousTime) / 1000000.0);
}
```
x??

---

---


---
#### Handling Bad Frames
Background context: In a physics simulation, stability is critical and often requires a fixed update rate. However, occasional bad frames (frames that take longer to process) can disrupt this stability.

:p What happens if a frame takes longer than usual to process?
??x
If a frame takes longer than usual to process (e.g., 57 ms instead of the typical 33.3 ms for 30 Hz), stepping the physics system twice on the next frame might be an attempt to compensate, but this can lead to overcompensation and further instability.
```java
// Pseudocode example:
if (previousFrameTime > idealFrameTime) {
    simulatePhysics(2 * idealFrameTime);
} else {
    // Simulate normally
}
```
x??

---


#### Using a Running Average
Background context: Game loops often maintain some frame-to-frame coherence, meaning that subsequent frames might have similar characteristics to the previous one. Averaging frame-time measurements over multiple frames can help smooth out spikes and provide a more stable estimate for \(\Delta t\).

:p How does averaging frame times help in dealing with variable performance?
??x
Averaging helps by providing a smoother, more consistent estimate of time between frames, reducing the impact of occasional high-performance spikes. For example, if over two frames the average is calculated to be 35 ms instead of one being 40 ms and another 30 ms, the system can adjust accordingly.
```java
// Pseudocode for averaging frame times:
int numFrames = 10;
float totalFrameTime = 0.0f;

for (int i = 0; i < numFrames; i++) {
    totalFrameTime += getFrameTime();
}

float avgFrameTime = totalFrameTime / numFrames;
```
x??

---


#### Governing the Frame Rate
Background context: Ensuring a consistent frame rate is crucial for maintaining stability in real-time simulations and providing a smooth user experience. By governing the frame rate, the system can maintain a steady performance even if individual frames take longer than expected.

:p How does frame-rate governing ensure consistency in the game loop?
??x
Frame-rate governing involves measuring the duration of each frame and sleeping or waiting to make sure that the next frame starts exactly at the ideal interval. If a frame takes less time than intended, the main thread is put to sleep until the desired frame time elapses. Conversely, if a frame takes longer, it waits for one more complete frame time.
```java
// Pseudocode example of frame-rate governing:
float targetFrameTime = 16.6f; // For 60 FPS

long startTime = System.currentTimeMillis();
simulatePhysics();

long elapsedTime = System.currentTimeMillis() - startTime;
if (elapsedTime < targetFrameTime) {
    Thread.sleep(targetFrameTime - elapsedTime);
}
```
x??
---

---


#### Consistent Elapsed Frame Times for Record and Playback
Background context: When frame times are consistent, features like record and playback become more reliable. This is because every event during gameplay can be accurately recorded and replayed with the same timing.

:p What is the importance of consistent elapsed frame times in implementing record and playback?
??x
Consistent frame times ensure that each event during gameplay can be precisely recorded and then replayed, making the experience indistinguishable from the original. If frame times are inconsistent, events may not occur in the correct order, leading to issues such as AI characters acting differently than intended.

For example:
```java
// Pseudocode for recording and playback
class GameRecorder {
    List<Event> recordedEvents = new ArrayList<>();

    void recordEvent(Event event) {
        // Record each event with its time stamp
        recordedEvents.add(event);
    }

    void playBack() {
        // Replay events in the same order they were recorded, using the exact timestamps
        for (Event event : recordedEvents) {
            handleEvent(event);
        }
    }
}

class Event {
    DateTime timestamp;
    EventType type;  // e.g., player movement, enemy attack

    public Event(DateTime timestamp, EventType type) {
        this.timestamp = timestamp;
        this.type = type;
    }

    void handleEvent() {
        switch (type) {
            case MOVEMENT:
                // Handle player movement
                break;
            case ATTACK:
                // Handle enemy attack
                break;
            default:
                throw new IllegalArgumentException("Unknown event type");
        }
    }
}
```
x??

---


#### Screen Tearing and V-Sync
Background context: Screen tearing is a visual anomaly where part of the screen shows an old image while another part shows a new one, resulting from buffer swapping during partial rendering. To avoid tearing, many engines wait for the vertical blanking interval (V-blank) before swapping buffers.

:p What is screen tearing and how can it be prevented?
??x
Screen tearing occurs when the back buffer is swapped with the front buffer while the screen has only been partially drawn by the video hardware. This results in a portion of the screen displaying an old image while another part displays a new one, leading to visual artifacts.

To prevent screen tearing, rendering engines can wait for the vertical blanking interval (V-blank) before swapping buffers. This is known as V-Sync. Waiting for the v-blank effectively clamps the frame rate to a multiple of the monitor's refresh rate, ensuring that each frame completes drawing before being displayed.

For example:
```java
class Renderer {
    int vsyncInterval;  // In milliseconds

    void renderFrame() {
        waitVBlank();  // Wait for the vertical blanking interval
        swapBuffers();  // Swap back and front buffers after the screen is fully drawn
    }

    void waitVBlank() {
        try {
            Thread.sleep(vsyncInterval);
        } catch (InterruptedException e) {
            Thread.currentThread().interrupt();
        }
    }

    void swapBuffers() {
        // Logic to swap the back buffer with the front buffer
    }
}
```
x??

---


#### V-Sync and Frame Rate Synchronization
Background context: V-sync is a technique used to synchronize the frame rate of the main game loop with the monitor's refresh rate. It effectively clamps the update rate to multiples of the screen’s refresh interval.

:p How does V-Sync work, and what are its implications for frame rates?
??x
V-Sync works by waiting for the vertical blanking interval (v-blank) before swapping buffers in a rendering engine. The v-blank is the time during which the electron gun on older CRT monitors or TVs is turned off while being reset to the top-left corner of the screen.

On modern displays, even though they don't require v-blanks for drawing, the v-blank interval still exists due to historical and compatibility reasons. By waiting for the v-blank interval before swapping buffers, V-Sync effectively limits the frame rate to a multiple of the screen's refresh rate.

For example, on an NTSC monitor that refreshes at 60 Hz, if more than 1/60th of a second elapses between frames, V-Sync will wait until the next v-blank interval, which means waiting for 2/60ths (30 FPS). Missing two v-blanks would result in a frame rate of 20 FPS.

For PAL and SECAM standards, the update rate is based on 50 Hz instead of 60 Hz. Therefore, game developers must consider this when implementing V-Sync to ensure compatibility with different display standards.

```java
class Game {
    int refreshRate;  // In Hz (e.g., 60 for NTSC, 50 for PAL)

    void update() {
        long currentTime = System.currentTimeMillis();
        long lastFrameTime = getLastFrameTime();  // Get time of the previous frame

        if ((currentTime - lastFrameTime) > (1000 / refreshRate)) {
            // Wait until the next v-blank interval
            try {
                Thread.sleep((1000 / refreshRate) - (currentTime - lastFrameTime));
            } catch (InterruptedException e) {
                Thread.currentThread().interrupt();
            }
        }

        updateGame();  // Update game logic

        if (!isVSyncDisabled()) {  // Check if V-Sync is disabled
            waitVBlank();  // Wait for the v-blank interval before rendering
        }

        renderFrame();  // Render the frame after ensuring correct timing
    }

    void updateGame() {
        // Update game logic and state
    }

    boolean isVSyncDisabled() {
        return false;  // Assume V-Sync is enabled unless explicitly disabled
    }

    void waitVBlank() {
        try {
            Thread.sleep(getVSyncInterval());  // Sleep until the next v-blank interval
        } catch (InterruptedException e) {
            Thread.currentThread().interrupt();
        }
    }

    int getVSyncInterval() {
        return (1000 / refreshRate);  // V-Sync interval in milliseconds
    }
}
```
x??

---

---


#### High-Resolution Timer Overview
Background context explaining the need for high-resolution timers. Discuss why functions like `time()` are not suitable for real-time applications due to low resolution.

:p What is the main issue with using standard system time functions like `time()` for timing measurements in games?
??x
The main issue with using standard system time functions like `time()` for timing measurements in games is their coarse resolution. For example, `time()` returns an integer representing the number of seconds since a specific epoch (January 1, 1970), which means its resolution is one second. This is too large to accurately measure the tens of milliseconds that typically make up a game frame.

x??

---


#### High-Resolution Timer Example on Intel Pentium
Background context explaining how high-resolution timers are implemented differently across various platforms and processors. Highlight specific instructions like `rdtsc` for Intel processors.

:p How can you query a high-resolution timer on an Intel Pentium processor?
??x
To query a high-resolution timer on an Intel Pentium processor, you can use the `rdtsc` instruction. This instruction returns the current value of the Time-Stamp Counter (TSC) register, which is a 64-bit register that counts CPU cycles.

```c
uint64_t read_rdtsc() {
    unsigned int lo, hi;
    __asm__ volatile("xorl %eax, %eax\n"
                     "rdtsc\n"
                     "movl %%edx, %0\n\t"
                     "movl %%eax, %1\n"
                    : "=m"(hi), "=m"(lo)
                    :
                    : "%rax", "%rbx", "%rcx", "%rdx");
    return (static_cast<uint64_t>(hi) << 32) | lo;
}
```

The `read_rdtsc` function uses inline assembly to read the TSC register and returns its value as a single 64-bit integer.

x??

---


#### High-Resolution Timer Drift
Background context explaining the potential drift issue with high-resolution timers, especially on multi-core processors.

:p Why can comparing absolute timer readings from different cores lead to strange results?
??x
Comparing absolute timer readings from different cores can lead to strange results or even negative time deltas because the high-resolution timers are independent on each core and can drift apart. This is due to variations in core frequency, temperature, or other factors that affect clock speed.

x??

---

---


#### Time Units and Clock Variables Overview
This section discusses the choices involved when measuring or specifying time durations in a game. The primary questions are: What time units should be used (seconds, milliseconds, machine cycles), and what data type should store these measurements (64-bit integer, 32-bit integer, 32-bit floating point).

The choice depends on precision needs and the range of magnitudes to represent. 
:p What are the two main questions when choosing time units for game development?
??x
When selecting time units, we need to consider:
1. The desired precision (how fine-grained the measurements should be).
2. The expected range of magnitudes that our system needs to handle.

These decisions impact memory usage and computational performance.
x??

---


#### Floating-Point Clocks for Time Deltas
Another common method is storing small time deltas in floating-point format measured in seconds. This involves converting CPU cycle durations to seconds using the clock frequency.

Example:
```cpp
F32 dt_seconds = 1.0f / 30.0f; // Ideal frame time for 30 FPS

U64 begin_ticks = readHiResTimer();
while (true) {
    runOneIterationOfGameLoop(dt_seconds);
    U64 end_ticks = readHiResTimer();
    
    F32 dt_seconds = static_cast<F32>(end_ticks - begin_ticks) / getHiResTimerFrequency();
    
    // Use end_ticks as the new begin_ticks for next frame.
    begin_ticks = end_ticks;
}
```
:p How is the time delta calculated using floating-point format?
??x
The time delta is calculated by:
1. Reading the current time at the start of a game loop or operation (`begin_ticks`).
2. Performing operations within the loop.
3. Reading the current time again (`end_ticks`).
4. Converting the difference in ticks to seconds using the frequency of the timer.

```cpp
F32 dt_seconds = static_cast<F32>(end_ticks - begin_ticks) / getHiResTimerFrequency();
```
This ensures that the precision is maintained, especially for small durations.
x??

---

---


#### Limitations of Floating-Point Clocks
Background context explaining the concept. In a 32-bit IEEE float, the 23 bits of the mantissa are dynamically distributed between the whole and fractional parts by way of the exponent (see Section 3.3.1.4). Small magnitudes require only a few bits for the whole part, leaving plenty of bits of precision for the fraction. However, as the magnitude grows too large, more bits are allocated to the whole part, reducing the available bits for the fractional part. Eventually, even the least-significant bits of the whole part become implicit zeros.

This means that storing long durations in a floating-point clock variable can lead to loss of precision and eventual inaccuracy. It is advisable to use such clocks only for relatively short time deltas (measuring at most a few minutes and often just a single frame or less). If an absolute-valued floating-point clock is used, periodic resetting to zero is necessary to avoid accumulation of large magnitudes.

:p What are the limitations of using floating-point variables to measure long durations in game clocks?
??x
Using floating-point variables for measuring long durations can lead to loss of precision because as the magnitude grows, more bits are allocated to the whole part, reducing available bits for the fractional part. This results in the least-significant bits becoming implicit zeros. To avoid this, it is recommended to use such clocks only for short time deltas (a few minutes or less) and reset them periodically when used absolutely.

```cpp
// Pseudocode example for resetting a floating-point clock
float currentTime = getElapsedTimeSinceStart();
if (currentTime > MAX_DURATION) {
    currentTime = 0.0f; // Reset the clock to zero after exceeding the maximum duration.
}
```
x??

---


#### Game-Defined Time Units
Background context explaining the concept. Some game engines allow timing values to be specified in a game-defined unit that is fine-grained enough for an integer format to be used, precise enough for various applications within the engine, and large enough so that a 32-bit clock won’t wrap too often.

A common choice is a 1/300 second time unit. This works well because:
- It is fine-grained enough for many purposes.
- It only wraps once every 165.7 days.
- It is an even multiple of both NTSC and PAL refresh rates.

Using such units can be effective for specifying durations like the time between shots from an automatic weapon, AI-controlled character patrols, or player survival times in certain scenarios.

:p What are some examples of game-defined time units and why they are useful?
??x
Examples of game-defined time units include 1/300 second. These units are useful because:
- They provide enough precision for many purposes.
- They avoid the need to use floating-point formats, which can help in performance optimization.
- They prevent the real-time clock from wrapping too often.

```cpp
// Example code defining a game-defined time unit and using it to measure intervals
const float TIME_UNIT = 1.0f / 300.0f; // Define 1/300 second as a time unit

float elapsedTime = getElapsedTimeSinceStart() * TIME_UNIT; // Convert real-time to game-defined units
```
x??

---


#### Dealing with Breakpoints in Game Loops
Background context explaining the concept. When your game hits a breakpoint, its loop stops running and the debugger takes over. If you run the game on the same computer as the debugger, the CPU continues to run, and the real-time clock accrues cycles. A large amount of wall clock time can pass while inspecting code at a breakpoint. This can lead to massive spikes in measured frame duration when resuming execution.

To avoid this issue, it is common practice to measure frame times against an upper limit (e.g., 1 second). If the measured frame time exceeds this limit, assume that the game resumed after a breakpoint and set the delta-time artificially to a small fraction of the target frame rate (e.g., 1/30 or 1/60 seconds).

:p How can you handle large frame times in a game loop due to breakpoints?
??x
To handle large frame times in a game loop due to breakpoints, measure the frame time against an upper limit. If the measured frame time exceeds this limit (e.g., 1 second), assume that the game resumed after a breakpoint and set the delta-time artificially to a small fraction of the target frame rate (e.g., 1/30 or 1/60 seconds).

```cpp
// Pseudocode example for handling large frame times due to breakpoints
F32 dt = 1.0f / 30.0f; // Set default delta-time to a fraction of the target frame rate

while (true) {
    updateSubsystemA(dt);
    updateSubsystemB(dt);

    F32 measuredTime = readHiResTimer() - begin_ticks;
    
    if (measuredTime > BREAKPOINT_LIMIT) { // Define BREAKPOINT_LIMIT as 1 second
        dt = 1.0f / 30.0f; // Set delta-time to a fraction of the target frame rate
    }

    renderScene();
    swapBuffers();
}
```
x??

---

---


#### Frame Delta Time Calculation
Background context explaining how frame delta time is calculated to ensure smooth game performance. This involves reading the current time, calculating the difference between the previous and current times, and adjusting if the time difference is too large.

:p How does the engine estimate the next frame's delta time?
??x
The engine reads the high-resolution timer twice—once at the beginning of the frame (`begin_ticks`) and once at the end (`end_ticks`). It then calculates the delta time `dt` as the ratio of the difference between these two times to the frequency of the high-resolution timer. If the calculated delta time is too large, indicating a significant pause or breakpoint, the engine forces it to a fixed value (e.g., 1/30 seconds) to maintain a stable frame rate.

```c++
U64 end_ticks = readHiResTimer();
dt = (F32)(end_ticks - begin_ticks) / (F32)getHiResTimerFrequency();

if (dt > 1.0f) {
    dt = 1.0f/30.0f;
}

begin_ticks = end_ticks;
```
x??

---


#### Multiprocessor Game Loops
Background context explaining how game engines can utilize multiple processors or cores to improve performance through task and data parallelism.

:p What is the primary goal of using multiple processors in a game engine?
??x
The primary goal is to offload tasks from the main processing thread to other threads, allowing for concurrent execution. This can significantly enhance performance by distributing work across multiple cores. The tasks are decomposed into smaller subtasks that can run concurrently.

??x
This approach helps in managing heavy computational loads such as rendering, physics simulations, and audio processing, ensuring that the game runs smoothly even under high load conditions.
x??

---


#### Task Decomposition for Concurrency
Background context explaining how task decomposition transforms a sequential program into a concurrent one. Describes two main categories: task parallelism and data parallelism.

:p How can tasks in a game loop be decomposed for concurrency?
??x
Tasks in the game loop can be broken down into smaller subtasks that can run concurrently. This transformation is essential to utilize multiple cores effectively. The decomposition can follow one of two primary strategies:

1. **Task Parallelism**: Suitable for scenarios where different operations need to be performed simultaneously across multiple cores.
2. **Data Parallelism**: Best suited for tasks that involve repetitive computations on large data sets.

Example: Animation blending and collision detection can be executed in parallel during each iteration of the game loop using task parallelism.

??x
For instance, animating characters and performing physics calculations can run concurrently without interfering with each other.
x??

---


#### One Thread per Subsystem
Background context explaining a simple approach to decompose tasks by assigning different subsystems (e.g., rendering, collision detection) to separate threads. These threads are controlled by a master thread that handles the game's high-level logic.

:p How can a game loop be implemented with one thread for each subsystem?
??x
In this approach, specific engine subsystems like rendering, collision and physics simulation, animation pipeline, and audio processing are assigned to their own dedicated threads. A master thread oversees these threads, synchronizing their operations and handling the lion's share of high-level game logic.

```c++
// Pseudocode for a simple one-thread-per-subsystem approach
class GameLoop {
    Thread renderingThread;
    Thread physicsThread;
    Thread animationThread;
    Thread audioThread;

    void run() {
        while (true) {
            // Master thread handles the main game loop and high-level logic.
            
            // Rendering thread updates the screen, etc.
            renderingThread.run();

            // Physics thread performs collision detection and simulations.
            physicsThread.run();

            // Animation thread blends animations for characters or objects.
            animationThread.run();

            // Audio thread processes sound effects and music.
            audioThread.run();
        }
    }
}
```
x??

---

---


#### Thread Limitations and Imbalances
Background context: The passage discusses the limitations of assigning each engine subsystem to its own thread. Issues include mismatched core counts, varying processing demands, and dependencies between subsystems.
:p What are the main issues with using one thread per engine subsystem?
??x
The main issues include:
1. Mismatched core counts: The number of engine subsystem threads might exceed the available cores, leading to idle cores.
2. Imbalanced workload: Subsystems process differently each frame; some may be highly utilized while others are idle.
3. Dependency problems: Some subsystems depend on data from others, creating dependencies that cannot be run in parallel.

For example:
- Rendering and audio systems need data from the animation, dynamics, and physics systems before they can start processing for a new frame.
??x
The main issues include:
1. Mismatched core counts: The number of engine subsystem threads might exceed the available cores, leading to idle cores.
2. Imbalanced workload: Subsystems process differently each frame; some may be highly utilized while others are idle.
3. Dependency problems: Some subsystems depend on data from others, creating dependencies that cannot be run in parallel.

For example:
- Rendering and audio systems need data from the animation, dynamics, and physics systems before they can start processing for a new frame.
x??

---


#### Scatter/Gather Approach
Background context: The passage introduces a divide-and-conquer approach called scatter/gather to handle data-intensive tasks. This method divides work into smaller subunits, processes them in parallel on multiple cores, and then combines the results.
:p What is the scatter/gather approach used for?
??x
The scatter/gather approach is used to parallelize data-intensive tasks such as ray casting, animation pose blending, and world matrix calculations by dividing the workload into smaller units, executing them on multiple CPU cores, and then combining the results.

For example:
- To process 9000 ray casts, you can divide the work into six batches of 1500 each, execute one batch per core, and then combine the results.
??x
The scatter/gather approach is used to parallelize data-intensive tasks such as ray casting, animation pose blending, and world matrix calculations by dividing the workload into smaller units, executing them on multiple CPU cores, and then combining the results.

For example:
- To process 9000 ray casts, you can divide the work into six batches of 1500 each, execute one batch per core, and then combine the results.
x??

---


#### Scatter/Gather in Game Loop
Background context: The passage explains how scatter/gather operations might be performed by the master game loop thread during a single iteration to parallelize CPU-intensive tasks. This involves dividing the work into smaller subunits, executing them on multiple cores, and combining the results once all workloads are completed.
:p How can the master game loop thread use scatter/gather?
??x
The master game loop thread can use scatter/gather operations during one iteration to parallelize selected CPU-intensive parts of the game loop. This involves dividing large tasks into smaller subunits, executing them on multiple cores, and then combining the results.

For example:
- The master thread might handle animation blending, physics simulation, and rendering in separate batches.
```java
public class GameLoopThread {
    public void run() {
        // Scatter work to different threads or cores
        scatterWork();

        // Gather and finalize results
        gatherAndFinalize();
    }

    private void scatterWork() {
        // Divide the workload into smaller subunits
        // Execute on multiple cores/threads
    }

    private void gatherAndFinalize() {
        // Combine and finalize the results from all subunits
    }
}
```
x??

---

---


#### Data Processing Workload Division
Background context: The architecture discussed involves dividing a large dataset into smaller batches to be processed by worker threads. This approach is particularly useful for parallel processing tasks where the system has multiple cores available.

:p How does the master thread divide work among worker threads?
??x
The master thread divides the total number of data items \( N \) into \( m \) roughly equal-sized batches, each batch containing approximately \( \frac{N}{m} \) elements. The value of \( m \) is often determined based on the available cores in the system but can be adjusted to leave some cores free for other tasks.
```java
// Pseudocode example
int N = totalDataItems; // Total number of data items to process
int m = numberOfAvailableCores; // Number of available worker threads

for (int i = 0; i < m; i++) {
    int startIndex = i * N / m;
    int count = N / m;

    // Spawn a new thread and pass the start index and count to it
    WorkerThread worker = new WorkerThread(startIndex, count);
    worker.start();
}
```
x??

---


#### Thread-Based Scatter/Gather Approach
Background context: This approach involves dividing work into smaller tasks that can be executed in parallel by multiple threads. Each thread processes a subset of the data and returns results to the master thread.

:p What is the role of the master thread in this scatter/gather approach?
??x
The master thread's primary role is to divide the dataset into manageable batches, spawn worker threads for each batch, wait for all workers to complete their tasks, and then gather the results. It can perform other useful work while waiting for the workers.
```java
// Pseudocode example
public void scatterGather() {
    int N = totalDataItems;
    int m = numberOfWorkerThreads;

    for (int i = 0; i < m; i++) {
        int startIndex = i * N / m;
        int count = N / m;

        // Spawn a new thread and pass the start index and count to it
        WorkerThread worker = new WorkerThread(startIndex, count);
        worker.start();
    }

    // Wait for all threads to complete their tasks
    for (int i = 0; i < m; i++) {
        try {
            worker.join(); // Wait until the thread completes
        } catch (InterruptedException e) {
            Thread.currentThread().interrupt();
        }
    }

    // Combine results if necessary
}
```
x??

---


#### SIMD for Scatter/Gather
Background context: SIMD (Single Instruction Multiple Data) is a technique that allows performing operations on multiple data points simultaneously. In the context of scatter/gather, it can be used to process smaller units of data within each worker thread.

:p How does SIMD fit into the scatter/gather approach?
??x
SIMD can be seen as another form of scatter/gather but at a very fine level of granularity. It enables parallel processing on small chunks of data within a single thread, effectively replacing or supplementing traditional thread-based scatter/gather approaches. Each worker thread might use SIMD to process its assigned subset of the data.
```java
// Pseudocode example for using SIMD
public void simdProcess(int[] data) {
    int N = data.length;
    int m = numberOfWorkerThreads;

    for (int i = 0; i < m; i++) {
        int startIndex = i * N / m;
        int count = N / m;

        // Use SIMD to process the subset of data
        processUsingSimd(data, startIndex, count);

        // Alternatively, use thread-based scatter/gather and then combine results
    }
}

private void processUsingSimd(int[] data, int start, int end) {
    // Example: Perform vectorized operations on a subset of data using SIMD instructions
    for (int i = start; i < end; i++) {
        // Vectorized processing logic here
    }
}
```
x??

---


#### Making Scatter/Gather More Efficient
Background context: To mitigate the overhead of creating and joining threads, a thread pool can be used. This approach pre-allocates a set of worker threads that are ready to take on tasks without needing to create new ones every time.

:p How does using a thread pool improve the scatter/gather approach?
??x
Using a thread pool improves the scatter/gather approach by reusing a fixed number of pre-created and managed threads. This avoids the overhead of repeatedly creating and destroying threads, which can be costly in terms of performance.
```java
// Example pseudocode for using a thread pool
public void scatterGatherWithThreadPool() {
    int N = totalDataItems;
    int m = numberOfWorkerThreads;

    Thread[] workerPool = new Thread[m];

    // Initialize the thread pool with pre-spawned threads
    for (int i = 0; i < m; i++) {
        workerPool[i] = new WorkerThread(i * N / m, N / m);
        workerPool[i].start();
    }

    // Wait for all threads to complete their tasks
    for (int i = 0; i < m; i++) {
        try {
            workerPool[i].join(); // Wait until the thread completes
        } catch (InterruptedException e) {
            Thread.currentThread().interrupt();
        }
    }

    // Combine results if necessary
}
```
x??

---

---


#### Multiprocessor Game Loops and Thread Management
The challenge lies in synchronizing threads to perform various tasks during each frame of a game loop, especially when dealing with a large number of variables. Directly spawning threads for every scatter/gather operation would be inefficient and hard to manage.

:p What is the main issue with directly using threads for scatter/gather operations?
??x
The main issue is inefficiency and difficulty in management due to the sheer number of threads required, each handling one specific task, leading to overhead and complexity.
x??

---


#### Job Systems Overview
A job system allows subdividing game loop iterations into multiple independent jobs that can be executed concurrently across available cores. This approach maximizes processor utilization and scales naturally with varying core counts.

:p What is the primary benefit of using a job system in game development?
??x
The primary benefit is maximizing processor utilization by efficiently distributing tasks across all available cores, thereby improving performance and scalability.
x??

---


#### Typical Job System Interface
A typical job system provides an easy-to-use API similar to threading libraries. Key functions include spawning jobs, waiting for other jobs to complete, and managing critical sections.

:p What are the key components of a typical job system interface?
??x
Key components include:
- A function to spawn a job (equivalent to `pthread_create()`).
- Functions to wait for one or more jobs to terminate (similar to `pthread_join()`).
- Facilities for early termination of jobs.
- Spin locks or mutexes for atomic operations.

Example code snippet:
```java
// Pseudocode for job system interface
class JobSystem {
    void spawnJob(Job job) { /* Schedules the job */ }
    boolean waitForJobs(Job[] jobs) { /* Waits until all specified jobs are complete */ }
    void earlyTerminateJob(Job job) { /* Terminates a job before completion */ }
}
```
x??

---


#### Example of Job System Usage
In game development, various tasks like animation, physics simulations, and rendering can be broken down into independent jobs. These jobs can then be submitted to the job system for execution.

:p How do you break down tasks in a game engine using a job system?
??x
Tasks are broken down into smaller, independent units called jobs. For example, in each frame, jobs could include updating game objects, animating them, performing physics simulations, and rendering. These jobs are then submitted to the job system for concurrent execution.

Example:
```java
// Pseudocode for a game loop with job submission
void gameLoop() {
    while (true) {
        JobSystem jobSystem = new JobSystem();
        
        // Submit different types of jobs
        jobSystem.spawnJob(new UpdateGameObjectsJob());
        jobSystem.spawnJob(new AnimationJobsJob());
        jobSystem.spawnJob(new PhysicsJobsJob());
        jobSystem.spawnJob(new RenderingJob());
        
        // Wait for all submitted jobs to complete before proceeding
        jobSystem.waitForJobs(new Job[]{});
    }
}
```
x??

---


#### Synchronization in Job Systems
To manage concurrent operations, job systems often provide mechanisms like spin locks or mutexes. These ensure that critical sections of code are executed atomically.

:p How do spin locks and mutexes help in a job system?
??x
Spin locks and mutexes help by ensuring that only one thread can execute certain parts of the code at any given time, preventing race conditions and maintaining data integrity during concurrent operations.

Example pseudocode for using a mutex:
```java
// Pseudocode for using a mutex in a job system
class JobSystem {
    private final Object mutex = new Object();
    
    void criticalSection() {
        synchronized (mutex) {
            // Code that must be executed atomically
        }
    }
}
```
x??

---


#### Scalability and Flexibility of Job Systems
Job systems can adapt to hardware configurations with varying numbers of CPU cores, making them ideal for game engines where performance is crucial.

:p How does a job system help in scaling across different hardware configurations?
??x
A job system helps by dynamically scheduling jobs across available cores. This ensures that the number and type of tasks are optimized based on the current hardware configuration, leading to better overall performance and resource utilization.
x??

---

---


---
#### Job Declaration Structure
Background context explaining the structure of a job declaration. A job declaration contains essential information needed to execute a job, such as an entry point function and parameters.

```cpp
namespace job {
    // signature of all job entry points
    typedef void EntryPoint(uintptr_t param);

    // allowable priorities
    enum class Priority { LOW, NORMAL, HIGH, CRITICAL };

    // counter (implementation not shown)
    struct Counter ... ;
    Counter* AllocCounter ();
    void FreeCounter(Counter* pCounter);

    // simple job declaration
    struct Declaration {
        EntryPoint* m_pEntryPoint;
        uintptr_t m_param;  // can hold a pointer to data or simple input
        Priority m_priority; 
        Counter* m_pCounter;  // used for synchronization
    };

    // kick a job
    void KickJob(const Declaration& decl);
    void KickJobs(int count, const Declaration aDecl[]);

    // wait for job to terminate (for its Counter to become zero)
    void WaitForCounter(Counter* pCounter);

    // kick jobs and wait for completion
    void KickJobAndWait(const Declaration& decl);
    void KickJobsAndWait(int count, const Declaration aDecl[]);
}
```

:p What is the structure of a job declaration in the provided text?
??x
The `Declaration` struct contains essential fields to define a job. It includes:
- `m_pEntryPoint`: A pointer to the entry point function that performs the job.
- `m_param`: A `uintptr_t` parameter which can hold various types of data, including pointers or simple integers.
- `m_priority`: An optional priority level for the job.
- `m_pCounter`: A pointer to a counter used for synchronization.

This structure allows flexibility in job creation and execution, supporting different types of input parameters and priorities. For example:
```cpp
Declaration myJob = {&myFunction, 42, Priority::NORMAL, nullptr};
KickJob(myJob);
```
x??

---


#### Job Execution Mechanism
Background context explaining how jobs are executed using a thread pool.

:p How does the job system use a thread pool to execute jobs?
??x
The job system uses a thread pool where each worker thread is assigned to one CPU core. Each thread runs in an infinite loop, waiting for job requests and processing them when available:

1. **Waiting for Job Requests**: The thread goes to sleep using a condition variable or similar mechanism.
2. **Processing Jobs**: When a job request arrives:
   - The entry point function is called with the provided parameters.
   - After completion, the thread returns to waiting for more jobs.

This approach ensures efficient use of resources and flexibility in job execution:

```cpp
void WorkerThread() {
    while (true) {
        // Wait for a job request
        WaitForJobRequest();

        // Process the job
        const Declaration& decl = GetNextJob();
        decl.m_pEntryPoint(decl.m_param);

        // Job is completed, go back to waiting
    }
}
```
x??

---


#### Counter Mechanism
Background context explaining how counters are used in the job system for synchronization.

:p What is a counter and how does it work in the job system?
??x
A `Counter` is an opaque type used for synchronizing jobs. It allows one job to wait until certain other jobs have completed. When a job starts, it increments its counter; when a job finishes, it decrements the counter.

When the counter reaches zero, all dependent jobs are considered complete. The system can then use `WaitForCounter` to block execution until this condition is met:

```cpp
void WaitForCounter(Counter* pCounter) {
    // Wait until the counter reaches zero
}
```

This mechanism ensures that only after certain conditions (e.g., other jobs completing) does a job proceed.

Example usage:
- A rendering job waits for physics simulation to complete before updating the scene.
x??

---


#### Job Scheduling and Priority
Background context explaining how priorities can be assigned to jobs in the system.

:p How are job priorities managed in this job system?
??x
Priorities are assigned using an `enum class Priority` with levels LOW, NORMAL, HIGH, and CRITICAL. These priorities determine the order in which jobs are executed by the thread pool:

- **LOW**: Lowest priority.
- **NORMAL**: Default or medium priority.
- **HIGH**: Higher than normal.
- **CRITICAL**: Highest priority.

When kicking a job, you can specify its priority:
```cpp
Declaration myJob = {&myFunction, 42, Priority::HIGH, nullptr};
KickJob(myJob);
```

Jobs with higher priorities are given preference in the execution queue:

```cpp
void KickJob(const Declaration& decl) {
    // Enqueue job based on its priority
}
```
x??

---

---


#### Job Worker Thread Implementation

Background context: The provided C++ code snippet describes a job worker thread implementation using a simple thread-pool mechanism. This system is designed to handle jobs that need to be executed concurrently by different threads.

:p What does the `JobWorkerThread` function do?

??x
The `JobWorkerThread` function continuously runs in an infinite loop, waiting for jobs to become available and then executing them. It uses a mutex lock and condition variable mechanism to manage job availability and execution.

```c++
void* JobWorkerThread (void*) {
    // keep on running jobs forever...
    while (true) {
        Declaration declCopy;
        
        // wait for a job to become available
        pthread_mutex_lock(&g_mutex);
        while (!g_ready) {  // Note: The condition is checking if `g_ready` is false
            pthread_cond_wait (&g_jobCv, &g_mutex);  // Wait until notified or interrupted
        }
        // copy the JobDeclaration locally and release our mutex lock
        declCopy = GetNextJobFromQueue();
        pthread_mutex_unlock(&g_mutex);
        
        // run the job
        declCopy.m_pEntryPoint (declCopy.m_param);
        
        // job is done. rinse and repeat...
    }
}
```
x??

---


#### Problem with Simple Thread-Pool Job System

Background context: The text points out a limitation of using a simple thread-pool-based job system, specifically the inability to handle jobs that require waiting for asynchronous operations such as ray casting.

:p Why can't the `NpcThinkJob` function work in the simple job system described?

??x
The `NpcThinkJob` function cannot work because it needs to wait for a result from another job (ray cast) before proceeding. However, in the simple thread-pool-based job system, every job must run to completion once it starts running; they cannot "go to sleep" waiting for results.

```c++
void NpcThinkJob(uint param) {
    Npc* pNpc = reinterpret_cast<Npc*>(param);
    pNpc->StartThinking();
    pNpc->DoSomeMoreUpdating();  // Some more updates

    // Cast a ray to determine the target
    RayCastHandle hRayCast = CastGunAimRay(pNpc);

    // Wait for the ray cast result
    WaitForRayCast(hRayCast);  // This would need to be handled differently in our system

    // Only fire weapon if there is an enemy in sight
    pNpc->TryFireWeaponAtTarget(hRayCast);
}
```
x??

---


#### Coroutines as a Solution

Background context: The text suggests that using coroutines could solve the problem of waiting for asynchronous operations, such as ray casting.

:p How do coroutines allow jobs to handle waiting scenarios?

??x
Coroutines can yield control to another coroutine partway through their execution and resume from where they left off later. This is because the implementation swaps the call stacks of the outgoing and incoming coroutines within the same thread, allowing a coroutine to effectively "go to sleep" while other coroutines run.

:p Can you provide an example of how coroutines might handle `NpcThinkJob`?

??x
In a coroutine-based system, the `NpcThinkJob` function could yield control when waiting for the ray cast result. Here is a simplified pseudocode representation:

```c++
void NpcThinkJob(uint param) {
    Npc* pNpc = reinterpret_cast<Npc*>(param);
    pNpc->StartThinking();
    pNpc->DoSomeMoreUpdating();  // Some more updates

    // Cast a ray to determine the target
    RayCastHandle hRayCast = CastGunAimRay(pNpc);

    // Yield control while waiting for the ray cast result
    yield(hRayCast);  // The coroutine yields and waits for the result

    // Resume execution when the ray cast result is ready
    // Now fire my weapon, but only if the ray cast indicates an enemy in sight
    pNpc->TryFireWeaponAtTarget(hRayCast);
}
```
x??

---


#### Job System Based on Fibers
Background context explaining that Naughty Dog’s job system is based on fibers, allowing jobs to sleep and be woken up. This enables the implementation of a join function for the job system, similar to `pthread_join()` or `WaitForSingleObject()`.
:p What is a key feature of the job system based on fibers?
??x
Fibers allow jobs to save their execution context when put to sleep and restore it later. This feature supports implementing a join function that causes the calling job to wait until one or more other jobs have completed.
x??

---


#### Job Counters in Job System
Background context explaining how job counters act like semaphores but in reverse, incrementing on job kick and decrementing on termination. This approach is more efficient than polling individual jobs.
:p How do job counters work in the job system?
??x
Job counters are incremented when a job starts and decremented when it finishes. Jobs can be kicked off with the same counter, and you wait until the counter reaches zero to know all jobs have completed their work.
x??

---


#### Efficient Job Synchronization Using Counters
Background context on the inefficiency of polling individual jobs versus waiting for a counter to reach zero. Counters are used in Naughty Dog’s job system to achieve this efficiency.
:p Why are counters more efficient than polling individual jobs?
??x
Counters are more efficient because checking the status can be done at the moment the counter is decremented, rather than periodically polling each job's status. This reduces CPU cycles wasted on unnecessary checks.
x??

---


#### Multiprocessor Game Loops and Job System
Background context explaining the need for synchronization in concurrent programs and how a job system must provide synchronization primitives similar to threading libraries.
:p What are synchronization primitives in a job system?
??x
Synchronization primitives in a job system include mechanisms like mutexes, condition variables, and semaphores. These help manage shared resources and coordinate jobs effectively.
x??

---


#### Spinlocks for Job Synchronization
Background context on the use of spinlocks to avoid putting an entire worker thread to sleep when multiple jobs need to wait for the same lock. Explanation that this approach works well under low contention.
:p How do spinlocks address the issue with OS mutexes in a job system?
??x
Spinlocks prevent putting an entire worker thread to sleep by making individual jobs busy-wait until they acquire the lock, which is more efficient when there's not much lock contention. This avoids deadlocking the entire core and allows other jobs to run.
x??

---

---


#### Mutex Mechanism for Job Systems
Background context: In a high-contention job system, a custom mutex mechanism can help manage resource contention. The mutex allows jobs to wait without consuming CPU cycles when they cannot acquire a lock. This mechanism involves busy-waiting initially and then yielding the coroutine or fiber to another job if the lock remains unavailable.

If a job needs to wait for a resource, it will first try to obtain the lock by busy-waiting. If the lock is still not available after a brief timeout, the job yields its coroutine or fiber to other waiting jobs, effectively putting itself to sleep until the lock becomes available.
:p What is the purpose of a mutex mechanism in a high-contention job system?
??x
The purpose of a mutex mechanism in a high-contention job system is to manage resource contention by allowing jobs to wait without consuming CPU cycles. When a job cannot acquire a lock, it first busy-waits and then yields its coroutine or fiber if the lock remains unavailable.
```cpp
// Pseudocode for Mutex Mechanism
if (lock.acquireTimeout(timeout)) {
    // Lock acquired successfully, proceed with job execution
} else {
    // Lock not available within timeout, yield to other jobs
    yieldCurrentCoroutine();
}
```
x??

---


#### Fiber-Based Job System Overview
Background context: The Naughty Dog job system, used on games like *The Last of Us: Remastered*, *Uncharted 4: A Thief's End*, and *Uncharted: The Lost Legacy*, employs a fiber-based approach to manage jobs efficiently. This system is designed to maximize the utilization of CPU cores available on platforms such as PS4.

:p What is the main concept of the Naughty Dog job system?
??x
The primary concept revolves around using fibers instead of thread pools or coroutines, allowing for efficient management and execution of tasks across multiple cores in a game engine.
```java
// Pseudo-code example to simulate fiber-based task scheduling
public class Fiber {
    void switchToFiber(Fiber targetFiber) {
        // Context switching logic between different fibers
    }
}
```
x??

---


#### Job Queue and Fiber Pool Management
Background context: Jobs are enqueued for execution, and the system manages a pool of fibers. When cores become free, new jobs are pulled from the queue and executed using available fibers.

:p How does the job system manage its task scheduling?
??x
The job system schedules tasks by maintaining a queue where jobs are added when they are ready to run. Free worker threads pull jobs from this queue and execute them using an unused fiber. If a running job needs more resources, it can add new jobs back into the queue.

```java
// Pseudo-code example of job execution process
public void scheduleJob(Job job) {
    if (fiberPool.isEmpty()) {
        // Create a new fiber
        Fiber newFiber = createFiber();
        workerThread.switchToFiber(newFiber);
    } else {
        Fiber availableFiber = fiberPool.poll();
        workerThread.switchToFiber(availableFiber);
        availableFiber.execute(job); // Execute the job using the fiber
        if (job.shouldAddMoreJobs()) {
            Job newJob = generateNextJob(); // Generate a new job based on conditions
            scheduleJob(newJob);
        }
    }
}
```
x??

---


#### Handling Job Synchronization with Counters
Background context: The system uses counters to synchronize jobs. When a job needs to wait, it sets up a counter and goes to sleep until the counter reaches zero.

:p How does the job system handle synchronization between different jobs?
??x
The job system handles synchronization using counters. A job can set up a counter and put itself to sleep while waiting for another job or event to complete. Once the counter hits zero, the sleeping job is woken up and can continue execution.

```java
// Pseudo-code example of job waiting on a counter
public void waitForCounterToZero(int counterId) {
    // Wait until the counter reaches zero
    while (counterValue(counterId) != 0) {
        switchToFiber(jobSystemFiber); // Switch to job system fiber for sleep handling
    }
}
```
x??

---


#### Job System Fiber Management
Background context: The job system manages its own set of fibers that it uses to handle job execution and synchronization. When a job completes, it switches back to the job system's management fiber.

:p What is the role of the job system's management fiber in handling jobs?
??x
The job system's management fiber handles switching between different jobs by calling `switchToFiber()` when needed. This allows for efficient management of the job queue and ensures that each job runs as intended without interruption.

```java
// Pseudo-code example of job management fiber logic
public void manageJobs() {
    while (true) {
        Job nextJob = getJobFromQueue(); // Get the next job from the queue
        if (nextJob != null) {
            Fiber availableFiber = getNextAvailableFiber();
            switchToFiber(availableFiber);
            availableFiber.execute(nextJob); // Execute the job on the fiber
            if (nextJob.terminatesJob()) {
                continue; // If the job completes, continue to the next one
            }
        } else {
            sleepForFrame(); // Sleep until the next frame begins
        }
    }
}
```
x??

---

