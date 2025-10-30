# Democracy 4 Modding - Situations, Events, and Dilemmas

#### Situation CSV Structure
Situations in Democracy 4 are dynamic conditions that emerge during gameplay based on policy choices. The situations.csv file defines each situation with columns: name (identifier), category (ECONOMY, WELFARE, LAWANDORDER, etc.), icon_name (SVG file), introduce (turn number available), success_value (target to resolve), success_difficulty/ongoing_difficulty (how hard to manage), #influences (policies that affect the situation), and #effects (how situation impacts simulation). Situations have a value from 0-1 indicating severity.

```csv
Structure:
#,name,category,initial_value,random_chance,introduce,value_type,icon_name,
#influences,[influence_list],#effects,[effect_list]

Example:
#,youthcrime,LAWANDORDER,0.2,0,1,HIGHBAD,icons_YouthCrime,
#,"PoliceForce,0-(0.1*x)","Education,0-(0.05*x)",
#,"CrimeRate,0.0+(0.09*x)","GDP,0-(0.05*x)"
```

```pseudocode
Situation Mechanics:
class Situation {
    name: string
    category: string
    value: float              // 0-1 severity
    value_type: enum          // HIGHBAD or LOWBAD

    influences: Effect[]      // Policies that affect this
    effects: Effect[]         // How this affects simulation
}

Simulation Loop:
EVERY turn:
    FOR each situation in all_situations:
        // Calculate influences from policies
        change = 0
        FOR each influence in situation.influences:
            policy_value = get_policy_value(influence.policy)
            change += evaluate(influence.equation, policy_value)

        // Update situation value
        situation.value += change
        situation.value = clamp(situation.value, 0, 1)

        // Apply situation effects to world
        FOR each effect in situation.effects:
            target = effect.target_variable
            impact = evaluate(effect.equation, situation.value)
            target.modify(impact)
```
:p What defines a situation in Democracy 4 and how does it work in the simulation?
??x
Situations are dynamic conditions that emerge based on policies.

Key fields in situations.csv:
- name: Situation identifier
- category: ECONOMY, WELFARE, LAWANDORDER, etc.
- value: Current severity (0-1 range)
- value_type: HIGHBAD (high is bad) or LOWBAD
- #influences: Policies that affect situation value
- #effects: How situation impacts simulation variables

Mechanics:
1. Each turn, influences from policies are calculated
2. Policy effects modify situation value (0-1)
3. Situation value affects simulation through effects list
4. Creates feedback loop: policies → situations → simulation

Example:
youthcrime influenced by PoliceForce, Education
youthcrime affects CrimeRate, GDP
Higher police/education reduces youth crime
x??

---

#### Event TXT File Structure
Events are one-time occurrences defined in .txt files (data/simulation/events/). Each event has a [config] section with name, texture (image file), GUISound, and OnImplement (CreateGrudge commands for effects). The [influences] section defines trigger conditions using format: "index = variable,min,max" where variable can be _random_ (random chance), a policy name, or a situation. When conditions are met, the event fires and OnImplement commands execute.

```
Event file: globalsummit.txt

[config]
Name = globalsummit
Texture = summit.jpg
GUISound = event_positive.wav
OnImplement = CreateGrudge(Liberal,0.02,0.9);CreateGrudge(ForeignRelations,0.05,0.9);

[influences]
0 = _random_,0,0.2              # 20% random chance
1 = ForeignAid,0+(0.15*x)       # Increases with ForeignAid policy
2 = natomembership,0.05+(0.15*x) # Increases with NATO membership
```

