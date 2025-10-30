# Project Zomboid - Advanced Techniques Flashcards

#### Sandbox Options Integration
Sandbox options allow players to configure your mod without editing files. This is a professional feature that improves user experience significantly.

**Create sandbox-options.txt:**
```txt
VERSION = 1,

option MyMod.EnableFeature
{
    type = boolean,
    default = true,
    page = MyMod,
    translation = MyMod_EnableFeature,
}

option MyMod.DifficultyLevel
{
    type = integer,
    min = 1,
    max = 10,
    default = 5,
    page = MyMod,
    translation = MyMod_DifficultyLevel,
}

option MyMod.SpawnRate
{
    type = double,
    min = 0.0,
    max = 2.0,
    default = 1.0,
    page = MyMod,
    translation = MyMod_SpawnRate,
}
```

**Reading in Lua:**
```lua
function MyMod.loadConfig()
    MyMod.config = {
        enabled = SandboxVars.MyMod.EnableFeature,
        difficulty = SandboxVars.MyMod.DifficultyLevel,
        spawnRate = SandboxVars.MyMod.SpawnRate,
    }
end

Events.OnGameStart.Add(MyMod.loadConfig)
```

**Benefits:**
- Players can configure without editing code
- Visible in game UI
- Per-save configuration
- Professional mod presentation

:p How do you create configurable sandbox options for your mod?
??x
Create a sandbox-options.txt file and read values from SandboxVars in Lua.

**Step 1: Create media/sandbox-options.txt**
```txt
VERSION = 1,

option MyMod.OptionName
{
    type = boolean,        // or integer, double, string
    default = true,        // Default value
    min = 1,              // For numbers (optional)
    max = 10,             // For numbers (optional)
    page = MyMod,         // Tab name in UI
    translation = MyMod_OptionName,  // Translation key
}
```

**Step 2: Read in Lua**
```lua
// media/lua/shared/MyModConfig.lua
MyMod = MyMod or {}

function MyMod.loadSandboxOptions()
    // Read values
    MyMod.enabled = SandboxVars.MyMod.EnableFeature or true
    MyMod.difficulty = SandboxVars.MyMod.DifficultyLevel or 5

    print("[MyMod] Enabled: " .. tostring(MyMod.enabled))
    print("[MyMod] Difficulty: " .. MyMod.difficulty)
end

Events.OnGameStart.Add(MyMod.loadSandboxOptions)
```

**Step 3: Use in mod logic**
```lua
function MyMod.doSomething()
    if not MyMod.enabled then
        return  // Feature disabled by player
    end

    local amount = 10 * MyMod.difficulty
    processWithAmount(amount)
end
```

**Available types:**
- `boolean` - true/false checkbox
- `integer` - Whole number slider
- `double` - Decimal number slider
- `string` - Text input
x??

---

#### Player Square and Environment Checks
Checking the player's environment (indoors, building type, etc.) enables location-based mod behavior.

**Basic checks from Mood Booster mod:**
```lua
function isPlayerIndoors(player)
    local square = player:getSquare()

    if not square then
        return false
    end

    -- Check for roof
    local hasRoof = square:haveRoof()

    -- Check if inside building
    local isInside = square:isInside()

    -- Both should be true for "indoors"
    return hasRoof and isInside
end
```

**Advanced building checks:**
```lua
function getBuildingInfo(player)
    local square = player:getSquare()
    if not square then return nil end

    -- Get the building
    local building = square:getBuilding()
    if not building then return nil end

    -- Get building definition
    local def = building:getDef()

    return {
        isSafehouse = def:isPlayerSafehouse(),
        name = building:getName(),
        isAlarmed = building:isAlarmed(),
    }
end
```

**Room type detection:**
```lua
-- Used for loot distribution
local roomName = square:getRoomName()
-- Returns: "kitchen", "bathroom", "bedroom", etc.

if roomName == "kitchen" then
    -- Player is in a kitchen
end
```

