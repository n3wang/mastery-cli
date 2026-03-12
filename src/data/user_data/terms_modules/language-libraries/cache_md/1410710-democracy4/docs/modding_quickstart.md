# Democracy 4 Modding Quick Start Guide

## Table of Contents
1. [Prerequisites](#prerequisites)
2. [Your First Mod: Simple Policy Addition](#your-first-mod-simple-policy-addition)
3. [Adding Visual Assets](#adding-visual-assets)
4. [Testing Your Mod](#testing-your-mod)
5. [Common Issues and Solutions](#common-issues-and-solutions)
6. [Next Steps](#next-steps)

---

## Prerequisites

### Required Software
- Democracy 4 installed
- Text editor (Notepad++, VS Code, or similar)
- Optional: CSV editor (Excel, LibreOffice Calc)
- Optional: SVG editor (Inkscape) for icons

### Required Knowledge
- Basic text file editing
- Understanding of CSV format
- Basic file/folder navigation

### Recommended Preparation
1. Play Democracy 4 for a few hours to understand game mechanics
2. Examine existing mods in this workshop folder
3. Read `architecture_overview.md` for context

---

## Your First Mod: Simple Policy Addition

We'll create a mod that adds a new taxation policy called "Luxury Goods Tax"

### Step 1: Create Mod Folder Structure

**Location**: `C:\Users\[YourName]\Documents\My Games\Democracy4\mods\`

Create this folder structure:
```
luxury_tax_mod/
├── config.txt
└── data/
    └── simulation/
        └── policies.csv
```

**Windows Command Prompt**:
```cmd
cd "%USERPROFILE%\Documents\My Games\Democracy4\mods"
mkdir luxury_tax_mod
mkdir luxury_tax_mod\data
mkdir luxury_tax_mod\data\simulation
```

**PowerShell**:
```powershell
cd "$env:USERPROFILE\Documents\My Games\Democracy4\mods"
New-Item -ItemType Directory -Path "luxury_tax_mod\data\simulation" -Force
```

---

### Step 2: Create config.txt

**Path**: `luxury_tax_mod/config.txt`

**Content**:
```ini
[config]
name = luxury_tax_mod
guiname = Luxury Goods Tax Mod
author = YourName
description = Adds a new taxation policy targeting luxury goods purchases. Generates revenue while affecting wealthy citizens and retailers.
```

**Important Notes**:
- `name` must be lowercase, no spaces
- `guiname` is what players see
- `author` is your name/handle
- `description` explains what the mod does

---

### Step 3: Create policies.csv

**Path**: `luxury_tax_mod/data/simulation/policies.csv`

**Content**:
```csv
name,guiname,description,category,implementation_cost,cancellation_cost,income,min_income,max_income,slider,Wealthy,Wealthy_eq,Retail,Retail_eq,GDP,GDP_eq
LUXURY_TAX,Luxury Goods Tax,A special tax on luxury items such as expensive cars jewelry and designer goods. Generates revenue from the wealthy.,tax,35,25,0,50,300,TaxationVsSpending,-0.08,-(x*0.08),-0.04,-(x*0.04),0,-(x*0.02)
```

**Field Explanations**:

| Field | Value | Meaning |
|-------|-------|---------|
| `name` | LUXURY_TAX | Internal identifier |
| `guiname` | Luxury Goods Tax | Display name in-game |
| `description` | ... | Tooltip description |
| `category` | tax | Policy category |
| `implementation_cost` | 35 | Political capital to implement |
| `cancellation_cost` | 25 | Political capital to cancel |
| `income` | 0 | Base income (overridden by min/max) |
| `min_income` | 50 | Minimum revenue at x=0.1 |
| `max_income` | 300 | Maximum revenue at x=1.0 |
| `slider` | TaxationVsSpending | Associated political slider |
| `Wealthy` | -0.08 | Base effect on wealthy opinion |
| `Wealthy_eq` | -(x*0.08) | Scaled effect (x = policy strength) |
| `Retail` | -0.04 | Base effect on retailers |
| `Retail_eq` | -(x*0.04) | Scaled effect on retailers |
| `GDP` | 0 | Base GDP impact |
| `GDP_eq` | -(x*0.02) | GDP decrease (negative growth) |

**Understanding the Effects**:
- **Income**: Generates 50-300 revenue based on policy strength
- **Wealthy**: Opinion decreases (negative values = dislike)
  - At x=0.5: -0.04 opinion
  - At x=1.0: -0.08 opinion
- **Retail**: Slight negative impact on retail sector
- **GDP**: Minor negative impact (luxury spending reduction)

---

### Step 4: Load and Test

1. **Launch Democracy 4**
2. **Main Menu** → Click "Mods" button
3. **Find Your Mod**: Look for "Luxury Goods Tax Mod"
4. **Enable**: Check the checkbox next to your mod
5. **Start Game**: Choose any country
6. **Find Policy**:
   - Open policy screen
   - Navigate to "Taxation" category
   - Look for "Luxury Goods Tax"
7. **Test Implementation**:
   - Click policy to implement
   - Adjust slider to test effects
   - Observe wealthy opinion, income, GDP

---

## Adding Visual Assets

### Step 5: Create an Icon (Optional)

**Path**: `luxury_tax_mod/data/svg/LUXURY_TAX.svg`

**Simple Example** (create this file):
```xml
<?xml version="1.0" encoding="UTF-8"?>
<svg width="64" height="64" viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
  <!-- Diamond shape representing luxury -->
  <polygon points="32,8 48,32 32,56 16,32" fill="#FFD700" stroke="#000" stroke-width="2"/>
  <!-- Inner detail -->
  <polygon points="32,16 40,32 32,48 24,32" fill="#FFF" opacity="0.5"/>
</svg>
```

**Tips**:
- Keep designs simple and recognizable
- Use high contrast for readability
- Test appearance in-game
- Name file exactly as policy name (LUXURY_TAX.svg)

---

## Testing Your Mod

### In-Game Testing Checklist

- [ ] **Mod Loads**: No errors on game launch
- [ ] **Policy Appears**: Shows in correct category
- [ ] **Icon Displays**: Custom icon visible (if created)
- [ ] **Implementation Works**: Can enable/disable policy
- [ ] **Slider Functions**: Can adjust policy strength
- [ ] **Effects Apply**: Income generated, opinions change
- [ ] **Balance Check**: Not overpowered or useless
- [ ] **No Crashes**: Game remains stable

### Testing Different Scenarios

1. **Low Implementation** (x=0.2):
   - Minimal income
   - Small opinion impact

2. **Medium Implementation** (x=0.5):
   - Moderate income
   - Noticeable but manageable opinion change

3. **Full Implementation** (x=1.0):
   - Maximum income
   - Strong opinion impact
   - Test if it's balanced

4. **Multiple Countries**:
   - Rich countries (USA, Germany) - should generate more revenue
   - Poor countries - may have less impact

---

## Common Issues and Solutions

### Issue 1: Mod Doesn't Appear

**Symptoms**: Mod not listed in mods menu

**Solutions**:
1. Check `config.txt` is in root of mod folder
2. Verify all required fields present (name, guiname, author, description)
3. Ensure mod folder is in correct location:
   - `Documents\My Games\Democracy4\mods\[mod_name]\`
4. Restart game completely

---

### Issue 2: Policy Doesn't Show In-Game

**Symptoms**: Mod loads, but policy not visible

**Solutions**:
1. Check CSV format is correct (proper commas, headers)
2. Verify `policies.csv` is in `data/simulation/` folder
3. Ensure first row is header row with column names
4. Check for typos in category name
5. Look in correct category in-game

---

### Issue 3: Effects Don't Work

**Symptoms**: Policy appears but has no impact

**Solutions**:
1. Verify equation syntax: `-(x*0.08)` not `-x*0.08`
2. Check effect names match game variables:
   - `Wealthy` (voter group)
   - `GDP` (economic variable)
   - `Retail` (voter group)
3. Ensure both base value and equation are provided
4. Test with policy at maximum (x=1.0) to see if effects scale

---

### Issue 4: Icon Doesn't Display

**Symptoms**: Policy works but shows default icon

**Solutions**:
1. Verify SVG filename matches policy name exactly: `LUXURY_TAX.svg`
2. Check SVG is in `data/svg/` folder
3. Validate SVG syntax (open in browser to test)
4. Try PNG fallback in `data/bitmaps/` folder

---

### Issue 5: Income Not Generating

**Symptoms**: Policy implemented but no revenue

**Solutions**:
1. Ensure `income`, `min_income`, `max_income` are all set
2. Check values are reasonable (50-300, not 0.5-3.0)
3. Verify `slider` is set to valid slider name
4. Test by moving policy slider to maximum

---

## Debugging Tips

### Check Game Logs

**Location**: `Documents\My Games\Democracy4\`

**Files**:
- `debug.txt` - General game logs
- `errors.txt` - Error messages

**Look for**:
- "Failed to load" messages
- CSV parsing errors
- Missing file warnings

### Use Existing Mods as Templates

1. Find similar mod in workshop folder
2. Compare file structure
3. Copy and modify working examples
4. Reference their CSV format

### Incremental Testing

1. Start with minimal mod (just config.txt)
2. Add one file at a time
3. Test after each addition
4. Easier to identify what broke

---

## Next Steps

### Expand Your Mod

**Add More Policies**:
- Add rows to `policies.csv`
- Each row = one new policy
- Use different categories (welfare, transport, etc.)

**Add Situations**:
- Create `data/simulation/situations.csv`
- Define crises or conditions
- Link to your policies

**Add Events**:
- Create `data/simulation/events/` folder
- Add event files (`.txt`)
- Create player decisions

**Add Translations**:
- Create `translations/english/policies.csv`
- Localize your mod
- Support other languages

### Advanced Techniques

**Use Overrides**:
- Modify existing game mechanics
- Create complex interactions
- Fine-tune balance

**Create Country Mods**:
- Add new playable nations
- Define unique starting conditions
- Design custom maps

**Build Mod Packs**:
- Combine multiple small mods
- Create thematic collections
- Ensure compatibility

### Learning Resources

1. **Examine Workshop Mods**:
   - See `mod_summary.csv` for mod list
   - Study mods similar to your goals
   - Learn from successful mods

2. **Read Documentation**:
   - `architecture_overview.md` - Understand structure
   - `file_format_reference.md` - Detailed specifications
   - `practice_exercises.md` - Hands-on tutorials

3. **Community**:
   - Steam Workshop discussions
   - Democracy 4 forums
   - Modding Discord servers

4. **Practice Exercises**:
   - Complete exercises in `practice_exercises.md`
   - Build progressively complex mods
   - Experiment with different mechanics

---

## Publishing Your Mod

### Before Publishing

- [ ] Test thoroughly across multiple countries
- [ ] Write clear description
- [ ] Create preview image/screenshot
- [ ] Document any mod dependencies
- [ ] Check for compatibility issues
- [ ] Get feedback from friends/testers

### Steam Workshop Upload

1. **In-Game**:
   - Mods menu → "Upload to Workshop"
   - Select your mod
   - Fill in metadata

2. **Steam Workshop**:
   - Add description
   - Upload screenshots
   - Set visibility (public/private)
   - Add tags

3. **Maintain**:
   - Monitor comments for bugs
   - Update based on feedback
   - Keep compatible with game updates

---

## Congratulations!

You've created your first Democracy 4 mod! Continue learning with the practice exercises, and don't be afraid to experiment.

**Remember**:
- Start simple
- Test frequently
- Learn from examples
- Have fun modding!
