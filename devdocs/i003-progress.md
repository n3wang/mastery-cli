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
| 3 | Flatten extensions | pending | |
| 4 | User data vault | pending | |
| 5 | Settings consolidation | pending | |
| 6 | Command & help unification | pending | |
| 7 | Metadata & packaging | pending | |
| 8 | Naming | pending | |
| 9 | Docs & CI | pending | |
| 10 | History & publish | **deferred — needs confirmation** | |

## Log

- Created branch `oss-prep` off `master`, tagged `pre-oss-prep-archive`.
- **Phase 1** `06fce93`: 2654 -> 2485 tracked files. Removed docs/, 8 dist/ dirs,
  vendored JSDoc template, src/user_data/ duplicate, dead modules. jsdoc.json still
  pointed at the long-gone `utils/` dir; repointed at `src/`. .gitignore rewritten.
- **Phase 2** `d44b5b0`: suite runs. 129 passing, 3 pending.

### Carried forward from phase 2

- `src/schedule-assistant/StorableReport.js:7` defaults to the bare filename
  `'report'`, so JsonDB resolves it against `process.cwd()` and the CLI drops a
  `report` file into whatever directory it was run from. Gitignored for now;
  **fix in phase 4** when it moves to the vault.
- `src/extensions/dsa-cli/dsa_tests/` has 4 pre-existing failures, at least two of
  which are path-resolution bugs from the duplicate `getDirAbsoluteUri`
  (one resolves to `E:/projects-git/solutions/...`, a level too high).
  **Fold into the suite in phase 3** once that resolver is gone.
- 3 pending tests, each with a TODO in place:
  - 2x `parseMarkdownCards` trailing-entry at EOF - needs a product decision
    (spec says emit, code has it commented out with a duplicate-prevention note)
  - 1x `parseMarkdownProblemsFromModules` - needs $MASTERY_HOME from phase 4
