# RimWorld Modding Flashcards

These flashcards are designed to help you gain familiarity with RimWorld modding concepts, techniques, and architecture patterns discovered through analysis of 65 Steam Workshop mods.

## Structure

Each flashcard file contains concepts organized by topic:

### 01_basic_structure.md
Core concepts for starting mod development:
- Folder structure and required files
- About.xml configuration
- Package IDs and naming conventions
- Load order management
- Version management with LoadFolders.xml
- Mod types (Content vs Assembly)
- Framework mods
- Texture referencing
- (10 flashcards)

### 02_xml_definitions.md
XML definition types and their usage:
- ThingDef inheritance and properties
- StatBases for object properties
- RecipeDef ingredients and crafting
- ResearchProjectDef and tech trees
- Building definitions (size, cost, passability)
- Graphics system (graphicClass types)
- Thing categories and organization
- (12 flashcards)

### 03_xml_patching.md
XML patching techniques for compatibility:
- XPath basics and targeting
- PatchOperationReplace
- PatchOperationAdd
- PatchOperationRemove
- PatchOperationSequence
- PatchOperationConditional (mod detection)
- PatchOperationTest
- XPath attribute selection
- Defensive patching patterns
- (10 flashcards)

### 04_csharp_harmony.md
C# modding and Harmony patching:
- Harmony library purpose
- Patch declaration with attributes
- Prefix patches and return semantics
- Special parameters (__instance, __result)
- Postfix patches
- Static constructor initialization
- DefModExtension custom data
- Namespaces and using directives
- Logging and debugging
- Method signature matching
- (10 flashcards)

### 05_advanced_techniques.md
Advanced patterns from real mods:
- Version-specific assemblies
- Vanilla Expanded Framework pattern
- HugsLib integration
- Combat Extended compatibility
- Research tree positioning
- Stack limits and balancing
- Work amount calculations
- Size vs DrawSize
- ThingCategory vs DesignationCategory
- Template definitions (Abstract)
- Conditional assembly loading
- (11 flashcards)

## Total: 53 Flashcards

## How to Use These Flashcards

### For Learning
1. **Read the context** (everything before `:p`) - This provides background and examples
2. **Try to answer** the question (after `:p`)
3. **Check your answer** against the content between `??x` and `x??`
4. **Focus on understanding** - The goal is familiarity, not rote memorization

### Format Explanation

Each flashcard follows this structure:

```markdown
#### Card Title
Background context and explanation. May include code examples showing
the concept in practice. This helps you understand WHY and WHEN to use
the concept, not just WHAT it is.

Example code blocks demonstrate real usage patterns.

:p This is the question you should try to answer
??x
This is the answer with additional details and examples.
Often includes code snippets and best practices.
x??
```

### Learning Strategy

**Beginner Path:**
1. Start with `01_basic_structure.md`
2. Work through each card, reading context carefully
3. Try to answer questions mentally before checking
4. Move to `02_xml_definitions.md` once comfortable
5. Practice with real mod creation alongside flashcards

**Intermediate Path:**
1. Skim `01_basic_structure.md` for gaps in knowledge
2. Focus on `02_xml_definitions.md` and `03_xml_patching.md`
3. Study real mods mentioned in the flashcards
4. Try the practice exercises in `../practice_exercises.md`

**Advanced Path:**
1. Jump to `04_csharp_harmony.md` and `05_advanced_techniques.md`
2. Study the patterns and techniques
3. Look at source code from mods mentioned
4. Apply patterns to your own complex mods

### Spaced Repetition

For best retention:
1. **Day 1:** Review all cards once
2. **Day 3:** Review cards you found difficult
3. **Day 7:** Review all cards again
4. **Day 14:** Review and test by creating small mods
5. **Day 30:** Final review before tackling major project

### Active Learning

Don't just read - **do**:
- After a flashcard about ThingDef, create a ThingDef
- After a flashcard about patches, write a patch
- After a flashcard about Harmony, write a simple prefix patch
- Test everything in-game to see it work

## Companion Resources

### Use alongside:
- **practice_exercises.md** - Hands-on exercises applying these concepts
- **rimworld_mod_architecture.md** - Deep dive reference documentation
- **rimworld_mods_summary.csv** - Find real mods to study

