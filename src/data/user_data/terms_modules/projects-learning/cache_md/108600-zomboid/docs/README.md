# Project Zomboid Mod Learning Resources

Welcome to your Project Zomboid mod development learning center! This documentation is designed to help you learn how to create your own mods by studying existing workshop mods and working through practical exercises.

## What's Inside

This documentation package includes:

### Architecture & Reference Guides

1. **[01-mod-architecture.md](01-mod-architecture.md)** - Core concepts and architecture
   - Understand the complete mod structure
   - Learn about the three core components (mod.info, Lua scripts, script files)
   - Discover common patterns used in professional mods
   - Master the event-driven architecture

2. **[02-lua-scripting-guide.md](02-lua-scripting-guide.md)** - Lua programming for PZ
   - Lua basics refresher
   - Project Zomboid API essentials
   - Complete event system reference
   - ModData for persistent storage
   - Practical examples and best practices

3. **[03-item-definitions.md](03-item-definitions.md)** - Creating custom items
   - Item definition syntax
   - All item types (food, weapons, tools, clothing)
   - Recipe creation
   - Loot distribution
   - Complete property reference

### Hands-On Practice Exercises

Complete these exercises in order to build your skills progressively:

1. **[exercise-01-hello-world-mod.md](exercise-01-hello-world-mod.md)** - Your first mod ⭐
   - **Difficulty**: Beginner
   - **Time**: 15-20 minutes
   - **You'll Learn**: Basic mod structure, events, Lua basics
   - **You'll Build**: A mod that displays messages and makes the player speak

2. **[exercise-02-mood-booster-mod.md](exercise-02-mood-booster-mod.md)** - Stat modification ⭐⭐
   - **Difficulty**: Beginner-Intermediate
   - **Time**: 30-45 minutes
   - **You'll Learn**: Player stats, timed events, environment checks
   - **You'll Build**: A mod that reduces boredom/unhappiness while indoors

3. **[exercise-03-custom-food-item.md](exercise-03-custom-food-item.md)** - Complete item creation ⭐⭐⭐
   - **Difficulty**: Intermediate
   - **Time**: 45-60 minutes
   - **You'll Learn**: Item definitions, textures, loot distribution, recipes
   - **You'll Build**: A complete custom food item with crafting and spawning

## Learning Path

### Absolute Beginner

If you're new to modding:

1. Start with **01-mod-architecture.md** to understand the basics
2. Skim **02-lua-scripting-guide.md** for a Lua overview
3. Complete **exercise-01-hello-world-mod.md**
4. Review the relevant sections in the Lua guide as you need them
5. Move to **exercise-02-mood-booster-mod.md**

### Some Programming Experience

If you know programming but are new to PZ modding:

1. Read **01-mod-architecture.md** thoroughly
2. Complete **exercise-01-hello-world-mod.md** quickly
3. Complete **exercise-02-mood-booster-mod.md**
4. Use **02-lua-scripting-guide.md** as a reference
5. Move to **exercise-03-custom-food-item.md**
6. Reference **03-item-definitions.md** when creating items

### Experienced Modder

If you have some modding experience:

1. Skim **01-mod-architecture.md** for PZ-specific patterns
2. Use **02-lua-scripting-guide.md** and **03-item-definitions.md** as API references
3. Try the challenges in each exercise
4. Study the existing workshop mods for advanced patterns

## Workshop Mods as Learning Resources

This directory is located in your Steam Workshop folder, which contains many downloaded mods. These are excellent learning resources:

### Simple Mods to Study

- **Sleep On It (2673713236)** - Simple stat modifier
  - File: `2673713236/mods/SleepOnIt/media/lua/client/SleepOnIt.lua`
  - Great for learning: Timed events, player stats

- **Weapon Condition Indicator (2619072426)** - UI mod
  - Folder: `2619072426/mods/TheStar/`
  - Great for learning: UI widgets, client-side code

### Complex Mods to Study Later

