# Democracy 4 Modding Practice Exercises

## Introduction

These exercises will help you learn Democracy 4 modding through hands-on practice. Each exercise builds on previous knowledge and introduces new concepts.

**Difficulty Progression**:
- Exercise 1: Beginner - Simple policy addition
- Exercise 2: Intermediate - Policy with situation
- Exercise 3: Advanced - Complete mod with events and overrides

**Time Estimates**:
- Exercise 1: 30 minutes
- Exercise 2: 45 minutes
- Exercise 3: 60 minutes

---

## Exercise 1: Create a "Digital Services Tax" Policy

**Difficulty**: Beginner
**Time**: 30 minutes
**Concepts**: Basic mod structure, policy creation, CSV format

### Goal

Create a mod that adds a new tax policy targeting digital services (streaming, social media, etc.). This policy should:
- Generate government revenue
- Slightly anger technology companies and capitalists
- Have minimal GDP impact
- Be associated with the taxation slider

### Step-by-Step Instructions

#### Step 1: Create Folder Structure

**Location**: `Documents\My Games\Democracy4\mods\digital_tax_exercise\`

Create these folders:
```
digital_tax_exercise/
├── config.txt
└── data/
    └── simulation/
        └── policies.csv
```

**Commands** (PowerShell):
```powershell
cd "$env:USERPROFILE\Documents\My Games\Democracy4\mods"
New-Item -ItemType Directory -Path "digital_tax_exercise\data\simulation" -Force
```

---

#### Step 2: Create config.txt

**File**: `digital_tax_exercise/config.txt`

**Your Task**: Fill in the configuration file with:
- name: `digital_tax_exercise`
- guiname: `Digital Services Tax`
- author: Your name
- description: Describe what this mod does

**Template**:
```ini
[config]
name = _______________
guiname = _______________
author = _______________
description = _______________
```

**Solution** (Try first, then check):
<details>
<summary>Click to reveal solution</summary>

```ini
[config]
name = digital_tax_exercise
guiname = Digital Services Tax
author = YourName
description = Adds a taxation policy targeting digital services like streaming platforms and social media companies.
```
</details>

---

#### Step 3: Create policies.csv

**File**: `digital_tax_exercise/data/simulation/policies.csv`

**Your Task**: Create a policy with these specifications:

| Specification | Value |
|---------------|-------|
| Internal Name | DIGITAL_SERVICES_TAX |
| Display Name | Digital Services Tax |
| Category | tax |
| Implementation Cost | 40 political capital |
| Cancellation Cost | 30 political capital |
| Revenue Range | 75 (min) to 350 (max) |
| Effect on Capitalist | -0.06 (scaled with x) |
| Effect on Technology sector | -0.10 (scaled with x) |
| Effect on GDP | -0.015 (scaled with x) |

**Template** (Fill in the blanks):
```csv
name,guiname,description,category,implementation_cost,cancellation_cost,income,min_income,max_income,slider,Capitalist,Capitalist_eq,Technology,Technology_eq,GDP,GDP_eq
DIGITAL_SERVICES_TAX,Digital Services Tax,A tax on revenue from digital services and platforms.,___,___,___,0,___,___,TaxationVsSpending,___,-(x*___),___,-(x*___),___,-(x*___)
```

**Hints**:
- Negative effects use `-` sign
- Equations scale with `x` (policy strength): `-(x*0.06)`
- Income doesn't need equation if using min/max

**Solution** (Try first, then check):
<details>
<summary>Click to reveal solution</summary>

```csv
name,guiname,description,category,implementation_cost,cancellation_cost,income,min_income,max_income,slider,Capitalist,Capitalist_eq,Technology,Technology_eq,GDP,GDP_eq
DIGITAL_SERVICES_TAX,Digital Services Tax,A tax on revenue from digital services and platforms.,tax,40,30,0,75,350,TaxationVsSpending,-0.06,-(x*0.06),-0.10,-(x*0.10),-0.015,-(x*0.015)
```
</details>

---

#### Step 4: Test Your Mod

**Testing Checklist**:

1. **Load Game**
   - Launch Democracy 4
   - Go to Mods menu
   - Find "Digital Services Tax"
   - Enable it
   - Start a new game

2. **Find Policy**
   - Open policy screen (top bar)
   - Navigate to "Taxation" category
   - Look for "Digital Services Tax"

3. **Test Functionality**
   - Click policy to implement (costs 40 political capital)
   - Adjust slider to different positions
   - Observe income generation (check budget screen)
   - Watch Capitalist opinion (check voter groups)
   - Monitor Technology sector

4. **Expected Results**:

| Policy Strength | Income | Capitalist | Technology | GDP |
|----------------|--------|------------|------------|-----|
| 0% (off) | 0 | 0 | 0 | 0 |
| 50% | ~212 | -0.03 | -0.05 | -0.0075 |
| 100% (max) | 350 | -0.06 | -0.10 | -0.015 |

5. **Troubleshooting**:
   - If mod doesn't appear: Check config.txt location and syntax
   - If policy doesn't show: Verify CSV format and column headers
   - If effects don't work: Check equation syntax

---

#### Step 5: Experiment and Learn

**Optional Challenges**:

1. **Increase Revenue**: Change `max_income` to 500
2. **Adjust Opinion Impact**: Make Technology even more upset (-0.15)
3. **Add Positive Effect**: Make Socialists happy (+0.05 opinion)
   - Add columns: `Socialist,Socialist_eq`
   - Values: `0.05,(x*0.05)`

**Reflection Questions**:
- What happens to tax revenue if you set it too high?
- How do voter groups react to this policy?
- Is the policy balanced for gameplay?

---

## Exercise 2: Add an "Internet Infrastructure Crisis" Situation

**Difficulty**: Intermediate
**Time**: 45 minutes
**Concepts**: Situations, triggers, policy interactions

### Goal

Expand your Digital Services Tax mod to include a situation that can occur when digital infrastructure is inadequate. This will teach you:
- How to create situations
- How to link situations to policies
- How situations affect gameplay

### Prerequisites

Complete Exercise 1 first (or use the solution provided)

---

### Step-by-Step Instructions

#### Step 1: Add situations.csv

**File**: `digital_tax_exercise/data/simulation/situations.csv`

**Your Task**: Create a situation that:
- Represents poor internet infrastructure
- Reduces GDP and technology sector happiness
- Can be triggered when certain conditions are met
- Potentially mitigated by technology spending

**Template**:
```csv
name,guiname,description,GDP,GDP_eq,Technology,Technology_eq,Productivity,Productivity_eq
INTERNET_INFRASTRUCTURE_CRISIS,Internet Infrastructure Crisis,Outdated internet infrastructure is hindering economic growth and digital services.,___,-(x*___),___,-(x*___),___,-(x*___)
```

**Specifications**:

| Field | Value |
|-------|-------|
| Internal Name | INTERNET_INFRASTRUCTURE_CRISIS |
| Display Name | Internet Infrastructure Crisis |
| GDP Impact | -0.05 (scaled) |
| Technology Impact | -0.12 (scaled) |
| Productivity Impact | -0.03 (scaled) |

**Solution** (Try first, then check):
<details>
<summary>Click to reveal solution</summary>

```csv
name,guiname,description,GDP,GDP_eq,Technology,Technology_eq,Productivity,Productivity_eq
INTERNET_INFRASTRUCTURE_CRISIS,Internet Infrastructure Crisis,Outdated internet infrastructure is hindering economic growth and digital services.,-0.05,-(x*0.05),-0.12,-(x*0.12),-0.03,-(x*0.03)
```
</details>

---

#### Step 2: Link Situation to Policy Using Overrides

Now we'll make the Digital Services Tax potentially worsen this situation (taxing digital services without investing in infrastructure could harm it).

**Create Folder**: `digital_tax_exercise/data/overrides/`

**File**: `digital_tax_exercise/data/overrides/DigitalTaxInfrastructure.ini`

**Your Task**: Create an override that makes DIGITAL_SERVICES_TAX increase the INTERNET_INFRASTRUCTURE_CRISIS

**Template**:
```ini
[override]
TargetName = _______________
HostName = _______________
Equation = (x*___)
Inertia = ___
```

**Specifications**:
- Target: The situation we want to affect
- Host: The policy causing the effect
- Equation: Small increase `(x*0.05)` - tax burden on digital sector
- Inertia: 10 (slow effect over time)

**Solution** (Try first, then check):
<details>
<summary>Click to reveal solution</summary>

```ini
[override]
TargetName = INTERNET_INFRASTRUCTURE_CRISIS
HostName = DIGITAL_SERVICES_TAX
Equation = (x*0.05)
Inertia = 10
```

**Explanation**: This makes the crisis slightly worse when the Digital Services Tax is active, simulating how taxing the digital sector without infrastructure investment can harm growth.
</details>

---

#### Step 3: Add a Balancing Policy (Optional Advanced)

Let's add a policy that can help reduce the infrastructure crisis.

**File**: `digital_tax_exercise/data/simulation/policies.csv`

**Your Task**: Add a second row for "Broadband Infrastructure Investment"

**Template** (Add this as second row, after header):
```csv
BROADBAND_INVESTMENT,Broadband Infrastructure Investment,Government investment in high-speed internet infrastructure.,technology,___,___,___,___,___,___,___,___,___,___,___,___
```

**Specifications**:

| Field | Value |
|-------|-------|
| Category | technology |
| Implementation Cost | 60 |
| Cancellation Cost | 40 |
| Income (cost to govt) | 0 |
| Min Income | -200 (costs money) |
| Max Income | -50 |
| Technology Opinion | +0.08 (scaled) |
| GDP Effect | +0.03 (scaled) |

**Solution** (Try first, then check):
<details>
<summary>Click to reveal solution</summary>

```csv
BROADBAND_INVESTMENT,Broadband Infrastructure Investment,Government investment in high-speed internet infrastructure.,technology,60,40,0,-200,-50,Technology,0.08,(x*0.08),0,0,0.03,(x*0.03)
```

**Note**: This policy costs money (negative income) but boosts technology sector and GDP.
</details>

---

#### Step 4: Link Investment Policy to Crisis

**File**: `digital_tax_exercise/data/overrides/BroadbandReducesCrisis.ini`

**Your Task**: Make Broadband Investment reduce the Infrastructure Crisis

**Template**:
```ini
[override]
TargetName = _______________
HostName = _______________
Equation = -(x*___)
Inertia = ___
```

**Specifications**:
- Use negative equation to reduce crisis: `-(x*0.15)`
- Inertia: 8 (moderate speed)

**Solution** (Try first, then check):
<details>
<summary>Click to reveal solution</summary>

```ini
[override]
TargetName = INTERNET_INFRASTRUCTURE_CRISIS
HostName = BROADBAND_INVESTMENT
Equation = -(x*0.15)
Inertia = 8
```

**Explanation**: This makes Broadband Investment reduce the infrastructure crisis, creating a policy solution to the problem.
</details>

---

#### Step 5: Test the Complete System

**Testing Checklist**:

1. **Enable Mod and Start Game**

2. **Test Digital Services Tax**:
   - Implement and set to 50%
   - Observe if Infrastructure Crisis appears over time
   - Check GDP and Technology impacts

3. **Test Broadband Investment**:
   - Implement Broadband Investment
   - Set to 75%
   - Observe if crisis reduces
   - Check income (should cost money)

4. **Test Interaction**:
   - Have both policies active
   - Observe net effect on crisis
   - Balance tax revenue vs infrastructure cost

**Expected Behavior**:

| Scenario | Crisis Level | Net Income | Technology Opinion |
|----------|--------------|------------|-------------------|
| Only Digital Tax (high) | Increases | +350 | Negative |
| Only Broadband Investment | Decreases | -200 | Positive |
| Both at 100% | Stable/slight decrease | +150 | Slightly negative |

---

#### Step 6: Reflection

**Questions to Consider**:
1. How do the two policies interact?
2. What strategies would players use?
3. Is the crisis severe enough to matter?
4. Is the solution (broadband investment) worth the cost?

**Optional Enhancements**:
- Add a third policy: "Net Neutrality Regulations"
- Create an event triggered by the crisis
- Add more voter group reactions

---

## Exercise 3: Create a Complete "Green Energy Transition" Mod

**Difficulty**: Advanced
**Time**: 60 minutes
**Concepts**: Multiple policies, situations, events, complete mod ecosystem

### Goal

Create a comprehensive mod about transitioning to green energy. You'll implement:
- 2 policies (Solar Subsidies, Coal Phase-Out)
- 1 situation (Energy Transition Costs)
- 1 event (Green Energy Breakthrough)
- Multiple overrides for interactions
- Optional: Custom SVG icons

---

### Step-by-Step Instructions

#### Step 1: Plan Your Mod

Before coding, design the mod on paper:

**Policies**:
1. **Solar Subsidies**
   - Costs money but boosts renewable energy
   - Environmentalists love it, Capitalists dislike it
   - Reduces air pollution

2. **Coal Phase-Out**
   - Reduces coal industry
   - Significant environmental benefit
   - Major impact on coal workers, industry

**Situation**:
- **Energy Transition Costs**: Temporary economic impact during transition
- Triggered when both green policies active
- Reduces GDP but improves environment

**Event**:
- **Green Energy Breakthrough**: Random positive event
- Offers choice: Invest more or maintain current level
- Rewards green energy commitment

---

#### Step 2: Create Folder Structure

**Location**: `Documents\My Games\Democracy4\mods\green_energy_transition\`

```
green_energy_transition/
├── config.txt
└── data/
    ├── simulation/
    │   ├── policies.csv
    │   ├── situations.csv
    │   └── events/
    │       └── green_breakthrough.txt
    └── overrides/
        ├── SolarReducesTransitionCost.ini
        └── CoalPhasoutIncreasesTransitionCost.ini
