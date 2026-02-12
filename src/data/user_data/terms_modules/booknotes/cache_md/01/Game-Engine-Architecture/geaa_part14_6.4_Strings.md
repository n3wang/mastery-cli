# High-Quality Flashcards: Game-Engine-Architecture_processed (Part 14)


**Starting Chapter:** 6.4 Strings

---


---
#### Hash Table Size and Modulo Operation
Background context explaining why using a prime number for hash table size is preferable, especially when combined with quadratic probing. This helps in distributing elements more evenly across the table.

:p What are the advantages of using a prime number for the hash table size?
??x
Using a prime number for the hash table size can help distribute elements more uniformly across the table, reducing clustering and improving coverage of available slots. For example, if you have a hash table with 71 slots (a prime number), quadratic probing will traverse all 71 slots before any slot is revisited.

Here’s an example in pseudocode:
```pseudocode
function hash(key) {
    return key % 49; // 49 is a prime number
}

function quadraticProbing(hashIndex, index) {
    return (hashIndex + index * index) % 47; // Using another prime for probing
}
```

x??

---


#### Robin Hood Hashing
Background context explaining that Robin Hood hashing is a method to improve the performance of closed hash tables by reducing clustering. This technique involves moving elements to maintain an equal distance between all occupied slots.

:p What is Robin Hood hashing, and how does it differ from other probing methods like linear or quadratic probing?
??x
Robin Hood hashing is a method that improves the performance of closed hash tables even when they are nearly full. Unlike traditional linear or quadratic probing, Robin Hood hashing moves elements to maintain an equal distance between all occupied slots, which helps in reducing clustering and improving the overall efficiency.

Here’s an example pseudocode:
```pseudocode
function robinHoodHashing(hashTable, key) {
    index = hash(key) % tableSize;
    
    while (hashTable[index] != null && hashTable[index].key != key) {
        nextIndex = probe(index); // Custom probing function
        if (hashTable[nextIndex].distance > hashTable[index].distance) {
            swap(index, nextIndex);
        }
        index = nextIndex;
    }
}
```

x??

---


#### String Storage and Management in Game Engines
Background context explaining the challenges of string storage and management, including dynamic allocation, localization, text orientation handling, and internal use within game engines.

:p What are some key challenges when managing strings in a game engine project?
??x
Key challenges include:
1. **Dynamic Allocation**: Strings can vary in length, so either hard-code limitations or dynamically allocate memory.
2. **Localization (Internationalization, I18N)**: Translating strings for different languages requires handling character sets and text orientations properly.
3. **Text Orientation**: Languages like Chinese are written vertically, while some others may read right-to-left.

Here’s an example in pseudocode:
```pseudocode
function localizeString(string) {
    if (language == "Chinese") {
        return convertToVerticalText(string);
    } else if (language == "Hebrew") {
        return reverseStringAndChangeDirectionality(string);
    }
    // Handle other cases...
}

function convertToVerticalText(string) {
    // Implement vertical text conversion logic
}

function reverseStringAndChangeDirectionality(string) {
    // Reverse the string and change directionality to right-to-left
}
```

x??
---

---


#### Performance Profiling Insights
Background context: The text mentions a scenario where profiling revealed that string operations were among the most expensive parts of the codebase, leading to performance improvements by optimizing these operations.

:p How did the team identify the top-performing functions in their game's performance profile?
??x
The team used profiling tools to monitor the performance and discovered that `strcmp()` and `strcpy()` were the two most expensive functions. This led them to eliminate unnecessary string operations, which significantly increased the frame rate.
x??

---


#### Efficient String Passing and Usage
Background context: The text emphasizes passing string objects by reference to avoid unnecessary copies and improve performance.

:p Why should you always pass string objects by reference rather than by value?
??x
Passing a string object by value can lead to the overhead of copy constructors, which might result in additional memory allocations. By passing strings by reference, you can avoid these costs while still allowing the function to modify or use the string.
x??

---


