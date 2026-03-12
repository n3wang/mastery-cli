# Democracy 4 Modding Fundamentals Flashcards

## Basic Structure and Configuration

#### Mod Configuration File Purpose
Democracy 4 uses a data-driven architecture where mods are discovered and loaded by reading configuration files. The config.txt file serves as the mod's entry point and contains metadata that the game engine uses to identify, display, and load the mod.

The file uses INI-style format with a [config] section:
```ini
[config]
name = my_mod           # Internal identifier (lowercase, no spaces)
guiname = My Mod        # Display name shown to players
author = Creator        # Mod creator name
description = ...       # What the mod does
```

Without this file, the game cannot recognize the folder as a valid mod.
:p What is the purpose of config.txt in a Democracy 4 mod and what are its required fields?
??x
The config.txt file is the mod's entry point that tells the game engine how to identify and load the mod.

Required fields in the [config] section:
- `name`: Internal identifier (lowercase, no spaces)
- `guiname`: Display name shown in-game
- `author`: Mod creator's name
- `description`: Explanation of mod's purpose

Example:
```ini
[config]
name = my_mod
guiname = My Awesome Mod
author = YourName
description = Adds new taxation policies
```
x??

---

#### Directory Structure Convention
Democracy 4 follows a strict hierarchical folder structure. The game engine expects specific folders for different content types. This modular organization allows the engine to efficiently load only relevant data and prevents file conflicts between mods.

```
mod_folder/
├── config.txt              # Mod metadata (required)
└── data/                   # All game data
    ├── simulation/         # Core mechanics
    │   ├── policies.csv
    │   ├── situations.csv
    │   └── events/
    ├── missions/           # Country configs
    ├── overrides/          # Mechanic modifications
    └── svg/                # UI icons
```

The engine scans specific paths in order, so placing files in wrong locations will cause them to not load.
:p What is the standard directory structure for a Democracy 4 mod and why is it important?
??x
The standard structure organizes content by type so the game engine can efficiently locate and load files:

```
mod_name/
├── config.txt
└── data/
    ├── simulation/      # policies.csv, situations.csv, events/, dilemmas/
    ├── missions/        # Country-specific configs
    ├── overrides/       # .ini files for modifying mechanics
    ├── svg/             # Vector icons
    └── bitmaps/         # PNG graphics
```

This structure is crucial because:
- Game engine scans specific paths for specific file types
- Wrong location = file won't load
- Prevents naming conflicts between mods
- Allows modular content loading
x??

---

## Policy System

#### Policy CSV Structure - Basic Columns
Policies in Democracy 4 are defined in CSV files using a tabular format. Each row represents one policy with columns defining its properties. The CSV must have a header row with exact column names that the game engine recognizes.

Basic structure:
```csv
name,guiname,description,category,implementation_cost
CARBON_TAX,Carbon Tax,A tax on carbon emissions,tax,50
```

The game engine parses this at load time and creates internal policy objects. Column order doesn't matter, but spelling must be exact. Missing required columns will cause the policy to fail loading.
:p What are the required basic columns in a Democracy 4 policies.csv file?
??x
Required basic columns for a policy:

```csv
name,guiname,description,category,implementation_cost
```

- `name`: Unique internal identifier (UPPERCASE_SNAKE_CASE convention)
- `guiname`: Display name shown to players
- `description`: Tooltip text explaining the policy
- `category`: Policy category (tax, welfare, transport, etc.)
- `implementation_cost`: Political capital required to implement

Example:
```csv
name,guiname,description,category,implementation_cost
LUXURY_TAX,Luxury Goods Tax,Taxes on expensive items,tax,35
```

The header row must match exactly what the engine expects or columns won't be recognized.
x??

---

#### Policy Effect Columns - Dual Field System
Democracy 4 uses a dual-field system for policy effects. Each effect can have both a base value and an equation that scales with policy strength. This allows fine-grained control over how effects scale from 0% to 100% implementation.

```csv
name,Wealthy,Wealthy_eq,GDP,GDP_eq
MY_POLICY,-0.05,-(x*0.05),0,(x*0.03)
```

When implemented:
- At x=0.0 (policy off): effects are 0
- At x=0.5 (50% strength): Wealthy = -0.025, GDP = +0.015
- At x=1.0 (100% strength): Wealthy = -0.05, GDP = +0.03

The `x` variable represents policy strength (0.0 to 1.0). The base value is often set to the maximum effect, with the equation using `x` to scale it proportionally.
:p How does Democracy 4's dual-field effect system work for policies?
??x
Each effect has two optional fields: base value and equation.

Format: `EffectName` and `EffectName_eq`

```csv
Wealthy,Wealthy_eq,GDP,GDP_eq
-0.08,-(x*0.08),0.05,(x*0.05)
```

Scaling logic:
```pseudocode
final_effect = base_value + evaluate_equation(equation, x)
where x = policy_strength (0.0 to 1.0)

Example at x=0.5:
Wealthy = -0.08 + (-(0.5*0.08)) = -0.04
GDP = 0.05 + (0.5*0.05) = 0.025
```

Common pattern:
- Base value = maximum effect at x=1.0
- Equation = (x*base_value) for linear scaling

This allows non-linear effects too: `(x^2*0.1)` for exponential scaling.
x??

---

#### Policy Income System with Min/Max Ranges
Democracy 4 policies can generate or consume government revenue. The income system supports three modes: fixed income, equation-based, or min/max range. The range system is particularly useful for taxes that scale with policy strength.

```csv
name,income,min_income,max_income
TAX_POLICY,0,50,300
SUBSIDY,-150,0,0
```

Calculation logic:
```pseudocode
if (min_income exists AND max_income exists):
    final_income = min_income + (x * (max_income - min_income))
else if (income_eq exists):
    final_income = evaluate(income_eq, x)
else:
    final_income = income
```

For TAX_POLICY at x=0.5: income = 50 + (0.5 * (300-50)) = 175
:p How does the income range system work in Democracy 4 policies?
??x
Policies can define income using three fields: `income`, `min_income`, `max_income`

When min/max are both set, income scales linearly with policy strength:

```pseudocode
final_income = min_income + (x * (max_income - min_income))
where x = policy_strength (0.0 to 1.0)
```

