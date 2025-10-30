# Democracy 4 Modding Documentation

Welcome to the Democracy 4 modding documentation! This collection of resources will help you learn how to create mods for Democracy 4.

## Documentation Overview

This docs folder contains comprehensive resources for learning Democracy 4 modding:

### 1. **mod_summary.csv**
A spreadsheet listing all 14 mods in this workshop directory with:
- Workshop ID
- Mod name and display name
- Author information
- File count
- Category classification
- Brief description

**Use this to**: Browse available mods and find examples similar to what you want to create.

---

### 2. **architecture_overview.md**
Comprehensive overview of Democracy 4's modding architecture including:
- Directory structure and organization
- Core components (policies, situations, events, missions)
- Data flow and loading process
- Modding philosophy and best practices
- Compatibility considerations

**Use this to**: Understand the big picture of how mods work and how the game engine processes mod data.

**Read time**: 15-20 minutes

---

### 3. **file_format_reference.md**
Detailed technical reference for all file formats:
- Configuration files (.txt, .ini)
- CSV data files (policies, situations, sliders)
- Override files
- Graphics files (SVG, PNG)
- Common data types and syntax

**Use this to**: Look up specific syntax, field names, and format requirements when creating mod files.

**Read time**: 20-30 minutes (use as reference)

---

### 4. **modding_quickstart.md**
Step-by-step tutorial for creating your first mod:
- Prerequisites and setup
- Creating a simple policy mod from scratch
- Adding visual assets
- Testing and debugging
- Common issues and solutions
- Publishing to Steam Workshop

**Use this to**: Create your very first Democracy 4 mod with guided instructions.

**Read time**: 30-45 minutes (hands-on)

---

### 5. **practice_exercises.md**
Three progressive hands-on exercises with complete solutions:

**Exercise 1 (Beginner)**: Create a "Digital Services Tax" policy
- Basic mod structure
- Policy creation
- CSV format and testing

**Exercise 2 (Intermediate)**: Add an "Internet Infrastructure Crisis" situation
- Situations and triggers
- Policy interactions using overrides
- Complex systems design

**Exercise 3 (Advanced)**: Create a complete "Green Energy Transition" mod
- Multiple policies and situations
- Events with player choices
- Complex override relationships
- Full mod ecosystem

**Use this to**: Build practical skills through progressive challenges with step-by-step instructions and solutions.

**Time commitment**: 2-3 hours total

---

## Getting Started

### Recommended Learning Path

**Complete Beginner**:
1. Read `architecture_overview.md` (sections 1-2)
2. Follow `modding_quickstart.md` completely
3. Complete Exercise 1 from `practice_exercises.md`
4. Use `file_format_reference.md` as needed

**Some Experience**:
1. Skim `architecture_overview.md`
2. Complete Exercises 1-2 from `practice_exercises.md`
3. Study mods in `mod_summary.csv` that interest you
4. Reference `file_format_reference.md` for details

**Advanced Modder**:
1. Use `file_format_reference.md` as reference
2. Complete Exercise 3 from `practice_exercises.md`
3. Examine complex mods like "D4 Overhaul & Expansion" (2308946130)
4. Experiment with advanced features

---

## Quick Reference

### Essential File Locations

**Your Mods Folder**:
```
C:\Users\[YourName]\Documents\My Games\Democracy4\mods\
```

**Steam Workshop Mods** (read-only examples):
```
C:\Program Files (x86)\Steam\steamapps\workshop\content\1410710\
```

---

### Minimal Mod Structure

```
my_mod/
├── config.txt              # Required: Mod metadata
└── data/
    └── simulation/
        └── policies.csv    # At least one data file
```

---

### Essential config.txt

```ini
[config]
name = my_mod_id
guiname = My Mod Display Name
author = YourName
description = What this mod does
```

---

### Common File Types

| File | Purpose | Location |
|------|---------|----------|
| `config.txt` | Mod metadata | Root of mod folder |
| `policies.csv` | Define policies | `data/simulation/` |
| `situations.csv` | Define situations | `data/simulation/` |
| `*.txt` (events) | Game events | `data/simulation/events/` |
| `*.ini` | Overrides | `data/overrides/` |
| `*.svg` | Policy icons | `data/svg/` |

