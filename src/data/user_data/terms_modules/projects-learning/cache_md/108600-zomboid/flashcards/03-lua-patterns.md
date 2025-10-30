# Project Zomboid - Lua Patterns & Techniques Flashcards

#### Nil Checking and Safety Pattern
Lua's dynamic nature means objects can be nil at unexpected times. Always checking for nil prevents the dreaded "attempt to index a nil value" error. This pattern is used extensively in professional mods.

**Problem:**
```lua
-- BAD: Can crash if player doesn't exist
local health = player:getHealth()
```

**Solution:**
```lua
-- GOOD: Check before using
if player then
    local health = player:getHealth()
end

-- BETTER: Guard clause pattern
if not player then
    return  -- Exit early
end
local health = player:getHealth()
```

**Chained checking:**
```lua
-- Check multiple levels
if player and player:getSquare() and player:getSquare():getBuilding() then
    local building = player:getSquare():getBuilding()
    -- Safe to use building
end
```

From Sleep On It mod:
```lua
if player:getBodyDamage():getBoredomLevel() < 0 then
    player:getBodyDamage():setBoredomLevel(0)
end
```

:p What is the guard clause pattern and why is it better than nested if statements?
??x
Guard clauses check for invalid conditions first and exit early, making code more readable.

**Nested if (harder to read):**
```lua
function processPlayer(player)
    if player then
        if player:isAlive() then
            if player:getSquare() then
                -- Do work (deeply nested)
                doSomething(player)
            end
        end
    end
end
```

**Guard clauses (cleaner):**
```lua
function processPlayer(player)
    -- Check invalid conditions first, exit early
    if not player then return end
    if not player:isAlive() then return end
    if not player:getSquare() then return end

    -- Main logic at top level (not nested)
    doSomething(player)
end
```

**Benefits:**
- Easier to read (less nesting)
- Failed conditions are obvious
- Main logic is not buried in indentation
- Common pattern in professional mods
x??

---

#### Goto Continue Pattern for Loops
Lua 5.1 (used by PZ) doesn't have `continue` for loops. The `goto` statement with a label provides this functionality, commonly used when iterating multiple players.

**Pattern from Mood Booster mod:**
```lua
for i = 0, getNumActivePlayers() - 1 do
    local player = getSpecificPlayer(i)

    -- Skip invalid players
    if not player then
        goto continue
    end

    if not player:isAlive() then
        goto continue
    end

    -- Process valid player
    doSomething(player)

    ::continue::  -- Label for goto
end
```

**Why not just use if?**
```lua
-- Works but creates deep nesting
for i = 0, getNumActivePlayers() - 1 do
    local player = getSpecificPlayer(i)

    if player then
        if player:isAlive() then
            -- Deep nesting
            doSomething(player)
        end
    end
end
```

:p How do you skip to the next iteration in a Lua loop since there is no 'continue' statement?
??x
Use `goto` with a label at the end of the loop.

**Pattern:**
```lua
for i = 1, 10 do
    -- Check condition
    if shouldSkip(i) then
        goto continue  -- Jump to label
    end

    -- Process this iteration
    processNumber(i)

    ::continue::  -- Label (note the double colons)
end
```

**Real example from PZ mod:**
```lua
for playerIndex = 0, getNumActivePlayers() - 1 do
    local player = getSpecificPlayer(playerIndex)

    -- Skip if player doesn't exist
    if not player then
        goto continue
    end

    -- Skip if player is dead
    if not player:isAlive() then
        goto continue
    end

    -- Only process alive, valid players
    giveBonus(player)

    ::continue::  -- Must be at end of loop
end
```

**Syntax rules:**
- Label format: `::labelname::`
- Goto format: `goto labelname`
- Label must be at the end of the loop scope
x??

---

#### String Formatting with string.format
`string.format()` allows formatted output similar to printf in C. This is cleaner than concatenating multiple values and allows control over number precision.

