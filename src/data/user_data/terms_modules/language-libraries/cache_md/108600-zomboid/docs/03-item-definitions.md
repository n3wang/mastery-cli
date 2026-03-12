# Item Definitions Guide

## Overview

Items in Project Zomboid are defined using script files (`.txt`) with a declarative syntax. These files describe the properties, behavior, and appearance of items without using Lua code.

## Basic Item Structure

Item definitions are placed in `media/scripts/` directory and use this basic structure:

```
module Base
{
    item ItemName
    {
        Property1    = Value1,
        Property2    = Value2,
        Property3    = Value3,
    }
}
```

## Creating Your First Item

Here's a simple example of a custom food item:

```
module Base
{
    item MyApple
    {
        Type                = Food,
        DisplayName         = Red Apple,
        Icon                = Apple,
        Weight              = 0.1,
        HungerChange        = -10,
        DaysFresh           = 7,
        DaysTotallyRotten   = 14,
        Calories            = 95,
        Carbohydrates       = 25,
        Proteins            = 0,
        Lipids              = 0,
    }
}
```

To reference this item in Lua:
```lua
player:getInventory():AddItem("Base.MyApple")
```

## Common Item Properties

### Essential Properties

```
Type                    # Item category: Normal, Food, Weapon, Drainable
DisplayName            # Name shown in-game
Icon                   # Icon filename (from media/textures/)
Weight                 # Item weight in kg
```

### Display Properties

```
DisplayCategory        # Inventory category: Food, Weapon, Clothing, etc.
Count                  # Default stack count when spawned
WorldStaticModel       # 3D model when dropped in world
StaticModel           # Alternative static model
Tooltip               # Custom tooltip text
```

### Value Properties

```
MetalValue            # Amount of metal when disassembled
WoodValue             # Amount of wood when disassembled
```

## Item Types

### Normal Items

Generic items with no special behavior:

```
module Base
{
    item MyTool
    {
        Type                = Normal,
        DisplayName         = Custom Tool,
        Icon                = Hammer,
        Weight              = 0.5,
        DisplayCategory     = Tools,
    }
}
```

### Food Items

Food items have nutrition and spoilage properties:

```
module Base
{
    item MyMeal
    {
        Type                = Food,
        DisplayName         = Hearty Meal,
        Icon                = Soup,
        Weight              = 0.3,

        # Nutrition
        HungerChange        = -30,        # How much hunger it reduces (negative = fills hunger)
        ThirstChange        = 5,          # Positive = makes thirsty, negative = quenches thirst
        Calories            = 400,
        Carbohydrates       = 50,
        Proteins            = 20,
        Lipids              = 15,

        # Spoilage
        DaysFresh           = 3,          # Days until it starts to spoil
        DaysTotallyRotten   = 7,          # Days until completely rotten

        # Effects
        Boredom             = -10,        # Reduces boredom
        Unhappiness         = -15,        # Reduces unhappiness
        Poison              = false,      # Is it poisonous?
        PoisonPower         = 0,         # How poisonous (if Poison = true)

        # Cooking
        IsCookable          = true,
        MinutesToCook       = 60,
        MinutesToBurn       = 90,
    }
}
```

### Drainable Items

Items that have uses/charges (batteries, water bottles, etc.):

```
module Base
{
    item MyBattery
    {
        Type                = Drainable,
        DisplayName         = AA Battery,
        Icon                = Battery,
        Weight              = 0.02,
        UseDelta            = 0.01,       # How much charge is used per use
        UseWhileEquipped    = false,
    }
}
```

### Weapon Items

Melee or ranged weapons:

```
module Base
{
    item MyBat
    {
        Type                    = Weapon,
        DisplayName             = Wooden Bat,
        Icon                    = BaseballBat,
        Weight                  = 1.2,

        # Damage properties
        MinDamage               = 0.5,
        MaxDamage               = 1.0,
        CriticalChance          = 10,
        CritDmgMultiplier       = 2,

        # Attack properties
        MinimumSwingTime        = 2.5,
        SwingTime               = 3.0,
        MinRange                = 0.61,
        MaxRange                = 1.5,
        SwingAnim               = Bat,

        # Durability
        ConditionMax            = 10,
        ConditionLowerChanceOneIn = 5,    # 1 in 5 chance to lose condition

        # Category
        Categories              = Blunt,
        TwoHandWeapon           = true,
        WeaponWeight            = 4,
    }
}
```

### Clothing Items

Wearable items:

```
module Base
{
    item MyJacket
    {
        Type                = Clothing,
        DisplayName         = Leather Jacket,
        Icon                = Jacket,
        Weight              = 2.0,

        # Protection
        ScratchDefense      = 25,
        BiteDefense         = 40,
        CombatSpeedModifier = 0.95,      # Movement speed multiplier

        # Body location
        BodyLocation        = Jacket,
        BloodLocation       = Jacket,

        # Insulation
        Insulation          = 0.75,
        WindResistance      = 0.4,
        WaterResistance     = 0.3,
    }
}
```

## Real-World Example: Ammunition

From the Firearms mod:

