# High-Quality Flashcards: Game-Engine-Architecture_processed (Part 20)


**Starting Chapter:** 10.7 Screenshots and Movie Capture

---


#### Screenshot Capture

Screenshot capture is a feature that saves images of the game screen, useful for documentation, debugging, or creating promotional materials.

:p What is the purpose of screenshot capture?
??x
The purpose of screenshot capture is to save images of the game screen for various purposes such as documenting gameplay, debugging issues, or creating promotional content. Developers can set options like resolution and whether to include HUD elements.
x??

---


#### In-Game Profiling Overview
Games are real-time systems, and maintaining high frame rates (30FPS or 60FPS) is crucial. Profiling helps ensure that code runs efficiently within budget by measuring performance.

: What is profiling in game development?
??x
Profiling measures the execution time of specific blocks of code to identify performance bottlenecks. This is done using an in-game profiler, which allows developers to annotate code sections for timing and displays up-to-date execution times.
x??

---


#### Hierarchical Profiling
In computer programs written in imperative languages, functions call each other hierarchically. A function can call multiple functions, creating a nested structure.

: What does hierarchical profiling show?
??x
Hierarchical profiling shows the call stack, which represents the current path from the currently executing function back to the root function of the hierarchy. In C/C++, this typically starts with `main()` or `WinMain()`, although technically it begins at a startup function part of the standard runtime library.
x??

---


#### In-Game Profiler Display
In-game profilers often provide an ahead-of-display (AOD) showing execution times for each code block. This data can include raw cycles, microsecond timings, and percentage relative to the frame.

: What does the AOD typically display?
??x
The AOD typically shows execution times in various formats:
- Raw number of cycles
- Execution time in microseconds
- Percentage of the entire frame’s execution time

This allows developers to quickly identify which parts of the code are taking up the most resources.
x??

---


#### Timeline Mode Example
In games like Uncharted: The Lost Legacy, the timeline mode visualizes when various operations occur across multiple CPU cores.

: What does timeline mode in a game profiler show?
??x
Timeline mode shows exactly when different operations are performed across all available CPU cores on the console. This helps developers understand which tasks are taking place during specific frames and their impact.
x??

---


#### Call Stack and Function Hierarchy
Understanding how functions call each other is crucial for debugging and profiling. When you set a breakpoint, the call stack shows the sequence of function calls leading up to the point where execution pauses.

:p What does the call stack look like when setting a breakpoint in function `e()`?
??x
The call stack would include `e()`, followed by any parent functions that called `e()`. For example:
```
e()
b()
a()
main()
_crt_startup()
```
x??

---


#### Inclusive and Exclusive Execution Times
In profiling, inclusive execution time measures the total time spent in a function including all its child functions. Exclusive execution time only includes the time spent directly within the function itself.

:p What is the difference between inclusive and exclusive execution times?
??x
Inclusive execution time accounts for both the function's own execution time and the time taken by any of its child functions, whereas exclusive execution time only measures the time spent executing the function itself. The formula to calculate exclusive time can be expressed as:
```
Exclusive Time = Inclusive Time - Sum(Inclusive Times of Child Functions)
```

For example, if `funcA` has an inclusive time of 10 seconds and its child function `funcB` takes 3 seconds, then the exclusive time for `funcA` would be calculated as follows:
```java
Exclusive Time (funcA) = Inclusive Time (funcA) - Inclusive Time (funcB)
                        = 10 - 3
                        = 7 seconds
```
x??

---


#### Profiling Game Loops
Profiling a game loop involves measuring the execution time of each major phase to identify bottlenecks. This is particularly useful in games where the main loop can be complex.

:p How can you profile a typical game loop?
??x
You can profile a game loop by breaking down its major phases and timing them individually. For example, if your game loop has phases like polling joypad input, updating game objects, etc., you can wrap each phase in profiling code to measure the execution time.

Here’s an example of how to do this:
```java
while (!quitGame) {
    // Profile PollJoypad()
    PROFILE(SID("Poll Joypad"));
    PollJoypad();

    // Profile UpdateGameObjects()
    PROFILE(SID("Game Object Update"));
    UpdateGameObjects();

    // Continue for other phases...
}
```
x??

---


#### Profile Macro Implementation
A profile macro can be implemented as a class that starts and stops the timer to record execution times.

