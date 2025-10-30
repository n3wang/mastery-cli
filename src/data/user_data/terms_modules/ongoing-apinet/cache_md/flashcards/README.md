# Flashcards Index

This folder contains flashcards for active learning and concept reinforcement.

## Available Flashcard Sets

### [SignalR Concepts](signalr-concepts.md)
Covers real-time communication fundamentals:
- What is SignalR and how it differs from REST
- Hub pattern and key components
- SignalR Groups for message routing
- Client targeting strategies
- Message flow patterns
- MessagePack protocol benefits
- Connection lifecycle events
- Configuration and setup

**Topics:** 8 flashcards covering SignalR fundamentals

---

### [Game Architecture](game-architecture.md)
Covers architectural patterns and design decisions:
- IGameRules interface and Strategy Pattern
- Rules Registry pattern for extensibility
- Server-authoritative architecture
- JSONB for flexible state storage
- Sequence numbers for optimistic concurrency
- Idempotency pattern for duplicate prevention
- Entity relationships and EF Core
- Composite indexes and constraints
- Scoped database access in singleton services
- Tuple return pattern for error handling

**Topics:** 10 flashcards covering architecture and design patterns

---

### [Chess Implementation](chess-implementation.md)
Covers game-specific logic and algorithms:
- Chess state structure and record types
- Time control algorithm with increment
- Move validation stages
- Command envelope pattern
- Resignation logic
- Immutable state updates
- Square validation

**Topics:** 7 flashcards covering chess implementation details

---

### [Real-Time Patterns](real-time-patterns.md)
Covers real-time communication patterns and best practices:
- Event broadcasting pattern
- Dual event + state messaging
- Connection state management
- State resynchronization after reconnect
- Group-based routing for performance
- Lazy database loading with Include()
- N+1 query problem
- Try-catch in hub methods

**Topics:** 8 flashcards covering real-time patterns and performance

---

## Total: 33 Flashcards

## How to Use These Flashcards

### Format
Each flashcard follows this structure:
```
#### Topic Title
Background context and explanation

:p Question goes here?
??x
Answer with code examples and detailed explanation
x??
```

### Study Tips

1. **Read the Context First**
   - Don't jump straight to the question
   - Understand the background and why it matters

2. **Try to Answer**
   - Cover the answer section (`??x ... x??`)
   - Think through your answer
   - Try to explain it out loud

3. **Review the Answer**
   - Read the detailed explanation
   - Study the code examples
   - Understand the "why" not just the "what"

4. **Spaced Repetition**
   - Review cards periodically
   - Focus more on cards you struggle with
   - Revisit successful cards less frequently

5. **Apply the Knowledge**
   - Try to identify these patterns in the codebase
   - Use the concepts in your own code
   - Teach the concept to someone else

### Study Sessions

**Quick Review (15-20 min):**
- Pick one flashcard file
- Go through all cards in order
- Focus on understanding

**Deep Dive (45-60 min):**
- Study one flashcard file thoroughly
- Look up related code in the project
- Try to modify or extend the examples

**Full Review (2-3 hours):**
- Go through all flashcard files
- Test yourself without looking at answers
- Review the actual implementation in code

## Topics Covered

### Fundamentals
- Real-time communication with SignalR
- WebSocket vs HTTP differences
- Event-driven architecture

### Architecture
- Pluggable design patterns (Strategy, Registry)
- Server-authoritative architecture
- Flexible data storage (JSONB)
- Service lifetimes and dependency injection

### Implementation
- Game rules and validation
- Time control algorithms
- Immutable state management
- Command pattern

### Real-Time Patterns
- Event broadcasting
- Connection management
- State synchronization
- Performance optimization

### Database
- Entity relationships
- Composite indexes
- N+1 query prevention
- Scoped access patterns

## Flashcard Statistics

- **SignalR Concepts:** 8 cards
- **Game Architecture:** 10 cards
- **Chess Implementation:** 7 cards
- **Real-Time Patterns:** 8 cards

**Total:** 33 flashcards covering the complete board game platform implementation.

## Contributing

When adding new features to the project:
1. Create flashcards for new patterns/concepts
2. Follow the exact format (`:p`, `??x`, `x??`)
3. Include background context and code examples
4. Update this index with new flashcard sets
5. Focus on familiarity and understanding, not memorization