- **Spear Traps (2640351732)** - Custom game mechanics
  - Great for learning: ModData, world objects, multi-file structure

- **Firearms (2256623447)** - Complete item overhaul
  - Great for learning: Complex items, multiple versions, large-scale mods

## Development Environment Setup

### Required

1. **Project Zomboid** (obviously!)
2. **Text Editor** - Any of these work:
   - VS Code (recommended - has Lua extensions)
   - Notepad++
   - Sublime Text
   - Even Notepad works!

### Recommended

1. **Enable Debug Mode** in Project Zomboid
   - Options → Display → Debug Mode
   - This lets you see console output and use debug features

2. **Quick Reload Mod** (optional)
   - Allows testing without restarting the game
   - Search Steam Workshop for "Quick Reload"

### File Locations

**Mod Development Folder:**
- Windows: `C:\Users\[YourName]\Zomboid\mods\`
- Linux: `~/.local/share/Zomboid/mods/`
- Mac: `~/Library/Application Support/Zomboid/mods/`

**Game Files (for reference):**
- Windows: `C:\Program Files (x86)\Steam\steamapps\common\ProjectZomboid\`
- Look in `media/lua/` and `media/scripts/` for vanilla examples

## Quick Reference

### Common Event Hooks

```lua
Events.OnGameStart.Add(function() end)          # Game starts
Events.OnCreatePlayer.Add(function(num, p) end) # Player created
Events.EveryTenMinutes.Add(function() end)      # Every 10 mins
Events.OnFillInventoryObjectContextMenu         # Right-click item
```

### Getting the Player

```lua
local player = getPlayer()                      # Single player
local player = getSpecificPlayer(0)             # Multiplayer
```

### Adding Items

```lua
player:getInventory():AddItem("Base.ItemName")
```

### Checking Stats

```lua
local bd = player:getBodyDamage()
local hunger = bd:getHunger()
bd:setHunger(50)
```

## Common Issues & Solutions

### Mod doesn't appear in Mod Manager
- Check `mod.info` exists in the mod root folder
- Restart Project Zomboid
- Check the mod is in the correct folder

### Console messages don't show
- Enable Debug Mode in options
- Press `~` to open console
- Check your Lua file is in the correct folder

### Changes don't apply
- Disable and re-enable the mod
- Start a **new game** (required for some changes like loot distribution)
- Check for syntax errors in console

### Item doesn't spawn
- Loot distribution requires starting a **new game**
- Check item ID matches exactly: `Base.ItemName`
- Verify distribution file is in `media/lua/server/`

## Getting Help

### Official Resources
- [Project Zomboid Forums](https://theindiestone.com/forums/)
- [PZ Modding Discord](https://discord.gg/theindiestone)
- [Official PZ Wiki](https://pzwiki.net/)

### In These Docs
- Check the **Troubleshooting** section in each exercise
- Review the **Best Practices** sections
- Try the **Challenges** to deepen understanding

### Learning from Existing Mods
1. Find a mod that does something similar to what you want
2. Look at its structure in your workshop folder
3. Read through its Lua files
4. Try modifying it (make a copy first!)

## Contributing Back

Once you've learned the basics:

1. **Share your knowledge** - Help others in forums
2. **Create mods** - Publish to Steam Workshop
3. **Document your code** - Help future modders learn
4. **Give credit** - Acknowledge mods you learned from

## Next Steps

Ready to start? Here's your action plan:

1. ✅ Read **01-mod-architecture.md**
2. ✅ Complete **exercise-01-hello-world-mod.md**
3. ✅ Complete **exercise-02-mood-booster-mod.md**
4. ✅ Complete **exercise-03-custom-food-item.md**
5. ✅ Study existing workshop mods for ideas
6. ✅ Build your own mod!
7. ✅ Share it on Steam Workshop

Happy modding! 🧟‍♂️

---

*This documentation was created by analyzing real Project Zomboid workshop mods. All examples are based on actual working mods.*

*Last Updated: 2025*
