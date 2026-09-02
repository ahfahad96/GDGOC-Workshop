# Presenter runbook

Not attendee material. This is the delivery script for the workshop; the
attendee-facing document is `README.md`.

**Timings below are placeholders.** Nobody has run this pipeline in Antigravity
yet. Do the rehearsal in section 0 first and write your measured numbers in,
because pacing a room against invented durations is worse than having no
timings at all.

---

## 0. Rehearsal — do this before the workshop, not on the day

You are checking three things the runbook depends on. Two of them can quietly
break the whole narrative.

### 0.1 Does the scaffold load at all?

Open the folder in Antigravity, then in a fresh agent conversation ask:

```
List the rules currently loaded, the workflows available as slash commands,
and the custom agents you can delegate to. Just list them, do nothing else.
```

Expect 3 rules, 8 workflows, 6 agents. If you get nothing, your build reads the
old directory name:

```bash
cp -R .agents .agent
```

Restart the IDE and ask again.

### 0.2 Does `/sdlc` actually stop at the gates?

This is the one that can collapse the story live. `sdlc.md` *asks* the
coordinator to pause after stages 1, 3, and 6 — that is a prompt-level request,
not an enforced stop. Run `/sdlc` once end to end and watch.

- **It pauses:** demo `/sdlc` as the finale, after walking the stages
  individually.
- **It runs straight through:** do not demo `/sdlc` live at all. Demo the seven
  workflows in sequence, and show `sdlc.md` as the orchestration *pattern*
  rather than running it. Say plainly that the gate is a convention the
  coordinator honours, not a lock — that is a more honest lesson anyway.

Decide this before the room does.

### 0.3 Measure and write in the real numbers

| Stage | Measured | Notes |
| --- | --- | --- |
| `/spec` | ___ | |
| `/design` | ___ | |
| `/plan` | ___ | |
| `/build` | ___ | longest, usually |
| `/test` | ___ | |
| `/review` | ___ | |
| `/ship` | ___ | |

Anything over about 4 minutes is too long to watch in silence — that is a slot
where you talk over the run, or where you skip to the pre-baked branch.

### 0.4 Pick the backlog item and delete the rest

`docs/backlog.md` ships four items. Leave exactly one. Item 0 (the chapter
landing page) is the recommended live-demo subject: it is visual, the room knows
the domain, and it puts the browser and the screenshot artifact on screen.

Confirm `/build` picks **Track A** from `AGENTS.md` and not Track B — if it
starts writing a Python module for a landing page, the track selection did not
land, and you should say which track you expected in the `/design` prompt.

### 0.5 Pre-flight, morning of

```bash
git status                       # clean
git branch -a                    # main and demo-output both present
python3 --version                # 3.10+, for the `str | None` syntax
python3 -m unittest discover -s tests   # only on demo-output; main has no tests
```

Close every other Antigravity window. A stray agent trajectory in another tab is
a confusing thing to have on a projector.

---

## 1. Opening — the problem (about 8 minutes)

Do not open the repo yet. Ask the room:

> "Who has asked an AI agent to build a feature, got something plausible, and
> then could not tell what it actually did or where it went wrong?"

Most hands. Then name the three failures behind that, because every part of the
scaffold answers one of them:

1. **One long conversation.** Everything lives in one context. Fifty turns in,
   nobody — human or model — can say what was decided at turn six.
2. **No gates.** The agent goes from "idea" to "committed code" with no point
   where a human could have said "wrong problem" cheaply.
3. **Summary handoff.** Each phase feeds the next a summary. Summaries drop
   whatever the summariser thought was unimportant, and the next phase never
   learns what was dropped.

> "So the question is not 'can the agent write code'. It can. The question is
> whether you can review what it did, restart from the middle, and stop it
> before it ships something wrong. That is what a pipeline gives you that a chat
> does not."

---

## 2. Tour the repo (about 12 minutes)

Open files in this order. Resist explaining every file — four concepts, one
example each.

