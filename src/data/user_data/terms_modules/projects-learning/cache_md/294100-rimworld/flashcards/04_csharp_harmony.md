# RimWorld Modding Flashcards - C# and Harmony

---

#### Harmony Library - Purpose and Usage
Harmony is a library for runtime method patching in .NET applications. Created by Andreas Pardeike specifically for modding. It allows mods to modify game behavior without changing original files. 85% of C# RimWorld mods use Harmony. Three patch types: Prefix (before method), Postfix (after method), Transpiler (modify IL code). Essential for behavioral changes XML cannot accomplish.

**Why Harmony:**
```csharp
// Without Harmony: Can't modify game methods
// RimWorld's code is compiled, sealed

// With Harmony: Inject code into existing methods
[HarmonyPatch(typeof(Pawn), nameof(Pawn.Kill))]
public static class Pawn_Kill_Patch
{
    [HarmonyPrefix]
    public static bool Prefix(Pawn __instance)
    {
        Log.Message($"{__instance.Name} is being killed!");
        return true;  // Allow original method to run
    }
}
```

**Logic flow:**
1. Game calls Pawn.Kill()
2. Harmony intercepts → Runs Prefix first
3. Prefix logs message
4. Returns true → Original Pawn.Kill() executes
5. Method completes

**Statistics:** 85% of assembly mods depend on Harmony
:p What is Harmony and why is it essential for RimWorld modding?
??x
**Definition:** Harmony is a library for runtime method patching (modifying game code at runtime)

**Created by:** Andreas Pardeike

**Purpose:**
- Modify game behavior without changing original files
- Inject custom code into existing methods
- Enable behavioral changes XML cannot accomplish

