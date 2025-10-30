# RimWorld Modding Practice Exercises

These exercises will help you learn RimWorld modding from basics to intermediate level. Each exercise includes step-by-step instructions and builds upon previous knowledge.

## Prerequisites

Before starting these exercises, ensure you have:
- RimWorld installed (Steam version recommended)
- A text editor (VS Code, Notepad++, or any XML editor)
- Basic understanding of XML syntax
- Read the `rimworld_mod_architecture.md` guide

---

## Exercise 1: Create Your First Simple Item Mod

**Difficulty**: Beginner
**Time**: 15-20 minutes
**Concepts**: Basic mod structure, About.xml, ThingDef basics

### Goal
Create a mod that adds a simple craftable item: a "Golden Coin" that can be crafted at a smithy.

### Step-by-Step Instructions

#### Step 1: Create Mod Folder Structure

1. Navigate to your RimWorld Mods folder:
   - **Steam**: `C:\Program Files (x86)\Steam\steamapps\common\RimWorld\Mods\`
   - **Standalone**: `[RimWorld Install]\Mods\`

2. Create a new folder called `MyFirstMod`

3. Inside `MyFirstMod`, create these folders:
   ```
   MyFirstMod/
   ├── About/
   └── Defs/
   ```

#### Step 2: Create About.xml

1. In the `About/` folder, create a file called `About.xml`

2. Add this content:
   ```xml
   <?xml version="1.0" encoding="utf-8"?>
   <ModMetaData>
       <name>My First Mod - Golden Coin</name>
       <author>Your Name</author>
       <packageId>YourName.MyFirstMod</packageId>
       <supportedVersions>
           <li>1.5</li>
           <li>1.6</li>
       </supportedVersions>
       <description>My first RimWorld mod! Adds a golden coin item.</description>
   </ModMetaData>
   ```

3. Replace "Your Name" with your actual name
4. Replace "YourName" in packageId with your username (no spaces)

#### Step 3: Create the Item Definition

1. In the `Defs/` folder, create a new file called `ThingDefs_Items.xml`

2. Add this content:
   ```xml
   <?xml version="1.0" encoding="utf-8"?>
   <Defs>
       <ThingDef ParentName="ResourceBase">
           <defName>MyFirstMod_GoldenCoin</defName>
           <label>golden coin</label>
           <description>A shiny golden coin. Valuable and portable.</description>
           <graphicData>
               <texPath>Things/Item/Resource/Gold</texPath>
               <graphicClass>Graphic_Single</graphicClass>
           </graphicData>
           <soundInteract>Metal_Drop</soundInteract>
           <soundDrop>Metal_Drop</soundDrop>
           <stackLimit>500</stackLimit>
           <statBases>
               <MaxHitPoints>50</MaxHitPoints>
               <MarketValue>15</MarketValue>
               <Mass>0.01</Mass>
               <Flammability>0</Flammability>
           </statBases>
           <thingCategories>
               <li>ResourcesRaw</li>
           </thingCategories>
       </ThingDef>
   </Defs>
   ```

#### Step 4: Create a Recipe to Craft It

1. In the `Defs/` folder, create a new file called `RecipeDefs_Production.xml`

2. Add this content:
   ```xml
   <?xml version="1.0" encoding="utf-8"?>
   <Defs>
       <RecipeDef>
           <defName>MyFirstMod_MakeGoldenCoin</defName>
           <label>make golden coin</label>
           <description>Make a golden coin from gold.</description>
           <jobString>Making golden coin.</jobString>
           <workSpeedStat>GeneralLaborSpeed</workSpeedStat>
           <effectWorking>Smith</effectWorking>
           <soundWorking>Recipe_Smith</soundWorking>
           <workAmount>600</workAmount>
           <unfinishedThingDef>UnfinishedComponent</unfinishedThingDef>
           <ingredients>
               <li>
                   <filter>
                       <thingDefs>
                           <li>Gold</li>
                       </thingDefs>
                   </filter>
                   <count>5</count>
               </li>
           </ingredients>
           <products>
               <MyFirstMod_GoldenCoin>1</MyFirstMod_GoldenCoin>
           </products>
           <skillRequirements>
               <Crafting>3</Crafting>
           </skillRequirements>
           <recipeUsers>
               <li>ElectricSmithy</li>
               <li>FueledSmithy</li>
           </recipeUsers>
       </RecipeDef>
   </Defs>
   ```

#### Step 5: Test Your Mod

1. Launch RimWorld
2. In the main menu, go to **Mods**
3. Find "My First Mod - Golden Coin" in the list
4. Check the checkbox to enable it
5. Click **Restart** (if prompted)
6. Start a new game or load a save
7. Enable **Dev Mode** (Options > Dev mode)
8. Press **F11** or click "Open debug actions menu"
9. Type "resource" and click "Try place item"
10. Find and place "golden coin"
11. Verify you can also craft it at a smithy (if you have colonists with crafting skill)

### Success Criteria
- [ ] Mod appears in mod list
- [ ] No errors in debug log (Ctrl+F12)
- [ ] Golden coin appears in debug spawn menu
- [x] Recipe shows up at smithy workbench
- [x] Can craft golden coin from 5 gold

### What You Learned
- Basic mod folder structure
- How to create About.xml
- How to define items using ThingDef
- How to create crafting recipes using RecipeDef
- How to use the debug menu for testing

---

## Exercise 2: Add a Research Project

**Difficulty**: Beginner
**Time**: 20-25 minutes
**Concepts**: ResearchProjectDef, Research prerequisites, Gating content

### Goal
Expand your mod by adding a research project that must be completed before crafting golden coins.

### Step-by-Step Instructions

#### Step 1: Create Research Definition

1. In your `MyFirstMod/Defs/` folder, create `ResearchProjectDefs.xml`

2. Add this content:
   ```xml
   <?xml version="1.0" encoding="utf-8"?>
   <Defs>
       <ResearchProjectDef>
           <defName>MyFirstMod_CoinMinting</defName>
           <label>coin minting</label>
           <description>Learn the ancient art of minting coins from precious metals.</description>
           <baseCost>800</baseCost>
           <techLevel>Medieval</techLevel>
           <prerequisites>
               <li>Smithing</li>
           </prerequisites>
           <researchViewX>6.00</researchViewX>
           <researchViewY>2.50</researchViewY>
       </ResearchProjectDef>
   </Defs>
   ```

#### Step 2: Link Recipe to Research

1. Open your `RecipeDefs_Production.xml`

2. Add this line inside the `<RecipeDef>` tag (before the closing `</RecipeDef>`):
   ```xml
   <researchPrerequisite>MyFirstMod_CoinMinting</researchPrerequisite>
   ```

   Your recipe should now look like this:
   ```xml
   <RecipeDef>
       <defName>MyFirstMod_MakeGoldenCoin</defName>
       <label>make golden coin</label>
       <!-- ... other fields ... -->
       <recipeUsers>
           <li>ElectricSmithy</li>
           <li>FueledSmithy</li>
       </recipeUsers>
       <researchPrerequisite>MyFirstMod_CoinMinting</researchPrerequisite>
   </RecipeDef>
   ```

#### Step 3: Test the Research

1. Restart RimWorld (to reload mods)
2. Load your test colony or start a new game
3. Open the Research tab
4. Find "coin minting" in the research tree (should be near Smithing)
5. Verify the recipe is NOT available at smithy before research
6. Complete the research (use dev mode to instant-research if needed)
7. Verify the recipe NOW appears at smithy

### Success Criteria
- [x] Research project appears in research tree
- [x] Research is connected to Smithing as prerequisite
- [x] Recipe is locked before research
- [x] Recipe unlocks after completing research

### What You Learned
- How to create research projects
- How to set prerequisites for research
- How to gate recipes behind research
- How research integrates with crafting

---

## Exercise 3: Create a Simple Building

**Difficulty**: Beginner to Intermediate
**Time**: 30-40 minutes
**Concepts**: Building ThingDefs, Designations, Size and placement

### Goal
Create a decorative statue called "Golden Statue" that provides beauty.

### Step-by-Step Instructions

#### Step 1: Create Building Definition

1. In your `MyFirstMod/Defs/` folder, create `ThingDefs_Buildings.xml`

2. Add this content:
   ```xml
   <?xml version="1.0" encoding="utf-8"?>
   <Defs>
       <ThingDef ParentName="BuildingBase">
           <defName>MyFirstMod_GoldenStatue</defName>
           <label>golden statue</label>
           <description>A magnificent statue made entirely of gold. Very beautiful and very expensive.</description>
           <thingClass>Building</thingClass>
           <category>Building</category>
           <graphicData>
               <texPath>Things/Building/Art/SculptureSmall</texPath>
               <graphicClass>Graphic_Single</graphicClass>
               <drawSize>(2,2)</drawSize>
           </graphicData>
           <altitudeLayer>Building</altitudeLayer>
           <passability>PassThroughOnly</passability>
           <fillPercent>0.35</fillPercent>
           <pathCost>50</pathCost>
           <statBases>
               <MaxHitPoints>100</MaxHitPoints>
               <WorkToBuild>5000</WorkToBuild>
               <Mass>10</Mass>
               <Flammability>0</Flammability>
               <Beauty>50</Beauty>
           </statBases>
           <size>(1,1)</size>
           <costList>
               <MyFirstMod_GoldenCoin>50</MyFirstMod_GoldenCoin>
               <Gold>100</Gold>
           </costList>
           <building>
               <isEdifice>true</isEdifice>
           </building>
           <designationCategory>Furniture</designationCategory>
           <researchPrerequisites>
               <li>MyFirstMod_CoinMinting</li>
           </researchPrerequisites>
       </ThingDef>
   </Defs>
   ```

#### Step 2: Test the Building

1. Restart RimWorld
2. Load your test game
3. Complete the "coin minting" research (if not already done)
4. Open the Architect menu
5. Go to Furniture tab
6. Find "golden statue"
7. Place and build it
8. Notice the beauty value it provides to nearby colonists

#### Step 3: Modify the Beauty Value

1. Open `ThingDefs_Buildings.xml`
2. Find the `<Beauty>` stat
3. Change it from `50` to `100`
4. Save the file
5. Restart RimWorld and test again
6. Notice the increased beauty impact

### Success Criteria
- [x] Building appears in Furniture menu
- [x] Can be placed and constructed
- [x] Costs golden coins and gold to build
- [x] Provides beauty to the room
- [x] Requires research to unlock

### What You Learned
- How to create buildings using ThingDef
- How to set construction costs
- How to use custom items (golden coins) in recipes
- How buildings affect room stats (beauty)
- How to categorize buildings in architect menu

---

## Exercise 4: Use XML Patches to Modify Vanilla Content

**Difficulty**: Intermediate
**Time**: 25-30 minutes
**Concepts**: XPath, PatchOperation classes, Modifying existing content

### Goal
Create a patch that makes vanilla silver stacks to 1000 instead of 500, and adds your golden coin as an ingredient option for crafting art.

### Step-by-Step Instructions

#### Step 1: Create Patches Folder and File

1. In your `MyFirstMod/` folder, create a new folder called `Patches/`

2. Create a file inside: `Patches/VanillaPatches.xml`

#### Step 2: Patch Silver Stack Limit

1. Add this content to `VanillaPatches.xml`:
   ```xml
   <?xml version="1.0" encoding="utf-8"?>
   <Patch>
       <!-- Increase silver stack limit -->
       <Operation Class="PatchOperationReplace">
           <xpath>/Defs/ThingDef[defName="Silver"]/stackLimit</xpath>
           <value>
               <stackLimit>1000</stackLimit>
           </value>
       </Operation>
   </Patch>
   ```

#### Step 3: Test Silver Patch

1. Restart RimWorld
2. Use dev mode to spawn silver
3. Check that the stack limit is now 1000 instead of 500
4. (Hover over silver in debug menu or check in-game)

#### Step 4: Add Golden Coin to Art Recipes (Advanced)

1. Add this operation to your `VanillaPatches.xml` (after the first operation, inside `<Patch>` tags):
   ```xml
   <!-- Add golden coin as alternative ingredient for art -->
   <Operation Class="PatchOperationSequence">
       <operations>
           <li Class="PatchOperationTest">
               <xpath>/Defs/ThingDef[@Name="SculptureBase"]/recipeMaker/defaultIngredientFilter/thingDefs</xpath>
           </li>
           <li Class="PatchOperationAdd">
               <xpath>/Defs/ThingDef[@Name="SculptureBase"]/recipeMaker/defaultIngredientFilter/thingDefs</xpath>
               <value>
                   <li>MyFirstMod_GoldenCoin</li>
               </value>
           </li>
       </operations>
   </Operation>
   ```

Your full file should look like:
```xml
<?xml version="1.0" encoding="utf-8"?>
<Patch>
    <!-- Increase silver stack limit -->
    <Operation Class="PatchOperationReplace">
        <xpath>/Defs/ThingDef[defName="Silver"]/stackLimit</xpath>
        <value>
            <stackLimit>1000</stackLimit>
        </value>
    </Operation>

    <!-- Add golden coin as alternative ingredient for art -->
    <Operation Class="PatchOperationSequence">
        <operations>
            <li Class="PatchOperationTest">
                <xpath>/Defs/ThingDef[@Name="SculptureBase"]/recipeMaker/defaultIngredientFilter/thingDefs</xpath>
            </li>
            <li Class="PatchOperationAdd">
                <xpath>/Defs/ThingDef[@Name="SculptureBase"]/recipeMaker/defaultIngredientFilter/thingDefs</xpath>
                <value>
                    <li>MyFirstMod_GoldenCoin</li>
                </value>
            </li>
        </operations>
    </Operation>