:p What does the `PROFILE` macro do?
??x
The `PROFILE` macro is typically implemented as a class that records the start time of a section of code, ends when the function exits, and records the elapsed time. Here’s an example implementation in C++:
```cpp
class Profile {
public:
    Profile(const char* name) : m_Name(name), m_StartTime(std::chrono::high_resolution_clock::now()) {}

    ~Profile() {
        auto endTime = std::chrono::high_resolution_clock::now();
        auto duration = std::chrono::duration_cast<std::chrono::microseconds>(endTime - m_StartTime).count();
        // Record or print the time
        printf("%s took %f ms\n", m_Name, static_cast<float>(duration) / 1000.0);
    }

private:
    const char* m_Name;
    std::chrono::time_point<std::chrono::high_resolution_clock> m_StartTime;
};
```
x??

---


#### Coarse-Level Profiling in Game Loops
For simpler game engines, you can use coarse-level profiling to get an overview of the performance without delving into deep function hierarchies.

:p How do you implement coarse-level profiling in a game loop?
??x
You can profile each major phase of the game loop by timing them individually. Here’s how you might wrap each phase with profiling code:
```java
while (!quitGame) {
    // Profile PollJoypad()
    PROFILE(SID("Poll Joypad"));
    PollJoypad();

    // Profile Game Object Update
    PROFILE(SID("Game Object Update"));
    UpdateGameObjects();

    // Continue for other phases...
}
```
Each `PROFILE` macro call starts and stops a timer, recording the time spent in each phase of the loop.
x??

---

---


---
#### In-Game Profiling Overview
Background context: The provided text discusses a simple method for profiling code blocks within C++ using a struct called `AutoProfile`. This method times the execution of functions, but it has limitations when used within nested function calls. The example uses a macro to create these profiles.
:p What is the purpose of the `AutoProfile` struct?
??x
The `AutoProfile` struct is designed to time the execution of code blocks by automatically creating and destroying objects as they go in and out of scope. This is achieved using a constructor that starts timing when an object is created and a destructor that stops the timer and records the elapsed time.
```cpp
struct AutoProfile {
    // Constructor initializes name and start time
    AutoProfile(const char* name) { m_name = name; m_startTime = QueryPerformanceCounter(); }
    
    // Destructor calculates end time, duration, and stores it
    ~AutoProfile() { 
        std::int64_t endTime = QueryPerformanceCounter();
        std::int64_t elapsedTime = endTime - m_startTime;
        g_profileManager.storeSample(m_name, elapsedTime); 
    }

    const char* m_name; // Stores the name of the profiled block
    std::int64_t m_startTime; // Stores the start time in nanoseconds
};
```
x??

---


#### Hierarchical Profiling with Sample Bins
Background context: The text suggests a hierarchical approach to profiling by declaring sample bins. Each bin can have a parent bin, allowing for more detailed and organized profiling data.
:p How does the hierarchical structure help in profiling?
??x
The hierarchical structure helps organize profiling data into categories based on function calls. By setting up parent-child relationships between sample bins, developers can better understand which parts of the code are most time-consuming. This structure provides a clearer picture of how different functions contribute to overall performance.
```cpp
// Example of declaring sample bins with parent-child relationships
ProfilerDeclareSampleBin(SID("Rendering"), nullptr);
ProfilerDeclareSampleBin(SID("Visibility"), SID("Rendering"));
ProfilerDeclareSampleBin(SID("Shaders"), SID("Rendering"));
ProfilerDeclareSampleBin(SID("Materials"), SID("Shaders"));
ProfilerDeclareSampleBin(SID("SubmitGeo"), SID("Rendering"));
```
x??

---


#### Handling Nested Function Calls in Profiling
Background context: The text points out a limitation of the simple profiling approach when dealing with nested function calls. It explains that functions can be called by multiple parent functions, leading to inaccurate profiling data.
:p What is the issue with the current profiling method regarding nested function calls?
??x
The problem arises because the current method statically declares sample bins as if each function has only one parent in the call hierarchy. However, a function can appear multiple times in different parts of the call tree, each time with a different parent. This leads to misleading data since the function's time is incorrectly attributed to just one bin.
```cpp
// Example showing how nested calls might lead to incorrect profiling
void RenderScene() {
    PROFILE("RenderScene");
    // Nested call
    DrawShaders();
}
void DrawShaders() {
    PROFILE("DrawShaders"); // This should be a child of "RenderScene" but is not correctly identified
}
```
x??

---


