---
name: writing-adrs
description: Records an architecture decision with its options, trade-offs, and consequences. Use when choosing between technologies or designs, or when the user asks for an ADR, a design doc, or asks which approach to take.
---

# Writing architecture decision records

## The rule

A decision record is judged by whether a reader in a year can tell why the
rejected options were rejected. If it only argues for the winner, it is
marketing, not a record.

## Structure

```markdown
# ADR-00N: <decision in a short noun phrase>

## Status
Proposed | Accepted | Superseded by ADR-00M

## Context
What forces are in play. Constraints, scale, deadlines, existing systems,
team skill. Facts, not preferences.

## Options considered
### Option A: <name>
How it works. Build cost. Failure mode. What it locks you into.
### Option B: <name>
...

## Decision
We chose <X> because <the constraint that broke the tie>.

## Consequences
### Good
### Bad
### Neutral

## Provenance
```

## Method

1. **Write the constraints first.** Most architecture arguments are actually
   disagreements about constraints. Surfacing them ends the argument.
2. **Give every option a fair account.** If an option gets one line and the
   winner gets ten, you are documenting a conclusion, not a decision.
3. **Name the tie-breaker.** "We chose Postgres because we need transactional
   consistency across three tables and the team already operates Postgres" is a
   decision. "Postgres is a robust, scalable choice" is a slogan.
4. **Write the bad consequences.** Every choice costs something. An ADR with no
   downsides listed has not been thought through, and the reader knows it.
5. **Keep "do nothing" on the list** when it is genuinely viable. It often is.

## Anti-patterns

- Deciding by popularity ("industry standard") without connecting it to a
  constraint in the Context section.
- Listing benefits that apply equally to every option.
- Editing a superseded ADR. Write a new one and link it.