Example:
```csv
name,income,min_income,max_income
LUXURY_TAX,0,50,300
```

At different strengths:
- x=0.0: income = 50 + (0.0 * 250) = 50
- x=0.5: income = 50 + (0.5 * 250) = 175
- x=1.0: income = 50 + (1.0 * 250) = 300

Negative values represent costs:
```csv
SOLAR_SUBSIDIES,0,-150,-30
```
At x=1.0, government pays 150 per turn.
x??

---

## Situations System

#### Situation vs Policy Distinction
Democracy 4 separates player-controlled policies from game-triggered situations. This architectural decision creates clear separation between player agency and game simulation. Understanding this distinction is crucial for designing mods.

**Policies**:
- Player implements/cancels them
- Have implementation costs
- Player controls strength via slider
- Example: Carbon Tax, Income Tax

**Situations**:
- Game triggers them based on conditions
- No implementation cost
- Emerge from game state
- Example: Recession, High Crime

```csv
# Policy (player-controlled)
name,implementation_cost,cancellation_cost
CARBON_TAX,50,35

# Situation (game-triggered)
name,trigger,decay
RECESSION,GDP<40,0.05
```

This separation allows the game to create emergent gameplay where player policies cause situations to appear or disappear.
:p What is the architectural difference between policies and situations in Democracy 4?
??x
**Policies** are player-controlled actions:
- Player implements/cancels them
- Have `implementation_cost` and `cancellation_cost`
- Player adjusts strength with slider (x = 0.0 to 1.0)
- Define intended government actions

**Situations** are game-triggered conditions:
- Game automatically activates based on `trigger` conditions
- No implementation cost (not player-controlled)
- Often have `decay` rate (fade over time)
- Represent emergent game state

Comparison:
```csv
# Policy CSV
name,implementation_cost,category
INCOME_TAX,30,tax

# Situation CSV
name,trigger,decay
TAX_REVOLT,INCOME_TAX>0.8,0
```

Design pattern: Policies cause situations
```
Player implements INCOME_TAX at high level
→ Game triggers TAX_REVOLT situation
→ Situation affects voter happiness
→ Player must respond
```
x??

---

## Override System

#### Override Architecture - Effect Injection
The override system is Democracy 4's most powerful modding feature. It allows mods to inject new relationships between existing game elements without modifying base game files. This is the key to mod compatibility and extensibility.

Overrides are defined in .ini files with this structure:
```ini
[override]
TargetName = What_To_Affect      # The thing being modified
HostName = What_Causes_Effect    # The source of the effect
Equation = (x*0.15)              # Mathematical relationship
Inertia = 8                      # Speed of change (higher = slower)
```

Architecture:
```pseudocode
class GameEngine:
    def update_tick():
        for override in loaded_overrides:
            target_value = get_value(override.TargetName)
            host_value = get_value(override.HostName)  # x in equation

            desired_effect = evaluate(override.Equation, x=host_value)
            current_effect = override.current_progress

            # Apply inertia (slow change over time)
            delta = (desired_effect - current_effect) / override.Inertia
            override.current_progress += delta

            apply_effect(override.TargetName, override.current_progress)
```

This allows creating complex cause-effect chains without hardcoding.
:p How does the override system work in Democracy 4 and what is its architectural purpose?
??x
Overrides inject new relationships between game elements using .ini files in `data/overrides/`:

```ini
[override]
TargetName = Capitalist          # What to modify
HostName = CARBON_TAX            # What causes the effect
Equation = -(x*0.12)             # How host affects target
Inertia = 10                     # Rate of change
```

Processing logic:
```pseudocode
every_game_tick():
    host_strength = get_policy_strength("CARBON_TAX")  // x value
    desired_effect = evaluate_equation("-(x*0.12)", x=host_strength)

    // Gradually approach desired effect based on inertia
    current_effect += (desired_effect - current_effect) / inertia

    apply_to_target("Capitalist", current_effect)
```

Architectural benefits:
- No base game file modification needed
- Multiple mods can add overrides without conflicts
- Creates emergent interactions between policies
- Extensible: new policies automatically work with existing overrides

Example: `CARBON_TAX` at x=1.0 with inertia=10 takes 10 turns to reach full effect of -0.12 on Capitalist opinion.
x??

---

#### Inertia System - Gradual State Change
Inertia is Democracy 4's mechanism for realistic, gradual changes in game state. Without inertia, all effects would be instant, creating unrealistic gameplay. The inertia value controls how many game turns it takes for an effect to reach its target strength.

Mathematical model:
```pseudocode
// Each turn, move toward target by 1/inertia of the remaining distance
current_effect = current_effect + (target_effect - current_effect) / inertia

// This creates exponential approach curve
// Higher inertia = slower change
```

Example with inertia = 8:
```
Turn 1: 0.000 → 0.125 (moved 1/8 of gap)
Turn 2: 0.125 → 0.234 (moved 1/8 of remaining gap)
Turn 3: 0.234 → 0.330
Turn 8: 0.634 → 0.680
Turn 16: 0.865 → 0.882
```

The effect asymptotically approaches target, never quite reaching it but getting very close. This creates realistic policy implementation delays.
:p How does the inertia system work in Democracy 4 overrides and why is it important?
??x
Inertia controls how quickly effects reach their target strength, measured in game turns.

Formula (applied each turn):
```pseudocode
current_effect = current_effect + (target_effect - current_effect) / inertia
```

Example: Override with target effect = 1.0 and inertia = 5
```
Turn 0: current = 0.000
Turn 1: current = 0.000 + (1.0 - 0.000)/5 = 0.200
Turn 2: current = 0.200 + (1.0 - 0.200)/5 = 0.360
Turn 3: current = 0.360 + (1.0 - 0.360)/5 = 0.488
Turn 5: current ≈ 0.672
Turn 10: current ≈ 0.893
```

Gameplay implications:
- Low inertia (2-4): Fast changes, immediate impact
- Medium inertia (5-10): Realistic policy implementation
- High inertia (15+): Long-term structural changes

Design pattern:
```ini
# Quick opinion changes
[override]
TargetName = Environmentalist
Inertia = 4

# Slow economic changes
[override]
TargetName = GDP
Inertia = 20
```
x??

---

## Events and Dilemmas