```

**Commands** (PowerShell):
```powershell
cd "$env:USERPROFILE\Documents\My Games\Democracy4\mods"
New-Item -ItemType Directory -Path "green_energy_transition\data\simulation\events" -Force
New-Item -ItemType Directory -Path "green_energy_transition\data\overrides" -Force
```

---

#### Step 3: Create config.txt

**File**: `green_energy_transition/config.txt`

**Your Task**: Write the config file

**Hints**:
- name: green_energy_transition
- guiname: Green Energy Transition
- description: Comprehensive mod about transitioning to renewable energy

**Solution**:
<details>
<summary>Click to reveal solution</summary>

```ini
[config]
name = green_energy_transition
guiname = Green Energy Transition
author = YourName
description = A comprehensive mod simulating the economic and political challenges of transitioning from fossil fuels to renewable energy sources.
```
</details>

---

#### Step 4: Create policies.csv

**File**: `green_energy_transition/data/simulation/policies.csv`

**Your Task**: Create two policies with these specifications:

**Policy 1: Solar Subsidies**

| Field | Value |
|-------|-------|
| Name | SOLAR_SUBSIDIES |
| Category | environment |
| Implementation Cost | 50 |
| Income Range | -150 to -30 (costs money) |
| Environmentalist | +0.12 |
| Capitalist | -0.07 |
| AirQuality | +0.08 |

**Policy 2: Coal Phase-Out**

| Field | Value |
|-------|-------|
| Name | COAL_PHASEOUT |
| Category | environment |
| Implementation Cost | 75 |
| Income | -100 |
| Environmentalist | +0.20 |
| Poor | -0.10 (coal workers affected) |
| AirQuality | +0.15 |
| GDP | -0.04 |

**Template**:
```csv
name,guiname,description,category,implementation_cost,cancellation_cost,income,min_income,max_income,Environmentalist,Environmentalist_eq,Capitalist,Capitalist_eq,AirQuality,AirQuality_eq,Poor,Poor_eq,GDP,GDP_eq
SOLAR_SUBSIDIES,___,___,___,___,___,___,___,___,___,___,___,___,___,___,0,0,0,0
COAL_PHASEOUT,___,___,___,___,___,___,___,___,___,___,0,0,___,___,___,___,___,___
```

**Solution**:
<details>
<summary>Click to reveal solution</summary>

```csv
name,guiname,description,category,implementation_cost,cancellation_cost,income,min_income,max_income,Environmentalist,Environmentalist_eq,Capitalist,Capitalist_eq,AirQuality,AirQuality_eq,Poor,Poor_eq,GDP,GDP_eq
SOLAR_SUBSIDIES,Solar Subsidies,Government subsidies for residential and commercial solar panel installation.,environment,50,35,0,-150,-30,0.12,(x*0.12),-0.07,-(x*0.07),0.08,(x*0.08),0,0,0,0
COAL_PHASEOUT,Coal Phase-Out,Planned shutdown of coal power plants and transition to cleaner energy.,environment,75,60,-100,0,0,0.20,(x*0.20),0,0,0.15,(x*0.15),-0.10,-(x*0.10),-0.04,-(x*0.04)
```
</details>

---

#### Step 5: Create situations.csv

**File**: `green_energy_transition/data/simulation/situations.csv`

**Your Task**: Create the Energy Transition Costs situation

**Specifications**:

| Field | Value |
|-------|-------|
| Name | ENERGY_TRANSITION_COSTS |
| GDP | -0.03 (scaled) |
| Unemployment | +0.02 (scaled) |
| AirQuality | +0.05 (scaled, offsetting benefit) |

**Template**:
```csv
name,guiname,description,GDP,GDP_eq,Unemployment,Unemployment_eq,AirQuality,AirQuality_eq
ENERGY_TRANSITION_COSTS,___,___,___,___,___,___,___,___
```

**Solution**:
<details>
<summary>Click to reveal solution</summary>

```csv
name,guiname,description,GDP,GDP_eq,Unemployment,Unemployment_eq,AirQuality,AirQuality_eq
ENERGY_TRANSITION_COSTS,Energy Transition Costs,Economic challenges from shifting away from established energy infrastructure.,-0.03,-(x*0.03),0.02,(x*0.02),0.05,(x*0.05)
```
</details>

---

#### Step 6: Create Event File

**File**: `green_energy_transition/data/simulation/events/green_breakthrough.txt`

**Your Task**: Create an event that rewards players pursuing green energy

**Template**:
```ini
[config]
name = green_breakthrough
guiname = Green Energy Breakthrough
description = Scientists have achieved a major breakthrough in solar panel efficiency, promising cheaper renewable energy.
trigger = ___,___
minhappiness = 0.4
maxhappiness = 1.0

