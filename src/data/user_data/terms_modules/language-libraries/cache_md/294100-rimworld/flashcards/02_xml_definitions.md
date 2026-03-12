# RimWorld Modding Flashcards - XML Definitions

---

#### ThingDef - Inheritance with ParentName
RimWorld uses ParentName for XML inheritance, allowing your definitions to inherit fields from base definitions. Vanilla defines many parent templates like BuildingBase, ResourceBase, ApparelBase in Core/Defs/ which contain common fields. This reduces repetition and ensures consistency. Child definitions override parent fields by redefining them. Understanding vanilla parents is key to efficient modding.

**Example:**
```xml
<!-- Vanilla defines BuildingBase with common building properties -->
<ThingDef ParentName="BuildingBase">
    <defName>MyMod_CustomWorkbench</defName>
    <!-- Inherits from BuildingBase: -->
    <!-- - category = Building -->
    <!-- - altitudeLayer = Building -->
    <!-- - passability, fillPercent, etc. -->

    <!-- Override specific fields: -->
    <label>custom workbench</label>
    <size>(3,2)</size>
</ThingDef>
```

**Logic flow:**
1. RimWorld finds ParentName="BuildingBase"
2. Loads all fields from BuildingBase definition
3. Applies your custom fields (overriding where specified)
4. Results in complete ThingDef with minimal XML
:p How does XML inheritance work in RimWorld using ParentName?
??x
**Mechanism:** Use `ParentName` attribute to inherit from base definitions

```xml
<ThingDef ParentName="BuildingBase">
    <defName>MyMod_NewBuilding</defName>
    <label>my building</label>
    <!-- Inherits all other fields from BuildingBase -->
</ThingDef>
```

**Common vanilla parents:**
- `BuildingBase` - Basic building properties
- `ResourceBase` - Stackable resources
- `ApparelBase` - Clothing/armor
- `WeaponBase` - Weapons
- `PlantBase` - Plants

**Inheritance rules:**
1. Child gets all parent fields automatically
2. Child can override any parent field by redefining it
3. Multiple inheritance levels possible (parent has parent)

**Benefits:**
- Reduces XML repetition
- Ensures consistent defaults
- Easier maintenance

**Finding parents:**
Look in `RimWorld/Data/Core/Defs/` for vanilla parent definitions
x??

---

#### ThingDef - StatBases for Object Properties
StatBases define numeric properties of things: durability (MaxHitPoints), construction time (WorkToBuild), market value (MarketValue), mass (Mass), beauty (Beauty), etc. These stats affect gameplay directly. Many stats have default values from parent definitions. Stats can be modified by stuff materials, quality, and other factors at runtime. Understanding which stats apply to which thing types is crucial.

**Example:**
```xml
<ThingDef>
    <defName>MyMod_GoldenStatue</defName>
    <statBases>
        <MaxHitPoints>100</MaxHitPoints>      <!-- Durability -->
        <WorkToBuild>5000</WorkToBuild>       <!-- Construction time -->
        <Mass>10</Mass>                       <!-- Weight in kg -->
        <Flammability>0</Flammability>        <!-- Fire resistance -->
        <Beauty>50</Beauty>                   <!-- Room beauty -->
        <MarketValue>500</MarketValue>        <!-- Silver value -->
    </statBases>
</ThingDef>
```

**Common stats:**
- Items: MarketValue, Mass, MaxHitPoints
- Buildings: WorkToBuild, Beauty, Flammability
- Weapons: AccuracyTouch, AccuracyShort, AccuracyMedium, AccuracyLong
- Apparel: ArmorRating_Blunt, ArmorRating_Sharp, Insulation_Cold
:p What is statBases in ThingDef, and what are common stats used?
??x
**Purpose:** Defines numeric properties that affect thing's behavior

```xml
<statBases>
    <MaxHitPoints>150</MaxHitPoints>
    <WorkToBuild>3000</WorkToBuild>
    <MarketValue>250</MarketValue>
    <Mass>5</Mass>
    <Beauty>10</Beauty>
    <Flammability>0.5</Flammability>
</statBases>
```

**Common stats by type:**

**Buildings:**
- `WorkToBuild` - Construction time (higher = slower)
- `Beauty` - Affects room impressiveness
- `MaxHitPoints` - Durability before destruction
- `Flammability` - Fire susceptibility (0-1)

**Items/Resources:**
- `MarketValue` - Worth in silver
- `Mass` - Weight, affects carrying
- `MaxHitPoints` - Damage before destroyed

