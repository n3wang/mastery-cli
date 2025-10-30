# Project Zomboid - ModData & Item Definitions Flashcards

#### ModData Basics - Persistent Storage
ModData provides persistent storage that automatically saves with the game. It's attached to players, world objects, and squares, surviving game restarts.

**Three types of ModData:**
```lua
-- 1. Player ModData (per player)
local playerData = player:getModData()

-- 2. World Object ModData (per object)
local objectData = worldObject:getModData()

-- 3. Square ModData (per tile)
local squareData = square:getModData()
```

**Basic pattern:**
```lua
-- Get ModData
local modData = player:getModData()

-- Initialize your namespace
modData.MyMod = modData.MyMod or {}

-- Store data
modData.MyMod.score = 100
modData.MyMod.level = 5
modData.MyMod.items = {"sword", "shield"}

-- Data automatically saved when game saves
```

**Important:** ModData is Lua tables that persist across sessions. No manual save/load needed.

:p What is ModData and what are the three types available in Project Zomboid?
??x
ModData is persistent storage that automatically saves with the game, attached to different game objects.

**Three types:**

**1. Player ModData:**
```lua
local player = getPlayer()
local data = player:getModData()

data.MyMod = data.MyMod or {}
data.MyMod.kills = 50
data.MyMod.deaths = 2

-- Saves per player
-- Lost when player dies (can optionally preserve)
```

**2. World Object ModData:**
```lua
local container = someWorldObject
local data = container:getModData()

data.MyMod = data.MyMod or {}
data.MyMod.isLocked = true
data.MyMod.owner = "Player1"

-- Saves per object instance
-- Persists with that specific object
```

**3. Square ModData:**
```lua
local square = player:getSquare()
local data = square:getModData()

data.MyMod = data.MyMod or {}
data.MyMod.visited = true
data.MyMod.lastVisit = getGameTime():getWorldAgeHours()

-- Saves per tile/square
-- Persists for that location
```

**All ModData automatically saves/loads with the game.**
x??

---

#### ModData Initialization Pattern
Always initialize your mod's ModData namespace before using it to avoid nil errors. This pattern is used in nearly every mod that persists data.

**Problem:**
```lua
-- BAD: Crashes if MyMod doesn't exist
local modData = player:getModData()
modData.MyMod.score = 100  -- ERROR: attempt to index nil value
```

**Solution - Safe initialization:**
```lua
local modData = player:getModData()

-- Initialize if doesn't exist
modData.MyMod = modData.MyMod or {}

-- Now safe to use
modData.MyMod.score = 100
modData.MyMod.level = 5
```

**Reading with defaults:**
```lua
local modData = player:getModData()

-- Read with default if doesn't exist
local score = modData.MyMod and modData.MyMod.score or 0
-- If modData.MyMod exists and has score, use it; otherwise use 0

-- Alternative (clearer):
local score = 0
if modData.MyMod and modData.MyMod.score then
    score = modData.MyMod.score
end
```

**Helper function pattern:**
```lua
function MyMod.getPlayerData(player)
    local modData = player:getModData()
    modData.MyMod = modData.MyMod or {}
    return modData.MyMod
end

-- Usage
local data = MyMod.getPlayerData(player)
data.score = 100  -- Safe
```

:p What is the correct pattern for initializing and reading ModData safely?
??x
Always initialize the namespace with `or {}` pattern before writing, and check existence before reading.

**Writing pattern:**
```lua
function saveData(player)
    local modData = player:getModData()

    -- Initialize namespace (creates if missing)
    modData.MyMod = modData.MyMod or {}

    -- Safe to write
    modData.MyMod.score = 100
    modData.MyMod.items = {"apple", "bread"}
end
```

**Reading pattern with defaults:**
```lua
function loadData(player)
    local modData = player:getModData()

    -- Method 1: Check before accessing
    if modData.MyMod and modData.MyMod.score then
        return modData.MyMod.score
    end
    return 0  -- Default

    -- Method 2: Use 'and/or' pattern
    local score = modData.MyMod and modData.MyMod.score or 0

    -- Method 3: Initialize then read
    modData.MyMod = modData.MyMod or {}
    local score = modData.MyMod.score or 0
end
```

**Helper function (best practice):**
```lua
function MyMod.getData(player)
    local data = player:getModData()
    data.MyMod = data.MyMod or {
        score = 0,     -- Defaults
        level = 1,
        items = {}
    }
    return data.MyMod
end

-- Usage
local data = MyMod.getData(player)
data.score = data.score + 10  -- Always safe
```
x??