:p How do you check if a player is indoors vs outdoors and why check both roof and inside?
??x
Check both square:haveRoof() AND square:isInside() because they measure different things.

**Why both checks needed:**

```lua
function isPlayerIndoors(player)
    local square = player:getSquare()

    if not square then return false end

    local hasRoof = square:haveRoof()
    local isInside = square:isInside()

    // BOTH must be true
    return hasRoof and isInside
end
```

**Scenarios:**

**Has roof but not inside:**
```
Player standing under a porch
  hasRoof = true     // Roof overhead
  isInside = false   // Not in a building
  → Not truly indoors
```

**Inside but no roof:**
```
Player in building with destroyed roof
  hasRoof = false    // Roof destroyed/missing
  isInside = true    // Still in building bounds
  → Not protected from weather
```

**Both true:**
```
Player in intact building
  hasRoof = true     // Ceiling overhead
  isInside = true    // Within building
  → Truly indoors
```

**Complete environment check:**
```lua
function getPlayerEnvironment(player)
    local square = player:getSquare()
    if not square then return "unknown" end

    local roof = square:haveRoof()
    local inside = square:isInside()

    if roof and inside then
        return "indoors"
    elseif inside and not roof then
        return "damaged_building"
    elseif roof and not inside then
        return "under_cover"
    else
        return "outdoors"
    end
end
```
x??

---

#### World Object ModData Pattern (Spear Traps)
The Spear Traps mod demonstrates advanced use of world object ModData for complex game mechanics involving multiple related objects.

**Pattern from Spear Traps mod:**
```lua
-- Store data on grave objects
local function addSpearToGrave(grave)
    local data = grave:getModData()

    -- Initialize spear storage
    data['spears'] = data['spears'] or {}

    -- Add spear with properties
    table.insert(data['spears'], {
        type = "wooden",
        condition = 100,
        damage = 50,
    })

    -- Critical: transmit in multiplayer
    grave:transmitModData()
end

-- Check and use stored data
local function checkSpears(grave)
    local data = grave:getModData()
    local spears = data['spears'] or {}

    -- Find first non-broken spear
    for i = #spears, 1, -1 do
        if spears[i].condition > 0 then
            return i  -- Found usable spear
        end
    end

    return -1  -- No usable spears
end

-- Damage a specific spear
local function breakSpear(grave, spearIndex)
    local data = grave:getModData()
    data['spears'][spearIndex].condition = 0
    grave:transmitModData()
end
```

**Key technique:** Storing arrays of structured data in ModData.

:p How can you store complex data structures like arrays of objects in ModData?
??x
ModData can store Lua tables, including nested structures and arrays.

**Simple array storage:**
```lua
local data = worldObject:getModData()
data.MyMod = data.MyMod or {}

// Store array of strings
data.MyMod.items = {"apple", "bread", "water"}

// Store array of numbers
data.MyMod.scores = {10, 20, 30}
```

**Complex structure (from Spear Traps):**
```lua
local data = grave:getModData()
data.spears = data.spears or {}

// Store array of objects with properties
table.insert(data.spears, {
    type = "wooden",
    condition = 100,
    damage = 50,
    created = getGameTime():getWorldAgeHours(),
})

// Now data.spears looks like:
// {
//   {type="wooden", condition=100, damage=50, created=123},
//   {type="metal", condition=75, damage=80, created=125},
// }

// Must transmit for multiplayer
grave:transmitModData()
```

**Accessing nested data:**
```lua
local spears = data.spears or {}

// Iterate array
for i = 1, #spears do
    local spear = spears[i]
    print("Spear " .. i .. ": " .. spear.condition .. "% condition")

    // Modify
    if spear.condition < 50 then
        spear.condition = 0  // Break it
    end
end

// Always transmit changes
grave:transmitModData()
```

**Important:** Tables are reference types, so modifying spears[i] modifies data.spears[i].
x??

---