</Patch>
```

#### Step 5: Test Art Patch

1. Restart RimWorld
2. Start or load a game
3. Give a colonist artistic skill
4. Have them create a sculpture
5. Verify that golden coins can now be used as a material option

### Success Criteria
- [x] Silver now stacks to 1000
- [x] Golden coins appear as material choice for art
- [x] No errors in debug log
- [x] Patches apply cleanly

### What You Learned
- How to create XML patches
- Using XPath to target specific definitions
- PatchOperationReplace for changing values
- PatchOperationAdd for adding new elements
- PatchOperationSequence for complex multi-step patches
- PatchOperationTest for conditional patches

### Troubleshooting
If patches don't work:
1. Check the debug log (Ctrl+F12) for patch errors
2. Verify XPath is correct
3. Check spelling of defNames
4. Ensure XML is well-formed (proper closing tags)

---

## Exercise 5: Add Compatibility Between Mods

**Difficulty**: Intermediate
**Time**: 20-25 minutes
**Concepts**: Conditional patches, Mod detection, Inter-mod compatibility

### Goal
Create a patch that only activates if another mod is loaded. We'll make golden coins craftable at the drug lab if you have any drug-related mod.

### Step-by-Step Instructions

#### Step 1: Create Conditional Patch

1. In your `Patches/` folder, create `ConditionalPatches.xml`

2. Add this content:
   ```xml
   <?xml version="1.0" encoding="utf-8"?>
   <Patch>
       <!-- Only apply if any version of Ludeon.RimWorld.Royalty DLC is active -->
       <Operation Class="PatchOperationFindMod">
           <mods>
               <li>Ludeon.RimWorld.Royalty</li>
           </mods>
           <match Class="PatchOperationSequence">
               <operations>
                   <li Class="PatchOperationAdd">
                       <xpath>/Defs/RecipeDef[defName="MyFirstMod_MakeGoldenCoin"]/recipeUsers</xpath>
                       <value>
                           <li>DrugLab</li>
                       </value>
                   </li>
               </operations>
           </match>
       </Operation>
   </Patch>
   ```

#### Step 2: Test With and Without DLC

1. **If you have Royalty DLC enabled:**
   - Restart RimWorld
   - Load a game
   - Check if golden coin recipe appears at Drug Lab
   - It should be there

2. **Disable Royalty DLC:**
   - Go to Mods menu
   - Disable Royalty
   - Restart
   - Check Drug Lab - recipe should NOT be there

#### Step 3: Create Another Compatibility Example

Add this to the same file to detect Harmony mod:

```xml
<!-- Add bonus if Harmony is loaded (it almost always is) -->
<Operation Class="PatchOperationFindMod">
    <mods>
        <li>brrainz.harmony</li>
    </mods>
    <match Class="PatchOperationReplace">
        <xpath>/Defs/ThingDef[defName="MyFirstMod_GoldenCoin"]/statBases/MarketValue</xpath>
        <value>
            <MarketValue>20</MarketValue>
        </value>
    </match>
