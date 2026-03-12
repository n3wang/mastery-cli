# RimWorld Modding Flashcards - XML Patching

---

#### XPath Basics - Targeting Definitions
XPath is a query language for navigating XML structure. RimWorld patches use XPath to find specific definitions to modify. Basic syntax: /Defs/DefType[defName="TargetName"]/field selects a specific field in a definition. Understanding XPath is crucial for compatibility patches that modify vanilla or other mods' content without replacing their files.

**Basic selection:**
```xml
<!-- XML structure: -->
<Defs>
    <ThingDef>
        <defName>Steel</defName>
        <stackLimit>500</stackLimit>
    </ThingDef>
</Defs>

<!-- XPath to find stackLimit: -->
/Defs/ThingDef[defName="Steel"]/stackLimit
```

**Breakdown:**
- `/Defs` - Start at root Defs element
- `/ThingDef` - Look for ThingDef child
- `[defName="Steel"]` - Filter where defName equals "Steel"
- `/stackLimit` - Select the stackLimit child

**Reading:** "In Defs, find ThingDef where defName is Steel, then find its stackLimit"
:p What is XPath and how do you target a specific field in RimWorld XML for patching?
??x
**Definition:** XPath is a query language to navigate and select XML elements

**Basic syntax:**
```
/Defs/DefType[defName="TargetName"]/field
```

**Example - Target silver's stack limit:**
```xml
/Defs/ThingDef[defName="Silver"]/stackLimit
```

**Breakdown:**
1. `/Defs` - Root element
2. `/ThingDef` - Find ThingDef elements
3. `[defName="Silver"]` - Filter by defName
4. `/stackLimit` - Select stackLimit field

**Reading in English:**
"In the Defs root, find the ThingDef whose defName is Silver, then select its stackLimit field"

**Usage in patch:**
```xml
<xpath>/Defs/ThingDef[defName="Silver"]/stackLimit</xpath>
```

**Why needed:** Allows surgical modification of specific fields without touching entire files
x??

---

#### PatchOperationReplace - Changing Existing Values
PatchOperationReplace changes the value of an existing XML element. You provide an XPath to target the element and a value to replace it with. This is the most straightforward patch operation. Common uses include balance changes (stat modifications, cost adjustments) and compatibility fixes. The targeted element must exist or the patch fails.

**Example - Increase silver stack limit:**
```xml
<?xml version="1.0" encoding="utf-8"?>
<Patch>
    <Operation Class="PatchOperationReplace">
        <xpath>/Defs/ThingDef[defName="Silver"]/stackLimit</xpath>
        <value>
            <stackLimit>1000</stackLimit>
        </value>
    </Operation>
</Patch>
```

**Logic flow:**
1. RimWorld loads vanilla defs → Silver has stackLimit 500
2. RimWorld applies patches
3. Find ThingDef[defName="Silver"]/stackLimit
4. Replace 500 with 1000
5. Final result → Silver stacks to 1000

**Multiple replacements:**
```xml
<Operation Class="PatchOperationSequence">
    <operations>
        <li Class="PatchOperationReplace">
            <xpath>/Defs/ThingDef[defName="Steel"]/stackLimit</xpath>
            <value><stackLimit>2000</stackLimit></value>
        </li>
        <li Class="PatchOperationReplace">
            <xpath>/Defs/ThingDef[defName="Gold"]/stackLimit</xpath>
            <value><stackLimit>1500</stackLimit></value>
        </li>
    </operations>
</Operation>
```
:p How do you replace an existing value in RimWorld XML using patches?
??x
**Use PatchOperationReplace with XPath and new value:**

```xml
<Patch>
    <Operation Class="PatchOperationReplace">
        <xpath>/Defs/ThingDef[defName="Bed"]/statBases/WorkToBuild</xpath>
        <value>
            <WorkToBuild>500</WorkToBuild>
        </value>
    </Operation>
</Patch>
```

**What happens:**
1. Finds the `WorkToBuild` element inside Bed definition
2. Replaces its value with 500
3. Bed now builds faster

**Common uses:**
- Balance changes (modify stats)
- Cost adjustments
- Speed modifications
- Compatibility fixes

**Important notes:**
- Element must exist (patch fails if not found)
- Replaces ENTIRE element and its children
- Use exact element name in value

