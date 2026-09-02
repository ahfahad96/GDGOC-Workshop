# AGENTS.md

Universal agent instructions for this repository. Read by Google Antigravity,
Claude Code, Cursor, Codex, and any other tool that supports the AGENTS.md
convention.

Tool-specific overrides live in `GEMINI.md` (Antigravity only). Where the two
conflict, `GEMINI.md` wins.

---

## What this repository is

A teaching scaffold for the GDGoC workshop on **automating the SDLC inside
Google Antigravity**. It contains no production application. The deliverable is
the pipeline itself: a chain of agents, workflows, rules, and skills that turn a
one-line backlog item into a spec, a design, code, tests, a review, and a
release note.

## The pipeline in one sentence

Each stage reads a named file, does one job, and writes a named file. The next
stage reads that file. Nothing is passed by memory.

```
docs/backlog.md
  -> /spec    -> docs/01-spec.md
  -> /design  -> docs/02-design.md
  -> /plan    -> docs/03-plan.md
  -> /build   -> src/** + docs/04-changelog.md
  -> /test    -> tests/** + docs/05-test-report.md
  -> /review  -> docs/06-review.md
  -> /ship    -> docs/07-release-notes.md
```

`/sdlc` runs the whole chain by delegating to the named agents in
`.agents/agents/`.

## The handoff contract

This is the single most important rule in this repository.

1. **Entry check.** Before doing any work, confirm your input file exists and is
   non-empty. If it does not exist, stop and say which stage must run first. Do
   not improvise the missing input.
2. **Do one stage.** Do not run the next stage because it seems obvious.
3. **Exit check.** Write your output file to the exact path the stage specifies.
   Then state the path you wrote.

A stage that skips its entry check is the most common failure in an automated
pipeline: it invents an input, and every downstream stage inherits the
invention.

## Workshop defaults

This repository has no application yet. Until you point the pipeline at a real
project, `/build` and `/test` use these defaults instead of guessing:

- Language: **Python 3**
- Source: `src/`, tests: `tests/`
- Test command: `pytest -q`
- Dependencies: standard library only, unless the plan says otherwise and you
  asked first

If you drop this scaffold into an existing project, delete this section and let
the repository's own conventions apply.

## Repository conventions

- Artifacts go in `docs/`, numbered by stage. Never rename or renumber them.
- Application code goes in `src/`. Tests go in `tests/`.
- Commits follow Conventional Commits (`feat:`, `fix:`, `docs:`, `chore:`,
  `test:`, `refactor:`).
- Every artifact ends with a `## Provenance` section naming the stage, the input
  file, and the date.

## Boundaries

- Do not create secrets, `.env` values, credentials, or API keys.
- Do not run `git push`, open pull requests, or publish anything without being
  asked in the current turn.
- Do not install dependencies without saying which ones and why first.
- When a requirement is ambiguous, write the assumption into the artifact under
  `## Open questions` and continue. Do not stall the pipeline on a question the
  reader can answer later.

## Where the pieces live

| Piece | Path | Purpose |
| --- | --- | --- |
| Rules | `.agents/rules/` | Always-on context. Loaded into every prompt. |
| Workflows | `.agents/workflows/` | `/slash` recipes. One per SDLC stage. |
| Agents | `.agents/agents/<name>/agent.md` | Named specialists a coordinator can delegate to. |
| Skills | `.agents/skills/<name>/SKILL.md` | On-demand know-how, loaded when the description matches the task. |

Rules are *always* loaded. Skills are loaded *only when relevant*. That is the
difference, and it is why rules must stay short.
