# i003 — Open Source Preparation: Prune, Cleanup & Naming Standardization

**Status:** Draft / awaiting approval
**Date:** 2026-09-03
**Target:** Publish `mastery-cli` as a maintainable open-source project

---

## 1. Current State Snapshot

| Metric | Value |
| --- | --- |
| Tracked files | 2,654 |
| `.git` size | 197 MB |
| Commits on `master` | 1,672 |
| Stale remote branches | 8 (excluding `master`/`HEAD`) |
| Tracked files under `src/data/user_data/terms_modules` | 626 (~17 MB working tree) |
| Tracked files under `docs/` (generated JSDoc HTML) | 66 |
| `console.log` calls in `src/*.js` | ~370 (150 in `Quizzer.js`, 160 in `utils.js`) |
| Settings files | 6, across 3 independent loaders (§7) |
| User-state write sites outside `user_data/` | DSA extension writes into the installed package (§5.1) |
| Extension system | ~530 lines of machinery for 3 in-tree extensions; hooks/unload/deps all dead (§6) |
| Command registries | 3, mutually inconsistent — 2 documented-but-dead, 13 undocumented (§8) |
| Method naming split | 307 `camelCase` vs 26 `snake_case` definitions (§4.4) |
| Test suite status | **Broken** — `npm run tests` throws `ReferenceError: test is not defined` |
| License | `UNLICENSED` — no `LICENSE` file |

Missing entirely: `LICENSE`, `CONTRIBUTING.md`, `CODE_OF_CONDUCT.md`, `CHANGELOG.md`,
`.github/` (CI, issue/PR templates), `.editorconfig`, `.nvmrc`, ESLint config.

---

## 2. Blockers — must be resolved before the repo goes public





### 2.3 Package metadata is a placeholder

```json
"license": "UNLICENSED",
"author": { "name": "mastery-cli", "email": "info@example.com",
            "url": "https://github.com/mastery-cli/mastery-cli" }
```

The author URL points at an org that does not match the real remote
(`https://github.com/n3wang/mastery-cli.git`), the email is a placeholder, and
`UNLICENSED` actively forbids the redistribution that publishing implies. There is no
`repository`, `bugs`, `homepage`, or `engines` field.

### 2.4 The published npm tarball is wrong

`package.json` declares `"files": ["index.js", "utils"]`. There is no `utils/` directory —
it was renamed to `src/` — so `npm publish` ships a bin entry that immediately fails on
`require('./src/cli')`. Anyone running `npm install -g mastery-cli` today gets a broken CLI.

### 2.5 The test suite does not run

`npm run tests` → `mocha tests/*` → `ReferenceError: test is not defined`.

`tests/test_deletion_queue_storage.test.js` is written in Jest style (`test()`, `expect()`),
the other ten test files are Mocha + `assert`, and `makefile` invokes a third runner
(`jest tests`) that is not even a dependency. A public repo cannot ship a red test suite.

---

## 3. Pruning Plan

### 3.1 Delete outright

| Path | Size / count | Rationale |
| --- | --- | --- |
| `docs/` | 66 files, ~1 MB | Generated JSDoc HTML. Regenerate via `npm run doc`; publish to GitHub Pages from CI instead of committing. Also contains a file literally named `global.html#ProblemsManager` and a URL-encoded `to%20manage%20the%20settings.json%20file.html`, both hostile to non-Windows checkouts. |
| `**/dist/` (10 directories) | — | Committed Babel `*.dev.js` output: `src/terms_data/dist`, `src/extensions/dsa-cli/dist`, `.../dsa_tests/dist`, `.../tests/dist`, `.../solutions/dist`, `.../base_code/dist`, `src/schedule-assistant/tests/dist`, `tests/dist`, and `tests/dist/dist` (nested duplicate). No build step produces or consumes these any more. |
| `custom_modules/custom-template/` | ~90 font/asset files | A vendored copy of the default JSDoc template. Replace `jsdoc.json`'s `"template"` with the stock template or a published theme (`docdash`, `clean-jsdoc-theme`). |
| `src/md_module.js` | 216 B | Dead: requires six symbols from `md_terms_parser.js` and exports nothing. Zero importers. |
| `src/md_problems_parser.js` | 6.5 KB | Stale fork of `src/extensions/dsa-cli/md_problems_parser.js`; the extension copy has diverged (adds `USE_FILE_AS_MODULE`, preserves internal whitespace). Only importer is `tests/test_md_problems_parser.test.js`, which should be repointed at the extension copy. |
| `src/user_data/` | 2 files | Byte-identical duplicate of `src/data/user_data/settings.json` and `_settings.json`. `src/userDataPaths.js` already treats `src/data/user_data` as canonical and has migration logic for the legacy path. |
| `data/debuging.json` | — | Already deleted in the working tree (see `git status`); commit the deletion. Also note the typo in the name. |
| `src/extensions/dsa-cli/data/db.json*` | 3 files | Runtime database + backups; already in `.gitignore`, needs untracking. |
| `src/extensions/dsa-cli/user_files/*` | 6 files | Scratch files; already in `.gitignore`, needs untracking. |
| `src/schedule-assistant/report.json` | 29 B | Runtime artifact (`{}`-shaped stub). |
| `src/extensions/dsa-cli/dsa_tests/problem_report.json` | — | Runtime artifact. |
| `src/extensions/dsa-cli/dsa_tests/temp.js` | — | Scratch. |
| `demo/bruh.gif` | 649 KB | Unreferenced by `Readme.md`. |

### 3.2 Replace with sample content

`src/data/user_data/` is doing two incompatible jobs at once: it is the **shipped default
content** *and* the **runtime user state directory**. That conflation is why personal data
keeps landing in commits.

> The full target layout is specified in §5 (the user data vault). The sketch below is the
> repo-side half of that split — what stays committed in this repository.

```
content/                       # shipped, license-clean sample decks (committed)
  terms_modules/
    sample-computer-science/
    sample-system-design/
    sample-networking/
  dsa_modules/
    leetcode-basics/           # keep — already generic (array-problems.md, tree-problems.md)
  settings.default.json        # was _settings.json

<OS user data dir>/mastery-cli/   # runtime state (never committed, never in repo)
  settings.json
  daily_decks.json
  review_decks.json
  temp/
  terms_modules/               # user's own decks
```

The seven existing `terms_modules` decks are replaced by three or four small, originally
authored sample decks (10–20 cards each) that demonstrate every markdown feature the
parser supports: `:p` prompts, cloze deletions, code fences, images, categories. These
double as parser fixtures and as onboarding content.

`src/userDataPaths.js` already centralizes path resolution, so this is a change to one
module plus the `getDirAbsoluteUri('user_data/…')` call sites (~15, listed in §4.3).