</Operation>
```

This increases the market value when Harmony is loaded (which is almost always, but good for demonstration).

### Success Criteria
- [x] Patch only applies when target mod is active
- [x] Patch doesn't apply when target mod is inactive
- [x] No errors regardless of mod presence
- [x] Understand how to detect other mods

### What You Learned
- How to detect if other mods are loaded
- PatchOperationFindMod usage
- Creating compatibility patches
- Conditional mod behavior
- Inter-mod integration strategies

---

## Exercise 6: Create a Simple Quality-of-Life Feature with Patches

**Difficulty**: Intermediate
**Time**: 30 minutes
**Concepts**: Multiple patches, Game balance, Practical modding

### Goal
Create a small QoL mod that makes early game easier by reducing research costs and construction times for basic structures.

### Step-by-Step Instructions

#### Step 1: Create New Mod Structure

1. Create a new mod folder: `MyQoLMod`
2. Create folder structure:
   ```
   MyQoLMod/
   ├── About/
   │   └── About.xml
   └── Patches/
       └── EarlyGameBoost.xml
   ```

#### Step 2: Create About.xml

```xml
<?xml version="1.0" encoding="utf-8"?>
<ModMetaData>
    <name>Early Game Boost</name>
    <author>Your Name</author>
    <packageId>YourName.EarlyGameBoost</packageId>
    <supportedVersions>
        <li>1.5</li>
        <li>1.6</li>
    </supportedVersions>
    <description>Makes early game slightly easier by reducing basic research costs and build times.</description>
