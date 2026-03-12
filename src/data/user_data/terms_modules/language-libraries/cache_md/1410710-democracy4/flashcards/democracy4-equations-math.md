# Democracy 4 Modding - Equation System and Mathematics

#### Equation Variable 'x'
In all Democracy 4 equations (policy effects, influences, cost functions, etc.), the variable 'x' represents the normalized value (0-1 range) of the source entity. For policies, x is the policy value (0 = minimum/off, 1 = maximum/on). For situations, x is the severity (0 = non-existent, 1 = critical). For cost functions, x represents position between min and max. This standardization allows consistent mathematical modeling across all game systems.

```
Context-dependent 'x' values:

Policy effect: "GDP,0.02+(0.1*x)"
  x = current policy value (0-1)
  If policy at 50%, x = 0.5
  Effect = 0.02 + (0.1 * 0.5) = 0.07 (7% GDP boost)

Situation effect: "CrimeRate,0.05*(x^2)"
  x = current situation value (0-1)
  If situation at 70%, x = 0.7
  Effect = 0.05 * (0.7^2) = 0.0245 (2.45% crime increase)

Cost function: "0+(1.0*x)"
  x = policy value (0-1)
  If policy at 100%, x = 1.0
  Cost = mincost + (1.0 * 1.0) * (maxcost - mincost) = maxcost
```

```pseudocode
Equation Evaluation:
FUNCTION evaluate_equation(equation, source_value):
    // source_value is 0-1 normalized
    x = source_value

    // Replace 'x' in equation string with actual value
    // Then evaluate mathematically
    result = parse_and_calculate(equation, x)

    RETURN result

Examples:
evaluate_equation("0.02+(0.1*x)", 0.5)
  → "0.02+(0.1*0.5)"
  → 0.02 + 0.05
  → 0.07

evaluate_equation("0.05*(x^2)", 0.7)
  → "0.05*(0.7^2)"
  → 0.05 * 0.49
  → 0.0245
```
:p What does the variable 'x' represent in Democracy 4 equations?
??x
'x' represents the normalized value (0-1 range) of the source entity.

Context-dependent meaning:

1. Policy effects:
   - x = policy value (0 to 1)
   - 0 = policy off/minimum
   - 1 = policy on/maximum

2. Situation effects:
   - x = situation severity (0 to 1)
   - 0 = non-existent
   - 1 = critical

3. Cost/Income functions:
   - x = policy value position
   - Scales between min and max

4. Event/Dilemma influences:
   - x = triggering variable value (0 to 1)

Standardization benefit:
- Consistent mathematical modeling
- All equations use same 0-1 scale
- Easy to balance and predict

Example: "0.02+(0.1*x)" at x=0.5 → 0.07
x??

---

#### Linear Effect Equations
Linear equations in Democracy 4 follow the format: base + (coefficient * x). The base is the minimum effect when x=0, and coefficient determines the scaling rate. Format "0.02+(0.1*x)" means 2% base effect plus 10% for each unit of x. Linear effects create proportional, predictable relationships between policies and outcomes. They're the simplest and most common equation type.

```
Linear equation format: base + (coefficient * x)

Examples:
"0.02+(0.1*x)"     # 2% base + 10% per x unit
  x=0   → 0.02 (2%)
  x=0.5 → 0.07 (7%)
  x=1.0 → 0.12 (12%)

"0+(0.3*x)"        # No base, pure scaling
  x=0   → 0.0 (0%)
  x=0.5 → 0.15 (15%)
  x=1.0 → 0.30 (30%)

"0.1+(0.05*x)"     # 10% base + 5% scaling
  x=0   → 0.10 (10%)
  x=1.0 → 0.15 (15%)
```

```pseudocode
Linear Effect Implementation:
FUNCTION apply_linear_effect(target, base, coefficient, x):
    effect = base + (coefficient * x)
    target.modify(effect)
    RETURN effect

Graph characteristics:
- Constant rate of change
- Predictable outcomes
- No tipping points
- Effect proportional to input

| x   | Effect        |
| --- | ------------- |
| 0.0 | base          |
| 0.5 | base + coef/2 |
| 1.0 | base + coef   |

Slope = coefficient
Y-intercept = base

Usage in game:
Most direct policy effects use linear equations
Example: "GDP,0.02+(0.1*x)" for infrastructure spending
- Always positive impact
- Scales predictably with investment
```
:p What is the format and behavior of linear equations in Democracy 4?
??x
Format: base + (coefficient * x)

