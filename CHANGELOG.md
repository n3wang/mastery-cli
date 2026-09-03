# Changelog

All notable changes to this project are documented here. The format follows
[Keep a Changelog](https://keepachangelog.com/en/1.1.0/), and this project uses
[semantic versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

The open-source preparation pass. Large internal changes; every existing command
still works under its original name.

### Added

- **A user data vault.** Decks, progress, stats and config now live in one
  directory outside the installed package (`$MASTERY_HOME`, default
  `<OS data dir>/mastery-cli`), structured so you can `git init` it and push it
  to your own private repo. `.cache/` is gitignored for you.
- `mastery vault path | init | status | migrate`. `vault status` reports whether
  you have uncommitted study progress.
- `mastery help <command>` for per-command usage, examples and flags.
- Grouped `--help` output showing aliases alongside canonical names.
- `MASTERY_HOME` to relocate the vault, `MASTERY_LLM_API_KEY` to keep an API key
  out of tracked config.
- Two sample decks, seeded into a new vault on first run.
- `LICENSE` (MIT), `CONTRIBUTING.md`, `SECURITY.md`, `CHANGELOG.md`, CI.

### Changed

- Readable canonical command names — `session`, `commit`, `push`, `mask`,
  `config`, `where`. **Every previous name is kept as an alias.**
- Commands come from a single registry that drives both dispatch and help.
- One settings file, read and written through one `SettingsManager`.
- The `dsa` feature is a plain module rather than a plugin.
- File and method naming standardised; see `CONTRIBUTING.md`.
- Binaries trimmed to `mastery` and `mcli`.

### Fixed

- **`npm install -g mastery-cli` produced a broken CLI.** The published package
  declared `files: ["index.js", "utils"]`, and `utils/` had been renamed to
  `src/`, so the installed binary failed on its first `require`.
- **The published package shipped the author's personal decks and progress.**
- **`mastery co` never ran.** The entry point short-circuited on the first
  command declared in help, printing help and exiting instead.
- **Least-practiced-first selection was broken.** The sampler drew with
  replacement, so a draw of 6 from 6 candidates returned all six only ~1.5% of
  the time and most terms were never scored.
- Running any command dropped a stray `report` file into the current directory.
- DSA progress was written inside the installed package, where an upgrade would
  discard it.
- The test suite did not run at all (mixed Jest and Mocha); it now does, and
  no longer writes to your real data.
- Settings could drift between two views within a single process.

### Removed

- The extension system (~530 lines): no third-party load path existed, and its
  hooks, unload and dependency validation were never called. The DSA feature is
  unaffected.
- The `data-science` feature and its `jupyter` command. It never worked:
  `openJupyter` asked whether a notebook had been solved without opening one,
  `openRandomJupyter` printed "not implemented yet", and `runServer` pointed at
  a directory that did not exist.
- `m-cli` and `maid` binaries; `hello` and `log` placeholder commands; the
  `--type` flag left over from the project scaffold.

## [1.0.33] and earlier

See the git history.