</ModMetaData>
```

#### Step 3: Create Comprehensive Patches

Create `EarlyGameBoost.xml`:

```xml
<?xml version="1.0" encoding="utf-8"?>
<Patch>
    <!-- Reduce early research costs by 25% -->
    <Operation Class="PatchOperationSequence">
        <operations>
            <!-- Reduce Battery research -->
            <li Class="PatchOperationReplace">
                <xpath>/Defs/ResearchProjectDef[defName="Battery"]/baseCost</xpath>
                <value>
                    <baseCost>300</baseCost>
                </value>
            </li>

            <!-- Reduce Electricity research -->
            <li Class="PatchOperationReplace">
                <xpath>/Defs/ResearchProjectDef[defName="Electricity"]/baseCost</xpath>
                <value>
                    <baseCost>600</baseCost>
                </value>
            </li>

            <!-- Reduce Air Conditioning research -->
            <li Class="PatchOperationReplace">
                <xpath>/Defs/ResearchProjectDef[defName="AirConditioning"]/baseCost</xpath>
                <value>
                    <baseCost>450</baseCost>
                </value>
            </li>
        </operations>
    </Operation>

    <!-- Reduce build time for beds by 50% -->
    <Operation Class="PatchOperationReplace">
        <xpath>/Defs/ThingDef[defName="Bed"]/statBases/WorkToBuild</xpath>
        <value>
            <WorkToBuild>500</WorkToBuild>
        </value>
    </Operation>

    <!-- Reduce wood cost for campfire -->
    <Operation Class="PatchOperationReplace">
        <xpath>/Defs/ThingDef[defName="Campfire"]/costList/WoodLog</xpath>
        <value>
            <WoodLog>15</WoodLog>
        </value>
    </Operation>
