# Project Zomboid Mod Architecture

## Overview

Project Zomboid mods follow a specific directory structure and use a combination of Lua scripting, item definitions, and metadata files. This guide explains the core architecture patterns you'll encounter when developing mods.

## Directory Structure

Every Project Zomboid mod follows this basic structure:

```
MyModName/
├── mod.info                    # Mod metadata (required)
├── poster.png                  # Promotional image (512x512+)
├── icon.png                    # Small icon (64x64 or 128x128)
└── media/                      # All mod content goes here
    ├── lua/                    # Lua scripts
    │   ├── client/            # Client-side code only
    │   ├── server/            # Server-side code only
    │   └── shared/            # Code shared between client/server
    ├── scripts/               # Item/recipe definitions
    ├── textures/              # Visual assets
    ├── sound/                 # Audio files
    ├── ui/                    # UI elements
    └── sandbox-options.txt    # Configurable settings
```

## The Three Core Components

### 1. mod.info (Metadata)

The `mod.info` file is the entry point for your mod. It tells Project Zomboid:
- What your mod is called
- What its unique ID is
- What game versions it supports
- What resources it needs

**Required Fields:**
```
name=My Mod Name           # Display name shown to players
id=mymodname              # Unique identifier (lowercase, no spaces)
description=What the mod does
```

**Common Optional Fields:**
```
authors=YourName
poster=poster.png
icon=icon.png
modversion=1.0.0
versionMin=41.73          # Minimum game version
versionMax=41.78          # Maximum game version
url=https://github.com/...
pack=mytextures           # Texture pack name
tiledef=mytiles 100       # Tile definition reference
```

### 2. Lua Scripts (Logic)

Lua scripts contain all the behavioral code for your mod. Project Zomboid uses an event-driven architecture.

**Key Concepts:**

#### Client vs Server vs Shared

- **client/**: Runs only on the player's computer
  - UI modifications
  - Visual effects
  - Player-specific interactions
  - Local sound effects

- **server/**: Runs only on the game server (including single-player)
  - Game mechanics
  - World state changes
  - Multiplayer synchronization
  - Spawn logic

- **shared/**: Runs on both client and server
  - Utility functions
  - Data structures
  - Constants
  - Common calculations

#### Event-Driven Architecture

Project Zomboid uses events instead of continuous loops. You register functions to be called when specific events occur:

```lua
-- Define a function
function onPlayerSpawn()
    print("Player has spawned!")
end

-- Register it to an event
Events.OnCreatePlayer.Add(onPlayerSpawn)
```

**Common Event Categories:**

- **Game Lifecycle**: OnGameBoot, OnGameStart, OnLoad, OnSave
- **Player Events**: OnCreatePlayer, OnPlayerUpdate, OnPlayerDeath
- **Time Events**: EveryTenMinutes, EveryHours, EveryDays, OnTick
- **UI Events**: OnFillInventoryObjectContextMenu, OnFillWorldObjectContextMenu
- **World Events**: OnFillContainer, OnZombieUpdate, OnObjectAdded

### 3. Scripts (Data Definitions)

Script files (.txt) define items, recipes, and other game objects using a declarative syntax.

**Example Item Definition:**
```
module Base
{
    item MyCustomItem
    {
        Type            = Normal,
        DisplayName     = My Custom Item,
        Icon            = MyItemIcon,
        Weight          = 0.5,
        DisplayCategory = Crafted,
    }
}
```

**Common Item Properties:**
- `Type`: Normal, Food, Weapon, Drainable
- `DisplayName`: Name shown to players
- `Icon`: Image file name (from textures/)
- `Weight`: Item weight
- `DisplayCategory`: Inventory category
- `Count`: Stack size
- `MetalValue`, `WoodValue`: Crafting components

## Architecture Patterns

### Pattern 1: Namespace Pattern

Always use a unique namespace to avoid conflicts with other mods:

```lua
-- Bad: Global pollution
function doSomething()
    -- ...
end

-- Good: Namespaced
MyMod = MyMod or {}

MyMod.doSomething = function()
    -- ...
end
```

### Pattern 2: Mod Data Storage

Use ModData for persistent player-specific data:

```lua
function savePlayerData(player)
    local modData = player:getModData()
    modData.MyMod = modData.MyMod or {}
    modData.MyMod.score = 100
end

function loadPlayerData(player)
    local modData = player:getModData()
    local score = modData.MyMod and modData.MyMod.score or 0
    return score
end
```

### Pattern 3: Context Menu Extension

Add custom actions to right-click menus:

```lua
local function onInventoryMenu(player, context, items)
    if items and #items > 0 then
        context:addOption("My Action", items, MyMod.doAction)
    end
end

Events.OnFillInventoryObjectContextMenu.Add(onInventoryMenu)
```

### Pattern 4: Initialization

Properly initialize your mod when the game starts:

```lua
MyMod = MyMod or {}
MyMod.initialized = false

function MyMod.init()
    if MyMod.initialized then return end

    print("MyMod initializing...")
    -- Setup code here

    MyMod.initialized = true
end

Events.OnGameStart.Add(MyMod.init)
```

## Multi-Version Support

Many mods support multiple game versions (Build 41, Build 42, etc.):

```
MyMod/
├── mod.info
├── 42.0/               # Build 42 specific files
│   └── media/
├── 41.78/              # Build 41 specific files
│   └── media/
└── media/              # Default/common files
```

The game loads the version-specific folder first, then falls back to the default `media/` folder.

## Data Flow Example

Here's how a typical mod interaction flows:

1. **Game Starts**
   - `OnGameBoot` event fires
   - Your initialization code runs
   - Variables are set up

2. **Player Interacts**
   - Player right-clicks an item
   - `OnFillInventoryObjectContextMenu` fires
   - Your code adds custom menu options

3. **Player Selects Option**
   - Your custom function executes
   - Modifies game state (player inventory, stats, etc.)
   - Changes are saved via ModData

4. **Game Saves**
   - `OnSave` event fires
   - ModData is persisted to disk

## Performance Considerations

- **Avoid OnTick for heavy operations**: OnTick fires every frame (60+ times/second)
- **Use appropriate timing**: Use EveryTenMinutes or EveryHours for periodic tasks
- **Cache frequently accessed data**: Don't repeatedly query the same information
- **Clean up event listeners**: Remove listeners when they're no longer needed

## Debugging

Enable debug mode in Project Zomboid to:
- See console output (`print()` statements)
- Use in-game debug tools
- Test without restarting the game

```lua
-- Debug logging pattern
if isDebugEnabled() then
    print("[MyMod] Debug info: " .. tostring(value))
end
```

## Next Steps

- Read the **Lua Scripting Guide** for detailed Lua patterns
- Learn about **Item Definitions** for creating custom items
- Try the **Practice Exercises** to build your first mods
