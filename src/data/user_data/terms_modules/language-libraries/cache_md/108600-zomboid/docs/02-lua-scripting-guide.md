# Lua Scripting Guide for Project Zomboid

## Introduction

Project Zomboid uses Lua 5.1 for mod scripting. This guide covers the essential Lua patterns and Project Zomboid-specific APIs you'll use when creating mods.

## Lua Basics Refresher

### Variables and Tables

```lua
-- Variables
local myNumber = 10
local myString = "Hello"
local myBoolean = true

-- Tables (arrays and objects)
local myArray = {1, 2, 3, 4}
local myObject = {
    name = "John",
    age = 30,
    alive = true
}

-- Accessing values
print(myArray[1])        -- Prints: 1 (Lua is 1-indexed!)
print(myObject.name)     -- Prints: John
print(myObject["age"])   -- Prints: 30
```

### Functions

```lua
-- Function definition
function myFunction(param1, param2)
    return param1 + param2
end

-- Alternative syntax
local myFunction2 = function(param1, param2)
    return param1 + param2
end

-- Calling functions
local result = myFunction(5, 10)  -- result = 15
```

### Conditionals and Loops

```lua
-- If statement
if player:isAlive() then
    print("Player is alive")
elseif player:isDead() then
    print("Player is dead")
else
    print("Unknown state")
end

-- For loop (numeric)
for i = 1, 10 do
    print(i)
end

-- For loop (iterating table)
for index, value in ipairs(myArray) do
    print(index, value)
end

-- While loop
while player:isAlive() do
    -- Do something
    break  -- Exit the loop
end
```

## Project Zomboid API Basics

### Getting the Player

```lua
-- Get the first player (single-player or local player)
local player = getPlayer()

-- Get a specific player by index (multiplayer)
local player0 = getSpecificPlayer(0)

-- Get all active players count
local numPlayers = getNumActivePlayers()

-- Iterate all players
for i = 0, getNumActivePlayers() - 1 do
    local player = getSpecificPlayer(i)
    -- Do something with player
end
```

### Player Object Methods

```lua
local player = getPlayer()

-- Status checks
player:isAlive()
player:isDead()
player:isAsleep()
player:isRunning()
player:isInvincible()
player:isGodMod()

-- Get player components
player:getBodyDamage()          -- Health, injuries, moodles
player:getInventory()           -- Player inventory
player:getSquare()              -- Current square/tile
player:getModData()             -- Persistent mod data
player:getVehicle()             -- Vehicle player is in (or nil)

-- Actions
player:Say("Hello!")            -- Character says something
player:Kill(nil)                -- Kill the player
```

### Body Damage and Stats

```lua
local bodyDamage = player:getBodyDamage()

-- Get stats
local boredom = bodyDamage:getBoredomLevel()
local unhappiness = bodyDamage:getUnhappynessLevel()
local hunger = bodyDamage:getHunger()
local thirst = bodyDamage:getThirst()
local fatigue = bodyDamage:getFatigue()
local endurance = bodyDamage:getEndurance()

-- Set stats
bodyDamage:setBoredomLevel(0)
bodyDamage:setUnhappynessLevel(50)

-- Get body parts
local bodyPart = bodyDamage:getBodyPart(BodyPartType.Hand_L)
bodyPart:AddDamage(10)
bodyPart:setAdditionalPain(20)
```

### Inventory Management

```lua
local inventory = player:getInventory()

-- Check for items
local hasItem = inventory:contains("Base.Hammer")
local itemCount = inventory:getItemCount("Base.WaterBottle")

-- Get items
local item = inventory:getFirstType("Base.Axe")
local items = inventory:getItemsFromType("Base.Bandage")

-- Add/remove items
inventory:AddItem("Base.Hammer")
inventory:AddItems("Base.Nails", 10)
inventory:Remove(item)
```

### World and Squares

```lua
local player = getPlayer()
local square = player:getSquare()

-- Square information
local x = square:getX()
local y = square:getY()
local z = square:getZ()  -- Floor level

-- Get specific square
local cell = getCell()
local targetSquare = cell:getGridSquare(x, y, z)

-- Objects on square
local objects = square:getObjects()
for i = 0, objects:size() - 1 do
    local obj = objects:get(i)
    print(obj:getName())
end

-- Special objects (graves, containers, etc.)
local specialObjects = square:getSpecialObjects()
```

