# RimWorld Modding Flashcards - Advanced Techniques

---

#### Version-Specific Assemblies - API Changes
Different RimWorld versions often have different APIs, requiring separate DLL compilation. Common approach: Compile separate DLLs for each version, place in version folders (1.4/Assemblies/, 1.5/Assemblies/), use LoadFolders.xml to route. This handles breaking changes between versions like class renames, method signature changes, or namespace reorganizations.

**Why needed:**
```
RimWorld 1.4: public class OldClassName { void Method(int x); }
RimWorld 1.5: public class NewClassName { void Method(int x, bool y); }
RimWorld 1.6: public class NewClassName { void Method(float x, bool y); }
```

**Solution structure:**
```
MyMod/
├── About/About.xml
├── LoadFolders.xml
├── 1.4/
│   └── Assemblies/
│       └── MyMod.dll        [Compiled against RW 1.4]
├── 1.5/
│   └── Assemblies/
│       └── MyMod.dll        [Compiled against RW 1.5]
└── 1.6/
    └── Assemblies/
        └── MyMod.dll        [Compiled against RW 1.6]
```

**LoadFolders.xml:**
```xml
<loadFolders>
    <v1.4><li>1.4</li></v1.4>
    <v1.5><li>1.5</li></v1.5>
    <v1.6><li>1.6</li></v1.6>
</loadFolders>
```

**Alternative:** Conditional compilation with #if directives (more complex)
:p Why do C# mods need different assemblies for different RimWorld versions?
??x
**Reason:** RimWorld API changes between versions

**Common changes:**
- Class renamed or moved to different namespace
- Method signatures changed (parameters added/removed/changed)
- Properties changed from field to property or vice versa
- Entire systems refactored

**Example breaking change:**
```
v1.4: pawn.equipment.Primary
v1.5: pawn.equipment.AllEquipmentListForReading.FirstOrDefault()
```

**Solution: Version-specific DLLs**
```
MyMod/
├── 1.4/Assemblies/MyMod.dll   [Compiled against RW 1.4 DLLs]
├── 1.5/Assemblies/MyMod.dll   [Compiled against RW 1.5 DLLs]
└── 1.6/Assemblies/MyMod.dll   [Compiled against RW 1.6 DLLs]
```

**LoadFolders.xml routes to correct version:**
```xml
<loadFolders>
    <v1.5><li>1.5</li></v1.5>
    <v1.6><li>1.6</li></v1.6>
</loadFolders>
```

**Effect:**
- RimWorld 1.5 loads 1.5/Assemblies/MyMod.dll
- RimWorld 1.6 loads 1.6/Assemblies/MyMod.dll
- No compilation errors, mod works on all versions

**Statistics:** ~50 of 65 analyzed mods support multiple versions this way
x??

---

#### Vanilla Expanded Framework Pattern - Shared Dependencies
Vanilla Expanded series uses a framework mod (VE Core) that all other VE mods depend on. This centralizes common code, reduces duplication, and ensures consistent behavior. About 12 VE series mods analyzed all depend on the framework. Pattern: Create core mod with shared systems, content mods depend on it via modDependencies.

**Framework mod (VE Core):**
```xml
<!-- About.xml -->
<packageId>OskarPotocki.VanillaFactionsExpanded.Core</packageId>
<name>Vanilla Expanded Framework</name>
<loadBefore>
    <li>Ludeon.RimWorld</li>  <!-- Loads early -->
</loadBefore>
```

Contains: Shared C# utilities, common definitions, base classes

**Content mod (VE Weapons):**
```xml
<!-- About.xml -->
<packageId>VanillaExpanded.VWE</packageId>
<name>Vanilla Weapons Expanded</name>

<modDependencies>
    <li>
        <packageId>OskarPotocki.VanillaFactionsExpanded.Core</packageId>
        <displayName>Vanilla Expanded Framework</displayName>
    </li>
</modDependencies>

<loadAfter>
    <li>OskarPotocki.VanillaFactionsExpanded.Core</li>
</loadAfter>
```