</Patch>
```

#### Step 4: Test the Changes

1. Enable the mod in RimWorld
2. Start a new colony
3. Verify changes:
   - Check research costs (should be lower)
   - Build a bed (should be faster)
   - Build a campfire (should cost less wood)

### Success Criteria
- [x] Research costs are reduced
- [x] Construction times are faster
- [x] Resource costs are lower
- [x] Game feels noticeably easier in early game

### Challenge Extension

Try to add these yourself:
1. Increase colonist carrying capacity by 25%
   - Hint: Look for StatDef called "CarryingCapacity"
2. Make storage zones hold more
   - Hint: Look for ThingDef with defName "Shelf"
3. Reduce food consumption
   - Hint: Look for "FoodConsumption" stat

### What You Learned
- Creating focused QoL mods
- Balancing game difficulty through modding
- Applying multiple patches efficiently
- Testing and validating changes
- Game design considerations

---

## Next Steps

After completing these exercises, you should:

1. **Study Existing Mods**
   - Look at mods in the workshop folder
   - Read their XML to understand techniques
   - See how professionals structure complex mods

2. **Learn C# Modding**
   - Download Visual Studio Community (free)
   - Learn basic C# syntax
   - Study Harmony patching library
   - Try simple code modifications

3. **Join the Community**
   - RimWorld Discord
   - Ludeon Forums
   - r/RimWorldMods subreddit
   - Ask questions and share your work

4. **Create Your Own Mod**
   - Think of a feature you want
   - Plan the implementation
   - Build it step by step
   - Share on Steam Workshop

---

## Common Errors and Solutions

### Error: "Mod could not be loaded"
**Solution**: Check About.xml is valid XML, has required fields

### Error: "Unknown node defName"
**Solution**: Check spelling of defName, ensure it's unique with your mod prefix

### Error: "Patch failed to apply"
**Solution**: Check XPath syntax, verify target exists, check debug log

### Error: "Texture not found"
**Solution**: Either fix texture path or use vanilla texture temporarily

### Recipe doesn't appear
**Solution**: Check research prerequisite, verify recipeUsers, check debug log

### Building can't be placed
**Solution**: Check size, passability, placement requirements

---

## Resources

- **Official Wiki**: https://rimworldwiki.com/wiki/Modding_Tutorials
- **Forums**: https://ludeon.com/forums/index.php?board=14.0
- **XML Reference**: Check vanilla Defs in `RimWorld/Data/Core/Defs/`
- **GitHub Examples**: Search for open-source RimWorld mods

---

## Congratulations!

You've completed the RimWorld modding exercises! You now know how to:
- Create basic mods
- Define items, buildings, and research
- Use XML patches
- Create compatibility patches
- Balance and test your mods

Keep practicing and experimenting. The best way to learn is to create something you're passionate about!

Happy modding!
