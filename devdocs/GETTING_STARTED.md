# Getting Started with Mastery CLI 🚀

Welcome! This guide will help you get up and running with Mastery CLI in just a few minutes.

## What is Mastery CLI?

Mastery CLI is a learning tool that helps you:
- Turn your study notes into interactive flashcards
- Practice coding problems and algorithms
- Track your learning progress over time

Perfect for programming students, job seekers, or anyone wanting to improve their coding skills!

## Quick Setup (2 minutes)

### Step 1: Install
```bash
npm install -g mastery-cli
```

### Step 2: Test it works
```bash
mastery --help
```
You should see a list of available commands.

### Step 3: Try your first flashcard session
```bash
mastery term
```
This will start an interactive flashcard session with built-in programming concepts.

## Your First Algorithm Practice

```bash
mastery dsa
```

This will:
1. Show you recommended coding problems
2. Let you choose a problem to solve
3. Open it in your preferred editor
4. Test your solution
5. Track your progress

## Creating Your Own Flashcards

1. Create a markdown file (e.g., `my-notes.md`):
```markdown
# My JavaScript Notes

## What is a variable?
A container that stores data values.

## What is a function?
A block of code designed to perform a particular task.
```

2. Put it in the `src/terms_data/` folder or configure external paths in settings

3. Run `mastery term` to study your notes!

## Understanding the Interface

When you run commands, you'll see:
- **Questions** - What you need to learn
- **Your answers** - Type what you think
- **Correct answers** - The right answer is revealed
- **Progress tracking** - Your stats are saved automatically

## Useful Tips

- **Stuck on a problem?** Look for hints in the problem description
- **Want to track progress?** Run `mastery report` to see your stats
- **Need different settings?** The tool creates a settings file automatically
- **Want help?** Every command has built-in guidance and prompts

## Common Commands

| Command | What it does |
|---------|--------------|
| `mastery term` | Study flashcards |
| `mastery dsa` | Practice coding problems |
| `mastery quiz` | Mixed learning session |
| `mastery report` | View your progress |
| `mastery --help` | See all commands |

## What's Next?

1. **Daily practice**: Try `mastery term` for 10 minutes each day
2. **Algorithm prep**: Use `mastery dsa` for interview preparation
3. **Track progress**: Check `mastery report` weekly to see improvement
4. **Customize**: Explore settings as you become more comfortable

## Need Help?

- Each command has helpful prompts to guide you
- Check the main README.md for detailed documentation
- The tool is designed to be self-explanatory - just start using it!

---

**Ready to start learning? Try `mastery term` right now! 🎯**