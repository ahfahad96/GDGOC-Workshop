# Pipeline artifacts

Every SDLC stage writes exactly one numbered file here. The number is the stage.
Never rename or renumber these files — the workflows reference them by path.

| File | Stage | Written by | Read by |
| --- | --- | --- | --- |
| `backlog.md` | input | you | `/spec` |
| `01-spec.md` | Spec | `product-analyst` | `/design`, `/test` |
| `02-design.md` | Design | `architect` | `/plan` |
| `03-plan.md` | Plan | `architect` | `/build`, `/test` |
| `04-changelog.md` | Build | `implementer` | `/review` |
| `05-test-report.md` | Test | `test-engineer` | `/ship` |
| `06-review.md` | Review | `code-reviewer` | `/ship` |
| `07-release-notes.md` | Ship | `release-manager` | humans |

## Why files instead of conversation

Each stage reads its input from disk rather than from the previous agent's
summary. Three reasons:

1. **No quiet detail loss.** A summary drops whatever the summariser thought was
   unimportant. The next stage never learns what was dropped.
2. **Restartable.** A stage can be rerun on its own, days later, in a fresh
   session, with no conversation history.
3. **Reviewable.** A human can read exactly what stage 3 handed to stage 4 and
   point at the line where it went wrong.

This is the difference between a pipeline and a long chat that happens to cover
several topics.
