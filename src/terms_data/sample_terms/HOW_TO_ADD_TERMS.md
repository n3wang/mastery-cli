# How to Add Terms (Flashcards)

There are three ways to add terms (flashcards) to the mastery-cli system:

## Method 1: JavaScript Files in sample_terms/

Add terms directly to JavaScript files in `src/terms_data/sample_terms/`

**Structure:**
```javascript
const terms_name = [
    {
        term: 'term-id',
        prompt: 'Question or prompt text',
        description: 'Answer or explanation text'
    },
    // ... more terms
];

module.exports = terms_name;
```

**Example:** See `network-terms.js` for reference
- Each term has a unique `term` identifier
- `prompt` contains the question
- `description` contains the answer/explanation

## Method 2: Markdown Files in markdown_terms/

Add terms using markdown format in `src/terms_data/sample_terms/markdown_terms/`

**Structure:**
```markdown
# Topic Name

#### term-id | category
:p Question or prompt text

??x Answer text ??

#### another-term | category  
:p Another question

??x Another answer ??
```

**Format Rules:**
- Description/context comes first
- `:p` prefix for prompts/questions
- `??x` and `??` wrap answers
- Use `####` for term headers with `term-id | category` format

**Example:** See `git.md` for reference

## Method 3: Terms Modules in user_data/terms_modules/

Create a module directory in `src/data/user_data/terms_modules/your-module-name/`

**Required Files:**
1. `index.js` or `noindex.js` - Module configuration
2. Markdown files with terms content

**Module Configuration (index.js/noindex.js):**
```javascript
const ABOUT = {
    title: 'Module Title',
    skill_category: 'category',
    author: 'your-name'
};

const EXTERNAL_CONTENT_FOLDERS = [
    // Optional: paths to external content folders
];

module.exports = {
    module_path: 'your-module-name',
    common_instructions: 'Optional markdown shown before every term description',
    ABOUT: ABOUT,
    CACHE_CONTENT: false,
    MARKDOWN_DESIGN: {
        deck_description_file: 'deck-description.md',
        prompt_descriptions_file: 'prompt-descriptions.md'
    },
    EXTERNAL_CONTENT_FOLDERS: EXTERNAL_CONTENT_FOLDERS,
    USE_FILE_AS_MODULE: true,
};
```

**Common instruction states:**
- Omit `common_instructions` entirely for unconfigured
- Set `common_instructions: ''` for an empty value
- Set `common_instructions: null` for explicit none

**Deck-wide description markdown:**
- Point `MARKDOWN_DESIGN.deck_description_file` to any markdown file
- That full file is rendered before each term description

**Prompt-wide description markdown:**
- Point `MARKDOWN_DESIGN.prompt_descriptions_file` to a markdown file with prompt sections
- Use exact prompt text after the heading

```markdown
## Prompt: Just write the pseudocode, 1 per session is enough

Keep the answer high level.
Do not include final code.

## Prompt: Explain the tradeoffs

Cover both benefits and drawbacks.
```

**Display order during study sessions:**
1. `common_instructions`
2. Deck-wide markdown description
3. Prompt-wide markdown description
4. Term description from the card itself

**Content Files:**
- Add markdown files with terms following the same format as Method 2
- Files are automatically cached and processed

**Example:** See `core-knowledge/` module for reference

---

**Choose the method that best fits your needs:**
- **Method 1 (JS):** Best for programmatic term generation or complex logic
- **Method 2 (Markdown):** Best for simple, readable terms with standard Q&A format  
- **Method 3 (Modules):** Best for organized, large collections of related terms








