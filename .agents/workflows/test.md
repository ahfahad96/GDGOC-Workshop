# /test — Stage 5: verification

Delegate this stage to the `test-engineer` agent.

**Input:** `docs/01-spec.md` and `docs/03-plan.md`.
**Output:** tests under `tests/`, plus `docs/05-test-report.md`.

## Steps

1. Entry check. If `docs/01-spec.md` is missing, stop. If `docs/04-changelog.md`
   is missing, say `/build` has not run and ask whether to continue anyway.
2. Build the coverage matrix: every numbered acceptance criterion to at least one
   test. Name any criterion you cannot cover.
3. Write happy path first, then edge cases: empty, boundary, duplicate, wrong
   type, unauthorized, dependency unavailable.
4. Run the suite. Read the real output.
5. Write `docs/05-test-report.md`: coverage matrix, real counts
   (`N passed, M failed, K skipped`), each failure with its shortest decisive
   line, uncovered criteria and why.
6. Exit check. Print the report path and the real pass and fail counts.

## Hard rule

Report the numbers you read from the run. Never a number you expected. If the
suite did not run, say it did not run — a missing result is a finding, not a
pass.

Next: `/review`