---

#### ModData Multiplayer Synchronization
In multiplayer, ModData changes need to be transmitted to sync between server and clients. This is critical for world objects and squares.

**Player ModData (auto-synced):**
```lua
-- Player ModData syncs automatically
local data = player:getModData()
data.MyMod = data.MyMod or {}
data.MyMod.score = 100
-- No transmit needed - automatically synced
```

**World Object ModData (must transmit):**
```lua
-- World object changes need manual sync
local container = worldObject
local data = container:getModData()
data.MyMod = data.MyMod or {}
data.MyMod.isLocked = true

-- IMPORTANT: Transmit changes in multiplayer
container:transmitModData()
```

**Square ModData (must transmit):**
```lua
local square = player:getSquare()
local data = square:getModData()
data.MyMod = data.MyMod or {}
data.MyMod.visited = true

-- IMPORTANT: Transmit changes
square:transmitModData()
```

From Spear Traps mod:
```lua
local data = grave:getModData()
data['spears'][spearIndex].condition = 0

-- Sync to all players
grave:transmitModData()
grave2:transmitModData()
```

:p When do you need to call transmitModData() and why?
??x
Call transmitModData() when modifying world objects or squares in multiplayer to sync changes to all clients.

**Auto-synced (NO transmit needed):**
```lua
// Player ModData
local player = getPlayer()
local data = player:getModData()
data.MyMod = { score = 100 }
// Automatically syncs in multiplayer
```

**Manual sync required (MUST transmit):**
```lua
// World Object ModData
local door = worldObject
local data = door:getModData()
data.MyMod = { locked = true }

door:transmitModData()  // REQUIRED in multiplayer
// Without this, only server sees the change

// Square ModData
local square = player:getSquare()
local data = square:getModData()
data.MyMod = { trapped = true }

square:transmitModData()  // REQUIRED in multiplayer
```

**Why necessary:**
```
Server modifies object → Change is local to server
                      ↓
Without transmit → Clients don't see change
                      ↓ (desync)
Clients have old data → Bugs, cheating possible

With transmit → Syncs to all clients
             ↓
Everyone sees change → Consistent state
```

**Rule:** Always call transmitModData() after changing world object or square ModData in server-side code.
x??

---

#### Item Definition - Module and Item Structure
Items are defined in .txt files using a declarative syntax. Understanding the module/item structure is fundamental to creating custom content.

**Basic structure:**
```
module ModuleName
{
    item ItemName
    {
        Property1 = Value1,
        Property2 = Value2,
        Property3 = Value3,
    }
}
```

**Real example:**
```
module Base
{
    item MyApple
    {
        Type            = Food,
        DisplayName     = Red Apple,
        Icon            = Apple,
        Weight          = 0.1,
        HungerChange    = -10,
    }
}
```

**Module naming:**
- `Base` - Vanilla items and most mods
- Custom name - For organizational purposes

**Item naming:**
- Must be unique within the module
- Referenced as `"ModuleName.ItemName"` in Lua
- CamelCase convention (not enforced)

**Property syntax:**
- `PropertyName = Value,` (comma at end)
- No quotes around property names
- Values can be strings, numbers, or booleans
- Last property can omit comma

:p What is the basic syntax for defining an item in a script file?
??x
Items are defined inside a module block with property = value pairs.

**Syntax structure:**
```
module ModuleName          // Container for items
{
    item ItemName          // Individual item definition
    {
        PropertyName = Value,    // Properties (comma-separated)
        AnotherProp = Value,
        LastProp = Value,        // Last comma optional
    }
}
```

**Complete example:**
```
module Base                // Use Base for vanilla compatibility
{
    item EnergyBar        // Item identifier
    {
        Type = Food,              // Item category
        DisplayName = Energy Bar,  // Name shown to player
        Icon = EnergyBar,         // Icon file reference
        Weight = 0.1,             // Weight in kg
        HungerChange = -25,       // Reduces hunger by 25
    }
}
```

**Referencing in Lua:**
```lua
// Add to inventory
player:getInventory():AddItem("Base.EnergyBar")
                              // ↑         ↑
                              // Module   Item

// Check if player has it
if inventory:contains("Base.EnergyBar") then
    print("Has energy bar!")
end
```

**Multiple items:**
```
module Base {
    item Apple { Type = Food, }
    item Orange { Type = Food, }
    item Banana { Type = Food, }
}
```
x??