**Benefits:**
- Code reuse across mod series
- Consistent API for all VE mods
- Easier maintenance (fix once in framework)
- Users only download framework once
:p What is the Vanilla Expanded Framework pattern and why is it useful?
??x
**Pattern:** Create a core framework mod that provides shared functionality to a series of content mods

**Structure:**

**Framework mod (VE Core):**
```xml
<packageId>OskarPotocki.VanillaFactionsExpanded.Core</packageId>
<name>Vanilla Expanded Framework</name>
```
- Contains shared C# code
- Provides utilities and base classes
- Loads before content mods

**Content mods (VE Weapons, VE Armor, etc.):**
```xml
<modDependencies>
    <li>
        <packageId>OskarPotocki.VanillaFactionsExpanded.Core</packageId>
    </li>
</modDependencies>
<loadAfter>
    <li>OskarPotocki.VanillaFactionsExpanded.Core</li>
</loadAfter>
```

**Benefits:**

**For developers:**
- Write shared code once
- Fix bugs in one place
- Consistent API across series
- Easier to add new mods

**For users:**
- Download framework once
- All VE mods work together seamlessly
- Smaller individual mod sizes

**Examples in analysis:**
- Vanilla Expanded Framework (core)
- Vanilla Weapons Expanded (depends on core)
- Vanilla Armor Expanded (depends on core)
- Vanilla Books Expanded (depends on core)
- 12+ mods in series

**Your own mod series:** Same pattern for multi-mod projects
x??

---

#### HugsLib Pattern - Mod Settings and Updates
HugsLib provides shared functionality for mod settings UI, logging, and update checking. Mods depending on HugsLib inherit mod settings system without implementing UI themselves. Pattern: Declare dependency, use HugsLib.Settings API. About 8% of analyzed mods use this. Provides standardized mod options interface accessible from main menu.

**About.xml dependency:**
```xml
<modDependencies>
    <li>
        <packageId>UnlimitedHugs.HugsLib</packageId>
        <displayName>HugsLib</displayName>
    </li>
</modDependencies>
<loadAfter>
    <li>UnlimitedHugs.HugsLib</li>
</loadAfter>
```

**Using HugsLib settings:**
```csharp
using HugsLib;
using HugsLib.Settings;

namespace MyMod
{
    public class MyModBase : ModBase
    {
        public override string ModIdentifier => "MyMod";

        private SettingHandle<bool> enableFeature;
        private SettingHandle<int> maxValue;

        public override void DefsLoaded()
        {
            // Create mod settings
            enableFeature = Settings.GetHandle<bool>(
                "enableFeature",
                "Enable Feature",
                "Tooltip explaining the feature",
                true  // default value
            );

            maxValue = Settings.GetHandle<int>(
                "maxValue",
                "Maximum Value",
                "Maximum allowed value",
                100  // default
            );
        }
    }
}
```

**Benefits:** Automatic UI generation, save/load handling, standardized user experience
:p What is HugsLib and what features does it provide to dependent mods?
??x
**Definition:** HugsLib is a shared library providing common mod functionality

**Created by:** UnlimitedHugs
**Used by:** ~8% of analyzed mods
**Package ID:** `UnlimitedHugs.HugsLib`

**Features provided:**

**1. Mod Settings System**
- Automatic settings UI in main menu
- Save/load handling
- Type-safe setting handles
```csharp
var setting = Settings.GetHandle<bool>("settingName", "Label", "Description", true);
```

**2. Update Checking**
- Notifies users of mod updates
- Version checking from GitHub/Steam

**3. Logging Utilities**
- Enhanced logging beyond vanilla Log
- Per-mod log controls

**4. Mod Base Class**
- Standardized mod initialization
- Lifecycle callbacks
```csharp
public class MyMod : ModBase
{
    public override void DefsLoaded() { }
    public override void WorldLoaded() { }
}
```

