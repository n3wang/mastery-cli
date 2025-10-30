# Project Zomboid - Event System Flashcards

#### Event Registration Pattern
The event system in Project Zomboid follows the Observer pattern. You register callback functions to events, and the game engine calls them when the event occurs. This is the foundation of all mod behavior.

Basic pattern:
```lua
-- 1. Define a function
function myHandler(param1, param2)
    print("Event fired!")
end

-- 2. Register it to an event
Events.EventName.Add(myHandler)

-- 3. Game engine calls it automatically when event occurs
```

Alternative inline style:
```lua
Events.EventName.Add(function(param1, param2)
    print("Event fired!")
end)
```

The game manages WHEN your function is called. You just define WHAT should happen.

:p What are the three steps to register an event handler in Project Zomboid?
??x
The three steps are:

1. **Define a handler function:**
```lua
function onGameStart()
    print("Game started!")
end
```

2. **Register it to an event:**
```lua
Events.OnGameStart.Add(onGameStart)
```

3. **Game calls it automatically** when the event occurs

**Alternative (inline):**
```lua
Events.OnGameStart.Add(function()
    print("Game started!")
end)
```

**Important:**
- Don't call the function yourself
- The game engine manages timing
- You can register multiple handlers to the same event
x??

---

#### Game Lifecycle Events - OnGameStart vs OnGameBoot
Understanding the difference between game lifecycle events is crucial for initialization logic. Different events fire at different points in the game's startup sequence, and using the wrong one can cause bugs.

**Event sequence:**
```
1. OnGameBoot    → Game application starts
2. OnLoad        → Save file loaded (if loading)
3. OnNewGame     → New game created (if new)
4. OnGameStart   → Game world ready (happens for both new and loaded)
5. OnCreatePlayer → Player character created
```

Common usage:
- **OnGameBoot**: One-time setup, register other events
- **OnGameStart**: Initialize mod data, add items to loot tables
- **OnNewGame**: First-time player setup (only on new games)
- **OnLoad**: Restore saved state

:p What is the difference between OnGameBoot, OnGameStart, and OnNewGame events?
??x
**OnGameBoot:**
- Fires when game application first starts
- Happens ONCE when you launch PZ
- Use for: One-time initialization

```lua
Events.OnGameBoot.Add(function()
    print("Game application booted")
end)
```

**OnGameStart:**
- Fires when a game world is ready (new OR loaded)
- Happens every time you start/load a game
- Use for: Loot distribution, mod initialization

```lua
Events.OnGameStart.Add(function()
    print("Game world started")
    addItemsToLoot()  -- Run every time
end)
```

**OnNewGame:**
- Fires ONLY when creating a new game
- Does NOT fire when loading
- Use for: First-time player setup

```lua
Events.OnNewGame.Add(function(player, square)
    print("Brand new game!")
    player:getInventory():AddItem("Base.StarterKit")
end)
```
x??

---

#### Timed Events - Performance Considerations
Project Zomboid offers several timed events with vastly different frequencies. Choosing the right one is critical for performance. OnTick runs 60+ times per second, while EveryDays runs once per in-game day.

**Event frequencies:**
```lua
Events.OnTick              -- Every frame (~60-120 FPS)
Events.OnPlayerUpdate      -- Every player update (~60 FPS)
Events.EveryOneMinute      -- Every 1 game minute
Events.EveryTenMinutes     -- Every 10 game minutes
Events.EveryHours          -- Every game hour
Events.EveryDays           -- Every game day
```

**Performance impact:**
```lua
-- BAD: Heavy operation on every frame
Events.OnTick.Add(function()
    checkAllZombies()  -- Called 60+ times/second!
    updateDatabase()
end)

-- GOOD: Heavy operation periodically
Events.EveryTenMinutes.Add(function()
    checkAllZombies()  -- Called every 10 game minutes
    updateDatabase()
end)
```

:p What are the different timed events and how should you choose which one to use?
??x
Choose based on how often you NEED to check, not how often you CAN.

