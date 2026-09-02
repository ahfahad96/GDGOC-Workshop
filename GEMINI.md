# GEMINI.md

Antigravity-specific overrides for this repository. These take precedence over
`AGENTS.md` when the two conflict. Everything in `AGENTS.md` still applies
otherwise.

---

## Use the Agent Manager, not one long chat

This repository is built around delegation. When a task spans more than one SDLC
stage, do not do it all yourself in a single trajectory. Delegate each stage to
the named agent that owns it:

| Stage | Agent |
| --- | --- |
| Spec | `product-analyst` |
| Design | `architect` |
| Plan | `architect` |
| Build | `implementer` |
| Test | `test-engineer` |
| Review | `code-reviewer` |
| Ship | `release-manager` |

The agent names above match the `name:` field in `.agents/agents/*/agent.md`
exactly. Reference them by that name.

## Artifacts

Antigravity produces artifacts (task lists, implementation plans, walkthroughs,
browser recordings) as a first-class output. Treat them as the visible surface of
this pipeline:

- Produce a **task list** before `/build` so a human can approve scope before any
  code is written.
- Produce an **implementation plan** artifact at `/plan`, and keep it consistent
  with `docs/03-plan.md`. The file is the durable record; the artifact is the
  review surface.
- Produce a **walkthrough** at `/review` so the reviewer sees behaviour, not just
  a diff.

## Verification is part of the stage, not a favour

Do not report a stage as complete on the strength of having written code. Run the
check, read the output, then report. If a command fails, quote the failing line
and say the stage is blocked. A green claim with no command behind it is the
failure mode this workshop exists to prevent.

## Browser use

If the workspace grows a web surface, use the built-in browser to verify the
change actually renders before closing the `/build` stage. Screenshot into the
artifact. Do not enter real credentials into any form.

## Autonomy level

Default to asking before:

- writing outside `docs/`, `src/`, and `tests/`
- any `git` command that changes history or contacts a remote
- installing packages

Everything else in this repository is safe to do without a prompt.