Components:
- base: Minimum effect when x=0
- coefficient: Scaling rate per x unit
- x: Source value (0-1)

Example: "0.02+(0.1*x)"
- At x=0: 2% effect (base only)
- At x=0.5: 7% effect (base + half coefficient)
- At x=1: 12% effect (base + full coefficient)

Characteristics:
- Constant rate of change
- Proportional relationship
- No tipping points
- Predictable outcomes
- Simplest equation type

Graph: Straight line
- Slope = coefficient
- Y-intercept = base

Use case:
Most common for direct, proportional effects
Example: Infrastructure spending → GDP growth
x??

---

#### Polynomial Effect Equations
Polynomial equations use powers of x (x^2, x^3, etc.) to create non-linear relationships. Format: "coefficient*(x^power)" where power > 1. Quadratic (x^2) creates accelerating effects - small at low values, large at high values. Cubic (x^3) creates even more extreme tipping points. These model scenarios where effects compound or where threshold behaviors exist (e.g., inequality at extreme values has outsized social impact).

```
Polynomial formats:

Quadratic (x^2):
"0.5*(x^2)"
  x=0.0 → 0.00 (0%)
  x=0.5 → 0.125 (12.5%)
  x=0.7 → 0.245 (24.5%)
  x=1.0 → 0.50 (50%)

Cubic (x^3):
"0.112*(x^3)"
  x=0.0 → 0.000 (0%)
  x=0.5 → 0.014 (1.4%)
  x=0.7 → 0.038 (3.8%)
  x=1.0 → 0.112 (11.2%)

Mixed:
"0.02+(0.1*(x^2))"  # Base + quadratic
  Combines linear base with polynomial scaling
```

```pseudocode
Polynomial Effect:
FUNCTION apply_polynomial_effect(target, coefficient, power, x):
    effect = coefficient * (x ^ power)
    target.modify(effect)
    RETURN effect

Behavior comparison:
| x   | Linear | Quadratic | Cubic |
| --- | ------ | --------- | ----- |
| 0.0 | 0.00   | 0.00      | 0.00  |
| 0.3 | 0.30   | 0.09      | 0.027 |
| 0.5 | 0.50   | 0.25      | 0.125 |
| 0.7 | 0.70   | 0.49      | 0.343 |
| 1.0 | 1.00   | 1.00      | 1.00  |

Key insight:
Higher powers = slower growth initially, rapid growth at extremes
Creates "tipping point" behavior

Game design use:
- Model extreme policy effects
- Represent compounding consequences
- Create threshold-based gameplay
Example: "Socialist,0.112*(x^3)"
- Moderate socialism: minimal effect
- Extreme socialism: dramatic effect
```
:p How do polynomial equations (x^2, x^3) differ from linear equations in Democracy 4?
??x
Format: coefficient*(x^power) where power > 1

Common types:
1. Quadratic (x^2):
   - "0.5*(x^2)"
   - Accelerating effects
   - At x=0.5: 25% of max effect
   - At x=0.7: 49% of max effect

2. Cubic (x^3):
   - "0.112*(x^3)"
   - More extreme acceleration
   - At x=0.5: 12.5% of max effect
   - At x=0.7: 34.3% of max effect

Behavior vs Linear:
- Linear: constant rate of change
- Polynomial: accelerating change
- Small values → small effects
- Large values → disproportionately large effects

Creates "tipping points":
- Moderate policy = mild impact
- Extreme policy = dramatic impact

Use cases:
- Model compounding effects
- Represent threshold behaviors
- Example: Extreme inequality has outsized social consequences
x??

---

#### Negative Effect Equations
Negative effects use subtraction or negative coefficients to reduce target variables. Format: "0-(coefficient*x)" or "base+(negative_coefficient*x)". The 0- pattern ensures the effect is always negative. Common for policies that reduce problems (e.g., police reducing crime, education reducing unemployment). The magnitude still scales with x, but the direction is inverted.

```
Negative effect formats:

Pure negative:
"0-(0.05*x)"        # Reduces by 0-5%
  x=0.0 → 0.00 (no reduction)
  x=0.5 → -0.025 (2.5% reduction)
  x=1.0 → -0.05 (5% reduction)

Negative scaling from base:
"0.1-(0.15*x)"      # Starts at 10%, reduces to -5%
  x=0.0 → 0.10 (10% increase)
  x=0.5 → 0.025 (2.5% increase)
  x=1.0 → -0.05 (5% decrease)

Negative polynomial:
"0-(0.08*(x^2))"    # Quadratic reduction
  x=0.7 → -0.0392 (3.92% reduction)
```