```
module Base
{
    item Bullets9mm
    {
        Count               = 5,
        Weight              = 0.01,
        Type                = Normal,
        DisplayCategory     = Ammo,
        DisplayName         = 9mm Round,
        Icon                = 9mm_Round,
        MetalValue          = 1,
        StaticModel         = Bullet,
        WorldStaticModel    = 9mmRounds,
    }

    item Bullets45
    {
        Count               = 5,
        Weight              = 0.015,
        Type                = Normal,
        DisplayCategory     = Ammo,
        DisplayName         = .45 Auto Round,
        Icon                = 45_Round,
        MetalValue          = 1,
        StaticModel         = Bullet,
        WorldStaticModel    = 9mmRounds,
    }

    item ShotgunShells
    {
        Count               = 5,
        Weight              = 0.03,
        Type                = Normal,
        DisplayCategory     = Ammo,
        DisplayName         = Shotgun Shells,
        Icon                = ShotgunShells,
        MetalValue          = 1,
        StaticModel         = ShotgunShell,
        WorldStaticModel    = ShotGunShells,
    }
}
```

## Recipe Definitions

Recipes are also defined in script files:

```
module Base
{
    recipe Craft MyTool
    {
        WoodStick,              # Ingredient
        Nails=5,               # Ingredient with count

        Result:MyTool,         # What it creates
        Time:100,              # Time in game units
        Category:Crafting,     # Recipe category

        # Skills required
        Carpentry:2,

        # Optional: tools needed (not consumed)
        ToolUse:Hammer,
        ToolUse:Saw,
    }
}
```

### Recipe with Multiple Results

```
module Base
{
    recipe Disassemble MyItem
    {
        MyItem,

        Result:Nails=10,
        Result:WoodPlank=2,

        Time:50,
        Category:Crafting,
    }
}
```

## Distribution (Loot Spawning)

While you can define items in scripts, you typically control where they spawn using Lua:

```lua
-- media/lua/server/MyModDistribution.lua

function addMyItemsToLoot()
    -- Add to kitchen counters
    table.insert(ProceduralDistributions.list["KitchenCounter"].items, "Base.MyApple")
    table.insert(ProceduralDistributions.list["KitchenCounter"].items, 5)  -- Weight (5%)

    -- Add to toolstores
    table.insert(ProceduralDistributions.list["ToolStoreTools"].items, "Base.MyTool")
    table.insert(ProceduralDistributions.list["ToolStoreTools"].items, 10)  -- Weight (10%)
end

Events.OnGameStart.Add(addMyItemsToLoot)
```

## Complete Example: Custom Medicine

```
module Base
{
    # Item definition
    item MyPainkillers
    {
        Type                = Food,
        DisplayName         = Strong Painkillers,
        Icon                = Pills,
        Weight              = 0.05,
        DisplayCategory     = FirstAid,

        # Not actually food, but uses Food type for consumption
        HungerChange        = 0,
        Calories            = 0,

        # Effects
        ReducePain          = 50,
        PainDelta           = 0.5,

        # Medical properties
        Medical             = true,
        ReplaceOnUse        = PillsEmpty,  # What it becomes when used
    }

    # Empty container
    item MyPainkillerEmpty
    {
        Type                = Normal,
        DisplayName         = Empty Painkiller Bottle,
        Icon                = PillsEmpty,
        Weight              = 0.01,
    }

    # Recipe to craft it
    recipe Craft MyPainkillers
    {
        Pills,
        Pills,
        Pills,

        Result:MyPainkillers,
        Time:100,
        Category:Health,
    }
}
```

## Textures and Icons

Icon filenames reference PNG files in `media/textures/`:

```
media/
└── textures/
    └── Item_MyApple.png       # Referenced as Icon = MyApple
    └── Item_MyTool.png        # Referenced as Icon = MyTool
```

Naming convention: `Item_[IconName].png`

## Module Namespacing

You can use custom modules instead of "Base":

```
module MyMod
{
    item SpecialItem
    {
        # ...
    }
}
```

Reference in Lua:
```lua
player:getInventory():AddItem("MyMod.SpecialItem")
```

## Best Practices

1. **Use descriptive names**: Make item IDs clear and unique
2. **Start with Base module**: Unless you need separation, use the Base module
3. **Balance values**: Test hunger, damage, and weight values in-game
4. **Provide icons**: Always include an icon texture
5. **Document properties**: Add comments explaining special values
6. **Test recipes**: Ensure required items and skills are balanced

## Common Properties Reference

```
# General
Type                        # Normal, Food, Weapon, Drainable, Clothing
DisplayName                 # Display name
Icon                        # Icon name
Weight                      # Weight in kg
DisplayCategory             # Category in inventory

# Food
HungerChange               # Hunger reduction (negative values)
ThirstChange               # Thirst change
Calories                   # Calorie value
Carbohydrates              # Carbs
Proteins                   # Protein
Lipids                     # Fats
DaysFresh                  # Days until spoils
DaysTotallyRotten          # Days until completely rotten
Boredom                    # Boredom change
Unhappiness                # Unhappiness change

# Weapon
MinDamage                  # Minimum damage
MaxDamage                  # Maximum damage
MinRange                   # Minimum range
MaxRange                   # Maximum range
SwingTime                  # Attack speed
CriticalChance             # Crit chance (0-100)
Categories                 # Blunt, Blade, Axe, Spear, etc.
TwoHandWeapon              # true/false

# Drainable
UseDelta                   # Usage per use
UseWhileEquipped           # Can be used while equipped

# Crafting
MetalValue                 # Metal yield
WoodValue                  # Wood yield
```

## Next Steps

- Try the **Practice Exercises** to create your own items
- Explore existing mod scripts for more examples
- Test your items in-game to balance values