### 2.1 `AGENTS.md` and `GEMINI.md`

Two files, one precedence rule: `GEMINI.md` wins on conflict.

> "`AGENTS.md` is the cross-tool file — Claude Code, Cursor and Codex read it
> too. `GEMINI.md` is where the Antigravity-specific behaviour goes. A team that
> uses more than one tool keeps both, so switching tools does not mean rewriting
> your conventions."

Scroll to the **handoff contract** section. Read the three steps aloud. Say:

> "That is the entire idea of this repo, in about fifteen lines. Everything else
> is application of it."

### 2.2 The four building blocks

Put the table up (it is in `README.md`):

| Block | Path | Loaded |
| --- | --- | --- |
| Rules | `.agents/rules/` | always, every prompt |
| Workflows | `.agents/workflows/` | when you type `/name` |
| Agents | `.agents/agents/<n>/agent.md` | when a coordinator delegates |
| Skills | `.agents/skills/<n>/SKILL.md` | when the description matches |

**The distinction people get wrong is rules vs. skills.** Spend a minute here:

> "A rule is in context on every single turn. You pay tokens for it whether it
> is relevant or not — so it has to be short and universally true. A skill is
> loaded only when its description matches what you are doing, so it can be long
> and specific. 'Follow Conventional Commits' is a rule. The eight-page guide to
> writing a good commit body is a skill."

Open `.agents/skills/security-review/SKILL.md` and scroll the table of dangerous
destinations.

> "That would be absurd to carry on every turn. It costs nothing when you are
> not reviewing code, and it is right there when you are."

### 2.3 Skill descriptions are trigger phrases

Show the frontmatter of two skills side by side. Say:

> "`description: Database tools` never fires. The description is not a label —
> it is the retrieval key. Write it as *when to use this*, and write it last,
> once you know what the skill actually does."

### 2.4 One agent

Open `.agents/agents/code-reviewer/agent.md`. Point at the guardrails:

> "'Do not fix the code. Report it.' A reviewer that edits what it is reviewing
> has stopped being a reviewer. Narrow beats capable — each of these six agents
> is deliberately not allowed to do the neighbouring job."

### 2.5 `docs/README.md`

> "Every stage writes one numbered file. The next stage reads that exact file
> off disk — not a summary, not the conversation. That is what makes this
> restartable: I can rerun stage 5 next Tuesday in a fresh session with no
> history."

---

## 3. Live run (about 30 minutes)

Run stages individually. It is slower than `/sdlc` and much better teaching —
the room sees each gate.

### 3.1 Show the entry check refusing (2 min)

Before anything else, prove the contract is real:

```
/design
```

There is no `docs/01-spec.md` yet. It should stop and tell you to run `/spec`
first.

> "It could have invented a design. It refused, because it has no input. That
> refusal is the feature — an agent that fills in a missing input silently poisons
> every stage downstream, and you will not find out until review."

If it does *not* refuse and invents a design anyway: say so out loud, and use it.
That is a real finding about prompt-level contracts, and honesty here buys you
more credibility than a clean demo does.

### 3.2 `/spec` (measured: ___)

```
/spec
```

While it runs, talk about `docs/backlog.md` — three items, "state the problem,
not the solution."

**The moment that matters here.** The backlog item never says "website", never
says "good looking", and names no colour, font, or section. Watch stage 1 turn
that into criteria. What you want to see:

- no horizontal scroll at 375px width
- body text contrast at least 4.5:1
- zero console errors on load
- every internal link resolves
- no external network request — the page renders with the machine offline

If instead it hands you "the design is clean and modern", **say so out loud** and
fix it at the gate:

> "That is not a criterion. Nobody can test 'clean'. This is exactly the failure
> the spec stage exists to catch, and it just produced one — so we catch it here,
> which is the point of having a gate at all."

Rewrite that line live into something measurable. The room learns more from you
correcting it than from it getting it right first time.

