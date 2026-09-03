# Mastery CLI

**Continuous learning for engineers — flashcards, algorithm practice and habit hooks, in your terminal.**

Mastery CLI turns your markdown notes into flashcards, ships 300+ offline coding
problems with a built-in runner, and hooks study into habits you already have —
every commit can prompt a card or a problem.

It runs **offline by default**: no account, no telemetry, nothing leaves your
machine unless you deliberately configure a language model endpoint.

```sh
npm install -g mastery-cli
mastery vault init     # create your data directory
mastery session        # study
mastery dsa            # practise a coding problem
mastery report         # see how you are doing
```

---

## What it does

| | |
| --- | --- |
| **Markdown flashcards** | Write notes the way you already do; `?p:` marks a prompt and `?x` an answer. Nothing proprietary. |
| **Least-practiced-first** | Cards you keep getting wrong come back sooner. No manual scheduling. |
| **300+ offline problems** | Data structures and algorithms with tests and a built-in runner. No network. |
| **Cloze exercises** | Fill-in-the-blank versions of the same problems, for recall rather than typing. |
| **Deck masks** | Study only what matters this week — exam prep, a new language, one book. |
| **Commit hooks** | `mastery commit "msg"` stages, commits, and quizzes you afterwards. |
| **Your data is yours** | Everything lives in one directory you can `git init` and push to a private repo. |

## Requirements

- Node.js 16 or newer
- An editor on your `PATH` for DSA problems (`nano` by default; set `editor` in your config)

## Your vault

Everything Mastery CLI knows about you lives in one directory, outside the
installed package:

```
$MASTERY_HOME/          # default: <OS data dir>/mastery-cli
├── config.json         # your settings
├── decks/              # your flashcard markdown
├── problems/           # your own DSA problems
├── progress/           # ratings, completion history, review state
├── stats/              # append-only activity log
└── .cache/             # derived; gitignored, safe to delete
```

Because it is one directory, versioning it is ordinary git:

```sh
cd "$(mastery vault path)"
git init && git add -A && git commit -m "my decks"
git remote add origin git@github.com:you/my-study-vault.git && git push -u origin main
```

`.cache/` is already ignored, so your diffs stay readable. `mastery vault status`
tells you what is in the vault and whether you have uncommitted study progress.

Move it anywhere by setting `MASTERY_HOME`.

## Writing a deck

A deck is a directory with an `index.js` and some markdown:

```
decks/my-deck/
├── index.js
└── cards/
    └── 01-basics.md
```

```js
// decks/my-deck/index.js
module.exports = {
	module_path: 'my-deck',
	ABOUT: { title: 'My Deck', skill_category: 'general', author: 'you' },
	CONTENT_FOLDERS: ['cards']
};
```

```markdown
# My Deck

#### Idempotence
An operation you can apply repeatedly without changing the result past the first time.
?p: Why does idempotence matter for a retry policy?
?x
Because a retry is only safe if repeating the call cannot compound its effect.

#### Backpressure
?p: What is backpressure?
??x
A signal from a slow consumer telling a fast producer to slow down.

Without it the producer's work piles up in a queue until something runs out of
memory.
x??
```

- `?p:` a prompt, `?x` a single answer, `??x` … `x??` a multi-line answer
- `mastery create-module` scaffolds this for you

The two decks in `content/decks/` are seeded into a new vault as working examples.

## Commands

Run `mastery --help` for the full grouped listing, or `mastery help <command>`
for one command. Every short form is kept as an alias, so `ses`, `coa`, `poh`
and friends still work.

| Group | Commands |
| --- | --- |
| Study | `session` (`ses`), `session-filtered` (`fses`), `quiz`, `term`, `math` |
| Practice | `dsa`, `mdsa`, `cloze`, `cloze-session` (`cses`), `algo-session` (`amses`) |
| Decks | `mask`, `mask-list`, `mask-toggle`, `create-module`, `prepare-week` |
| Git | `commit` (`co`, `coa`), `push` (`poh`) |
| Vault | `vault path|init|status|migrate`, `config`, `llm` |
| Reports | `report`, `skill`, `entries` |

## Optional: local language model

Off by default. When enabled, Mastery can explain an answer you got wrong.

```sh
mastery llm setup     # walks through it
mastery llm status
```

It talks to whatever `baseUrl` you configure — by default a local
[Ollama](https://ollama.com) instance at `http://127.0.0.1:11434`. Card content
is sent to that endpoint, so point it somewhere you trust. If you configure a
remote OpenAI-compatible endpoint, pass the key through `MASTERY_LLM_API_KEY`
rather than writing it into a config file you might commit.

## Development

```sh
git clone https://github.com/n3wang/mastery-cli.git
cd mastery-cli
npm install
npm test
npm link          # puts `mastery` on your PATH from this checkout
```

Tests run against a throwaway vault, never your real one. See
[CONTRIBUTING.md](CONTRIBUTING.md) for conventions and layout.

## License

MIT — see [LICENSE](LICENSE).
