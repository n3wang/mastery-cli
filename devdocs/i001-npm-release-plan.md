# i001 - NPM Release Plan

## Overview

Pre-release cleanup and refactor to make mastery-cli publishable on npm.
Foundational change: all mutable user data moves to `~/.mastery-cli/`.

---

## Order of Work

### Step 1 - Move user data to home directory

All mutable user data must leave the package directory and live in `~/.mastery-cli/`.

Current locations to migrate:
- `src/user_data/settings.json` -> `~/.mastery-cli/settings.json`
- `src/data/user_data/daily_decks.json` -> `~/.mastery-cli/daily_decks.json`
- `src/data/user_data/review_decks.json` -> `~/.mastery-cli/review_decks.json`
- `src/data/user_data/data/logs.txt` -> `~/.mastery-cli/logs.txt`
- `src/data/user_data/temp/` -> `~/.mastery-cli/temp/`
- `src/data/user_data/terms_modules/` -> `~/.mastery-cli/terms_modules/`

Files to update:
- `src/constants.js` - centralize the user data root constant
- `src/utils_functions.js` - `getDirAbsoluteUri()` must resolve from home dir
- `src/settings.js` - settings path
- All storage classes: `LocalStorage.js`, `RatingStorage.js`, `FeedbackStorage.js`, `HashStorage.js`, `ReviewDecksStorage.js`, `DeletionQueueStorage.js`, `ActionLogger.js`, `DailyDeckManager.js`

Auto-create `~/.mastery-cli/` on first run if it does not exist.

### Step 2 - Remove personal flashcard decks

Personal study modules must not ship in the package.

- Remove all content from `src/data/user_data/terms_modules/` from git history or at minimum from the repo going forward
- Add `src/data/user_data/terms_modules/` to `.gitignore`
- Keep one sample deck (e.g., `sample_terms/`) in `src/terms_data/` as a reference/demo
- Document in README how users add their own decks to `~/.mastery-cli/terms_modules/`

### Step 3 - Decide on plugins/extensions

Option A (recommended): Abandon the extension system.
- Fold dsa-cli into core src if keeping it
- Delete `src/extensions/ExtensionManager.js` and the extension loading logic
- Delete stub extensions: `data-science-cli`, `demo`
- Remove extension-related commands from `src/cli.js`

Option B: Keep extensions but fix paths.
- Extension `user_files/` must also resolve under `~/.mastery-cli/extensions/{name}/`

### Step 4 - Fix flashcard cache location

After Step 1, cache naturally resolves under `~/.mastery-cli/terms_modules/{module}/cache.json`.
No separate action needed beyond the path refactor in Step 1.

### Step 5 - Fix package.json files array

Current (broken):
```json
"files": ["index.js", "utils"]
```

`utils/` does not exist. `src/` is not included. Fix to something like:
```json
"files": [
  "index.js",
  "src/**/*.js",
  "src/terms_data/"
]
```

Explicitly exclude:
- `src/data/user_data/`
- `src/user_data/settings.json`
- `src/extensions/` (if abandoned)
- `tests/`, `docs/`, `devdocs/`, `demo/`

### Step 6 - Add .npmignore

Create `.npmignore` to exclude from the published package:
```
tests/
docs/
devdocs/
demo/
.vscode/
*.md (except README)
src/data/user_data/
src/user_data/settings.json
makefile
jsdoc.json
.prettierrc.json
```

### Step 7 - License and metadata

- Change `"license": "UNLICENSED"` to a real license (MIT recommended)
- Fix placeholder author email `info@example.com`
- Add real keywords
- Verify the GitHub URL is correct

---

## Testing After Each Step

```bash
# See what files would ship to npm
npm pack --dry-run

# Basic sanity check
node index.js --help

# Test global install from local source
npm install -g .

# Verify all bin commands work
mastery --help
m-cli --help

# Run test suite
npm run tests
```

---

## Notes

- Do Step 1 before anything else - it unblocks all other steps
- Step 3 (plugins) and Step 5/6 (packaging) are independent and can be done in parallel
- After Step 1, test on a clean machine or clean npm install to confirm no path regressions
