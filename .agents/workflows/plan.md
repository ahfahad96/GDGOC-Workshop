# /plan — Stage 3: task breakdown

Delegate this stage to the `architect` agent.

**Input:** `docs/02-design.md`.
**Output:** `docs/03-plan.md`, plus an Antigravity task-list artifact.

## Steps

1. Entry check. If `docs/02-design.md` does not exist, stop and say `/design`
   must run first.
2. Decompose the design into numbered tasks. Each task states:
   - the files it touches
   - what "done" means, in checkable terms
   - which task numbers it depends on
   - the command that proves it works
3. Order the tasks so nothing depends on something later in the list.
4. Mark any task that is risky, irreversible, or crosses a security boundary.
5. Produce the task list as an artifact as well as the file, so a human can
   approve scope visually before any code is written.
6. Exit check. Print the path and the task count.

## Gate before the next stage

Stop here. This is the scope approval gate. Once `/build` starts, the plan is
the contract.

Next: `/build`
