# /sdlc — run the full pipeline

Orchestrate all seven stages by delegating to the named agents. You are the
coordinator; you do not do the stage work yourself.

**Input:** `docs/backlog.md`, or a feature request stated by the user.
**Output:** `docs/01-spec.md` through `docs/07-release-notes.md`, plus code and
tests.

## Sequence

| # | Stage | Agent | Reads | Writes |
| --- | --- | --- | --- | --- |
| 1 | Spec | `product-analyst` | `docs/backlog.md` | `docs/01-spec.md` |
| 2 | Design | `architect` | `docs/01-spec.md` | `docs/02-design.md` |
| 3 | Plan | `architect` | `docs/02-design.md` | `docs/03-plan.md` |
| 4 | Build | `implementer` | `docs/03-plan.md` | `src/**`, `docs/04-changelog.md` |
| 5 | Test | `test-engineer` | `docs/01-spec.md` | `tests/**`, `docs/05-test-report.md` |
| 6 | Review | `code-reviewer` | working diff | `docs/06-review.md` |
| 7 | Ship | `release-manager` | stages 5 and 6 | `docs/07-release-notes.md` |

## Coordinator rules

1. Run stages in order. Before starting stage N, confirm stage N-1 wrote its
   output file. If it did not, stop there and report it.
2. Pause for human approval after stage 1 (is this the right problem?), stage 3
   (is this the right scope?), and stage 6 (is this safe to ship?). These three
   gates are the point of the pipeline. Do not run past them unattended.
3. Pass file paths between stages, not summaries. Each agent reads its own input
   from disk. Summarising the previous stage into the next prompt is how detail
   gets quietly lost.
4. If a stage reports a blocker, stop the pipeline. Report which stage, what
   blocked, and which agent owns the fix. Do not route around it.
5. At the end, print the artifact table: stage, path, one-line status.

## Running one stage at a time

The individual workflows `/spec`, `/design`, `/plan`, `/build`, `/test`,
`/review`, `/ship` do exactly one stage each. Use those when a stage needs to be
redone; use `/sdlc` for the full run.