**Example - Change research cost:**
```xml
<xpath>/Defs/ResearchProjectDef[defName="Electricity"]/baseCost</xpath>
<value>
    <baseCost>600</baseCost>
</value>
```
x??

---

#### PatchOperationAdd - Adding New Elements
PatchOperationAdd inserts new XML elements into existing definitions. You target a parent element with XPath and provide child elements to add. Use this to add recipes to workbenches, add ingredients to recipes, add items to categories, etc. The parent must exist. Added elements append to the end of the parent's children by default.

**Example - Add recipe to workbench:**
```xml
<Patch>
    <Operation Class="PatchOperationAdd">
        <xpath>/Defs/ThingDef[defName="ElectricSmithy"]/recipes</xpath>
        <value>
            <li>MyMod_CustomRecipe</li>
        </value>
    </Operation>
</Patch>
```

**Logic:**
1. Find ElectricSmithy definition
2. Find its recipes list
3. Add MyMod_CustomRecipe to the list
4. Now smithy can craft custom recipe

**Add multiple items:**
```xml
<Operation Class="PatchOperationAdd">
    <xpath>/Defs/RecipeDef[defName="Make_ComponentIndustrial"]/ingredients/li[1]/filter/thingDefs</xpath>
    <value>
        <li>MyMod_SpecialSteel</li>
        <li>MyMod_AdvancedMetal</li>
    </value>
</Operation>
```

**Effect:** Allows custom items as ingredients for vanilla recipe
:p How do you add new elements to existing RimWorld definitions using patches?
??x
**Use PatchOperationAdd targeting parent element:**

```xml
<Patch>
    <Operation Class="PatchOperationAdd">
        <xpath>/Defs/ThingDef[defName="TableMachining"]/recipes</xpath>
        <value>
            <li>MyMod_NewRecipe</li>
        </value>
    </Operation>
</Patch>
```

**What happens:**
1. Finds TableMachining's recipes list
2. Adds MyMod_NewRecipe to it
3. Recipe now available at that workbench

**Common uses:**

**Add recipe to bench:**
```xml
<xpath>/Defs/ThingDef[defName="DrugLab"]/recipes</xpath>
<value><li>MyMod_DrugRecipe</li></value>
```

**Add ingredient option:**
```xml
<xpath>/Defs/RecipeDef[defName="MakeSword"]/ingredients/li[1]/filter/thingDefs</xpath>
<value><li>MyMod_CustomMetal</li></value>
```

**Add research prerequisite:**
```xml
<xpath>/Defs/ResearchProjectDef[defName="AdvancedTech"]/prerequisites</xpath>
<value><li>MyMod_BasicResearch</li></value>
```

**Note:** Element is added to END of parent's children list
x??

---

#### PatchOperationRemove - Deleting Elements
PatchOperationRemove deletes XML elements from definitions. Target the exact element to remove with XPath. Common uses include removing recipes from benches, removing incompatible features, or simplifying complex vanilla systems. Be careful: removing critical elements can break definitions. Used for compatibility patches or mod balancing.

**Example - Remove recipe from bench:**
```xml
<Patch>
    <Operation Class="PatchOperationRemove">
        <xpath>/Defs/ThingDef[defName="ElectricSmithy"]/recipes/li[.="Make_MeleeWeapon_LongSword"]</xpath>
    </Operation>
</Patch>
```

**Logic:**
1. Find ElectricSmithy's recipes list
2. Find the li element containing "Make_MeleeWeapon_LongSword"
3. Delete that element
4. Recipe no longer available at smithy

**XPath trick for list items:**
```xml
<!-- Remove specific item from list -->
<xpath>/Defs/ThingDef[defName="Something"]/list/li[.="SpecificValue"]</xpath>
<!-- The [.="value"] means "where content equals value" -->
```

**Remove entire field:**
```xml
<Operation Class="PatchOperationRemove">
    <xpath>/Defs/ThingDef[defName="Building"]/designationCategory</xpath>
</Operation>
<!-- Building can no longer be constructed through UI -->
```
:p How do you remove elements from RimWorld definitions using patches?
??x
**Use PatchOperationRemove with XPath to target element:**

