# Flashcard Updates - Smaller Card Format

## Changes Made

All flashcard files have been restructured into smaller, more focused cards:

### Before:
- Long explanations with multiple concepts
- Answers with 50-100+ lines of code
- Single card covering entire topic
- Hard to memorize or review quickly

### After:
- One concept per card
- Concise answers (2-10 lines typically)
- Multiple cards per topic
- Easy to review in spaced repetition

## New Card Counts

| File | Old Cards | New Cards | Status |
|------|-----------|-----------|--------|
| 01-api-patterns.md | 9 | 21 | ✅ Complete |
| 02-input-validation.md | 8 | 26 | ✅ Complete |
| 03-performance-optimization.md | 7 | TBD | 🔄 In Progress |
| 04-algorithms-techniques.md | 5 | TBD | 🔄 In Progress |
| 05-pipelines-model-selection.md | 5 | TBD | 🔄 In Progress |

## Example Transformation

### Old Format (Single Large Card):
```markdown
#### check_array() - Universal Input Validator
[200+ lines of explanation, code examples, multiple concepts]
:p What are the main steps that check_array() performs?
??x
[100+ lines covering all aspects]
x??
```

### New Format (Multiple Focused Cards):
```markdown
#### check_array() Purpose
:p What is the primary purpose of check_array()?
??x
Validates and converts various input types to NumPy arrays
x??

---

#### check_array() Type Conversion
:p What input types can check_array() handle?
??x
- Lists, NumPy arrays, DataFrames, Sparse matrices
x??

---

#### accept_sparse Parameter
:p What does accept_sparse='csr' do?
??x
Converts sparse matrix to CSR format
x??
```

## Benefits

1. **Easier to memorize** - bite-sized information
2. **Better for spaced repetition** - can review individual concepts
3. **Clearer focus** - one question, one answer
4. **Faster review** - skip cards you know well
5. **Progressive learning** - master basics before advanced

## Format Maintained

All cards still use the required format:
- `####` for card titles
- `:p` for prompt
- `??x` and `x??` for answer wrapping
- `---` between cards
- Background context before question
