# Democracy 4 Modding - Policy System

#### Policy CSV Column Structure
The policies.csv file defines all policies in Democracy 4. Each policy is a row with ~25 columns. Essential columns include: name (policy identifier), slider (slider type/group), flags (special modifiers like MULTIPLYINCOME, UNCANCELLABLE), opposites (conflicting policies), introduce/cancel (turn numbers), raise/lower (difficulty costs), department (which ministry handles it), prereqs (prerequisite conditions), mincost/maxcost (budget range), costfunction/incomefunction (scaling formulas), and #Effects (list of effects on simulation variables).

```csv
Header row:
#,name,slider,flags,opposites,introduce,cancel,raise,lower,department,prereqs,
mincost,maxcost,costfunction,cost multiplier,implementation,minincome,maxincome,
incomefunction,incomemultiplier,nationalisation GDP percentage,#Effects,...

Data row example:
#,mpt,mpt_slider,MULTIPLYINCOME,,0,10000,15,15,transport,_prereq_tech_1,
50000,200000,0+(1.0*x),1.0,4,0,0,,,0,#,GDP~0.02+(0.1*x),...
```

```pseudocode
Policy Structure:
class Policy {
    name: string              // Unique identifier
    slider: string            // Slider type
    flags: string[]           // Special behaviors
    opposites: string[]       // Conflicting policies

    introduce: int            // Turn # available
    cancel: int               // Turn # can cancel
    raise_cost: float         // Political cost to increase
    lower_cost: float         // Political cost to decrease

    budget_function: string   // Cost formula
    income_function: string   // Revenue formula

    effects: Effect[]         // List of simulation effects
}
```
:p What are the essential columns in policies.csv and what do they define?
??x
Essential columns in policies.csv:

Identification:
- name: Policy unique identifier
- slider: Slider type/group it belongs to

Behavior:
- flags: Special modifiers (MULTIPLYINCOME, UNCANCELLABLE, etc.)
- opposites: Conflicting policy names

Timing:
- introduce: Turn number policy becomes available
- cancel: Turn number policy can be cancelled

Costs:
- raise/lower: Political cost to adjust policy
- mincost/maxcost: Budget range
- costfunction: How budget requirement scales
- incomefunction: Revenue generation formula

Effects:
- department: Which ministry handles it
- prereqs: Prerequisite conditions (_prereq_*)
- #Effects: List of effects on simulation variables
x??

---

#### Policy Effect Format
Policy effects in Democracy 4 use a special format: "TargetVariable,equation" where the equation defines how the policy affects the target. The variable 'x' represents the policy value (0-1 range). Common patterns include linear effects (0.02+(0.1*x)), polynomial effects (0.5*(x^2)), and interaction effects ((0.22*x)*OtherPolicyName). Multiple effects are comma-separated in the #Effects column. Effects can be positive or negative using + or - operators.

```
Effect Format: "TargetVariable,equation"

Examples:
"GDP,0.02+(0.1*x)"           # Linear: 2% base + 10% scaling
"Unemployment,0-(0.05*x)"    # Negative: reduces unemployment
"Liberal,0.112*(x^3)"        # Cubic: exponential at extremes
"Equality,(0.22*x)*GDP"      # Interaction: depends on GDP

Multiple effects:
"GDP,0.02+(0.1*x)","Unemployment,0-(0.05*x)","Health,0.01+(0.02*x)"
```

```pseudocode
Effect Calculation:
FOR each effect in policy.effects:
    target = effect.target_variable
    equation = effect.equation
    policy_value = current_policy_value  // 0-1 range

    // Replace 'x' with actual policy value
    x = policy_value

    // Evaluate equation (can reference other variables)
    result = evaluate(equation)

    // Apply to target variable
    target_variable.modify(result)
```
:p What is the format for policy effects in Democracy 4 and how are they calculated?
??x
Format: "TargetVariable,equation"