**Basic concatenation (works but messy):**
```lua
print("Boredom: " .. currentBoredom .. " -> " .. newBoredom)
-- Output: Boredom: 45.123456 -> 43.123456
```

**With string.format (clean and precise):**
```lua
print(string.format("Boredom: %.1f -> %.1f", currentBoredom, newBoredom))
-- Output: Boredom: 45.1 -> 43.1
```

**Common format specifiers:**
```lua
%d    -- Integer
%f    -- Floating point
%.1f  -- Float with 1 decimal place
%.2f  -- Float with 2 decimal places
%s    -- String
%%    -- Literal % character
```

**Examples:**
```lua
string.format("Player %d has %.0f%% health", playerNum, health)
-- Output: Player 0 has 85% health

string.format("Position: (%.2f, %.2f)", x, y)
-- Output: Position: (123.45, 678.90)
```

:p What are the common format specifiers in string.format() and when would you use them?
??x
Format specifiers control how values are displayed in the output string.

**Common specifiers:**

```lua
-- %d - Integer (whole numbers)
string.format("Level: %d", 5)
-- Output: "Level: 5"

-- %f - Float (decimal numbers)
string.format("Health: %f", 85.7)
-- Output: "Health: 85.700000"

-- %.1f - Float with 1 decimal place
string.format("Health: %.1f", 85.7)
-- Output: "Health: 85.7"

-- %.2f - Float with 2 decimal places
string.format("Price: $%.2f", 19.5)
-- Output: "Price: $19.50"

-- %s - String
string.format("Name: %s", playerName)
-- Output: "Name: John"

-- Multiple values
string.format("Player %d at (%.1f, %.1f)", num, x, y)
-- Output: "Player 0 at (100.5, 200.3)"
```

**Use cases:**
- Logging with precise numbers
- Debug output
- UI text formatting
x??

---

#### Table or Pattern - Lazy Initialization
The `or` pattern is used for lazy initialization, creating a table only if it doesn't exist. This is fundamental to the namespace pattern and ModData usage.

**How it works:**
```lua
MyMod = MyMod or {}
-- If MyMod is nil or false, create new table
-- If MyMod exists, use existing value
```

**Logical flow:**
```lua
-- First time:
MyMod = nil or {}  -- nil is falsy, so {} is used
-- MyMod is now {}

-- Second time:
MyMod = {} or {}   -- {} is truthy, so existing {} is kept
-- MyMod keeps its existing value
```

**Real usage:**
```lua
-- In file 1:
MyMod = MyMod or {}
MyMod.config = { value = 5 }

-- In file 2 (loaded later):
MyMod = MyMod or {}  -- Keeps existing MyMod with config
MyMod.utils = { helper = function() end }

-- Both config and utils exist in MyMod
```

**ModData pattern:**
```lua
local modData = player:getModData()
modData.MyMod = modData.MyMod or {}  -- Initialize if not exists
modData.MyMod.score = 100  -- Safe to use now
```

:p Explain how 'MyMod = MyMod or {}' works and why it's used in every file?
??x
This pattern safely creates a table if it doesn't exist, or keeps the existing one if it does.

**Logical evaluation:**
```lua
value = A or B
-- If A is truthy (not nil/false), use A
-- If A is falsy (nil/false), use B
```

**Applied to namespaces:**

File loaded first:
```lua
MyMod = MyMod or {}
-- MyMod is nil (doesn't exist yet)
-- nil is falsy, so use {}
-- Result: MyMod = {}

MyMod.data = 100
```

File loaded second:
```lua
MyMod = MyMod or {}
-- MyMod exists with {data = 100}
-- Table is truthy, so keep it
-- Result: MyMod = {data = 100} (unchanged)

MyMod.moreData = 200
-- Result: MyMod = {data = 100, moreData = 200}
```

**Why in every file:**
- Each file can be loaded in any order
- Creates namespace if first file
- Preserves namespace if not first file
- Safe regardless of load order

