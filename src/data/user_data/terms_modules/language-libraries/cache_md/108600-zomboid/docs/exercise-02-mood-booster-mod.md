# Exercise 2: Mood Booster Mod

## Objective

Create a mod that improves player mood while they are indoors. This exercise will teach you:
- How to read player stats
- How to modify player body damage (stats)
- How to use timed events
- How to check player environment
- Best practices for stat modification

## Difficulty: Beginner-Intermediate
**Estimated Time**: 30-45 minutes

---

## What You'll Build

A mod that:
1. Reduces player boredom and unhappiness while indoors
2. Runs every 10 in-game minutes
3. Checks if the player is in a building
4. Displays debug messages showing the stat changes

---

## Concept

Being indoors in a safe space should help reduce stress and boredom. This mod makes indoor locations more beneficial for player mental health.

---

## Step-by-Step Instructions

### Step 1: Create the Mod Directory

Navigate to your Project Zomboid mods folder and create a new mod:

```
C:\Users\[YourUsername]\Zomboid\mods\MoodBoosterMod\
```

### Step 2: Create mod.info

Create `mod.info` in the root of your mod folder:

```
name=Mood Booster
id=moodbooster
description=Reduces boredom and unhappiness while indoors. Being inside is comforting!
modversion=1.0.0
```

### Step 3: Create Directory Structure

Create the following structure:

```
MoodBoosterMod/
├── mod.info
└── media/
    └── lua/
        └── client/
```

### Step 4: Create the Main Lua Script

Create `media/lua/client/MoodBooster.lua`:

```lua
-- MoodBooster.lua
-- Reduces boredom and unhappiness while player is indoors

-- Create a namespace for our mod
MoodBooster = MoodBooster or {}

-- Configuration values
MoodBooster.config = {
    boredomReduction = 2.0,        -- Amount to reduce boredom each tick
    unhappinessReduction = 1.5,    -- Amount to reduce unhappiness each tick
    debugMode = true,              -- Show debug messages
}

-- Function to check if player is indoors
function MoodBooster.isPlayerIndoors(player)
    local square = player:getSquare()

    if not square then
        return false
    end

    -- Check if the square has a roof
    local hasRoof = square:haveRoof()

    -- Check if player is inside a building
    local isInside = square:isInside()

    -- Both conditions should be true for being properly indoors
    return hasRoof and isInside
end

-- Main function that boosts mood
function MoodBooster.boostMood()
    -- Loop through all active players (supports multiplayer)
    for i = 0, getNumActivePlayers() - 1 do
        local player = getSpecificPlayer(i)

        -- Safety checks
        if not player then
            goto continue
        end

        if not player:isAlive() then
            goto continue
        end

        -- Check if player is indoors
        if not MoodBooster.isPlayerIndoors(player) then
            if MoodBooster.config.debugMode then
                print("[MoodBooster] Player is outdoors - no mood boost")
            end
            goto continue
        end

        -- Get player's body damage (where stats are stored)
        local bodyDamage = player:getBodyDamage()

        -- Get current boredom level
        local currentBoredom = bodyDamage:getBoredomLevel()
        if currentBoredom > 0 then
            local newBoredom = currentBoredom - MoodBooster.config.boredomReduction
            -- Don't let it go below 0
            if newBoredom < 0 then
                newBoredom = 0
            end
            bodyDamage:setBoredomLevel(newBoredom)

            if MoodBooster.config.debugMode then
                print(string.format("[MoodBooster] Boredom: %.1f -> %.1f", currentBoredom, newBoredom))
            end
        end

        -- Get current unhappiness level
        local currentUnhappiness = bodyDamage:getUnhappynessLevel()
        if currentUnhappiness > 0 then
            local newUnhappiness = currentUnhappiness - MoodBooster.config.unhappinessReduction
            -- Don't let it go below 0
            if newUnhappiness < 0 then
                newUnhappiness = 0
            end
            bodyDamage:setUnhappynessLevel(newUnhappiness)

            if MoodBooster.config.debugMode then
                print(string.format("[MoodBooster] Unhappiness: %.1f -> %.1f", currentUnhappiness, newUnhappiness))
            end
        end

        ::continue::
    end
end

-- Initialize the mod
function MoodBooster.init()
    print("=================================")
    print("Mood Booster Mod Loaded!")
    print("Boredom Reduction: " .. MoodBooster.config.boredomReduction)
    print("Unhappiness Reduction: " .. MoodBooster.config.unhappinessReduction)
    print("=================================")
end

-- Register events
Events.OnGameStart.Add(MoodBooster.init)
Events.EveryTenMinutes.Add(MoodBooster.boostMood)
```

---

## Understanding the Code

### Namespace Pattern

```lua
MoodBooster = MoodBooster or {}
```

This creates a unique namespace to avoid conflicts with other mods. It's like saying "create MoodBooster if it doesn't exist, otherwise use the existing one."

### Configuration Table

```lua
MoodBooster.config = {
    boredomReduction = 2.0,
    unhappinessReduction = 1.5,
    debugMode = true,
}
```

Storing config in a table makes it easy to adjust values without searching through code.

### Checking If Player Is Indoors

```lua
local hasRoof = square:haveRoof()
local isInside = square:isInside()
return hasRoof and isInside
```

We check both conditions to ensure the player is truly indoors.

### Safety Checks

```lua
if not player then
    goto continue
end
```

