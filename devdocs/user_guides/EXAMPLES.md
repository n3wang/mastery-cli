# Mastery CLI Examples & Usage Patterns

This guide shows you real examples of how to use Mastery CLI effectively. Perfect for beginners who learn better by seeing actual usage!

## 📚 Basic Flashcard Study

### Start your first study session
```bash
mastery term
```
**What happens:** Opens an interactive flashcard session using built-in programming concepts.

### Study your own notes
1. Create a markdown file called `my-notes.md`:
```markdown
# JavaScript Basics

## What is a variable?
A container that stores data values that can be changed later.

## What is a function?
A reusable block of code that performs a specific task.

## What is an array?
A data structure that can hold multiple values in a single variable.
```

2. Save it in the `src/terms_data/` folder
3. Run `mastery term` and your notes will appear as flashcards!

## 🧠 Algorithm Practice

### Practice recommended problems
```bash
mastery dsa
```
**What happens:** Shows you 3-5 problems chosen based on your skill level and progress.

### Practice all available problems
```bash
mastery dsa --all
```
**What happens:** Browse through all coding problems instead of just recommendations.

### Example workflow:
1. Run `mastery dsa`
2. Choose "two-sum" problem
3. Code editor opens with the problem template
4. Write your solution
5. Save and close editor
6. Choose "execute test cases" to check your answer
7. Choose "Submit" when tests pass
8. Your progress is automatically saved!

## 📊 Progress & Reports

### See your learning stats
```bash
mastery report
```
**Shows you:**
- Problems solved this week
- Flashcards studied today
- Weekly learning streaks
- Areas that need more practice

### Check specific skill progress
```bash
mastery entries algo
```
**Shows:** All your algorithm practice sessions and scores

## 🎯 Mixed Learning Sessions

### Quick quiz (flashcards + coding)
```bash
mastery quiz
```
**Perfect for:** Daily 10-minute learning sessions

### Study specific topics
If you have notes about React:
```bash
mastery term
# Then select React-related flashcards when prompted
```

## 💡 Pro Tips & Workflows

### Daily Learning Routine (15 minutes)
```bash
# Morning: Quick flashcard review
mastery term

# Evening: One coding problem
mastery dsa
```

### Weekly Review
```bash
# Check your progress
mastery report

# Practice areas you've been avoiding
mastery dsa --all
```

### Create Topic-Focused Study Sets

**For JavaScript Interview Prep:**
Create `javascript-interview.md`:
```markdown
# JavaScript Interview Questions

## What is closure?
A function that retains access to variables from its outer scope even after the outer function returns.

## Explain event bubbling
When an event occurs on an element, it first runs handlers on it, then on its parent, then all the way up.

## What's the difference between let and var?
let has block scope and temporal dead zone, var has function scope and hoisting.
```

**For Data Structures:**
Create `data-structures.md`:
```markdown
# Data Structures Study Guide

## When to use Arrays vs Linked Lists?
Arrays: Random access, cache locality. Linked Lists: Dynamic size, frequent insertions/deletions.

## Hash Table time complexity?
Average: O(1) insert, delete, search. Worst: O(n) with poor hash function.
```

## 🛠️ Customization Examples

### Configure your code editor
The tool automatically detects VS Code, but you can customize:
1. First run creates `src/user_data/settings.json`
2. Edit the `"editor"` field to your preference
3. Available options: `"vscode"`, `"vim"`, `"nano"`, `"notepad"`

### Adjust study session length
In `settings.json`, modify:
```json
{
  "study_session_length": 10,
  "problems_per_session": 3
}
```

## 🔄 Advanced Patterns

### Spaced Repetition Workflow
```bash
# Day 1: Learn new concepts
mastery term

# Day 2: Review + new coding problem  
mastery quiz
mastery dsa

# Day 7: Review what you learned last week
mastery report
# Practice problems you haven't solved recently
mastery dsa
```

### Interview Preparation (4-week plan)
```bash
# Week 1-2: Build foundation
mastery term    # Study CS concepts daily
mastery dsa     # 1-2 easy problems daily

# Week 3: Increase difficulty  
mastery dsa --all    # Choose medium problems
mastery quiz         # Mixed review

# Week 4: Mock interviews
mastery dsa --all    # Random hard problems
mastery report       # Track weak areas
```

## 🚨 Common Beginner Mistakes

### ❌ Wrong: Jumping to hard problems
```bash
mastery dsa --all
# Then picking the hardest problem first
```

### ✅ Right: Follow the recommendations
```bash
mastery dsa
# The tool suggests problems based on your level
```

### ❌ Wrong: Studying without reviewing
```bash
mastery term
# Never checking progress
```

### ✅ Right: Regular progress checks
```bash
mastery term
mastery report    # Check what you learned
```

### ❌ Wrong: Irregular practice
Using the tool once a week randomly.

### ✅ Right: Consistent daily practice
```bash
# Every day, just 10 minutes:
mastery term      # 5 minutes flashcards
mastery dsa       # 1 coding problem
```

## 📝 Creating Effective Study Notes

### Good flashcard format:
```markdown
## What is Big O notation?
A way to describe how the runtime of an algorithm changes as the input size grows.

## How to reverse a string in JavaScript?
str.split('').reverse().join('')
```

### Bad flashcard format:
```markdown
## JavaScript stuff
There's lots of things in JavaScript like variables and functions and arrays and objects and...
```

**Rule:** One concept per flashcard, clear question and answer.

---

**Ready to start? Try this beginner sequence:**

1. `mastery term` - Study for 5 minutes
2. `mastery dsa` - Solve one easy problem  
3. `mastery report` - See your progress!

Repeat daily and watch your skills grow! 🚀