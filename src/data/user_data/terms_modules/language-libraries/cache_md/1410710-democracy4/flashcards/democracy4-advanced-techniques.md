# Democracy 4 Modding - Advanced Techniques and Patterns

#### Mission-Specific Override Strategy
Large mods create global mechanics in data/simulation/ CSV files, then customize per-country using mission-specific overrides in data/missions/[country]/overrides/. This compositional approach maintains consistency across countries while allowing regional flavor. Each country can have 80+ override files tweaking relationships for historical accuracy or balance. The pattern is: define base mechanics globally, then layer exceptions regionally.

```
Directory structure:
data/
├── simulation/
│   ├── policies.csv              # Global policy definitions
│   └── situations.csv            # Global situations
├── overrides/
│   └── global_change.ini         # Applies to all missions
└── missions/
    ├── usa/
    │   ├── usa.txt               # USA-specific config
    │   └── overrides/
    │       ├── militaryLiberal.ini    # USA: military affects liberals differently
    │       ├── taxCapitalist.ini      # USA: tax policy affects capitalists more
    │       └── [80+ more files]
    └── uk/
        ├── uk.txt
        └── overrides/
            └── [different set of overrides]
```

```pseudocode
Loading Process:
FUNCTION load_mod_with_mission(mod_id, mission_name):
    // Step 1: Load base game
    load_base_game_data()

    // Step 2: Load mod's global content
    load_csv_files(mod_id + "/data/simulation/")

    // Step 3: Apply mod's global overrides
    FOR each file in mod_id + "/data/overrides/*.ini":
        apply_override(file)

    // Step 4: Load selected mission config
    mission_config = load(mod_id + "/data/missions/" + mission_name + ".txt")
    apply_mission_config(mission_config)

    // Step 5: Apply mission-specific overrides
    FOR each file in mod_id + "/data/missions/" + mission_name + "/overrides/*.ini":
        apply_override(file)  // Can replace global effects

    // Result: Global consistency + regional flavor

Example override:
Global: MilitarySpending increases Conservative support
USA override: MilitarySpending increases Liberal support (interventionism)
UK override: MilitarySpending decreases Liberal support (peace tradition)
```
:p What is the mission-specific override strategy and why is it used in large mods?
??x
Strategy: Define global mechanics, then customize per-country with overrides.

Structure:
1. data/simulation/ - Global CSV definitions (policies, situations)
2. data/overrides/ - Global override files (apply to all missions)
3. data/missions/[country]/[country].txt - Country config
4. data/missions/[country]/overrides/ - Country-specific overrides (80+ files per country)

Loading order:
1. Base game
2. Mod's global CSVs
3. Mod's global overrides
4. Mission config
5. Mission-specific overrides (can replace global)

Benefits:
- Consistency across countries (same policies everywhere)
- Regional flavor (different political dynamics)
- Historical accuracy (e.g., USA vs UK military politics)
- Easier maintenance (fix global, exceptions stay)

Example:
Global: MilitarySpending → Conservative
USA: MilitarySpending → Liberal (interventionism tradition)

Compositional design: base + exceptions
x??

---

#### Complex Event Trigger Probability Curves
Advanced mods use multiple influences with different equation types to create sophisticated probability curves. Combining _random_ (baseline), linear policy effects, and polynomial situation effects creates events that feel contextually appropriate. Example: military coup more likely with high military spending (linear) AND low democracy (polynomial), ensuring it only fires in realistic scenarios.

```
Sophisticated event triggers:

[influences]
0 = _random_,0,0.05                    # 5% baseline (can happen randomly)
1 = MilitarySpending,0+(0.2*x)         # Linear: 0-20% from military
2 = Democracy,0.3-(0.3*x)              # Inverse: high democracy prevents
3 = Stability,0+(0.15*(x^2))           # Quadratic: instability accelerates
4 = Corruption,0.05+(0.1*x)            # Linear: corruption increases risk

Total probability calculation:
base = 0.05
military_factor = 0 + (0.2 * MilitarySpending)
democracy_factor = 0.3 - (0.3 * Democracy)  // High democracy reduces
stability_factor = 0 + (0.15 * Stability^2)
corruption_factor = 0.05 + (0.1 * Corruption)

total = base + military + democracy + stability + corruption
```