When it lands, open `docs/01-spec.md` and go straight to two sections:

- **Non-goals.** > "This is where scope creep dies. Three stages from now, when
  something suggests adding user accounts, this section is the argument."
- **Acceptance criteria.** > "Numbered, and each one testable. The test engineer
  turns these into tests without asking a single question. If a criterion needs
  a follow-up question, it was not finished."

**Gate 1.** Ask the room: is this the right problem? Take one suggestion, edit
the spec by hand, move on.

> "That edit cost ten seconds. The same correction after the code is written
> costs the afternoon."

### 3.3 `/design` (measured: ___)

```
/design
```

Open `docs/02-design.md`. Go to **Options considered** and **Consequences → Bad**.

> "Every option got a real account, and the decision names the constraint that
> broke the tie. If the winner gets ten lines and the alternatives get one, that
> is not a decision record, it is a press release. And an ADR with no downsides
> listed has not been thought about — every choice costs something."

### 3.4 `/plan` (measured: ___)

```
/plan
```

Open `docs/03-plan.md`. Point at a task's "done when" and its proof command.

> "Each task names the command that proves it. That is what lets the next stage
> verify instead of assert."

**Gate 2 — scope approval.** Let the room argue with the task list.

> "This is the last cheap moment. Once build starts, the plan is the contract."

### 3.5 `/build` and `/test` (measured: ___ / ___)

```
/build
```

This is the long one. Talk while it runs — cover why a *different* agent writes
the tests:

> "An implementer writing its own tests will test what the code does, not what
> the code was supposed to do. So the test engineer reads `01-spec.md`, not
> `src/`. Different input, different agent, on purpose."

```
/test
```

Open `docs/05-test-report.md` and read the real numbers off it.

**Expect gaps in the coverage matrix, and present them as the honest answer.**
Structural tests can check markup, content, and that links resolve. They cannot
check contrast, spacing, or whether the layout holds at 375px. Have this ready:

> "Three criteria have no automated test, and that is correct — a unit test
> cannot see a contrast ratio. Those get verified in the browser at review. What
> would be wrong is a report claiming coverage it does not have. It said which
> ones it could not cover, and that is the report doing its job."

Then preview it:

```bash
python3 -m http.server 8000 --directory src
```

Open `http://localhost:8000` in the Antigravity browser. This is the moment the
IDE earns its keep — screenshot the rendered page into the artifact, resize to
375px, and check the console. A backend demo never gets this.

**If `/build` runs long or goes sideways, this is your exit** — jump to section
4 and use the pre-baked branch.

---

## 4. The gate that blocks — your best ten minutes

Switch to the pre-run branch. It is deterministic; you have rehearsed exactly
what comes out.

**Name the switch — do not let it look like disorganisation.** The live run built
a website; `demo-output` is a backend service. Say why:

> "For the review gate I am switching to a pre-run backend example. The failure
> mode there is sharper than anything I could plant in CSS — it is a real
> vulnerability with a real exploit, and you will see the gate catch something
> that twelve passing tests did not."

```bash
git checkout demo-output
```

Read `DEMO-STATE.md` on that branch beforehand — it has the full setup.

### 4.1 Establish that everything looks fine

```bash
python3 -m unittest discover -s tests
```

12 passing. Open `docs/05-test-report.md`: every acceptance criterion covered,
no gaps.

> "Complete coverage against the spec. Green suite. By every check we have run
> so far, this ships."

### 4.2 Run the review

```
/review
```

It should return a `BLOCKER` on `src/shortener.py` — the code is interpolated
into SQL with an f-string while every other query in the file uses a bound
parameter.

### 4.3 Make it real

Do not leave it abstract. Run the exploit:

```bash
python3 -c "
from src.shortener import Shortener
s = Shortener(':memory:')
s.shorten('https://example.com/private-doc')
print(s.resolve(\"' OR '1'='1\"))
"
```

It prints the URL.

> "That caller knew no codes at all, and just read one out."

