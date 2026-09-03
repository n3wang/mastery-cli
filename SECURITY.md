# Security Policy

## Reporting a vulnerability

Please report security issues privately by opening a
[security advisory](https://github.com/n3wang/mastery-cli/security/advisories/new)
rather than a public issue. You can expect an initial response within a week.

## What this tool does with your data

Mastery CLI is **offline by default**. It has no account system, sends no
telemetry, and makes no network requests during normal use.

Everything it stores lives in one directory on your machine — your vault, at
`$MASTERY_HOME` (default `<OS data dir>/mastery-cli`). Run `mastery vault path`
to see exactly where.

## The one thing that can leave your machine

The optional language-model integration (`mastery llm`) is **disabled by
default**. When you enable it, the text of the card you got wrong — its prompt,
your answer and the expected answer — is sent to whatever endpoint you have
configured in `llm.baseUrl`.

The default is a local [Ollama](https://ollama.com) instance
(`http://127.0.0.1:11434`), which stays on your machine. If you point it at a
remote OpenAI-compatible endpoint, that content goes to that third party under
their terms, not ours.

Check what is configured with `mastery llm status`.

## API keys

If your endpoint needs a key, pass it through the `MASTERY_LLM_API_KEY`
environment variable rather than writing it into `config.json`. The vault is
designed to be committed to your own git repository, and a key in a tracked file
is a key you will eventually push.

## Scope

Things we consider security issues:

- Reading or writing files outside the vault and the package
- Executing content from a deck or problem file as code unexpectedly
- Leaking vault contents to a network endpoint the user did not configure

Things we do not:

- The DSA runner executes the solution code you write, by design
- `mastery commit` runs git commands on your behalf, by design