## Event System

### Common Events

#### Game Lifecycle Events

```lua
-- When game initially boots
Events.OnGameBoot.Add(function()
    print("Game is booting")
end)

-- When a game starts (new or loaded)
Events.OnGameStart.Add(function()
    print("Game has started")
end)

-- Only when a new game is created
Events.OnNewGame.Add(function(player, square)
    print("New game created")
end)

-- When game is saved
Events.OnSave.Add(function()
    print("Saving game...")
end)

-- When game is loaded
Events.OnLoad.Add(function()
    print("Loading game...")
end)
```

#### Player Events

```lua
-- When player is created
Events.OnCreatePlayer.Add(function(playerNum, player)
    print("Player created: " .. playerNum)
end)

-- Every frame update (use sparingly!)
Events.OnPlayerUpdate.Add(function(player)
    -- Called very frequently - avoid heavy operations
end)

-- When player dies
Events.OnPlayerDeath.Add(function(player)
    print("Player has died!")
end)

-- When player moves
Events.OnPlayerMove.Add(function(player)
    -- Called when player changes square
end)
```

#### Timed Events

```lua
-- Every in-game tick (60+ times per second - avoid heavy operations!)
Events.OnTick.Add(function(tick)
    -- tick is the current tick number
end)

-- Every 10 in-game minutes
Events.EveryTenMinutes.Add(function()
    print("10 minutes passed")
end)

-- Every in-game hour
Events.EveryHours.Add(function()
    print("An hour has passed")
end)

-- Every in-game day
Events.EveryDays.Add(function()
    print("A day has passed")
end)

-- One-time delayed event
Events.OnTickEvenPaused.Add(function()
    -- Runs even when game is paused
end)
```

#### UI Events

```lua
-- Right-click menu on inventory item
Events.OnFillInventoryObjectContextMenu.Add(function(player, context, items)
    -- player: the player who right-clicked
    -- context: the context menu object
    -- items: array of selected items

    if items and #items > 0 then
        context:addOption("Custom Action", items, function(items, player)
            print("Custom action triggered!")
        end)
    end
end)

-- Right-click menu on world object
Events.OnFillWorldObjectContextMenu.Add(function(player, context, worldobjects, test)
    -- worldobjects: objects clicked in the world

    context:addOption("Inspect Object", worldobjects, function(worldObj, player)
        print("Inspecting: " .. worldObj:getName())
    end)
end)
```

#### Container/Loot Events

```lua
-- When a container is filled (first time opened)
Events.OnFillContainer.Add(function(roomtype, containertype, container)
    -- roomtype: type of room (e.g., "bathroom", "kitchen")
    -- containertype: type of container (e.g., "crate", "medicine")
    -- container: the container object

    container:addItem("Base.Hammer")
    container:addItem("Base.Nails", 10)
end)
```

### Removing Event Handlers

```lua
-- Store reference to function
local myHandler = function(player)
    print("Update")
end

-- Add handler
Events.OnPlayerUpdate.Add(myHandler)

-- Later, remove it
Events.OnPlayerUpdate.Remove(myHandler)
```

## ModData: Persistent Storage

ModData allows you to save custom data that persists across game sessions.

### Player ModData

```lua
function savePlayerScore(player, score)
    local modData = player:getModData()

    -- Initialize your mod's namespace if it doesn't exist
    modData.MyMod = modData.MyMod or {}

    -- Save data
    modData.MyMod.score = score
    modData.MyMod.level = 5
    modData.MyMod.completedQuests = {"quest1", "quest2"}
end

function loadPlayerScore(player)
    local modData = player:getModData()

    -- Always check if data exists
    if modData.MyMod and modData.MyMod.score then
        return modData.MyMod.score
    end

    return 0  -- Default value
end
```

### World Object ModData

```lua
local function saveObjectData(worldObject)
    local modData = worldObject:getModData()
    modData.MyMod = modData.MyMod or {}
    modData.MyMod.customProperty = "value"

    -- Important: transmit changes in multiplayer
    worldObject:transmitModData()
end
```

### Square ModData

```lua
local function saveSquareData(square)
    local modData = square:getModData()
    modData.MyMod = modData.MyMod or {}
    modData.MyMod.visited = true

    -- Transmit changes
    square:transmitModData()
end
```