**Weapons:**
- `AccuracyTouch/Short/Medium/Long` - Hit chance at ranges

**Apparel:**
- `ArmorRating_Blunt` - Blunt damage protection
- `ArmorRating_Sharp` - Sharp damage protection
- `Insulation_Cold/Heat` - Temperature protection

**Effect:** These values directly affect gameplay mechanics
x??

---

#### RecipeDef - Ingredients with Filters
RecipeDef ingredients use filters to specify what materials can be used. The filter/thingDefs list allows specific items, while categories allow broader material choices. Count specifies quantity required. Filters enable flexible recipes where multiple materials work (e.g., any metal, any wood). This creates interesting gameplay choices and material efficiency considerations.

**Specific material recipe:**
```xml
<RecipeDef>
    <defName>MyMod_MakeGoldenCoin</defName>
    <ingredients>
        <li>
            <filter>
                <thingDefs>
                    <li>Gold</li>              <!-- Only gold works -->
                </thingDefs>
            </filter>
            <count>5</count>                   <!-- Need 5 gold -->
        </li>
    </ingredients>
    <products>
        <MyMod_GoldenCoin>1</MyMod_GoldenCoin>
    </products>
</RecipeDef>
```

**Flexible material recipe:**
```xml
<ingredients>
    <li>
        <filter>
            <categories>
                <li>Metallic</li>              <!-- Any metal works -->
            </categories>
        </filter>
        <count>50</count>
    </li>
</ingredients>
```

**Logic:** RimWorld checks available items against filter, allows crafting if match found
:p How do you specify ingredients in a RimWorld RecipeDef?
??x
**Structure:** Use `<ingredients>` with `<filter>` to define what materials work

**Specific materials (restrictive):**
```xml
<ingredients>
    <li>
        <filter>
            <thingDefs>
                <li>Steel</li>
                <li>Plasteel</li>  <!-- Only these two work -->
            </thingDefs>
        </filter>
        <count>25</count>
    </li>
</ingredients>
```

**Category-based (flexible):**
```xml
<ingredients>
    <li>
        <filter>
            <categories>
                <li>Metallic</li>     <!-- Any metal: steel, gold, plasteel, etc. -->
            </categories>
        </filter>
        <count>50</count>
    </li>
</ingredients>
```

**Multiple ingredients:**
```xml
<ingredients>
    <li>
        <filter><thingDefs><li>Steel</li></thingDefs></filter>
        <count>25</count>
    </li>
    <li>
        <filter><thingDefs><li>ComponentIndustrial</li></thingDefs></filter>
        <count>5</count>
    </li>
</ingredients>
```

**Effect:** Colonists check stockpiles for materials matching filter before crafting
x??

---

#### RecipeDef - Skill Requirements and Work Stats
Recipes can require minimum skill levels and scale work speed by specific stats. skillRequirements sets minimum skill to attempt the recipe. workSpeedStat determines which skill affects crafting speed (GeneralLaborSpeed, SmithingSpeed, CookSpeed, etc.). Higher skilled colonists work faster. effectWorking and soundWorking add visual/audio feedback during work.

**Example:**
```xml
<RecipeDef>
    <defName>MyMod_CraftAdvancedItem</defName>
    <workAmount>1500</workAmount>                <!-- Base work in ticks -->
    <workSpeedStat>GeneralLaborSpeed</workSpeedStat>  <!-- Speed modifier -->

    <skillRequirements>
        <Crafting>5</Crafting>                   <!-- Need crafting 5+ -->
        <Intellectual>3</Intellectual>           <!-- AND intellectual 3+ -->
    </skillRequirements>

    <effectWorking>Smith</effectWorking>         <!-- Visual effect -->
    <soundWorking>Recipe_Smith</soundWorking>    <!-- Sound effect -->
</RecipeDef>
```

**Skill calculation:**
- Colonist with Crafting 10 → Works faster than base speed
- Colonist with Crafting 3 → Cannot use recipe (below requirement)
- workAmount / (colonist speed × workSpeedStat) = time to complete
:p How do you set skill requirements and work speed for recipes in RimWorld?
??x
**Skill requirements (minimum to use recipe):**
```xml
<skillRequirements>
    <Crafting>5</Crafting>           <!-- Need 5+ crafting -->
    <Intellectual>3</Intellectual>    <!-- AND 3+ intellectual -->
</skillRequirements>
```