```pseudocode
Negative Effect Implementation:
FUNCTION apply_negative_effect(target, coefficient, x):
    effect = 0 - (coefficient * x)
    // effect is always <= 0
    target.modify(effect)
    RETURN effect

Use cases in game design:

1. Problem reduction policies:
   PoliceForce → CrimeRate: "0-(0.1*x)"
   - More police = less crime

2. Trade-off policies:
   HighTaxes → GDP: "0-(0.05*x)"
   - Higher taxes harm economic growth

3. Balancing mechanisms:
   Education → Unemployment: "0-(0.03*x)"
   - More education reduces joblessness

Sign conventions:
+ or 0+ = increases target
- or 0- = decreases target
Mixed: "0.1-(0.2*x)" = starts positive, becomes negative
```
:p How do negative effect equations work in Democracy 4?
??x
Format: "0-(coefficient*x)" or with negative coefficients

Purpose: Reduce target variable values

Common patterns:

1. Pure negative: "0-(0.05*x)"
   - Always reduces target
   - Scales from 0 (at x=0) to -5% (at x=1)

2. Base with negative: "0.1-(0.15*x)"
   - Can switch from positive to negative
   - At x=0: +10% (increase)
   - At x=0.67: 0% (neutral)
   - At x=1: -5% (decrease)

3. Negative polynomial: "0-(0.08*(x^2))"
   - Accelerating reduction
   - Combines negative with non-linear

Use cases:
- Policies that solve problems
  Example: PoliceForce reduces CrimeRate
- Trade-offs and costs
  Example: HighTaxes reduces GDP
- Balancing effects
  Example: Education reduces Unemployment

Sign = direction of effect (+ increase, - decrease)
x??

---

#### Interaction Effect Equations
Interaction equations multiply a policy effect by another variable, creating conditional relationships. Format: "(coefficient*x)*VariableName". The effect depends on both the source policy (x) and the referenced variable. This models realistic scenarios where one policy's impact depends on another's state (e.g., military alliance benefits scale with military spending).

```
Interaction formats:

Policy-policy interaction:
"(0.22*x)*MilitarySpending"
  If x=0.5 and MilitarySpending=0.8:
  Effect = (0.22 * 0.5) * 0.8 = 0.088 (8.8%)

  If x=0.5 and MilitarySpending=0.2:
  Effect = (0.22 * 0.5) * 0.2 = 0.022 (2.2%)

Policy-situation interaction:
"(0.15*x)*GDP"
  Effect scales with both policy and economic state
  Strong economy = stronger policy impact

Multiple multipliers:
"(0.1*x)*GDP*Technology"
  Effect depends on three factors
```

```pseudocode
Interaction Effect:
FUNCTION apply_interaction_effect(target, coefficient, x, multiplier_var):
    multiplier_value = get_value(multiplier_var)
    effect = (coefficient * x) * multiplier_value
    target.modify(effect)
    RETURN effect

Example simulation:
Policy: natomembership (x)
Effect: "ForeignRelations,(0.22*x)*MilitarySpending"

Turn 1:
  natomembership = 1.0 (full membership)
  MilitarySpending = 0.3 (low)
  Effect = (0.22 * 1.0) * 0.3 = 0.066 (6.6% boost)

Turn 2:
  natomembership = 1.0 (full membership)
  MilitarySpending = 0.8 (high)
  Effect = (0.22 * 1.0) * 0.8 = 0.176 (17.6% boost)

Design insight:
Creates synergies between policies
Rewards coherent strategy
Models realistic dependencies
```
:p What are interaction effect equations and how do they create policy synergies?
??x
Format: "(coefficient*x)*VariableName"

Effect depends on TWO factors:
1. Source policy value (x)
2. Referenced variable value

Example: "(0.22*x)*MilitarySpending"
- x = source policy (e.g., natomembership)
- MilitarySpending = multiplier variable
- Effect = (0.22 * x) * MilitarySpending

Scenarios:
If x=1.0, MilitarySpending=0.3 → Effect = 6.6%
If x=1.0, MilitarySpending=0.8 → Effect = 17.6%