#### Related Object Pattern (Linked Squares)
The Spear Traps mod shows how to manage related game objects, like two squares that form one game element.

**Pattern - linking two squares:**
```lua
-- Store which square is which
local data1 = square1:getModData()
data1['spriteType'] = 'sprite1'  -- This is the first square

local data2 = square2:getModData()
data2['spriteType'] = 'sprite2'  -- This is the second square

-- Function to get the other square
local function getOtherSquare(grave)
    local data = grave:getModData()
    local sq1 = grave:getSquare()
    local sq2

    if grave:getNorth() then  -- Vertical orientation
        if data['spriteType'] == 'sprite1' then
            sq2 = getCell():getGridSquare(sq1:getX(), sq1:getY() - 1, sq1:getZ())
        else
            sq2 = getCell():getGridSquare(sq1:getX(), sq1:getY() + 1, sq1:getZ())
        end
    else  -- Horizontal orientation
        if data['spriteType'] == 'sprite1' then
            sq2 = getCell():getGridSquare(sq1:getX() - 1, sq1:getY(), sq1:getZ())
        else
            sq2 = getCell():getGridSquare(sq1:getX() + 1, sq1:getY(), sq1:getZ())
        end
    end

    return sq2
end
```

**Why this matters:**
Multi-tile objects (beds, graves, large furniture) span multiple squares. You need to synchronize state across all tiles.

:p How do you manage game objects that span multiple squares like beds or graves?
??x
Store orientation/position data in ModData and calculate related square positions.

**Concept:**
```
Multi-tile object spanning 2 squares:

[Square 1]─[Square 2]
   ↓           ↓
 sprite1    sprite2
```

**Setup pattern:**
```lua
// Mark each square with its role
function setupMultiTileObject(square1, square2, isVertical)
    local data1 = square1:getModData()
    data1.MyMod = {
        partType = "first",
        isVertical = isVertical,
    }

    local data2 = square2:getModData()
    data2.MyMod = {
        partType = "second",
        isVertical = isVertical,
    }

    square1:transmitModData()
    square2:transmitModData()
end
```

**Find partner square:**
```lua
function getPartnerSquare(square)
    local data = square:getModData().MyMod
    if not data then return nil end

    local x = square:getX()
    local y = square:getY()
    local z = square:getZ()

    local otherX, otherY = x, y

    if data.isVertical then
        // Vertical: change Y coordinate
        otherY = (data.partType == "first") and y + 1 or y - 1
    else
        // Horizontal: change X coordinate
        otherX = (data.partType == "first") and x + 1 or x - 1
    end

    return getCell():getGridSquare(otherX, otherY, z)
end
```

**Synchronize state:**
```lua
function updateBothSquares(square, newState)
    local partner = getPartnerSquare(square)

    // Update both
    square:getModData().MyMod.state = newState
    square:transmitModData()

    if partner then
        partner:getModData().MyMod.state = newState
        partner:transmitModData()
    end
end
```
x??

---

#### Body Part Damage System
The BodyDamage system provides fine-grained control over player injuries. Understanding body parts is key for realistic damage mods.

**Body part types:**
```lua
BodyPartType.Hand_L
BodyPartType.Hand_R
BodyPartType.ForeArm_L
BodyPartType.ForeArm_R
BodyPartType.UpperArm_L
BodyPartType.UpperArm_R
BodyPartType.Torso_Upper
BodyPartType.Torso_Lower
BodyPartType.Head
BodyPartType.Neck
BodyPartType.Groin
BodyPartType.UpperLeg_L
BodyPartType.UpperLeg_R
BodyPartType.LowerLeg_L
BodyPartType.LowerLeg_R
BodyPartType.Foot_L
BodyPartType.Foot_R
```