**Dependency declaration:**
```xml
<modDependencies>
    <li>
        <packageId>UnlimitedHugs.HugsLib</packageId>
    </li>
</modDependencies>
```

**Benefits:**
- Don't reimplement settings UI
- Consistent user experience
- Well-tested shared code

**Examples:** Defensive Positions, many QoL mods
x??

---

#### Combat Extended Compatibility - Common Patch Pattern
Combat Extended (CE) massively overhauls combat, breaking many weapon/armor mods. Standard compatibility pattern: Create Patches_CE.xml with PatchOperationFindMod to detect CE, add CE-specific stats and properties. Very common - many weapon/armor mods include CE patches even if they don't require it.

**Patches_CE.xml structure:**
```xml
<?xml version="1.0" encoding="utf-8"?>
<Patch>
    <Operation Class="PatchOperationFindMod">
        <mods>
            <li>CETeam.CombatExtended</li>
        </mods>

        <match Class="PatchOperationSequence">
            <operations>
                <!-- Add CE-specific ammo properties -->
                <li Class="PatchOperationAdd">
                    <xpath>/Defs/ThingDef[defName="MyMod_Gun"]/statBases</xpath>
                    <value>
                        <Bulk>3.50</Bulk>
                        <Mass>3.2</Mass>
                        <SightsEfficiency>1.0</SightsEfficiency>
                    </value>
                </li>

                <!-- Change weapon class to CE version -->
                <li Class="PatchOperationReplace">
                    <xpath>/Defs/ThingDef[defName="MyMod_Gun"]/thingClass</xpath>
                    <value>
                        <thingClass>CombatExtended.AmmoUser</thingClass>
                    </value>
                </li>

                <!-- Add CE ammo compatibility -->
                <li Class="PatchOperationAdd">
                    <xpath>/Defs/ThingDef[defName="MyMod_Gun"]</xpath>
                    <value>
                        <verbs>
                            <li Class="CombatExtended.VerbPropertiesCE">
                                <!-- CE verb properties -->
                            </li>
                        </verbs>
                    </value>
                </li>
            </operations>
        </match>
    </Operation>
</Patch>
```
:p What is the standard pattern for Combat Extended compatibility in weapon/armor mods?
??x
**Pattern:** Create Patches_CE.xml that only applies if CE is loaded

**File:** `Patches/Patches_CE.xml`

**Structure:**
```xml
<Patch>
    <Operation Class="PatchOperationFindMod">
        <mods>
            <li>CETeam.CombatExtended</li>
        </mods>

        <match Class="PatchOperationSequence">
            <operations>
                <!-- Add CE-specific stats -->
                <li Class="PatchOperationAdd">
                    <xpath>/Defs/ThingDef[defName="MyWeapon"]/statBases</xpath>
                    <value>
                        <Bulk>3.0</Bulk>
                        <Mass>2.5</Mass>
                        <SightsEfficiency>1.0</SightsEfficiency>
                    </value>
                </li>

                <!-- Change to CE weapon class -->
                <li Class="PatchOperationReplace">
                    <xpath>/Defs/ThingDef[defName="MyWeapon"]/thingClass</xpath>
                    <value>
                        <thingClass>CombatExtended.AmmoUser</thingClass>
                    </value>
                </li>
            </operations>
        </match>
    </Operation>
</Patch>
```

**Why needed:**
- CE changes combat system completely
- Vanilla weapons don't work with CE
- Mod weapons need CE-specific properties

**Common additions:**
- Bulk stat (inventory management)
- CE-specific verb classes
- Ammo compatibility
- Armor penetration values

**Effect:**
- Without CE: Patches don't apply, mod works normally
- With CE: Patches apply, mod compatible with CE

**Very common pattern** - many weapon mods include this
x??

---

#### Research View Positioning - X/Y Coordinates
researchViewX and researchViewY position research nodes on the research tree UI. Values are floats, can be decimal. Vanilla research uses specific layout. Poor positioning makes research hard to find. Best practice: Place near prerequisites visually, use similar X values for same tech tier, increment Y to avoid overlap.