### 3.3 History rewrite

Deleting the files in a new commit is not sufficient — `git clone` still delivers them,
and the 197 MB `.git` is itself a barrier to contribution.

Recommended: **start a clean history.**

1. Tag the current tip (`git tag pre-oss-archive`) and keep the private repo as the archive.
2. Create an orphan branch from the cleaned tree, one initial commit, force-push to a
   fresh public repo.
3. This drops 1,672 commits of history — acceptable for a solo project, and it is the only
   approach that is *certainly* free of the book content, personal paths, and 197 MB of
   image/gif churn.

Alternative if history is worth preserving: `git filter-repo --invert-paths` over the
paths in §3.1 and §3.2, then `git reflog expire --all --expire=now && git gc --prune=now
--aggressive`. This is slower, must be verified with `git log --all --diff-filter=A
--name-only | grep -i fluentpython` style checks, and any missed path is a permanent leak.

**Recommendation: clean history.** The archive tag preserves everything privately.

### 3.4 Branch cleanup

Delete the eight stale remote branches (`18-…`, `25-…`, `37-…`, `42-…`, `44-…`, `46-…`,
`version_datascience-module`, `version_with_csv_assistant`) and `develop` if unused. They
will not survive the history rewrite anyway; deleting them explicitly avoids confusion.

---

## 4. Naming Standardization

### 4.1 Current inconsistency

`src/*.js` uses four conventions simultaneously:

| Convention | Files |
| --- | --- |
| `PascalCase` | `ActionLogger`, `DailyDeckManager`, `DeletionQueueStorage`, `FeedbackStorage`, `HashStorage`, `LocalStorage`, `MiniTermScheduler`, `Quizzer`, `QuizzerWithDSA`, `RatingStorage`, `ReviewDecksStorage`, `SettingsManager`, `StorableQueue` |
| `camelCase` | `termScheduler`, `userDataPaths` |
| `snake_case` | `md_module`, `md_problems_parser`, `md_terms_parser`, `utils_functions` |
| `lowercase` | `cli`, `constants`, `demo`, `init`, `log`, `settings`, `structures`, `utils` |
| `kebab-case` | everything under `src/extensions/` and `src/local-modules/` |

### 4.2 Proposed standard

| Kind | Convention | Example |
| --- | --- | --- |
| Modules that export a single class | `PascalCase.js` | `Quizzer.js`, `LocalStorage.js` |
| All other modules | `kebab-case.js` | `term-scheduler.js`, `md-terms-parser.js` |
| Directories | `kebab-case` | `schedule-assistant/`, `terms-data/` |
| Test files | `<subject>.test.js`, kebab-case | `local-storage.test.js` |
| JSON config / data | `kebab-case.json` | `daily-decks.json` |
| Functions / variables | `camelCase` | `parseMarkdownCards` |
| Classes | `PascalCase` | `DeckMask` |
| Constants | `SCREAMING_SNAKE_CASE` | `DEFAULT_QUEUE_SIZE` |

Rationale: `PascalCase` for class modules matches the existing majority and is the
dominant Node convention; `kebab-case` for everything else matches the extensions tree,
which is already consistent, and avoids case-sensitivity breakage between Windows (the
current dev machine) and Linux CI.

### 4.3 Renames

**Source modules**

| From | To |
| --- | --- |
| `src/md_terms_parser.js` | `src/md-terms-parser.js` |
| `src/utils_functions.js` | `src/utils-functions.js` |
| `src/termScheduler.js` | `src/term-scheduler.js` |
| `src/userDataPaths.js` | `src/user-data-paths.js` |
| `src/terms_data/` | `src/terms-data/` |
| `src/md_terms_parser_state_logic.md` | `devdocs/md-terms-parser-state-logic.md` (design doc — does not belong in `src/`) |

**The `tests` / `dsa_tests` collision (highest-value rename)**

`src/extensions/dsa-cli/tests/` does **not** contain tests. It contains 28 files of DSA
*problem definitions* (`neet-array.js`, `leet-graph.js`, `algo-hard.js`, …). Meanwhile
`src/extensions/dsa-cli/dsa_tests/` contains the actual unit tests
(`test_problem_integrity.test.js`, `test_ProblemScheduler.test.js`). This is actively
misleading and defeats every test-runner glob.

| From | To |
| --- | --- |
| `src/extensions/dsa-cli/tests/` | `src/features/dsa/problem-sets/` |
| `src/extensions/dsa-cli/dsa_tests/` | top-level `tests/` |

Both land as part of the extension flattening in §6.3, which moves `dsa-cli/` to
`src/features/dsa/` anyway — do them in that move rather than as a separate rename.

**Test files** — `tests/test_local_storage.test.js` → `tests/local-storage.test.js`
(the `test_` prefix is redundant with the `.test.js` suffix). Applies to all 11 files.

**Repo files**

| From | To |
| --- | --- |
| `Readme.md` | `README.md` (case matters on GitHub and Linux) |
| `makefile` | `Makefile` |

Use `git mv` for every rename so history follows, and do renames in a **separate commit
from content edits** so the diff stays reviewable.

### 4.4 Identifier naming inside the code

File names are only half the problem. Method and variable naming is split roughly 92/8
between two conventions, **inside the same classes**:

| Convention | Method definitions in `src/` (excl. `dist`, `solutions`, problem sets) |
| --- | --- |
| `camelCase` | 307 |
| `snake_case` | 26 |

`Quizzer` is the clearest case — it defines all of these side by side:

```
ask_math_question          askQuestion
ask_term_question          runStudySession
pick_term_question         selectLeastPracticedTerms
pick_and_ask_term_question getRenderedTermDescription
study_session              resetStudySessionQueues
filtered_study_session     recordTermCompletion
compile_valid_question     createFlashcardMarkdown
```

Note `study_session` and `runStudySession` coexisting — worth checking whether one is dead
before renaming either.

Local variables show the same split (`absolute_settings_uri`, `settings_path`,
`_settings_path` next to `defaultSettings`, `enabledDecks`, `activeMaskNames`), and so do
JSON keys — `_settings.json` mixes `quiz_enabled`, `show_http_errors`, and
`ask_quiz_when_commit` (snake) with `llm.baseUrl` and `llm.maxFollowupTokens` (camel).

**Standard:** `camelCase` for all JS identifiers (it is already the 92% majority),
`snake_case` for JSON keys (already the majority there, and §7.4 makes it the settings rule).
The 26 snake_case methods are a mechanical rename; because several are public entry points
called from `utils.js` and the extensions, do them in one commit with the call sites, after
the file renames in §4.3 have landed.