Creates synergies:
- Same policy has different impact based on context
- Rewards coherent strategy
- Models realistic dependencies
  Example: NATO membership more valuable with strong military

Can chain multiple:
"(0.1*x)*GDP*Technology"
- Effect depends on policy, economy, AND tech level

Design use: Force strategic policy combinations
x??

---

#### Cost Function Scaling
Cost functions determine how much budget a policy requires. Format same as effect equations but applied to calculate cost between mincost and maxcost. "0+(1.0*x)" means linear scaling from min to max. The result is interpolated: actual_cost = mincost + (function_result * (maxcost - mincost)). Cost multiplier field provides an additional scaling factor. Polynomial cost functions can make high-level policies exponentially expensive.

```
Cost function examples:

Linear "0+(1.0*x)":
  mincost=10000, maxcost=100000
  x=0.0 → cost = 10000 + (0.0 * 90000) = 10000
  x=0.5 → cost = 10000 + (0.5 * 90000) = 55000
  x=1.0 → cost = 10000 + (1.0 * 90000) = 100000

Partial scaling "0+(0.5*x)":
  mincost=10000, maxcost=100000
  x=1.0 → cost = 10000 + (0.5 * 90000) = 55000
  Never reaches maxcost (caps at 55% of range)

Polynomial "0.112*(x^3)":
  mincost=10000, maxcost=100000
  x=0.5 → cost = 10000 + (0.014 * 90000) = 11260
  x=0.8 → cost = 10000 + (0.057 * 90000) = 15130
  x=1.0 → cost = 10000 + (0.112 * 90000) = 20080
```

```pseudocode
Cost Calculation:
FUNCTION calculate_policy_cost(policy, x):
    // Evaluate cost function
    function_result = evaluate(policy.costfunction, x)

    // Interpolate between min and max
    cost_range = policy.maxcost - policy.mincost
    base_cost = policy.mincost + (function_result * cost_range)

    // Apply multiplier
    final_cost = base_cost * policy.cost_multiplier

    RETURN final_cost

Budget Impact:
EVERY turn:
    total_spending = 0

    FOR each active_policy:
        policy_cost = calculate_policy_cost(active_policy, active_policy.value)
        total_spending += policy_cost

    budget.available -= total_spending

Design implications:
- Linear: cost proportional to value
- Polynomial: extreme values very expensive
- Partial scaling: cost caps below maxcost
- Forces budget trade-offs
```
:p How do cost functions determine policy budget requirements in Democracy 4?
??x
Cost functions calculate budget required for policies.

Formula: actual_cost = mincost + (function_result * (maxcost - mincost))

Process:
1. Evaluate costfunction with current policy value x
2. Interpolate result between mincost and maxcost
3. Multiply by cost_multiplier

Examples:

Linear "0+(1.0*x)":
- x=0: mincost
- x=0.5: halfway between
- x=1: maxcost
- Proportional scaling

Partial "0+(0.5*x)":
- x=1: only 50% of cost range
- Never reaches maxcost
- Gentler budget impact

Polynomial "0.112*(x^3)":
- x=0.5: 1.4% of range
- x=1.0: 11.2% of range
- Extreme values much more expensive

Impact:
- Linear: predictable budget
- Polynomial: makes extreme policies very costly
- Forces player trade-offs and prioritization
x??

---

#### Inertia in Overrides
Override files include an 'Inertia' field (0-1) that controls how quickly effects apply. Inertia=0 means immediate application (effect applies fully next turn). Inertia=0.5 means 50% per turn (effect gradually increases to target). Inertia=1.0 means very gradual change. This models realistic lag in public opinion, economic changes, or infrastructure development. Prevents unrealistic instant swings in simulation variables.

```ini
Override file with inertia:
[override]
TargetName = "PublicOpinion"
HostName = "PropagandaPolicy"
Equation = "0.05+(0.1*x)"
Inertia = 0.5                # 50% application per turn
```