#### Event File Structure - Multi-Option Choices
Events in Democracy 4 are defined in .txt files using INI-style sections. Each event presents a scenario with 2-4 choices. The architecture separates configuration (triggers, conditions) from choices (player decisions and consequences).

Structure:
```ini
[config]
name = event_id                  # Internal identifier
guiname = Event Title            # Display name
description = What happened      # Event description
trigger = POLICY1,POLICY2        # Required policies/situations
minhappiness = 0.3              # Trigger conditions
maxhappiness = 0.8

[option1]
guiname = First Choice
description = Outcome description
cost = 50                        # Political capital cost
effect = GDP,0.05               # Game state changes
grudge = Environmentalist,0.10  # Opinion changes

[option2]
guiname = Second Choice
description = Alternative outcome
cost = 0
effect = Environmentalist,0.03
```

The game engine randomly triggers events when:
1. All trigger conditions met
2. Happiness in specified range
3. Random chance succeeds
:p What is the structure of a Democracy 4 event file and how do options work?
??x
Events are .txt files in `data/simulation/events/` with INI-style sections:

**Config section** (required):
```ini
[config]
name = tax_protest
guiname = Tax Protest
description = Citizens protest high taxes
trigger = INCOME_TAX,SALES_TAX     # Comma-separated requirements
minhappiness = 0.2
maxhappiness = 0.6
```

**Option sections** (2-4 options):
```ini
[option1]
guiname = Reduce taxes
description = Lower taxes to appease protesters
cost = 25                    # Political capital cost
effect = INCOME_TAX,-0.2    # Reduce policy strength
grudge = Poor,0.15          # Opinion improvement

[option2]
guiname = Ignore protests
cost = 0
grudge = Poor,-0.10         # Opinion worsens
```

Trigger logic:
```pseudocode
can_trigger = (
    all_policies_in_trigger_list_are_active() AND
    current_happiness >= minhappiness AND
    current_happiness <= maxhappiness AND
    random() < event_probability
)
```

Each option creates different gameplay consequences through `effect` and `grudge` fields.
x??

---

#### Grudge System - Permanent Opinion Changes
The grudge system in Democracy 4 represents lasting opinion changes from player decisions. Unlike temporary policy effects, grudges persist even after policies are cancelled. This creates meaningful long-term consequences for player choices.

Architecture:
```pseudocode
class VoterGroup:
    current_opinion: float
    base_opinion: float
    policy_effects: float       # Temporary (from active policies)
    grudges: List[float]        # Permanent (from past events)

    def calculate_opinion():
        total = base_opinion
        total += sum(policy_effects)      # Goes away when policy cancelled
        total += sum(grudges)             # Persists forever
        return clamp(total, -1.0, 1.0)
```

Event example:
```ini
[option1]
guiname = Suppress union strike
cost = 40
grudge = TradeUnionist,-0.20    # Permanent -0.20 to union opinion
grudge = Capitalist,0.10        # Permanent +0.10 to capitalist opinion
```

Once chosen, these opinion modifiers become part of the save game and affect gameplay for the rest of the playthrough. This creates strategic depth: short-term gains may cause long-term political problems.
:p How does the grudge system work in Democracy 4 events and why is it architecturally significant?
??x
Grudges are permanent opinion changes stored separately from temporary policy effects.

Data structure:
```pseudocode
VoterGroup:
    base_opinion: 0.0
    temporary_effects: []      // From active policies (removable)
    permanent_grudges: []      // From events (persistent)

    total_opinion():
        return base + sum(temporary_effects) + sum(permanent_grudges)
```

Event application:
```ini
[option1]
grudge = Wealthy,-0.15    # Permanent decrease
grudge = Poor,0.20        # Permanent increase
```

After player chooses option1:
```pseudocode
game.voter_groups["Wealthy"].grudges.append(-0.15)
game.voter_groups["Poor"].grudges.append(0.20)
// These persist in save file forever
```

Comparison:
```
Policy effect:
  CARBON_TAX active → Capitalist opinion -0.08
  Cancel CARBON_TAX → Effect disappears

Grudge:
  Choose "Nationalize Oil" → Capitalist grudge -0.25
  Even years later → Grudge remains -0.25
```

Strategic implication: Events create permanent political landscape changes, forcing players to consider long-term coalition building.
x??

---

## Mission System

#### Mission Configuration - Country Definition
Missions in Democracy 4 define playable countries. Each country is a complete game scenario with economic parameters, initial policy settings, and unique characteristics. The mission system demonstrates extensive use of data-driven design.

Structure:
```
data/missions/[country_code]/
├── [country].txt           # Main configuration
├── [country]map.svg        # Map graphic
├── [country].png           # Flag icon
└── overrides/              # Country-specific .ini files
```

Mission file structure:
```ini
[config]
currency = $
population = 330000000
minincome = 200
maxincome = 1200
minGDP = 8000
maxGDP = 24000
debt = 15000
economiccycle = 0.5          # 0.0 = recession, 1.0 = boom

[policies]
IncomeTax = 0.65            # Initial policy strength (0.0-1.0)
HealthcareSpending = 0.80
MilitarySpending = 0.45

[flags]
has_coast = 1               # Boolean flags
royal_family = 0
```

This data-driven approach allows modders to add entire countries without coding.
:p How are countries defined in Democracy 4's mission system?
??x
Countries are defined in `data/missions/[country_code]/[country].txt` using three main sections:

**[config] - Economic parameters**:
```ini
currency = €
population = 67000000
minincome = 150              # Government income bounds
maxincome = 900
minGDP = 2000               # GDP bounds (billions)
maxGDP = 3000
debt = 2500                 # Starting debt
economiccycle = 0.6         # Economic position (0=recession, 1=boom)
wealthmodifier = 1.2        # Wealth adjustment
```

**[policies] - Starting policy values**:
```ini
IncomeTax = 0.70            # Each policy 0.0 (off) to 1.0 (max)
PublicTransport = 0.55
StateHealthcare = 0.85
```

**[flags] - Country characteristics**:
```ini
has_coast = 1               # Boolean features
royal_family = 0
oil_producer = 1
```

Loading logic:
```pseudocode
load_mission(country_code):
    config = parse_ini(f"missions/{country_code}/{country_code}.txt")

    game.set_economy(config.GDP, config.debt, config.income)

    for policy, strength in config.policies:
        game.policies[policy].set_strength(strength)

    game.flags = config.flags
```

