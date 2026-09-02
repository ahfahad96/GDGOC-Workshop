# /build — Stage 4: implementation

Delegate this stage to the `implementer` agent.

**Input:** `docs/03-plan.md`.
**Output:** code under `src/`, plus `docs/04-changelog.md`.

## Steps

1. Entry check. If `docs/03-plan.md` does not exist, stop and say `/plan` must
   run first.
2. For each task in plan order:
   a. Announce the task number.
   b. Read the code you are about to change.
   c. Make the change at the layer that owns the behaviour.
   d. Run the relevant check and read the output.
   e. Append to `docs/04-changelog.md`: task number, files touched, behaviour
      change, command run, result.
3. If a check fails twice in a row, stop. Quote the failing line and state the
   suspected cause. Do not keep retrying.
4. Anything the plan did not cover goes under `## Unplanned work found` — flagged,
   not silently built.
5. Exit check. Print the changelog path and the tasks completed out of the total.

## Gate before the next stage

Do not write tests here. Tests are written against the spec by a different agent,
on purpose: an implementer who writes their own tests tends to test what the code
does rather than what it was supposed to do.

Next: `/test`
