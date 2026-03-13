# i002 - Local LLM Wizard and Follow-Up Q&A Plan

## Overview

Add an optional local-LLM integration that can be enabled/disabled quickly, configured through a guided wizard, and used during flashcard review to ask deeper follow-up questions when the user wants help (for example after entering `n` for an incorrect response).

This must remain fully optional. Core CLI behavior should work with zero LLM setup.

---

## Goals

- Provide a simple local setup path (wizard) for connecting to a local model runtime.
- Provide fast toggles (`on`/`off`) and CLI flags for one-off runs.
- Add a review-time option to request deeper explanation/questioning from the local LLM.
- Keep existing grading/rating/retry flows intact.
- Avoid sending data to cloud services by default.

## Non-Goals (for i002)

- No remote API provider support.
- No model fine-tuning pipeline.
- No major rewrite of the deck/review engine.

---

## User Experience Design

### 1. First-time setup wizard

Trigger paths:
- Explicit command: `mcli llm`
- Implicit prompt when user tries an LLM feature with no config

Wizard prompts:
1. Enable local LLM integration? (`yes/no`) -> clicking no turns off and offs the setup
2. Local provider type:
- `ollama`
- `openai-compatible-local` (LM Studio, vLLM, LocalAI)
- `custom-http`
1. Base URL (default by provider, e.g. `http://127.0.0.1:11434`)
2. Model name (example: `llama3.1:8b-instruct`)
3. Timeout ms (default `12000`)
4. Optional system prompt profile (`coach`, `strict-grader`, `socratic`)
5. Test connection now? (`yes/no`) -> will check if not will ask to from step 1 or cancel

Success output:
- Confirmation + detected model/provider.
- Next-step hints (`mastery llm on`, `mastery llm status`).

### 2. Quick on/off controls

Commands:
- `mastery llm on`
- `mastery llm off`
- `mastery llm status`
- `mastery llm setup`
- `mastery llm test`

One-off runtime flags:
- `--llm` (force enable for this run)
- `--no-llm` (force disable for this run)
- `--llm-followup` (enable follow-up helper for review flow)
- `--no-llm-followup` (disable follow-up helper)

Precedence:
1. CLI flags
2. Environment vars
3. settings.json

### 3. Flashcard flow integration (`n` path)

Current flow sample indicates:
- User answers question.
- User confirms correctness (`Y/n`).
- On incorrect (`n`), user selects next action.

Add one new optional action:
- `Ask local LLM for guided follow-up`

Expected behavior:
- LLM receives question + user answer + optional canonical notes/explanation will open a query for the user to input something like "explain the solutin in this way to me" (follow up ai question).
- LLM returns:
1. in one go
   1. What was incorrect/missing (short)
   2. Correct explanation (or based on the follow up ai question)
   3. One follow-up check question to check user understanding (smaller concpet)
      1. the user replies with its check of the small concept
      2. the AI replies and checks the knowledge to confirm and provides feedback. 
   4. goes back to the no - options (? What would you like to do? ... 
   Continue to next question
    Try the question again
    Provide feedback about this term
    Move to deletion queue
    Rate this flashcard)


Guardrails:
- If LLM unavailable, show fallback message and continue normal flow.
- Never block review loop due to LLM timeout/errors.

---

## Settings and Data Model

Target file:
- `~/.mastery-cli/settings.json` (or current settings path before i001 migration)

Proposed schema:

```json
{
  "llm": {
    "enabled": false,
    "baseUrl": "http://127.0.0.1:11434",
    "model": "llama3.1:8b-instruct",
    "timeoutMs": 12000,
    "followupEnabled": true,
    "maxFollowupTokens": 300,
  }
}
```

Validation rules:
- `enabled`, `followupEnabled`: boolean
- `baseUrl`: valid URL
- `timeoutMs`: integer, min `1000`, max `120000`
- `model`: non-empty string
- Unknown provider => soft warning + skip LLM calls

---

## Architecture and Code Touch Points

### New modules

- `src/llm/LocalLLMClient.js`
- `src/llm/providers/OllamaProvider.js`
- `src/llm/LLMService.js`
- `src/llm/prompts/followupPrompt.js`
- `src/llm/wizard.js`

### Existing files likely to update

- `src/cli.js`
- `src/settings.js` and/or `src/SettingsManager.js`
- `src/Quizzer.js` and/or `src/QuizzerWithDSA.js`
- `src/constants.js` (new defaults)
- `README.md` (new commands and examples)

Notes:
- Any new CLI feature must be registered in `src/cli.js`.
- Keep dependency footprint light; prefer built-in `fetch` or existing HTTP utility.

---

## Prompt and Response Contract

Follow-up prompt template inputs:
- `term/question`
- `user_answer`
- `expected_answer` (if available)
- `difficulty/rate` context (optional)

Expected output shape (strict plain text blocks):
1. `Diagnosis:` one to three bullets
2. `Correct Answer:` short paragraph
3. `Check Question:` one question
4. `Hint:` optional one-liner

If output is malformed:
- Fallback to raw text display.
- Do not crash review flow.

---

## Implementation Phases

### Phase 1 - Foundation

- Add settings schema + defaults + validation.
- Build provider-agnostic client interface.
- Add provider implementations (`ollama`, openai-compatible local).
- Add `mastery llm status` and `mastery llm test`.

### Phase 2 - Wizard and toggles

- Implement `mastery llm` interactive wizard.
- Implement `mastery llm on|off` commands.
- Implement run flags `--llm`, `--no-llm`, `--llm-followup`, `--no-llm-followup`.
- Add precedence logic (flag > env > settings).

### Phase 3 - Review loop integration

- Add optional menu action after incorrect response.
- Call LLM service and render structured output.
- Add robust error/timeouts with non-blocking fallback.


## CLI Proposal (Draft)

```bash
mastery llm
mastery llm on
mastery llm off
mastery llm status
mastery llm test

mastery quiz --llm --llm-followup
mastery quiz --no-llm
```

---

## Error Handling Requirements

- Timeouts return user-friendly message: `Local LLM timed out; continuing without follow-up.`
- Connection errors suggest action: `Run: mastery llm test`.
- Invalid config suggests wizard rerun: `Run: mastery llm setup`.
- Never abort a session due to LLM failure.

---

## Security and Privacy

- Default host should be localhost.
- No outbound cloud calls in local mode.
- Avoid logging raw sensitive answers unless user explicitly enables debug logging.
- Redact auth headers if openai-compatible local endpoint uses tokens.

---

## Acceptance Criteria

- User can configure local LLM in under 2 minutes via wizard.
- User can toggle on/off without editing JSON manually.
- When user marks answer wrong (`n`), they can request LLM-guided follow-up.
- If local LLM is unavailable, session continues with existing behavior.
- All new commands documented and discoverable via help.

---

## Testing Plan

Manual tests:
- Wizard happy path (Ollama running).
- Wizard failure path (invalid URL, unavailable model).
- On/off toggles persist in settings.
- Flag precedence over settings.
- Review flow with incorrect answer and follow-up request.
- Offline mode fallback.

Automated tests:
- Settings schema validation.
- Command parser tests for `llm` subcommands and flags.
- LLM service timeout and malformed response handling.
- Quiz flow branch tests for follow-up action.
---