#### Pathclass for Cross-Platform Compatibility
Background context: In game development, it's crucial to handle file paths across different operating systems. This requires a Pathclass that can automatically convert Windows-style backslashes (\) to UNIX-style forward slashes (/) or vice versa. This ensures compatibility with various platforms and simplifies the handling of file paths.
:p What is the purpose of a Pathclass in game engines?
??x
A Pathclass helps in hiding operating system differences by converting path separators, ensuring that the same code can work on different platforms without modifications. It abstracts away the platform-specific details such as backslashes (\) used in Windows and forward slashes (/) used in UNIX-like systems.
```cpp
class Path {
public:
    std::string convertSeparator(std::string path) {
        // Convert backslashes to forward slashes
        return path.replace(path.find_last_of("\\/"), 1, "/");
    }
};
```
x??

---


#### Unique Identifiers for Game Objects and Assets
Background context: In a game engine, objects and assets need unique identifiers for efficient management and retrieval. These identifiers allow designers to name objects meaningfully while ensuring fast comparison operations at runtime.
:p Why are unique identifiers important in game engines?
??x
Unique identifiers are essential because they enable game designers to create meaningful names for objects and assets that make up the game world. They also facilitate quick lookups and manipulations of these entities during gameplay or development, without the overhead of integer indices or complex GUIDs.
```cpp
class GameObject {
private:
    std::string id;
public:
    GameObject(std::string name) : id(name) {}
    
    // Function to get unique identifier
    std::string getId() const { return id; }
};
```
x??

---


#### Hashed String IDs for Performance and Descriptiveness
Background context: Using strings as identifiers can be flexible, but comparing them is slow. To balance descriptiveness with performance, hashed string IDs are used. These provide the benefits of descriptive names while allowing fast comparison operations.
:p What solution addresses the need for both descriptive flexibility and speed in identifier comparisons?
??x
Hashed string IDs address this need by converting strings into integers using a hash function. This allows for quick comparisons (e.g., using `==` on integers) while retaining the meaningfulness of string names. If needed, the original string can be retrieved from the hashed value.
```cpp
class HashedString {
private:
    std::string str;
    uint32_t hash;

public:
    HashedString(std::string s) : str(s), hash(calculateHash(s)) {}

    // Calculate a hash for the string
    static uint32_t calculateHash(const std::string& str) {
        // Simple example: CRC-32 implementation
        return 0x12345678; // Placeholder value
    }

    bool operator==(const HashedString& other) const {
        return hash == other.hash;
    }
};
```
x??

---


#### Unreal Engine's StringID Implementation
Background context: In the Unreal Engine, `FName` is used as a string ID that combines the flexibility of strings with the performance of integers. This implementation helps in maintaining descriptive names while ensuring fast comparisons.
:p How does Unreal Engine handle unique identifiers for assets and game objects?
??x
In the Unreal Engine, `FName` (Full Name) is used to represent unique identifiers. These are essentially hashed string IDs that provide a balance between descriptiveness and performance. They use a hash function to create a compact integer representation of strings, which can be compared quickly.
```cpp
class FName {
private:
    int32 Hash;
    FString Name;

public:
    FName(FString InName) : Hash(FCrc::Crc32(InName)), Name(MakeUniqueObjectName(nullptr, *InName)) {}

    bool operator==(const FName& Other) const {
        return Hash == Other.Hash;
    }
};
```
x??

---


---
#### Use of 64-bit Hashing for String IDs
In this context, Naughty Dog has adopted a 64-bit hashing function to generate string ids for their game titles. This approach significantly reduces the likelihood of hash collisions given the typical lengths and quantity of strings used in any one game.
:p What is the primary reason Naughty Dog switched to a 64-bit hashing function?
??x
The primary reason is to reduce the likelihood of hash collisions, which can cause issues in games where string ids are frequently used. With a larger bit size (64 bits), the number of potential unique hashes increases dramatically, making collisions much less likely.
x??

---