## Practical Examples

### Example 1: Simple Stat Modifier

Based on the "Sleep On It" mod:

```lua
-- media/lua/client/SleepBenefits.lua

function reduceBoredomWhileSleeping()
    -- Loop through all active players
    for playerIndex = 0, getNumActivePlayers() - 1 do
        local player = getSpecificPlayer(playerIndex)

        -- Check if player is sleeping
        if player:isAsleep() then
            local bodyDamage = player:getBodyDamage()

            -- Reduce boredom
            local currentBoredom = bodyDamage:getBoredomLevel()
            bodyDamage:setBoredomLevel(currentBoredom - 1.5)

            -- Make sure it doesn't go negative
            if bodyDamage:getBoredomLevel() < 0 then
                bodyDamage:setBoredomLevel(0)
            end

            -- Reduce unhappiness
            local currentUnhappiness = bodyDamage:getUnhappynessLevel()
            bodyDamage:setUnhappynessLevel(currentUnhappiness - 0.5)

            if bodyDamage:getUnhappynessLevel() < 0 then
                bodyDamage:setUnhappynessLevel(0)
            end
        end
    end
end

-- Run every 10 in-game minutes
Events.EveryTenMinutes.Add(reduceBoredomWhileSleeping)
```

### Example 2: Context Menu Action

```lua
-- media/lua/client/CustomContextMenu.lua

MyMod = MyMod or {}

-- Function that will be called when menu option is selected
MyMod.healPlayer = function(items, player)
    local bodyDamage = player:getBodyDamage()
    bodyDamage:setOverallBodyHealth(100)
    player:Say("I feel much better!")
end

-- Function to add menu option
MyMod.addHealOption = function(player, context, items)
    -- Only show option if player has a specific item
    if player:getInventory():contains("Base.Pills") then
        context:addOption("Heal Fully", items, MyMod.healPlayer, player)
    end
end

-- Register the menu modification
Events.OnFillInventoryObjectContextMenu.Add(MyMod.addHealOption)
```

### Example 3: Initialization with Sandbox Options

```lua
-- media/lua/shared/MyModConfig.lua

MyMod = MyMod or {}
MyMod.config = MyMod.config or {}

function MyMod.loadConfig()
    -- Read sandbox options (from sandbox-options.txt)
    MyMod.config.enabled = SandboxVars.MyMod.Enabled or true
    MyMod.config.difficulty = SandboxVars.MyMod.Difficulty or 5
    MyMod.config.spawnRate = SandboxVars.MyMod.SpawnRate or 1.0

    print("[MyMod] Configuration loaded")
    print("[MyMod] Enabled: " .. tostring(MyMod.config.enabled))
    print("[MyMod] Difficulty: " .. tostring(MyMod.config.difficulty))
end

Events.OnGameStart.Add(MyMod.loadConfig)
```

## Best Practices

1. **Always use namespaces**: Wrap your code in a unique table
   ```lua
   MyMod = MyMod or {}
   ```

2. **Check for nil**: Always verify objects exist before using them
   ```lua
   if player and player:isAlive() then
       -- Safe to use player
   end
   ```

3. **Use local variables**: Local variables are faster
   ```lua
   local player = getPlayer()  -- Good
   player = getPlayer()        -- Bad (global)
   ```

4. **Avoid heavy operations in frequent events**: Don't use complex logic in OnTick or OnPlayerUpdate

5. **Clean up**: Remove event listeners when they're no longer needed

6. **Log for debugging**: Use print statements during development
   ```lua
   print("[MyMod] Player health: " .. player:getHealth())
   ```

## Common Gotchas

1. **Lua is 1-indexed**: Arrays start at 1, not 0
   ```lua
   local arr = {10, 20, 30}
   print(arr[1])  -- Prints 10
   ```

2. **Java objects are 0-indexed**: Project Zomboid's Java objects use 0-based indexing
   ```lua
   for i = 0, objects:size() - 1 do  -- Note: starts at 0
       local obj = objects:get(i)
   end
   ```

3. **Multiplayer considerations**: Always use `transmitModData()` when modifying world objects

4. **Client vs Server**: UI code must be client-side, game mechanics should be server-side

## Next Steps

- Read **Item Definitions** to learn how to create custom items
- Try the **Practice Exercises** to apply what you've learned
- Explore existing mods for more complex examples
