# Sort Option Configuration Examples

The SORT_OPTION allows you to control how terms are ordered during study sessions.

## Available Options

- **`reversed`** (default) - Terms are shown in reverse order (last to first)
- **`ordered`** - Terms are shown in original order (first to last)
- **`random`** - Terms are shuffled randomly each time
- **`duplicate`** - Terms appear twice: first in order, then reversed (2x practice)

## Configuration

Add `SORT_OPTION` to your module's `index.js`:

```javascript
module.exports = {
	module_path: 'your-module-name',
	ABOUT: {
		title: 'Your Module Title',
		skill_category: 'category',
		author: 'author'
	},
	SORT_OPTION: 'reversed', // Add this line
	// ... other config
};
```

## Examples

### Example 1: Reversed (Default)
Good for reviewing newer content first.

```javascript
module.exports = {
	module_path: 'core-knowledge',
	ABOUT: ABOUT,
	SORT_OPTION: 'reversed'
};
```

### Example 2: Ordered
Good for learning in sequence (e.g., chapters, lessons).

```javascript
module.exports = {
	module_path: 'college-algebra',
	ABOUT: ABOUT,
	SORT_OPTION: 'ordered'
};
```

### Example 3: Random
Good for testing knowledge without pattern recognition.

```javascript
module.exports = {
	module_path: 'cfa-practice',
	ABOUT: ABOUT,
	SORT_OPTION: 'random'
};
```

### Example 4: Duplicate
Good for intensive practice - see each term twice (forward then backward).

```javascript
module.exports = {
	module_path: 'exam-prep',
	ABOUT: ABOUT,
	SORT_OPTION: 'duplicate'
};
```

## Behavior

The sort option is applied when:
- Starting a study session (`maid ses`)
- After selecting a deck
- After filtering by category (if applicable)

**Note:** If no SORT_OPTION is specified, it defaults to `'reversed'`.