#### Runtime vs Compile-Time Hashing
At runtime, most game engines handle string ids by hashing strings on-the-fly. Naughty Dog allows this approach but also uses C++11's user-defined literals feature to hash strings at compile time. This is done using syntax like `\"any_string\"_sid` directly transformed into a hashed integer value.
:p How does Naughty Dog use C++11's user-defined literals for string ids?
??x
Naughty Dog utilizes C++11’s user-defined literals feature to transform the syntax `"any_string"_sid` directly into a hashed integer value at compile time. This allows string ids to be used in contexts where an integer constant can be used, such as switch statement case labels.
x??

---


#### String ID Management in Unreal Engine and Naughty Dog

Background context: The provided text discusses string id management techniques employed by Unreal Engine and Naughty Dog to optimize memory usage. This is crucial for game development, especially when considering different memory regions (debug vs retail) and localization.

:p How do Unreal Engine and Naughty Dog manage strings using ids?
??x
Unreal Engine and Naughty Dog use a technique where they store only the string ids in runtime memory instead of keeping the full strings around. The string ids are hash values that map to corresponding C-style character arrays stored in a different memory region (e.g., debug memory). When shipping the game, these strings can be removed or optimized out.

```cpp
// Example function to create and return an ID for a given string.
int32 GetSID(const FString& str) {
    int32 sid = HashString(str);
    gStringTable[sid] = strdup(str); // Copying the string to debug memory
    return sid;
}
```
x??

---


#### Debug Memory Usage in Game Development

Background context: The text explains how game developers can use different memory regions, such as debug and retail memory, for optimizing memory usage. This is particularly useful when developing games on consoles like the PS3.

:p How does using a separate debug memory region help in game development?
??x
Using a separate debug memory region allows developers to store temporary or debugging data without impacting the final shipping game's memory footprint. For example, on a PS3, there is 256MiB of retail memory and an additional 256MiB of "debug" memory that isn't present in the retail unit. By storing strings and other debug-related data in the debug memory, developers can avoid affecting the game's size when it gets shipped.

```cpp
// Example macro to use debug memory on PS3.
#define USE_DEBUG_MEMORY \
if (IsDebugBuild()) { \
    // Use debug memory for certain variables or allocations \
} else { \
    // Fallback to retail memory if not in debug mode \
}
```
x??

---


#### Localization Concerns
Background context: Even after adapting software to use Unicode, other localization issues can arise. This includes handling string databases for different languages and ensuring consistent user experience across multiple locales.
:p What are some examples of non-string-related localization concerns?
??x
Non-string-related localization concerns include:

- Date formats (e.g., "MM/DD/YYYY" vs "DD/MM/YYYY")
- Number formats (e.g., thousands separators: comma in some countries, period in others)
- Currency symbols and their placement
- User interface elements that might have cultural differences (e.g., button labels)

For example, a localization system for an application might involve maintaining a database of localized strings but also implementing logic to adapt other parts of the UI based on user preferences or regional settings.
```c
// Pseudocode for date conversion function
void convertDateToLocale(const std::string& inputDate) {
    // Convert date format according to locale rules
    std::string formattedDate = toLocaleFormat(inputDate);
}
```

The key is to ensure that the application can adapt these elements based on the user's selected language and region settings.
x??

---

---


#### Localization Database and String Management
Background context: This section explains how to manage strings for localization, ensuring that game texts are correctly displayed based on user settings. It covers database design, string IDs, and retrieving translated strings dynamically.

:p What is a crucial component of managing localized strings in a game?
??x
A central database of human-readable strings and an in-game system for looking up these strings by unique ID.
x??

---


#### Asset Management
Background context: Each asset within the localization tool is uniquely identified by its hashed string id. Assets can be either strings used in menus or HUDs, or speech audio clips with optional subtitle text.

:p How are assets managed in the localization tool?
??x
Assets are managed using unique identifiers (hashed string ids). For strings, they are stored and retrieved based on their ids to display on-screen. For speech audio clips, the system looks up the asset by id and retrieves its corresponding subtitle if applicable.
x??

---


#### Audio Asset Retrieval
Background context: For audio clips used as dialog or in cinematics, assets are looked up by their unique identifier. The system also retrieves the corresponding subtitle if it exists.

