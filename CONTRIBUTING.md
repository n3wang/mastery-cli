# Contributing

Thanks for taking a look. This is a small project; a clear issue is as welcome
as a pull request.

## Getting set up

```sh
git clone https://github.com/n3wang/mastery-cli.git
cd mastery-cli
npm install
npm test
npm link          # `mastery` now runs from this checkout
```

`npm link` makes the global `mastery` command point at your working copy, so you
can try changes immediately. `npm unlink -g mastery-cli` undoes it.

## Your data is never touched by the tests

The suite points `MASTERY_HOME` at a temporary directory (`tests/setup.js`), so
running tests cannot read or write your real vault. If you add a test that
touches the filesystem, resolve paths through `src/vault.js` rather than
hardcoding them, and it will be isolated for free.

## Layout

```
index.js                  entry point: parse, dispatch, exit
src/
├── cli.js                flag definitions; help is generated from the registry
├── vault.js              the ONE path resolver for user data
├── SettingsManager.js    the ONE settings reader/writer
├── commands/
│   ├── registry.js       every command: name, aliases, group, help
│   └── dispatch.js       canonical name -> handler
├── features/             dsa, data-science — plain modules, listed explicitly
├── local-modules/        vendored small helpers, to avoid npm in locked-down setups
└── ...                   storage classes, parsers, the Quizzer
content/                  what ships: default config and sample decks
tests/                    mocha; fixtures in tests/fixtures*
devdocs/                  design notes and plans
```

Three things are deliberately singular. Please keep them that way:

- **One path resolver.** All user data goes through `src/vault.js`. The project
  previously had two `getDirAbsoluteUri` implementations with different roots,
  and one of them wrote user state inside the installed package.
- **One settings loader.** `SettingsManager` is a singleton. `settings.js`
  re-exports its live object; it must not `require()` the JSON, or writes and
  reads drift apart within a single process.
- **One command registry.** `src/commands/registry.js` drives both dispatch and
  `--help`. Adding a command anywhere else means it either runs undocumented or
  is documented and cannot run — both of which used to happen.

`tests/command-registry.test.js` enforces the third one.

## Adding a command

1. Add an entry to `src/commands/registry.js` — canonical name in readable
   kebab-case, plus any historical short form in `aliases`.
2. Map it to a handler in `src/commands/dispatch.js`.
3. `npm test` — the registry test will tell you if either half is missing.

## Adding a feature

Features are plain modules exporting `getCommands()` and `getHandlers(context)`.
Add the directory under `src/features/`, then add one line to the `FEATURES`
array in `src/features/index.js`. There is no discovery step and no plugin API
— see "Why no plugin system?" below.

## Conventions

| Kind | Convention | Example |
| --- | --- | --- |
| Module exporting one class | `PascalCase.js` | `Quizzer.js` |
| Any other module | `kebab-case.js` | `md-terms-parser.js` |
| Directories | `kebab-case` | `schedule-assistant/` |
| Tests | `<subject>.test.js` | `local-storage.test.js` |
| Functions, variables, methods | `camelCase` | `parseMarkdownCards` |
| Classes | `PascalCase` | `DeckMask` |
| Constants | `SCREAMING_SNAKE_CASE` | `CONFIG_VERSION` |
| JSON / config keys | `snake_case` | `quiz_enabled` |

Exception: DSA problem slugs stay kebab-case (`two-sum`) because they mirror the
upstream problem URLs and are matched as data.

Formatting is Prettier with the repo's `.prettierrc.json`:

```sh
npm run format          # write
npm run format:check    # verify, as CI does
```

## Tests

```sh
npm test
```

Mocha, with `assert` from the standard library. Some tests are marked pending
with a `TODO(oss-prep)` explaining what they are blocked on — a product decision
or missing content, not a flake. Please do not delete a pending test to make the
output cleaner; either resolve what it is waiting on or leave it visible.

## Commits and pull requests

- One logical change per commit; say *why* in the body, not just what.
- Keep renames in their own commit, separate from content changes, so reviewers
  can read the diff.
- Run `npm test` and `npm run format:check` before pushing.

## Why no plugin system?

There used to be one: an extension manager that discovered directories,
registered hooks and gave each extension its own settings file. It was around
530 lines serving three first-party extensions, it could not load anything a
user wrote, and its hook system was never called from anywhere.

Third-party plugins are a reasonable future goal — but the command registry is a
better foundation for them than that manager was. A plugin would register
registry entries and receive a vault handle, rather than reimplementing path
resolution and settings storage. Open an issue if you want to work on it.

## Reporting bugs

Include your OS, Node version (`node -v`), the command you ran, and the output
of `mastery vault status`. If it involves your own decks, a minimal markdown
file that reproduces it helps enormously.