Now open `docs/03-plan.md`, Task 4, risk notes — the plan explicitly said this
input reaches SQL and must be bound.

> "The plan was right. The implementer ignored it. Twelve tests still pass —
> because the spec never described this input, so nobody wrote a test for it.
> **A green suite proves the criteria you wrote down. It proves nothing about
> the ones you did not.** This is exactly the class of thing a review gate is
> for, and exactly why the reviewer reads the diff instead of the test results."

### 4.4 The gate refuses

```
/ship
```

It should stop on gate 3 — unresolved `BLOCKER`.

> "A gate that never blocks anything is decoration."

### 4.5 Fix and ship

One line, in `resolve`:

```python
cur = self._conn.execute("SELECT url FROM codes WHERE code = ?", (code,))
```

Rerun the exploit — `None`. Rerun the suite — still 12 passing. Then:

```
/review
/ship
```

Open `docs/07-release-notes.md`. Point at **Verification** carrying the real
numbers, and at `/ship` stopping short of `git push`.

> "It staged the commit and printed the push command. Shipping stays a human
> decision."

---

## 5. Make it theirs (about 8 minutes)

```bash
git checkout main
```

Walk the five adaptation steps from `README.md`. Then the honest part:

> "Six agents is a teaching set, not a prescription. Three usually does the job —
> plan, build, review. Start there. Add an agent when you notice you keep giving
> the same correction to the same kind of task; that correction is the agent's
> system prompt."

Two knobs worth naming:

- **`commandExecutionPolicy: auto`** — off on every agent here on purpose.
  > "Turn it on for read-only agents first, once you trust the loop. Not on the
  > laptop you are demoing from."
- **12,000 characters per rule and workflow file.**
  > "Nothing here is close. But it is the reason long guidance belongs in a
  > skill, not a rule."

Close on the one sentence worth remembering:

> "Stage N writes a named file. Stage N+1 reads that exact file. That single
> constraint is what turns a chat into something you can pause, restart from the
> middle, and audit line by line."

---

## 6. Failure recovery

| What breaks | What you do |
| --- | --- |
| Rules and workflows do not load | `cp -R .agents .agent`, restart the IDE. Rehearsed in 0.1. |
| `/sdlc` runs past the gates | Do not run it. Demo the seven workflows in sequence; show `sdlc.md` as the pattern. Decided in 0.2. |
| A stage takes far too long | Talk through the artifact it *would* produce, then `git checkout demo-output` and carry on from section 4. |
| An agent goes off the rails live | Stop it. Say what went wrong and why — an unscripted failure explained well teaches more than a clean run. Then switch to `demo-output`. |
| No network or the model is slow | Everything in section 4 except `/review` and `/ship` is local. Walk the artifacts on `demo-output` and run the exploit and the test suite from the terminal. |
| The page pulls a CDN or Google Font and you are offline | Track A in `AGENTS.md` forbids it. Point at that line, say the agent ignored a stated constraint, and treat it as a live finding — then have `/review` catch it. |
| Someone asks about cost or model choice | Honest answer: this scaffold is model-agnostic. The pattern is the point; the pricing is not yours to quote. |

## 7. Questions you will get

- **"Is this not just a lot of prompt files?"** Yes — that is the point. The
  value is that the prompts are versioned, reviewable, and diffable, instead of
  retyped slightly differently every session.
- **"Does the agent actually obey the gates?"** Depends on your build, which is
  why section 0.2 exists. Say what you measured. Prompt-level contracts are
  conventions, not locks — that is a real limitation and worth stating plainly.
- **"Six agents for one feature seems heavy."** It is, for one feature. It pays
  off when the same pipeline runs fifty times and every run produces the same
  seven artifacts in the same seven places.
- **"Can I use this with Claude Code or Cursor?"** `AGENTS.md` yes, directly.
  Rules, workflows and skills map onto their equivalents with some renaming;
  the pipeline shape is the portable part.
