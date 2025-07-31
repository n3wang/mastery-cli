# External DSA Problems Integration

This feature allows you to integrate external DSA problem collections from your local filesystem into the Mastery CLI DSA extension, making it easy to practice with your own problem sets or collections from different sources.

## Overview

The external DSA problems feature provides:
- **Automatic Loading**: Problems are loaded when you run `mcli dsa --all`
- **Flexible Configuration**: Add/remove external folders through settings
- **Multiple Sources**: Support for both DSA modules and external folders
- **Markdown Format**: Uses standard markdown format for problem definitions

## Configuration

External problem folders are configured in `src/extensions/dsa-cli/user_files/temp_settings.json`:

```json
{
    "external_problems_folders": [
        "E:\\Documents\\GitHub\\mastery-cli\\user_data\\dsa_modules\\leetcode-basics\\problems",
        "C:\\Users\\YourName\\Documents\\LeetCode-Problems",
        "/path/to/your/problem/collection"
    ],
    "settings": {
        "auto_load_external_problems": true,
        "cache_external_problems": true,
        "log_external_loading": false
    }
}
```

### Configuration Options

- **`external_problems_folders`**: Array of absolute paths to folders containing markdown DSA problems
- **`auto_load_external_problems`**: Enable/disable automatic loading (default: true)
- **`cache_external_problems`**: Enable caching for performance (default: true)
- **`log_external_loading`**: Show detailed loading logs (default: false)

## Problem Format

External DSA problems should be written in markdown format following this structure:

```markdown
# Problem Title

**Tags:** array, hashmap, two-pointers
**Difficulty:** Easy

## Description
Your problem description here. Explain what the problem is asking for.

## Theory
Explain the approach or theory behind solving this problem.

## Pseudocode
```
function solutionApproach(input):
    // Your pseudocode here
    return result
```

## Solution

### Python
```python
def solution(input):
    # Your Python solution
    return result
```

### JavaScript
```javascript
function solution(input) {
    // Your JavaScript solution
    return result;
}
```
```

### Multiple Problems Per File

You can include multiple problems in a single markdown file by separating them with `# Problem Title` headers:

```markdown
# Two Sum
**Tags:** array, hashmap
**Difficulty:** Easy
## Description
...

---

# Valid Parentheses
**Tags:** string, stack
**Difficulty:** Easy
## Description
...
```

## Usage

### Running DSA with External Problems

```bash
# Load and practice all problems (including external ones)
mcli dsa --all

# Practice only recommended problems (includes external ones)
mcli dsa
```

### Managing External Folders

The system automatically loads problems from configured folders. To modify the configuration:

1. Edit `src/extensions/dsa-cli/user_files/temp_settings.json`
2. Add or remove folder paths from `external_problems_folders`
3. Restart the CLI or run `mcli dsa --all` to reload

### Example Folder Structure

```
C:\\Users\\YourName\\Documents\\LeetCode-Problems\\
├── arrays\\
│   ├── two-sum.md
│   ├── three-sum.md
│   └── container-with-water.md
├── trees\\
│   ├── binary-tree-traversal.md
│   └── validate-bst.md
└── dynamic-programming\\
    ├── fibonacci.md
    └── climbing-stairs.md
```

## Features

### Automatic Integration
- External problems are automatically integrated with existing DSA problems
- No duplicate loading - folders are cached to prevent reloading
- Problems maintain source folder information for tracking

### Problem Metadata
Each loaded external problem includes:
- **`source_folder`**: Path to the source folder
- **`is_external`**: Boolean flag indicating external source
- **Standard metadata**: slug, name, difficulty, tags, description

### Performance
- **Caching**: Loaded folders are cached to prevent repeated parsing
- **Lazy Loading**: Problems are only loaded when needed
- **Efficient Parsing**: Optimized markdown parsing for large collections

## Troubleshooting

### Common Issues

1. **Problems not loading**
   - Check that folder paths in `temp_settings.json` are correct
   - Ensure folders exist and contain `.md` files
   - Verify `auto_load_external_problems` is set to `true`

2. **Parsing errors**
   - Ensure markdown files follow the correct format
   - Check that required sections (Title, Tags, Difficulty) are present
   - Verify markdown syntax is correct