### Recommended Study Flow:
1. Read flashcard for concept
2. Read detailed explanation in architecture guide
3. Find example in CSV (real mod using this pattern)
4. Look at that mod's files
5. Try exercise applying the concept
6. Create your own variation

## Tips for Maximum Learning

### 1. Context is Key
The context before `:p` contains critical information:
- WHY you'd use this technique
- WHEN it's appropriate
- WHAT problems it solves
- Examples from real mods

Don't skip the context to jump to the Q&A!

### 2. Code Examples
Every flashcard with code includes:
- **Pseudocode** for concepts
- **Real XML** for definitions
- **C# examples** for programming
- **Comments** explaining key lines

Type out the code examples to build muscle memory.

### 3. Cross-Reference
Flashcards reference each other:
- "See also: XPath Basics"
- "Related to: DefModExtension"
- "Uses: Harmony Prefix"

Follow these references to build comprehensive understanding.

### 4. Real Mod Examples
Many flashcards mention specific mods:
- "Example: Pick Up And Haul (1279012058)"
- "Pattern used by: Vanilla Expanded Framework"
- "85% of C# mods use this"

Look these up in the CSV and study their actual implementations.

## Flashcard Statistics

- **Total Flashcards:** 53
- **Topics Covered:** 5 main areas
- **Code Examples:** ~80 code blocks
- **Real Mod References:** 20+ specific mods mentioned
- **Difficulty Levels:**
  - Beginner: 20 cards
  - Intermediate: 23 cards
  - Advanced: 10 cards

## Common Patterns Highlighted

The flashcards emphasize patterns seen across multiple mods:

1. **85% of C# mods** use Harmony (covered in 04)
2. **Combat Extended compatibility** pattern (05)
3. **Vanilla Expanded Framework** dependency pattern (05)
4. **HugsLib settings** integration (05)
5. **Version-specific assemblies** for multi-version support (05)
6. **Defensive patching** for compatibility (03)
7. **DefModExtension** for custom data (04)

## Troubleshooting Concepts

If a concept doesn't make sense:

1. **Read the architecture guide** section on that topic
2. **Look at a real mod** using that pattern (check CSV)
3. **Try the practice exercise** that covers it
4. **Test in-game** with dev mode to see it work
5. **Ask the community** (RimWorld Discord, forums)

## Assessment

After studying the flashcards, you should be able to:

**After 01-02 (Basics & XML):**
- [ ] Create a simple content mod with items and buildings
- [ ] Write recipes with proper ingredients
- [ ] Set up research projects with prerequisites
- [ ] Understand vanilla definition structure

**After 03 (Patching):**
- [ ] Write XPath to target specific definitions
- [ ] Use patch operations to modify vanilla content
- [ ] Create compatibility patches for other mods
- [ ] Apply defensive patching patterns

**After 04 (C# & Harmony):**
- [ ] Set up a C# mod project
- [ ] Write Harmony prefix and postfix patches
- [ ] Access game state through special parameters
- [ ] Initialize mods with static constructors
- [ ] Add custom data with DefModExtension

**After 05 (Advanced):**
- [ ] Support multiple RimWorld versions
- [ ] Create framework mods for mod series
- [ ] Implement complex compatibility patterns
- [ ] Balance content using game formulas
- [ ] Apply patterns from professional mods

## Next Steps

After completing these flashcards:

1. **Build something!** - Create a mod applying these concepts
2. **Study source code** - Read open-source mods with understanding
3. **Join the community** - Share your work and learn from others
4. **Contribute** - Help maintain or improve existing mods
5. **Expand** - Create increasingly complex mods

## Credits

These flashcards were created by analyzing 65 RimWorld mods from the Steam Workshop, including works by:
- Haplo, EdB, Orion, Andreas Pardeike (Harmony)
- UnlimitedHugs (HugsLib)
- Oskar Potocki and team (Vanilla Expanded)
- PeteTimesSix, Mehni, and many other talented modders

The patterns and techniques documented here represent collective wisdom from the RimWorld modding community.

---

**Remember:** The goal isn't memorization - it's building familiarity with concepts so you recognize them in real code and can apply them confidently. Good luck with your modding journey!
