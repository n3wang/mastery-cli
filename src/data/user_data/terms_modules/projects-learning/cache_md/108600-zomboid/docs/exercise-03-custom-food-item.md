# Exercise 3: Custom Food Item

## Objective

Create a custom food item with proper textures, item definition, and loot distribution. This exercise will teach you:
- How to create item definitions in script files
- How to add custom textures/icons
- How to add items to the loot distribution system
- How to create recipes
- Complete integration of Lua and script files

## Difficulty: Intermediate
**Estimated Time**: 45-60 minutes

---

## What You'll Build

A complete custom food item called "Energy Bar" that:
1. Has custom properties (hunger, calories, boredom reduction)
2. Has a custom icon/texture
3. Spawns in kitchen containers
4. Has a crafting recipe
5. Can be eaten by the player

---

## Step-by-Step Instructions

### Step 1: Create the Mod Directory

Create a new mod folder:

```
C:\Users\[YourUsername]\Zomboid\mods\EnergyBarMod\
```

### Step 2: Create mod.info

Create `mod.info`:

```
name=Energy Bar Mod
id=energybar
description=Adds a nutritious energy bar that reduces hunger and boredom. Can be crafted or found in kitchens.
modversion=1.0.0
```

### Step 3: Create Full Directory Structure

Create this complete structure:

```
EnergyBarMod/
├── mod.info
└── media/
    ├── lua/
    │   ├── client/
    │   └── server/
    ├── scripts/
    └── textures/
```

**Windows:**
```cmd
cd C:\Users\[YourUsername]\Zomboid\mods\EnergyBarMod
mkdir media\lua\client
mkdir media\lua\server
mkdir media\scripts
mkdir media\textures
```

**Linux/Mac:**
```bash
cd ~/Zomboid/mods/EnergyBarMod
mkdir -p media/lua/client media/lua/server media/scripts media/textures
```

---

## Part 1: Create the Item Definition

### Step 4: Create the Item Script File

Create `media/scripts/EnergyBar_Items.txt`:

```
module Base
{
    /********** ENERGY BAR **********/

    item EnergyBar
    {
        Type                = Food,
        DisplayName         = Energy Bar,
        Icon                = EnergyBar,
        Weight              = 0.1,
        DisplayCategory     = Food,

        # Nutrition values
        HungerChange        = -25,
        ThirstChange        = 5,
        Calories            = 250,
        Carbohydrates       = 40,
        Proteins            = 10,
        Lipids              = 8,

        # Mood effects
        Boredom             = -15,
        Unhappiness         = -10,

        # Freshness
        DaysFresh           = 180,        # Energy bars last 6 months
        DaysTotallyRotten   = 365,

        # Other properties
        IsCookable          = false,
        CustomContextMenu   = Eat,
        CustomEatSound      = EatChips,   # Crunchy sound
        Packaged            = true,       # Pre-packaged food
    }

    /********** ENERGY BAR WRAPPER (TRASH) **********/

    item EnergyBarWrapper
    {
        Type                = Normal,
        DisplayName         = Energy Bar Wrapper,
        Icon                = Wrapper,
        Weight              = 0.01,
    }
}
```

**Explanation of Properties:**

- `Type = Food`: Makes it consumable
- `HungerChange = -25`: Reduces hunger by 25 points (negative = fills hunger)
- `ThirstChange = 5`: Increases thirst slightly
- `Boredom = -15`: Reduces boredom when eaten
- `DaysFresh = 180`: Lasts 180 in-game days before spoiling
- `Packaged = true`: Indicates it's pre-packaged (won't spoil as fast)

### Step 5: Create a Crafting Recipe

Add to `media/scripts/EnergyBar_Items.txt` (before the closing brace):

```
    /********** RECIPES **********/

    recipe Make Energy Bar
    {
        # Ingredients
        Peanuts,
        Honey,
        Oats,

        # Result
        Result: EnergyBar,

        # Properties
        Time: 60,
        Category: Cooking,

        # Skills
        OnGiveXP: Recipe.OnGiveXP.CookOvenBaked10,
    }

    # Optional: disassemble to get ingredients back
    recipe Unwrap Energy Bar
    {
        EnergyBar,

        Result: Oats,
        Result: EnergyBarWrapper,

        Time: 10,
        Category: Cooking,
    }
}
```

---

## Part 2: Create the Texture

### Step 6: Create or Download an Icon

You need a 32x32 or 64x64 PNG image for the icon.

**Option A: Use a Placeholder**

Create a simple colored square using any image editor:
1. Create a 64x64 image
2. Fill it with a color (e.g., brown for the energy bar)
3. Save as `Item_EnergyBar.png`

**Option B: Find/Create a Real Icon**

You can use free resources or pixel art tools to create a better icon.

**Important Naming Convention:**
- The file MUST be named: `Item_EnergyBar.png`
- The prefix `Item_` is required
- The rest matches the `Icon` property in the script (`EnergyBar`)

Save this file to: `media/textures/Item_EnergyBar.png`

If you also want a wrapper icon, create `Item_Wrapper.png`.

---