---

## Example Mods in This Workshop

Use `mod_summary.csv` to find mods, then study their structure:

**Simple Policy Mods** (Good for beginners):
- More Taxes (2254424981) - 23 files
- Waste Management (2621565670) - 12 files
- Green Science (2796896963) - 7 files

**Medium Complexity** (Intermediate):
- Transportation Expansion (2674583892) - 50 files
- Foreign Policy Expansion (2284570370) - 204 files

**Complex Overhauls** (Advanced):
- D4 Overhaul & Expansion (2308946130) - 1,811 files
- VF's Industrial Economics (2998454951) - 152 files

---

## Troubleshooting

### Mod Won't Load
- Check `config.txt` exists in mod root folder
- Verify all required fields present
- Ensure proper file encoding (UTF-8)

### Policy Doesn't Appear
- Verify CSV format (headers, commas)
- Check file location: `data/simulation/policies.csv`
- Ensure policy has unique name

### Effects Don't Work
- Check equation syntax: `(x*0.5)` not `x*0.5`
- Verify column names match game variables
- Test with policy at maximum to see effect

**See `modding_quickstart.md` section "Common Issues and Solutions" for more help**

---

## Community Resources

### Official
- Democracy 4 Steam Workshop
- Positech Games forums

### Modding Community
- Steam Workshop discussions for each mod
- Democracy 4 modding Discord servers
- Reddit r/democracy4 (unofficial)

### Learning Resources
- Study existing mods in this workshop folder
- Examine official DLC content structure
- Join community discussions

---

## Contributing to This Documentation

Found an error or want to improve these docs?
- These files are located in: `docs/` folder
- Edit markdown files with any text editor
- Share improvements with the community

---

## Credits

**Documentation Created**: For Democracy 4 modding community

**Based on Analysis of**: 14 Steam Workshop mods
- More Taxes by feelinWitchy
- Foreign Policy Expansion by feelinWitchy
- D4 Overhaul & Expansion by Adeptus Freemanicus
- And 11 others (see mod_summary.csv)

**Special Thanks**:
- Positech Games for Democracy 4
- All mod creators who shared their work
- The Democracy 4 community

---

## License and Usage

This documentation is provided free for the Democracy 4 modding community.

**You may**:
- Use these docs to learn modding
- Share with other modders
- Adapt for your own learning
- Create derivative guides

**Please**:
- Credit this documentation if you share it
- Contribute improvements back to community
- Help other new modders

---

## Getting Help

**Stuck? Try these steps**:

1. **Check the docs**: Search these markdown files for your issue
2. **Study examples**: Look at similar mods in `mod_summary.csv`
3. **Test incrementally**: Add one feature at a time
4. **Check game logs**: Look in `Documents\My Games\Democracy4\` for error files
5. **Ask the community**: Post in Steam Workshop discussions

---

## Quick Start Summary

**To create your first mod in 30 minutes**:

1. Read: `modding_quickstart.md` (10 minutes)
2. Create: Follow the "Luxury Goods Tax" example (15 minutes)
3. Test: Load game and verify it works (5 minutes)

**To become proficient**:

1. Complete all 3 practice exercises (2-3 hours)
2. Study 2-3 existing mods from workshop (1 hour)
3. Create your own original mod (varies)

**To master modding**:

1. Complete all exercises
2. Study complex mods (D4 Overhaul, VF's Industrial Economics)
3. Create multiple mods of increasing complexity
4. Help other modders learn
5. Contribute to community resources

---

## Next Steps

Choose your path:

**Path 1: Guided Learning**
→ Start with `modding_quickstart.md`

**Path 2: Hands-On Practice**
→ Jump to `practice_exercises.md` Exercise 1

**Path 3: Study by Example**
→ Browse `mod_summary.csv` and examine workshop mods

**Path 4: Technical Deep Dive**
→ Read `architecture_overview.md` and `file_format_reference.md`

---

## Happy Modding!

Remember: Every expert modder started as a beginner. Take your time, experiment freely, and don't be afraid to make mistakes. The Democracy 4 modding community is here to help!

**Start your modding journey today! →**
