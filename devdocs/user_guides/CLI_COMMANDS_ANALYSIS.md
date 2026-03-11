# CLI Commands Analysis

**Last Updated:** 2026-01-23  
**Analysis Method:** Code review of `src/cli.js`, `src/utils.js`, and command implementations

This document analyzes all CLI commands, their implementations, usage likelihood, completeness, and potential issues.

---

## Command Categories

### 🔴 Critical Issues (Incomplete/Stub Implementations)

#### `log`
- **CLI Definition:** ✅ Defined in `cli.js`
- **Implementation:** ❌ **STUB** - Only prints "Logging 30 minutes of work"
- **Status:** Incomplete
- **Code Location:** `src/utils.js:284-287`
- **Analysis:** 
  - Comment says "Log work session (like a pomodoro timer)" but implementation is just a placeholder
  - No actual time tracking, no persistence, no functionality
  - **Recommendation:** Remove or implement proper pomodoro timer functionality

#### `services`
- **CLI Definition:** ⚠️ Commented out in `cli.js` (line 67), but handler exists
- **Implementation:** ⚠️ **PARTIALLY IMPLEMENTED** - Most choices are stubs
- **Status:** Incomplete
- **Code Location:** `src/utils.js:891-936`
- **Analysis:**
  - Most service choices are commented out or have empty implementations
  - Only `swap_double_single_quotes` has partial implementation (but has bugs - doesn't return result)
  - `get_credential`, `forecast_costs`, `usd_to_ars`, `create_credential` all have empty implementations
  - **Recommendation:** Either fully implement or remove from codebase

#### `hello`
- **CLI Definition:** ❌ Not defined in `cli.js`
- **Implementation:** ✅ Simple greeting
- **Status:** Implemented but not exposed
- **Code Location:** `src/utils.js:244-246`
- **Analysis:**
  - Handler exists but command not registered in CLI
  - **Recommendation:** Remove unused handler or add to CLI if needed for testing

#### `imath`
- **CLI Definition:** ❌ Not defined in `cli.js`
- **Implementation:** ✅ Increases math score
- **Status:** Implemented but not exposed
- **Code Location:** `src/utils.js:305-307`
- **Analysis:**
  - Handler exists but command not registered
  - **Recommendation:** Remove or document as internal command

#### `poh`
- **CLI Definition:** ❌ Not defined in `cli.js`
- **Implementation:** ✅ Push origin head functionality
- **Status:** Implemented but not exposed
- **Code Location:** `src/utils.js:270-283`
- **Analysis:**
  - Similar to `coa` but for push origin head
  - **Recommendation:** Add to CLI or remove if unused

#### `lastses`
- **CLI Definition:** ❌ Not defined in `cli.js`
- **Implementation:** ✅ Study session in reverse order
- **Status:** Implemented but not exposed
- **Code Location:** `src/utils.js:319-323`
- **Analysis:**
  - Useful feature but not accessible via CLI
  - **Recommendation:** Add to CLI commands list

---

### 🟡 Overshadowed/Redundant Commands

#### `quiz` vs `term` vs `ses`
- **`quiz`**: Mixed quiz session (3 correct answers, 20 max attempts)
- **`term`**: Single random term question
- **`ses`**: Full study session with deck selection
- **Analysis:**
  - `quiz` is essentially a limited version of `ses`
  - `term` is a single-question version
  - **Recommendation:** Consider consolidating or better documenting differences

#### `cses`, `mcses`, `amses`, `mamses` - Cloze/Algorithm Sessions
- **`cses`**: Cloze study session
- **`mcses`**: Cloze pseudocode session
- **`amses`**: Algorithm session
- **`mamses`**: Pseudocode algorithm session
- **Analysis:**
  - Multiple similar commands with subtle differences
  - May confuse users about which to use
  - **Recommendation:** Consider unified command with flags (e.g., `mastery algo --mode=cloze --pseudo`)

#### `cloze` (Extension Command)
- **CLI Definition:** ✅ Defined in `cli.js`
- **Implementation:** ✅ Via extension
- **Status:** Functional but overlaps with `cses`
- **Analysis:**
  - Extension provides `cloze` command
  - Built-in provides `cses` for similar functionality
  - **Recommendation:** Document relationship or consolidate

---

### 🟢 Well-Implemented & Active Commands

#### `ses` - Study Session
- **Status:** ✅ Fully implemented
- **Usage Likelihood:** ⭐⭐⭐⭐⭐ Very High
- **Features:** Deck selection, category filtering, progress tracking
- **No Issues Found**

#### `fses` - Filtered Study Session
- **Status:** ✅ Fully implemented
- **Usage Likelihood:** ⭐⭐⭐⭐ High (if masks are used)
- **Features:** Uses active deck masks for filtering
- **Dependencies:** Requires masks to be configured

#### `term` - Single Term Question
- **Status:** ✅ Fully implemented
- **Usage Likelihood:** ⭐⭐⭐⭐ High
- **Features:** Random term selection, feedback system

#### `math` - Math Question
- **Status:** ✅ Fully implemented
- **Usage Likelihood:** ⭐⭐⭐ Medium
- **Features:** Random math problems

#### `dsa` - Data Structures & Algorithms
- **Status:** ✅ Fully implemented (via extension)
- **Usage Likelihood:** ⭐⭐⭐⭐⭐ Very High
- **Features:** Problem selection, testing, progress tracking

#### `report` - Progress Report
- **Status:** ✅ Fully implemented
- **Usage Likelihood:** ⭐⭐⭐⭐ High
- **Features:** Performance summary, skill reports, statistics

#### `code` - Get Directory Path
- **Status:** ✅ Fully implemented
- **Usage Likelihood:** ⭐⭐⭐ Medium
- **Features:** Copies path to clipboard

#### `setting` - Display Settings Paths
- **Status:** ✅ Fully implemented
- **Usage Likelihood:** ⭐⭐⭐ Medium
- **Features:** Shows all settings file locations

#### `clean` - Terminal Cleanup
- **Status:** ✅ Fully implemented
- **Usage Likelihood:** ⭐⭐⭐ Medium
- **Features:** Confirmation prompt before clearing

#### `coa` / `co` - Commit and Push
- **Status:** ✅ Fully implemented
- **Usage Likelihood:** ⭐⭐⭐⭐ High (for developers)
- **Features:** Git commit/push with optional quiz trigger
- **Note:** CLI shows `co` but handler is `coa`

#### `reset-queues` - Reset Study Queues
- **Status:** ✅ Fully implemented
- **Usage Likelihood:** ⭐⭐ Low (advanced users)
- **Features:** Reset scheduler while preserving hash data

#### `cleanup` - Deletion Queue Cleanup
- **Status:** ✅ Fully implemented (newly added)
- **Usage Likelihood:** ⭐⭐⭐ Medium
- **Features:** Review and remove terms from deletion queue, backup option

---

### 🔵 Mask Management Commands

All mask commands are well-implemented:

- **`masks`**: Full mask management interface
- **`mask-list`**: List all masks
- **`mask-toggle`**: Toggle mask on/off
- **`mask-create`**: Quick mask creation
- **`mask-status`**: Show active mask status

**Status:** ✅ All fully implemented  
**Usage Likelihood:** ⭐⭐⭐ Medium (depends on user workflow)

---

### 🟣 Module Management Commands

#### `create-module` - Create Term Module
- **Status:** ✅ Fully implemented
- **Usage Likelihood:** ⭐⭐ Low (one-time setup)
- **Features:** Guided wizard for creating new term modules

#### `prepare-week` - Prepare Weekly Decks
- **Status:** ✅ Fully implemented
- **Usage Likelihood:** ⭐⭐⭐ Medium
- **Features:** Generates daily study decks for upcoming week

---

### 🟠 Specialized/Advanced Commands

#### `entries` - Search Learning Entries
- **Status:** ✅ Fully implemented
- **Usage Likelihood:** ⭐⭐ Low (advanced users)
- **Features:** Search skill-based stats by skill name and deck term
- **Usage:** `mastery entries <skill_name> [deck_term]`
- **Analysis:** Useful but requires knowledge of skill names

#### `skill` - Skill Progress Reports
- **Status:** ✅ Fully implemented
- **Usage Likelihood:** ⭐⭐⭐ Medium
- **Features:** Shows skill progress reports
- **Note:** Similar to `report` but more focused

---

## Commands Not in CLI But Implemented

1. **`hello`** - Simple greeting (unused)
2. **`imath`** - Increase math score (unused)
3. **`poh`** - Push origin head (unused)
4. **`lastses`** - Reverse study session (unused but useful)

---

## Commands in CLI But Not Implemented

None found - all CLI commands have corresponding handlers.

---

## Commands Commented Out

1. **`services`** - Commented in CLI but handler exists (incomplete implementation)
2. **`backup`** - Commented in CLI (line 109), no handler found

---

## Recommendations

### High Priority

1. **Remove or Implement `log` command**
   - Current implementation is a stub
   - Either implement proper pomodoro timer or remove

2. **Fix or Remove `services` command**
   - Most functionality is stubbed
   - Either complete implementation or remove entirely

3. **Expose `lastses` command**
   - Useful feature that's implemented but not accessible

### Medium Priority

4. **Consolidate Session Commands**
   - Consider unified command with flags for different session types
   - Document differences between `quiz`, `term`, `ses` more clearly

5. **Add Missing Commands to CLI**
   - `poh` - Push origin head (if used)
   - `lastses` - Reverse study session

6. **Document Command Relationships**
   - Clarify when to use `cses` vs `cloze`
   - Explain differences between algorithm session variants

### Low Priority

7. **Remove Unused Handlers**
   - `hello` - Simple test command
   - `imath` - Internal score adjustment

8. **Review Command Naming**
   - `co` vs `coa` inconsistency
   - Consider more descriptive names for similar commands

---

## Usage Statistics Estimation

Based on code analysis and command complexity:

### Very High Usage (⭐⭐⭐⭐⭐)
- `ses` - Main study session
- `dsa` - Algorithm practice

### High Usage (⭐⭐⭐⭐)
- `term` - Quick term practice
- `quiz` - Mixed quiz
- `report` - Progress tracking
- `coa` - Git workflow

### Medium Usage (⭐⭐⭐)
- `fses` - Filtered sessions (if masks used)
- `math` - Math practice
- `cleanup` - Deletion queue management
- `mask-*` commands - If using masks
- `prepare-week` - Weekly planning

### Low Usage (⭐⭐)
- `reset-queues` - Advanced maintenance
- `entries` - Advanced search
- `create-module` - One-time setup
- `code` - Utility command
- `setting` - Configuration access

### Very Low/Unused (⭐)
- `log` - Stub implementation
- `services` - Incomplete
- `hello`, `imath`, `poh` - Not exposed

---

## Code Quality Issues

### Incomplete Implementations
- `log`: Stub only
- `services`: Most choices are empty stubs

### Missing Error Handling
- `entries`: No validation if localStorage fails to load
- `services`: No error handling for failed operations

### Inconsistencies
- `co` in CLI maps to `coa` handler (naming mismatch)
- `services` commented in CLI but handler exists

---

## Summary Statistics

- **Total Commands Defined in CLI:** 25
- **Total Handlers Implemented:** 29
- **Fully Functional:** 22
- **Partially Implemented:** 2 (`log`, `services`)
- **Not Exposed:** 4 (`hello`, `imath`, `poh`, `lastses`)
- **Commented Out:** 2 (`services` in CLI, `backup`)

---

## Next Steps

1. Review and fix incomplete commands (`log`, `services`)
2. Expose useful hidden commands (`lastses`)
3. Remove unused handlers (`hello`, `imath` if not needed)
4. Consolidate similar commands or improve documentation
5. Add usage tracking to identify actually used commands