**Work speed configuration:**
```xml
<workAmount>1000</workAmount>               <!-- Base ticks of work -->
<workSpeedStat>GeneralLaborSpeed</workSpeedStat>  <!-- What affects speed -->
```

**Common workSpeedStat values:**
- `GeneralLaborSpeed` - General crafting
- `SmithingSpeed` - Metal working
- `CookSpeed` - Cooking
- `ButcheryFleshSpeed` - Butchering
- `ConstructionSpeed` - Building
- `ResearchSpeed` - Research

**How it works:**
```
actual_time = workAmount / (colonist_speed × workSpeedStat_multiplier)
```

**Effect feedback:**
```xml
<effectWorking>Smith</effectWorking>      <!-- Sparks/particles -->
<soundWorking>Recipe_Smith</soundWorking> <!-- Hammering sounds -->
```

**Result:** Higher skilled colonists complete recipe faster
x??

---

#### RecipeDef - Recipe Users (Where Recipes Appear)
recipeUsers defines which workbenches can perform this recipe. It's a list of ThingDef defNames for buildings. Recipes only appear at specified benches. This allows flexible recipe distribution (same recipe at multiple benches) or specialization (unique bench for unique recipe). Vanilla benches include ElectricSmithy, FueledSmithy, DrugLab, ComponentAssemblyBench, etc.

**Example:**
```xml
<RecipeDef>
    <defName>MyMod_MakeSpecialItem</defName>
    <!-- ... ingredients, work, etc ... -->

    <recipeUsers>
        <li>ElectricSmithy</li>              <!-- Appears at electric smithy -->
        <li>FueledSmithy</li>                <!-- AND fueled smithy -->
        <li>MyMod_CustomWorkbench</li>       <!-- AND custom bench -->
    </recipeUsers>
</RecipeDef>
```

**Common vanilla benches:**
- ElectricSmithy / FueledSmithy - Metal working
- CraftingSpot - Basic crafting
- TableMachining - Component work
- DrugLab - Drug production
- ElectricStove / FueledStove - Cooking
- ComponentAssemblyBench - Advanced components

**Logic:** When colonist uses bench, game shows all recipes listing that bench in recipeUsers
:p What is recipeUsers in RecipeDef, and how does it work?
??x
**Purpose:** Defines which workbenches can perform this recipe

```xml
<RecipeDef>
    <defName>MyMod_MakeItem</defName>
    <recipeUsers>
        <li>ElectricSmithy</li>
        <li>FueledSmithy</li>
    </recipeUsers>
</RecipeDef>
```

**Effect:** Recipe appears at both electric and fueled smithies

**Common vanilla workbenches:**
- `ElectricSmithy` - Powered metal working
- `FueledSmithy` - Non-electric metal working
- `CraftingSpot` - Basic crafting anywhere
- `TableMachining` - Advanced component work
- `DrugLab` - Drug production
- `ElectricStove` / `FueledStove` - Cooking
- `ComponentAssemblyBench` - High-tech components

**Multiple benches:**
```xml
<recipeUsers>
    <li>Bench1</li>
    <li>Bench2</li>
    <li>MyCustomBench</li>
</recipeUsers>
```
Recipe available at all three locations.

**Custom bench only:**
```xml
<recipeUsers>
    <li>MyMod_SpecialWorkbench</li>
</recipeUsers>
```
Exclusive recipe for your custom bench.
x??

---

#### ResearchProjectDef - Prerequisites Chain
Research prerequisites create technology trees where advanced research requires completing earlier projects first. Use prerequisites list to reference earlier research defNames. Players must complete all prerequisites before unlocking a research. This creates progression and pacing. researchViewX and researchViewY position the research on the research tree UI for visual clarity.

**Example:**
```xml
<ResearchProjectDef>
    <defName>MyMod_AdvancedWeaponry</defName>
    <label>advanced weaponry</label>
    <baseCost>3000</baseCost>                    <!-- Research points needed -->
    <techLevel>Industrial</techLevel>

    <prerequisites>
        <li>Smithing</li>                        <!-- Must complete first -->
        <li>Machining</li>                       <!-- AND this -->
    </prerequisites>

    <researchViewX>8.00</researchViewX>          <!-- Position on tree -->
    <researchViewY>3.50</researchViewY>
</ResearchProjectDef>
```