Deliberate exception: DSA problem slugs stay kebab-case (`two-sum`, `binary-search`) —
they mirror LeetCode URLs and are matched as data, not identifiers.

### 4.5 Binary / CLI name

The package installs four bin aliases — `m-cli`, `maid`, `mastery`, `mcli` — while
`Readme.md` documents `mcli`, `index.js`'s own header documents `mastery`, and `makefile`
uses `maid`. Pick **`mastery`** as canonical and keep **`mcli`** as the short alias; drop
`m-cli` (confusingly close to `mcli`) and `maid` (unrelated to the project name, and it
collides with an existing npm package).

Command names themselves are covered in §8.

---

## 5. The User Data Vault — one folder the user can track themselves

**Goal:** every piece of user-owned state — decks, progress, stats, config — lives in a
single directory outside the package, structured so the user can `git init` it and push it
to their own private repo. Nothing user-generated stays inside the installed package;
nothing product-owned leaks into the vault.

This supersedes the split sketched in §3.2 and absorbs the config work in §7.

### 5.1 Where the state actually lives today

The core is already most of the way there. Nine storage classes all resolve through the
same helper:

| Class | Path today |
| --- | --- |
| `ActionLogger` | `user_data/data/logs.txt` |
| `DailyDeckManager` | `user_data/daily_decks.json` |
| `ReviewDecksStorage` | `user_data/review_decks.json` |
| `DeletionQueueStorage` | `user_data/temp/deletion_queue.json` |
| `FeedbackStorage` | `user_data/temp/term_feedback.json` |
| `HashStorage` | `user_data/temp/term_completion_hashes.json` |
| `RatingStorage` | `user_data/temp/term_ratings.csv` |
| `LocalStorage` | `user_data/temp/<name>.json` |
| `StorableQueue` | `user_data/temp/<name>` |

Plus the decks themselves at `user_data/terms_modules/**` and `user_data/dsa_modules/**`,
and settings at `user_data/settings.json` (§7.1).

**The extensions are the exception, and they are the whole problem.** There are two
different `getDirAbsoluteUri` functions with different signatures and different roots:

| | Root | `user_data` aware? |
| --- | --- | --- |
| `src/utils_functions.js:58` | `<src>/data/` + special-cases `user_data/` → `getUserDataAbsolutePath()` | yes |
| `src/extensions/dsa-cli/functions.js:32` | `<extension dir>/` + caller-supplied subdirectory | **no** |

So the DSA extension writes its state *inside the installed package*:
`src/extensions/dsa-cli/data/db.json` (progress DB, plus `.bak` and a timestamped backup),
`src/extensions/dsa-cli/user_files/temp_problem.js`, `temp_solution.js`,
`user_files/stash/`, and `user_files/temp_settings.json`. None of it can reach the vault
while that second resolver exists — which is the direct link to §6.

### 5.2 Layout

```
$MASTERY_HOME/                    # default: <OS data dir>/mastery-cli, override by env var
├── .git/                         # the USER's repo — not ours
├── .gitignore                    # shipped on init; ignores everything derived
├── README.md                     # shipped stub: "this is your Mastery vault"
├── config.json                   # the single settings file (§7.3)
│
├── decks/                        # SOURCE content — the point of tracking
│   ├── <deck-name>/
│   │   ├── deck.json             # deck manifest (was the module entry in settings)
│   │   └── *.md                  # the cards
│   └── ...
│
├── problems/                     # user-authored DSA problems (was dsa_modules/)
│   └── <set-name>/*.md
│
├── progress/                     # SMALL, durable, worth tracking
│   ├── review-decks.json
│   ├── daily-decks.json
│   ├── term-completion-hashes.json
│   ├── term-ratings.csv
│   └── dsa-progress.json         # was extensions/dsa-cli/data/db.json
│
├── stats/                        # append-only history, worth tracking
│   └── actions.log               # was user_data/data/logs.txt
│
└── .cache/                       # DERIVED — gitignored, safe to delete
    ├── parsed/<deck>.json        # was terms_modules/**/cache.json
    ├── queues/                   # was user_data/temp/ (learning/learned/working sets)
    ├── deletion-queue.json
    ├── term-feedback.json
    └── scratch/                  # was extensions/dsa-cli/user_files/
        ├── temp-problem.js
        └── temp-solution.js
```

### 5.3 Design rules

1. **Track vs. derive is a directory-level decision, not a per-file `.gitignore` rule.**
   Everything under `.cache/` is reproducible from `decks/` + `progress/`; everything else
   is worth a commit. A user should never have to reason about which files matter.
2. **Ship the `.gitignore`.** `mastery vault init` writes a vault with `.cache/` already
   ignored. Without this, the first `git add -A` in the vault commits parsed caches and
   scratch files, and the user's diffs become unreadable — exactly the failure mode this
   repo already has.
3. **Rename `cache_md/` → `decks/<name>/`.** Today `cache_md/` holds the *source* markdown
   (the actual cards) while `cache.json` holds the *derived* parse. Two things named
   "cache", only one of which is a cache. Under the new layout the source is `decks/` and
   the derived parse is `.cache/parsed/`. This is the single most confusing name in the
   project for someone deciding what to version.
4. **Small and diffable in tracked paths.** `progress/*.json` must be written with stable
   key ordering and 2-space indent so a day of studying produces a readable diff, not a
   one-line churn. `stats/actions.log` is append-only for the same reason.
5. **No backups in the vault.** `db.json.bak` and `db.json.<timestamp>.bak` exist because
   there was no version control. Once the vault is a git repo, the backup logic is deleted —
   git is the backup.
6. **One resolver.** `userDataPaths.js` becomes `vault.js`, exposing
   `vaultPath('progress/review-decks.json')` and friends. The DSA resolver
   (`extensions/dsa-cli/functions.js:32`) is deleted along with the extension wrapper (§6).
7. **Resolution order:** `$MASTERY_HOME` → OS data dir (`%APPDATA%` / `$XDG_DATA_HOME` /
   `~/Library/Application Support`) → error with a `mastery vault init` hint. Never fall back
   to a path inside the package — that silent fallback is the §7.2(a) bug.
8. **Migration on first run of the new version.** Detect the old `src/data/user_data/`,
   copy into the vault, write a `MIGRATED` marker, and print where things went. Do not
   delete the old tree; let the user remove it.

### 5.4 Commands this implies

| Command | Purpose |
| --- | --- |
| `mastery vault path` | Print the vault location (replaces `code`) |
| `mastery vault init` | Create the vault, write `.gitignore` + `README.md`, optionally `git init` |
| `mastery vault status` | Show deck count, last study date, whether the vault is a git repo and if it is dirty |
| `mastery vault migrate` | Run the legacy import explicitly |

