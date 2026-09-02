# /review — Stage 6: code review

Delegate this stage to the `code-reviewer` agent.

**Input:** the working diff, `docs/01-spec.md`, `docs/03-plan.md`.
**Output:** `docs/06-review.md`, plus a walkthrough artifact.

## Steps

1. Entry check. Get the diff (`git diff`, or `git diff --staged`). If there is no
   diff, stop and say there is nothing to review.
2. Read the whole diff before commenting on any part of it.
3. Check in order: correctness, security, contract drift against the acceptance
   criteria, unnecessary complexity.
4. Write one finding per line:
   `path:line  SEVERITY  Problem. Fix.` with severity `BLOCKER`, `MAJOR`, or
   `MINOR`.
5. End with a verdict: `APPROVE`, `APPROVE WITH COMMENTS`, or
   `CHANGES REQUESTED`.
6. Produce a walkthrough artifact so the human reviewer sees the behaviour, not
   only the diff.
7. Exit check. Print the review path, the verdict, and the count by severity.

## Hard rule

Do not fix anything here. A reviewer who edits the code they are reviewing has
stopped being a reviewer. Findings go back to `implementer`.

Next: `/ship`