---

#### Item Types and Their Properties
Different item types have different available properties. Understanding which properties apply to which types is essential.

**Main types:**
```
Type = Normal    // Generic items (tools, materials)
Type = Food      // Consumable food items
Type = Weapon    // Melee/ranged weapons
Type = Drainable // Items with charges (batteries, lighters)
Type = Clothing  // Wearable items
```

**Type-specific properties:**

**Food properties:**
```
HungerChange     = -20,    // Hunger reduction (negative = fills)
ThirstChange     = 5,      // Thirst change
Calories         = 200,
DaysFresh        = 7,      // Days until spoils
DaysTotallyRotten = 14,
Boredom          = -10,    // Mood effect
Poison           = false,
```

**Weapon properties:**
```
MinDamage        = 0.5,
MaxDamage        = 1.5,
MinRange         = 0.61,
MaxRange         = 1.5,
CriticalChance   = 10,
SwingTime        = 3.0,
Categories       = Blunt,
```

**Drainable properties:**
```
UseDelta         = 0.01,   // Usage per use
UseWhileEquipped = false,
```

:p What properties are specific to Food type items vs Weapon type items?
??x
Food and Weapon types have completely different property sets based on their purpose.

**Food type properties:**
```
item MyFood {
    Type = Food,

    // Nutrition
    HungerChange        = -25,     // Reduces hunger
    ThirstChange        = 5,       // Increases thirst
    Calories            = 200,
    Carbohydrates       = 40,
    Proteins            = 10,
    Lipids              = 5,

    // Spoilage
    DaysFresh           = 7,       // Freshness duration
    DaysTotallyRotten   = 14,      // Total shelf life

    // Effects
    Boredom             = -10,     // Mood changes
    Unhappiness         = -5,
    Poison              = false,   // Is poisonous?

    // Cooking
    IsCookable          = true,
    MinutesToCook       = 60,
}
```

**Weapon type properties:**
```
item MySword {
    Type = Weapon,

    // Damage
    MinDamage           = 1.0,     // Min damage per hit
    MaxDamage           = 2.5,     // Max damage per hit
    CriticalChance      = 15,      // % chance for crit
    CritDmgMultiplier   = 3,       // Crit damage multiplier

    // Range and Speed
    MinRange            = 0.61,
    MaxRange            = 1.5,
    SwingTime           = 3.0,     // Attack speed
    MinimumSwingTime    = 2.0,

    // Durability
    ConditionMax        = 15,
    ConditionLowerChanceOneIn = 5,

    // Classification
    Categories          = Blade,   // Blade, Blunt, Axe
    TwoHandWeapon       = false,
}
```

**Common to all types:**
```
DisplayName, Icon, Weight, DisplayCategory
```
x??

---

#### Recipe Definition Syntax
Recipes define how items can be crafted. They specify ingredients, results, time, and required skills.

**Basic structure:**
```
recipe RecipeName
{
    Ingredient1,
    Ingredient2=Count,

    Result:ItemName,
    Result:ItemName2=Count,

    Time:Minutes,
    Category:CategoryName,

    SkillRequired:Level,
}
```

**Real example:**
```
recipe Make Energy Bar
{
    // Ingredients (consumed)
    Peanuts,
    Honey,
    Oats=2,              // Requires 2 oats

    // Results (what you get)
    Result:EnergyBar,
    Result:EmptyJar,     // Can have multiple results

    // Recipe properties
    Time:60,             // Game time units
    Category:Cooking,    // Recipe category

    // Skill requirements
    Cooking:2,           // Requires Cooking level 2

    // Tools (not consumed)
    ToolUse:KitchenKnife,
}
```

**Multiple results:**
```
recipe Disassemble Radio
{
    Radio,

    Result:ElectricWire=2,
    Result:Scrap=3,
    Result:ElectronicsScrap,

    Time:50,
    Category:Electrical,
}
```

:p What is the syntax for creating a crafting recipe and how do you specify ingredients vs results?
??x
Recipes list ingredients directly, and results with the Result: prefix.

**Complete recipe syntax:**
```
recipe RecipeName
{
    // INGREDIENTS (consumed when crafting)
    ItemName,              // Requires 1
    ItemName=Count,        // Requires specific count

    // RESULTS (what you get)
    Result:ItemName,       // Produces 1
    Result:ItemName=Count, // Produces specific count

    // PROPERTIES
    Time:GameUnits,        // Crafting time
    Category:Name,         // UI category

    // SKILLS (optional)
    SkillName:Level,       // Required skill level

    // TOOLS (not consumed)
    ToolUse:ItemName,      // Requires tool
}
```

