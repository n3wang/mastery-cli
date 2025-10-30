# Excalidraw Flashcards

This folder contains flashcards for learning the Excalidraw codebase concepts, patterns, and architecture. The flashcards use a specific format designed for spaced repetition learning.

## Format

Each flashcard follows this structure:

```markdown
#### Card Title
Background context and explanation of the concept, including relevant formulas,
patterns, or data. Code examples explaining the logic in detail.

:p Question or prompt goes here?
??x
Answer with detailed explanation and code examples.
x??
```

- **`---`** separates cards
- **`####`** Level 4 header for card title
- **`:p`** Marks the question/prompt
- **`??x`** and **`x??`** Wrap the answer

## Flashcard Sets

### 1. State Management (`state-management.md`)
**Topics covered:**
- Jotai atomic state pattern
- Jotai-scope for multiple instances
- AppState structure
- React Context usage
- State immutability
- Hybrid state management
- State persistence
- State update flow
- Computed state with derived atoms

**Key concepts:** Reactive state, fine-grained updates, scope isolation, context providers

---

### 2. Element System (`element-system.md`)
**Topics covered:**
- Element type hierarchy (11 types)
- mutateElement pattern
- Element versioning (version + versionNonce)
- Scene class architecture
- Fractional indexing
- Arrow binding system
- Soft deletion strategy
- Common element properties
- newElement factory pattern

**Key concepts:** Immutable updates, collaboration support, type safety, element management

---

### 3. Action System (`action-system.md`)
**Topics covered:**
- Action architecture
- perform function pattern
- StoreAction enum (undo/redo)
- Keyboard shortcuts with keyTest
- Action predicates
- Action registration
- Action categories
- Context menu integration
- Form data pattern

**Key concepts:** Standardized operations, keyboard shortcuts, undo/redo, UI integration

---

### 4. Rendering (`rendering.md`)
**Topics covered:**
- Three-canvas architecture
- RoughJS for hand-drawn style
- Viewport culling optimization
- Canvas coordinate systems
- renderElement function
- Canvas save/restore pattern
- Interactive scene rendering
- SVG export rendering
- Render performance optimizations

**Key concepts:** Multi-canvas rendering, performance optimization, coordinate transformation

---

### 5. Architecture Patterns (`architecture-patterns.md`)
**Topics covered:**
- Monorepo with Yarn Workspaces
- Library vs app separation
- Portal tunneling with tunnel-rat
- Radix UI for accessibility
- TypeScript discriminated unions
- Collaboration techniques
- Path aliases
- Build system (esbuild + Vite)
- Immutability pattern

**Key concepts:** Monorepo organization, accessibility, type safety, collaboration, build tools

## How to Use These Flashcards

### Study Approach

1. **Read the context first** - Each card has background information above the `:p` prompt
2. **Try to answer** - Cover the answer and attempt to recall or reason through the answer
3. **Check your answer** - Compare with the detailed answer provided
4. **Review code examples** - Understand the patterns through code

### Learning Path

**Beginner path:**
1. Start with **State Management** - Understand how data flows
2. Move to **Element System** - Learn how drawing objects work
3. Then **Action System** - See how operations are performed
4. Study **Rendering** - Understand how things appear on screen
5. Finally **Architecture Patterns** - Grasp the overall design

**Focused learning:**
- Working on UI features? Focus on **State Management** and **Rendering**
- Adding element types? Focus on **Element System** and **Rendering**
- Creating actions? Focus on **Action System**
- Understanding structure? Focus on **Architecture Patterns**

### Spaced Repetition

For best retention:
1. Review cards daily for the first week
2. Then every 2-3 days for a month
3. Then weekly for maintenance

## Quick Reference by Topic

### State
- How is state managed? → `state-management.md` - Jotai Atomic State Pattern
- Multiple instances? → `state-management.md` - Jotai Scope
- State structure? → `state-management.md` - AppState Structure

### Elements
- How to modify elements? → `element-system.md` - mutateElement Pattern
- Element types? → `element-system.md` - Element Type Hierarchy
- Versioning? → `element-system.md` - Element Versioning

### Actions
- How do actions work? → `action-system.md` - Action System Architecture
- Keyboard shortcuts? → `action-system.md` - keyTest
- Undo/redo? → `action-system.md` - StoreAction Enum

### Rendering
- Canvas structure? → `rendering.md` - Three-Canvas Architecture
- Hand-drawn style? → `rendering.md` - RoughJS
- Performance? → `rendering.md` - Render Performance Optimization

### Architecture
- Project structure? → `architecture-patterns.md` - Monorepo
- Library vs app? → `architecture-patterns.md` - Library vs App Separation
- Collaboration? → `architecture-patterns.md` - Collaboration Techniques

## Card Statistics

| Set | Cards | Difficulty | Prerequisites |
|-----|-------|------------|---------------|
| State Management | 10 | Beginner-Intermediate | React, TypeScript |
| Element System | 9 | Beginner-Intermediate | TypeScript, OOP concepts |
| Action System | 9 | Intermediate | React, Event handling |
| Rendering | 8 | Intermediate-Advanced | Canvas API, React |
| Architecture Patterns | 8 | Intermediate-Advanced | Monorepos, Build tools |
| **Total** | **44** | - | - |

## Tips for Effective Learning

### Understanding vs Memorization
These flashcards focus on **understanding concepts** rather than pure memorization. The goal is familiarity with:
- How patterns work
- Why they're used
- When to apply them
- How to implement them

### Code Examples
Every card includes code examples showing:
- ✅ Correct patterns
- ❌ Common mistakes
- Pseudocode explaining logic
- Real-world usage

### Practical Application
After studying flashcards:
1. Try the exercises in `docs/exercise-*.md`
2. Explore the actual codebase
3. Make small changes to practice
4. Create your own features

## Contributing

Found an error or want to add more cards?
1. Follow the format above
2. Include detailed context
3. Provide code examples
4. Explain with pseudocode when helpful
5. Submit a pull request

## Related Resources

- **[Architecture Overview](../architecture-overview.md)** - Comprehensive architecture guide
- **[Exercise 1](../exercise-1-add-ui-button.md)** - Practice adding UI components
- **[Exercise 2](../exercise-2-create-action.md)** - Practice creating actions
- **[Main README](../README.md)** - Documentation index

---

**Happy learning!** These flashcards are designed to build deep familiarity with Excalidraw's codebase through understanding core concepts and patterns.
