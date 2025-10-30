# Project Zomboid - Core Architecture Flashcards

#### mod.info File Structure
The `mod.info` file is the entry point for any Project Zomboid mod. It contains metadata that tells the game what the mod is, what it's called, and what resources it needs. This file must be in the root directory of your mod folder.

Essential fields include:
- `name`: Display name in mod manager
- `id`: Unique identifier (lowercase, no spaces)
- `description`: What the mod does

Optional but useful fields:
- `modversion`: Version tracking
- `poster`: Image file reference
- `pack`: Texture pack name
- `tiledef`: Tile definition for custom tiles

:p What are the three required fields in a mod.info file and what is their purpose?
??x
The three required fields are:
1. `name` - The display name shown to players in the mod manager
2. `id` - A unique identifier (must be lowercase, no spaces) used internally
3. `description` - Text explaining what the mod does

Example:
```
name=My First Mod
id=myfirstmod
description=Adds cool features to the game
```
x??

---

#### Directory Structure - media/lua Organization
Project Zomboid mods organize Lua scripts into three critical subdirectories under `media/lua/`. This separation is fundamental to how the game processes mod code in both single-player and multiplayer environments.

The three directories are:
- **client/**: Code that runs only on the player's computer (UI, visuals, local interactions)
- **server/**: Code that runs on the game server, including single-player (game mechanics, world state)
- **shared/**: Code that runs on both client and server (utilities, constants, shared calculations)

This architecture allows proper separation of concerns and prevents security issues in multiplayer.

:p What are the three subdirectories under media/lua/ and when should you use each one?
??x
The three subdirectories are:

1. **client/** - Use for:
   - UI modifications
   - Visual effects
   - Player-specific interactions
   - Local sound effects

2. **server/** - Use for:
   - Game mechanics
   - World state changes
   - Loot spawning
   - Multiplayer synchronization

3. **shared/** - Use for:
   - Utility functions
   - Data structures
   - Constants
   - Code needed by both client and server

Example structure:
```
media/lua/
├── client/MyModUI.lua
├── server/MyModDistribution.lua
└── shared/MyModUtils.lua
```
x??

---

#### Namespace Pattern - Avoiding Global Pollution
In Lua, variables declared without `local` become global and can conflict with other mods. The namespace pattern prevents this by encapsulating all mod code in a unique table. This is a critical best practice used in nearly all professional Project Zomboid mods.

Without namespace (BAD):
```lua
function myFunction()  -- Global! Can conflict with other mods
    return 5
end
```

With namespace (GOOD):
```lua
MyMod = MyMod or {}  -- Create namespace if it doesn't exist

MyMod.myFunction = function()
    return 5
end
```

The `or {}` pattern ensures the table exists without overwriting it if another file already created it.

:p Why do we use the pattern 'MyMod = MyMod or {}' and what problem does it solve?
??x
This pattern solves the global namespace pollution problem.

**Purpose:**
- Creates a unique namespace table for your mod
- Prevents conflicts with other mods
- Allows multiple files to safely add to the same namespace

**How it works:**
```lua
MyMod = MyMod or {}
-- If MyMod exists, use it
-- If MyMod is nil, create new empty table {}

MyMod.config = {}
MyMod.doSomething = function() end
```

**Why it matters:**
Without this, every function/variable is global and can overwrite or be overwritten by other mods, causing bugs that are hard to track down.
x??

---

#### Event-Driven Architecture
Project Zomboid uses an event-driven architecture instead of continuous loops. You don't write a game loop; instead, you register functions (handlers) to be called when specific events occur. This is more efficient and follows the Observer pattern.

Traditional game loop (NOT used in PZ):
```lua
while game_running do
    updatePlayer()
    checkTime()
    checkHealth()
end
```

PZ event system (correct approach):
```lua
Events.OnPlayerUpdate.Add(updatePlayer)
Events.EveryTenMinutes.Add(checkTime)
Events.OnPlayerDamage.Add(checkHealth)
```

The game engine manages when to call your functions based on what's happening in the game.

:p How does Project Zomboid's event-driven architecture differ from a traditional game loop?
??x
Instead of writing a continuous loop, you register callback functions to specific events.

**Traditional Loop (NOT used):**
```lua
while true do
    if playerMoved then updateUI() end
    if tenMinutesPassed then doCheck() end
end
```

**PZ Event System:**
```lua
-- Register handlers to events
Events.OnPlayerMove.Add(updateUI)
Events.EveryTenMinutes.Add(doCheck)

-- Game engine calls them automatically
```

**Benefits:**
- More efficient (only runs when needed)
- Cleaner code organization
- Automatic multiplayer synchronization
- No need to manage timing manually
x??

---

#### Client vs Server Architecture
Understanding when code runs on client vs server is critical for multiplayer compatibility and performance. Even in single-player, the game runs both a client (what you see) and a server (game logic).

**Flow example:**
```
Player right-clicks item → Client detects → Shows menu (CLIENT)
Player selects "Use" → Client sends to Server
Server validates → Modifies game state (SERVER)
Server sends update → Client updates display (CLIENT)
```

Common mistake:
```lua
-- In client/MyMod.lua
function giveItem()
    player:getInventory():AddItem("Base.Hammer")  -- Works in SP, breaks in MP!
end
```

Correct approach:
```lua
-- In server/MyMod.lua (or use sendClientCommand)
function giveItem()
    player:getInventory():AddItem("Base.Hammer")  -- Safe for MP
end
```

:p Why is it important to place code in the correct client/server/shared folder, and what happens if you don't?
??x
**Importance:**
- **Security**: Server validates all game-changing actions (prevents cheating)
- **Synchronization**: Server is source of truth for all players
- **Performance**: Client only handles visuals/UI, reducing network traffic

**What happens if incorrect:**

Wrong (client folder):
```lua
-- This might work in single-player but breaks in multiplayer
player:getInventory():AddItem("Base.Hammer")
```

Right (server folder):
```lua
-- Works in both single-player and multiplayer
player:getInventory():AddItem("Base.Hammer")
```

**Rule of thumb:**
- Changes to game state → server/
- UI and visuals → client/
- Utilities and constants → shared/
x??

---

#### Media Folder Structure - Complete Organization
The `media/` folder is the root of all mod content. Understanding this structure is essential because the game looks for specific file types in specific locations.

```
media/
├── lua/              # All Lua scripts
│   ├── client/      # Client-side scripts
│   ├── server/      # Server-side scripts
│   └── shared/      # Shared scripts
├── scripts/         # Item/recipe definitions (.txt files)
├── textures/        # Images and icons (.png files)
├── sound/           # Audio files (.ogg, .wav)
├── ui/              # UI-specific assets
├── models_x/        # 3D models
└── sandbox-options.txt  # Mod configuration options
```

File naming conventions:
- Scripts: Any `.txt` file (e.g., `MyItems.txt`)
- Textures: `Item_[IconName].png` (e.g., `Item_Apple.png`)
- Lua: Any `.lua` file (e.g., `MyMod.lua`)

:p What file types go in media/scripts/ vs media/lua/ and how are they different?
??x
**media/scripts/** contains:
- Item definitions (.txt files)
- Recipe definitions
- Vehicle configurations
- Declarative data (not code)

Example:
```
module Base {
    item MyApple {
        Type = Food,
        Weight = 0.1,
        HungerChange = -10,
    }
}
```

**media/lua/** contains:
- Lua code files (.lua)
- Game logic
- Event handlers
- Behavioral scripts

Example:
```lua
function onEat(food, player)
    player:Say("Yum!")
end
Events.OnEat.Add(onEat)
```

**Key difference:**
- Scripts define WHAT exists (items, recipes)
- Lua defines HOW things behave (logic, events)
x??

---

#### Module System in Script Files
In Project Zomboid script files, the `module` keyword acts as a namespace for items and recipes. All vanilla items are in the `Base` module, but mods can create their own modules for better organization.

```
module Base {
    item Hammer {
        Type = Weapon,
        Weight = 1.5,
    }
}

module MyMod {
    item SuperHammer {
        Type = Weapon,
        Weight = 1.5,
    }
}
```

When referencing items in Lua:
```lua
-- Vanilla item
player:getInventory():AddItem("Base.Hammer")

-- Modded item
player:getInventory():AddItem("MyMod.SuperHammer")
```

The module prefix is ALWAYS required when referencing items in code.

:p How do you reference an item from a script file in Lua code, and what is the module prefix?
??x
You must use the format: `"ModuleName.ItemName"`

**In script file (media/scripts/Items.txt):**
```
module MyMod {
    item CoolSword {
        Type = Weapon,
        DisplayName = Cool Sword,
    }
}
```

**In Lua code:**
```lua
-- Add item to inventory
player:getInventory():AddItem("MyMod.CoolSword")

-- Check if player has item
if inventory:contains("MyMod.CoolSword") then
    print("Has cool sword!")
end
```

**Common modules:**
- `Base` - All vanilla items
- Custom name - Your mod's items

**Important:** The module prefix is REQUIRED. `AddItem("CoolSword")` will NOT work.
x??

---

#### Icon/Texture Naming Convention
Project Zomboid has a strict naming convention for item textures. The game automatically matches texture files to items based on the Icon property in the script definition.

**Naming rule:** `Item_[IconName].png`

In script file:
```
item MyApple {
    Icon = Apple,
    DisplayName = Red Apple,
}
```

Matching texture file:
```
media/textures/Item_Apple.png
```

The game automatically:
1. Looks in `media/textures/`
2. Prepends `Item_` to the icon name
3. Appends `.png`
4. Loads that file

If the file doesn't exist or is misnamed, the item will show as a purple square.

:p What is the naming convention for item texture files and how does it relate to the Icon property?
??x
The file must be named: `Item_[IconName].png`

**Example:**

Script definition:
```
item EnergyBar {
    Icon = EnergyBar,
    DisplayName = Energy Bar,
}
```

Texture file location:
```
media/textures/Item_EnergyBar.png
```

**Process:**
```
Icon = MyItem
  ↓
Game looks for: Item_MyItem.png
  ↓
In folder: media/textures/
  ↓
Full path: media/textures/Item_MyItem.png
```

**Common mistakes:**
- ❌ `MyItem.png` (missing Item_ prefix)
- ❌ `Item_MyItem.jpg` (wrong extension)
- ❌ Wrong folder location
- ✅ `Item_MyItem.png` in media/textures/
x??

---

#### Version Folder System
Many professional mods support multiple game versions (Build 41, Build 42) using a folder hierarchy. The game loads version-specific files first, then falls back to common files.

```
MyMod/
├── mod.info
├── 42.0/           # Build 42 specific
│   └── media/
│       └── lua/
├── 41.78/          # Build 41 specific
│   └── media/
│       └── lua/
└── media/          # Common to all versions
    └── lua/
```

Loading order:
1. Check if `42.0/media/lua/MyScript.lua` exists (if on Build 42)
2. If not found, check `media/lua/MyScript.lua`
3. Use whichever is found first

This allows maintaining one mod for multiple game versions without duplicating all files.

:p How does the version folder system work and what is the file loading order?
??x
The game checks version-specific folders FIRST, then falls back to the default media/ folder.

**Structure:**
```
MyMod/
├── 42.0/media/lua/NewFeature.lua  # Only for Build 42
├── 41.78/media/lua/OldFeature.lua # Only for Build 41
└── media/lua/CommonCode.lua       # Used by both
```

**Loading order (example on Build 42):**
```
1. Check: 42.0/media/lua/MyScript.lua
   ↓ (if not found)
2. Check: media/lua/MyScript.lua
   ↓
3. Load whichever exists
```

**Use cases:**
- New API features only in Build 42
- Different implementations for compatibility
- Shared code in common media/ folder

**Benefit:** One mod package supports multiple game versions without duplicating files.
x??
