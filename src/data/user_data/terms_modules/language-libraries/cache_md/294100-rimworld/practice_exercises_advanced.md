# RimWorld Modding Practice Exercises - Advanced

These advanced exercises focus on C# programming, Harmony patching, and advanced modding patterns. Complete the basic exercises in `practice_exercises.md` before attempting these.

## Prerequisites

- Completed basic exercises (Exercises 1-6)
- Visual Studio Community Edition or Rider IDE installed
- Basic C# programming knowledge
- Understanding of object-oriented programming
- Familiarity with .NET Framework

---

## Exercise 7: Your First Harmony Patch

**Difficulty**: Intermediate
**Time**: 45-60 minutes
**Concepts**: C# project setup, Harmony basics, Prefix patches, Logging

### Goal
Create a C# mod that uses Harmony to log whenever a pawn kills another pawn, displaying both the killer and victim names.

### Step-by-Step Instructions

#### Step 1: Set Up Visual Studio Project

1. **Open Visual Studio** (Community Edition is free)

2. **Create New Project:**
   - File > New > Project
   - Select "Class Library (.NET Framework)"
   - Framework: .NET Framework 4.8
   - Name: `MyHarmonyMod`
   - Location: Anywhere convenient (you'll copy DLL later)

3. **Add RimWorld References:**
   - Right-click project > Add > Reference
   - Click "Browse" button
   - Navigate to: `C:\Program Files (x86)\Steam\steamapps\common\RimWorld\RimWorldWin64_Data\Managed\`
   - Add these DLLs:
     - `Assembly-CSharp.dll`
     - `UnityEngine.CoreModule.dll`

4. **Add Harmony Reference:**
   - Download 0Harmony.dll from a mod that uses it (like from workshop mods)
   - Or get from: `C:\Program Files (x86)\Steam\steamapps\workshop\content\294100\2009463077\Current\Assemblies\`
   - Add reference to `0Harmony.dll`
   - **Important:** Right-click 0Harmony reference > Properties > Set "Copy Local" to True

#### Step 2: Configure Build Output

1. Right-click project > Properties
2. Go to "Build" tab
3. Set Output path to your mod's Assemblies folder:
   ```
   C:\Program Files (x86)\Steam\steamapps\common\RimWorld\Mods\MyHarmonyMod\Assemblies\
   ```

#### Step 3: Create Mod Folder Structure

Create these folders in RimWorld/Mods/:
```
MyHarmonyMod/
├── About/
│   └── About.xml
└── Assemblies/
    └── (DLLs will be copied here on build)
```

#### Step 4: Create About.xml

In `MyHarmonyMod/About/About.xml`:
```xml
<?xml version="1.0" encoding="utf-8"?>
<ModMetaData>
    <name>My Harmony Mod - Kill Logger</name>
    <author>Your Name</author>
    <packageId>YourName.MyHarmonyMod</packageId>
    <supportedVersions>
        <li>1.5</li>
        <li>1.6</li>
    </supportedVersions>
    <modDependencies>
        <li>
            <packageId>brrainz.harmony</packageId>
            <displayName>Harmony</displayName>
            <steamWorkshopUrl>steam://url/CommunityFilePage/2009463077</steamWorkshopUrl>
        </li>
    </modDependencies>
    <loadAfter>
        <li>brrainz.harmony</li>
    </loadAfter>
    <description>Logs when pawns kill each other using Harmony patches.</description>
</ModMetaData>
```

#### Step 5: Write the Initialization Code

Rename `Class1.cs` to `MyHarmonyMod.cs` and replace with:

```csharp
using HarmonyLib;
using Verse;

namespace MyHarmonyMod
{
    [StaticConstructorOnStartup]
    public static class MyHarmonyModInit
    {
        static MyHarmonyModInit()
        {
            // Create Harmony instance with unique ID
            var harmony = new Harmony("yourname.myharmonymod");

            // Apply all patches in this assembly
            harmony.PatchAll();

            Log.Message("MyHarmonyMod: Successfully loaded and patched!");
        }
    }
}
```

#### Step 6: Write the Harmony Patch

Add a new class file: `Pawn_Kill_Patch.cs`:

```csharp
using HarmonyLib;
using Verse;

namespace MyHarmonyMod
{
    [HarmonyPatch(typeof(Pawn))]
    [HarmonyPatch(nameof(Pawn.Kill))]
    public static class Pawn_Kill_Patch
    {
        [HarmonyPrefix]
        public static void Prefix(Pawn __instance, DamageInfo? dinfo)
        {
            // __instance is the pawn being killed

            // Get the killer from damage info
            Pawn killer = dinfo?.Instigator as Pawn;

            if (killer != null)
            {
                // Both killer and victim are pawns
                Log.Message(
                    $"[Kill Event] {killer.Name.ToStringShort} killed {__instance.Name.ToStringShort}!"
                );
            }
            else
            {
                // Death by other means (environment, etc.)
                Log.Message(
                    $"[Death Event] {__instance.Name.ToStringShort} died (no killer)"
                );
            }
        }
    }
}
```

#### Step 7: Build and Test

1. **Build the project** (Build > Build Solution or F6)
2. Check that DLLs appeared in your mod's Assemblies folder:
   - `MyHarmonyMod.dll`
   - `0Harmony.dll`

3. **Launch RimWorld**
4. Enable your mod (and Harmony dependency)
5. Start a game or load a save
6. **Enable Dev Mode** (Options > Dev mode)
7. Open Debug Log (Development > Debug log inspector)

8. **Test the patch:**
   - Start a raid or spawn hostile pawns (Dev mode > Execute console command > `pawn spawn` or trigger raid)
   - Let combat occur
   - Watch the log for your kill messages!

### Success Criteria
- [x] Mod loads without errors
- [x] Harmony patches apply successfully
- [x] Kill events are logged with killer and victim names
- [x] Deaths without killer are logged differently
- [x] No red errors in debug log

### What You Learned
- Setting up a C# mod project with Visual Studio
- Adding RimWorld and Harmony references
- Creating a static constructor for initialization
- Writing Harmony Prefix patches
- Accessing patch parameters (__instance, original method params)
- Using Log.Message for debugging
- Null checking for optional values (killer might not exist)

### Challenge Extensions

1. **Add more detail to the log:**
   - Include weapon used
   - Include damage amount
   - Include location coordinates

2. **Track statistics:**
   - Count kills per pawn
   - Save statistics to a static Dictionary

3. **Filter by faction:**
   - Only log when colonists are involved
   - Different messages for friendly fire

---

## Exercise 8: Modify Game Behavior with Postfix

**Difficulty**: Intermediate
**Time**: 40-50 minutes
**Concepts**: Postfix patches, Return value modification, Game balance

### Goal
Create a mod that makes all items sell for 50% more to traders by modifying the MarketValue property.

### Step-by-Step Instructions

#### Step 1: Create New Mod Structure

Create new mod folder: `ValueBooster`

```
ValueBooster/
├── About/About.xml
└── Source/
    └── (Visual Studio project)
```

#### Step 2: About.xml

```xml
<?xml version="1.0" encoding="utf-8"?>
<ModMetaData>
    <name>Value Booster</name>
    <author>Your Name</author>
    <packageId>YourName.ValueBooster</packageId>
    <supportedVersions>
        <li>1.5</li>
        <li>1.6</li>
    </supportedVersions>
    <modDependencies>
        <li>
            <packageId>brrainz.harmony</packageId>
            <displayName>Harmony</displayName>
        </li>
    </modDependencies>
    <description>Increases the market value of all items by 50%.</description>
</ModMetaData>
```

#### Step 3: Create Visual Studio Project

1. Create new Class Library (.NET Framework 4.8) project named `ValueBooster`
2. Add references to Assembly-CSharp.dll, UnityEngine.CoreModule.dll, 0Harmony.dll
3. Set build output to mod's Assemblies folder

#### Step 4: Write the Patch

Create `Thing_MarketValue_Patch.cs`:

```csharp
using HarmonyLib;
using Verse;

namespace ValueBooster
{
    // Patch the MarketValue property getter
    [HarmonyPatch(typeof(Thing))]
    [HarmonyPatch(nameof(Thing.MarketValue), MethodType.Getter)]
    public static class Thing_MarketValue_Patch
    {
        [HarmonyPostfix]
        public static void Postfix(Thing __instance, ref float __result)
        {
            // __result contains the original market value
            // We can modify it before it's returned

            // Increase by 50%
            __result = __result * 1.5f;

            // Optional: Log the first few to verify
            // (Remove this after testing - will spam log)
            // Log.Message($"{__instance.Label}: {__result / 1.5f} -> {__result}");
        }
    }
}
```

#### Step 5: Add Initialization

Create `ValueBoosterInit.cs`:

```csharp
using HarmonyLib;
using Verse;

namespace ValueBooster
{
    [StaticConstructorOnStartup]
    public static class ValueBoosterInit
    {
        static ValueBoosterInit()
        {
            var harmony = new Harmony("yourname.valuebooster");
            harmony.PatchAll();
            Log.Message("ValueBooster: All items now worth 50% more!");
        }
    }
}
```

#### Step 6: Test the Mod

1. Build the project
2. Enable mod in RimWorld
3. Start/load a game
4. Check item values in-game:
   - Select item (like steel)
   - Look at info card - market value should be 50% higher
   - Trade with a caravan - sell prices should be higher

### Success Criteria
- [x] All items show increased market value
- [x] Trading prices reflect the increase
- [x] No performance issues (patch is efficient)
- [x] Works on all item types

### What You Learned
- Using Postfix patches to modify return values
- The `ref` keyword for modifying __result
- Patching property getters with MethodType.Getter
- Float calculations in C#
- Game balance modification through code

### Challenge Extensions

1. **Make it configurable:**
   - Add different multipliers for different item categories
   - Weapons 2x, Apparel 1.5x, Resources 1.2x

2. **Add exclusions:**
   - Don't boost silver/gold (already valuable)
   - Check item def and skip certain types

3. **Make it conditional:**
   - Only boost value when selling (not buying)
   - Requires more complex patching

---

## Exercise 9: Using DefModExtension for Custom Data

**Difficulty**: Intermediate to Advanced
**Time**: 60-90 minutes
**Concepts**: DefModExtension, Custom classes, XML integration with C#

### Goal
Create buildings that generate resources over time, with rate and output defined in XML via DefModExtension.

### Step-by-Step Instructions

#### Step 1: Create Mod Structure

Create mod: `ResourceGenerator`

```
ResourceGenerator/
├── About/About.xml
├── Defs/
│   └── ThingDefs_Buildings.xml
└── Source/
    └── (Visual Studio project)
```

#### Step 2: About.xml

```xml
<?xml version="1.0" encoding="utf-8"?>
<ModMetaData>
    <name>Resource Generator</name>
    <author>Your Name</author>
    <packageId>YourName.ResourceGenerator</packageId>
    <supportedVersions>
        <li>1.5</li>
        <li>1.6</li>
    </supportedVersions>
    <modDependencies>
        <li>
            <packageId>brrainz.harmony</packageId>
            <displayName>Harmony</displayName>
        </li>
    </modDependencies>
    <description>Buildings that automatically generate resources over time.</description>
</ModMetaData>
```

#### Step 3: Create the DefModExtension Class

Create `ResourceGeneratorExtension.cs`:

```csharp
using System.Collections.Generic;
using Verse;

namespace ResourceGenerator
{
    public class ResourceGeneratorExtension : DefModExtension
    {
        // What resource to produce
        public ThingDef resourceDef;

        // How many to produce
        public int amountPerCycle = 1;

        // How many ticks between productions (60 ticks = 1 second)
        public int ticksPerCycle = 2500;  // Default: ~41 seconds

        // Optional: require power
        public bool requiresPower = false;

        // Optional: maximum stored resources
        public int maxStorage = 100;
    }
}
```

#### Step 4: Create Custom Building Class

Create `Building_ResourceGenerator.cs`:

```csharp
using Verse;
using RimWorld;

namespace ResourceGenerator
{
    public class Building_ResourceGenerator : Building
    {
        private int tickCounter = 0;
        private int storedResources = 0;
        private ResourceGeneratorExtension extension;

        public override void SpawnSetup(Map map, bool respawningAfterLoad)
        {
            base.SpawnSetup(map, respawningAfterLoad);

            // Get the extension from this building's def
            extension = def.GetModExtension<ResourceGeneratorExtension>();

            if (extension == null)
            {
                Log.Error($"Building_ResourceGenerator {def.defName} has no ResourceGeneratorExtension!");
            }
        }

        public override void Tick()
        {
            base.Tick();

            if (extension == null) return;

            // Check if we need power and don't have it
            if (extension.requiresPower)
            {
                CompPowerTrader power = GetComp<CompPowerTrader>();
                if (power != null && !power.PowerOn)
                {
                    return;  // No power, don't generate
                }
            }

            // Increment counter
            tickCounter++;

            // Check if it's time to generate
            if (tickCounter >= extension.ticksPerCycle)
            {
                tickCounter = 0;  // Reset counter

                // Check if we can store more
                if (storedResources < extension.maxStorage)
                {
                    storedResources += extension.amountPerCycle;

                    // Spawn the resources
                    SpawnResources();
                }
            }
        }

        private void SpawnResources()
        {
            if (extension == null || extension.resourceDef == null) return;

            // Create the thing
            Thing resource = ThingMaker.MakeThing(extension.resourceDef);
            resource.stackCount = extension.amountPerCycle;

            // Try to spawn near the building
            IntVec3 spawnPos = this.Position;

            // Find empty adjacent cell
            IntVec3 dropPos;
            if (TryFindSpawnCell(out dropPos))
            {
                GenPlace.TryPlaceThing(resource, dropPos, this.Map, ThingPlaceMode.Near);
            }

            storedResources -= extension.amountPerCycle;
        }

        private bool TryFindSpawnCell(out IntVec3 result)
        {
            // Look for adjacent cell
            foreach (IntVec3 cell in GenAdj.CellsAdjacent8Way(this))
            {
                if (cell.InBounds(this.Map) && cell.Standable(this.Map))
                {
                    result = cell;
                    return true;
                }
            }

            result = this.Position;
            return false;
        }

        public override string GetInspectString()
        {
            string baseInspect = base.GetInspectString();

            if (extension == null) return baseInspect;

            string info = $"\nGenerating: {extension.resourceDef.label}";
            info += $"\nProgress: {tickCounter}/{extension.ticksPerCycle}";
            info += $"\nStored: {storedResources}/{extension.maxStorage}";

            return baseInspect + info;
        }

        public override void ExposeData()
        {
            base.ExposeData();
            Scribe_Values.Look(ref tickCounter, "tickCounter", 0);
            Scribe_Values.Look(ref storedResources, "storedResources", 0);
        }
    }
}
```

#### Step 5: Initialize Harmony

Create `ResourceGeneratorInit.cs`:

```csharp
using HarmonyLib;
using Verse;

namespace ResourceGenerator
{
    [StaticConstructorOnStartup]
    public static class ResourceGeneratorInit
    {
        static ResourceGeneratorInit()
        {
            var harmony = new Harmony("yourname.resourcegenerator");
            harmony.PatchAll();
            Log.Message("ResourceGenerator: Initialized!");
        }
    }
}
```

#### Step 6: Create Building Definitions

Create `Defs/ThingDefs_Buildings.xml`:

```xml
<?xml version="1.0" encoding="utf-8"?>
<Defs>
    <!-- Steel Generator -->
    <ThingDef ParentName="BuildingBase">
        <defName>ResourceGen_SteelGenerator</defName>
        <label>steel generator</label>
        <description>Automatically generates steel over time.</description>

        <thingClass>ResourceGenerator.Building_ResourceGenerator</thingClass>

        <graphicData>
            <texPath>Things/Building/Production/TableMachining</texPath>
            <graphicClass>Graphic_Single</graphicClass>
            <drawSize>(2,2)</drawSize>
        </graphicData>

        <size>(2,2)</size>
        <passability>PassThroughOnly</passability>
        <fillPercent>0.5</fillPercent>

        <statBases>
            <MaxHitPoints>200</MaxHitPoints>
            <WorkToBuild>5000</WorkToBuild>
            <Flammability>0.5</Flammability>
        </statBases>

        <costList>
            <Steel>150</Steel>
            <ComponentIndustrial>5</ComponentIndustrial>
        </costList>

        <designationCategory>Production</designationCategory>

        <researchPrerequisites>
            <li>Machining</li>
        </researchPrerequisites>

        <!-- Custom extension data -->
        <modExtensions>
            <li Class="ResourceGenerator.ResourceGeneratorExtension">
                <resourceDef>Steel</resourceDef>
                <amountPerCycle>5</amountPerCycle>
                <ticksPerCycle>2500</ticksPerCycle>
                <requiresPower>false</requiresPower>
                <maxStorage>100</maxStorage>
            </li>
        </modExtensions>
    </ThingDef>

    <!-- Gold Generator (different settings) -->
    <ThingDef ParentName="BuildingBase">
        <defName>ResourceGen_GoldGenerator</defName>
        <label>gold generator</label>
        <description>Slowly generates gold over time.</description>

        <thingClass>ResourceGenerator.Building_ResourceGenerator</thingClass>

        <graphicData>
            <texPath>Things/Building/Production/TableMachining</texPath>
            <graphicClass>Graphic_Single</graphicClass>
            <drawSize>(2,2)</drawSize>
        </graphicData>

        <size>(2,2)</size>
        <passability>PassThroughOnly</passability>

        <statBases>
            <MaxHitPoints>200</MaxHitPoints>
            <WorkToBuild>8000</WorkToBuild>
        </statBases>

        <costList>
            <Steel>200</Steel>
            <Gold>25</Gold>
            <ComponentIndustrial>8</ComponentIndustrial>
        </costList>

        <designationCategory>Production</designationCategory>

        <researchPrerequisites>
            <li>Fabrication</li>
        </researchPrerequisites>

        <!-- Different extension settings -->
        <modExtensions>
            <li Class="ResourceGenerator.ResourceGeneratorExtension">
                <resourceDef>Gold</resourceDef>
                <amountPerCycle>2</amountPerCycle>
                <ticksPerCycle>6000</ticksPerCycle>
                <requiresPower>false</requiresPower>
                <maxStorage>50</maxStorage>
            </li>
        </modExtensions>
    </ThingDef>
</Defs>
```

#### Step 7: Build and Test

1. Build the Visual Studio project
2. Enable mod in RimWorld
3. Start a game
4. Build a steel generator
5. Watch it produce steel over time
6. Check the inspect string for progress

### Success Criteria
- [x] Buildings spawn and function
- [x] Resources are generated at specified intervals
- [x] Inspect string shows progress
- [x] Different buildings use different extension settings
- [x] Resources spawn near building
- [x] Save/load preserves progress

### What You Learned
- Creating DefModExtension classes
- Accessing extension data from C# code
- Custom building classes with Tick() override
- Spawning things programmatically with ThingMaker
- Finding spawn locations with GenAdj and GenPlace
- Saving custom data with ExposeData
- Building inspect strings with GetInspectString
- Using nullable types safely

### Challenge Extensions

1. **Add power requirement:**
   - Add CompPowerTrader to building comps
   - Check power status before generating
   - Adjust CompPowerTrader power draw in XML

2. **Add visual effects:**
   - Add mote spawning when resources generated
   - Use MoteMaker class

3. **Add efficiency:**
   - Higher quality buildings generate faster
   - Use CompQuality

4. **Create more generator types:**
   - Component generator
   - Medicine generator
   - Food generator

---

## Exercise 10: HugsLib Integration - Mod Settings

**Difficulty**: Advanced
**Time**: 60-75 minutes
**Concepts**: HugsLib, Mod settings UI, Configuration persistence

### Goal
Add configurable mod settings to your Resource Generator mod using HugsLib, allowing users to adjust generation speed globally.

### Step-by-Step Instructions

#### Step 1: Add HugsLib Dependency

Update `About.xml`:

```xml
<modDependencies>
    <li>
        <packageId>brrainz.harmony</packageId>
        <displayName>Harmony</displayName>
    </li>
    <li>
        <packageId>UnlimitedHugs.HugsLib</packageId>
        <displayName>HugsLib</displayName>
        <steamWorkshopUrl>steam://url/CommunityFilePage/818773962</steamWorkshopUrl>
    </li>
</modDependencies>

<loadAfter>
    <li>brrainz.harmony</li>
    <li>UnlimitedHugs.HugsLib</li>
</loadAfter>
```

#### Step 2: Add HugsLib Reference to Project

1. Find HugsLib.dll in: `steamapps/workshop/content/294100/818773962/Assemblies/`
2. Add as reference to your Visual Studio project
3. Set "Copy Local" to False (HugsLib is loaded by RimWorld)

#### Step 3: Create ModBase Class

Create `ResourceGeneratorMod.cs`:

```csharp
using HugsLib;
using HugsLib.Settings;
using Verse;

namespace ResourceGenerator
{
    public class ResourceGeneratorMod : ModBase
    {
        public override string ModIdentifier => "ResourceGenerator";

        // Settings handles
        private SettingHandle<float> speedMultiplier;
        private SettingHandle<bool> enableLogging;
        private SettingHandle<int> maxStorageGlobal;

        // Public accessors for other classes to use
        public static float SpeedMultiplier { get; private set; } = 1.0f;
        public static bool EnableLogging { get; private set; } = false;
        public static int MaxStorageGlobal { get; private set; } = 100;

        public override void DefsLoaded()
        {
            // Create settings
            speedMultiplier = Settings.GetHandle<float>(
                "speedMultiplier",
                "Generation Speed Multiplier",
                "Multiplies the generation speed of all resource generators.\n1.0 = normal speed, 2.0 = twice as fast, 0.5 = half speed.",
                1.0f,
                Validators.FloatRangeValidator(0.1f, 10.0f)
            );

            enableLogging = Settings.GetHandle<bool>(
                "enableLogging",
                "Enable Debug Logging",
                "Logs generation events to the debug console.",
                false
            );

            maxStorageGlobal = Settings.GetHandle<int>(
                "maxStorageGlobal",
                "Global Max Storage",
                "Maximum resources each generator can store before stopping production.",
                100,
                Validators.IntRangeValidator(10, 1000)
            );

            // Subscribe to value changes
            speedMultiplier.OnValueChanged = val => { SpeedMultiplier = val; };
            enableLogging.OnValueChanged = val => { EnableLogging = val; };
            maxStorageGlobal.OnValueChanged = val => { MaxStorageGlobal = val; };

            // Set initial values
            SpeedMultiplier = speedMultiplier.Value;
            EnableLogging = enableLogging.Value;
            MaxStorageGlobal = maxStorageGlobal.Value;
        }

        public override void WorldLoaded()
        {
            base.WorldLoaded();
            Log.Message($"ResourceGenerator settings loaded: Speed={SpeedMultiplier}x, MaxStorage={MaxStorageGlobal}");
        }
    }
}
```

#### Step 4: Update Building Class to Use Settings

Modify `Building_ResourceGenerator.cs`:

```csharp
using Verse;
using RimWorld;

namespace ResourceGenerator
{
    public class Building_ResourceGenerator : Building
    {
        private int tickCounter = 0;
        private int storedResources = 0;
        private ResourceGeneratorExtension extension;

        public override void SpawnSetup(Map map, bool respawningAfterLoad)
        {
            base.SpawnSetup(map, respawningAfterLoad);
            extension = def.GetModExtension<ResourceGeneratorExtension>();

            if (extension == null)
            {
                Log.Error($"Building_ResourceGenerator {def.defName} has no ResourceGeneratorExtension!");
            }
        }

        public override void Tick()
        {
            base.Tick();
            if (extension == null) return;

            // Check power requirement
            if (extension.requiresPower)
            {
                CompPowerTrader power = GetComp<CompPowerTrader>();
                if (power != null && !power.PowerOn)
                    return;
            }

            tickCounter++;

            // Apply speed multiplier from settings
            int adjustedTicksPerCycle = (int)(extension.ticksPerCycle / ResourceGeneratorMod.SpeedMultiplier);

            // Use global max storage if set
            int effectiveMaxStorage = ResourceGeneratorMod.MaxStorageGlobal;

            if (tickCounter >= adjustedTicksPerCycle)
            {
                tickCounter = 0;

                if (storedResources < effectiveMaxStorage)
                {
                    storedResources += extension.amountPerCycle;

                    // Log if enabled
                    if (ResourceGeneratorMod.EnableLogging)
                    {
                        Log.Message($"{def.label} at {Position} generated {extension.amountPerCycle} {extension.resourceDef.label}");
                    }

                    SpawnResources();
                }
            }
        }

        private void SpawnResources()
        {
            if (extension == null || extension.resourceDef == null) return;

            Thing resource = ThingMaker.MakeThing(extension.resourceDef);
            resource.stackCount = extension.amountPerCycle;

            IntVec3 dropPos;
            if (TryFindSpawnCell(out dropPos))
            {
                GenPlace.TryPlaceThing(resource, dropPos, this.Map, ThingPlaceMode.Near);
            }

            storedResources -= extension.amountPerCycle;
        }

        private bool TryFindSpawnCell(out IntVec3 result)
        {
            foreach (IntVec3 cell in GenAdj.CellsAdjacent8Way(this))
            {
                if (cell.InBounds(this.Map) && cell.Standable(this.Map))
                {
                    result = cell;
                    return true;
                }
            }
            result = this.Position;
            return false;
        }

        public override string GetInspectString()
        {
            string baseInspect = base.GetInspectString();
            if (extension == null) return baseInspect;

            int adjustedTicks = (int)(extension.ticksPerCycle / ResourceGeneratorMod.SpeedMultiplier);

            string info = $"\nGenerating: {extension.resourceDef.label}";
            info += $"\nProgress: {tickCounter}/{adjustedTicks}";
            info += $"\nStored: {storedResources}/{ResourceGeneratorMod.MaxStorageGlobal}";
            info += $"\nSpeed: {ResourceGeneratorMod.SpeedMultiplier}x";

            return baseInspect + info;
        }

        public override void ExposeData()
        {
            base.ExposeData();
            Scribe_Values.Look(ref tickCounter, "tickCounter", 0);
            Scribe_Values.Look(ref storedResources, "storedResources", 0);
        }
    }
}
```

#### Step 5: Remove Old Init, Use HugsLib

Delete `ResourceGeneratorInit.cs` (no longer needed - HugsLib handles initialization)

#### Step 6: Build and Test

1. Build the project
2. Make sure HugsLib is enabled in mod list
3. Enable your mod (should load after HugsLib)
4. Launch RimWorld
5. **Open Mod Settings:**
   - Main menu > Options > Mod Settings
   - Find "ResourceGenerator" in list
   - Adjust speed multiplier, see settings

6. Start/load game
7. Build generator
8. Change settings mid-game and see effects immediately

### Success Criteria
- [x] Settings appear in Mod Settings menu
- [x] Speed multiplier affects generation rate
- [x] Max storage setting works
- [x] Logging can be toggled
- [x] Settings persist between sessions
- [x] Settings can be changed mid-game

### What You Learned
- Integrating HugsLib into mods
- Creating mod settings with SettingHandle
- Using validators for settings bounds
- Making settings accessible to other classes
- Reacting to setting changes with callbacks
- HugsLib ModBase lifecycle methods
- Separating configuration from logic

### Challenge Extensions

1. **Add more settings:**
   - Power consumption multiplier
   - Enable/disable specific generator types
   - Resource spawn position preference

2. **Add setting presets:**
   - "Balanced", "Easy", "Hard" presets
   - Buttons to apply preset configurations

3. **Add visual customization:**
   - Setting to change generator texture color
   - Requires additional graphics work

---

## Exercise 11: Complex Harmony Transpiler (Advanced)

**Difficulty**: Very Advanced
**Time**: 90-120 minutes
**Concepts**: IL code, Transpilers, Advanced Harmony, Performance optimization

### Goal
Use a Harmony Transpiler to modify the nutrition calculation for meals, making all meals 25% more nutritious by modifying IL instructions.

**Note:** This is a very advanced topic. Study Harmony documentation and IL basics first.

### Background: What is a Transpiler?

A Transpiler modifies the IL (Intermediate Language) instructions of a method. Unlike Prefix/Postfix that add code before/after, Transpilers change the actual method code.

#### Step 1: Understand IL Basics

IL (Intermediate Language) is what C# compiles to before becoming machine code.

Example C# code:
```csharp
float nutrition = baseNutrition * 2.0f;
```

Compiles to IL instructions (simplified):
```
ldloc.0       // Load baseNutrition onto stack
ldc.r4 2.0    // Load constant 2.0 onto stack
mul           // Multiply top two stack items
stloc.1       // Store result in nutrition
```

#### Step 2: Create Mod Structure

Create new mod: `MealNutritionBoost`

#### Step 3: Find Target Method

First, we need to find which method calculates meal nutrition. Use dnSpy:

1. Open dnSpy (download if needed)
2. Open `Assembly-CSharp.dll`
3. Search for "nutrition" in meals
4. Find method in `ThingDef` or `CompIngredients`

For this exercise, we'll patch a simplified example.

#### Step 4: Write Transpiler Patch

Create `Nutrition_Transpiler.cs`:

```csharp
using System.Collections.Generic;
using System.Reflection;
using System.Reflection.Emit;
using HarmonyLib;
using Verse;
using RimWorld;

namespace MealNutritionBoost
{
    // This is a simplified example - real IL patching is more complex
    [HarmonyPatch(typeof(FoodUtility))]
    [HarmonyPatch(nameof(FoodUtility.GetNutrition))]
    public static class FoodUtility_GetNutrition_Transpiler
    {
        [HarmonyTranspiler]
        public static IEnumerable<CodeInstruction> Transpiler(IEnumerable<CodeInstruction> instructions)
        {
            var codes = new List<CodeInstruction>(instructions);

            // We want to find where nutrition is returned
            // and multiply it by 1.25 before returning

            for (int i = 0; i < codes.Count; i++)
            {
                var instruction = codes[i];

                // Look for 'ret' (return) instruction
                if (instruction.opcode == OpCodes.Ret)
                {
                    // Insert multiplication before return
                    // Stack has nutrition value on top

                    // Load constant 1.25
                    var loadConstant = new CodeInstruction(OpCodes.Ldc_R4, 1.25f);

                    // Multiply (multiplies top two stack values)
                    var multiply = new CodeInstruction(OpCodes.Mul);

                    // Insert before the return
                    codes.Insert(i, loadConstant);
                    codes.Insert(i + 1, multiply);

                    Log.Message("MealNutritionBoost: Transpiler successfully patched GetNutrition!");

                    // Only patch first return (simplified)
                    break;
                }
            }

            return codes;
        }
    }
}
```

#### Step 5: Simpler Alternative - Postfix Approach

Since Transpilers are complex, here's a simpler Postfix alternative that achieves the same goal:

```csharp
using HarmonyLib;
using RimWorld;
using Verse;

namespace MealNutritionBoost
{
    [HarmonyPatch(typeof(FoodUtility))]
    [HarmonyPatch(nameof(FoodUtility.GetNutrition))]
    public static class FoodUtility_GetNutrition_Patch
    {
        [HarmonyPostfix]
        public static void Postfix(Thing food, ref float __result)
        {
            // Only boost meals, not raw food
            if (food.def.IsMeal)
            {
                __result *= 1.25f;
            }
        }
    }
}
```

#### Step 6: Initialize

```csharp
using HarmonyLib;
using Verse;

namespace MealNutritionBoost
{
    [StaticConstructorOnStartup]
    public static class MealNutritionBoostInit
    {
        static MealNutritionBoostInit()
        {
            var harmony = new Harmony("yourname.mealnutritionboost");
            harmony.PatchAll();
            Log.Message("MealNutritionBoost: All meals 25% more nutritious!");
        }
    }
}
```

### Success Criteria
- [x] Meals provide more nutrition when eaten
- [x] Patch applies without errors
- [x] Doesn't affect raw food (only meals)
- [x] Game balance noticeably affected

### What You Learned
- IL code basics and structure
- Transpiler concept and usage
- OpCodes and IL instructions
- Finding return points in IL
- Inserting instructions in method body
- When to use Transpiler vs Postfix/Prefix

### Note on Transpilers

Transpilers are powerful but dangerous:
- Hard to debug
- Can break with game updates
- Requires understanding IL
- Use only when Prefix/Postfix won't work

**When to use Transpilers:**
- Need to modify middle of method (not start/end)
- Performance critical (avoid call overhead)
- Complex conditional insertion

**When to use Prefix/Postfix:**
- Can add code before/after
- Simpler and more maintainable
- Less likely to break on updates

---

## Exercise 12: Framework Pattern - Create a Shared Library Mod

**Difficulty**: Advanced
**Time**: 120+ minutes
**Concepts**: Framework creation, Multi-mod architecture, API design

### Goal
Create a framework mod (like Vanilla Expanded Framework) that provides shared utilities for a mod series, then create two content mods that depend on it.

### Step-by-Step Instructions

#### Step 1: Create Framework Mod Structure

Create mod: `MyFramework`

```
MyFramework/
├── About/About.xml
├── Defs/
│   └── (framework defs if needed)
└── Source/
    └── (Visual Studio project)
```

#### Step 2: Framework About.xml

```xml
<?xml version="1.0" encoding="utf-8"?>
<ModMetaData>
    <name>My Framework</name>
    <author>Your Name</author>
    <packageId>YourName.MyFramework</packageId>
    <supportedVersions>
        <li>1.5</li>
        <li>1.6</li>
    </supportedVersions>
    <modDependencies>
        <li>
            <packageId>brrainz.harmony</packageId>
            <displayName>Harmony</displayName>
        </li>
    </modDependencies>
    <loadBefore>
        <li>Ludeon.RimWorld</li>
    </loadBefore>
    <description>Shared framework providing utilities for my mod series.</description>
</ModMetaData>
```

#### Step 3: Create Utility Classes

Create `FrameworkUtilities.cs`:

```csharp
using System.Collections.Generic;
using Verse;
using RimWorld;

namespace MyFramework
{
    public static class FrameworkUtilities
    {
        // Utility: Find all things of a type on map
        public static List<Thing> FindAllOfDef(Map map, ThingDef def)
        {
            List<Thing> result = new List<Thing>();

            foreach (Thing thing in map.listerThings.AllThings)
            {
                if (thing.def == def)
                {
                    result.Add(thing);
                }
            }

            return result;
        }

        // Utility: Spawn thing with effects
        public static Thing SpawnWithEffects(ThingDef def, IntVec3 position, Map map, int count = 1)
        {
            Thing thing = ThingMaker.MakeThing(def);
            thing.stackCount = count;

            // Add spawn effects
            FleckMaker.ThrowDustPuff(position.ToVector3(), map, 1.5f);

            GenPlace.TryPlaceThing(thing, position, map, ThingPlaceMode.Near);

            return thing;
        }

        // Utility: Get total wealth of items on map
        public static float GetTotalItemWealth(Map map)
        {
            float total = 0f;

            foreach (Thing thing in map.listerThings.AllThings)
            {
                if (thing.def.category == ThingCategory.Item)
                {
                    total += thing.MarketValue * thing.stackCount;
                }
            }

            return total;
        }
    }
}
```

#### Step 4: Create Base Classes for Extension

Create `Building_FrameworkBase.cs`:

```csharp
using Verse;

namespace MyFramework
{
    // Base class that content mods can inherit from
    public abstract class Building_FrameworkBase : Building
    {
        // Common functionality for all framework buildings
        protected int ticksSinceSpawn = 0;

        public override void Tick()
        {
            base.Tick();
            ticksSinceSpawn++;

            // Call abstract method for custom behavior
            if (ticksSinceSpawn % 250 == 0)  // Every ~4 seconds
            {
                CustomTick();
            }
        }

        // Override this in child classes
        protected abstract void CustomTick();

        public override void ExposeData()
        {
            base.ExposeData();
            Scribe_Values.Look(ref ticksSinceSpawn, "ticksSinceSpawn", 0);
        }
    }
}
```

#### Step 5: Framework DefModExtension

Create `FrameworkExtension.cs`:

```csharp
using Verse;

namespace MyFramework
{
    public class FrameworkExtension : DefModExtension
    {
        // Common data all framework mods can use
        public string category = "default";
        public float powerMultiplier = 1.0f;
        public bool enableSpecialEffects = true;
    }
}
```

#### Step 6: Initialize Framework

Create `MyFrameworkInit.cs`:

```csharp
using HarmonyLib;
using Verse;

namespace MyFramework
{
    [StaticConstructorOnStartup]
    public static class MyFrameworkInit
    {
        public static readonly string Version = "1.0.0";

        static MyFrameworkInit()
        {
            var harmony = new Harmony("yourname.myframework");
            harmony.PatchAll();

            Log.Message($"MyFramework v{Version} loaded!");
        }

        // Utility for other mods to check framework version
        public static bool IsVersionCompatible(string requiredVersion)
        {
            // Simple version check (can be more sophisticated)
            return Version == requiredVersion;
        }
    }
}
```

#### Step 7: Build Framework

Build the framework project. The DLL will be in `MyFramework/Assemblies/`.

---

#### Step 8: Create First Content Mod Using Framework

Create mod: `MyContentMod1`

```
MyContentMod1/
├── About/About.xml
├── Defs/
│   └── ThingDefs_Buildings.xml
└── Source/
    └── (Visual Studio project)
```

#### Step 9: Content Mod About.xml

```xml
<?xml version="1.0" encoding="utf-8"?>
<ModMetaData>
    <name>My Content Mod 1</name>
    <author>Your Name</author>
    <packageId>YourName.MyContentMod1</packageId>
    <supportedVersions>
        <li>1.5</li>
        <li>1.6</li>
    </supportedVersions>

    <modDependencies>
        <li>
            <packageId>YourName.MyFramework</packageId>
            <displayName>My Framework</displayName>
        </li>
    </modDependencies>

    <loadAfter>
        <li>YourName.MyFramework</li>
    </loadAfter>

    <description>Content mod using My Framework.</description>
</ModMetaData>
```

#### Step 10: Reference Framework in Content Mod

1. In Visual Studio project for MyContentMod1
2. Add reference to `MyFramework.dll` (from framework's Assemblies folder)
3. Set "Copy Local" to False

#### Step 11: Create Content Using Framework

Create `Building_CustomMachine.cs`:

```csharp
using Verse;
using MyFramework;  // Using the framework!

namespace MyContentMod1
{
    public class Building_CustomMachine : Building_FrameworkBase
    {
        protected override void CustomTick()
        {
            // Use framework utilities
            if (this.Map != null)
            {
                // Example: Count items of a type
                var steel = DefDatabase<ThingDef>.GetNamed("Steel");
                var steelItems = FrameworkUtilities.FindAllOfDef(this.Map, steel);

                // Every 4 seconds, if we have less than 100 steel, spawn some
                if (steelItems.Count < 100 && Rand.Chance(0.1f))
                {
                    FrameworkUtilities.SpawnWithEffects(
                        steel,
                        this.Position,
                        this.Map,
                        5
                    );
                }
            }
        }
    }
}
```

#### Step 12: Create Building Def Using Framework Extension

Create `Defs/ThingDefs_Buildings.xml`:

```xml
<?xml version="1.0" encoding="utf-8"?>
<Defs>
    <ThingDef ParentName="BuildingBase">
        <defName>MyContent_CustomMachine</defName>
        <label>custom machine</label>
        <description>A machine that uses the framework.</description>

        <thingClass>MyContentMod1.Building_CustomMachine</thingClass>

        <graphicData>
            <texPath>Things/Building/Production/TableMachining</texPath>
            <graphicClass>Graphic_Single</graphicClass>
            <drawSize>(2,2)</drawSize>
        </graphicData>

        <size>(2,2)</size>
        <passability>PassThroughOnly</passability>

        <statBases>
            <MaxHitPoints>200</MaxHitPoints>
            <WorkToBuild>3000</WorkToBuild>
        </statBases>

        <costList>
            <Steel>100</Steel>
            <ComponentIndustrial>3</ComponentIndustrial>
        </costList>

        <designationCategory>Production</designationCategory>

        <!-- Use framework extension -->
        <modExtensions>
            <li Class="MyFramework.FrameworkExtension">
                <category>production</category>
                <powerMultiplier>1.5</powerMultiplier>
                <enableSpecialEffects>true</enableSpecialEffects>
            </li>
        </modExtensions>
    </ThingDef>
</Defs>
```

#### Step 13: Test the Framework System

1. Build framework mod
2. Build content mod
3. Enable BOTH mods in RimWorld (framework must load first)
4. Start game
5. Build the custom machine
6. Watch it spawn steel using framework utilities

### Success Criteria
- [x] Framework mod loads first
- [x] Content mod successfully references framework
- [x] Framework utilities work in content mod
- [x] Base classes can be extended
- [x] DefModExtension shared between mods
- [x] No circular dependencies

### What You Learned
- Framework architecture pattern
- Creating reusable utility classes
- Abstract base classes for extension
- Managing mod dependencies
- Load order importance
- API design for mod series
- Code reuse across multiple mods

### Challenge Extensions

1. **Create second content mod:**
   - Another mod using same framework
   - Different buildings, same utilities
   - Demonstrate code reuse

2. **Add framework settings:**
   - Use HugsLib in framework
   - Content mods read framework settings

3. **Version checking:**
   - Content mods verify framework version
   - Error message if version incompatible

4. **Event system:**
   - Framework provides event hooks
   - Content mods subscribe to events

---

## Additional Resources

### Debugging C# Mods

**Using Visual Studio Debugger:**
1. Project > Properties > Debug
2. Set "Start external program" to RimWorld exe
3. Set breakpoints in code
4. Press F5 to debug
5. Game will launch, breakpoints will hit

**Common Issues:**
- **NullReferenceException:** Check for null before accessing properties
- **Patch not applying:** Check Harmony attributes, verify method signature
- **Missing references:** Ensure all DLLs are referenced

### Best Practices for C# Modding

1. **Always null check:**
   ```csharp
   if (pawn?.health != null)
   {
       // Safe to use pawn.health
   }
   ```

2. **Log errors gracefully:**
   ```csharp
   try
   {
       // Risky code
   }
   catch (Exception ex)
   {
       Log.Error($"MyMod error: {ex.Message}");
   }
   ```

3. **Cache expensive lookups:**
   ```csharp
   private static ThingDef cachedSteelDef;
   public static ThingDef SteelDef
   {
       get
       {
           if (cachedSteelDef == null)
               cachedSteelDef = DefDatabase<ThingDef>.GetNamed("Steel");
           return cachedSteelDef;
       }
   }
   ```

4. **Use proper Tick intervals:**
   ```csharp
   if (Find.TickManager.TicksGame % 250 == 0)  // Every ~4 seconds
   {
       // Don't run every tick!
   }
   ```

5. **Save custom data:**
   ```csharp
   public override void ExposeData()
   {
       base.ExposeData();
       Scribe_Values.Look(ref myCustomField, "myCustomField", defaultValue);
   }
   ```

### Recommended Reading

- **Harmony Documentation:** https://harmony.pardeike.net/
- **HugsLib Wiki:** https://github.com/UnlimitedHugs/RimworldHugsLib/wiki
- **RimWorld Modding Discord:** Join for help from experienced modders
- **dnSpy:** Essential tool for reading RimWorld's code

---

## Congratulations!

You've completed the advanced exercises! You now know:

✅ C# mod project setup
✅ Harmony Prefix and Postfix patches
✅ DefModExtension for custom data
✅ HugsLib integration and settings
✅ Transpiler basics (advanced)
✅ Framework pattern for mod series
✅ Building custom classes
✅ Saving/loading custom data
✅ Professional modding patterns

**Next Steps:**
1. Study open-source mods with complex code
2. Contribute to existing mods on GitHub
3. Create your own mod series
4. Join the RimWorld modding community
5. Help other modders learn

Happy advanced modding!