```xml
<Patch>
    <Operation Class="PatchOperationRemove">
        <xpath>/Defs/ThingDef[defName="Campfire"]/recipes/li[.="CookMealSimple"]</xpath>
    </Operation>
</Patch>
```

**Effect:** Removes CookMealSimple recipe from Campfire

**XPath for list items:**
```xml
<xpath>path/to/list/li[.="ValueToRemove"]</xpath>
```
The `[.="value"]` filters list items by their content

**Common uses:**

**Remove recipe from bench:**
```xml
<xpath>/Defs/ThingDef[defName="Bench"]/recipes/li[.="UnwantedRecipe"]</xpath>
```

**Remove entire field:**
```xml
<xpath>/Defs/ResearchProjectDef[defName="Research"]/prerequisites</xpath>
```
Removes ALL prerequisites

**Remove research requirement:**
```xml
<xpath>/Defs/ThingDef[defName="Building"]/researchPrerequisites</xpath>
```
Building now available without research

**Warning:** Removing critical elements can break definitions - test thoroughly!
x??

---

#### PatchOperationSequence - Multiple Operations
PatchOperationSequence executes multiple patch operations in order. All operations inside succeed or all fail together (atomic). Use this for complex modifications requiring multiple steps or to group related patches logically. Each operation is a <li> element with its own Class attribute. Executes top to bottom.

**Example - Modify recipe comprehensively:**
```xml
<Patch>
    <Operation Class="PatchOperationSequence">
        <operations>
            <!-- Step 1: Reduce work amount -->
            <li Class="PatchOperationReplace">
                <xpath>/Defs/RecipeDef[defName="Make_Component"]/workAmount</xpath>
                <value><workAmount>500</workAmount></value>
            </li>

            <!-- Step 2: Add new ingredient option -->
            <li Class="PatchOperationAdd">
                <xpath>/Defs/RecipeDef[defName="Make_Component"]/ingredients/li[1]/filter/thingDefs</xpath>
                <value><li>MyMod_SpecialSteel</li></value>
            </li>

            <!-- Step 3: Change skill requirement -->
            <li Class="PatchOperationReplace">
                <xpath>/Defs/RecipeDef[defName="Make_Component"]/skillRequirements/Crafting</xpath>
                <value><Crafting>4</Crafting></value>
            </li>
        </operations>
    </Operation>
</Patch>
```

**Execution:** All three operations execute in order, modifying the recipe thoroughly
:p How do you execute multiple patch operations together in RimWorld?
??x
**Use PatchOperationSequence to group operations:**

```xml
<Patch>
    <Operation Class="PatchOperationSequence">
        <operations>
            <li Class="PatchOperationReplace">
                <xpath>/path/to/field1</xpath>
                <value><field1>newValue</field1></value>
            </li>

            <li Class="PatchOperationAdd">
                <xpath>/path/to/list</xpath>
                <value><li>newItem</li></value>
            </li>

            <li Class="PatchOperationRemove">
                <xpath>/path/to/unwanted</xpath>
            </li>
        </operations>
    </Operation>
</Patch>
```

**How it works:**
1. Executes operations in order (top to bottom)
2. Each `<li>` is a separate operation
3. Each has its own `Class` attribute
4. All succeed or all fail (atomic)

**Common use cases:**
- Modify multiple aspects of one definition
- Complex recipe modifications
- Group related changes logically
- Ensure changes apply together

**Example - Modify building completely:**
```xml
<operations>
    <li Class="PatchOperationReplace"><!-- Change cost --></li>
    <li Class="PatchOperationReplace"><!-- Change build time --></li>
    <li Class="PatchOperationAdd"><!-- Add new recipe --></li>
</operations>
```
x??

---

#### PatchOperationConditional - Mod Detection
PatchOperationConditional executes patches only if conditions are met. Primary use: detect if other mods are loaded using PatchOperationFindMod. Allows compatibility patches that only apply when specific mods are active. Has match and nomatch sections for different outcomes. Essential for inter-mod compatibility.