:p How are speech audio clips retrieved from the localization tool?
??x
Speech audio clips are retrieved based on their unique identifier (hashed string id). When a line of dialog needs to be played, the system looks up the audio clip by its id and uses in-engine data to retrieve the corresponding subtitle (if any), treating it just like a menu or HUD string.
```java
// Pseudocode for retrieving an audio asset and its subtitle
public void playAudio(String id) {
    // Look up audio asset using its unique identifier
    AudioClip audioAsset = localizationDatabase.getAssetById(id);
    
    // Retrieve the corresponding subtitle if it exists
    String subtitle = audioAsset.getSubtitle();
    
    // Play the audio clip and display the subtitle (if available)
    playAudioClip(audioAsset.getFile());
    displaySubtitle(subtitle);
}
```
x??

---


#### Quake's Cvars for Configuration Management
Background context: The Quake engine uses console variables (cvars) as its configuration management system. These cvars can be inspected and modified through an in-game console, making them flexible and easily accessible.

:p What is a cvar in the Quake engine?
??x
A cvar in the Quake engine is a variable that can store string or floating-point values and can be inspected and modified using the in-game console. Some cvars are designed to persist between game sessions.
??x
Cvars provide developers with a way to customize the game behavior without needing to recompile the code, making it easier to balance settings and tweak gameplay dynamically.

Code example:
```java
// Pseudocode for working with Quake's Cvars
class QuakeConfigManager {
    private Map<String, cvar_t> cvars;

    void registerCvar(String name, String defaultValue) {
        // Code to create a new cvar and add it to the manager
    }

    float getCvarValue(String varName) throws Exception {
        return (float) cvars.get(varName).value;
    }

    void setCvarValue(String varName, float value) throws Exception {
        cvars.get(varName).value = value;
    }
}
```
??x
This pseudocode illustrates how a `QuakeConfigManager` class can manage and interact with Quake's Cvars. The `registerCvar` method creates a new variable, while `getCvarValue` and `setCvarValue` retrieve or modify the value of existing cvars.
x??

---


#### In-Game Menu Settings in Naughty Dog's Engine
:p Describe the implementation of in-game menu settings in Naughty Dog’s engine.
??x
In Naughty Dog’s engine, global configuration options and commands are managed via an in-game menu system. Each configurable option is implemented as a global variable or member of a singleton struct/class. When the corresponding menu item is selected, it directly controls the value of the associated global variable.

Example function to create a menu item:
```cpp
DMENU::ItemSubmenu * CreateRailVehicleMenu() {
    extern bool g_railVehicleDebugDraw2D;
    extern bool g_railVehicleDebugDrawCameraGoals;
    extern float g_railVehicleFlameProbability;

    DMENU::Menu * pMenu = new DMENU::Menu("RailVehicle");
    pMenu->PushBackItem(
        new DMENU::ItemBool("Draw 2D Spring Graphs", DMENU::ToggleBool, &g_railVehicleDebugDraw2D)
    );
    pMenu->PushBackItem(
        new DMENU::ItemBool("Draw Goals (Untracked)", DMENU::ToggleBool, &g_railVehicleDebugDrawCameraGoals)
    );

    DMENU::ItemFloat * pItemFloat;
    pItemFloat = new DMENU::ItemFloat("FlameProbability", DMENU::EditFloat, 5, " percent5.2f", &g_railVehicleFlameProbability);
    pItemFloat->SetRangeAndStep(0.0f, 1.0f, 0.1f, 0.01f);

    pMenu->PushBackItem(pItemFloat);

    DMENU::ItemSubmenu * pSubmenuItem;
    pSubmenuItem = new DMENU::ItemSubmenu("RailVehicle...", pMenu);
    return pSubmenuItem;
}
```
x??

---


#### In-game Data Lookup
Background context: The engine can read data from binary files using the `LookupSymbol` function, which is templated on the data type.