```pseudocode
Advanced Trigger Design:
FUNCTION design_event_trigger(event_name, desired_contexts):
    influences = []

    // Always include small random chance
    influences.add("_random_,0,0.05")

    // Add enabling factors (increase probability)
    FOR each enabling_policy in desired_contexts.enablers:
        // Use linear or polynomial based on desired sensitivity
        IF should_scale_gradually(enabling_policy):
            influences.add(enabling_policy + ",0+(0.15*x)")
        ELSE:  // Should only matter at extremes
            influences.add(enabling_policy + ",0+(0.2*(x^2))")

    // Add preventing factors (decrease probability)
    FOR each preventing_policy in desired_contexts.preventers:
        // Inverse relationships
        influences.add(preventing_policy + ",0.2-(0.2*x)")

    RETURN influences

Example: Military Coup Event
Enablers:
  - MilitarySpending (gradual, linear)
  - Corruption (gradual, linear)
  - Instability (extreme matters, polynomial)

Preventers:
  - Democracy (strong democracy prevents)
  - GDP (prosperity stabilizes)

Result: Coup only likely in specific, realistic scenarios
- High military + low democracy + corruption + instability
- NOT likely in prosperous, democratic nations
```
:p How do advanced mods create sophisticated event trigger probability curves?
??x
Combine multiple influences with different equation types to create contextual triggers.

Components:

1. Baseline random: "_random_,0,0.05"
   - Ensures event CAN happen (5%)
   - Creates unpredictability

2. Linear enablers: "MilitarySpending,0+(0.2*x)"
   - Gradual increase with policy
   - 0-20% additional probability

3. Inverse preventers: "Democracy,0.3-(0.3*x)"
   - High value REDUCES probability
   - Creates protective factors

4. Polynomial accelerators: "Stability,0+(0.15*(x^2))"
   - Only matters at extremes
   - Creates tipping points

Example: Military Coup
- _random_: 5% base
- +MilitarySpending: 0-20% (linear)
- -Democracy: +30% at 0, 0% at 1 (inverse)
- +Instability: 0-15% (quadratic, extremes matter)
- +Corruption: 0-10% (linear)

Result: Only fires in realistic scenarios (authoritarian + unstable + corrupt)
Sophisticated probability curves = contextually appropriate events
x??

---

#### Simulation Variable Specialization
Advanced mods create mini-simulations by adding custom simulation variables that interconnect. Instead of just adding policies, create new simulation variables (like technological_sovereignty, market_distortion_index, state_controlled_gdp) that affect each other and are affected by policies. This creates emergent gameplay where players must understand the new subsystem. Define these in simulation.csv with their own influence chains.

```
Custom simulation variable network (Industrial Economics mod):

New variables in simulation.csv:
- technological_sovereignty (0-1)
- high_tech_industry (0-1)
- trade_balance (-1 to 1)
- infrastructural_profusion (0-1)
- market_distortion_index (0-1)
- state_controlled_gdp (0-1)
- services_participation (0-1)

Interconnections via policies and overrides:
Policy: IndustrialPolicy
  → technological_sovereignty (direct effect)
  → high_tech_industry (direct effect)

Override: technological_sovereignty → GDP
Override: high_tech_industry → Unemployment
Override: trade_balance → ForeignInvestment

Creates subsystem loop:
IndustrialPolicy → tech_sovereignty → GDP → Budget → More IndustrialPolicy
                ↘ high_tech → Jobs → Happiness → Stability
```