**Example - Only patch if Royalty DLC active:**
```xml
<Patch>
    <Operation Class="PatchOperationFindMod">
        <mods>
            <li>Ludeon.RimWorld.Royalty</li>
        </mods>

        <!-- Executes if Royalty is loaded -->
        <match Class="PatchOperationAdd">
            <xpath>/Defs/RecipeDef[defName="MyMod_Recipe"]/recipeUsers</xpath>
            <value>
                <li>DrugLab</li>  <!-- DrugLab only exists in Royalty -->
            </value>
        </match>

        <!-- Executes if Royalty is NOT loaded -->
        <nomatch Class="PatchOperationAdd">
            <xpath>/Defs/RecipeDef[defName="MyMod_Recipe"]/description</xpath>
            <value>(Note: Some features require Royalty DLC)</value>
        </nomatch>
    </Operation>
</Patch>
```

**Logic:**
- If Royalty loaded → adds DrugLab to recipe users
- If Royalty not loaded → adds note to description
:p How do you create conditional patches that only apply when specific mods are loaded?
??x
**Use PatchOperationFindMod to detect other mods:**

```xml
<Patch>
    <Operation Class="PatchOperationFindMod">
        <mods>
            <li>brrainz.harmony</li>  <!-- Check for Harmony -->
        </mods>

        <!-- Runs if mod is found -->
        <match Class="PatchOperationReplace">
            <xpath>/Defs/ThingDef[defName="MyItem"]/statBases/MarketValue</xpath>
            <value><MarketValue>100</MarketValue></value>
        </match>

        <!-- Runs if mod is NOT found -->
        <nomatch Class="PatchOperationReplace">
            <xpath>/Defs/ThingDef[defName="MyItem"]/statBases/MarketValue</xpath>
            <value><MarketValue>50</MarketValue></value>
        </nomatch>
    </Operation>
</Patch>
```

**Structure:**
- `<mods>` - List of packageIds to check
- `<match>` - Executes if ANY mod in list is active
- `<nomatch>` - Executes if NONE are active

**Common use case - DLC compatibility:**
```xml
<mods>
    <li>Ludeon.RimWorld.Royalty</li>
</mods>
<match><!-- Add Royalty-specific features --></match>
```

**Multiple mod check:**
```xml
<mods>
    <li>Mod1.PackageId</li>
    <li>Mod2.PackageId</li>
</mods>
<!-- Matches if EITHER mod is loaded -->
```
x??

---

#### PatchOperationTest - Element Existence Check
PatchOperationTest verifies an element exists before attempting other operations. Returns success if XPath finds element, failure if not. Often used inside PatchOperationSequence to prevent errors when patching mod-added content that might not exist. Enables defensive patching for maximum compatibility.

**Example - Safe patching:**
```xml
<Patch>
    <Operation Class="PatchOperationSequence">
        <operations>
            <!-- First, test if target exists -->
            <li Class="PatchOperationTest">
                <xpath>/Defs/ThingDef[@Name="SculptureBase"]/recipeMaker/defaultIngredientFilter/thingDefs</xpath>
            </li>

            <!-- Only runs if test succeeds -->
            <li Class="PatchOperationAdd">
                <xpath>/Defs/ThingDef[@Name="SculptureBase"]/recipeMaker/defaultIngredientFilter/thingDefs</xpath>
                <value>
                    <li>MyMod_GoldenCoin</li>
                </value>
            </li>
        </operations>
    </Operation>
</Patch>
```

**Logic:**
1. Test checks if SculptureBase has recipeMaker/defaultIngredientFilter/thingDefs
2. If yes → Test succeeds → Add operation runs
3. If no → Test fails → Sequence aborts (no error)

**Why useful:** Prevents errors when patching optional content or content from other mods
:p What is PatchOperationTest and when should you use it?
??x
**Purpose:** Check if an element exists before patching it

```xml
<Operation Class="PatchOperationSequence">
    <operations>
        <!-- Test if element exists -->
        <li Class="PatchOperationTest">
            <xpath>/Defs/ThingDef[defName="SomeModContent"]/field</xpath>
        </li>

        <!-- Only runs if test succeeds -->
        <li Class="PatchOperationAdd">
            <xpath>/Defs/ThingDef[defName="SomeModContent"]/field</xpath>
            <value><li>MyAddition</li></value>
        </li>
    </operations>
</Operation>
```

**How it works:**
- Test tries to find element with XPath
- **Success** if element exists → Sequence continues
- **Failure** if element doesn't exist → Sequence aborts (no error)

