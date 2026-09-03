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
| 1 | Prune | pending | |
| 2 | Tests green | pending | |
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