`mastery vault status` reporting uncommitted changes is the feature that makes the whole
design pay off: the user can be nudged to commit their progress the same way the tool
already nudges them to study on commit.

### 5.5 Open design point

Progress data is genuinely two things: **durable history** (what you learned, ratings,
completion hashes — worth tracking, merges reasonably) and **live session state** (current
queue position, working set — churns constantly, conflicts on every merge, worthless in
history). The layout above puts the first in `progress/` and the second in `.cache/queues/`.
Confirm that split is right before implementing — if a user studies on two machines, session
state that does *not* sync means a session started on one machine cannot be resumed on the
other. That is probably the correct trade (queues are cheap to rebuild), but it is a real
behaviour change worth stating out loud.

---

## 6. Retiring the Extension System

**Recommendation: yes, remove it.** The machinery costs ~530 lines to serve three
first-party, in-tree modules, most of its advertised capability is dead code, and its path
handling is the specific thing blocking §5.

### 6.1 What it actually is

| File | Lines | Real content |
| --- | --- | --- |
| `src/extensions/ExtensionManager.js` | 332 | discovery, loading, registration, hooks, unload, status |
| `src/extensions/models.js` | 199 | `ExtensionModel` base class + a second `Command` class |
| `src/extensions/dsa-cli/extension.js` | 207 | thin wrapper over `dsa-trainer.js` |
| `src/extensions/data-science-cli/extension.js` | 86 | one command (`jupyter`) |
| `src/extensions/demo/extension.js` | 99 | pure scaffolding |
| `src/extensions/README.md` + `EXTENSION_TEMPLATE.md` | — | docs for the above |

### 6.2 Why it does not earn its keep

- **There is no third-party extension path.** `discoverExtensions()` scans one directory —
  `src/extensions/`, passed from `index.js`. No user extension folder, no npm discovery, no
  install command. Every extension is first-party and ships in the same tarball, so the
  plugin boundary buys nothing that a `require()` would not.
- **The hook system is dead.** `executeHooks()` is never called from anywhere outside
  `ExtensionManager` itself. The only extension that defines hooks is `demo`, whose handlers
  just `console.log`. The `before-command` / `after-command` events are never emitted.
- **So are several other advertised features.** `unloadExtension()` has no callers.
  `validateDependencies()` has no callers. `src/extensions/README.md` promises "Hot
  Reloading", "Dependency Management", and "Type Safety" — none of which exists.
- **It fragments the command registry.** Extension commands are merged into dispatch *after*
  `cli.js` has already built the help string, which is the structural cause of the help drift
  in §8.1. It also introduces a second `Command` class with a different signature.
- **It fragments state.** The `settingsPath` option on `ExtensionModel` gives each extension
  its own settings file (§7.2(g)), and the DSA extension's private path resolver writes state
  inside the package (§5.1). Both must go for §5 to work.
- **The one real feature does not depend on it.** `dsa-cli` is a genuine 34 KB trainer with
  150+ problems, but `extension.js` is only a wrapper. Deleting the wrapper does not touch
  the trainer.

### 6.3 What replaces it

Plain modules, registered in the command registry from §8.4:

```
src/
├── commands/
│   ├── registry.js          # every command, core and feature alike
│   ├── session.js
│   ├── commit.js
│   ├── mask.js
│   └── vault.js
└── features/
    ├── dsa/                 # was src/extensions/dsa-cli/ minus extension.js
    │   ├── trainer.js
    │   ├── problems-manager.js
    │   └── problem-sets/
    └── data-science/        # was data-science-cli, if kept
        └── jupyter.js
```

- `dsa-cli/extension.js` collapses into 3 registry entries (`dsa`, `dsa --markdown`, `cloze`)
  pointing at `trainer.js` methods.
- `data-science-cli/extension.js` becomes one entry (`jupyter`) — or is cut entirely (§12).
- `demo/` is deleted outright, along with the `sample` and `demo-info` commands and the
  `extensions` status command from `index.js`.
- `ExtensionManager.js`, `models.js`, `EXTENSION_TEMPLATE.md`, and
  `src/extensions/README.md` are deleted. The `Command` class survives in one place only.
- The DSA `getDirAbsoluteUri` is deleted; `features/dsa/` uses `vault.js` like everything else.

Net: ~530 lines of machinery removed, one command registry, one path resolver, one settings
file, one `Command` class.

### 6.4 What is lost, honestly

A future third-party plugin API. That is a real thing to give up, but it is not being given
up *now* — nothing today can load an extension the user wrote, so no capability regresses on
the day this lands. If plugins become a goal after the project has actual users, the registry
in §8.4 is a cleaner base to build them on than the current manager: a plugin would register
registry entries and receive a vault handle, rather than re-implementing path resolution and
settings storage per extension.

Worth noting in `CONTRIBUTING.md` as an explicitly deferred idea, so the removal reads as a
decision rather than an omission.

### 6.5 Sequencing

Do §6 **before** §5. Flattening the extensions first means the vault migration has one path
resolver to change instead of two, and the DSA state files move as part of a tree that is
already being restructured. Doing it the other way round means writing vault plumbing into
`extension.js` files that are about to be deleted.

---

## 7. Settings Consolidation

This is the single most tangled area of the codebase: **six settings files and three
independent loaders**, with no shared schema, no validation, and two of the six tracked in
git while holding live user state.

### 7.1 Inventory

| # | File | Tracked? | Role | Loader |
| --- | --- | --- | --- | --- |
| 1 | `src/data/user_data/settings.json` | no (gitignored) | **Live user settings** — the real one | `src/settings.js`, `src/SettingsManager.js` |
| 2 | `src/data/user_data/_settings.json` | **yes** | Default template, copied to (1) on first run | same |
| 3 | `src/user_data/settings.json` | **yes** | Legacy duplicate of (1) — byte-identical | legacy path in `userDataPaths.js` |
| 4 | `src/user_data/_settings.json` | **yes** | Legacy duplicate of (2) — byte-identical | same |
| 5 | `src/extensions/dsa-cli/user_files/temp_settings.json` | **yes** | DSA editor preference (`{"editor": "nano"}`) | `src/extensions/dsa-cli/settings-manager.js` |
| 6 | `src/schedule-assistant/data/schedule-settings.json` | **yes** | Weekly schedule definition | `ScheduleAssistant.js` |

Two more paths reference settings without being settings:
`docs/dsa-cli_settings-manager.js.html` and
`docs/to%20manage%20the%20settings.json%20file.html` (both generated, deleted in §3.1).

### 7.2 The problems, concretely