Always check that objects exist before using them. The `goto continue` skips to the next player in multiplayer.

### Modifying Stats

```lua
local bodyDamage = player:getBodyDamage()
local currentBoredom = bodyDamage:getBoredomLevel()
bodyDamage:setBoredomLevel(newBoredom)
```

Stats are accessed through the BodyDamage object.

### String Formatting

```lua
print(string.format("[MoodBooster] Boredom: %.1f -> %.1f", currentBoredom, newBoredom))
```

`string.format()` creates nicely formatted output. `%.1f` means "floating-point number with 1 decimal place."

---

## Testing Your Mod

### Step 1: Install the Mod

1. Copy your `MoodBoosterMod` folder to the Zomboid mods directory
2. Launch Project Zomboid
3. Enable the mod from the **Mods** menu
4. Start a new game with **Debug Mode** enabled

### Step 2: Test Indoors vs Outdoors

1. Start a new game
2. Open console with `~` key
3. Wait in a house for 10 in-game minutes
4. Check console for mood boost messages
5. Go outside and wait 10 more minutes
6. You should see "Player is outdoors - no mood boost"

### Step 3: Check Stats

1. Press **Player Stats** button (or check your moodles)
2. Notice boredom and unhappiness should decrease faster indoors

---

## Expected Output

**When Indoors:**
```
[MoodBooster] Boredom: 45.0 -> 43.0
[MoodBooster] Unhappiness: 30.0 -> 28.5
```

**When Outdoors:**
```
[MoodBooster] Player is outdoors - no mood boost
```

---

## Troubleshooting

### Stats Aren't Changing

- Make sure you're actually indoors (in a building with a roof)
- Check that Debug Mode is enabled to see messages
- Verify the mod is enabled in the mod manager
- Wait at least 10 in-game minutes (speed up time with debug options)

### Too Much/Too Little Reduction

Adjust the config values:
```lua
MoodBooster.config = {
    boredomReduction = 0.5,        -- Smaller reduction
    unhappinessReduction = 0.25,
    debugMode = true,
}
```

### Console Spam

If you're getting too many messages, turn off debug mode:
```lua
debugMode = false,
```

Or only print when changes are significant:
```lua
if currentBoredom > 5 and MoodBooster.config.debugMode then
    print(...)
end
```

---

## Challenges (Optional)

### Challenge 1: Sleep Bonus

Add an even bigger bonus while sleeping:

```lua
function MoodBooster.boostMood()
    for i = 0, getNumActivePlayers() - 1 do
        local player = getSpecificPlayer(i)

        if not player or not player:isAlive() then
            goto continue
        end

        local multiplier = 1.0

        -- Double the bonus if sleeping
        if player:isAsleep() then
            multiplier = 2.0
            if MoodBooster.config.debugMode then
                print("[MoodBooster] Player is sleeping - bonus doubled!")
            end
        end

        -- Rest of the code, multiply reductions by multiplier
        local reduction = MoodBooster.config.boredomReduction * multiplier

        ::continue::
    end
end
```

### Challenge 2: Safe House Bonus

Give extra bonuses if the player is in their safe house:

```lua
-- Check if building is player's safe house
local building = square:getBuilding()
if building then
    local def = building:getDef()
    if def:isPlayerSafehouse() then
        multiplier = multiplier * 1.5
        if MoodBooster.config.debugMode then
            print("[MoodBooster] In safehouse - bonus increased!")
        end
    end
end
```

### Challenge 3: Add Sandbox Options

Create `media/sandbox-options.txt`:

```txt
VERSION = 1,

option MoodBooster.BoredomReduction
{
    type = double, min = 0.0, max = 10.0, default = 2.0,
    page = MoodBooster, translation = MoodBooster_BoredomReduction,
}

option MoodBooster.UnhappinessReduction
{
    type = double, min = 0.0, max = 10.0, default = 1.5,
    page = MoodBooster, translation = MoodBooster_UnhappinessReduction,
}
```

Then read them in Lua:

```lua
function MoodBooster.init()
    MoodBooster.config.boredomReduction = SandboxVars.MoodBooster.BoredomReduction or 2.0
    MoodBooster.config.unhappinessReduction = SandboxVars.MoodBooster.UnhappinessReduction or 1.5

    print("Mood Booster configured from sandbox options!")
end
```

### Challenge 4: Visual Feedback

Make the player say something when they feel better:

```lua
-- Add this variable at the top of the file
MoodBooster.lastMessageTime = 0

-- In the boostMood function, after reducing stats:
local currentTime = getGameTime():getWorldAgeHours()
if currentTime - MoodBooster.lastMessageTime > 1 then  -- Once per hour
    player:Say("Being inside feels nice...")
    MoodBooster.lastMessageTime = currentTime
end
```

---

## What You Learned

- ✅ How to read player stats (boredom, unhappiness)
- ✅ How to modify player stats safely
- ✅ How to use the EveryTenMinutes event
- ✅ How to check player environment (indoors/outdoors)
- ✅ How to create a configuration system
- ✅ How to use namespaces to organize code
- ✅ How to format debug output
- ✅ How to handle multiple players (multiplayer-safe code)

---

## Next Steps

You now understand how to:
- Modify game state
- Use timed events
- Query the game world

Next, try **Exercise 3** to learn how to:
- Create custom items
- Define items in script files
- Add items to loot tables
