# RimWorld Modding Learning Resources

Welcome to your RimWorld modding learning hub! This documentation package was created by analyzing 65 Steam Workshop mods to provide you with comprehensive learning resources.

## What's Included

This documentation package contains:

### 1. **rimworld_mods_summary.csv**
A comprehensive spreadsheet catalog of all 65 mods analyzed, including:
- Workshop ID
- Mod name and author
- Package ID
- Supported RimWorld versions
- Dependencies
- Mod type classification
- Folder structure details
- Brief descriptions

**Use this to**: Browse example mods, find mods to study, understand the diversity of the modding ecosystem.

### 2. **rimworld_mod_architecture.md**
A complete architectural guide covering:
- Mod types and patterns
- Directory structure standards
- About.xml configuration
- XML definition types (ThingDefs, RecipeDefs, ResearchProjectDefs, etc.)
- C# assembly modding basics
- Harmony patching
- Version management
- Dependencies and load order
- Best practices

**Use this to**: Understand the fundamental architecture and structure of RimWorld mods.

### 3. **practice_exercises.md**
Six progressive hands-on exercises (XML-focused):

1. **Exercise 1**: Create Your First Simple Item Mod
   - Beginner level, 15-20 minutes
   - Learn basic mod structure and item creation

2. **Exercise 2**: Add a Research Project
   - Beginner level, 20-25 minutes
   - Learn to create research and gate content

3. **Exercise 3**: Create a Simple Building
   - Beginner-Intermediate level, 30-40 minutes
   - Learn building creation and stats

4. **Exercise 4**: Use XML Patches to Modify Vanilla Content
   - Intermediate level, 25-30 minutes
   - Learn XPath and patch operations

5. **Exercise 5**: Add Compatibility Between Mods
   - Intermediate level, 20-25 minutes
   - Learn conditional patches and mod detection

6. **Exercise 6**: Create a Quality-of-Life Feature
   - Intermediate level, 30 minutes
   - Apply knowledge to create practical mods

**Use this to**: Learn by doing! Follow step-by-step instructions to build real mods.

### 4. **practice_exercises_advanced.md**
Six advanced C# and Harmony exercises:

7. **Exercise 7**: Your First Harmony Patch
   - Intermediate level, 45-60 minutes
   - C# project setup, Harmony basics, logging

8. **Exercise 8**: Modify Game Behavior with Postfix
   - Intermediate level, 40-50 minutes
   - Postfix patches, return value modification

9. **Exercise 9**: Using DefModExtension for Custom Data
   - Intermediate-Advanced level, 60-90 minutes
   - DefModExtension, custom classes, XML+C# integration

10. **Exercise 10**: HugsLib Integration - Mod Settings
    - Advanced level, 60-75 minutes
    - HugsLib, mod settings UI, configuration

11. **Exercise 11**: Complex Harmony Transpiler
    - Very Advanced level, 90-120 minutes
    - IL code, transpilers, performance optimization

12. **Exercise 12**: Framework Pattern - Create Shared Library
    - Advanced level, 120+ minutes
    - Framework creation, multi-mod architecture, API design

**Use this to**: Master C# modding and advanced patterns used by professional modders.

### 5. **flashcards/** folder
53 comprehensive flashcards across 5 topic areas:

- **01_basic_structure.md** - 10 cards on mod fundamentals
- **02_xml_definitions.md** - 12 cards on XML def types
- **03_xml_patching.md** - 10 cards on patching techniques
- **04_csharp_harmony.md** - 10 cards on C# and Harmony
- **05_advanced_techniques.md** - 11 cards on advanced patterns

**Use this to**: Build familiarity with concepts through spaced repetition and active learning. Each flashcard includes context, examples, and detailed answers.

## Learning Path

### For Complete Beginners

1. **Start here**: Read the Introduction and Mod Types sections in `rimworld_mod_architecture.md`
2. **Do Exercise 1**: Create your first simple item mod
3. **Read**: XML Definitions section in the architecture guide
4. **Do Exercises 2-3**: Build upon your first mod
5. **Browse**: The CSV to find simple content mods to study
6. **Do Exercises 4-6**: Learn advanced XML techniques

### For Programmers

1. **Start here**: Read the entire `rimworld_mod_architecture.md`, focusing on C# sections
2. **Do Exercises 1-3**: Get familiar with XML modding first (practice_exercises.md)
3. **Read**: C# Assembly Mods section in detail
4. **Study**: Open-source C# mods (check Source/ folders in the workshop directory)
5. **Do Exercises 4-6**: Master XML patching (practice_exercises.md)
6. **Do Exercises 7-9**: Learn Harmony and C# basics (practice_exercises_advanced.md)
7. **Do Exercises 10-12**: Master advanced patterns (practice_exercises_advanced.md)
8. **Build**: Your own complex C# mod series

### For Intermediate Modders

1. **Reference**: Use the CSV to find mods similar to what you want to create
2. **Study**: Read the source code and Defs from those mods
3. **Apply**: Use the architecture guide as a reference while building
4. **Do Advanced Exercises**: Exercises 7-12 for C# and Harmony (practice_exercises_advanced.md)
5. **Challenge**: Try the exercise extensions and create your own variations
6. **Contribute**: Help maintain open-source mods or create your own mod series

## Recommended Study Mods

Based on the analysis, here are excellent mods to study:

### Best XML-Only Mods to Learn From
1. **Misc. Training** (717575199) - Simple, clean structure
2. **Fire Extinguisher** (1589401542) - Good use of patches
3. **Medical Training** (1214615921) - Straightforward content mod