**Positioning logic:**
```xml
<ResearchProjectDef>
    <defName>MyMod_BasicResearch</defName>
    <researchViewX>2.00</researchViewX>    <!-- Early tech (left) -->
    <researchViewY>3.50</researchViewY>    <!-- Middle height -->

    <prerequisites>
        <li>Smithing</li>  <!-- Should be visually near Smithing -->
    </prerequisites>
</ResearchProjectDef>

<ResearchProjectDef>
    <defName>MyMod_AdvancedResearch</defName>
    <researchViewX>8.00</researchViewX>    <!-- Late tech (right) -->
    <researchViewY>3.50</researchViewY>    <!-- Same Y as basic (same tier) -->

    <prerequisites>
        <li>MyMod_BasicResearch</li>
    </prerequisites>
</ResearchProjectDef>
```

**Guidelines:**
- X axis: 0 (left/early) to 12+ (right/late)
- Y axis: 0 (top) to 8+ (bottom)
- Use decimals for fine positioning: 2.50, 3.25, etc.
- Keep related research on similar Y level
- Chain prerequisites left to right

**Finding good positions:**
1. Look at vanilla research near your prerequisites
2. Use similar X/Y coordinates
3. Test in-game to check overlap
:p How do you position research projects on the research tree UI?
??x
**Use researchViewX and researchViewY coordinates:**

```xml
<ResearchProjectDef>
    <defName>MyMod_Research</defName>
    <label>my research</label>

    <researchViewX>6.00</researchViewX>  <!-- Horizontal position -->
    <researchViewY>2.50</researchViewY>  <!-- Vertical position -->

    <prerequisites>
        <li>Smithing</li>
    </prerequisites>
</ResearchProjectDef>
```

**Coordinate system:**
- **X axis:** 0 (left, early tech) → 12+ (right, late tech)
- **Y axis:** 0 (top) → 8+ (bottom)
- Floats allowed: 2.50, 3.75, etc.

**Best practices:**

**Progressive positioning:**
```xml
<!-- Early tech -->
<researchViewX>2.00</researchViewX>

<!-- Mid tech -->
<researchViewX>6.00</researchViewX>

<!-- Late tech -->
<researchViewX>10.00</researchViewX>
```

**Related research same tier:**
```xml
<!-- Keep Y similar for same tier -->
<researchViewY>3.50</researchViewY>  <!-- Research A -->
<researchViewY>3.50</researchViewY>  <!-- Research B (same tier) -->
<researchViewY>4.00</researchViewY>  <!-- Research C (slightly lower) -->
```

**Visual tips:**
- Place near prerequisites visually
- Avoid overlap (test in-game)
- Use decimals for fine-tuning
- Follow vanilla positioning patterns
x??

---

#### Stackable Items - stackLimit Pattern
stackLimit defines maximum stack size for items. Higher values save storage space but can cause balance issues. Vanilla patterns: Resources 500-750, Components 75, Meals 10, Weapons/Apparel 1 (non-stackable). Common mod use: Increase vanilla limits via patches for convenience. Balance consideration: higher stacks = easier storage management.

**Standard item stacking:**
```xml
<ThingDef ParentName="ResourceBase">
    <defName>MyMod_CustomResource</defName>
    <label>custom resource</label>

    <stackLimit>500</stackLimit>     <!-- Standard for raw resources -->

    <statBases>
        <MaxHitPoints>100</MaxHitPoints>
        <MarketValue>2</MarketValue>
        <Mass>0.05</Mass>            <!-- Low mass for stackable -->
    </statBases>
</ThingDef>
```

**Vanilla patterns:**
- Steel, Wood, Stone: 500
- Gold, Silver: 500
- Cloth: 500
- Components: 75
- Meals: 10
- Medicine: 25
- Weapons, Apparel: 1 (not stackable)