## Part 3: Loot Distribution (Server-Side)

### Step 7: Add Items to Loot Tables

Create `media/lua/server/EnergyBar_Distribution.lua`:

```lua
-- EnergyBar_Distribution.lua
-- Adds Energy Bars to loot tables so they spawn in the world

require('Distributions')

-- This function adds our items to various containers
local function addEnergyBarDistribution()

    -- Add to kitchen counters
    table.insert(ProceduralDistributions.list["KitchenCounter"].items, "Base.EnergyBar")
    table.insert(ProceduralDistributions.list["KitchenCounter"].items, 1)  -- 1% chance

    -- Add to fridge
    table.insert(ProceduralDistributions.list["FridgeGeneric"].items, "Base.EnergyBar")
    table.insert(ProceduralDistributions.list["FridgeGeneric"].items, 2)  -- 2% chance

    -- Add to pantries
    table.insert(ProceduralDistributions.list["CrateCanning"].items, "Base.EnergyBar")
    table.insert(ProceduralDistributions.list["CrateCanning"].items, 5)  -- 5% chance

    -- Add to vending machines
    table.insert(ProceduralDistributions.list["StoreShelfSnacks"].items, "Base.EnergyBar")
    table.insert(ProceduralDistributions.list["StoreShelfSnacks"].items, 8)  -- 8% chance

    -- Add to gas station shelves
    table.insert(ProceduralDistributions.list["GigamartSnacks"].items, "Base.EnergyBar")
    table.insert(ProceduralDistributions.list["GigamartSnacks"].items, 10)  -- 10% chance

    print("[EnergyBar] Loot distribution added!")
end

-- Register the distribution when game starts
Events.OnGameStart.Add(addEnergyBarDistribution)
```

**Understanding Loot Distribution:**

Each pair of entries adds the item to a loot table:
1. First entry: the item ID (`"Base.EnergyBar"`)
2. Second entry: the spawn weight (higher = more common)

Common loot table names:
- `KitchenCounter`
- `FridgeGeneric`
- `StoreShelfSnacks`
- `GigamartSnacks`
- `CrateCanning`
- `Medicine`
- `ToolStoreTools`

---

## Part 4: Client-Side Features (Optional)

### Step 8: Add Context Menu Actions

Create `media/lua/client/EnergyBar_ContextMenu.lua`:

```lua
-- EnergyBar_ContextMenu.lua
-- Adds custom context menu options for Energy Bars

EnergyBarMod = EnergyBarMod or {}

-- Function to check if item is an energy bar
function EnergyBarMod.isEnergyBar(item)
    return item:getFullType() == "Base.EnergyBar"
end

-- Function to inspect the energy bar
function EnergyBarMod.inspectEnergyBar(item, player)
    local nutrition = "High in carbs and protein!"
    local expiry = "Best before: " .. (item:getAge() or 0) .. " / 180 days"

    player:Say("This energy bar looks good. " .. nutrition)
    print("[EnergyBar] " .. expiry)
end

-- Add custom context menu option
function EnergyBarMod.createMenu(player, context, items)
    -- items is an array, check if any are energy bars
    for i, item in ipairs(items) do
        local actualItem = item

        -- Handle instanceof check
        if not instanceof(item, "InventoryItem") then
            actualItem = item.items[1]
        end

        if EnergyBarMod.isEnergyBar(actualItem) then
            -- Add the "Inspect" option
            context:addOption("Inspect Energy Bar", actualItem, EnergyBarMod.inspectEnergyBar, player)
            break  -- Only add once
        end
    end
end

-- Register menu event
Events.OnFillInventoryObjectContextMenu.Add(EnergyBarMod.createMenu)

print("[EnergyBar] Context menu loaded!")
```

---

## Part 5: Initialization and Info

### Step 9: Add Initialization Script

Create `media/lua/client/EnergyBar_Init.lua`:

```lua
-- EnergyBar_Init.lua
-- Initialize the Energy Bar mod

EnergyBarMod = EnergyBarMod or {}

function EnergyBarMod.init()
    print("=====================================")
    print("Energy Bar Mod v1.0.0")
    print("Custom food item loaded successfully!")
    print("=====================================")

    -- Debug: Give player an energy bar (optional - comment out for release)
    -- local player = getPlayer()
    -- player:getInventory():AddItem("Base.EnergyBar")
    -- print("[EnergyBar] DEBUG: Gave player an energy bar")
end

Events.OnGameStart.Add(EnergyBarMod.init)
```

---

## Complete File Structure

Your mod should now look like this:

```
EnergyBarMod/
├── mod.info
└── media/
    ├── lua/
    │   ├── client/
    │   │   ├── EnergyBar_Init.lua
    │   │   └── EnergyBar_ContextMenu.lua
    │   └── server/
    │       └── EnergyBar_Distribution.lua
    ├── scripts/
    │   └── EnergyBar_Items.txt
    └── textures/
        └── Item_EnergyBar.png
```

---

## Testing Your Mod

### Step 1: Install and Enable

1. Copy `EnergyBarMod` to your Zomboid mods folder
2. Launch Project Zomboid
3. Enable the mod from the **Mods** menu
4. Start a **new game** (important for loot distribution)