[option1]
guiname = Invest heavily in the new technology
description = ___
cost = 75
effect = AirQuality,0.05
grudge = Environmentalist,0.08

[option2]
guiname = Maintain current green energy programs
description = ___
cost = 0
effect = Environmentalist,0.03
```

**Specifications**:
- Trigger: Requires SOLAR_SUBSIDIES or COAL_PHASEOUT active
- Option 1: Costs political capital but major environmental benefit
- Option 2: Free but smaller benefit

**Solution**:
<details>
<summary>Click to reveal solution</summary>

```ini
[config]
name = green_breakthrough
guiname = Green Energy Breakthrough
description = Scientists have achieved a major breakthrough in solar panel efficiency, promising 40% cheaper renewable energy within five years.
trigger = SOLAR_SUBSIDIES,COAL_PHASEOUT
minhappiness = 0.4
maxhappiness = 1.0

[option1]
guiname = Invest heavily in the new technology
description = Commit significant resources to commercializing this breakthrough quickly.
cost = 75
effect = AirQuality,0.05
grudge = Environmentalist,0.08

[option2]
guiname = Maintain current green energy programs
description = Let the market develop this technology at its own pace.
cost = 0
effect = Environmentalist,0.03
```

**Note**: `trigger` uses comma-separated list. Event can occur if either policy is active.
</details>

---

#### Step 7: Create Override Files

**File 1**: `green_energy_transition/data/overrides/SolarReducesTransitionCost.ini`

**Your Task**: Make Solar Subsidies reduce the transition cost situation

**Solution**:
<details>
<summary>Click to reveal solution</summary>

```ini
[override]
TargetName = ENERGY_TRANSITION_COSTS
HostName = SOLAR_SUBSIDIES
Equation = -(x*0.10)
Inertia = 12
```

**Explanation**: Solar subsidies help smooth the energy transition, reducing economic costs.
</details>

---

**File 2**: `green_energy_transition/data/overrides/CoalPhasoutIncreasesTransitionCost.ini`

**Your Task**: Make Coal Phase-Out increase transition costs (short-term pain)

**Solution**:
<details>
<summary>Click to reveal solution</summary>

```ini
[override]
TargetName = ENERGY_TRANSITION_COSTS
HostName = COAL_PHASEOUT
Equation = (x*0.15)
Inertia = 10
```

**Explanation**: Phasing out coal creates transition costs as infrastructure must be replaced.
</details>

---

#### Step 8: Test Complete Mod

**Testing Scenarios**:

**Scenario A: Solar Only**
1. Enable only Solar Subsidies (75%)
2. Observe:
   - Income cost (~-110)
   - Environmentalist opinion (+0.09)
   - Air quality improvement
   - Transition costs slightly reduced
3. Wait for Green Breakthrough event

**Scenario B: Coal Phase-Out Only**
1. Enable only Coal Phase-Out (100%)
2. Observe:
   - Income cost (-100)
   - Poor opinion decrease (-0.10)
   - Major air quality improvement
   - Transition costs appear and increase
   - GDP decreases

**Scenario C: Full Green Transition**
1. Enable both policies (75% each)
2. Observe:
   - Combined income cost (~-210)
   - Strong environmentalist support
   - Transition costs appear but partially offset by solar
   - Net air quality improvement
3. Choose heavy investment if event triggers

**Expected Results**:

| Scenario | Net Income | Air Quality | GDP | Transition Cost |
|----------|------------|-------------|-----|----------------|
| Solar only | -110 | +0.06 | 0 | Reduced |
| Coal only | -100 | +0.15 | -0.04 | Increased |
| Both | -210 | +0.21 | -0.04 | Medium |

---

#### Step 9: Balance and Polish

**Balancing Questions**:
1. Are the costs too high for players to afford?
2. Is the environmental benefit worth the economic cost?
3. Do voters react realistically?
4. Is the event common enough to feel rewarding?

**Potential Adjustments**:
- Reduce income costs if too expensive
- Increase GDP penalty if too easy
- Add more voter group reactions
- Create additional events for variety

---

#### Step 10: Optional Enhancements

**Add Visual Assets**:
1. Create `SOLAR_SUBSIDIES.svg` icon (sun symbol)
2. Create `COAL_PHASEOUT.svg` icon (factory with X)
3. Create `ENERGY_TRANSITION_COSTS.svg` icon (warning symbol)

**Add More Content**:
1. Third policy: "Wind Farm Expansion"
2. Second situation: "Renewable Energy Boom" (positive)
3. Second event: "Coal Industry Protests"
4. More overrides linking to existing game policies

**Add Translations**:
1. Create `translations/english/policies.csv`
2. Create `translations/english/situations.csv`
3. Support other languages

---

## Conclusion and Next Steps

### What You've Learned

**Exercise 1**:
- Basic mod structure
- Policy creation
- CSV format
- Effect equations

**Exercise 2**:
- Situations
- Overrides
- Policy interactions
- Cause and effect systems

**Exercise 3**:
- Complete mod ecosystem
- Events
- Complex interactions
- Balancing

---

### Continue Learning

**Mini Challenges**:
1. Combine all three exercises into one mega-mod
2. Create a mod about education reform
3. Create a mod adding a new country
4. Create a UI theme mod (palettes)

**Study Existing Mods**:
- Examine "D4 Overhaul & Expansion" (ID: 2308946130)
- Study "Foreign Policy Expansion" (ID: 2284570370)
- Learn from "VF's Industrial Economics" (ID: 2998454951)

**Join the Community**:
- Share your mods on Steam Workshop
- Get feedback from other modders
- Collaborate on larger projects
- Help beginners learn

---

### Troubleshooting Reference

**Common Issues**:

| Problem | Solution |
|---------|----------|
| Mod won't load | Check config.txt syntax and location |
| Policy not visible | Verify CSV format and headers |
| Effects not working | Check equation syntax and variable names |
| Event not triggering | Verify trigger conditions and happiness range |
| Override not applying | Check TargetName and HostName spelling |
| Icon not showing | Match filename to internal name exactly |

---

## Congratulations!

You've completed all practice exercises and are now ready to create your own Democracy 4 mods. Remember:

- Start with simple ideas
- Test frequently
- Learn from examples
- Have fun experimenting!

**Happy Modding!**
