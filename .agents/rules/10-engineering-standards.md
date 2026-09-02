# Engineering standards

## Code

- Match the style already present in the file you are editing. Do not introduce a
  new formatting convention in a file that has one.
- Prefer extending an existing module over creating a parallel one. Search before
  you create.
- No dead code, no commented-out blocks, no `TODO` without a name or an issue
  reference.
- Handle the error path. A function that can fail and does not say how it fails
  is incomplete.

## Naming

- Files and directories: lowercase with hyphens.
- Artifacts in `docs/`: `NN-name.md`, numbered by pipeline stage.
- Branches: `feat/<slug>`, `fix/<slug>`, `chore/<slug>`.

## Commits

Conventional Commits. Subject line 50 characters or fewer, imperative mood, no
trailing period.

```
feat(auth): add refresh token rotation

Access tokens were valid for 24h with no rotation, so a leaked token
stayed usable for a full day. Rotation invalidates the old token on
every refresh.
```

Write a body only when the "why" is not obvious from the subject.

## Documentation

Every artifact answers, in order: what problem, what decision, what changed, how
it was verified. Prose over bullet soup when explaining a decision. Bullets for
lists of facts.