This allows creating new countries purely through data files.
x??

---

## Advanced Techniques

#### Translation System Architecture
Democracy 4 uses a key-based translation system that separates game logic from displayed text. This allows mods to support multiple languages without duplicating game data.

Architecture pattern:
```csv
# data/simulation/policies.csv (game logic)
name,guiname,description
CARBON_TAX,#POLICY_CARBON_TAX_NAME,#POLICY_CARBON_TAX_DESC

# translations/english/policies.csv (display text)
Key,Translation
POLICY_CARBON_TAX_NAME,Carbon Tax
POLICY_CARBON_TAX_DESC,A tax on carbon emissions

# translations/french/policies.csv
Key,Translation
POLICY_CARBON_TAX_NAME,Taxe Carbone
POLICY_CARBON_TAX_DESC,Une taxe sur les émissions de carbone
```

Resolution logic:
```pseudocode
class LocalizationManager:
    translations: Dict[string, string]  // Loaded from current language

    def get_text(key: string) -> string:
        if key.startswith("#"):
            lookup_key = key[1:]  // Remove # prefix
            return translations.get(lookup_key, key)  // Fallback to key
        else:
            return key  // Direct text, no translation
```

This architecture allows one mod to work in multiple languages with separate translation files.
:p How does Democracy 4's translation system work architecturally?
??x
Translation uses a key-based lookup system with `#` prefix to denote translation keys:

**Game data references keys**:
```csv
# policies.csv
name,guiname,description
MY_POLICY,#POLICY_MY_NAME,#POLICY_MY_DESC
```

**Translation files provide text**:
```csv
# translations/english/policies.csv
Key,Translation
POLICY_MY_NAME,My Policy
POLICY_MY_DESC,This policy does something

# translations/spanish/policies.csv
Key,Translation
POLICY_MY_NAME,Mi Política
POLICY_MY_DESC,Esta política hace algo
```

**Resolution algorithm**:
```pseudocode
display_text(input_string, current_language):
    if input_string.starts_with("#"):
        key = input_string.substring(1)  // Remove #
        translation_file = f"translations/{current_language}/policies.csv"
        lookup_table = load_csv(translation_file)

        if key in lookup_table:
            return lookup_table[key]
        else:
            return key  // Fallback: show key if translation missing
    else:
        return input_string  // Direct text, no translation
```

Benefits:
- One mod works in multiple languages
- Game logic separated from display text
- Easy to add new languages without modifying core files
x??

---

#### SVG Naming Convention - Automatic Icon Mapping
Democracy 4 uses a convention-over-configuration approach for policy/situation icons. Instead of explicitly mapping icons to policies in data files, the game uses file naming conventions for automatic association.

Pattern:
```
Policy internal name: CARBON_TAX
Required SVG filename: CARBON_TAX.svg
Location: data/svg/CARBON_TAX.svg
```

Loading algorithm:
```pseudocode
class IconLoader:
    icon_cache: Dict[string, SVG]

    def load_policy_icon(policy_name: string) -> SVG:
        icon_path = f"data/svg/{policy_name}.svg"

        if file_exists(icon_path):
            return load_svg(icon_path)
        else:
            return default_policy_icon  // Fallback generic icon
```

This means:
```csv
# policies.csv
name,guiname
LUXURY_TAX,Luxury Goods Tax
DIGITAL_TAX,Digital Services Tax
```

Automatically looks for:
- `data/svg/LUXURY_TAX.svg`
- `data/svg/DIGITAL_TAX.svg`

No explicit mapping needed. This reduces configuration overhead and makes the system self-documenting: filename tells you exactly which policy it's for.
:p How does Democracy 4 automatically map SVG icons to policies?
??x
Democracy 4 uses convention-over-configuration: SVG filename must exactly match policy internal name.

**Automatic mapping**:
```
Policy defined in CSV:
  name: CARBON_TAX

Icon file that will be loaded:
  data/svg/CARBON_TAX.svg

Policy defined in CSV:
  name: SOLAR_SUBSIDIES

Icon file that will be loaded:
  data/svg/SOLAR_SUBSIDIES.svg
```

**Loading logic**:
```pseudocode
load_icons_for_policies():
    for policy in all_policies:
        icon_filename = policy.name + ".svg"
        icon_path = "data/svg/" + icon_filename

        if file_exists(icon_path):
            policy.icon = load_svg_file(icon_path)
        else:
            policy.icon = default_generic_icon
```

**Benefits of this pattern**:
- No explicit icon mapping needed in CSV files
- Self-documenting: filename tells you which policy
- Easy to add icons: just create file with right name
- Missing icons automatically fallback to default

**Exact matching required**:
```
CARBON_TAX.svg ✓ (correct)
carbon_tax.svg ✗ (wrong case)
CarbonTax.svg ✗ (wrong format)
CARBON_TAX.png ✗ (wrong extension, use bitmaps/ for PNG)
```
x??

---

#### Equation System - Dynamic Effect Calculation
Democracy 4 uses string-based mathematical equations that are parsed and evaluated at runtime. This allows modders to define complex non-linear relationships without programming.

Supported equation features:
```
Variables:
  x = policy/situation strength (0.0 to 1.0)

Operators:
  + - * / (arithmetic)
  ^ (exponentiation)
  () (grouping)

Examples:
  (x*0.5)           → Linear: 0.0 to 0.5
  (x^2*0.8)         → Quadratic: accelerating effect
  (1-x)*0.3         → Inverse: effect decreases as x increases
  (x*0.5+0.1)       → Linear with offset: 0.1 to 0.6
```

Parser architecture:
```pseudocode
class EquationEvaluator:
    def evaluate(equation: string, x: float) -> float:
        # Tokenize equation string
        tokens = tokenize(equation)  // "(", "x", "*", "0.5", ")"

        # Build expression tree
        tree = parse_expression(tokens)

        # Substitute variables
        tree = substitute_variable(tree, "x", x)

        # Evaluate tree recursively
        return calculate(tree)

    def calculate(node):
        if node.is_number():
            return node.value
        elif node.is_operator():
            left = calculate(node.left)
            right = calculate(node.right)
            return apply_operator(node.operator, left, right)
```