**Logic flow:**
1. Player starts game → Smithing and Machining available
2. Player completes Smithing → AdvancedWeaponry still locked (needs Machining)
3. Player completes Machining → AdvancedWeaponry now available
4. Player researches AdvancedWeaponry → Unlocks gated recipes/buildings
:p How do you create research prerequisites (technology trees) in RimWorld?
??x
**Mechanism:** Use `<prerequisites>` to require earlier research

```xml
<ResearchProjectDef>
    <defName>MyMod_AdvancedTech</defName>
    <label>advanced technology</label>
    <baseCost>2000</baseCost>

    <prerequisites>
        <li>Smithing</li>          <!-- Requires this first -->
        <li>Electricity</li>       <!-- AND this -->
    </prerequisites>
</ResearchProjectDef>
```

**Logic:** Player must complete ALL prerequisites before this research becomes available

**Chain example:**
```
BasicTech (no prereqs)
    ↓
AdvancedTech (requires BasicTech)
    ↓
MasterTech (requires AdvancedTech)
```

**Tree positioning:**
```xml
<researchViewX>6.00</researchViewX>    <!-- Horizontal position -->
<researchViewY>2.50</researchViewY>    <!-- Vertical position -->
```

**Gate content behind research:**
```xml
<RecipeDef>
    <researchPrerequisite>MyMod_AdvancedTech</researchPrerequisite>
</RecipeDef>
```

**Result:** Creates progression system, paces content unlock
x??

---

#### ResearchProjectDef - Tech Levels
techLevel categorizes research by civilization advancement: Neolithic (tribal), Medieval, Industrial, Spacer, Ultra. This affects which factions can use the technology and how advanced it's perceived. Tech level doesn't gate research by itself (prerequisites do that), but it provides thematic organization and can affect trading. Most mods use Industrial or Spacer.

**Example:**
```xml
<ResearchProjectDef>
    <defName>MyMod_PrimitiveCrafting</defName>
    <techLevel>Neolithic</techLevel>           <!-- Tribal tech -->
    <baseCost>400</baseCost>
</ResearchProjectDef>

<ResearchProjectDef>
    <defName>MyMod_AdvancedRobotics</defName>
    <techLevel>Spacer</techLevel>              <!-- High-tech -->
    <baseCost>5000</baseCost>
</ResearchProjectDef>
```

**Tech levels (progression):**
1. Neolithic - Stone age, primitive
2. Medieval - Middle ages, simple mechanics
3. Industrial - Steam/electricity era
4. Spacer - Space travel, advanced tech
5. Ultra - Beyond spacer, exotic tech
6. Archotech - Godlike AI technology

**Usage:** Helps organize research tree thematically, affects faction tech alignment
:p What is techLevel in ResearchProjectDef, and what are the options?
??x
**Purpose:** Categorizes research by technological advancement level

```xml
<ResearchProjectDef>
    <defName>MyMod_Research</defName>
    <techLevel>Industrial</techLevel>
    <baseCost>2000</baseCost>
</ResearchProjectDef>
```

**Tech level progression:**
1. **Neolithic** - Tribal, stone age tools
2. **Medieval** - Middle ages, basic metalworking
3. **Industrial** - Electricity, advanced manufacturing
4. **Spacer** - Space travel, high technology
5. **Ultra** - Beyond spacer, exotic technology
6. **Archotech** - Transcendent AI technology (rare)

**Most common for mods:**
- `Industrial` - Modern crafting, electricity
- `Spacer` - Advanced/futuristic content

**Effects:**
- Thematic organization in research tree
- Affects which factions can use the tech
- Influences trading availability
- Doesn't gate research (prerequisites do that)

**Example usage:**
- Primitive bow → Neolithic
- Gunsmithing → Medieval/Industrial
- Advanced bionics → Spacer
- AI cores → Ultra/Archotech
x??

---

#### Building ThingDef - Size and Passability
Building size uses (width, height) in tiles. Larger buildings require more space and cost more but can have more features. passability determines if pawns can walk through: Impassable (solid walls), PassThroughOnly (can walk through but not stop in), or Standable (full movement). fillPercent affects how much the building blocks movement and provides cover. pathCost makes pawns prefer to path around it.

**Example:**
```xml
<ThingDef ParentName="BuildingBase">
    <defName>MyMod_LargeWorkbench</defName>

    <size>(3,2)</size>                          <!-- 3 wide, 2 tall -->

    <passability>PassThroughOnly</passability>  <!-- Can walk through -->
    <fillPercent>0.4</fillPercent>              <!-- 40% cover -->
    <pathCost>70</pathCost>                     <!-- Prefer to go around -->

    <!-- Interaction cell for colonist to stand -->
    <hasInteractionCell>true</hasInteractionCell>
    <interactionCellOffset>(0,0,-1)</interactionCellOffset>  <!-- Front of building -->
</ThingDef>
```

