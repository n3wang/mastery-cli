# RimWorld Mod Architecture Guide

This guide explains the architecture and structure of RimWorld mods based on analysis of 65 mods from the Steam Workshop.

## Table of Contents
1. [Introduction](#introduction)
2. [Mod Types](#mod-types)
3. [Directory Structure](#directory-structure)
4. [Core Files](#core-files)
5. [XML Definitions](#xml-definitions)
6. [C# Assembly Mods](#c-assembly-mods)
7. [Version Management](#version-management)
8. [Dependencies and Load Order](#dependencies-and-load-order)
9. [Best Practices](#best-practices)

---

## Introduction

RimWorld mods follow a well-established, consistent structure that makes them modular and compatible. Understanding this architecture is essential for creating your own mods.

### Key Concepts

- **Package ID**: Unique identifier for your mod (format: `Author.ModName`)
- **DefName**: Unique identifier for individual game objects defined in XML
- **Harmony**: Patching library used by most C# mods to modify game behavior
- **XML Defs**: XML files that define game content (items, buildings, recipes, etc.)

---

## Mod Types

Based on analysis of existing mods, there are several common types:

### 1. Content Mods (XML-only)
**Examples**: Misc. Training, Fire Extinguisher

**Characteristics**:
- Pure XML definitions
- No compiled code
- Easy to create and maintain
- Adds items, buildings, research, etc.

**Use Cases**:
- Adding new items or buildings
- Creating new research projects
- Adding animals or plants
- Simple gameplay additions

### 2. Assembly Mods (C# + XML)
**Examples**: Simple Sidearms, Pick Up And Haul, Hospitality

**Characteristics**:
- Contains compiled DLLs
- Uses Harmony for runtime patching
- Complex game mechanics
- Requires programming knowledge

**Use Cases**:
- Modifying game behavior
- Adding new UI elements
- Complex automation
- Save data management

### 3. Framework/Library Mods
**Examples**: Harmony, HugsLib, Vanilla Expanded Framework

**Characteristics**:
- Provides shared functionality
- Other mods depend on them
- Minimal content themselves
- Load early in mod order

**Use Cases**:
- Creating mod series
- Sharing code between mods
- Providing utilities to modding community

### 4. Patch Mods
**Examples**: Compatibility patches between mods

**Characteristics**:
- Minimal independent content
- Depends on other mods
- Uses XML patches
- Fixes conflicts

**Use Cases**:
- Adding compatibility between mods
- Balancing existing content
- Fixing mod conflicts

---

## Directory Structure

### Standard Mod Layout

```
YourModID/
├── About/
│   ├── About.xml                 [Required] Mod metadata
│   ├── Preview.png              [Recommended] Steam preview image
│   └── PublishedFileId.txt      [Auto-generated] Steam Workshop ID
│
├── Defs/                        [Content definitions]
│   ├── ThingDefs/
│   │   ├── Buildings_*.xml
│   │   ├── Items_*.xml
│   │   └── Weapons_*.xml
│   ├── ResearchProjectDefs/
│   │   └── ResearchProjects.xml
│   ├── RecipeDefs/
│   │   └── Recipes_*.xml
│   └── [Other Def types]/
│
├── Assemblies/                  [Compiled DLLs - C# mods only]
│   ├── 0Harmony.dll
│   └── YourMod.dll
│
├── Patches/                     [XML patches]
│   ├── Patches_CombatExtended.xml
│   └── Patches_OtherMods.xml
│
├── Textures/                    [PNG images]
│   ├── Things/
│   │   ├── Building/
│   │   ├── Item/
│   │   └── Pawn/
│   └── UI/
│
├── Languages/                   [Translations]
│   ├── English/
│   │   └── Keyed/
│   │       └── Keys.xml
│   ├── French/
│   └── [Other languages]/
│
├── Source/                      [C# source code - optional]
│   ├── YourMod/
│   │   ├── YourMod.csproj
│   │   └── *.cs files
│   └── YourMod.sln
│
├── Sounds/                      [Audio files - optional]
│   └── [Sound files]
│
├── LoadFolders.xml             [Version-specific loading]
└── README.md                    [Documentation]
```

### Version-Specific Structure

For mods supporting multiple RimWorld versions:

```
YourMod/
├── About/
│   └── About.xml
├── LoadFolders.xml              [Defines version routing]
├── 1.4/                         [Version-specific content]
│   ├── Assemblies/
│   ├── Defs/
│   └── Patches/
├── 1.5/
│   ├── Assemblies/
│   ├── Defs/
│   └── Patches/
└── 1.6/
    ├── Assemblies/
    ├── Defs/
    └── Patches/
```

---

## Core Files

### About.xml Structure

The `About/About.xml` file is **required** and contains mod metadata:

```xml
<?xml version="1.0" encoding="utf-8"?>
<ModMetaData>
    <!-- Display Information -->
    <name>My Amazing Mod</name>
    <author>Your Name</author>
    <packageId>YourName.MyAmazingMod</packageId>
    <modVersion>1.0.0</modVersion>
    <url>https://github.com/yourname/mod</url>

    <!-- Version Support -->
    <supportedVersions>
        <li>1.5</li>
        <li>1.6</li>
    </supportedVersions>

    <!-- Dependencies -->
    <modDependencies>
        <li>
            <packageId>brrainz.harmony</packageId>
            <displayName>Harmony</displayName>
            <steamWorkshopUrl>steam://url/CommunityFilePage/2009463077</steamWorkshopUrl>
            <downloadUrl>https://github.com/pardeike/HarmonyRimWorld/releases/latest</downloadUrl>
        </li>
    </modDependencies>

    <!-- Load Order -->
    <loadAfter>
        <li>Ludeon.RimWorld</li>
        <li>brrainz.harmony</li>
    </loadAfter>

    <!-- Description -->
    <description>
        This mod adds amazing features to RimWorld!

        Features:
        - Cool feature 1
        - Cool feature 2
    </description>
</ModMetaData>
```

### LoadFolders.xml (Version Management)

```xml
<?xml version="1.0" encoding="utf-8"?>
<loadFolders>
    <v1.4>
        <li>1.4</li>
        <li>/</li>
    </v1.4>
    <v1.5>
        <li>1.5</li>
        <li>/</li>
    </v1.5>
    <v1.6>
        <li>1.6</li>
        <li>/</li>
    </v1.6>
</loadFolders>
```

This tells RimWorld which folders to load for each game version.

---

## XML Definitions

### Common Def Types

RimWorld uses XML "Defs" to define game content. Here are the most common types:

#### ThingDefs
Define physical objects (buildings, items, weapons, apparel, etc.)

**File naming**: `Defs/ThingDefs/Buildings_Production.xml`

```xml
<?xml version="1.0" encoding="utf-8"?>
<Defs>
    <ThingDef ParentName="BuildingBase">
        <defName>MyCustomWorkbench</defName>
        <label>custom workbench</label>
        <description>A workbench for crafting custom items.</description>
        <thingClass>Building_WorkTable</thingClass>
        <graphicData>
            <texPath>Things/Building/Production/CustomWorkbench</texPath>
            <graphicClass>Graphic_Single</graphicClass>
            <drawSize>(3,1)</drawSize>
        </graphicData>
        <costList>
            <Steel>100</Steel>
            <ComponentIndustrial>5</ComponentIndustrial>
        </costList>
        <statBases>
            <MaxHitPoints>180</MaxHitPoints>
            <WorkToBuild>3000</WorkToBuild>
            <Flammability>1.0</Flammability>
        </statBases>
        <size>(3,1)</size>
        <passability>PassThroughOnly</passability>
        <hasInteractionCell>true</hasInteractionCell>
        <interactionCellOffset>(0,0,-1)</interactionCellOffset>
        <surfaceType>Item</surfaceType>
        <designationCategory>Production</designationCategory>
        <recipes>
            <li>MakeCustomItem</li>
        </recipes>
    </ThingDef>
</Defs>
```

#### ResearchProjectDefs
Define research projects

**File naming**: `Defs/ResearchProjectDefs/ResearchProjects.xml`

```xml
<?xml version="1.0" encoding="utf-8"?>
<Defs>
    <ResearchProjectDef>
        <defName>MyCustomResearch</defName>
        <label>custom technology</label>
        <description>Research custom technology to unlock new features.</description>
        <baseCost>2000</baseCost>
        <techLevel>Industrial</techLevel>
        <prerequisites>
            <li>Smithing</li>
        </prerequisites>
        <researchViewX>6</researchViewX>
        <researchViewY>2</researchViewY>
    </ResearchProjectDef>
</Defs>
```

#### RecipeDefs
Define crafting recipes

**File naming**: `Defs/RecipeDefs/Recipes_Production.xml`

```xml
<?xml version="1.0" encoding="utf-8"?>
<Defs>
    <RecipeDef>
        <defName>MakeCustomItem</defName>
        <label>make custom item</label>
        <description>Create a custom item.</description>
        <jobString>Making custom item.</jobString>
        <workSpeedStat>GeneralLaborSpeed</workSpeedStat>
        <effectWorking>Cook</effectWorking>
        <soundWorking>Recipe_Machining</soundWorking>
        <workAmount>1000</workAmount>
        <ingredients>
            <li>
                <filter>
                    <thingDefs>
                        <li>Steel</li>
                    </thingDefs>
                </filter>
                <count>25</count>
            </li>
        </ingredients>
        <products>
            <MyCustomItem>1</MyCustomItem>
        </products>
        <skillRequirements>
            <Crafting>5</Crafting>
        </skillRequirements>
        <researchPrerequisite>MyCustomResearch</researchPrerequisite>
    </RecipeDef>
</Defs>
```

#### Other Important Def Types

- **JobDefs**: Define types of jobs pawns can do
- **WorkGiverDefs**: Assign jobs to pawns
- **HediffDefs**: Health conditions and effects
- **TrainableDefs**: Animal training definitions
- **StatDefs**: Custom stats for things/pawns
- **DamageDefs**: Types of damage
- **BiomeDefs**: World biomes
- **FactionDefs**: Factions and their behavior

### XML Patching

Patches modify existing definitions without replacing files:

**File naming**: `Patches/Patches_BalanceChanges.xml`

```xml
<?xml version="1.0" encoding="utf-8"?>
<Patch>
    <Operation Class="PatchOperationSequence">
        <operations>
            <!-- Change steel cost of vanilla workbench -->
            <li Class="PatchOperationReplace">
                <xpath>/Defs/ThingDef[defName="TableMachining"]/costList/Steel</xpath>
                <value>
                    <Steel>150</Steel>
                </value>
            </li>

            <!-- Add new recipe to vanilla bench -->
            <li Class="PatchOperationAdd">
                <xpath>/Defs/ThingDef[defName="TableMachining"]/recipes</xpath>
                <value>
                    <li>MakeCustomItem</li>
                </value>
            </li>
        </operations>
    </Operation>
</Patch>
```

Common patch operations:
- `PatchOperationAdd`: Add new elements
- `PatchOperationReplace`: Replace existing elements
- `PatchOperationRemove`: Remove elements
- `PatchOperationSequence`: Execute multiple patches in order
- `PatchOperationConditional`: Apply patches based on conditions

---

## C# Assembly Mods

### When to Use C# Code

Use C# when you need to:
- Modify game behavior not exposed in XML
- Add complex logic or algorithms
- Create custom UI elements
- Save custom data
- Add new game systems

### Project Setup

1. **Create Visual Studio Project**
   - Class Library (.NET Framework 4.8 or .NET Standard 2.1)
   - Target framework matching RimWorld version

2. **Add References**
   ```xml
   <ItemGroup>
       <Reference Include="Assembly-CSharp">
           <HintPath>C:\Program Files (x86)\Steam\steamapps\common\RimWorld\RimWorldWin64_Data\Managed\Assembly-CSharp.dll</HintPath>
           <Private>False</Private>
       </Reference>
       <Reference Include="UnityEngine.CoreModule">
           <HintPath>C:\Program Files (x86)\Steam\steamapps\common\RimWorld\RimWorldWin64_Data\Managed\UnityEngine.CoreModule.dll</HintPath>
           <Private>False</Private>
       </Reference>
       <Reference Include="0Harmony">
           <HintPath>path\to\0Harmony.dll</HintPath>
           <Private>True</Private>
       </Reference>
   </ItemGroup>
   ```

3. **Build Configuration**
   - Set output path to your mod's `Assemblies/` folder
   - Copy `0Harmony.dll` to `Assemblies/` if using Harmony

### Basic C# Mod Structure

#### Mod Entry Point

```csharp
using Verse;
using HarmonyLib;

namespace MyMod
{
    [StaticConstructorOnStartup]
    public static class MyModInit
    {
        static MyModInit()
        {
            // Create Harmony instance
            var harmony = new Harmony("yourname.mymod");

            // Apply all patches in assembly
            harmony.PatchAll();

            Log.Message("My Mod loaded successfully!");
        }
    }
}
```

#### Harmony Patches

**Prefix Patch** (runs before original method):
```csharp
using HarmonyLib;
using Verse;

namespace MyMod
{
    [HarmonyPatch(typeof(Pawn))]
    [HarmonyPatch(nameof(Pawn.Kill))]
    public static class Pawn_Kill_Patch
    {
        [HarmonyPrefix]
        public static bool Prefix(Pawn __instance, DamageInfo? dinfo)
        {
            // Return false to prevent original method from running
            // Return true to allow original method to run

            Log.Message($"{__instance.Name} is about to be killed!");
            return true;  // Allow kill to proceed
        }
    }
}
```

**Postfix Patch** (runs after original method):
```csharp
[HarmonyPatch(typeof(Thing))]
[HarmonyPatch(nameof(Thing.SpawnSetup))]
public static class Thing_SpawnSetup_Patch
{
    [HarmonyPostfix]
    public static void Postfix(Thing __instance, Map map)
    {
        // Runs after SpawnSetup completes
        Log.Message($"{__instance.Label} spawned on map!");
    }
}
```

**Transpiler Patch** (modifies IL code - advanced):
```csharp
[HarmonyPatch(typeof(Pawn_HealthTracker))]
[HarmonyPatch(nameof(Pawn_HealthTracker.HealthTick))]
public static class HealthTicker_Transpiler
{
    [HarmonyTranspiler]
    public static IEnumerable<CodeInstruction> Transpiler(IEnumerable<CodeInstruction> instructions)
    {
        // Modify IL instructions
        // Advanced usage - see Harmony documentation
        return instructions;
    }
}
```

#### Custom Classes

```csharp
using Verse;
using RimWorld;

namespace MyMod
{
    // Custom Building class
    public class Building_CustomWorkbench : Building_WorkTable
    {
        public override void Tick()
        {
            base.Tick();
            // Custom tick behavior
        }

        public override void SpawnSetup(Map map, bool respawningAfterLoad)
        {
            base.SpawnSetup(map, respawningAfterLoad);
            // Custom spawn behavior
        }
    }
}
```

#### Def Extensions

Add custom data to XML definitions:

```csharp
public class CustomThingDefExtension : DefModExtension
{
    public int customValue = 0;
    public string customString = "";
}
```

Use in XML:
```xml
<ThingDef>
    <defName>MyThing</defName>
    <!-- ... other fields ... -->
    <modExtensions>
        <li Class="MyMod.CustomThingDefExtension">
            <customValue>42</customValue>
            <customString>Hello!</customString>
        </li>
    </modExtensions>
</ThingDef>
```

Access in C#:
```csharp
var extension = thing.def.GetModExtension<CustomThingDefExtension>();
if (extension != null)
{
    int value = extension.customValue;
}
```

---

## Version Management

### Supporting Multiple RimWorld Versions

1. **Use LoadFolders.xml** to route version-specific content
2. **Conditional Compilation** for C# code:

```csharp
#if RW_1_5
    // Code for RimWorld 1.5
#elif RW_1_6
    // Code for RimWorld 1.6
#else
    // Code for other versions
#endif
```

3. **Version-Specific Assemblies**: Compile separate DLLs for each version

### Migration Strategies

- Keep common XML in root Defs/
- Version-specific changes in version folders
- Use patches to handle version differences when possible

---

## Dependencies and Load Order

### Common Dependencies

1. **Harmony** (`brrainz.harmony`)
   - Required by: 85% of C# mods
   - Purpose: Runtime patching framework

2. **HugsLib** (`UnlimitedHugs.HugsLib`)
   - Required by: ~8% of mods
   - Purpose: Shared utilities, mod settings, logging

3. **Vanilla Expanded Framework** (`OskarPotocki.VanillaFactionsExpanded.Core`)
   - Required by: Vanilla Expanded series
   - Purpose: Shared functionality for VE mods

### Load Order Rules

1. **Framework mods load first**:
   ```xml
   <loadBefore>
       <li>Ludeon.RimWorld</li>
   </loadBefore>
   ```

2. **Content mods load after dependencies**:
   ```xml
   <loadAfter>
       <li>brrainz.harmony</li>
       <li>UnlimitedHugs.HugsLib</li>
   </loadAfter>
   ```

3. **Patch mods load last**:
   ```xml
   <loadAfter>
       <li>Ludeon.RimWorld</li>
       <li>TargetMod.PackageId</li>
   </loadAfter>
   ```

### Declaring Dependencies

```xml
<modDependencies>
    <li>
        <packageId>brrainz.harmony</packageId>
        <displayName>Harmony</displayName>
        <steamWorkshopUrl>steam://url/CommunityFilePage/2009463077</steamWorkshopUrl>
        <downloadUrl>https://github.com/pardeike/HarmonyRimWorld/releases/latest</downloadUrl>
    </li>
</modDependencies>
```

---

## Best Practices

### Naming Conventions

1. **Package IDs**: `Author.ModName` (no spaces)
2. **DefNames**: `YourMod_DescriptiveName` (use prefix to avoid conflicts)
3. **Files**: `PascalCase.xml` or `snake_case.xml`
4. **Classes**: `PascalCase`

### Performance

1. **Minimize patches**: Each Harmony patch has overhead
2. **Use caching**: Cache expensive lookups
3. **Avoid Tick() abuse**: Only tick when necessary
4. **Optimize textures**: Use appropriate sizes, atlases for many small textures

### Compatibility

1. **Use XPath carefully**: Make patches specific to avoid breaking other mods
2. **Check for conflicts**: Test with popular mods
3. **Provide compatibility patches**: For known conflicts
4. **Document incompatibilities**: In About.xml

### Debugging

1. **Enable Dev Mode**: In RimWorld options
2. **Use Log.Message()**: For debugging output
3. **Check error log**: Development > Debug actions log
4. **Use Ctrl+F12**: Generate share logs for bug reports

### Documentation

1. **README.md**: Installation, features, compatibility
2. **CHANGELOG.md**: Version history
3. **Code comments**: Explain complex logic
4. **Steam description**: Clear feature list

### Publishing

1. **Steam Workshop**:
   - Use in-game mod manager
   - Upload from RimWorld directly
   - Update via same interface

2. **GitHub**:
   - Version control
   - Issue tracking
   - Community contributions

---

## Resources

### Official Documentation
- [RimWorld Wiki - Modding](https://rimworldwiki.com/wiki/Modding_Tutorials)
- [Ludeon Forums - Modding](https://ludeon.com/forums/index.php?board=14.0)

### Tools
- **Visual Studio** or **Rider**: C# development
- **dnSpy**: Decompile RimWorld code
- **Harmony**: Patching library

### Community
- [RimWorld Discord](https://discord.gg/rimworld)
- [r/RimWorldMods](https://reddit.com/r/RimWorldMods)
- Ludeon Forums

---

## Conclusion

RimWorld modding follows well-established patterns that make it accessible to both XML modders and programmers. Start with simple XML mods to learn the basics, then progress to C# when you need more complex functionality.

The key to successful modding is:
1. Understanding the existing game systems
2. Following established conventions
3. Testing thoroughly with other mods
4. Documenting your work
5. Engaging with the modding community

Happy modding!
