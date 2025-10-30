# Democracy 4 Modding - Basic Concepts

#### Mod Configuration File Structure
Every Democracy 4 mod requires a `config.txt` file at the root that identifies the mod to the game engine. This file uses INI format with a [config] section containing metadata fields like name (unique identifier), guiname (display name), author, description, and the original path where it was developed.

Example:
```ini
[config]
name = mymod
guiname = My Amazing Mod
author = ModAuthor
description = This mod adds new features
path = C:\Users\...\Democracy4\mods\mymod
```
:p What is the purpose of config.txt and what are its essential fields?
??x
config.txt identifies the mod to the game engine and provides metadata.

Essential fields:
- name: Unique mod identifier
- guiname: Display name shown to players
- author: Creator attribution
- description: Mod details
- path: Original development path

All fields are inside [config] section using INI format.
x??

---

#### Primary Data Format
Democracy 4 mods use CSV (Comma-Separated Values) files as the primary data format for defining game mechanics. CSV files contain tabular data where the first row defines column headers and subsequent rows define individual entities. The most important CSV files are policies.csv (defines all policies), simulation.csv (defines economic indicators and simulation variables), situations.csv (defines dynamic world situations), and sliders.csv (defines policy slider controls).

```pseudocode
CSV Structure:
Row 1: #,column1,column2,column3,...
Row 2: #,value1,value2,value3,...
Row 3: #,value1,value2,value3,...

First column is always # (comment marker)
Values can be: numbers, text, formulas, lists
```
:p What file format is primarily used for defining game mechanics in Democracy 4 mods and what are the four main CSV files?
??x
CSV (Comma-Separated Values) is the primary data format.

Four main CSV files:
1. policies.csv - Defines all policies available in game
2. simulation.csv - Defines economic indicators and simulation variables
3. situations.csv - Defines dynamic world situations
4. sliders.csv - Defines policy slider controls (discrete/percentage)

First row contains column headers, subsequent rows define entities.
x??

---

#### Standard Mod Directory Structure
Democracy 4 mods follow a consistent directory structure. The data/ directory contains all game content: simulation/ for core mechanics (CSV files for policies, situations, etc.), missions/ for country-specific content, overrides/ for global modifications, svg/ for vector graphics, bitmaps/ for raster images, and names/ for character name files. The translations/ directory contains subdirectories for each language with localized CSV files.

```
[MOD_ID]/
├── config.txt
├── data/
│   ├── simulation/      # Core mechanics CSV files
│   ├── missions/        # Country-specific data
│   ├── overrides/       # Global INI overrides
│   ├── svg/            # Icons and maps (SVG)
│   ├── bitmaps/        # Event images (JPG/PNG)
│   └── names/          # Character name files
└── translations/
    ├── English/        # English localization CSVs
    ├── French/         # French localization CSVs
    └── [LANGUAGE]/     # Other languages
```
:p What is the standard directory structure for a Democracy 4 mod?
??x
Root contains config.txt

data/ directory contains:
- simulation/ - Core mechanics CSV files
- missions/ - Country-specific content
- overrides/ - Global INI modification files
- svg/ - Vector graphics (icons, maps)
- bitmaps/ - Raster images (JPG/PNG)
- names/ - Character name files

translations/ directory contains:
- [LANGUAGE]/ subdirectories with localized CSV files
- Each language has its own translations for all content
x??

---

#### INI Override System Purpose
The override system allows mods to modify relationships between existing game entities without replacing entire files. Override files use .ini format and can ADD new effects, REPLACE existing equations, or DELETE relationships entirely. This enables compositional design where multiple mods can stack together. Override files can be global (in data/overrides/) or mission-specific (in data/missions/[country]/overrides/).

```ini
[override]
TargetName = "CO2Emissions"     # Variable being affected
HostName = "RoadBuilding"       # Policy causing the effect
Equation = "0.01+(0.01*x)"      # New/modified formula
Inertia = 0                     # How quickly effect applies
```

```pseudocode
Override Operations:
IF override file exists for TargetName + HostName:
    IF Equation is provided:
        REPLACE existing relationship equation
    IF Equation = "DELETE":
        REMOVE relationship entirely
    ELSE:
        ADD new relationship

    Apply with Inertia rate (0=immediate, 1=very gradual)
```
:p What is the purpose of INI override files in Democracy 4 and what operations can they perform?
??x
Override files modify relationships between game entities without replacing entire files.

