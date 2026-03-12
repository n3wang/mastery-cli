# Project Zomboid Mod Development Flashcards

## Overview

This collection contains flashcards covering all major concepts in Project Zomboid mod development. The cards are designed to build deep understanding, not just memorization, by including context, examples, and real code from working mods.

## Flashcard Files

### 01-core-architecture.md (10 cards)
Foundational concepts about mod structure and organization.

**Topics covered:**
- mod.info file structure
- Directory organization (client/server/shared)
- Namespace pattern
- Event-driven architecture
- Client vs Server separation
- Media folder structure
- Module system
- Texture naming conventions
- Version folder system

**Best for:** Complete beginners who need to understand how mods are organized.

---

### 02-event-system.md (10 cards)
Deep dive into Project Zomboid's event-driven programming model.

**Topics covered:**
- Event registration pattern
- Game lifecycle events (OnGameStart, OnGameBoot, OnNewGame)
- Timed events and performance
- Context menu events
- Event parameters and player objects
- Event handler removal
- OnZombieUpdate pattern
- OnFillContainer for loot
- OnSave/OnLoad for persistence

**Best for:** Understanding how to make your mod respond to game events.

---

### 03-lua-patterns.md (9 cards)
Common Lua programming patterns used in professional PZ mods.

**Topics covered:**
- Nil checking and guard clauses
- Goto continue pattern for loops
- String formatting
- Table `or` pattern for initialization
- Local vs global variables
- Multiplayer-safe code patterns
- Caching global lookups for performance
- Multiple return values
- Ternary operator alternative

**Best for:** Writing clean, efficient, and professional Lua code.

---

### 04-moddata-and-items.md (8 cards)
Persistent data storage and item creation.

**Topics covered:**
- ModData basics (Player/Object/Square)
- ModData initialization pattern
- Multiplayer synchronization with transmitModData
- Item definition syntax
- Item types and type-specific properties
- Recipe definitions
- Loot distribution via ProceduralDistributions
- Icon/texture relationship

**Best for:** Creating custom items and saving mod data.

---

### 05-advanced-techniques.md (9 cards)
Advanced patterns and techniques from real mods.

**Topics covered:**
- Sandbox options integration
- Environment checks (indoors/outdoors)
- Complex ModData structures (arrays of objects)
- Related object pattern (multi-tile objects)
- Body part damage system
- Vehicle damage system
- Configuration helper pattern
- Early return pattern for performance

**Best for:** Implementing sophisticated features and optimizations.

---

## How to Use These Flashcards

### For Digital Study

The flashcards use a simple text format:

```
#### Card Title
Context and background explanation...

:p Question or prompt
??x
Answer with detailed explanation and code examples
x??
```

**Recommended workflow:**
1. Read the context/background section
2. Try to answer the `:p` prompt
3. Check your answer against the `??x ... x??` section
4. Review code examples to understand application

### For Anki or Other SRS Software

Each card can be imported into spaced repetition software:

1. **Front of card:** Everything from `#### Title` to `:p Question`
2. **Back of card:** Everything between `??x` and `x??`

### For Paper Study

Print or write out:
- **Front:** Title + Context + Question
- **Back:** Answer with examples

### Study Paths

#### Beginner Path
1. Start with **01-core-architecture.md** (understand structure)
2. Move to **02-event-system.md** (learn events)
3. Try **04-moddata-and-items.md** (create content)
4. Practice with the exercises in `/docs`
5. Return to review cards

#### Intermediate Path
1. Review **01-core-architecture.md** (refresh basics)
2. Focus on **03-lua-patterns.md** (improve code quality)
3. Study **04-moddata-and-items.md** (master content creation)
4. Learn **05-advanced-techniques.md** (professional features)

#### Advanced Path
1. Skim **03-lua-patterns.md** (ensure best practices)
2. Deep dive **05-advanced-techniques.md** (advanced patterns)
3. Apply techniques to your own mods
4. Study real mod source code in workshop folder

## Flashcard Statistics

