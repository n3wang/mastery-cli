# RimWorld Modding Flashcards - Basic Structure

---

#### Mod Folder Structure - Essential Files
Every RimWorld mod requires a specific directory structure. The bare minimum is a mod folder with an About subfolder containing About.xml. Optional folders include Defs/ for XML definitions, Assemblies/ for compiled code, Textures/ for graphics, and Patches/ for modifications to existing content.

**Standard structure:**
```
MyMod/
├── About/
│   └── About.xml      [Required]
├── Defs/              [Optional - XML content]
├── Assemblies/        [Optional - C# DLLs]
├── Patches/           [Optional - XML patches]
└── Textures/          [Optional - PNG images]
```
:p What is the minimum folder structure required for a RimWorld mod, and what are the main optional folders?
??x
**Minimum Required:**
- ModFolder/
  - About/
    - About.xml (metadata file)

**Common Optional Folders:**
- Defs/ - XML game content definitions
- Assemblies/ - Compiled C# code (.dll files)
- Patches/ - XML patches to modify existing content
- Textures/ - Image files for graphics
- Languages/ - Translation files
- Source/ - C# source code (not loaded, for reference)
x??

---

#### About.xml - Package ID Format
The packageId in About.xml is the unique identifier for your mod in the RimWorld ecosystem. It must follow the format Author.ModName with no spaces. This ID is used for dependency tracking, load order, and identifying your mod across all installations. Once published, changing the packageId creates a completely new mod from RimWorld's perspective.

**Example:**
```xml
<ModMetaData>
    <name>My Amazing Mod</name>
    <packageId>JohnDoe.MyAmazingMod</packageId>
    <author>John Doe</author>
</ModMetaData>
```

**Anti-pattern (wrong):**
```xml
<packageId>My Amazing Mod</packageId>  <!-- Has spaces! -->
<packageId>mymod</packageId>           <!-- No author prefix! -->
```
:p What is the correct format for a RimWorld mod's packageId, and why is it important?
??x
**Format:** `Author.ModName` (no spaces)

**Example:** `JohnDoe.MyAmazingMod`

**Why it's important:**
- Serves as unique identifier across all RimWorld installations
- Used for dependency tracking between mods
- Determines load order resolution
- Cannot be changed after publishing without creating a "new" mod
- Used in patches and mod detection

**Common mistakes:**
- Including spaces: "John Doe.My Mod" ❌
- No author prefix: "MyMod" ❌
- Using special characters: "John@Doe.Mod!" ❌
x??

---

#### About.xml - Supported Versions Declaration
The supportedVersions element tells RimWorld which game versions your mod is compatible with. Each version is listed as a separate <li> tag. RimWorld will only show your mod as compatible if the current game version matches one in your list. Most mods support multiple versions (1.4, 1.5, 1.6) through version-specific folders managed by LoadFolders.xml.

**Example:**
```xml
<supportedVersions>
    <li>1.5</li>
    <li>1.6</li>
</supportedVersions>
```

**Behavior:**
- If playing RimWorld 1.5 → mod shows as compatible ✓
- If playing RimWorld 1.4 → mod shows incompatible warning ⚠
:p How do you declare which RimWorld versions your mod supports in About.xml?
??x
Use the `<supportedVersions>` element with individual `<li>` tags:

```xml
<supportedVersions>
    <li>1.4</li>
    <li>1.5</li>
    <li>1.6</li>
</supportedVersions>
```

**Effect:**
- RimWorld checks current version against this list
- Mod marked incompatible if version not listed
- Can list multiple versions for broad compatibility

**Best practice:**
- Test each version you list
- Use LoadFolders.xml for version-specific content
- Update this list when adding new version support
x??

---

#### About.xml - Declaring Dependencies
Dependencies are other mods that must be loaded for your mod to function. Declared in the modDependencies element, each dependency includes packageId, displayName, and download URLs. RimWorld will show a warning if required mods are missing and can attempt to download them from the provided URLs. This is critical for mods using frameworks like Harmony or Vanilla Expanded Framework.

**Example:**
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

**What happens:** If Harmony is missing, RimWorld shows error with download links.
:p How do you declare that your mod requires another mod (dependency) in About.xml?
??x
Use the `<modDependencies>` element with structured dependency information:

```xml
<modDependencies>
    <li>
        <packageId>brrainz.harmony</packageId>
        <displayName>Harmony</displayName>
        <steamWorkshopUrl>steam://url/CommunityFilePage/2009463077</steamWorkshopUrl>
        <downloadUrl>https://github.com/.../releases/latest</downloadUrl>
    </li>
</modDependencies>
```