```pseudocode
Event System:
class Event {
    name: string
    texture: string           // Image file path
    sound: string            // Audio file
    on_implement: Command[]  // CreateGrudge commands

    influences: Trigger[]    // Conditions for firing
}

Event Trigger Evaluation:
EVERY turn:
    FOR each event in all_events:
        IF event.has_fired:
            CONTINUE  // Events fire only once

        total_probability = 0

        FOR each influence in event.influences:
            IF influence.variable == "_random_":
                total_probability += influence.max
            ELSE:
                var_value = get_value(influence.variable)
                prob = evaluate(influence.equation, var_value)
                total_probability += prob

        IF random() < total_probability:
            fire_event(event)
            event.has_fired = true

Event Firing:
FUNCTION fire_event(event):
    show_ui_popup(event.texture, event.name_localized)
    play_sound(event.sound)

    FOR each command in event.on_implement:
        execute(command)  // Apply CreateGrudge effects
```
:p How are events structured and triggered in Democracy 4?
??x
Events are one-time occurrences defined in .txt files.

File structure:
[config] section:
- Name: Event identifier
- Texture: Image file (JPG/PNG)
- GUISound: Audio effect
- OnImplement: CreateGrudge commands (effects)

[influences] section:
- Format: index = variable,min,max
- variable can be: _random_, policy name, situation name
- Defines trigger probability

