# Scikit-learn Flashcards

Flashcards for mastering scikit-learn concepts, algorithms, and implementation techniques. These cards focus on **understanding** rather than memorization, with detailed explanations, code examples, and mathematical intuition.

## 📚 Flashcard Sets

### [01 - API Patterns](./01-api-patterns.md)
Core sklearn API design patterns and conventions
- **Topics:** BaseEstimator, get_params/set_params, trailing underscore convention, fit/transform/predict patterns, mixins, clone(), _validate_data
- **Focus:** Understanding the sklearn API philosophy
- **Difficulty:** Beginner to Intermediate
- **Cards:** 21 focused flashcards (updated to smaller format!)

### [02 - Input Validation](./02-input-validation.md)
Data validation and type handling throughout sklearn
- **Topics:** check_array(), check_X_y(), check_is_fitted(), accept_sparse, dtype conversion, memory layout (C vs F-contiguous), force_all_finite
- **Focus:** Robust input handling and data format optimization
- **Difficulty:** Intermediate
- **Cards:** 26 focused flashcards (updated to smaller format!)

### [03 - Performance Optimization](./03-performance-optimization.md)
High-performance computing techniques in sklearn
- **Topics:** Cython optimization, nogil parallelism, memory views, BLAS/LAPACK integration, cache-friendly algorithms, SIMD vectorization, sparse matrix formats
- **Focus:** How sklearn achieves C-level performance
- **Difficulty:** Advanced
- **Cards:** 7 flashcards

### [04 - Algorithms & Techniques](./04-algorithms-techniques.md)
Machine learning algorithms and their implementation
- **Topics:** Coordinate descent (Lasso), K-D trees, Barnes-Hut (t-SNE), Random Forests, Gradient Boosting
- **Focus:** Mathematical intuition and implementation details
- **Difficulty:** Intermediate to Advanced
- **Cards:** 5 flashcards

### [05 - Pipelines & Model Selection](./05-pipelines-model-selection.md)
Workflow patterns and best practices
- **Topics:** Pipeline composition, GridSearchCV, cross-validation, feature selection, preventing data leakage
- **Focus:** Production-ready ML workflows
- **Difficulty:** Intermediate
- **Cards:** 5 flashcards

## 📖 How to Use These Flashcards

### Format Convention

Each flashcard follows this structure:

```markdown
#### Card Title

Background context and explanation with code examples.

Mathematical notation and formulas when relevant.

:p Question prompt here?
??x
Answer with detailed explanation.

Code examples showing the concept.

**Key insights** and practical tips.
x??
```

**Symbols:**
- `:p` - Marks the **prompt** (question)
- `??x` and `x??` - Wrap the **answer**
- `---` - Separates flashcards
- `####` - Card title (level 4 heading)

### Recommended Study Approach

#### 1. Progressive Learning Path

**Beginners:**
1. Start with [01 - API Patterns](./01-api-patterns.md)
2. Move to [05 - Pipelines & Model Selection](./05-pipelines-model-selection.md)
3. Study [02 - Input Validation](./02-input-validation.md)
4. Complete with [04 - Algorithms & Techniques](./04-algorithms-techniques.md)
5. Advanced: [03 - Performance Optimization](./03-performance-optimization.md)

**Intermediate Developers:**
1. Review [01 - API Patterns](./01-api-patterns.md) (if needed)
2. Focus on [04 - Algorithms & Techniques](./04-algorithms-techniques.md)
3. Study [03 - Performance Optimization](./03-performance-optimization.md)
4. Master [02 - Input Validation](./02-input-validation.md) details

**Advanced/Contributors:**
- Focus on [03 - Performance Optimization](./03-performance-optimization.md)
- Deep dive into algorithm implementations in [04]
- Study source code references in each card

#### 2. Active Recall Practice

Instead of just reading:

1. **Cover the answer** - Try to answer from memory first
2. **Code it out** - Implement the concept yourself
3. **Explain it** - Teach the concept to someone else
4. **Apply it** - Use in a real project
5. **Connect it** - Link to related concepts from other cards

#### 3. Spaced Repetition Schedule

- **Day 1:** Initial review
- **Day 3:** First repetition
- **Day 7:** Second repetition
- **Day 14:** Third repetition
- **Day 30:** Fourth repetition
- **Every 2-3 months:** Maintenance review

### Reading the Code Examples

Flashcards include three types of code:

**1. Python/NumPy Examples:**
```python
# Executable Python code you can run
X = np.array([[1, 2], [3, 4]])
```

**2. Cython Examples:**
```cython
# Optimized Cython code from sklearn
cdef double value  # C variable
```

**3. Pseudocode:**
```python
# High-level algorithm description
def algorithm():
    # Step 1: Initialize
    # Step 2: Iterate
    # Step 3: Return result
```

**4. C/Assembly Snippets:**
```c
// Low-level implementation details
double* ptr = &array[0];
```

## 🎯 Learning Objectives by Topic

### API Patterns
By mastering these cards, you will:
- ✅ Understand sklearn's design philosophy
- ✅ Know why every estimator follows the same pattern
- ✅ Be able to create sklearn-compatible custom estimators
- ✅ Understand the role of each mixin class
- ✅ Use get_params/set_params effectively

### Input Validation
By mastering these cards, you will:
- ✅ Know when and how to use check_array() vs check_X_y()
- ✅ Understand memory layout impact on performance
- ✅ Handle sparse matrices efficiently
- ✅ Write robust estimators that validate inputs properly
- ✅ Debug dtype and shape errors quickly

