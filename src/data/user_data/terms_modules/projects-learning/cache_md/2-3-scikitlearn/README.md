# Scikit-learn Learning Resources

Welcome to the scikit-learn learning resources! This directory contains architecture documentation and hands-on exercises to help you understand and contribute to the scikit-learn codebase.

## Overview

This documentation is designed for developers who want to:
- Understand scikit-learn's architecture and design patterns
- Learn how to implement custom estimators and transformers
- Explore the codebase effectively
- Contribute to scikit-learn development

## Table of Contents

### Documentation

1. **[Architecture Overview](./architecture-overview.md)**
   - Core design philosophy and principles
   - Project structure and module organization
   - API patterns (Estimator, Transformer, Pipeline)
   - Data flow and validation
   - Module dependencies
   - Performance considerations

### Practice Exercises

These exercises are designed to give you hands-on experience with scikit-learn internals:

1. **[Exercise 1: Creating a Custom Transformer](./exercise-1-custom-transformer.md)**
   - **Difficulty**: Beginner
   - **Time**: 30-45 minutes
   - **Topics**: Estimator API, TransformerMixin, input validation, pipelines
   - **You will learn**:
     - How transformers work in scikit-learn
     - The fit/transform pattern
     - Input validation using check_array
     - Writing tests for your transformer
     - Using your transformer in pipelines

2. **[Exercise 2: Exploring Input Validation](./exercise-2-validation-exploration.md)**
   - **Difficulty**: Beginner to Intermediate
   - **Time**: 45-60 minutes
   - **Topics**: Input validation, data formats, error handling
   - **You will learn**:
     - How sklearn validates inputs
     - Handling different input types (lists, arrays, DataFrames, sparse matrices)
     - Memory layout optimization (C-contiguous vs F-contiguous)
     - Understanding error messages
     - Tracing validation through estimators

## Learning Path

We recommend following this path:

### For Complete Beginners

1. Read the [Architecture Overview](./architecture-overview.md) to understand the big picture
2. Complete [Exercise 1: Custom Transformer](./exercise-1-custom-transformer.md)
3. Complete [Exercise 2: Validation Exploration](./exercise-2-validation-exploration.md)
4. Read the main [Developer Guide](../developer.md) for detailed development instructions
5. Explore specific modules that interest you in the `sklearn/` directory

### For Experienced Developers

1. Skim the [Architecture Overview](./architecture-overview.md) focusing on areas you're less familiar with
2. Jump directly to exercises that match your interests
3. Study the [Developer Guide](../developer.md) for contribution guidelines
4. Start contributing!

## Additional Resources

### In This Repository

- **[Developer Guide](../developer.md)**: Comprehensive development guide with build system, testing, and contribution workflows
- **[Technical Compilation](../compilation.md)**: Deep dive into advanced CS concepts and algorithms used in scikit-learn
- **[Contributing Guide](../CONTRIBUTING.md)**: Official contributing guidelines
- **[Code of Conduct](../CODE_OF_CONDUCT.md)**: Community standards

### Official Documentation

- **Scikit-learn Website**: https://scikit-learn.org/stable/
- **Developer Documentation**: https://scikit-learn.org/dev/developers/
- **API Reference**: https://scikit-learn.org/stable/modules/classes.html
- **User Guide**: https://scikit-learn.org/stable/user_guide.html

### Key Files to Explore

After completing the exercises, explore these important files in the codebase:

| File | Purpose | Key Concepts |
|------|---------|--------------|
| `sklearn/base.py` | Base classes | BaseEstimator, Mixins, _validate_data |
| `sklearn/utils/validation.py` | Input validation | check_array, check_X_y, check_is_fitted |
| `sklearn/pipeline.py` | Pipeline implementation | Transformer chaining, parameter routing |
| `sklearn/preprocessing/_data.py` | Data transformers | StandardScaler, MinMaxScaler patterns |
| `sklearn/linear_model/_base.py` | Linear models | LinearModel base classes |
| `sklearn/tree/_classes.py` | Decision trees | Tree implementation patterns |

## Tips for Success

### Understanding the Codebase

1. **Start small**: Focus on one module or concept at a time
2. **Read tests**: Tests in `tests/` folders show how code is meant to be used
3. **Trace execution**: Use a debugger to step through code and understand flow
4. **Ask questions**: Use GitHub Discussions or Discord for help
5. **Contribute**: The best way to learn is by contributing!

### Best Practices

1. **Always validate input**: Use `check_array()` and `check_X_y()`
2. **Follow conventions**: Learned parameters end with `_`
3. **Return self from fit()**: Enables method chaining
4. **Write tests**: Aim for 90%+ coverage
5. **Document thoroughly**: Use NumPy-style docstrings

### Common Patterns

#### Basic Transformer
```python
from sklearn.base import BaseEstimator, TransformerMixin
from sklearn.utils.validation import check_array, check_is_fitted

class MyTransformer(BaseEstimator, TransformerMixin):
    def __init__(self, param=1.0):
        self.param = param

    def fit(self, X, y=None):
        X = check_array(X)
        self.n_features_in_ = X.shape[1]
        return self

    def transform(self, X):
        check_is_fitted(self)
        X = check_array(X)
        # Your transformation here
        return X
```

#### Basic Estimator
```python
from sklearn.base import BaseEstimator, ClassifierMixin
from sklearn.utils.validation import check_X_y, check_array, check_is_fitted

class MyClassifier(BaseEstimator, ClassifierMixin):
    def __init__(self, param=1.0):
        self.param = param

    def fit(self, X, y):
        X, y = check_X_y(X, y)
        self.classes_ = np.unique(y)
        self.n_features_in_ = X.shape[1]
        # Your learning algorithm here
        return self

    def predict(self, X):
        check_is_fitted(self)
        X = check_array(X)
        # Your prediction algorithm here
        return predictions
```

## Getting Help

### Community Resources

- **GitHub Discussions**: https://github.com/scikit-learn/scikit-learn/discussions
- **Discord**: https://discord.gg/h9qyrK8Jc8
- **Mailing List**: scikit-learn@python.org
- **Stack Overflow**: Tag your questions with `scikit-learn`

### Reporting Issues

If you find errors in these exercises or documentation:
1. Check if an issue already exists on GitHub
2. Create a new issue with detailed description
3. Tag it with `documentation` label

## Contributing to This Documentation

These exercises and documentation are part of the scikit-learn learning resources. To contribute:

1. Fork the repository
2. Make your changes
3. Submit a pull request
4. Follow the contributing guidelines

We welcome contributions that:
- Fix errors or clarify explanations
- Add new exercises or examples
- Improve code samples
- Enhance organization and structure

## Acknowledgments

These resources were created to help newcomers understand scikit-learn's architecture and contribute effectively. They complement the official documentation by providing hands-on, practical exercises.

Special thanks to the scikit-learn community for building such an amazing library with clean, educational code!

## License

This documentation follows the same BSD-3-Clause license as scikit-learn.

---

**Ready to get started?** Begin with the [Architecture Overview](./architecture-overview.md)!