```pseudocode
Creating Custom Simulation Subsystem:

Step 1 - Define variables in simulation.csv:
#,technological_sovereignty,CATEGORY,0.5,0,1,LOWBAD,icon_tech,...

Step 2 - Create policies affecting new variables:
Policy: tech_investment
Effects: "technological_sovereignty,0.02+(0.1*x)"
         "high_tech_industry,0.01+(0.05*x)"

Step 3 - Create overrides for variable interactions:
File: tech_sovereignty_affects_gdp.ini
[override]
TargetName = "GDP"
HostName = "technological_sovereignty"
Equation = "0.01+(0.08*x)"
Inertia = 0.7  # Slow effect

Step 4 - Create situations based on new variables:
Situation: tech_dependency
Influences: "technological_sovereignty,0-(0.3*x)"  # Low tech = vulnerable
Effects: "Stability,0-(0.1*x)"  # Creates instability

Design pattern:
1. Identify thematic subsystem (tech, environment, finance)
2. Create 5-10 interconnected variables
3. Add policies to control variables
4. Add overrides for variable interactions
5. Add situations that emerge from variables
6. Creates emergent mini-game within main game
```
:p What is simulation variable specialization and how does it create emergent gameplay?
??x
Creating custom interconnected simulation variables that form mini-simulations.

Instead of just adding policies, add new variables that:
1. Are affected by policies
2. Affect each other
3. Affect core simulation
4. Create new situations

Example (Industrial Economics mod):
New variables:
- technological_sovereignty
- high_tech_industry
- trade_balance
- market_distortion_index

Interconnection chain:
Policy → tech_sovereignty → GDP → Budget
       ↘ high_tech_industry → Unemployment → Happiness

Implementation steps:
1. Define variables in simulation.csv
2. Create policies affecting new variables
3. Create override files for variable interactions
4. Create situations based on new variables
5. Balance feedback loops

Result: Emergent mini-game
- Players must understand new subsystem
- Strategic depth increased
- Thematic coherence (tech policy actually about tech)

Creates 5-10 variable networks for domain-specific gameplay
x??

---

#### Script-Based Mission Initialization
Mission setup scripts (in data/missions/[country]/scripts/) use CreateGrudge commands to initialize unique starting conditions beyond what the mission config allows. Scripts can set demographic grudges, create initial tensions between groups, or establish historical context. This provides narrative flavor and makes each mission feel distinct. Scripts execute once at mission start.

```
Mission script example: data/missions/afghan/scripts/init.txt

CreateGrudge(Liberal,-0.15,0.0);
CreateGrudge(Conservatives,0.20,0.0);
CreateGrudge(Religious,0.35,0.0);
CreateGrudge(Militarist,0.25,0.0);
CreateGrudge(Corruption,0.40,0.0);
CreateGrudge(Poverty,0.50,0.0);
CreateGrudge(_Terrorism,0.30,0.9);
CreateGrudge(Stability,-0.25,0.95);

# Creates initial state reflecting Afghanistan's political context
# Permanent (0.0 decay) for baseline attitudes
# Temporary (0.9-0.95 decay) for active crises
```

```pseudocode
Script Execution System:
FUNCTION initialize_mission(mission_name):
    // Load standard config
    config = load_mission_config(mission_name)
    apply_mission_config(config)

    // Execute init scripts
    script_path = "data/missions/" + mission_name + "/scripts/"

    FOR each script_file in script_path:
        commands = parse_script(script_file)

        FOR each command in commands:
            IF command.type == "CreateGrudge":
                execute_grudge(command.target, command.amount, command.decay)
            // Other command types possible

    // Execute post-load scripts (after all data loaded)
    postload_path = "data/missions/" + mission_name + "/postloadscripts/"
    FOR each script_file in postload_path:
        execute_script(script_file)

Design pattern for mission flavor:
1. Permanent grudges (decay=0.0):
   - Historical political leanings
   - Cultural baselines
   - Structural conditions

2. Slow-decay grudges (decay=0.95-0.99):
   - Active crises
   - Recent historical events
   - Transitional states

3. Medium-decay grudges (decay=0.9):
   - Current events
   - Temporary situations

Example: Post-war country
CreateGrudge(Militarist,0.30,0.0)        # Permanent militarization
CreateGrudge(Stability,-0.40,0.98)       # Recent instability (slow recovery)
CreateGrudge(_Terrorism,0.50,0.9)        # Active threat (medium term)
```
:p How do mission initialization scripts provide narrative flavor in Democracy 4?
??x
Scripts use CreateGrudge commands to set unique starting conditions beyond mission config.

