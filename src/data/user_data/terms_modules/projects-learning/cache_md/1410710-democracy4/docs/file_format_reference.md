# Democracy 4 File Format Reference

## Table of Contents
1. [Configuration Files (.txt)](#configuration-files-txt)
2. [CSV Data Files](#csv-data-files)
3. [Override Files (.ini)](#override-files-ini)
4. [Graphics Files](#graphics-files)
5. [Common Data Types](#common-data-types)

---

## Configuration Files (.txt)

### config.txt (Mod Metadata)

**Location**: Root of mod directory

**Format**: INI-style sections

**Required Section**: `[config]`

**Fields**:
```ini
[config]
name = internal_mod_id           # Required: Lowercase, no spaces
guiname = Display Name           # Required: User-visible name
author = Author Name             # Required: Mod creator
description = Detailed desc...   # Required: What the mod does
path = C:\path\to\dev\folder    # Optional: Development path
```

**Example**:
```ini
[config]
name = my_awesome_mod
guiname = My Awesome Mod
author = YourName
description = This mod adds 10 new taxation policies and 3 economic situations to enhance fiscal gameplay.
```

---

### Mission Files (.txt)

**Location**: `data/missions/[country_code]/[country].txt`

**Purpose**: Define country-specific game parameters

**Sections**:

#### [config] Section
```ini
[config]
currency = $                     # Currency symbol
population = 330000000           # Population count
mapdata = data/missions/usa/usmap.svg  # Path to map SVG
```

**Economic Parameters**:
```ini
minincome = 200                  # Minimum government income
maxincome = 1000                 # Maximum government income
minGDP = 8000                    # Minimum GDP (billions)
maxGDP = 24000                   # Maximum GDP (billions)
wealthmodifier = 1.0             # Wealth adjustment factor
debt = 15000                     # Starting national debt
economiccycle = 0.5              # Economic cycle position (0.0-1.0)
foreignexchange = 1.0            # Exchange rate multiplier
```

#### [policies] Section
```ini
[policies]
PolicyName = 0.75               # Policy strength (0.0 = off, 1.0 = max)
IncomeTax = 0.65
CorporateTax = 0.45
```

**Valid Range**: 0.0 (policy off) to 1.0 (policy at maximum)

#### [flags] Section
```ini
[flags]
has_coast = 1                   # Boolean: Country has coastline
royal_family = 0                # Boolean: Has royal family
```

#### [options] Section
```ini
[options]
MULTIPLEPARTIES                 # Enable multi-party system
TERMLIMIT,2                     # Term limit (number)
```

---

### Event Files (.txt)

**Location**: `data/simulation/events/*.txt`

**Structure**:

```ini
[config]
name = event_internal_name
guiname = Event Display Name
description = What happens in the event
trigger = [condition1,condition2]
minhappiness = 0.3              # Minimum happiness to trigger
maxhappiness = 0.7              # Maximum happiness to trigger

[option1]
guiname = First Choice
description = Outcome of first choice
cost = 50                       # Political capital cost
effect = SITUATION,amount       # Game effects
grudge = GROUP,amount           # Opinion change

[option2]
guiname = Second Choice
description = Outcome of second choice
effect = GDP,0.05
```

**Trigger Conditions**: Comma-separated list of required policies/situations

---

### Dilemma Files (.txt)

**Location**: `data/simulation/dilemmas/*.txt`

**Format**: Similar to events but with `influencer` field

```ini
[config]
name = dilemma_id
guiname = Dilemma Title
description = Dilemma description
influencer = PolicyName         # Policy that triggers this

[choice1]
text = What player sees
script = Implementation logic
grudge = GROUP,amount
```

---

## CSV Data Files

### General CSV Format

- **Encoding**: UTF-8
- **Delimiter**: Comma (`,`)
- **Headers**: First row contains column names
- **Quotes**: Use for values containing commas

---

### policies.csv

**Location**: `data/simulation/policies.csv`

**Required Columns**:
```
name                    # Unique policy identifier (no spaces)
guiname                 # Display name (or translation key)
description             # Policy description
category                # Policy category (tax, welfare, transport, etc.)
implementation_cost     # Cost to implement (political capital)
cancellation_cost       # Cost to cancel (political capital)
```

**Optional Common Columns**:
```
slider                  # Associated political slider
income                  # Base income/cost per turn
income_eq               # Income equation
min_income              # Minimum income
max_income              # Maximum income
x                       # X position in UI
y                       # Y position in UI
```

**Effect Columns**: Format is `effectname` or `effectname_eq`
```
GDP                     # Direct effect on GDP
GDP_eq                  # Equation for GDP effect
Unemployment            # Effect on unemployment
Unemployment_eq         # Equation for unemployment effect
```

**Example Row**:
```csv
name,guiname,category,implementation_cost,income,GDP_eq
CARBON_TAX,Carbon Tax,tax,50,-100,(x*200),0.05
```

**Effect Equation Syntax**:
- `x`: Policy strength (0.0 to 1.0)
- `(x*100)`: Multiply policy strength by 100
- `(1-x)`: Inverse of policy strength
- Supports: `+`, `-`, `*`, `/`, `()`, mathematical functions

---

### situations.csv

**Location**: `data/simulation/situations.csv`

**Structure**: Similar to policies.csv

**Key Differences**:
- No `implementation_cost` (situations are triggered, not implemented)
- Includes `trigger` conditions
- May have `decay` rate

**Example**:
```csv
name,guiname,trigger,GDP_eq,Unemployment
RECESSION,Recession,GDP<40,(-0.15),(0.05)
```

---

### sliders.csv

**Location**: `data/simulation/sliders.csv`

**Columns**:
```
name                    # Slider identifier
guiname                 # Display name
description             # Slider description
min_name                # Label for minimum value
max_name                # Label for maximum value
default                 # Default starting value (0.0-1.0)
x                       # UI X position
y                       # UI Y position
```

**Example**:
```csv
name,guiname,min_name,max_name,default
Economy,Economic Policy,Socialist,Capitalist,0.5
```

---

### simulation.csv

**Location**: `data/simulation/simulation.csv`

**Purpose**: Global simulation parameters

**Format**:
```csv
parameter,value
GDP_GROWTH_RATE,0.03
INFLATION_BASE,0.02
```

---

## Override Files (.ini)

**Location**: `data/overrides/*.ini`

**Purpose**: Modify relationships between game elements

**Structure**:
```ini
[override]
TargetName = WhatToModify       # Policy, situation, or slider to affect
HostName = WhatCausesEffect     # Policy or situation causing effect
Equation = (mathematical)       # How host affects target
Inertia = 5                     # Rate of change (higher = slower)
```

**Example - Policy Affects Opinion**:
```ini
[override]
TargetName = Environmentalist   # Voter group
HostName = CARBON_TAX           # Policy
Equation = (x*0.25)             # x = policy strength (0-1)
Inertia = 8                     # Takes 8 turns to reach full effect
```

**Example - Policy Affects Game Variable**:
```ini
[override]
TargetName = AirQuality
HostName = CARBON_TAX
Equation = (x*0.1)
Inertia = 12
```

**Equation Variables**:
- `x`: Host policy/situation strength (0.0 to 1.0)
- `y`: Current target value (in some contexts)

---

## Graphics Files

### SVG Icons (.svg)

**Location**: `data/svg/*.svg`

**Purpose**: Scalable UI icons for policies and situations

**Naming Convention**: Match policy/situation internal name
```
CARBON_TAX.svg          # Icon for CARBON_TAX policy
RECESSION.svg           # Icon for RECESSION situation
```

**Specifications**:
- Vector format (SVG 1.1)
- Recommended size: 64x64px viewport
- Simple, recognizable designs
- Limited color palette for clarity

---

### PNG Graphics (.png)

**Locations**:
- `data/bitmaps/*.png` - UI elements
- `data/missions/[country]/[country].png` - Country flags

**Specifications**:
- Transparent backgrounds recommended
- Power-of-2 dimensions preferred (64x64, 128x128, etc.)
- Keep file sizes small for performance

---

## Common Data Types

### Boolean Values
```
0 = False/No/Off
1 = True/Yes/On
```

### Floating Point (Decimal)
```
0.5                     # Half
1.0                     # Full
-0.25                   # Negative quarter
```

### Ranges
```
0.0 to 1.0             # Policy strength, slider position
-1.0 to 1.0            # Effects (negative = bad, positive = good)
0 to 100               # Percentages (in some contexts)
```

### Equations

**Syntax**: Mathematical expressions in parentheses
```
(x)                     # Direct value
(x*100)                 # Multiply by constant
(x*0.5+10)              # Multiple operations
(1-x)                   # Inversion
(x^2)                   # Exponentiation
```

**Common Patterns**:
```
(x*0.1)                 # Weak effect
(x*0.5)                 # Medium effect
(x*1.0) or (x)          # Strong effect
(x*2.0)                 # Very strong effect
(1-x)*0.3               # Inverse relationship
```

---

### String Values

**Internal Names** (name fields):
- Lowercase preferred
- No spaces (use underscores)
- Alphanumeric only
- Example: `carbon_tax`, `RECESSION`, `ForeignPolicy`

**Display Names** (guiname fields):
- Can use spaces and capitals
- Can reference translation keys
- Example: `Carbon Tax`, `Economic Recession`

**Translation Keys**: Prefix with `#`
```
guiname = #POLICY_CARBON_TAX
```
Looks up translation in `translations/[language]/policies.csv`

---

### Color Values

**Format**: `R,G,B,Alpha`
```
255,0,0,255             # Red
0,128,255,200           # Semi-transparent blue
```

**Range**: 0-255 for each component

---

## File Encoding Notes

- **Character Encoding**: UTF-8 (with or without BOM)
- **Line Endings**: Windows (CRLF) or Unix (LF) both supported
- **Comments**: Not officially supported in CSV/INI files
  - Use separate documentation instead

---

## Validation Tips

### Common Errors

1. **Missing Required Fields**
   - Error: Game won't load mod
   - Fix: Ensure config.txt has name, guiname, author, description

2. **Invalid CSV Format**
   - Error: Data not loaded
   - Fix: Check for unquoted commas, missing headers

3. **Typos in References**
   - Error: Effects don't work
   - Fix: Verify policy/situation names match exactly

4. **Invalid Equation Syntax**
   - Error: Effect calculated incorrectly or not at all
   - Fix: Test equations, use proper parentheses

5. **Circular Dependencies**
   - Error: Game lag or crash
   - Fix: Avoid A affects B affects A situations

### Testing Workflow

1. Create minimal test file
2. Load game and check for errors in log
3. Verify content appears in-game
4. Test functionality during gameplay
5. Iterate and refine

---

## Example: Complete Minimal Mod

**File Structure**:
```
my_test_mod/
├── config.txt
└── data/
    └── simulation/
        ├── policies.csv
        └── situations.csv
```

**config.txt**:
```ini
[config]
name = my_test_mod
guiname = My Test Mod
author = YourName
description = A simple test mod adding one policy.
```

**policies.csv**:
```csv
name,guiname,description,category,implementation_cost,income,GDP_eq
TEST_POLICY,Test Policy,A simple test policy,tax,10,50,(x*25)
```

**situations.csv**:
```csv
name,guiname,description,trigger
TEST_SITUATION,Test Situation,Triggered when test policy active,TEST_POLICY>0.5
```

This minimal mod adds one policy and one situation that triggers when the policy is implemented.

---

## Additional Resources

- See `architecture_overview.md` for high-level mod structure
- See `modding_quickstart.md` for step-by-step creation guide
- See `practice_exercises.md` for hands-on examples
