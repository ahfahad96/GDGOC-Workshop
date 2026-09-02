---
name: writing-specs
description: Turns a vague feature request into a spec with testable acceptance criteria and explicit non-goals. Use when the user asks for a spec, a PRD, requirements, or when a request states a solution without stating the problem.
---

# Writing specs

## The rule

An acceptance criterion is only useful if someone else can turn it into a test
without asking you a question.

## Method

1. **Find the problem behind the request.** A request phrased as a solution
   ("add a Redis cache") hides the problem ("the dashboard takes 9 seconds").
   Write the problem down. The solution may change; the problem usually does not.
2. **Write non-goals before goals.** It is easier to see the shape of a feature
   from its edges. Non-goals are what stops scope creep three stages later.
3. **Make every criterion observable.** Replace judgement words with a
   measurement or a concrete behaviour.

| Vague | Testable |
| --- | --- |
| Login should be secure | Failed login attempts are rate-limited to 5 per IP per minute; the 6th returns HTTP 429 |
| The list loads fast | The first 50 rows render within 500 ms on the 10k-row fixture |
| Handle bad input gracefully | A malformed date returns HTTP 400 with `{"error":"invalid_date"}` and does not write to the database |

4. **Number the criteria.** The test engineer maps tests to these numbers. If
   they are not numbered, coverage cannot be checked.
5. **Write assumptions down instead of stalling.** An assumption in the Open
   questions section is visible and correctable. An assumption in your head is
   neither.

## Structure

```markdown
# Spec: <feature>

## Problem
## Goals
## Non-goals
## User stories
## Acceptance criteria
1. ...
## Open questions
## Provenance
```

## Anti-patterns

- Naming files, libraries, or endpoints. That is design, not spec.
- A criterion containing "and" that hides two separate behaviours. Split it.
- Non-goals section left empty because "nothing came to mind". Something always
  did; write it.