**Available events (frequency):**
```lua
OnTick             -- ~60-120 times/second (avoid heavy ops!)
OnPlayerUpdate     -- ~60 times/second
EveryOneMinute     -- Every 1 game minute
EveryTenMinutes    -- Every 10 game minutes
EveryHours         -- Every game hour
EveryDays          -- Every game day
```

**Decision guide:**

Use OnTick/OnPlayerUpdate for:
- Critical real-time checks (health, position)
- UI updates
- ONLY lightweight operations

Use EveryTenMinutes/EveryHours for:
- Stat modifications
- Periodic spawns
- Most mod logic

**Example:**
```lua
-- Check if player needs healing
Events.EveryTenMinutes.Add(function()
    local player = getPlayer()
    if player:getHealth() < 50 then
        healPlayer(player)
    end
end)
```
x??

---

#### Context Menu Events
Context menu events allow you to add custom options to right-click menus. Understanding the parameters passed to these events is essential for creating interactive mods.

**Two main context menu events:**

1. **OnFillInventoryObjectContextMenu** - Right-click on inventory items
```lua
Events.OnFillInventoryObjectContextMenu.Add(function(player, context, items)
    -- player: IsoPlayer object
    -- context: ISContextMenu object
    -- items: Table of selected items
end)
```

2. **OnFillWorldObjectContextMenu** - Right-click on world objects
```lua
Events.OnFillWorldObjectContextMenu.Add(function(player, context, worldobjects, test)
    -- player: IsoPlayer object
    -- context: ISContextMenu object
    -- worldobjects: Table of world objects
    -- test: Boolean (unclear purpose)
end)
```

Adding menu options:
```lua
context:addOption("Option Text", targetObject, callbackFunction, param1, param2)
```

:p How do you add a custom right-click menu option to an inventory item?
??x
Use OnFillInventoryObjectContextMenu event and context:addOption()

**Complete example:**
```lua
-- 1. Define what happens when option is selected
local function healWithItem(items, player)
    player:getBodyDamage():setOverallBodyHealth(100)
    player:Say("I feel better!")
end

-- 2. Add the menu option
local function addHealOption(player, context, items)
    -- Check if player has the right item
    if items and #items > 0 then
        local item = items[1]

        if item:getFullType() == "Base.FirstAidKit" then
            -- Add the option
            context:addOption(
                "Heal Fully",      -- Menu text
                items,             -- Items to pass
                healWithItem,      -- Callback function
                player             -- Extra parameter
            )
        end
    end
end

-- 3. Register the event
Events.OnFillInventoryObjectContextMenu.Add(addHealOption)
```
x??

---

#### Event Parameters - Player Objects
Many events pass player objects as parameters. Understanding what player object you receive and how to use it is fundamental to player-based mods.

Common event signatures:
```lua
-- Single player parameter
Events.OnCreatePlayer.Add(function(playerNum, player)
    -- playerNum: 0 for first player, 1 for second (split-screen)
    -- player: IsoPlayer object
end)

-- No player parameter (must get it yourself)
Events.OnGameStart.Add(function()
    local player = getPlayer()  -- Get main player
end)

-- Multiple players (multiplayer)
for i = 0, getNumActivePlayers() - 1 do
    local player = getSpecificPlayer(i)
    -- Handle each player
end
```

Player objects provide access to:
- Inventory: `player:getInventory()`
- Stats: `player:getBodyDamage()`
- Position: `player:getSquare()`
- ModData: `player:getModData()`

:p How do you handle events in multiplayer where you need to affect all players?
??x
Loop through all active players using getNumActivePlayers() and getSpecificPlayer(index).

**Pattern:**
```lua
function updateAllPlayers()
    -- Get number of active players
    local numPlayers = getNumActivePlayers()

    -- Loop through each player (0-indexed!)
    for playerIndex = 0, numPlayers - 1 do
        local player = getSpecificPlayer(playerIndex)

        -- Safety check
        if player and player:isAlive() then
            -- Do something with this player
            local health = player:getHealth()
            print("Player " .. playerIndex .. " health: " .. health)
        end
    end
end

Events.EveryTenMinutes.Add(updateAllPlayers)
```