**Passability options:**
- Impassable - Cannot enter (walls, solid buildings)
- PassThroughOnly - Can walk through, can't stop (workbenches)
- Standable - Full movement (chairs, some small furniture)
:p How do you define building size and movement properties in RimWorld ThingDef?
??x
**Size definition:**
```xml
<size>(width, height)</size>
<size>(3,2)</size>  <!-- 3 tiles wide, 2 tiles tall -->
```

**Movement properties:**
```xml
<passability>PassThroughOnly</passability>
<fillPercent>0.4</fillPercent>     <!-- 40% blocks movement -->
<pathCost>70</pathCost>            <!-- Path preference (higher = avoid) -->
```

**Passability options:**
1. **Impassable** - Cannot walk through (walls, dense structures)
2. **PassThroughOnly** - Can walk through but not stop inside (workbenches)
3. **Standable** - Can walk and stand on (chairs, art)

**Interaction cell (where colonist stands to use):**
```xml
<hasInteractionCell>true</hasInterCell>
<interactionCellOffset>(0,0,-1)</interactionCellOffset>
```
Offset (0,0,-1) = one tile in front (south) of building

**fillPercent effects:**
- 0.0 = No obstruction
- 0.5 = Partial cover in combat
- 1.0 = Full blocking

**pathCost:**
- 0 = Preferred path
- 50+ = Avoid if possible
- High values make pawns path around
x??

---

#### Building ThingDef - Construction Costs
costList defines materials needed to build a structure. Each material is specified by defName and count. Players must have materials in stockpiles before construction. Materials used determine stuff properties for stuffable buildings (like wood vs stone walls having different stats). Some buildings require components or rare materials for balance.

**Example:**
```xml
<ThingDef ParentName="BuildingBase">
    <defName>MyMod_AdvancedWorkbench</defName>

    <costList>
        <Steel>150</Steel>                      <!-- 150 steel required -->
        <ComponentIndustrial>8</ComponentIndustrial>  <!-- 8 components -->
        <Gold>25</Gold>                         <!-- 25 gold -->
    </costList>

    <statBases>
        <WorkToBuild>8000</WorkToBuild>         <!-- Construction time -->
    </statBases>
</ThingDef>
```

**Common materials:**
- Steel - Basic metal construction
- WoodLog - Wooden structures
- Stone blocks (BlocksGranite, BlocksSandstone, etc.)
- ComponentIndustrial - Required for complex machinery
- Gold, Silver, Plasteel - Advanced/expensive materials

**Stuffable buildings (material choice):**
```xml
<stuffCategories>
    <li>Metallic</li>
    <li>Woody</li>
</stuffCategories>
```
Allows player to choose steel vs gold vs silver, affecting stats
:p How do you define construction costs for buildings in RimWorld?
??x
**Structure:** Use `<costList>` with material defNames and counts

```xml
<ThingDef ParentName="BuildingBase">
    <defName>MyMod_Building</defName>

    <costList>
        <Steel>100</Steel>
        <ComponentIndustrial>5</ComponentIndustrial>
        <WoodLog>50</WoodLog>
    </costList>
</ThingDef>
```

**Common vanilla materials:**
- `Steel` - Basic metal (most buildings)
- `WoodLog` - Wood structures
- `ComponentIndustrial` - Complex machines
- `Plasteel` - Advanced/expensive metal
- `Gold` / `Silver` - Decorative/expensive
- `BlocksGranite` / `BlocksSandstone` / etc. - Stone blocks

**Construction time:**
```xml
<statBases>
    <WorkToBuild>5000</WorkToBuild>  <!-- Ticks to build -->
</statBases>
```

**Custom mod items:**
```xml
<costList>
    <MyMod_GoldenCoin>50</MyMod_GoldenCoin>
    <Steel>100</Steel>
</costList>
```

**Effect:**
- Players need materials in stockpiles before building
- Colonists haul materials to construction site
- Higher costs = more expensive/balanced structures
x??

---

#### Graphics - graphicClass Types
graphicClass determines how RimWorld renders a thing's texture. Graphic_Single uses one texture for all directions (most items, simple buildings). Graphic_Multi uses 4 textures (_north, _south, _east, _west) for directional buildings. Graphic_Random randomly selects from multiple textures. drawSize scales the visual size without affecting game mechanics (larger/smaller appearance).