This allows modders to create sophisticated scaling without code.
:p How does Democracy 4's equation system work and what patterns can be used?
??x
Equations are string expressions parsed and evaluated at runtime with `x` as the policy strength variable (0.0 to 1.0).

**Common patterns**:

```
Linear scaling:
  (x*0.5)
  At x=0.0: 0.0
  At x=0.5: 0.25
  At x=1.0: 0.5

Linear with minimum:
  (x*0.4+0.1)
  At x=0.0: 0.1
  At x=0.5: 0.3
  At x=1.0: 0.5

Inverse (decreases as policy increases):
  (1-x)*0.3
  At x=0.0: 0.3
  At x=0.5: 0.15
  At x=1.0: 0.0

Quadratic (accelerating):
  (x^2*0.8)
  At x=0.0: 0.0
  At x=0.5: 0.2
  At x=1.0: 0.8
```

**Evaluation algorithm**:
```pseudocode
evaluate_effect(policy):
    x = policy.current_strength  // 0.0 to 1.0
    equation = policy.effect_equation  // "(x*0.5)"

    // Parse and evaluate
    result = parse_and_calculate(equation, x)

    return result
```

**Usage in CSV**:
```csv
name,GDP_eq,Wealthy_eq
MY_POLICY,(x*0.03),-(x^2*0.1)
```

Allows complex relationships without programming.
x??

---

## Data Flow and Architecture

#### Mod Loading Sequence
Understanding the mod loading sequence is crucial for debugging why mods don't work or conflict. Democracy 4 loads mods in a specific order, and later loads can override earlier ones.

Loading sequence:
```pseudocode
1. Game Launch
   └─> Scan for mods
       ├─> Check Documents/My Games/Democracy4/mods/
       └─> Check Steam/workshop/content/1410710/

2. Mod Discovery Phase
   for each folder in mod_directories:
       if exists(folder + "/config.txt"):
           mod = parse_config(folder + "/config.txt")
           discovered_mods.append(mod)

3. User Selection (Main Menu)
   └─> Player enables/disables mods
   └─> Player sets load order (if supported)

4. Mod Loading Phase (New Game Start)
   load_base_game_data()  // Load vanilla content first

   for mod in enabled_mods (in order):
       load_mod_data(mod):
           if exists(mod.path + "/data/simulation/policies.csv"):
               merge_or_override(policies, load_csv(policies.csv))

           if exists(mod.path + "/data/simulation/situations.csv"):
               merge_or_override(situations, load_csv(situations.csv))

           if exists(mod.path + "/data/overrides/"):
               for ini_file in override_folder:
                   add_override(load_ini(ini_file))

5. Game State Initialization
   └─> Apply mission configuration
   └─> Initialize simulation with merged data
```

Conflict resolution: Last loaded mod wins for duplicate entries (same `name` field).
:p What is the mod loading sequence in Democracy 4 and how are conflicts resolved?
??x
Mod loading follows a specific multi-phase sequence:

**Phase 1 - Discovery**:
```pseudocode
scan_directories([
    "Documents/My Games/Democracy4/mods/",
    "Steam/workshop/content/1410710/"
])

discovered_mods = []
for folder in all_mod_folders:
    if file_exists(folder + "/config.txt"):
        discovered_mods.add(parse_mod_config(folder))
```

**Phase 2 - User Selection** (main menu):
- Player enables/disables mods
- Sets load order (last = highest priority)

**Phase 3 - Data Loading** (new game):
```pseudocode
// 1. Load base game first
game_data = load_vanilla_data()

// 2. Load each enabled mod in order
for mod in enabled_mods:
    mod_policies = load_csv(mod.path + "/data/simulation/policies.csv")

    // Merge: add new, override existing
    for policy in mod_policies:
        if policy.name in game_data.policies:
            game_data.policies[policy.name] = policy  // Override
        else:
            game_data.policies.add(policy)  // Add new

    // Same for situations, events, etc.

// 3. Load all overrides (these add, don't conflict)
for mod in enabled_mods:
    for override_file in mod.overrides:
        game_data.overrides.add(load_override(override_file))
```

**Conflict resolution**:
- Same policy name: Last loaded mod wins
- Different names: Both coexist
- Overrides: All accumulate (can have multiple overrides on same target)
x??

---

#### Effect Accumulation Architecture
Democracy 4 uses an accumulator pattern for calculating final game state values. Multiple policies, situations, and overrides all contribute to final values like GDP, opinion, etc. Understanding this is key to balancing mods.

Architecture:
```pseudocode
class GameSimulation:
    base_values: Dict[string, float]      // Starting values
    policy_effects: List[Effect]          // From active policies
    situation_effects: List[Effect]       // From active situations
    override_effects: List[Effect]        // From override system

    def calculate_final_value(variable_name: string) -> float:
        total = base_values[variable_name]

        // Accumulate policy effects
        for policy in active_policies:
            effect = policy.get_effect(variable_name)
            if effect:
                total += evaluate_effect(effect, policy.strength)

        // Accumulate situation effects
        for situation in active_situations:
            effect = situation.get_effect(variable_name)
            if effect:
                total += evaluate_effect(effect, situation.strength)

        // Accumulate override effects
        for override in active_overrides:
            if override.target == variable_name:
                total += override.current_effect

        return clamp(total, min_value, max_value)
```

Example calculation for GDP with multiple sources:
```
Base GDP: 50.0
+ Policy CARBON_TAX effect: -0.02
+ Policy TECH_SUBSIDIES effect: +0.05
+ Situation RECESSION effect: -0.08
+ Override (TECH_SUBSIDIES → GDP): +0.03
= Final GDP: 49.98
```

This accumulation means mods can add effects without replacing existing ones.
:p How does Democracy 4 accumulate effects from multiple sources to calculate final values?
??x
Democracy 4 uses an accumulator pattern where all effects are summed to produce final values:

**Accumulation algorithm**:
```pseudocode
calculate_final_value(variable_name):
    total = base_value

    // 1. Add active policy effects
    for policy in active_policies:
        if policy.has_effect_on(variable_name):
            strength = policy.current_strength  // x value
            equation = policy.equations[variable_name]
            effect = evaluate(equation, x=strength)
            total += effect

    // 2. Add active situation effects
    for situation in active_situations:
        if situation.has_effect_on(variable_name):
            effect = evaluate(situation.equations[variable_name])
            total += effect

    // 3. Add override effects (with inertia)
    for override in active_overrides:
        if override.target == variable_name:
            total += override.current_accumulated_effect

    return clamp(total, minimum, maximum)
```

**Concrete example for Environmentalist opinion**:
```
Base opinion: 0.0

Active effects:
+ CARBON_TAX (x=1.0): +(1.0*0.15) = +0.15
+ COAL_PHASEOUT (x=0.8): +(0.8*0.20) = +0.16
+ OIL_SUBSIDIES (x=0.6): -(0.6*0.10) = -0.06
+ Situation CLIMATE_CRISIS: -0.05
+ Override (SOLAR_SUBSIDIES → Environmentalist): +0.08
+ Grudge from past event: -0.10

Final = 0.0 + 0.15 + 0.16 - 0.06 - 0.05 + 0.08 - 0.10 = 0.18
```

This allows multiple mods to affect same variables without conflicts.
x??

---

#### Category System - Organizational Pattern
Democracy 4 uses a string-based category system to organize policies in the UI. This is a soft categorization system - categories have no mechanical effect, only organizational.

```csv
# policies.csv
name,category,guiname
INCOME_TAX,tax,Income Tax
CARBON_TAX,tax,Carbon Tax
STATE_HEALTHCARE,welfare,State Healthcare
PUBLIC_TRANSPORT,transport,Public Transport
```

UI organization:
```pseudocode
class PolicyUIManager:
    policies_by_category: Dict[string, List[Policy]]

    def organize_policies():
        for policy in all_policies:
            category = policy.category

            if category not in policies_by_category:
                policies_by_category[category] = []

            policies_by_category[category].append(policy)

    def render_ui():
        for category, policies in policies_by_category:
            render_category_section(category):
                for policy in policies:
                    render_policy_button(policy)
```

Common categories found in mods:
- `tax` - Taxation policies
- `welfare` - Social programs
- `transport` - Transportation infrastructure
- `environment` - Environmental policies
- `technology` - Tech and innovation
- `law` - Legal and justice
- `foreign` - Foreign policy

Modders can create new categories by using any string. The game automatically creates UI sections for new categories.
:p How does the category system work in Democracy 4 and what is its purpose?
??x
Categories are string values that group policies in the UI but have no mechanical effects:

**Definition in CSV**:
```csv
name,category,guiname
INCOME_TAX,tax,Income Tax
LUXURY_TAX,tax,Luxury Goods Tax
STATE_HEALTHCARE,welfare,Healthcare Program
EDUCATION_FUNDING,welfare,Education Spending
```

**UI organization logic**:
```pseudocode
// Game automatically groups by category
organize_policy_ui():
    categories = {}

    for policy in all_policies:
        cat = policy.category

        if cat not in categories:
            categories[cat] = []

        categories[cat].append(policy)

    // Render UI with tabs/sections
    for category_name, policy_list in categories:
        create_ui_section(category_name)
        for policy in policy_list:
            add_policy_button_to_section(policy)
```

**Standard categories**:
- tax, welfare, transport, environment, technology, law, foreign

**Creating custom categories**:
```csv
name,category
MY_SPACE_POLICY,space
MY_CYBERWAR_POLICY,cyber
```
Game automatically creates new UI sections.

**No mechanical effect**: Category is purely organizational, doesn't affect gameplay or interactions.
x??

---

## Advanced Modding Patterns

#### Trigger Condition System
Events and dilemmas use trigger conditions to determine when they can occur. The trigger system uses a simple comma-separated list that represents an OR relationship between conditions.

Syntax:
```ini
[config]
trigger = POLICY1,POLICY2,SITUATION1
```

Evaluation logic:
```pseudocode
can_trigger_event(event):
    trigger_list = parse_csv(event.trigger)  // ["POLICY1", "POLICY2", "SITUATION1"]

    // Check if ANY condition is met (OR logic)
    for condition in trigger_list:
        if is_policy(condition):
            if policy_is_active(condition) AND policy_strength > 0:
                return true
        elif is_situation(condition):
            if situation_is_active(condition):
                return true

    return false  // None of the triggers are met
```

Example:
```ini
# Event triggers if EITHER condition is true:
trigger = CARBON_TAX,COAL_PHASEOUT

# Triggers if carbon tax OR coal phaseout is active
# Does NOT require both
```

For AND logic, you need multiple separate checks or use override system to create a combined situation:
```ini
# Create situation that only exists when both policies active
[override]
TargetName = BOTH_POLICIES_SITUATION
HostName = CARBON_TAX
Equation = (x*y)  # Would need both policy strengths
```
:p How does the trigger system work for Democracy 4 events?
??x
Triggers use comma-separated lists evaluated as OR conditions (any trigger satisfies):

**Trigger definition**:
```ini
[config]
name = climate_summit
trigger = CARBON_TAX,RENEWABLE_SUBSIDIES,COAL_PHASEOUT
minhappiness = 0.4
maxhappiness = 1.0
```

**Evaluation algorithm**:
```pseudocode
can_event_trigger(event):
    triggers = split(event.trigger, ",")  // ["CARBON_TAX", "RENEWABLE_SUBSIDIES", "COAL_PHASEOUT"]

    // OR logic: any one trigger being active is sufficient
    for trigger_name in triggers:
        element = find_policy_or_situation(trigger_name)

        if element exists AND element.is_active() AND element.strength > 0:
            // Additional checks
            if event.minhappiness <= current_happiness <= event.maxhappiness:
                return true

    return false
```

**Behavior examples**:
```ini
# Event can trigger if ANY of these is active:
trigger = POLICY_A,POLICY_B,SITUATION_C

Scenarios:
- POLICY_A active, others inactive → CAN trigger
- POLICY_B active, others inactive → CAN trigger
- All three active → CAN trigger
- None active → CANNOT trigger
```

**AND logic workaround** (require multiple conditions):
```ini
# Create intermediate situation
# situations.csv
name,trigger_a_eq,trigger_b_eq
BOTH_ACTIVE,(a*b),calculation based on both

# Then event triggers on that situation
trigger = BOTH_ACTIVE
```
x??