**Important:**
- Lua is 1-indexed, but Java objects are 0-indexed
- Loop from 0 to numPlayers - 1
- Always check if player exists and is alive
- Works in single-player too (just 1 player)
x??

---

#### Event Handler Removal
Sometimes you need to remove event handlers, such as when a temporary effect ends or a condition is no longer needed. Proper cleanup prevents memory leaks and unexpected behavior.

**Pattern for removable handlers:**
```lua
-- Store reference to the function
local myHandler = function(player)
    print("Update")
end

-- Add handler
Events.OnPlayerUpdate.Add(myHandler)

-- Later, remove it
Events.OnPlayerUpdate.Remove(myHandler)
```

**Cannot remove anonymous functions:**
```lua
-- BAD: Can't remove this!
Events.OnPlayerUpdate.Add(function(player)
    print("Update")
end)
```

**Use case - temporary buff:**
```lua
local buffActive = true
local buffHandler = function()
    if not buffActive then
        Events.EveryTenMinutes.Remove(buffHandler)
        return
    end
    applyBuff()
end

Events.EveryTenMinutes.Add(buffHandler)

-- Later, deactivate
buffActive = false  -- Handler will remove itself
```

:p How do you remove an event handler and why can't you remove anonymous functions?
??x
You must store a reference to the function to remove it later.

**Correct approach:**
```lua
-- 1. Store function in a variable
local myHandler = function(player)
    doSomething()
end

-- 2. Add it
Events.OnPlayerUpdate.Add(myHandler)

-- 3. Remove it later
Events.OnPlayerUpdate.Remove(myHandler)
```

**Why anonymous functions can't be removed:**
```lua
-- This creates a NEW function each time
Events.OnPlayerUpdate.Add(function() end)

-- You have no reference to it, can't remove it
Events.OnPlayerUpdate.Remove(???)  -- What do you remove?
```

**Practical example - one-time event:**
```lua
local initHandler = function()
    print("Initializing...")
    setupMod()

    -- Remove self after first run
    Events.OnGameStart.Remove(initHandler)
end

Events.OnGameStart.Add(initHandler)
```
x??

---

#### OnZombieUpdate Event Pattern
OnZombieUpdate allows you to affect zombies, but it requires different handling than player events. Zombies are iterated by the engine, and you receive each zombie individually.

From the Spear Traps mod:
```lua
local function onZombieUpdate(zombie)
    -- Safety checks
    if not zombie:isAlive() then
        return
    end

    local zData = zombie:getModData()
    local square = zombie:getSquare()

    -- Check conditions
    if someCondition then
        -- Affect the zombie
        zombie:Kill(nil)
        -- or
        zombie:knockDown(true)
    end
end

Events.OnZombieUpdate.Add(onZombieUpdate)
```

Common zombie operations:
- `zombie:Kill(nil)` - Kill the zombie
- `zombie:knockDown(true)` - Knock down
- `zombie:getSquare()` - Get position
- `zombie:getModData()` - Get persistent data

:p What are the key differences between handling OnPlayerUpdate vs OnZombieUpdate events?
??x
Player updates require you to get/iterate players; zombie updates pass each zombie individually.

**OnPlayerUpdate pattern:**
```lua
Events.OnPlayerUpdate.Add(function(player)
    -- Receives ONE player
    -- In multiplayer, called once per player per frame

    if player:isAlive() then
        processPlayer(player)
    end
end)
```

**OnZombieUpdate pattern:**
```lua
Events.OnZombieUpdate.Add(function(zombie)
    -- Receives ONE zombie
    -- Called for EVERY zombie in the area (can be many!)

    if not zombie:isAlive() then
        return  -- Exit early
    end

    processZombie(zombie)
end)
```