**Why needed:**
- RimWorld code is compiled (can't edit directly)
- Many game systems not exposed to XML
- Multiple mods can patch same method without conflicts

**Patch types:**
1. **Prefix** - Runs before original method
2. **Postfix** - Runs after original method
3. **Transpiler** - Modifies IL instructions (advanced)

**Usage example:**
```csharp
[HarmonyPatch(typeof(Thing), nameof(Thing.SpawnSetup))]
public static class Thing_SpawnSetup_Patch
{
    [HarmonyPostfix]
    public static void Postfix(Thing __instance)
    {
        Log.Message($"{__instance.Label} spawned!");
    }
}
```

**Statistics:** 85% of C# RimWorld mods use Harmony

**Package ID:** `brrainz.harmony`
x??

---

#### Harmony Patch - Attribute-Based Declaration
Harmony uses C# attributes to declare patches. [HarmonyPatch] specifies target class and method. Attributes go on static patch classes. Common pattern: ClassName_MethodName_Patch for organization. The patch method must be static. Harmony finds and applies patches automatically at startup.

**Basic structure:**
```csharp
using HarmonyLib;
using Verse;

namespace MyMod
{
    [HarmonyPatch(typeof(TargetClass))]      // Which class to patch
    [HarmonyPatch(nameof(TargetClass.MethodName))]  // Which method
    public static class TargetClass_MethodName_Patch
    {
        [HarmonyPrefix]  // or [HarmonyPostfix]
        public static bool Prefix()
        {
            // Your code here
            return true;
        }
    }
}
```

**Real example:**
```csharp
[HarmonyPatch(typeof(Pawn))]
[HarmonyPatch(nameof(Pawn.Kill))]
public static class Pawn_Kill_Patch
{
    [HarmonyPrefix]
    public static void Prefix(Pawn __instance, DamageInfo? dinfo)
    {
        Log.Message($"Pawn {__instance.Name} killed by {dinfo?.Instigator}");
    }
}
```

**Naming convention:**
- Pattern: `OriginalClass_MethodName_Patch`
- Example: `Pawn_Kill_Patch`, `Thing_SpawnSetup_Patch`
- Helps organization in large mods
:p How do you declare a Harmony patch using C# attributes?
??x
**Structure:** Use `[HarmonyPatch]` attributes on static class

```csharp
using HarmonyLib;
using Verse;

namespace MyMod
{
    [HarmonyPatch(typeof(Pawn))]           // Target class
    [HarmonyPatch(nameof(Pawn.Kill))]      // Target method
    public static class Pawn_Kill_Patch    // Patch class name
    {
        [HarmonyPrefix]
        public static bool Prefix(Pawn __instance)
        {
            // Code runs before Pawn.Kill()
            return true;  // true = run original, false = skip original
        }
    }
}
```

**Attributes explained:**
- `[HarmonyPatch(typeof(ClassName))]` - Which class
- `[HarmonyPatch(nameof(ClassName.Method))]` - Which method
- `[HarmonyPrefix]` or `[HarmonyPostfix]` - When to run

**Naming convention:**
```csharp
public static class OriginalClass_MethodName_Patch
```
Examples:
- `Thing_SpawnSetup_Patch`
- `Pawn_HealthTracker_AddHediff_Patch`

**Requirements:**
- Class must be static
- Patch methods must be static
- Must use correct parameter signatures

**Harmony finds these automatically at mod load**
x??

---

#### Harmony Prefix - Return Type Semantics
Prefix patches run before the original method. Return type determines behavior: bool controls whether original runs (true = run, false = skip), void always runs original. Use __instance to access the instance being patched. Use exact parameter names from original method signature or special names (__instance, __result, etc.).

**Boolean return (can skip original):**
```csharp
[HarmonyPatch(typeof(Pawn), nameof(Pawn.Kill))]
public static class Pawn_Kill_Patch
{
    [HarmonyPrefix]
    public static bool Prefix(Pawn __instance, DamageInfo? dinfo)
    {
        // __instance is the pawn being killed

        if (__instance.Name.ToString() == "ImportantColonist")
        {
            Log.Message("Can't kill important colonist!");
            return false;  // SKIP original method - pawn doesn't die!
        }

        return true;  // Run original method normally - pawn dies
    }
}
```

**Void return (always runs original):**
```csharp
[HarmonyPrefix]
public static void Prefix(Pawn __instance)
{
    Log.Message($"About to kill {__instance.Name}");
    // Original always runs after this
}
```

**Logic:**
- Return false → Original method skipped (powerful!)
- Return true → Original method runs normally
- Void return → Original always runs
:p What is the significance of return type in Harmony Prefix patches?
??x
**Return types:**

**1. bool return - Can skip original method**
```csharp
[HarmonyPrefix]
public static bool Prefix(Pawn __instance)
{
    if (someCondition)
    {
        return false;  // SKIP original method
    }
    return true;  // RUN original method
}
```

**2. void return - Always runs original**
```csharp
[HarmonyPrefix]
public static void Prefix(Pawn __instance)
{
    // Do something
    // Original ALWAYS runs after
}
```

**Use cases:**

**Boolean - Conditional execution:**
```csharp
[HarmonyPrefix]
public static bool Prefix(Pawn pawn)
{
    if (pawn.health.Dead)
        return false;  // Skip method if already dead

    return true;
}
```

**Void - Just add logic:**
```csharp
[HarmonyPrefix]
public static void Prefix(Thing thing)
{
    Log.Message($"Thing spawning: {thing.Label}");
    // Just logging, don't skip original
}
```

**Important:**
- false = Powerful! Completely prevents original execution
- true = Safe, just adds code before original
- void = Simplest, always safe
x??

---

#### Harmony Special Parameters - __instance and __result
Harmony provides special parameter names for accessing patch context. __instance accesses the instance being patched (this in non-static methods). __result accesses the return value (Postfix can modify it). ___paramName (triple underscore) accesses private fields. Use exact names from original signature for regular parameters.

**__instance (access object being patched):**
```csharp
[HarmonyPatch(typeof(Pawn), nameof(Pawn.Kill))]
public static class Pawn_Kill_Patch
{
    [HarmonyPrefix]
    public static void Prefix(Pawn __instance)
    {
        // __instance is the Pawn object whose Kill() method was called
        Log.Message($"Killing {__instance.Name}");
        Log.Message($"  Faction: {__instance.Faction?.Name}");
        Log.Message($"  Health: {__instance.health.summaryHealth.SummaryHealthPercent}");
    }
}
```

**__result (modify return value in Postfix):**
```csharp
[HarmonyPatch(typeof(Thing), nameof(Thing.MarketValue), MethodType.Getter)]
public static class Thing_MarketValue_Patch
{
    [HarmonyPostfix]
    public static void Postfix(Thing __instance, ref float __result)
    {
        // __result contains the return value from MarketValue getter
        if (__instance.def.defName == "Gold")
        {
            __result *= 2;  // Double gold value!
        }
    }
}
```

**Regular parameters (match original signature):**
```csharp
// Original: public void Kill(DamageInfo? dinfo, Hediff exactCulprit = null)

[HarmonyPrefix]
public static void Prefix(Pawn __instance, DamageInfo? dinfo, Hediff exactCulprit)
{
    // dinfo and exactCulprit match original parameters
}
```
:p What are Harmony's special parameter names and how do you use them?
??x
**Special parameters provided by Harmony:**

**1. `__instance` - The object being patched**
```csharp
[HarmonyPrefix]
public static void Prefix(Pawn __instance)
{
    // __instance is the Pawn object
    Log.Message(__instance.Name.ToString());
}
```

**2. `__result` - The return value (Postfix only)**
```csharp
[HarmonyPostfix]
public static void Postfix(Thing __instance, ref float __result)
{
    // __result is the return value
    // ref allows modifying it
    __result *= 1.5f;  // Increase by 50%
}
```

**3. `___fieldName` - Private field access (triple underscore)**
```csharp
[HarmonyPrefix]
public static void Prefix(Pawn __instance, ref int ___ticksUntilDue)
{
    // Access private field "ticksUntilDue"
    ___ticksUntilDue = 100;
}
```

**Regular parameters (match original method):**
```csharp
// Original method: void Kill(DamageInfo? dinfo)

[HarmonyPrefix]
public static void Prefix(Pawn __instance, DamageInfo? dinfo)
{
    // __instance = special (the pawn)
    // dinfo = regular parameter from original
}
```

**Important:**
- Use `ref` for `__result` to modify it
- `__instance` is null for static methods
- Regular parameter names must match original exactly
x??

---

#### Harmony Postfix - Accessing Return Values
Postfix patches run after the original method completes. Access return value via __result parameter (must use ref to modify). Cannot prevent method execution (already ran). Perfect for reacting to method results, modifying outputs, or logging completed actions. Always runs unless original throws exception.

**Read return value:**
```csharp
[HarmonyPatch(typeof(Pawn_HealthTracker), nameof(Pawn_HealthTracker.HasHediff))]
public static class HealthTracker_HasHediff_Patch
{
    [HarmonyPostfix]
    public static void Postfix(Pawn_HealthTracker __instance, HediffDef def, bool __result)
    {
        // __result is the return value (bool in this case)
        if (__result)
        {
            Log.Message($"{__instance.pawn.Name} has hediff {def.label}");
        }
    }
}
```

**Modify return value:**
```csharp
[HarmonyPatch(typeof(Thing), "MarketValue", MethodType.Getter)]
public static class Thing_MarketValue_Patch
{
    [HarmonyPostfix]
    public static void Postfix(Thing __instance, ref float __result)
    {
        // ref allows modifying __result
        if (__instance.def.defName.Contains("Gold"))
        {
            __result *= 2.0f;  // Double value of gold items!
        }
    }
}
```

**Logic flow:**
1. Original method executes completely
2. Postfix runs with __result set to return value
3. If using ref, modifications affect final return value
:p How do Harmony Postfix patches work and how do you access/modify return values?
??x
**Postfix runs AFTER original method completes**

**Access return value (read-only):**
```csharp
[HarmonyPostfix]
public static void Postfix(Pawn __instance, bool __result)
{
    // __result contains the return value
    if (__result == true)
    {
        Log.Message("Method returned true");
    }
}
```

**Modify return value:**
```csharp
[HarmonyPostfix]
public static void Postfix(Thing __instance, ref float __result)
{
    // MUST use 'ref' to modify
    __result = __result * 1.5f;  // Increase by 50%
}
```

**Complete example:**
```csharp
// Original: public float GetStatValue(StatDef stat)

[HarmonyPatch(typeof(Thing), nameof(Thing.GetStatValue))]
public static class Thing_GetStatValue_Patch
{
    [HarmonyPostfix]
    public static void Postfix(Thing __instance, StatDef stat, ref float __result)
    {
        if (stat == StatDefOf.MarketValue && __instance.Stuff == ThingDefOf.Gold)
        {
            __result *= 2;  // Gold items worth double
        }
    }
}
```

**Key points:**
- Postfix always runs (can't skip like Prefix)
- Use `ref` keyword to modify return value
- Good for: Modifying outputs, logging results, post-processing
- Cannot prevent method execution (already happened)
x??

---

#### Static Constructor for Mod Init
[StaticConstructorOnStartup] attribute makes static constructor run when RimWorld loads the mod. Perfect place to initialize Harmony patches. Pattern: Create static class with static constructor, create Harmony instance, call PatchAll(). Runs once at game startup before main menu.

**Standard pattern:**
```csharp
using HarmonyLib;
using Verse;

namespace MyMod
{
    [StaticConstructorOnStartup]
    public static class MyModInit
    {
        static MyModInit()
        {
            // This runs when mod loads

            // Create Harmony instance with unique ID
            var harmony = new Harmony("yourname.mymod");

            // Apply all patches in this assembly
            harmony.PatchAll();

            Log.Message("My Mod loaded and patched successfully!");
        }
    }
}
```

**What happens:**
1. RimWorld starts loading mods
2. Finds MyMod.dll in Assemblies/
3. Sees [StaticConstructorOnStartup] attribute
4. Executes static constructor
5. Constructor creates Harmony instance
6. PatchAll() finds all [HarmonyPatch] classes and applies them
7. Mod ready, patches active

**Alternative without attribute:**
Some mods use ModInit class inheriting from Mod, but [StaticConstructorOnStartup] is simpler for pure patching mods
:p How do you initialize Harmony patches when your mod loads?
??x
**Use static constructor with [StaticConstructorOnStartup]:**

```csharp
using HarmonyLib;
using Verse;

namespace MyMod
{
    [StaticConstructorOnStartup]
    public static class MyModInit
    {
        static MyModInit()  // Static constructor
        {
            // Create Harmony instance
            var harmony = new Harmony("author.modname");

            // Find and apply all patches in assembly
            harmony.PatchAll();

            Log.Message("MyMod: Patches applied!");
        }
    }
}
```

**What happens:**
1. RimWorld loads your mod's DLL
2. Finds [StaticConstructorOnStartup] attribute
3. Executes static constructor automatically
4. Harmony instance created
5. PatchAll() discovers all [HarmonyPatch] classes
6. Patches applied to game methods

**Harmony ID:**
```csharp
var harmony = new Harmony("yourname.modname");
```
- Must be unique across all mods
- Convention: lowercase, dotted format
- Examples: "haplo.misctraining", "unlimitedhugs.defensivepositions"

**This runs ONCE at game startup before main menu appears**

**Alternative:** Some mods use Mod class, but [StaticConstructorOnStartup] is simpler
x??

---

#### DefModExtension - Adding Custom Data to Defs
DefModExtension allows adding custom C# classes to XML definitions. Create class inheriting DefModExtension, add fields, reference in XML via modExtensions. Access in code via def.GetModExtension<T>(). Enables storing mod-specific data without modifying vanilla def structure. Common pattern in complex mods.

**C# class definition:**
```csharp
using Verse;

namespace MyMod
{
    public class CustomBuildingExtension : DefModExtension
    {
        public int specialValue = 0;
        public float multiplier = 1.0f;
        public string customMessage = "";
        public List<string> allowedItems = new List<string>();
    }
}
```

**XML usage:**
```xml
<ThingDef ParentName="BuildingBase">
    <defName>MyMod_SpecialWorkbench</defName>
    <label>special workbench</label>

    <!-- Add custom extension data -->
    <modExtensions>
        <li Class="MyMod.CustomBuildingExtension">
            <specialValue>42</specialValue>
            <multiplier>1.5</multiplier>
            <customMessage>This is special!</customMessage>
            <allowedItems>
                <li>Steel</li>
                <li>Gold</li>
            </allowedItems>
        </li>
    </modExtensions>
</ThingDef>
```

**Access in C# code:**
```csharp
var extension = building.def.GetModExtension<CustomBuildingExtension>();
if (extension != null)
{
    int value = extension.specialValue;  // 42
    float mult = extension.multiplier;   // 1.5
    Log.Message(extension.customMessage); // "This is special!"
}
```
:p What is DefModExtension and how do you use it to add custom data to XML definitions?
??x
**Purpose:** Add custom C# data to XML definitions without modifying vanilla structure

**Step 1: Create C# class**
```csharp
using Verse;

public class MyThingExtension : DefModExtension
{
    public int customValue = 0;
    public float multiplier = 1.0f;
    public List<string> tags = new List<string>();
}
```

**Step 2: Add to XML**
```xml
<ThingDef>
    <defName>MyMod_Item</defName>

    <modExtensions>
        <li Class="MyMod.MyThingExtension">
            <customValue>100</customValue>
            <multiplier>2.5</multiplier>
            <tags>
                <li>special</li>
                <li>rare</li>
            </tags>
        </li>
    </modExtensions>
</ThingDef>
```

**Step 3: Access in code**
```csharp
var ext = thing.def.GetModExtension<MyThingExtension>();
if (ext != null)
{
    int val = ext.customValue;      // 100
    float mult = ext.multiplier;    // 2.5
    bool hasTag = ext.tags.Contains("rare");  // true
}
```

**Common uses:**
- Custom building behaviors
- Special item properties
- Mod-specific flags and data
- Complex configuration

**Always check for null - not all defs will have your extension!**
x??

---

#### Accessing RimWorld Classes - Using Directives
RimWorld code organized in namespaces: Verse (core), RimWorld (gameplay), UnityEngine (Unity). Add using directives to access classes. Reference RimWorld DLLs in project. Visual Studio IntelliSense helps discover available classes. Most mod code uses Verse and RimWorld namespaces.

**Common using directives:**
```csharp
using System;                    // C# standard library
using System.Collections.Generic;  // Lists, etc
using System.Linq;               // LINQ queries

using Verse;                     // Core RimWorld (Thing, Pawn, Map, etc)
using RimWorld;                  // Gameplay (Research, Jobs, etc)
using HarmonyLib;                // Harmony patching
using UnityEngine;               // Unity engine (Vector3, etc)
```

**Example class:**
```csharp
using Verse;
using RimWorld;
using HarmonyLib;

namespace MyMod
{
    [HarmonyPatch(typeof(Pawn), nameof(Pawn.Kill))]
    public static class Pawn_Kill_Patch
    {
        [HarmonyPrefix]
        public static void Prefix(Pawn __instance)
        {
            // Pawn is from Verse namespace
            // Can access Pawn properties/methods
        }
    }
}
```

**Finding classes:**
- Use dnSpy to decompile RimWorld DLLs
- RimWorld/RimWorldWin64_Data/Managed/Assembly-CSharp.dll
- IntelliSense in Visual Studio shows available classes
- RimWorld wiki documents many core classes
:p What are the main namespaces in RimWorld and what using directives should you include?
??x
**Main RimWorld namespaces:**

**Essential using directives:**
```csharp
using Verse;        // Core RimWorld classes
using RimWorld;     // Gameplay systems
using HarmonyLib;   // Harmony patching (if using)
```

**Namespace contents:**

**Verse:**
- Core classes: `Thing`, `Pawn`, `Map`, `Def`
- Basic systems: `ThingDef`, `BuildableDef`
- Utilities: `Log`, `GenSpawn`, `GenPlace`

**RimWorld:**
- Gameplay: `JobDef`, `WorkGiver`, `Recipe`
- Systems: `ResearchManager`, `HealthUtility`
- Static defs: `ThingDefOf`, `StatDefOf`

**Common additional:**
```csharp
using System.Collections.Generic;  // List<T>, Dictionary
using System.Linq;                 // LINQ queries
using UnityEngine;                 // Vector3, Color, etc
```

**Complete template:**
```csharp
using System;
using System.Collections.Generic;
using Verse;
using RimWorld;
using HarmonyLib;

namespace MyMod
{
    // Your code here
}
```

**Finding classes:**
- Use dnSpy to decompile Assembly-CSharp.dll
- IntelliSense shows available classes
- RimWorld wiki documents core APIs
x??

---

#### Logging and Debug - Log.Message vs Log.Warning
RimWorld provides Verse.Log for debugging. Log.Message() for general info (dev mode only), Log.Warning() for warnings (always visible), Log.Error() for errors (always visible, red). Logs appear in dev mode output log and in log files. Use Ctrl+F12 to generate shareable logs for bug reports.

**Usage examples:**
```csharp
using Verse;

// General information (only in dev mode)
Log.Message("Mod initialized successfully");
Log.Message($"Found {items.Count} items");

// Warnings (always visible, yellow)
Log.Warning("Could not find expected def: MyMod_Item");
Log.Warning($"Pawn {pawn.Name} has unusual health state");

// Errors (always visible, red)
Log.Error("Critical: Failed to load mod data!");
Log.Error($"Null reference in {def.defName}");

// String interpolation for dynamic messages
int count = GetItemCount();
Log.Message($"Processing {count} items");
```

**When to use each:**
- **Message**: Debug info, successful operations, status updates
- **Warning**: Unexpected but non-critical situations
- **Error**: Serious problems that affect functionality

**Viewing logs:**
- Dev mode → Development → Debug log inspector
- Or Ctrl+F12 to generate/upload log
- Log files in: AppData/LocalLow/Ludeon Studios/RimWorld/Player.log
:p What logging methods are available in RimWorld and when should you use each?
??x
**RimWorld logging via Verse.Log:**

**1. Log.Message() - General info**
```csharp
Log.Message("Mod loaded successfully");
Log.Message($"Found {count} items");
```
- Only visible in dev mode
- For debug/status information
- Doesn't alert users

**2. Log.Warning() - Non-critical issues**
```csharp
Log.Warning("Could not find optional def");
Log.Warning($"Unexpected value: {value}");
```
- Always visible (yellow)
- For unexpected but handleable situations
- Won't crash game

**3. Log.Error() - Critical problems**
```csharp
Log.Error("Failed to initialize system!");
Log.Error($"Null reference in {def.defName}");
```
- Always visible (red)
- For serious issues
- Indicates something broken

**String interpolation:**
```csharp
Log.Message($"Pawn {pawn.Name} at position {pawn.Position}");
```

**Viewing logs:**
- Dev mode → Development → Debug log inspector
- Ctrl+F12 to generate shareable log
- File: `AppData/LocalLow/Ludeon Studios/RimWorld/Player.log`

**Best practice:**
- Message: Routine debug info
- Warning: Problems that don't break functionality
- Error: Critical failures
x??

---

#### Common Patch Pattern - Method Signature Matching
Harmony requires patch methods to have compatible signatures with original. You don't need ALL parameters, only ones you use. Order doesn't matter for special parameters (__instance, __result). Regular parameters must match original names and types exactly. Partial signatures valid - only include what you need.

**Original method:**
```csharp
public class Pawn
{
    public void Kill(DamageInfo? dinfo, Hediff exactCulprit = null)
    {
        // ...
    }
}
```

**Full signature patch:**
```csharp
[HarmonyPrefix]
public static void Prefix(Pawn __instance, DamageInfo? dinfo, Hediff exactCulprit)
{
    // All parameters included
}
```

**Partial signature (only what you need):**
```csharp
[HarmonyPrefix]
public static void Prefix(Pawn __instance)
{
    // Only need the pawn, ignore parameters
}
```

**Using specific parameters:**
```csharp
[HarmonyPrefix]
public static void Prefix(Pawn __instance, DamageInfo? dinfo)
{
    // Need pawn and damage info, ignore exactCulprit
}
```

**Special parameters anywhere:**
```csharp
[HarmonyPrefix]
public static void Prefix(DamageInfo? dinfo, Pawn __instance)
{
    // Order doesn't matter for __instance
}
```

**Key rule:** Parameter names and types must match exactly (except special parameters)
:p How do you match method signatures in Harmony patches?
??x
**Rules for patch method signatures:**

**1. Don't need ALL parameters - only ones you use**
```csharp
// Original: void Kill(DamageInfo? dinfo, Hediff culprit, bool loud)

[HarmonyPrefix]
public static void Prefix(Pawn __instance, DamageInfo? dinfo)
{
    // Only using pawn and dinfo, ignoring culprit and loud
}
```

**2. Special parameters can be anywhere**
```csharp
[HarmonyPostfix]
public static void Postfix(ref int __result, Thing __instance)
{
    // Order doesn't matter for __instance and __result
}
```

**3. Regular parameters must match EXACTLY**
```csharp
// Original: bool TryGetComp(Type type)

[HarmonyPrefix]
public static void Prefix(Type type)  // ✓ Correct name and type
// static void Prefix(Type t)         // ✗ Wrong parameter name
// static void Prefix(string type)    // ✗ Wrong parameter type
```

**4. Minimal signature (common pattern)**
```csharp
[HarmonyPrefix]
public static void Prefix(Pawn __instance)
{
    // Just need the pawn, ignore everything else
}
```

**Best practice:**
- Only include parameters you actually use
- Reduces coupling to original method signature
- Makes patches more maintainable
x??