### Step 2: Test Item in Debug Mode

1. Enable **Debug Mode** in options
2. In-game, press `~` to open console
3. Type: `lua player:getInventory():AddItem("Base.EnergyBar")`
4. Press Enter
5. Check your inventory - you should have an Energy Bar!

### Step 3: Test Eating

1. Right-click the Energy Bar in your inventory
2. Select **Eat**
3. Your hunger should decrease by 25
4. Your boredom and unhappiness should decrease

### Step 4: Test Loot Spawning

1. Start a **new game** (required for distribution to work)
2. Search kitchen counters, fridges, and stores
3. You should occasionally find Energy Bars

### Step 5: Test Recipe (If You Have Ingredients)

1. Get Peanuts, Honey, and Oats
2. Right-click in inventory
3. Select **Craft** → **Cooking** → **Make Energy Bar**
4. The recipe should appear if you have all ingredients

---

## Expected Behavior

✅ Item appears in inventory with custom icon
✅ Item can be eaten
✅ Eating reduces hunger, boredom, unhappiness
✅ Item spawns in appropriate containers
✅ Recipe appears when you have ingredients
✅ Context menu "Inspect Energy Bar" option appears

---

## Troubleshooting

### Item Doesn't Appear in Debug

**Check:**
- Script file is in `media/scripts/`
- Script file ends with `.txt`
- Item name matches exactly: `Base.EnergyBar`
- No syntax errors in the script file

### No Icon Shows

**Check:**
- Texture file is named `Item_EnergyBar.png` exactly
- File is in `media/textures/`
- Icon property in script matches: `Icon = EnergyBar,`

### Item Doesn't Spawn in World

**Check:**
- Started a **new game** after enabling mod
- Distribution file is in `media/lua/server/`
- Check console for "[EnergyBar] Loot distribution added!"

### Recipe Doesn't Appear

**Check:**
- You have all three ingredients (Peanuts, Honey, Oats)
- Recipe syntax is correct in script file
- Item names are spelled correctly

### Eating Doesn't Reduce Hunger

**Check:**
- `HungerChange` is negative (e.g., `-25`)
- `Type = Food` is set
- Item is actually being consumed (should disappear)

---

## Challenges (Optional)

### Challenge 1: Create Variations

Create different flavors:

```
item EnergyBarChocolate
{
    Type                = Food,
    DisplayName         = Chocolate Energy Bar,
    Icon                = EnergyBarChocolate,
    # ... same properties but different values
    Boredom             = -20,  # Chocolate tastes better!
}
```

### Challenge 2: Add Sound Effects

```lua
-- In the context menu, play a sound
function EnergyBarMod.inspectEnergyBar(item, player)
    player:getEmitter():playSound("EatChips")
    player:Say("This energy bar looks good!")
end
```

### Challenge 3: Stale Energy Bars

Make very old energy bars less effective:

```lua
-- Override the eating behavior
function EnergyBarMod.onEat(food, player)
    if food:getFullType() == "Base.EnergyBar" then
        local age = food:getAge() or 0
        if age > 180 then  -- Over 6 months old
            player:Say("This tastes stale...")
            -- Maybe add negative effects
        end
    end
end

Events.OnEat.Add(EnergyBarMod.onEat)
```

### Challenge 4: Caffeinated Version

Create a version that reduces fatigue:

```
item EnergyBarCaffeine
{
    Type                = Food,
    DisplayName         = Caffeinated Energy Bar,
    # ... other properties
    Fatigue             = -20,  # Reduces tiredness
}
```

Then in Lua, prevent sleeping for a while:

```lua
function EnergyBarMod.onEatCaffeine(food, player)
    if food:getFullType() == "Base.EnergyBarCaffeine" then
        -- Prevent sleep for 2 hours
        player:setAsleepTime(0)
        player:Say("I feel energized!")
    end
end

Events.OnEat.Add(EnergyBarMod.onEatCaffeine)
```

---

## What You Learned

- ✅ How to create item definitions in script files
- ✅ How to add custom textures/icons
- ✅ How to configure food properties (nutrition, freshness)
- ✅ How to create crafting recipes
- ✅ How to add items to loot distribution tables
- ✅ How to use server-side vs client-side scripts
- ✅ How to create context menu options
- ✅ How to test items using debug mode
- ✅ The complete workflow for creating custom content

---

## Going Further

Now that you can create items, you can:

1. **Create weapons**: Use `Type = Weapon` and damage properties
2. **Create tools**: Add durability and special uses
3. **Create clothing**: Add protection and body locations
4. **Create containers**: Make backpacks or storage items
5. **Create medical items**: Add healing properties

Explore the existing mods in your workshop folder for more examples!

---

## Additional Resources

- Check `C:\Program Files (x86)\Steam\steamapps\common\ProjectZomboid\media\scripts\` for vanilla item examples
- Look at other mods' script files for inspiration
- Use the **Item Definitions Guide** for complete property references
- Read the **Lua Scripting Guide** for more advanced Lua patterns
