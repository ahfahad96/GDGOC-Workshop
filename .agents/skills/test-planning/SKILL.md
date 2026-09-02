---
name: test-planning
description: Derives a test suite from acceptance criteria, including edge cases and failure modes, and maps each criterion to a test. Use when writing tests, planning coverage, or when asked what tests a feature needs.
---

# Test planning

## The rule

Tests are derived from the spec, not from the implementation. A test written by
reading the code will confirm whatever the code does, including the bug.

## The coverage matrix

Start here, every time:

| Criterion | Test | Type | Status |
| --- | --- | --- | --- |
| AC-1 | `test_rejects_expired_token` | unit | written |
| AC-2 | `test_refresh_rotates_token` | integration | written |
| AC-3 | — | — | **gap: needs a fixture with 10k rows** |

A criterion with no test is a finding you report, not a row you quietly delete.

## Edge cases to walk for every input

- empty, and null or missing
- one element, and the boundary value (0, 1, max, max+1)
- duplicates
- wrong type
- very large
- unicode and whitespace, if it is a string
- unauthorized caller
- the dependency being slow, or down

## Test quality checks

1. **Does it fail for the right reason?** Break the implementation deliberately.
   If the test still passes, it is not testing what you think.
2. **Is it independent?** It must pass when run alone and in any order.
3. **Is the assertion specific?** `assert result` passes on `True`, `1`, `"x"`,
   and a non-empty list. Assert the value.
4. **Does the name say the behaviour?** `test_returns_400_when_date_malformed`,
   not `test_dates_2`.

## Reporting

Report the numbers the run printed. For each failure, quote the shortest line
that identifies the cause. Never soften a failing suite into "mostly passing".

## Anti-patterns

- Changing an assertion so a failing test goes green, without deciding whether
  the code or the expectation was wrong.
- Mocking the thing under test.
- Asserting on log output instead of on behaviour.
