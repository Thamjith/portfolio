# AGENT.md

This file provides default guidance for coding agents working in this repository.

## Purpose

- Keep changes small, clear, and easy to review.
- Preserve existing project conventions.
- Prefer safe, reversible changes.

## Working Rules

- Read relevant files before editing.
- Avoid unrelated refactors unless explicitly requested.
- Do not remove or overwrite user-authored changes without confirmation.
- Add or update tests when behavior changes.
- Run lint and test commands for impacted areas when possible.

## Code Style

- Follow the style already used in nearby files.
- Use descriptive names and straightforward control flow.
- Add comments only where intent is not obvious.
- Keep functions focused and reasonably short.

## Commit and PR Expectations

- Use concise, meaningful commit messages.
- Explain the "why" in PR descriptions.
- Include a short test plan for verification steps.

## Safety

- Never commit secrets or credentials.
- Confirm before destructive actions (deletes, resets, force pushes).
- Prefer incremental edits over broad rewrites.
