# i003 — Execution Progress Log

**Branch:** `oss-prep` · **Archive tag:** `pre-oss-prep-archive` (points at `master` tip
before any of this work)
**Plan:** [i003-open-source-preparation-plan.md](i003-open-source-preparation-plan.md)

This file is the resume point. If the session dies, read this first, then
`git log --oneline oss-prep` to confirm what actually landed.

## Rules being followed

- One commit per phase, message prefixed `oss-prep(phaseN):`
- Nothing destructive to user data: personal decks and progress are **moved** to the vault
  on the local machine, never deleted
- Phase 10 (history rewrite) and publishing are **NOT** being done — they need explicit
  confirmation

## Decisions taken (defaults chosen where the plan left them open)

| Question | Decision | Note |
| --- | --- | --- |
| License | MIT | plan's recommendation |
| Bin names | `mastery` + `mcli` | dropped `m-cli`, `maid` |
| History strategy | **deferred** | destructive; needs explicit go-ahead |
| npm publish | **deferred** | outward-facing; needs explicit go-ahead |
| Vault default | `<OS data dir>/mastery-cli`, `$MASTERY_HOME` override | §12 Q9 |
| `data-science-cli` | kept, flattened to `src/features/data-science/` | reversible later |
| `schedule-assistant` | kept, personal data replaced with an example | §12 Q5 |
| Test runner | Mocha | already the declared devDependency |

## Phase status

| Phase | Description | Status | Commit |
| --- | --- | --- | --- |
| 0 | Decisions | done | — |
| 1 | Prune | **done** | `06fce93` |
| 2 | Tests green | **done** | `d44b5b0` |
| 3 | Flatten extensions | **done** | `6d1c2d2` |
| 4 | User data vault | **done** | `3e07c5c` |
| 5 | Settings consolidation | **done** | `1036398` |
| 6 | Command & help unification | **done** | `a71353d` |
| 7 | Metadata & packaging | **done** | `b10742d` |
| 8 | Naming | **done** | `24ef0e5` |
| 9 | Docs & CI | **done** | `d053a7d` |
| 10 | History & publish | **NOT DONE — needs your go-ahead** | |

## Log

- Created branch `oss-prep` off `master`, tagged `pre-oss-prep-archive`.
- **Phase 1** `06fce93`: 2654 -> 2485 tracked files. Removed docs/, 8 dist/ dirs,
  vendored JSDoc template, src/user_data/ duplicate, dead modules. jsdoc.json still
  pointed at the long-gone `utils/` dir; repointed at `src/`. .gitignore rewritten.
- **Phase 2** `d44b5b0`: suite runs. 129 passing, 3 pending.
- **Phase 3** `6d1c2d2`: extension system gone. `src/features/{dsa,data-science}`
  are plain modules; `dsa_tests` folded into `tests/dsa`. Fixed the `co`
  dead-command bug in index.js along the way.
- **Phase 4** `3e07c5c`: vault live at `$MASTERY_HOME` (default
  `<OS data dir>/mastery-cli`). Personal decks migrated out of the repo;
  2485 -> 1860 tracked files. 140 passing, 6 pending.

- **Phase 5** `1036398`: six settings files and three loaders -> one file,
  one singleton loader. Deleted userDataPaths.js and the second
  SettingsManager. Replaced the personal schedule with an example.
- **Phase 6** `a71353d`: one command registry drives dispatch and help.
  Feature commands appear in --help for the first time. Snapshot-style
  tests stop the two halves drifting again.
- **Phase 7** `b10742d`: package was broken (files pointed at a directory
  renamed long ago) and shipped personal data. 37.1 MB -> 2.1 MB.
  MIT LICENSE, real metadata, bins trimmed to mastery + mcli.
- **Phase 8** `24ef0e5`: file and method naming standardised;
  26 snake_case methods -> camelCase.
- **Phase 9** `d053a7d`: README rewritten, CONTRIBUTING / SECURITY /
  CHANGELOG added, CI on node 18/20/22 x ubuntu/windows including a job
  that unpacks the tarball and fails if user data leaked into it.
  Deleted custom_modules/ (superseded by src/local-modules).

Final: 2654 -> 1784 tracked files. 152 passing, 6 pending.

### Resolved since

- StorableReport cwd bug: **fixed** in phase 4, now resolves inside the vault.
- `dsa_tests`: **folded in** during phase 3. Four of its failures were real
  bugs and are fixed; three are pending on a content gap.

### Carried forward

- `src/schedule-assistant/StorableReport.js:7` defaults to the bare filename
  `'report'`, so JsonDB resolves it against `process.cwd()` and the CLI drops a
  `report` file into whatever directory it was run from. Gitignored for now;
  **fix in phase 4** when it moves to the vault.
- `src/extensions/dsa-cli/dsa_tests/` has 4 pre-existing failures, at least two of
  which are path-resolution bugs from the duplicate `getDirAbsoluteUri`
  (one resolves to `E:/projects-git/solutions/...`, a level too high).
  **Fold into the suite in phase 3** once that resolver is gone.
- **14 of 319 DSA problems have no solution file** in `src/features/dsa/solutions/`
  (min-distance, score-of-a-string, brick-wall, task-scheduler,
  find-the-celebrity, and 9 more). Three integrity tests are pending on this.
  Closing it means authoring the missing solutions - a content task.
- `src/data/user_data/` is still **on disk** but untracked. Check
  `mastery vault status` looks right, then delete it yourself.
- `leetcode-basics` was missing from disk (removed by the earlier
  "cleanup: big prunning" commit); restored into the vault from `c1fdc645^`.
- 6 pending tests, each with a TODO in place:
  - 2x `parseMarkdownCards` trailing-entry at EOF - needs a product decision
    (spec says emit, code has it commented out with a duplicate-prevention note)
  - 1x `parseMarkdownProblemsFromModules` - needs $MASTERY_HOME from phase 4

## What is left, and why

Phase 10 was deliberately not run. Each item is destructive or
outward-facing, so it needs an explicit decision:

1. **History rewrite.** `.git` is still 197 MB and every earlier commit
   still contains the personal decks and book-derived notes. Untracking
   them (phase 4) does not remove them from history — a clone still gets
   them. Options are a clean orphan history or `git filter-repo`.
2. **Deleting stale branches** (8 on origin).
3. **Pushing to a public repo.**
4. **Publishing to npm.** The tarball is verified working and clean, but
   publishing is irreversible for a given version number.

### Two content decisions still open

- **14 of 319 DSA problems have no solution file.** Three integrity tests
  are pending on it. Authoring them is content work.
- **`data-science` feature is a stub.** `openJupyter` never opens a
  notebook, it only asks whether one was solved. Carried over as-is;
  finish it or drop it.

### Safe to delete once you have checked the vault

`src/data/user_data/` is untracked but still on disk. Everything in it was
copied into the vault — run `mastery vault status` to confirm, then remove
it yourself.