| File | Cards | Difficulty | Time to Complete |
|------|-------|------------|------------------|
| 01-core-architecture | 10 | Beginner | 20-30 min |
| 02-event-system | 10 | Beginner-Intermediate | 30-40 min |
| 03-lua-patterns | 9 | Intermediate | 25-35 min |
| 04-moddata-and-items | 8 | Intermediate | 20-30 min |
| 05-advanced-techniques | 9 | Advanced | 30-40 min |
| **Total** | **46 cards** | Mixed | **~2.5 hours** |

## Key Concepts Covered

### Architecture (10 cards)
- Mod structure and organization
- File and folder conventions
- Client/server separation
- Namespacing

### Events (10 cards)
- Event-driven programming
- Lifecycle management
- UI integration
- Performance considerations

### Lua Patterns (9 cards)
- Safety and nil checking
- Code organization
- Performance optimization
- Multiplayer compatibility

### Data & Items (8 cards)
- Persistent storage
- Item definitions
- Recipes and loot
- Script syntax

### Advanced Techniques (9 cards)
- Configuration systems
- Complex game mechanics
- Multi-object coordination
- Professional patterns

## Learning Tips

### Active Recall
Don't just read the answers. Cover them and try to explain the concept in your own words before checking.

### Spaced Repetition
Review cards at increasing intervals:
- Day 1: Study new cards
- Day 2: Review Day 1 cards
- Day 4: Review Day 1 cards
- Day 7: Review Day 1 cards
- Day 14: Review Day 1 cards

### Code Along
The best way to learn is to:
1. Read the card
2. Open your code editor
3. Type out the examples
4. Modify them and see what happens
5. Apply them in your own mod

### Link to Exercises
After studying cards:
- **Architecture cards** → Do Exercise 1 (Hello World)
- **Event cards** → Do Exercise 2 (Mood Booster)
- **Item cards** → Do Exercise 3 (Custom Food)
- **Advanced cards** → Modify exercises with new techniques

### Reference During Development
Keep these open while coding. When you encounter a problem:
1. Search the relevant flashcard file
2. Review the pattern
3. Apply to your code

## Code Examples Source

All code examples in these flashcards come from:
- **Sleep On It** (2673713236) - Simple stat modifier
- **Spear Traps** (2640351732) - Complex mechanics, ModData
- **Weapon Condition Indicator** (2619072426) - UI, client-side
- **Mood Booster** (Exercise 2) - Environment checks
- **Firearms B41** (2256623447) - Item definitions

## Common Misconceptions Addressed

✅ **"I can put code anywhere"** → No, client/server/shared matters
✅ **"ModData saves automatically"** → Only for players, objects need transmitModData()
✅ **"Global variables are fine"** → No, use namespaces
✅ **"OnTick is good for everything"** → No, too frequent for most tasks
✅ **"Item icons just work"** → No, strict naming: Item_[Name].png

## Next Steps

After completing these flashcards:

1. ✅ Work through `/docs/exercise-01-hello-world-mod.md`
2. ✅ Complete `/docs/exercise-02-mood-booster-mod.md`
3. ✅ Build `/docs/exercise-03-custom-food-item.md`
4. ✅ Study real mods in your workshop folder
5. ✅ Create your own mod!
6. ✅ Return to flashcards for reference

## Contributing Ideas

Found a concept that should be a flashcard? Consider:
- Patterns you see repeated in multiple mods
- Mistakes you made and learned from
- Concepts that confused you initially
- Techniques that made your code better

## Quick Reference

**Most important cards for beginners:**
- 01: mod.info structure
- 01: Directory organization
- 02: Event registration
- 02: Game lifecycle events
- 04: Item definition syntax

**Most important cards for quality:**
- 03: Namespace pattern
- 03: Nil checking
- 03: Local vs global
- 05: Early return pattern

**Most important cards for features:**
- 04: ModData basics
- 02: Context menu events
- 04: Loot distribution
- 05: Sandbox options

---

*These flashcards are based on real working mods from the Steam Workshop and designed to complement the hands-on exercises in the `/docs` folder.*

**Total Knowledge Coverage:** 46 concepts across 5 major areas of PZ mod development.

Happy learning! 🎮📚