The variable 'x' = policy value (0-1 range)

Common equation types:
1. Linear: 0.02+(0.1*x)
   - Base effect + scaling effect

2. Polynomial: 0.5*(x^2) or 0.112*(x^3)
   - Creates tipping points at extremes

3. Negative: 0-(0.05*x)
   - Reduces target variable

4. Interaction: (0.22*x)*OtherPolicy
   - Effect depends on another policy

Calculation:
1. Get current policy value as 'x'
2. Evaluate equation (substitute x)
3. Apply result to target variable
4. Repeat for all effects (comma-separated list)
x??

---

#### Policy Cost and Income Functions
Policies have cost functions (budget required) and income functions (revenue generated). Both use formulas with 'x' representing policy value (0-1). The costfunction ranges from mincost at x=0 to maxcost at x=1. Common cost patterns include linear (0+(1.0*x)) meaning cost scales directly with value, or fixed costs. Income functions work similarly but generate revenue, often multiplied by economic indicators. Some policies have the MULTIPLYINCOME flag which multiplies income by GDP or other factors.

```
Cost Function Examples:
"0+(1.0*x)"     # Linear: scales from mincost to maxcost
"0+(0.5*x)"     # Slower scaling
"0.112*(x^3)"   # Cubic: expensive at high values

Income Function Examples:
"0.5+(0.5*x)"   # Generates revenue scaling with policy
""              # Empty = no income

Flags:
MULTIPLYINCOME  # Income multiplied by GDP/economic factors
```

```pseudocode
Budget Calculation:
IF policy is active:
    x = policy_value
    base_cost = evaluate(costfunction, x)

    // Scale between min and max
    actual_cost = mincost + (base_cost * (maxcost - mincost))
    actual_cost *= cost_multiplier

    deduct_from_budget(actual_cost)

Revenue Calculation:
IF policy generates income:
    x = policy_value
    base_income = evaluate(incomefunction, x)

    // Scale between min and max
    actual_income = minincome + (base_income * (maxincome - minincome))
    actual_income *= incomemultiplier

    IF has_flag(MULTIPLYINCOME):
        actual_income *= GDP  // Or other economic factor

    add_to_budget(actual_income)
```
:p How do policy cost functions and income functions work in Democracy 4?
??x
Both use formulas with 'x' = policy value (0-1)

Cost Function:
- Defines budget required to run policy
- Scales from mincost (x=0) to maxcost (x=1)
- Common: "0+(1.0*x)" for linear scaling
- Formula result multiplied by (maxcost - mincost)

Income Function:
- Defines revenue generated by policy
- Scales from minincome to maxincome
- Can be empty (no income)
- MULTIPLYINCOME flag multiplies by GDP/economic factors

Calculation:
1. Evaluate formula with current x value
2. Scale result between min/max range
3. Apply multipliers (cost_multiplier or incomemultiplier)
4. For income: if MULTIPLYINCOME, multiply by GDP
x??

---

