# Automating the SDLC in Google Antigravity

A workshop scaffold. It ships an opinionated set of **rules**, **workflows**,
**custom agents**, and **skills** that turn a one-line backlog item into a spec,
a design, code, tests, a review, and a release note — with human gates in the
three places that matter.

There is no application in this repository on purpose. The pipeline is the
subject. Point it at the sample backlog, or drop it into a project you already
have.

---

## Target version

Built against **Antigravity 2.0** (subagents, `.agents/` layout).

Two things to know if something does not load:

- `AGENTS.md` is read automatically from IDE version **1.20.5** onward.
- The workspace directory was renamed from `.agent/` to `.agents/`. Current
  builds read `.agents/` and keep backward support for `.agent/`. If your build
  ignores this scaffold entirely, copy it across and restart the IDE:

```bash
cp -R .agents .agent
```

Official reference: [Rules and workflows](https://antigravity.google/docs/rules-workflows) ·
[Agents command](https://antigravity.google/docs/cli/commands/agents/)

---

## Setup

```bash
git init && git add -A && git commit -m "chore: add antigravity sdlc scaffold"
```

The `/ship` stage stages a commit, so the folder needs to be a git repository
before you run the full pipeline.

Then open the folder in Antigravity. Rules load automatically; workflows appear
in the `/` menu; agents appear in the Agent Manager.

---

## Run it

```
/sdlc
```

That runs all seven stages, pausing for your approval after stage 1, stage 3, and
stage 6.

To run one stage at a time — which is the better way to *see* what is happening:

```
/spec  →  /design  →  /plan  →  /build  →  /test  →  /review  →  /ship
```

---

## What the pipeline actually is

```
docs/backlog.md
   │
   ├─ /spec     product-analyst   ──▶ docs/01-spec.md          ⟨gate: right problem?⟩
   ├─ /design   architect         ──▶ docs/02-design.md
   ├─ /plan     architect         ──▶ docs/03-plan.md          ⟨gate: right scope?⟩
   ├─ /build    implementer       ──▶ src/**  + docs/04-changelog.md
   ├─ /test     test-engineer     ──▶ tests/** + docs/05-test-report.md
   ├─ /review   code-reviewer     ──▶ docs/06-review.md        ⟨gate: safe to ship?⟩
   └─ /ship     release-manager   ──▶ docs/07-release-notes.md + staged commit
```

**The one idea worth taking home:** stage N writes a named file, stage N+1 reads
that exact file. Nothing is passed by memory or by summary. That is what makes it
a pipeline rather than a long chat — it can be paused, resumed, rerun from the
middle, and audited line by line.

---

## The four building blocks

| Block | Path | Loaded | Use it for |
| --- | --- | --- | --- |
| **Rules** | `.agents/rules/` | Always, in every prompt | Standards that apply to all work. Keep short — you pay for these every turn. |
| **Workflows** | `.agents/workflows/` | When you type `/name` | A repeatable sequence of steps. One per SDLC stage. |
| **Agents** | `.agents/agents/<name>/agent.md` | When a coordinator delegates | A specialist with its own system prompt and its own narrow job. |
| **Skills** | `.agents/skills/<name>/SKILL.md` | Automatically, when the description matches the task | Deep know-how you need occasionally. Costs nothing when not relevant. |

**Rules vs. skills** is the distinction people get wrong. A rule is always in
context, so it must be short and universally true. A skill is loaded only when
its `description` matches what you are doing, so it can be long and specific.
Put "follow Conventional Commits" in a rule; put the eight-page guide to writing
a good commit body in a skill.

**Skill descriptions are trigger phrases.** `description: Database tools` never
fires. `description: Reviews a diff for injection, authorization, and secret
exposure. Use when reviewing code before merge or handling user input.` fires
reliably. Write the description last, and write it as *when to use this*.

---

## What is in here

```
AGENTS.md                 universal instructions (every tool reads this)
GEMINI.md                 Antigravity-only overrides (wins on conflict)

.agents/
  rules/
    00-pipeline-contract.md      entry check → one stage → exit check
    10-engineering-standards.md  code, naming, commits, docs
    20-safety.md                 never / ask-first / honest reporting
  workflows/
    sdlc.md                      orchestrates all seven stages
    spec.md design.md plan.md build.md test.md review.md ship.md
  agents/
    product-analyst/  architect/  implementer/
    test-engineer/    code-reviewer/  release-manager/
  skills/
    writing-specs/  writing-adrs/  test-planning/
    conventional-commits/  security-review/

docs/
  README.md      what each artifact is and why files beat summaries
  backlog.md     pipeline input — pick one item
```

---

## For the presenter

`WORKSHOP-RUNBOOK.md` is the delivery script — rehearsal checklist, timings,
talking points, and failure recovery. The `demo-output` branch holds a pre-run
pipeline (stages 1-5, with a deliberately planted SQL injection) used as the
fallback and as the starting point for the review demo. Attendees do not need
either; this README is their reference.

## Workshop running order

1. **Open `AGENTS.md` and `GEMINI.md`.** Two files, one precedence rule. Explain
   why a team keeps both: `AGENTS.md` works in Claude Code and Cursor too.
2. **Open `.agents/rules/00-pipeline-contract.md`.** This is the whole idea in
   thirty lines: entry check, one stage, exit check.
3. **Run `/spec`.** Watch it refuse to invent a missing input. That refusal is
   the feature.
4. **Run `/design` and `/plan`.** Stop at the scope gate. Let the room argue with
   the task list — this is the cheapest moment to change direction.
5. **Run `/build` and `/test`.** With no application in the repository, these
   stages fall back to the workshop defaults pinned in `AGENTS.md` — Python 3,
   `src/`, `tests/`, `python3 -m unittest`. Point out that a different agent writes the
   tests, and why: an implementer testing their own work tends to test what the
   code does rather than what it was supposed to do.
6. **Run `/review` and `/ship`.** Deliberately leave a `BLOCKER` in and watch
   `/ship` refuse. A gate that never blocks anything is decoration.

---

## Adapting it to your own project

1. Copy `.agents/`, `AGENTS.md`, and `GEMINI.md` into your repository.
2. Rewrite the "What this repository is" section of `AGENTS.md`. Everything else
   in it is generic enough to keep.
3. In `.agents/rules/10-engineering-standards.md`, replace the naming and commit
   conventions with yours.
4. Delete the **Workshop defaults** section from `AGENTS.md` and let your own
   toolchain apply, or edit it to name your real test command (`npm test`,
   `pytest -q`, `go test ./...`).
5. Delete agents you will not use. Six is a teaching set, not a prescription;
   three often does the job.

---

## Two knobs worth knowing

**`commandExecutionPolicy: auto`** can be set in an agent's frontmatter to let it
run shell commands without a prompt. It is deliberately left off every agent
here. Turn it on for read-only agents first, once you trust the loop — not on a
laptop you are demoing from.

**The 12,000 character limit** applies to each rule and workflow file. Nothing
here is close to it, but it is the reason long guidance belongs in a skill rather
than a rule.

---

## Sources

- [Rules and workflows — antigravity.google/docs](https://antigravity.google/docs/rules-workflows)
- [Agents command — antigravity.google/docs](https://antigravity.google/docs/cli/commands/agents/)
- [Authoring Google Antigravity Skills — Google Codelabs](https://codelabs.developers.google.com/getting-started-with-antigravity-skills)
- [Where does Antigravity look for Agent Skills? — Mete Atamel](https://atamel.dev/posts/2026/07-01_where_agy_agent_skills/)
- [Customize Antigravity with rules and workflows — Mete Atamel](https://atamel.dev/posts/2025/11-25_customize_antigravity_rules_workflows/)
- [Antigravity and AGENTS.md: The Complete 2026 Guide — The Prompt Shelf](https://thepromptshelf.dev/blog/google-antigravity-agents-md-rules-guide-2026/)