**Applying injuries from Spear Traps:**
```lua
local function giveRandomInjury(player)
    -- Define which parts can be injured
    local bodyParts = {
        BodyPartType.Foot_L,
        BodyPartType.Foot_R,
        BodyPartType.LowerLeg_L,
        BodyPartType.LowerLeg_R,
    }

    -- Pick random part
    local bodyPart = player:getBodyDamage():getBodyPart(bodyParts[1 + ZombRand(4)])

    -- Apply damage
    bodyPart:AddDamage(20 + ZombRand(80))  -- 20-100 damage

    -- Add pain
    bodyPart:setAdditionalPain(bodyPart:getAdditionalPain() + ZombRand(20))
end
```

**Other body part operations:**
```lua
local bodyPart = bodyDamage:getBodyPart(BodyPartType.Hand_L)

-- Query state
local damage = bodyPart:getDamage()
local isBleeding = bodyPart:bleeding()
local isBitten = bodyPart:bitten()
local isScratched = bodyPart:scratched()

-- Modify state
bodyPart:AddDamage(50)
bodyPart:setBandaged(true, 100)
bodyPart:setBleedingTime(10)
```

:p How do you apply damage to specific body parts rather than general health?
??x
Get the BodyPart object from BodyDamage and call damage methods on it.

**Process:**

**Step 1: Get body damage system**
```lua
local player = getPlayer()
local bodyDamage = player:getBodyDamage()
```

**Step 2: Get specific body part**
```lua
// Choose a body part type
local bodyPart = bodyDamage:getBodyPart(BodyPartType.Hand_L)
```

**Step 3: Apply injury**
```lua
// Add damage (0-100)
bodyPart:AddDamage(25)  // 25 damage to left hand

// Add pain
local currentPain = bodyPart:getAdditionalPain()
bodyPart:setAdditionalPain(currentPain + 10)

// Set bleeding
bodyPart:setBleedingTime(20)  // Bleed for 20 time units

// Mark as bitten/scratched
bodyPart:setBitten(true)
bodyPart:setScratched(true)
```

**Random body part (from Spear Traps):**
```lua
function damageRandomLeg(player)
    local legParts = {
        BodyPartType.Foot_L,
        BodyPartType.Foot_R,
        BodyPartType.LowerLeg_L,
        BodyPartType.LowerLeg_R,
    }

    // Pick random leg part (ZombRand returns 0-3)
    local randomIndex = 1 + ZombRand(4)
    local bodyPart = player:getBodyDamage():getBodyPart(legParts[randomIndex])

    // Apply damage
    bodyPart:AddDamage(20 + ZombRand(80))  // 20-100 damage
}
```

**Check body part state:**
```lua
if bodyPart:scratched() or bodyPart:bitten() then
    print("Wound needs bandaging!")
end
```
x??

---

#### Vehicle Damage System
Vehicles have parts that can be individually damaged. Understanding the vehicle part system enables vehicle-affecting mods.

**From Spear Traps - damaging vehicle parts:**
```lua
local function damageRandomParts(vehicle, destroy)
    local validParts = {}

    local partLocations = {
        'FrontLeft',
        'FrontRight',
        'RearLeft',
        'RearRight',
    }

    -- Find all valid tires
    for _, partLocation in pairs(partLocations) do
        local tire = vehicle:getPartById('Tire' .. partLocation)
        local suspension = vehicle:getPartById('Suspension' .. partLocation)

        if tire and tire:getCondition() > 0 then
            table.insert(validParts, {
                tire = tire,
                suspension = suspension,
            })
        end
    end

    -- Pick random part and damage it
    local parts = validParts[ZombRand(#validParts)]

    local damage = 100
    if not destroy then
        damage = damage * (10 + ZombRand(40)) / 100  -- 10-50% damage
    end

    parts.tire:damage(damage)
    parts.suspension:damage(damage * 0.5)  -- Less suspension damage
end
```

**Common vehicle part IDs:**
```lua
'TireFrontLeft', 'TireFrontRight'
'TireRearLeft', 'TireRearRight'
'SuspensionFrontLeft', etc.
'Engine'
'Muffler'
'WindowFrontLeft', 'WindowFrontRight'
```