### Best C# Mods to Learn From
1. **Pick Up And Haul** (1279012058) - Includes source code, well-documented
2. **Simple Sidearms** (927155256) - Good Harmony examples
3. **Defensive Positions** (761219125) - Complex but clean code

### Best Framework Examples
1. **Harmony** (2009463077) - The foundation
2. **HugsLib** (818773962) - Shared library pattern
3. **Vanilla Expanded Framework** (2023507013) - Comprehensive framework

## Quick Reference

### Essential Files
- `About/About.xml` - Always required
- `Defs/*.xml` - Content definitions
- `Patches/*.xml` - Modifications to existing content
- `Assemblies/*.dll` - C# code (when needed)

### Common Def Types
- **ThingDefs** - Items, buildings, weapons, apparel
- **RecipeDefs** - Crafting recipes
- **ResearchProjectDefs** - Research projects
- **JobDefs** - Pawn jobs
- **WorkGiverDefs** - Job assignment

### Package ID Format
`Author.ModName` (e.g., `JohnDoe.AmazingWeapons`)

### Def Naming Convention
`ModPrefix_DescriptiveName` (e.g., `MyMod_GoldenSword`)

## Tools You'll Need

### Required
- **Text Editor**: VS Code, Notepad++, or Sublime Text
- **RimWorld**: Installed with Dev Mode enabled

### Recommended
- **Visual Studio Community**: For C# modding (free)
- **dnSpy**: To decompile and study RimWorld code
- **Git**: For version control
- **Paint.NET or GIMP**: For texture creation

## Getting Help

### Official Resources
- **Wiki**: https://rimworldwiki.com/wiki/Modding_Tutorials
- **Forums**: https://ludeon.com/forums/index.php?board=14.0

### Community
- **Discord**: https://discord.gg/rimworld
- **Reddit**: r/RimWorldMods
- **Steam**: Workshop discussions

### Debug Tools
- **F11**: Debug actions menu (spawn items, instant research, etc.)
- **Ctrl+F12**: Generate debug log for error reporting
- **Dev Mode**: Enable in options for debug tools

## Common First Questions

**Q: Where do I put my mod?**
A: `[RimWorld Install]/Mods/YourModName/`

**Q: How do I test my mod?**
A: Enable Dev Mode in options, use F11 for debug actions, check logs with Ctrl+F12

**Q: Why isn't my mod showing up?**
A: Check that About/About.xml exists and is valid XML

**Q: Can I edit mods I downloaded?**
A: Yes! They're in `steamapps/workshop/content/294100/[ModID]/`

**Q: Do I need to know programming?**
A: Not for XML mods! C# is only needed for complex behavior changes.

**Q: How do I publish to Steam Workshop?**
A: Use RimWorld's in-game mod manager (Dev Mode > Upload to Steam Workshop)

## Next Steps After Completing Exercises

1. **Create Your Own Mod**
   - Identify a feature you want
   - Plan it out on paper
   - Build it incrementally
   - Test thoroughly

2. **Contribute to Existing Mods**
   - Many mods are open-source
   - Fix bugs, add features
   - Learn from maintainers

3. **Join the Community**
   - Share your creations
   - Help other modders
   - Stay updated on best practices

4. **Advanced Topics to Explore**
   - Custom textures and graphics
   - Sound design
   - Advanced Harmony transpilers
   - Multi-threading considerations
   - Save compatibility

## File Locations Quick Reference

### Vanilla Game Files (for reference)
```
RimWorld/
└── Data/
    └── Core/
        ├── Defs/          (Study vanilla definitions)
        ├── Languages/     (Localization examples)
        └── Textures/      (Vanilla textures you can reference)
```

### Your Workshop Mods (for studying)
```
steamapps/workshop/content/294100/
├── 717575199/    (Misc. Training)
├── 927155256/    (Simple Sidearms)
└── [etc...]
```

### Your Custom Mods
```
RimWorld/Mods/
├── YourFirstMod/
├── YourSecondMod/
└── [etc...]
```

## Tips for Success

1. **Start Small**: Don't try to build a massive overhaul as your first mod
2. **Study Examples**: Look at how vanilla and existing mods solve problems
3. **Test Frequently**: Test after every small change
4. **Use Version Control**: Git saves you from mistakes
5. **Read Error Logs**: The debug log tells you what went wrong
6. **Ask for Help**: The community is friendly and helpful
7. **Document Your Code**: Future you will thank you
8. **Be Patient**: Modding has a learning curve, but it's rewarding

## Contributing

If you find errors in this documentation or want to add examples:
1. Note the file and section
2. Share your improvements
3. Help other learners!

## Credits

This documentation was created by analyzing 65 RimWorld mods from the Steam Workshop, including works by:
- Haplo, EdB, Orion, Andreas Pardeike, UnlimitedHugs, PeteTimesSix, Oskar Potocki, Mehni, and many others

Special thanks to the RimWorld modding community for creating an amazing, well-documented ecosystem.

## License

This documentation is provided for educational purposes. Individual mods have their own licenses - check each mod's LICENSE file before using their code.

---

**Ready to start?** Open `practice_exercises.md` and begin with Exercise 1!

**Need theory first?** Read through `rimworld_mod_architecture.md`

**Want to browse examples?** Open `rimworld_mods_summary.csv` in Excel or a text editor

Happy modding! 🎮✨
