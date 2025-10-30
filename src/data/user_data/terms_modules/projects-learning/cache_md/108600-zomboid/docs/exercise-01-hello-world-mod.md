# Exercise 1: Hello World Mod

## Objective

Create your first Project Zomboid mod that displays a welcome message when the game starts. This exercise will teach you:
- Basic mod structure
- How to create a `mod.info` file
- How to write simple Lua scripts
- How to use game events

## Difficulty: Beginner
**Estimated Time**: 15-20 minutes

---

## What You'll Build

A simple mod that:
1. Prints a message to the console when the game starts
2. Makes the player say "Hello, Project Zomboid!" when spawned
3. Shows your mod in the mod manager

---

## Step-by-Step Instructions

### Step 1: Create the Mod Directory

Navigate to your Project Zomboid mods folder:
- **Windows**: `C:\Users\[YourUsername]\Zomboid\mods\`
- **Linux**: `~/.local/share/Zomboid/mods/`
- **Mac**: `~/Library/Application Support/Zomboid/mods/`

Create a new folder called `HelloWorldMod`:

```
C:\Users\[YourUsername]\Zomboid\mods\HelloWorldMod\
```

### Step 2: Create the mod.info File

Inside `HelloWorldMod`, create a file named `mod.info` with the following content:

```
name=Hello World Mod
id=helloworld
description=My first Project Zomboid mod! Displays a welcome message.
poster=poster.png
```

**Explanation:**
- `name`: The display name shown in the mod manager
- `id`: A unique identifier (lowercase, no spaces)
- `description`: What your mod does
- `poster`: Reference to a poster image (we'll skip creating an actual image for now)

### Step 3: Create the Media Directory Structure

Inside `HelloWorldMod`, create this folder structure:

```
HelloWorldMod/
├── mod.info
└── media/
    └── lua/
        └── client/
```

You can do this from command line:

**Windows:**
```cmd
cd C:\Users\[YourUsername]\Zomboid\mods\HelloWorldMod
mkdir media\lua\client
```

**Linux/Mac:**
```bash
cd ~/Zomboid/mods/HelloWorldMod  # or appropriate path
mkdir -p media/lua/client
```

### Step 4: Create Your First Lua Script

Inside `media/lua/client/`, create a file named `HelloWorld.lua` with this content:

```lua
-- HelloWorld.lua
-- My first Project Zomboid mod!

print("================================")
print("Hello World Mod has loaded!")
print("================================")

-- Function that runs when the game starts
local function onGameStart()
    print("[HelloWorld] Game has started!")
end

-- Function that runs when a player is created
local function onPlayerCreate(playerNum, player)
    print("[HelloWorld] Player " .. playerNum .. " has been created!")

    -- Make the player say something
    player:Say("Hello, Project Zomboid!")
end

-- Register our functions to game events
Events.OnGameStart.Add(onGameStart)
Events.OnCreatePlayer.Add(onPlayerCreate)
```

**Explanation:**

- `print()`: Outputs text to the game console (visible in debug mode)
- `function onGameStart()`: Defines a function that will run when the game starts
- `Events.OnGameStart.Add()`: Registers our function to be called when the OnGameStart event fires
- `Events.OnCreatePlayer.Add()`: Registers a function for when a player is created
- `player:Say()`: Makes the player character speak a message in-game

### Step 5: Complete Directory Structure

Your mod should now look like this:

```
HelloWorldMod/
├── mod.info
└── media/
    └── lua/
        └── client/
            └── HelloWorld.lua
```

---

## Testing Your Mod

### 1. Enable Debug Mode

Before testing, enable debug mode in Project Zomboid:

1. Launch Project Zomboid
2. Go to **Options** → **Display**
3. Enable **Debug Mode**
4. Restart the game

### 2. Enable Your Mod

1. From the main menu, click **Mods**
2. Find "Hello World Mod" in the list
3. Double-click it to enable it (it should move to the right panel)
4. Click **Done**

### 3. Test the Mod

1. Start a **New Game**
2. Once in-game, press `~` (tilde key) to open the console
3. You should see output like:

```
================================
Hello World Mod has loaded!
================================
[HelloWorld] Game has started!
[HelloWorld] Player 0 has been created!
```

4. Your character should also say "Hello, Project Zomboid!" (look for the speech bubble)

---

## Expected Output

**Console Output:**
```
================================
Hello World Mod has loaded!
================================
[HelloWorld] Game has started!
[HelloWorld] Player 0 has been created!
```

**In-Game:**
- Speech bubble above player saying "Hello, Project Zomboid!"

---

## Troubleshooting

### Mod Doesn't Appear in Mod Manager

- Check that `mod.info` is in the root of your mod folder
- Verify the folder is in the correct mods directory
- Restart Project Zomboid

### Console Messages Don't Appear

- Make sure Debug Mode is enabled
- Press `~` to open the console
- Check that your Lua file is in `media/lua/client/`

### Syntax Errors

- Check for typos in your Lua file
- Make sure you have matching parentheses and quotes
- Lua is case-sensitive: `Events` is not the same as `events`

### Player Doesn't Say Anything

- The message might appear very briefly
- Make sure you enabled the mod before starting a new game
- Try adding more logging: `print("About to make player say hello")`

---

## Challenges (Optional)

Once you have the basic mod working, try these modifications:

### Challenge 1: Add More Messages
Make the player say different things at different times:

```lua
local function onEveryHour()
    local player = getPlayer()
    player:Say("An hour has passed!")
end

Events.EveryHours.Add(onEveryHour)
```

### Challenge 2: Personalized Greeting
Get the player's name and use it in the greeting:

```lua
local function onPlayerCreate(playerNum, player)
    local playerName = player:getUsername()
    player:Say("Hello, " .. playerName .. "!")
end

Events.OnCreatePlayer.Add(onPlayerCreate)
```

### Challenge 3: Count Player Updates
Count how many times the player updates (moves):

```lua
local updateCount = 0

local function onPlayerUpdate(player)
    updateCount = updateCount + 1

    -- Print every 1000 updates to avoid spam
    if updateCount % 1000 == 0 then
        print("[HelloWorld] Player has been updated " .. updateCount .. " times")
    end
end

Events.OnPlayerUpdate.Add(onPlayerUpdate)
```

---

## What You Learned

- ✅ How to create a basic mod structure
- ✅ How to write a `mod.info` file
- ✅ How to create Lua scripts in the correct directory
- ✅ How to use the Event system
- ✅ How to print debug messages
- ✅ How to make the player speak
- ✅ How to enable and test mods

---

## Next Steps

Now that you understand the basics, move on to:
- **Exercise 2**: Create a mod that modifies player stats
- **Exercise 3**: Create a custom item

These exercises will build on what you've learned and introduce new concepts like modifying game state and creating content.