```pseudocode
Inertia Implementation:
class Override {
    target: string
    host: string
    equation: string
    inertia: float           // 0-1
    current_effect: float    // Accumulated effect
    target_effect: float     // Desired effect
}

EVERY turn:
    FOR each override in active_overrides:
        // Calculate target effect from equation
        host_value = get_value(override.host)
        override.target_effect = evaluate(override.equation, host_value)

        IF override.inertia == 0:
            // Immediate application
            override.current_effect = override.target_effect
        ELSE:
            // Gradual application
            rate = 1.0 - override.inertia
            delta = override.target_effect - override.current_effect
            override.current_effect += delta * rate

        // Apply current effect to target
        target_var = get_variable(override.target)
        target_var.modify(override.current_effect)

Example timeline (Inertia=0.5, target_effect=0.1):
Turn 1: current = 0.05 (50% of 0.1)
Turn 2: current = 0.075 (50% of remaining 0.05)
Turn 3: current = 0.0875 (50% of remaining 0.025)
Turn 4: current = 0.09375
...asymptotically approaches 0.1
```
:p What is the Inertia field in override files and how does it affect gameplay?
??x
Inertia (0-1) controls how quickly override effects apply.

Values:
- 0 = Immediate (effect applies fully next turn)
- 0.5 = 50% application per turn (gradual)
- 1.0 = Very gradual change
- Higher inertia = slower change

Mechanics:
1. Calculate target effect from equation
2. If inertia=0: apply target immediately
3. If inertia>0: gradually move current toward target
   - rate = 1 - inertia
   - Each turn: close gap by (rate * remaining_difference)

Example (Inertia=0.5, target=0.1):
- Turn 1: 0.05 (50% of target)
- Turn 2: 0.075 (50% of remaining gap)
- Turn 3: 0.0875 (asymptotic approach)

Purpose:
- Models realistic lag (public opinion, economic changes)
- Prevents instant swings
- Creates momentum in simulation
- Adds strategic planning depth

Example use: Public opinion changes gradually, not instantly
x??

---

#### Demographic Frequency Variables
Democracy 4 includes demographic variables with _freq suffix (e.g., Young_freq, Retired_freq) representing population percentages. Effects on base demographics (e.g., Young) affect absolute numbers, while _freq variables track proportions. Policy effects often target both: "Young,0.1+(0.08*x)" affects happiness of young people, while some policies might shift "Young_freq,0.01+(0.02*x)" to increase the proportion of young people in the population.

```
Demographic variables:

Base demographics (absolute):
Young, Retired, Parents, MiddleIncome, HighIncome, Poor, Rich

Frequency variants (proportional):
Young_freq, Retired_freq, Parents_freq, etc.

Political groups:
Conservatives, Liberal, Socialist, Capitalist, Pacifist, etc.

Special aggregate:
_All_ - affects all demographic groups equally
```

```pseudocode
Demographic System:
class Demographics {
    // Absolute values (happiness/satisfaction)
    young_satisfaction: float
    retired_satisfaction: float
    parents_satisfaction: float

    // Frequency (population percentage)
    young_freq: float       // % of population that is young
    retired_freq: float     // % of population that is retired
    parents_freq: float     // % of population with children

    total_population: int
}

Effect application:

Policy: "EducationFunding"
Effects:
  "Young,0.1+(0.08*x)"        # Young people happier
  "Parents,0.05+(0.05*x)"     # Parents happier
  "Conservatives,-0.02-(0.03*x)"  # Conservatives unhappier

Policy: "ImmigrationReform"
Effects:
  "Young_freq,0.01+(0.02*x)"  # Shifts age distribution younger
  "Liberal,0.08+(0.1*x)"      # Liberals happier

Electoral calculations:
total_support = 0
FOR each demographic in all_demographics:
    weight = demographic.freq  // Population percentage
    support = demographic.satisfaction
    total_support += weight * support

RETURN total_support
```
:p What are demographic frequency variables and how do they differ from base demographics?
??x
Two types of demographic variables:

1. Base demographics (absolute):
   - Young, Retired, Parents, Rich, Poor, etc.
   - Represent happiness/satisfaction of group
   - Values affect electoral support

2. Frequency variants (proportional):
   - Young_freq, Retired_freq, Parents_freq, etc.
   - Represent population percentage
   - Suffix: _freq
   - Track demographic distribution

Difference:

Base: "Young,0.1+(0.08*x)"
- Makes young people happier
- Doesn't change population proportion

Frequency: "Young_freq,0.01+(0.02*x)"
- Shifts population distribution
- More young people in population
- Example: Immigration policy

Electoral impact:
support = Σ (demographic.satisfaction × demographic.freq)
- Satisfaction = how happy they are
- Frequency = how many there are
- Both matter for winning elections

Special: _All_ affects all demographics equally
x??

---

