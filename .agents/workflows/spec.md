# /spec — Stage 1: write the specification

Delegate this stage to the `product-analyst` agent.

**Input:** `docs/backlog.md`, or the request the user just made.
**Output:** `docs/01-spec.md`.

## Steps

1. Entry check. If `docs/backlog.md` is missing and the user did not state a
   request in this turn, stop and ask for the feature request. Do not invent one.
2. If the backlog contains more than one item, ask which one. Spec exactly one
   feature per run.
3. Produce `docs/01-spec.md` with: Problem, Goals, Non-goals, User stories,
   Acceptance criteria (numbered), Open questions, Provenance.
4. Exit check. Confirm the file exists, then print the path and a one-line
   summary.

## Gate before the next stage

Stop here. A human reads the spec and confirms the problem is the right problem
before any design work starts. This is the cheapest place in the pipeline to
change direction.

Next: `/design`