### Performance Optimization
By mastering these cards, you will:
- ✅ Understand why Cython is used in sklearn
- ✅ Know how nogil enables parallelism in Python
- ✅ Write cache-friendly algorithms
- ✅ Leverage BLAS/LAPACK effectively
- ✅ Choose appropriate sparse matrix formats
- ✅ Optimize numerical code for modern CPUs

### Algorithms & Techniques
By mastering these cards, you will:
- ✅ Understand the math behind coordinate descent
- ✅ Know how K-D trees enable fast nearest neighbor search
- ✅ Grasp the Barnes-Hut approximation for t-SNE
- ✅ Understand why Random Forests work so well
- ✅ Know the connection between gradient boosting and optimization

### Pipelines & Model Selection
By mastering these cards, you will:
- ✅ Prevent data leakage in ML workflows
- ✅ Use Pipelines effectively
- ✅ Understand cross-validation thoroughly
- ✅ Perform hyperparameter tuning correctly
- ✅ Build production-ready ML systems

## 💡 Study Tips

### For Visual Learners
- Draw diagrams of the concepts
- Sketch the data flow through pipelines
- Visualize memory layouts (C vs F-contiguous)
- Plot algorithm behavior (e.g., soft thresholding curve)

### For Hands-On Learners
- Implement every concept from scratch
- Compare your implementation to sklearn's
- Run performance benchmarks
- Profile code to see optimization effects

### For Mathematical Learners
- Derive formulas shown in flashcards
- Prove why algorithms converge
- Analyze complexity bounds
- Connect to optimization theory

### For Practical Learners
- Apply concepts to real datasets
- Build projects using learned techniques
- Contribute to sklearn based on understanding
- Help others learn by explaining concepts

## 🔗 Integration with Other Resources

These flashcards complement:

### In This Repository
- **[Architecture Overview](../architecture-overview.md)** - High-level codebase structure
- **[Exercise 1](../exercise-1-custom-transformer.md)** - Hands-on transformer creation
- **[Exercise 2](../exercise-2-validation-exploration.md)** - Input validation practice
- **[Developer Guide](../../developer.md)** - Comprehensive development guide
- **[Compilation](../../compilation.md)** - Advanced CS concepts used in sklearn

### External Resources
- **Sklearn Documentation:** https://scikit-learn.org/stable/
- **Source Code:** Browse referenced files on GitHub
- **User Guide:** https://scikit-learn.org/stable/user_guide.html
- **API Reference:** https://scikit-learn.org/stable/modules/classes.html

## 📝 Making the Most of Each Card

### Before Studying
1. Read the background context thoroughly
2. Try to predict what the question will ask
3. Think about practical applications

### While Studying
1. Cover the answer and attempt to recall
2. If stuck, read the explanation
3. Understand the "why" not just the "what"
4. Run code examples if provided
5. Check source code references

### After Studying
1. Implement the concept yourself
2. Teach it to someone else
3. Find real-world examples in sklearn
4. Connect to related concepts
5. Add to your personal notes

## 🎓 Assessment Checklist

Track your mastery with these self-assessments:

### Beginner Level ✓
- [ ] I can explain what BaseEstimator does
- [ ] I understand the fit/transform/predict pattern
- [ ] I know what trailing underscore means
- [ ] I can use Pipelines correctly
- [ ] I understand train/test split

### Intermediate Level ✓
- [ ] I can implement custom transformers
- [ ] I understand memory layout impact
- [ ] I can explain cross-validation thoroughly
- [ ] I know when to use different scoring functions
- [ ] I can debug dtype and shape errors

### Advanced Level ✓
- [ ] I understand Cython optimization techniques
- [ ] I can explain nogil and memory views
- [ ] I know how BLAS integration works
- [ ] I can analyze algorithm complexity
- [ ] I understand cache-friendly design

### Expert Level ✓
- [ ] I can contribute performance optimizations to sklearn
- [ ] I understand all major sklearn algorithms deeply
- [ ] I can design cache-oblivious algorithms
- [ ] I know when and how to use SIMD
- [ ] I can review sklearn pull requests competently

## 🔄 Updating and Contributing

These flashcards are living documents. To contribute:

1. **Fix errors:** Submit PR with corrections
2. **Add cards:** Follow the existing format
3. **Improve explanations:** Clarify complex concepts
4. **Add examples:** More code examples always help
5. **Update references:** Keep source code line numbers current

## 📊 Progress Tracking

Create a personal study log:

```markdown
## My Study Progress

### Week 1
- [x] 01-api-patterns: Cards 1-5
- [ ] 01-api-patterns: Cards 6-9
- [ ] 02-input-validation: Cards 1-4

### Week 2
...
```

## 🏆 Mastery Goals

**Beginner Goal:** Understand sklearn API and use it correctly
- Complete: 01-api-patterns, 05-pipelines

**Intermediate Goal:** Implement custom estimators and understand algorithms
- Complete: All flashcard sets
- Build: 3 custom transformers/estimators

**Advanced Goal:** Contribute to sklearn performance
- Complete: 03-performance-optimization deeply
- Implement: 1 Cython optimization
- Contribute: 1 pull request to sklearn

## 📧 Feedback

Found an error? Have a suggestion? See the main [README](../README.md) for how to contribute.

---

**Remember:** The goal is **deep understanding**, not memorization. Take your time, code along, and connect concepts to build lasting knowledge!