**Concrete example:**
```
recipe Craft Bandage
{
    // Need these (consumed)
    RippedSheets=2,
    Needle,
    Thread,

    // Get these (created)
    Result:Bandage=5,      // Makes 5 bandages

    // Takes 100 time units
    Time:100,

    // Shows in FirstAid category
    Category:FirstAid,

    // Needs Tailoring skill level 1
    Tailoring:1,

    // Requires scissors (not consumed)
    ToolUse:Scissors,
}
```

**Process:**
```
Player has: RippedSheets(2), Needle, Thread, Scissors
          ↓
Crafts recipe → Time:100 passes
          ↓
Consumes: RippedSheets(2), Needle, Thread
Keeps: Scissors (tool)
Gets: Bandage(5)
```
x??

---

#### Loot Distribution via ProceduralDistributions
Items are added to world containers using the ProceduralDistributions table. Understanding the distribution system is key to making items findable in the game world.

**Distribution pattern:**
```lua
-- Add item to a container type
table.insert(ProceduralDistributions.list["ContainerType"].items, "Base.ItemName")
table.insert(ProceduralDistributions.list["ContainerType"].items, Weight)
```

**Weight determines spawn chance:**
```lua
-- Higher weight = more common
table.insert(ProceduralDistributions.list["KitchenCounter"].items, "Base.Apple")
table.insert(ProceduralDistributions.list["KitchenCounter"].items, 10)  -- 10% weight

table.insert(ProceduralDistributions.list["KitchenCounter"].items, "Base.Knife")
table.insert(ProceduralDistributions.list["KitchenCounter"].items, 1)   -- 1% weight
// Apple is 10x more common than Knife
```

**Common container types:**
```lua
"KitchenCounter"
"FridgeGeneric"
"StoreShelfSnacks"
"ToolStoreTools"
"Medicine"
"CrateCanning"
"GigamartSnacks"
```

**Must be in server-side script:**
```lua
-- media/lua/server/MyDistribution.lua
function addLoot()
    table.insert(ProceduralDistributions.list["KitchenCounter"].items, "Base.EnergyBar")
    table.insert(ProceduralDistributions.list["KitchenCounter"].items, 5)
end

Events.OnGameStart.Add(addLoot)
```

:p How do you add a custom item to loot tables and what does the weight number mean?
??x
Use ProceduralDistributions.list with pairs of entries: item name and weight. Higher weight = more common.

**Pattern (always pairs):**
```lua
table.insert(ProceduralDistributions.list["ContainerType"].items, "ItemName")
table.insert(ProceduralDistributions.list["ContainerType"].items, Weight)
// ↑                                                                 ↑
// Item entry (string)                                       Weight entry (number)
```

**Complete example:**
```lua
-- media/lua/server/MyLoot.lua
require('Distributions')

function addCustomLoot()
    -- Add to kitchen counters (5% weight)
    table.insert(ProceduralDistributions.list["KitchenCounter"].items, "Base.EnergyBar")
    table.insert(ProceduralDistributions.list["KitchenCounter"].items, 5)

    -- Add to fridges (10% weight - more common)
    table.insert(ProceduralDistributions.list["FridgeGeneric"].items, "Base.EnergyBar")
    table.insert(ProceduralDistributions.list["FridgeGeneric"].items, 10)

    -- Add to stores (20% weight - very common)
    table.insert(ProceduralDistributions.list["StoreShelfSnacks"].items, "Base.EnergyBar")
    table.insert(ProceduralDistributions.list["StoreShelfSnacks"].items, 20)
end

Events.OnGameStart.Add(addCustomLoot)
```

**Weight interpretation:**
```
Weight 1   = Very rare
Weight 5   = Uncommon
Weight 10  = Common
Weight 20+ = Very common
```

**Important:**
- Always two inserts per item
- Must be in server/ folder
- Requires new game to take effect
x??

---

#### Item Icon/Texture Relationship
Item textures must follow a specific naming convention to be automatically matched with item definitions.

**The connection:**
```
// In script file
item MyApple {
    Icon = Apple,         // References the icon name
}

// Texture file must be named
media/textures/Item_Apple.png
              ↑     ↑
              prefix from Icon property
```

**Naming rule:** `Item_[IconName].png`