**Common in ModData:**
```lua
local data = player:getModData()
data.MyMod = data.MyMod or {}
data.MyMod.score = 100
```
x??

---

#### Local vs Global Variables
In Lua, variables without `local` are global by default, which can cause conflicts. Understanding scope is critical for reliable mods.

**Global (dangerous):**
```lua
function myFunction()
    count = 0  -- Global! Visible to ALL mods
end
```

**Local (safe):**
```lua
function myFunction()
    local count = 0  -- Local to this function only
end
```

**Block scope:**
```lua
local x = 10  -- Local to file/chunk

if condition then
    local y = 20  -- Local to if block
    print(x)      -- Can access x
end

print(y)  -- ERROR: y doesn't exist here
```

**Module-level locals:**
```lua
-- Top of file
local config = { value = 5 }  -- Local to this file

function MyMod.getConfig()
    return config  -- Accessible within file
end

-- Other files can't directly access config
```

**Performance:**
```lua
-- Local variables are faster
local mathSin = math.sin  -- Cache global lookup

for i = 1, 1000000 do
    local result = mathSin(i)  -- Faster than math.sin(i)
end
```

:p Why should you prefer local variables over global variables in Lua?
??x
Local variables prevent conflicts, improve performance, and make code more maintainable.

**Without local (global):**
```lua
-- In Mod A:
function doWork()
    count = 0
    for i = 1, 10 do
        count = count + i
    end
end

-- In Mod B (different mod):
function otherWork()
    count = 100  -- Overwrites Mod A's count!
end
```

**With local (safe):**
```lua
-- In Mod A:
function doWork()
    local count = 0  -- Isolated
    for i = 1, 10 do
        count = count + i
    end
end

-- In Mod B:
function otherWork()
    local count = 100  -- Separate variable
end
```

**Benefits:**

1. **No conflicts:** Each mod's variables are isolated
2. **Performance:** Local access is faster than global
3. **Clear scope:** Easy to see where variable is used
4. **Best practice:** Standard in all professional Lua code

**Rule of thumb:** ALWAYS use `local` unless you explicitly need a global.

**Exception:** Namespace tables are intentionally global:
```lua
MyMod = MyMod or {}  -- Global namespace (intentional)
local helper = function() end  -- Local helper (internal)
```
x??

---

#### Multiplayer-Safe Code Pattern
Code that works in single-player may break in multiplayer. Understanding how to write multiplayer-safe code is essential for professional mods.

**Single-player only (breaks in MP):**
```lua
-- In client/MyMod.lua
Events.OnKeyPressed.Add(function(key)
    if key == Keyboard.KEY_X then
        local player = getPlayer()
        player:getInventory():AddItem("Base.Hammer")  -- Only client sees this!
    end
end)
```

**Multiplayer-safe approaches:**

**Approach 1: Server-side only**
```lua
-- In server/MyMod.lua
Events.SomeServerEvent.Add(function()
    local player = getPlayer()
    player:getInventory():AddItem("Base.Hammer")  -- Server adds, syncs to all
end)
```

**Approach 2: Client requests, server validates**
```lua
-- In client/MyMod.lua
Events.OnKeyPressed.Add(function(key)
    if key == Keyboard.KEY_X then
        -- Client sends command to server
        sendClientCommand("MyMod", "GiveHammer", {})
    end
end)

-- In server/MyMod.lua
local function OnClientCommand(module, command, player, args)
    if module == "MyMod" and command == "GiveHammer" then
        -- Server validates and executes
        if canGiveHammer(player) then
            player:getInventory():AddItem("Base.Hammer")
        end
    end
end

Events.OnClientCommand.Add(OnClientCommand)
```

:p What makes code multiplayer-unsafe and how do you fix it?
??x
Code is multiplayer-unsafe when client-side code modifies game state that needs to be synchronized.