---

#### Policy Opposition System
Some mods implement policy opposition relationships where certain policies are mutually exclusive or conflict with each other. This is done through the `opposite` column in policies.csv.

```csv
name,opposite,implementation_cost
FREE_MARKET_ECONOMY,PLANNED_ECONOMY,60
PLANNED_ECONOMY,FREE_MARKET_ECONOMY,60
```

Game engine behavior:
```pseudocode
class Policy:
    name: string
    opposite: string  // Name of conflicting policy

def implement_policy(policy_name):
    policy = get_policy(policy_name)

    if policy.opposite:
        opposite_policy = get_policy(policy.opposite)

        if opposite_policy.is_active():
            // Option 1: Prevent implementation
            show_error("Cannot implement - conflicts with " + opposite_policy.guiname)
            return false

            // Option 2: Auto-cancel opposite
            cancel_policy(opposite_policy)
            show_message("Cancelled " + opposite_policy.guiname)

    activate_policy(policy)
    return true
```

Design pattern for ideological opposites:
```csv
# Economic spectrum
name,opposite
SOCIALIST_ECONOMY,CAPITALIST_ECONOMY
CAPITALIST_ECONOMY,SOCIALIST_ECONOMY

# Energy policy
name,opposite
COAL_EXPANSION,COAL_PHASEOUT
COAL_PHASEOUT,COAL_EXPANSION
```

This creates meaningful policy choices and prevents nonsensical combinations.
:p How does the policy opposition system work in Democracy 4?
??x
Policies can declare opposite/conflicting policies using the `opposite` column:

**CSV definition**:
```csv
name,opposite,guiname
FREE_HEALTHCARE,PRIVATE_HEALTHCARE,Free Universal Healthcare
PRIVATE_HEALTHCARE,FREE_HEALTHCARE,Private Healthcare System
COAL_EXPANSION,RENEWABLE_FOCUS,Expand Coal Production
RENEWABLE_FOCUS,COAL_EXPANSION,Focus on Renewables
```

**Enforcement logic**:
```pseudocode
implement_policy(policy):
    if policy.opposite exists:
        opposite = find_policy(policy.opposite)

        if opposite.is_active():
            // Game handles conflict - typically one of:

            // Option A: Block new policy
            error("Cannot enable: conflicts with " + opposite.name)
            return BLOCKED

            // Option B: Auto-cancel opposite
            cancel_policy(opposite)
            warning("Automatically cancelled " + opposite.name)
            // Continue with implementation

    set_policy_active(policy)
    return SUCCESS
```

**Symmetric relationships** (both policies list each other):
```csv
name,opposite
A,B
B,A
```

**Asymmetric relationships** (one-way block):
```csv
name,opposite
UNIVERSAL_BASIC_INCOME,
WORKFARE_PROGRAM,UNIVERSAL_BASIC_INCOME
```
UBI doesn't block workfare, but workfare blocks UBI.

Creates strategic policy choices and prevents contradictory combinations.
x??

---

#### Multi-Language Fallback Strategy
Professional mods implement fallback strategies for missing translations to ensure the mod works even if translations are incomplete.

Fallback hierarchy:
```
1. Try specific language translation
2. Fall back to English translation
3. Fall back to direct text in CSV
4. Fall back to internal name
```

Implementation pattern:
```pseudocode
class TranslationManager:
    current_language: string
    translations: Dict[string, Dict[string, string]]  // [language][key] = text

    def get_text(key: string) -> string:
        // Check if it's a translation key
        if not key.startswith("#"):
            return key  // Direct text

        lookup_key = key[1:]  // Remove #

        // 1. Try current language
        if current_language in translations:
            if lookup_key in translations[current_language]:
                return translations[current_language][lookup_key]

        // 2. Fall back to English
        if "english" in translations:
            if lookup_key in translations["english"]:
                return translations["english"][lookup_key]

        // 3. Fall back to key itself
        return lookup_key
```

Best practice mod structure:
```
my_mod/
├── data/simulation/
│   └── policies.csv          # Use # keys: #MOD_POLICY1_NAME
├── translations/
│   ├── english/              # Required: always provide English
│   │   └── policies.csv
│   ├── french/               # Optional
│   │   └── policies.csv
│   └── spanish/              # Optional
│       └── policies.csv
```

This ensures mod works for all players regardless of language settings.
:p How should mods implement translation fallback strategies in Democracy 4?
??x
Implement multi-level fallback to ensure mod works in all languages:

**Fallback hierarchy**:
```pseudocode
get_translated_text(key):
    // Level 1: Try user's language
    if translations[current_language].has(key):
        return translations[current_language][key]

    // Level 2: Fall back to English
    if translations["english"].has(key):
        return translations["english"][key]

    // Level 3: Use raw key as text
    return key.replace("#", "").replace("_", " ")
```

**Best practice structure**:
```
my_mod/
├── data/simulation/
│   └── policies.csv
│       # Always use translation keys:
│       # name,guiname
│       # MY_POLICY,#MYMOD_POLICY_NAME
├── translations/
│   └── english/           # ALWAYS provide English (fallback)
│       └── policies.csv
│           # Key,Translation
│           # MYMOD_POLICY_NAME,My Policy
```

**Example with multiple languages**:
```csv
# data/simulation/policies.csv
name,guiname,description
GREEN_TAX,#GREENTAX_NAME,#GREENTAX_DESC

# translations/english/policies.csv (required)
Key,Translation
GREENTAX_NAME,Green Tax
GREENTAX_DESC,A tax on pollution

# translations/french/policies.csv (optional)
Key,Translation
GREENTAX_NAME,Taxe Verte
GREENTAX_DESC,Une taxe sur la pollution
```

If French translation missing:
- French user sees English text (fallback)
- Better than showing "#GREENTAX_NAME" or crashing

**Key naming convention**: Prefix with mod name to avoid conflicts:
```
#MYMOD_POLICY1_NAME
#MYMOD_SITUATION1_DESC
```
x??

---

#### Data-Driven Voter Group System
Democracy 4's architecture treats voter groups as data entities that policies and situations affect through declarative relationships. Understanding this pattern is key to creating balanced mods.