Location: data/missions/[country]/scripts/

Purpose:
- Initialize demographic attitudes
- Create historical context
- Establish unique tensions
- Add narrative flavor

Example (Afghanistan):
CreateGrudge(Religious,0.35,0.0)       # Permanent religious baseline
CreateGrudge(Corruption,0.40,0.0)      # Structural corruption
CreateGrudge(_Terrorism,0.30,0.9)      # Active terrorism threat
CreateGrudge(Stability,-0.25,0.95)     # Recent instability

Decay strategy:
1. Permanent (0.0): Cultural/historical baselines
   - Political leanings, structural issues

2. Slow decay (0.95-0.99): Recent historical events
   - Post-war recovery, transitions

3. Medium decay (0.9): Current crises
   - Active threats, temporary situations

Execution:
- Runs once at mission start
- After config applied, before gameplay
- Can also use postloadscripts/

Makes each country feel historically and politically distinct
x??

---

#### Opposite Policies for Strategic Balance
Defining opposite policies creates forced trade-offs that prevent dominant strategies. By making competing policies mutually exclusive or limiting, players must commit to an economic/political philosophy. This is implemented via the 'opposites' field in policies.csv and sometimes reinforced with negative interaction effects. Example: free market vs state control policies as opposites force players to choose an economic model.

```
Opposite policy patterns:

Economic model opposites:
Policy: free_market_capitalism
  opposites: state_controlled_economy,central_planning

Policy: state_controlled_economy
  opposites: free_market_capitalism,privatization

Effect: Cannot maximize both, must choose economic philosophy

Tax policy opposites:
Policy: income_tax
  opposites: sales_tax,land_value_tax

Policy: land_value_tax
  opposites: income_tax,corporate_tax

Effect: Must choose tax structure strategy
```

```pseudocode
Opposite Policy System:
class Policy {
    name: string
    value: float        // 0-1
    opposites: string[] // List of opposing policy names
}

FUNCTION can_raise_policy(policy_name, target_value):
    policy = get_policy(policy_name)

    FOR each opposite_name in policy.opposites:
        opposite = get_policy(opposite_name)

        // Check if opposite is too high
        IF opposite.value > conflict_threshold:
            // Calculate how much we can raise
            allowed_increase = calculate_allowed(policy, opposite, target_value)

            IF allowed_increase < (target_value - policy.value):
                show_warning("Conflicts with " + opposite_name)
                RETURN false

    RETURN true

FUNCTION calculate_allowed(policy, opposite, target):
    // Higher opposite = less room to raise policy
    conflict_intensity = opposite.value
    max_combined = 1.0  // Total "budget" for both policies

    available = max_combined - conflict_intensity
    RETURN available

Design patterns:
1. Binary opposites (only one can be high):
   - Democracy vs Authoritarianism
   - Free Market vs State Control

2. Portfolio opposites (limited total):
   - Tax types (must choose primary revenue source)
   - Military strategies (can't do everything)

3. Reinforced with effects:
   - free_market → state_control_effectiveness: "0-(0.5*x)"
   - Makes opposite less effective when present
```
:p How do opposite policies create strategic balance and prevent dominant strategies?
??x
Opposite policies force trade-offs by making competing policies mutually exclusive.

Implementation: 'opposites' field in policies.csv

Pattern types:

1. Binary opposites - Only one can be high:
   - free_market_capitalism vs state_controlled_economy
   - Players must choose economic philosophy
   - Cannot maximize both

