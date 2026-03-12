# Democracy 4 Mod Architecture Overview

## Table of Contents
1. [Introduction](#introduction)
2. [Directory Structure](#directory-structure)
3. [Core Components](#core-components)
4. [Data Flow](#data-flow)
5. [Modding Philosophy](#modding-philosophy)

---

## Introduction

Democracy 4 uses a modular, data-driven architecture that allows extensive customization through mods. The game engine reads configuration files in various formats (CSV, TXT, INI, SVG) to define game mechanics, content, and behavior.

### Design Principles
- **Data-Driven**: Game logic is defined in external files, not hardcoded
- **Modular**: Each mod can target specific game aspects without conflicts
- **Hierarchical**: Mods override base game data in a predictable manner
- **Localized**: Separate translation files support multiple languages

---

## Directory Structure

Every Democracy 4 mod follows this standardized structure:

```
[MOD_ID]/
├── config.txt                          # Mod metadata (REQUIRED)
├── data/                               # Core game data (OPTIONAL subdirs)
│   ├── simulation/                     # Game mechanics and simulation
│   │   ├── policies.csv               # Policy definitions
│   │   ├── situations.csv             # Game situations/crises
│   │   ├── sliders.csv                # Political spectrum sliders
│   │   ├── simulation.csv             # Simulation parameters
│   │   ├── prereqs.txt                # Policy prerequisites
│   │   ├── events/                    # Random game events (.txt)
│   │   └── dilemmas/                  # Player decision dilemmas (.txt)
│   │
│   ├── missions/                       # Country-specific configurations
│   │   ├── [country_code]/            # e.g., usa, eng, fra, deu
│   │   │   ├── [country].txt          # Country config & defaults
│   │   │   ├── [country].png          # Country flag (optional)
│   │   │   ├── overrides/             # Country-specific .ini files
│   │   │   └── scripts/               # Custom scripts (optional)
│   │   └── ...
│   │
│   ├── overrides/                      # .ini files to modify mechanics
│   ├── bitmaps/                        # .png UI graphics
│   ├── svg/                            # .svg vector icons
│   ├── spin/                           # Political faction messaging
│   ├── names/                          # NPC name lists
│   └── palettes/                       # UI color schemes
│
└── translations/                       # Localization files
    ├── english/                        # English translations
    │   ├── policies.csv
    │   ├── situations.csv
    │   ├── spin.csv
    │   └── ...
    └── [language]/                     # Other languages
        └── ...
```

### Key Directory Descriptions

| Directory | Purpose | Required? |
|-----------|---------|-----------|
| `config.txt` | Mod metadata and identification | YES |
| `data/simulation/` | Core game mechanics data | Recommended |
| `data/missions/` | Country-specific game starts | Optional |
| `data/overrides/` | Modify existing game mechanics | Optional |
| `data/svg/` | UI icons for policies/situations | Optional |
| `translations/` | Localized text | Optional |

---

## Core Components

### 1. Mod Configuration (config.txt)

**Location**: `[MOD_ID]/config.txt`

**Purpose**: Identifies the mod and provides metadata

**Format**: INI-style configuration
```ini
[config]
name = my_mod_id              # Internal identifier (lowercase, no spaces)
guiname = My Mod Display Name # Display name shown in-game
author = Your Name            # Mod creator
description = Description...  # What the mod does
path = [local_path]           # Original development path (optional)
```

**Required Fields**: `name`, `guiname`, `author`, `description`

---

### 2. Policies (policies.csv)

**Location**: `data/simulation/policies.csv`

**Purpose**: Define in-game policies that players can implement

**Structure**:
```csv
name,guiname,category,implementation_cost,slider,income,income_eq,...
```

**Key Columns**:
- `name`: Internal policy identifier
- `guiname`: Display name (can use translation keys)
- `category`: Policy category (e.g., tax, welfare, transport)
- `implementation_cost`: Cost to implement (in game currency)
- `slider`: Associated political slider
- `income`: Base income generated/spent
- `income_eq`: Income calculation equation
- Effect columns: Define how policy affects game variables

**Example**:
```csv
name,guiname,category,implementation_cost,slider
CARBON_TAX,Carbon Tax,tax,50,Environment
```

---

### 3. Situations (situations.csv)

**Location**: `data/simulation/situations.csv`

**Purpose**: Define game conditions, crises, and scenarios

**Structure**: Similar to policies.csv with different effect types

**Key Columns**:
- `name`: Internal situation identifier
- `guiname`: Display name
- `trigger`: Conditions that activate this situation
- Effect columns: How the situation impacts game variables

---

### 4. Events & Dilemmas

**Location**:
- Events: `data/simulation/events/*.txt`
- Dilemmas: `data/simulation/dilemmas/*.txt`

**Purpose**: Define random events and player choices

**Format**: INI-style with multiple sections
```ini
[config]
name = event_id
guiname = Event Title
trigger = [conditions]

[option1]
description = First choice
effect = [changes]

[option2]
description = Second choice
effect = [changes]
```

---

### 5. Missions (Country Configurations)

**Location**: `data/missions/[country_code]/[country].txt`

**Purpose**: Define country-specific game starts

**Format**: INI-style configuration
```ini
[config]
currency = $
population = 330000000
GDP = [value]
debt = [value]
map = data/missions/usa/usmap.svg

[policies]
PolicyName = 0.5  # Value between 0.0 and 1.0
```

**Key Sections**:
- `[config]`: Country metadata and economic parameters
- `[policies]`: Initial policy values
- `[flags]`: Country-specific features (has_coast, royal_family, etc.)

---

### 6. Overrides (.ini files)

**Location**: `data/overrides/*.ini`

**Purpose**: Modify how existing game mechanics work

**Format**:
```ini
[override]
TargetName = policy_or_situation_to_modify
HostName = source_policy_or_situation
Equation = mathematical_relationship
Inertia = rate_of_change
```

**Example**:
```ini
[override]
TargetName = Capitalist
HostName = ForeignInvestorTaxBreaks
Equation = (x*0.15)
Inertia = 4
```

This makes Capitalist opinion increase based on ForeignInvestorTaxBreaks policy.

---

## Data Flow

### Game Loading Process

1. **Base Game Load**: Democracy 4 loads default game data
2. **Mod Discovery**: Scans workshop/mods directories for `config.txt` files
3. **Mod Loading**: Loads each active mod in order
4. **Data Override**: Mod data overrides/extends base game data
5. **Validation**: Checks for conflicts and missing dependencies

### Mod Priority

When multiple mods modify the same content:
- Last loaded mod takes precedence
- Load order can be controlled by users
- Dependencies should be declared in mod descriptions

### Data Relationships

```
Policies ──influences──> Situations
   │                         │
   │                         │
   v                         v
Sliders <──affects──── Voter Groups
   │
   │
   v
Events/Dilemmas
```

---

## Modding Philosophy

### What Makes a Good Mod?

1. **Focused Scope**: Target specific aspects rather than changing everything
2. **Balance**: Ensure new content doesn't break game balance
3. **Compatibility**: Minimize conflicts with other popular mods
4. **Documentation**: Clear descriptions of what the mod changes
5. **Testing**: Playtest across multiple countries and scenarios

### Common Mod Types

| Type | Complexity | Examples |
|------|------------|----------|
| **Policy Addition** | Low | Add 1-5 new policies |
| **Situation Addition** | Low | Add new crises/scenarios |
| **Country Addition** | Medium | Add new playable countries |
| **Mechanical Tweaks** | Medium | Adjust balance, caps, equations |
| **Expansion Pack** | High | Multiple policies + situations + events |
| **Complete Overhaul** | Very High | Redesign game systems |

### Compatibility Considerations

**Low Conflict Risk**:
- Adding new policies with unique names
- Adding new countries
- Adding UI graphics (SVG/PNG)

**Medium Conflict Risk**:
- Adding events/dilemmas (if triggering on same conditions)
- Modifying sliders
- Adding situations that affect same variables

**High Conflict Risk**:
- Overriding existing policies/situations
- Changing simulation.csv global parameters
- Modifying base game missions

---

## Best Practices

### Naming Conventions
- Use descriptive, unique names for new content
- Prefix custom content with mod identifier (e.g., `MYMOD_PolicyName`)
- Avoid special characters in internal names

### File Organization
- Keep related content together
- Use subdirectories for large mods
- Comment complex equations and logic

### Version Control
- Track changes in mod description
- Indicate compatibility with game version
- Mark dependencies on other mods

### Testing Checklist
- [ ] Mod loads without errors
- [ ] New content appears in-game
- [ ] No crashes during gameplay
- [ ] Balance feels appropriate
- [ ] Works across multiple countries
- [ ] Compatible with popular mods (if possible)

---

## Next Steps

- See `file_format_reference.md` for detailed file format specifications
- See `modding_quickstart.md` for step-by-step mod creation guide
- See `practice_exercises.md` for hands-on learning exercises