Voter group architecture:
```pseudocode
class VoterGroup:
    name: string              // "Wealthy", "Poor", "Environmentalist"
    base_size: float          // Percentage of population (0.0-1.0)
    current_opinion: float    // -1.0 (hate) to 1.0 (love)

    effects_from_policies: List[PolicyEffect]
    effects_from_situations: List[SituationEffect]
    permanent_grudges: List[float]

    def calculate_opinion():
        total = 0.0

        for policy_effect in effects_from_policies:
            total += policy_effect.value

        for situation_effect in effects_from_situations:
            total += situation_effect.value

        for grudge in permanent_grudges:
            total += grudge

        return clamp(total, -1.0, 1.0)
```

Policies declare effects on voter groups through columns:
```csv
name,Wealthy,Wealthy_eq,Poor,Poor_eq,Environmentalist,Environmentalist_eq
LUXURY_TAX,-0.08,-(x*0.08),0,0,0,0
WEALTH_REDISTRIBUTION,-0.15,-(x*0.15),0.12,(x*0.12),0,0
```

This creates a data-driven web of relationships where:
- Policies affect multiple voter groups
- Each voter group is affected by multiple policies
- Net opinion emerges from accumulation
- No hardcoded logic needed
:p How does Democracy 4's data-driven voter group system work architecturally?
??x
Voter groups are data entities affected by declarative policy relationships through CSV columns:

**Policy declares effects on groups**:
```csv
name,Wealthy,Wealthy_eq,Poor,Poor_eq,Environmentalist,Environmentalist_eq
INCOME_TAX,-0.10,-(x*0.10),0.05,(x*0.05),0,0
```

**Voter group accumulation**:
```pseudocode
class VoterGroup:
    name: string
    base_opinion: 0.0

    calculate_total_opinion():
        total = base_opinion

        // Scan ALL policies for effects on this group
        for policy in active_policies:
            if policy.has_column(this.name + "_eq"):
                equation = policy.columns[this.name + "_eq"]
                effect = evaluate(equation, x=policy.strength)
                total += effect

        // Scan situations
        for situation in active_situations:
            if situation.has_column(this.name + "_eq"):
                effect = evaluate(situation.columns[this.name + "_eq"])
                total += effect

        // Add permanent grudges
        total += sum(this.grudges)

        return clamp(total, -1.0, 1.0)
```

**Multi-way relationships**:
```
Policy: WEALTH_TAX
├─> Affects Wealthy: -(x*0.15)
├─> Affects Capitalist: -(x*0.12)
├─> Affects Poor: +(x*0.08)
└─> Affects Socialist: +(x*0.10)

VoterGroup: Wealthy
├─ Affected by WEALTH_TAX: -0.15
├─ Affected by LUXURY_TAX: -0.08
├─ Affected by TAX_HAVENS: +0.20
└─ Net opinion: -0.03
```

**No hardcoded logic**: All relationships declared in data files, allowing mods to extend without code changes.
x??

---

#### Slider Association Pattern
Policies can optionally associate with political sliders, creating a relationship between policy implementation and political positioning. This is used for calculating political capital costs and voter alignment.

```csv
name,slider,implementation_cost
CARBON_TAX,Environment,40
INCOME_TAX,TaxationVsSpending,30
MILITARY_EXPANSION,MilitaryVsEducation,55
```

Slider system architecture:
```pseudocode
class PoliticalSlider:
    name: string                    // "Environment", "TaxationVsSpending"
    current_position: float         // 0.0 to 1.0
    min_label: string              // "Low Tax"
    max_label: string              // "High Tax"

    def calculate_position():
        # Determined by active policies associated with this slider
        total_weight = 0.0
        total_contribution = 0.0

        for policy in active_policies:
            if policy.slider == this.name:
                weight = policy.strength
                total_weight += weight
                total_contribution += (policy.slider_value * weight)

        if total_weight > 0:
            return total_contribution / total_weight
        else:
            return 0.5  // Neutral position
```

The slider position then affects:
1. **Political capital costs**: Policies aligned with current slider position are cheaper
2. **Voter expectations**: Voter groups prefer certain slider positions
3. **Ideological consistency**: Game tracks player's ideological profile

Example:
```
Environment Slider at 0.2 (low environmental focus)

Implementing COAL_EXPANSION (slider: Environment, expects low position):
  Base cost: 40
  Alignment bonus: -10
  Final cost: 30

Implementing CARBON_TAX (slider: Environment, expects high position):
  Base cost: 40
  Misalignment penalty: +15
  Final cost: 55
```
:p How does the slider association system work in Democracy 4 policies?
??x
Policies optionally associate with political sliders through the `slider` column:

**Policy definition**:
```csv
name,slider,implementation_cost
CARBON_TAX,Environment,40
INCOME_TAX,TaxationVsSpending,35
FREE_HEALTHCARE,PublicServices,50
```

**Slider calculation from active policies**:
```pseudocode
calculate_slider_position(slider_name):
    weighted_sum = 0.0
    total_weight = 0.0

    for policy in active_policies:
        if policy.slider == slider_name:
            # Policy strength contributes to slider position
            weighted_sum += policy.strength * policy.target_slider_position
            total_weight += policy.strength

    if total_weight > 0:
        return weighted_sum / total_weight
    else:
        return 0.5  // Neutral
```

**Effects of slider position**:

1. **Implementation cost adjustment**:
```pseudocode
calculate_implementation_cost(policy):
    base_cost = policy.implementation_cost

    if policy.slider exists:
        current_slider = get_slider_position(policy.slider)
        alignment = abs(current_slider - policy.preferred_position)

        if alignment < 0.2:
            cost_modifier = -0.25  // 25% cheaper (aligned)
        else:
            cost_modifier = alignment * 0.5  // More expensive if misaligned

        return base_cost * (1 + cost_modifier)

    return base_cost
```

2. **Voter group reactions**: Groups have slider preferences
3. **Political consistency**: Game tracks ideological coherence

**Example**:
```
Current slider: TaxationVsSpending = 0.7 (high tax)

Implement WEALTH_TAX (slider: TaxationVsSpending, high-tax policy):
  Aligned with current position → Cheaper, voters expect it

Implement TAX_CUTS (slider: TaxationVsSpending, low-tax policy):
  Contradicts current position → More expensive, voters confused
```
x??