2. Portfolio opposites - Limited total:
   - income_tax vs sales_tax vs land_value_tax
   - Must choose primary revenue source
   - Diversification limited

3. Reinforced opposites - Negative interactions:
   - Policy A has effect reducing Policy B's effectiveness
   - free_market → state_control_effectiveness: "0-(0.5*x)"
   - Mechanically enforces opposition

Mechanics:
- When raising policy, check opposite values
- If opposite too high, block or limit raise
- Creates "budget" for combined values
- Forces philosophical commitment

Balance benefit:
- Prevents "do everything" strategies
- Creates distinct playstyles
- Increases replayability
- Models realistic political constraints
x??

---

#### Inertia-Based Momentum Systems
Using varying Inertia values across different override types creates realistic momentum in simulation. Public opinion changes slowly (high inertia), economic effects medium speed (medium inertia), and political appointments quickly (low inertia). This creates strategic planning depth where players must think multiple turns ahead for social changes while tactical economic adjustments have faster feedback.

```
Inertia design patterns by domain:

Public Opinion (Inertia 0.8-0.95):
[override]
TargetName = "Liberal"
HostName = "GayMarriage"
Equation = "0.05+(0.1*x)"
Inertia = 0.9           # Very slow cultural shift

Economic Effects (Inertia 0.3-0.6):
[override]
TargetName = "GDP"
HostName = "InfrastructureSpending"
Equation = "0.02+(0.08*x)"
Inertia = 0.5           # Medium-term economic growth

Political Changes (Inertia 0-0.2):
[override]
TargetName = "Bureaucracy"
HostName = "AdministrativeReform"
Equation = "0-(0.15*x)"
Inertia = 0.1           # Quick organizational changes

Infrastructure (Inertia 0.7-0.85):
[override]
TargetName = "TransportQuality"
HostName = "RoadBuilding"
Equation = "0.03+(0.12*x)"
Inertia = 0.8           # Slow physical development
```

```pseudocode
Momentum System Design:
class MomentumCategory {
    name: string
    inertia_range: [float, float]
    justification: string
}

momentum_categories = [
    {
        name: "Public Opinion",
        inertia_range: [0.8, 0.95],
        justification: "Cultural attitudes change slowly, generations"
    },
    {
        name: "Economic Indicators",
        inertia_range: [0.3, 0.6],
        justification: "Markets respond within quarters/years"
    },
    {
        name: "Political Structure",
        inertia_range: [0, 0.2],
        justification: "Organizational changes can be rapid"
    },
    {
        name: "Infrastructure",
        inertia_range: [0.7, 0.85],
        justification: "Physical construction takes time"
    },
    {
        name: "Technology",
        inertia_range: [0.5, 0.7],
        justification: "Innovation and adoption moderate speed"
    }
]

FUNCTION assign_inertia(override):
    category = determine_category(override.target)
    inertia = select_from_range(category.inertia_range)
    override.inertia = inertia

Strategic implications:
- Fast domains: Tactical adjustments, quick feedback
- Slow domains: Long-term planning, patient investment
- Mixed approach: Players must balance short and long-term goals

Example gameplay:
Turn 1: Invest in education (high inertia, slow effect)
Turn 2: Adjust taxes (medium inertia, medium effect)
Turn 3: Reorganize bureaucracy (low inertia, quick effect)

By Turn 5:
- Bureaucracy reformed (quick)
- Tax changes showing effect (medium)
- Education not yet impactful (slow, but building)

By Turn 20:
- Education now major factor (accumulated momentum)
- Creates reward for patient, strategic thinking
```
:p How does varying Inertia values create realistic momentum and strategic depth?
??x
Different Inertia values create realistic change speeds for different domains.

Inertia categories:

1. Public Opinion (0.8-0.95) - Very slow:
   - Cultural attitudes
   - Generational change
   - Example: Liberal values from gay marriage policy