**Examples:**
```
Icon = Hammer          → Item_Hammer.png
Icon = EnergyBar       → Item_EnergyBar.png
Icon = CoolSword       → Item_CoolSword.png
Icon = My_Custom_Item  → Item_My_Custom_Item.png
```

**Common mistakes:**
```
❌ Hammer.png              (missing Item_ prefix)
❌ Item_Hammer.jpg         (wrong extension)
❌ item_hammer.png         (wrong capitalization)
❌ Item_ Hammer.png        (space in name)
✅ Item_Hammer.png         (correct)
```

**File location:**
```
MyMod/
└── media/
    ├── scripts/
    │   └── Items.txt      // Defines Icon = Hammer
    └── textures/
        └── Item_Hammer.png // Must match
```

:p What is the exact file naming convention for item textures and how does it relate to the Icon property?
??x
Texture files must be named `Item_[IconName].png` where IconName matches the Icon property exactly.

**The relationship:**

**Step 1: Define item**
```
// media/scripts/MyItems.txt
module Base {
    item EnergyBar {
        Icon = EnergyBar,     // <-- This value
        DisplayName = Energy Bar,
    }
}
```

**Step 2: Create texture**
```
File path: media/textures/Item_EnergyBar.png
                         ↑    ↑
                         |    Icon property value
                         Required prefix
```

**Step 3: Game loads automatically**
```
Game sees: Icon = EnergyBar
        ↓
Looks for: Item_EnergyBar.png
        ↓
In folder: media/textures/
        ↓
Full path: media/textures/Item_EnergyBar.png
```

**Exact requirements:**
```
✅ Item_Apple.png         // Icon = Apple
✅ Item_MyItem.png        // Icon = MyItem
✅ Item_Hammer.png        // Icon = Hammer

❌ Apple.png              // Missing "Item_"
❌ Item_Apple.jpg         // Must be .png
❌ Textures/Item_Apple.png // Must be in media/textures/
❌ Item_apple.png         // Case must match exactly
```

**If file not found:**
- Item shows purple/missing texture square
- Game still works, just no icon
- Check console for texture errors
x??

---

#### Item Properties - Shared vs Type-Specific
All items share common properties regardless of type, but each type has exclusive properties.

**Universal properties (all types):**
```
Type             // Item category
DisplayName      // Name shown to player
Icon             // Texture reference
Weight           // Item weight in kg
DisplayCategory  // Inventory tab
```

**Type-specific properties:**

**Only Food:**
```
HungerChange, ThirstChange, Calories
DaysFresh, DaysTotallyRotten
IsCookable, MinutesToCook
```

**Only Weapon:**
```
MinDamage, MaxDamage, CriticalChance
SwingTime, MinRange, MaxRange
Categories (Blunt, Blade, Axe)
```

**Only Clothing:**
```
BodyLocation, BloodLocation
ScratchDefense, BiteDefense
Insulation, WindResistance
```

**Only Drainable:**
```
UseDelta, UseWhileEquipped
```

**Trying to use wrong properties:**
```
// Compiles but has no effect
item MyFood {
    Type = Food,
    MinDamage = 10,      // Ignored! (weapon property)
}
```

:p What properties are shared by all item types vs type-specific?
??x
All items share basic properties, but damage/nutrition/etc are type-specific.

**Shared by ALL types:**
```
item AnyItem {
    Type            = Normal,      // Required
    DisplayName     = Item Name,   // Required
    Icon            = IconName,    // Required
    Weight          = 1.0,
    DisplayCategory = Category,
    Count           = 1,
    MetalValue      = 5,
    WoodValue       = 2,
}
```

**Food-specific (ONLY with Type = Food):**
```
item MyFood {
    Type = Food,                   // Enables these ↓

    HungerChange    = -20,
    ThirstChange    = 5,
    Calories        = 200,
    DaysFresh       = 7,
    Boredom         = -10,
}
```

**Weapon-specific (ONLY with Type = Weapon):**
```
item MySword {
    Type = Weapon,                 // Enables these ↓

    MinDamage       = 1.0,
    MaxDamage       = 2.5,
    CriticalChance  = 10,
    SwingTime       = 3.0,
    Categories      = Blade,
}
```

**Wrong usage (properties ignored):**
```
item Broken {
    Type = Normal,      // Just a normal item
    MinDamage = 10,     // ❌ Ignored (weapon property)
    HungerChange = -20, // ❌ Ignored (food property)
    Weight = 1.0,       // ✅ Works (universal)
}
```

**Rule:** Check item type before using specific properties.
x??