**QoL mod pattern (increase vanilla):**
```xml
<!-- Patches/StackIncrease.xml -->
<Patch>
    <Operation Class="PatchOperationReplace">
        <xpath>/Defs/ThingDef[defName="Silver"]/stackLimit</xpath>
        <value>
            <stackLimit>1000</stackLimit>  <!-- Double vanilla -->
        </value>
    </Operation>
</Patch>
```

**Balance consideration:** Higher stacks = less hauling, easier storage, potentially overpowered
:p What is stackLimit and what are common values for different item types?
??x
**Definition:** Maximum number of items in a single stack

```xml
<ThingDef>
    <defName>MyMod_Item</defName>
    <stackLimit>500</stackLimit>
</ThingDef>
```

**Vanilla patterns:**

**Raw resources (high stacking):**
- Steel, Wood, Stone: `500`
- Gold, Silver: `500`
- Plasteel: `500`

**Processed goods (medium):**
- Components: `75`
- Medicine: `25`

**Food (low):**
- Meals: `10`
- Raw food: `10`

**Non-stackable (1):**
- Weapons: `1`
- Apparel: `1`
- Buildings: `1`

**Custom resource example:**
```xml
<ThingDef ParentName="ResourceBase">
    <defName>MyMod_Crystal</defName>
    <stackLimit>750</stackLimit>      <!-- High stacking resource -->
    <statBases>
        <Mass>0.02</Mass>             <!-- Low mass for stackables -->
    </statBases>
</ThingDef>
```

**QoL mod pattern - Increase vanilla:**
```xml
<xpath>/Defs/ThingDef[defName="Silver"]/stackLimit</xpath>
<value><stackLimit>1000</stackLimit></value>
```

**Balance:** Higher stacks = easier storage but less realistic
x??

---

#### Work Amount Calculation - Ticks and Speed Stats
workAmount in recipes is measured in ticks (60 ticks = 1 second). Actual completion time depends on colonist's relevant skill and workSpeedStat. Formula: actual_time = workAmount / (base_speed × skill_multiplier × workSpeedStat). Understanding this helps balance recipe difficulty.

**Recipe work definition:**
```xml
<RecipeDef>
    <defName>MyMod_CraftItem</defName>
    <workAmount>1800</workAmount>           <!-- 1800 ticks = 30 seconds base -->
    <workSpeedStat>GeneralLaborSpeed</workSpeedStat>
    <skillRequirements>
        <Crafting>5</Crafting>
    </skillRequirements>
</RecipeDef>
```

**Calculation example:**
```
Base work: 1800 ticks
Colonist GeneralLaborSpeed: 100% (1.0)
Colonist Crafting skill: 10 (130% speed = 1.3)

actual_time = 1800 / (1.0 × 1.3)
           = 1800 / 1.3
           = ~1385 ticks
           = ~23 seconds
```

**Common work amounts:**
- Quick crafting: 600-1200 ticks (10-20 seconds)
- Normal crafting: 1800-3600 ticks (30-60 seconds)
- Complex crafting: 5000-10000 ticks (1.5-3 minutes)
- Buildings: 1000-20000 ticks (varies widely)

**Balancing tips:**
- More expensive items → higher workAmount
- Compare to similar vanilla recipes
- Test with different skill levels
- Consider workSpeedStat multipliers
:p How does workAmount in recipes translate to actual crafting time?
??x
**Basic conversion:**
```
60 ticks = 1 second
workAmount in ticks
```

**Simple example:**
```xml
<workAmount>1800</workAmount>  <!-- 1800 ÷ 60 = 30 seconds base -->
```

**Actual time formula:**
```
actual_time = workAmount / (colonist_speed × skill_multiplier)
```

**Detailed example:**
```xml
<workAmount>3000</workAmount>           <!-- 50 seconds base -->
<workSpeedStat>GeneralLaborSpeed</workSpeedStat>
```

**Scenario 1 - Unskilled colonist:**
- Crafting skill: 2 (slow)
- Speed multiplier: ~0.7
- Time: 3000 / 0.7 = ~4286 ticks = ~71 seconds