**Unsafe pattern:**
```lua
-- In client/ folder
function giveItem()
    local player = getPlayer()
    player:getInventory():AddItem("Base.Item")  -- Only this client sees it!
    -- Other players don't see the item
    // Server doesn't know about it
}
```

**Why it fails:**
```
Client 1 adds item → Only Client 1's game shows it
                  ↓
Server doesn't know → Can't sync to other players
                  ↓
Client 2 connects → Doesn't see the item
```

**Safe pattern (server-side):**
```lua
-- In server/ folder
function giveItem(player)
    player:getInventory():AddItem("Base.Item")
    // Server adds it
    // Automatically syncs to all clients
}
```

**Flow:**
```
Server adds item → Updates game state
               ↓
Syncs to ALL clients → Everyone sees it
               ↓
Item persists in saves
```

**Client-to-Server command:**
```lua
// Client requests (client/MyMod.lua)
sendClientCommand("MyMod", "RequestItem", {itemType = "Hammer"})

// Server handles (server/MyMod.lua)
Events.OnClientCommand.Add(function(module, command, player, args)
    if module == "MyMod" and command == "RequestItem" then
        player:getInventory():AddItem("Base." .. args.itemType)
    end
end)
```
x??

---

#### Caching Global Lookups
Accessing global variables (like math.sin) has a performance cost. Professional Lua code caches frequently used globals as local variables.

**Slow (repeated global lookups):**
```lua
function calculate()
    for i = 1, 10000 do
        local result = math.sin(i) + math.cos(i)  -- Two global lookups per iteration
    end
end
```

**Fast (cached locals):**
```lua
function calculate()
    local sin = math.sin  -- Cache once
    local cos = math.cos

    for i = 1, 10000 do
        local result = sin(i) + cos(i)  -- Local access
    end
end
```

**Common caches at file top:**
```lua
-- Cache frequently used functions
local getPlayer = getPlayer
local getSpecificPlayer = getSpecificPlayer
local instanceof = instanceof

-- Cache math functions
local mathFloor = math.floor
local mathCeil = math.ceil
local mathAbs = math.abs

-- Now use the local versions
local player = getPlayer()
local rounded = mathFloor(value)
```

**Performance impact:**
- Small functions: Minimal difference
- Tight loops: 10-30% faster
- Frequently called code: Worth it

:p Why do professional Lua developers cache global functions as local variables?
??x
Local variable access is faster than global lookup, especially in loops or frequently called code.

**Performance comparison:**

```lua
-- Slow (global lookup every time)
for i = 1, 1000000 do
    local result = math.sin(i)
    -- Lua must: lookup "math" global → lookup "sin" field → call function
end

-- Fast (cached local)
local sin = math.sin  -- One lookup at start

for i = 1, 1000000 do
    local result = sin(i)
    -- Lua must: lookup local "sin" → call function
    -- Skips the global lookup step
end
```

**Common pattern in PZ mods:**
```lua
-- Top of file
local getPlayer = getPlayer
local getSpecificPlayer = getSpecificPlayer
local instanceof = instanceof
local ZombRand = ZombRand

-- Use cached versions
local function doWork()
    local player = getPlayer()  -- Fast local access
    local rand = ZombRand(100)
end
```

**When to cache:**
- ✅ Inside tight loops
- ✅ Frequently called functions
- ✅ Performance-critical code
- ❌ One-time initialization (not worth it)
- ❌ Rarely called code (premature optimization)

**Rule:** Cache globals used >10 times or in any loop.
x??

---

#### Lua Table as Multiple Return Values
Lua functions can return multiple values, which is commonly used in PZ API. Understanding how to handle multiple returns is important.

**Multiple return values:**
```lua
function getCoordinates()
    return 10, 20, 30  -- Returns three values
end

-- Capture all
local x, y, z = getCoordinates()
print(x, y, z)  -- 10, 20, 30

-- Capture some
local x, y = getCoordinates()  -- z is discarded
print(x, y)  -- 10, 20

-- Capture in table
local coords = {getCoordinates()}
print(coords[1], coords[2], coords[3])  -- 10, 20, 30
```