:p How does the engine access and use the Scheme-defined data in C++ code?
??x
In-game, the engine accesses the Scheme-defined data by calling the `LookupSymbol` function. This function is templated on the data type returned and allows for reading specific instances of defined data structures.
```cpp
#include "simple-animation.h"

void someFunction() {
    SimpleAnimation * pWalkAnim = LookupSymbol<SimpleAnimation*>(SID("anim-walk"));
    SimpleAnimation * pFastWalkAnim = LookupSymbol<SimpleAnimation*>(SID("anim-walk-fast"));
    SimpleAnimation * pJumpAnim = LookupSymbol<SimpleAnimation*>(SID("anim-jump"));

    // use the data here...
}
```
x??

---

---


#### Path APIs Overview
Background context explaining that paths are complex and require handling various aspects like directory isolation, filename extraction, canonicalization, etc. The shlwapi.dll library provides useful functions for path manipulation on Windows platforms.

:p What is the purpose of the Path APIs?
??x
Path APIs provide a set of functions to handle paths more effectively, such as isolating directories, filenames, and extensions; canonicalizing paths; converting between absolute and relative paths, etc. These APIs help simplify common operations involving file and directory paths.
x??

---


#### Custom I/O Wrappers in Game Engines
Background context: Many game engines use custom wrappers around the operating system’s native I/O API. This approach ensures consistent behavior across different platforms, simplifies the API, and provides extended functionality.
:p Why might a game engine choose to wrap its file I/O API with custom functions?
??x
A game engine might use custom I/O wrappers because they can guarantee identical behavior across all target platforms, even when native libraries are inconsistent or buggy. Additionally, it allows for simplifying the API to only include necessary functions and provides extended functionality like handling files on various types of media.
```cpp
// Example of a custom wrapper function in a game engine
bool syncReadFile(const char* filePath, U8* buffer, size_t bufferSize, size_t& bytesRead) {
    FILE* handle = fopen(filePath, "rb");
    if (handle) {
        // BLOCK here until all data has been read.
        size_t bytesRead = fread(buffer, 1, bufferSize, handle);
        int err = ferror(handle); // get error if any
        fclose(handle);
        if (0 == err) {
            bytesRead = bytesRead;
            return true;
        }
    }
    bytesRead = 0;
    return false;
}
```
x??

---


#### Performance Optimization with Asynchronous I/O
Background context: In scenarios where performance is critical, such as in game development, using asynchronous I/O can help improve the responsiveness of the application. This involves offloading file operations to separate threads or processes to avoid blocking the main thread.
:p How might a game engine optimize file I/O to reduce performance bottlenecks?
??x
A game engine can optimize file I/O by moving file operations into separate threads or processes, thus avoiding blocking the main game loop. For example, a logging system could accumulate its output in a buffer and flush it asynchronously when full.
```cpp
// Pseudocode for an asynchronous file writer
class AsyncFileWriter {
    std::queue<std::string> logQueue;
    std::thread writerThread;

    void start() {
        writerThread = std::thread([this]{
            while (true) {
                if (!logQueue.empty()) {
                    writeLog(logQueue.front());
                    logQueue.pop();
                }
                // Sleep or yield to allow other threads to run
                std::this_thread::yield();
            }
        });
    }

    void appendLog(const std::string& message) {
        logQueue.push(message);
    }

    void stop() {
        writerThread.join();
    }

    void writeLog(const std::string& message) {
        // Write the log to a file
    }
};
```
x??

---

---


#### Writing Custom Asynchronous I/O Libraries
If an asynchronous file I/O library is not available for a specific platform, developers can write their own by wrapping the underlying system APIs. This approach ensures portability across different operating systems and hardware configurations.
:p Why might you need to write your own asynchronous I/O library?
??x
You might need to write your own asynchronous I/O library if the target platform does not provide one out of the box, or if the existing libraries do not meet specific requirements. Writing a custom library allows for better integration with other system components and ensures that the application can be easily ported across different platforms.
x??

---


