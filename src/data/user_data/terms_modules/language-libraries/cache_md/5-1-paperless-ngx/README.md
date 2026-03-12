# Paperless-NGX Flashcards

This folder contains flashcards to help you learn and understand the concepts, patterns, and techniques used in the Paperless-NGX codebase.

## Purpose

These flashcards are designed for **familiarity and understanding**, not pure memorization. Each card includes:
- **Context and background** to help you understand the "why"
- **Code examples** with detailed explanations
- **Real-world applications** from the Paperless-NGX codebase

## Flashcard Format

The flashcards use a specific format compatible with spaced repetition software:

```
#### Card Title
Background information, context, and code examples go here.

This section explains the concept in detail with examples.

:p This is the prompt/question
??x
This is the answer

The answer may include code, explanations, or bullet points.
x??

---
```

**Format elements**:
- `####` - Level 4 header for the card title
- `:p` - Denotes the prompt/question
- `??x` - Start of answer
- `x??` - End of answer
- `---` - Separator between cards

## Flashcard Sets

### 01-django-backend-concepts.md
**Topics covered:**
- Django Models & Database (fields, migrations, QuerySets)
- Celery & Asynchronous Tasks
- Django REST Framework (serializers, ViewSets, permissions)
- Django Signals
- Document Processing Pipeline
- Parser Selection Strategy

**Best for:** Backend developers, understanding the Django/Python architecture

### 02-angular-frontend-concepts.md
**Topics covered:**
- Angular Component Architecture
- RxJS and Reactive Programming (Observables, operators, subscriptions)
- Angular Services and Dependency Injection
- Templates and Data Binding
- HTTP and Interceptors
- Routing

**Best for:** Frontend developers, understanding the Angular/TypeScript architecture

### 03-architecture-design-patterns.md
**Topics covered:**
- REST API Design Principles
- Design Patterns (Repository, Strategy, Plugin)
- Architectural Patterns (MVC/MVT, SPA, Microservices)
- Data Flow Patterns
- Event-Driven Architecture

**Best for:** Understanding high-level architecture and design decisions

### 04-advanced-techniques.md
**Topics covered:**
- Performance Optimization (QuerySet optimization, caching, indexing)
- Security Techniques (token authentication, object-level permissions)
- Testing Techniques (factories, mocking)
- Full-Text Search (Whoosh integration)
- Docker & Deployment (multi-stage builds)

**Best for:** Advanced developers, production deployment, optimization

## How to Use

### Option 1: Manual Review
Simply open the markdown files and read through the cards. The detailed explanations before each question will help build context.

### Option 2: Spaced Repetition Software
Import these flashcards into spaced repetition software like:
- **Anki** (most popular)
- **RemNote**
- **SuperMemo**

Most tools support importing from text files with custom separators.

### Option 3: Progressive Learning
1. Start with **01-django-backend-concepts.md** if you're working on backend
2. Move to **02-angular-frontend-concepts.md** for frontend work
3. Study **03-architecture-design-patterns.md** to understand the big picture
4. Review **04-advanced-techniques.md** when optimizing or deploying

## Study Tips

1. **Read the context first**: Don't skip the explanation before the question
2. **Run the code**: Try the examples in your local development environment
3. **Find it in the codebase**: Search for the actual implementation in Paperless-NGX
4. **Build something**: Use the practice exercises in `docs/exercise-*.md` to apply what you learned
5. **Teach others**: Explaining concepts reinforces understanding

## Contributing

If you find errors or want to add more flashcards:
1. Follow the existing format
2. Include detailed context and code examples
3. Focus on understanding, not memorization
4. Add practical examples from the Paperless-NGX codebase

## Related Resources

- [Architecture Documentation](../architecture.md) - High-level overview
- [Practice Exercise 1](../exercise-01-add-document-color-field.md) - Backend exercise
- [Practice Exercise 2](../exercise-02-add-document-count-badge.md) - Frontend exercise
- [Development Guide](../development.md) - Development environment setup

## Card Statistics

- **Total flashcard files**: 4
- **Django/Backend concepts**: ~12 cards
- **Angular/Frontend concepts**: ~11 cards
- **Architecture & Patterns**: ~9 cards
- **Advanced Techniques**: ~9 cards
- **Total cards**: ~41 cards

## License

These flashcards are part of the Paperless-NGX documentation and follow the same license as the project.