**Fields explained:**
- `packageId` - Unique ID of required mod
- `displayName` - Human-readable name shown in error messages
- `steamWorkshopUrl` - Steam Workshop link for easy installation
- `downloadUrl` - Alternative download source

**Effect:** RimWorld will warn user if dependency is missing and provide download links.
x??

---


#### Load Order - loadAfter vs loadBefore
Load order determines when your mod's definitions are processed relative to other mods. loadAfter means "load my mod after these mods" (most common), ensuring their content exists before yours references it. loadBefore means "load my mod before these" (rare), used by framework mods. Harmony should almost always be in loadAfter since it provides functionality you depend on.

**Example:**
```xml
<loadAfter>
    <li>Ludeon.RimWorld</li>          <!-- Base game -->
    <li>brrainz.harmony</li>           <!-- Harmony framework -->
    <li>UnlimitedHugs.HugsLib</li>     <!-- HugsLib library -->
</loadAfter>

<loadBefore>
    <li>Ludeon.RimWorld</li>           <!-- Only for frameworks! -->
</loadBefore>
```

**Logic:**
- Content mods use loadAfter (load after dependencies)
- Framework mods use loadBefore (load before everyone else)
:p What is the difference between loadAfter and loadBefore in RimWorld mod load order?
??x
**loadAfter**: "Load my mod AFTER these mods"
- Most common usage
- Used by content mods
- Ensures dependencies load first
- Example: Your mod needs Harmony to work

```xml
<loadAfter>
    <li>brrainz.harmony</li>  <!-- Harmony loads first, then your mod -->
</loadAfter>
```

**loadBefore**: "Load my mod BEFORE these mods"
- Rare usage
- Used by framework/library mods
- Example: Harmony loads before base game

```xml
<loadBefore>
    <li>Ludeon.RimWorld</li>  <!-- Your framework, then RimWorld -->
</loadBefore>
```

**Common pattern:**
Most mods only use loadAfter with Ludeon.RimWorld and their dependencies.
x??

---

#### DefNames - Naming Convention and Uniqueness
A defName is the unique identifier for any game object defined in XML (items, buildings, research, etc.). Following the convention ModPrefix_DescriptiveName prevents conflicts with other mods. DefNames are case-sensitive and must be unique across all loaded mods. When referencing vanilla content, use exact vanilla defNames (like "Steel", "Bed", "Smithing").

**Good examples:**
```xml
<ThingDef>
    <defName>MyMod_GoldenSword</defName>      <!-- Has mod prefix -->
</ThingDef>

<ResearchProjectDef>
    <defName>MyMod_AdvancedWeaponry</defName>  <!-- Unique, descriptive -->
</ResearchProjectDef>
```

**Bad examples:**
```xml
<defName>GoldenSword</defName>        <!-- No prefix, might conflict! -->
<defName>My Mod Golden Sword</defName> <!-- Spaces not allowed! -->
<defName>Item1</defName>               <!-- Not descriptive -->
```
:p What is a defName in RimWorld modding, and what is the naming convention to avoid conflicts?
??x
**Definition:**
A defName is the unique identifier for any XML-defined game object (items, buildings, research, recipes, etc.)

**Convention:** `ModPrefix_DescriptiveName`

**Examples:**
```xml
<defName>MyMod_GoldenCoin</defName>
<defName>MyMod_ResearchAdvancedCrafting</defName>
<defName>MyMod_WorkbenchSpecial</defName>
```

**Rules:**
- Must be unique across ALL mods
- Case-sensitive
- No spaces allowed
- Use mod prefix to prevent conflicts
- Be descriptive for maintainability

**Vanilla references:**
When referencing vanilla content, use exact names:
- "Steel", "Gold", "WoodLog" (materials)
- "Bed", "Campfire" (buildings)
- "Smithing", "Electricity" (research)
x??

---

#### Version Management - LoadFolders.xml Purpose
LoadFolders.xml allows a single mod to support multiple RimWorld versions by routing to version-specific folders. Each game version (v1.4, v1.5, v1.6) can have its own Defs/, Assemblies/, or Patches/ folders. The root folder (/) is loaded for all versions, plus the version-specific folder. This is critical because game updates often change internal class names and assembly structures.

**File structure:**
```
MyMod/
├── About/About.xml
├── LoadFolders.xml
├── Defs/                 [Shared across versions]
├── 1.5/
│   ├── Assemblies/      [Only for v1.5]
│   └── Patches/
└── 1.6/
    ├── Assemblies/      [Only for v1.6]
    └── Patches/
```