**(a) `src/user_data/` is a stale duplicate that still shadows the real one.**
`src/userDataPaths.js` declares `src/data/user_data` canonical and lists `src/user_data`
and `../user_data` as `LEGACY_USER_DATA_ROOTS`. But `getUserDataAbsolutePath()` defaults to
`preferExisting: true`, which means **if the canonical file is missing, it silently reads
from the legacy directory instead**. Since files 3 and 4 are committed, every fresh clone
has the legacy copies present, so a new user's first run can bind to the legacy path and
diverge from the canonical one. Deleting `src/user_data/` (§3.1) removes the ambiguity.

**(b) File 3 is a committed live settings file.** `src/user_data/settings.json` is not a
template — it is a materialized user config that was committed. Contributors inherit the
author's deck masks, objectives, and LLM configuration as if they were defaults.

**(c) `_settings.json` is a poor name for a template.** The leading underscore carries no
meaning to a newcomer, sorts oddly, and reads as "private/internal" rather than "defaults".
The template/live pair should be named for what it is.

**(d) The bootstrap logic is duplicated verbatim, bug included.**
`src/settings.js:26-45` and `src/SettingsManager.js:18-33` contain the same
copy-template-if-missing block, including the same defect: the final `else` branch calls
`path.dirname(...)` but neither module requires `path`. Both error handlers throw
`ReferenceError: path is not defined` instead of the intended message.

**(e) Two live views of the same file can drift within one process.**
`src/settings.js` does `module.exports = require(absolute_settings_uri)` — a *cached*
snapshot. `SettingsManager.saveSettings()` writes the file and updates its own
`this._settings`, but the cached export in `settings.js` is never invalidated. `Quizzer.js`
holds `require('./settings')` at module scope (line 2) *and* instantiates a
`SettingsManager` at line 1116. After a mask toggle, those two objects disagree for the
rest of the process.

**(f) Two different classes named `SettingsManager`.** `src/SettingsManager.js` (masks,
decks, read/write) and `src/extensions/dsa-cli/settings-manager.js` (editor choice,
read-only, no `saveSettings`). Different filename conventions, different capabilities,
same class name — `require` mistakes here are confusing to diagnose.

**(g) `temp_settings.json` is not temporary.** It is the DSA extension's persistent editor
config, but the `temp_` prefix and the `user_files/` location put it inside a directory
`.gitignore` treats as scratch (`**/user_files/**`) — while the file itself is tracked. The
extension model hardcodes the path:
`settingsPath: 'extensions/dsa-cli/user_files/temp_settings.json'`.

**(h) `schedule-settings.json` is personal data, not configuration.** It contains the
author's gym routine, accent-practice habit, Trello board URLs
(`trello.com/b/OcpjKQNZ/todo-board`), and enrolled EdX/MIT course links, shipped as if they
were the product default. Whatever happens to the `schedule-assistant` feature (see §12),
this file needs a neutral replacement.

### 7.3 Target design

One config file, one schema, one loader. It lives at the root of the vault (§5.2), so it is
tracked by the user alongside their decks:

```
$MASTERY_HOME/config.json                    # the ONLY live settings file
  {
    "version": 1,
    "editor": "nano",                        # absorbed from temp_settings.json
    "quiz": { ... },
    "decks": { "masks": [], "active": [] },
    "llm": { "provider": "ollama", "base_url": "...", "api_key": "" },
    "dsa": { ... },                          # was extensions/dsa-cli/user_files/temp_settings.json
    "schedule": { ... }                      # if the feature survives §12
  }

content/config.default.json                  # shipped template (committed, was _settings.json)
content/schedule.example.json                # neutral replacement for schedule-settings.json
```

With the extension system gone (§6) there is no per-extension settings namespace to design —
feature config is just top-level keys with an owner. `api_key` is the one field that should
**not** be tracked: keep it out of `config.json` and read it from `MASTERY_LLM_API_KEY`, or
the vault `.gitignore` has to carve out a single key inside a tracked file, which it cannot
do.

Rules:

1. **One loader.** `src/SettingsManager.js` becomes the only reader/writer. `src/settings.js`
   is deleted; its consumers (`Quizzer`, `QuizzerWithDSA`, `termScheduler`,
   `MiniTermScheduler`, `dsa-cli/extension.js`) switch to `SettingsManager.getSettings()`.
   This kills problem (e) — there is no second cached view left to drift.
2. **Singleton.** Export a module-level instance so every call site shares one object. Today
   `utils.js:335`, `utils.js:588`, and `Quizzer.js:1116` each do `new SettingsManager()` and
   re-`require` the JSON.
3. **No `require()` for JSON config.** Use `fs.readFileSync` + `JSON.parse` so writes are
   observable and the module cache is not involved.
4. **No per-feature settings files.** `ExtensionModel`'s `settingsPath` option disappears
   with the extension system (§6). `src/extensions/dsa-cli/settings-manager.js` is deleted;
   the DSA trainer reads `config.editor` from the one loader.
5. **Config lives in the vault**, resolved by `vault.js` (§5.3 rule 7) — never inside the
   package, so `npm install -g` upgrades cannot clobber it and the repo can never accumulate
   another committed live config.
6. **`version` field + migration.** A `migrate(config)` step lets the schema change without
   silently breaking existing installs, and gives the legacy-path migration logic now living
   in `userDataPaths.js` a defined home.
7. **Validate on load.** A small schema check (hand-rolled or `ajv`) that reports unknown and
   malformed keys, instead of today's behaviour where a typo'd key is silently ignored.

### 7.4 Naming rules for settings

| Concern | Rule |
| --- | --- |
| Shipped defaults | `config.default.json` — never `_`-prefixed |
| Live user config | `config.json`, outside the repo |
| Example / sample data | `*.example.json` |
| Keys | `snake_case` throughout — the current file mixes `quiz_enabled` (snake) with `llm.baseUrl` and `maxFollowupTokens` (camel); snake matches the majority |
| Booleans | Positive phrasing, no double negatives (`show_http_errors`, not `no_http_errors`) |
| Class | One `SettingsManager`; per-extension access via accessor, not a second class |

The `_settings.json` → `config.default.json` rename also removes a footgun: `settings.js`,
`SettingsManager.js`, and `userDataPaths.js` all call
`migrateLegacyUserDataPath('_settings.json')`, so the underscore name is currently
load-bearing in three places.

---

## 8. Command & Help Standardization

### 8.1 Three registries that disagree

Command definitions live in three places that are never reconciled:

| Source | Contents | Count |
| --- | --- | --- |
| `src/cli.js` → `CommandsInformation` | **Help text only** — never dispatches | 27 |
| `src/utils.js` → `this.commandHandlers` | **Dispatch only** — never documented | 32 |
| `src/extensions/*/extension.js` → `getCommands()` | Both, but merged after help is built | 6 |