:p How do you damage specific parts of a vehicle like tires or engine?
??x
Use vehicle:getPartById() to get the part, then call damage() on it.

**Complete example:**

**Step 1: Get vehicle**
```lua
local player = getPlayer()
local vehicle = player:getVehicle()  // Vehicle player is in

if not vehicle then return end  // Player not in vehicle
```

**Step 2: Get specific part**
```lua
// Part ID format: PartType + Location
local tire = vehicle:getPartById('TireFrontLeft')
local engine = vehicle:getPartById('Engine')
local window = vehicle:getPartById('WindowFrontLeft')
```

**Step 3: Check and damage part**
```lua
if tire then
    // Check condition (0-100)
    local condition = tire:getCondition()

    if condition > 0 then
        // Damage the part
        tire:damage(50)  // Reduce by 50 points

        // Or set directly
        tire:setCondition(0)  // Completely destroyed
    end
end
```

**Real example (trap damages random tire):**
```lua
function damageRandomTire(vehicle)
    local tireLocations = {
        'FrontLeft',
        'FrontRight',
        'RearLeft',
        'RearRight',
    }

    // Find all intact tires
    local goodTires = {}
    for _, loc in ipairs(tireLocations) do
        local tire = vehicle:getPartById('Tire' .. loc)
        if tire and tire:getCondition() > 0 then
            table.insert(goodTires, tire)
        end
    end

    // Damage random one
    if #goodTires > 0 then
        local randomTire = goodTires[ZombRand(#goodTires) + 1]
        randomTire:damage(100)  // Destroy it
    end
end
```
x??

---

#### Configuration Helper Pattern
Professional mods centralize configuration to make adjustments easy and provide defaults.

**Pattern:**
```lua
MyMod = MyMod or {}

-- Default configuration
MyMod.config = {
    -- Feature toggles
    enabled = true,
    debugMode = false,

    -- Numeric values
    spawnRate = 1.0,
    damageMultiplier = 1.5,
    cooldown = 600,  -- In game ticks

    -- String values
    messageColor = "0.5,1.0,0.5",
}

-- Load from sandbox options (if available)
function MyMod.loadConfig()
    if SandboxVars and SandboxVars.MyMod then
        MyMod.config.enabled = SandboxVars.MyMod.Enabled or MyMod.config.enabled
        MyMod.config.spawnRate = SandboxVars.MyMod.SpawnRate or MyMod.config.spawnRate
    end

    print("[MyMod] Configuration loaded:")
    print("  Enabled: " .. tostring(MyMod.config.enabled))
    print("  Spawn Rate: " .. MyMod.config.spawnRate)
end

Events.OnGameStart.Add(MyMod.loadConfig)

-- Use in code
function MyMod.doSomething()
    if not MyMod.config.enabled then
        return
    end

    local amount = baseAmount * MyMod.config.damageMultiplier
    process(amount)
end
```

**Benefits:**
- Single place to adjust values
- Clear defaults
- Easy sandbox integration
- Professional appearance

:p What is the configuration helper pattern and why use it?
??x
Centralize all configuration values in one table with defaults, then optionally override from sandbox options.

**Pattern structure:**

**Step 1: Define defaults**
```lua
MyMod = MyMod or {}

MyMod.config = {
    // Feature flags
    enabled = true,
    debugMode = false,

    // Tuning values
    damageBonus = 10,
    spawnChance = 0.5,
    cooldownMinutes = 10,

    // Messages
    welcomeMessage = "Mod loaded!",
}
```

**Step 2: Load from sandbox (optional)**
```lua
function MyMod.loadConfig()
    // Override with sandbox values if present
    if SandboxVars and SandboxVars.MyMod then
        MyMod.config.enabled = SandboxVars.MyMod.Enabled or MyMod.config.enabled
        MyMod.config.damageBonus = SandboxVars.MyMod.DamageBonus or MyMod.config.damageBonus
    end

    // Log configuration
    print("[MyMod] Config: " .. tostring(MyMod.config.enabled))
end

Events.OnGameStart.Add(MyMod.loadConfig)
```