**LoadFolders.xml:**
```xml
<loadFolders>
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
:p What is LoadFolders.xml and how does it enable multi-version mod support?
??x
**Purpose:** Routes RimWorld to load version-specific content based on game version

**How it works:**
```xml
<loadFolders>
    <v1.5>
        <li>1.5</li>      <!-- Load 1.5/ folder -->
        <li>/</li>        <!-- Plus root folder -->
    </v1.5>
    <v1.6>
        <li>1.6</li>      <!-- Load 1.6/ folder -->
        <li>/</li>        <!-- Plus root folder -->
    </v1.6>
</loadFolders>
```

**Effect when running RimWorld 1.5:**
1. Loads content from `/` (root)
2. Loads content from `/1.5/`
3. Ignores `/1.6/`

**Common pattern:**
- Shared Defs/ in root
- Version-specific Assemblies/ in version folders
- Version-specific Patches/ for API changes

**Why needed:**
- C# DLLs compiled for different RimWorld versions
- API changes between versions
- Different class/method names across versions
x??

---

#### Mod Types - Content vs Assembly Mods
RimWorld mods fall into two main categories based on complexity. Content mods (XML-only) use pure XML definitions in Defs/ folder to add items, buildings, research, and recipes. They're easy to create and maintain but limited to what XML exposes. Assembly mods include compiled C# code (DLLs) in Assemblies/ folder, enabling complex behavior changes, custom UI, and game mechanic modifications through Harmony patching. About 38% of analyzed mods use assemblies.

**Content Mod (XML-only):**
```
SimpleMod/
├── About/About.xml
├── Defs/
│   ├── ThingDefs_Items.xml      [New items]
│   └── RecipeDefs.xml           [Crafting recipes]
└── Textures/
```
**Can do:** Add items, buildings, research, recipes, factions
**Cannot do:** Modify game logic, add UI, complex behavior

**Assembly Mod (C# + XML):**
```
ComplexMod/
├── About/About.xml
├── Defs/
├── Assemblies/
│   ├── 0Harmony.dll
│   └── ComplexMod.dll           [Custom code]
└── Source/                      [C# source]
```
**Can do:** Everything content mods can + modify any game behavior
:p What is the difference between a Content mod and an Assembly mod in RimWorld?
??x
**Content Mod (XML-only):**
- Structure: About/, Defs/, Textures/, Languages/
- No Assemblies/ folder
- No programming required
- Examples: Misc. Training, Fire Extinguisher (original)

**Capabilities:**
- ✓ Add items, buildings, weapons, apparel
- ✓ Add research projects and recipes
- ✓ Add factions, animals, plants
- ✗ Modify game logic/behavior
- ✗ Add custom UI elements
- ✗ Complex interactions

**Assembly Mod (C# + XML):**
- Structure: About/, Defs/, Assemblies/, Source/
- Contains .dll files (compiled C# code)
- Requires programming knowledge
- Examples: Hospitality, Simple Sidearms, Pick Up And Haul

**Capabilities:**
- ✓ Everything content mods can do
- ✓ Modify game behavior with Harmony patches
- ✓ Add custom UI and windows
- ✓ Save custom data
- ✓ Complex algorithms and systems

**Statistics from analysis:** 38% use assemblies, 62% are XML-only
x??

---

#### Framework Mods - Purpose and Load Order
Framework mods like Harmony, HugsLib, and Vanilla Expanded Framework provide shared functionality to other mods. They contain minimal content themselves but export utilities, libraries, and systems that dependent mods use. Frameworks use loadBefore to ensure they initialize before base game and other mods. About 85% of C# mods depend on Harmony. This pattern prevents code duplication and provides standardized solutions.

**Example Framework Dependencies:**
```
Harmony (brrainz.harmony)
├── Used by 85% of C# mods
└── Provides: Runtime patching, mod compatibility

HugsLib (UnlimitedHugs.HugsLib)
├── Used by 8% of mods
└── Provides: Settings system, logging, utilities

Vanilla Expanded Framework
├── Used by all VE series mods
└── Provides: Custom base generation, faction systems
```

**Load order:**
```
1. Harmony          [Framework - loads first]
2. HugsLib          [Library - loads second]
3. Base Game        [RimWorld core]
4. Content Mods     [Your mod - loads last]
```
:p What are framework mods in RimWorld, and why do they load before other mods?
??x
**Definition:**
Framework mods provide shared functionality/libraries to other mods. They have minimal content themselves but export utilities and systems.

**Examples:**
- Harmony - Runtime patching (85% of C# mods use this)
- HugsLib - Settings UI, logging, utilities
- Vanilla Expanded Framework - Shared VE series functionality

**Load order:**
```xml
<loadBefore>
    <li>Ludeon.RimWorld</li>  <!-- Load before base game -->
</loadBefore>
```

**Why load first:**
- Other mods need their functionality to initialize
- Must be ready before dependent mods load
- Prevents initialization order issues

**Usage pattern:**
```xml
<!-- In a content mod's About.xml -->
<modDependencies>
    <li>
        <packageId>brrainz.harmony</packageId>
    </li>
</modDependencies>
<loadAfter>
    <li>brrainz.harmony</li>
</loadAfter>
```

**Purpose:** Avoid code duplication, provide standardized solutions
x??

---

#### Texture Paths - Referencing Graphics
RimWorld looks for textures in the Textures/ folder of your mod. The texPath in XML is relative to Textures/ and omits the file extension (.png). Textures must be PNG format. The path structure typically mirrors content types: Things/Building/, Things/Item/, UI/, etc. If texture is missing, RimWorld shows a pink error texture but doesn't crash.

**File structure:**
```
MyMod/
└── Textures/
    ├── Things/
    │   ├── Building/
    │   │   └── MyWorkbench.png
    │   └── Item/
    │       └── MyItem.png
    └── UI/
        └── MyIcon.png
```

**XML reference:**
```xml
<ThingDef>
    <defName>MyMod_Workbench</defName>
    <graphicData>
        <texPath>Things/Building/MyWorkbench</texPath>
        <!-- Actual file: Textures/Things/Building/MyWorkbench.png -->
        <!-- NO .png extension in texPath! -->
    </graphicData>
</ThingDef>
```

**Common mistake:**
```xml
<texPath>Textures/Things/Building/MyWorkbench.png</texPath> ❌
<!-- Don't include "Textures/" or ".png" -->
```
:p How do you reference texture files in RimWorld mod XML definitions?
??x
**Rule:** Use `<texPath>` relative to Textures/ folder, WITHOUT file extension

**File location:**
```
MyMod/Textures/Things/Item/GoldenCoin.png
```

**XML reference:**
```xml
<graphicData>
    <texPath>Things/Item/GoldenCoin</texPath>
    <!-- Note: No "Textures/", no ".png" -->
    <graphicClass>Graphic_Single</graphicClass>
</graphicData>
```

**Common patterns:**
- Buildings: `Things/Building/MyBuilding`
- Items: `Things/Item/MyItem`
- Pawns: `Things/Pawn/MyPawn`
- UI: `UI/MyIcon`

**What happens:**
- RimWorld automatically looks in Textures/ folder
- Automatically adds .png extension
- If missing: Shows pink error texture (doesn't crash)

**Use vanilla textures:**
```xml
<texPath>Things/Item/Resource/Gold</texPath>
<!-- References vanilla game texture -->
```
x??

---

#### Mod Categories - designationCategory
The designationCategory determines which architect menu tab your building appears in when players try to construct it. Common vanilla categories include Production, Furniture, Power, Security, Misc, Recreation, and Temperature. If you omit designationCategory, players cannot build your structure through the normal UI. This is intentional for some items that should only appear through events or spawning.

**Example:**
```xml
<ThingDef ParentName="BuildingBase">
    <defName>MyMod_SpecialWorkbench</defName>
    <label>special workbench</label>
    <!-- Other fields... -->
    <designationCategory>Production</designationCategory>
    <!-- Players find this in Architect > Production tab -->
</ThingDef>
```

**Vanilla categories:**
- Production - Crafting benches
- Furniture - Beds, tables, chairs
- Power - Generators, batteries, conduits
- Security - Walls, doors, traps, turrets
- Misc - Storage, graves, misc structures
- Recreation - Joy buildings
- Temperature - Heaters, coolers
- (More in DLCs)
:p What is designationCategory in RimWorld building definitions, and what does it control?
??x
**Purpose:** Determines which Architect menu tab shows your building

**Usage:**
```xml
<ThingDef ParentName="BuildingBase">
    <defName>MyMod_Workbench</defName>
    <designationCategory>Production</designationCategory>
</ThingDef>
```

**Effect:** Building appears in Architect > Production tab

**Common vanilla categories:**
- `Production` - Crafting benches, workstations
- `Furniture` - Beds, tables, chairs, decorations
- `Power` - Generators, batteries, conduits
- `Security` - Walls, doors, traps, turrets
- `Misc` - Storage, graves, various structures
- `Recreation` - Joy/recreation buildings
- `Temperature` - Heaters, coolers

**If omitted:**
- Building cannot be constructed through normal UI
- Only spawnable via dev mode or events
- Intentional for quest rewards or special items

**Custom categories:**
Some mods create custom categories, but vanilla is recommended for compatibility.
x??