**Common in PZ:**
```lua
-- Get square coordinates
local square = player:getSquare()
local x, y, z = square:getX(), square:getY(), square:getZ()

-- Ignore some returns
local player = getSpecificPlayer(0)  -- May return nil if no player
```

**Returning tables vs multiple values:**
```lua
-- Multiple values
function getPos()
    return 10, 20
end
local x, y = getPos()

-- Table
function getPos()
    return {x=10, y=20}
end
local pos = getPos()
local x = pos.x
```

:p How do you handle functions that return multiple values in Lua?
??x
Assign to multiple variables separated by commas, or capture in a table.

**Basic multiple returns:**
```lua
function divide(a, b)
    return a / b, a % b  -- Return quotient and remainder
end

-- Capture both
local quotient, remainder = divide(10, 3)
print(quotient)   -- 3
print(remainder)  -- 1

-- Capture only first
local quotient = divide(10, 3)  -- remainder discarded

-- Capture in table
local results = {divide(10, 3)}
print(results[1], results[2])  -- 3, 1
```

**PZ example:**
```lua
-- Square coordinates
local square = player:getSquare()

-- Method 1: Individual calls
local x = square:getX()
local y = square:getY()
local z = square:getZ()

-- Method 2: In one expression
local x, y, z = square:getX(), square:getY(), square:getZ()

-- Method 3: Using specific functions
local cell = getCell()
local targetSquare = cell:getGridSquare(x, y, z)
```

**Important:** Only the last function in an expression returns multiple values:
```lua
local a, b = someFunc(), otherFunc()  -- Only otherFunc() can return multiple
```
x??

---

#### Ternary Operator Alternative
Lua doesn't have a ternary operator (condition ? true : false), but you can use the `and`/`or` pattern as an alternative.

**C-style ternary (doesn't exist in Lua):**
```java
// Java/C
String result = (age >= 18) ? "adult" : "minor";
```

**Lua alternative using and/or:**
```lua
-- Simple case
local result = (age >= 18) and "adult" or "minor"

-- How it works:
-- If condition is true: true and "adult" → "adult"
-- If condition is false: false and "adult" → false, then false or "minor" → "minor"
```

**Caveat - fails if true-value is falsy:**
```lua
-- WRONG - doesn't work if true value is false/nil
local result = condition and false or "default"  -- Always returns "default"!

-- CORRECT - use if/else for falsy true-values
local result
if condition then
    result = false
else
    result = "default"
end
```

**Safe uses:**
```lua
-- Numbers (safe)
local value = hasBonus and 100 or 50

-- Strings (safe)
local message = isError and "Error!" or "OK"

-- Function calls (safe)
local player = isMultiplayer and getSpecificPlayer(0) or getPlayer()
```

:p What is the Lua equivalent of the ternary operator and when does it fail?
??x
Use `condition and trueValue or falseValue`, but it fails when trueValue is falsy.

**Basic pattern:**
```lua
-- Ternary-like expression
local result = condition and valueIfTrue or valueIfFalse

-- Examples that work:
local damage = isCritical and 100 or 50
local text = hasName and name or "Unknown"
local mult = isActive and 2.0 or 1.0
```

**When it fails:**
```lua
-- FAILS when true value is falsy (false, nil, 0 in some contexts)
local result = shouldBeFalse and false or "default"
-- Result is always "default" even when shouldBeFalse is true!

-- Why:
-- true and false → false
-- false or "default" → "default"
```

**Safe alternatives:**

**Option 1: Traditional if:**
```lua
local result
if condition then
    result = false  -- Can be any value
else
    result = "default"
end
```

**Option 2: Immediate function:**
```lua
local result = (function()
    if condition then return false
    else return "default" end
end)()
```

**Rule:** Only use and/or pattern when true-value is guaranteed truthy.
x??