#### Asynchronous Read Operation Example
The following code snippet demonstrates how to perform an asynchronous read operation from a file into an in-memory buffer using a callback function:
```cpp
// Global variables
AsyncRequestHandle g_hRequest; // async I/O request handle
U8 g_asyncBuffer[512]; // input buffer

static void asyncReadComplete(AsyncRequestHandle hRequest); 

void main() {
    AsyncFileHandle hFile = asyncOpen("C:\\testfile.bin"); // Open file asynchronously
    
    if (hFile) { 
        g_hRequest = asyncReadFile(hFile,  // file handle
                                   g_asyncBuffer, // input buffer
                                   sizeof(g_asyncBuffer), // size of buffer
                                   asyncReadComplete); // callback function
    }
    
    for (;;) {
        OutputDebugString("zzz... ");
        Sleep(50);
    }
}

static void asyncReadComplete(AsyncRequestHandle hRequest) {
    if (hRequest == g_hRequest && asyncWasSuccessful(hRequest)) {
        size_t bytes = asyncGetBytesReadOrWritten(hRequest); // Get number of bytes read
        char msg[256];
        snprintf(msg, sizeof(msg), "async success, read %u bytes", bytes);
        OutputDebugString(msg);
    }
}
```
:p What does the example code demonstrate?
??x
The example code demonstrates an asynchronous read operation where data is loaded from a file into an in-memory buffer without blocking the main program. The `asyncReadFile` function initiates the I/O request, which returns immediately, and a callback function (`asyncReadComplete`) handles the completion of the read operation.
x??

---

---


---
#### Asynchronous Read File Operation
Asynchronous I/O is a technique used to perform operations like file reads and writes without blocking the main thread. This allows for better responsiveness and concurrent processing, which is crucial in real-time systems such as game development.

In this example, `asyncReadFile` is called non-blocking, meaning it starts the read operation but does not wait for its completion. Instead, the program continues to execute other tasks.
:p What happens when you call `asyncReadFile` in a non-blocking manner?
??x
When `asyncReadFile` is called non-blocking, it initiates the I/O request and returns immediately to the main thread. The actual read operation runs in a separate thread or process, while the main thread can continue executing other tasks. Once the data is ready, a callback function (if specified) will be triggered to notify the main thread.
```c
AsyncRequestHandle hRequest = asyncReadFile(
    hFile, // file handle
    g_asyncBuffer, // input buffer
    sizeof(g_asyncBuffer), // size of buffer
    nullptr); // no callback
```
x??

---


#### Asynchronous I/O Priorities
Asynchronous I/O operations are often prioritized based on their importance. Lower-priority requests can be suspended or preempted by higher-priority ones, ensuring that critical tasks complete within their deadlines.

For example, streaming audio data has a higher priority than loading textures.
:p How does an asynchronous I/O system handle priorities?
??x
An asynchronous I/O system manages priorities by allowing lower-priority requests to be suspended when higher-priority requests need to be completed. This ensures that time-critical operations like real-time audio streaming are given precedence over other tasks, such as texture loading or level data fetching.

This is achieved through mechanisms like semaphores and request queuing. When a high-priority operation is initiated, the I/O system may temporarily pause lower-priority operations to ensure timely completion.
x??

---


#### Using Semaphores for Synchronization
Semaphores are used in asynchronous systems to coordinate between threads, particularly when waiting for an operation to complete.

In this context, each asynchronous request has an associated semaphore that signals its completion. The main thread can wait on these semaphores using functions like `asyncWait`.
:p How do semaphores facilitate synchronization in asynchronous I/O?
??x
Semaphores help synchronize between threads by allowing the main thread to wait for the completion of an asynchronous operation. Each request in an asynchronous system has a corresponding semaphore that is signaled when the request completes.

The main thread can use functions like `asyncWait` to block and wait on these semaphores, ensuring it only continues execution once the requested I/O operation has completed.
```c
// Example pseudocode for using semaphores
if (asyncWasSuccessful(hRequest)) {
    // Wait for the semaphore associated with hRequest
    asyncWait(hRequest);
}
```
x??
---

---