`index.js` dispatches from `{...mastery.commandHandlers, ...extensionCommands}` and adds a
7th extension command (`extensions`) inline. `cli.js` builds its help string at module load,
*before* `ExtensionManager` runs — so extension commands can never reach the help text
automatically.

### 8.2 The resulting drift

**Documented but not executable (2):**

| Command | What happens |
| --- | --- |
| `co` | **Broken twice.** The handler is named `coa`, not `co` — and `index.js:88` runs `input.includes(options[0]) && cli_meow.showHelp(0)`, where `options[0]` is the first key of `cmInfo.commands`, i.e. `'co'`. meow's `showHelp(0)` calls `process.exit(0)` (`node_modules/meow/index.js:179`), so `mastery co` prints help and exits. The command advertised at the top of `--help` cannot be run. |
| `help` | No handler by that name; it works only by falling through to the not-found branch. |

**Executable but undocumented (13):** `hello`, `poh`, `log`, `skill`, `services`, `imath`,
`lastses`, `entries`, `mdsa`, `jupyter`, `sample`, `demo-info`, `extensions`.

`poh` is documented in `Readme.md` (`mcli poh`) but absent from `--help`. `services` is
explicitly commented out in `cli.js` yet still dispatches. `mdsa` is a real DSA mode that
`--help` never mentions. `hello`, `log`, and `sample` are scaffolding stubs.

**Duplicated metadata:** `dsa` and `cloze` are declared in *both* `cli.js` and the DSA
extension's `getCommands()`. The descriptions have already diverged, and `mdsa` was added to
the extension without being added to `cli.js` — which is exactly the mechanism of the drift.

**Two classes named `Command`:** `cli.js` defines `Command(desc, code)`;
`src/extensions/models.js` defines `Command(desc, code, meta)` carrying `usage`, `examples`,
and per-command `flags`. `src/local-modules/cli-help.js` reads only `.desc`, so the richer
metadata extensions already supply is collected and then discarded.

### 8.3 Flag problems

| Flag | Issue |
| --- | --- |
| `--type, -t` | *"What kind of jokes do you want [chuck\|nerdy]?"* — leftover from the CLI boilerplate this project was scaffolded from. No handler reads it. Delete. |
| `--clear` / `--noClear` | Both `boolean`, both `default: true` — mutually contradictory defaults. meow supports `--no-clear` natively; drop `noClear`. |
| `--debug, -d` | Declared and documented, but nothing branches on it (see §9.2 on logging). Either wire it to the logger or remove it. |
| `--all, -a` | Described as "Get all algorithms" — a DSA-specific flag declared globally. Belongs to `dsa` / `mdsa`. |
| `--reset, -r`, `--backup, -b` | Same: command-scoped flags declared globally, so `--help` implies they apply everywhere. |
| `--llmFollowup` | camelCase in the definition; meow exposes it as `--llm-followup`. The help text prints `--llmFollowup`, which is not what the user types. |

### 8.4 Target: a single command registry

Move every command into one manifest and generate both dispatch and help from it:

```js
// src/commands/registry.js
{
  name: 'session',
  aliases: ['ses'],
  group: 'study',
  desc: 'Start a study session',
  usage: 'mastery session [--filtered] [--cloze] [--math] [--algo]',
  examples: ['mastery session', 'mastery session --filtered'],
  flags: { filtered: {...}, cloze: {...} },
  handler: require('./session')
}
```

- `cli.js` builds help by reading the registry — including extension commands, which register
  into the same structure. One source of truth ends the drift permanently.
- `cli-help.js` is extended to render `usage`, `examples`, and per-command flags, which the
  extension `Command` model already carries.
- Dispatch resolves `name` **or** `aliases`, so every short form keeps working.
- `mastery help <command>` becomes possible for the first time.

### 8.5 Proposed command names

Canonical names are readable kebab-case; every current name survives as an alias, so nothing
breaks for the existing user.

**Study — collapses seven near-duplicate commands into one plus flags:**

| Current | Canonical | Alias |
| --- | --- | --- |
| `ses` | `session` | `ses` |
| `fses` | `session --filtered` | `fses` |
| `lastses` | `session --reverse` | `lastses` |
| `cses` | `session --cloze` | `cses` |
| `mcses` | `session --cloze --math` | `mcses` |
| `amses` | `session --algo` | `amses` |
| `mamses` | `session --algo --math` | `mamses` |

**Git workflow:**

| Current | Canonical | Alias | Note |
| --- | --- | --- | --- |
| `co` / `coa` | `commit` | `co`, `coa` | fixes the §8.2 dead command |
| `poh` | `push` | `poh` | currently undocumented |

**Decks & masks** — already consistent; keep `mask-list`, `mask-toggle`, `mask-create`,
`mask-status`, and rename the bare `masks` to `mask` so the whole group shares one prefix
(`mask` with no subcommand opens the interactive manager).

**Practice:** `dsa` and `mdsa` → `dsa` and `dsa --markdown`; `cloze` stays; `jupyter` stays
if the data-science feature survives §12. With extensions flattened (§6) these become
ordinary registry entries rather than a separately merged set.

