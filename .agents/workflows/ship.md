---
description: 
---

# /ship — Stage 7: release gate

Delegate this stage to the `release-manager` agent.

**Input:** `docs/05-test-report.md` and `docs/06-review.md`.
**Output:** `docs/07-release-notes.md`, plus a prepared commit.

## Gate — check all four and state each result

1. `docs/05-test-report.md` exists and shows zero failures.
2. `docs/06-review.md` verdict is not `CHANGES REQUESTED`.
3. No unresolved `BLOCKER` finding.
4. No secret, credential, token, or `.env` value in the diff.

If any gate fails, stop and name the agent that has to fix it. Do not weaken a
gate to get past it.

## Steps

1. Run the gate.
2. Write `docs/07-release-notes.md`: What changed, Why, Verification (real test
   numbers), Risk and rollback, Known limitations.
3. Prepare a Conventional Commits message and stage the change.
4. Exit check. Print the release notes path and the proposed commit subject.
5. Push everything to the branch and open up a PR against main.

## Hard stop

Once the PR has been raised, just inform the human about the summary session and stop.