**When to use:**

**Patching other mods' content:**
```xml
<li Class="PatchOperationTest">
    <xpath>/Defs/ThingDef[defName="CombatExtendedGun"]/...</xpath>
</li>
```
Only patches if Combat Extended is loaded

**Patching optional game features:**
```xml
<li Class="PatchOperationTest">
    <xpath>/Defs/ResearchProjectDef[defName="RoyaltyResearch"]/...</xpath>
</li>
```

**Benefit:** Defensive patching prevents errors, improves compatibility
x??

---

#### XPath Advanced - Attribute Selection
XPath can select elements by attributes using [@attributeName="value"]. RimWorld XML uses attributes like ParentName, Class, and Name. Attribute selection is more precise than element-only paths. Use this to target definitions with specific parents or classes, enabling surgical patches on groups of related definitions.

**Example - Select by ParentName:**
```xml
<!-- Target all buildings with BuildingBase parent -->
<xpath>/Defs/ThingDef[@ParentName="BuildingBase"]/statBases/Flammability</xpath>

<!-- Replace flammability for ALL buildings inheriting BuildingBase -->
<value><Flammability>0.5</Flammability></value>
```

**Example - Select by Name attribute:**
```xml
<!-- Many vanilla defs use Name instead of defName for templates -->
<xpath>/Defs/ThingDef[@Name="ApparelBase"]/stuffCategories</xpath>
```

**Example - Select operation by Class:**
```xml
<xpath>/Patch/Operation[@Class="PatchOperationAdd"]</xpath>
```

**Combining filters:**
```xml
<!-- Find ThingDef that has ParentName AND specific defName -->
<xpath>/Defs/ThingDef[@ParentName="WeaponBase"][defName="Gun_Pistol"]/statBases</xpath>
```

**Use case:** Batch modifications to related definitions
:p How do you use XPath attributes to select elements in RimWorld patches?
??x
**Syntax:** Use `[@attributeName="value"]` to filter by attribute

**Select by ParentName:**
```xml
<xpath>/Defs/ThingDef[@ParentName="BuildingBase"]/statBases/MaxHitPoints</xpath>
```
Targets MaxHitPoints in ALL ThingDefs inheriting from BuildingBase

**Select by Name (template definitions):**
```xml
<xpath>/Defs/ThingDef[@Name="ResourceBase"]/stackLimit</xpath>
```
Targets template definitions (used as parents)

**Select by Class:**
```xml
<xpath>/Patch/Operation[@Class="PatchOperationReplace"]</xpath>
```

**Common attributes in RimWorld:**
- `ParentName` - Inheritance parent
- `Name` - Template name (for parent definitions)
- `Class` - C# class type
- `Abstract` - Template-only flag

**Combining with defName:**
```xml
<xpath>/Defs/ThingDef[@ParentName="WeaponBase"][defName="Gun_Revolver"]/statBases</xpath>
```
Finds specific weapon that inherits from WeaponBase

**Use case:** Modify all items of a certain type (all weapons, all buildings, etc.)
x??

---

#### Patch File Naming - Combat Extended Pattern
Patch files are often named to indicate their purpose and target. Common convention: Patches_ModName.xml for compatibility patches. Combat Extended uses CE suffix (Patches_CE.xml) so common it's a standard. This helps modders and users identify patch purposes. Multiple patch files can exist in Patches/ folder, all execute automatically.

**Example structure:**
```
MyMod/
└── Patches/
    ├── Patches_Vanilla.xml          [Vanilla game patches]
    ├── Patches_CE.xml               [Combat Extended compatibility]
    ├── Patches_Royalty.xml          [Royalty DLC patches]
    ├── Patches_VanillaExpanded.xml  [VE series compatibility]
    └── Patches_Balance.xml          [Balance changes]
```

**Content example - Patches_CE.xml:**
```xml
<?xml version="1.0" encoding="utf-8"?>
<Patch>
    <!-- Only apply if Combat Extended is loaded -->
    <Operation Class="PatchOperationFindMod">
        <mods>
            <li>CETeam.CombatExtended</li>
        </mods>
        <match Class="PatchOperationSequence">
            <!-- CE-specific compatibility patches -->
        </match>
    </Operation>
</Patch>
```