**Step 3: Use throughout mod**
```lua
function MyMod.dealDamage(baseDamage)
    if not MyMod.config.enabled then
        return baseDamage
    end

    // Use config values
    return baseDamage + MyMod.config.damageBonus
end

function MyMod.shouldSpawn()
    return ZombRand(100) < (MyMod.config.spawnChance * 100)
end
```

**Benefits:**
- ✅ Change values in one place
- ✅ No magic numbers scattered in code
- ✅ Easy to add sandbox options later
- ✅ Clear what can be configured
- ✅ Defaults always available
x??

---

#### Early Return Pattern for Performance
Checking conditions early and returning immediately prevents unnecessary computation. This is critical in frequently-called events.

**Bad - processes before checking:**
```lua
Events.OnZombieUpdate.Add(function(zombie)
    -- Do expensive work first
    local nearbyPlayers = findNearbyPlayers(zombie)
    local distance = calculateDistance(zombie, player)
    local hasLineOfSight = checkLineOfSight(zombie, player)

    -- Then check if we should even run
    if not zombie:isAlive() then
        return  -- Wasted all that computation!
    end

    -- Actually use the data
    processZombie(zombie, nearbyPlayers, distance)
end)
```

**Good - check conditions first:**
```lua
Events.OnZombieUpdate.Add(function(zombie)
    -- Check cheapest conditions first
    if not zombie then return end
    if not zombie:isAlive() then return end

    -- Get square
    local square = zombie:getSquare()
    if not square then return end

    -- Check mod-specific condition
    if not someConditionMet() then return end

    -- Only now do expensive work
    local nearbyPlayers = findNearbyPlayers(zombie)
    local distance = calculateDistance(zombie, player)

    processZombie(zombie, nearbyPlayers, distance)
end)
```

**Order of checks:**
1. Nil checks (cheapest)
2. Simple state checks
3. ModData reads
4. Expensive calculations

:p Why should you check conditions at the start of a function instead of at the end?
??x
Early returns avoid wasting CPU on computations you don't need.

**Inefficient (checks conditions last):**
```lua
function processZombie(zombie)
    // Do expensive work first
    local nearbyObjects = findAllNearbyObjects(zombie)  // Expensive!
    local pathToPlayer = calculatePath(zombie, player)  // Very expensive!
    local threat = analyzeThreat(zombie)                // Expensive!

    // Check if we should have even run (too late!)
    if not zombie:isAlive() then
        return  // Already wasted CPU on 3 expensive operations!
    end

    useCalculations(nearbyObjects, pathToPlayer, threat)
}
```

**Efficient (checks first):**
```lua
function processZombie(zombie)
    // Check cheapest conditions FIRST
    if not zombie then return end               // Instant
    if not zombie:isAlive() then return end     // Very fast

    local square = zombie:getSquare()
    if not square then return end               // Fast

    if not someSpecificCondition() then return end  // Fast

    // Only do expensive work if all checks pass
    local nearbyObjects = findAllNearbyObjects(zombie)
    local pathToPlayer = calculatePath(zombie, player)
    local threat = analyzeThreat(zombie)

    useCalculations(nearbyObjects, pathToPlayer, threat)
}
```

**Performance impact:**
```
1000 zombie updates/second

Bad approach:
  All 1000 → Expensive calculations
  900 fail condition → Wasted 90% of CPU

Good approach:
  1000 check condition → Very cheap
  100 pass → Only these do expensive work
  Saves 90% CPU time
```

**Order by cost:**
```lua
// 1. Nil checks (nearly free)
if not object then return end

// 2. Boolean checks (very cheap)
if not player:isAlive() then return end

// 3. Simple function calls (cheap)
if not hasRequiredItem() then return end

// 4. Expensive operations (only if needed)
local result = expensiveCalculation()
```
x??