**Performance consideration:**
```lua
-- OnZombieUpdate can fire HUNDREDS of times per frame
-- Always check conditions BEFORE heavy operations

if not zombie:isAlive() then return end
if not zombie:getSquare() then return end
if not someCondition then return end  -- Early exit

-- Only do heavy work if all conditions met
doExpensiveOperation(zombie)
```
x??

---

#### OnFillContainer - Loot Distribution Event
OnFillContainer fires the FIRST time a container is opened. This is where vanilla and modded loot is added to containers in the world. Understanding this event is key to controlling where items spawn.

**Event signature:**
```lua
Events.OnFillContainer.Add(function(roomtype, containertype, container)
    -- roomtype: string like "kitchen", "bedroom"
    -- containertype: string like "crate", "counter"
    -- container: ItemContainer object
end)
```

**Adding items:**
```lua
local function addCustomLoot(roomtype, containertype, container)
    -- Add to specific container types
    if containertype == "counter" then
        container:addItem("Base.Hammer")
        container:addItem("Base.Nails", 10)  -- Add 10 nails
    end

    -- Add to specific room types
    if roomtype == "kitchen" then
        container:addItem("Base.Apple")
    end
end

Events.OnFillContainer.Add(addCustomLoot)
```

**Important:** This event only fires ONCE per container, when first opened.

:p How does the OnFillContainer event work and when does it fire?
??x
OnFillContainer fires the FIRST time a container is opened in the game world.

**When it fires:**
```
Player opens crate → First time? → YES → OnFillContainer fires
                                 ↓
                              Add loot to container
                                 ↓
                              Container remembers it was filled
                                 ↓
Player opens again  → First time? → NO → Event doesn't fire
```

**Usage example:**
```lua
Events.OnFillContainer.Add(function(roomtype, containertype, container)
    -- roomtype: "kitchen", "bathroom", "bedroom", etc.
    -- containertype: "crate", "counter", "fridge", etc.

    -- Add custom items
    if containertype == "fridge" then
        container:addItem("Base.MyFood")
        container:addItem("Base.MyDrink", 3)  -- Add 3
    end

    if roomtype == "bathroom" and containertype == "medicine" then
        container:addItem("Base.FirstAidKit")
    end
end)
```

**Key point:** Fires ONCE per container, so all loot is added at first opening.
x??

---

#### OnSave and OnLoad - Persistence Events
OnSave and OnLoad events are crucial for mods that need to persist custom data across game sessions. However, most mods use ModData instead of manually handling these events.

**Event order:**
```
Player clicks Save → OnSave event fires
                  ↓
                  Save data to disk
                  ↓
                  Game exits

Player clicks Load → Load data from disk
                  ↓
                  OnLoad event fires
                  ↓
                  Restore mod state
```

**Modern approach (using ModData):**
```lua
-- ModData is automatically saved/loaded
local function saveData()
    local player = getPlayer()
    local modData = player:getModData()
    modData.MyMod = modData.MyMod or {}
    modData.MyMod.score = 100  -- Automatically persisted
end
```

**Manual approach (if you need custom save logic):**
```lua
Events.OnSave.Add(function()
    -- Save custom data
    saveCustomData()
end)

Events.OnLoad.Add(function()
    -- Load custom data
    loadCustomData()
end)
```

:p When should you use OnSave/OnLoad events vs using ModData for persistence?
??x
**Use ModData (recommended):**
- For player-specific data
- For world object data
- Automatically saved and loaded
- Simpler to use

```lua
-- Automatically persisted
local modData = player:getModData()
modData.MyMod = { score = 100, level = 5 }
-- Done! Saved automatically on game save
```

**Use OnSave/OnLoad when:**
- Saving global mod state (not tied to player/object)
- Custom file operations needed
- Complex data structures requiring special handling

```lua
MyMod.globalState = { totalKills = 0 }

Events.OnSave.Add(function()
    -- Save to custom file
    writeToFile(MyMod.globalState)
end)

Events.OnLoad.Add(function()
    -- Load from custom file
    MyMod.globalState = readFromFile()
end)
```

**Best practice:** Use ModData unless you have a specific reason not to.
x??