2. Economic (0.3-0.6) - Medium:
   - GDP, employment, trade
   - Quarterly/yearly response
   - Example: Infrastructure → GDP growth

3. Political (0-0.2) - Fast:
   - Organizational changes
   - Administrative reforms
   - Example: Bureaucracy restructuring

4. Infrastructure (0.7-0.85) - Slow:
   - Physical construction
   - Development projects
   - Example: Road building → transport quality

Strategic implications:
- Fast domains: Tactical adjustments, quick feedback
- Slow domains: Long-term investment, patient planning
- Players must balance short and long-term goals

Gameplay depth:
Turn 5: Only fast domains show results
Turn 20: Slow investments pay off
Rewards strategic thinking over reactive play

Creates realistic momentum in simulation
x??

---

#### Multi-Language Translation Architecture
Professional mods include translations/ directory with subdirectories for each language. Each language has identical CSV structure to data/simulation/ but with translated strings. The game loads simulation mechanics from data/ and text from translations/[LANGUAGE]/. This separation allows mechanics updates without retranslating and enables community translation contributions. Mission-specific text goes in translations/[LANGUAGE]/missions/missions.csv.

```
Translation directory structure:
translations/
├── English/
│   ├── policies.csv           # Policy names and descriptions
│   ├── situations.csv         # Situation text
│   ├── dilemmas.csv          # Dilemma text and options
│   ├── events.csv            # Event text
│   ├── simulation.csv        # Simulation variable names
│   ├── sliders.csv           # Slider names
│   └── missions/
│       └── missions.csv      # Mission-specific text
├── French/
│   └── [same structure]
├── German/
│   └── [same structure]
├── Spanish/
│   └── [same structure]
└── [18+ languages in large mods]
```

```pseudocode
Translation System:
class GameText {
    mechanics_data: Data     // From data/simulation/
    text_data: LocalizedText // From translations/[LANGUAGE]/
}

FUNCTION load_game(selected_language):
    // Load mechanics (language-agnostic)
    policies = load_csv("data/simulation/policies.csv")
    situations = load_csv("data/simulation/situations.csv")

    // Load text for selected language
    policy_text = load_csv("translations/" + selected_language + "/policies.csv")
    situation_text = load_csv("translations/" + selected_language + "/situations.csv")

    // Merge: mechanics + text
    FOR each policy in policies:
        policy.name = find_translation(policy_text, policy.id, "name")
        policy.description = find_translation(policy_text, policy.id, "description")

    RETURN game_data

Translation CSV format:
# English/policies.csv
#,id,name,description,flavour_text
#,carbon_tax,Carbon Tax,"Tax on carbon emissions","Reduce pollution..."

# French/policies.csv
#,id,name,description,flavour_text
#,carbon_tax,Taxe carbone,"Taxe sur les émissions de carbone","Réduire la pollution..."

Key matching: Both files use same 'id' field

Benefits:
1. Mechanics updates don't require retranslation
2. Community can contribute translations
3. Translators don't need programming knowledge
4. Easy to verify translation completeness (same row count)

Large mods support: English, French, German, Spanish, Italian, Portuguese, Russian, Chinese, Japanese, Korean, Polish, Turkish, Dutch, Swedish, Norwegian, Danish, Finnish, Czech
```
:p How does the multi-language translation architecture work in Democracy 4 mods?
??x
Separation of mechanics (data/) and text (translations/[LANGUAGE]/).

Structure:
translations/
├── English/
│   ├── policies.csv
│   ├── situations.csv
│   ├── dilemmas.csv
│   ├── events.csv
│   └── missions/missions.csv
├── French/
└── [other languages]/

Mechanics vs Text:
- data/simulation/policies.csv: Mechanics (effects, costs, equations)
- translations/English/policies.csv: Text (names, descriptions)
- Both share ID field for matching

Loading process:
1. Load mechanics from data/simulation/
2. Load text from translations/[selected_language]/
3. Merge using ID field
4. Display localized text with correct mechanics