Three operations:
1. ADD - Create new effect relationship (HostName affects TargetName)
2. REPLACE - Modify existing equation with new formula
3. DELETE - Remove relationship entirely (Equation = "DELETE")

Structure:
- TargetName: Variable being affected
- HostName: Policy/entity causing effect
- Equation: Mathematical formula or "DELETE"
- Inertia: How quickly effect applies (0=instant, 1=gradual)

Enables compositional design where multiple mods stack together.
x??

---

#### Mission Configuration File
Each playable country/scenario in Democracy 4 is defined by a mission configuration file (e.g., afghan.txt in data/missions/afghan/). This file specifies economic starting conditions, initial policy values, demographic data, and special options. Key fields include population (in thousands), currency code, GDP ranges, wealth modifiers, starting debt, and initial apathy. The [policies] section sets starting values for all policies (typically 0-1 range), and [options] section enables feature flags like MULTIPLEPARTIES.

```ini
[config]
currency = "AFN"
population = 18146              # In thousands
economic_cycle_start = 0.25     # Economic state (0-1)
min_income = 0
max_income = 122000             # Max GDP per capita
name = afghan                   # Mission identifier
GUID = 11                       # Unique ID
difficulty = 5                  # 0-10 scale

[policies]
PolicyName1 = 0.5               # Initial value (0-1)
PolicyName2 = 0.0
...

[options]
MULTIPLEPARTIES                 # Feature flags
```

```pseudocode
Mission Initialization:
1. Load mission config from missions/[name]/[name].txt
2. Set economic parameters (GDP, income ranges, wealth_mod)
3. Initialize debt and apathy levels
4. Apply all [policies] section values to game state
5. Enable features from [options] section
6. Load country-specific overrides from missions/[name]/overrides/
```
:p What does a mission configuration file define and what are its main sections?
??x
Mission config defines a playable country/scenario with starting conditions.

Main sections:
1. [config] - Economic and demographic parameters
   - population, currency, GDP ranges
   - economic_cycle_start, wealth_mod
   - starting_debt, apathy, difficulty
   - name, GUID (unique identifier)

2. [policies] - Initial policy values
   - Each policy set to starting value (usually 0-1 range)

3. [options] - Feature flags
   - Enable special mechanics (e.g., MULTIPLEPARTIES)

Located at: data/missions/[country]/[country].txt
x??

---

#### Layered Architecture Model
Democracy 4's modding system uses a 5-layer architecture. Layer 1 is the game engine (base game with core simulation). Layer 2 is CSV data files that mods can extend. Layer 3 is the override system where mods customize relationships. Layer 4 is mission-specific content for each country. Layer 5 is presentation (SVG icons, images, maps). This design principle is "immutable base + overlays" - the game engine remains unchanged while mods only add or override data.

```
Layer 5: Presentation (SVG/PNG icons, maps, event images)
    ↓
Layer 4: Mission-Specific (country configs, events, dilemmas, scripts)
    ↓
Layer 3: Override System (INI files modify relationships)
    ↓
Layer 2: CSV Data Files (policies, situations, simulation variables)
    ↓
Layer 1: Game Engine (core simulation loop, UI, player interaction)
```

```pseudocode
Game Startup Process:
1. Load Game Engine (Layer 1)
2. Load Base CSV Data (Layer 2)
3. Apply Global Overrides (Layer 3)
4. Load Selected Mission (Layer 4)
5. Apply Mission Overrides (Layer 3 mission-specific)
6. Load Presentation Assets (Layer 5)
7. Start Simulation Loop

Each layer builds on previous layers without replacing them
```
:p What are the 5 layers of Democracy 4's modding architecture and how do they interact?
??x
5 Layers (bottom to top):

1. Game Engine - Core simulation loop, UI, player interaction
2. CSV Data Files - policies.csv, simulation.csv, situations.csv, sliders.csv
3. Override System - INI files that modify relationships
4. Mission-Specific - Country configs, events, dilemmas, setup scripts
5. Presentation - SVG icons, maps, PNG/JPG images

Interaction:
- Each layer builds on previous without replacing
- "Immutable base + overlays" design
- Mods only add/override data, never modify engine
- Multiple overrides stack compositionally

Load order: Engine → Base CSV → Global Overrides → Mission → Mission Overrides → Assets
x??

---