#### Opposite Policies Constraint
The 'opposites' field in policies.csv defines conflicting policies that cannot be active simultaneously. This creates strategic choices for players. When one policy is active, opposite policies are disabled or restricted. This mechanic enforces political realism (e.g., you can't have both maximum free market AND maximum state control). Opposites are specified as comma-separated policy names.

```csv
Example from policies.csv:
#,landvaluetax,tax,"",tax_on_income,,5,10,15,15,...
#,interest_rate,tax,"",tax_on_income,,0,10000,15,15,...

Both list each other as opposites to prevent simultaneous maximization
```

```pseudocode
Policy Activation Check:
FUNCTION can_raise_policy(policy_name):
    policy = get_policy(policy_name)

    FOR each opposite in policy.opposites:
        opposite_policy = get_policy(opposite)

        IF opposite_policy.value > threshold:
            RETURN false  // Cannot raise, opposite is too high

    RETURN true

FUNCTION enforce_opposites(policy_name, new_value):
    policy = get_policy(policy_name)

    IF new_value > threshold:
        FOR each opposite in policy.opposites:
            opposite_policy = get_policy(opposite)

            // Force opposite down or disable
            opposite_policy.limit_max_value()
```
:p What is the purpose of the 'opposites' field in policies.csv?
??x
The 'opposites' field defines mutually exclusive or conflicting policies.

Purpose:
- Enforces strategic choices for players
- Prevents unrealistic policy combinations
- Creates political trade-offs

Behavior:
- When one policy is high, opposite policies are limited
- Specified as comma-separated policy names
- Bidirectional (both policies list each other)

Example:
landvaluetax vs interest_rate
- Both are tax policies
- Cannot maximize both simultaneously
- Must choose economic strategy

Implementation:
When raising a policy, check if any opposite policy values exceed threshold and block or limit the raise.
x??

---

#### Prerequisite System
The 'prereqs' field links policies to prerequisite conditions defined in prereqs.txt. Prerequisites gate content behind conditions like technology level, GDP thresholds, or other policy states. Prerequisite IDs follow the pattern _prereq_* (e.g., _prereq_tech_1, _prereq_gdp_high). This allows progressive unlocking of advanced policies as the player's nation develops. Multiple prerequisites can be required by listing them comma-separated.

```
Policy CSV:
#,advancedpolicy,slider,,,,0,10000,15,15,department,_prereq_tech_1,...

prereqs.txt mapping:
_prereq_tech_1 = Technology > 0.7
_prereq_gdp_high = GDP > 500000
_prereq_democracy = Democracy > 0.5
```

```pseudocode
Prerequisite Evaluation:
FUNCTION is_policy_available(policy):
    IF policy.prereqs is empty:
        RETURN true

    prereq_ids = parse_csv(policy.prereqs)

    FOR each prereq_id in prereq_ids:
        condition = load_from_prereqs_txt(prereq_id)

        IF NOT evaluate(condition):
            RETURN false  // Prereq not met

    RETURN true  // All prereqs satisfied

Game Loop:
EVERY turn:
    FOR each policy in all_policies:
        IF is_policy_available(policy):
            enable_in_ui(policy)
        ELSE:
            disable_in_ui(policy)
```
:p How does the prerequisite system work for policies in Democracy 4?
??x
Prerequisites gate policies behind specific conditions.

Format:
- 'prereqs' field contains prerequisite IDs
- IDs follow pattern: _prereq_*
- Defined in prereqs.txt file
- Can list multiple (comma-separated)

Common prerequisites:
- _prereq_tech_1: Technology level threshold
- _prereq_gdp_high: GDP requirement
- _prereq_democracy: Democratic development

Evaluation:
1. Check if policy has prereqs field
2. Load prerequisite conditions from prereqs.txt
3. Evaluate each condition against current game state
4. Policy only available if ALL conditions met
5. UI shows/hides policy based on availability

Enables progressive unlocking as nation develops.
x??

---

#### Slider Types and Policy Groups
The 'slider' field in policies.csv groups policies under a slider control. Each slider is defined in sliders.csv with a type: DISCRETE (fixed number of steps) or PERCENTAGE (0-100 continuous range). Multiple policies can share the same slider, creating related policy groups. The slider determines the UI control and valid value ranges. Some policies have unique sliders (1:1 mapping) while others share sliders for thematic grouping.

```csv
sliders.csv:
#,mpt,DISCRETE,10,          # 10 discrete steps (0-10)
#,money_supply1,PERCENTAGE,0,50  # Percentage 0-50%

policies.csv:
#,policy1,mpt,... # Uses mpt slider (discrete)
#,policy2,money_supply1,... # Uses money_supply1 slider (percentage)
```

```pseudocode
Slider Definition:
class Slider {
    id: string
    type: enum(DISCRETE, PERCENTAGE)

    // For DISCRETE
    num_steps: int       // e.g., 10 steps

    // For PERCENTAGE
    min_percent: float   // e.g., 0
    max_percent: float   // e.g., 50
}

Policy-Slider Relationship:
class Policy {
    slider_id: string  // References Slider.id

    get_valid_values():
        slider = get_slider(slider_id)

        IF slider.type == DISCRETE:
            RETURN [0, 1, 2, ..., slider.num_steps]

        IF slider.type == PERCENTAGE:
            RETURN range(slider.min_percent, slider.max_percent)
}

UI Rendering:
FOR each unique slider_id:
    policies_in_group = find_policies_by_slider(slider_id)
    slider = get_slider(slider_id)

    render_slider_control(slider, policies_in_group)
```
:p What are the two slider types in Democracy 4 and how do they relate to policies?
??x
Two slider types defined in sliders.csv:

1. DISCRETE - Fixed number of steps
   - Format: #,slider_id,DISCRETE,num_steps,
   - Example: #,mpt,DISCRETE,10,
   - Values: 0, 1, 2, ..., num_steps

2. PERCENTAGE - Continuous percentage range
   - Format: #,slider_id,PERCENTAGE,min,max
   - Example: #,money_supply1,PERCENTAGE,0,50
   - Values: 0% to max% continuous

Policy-Slider Relationship:
- Policy's 'slider' field references slider ID
- Multiple policies can share same slider
- Creates thematic policy groups
- Slider type determines UI control and valid values
- 1:1 mapping (unique slider) or many:1 (shared slider)
x??

---

#### Policy Flags
The 'flags' field in policies.csv contains special modifiers that change policy behavior. Common flags include: MULTIPLYINCOME (income is multiplied by GDP or economic factors), UNCANCELLABLE (policy cannot be removed once implemented), TOGGLEABLE (binary on/off policy), HIDDEN (not shown in normal UI), and STARTDISABLED (policy begins inactive). Multiple flags are comma-separated. Flags modify the core mechanics defined in the game engine without requiring code changes.

```csv
Policy flags examples:
#,policy1,slider,MULTIPLYINCOME,,... # Income affected by GDP
#,policy2,slider,UNCANCELLABLE,,... # Cannot cancel
#,policy3,slider,"MULTIPLYINCOME,HIDDEN",,... # Multiple flags
#,policy4,slider,,,... # No flags (empty field)
```

```pseudocode
Flag Processing:
class Policy {
    flags: Set<string>

    has_flag(flag_name):
        RETURN flag_name in flags
}

Game Mechanics with Flags:
// Income calculation
IF policy.has_flag("MULTIPLYINCOME"):
    income = base_income * GDP
ELSE:
    income = base_income

// Cancellation check
IF player_attempts_cancel(policy):
    IF policy.has_flag("UNCANCELLABLE"):
        show_error("Cannot cancel this policy")
        RETURN false
    ELSE:
        allow_cancel()

// UI visibility
IF policy.has_flag("HIDDEN"):
    hide_from_ui(policy)

// Initial state
IF policy.has_flag("STARTDISABLED"):
    policy.value = 0
    policy.active = false
```
:p What are common policy flags in Democracy 4 and what do they do?
??x
Flags are special modifiers in the 'flags' field that change policy behavior.

Common flags:

1. MULTIPLYINCOME
   - Policy income multiplied by GDP/economic factors
   - Scales revenue with economic health

2. UNCANCELLABLE
   - Policy cannot be removed once implemented
   - Permanent decision

3. TOGGLEABLE
   - Binary on/off policy (not gradual)
   - Either fully active or inactive

4. HIDDEN
   - Not shown in normal UI
   - For internal/special mechanics

5. STARTDISABLED
   - Policy begins inactive
   - Must be manually enabled

Multiple flags: comma-separated
Empty field: no special behaviors
Flags modify engine behavior without code changes
x??

---