3. **Path issues**
   - Use absolute paths in `external_problems_folders`
   - On Windows, use double backslashes: `"C:\\\\Users\\\\..."`
   - On Linux/Mac, use forward slashes: `"/home/user/..."`

### Debug Mode

Enable detailed logging by setting `log_external_loading: true` in `temp_settings.json`:

```json
{
    "settings": {
        "log_external_loading": true
    }
}
```

This will show:
- Which folders are being processed
- How many problems are loaded from each folder
- Any errors during loading

## Best Practices

### Organizing Problems
- Group related problems in subdirectories (arrays, trees, etc.)
- Use descriptive filenames that match problem titles
- Include difficulty and topic tags consistently

### File Naming
- Use kebab-case: `two-sum.md`, `valid-parentheses.md`
- Include problem source if relevant: `leetcode-two-sum.md`
- Keep filenames concise but descriptive

### Content Structure
- Always include Tags, Difficulty, Description
- Provide clear theory/approach explanations
- Include solutions in multiple languages when possible
- Add pseudocode for algorithm understanding

### Performance Tips
- Keep individual markdown files under 50KB for optimal parsing
- Group related problems in the same file when appropriate
- Use caching (`cache_external_problems: true`) for large collections

## Examples

### Example 1: Single Problem File

**File: `C:\\Problems\\arrays\\two-sum.md`**
```markdown
# Two Sum

**Tags:** array, hashmap
**Difficulty:** Easy

## Description
Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.

## Theory
Use a hash map to store previously seen numbers and their indices.

## Pseudocode
```
function twoSum(nums, target):
    map = {}
    for i, num in enumerate(nums):
        complement = target - num
        if complement in map:
            return [map[complement], i]
        map[num] = i
```

## Solution

### Python
```python
def twoSum(nums, target):
    lookup = {}
    for i, num in enumerate(nums):
        if target - num in lookup:
            return [lookup[target - num], i]
        lookup[num] = i
```
```

### Example 2: Multiple Problems File

**File: `C:\\Problems\\easy-problems.md`**
```markdown
# Two Sum
**Tags:** array, hashmap
**Difficulty:** Easy
## Description
...

---

# Valid Parentheses
**Tags:** string, stack
**Difficulty:** Easy
## Description
...

---

# Merge Two Sorted Lists
**Tags:** linked-list, recursion
**Difficulty:** Easy
## Description
...
```

### Example 3: Configuration

**File: `temp_settings.json`**
```json
{
    "external_problems_folders": [
        "C:\\\\Users\\\\YourName\\\\Documents\\\\LeetCode-Problems",
        "C:\\\\Users\\\\YourName\\\\Documents\\\\Interview-Prep\\\\DSA",
        "D:\\\\Coding\\\\Problem-Collections\\\\Arrays"
    ],
    "settings": {
        "auto_load_external_problems": true,
        "cache_external_problems": true,
        "log_external_loading": true
    },
    "editor": "code",
    "last_updated": "2025-07-31T12:00:00.000Z",
    "version": "1.0"
}
```

This configuration will:
- Load problems from three different directories
- Enable automatic loading and caching
- Show detailed logs during loading
- Use VS Code as the default editor

## Advanced Usage

### Integration with DSA Modules

External folders work alongside the built-in DSA module system. You can have both:
- **DSA Modules**: Located in `user_data/dsa_modules/` with `index.js` configuration
- **External Folders**: Direct paths to markdown folders without module structure

### Custom Problem Collections

Create themed collections by organizing problems in specific folders:

```
C:\\Interview-Prep\\
├── FAANG-Problems\\
│   ├── amazon-problems.md
│   ├── google-problems.md
│   └── facebook-problems.md
├── Algorithm-Patterns\\
│   ├── sliding-window.md
│   ├── two-pointers.md
│   └── binary-search.md
└── Data-Structures\\
    ├── arrays-and-strings.md
    ├── linked-lists.md
    └── trees-and-graphs.md
```

Then reference the main folder in your configuration:
```json
{
    "external_problems_folders": [
        "C:\\\\Interview-Prep\\\\FAANG-Problems",
        "C:\\\\Interview-Prep\\\\Algorithm-Patterns",
        "C:\\\\Interview-Prep\\\\Data-Structures"
    ]
}
```

This feature makes it easy to organize and practice with curated problem sets tailored to your learning goals!