**Single texture (non-directional):**
```xml
<graphicData>
    <texPath>Things/Item/MyItem</texPath>
    <graphicClass>Graphic_Single</graphicClass>
    <drawSize>(1,1)</drawSize>                  <!-- Normal size -->
</graphicData>
```

**Multi-directional building:**
```xml
<graphicData>
    <texPath>Things/Building/MyBuilding</texPath>
    <graphicClass>Graphic_Multi</graphicClass>  <!-- Needs 4 textures -->
    <drawSize>(2,2)</drawSize>
</graphicData>
<!-- Expects files: -->
<!-- MyBuilding_north.png -->
<!-- MyBuilding_south.png -->
<!-- MyBuilding_east.png -->
<!-- MyBuilding_west.png -->
```

**Random variety:**
```xml
<graphicClass>Graphic_Random</graphicClass>
<!-- Uses MyItem_a.png, MyItem_b.png, MyItem_c.png -->
```
:p What are the common graphicClass types in RimWorld, and when do you use each?
??x
**Common types:**

**1. Graphic_Single** - One texture, all directions
```xml
<graphicClass>Graphic_Single</graphicClass>
<texPath>Things/Item/MyItem</texPath>
```
Uses: Items, non-directional buildings, resources
File: `MyItem.png`

**2. Graphic_Multi** - Four directional textures
```xml
<graphicClass>Graphic_Multi</graphicClass>
<texPath>Things/Building/MyBuilding</texPath>
```
Uses: Directional buildings (workbenches, doors)
Files needed:
- `MyBuilding_north.png`
- `MyBuilding_south.png`
- `MyBuilding_east.png`
- `MyBuilding_west.png`

**3. Graphic_Random** - Random texture selection
```xml
<graphicClass>Graphic_Random</graphicClass>
```
Uses: Variety (rocks, trees)
Files: `MyItem_a.png`, `MyItem_b.png`, `MyItem_c.png`

**Draw size:**
```xml
<drawSize>(2,2)</drawSize>  <!-- 2x2 visual size -->
```
Note: drawSize is visual only, doesn't affect actual building size

**Most common:** Graphic_Single for items, Graphic_Multi for buildings
x??

---

#### ThingCategories - Organization and Storage
thingCategories determines where items appear in storage UI and how they're organized. Items can belong to multiple categories. Common vanilla categories include ResourcesRaw, Manufactured, Items, Weapons, Apparel. This affects stockpile filters and allows players to easily find/restrict items. Custom categories possible but vanilla categories recommended for compatibility.

**Example:**
```xml
<ThingDef ParentName="ResourceBase">
    <defName>MyMod_SpecialMaterial</defName>
    <label>special material</label>

    <thingCategories>
        <li>ResourcesRaw</li>                   <!-- Appears in raw resources -->
        <li>Items</li>                          <!-- AND general items -->
    </thingCategories>

    <stackLimit>750</stackLimit>
</ThingDef>
```

**Common vanilla categories:**
- ResourcesRaw - Raw materials (steel, wood, stone)
- Manufactured - Crafted items
- Items - General items category
- Weapons - All weapons
- Apparel - All clothing/armor
- Foods - Meals and ingredients
- BodyParts - Prosthetics and implants

**Effect:** When player sets stockpile filters, they can allow/deny by category
:p What is thingCategories in RimWorld ThingDef, and why is it important?
??x
**Purpose:** Organizes items for storage filters and UI display

```xml
<ThingDef>
    <defName>MyMod_Item</defName>
    <thingCategories>
        <li>ResourcesRaw</li>
        <li>Items</li>
    </thingCategories>
</ThingDef>
```

**Common vanilla categories:**
- `ResourcesRaw` - Raw materials (ore, wood, stone)
- `Manufactured` - Crafted/processed items
- `Items` - General items
- `Weapons` - All weapons
- `Apparel` - Clothing and armor
- `Foods` - Meals and ingredients
- `BodyParts` - Prosthetics, bionics

**Why important:**
1. **Stockpile filters** - Players can allow/deny by category
2. **Organization** - Items grouped logically in menus
3. **Auto-haul** - Colonists know where to store items
4. **UI clarity** - Easier to find items

**Multiple categories:**
Items can belong to multiple categories for flexibility

**Best practice:**
Use vanilla categories when possible for compatibility with other mods
x??