Trigger mechanics:
1. Each turn, evaluate all influence conditions
2. Sum probabilities from all influences
3. _random_ adds fixed probability
4. Policies/situations add dynamic probability based on value
5. If random() < total_probability, event fires
6. Execute OnImplement commands
7. Event marked as fired (won't repeat)

Creates emergent gameplay moments.
x??

---

#### CreateGrudge Command
CreateGrudge is a special command used in events, dilemmas, and mission scripts to apply temporary or permanent effects to simulation variables. Format: CreateGrudge(TargetVariable,amount,duration) where TargetVariable is any simulation variable, amount is the change (positive or negative), and duration is how long it lasts (0.9 = 90% decay per turn, permanent if very low). Multiple CreateGrudge commands are chained with semicolons.

```
CreateGrudge Examples:
CreateGrudge(Liberal,0.02,0.9)              # Increase Liberal by 2%, 90% decay
CreateGrudge(CrimeRate,0.03,0.9)            # Increase crime 3%
CreateGrudge(GDP,-0.01,0.95)                # Decrease GDP 1%, slow decay
CreateGrudge(_Terrorism,0.3,0.9)            # Spike terrorism 30%

Chained commands:
CreateGrudge(Liberal,0.02,0.9);CreateGrudge(CrimeRate,0.03,0.9);CreateGrudge(GDP,-0.05,0.9);
```

```pseudocode
CreateGrudge Implementation:
class Grudge {
    target: string       // Variable name
    amount: float        // Effect magnitude
    decay_rate: float    // How quickly it fades (0-1)
    current_value: float // Current effect strength
}

FUNCTION CreateGrudge(target, amount, decay_rate):
    grudge = new Grudge()
    grudge.target = target
    grudge.amount = amount
    grudge.decay_rate = decay_rate
    grudge.current_value = amount

    add_to_active_grudges(grudge)

Simulation Loop:
EVERY turn:
    FOR each grudge in active_grudges:
        // Apply current effect to target variable
        target_var = get_variable(grudge.target)
        target_var.modify(grudge.current_value)

        // Decay the grudge
        grudge.current_value *= grudge.decay_rate

        // Remove if negligible
        IF abs(grudge.current_value) < 0.001:
            remove_from_active_grudges(grudge)

Duration Examples:
0.9 = fast decay (90% remains each turn, ~10 turns)
0.95 = medium decay (~20 turns)
0.99 = slow decay (~100 turns)
0.0 = permanent effect (no decay)
```
:p What is the CreateGrudge command and how does it work in Democracy 4?
??x
CreateGrudge applies temporary/permanent effects to simulation variables.

Format: CreateGrudge(TargetVariable,amount,duration)

Parameters:
1. TargetVariable: Any simulation variable (Liberal, CrimeRate, GDP, etc.)
2. amount: Change magnitude (positive or negative float)
3. duration: Decay rate (0-1)
   - 0.9 = 90% remains per turn (fast decay, ~10 turns)
   - 0.95 = medium decay (~20 turns)
   - 0.99 = slow decay (~100 turns)
   - 0.0 = permanent (no decay)

Mechanics:
1. Create grudge with initial amount
2. Each turn: apply current value to target variable
3. Each turn: multiply current value by decay_rate
4. Remove when value becomes negligible

Chaining: Multiple commands with semicolons
Used in: events, dilemmas, mission scripts
x??

---

#### Dilemma TXT File Structure
Dilemmas are choice-based events with multiple outcomes defined in .txt files (data/simulation/dilemmas/). Structure includes [dilemma] section with name, [influences] section for trigger conditions (same format as events), and [option0], [option1], etc. sections for each choice. Each option has OnImplement with CreateGrudge commands representing different consequences. Players choose one option, and only those effects apply.

```
Dilemma file: military_decision.txt

[dilemma]
name = military_decision

[influences]
0 = _random_,0.1,0.4           # 10-40% random chance
1 = MilitarySpending,0+(0.15*x) # More likely with high military

[option0]
OnImplement = CreateGrudge(Liberal,0.05,0.9);CreateGrudge(MilitaryStrength,0.1,0.95);

[option1]
OnImplement = CreateGrudge(Pacifist,0.08,0.9);CreateGrudge(ForeignRelations,-0.05,0.9);
```

```pseudocode
Dilemma System:
class Dilemma {
    name: string
    influences: Trigger[]     // When it appears
    options: DilemmaOption[]  // Player choices
}

class DilemmaOption {
    on_implement: Command[]   // CreateGrudge commands
    description: string       // Localized text
}

Dilemma Trigger:
EVERY turn:
    FOR each dilemma in all_dilemmas:
        IF dilemma.has_appeared:
            CONTINUE

        probability = calculate_trigger_probability(dilemma.influences)

        IF random() < probability:
            present_dilemma_to_player(dilemma)
            dilemma.has_appeared = true

Player Choice:
FUNCTION player_selects_option(dilemma, option_index):
    selected_option = dilemma.options[option_index]

    FOR each command in selected_option.on_implement:
        execute(command)  // Apply CreateGrudge effects

    log_choice(dilemma.name, option_index)
    close_dilemma_ui()
```
:p How do dilemmas differ from events in Democracy 4?
??x
Dilemmas are choice-based events; events are automatic.

Structure differences:

Events (.txt):
- [config] section: name, texture, sound, OnImplement
- [influences] section: trigger conditions
- One set of effects (OnImplement)
- Fires automatically when triggered

Dilemmas (.txt):
- [dilemma] section: name
- [influences] section: trigger conditions
- [option0], [option1], etc. sections
- Each option has different OnImplement commands
- Player chooses which effects to apply

Key difference:
Events: automatic, single outcome
Dilemmas: player choice, multiple outcomes

Both use:
- Same trigger system (influences)
- CreateGrudge commands for effects
- One-time occurrence

Player agency is the defining difference.
x??

---

#### Influence Trigger System
The [influences] section in events and dilemmas defines when they trigger. Format: "index = variable,equation" or "index = variable,min,max". The variable can be _random_ (fixed probability), a policy name, a situation name, or a simulation variable. For policies/situations, the equation uses 'x' for the variable's value. All influence probabilities sum together to determine total trigger chance each turn.

```
Influence examples:

[influences]
0 = _random_,0,0.2                    # Fixed 20% base chance
1 = MilitarySpending,0+(0.15*x)       # 0-15% based on policy value
2 = natomembership,0.05+(0.15*x)      # 5-20% based on policy
3 = CrimeRate,0.1*(x^2)               # Quadratic: higher crime = much higher chance

Trigger calculation:
total = 0.2 + (0.15*MilitarySpending) + (0.05 + 0.15*natomembership) + (0.1*CrimeRate^2)
```

```pseudocode
Influence System:
struct Influence {
    index: int
    variable: string
    equation: string     // Or min/max for _random_
}

FUNCTION calculate_trigger_probability(influences):
    total_probability = 0.0

    FOR each influence in influences:
        IF influence.variable == "_random_":
            // Fixed probability (max value)
            total_probability += influence.max

        ELSE:
            // Get current value of variable (policy/situation)
            x = get_variable_value(influence.variable)

            // Evaluate equation with x
            probability = evaluate(influence.equation, x)
            total_probability += probability

    // Clamp to valid probability range
    RETURN clamp(total_probability, 0, 1)

Usage in Game Loop:
IF calculate_trigger_probability(event.influences) > random(0, 1):
    trigger_event(event)
```
:p How does the influence trigger system work in Democracy 4 events and dilemmas?
??x
Influences define when events/dilemmas trigger.

Format: index = variable,equation

Variable types:
1. _random_ - Fixed probability
   - Format: _random_,min,max
   - Adds constant chance (e.g., 0,0.2 = 20%)

2. Policy name - Dynamic based on policy value
   - Format: PolicyName,equation
   - 'x' = policy value (0-1)
   - Example: MilitarySpending,0+(0.15*x)

3. Situation name - Based on situation severity
   - Same as policy format
   - Example: CrimeRate,0.1*(x^2)

Probability calculation:
1. Sum all influence probabilities
2. _random_ adds fixed amount
3. Policies/situations: evaluate equation with current value
4. Total probability = sum of all influences
5. Each turn: if random() < total, trigger

Creates context-sensitive events that feel reactive to player choices.
x??

---

#### Situation Success and Ongoing Difficulty
Situations have success_value (target value to resolve the situation) and two difficulty fields: success_difficulty (how hard to reach success) and ongoing_difficulty (how hard to maintain once resolved). These fields control the player's challenge. HIGHBAD situations are resolved by lowering value to success_value, while LOWBAD situations require raising it. Difficulty values affect the rate of change based on player policies.

```csv
Situation fields:
#,name,category,initial_value,random_chance,introduce,value_type,icon_name,
success_value,success_difficulty,ongoing_difficulty,...

Examples:
#,youthcrime,LAWANDORDER,0.2,0,1,HIGHBAD,icons_YouthCrime,0.1,5,3,...
  # Success: reduce to 0.1, difficulty 5, maintain difficulty 3

#,democracy,GOVERNANCE,0.6,0,1,LOWBAD,icons_Democracy,0.8,4,2,...
  # Success: raise to 0.8, difficulty 4, maintain difficulty 2
```

```pseudocode
Situation Resolution:
class Situation {
    value: float
    success_value: float
    value_type: enum(HIGHBAD, LOWBAD)
    success_difficulty: float
    ongoing_difficulty: float
    is_resolved: bool
}

FUNCTION check_situation_status(situation):
    IF situation.value_type == HIGHBAD:
        IF situation.value <= situation.success_value:
            situation.is_resolved = true

    IF situation.value_type == LOWBAD:
        IF situation.value >= situation.success_value:
            situation.is_resolved = true

FUNCTION apply_difficulty(situation, policy_effect):
    IF situation.is_resolved:
        difficulty = situation.ongoing_difficulty
    ELSE:
        difficulty = situation.success_difficulty

    // Higher difficulty = slower change from policies
    actual_effect = policy_effect / difficulty

    situation.value += actual_effect

Gameplay Impact:
- High success_difficulty = hard to initially resolve
- High ongoing_difficulty = hard to keep resolved
- Creates persistent challenges requiring continuous policy attention
```
:p What are success_value and difficulty fields in situations and how do they affect gameplay?
??x
These fields control situation resolution challenge.

success_value:
- Target value to resolve situation
- HIGHBAD: reduce value below this (e.g., crime to 0.1)
- LOWBAD: raise value above this (e.g., democracy to 0.8)

success_difficulty:
- How hard to initially resolve situation
- Higher = slower policy effects before resolution
- Player must invest more effort/time

ongoing_difficulty:
- How hard to maintain after resolution
- Higher = requires continuous policy attention
- Prevents "set and forget"

Mechanics:
1. Policy effects divided by current difficulty
2. Before resolution: use success_difficulty
3. After resolution: use ongoing_difficulty
4. Creates two-phase challenge: achieve → maintain

Example:
youthcrime: success_value=0.1, success_difficulty=5, ongoing_difficulty=3
- Must reduce crime to 0.1 (challenging, 5)
- Must keep it low (easier, 3)
x??

---