**Scenario 2 - Skilled colonist:**
- Crafting skill: 15 (fast)
- Speed multiplier: ~1.5
- Time: 3000 / 1.5 = 2000 ticks = ~33 seconds

**Common workAmount values:**

**Quick tasks:**
- 600: 10 seconds base
- 1200: 20 seconds base

**Normal tasks:**
- 1800: 30 seconds base
- 3600: 60 seconds base

**Complex tasks:**
- 6000: 100 seconds base (1.7 min)
- 12000: 200 seconds base (3.3 min)

**Balancing:** Compare to similar vanilla recipes
x??

---

#### Size vs DrawSize - Visual vs Mechanical
size in ThingDef is mechanical size (tiles occupied, collision), drawSize in graphicData is visual size (rendering only). They can differ! Small mechanical size with large drawSize creates compact building that looks big. Large mechanical size with small drawSize looks weird. Match them for normal buildings, mismatch intentionally for visual effects.

**Normal building (matching sizes):**
```xml
<ThingDef ParentName="BuildingBase">
    <defName>MyMod_Workbench</defName>

    <size>(3,2)</size>               <!-- Occupies 3×2 tiles mechanically -->

    <graphicData>
        <drawSize>(3,2)</drawSize>   <!-- Renders as 3×2 visually -->
    </graphicData>
</ThingDef>
```

**Visual effect (mismatched):**
```xml
<ThingDef ParentName="BuildingBase">
    <defName>MyMod_CompactMachine</defName>

    <size>(1,1)</size>               <!-- Only takes 1 tile of space -->

    <graphicData>
        <drawSize>(2,2)</drawSize>   <!-- Looks bigger (visual overlap) -->
    </graphicData>
</ThingDef>
```

**Effect:**
- **size** affects: Placement, pathfinding, collision, cost
- **drawSize** affects: Only visual rendering

**Use cases for mismatch:**
- Large visual presence but small footprint
- Visual effects extending beyond collision
- Artistic/aesthetic choices