**Benefits:**
- Clear organization
- Easy to find relevant patches
- Modular compatibility management
:p What is the naming convention for patch files in RimWorld mods?
??x
**Common pattern:** `Patches_TargetMod.xml` or `Patches_Purpose.xml`

**Examples:**

**Mod compatibility:**
- `Patches_CE.xml` - Combat Extended compatibility
- `Patches_Royalty.xml` - Royalty DLC patches
- `Patches_VanillaExpanded.xml` - Vanilla Expanded compatibility

**Purpose-based:**
- `Patches_Vanilla.xml` - Vanilla game modifications
- `Patches_Balance.xml` - Balance changes
- `Patches_Compatibility.xml` - General compatibility

**File location:**
```
MyMod/
└── Patches/
    ├── Patches_CE.xml
    ├── Patches_Royalty.xml
    └── Patches_Balance.xml
```

**All files auto-load:** RimWorld loads ALL .xml files in Patches/ folder

**Best practice structure:**
```xml
<!-- Patches_CE.xml -->
<Patch>
    <Operation Class="PatchOperationFindMod">
        <mods><li>CETeam.CombatExtended</li></mods>
        <match><!-- CE patches here --></match>
    </Operation>
</Patch>
```

**Benefits:**
- Clear organization
- Easy maintenance
- User-friendly for troubleshooting
x??

---

#### Defensive Patching - Fail Gracefully
Defensive patching uses PatchOperationTest and PatchOperationSequence to ensure patches fail gracefully if targets don't exist. This prevents error log spam and improves compatibility with varying mod loadouts. Always test for existence before modifying content from other mods or optional game features.

**Anti-pattern (unsafe):**
```xml
<Patch>
    <!-- Directly patches without checking if element exists -->
    <Operation Class="PatchOperationAdd">
        <xpath>/Defs/ThingDef[defName="ModdedItem"]/somePath</xpath>
        <value><li>MyAddition</li></value>
    </Operation>
    <!-- If ModdedItem doesn't exist → ERROR in log -->
</Patch>
```

**Best practice (defensive):**
```xml
<Patch>
    <Operation Class="PatchOperationSequence">
        <operations>
            <!-- Test existence first -->
            <li Class="PatchOperationTest">
                <xpath>/Defs/ThingDef[defName="ModdedItem"]</xpath>
            </li>

            <!-- Only runs if test succeeds -->
            <li Class="PatchOperationAdd">
                <xpath>/Defs/ThingDef[defName="ModdedItem"]/somePath</xpath>
                <value><li>MyAddition</li></value>
            </li>
        </operations>
    </Operation>
    <!-- If ModdedItem doesn't exist → Sequence silently fails, no error -->
</Patch>
```

**When to use:**
- Patching other mods' content
- Patching DLC features
- Patching optional vanilla systems
:p What is defensive patching and how do you implement it in RimWorld?
??x
**Concept:** Write patches that fail gracefully if targets don't exist

**Implementation:** Use PatchOperationTest before modifying

```xml
<Patch>
    <Operation Class="PatchOperationSequence">
        <operations>
            <!-- Step 1: Test if target exists -->
            <li Class="PatchOperationTest">
                <xpath>/Defs/ThingDef[defName="OptionalContent"]</xpath>
            </li>

            <!-- Step 2: Only runs if test passes -->
            <li Class="PatchOperationAdd">
                <xpath>/Defs/ThingDef[defName="OptionalContent"]/field</xpath>
                <value><li>MyPatch</li></value>
            </li>
        </operations>
    </Operation>
</Patch>
```

**What happens:**
- **If exists:** Test passes → Patch applies
- **If doesn't exist:** Test fails → Sequence aborts silently (no error)

**When to use:**
1. Patching other mods' content
2. Patching DLC features (Royalty, Ideology, Biotech)
3. Patching optional vanilla content
4. Compatibility patches

**Benefits:**
- No error spam in logs
- Works with varying mod loadouts
- Better user experience
- Easier troubleshooting

**Anti-pattern (don't do):**
```xml
<!-- Direct patch without test - causes errors if missing -->
<Operation Class="PatchOperationAdd">
    <xpath>/Defs/ThingDef[defName="MaybeMissing"]/field</xpath>
</Operation>
```
x??