Benefits:
1. Mechanics updates don't require retranslation
2. Community can contribute translations
3. Same CSV structure for all languages (easy verification)
4. Translators don't need programming knowledge
5. Large mods support 18+ languages

CSV matching:
All translation CSVs have same ID column as mechanics CSVs
x??

---

#### Compositional Override Stacking
Multiple override files can target the same TargetName + HostName combination. The game engine stacks these effects additively, allowing mods to layer changes. Global overrides apply first, then mission-specific overrides add or replace. This enables modular mod design where multiple submods can coexist. Each override file should be atomic (one relationship) for maximum composability.

```
Override stacking example:

File 1: data/overrides/military_gdp_base.ini
[override]
TargetName = "GDP"
HostName = "MilitarySpending"
Equation = "0.01+(0.05*x)"     # Base: 1-6% GDP boost
Inertia = 0.5

File 2: data/missions/usa/overrides/military_gdp_usa.ini
[override]
TargetName = "GDP"
HostName = "MilitarySpending"
Equation = "0.02+(0.08*x)"     # USA: 2-10% GDP boost (larger military-industrial complex)
Inertia = 0.5

Result when loading USA mission:
- Global override ignored (mission-specific replaces)
- USA gets enhanced military-economy relationship

Alternative stacking (different targets):
File 1: military_liberal_global.ini
TargetName = "Liberal"
HostName = "MilitarySpending"

File 2: military_conservative_global.ini
TargetName = "Conservative"
HostName = "MilitarySpending"

Both apply simultaneously (different targets)
```

```pseudocode
Override Stacking System:
class OverrideRegistry {
    overrides: Map<String, Override[]>  // Key: "TargetName:HostName"
}

FUNCTION load_overrides(paths):
    registry = new OverrideRegistry()

    FOR each path in paths:  // Ordered: global first, mission-specific last
        FOR each file in path:
            override = parse_override_file(file)
            key = override.target + ":" + override.host

            IF registry.contains(key):
                // Mission-specific replaces global
                IF path.is_mission_specific():
                    registry.replace(key, override)
                ELSE:
                    registry.add(key, override)  // Stack if same level
            ELSE:
                registry.add(key, override)

    RETURN registry

FUNCTION apply_all_overrides(registry):
    FOR each (key, overrides) in registry:
        FOR each override in overrides:
            apply_override_to_simulation(override)

Design principle: Atomic overrides
Bad (multiple changes in one file):
[override]
TargetName = "GDP"
HostName = "MilitarySpending"
...
[override]
TargetName = "Liberal"
HostName = "MilitarySpending"
...

Good (one file per relationship):
File: military_gdp.ini (GDP change only)
File: military_liberal.ini (Liberal change only)

Benefits:
- Mission overrides can selectively replace
- Other mods can target specific relationships
- Easier debugging (one relationship per file)
- Maximum composability
```
:p How does compositional override stacking enable modular mod design?
??x
Multiple override files can affect same TargetName+HostName, creating layered changes.

Stacking rules:
1. Different targets: Both apply simultaneously
   - military → GDP (File 1)
   - military → Liberal (File 2)
   - Both active

2. Same target+host, different levels:
   - Global override applies first
   - Mission-specific REPLACES global
   - Allows regional customization

3. Same level, same target+host:
   - Effects stack additively (engine-dependent)

Loading order:
1. Global overrides (data/overrides/)
2. Mission overrides (data/missions/[country]/overrides/)
3. Later overrides can replace earlier ones

Design principle: Atomic overrides
- One file per relationship
- militarySpendingGDP.ini (only GDP effect)
- militarySpendingLiberal.ini (only Liberal effect)

Benefits:
- Mission overrides can selectively replace
- Multiple mods can coexist
- Easier debugging (one relationship per file)
- Maximum composability and flexibility

Example: USA military-economy stronger than global base
Global: "0.01+(0.05*x)"
USA: "0.02+(0.08*x)" (replaces global)
x??

---