**Vault & config:** `code` → `vault path` (it prints a directory; `code` reads as "open in
VS Code"), plus the rest of the `vault` group from §5.4; `setting` → `config` (fixes the
singular/plural inconsistency and aligns with §7.3's `config.json`).

**Reports:** `skill` and `entries` → `report --skills` and `report --entries`.

**Delete:** `hello` and `sample` (scaffolding), `log` (a stub that prints
`'Logging 30 minutes of work'` and does nothing else), `imath` (an undocumented
score-bumping backdoor), `services` (already commented out of help), and `sample`,
`demo-info`, `extensions` — all three die with the extension system (§6.3).

### 8.6 Help text fixes

- `co`'s description reads *"using the Questins pipeline"* — typo for "Questions".
- `report` is described as *"Generate a report that includes weather data"*; it reports study
  progress, and the weather integration is gone.
- Group commands under headings (`Study`, `Practice`, `Decks`, `Git`, `Config`) — 27+ flat
  entries is past the point where a flat list helps anyone.
- Print the canonical name with its aliases: `session (ses, fses, cses, …)`.
- Add a real `Examples:` block; the current one only demonstrates `help` and `--version`.
- Show extension commands, marked with their source extension.

---

## 9. Code Cleanup

### 9.1 God objects

`src/utils.js` (69 KB) and `src/Quizzer.js` (75 KB) hold 310 of the ~370 `console.log`
calls in `src/` and most of the command dispatch. Splitting them is the single biggest
readability win for a new contributor, but it is **not a publish blocker** — schedule it
after the repo is public. Suggested split when it happens:

- `utils.js` → `Mastery` class + `commands/` directory, one module per command group
  (`commands/session.js`, `commands/masks.js`, `commands/report.js`, `commands/commit.js`)
- `Quizzer.js` → `Quizzer` (orchestration) + `QuizRenderer` (all terminal output) +
  `AnswerEvaluator`

### 9.2 Logging

Replace ad-hoc `console.log` with the existing `src/log.js` seam, extended to support
levels (`debug`/`info`/`warn`/`error`) honouring the existing `--debug` flag and the
`logging` key already present in `_settings.json`. This is mechanical and can be done
incrementally, but the `--debug` flag currently does nothing observable, which is a
documented-but-broken feature.

### 9.3 Confirmed bugs found while surveying

1. **`src/settings.js:41` and `src/SettingsManager.js:29`** — the "neither settings.json
   nor _settings.json found" error path calls `path.dirname(...)`, but neither module
   requires `path`. Both error handlers throw `ReferenceError` instead of the intended
   message. Same copy-pasted block in both files — see §7.2(d).
2. **`src/init.js`** — exports `({ clear = true }) => {}`, an empty function, and requires
   `package.json` for an unused `pkg` binding. Either implement the welcome banner or
   delete the module.
3. **`index.js:88`** — `input.includes(options[0]) && cli_meow.showHelp(0)` makes the
   first help-declared command (`co`) print help and exit instead of running. See §8.2.
4. **`package.json` `files` field** — see §2.4.

### 9.4 Tooling to add

- **ESLint** (`eslint:recommended` + `plugin:node/recommended`), wired into CI. Will
  surface the §9.3 class of bug automatically.
- **Prettier** — `.prettierrc.json` already exists and `npm run format` works; add a
  `format:check` script and enforce it in CI.
- **`.editorconfig`** — the repo uses tabs in `src/` and the parser has indentation-
  sensitive tests (`test_code_indentation.js`); make it explicit.
- **`.nvmrc` / `engines`** — the code uses `execa@6` (ESM-era) and `fs.rmSync`; declare
  `>=16`.

---

## 10. Documentation & Community Files

| File | Content |
| --- | --- |
| `LICENSE` | **Decision required.** MIT is the low-friction default for a CLI tool. |
| `README.md` | Rewrite. Current version links a dead compiled build (`k00.fr/lak37m7l`), documents `mcli` while the code says `mastery`, contains a "Currently under development / We are cleaning up the codebase" section that should become a roadmap, and instructs users to `npm install file:custom_modules/…` for modules that have already been vendored into `src/local-modules/`. |
| `CONTRIBUTING.md` | Dev setup, `npm link` workflow, test command, naming conventions from §4, deck-authoring guide. |
| `CODE_OF_CONDUCT.md` | Contributor Covenant 2.1. |
| `CHANGELOG.md` | Start at the published version (`1.0.33`) or reset to `0.1.0` alongside the fresh history. |
| `SECURITY.md` | Minimal — the tool is offline-first; note the LLM feature talks to a user-configured `baseUrl` (default `http://localhost:11434/api`, Ollama) and sends card content to it. |
| `.github/workflows/ci.yml` | Node 18/20/22 matrix × ubuntu/windows: install, lint, format:check, test. |
| `.github/ISSUE_TEMPLATE/` | Bug report + feature request. |
| `docs/` | Publish generated JSDoc to GitHub Pages from CI; keep it out of the repo. |

The `Readme.md` claim "100% offline. So that this can be used in corporate environments
(not sending any data to the cloud)" needs qualification now that `src/llm/` exists — the
default is a local Ollama endpoint, but `providers/` supports OpenAI-compatible remote
endpoints and `_settings.json` has an `apiKey` field. Reword to "offline by default".

---

## 11. Execution Order

Each phase is a reviewable PR against an `oss-prep` branch. Phases 0–8 are the publish gate.

Phases 3 and 4 are the two architectural changes, and their order matters: **flatten the
extensions first**, so the vault migration has one path resolver to change instead of two
(§6.5).

**Phase 0 — Decisions (blocking, no code)**
- [ ] Confirm the two architecture calls: single user vault (§5) and no extension system (§6)
- [ ] Decide what ships as sample content vs. what is removed (§3.2, §12)
- [ ] Choose license (MIT recommended)
- [ ] Choose history strategy (clean history recommended)
- [ ] Confirm canonical bin name (`mastery` + `mcli`)
- [ ] Confirm the public repo name/org

**Phase 1 — Prune**
- [ ] `git rm -r --cached` the runtime-state paths already listed in `.gitignore`
- [ ] Delete `docs/`, all `dist/`, `custom_modules/custom-template/`, dead modules (§3.1)
- [ ] Commit the pending `data/debuging.json` deletion
- [ ] Consolidate `.gitignore` — 3 generations of rules, dead `utils/dsa-cli/…` paths, a
      Windows-backslash entry git ignores, and a `!**/cache.json` negation on line 1 that
      contradicts line 26
- [ ] Verify `mastery report`, `mastery quiz`, `mastery dsa` still run

**Phase 2 — Tests green (moved early: everything after this needs a safety net)**
- [ ] Pick one runner (**Mocha** — 10 of 11 files already use it, and it is the declared devDependency)
- [ ] Convert `test_deletion_queue_storage.test.js` from Jest to Mocha
- [ ] Fix `makefile`'s `jest tests` target
- [ ] Repoint `test_md_problems_parser.test.js` at the surviving parser
- [ ] Add `.mocharc.json`; make `npm test` (not `npm run tests`) the entry point
- [ ] Fold `src/extensions/dsa-cli/dsa_tests/` and `src/schedule-assistant/tests/` into the run
- [ ] Add characterization tests for the storage classes before they are moved in Phase 4

**Phase 3 — Flatten the extensions (§6)**
- [ ] Delete `src/extensions/demo/` and the `sample`, `demo-info`, `extensions` commands
- [ ] Move `dsa-cli/` → `src/features/dsa/`, dropping `extension.js`
- [ ] Move or cut `data-science-cli/` (one command, `jupyter` — see §12)
- [ ] Delete `ExtensionManager.js`, `models.js`, `EXTENSION_TEMPLATE.md`, `extensions/README.md`
- [ ] Delete the second `getDirAbsoluteUri` (`features/dsa/functions.js:32`); route through the core one
- [ ] Keep exactly one `Command` class
- [ ] Note the deferred plugin API in `CONTRIBUTING.md` (§6.4)

**Phase 4 — The user data vault (§5)**
- [ ] `userDataPaths.js` → `vault.js`; resolution order `$MASTERY_HOME` → OS data dir → error
- [ ] Remove the legacy-root fallback that silently reads from `src/user_data/` (§7.2(a))
- [ ] Repoint the 9 storage classes at `progress/`, `stats/`, `.cache/` per §5.2
- [ ] Move DSA state (`db.json`, `user_files/`) into the vault; delete the `.bak` logic (§5.3 rule 5)
- [ ] Rename `cache_md/` → `decks/`; `cache.json` → `.cache/parsed/`
- [ ] Stable key ordering + 2-space indent on tracked JSON (§5.3 rule 4)
- [ ] Ship the vault `.gitignore` and `README.md`; add `mastery vault init|path|status|migrate`
- [ ] Legacy migration from `src/data/user_data/` with a `MIGRATED` marker, non-destructive

**Phase 5 — Settings consolidation (§7)**
- [ ] Delete `src/user_data/` (the committed legacy duplicates)
- [ ] Rename `_settings.json` → `config.default.json`; update the three
      `migrateLegacyUserDataPath('_settings.json')` call sites
- [ ] Fix the duplicated `path.dirname` bootstrap bug in `settings.js` and `SettingsManager.js`
- [ ] Delete `src/settings.js`; make `SettingsManager` a singleton and the only loader
- [ ] Switch from `require()` to `readFileSync` + `JSON.parse`
- [ ] Fold `temp_settings.json` into `config.dsa`; delete the second `SettingsManager`
- [ ] Replace `schedule-settings.json` with `content/schedule.example.json`
- [ ] Add `version` + `migrate()` + load-time validation; move `api_key` to an env var
- [ ] Regression test: mask toggle, then session start, must observe the same config object

**Phase 6 — Command & help unification (§8)**
- [ ] Build `src/commands/registry.js`; generate dispatch **and** help from it
- [ ] Fix the `co` dead-command bug in `index.js:88`
- [ ] Register the 13 undocumented commands or delete them (§8.5)
- [ ] Add the `vault` command group (§5.4)
- [ ] Remove `--type`, reconcile `--clear`/`--noClear`, scope `--all`/`--reset`/`--backup`
- [ ] Add aliases so every current command keeps working
- [ ] Extend `cli-help.js` to render `usage`, `examples`, per-command flags, and groups
- [ ] Add `mastery help <command>`
- [ ] Snapshot-test `--help` so it cannot silently drift from the registry again

**Phase 7 — Metadata & packaging**
- [ ] Fix `package.json`: license, author, `repository`, `bugs`, `homepage`, `engines`,
      and the broken `files` array (§2.4)
- [ ] Trim bin aliases to `mastery` + `mcli`
- [ ] Verify with `npm pack --dry-run` that the tarball contains a working CLI and **no**
      user state
- [ ] Add `LICENSE`

**Phase 8 — Naming**
- [ ] `git mv` renames from §4.3, in a commit containing *only* renames
- [ ] Follow-up commit updating all `require()` paths
- [ ] Rename the 26 snake_case methods and their call sites (§4.4)
- [ ] `Readme.md` → `README.md`, `makefile` → `Makefile`

**Phase 9 — Docs & CI**
- [ ] Rewrite `README.md`; add `CONTRIBUTING.md`, `CODE_OF_CONDUCT.md`, `SECURITY.md`, `CHANGELOG.md`
- [ ] Document the vault (§5) prominently — "your data is yours, here is how to back it up"
- [ ] Document naming conventions (§4.2, §4.4, §7.4) in `CONTRIBUTING.md`
- [ ] Add ESLint (`camelcase` rule on, matching §4.4), `.editorconfig`, `.nvmrc`
- [ ] Add CI workflow; add JSDoc → Pages workflow


---

## 12. Open Questions

1. **Sample decks** — author fresh, or extract the non-book decks (`2-abstract-algebra`,
   `7-math-analysis` are original notes; `language-libraries` is largely from public
   library docs and may be permissible with attribution)? Cheapest path is fresh, small,
   purpose-built decks.
2. **`language-libraries` (196 files)** — derived from public documentation for FastAPI,
   pandas, scikit-learn, Kubernetes, Node.js, ERPNext, Excalidraw, plus game wikis
   (RimWorld, Project Zomboid, Democracy 4). Licensing varies per source. Treat as
   out-of-scope for v1 and exclude; revisit as a separately licensed deck repo.
3. **Decks as a separate repo?** — `mastery-cli-decks` would keep the tool repo small and
   let deck licensing be handled independently. `_settings.json` already has an
   `external_term_modules` key, suggesting the architecture anticipates this.


> I like this idea, contian the decks as a separate repo, but for now, in the makefile, have a way to sync the dev decks as the dev repo items 
> make commands for uploading syncing the decks (for the dev). I want a way where this pull would isntall the decks as well as the stats and the setting sconfigurations (so is all the custom data in one single repository)

4. **npm name** — `mastery-cli@1.0.33` is already published under the placeholder author
   metadata. Continue that line, or publish fresh under a scoped name (`@n3wang/mastery-cli`)? -> `@n3wang/mastery-cli`
5. **`schedule-assistant`** — is this feature live? It has no CLI command in `cli.js` and
   its only output is a 29-byte `report.json` stub. Ship, or cut for v1? -> remove it entirely, is not live, no even sure what it does

6. **Config location** — moving to the OS config dir (§7.3 rule 5) is correct for a
   globally installed CLI, but it breaks the current `mastery code`/`setting` workflow of
   "open the settings file inside the repo". Confirm the move, and whether a
   `MASTERY_CONFIG_DIR` env override is wanted for portable/corporate installs.
7. **Breaking the `*ses` commands** — the alias plan (§8.5) keeps every short form working
   indefinitely. Is that permanent, or should aliases be deprecated with a warning and
   removed at 2.0? Only affects the existing single user today. -> remove entirely, i am the only user
8. **Undocumented commands** — `skill`, `entries`, `lastses`, `imath`, and `poh` are live
   handlers that never appear in `--help`. Which are real features to document, and which
   are experiments to delete? `hello`, `log`, and `sample` look clearly droppable; the
   others need your call. -> remove hello, log, sample, document what are not documented
9. **Vault default location** — `<OS data dir>/mastery-cli` is the conventional answer, but
   a vault the user is meant to `git init` and look at might belong somewhere more visible
   (`~/mastery`, or a path they pick at `vault init`). Buried-and-correct vs. visible-and-
   discoverable is a real trade here.
10. **Session state across machines** — see §5.5. Keeping queues in `.cache/` means a
    session started on one machine cannot be resumed on another. Probably right, but confirm.
11. **`data-science-cli`** — 86 lines exposing a single `jupyter` command. With the extension
    wrapper gone, is this a feature worth keeping in core, or does it go?
12. **Plugin API later?** — §6.4 defers it. Worth stating a position in `CONTRIBUTING.md` so
    the removal reads as a decision, not an oversight.
