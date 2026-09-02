# /design — Stage 2: technical design and ADR

Delegate this stage to the `architect` agent.

**Input:** `docs/01-spec.md`.
**Output:** `docs/02-design.md`.

## Steps

1. Entry check. If `docs/01-spec.md` does not exist, stop and say `/spec` must
   run first.
2. Restate the constraints from the spec: scale, latency, failure modes,
   integration points, security boundary.
3. Search the repository for existing components that already do part of this.
   Say what you found and whether you are extending it or not.
4. Present two or three approaches with real trade-offs — build cost, failure
   mode, what each locks you into.
5. Record the choice as an ADR: Context, Options, Decision, Consequences.
6. Define the contract the implementer will build against: data shapes,
   signatures, error cases.
7. Exit check. Print the path and the decision in one sentence.

## Gate before the next stage

Stop here. A human confirms the approach. Reversing an architecture decision
after code exists costs far more than reversing it now.

Next: `/plan`