**Caution:** Extreme mismatches confuse players (appears placeable but isn't)
:p What is the difference between size and drawSize in RimWorld building definitions?
??x
**size - Mechanical/gameplay size:**
```xml
<size>(3,2)</size>  <!-- Occupies 3 wide × 2 tall tiles -->
```
- Affects: Placement, pathfinding, collision
- Determines: Buildable area, costs, coverage
- Cannot be fractional (must be integers)

**drawSize - Visual render size:**
```xml
<graphicData>
    <drawSize>(3.5,2.5)</drawSize>  <!-- Renders visually larger -->
</graphicData>
```
- Affects: Only visual appearance
- Determines: How big it looks on screen
- Can be fractional: (1.5, 2.25), etc.

**Matching (normal buildings):**
```xml
<size>(2,1)</size>
<graphicData>
    <drawSize>(2,1)</drawSize>
</graphicData>
```
Building looks exactly as big as it is mechanically.

**Mismatched (visual effects):**
```xml
<size>(1,1)</size>              <!-- Small footprint -->
<graphicData>
    <drawSize>(2,2)</drawSize>  <!-- Looks bigger -->
</graphicData>
```

**Effects:**
- Small size, large drawSize: Compact but visually impressive
- Large size, small drawSize: Wastes space (usually unintended)

**Best practice:** Match them unless you have specific visual design reason

**Advanced:** drawSize scaling for visual polish without mechanical changes
x??

---

#### ThingCategory vs DesignationCategory
thingCategories organizes items in stockpile filters (storage), designationCategory organizes buildings in architect menu (construction). Different purposes, different uses. Items have thingCategories, buildings have designationCategory. Items appear in stockpile UI by category, buildings appear in architect menu tab.

**Item (uses thingCategories):**
```xml
<ThingDef ParentName="ResourceBase">
    <defName>MyMod_SpecialOre</defName>
    <label>special ore</label>

    <thingCategories>
        <li>ResourcesRaw</li>        <!-- Storage organization -->
        <li>Items</li>
    </thingCategories>

    <!-- No designationCategory - items aren't built -->
</ThingDef>
```

**Building (uses designationCategory):**
```xml
<ThingDef ParentName="BuildingBase">
    <defName>MyMod_Workbench</defName>
    <label>workbench</label>

    <designationCategory>Production</designationCategory>  <!-- Architect menu -->

    <!-- No thingCategories - buildings aren't stored -->
</ThingDef>
```

**When item becomes minifiable (moveable furniture):**
```xml
<ThingDef ParentName="BuildingBase">
    <defName>MyMod_MovableFurniture</defName>

    <designationCategory>Furniture</designationCategory>  <!-- For building -->

    <minifiedDef>MinifiedThing</minifiedDef>  <!-- Can be uninstalled -->

    <thingCategories>
        <li>BuildingsFurniture</li>  <!-- For when minified/stored -->
    </thingCategories>
</ThingDef>
```
:p What is the difference between thingCategories and designationCategory?
??x
**thingCategories - Storage/inventory organization:**
```xml
<ThingDef>
    <defName>MyItem</defName>
    <thingCategories>
        <li>ResourcesRaw</li>
        <li>Items</li>
    </thingCategories>
</ThingDef>
```
- For: Items, resources, moveable things
- Affects: Stockpile filters, storage UI
- Where seen: Storage zone settings, inventory screens

**designationCategory - Construction menu:**
```xml
<ThingDef>
    <defName>MyBuilding</defName>
    <designationCategory>Production</designationCategory>
</ThingDef>
```
- For: Buildings, structures
- Affects: Architect menu tabs
- Where seen: Architect menu (bottom of screen)

**Examples:**

**Regular item:**
```xml
<thingCategories><li>ResourcesRaw</li></thingCategories>
<!-- NO designationCategory -->
```
Appears in stockpile filters only.

**Permanent building:**
```xml
<designationCategory>Furniture</designationCategory>
<!-- NO thingCategories -->
```
Appears in Architect > Furniture only.

**Minifiable (moveable) furniture:**
```xml
<designationCategory>Furniture</designationCategory>  <!-- Build menu -->
<minifiedDef>MinifiedThing</minifiedDef>
<thingCategories><li>BuildingsFurniture</li></thingCategories>  <!-- Storage when uninstalled -->
```

**Rule:** Items use thingCategories, buildings use designationCategory, moveable furniture uses both
x??

---

#### Parent Name vs Abstract - Template Definitions
Vanilla uses Name attribute (not defName) for template definitions with Abstract="True". These are parents for other defs but don't create actual game objects. Child defs reference via ParentName. Understanding this is key to reading vanilla defs and creating efficient inheritance hierarchies.

**Template/parent definition:**
```xml
<ThingDef Name="MyMod_WeaponBase" Abstract="True">
    <!-- Common properties for all my weapons -->
    <category>Item</category>
    <thingClass>ThingWithComps</thingClass>
    <equipmentType>Primary</equipmentType>
    <techLevel>Industrial</techLevel>

    <statBases>
        <MaxHitPoints>100</MaxHitPoints>
        <Flammability>0.5</Flammability>
    </statBases>

    <thingCategories>
        <li>Weapons</li>
    </thingCategories>
</ThingDef>
```

**Child definitions:**
```xml
<ThingDef ParentName="MyMod_WeaponBase">
    <defName>MyMod_Sword</defName>    <!-- Has defName - creates actual item -->
    <label>my sword</label>
    <!-- Inherits all from MyMod_WeaponBase -->
    <!-- Override specifics -->
    <statBases>
        <MaxHitPoints>150</MaxHitPoints>  <!-- Override parent's 100 -->
    </statBases>
</ThingDef>

<ThingDef ParentName="MyMod_WeaponBase">
    <defName>MyMod_Axe</defName>
    <label>my axe</label>
    <!-- Also inherits from MyMod_WeaponBase -->
</ThingDef>
```

**Key differences:**
- **Name + Abstract="True"**: Template only, no game object
- **defName**: Actual game object, can be referenced/spawned
:p What is the difference between Name/Abstract and defName in RimWorld definitions?
??x
**Name with Abstract="True" - Template definition:**
```xml
<ThingDef Name="MyTemplateBase" Abstract="True">
    <!-- Common properties -->
    <category>Item</category>
    <thingClass>Thing</thingClass>
    <statBases>
        <MaxHitPoints>100</MaxHitPoints>
    </statBases>
</ThingDef>
```
- **Not a game object** - just a template
- Used as parent for other defs
- Cannot be spawned or referenced in-game

**defName - Actual definition:**
```xml
<ThingDef ParentName="MyTemplateBase">
    <defName>MyMod_ActualItem</defName>  <!-- Creates real item -->
    <label>actual item</label>
</ThingDef>
```
- **Creates game object**
- Can be spawned, crafted, traded
- Referenced by defName elsewhere

**Usage pattern:**
```xml
<!-- Template (no game object) -->
<ThingDef Name="WeaponBase" Abstract="True">
    <!-- Common weapon properties -->
</ThingDef>

<!-- Actual weapons (real game objects) -->
<ThingDef ParentName="WeaponBase">
    <defName>Weapon_Sword</defName>
</ThingDef>

<ThingDef ParentName="WeaponBase">
    <defName>Weapon_Axe</defName>
</ThingDef>
```

**Key difference:**
- **Name + Abstract**: Template for inheritance
- **defName**: Real game content

**Vanilla examples:** BuildingBase, ResourceBase, ApparelBase (all Abstract templates)
x??

---

#### Conditional Assemblies - Platform-Specific Code
Advanced mods sometimes use conditional assembly loading based on OS or RimWorld version. Rare but powerful for platform-specific optimizations or version-specific APIs. Uses LoadFolders.xml with platform detection or version detection to route to appropriate DLL.

**Version-based (common):**
```xml
<loadFolders>
    <v1.5>
        <li>1.5</li>
    </v1.5>
    <v1.6>
        <li>1.6</li>
    </v1.6>
</loadFolders>
```

**Platform-based (rare):**
```
MyMod/
├── Windows/
│   └── Assemblies/
│       └── MyMod.dll      [Windows-specific code]
├── Linux/
│   └── Assemblies/
│       └── MyMod.dll      [Linux-specific code]
└── OSX/
    └── Assemblies/
        └── MyMod.dll      [Mac-specific code]
```

**Use cases:**
- Platform-specific file I/O
- Different Unity APIs per platform
- Performance optimizations for specific OS
- Version-specific API changes

**Note:** Most mods don't need this - cross-platform .NET code works everywhere
:p When and how would you use conditional assembly loading in RimWorld mods?
??x
**Common use case - Version-specific:**

**Different RimWorld versions have different APIs:**
```xml
<!-- LoadFolders.xml -->
<loadFolders>
    <v1.5>
        <li>1.5</li>
    </v1.5>
    <v1.6>
        <li>1.6</li>
    </v1.6>
</loadFolders>
```

**Structure:**
```
MyMod/
├── 1.5/Assemblies/MyMod.dll    [For RW 1.5]
└── 1.6/Assemblies/MyMod.dll    [For RW 1.6]
```

**Rare use case - Platform-specific:**

**Different code for Windows/Linux/Mac:**
```
MyMod/
├── Windows/Assemblies/MyMod.dll
├── Linux/Assemblies/MyMod.dll
└── OSX/Assemblies/MyMod.dll
```

**When needed:**

**Version-specific (common):**
- RimWorld API changed between versions
- Class renamed/moved
- Method signatures different
- ~50 mods in analysis use this

**Platform-specific (rare):**
- Platform-specific file operations
- Different Unity APIs
- OS-specific features
- Performance optimizations

**Most mods don't need platform-specific** - .NET is cross-platform

**Best practice:** Use version-specific only when APIs actually differ
x??