#### Function Call Frequency in Profiling
Background context: The text mentions the importance of tracking how many times a function is called per frame, as this can significantly affect performance metrics.
:p Why is it important to track the number of times a function is called?
??x
Tracking the frequency of function calls is crucial because even if a function takes only 2 ms to execute on its own, if it is called 1,000 times per frame, the total execution time becomes 2 s. This information helps in identifying functions that might be causing performance bottlenecks due to excessive calls.
```cpp
// Example of tracking function call frequency and elapsed time
struct AutoProfile {
    // Constructor initializes name and start time
    AutoProfile(const char* name) { m_name = name; m_startTime = QueryPerformanceCounter(); }
    
    // Destructor calculates end time, duration, and stores it
    ~AutoProfile() { 
        std::int64_t endTime = QueryPerformanceCounter();
        std::int64_t elapsedTime = endTime - m_startTime;
        g_profileManager.storeSample(m_name, elapsedTime);
        
        // Increment call count for this function
        ++g_functionCallCount[name];
    }

    const char* m_name; // Stores the name of the profiled block
    std::int64_t m_startTime; // Stores the start time in nanoseconds
    
    static int g_functionCallCount[100]; // Array to count function calls
};
```
x??

---


#### Frame Rate and Execution Time Measurement
Background context: The team wanted to measure how long each frame took to execute and graph performance statistics over time. They used a spreadsheet with two columns - one for frame numbers and another for actual game time measured in seconds.

:p How did they measure the execution time of each frame?
??x
The team measured the execution time by using a simple setup where they recorded the frame number and corresponding game time (in seconds) in a spreadsheet. This allowed them to track how performance statistics varied over time and determine the duration of each frame.
```
// Example of recording data into a spreadsheet
1 | 0.5
2 | 0.6
3 | 0.7
```
x??

---


#### In-Game Memory Stats and Leak Detection
Background context: Game engines need to track memory usage, especially for PC games that have minimum system requirements due to limited hardware capabilities.

:p Why is tracking in-game memory stats crucial?
??x
Tracking in-game memory stats is crucial because it helps developers understand how much memory each subsystem uses and whether any memory leaks occur. This information is essential for optimizing memory usage so the game can run on targeted devices such as consoles or minimum-spec PCs.
```
// Example of a simple memory tracking function
void trackMemory(void *ptr, size_t size) {
    // Logic to update memory stats with allocated/deallocated blocks
}
```
x??

---


#### Different Flavors of Memory and Allocators
Background context: Game engines face challenges in accurately tracking memory usage due to different types of memory (e.g., main RAM vs. video RAM) and various allocators.

:p What are the common memory allocation issues developers face?
??x
Developers often face issues with tracking memory allocations because:
1. They can't control third-party code's memory behavior.
2. Different flavors of memory exist, complicating tracking (e.g., main RAM vs. video RAM).
3. Allocators have unique behaviors that require specific tracking methods.

For example, DirectX hides details about video RAM usage, making it difficult to track accurately without custom solutions.
```
// Example of a hypothetical allocator
class GameMemoryManager {
public:
    void *allocate(size_t size) { /* allocate memory */ }
    void deallocate(void *ptr) { /* free memory */ }
};
```
x??

---


#### In-Game Memory Tracking Tools
Background context: Professional game teams often develop custom in-engine tools to provide detailed and accurate memory information.

:p What are the benefits of having in-game memory tracking tools?
??x
In-game memory tracking tools benefit developers by providing:
1. Accurate and detailed information about memory usage.
2. Convenient visualizations (e.g., tables, graphs).
3. Immediate feedback on memory issues during development.

For instance, a tool might display real-time memory stats or provide alerts when low memory conditions occur.
```
// Example of in-game memory tracking output
std::cout << "Memory Usage: Heap1 - 50MB, Heap2 - 75MB, VRAM - 30MB" << std::endl;
```
x??

---


#### Out-of-Memory Conditions and Developer Feedback
Background context: When games run out of memory on target hardware, they need to provide clear feedback to developers.

:p How can game engines help developers handle out-of-memory conditions?
??x
Game engines can help by:
1. Displaying messages indicating insufficient memory.
2. Highlighting issues with visual cues (e.g., textures, animations).
3. Providing detailed diagnostic information for debugging purposes.

For example, a game could show a message like "Out of memory - this level will not run on retail systems" or visually indicate which assets failed to load.
```
// Example of displaying an out-of-memory message
std::cerr << "Out of memory: cannot load additional textures in level." << std::endl;
```
x??

---

---

