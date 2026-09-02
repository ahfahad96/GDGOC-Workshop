# Pipeline contract

Every SDLC stage in this repository obeys the same three-step contract. Apply it
whether you were invoked by a workflow, by a coordinator, or directly.

## 1. Entry check

Confirm the input artifact exists and is non-empty before doing anything else.

- If it is missing, stop. Say which stage produces it and offer to run that
  stage. Do not reconstruct the input from the conversation.
- If it exists but contradicts the current request, say so and ask which is
  authoritative.

## 2. Single stage

Do the one stage you were asked for. Do not continue into the next stage because
the path is obvious. The gate between stages is where a human decides whether the
pipeline was right so far, and it only works if you stop there.

## 3. Exit check

Write the output artifact to the exact path the stage names. Then state, in one
line, the path you wrote and the one-sentence summary of what is in it.

Append this block to the end of every artifact:

```markdown
## Provenance
- Stage: <stage name>
- Input: <input path, or "human request">
- Produced: <YYYY-MM-DD>
```

## Failure reporting

If a stage cannot complete, say which of the three steps failed and why. Never
report partial work as complete. Never claim a command passed without having run
it and read the output.
