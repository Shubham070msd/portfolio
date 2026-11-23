# Incident Brief

A portfolio prototype for AI-assisted incident investigation. Python sends a numbered log excerpt to **local Ollama**, requests a structured investigation draft, and validates its shape and source-line references. It never executes commands or changes infrastructure.

## Try without a model

From the repository root, with Python 3.9+:

```sh
python3 tools/incident-triage/triage.py --sample database --demo
python3 tools/incident-triage/triage.py --sample deployment --demo
python3 tools/incident-triage/triage.py --sample backup --demo
```

These are hand-written illustrative outputs, **not AI inference**. The portfolio browser walkthrough uses the same synthetic examples.

## Run actual local inference

Install [Ollama](https://ollama.com/), start it, and pull a model supported by your machine:

```sh
ollama pull llama3.2
python3 tools/incident-triage/triage.py --sample database
python3 tools/incident-triage/triage.py --file ./redacted-excerpt.txt --model llama3.2 --timeout 120
```

Review and redact real log excerpts before use. Requests go to `127.0.0.1:11434/api/chat`; proxy variables are ignored and redirects are rejected. No cloud provider, API key, Python dependency, or browser-to-model connection is required. Use a locally downloaded model; model hosting behavior is managed by your Ollama installation.

## Data flow

UTF-8 excerpt → preserved line numbers → Ollama chat with JSON schema → shape and citation-range validation → JSON investigation draft → engineer review.

Output contains a summary, tentative hypothesis, evidence lines, up to five diagnostic checks, and explicit uncertainty. Input is bounded at 32 KiB / 200 lines. Oversized input and malformed, incomplete, or incorrectly cited output fail with a nonzero exit status instead of displaying a plausible fallback.

## Limits

This is a new local prototype, not a production incident-response system. Citation validation establishes only that line numbers exist; it cannot establish factual support or correctness. Logs can contain misleading or adversarial content. The system prompt separates log data from instructions, but cannot guarantee model compliance. No suggestions are executed. Review recommendations against the actual environment.

No model-quality benchmark or deployment performance is claimed. Automated tests mock the Ollama transport; they do not measure model accuracy. Browser samples are illustrative and do not demonstrate live model quality.

## Tests

```sh
python3 -m unittest discover -s tools/incident-triage -p 'test_*.py' -v
```

Tests cover source references, invalid output, oversized input, offline failure, the HTTP request contract, and the separation of offline examples from inference.

API references: [Ollama chat](https://docs.ollama.com/api/chat), [structured outputs](https://docs.ollama.com/capabilities/structured-outputs).
